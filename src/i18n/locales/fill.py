#!/usr/bin/env python3
"""
fill_template.py

Usage:
  ./fill_template.py hi.txt > hi.json

Reads:
  - template.txt : JSON where translatable strings have been replaced by id strings (e.g. "12")
  - <arg1>       : lines like: <id><TAB><translated string as JSON string OR raw text>

Writes:
  - translated JSON to STDOUT
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Any, Dict


ID_RE = re.compile(r"^\s*(\d+)\s*(?:\t|\s{2,}|,)\s*(.+?)\s*$")


def parse_translation_rhs(rhs: str, *, path: str, line_no: int) -> str:
    rhs = rhs.strip()
    if rhs == "":
        return ""
    try:
        if rhs.startswith('"') and rhs.endswith('"'):
            return json.loads(rhs)  # JSON string
        if rhs.startswith(("{", "[")) and rhs.endswith(("}", "]")):
            return json.dumps(json.loads(rhs), ensure_ascii=False)
        return rhs
    except json.JSONDecodeError as e:
        raise ValueError(
            f"{path}:{line_no}: invalid JSON in translation: {rhs!r}\n{e}"
        ) from e

def load_translations(path: str) -> Dict[str, str]:
    """
    Returns mapping: id(str) -> translated text
    Ignores blank lines and comment lines starting with # or //.
    """
    out: Dict[str, str] = {}
    for line_no, line in enumerate(Path(path).read_text(encoding="utf-8").splitlines(), start=1):
        s = line.strip()
        if not s or s.startswith("#") or s.startswith("//"):
            continue
        m = ID_RE.match(line)
        if not m:
            raise ValueError(f"{path}:{line_no}: can't parse line: {line!r}")
        _id, rhs = m.group(1), m.group(2)
        if _id in out:
            raise ValueError(f"{path}:{line_no}: duplicate id {_id}")
        out[_id] = parse_translation_rhs(rhs, path=path, line_no=line_no)
    return out


def fill(node: Any, id2txt: Dict[str, str], *, path: str = "$") -> Any:
    if isinstance(node, dict):
        new_obj: Dict[str, Any] = {}
        for k, v in node.items():
            # keys might be ids (strings of digits) OR preserved strings
            new_k = id2txt.get(k, k) if isinstance(k, str) and k.isdigit() else k

            if new_k in new_obj:
                raise ValueError(f"Duplicate key after translation at {path}: {new_k!r}")

            new_obj[new_k] = fill(v, id2txt, path=f"{path}.{new_k}")
        return new_obj

    if isinstance(node, list):
        return [fill(x, id2txt, path=f"{path}[{i}]") for i, x in enumerate(node)]

    if isinstance(node, str) and node.isdigit():
        if node not in id2txt:
            raise KeyError(f"Missing translation for id {node} at {path}")
        return id2txt[node]

    return node


def main(argv: list[str]) -> int:
    if len(argv) != 2 or argv[1] in ("-h", "--help"):
        sys.stderr.write("Usage: fill_template.py <translations.txt>\n")
        sys.stderr.write("Reads template.txt in the current directory; writes JSON to stdout.\n")
        return 2

    template_path = "template.txt"
    translated_xlate_path = argv[1]

    templ = json.loads(Path(template_path).read_text(encoding="utf-8"))
    id2txt = load_translations(translated_xlate_path)

    filled = fill(templ, id2txt)

    json.dump(filled, sys.stdout, ensure_ascii=False, indent=2)
    sys.stdout.write("\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))

