#!/usr/bin/env node
/**
 * _clone-b7-spine.js — one-shot generator of the nt2-G (b7, the two flagship types) spine tools
 * from their nt5-F (b6) originals. Global b6→b7 + nt5-F→nt2-G + B6_→B7_ + C6→C7 substitution plus
 * the explicit FAMILIES / NEXT / NEW_FAMILIES / VALIDATORS literals (each asserted to hit) and the
 * face-count literals (b7 has TEN faces per family, not five: 2 bases + 20 faces = 22 types).
 * Run once at Phase A; the outputs are committed and maintained by hand. Refuses to overwrite.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const WG = path.join(__dirname, '..');
const REPO = path.join(WG, '..', '..');

// README / lock order (docs/worksheet-gen/b7-designs/README.md)
const LOCK = [
  ['K-395', 'find-the-differences', 'spatial-reasoning', '5-7', 'Find the Differences'],
  ['K-396', 'how-to-draw', 'spatial-reasoning', '5-7', 'How to Draw'],
];
const FAMILIES_JS = 'const FAMILIES = [' + LOCK.map(([id, k]) => `['${id}', '${k}']`).join(', ') + '];';
const FAMILY_IDS = 'const FAMILIES = [' + LOCK.map(([id]) => `'${id}'`).join(', ') + '];';
const NEW_FAMILIES = 'const NEW_FAMILIES = {\n' + LOCK.map(([id, k, s, a, n]) =>
  `  '${k}': { subject: '${s}', age: '${a}', name: '${n.replace(/'/g, "\'")}', id: '${id}' },`).join('\n') + '\n};';
const VALIDATORS = 'const VALIDATORS = {\n' + LOCK.map(([, k]) => `  '${k}': ['${k}', 'validateBank'],`).join('\n') + '\n};';

function batchify(s) {
  return s.split('nt5-F').join('nt2-G').split('B6_').join('B7_').split('b6').join('b7').split('C6 = require').join('C7 = require');
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

write('tools/gen-b7var-specs.js', batchify(replaceBlock(read('tools/gen-b6var-specs.js'), 'gen-var-specs', 'const FAMILIES = [', '];', FAMILIES_JS)));
{
  let s = replaceBlock(read('tools/alloc-b6var-ids.js'), 'alloc', 'const FAMILIES = [', '];', FAMILY_IDS);
  s = must(s, 'const NEXT = { K: 381, G1: 400, G2: 378, G3: 400 };', 'const NEXT = { K: 397, G1: 412, G2: 388, G3: 402 };', 'alloc');
  s = must(s, 'K-381+ · G1-400+ · G2-378+ · G3-400+', 'K-397+ · G1-412+ · G2-388+ · G3-402+', 'alloc');
  // String.raw: a shell heredoc once collapsed the backslashes here (the recorded Bash-tool trap)
  s = must(s, String.raw`/^### (F[1-6]|Face [1-6])\b/`, String.raw`/^### (F10|F[1-9]|Face 10|Face [1-9])\b/`, 'alloc');
  s = must(s, String.raw`/^### (F[1-6]|Face [1-6])\s*[:\-–]\s*/`, String.raw`/^### (F10|F[1-9]|Face 10|Face [1-9])\s*[:\-–]\s*/`, 'alloc');
  s = must(s, "heads.length !== 5) throw new Error(fam + ': expected 5 face headings", "heads.length !== 10) throw new Error(fam + ': expected 10 face headings", 'alloc');
  s = must(s, "out.length !== 25) throw new Error('expected 25 faces", "out.length !== 20) throw new Error('expected 20 faces", 'alloc');
  s = must(s, "'allocated 25 face ids:'", "'allocated 20 face ids:'", 'alloc');
  write('tools/alloc-b7var-ids.js', batchify(s));
}
write('lib/b7-common.js', batchify(read('lib/b6-common.js')));
write('templates/components-b7.js', batchify(read('templates/components-b6.js')));
write('templates/components-b7/_index.js', read('templates/components-b6/_index.js'));
write('tools/b7-probe-child.js', batchify(replaceBlock(read('tools/b6-probe-child.js'), 'probe', 'const VALIDATORS = {', '};', VALIDATORS)));
write('tools/validate-b7-draft.js', batchify(read('tools/validate-b6-draft.js')));
write('tools/apply-b7-locale.js', batchify(read('tools/apply-b6-locale.js')));
write('tools/check-b7-string-parity.js', batchify(read('tools/check-b6-string-parity.js')));
write('tools/gen-b7-waves.js', batchify(read('tools/gen-b6-waves.js')));
write('tools/gen-b7-probe-jobs.js', batchify(read('tools/gen-b6-probe-jobs.js')));
write('tools/gen-b7-faces-table.js', batchify(read('tools/gen-b6-faces-table.js')));
write('tools/register-b7-taxonomy.js', batchify(replaceBlock(read('tools/register-b6-taxonomy.js'), 'register', 'const NEW_FAMILIES = {', '};', NEW_FAMILIES)));
write('tools/b7-prepare-upload.js', batchify(read('tools/b6-prepare-upload.js')));
write('scripts/seo-landing/gen-b7-landings.js', batchify(read('scripts/seo-landing/gen-b6-landings.js', REPO)), REPO);
write('scripts/publish-cli/b7-publish-locale.sh', batchify(read('scripts/publish-cli/b6-publish-locale.sh', REPO)), REPO);
console.log('spine cloned. Hand edits next: every "5"/"25"/"30"/"five" face-count literal in the cloned files (grep), register-b7-en-content, validate-b7-draft test, gen-b7-landings TYPES/STANDARD, gen-b7-waves rulings, export-hub-expectations b7, lint-locale refusals, deploy.sh hub gate, b7-publish-locale.sh');
