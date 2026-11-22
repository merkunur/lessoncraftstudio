#!/usr/bin/env node
/**
 * The worksheet family of every type the English sub packs use (Part 5.4: no family twice in a week day), read from
 * the catalogue table (out/teaching-graph/decks.tsv, column 3: the family a page was made by, e.g. "mental-math",
 * "find-the-differences"), and for the family "reading-comprehension" the kind of text: a story, an informational
 * text, or a lesson page about writing. Written to scripts/sub-plans/type-families.json, which the selector
 * (lists/build-en-weeks.js) and gate P8 read (the gate runs on committed files only).
 *
 *   node scripts/sub-plans/type-families.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..');
const OUT = path.join(__dirname, 'type-families.json');
const POOLS = require('./lists/en-weeks-pools.js');
const defs = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'content', 'sub-plans', 'defs', 'en.json'), 'utf8')).packs;
const types = new Set(defs.flatMap((p) => p.blocks.map((b) => b.type)));
for (const g of Object.values(POOLS)) for (const text of Object.values(g)) for (const raw of text.split(';')) { const t = raw.trim().split(/\s+/)[1]; if (t) types.add(t); }
// the kind of text of the reading-comprehension types (read from their pages): two reading pages may stand in one
// day only when one is a story and the other an informational text
const STORY = ['G1-579', 'G1-580', 'G1-581', 'G1-582', 'G1-583', 'G2-254', 'G2-269', 'G2-270', 'G2-271', 'G2-272', 'G2-273', 'G2-526', 'G2-527', 'G2-528', 'G2-529', 'G2-576', 'G2-577', 'G2-580', 'G2-581', 'G3-502', 'G3-503', 'G3-504', 'G3-505', 'G3-506', 'G3-507'];
const INFO = ['G1-575', 'G1-576', 'G1-577', 'G1-578', 'G2-519', 'G2-520', 'G2-521', 'G2-522', 'G2-523', 'G2-524', 'G2-525', 'G3-494', 'G3-495', 'G3-496', 'G3-497', 'G3-498', 'G3-499', 'G3-500', 'G3-501', 'G3-510', 'G3-511'];
// two types of different families that teach the same thing (read from their pages): a day takes one of them
// (review of Part 5.4: a size page beside a size page, two blends pages, two subtraction pages)
const TOPIC = { 'K-044': 'comparing-sizes', 'G1-333': 'blends', 'G1-493': 'blends', 'G1-104': 'subtraction-to-20', 'G1-119': 'subtraction-to-20', 'G1-217': 'subtraction-to-20', 'G1-432': 'symmetry', 'G2-247': 'symmetry', 'G2-248': 'symmetry' };
const fam = new Map();
const codeOf = (t) => '-' + t.toLowerCase().replace('-', '');
for (const line of fs.readFileSync(path.join(REPO, 'out', 'teaching-graph', 'decks.tsv'), 'utf8').split('\n')) {
  if (!line.startsWith('en\t')) continue;
  const [, slug, family] = line.split('\t');
  const m = slug.match(/-(?:k|g[0-9])[0-9]{3}(?=-|$)/g);
  if (!m) continue;
  const c = m[m.length - 1].slice(1);
  const type = c[0] === 'k' ? 'K-' + c.slice(1) : c.slice(0, 2).toUpperCase() + '-' + c.slice(2);
  if (!types.has(type)) continue;
  const f = fam.get(type) || new Map();
  f.set(family, (f.get(family) || 0) + 1);
  fam.set(type, f);
}
const out = {};
for (const t of [...types].sort()) {
  const f = fam.get(t);
  if (!f) { console.log('FAIL  ' + t + ': no page in the catalogue table'); process.exitCode = 1; continue; }
  const family = [...f].sort((a, b) => b[1] - a[1])[0][0];
  out[t] = family === 'reading-comprehension' ? { family, kind: STORY.includes(t) ? 'story' : INFO.includes(t) ? 'info' : 'lesson' } : { family };
  if (TOPIC[t]) out[t].topic = TOPIC[t];
}
const text = JSON.stringify({ $comment: 'The worksheet family of each type the English sub packs use (scripts/sub-plans/type-families.js, from the catalogue table); kind: the kind of text of a reading-comprehension type; topic: a second family for a type that teaches what another family teaches. A week day hands out no family (or topic) twice, except a story and an informational text.', types: out }, null, 1) + '\n';
if (process.argv.includes('--check')) { const have = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8').replace(/\r\n/g, '\n') : ''; if (have !== text) { console.log('FAIL  ' + path.relative(REPO, OUT) + ' is not what type-families.js writes'); process.exit(1); } console.log('type families: current'); }
else { fs.writeFileSync(OUT, text); console.log(Object.keys(out).length + ' types -> ' + path.relative(REPO, OUT)); }
