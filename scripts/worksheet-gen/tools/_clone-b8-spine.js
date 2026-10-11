#!/usr/bin/env node
/**
 * _clone-b8-spine.js — one-shot generator of the b8 (Handmade Mazes, `maze-puzzles`) spine tools from their b7
 * originals (docs/worksheet-gen/b8-designs/README.md). Global b7→b8 / B7_→B8_ / nt2-G→b8 / C7→C8 substitution plus
 * the explicit FAMILIES / NEXT / NEW_FAMILIES / VALIDATORS literals (each asserted to hit) and the face-count
 * literals (b8 has ONE family with NINETEEN faces F2..F20: 1 base + 19 faces = 20 types).
 * Run once; the outputs are committed and maintained by hand. Refuses to overwrite.
 * The b7 family gates (qa/verify-b7-*.js) are NOT cloned: b8 has its own (qa/verify-b8-maze-puzzles.js).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const WG = path.join(__dirname, '..');
const REPO = path.join(WG, '..', '..');

const LOCK = [['K-405', 'maze-puzzles', 'spatial-reasoning', '5-7', 'Maze Puzzles']];
const FAMILIES_JS = 'const FAMILIES = [' + LOCK.map(([id, k]) => `['${id}', '${k}']`).join(', ') + '];';
const FAMILY_IDS = 'const FAMILIES = [' + LOCK.map(([id]) => `'${id}'`).join(', ') + '];';
const NEW_FAMILIES = 'const NEW_FAMILIES = {\n' + LOCK.map(([id, k, s, a, n]) =>
  `  '${k}': { subject: '${s}', age: '${a}', name: '${n}', id: '${id}' },`).join('\n') + '\n};';
const VALIDATORS = 'const VALIDATORS = {\n' + LOCK.map(([, k]) => `  '${k}': ['${k}', 'validateBank'],`).join('\n') + '\n};';

function batchify(s) {
  return s.split('nt2-G').join('b8').split('B7_').join('B8_').split('b7').join('b8').split('C7 = require').join('C8 = require');
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
  if (fs.existsSync(to)) { console.log('exists, kept:', rel); return; }
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.writeFileSync(to, s);
  console.log('wrote', rel);
}
const read = (rel, base = WG) => fs.readFileSync(path.join(base, rel), 'utf8');

write('tools/gen-b8var-specs.js', batchify(replaceBlock(read('tools/gen-b7var-specs.js'), 'gen-var-specs', 'const FAMILIES = [', '];', FAMILIES_JS)));
{
  let s = replaceBlock(read('tools/alloc-b7var-ids.js'), 'alloc', 'const FAMILIES = [', '];', FAMILY_IDS);
  s = must(s, 'const NEXT = { K: 397, G1: 412, G2: 388, G3: 402 };', 'const NEXT = { K: 406, G1: 420, G2: 392, G3: 402 };', 'alloc');
  s = must(s, 'K-397+ · G1-412+ · G2-388+ · G3-402+', 'K-406+ · G1-420+ · G2-392+ · G3-402+', 'alloc');
  // b8 face headings are "### F2 : …" … "### F20 : …" (the base is F1, not a heading)
  s = must(s, String.raw`/^### (F10|F[1-9]|Face 10|Face [1-9])\b/`, String.raw`/^### (F20|F1[0-9]|F[2-9])\b/`, 'alloc');
  s = must(s, String.raw`/^### (F10|F[1-9]|Face 10|Face [1-9])\s*[:\-–]\s*/`, String.raw`/^### (F20|F1[0-9]|F[2-9])\s*[:\-–]\s*/`, 'alloc');
  s = must(s, "heads.length !== 10) throw new Error(fam + ': expected 10 face headings", "heads.length !== 19) throw new Error(fam + ': expected 19 face headings", 'alloc');
  s = must(s, "out.length !== 20) throw new Error('expected 20 faces", "out.length !== 19) throw new Error('expected 19 faces", 'alloc');
  s = must(s, "'allocated 20 face ids:'", "'allocated 19 face ids:'", 'alloc');
  write('tools/alloc-b8var-ids.js', batchify(s));
}
write('lib/b8-common.js', batchify(read('lib/b7-common.js')));
write('tools/b8-probe-child.js', batchify(replaceBlock(read('tools/b7-probe-child.js'), 'probe', 'const VALIDATORS = {', '};', VALIDATORS)));
write('tools/validate-b8-draft.js', batchify(read('tools/validate-b7-draft.js')));
write('tools/apply-b8-locale.js', batchify(read('tools/apply-b7-locale.js')));
write('tools/check-b8-string-parity.js', batchify(read('tools/check-b7-string-parity.js')));
write('tools/gen-b8-waves.js', batchify(read('tools/gen-b7-waves.js')));
write('tools/gen-b8-probe-jobs.js', batchify(read('tools/gen-b7-probe-jobs.js')));
write('tools/gen-b8-faces-table.js', batchify(read('tools/gen-b7-faces-table.js')));
write('tools/register-b8-taxonomy.js', batchify(replaceBlock(read('tools/register-b7-taxonomy.js'), 'register', 'const NEW_FAMILIES = {', '};', NEW_FAMILIES)));
write('tools/b8-prepare-upload.js', batchify(read('tools/b7-prepare-upload.js')));
write('../seo-landing/gen-b8-landings.js', batchify(read('scripts/seo-landing/gen-b7-landings.js', REPO)));
write('../publish-cli/b8-publish-locale.sh', batchify(read('scripts/publish-cli/b7-publish-locale.sh', REPO)));
console.log('spine cloned. Hand edits next (grep each file for find-the-differences / how-to-draw / K-395 / K-396 / "10 faces"): apply-b8-locale, b8-probe-child, gen-b8var-specs, gen-b8-waves rulings, register-b8-taxonomy header, gen-b8-landings TYPES/STANDARD, b8-publish-locale.sh repoint types, export-hub-expectations b8, deploy.sh hub gate; NEW: qa/verify-b8-maze-puzzles.js, tools/check-b8-zips.js, tools/b8var-rows/maze-puzzles.js, tools/register-b8-en-content.js');
