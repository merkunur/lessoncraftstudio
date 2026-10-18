#!/usr/bin/env node
/* =====================================================================
   verify-stamp-frame-core.js — the model gate for ACTIVITY #23, the Stamp
   Frame (K.OA.A.1). Design rules §12 of
   docs/activities-rebuild/designs/023-ten-frame.md:
     0 the tidy only permutes (counts kept; coral before teal; uncrossed before crossed)
     1 step 1 ok iff coral = a and (+: teal = b, no crosses) / (−: crosses = b, no teal)
     2 the second frame refuses ink while the first has room
     3 every answer is computed HERE, in range, never 0
     4 the old ten problems are the Within 10 level
     5 dots show the right pip counts (a domino's halves sum to the number)
     6 no adjacent equal answers, operator runs ≤ 2, over 10 000 seeds
     7 the "part" hint fires exactly when the tapped number is a or b and ≠ the answer
   plus the hint table, the chips (the help never writes the answer), the
   brackets, the marks, the rack, the layout floors at every width 280–1400.
   ⭐ Every expectation is written out HERE — never read off the core.
   Usage: node scripts/verify-stamp-frame-core.js   (SF_CORE_DIR=<dir> to test a mutant)
   ===================================================================== */
'use strict';
const path = require('path');
const DIR = process.env.SF_CORE_DIR || path.join(__dirname, '..', 'mini tools');
const C = require(path.join(DIR, 'stamp-frame-core.js'));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL <= 40) console.error('   FAIL: ' + m); } };

/* ---- the ground truth (design §6) ---- */
const POOLS = {
  within5:  [[2, 1, '+'], [1, 3, '+'], [2, 2, '+'], [3, 2, '+'], [1, 4, '+'], [5, 1, '-'], [4, 2, '-'], [5, 3, '-'], [3, 1, '-'], [4, 3, '-']],
  within10: [[3, 2, '+'], [4, 3, '+'], [5, 4, '+'], [2, 6, '+'], [1, 5, '+'], [5, 2, '-'], [8, 3, '-'], [7, 4, '-'], [9, 6, '-'], [6, 2, '-']],
  within20: [[8, 5, '+'], [9, 7, '+'], [6, 6, '+'], [7, 8, '+'], [10, 4, '+'], [15, 6, '-'], [13, 5, '-'], [18, 7, '-'], [14, 7, '-'], [17, 7, '-']]
};
const OLD10 = [[3, 2, '+'], [4, 3, '+'], [5, 4, '+'], [2, 6, '+'], [1, 5, '+'], [5, 2, '-'], [8, 3, '-'], [7, 4, '-'], [9, 6, '-'], [6, 2, '-']];
const MAXN = { within5: 5, within10: 10, within20: 20 };
const ans = (a, b, op) => op === '+' ? a + b : a - b;
const cap = (lv) => lv === 'within20' ? 20 : 10;

/* ---- [A] the pools ---- */
for (const lv of Object.keys(POOLS)) {
  const r = C.rounds(lv);
  is(r.length === POOLS[lv].length, lv + ': ' + r.length + ' rounds');
  is(r.length >= 7, lv + ': at least 7 rounds');
  const want = POOLS[lv].map(p => p.join(',')).sort().join(' | '), got = r.map(x => [x.a, x.b, x.op].join(',')).sort().join(' | ');
  is(want === got, lv + ': the round table is the design table (' + got + ')');
  is(new Set(r.map(x => x.id)).size === r.length, lv + ': ids unique');
  for (const x of r) {
    const v = ans(x.a, x.b, x.op);
    is(x.a >= 1 && x.b >= 1 && v >= 1, lv + ' ' + x.id + ': no 0 anywhere');
    is(v <= MAXN[lv] && x.a <= MAXN[lv], lv + ' ' + x.id + ': within the level');
    is(C.answerOf(C.newState(x)) === v, lv + ' ' + x.id + ': answerOf');
    is(x.frames === (lv === 'within20' ? 2 : 1), lv + ' ' + x.id + ': frames');
    is(C.newState(x).cells.length === cap(lv), lv + ' ' + x.id + ': cells');
  }
  is(r.some(x => x.op === '+') && r.some(x => x.op === '-'), lv + ': both + and −');
}
is(OLD10.map(p => p.join(',')).join(' ') === C.rounds('within10').map(x => [x.a, x.b, x.op].join(',')).join(' '), 'the old ten problems, in order, are Within 10');
is(C.level('nonsense') === 'within10' && C.rounds('nonsense').length === 10, 'an unknown level falls back to Within 10');

/* ---- [B] the order: rule 6 over 10 000 seeds, never the same order twice ---- */
function goodOrder(pool, ord) {
  if (ord.length !== pool.length || new Set(ord).size !== pool.length) return false;
  let run = 1;
  for (let i = 1; i < ord.length; i++) {
    const p = pool[ord[i - 1]], q = pool[ord[i]];
    if (ans(p.a, p.b, p.op) === ans(q.a, q.b, q.op)) return false;
    run = p.op === q.op ? run + 1 : 1;
    if (run > 2) return false;
  }
  return true;
}
for (const lv of Object.keys(POOLS)) {
  const pool = C.rounds(lv);
  let bad = 0, same = 0, firsts = new Set(), prev = null;
  for (let s = 0; s < 10000; s++) {
    const o = C.order(pool, C.rng(lv + ':' + s), prev);
    if (!goodOrder(pool, o)) bad++;
    if (prev && o.join(',') === prev.join(',')) same++;
    firsts.add(o[0]); prev = o;
  }
  is(bad === 0, lv + ': every order keeps the rules (' + bad + ' bad of 10 000)');
  is(same === 0, lv + ': no order repeats the one before (' + same + ')');
  is(firsts.size >= 8, lv + ': the first round varies (' + firsts.size + ' different)');
}

/* ---- [C] the hand: the rack, stamping, the fill-the-first-frame rule ---- */
function fresh(lv, k) { return C.newState(C.rounds(lv)[k]); }
{
  const add = fresh('within10', 0), sub = fresh('within10', 5);
  is(C.rack(add).join() === 'c,t', 'addition rack: orange + green');
  is(C.rack(sub).join() === 'c,x', 'take-away rack: orange + cross');
  is(C.rack(C.newPlay()).join() === 'c,t,x', 'free play: all three stamps');
  is(!C.select(add, 'x') && !C.select(sub, 't'), 'a stamp that is not on the rack cannot be lifted');
  is(C.stamp(add, 0) === 'ink' && add.cells[0] === 'c', 'orange on an empty place inks it');
  is(C.stamp(add, 0) === 'wipe' && add.cells[0] === null, 'the same stamp again wipes it');
  C.stamp(add, 0); C.select(add, 't');
  is(C.stamp(add, 0) === 'recolour' && add.cells[0] === 't', 'the other dot stamp recolours');
  is(C.stamp(sub, 2) === 'ink', 'take-away: orange inks');
  C.select(sub, 'x');
  is(C.stamp(sub, 2) === 'cross' && sub.cells[2] === 'cx', 'the cross stamp crosses an orange counter');
  is(C.stamp(sub, 2) === 'uncross' && sub.cells[2] === 'c', 'and uncrosses it');
  is(C.stamp(sub, 3) === 'refused' && sub.cells[3] === null, 'the cross stamp refuses an empty place');
  C.select(sub, 'c'); C.select(sub, 'x'); C.stamp(sub, 2); C.select(sub, 'c');
  is(C.stamp(sub, 2) === 'refused' && sub.cells[2] === 'cx', 'a dot stamp leaves a crossed counter alone');
  is(C.stamp(sub, -1) === 'refused' && C.stamp(sub, 10) === 'refused', 'outside the frame refused');
  /* rule 2 */
  const t = fresh('within20', 0);
  for (let i = 10; i < 20; i++) is(C.stamp(t, i) === 'fillFirst' && t.cells[i] === null, 'second frame refuses place ' + i + ' while the first has room');
  for (let i = 0; i < 10; i++) C.stamp(t, i);
  is(C.stamp(t, 14) === 'ink' && t.cells[14] === 'c', 'the second frame inks once the first is full');
  is(C.firstEmpty(fresh('within10', 0)) === 0, 'firstEmpty');
  /* locked */
  const done = fresh('within10', 1);
  for (let i = 0; i < 4; i++) C.stamp(done, i); C.select(done, 't'); for (let i = 4; i < 7; i++) C.stamp(done, i);
  C.checkStep1(done);
  is(done.step === 2 && C.stamp(done, 8) === 'locked' && !C.clear(done), 'step 2: the frame is locked');
  const w = fresh('within10', 0); C.stamp(w, 3); C.stamp(w, 7);
  is(C.clear(w) && w.cells.every(v => v === null), 'wipe the frame');
  const p = C.newPlay();
  is(p.explore && p.cells.length === 20, 'free play: two frames');
  C.stamp(p, 0); C.select(p, 't'); C.stamp(p, 1); C.select(p, 'x'); C.stamp(p, 0);
  const e = C.liveEquation(p);
  is(e.total === 1 && e.terms.length === 3, 'free play: the equation writes itself (1 + 1 − 1 = 1)');
  is(C.checkStep1(p) === null && C.checkAnswer(p, 1) === null, 'free play is never checked');
  is(C.stamp(p, 1) === 'refused' && p.cells[1] === 't', 'free play: the cross stamp refuses a green counter (it would turn it orange)');
}

/* ---- [D] rule 0: the tidy only permutes (fuzz) ---- */
function seedRand(s) { let a = s >>> 0; return () => { a = (a * 1664525 + 1013904223) >>> 0; return a / 4294967296; }; }
const tally = (cells) => ({ c: cells.filter(v => v === 'c').length, t: cells.filter(v => v === 't').length, x: cells.filter(v => v === 'cx').length });
for (let s = 0; s < 3000; s++) {
  const R = seedRand(s), lv = ['within5', 'within10', 'within20'][s % 3], pool = C.rounds(lv), r = pool[Math.floor(R() * pool.length)];
  const st = C.newState(r), n = st.cells.length;
  for (let i = 0; i < n; i++) { const q = R(); st.cells[i] = q < 0.4 ? null : (r.op === '+' ? (q < 0.7 ? 'c' : 't') : (q < 0.75 ? 'c' : 'cx')); }
  const before = tally(st.cells);
  C.tidy(st);
  const after = tally(st.cells);
  is(before.c === after.c && before.t === after.t && before.x === after.x, 'tidy keeps the counts (seed ' + s + ')');
  const ink = st.cells.filter(v => v !== null);
  if (r.op === '+') {
    is(ink.join('') === 'c'.repeat(after.c) + 't'.repeat(after.t), 'tidy +: orange before green (seed ' + s + ')');
    for (let i = 0; i < after.c; i++) is(st.cells[i] === 'c', 'tidy +: orange from the first place (seed ' + s + ')');
  } else {
    is(st.cells.slice(0, after.c + after.x).join() === Array(after.c).fill('c').concat(Array(after.x).fill('cx')).join(), 'tidy −: uncrossed then crossed, no gap (seed ' + s + ')');
  }
}

/* ---- [E] rule 1 + the slip table, by direct construction of every count ---- */
function build(r, coral, other) {
  const st = C.newState(r), n = st.cells.length;
  /* place the ink scattered (the tidy has to do its job) */
  const order = []; for (let i = 0; i < n; i++) order.push((i * 7 + 3) % n);
  let k = 0;
  if (r.op === '+') { for (let i = 0; i < coral; i++) st.cells[order[k++]] = 'c'; for (let i = 0; i < other; i++) st.cells[order[k++]] = 't'; }
  else { for (let i = 0; i < coral; i++) st.cells[order[k++]] = i < other ? 'cx' : 'c'; }
  return st;
}
function wantSlip(r, coral, other) {
  const { a, b, op } = r;
  if (coral + (op === '+' ? other : 0) === 0) return 'empty';
  if (op === '+') {
    if (coral > a) return ['outside', a, coral - a];
    if (coral < a) return ['missing', a, a - coral];
    if (other > b) return ['outside', b, other - b];
    if (other < b) return ['missing', b, b - other];
    return 'right';
  }
  if (other === 0) return ['noCross', b];
  if (coral > a) return ['outside', a, coral - a];
  if (coral < a) return ['missing', a, a - coral];
  if (other < b) return ['crossMore', b, b - other];
  if (other > b) return ['crossLess', b, other - b];
  return 'right';
}
let cases = 0;
for (const lv of Object.keys(POOLS)) for (const r of C.rounds(lv)) {
  const n = cap(lv);
  for (let coral = 0; coral <= n; coral++) for (let other = 0; other <= (r.op === '+' ? n - coral : coral); other++) {
    const st = build(r, coral, other), w = wantSlip(r, coral, other), res = C.checkStep1(st);
    cases++;
    const tag = lv + ' ' + r.a + r.op + r.b + ' coral ' + coral + ' other ' + other;
    if (w === 'empty') { is(res && res.slip === 'empty' && !res.ok && st.misses1 === 0 && st.step === 1, tag + ': empty frame, no miss'); continue; }
    if (w === 'right') {
      is(res && res.ok && st.step === 2, tag + ': right');
      if (r.op === '-') {
        is(st.dish === r.b, tag + ': the crossed ones peel into the dish');
        const left = ans(r.a, r.b, r.op);
        is(st.cells.slice(0, left).every(v => v === 'c') && st.cells.slice(left).every(v => v === null), tag + ': the ones left stay, in order');
      } else is(st.cells.slice(0, r.a).every(v => v === 'c') && st.cells.slice(r.a, r.a + r.b).every(v => v === 't'), tag + ': tidied into the two brackets');
      continue;
    }
    is(res && !res.ok && res.slip === w[0] && res.n === w[1] && (w[2] === undefined || res.k === w[2]), tag + ': slip ' + w.join('/') + ' got ' + (res && [res.slip, res.n, res.k].join('/')));
    is(st.misses1 === 1 && st.step === 1, tag + ': one miss, still step 1');
  }
}
is(cases > 2000, 'step-1 cases ' + cases);

/* ---- brackets + marks after a miss ---- */
{
  const r = C.rounds('within10')[1]; /* 4 + 3 */
  const st = build(r, 2, 3); C.checkStep1(st);
  is(JSON.stringify(C.brackets(st)) === JSON.stringify([{ key: 'a', from: 0, to: 4 }, { key: 'b', from: 4, to: 7 }]), 'addition brackets: [0,a) and [a,a+b)');
  const m = C.marks(st);
  is(m[0] === 'ok' && m[1] === 'ok' && m[2] === 'empty' && m[3] === 'empty' && m[4] === 'ok' && m[6] === 'ok' && m[7] === '', '2 orange for 4: two dashed empty places inside the 4 (' + m.join(',') + ')');
  const st2 = build(r, 6, 3); C.checkStep1(st2);
  const m2 = C.marks(st2);
  is(m2[4] === 'wrong' && m2[5] === 'wrong' && m2[6] === 'ok' && m2[7] === 'extra' && m2[8] === 'extra' && st2.cells[8] === 't', '6 orange for 4: two orange inside the 3, two green pushed outside every bracket (' + m2.join(',') + ')');
  const r2 = C.rounds('within10')[6]; /* 8 − 3 */
  const st3 = build(r2, 8, 2); C.checkStep1(st3);
  is(JSON.stringify(C.brackets(st3)) === JSON.stringify([{ key: 'a', from: 0, to: 8 }, { key: 'b', from: 5, to: 8 }]), 'take-away brackets: the 3 sits inside the 8');
  is(C.marks(st3)[5] === 'wrong' && C.marks(st3)[6] === 'ok', '8 − 3 with 2 crosses: one place in the 3 still uncrossed');
  const st4 = build(r2, 8, 3); C.checkStep1(st4);
  is(JSON.stringify(C.brackets(st4)) === JSON.stringify([{ key: 'left', from: 0, to: 5 }]), 'after the peel: one bracket round the ones left');
  const st5 = build(r, 4, 3); C.checkStep1(st5);
  is(JSON.stringify(C.brackets(st5)) === JSON.stringify([{ key: 'all', from: 0, to: 7 }]), 'after a right addition: the brackets merge');
}

/* ---- [F] step 2: rule 3 + rule 7 ---- */
function atStep2(r) { const st = build(r, r.a, r.b); C.checkStep1(st); return st; }
for (const lv of Object.keys(POOLS)) for (const r of C.rounds(lv)) {
  const v = ans(r.a, r.b, r.op);
  for (let t = 1; t <= MAXN[lv]; t++) {
    const st = atStep2(r), res = C.checkAnswer(st, t), tag = lv + ' ' + r.a + r.op + r.b + ' tap ' + t;
    if (t === v) { is(res.ok && st.done && st.misses2 === 0, tag + ': right'); continue; }
    let want = 'count';
    if (r.op === '+' && (t === r.a || t === r.b)) want = 'part';
    if (r.op === '-' && (t === r.a || t === r.b)) want = 'away';
    is(!res.ok && res.slip === want && !st.done && st.misses2 === 1, tag + ': ' + want + ' got ' + res.slip);
    if (want === 'part') is(C.hint(st).key === 'hintPart' && C.hint(st).n === t, tag + ': the part hint names the part');
    if (want === 'away') is(C.hint(st).key === 'hintAway', tag + ': the taken-away hint');
    if (want === 'count') is(C.hint(st).key === 'hintCountAll', tag + ': count every counter');
    C.checkAnswer(st, t);
    is(C.hint(st).key === 'hintNumbers' && C.help2(st) === 2, tag + ': the second miss counts with numbers');
    const ch = C.chips(st);
    is(ch.slice(0, v - 1).every((x, i) => x === i + 1) && ch[v - 1] === '?' && ch.slice(v).every(x => x === ''), tag + ': numbers to "?" on the last — the help never writes ' + v);
    is(ch.indexOf(v) < 0, tag + ': the answer itself never appears as a chip');
  }
  const st = atStep2(r);
  is(C.hint(st).key === (r.op === '+' ? 'askAdd' : 'askSub'), r.id + ': step 2 asks the question');
  C.checkAnswer(st, v);
  const ch = C.chips(st);
  is(ch.slice(0, v).every((x, i) => x === i + 1), r.id + ': success numbers every counter');
  is(C.checkAnswer(st, 1) === null, r.id + ': no answer after done');
}

/* ---- the step-1 hint table ---- */
{
  const r = C.rounds('within10')[1];
  const k = (coral, other, misses) => { const st = build(r, coral, other); C.checkStep1(st); for (let i = 1; i < misses; i++) C.checkStep1(st); return C.hint(st).key; };
  is(k(5, 3, 1) === 'hintOutside1' && k(7, 3, 1) === 'hintOutsideN', 'outside: one / several');
  is(k(3, 3, 1) === 'hintEmpty1' && k(1, 3, 1) === 'hintEmptyN', 'empty: one / several');
  is(k(1, 3, 2) === 'hintSlots', 'second miss: stamp into every place');
  const e = C.newState(r); C.checkStep1(e);
  is(C.hint(e).key === 'hintStart' && e.misses1 === 0, 'empty Check: lift a stamp');
  const s = C.rounds('within10')[6];
  const ks = (coral, cross, misses) => { const st = build(s, coral, cross); for (let i = 0; i < misses; i++) C.checkStep1(st); return C.hint(st).key; };
  is(ks(8, 0, 1) === 'hintCross', 'no crosses: take away means cross out');
  is(ks(8, 2, 1) === 'hintCrossMore1' && ks(8, 1, 1) === 'hintCrossMoreN', 'cross more: one / several');
  is(ks(8, 4, 1) === 'hintCrossLess1' && ks(8, 5, 1) === 'hintCrossLessN', 'cross less: one / several');
  is(ks(8, 1, 2) === 'hintSlotsX', 'second cross miss: cross into every place');
  const st = build(r, 2, 3); C.checkStep1(st); C.checkStep1(st);
  const ch = C.chips(st);
  is(ch.slice(0, 4).join() === '1,2,3,4' && ch.slice(4, 7).join() === '1,2,3', 'second miss: each bracket\'s places number themselves');
  C.select(st, 'c'); C.stamp(st, 2);
  is(C.hint(st) === null && C.chips(st).every(x => x === ''), 'a new stamp takes the help away');
  /* take-away, second miss: "under the 8" counts 1..8; "under the 3" counts the crossed run 1..3 (reviewer 2026-10-19) */
  const sa = build(s, 7, 2); C.checkStep1(sa); C.checkStep1(sa);
  is(C.chips(sa).slice(0, 8).join() === '1,2,3,4,5,6,7,8' && C.hint(sa).key === 'hintSlots' && C.hint(sa).n === 8, '8 − 3, a miss on the 8: the places under the 8 count 1..8 (' + C.chips(sa).join() + ')');
  const sb = build(s, 8, 1); C.checkStep1(sb); C.checkStep1(sb);
  is(C.chips(sb).join() === ',,,,,1,2,3,,' && C.hint(sb).key === 'hintSlotsX', '8 − 3, a miss on the crosses: the crossed run counts 1..3 (' + C.chips(sb).join() + ')');
}
/* every slip names the bracket it is about — the doubles (2 + 2, 6 + 6) show two tags with the same number */
for (const lv of Object.keys(POOLS)) for (const r of C.rounds(lv)) {
  const n = cap(lv);
  for (let coral = 1; coral <= n; coral++) for (let other = 0; other <= (r.op === '+' ? n - coral : coral); other++) {
    const st = build(r, coral, other), res = C.checkStep1(st), w = wantSlip(r, coral, other);
    if (w === 'right' || w === 'empty') continue;
    const wantG = (w[0] === 'noCross' || w[0] === 'crossMore' || w[0] === 'crossLess' || (r.op === '+' && w[1] === r.b && coral === r.a)) ? 'b' : 'a';
    is(res.g === wantG, lv + ' ' + r.id + ' coral ' + coral + ' other ' + other + ': the slip names bracket ' + wantG + ' (got ' + res.g + ')');
  }
}

/* ---- [G] rule 5: dots ---- */
for (let n = 1; n <= 10; n++) {
  const d = C.dots(n), sum = d ? d.reduce((s, h) => s + h.length, 0) : -1;
  is(sum === n, 'dots(' + n + ') shows ' + n + ' pips (' + sum + ')');
  is(d && d.length === (n <= 6 ? 1 : 2), 'dots(' + n + '): ' + (n <= 6 ? 'a die face' : 'a domino'));
  if (d) for (const h of d) is(h.length >= 1 && h.length <= 6 && new Set(h).size === h.length && h.every(g => g >= 0 && g <= 8), 'dots(' + n + '): pips on the 3 × 3 grid, no doubles');
}
is(C.dots(11) === null && C.dots(0) === null, 'no dots above 10 (or for 0)');

/* ---- the success line ---- */
for (const lv of Object.keys(POOLS)) for (const r of C.rounds(lv)) {
  const v = ans(r.a, r.b, r.op);
  const want = r.op === '-' ? (v === 1 ? 'celebrateSub1' : 'celebrateSub') : 'celebrateAdd';
  is(C.celebrateKey(r, 'numerals') === want, r.id + ': success line (numerals)');
  const wantDots = r.op === '+' && r.a >= 2 && r.b >= 2 && r.a <= 10 && r.b <= 10 ? 'celebrateDots' : want;
  is(C.celebrateKey(r, 'dots') === wantDots, r.id + ': success line (dots — never "1 dots")');
}

/* ---- [H] the layout floors ---- */
for (let W = 280; W <= 1400; W += 4) for (const f of [1, 2]) for (const mx of [5, 10, 20]) for (const sub of [false, true]) {
  const L = C.layout(W, f, mx, sub);
  const gridW = 5 * L.cell + 4 * L.gap + 2 * L.pad;
  const top = W >= 560 ? (f === 2 ? 72 : 80) : (f === 2 ? 46 : 56);
  is(L.cell >= 44 && L.cell <= top, 'W ' + W + ': cell ' + L.cell + ' in 44..' + top);
  is(L.side === (W >= 560 && sub ? 136 : 0), 'W ' + W + ': the dish column only for take-away on wide stages');
  if (W >= 700) is(L.cell === top, 'W ' + W + ': a desktop stage gets the full-size places (' + L.cell + ')');
  is(L.key >= 44 && L.keyH >= 44, 'W ' + W + ': strip keys ≥ 44 (' + L.key + ' × ' + L.keyH + ')');
  is(gridW + (L.side ? L.side + 16 : 0) <= W, 'W ' + W + ': the frame (and side) fit');
  is(L.perRow * L.key + (L.perRow - 1) * 6 <= W, 'W ' + W + ': the strip fits');
  is((L.mode === 'wide') === (W >= 560), 'W ' + W + ': wide from 560');
  if (L.mode === 'wide') is(L.perRow === 10, 'W ' + W + ': the strip is one number line of ten');
  else is(L.perRow === 5, 'W ' + W + ': phones: rows of five');
}
for (let i = 0; i < 20; i++) { const p = C.place(i); is(p.frame === Math.floor(i / 10) && p.row === Math.floor((i % 10) / 5) && p.col === i % 5, 'place(' + i + '): reading order'); }

console.log('verify-stamp-frame-core: ' + PASS + ' passed, ' + FAIL + ' failed');
process.exit(FAIL ? 1 : 0);
