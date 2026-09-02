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
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const { ROWS } = require('./gen-b2var-specs.js');
const { loadType } = require('../lib/load-types.js');

// Which difficulties does the BASE b2 wave publish? Read it, never assume.
const basePlan = JSON.parse(fs.readFileSync(path.join(ROOT, 'waves', 'wave-b2-en.json'), 'utf8'));
const varPlan = JSON.parse(fs.readFileSync(path.join(ROOT, 'waves', 'wave-b2var-en.json'), 'utf8'));
const basePublished = new Set(basePlan.difficulties || []);
const varPublished = varPlan.difficulties || [];
if (!basePublished.size || !varPublished.length) {
  console.error('VACUOUS: could not read published difficulties from the wave files');
  process.exit(2);
}

const clashes = [];
let checked = 0;
for (const r of ROWS) {
  const [, id, , baseFile] = r;
  const baseId = baseFile.replace(/^([A-Z0-9]+-[0-9]+)-.*$/, '$1');
  let v, b;
  try { v = loadType(id); b = loadType(baseId); } catch (e) { clashes.push(`${id}: cannot load (${e.message})`); continue; }
  for (const d of varPublished) {
    checked++;
    if (!basePublished.has(d)) continue;          // the base never ships this level
    const cv = JSON.stringify(v.difficulty[d]);
    const cb = JSON.stringify(b.difficulty[d]);
    if (cv === cb) {
      clashes.push(`${id} resolves to the SAME config as its base ${baseId} at d${d} — ` +
        `the base wave publishes d${d}, so this is the published base deck with a new theme and title`);
    }
  }
}

if (!checked) { console.error('VACUOUS: no (face, difficulty) pairs compared'); process.exit(2); }
console.log(`compared ${checked} (face, published difficulty) pairs against their base`);
if (clashes.length) {
  console.error(`\n${clashes.length} variation(s) are not variations:`);
  clashes.forEach((c) => console.error('  ' + c));
  process.exit(1);
}
console.log('every variation differs from the deck its base publishes');
