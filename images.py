#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
import re

FILES = [
    Path("../en-GB/examples.ts"),
    Path("../en-GB/learn.ts"),
]

STYLE_ANCHOR_BLOCK = """
Use the premium, high-end minimalist vector key-visual from the ANQR illustration style anchor.

Hard constraints (must be strictly enforced):
- Background must be pure white (#FFFFFF). Absolutely no gradients, no textures, no vignettes.
- NO text of any kind may appear in the image (no letters, numbers, symbols, signage, UI text).
- No logos, no brand names.

Art direction:
- High-end minimalist vector illustration with subtle film-grain texture on shapes only (very light, not noisy)
- Crisp geometric forms, consistent stroke weight, high contrast
- Soft directional lighting with gentle shadow falloff (minimal shadows, not harsh)
- Clean negative space, no clutter; polished editorial/tech-marketing feel
- Limited palette: near-black + off-white neutrals + ONE accent color used sparingly to add depth and “3D” pop

Composition:
- 16:9 poster / hero layout
- Primary subject anchored left-of-center with clear focal hierarchy

Illustrate concept (ANQR scenario):
{concept}

Scene context (caption):
{caption}

Output quality:
- Sharp edges, no blur, no photorealism
- Suitable for premium landing-page marketing visuals

FAILSAFE:
If ANY text, symbols, numbers, logos, gradients, or non-white background appear,
the image is INVALID and must be regenerated.
""".strip()

# String literal matcher that DOES handle escaped quotes like: doesn\'t, \"COVID\"
STR_SQ = r"'(?:\\.|[^'\\])*'"
STR_DQ = r'"(?:\\.|[^"\\])*"'
STR_BT = r"`(?:\\.|[^`\\])*`"
STR = rf"(?:{STR_BT}|{STR_SQ}|{STR_DQ})"

FIELD_RE = {
    "src": re.compile(rf"\bsrc\s*:\s*(?P<v>{STR})", re.S),
    "alt": re.compile(rf"\balt\s*:\s*(?P<v>{STR})", re.S),
    "caption": re.compile(rf"\bcaption\s*:\s*(?P<v>{STR})", re.S),
}

IMAGES_BLOCK_RE = re.compile(r"\bimages\s*:\s*\[", re.S)

def ts_unquote(raw: str) -> str:
    """Remove surrounding quotes/backticks and unescape common TS escapes."""
    raw = raw.strip()
    if len(raw) >= 2 and raw[0] in "'\"`" and raw[-1] == raw[0]:
        raw = raw[1:-1]
    # Unescape backslash-escapes (keeps it simple but fixes doesn\'t etc.)
    raw = raw.replace(r"\\", "\\")
    raw = raw.replace(r"\'", "'").replace(r"\"", '"').replace(r"\`", "`")
    raw = raw.replace(r"\n", " ").replace(r"\r", " ").replace(r"\t", " ")
    raw = re.sub(r"\s+", " ", raw).strip()
    return raw

def find_matching(text: str, start: int, open_ch: str, close_ch: str) -> int:
    """Return index of matching close_ch for the open_ch at start."""
    depth = 0
    i = start
    in_str: str | None = None  # one of ', ", `
    escape = False

    while i < len(text):
        ch = text[i]

        if in_str:
            if escape:
                escape = False
            elif ch == "\\":
                escape = True
            elif ch == in_str:
                in_str = None
            i += 1
            continue

        if ch in ("'", '"', "`"):
            in_str = ch
            i += 1
            continue

        if ch == open_ch:
            depth += 1
        elif ch == close_ch:
            depth -= 1
            if depth == 0:
                return i
        i += 1

    raise ValueError(f"No matching {close_ch} found for {open_ch} at {start}")

def extract_image_objects(text: str) -> list[str]:
    """Extract { ... } objects inside every `images: [ ... ]` block."""
    objs: list[str] = []
    for m in IMAGES_BLOCK_RE.finditer(text):
        # m.end()-1 points at '['
        lb = text.find("[", m.end() - 1)
        rb = find_matching(text, lb, "[", "]")
        block = text[lb + 1 : rb]

        # Now extract top-level { ... } objects within the block
        i = 0
        while i < len(block):
            j = block.find("{", i)
            if j == -1:
                break
            k = find_matching(block, j, "{", "}")
            objs.append(block[j : k + 1])
            i = k + 1
    return objs

def get_field(obj: str, name: str) -> str:
    m = FIELD_RE[name].search(obj)
    return ts_unquote(m.group("v")) if m else ""

for file in FILES:
    text = file.read_text(encoding="utf-8")

    for obj in extract_image_objects(text):
        src = get_field(obj, "src")
        alt = get_field(obj, "alt")
        caption = get_field(obj, "caption")

        if not src:
            continue  # not an image object we care about

        concept = alt or "Generic ANQR QR code usage scenario"
        caption_text = caption or "(missing caption in source file)"

        prompt = STYLE_ANCHOR_BLOCK.format(concept=concept, caption=caption_text)
        print(f"{src}: {prompt}\n\n--\n")

