#!/usr/bin/env node
/* =====================================================================
   verify-bond-basket-core.js — the build gate of ACTIVITY #81, The Covered
   Basket ("Find the Total", 1.OA.A.1). It keeps its OWN ground truth — a
   hand-typed table of every round of every face, and its own rule for what
   Check must say — and never reads an expectation off the core. It proves:
     (a) the rounds: the core's rounds equal the gate's table; no part is 0;
         every total ≤ 20 (bonds and make-the-whole ≤ 10); every face ≥ 7
         rounds and ≥ 7 different answers; in "find the total" the bowl with
         more alternates (left 4, right 5, equal 1);
     (b) the hand: a pour only into the empty basket (never in make-the-
         whole), the cloth's number = the poured bowl's count, a post only
         after a pour and only while things wait, make-the-whole refuses a
         post past the whole ("full") without counting it, "empty" restores;
     (c) Check, exhaustively — every round × either pour × every number of
         posts × every typed value 0–20 and nothing typed: nothing poured /
         still waiting / nothing typed are hints (no miss); the answer is
         right IFF typed = total (make-the-whole: whole − given); a wrong
         answer is miss 1 then miss 2; make-the-whole miss 1 below the whole
         says "full at"; the miss-1 arc starts ONE AFTER the cloth;
     (d) the deal: every round once per pass, never the order just played
         (the same random stream handed back);
     (e) the coats: pictures only while they fit the bowl (6 at 704, 4 on a
         phone), dice faces sum to the part, each ≤ 6;
     (f) every picture kind exists in a colour theme and is none of the
         ruled-out drawings; the picture floor (96 px wide, 64 px phone).
   Usage: node scripts/verify-bond-basket-core.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const MT = path.join(__dirname, '..', 'mini tools');
const C = require(path.join(process.env.BB_CORE_DIR || MT, 'bond-basket-core.js'));   /* BB_CORE_DIR: the mutation harness points this at a mutated copy */
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('  FAIL: ' + m); } };

/* ---- the gate's own truth ---- */
const TABLE = {
  total: [[3, 4], [6, 2], [5, 5], [4, 7], [8, 3], [2, 7], [7, 5], [5, 8], [9, 6], [8, 9]],
  bonds: [[3, 2], [4, 2], [3, 4], [5, 3], [3, 6], [6, 4], [1, 5], [2, 2], [3, 5]],
  whole: [[10, 7], [10, 4], [10, 9], [10, 2], [10, 6], [5, 2], [6, 4], [7, 3], [8, 3], [9, 2]],
  to20: [[4, 10], [9, 7], [8, 9], [6, 9], [10, 9], [7, 6], [9, 9], [5, 8]]
};
const MAX = { total: 20, bonds: 10, whole: 10, to20: 20 };
const RULED_OUT = ['fruits/cherry', 'fruits/plum', 'fruits/peach', 'fruits/apricot', 'fruits/mango'];

/* (a) rounds */
is(C.FACES.join() === 'total,bonds,whole,to20', 'four faces');
for (const f of C.FACES) {
  const n = TABLE[f].length, rs = C.ids(f).map(i => C.round(f, i));
  is(rs.length === n && n >= 7, `${f}: ${rs.length} rounds = gate ${n} (≥ 7)`);
  rs.forEach((r, i) => {
    const [x, y] = TABLE[f][i];
    if (f === 'whole') {
      is(r.whole === x && r.given === y && r.answer === x - y, `${f}.${i}: ${r.whole} = ${r.given} + ${r.answer}`);
      is(r.given >= 1 && r.answer >= 1 && r.whole <= MAX[f], `${f}.${i}: no part 0, whole ≤ ${MAX[f]}`);
      is(r.tray === Math.min(10, r.answer + 2) && r.tray > r.answer, `${f}.${i}: the tray (${r.tray}) holds more than the answer`);
    } else {
      is(r.a === x && r.b === y && r.answer === x + y, `${f}.${i}: ${r.a} + ${r.b} = ${r.answer}`);
      is(r.a >= 1 && r.b >= 1 && r.a + r.b <= MAX[f], `${f}.${i}: no part 0, total ≤ ${MAX[f]}`);
    }
    is(C.DATA.KINDS.indexOf(r.kind) >= 0, `${f}.${i}: a kind from the list`);
  });
  is(new Set(rs.map(r => r.answer)).size >= 7, `${f}: ≥ 7 different answers (${[...new Set(rs.map(r => r.answer))]})`);
}
{ const b = TABLE.total.map(([a, c]) => a > c ? 'L' : c > a ? 'R' : 'E').join(''), got = C.ids('total').map(i => C.bigger(C.round('total', i))).join('');
  is(got === b && (b.match(/L/g) || []).length === 4 && (b.match(/R/g) || []).length === 5 && (b.match(/E/g) || []).length === 1, `total: the bowl with more alternates L4 R5 E1 (${got})`); }

/* (b) the hand */
for (const f of C.FACES) C.ids(f).forEach(i => {
  const r = C.round(f, i), tag = `${f}.${i}`;
  if (f === 'whole') {
    const st = C.newState(r);
    is(st.poured && st.under === r.given && st.left === r.tray, `${tag}: the cloth already holds ${r.given}, the tray ${r.tray}`);
    is(C.pour(st, 'L') === false && C.pour(st, 'R') === false, `${tag}: no pour in make-the-whole`);
    for (let k = 0; k < r.answer; k++) is(C.post(st) === true, `${tag}: post ${k + 1} goes in`);
    const before = st.posted; is(C.post(st) === 'full' && st.posted === before && st.left === r.tray - r.answer, `${tag}: a post past ${r.whole} rolls off, not counted`);
    is(C.runningCount(st) === r.whole, `${tag}: the basket is full at the whole`);
    is(C.empty(st) && st.posted === 0 && st.left === r.tray && st.under === r.given, `${tag}: empty puts the posted things back`);
    return;
  }
  for (const side of ['L', 'R']) {
    const st = C.newState(r), mine = side === 'L' ? r.a : r.b, other = side === 'L' ? r.b : r.a;
    is(C.post(st) === false, `${tag}: no post before a pour`);
    is(C.pour(st, side) === true && st.under === mine && st.left === other, `${tag} ${side}: the cloth shows ${mine}, ${other} wait`);
    is(C.pour(st, side === 'L' ? 'R' : 'L') === false, `${tag} ${side}: no second pour into a full basket`);
    is(st.smallerFirst === (mine < other), `${tag} ${side}: smaller-first ${mine < other}`);
    for (let k = 1; k <= other; k++) { is(C.post(st) === true && st.posted === k && st.left === other - k, `${tag} ${side}: post ${k}`); }
    is(C.post(st) === false, `${tag} ${side}: nothing left to post`);
    is(C.empty(st) && !st.poured && st.under === 0 && st.posted === 0, `${tag} ${side}: empty`);
  }
});

/* (c) Check, exhaustively */
function expectCheck(r, poured, posted, left, typed) {
  if (r.face !== 'whole') { if (!poured) return 'pour'; if (left > 0) return 'waiting'; }
  if (typed === '') return 'type';
  return +typed === r.answer ? 'ok' : 'miss';
}
for (const f of C.FACES) C.ids(f).forEach(i => {
  const r = C.round(f, i), sides = f === 'whole' ? [null] : [null, 'L', 'R'];
  for (const side of sides) {
    const nPost = f === 'whole' ? r.answer + 1 : side ? (side === 'L' ? r.b : r.a) : 0;
    for (let p = 0; p <= nPost; p++) for (const typed of [''].concat(Array.from({ length: 21 }, (x, k) => String(k)))) {
      const st = C.newState(r);
      if (side) C.pour(st, side);
      for (let k = 0; k < p; k++) C.post(st);
      typed.split('').forEach(d => C.type(st, d));
      const first = st.under, want = expectCheck(r, !!st.poured, st.posted, st.left, typed);
      const res = C.check(st), got = res.ok ? 'ok' : (res.reason === 'wrong' || res.reason === 'notFull') ? 'miss' : res.reason;
      if (got !== want) { is(false, `${f}.${i} ${side || '-'} posts ${p} typed «${typed}»: ${got}, gate ${want}`); continue; } PASS++;
      if (want === 'miss') {
        is(st.misses === 1 && st.show === 1, `${f}.${i}: a wrong answer is miss 1`);
        const arc = C.arc(st); is(arc.length === st.posted && (arc.length === 0 || arc[0] === first + 1) && arc.every((n, k) => n === first + 1 + k), `${f}.${i}: the arc starts one after ${first} (${arc})`);
        if (f === 'whole') is((st.under + st.posted < r.whole) === (res.reason === 'notFull'), `${f}.${i}: below the whole the miss says "full at"`);
        is(C.hint(st) === (f !== 'whole' ? 'hMiss1' : st.under + st.posted < r.whole ? 'hFull' : 'hMiss1w'), `${f}.${i}: miss-1 hint ${C.hint(st)} (make-the-whole never says "count on to the whole")`);
        C.check(st); is(st.misses === 2 && st.show === 2 && C.hint(st) === (f === 'whole' ? 'hMiss2w' : 'hMiss2'), `${f}.${i}: miss 2 lifts the cloth`);
      }
      if (want !== 'ok' && want !== 'miss') is(st.misses === 0 && !st.done, `${f}.${i}: a ${want} hint is no miss`);
    }
  }
});
/* typing: two digits at most, delete, a move hides the help */
{ const st = C.newState(C.round('total', 0)); C.type(st, '1'); C.type(st, '2'); is(C.type(st, '3') === false && st.typed === '12', 'two digits at most');
  C.type(st, 'del'); is(st.typed === '1', 'delete takes the last digit'); C.pour(st, 'L'); for (let k = 0; k < 4; k++) C.post(st); C.check(st); is(st.show === 1, 'miss 1 shows'); C.type(st, '7'); is(st.show === 0 && st.misses === 1, 'a new move hides the help, the miss stays'); }

/* (d) the deal */
for (const f of C.FACES) {
  let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  let prev = null;
  for (let pass = 0; pass < 40; pass++) { const p = C.plan(f, rnd, prev); is(p.order.length === TABLE[f].length && new Set(p.order).size === TABLE[f].length, `${f} pass ${pass}: every round once`); prev = p.order; }
  for (let sd = 1; sd <= 20; sd++) { const mk = () => { let x = sd * 7919; return () => (x = (x * 16807) % 2147483647) / 2147483647; }; const p1 = C.plan(f, mk(), null), p2 = C.plan(f, mk(), p1.order); is(p2.order.join() !== p1.order.join(), `${f} seed ${sd}: never the order just played`); }
}

/* (e) coats */
for (const W of [288, 328, 379, 560, 619, 620, 647, 755]) {
  const L = C.layout(W), cap = W >= 620 ? 6 : 4, pic = W >= 620 ? 96 : 64;
  is(L.cap === cap && L.pic === pic, `layout ${W}: ${cap} pictures of ${pic} px`);
  for (let n = 1; n <= 10; n++) is(C.coatFor('pictures', n, L.cap) === (n <= cap ? 'pictures' : 'frames') && C.coatFor('dots', n, L.cap) === 'dots' && C.coatFor('frames', n, L.cap) === 'frames', `layout ${W} part ${n}: coat`);
}
for (let n = 1; n <= 10; n++) { const d = C.dice(n); is(d.reduce((s, x) => s + x, 0) === n && d.every(x => x >= 1 && x <= 6) && d.length <= 2, `dice ${n} = ${d}`); }

/* (f) pictures */
const BW = /(^|[ _-])(bw|sw|bn|nb|zw|sh|pb|mv|sv)( \d+)?$/i;
for (const k of C.DATA.KINDS) {
  const [th, noun] = k.split('/'), pj = path.join(MT, 'pictures', th + '.json'), J = fs.existsSync(pj) ? JSON.parse(fs.readFileSync(pj, 'utf8')) : null, e = J && J.nouns[noun];
  is(RULED_OUT.indexOf(k) < 0, `${k}: not a ruled-out drawing`);
  is(!!e && C.LOCALES.every(l => e.labels[l] && e.labels[l][1]), `${k}: labelled with a plural in every locale`);
  is(!!e && fs.existsSync(path.join(__dirname, '..', decodeURIComponent(e.src))), `${k}: ${e && e.src} exists`);
  is(!!J && !BW.test(J.dir), `${k}: ${J && J.dir} is a colour theme`);
}

console.log(`verify-bond-basket-core: ${PASS} passed, ${FAIL} failed`);
process.exit(FAIL ? 1 : 0);
