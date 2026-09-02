'use strict';
const C = JSON.parse(require('fs').readFileSync(__dirname + '/.tmp-C-pt.json', 'utf8'));
const T = JSON.parse(require('fs').readFileSync(__dirname + '/.tmp-titles-pt.json', 'utf8'));
const I = JSON.parse(require('fs').readFileSync(__dirname + '/.tmp-instr-pt.json', 'utf8'));
let bad = 0;
for (const id of Object.keys(C)) {
  const hi = C[id].C - T[id].length, lo = C[id].lo;
  const cur = I[id].replace(/\s*[.!?]+\s*$/, '').length;
  const d = hi - cur;
  if (d !== 0) { bad++; console.log(id + '\thi=' + hi + '\tlo=' + lo + '\tcur=' + cur + '\t' + (d > 0 ? 'ADD ' + d : 'CUT ' + -d) + '\t' + I[id]); }
}
console.log('exact-at-hi:', Object.keys(C).length - bad, '/64');
