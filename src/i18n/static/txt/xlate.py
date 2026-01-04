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
MAX_WORKERS = 8  # Number of parallel language translations (conservative to avoid rate limiting)
DELAY_BETWEEN_REQUESTS = 0.1  # Small delay between individual translation requests

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


def process_language_file(lang_file, google_lang, en_lines, target_lines):
    """
    Process a single language file - translate missing lines and append them.
    Returns a tuple of (lang_file.name, num_added, success)
    """
    lang_code = lang_file.stem
    
    # Parse existing translations
    existing = parse_txt_file(lang_file)
    
    # Find missing lines
    missing = [n for n in target_lines if n not in existing and n in en_lines]
    
    if not missing:
        safe_print(f"{lang_file.name}: up to date")
        return (lang_file.name, 0, True)
    
    safe_print(f"{lang_file.name}: translating {len(missing)} lines to {google_lang}...")
    
    # Translate missing lines
    new_lines = []
    for line_num in sorted(missing):
        en_text = en_lines[line_num]
        translated = translate_text(en_text, google_lang)
        # Escape quotes in the translated text and format with tab separator
        escaped = escape_quotes(translated)
        new_lines.append(f'{line_num}\t"{escaped}"')
        safe_print(f"  [{lang_file.name}] {line_num}: \"{en_text}\" -> \"{translated}\"")
    
    # Append to file
    with open(lang_file, 'a', encoding='utf-8') as f:
        f.write('\n')
        for line in new_lines:
            f.write(line + '\n')
    
    safe_print(f"  Added {len(new_lines)} lines to {lang_file.name}")
    return (lang_file.name, len(new_lines), True)

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
    
    print(f"\nProcessing {len(work_items)} languages with {MAX_WORKERS} parallel workers...\n")
    
    # Process languages in parallel
    total_added = 0
    completed = 0
    
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
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
                completed += 1
            except Exception as e:
                safe_print(f"Error processing {lang_name}: {e}")
                completed += 1
    
    print(f"\nDone! Processed {completed} languages, added {total_added} total translations.")

if __name__ == '__main__':
    main()
