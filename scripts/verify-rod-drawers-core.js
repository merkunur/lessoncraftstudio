#!/usr/bin/env node
/* =====================================================================
   verify-rod-drawers-core.js — ACTIVITY #95, The Ten-Rod Drawers
   (1.NBT.B.3). Its OWN oracle (never the core's answers):
     · every compare round's relation and deciding place recomputed from
       the numerals as strings, left to right; numbers never 0;
     · the pass shapes: exactly one "=" per level; two-digit has ≥ 3 digit
       swaps and ≥ 2 equal-tens rounds; the bigger side is 40–60 % left;
       four-digit decides at thousands, hundreds and tens at least once;
     · the drawers: only a free place opens; a place right of an open,
       different place is SEALED; the sign stands up exactly when the
       deciding place is open; it turns flat → < → > → = → <;
     · Check: nothing before the deciding drawers / with a flat sign; right
       only with the true sign; the miss kinds and their hints;
     · order rounds: the waiting row is never already in order, the
       greatest card starts in places 1/2/3 as 3/3/2; right only in the
       steps' direction; the first misplaced cabinet hops back;
     · four-digit grouping per locale (en comma, fr/sv/no/fi narrow
       no-break space, the rest ungrouped — never a point);
     · the plan: a permutation, never the previous pass, its rules hold;
     · every hint key the core can return is authored in all 11 locales;
       the fruits are labelled colour library pictures.
   Usage: node scripts/verify-rod-drawers-core.js
   ===================================================================== */
'use strict';
const path = require('path'), fs = require('fs');
const C = require(path.join(process.env.RD_CORE_DIR || path.join(__dirname, '..', 'mini tools'), 'rod-drawers-core.js'));
let PASS = 0, FAIL = 0;
const ok = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('   FAIL: ' + m); } };
let seed = 7; const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
const LOCS = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
const P = { groups: 2, two: 2, four: 4 };
/* the oracle: compare as digit strings from the left */
const pad = (n, k) => String(n).padStart(k, '0');
const oRel = (a, b, k) => { const x = pad(a, k), y = pad(b, k); for (let i = 0; i < k; i++) if (x[i] !== y[i]) return x[i] < y[i] ? '<' : '>'; return '='; };
const oDecide = (a, b, k) => { const x = pad(a, k), y = pad(b, k); for (let i = 0; i < k; i++) if (x[i] !== y[i]) return i; return -1; };

for (const lv of C.LEVELS) {
  const k = P[lv], rs = C.ids(lv, 'compare').map(i => C.round(lv, 'compare', i));
  ok(rs.length >= 7, `${lv} compare: ≥ 7 rounds (${rs.length})`);
  for (const r of rs) {
    ok(r.a >= 1 && r.b >= 1, `${lv} ${r.a}/${r.b}: no 0`);
    ok(r.rel === oRel(r.a, r.b, k) && C.relation(r.a, r.b) === r.rel, `${lv} ${r.a} ${r.rel} ${r.b}: the relation recomputed`);
    ok(r.decide === oDecide(r.a, r.b, k), `${lv} ${r.a}/${r.b}: the deciding place ${r.decide}`);
    ok(r.places === k && String(r.a).length <= k && String(r.b).length <= k, `${lv} ${r.a}/${r.b}: fits ${k} places`);
    if (lv === 'groups') ok(r.a <= 20 && r.b <= 20 && C.DATA.FRUIT[r.fruit], `groups ${r.a}/${r.b}: within 20, a named fruit`);
    if (lv === 'two') ok(r.a >= 10 && r.b >= 10 && r.a <= 99 && r.b <= 99, `two ${r.a}/${r.b}: two-digit`);
    if (lv === 'four') ok(r.a >= 1000 && r.b >= 1000 && r.a <= 9999 && r.b <= 9999, `four ${r.a}/${r.b}: four-digit`);
  }
  const eq = rs.filter(r => r.rel === '=').length, lt = rs.filter(r => r.rel === '<').length, gt = rs.filter(r => r.rel === '>').length;
  ok(eq === 1, `${lv}: exactly one "=" round (${eq})`);
  ok(gt / (gt + lt) >= 0.4 && gt / (gt + lt) <= 0.6, `${lv}: the bigger number is left in 40–60 % (${gt}/${gt + lt})`);
  if (lv === 'two') {
    const swaps = rs.filter(r => String(r.a).split('').reverse().join('') === String(r.b) && r.a !== r.b).length;
    const eqT = rs.filter(r => Math.floor(r.a / 10) === Math.floor(r.b / 10) && r.a !== r.b).length;
    ok(swaps >= 3, `two: ≥ 3 digit swaps (${swaps})`); ok(eqT >= 2, `two: ≥ 2 equal-tens rounds (${eqT})`);
    const onesTrap = rs.filter(r => r.decide === 0 && oRel(r.a % 10, r.b % 10, 1) !== r.rel && r.a % 10 !== r.b % 10).length;
    ok(onesTrap >= 3, `two: ≥ 3 rounds where the ones point the wrong way (${onesTrap})`);
  }
  if (lv === 'four') for (const p of [0, 1, 2]) ok(rs.some(r => r.decide === p), `four: a round decides at place ${p}`);
  /* order */
  const os = C.ids(lv, 'order').map(i => C.round(lv, 'order', i));
  ok(os.length >= 7, `${lv} order: ≥ 7 rounds (${os.length})`);
  const start = [0, 0, 0];
  for (const r of os) {
    const want = r.cards.slice().sort((x, y) => x - y); if (r.dir === 'down') want.reverse();
    ok(new Set(r.cards).size === 3 && r.cards.every(n => n >= 1), `${lv} order ${r.cards}: three different numbers, no 0`);
    ok(r.cards.join() !== want.join(), `${lv} order ${r.cards} ${r.dir}: the waiting row is not already in order`);
    ok(C.sortedCards(r).join() === want.join(), `${lv} order ${r.cards}: the right order`);
    start[r.cards.indexOf(Math.max(...r.cards))]++;
  }
  ok(start.slice().sort().join() === '2,3,3', `${lv} order: the greatest card starts in places 1/2/3 as 3/3/2 (${start})`);
  ok(os.filter(r => r.dir === 'up').length === os.length / 2, `${lv} order: half smallest-first`);
}

/* ---- the drawers, the sign, Check ---- */
for (const lv of C.LEVELS) for (const i of C.ids(lv, 'compare')) {
  const r = C.round(lv, 'compare', i), k = r.places, w = `${lv} ${r.a}/${r.b}`, d = oDecide(r.a, r.b, k);
  const st = C.newState(r);
  ok(C.lockOf(st, 0) === 'free' && [...Array(k - 1)].every((_, j) => C.lockOf(st, j + 1) === 'locked'), `${w}: at rest only the first place is free`);
  ok(C.check(st).hint === (k === 4 ? 'hintLeftFirst' : 'hintTensFirst') && st.misses === 0, `${w}: Check with every drawer shut → open the first place, no miss`);
  if (k > 1) { const before = JSON.stringify(st.open); ok(C.openPlace(st, 1).result === 'rattle' && JSON.stringify(st.open) === before, `${w}: a locked place only rattles`); }
  ok(C.turn(st) === null && st.sign === 'flat', `${w}: the sign cannot turn before the drawers decide`);
  /* open from the left until the place that decides */
  for (let p = 0; p < k; p++) {
    const lk = C.lockOf(st, p), want = (d >= 0 && p > d) ? 'sealed' : 'free';
    ok(lk === want, `${w}: place ${p} is ${want} (${lk})`);
    if (lk !== 'free') { ok(C.openPlace(st, p).result === 'rattle' && !st.open[p], `${w}: sealed place ${p} stays shut`); continue; }
    ok(C.signReady(st) === false, `${w}: the sign lies flat before place ${p} is open`);
    if (p > 0 && (d < 0 || p <= d)) { ok(C.check(st).hint === (k === 4 ? 'hintNextNow' : 'hintOnesNow'), `${w}: same so far → open the next drawers`); }
    C.openPlace(st, p); ok(st.open[p], `${w}: place ${p} opens`);
  }
  ok(C.signReady(st), `${w}: the sign stands up once the deciding place is open`);
  ok(C.check(st).hint === 'hintTurn', `${w}: a flat sign → turn it`);
  const seq = []; for (let t = 0; t < 4; t++) seq.push(C.turn(st)); ok(seq.join('') === '<>=<', `${w}: the sign turns < > = < (${seq.join('')})`);
  /* every sign: right only when true; the miss kinds */
  for (const s of ['<', '>', '=']) {
    const s2 = C.newState(r); for (let p = 0; p < k; p++) C.openPlace(s2, p); let g = 0; while (s2.sign !== s && g++ < 5) C.turn(s2);
    const res = C.check(s2), right = s === oRel(r.a, r.b, k);
    ok((res.result === 'ok') === right, `${w} ${s}: ${right ? 'right' : 'not right'}`);
    ok(C.grab(s, r.a, r.b) === (right ? 'fits' : s === '=' ? 'tiltedEqual' : 'wrongWay'), `${w} ${s}: the grab`);
    if (!right) {
      const kind = oRel(r.a, r.b, k) === '=' ? 'notEqual' : s === '=' ? 'falseEqual' : 'wrongWay';
      ok(res.kind === kind && s2.reveal, `${w} ${s}: miss kind ${kind}, every drawer shown`);
      const h = C.hint(s2).key, wantH = kind === 'falseEqual' ? (k === 4 ? 'hintEqualFour' : 'hintEqual') : kind === 'notEqual' ? (k === 4 ? 'hintSameFour' : 'hintSame') : k === 4 ? 'hintLookLeft' : (d === 0 ? 'hintLookTens' : 'hintOnesDecide');
      ok(h === wantH, `${w} ${s}: hint ${wantH} (${h})`);
      C.check(s2); const h2 = kind === 'notEqual' ? (k === 4 ? 'hintSameFour' : 'hintSame') : 'hintOpenSide'; ok(C.hint(s2).key === h2 && s2.show === 2, `${w} ${s}: a second miss → ${h2} (never the open side when the numbers are equal)`);
      C.turn(s2); ok(s2.show === 0 && !s2.reveal && C.hint(s2) === null, `${w} ${s}: a turn clears the showing`);
    }
  }
}

/* ---- order rounds ---- */
for (const lv of C.LEVELS) for (const i of C.ids(lv, 'order')) {
  const r = C.round(lv, 'order', i), w = `${lv} order ${r.cards} ${r.dir}`, want = C.sortedCards(r);
  const st = C.newState(r);
  ok(C.check(st).hint === 'hintSteps' && st.misses === 0, `${w}: empty steps → hintSteps, no miss`);
  ok(C.openPlace(st, 0) === null && C.turn(st) === null, `${w}: no drawers or sign in an order round`);
  /* every arrangement */
  const perms = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];
  for (const pm of perms) {
    const s = C.newState(r); pm.forEach((c, k) => C.placeCard(s, c, k));
    const right = pm.map(c => r.cards[c]).join() === want.join(), res = C.check(s);
    ok((res.result === 'ok') === right, `${w} [${pm.map(c => r.cards[c])}]: ${right ? 'right' : 'not right'}`);
    if (!right) {
      let first = 0; while (r.cards[pm[first]] === want[first]) first++;
      ok(res.culprit === pm[first] && s.steps[first] === null && s.steps.filter(x => x != null).length === 2, `${w} [${pm.map(c => r.cards[c])}]: the cabinet on step ${first + 1} hops back`);
      ok(C.hint(s).key === (r.places === 4 ? 'hintOrderFour' : 'hintOrder'), `${w}: miss 1 hint`);
    }
  }
  const s = C.newState(r); C.placeCard(s, 0, 0); C.placeCard(s, 1, 0);
  ok(s.steps[0] === 1 && s.steps.indexOf(0) < 0, `${w}: a card dropped on a taken step from the row takes it (the other returns)`);
  C.placeCard(s, 2, 1); C.placeCard(s, 1, 1); ok(s.steps[1] === 1 && s.steps[0] === 2, `${w}: moving between steps swaps`);
  ok(C.unplace(s, 1) && s.steps.indexOf(1) < 0, `${w}: back to the waiting row`);
}

/* ---- four-digit grouping ---- */
const G = { en: ',', fr: ' ', sv: ' ', no: ' ', fi: ' ' };
for (const loc of LOCS) for (const n of [4321, 1999, 2000, 6005]) {
  const want = String(n).slice(0, 1) + (G[loc] || '') + String(n).slice(1);
  ok(C.format(n, loc, 'four') === want && !/\./.test(C.format(n, loc, 'four')), `${loc}: ${n} written ${JSON.stringify(want)}`);
}
ok(C.format(47, 'en', 'two') === '47' && C.format(14, 'fr', 'groups') === '14', 'two-digit and groups never grouped');

/* ---- the plan ---- */
for (const lv of C.LEVELS) for (const task of C.TASKS) {
  let prev = null;
  for (let pass = 0; pass < 30; pass++) {
    const o = C.plan(lv, task, rnd, prev).order, n = C.ids(lv, task).length;
    ok(o.slice().sort((a, b) => a - b).join() === C.ids(lv, task).join() && o.length === n, `${lv} ${task} pass ${pass}: a permutation`);
    ok(!prev || o.join() !== prev.join(), `${lv} ${task} pass ${pass}: never the previous order`);
    if (task === 'order') ok(o.every((x, i) => i === 0 || C.round(lv, task, x).dir !== C.round(lv, task, o[i - 1]).dir), `${lv} order pass ${pass}: the direction alternates`);
    else ok(o.every((x, i) => i < 2 || !(C.round(lv, task, o[i - 2]).rel === C.round(lv, task, o[i - 1]).rel && C.round(lv, task, o[i - 1]).rel === C.round(lv, task, x).rel)), `${lv} compare pass ${pass}: never three of one sign in a row`);
    prev = o;
  }
  let s1 = 11; const r1 = () => { s1 = (s1 * 48271) % 2147483647; return s1 / 2147483647; };
  let s2 = 11; const r2 = () => { s2 = (s2 * 48271) % 2147483647; return s2 / 2147483647; };
  ok(C.plan(lv, task, r1, null).order.join() === C.plan(lv, task, r2, null).order.join(), `${lv} ${task}: the plan replays from its seed`);
  /* the same seed again, with that order as the previous pass: the first shuffle IS the previous order, and the plan must refuse it */
  let s3 = 11; const r3 = () => { s3 = (s3 * 48271) % 2147483647; return s3 / 2147483647; };
  let s4 = 11; const r4 = () => { s4 = (s4 * 48271) % 2147483647; return s4 / 2147483647; };
  const first = C.plan(lv, task, r3, null).order;
  ok(C.plan(lv, task, r4, first).order.join() !== first.join(), `${lv} ${task}: a pass that would repeat the previous order is refused`);
}

/* ---- strings, pictures ---- */
{
  const src = fs.readFileSync(path.join(__dirname, '..', 'mini tools', 'rod-drawers-activity.js'), 'utf8');
  const block = src.slice(src.indexOf('/*STRINGS-BEGIN*/'), src.indexOf('/*STRINGS-END*/'));
  const authored = {}; for (const line of block.split('\n')) { const m = line.match(/^\s+(\w+):\s*\{(.*)\}\s*,?\s*$/); if (m) authored[m[1]] = LOCS.filter(l => new RegExp('(^|,)' + l + ":'").test(m[2])); }
  ok(Object.keys(authored).length >= 50, `the strings block parses (${Object.keys(authored).length} keys)`);
  for (const k in authored) ok(authored[k].length === 11, `string ${k}: all 11 locales (${authored[k].length})`);
  const seen = new Set(['hintTensFirst', 'hintOnesNow', 'hintLeftFirst', 'hintNextNow', 'hintTurn', 'hintSteps', 'hintLookTens', 'hintOnesDecide', 'hintLookLeft', 'hintEqual', 'hintEqualFour', 'hintSame', 'hintSameFour', 'hintOpenSide', 'hintOrder', 'hintOrderFour', 'hintColumns']);
  for (const k of seen) ok(authored[k] && authored[k].length === 11, `hint ${k} authored`);
  for (const f in C.DATA.FRUIT) {
    const [th, noun] = C.DATA.FRUIT[f], j = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'mini tools', 'pictures', th + '.json'), 'utf8'));
    ok(j.nouns[noun] && !/(^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i.test(j.dir), `fruit ${f}: a labelled colour picture ${th}/${noun}`);
    ok(/^#[0-9A-F]{6}$/i.test(C.DATA.FRUIT[f][2]), `fruit ${f}: a counter colour`);
  }
  ok(C.DATA.FRUIT.pear[0] === 'at-the-supermarket', 'the pear is the plainly green supermarket one (fruits/pear is red-blushed)');
}

console.log(`verify-rod-drawers-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
