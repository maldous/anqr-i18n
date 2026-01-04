#!/usr/bin/env python3
"""
xlate.py - Translate specific lines from en-GB.txt to all other language files.

Usage:
    python xlate.py [line_numbers...] [--opts...]

Examples:
    python xlate.py --list-langs
    python xlate.py 1419 1420 1421
    python xlate.py --qps 0.7 --workers 1         # safer for free engines
    python xlate.py --engine google --batch-size 15

What changed vs the earlier version:
    - FIX: deep_translator.GoogleTranslator.translate_batch often issues *one request per string*.
           This script now translates batches by joining strings into one request (drastically fewer requests).
    - Global rate limiter across threads + exponential backoff with jitter.
    - Multi-engine fallback chain (Azure/DeepL/LibreTranslate/Google/MyMemory) where configured.
    - Writes language files deterministically (sorted, no duplicate IDs).
    - Better parsing: supports `123\t"..."`, `123="..."`, `123: "..."`, `123 "..."`.

Engines (free-ish):
    - google: no key, but unofficial endpoint; rate limits can be strict
    - libretranslate: set LIBRETRANSLATE_URL (and optionally LIBRETRANSLATE_KEY)
    - mymemory: no key, small quotas; optional MYMEMORY_EMAIL increases limits
    - deepl: set DEEPL_KEY (free tier key)
    - azure: set AZURE_TRANSLATOR_KEY and AZURE_TRANSLATOR_REGION (free tier)
"""

from __future__ import annotations

import argparse
import faulthandler
import signal
import os
import re
import sys
import time
import json
import random
import threading
import sqlite3
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, Iterable, List, Optional, Tuple
from concurrent.futures import ThreadPoolExecutor, as_completed

# -----------------------------
# Optional third-party deps
# -----------------------------
def _ensure(pkg: str, import_name: str):
    try:
        return __import__(import_name)
    except ImportError:
        print(f"Installing {pkg}...")
        import subprocess
        subprocess.run([sys.executable, "-m", "pip", "install", "--user", pkg], check=True)
        return __import__(import_name)

deep_translator = _ensure("deep-translator", "deep_translator")

try:
    import requests  # type: ignore
except ImportError:
    requests = _ensure("requests", "requests")

# -----------------------------
# Concurrency / rate config
# -----------------------------
DEBUG = False
DEFAULT_WORKERS = 1          # safest default for free engines
DEFAULT_BATCH_SIZE = 25      # number of strings per joined request (also bounded by max_chars)
DEFAULT_MAX_CHARS = 3500     # keep joined payload small to avoid service limits
DEFAULT_QPS = 0.8            # <= 1 request/sec is usually stable on free endpoints
MAX_RETRIES = 8
INITIAL_BACKOFF = 2.0
MAX_BACKOFF = 120.0

# -----------------------------
# Language mapping
# -----------------------------
# Explicit overrides for filename stem -> engine code
LANG_MAP: Dict[str, str] = {
    "bn-BD": "bn",
    "cs-CZ": "cs",
    "da-DK": "da",
    "de-DE": "de",
    "el-GR": "el",
    "es-ES": "es",
    "fi-FI": "fi",
    "fr-FR": "fr",
    "hi-IN": "hi",
    "hu-HU": "hu",
    "it-IT": "it",
    "ja-JP": "ja",
    "km-KH": "km",
    "kn-IN": "kn",
    "ko-KR": "ko",
    "lo-LA": "lo",
    "ml-IN": "ml",
    "mr-IN": "mr",
    "my-MM": "my",
    "ne-NP": "ne",
    "nl-NL": "nl",
    "no-NO": "no",
    "pl-PL": "pl",
    "pt-BR": "pt",
    "ru-RU": "ru",
    "sv-SE": "sv",
    "ta-IN": "ta",
    "te-IN": "te",
    "zh-CN": "zh-CN",
    "fil": "tl",      # Filipino -> Tagalog
}

def normalize_lang(stem: str) -> str:
    """Map a locale filename stem to a best-effort target code."""
    if stem in LANG_MAP:
        return LANG_MAP[stem]

    # common patterns: pt-PT, en-US, zh-TW, sr-Latn, etc.
    s = stem.replace("_", "-")
    if s.lower().startswith("zh-"):
        # Keep full if provided (zh-CN/zh-TW). Otherwise default to zh-CN.
        return stem if stem in ("zh-CN", "zh-TW") else "zh-CN"

    base = s.split("-")[0]
    return base.lower()

# -----------------------------
# IO helpers
# -----------------------------
print_lock = threading.Lock()
def safe_print(*args, **kwargs):
    # Always flush so progress appears immediately even when stdout is buffered
    if "flush" not in kwargs:
        kwargs["flush"] = True
    with print_lock:
        print(*args, **kwargs)

def escape_quotes(text: str) -> str:
    return text.replace("\\", "\\\\").replace('"', '\\"')

def unescape_quotes(text: str) -> str:
    return text.replace('\\"', '"').replace("\\\\", "\\")

LINE_RE = re.compile(r'^\s*(\d+)\s*(?:\t|=|:|\s)\s*"(.*)"\s*$')

def parse_txt_file(filepath: Path) -> Dict[int, str]:
    """Parse .txt file into {id:int -> text:str}"""
    out: Dict[int, str] = {}
    if not filepath.exists():
        return out
    for raw in filepath.read_text(encoding="utf-8").splitlines():
        raw = raw.strip()
        if not raw:
            continue
        m = LINE_RE.match(raw)
        if not m:
            continue
        out[int(m.group(1))] = unescape_quotes(m.group(2))
    return out

def write_txt_file(filepath: Path, mapping: Dict[int, str]) -> None:
    """Write deterministically (sorted by id)."""
    lines = []
    for k in sorted(mapping.keys()):
        lines.append(f'{k}\t"{escape_quotes(mapping[k])}"')
    filepath.write_text("\n".join(lines) + "\n", encoding="utf-8")

# -----------------------------
# Placeholder protection
# -----------------------------
PH_RE = re.compile(
    r"(\{\{.*?\}\}|\{.*?\}|%\d*\$?[sdif]|<[^>]+>|https?://\S+)",
    re.DOTALL,
)

def protect(text: str) -> Tuple[str, Dict[str, str]]:
    """
    Replace sensitive tokens (placeholders, tags, urls) with stable sentinels,
    to reduce breakage across translations.
    """
    mapping: Dict[str, str] = {}
    idx = 0

    def repl(m: re.Match) -> str:
        nonlocal idx
        token = m.group(0)
        key = f"__ANQR_PH_{idx:04d}__"
        mapping[key] = token
        idx += 1
        return key

    protected = PH_RE.sub(repl, text)
    return protected, mapping

def unprotect(text: str, mapping: Dict[str, str]) -> str:
    for k, v in mapping.items():
        text = text.replace(k, v)
    return text

# -----------------------------
# Simple persistent cache
# -----------------------------
class Cache:
    def __init__(self, path: Path):
        self.path = path
        self._lock = threading.Lock()
        self._conn = sqlite3.connect(str(path), check_same_thread=False)
        self._conn.execute(
            "CREATE TABLE IF NOT EXISTS t (engine TEXT, lang TEXT, src TEXT, dst TEXT, PRIMARY KEY(engine, lang, src))"
        )
        self._conn.commit()

    def get_many(self, engine: str, lang: str, srcs: List[str]) -> Dict[str, str]:
        if not srcs:
            return {}
        with self._lock:
            cur = self._conn.cursor()
            qmarks = ",".join(["?"] * len(srcs))
            rows = cur.execute(
                f"SELECT src, dst FROM t WHERE engine=? AND lang=? AND src IN ({qmarks})",
                [engine, lang, *srcs],
            ).fetchall()
        return {s: d for (s, d) in rows}

    def put_many(self, engine: str, lang: str, pairs: List[Tuple[str, str]]) -> None:
        if not pairs:
            return
        with self._lock:
            self._conn.executemany(
                "INSERT OR REPLACE INTO t(engine, lang, src, dst) VALUES(?,?,?,?)",
                [(engine, lang, s, d) for (s, d) in pairs],
            )
            self._conn.commit()

# -----------------------------
# Global rate limiter
# -----------------------------
class RateLimiter:
    def __init__(self, qps: float):
        self.min_interval = 1.0 / max(qps, 0.001)
        self._lock = threading.Lock()
        self._next = 0.0

    def wait(self):
        with self._lock:
            now = time.monotonic()
            if now < self._next:
                time.sleep(self._next - now)
            self._next = time.monotonic() + self.min_interval

# -----------------------------
# Engines
# -----------------------------
@dataclass
class EngineResult:
    ok: bool
    outputs: List[str]
    engine_name: str
    error: Optional[str] = None

@dataclass
class EngineResult:
    ok: bool
    outputs: List[str]
    engine_name: str
    error: Optional[str] = None

class UnsupportedLanguageError(RuntimeError):
    """Raised when an engine doesn't support a requested target language."""
    pass

class Engine:
    name: str

    def available(self) -> bool:
        return True

    def normalize_target(self, target: str) -> str:
        """Engine-specific target normalization (e.g., zh-CN -> zh)."""
        return target

    def supports_target(self, target: str) -> bool:
        """Whether this engine supports the given target (post-normalization)."""
        return True

    def translate_list(self, texts: List[str], target: str) -> List[str]:
        """
        Use LibreTranslate batch mode: send q as an array, get translatedText as an array.
        This avoids separator-splitting issues (LibreTranslate can normalize newlines).
        """
        url_base = os.environ["LIBRETRANSLATE_URL"].rstrip("/")
        url = url_base + "/translate"
        key = os.environ.get("LIBRETRANSLATE_KEY")
        tgt = self.normalize_target(target)

        if not self.supports_target(tgt):
            raise UnsupportedLanguageError(f"LibreTranslate does not support target '{tgt}'")

        payload = {"q": texts, "source": "en", "target": tgt, "format": "text"}
        if key:
            payload["api_key"] = key

        r = requests.post(url, json=payload, timeout=180)

        # Raise richer error details for debugging
        if r.status_code >= 400:
            try:
                err = r.json()
            except Exception:
                err = {"error": r.text[:500]}
            msg = err.get("error") or err.get("message") or str(err)
            if "not supported" in str(msg).lower():
                raise UnsupportedLanguageError(str(msg))
            raise RuntimeError(f"{r.status_code} LibreTranslate error: {msg}")

        data = r.json()
        tt = data.get("translatedText")

        if isinstance(tt, list):
            return [str(x) for x in tt]
        if isinstance(tt, str) and len(texts) == 1:
            return [tt]

        raise RuntimeError(
            "LibreTranslate batch response was not a list. "
            "Your server may not support q as an array."
        )


    def translate_joined(self, joined: str, target: str) -> str:
        raise NotImplementedError

class GoogleEngine(Engine):
    name = "google"
    def translate_joined(self, joined: str, target: str) -> str:
        gt = deep_translator.GoogleTranslator(source="en", target=target)
        return gt.translate(joined)

class MyMemoryEngine(Engine):
    name = "mymemory"
    def translate_joined(self, joined: str, target: str) -> str:
        email = os.environ.get("MYMEMORY_EMAIL")
        mm = deep_translator.MyMemoryTranslator(source="en", target=target, email=email) if email else deep_translator.MyMemoryTranslator(source="en", target=target)
        return mm.translate(joined)

class LibreTranslateEngine(Engine):
    name = "libretranslate"

    def __init__(self) -> None:
        self._langs: Optional[set[str]] = None
        self._langs_lock = threading.Lock()

    def available(self) -> bool:
        return bool(os.environ.get("LIBRETRANSLATE_URL"))

    def normalize_target(self, target: str) -> str:
        """
        Normalize/alias-resolve language codes for *this* LibreTranslate server.

        Some deployments expose aliases differently, e.g.:
          - Norwegian: "nb"/"nn" instead of "no"
          - Filipino: "tl" instead of "fil"
          - Chinese: may be "zh" or variants (zh-cn, zh-tw, ...)

        We resolve against /languages (loaded once) so your on-disk codes can stay standard.
        """
        t = target.replace("_", "-").strip()

        if t.lower().startswith("zh-"):
            base = "zh"
        else:
            base = t.split("-")[0].lower()

        aliases = {
            "no": ["nb", "nn"],
            "nb": ["no"],
            "nn": ["no"],
            "fil": ["tl"],
            "tl": ["fil"],
            "zh": ["zh-cn", "zh-tw", "zh-hans", "zh-hant"],
        }

        with self._langs_lock:
            if self._langs is None:
                try:
                    self._langs = self._fetch_languages()
                except Exception:
                    self._langs = set()

            if self._langs:
                if base in self._langs:
                    return base
                for a in aliases.get(base, []):
                    if a in self._langs:
                        return a

        return base


    def _fetch_languages(self) -> set[str]:
        url_base = os.environ.get("LIBRETRANSLATE_URL", "").rstrip("/")
        if not url_base:
            return set()
        url = url_base + "/languages"
        r = requests.get(url, timeout=30)
        r.raise_for_status()
        data = r.json()
        # Expected: [{"code":"en","name":"English"}, ...]
        codes = set()
        for item in data:
            c = (item.get("code") or "").strip()
            if c:
                codes.add(c)
        return codes

    def supports_target(self, target: str) -> bool:
        # normalize_target() loads /languages and alias-resolves when possible
        t = self.normalize_target(target)
        if not self._langs:
            return True
        return t in self._langs


    def translate_joined(self, joined: str, target: str) -> str:
        url_base = os.environ["LIBRETRANSLATE_URL"].rstrip("/")
        url = url_base + "/translate"
        key = os.environ.get("LIBRETRANSLATE_KEY")
        tgt = self.normalize_target(target)

        if not self.supports_target(tgt):
            raise UnsupportedLanguageError(f"LibreTranslate does not support target '{tgt}'")

        payload = {"q": joined, "source": "en", "target": tgt, "format": "text"}
        if key:
            payload["api_key"] = key

        r = requests.post(url, json=payload, timeout=120)

        # Raise richer error details for debugging
        if r.status_code >= 400:
            try:
                err = r.json()
            except Exception:
                err = {"error": r.text[:500]}
            msg = err.get("error") or err.get("message") or str(err)
            if "not supported" in str(msg).lower():
                raise UnsupportedLanguageError(str(msg))
            raise RuntimeError(f"{r.status_code} LibreTranslate error: {msg}")

        data = r.json()
        return data.get("translatedText") or ""


class DeepLEngine(Engine):
    name = "deepl"
    def available(self) -> bool:
        return bool(os.environ.get("DEEPL_KEY"))
    def translate_joined(self, joined: str, target: str) -> str:
        # Optional (free tier): pip install deepl
        deepl = _ensure("deepl", "deepl")
        tr = deepl.Translator(os.environ["DEEPL_KEY"])
        # DeepL expects target like DE, FR, etc. We'll pass upper base; DeepL will validate.
        tgt = target.replace("-", "_").upper()
        return tr.translate_text(joined, target_lang=tgt).text

class AzureEngine(Engine):
    name = "azure"
    def available(self) -> bool:
        return bool(os.environ.get("AZURE_TRANSLATOR_KEY") and os.environ.get("AZURE_TRANSLATOR_REGION"))
    def translate_joined(self, joined: str, target: str) -> str:
        key = os.environ["AZURE_TRANSLATOR_KEY"]
        region = os.environ["AZURE_TRANSLATOR_REGION"]
        endpoint = os.environ.get("AZURE_TRANSLATOR_ENDPOINT", "https://api.cognitive.microsofttranslator.com")
        url = endpoint.rstrip("/") + "/translate?api-version=3.0"
        params = {"to": target}
        headers = {
            "Ocp-Apim-Subscription-Key": key,
            "Ocp-Apim-Subscription-Region": region,
            "Content-type": "application/json",
        }
        body = [{"text": joined}]
        r = requests.post(url, params=params, headers=headers, json=body, timeout=60)
        r.raise_for_status()
        data = r.json()
        return data[0]["translations"][0]["text"]

# -----------------------------
# Translation core
# -----------------------------
SEP = "\n__ANQR_XLATE_SEP_9d0f7a9e__\n"

def chunk_by_chars(texts: List[str], max_chars: int) -> List[List[str]]:
    chunks: List[List[str]] = []
    cur: List[str] = []
    cur_len = 0
    for t in texts:
        add = len(t) + len(SEP)
        if cur and cur_len + add > max_chars:
            chunks.append(cur)
            cur = [t]
            cur_len = len(t)
        else:
            cur.append(t)
            cur_len += add
    if cur:
        chunks.append(cur)
    return chunks

def try_translate(engine: Engine, limiter: RateLimiter, texts: List[str], target: str, batch_size: int, max_chars: int, cache: Cache) -> EngineResult:
    """
    Translate texts using joined-batch method:
      - protect placeholders
      - dedupe within request
      - cache
      - join with stable SEP and translate in chunks (bounded by max_chars)
    """
    if not texts or target == "en":
        return EngineResult(ok=True, outputs=texts, engine_name=engine.name)

    # Engine-specific target normalization + support check
    target_norm = engine.normalize_target(target)
    if not engine.supports_target(target_norm):
        return EngineResult(ok=False, outputs=texts, engine_name=engine.name, error=f"unsupported target: {target_norm}")


    # protect + track per-text placeholder maps
    protected: List[str] = []
    ph_maps: List[Dict[str, str]] = []
    for t in texts:
        p, m = protect(t)
        protected.append(p)
        ph_maps.append(m)

    # cache lookup (on protected forms)
    cached = cache.get_many(engine.name, target_norm, list(dict.fromkeys(protected)))

    # translate missing uniques
    uniques: List[str] = []
    for p in protected:
        if p not in cached and p not in uniques:
            uniques.append(p)

    # translate uniques in manageable groups
    translated_uniques: Dict[str, str] = {}
    try:
        # break into request groups by count, then by char size
        for i in range(0, len(uniques), batch_size):
            group = uniques[i : i + batch_size]
            for chunk in chunk_by_chars(group, max_chars=max_chars):
                limiter.wait()
                if engine.name == "libretranslate" and hasattr(engine, "translate_list"):
                    if DEBUG:
                        safe_print(f"    -> request engine={engine.name} lang={target_norm} items={len(chunk)} (batch-array)")
                    parts = engine.translate_list(chunk, target_norm)  # type: ignore[attr-defined]
                    if not parts:
                        raise RuntimeError("empty translation response")
                    if len(parts) != len(chunk):
                        raise RuntimeError(f"batch size mismatch: expected {len(chunk)} got {len(parts)}")
                    for src, dst in zip(chunk, parts):
                        translated_uniques[src] = dst
                else:
                    joined = SEP.join(chunk)
                    if DEBUG:
                        safe_print(f"    -> request engine={engine.name} lang={target_norm} items={len(chunk)} chars={len(joined)}")
                    out = engine.translate_joined(joined, target_norm)

                    # if service returns empty, treat as failure
                    if not out:
                        raise RuntimeError("empty translation response")

                    parts = out.split(SEP)
                    if len(parts) != len(chunk):
                        raise RuntimeError(f"separator split mismatch: expected {len(chunk)} got {len(parts)}")

                    for src, dst in zip(chunk, parts):
                        translated_uniques[src] = dst


                # small jitter to avoid periodic throttles
                time.sleep(0.10 + random.random() * 0.15)

        # persist cache for this engine/lang
        cache.put_many(engine.name, target_norm, list(translated_uniques.items()))
        cached.update(translated_uniques)

        # rebuild outputs and unprotect
        outputs: List[str] = []
        for p, m in zip(protected, ph_maps):
            raw = cached.get(p, p)
            outputs.append(unprotect(raw, m))

        return EngineResult(ok=True, outputs=outputs, engine_name=engine.name)

    except Exception as e:
        return EngineResult(ok=False, outputs=texts, engine_name=engine.name, error=str(e))

def translate_with_fallback(
    engines: List[Engine],
    limiter: RateLimiter,
    texts: List[str],
    target: str,
    batch_size: int,
    max_chars: int,
    cache: Cache,
) -> Tuple[List[str], str]:
    """
    Attempt engines in order with retry/backoff on transient errors.
    Returns (translations, engine_name_used).
    """
    backoff = INITIAL_BACKOFF
    last_err: Optional[str] = None

    for engine in engines:
        if not engine.available():
            continue

        # retry per engine (useful for 429s)
        for attempt in range(MAX_RETRIES):
            res = try_translate(engine, limiter, texts, target, batch_size, max_chars, cache)
            if res.ok:
                return res.outputs, res.engine_name

            last_err = res.error or "unknown error"
            if "unsupported target" in last_err.lower():
                safe_print(f"  [{engine.name}] skipping (unsupported language for this engine)")
                break

            msg = last_err.lower()
            is_rate = ("429" in msg) or ("too many" in msg) or ("rate" in msg) or ("throttle" in msg)
            is_transient = is_rate or ("timeout" in msg) or ("temporar" in msg) or ("503" in msg) or ("502" in msg)

            if attempt < MAX_RETRIES - 1 and is_transient:
                sleep_for = min(backoff, MAX_BACKOFF) + random.random() * 0.5
                safe_print(f"  [{engine.name}] transient error: {last_err} -> retry {attempt+1}/{MAX_RETRIES} after {sleep_for:.1f}s")
                time.sleep(sleep_for)
                backoff = min(backoff * 2.0, MAX_BACKOFF)
                continue
            else:
                safe_print(f"  [{engine.name}] failed: {last_err}")
                break

        # reset backoff when moving to next engine
        backoff = INITIAL_BACKOFF

    # fallback: return originals if everything fails
    safe_print(f"  All engines failed for {target}. Last error: {last_err}")
    if last_err and "unsupported" in last_err.lower():
        return texts, "unsupported"
    return texts, "none"

# -----------------------------
# Per-language processing
# -----------------------------
def process_language_file(
    lang_file: Path,
    target_code: str,
    en_lines: Dict[int, str],
    target_lines: List[int],
    engines: List[Engine],
    limiter: RateLimiter,
    batch_size: int,
    max_chars: int,
    cache: Cache,
    dry_run: bool,
) -> Tuple[str, int, bool, str]:
    lang_name = lang_file.name
    existing = parse_txt_file(lang_file)

    missing = [n for n in target_lines if n in en_lines and n not in existing]
    if not missing:
        safe_print(f"{lang_name}: up to date")
        return (lang_name, 0, True, "none")

    safe_print(f"{lang_name}: translating {len(missing)} lines -> {target_code}")
    if DEBUG:
        safe_print(f"  engines=" + ",".join([e.name for e in engines if e.available()]))

    texts = [en_lines[n] for n in missing]
    translated, used_engine = translate_with_fallback(
        engines=engines,
        limiter=limiter,
        texts=texts,
        target=target_code,
        batch_size=batch_size,
        max_chars=max_chars,
        cache=cache,
    )

    # merge and write deterministically (avoid duplicates)
    for n, t in zip(missing, translated):
        existing[n] = t

    if used_engine == "unsupported":
        safe_print(f"  [{lang_name}] Skipped: LibreTranslate does not support '{target_code}' on this server")
        return (lang_name, 0, True, used_engine)

    if not dry_run:
        write_txt_file(lang_file, existing)

    safe_print(f"  [{lang_name}] Added {len(missing)} lines (engine={used_engine})")
    return (lang_name, len(missing), True, used_engine)

def build_engine_chain(preferred: Optional[str]) -> List[Engine]:
    """
    Engine order:
      - If preferred set, only that engine (if available).
      - Else:
          * If LIBRETRANSLATE_URL is set, default to LibreTranslate ONLY (local-first, no external calls).
          * Otherwise: azure -> deepl -> libretranslate -> google -> mymemory
    """
    registry: Dict[str, Engine] = {
        "azure": AzureEngine(),
        "deepl": DeepLEngine(),
        "libretranslate": LibreTranslateEngine(),
        "google": GoogleEngine(),
        "mymemory": MyMemoryEngine(),
    }

    if preferred:
        e = registry.get(preferred)
        if not e:
            raise SystemExit(f"Unknown engine: {preferred}. Choose from: {', '.join(registry.keys())}")
        return [e]

    # Local LibreTranslate present? Use it exclusively by default.
    if os.environ.get("LIBRETRANSLATE_URL"):
        return [registry["libretranslate"]]

    return [registry["azure"], registry["deepl"], registry["libretranslate"], registry["google"], registry["mymemory"]]


def list_langs(script_dir: Path):
    en_file = script_dir / "en-GB.txt"
    txt_files = list(script_dir.glob("*.txt"))
    lang_files = [f for f in txt_files if f.name not in ("en-GB.txt", "template.txt", "play.txt")]
    print("Language files found:\n")
    for f in sorted(lang_files):
        stem = f.stem
        code = normalize_lang(stem)
        print(f"  {f.name:<15} -> {code}")
    print("\n(If a file isn't listed, it doesn't exist in this folder.)")

def main() -> None:
    # Debug: allow `kill -USR1 <pid>` to dump Python stack traces
    try:
        faulthandler.register(signal.SIGUSR1)
    except Exception:
        pass
    ap = argparse.ArgumentParser()
    ap.add_argument("lines", nargs="*", help="Line numbers to translate (default: all)")
    ap.add_argument("--workers", type=int, default=DEFAULT_WORKERS)
    ap.add_argument("--batch-size", type=int, default=DEFAULT_BATCH_SIZE)
    ap.add_argument("--max-chars", type=int, default=DEFAULT_MAX_CHARS)
    ap.add_argument("--qps", type=float, default=DEFAULT_QPS, help="Global requests/sec across all threads")
    ap.add_argument("--engine", type=str, default=None, help="Force one engine: google|libretranslate|mymemory|deepl|azure")
    ap.add_argument("--list-langs", action="store_true")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--debug", action="store_true", help="Print per-request progress and enable stack dumps via SIGUSR1")
    args = ap.parse_args()

    global DEBUG
    DEBUG = bool(args.debug)

    script_dir = Path(__file__).parent
    if args.list_langs:
        list_langs(script_dir)
        return

    en_file = script_dir / "en-GB.txt"
    if not en_file.exists():
        raise SystemExit(f"Error: {en_file} not found")

    en_lines = parse_txt_file(en_file)
    safe_print(f"Loaded {len(en_lines)} lines from en-GB.txt")

    if args.lines:
        target_lines = [int(x) for x in args.lines]
    else:
        target_lines = sorted(en_lines.keys())

    # discover language files
    txt_files = list(script_dir.glob("*.txt"))
    lang_files = [f for f in txt_files if f.name not in ("en-GB.txt", "template.txt", "play.txt")]

    work_items: List[Tuple[Path, str]] = []
    for lf in sorted(lang_files):
        stem = lf.stem
        target_code = normalize_lang(stem)
        if target_code == "en":
            continue
        work_items.append((lf, target_code))

    engines = build_engine_chain(args.engine)
    limiter = RateLimiter(qps=args.qps)
    cache = Cache(script_dir / ".xlate_cache.sqlite")

    safe_print(f"\nProcessing {len(work_items)} languages (workers={args.workers}, qps={args.qps}, batch={args.batch_size}, max_chars={args.max_chars})...\n")

    total_added = 0
    completed = 0

    # With global limiter, >1 worker is OK but doesn't increase total request rate.
    with ThreadPoolExecutor(max_workers=max(1, args.workers)) as ex:
        futures = {
            ex.submit(
                process_language_file,
                lf,
                code,
                en_lines,
                target_lines,
                engines,
                limiter,
                args.batch_size,
                args.max_chars,
                cache,
                args.dry_run,
            ): lf.name
            for lf, code in work_items
        }

        for fut in as_completed(futures):
            name = futures[fut]
            try:
                _name, added, ok, used_engine = fut.result()
                total_added += added
                completed += 1
            except Exception as e:
                safe_print(f"Error processing {name}: {e}")
                completed += 1

    safe_print(f"\nDone! Processed {completed} languages, added {total_added} total translations.")
    safe_print("Tip: run with --qps 0.5 --workers 1 if you still see throttling.")

if __name__ == "__main__":
    main()
