#!/usr/bin/env node
/* verify-sunken-stones-core.js — #86 THE SUNKEN STONES (1.OA.C.6), its OWN oracle.
   Ground truth is the design sheet's tables (designs/086-ten-stones.md §6, with this build's two
   Adding-level changes), typed in here and re-derived, never read off the core:
   answers within 1..20, never the start or the rope; from every start EVERY leap length is tried —
   a leap across ten splashes, a leap onto ten lands and raises the far side, after ten nothing
   splashes; EVERY way of emptying the rope is enumerated, and in a crossing round the only ones the
   water allows start with exactly the distance to ten (no-crossing rounds allow any split); a leap
   is never longer than the beads left; bank rounds finish only on 20 and past 20 is the reeds;
   choose-start rounds accept both starts; splashes are never misses; the keys sleep until the
   rope is empty; the plan keeps answers apart and runs of + or − at most 2; the frog is a colour
   library picture.
   Usage: node scripts/verify-sunken-stones-core.js [--poison=<name>] */
'use strict';
const path = require('path'), fs = require('fs');
const C = require(path.join(process.env.SK_CORE_DIR || path.join(__dirname, '..', 'mini tools'), 'sunken-stones-core.js'));
const POISON = (process.argv.find(a => a.startsWith('--poison=')) || '').slice(9);
let pass = 0, fail = 0; const fails = [];
function ok(c, m) { if (c) pass++; else { fail++; if (fails.length < 40) fails.push(m); } }
/* no in-memory poisons: the core calls its own internals, so patching an export proves nothing — mutate-sunken-stones.js edits the source instead */

/* [kind, start/a, b, answer] as the design sheet states them */
const DESIGN = {
  both: [['add', 8, 6, 14], ['add', 7, 5, 12], ['add', 6, 3, 9], ['add', 9, 4, 13], ['anchor', 3, 8, 11], ['anchor', 9, 2, 11], ['add', 6, 7, 13],
    ['sub', 13, 4, 9], ['sub', 15, 7, 8], ['sub', 12, 5, 7], ['sub', 14, 6, 8], ['sub', 16, 4, 12], ['sub', 11, 4, 7], ['bank', 14, null, 6], ['bank', 15, null, 5], ['bank', 5, null, 15]],
  add: [['add', 8, 6, 14], ['add', 7, 5, 12], ['add', 6, 3, 9], ['add', 9, 4, 13], ['anchor', 3, 8, 11], ['add', 6, 7, 13], ['add', 9, 7, 16], ['add', 7, 8, 15], ['anchor', 5, 9, 14], ['bank', 8, null, 12]]
};
/* every composition of n into parts of size ≤ cap */
function comps(n, cap) { if (n === 0) return [[]]; const out = []; for (let k = 1; k <= Math.min(n, cap); k++) comps(n - k, cap).forEach(c => out.push([k].concat(c))); return out; }

for (const L of C.LEVELS) {
  const ids = C.ids(L), answers = {};
  ok(ids.length === DESIGN[L].length && ids.length >= 7, `${L}: ${ids.length} rounds = the design's`);
  ids.forEach(i => {
    const r = C.round(L, i), [k, a, b, ans] = DESIGN[L][i], tag = `${L}#${i} ${k} ${a}${b == null ? '' : (k === 'sub' ? '−' : '+') + b}`;
    ok(r.kind === k && r.a === a && (b == null || r.b === b) && r.answer === ans, `${tag}: the round is the design's (answer ${r.answer} = ${ans})`);
    const want = k === 'bank' ? 20 - a : k === 'sub' ? a - b : a + b;
    ok(r.answer === want && want >= 1 && want <= 20, `${tag}: the answer is ${want}, within 1..20`);
    ok(r.answer !== a && (b == null || r.answer !== b), `${tag}: the answer is neither the start nor the rope`);
    answers[r.answer] = (answers[r.answer] || 0) + 1;
    ok(!(k !== 'bank' && a === b), `${tag}: no doubles round`);
    for (const s of r.starts) {
      const rope = k === 'bank' ? null : (k === 'anchor' ? (s === a ? b : a) : b), dir = k === 'sub' ? -1 : 1;
      const end = k === 'bank' ? 20 : s + dir * rope, crosses = (s < 10 && end > 10) || (s > 10 && end < 10);
      /* every single leap from the start */
      const maxL = k === 'bank' ? 10 : rope;
      for (let n = 1; n <= maxL + 1; n++) {
        const st = C.newState(r); if (k === 'anchor') ok(C.chooseStart(st, s), `${tag}: start ${s} accepted`);
        const t = s + dir * n, res = C.leap(st, n);
        let exp;
        if (n > maxL) exp = 'rope';
        else if (t > 20 || t < 0) exp = 'reeds';
        else if ((s < 10 && t > 10) || (s > 10 && t < 10)) exp = 'splash';
        else exp = t === 10 ? 'ten' : 'land';
        ok(res === exp, `${tag} from ${s}: a leap of ${n} → ${res} = ${exp}`);
        if (exp === 'splash' || exp === 'rope' || exp === 'reeds') ok(st.lily === s && st.misses === 0 && st.leaps.length === 0, `${tag} from ${s}: a ${exp} changes nothing and is no miss`);
        if (exp === 'ten') { ok(st.tenVisited, `${tag}: ten raises the far side`); for (let m = 0; m <= 20; m++) ok(!C.sunken(st, m), `${tag}: after ten, stone ${m} is up`); }
      }
      /* every way of emptying the rope (or reaching the bank) */
      const total = k === 'bank' ? 20 - s : rope, all = comps(total, k === 'bank' ? 10 : total);
      const allowed = all.filter(seq => { let p = s, ten = false; for (const n of seq) { const t = p + dir * n; if (!ten && ((p < 10 && t > 10) || (p > 10 && t < 10))) return false; p = t; if (p === 10) ten = true; } return true; });
      if (crosses) {
        const d = Math.abs(10 - s);
        ok(allowed.length > 0 && allowed.every(seq => seq.slice(0, seq.length).reduce((acc, n, idx) => acc.concat(acc[idx] + n), [0]).indexOf(d) >= 0), `${tag} from ${s}: every allowed path stops on ten`);
        ok(allowed.every(seq => { let acc = 0; for (const n of seq) { acc += n; if (acc === d) return true; if (acc > d) return false; } return false; }), `${tag} from ${s}: no allowed path jumps over ten`);
        ok(JSON.stringify(C.forcedSplit(r, s)) === JSON.stringify(k === 'bank' ? [d, 10] : [d, total - d]), `${tag} from ${s}: the forced split is (${d}, ${total - d})`);
      } else ok(allowed.length === all.length, `${tag} from ${s}: no crossing — every split is allowed`);
      /* a model run along each allowed path finishes on the answer stone */
      for (const seq of allowed.slice(0, 40)) {
        const st = C.newState(r); if (k === 'anchor') C.chooseStart(st, s);
        seq.forEach(n => C.leap(st, n));
        ok(C.finished(st) && st.lily === (k === 'bank' ? 20 : r.answer) && (k === 'bank' || st.rope === 0), `${tag} from ${s} via ${seq}: finished on ${st.lily}`);
        if (crosses) for (let m = 0; m <= 20; m++) ok(!C.sunken(st, m), `${tag} from ${s} via ${seq}: once past ten no stone is sunk (${m})`);
      }
    }
    if (k === 'anchor') { const st = C.newState(r); ok(st.lily == null && C.check(st).reason === 'pick' && C.hint(st) === 'hPick', `${tag}: before a start is chosen the tick asks for one`); ok(!C.chooseStart(st, 4) || r.starts.indexOf(4) >= 0, `${tag}: only the two starts are accepted`); }
    /* keys, the check, the misses */
    const st = C.newState(r); if (k === 'anchor') C.chooseStart(st, Math.max(a, b));
    ok(C.type(st, '1') === false, `${tag}: the keys sleep until Lily is done`);
    ok(!C.check(st).ok && st.misses === 0 && C.hint(st) === (k === 'bank' ? 'hBankGo' : 'hRope'), `${tag}: the tick before the end is a hint`);
    C.forcedSplit(r, st.start).forEach(n => C.leap(st, n));
    ok(C.finished(st), `${tag}: the forced split finishes`);
    ok(C.type(st, '0') === false, `${tag}: a leading 0 is refused`);
    { const s2 = C.newState(r); if (k === 'anchor') C.chooseStart(s2, s2.r.starts[0]); C.forcedSplit(r, s2.start).forEach(n => C.leap(s2, n));
      for (const bad of [s2.lily, s2.start]) if (bad !== r.answer) { s2.typed = ''; String(bad).split('').forEach(d => C.type(s2, d)); ok(!C.check(s2).ok, `${tag}: typing ${bad} (${bad === s2.lily ? 'Lily stone' : 'the start'}) is not the answer`); } }
    /* the tap path: a stone ahead is a leap, a stone behind or the same stone does nothing */
    { const s3 = C.newState(r); if (k === 'anchor') C.chooseStart(s3, s3.r.starts[0]); const from = s3.lily, d1 = C.forcedSplit(r, from)[0];
      ok(C.leapTo(s3, from - r.dir * 1) === null && C.leapTo(s3, from) === null && s3.lily === from, `${tag}: a tap behind Lily or on her stone does nothing`);
      ok(C.leapTo(s3, from + r.dir * d1) !== null && s3.lily === from + r.dir * d1 && s3.leaps[0] === d1, `${tag}: a tap ${d1} ahead leaps ${d1}`); }
    ok(!C.check(st).ok && st.misses === 0, `${tag}: an empty box is a hint`);
    String(r.answer + 1).split('').forEach(d => C.type(st, d));
    ok(!C.check(st).ok && st.misses === 1, `${tag}: a wrong answer is a miss`);
    const via = C.viaTen(st), h1 = C.hint(st);
    ok(h1 === (k === 'bank' ? 'hBankMiss' : via ? (r.dir > 0 ? 'hOn' : 'hBack') : 'hNear'), `${tag}: miss-1 hint ${h1}`);
    st.typed = ''; String(r.answer === 1 ? 2 : r.answer - 1).split('').forEach(d => C.type(st, d)); C.check(st);
    ok(C.hint(st) === (k === 'bank' ? 'hBankMiss' : via ? (r.dir > 0 ? 'hTenOn' : 'hTenBack') : 'hNear') && st.show === 2, `${tag}: miss-2 hint`);
    C.type(st, 'del'); ok(st.show === 0 && C.hint(st) === null, `${tag}: a key press takes the help away`);
    st.typed = ''; String(r.answer).split('').forEach(d => C.type(st, d)); ok(C.check(st).ok && st.done, `${tag}: the answer succeeds`);
    ok(C.leap(st, 1) === null && C.undo(st) === false, `${tag}: locked when done`);
    /* undo walks back */
    const u = C.newState(r); if (k === 'anchor') C.chooseStart(u, a); const sp = C.forcedSplit(r, u.start); C.leap(u, sp[0]); ok(C.undo(u) && u.lily === u.start && u.leaps.length === 0 && (u.rope == null || u.rope === C.ropeFor(r, u.start)) && u.tenVisited === (u.start === 10), `${tag}: undo puts Lily and the beads back`);
  });
  if (L === 'both') {
    ok(Object.values(answers).every(n => n <= 2), `both: no answer more than twice ${JSON.stringify(answers)}`);
    const firsts = C.ids('both').map(i => C.round('both', i)).filter(r => r.kind === 'add').map(r => C.forcedSplit(r, r.a)).filter(s => s.length === 2).map(s => s[0]);
    ok(new Set(firsts).size >= 3, `both: the first leap is not always the same length ${firsts}`);
  } else ok(Object.values(answers).every(n => n <= 2), `add: no answer more than twice ${JSON.stringify(answers)}`);
}
/* plan */
for (const L of C.LEVELS) {
  let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647; let prev = null;
  for (let k = 0; k < 2000; k++) {
    const o = C.plan(L, rnd, prev).order; let adj = false, run = 1, maxRun = 1;
    for (let q = 1; q < o.length; q++) { const x = C.round(L, o[q]), y = C.round(L, o[q - 1]); if (x.answer === y.answer) adj = true; run = x.op === y.op ? run + 1 : 1; maxRun = Math.max(maxRun, run); }
    ok(o.slice().sort((a, b) => a - b).join() === C.ids(L).join() && !adj, `${L} plan: a permutation, no equal answers side by side`);
    if (L === 'both') ok(maxRun <= 2, `both plan: runs of + or − at most 2 (${maxRun})`);
    ok(!prev || prev.join() !== o.join(), `${L} plan differs from the previous pass`);
    prev = o;
  }
  for (let s0 = 1; s0 <= 60; s0++) { const mk = () => { let z = s0 * 7919; return () => (z = (z * 16807) % 2147483647) / 2147483647; }; const o1 = C.plan(L, mk(), null).order, o2 = C.plan(L, mk(), o1).order; ok(o1.join() !== o2.join(), `${L} seed ${s0}: a replayed seed gives a new order`); }
}
/* the frog is a colour library picture */
const pets = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'mini tools', 'pictures', 'pets.json'), 'utf8'));
const frog = JSON.stringify(pets).indexOf('"frog":{"key":"frog"') >= 0 || (pets.items && pets.items.frog);
ok(!!frog && fs.existsSync(path.join(__dirname, '..', 'image-library-webp', 'themes', 'pets', 'frog@2x.webp')), 'the frog is pets/frog, a colour theme, and its picture exists');
/* the window on phones always holds ten and both ends */
for (const L of C.LEVELS) for (const i of C.ids(L)) { const r = C.round(L, i), w = C.reach(r); ok(w.lo <= 10 && w.hi >= 10 && r.starts.every(s => s >= w.lo && s <= w.hi) && r.end >= w.lo && r.end <= w.hi, `${L}#${i}: the phone window holds ten, the starts and the end`); }
ok(C.layout(704).mode === 'wide' && C.layout(619).mode === 'narrow' && C.locale('xx') === 'en' && C.LOCALES.length === 11, 'layout + locales');
console.log(`verify-sunken-stones-core: ${pass} pass, ${fail} fail${POISON ? ' (poison=' + POISON + ')' : ''}`);
fails.forEach(f => console.log('  FAIL: ' + f));
process.exit(fail ? 1 : 0);
