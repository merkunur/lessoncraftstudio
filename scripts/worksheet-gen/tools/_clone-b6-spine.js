#!/usr/bin/env node
/**
 * _clone-b6-spine.js — one-shot generator of the nt5-F (b6) spine tools from their
 * nt10-E (b5) originals (the b5 versions carry every fix the nt10-E build paid for).
 * The clone is a global b5→b6 + nt10-E→nt5-F + B5_→B6_ + C5→C6 substitution plus the
 * explicit FAMILIES / NEXT / NEW_FAMILIES / VALIDATORS literals (each asserted to hit).
 * Run once at Phase C; the outputs are committed and maintained by hand. Refuses to
 * overwrite. Family-specific parts (register-b6-en-content text, validate-b6-draft test,
 * gen-b6-landings STANDARD map, gen-b6-waves theme rulings) are hand edits.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const WG = path.join(__dirname, '..');
const REPO = path.join(WG, '..', '..');

// README / lock order (docs/worksheet-gen/b6-designs/_PANEL-FINDINGS.md)
const LOCK = [
  ['K-379', 'story-sequencing', 'letters', '5-7', 'Story Sequencing'],
  ['K-380', 'healthy-habits', 'science', '5-7', 'Healthy Habits and Hygiene'],
  ['G1-398', 'habitats', 'science', '6-8', 'Animal Habitats'],
  ['G1-399', 'sink-or-float', 'science', '6-8', 'Sink or Float'],
  ['G2-377', 'cursive-writing', 'letters', '7-9', 'Cursive Writing'],
];
const FAMILIES_JS = 'const FAMILIES = [' + LOCK.map(([id, k]) => `['${id}', '${k}']`).join(', ') + '];';
const FAMILY_IDS = 'const FAMILIES = [' + LOCK.map(([id]) => `'${id}'`).join(', ') + '];';
const NEW_FAMILIES = 'const NEW_FAMILIES = {\n' + LOCK.map(([id, k, s, a, n]) =>
  `  '${k}': { subject: '${s}', age: '${a}', name: '${n.replace(/'/g, "\\'")}', id: '${id}' },`).join('\n') + '\n};';
const VALIDATORS = 'const VALIDATORS = {\n' + LOCK.map(([, k]) => `  '${k}': ['${k}', 'validateBank'],`).join('\n') + '\n};';

function batchify(s) {
  return s.split('nt10-E').join('nt5-F').split('B5_').join('B6_').split('b5').join('b6').split('C5 = require').join('C6 = require');
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

write('tools/gen-b6var-specs.js', batchify(replaceBlock(read('tools/gen-b5var-specs.js'), 'gen-var-specs', 'const FAMILIES = [', '];', FAMILIES_JS)));
{
  let s = replaceBlock(read('tools/alloc-b5var-ids.js'), 'alloc', 'const FAMILIES = [', '];', FAMILY_IDS);
  s = must(s, 'const NEXT = { K: 371, G1: 381, G2: 360, G3: 392 };', 'const NEXT = { K: 381, G1: 400, G2: 378, G3: 400 };', 'alloc');
  s = must(s, 'K-371+ · G1-381+ · G2-360+ · G3-392+', 'K-381+ · G1-400+ · G2-378+ · G3-400+', 'alloc');
  write('tools/alloc-b6var-ids.js', batchify(s));
}
write('lib/b6-common.js', batchify(read('lib/b5-common.js')));
write('templates/components-b6.js', batchify(read('templates/components-b5.js')));
write('templates/components-b6/_index.js', read('templates/components-b5/_index.js'));
write('tools/b6-probe-child.js', batchify(replaceBlock(read('tools/b5-probe-child.js'), 'probe', 'const VALIDATORS = {', '};', VALIDATORS)));
write('tools/validate-b6-draft.js', batchify(read('tools/validate-b5-draft.js')));
write('tools/apply-b6-locale.js', batchify(read('tools/apply-b5-locale.js')));
write('tools/check-b6-string-parity.js', batchify(read('tools/check-b5-string-parity.js')));
write('tools/gen-b6-waves.js', batchify(read('tools/gen-b5-waves.js')));
write('tools/gen-b6-probe-jobs.js', batchify(read('tools/gen-b5-probe-jobs.js')));
write('tools/gen-b6-faces-table.js', batchify(read('tools/gen-b5-faces-table.js')));
write('tools/register-b6-taxonomy.js', batchify(replaceBlock(read('tools/register-b5-taxonomy.js'), 'register', 'const NEW_FAMILIES = {', '};', NEW_FAMILIES)));
write('scripts/seo-landing/gen-b6-landings.js', batchify(read('scripts/seo-landing/gen-b5-landings.js', REPO)), REPO);
write('scripts/publish-cli/b6-publish-locale.sh', batchify(read('scripts/publish-cli/b5-publish-locale.sh', REPO)), REPO);
console.log('spine cloned. Hand edits next: register-b6-en-content, validate-b6-draft test, gen-b6-landings TYPES/STANDARD, gen-b6-waves rulings, publish-readiness PATHS.b6, gate-variation-distinct b6, export-hub-expectations b6, lint-locale refusals, deploy.sh 4th hub gate, b6-publish-locale.sh chrome steps');
