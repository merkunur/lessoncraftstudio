'use strict';
const W = require('./.tmp-window-pt.js');
const draft = require('../i18n/.draft-b2var-pt.json');
const C = JSON.parse(require('fs').readFileSync(__dirname + '/.tmp-C-pt.json', 'utf8'));
let bad = 0;
console.log('id\ttitle\tinstrStripped\tneed(C-title)\tdelta');
for (const [id, s] of Object.entries(draft.types)) {
  const tl = s.title.length;
  const cur = s.instruction.replace(/\s*[.!?]+\s*$/, '').length;
  const need = C[id].C - tl;
  const d = need - cur;
  if (d !== 0) bad++;
  console.log([id, tl, cur, need, d > 0 ? '+' + d : d].join('\t'));
}
console.log('\nexact-fit:', 64 - bad, '/64');
