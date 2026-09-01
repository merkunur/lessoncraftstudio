/**
 * gen-var-waves.js — nt20-VAR wave files: 8 wave kinds × 11 locales.
 * All d2, seedEpoch 1. Theme-pinning happens via single-theme lists (the
 * round-robin cannot pin inside a multi-theme wave). No published
 * (variant-id, theme) pair is ever re-emitted: every variation has a fresh
 * type id, and the base-id fans use only themes the base never shipped.
 * fananim is NOT generated for fi until the fi animal partitives land
 * (G1-213 fi refuses non-fruits themes by design).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const LOCALES = ['en', 'de', 'es', 'fr', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

const CORE = [
  'K-249', 'K-250', 'K-251', 'K-252', 'K-253',
  'K-254', 'K-255', 'K-256', 'K-257', 'K-258',
  'K-259', 'K-260', 'K-261', 'K-262', 'K-263',
  'K-265', 'K-266', 'K-267', 'K-268', 'K-269',
  'K-273', 'K-274', 'K-275', 'K-276', 'K-277',
  'G1-214', 'G1-215', 'G1-216', 'G1-217', 'G1-218',
  'G1-219', 'G1-220', 'G1-221', 'G1-222',
  'G1-223', 'G1-224', 'G1-225', 'G1-226', 'G1-227',
  'G1-228', 'G1-229', 'G1-230', 'G1-231', 'G1-232',
  'G1-233', 'G1-234', 'G1-235', 'G1-236', 'G1-237',
  'G2-255', 'G2-256', 'G2-257', 'G2-258', 'G2-259',
  'G2-260', 'G2-263',
  'G2-264', 'G2-265', 'G2-266', 'G2-267', 'G2-268',
  'G2-269', 'G2-270', 'G2-271', 'G2-272', 'G2-273',
  'G3-359', 'G3-360', 'G3-361', 'G3-362', 'G3-363',
  'G3-364', 'G3-365', 'G3-366', 'G3-367', 'G3-368', 'G3-369',
];

const WAVES = [
  { kind: 'core', types: CORE, themes: [], themesPerType: 1 },
  { kind: 'deco', types: ['K-244', 'K-245', 'K-246', 'K-247', 'K-248', 'K-270', 'K-271', 'K-272'], themes: ['animals', 'fruits', 'vehicles', 'toys'], themesPerType: 1 },
  { kind: 'wp', types: ['G1-238', 'G1-239', 'G1-240', 'G1-241'], themes: ['fruits'], themesPerType: 1 },
  { kind: 'cap', types: ['G2-261', 'G2-262'], themes: ['vehicles'], themesPerType: 1 },
  { kind: 'fan240', types: ['K-240'], themes: ['vehicles', 'fruits', 'toys'], themesPerType: 3 },
  { kind: 'fan264', types: ['K-264'], themes: ['animals', 'vehicles'], themesPerType: 2 },
  { kind: 'fanmaze', types: ['K-242'], themes: ['animals', 'fruits'], themesPerType: 2 },
  { kind: 'fananim', types: ['G1-213', 'G2-252'], themes: ['animals'], themesPerType: 1, skipLocales: ['fi'] },
];

if (CORE.length !== 77) throw new Error('CORE count ' + CORE.length + ' != 77');

let n = 0;
for (const w of WAVES) {
  for (const loc of LOCALES) {
    if (w.skipLocales && w.skipLocales.includes(loc)) continue;
    const plan = {
      id: `wave-var-${w.kind}-${loc}`,
      seedEpoch: 1,
      locales: [loc],
      themes: w.themes,
      themesPerType: w.themesPerType,
      difficulties: [2],
      types: w.types,
    };
    fs.writeFileSync(path.join(ROOT, 'waves', `wave-var-${w.kind}-${loc}.json`), JSON.stringify(plan, null, 2) + '\n');
    n++;
  }
}
console.log(`gen-var-waves: wrote ${n} wave files`);
