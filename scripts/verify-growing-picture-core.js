#!/usr/bin/env node
/* =====================================================================
   verify-growing-picture-core.js — the gate for ACTIVITY #154, The Growing
   Picture (2.MD.A.3). The gate keeps its OWN oracle: the design's tables
   and the believable size of every real thing are written here, the ink
   boxes are measured here from the real pixels (sharp), and every bot is
   played here — never read off the tool.
   A the rounds (one option inside the real range, ratios ≥ 2, rank and
   unit balance) · B the pictures (ink boxes from pixels, which may turn)
   · C the benchmark never depends on the answer · D one scale for all ·
   E check against the own oracle · F the bots (value rank, card length in
   every locale, the level-2 number threshold) · G the plan (order, card
   slots, the cm card left half the time) · H strings ×11 and reachability
   (no comparison hint names its answer) · I drawing rules · J the
   manifest row.
   GP_CORE / GP_ACT / GP_MANIFEST let mutate-growing-picture.js aim it at
   a mutated copy.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const CORE_PATH = process.env.GP_CORE || path.join(ROOT, 'mini tools', 'growing-picture-core.js');
const ACT_PATH = process.env.GP_ACT || path.join(ROOT, 'mini tools', 'growing-picture-activity.js');
const MAN_PATH = process.env.GP_MANIFEST || path.join(ROOT, 'mini tools', 'gauge-good-guess-activities.json');
const C = require(CORE_PATH);
const SRC = fs.readFileSync(ACT_PATH, 'utf8'), CORE = fs.readFileSync(CORE_PATH, 'utf8');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; if (fail < 60) console.error('  FAIL ' + m); } };

/* ---------- the gate's own tables (design §6, critic rulings) ---------- */
const OWN1 = [['ant', 'cm', [1, 12, 30], 1, 'long'], ['spoon', 'cm', [15, 60, 150], 15, 'long'], ['snail', 'cm', [3, 30, 90], 3, 'long'], ['bed', 'm', [2, 6, 20], 2, 'long'],
  ['door', 'm', [1, 2, 9], 2, 'tall'], ['pencil', 'cm', [2, 17, 90], 17, 'long'], ['truck', 'm', [2, 8, 60], 8, 'long'], ['lighthouse', 'm', [3, 30, 300], 30, 'tall'],
  ['house', 'm', [1, 8, 80], 8, 'tall'], ['airplane', 'm', [1, 4, 40], 40, 'long'], ['ferry', 'm', [2, 6, 100], 100, 'long'], ['whale', 'm', [1, 3, 15], 15, 'long'], ['banana', 'cm', [2, 6, 20], 20, 'long']];
const OWN2 = [['bee', 2, 'cm'], ['door', 2, 'm'], ['car', 4, 'm'], ['key', 6, 'cm'], ['truck', 8, 'm'], ['spoon', 15, 'cm'], ['whale', 15, 'm'], ['banana', 20, 'cm'], ['book', 25, 'cm'], ['lighthouse', 30, 'm']];
/* how big the real thing believably is, in cm (the gate's own ranges) */
const REAL = { ant: [0.2, 2.5], spoon: [12, 22], snail: [1.5, 7], bed: [170, 230], door: [180, 250], pencil: [12, 20], truck: [500, 1200], lighthouse: [15e2, 6e3], house: [600, 1100],
  airplane: [25e2, 8e3], ferry: [3e3, 3e4], whale: [1e3, 2e3], banana: [14, 26], bee: [1, 3], car: [300, 500], key: [4, 9], book: [18, 32] };
const THEME = { ant: 'insects and bugs', spoon: 'kitchen tools', snail: 'insects and bugs', bed: 'furniture', door: 'around the house', pencil: 'classroom', truck: 'vehicles', lighthouse: 'beach', house: 'miscellaneous',
  airplane: 'vehicles', ferry: 'vehicles', whale: 'ocean life', banana: 'fruits', bee: 'insects and bugs', car: 'vehicles', key: 'around the house', book: 'classroom' };
const TURNS = ['spoon', 'pencil', 'key', 'banana'];   /* only stick-like drawings turn to lie flat */
const cm = (n, u) => (u === 'm' ? n * 100 : n);

(async () => {
  /* ---------- A. the rounds ---------- */
  const R1 = C.rounds('estimate'), R2 = C.rounds('unit');
  ok(R1.map((r) => [r.obj, r.unit, r.cards.join('/'), r.answer, r.axis].join()).join('|') === OWN1.map((x) => [x[0], x[1], x[2].join('/'), x[3], x[4]].join()).join('|'), 'A: level 1 is the design\'s thirteen rounds');
  ok(R2.map((r) => [r.obj, r.n, r.answer].join()).join('|') === OWN2.map((x) => x.join()).join('|'), 'A: level 2 is the design\'s ten rounds');
  R1.forEach((r) => {
    const v = r.cards, inside = v.filter((x) => cm(x, r.unit) >= REAL[r.obj][0] && cm(x, r.unit) <= REAL[r.obj][1]);
    ok(inside.length === 1 && inside[0] === r.answer, 'A: ' + r.obj + ': exactly one option is a believable real size (' + inside.join() + ')');
    ok(v.every((x, i) => i === 0 || x / v[i - 1] >= 2), 'A: ' + r.obj + ': neighbouring options are at least ×2 apart');
  });
  R2.forEach((r) => { const c = cm(r.n, 'cm'), m = cm(r.n, 'm'), inC = c >= REAL[r.obj][0] && c <= REAL[r.obj][1], inM = m >= REAL[r.obj][0] && m <= REAL[r.obj][1]; ok(inC !== inM && (inC ? 'cm' : 'm') === r.answer, 'A: level 2 ' + r.obj + ' ' + r.n + ': only ' + r.answer + ' is believable'); });
  const rank = R1.map((r) => r.cards.indexOf(r.answer)), rc = [0, 1, 2].map((i) => rank.filter((x) => x === i).length);
  ok(rc.join() === '4,5,4', 'A: the right value is smallest 4 · middle 5 · largest 4 (' + rc.join() + ')');
  ok(R1.filter((r) => r.unit === 'cm').length === 5 && R1.filter((r) => r.axis === 'tall').length === 3, 'A: 5 cm rounds, 3 tall rounds');
  ok(R2.filter((r) => r.answer === 'cm').length === 5, 'A: level 2 is cm 5 / m 5');
  ok(R1.length >= 7 && R2.length >= 7, 'A: at least seven rounds per level');

  /* ---------- B. the pictures ---------- */
  const sharp = require('sharp');
  for (const [obj, th] of Object.entries(THEME)) {
    const j = path.join(ROOT, 'mini tools', 'pictures', th.replace(/ /g, '-') + '.json');
    ok(fs.existsSync(j) && JSON.parse(fs.readFileSync(j, 'utf8')).nouns[obj], 'B: ' + obj + ' is a labelled library picture in ' + th);
    const p = C.PICS[obj]; ok(p && p.theme === th, 'B: ' + obj + ' comes from ' + th);
    ok(p && (TURNS.includes(obj) ? p.ang !== 0 : p.ang === 0), 'B: ' + obj + (TURNS.includes(obj) ? ' turns to lie flat' : ' stays upright'));
    const file = path.join(ROOT, 'image-library-webp', 'themes', th, obj + '@2x.webp');
    const meta = await sharp(file).metadata(), S = meta.width;
    const { data, info } = await sharp(file).ensureAlpha().rotate(p.ang, { background: { r: 0, g: 0, b: 0, alpha: 0 } }).raw().toBuffer({ resolveWithObject: true });
    let x0 = 1e9, x1 = -1, y0 = 1e9, y1 = -1;
    for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) if (data[(y * info.width + x) * 4 + 3] > 40) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    const own = { l: (x0 - info.width / 2) / S, r: (x1 + 1 - info.width / 2) / S, t: (y0 - info.height / 2) / S, b: (y1 + 1 - info.height / 2) / S };
    ok(['l', 'r', 't', 'b'].every((k) => Math.abs(own[k] - p[k]) < 0.006), 'B: ' + obj + ': the stored ink box matches the pixels');
    const along = p.axis === 'tall' ? own.b - own.t : own.r - own.l, across = p.axis === 'tall' ? own.r - own.l : own.b - own.t;
    ok(along > across || p.axis === 'tall' || ['ant', 'bee', 'snail'].includes(obj), 'B: ' + obj + ' lies along its measured axis');
  }

  /* ---------- C. the benchmark never depends on the answer ---------- */
  R1.forEach((r) => {
    const want = [r.unit === 'm' ? 'stick' : 'ruler'];
    ok(JSON.stringify(C.benches(r)) === JSON.stringify(want), 'C: ' + r.obj + ' uses the ' + want[0] + ' (its unit)');
    const fake = Object.assign({}, r, { answer: r.cards[(r.cards.indexOf(r.answer) + 1) % 3] });
    ok(JSON.stringify(C.benches(fake)) === JSON.stringify(C.benches(r)), 'C: ' + r.obj + ': moving the right answer does not move the benchmark');
  });
  R2.forEach((r) => ok(C.benches(r).join() === 'ruler,stick', 'C: level 2 ' + r.obj + ' shows both the ruler and the metre stick'));
  ok(C.benchCm('ruler') === 30 && C.benchCm('stick') === 100, 'C: a 30-cm ruler and a 1-m stick');

  /* ---------- D. one scale for all ---------- */
  for (let i = 0; i < 3000; i++) {
    const len = 200 + (i * 37) % 500, th = 80 + (i * 13) % 200, a = 0.5 + (i % 50) * 7, b = 1 + (i % 17) * 40, ac = 0.2 + (i % 9) / 10;
    const s = C.scale(len, th, [{ cm: a, across: ac }, { cm: b }]);
    const own = Math.min(0.9 * len / Math.max(a, b), th / (a * ac));
    ok(Math.abs(s - own) < 1e-9, 'D: scale ' + [len, th, a, b, ac].join());
    ok(Math.max(a, b) * s <= 0.9 * len + 1e-6 && a * ac * s <= th + 1e-6, 'D: nothing runs past the frame');
  }

  /* ---------- E. check against the own oracle ---------- */
  for (const L of ['estimate', 'unit']) for (const r of C.rounds(L)) {
    const tru = L === 'unit' ? cm(r.n, r.answer) : cm(r.answer, r.unit);
    r.cards.forEach((c, i) => {
      const st = C.newState(L, r.k); ok(st.chosen === null, 'E: nothing is chosen at the start');
      C.choose(st, i); const x = C.check(st), size = L === 'unit' ? cm(r.n, c) : cm(c, r.unit);
      if (c === r.answer) ok(x.result === 'ok' && st.done, 'E: ' + L + ' ' + r.obj + ' ' + c + ' → solved');
      else ok(x.result === 'miss' && st.verdict.kind === (size > tru ? 'big' : 'small'), 'E: ' + L + ' ' + r.obj + ' ' + c + ' → too ' + (size > tru ? 'big' : 'small'));
    });
    const e0 = C.newState(L, r.k);
    ok(C.check(e0).key === 'hintPick' && e0.misses === 0 && !e0.help && e0.verdict === null, 'E: ' + L + ' ' + r.obj + ': no card is a note, never a miss');
  }
  (() => {
    const st = C.newState('estimate', 6);   /* the truck */
    C.choose(st, 0); C.check(st); ok(st.misses === 1 && !st.help && C.hint(st) === 'hintSmallStick', 'E: 2 m for a truck → too small, the metre stick');
    C.choose(st, 2); ok(st.verdict === null, 'E: a new card takes the verdict away');
    C.check(st); ok(st.help && C.hint(st) === 'cmp1_truck', 'E: miss 2 → the comparison hint');
    C.choose(st, 1); ok(C.check(st).result === 'ok' && C.check(st).result === 'no', 'E: the right card still wins, then the round is locked');
    const a = C.newState('estimate', 0); C.choose(a, 2); C.check(a); ok(C.hint(a) === 'hintBigRuler', 'E: 30 cm for an ant → too big, the ruler');
    const u = C.newState('unit', 1); C.choose(u, 0); C.check(u); ok(C.hint(u) === 'hintSmallBoth', 'E: 2 cm for a door → too small, both sticks'); C.check(u); ok(C.hint(u) === 'hintUnits', 'E: … then hintUnits');
  })();

  /* ---------- F. the bots ---------- */
  const byRank = (k) => R1.filter((r) => r.cards[k] === r.answer).length;
  ok(byRank(0) <= 5 && byRank(1) <= 5 && byRank(2) <= 5, 'F: "always the smallest / middle / largest value" wins ≤ 5 of 13 (' + [0, 1, 2].map(byRank).join('/') + ')');
  for (const strat of ['shortest', 'longest', 'middle']) {
    const won = R1.filter((r) => { const t = r.cards.map((c) => (c + ' ' + r.unit).length), sorted = t.slice().sort((x, y) => x - y), i = r.cards.indexOf(r.answer);
      if (strat === 'shortest') return t[i] === sorted[0] && t.filter((x) => x === sorted[0]).length === 1;
      if (strat === 'longest') return t[i] === sorted[2] && t.filter((x) => x === sorted[2]).length === 1;
      return t[i] === sorted[1] && t.filter((x) => x === sorted[1]).length === 1; }).length;
    ok(won <= 5, 'F: "pick the ' + strat + ' card text" wins ' + won + ' of 13 (the unit symbols are the same in all 11 locales)');
  }
  let best = 0;
  for (const thr of [1, 2, 3, 4, 5, 6, 10, 13, 16, 20, 22, 26, 31]) for (const dir of [0, 1]) { const w = R2.filter((r) => ((r.n < thr) === !!dir ? 'm' : 'cm') === r.answer).length; best = Math.max(best, w); }
  ok(best <= 6, 'F: the best "number decides the unit" bot wins ' + best + ' of 10');

  /* ---------- G. the plan ---------- */
  (() => {
    let seed = 5; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    for (const L of ['estimate', 'unit']) {
      let prev = null, same = 0; const seen = new Set();
      for (let p = 0; p < 300; p++) { const P = C.plan(L, p, rnd, prev); ok(P.order.slice().sort((a, b) => a - b).join() === C.rounds(L).map((r) => r.k).join(), 'G: ' + L + ' pass ' + p + ' is its pool reordered'); if (prev && prev.join() === P.order.join()) same++; seen.add(P.order.join()); prev = P.order; }
      ok(same === 0, 'G: ' + L + ' never repeats the previous order');
      ok(seen.size > 100, 'G: ' + L + ' orders really shuffle (' + seen.size + ' different orders in 300 passes)');
      const stream = (sd) => { let x = sd; return () => { x = (x * 16807) % 2147483647; return x / 2147483647; }; };
      for (let sd = 1; sd < 25; sd++) { const o1 = C.plan(L, 0, stream(sd), null).order, o2 = C.plan(L, 0, stream(sd), o1).order; ok(o1.join() !== o2.join(), 'G: ' + L + ' replayed stream ' + sd + ' gives a new order'); }
    }
    const slot = [0, 0, 0]; let n = 0; const perRound = R1.map(() => [new Set(), new Set()]);
    for (let p = 0; p < 30; p++) { const P = C.plan('estimate', p, rnd, null); R1.forEach((r, ri) => { const o = P.cards[r.k], at = o.indexOf(r.cards.indexOf(r.answer)); ok(o.slice().sort().join() === '0,1,2', 'G: a card order is the three cards'); slot[at]++; n++; perRound[ri][0].add(o.join()); perRound[ri][1].add(at); }); }
    /* the balance over all rounds cannot see a FIXED order (rank 4/5/4 already lands 31/38/31 %), so each round on its own: */
    R1.forEach((r, ri) => ok(perRound[ri][0].size >= 4 && perRound[ri][1].size === 3, 'G: ' + r.obj + ': its cards are reshuffled (' + perRound[ri][0].size + ' orders, the right card in ' + perRound[ri][1].size + ' slots over 30 passes)'));
    slot.forEach((c, i) => ok(c / n >= 0.2 && c / n <= 0.47, 'G: the right card sits in slot ' + (i + 1) + ' in ' + Math.round(100 * c / n) + '% of rounds (20–47 %)'));
    for (let p = 0; p < 30; p++) { const P = C.plan('unit', p, rnd, null); ok(R2.filter((r) => P.cards[r.k][0] === 0).length === 5, 'G: level 2 pass ' + p + ': the cm card is on the left in exactly 5 of 10'); }
    const st = C.newState('estimate', 0, [2, 0, 1]); ok(st.order.join() === '2,0,1', 'G: a round takes its card order from the plan');
  })();

  /* ---------- H. strings ×11 and reachability ---------- */
  const strBlock = SRC.slice(SRC.indexOf('/*STRINGS-BEGIN*/'), SRC.indexOf('/*STRINGS-END*/'));
  const keys = [...strBlock.matchAll(/^\s{4}(\w+): \{/gm)].map((m) => m[1]);
  const sandbox = {}; new Function('window', 'document', 'GrowingPictureCore', SRC.replace(/injectGrowingPictureCSS\(\);/, '') + ';window.X=GrowingPictureActivity;')(sandbox, undefined, C);
  const STR = sandbox.X.strings;
  ok(keys.length >= 60, 'H: the strings block parsed (' + keys.length + ' keys)');
  const body = SRC.replace(strBlock, '') + CORE;
  keys.forEach((k) => {
    LOCALES.forEach((l) => ok(typeof STR[k][l] === 'string' && STR[k][l].trim().length > 0, 'H: ' + k + '.' + l + ' authored'));
    const ph = (s) => (s.match(/\{\w+\}/g) || []).sort().join();
    LOCALES.forEach((l) => ok(ph(STR[k][l]) === ph(STR[k].en), 'H: ' + k + '.' + l + ' keeps the placeholders of en'));
    const built = /^(q1_|q2_|ok1_)/.test(k) && /'q2_' : 'q1_'/.test(body) && /'ok1_' \+ r\.obj/.test(body) || /^cmp1_/.test(k) && /'cmp1_' \+ r\.obj/.test(body);
    ok(body.includes("'" + k + "'") || built || ['title', 'instruction'].includes(k), 'H: ' + k + ' is reached by the code');
  });
  const num = (s, n) => new RegExp('(^|[^\\d.,])' + n + '([^\\d.,]|$)').test(s);
  R1.forEach((r) => LOCALES.forEach((l) => {
    ok(STR['q1_' + r.obj] && !/\d/.test(STR['q1_' + r.obj][l]), 'H: ' + l + ' q1_' + r.obj + ' asks without a number');
    ok(STR['cmp1_' + r.obj] && !num(STR['cmp1_' + r.obj][l], r.answer), 'H: ' + l + ' cmp1_' + r.obj + ' never names the answer ' + r.answer);
    ok(STR['ok1_' + r.obj] && num(STR['ok1_' + r.obj][l], r.answer) && STR['ok1_' + r.obj][l].includes(r.unit), 'H: ' + l + ' ok1_' + r.obj + ' names ' + r.answer + ' ' + r.unit);
  }));
  R2.forEach((r) => LOCALES.forEach((l) => ok(STR['q2_' + r.obj] && STR['q2_' + r.obj][l].includes('{gap}') && num(STR['q2_' + r.obj][l], r.n) && !/(?<!\p{L})(cm|m)(?!\p{L})/u.test(STR['q2_' + r.obj][l].replace('{gap}', '')), 'H: ' + l + ' q2_' + r.obj + ' gives ' + r.n + ' and leaves the unit blank')));
  ok(keys.every((k) => !/ [?:!;»]|« /.test(STR[k].fr)), 'H: every fr string uses U+202F before ? : ! ; and inside « »');
  ok(!/\b(free|gratis|kostenlos|gratuit|gratuito|ilmai\w*)\b/i.test(strBlock), 'H: no "free" in the activity text');
  /* exemption: cmp1_snail compares with a child's THUMB — fr pouce / it pollice / nl duim are the body part there */
  const INCH = /(?<!\p{L})(inch|inches|feet|foot|zoll|pouce|pulgada|polegada|pollice|duim|tum|tomme|tuuma)(?!\p{L})/iu;
  keys.filter((k) => k !== 'cmp1_snail').forEach((k) => LOCALES.forEach((l) => ok(!INCH.test(STR[k][l]), 'H: ' + k + '.' + l + ' is metric only')));
  ok(INCH.test('2 inches') && INCH.test('3 tum') && !INCH.test('tumme'), 'H: the inch ban fires on inches and passes the Swedish thumb');
  ok(!/metre|centimetre/.test(Object.values(STR).map((v) => v.en).join(' ')), 'H: en uses US spelling (centimeter, meter)');

  /* ---------- I. the drawing rules ---------- */
  const ACT_BODY = SRC.replace(strBlock, '');
  ok(/var bs = C\.benches\(r\)/.test(ACT_BODY) && !/r\.answer[^;]*bench|bench[^;]*r\.answer/.test(ACT_BODY), 'I: the frame draws the benchmark from the unit, never from the answer');
  ok(/<rect class="gp-ghost"/.test(ACT_BODY) && !/gp-ghost[^\n]*<text/.test(ACT_BODY), 'I: the true-size ghost is an outline with no number');
  ok(/if \(along >= floorPx\) this\._pic\(/.test(ACT_BODY) && /gp-sizebar/.test(ACT_BODY), 'I: a picture below the floor becomes a size bar with a label');
  ok(/var ghostCm = st\.verdict \? C\.trueCm\(r\) : null/.test(ACT_BODY) || /ghostCm = st\.verdict \? C\.trueCm\(r\) : null/.test(ACT_BODY), 'I: the ghost (the true size) appears only after a miss');
  ok(/if \(!this\._album\.some/.test(ACT_BODY), 'I: a win files the thing in the size album');

  /* ---------- J. the manifest row ---------- */
  const man = JSON.parse(fs.readFileSync(MAN_PATH, 'utf8')), list = Array.isArray(man) ? man : man.activities;
  const row = list.find((x) => x.id === 'gauge-good-guess.estimate.2-md-a-3');
  ok(row && row.tool === 'growing-picture-activity' && row.task_template === 'growing-picture', 'J: the row points at the growing picture');
  ok(row && row.alignment.code === '2.MD.A.3', 'J: the alignment stays');
  ok(row && LOCALES.every((l) => row.slug[l] && row.page_title[l] && row.page_intro[l]), 'J: the row ships in all 11 locales (slug, title, intro)');
  ok(row && new Set(Object.values(row.slug)).size === 11, 'J: 11 different slugs');

  console.log(`verify-growing-picture-core: ${pass} pass, ${fail} fail`);
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
