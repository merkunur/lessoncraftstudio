#!/usr/bin/env node
/* =====================================================================
   verify-worth-till-core.js — ACTIVITY #164, The Worth Till (2.MD.C.8).
   Its OWN ground truth: the design's tables re-stated here in the design's
   own notation ("2x25+3x1"), every total / fewest set / yes-no split
   re-derived by this file, never read off the core. Then the model is
   driven: every coin × every cup in every family, every check verdict,
   the plan, the strings, the manifest row.
   WT_CORE / WT_ACT / WT_MANIFEST let mutate-worth-till.js aim it at a copy.
   Usage: node scripts/verify-worth-till-core.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');
const CORE_PATH = process.env.WT_CORE || path.join(ROOT, 'mini tools', 'worth-till-core.js');
const ACT_PATH = process.env.WT_ACT || path.join(ROOT, 'mini tools', 'worth-till-activity.js');
const MAN_PATH = process.env.WT_MANIFEST || path.join(ROOT, 'mini tools', 'coin-stall-activities.json');
const C = require(CORE_PATH);
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; if (fail < 60) console.log('  FAIL ' + m); } };
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const sum = (a) => a.reduce((s, x) => s + x, 0);
const desc = (a) => a.slice().sort((x, y) => y - x);
const parse = (s) => s.split('+').reduce((a, t) => { const m = t.trim().match(/^(?:(\d+)x)?(\d+)$/); return a.concat(Array(+(m[1] || 1)).fill(+m[2])); }, []);

/* ---------- A. the families: coins, sizes, cups ---------- */
const FAM = { en: 'USD', de: 'EURF', fr: 'EURF', it: 'EURF', nl: 'EURR', fi: 'EURR', es: 'MXN', pt: 'BRL', sv: 'SEK', da: 'DKK', no: 'NOK' };
const CUPS = { USD: [1, 5, 10, 25], EURF: [1, 2, 5, 10, 20, 50], EURR: [5, 10, 20, 50], MXN: [1, 2, 5, 10], BRL: [5, 10, 25, 50], SEK: [1, 2, 5, 10], DKK: [1, 2, 5, 10, 20], NOK: [1, 5, 10, 20] };
/* diameters (mm) from the design §4 */
const DIA = { USD: { 1: 19.05, 5: 21.21, 10: 17.91, 25: 24.26 }, EUR: { 1: 16.25, 2: 18.75, 5: 21.25, 10: 19.75, 20: 22.25, 50: 24.25, 100: 23.25, 200: 25.75 }, MXN: { 1: 21, 2: 23, 5: 25.5, 10: 28 }, BRL: { 5: 22, 10: 20, 25: 25, 50: 23, 100: 27 }, SEK: { 1: 19.5, 2: 22.5, 5: 23.75, 10: 20.5 }, DKK: { 1: 20.25, 2: 24.5, 5: 28.5, 10: 23.35, 20: 27 }, NOK: { 1: 21, 5: 26, 10: 24, 20: 27.5 } };
const HOLES = { DKK: [1, 2, 5], NOK: [1, 5] };
for (const l of LOCALES) ok(C.famOf(l) === FAM[l], 'A: ' + l + ' → ' + FAM[l]);
for (const f of Object.keys(CUPS)) {
  ok(C.MONEY[f].cups.join() === CUPS[f].join(), 'A: ' + f + ' cups ' + CUPS[f]);
  ok(C.cups(f).join() === desc(CUPS[f]).join(), 'A: ' + f + ' the till lays its cups out biggest worth first');
  const dt = DIA[f.startsWith('EUR') ? 'EUR' : f];
  for (const v of CUPS[f]) { const c = C.coin(f, v); ok(c && !c.note && c.d === dt[v], 'A: ' + f + ' ' + v + ' drawn at ' + dt[v] + ' mm'); ok(!!c && c.hole === (HOLES[f] || []).indexOf(v) >= 0, 'A: ' + f + ' ' + v + ' hole ' + ((HOLES[f] || []).indexOf(v) >= 0)); }
  /* the trap is real: a coin worth more that is SMALLER than one worth less (all but MXN) */
  let inv = false; for (const a of CUPS[f]) for (const b of CUPS[f]) if (a > b && dt[a] < dt[b]) inv = true;
  ok(inv === (f !== 'MXN'), 'A: ' + f + (f === 'MXN' ? ' coins grow with worth' : ' has a smaller coin worth more'));
}
ok(C.coin('USD', 10).reeded && C.coin('USD', 25).reeded && !C.coin('USD', 1).reeded && !C.coin('USD', 5).reeded, 'A: dime and quarter reeded, penny and nickel smooth');
ok(CUPS.EURR.indexOf(1) < 0 && CUPS.EURR.indexOf(2) < 0, 'A: nl/fi have no 1 c / 2 c');

/* ---------- B. level 1 — count (design §6, the design's own notation) ---------- */
const COUNT = {
  USD: ['4x10', '6x5', '2x25+3x1', '3x10+4x5', '25+2x10+3x1', '25+10+5+1', '2x25+10+2x5+2x1', '2x10+3x5+4x1'],
  EURF: ['4x10', '6x5', '2x20+3x1', '3x10+4x2', '50+2x10+3x1', '50+20+5+2', '50+20+10+2x5+2+1', '2x20+3x5+4x1'],
  EURR: ['4x10', '6x5', '2x20+3x5', '3x10+2x20', '50+2x10+5', '50+20+10+5', '2x20+10+3x5', '20+2x10+4x5'],
  MXN: ['4x2', '6x5', '2x10+3x1', '3x5+2x2', '10+2x5+3x2', '10+5+2+1', '2x10+5+2x2+2x1', '10+3x5+4x1'],
  BRL: ['4x10', '6x5', '2x25+3x5', '3x10+2x25', '50+2x10+5', '50+25+10+5', '2x25+2x10+3x5', '25+2x10+5x5'],
  SEK: ['4x2', '6x5', '2x10+3x1', '3x5+2x2', '10+2x5+2x2', '10+5+2+1', '2x10+5+2x2+2x1', '10+3x5+4x1'],
  DKK: ['4x2', '6x5', '2x20+3x1', '3x5+4x2', '20+2x5+3x1', '20+10+5+2', '20+10+2x5+2x2+1', '10+3x5+4x1'],
  NOK: ['4x10', '6x5', '2x20+3x1', '3x10+4x5', '20+2x5+3x1', '20+10+5+1', '20+10+2x5+2x1', '10+3x5+4x1']
};
const TOT = { USD: [40, 30, 53, 50, 48, 41, 72, 39], EURF: [40, 30, 43, 38, 73, 77, 93, 59], EURR: [40, 30, 55, 70, 75, 85, 65, 60], MXN: [8, 30, 23, 19, 26, 18, 31, 29], BRL: [40, 30, 65, 80, 75, 90, 85, 70], SEK: [8, 30, 23, 19, 24, 18, 31, 29], DKK: [8, 30, 43, 23, 33, 37, 45, 29], NOK: [40, 30, 43, 50, 33, 36, 42, 29] };
for (const f of Object.keys(COUNT)) {
  const rs = C.rounds(f, '1');
  ok(rs.length === 8, 'B: ' + f + ' 8 count rounds');
  COUNT[f].forEach((s, i) => {
    const want = parse(s);
    ok(sum(want) === TOT[f][i], 'B: ' + f + ' R' + (i + 1) + ' the design total ' + TOT[f][i] + ' = ' + s);
    ok(rs[i] && desc(rs[i].coins).join() === desc(want).join() && rs[i].total === sum(want), 'B: ' + f + ' R' + (i + 1) + ' coins ' + s);
    ok(want.length <= 9 && want.every((v) => CUPS[f].indexOf(v) >= 0 && v > 0), 'B: ' + f + ' R' + (i + 1) + ' ≤ 9 real coins, none 0');
  });
  ok(new Set(TOT[f]).size === 8, 'B: ' + f + ' totals distinct');
}

/* ---------- C. level 2 — pay (design §6) ---------- */
const P = (kind, price, purse, x) => Object.assign({ kind, price, purse: parse(purse) }, x || {});
const MS = [P('exact', 13, '10+1+2+5+1+2+1+5'), P('exact', 17, '10+5+2+1+5+2+10+1'), P('exact', 24, '10+10+2+2+5+1+5+1')];
const MSR = [P('fewest', 15, '10+5+5+2+2+1+10+1', { ans: '10+5' }), P('fewest', 16, '10+5+5+2+1+1+10+2', { ans: '10+5+1' }), P('trade', 10, '5+2+2+1+5+1+2+1'), P('trade', 5, '2+2+1+1+2+1+1+2'), P('two', 12, '10+2+5+5+1+1+2+1', { shown: '10+2' })];
const PAY = {
  USD: [P('exact', 30, '25+5+10+10+1+1+5+25'), P('exact', 41, '25+10+10+5+1+25+5+1'), P('exact', 16, '10+5+1+1+10+5+25+1'), P('fewest', 35, '25+10+10+5+1+25+5+1', { ans: '25+10' }), P('fewest', 30, '25+5+10+10+1+25+5+1', { ans: '25+5' }), P('trade', 25, '10+10+5+5+1+10+5+1'), P('trade', 10, '5+5+1+1+5+1+5+1'), P('two', 30, '10+10+10+25+5+5+1+1', { shown: '10+10+10' })],
  EURF: [P('exact', 30, '20+5+10+10+1+1+5+20'), P('exact', 41, '20+10+10+5+1+20+5+1'), P('exact', 16, '10+5+1+1+10+5+20+1'), P('fewest', 35, '20+10+10+5+5+20+5+1', { ans: '20+10+5' }), P('fewest', 30, '20+10+10+5+1+20+5+1', { ans: '20+10' }), P('trade', 50, '20+20+10+5+5+20+10+5'), P('trade', 10, '5+5+2+2+5+1+5+2'), P('two', 30, '10+10+10+20+5+5+2+1', { shown: '10+10+10' })],
  EURR: [P('exact', 30, '20+5+10+10+5+5+50+20'), P('exact', 45, '20+10+10+5+5+20+50+5'), P('exact', 65, '50+10+5+20+10+5+20+5'), P('fewest', 35, '20+10+10+5+5+20+50+5', { ans: '20+10+5' }), P('fewest', 70, '50+20+10+10+20+5+5+50', { ans: '50+20' }), P('trade', 50, '20+20+10+5+5+20+10+5'), P('trade', 20, '10+5+5+10+5+5+10+5'), P('two', 40, '20+20+10+10+5+5+50+10', { shown: '20+20' })],
  MXN: MS.concat(MSR), SEK: MS.concat(MSR),
  BRL: [P('exact', 30, '25+5+10+10+5+5+50+25'), P('exact', 60, '50+10+25+25+5+10+5+50'), P('exact', 85, '50+25+10+5+25+10+5+50'), P('fewest', 35, '25+10+10+5+5+25+50+5', { ans: '25+10' }), P('fewest', 75, '50+25+25+10+10+5+5+50', { ans: '50+25' }), P('trade', 50, '25+10+10+5+25+10+5+5'), P('trade', 25, '10+10+5+5+10+5+5+10'), P('two', 50, '25+25+10+10+5+5+50+10', { shown: '25+25' })],
  DKK: MS.concat([P('fewest', 25, '20+5+5+10+10+2+1+20', { ans: '20+5' }), P('fewest', 32, '20+10+10+5+5+2+2+1', { ans: '20+10+2' }), P('trade', 20, '10+5+5+2+2+1+10+5'), P('trade', 10, '5+2+2+1+5+1+2+1'), P('two', 30, '20+10+5+5+10+2+1+20', { shown: '20+10' })]),
  NOK: [P('exact', 16, '10+5+1+1+5+1+10+20'), P('exact', 27, '20+5+1+1+10+5+1+20'), P('exact', 35, '20+10+5+5+10+1+20+1'), P('fewest', 25, '20+5+5+10+10+1+1+20', { ans: '20+5' }), P('fewest', 31, '20+10+10+5+1+1+5+20', { ans: '20+10+1' }), P('trade', 20, '10+5+5+1+1+10+5+1'), P('trade', 10, '5+5+1+1+1+1+1+5'), P('two', 30, '20+10+5+5+10+1+1+20', { shown: '20+10' })]
};
/* every distinct sub-multiset of a purse that makes an amount */
const ways = (target, purse) => { const out = new Set(), n = purse.length; for (let m = 1; m < (1 << n); m++) { const p = []; for (let i = 0; i < n; i++) if (m & (1 << i)) p.push(purse[i]); if (sum(p) === target) out.add(desc(p).join('+')); } return [...out].map((s) => s.split('+').map(Number)); };
for (const f of Object.keys(PAY)) {
  const rs = C.rounds(f, '2');
  PAY[f].forEach((d, i) => {
    const r = rs[i], tag = 'C: ' + f + ' R' + (i + 1) + ' ' + d.kind + ' ' + d.price;
    ok(r && r.kind === d.kind && r.price === d.price && desc(r.purse).join() === desc(d.purse).join(), tag + ' as designed');
    ok(d.purse.every((v) => CUPS[f].indexOf(v) >= 0), tag + ': the purse holds only the family\'s coins');
    const w = ways(d.price, d.purse);
    if (d.kind === 'exact') ok(w.length >= 1, tag + ': payable from the purse');
    if (d.kind === 'fewest') {
      const min = Math.min(...w.map((x) => x.length)), mins = w.filter((x) => x.length === min);
      ok(mins.length === 1 && mins[0].join() === desc(parse(d.ans)).join(), tag + ': the unique fewest is ' + d.ans + ' (' + mins.map((x) => x.join('+')).join(' | ') + ')');
      ok(C.fewest(d.price, d.purse).join() === desc(parse(d.ans)).join(), tag + ': the core finds the same fewest');
      ok(w.some((x) => x.length > min), tag + ': a longer way exists (the fewest is a choice)');
    }
    if (d.kind === 'trade') { ok(d.purse.indexOf(d.price) < 0, tag + ': the purse never holds the offered coin'); ok(CUPS[f].indexOf(d.price) >= 0 && w.length >= 1, tag + ': the offered coin is a cup coin, and it can be changed'); ok(C.lidded(C.newState(f, '2', i), d.price), tag + ': its cup is lidded'); }
    if (d.kind === 'two') { const sh = parse(d.shown); ok(sum(sh) === d.price && r.shown && desc(r.shown).join() === desc(sh).join(), tag + ': Pip paid ' + d.shown); ok(w.some((x) => x.join() !== desc(sh).join()), tag + ': another way exists'); }
  });
}

/* ---------- D. level 3 — change, enough, which purse ---------- */
const THREE = {
  USD: { ch: [[70, 100], [30, 50]], en: [[35, '25+10'], [40, '25+10+1+1+1'], [50, '25+25+10'], [60, '25+10+10+10+1+1+1']], pu: [['8x1+2x5', '2x10', 'b'], ['3x10', '25', 'a']] },
  EURF: { ch: [[70, 100], [30, 50]], en: [[35, '20+10'], [40, '20+20'], [50, '50+2+1'], [60, '50+5+2+1']], pu: [['8x1+2x5', '2x10', 'b'], ['10+10+10+5', '20+10', 'a']] },
  EURR: { ch: [[70, 100], [35, 50]], en: [[35, '20+10'], [40, '20+20'], [50, '50+10'], [60, '50+5']], pu: [['6x5', '2x20', 'b'], ['4x10', '20+10', 'a']] },
  MXN: { ch: [[7, 10], [12, 20]], en: [[15, '10+5'], [18, '10+5+2'], [25, '10+10+5+2'], [30, '10+10+5+2+2']], pu: [['6x1+3x2', '10+5', 'b'], ['5+5+2', '10', 'a']] },
  BRL: { ch: [[70, 100], [25, 50]], en: [[35, '25+5'], [40, '25+10+5'], [50, '50+10+5'], [75, '50+10+10']], pu: [['7x5', '2x25', 'b'], ['25+25+10', '50', 'a']] },
  DKK: { ch: [[7, 10], [13, 20]], en: [[15, '10+5'], [23, '20+2'], [25, '20+5+2'], [40, '20+10+5+2+2']], pu: [['6x1+3x2', '20', 'b'], ['5+5+5+2', '10+5', 'a']] },
  NOK: { ch: [[7, 10], [12, 20]], en: [[15, '10+5'], [18, '10+5+1+1'], [25, '20+5+1+1'], [30, '20+5+1+1+1']], pu: [['9x1+2x5', '20', 'b'], ['5+5+5+1', '10+5', 'a']] }
};
THREE.SEK = THREE.MXN;
for (const f of Object.keys(THREE)) {
  const rs = C.rounds(f, '3'), T = THREE[f];
  ok(rs.length === 8 && rs.filter((r) => r.kind === 'change').length === 2 && rs.filter((r) => r.kind === 'enough').length === 4 && rs.filter((r) => r.kind === 'purse').length === 2, 'D: ' + f + ' 2 change + 4 enough + 2 purse');
  T.ch.forEach(([price, paid], i) => {
    const r = rs.filter((x) => x.kind === 'change')[i], want = paid - price, till = [].concat(...CUPS[f].map((v) => [v, v, v]));
    ok(r && r.price === price && r.paid === paid && sum(r.payWith) === paid, 'D: ' + f + ' change ' + price + ' paid ' + paid);
    ok(want > 0 && ways(want, till).length >= 1, 'D: ' + f + ' change ' + want + ' can be given from a till of 3 of each');
  });
  const ens = rs.filter((x) => x.kind === 'enough');
  let yes = 0, exact = 0;
  T.en.forEach(([price, purse], i) => {
    const p = parse(purse), s = sum(p), r = ens[i];
    ok(r && r.price === price && desc(r.purse).join() === desc(p).join(), 'D: ' + f + ' enough ' + price + ' vs ' + purse);
    if (s >= price) { yes++; if (s === price) exact++; } else ok(price - s >= 1 && price - s <= 5, 'D: ' + f + ' a "no" is a close call (' + (price - s) + ' short)');
    ok(C.answer(r) === (s >= price ? 'yes' : 'no'), 'D: ' + f + ' enough ' + price + ' answer ' + (s >= price ? 'yes' : 'no'));
  });
  ok(yes === 2 && exact === 1, 'D: ' + f + ' enough rounds: 2 yes (one exact), 2 no');
  const pus = rs.filter((x) => x.kind === 'purse');
  T.pu.forEach(([a, b, win], i) => {
    const A = parse(a), B = parse(b), r = pus[i];
    ok(r && desc(r.a).join() === desc(A).join() && desc(r.b).join() === desc(B).join() && C.answer(r) === win && (sum(A) > sum(B) ? 'a' : 'b') === win, 'D: ' + f + ' purse ' + a + ' vs ' + b + ' → ' + win);
  });
  ok(pus[0] && (C.answer(pus[0]) === 'a' ? pus[0].a : pus[0].b).length < (C.answer(pus[0]) === 'a' ? pus[0].b : pus[0].a).length, 'D: ' + f + ' R7: the purse with MORE coins loses');
  ok(pus[1] && (C.answer(pus[1]) === 'a' ? pus[1].a : pus[1].b).length > (C.answer(pus[1]) === 'a' ? pus[1].b : pus[1].a).length, 'D: ' + f + ' R8: the purse with more coins wins (fewer is not a rule)');
}

/* ---------- E. the till: every coin × every cup ---------- */
for (const f of Object.keys(CUPS)) for (const v of CUPS[f]) for (const cup of CUPS[f]) {
  const st = C.newState(f, '1', 0), c = { id: 99, v, home: 'counter', at: 'counter' }; st.coins.push(c);
  const r = C.drop(st, 99, cup);
  ok(v === cup ? (r.result === 'in' && c.at === 'till') : (r.result === 'bounce' && c.at === 'counter'), 'E: ' + f + ' a ' + v + ' into the ' + cup + ' cup → ' + (v === cup ? 'in' : 'bounce'));
}
{ const st = C.newState('USD', '1', 0), id = st.coins[0].id; C.drop(st, id, 5); const r2 = C.drop(st, id, 25); ok(!r2.ghost === false && st.bounces[id] === 2, 'E: a second bounce of the same coin turns its ghost on'); const r1 = C.drop(C.newState('USD', '1', 0), 0, 5); ok(!r1.ghost, 'E: one bounce shows no ghost'); }
{ const st = C.newState('USD', '1', 2), q = st.coins.find((c) => c.v === 25); C.drop(st, q.id, 25); ok(C.takeTop(st, 25).id === q.id && q.at === 'counter', 'E: tapping a cup lifts its top coin back to the counter'); ok(C.takeTop(st, 25) === null, 'E: an empty cup gives nothing'); }
{ const st = C.newState('USD', '2', 5); const r = C.drop(st, st.coins[0].id, 25); ok(r.result !== 'in', 'E: a trade round lids the offered coin\'s cup'); }
{ const st = C.newState('USD', '3', 0); ok(C.at(st, 'till').length === 12, 'E: a change round starts with a full till (3 of each)'); const c = C.takeTop(st, 25); ok(c && c.at === 'tray' && C.at(st, 'tray').join() === '25', 'E: change: a tapped cup gives its coin to the tray'); ok(C.trayBack(st, c.id) && c.at === 'till', 'E: a tray coin goes back into the till'); ok(C.drop(st, 0, 1).result === 'no', 'E: nothing is dropped in a change round'); }
ok(C.spin(C.newState('USD', '1', 0), 'o', -1) && (() => { const s = C.newState('USD', '1', 0); C.spin(s, 't', -1); return s.dial.t === 9; })(), 'E: the dial wheels wrap 0 → 9');

/* ---------- F. check: notes, misses, help, success ---------- */
const sortAll = (st) => st.coins.filter((c) => c.at === 'counter').forEach((c) => C.drop(st, c.id, c.v));
const setDial = (st, n) => { st.dial.t = Math.floor(n / 10); st.dial.o = n % 10; st.verdict = null; };
for (const f of Object.keys(CUPS)) C.rounds(f, '1').forEach((r, i) => {
  const st = C.newState(f, '1', i), tag = 'F: ' + f + ' count ' + r.total;
  ok(C.check(st).key === 'hintSortFirst' && st.misses === 0, tag + ': unsorted coins → hintSortFirst, no miss');
  sortAll(st);
  ok(C.check(st).key === 'hintDial' && st.misses === 0, tag + ': sorted, dial untouched → hintDial, no miss');
  setDial(st, r.total - 1); ok(C.check(st).result === 'miss' && C.hint(st) === 'hintCount', tag + ': one short → hintCount');
  ok(C.check(st).key === 'hintAgain' && st.misses === 1, tag + ': Check again unchanged → hintAgain, no second miss');
  setDial(st, r.total + 10 > 99 ? r.total - 2 : r.total + 10); C.check(st); ok(st.help && C.hint(st) === 'helpCount', tag + ': miss 2 → helpCount');
  const R = C.rail(st); ok(R.hideLast && R.rows[0].map((p) => p.v).join() === desc(r.coins).join() && R.rows[0][R.rows[0].length - 1].run === r.total, tag + ': the parade runs worth-first and ends on the total');
  setDial(st, r.total); ok(C.check(st).result === 'ok' && st.done && C.okKey(st) === 'okCount', tag + ': right → okCount');
});
const pay = (st, vals) => { const used = new Set(); vals.forEach((v) => { const c = st.coins.find((x) => x.v === v && (x.at === 'purse') && !used.has(x.id)); used.add(c.id); C.drop(st, c.id, v); }); };
for (const f of Object.keys(PAY)) PAY[f].forEach((d, i) => {
  const tag = 'F: ' + f + ' ' + d.kind + ' ' + d.price, w = ways(d.price, d.purse);
  let st = C.newState(f, '2', i);
  ok(C.check(st).key === 'hintPayFirst', tag + ': nothing paid → hintPayFirst');
  /* too much: the whole purse when it beats the price */
  if (sum(d.purse) > d.price) { st = C.newState(f, '2', i); pay(st, d.purse.filter((v) => !(d.kind === 'trade' && v === d.price))); const r = C.check(st); ok(r.why === 'over' && C.hint(st) === (d.kind === 'trade' ? 'hintTrade' : 'hintOver'), tag + ': too much → ' + (d.kind === 'trade' ? 'hintTrade' : 'hintOver')); }
  st = C.newState(f, '2', i); pay(st, [desc(d.purse).filter((v) => v < d.price).slice(-1)[0] || d.purse[0]]);
  if (sum(C.paid(st)) < d.price) { C.check(st); ok(st.verdict.why === 'under', tag + ': too little → under'); }
  if (d.kind === 'fewest') { const longer = w.filter((x) => x.length > C.fewest(d.price, d.purse).length)[0]; st = C.newState(f, '2', i); if (longer) pay(st, longer); ok(longer && C.check(st).why === 'fewer' && C.hint(st) === 'hintFewer', tag + ': right amount, more coins → hintFewer'); }
  if (d.kind === 'two') { st = C.newState(f, '2', i); pay(st, parse(d.shown)); ok(C.check(st).why === 'same' && C.hint(st) === 'hintSame', tag + ': the way Pip paid → hintSame'); }
  const right = d.kind === 'fewest' ? C.fewest(d.price, d.purse) : d.kind === 'two' ? w.find((x) => x.join() !== desc(parse(d.shown)).join()) : w[0];
  st = C.newState(f, '2', i); pay(st, right); ok(C.check(st).result === 'ok' && C.okKey(st) === { exact: 'okExact', fewest: 'okFewest', trade: 'okTrade', two: 'okTwo' }[d.kind], tag + ': ' + right.join('+') + ' → success');
});
for (const f of Object.keys(THREE)) C.rounds(f, '3').forEach((r, i) => {
  const tag = 'F: ' + f + ' ' + r.kind + ' R' + (i + 1);
  if (r.kind === 'change') {
    const want = r.paid - r.price, way = ways(want, [].concat(...CUPS[f].map((v) => [v, v, v])))[0];
    let st = C.newState(f, '3', i); ok(C.check(st).key === 'hintTrayFirst', tag + ': empty tray → hintTrayFirst');
    way.forEach((v) => C.takeTop(st, v)); ok(C.check(st).result === 'ok' && C.okKey(st) === 'okChange', tag + ': change ' + way.join('+') + ' → okChange');
    st = C.newState(f, '3', i); C.takeTop(st, desc(CUPS[f])[0]); const v1 = C.check(st);
    ok(v1.result === 'miss' && C.hint(st) === 'hintChangeMiss', tag + ': wrong change → hintChangeMiss');
    C.takeTop(st, CUPS[f][0]); C.check(st); ok(C.hint(st) === 'helpChange' && C.rail(st).start === r.price && C.rail(st).target === r.paid, tag + ': miss 2 counts up from the price to the payment');
  } else if (r.kind === 'enough') {
    let st = C.newState(f, '3', i); ok(C.check(st).key === 'hintChoose', tag + ': nothing chosen → hintChoose');
    const right = C.answer(r), wrong = right === 'yes' ? 'no' : 'yes';
    C.choose(st, wrong); ok(C.check(st).why === 'enough' && C.hint(st) === 'hintEnough', tag + ': wrong → hintEnough');
    C.choose(st, right); ok(C.check(st).result === 'ok' && C.okKey(st) === (right === 'yes' ? 'okYes' : 'okNo'), tag + ': right → ' + (right === 'yes' ? 'okYes' : 'okNo'));
  } else {
    for (const side of [0, 1]) {
      const st = C.newState(f, '3', i, side), winLeft = (C.answer(r) === 'a') === (side === 0);
      ok(C.check(st).key === 'hintPurseFirst', tag + ' side ' + side + ': nothing chosen → hintPurseFirst');
      C.choose(st, winLeft ? 'right' : 'left'); ok(C.check(st).why === 'purse', tag + ' side ' + side + ': the losing purse → hintPurse');
      C.choose(st, winLeft ? 'left' : 'right'); ok(C.check(st).result === 'ok', tag + ' side ' + side + ': the purse with more money wins wherever it sits');
    }
  }
});

/* ---------- G. the plan ---------- */
{ let seed = 7; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  for (const f of Object.keys(CUPS)) for (const lv of ['1', '2', '3']) {
    let prev = null;
    for (let p = 0; p < 30; p++) {
      const o = C.plan(f, lv, rnd, prev);
      ok(o.slice().sort().join() === '0,1,2,3,4,5,6,7', 'G: ' + f + ' L' + lv + ' a pass is every round once');
      if (prev) ok(o.join() !== prev.join(), 'G: ' + f + ' L' + lv + ' never the previous order');
      if (lv === '3') { const pool = C.rounds(f, '3'); ok(o.every((k, j) => !j || !(pool[k].kind === 'purse' && pool[o[j - 1]].kind === 'purse')), 'G: ' + f + ' the two purse rounds never side by side'); }
      prev = o;
    }
  } }

/* a stuck random source still gives a new, valid order */
for (const f of Object.keys(CUPS)) for (const lv of ['1', '2', '3']) {
  const fixed = () => 0.42, o1 = C.plan(f, lv, fixed, null), o2 = C.plan(f, lv, fixed, o1), pool = C.rounds(f, lv);
  ok(o2.join() !== o1.join() && o2.slice().sort().join() === '0,1,2,3,4,5,6,7' && o2.every((k, j) => !j || !(pool[k].kind === 'purse' && pool[o2[j - 1]].kind === 'purse')), 'G: ' + f + ' L' + lv + ' a stuck random source still gives a new valid order');
}

/* ---------- H. the activity: strings, faces, timing ---------- */
const SRC = fs.readFileSync(ACT_PATH, 'utf8');
const ctx = { window: {}, console, WorthTillCore: C }; vm.createContext(ctx); vm.runInContext(SRC, ctx);
const A = ctx.window.WorthTillActivity, STR = A.strings, keys = Object.keys(STR);
ok(keys.length >= 70 && keys.every((k) => LOCALES.every((l) => typeof STR[k][l] === 'string' && STR[k][l].length)), 'H: every string in all 11 locales');
const LIT = ['pCount', 'pExact', 'pFewest', 'pTrade', 'pTwo', 'pChange', 'pEnough', 'pPurse', 'hintSortFirst', 'hintDial', 'hintPayFirst', 'hintTrayFirst', 'hintChoose', 'hintPurseFirst', 'hintAgain', 'hintLid', 'hintCount', 'helpCount', 'hintOver', 'hintUnder', 'helpPay', 'hintFewer', 'hintSame', 'hintTrade', 'helpTrade', 'hintChangeMiss', 'helpChange', 'hintEnough', 'helpEnough', 'hintPurse', 'helpPurse', 'okCount', 'okExact', 'okFewest', 'okTrade', 'okTwo', 'okChange', 'okYes', 'okNo', 'okPurse', 'okPurseFew'];
ok(LIT.every((k) => STR[k]), 'H: every key the model names exists');
const CORE_SRC = fs.readFileSync(CORE_PATH, 'utf8');
ok(LIT.filter((k) => /^(hint|help|ok)/.test(k) && !/First$|^hintDial$|^hintAgain$|^hintLid$/.test(k)).every((k) => CORE_SRC.indexOf("'" + k + "'") >= 0), 'H: every hint / help / ok key is a literal in the core');
ok(keys.every((k) => !/ [?:!;]/.test(STR[k].fr)), 'H: fr uses U+202F before ? : ! ;');
ok(keys.every((k) => LOCALES.every((l) => !/\b(free|gratis|gratuit|gratuito|kostenlos|ilmai)/i.test(STR[k][l]))), 'H: nothing says "free"');
ok(/if \(loc !== 'en' \|\| opt\.ghost\)/.test(SRC), 'H: the US coins carry no numeral (only a ghost after two bounces)');
ok(/self\._coinSvg\(cv, Math\.round\(Math\.min\(30, c\.d \* g\.k \* 0\.4\)\)\)/.test(SRC), 'H: the key coin is the coin itself, never its numeral');
ok((SRC.match(/b\.style\.width = Math\.max\(44, px\) \+ 'px'; b\.style\.height = Math\.max\(44, px\) \+ 'px';/g) || []).length === 2, 'H: every loose coin and every tray coin is a ≥ 44 px target');
ok(/OK_MS: 500/.test(SRC) && /\.lcs-activity-check\{display:none !important;\}/.test(SRC) && /chk\.click\(\); \}, this\.OK_MS\)/.test(SRC), 'H: the shell\'s Check is hidden and pressed 0.5 s after success');
ok(/Math\.random\(\) < 0\.5 \? 1 : 0/.test(SRC), 'H: which purse sits left is drawn 50/50 per showing');
ok(!/<svg[^>]*role="img"/.test(SRC), 'H: no svg role="img"');
ok(/if \(!v\.rail \|\| st\.done\)/.test(SRC) && /v\.rail = st\.help \? 2 : 1/.test(SRC) && /nums = v\.rail >= 2/.test(SRC), 'H: the parade shows only after a miss, numbers only on miss 2');
/* money words per locale (the activity's own formatter, against this file's expectations) */
const fmt = (l, v) => { const o = Object.create(A); o.api = { lang: l, t: (k) => STR[k][l], settings: {} }; return o._money(v); };
const MW = { en: [[30, '30¢'], [100, '$1']], de: [[30, '30 ct'], [100, '1 €']], fr: [[30, '30 c'], [100, '1 €']], it: [[30, '30 cent'], [100, '1 euro']], nl: [[30, '30 cent'], [100, '1 euro']], fi: [[30, '30 snt'], [100, '1 €']], pt: [[30, '30 centavos'], [100, '1 real']], es: [[13, '$13']], sv: [[13, '13 kr']], no: [[13, '13 kr']], da: [[13, '13 kr.']] };
for (const l of Object.keys(MW)) for (const [v, s] of MW[l]) ok(fmt(l, v) === s, 'H: ' + l + ' writes ' + v + ' as «' + s + '» (got «' + fmt(l, v) + '»)');
{ const o = Object.create(A); o.api = { lang: 'da', t: (k) => STR[k].da, settings: {} }; ok(o._t('pExact', { price: '13 kr.' }).indexOf('kr..') < 0, 'H: da never writes «kr..»'); }
ok(!keys.some((k) => LOCALES.some((l) => /(^|[^\d])0(\s|¢|$)/.test(STR[k][l]))), 'H: no string names a 0');

ok(/^After a miss/.test(STR.instruction.en.split('. ').pop()), 'H: the instruction says the coins line up only after a miss (review, ×11)');
{ const o = Object.create(A); o.api = { lang: 'de', t: (k) => STR[k].de, settings: {} }; ok(o._coinName(10) === '10-ct-Münze', 'H: de couples the coin name (got «' + o._coinName(10) + '»)'); }

/* ---------- I. the manifest row ---------- */
const man = JSON.parse(fs.readFileSync(MAN_PATH, 'utf8')), row = man.find((x) => x.id === 'coin-stall.money.2-md-c-8');
ok(row && row.tool === 'worth-till-activity' && row.task_template === 'worth-till', 'I: the row points at the worth till');
ok(row && row.alignment.code === '2.MD.C.8', 'I: the alignment stays');
ok(row && LOCALES.every((l) => row.slug[l] && /^[a-z0-9-]+$/.test(row.slug[l]) && row.page_title[l] && row.page_intro[l]), 'I: the row ships in all 11 locales with url-safe slugs');
ok(row && row.slug.en === 'pips-market-stall' && row.slug.de === 'rechnen-mit-euro-und-cent-klasse-2', 'I: the shipped slugs are kept');

console.log(`verify-worth-till-core: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
