#!/usr/bin/env node
/* =====================================================================
   verify-zero-cards-core.js — build-time gate for ACTIVITY #98, The
   Zero-Swallowing Cards (1.NBT.B.2). Its OWN oracle: tens = floor(n/10)*10,
   ones = n % 10 — never read off the core.
   Proves: every round's numbers (no 0 target, ranges respected, the 18 old
   targets kept, coats valid, tally ≤ 25, ten frames ≤ 20); EXHAUSTIVELY over
   10..90 × 1..9 a ones card laid over the tens digit or beside the stand tips
   and leaves the stack unchanged (407 unreachable), on the 0 it reads tens +
   ones; the Check ladder (empty → no miss, wrong → miss → rods/cubes by the
   oracle, miss 2 → ghost / tens-count, right → ok, decades refuse every ones
   card); stretch rounds need the stretch / the join; "which" has exactly one
   right tray for every tray code, and the plan puts it 3/3/3 per pass with
   at most one repeat in a row; the plan never repeats the previous order;
   the success lines; the number words equal scripts/worksheet-gen/lib/
   number-words.js; every string has 11 locales and the same placeholders;
   no hint string carries a placeholder (it could print the answer); every
   string key is reached by the activity (or is a recorded shell key).
   Exit 0 = pass; 1 = fail.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const MT = path.join(__dirname, '..', 'mini tools');
const CORE = path.join(process.env.ZC_CORE_DIR || MT, 'zero-cards-core.js'); /* the mutation harness points this at a mutated copy */
const C = require(CORE);
const NW = require(path.join(__dirname, 'worksheet-gen', 'lib', 'number-words.js'));
const SRC = fs.readFileSync(path.join(MT, 'zero-cards-activity.js'), 'utf8');
const A = (() => { const ctx = { window: {}, ZeroCardsCore: C }; vm.createContext(ctx); vm.runInContext(SRC + ';this.__A = ZeroCardsActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const ok = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const T = (n) => Math.floor(n / 10) * 10, O = (n) => n % 10;
const LOCS = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
const MAX = { '20': 20, '50': 50, '99': 99 };

/* ---- the rounds ---- */
const OLD = [12, 13, 16, 19, 23, 29, 30, 35, 47, 50, 58, 64, 70, 72, 86, 89, 90, 95];
ok(JSON.stringify(C.ids('build', '99').map(id => C.round('build', '99', id).n).sort((a, b) => a - b)) === JSON.stringify(OLD), 'build 99 keeps the 18 old targets');
for (const f of C.FACES) for (const rg of C.RANGES) {
  const ids = C.ids(f, rg);
  ok(ids.length >= 7, `${f} ${rg}: ≥ 7 rounds (${ids.length})`);
  ok(new Set(ids.map(id => C.round(f, rg, id).n)).size === ids.length, `${f} ${rg}: every target distinct`);
  for (const id of ids) {
    const r = C.round(f, rg, id), w = `${f} ${rg} ${id} (${r.n})`;
    ok(r.n >= 10 && r.n <= MAX[rg], `${w}: target in 10..${MAX[rg]}`);
    ok(r.tens === T(r.n) && r.ones === O(r.n), `${w}: tens / ones by the oracle`);
    ok(C.rack(rg).tens.indexOf(r.tens) >= 0, `${w}: the rack carries the tens card ${r.tens}`);
    if (f === 'build') {
      ok(['num', 'word', 'to', 'tens', 'frames', 'tally', 'spoken'].indexOf(r.coat) >= 0, `${w}: coat ${r.coat}`);
      if (r.coat === 'frames') ok(r.n <= 20, `${w}: ten frames only up to 20`);
      if (r.coat === 'tally') ok(r.n <= 25, `${w}: tally only up to 25`);
      if (r.coat === 'tens') ok(r.ones === 0, `${w}: the "n tens" coat only on a decade`);
      if (r.coat === 'to') ok(r.ones > 0, `${w}: the tens-and-ones coat has ones`);
    }
    if (f === 'tens') ok(r.decade === (r.ones === 0), `${w}: decade flag`);
    if (f === 'stretch') ok(r.ones > 0 && r.tens > 0, `${w}: a stretch has two parts`);
  }
}
/* every coat appears in build 99, decades appear both as "n tens" and as a bare numeral (1.NBT.B.2.c) */
{ const rs = C.ids('build', '99').map(id => C.round('build', '99', id)); for (const c of ['num', 'word', 'to', 'tens', 'frames', 'tally', 'spoken']) ok(rs.some(r => r.coat === c), `build 99 uses the ${c} coat`); ok(rs.some(r => r.ones === 0 && r.coat === 'num'), 'build 99: a decade as a bare numeral'); ok(rs.some(r => r.ones === 0 && r.coat === 'tens'), 'build 99: a decade as "n tens"'); ok(rs.some(r => r.n > 10 && r.n < 20), 'build 99: a teen'); }
for (const rg of C.RANGES) { const rs = C.ids('stretch', rg).map(id => C.round('stretch', rg, id)); ok(rs.some(r => r.dir === 'apart') && rs.some(r => r.dir === 'together'), `stretch ${rg}: both directions`); }

/* ---- placement: EXHAUSTIVE, 407 unreachable ---- */
const bld = C.round('build', '99', 'b0');
for (let t = 10; t <= 90; t += 10) for (let o = 1; o <= 9; o++) {
  for (const where of ['left', 'off']) {
    const st = C.newState(bld); C.placeTens(st, t);
    ok(C.placeOnes(st, o, where) === 'tipped' && C.value(st) === t && st.ones === null && C.reads(st) === String(t), `${t} + ${o} laid ${where}: tips, the stand still reads ${t}`);
  }
  const s1 = C.newState(bld); C.placeTens(s1, t);
  ok(C.placeOnes(s1, o, 'zero') === 'stacked' && C.value(s1) === t + o && C.reads(s1) === String(t + o), `${t} with ${o} on its 0 reads ${t + o}`);
  ok(JSON.stringify(C.blocks(s1)) === JSON.stringify({ rods: t / 10, cubes: o }), `${t + o} pours ${t / 10} rods and ${o} cubes`);
  const s2 = C.newState(bld); ok(C.placeOnes(s2, o, 'zero') === 'alone', `${o} alone in the right cell`); C.placeTens(s2, t);
  ok(C.value(s2) === t + o, `${o} then ${t}: the tens card slides under, ${t + o}`);
  const s3 = C.newState(bld); ok(C.placeOnes(s3, o, 'left') === 'tipped' && C.value(s3) === 0, `${o} over the empty tens cell tips`);
}
{ const st = C.newState(bld); C.placeTens(st, 40); C.placeOnes(st, 7); ok(C.placeTens(st, 60) === 'swapped' && C.value(st) === 67, 'a second tens card swaps: 67'); ok(C.lift(st, 'o') === 'lifted' && C.value(st) === 60, 'lift the ones card: 60'); ok(C.lift(st, 't') === 'lifted' && C.value(st) === 0, 'lift the tens card: empty'); ok(C.placeTens(st, 100) === 'no' && C.placeOnes(st, 0) === 'no' && C.placeOnes(st, 10) === 'no', 'no 100 card, no 0 card, no 10 ones card'); }
{ const st = C.newState(C.round('build', '20', 'b0')); ok(C.placeTens(st, 30) === 'no', 'to 20: the 30 card is not on the rack'); }
{ let maxV = 0; for (let t = 10; t <= 90; t += 10) for (let o = 1; o <= 9; o++) for (const w of ['zero', 'left', 'off']) { const st = C.newState(bld); C.placeTens(st, t); C.placeOnes(st, o, w); maxV = Math.max(maxV, C.value(st)); } ok(maxV === 99, 'no stack ever reads more than 99'); }

/* ---- Check: build and tens faces ---- */
for (const f of ['build', 'tens']) for (const rg of C.RANGES) for (const id of C.ids(f, rg)) {
  const r = C.round(f, rg, id), w = `${f} ${rg} ${r.n}`;
  let st = C.newState(r);
  ok(C.check(st).result === 'none' && C.hint(st).key === 'hintEmpty' && st.misses === 0, `${w}: empty → hintEmpty, no miss`);
  /* a wrong stack: every other reachable value, sampled in both directions */
  for (const v of [r.n + 10, r.n - 10, r.n + 1, r.n - 1, (r.ones || 1) * 10 + Math.floor(r.n / 10)]) {
    if (v < 1 || v > 99 || v === r.n) continue;
    st = C.newState(r); if (T(v)) C.placeTens(st, T(v)); if (O(v)) C.placeOnes(st, O(v));
    if (C.value(st) !== v) continue; /* off the rack in this range */
    const x = C.check(st), h1 = C.hint(st).key;
    ok(x.result === 'miss' && st.misses === 1 && h1 === (T(v) !== r.tens ? 'hintRods' : 'hintCubes'), `${w}: ${v} → miss, ${h1}`);
    C.check(st); const h2 = C.hint(st);
    ok(st.misses === 2 && h2.key === (f === 'tens' ? 'hintTensCount' : 'hintGhost') && !h2.args, `${w}: ${v} miss 2 → ${h2.key}, no args`);
    ok(!C.check(st).result.startsWith('ok') && !st.done, `${w}: ${v} never becomes right`);
  }
  if (r.ones === 0) for (let o = 1; o <= 9; o++) { st = C.newState(r); C.placeTens(st, r.tens); C.placeOnes(st, o); ok(C.check(st).result === 'miss', `${w}: a decade refuses the ${o} card`); }
  st = C.newState(r); if (r.tens) C.placeTens(st, r.tens); if (r.ones) C.placeOnes(st, r.ones);
  ok(C.check(st).result === 'ok' && st.done, `${w}: the right stack is right`);
  const ko = C.okOf(st); ok(ko.key === 'okBuild' && ko.args.n === r.n && ko.args.t * 10 === T(r.n) && ko.args.o === O(r.n), `${w}: success line ${r.n} = ${ko.args.t} tens ${ko.args.o} ones`);
  ok(C.placeTens(st, 90) === 'no' && C.lift(st, 't') === 'no', `${w}: nothing moves once done`);
}

/* ---- stretch ---- */
for (const rg of C.RANGES) for (const id of C.ids('stretch', rg)) {
  const r = C.round('stretch', rg, id), w = `stretch ${rg} ${r.n} ${r.dir}`;
  const st = C.newState(r);
  ok(C.stretch(st, true) === 'no', `${w}: nothing to stretch on an empty stand`);
  C.placeTens(st, r.tens); ok(C.canStretch(st) === false, `${w}: one card cannot stretch`); C.placeOnes(st, r.ones);
  if (r.dir === 'apart') {
    ok(C.check(st).result === 'none' && C.hint(st).key === 'hintStretch' && st.misses === 0, `${w}: built but not stretched → hintStretch, no miss`);
    ok(C.stretch(st, true) === 'stretched' && C.value(st) === r.n, `${w}: stretched, still ${r.n}`);
    const ko = (C.check(st), C.okOf(st)); ok(st.done && ko.key === 'okApart' && ko.args.a + ko.args.b === r.n && ko.args.a === T(r.n), `${w}: ${r.n} is ${ko.args.a} + ${ko.args.b}`);
  } else {
    C.stretch(st, true);
    ok(C.check(st).result === 'none' && C.hint(st).key === 'hintTogether' && st.misses === 0, `${w}: built but stretched → hintTogether, no miss`);
    ok(C.stretch(st, false) === 'together', `${w}: pushed together`);
    const ko = (C.check(st), C.okOf(st)); ok(st.done && ko.key === 'okTogether' && ko.args.a + ko.args.b === r.n, `${w}: ${ko.args.a} + ${ko.args.b} is ${r.n}`);
  }
  const s2 = C.newState(r); C.placeTens(s2, r.tens); C.placeOnes(s2, r.ones === 9 ? 8 : r.ones + 1); C.stretch(s2, true);
  ok(C.check(s2).result === 'miss' && C.hint(s2).key === 'hintCubes', `${w}: a wrong ones card is a miss, hintCubes`);
}

/* ---- which ---- */
for (const rg of C.RANGES) for (const id of C.ids('which', rg)) for (let code = 0; code < 6; code++) {
  const r = C.round('which', rg, id), w = `which ${rg} ${r.n} code ${code}`, st = C.newState(r, code);
  const vals = st.trays.map(t => t.rods * 10 + t.cubes);
  ok(vals.filter(v => v === r.n).length === 1 && st.rightPos === code % 3 && vals[code % 3] === r.n, `${w}: exactly one right tray, at ${code % 3}`);
  ok(new Set(vals).size === 3 && st.trays.every(t => t.rods + t.cubes > 0 && t.rods <= 9 && t.cubes <= 9), `${w}: three different, non-empty trays`);
  const rev = st.trays.find(t => t.rods === r.ones && t.cubes === r.tens / 10); ok(!!rev, `${w}: the reversal is among the trays`);
  ok(C.value(st) === r.n && C.placeOnes(st, 3) === 'no' && C.lift(st, 't') === 'no', `${w}: the stack is given and fixed`);
  ok(C.check(st).result === 'none' && C.hint(st).key === 'hintPickTray', `${w}: no tray → hintPickTray`);
  const wrongs = [0, 1, 2].filter(i => i !== st.rightPos);
  C.pickTray(st, wrongs[0]); ok(C.check(st).result === 'miss' && st.lastTray === wrongs[0] && st.tray === null && C.hint(st).key === 'hintWhich1', `${w}: wrong tray → miss, hintWhich1`);
  C.pickTray(st, wrongs[1]); C.check(st); ok(C.hint(st).key === 'hintWhich2' && st.misses === 2, `${w}: second wrong tray → hintWhich2`);
  C.pickTray(st, st.rightPos); ok(C.check(st).result === 'ok' && st.done, `${w}: the right tray`);
  const cmp = C.compare(C.blocks(st), st.trays[wrongs[0]]); ok(!cmp.match && cmp.extra.rods + cmp.extra.cubes + cmp.missing.rods + cmp.missing.cubes > 0, `${w}: the comparison marks a difference`);
}

/* ---- the plan ---- */
let seed = 7; const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
for (const f of C.FACES) for (const rg of C.RANGES) {
  let prev = null, diff = 0, swaps = 0;
  for (let k = 0; k < 60; k++) {
    const p = C.plan(f, rg, rnd, prev), ids = C.ids(f, rg);
    ok(p.order.length === ids.length && new Set(p.order).size === ids.length && p.order.every(x => ids.indexOf(x) >= 0), `${f} ${rg} plan ${k}: a permutation`);
    ok(!prev || p.order.join() !== prev.join(), `${f} ${rg} plan ${k}: never the previous order`);
    ok(C.orderOk(f, rg, p.order), `${f} ${rg} plan ${k}: order rules`);
    if (f === 'which') {
      const pos = p.order.map(id => p.pos[id] % 3), c = [0, 1, 2].map(x => pos.filter(y => y === x).length);
      let rep = 0; for (let i = 1; i < pos.length; i++) if (pos[i] === pos[i - 1]) rep++;
      ok(c.every(x => x === pos.length / 3) && rep <= 1, `which ${rg} plan ${k}: right tray ${c.join('/')} with ${rep} repeat(s)`);
      swaps += p.order.filter(id => p.pos[id] >= 3).length;
    }
    if (prev && p.order[0] !== prev[0]) diff++;
    prev = p.order;
  }
  ok(diff >= 20, `${f} ${rg}: the first round varies across passes (${diff}/59)`);
  if (f === 'which') ok(swaps > 150 && swaps < 390, `which ${rg}: the two wrong trays swap places (${swaps}/540)`);
}

/* the guard against repeating a pass: replay the SAME seed with the previous order — the shuffle then reproduces it, and the plan must refuse it */
const mk = (sd) => () => { sd = (sd * 16807) % 2147483647; return (sd - 1) / 2147483646; };
for (const f of C.FACES) for (const rg of C.RANGES) for (const sd of [3, 11, 29]) { const p1 = C.plan(f, rg, mk(sd)), p2 = C.plan(f, rg, mk(sd), p1.order); ok(p2.order.join() !== p1.order.join(), `${f} ${rg} seed ${sd}: the same seed after the same order gives a new order`); }

/* ---- words + strings ---- */
for (const l of LOCS) { let bad = 0; for (let n = 1; n <= 99; n++) if (A.WORDS[l][n] !== NW.numberWord(n, l)) bad++; ok(bad === 0, `${l}: number words equal the shared table (${bad} differ)`); }
const S = A.strings, keys = Object.keys(S);
for (const k of keys) {
  ok(LOCS.every(l => typeof S[k][l] === 'string' && S[k][l].length > 0), `${k}: 11 locales`);
  const ph = (s) => (s.match(/\{\w+\}/g) || []).sort().join();
  ok(LOCS.every(l => ph(S[k][l]) === ph(S[k].en)), `${k}: the same placeholders in every locale`);
  if (/^hint/.test(k)) ok(!/\{\w+\}/.test(S[k].en) && LOCS.every(l => !/[1-9]/.test(S[k][l])), `${k}: a hint names no number (the card's 0 is a face, not an answer)`);
}
/* reached = named in the activity body or returned by the core */
const body = SRC.slice(SRC.indexOf('/*STRINGS-END*/')) + fs.readFileSync(CORE, 'utf8');
const SHELL = { instrBubble: 'promptKey (shell)', okBubble: 'celebrateKey (shell)', title: 'shell title', taskBuild: 'kid_prompt_template in the manifest (kept)' };
for (const k of keys) ok(SHELL[k] || body.indexOf("'" + k + "'") >= 0, `${k}: reached by the activity`);
/* hint keys the core can return all exist */
for (const k of ['hintEmpty', 'hintPickTray', 'hintStretch', 'hintTogether', 'hintRods', 'hintCubes', 'hintGhost', 'hintTensCount', 'hintWhich1', 'hintWhich2', 'okBuild', 'okBuild0', 'okApart', 'okTogether']) ok(!!S[k], `string ${k} exists`);

console.log(`verify-zero-cards-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
