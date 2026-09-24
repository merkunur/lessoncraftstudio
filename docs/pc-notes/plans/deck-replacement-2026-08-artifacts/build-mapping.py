#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Build per-locale updates-manifests for the 2026-08 deck replacement wave.

Inputs (all in the scratchpad dir passed as argv[1]):
  db-snapshot-before.tsv      - decks rows (id ex_type ex_mode lang slug title th dh tags age version status)
  es-fac-classified.txt       - slug \t n_tasktypes \t title \t theme   (es FaC mode-null decks)
  polluted-theme-map.txt      - lang \t slug \t theme  (agent thumbnail IDs; may be absent -> skip en/es/pt TH)
Replacement ZIPs are scanned from argv[2] (decks/replacement root).

Outputs (in scratchpad/mapping/):
  updates-manifest.<loc>.json - {zip_basename: slug}
  inserts.<loc>.txt           - zip basenames expected to route INSERT
  transplant.<loc>.txt        - slug \t old_title_hash \t old_desc_hash   (clean-matched only)
  leftovers.txt               - published in-scope decks with no replacement
  anomalies.txt               - anything surprising
"""
import sys, os, json, zipfile, pathlib, collections

SCRATCH = pathlib.Path(sys.argv[1])
REPL = pathlib.Path(sys.argv[2])
OUTDIR = SCRATCH / 'mapping'
OUTDIR.mkdir(exist_ok=True)

# ---- load DB snapshot ----
pub = []  # dicts
for line in open(SCRATCH / 'db-snapshot-before.tsv', encoding='utf8'):
    if line.startswith('STAGING_CHECK_DONE'): continue
    p = line.rstrip('\n').split('\t')
    if len(p) < 12: continue
    pub.append(dict(id=p[0], type=p[1], mode=p[2] or None, lang=p[3], slug=p[4],
                    title=p[5], th=p[6], dh=p[7], tags=p[8], age=p[9], ver=p[10], status=p[11]))
published = [r for r in pub if r['status'] == 'published']

# ---- es FaC classification ----
es_fac_mode = {}
for line in open(SCRATCH / 'es-fac-classified.txt', encoding='utf8'):
    p = line.rstrip('\n').split('\t')
    if len(p) < 4: continue
    es_fac_mode[p[0]] = 'hidden-object' if int(p[1]) >= 2 else 'letter-spotting'

# ---- polluted TH theme map (agent output), optional ----
polluted_theme = {}  # (lang, slug) -> theme
pt_path = SCRATCH / 'polluted-theme-map.txt'
if pt_path.exists():
    for line in open(pt_path, encoding='utf8'):
        p = line.rstrip('\n').split('\t')
        if len(p) >= 3:
            polluted_theme[(p[0], p[1])] = p[2]

POLLUTED = set()
for r in published:
    if r['type'] == 'treasure-hunt' and (
        (r['lang'] == 'en' and r['tags'] == '4th_of_july') or
        (r['lang'] == 'es' and r['tags'] == 'accessories') or
        (r['lang'] == 'pt' and r['tags'] == '4th_of_july')):
        POLLUTED.add((r['lang'], r['slug']))

# ---- scan replacement ZIPs ----
zips = []  # dict(app, lang, mode, theme, path, base)
for z in REPL.rglob('*.zip'):
    with zipfile.ZipFile(z) as zf:
        m = json.loads(zf.read('manifest.json'))
    zips.append(dict(app=m['exercise_type'], lang=m['language'], mode=m['exercise_mode'],
                     theme=m['theme'], path=str(z), base=z.name))

# ---- candidate index over published rows ----
by_coord = collections.defaultdict(list)  # (type, mode, lang, theme_tag) -> rows
for r in published:
    if r['type'] not in ('treasure-hunt', 'find-and-count', 'prepositions'): continue
    theme = r['tags'].split(',')[0] if r['tags'] else None
    mode = r['mode']
    if r['type'] == 'find-and-count' and r['lang'] == 'es' and mode is None:
        mode = es_fac_mode.get(r['slug'])  # classified
    by_coord[(r['type'], mode, r['lang'], theme)].append(r)

# polluted TH decks re-indexed by recovered theme (mode from slug/DB is reliable)
by_polluted = collections.defaultdict(list)  # (lang, mode, theme) -> rows
for r in published:
    key = (r['lang'], r['slug'])
    if key in POLLUTED:
        th = polluted_theme.get(key)
        if th:
            by_polluted[(r['lang'], r['mode'], th)].append(r)

updates = collections.defaultdict(dict)   # loc -> {zipbase: slug}
inserts = collections.defaultdict(list)   # loc -> [zipbase]
transplant = collections.defaultdict(list)
anomalies = []
claimed = set()  # slugs claimed

def claim(rows, z, is_polluted):
    """Pick one target row deterministically: prefer un-suffixed slug, then lexicographic."""
    rows = [r for r in rows if (r['lang'], r['slug']) not in claimed_pairs]
    if not rows: return None
    rows.sort(key=lambda r: (len(r['slug']), r['slug']))
    return rows[0]

claimed_pairs = set()
for z in sorted(zips, key=lambda d: d['base']):
    loc = z['lang']
    tgt = None; pol = False
    if (z['app'], loc) == ('treasure-hunt', 'en') or \
       (z['app'], loc) == ('treasure-hunt', 'es') or \
       (z['app'], loc) == ('treasure-hunt', 'pt'):
        rows = by_polluted.get((loc, z['mode'], z['theme']), [])
        tgt = claim(rows, z, True); pol = True
        if tgt is None and not polluted_theme:
            continue  # agent map not ready; skip entirely
    else:
        rows = by_coord.get((z['app'], z['mode'], loc, z['theme']), [])
        tgt = claim(rows, z, False)
    if tgt:
        updates[loc][z['base']] = tgt['slug']
        claimed_pairs.add((loc, tgt['slug']))
        if not pol:
            transplant[loc].append((tgt['slug'], tgt['th'], tgt['dh']))
    else:
        inserts[loc].append(z['base'])
        if pol:
            anomalies.append('POLLUTED-NO-TARGET %s %s %s -> would INSERT' % (loc, z['mode'], z['theme']))

# ---- leftovers: published in-scope decks never claimed ----
SCOPE_MODES = {('treasure-hunt', 'cardinal-arrows'), ('treasure-hunt', 'compass'),
               ('find-and-count', 'hidden-object'), ('prepositions', 'fillin'),
               ('prepositions', 'multiplechoice')}
leftovers = []
for r in published:
    if r['type'] not in ('treasure-hunt', 'find-and-count', 'prepositions'): continue
    mode = r['mode']
    if r['type'] == 'find-and-count' and r['lang'] == 'es' and mode is None:
        mode = es_fac_mode.get(r['slug'])
    if (r['type'], mode) not in SCOPE_MODES: continue
    if r['type'] == 'prepositions':
        if mode == 'fillin' and r['lang'] == 'en': continue          # not regenerated
        if mode == 'multiplechoice' and r['lang'] != 'it': continue  # only it regenerated
    if r['type'] == 'find-and-count' and r['lang'] == 'en': continue # not regenerated
    if r['type'] == 'find-and-count' and mode == 'letter-spotting': continue
    if (r['lang'], r['slug']) in claimed_pairs: continue
    theme = polluted_theme.get((r['lang'], r['slug'])) or (r['tags'].split(',')[0] if r['tags'] else '?')
    leftovers.append('%s\t%s\t%s\t%s\t%s' % (r['lang'], r['type'], mode or 'NULL', theme, r['slug']))

# ---- write ----
for loc in sorted(set(list(updates.keys()) + list(inserts.keys()))):
    with open(OUTDIR / ('updates-manifest.%s.json' % loc), 'w', encoding='utf8') as f:
        json.dump(updates[loc], f, indent=1, sort_keys=True)
    with open(OUTDIR / ('inserts.%s.txt' % loc), 'w', encoding='utf8') as f:
        f.write('\n'.join(sorted(inserts[loc])) + ('\n' if inserts[loc] else ''))
    with open(OUTDIR / ('transplant.%s.txt' % loc), 'w', encoding='utf8') as f:
        for slug, th, dh in sorted(transplant[loc]):
            f.write('%s\t%s\t%s\n' % (slug, th, dh))
with open(OUTDIR / 'leftovers.txt', 'w', encoding='utf8') as f:
    f.write('\n'.join(sorted(leftovers)) + '\n')
with open(OUTDIR / 'anomalies.txt', 'w', encoding='utf8') as f:
    f.write('\n'.join(anomalies) + ('\n' if anomalies else ''))

print('=== summary ===')
tot_u = sum(len(v) for v in updates.values()); tot_i = sum(len(v) for v in inserts.values())
for loc in sorted(set(list(updates.keys()) + list(inserts.keys()))):
    print('%s: updates=%d inserts=%d transplant=%d' % (loc, len(updates[loc]), len(inserts[loc]), len(transplant[loc])))
print('TOTAL updates=%d inserts=%d leftovers=%d anomalies=%d' % (tot_u, tot_i, len(leftovers), len(anomalies)))
