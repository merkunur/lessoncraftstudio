#!/usr/bin/env node
/* =====================================================================
   verify-drop-stands-core.js — the build gate for ACTIVITY #34, "Comparing
   Length" (K.MD.A.2), THE DROP-DOWN STANDS. Design: designs/034-choice-board.md §12.
   Its own ground truth: the design's round tables re-typed here; every ink
   box re-measured from the PICTURE FILES (sharp, alpha > 40); the right
   slot re-derived from the size literals and the question word; its own
   naive judge (tops / ends as they stand) must be right in exactly the
   unlured rounds; the beam must rest on the true extreme; the misses, the
   halo, the floor setting; the order over 10,000 seeds; the stage at every
   width; the strings ×11.
   Run: node scripts/verify-drop-stands-core.js   (DS_CORE_DIR = a mutant core dir)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const C = require(path.join(process.env.DS_CORE_DIR || MT, 'drop-stands-core.js'));
const sharp = require(path.join(ROOT, 'node_modules', 'sharp'));
const STR = (function () { const vm = require('vm'); const ctx = { window: {}, DropStandsCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'drop-stands-activity.js'), 'utf8') + '\n;this.__A = DropStandsActivity;', ctx); return ctx.__A.strings; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('   FAIL: ' + m); } };
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

/* ---------- the design's tables (§6), re-typed; P12 mirrored (the design's own tally was 5 left / 7 right);
   R3 / R5 / R9 re-placed (the design balanced the row slots for one orientation only) ---------- */
const PAIRS = [
  ['coconut', 'taller', [1.00, 0.78], [0, 80], true], ['pencil', 'longer', [0.80, 1.00], [0, 40], false], ['candle', 'shorterH', [1.00, 0.74], [0, 120], true],
  ['carrot', 'longer', [1.00, 0.82], [0, 110], true], ['giraffe', 'taller', [0.80, 1.00], [120, 0], true], ['crayon', 'shorterH', [0.70, 1.00], [0, 40], false],
  ['lighthouse', 'taller', [1.00, 0.84], [0, 80], true], ['ruler', 'longer', [0.82, 1.00], [110, 0], true], ['marker', 'shorterL', [1.00, 0.76], [40, 0], false],
  ['sunflower', 'taller', [0.82, 1.00], [120, 40], true], ['cucumber', 'longer', [1.00, 0.80], [40, 0], false], ['corn', 'shorterH', [0.72, 1.00], [120, 40], true]
];
const ROWS = [
  ['giraffe', 'tallest', [0.66, 1.00, 0.82], [0, 40, 120]], ['pencil', 'longest', [0.82, 0.56, 0.68, 1.00], [0, 110, 60, 30]], ['lighthouse', 'shortestH', [1.00, 0.82, 0.56, 0.68], [0, 40, 100, 120]],
  ['circle', 'biggest', [0.68, 0.82, 0.56, 1.00], [120, 0, 80, 30]], ['carrot', 'shortestL', [0.66, 1.00, 0.82], [0, 0, 60]], ['ladder', 'tallest', [1.00, 0.82, 0.56, 0.68], [20, 0, 120, 80]],
  ['square', 'biggest', [0.56, 1.00, 0.68, 0.82], [120, 0, 80, 40]], ['baguette', 'longest', [0.68, 0.82, 1.00], [60, 110, 0]], ['bottle', 'shortestH', [0.82, 0.66, 1.00], [0, 120, 40]]
];
const SHORTQ = new Set(['shorterH', 'shorterL', 'shortestH', 'shortestL']);
const LENQ = new Set(['longer', 'shorterL', 'longest', 'shortestL']);
const STANDING = new Set(['coconut', 'candle', 'crayon', 'corn', 'giraffe', 'lighthouse', 'sunflower', 'ladder', 'bottle']);
const LYING = new Set(['pencil', 'ruler', 'marker', 'carrot', 'cucumber', 'baguette']);
const own = (sizes, q) => { let b = 0; sizes.forEach((s, i) => { if (SHORTQ.has(q) ? s < sizes[b] : s > sizes[b]) b = i; }); return b; };

async function ink(dir, noun, rot) {
  const base = await sharp(path.join(ROOT, 'image-library-webp', 'themes', dir, noun + '@2x.webp')).resize(256, 256, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).ensureAlpha().png().toBuffer();
  const { data, info } = await sharp(base).rotate(rot, { background: { r: 0, g: 0, b: 0, alpha: 0 } }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height; let x0 = W, y0 = H, x1 = 0, y1 = 0;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (data[(y * W + x) * 4 + 3] > 40) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  return [x0 - W / 2, y0 - H / 2, x1 + 1 - W / 2, y1 + 1 - H / 2];
}

(async () => {
  /* ---------- 0. the tables ---------- */
  is(C.PAIRS.length === 12 && C.ROWS.length === 9, 'twelve pairs, nine rows');
  C.PAIRS.forEach((r, i) => { const d = PAIRS[i]; is(r.noun === d[0] && r.q === d[1] && r.sizes.join() === d[2].join() && r.lift.join() === d[3].join(), `${r.id}: the design table (${r.noun} ${r.q})`); });
  C.ROWS.forEach((r, i) => { const d = ROWS[i]; is(r.noun === d[0] && r.q === d[1] && r.sizes.join() === d[2].join() && r.lift.join() === d[3].join(), `${r.id}: the design table (${r.noun} ${r.q})`); });
  C.PAIRS.concat(C.ROWS).forEach(r => {
    is(Object.keys(r).every(k => ['id', 'noun', 'q', 'sizes', 'lift'].includes(k)), `${r.id}: no stored answer (${Object.keys(r)})`);
    const s = r.sizes.slice().sort((a, b) => a - b);
    for (let i = 1; i < s.length; i++) is((s[i] - s[i - 1]) / s[i] >= 0.15 - 1e-9, `${r.id}: neighbouring sizes differ by at least 15 % (${s[i - 1]} / ${s[i]})`);
    is(C.MODE[r.q] === (LENQ.has(r.q) ? 'length' : 'height'), `${r.id}: ${r.q} is a ${LENQ.has(r.q) ? 'length' : 'height'} question`);
    if (!C.OBJ[r.noun].shape) is(LENQ.has(r.q) ? LYING.has(r.noun) : STANDING.has(r.noun), `${r.id}: the ${r.noun} ${LENQ.has(r.q) ? 'lies' : 'stands'} for a ${r.q} question (shorter is split: height vs length)`);
  });
  is(!C.OBJ.pine && !C.OBJ.palm, 'no tree/pine or tree/palm (not in the library)');
  /* the right slot and the side balance */
  let L2 = 0; C.PAIRS.forEach(r => { const a = own(r.sizes, r.q); if (a === 0) L2++; for (const m of [false, true]) for (const st of ['stands', 'floor']) is(C.right(C.newState(r, { mirror: m, start: st })) === (m ? 1 - a : a), `${r.id}${m ? ' mirrored' : ''} ${st}: the right side from the sizes`); });
  is(L2 === 6, `the right answer is on the left in 6 of 12 pairs (${L2})`);
  for (const m of [false, true]) {
    const cnt = [0, 0, 0, 0], has = [0, 0, 0, 0];
    C.ROWS.forEach(r => { const st = C.newState(r, { mirror: m }); const a = own(st.items.map(x => x.size), r.q); is(C.right(st) === a, `${r.id}${m ? ' mirrored' : ''}: the right slot from the sizes`); cnt[a]++; st.items.forEach((_, i) => has[i]++); });
    cnt.forEach((c, i) => is(c / 9 <= 0.4 + 1e-9, `rows${m ? ' mirrored' : ''}: slot ${i + 1} is right in ${c} of 9 (≤ 40 %)`));
  }

  /* ---------- 1. the ink boxes, re-measured from the pictures ---------- */
  const pics = {}; for (const f of fs.readdirSync(path.join(MT, 'pictures'))) if (f.endsWith('.json')) { const j = JSON.parse(fs.readFileSync(path.join(MT, 'pictures', f), 'utf8')); for (const n in j.nouns) (pics[n] = pics[n] || []).push(decodeURIComponent((j.nouns[n].src || '').split('/')[3] || '')); }
  for (const n of Object.keys(C.OBJ)) {
    const o = C.OBJ[n];
    if (o.shape) { is(['circle', 'square'].includes(o.shape), `${n}: a drawn shape`); continue; }
    is(fs.existsSync(path.join(ROOT, 'image-library-webp', 'themes', o.dir, n + '@2x.webp')), `${n}: the picture exists`);
    is((pics[n] || []).includes(o.dir), `${n}: labelled in mini tools/pictures (${o.dir})`);
    is(!/(^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i.test(o.dir), `${n}: a colour theme`);
    const b = await ink(o.dir, n, o.rot);
    is(b.every((v, i) => Math.abs(v - o.box[i]) <= 2), `${n}: the ink box matches the picture (${b.join(',')} vs ${o.box.join(',')})`);
    const w = b[2] - b[0], h = b[3] - b[1];
    if (LYING.has(n)) is(w >= 2.5 * h, `${n}: lies flat, long axis horizontal (${w}×${h})`);
    if (STANDING.has(n)) is(h >= 1.2 * w, `${n}: stands upright (${w}×${h})`);
  }

  /* ---------- 2. the lure: our own naive judge at the 704 scale (height 220/200/140, length 520) ---------- */
  const L = C.layout(660);
  const ext = (noun, q, s, two) => { const o = C.OBJ[noun], b = o.box; if (LENQ.has(q)) return 520 * s; return (o.shape ? 140 : two ? 220 : 200) * s; };
  const naive = (noun, q, sizes, lift) => { const two = sizes.length === 2, r = sizes.map((s, i) => lift[i] + ext(noun, q, s, two)); let b = 0; r.forEach((v, i) => { if (SHORTQ.has(q) ? v < r[b] : v > r[b]) b = i; }); return b; };
  PAIRS.forEach(([n, q, s, l, lured], i) => {
    const nv = naive(n, q, s, l), a = own(s, q);
    is(lured ? nv !== a : nv === a, `P${i + 1} ${n}: judging by the tops/ends as they stand is ${lured ? 'WRONG (lured)' : 'right (unlured)'}`);
    const st = C.newState(C.PAIRS[i]);
    is(C.naive(st, L) === nv, `P${i + 1}: the core's naive judge agrees with ours`);
    is(Math.abs(C.extent(st, L, 0) - ext(n, q, s[0], true)) < 1e-6 && Math.abs(C.reach(st, L, 1) - (l[1] + ext(n, q, s[1], true))) < 1e-6, `P${i + 1}: extents and reaches are the ink at its size, plus its stand/offset`);
  });
  is(PAIRS.filter(p => p[4]).length === 8, 'eight lured pairs, four unlured');
  const standJudge = (q, l) => { let b = 0; l.forEach((v, i) => { if (SHORTQ.has(q) ? v > l[b] : v < l[b]) b = i; }); return l.every(v => v === l[0]) ? -1 : b; };
  const standPairs = PAIRS.filter(([n, q, s, l]) => standJudge(q, l) === own(s, q)).length, standRows = ROWS.filter(([n, q, s, l]) => standJudge(q, l) === own(s, q)).length;
  is(standPairs <= 8, `pairs: picking by the stand height alone wins ${standPairs} of 12 (≤ 8 — no better than the lure itself)`);
  is(standRows <= 4, `rows: picking by the stand height alone wins ${standRows} of 9 (≤ 4)`);
  const rowsNaiveRight = ROWS.filter(([n, q, s, l]) => naive(n, q, s, l) === own(s, q)).length;
  is(rowsNaiveRight <= 2, `rows: the lured slot is right in ${rowsNaiveRight} of 9 (≤ 2)`);

  /* ---------- 3. the round: choose, check, the reveal, the misses ---------- */
  for (const r of C.PAIRS.concat(C.ROWS)) for (const m of [false, true]) {
    const st = C.newState(r, { mirror: m }), a = C.right(st), n = st.items.length, wrong = (a + 1) % n;
    is(C.check(st).result === 'empty' && st.misses === 0 && !st.revealed, `${r.id}: Check with nothing chosen is not a miss`);
    is(C.hint(st).key === 'tap' + C.cap(r.q) && STR[C.hint(st).key], `${r.id}: …it asks for a choice (${C.hint(st).key})`);
    st.items.forEach((it, i) => { if (it.lift) { is(C.align(st, i) && st.items[i].down, `${r.id}: a stand folds / a thing slides to the wall`); is(C.unalign(st, i) && !st.items[i].down, `${r.id}: …and back up / back out`); } });
    C.choose(st, wrong);
    is(C.check(st).result === 'wrong' && st.misses === 1 && st.items.every(x => x.down) && st.revealed, `${r.id}: a wrong Check — everything comes down to the floor / the wall`);
    const rv = C.reveal(st, L);
    const extents = st.items.map((_, i) => C.extent(st, L, i));
    is(rv.at === extents.indexOf(Math.max(...extents)) && rv.beam === Math.max(...extents), `${r.id}: the beam rests on the true extreme`);
    if (SHORTQ.has(r.q)) is(rv.gaps.indexOf(Math.max(...rv.gaps)) === a, `${r.id}: the shortest has the biggest gap under the beam`);
    else is(rv.at === a && rv.gaps[a] === 0, `${r.id}: the beam touches the right one`);
    is(C.hint(st).key === (LENQ.has(r.q) ? 'missWall' : 'missFloor') && C.glow(st) === null, `${r.id}: miss 1 names the floor / the wall, no halo yet`);
    if (st.items.some(x => x.lift)) is(!C.unalign(st, st.items.findIndex(x => x.lift)), `${r.id}: after a miss the things stay aligned`);
    C.check(st);
    is(st.misses === 2 && C.glow(st) === a && C.hint(st).key === (SHORTQ.has(r.q) ? 'haloFar' : 'haloReach'), `${r.id}: miss 2 — the right one gets the halo (${C.hint(st).key})`);
    C.choose(st, wrong); is(C.glow(st) === null, `${r.id}: choosing again takes the halo away`);
    C.choose(st, a);
    is(C.check(st).result === 'ok' && st.done && C.success(st).key === 'ok' + C.cap(r.q) && STR[C.success(st).key], `${r.id}: the right one wins (${C.success(st).key})`);
    is(C.choose(st, wrong) === null && C.check(st).result === 'done', `${r.id}: a won round stays won`);
    /* the floor setting: everything starts lined up, no stands */
    const fl = C.newState(r, { mirror: m, start: 'floor' });
    is(fl.items.every(x => x.down && x.lift === 0) && C.naive(fl, L) === C.right(fl), `${r.id}: "on the floor" — all lined up, the tops tell the truth`);
  }

  /* ---------- 4. the order: 10,000 seeds ---------- */
  {
    let seed = 1; const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    let bad = 0, repeat = 0, run3 = 0;
    for (let s = 0; s < 10000; s++) {
      const pool = C.rounds(s % 2 ? 'row' : 'two'), pass = s % 4, prev = C.order(pool, rnd, null, pass), a = C.order(pool, rnd, prev, pass);
      if (a.slice().sort((x, y) => x - y).join() !== pool.map((_, i) => i).join()) bad++;
      if (a.join() === prev.join()) repeat++;
      let last = -1, run = 0; a.forEach(k => { const sd = C.sideOf(pool[k], pass % 2 === 1); if (sd === last) { run++; if (run >= 3) run3++; } else { last = sd; run = 1; } });
    }
    is(bad === 0, 'every order is a permutation'); is(repeat === 0, `never the same order twice running (${repeat})`); is(run3 === 0, `never the right answer on the same side three times running (${run3})`);
    const mk = (sd) => { let x = sd; return () => { x = (x * 16807) % 2147483647; return (x - 1) / 2147483646; }; };
    let rep2 = 0; for (let sd = 1; sd < 300; sd++) { const pool = C.rounds('two'), p1 = C.order(pool, mk(sd), null, 0), p2 = C.order(pool, mk(sd), p1, 0); if (p1.join() === p2.join()) rep2++; }
    is(rep2 === 0, `the same dealer never deals the previous order (${rep2})`);
    const firsts = new Set(); for (let k = 0; k < 40; k++) firsts.add(C.order(C.rounds('two'), Math.random, null, 0).join());
    is(firsts.size >= 30, `the first pass is shuffled (${firsts.size} orders in 40 visits)`);
  }

  /* ---------- 5. the stage at every width ---------- */
  for (let W = 280; W <= 1100; W += 20) {
    const Lw = C.layout(W);
    for (const r of C.PAIRS.concat(C.ROWS)) {
      const st = C.newState(r), n = st.items.length, H = C.stageH(st, Lw);
      if (st.mode === 'height') {
        const cw = n === 2 ? Lw.col2 : Lw.colR;
        if (!(cw * n <= W + 0.5)) is(false, `${W} ${r.id}: the columns fit (${(cw * n).toFixed(0)} > ${W})`);
        st.items.forEach((it, i) => {
          const o = C.OBJ[r.noun], k = C.inkScale(st, Lw) * it.size, iw = (o.box[2] - o.box[0]) * k;
          if (!(iw <= cw - 2)) is(false, `${W} ${r.id}: picture ${i + 1} fits its column (${iw.toFixed(0)} > ${cw.toFixed(0)})`);
          if (!(it.lift * Lw.standK + C.extent(st, Lw, i) + 12 * Lw.k <= H)) is(false, `${W} ${r.id}: its top and the beam fit the stage`);
        });
      } else {
        st.items.forEach((it, i) => { const end = Lw.wallW + it.lift * Lw.offK + C.extent(st, Lw, i); if (!(end + 12 * Lw.k <= Lw.rail + 0.5)) is(false, `${W} ${r.id}: thing ${i + 1} and the beam stay on the rail (${end.toFixed(0)} of ${Lw.rail.toFixed(0)})`); });
        if (!(Lw.rail <= W)) is(false, `${W}: the rail fits`);
      }
    }
    PASS++;
  }

  /* ---------- 6. strings ×11 ---------- */
  const keys = Object.keys(STR);
  const freeRe = /(?<!\p{L})(free|gratis|gratuit\w*|kostenlos|grátis|gratuito|gratuita|ilmai\w*|frei|kostnadsfri\w*)(?!\p{L})/iu;
  for (const k of keys) for (const l of LOCALES) {
    const s = STR[k][l];
    is(typeof s === 'string' && s.trim().length > 0, `${k}.${l} authored`);
    if (typeof s !== 'string') continue;
    is(!freeRe.test(s), `${k}.${l}: no word for "free"`);
    if (l === 'fr') is(!/ [?!:;]/.test(s) && !/[^\s ][?!:;]/.test(s), `${k}.fr: U+202F before ? ! : ; (${s})`);
    is(!/(?<!\p{L})0(?!\d)/u.test(s), `${k}.${l}: no zero`);
  }
  for (const q of Object.keys(C.MODE)) for (const p of ['p', 'tap', 'ok']) is(keys.includes(p + C.cap(q)), `${p}${C.cap(q)}: authored`);
  is(STR.okTaller.en.includes('same floor') && STR.okLonger.en.includes('same wall'), 'the win names the floor / the wall');
  /* shorter is split by direction in every language that splits it */
  for (const l of ['de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi']) is(STR.pShorterH[l] !== STR.pShorterL[l], `${l}: "shorter" (height) and "shorter" (length) are different words`);
  const ACT = fs.readFileSync(path.join(MT, 'drop-stands-activity.js'), 'utf8'), CORE = fs.readFileSync(path.join(process.env.DS_CORE_DIR || MT, 'drop-stands-core.js'), 'utf8');
  const asked = new Set(['title', 'instruction']);
  for (const src of [ACT, CORE]) { for (const m of src.matchAll(/(?:(?<!\w)_t|(?<![\w.])t)\('([a-zA-Z]+)'/g)) asked.add(m[1]); for (const m of src.matchAll(/labelKey:\s*'([a-zA-Z]+)'/g)) asked.add(m[1]); for (const m of src.matchAll(/'((?:haloFar|haloReach|missWall|missFloor|aria[A-Z]\w*))'/g)) asked.add(m[1]); }
  for (const q of Object.keys(C.MODE)) ['p', 'tap', 'ok'].forEach(p => asked.add(p + C.cap(q)));   /* built as prefix + cap(q) */
  for (const k of keys) is(asked.has(k), `${k}: authored and used`);

  console.log(`verify-drop-stands-core: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
