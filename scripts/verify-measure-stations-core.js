#!/usr/bin/env node
/* =====================================================================
   verify-measure-stations-core.js — the model gate for ACTIVITY #32, the
   Measuring Stations (K.MD.A.1). Its own oracle (design §6–7, §12), never
   the core's: the answer station from the question WORD; every pose
   re-measured from the PICTURE FILES (alpha ink, sharp) — the track lays the
   long axis flat, the post shows the natural pose, tall things tip over;
   the authored weight classes (the kite is light); the badges; each
   station answers 3 of 9 one-way rounds and never 3 in a row over 10 000
   seeds; the size rows (2–3 big, never one, never all, no two alike) and
   the window (a big one pokes out ≥ 6 %, a small one fits with ≥ 6 % room);
   size checks; layout; strings × 11. Env MS_CORE_DIR loads a mutant core.
   ===================================================================== */
'use strict';
const path = require('path'), fs = require('fs');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const C = require(path.join(process.env.MS_CORE_DIR || MT, 'measure-stations-core.js'));
global.window = global;
const STR = require(path.join(MT, 'measure-stations-activity.js')).strings;
const ACT = fs.readFileSync(path.join(MT, 'measure-stations-activity.js'), 'utf8');
const sharp = require(path.join(ROOT, 'node_modules', 'sharp'));
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 40) console.error('   FAIL: ' + m); } };
function seeded(s) { let x = s >>> 0 || 1; return () => { x ^= x << 13; x >>>= 0; x ^= x >> 17; x ^= x << 5; x >>>= 0; return x / 4294967296; }; }

/* the gate's own tables (design §6) */
const ANSWER = { long: 'track', tall: 'post', heavy: 'spring' };
const ONE = [['pencil', 'long'], ['giraffe', 'tall'], ['rock', 'heavy'], ['carrot', 'long'], ['lighthouse', 'tall'], ['pumpkin', 'heavy'], ['train', 'long'], ['sunflower', 'tall'], ['cabbage', 'heavy']];
const TWO = [['carrot', 'long', 'heavy', 'long', 'light'], ['giraffe', 'tall', 'heavy', 'tall', 'heavy'], ['sunflower', 'heavy', 'tall', 'light', 'tall'], ['pencil', 'heavy', 'long', 'light', 'long'],
  ['lighthouse', 'tall', 'heavy', 'tall', 'heavy'], ['ruler', 'long', 'heavy', 'long', 'light'], ['rock', 'heavy', 'tall', 'heavy', 'shortH'], ['baguette', 'long', 'heavy', 'long', 'light'], ['toolbox', 'heavy', 'tall', 'heavy', 'shortH']];
const BADGEKEY = { long: 'badgeLong', light: 'badgeLight', heavy: 'badgeHeavy', tall: 'badgeTall', shortH: 'badgeShortHeight', shortL: 'badgeShortLength' };
const HEAVY = ['giraffe', 'rock', 'lighthouse', 'pumpkin', 'cabbage', 'toolbox', 'train'], LIGHT = ['pencil', 'ruler', 'carrot', 'cucumber', 'baguette', 'sunflower', 'kite'];
const LONGS = ['pencil', 'ruler', 'carrot', 'cucumber', 'baguette', 'train'], TALLS = ['giraffe', 'sunflower', 'lighthouse', 'ladder', 'rocket', 'bottle', 'kite'];
const PAIRS = [['ball', 'R'], ['apple', 'L'], ['pig', 'R'], ['cupcake', 'L'], ['circle', 'R'], ['kite', 'R'], ['star', 'L'], ['pumpkin', 'L'], ['square', 'R']];
const ROWS = [['ball', 'sBsBs'], ['apple', 'BssBBs'], ['triangle', 'ssBsB'], ['pig', 'BsBssB'], ['star', 'sBBss'], ['cupcake', 'sBssBB'], ['hexagon', 'BssBs'], ['kite', 'ssBBsB'], ['circle', 'BBssBs']];
/* each noun's gender per Romance locale, from mini tools/pictures/*.json (the image vocabulary) */
const GENDER = {};
for (const f of fs.readdirSync(path.join(MT, 'pictures'))) { if (!f.endsWith('.json')) continue; const j = JSON.parse(fs.readFileSync(path.join(MT, 'pictures', f), 'utf8')); for (const n in j.nouns) { const dir = decodeURIComponent((j.nouns[n].src || '').split('/')[3] || ''); if (C.OBJ[n] && C.OBJ[n].dir === dir) { GENDER[n] = {}; ['fr', 'es', 'it', 'pt'].forEach(l => { GENDER[n][l] = j.nouns[n].labels[l][2]; }); } } }
const WRONGKEY = { track: { tall: 'hintTrackTall', heavy: 'hintTrackHeavy' }, post: { long: 'hintPostLong', heavy: 'hintPostHeavy' }, spring: { long: 'hintSpringLong', tall: 'hintSpringTall' } };

/* ink box of a picture at rotation rot, relative to its centre, in a 256-px contained render (alpha > 40) */
async function ink(dir, noun, rot) {
  const base = await sharp(path.join(ROOT, 'image-library-webp', 'themes', dir, noun + '@2x.webp')).resize(256, 256, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).ensureAlpha().png().toBuffer();
  const { data, info } = await sharp(base).rotate(rot, { background: { r: 0, g: 0, b: 0, alpha: 0 } }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height; let x0 = W, y0 = H, x1 = 0, y1 = 0;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (data[(y * W + x) * 4 + 3] > 40) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  return [x0 - W / 2, y0 - H / 2, x1 + 1 - W / 2, y1 + 1 - H / 2];
}

(async () => {
  /* ---- the round tables ---- */
  const one = C.rounds('stations', 'one'), two = C.rounds('stations', 'two'), pairs = C.rounds('size', 'one'), rows = C.rounds('size', 'two');
  is(one.length === 9 && one.every((r, i) => r.noun === ONE[i][0] && r.qs.length === 1 && r.qs[0] === ONE[i][1]), 'one way: the design table');
  is(two.length === 9 && two.every((r, i) => r.noun === TWO[i][0] && r.qs.join() === TWO[i][1] + ',' + TWO[i][2]), 'two ways: the design table');
  is(pairs.length === 9 && pairs.every((r, i) => r.item === PAIRS[i][0] && r.row === (PAIRS[i][1] === 'L' ? 'Bs' : 'sB')), 'two pictures: the design table');
  is(rows.length === 9 && rows.every((r, i) => r.item === ROWS[i][0] && r.row === ROWS[i][1]), 'a whole row: the design table');
  const cnt = { track: 0, post: 0, spring: 0 }; ONE.forEach(r => cnt[ANSWER[r[1]]]++);
  is(cnt.track === 3 && cnt.post === 3 && cnt.spring === 3, `one way: each station answers 3 of 9 (${JSON.stringify(cnt)})`);
  is(PAIRS.filter(p => p[1] === 'L').length === 4, 'two pictures: big on the left in 4 of 9');
  const seenRows = new Set(); ROWS.forEach(([it, r]) => { const b = r.split('').filter(c => c === 'B').length; is(b >= 2 && b <= 3 && b < r.length, `row ${it}: 2–3 big, never all (${b} of ${r.length})`); is(!seenRows.has(r), `row ${it}: not the same as another row`); seenRows.add(r); });
  /* each slot holds a big one 35–65 % of the times it exists (both mirrors) */
  for (let i = 0; i < 6; i++) { let has = 0, big = 0; ROWS.forEach(([, r]) => { [r, r.split('').reverse().join('')].forEach(x => { if (i < x.length) { has++; if (x[i] === 'B') big++; } }); }); is(big / has >= 0.35 && big / has <= 0.65, `row slot ${i + 1}: big ${big} of ${has}`); }
  /* no crayon, no marker, no black-and-white theme anywhere */
  const nouns = Object.keys(C.OBJ);
  is(!nouns.includes('crayon') && !nouns.includes('marker'), 'no crayon or marker');
  nouns.forEach(n => is(!/(^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i.test(C.OBJ[n].dir), `${n}: a colour theme (${C.OBJ[n].dir})`));

  /* ---- the poses, re-measured from the pictures ---- */
  for (const n of nouns) {
    const o = C.OBJ[n];
    const r = await ink(o.dir, n, o.rest[0]);
    is(r.every((v, i) => Math.abs(v - o.rest[i + 1]) <= 2), `${n}: the rest pose ink box matches the picture (${r.join(',')} vs ${o.rest.slice(1).join(',')})`);
    if (o.lie) { const l = await ink(o.dir, n, o.lie[0]); is(l.every((v, i) => Math.abs(v - o.lie[i + 1]) <= 2), `${n}: the lying pose ink box matches the picture`); }
  }
  const W = (b) => b[3] - b[1], H = (b) => b[4] - b[2];
  LONGS.forEach(n => { const o = C.OBJ[n]; is(W(o.lie) >= 1.3 * H(o.lie), `${n}: on the track it lies with its long axis flat (${W(o.lie)}×${H(o.lie)})`); is(W(o.lie) > 1.3 * H(o.rest), `${n}: longer on the track than tall at the post`); });
  TALLS.forEach(n => { const o = C.OBJ[n]; is(H(o.rest) >= 1.3 * W(o.rest), `${n}: stands taller than wide at the post`); is(W(o.lie) >= 1.3 * H(o.lie) && Math.abs(o.lie[0]) > 45, `${n}: tips over onto the track (rotated ${o.lie[0]}°)`); });
  /* what each station shows: the track = the lying length, the post = the standing height, the spring = the weight class */
  nouns.filter(n => C.OBJ[n].lie).forEach(n => { const o = C.OBJ[n]; is(Math.abs(C.shown(n, 'track', 0.5).bar - W(o.lie) * 0.5) < 0.01 && C.shown(n, 'track', 1).attr === 'long', `${n}: the track measures how long`); is(Math.abs(C.shown(n, 'post', 0.5).bar - H(o.rest) * 0.5) < 0.01 && C.shown(n, 'post', 1).attr === 'tall', `${n}: the post measures how tall`); });
  HEAVY.forEach(n => is(C.OBJ[n].wt === 'heavy' && C.shown(n, 'spring').heavy && C.stretch(n, false) === 62 && C.stretch(n, true) === 38, `${n}: heavy — the spring stretches far`));
  LIGHT.forEach(n => is(C.OBJ[n].wt === 'light' && !C.shown(n, 'spring').heavy && C.stretch(n, false) === 14 && C.stretch(n, true) === 9, `${n}: light — the spring barely moves`));

  /* ---- one way: only the matching station answers ---- */
  for (const r of one) {
    const want = ANSWER[r.qs[0]];
    for (const b of ['track', 'post', 'spring']) {
      const st = C.newState(r), res = C.drop(st, b);
      if (b === want) is(res.result === 'ok' && st.done && C.success(st).key === { long: 'okLong', tall: 'okTall', heavy: 'okHeavy' }[r.qs[0]], `${r.id}: the ${b} answers how ${r.qs[0]}`);
      else { is(res.result === 'wrong' && !st.done && st.misses === 1 && C.hint(st).key === WRONGKEY[b][r.qs[0]], `${r.id}: the ${b} measures the wrong thing — ${C.hint(st) && C.hint(st).key}`); C.drop(st, b === 'track' ? (want === 'post' ? 'spring' : 'post') : 'track');
        if (!st.done) is(C.hint(st).key === 'hintTrySign' && C.glow(st) === want, `${r.id}: miss 2 glows the ${want}`); }
    }
  }
  /* ---- two ways: two right stations, the badges ---- */
  two.forEach((r, i) => {
    const st = C.newState(r), d = TWO[i];
    is(C.drop(st, ANSWER[d[1]]).result === 'ok' && !st.done && st.step === 1 && C.question(st) === d[2], `${r.id}: the first answer leads to the second question (${d[2]})`);
    is(C.drop(st, ANSWER[d[1]]).result === (d[1] === d[2] ? 'ok' : 'wrong'), `${r.id}: the first station does not answer the second question`);
    C.drop(st, ANSWER[d[2]]);
    is(st.done && C.success(st).key === 'okTwoWays' && C.success(st).attrs.join() === d[1] + ',' + d[2], `${r.id}: the card holds the two questions measured (${C.success(st).attrs})`);
    /* in fr/es/it/pt the badge agrees with the noun: its gender read from the picture vocabulary, not from the core */
    ['fr', 'es', 'it', 'pt'].forEach(l => { const f = GENDER[r.noun] && GENDER[r.noun][l] === 'f'; [[d[1], d[3]], [d[2], d[4]]].forEach(([q, b]) => is(C.badge(r.noun, q, l) === BADGEKEY[b] + (f ? 'F' : ''), `${r.id} ${l}: the ${b} badge agrees with a ${f ? 'feminine' : 'masculine'} noun`)); });
    ['en', 'de', 'nl', 'sv', 'da', 'no', 'fi'].forEach(l => is(C.badge(r.noun, d[1], l) === BADGEKEY[d[3]], `${r.id} ${l}: one badge form`));
    is(C.badge(r.noun, d[1]) === BADGEKEY[d[3]] && C.badge(r.noun, d[2]) === BADGEKEY[d[4]], `${r.id}: the badges come from the authored classes`);
  });
  is(C.badge('rock', 'tall') === 'badgeShortHeight' && C.badge('toolbox', 'tall') === 'badgeShortHeight', '"short" on a height question is the height word');
  /* ---- free play: every station measures, nothing is graded ---- */
  { const st = C.newPlay('kite'); ['track', 'post', 'spring'].forEach(b => { const res = C.drop(st, b); is(res.result === 'play' && !st.done && st.misses === 0 && st.placed === b, `play: the ${b} measures the kite, ungraded`); }); is(C.hint(st) === null && C.success(st) === null, 'play: no hint, no verdict'); }

  /* ---- the order over 10 000 seeds ---- */
  for (const [m, h] of [['stations', 'one'], ['stations', 'two'], ['size', 'one'], ['size', 'two']]) {
    const P = C.rounds(m, h); let prev = null, streak = 0, repeats = 0, seams = 0, perm = 0; const seen = new Set();
    for (let s = 1; s <= 10000; s++) {
      const o = C.order(P, seeded(s), prev);
      if (o.slice().sort((a, b) => a - b).join() !== P.map((x, i) => i).join()) perm++;
      if (m === 'stations') for (let i = 2; i < o.length; i++) { const a = ANSWER[P[o[i]].qs[0]]; if (a === ANSWER[P[o[i - 1]].qs[0]] && a === ANSWER[P[o[i - 2]].qs[0]]) { streak++; break; } }
      if (prev) { if (o.join() === prev.join()) repeats++; if (o[0] === prev[prev.length - 1]) seams++; }
      seen.add(o.join()); prev = o;
    }
    is(perm === 0, `${m}.${h}: every order is a permutation`);
    is(streak === 0, `${m}.${h}: no station answers 3 rounds in a row (${streak})`);
    is(repeats === 0 && seams === 0, `${m}.${h}: never the same order, never the same seam (${repeats}, ${seams})`);
    is(seen.size > 2000, `${m}.${h}: orders vary (${seen.size})`);
    is(C.order(P, seeded(9), null).join() === C.order(P, seeded(9), null).join(), `${m}.${h}: the same seed gives the same order`);
  }

  /* ---- size mode ---- */
  for (const [it, r] of ROWS) {
    const R = rows.find(x => x.item === it);
    [false, true].forEach(mir => {
      const st = C.newState(R, { mirror: mir }), row = (mir ? r.split('').reverse().join('') : r).split('').map(c => c === 'B');
      is(st.row.join() === row.join(), `row ${it}${mir ? ' (mirrored)' : ''}: the cards`);
      is(C.sizeCheck(st).result === 'empty' && st.misses === 0, `row ${it}: Check with nothing is no miss`);
      const small = row.indexOf(false), big = row.indexOf(true);
      C.ring(st, small);
      let res = C.sizeCheck(st);
      is(res.result === 'miss' && res.wrongSmall.join() === String(small) && res.missedBig.length === row.filter(Boolean).length && C.hint(st).key === 'hintWindow', `row ${it}: a small one ringed is wrong, every big one missed`);
      C.ring(st, small); row.forEach((b, i) => { if (b) C.ring(st, i); });
      res = C.sizeCheck(st);
      is(res.result === 'ok' && st.done && C.success(st).key === 'okBigAll' && C.success(st).args.n === row.filter(Boolean).length, `row ${it}: all the big ones and nothing else`);
      void big;
    });
  }
  for (const [it, side] of PAIRS) {
    const R = pairs.find(x => x.item === it), st = C.newState(R), bigAt = side === 'L' ? 0 : 1;
    C.ring(st, 1 - bigAt); C.ring(st, bigAt);
    is(st.rings.join() === String(bigAt), `pair ${it}: one picture at a time`);
    is(C.sizeCheck(st).result === 'ok' && C.success(st).key === 'okBigOne', `pair ${it}: the big one`);
    const s2 = C.newState(R); C.ring(s2, 1 - bigAt); C.sizeCheck(s2); C.ring(s2, 1 - bigAt); C.ring(s2, 1 - bigAt); C.sizeCheck(s2);
    is(s2.misses === 2 && C.hint(s2).key === 'hintLook', `pair ${it}: miss 2 — look at this one in the window`);
  }
  /* the window: a big one pokes out ≥ 6 % of its side, a small one fits with ≥ 6 % of the window to spare */
  for (const it of ['ball', 'apple', 'pig', 'cupcake', 'kite', 'pumpkin', 'circle', 'star']) {
    const S = 120, b = C.fit(S, true), s = C.fit(S, false);
    is(b.poke >= 0.06 * S && b.margin === 0, `${it}: a big one pokes out of the window (${b.poke.toFixed(1)} px)`);
    is(s.margin >= 0.06 * b.window && s.poke === 0, `${it}: a small one fits with room (${s.margin.toFixed(1)} px)`);
  }
  is(Math.abs(C.SMALL - 0.56) <= 0.02, `small = 0.56 of big (${C.SMALL})`);
  /* the pictures in the size rounds really are drawn their size: the ink side is measured, not assumed */
  for (const it of ['ball', 'apple', 'pig', 'cupcake', 'kite', 'pumpkin']) { const o = C.OBJ[it], r = await ink(o.dir, it, 0); is(C.inkSide(it) === Math.max(r[2] - r[0], r[3] - r[1]), `${it}: the ink side is measured from the picture`); }

  /* ---- layout ---- */
  for (let w = 280; w <= 1100; w += 4) {
    const L = C.layout(w);
    is(3 * L.bayW + 2 * L.gap <= w && L.bayW >= 88, `@${w}: three stations fit (${L.bayW})`);
    C.PLAY.forEach(n => { const k = C.scaleFor(n, L), o = C.OBJ[n]; if (!(W(o.lie) * k <= L.rail + 0.5 && H(o.rest) * k <= L.postH + 0.5 && W(o.rest) * k <= L.bayW - 33)) is(false, `@${w} ${n}: fits the track and the post`); });
    is((L.mode === 'wide') === (w >= 560), `@${w}: the mode`);
  }

  /* ---- strings × 11 ---- */
  const PRICE = /\b(free|gratis|kostenlos|gratuit|gratuito|gratuita|ilmai|de graça)/i;
  Object.keys(STR).forEach(k => {
    const ph = (s) => (String(s).match(/\{\w+\}/g) || []).sort().join();
    LOCALES.forEach(l => { is(typeof STR[k][l] === 'string' && STR[k][l].length > 0, `strings ${k}.${l}`); is(ph(STR[k][l]) === ph(STR[k].en), `strings ${k}.${l}: placeholders`); is(!PRICE.test(STR[k][l]), `strings ${k}.${l}: no price word`); });
    is(!/(?<!\u202f)[?!:;]/.test(STR[k].fr) && !/«(?!\u202f)|(?<!\u202f)»/.test(STR[k].fr), `strings ${k}.fr: U+202F before ? ! : ; and inside « »`);
  });
  /* every key the code asks for is authored, and every authored key is asked for somewhere */
  const asked = new Set((ACT.match(/(?<![\w.])t\('(\w+)'\)/g) || []).map(s => s.slice(3, -2)));
  ['play', 'playBack', 'playNote'].forEach(k => asked.add(k)); /* chosen by a ternary / a hint object */
  ['promptLong', 'promptTall', 'promptHeavy', 'okLong', 'okTall', 'okHeavy', 'okTwoWays', 'okBigOne', 'okBigAll', 'promptTwoWays', 'promptBigOne', 'promptBigAll', 'hintTapFirstOne', 'bayTrack', 'bayPost', 'baySpring'].forEach(k => asked.add(k));
  Object.values(WRONGKEY).forEach(o => Object.values(o).forEach(k => asked.add(k)));
  ['hintIdle', 'hintTrySign', 'hintTapFirst', 'hintWindow', 'hintLook'].forEach(k => asked.add(k));
  Object.values(BADGEKEY).forEach(k => { asked.add(k); asked.add(k + 'F'); });
  ['title', 'instruction', 'setMeasure', 'mStations', 'mSize', 'setLevel', 'lvOne', 'lvTwo'].forEach(k => asked.add(k));
  asked.forEach(k => is(!!STR[k], `strings: ${k} is authored`));
  Object.keys(STR).forEach(k => is(asked.has(k), `strings: ${k} is used`));

  console.log(`verify-measure-stations-core: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
