#!/usr/bin/env python3
# verify-locale.py <scratchpad> <locale> <after.psv>
# Checks per mapped slug: version+1 and (for transplant-listed slugs) hash stability vs snapshot.
import sys, json, pathlib
OUT = pathlib.Path(sys.argv[1]); LOC = sys.argv[2]; AFTER = sys.argv[3]
snap = {}
for l in open(OUT/'db-snapshot-before.tsv', encoding='utf8'):
    p = l.rstrip('\n').split('\t')
    if len(p) >= 12 and p[3] == LOC and p[11] == 'published':
        snap[p[4]] = (p[6], p[7], p[10])
mapped = set(json.load(open(OUT/'mapping'/('updates-manifest.%s.json' % LOC))).values())
transplanted = set()
tp = OUT/'mapping'/('transplant.%s.txt' % LOC)
if tp.exists():
    transplanted = {l.split('\t')[0] for l in open(tp, encoding='utf8') if l.strip()}
ok_hash = ok_ver = theme_fixed = 0
bad = []
after = {}
for l in open(AFTER, encoding='utf8'):
    p = l.rstrip('\n').split('|')
    if len(p) >= 4:
        after[p[0]] = p
for slug in sorted(mapped):
    a = after.get(slug); o = snap.get(slug)
    if not a or not o:
        bad.append((slug, 'missing-row')); continue
    if int(a[1]) == int(o[2]) + 1:
        ok_ver += 1
    else:
        bad.append((slug, 'version %s -> %s' % (o[2], a[1])))
    if slug in transplanted:
        if a[2] == o[0] and a[3] == o[1]:
            ok_hash += 1
        else:
            bad.append((slug, 'hash-changed'))
print('%s: mapped=%d version+1=%d transplanted=%d hash-stable=%d bad=%d' %
      (LOC, len(mapped), ok_ver, len(transplanted), ok_hash, len(bad)))
for b in bad[:8]:
    print('  BAD', b)
