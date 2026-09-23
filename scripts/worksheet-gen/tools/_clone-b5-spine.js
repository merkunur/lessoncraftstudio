#!/usr/bin/env node
/**
 * _clone-b5-spine.js — one-shot generator of the nt10-E (b5) spine tools from their
 * nt10-D (b4) originals (the b4 versions carry every fix the nt10-D build paid for).
 * The clone is a global b4→b5 + nt10-D→nt10-E + B4_→B5_ + C4→C5 substitution plus the
 * explicit FAMILIES / NEXT / NEW_FAMILIES / VALIDATORS literals (each asserted to hit).
 * Run once at Phase C; the outputs are committed and maintained by hand. Refuses to
 * overwrite. Family-specific parts (gen-b5-waves theme rulings, validate-b5-draft bank
 * rules + test, register-b5-en-content text, gen-b5-landings STANDARD map) are hand edits.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const WG = path.join(__dirname, '..');
const REPO = path.join(WG, '..', '..');

// README / lock order (docs/worksheet-gen/b5-designs/_PANEL-FINDINGS.md)
const LOCK = [
  ['K-368', '2d-shapes', 'math', '5-7', '2D Shapes'],
  ['K-369', 'road-safety', 'science', '5-7', 'Road Safety'],
  ['K-370', 'family', 'letters', '5-7', 'Family Members'],
  ['G1-376', 'plants', 'science', '6-8', 'Parts of a Plant'],
  ['G1-377', 'animal-life-cycles', 'science', '6-8', 'Animal Life Cycles'],
  ['G1-378', 'earth-and-space', 'science', '6-8', 'Sun, Earth and Moon'],
  ['G1-379', 'maps', 'spatial-reasoning', '6-8', 'Map Skills'],
  ['G1-380', 'digraphs', 'letters', '6-8', 'Digraphs'],
  ['G2-358', 'synonyms', 'letters', '7-9', 'Synonyms'],
  ['G2-359', 'word-parts', 'letters', '7-9', 'Word Families and Word Parts'],
];
const FAMILIES_JS = 'const FAMILIES = [' + LOCK.map(([id, k]) => `['${id}', '${k}']`).join(', ') + '];';
const FAMILY_IDS = 'const FAMILIES = [' + LOCK.map(([id]) => `'${id}'`).join(', ') + '];';
const NEW_FAMILIES = 'const NEW_FAMILIES = {\n' + LOCK.map(([id, k, s, a, n]) =>
  `  '${k}': { subject: '${s}', age: '${a}', name: '${n.replace(/'/g, "\\'")}', id: '${id}' },`).join('\n') + '\n};';
const VALIDATORS = 'const VALIDATORS = {\n' + LOCK.map(([, k]) => `  '${k}': ['${k}', 'validateBank'],`).join('\n') + '\n};';

function batchify(s) {
  return s.split('nt10-D').join('nt10-E').split('B4_').join('B5_').split('b4').join('b5').split('C4 = require').join('C5 = require');
}
function must(s, a, b, dst) {
  if (!s.includes(a)) throw new Error(dst + ': literal not found: ' + a.slice(0, 90));
  return s.split(a).join(b);
}
function replaceBlock(s, dst, startLit, endLit, replacement) {
  const i = s.indexOf(startLit); if (i < 0) throw new Error(dst + ': ' + startLit + ' not found');
  const j = s.indexOf(endLit, i) + endLit.length;
  return s.slice(0, i) + replacement + s.slice(j);
}
function write(rel, s, base = WG) {
  const to = path.join(base, rel);
  if (fs.existsSync(to)) throw new Error('refuse to overwrite ' + rel);
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.writeFileSync(to, s);
  console.log('wrote', rel);
}
const read = (rel, base = WG) => fs.readFileSync(path.join(base, rel), 'utf8');

// 1. gen-b5var-specs.js
write('tools/gen-b5var-specs.js', batchify(replaceBlock(read('tools/gen-b4var-specs.js'), 'gen-var-specs', 'const FAMILIES = [', '];', FAMILIES_JS)));
// 2. alloc-b5var-ids.js
{
  let s = replaceBlock(read('tools/alloc-b4var-ids.js'), 'alloc', 'const FAMILIES = [', '];', FAMILY_IDS);
  s = must(s, 'const NEXT = { K: 358, G1: 354, G2: 347, G3: 385 };', 'const NEXT = { K: 371, G1: 381, G2: 360, G3: 392 };', 'alloc');
  s = must(s, 'K-358+ · G1-354+ · G2-347+ · G3-385+', 'K-371+ · G1-381+ · G2-360+ · G3-392+', 'alloc');
  write('tools/alloc-b5var-ids.js', batchify(s));
}
// 3. lib/b5-common.js, barrel + index
write('lib/b5-common.js', batchify(read('lib/b4-common.js')));
write('templates/components-b5.js', batchify(read('templates/components-b4.js')));
write('templates/components-b5/_index.js', read('templates/components-b4/_index.js'));
// 4. probe child (VALIDATORS map) / validate / apply / parity
write('tools/b5-probe-child.js', batchify(replaceBlock(read('tools/b4-probe-child.js'), 'probe', 'const VALIDATORS = {', '};', VALIDATORS)));
write('tools/validate-b5-draft.js', batchify(read('tools/validate-b4-draft.js')));
write('tools/apply-b5-locale.js', batchify(read('tools/apply-b4-locale.js')));
write('tools/check-b5-string-parity.js', batchify(read('tools/check-b4-string-parity.js')));
// 5. waves / probe jobs / faces table
write('tools/gen-b5-waves.js', batchify(read('tools/gen-b4-waves.js')));
write('tools/gen-b5-probe-jobs.js', batchify(read('tools/gen-b4-probe-jobs.js')));
write('tools/gen-b5-faces-table.js', batchify(read('tools/gen-b4-faces-table.js')));
// 6. taxonomy registrar (NEW_FAMILIES) — the weather-symbols precedent comment stays as history
write('tools/register-b5-taxonomy.js', batchify(replaceBlock(read('tools/register-b4-taxonomy.js'), 'register', 'const NEW_FAMILIES = {', '};', NEW_FAMILIES)));
// 7. landing composer + publish script (hand edits follow: STANDARD map, LEVEL keys per face)
write('scripts/seo-landing/gen-b5-landings.js', batchify(read('scripts/seo-landing/gen-b4-landings.js', REPO)), REPO);
write('scripts/publish-cli/b5-publish-locale.sh', batchify(read('scripts/publish-cli/b4-publish-locale.sh', REPO)), REPO);
console.log('spine cloned. Hand edits next: gen-b5-waves theme rulings, validate-b5-draft bank rules + test, register-b5-en-content, gen-b5-landings TYPES/STANDARD, publish-readiness PATHS.b5, gate-variation-distinct b5, lint-locale refusals, deploy.sh 3rd hub gate');
