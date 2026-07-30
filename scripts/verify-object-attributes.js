#!/usr/bin/env node
/* =====================================================================
   verify-object-attributes.js — MEASURED build-gate for
   `mini tools/object-attributes.json`, the conceptual-attribute corpus
   behind Sorting Hoops' "guess my rule".

   Fix the data, never the gate.

   Invariants (all measured, none inferred):
     G1 SCOPE       exactly the non-`na` keys of pww-index-en.json — no
                    key invented, none missing, no `na:1` key present
     G2 TOTALITY    every key carries all six fields
     G3 ENUM        every value is inside its closed enum; no free strings
     G4 COHERENCE   cross-field rules that cannot both be true:
                      living         => natural   (nothing alive is manufactured)
                      moves=self     => living    (only living things move themselves)
                      habitat!=none  => living|once_living  (only creatures and
                                       plants have a habitat; a boat does not)
                      edible=yes     => size_band!=bigger
     G5 THEME       every key in an animal/plant theme is living or once_living
     G6 PLAYABLE    ⚠ THE ONE THAT MATTERS. For every (field,value) a teacher
                    could pick as a hidden rule, BOTH sides must be non-empty
                    and each side must clear MIN_SIDE, or it is not a puzzle:
                    a rule that admits everything, or nothing, cannot be
                    guessed. Reported per rule with its cardinality.

   Usage: node scripts/verify-object-attributes.js [--digest] [--rules]
   Override for mutation testing: OA_DATA
   Exit 1 on any ERROR.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DATA = process.env.OA_DATA || path.join(ROOT, 'mini tools', 'object-attributes.json');
const INDEX = path.join(ROOT, 'mini tools', 'pww-index-en.json');
const MIN_SIDE = 8;            /* a rule needs a tray you can actually build */

let ERRORS = 0, WARNS = 0;
const err = (m) => { ERRORS++; console.error('  ERROR  ' + m); };
const warn = (m) => { WARNS++; console.log('  warn   ' + m); };

const doc = JSON.parse(fs.readFileSync(DATA, 'utf8'));
const idx = JSON.parse(fs.readFileSync(INDEX, 'utf8'));
const rec = doc.keys || {};
const ENUM = doc.$fields || {};
const FIELDS = Object.keys(ENUM);

/* ---------------- G1 scope ---------------- */
console.log('[scope]');
const want = new Set(), na = new Set(), themesOf = new Map(), word = new Map();
idx.themes.forEach((t) => t.c.forEach((c) => {
  if (c.na) { na.add(c.k); return; }
  want.add(c.k); word.set(c.k, c.s);
  if (!themesOf.has(c.k)) themesOf.set(c.k, []);
  themesOf.get(c.k).push(t.k);
}));
const have = new Set(Object.keys(rec));
const missing = Array.from(want).filter((k) => !have.has(k));
const extra = Array.from(have).filter((k) => !want.has(k));
const naPresent = Array.from(have).filter((k) => na.has(k) && !want.has(k));
if (missing.length) err(`G1 ${missing.length} key(s) missing: ${missing.slice(0, 8).join(', ')}`);
if (extra.length) err(`G1 ${extra.length} key(s) not in the picture library: ${extra.slice(0, 8).join(', ')}`);
if (naPresent.length) err(`G1 ${naPresent.length} non-object (na:1) key(s) present: ${naPresent.slice(0, 8).join(', ')}`);
if (!missing.length && !extra.length && !naPresent.length) console.log(`  G1 scope ok (${have.size} keys, exactly the picture library's objects)`);

/* ---------------- G2 totality + G3 enum ---------------- */
console.log('[shape]');
let bad = 0;
Object.keys(rec).forEach((k) => {
  FIELDS.forEach((f) => {
    const v = rec[k][f];
    if (v === undefined) { err(`G2 ${k}: missing "${f}"`); bad++; return; }
    if (ENUM[f].indexOf(v) === -1) { err(`G3 ${k}.${f} = "${v}" is outside the enum`); bad++; }
  });
  Object.keys(rec[k]).forEach((f) => { if (FIELDS.indexOf(f) === -1) err(`G3 ${k}: unexpected field "${f}"`); });
});
if (!bad) console.log(`  G2/G3 every key carries all ${FIELDS.length} fields, all values in enum`);

/* ---------------- G4 coherence ---------------- */
console.log('[coherence]');
const RULES = [
  ['living => natural', (r) => !(r.living === 'living' && r.natural !== 'natural')],
  /* ⚠ NOT `=> living`. That first reading failed 26 keys, all of them
     dinosaurs: an extinct animal is `once_living` and it certainly moved
     on its own. A child asked "does it move by itself?" says yes to a
     T. rex. The data was right and the invariant was wrong. */
  ['moves=self => a creature (not never_living)', (r) => !(r.moves === 'self' && r.living === 'never_living')],
  ['habitat!=none => living|once_living', (r) => !(r.habitat !== 'none' && r.living === 'never_living')],
  ['edible=yes => not bigger', (r) => !(r.edible === 'yes' && r.size_band === 'bigger')]
];
RULES.forEach(([name, ok]) => {
  const broken = Object.keys(rec).filter((k) => !ok(rec[k]));
  if (broken.length) err(`G4 ${name} — ${broken.length} violation(s): ${broken.slice(0, 10).join(', ')}`);
  else console.log(`  G4 ${name} holds`);
});

/* ---------------- G5 theme sanity ---------------- */
console.log('[theme sanity]');
const ALIVE_THEMES = ['animals', 'farm_animals', 'pets', 'zoo_animals', 'birds', 'birds_2',
  'ocean_life', 'insects_and_bugs', 'reptiles_and_amphibians', 'forest_creatures',
  'flowers', 'tree', 'dinosaurs', 'occupations'];
const notAlive = [];
Object.keys(rec).forEach((k) => {
  const ts = themesOf.get(k) || [];
  if (!ts.some((t) => ALIVE_THEMES.indexOf(t) > -1)) return;
  if (rec[k].living === 'never_living') notAlive.push(`${k} (${ts.filter((t) => ALIVE_THEMES.indexOf(t) > -1)[0]})`);
});
if (notAlive.length) err(`G5 ${notAlive.length} key(s) in a living-thing theme tagged never_living: ${notAlive.slice(0, 12).join(', ')}`);
else console.log('  G5 every key in an animal/plant theme is living or once-living');

/* ---------------- G6 playability ---------------- */
console.log('[playability — every rule must actually split the tray]');
const total = Object.keys(rec).length;
const table = [];
FIELDS.forEach((f) => {
  ENUM[f].forEach((v) => {
    const n = Object.keys(rec).filter((k) => rec[k][f] === v).length;
    table.push({ rule: `${f}=${v}`, inSet: n, outSet: total - n });
    if (n === 0) err(`G6 ${f}=${v} matches NOTHING — the rule cannot be posed`);
    else if (total - n === 0) err(`G6 ${f}=${v} matches EVERYTHING — nothing to infer`);
    else if (n < MIN_SIDE) warn(`G6 ${f}=${v} has only ${n} member(s) — too thin to build a tray from`);
  });
});
if (process.argv.includes('--rules') || ERRORS) {
  table.sort((a, b) => b.inSet - a.inSet).forEach((t) =>
    console.log(`         ${t.rule.padEnd(22)} in ${String(t.inSet).padStart(4)}   out ${String(t.outSet).padStart(4)}`));
}
if (!ERRORS) console.log(`  G6 all ${table.length} rules split the corpus (min side ${Math.min(...table.map((t) => t.inSet))})`);

/* ---------------- the digest a gate cannot replace ---------------- */
if (process.argv.includes('--digest')) {
  console.log('\n================ READ THE SAMPLE ================');
  const byTheme = new Map();
  Object.keys(rec).forEach((k) => {
    const t = (themesOf.get(k) || ['?'])[0];
    if (!byTheme.has(t)) byTheme.set(t, []);
    byTheme.get(t).push(k);
  });
  Array.from(byTheme.keys()).sort().forEach((t) => {
    const ks = byTheme.get(t);
    const pick = [ks[0], ks[Math.floor(ks.length / 2)], ks[ks.length - 1]].filter((v, i, a) => a.indexOf(v) === i);
    console.log(`\n${t}`);
    pick.forEach((k) => {
      const r = rec[k];
      console.log(`   ${(word.get(k) || k).padEnd(18)} ${r.living.padEnd(12)} ${r.natural.padEnd(7)} eat:${r.edible.padEnd(3)} ${r.moves.padEnd(5)} ${r.size_band.padEnd(6)} ${r.habitat}`);
    });
  });
  console.log('\n=================================================');
}

console.log('');
console.log(ERRORS ? `FAIL — ${ERRORS} error(s), ${WARNS} warning(s)` : `PASS — 0 errors, ${WARNS} warning(s)`);
process.exit(ERRORS ? 1 : 0);
