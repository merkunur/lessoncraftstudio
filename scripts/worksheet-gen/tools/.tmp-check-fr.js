'use strict';
const W = require('./.tmp-window-fr.js');
const { loadType } = require('../lib/load-types.js');
const draft = require('../i18n/.draft-b2var-fr.json');
let ok = 0; const bad = []; const rows = [];
for (const [id, s] of Object.entries(draft.types)) {
  const win = W.windowFor(id, s.title);
  const lo = win.length ? win[0] : null, hi = win.length ? win[win.length - 1] : null;
  const cur = s.instruction.replace(/\s*[.!?]+\s*$/, '').length;
  if (lo !== null && cur >= lo && cur <= hi) ok++; else bad.push([id, s.title.length, lo === null ? 'NONE' : lo + '-' + hi, cur].join('\t'));
  const dsc = W.desc(id, s.title, s.instruction);
  rows.push({ id, fam: loadType(id).exerciseType, len: dsc.length, has: dsc.indexOf(s.instruction.replace(/\s*[.!?]+\s*$/, '')) !== -1, dsc });
}
console.log('IN-WINDOW: ' + ok + ' / ' + Object.keys(draft.types).length);
bad.forEach((b) => console.log('  OUT ' + b));
console.log('desc <120:', rows.filter(r=>r.len<120).length, '| >170:', rows.filter(r=>r.len>170).length, '| dropped:', rows.filter(r=>!r.has).length);
const byFam = {}; rows.forEach(r => (byFam[r.fam] = byFam[r.fam] || []).push(r));
let dup = 0;
for (const rs of Object.values(byFam)) { const seen = new Map(); for (const r of rs) { if (seen.has(r.dsc)) { dup++; console.log('  DUP ' + r.id + '==' + seen.get(r.dsc)); } else seen.set(r.dsc, r.id); } }
console.log('duplicate descriptions within a family:', dup);
const g = rows.find(r => r.id === 'G2-281');
console.log('\nG2-281 (' + g.len + ') ' + g.dsc);
