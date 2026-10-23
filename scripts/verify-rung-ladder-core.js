#!/usr/bin/env node
/* verify-rung-ladder-core.js — #87 THE RUNG LADDER (1.OA.D.7), its OWN oracle.
   Ground truth is the design sheet's table (designs/087-match-pairs.md §6), typed in here and
   re-solved, never read off the core: every value recomputed; no 0 anywhere; each addition has
   exactly ONE equal subtraction (Same answer) / ONE inverse (Undo it: a + b ↔ (a + b) − b); the
   climb for EVERY addition × subtraction of every round (done iff equal values / equal seams;
   rungs = the first failing height − 1; open = the difference); the rails as holes; selection rules
   (two of a kind is not a miss, a stop is); the round completes only with every card climbed; the
   tags; the guessers named by the design (partner in the same grid row ≤ 40 %, "same first number"
   ≤ 20 %, "biggest with biggest" fails in ≥ 6 rounds); the plan; the pictures.
   Usage: node scripts/verify-rung-ladder-core.js */
'use strict';
const path = require('path'), fs = require('fs');
const C = require(path.join(process.env.RL_CORE_DIR || path.join(__dirname, '..', 'mini tools'), 'rung-ladder-core.js'));
let pass = 0, fail = 0; const fails = [];
function ok(c, m) { if (c) pass++; else { fail++; if (fails.length < 40) fails.push(m); } }

/* the design's table: [additions, subtractions, the values of the pairs] */
const DESIGN = [
  ['2+3 3+4', '9-4 9-2', [5, 7]], ['1+3 2+6', '5-1 10-2', [4, 8]], ['1+2 2+4', '6-3 8-2', [3, 6]], ['4+5 1+4', '10-1 7-2', [9, 5]],
  ['1+5 4+6', '9-3 12-2', [6, 10]], ['2+5 2+2', '10-3 7-3', [7, 4]], ['2+1 3+5 3+7', '5-2 9-1 13-3', [3, 8, 10]],
  ['4+1 3+3 3+6', '8-3 10-4 12-3', [5, 6, 9]], ['4+4 2+1', '12-4 4-1', [8, 3]], ['5+5 1+6', '13-3 8-1', [10, 7]],
  ['2+7 4+2', '11-2 10-4', [9, 6]], ['1+3 5+2 6+3', '9-5 12-5 13-4', [4, 7, 9]], ['8+2 2+3', '14-4 6-1', [10, 5]],
  ['1+7 2+4', '11-3 7-1', [8, 6]], ['1+4 2+6 1+2', '10-5 10-2 8-5', [5, 8, 3]], ['4+3 4+5', '9-2 10-1', [7, 9]],
  ['5+1 6+4', '8-2 12-2', [6, 10]], ['2+2 3+4 5+4', '6-2 10-3 11-2', [4, 7, 9]]
];
const FAMS = [[3, 5], [4, 6], [2, 7], [1, 6], [3, 4], [2, 6], [6, 8], [7, 9], [5, 8], [4, 7]];
const ev = s => { const m = /^(\d+)([+-])(\d+)$/.exec(s); return { op: m[2], a: +m[1], b: +m[3], v: m[2] === '+' ? +m[1] + +m[3] : +m[1] - +m[3] }; };

ok(C.ids('same').length === 18 && C.ids('undo').length === 10, 'round counts 18 + 10');
C.ids('same').forEach(i => {
  const r = C.round('same', i), [as, ss, vals] = DESIGN[i], tag = `same#${i}`;
  const adds = as.split(' ').map(ev), subs = ss.split(' ').map(ev);
  ok(r.cards.length === adds.length + subs.length, `${tag}: ${r.cards.length} cards`);
  const mine = r.cards.map(c => (c.kind === 'add' ? '+' : '-') + c.a + ',' + c.b).sort().join(' '), theirs = adds.concat(subs).map(e => e.op + e.a + ',' + e.b).sort().join(' ');
  ok(mine === theirs, `${tag}: the cards are the design's`);
  ok(adds.concat(subs).every(e => e.a >= 1 && e.b >= 1 && e.v >= 1), `${tag}: no 0 anywhere`);
  ok(adds.map(e => e.v).sort().join() === vals.slice().sort().join() && subs.map(e => e.v).sort().join() === vals.slice().sort().join(), `${tag}: the pair values are ${vals}`);
  ok(new Set(vals).size === vals.length, `${tag}: every value once — one partner each`);
  r.cards.forEach(c => { const p = C.partnerOf(r, c.id), pc = C.card(r, p); ok(pc && pc.kind !== c.kind && C.value(pc) === C.value(c) && C.partnerOf(r, p) === c.id, `${tag}: ${C.text(c)} has exactly one partner`); });
});
C.ids('undo').forEach(i => {
  const r = C.round('undo', i), [a, b] = FAMS[i], w = a + b, tag = `undo#${i}`;
  ok(r.w === w && a !== b && r.cards.length === 4, `${tag}: one family {${a}, ${b}, ${w}}, a ≠ b`);
  const want = [`+${a},${b}`, `+${b},${a}`, `-${w},${b}`, `-${w},${a}`].sort().join(' ');
  ok(r.cards.map(c => (c.kind === 'add' ? '+' : '-') + c.a + ',' + c.b).sort().join(' ') === want, `${tag}: the four facts`);
  r.cards.forEach(c => ok(C.rail(c, 'undo').length === w, `${tag}: every rail is ${w} tall`));
  r.cards.filter(c => c.kind === 'add').forEach(c => { const p = C.card(r, C.partnerOf(r, c.id)); ok(p.a === c.a + c.b && p.b === c.b, `${tag}: ${C.text(c)} ↔ ${C.text(p)} (takes away the part added last)`); });
  ok(C.tag(r, [r.cards[0].id, C.partnerOf(r, r.cards[0].id)]) === `${a} + ${b} = ${w} · ${w} − ${b} = ${a}`, `${tag}: the tag reads both facts`);
});
/* the climb, for every addition × subtraction */
for (const L of C.LEVELS) for (const i of C.ids(L)) {
  const r = C.round(L, i);
  for (const A of r.cards.filter(c => c.kind === 'add')) for (const S of r.cards.filter(c => c.kind === 'sub')) {
    const res = C.climb(r, A.id, S.id), tag = `${L}#${i} ${C.text(A)} | ${C.text(S)}`;
    const ra = C.rail(A, L), rs = C.rail(S, L);
    if (L === 'same') {
      const va = A.a + A.b, vs = S.a - S.b;
      ok(ra.length === va && rs.length === vs, `${tag}: rails ${va} and ${vs} holes (the sawn top is gone)`);
      ok(res.done === (va === vs) && res.rungs === Math.min(va, vs) && res.open === Math.abs(va - vs) && (res.done || res.side === (va > vs ? 'add' : 'sub')), `${tag}: climb done=${res.done} rungs=${res.rungs} open=${res.open}`);
    } else {
      const seamA = A.a, seamS = S.a - S.b;
      ok(ra.slice(0, seamA).every(k => k === 'p') && ra.slice(seamA).every(k => k === 'q') && rs.slice(0, seamS).every(k => k === 'p') && rs.slice(seamS).every(k => k === 'g'), `${tag}: the colour seams at ${seamA} and ${seamS}`);
      ok(res.done === (seamA === seamS) && (res.done || res.rungs === Math.min(seamA, seamS)) && res.open === Math.abs(seamA - seamS) && (res.done || res.side === (seamA > seamS ? 'add' : 'sub')), `${tag}: climb by the seam`);
    }
  }
  ok(C.climb(r, r.cards[0].id, r.cards[0].id) === null, `${L}#${i}: a card cannot climb with itself`);
}
/* selection, misses, completion, tags */
for (const L of C.LEVELS) for (const i of C.ids(L)) {
  const r = C.round(L, i), st = C.newState(r), tag = `${L}#${i}`;
  const adds = r.cards.filter(c => c.kind === 'add'), subs = r.cards.filter(c => c.kind === 'sub');
  ok(C.select(st, adds[0].id) === 'lift' && C.select(st, adds[1].id) === 'kind' && st.misses === 0 && C.hint(st) === 'hKind', `${tag}: two additions are not a miss`);
  ok(C.select(st, adds[1].id) === 'drop' && st.selected === null, `${tag}: tapping the lifted card drops it`);
  const wrong = subs.find(s => s.id !== C.partnerOf(r, adds[0].id));
  C.select(st, adds[0].id); ok(C.select(st, wrong.id) === 'pair' && st.pending, `${tag}: an addition + a subtraction make a ladder`);
  const res = C.go(st); ok(!res.done && st.misses === 1 && st.climbed.length === 0 && C.hint(st) === (L === 'undo' ? 'hColour' : 'hMore') && st.last.k === res.open, `${tag}: a stopped climb is a miss`);
  C.select(st, adds[0].id); C.select(st, wrong.id); C.go(st); ok(st.misses === 2 && C.hint(st) === (L === 'undo' ? 'hSeam' : 'hLook'), `${tag}: miss 2`);
  ok(C.go(st) === null, `${tag}: no climb without a ladder`);
  { const s3 = C.newState(r); C.select(s3, adds[0].id); C.select(s3, wrong.id); C.go(s3); C.select(s3, adds[1].id); ok(C.hint(s3) === null && s3.show === 0, `${tag}: the next tap clears the stopped ladder's help`); }
  { const s4 = C.newState(r); s4.done = true; ok(C.select(s4, adds[0].id) === null && s4.selected === null, `${tag}: a finished round takes no taps`); }
  C.select(st, adds[0].id); C.select(st, subs[0].id); ok(C.cancel(st) && !st.pending, `${tag}: a pending ladder can be cancelled`);
  adds.forEach((A, k) => { ok(!st.done, `${tag}: not complete with ${k} ladders`); C.select(st, A.id); C.select(st, C.partnerOf(r, A.id)); const g = C.go(st); ok(g.done, `${tag}: ${C.text(A)} climbs`); });
  ok(st.done && st.climbed.length * 2 === r.cards.length, `${tag}: complete only with every card climbed`);
  if (L === 'same') st.climbed.forEach(p => ok(C.tag(r, p) === C.text(C.card(r, p[0])) + ' = ' + C.text(C.card(r, p[1])), `${tag}: the tag is "{add} = {sub}"`));
  ok(C.select(st, adds[0].id) === null, `${tag}: locked when complete`);
  const s2 = C.newState(r); C.select(s2, adds[0].id); C.select(s2, C.partnerOf(r, adds[0].id)); C.go(s2);
  ok(C.select(s2, adds[0].id) === null && C.unfold(s2, 0) && s2.climbed.length === 0 && C.select(s2, adds[0].id) === 'lift', `${tag}: a finished ladder can be taken apart`);
}
/* the guessers the design names */
{
  let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  let rowHits = 0, rowN = 0;
  for (let k = 0; k < 10000; k++) for (const L of C.LEVELS) { const ids = C.ids(L), r = C.round(L, ids[k % ids.length]); if (r.cards.length !== 4) continue; const g = C.grid(r, rnd);
    r.cards.forEach(c => { const p = C.partnerOf(r, c.id), a = g.indexOf(c.id), b = g.indexOf(p); rowN++; if (Math.floor(a / 2) === Math.floor(b / 2)) rowHits++; }); }
  ok(rowHits / rowN <= 0.40, `the partner shares a grid row in ${(100 * rowHits / rowN).toFixed(1)} % (≤ 40 %)`);
  /* the design's guessers, as the design defines them: the SAME FIRST NUMBER, and the biggest (first) number with the biggest */
  let first = 0, firstN = 0, bigFails = 0, shared = 0, sharedFired = 0;
  C.ids('same').forEach(i => { const r = C.round('same', i), adds = r.cards.filter(c => c.kind === 'add'), subs = r.cards.filter(c => c.kind === 'sub');
    adds.forEach(A => { firstN++; const pick = subs.find(S => S.a === A.a); if (pick && pick.id === C.partnerOf(r, A.id)) first++;
      const sh = subs.find(S => S.b === A.a); if (sh) { sharedFired++; if (sh.id === C.partnerOf(r, A.id)) shared++; } });
    const big = c => c.a, sa = adds.slice().sort((x, y) => big(y) - big(x)), ss = subs.slice().sort((x, y) => big(y) - big(x));
    if (sa.some((A, k) => C.partnerOf(r, A.id) !== ss[k].id)) bigFails++; });
  ok(first / firstN <= 0.20, `"the same first number" finds the partner ${(100 * first / firstN).toFixed(1)} % (≤ 20 %)`);
  ok(bigFails >= 6, `"biggest with biggest" fails in ${bigFails} rounds (≥ 6)`);
  /* a RATCHET (measured 2026-10-23 on the 18 kept card sets, may only shrink): "the subtraction takes away the addition's first number" (9 − 2 with 2 + …) is right 12 of 20 times it applies */
  ok(sharedFired <= 20 && shared <= 12, `ratchet: the shared-number guess is right ${shared}/${sharedFired} times (≤ 12/20)`);
}
/* the plan */
for (const L of C.LEVELS) {
  let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647; let prev = null;
  for (let k = 0; k < 2000; k++) { const o = C.plan(L, rnd, prev).order; ok(o.slice().sort((a, b) => a - b).join() === C.ids(L).join() && (!prev || prev.join() !== o.join()), `${L} plan: a new permutation`); prev = o; }
}
/* the plan never replays the order it was handed: the SAME random stream that made it must give another */
for (const L of C.LEVELS) for (const sd of [3, 5, 9, 13]) {
  const mk = () => { let seed = sd; return () => (seed = (seed * 16807) % 2147483647) / 2147483647; };
  const o1 = C.plan(L, mk(), null).order, o2 = C.plan(L, mk(), o1).order;
  ok(o2.join() !== o1.join(), `${L} plan (seed ${sd}): handed its own order, it gives another`);
}
/* the pictures */
const pic = (theme, key, dir) => fs.readFileSync(path.join(__dirname, '..', 'mini tools', 'pictures', theme + '.json'), 'utf8').indexOf('"' + key + '":{"key":"' + key + '"') >= 0 && fs.existsSync(path.join(__dirname, '..', 'image-library-webp', 'themes', dir, key + '@2x.webp'));
ok(pic('forest-creatures', 'squirrel', 'forest creatures') && pic('miscellaneous', 'acorn', 'miscellaneous'), 'the squirrel and the acorn are colour library pictures');
ok(C.layout(704).mode === 'wide' && C.layout(619).mode === 'narrow' && C.locale('xx') === 'en' && C.LOCALES.length === 11, 'layout + locales');
console.log(`verify-rung-ladder-core: ${pass} pass, ${fail} fail`);
fails.forEach(f => console.log('  FAIL: ' + f));
process.exit(fail ? 1 : 0);
