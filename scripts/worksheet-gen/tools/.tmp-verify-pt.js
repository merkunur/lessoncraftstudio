'use strict';
// GROUND TRUTH: emit the real description for each face with its REAL authored
// instruction and assert the instruction survives into it (no marker proxy).
const W = require('./.tmp-window-pt.js');
const draft = require('../i18n/.draft-b2var-pt.json');
let ok = 0; const bad = [];
for (const [id, s] of Object.entries(draft.types)) {
  const desc = W.desc(id, s.title, s.instruction);
  const core = s.instruction.replace(/\s*[.!?]+\s*$/, '');
  const survives = desc.indexOf(core) !== -1;
  const len = desc.length;
  if (survives) ok++; else bad.push(id + '  descLen=' + len + '  ' + desc);
  if (survives && (len < 120 || len > 170)) bad.push(id + '  OUT-OF-BAND descLen=' + len);
}
console.log('instruction survives:', ok, '/', Object.keys(draft.types).length);
bad.forEach((b) => console.log('  ' + b));
