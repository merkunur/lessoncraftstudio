#!/usr/bin/env node
/**
 * _clone-b9-spine.js — one-shot generator of the b9 (Picture Tracing, `picture-tracing`) spine tools from their b8
 * originals (docs/worksheet-gen/b9-designs/README.md). Global b8→b9 / B8_ / maze-puzzles→picture-tracing / K-405→K-418
 * substitution. b9 is PDF ONLY (no screen, no key): the interactive parts of each clone are removed BY HAND afterwards
 * (grep each output for trace-path / tap / interactive / mz- / screen / key). Run once; the outputs are committed and
 * maintained by hand. Refuses to overwrite.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const WG = path.join(__dirname, '..');
const REPO = path.join(WG, '..', '..');

function batchify(s) {
  return s.split('maze-puzzles').join('picture-tracing').split('Maze Puzzles').join('Picture Tracing')
    .split('MAZE_PUZZLES').join('PICTURE_TRACING').split('K-405').join('K-418')
    .split('B8_').join('B9_').split('b8').join('b9').split('C8 = require').join('C9 = require');
}
function write(rel, s, base = WG) {
  const to = path.join(base, rel);
  if (fs.existsSync(to)) { console.log('exists, kept:', rel); return; }
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.writeFileSync(to, s);
  console.log('wrote', rel);
}
const read = (rel, base = WG) => fs.readFileSync(path.join(base, rel), 'utf8');
const JOBS = [
  ['lib/b8-common.js', 'lib/b9-common.js'],
  ['tools/apply-b8-locale.js', 'tools/apply-b9-locale.js'],
  ['tools/validate-b8-draft.js', 'tools/validate-b9-draft.js'],
  ['tools/check-b8-string-parity.js', 'tools/check-b9-string-parity.js'],
  ['tools/gen-b8-waves.js', 'tools/gen-b9-waves.js'],
  ['tools/gen-b8var-specs.js', 'tools/gen-b9var-specs.js'],
  ['tools/alloc-b8var-ids.js', 'tools/alloc-b9var-ids.js'],
  ['tools/register-b8-taxonomy.js', 'tools/register-b9-taxonomy.js'],
  ['tools/register-b8-en-content.js', 'tools/register-b9-en-content.js'],
  ['tools/b8-prepare-upload.js', 'tools/b9-prepare-upload.js'],
  ['tools/check-b8-zips.js', 'tools/check-b9-zips.js'],
  ['tools/b8-draft-from-panel.js', 'tools/b9-draft-from-panel.js'],
  ['tools/gen-b8-faces-table.js', 'tools/gen-b9-faces-table.js'],
];
for (const [from, to] of JOBS) write(to, batchify(read(from)));
write('scripts/seo-landing/gen-b9-landings.js', batchify(read('scripts/seo-landing/gen-b8-landings.js', REPO)), REPO);
write('scripts/publish-cli/b9-publish-locale.sh', batchify(read('scripts/publish-cli/b8-publish-locale.sh', REPO)), REPO);
console.log('spine cloned. Hand edits next: remove every interactive part (trace-path, tap strings, screen, key);'
  + ' ids/NEXT in alloc-b9var-ids; the face count in gen-b9var-specs / alloc; check-b9-zips (no key, no screen);'
  + ' gen-b9-landings TYPES/STANDARD; b9-publish-locale.sh repoint type; export-hub-expectations b9; deploy.sh hub gate.');
