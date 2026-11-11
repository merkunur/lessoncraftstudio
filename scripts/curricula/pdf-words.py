#!/usr/bin/env python
"""Writes the words of a PDF with their place on the page, for the registry builders that must read tables
(Daily Teaching System, Part 2). pdftotext gives text only; a two-column table of expectations can be told apart
safely only by where each word stands.

    python scripts/curricula/pdf-words.py <file.pdf> <out.json>

out.json: { "pages": [ { "n": 1, "width": 595.3, "height": 841.9,
                         "words": [ [x0, y0, x1, y1, "text", bold(0|1), size], ... ] }, ... ] }
A word is bold when its middle lies inside a span set in a bold font; its size is that span's font size (0 when no
span holds it). Needs PyMuPDF (pip install pymupdf).
"""
import json
import sys

import pymupdf


def main():
    src, out = sys.argv[1], sys.argv[2]
    doc = pymupdf.open(src)
    pages = []
    for i, page in enumerate(doc):
        bold = []
        spans = []
        for block in page.get_text("dict")["blocks"]:
            for line in block.get("lines", []):
                for span in line.get("spans", []):
                    name = span.get("font", "")
                    spans.append((span["bbox"], round(span.get("size", 0), 1)))
                    if (span.get("flags", 0) & 16) or "Bold" in name or "bold" in name or "Black" in name:
                        bold.append(span["bbox"])
        words = []
        for x0, y0, x1, y1, text, *_ in page.get_text("words"):
            cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
            is_bold = any(b[0] - 1 <= cx <= b[2] + 1 and b[1] - 1 <= cy <= b[3] + 1 for b in bold)
            size = next((sz for b, sz in spans if b[0] - 1 <= cx <= b[2] + 1 and b[1] - 1 <= cy <= b[3] + 1), 0)
            words.append([round(x0, 1), round(y0, 1), round(x1, 1), round(y1, 1), text, 1 if is_bold else 0, size])
        pages.append({"n": i + 1, "width": round(page.rect.width, 1), "height": round(page.rect.height, 1), "words": words})
    with open(out, "w", encoding="utf-8") as f:
        json.dump({"pages": pages}, f, ensure_ascii=False)
    print("%s: %d pages, %d words" % (out, len(pages), sum(len(p["words"]) for p in pages)))


if __name__ == "__main__":
    main()
