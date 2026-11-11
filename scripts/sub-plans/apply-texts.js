#!/usr/bin/env node
/**
 * Merges the guest teacher scripts of scripts/sub-plans/texts/<loc>-<grade>.js into
 * frontend/content/sub-plans/scripts/<loc>.json (Daily Teaching System, Part 5).
 *
 *   node scripts/sub-plans/apply-texts.js            writes
 *   node scripts/sub-plans/apply-texts.js --check    exit 1 when the committed scripts file is not the merge
 *
 * A text file owns the parts it gives: say, first and stuck replace what the scripts file holds for the point; a
 * `byType` entry replaces the entry of that worksheet type and leaves the point's other types alone (a point of the
 * first pilot pack keeps its script and gains the types of the new packs). A point the scripts file holds and no text
 * file names is kept. Refused: a point two files both give a script for, an id that is no teaching point, a type that
 * does not belong to its point, a script or a type entry without the text it needs.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..');
const CHECK = process.argv.includes('--check');
const DIR = path.join(__dirname, 'texts');
const points = new Map(JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'content', 'teaching-graph', 'points.json'), 'utf8')).points.map((p) => [p.id, p]));
const KEYS = ['say', 'first', 'stuck'];
const byLoc = {};
let bad = 0;
const err = (m) => { bad++; console.log('ERROR  ' + m); };
for (const f of fs.readdirSync(DIR).filter((x) => /^[a-z]{2}-[a-z0-9]+\.js$/.test(x)).sort()) {
  const m = require(path.join(DIR, f));
  const L = (byLoc[m.loc] = byLoc[m.loc] || { points: {}, from: {} });
  for (const [id, t] of Object.entries(m.points)) {
    const p = points.get(id);
    if (!p) { err(f + ': ' + id + ' is no teaching point'); continue; }
    if (L.from[id]) { err(id + ' is in ' + L.from[id] + ' and in ' + f); continue; }
    const base = KEYS.filter((k) => t[k]);
    if (base.length && base.length < 3) { err(f + ': ' + id + ' gives a part of a script (say, first and stuck go together)'); continue; }
    for (const [type, o] of Object.entries(t.byType || {})) {
      // '<type>+' is the script for the type's harder page where a pack hands that page to everyone
      if (!p.types.includes(type.replace(/[+]$/, ''))) err(f + ': ' + id + ' has no worksheet type ' + type);
      if (!Object.keys(o).length || Object.keys(o).some((k) => !KEYS.includes(k) || !o[k])) err(f + ': ' + id + ' ' + type + ' holds something other than say, first, stuck');
    }
    if (!base.length && !Object.keys(t.byType || {}).length) { err(f + ': ' + id + ' is empty'); continue; }
    L.from[id] = f; L.points[id] = t;
  }
}
if (bad) { console.log(bad + ' problem(s); nothing written'); process.exit(1); }
let stale = 0;
for (const loc of Object.keys(byLoc)) {
  const file = path.join(REPO, 'frontend', 'content', 'sub-plans', 'scripts', loc + '.json');
  const raw = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  const j = raw ? JSON.parse(raw) : { $comment: 'Guest teacher scripts of the sub packs, language ' + loc + ': one per teaching point (say, first, stuck; byType for one worksheet type). The points of scripts/sub-plans/texts/' + loc + '-*.js are merged in by scripts/sub-plans/apply-texts.js.', points: {} };
  for (const [id, t] of Object.entries(byLoc[loc].points)) {
    const have = j.points[id] || {};
    const out = {};
    for (const k of KEYS) { const v = t[k] || have[k]; if (v) out[k] = v; }
    const types = Object.assign({}, have.byType || {}, t.byType || {});
    if (Object.keys(types).length) out.byType = types;
    if (!out.say || !out.first || !out.stuck) { bad++; console.log('ERROR  ' + id + ': only worksheet types are given and the scripts file holds no script for the point'); continue; }
    j.points[id] = out;
  }
  if (bad) continue;
  const text = JSON.stringify(j, null, 1) + '\n';
  if (CHECK) { if (text !== raw.replace(/\r\n/g, '\n')) { stale++; console.log('STALE  ' + path.relative(REPO, file)); } }
  else { fs.writeFileSync(file, text); console.log(loc + ': ' + Object.keys(byLoc[loc].points).length + ' point(s) from the text files; the scripts file holds ' + Object.keys(j.points).length); }
}
if (bad) { console.log(bad + ' problem(s)'); process.exit(1); }
if (CHECK) { console.log(stale ? 'the scripts file is not the merge of the text files: node scripts/sub-plans/apply-texts.js' : 'guest teacher scripts: the scripts files are the merge of the text files'); process.exit(stale ? 1 : 0); }
