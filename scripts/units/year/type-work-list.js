#!/usr/bin/env node
/**
 * The work list of Part 12.2, by WORKSHEET TYPE (Daily Teaching System). The year designs name, per language, every
 * new lesson and the page it needs; most were marked "a new worksheet type". They were then matched, need by need,
 * against the mathematics types that already exist as generators (many were built for the worksheet makers and are
 * published as pages in no language): scripts/units/year/match.<en|de-sv>.math.json, each candidate confirmed by
 * reading its generator. This script merges the designs and the matches into one list:
 *
 *   A  the page exists and is published in the language            → the lesson can be written now
 *   B  the page exists as a generator, not published in the language → publish it (no build)
 *   C  an existing type is close: ruled line by line in rulings.close.math.js
 *        use     the page teaches the objective as it is            → the lesson can be written (at the level named)
 *        change  the objective needs a change to the generator       → grouped by type: one change often serves several
 *                                                                       lessons and languages
 *        build   too far from the page                               → joins D
 *   D  nothing does this task                                         → build a new type
 *
 *   node scripts/units/year/type-work-list.js [--check]
 *     reads   scripts/units/year/design.<loc>.math.json, match.en.math.json, match.de-sv.math.json,
 *             frontend/content/teaching-graph/assets/<loc>.json (what is published)
 *     writes  docs/daily-teaching-system/year/TYPE-WORK-LIST.math.md, scripts/units/year/type-work-list.math.json
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const check = process.argv.includes('--check');
const LOCS = ['en', 'de', 'sv'];
const GRADE = { en: { K: 'K', 1: 'G1', 2: 'G2', 3: 'G3' }, de: { 1: 'Kl. 1', 2: 'Kl. 2', 3: 'Kl. 3' }, sv: { K: 'F', 1: 'åk 1', 2: 'åk 2', 3: 'åk 3' } };

// the needs, with the same keys the matching used (the order of the designs: language, grade, unit, lesson)
const needs = []; let n = 0;
for (const loc of LOCS) {
  const d = readJson(path.join(__dirname, 'design.' + loc + '.math.json'));
  for (const g of ['K', '1', '2', '3']) {
    if (!d[g]) continue;
    for (const u of d[g].units) for (const x of u.lessons) {
      if (!x.new || x.source === 'teacher-led') continue;
      n++; needs.push({ key: loc + '-' + g + '-' + String(n).padStart(3, '0'), loc, grade: g, unit: u.title, title: x.title, source: x.source });
    }
  }
}
const matches = new Map();
for (const f of ['match.en.math.json', 'match.de-sv.math.json']) for (const m of readJson(path.join(__dirname, f)).matches) matches.set(m.key, m);
const assets = Object.fromEntries(LOCS.map((l) => [l, readJson(path.join(REPO, 'frontend', 'content', 'teaching-graph', 'assets', l + '.json')).types]));
const published = (loc, id) => !!(assets[loc][id] && assets[loc][id].p.some(Boolean));
const problems = [];
for (const nd of needs) if (!matches.has(nd.key)) problems.push(nd.key + ' "' + nd.title + '" has no match entry');
for (const k of matches.keys()) if (!needs.some((x) => x.key === k)) problems.push('match ' + k + ' names no need of the designs (a design changed after the matching)');
if (problems.length) { for (const p of problems) console.log('PROBLEM  ' + p); process.exit(1); }

const RULINGS = require('./rulings.close.math.js');
const rulingOf = (nd) => (RULINGS[nd.loc] || {})[nd.key.slice(3)] || null;
const A = [], B = new Map(), C = new Map(), D = [], USE = [];
const ruled = new Set();
for (const nd of needs) {
  const m = matches.get(nd.key); const best = (m.types || [])[0];
  const row = { ...nd, fit: m.fit, types: m.types || [], differs: m.differs || '' };
  if (m.fit === 'none' || !best) { D.push(row); continue; }
  if (m.fit === 'exact') { if (published(nd.loc, best)) A.push(row); else { if (!B.has(best)) B.set(best, []); B.get(best).push(row); } continue; }
  // a close line: by its ruling
  const r = rulingOf(nd);
  if (!r) { problems.push(nd.key + ' "' + nd.title + '" is close to ' + best + ' and has no ruling in rulings.close.math.js'); continue; }
  ruled.add(nd.loc + '|' + nd.key.slice(3));
  row.ruling = r.rule; row.note = r.note; if (r.level) row.level = r.level;
  // a ruling may name the type that was BUILT for the line after the matching (a new face of the close generator):
  // the lesson is then written on that type, and the close type stays in the row as the second one
  const use = r.type || best;
  if (r.type) row.types = [r.type].concat(row.types.filter((t) => t !== r.type));
  if (r.rule === 'use') { if (published(nd.loc, use)) USE.push(row); else { if (!B.has(use)) B.set(use, []); B.get(use).push(row); } continue; }
  if (r.rule === 'build') { D.push(row); continue; }
  if (r.rule !== 'change') { problems.push(nd.key + ': ruling "' + r.rule + '"'); continue; }
  if (!C.has(best)) C.set(best, []); C.get(best).push(row);
}
for (const [loc, m] of Object.entries(RULINGS)) for (const k of Object.keys(m)) if (!ruled.has(loc + '|' + k)) problems.push('ruling ' + loc + ' ' + k + ' names no close line of the work list');
if (problems.length) { for (const p of problems) console.log('PROBLEM  ' + p); process.exit(1); }
const tag = (r) => r.loc + ' ' + GRADE[r.loc][r.grade] + ' "' + r.title + '"';
const count = (rows, loc) => rows.filter((r) => r.loc === loc).length;
const flat = (m) => [...m.values()].flat();
const L = ['# The work list of Part 12.2 by worksheet type: mathematics', '',
  'GENERATED by `scripts/units/year/type-work-list.js` from the three year designs and the matching of every needed page against the types that exist. Do not edit by hand.', '',
  '| | What it means | English | German | Swedish | All | Types |', '|---|---|---|---|---|---|---|',
  '| A | the page exists and is published: write the lesson | ' + LOCS.map((l) => count(A, l)).join(' | ') + ' | ' + A.length + ' | |',
  '| B | the page exists, not published in the language: publish it | ' + LOCS.map((l) => count(flat(B), l)).join(' | ') + ' | ' + flat(B).length + ' | ' + B.size + ' |',
  '| A2 | an existing page teaches the objective as it is (ruled "use"): write the lesson | ' + LOCS.map((l) => count(USE, l)).join(' | ') + ' | ' + USE.length + ' | |',
  '| C | the objective needs a change to an existing generator | ' + LOCS.map((l) => count(flat(C), l)).join(' | ') + ' | ' + flat(C).length + ' | ' + C.size + ' |',
  '| D | nothing does this task: build a new type | ' + LOCS.map((l) => count(D, l)).join(' | ') + ' | ' + D.length + ' | |',
  '| | **all pages the new lessons need** | ' + LOCS.map((l) => count(needs, l)).join(' | ') + ' | ' + needs.length + ' | |', ''];
L.push('## A. Published today: the lesson can be written (' + A.length + ')', '');
for (const r of A) L.push('- `' + r.types[0] + '` ' + tag(r) + (r.types.length > 1 ? ' (also ' + r.types.slice(1).map((t) => '`' + t + '`').join(', ') + ')' : ''));
L.push('', '## A2. An existing page teaches the objective as it is (' + USE.length + ')', '', 'Ruled in `scripts/units/year/rulings.close.math.js`; the native reviewer of the lesson texts can overrule. The level is named where the fit is not level 2.', '');
for (const r of USE) L.push('- `' + r.types[0] + '`' + (r.level ? ' level ' + r.level : '') + ' ' + tag(r) + ': ' + r.note);
L.push('', '## B. Built, not published in the language: publish (' + flat(B).length + ' lessons, ' + B.size + ' types)', '');
for (const [id, rows] of [...B].sort()) L.push('- `' + id + '`: ' + rows.map(tag).join('; '));
L.push('', '## C. A change to an existing generator (' + flat(C).length + ' lessons, ' + C.size + ' types)', '', 'Sorted by how many lessons wait for the type. First line of each lesson: the ruling (what must change); second: the analyst\'s account.', '');
for (const [id, rows] of [...C].sort((a, b) => b[1].length - a[1].length || (a[0] < b[0] ? -1 : 1))) {
  L.push('### `' + id + '` (' + rows.length + ' lesson' + (rows.length > 1 ? 's' : '') + '; published: ' + [...new Set(rows.map((r) => r.loc))].map((l) => l + ' ' + (published(l, id) ? 'yes' : 'no')).join(', ') + ')', '');
  for (const r of rows) L.push('- ' + tag(r) + ': **' + r.note + '.** ' + r.differs);
  L.push('');
}
L.push('## D. To build new (' + D.length + ')', '');
for (const r of D) L.push('- ' + tag(r) + ': ' + (r.note ? '**' + r.note + '.** ' : '') + r.differs);
L.push('');
const md = L.join('\n');
const json = JSON.stringify({ $comment: 'GENERATED by scripts/units/year/type-work-list.js. Never edit by hand.', counts: { A: A.length, use: USE.length, B: flat(B).length, C: flat(C).length, D: D.length }, A, use: USE, B: Object.fromEntries(B), C: Object.fromEntries(C), D }, null, 1) + '\n';
const mdFile = path.join(REPO, 'docs', 'daily-teaching-system', 'year', 'TYPE-WORK-LIST.math.md'), jsonFile = path.join(__dirname, 'type-work-list.math.json');
if (check) {
  const same = (f, s) => fs.existsSync(f) && fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n') === s;
  if (!same(mdFile, md) || !same(jsonFile, json)) { console.log('type work list: the committed files are not what the script writes today'); process.exit(1); }
  console.log('type work list: current'); process.exit(0);
}
fs.writeFileSync(mdFile, md); fs.writeFileSync(jsonFile, json);
console.log('A published ' + A.length + ' · A2 usable as it is ' + USE.length + ' · B to publish ' + flat(B).length + ' (' + B.size + ' types) · C to change ' + flat(C).length + ' (' + C.size + ' types) · D to build ' + D.length + ' · all ' + needs.length);
console.log(path.relative(REPO, mdFile));
