#!/usr/bin/env node
/* =====================================================================
   verify-spring-switch-core.js — the gate for THE SPRING SWITCH (#25,
   K.OA.A.3). Its own oracle: the round tables written out again from the
   design (§6), conservation checked exhaustively over every
   release / flick / back-up sequence for every load, the coupler judged
   against the cars, the order over 10 000 seeds. Design §12 rules 1–9.
   Usage: node scripts/verify-spring-switch-core.js   (SW_CORE_DIR=<dir> for mutants)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const C = require(path.join(process.env.SW_CORE_DIR || MT, 'spring-switch-core.js'));
let ACT = null; try { ACT = require(path.join(MT, 'spring-switch-activity.js')); } catch (e) { ACT = null; }
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('   FAIL: ' + m); } };
const LOCALES = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const seeded = (seed) => () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };

/* the design's tables, written out again: kind, whole, left car, right car, sealed side */
const TABLE = {
  upto5: [['all', 3], ['all', 4], ['sealed', 5, 2, 3, 'L'], ['backup', 5, 2, 3], ['all', 5], ['sealed', 4, 1, 3, 'R'], ['backup', 4, 1, 3], ['sealed', 5, 1, 4, 'L'], ['backup', 3, 2, 1]],
  six9: [['all', 6], ['sealed', 7, 3, 4, 'L'], ['backup', 7, 4, 3], ['sealed', 8, 3, 5, 'R'], ['all', 7], ['backup', 9, 5, 4], ['sealed', 9, 7, 2, 'L'], ['backup', 8, 6, 2], ['all', 8]],
  ten: [3, 'R6', 5, 'R8', 1, 'R2', 7, 'R4', 9]
};

/* 0 + 9 — the rounds: as designed, ≥ 7 per level, never 0, every whole is its parts */
for (const lv of ['upto5', 'six9', 'ten']) {
  const R = C.rounds(lv);
  is(R.length >= 7 && R.length === 9, `${lv}: 9 rounds (${R.length})`);
  R.forEach((r, i) => {
    if (lv === 'ten') {
      const t = TABLE.ten[i], right = typeof t === 'string', k = right ? +t.slice(1) : t;
      is(r.kind === 'sealed' && r.n === 10 && r.side === (right ? 'R' : 'L') && r.k === k && r.missing === 10 - k, `${r.id}: 10 = ${right ? '☐ + ' + k : k + ' + ☐'}`);
    } else {
      const t = TABLE[lv][i];
      is(r.kind === t[0] && r.n === t[1], `${r.id}: ${t[0]} ${t[1]}`);
      if (t[0] !== 'all') is(r.a === t[2] && r.b === t[3] && r.a + r.b === r.n, `${r.id}: ${t[1]} = ${t[2]} + ${t[3]}`);
      if (t[0] === 'sealed') is(r.side === t[4] && r.k === (t[4] === 'L' ? t[2] : t[3]), `${r.id}: sealed ${t[4]}`);
    }
    is(r.n >= 2 && r.n <= 10 && (r.kind === 'all' || (r.a >= 1 && r.b >= 1)), `${r.id}: no 0`);
    if (r.kind === 'all') is(r.need === (lv === 'six9' && r.n === 8 ? 4 : r.n - 1), `${r.id}: ${r.need} ways to find`);
  });
  const miss = R.filter(r => r.kind === 'sealed').map(r => r.missing);
  is(new Set(miss).size === miss.length, `${lv}: missing parts all different (${miss.join(',')})`);
  const sides = R.filter(r => r.kind === 'sealed').map(r => r.side), left = sides.filter(s => s === 'L').length;
  is(Math.abs(left - (sides.length - left)) <= 1, `${lv}: sealed sides even (${sides.join('')})`);
  const wholes = R.filter(r => r.kind === 'backup').map(r => r.a + r.b);
  is(new Set(wholes).size === wholes.length, `${lv}: back-up wholes all different (${wholes.join(',')})`);
}
is(C.rounds('ten').map(r => r.k).sort((a, b) => a - b).join('') === '123456789', 'Make ten: the sealed numbers are 1–9, each once');

/* 1 + 2 — conservation and the switch, exhaustive: every sequence of up to 12 moves from
   {release, flick, back up} for every load 2–10 */
for (let n = 2; n <= 10; n++) {
  const r = { id: 'x', level: 'upto5', kind: 'all', n, need: n - 1 };
  let seqs = 0, bad = 0, badSide = 0;
  const walk = (st, depth) => {
    seqs++;
    if (st.hill + st.L + st.R !== n || st.hill < 0 || st.L < 0 || st.R < 0) bad++;
    if (depth === 0) return;
    for (const mv of ['rel', 'flick', 'back']) {
      const s2 = JSON.parse(JSON.stringify(st));
      if (mv === 'rel') { const before = { L: s2.L, R: s2.R, sw: s2.sw, hill: s2.hill }; const side = C.release(s2); if (before.hill > 0 && side !== before.sw) badSide++; if ((side === 'L' && s2.L !== before.L + 1) || (side === 'R' && s2.R !== before.R + 1)) badSide++; }
      if (mv === 'flick') C.flick(s2);
      if (mv === 'back') C.backUp(s2);
      walk(s2, depth - 1);
    }
  };
  walk(C.newState(r), n <= 6 ? 9 : 7);
  is(bad === 0, `load ${n}: hill + left + right = ${n} in all ${seqs} sequences (${bad} bad)`);
  is(badSide === 0, `load ${n}: every crate went to the side the switch faced (${badSide} bad)`);
}

/* 3 + 4 — ALL WAYS: the coupler banks iff the plate reads the cars, both ≥ 1, all crates down, new;
   the round completes exactly at its ways */
const route = (st, a, b) => { C.backUp(st); if (st.sw !== 'L') C.flick(st); for (let i = 0; i < a; i++) C.release(st); C.flick(st); for (let i = 0; i < b; i++) C.release(st); };
for (const lv of ['upto5', 'six9']) for (const r of C.rounds(lv).filter(x => x.kind === 'all')) {
  const st = C.newState(r);
  let res = C.couple(st); is(res.reason === 'empty' && st.misses === 0, `${r.id}: empty yard — no miss`);
  C.release(st); res = C.couple(st); is(res.reason === 'oneEmpty' && st.misses === 0, `${r.id}: one car empty — no miss`);
  C.backUp(st);
  C.release(st); C.flick(st); C.release(st);
  if (r.n > 2) { res = C.couple(st); is(res.reason === 'hill' && st.misses === 0, `${r.id}: crates still on the hill — no miss`); }
  route(st, 1, r.n - 1);
  res = C.couple(st); is(res.reason === 'unset' && st.misses === 0, `${r.id}: plate unset — no miss`);
  C.setPlate(st, 'a', r.n - 1 === 1 ? 1 : 2); C.setPlate(st, 'b', r.n - 1);
  res = C.couple(st);
  if (r.n - 1 !== 1) is(res.reason === 'wrongL' && st.misses === 1 && st.help === 1, `${r.id}: a wrong left number is a miss`);
  C.setPlate(st, 'a', 1); C.setPlate(st, 'b', 1);
  if (r.n - 1 !== 1) { res = C.couple(st); is(res.reason === 'wrongR', `${r.id}: a wrong right number is a miss`); }
  C.setPlate(st, 'a', 1); C.setPlate(st, 'b', r.n - 1);
  res = C.couple(st);
  is(res.ok && res.a === 1 && res.b === r.n - 1, `${r.id}: 1 + ${r.n - 1} banked`);
  is(st.hill === r.n && !st.L && !st.R && st.plate.a == null && st.plate.b == null, `${r.id}: banking backs up and clears the parts`);
  is(st.plate.w === r.n, `${r.id}: the whole stays printed`);
  route(st, 1, r.n - 1); C.setPlate(st, 'a', 1); C.setPlate(st, 'b', r.n - 1);
  const m0 = st.misses; res = C.couple(st);
  is(res.reason === 'repeat' && st.misses === m0 && st.found.length === 1 && st.hill === r.n, `${r.id}: a repeated way is not banked, not a miss, backs up`);
  /* the mirror: only from an empty yard, only a new pair, never auto-printed */
  if (r.n > 2) {
    is(C.canMirror(st) && C.mirror(st) && st.L === r.n - 1 && st.R === 1 && st.plate.a == null, `${r.id}: the turntable turns 1 + ${r.n - 1} into ${r.n - 1} + 1, plate left to the child`);
    is(C.found === undefined && st.found.length === 1, `${r.id}: the turntable banks nothing by itself`);
    C.setPlate(st, 'a', r.n - 1); C.setPlate(st, 'b', 1); res = C.couple(st);
    is(res.ok && st.found.length === 2, `${r.id}: the mirror banked through the coupler`);
  }
  /* every remaining way */
  for (let a = 2; a < r.n && !st.done; a++) {
    if (st.found.indexOf(a + '+' + (r.n - a)) >= 0) continue;
    route(st, a, r.n - a); C.setPlate(st, 'a', a); C.setPlate(st, 'b', r.n - a); res = C.couple(st);
    is(res.ok, `${r.id}: ${a} + ${r.n - a} banked`);
    if (!st.done) is(st.found.length < r.need, `${r.id}: not complete at ${st.found.length} of ${r.need}`);
  }
  is(st.done && st.found.length === r.need, `${r.id}: complete exactly at ${r.need} ways (${st.found.length})`);
  is(C.couple(st) === null && C.release(st) === 'locked', `${r.id}: nothing after done`);
  is(new Set(st.found).size === st.found.length && st.found.every(k => { const [a, b] = k.split('+').map(Number); return a >= 1 && b >= 1 && a + b === r.n; }), `${r.id}: every banked way is a true split with no 0`);
}
/* the mirror is refused for a double and for an old pair */
{
  const st = C.newState(C.rounds('upto5').find(r => r.n === 4 && r.kind === 'all'));
  route(st, 2, 2); C.setPlate(st, 'a', 2); C.setPlate(st, 'b', 2); C.couple(st);
  is(!C.canMirror(st) && !C.mirror(st), '2 + 2 has no new mirror');
}

/* 5 — SEALED: the switch locked to the open side, success iff the open car = n − k, the dial read */
for (const lv of ['upto5', 'six9', 'ten']) for (const r of C.rounds(lv).filter(x => x.kind === 'sealed')) {
  const st = C.newState(r, lv === 'ten' ? [] : null);
  const open = r.side === 'L' ? 'R' : 'L', box = open === 'L' ? 'a' : 'b';
  is(st.hill === 10, `${r.id}: the wagon holds 10 (its size gives nothing away)`);
  is(!C.flick(st) && st.sw === open, `${r.id}: the switch is locked to the open car`);
  is(C.dials(st).join() === box && !C.setPlate(st, box === 'a' ? 'b' : 'a', 3) && !C.setPlate(st, 'w', 3), `${r.id}: only the open part is a dial`);
  let res = C.couple(st); is(res.reason === 'empty' && st.misses === 0, `${r.id}: nothing sent — no miss`);
  for (let i = 0; i < r.missing + 1; i++) C.release(st);
  is(C.carCount(st, open) === r.missing + 1 && C.carCount(st, r.side) === 0, `${r.id}: crates only reach the open car`);
  res = C.couple(st); is(res.reason === 'sealedWrong' && res.more === false && st.misses === 1, `${r.id}: one too many is a miss`);
  is(C.hint(st).key === 'hintTogether', `${r.id}: miss 1 → together make ${r.n}`);
  C.backUp(st);
  is(st.hill === 10 && C.carCount(st, open) === 0, `${r.id}: back up returns only the sent crates`);
  for (let i = 0; i < r.missing - 1; i++) C.release(st);
  if (r.missing > 1) { res = C.couple(st); is(res.reason === 'sealedWrong' && res.more === true && st.help === 2, `${r.id}: one too few is miss 2`); is(C.hint(st).key === 'hintCountOn', `${r.id}: miss 2 → count on`); const sl = C.chips(st).slots; is(sl.length === r.missing && sl[0] === r.k + 1 && sl[sl.length - 1] === r.n, `${r.id}: the missing places number on from ${r.k} to ${r.n} (${sl.join(',')})`); }
  else { C.backUp(st); }
  while (C.carCount(st, open) < r.missing) C.release(st);
  res = C.couple(st); is(res.reason === 'unset', `${r.id}: the dial must be set`);
  C.setPlate(st, box, r.missing === 1 ? 2 : 1); res = C.couple(st); is(res.miss && (res.reason === 'wrongL' || res.reason === 'wrongR'), `${r.id}: a wrong dial is a miss`);
  C.setPlate(st, box, r.missing); res = C.couple(st);
  is(res.ok && st.done && res.a + res.b === r.n && (r.side === 'L' ? res.a : res.b) === r.k, `${r.id}: ${res.a} + ${res.b} = ${r.n}`);
}
/* 6 — Make ten: one staircase across the pass, complete at round 9 */
{
  const book = [], R = C.rounds('ten');
  R.forEach((r, i) => {
    const st = C.newState(r, book);
    for (let j = 0; j < r.missing; j++) C.release(st);
    C.setPlate(st, r.side === 'L' ? 'b' : 'a', r.missing); C.couple(st);
    const rows = C.book(st);
    is(rows.length === 9 && rows.filter(x => x.found).length === i + 1, `Make ten round ${i + 1}: ${i + 1} of 9 bonds on the staircase`);
  });
  is(book.length === 9 && new Set(book).size === 9, 'Make ten: the staircase holds all nine bonds of 10');
}

/* 7 — BACK UP: back up first, then the whole on the dial */
for (const lv of ['upto5', 'six9']) for (const r of C.rounds(lv).filter(x => x.kind === 'backup')) {
  const st = C.newState(r);
  is(st.L === r.a && st.R === r.b && st.hill === 0 && C.release(st) === 'locked' && !C.flick(st), `${r.id}: two loaded cars, nothing rolls down`);
  is(C.dials(st).join() === 'w' && st.plate.a === r.a && st.plate.b === r.b, `${r.id}: the parts printed, the whole is the dial`);
  let res = C.couple(st); is(res.reason === 'backFirst' && st.misses === 0, `${r.id}: back up first — no miss`);
  is(C.backUp(st) && st.hill === r.a + r.b && !st.L && !st.R && st.backed, `${r.id}: the crates merge in the wagon`);
  res = C.couple(st); is(res.reason === 'unset', `${r.id}: the whole must be set`);
  C.setPlate(st, 'w', r.a); res = C.couple(st); is(res.miss && st.help === 1 && C.hint(st).key === 'hintCountAll', `${r.id}: a part as the whole is a miss`);
  C.setPlate(st, 'w', r.b); res = C.couple(st);
  const ch = C.chips(st).hill;
  is(st.help === 2 && ch.length === r.n && ch[ch.length - 1] === '?' && !ch.includes(r.n), `${r.id}: miss 2 numbers the wagon to "?" (${ch.join(',')})`);
  C.setPlate(st, 'w', r.n); res = C.couple(st);
  is(res.ok && st.done, `${r.id}: ${r.n} finishes`);
}

/* the help numbers a car up to "?" and never writes its count */
{
  const st = C.newState(C.rounds('upto5').find(r => r.n === 5 && r.kind === 'all'));
  route(st, 3, 2); C.setPlate(st, 'a', 2); C.setPlate(st, 'b', 2); C.couple(st);
  is(st.help === 1 && C.chips(st).L.length === 0 && C.hint(st).key === 'hintCountL', 'miss 1: count the left car again, no numbers yet');
  C.setPlate(st, 'a', 4); C.couple(st);
  const ch = C.chips(st).L;
  is(st.help === 2 && ch.join(',') === '1,2,?', `miss 2 on the left car numbers 1,2,? (${ch.join(',')})`);
  is(C.hint(st).key === 'hintHasL', 'miss 2 hint names the left car');
  C.setPlate(st, 'a', 3); is(st.help === 0 && C.chips(st).L.length === 0, 'a new move takes the help away');
}

/* 8 — the order: 10 000 seeds per level, chained passes */
for (const lv of ['upto5', 'six9', 'ten']) {
  const pool = C.rounds(lv), rand = seeded(lv.length * 991);
  let prev = null, bad = 0, same = 0, seam = 0, first = 0;
  const tg = (r) => r.kind === 'sealed' && r.level === 'ten' ? r.side : r.kind;
  for (let s = 0; s < 10000; s++) {
    const o = C.order(pool, rand, prev);
    if (o.length !== pool.length || new Set(o).size !== pool.length) { bad++; continue; }
    for (let i = 2; i < o.length; i++) if (tg(pool[o[i]]) === tg(pool[o[i - 1]]) && tg(pool[o[i]]) === tg(pool[o[i - 2]])) bad++;
    if (lv !== 'ten' && pool[o[0]].kind !== 'all') first++;
    if (prev && prev.join() === o.join()) same++;
    if (prev && o[0] === prev[prev.length - 1]) seam++;
    prev = o;
  }
  is(bad === 0, `${lv}: no three of one kind in a row (${bad})`);
  is(first === 0, `${lv}: every pass opens on an ALL WAYS round (${first})`);
  is(same === 0 && seam === 0, `${lv}: never the same order twice, never the same seam (${same}/${seam})`);
  const z = () => 0, o1 = C.order(pool, z, null), o2 = C.order(pool, z, o1);
  is(o1.join() !== o2.join(), `${lv}: a repeating random source still never repeats the order`);
}

/* the hints and the celebration keys */
is(C.celebrateKey(C.rounds('six9')[8]) === 'celebrateSome' && C.celebrateKey(C.rounds('upto5')[0]) === 'celebrateAll' && C.celebrateKey(C.rounds('upto5')[2]) === 'celebrateMake', 'celebration keys');
/* free play: any load 2–10, the plate reads itself */
{
  const st = C.newPlay(5);
  is(st.explore && C.couple(st) === null && C.dials(st).length === 0, 'free play: no coupler, no dials');
  is(C.setLoad(st, 12) && st.n === 10 && st.hill === 10 && C.setLoad(st, 1) && st.n === 2, 'free play: load clamps to 2–10');
}
/* layout */
{
  const w = C.layout(648), n = C.layout(328), t = C.layout(288);
  is(w.mode === 'wide' && w.yard + w.col + w.gap <= 648 && 2 * w.carW + w.coupler + 16 <= w.yard && w.train >= 96, `704: the yard ${w.yard} + column ${w.col} fit, crates ${w.c}`);
  is(n.mode === 'narrow' && 2 * n.carW + n.coupler + 16 <= 328 && n.train >= 64 && n.lever >= 44 && n.coupler >= 44 && n.key >= 44 && n.part >= 44, `360: the cars fit, taps ≥ 44 (crates ${n.c})`);
  is(2 * t.carW + t.coupler + 16 <= 288, `320: the cars fit (crates ${t.c})`);
  is(n.train + n.carW + 44 + n.lever + 4 * 6 + 12 <= 328, '360: the top row fits');
}
/* pictures: toys/train in its colour theme index and on disk */
{
  const th = JSON.parse(fs.readFileSync(path.join(MT, 'pictures', 'toys.json'), 'utf8'));
  is(th.nouns.train && fs.existsSync(path.join(ROOT, th.nouns.train.src.replace(/^\//, ''))), 'toys/train exists');
}
/* the activity strings */
if (ACT) {
  const S = ACT.strings;
  for (const k of Object.keys(S)) for (const loc of LOCALES) is(typeof S[k][loc] === 'string' && S[k][loc].length > 0, `strings.${k}.${loc}`);
  const keys = ['banked', 'hintStart', 'hintSealedStart', 'hintOneEmpty', 'hintHill', 'hintUnset', 'hintBackFirst', 'hintRepeat', 'hintCountL', 'hintCountR', 'hintHasL', 'hintHasR', 'hintTogether', 'hintCountOn', 'hintCountAll', 'hintNumbers', 'celebrateAll', 'celebrateSome', 'celebrateMake', 'celebrateTen', 'promptAll', 'promptSome', 'promptSealed', 'promptBack'];
  for (const k of keys) is(!!S[k], `strings has ${k}`);
  for (const loc of LOCALES) {
    for (const [k, args, want] of [['promptAll', { n: 5 }, [5]], ['promptSome', { n: 8, w: 4 }, [4, 8]], ['promptSealed', { k: 2, n: 5 }, [2, 5]], ['celebrateMake', { a: 3, b: 7, n: 10 }, [3, 7, 10]], ['hintCountOn', { k: 3, n: 10 }, [3, 10]], ['banked', { n: 5, a: 2, b: 3 }, [5, 2, 3]]]) {
      const txt = S[k][loc].replace(/\{(\w+)\}/g, (m, x) => args[x]);
      is(JSON.stringify((txt.match(/\d+/g) || []).map(Number)) === JSON.stringify(want), `${loc} ${k}: "${txt}"`);
    }
    for (const k of Object.keys(S)) is(!/\bfree\b|\bgratis\b|\bgratuit|\bkostenlos|\bilmai/i.test(S[k][loc]), `strings.${k}.${loc}: no "free"`);
  }
} else is(false, 'spring-switch-activity.js loads in Node');

console.log(`verify-spring-switch-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
