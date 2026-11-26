"""verify-e2-sv-pdf.py — the PDF half of qa/verify-e2-sv.js (Batch SV, 2026-11-26).

Reads a rendered PDF and prints, as JSON, every vector drawing whose stroke or fill colour is one of the inks it is
given, with its colour, whether it is a stroke or a fill, its stroke width and its TRUE geometric extent in PDF points
(1/72 inch): lines and rectangles by their corners, curves sampled along the curve (a curve's control points lie outside
it, so a bounding box of the points would overstate it). The gate measures lengths there: what a printer prints at 100 %.

    python -I verify-e2-sv-pdf.py <file.pdf> <hex,hex,...>
"""
import json
import sys

import pymupdf


def hex_rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))


def bez(p0, p1, p2, p3, t):
    u = 1 - t
    return (u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
            u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y)


def extent(items):
    xs, ys = [], []
    lines = []
    for it in items:
        k = it[0]
        if k == 'l':
            a, b = it[1], it[2]
            xs += [a.x, b.x]
            ys += [a.y, b.y]
            lines.append([a.x, a.y, b.x, b.y])
        elif k == 're':
            r = it[1]
            xs += [r.x0, r.x1]
            ys += [r.y0, r.y1]
        elif k == 'qu':
            q = it[1]
            for p in (q.ul, q.ur, q.ll, q.lr):
                xs.append(p.x)
                ys.append(p.y)
        elif k == 'c':
            for i in range(41):
                x, y = bez(it[1], it[2], it[3], it[4], i / 40)
                xs.append(x)
                ys.append(y)
    if not xs:
        return None, lines
    return [min(xs), min(ys), max(xs), max(ys)], lines


def main():
    path, inks = sys.argv[1], sys.argv[2].split(',')
    want = {h.upper(): hex_rgb(h) for h in inks}
    doc = pymupdf.open(path)
    page = doc[0]
    out = []
    for d in page.get_drawings():
        for role in ('color', 'fill'):
            col = d.get(role)
            if not col:
                continue
            hit = None
            for h, rgb in want.items():
                if all(abs(a - b) < 0.012 for a, b in zip(col, rgb)):
                    hit = h
                    break
            if not hit:
                continue
            ext, lines = extent(d['items'])
            if ext is None:
                continue
            out.append({'ink': hit, 'kind': 'stroke' if role == 'color' else 'fill', 'width': d.get('width') or 0,
                        'ext': ext, 'lines': lines})
    print(json.dumps({'page': [page.rect.width, page.rect.height], 'drawings': out}))


if __name__ == '__main__':
    main()
