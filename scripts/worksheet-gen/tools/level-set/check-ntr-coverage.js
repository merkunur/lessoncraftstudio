#!/usr/bin/env node
/**
 * check-ntr-coverage.js — Level Set 2026-10-13, Number Tracing. Every locale's wave must carry:
 *   - K-237: one copy per number 0-20 at levels 1, 2 and 3, plus the 0-9 range page (no unit) at levels 1 and 3;
 *   - K-249 / K-250 / K-251 / K-252 / K-253: exactly one copy at level 1 and one at level 3, none at level 2
 *     (level 2 IS the published page);
 *   - copy numbers unique per type (they become "Set N" in titles), `indexable: false`, `interactive: false`.
 * With --zips=<staging root> it also counts the generated ZIPs per locale against the wave.
 *
 *   node tools/level-set/check-ntr-coverage.js [--zips=out/staging] [--poison]
 * --poison drops number 7 from de level 3 and must FAIL.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const LOCALES = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const NUMBERS = Array.from({ length: 21 }, (_, n) => String(n));
const FACES = ['K-249', 'K-250', 'K-251', 'K-252', 'K-253'];
const POISON = process.argv.includes('--poison');
const zipsArg = (process.argv.find((a) => a.startsWith('--zips=')) || '').slice(7);

const fails = [];
let total = 0;
for (const loc of LOCALES) {
  const f = path.join(ROOT, 'waves', `wave-ntr-${loc}.json`);
  if (!fs.existsSync(f)) { fails.push(`${loc}: no wave`); continue; }
  const w = JSON.parse(fs.readFileSync(f, 'utf8'));
  if (POISON && loc === 'de') w.levels['K-237'][3] = w.levels['K-237'][3].filter((c) => c.unit !== '7');
  if (w.indexable !== false) fails.push(`${loc}: wave is not indexable:false`);
  if (w.interactive !== false) fails.push(`${loc}: wave is not PDF only`);
  const k = w.levels['K-237'] || {};
  for (const lv of [1, 2, 3]) {
    const units = (k[lv] || []).map((c) => c.unit);
    for (const n of NUMBERS) if (!units.includes(n)) fails.push(`${loc}: K-237 level ${lv} has no page for ${n}`);
    const range = units.filter((u) => u == null).length;
    if (range !== (lv === 2 ? 0 : 1)) fails.push(`${loc}: K-237 level ${lv} has ${range} range pages`);
    if (units.length !== new Set(units.map(String)).size) fails.push(`${loc}: K-237 level ${lv} repeats a number`);
  }
  for (const id of FACES) {
    const l = w.levels[id] || {};
    for (const lv of [1, 3]) if ((l[lv] || []).length !== 1) fails.push(`${loc}: ${id} level ${lv} has ${(l[lv] || []).length} copies`);
    if ((l[2] || []).length) fails.push(`${loc}: ${id} rebuilds its published level 2`);
  }
  for (const [id, l] of Object.entries(w.levels)) {
    const copies = Object.values(l).flat().map((c) => c.copy);
    if (copies.length !== new Set(copies).size) fails.push(`${loc}: ${id} reuses a copy number`);
  }
  const n = Object.values(w.levels).flatMap((l) => Object.values(l).flat()).length;
  total += n;
  if (zipsArg) {
    const dir = path.join(ROOT, zipsArg, `wave-ntr-${loc}`);
    const zips = fs.existsSync(dir) ? fs.readdirSync(dir).filter((x) => x.endsWith('.zip')).length : 0;
    if (zips !== n) fails.push(`${loc}: ${zips} ZIPs for ${n} copies`);
  }
}
if (fails.length) {
  console.log(`FAIL ${fails.length}:\n  ` + fails.slice(0, 40).join('\n  '));
  process.exit(1);
}
console.log(`OK — ${total} copies, every number 0-20 at every level in all 11 locales, every range page at levels 1 and 3`);
