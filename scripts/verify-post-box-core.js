#!/usr/bin/env node
/* =====================================================================
   verify-post-box-core.js — the model gate for ACTIVITY #40, the Number
   Post Box (K.G.B.4). Its OWN oracle: corners are counted here by the turn
   of the direction at each vertex (atan2, independent of the core's cross
   product), a square / rectangle / rhombus is decided here from measured
   lengths and angles, and the rounds are re-typed from designs/040 §6.
   Every tile in every mode × level must fit exactly one door.
   Env PB_CORE_DIR = a directory holding a (mutated) post-box-core.js.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');
const DIR = process.env.PB_CORE_DIR || path.join(ROOT, 'mini tools');
const C = require(path.join(DIR, 'post-box-core.js'));
const L = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('  FAIL: ' + m); } };

/* ---------- the oracle ---------- */
const turnAt = (p, i) => { const n = p.length, a = p[(i - 1 + n) % n], b = p[i], c = p[(i + 1) % n]; let d = Math.atan2(c[1] - b[1], c[0] - b[0]) - Math.atan2(b[1] - a[1], b[0] - a[0]); while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI; return d; };
const realCorners = (p) => p.filter((_, i) => Math.abs(turnAt(p, i)) > 1e-6);
const len = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const near = (a, b) => Math.abs(a - b) <= 0.01 * Math.max(a, b);
function oracle(key) {
  const s = C.shapeOf(key); if (!s) return null;
  if (s.open != null || s.curve != null) return { sides: null };
  const p = realCorners(s.verts), n = p.length, Ls = p.map((q, i) => len(q, p[(i + 1) % n])), right = p.every((_, i) => Math.abs(Math.abs(turnAt(p, i)) - Math.PI / 2) < 0.02);
  const eqAll = Ls.every(x => near(x, Ls[0])), opp = n === 4 && near(Ls[0], Ls[2]) && near(Ls[1], Ls[3]);
  return { sides: n, sq: n === 4 && eqAll && right, rect: n === 4 && opp && right, rhom: n === 4 && eqAll };
}
const SIDES = { T1: 3, T2: 3, T3: 3, T4: 3, Q1: 4, Q2: 4, Q3: 4, Q4: 4, Q5: 4, Q6: 4, P1: 5, P2: 5, P3: 5, H1: 6, H2: 6, S7: 7, S7b: 7, O8: 8, O8b: 8 };
/* would this door take this shape? (the oracle's own rule) */
function takes(door, key) {
  const o = oracle(key); if (!o || o.sides == null) return false;
  if (typeof door === 'number') return o.sides === door;
  return { tri: o.sides === 3, sq: o.sq, rect: o.rect, rhom: o.rhom, pent: o.sides === 5, hex: o.sides === 6, hept: o.sides === 7, oct: o.sides === 8 }[door];
}

/* 1. the catalogue */
Object.keys(SIDES).forEach(k => { is(oracle(k).sides === SIDES[k], `${k}: ${SIDES[k]} sides (oracle)`); is(C.sidesOf(C.shapeOf(k)) === SIDES[k], `${k}: the core counts ${SIDES[k]} sides`); });
is(oracle('Q1').sq && oracle('Q1').rect && oracle('Q1').rhom, 'Q1 is a square (and so a rectangle and a rhombus)');
is(oracle('Q2').rect && !oracle('Q2').sq && oracle('Q6').rect && !oracle('Q6').sq, 'Q2 and Q6 are rectangles, not squares');
is(oracle('Q4').rhom && !oracle('Q4').rect, 'Q4 is a rhombus, not a rectangle');
is(!oracle('Q3').rect && !oracle('Q3').rhom && !oracle('Q5').rect && !oracle('Q5').rhom, 'Q3 and Q5 are neither');
is(C.kindOf(C.shapeOf('Q3')) === 'trap' && C.kindOf(C.shapeOf('Q5')) === 'quad' && C.kindOf(C.shapeOf('Q4')) === 'rhom' && C.kindOf(C.shapeOf('Q1')) === 'sq', 'kinds: trapezoid, quadrilateral, rhombus, square');
['N-open3', 'N-curve3', 'N-open4', 'N-curve4'].forEach(k => is(C.sidesOf(C.shapeOf(k)) === null, `${k}: not a polygon (open or curved)`));
is(C.sidesOf({ verts: [[0, 0], [50, 0], [100, 0], [100, 100], [0, 100]], open: null, curve: null }) === 4, 'a vertex on a straight side is not a corner (4, not 5)');
Object.keys(C.CAT).forEach(k => { const p = C.CAT[k]; let neg = 0, pos = 0; p.forEach((_, i) => { const t = turnAt(p, i); if (t > 1e-9) pos++; if (t < -1e-9) neg++; }); is(!pos || !neg, `${k}: convex`); });

/* 2. the doors: every shape × every door */
const DOORS = [3, 4, 5, 6, 7, 8, 'tri', 'sq', 'rect', 'rhom', 'pent', 'hex', 'hept', 'oct'];
Object.keys(C.CAT).forEach(k => DOORS.forEach(d => {
  const o = C.offer(C.shapeOf(k), d), want = takes(d, k);
  is((o.result === 'fit') === want, `${k} at door ${d}: ${want ? 'fits' : 'bounces'} (${o.result})`);
  const m = typeof d === 'number' ? d : C.NAMED[d];
  if (m > SIDES[k]) is(o.result === 'tooMany' && o.diff === m - SIDES[k], `${k} at ${d}: too many by ${m - SIDES[k]}`);
  if (m < SIDES[k]) is(o.result === 'tooFew' && o.diff === SIDES[k] - m, `${k} at ${d}: too few by ${SIDES[k] - m}`);
}));
is(C.offer(C.shapeOf('N-open3'), 'tri').result === 'open' && C.offer(C.shapeOf('N-open4'), 4).result === 'open', 'an open figure falls apart at any door');
is(C.offer(C.shapeOf('N-curve3'), 'tri').result === 'curve' && C.offer(C.shapeOf('N-curve4'), 'sq').result === 'curve', 'a curved side takes no stick');
is(C.offer(C.shapeOf('N-long'), 'sq').result === 'lengths', 'the long rectangle at the square door: the lengths');
is(C.offer(C.shapeOf('N-skew'), 'sq').result === 'corners' && C.offer(C.shapeOf('N-skew'), 'rect').result === 'corners', 'the rhombus at the square or rectangle door: the corners');
is(C.offer(C.shapeOf('Q3'), 'rect').result === 'lengths' && C.offer(C.shapeOf('Q5'), 'rect').result === 'lengths', 'a trapezoid or a lopsided four-sider at the rectangle door: the lengths');
is(C.fits(C.shapeOf('Q1'), 'rect') && C.fits(C.shapeOf('Q1'), 'rhom'), 'a square fits the rectangle door and the rhombus door — the box never teaches a falsehood');
is(C.offer(C.shapeOf('N-4for3'), 'tri').result === 'tooFew' && C.offer(C.shapeOf('N-5for4'), 'sq').result === 'tooFew', 'four sides at a triangle door, five at a square door: too few sticks');

/* 3. the rounds, re-typed from §6 */
const CF = [['T1', 0, 3], ['Q2', 20, 4], ['P1', 36, 5], ['H1', 30, 6], ['T3', 90, 3], ['Q1', 45, 4], ['P2', 180, 5], ['H2', 15, 6], ['Q3', 160, 4]];
const CM = [['T4', 25, 3], ['Q4', 0, 4], ['P3', 200, 5], ['O8', 22, 8], ['S7', 10, 7], ['H2', 75, 6], ['Q5', 300, 4], ['S7b', 140, 7], ['O8b', 60, 8]];
[['first', CF, '3,4,5,6'], ['more', CM, '3,4,5,6,7,8']].forEach(([lv, tab, doors]) => {
  const R = C.rounds('count', lv);
  is(R.length === 9, `count ${lv}: nine rounds`);
  R.forEach((r, i) => { is(r.tiles[0].key === tab[i][0] && r.tiles[0].turn === tab[i][1] && r.answer === tab[i][2] && r.doors.join() === doors, `${r.id}: ${tab[i][0]} at ${tab[i][1]}° → ${tab[i][2]}, doors ${doors} in numeral order`); });
});
is(C.rounds('count', 'first').map(r => r.answer).sort().join() === '3,3,4,4,4,5,5,6,6', 'count first: answers 3×2, 4×3, 5×2, 6×2');
const SR = [['3,4,5', 'T1 T2 Q1 Q3 P1 P2'], ['4,5,6', 'Q2 Q4 P3 P1 H1 H2'], ['3,4,6', 'T3 T4 Q5 Q1 H2 H1'], ['3,5,6', 'T2 T1 P2 P3 H1 H2'], ['3,4,5', 'T4 T3 Q4 Q2 P3 P2'], ['4,5,6', 'Q3 Q5 P1 P2 H2 H1'], ['3,4,6', 'T1 T3 Q2 Q4 H1 H2'], ['3,5,6', 'T4 T2 P1 P3 H2 H1'], ['3,4,5', 'T3 T1 Q5 Q3 P2 P1']];
C.rounds('sort', 'first').forEach((r, i) => is(r.doors.join() === SR[i][0] && r.tiles.map(t => t.key).join(' ') === SR[i][1], `${r.id}: doors and tiles of §6`));
const SMORE = { 0: [6, 'H1', 'H2'], 4: [6, 'H1', 'H2'], 8: [6, 'H1', 'H2'], 1: [7, 'S7', 'S7b'], 5: [7, 'S7', 'S7b'], 2: [5, 'P1', 'P3'], 6: [5, 'P1', 'P3'], 3: [8, 'O8', 'O8b'], 7: [8, 'O8', 'O8b'] };
C.rounds('sort', 'more').forEach((r, i) => { const m = SMORE[i]; is(r.doors.length === 4 && r.doors.includes(m[0]) && r.tiles.length === 8 && r.tiles.slice(-2).map(t => t.key).join() === m[1] + ',' + m[2], `${r.id}: a fourth door ${m[0]} with ${m[1]}, ${m[2]}`); is(r.doors.join() === r.doors.slice().sort((a, b) => a - b).join(), `${r.id}: doors in numeral order`); });
const RT = ['tri', 'sq', 'rect', 'tri', 'sq', 'rect', 'tri', 'sq', 'rect'], RREAL = [2, 1, 2, 3, 2, 1, 1, 3, 2];
['first', 'more'].forEach(lv => C.rounds('real', lv).forEach((r, i) => {
  is(r.target === RT[i] && r.doors.join() === RT[i], `${r.id}: one door, the ${RT[i]}`);
  const real = r.tiles.filter(t => takes(r.target, t.key));
  is(real.length === RREAL[i] && real.length >= 1 && real.length <= 3, `${r.id}: ${RREAL[i]} real tiles (1–3)`);
  is(r.tiles.every(t => C.isReal(r, t) === takes(r.target, t.key)), `${r.id}: the core's real set is the oracle's`);
  if (r.target === 'rect') is(!r.tiles.some(t => oracle(t.key).sq), `${r.id}: no square in a rectangle round`);
  is(r.tiles.length === (lv === 'more' ? 6 : 5), `${r.id}: ${lv === 'more' ? 6 : 5} tiles`);
  if (lv === 'more') is(/N-curve/.test(r.tiles[r.tiles.length - 1].key), `${r.id}: the riddle level adds a curved near-miss`);
}));
['first', 'more'].forEach(lv => C.rounds('name', lv).forEach(r => {
  is(!(r.doors.includes('sq') && r.doors.includes('rect')), `${r.id}: never the square and the rectangle doors together`);
  if (r.doors.includes('rhom')) is(!r.tiles.some(t => oracle(t.key).sq), `${r.id}: a rhombus door never meets a square`);
  is(r.doors.length === (lv === 'more' ? 4 : 3) && r.tiles.length === (lv === 'more' ? 7 : 5), `${r.id}: ${lv === 'more' ? '4 doors, 7' : '3 doors, 5'} tiles`);
}));
/* every tile in every mode × level fits exactly one door, and every door takes at least one tile */
C.MODES.forEach(md => C.LEVELS.forEach(lv => C.rounds(md, lv).forEach(r => {
  if (md === 'real') return;
  r.tiles.forEach(t => is(r.doors.filter(d => takes(d, t.key)).length === 1, `${r.id} ${t.key}: exactly one door takes it`));
  if (md !== 'count') r.doors.forEach(d => is(r.tiles.some(t => takes(d, t.key)), `${r.id}: door ${d} is an answer`));
  is(r.tiles.every(t => C.rightDoor(r, t) === r.doors.find(d => takes(d, t.key))), `${r.id}: the core's right doors are the oracle's`);
})));
is(C.MODES.every(md => C.LEVELS.every(lv => C.rounds(md, lv).length >= 9)), 'nine or more rounds in every mode × level');
is(C.rounds('count', 'first').concat(C.rounds('count', 'more')).every(r => r.answer >= 3), 'no 0 anywhere: every answer is 3 or more');

/* 4. the deal: slots shuffled, turns distinct, doors in name mode shuffled */
let x = 77; const rnd = () => { x = (x * 1103515245 + 12345) % 2147483648; return x / 2147483648; };
['sort', 'real', 'name'].forEach(md => {
  const r = C.rounds(md, 'first')[0], n = r.tiles.length, N = 2000, hits = Array(n).fill(0), realIds = r.tiles.filter(t => C.isReal(r, t)).map(t => t.id);
  const target = md === 'real' ? realIds.length / n : null;
  for (let i = 0; i < N; i++) { const st = C.newState(r, rnd); st.slots.forEach((id, k) => { if (md === 'real' ? realIds.includes(id) : id === 't0') hits[k]++; }); }
  const want = md === 'real' ? target : 1 / n;
  is(hits.every(h => Math.abs(h / N - want) <= 0.05), `${md}: every tray slot is uniform within ±5 % (${hits.map(h => (h / N).toFixed(2)).join(' ')})`);
});
C.MODES.filter(m => m !== 'count').forEach(md => C.rounds(md, 'first').forEach(r => { const st = C.newState(r, rnd), tt = st.tiles.filter(t => r.tiles.find(q => q.id === t.id).turn == null).map(t => t.turn); is(new Set(tt).size === tt.length, `${r.id}: no two dealt turns alike on one tray`); }));
{ const r = C.rounds('name', 'first')[0], seen = new Set(); for (let i = 0; i < 50; i++) seen.add(C.newState(r, rnd).doors.join()); is(seen.size >= 4, `name: the door order is shuffled per deal (${seen.size} orders)`); }
{ const r = C.rounds('sort', 'first')[0], st = C.newState(r, null), st2 = C.newState(r, null); is(st.slots.join() === st2.slots.join() && st.slots.slice().sort().join() === r.tiles.map(t => t.id).sort().join(), 'no rnd: the same seeded deal twice, a permutation of the tray (a test can force it)'); }
is(C.rounds('count', 'first').every(r => { const st = C.newState(r, rnd); return st.doors.join() === r.doors.join(); }), 'count: doors stay in numeral order');

/* 5. order */
C.MODES.forEach(md => { const pool = C.rounds(md, 'first'); let bad = 0, same = 0, three = 0, prev = null; for (let i = 0; i < 2000; i++) { const o = C.order(pool, rnd, prev); if (o.slice().sort((a, b) => a - b).join() !== pool.map((_, j) => j).join()) bad++; if (prev && o.join() === prev.join()) same++; for (let q = 2; q < o.length; q++) { const a = pool[o[q]].answer; if (a != null && a === pool[o[q - 1]].answer && a === pool[o[q - 2]].answer) three++; } prev = o; } is(bad === 0 && same === 0 && three === 0, `${md}: fresh permutations, never the same answer three rounds running`); });
is(C.mode('x') === 'count' && C.level('x') === 'first', 'defaults: count, first shapes');

/* 6. count state */
(function () {
  const r = C.rounds('count', 'first')[1], st = C.newState(r, null), id = st.tiles[0].id;
  is(C.check(st).check === 'count' && C.hint(st) === 'hintStart' && st.misses === 0, 'Check before any offer: "try a door" — not a miss');
  is(C.plantPeg(st, 0) === 'plant' && C.plantPeg(st, 1) === 'plant' && st.pegs.join() === '0,1', 'pegs go on in order');
  is(C.plantPeg(st, 0) === 'wiggle' && st.pegs.length === 2, 'tapping an earlier peg only wiggles it');
  is(C.plantPeg(st, 1) === 'lift' && st.pegs.join() === '0', 'tapping the last peg lifts it');
  is(C.plantPeg(st, 9) === null && C.liftPeg(st) && st.pegs.length === 0, 'no peg off the shape; Backspace lifts the last');
  const o1 = C.post(st, id, 3); is(o1.result === 'tooFew' && st.bounces === 1 && st.help === 0, 'one bounce: no help yet');
  C.post(st, id, 5); is(st.bounces === 2 && st.help === 1 && C.hint(st) === 'hintCount1', 'second bounce: "count each side once"');
  C.post(st, id, 6); C.post(st, id, 3); is(st.bounces === 4 && st.help === 2 && C.hint(st) === 'hintCount2', 'fourth bounce: "the last peg tells"');
  const t0 = st.tiles[0].turn; is(C.spin(st, id) && st.tiles[0].turn === (t0 + 45) % 360, 'a spin turns the shape 45°');
  is(C.post(st, id, 4).result === 'fit' && st.done && st.posted.join() === id, 'the right door: posted, the round is done');
  is(C.post(st, id, 4) === null && C.plantPeg(st, 0) === null, 'after the post nothing more');
})();

/* 7. tray state */
(function () {
  const r = C.rounds('sort', 'first')[0], st = C.newState(r, null);
  is(C.check(st).check === 'start' && C.hint(st) === 'hintStartTray' && st.misses === 0, 'Check before any offer: "pick up a shape" — not a miss');
  const t = st.tiles[0], wrong = r.doors.find(d => !takes(d, t.key)), right = r.doors.find(d => takes(d, t.key));
  is(C.post(st, t.id, wrong).result !== 'fit' && !t.posted && st.misses === 0, 'a wrong door bounces — free');
  is(C.post(st, t.id, right).result === 'fit' && t.posted, 'the right door posts it');
  is(C.post(st, 'nope', right) === null && C.post(st, t.id, right) === null && C.post(st, st.tiles[1].id, 99) === null, 'no unknown tile, no posted tile, no door that is not here');
  is(C.check(st).check === 'left' && st.misses === 1 && st.help === 1 && C.hint(st) === 'hintTray1' && st.show, 'Check with shapes left: miss 1');
  const u = st.tiles.find(q => !q.posted); C.post(st, u.id, r.doors.find(d => !takes(d, u.key)));
  is(!st.show && st.help === 1, 'a new offer takes the showing away, not the help');
  C.check(st); is(st.misses === 2 && st.help === 2 && C.hint(st) === 'hintTray2', 'miss 2: "count the sides of the shapes that wobble"');
  st.tiles.filter(q => !q.posted).forEach(q => C.post(st, q.id, r.doors.find(d => takes(d, q.key))));
  is(C.check(st).check === 'ok' && st.done, 'every shape through its door: done');
  const rr = C.rounds('real', 'first')[1], s2 = C.newState(rr, null);
  s2.tiles.filter(q => !C.isReal(rr, q)).forEach(q => is(C.post(s2, q.id, 'sq').result !== 'fit', `real ${q.key}: the square door refuses it`));
  s2.tiles.filter(q => C.isReal(rr, q)).forEach(q => C.post(s2, q.id, 'sq'));
  is(C.check(s2).check === 'ok' && s2.done, 'real: every real square posted, the near-misses left on the tray — done');
})();

/* 8. strings */
const ctx = { window: {}, PostBoxCore: C }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'mini tools', 'post-box-activity.js'), 'utf8') + '\n;this.__A = PostBoxActivity;', ctx);
const A = ctx.__A, S = A.strings, SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'post-box-activity.js'), 'utf8');
const CORE_SRC = fs.readFileSync(path.join(DIR, 'post-box-core.js'), 'utf8').replace(/\r\n/g, '\n');
const code = SRC.slice(SRC.indexOf('/*STRINGS-END*/')) + CORE_SRC.slice(CORE_SRC.indexOf('function hint(st)'), CORE_SRC.indexOf('/* order-only'));
is(/'resTooMany'/.test(code) && /'hintTray2'/.test(code), 'the core\'s hint() and resultKey() were found');
const KINDS = ['tri', 'sq', 'rect', 'rhom', 'trap', 'quad', 'pent', 'hex', 'hept', 'oct'];
Object.keys(S).forEach(k => {
  L.forEach(l => is(typeof S[k][l] === 'string' && S[k][l].trim().length > 0, `${k}.${l} present`));
  const ph = (S[k].en.match(/\{\w+\}/g) || []).sort().join();
  L.forEach(l => is(((S[k][l] || '').match(/\{\w+\}/g) || []).sort().join() === ph, `${k}.${l}: the placeholders of en`));
  const used = k === 'title' || k === 'instruction' || new RegExp("'" + k + "'").test(code)
    || (/^(ok|n)_/.test(k) && KINDS.includes(k.split('_')[1]))
    || (/^(okReal|pReal|pRiddle)_/.test(k) && ['tri', 'sq', 'rect'].includes(k.split('_')[1]));
  is(used, `${k}: reached from the code`);
});
KINDS.forEach(k => { is(!!S['n_' + k], `n_${k}: a name plate`); });
C.rounds('count', 'first').concat(C.rounds('count', 'more')).forEach(r => { const k = C.kindOf(C.shapeOf(r.tiles[0].key)); is(!!S['ok_' + k], `${r.id}: a win line ok_${k}`); });
['tri', 'sq', 'rect'].forEach(t => is(S['pReal_' + t] && S['pRiddle_' + t] && S['okReal_' + t], `the ${t} has its prompt, riddle and win line`));
/* the count win lines say the right number */
const NUM = { tri: 3, sq: 4, rect: 4, rhom: 4, trap: 4, quad: 4, pent: 5, hex: 6, hept: 7, oct: 8 };
KINDS.forEach(k => L.forEach(l => is(S['ok_' + k][l].includes(String(NUM[k])), `ok_${k}.${l} names ${NUM[k]} sides`)));
for (const k in S) for (const l of L) {
  const s = S[k][l] || '';
  is(!/  /.test(s) && !/undefined/.test(s), `${k}.${l}: clean`);
  if (l === 'fr') is(!/ [!?:;]/.test(s), `${k}.fr: U+202F before ! ? : ;`);
  const FREE = { en: 'free', de: 'kostenlos|gratis|frei', fr: 'gratuit\\w*|libre', es: 'gratis|libre', pt: 'gr[aá]tis|livre', it: 'gratis|libero|gratuit\\w*', nl: 'gratis|vrij', sv: 'gratis|ledig|fri', da: 'gratis|ledig|fri', no: 'gratis|ledig|fri', fi: 'ilmai\\w*|vapaa' }[l];
  is(!new RegExp('(?<!\\p{L})(' + FREE + ')(?!\\p{L})', 'iu').test(s.replace(/­/g, '')), `${k}.${l}: no word for "free"`);
  if (l === 'es') is(!/(?<!\p{L})(vosotros|coge|ordenador|vale)(?!\p{L})/iu.test(s), `${k}.es: Mexican, not peninsular`);
}
const banPoison = (l, s) => new RegExp('(?<!\\p{L})(' + { pt: 'gr[aá]tis|livre', fr: 'gratuit\\w*|libre' }[l] + ')(?!\\p{L})', 'iu').test(s);
is(banPoison('pt', 'é livre') && !banPoison('fr', 'le livre'), 'the ban is poisoned both ways');
/* soft hyphens only inside the long names, never visible */
for (const k in S) for (const l of L) if (S[k][l].includes('­')) is(/^n_/.test(k), `${k}.${l}: soft hyphens only in name plates`);
is(A.settings.map(s => s.key).join() === 'mode,shapes' && A.settings[0].options.length === 4 && A.settings[1].options.length === 2, 'two settings: the mode (4) and the shapes (2)');

/* 9. layout */
[320, 360, 412, 704, 768, 1024, 1366].forEach(W => C.MODES.forEach(md => C.LEVELS.forEach(lv => {
  const stage = W >= 704 ? Math.min(W, 820) - 56 : W - 32, r = C.rounds(md, lv)[0], Ly = C.layout(stage, r);
  is(Ly.doorW >= 44 && Ly.doorH >= 44 && (md === 'count' ? Ly.big >= 130 : Ly.tile >= 44), `${W} ${md}/${lv}: doors and tiles ≥ 44 px, the counting shape ≥ 130`);
  if (md !== 'real') is(Ly.doorCols * Ly.doorW + (Ly.doorCols - 1) * 8 <= stage - 16, `${W} ${md}/${lv}: the doors fit across`);
  is(Ly.cols * Ly.tile + (Ly.cols - 1) * 8 <= stage - 16 || md === 'count', `${W} ${md}/${lv}: the tray fits across`);
})));

console.log(`verify-post-box-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
