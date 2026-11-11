#!/usr/bin/env node
/**
 * Applies the rulings of the reviewer of the curriculum pages (Daily Teaching System, Part 6), each at its source.
 *
 *   node scripts/curriculum-pages/apply-review.js --loc=en scripts/curriculum-pages/reviews/en.review.json
 *   then: the registry builders (scripts/curricula/build-<reg>.js), scripts/units/assemble.js --loc=<loc>,
 *         scripts/curriculum-pages/assemble.js --loc=<loc>
 *
 * review.json: { ui: { key: text }, pages: { id: { metaDescription … } }, lines: [{ id: "<page id> / <code>",
 * verdict, text?, why }] } (ids of scripts/curriculum-pages/dump-for-review.js).
 *
 *   ui        → frontend/content/curriculum-pages/ui.<loc>.json
 *   pages     → read by lists/build-<loc>-defs.js from the review file itself (nothing is written here)
 *   describe  → frontend/content/curriculum-pages/lines/<loc>.json: the sentence a line shows is the reviewer's
 *   drop, prepares, extends, teaches → the CURRICULUM REGISTRY, because the claim "these worksheets teach this
 *             objective" is made there and is also shown on the unit pages: every teaching point that has a row for
 *             the objective gets the row removed (drop) or its relation changed, in crosswalk-overrides.json (a
 *             registry whose crosswalk is derived and corrected) or crosswalk-authored.json (a registry whose
 *             crosswalk is written point by point); the reviewer's reason and the rows as they were are kept.
 * Refused, with nothing written: a line no page has, a verdict that is none of the five, a describe without a text.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..');
const { shown } = require('../curricula/show.js');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const loc = arg('loc', 'en');
const src = process.argv.slice(2).find((x) => !x.startsWith('--'));
if (!src) { console.error('usage: apply-review.js --loc=<loc> <review.json>'); process.exit(1); }
const C = path.join(REPO, 'frontend', 'content');
const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const writeJson = (f, j) => fs.writeFileSync(f, JSON.stringify(j, null, 1) + '\n');
const review = readJson(path.resolve(src));
const tag = 'pages-review ' + path.basename(src);
const pages = new Map(readJson(path.join(C, 'curriculum-pages', 'pages.' + loc + '.json')).pages.map((p) => [p.id, p]));
const display = readJson(path.join(C, 'curricula', 'display.json')).registries;
const HEADINGS = new Set(['domain', 'cluster', 'strand', 'topic', 'area', 'subarea']);
const regs = new Map();
const registryOf = (reg) => {
  if (!regs.has(reg)) {
    const fw = readJson(path.join(C, 'curricula', reg, 'framework.json'));
    const registry = { framework: fw, display: display[reg] };
    const byCode = new Map();
    for (const n of fw.nodes) byCode.set(n.f + ' ' + shown(registry, n).code, n);
    const dir = path.join(C, 'curricula', reg);
    const authored = fs.existsSync(path.join(dir, 'crosswalk-authored.json'));
    const file = path.join(dir, authored ? 'crosswalk-authored.json' : 'crosswalk-overrides.json');
    regs.set(reg, { byCode, cw: readJson(path.join(dir, 'crosswalk.json')).points, file, store: readJson(file), authored, dirty: false });
  }
  return regs.get(reg);
};

const problems = [], describe = {}, relation = [];
for (const l of review.lines || []) {
  const [pid, code] = l.id.split(' / ');
  const p = pages.get(pid);
  if (!p) { problems.push(l.id + ': no such page'); continue; }
  if (!['drop', 'prepares', 'extends', 'teaches', 'describe'].includes(l.verdict) || !l.why) { problems.push(l.id + ': not a verdict with its reason'); continue; }
  const R = registryOf(p.registry);
  const node = R.byCode.get(p.framework + ' ' + code);
  if (!node) { problems.push(l.id + ': the registry has no objective with this code'); continue; }
  if (l.verdict === 'describe') {
    if (!l.text) { problems.push(l.id + ': describe without a text'); continue; }
    if (HEADINGS.has(node.kind)) continue;                       // a heading is no longer a line of a page
    describe[l.id] = { verdict: 'describe', text: l.text, why: l.why };
  } else relation.push({ l, p, R, node });
}
if (problems.length) { for (const x of problems) console.log('ERROR  ' + x); console.log(problems.length + ' problem(s); nothing written'); process.exit(1); }

// the registry: every point with a row for the objective
let changed = 0;
for (const { l, R, node } of relation) {
  const to = l.verdict === 'drop' ? null : l.verdict;
  for (const [pt, v] of Object.entries(R.cw)) {
    const rows = v.rows || [];
    if (!rows.some((r) => r.id === node.id)) continue;
    const cur = R.store.points[pt];
    const base = (cur && cur.rows ? cur.rows : rows).map((r) => ({ id: r.id, rel: r.rel }));
    const next = base.filter((r) => !(r.id === node.id && to === null)).map((r) => (r.id === node.id && to ? Object.assign({}, r, { rel: to }) : r));
    if (JSON.stringify(next) === JSON.stringify(base)) continue;
    const entry = Object.assign({}, cur || {}, { rows: next });
    entry.why = [(cur && cur.why) || null, '[' + tag + ', ' + node.id + ' ' + (to || 'removed') + '] ' + l.why].filter(Boolean).join(' ');
    if (!entry.was) entry.was = { rows: base };
    if (!next.length) { entry.none = l.why; }
    if (!R.authored) entry.review = entry.review || tag;
    R.store.points[pt] = entry;
    R.dirty = true;
    changed++;
  }
}
for (const [reg, R] of regs) if (R.dirty) { writeJson(R.file, R.store); console.log('rewritten  ' + path.relative(REPO, R.file)); }

// the sentences
const linesFile = path.join(C, 'curriculum-pages', 'lines', loc + '.json');
const lines = fs.existsSync(linesFile) ? readJson(linesFile) : { $comment: 'What the reviewer of the curriculum pages ruled about single lines: the sentence a line shows (verdict describe). Written by scripts/curriculum-pages/apply-review.js; a ruling about whether the lessons teach an objective is not here but in the curriculum registry.', lines: {} };
Object.assign(lines.lines, describe);
fs.mkdirSync(path.dirname(linesFile), { recursive: true });
writeJson(linesFile, lines);

// the page strings
const uiFile = path.join(C, 'curriculum-pages', 'ui.' + loc + '.json');
const ui = readJson(uiFile);
let strings = 0;
for (const [k, v] of Object.entries(review.ui || {})) { if (!(k in ui)) { console.log('ERROR  ui.' + k + ' is no string of the pages'); process.exit(1); } ui[k] = v; strings++; }
writeJson(uiFile, ui);
console.log(Object.keys(describe).length + ' sentence(s), ' + relation.length + ' ruling(s) on a claim (' + changed + ' point rows changed in the registry), ' + strings + ' string(s)');
