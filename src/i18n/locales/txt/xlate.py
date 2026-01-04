#!/usr/bin/env python3
"""
xlate.py - Translate specific lines from en-GB.txt to all other language files.

Usage:
    python xlate.py [line_numbers...]
    
Examples:
    python xlate.py 1419 1420 1421 1422   # Translate specific lines
    python xlate.py                        # Translate all missing lines

Features:
    - Parallel translation across languages (8 concurrent by default)
    - Rate limiting to avoid Google API throttling
    - Progress reporting
"""

import os
import sys
import re
import time
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
import threading

try:
    from deep_translator import GoogleTranslator
except ImportError:
    print("Installing deep_translator...")
    import subprocess
    subprocess.run([sys.executable, '-m', 'pip', 'install', '--user', 'deep-translator'], check=True)
    from deep_translator import GoogleTranslator

# Configuration for parallel processing
MAX_LANG_WORKERS = 4  # Number of parallel language files to process
MAX_LINE_WORKERS = 8  # Number of parallel line translations per language
DELAY_BETWEEN_REQUESTS = 0.05  # Small delay between individual translation requests

# Thread-safe print lock
print_lock = threading.Lock()

# Language code mapping from filename to Google Translate codes
LANG_MAP = {
    'af': 'af',        # Afrikaans
    'ar': 'ar',        # Arabic
    'bg': 'bg',        # Bulgarian
    'bn-BD': 'bn',     # Bengali
    'cs-CZ': 'cs',     # Czech
    'da-DK': 'da',     # Danish
    'de-DE': 'de',     # German
    'el-GR': 'el',     # Greek
    'es-ES': 'es',     # Spanish
    'fi-FI': 'fi',     # Finnish
    'fil': 'tl',       # Filipino -> Tagalog
    'fr-FR': 'fr',     # French
    'gu': 'gu',        # Gujarati
    'hi-IN': 'hi',     # Hindi
    'hr': 'hr',        # Croatian
    'hu-HU': 'hu',     # Hungarian
    'id': 'id',        # Indonesian
    'it-IT': 'it',     # Italian
    'ja-JP': 'ja',     # Japanese
    'km-KH': 'km',     # Khmer
    'kn-IN': 'kn',     # Kannada
    'ko-KR': 'ko',     # Korean
    'lo-LA': 'lo',     # Lao
    'ml-IN': 'ml',     # Malayalam
    'mr-IN': 'mr',     # Marathi
    'ms': 'ms',        # Malay
    'my-MM': 'my',     # Burmese
    'ne-NP': 'ne',     # Nepali
    'nl-NL': 'nl',     # Dutch
    'no-NO': 'no',     # Norwegian
    'pa': 'pa',        # Punjabi
    'pl-PL': 'pl',     # Polish
    'pt-BR': 'pt',     # Portuguese
    'ro': 'ro',        # Romanian
    'ru-RU': 'ru',     # Russian
    'sv-SE': 'sv',     # Swedish
    'ta-IN': 'ta',     # Tamil
    'te-IN': 'te',     # Telugu
    'th': 'th',        # Thai
    'vi': 'vi',        # Vietnamese
    'zh-CN': 'zh-CN',  # Chinese Simplified
    'zu': 'zu',        # Zulu
}

def escape_quotes(text):
    """Escape double quotes in text for output format"""
    return text.replace('\\', '\\\\').replace('"', '\\"')


def unescape_quotes(text):
    """Unescape double quotes when reading from file"""
    return text.replace('\\"', '"').replace('\\\\', '\\')


def parse_txt_file(filepath):
    r"""Parse a .txt file and return dict of line_num -> text
    
    Expected format: ^\d+\t"text..."$
    Handles escaped quotes (\" -> ") in the text.
    """
    lines = {}
    with open(filepath, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            # Match: number, tab (or spaces for backwards compat), quoted string
            # The quoted string may contain escaped quotes
            match = re.match(r'^(\d+)\s+"(.*)"\s*$', line)
            if match:
                num = int(match.group(1))
                text = unescape_quotes(match.group(2))
                lines[num] = text
    return lines

def translate_text(text, target_lang, max_retries=3):
    """Translate text to target language with rate limiting and retry logic"""
    if not text or target_lang == 'en':
        return text
    
    for attempt in range(max_retries):
        try:
            # Delay to avoid rate limiting (increases with each retry)
            delay = DELAY_BETWEEN_REQUESTS * (attempt + 1)
            time.sleep(delay)
            
            translator = GoogleTranslator(source='en', target=target_lang)
            result = translator.translate(text)
            
            if result and result != text:
                return result
            
            # If result is empty or same as input, try again
            if attempt < max_retries - 1:
                with print_lock:
                    print(f"  Retry {attempt + 1}/{max_retries} for '{text[:30]}...' to {target_lang}")
                time.sleep(0.5)  # Extra delay before retry
                continue
                
        except Exception as e:
            if attempt < max_retries - 1:
                with print_lock:
                    print(f"  Retry {attempt + 1}/{max_retries} for '{text[:30]}...' to {target_lang}: {e}")
                time.sleep(1.0)  # Longer delay after error
                continue
            else:
                with print_lock:
                    print(f"  Warning: Translation failed after {max_retries} attempts for '{text}' to {target_lang}: {e}")
    
    # Return original text if all retries failed
    return text


def safe_print(*args, **kwargs):
    """Thread-safe print"""
    with print_lock:
        print(*args, **kwargs)


def translate_single_line(line_num, en_text, google_lang):
    """
    Translate a single line. Returns (line_num, en_text, translated_text).
    """
    translated = translate_text(en_text, google_lang)
    return (line_num, en_text, translated)


def process_language_file(lang_file, google_lang, en_lines, target_lines):
    """
    Process a single language file - translate missing lines in parallel and write sequentially.
    Returns a tuple of (lang_file.name, num_added, success)
    """
    lang_code = lang_file.stem
    lang_name = lang_file.name
    
    # Parse existing translations
    existing = parse_txt_file(lang_file)
    
    # Find missing lines and sort them
    missing = sorted([n for n in target_lines if n not in existing and n in en_lines])
    
    if not missing:
        safe_print(f"{lang_name}: up to date")
        return (lang_name, 0, True)
    
    safe_print(f"{lang_name}: translating {len(missing)} lines to {google_lang}...")
    
    # Track completed translations and writing state
    completed = {}  # line_num -> (en_text, translated)
    next_to_write_idx = 0  # Index into missing[] for next line to write
    write_lock = threading.Lock()
    file_handle = None
    
    def on_translation_complete(line_num, en_text, translated):
        """Called when a translation completes. Writes lines in order."""
        nonlocal next_to_write_idx, file_handle
        
        with write_lock:
            # Store the completed translation
            completed[line_num] = (en_text, translated)
            
            # Open file on first write
            if file_handle is None:
                file_handle = open(lang_file, 'a', encoding='utf-8')
                file_handle.write('\n')
            
            # Write all contiguous completed lines starting from next_to_write_idx
            while next_to_write_idx < len(missing):
                next_line_num = missing[next_to_write_idx]
                if next_line_num not in completed:
                    break  # Not yet translated, wait
                
                en_text, translated = completed[next_line_num]
                escaped = escape_quotes(translated)
                output_line = f'{next_line_num}\t"{escaped}"'
                file_handle.write(output_line + '\n')
                file_handle.flush()  # Ensure it's written immediately
                
                safe_print(f"  [{lang_name}] {next_line_num}: \"{en_text}\" -> \"{translated}\"")
                
                # Clean up and advance
                del completed[next_line_num]
                next_to_write_idx += 1
    
    try:
        # Translate all lines in parallel
        with ThreadPoolExecutor(max_workers=MAX_LINE_WORKERS) as executor:
            futures = {
                executor.submit(translate_single_line, line_num, en_lines[line_num], google_lang): line_num
                for line_num in missing
            }
            
            for future in as_completed(futures):
                line_num = futures[future]
                try:
                    result_line_num, en_text, translated = future.result()
                    on_translation_complete(result_line_num, en_text, translated)
                except Exception as e:
                    safe_print(f"  [{lang_name}] Error translating line {line_num}: {e}")
                    # Use original English text on error
                    on_translation_complete(line_num, en_lines[line_num], en_lines[line_num])
    finally:
        if file_handle:
            file_handle.close()
    
    safe_print(f"  [{lang_name}] Added {len(missing)} lines")
    return (lang_name, len(missing), True)

def main():
    script_dir = Path(__file__).parent
    en_file = script_dir / 'en-GB.txt'
    
    if not en_file.exists():
        print(f"Error: {en_file} not found")
        sys.exit(1)
    
    # Parse English source file
    en_lines = parse_txt_file(en_file)
    print(f"Loaded {len(en_lines)} lines from en-GB.txt")
    
    # Determine which lines to translate
    if len(sys.argv) > 1:
        # Specific line numbers provided
        target_lines = [int(x) for x in sys.argv[1:]]
    else:
        # Find all lines that might be missing from other files
        target_lines = sorted(en_lines.keys())
    
    print(f"Lines to translate: {target_lines}")
    
    # Get all language files
    txt_files = list(script_dir.glob('*.txt'))
    lang_files = [f for f in txt_files if f.name not in ('en-GB.txt', 'template.txt', 'play.txt')]
    
    # Build list of (lang_file, google_lang) pairs to process
    work_items = []
    for lang_file in sorted(lang_files):
        lang_code = lang_file.stem  # e.g., 'de-DE' from 'de-DE.txt'
        google_lang = LANG_MAP.get(lang_code)
        
        if not google_lang:
            print(f"Skipping {lang_file.name}: no language mapping")
            continue
        
        work_items.append((lang_file, google_lang))
    
    print(f"\nProcessing {len(work_items)} languages ({MAX_LANG_WORKERS} lang workers, {MAX_LINE_WORKERS} line workers each)...\n")
    
    # Process languages in parallel
    total_added = 0
    langs_completed = 0
    
    with ThreadPoolExecutor(max_workers=MAX_LANG_WORKERS) as executor:
        # Submit all tasks
        futures = {
            executor.submit(process_language_file, lang_file, google_lang, en_lines, target_lines): lang_file.name
            for lang_file, google_lang in work_items
        }
        
        # Process results as they complete
        for future in as_completed(futures):
            lang_name = futures[future]
            try:
                name, num_added, success = future.result()
                total_added += num_added
                langs_completed += 1
            except Exception as e:
                safe_print(f"Error processing {lang_name}: {e}")
                langs_completed += 1
    
    print(f"\nDone! Processed {langs_completed} languages, added {total_added} total translations.")

if __name__ == '__main__':
    main()
