#!/usr/bin/env node
/**
 * Merges the guest teacher scripts of scripts/sub-plans/texts/<loc>-<grade>.js (and <loc>-<grade>-weeks.js, the week
 * days of Part 5.4) into frontend/content/sub-plans/scripts/<loc>.json (Daily Teaching System, Part 5).
 *
 *   node scripts/sub-plans/apply-texts.js            writes
 *   node scripts/sub-plans/apply-texts.js --check    exit 1 when the committed scripts file is not the merge
 *
 * A text file owns the parts it gives: say, first and stuck replace what the scripts file holds for the point; a
 * `byType` entry replaces the entry of that worksheet type and leaves the point's other types alone (a point of the
 * first pilot pack keeps its script and gains the types of the new packs); a `byPage` entry (Part 5.4) holds what is
 * true of ONE page of the point's types (the picture words of a sound task) and comes over the type's script. A point
 * may stand in two text files when they give different parts (a week-days file adds types and pages to a point whose
 * script lives in the file of the first packs). A point the scripts file holds and no text file names is kept.
 * Refused: a part two files both give (the script, or one type or one page), an id that is no teaching point, a type
 * or a page that does not belong to its point, a script or a type entry without the text it needs.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..');
const CHECK = process.argv.includes('--check');
const DIR = path.join(__dirname, 'texts');
const points = new Map(JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'content', 'teaching-graph', 'points.json'), 'utf8')).points.map((p) => [p.id, p]));
const KEYS = ['say', 'first', 'stuck'];
// the worksheet type a page's address carries (…-k224-2 → K-224), as scripts/units/catalog.js reads it
const typeOfSlug = (slug) => { const all = slug.match(/-(?:k|g[0-9])[0-9]{3}(?=-|$)/g); if (!all) return null; const c = all[all.length - 1].slice(1); return c[0] === 'k' ? 'K-' + c.slice(1) : c.slice(0, 2).toUpperCase() + '-' + c.slice(2); };
const byLoc = {};
let bad = 0;
const err = (m) => { bad++; console.log('ERROR  ' + m); };
const partsOk = (where, o) => { if (!Object.keys(o).length || Object.keys(o).some((k) => !KEYS.includes(k) || !o[k])) { err(where + ' holds something other than say, first, stuck'); return false; } return true; };
for (const f of fs.readdirSync(DIR).filter((x) => /^[a-z]{2}-[a-z0-9]+(?:-weeks)?\.js$/.test(x)).sort()) {
  const m = require(path.join(DIR, f));
  const L = (byLoc[m.loc] = byLoc[m.loc] || { points: {}, base: {}, part: {} });
  for (const [id, t] of Object.entries(m.points)) {
    const p = points.get(id);
    if (!p) { err(f + ': ' + id + ' is no teaching point'); continue; }
    const base = KEYS.filter((k) => t[k]);
    if (base.length && base.length < 3) { err(f + ': ' + id + ' gives a part of a script (say, first and stuck go together)'); continue; }
    if (base.length && L.base[id]) { err(id + ': its script is in ' + L.base[id] + ' and in ' + f); continue; }
    if (!base.length && !Object.keys(t.byType || {}).length && !Object.keys(t.byPage || {}).length) { err(f + ': ' + id + ' is empty'); continue; }
    const P = (L.points[id] = L.points[id] || { byType: {}, byPage: {} });
    if (base.length) { L.base[id] = f; for (const k of KEYS) P[k] = t[k]; }
    for (const [type, o] of Object.entries(t.byType || {})) {
      // '<type>+' is the script for the type's harder page where a pack hands that page to everyone
      // '<type>@w' is the type's script for the week days (Part 5.4): true of every page of the type
      if (!p.types.includes(type.replace(/@w$/, '').replace(/[+]$/, ''))) err(f + ': ' + id + ' has no worksheet type ' + type);
      if (L.part[id + ' ' + type]) err(id + ' ' + type + ': in ' + L.part[id + ' ' + type] + ' and in ' + f);
      if (partsOk(f + ': ' + id + ' ' + type, o)) { L.part[id + ' ' + type] = f; P.byType[type] = o; }
    }
    for (const [slug, o] of Object.entries(t.byPage || {})) {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !p.types.includes(typeOfSlug(slug))) err(f + ': ' + id + ' page ' + slug + ' is no page of the point\'s types');
      if (L.part[id + ' @' + slug]) err(id + ' ' + slug + ': in ' + L.part[id + ' @' + slug] + ' and in ' + f);
      if (partsOk(f + ': ' + id + ' ' + slug, o)) { L.part[id + ' @' + slug] = f; P.byPage[slug] = o; }
    }
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
    const types = Object.assign({}, have.byType || {}, t.byType);
    if (Object.keys(types).length) out.byType = types;
    // the scripts of single pages come from the text files only (every byPage text is written there), so a page
    // script removed from a text file leaves the scripts file too
    const pages = Object.assign({}, t.byPage);
    if (Object.keys(pages).length) out.byPage = pages;
    if (!out.say || !out.first || !out.stuck) { bad++; console.log('ERROR  ' + id + ': only worksheet types or pages are given and the scripts file holds no script for the point'); continue; }
    j.points[id] = out;
  }
  if (bad) continue;
  const text = JSON.stringify(j, null, 1) + '\n';
  if (CHECK) { if (text !== raw.replace(/\r\n/g, '\n')) { stale++; console.log('STALE  ' + path.relative(REPO, file)); } }
  else { fs.writeFileSync(file, text); console.log(loc + ': ' + Object.keys(byLoc[loc].points).length + ' point(s) from the text files; the scripts file holds ' + Object.keys(j.points).length); }
}
if (bad) { console.log(bad + ' problem(s)'); process.exit(1); }
if (CHECK) { console.log(stale ? 'the scripts file is not the merge of the text files: node scripts/sub-plans/apply-texts.js' : 'guest teacher scripts: the scripts files are the merge of the text files'); process.exit(stale ? 1 : 0); }
