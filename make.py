#!/usr/bin/env python3
"""
make_template_ts.py (VALUES ONLY, MULTI-FILE, TS page templates)

Input:
  - about.ts contact.ts guide.ts privacy.ts terms.ts (or any *.ts you pass)

Creates:
  - xlate.txt                 : global <id>\t"<json-escaped original string>"
  - template-<stem>.ts        : per-input TS where ONLY string VALUES inside the exported object
                               are replaced with id string literals ('123', "123", `123`)

Rules:
  - Keys are never translated.
  - Only string literals inside the exported object literal are translated.
  - import paths and anything outside the exported object are left untouched.
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any, Dict, List, Tuple


def js_unescape(s: str) -> str:
    out: List[str] = []
    i = 0
    n = len(s)
    while i < n:
        c = s[i]
        if c != "\\":
            out.append(c)
            i += 1
            continue
        i += 1
        if i >= n:
            out.append("\\")
            break
        esc = s[i]
        i += 1
        if esc == "n":
            out.append("\n")
        elif esc == "r":
            out.append("\r")
        elif esc == "t":
            out.append("\t")
        elif esc == "b":
            out.append("\b")
        elif esc == "f":
            out.append("\f")
        elif esc in ("\\", "'", '"', "`"):
            out.append(esc)
        elif esc == "u" and i + 4 <= n:
            hexv = s[i : i + 4]
            i += 4
            try:
                out.append(chr(int(hexv, 16)))
            except ValueError:
                out.append("\\u" + hexv)
        elif esc == "x" and i + 2 <= n:
            hexv = s[i : i + 2]
            i += 2
            try:
                out.append(chr(int(hexv, 16)))
            except ValueError:
                out.append("\\x" + hexv)
        else:
            # unknown escape; keep as-is
            out.append("\\" + esc)
    return "".join(out)


def scan_string_literals(text: str, start: int, end: int) -> List[Tuple[int, int, str, str]]:
    """
    Returns list of (abs_start, abs_end, quote_char, decoded_value) for literals in [start,end).
    abs_end is exclusive and includes closing quote.
    """
    res: List[Tuple[int, int, str, str]] = []
    i = start
    in_line_comment = False
    in_block_comment = False

    while i < end:
        ch = text[i]

        if in_line_comment:
            if ch == "\n":
                in_line_comment = False
            i += 1
            continue

        if in_block_comment:
            if ch == "*" and i + 1 < end and text[i + 1] == "/":
                in_block_comment = False
                i += 2
            else:
                i += 1
            continue

        # comments
        if ch == "/" and i + 1 < end:
            nxt = text[i + 1]
            if nxt == "/":
                in_line_comment = True
                i += 2
                continue
            if nxt == "*":
                in_block_comment = True
                i += 2
                continue

        # strings
        if ch in ("'", '"', "`"):
            q = ch
            j = i + 1
            raw: List[str] = []
            while j < end:
                cj = text[j]
                if cj == "\\":
                    if j + 1 < end:
                        raw.append(text[j])
                        raw.append(text[j + 1])
                        j += 2
                        continue
                    raw.append("\\")
                    j += 1
                    continue
                if cj == q:
                    # end
                    decoded = js_unescape("".join(raw))
                    res.append((i, j + 1, q, decoded))
                    i = j + 1
                    break
                # NOTE: we do not support `${...}` inside backticks here; avoid using it in these templates.
                raw.append(cj)
                j += 1
            else:
                # unterminated string: bail
                break
            continue

        i += 1

    return res


def find_export_object_span(text: str) -> Tuple[int, int]:
    """
    Finds the span (start,end) of the object literal assigned in:
      export const <name> ... = { ... };
    Returns indices for the object literal including braces.
    """
    export_idx = text.find("export const")
    if export_idx == -1:
        raise ValueError("No 'export const' found")

    eq_idx = text.find("=", export_idx)
    if eq_idx == -1:
        raise ValueError("No '=' after 'export const'")

    # find first '{' after '='
    start = text.find("{", eq_idx)
    if start == -1:
        raise ValueError("No '{' after '='")

    # match braces, ignoring strings/comments
    i = start
    depth = 0
    in_line_comment = False
    in_block_comment = False
    in_str = False
    str_q = ""

    while i < len(text):
        ch = text[i]

        if in_str:
            if ch == "\\":
                i += 2
                continue
            if ch == str_q:
                in_str = False
                str_q = ""
            i += 1
            continue

        if in_line_comment:
            if ch == "\n":
                in_line_comment = False
            i += 1
            continue

        if in_block_comment:
            if ch == "*" and i + 1 < len(text) and text[i + 1] == "/":
                in_block_comment = False
                i += 2
            else:
                i += 1
            continue

        if ch == "/" and i + 1 < len(text):
            nxt = text[i + 1]
            if nxt == "/":
                in_line_comment = True
                i += 2
                continue
            if nxt == "*":
                in_block_comment = True
                i += 2
                continue

        if ch in ("'", '"', "`"):
            in_str = True
            str_q = ch
            i += 1
            continue

        if ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                return (start, i + 1)

        i += 1

    raise ValueError("Unbalanced braces while locating exported object")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("inputs", nargs="*", help="TS files (default: *.ts)")
    ap.add_argument("--xlate-out", default="xlate.txt")
    ap.add_argument("--template-prefix", default="template-")
    args = ap.parse_args()

    inputs = [Path(p) for p in args.inputs] if args.inputs else sorted(Path(".").glob("*.ts"))
    if not inputs:
        raise SystemExit("No input files found (pass files or run in a directory with *.ts).")

    # pass 1: collect global strings in first-seen order
    ordered: List[str] = []
    seen: set[str] = set()
    file_info: List[Tuple[Path, str, Tuple[int, int], List[Tuple[int, int, str, str]]]] = []

    for p in inputs:
        txt = p.read_text(encoding="utf-8")
        span = find_export_object_span(txt)
        lits = scan_string_literals(txt, span[0], span[1])
        for _a, _b, _q, val in lits:
            if val not in seen:
                seen.add(val)
                ordered.append(val)
        file_info.append((p, txt, span, lits))

    s2id: Dict[str, str] = {s: str(i) for i, s in enumerate(ordered, start=1)}

    # write xlate.txt
    xlate_lines = [f"{s2id[s]}\t{json.dumps(s, ensure_ascii=False)}" for s in ordered]
    Path(args.xlate_out).write_text("\n".join(xlate_lines) + "\n", encoding="utf-8")

    # write templates
    for p, txt, span, lits in file_info:
        # replacements (do from end -> start)
        repls: List[Tuple[int, int, str]] = []
        for a, b, q, val in lits:
            _id = s2id[val]
            repls.append((a, b, f"{q}{_id}{q}"))

        out_txt = txt
        for a, b, rep in sorted(repls, key=lambda t: t[0], reverse=True):
            out_txt = out_txt[:a] + rep + out_txt[b:]

        out_path = Path(f"{args.template_prefix}{p.stem}.ts")
        out_path.write_text(out_txt, encoding="utf-8")

    print(f"Wrote {args.xlate_out} ({len(ordered)} strings)")
    print(f"Wrote {len(inputs)} templates: {args.template_prefix}<stem>.ts")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

