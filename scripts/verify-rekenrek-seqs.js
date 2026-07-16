#!/usr/bin/env node
/* =====================================================================
   verify-rekenrek-seqs.js — build-gate for the Rekenrek sequence
   library (mini tools/rekenrek-seqs.json).

   MEASURED invariants (fix the data, never the gate):
     1. every sequence: unique id, band ∈ {k,g1,g2}, rows ∈ {1,2},
        3-6 steps, name + note complete across ALL 11 locales
     2. every step: racks array length ∈ {1,2,5,10}; every rod count
        (top/bottom) an integer 0-10; rows:1 sequences carry NO
        bottom > 0; multi-rack steps (racks > 2) carry NO bottom > 0
        (the wall is single-row by design)
     3. cover ∈ {full, half} when present; 'half' only where something
        hides: rows:2 OR racks.length > 1
     4. exactly ONE sequence has free:true and it is listed FIRST
   Exit 1 on any ERROR.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const file = path.join(__dirname, '..', 'mini tools', 'rekenrek-seqs.json');
const errors = [];
const E = (m) => errors.push(m);

let data;
try { data = JSON.parse(fs.readFileSync(file, 'utf8')); }
catch (e) { console.log('FAIL  parse: ' + e.message); process.exit(1); }

const seqs = data.sequences || [];
const ids = new Set();
let freeCount = 0;
let stepCount = 0;

seqs.forEach((s, si) => {
  const tag = s.id || `#${si}`;
  if (!s.id || ids.has(s.id)) E(`${tag}: missing/duplicate id`);
  ids.add(s.id);
  if (!['k', 'g1', 'g2'].includes(s.band)) E(`${tag}: bad band "${s.band}"`);
  if (s.rows !== 1 && s.rows !== 2) E(`${tag}: rows must be 1|2 (got ${s.rows})`);
  if (s.free) { freeCount++; if (si !== 0) E(`${tag}: the free starter must be listed FIRST`); }
  for (const field of ['name', 'note']) {
    for (const L of LOCALES) {
      const v = (s[field] || {})[L];
      if (!v || !String(v).trim()) E(`${tag}: ${field}.${L} missing/empty`);
    }
  }
  const steps = s.steps || [];
  if (steps.length < 3 || steps.length > 6) E(`${tag}: ${steps.length} steps (need 3-6)`);
  steps.forEach((st, i) => {
    const stag = `${tag}[${i}]`;
    stepCount++;
    const racks = st.racks || [];
    if (![1, 2, 5, 10].includes(racks.length)) E(`${stag}: racks length ${racks.length} (need 1|2|5|10)`);
    racks.forEach((r, ri) => {
      for (const rod of ['top', 'bottom']) {
        const v = r[rod];
        if (v === undefined) continue;
        if (!Number.isInteger(v) || v < 0 || v > 10) E(`${stag}.racks[${ri}].${rod}: ${v} out of 0-10`);
      }
      if (s.rows === 1 && (r.bottom || 0) > 0) E(`${stag}.racks[${ri}]: bottom beads in a rows:1 sequence`);
      if (racks.length > 2 && (r.bottom || 0) > 0) E(`${stag}.racks[${ri}]: bottom beads on the wall (single-row by design)`);
    });
    if (st.cover !== undefined) {
      if (!['full', 'half'].includes(st.cover)) E(`${stag}: bad cover "${st.cover}"`);
      if (st.cover === 'half' && s.rows !== 2 && racks.length <= 1) E(`${stag}: half-cover hides nothing on a 1-row single rack`);
    }
  });
});
if (freeCount !== 1) E(`free starter sequences: ${freeCount} (need exactly 1)`);

console.log(`${errors.length ? 'FAIL' : 'PASS'}  rekenrek seqs  (${seqs.length} sequences, ${stepCount} steps, ${errors.length} errors)`);
for (const e of errors) console.log('   ERROR ' + e);
process.exit(errors.length ? 1 : 0);
