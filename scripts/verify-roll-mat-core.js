#!/usr/bin/env node
/* =====================================================================
   verify-roll-mat-core.js — ACTIVITY #96, The Roll-Up Mats (1.NBT.C.4 +
   the 2.NBT column faces). Its OWN oracle (never the core's answers):
     · every round recomputed by column arithmetic on digit strings: the
       answer, which columns carry or borrow; every result ≥ 19, no 0 count;
       each face has a round with no regrouping and one where the ones make
       exactly ten (add);
     · a scripted solver using only the public moves reaches the oracle's
       answer in every round, and Check says right;
     · the bench: a mat rolls only at exactly ten and never in the leftmost
       column; the rolled ten lands on the next column's shelf; the value
       on the bench never changes by rolling, dropping or unrolling; take-
       away never goes below 0; unroll refuses from an empty neighbour and
       into a full mat;
     · the boxes: a covered box (full mat, rod on the shelf) refuses a digit;
       a box opens only when its column and every column to its right is
       settled (the ones first, by the bench itself);
     · Check: before anything → start; unsettled → covered; blank → write;
       a wrong take-away → away; a wrong digit → that column; the hints;
     · the success line matches the regrouping; the plan never repeats a
       pass, never starts with a round that needs no regrouping, never three
       of one way in a row; every hint key authored in 11 locales; Tuck is
       the labelled hamster.
   Usage: node scripts/verify-roll-mat-core.js
   ===================================================================== */
'use strict';
const path = require('path'), fs = require('fs');
const C = require(path.join(process.env.RM_CORE_DIR || path.join(__dirname, '..', 'mini tools'), 'roll-mat-core.js'));
let PASS = 0, FAIL = 0;
const ok = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('   FAIL: ' + m); } };
let seed = 7; const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
const LOCS = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
const COLS = { add1: ['T', 'O'], col2: ['T', 'O'], col3: ['H', 'T', 'O'] };
/* the oracle: column arithmetic on digit strings, right to left */
function oracle(a, b, op, cols) {
  const n = cols.length, A = String(a).padStart(n, '0').split('').map(Number), B = String(b).padStart(n, '0').split('').map(Number), out = [], moves = [];
  let k = 0;
  for (let i = n - 1; i >= 0; i--) {
    if (op === '+') { let s = A[i] + B[i] + k; k = s >= 10 ? 1 : 0; out[i] = s % 10; if (k) moves.push(cols[i]); }
    else { let s = A[i] - k - B[i]; k = s < 0 ? 1 : 0; out[i] = s + 10 * k; if (k) moves.push(cols[i]); }
  }
  return { digits: out, value: Number(out.join('')), moves };
}
function solve(st) {
  const r = st.r, rev = r.cols.slice().reverse();
  if (r.op === '+') {
    for (let g = 0; g < 200; g++) { let m = false; for (const c of rev) { if (C.pour(st, c)) m = true; else if (st.cols[c].mat.length >= 10 && C.roll(st, c)) m = true; else if (C.dropShelf(st, c)) m = true; } if (!m) break; }
  } else {
    for (let i = r.cols.length - 1; i >= 0; i--) { const c = r.cols[i]; let need = C.digit(r.b, c), guard = 0; while (need > 0 && guard++ < 50) { const x = C.takeAway(st, c); if (x.result === 'empty') { let k = i; while (k > 0 && C.unroll(st, r.cols[k]).result === 'empty') k--; continue; } need--; } }
  }
}
function writeAll(st, v) { const r = st.r; if (r.total) { for (const d of String(v)) C.write(st, null, d); } else r.cols.forEach(c => C.write(st, c, String(C.digit(v, c)))); }

for (const f of C.FACES) {
  const ids = C.ids(f, 'both');
  ok(C.ids(f, 'add').length >= 7 && C.ids(f, 'sub').length >= 7, `${f}: ≥ 7 rounds each way`);
  let none = 0, exact = 0;
  for (const id of ids) {
    const r = C.round(f, id), o = oracle(r.a, r.b, r.op, COLS[f]), w = `${f} ${r.a}${r.op}${r.b}`;
    ok(r.c === o.value && r.c === (r.op === '+' ? r.a + r.b : r.a - r.b), `${w}: = ${o.value}`);
    ok(r.c >= 19 && r.a > 0 && r.b > 0, `${w}: no 0, result ≥ 19`);
    ok(JSON.stringify(r.regroup) === JSON.stringify(o.moves), `${w}: regrouping ${o.moves.join('')} (${r.regroup.join('')})`);
    ok(r.total === (f === 'add1') && JSON.stringify(r.cols) === JSON.stringify(COLS[f]), `${w}: columns ${COLS[f]}`);
    if (!o.moves.length) none++;
    if (r.op === '+' && C.digit(r.a, 'O') + C.digit(r.b, 'O') === 10) exact++;
    /* the success line */
    const want = r.op === '+' ? (!o.moves.length ? 'okAddNone' : (o.moves.includes('T') && COLS[f].includes('H') ? (o.moves.includes('O') ? 'okAddBoth' : 'okAddHundred') : 'okAddRoll')) : (!o.moves.length ? 'okSub' : o.moves.includes('T') && o.moves.includes('O') ? 'okSubBoth' : o.moves.includes('T') ? 'okSubHundred' : 'okSubRoll');
    ok(C.okKey(r) === want, `${w}: success line ${want}`);
    /* solve with public moves */
    const st = C.newState(r), v0 = C.value(st) + (r.op === '+' ? 0 : 0);
    ok(C.check(st).hint === (r.op === '+' ? 'hintStart' : 'hintStartSub') && st.misses === 0, `${w}: Check before anything → start, no miss`);
    solve(st);
    ok(C.value(st) === o.value && (r.op === '+' || C.awayValue(st) === r.b), `${w}: the bench holds ${o.value} after the solver`);
    ok(r.cols.every(c => C.settled(st, c)), `${w}: every column settled`);
    ok(C.check(st).hint === 'hintWrite', `${w}: blank boxes → write`);
    writeAll(st, o.value);
    ok(C.check(st).result === 'ok' && st.done, `${w}: the oracle's digits are right`);
    /* a wrong digit */
    const s2 = C.newState(r); solve(s2); writeAll(s2, o.value + 1);
    const res = C.check(s2);
    ok(res.result === 'miss' && res.kind === 'digit' && res.col === 'O' && C.hint(s2).key === 'hintCount', `${w}: one too many → the ones column, hintCount`);
    C.check(s2); ok(C.hint(s2).key === 'hintCount2' && s2.show === 2, `${w}: a second miss → hintCount2`);
    ok(C.del(s2, r.total ? null : 'O') && s2.show === 0, `${w}: a change clears the showing`);
    if (r.op === '-') {
      /* take away one too few: the bench and the boxes may agree, but it is not {a} − {b} */
      const s3 = C.newState(r); solve(s3); const c0 = r.cols[r.cols.length - 1];
      if (C.giveBack(s3, c0) && C.settled(s3, c0)) { writeAll(s3, C.value(s3)); const x = C.check(s3); ok(x.result === 'miss' && x.kind === 'away' && C.hint(s3).key === 'hintAway' && C.hint(s3).args.b === r.b, `${w}: one too few taken away → hintAway`); }
    }
  }
  ok(none >= 1, `${f}: a round with no regrouping`);
  ok(exact >= 1, `${f}: a round where the ones make exactly ten`);
}

/* ---- the bench and the boxes ---- */
for (const f of C.FACES) for (const id of C.ids(f, 'add')) {
  const r = C.round(f, id); if (!r.regroup.includes('O')) continue;
  const st = C.newState(r), w = `${f} ${r.a}+${r.b}`;
  const v0 = C.value(st);
  while (C.pour(st, 'O')) {}
  ok(C.value(st) === v0, `${w}: pouring moves value from the bin to the bench, never changes it`);
  ok(st.cols.O.mat.length === 10 && C.covered(st, 'O') && !C.boxOpen(st, r.total ? null : 'O'), `${w}: a full ones mat covers its box`);
  ok(!C.write(st, r.total ? null : 'O', '2'), `${w}: a covered box refuses a digit`);
  if (!r.total) ok(!C.boxOpen(st, 'T'), `${w}: the tens box stays closed while the ones are unsettled`);
  /* a mat of nine never rolls */
  const s9 = C.newState(r); for (let k = 0; k < 9 - C.digit(r.a, 'O') && C.pour(s9, 'O'); k++) {}
  if (s9.cols.O.mat.length === 9) ok(C.roll(s9, 'O') === null && s9.cols.O.mat.length === 9, `${w}: nine never roll`);
  const L = C.roll(st, 'O');
  ok(L && L.to === 'T' && st.cols.T.shelf === 1 && st.got.T === 1 && C.value(st) === v0, `${w}: the ten lands on the tens shelf, the value unchanged`);
  ok(C.covered(st, 'T') && (r.total ? !C.boxOpen(st, null) : !C.boxOpen(st, 'T')), `${w}: the shelf rod covers the tens box`);
  ok(C.dropShelf(st, 'T') && st.cols.T.shelf === 0 && C.value(st) === v0, `${w}: dropped into the tens mat, the value unchanged`);
  ok(C.roll(st, r.cols[0]) === null, `${w}: the leftmost column never rolls`);
}
for (const f of C.FACES) for (const id of C.ids(f, 'sub')) {
  const r = C.round(f, id), st = C.newState(r), w = `${f} ${r.a}−${r.b}`, total = () => C.value(st) + C.awayValue(st);
  const t0 = total();
  /* empty the ones, then one more */
  for (let guard = 0; guard < 30 && C.takeAway(st, 'O').result === 'taken'; guard++) {}   /* bounded: a broken take-away must fail, never hang */
  ok(st.cols.O.mat.length === 0 && C.takeAway(st, 'O').result === 'empty' && st.away.O === C.digit(r.a, 'O'), `${w}: take-away stops at 0`);
  ok(total() === t0, `${w}: taking away moves value to the tray, never changes it`);
  const T = st.cols.T, before = T.mat.length + T.door.length, u = C.unroll(st, 'O');
  if (before === 0) ok(u.result === 'empty', `${w}: unroll from an empty tens column is refused`);
  else {
    ok(u.result === 'unrolled' && st.cols.O.mat.length === 10 && T.mat.length + T.door.length === before - 1 && total() === t0, `${w}: one ten unrolls into a full mat of ten, the value unchanged`);
    ok(C.unroll(st, 'O').result === 'full', `${w}: never into a full mat`);
    ok(C.covered(st, 'O'), `${w}: the full mat covers the ones box`);
  }
}

/* the reviewer's rules: blocks still in the bin → bring them over (not 'covered'); the covered pulse looks ones first */
for (const f of C.FACES) for (const id of C.ids(f, 'add')) {
  const r = C.round(f, id); if (!C.digit(r.b, 'O')) continue;
  const st = C.newState(r); C.pour(st, 'O');
  if (st.bin.O > 0) { const x = C.check(st); ok(x.result === 'none' && x.hint === 'hintStart' && st.misses === 0, `${f} ${r.a}+${r.b}: blocks still in the bin → hintStart`); }
  const s2 = C.newState(r); for (const c of r.cols) while (C.pour(s2, c)) {}
  if (!C.settled(s2, 'O')) { C.check(s2); ok(C.hint(s2).key === 'hintCovered' && C.hint(s2).col === 'O', `${f} ${r.a}+${r.b}: the covered pulse looks at the ones first`); }
}
/* ---- the plan ---- */
for (const f of C.FACES) for (const way of C.WAYS) {
  let prev = null;
  for (let pass = 0; pass < 25; pass++) {
    const o = C.plan(f, way, rnd, prev).order, all = C.ids(f, way);
    ok(o.slice().sort().join() === all.slice().sort().join(), `${f} ${way} pass ${pass}: a permutation`);
    ok(!prev || o.join() !== prev.join(), `${f} ${way} pass ${pass}: never the previous order`);
    ok(C.round(f, o[0]).regroup.length > 0, `${f} ${way} pass ${pass}: a round with regrouping first`);
    if (way === 'both') ok(o.every((x, i) => i < 2 || !(x[0] === o[i - 1][0] && x[0] === o[i - 2][0])), `${f} both pass ${pass}: never three of one way in a row`);
    prev = o;
  }
  let s3 = 11; const r3 = () => { s3 = (s3 * 48271) % 2147483647; return s3 / 2147483647; };
  let s4 = 11; const r4 = () => { s4 = (s4 * 48271) % 2147483647; return s4 / 2147483647; };
  const first = C.plan(f, way, r3, null).order;
  ok(C.plan(f, way, r4, first).order.join() !== first.join(), `${f} ${way}: a pass that would repeat the previous order is refused`);
}

/* ---- strings, picture ---- */
{
  const src = fs.readFileSync(path.join(__dirname, '..', 'mini tools', 'roll-mat-activity.js'), 'utf8');
  const block = src.slice(src.indexOf('/*STRINGS-BEGIN*/'), src.indexOf('/*STRINGS-END*/'));
  const authored = {}; for (const line of block.split('\n')) { const m = line.match(/^\s+(\w+):\s*\{(.*)\}\s*,?\s*$/); if (m) authored[m[1]] = LOCS.filter(l => new RegExp('(^|,)' + l + ":'").test(m[2])); }
  ok(Object.keys(authored).length >= 40, `the strings block parses (${Object.keys(authored).length} keys)`);
  for (const k in authored) ok(authored[k].length === 11, `string ${k}: all 11 locales`);
  for (const k of ['hintStart', 'hintStartSub', 'hintCovered', 'hintWrite', 'hintCount', 'hintCount2', 'hintAway', 'hintEmpty', 'hintFull', 'okAddRoll', 'okAddHundred', 'okAddBoth', 'okAddNone', 'okSubRoll', 'okSubHundred', 'okSubBoth', 'okSub']) ok(authored[k] && authored[k].length === 11, `key ${k} authored`);
  const j = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'mini tools', 'pictures', C.DATA.TUCK[0] + '.json'), 'utf8'));
  ok(C.DATA.TUCK.join('/') === 'pets/hamster' && j.nouns.hamster, 'Tuck is the labelled pets/hamster (never the gerbil twin)');
}

console.log(`verify-roll-mat-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
