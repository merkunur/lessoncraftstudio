#!/usr/bin/env node
/**
 * _clone-b4-spine.js — one-shot generator of the nt10-D (b4) spine tools from
 * their nt20-C (b3) originals. Measured 2026-09-21: every `b3` occurrence in the
 * cloned files is a batch marker (paths, env var, tool names, temp prefixes), so
 * the clone is a global b3→b4 + nt20-C→nt10-D + B3_→B4_ substitution plus the
 * explicit FAMILIES / NEXT / count literals (each asserted to hit). Run once at
 * Phase 0.3; the outputs are committed and maintained by hand. Refuses to
 * overwrite.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const WG = path.join(__dirname, '..');

const B4_FAMILIES_JS = `const FAMILIES = [['K-353', 'tangram'], ['K-354', 'human-body'], ['K-355', 'five-senses'], ['K-356', 'weather-symbols'], ['K-357', 'recycling'],
  ['G1-350', 'cloze'], ['G1-351', 'odd-and-even'], ['G1-352', 'pronouns'], ['G1-353', 'question-words'], ['G2-346', 'rounding']];`;
const B4_FAMILY_IDS = `const FAMILIES = ['K-353', 'K-354', 'K-355', 'K-356', 'K-357', 'G1-350', 'G1-351', 'G1-352', 'G1-353', 'G2-346'];`;

function batchify(s) {
  return s.split('nt20-C').join('nt10-D').split('B3_').join('B4_').split('b3').join('b4').split('C3 = require').join('C4 = require');
}
function must(s, a, b, dst) {
  if (!s.includes(a)) throw new Error(dst + ': literal not found: ' + a.slice(0, 90));
  return s.split(a).join(b);
}
function replaceFamilies(s, dst, replacement) {
  const i = s.indexOf('const FAMILIES = ['); if (i < 0) throw new Error(dst + ': FAMILIES not found');
  const j = s.indexOf('];', i) + 2;
  return s.slice(0, i) + replacement + s.slice(j);
}
function write(dst, s) {
  const to = path.join(WG, dst);
  if (fs.existsSync(to)) throw new Error('refuse to overwrite ' + dst);
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.writeFileSync(to, s);
  console.log('wrote', dst);
}
const read = (src) => fs.readFileSync(path.join(WG, src), 'utf8');

// 1. gen-b4var-specs.js
{ let s = replaceFamilies(read('tools/gen-b3var-specs.js'), 'gen-b4var-specs', B4_FAMILIES_JS); write('tools/gen-b4var-specs.js', batchify(s)); }
// 2. alloc-b4var-ids.js
{
  let s = replaceFamilies(read('tools/alloc-b3var-ids.js'), 'alloc-b4var-ids', B4_FAMILY_IDS);
  s = must(s, "const NEXT = { K: 325, G1: 311, G2: 320, G3: 378 };", "const NEXT = { K: 358, G1: 354, G2: 347, G3: 385 };", 'alloc');
  s = must(s, "out.length !== 100", "out.length !== 50", 'alloc');
  s = must(s, "'expected 100 faces, got '", "'expected 50 faces, got '", 'alloc');
  s = must(s, "'allocated 100 face ids:'", "'allocated 50 face ids:'", 'alloc');
  s = must(s, 'K-325+ · G1-311+ · G2-320+ · G3-378+', 'K-358+ · G1-354+ · G2-347+ · G3-385+', 'alloc');
  s = must(s, 'not exactly 100', 'not exactly 50', 'alloc');
  write('tools/alloc-b4var-ids.js', batchify(s));
}
// 3. lib/b4-common.js (drop ordinalFor: it was K-320-specific)
{
  let s = read('lib/b3-common.js');
  const a = s.indexOf('function ordinalFor('); const b = s.indexOf('function nfdBase(');
  if (a < 0 || b < 0) throw new Error('b3-common: ordinalFor/nfdBase not found');
  s = s.slice(0, a) + s.slice(b);
  s = must(s, "bank, bankModule, ordinalFor, nfdBase", "bank, bankModule, nfdBase", 'b4-common');
  write('lib/b4-common.js', batchify(s));
}
// 4. barrel + index
write('templates/components-b4.js', batchify(read('templates/components-b3.js')));
write('templates/components-b4/_index.js', read('templates/components-b3/_index.js'));
// 5. probe child / validate / apply
write('tools/b4-probe-child.js', batchify(read('tools/b3-probe-child.js')));
write('tools/validate-b4-draft.js', batchify(read('tools/validate-b3-draft.js')));
write('tools/apply-b4-locale.js', batchify(read('tools/apply-b3-locale.js')));
// 6. waves / probe jobs / faces table
{
  let s = must(read('tools/gen-b3-waves.js'), "bases.length !== 20 || faces.length !== 100", "bases.length !== 10 || faces.length !== 50", 'gen-waves');
  write('tools/gen-b4-waves.js', batchify(s));
}
write('tools/gen-b4-probe-jobs.js', batchify(read('tools/gen-b3-probe-jobs.js')));
write('tools/gen-b4-faces-table.js', batchify(read('tools/gen-b3-faces-table.js')));
console.log('spine cloned. Hand edits next: b4-probe-child VALIDATORS map, gen-b4-waves PREF/HARD, validate-b4-draft BANK_OF + test, publish-readiness PATHS.b4, gate-variation-distinct b4 branch, lint-locale refusals, verify-hub --expect');
