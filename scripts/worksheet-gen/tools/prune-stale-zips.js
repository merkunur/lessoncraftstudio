#!/usr/bin/env node
/**
 * prune-stale-zips.js <wave.json> [--apply]
 *
 * Deletes staged ZIPs that the wave no longer enumerates.
 *
 * WHY. `--force` overwrites a ZIP at the same deckId but cannot remove one whose
 * NAME changed. deckId embeds the theme, so re-pinning a themeOverride (or any
 * probe run) leaves the old theme's ZIP behind, and publish-bulk reads the
 * DIRECTORY — it would ship both. Measured on wave-b2var-en: 104 ZIPs for 100
 * enumerated instances, including a G1-292 under its pre-repin `toys` theme.
 *
 * Non-vacuity: refuses to run when enumeration yields no instances, so an empty
 * expected-set can never delete the whole staging directory.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { enumerate } = require('../enumerate.js');

const waveArg = process.argv[2];
const apply = process.argv.includes('--apply');
if (!waveArg) { console.error('usage: prune-stale-zips.js <wave.json> [--apply]'); process.exit(2); }

const wavePath = path.isAbsolute(waveArg) ? waveArg : path.join(__dirname, '..', waveArg);
const plan = JSON.parse(fs.readFileSync(wavePath, 'utf8'));
const { instances } = enumerate(plan);
if (!instances || !instances.length) {
  console.error('prune: enumeration produced 0 instances — refusing to prune');
  process.exit(2);
}
const expected = new Set(instances.map((it) => it.deckId + '.zip'));

const dir = path.join(__dirname, '..', 'out', 'staging', plan.id);
if (!fs.existsSync(dir)) { console.error('prune: no staging dir ' + dir); process.exit(2); }
const present = fs.readdirSync(dir).filter((f) => f.endsWith('.zip'));
const stale = present.filter((f) => !expected.has(f));

console.log(`${plan.id}: ${present.length} staged, ${expected.size} enumerated, ${stale.length} stale`);
for (const f of stale) {
  console.log('  ' + (apply ? 'DELETE ' : 'stale  ') + f);
  if (apply) fs.unlinkSync(path.join(dir, f));
}
if (!apply && stale.length) console.log('  (re-run with --apply to delete)');
process.exit(0);
