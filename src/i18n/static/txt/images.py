#!/usr/bin/env python3
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

Output quality:
- Sharp edges, no blur, no photorealism
- Suitable for premium landing-page marketing visuals

FAILSAFE:
If ANY text, symbols, numbers, logos, gradients, or non-white background appear,
the image is INVALID and must be regenerated.
""".strip()

IMAGE_OBJECT_RE = re.compile(
    r"\{\s*"
    r"[\s\S]*?src:\s*['\"](?P<src>[^'\"]+)['\"]"
    r"[\s\S]*?alt:\s*['\"](?P<alt>[^'\"]*)['\"]"
    r"(?:[\s\S]*?caption:\s*(?P<caption>(?:'[\s\S]*?'|\"[\s\S]*?\")))?"
    r"[\s\S]*?\}",
    re.S,
)

def clean(s: str | None) -> str:
    if not s:
        return ""
    return (
        s.strip()
         .strip("'\"")
         .replace("\n", " ")
         .replace("  ", " ")
         .strip()
    )

for file in FILES:
    text = file.read_text(encoding="utf-8")

    for m in IMAGE_OBJECT_RE.finditer(text):
        src = clean(m.group("src"))
        alt = clean(m.group("alt"))
        caption = clean(m.group("caption"))

        concept = caption or alt or "Generic ANQR QR code usage scenario"

        prompt = STYLE_ANCHOR_BLOCK.format(concept=concept)

        print(f"{src}: {prompt}\n\n--\n")

