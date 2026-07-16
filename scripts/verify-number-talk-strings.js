#!/usr/bin/env node
/* =====================================================================
   verify-number-talk-strings.js — build-gate for the Number Talk Easel
   string library (mini tools/number-talk-easel-strings.json).

   MEASURED invariants (fix the data, never the gate):
     1. every string: unique id, band ∈ {k,g1,g2}, 3-5 items,
        name + note complete across ALL 11 locales (non-empty)
     2. every item: repr ∈ the 7 canonical reprs; qty inside the
        representation's LOCKED pedagogy range:
          random 1-6 · dice 2-10 · circular 3-10 · tenframe 3-10 ·
          doubletenframe 8-20 · rekenrek 1-20 · objects 6-12
        (objects >10 ONLY with a clustered arrangement groups/pairs)
     3. every item has an AUTHORED numeric seed (identical flash in
        every classroom); seeds unique across the library
     4. splits valid: tenframe split ≤ min(qty,10); doubletenframe
        split ≤ 10 AND split ≤ qty; rekenrek rows sum to qty, each ≤10
     5. objects items carry theme + noun from the VERIFIED pools
        (ten-frame-image-themes.json precedent: animals/fruits)
     6. exactly one string carries free:true (the starter, listed first)
   Exit 1 on any ERROR.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const RANGES = {
  random: [1, 6], dice: [2, 10], circular: [3, 10], tenframe: [3, 10],
  doubletenframe: [8, 20], rekenrek: [1, 20], objects: [6, 12],
};
const POOLS = {
  animals: ['cat', 'dog', 'duck', 'elephant', 'fish', 'fox', 'tiger'],
  fruits: ['apple', 'banana', 'cherry', 'lemon', 'orange', 'peach', 'pear', 'strawberry', 'watermelon'],
};

const file = path.join(__dirname, '..', 'mini tools', 'number-talk-easel-strings.json');
const errors = [];
const E = (m) => errors.push(m);

let data;
try { data = JSON.parse(fs.readFileSync(file, 'utf8')); }
catch (e) { console.log('FAIL  parse: ' + e.message); process.exit(1); }

const strings = data.strings || [];
const ids = new Set();
const seeds = new Set();
let freeCount = 0;

strings.forEach((s, si) => {
  const tag = s.id || `#${si}`;
  if (!s.id || ids.has(s.id)) E(`${tag}: missing/duplicate id`);
  ids.add(s.id);
  if (!['k', 'g1', 'g2'].includes(s.band)) E(`${tag}: bad band "${s.band}"`);
  if (s.free) { freeCount++; if (si !== 0) E(`${tag}: the free starter must be listed FIRST`); }
  for (const field of ['name', 'note']) {
    for (const L of LOCALES) {
      const v = (s[field] || {})[L];
      if (!v || !String(v).trim()) E(`${tag}: ${field}.${L} missing/empty`);
    }
  }
  const items = s.items || [];
  if (items.length < 3 || items.length > 5) E(`${tag}: ${items.length} items (need 3-5)`);
  items.forEach((it, ii) => {
    const itag = `${tag}[${ii}]`;
    const range = RANGES[it.repr];
    if (!range) { E(`${itag}: unknown repr "${it.repr}"`); return; }
    if (typeof it.qty !== 'number' || it.qty < range[0] || it.qty > range[1]) {
      E(`${itag}: qty ${it.qty} outside ${it.repr} range ${range[0]}-${range[1]}`);
    }
    if (it.repr === 'objects' && it.qty > 10 && !['groups', 'pairs'].includes(it.arrangement)) {
      E(`${itag}: objects qty ${it.qty} > 10 requires a clustered arrangement`);
    }
    if (typeof it.seed !== 'number') E(`${itag}: missing authored seed`);
    else if (seeds.has(it.seed)) E(`${itag}: duplicate seed ${it.seed}`);
    else seeds.add(it.seed);
    if (it.split !== undefined) {
      if (it.repr === 'tenframe' && (it.split > Math.min(it.qty, 10) || it.split < 0)) E(`${itag}: bad tenframe split ${it.split}`);
      if (it.repr === 'doubletenframe' && (it.split > 10 || it.split > it.qty)) E(`${itag}: bad doubletenframe split ${it.split}`);
    }
    if (it.rows !== undefined) {
      if (it.repr !== 'rekenrek') E(`${itag}: rows on non-rekenrek`);
      else {
        const sum = it.rows.reduce((a, b) => a + b, 0);
        if (sum !== it.qty) E(`${itag}: rows sum ${sum} ≠ qty ${it.qty}`);
        if (it.rows.some((r) => r < 0 || r > 10)) E(`${itag}: rekenrek row out of 0-10`);
        if (it.rows.length > 2) E(`${itag}: rekenrek has 2 rods`);
      }
    }
    if (it.groups !== undefined) {
      const gsum = it.groups.reduce((a, b) => a + b, 0);
      if (gsum !== it.qty) E(`${itag}: groups sum ${gsum} ≠ qty ${it.qty}`);
    }
    if (it.repr === 'objects') {
      if (!POOLS[it.theme]) E(`${itag}: theme "${it.theme}" not a verified pool`);
      else if (!POOLS[it.theme].includes(it.noun)) E(`${itag}: noun "${it.noun}" not in the verified ${it.theme} pool`);
    }
  });
});
if (freeCount !== 1) E(`free starter strings: ${freeCount} (need exactly 1)`);

console.log(`${errors.length ? 'FAIL' : 'PASS'}  number-talk strings  (${strings.length} strings, ${seeds.size} authored seeds, ${errors.length} errors)`);
for (const e of errors) console.log('   ERROR ' + e);
process.exit(errors.length ? 1 : 0);
