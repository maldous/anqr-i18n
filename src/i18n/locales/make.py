#!/usr/bin/env python3
"""
make_template.py (VALUES ONLY)

Creates:
  - xlate.txt    : <id>\t"<json-escaped original value>"
  - template.txt : JSON where ONLY string VALUES are replaced by id strings

Rules:
  - Keys are NEVER translated (kept exactly as-is everywhere, including languages + gallery ids).
  - Any string VALUE is translated (including languages values, gallery title/description values, etc.).
  - Non-string values (numbers/bools/null/objects) are left untouched.
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any, Dict, List


def collect_values(node: Any, seen: set[str], ordered: List[str]) -> None:
    if isinstance(node, dict):
        for _k, v in node.items():
            collect_values(v, seen, ordered)
    elif isinstance(node, list):
        for item in node:
            collect_values(item, seen, ordered)
    elif isinstance(node, str):
        if node not in seen:
            seen.add(node)
            ordered.append(node)


def replace_values(node: Any, s2id: Dict[str, str]) -> Any:
    if isinstance(node, dict):
        return {k: replace_values(v, s2id) for k, v in node.items()}
    if isinstance(node, list):
        return [replace_values(x, s2id) for x in node]
    if isinstance(node, str):
        return s2id[node]
    return node


def main(
    input_json: str = "en.json",
    xlate_out: str = "xlate.txt",
    template_out: str = "template.txt",
) -> None:
    data = json.loads(Path(input_json).read_text(encoding="utf-8"))

    ordered: List[str] = []
    seen: set[str] = set()
    collect_values(data, seen, ordered)

    # 1-based ids, stored as strings
    s2id: Dict[str, str] = {s: str(i) for i, s in enumerate(ordered, start=1)}

    # xlate.txt lines: <id>\t"<json-escaped original string>"
    xlate_lines = [f"{s2id[s]}\t{json.dumps(s, ensure_ascii=False)}" for s in ordered]
    Path(xlate_out).write_text("\n".join(xlate_lines) + "\n", encoding="utf-8")

    templ = replace_values(data, s2id)
    Path(template_out).write_text(
        json.dumps(templ, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    print(f"Wrote {xlate_out} ({len(ordered)} strings) and {template_out}")


if __name__ == "__main__":
    main()

