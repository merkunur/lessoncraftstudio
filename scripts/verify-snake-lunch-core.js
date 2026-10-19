#!/usr/bin/env node
/* =====================================================================
   verify-snake-lunch-core.js — the gate for THE SNAKE-GROOVE LUNCHBOX
   (#26, K.OA.A.3). Its own oracle: the design's solution lists written out
   again and re-derived by this file's own brute force; the lid exhaustive
   over every subset of every wall; the feed judged by the kind's rule;
   peg positions over 10 000 seeds. Design §12 rules 1–10.
   Usage: node scripts/verify-snake-lunch-core.js   (SL_CORE_DIR=<dir> for mutants)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const C = require(path.join(process.env.SL_CORE_DIR || MT, 'snake-lunch-core.js'));
let ACT = null; try { ACT = require(path.join(MT, 'snake-lunch-activity.js')); } catch (e) { ACT = null; }
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('   FAIL: ' + m); } };
const LOCALES = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const seeded = (a) => () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
const S = (a) => a.reduce((x, y) => x + y, 0);
const key = (a) => a.slice().sort((x, y) => y - x).join('+');

/* the design's tables (§6), written out again with their solution lists */
const TABLE = {
  upto5: [['any', 5, [1, 2, 3, 4], [], ['4+1', '3+2']], ['two', 4, [1, 2, 2, 3], [], ['3+1', '2+2']], ['half', 5, [1, 2, 4], [3], ['3+2']], ['whatdid', 5, [], [2, 3], ['3+2']], ['half', 4, [2, 3, 4], [1], ['3+1']], ['any', 3, [1, 1, 1, 2], [], ['2+1', '1+1+1']], ['whatdid', 4, [], [1, 3], ['3+1']], ['toofull', 5, [], [2, 2, 3], ['3+2']]],
  six10: [['any', 10, [2, 3, 4, 6, 7, 8], [], ['8+2', '7+3', '6+4']], ['two', 8, [1, 2, 3, 5, 6], [], ['6+2', '5+3', '5+2+1']], ['half', 10, [2, 3, 4], [6], ['6+4']], ['finish', 10, [1, 2, 2, 3, 4], [6], ['6+3+1', '6+2+2']], ['exact', 10, [2, 3, 3, 4, 4, 6], [], ['4+4+2', '4+3+3'], 3], ['only', 10, [3, 3, 4, 6, 7], [], ['7+3', '6+4', '4+3+3']], ['toofull', 8, [], [2, 3, 4, 5], ['5+3']], ['half', 7, [2, 3, 5, 6], [4], ['4+3']], ['whatdid', 9, [], [6, 3], ['6+3']]],
  big: [['any', 12, [3, 4, 5, 7, 8, 9], [], ['9+3', '8+4', '7+5', '5+4+3']], ['two', 14, [4, 5, 6, 7, 7, 8, 9], [], ['7+7', '8+6', '9+5']], ['half', 12, [3, 4, 5, 6], [7], ['7+5']], ['whatdid', 13, [], [8, 5], ['8+5']], ['exact', 12, [3, 4, 4, 5, 6, 8], [], ['5+4+3'], 3], ['toofull', 11, [], [2, 3, 4, 6], ['6+3+2']], ['half', 13, [2, 3, 4, 6], [9], ['9+4']]]
};
/* this file's own brute force: every multiset the round's rule accepts */
function oracle(kind, n, wall, fixed, k) {
  const out = new Set();
  if (kind === 'whatdid') { out.add(key(fixed)); return out; }
  const pool = kind === 'toofull' ? fixed : wall, lockedSum = kind === 'toofull' ? 0 : S(fixed);
  const m = pool.length;
  for (let mask = 1; mask < (1 << m); mask++) {
    const pick = pool.filter((_, i) => mask & (1 << i));
    if (lockedSum + S(pick) !== n) continue;
    if (kind === 'half' && pick.length !== 1) continue;
    if (kind === 'finish' && pick.length !== 2) continue;
    if (kind === 'exact' && pick.length !== k) continue;
    out.add(key((kind === 'toofull' ? [] : fixed).concat(pick)));
  }
  return out;
}

/* 5 + 7 — the tables, the solution lists, no 0, ≤ 10 outside Big lunch */
for (const lv of ['upto5', 'six10', 'big']) {
  const R = C.rounds(lv);
  is(R.length === TABLE[lv].length && R.length >= 7, `${lv}: ${TABLE[lv].length} rounds (${R.length})`);
  R.forEach((r, i) => {
    const [kind, n, wall, fixed, sols, k] = TABLE[lv][i];
    is(r.kind === kind && r.n === n, `${r.id}: ${kind} ${n}`);
    is(key(r.wall) === key(wall) && key(kind === 'toofull' || kind === 'whatdid' ? r.box : r.locked) === key(fixed), `${r.id}: wall ${wall} / ${fixed}`);
    if (kind === 'exact') is(r.k === k, `${r.id}: exactly ${k}`);
    const mine = oracle(kind, n, wall, fixed, k);
    is([...mine].sort().join() === sols.slice().sort().join(), `${r.id}: the brute force finds ${[...mine].join(', ')} — the design lists ${sols.join(', ')}`);
    is(Object.keys(C.solutions(r)).sort().join() === [...mine].sort().join(), `${r.id}: the core agrees with the oracle`);
    if (['half', 'toofull', 'whatdid'].includes(kind)) is(mine.size === 1, `${r.id}: exactly one right answer (${mine.size})`);
    else is(mine.size >= r.need, `${r.id}: at least ${r.need} ways (${mine.size})`);
    if (kind === 'half') { /* no combination of two or more wall strands also fills the gap */
      const gap = n - S(fixed); let multi = 0;
      for (let mask = 1; mask < (1 << wall.length); mask++) { const p = wall.filter((_, j) => mask & (1 << j)); if (p.length >= 2 && S(p) === gap) multi++; }
      is(multi === 0, `${r.id}: one snack only — no two strands fill the gap of ${gap}`);
    }
    if (kind === 'exact' || kind === 'finish') { /* the clip rule bites: some full box has a different number of strands */
      const want = kind === 'exact' ? k : 2, gap = n - S(fixed);
      let other = 0; for (let mask = 1; mask < (1 << wall.length); mask++) { const p = wall.filter((_, j) => mask & (1 << j)); if (S(p) === gap && p.length !== want) other++; }
      is(other > 0, `${r.id}: a full box with ≠ ${want} added strands exists (the rule is never vacuous)`);
    }
    is(wall.concat(fixed).every(x => x >= 1) && n >= 2, `${r.id}: no 0`);
    if (lv !== 'big') is(n <= 10, `${r.id}: ≤ 10 outside Big lunch`);
    is(r.need === (kind === 'any' || kind === 'two' ? 2 : 1), `${r.id}: needs ${r.need} lunch(es)`);
  });
  /* single answers differ round to round within a level (HALF PACKED parts, WHAT DID wholes) */
  const halves = R.filter(r => r.kind === 'half').map(r => r.n - S(r.locked)), wholes = R.filter(r => r.kind === 'whatdid').map(r => r.n);
  is(new Set(halves).size === halves.length && new Set(wholes).size === wholes.length, `${lv}: single answers all differ (${halves} / ${wholes})`);
  is(new Set(R.map(r => r.treat[1])).size >= Math.min(R.length, 7), `${lv}: the treats change round to round`);
}

/* 1 + 2 — the lid and the overflow, exhaustive over every subset of every wall of every table */
for (const lv of ['upto5', 'six10', 'big']) for (const r of C.rounds(lv)) {
  if (r.kind === 'whatdid' || r.kind === 'toofull') continue;
  const ws = r.wall.length;
  let bad = 0;
  for (let mask = 0; mask < (1 << ws); mask++) {
    const st = C.newState(r, () => 0.5);
    const wallIds = st.strands.filter(s => !s.locked).map(s => s.id);
    wallIds.forEach((id, j) => { if (mask & (1 << j)) C.drop(st, id); });
    const tot = S(st.strands.filter(s => s.at === 'box').map(s => s.k));
    const want = tot === r.n ? 'shut' : tot < r.n ? 'gap' : 'bonk';
    if (C.lid(st) !== want || C.overflow(st) !== Math.max(0, tot - r.n) || C.filled(st) !== tot) bad++;
    const cp = C.cups(st);
    if (cp.inside.length !== Math.min(tot, r.n) || cp.over.length !== Math.max(0, tot - r.n)) bad++;
  }
  is(bad === 0, `${r.id}: lid shut ⇔ Σ = ${r.n}, overflow = Σ − ${r.n}, over all ${1 << ws} subsets (${bad} bad)`);
}

/* 3 + 4 + 9 — the feed: shut AND the rule; 6 + 4 = 4 + 6; the log biggest first */
for (const lv of ['upto5', 'six10', 'big']) for (const r of C.rounds(lv)) {
  const [, , , , sols, k] = TABLE[lv][r.index];
  if (r.kind === 'whatdid') {
    const st = C.newState(r);
    is(C.drop(st, st.strands[0].id) === 'locked' && C.takeOut(st, st.strands[0].id) === 'locked', `${r.id}: the strands in the box are locked`);
    let res = C.feed(st); is(res.reason === 'unset' && st.misses === 0, `${r.id}: no number set — no miss`);
    C.setCloud(st, r.box.find(x => x >= 2) || r.n + 1); res = C.feed(st); is(res.reason === 'cloud' && st.misses === 1, `${r.id}: a part as the whole is a miss`);
    is(C.hint(st).key === 'hintCountCups', `${r.id}: miss 1 → count the cups`);
    C.setCloud(st, r.n + 1); C.feed(st);
    const ch = C.cupChips(st); is(st.help === 2 && ch.length === r.n && ch[r.n - 1] === '?' && !ch.includes(r.n), `${r.id}: miss 2 numbers the cups to "?" (${ch.join(',')})`);
    is(!C.setCloud(st, 1) && !C.setCloud(st, C.cloudRange(st) + 1), `${r.id}: the cloud refuses 1 and too big`);
    C.setCloud(st, r.n); res = C.feed(st); is(res.ok && st.done, `${r.id}: ${r.n} finishes`);
    continue;
  }
  /* every subset of the pool: the feed accepts exactly the oracle's lunches */
  const st0 = C.newState(r, () => 0.5), pool = st0.strands.filter(s => !s.locked);
  let wrongAcc = 0, wrongRej = 0, count = 0;
  for (let mask = 0; mask < (1 << pool.length); mask++) {
    const st = C.newState(r, () => 0.5), ids = st.strands.filter(s => !s.locked).map(s => s.id);
    if (r.kind === 'toofull') ids.forEach((id, j) => { if (!(mask & (1 << j))) C.takeOut(st, id); });
    else ids.forEach((id, j) => { if (mask & (1 << j)) C.drop(st, id); });
    const box = st.strands.filter(s => s.at === 'box').map(s => s.k), kk = key(box), tot = S(box);
    const legal = sols.includes(kk) && tot === r.n;
    const res = C.feed(st); count++;
    if (res.ok && !legal) wrongAcc++;
    if (!res.ok && legal) wrongRej++;
    if (res.ok) is(res.parts.join('+') === kk && res.parts.every((p, j) => j === 0 || res.parts[j - 1] >= p), `${r.id}: the log prints biggest first (${res.parts})`);
    if (!res.ok && tot !== r.n) is(!res.miss, `${r.id}: an open lid is never a miss`);
  }
  is(wrongAcc === 0 && wrongRej === 0, `${r.id}: the feed accepts exactly the right lunches over ${count} boxes (${wrongAcc} wrongly fed, ${wrongRej} wrongly refused)`);
  /* way rounds: a second, different lunch ends the round; the same set again is a repeat */
  if (r.need === 2) {
    const st = C.newState(r, () => 0.5);
    const packLunch = (kk) => { const want = kk.split('+').map(Number); want.forEach(v => { const s = st.strands.find(x => x.at === 'wall' && x.k === v); C.drop(st, s.id); }); };
    const rev = (kk) => kk.split('+').reverse().join('+');
    packLunch(rev(sols[0])); let res = C.feed(st);
    is(res.ok && !st.done && res.key === sols[0] && C.filled(st) === 0, `${r.id}: the first lunch (packed small-first) is printed ${sols[0]} and the box comes back empty`);
    is(r.kind === 'two' ? !C.hint(st).more : C.hint(st).more === 'promptAgain', `${r.id}: "now a whole new way" after the first lunch (any way only)`);
    packLunch(sols[0]); res = C.feed(st);
    is(res.miss && res.reason === 'repeat' && !st.done, `${r.id}: the same set again is a repeat (6 + 4 = 4 + 6)`);
    C.inBox(st).forEach(s => C.takeOut(st, s.id));
    packLunch(sols[1]); res = C.feed(st);
    is(res.ok && st.done && res.complete, `${r.id}: a second, different lunch ends the round`);
  }
}

/* EXACTLY K / FINISH / HALF clip misses, the help ladder, locked strands */
{
  const r = C.rounds('six10').find(x => x.kind === 'exact'), st = C.newState(r, () => 0.5);
  const put = (vals) => vals.forEach(v => C.drop(st, st.strands.find(x => x.at === 'wall' && x.k === v).id));
  put([6, 4]); let res = C.feed(st);
  is(res.miss && res.reason === 'clips' && res.k === 3 && C.hint(st).key === 'hintExactly', 'EXACTLY 3: 6 + 4 closes the lid but breaks the clip rule');
  C.inBox(st).forEach(s => C.takeOut(st, s.id)); put([6, 4]); res = C.feed(st);
  is(st.help === 2 && C.hint(st).key === 'hintCould', 'miss 2 → these snacks could fit');
  const help = C.helpful(st, r);
  is(help.length >= 2, `miss 2 lights every strand of a valid lunch, never just one (${help.length})`);
  const helpK = help.map(id => C.byId(st, id).k).sort().join(), wallK = st.strands.filter(s => !s.locked).map(s => s.k).sort().join();
  is(helpK === '2,3,3,4,4', `the lit strands are exactly those in a valid lunch (${helpK} of ${wallK})`);
  C.takeOut(st, C.inBox(st)[0].id); is(st.help === 0 && C.helpful(st, r).length === 0, 'a new move takes the help away');
}
{
  const r = C.rounds('six10').find(x => x.kind === 'finish'), st = C.newState(r, () => 0.5);
  const lockedId = st.strands.find(s => s.locked).id;
  is(C.takeOut(st, lockedId) === 'locked' && C.inBox(st).length === 1, 'a locked strand cannot be taken out');
  const put = (vals) => vals.forEach(v => C.drop(st, st.strands.find(x => x.at === 'wall' && x.k === v).id));
  put([2, 2]); is(C.lid(st) === 'shut' && C.feed(st).ok, 'FINISH: 6 + 2 + 2 feeds');
}
/* the lid tries: three blind tries number the empty cups on from the filled part */
{
  const r = C.rounds('six10').find(x => x.kind === 'any'), st = C.newState(r, () => 0.5);
  C.drop(st, st.strands.find(s => s.k === 6).id);
  C.tryLid(st); C.tryLid(st); is(C.countOn(st).length === 0, 'two lid tries: no numbers yet');
  C.tryLid(st); is(C.countOn(st).join() === '7,8,9,10' && C.hint(st).key === 'hintCountOn', `three lid tries: the empty cups read 7, 8, 9, 10 (${C.countOn(st)})`);
  is(st.misses === 0, 'lid tries are never misses');
  C.drop(st, st.strands.find(s => s.k === 4 && s.at === 'wall').id); is(C.countOn(st).length === 0, 'a new strand takes the count-on away');
  C.tryLid(st); is(C.lid(st) === 'shut', 'a full box shuts');
  const st2 = C.newState(r, () => 0.5); let res = C.feed(st2);
  is(res.reason === 'empty' && st2.misses === 0, 'feeding an empty box — no miss');
  C.drop(st2, st2.strands.find(s => s.k === 8).id); C.drop(st2, st2.strands.find(s => s.k === 7).id); res = C.feed(st2);
  is(res.reason === 'bonk' && !res.miss && C.hint(st2).key === 'hintBonk', 'feeding with a tail over the edge — no miss, "too much"');
}

/* the snake: rows of five, the second row runs back */
is([0, 4, 5, 9, 10].map(i => { const p = C.cupPos(i); return p.row + ':' + p.col; }).join() === '0:0,0:4,1:4,1:0,2:0', 'the groove snakes: row 1 left → right, row 2 right → left, row 3 left → right');

/* 8 — the pegs: the single right strand of every HALF PACKED round lands on every peg equally often */
for (const lv of ['upto5', 'six10', 'big']) for (const r of C.rounds(lv).filter(x => x.kind === 'half')) {
  const gap = r.n - S(r.locked), counts = new Array(r.wall.length).fill(0), rand = seeded(r.n * 7 + r.index), N = 10000;
  for (let s = 0; s < N; s++) { const st = C.newState(r, rand); const w = st.strands.filter(x => !x.locked); counts[w.findIndex(x => x.k === gap)]++; }
  const exp = N / r.wall.length, dev = Math.max(...counts.map(c => Math.abs(c - exp) / N));
  is(dev <= 0.03, `${r.id}: the right strand (${gap}) on every peg within ± 3 % (${counts.join('/')})`);
}
/* the order: 10 000 seeds per level */
for (const lv of ['upto5', 'six10', 'big']) {
  const pool = C.rounds(lv), rand = seeded(lv.length * 1331);
  let prev = null, first = 0, adj = 0, same = 0, seam = 0;
  for (let s = 0; s < 10000; s++) {
    const o = C.order(pool, rand, prev);
    if (pool[o[0]].kind !== 'any') first++;
    for (let i = 1; i < o.length; i++) { const a = pool[o[i - 1]].kind, b = pool[o[i]].kind; if (a === b && (a === 'toofull' || a === 'whatdid')) adj++; }
    if (prev && prev.join() === o.join()) same++;
    if (prev && o[0] === prev[prev.length - 1]) seam++;
    prev = o;
  }
  is(first === 0 && adj === 0 && same === 0 && seam === 0, `${lv}: passes open on ANY WAY, no TOO FULL / WHAT DID side by side, never the same order or seam (${first}/${adj}/${same}/${seam})`);
  const z = () => 0, o1 = C.order(pool, z, null), o2 = C.order(pool, z, o1);
  is(o1.join() !== o2.join(), `${lv}: a repeating random source still never repeats the order`);
}
/* free play */
{
  const st = C.newPlay(6);
  is(st.explore && C.feed(st) === null && st.strands.map(s => s.k).join() === '1,2,3,4,5,6,7,8,9', 'free play: strands 1–9, no judging');
  is(C.setSize(st, 12) && st.n === 10 && C.setSize(st, 1) && st.n === 2, 'free play: the box is 2–10');
}
/* layout */
{
  const w = C.layout(648), n = C.layout(328), t = C.layout(288);
  is(w.pic >= 96 && w.face >= 96 && w.robot >= 96 && 5 * w.cup + 4 * w.cupGap + 16 <= w.left && 4 * w.coil + 24 <= w.left, `704: cups ${w.cup}, faces ${w.face}, robot ${w.robot}, the box and the wall fit`);
  is(n.pic >= 64 && n.face >= 64 && n.robot >= 64 && 5 * n.cup + 4 * n.cupGap <= 328 && n.lever >= 44 && n.key >= 44, `360: cups ${n.cup} ≥ 64, the box fits edge to edge`);
  is(5 * t.cup + 4 * t.cupGap <= 288 && t.cup >= 56, `320: cups ${t.cup}`);
}
/* pictures */
{
  for (const [dir, k] of C.TREATS.concat([['toys', 'robot']])) {
    const th = JSON.parse(fs.readFileSync(path.join(MT, 'pictures', dir.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.json'), 'utf8'));
    is(th.nouns[k] && fs.existsSync(path.join(ROOT, th.nouns[k].src.replace(/^\//, ''))), `${dir}/${k} exists`);
  }
  is(!C.TREATS.some(t => ['cherry', 'cake', 'pancake', 'pie', 'brownie', 'waffle', 'candy_cane', 'lollipop', 'macaron'].includes(t[1])), 'no ruled-out treat');
}
/* the strings */
if (ACT) {
  const Sx = ACT.strings;
  for (const k of Object.keys(Sx)) for (const loc of LOCALES) is(typeof Sx[k][loc] === 'string' && Sx[k][loc].length > 0, `strings.${k}.${loc}`);
  for (const r of [].concat(C.rounds('upto5'), C.rounds('six10'), C.rounds('big'))) is(!!Sx[C.promptKey(r)] && !!Sx[C.celebrateKey(r, false)], `${r.id}: prompt + success strings`);
  const nums = (s) => (s.match(/\d+/g) || []).map(Number);
  for (const loc of LOCALES) {
    for (const [k, args, want] of [['promptHalf', { g: 6 }, [6]], ['promptExact', { n: 10, k: 3 }, [10, 3]], ['yum', { n: 10, a: 6, b: 4 }, [10, 6, 4]], ['yum3', { n: 10, a: 4, b: 3, c: 3 }, [10, 4, 3, 3]], ['celebrateWhat', { a: 6, b: 3, n: 9 }, [6, 3, 9]], ['hintCountOn', { n: 10 }, [10]], ['logLabel', { f: 1, t: 2 }, [1, 2]]]) {
      const txt = Sx[k][loc].replace(/\{(\w+)\}/g, (m, x) => args[x]);
      is(JSON.stringify(nums(txt)) === JSON.stringify(want), `${loc} ${k}: "${txt}"`);
    }
    for (const k of Object.keys(Sx)) is(!/\bfree\b|\bgratis\b|\bgratuit|\bkostenlos|\bilmai/i.test(Sx[k][loc]), `strings.${k}.${loc}: no "free"`);
  }
} else is(false, 'snake-lunch-activity.js loads in Node');

console.log(`verify-snake-lunch-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
