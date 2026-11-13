# Every lesson sheet of every teacher guide (out/teacher-files/<loc>/units/<id>/teacher-guide.pdf), read from the PDF
# itself: no drawn horizontal rule at or above the bottom of the lesson title (a rule there is the previous sheet's
# note lines run over: the fault of 2026-11-13, when the fit check measured at screen width and the paper is narrower),
# and no rule at or below the top of the footer text.
#
#   python scripts/units/check-guide-rules.py [out/teacher-files]      exit 1 on a sheet with a misplaced rule
#
# PC only (PyMuPDF), like build-looks.js. Run after build-guide.js and before upload-teacher-files.sh.
import sys, glob, pymupdf

root = sys.argv[1] if len(sys.argv) > 1 else 'out/teacher-files'
bad = 0
sheets = 0
for f in sorted(glob.glob(root + '/*/units/*/teacher-guide.pdf')):
    d = pymupdf.open(f)
    for i in range(1, len(d) - 1):
        p = d[i]
        sheets += 1
        spans = [s for b in p.get_text('dict')['blocks'] if b['type'] == 0 for l in b['lines'] for s in l['spans'] if s['text'].strip()]
        title = max(spans, key=lambda s: s['size'])
        foot = max(spans, key=lambda s: s['bbox'][3])
        rules = []
        for g in p.get_drawings():
            r = g['rect']
            if r.width > 150 and r.height < 3:
                rules.append((r.y0 + r.y1) / 2)
        over = [round(y) for y in rules if y <= title['bbox'][3] + 1]
        low = [round(y) for y in rules if y >= foot['bbox'][1] - 1]
        if over or low:
            bad += 1
            print('FAIL  ' + f.replace(chr(92), '/').split('teacher-files/')[-1] + ' sheet ' + str(i + 1) + ': rule(s) over the title ' + str(over) + ', in the footer ' + str(low))
print('teacher guides: ' + str(sheets) + ' lesson sheet(s), ' + str(bad) + ' with a misplaced rule')
if sheets < 100:
    print('FAIL  fewer than 100 lesson sheets were read: the check measured too little to say anything')
    sys.exit(1)
sys.exit(1 if bad else 0)
