"""verify-e2-de-b-pdf.py — the PDF half of qa/verify-e2-de-b.js (Batch DE-B, 2026-11-26).

Reads a rendered PDF and prints, as JSON, every vector drawing whose stroke colour is one of the REAL-SIZE inks the
drawings of e2-math-b-art.js use (REAL_*), with its stroke colour, stroke width, bounding rectangle and its line
segments, all in PDF points (1/72 inch). The gate measures lengths there: what a printer prints at 100 %.

    python verify-e2-de-b-pdf.py <file.pdf> <hex,hex,...>
"""
import json
import sys

import pymupdf


def hex_rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))


def main():
    path, inks = sys.argv[1], sys.argv[2].split(',')
    want = {h.upper(): hex_rgb(h) for h in inks}
    doc = pymupdf.open(path)
    page = doc[0]
    out = []
    for d in page.get_drawings():
        col = d.get('color') or d.get('fill')
        if not col:
            continue
        hit = None
        for h, rgb in want.items():
            if all(abs(a - b) < 0.012 for a, b in zip(col, rgb)):
                hit = h
                break
        if not hit:
            continue
        r = d['rect']
        segs = []
        for it in d['items']:
            if it[0] == 'l':
                segs.append([it[1].x, it[1].y, it[2].x, it[2].y])
        out.append({'ink': hit, 'kind': 'stroke' if d.get('color') else 'fill', 'width': d.get('width') or 0,
                    'rect': [r.x0, r.y0, r.x1, r.y1], 'segs': segs, 'curves': sum(1 for it in d['items'] if it[0] == 'c')})
    print(json.dumps({'page': [page.rect.width, page.rect.height], 'drawings': out}))


if __name__ == '__main__':
    main()
