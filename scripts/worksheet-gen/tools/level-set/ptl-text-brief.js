#!/usr/bin/env node
/**
 * ptl-text-brief.js — the compact brief the native panels author the Picture Tracing Level Set text from
 * (out/ptl/_brief.json): per face its EN Level Set strings + every locale's PUBLISHED strings (the register and the
 * harvested head), per copy its EN name (+ EN instruction where the copy names its content), level and what the page traces.
 */
'use strict';
const fs = require('fs'); const path = require('path');
const { catalog, resolvePtx, MODE_OF } = require('../../lib/ptx.js');
const LS = require('../../data/ptx/text-ls.js');
const { PICTURE_TRACING } = require('../../data/b9/picture-tracing.js');
const LOCS = ['de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const bank = (loc) => (loc === 'en' ? PICTURE_TRACING.en : require('../../lib/b9-common.js').bank('picture-tracing', loc));
const noun = (src) => src.split('/')[1].replace(/_\d+$/, '').replace(/_/g, ' ');
const faces = {};
for (const [face, mode] of Object.entries(MODE_OF)) {
  faces[face] = { mode, en: { title: LS[mode].title.en, printTitle: LS[mode].printTitle && LS[mode].printTitle.en, instruction: LS[mode].instruction.en }, published: {} };
  for (const loc of ['en', ...LOCS]) { const s = bank(loc).strings[mode]; faces[face].published[loc] = { title: s.title, printTitle: s.printTitle, instruction: s.instruction }; }
}
const copies = [];
for (const e of catalog().values()) {
  const sc = resolvePtx(e.id, { words: e.words && e.words.en }).scene;
  const traced = [...new Set((sc.items || []).filter((i) => !i.render || ['guide', 'half', 'part'].includes(i.render)).map((i) => noun(i.src)))];
  copies.push({ unit: e.id, face: e.face, level: e.level, name: e.name.en, ...(e.instr ? { instr: e.instr.en } : {}), ...(e.words ? { words: e.words } : {}), traces: traced.join(', ') });
}
fs.writeFileSync(path.join(__dirname, '..', '..', 'out', 'ptl', '_brief.json'), JSON.stringify({ faces, copies }, null, 1));
console.log(Object.keys(faces).length + ' faces, ' + copies.length + ' copies → out/ptl/_brief.json');
