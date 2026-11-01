#!/usr/bin/env python3
"""pdf-word-boxes.py <file.pdf> — every word of every page with its box, one per line: word@x0,y0,x1,y1 (a tenth of a point).

The position check of tools/guessfix-compare.js (--positions): the Windows pdftotext here is Xpdf 4.00, which has no -bbox
(2026-11-01). PyMuPDF reads the same text layer."""
import sys

import pymupdf

doc = pymupdf.open(sys.argv[1])
out = []
for page in doc:
    for x0, y0, x1, y1, word, *_ in page.get_text('words'):
        out.append('%s@%.1f,%.1f,%.1f,%.1f' % (word, x0, y0, x1, y1))
sys.stdout.buffer.write(('\n'.join(out) + '\n').encode('utf-8'))
