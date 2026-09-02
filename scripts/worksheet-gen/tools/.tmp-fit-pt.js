'use strict';
const W = require('./.tmp-window-pt.js');
const draft = require('../i18n/.draft-b2var-pt.json');
// window as a function of title length: pad the title to length L with 'x'
function winAt(id, titleLen) {
  const t = 'Titulo de teste padding aqui mais texto ainda mais texto'.slice(0, titleLen);
  const win = [];
  for (let L = 10; L <= 110; L++) {
    const mk = 'Xy'.repeat(60).slice(0, L);
    if (W.desc(id, t, mk + '.').indexOf(mk) !== -1) win.push(L);
  }
  return win.length ? [win[0], win[win.length - 1]] : null;
}
const rows = [];
for (const [id, s] of Object.entries(draft.types)) {
  const tl = s.title.length;
  const a = winAt(id, tl), b = winAt(id, tl - 10);
  rows.push({ id, tl, lo: a ? a[0] : null, hi: a ? a[1] : null,
    C: a ? a[1] + tl : null, slope: (a && b) ? (b[1] - a[1]) : null,
    cur: s.instruction.replace(/\s*[.!?]+\s*$/, '').length });
}
console.log('id\ttitleLen\tlo\thi\tC=hi+title\tslope(-10title)\tcur');
for (const r of rows) console.log([r.id, r.tl, r.lo, r.hi, r.C, r.slope, r.cur].join('\t'));
