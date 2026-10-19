#!/usr/bin/env node
/* =====================================================================
   verify-lantern-string-core.js — the gate for THE TWO-ENDED LANTERN
   STRING (#27, K.OA.A.3). Its own oracle: the design's tables written out
   again; the law re-derived bulb by bulb from two light fronts; every
   board played through every pairing; trays and boards over 10 000 seeds.
   Design §12 rules 1–8, plus order, help, strings and layout.
   Usage: node scripts/verify-lantern-string-core.js   (LS_CORE_DIR=<dir> for mutants)
   ===================================================================== */
'use strict';
const path = require('path');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const C = require(path.join(process.env.LS_CORE_DIR || MT, 'lantern-string-core.js'));
let ACT = null; try { ACT = require(path.join(MT, 'lantern-string-activity.js')); } catch (e) { ACT = null; }
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('   FAIL: ' + m); } };
const LOCALES = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const seeded = (a) => () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };

/* the design's tables (§6), written out again: P = pair board, M = missing [n, given, tray, answer, slot 1-4], W = whole [a, b] */
const TABLE = {
  upto5: [['P', 4, [1, 3, 2, 2]], ['M', 5, 2, [2, 3, 4, 5], 3, 2], ['P', 5, [1, 4, 2, 3]], ['W', 1, 3], ['M', 4, 1, [1, 2, 3, 4], 3, 3], ['W', 2, 3], ['M', 3, 2, [1, 2, 3, 4], 1, 1], ['M', 5, 1, [1, 2, 3, 4], 4, 4]],
  six9: [['P', 6, [1, 5, 2, 4, 3, 3]], ['M', 8, 5, [2, 3, 4, 5], 3, 2], ['P', 7, [1, 6, 2, 5, 3, 4]], ['W', 4, 3], ['P', 8, [1, 7, 2, 6, 3, 5, 4, 4]], ['M', 9, 2, [5, 6, 7, 8], 7, 3], ['P', 9, [1, 8, 2, 7, 3, 6, 4, 5]], ['W', 6, 3], ['M', 6, 4, [2, 3, 4, 5], 2, 1]],
  ten: [['P', 10, [1, 9, 2, 8, 3, 7, 4, 6, 5, 5]], ['M', 10, 7, [3, 4, 5, 6], 3, 1], ['M', 10, 4, [5, 6, 7, 8], 6, 2], ['P', 10, [1, 9, 3, 7]], ['M', 10, 8, [1, 2, 3, 4], 2, 2], ['M', 10, 1, [6, 7, 8, 9], 9, 4], ['P', 10, [2, 8, 4, 6, 5, 5]], ['M', 10, 6, [2, 3, 4, 5], 4, 3], ['M', 10, 5, [2, 3, 4, 5], 5, 4]]
};
const KIND = { P: 'pair', M: 'missing', W: 'whole' };

/* the oracle's law: two fronts on a string of len bulbs */
function fronts(a, b, len) {
  const out = [];
  for (let i = 0; i < len; i++) { const fromL = i + 1 <= a, fromR = len - i <= b; out.push(fromL && fromR ? 'twice' : fromL ? 'left' : fromR ? 'right' : 'dark'); }
  return out;
}
const pairsOf = (n) => { const o = []; for (let a = 1; a <= n - a; a++) o.push(a + '+' + (n - a)); return o; };

/* ---- 1 + 2: the law, exhaustive ---- */
for (let n = 2; n <= 10; n++) for (let a = 1; a <= 9; a++) for (let b = 1; b <= 9; b++) {
  const t = C.light(a, b, n), s = a + b;
  is(t.result === (s === n ? 'meet' : s > n ? 'cross' : 'short'), `light(${a},${b},${n}) → ${t.result}`);
  is(t.k === Math.abs(s - n), `light(${a},${b},${n}) k=${t.k}`);
  const bs = C.bulbs(Math.min(a, n), Math.min(b, n), n), ex = fronts(Math.min(a, n), Math.min(b, n), n);
  is(bs.join() === ex.join(), `bulbs(${a},${b},${n}) = ${bs.join()}`);
  /* a light longer than the string runs on past the far end; every bulb of the error numbers itself */
  const ov = C.over(a, b, n);
  is(ov.pastR === Math.max(0, a - n) && ov.pastL === Math.max(0, b - n), `over(${a},${b},${n}) = ${ov.pastL}/${ov.pastR}`);
  const mk = C.marksFor(a, b, n);
  if (s === n) is(mk === null, `marksFor(${a},${b},${n}) meet → none`);
  else {
    is(mk && mk.count === Math.abs(s - n), `marksFor(${a},${b},${n}) numbers ${Math.abs(s - n)} bulbs (got ${mk && mk.count})`);
    const shown = mk ? mk.pastL.length + mk.inside.filter(x => x !== '').length + mk.pastR.length : -1;
    is(shown === Math.abs(s - n), `marksFor(${a},${b},${n}): ${shown} bulbs carry a number`);
    const seq = mk ? mk.pastL.concat(mk.inside.filter(x => x !== ''), mk.pastR) : [];
    is(seq.every((x, i) => x === i + 1), `marksFor(${a},${b},${n}) counts 1, 2, 3… left to right`);
  }
  if (a <= n && b <= n) {
    is(bs.filter(x => x === 'twice').length === Math.max(0, s - n), `lit twice (${a},${b},${n}) = max(0, a+b−n)`);
    is(bs.filter(x => x === 'dark').length === Math.max(0, n - s), `dark (${a},${b},${n}) = max(0, n−a−b)`);
  }
}

/* ---- the tables, no 0, the round objects ---- */
const allR = {};
for (const lv of Object.keys(TABLE)) {
  const rs = C.rounds(lv); allR[lv] = rs;
  is(rs.length === TABLE[lv].length, `${lv}: ${rs.length} rounds (design ${TABLE[lv].length})`);
  is(rs.length >= 7, `${lv}: ≥ 7 rounds`);
  is(new Set(rs.map(r => r.id)).size === rs.length, `${lv}: round ids unique`);
  TABLE[lv].forEach((row, i) => {
    const r = rs[i]; if (!r) return;
    is(r.kind === KIND[row[0]], `${lv}#${i + 1} kind ${r.kind}`);
    if (row[0] === 'P') {
      is(r.n === row[1] && r.cards.join() === row[2].join(), `${lv}#${i + 1} board ${r.n}: ${r.cards}`);
      const prs = []; for (let j = 0; j < row[2].length; j += 2) prs.push(Math.min(row[2][j], row[2][j + 1]) + '+' + Math.max(row[2][j], row[2][j + 1]));
      prs.forEach(p => is(+p.split('+')[0] + +p.split('+')[1] === r.n, `${lv}#${i + 1} pair ${p} makes ${r.n}`));
      is(new Set(prs).size === prs.length, `${lv}#${i + 1} every pair once`);
      const every = pairsOf(r.n).every(p => prs.includes(p));
      is(!!r.all === every, `${lv}#${i + 1} "every way" (${every}) — the prompt and celebrate keys depend on it`);
      is(C.promptKey(r) === (every ? 'promptPair' : 'promptBoard'), `${lv}#${i + 1} prompt key`);
      is(C.celebrateKey(r, false) === (every ? 'celebrateAll' : 'celebrateBoard'), `${lv}#${i + 1} celebrate key`);
    }
    if (row[0] === 'M') {
      is(r.n === row[1] && r.given === row[2] && r.tray.join() === row[3].join(), `${lv}#${i + 1} missing ${r.n} given ${r.given}`);
      is(r.answer === row[4] && r.slot === row[5] - 1, `${lv}#${i + 1} answer ${r.answer} slot ${r.slot + 1}`);
      is(r.tray.filter(v => r.given + v === r.n).length === 1, `${lv}#${i + 1} exactly one right tray card`);
      is(r.tray.every((v, j) => j === 0 || v === r.tray[j - 1] + 1), `${lv}#${i + 1} tray is four consecutive numbers in counting order`);
    }
    if (row[0] === 'W') is(r.a === row[1] && r.b === row[2] && r.n === row[1] + row[2], `${lv}#${i + 1} whole ${r.a}+${r.b}`);
    const nums = [r.n].concat(r.cards || [], r.tray || [], r.given ? [r.given] : [], r.a ? [r.a, r.b] : []);
    is(nums.every(x => x >= 1), `${lv}#${i + 1}: no 0 anywhere`);
  });
  /* 6: tray answer slots balanced; biggest / smallest strategies */
  const ms = rs.filter(r => r.kind === 'missing'), cnt = [0, 0, 0, 0];
  ms.forEach(r => cnt[r.slot]++);
  const used = cnt.filter((c, j) => j < Math.max(...ms.map(r => r.slot)) + 1 || c);
  is(Math.max(...cnt) - Math.min(...cnt.slice(0, Math.min(4, ms.length))) <= 1, `${lv}: tray slots ${cnt.join('/')} differ by ≤ 1`);
  is(ms.filter(r => r.slot === 3).length <= 2 && ms.filter(r => r.slot === 0).length <= 2, `${lv}: "always the biggest/smallest" ≤ 2 of the level's MISSING rounds`);
  void used;
  is(rs.filter(r => r.kind === 'pair').length >= 1, `${lv}: has a PAIR UP board to open a pass`);
}
/* every whole 3–10 of the old activity is present */
const wholes = new Set(); Object.values(allR).forEach(rs => rs.forEach(r => wholes.add(r.n)));
for (let n = 3; n <= 10; n++) is(wholes.has(n), `the whole ${n} is present`);
const tenMiss = allR.ten.filter(r => r.kind === 'missing').map(r => r.answer);
is(new Set(tenMiss).size === tenMiss.length, `Make 10 missing answers all different (${tenMiss})`);
is(C.level('nope') === 'upto5' && C.level('ten') === 'ten', 'unknown level → Up to 5');

/* ---- 3 + 8: PAIR UP boards played through every pairing ---- */
function playBoard(r, seed) {
  const st = C.newState(r, seeded(seed));
  is(st.cards.length === r.cards.length && st.cards.map(c => c.v).sort().join() === r.cards.slice().sort().join(), `${r.id} board holds the design's cards`);
  /* every wrong pair first: a miss, nothing found */
  const ids = st.cards.map(c => c.id);
  let wrongTried = 0;
  for (let i = 0; i < ids.length && wrongTried < 6; i++) for (let j = 0; j < ids.length && wrongTried < 6; j++) {
    if (i === j) continue;
    const a = C.card(st, ids[i]).v, b = C.card(st, ids[j]).v; if (a + b === r.n) continue;
    const s2 = C.newState(r, seeded(seed));
    const p1 = C.plug(s2, ids[i]);
    is(p1.act === 'plug' && p1.side === 'L' && C.plugged(s2)[0] === a, `${r.id}: the first card plugged lights from the LEFT`);
    const p2 = C.plug(s2, ids[j]);
    is(p2.test && p2.test.result === (a + b > r.n ? 'cross' : 'short') && p2.test.k === Math.abs(a + b - r.n), `${r.id}: ${a}+${b} → ${p2.test && p2.test.result} ${p2.test && p2.test.k}`);
    is(p2.test && p2.test.a === a && p2.test.b === b, `${r.id}: left = first card ${a}, right = second ${b}`);
    is(s2.found.length === 0 && s2.cards.every(c => !c.found) && s2.misses === 1 && !s2.done, `${r.id}: a wrong pair finds nothing`);
    const em = C.errorMarks(s2);
    is(em && em.count === Math.abs(a + b - r.n), `${r.id}: the error numbers itself (${Math.abs(a + b - r.n)} bulbs)`);
    is(C.hint(s2) && C.hint(s2).wrong && /^(hintCross|hintShort)/.test(C.hint(s2).key), `${r.id}: miss 1 names the error`);
    const k1 = C.hint(s2).key; is((Math.abs(a + b - r.n) === 1) === /1$/.test(k1), `${r.id}: singular key for 1 bulb (${k1})`);
    /* miss 2: the first card stays plugged, the bracket shows the partner's size */
    C.plug(s2, ids[i]); const p3 = C.plug(s2, ids[j]);
    is(s2.help === 2 && s2.left === ids[i] && s2.right === null, `${r.id}: after a second miss the first card stays plugged`);
    const br = C.bracket(s2);
    is(br && br.count === r.n - a && br.from === a, `${r.id}: the bracket holds the partner's ${r.n - a} bulbs`);
    is(C.hint(s2).key === 'hintPartner', `${r.id}: miss 2 → hintPartner`);
    /* a new move takes the help away */
    C.unplug(s2, 'L');
    is(s2.help === 0 && !C.bracket(s2) && C.hint(s2) === null, `${r.id}: a move takes the help away`);
    void p3;
    wrongTried++;
  }
  /* then every right pair: found once, complete exactly at the last */
  const vals = st.cards.map(c => c.v), todo = [];
  const free = ids.slice();
  while (free.length) {
    const id = free.shift(), v = C.card(st, id).v, j = free.findIndex(x => C.card(st, x).v === r.n - v);
    is(j >= 0, `${r.id}: ${v} has a partner on the board`); if (j < 0) break;
    todo.push([id, free.splice(j, 1)[0]]);
  }
  is(todo.length === r.pairs, `${r.id}: ${todo.length} pairs on the board`);
  todo.forEach(([x, y], q) => {
    is(!st.done, `${r.id}: not complete before pair ${q + 1}`);
    const res = C.plug(st, y); const res2 = C.plug(st, x);
    is(res.side === 'L' && res2.test && res2.test.result === 'meet' && res2.test.a === C.card(st, y).v, `${r.id}: pair ${q + 1} meets, left = the first card`);
    is(C.card(st, x).found && C.card(st, y).found, `${r.id}: both cards found`);
    is(C.plug(st, x).act === 'locked', `${r.id}: a found card cannot be plugged again`);
    is(st.found.length === q + 1, `${r.id}: the garland holds ${q + 1}`);
  });
  is(st.done && C.hint(st) === null, `${r.id}: complete exactly when every pair is found`);
  is(C.plug(st, ids[0]).act === 'locked', `${r.id}: a finished board is locked`);
  void vals;
}
Object.values(allR).forEach(rs => rs.filter(r => r.kind === 'pair').forEach((r, i) => playBoard(r, 11 + i)));

/* ---- 4: MISSING and WHOLE have exactly one right answer ---- */
Object.values(allR).forEach(rs => rs.forEach(r => {
  if (r.kind === 'missing') {
    let rights = 0;
    r.tray.forEach((v, j) => {
      const st = C.newState(r);
      is(C.check(st).result === 'empty' && st.misses === 0, `${r.id}: Light it with nothing plugged is not a miss`);
      is(C.hint(st).key === 'hintPlug', `${r.id}: "Tap a number to plug it in."`);
      C.plug(st, st.cards[j].id);
      is(C.plugged(st)[0] === r.given && C.plugged(st)[1] === v, `${r.id}: the given ${r.given} is plugged left, ${v} right`);
      const res = C.check(st);
      if (res.result === 'meet') { rights++; is(v === r.answer && st.done, `${r.id}: ${v} lights it`); }
      else {
        is(!st.done && st.misses === 1 && res.k === Math.abs(r.given + v - r.n), `${r.id}: ${v} → ${res.result} ${res.k}`);
        const em = C.errorMarks(st); is(em && em.count === res.k, `${r.id}: ${v} numbers its ${res.k} bulbs`);
        C.check(st);
        is(st.help === 2 && C.bracket(st) && C.bracket(st).count === r.answer && C.hint(st).key === 'hintPartner', `${r.id}: miss 2 brackets ${r.answer} bulbs`);
        /* another card replaces it */
        const other = st.cards.find(c => c.v === r.answer); C.plug(st, other.id);
        is(st.help === 0 && C.plugged(st)[1] === r.answer, `${r.id}: tapping another card replaces it and drops the help`);
      }
    });
    is(rights === 1, `${r.id}: exactly one right tray card`);
  }
  if (r.kind === 'whole') {
    let rights = 0;
    const st0 = C.newState(r);
    is(C.length(st0) === null, `${r.id}: no string until the child chooses`);
    is(C.check(st0).result === 'empty' && st0.misses === 0 && C.hint(st0).key === 'hintChoose', `${r.id}: Light it before choosing → "Choose…", no miss`);
    is(!C.choose(st0, 1) && !C.choose(st0, 11) && !C.choose(st0, 0), `${r.id}: lengths outside 2–10 refused`);
    for (let len = 2; len <= 10; len++) {
      const st = C.newState(r); C.choose(st, len);
      is(C.length(st) === len, `${r.id}: the string takes ${len} bulbs`);
      const res = C.check(st), law = C.light(r.a, r.b, len);
      is(res.result === law.result && res.k === law.k, `${r.id}: length ${len} judged by the same law (${law.result})`);
      if (res.result === 'meet') { rights++; is(len === r.a + r.b && st.done, `${r.id}: only ${r.a + r.b} lights it`); }
      else {
        const h = C.hint(st);
        is(h.key === (res.result === 'cross' ? (res.k === 1 ? 'hintWholeCross1' : 'hintWholeCross') : (res.k === 1 ? 'hintWholeShort1' : 'hintWholeShort')), `${r.id}: length ${len} → ${h.key}`);
        C.check(st);
        const gh = C.ghost(st);
        is(gh && gh.length === r.n && gh[gh.length - 1] === '?' && gh.indexOf(r.n) < 0, `${r.id}: miss 2 ghost string numbered 1…${r.n - 1}, "?" — never the answer`);
        is(C.hint(st).key === 'hintBulbs' && !C.bracket(st), `${r.id}: miss 2 → hintBulbs`);
        C.choose(st, r.n); is(!C.ghost(st), `${r.id}: choosing again takes the help away`);
      }
    }
    is(rights === 1, `${r.id}: exactly one right length`);
  }
}));

/* ---- 7: board layout — partner adjacency vs a random layout; never counting order ---- */
function fy(a, rnd) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function adjPartners(vals, n) {
  const c = vals.length <= 5 ? vals.length : Math.ceil(vals.length / 2); let hits = 0;
  for (let i = 0; i < vals.length; i++) for (let j = i + 1; j < vals.length; j++) {
    const ri = Math.floor(i / c), rj = Math.floor(j / c), ci = i % c, cj = j % c;
    const adj = (ri === rj && Math.abs(ci - cj) === 1) || (ci === cj && Math.abs(ri - rj) === 1);
    if (adj && vals[i] + vals[j] === n) hits++;
  }
  return hits;
}
Object.values(allR).forEach(rs => rs.filter(r => r.kind === 'pair').forEach(r => {
  const SEEDS = 10000; let core = 0, base = 0, sorted = 0;
  const rc = seeded(77), rb = seeded(99);
  for (let s = 0; s < SEEDS; s++) {
    const L = C.layoutBoard(r.cards, rc);
    is(L.slice().sort().join() === r.cards.slice().sort().join(), `${r.id}: a layout keeps the board's cards`);
    if (L.every((v, i) => i === 0 || v >= L[i - 1])) sorted++;
    core += adjPartners(L, r.n); base += adjPartners(fy(r.cards, rb), r.n);
  }
  is(sorted === 0, `${r.id}: never laid out in counting order (${sorted})`);
  const rate = core / SEEDS, b = base / SEEDS;
  is(Math.abs(rate - b) <= 0.03 * Math.max(b, 0.3), `${r.id}: partners adjacent ${rate.toFixed(3)} vs random ${b.toFixed(3)} (±3 %)`);
  /* C.adjacent agrees with the oracle's grid */
  const c = C.cols(r.cards.length);
  for (let i = 0; i < r.cards.length; i++) for (let j = 0; j < r.cards.length; j++) if (i !== j) {
    const ri = Math.floor(i / c), rj = Math.floor(j / c), ci = i % c, cj = j % c;
    is(C.adjacent(i, j, r.cards.length) === ((ri === rj && Math.abs(ci - cj) === 1) || (ci === cj && Math.abs(ri - rj) === 1)), `adjacent(${i},${j},${r.cards.length})`);
  }
}));
/* the PAIR UP state's own board is shuffled by newState (not the design's order every time) */
{ const r = allR.ten[0], seen = new Set(); for (let s = 0; s < 40; s++) seen.add(C.newState(r, seeded(s)).cards.map(c => c.v).join()); is(seen.size > 30, `newState shuffles the board (${seen.size} layouts of 40)`); }

/* ---- order: a pass opens on PAIR UP, no two WHOLE side by side, never the same order twice, no seam repeat ---- */
for (const lv of Object.keys(TABLE)) {
  const pool = allR[lv]; let prev = null; const seen = new Set();
  for (let s = 0; s < 300; s++) {
    const o = C.order(pool, seeded(1000 + s), prev);
    is(o.length === pool.length && new Set(o).size === pool.length, `${lv}: order is a permutation`);
    is(pool[o[0]].kind === 'pair', `${lv}: a pass opens on a PAIR UP board`);
    is(o.every((x, i) => i === 0 || !(pool[x].kind === 'whole' && pool[o[i - 1]].kind === 'whole')), `${lv}: no two WHOLE rounds side by side`);
    if (prev) { is(o.join() !== prev.join(), `${lv}: never the same order twice`); is(o[0] !== prev[prev.length - 1], `${lv}: a pass never opens where the last closed`); }
    seen.add(o.join()); prev = o;
  }
  is(seen.size > 50, `${lv}: orders vary (${seen.size})`);
  /* the same random source that made an order must not make it again when it is the previous pass */
  for (let s = 0; s < 20; s++) { const o1 = C.order(pool, seeded(300 + s), null), o2 = C.order(pool, seeded(300 + s), o1); is(o2.join() !== o1.join(), `${lv}: the same source cannot repeat the last pass (seed ${300 + s})`); }
  /* a fixed random source gives the same order (the activity's reshuffle is order-only) */
  is(C.order(pool, seeded(5), null).join() === C.order(pool, seeded(5), null).join(), `${lv}: order is a pure function of its random source`);
}

/* ---- free play ---- */
{ const st = C.newPlay(7);
  is(st.explore && st.n === 7 && st.cards.map(c => c.v).join() === '1,2,3,4,5,6,7,8,9', 'Lantern maker: cards 1–9, a string of 7');
  C.setLength(st, 15); is(st.n === 10, 'the string stops at 10'); C.setLength(st, 0); is(st.n === 2, 'and at 2');
  C.setLength(st, 8); const a = C.plug(st, st.cards[2].id), b = C.plug(st, st.cards[4].id);
  is(a.side === 'L' && b.side === 'R' && b.test.result === 'meet', 'free play: 3 and 5 light a string of 8');
  is(st.left && st.right && !st.done && st.misses === 0 && C.hint(st) === null && C.check(st) === null, 'free play: nothing judged, nothing found');
  const c = C.plug(st, st.cards[6].id); is(c.test.result === 'cross' && c.test.k === 2 && st.misses === 0, 'free play: another card replaces the right one, no miss'); }

/* ---- layout: everything fits; floors ---- */
for (const W of [296, 312, 336, 380, 420, 440, 560, 648, 656, 900]) for (let n = 2; n <= 10; n++) {
  const L = C.layout(W, n);
  const width = n * L.bulb + (n - 1) * L.sp + L.five + 2 * L.socket + 16;
  is(width <= W, `layout ${W}/${n}: the string fits the stage (${width} ≤ ${W})`);
  is(L.bulb >= 18, `layout ${W}/${n}: bulbs ${L.bulb} ≥ 18`);
  is(L.key >= 44 && L.card.h >= 64 && L.card.w >= 52, `layout ${W}: keys and cards are real tap targets`);
  is(5 * L.card.w + 4 * 8 <= L.left, `layout ${W}: five cards fit a row (${5 * L.card.w + 32} ≤ ${L.left})`);
  if (W >= 312 && W < 640) is(L.card.w >= 56 && L.card.h >= 68, `layout ${W}: cards ≥ 56 × 68 on phones`);
  if (L.mode === 'wide') is(L.card.w >= 80 && L.card.font >= 48, `layout ${W}: cards 80 × 92 wide`);
}

/* ---- strings ×11 ---- */
if (ACT) {
  const S = ACT.strings, keys = Object.keys(S);
  keys.forEach(k => LOCALES.forEach(l => is(typeof S[k][l] === 'string' && S[k][l].trim().length, `string ${k}.${l}`)));
  keys.forEach(k => { const ph = (s) => (s.match(/\{\w+\}/g) || []).sort().join(); LOCALES.forEach(l => is(ph(S[k][l]) === ph(S[k].en), `${k}.${l} placeholders`)); });
  keys.forEach(k => LOCALES.forEach(l => is(!/\b0\b/.test(S[k][l].replace(/\{\w+\}/g, '')), `${k}.${l}: no 0`)));
  const ban = /\b(free|gratis|kostenlos|gratuit|gratuito|gratuita|ilmai\w*)\b/i;
  keys.forEach(k => LOCALES.forEach(l => is(!ban.test(S[k][l]), `${k}.${l}: no "free"`)));
  LOCALES.filter(l => l === 'fr').forEach(l => keys.forEach(k => is(!/ [?!:;]/.test(S[k][l]) && !/ /.test(S[k][l]), `${k}.fr: U+202F before ? ! : ;`)));
  /* every hint / prompt / celebrate key the core can return exists */
  const coreKeys = new Set();
  Object.values(allR).forEach(rs => rs.forEach(r => { coreKeys.add(C.promptKey(r)); coreKeys.add(C.celebrateKey(r, false)); coreKeys.add(C.celebrateKey(r, true)); }));
  ['hintPlug', 'hintChoose', 'hintCross1', 'hintCross', 'hintShort1', 'hintShort', 'hintWholeCross1', 'hintWholeCross', 'hintWholeShort1', 'hintWholeShort', 'hintPartner', 'hintBulbs', 'pairDone', 'promptMissing10'].forEach(k => coreKeys.add(k));
  coreKeys.forEach(k => is(keys.includes(k), `string ${k} exists`));
  is(ACT.defaults.numbers === 'upto5' && ACT.defaults.dots === 'off', 'defaults: Up to 5, dots off');
}

console.log(`verify-lantern-string-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
