#!/usr/bin/env python3
from __future__ import annotations

"""
xlate.py

Translate en-GB.txt into locale .txt files.

Key features (opinionated for reliability):
- Tries local LibreTranslate first (if LIBRETRANSLATE_URL is set AND target supported by /languages EN targets)
- Falls back to Google Translate (unofficial gtx endpoint) for unsupported targets or when LibreTranslate fails
- Batch mode with numbered markers so we can split reliably
- Placeholder protection for common i18n patterns
- Never writes empty placeholder files; never deletes existing files on failure
- Atomic writes

File format:
  <id>\t"<text with escaped quotes>"
"""

import argparse
import concurrent.futures as cf
import json
import os
import random
import re
import signal
import sys
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, List, Tuple, Optional

import requests

DEFAULT_WORKERS = 1
DEFAULT_BATCH_SIZE = 25
DEFAULT_MAX_CHARS = 3500
DEFAULT_QPS = 0.8

DEBUG = False

SEP_MARK_RE = re.compile(r"\[\[\[\s*ANQR(\d+)\s*\]\]\]")

# Protect placeholders: {name}, {0}, {{var}}, %s, %d, %(name)s, %1$s, :name
PH_RE = re.compile(
    r"(\{\{[^{}]+\}\}|\{[^{}]+\}|%\([^)]+\)[sd]|%[0-9]+\$[sd]|%[sd]|:[A-Za-z_][A-Za-z0-9_]*|__ANQR_[A-Z0-9_]+__)",
    re.UNICODE,
)

def safe_print(*a: object, **k: object) -> None:
    print(*a, **k, flush=True)

def escape_quotes(s: str) -> str:
    return s.replace("\\", "\\\\").replace('"', '\\"')

def unescape_quotes(s: str) -> str:
    # supports our writer: \" and \\ only
    return s.replace('\\"', '"').replace("\\\\", "\\")

def parse_txt_file(path: Path) -> Dict[int, str]:
    out: Dict[int, str] = {}
    if not path.exists():
        return out
    for line in path.read_text(encoding="utf-8", errors="replace").splitlines():
        line = line.strip()
        if not line:
            continue
        m = re.match(r"^(\d+)\t\"(.*)\"$", line)
        if not m:
            continue
        k = int(m.group(1))
        v = unescape_quotes(m.group(2))
        out[k] = v
    return out

def write_txt_file_atomic(path: Path, mapping: Dict[int, str]) -> None:
    tmp = path.with_suffix(path.suffix + ".tmp")
    tmp.parent.mkdir(parents=True, exist_ok=True)
    lines: List[str] = []
    for k in sorted(mapping.keys()):
        lines.append(f'{k}\t"{escape_quotes(mapping[k])}"')
    tmp.write_text("\n".join(lines) + "\n", encoding="utf-8")
    tmp.replace(path)

def protect(s: str) -> Tuple[str, Dict[str, str]]:
    """
    Replace placeholders with tokens unlikely to be altered by translators.
    """
    repl: Dict[str, str] = {}
    idx = 0

    def sub(m: re.Match[str]) -> str:
        nonlocal idx
        tok = f"__ANQR_PH_{idx}__"
        repl[tok] = m.group(0)
        idx += 1
        return tok

    return PH_RE.sub(sub, s), repl

def unprotect(s: str, repl: Dict[str, str]) -> str:
    for tok, orig in repl.items():
        s = s.replace(tok, orig)
    return s

class RateLimiter:
    def __init__(self, qps: float):
        self.qps = max(0.001, qps)
        self.min_interval = 1.0 / self.qps
        self._next = time.monotonic()
        self._lock = None

    def wait(self) -> None:
        # single-thread friendly
        now = time.monotonic()
        if now < self._next:
            time.sleep(self._next - now)
        self._next = time.monotonic() + self.min_interval

@dataclass
class EngineResult:
    ok: bool
    outputs: List[str]
    engine: str
    error: str = ""

class Engine:
    name: str = "engine"
    def normalize_target(self, target: str) -> str:
        return target
    def supports_target(self, target_norm: str) -> bool:
        return True
    def translate_batch(self, texts: List[str], target_norm: str, limiter: RateLimiter, max_chars: int) -> List[str]:
        raise NotImplementedError

class LibreTranslateEngine(Engine):
    name = "libretranslate"
    def __init__(self, base_url: str, batch_size: int = DEFAULT_BATCH_SIZE):
        self.base_url = base_url.rstrip("/")
        self._targets_map: Optional[Dict[str, str]] = None  # lower -> canonical
        self._session = requests.Session()
        self.batch_size = int(max(1, batch_size))

    def _load_targets(self) -> Dict[str, str]:
        if self._targets_map is not None:
            return self._targets_map
        url = f"{self.base_url}/languages"
        r = self._session.get(url, timeout=30)
        r.raise_for_status()
        data = r.json()
        targets: List[str] = []
        for entry in data:
            if str(entry.get("code", "")).lower() == "en":
                targets = list(entry.get("targets") or [])
                break
        if not targets:
            # union fallback
            s = set()
            for entry in data:
                for t in (entry.get("targets") or []):
                    s.add(str(t))
            targets = sorted(s)
        self._targets_map = {t.lower(): t for t in targets}
        return self._targets_map

    def normalize_target(self, target: str) -> str:
        raw = target.replace("_", "-").strip()
        raw_l = raw.lower()
        tm = self._load_targets()

        # Chinese mapping to server script codes
        if raw_l == "zh" or raw_l.startswith("zh-"):
            subtags = raw_l.split("-")[1:]
            prefer_hant = any(st in {"tw", "hk", "mo"} or "hant" in st for st in subtags)
            if prefer_hant and "zh-hant" in tm:
                return tm["zh-hant"]
            if "zh-hans" in tm:
                return tm["zh-hans"]
            for k, v in tm.items():
                if k.startswith("zh"):
                    return v

        base = raw_l.split("-")[0]
        aliases = {
            "no": ["nb", "nn"],
            "nb": ["no"],
            "nn": ["no"],
            "fil": ["tl"],
            "tl": ["fil"],
        }
        candidates = [raw_l, base] + aliases.get(base, [])
        for c in candidates:
            if c in tm:
                return tm[c]
        # prefix match
        for k, v in tm.items():
            if k.startswith(base):
                return v
        return base

    def supports_target(self, target_norm: str) -> bool:
        tm = self._load_targets()
        return target_norm.lower() in tm

    def translate_batch(self, texts: List[str], target_norm: str, limiter: RateLimiter, max_chars: int) -> List[str]:
        # LibreTranslate: POST /translate {q, source:'en', target}
        url = f"{self.base_url}/translate"

        def mk_payload(batch: List[str]) -> Tuple[str, List[str]]:
            markers = [f"[[[ANQR{i}]]]" for i in range(len(batch))]
            parts: List[str] = []
            for m, s in zip(markers, batch):
                parts.append(m)
                parts.append(s)
            return "\n".join(parts), markers

        def parse_payload(out: str, n: int) -> List[str]:
            matches = list(SEP_MARK_RE.finditer(out))
            if len(matches) < n:
                return []
            segs: Dict[int, str] = {}
            for i, m in enumerate(matches):
                idx = int(m.group(1))
                start = m.end()
                end = matches[i + 1].start() if i + 1 < len(matches) else len(out)
                segs[idx] = out[start:end].strip("\n ").rstrip()
            return [segs.get(i, "") for i in range(n)]

        results: List[str] = []
        i = 0
        while i < len(texts):
            batch = texts[i : i + self.batch_size]
            joined, markers = mk_payload(batch)
            limiter.wait()
            r = self._session.post(
                url,
                json={"q": joined, "source": "en", "target": target_norm, "format": "text"},
                timeout=60,
            )
            r.raise_for_status()
            data = r.json()
            out = data.get("translatedText") or ""
            parts = parse_payload(out, len(batch))
            if len(parts) != len(batch) or any(p == "" for p in parts):
                # degrade to per-item (rare)
                if DEBUG:
                    safe_print(f"  [libretranslate] batch split mismatch; falling back to per-item ({target_norm})")
                for s in batch:
                    limiter.wait()
                    rr = self._session.post(
                        url,
                        json={"q": s, "source": "en", "target": target_norm, "format": "text"},
                        timeout=60,
                    )
                    rr.raise_for_status()
                    results.append((rr.json().get("translatedText") or s).strip())
            else:
                results.extend(parts)
            i += len(batch)
        return results

class GoogleGTXEngine(Engine):
    """
    Google Translate (unofficial) using translate.googleapis.com with client=gtx.
    No API key required. Batch mode uses markers and join/split.
    """
    name = "google"

    def __init__(self, batch_size: int = DEFAULT_BATCH_SIZE):
        self._session = requests.Session()
        self.batch_size = int(max(1, batch_size))

    def normalize_target(self, target: str) -> str:
        # gtx accepts BCP47-ish; keep base for most.
        return target.replace("_", "-").strip()

    def translate_batch(self, texts: List[str], target_norm: str, limiter: RateLimiter, max_chars: int) -> List[str]:
        endpoint = "https://translate.googleapis.com/translate_a/single"

        def gtx_translate(q: str) -> str:
            # Use GET; requests handles encoding
            params = {
                "client": "gtx",
                "sl": "en",
                "tl": target_norm,
                "dt": "t",
                "q": q,
            }
            limiter.wait()
            r = self._session.get(endpoint, params=params, timeout=60)
            r.raise_for_status()
            data = r.json()
            # data[0] is list of [translated, original, ...]
            chunks = []
            for part in (data[0] or []):
                if part and isinstance(part, list):
                    chunks.append(part[0] or "")
            return "".join(chunks)

        def mk_payload(batch: List[str]) -> Tuple[str, int]:
            markers = [f"[[[ANQR{i}]]]" for i in range(len(batch))]
            parts: List[str] = []
            for m, s in zip(markers, batch):
                parts.append(m)
                parts.append(s)
            joined = "\n".join(parts)
            return joined, len(batch)

        def parse_payload(out: str, n: int) -> List[str]:
            matches = list(SEP_MARK_RE.finditer(out))
            if len(matches) < n:
                return []
            segs: Dict[int, str] = {}
            for i, m in enumerate(matches):
                idx = int(m.group(1))
                start = m.end()
                end = matches[i + 1].start() if i + 1 < len(matches) else len(out)
                segs[idx] = out[start:end].strip("\n ").rstrip()
            return [segs.get(i, "") for i in range(n)]

        results: List[str] = []
        i = 0
        while i < len(texts):
            batch = texts[i : i + self.batch_size]
            joined, n = mk_payload(batch)

            # Hard limit join size
            if len(joined) > max_chars and len(batch) > 1:
                # split batch
                mid = max(1, len(batch) // 2)
                results.extend(self.translate_batch(batch[:mid], target_norm, limiter, max_chars))
                results.extend(self.translate_batch(batch[mid:], target_norm, limiter, max_chars))
                i += len(batch)
                continue

            try:
                out = gtx_translate(joined)
                parts = parse_payload(out, n)
                if len(parts) != n:
                    if DEBUG:
                        safe_print(f"  [google] marker parse failed; falling back to per-item ({target_norm})")
                    raise ValueError("marker-parse-failed")
                # If some entries come back empty, translate those individually.
                for j, s in enumerate(batch):
                    if parts[j].strip() == "":
                        parts[j] = gtx_translate(s).strip() or s
                results.extend([p.strip() for p in parts])
            except Exception as e:
                if DEBUG:
                    safe_print(f"  [google] batch error ({type(e).__name__}): {e!r} -> per-item fallback")
                for s in batch:
                    try:
                        results.append(gtx_translate(s).strip() or s)
                    except Exception as ee:
                        if DEBUG:
                            safe_print(f"  [google] per-item error ({type(ee).__name__}): {ee!r}")
                        results.append(s)
            i += len(batch)
        return results

def select_engines(force: Optional[str], batch_size: int) -> List[Engine]:
    if force:
        f = force.lower()
        if f == "libretranslate":
            url = os.environ.get("LIBRETRANSLATE_URL", "").strip()
            if not url:
                raise SystemExit("LIBRETRANSLATE_URL is not set")
            return [LibreTranslateEngine(url, batch_size=batch_size)]
        if f == "google":
            return [GoogleGTXEngine(batch_size=batch_size)]
        raise SystemExit(f"Unknown engine: {force}")

    engines: List[Engine] = []
    url = os.environ.get("LIBRETRANSLATE_URL", "").strip()
    if url:
        engines.append(LibreTranslateEngine(url, batch_size=batch_size))
    # google always present unless explicitly disabled
    if not os.environ.get("XLATE_LOCAL_ONLY"):
        engines.append(GoogleGTXEngine(batch_size=batch_size))
    return engines

def translate_texts(engines: List[Engine], limiter: RateLimiter, texts: List[str], target: str, max_chars: int) -> Tuple[List[str], str]:
    if not texts:
        return [], "none"
    if target.lower() in {"en", "en-gb"}:
        return texts, "none"

    last_err = ""
    for eng in engines:
        try:
            tnorm = eng.normalize_target(target)
            if not eng.supports_target(tnorm):
                if DEBUG:
                    safe_print(f"  [{eng.name}] skipping (unsupported language for this engine)")
                last_err = f"{tnorm} is not supported"
                continue
            outs = eng.translate_batch(texts, tnorm, limiter, max_chars)
            if len(outs) != len(texts):
                raise RuntimeError(f"count mismatch: expected {len(texts)} got {len(outs)}")
            return outs, eng.name
        except Exception as e:
            last_err = f"{type(e).__name__}: {e!r}"
            safe_print(f"  [{eng.name}] failed: {last_err}")
            if DEBUG:
                import traceback
                traceback.print_exc()
            continue

    raise RuntimeError(last_err or "all engines failed")

def process_language(en_map: Dict[int, str], lang_file: Path, engines: List[Engine], limiter: RateLimiter, max_chars: int, dry_run: bool) -> Tuple[str, int, str]:
    lang_code = lang_file.stem  # e.g. gu, zh-CN, no-NO
    # normalize to translation target code (keep file stem; engines normalize further)
    target = lang_code

    existing = parse_txt_file(lang_file)
    missing_ids = [k for k in sorted(en_map.keys()) if k not in existing or not existing.get(k)]
    if not missing_ids:
        safe_print(f"{lang_file.name}: up to date")
        return (lang_file.name, 0, "none")

    safe_print(f"{lang_file.name}: translating {len(missing_ids)} lines -> {target}")

    # Build texts and placeholder protection maps aligned with missing_ids
    protected: List[str] = []
    ph_maps: List[Dict[str, str]] = []
    for k in missing_ids:
        p, m = protect(en_map[k])
        protected.append(p)
        ph_maps.append(m)

    # Translate in batches with retries/backoff at the call-site
    backoff = 1.0
    for attempt in range(4):
        try:
            translated, used = translate_texts(engines, limiter, protected, target, max_chars)
            # Unprotect
            translated = [unprotect(t, m) for t, m in zip(translated, ph_maps)]
            if dry_run:
                safe_print(f"  [{lang_file.name}] dry-run: would add {len(missing_ids)} lines (engine={used})")
                return (lang_file.name, len(missing_ids), used)

            # Merge and write
            merged = dict(existing)
            for k, t in zip(missing_ids, translated):
                merged[k] = t
            write_txt_file_atomic(lang_file, merged)
            safe_print(f"  [{lang_file.name}] Added {len(missing_ids)} lines (engine={used})")
            return (lang_file.name, len(missing_ids), used)
        except Exception as e:
            msg = f"{type(e).__name__}: {e!r}"
            safe_print(f"  [{lang_file.name}] attempt {attempt+1}/4 failed: {msg}")
            if DEBUG:
                import traceback
                traceback.print_exc()
            if attempt < 3:
                time.sleep(backoff + random.random() * 0.3)
                backoff = min(backoff * 2.0, 10.0)
                continue
            safe_print(f"  [{lang_file.name}] Failed: all engines errored; leaving file unchanged")
            return (lang_file.name, 0, "failed")

def main() -> None:
    global DEBUG
    ap = argparse.ArgumentParser()
    ap.add_argument("lines", nargs="*", help="Language files to process (default: all *.txt except en-GB.txt)")
    ap.add_argument("--workers", type=int, default=DEFAULT_WORKERS)
    ap.add_argument("--batch-size", type=int, default=DEFAULT_BATCH_SIZE)
    ap.add_argument("--max-chars", type=int, default=DEFAULT_MAX_CHARS)
    ap.add_argument("--qps", type=float, default=DEFAULT_QPS)
    ap.add_argument("--engine", type=str, default=None, help="Force one engine: google|libretranslate")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--debug", action="store_true")
    args = ap.parse_args()
    DEBUG = bool(args.debug)

    script_dir = Path(__file__).parent
    en_file = script_dir / "en-GB.txt"
    if not en_file.exists():
        raise SystemExit(f"Error: {en_file} not found")

    en_map = parse_txt_file(en_file)
    safe_print(f"Loaded {len(en_map)} lines from {en_file.name}\n")

    engines = select_engines(args.engine, batch_size=int(max(1, args.batch_size)))
    limiter = RateLimiter(args.qps)

    # choose language files
    if args.lines:
        lang_files = [script_dir / x for x in args.lines]
    else:
        lang_files = sorted([p for p in script_dir.glob("*.txt") if p.name != "en-GB.txt"])

    safe_print(f"Processing {len(lang_files)} languages (workers={args.workers}, qps={args.qps}, batch={args.batch_size}, max_chars={args.max_chars})...\n")

    added_total = 0
    if args.workers <= 1:
        for lf in lang_files:
            name, added, used = process_language(en_map, lf, engines, limiter, args.max_chars, args.dry_run)
            added_total += added
    else:
        # NOTE: RateLimiter isn't thread-safe; enforce per-thread QPS by splitting
        per_qps = max(0.05, args.qps / args.workers)
        def task(lf: Path) -> Tuple[str, int, str]:
            return process_language(en_map, lf, engines, RateLimiter(per_qps), args.max_chars, args.dry_run)
        with cf.ThreadPoolExecutor(max_workers=args.workers) as ex:
            futs = [ex.submit(task, lf) for lf in lang_files]
            for f in cf.as_completed(futs):
                name, added, used = f.result()
                added_total += added

    safe_print(f"\nDone! Processed {len(lang_files)} languages, added {added_total} total translations.")

if __name__ == "__main__":
    main()
