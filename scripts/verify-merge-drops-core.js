#!/usr/bin/env node
/* verify-merge-drops-core.js — #83 THE MERGING DROPS (1.OA.A.2), its OWN oracle.
   Ground truth here is recomputed from the triples, never read off the core:
   totals, every merge order (all 3 pairs × which drop is target), pearl iff ≥ 10 and the
   2 × 5 pack, the miss script (two-drop sum joins exactly that pair; otherwise all, best order),
   hints by state, no leading 0, design data invariants, the plan's adjacency rule.
   Usage: node scripts/verify-merge-drops-core.js [--poison=<name>] */
'use strict';
const path = require('path');
const C = require(path.join(process.env.MD_CORE_DIR || path.join(__dirname, '..', 'mini tools'), 'merge-drops-core.js'));
const POISON = (process.argv.find(a => a.startsWith('--poison=')) || '').slice(9);
let pass = 0, fail = 0; const fails = [];
function ok(c, m) { if (c) pass++; else { fail++; if (fails.length < 40) fails.push(m); } }

/* ---- poison: break the core in memory to prove the oracle sees it ---- */
if (POISON === 'total') { const r0 = C.round; C.round = (l, i) => { const r = r0(l, i); r.total += 1; return r; }; }
if (POISON === 'pearl') { const p0 = C.pack; C.pack = d => { const p = p0(d); if (!p.single) p.pearl = d.n > 10; return p; }; }
if (POISON === 'zero') { const t0 = C.type; C.type = (st, d) => { if (d === '0' && st.typed === '') { st.typed = '0'; return true; } return t0(st, d); }; }

const PAIRS = [[0, 1], [0, 2], [1, 2]];
const COL = ['A', 'B', 'C'];
function sum(a) { return a.reduce((x, y) => x + y, 0); }
function myFriendly(t) {
  for (const p of PAIRS) if (t[p[0]] + t[p[1]] === 10) return p;
  for (const p of PAIRS) if (t[p[0]] === t[p[1]]) return p;
  return null;
}

/* ---- design data ---- */
for (const L of C.LEVELS) {
  const ids = C.ids(L), cap = L === 'w10' ? 10 : 20, seen = new Set();
  ok(ids.length >= 7, L + ': at least 7 rounds');
  for (const i of ids) {
    const r = C.round(L, i), t = r.t, T = sum(t);
    ok(r.total === T, `${L}#${i} total ${r.total} = ${T}`);
    ok(T <= cap && T >= 3, `${L}#${i} total ${T} within ${cap}`);
    ok(t.every(n => n >= 1 && Number.isInteger(n)), `${L}#${i} parts ≥ 1 (never 0)`);
    ok(!t.includes(T), `${L}#${i} total is not one of the parts`);
    ok(T !== t[0] + t[1], `${L}#${i} total ≠ a + b`);
    const key = t.slice().sort((a, b) => a - b).join();
    ok(!seen.has(key), `${L}#${i} triple distinct`); seen.add(key);
    const f = C.friendly(t), mf = myFriendly(t);
    ok(JSON.stringify(f) === JSON.stringify(mf), `${L}#${i} friendly ${f} = ${mf}`);
    ok(JSON.stringify(C.bestOrder(t)) === JSON.stringify(mf || [0, 1]), `${L}#${i} best order`);
  }
  if (L === 'w20') {
    const spread = { '0,1': 0, '0,2': 0, '1,2': 0 }; let tens = 0;
    for (const i of ids) { const t = C.round(L, i).t, f = myFriendly(t); if (f && t[f[0]] + t[f[1]] === 10) { tens++; spread[f.join()]++; } }
    ok(tens >= 6, 'w20: at least 6 ten-pair rounds (' + tens + ')');
    ok(Object.values(spread).every(v => v >= 2), 'w20: the ten pair sits in every position ≥ 2 times ' + JSON.stringify(spread));
    ok(ids.filter(i => C.round(L, i).total >= 11).length >= 8, 'w20: mostly teen totals');
  }
}

/* ---- every merge order ends in the same drop ---- */
function playOrder(L, i, first, tgtFirst, tgtSecond) {
  const r = C.round(L, i), st = C.newState(r);
  const a = COL[first[0]], b = COL[first[1]], third = COL[3 - first[0] - first[1]];
  const d1 = tgtFirst ? C.merge(st, a, b) : C.merge(st, b, a);
  const d2 = tgtSecond ? C.merge(st, third, d1.id) : C.merge(st, d1.id, third);
  return { r, st, d1, d2 };
}
for (const L of C.LEVELS) for (const i of C.ids(L)) {
  const r = C.round(L, i), t = r.t, T = r.total;
  for (const p of PAIRS) for (const x of [true, false]) for (const y of [true, false]) {
    const { st, d1, d2 } = playOrder(L, i, p, x, y), tag = `${L}#${i} ${p}/${x}/${y}`;
    ok(d1 && d1.n === t[p[0]] + t[p[1]], tag + ' first drop = pair sum');
    ok(d2 && d2.n === T, tag + ' last drop = total');
    ok(st.drops.length === 1, tag + ' one drop left');
    const pk = C.pack(d2), beads = [];
    t.forEach((n, k) => { for (let j = 0; j < n; j++) beads.push(COL[k]); });
    ok(!pk.single && pk.pearl === (T >= 10), tag + ' pearl iff ≥ 10');
    ok(pk.ten.length === Math.min(10, T) && pk.rest.length === Math.max(0, T - 10), tag + ' ten + rest');
    const colours = {}; pk.ten.concat(pk.rest).forEach(c => { colours[c] = (colours[c] || 0) + 1; });
    ok(t.every((n, k) => colours[COL[k]] === n), tag + ' every bead keeps its colour');
    const pa = C.path(st);
    ok(pa.kind === 'path' && pa.s === pa.a + pa.b && pa.total === pa.s + pa.c && pa.total === T, tag + ' path equations hold');
    ok(C.isPearl(d2) === (T >= 10), tag + ' isPearl');
    /* undo walks back to three drops in place */
    C.undo(st); ok(st.drops.length === 2, tag + ' undo → 2');
    C.undo(st); ok(st.drops.length === 3 && st.drops.map(d => d.n).join() === t.join(), tag + ' undo → original three in order');
    ok(C.undo(st) === false, tag + ' undo on nothing is refused');
  }
  /* self-merge refused */
  const st = C.newState(r); ok(C.merge(st, 'A', 'A') === null && st.drops.length === 3, `${L}#${i} self-merge refused`);
  /* single drop pack */
  ok(C.pack(st.drops[0]).single && C.pack(st.drops[0]).beads.length === t[0], `${L}#${i} single drop holds its own beads`);
}

/* rounds of exactly ten exist and get their own hints (no ones left over) */
ok(C.ids('w10').some(i => C.round('w10', i).total === 10), 'w10 has rounds of exactly ten');

/* ---- typing ---- */
{
  const st = C.newState(C.round('w20', 0));
  ok(C.type(st, '0') === false && st.typed === '', 'leading 0 refused');
  ok(C.type(st, '1') && C.type(st, '0') && st.typed === '10', 'a 0 after a digit is allowed');
  ok(C.type(st, '5') === false && st.typed === '10', 'no third digit');
  ok(C.type(st, 'del') && st.typed === '1', 'delete');
  ok(C.type(st, 'x') === false, 'non-digit refused');
}

/* ---- the check: every possible typed answer 1..40 at every round ---- */
for (const L of C.LEVELS) for (const i of C.ids(L)) {
  const r = C.round(L, i), t = r.t, T = r.total;
  { const st = C.newState(r); const res = C.check(st); ok(!res.ok && res.reason === 'empty' && C.hint(st) === 'hEmpty' && st.misses === 0, `${L}#${i} empty is a hint, not a miss`); }
  for (let n = 1; n <= 40; n++) {
    const st = C.newState(r); String(n).split('').forEach(d => C.type(st, d));
    const res = C.check(st), tag = `${L}#${i} typed ${n}`;
    if (n === T) { ok(res.ok && st.done && C.hint(st) === null, tag + ' right'); continue; }
    ok(!res.ok && st.misses === 1 && st.show === 1, tag + ' miss 1');
    const sub = PAIRS.find(p => t[p[0]] + t[p[1]] === n);
    if (sub) {
      ok(res.reason === 'two' && C.hint(st) === 'hTwo', tag + ' two-drop sum → hTwo');
      ok(st.drops.length === 2, tag + ' exactly two drops remain');
      const joined = st.drops.find(d => d.parts.length > 1), out = st.drops.find(d => d.parts.length === 1);
      ok(joined && joined.n === n && out && out.n === t[3 - sub[0] - sub[1]], tag + ' joins exactly that pair, the third outside');
      ok(st.last.out === 3 - sub[0] - sub[1], tag + ' names the drop left out');
    } else {
      const want = T === 10 ? 'hPearlTen' : T >= 10 ? 'hPearl' : 'hJoined';
      ok(res.reason === 'joined' && C.hint(st) === want, tag + ' → ' + want);
      ok(st.drops.length === 1 && st.drops[0].n === T, tag + ' all joined into the total');
      const f = myFriendly(t) || [0, 1];
      ok(st.log[0].made.n === t[f[0]] + t[f[1]], tag + ' joined in the best order first');
    }
    /* second miss: always everything, beads counted */
    st.typed = ''; const wrong = n === T - 1 ? T + 1 : T - 1; String(wrong).split('').forEach(d => C.type(st, d));
    const r2 = C.check(st);
    ok(!r2.ok && r2.reason === 'count' && st.show === 2 && st.misses === 2, tag + ' miss 2 → count');
    ok(C.hint(st) === (T === 10 ? 'hCountTen' : T >= 10 ? 'hCount' : 'hCountAll'), tag + ' miss 2 hint');
    ok(st.drops.length === 1 && st.drops[0].n === T, tag + ' miss 2 joins everything');
    /* a right answer still succeeds after misses */
    st.typed = ''; String(T).split('').forEach(d => C.type(st, d));
    ok(C.check(st).ok && st.done, tag + ' recovers to success');
    ok(C.merge(st, 'A', 'B') === null && C.type(st, '1') === false && C.undo(st) === false, tag + ' locked when done');
  }
  /* typing after a miss clears the shown hint */
  const st = C.newState(r); C.type(st, String(T + 1 > 9 ? 1 : T + 1)); C.check(st); C.type(st, '2');
  ok(st.show === 0 && C.hint(st) === null, `${L}#${i} a new key press clears the hint`);
}

/* ---- allOrders ---- */
for (const L of C.LEVELS) for (const i of C.ids(L)) {
  const r = C.round(L, i), os = C.allOrders(r);
  ok(os.length === 3 && os.every(o => o.total === r.total && o.s === o.a + o.b && o.s + o.c === o.total), `${L}#${i} three orders, same total`);
  ok(new Set(os.map(o => o.first.join())).size === 3, `${L}#${i} three different first pairs`);
}

/* ---- plan: no adjacent equal totals, never the previous order ---- */
let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
for (const L of C.LEVELS) {
  let prev = null;
  for (let k = 0; k < 300; k++) {
    const o = C.plan(L, rnd, prev).order;
    ok(o.slice().sort((a, b) => a - b).join() === C.ids(L).join(), `${L} plan is a permutation`);
    let adj = false; for (let p = 1; p < o.length; p++) if (C.round(L, o[p]).total === C.round(L, o[p - 1]).total) adj = true;
    ok(!adj, `${L} plan: no two equal totals in a row`);
    ok(!prev || prev.join() !== o.join(), `${L} plan differs from the previous pass`);
    prev = o;
  }
}

/* the same seed must not hand the same order back (replay: identical draws until the old order is refused) */
for (const L of C.LEVELS) for (let s0 = 1; s0 <= 60; s0++) {
  const mk = () => { let z = s0 * 7919; return () => (z = (z * 16807) % 2147483647) / 2147483647; };
  const o1 = C.plan(L, mk(), null).order, o2 = C.plan(L, mk(), o1).order;
  ok(o1.join() !== o2.join(), `${L} seed ${s0}: a replayed seed still gives a new order`);
}
/* a round solved without joining is locked */
for (const L of C.LEVELS) for (const i of C.ids(L)) {
  const st = C.newState(C.round(L, i)); String(st.r.total).split('').forEach(d => C.type(st, d)); C.check(st);
  ok(st.done && C.merge(st, 'A', 'B') === null && st.drops.length === 3, `${L}#${i} solved in the head: drops locked`);
}

/* ---- layout ---- */
ok(C.layout(704).mode === 'wide' && C.layout(619).mode === 'narrow' && C.layout(299).tiny && !C.layout(300).tiny, 'layout breakpoints');
ok(C.locale('xx') === 'en' && C.locale('sv-SE') === 'sv' && C.LOCALES.length === 11, 'locales');

console.log(`verify-merge-drops-core: ${pass} pass, ${fail} fail${POISON ? ' (poison=' + POISON + ')' : ''}`);
fails.forEach(f => console.log('  FAIL: ' + f));
process.exit(fail ? 1 : 0);
