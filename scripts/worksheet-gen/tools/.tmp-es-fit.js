'use strict';
const S = require('./.tmp-window-es.js');
const P = JSON.parse(require('fs').readFileSync(process.argv[2], 'utf8'));
for (const [id, o] of Object.entries(P)) {
  const w = S.windowFor(id, o.title);
  const lo = w.length ? w[0] : null, hi = w.length ? w[w.length - 1] : null;
  const cur = o.instruction.replace(/\s*[.!?]+\s*$/, '').length;
  const ok = lo !== null && cur >= lo && cur <= hi;
  console.log(id.padEnd(7), 'T' + String(o.title.length).padStart(3), 'win ' + String(lo) + '-' + String(hi), 'cur ' + String(cur).padStart(3), ok ? 'OK' : 'FIX');
}
