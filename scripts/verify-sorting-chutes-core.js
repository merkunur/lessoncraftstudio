#!/usr/bin/env node
/* =====================================================================
   verify-sorting-chutes-core.js — the build gate for ACTIVITY #35, "Sort
   and Count" (K.MD.B.3), THE SORTING CHUTES. Design: designs/035-choice-board.md §12.
   Its own ground truth: the piles re-typed from the design (with the
   picture rulings applied: no mango — it reads as a peach — and no duck in
   the sky — every duck is a duckling); every count and every answer
   re-derived here; counts 1–7 (2 × 2 ≤ 5), distinct where a question
   compares; an order round never starts sorted; the belt never runs more
   than three of a kind; 200 random sorting sessions with wrong chutes and
   undos classify every thing exactly once; answer values spread; the
   most / fewest tube's position balanced; every picture on disk, labelled,
   in a colour theme; the labels never in a round; the layout at every
   width; the strings ×11.
   Run: node scripts/verify-sorting-chutes-core.js   (SC_CORE_DIR = a mutant core dir)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const C = require(path.join(process.env.SC_CORE_DIR || MT, 'sorting-chutes-core.js'));
const STR = (function () { const vm = require('vm'); const ctx = { window: {}, SortingChutesCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'sorting-chutes-activity.js'), 'utf8') + '\n;this.__A = SortingChutesActivity;', ctx); return ctx.__A.strings; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('   FAIL: ' + m); } };
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

/* ---------- 0. the design's piles, re-typed ---------- */
const OWN = {
  A1: ['a:cat dog duck|f:apple banana', 'count animals', 3], A2: ['f:apple orange banana strawberry pear|a:dog fish', 'count fruits', 5],
  A3: ['a:fish duck rabbit horse|f:pear lemon raspberry orange kiwi pineapple', 'most', 'fruits'], A4: ['v:car bus|a:cat dog fish rabbit sheep pig horse', 'count vehicles', 2],
  A5: ['a:owl fox elephant|v:car truck train taxi van', 'order', 'vehicles,animals'], A6: ['f:strawberry apple pear banana|a:horse pig sheep', 'count animals', 3],
  A7: ['v:car bus truck train airplane boat|f:banana', 'fewest', 'fruits'], A8: ['a:giraffe horse rabbit pig sheep|f:kiwi pineapple watermelon', 'count fruits', 3],
  A9: ['v:airplane boat helicopter|a:turtle owl fox rabbit', 'order', 'animals,vehicles'],
  B1: ['a:cat dog duck fish|f:apple banana|v:car bus truck', 'count vehicles', 3], B2: ['a:rabbit horse|f:pear lemon orange raspberry kiwi|v:train taxi van', 'most', 'fruits'],
  B3: ['a:pig sheep cat dog duck|f:kiwi|v:boat airplane bus', 'order', 'animals,vehicles,fruits'], B4: ['a:owl fox elephant|f:banana apple strawberry pear|v:car truck', 'count fruits', 4],
  B5: ['a:turtle penguin giraffe horse rabbit pig|f:orange pear|v:helicopter car bus van', 'fewest', 'fruits'], B6: ['a:cat fish|f:apple raspberry pear banana lemon kiwi orange|v:train boat taxi truck car', 'order', 'fruits,vehicles,animals'],
  B7: ['a:dog duck sheep|f:banana|v:airplane bus car van train', 'more vehicles animals', 2], B8: ['a:elephant giraffe horse donkey|f:strawberry watermelon pineapple|v:tractor bus', 'most', 'animals'],
  B9: ['a:rabbit cat dog pig sheep|f:apple orange|v:car taxi boat', 'more animals fruits', 3],
  C1: ['a:owl bat dog pig cat|v:airplane car bus truck train', 'cell animals.fly', 2], C2: ['a:parrot owl seagull rabbit horse|v:helicopter jet boat taxi tractor car bus', 'cell vehicles.ground', 5],
  C3: ['a:parrot elephant turtle penguin dog|v:airplane helicopter rocket car train', 'fly', 4], C4: ['a:bat owl parrot seagull cat|v:jet airplane bus truck taxi', 'mostCell', 'animals.fly'],
  C5: ['a:owl seagull pig horse rabbit dog cat|v:rocket boat car train tractor', 'all animals', 7], C6: ['a:seagull parrot bat penguin turtle|v:helicopter airplane jet rocket bus', 'fly', 7],
  C7: ['a:bat elephant dog pig|v:airplane jet car bus truck taxi train', 'cell vehicles.ground', 5]
};
const OWNFLY = new Set(['owl', 'bat', 'seagull', 'parrot', 'airplane', 'helicopter', 'jet', 'rocket']);
const CATL = { a: 'animals', f: 'fruits', v: 'vehicles' };
const parse = (s) => { const p = {}; s.split('|').forEach(g => { const [c, ns] = g.split(':'); p[CATL[c]] = ns.split(' '); }); return p; };
const all = C.rounds('two').concat(C.rounds('three'), C.rounds('fly'));
is(C.rounds('two').length === 9 && C.rounds('three').length === 9 && C.rounds('fly').length === 7, 'nine, nine and seven rounds');
for (const r of all) {
  const o = OWN[r.id], pile = parse(o[0]), fly = r.id[0] === 'C';
  is(JSON.stringify(Object.keys(pile).sort().map(k => [k, pile[k]])) === JSON.stringify(Object.keys(r.pile).sort().map(k => [k, r.pile[k]])), `${r.id}: the pile as designed`);
  const own = {}; for (const c in pile) for (const n of pile[c]) { const k = fly ? c + (OWNFLY.has(n) ? '.fly' : '.ground') : c; own[k] = (own[k] || 0) + 1; }
  const cnt = C.counts(r);
  is(Object.keys(own).every(k => own[k] === cnt[k]) && Object.keys(cnt).every(k => cnt[k] === (own[k] || 0)), `${r.id}: the counts (${JSON.stringify(own)})`);
  Object.values(own).forEach(v => is(v >= 1 && v <= (fly ? 5 : 7), `${r.id}: every tube holds 1–${fly ? 5 : 7} (${v})`));
  const qt = o[1].split(' '), t = C.truth(r);
  is(r.q.type === qt[0], `${r.id}: the question is ${qt[0]}`);
  const want = o[2];
  is(Array.isArray(t) ? t.join() === want : t === want, `${r.id}: the answer ${JSON.stringify(t)} is the design's ${want}`);
  /* our own answer, from our own counts */
  let mine;
  if (qt[0] === 'count') mine = own[qt[1]]; else if (qt[0] === 'more') mine = own[qt[1]] - own[qt[2]]; else if (qt[0] === 'cell') mine = own[qt[1]];
  else if (qt[0] === 'fly') mine = (own['animals.fly'] || 0) + (own['vehicles.fly'] || 0); else if (qt[0] === 'all') mine = own[qt[1] + '.fly'] + own[qt[1] + '.ground'];
  else if (qt[0] === 'order') mine = Object.keys(own).sort((a, b) => own[b] - own[a]).join();
  else { const ks = Object.keys(own); mine = ks.reduce((b, k) => (qt[0] === 'fewest' ? own[k] < own[b] : own[k] > own[b]) ? k : b, ks[0]); }
  is(String(mine) === String(want), `${r.id}: our own derivation agrees (${mine})`);
  if (['most', 'fewest', 'order', 'mostCell'].includes(qt[0])) { const v = Object.values(own); is(new Set(v).size === v.length, `${r.id}: every tube count differs where the question compares (${v})`); }
  is(Object.keys(r).every(k => ['id', 'pile', 'q', 'i'].includes(k)), `${r.id}: no stored answer (${Object.keys(r)})`);
  is(typeof STR[C.prompt(r)] === 'object', `${r.id}: its prompt ${C.prompt(r)} is authored`);
  if ((r.q.type === 'most' || r.q.type === 'fewest') && C.tubeKeys(r).length === 2) is(/Two$/.test(C.prompt(r)) && /\b(more|fewer)\b/.test(STR[C.prompt(r)].en), `${r.id}: two groups ask "more / fewer", not "most / fewest"`);
  is(C.capOf(r) >= Math.max(...Object.values(own)) && C.capOf(r) >= 5 && C.capOf(r) <= (fly ? 5 : 7), `${r.id}: its tubes hold every count (${C.capOf(r)} slots)`);
}
/* answer values: spread over the strip */
for (const g of ['two', 'three', 'fly']) {
  const vals = C.rounds(g).map(r => C.truth(r)).filter(v => typeof v === 'number');
  const cnt = {}; vals.forEach(v => cnt[v] = (cnt[v] || 0) + 1);
  is(Object.keys(cnt).length >= 3, `${g}: number answers cover ≥ 3 values (${JSON.stringify(cnt)})`);
  is(Math.max(...Object.values(cnt)) <= 3, `${g}: no number answer more than 3 times`);
  vals.forEach(v => is(v >= 1 && v <= 10, `${g}: answer ${v} on the 1–10 strip`));
}

/* ---------- 1. the pictures ---------- */
const pics = {}; for (const f of fs.readdirSync(path.join(MT, 'pictures'))) if (f.endsWith('.json')) { const j = JSON.parse(fs.readFileSync(path.join(MT, 'pictures', f), 'utf8')); for (const n in j.nouns) (pics[n] = pics[n] || []).push(decodeURIComponent((j.nouns[n].src || '').split('/')[3] || '')); }
const used = new Set(); all.forEach(r => C.items(r).forEach(n => used.add(n)));
for (const n of used) {
  const d = C.dirOf(n);
  /* case-exact: Windows finds 'things that fly' in 'Things That Fly'; the server does not */
  const TH = path.join(ROOT, 'image-library-webp', 'themes');
  is(fs.readdirSync(TH).includes(d) && fs.readdirSync(path.join(TH, d)).includes(n + '@2x.webp'), `${n}: the picture exists, case-exact (${d})`);
  is((pics[n] || []).includes(d), `${n}: labelled in mini tools/pictures (${d})`);
  is(!/(^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i.test(d), `${n}: a colour theme`);
  is(C.KIND[n] && C.CATS.includes(C.KIND[n]), `${n}: has a kind`);
}
['cherry', 'plum', 'peach', 'apricot', 'mango'].forEach(n => is(!used.has(n), `no ${n} (drawn like an apple / a peach)`));
for (const c of C.CATS) for (const [d, n] of C.LABELS[c]) {
  is(fs.existsSync(path.join(ROOT, 'image-library-webp', 'themes', d, n + '@2x.webp')) && (pics[n] || []).includes(d), `label ${n}: exists and labelled`);
  is(!used.has(n), `label ${n}: never in a round`);
}
/* who flies: our own list; the duck (a duckling) never flies; the penguin only on the ground */
for (const n of used) is(!!C.FLY[n] === OWNFLY.has(n), `${n}: ${OWNFLY.has(n) ? 'flies' : 'does not fly'}`);
C.rounds('fly').forEach(r => { is(!C.items(r).includes('duck'), `${r.id}: no duck in the sky table (every duck is a duckling)`); if (C.items(r).includes('penguin')) is(C.keyOf('penguin', true) === 'animals.ground', `${r.id}: the penguin goes to the ground`); });

/* ---------- 2. the belt, the deal, the sorting ---------- */
{
  let seed = 3; const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  let longRun = 0, sortedStart = 0, bad = 0;
  for (const r of all) for (let s = 0; s < 300; s++) {
    const b = C.belt(r, rnd); let run = 1;
    for (let i = 1; i < b.length; i++) { if (C.KIND[b[i]] === C.KIND[b[i - 1]]) { run++; if (run > 3) longRun++; } else run = 1; }
    if (b.slice().sort().join() !== C.items(r).slice().sort().join()) bad++;
    if (r.q.type === 'order') { const d = C.deal(r, rnd), c = C.counts(r); let ok = true; for (let i = 1; i < d.length; i++) if (c[d[i]] > c[d[i - 1]]) ok = false; if (ok) sortedStart++; }
  }
  is(bad === 0, 'the belt carries the whole pile, once each');
  is(longRun === 0, `the belt never runs more than three of a kind (${longRun})`);
  is(sortedStart === 0, `an order round never starts already sorted (${sortedStart})`);
  /* most / fewest: the answer tube's position */
  for (const g of ['two', 'three']) {
    const pos = {}, has = {};
    for (const r of C.rounds(g).filter(r => r.q.type === 'most' || r.q.type === 'fewest')) for (let s = 0; s < 2000; s++) { const d = C.deal(r, rnd), i = d.indexOf(C.truth(r)); pos[i] = (pos[i] || 0) + 1; d.forEach((_, j) => has[j] = (has[j] || 0) + 1); }
    Object.keys(has).forEach(j => { const p = (pos[j] || 0) / (has[j] / (g === 'two' ? 2 : 3)) / (g === 'two' ? 2 : 3); const share = (pos[j] || 0) / Object.values(pos).reduce((a, b) => a + b, 0); is(share >= (g === 'two' ? 0.3 : 0.2) && share <= 0.7, `${g}: the most/fewest tube stands in position ${+j + 1} ${(100 * share).toFixed(0)} % of the time`); void p; });
  }
  /* 200 random sorting sessions: wrong chutes bounce, undo takes only the top, every thing is classified exactly once */
  let worst = 0;
  for (let s = 0; s < 200; s++) {
    const r = all[s % all.length], st = C.newState(r, { rnd }), keys = C.tubeKeys(r);
    for (let step = 0; step < 400 && st.phase === 'sort'; step++) {
      const cur = C.current(st), want = C.keyOf(cur, st.fly), x = rnd();
      if (x < 0.25) { const wrong = keys.filter(k => k !== want); if (wrong.length) { const before = JSON.stringify([st.belt, st.tubes]); const res = C.drop(st, wrong[Math.floor(rnd() * wrong.length)]); if (res.result !== 'bounce' || JSON.stringify([st.belt, st.tubes]) !== before) worst++; } }
      else if (x < 0.35) { const k = keys[Math.floor(rnd() * keys.length)]; const top = st.tubes[k][st.tubes[k].length - 1], len = st.tubes[k].length; const res = C.undoTop(st, k); if (len && (!res || C.current(st) !== top || st.tubes[k].length !== len - 1)) worst++; }
      else C.drop(st, want);
    }
    const flat = Object.values(st.tubes).flat();
    if (st.phase !== 'ask' || flat.length !== C.items(r).length || flat.slice().sort().join() !== C.items(r).slice().sort().join()) worst++;
    for (const k of keys) if (st.tubes[k].some(n => C.keyOf(n, st.fly) !== k)) worst++;
    if (C.undoTop(st, keys[0]) !== null) worst++;
  }
  is(worst === 0, `200 sorting sessions: wrong chutes bounce and change nothing, undo takes only the top, every thing is classified exactly once (${worst} faults)`);
}

/* ---------- 3. the questions: empty, miss 1, miss 2, the win ---------- */
const sortAll = (st) => { let g = 0; while (st.phase === 'sort' && g++ < 50) C.drop(st, C.keyOf(C.current(st), st.fly)); };
for (const r of all) {
  const st = C.newState(r); sortAll(st);
  is(st.phase === 'ask', `${r.id}: sorted, the question opens`);
  is(JSON.stringify(C.tubeCounts(st)) === JSON.stringify(C.counts(r)), `${r.id}: the tubes are the counts`);
  const kind = C.answerKind(r), want = C.truth(r);
  is(C.check(st).result === 'empty' && st.misses === 0, `${r.id}: Check with no answer is not a miss`);
  is(C.hint(st).key === (kind === 'number' ? 'tapNumber' : kind === 'tube' ? 'tapTube' : 'dragOrder'), `${r.id}: …it says what to do`);
  /* a wrong answer */
  if (kind === 'number') {
    const wrong = r.q.type === 'more' ? C.counts(r)[r.q.a] : (want % 10) + 1;   /* "how many more" answered with the bigger count is wrong */
    C.setNum(st, wrong);
  } else if (kind === 'tube') C.setPick(st, C.tubeKeys(r).find(k => k !== want));
  else { const asc = st.order.slice().sort((a, b) => C.counts(r)[a] - C.counts(r)[b]); st.order = asc; st.moved = true; }
  is(C.check(st).result === 'wrong' && st.misses === 1, `${r.id}: a wrong answer is a miss`);
  const h1 = C.hint(st).key, hp1 = C.help(st);
  const sum = r.q.type === 'fly' || r.q.type === 'all';   /* the answer adds two tubes */
  const exp1 = r.q.type === 'order' ? 'hintWrongWay' : r.q.type === 'more' ? 'hintPairUp' : kind === 'tube' ? 'hintHeight' : sum ? 'hintCountBoth' : 'hintCountUp';
  is(h1 === exp1 && hp1 && hp1.level === 1, `${r.id}: miss 1 — ${exp1} (${h1})`);
  if (r.q.type === 'more') is(hp1.kind === 'pair' && hp1.extras === want, `${r.id}: the pairing leaves exactly the answer unpaired`);
  if (r.q.type === 'order') is(hp1.kind === 'order' && hp1.breaks.length >= 1, `${r.id}: the breaks of the order are shown`);
  C.check(st);
  is(C.hint(st).key === (sum ? 'hintReadTopTwo' : 'hintReadTop') && C.help(st).level === 2, `${r.id}: miss 2 — read the number${sum ? 's of both tubes' : ''} (${C.hint(st).key})`);
  if (sum) is(C.help(st).tubes.length === 2, `${r.id}: the help lights both tubes of the sum`);
  /* the right answer */
  if (kind === 'number') C.setNum(st, want); else if (kind === 'tube') C.setPick(st, want); else { st.order = C.sortedDesc(r).slice(); st.moved = true; }
  is(C.check(st).result === 'ok' && st.done, `${r.id}: the right answer wins`);
  const s = C.success(st);
  is(s && STR[s.key], `${r.id}: the win line ${s && s.key} is authored`);
  if (s.args) is(STR[s.key].en.includes('{n}') && s.args.n === want, `${r.id}: the win names the number`);
  is(C.check(st).result === 'done' && !C.setNum(st, 1), `${r.id}: a won round stays won`);
}
/* sliding tubes: move() reorders; order is judged by the tubes' counts */
{
  const r = C.rounds('three').find(x => x.id === 'B6'), st = C.newState(r); sortAll(st);
  const before = st.order.slice();
  is(C.move(st, 0, 2) && st.order[2] === before[0] && st.order.length === 3, 'a tube slides along the rail');
  is(!C.move(st, 1, 1) && !C.move(st, 0, 9), 'a non-move or an off-rail move is refused');
}

/* ---------- 4. the stage at every width ---------- */
for (let W = 280; W <= 1100; W += 20) for (const g of ['two', 'three', 'fly']) {
  const L = C.layout(W, g);
  const left = C.tubeX(L, 0), right = C.tubeX(L, L.n - 1) + L.tubeW;
  if (!(left >= 0 && right <= W + 0.5)) is(false, `${W} ${g}: the tubes fit (${left.toFixed(0)}..${right.toFixed(0)} of ${W})`);
  if (!(L.tubeW >= 60)) is(false, `${W} ${g}: a tube is wide enough to tap (${L.tubeW})`);
  if (!(L.mark <= L.slot - 2 && L.mark >= (L.mode === 'wide' ? 40 : 30))) is(false, `${W} ${g}: data marks ${L.mark} px fit the slot and meet the data-mark floor`);
  if (g !== 'fly' && !(3 * L.mark + 4 <= L.tubeW + Math.min(L.gap, 24))) is(false, `${W} ${g}: the three label marks fit over their tube (${3 * L.mark + 4} > ${L.tubeW + Math.min(L.gap, 24)})`);
  if (g === 'fly' && !(3 * L.mark + 4 <= 2 * L.tubeW + L.gap)) is(false, `${W}: the column labels fit over their pair of tubes`);
  if (!(L.obj >= (L.mode === 'wide' ? 96 : 64))) is(false, `${W}: the thing on the belt meets the picture floor (${L.obj})`);
  PASS++;
}

/* ---------- 5. strings ×11 ---------- */
const keys = Object.keys(STR);
const freeRe = /(?<!\p{L})(free|gratis|gratuit\w*|kostenlos|grátis|gratuito|gratuita|ilmai\w*|frei|kostnadsfri\w*)(?!\p{L})/iu;
for (const k of keys) for (const l of LOCALES) {
  const s = STR[k][l];
  is(typeof s === 'string' && s.length > 0, `${k}.${l} authored`);
  if (typeof s !== 'string') continue;
  is(!freeRe.test(s), `${k}.${l}: no word for "free"`);
  if (l === 'fr') is(!/ [?!:;]/.test(s) && !/[^\s ,][?!:;]/.test(s), `${k}.fr: U+202F before ? ! : ; (${s})`);
  is(!/(?<!\p{L})0(?!\d)/u.test(s), `${k}.${l}: no zero`);
}
is(!Object.keys(STR).some(k => /^(pCount|okCount|pMore|okMore)/.test(k) && /Obst/.test(STR[k].de)), 'de: "Obst" (uncountable) never in a count frame');
is(!Object.keys(STR).some(k => /^(pCount|okCount)/.test(k) && /\bfruit\b/i.test(STR[k].nl)), 'nl: "fruit" (uncountable) never in a count frame');
for (const k of ['okCountAnimals', 'okCountFruits', 'okCountVehicles', 'okMoreVehiclesAnimals', 'okMoreAnimalsFruits', 'okN']) for (const l of LOCALES) is(STR[k][l].includes('{n}'), `${k}.${l}: carries {n}`);
for (const l of LOCALES) is(STR.okOrder[l].includes('{list}'), `okOrder.${l}: carries {list}`);
const ACT = fs.readFileSync(path.join(MT, 'sorting-chutes-activity.js'), 'utf8'), CORE = fs.readFileSync(path.join(process.env.SC_CORE_DIR || MT, 'sorting-chutes-core.js'), 'utf8');
const asked = new Set(['title', 'instruction']);
for (const src of [ACT, CORE]) { for (const m of src.matchAll(/(?:(?<!\w)_t|(?<![\w.])t)\('([a-zA-Z]+)'/g)) asked.add(m[1]); for (const m of src.matchAll(/(?:labelKey|key):\s*'([a-zA-Z0-9]+)'/g)) asked.add(m[1]); for (const m of src.matchAll(/'((?:hint|tap|drag|ok|p|aria)[A-Z][a-zA-Z]*)'/g)) asked.add(m[1]); }
all.forEach(r => asked.add(C.prompt(r)));
C.CATS.forEach(c => { asked.add('cat' + C.cap(c)); asked.add('list' + C.cap(c)); ['okCount', 'okMost', 'okFewest', 'okMostTwo', 'okFewestTwo'].forEach(p => asked.add(p + C.cap(c))); });
['okMoreVehiclesAnimals', 'okMoreAnimalsFruits'].forEach(k => asked.add(k));
for (const k of keys) is(asked.has(k), `${k}: authored and used`);

console.log(`verify-sorting-chutes-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
