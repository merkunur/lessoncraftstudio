#!/usr/bin/env node
/* =====================================================================
   verify-ten-seat-wheel-core.js — the gate for THE TEN-SEAT WHEEL (#28,
   K.OA.A.4). Its own oracle: the design's tables written out again; the
   gate lever and the brake exhaustive over every wheel 2–10, every aboard
   group and every dial 1–9; the lurch checked against this file's own
   centre-of-mass sum (the empty arc must settle at the top); resting
   rotations over 10 000 seeds. Design §12 rules 1–8, plus order, help,
   pictures, strings and layout.
   Usage: node scripts/verify-ten-seat-wheel-core.js   (TW_CORE_DIR=<dir> for mutants)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const C = require(path.join(process.env.TW_CORE_DIR || MT, 'ten-seat-wheel-core.js'));
let ACT = null; try { ACT = require(path.join(MT, 'ten-seat-wheel-activity.js')); } catch (e) { ACT = null; }
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('   FAIL: ' + m); } };
const LOCALES = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const seeded = (a) => () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
const angDiff = (a, b) => Math.abs(((a - b) % 360 + 540) % 360 - 180);

/* the design's tables (§6): fill [n, aboard] · whole [a, b] */
const TABLE = {
  ten: [['F', 10, 7], ['F', 10, 4], ['F', 10, 9], ['F', 10, 2], ['F', 10, 6], ['F', 10, 5], ['F', 10, 8], ['F', 10, 3], ['F', 10, 1]],
  upto5: [['F', 5, 3], ['F', 4, 1], ['W', 2, 2], ['F', 5, 1], ['F', 3, 2], ['W', 3, 2], ['F', 5, 2], ['F', 4, 2]],
  six9: [['F', 6, 4], ['F', 7, 3], ['W', 5, 3], ['F', 8, 5], ['F', 9, 2], ['W', 4, 2], ['F', 9, 4], ['F', 7, 6], ['W', 6, 3]]
};
/* the oracle's balance: the screen angle of the centre of mass of a set of seats */
function massAngle(rot, n, seatsIdx) {
  let x = 0, y = 0;
  seatsIdx.forEach(i => { const a = (rot + i * 360 / n) * Math.PI / 180; x += Math.cos(a); y += Math.sin(a); });
  return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
}
const pool = {};
for (const lv of Object.keys(TABLE)) {
  const rs = C.rounds(lv); pool[lv] = rs;
  is(rs.length === TABLE[lv].length && rs.length >= 7, `${lv}: ${rs.length} rounds (design ${TABLE[lv].length}, ≥ 7)`);
  is(new Set(rs.map(r => r.id)).size === rs.length, `${lv}: round ids unique`);
  TABLE[lv].forEach((row, i) => {
    const r = rs[i]; if (!r) return;
    if (row[0] === 'F') {
      is(r.kind === 'fill' && r.n === row[1] && r.k === row[2] && r.answer === row[1] - row[2], `${lv}#${i + 1} fill ${r.n} aboard ${r.k}`);
      is(r.k >= 1 && r.answer >= 1 && r.answer <= 9, `${lv}#${i + 1}: ≥ 1 aboard, ≥ 1 seat empty, answer on the dial`);
    } else is(r.kind === 'whole' && r.a === row[1] && r.b === row[2] && r.n === row[1] + row[2] && r.answer === r.n, `${lv}#${i + 1} whole ${r.a}+${r.b}`);
    is([r.n, r.k, r.answer].concat(r.a ? [r.a, r.b] : []).every(x => x >= 1), `${lv}#${i + 1}: no 0`);
    is(C.promptKey(r) === (r.kind === 'whole' ? 'promptWhole' : (r.n === 10 ? 'promptFill10' : 'promptFill') + (r.k === 1 ? 'One' : '')), `${lv}#${i + 1}: prompt key (singular when 1 rider is on)`);
    /* the riders: two different kinds, never the RULINGS' near-twins together */
    const [p0, p1] = r.pair;
    is(p0 !== p1 && !(['chick', 'duck'].includes(p0) && ['chick', 'duck'].includes(p1)) && !(['lamb', 'sheep'].includes(p0) && ['lamb', 'sheep'].includes(p1)) && !r.pair.includes('chicken') && !r.pair.includes('duckling'), `${lv}#${i + 1}: riders ${p0} + ${p1}`);
  });
  /* 6: the dial starts at 5 — the answer in ≤ 1 round per level */
  is(rs.filter(r => r.kind === 'fill' && r.answer === C.DIAL_START).length <= 1, `${lv}: dial start = answer in ≤ 1 round`);
  const ans = rs.filter(r => r.kind === 'fill').map(r => r.answer), counts = {};
  ans.forEach(a => counts[a] = (counts[a] || 0) + 1);
  is(Object.values(counts).every(c => c <= 2), `${lv}: no answer more than twice (${ans})`);
}
const tenAns = pool.ten.map(r => r.answer).sort((a, b) => a - b).join();
is(tenAns === '1,2,3,4,5,6,7,8,9', `Make 10: every bond of ten once per pass (${tenAns})`);
is(C.level('x') === 'ten', 'unknown level → Make 10');
/* every picture exists on disk, colour theme only */
const picDir = path.join(ROOT, 'image-library-webp', 'themes', C.THEME);
is(!/bw/i.test(C.THEME), `theme "${C.THEME}" is a colour theme`);
C.PAIRS.forEach(p => p.forEach(k => is(fs.existsSync(path.join(picDir, k + '@2x.webp')), `picture ${C.THEME}/${k}@2x.webp exists`)));

/* ---- 1 + 3: the gate lever and the brake, exhaustive ---- */
for (let n = 2; n <= 10; n++) for (let k = 1; k < n; k++) for (let d = 1; d <= 9; d++) {
  const r = { level: 'x', kind: 'fill', n, k, answer: n - k, pair: ['cow', 'hen'], id: `t.${n}.${k}` };
  const st = C.newState(r, seeded(n * 100 + k * 10 + d));
  is(st.dial === 5 && st.boarded === 0 && st.extras === 0, `${n}/${k}: the dial starts at 5, nobody boarded`);
  is(C.release(st).state === 'empty' && st.misses === 0 && C.hint(st).key === 'hintDial', `${n}/${k}: the brake before boarding is not a miss`);
  C.setDial(st, d);
  is(st.dial === d, `${n}/${k}: dial ${d}`);
  const b = C.board(st);
  is(b.boarded === Math.min(d, n - k) && b.extras === Math.max(0, d - (n - k)), `${n}/${k}/${d}: boards ${Math.min(d, n - k)}, ${Math.max(0, d - (n - k))} on the edge`);
  is(C.filledCount(st) === Math.min(n, k + d), `${n}/${k}/${d}: seats filled`);
  /* the next empty seat (or the last filled) is at the bottom after boarding */
  is(angDiff(C.seatAngle(st.rot, Math.min(k + st.boarded, n) % n, n), 90) < 1e-6, `${n}/${k}/${d}: the boarding seat is at the bottom`);
  /* a starting rider can never be let off */
  for (let s = 0; s < k; s++) is(!C.letOff(st, s), `${n}/${k}/${d}: starting rider ${s + 1} stays`);
  const before = { boarded: st.boarded, extras: st.extras };
  const res = C.release(st);
  if (k + d === n) {
    is(res.state === 'full' && st.done && st.misses === 0, `${n}/${k}/${d}: a full wheel spins`);
  } else if (k + d > n) {
    is(res.state === 'over' && res.extras === k + d - n && !st.done && st.misses === 1, `${n}/${k}/${d}: too many → ${k + d - n} on the edge, the brake holds`);
    is(st.boarded === 0 && st.extras === 0 && C.filledCount(st) === k && st.dial === d, `${n}/${k}/${d}: after an over-call only the starting riders remain, the dial keeps ${d}`);
    is(C.hint(st).key === 'hintOver', `${n}/${k}/${d}: "Too many riders!"`);
    /* an over-call can never end in a spin: the brake again finds nobody boarded */
    const again = C.release(st); is(again.state === 'empty' && !st.done, `${n}/${k}/${d}: an over-call never spins`);
  } else {
    is(res.state === 'short' && res.empties === n - k - d && !st.done && st.misses === 1, `${n}/${k}/${d}: too few → ${n - k - d} empty`);
    /* 2: the lurch — the filled seats' centre of mass straight below the hub, the empty arc on top */
    const filled = [], empty = []; for (let i = 0; i < n; i++) (i < k + d ? filled : empty).push(i);
    is(angDiff(massAngle(st.rot, n, filled), 90) < 1, `${n}/${k}/${d}: filled seats settle below the hub (${massAngle(st.rot, n, filled).toFixed(1)}°)`);
    is(angDiff(massAngle(st.rot, n, empty), 270) < 1, `${n}/${k}/${d}: the empty seats settle at the top (${massAngle(st.rot, n, empty).toFixed(1)}°)`);
    is(C.hint(st).key === 'hintShort', `${n}/${k}/${d}: "There are still empty seats."`);
    /* a second miss: count on from the filled seats, the up arrow glows */
    C.board(st); C.release(st);
    is(st.help === 2 && C.arrowGlow(st) === 'up', `${n}/${k}/${d}: miss 2 → the up arrow glows`);
    const seq = C.countOnSeq(st);
    is(seq.join() === Array.from({ length: n - k - d }, (_, j) => k + d + j + 1).join(), `${n}/${k}/${d}: count on ${seq.join(', ')}`);
    is(C.hint(st).key === 'hintCountOn' && C.hint(st).seq === seq.join(', '), `${n}/${k}/${d}: "Count on: …"`);
    /* a move takes the help away */
    C.stepDial(st, d < 9 ? 1 : -1);
    is(st.help === 0 && !C.seatMarks(st) && C.hint(st) === null && C.arrowGlow(st) === null, `${n}/${k}/${d}: a move takes the help away`);
  }
  void before;
}
/* the over-call at miss 2 glows DOWN; letting a rider off resets the extras and the dial */
{ const r = { level: 'x', kind: 'fill', n: 10, k: 7, answer: 3, pair: ['cow', 'hen'], id: 'o' };
  const st = C.newState(r, seeded(4)); C.setDial(st, 6); C.board(st); C.release(st); C.board(st); C.release(st);
  is(st.help === 2 && C.arrowGlow(st) === 'down', 'over-call miss 2 → the down arrow glows');
  const s2 = C.newState(r, seeded(5)); C.setDial(s2, 2); C.board(s2);
  is(!C.letOff(s2, 1) && !C.letOff(s2, 9) && C.letOff(s2, 8) && s2.boarded === 1 && s2.dial === 1, 'only a boarded rider gets off; the dial follows');
  const s3 = C.newState(r, seeded(6)); C.setDial(s3, 5); C.board(s3);
  is(s3.extras === 2 && C.letOff(s3, 9) && s3.extras === 0 && s3.boarded === 2 && s3.dial === 2, 'letting a rider off clears the edge');
  const s4 = C.newState(r, seeded(7)); C.setDial(s4, 3); C.board(s4); C.setDial(s4, 1); C.board(s4);
  is(s4.boarded === 1 && s4.extras === 0, 'a lower dial sends riders back to the queue');
  is(!C.setDial(s4, 0) && !C.setDial(s4, 1) && s4.dial === 1 && C.setDial(s4, 12) && s4.dial === 9, 'the dial runs 1–9'); }

/* ---- 4: WHOLE ---- */
Object.values(pool).forEach(rs => rs.filter(r => r.kind === 'whole').forEach(r => {
  const st0 = C.newState(r, seeded(9));
  is(C.seats(st0).every(Boolean) && C.seats(st0).filter(s => s.kind === r.pair[0]).length === r.a, `${r.id}: every seat full, ${r.a} + ${r.b} in two kinds`);
  is(C.board(st0) === null && !C.setDial(st0, 3), `${r.id}: no gate in a WHOLE round`);
  is(C.release(st0).state === 'unset' && st0.misses === 0 && C.hint(st0).key === 'hintHub', `${r.id}: the brake before the hub is set is not a miss`);
  let rights = 0;
  for (let h = 2; h <= 10; h++) {
    const st = C.newState(r, seeded(h)); C.setHub(st, h);
    const res = C.release(st);
    if (res.state === 'wholeRight') { rights++; is(h === r.a + r.b && st.done, `${r.id}: only ${r.a + r.b} is right`); }
    else {
      is(res.state === 'wholeWrong' && st.misses === 1 && C.hint(st).key === 'hintWhole', `${r.id}: hub ${h} → "Count all the riders."`);
      C.release(st);
      const m = C.seatMarks(st);
      is(st.help === 2 && m && m.join() === Array.from({ length: r.n }, (_, j) => j + 1).join() && C.arrowGlow(st) === (h < r.n ? 'up' : 'down'), `${r.id}: hub ${h} miss 2 numbers every seat, arrow ${h < r.n ? 'up' : 'down'}`);
    }
  }
  is(rights === 1, `${r.id}: exactly one right whole`);
  const s1 = C.newState(r); C.stepHub(s1, 1); is(s1.hub === 6, `${r.id}: the hub's first touch starts from 5`);
}));

/* ---- 7: the resting rotation — the empty arc's screen angle is uniform ---- */
{ const r = pool.ten[0], rand = seeded(2026), bins = new Array(8).fill(0), N = 10000;
  for (let s = 0; s < N; s++) {
    const st = C.newState(r, rand), empty = []; for (let i = r.k; i < r.n; i++) empty.push(i);
    bins[Math.floor(massAngle(st.rot, r.n, empty) / 45) % 8]++;
  }
  is(bins.every(b => Math.abs(b - N / 8) <= 0.05 * N / 8 + 3 * Math.sqrt(N / 8)), `empty arc angle uniform over ${N} seeds (${bins.join('/')})`);
  const rots = new Set(); for (let s = 0; s < 50; s++) rots.add(C.newState(r, seeded(s)).rot); is(rots.size > 40, 'the resting rotation varies'); }

/* ---- order ---- */
for (const lv of Object.keys(TABLE)) {
  const P = pool[lv]; let prev = null; const seen = new Set();
  for (let s = 0; s < 300; s++) {
    const o = C.order(P, seeded(500 + s), prev);
    is(o.length === P.length && new Set(o).size === P.length, `${lv}: order is a permutation`);
    is(P[o[0]].kind === 'fill', `${lv}: a pass opens on a FILL round`);
    is(o.every((x, i) => i === 0 || !(P[x].kind === 'whole' && P[o[i - 1]].kind === 'whole')), `${lv}: no two WHOLE side by side`);
    if (prev) { is(o.join() !== prev.join(), `${lv}: never the same order twice`); is(o[0] !== prev[prev.length - 1], `${lv}: never the same seam`); }
    seen.add(o.join()); prev = o;
  }
  is(seen.size > 50, `${lv}: orders vary`);
  for (let s = 0; s < 20; s++) { const o1 = C.order(P, seeded(800 + s), null), o2 = C.order(P, seeded(800 + s), o1); is(o2.join() !== o1.join(), `${lv}: the same source cannot repeat the last pass`); }
  const r = P[P.length - 1];
  is(C.celebrateKey(r, true) === (lv === 'ten' ? 'celebrateTen' : r.kind === 'whole' ? 'celebrateWhole' : 'celebrateFill'), `${lv}: pass-end celebrate key`);
}

/* ---- free play ---- */
{ const st = C.newPlay(6);
  is(st.explore && st.n === 6 && st.k === 0, 'Fairground: a wheel of 6, nobody aboard');
  C.setSeats(st, 14); is(st.n === 10, 'at most 10 seats'); C.setSeats(st, 0); is(st.n === 2, 'at least 2');
  C.setSeats(st, 8); C.setDial(st, 5); C.board(st); let r = C.release(st);
  is(r.state === 'short' && st.misses === 0 && !st.done && C.hint(st) === null, 'Fairground: a short wheel lurches, nothing judged');
  C.setDial(st, 8); C.board(st); r = C.release(st); is(r.state === 'full' && !st.done, 'Fairground: a full wheel spins and play goes on');
  C.setDial(st, 9); C.board(st); r = C.release(st); is(r.state === 'over' && st.misses === 0, 'Fairground: too many, nothing judged'); }

/* ---- layout ---- */
for (const W of [272, 280, 296, 301, 312, 333, 336, 380, 519, 520, 620, 641, 648, 655, 656, 900]) {
  const L = C.layout(W);
  is(L.wheelW <= L.col, `layout ${W}: the wheel fits (${L.wheelW} ≤ ${L.col})`);
  const cup = L.gond.w - 10, chord = 2 * L.R * Math.sin(Math.PI / 10);
  is(cup <= chord, `layout ${W}: neighbouring gondolas never overlap on a 10-seat wheel (${cup} ≤ ${chord.toFixed(1)})`);
  is(L.rider >= (L.mode === 'wide' ? 96 : W >= 300 ? 64 : 56) && L.qRider >= L.rider, `layout ${W}: riders ${L.rider} px`);
  is(L.queue === (L.mode === 'wide' ? 3 : 2), `layout ${W}: the queue shows ${L.queue} — never its length`);
  is(L.arrow >= 48 && L.lever >= 48 && L.brake >= 48 && L.gond.w >= 62, `layout ${W}: real tap targets`);
  is(L.hub / 2 + 4 < L.R - L.gond.w / 2, `layout ${W}: the hub stays clear of the gondolas`);
}

/* ---- strings ×11 ---- */
if (ACT) {
  const S = ACT.strings, keys = Object.keys(S);
  keys.forEach(k => LOCALES.forEach(l => is(typeof S[k][l] === 'string' && S[k][l].trim().length, `string ${k}.${l}`)));
  const ph = (s) => (s.match(/\{\w+\}/g) || []).sort().join();
  keys.forEach(k => LOCALES.forEach(l => is(ph(S[k][l]) === ph(S[k].en), `${k}.${l} placeholders`)));
  const ban = /\b(free|gratis|kostenlos|gratuit|gratuito|gratuita|ilmai\w*)\b/i;
  keys.forEach(k => LOCALES.forEach(l => is(!ban.test(S[k][l]), `${k}.${l}: no "free"`)));
  keys.forEach(k => is(!/ [?!:;]/.test(S[k].fr) && !/ /.test(S[k].fr), `${k}.fr: U+202F before ? ! : ;`));
  keys.forEach(k => LOCALES.forEach(l => is(!/(?<![\d])0(?![\d])/.test(S[k][l].replace(/\{\w+\}/g, '')), `${k}.${l}: no lone 0`)));
  const need = new Set(['hintDial', 'hintHub', 'hintShort', 'hintOver', 'hintWhole', 'hintCountOn', 'celebrateTen']);
  Object.values(pool).forEach(rs => rs.forEach(r => { need.add(C.promptKey(r)); need.add(C.celebrateKey(r, false)); }));
  need.forEach(k => is(keys.includes(k), `string ${k} exists`));
  is(ACT.defaults.wheel === 'ten' && ACT.defaults.seatNums === 'off', 'defaults: Make 10, seat numbers off');
}

console.log(`verify-ten-seat-wheel-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
