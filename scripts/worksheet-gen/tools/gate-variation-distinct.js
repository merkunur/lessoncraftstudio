#!/usr/bin/env node
/**
 * gate-variation-distinct.js — a variation must differ from the deck its base
 * already publishes.
 *
 * WHY THIS EXISTS. A variation spec spreads `base.difficulty[src]` and applies an
 * override. When that override is EMPTY and `src` is the difficulty the base
 * wave itself ships, the variation resolves to a byte-identical generator config
 * — so the only things that differ from the already-published base deck are the
 * theme, the seed and the title. That is precisely the "a theme swap is never a
 * face" rule, and nothing in the pipeline could see it: the specs compile, the
 * decks build, the SEO gates pass (the titles ARE distinct), and the similarity
 * gate scores prose rather than configuration.
 *
 * Measured on nt20-B-VAR wave 2: FIVE of thirteen proposed faces were the base
 * face again — K-312/K-284, G1-284/G1-245, G1-290/G1-244, G2-309/G2-278,
 * G3-377/G3-370. The design panel believed those base d2 levels had never
 * shipped; it was reasoning about the shipped VARIATIONS (which source d1 and
 * d3) and missed that the base type itself publishes at d2. Two native panels
 * found it independently while writing copy, by comparing the render against
 * the base. This gate makes it a build failure instead.
 *
 * The comparison is on the RESOLVED config, not on the override literal: an
 * override that merely restates the base's own values is the same defect
 * wearing a different hat.
 *
 * BATCHES (2026-09-14). Default = nt20-B-VAR (gen-b2var-specs ROWS against
 * wave-b2-en / wave-b2var-en). `--batch=b3` = nt20-C (tools/b3var-rows/* via
 * gen-b3var-specs + the handwritten faces, against wave-b3-en / wave-b3var-en;
 * before those wave files exist — Phase 2 — pass `--diffs=2`, the level every
 * b3 wave ships). `--family=<key>` narrows b3 to one rows module for the edit
 * loop. Faces are ALSO compared pairwise within a family: two faces resolving
 * to the same config are one face wearing two titles.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const { loadType } = require('../lib/load-types.js');

function arg(name, def) { const a = process.argv.find((x) => x.startsWith('--' + name + '=')); return a ? a.slice(name.length + 3) : def; }
const batch = arg('batch', 'b2');
const family = arg('family', null);
const diffsArg = arg('diffs', null);

let rows, hand = [];
let baseWave, varWave;
if (batch === 'b2') {
  rows = require('./gen-b2var-specs.js').ROWS;
  baseWave = 'wave-b2-en.json'; varWave = 'wave-b2var-en.json';
} else if (batch === 'b3' || batch === 'b4' || batch === 'b5' || batch === 'b6') {
  const gen = require(batch === 'b6' ? './gen-b6var-specs.js' : batch === 'b5' ? './gen-b5var-specs.js' : batch === 'b4' ? './gen-b4var-specs.js' : './gen-b3var-specs.js');
  const loaded = gen.loadRows();
  rows = loaded.rows; hand = loaded.hand;
  if (family) {
    const mod = require(path.join(gen.ROWS_DIR, family + '.js'));
    const ids = new Set([...(mod.ROWS || []).map((r) => r[1]), ...(mod.HANDWRITTEN || []).map((h) => h.id)]);
    rows = rows.filter((r) => ids.has(r[1])); hand = hand.filter((h) => ids.has(h.id));
  }
  baseWave = 'wave-' + batch + '-en.json'; varWave = 'wave-' + batch + 'var-en.json';
} else { console.error('unknown --batch ' + batch); process.exit(2); }

function readDiffs(file) {
  const p = path.join(ROOT, 'waves', file);
  if (!fs.existsSync(p)) return null;
  return JSON.parse(fs.readFileSync(p, 'utf8')).difficulties || null;
}
let basePublished = readDiffs(baseWave), varPublished = readDiffs(varWave);
if ((!basePublished || !varPublished) && diffsArg) { basePublished = basePublished || diffsArg.split(',').map(Number); varPublished = varPublished || diffsArg.split(',').map(Number); }
if (!basePublished || !basePublished.length || !varPublished || !varPublished.length) {
  console.error('VACUOUS: could not read published difficulties from ' + baseWave + ' / ' + varWave + ' (pass --diffs=2 before the wave files exist)');
  process.exit(2);
}
basePublished = new Set(basePublished);

// face id -> base id. Rows carry the base file; handwritten faces declare `base`.
const faces = [];
for (const r of rows) faces.push({ id: r[1], baseId: r[3].replace(/^([A-Z0-9]+-[0-9]+)-.*$/, '$1') });
for (const h of hand) faces.push({ id: h.id, baseId: h.base || null });

const clashes = [];
let checked = 0;
const byBase = new Map();
for (const f of faces) {
  let v, b;
  try { v = loadType(f.id); } catch (e) { clashes.push(`${f.id}: cannot load (${e.message})`); continue; }
  const baseId = f.baseId || (v.exerciseType && null);
  if (baseId) {
    try { b = loadType(baseId); } catch (e) { clashes.push(`${f.id}: base ${baseId} cannot load (${e.message})`); continue; }
    for (const d of varPublished) {
      checked++;
      if (!basePublished.has(d)) continue;          // the base never ships this level
      if (JSON.stringify(v.difficulty[d]) === JSON.stringify(b.difficulty[d])) {
        clashes.push(`${f.id} resolves to the SAME config as its base ${baseId} at d${d} — ` +
          `the base wave publishes d${d}, so this is the published base deck with a new theme and title`);
      }
    }
  }
  const fam = baseId || v.exerciseType;
  if (!byBase.has(fam)) byBase.set(fam, []);
  byBase.get(fam).push({ id: f.id, cfg: varPublished.map((d) => JSON.stringify(v.difficulty[d])).join('|') });
}
// pairwise within a family (b3 and later — the b2 batch predates this check and is frozen)
if (batch !== 'b2') {
  for (const [fam, list] of byBase) {
    for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) {
      checked++;
      if (list[i].cfg === list[j].cfg) clashes.push(`${list[i].id} and ${list[j].id} (family ${fam}) resolve to the SAME config — one face wearing two titles`);
    }
  }
}

if (!checked) { console.error('VACUOUS: no (face, difficulty) pairs compared'); process.exit(2); }
console.log(`[${batch}${family ? ':' + family : ''}] compared ${checked} pairs over ${faces.length} faces against their bases` + (batch !== 'b2' ? ' + pairwise within family' : ''));
if (clashes.length) {
  console.error(`\n${clashes.length} variation(s) are not variations:`);
  clashes.forEach((c) => console.error('  ' + c));
  process.exit(1);
}
console.log('every variation differs from the deck its base publishes' + (batch !== 'b2' ? ' and from its siblings' : ''));
