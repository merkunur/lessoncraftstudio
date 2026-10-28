#!/usr/bin/env node
/* =====================================================================
   verify-square-vice-core.js — the build gate for ACTIVITY #145, The
   Square Vice ("Tuck Makes a Hundred", 2.NBT.B.7), all 11 locales.
   ---------------------------------------------------------------------
   It does NOT trust the core. Its own ground truth:
     · its own copy of the design's tables, re-solved by column
       arithmetic: the old eight (totals 210 310 410 400 510 200 500 300,
       four exactly-ten rounds, four eleven-tens rounds, no ones), the
       warm-up (no kind ever reaches ten: tens sums 5–8, ones sums 6–9),
       both-trade (a ones lock and a tens lock in every round, tens 11–14
       before the carried ten); all totals distinct, all under 1000;
     · the old activity's rounds (read from git): every one is a round;
     · the vice: for every kind and every stack 1–12 the jaw stops at n,
       locks only at exactly ten, and a lock turns ten into one piece of
       the next place; a flat never locks; crank-up splits one rod or
       flat into ten and refuses anything else; 10 000 random hands
       conserve the value of the mat;
     · a scripted player for EVERY round of every face: lock what the
       column arithmetic says, type the total → solved; the number of
       locks each round needs; Check refuses while a column holds ten;
     · the shortcut bots of §6 (tens written as they are 0/8, add
       hundreds and tens digits only 0/8, trade-but-drop-the-leftover
       right only on the four exactly-ten rounds; both-trade: no carry
       0/8, carry the ones and forget the tens 0/8);
     · every verdict and its literal hint key, typing, the plan;
     · the picture on disk (colour), strings ×11 (never "free", no digit
       in a hint, every placeholder, every key reached), prose ×11 and
       the manifest.
   Usage: node scripts/verify-square-vice-core.js   (SV_CORE / SV_ACT / SV_MANIFEST override the files)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), { execSync } = require('child_process'), vm = require('vm');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const CORE = process.env.SV_CORE || path.join(MINI, 'square-vice-core.js');
const ACTF = process.env.SV_ACT || path.join(MINI, 'square-vice-activity.js');
const MAN = process.env.SV_MANIFEST || path.join(MINI, 'place-value-regroup-activities.json');
const ID = 'place-value-regroup.add-compose-hundred.2-nbt-b-7', BEFORE = '1c2c7a8e';
const C = require(CORE);
const ACT = (() => { const ctx = { window: {}, SquareViceCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(ACTF, 'utf8') + '\n;this.__A = window.SquareViceActivity;', ctx); return ctx.__A; })();
const LOCS = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
let PASS = 0, FAIL = 0;
const ok = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL <= 80) console.error('  FAIL: ' + m); } };
let rng = 7; const rnd = () => { rng = (rng * 1103515245 + 12345) % 2147483648; return rng / 2147483648; };
const H = (n) => Math.floor(n / 100) % 10, T = (n) => Math.floor(n / 10) % 10, O = (n) => n % 10;

/* ---------- 1. my own tables ---------- */
const MY = {
  hundred: [[160, 50, 210], [280, 30, 310], [340, 70, 410], [320, 80, 400], [450, 60, 510], [130, 70, 200], [410, 90, 500], [240, 60, 300]],
  none: [[34, 25, 59], [52, 36, 88], [234, 52, 286], [312, 46, 358], [125, 63, 188], [451, 127, 578], [206, 81, 287], [343, 215, 558]],
  both: [[268, 157, 425], [349, 276, 625], [185, 237, 422], [456, 178, 634], [297, 135, 432], [374, 159, 533], [168, 284, 452], [529, 193, 722]]
};
for (const face of ['hundred', 'none', 'both']) {
  const R = C.rounds(face);
  ok(R.length === 8, `${face}: eight rounds`);
  R.forEach((r, i) => {
    const [a, b, tot] = MY[face][i];
    ok(r.a === a && r.b === b && a + b === tot && tot < 1000, `${face} ${i}: ${a} + ${b} = ${tot}`);
    /* my own column arithmetic */
    const ones = O(a) + O(b), co = ones >= 10 ? 1 : 0, tens = T(a) + T(b) + co, ct = tens >= 10 ? 1 : 0;
    ok((H(a) + H(b) + ct) * 100 + (tens % 10) * 10 + ones % 10 === tot, `${face} ${i}: the columns make ${tot}`);
    const need = C.needs(a, b);
    ok(need.O === co && need.T === ct, `${face} ${i}: the core's locks (${need.O} ones, ${need.T} tens) are mine (${co}, ${ct})`);
    if (face === 'hundred') ok(O(a) === 0 && O(b) === 0 && (T(a) + T(b) === 10 || T(a) + T(b) === 11) && co === 0 && ct === 1, `${face} ${i}: tens only, ten or eleven of them`);
    if (face === 'none') ok(co === 0 && ct === 0 && T(a) + T(b) >= 5 && T(a) + T(b) <= 8 && ones >= 6 && ones <= 9, `${face} ${i}: nothing reaches ten (tens ${T(a) + T(b)}, ones ${ones})`);
    if (face === 'both') ok(co === 1 && ct === 1 && T(a) + T(b) >= 11 && T(a) + T(b) <= 14, `${face} ${i}: a ones lock and a tens lock, tens ${T(a) + T(b)} before the carry`);
  });
  ok(new Set(MY[face].map(x => x[2])).size === 8, `${face}: the totals are all different`);
}
const exact = MY.hundred.filter(x => T(x[0]) + T(x[1]) === 10).length;
ok(exact === 4, `hundred: four exactly-ten rounds (${exact}), four with one rod left over`);
ok(C.rounds('hundred').filter(r => C.exactTen('hundred', r.k)).length === 4 && !C.exactTen('both', 0) && !C.exactTen('none', 0), 'the core marks the same four exactly-ten rounds');
/* the old activity's rounds, from git */
const headRows = JSON.parse(execSync(`git show ${BEFORE}:"mini tools/place-value-regroup-activities.json"`, { cwd: REPO, encoding: 'utf8', maxBuffer: 1e8 })), head = headRows.find(x => x.id === ID);
const old = (head.params && head.params.rounds) || [];
ok(old.length === 8, 'the old activity has eight rounds');
old.forEach(o => ok(C.rounds('hundred').some(r => r.a === o.a && r.b === o.b), `the old round ${o.a} + ${o.b} is still a round`));

/* ---------- 2. the vice ---------- */
const val = (st) => ['H', 'T', 'O'].reduce((s, c) => s + C.count(st, c) * ({ H: 100, T: 10, O: 1 })[c], 0);
{
  /* every stack height of every kind */
  for (const kind of ['T', 'O']) for (let n = 1; n <= 12; n++) {
    const st = C.newState('both', 6); st.bays[kind] = Array(19).fill('a'); st.bays[kind === 'T' ? 'H' : 'T'] = [];
    const v0 = val(st), up = kind === 'T' ? 'H' : 'T';
    ok(C.load(st, kind, n) === n && st.bed.pieces.length === n && val(st) === v0, `${kind} ×${n}: ${n} on the bed, nothing lost`);
    const r = C.crankDown(st);
    ok(r.stop === n, `${kind} ×${n}: the jaw stops at ${n}`);
    if (n === 10) ok(r.result === 'lock' && st.bed.pieces.length === 0 && st.bays[up].length === 1 && st.bays[up][0] === 'made' && val(st) === v0, `${kind} ×10: the catch drops in, ten make one ${up}, value kept`);
    else ok(r.result === (n < 10 ? 'short' : 'tall') && st.bed.pieces.length === n && st.bays[up].length === 0, `${kind} ×${n}: no lock (${n < 10 ? 'a bare stripe' : 'sticks out'}), nothing moves`);
  }
  const st = C.newState('both', 6); st.bays.T = Array(15).fill('b');
  ok(C.load(st, 'T', 20) === 12 && C.load(st, 'T', 1) === 0, 'the bed holds twelve at most');
  ok(C.load(st, 'O', 1) === 0, 'two kinds never share the bed');
  const sh = C.newState('hundred', 0); ok(C.crankUp(Object.assign(C.newState('hundred', 0), {})).result === 'none', 'nothing on the bed: nothing splits');
  ok(C.load(sh, 'H', 3) === 1 && C.load(sh, 'H', 1) === 0 && C.crankDown(sh).result === 'none' && C.crankUp(sh).result === 'none', 'a flat goes on alone and never locks; with eleven rods in the column it cannot split (twenty-one would not fit)');
  C.unload(sh); C.load(sh, 'T', 10); C.crankDown(sh); C.load(sh, 'H', 1);
  const v0 = val(sh); ok(C.crankUp(sh).result === 'split' && sh.bays.T.length === 11 && val(sh) === v0 && sh.bed.pieces.length === 0, 'after the lock a flat cranked up splits into ten rods, value kept');
  const s2 = C.newState('hundred', 0); C.load(s2, 'T', 2); ok(C.crankUp(s2).result === 'none' && s2.bed.pieces.length === 2, 'two rods on the bed do not split');
  const s3 = C.newState('both', 6); C.load(s3, 'O', 10); C.crankDown(s3); C.load(s3, 'T', 1); ok(C.crankUp(s3).result === 'split' && s3.bays.O.length === 12 && val(s3) === 452, 'one rod splits into ten cubes, value kept');
  const s4 = C.newState('both', 6); C.load(s4, 'T', 1); s4.bays.O = Array(12).fill('a'); ok(C.crankUp(s4).result === 'none', 'a split that would overfill a column is refused');
  const s5 = C.newState('hundred', 0); C.load(s5, 'T', 3); ok(C.unload(s5) && s5.bed.pieces.length === 2 && s5.bays.T.length === 9, 'tapping the bed returns the top piece');
}
/* 10 000 random hands: the mat's value never changes, no bay or bed breaks its bounds */
{
  let good = true, locks = 0, splits = 0;
  for (let t = 0; t < 10000 && good; t++) {
    const face = ['none', 'hundred', 'both'][t % 3], st = C.newState(face, t % 8), v0 = st.a + st.b;
    for (let m = 0; m < 30; m++) {
      const x = rnd();
      if (x < 0.4) C.load(st, ['H', 'T', 'O'][Math.floor(rnd() * 3)], 1 + Math.floor(rnd() * 12));
      else if (x < 0.55) C.unload(st);
      else if (x < 0.8) { if (C.crankDown(st).result === 'lock') locks++; }
      else { if (C.crankUp(st).result === 'split') splits++; }
      if (val(st) !== v0 || st.bed.pieces.length > 12 || ['H', 'T', 'O'].some(c => st.bays[c].length > 19)) good = false;
    }
  }
  ok(good && locks > 300 && splits > 100, `10 000 random hands: value kept, bounds kept (${locks} locks, ${splits} splits)`);
}

/* ---------- 3. a scripted player for every round ---------- */
const typeIn = (st, s) => { while (st.typed) C.type(st, 'del'); String(s).split('').forEach(d => C.type(st, d)); };
for (const face of ['none', 'hundred', 'both']) C.rounds(face).forEach((r, i) => {
  const st = C.newState(face, i), tot = r.a + r.b, need = C.needs(r.a, r.b);
  ok(C.count(st, 'H') === H(r.a) + H(r.b) && C.count(st, 'T') === T(r.a) + T(r.b) && C.count(st, 'O') === O(r.a) + O(r.b), `${face} ${i}: the columns hold both numbers`);
  let res = C.check(st); ok(res.result === 'note' && res.key === 'hintType' && st.misses === 0, `${face} ${i}: Check with nothing typed → hintType`);
  typeIn(st, tot);
  if (need.O || need.T) { res = C.check(st); ok(res.result === 'note' && res.key === 'hintTooMany' && st.misses === 0 && !st.done, `${face} ${i}: the right total, a column still at ten → hintTooMany, no miss`); }
  let n = 0;
  if (need.O) { C.load(st, 'O', 10); n += C.crankDown(st).result === 'lock' ? 1 : 0; }
  if (need.T) { C.load(st, 'T', 10); n += C.crankDown(st).result === 'lock' ? 1 : 0; }
  ok(n === need.O + need.T, `${face} ${i}: ${n} lock(s)`);
  ok(['H', 'T', 'O'].every(c => C.count(st, c) <= 9) && String(C.value(st)) === String(tot), `${face} ${i}: every column now holds one digit's worth: ${C.value(st)}`);
  ok(C.carry(st, 'H') === !!need.T && C.carry(st, 'T') === !!need.O, `${face} ${i}: the carry marks stand where the locks went`);
  res = C.check(st); ok(res.result === 'ok' && st.done, `${face} ${i}: ${tot} → solved`);
  ok(C.check(st).result === 'no' && !C.type(st, '1') && C.load(st, 'H', 1) === 0, `${face} ${i}: a finished round takes nothing`);
  if (face === 'none') { const s2 = C.newState(face, i); ['T', 'O'].forEach(c => { C.load(s2, c, 12); ok(C.crankDown(s2).result === 'short', `${face} ${i}: the ${c} column never locks`); while (C.unload(s2)); }); }
});

/* ---------- 4. the verdicts, the hints, typing ---------- */
{
  const st = C.newState('hundred', 0);
  ok(C.type(st, '0') === false && C.type(st, '2') && C.type(st, '1') && C.type(st, '0') && !C.type(st, '5') && st.typed === '210', 'no leading 0; three digits at most');
  ok(C.boxDigit('210', 'H') === '2' && C.boxDigit('210', 'T') === '1' && C.boxDigit('210', 'O') === '0' && C.boxDigit('59', 'H') === '' && C.boxDigit('59', 'O') === '9', 'digits land right-aligned under their columns');
  C.load(st, 'T', 10); C.crankDown(st);
  typeIn(st, '220'); let r = C.check(st);
  ok(r.result === 'miss' && r.wrongs.join() === 'T' && st.misses === 1 && !st.help && C.hint(st) === 'hintCount', '220 for 210 → the tens box is wrong, hintCount');
  ok(C.type(st, 'del') && st.verdict === null, 'a keystroke clears the marks');
  typeIn(st, '300'); r = C.check(st);
  ok(r.result === 'miss' && r.wrongs.join() === 'H,T' && st.help && C.hint(st) === 'hintShow', 'a second miss → hintShow');
  typeIn(st, '21'); r = C.check(st); ok(r.result === 'miss' && r.wrongs.join() === 'H,T,O', '21 for 210 → every box is off');
  typeIn(st, '210'); ok(C.check(st).result === 'ok' && st.verdict === null, '210 → solved, the marks cleared');
  /* pieces left on the bed still belong to their column */
  const s2 = C.newState('hundred', 0); C.load(s2, 'T', 10); C.crankDown(s2); C.load(s2, 'T', 1); typeIn(s2, '210');
  ok(C.check(s2).result === 'ok', 'a rod left on the bed still counts in its column');
  const s3 = C.newState('hundred', 0); C.load(s3, 'T', 9); typeIn(s3, '210'); r = C.check(s3);
  ok(r.result === 'note' && r.key === 'hintTooMany' && r.tooMany === 'T', 'nine rods on the bed + two in the column is still eleven tens → hintTooMany');
}
/* the shortcut bots over the default eight */
{
  const H8 = MY.hundred, tot = H8.map(x => x[2]);
  const asIs = H8.filter((x, i) => +('' + (H(x[0]) + H(x[1])) + (T(x[0]) + T(x[1])) + '0') === tot[i]).length;
  const hdOnly = H8.filter((x, i) => (H(x[0]) + H(x[1])) * 100 + ((T(x[0]) + T(x[1])) % 10) * 10 === tot[i]).length;
  const drop = H8.map((x, i) => ((H(x[0]) + H(x[1]) + 1) * 100) === tot[i]);
  const dropN = drop.filter(Boolean).length, dropOnExact = H8.every((x, i) => drop[i] === (T(x[0]) + T(x[1]) === 10));
  ok(asIs === 0 && hdOnly === 0 && dropN === 4 && dropOnExact, `bots: tens as they are ${asIs}/8, no carry ${hdOnly}/8, drop the leftover ${dropN}/8 (only the exactly-ten rounds)`);
  const B8 = MY.both, bt = B8.map(x => x[2]);
  const noCarry = B8.filter((x, i) => (H(x[0]) + H(x[1])) * 100 + ((T(x[0]) + T(x[1])) % 10) * 10 + (O(x[0]) + O(x[1])) % 10 === bt[i]).length;
  const onesOnly = B8.filter((x, i) => (H(x[0]) + H(x[1])) * 100 + ((T(x[0]) + T(x[1]) + 1) % 10) * 10 + (O(x[0]) + O(x[1])) % 10 === bt[i]).length;
  ok(noCarry === 0 && onesOnly === 0, `bots (both): no carry ${noCarry}/8, carry the ones and forget the tens ${onesOnly}/8`);
  /* the core agrees: a bot's total is a miss once the columns are traded */
  C.rounds('hundred').forEach((r, i) => { const st = C.newState('hundred', i); C.load(st, 'T', 10); C.crankDown(st); typeIn(st, String((H(r.a) + H(r.b)) * 100 + ((T(r.a) + T(r.b)) % 10) * 10)); ok(C.check(st).result === 'miss', `hundred ${i}: the no-carry total is a miss`); });
}
/* the plan */
for (const face of ['none', 'hundred', 'both']) {
  let prev = null; const R = C.rounds(face);
  for (let t = 0; t < 60; t++) {
    const p = C.plan(face, rnd, prev);
    ok(p.order.slice().sort((a, b) => a - b).join() === R.map(r => r.k).join() && (!prev || p.order.join() !== prev.join()), `plan ${face}: every round once, never the previous order`);
    if (face === 'hundred') ok(!(C.exactTen(face, p.order[0]) && C.exactTen(face, p.order[1])), 'plan hundred: never two exactly-ten rounds first');
    prev = p.order;
  }
}
ok(C.faceOf('both') === 'both' && C.faceOf('none') === 'none' && C.faceOf(undefined) === 'hundred' && C.faceOf('x') === 'hundred', 'the setting picks the face');
ok(C.band(560).wide && !C.band(559).wide && C.band(309).cramp && !C.band(310).cramp, 'the width bands');

/* ---------- 5. picture + strings ---------- */
const BW = /(^|\/)[^/]*\b(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?\//i;
ok(fs.existsSync(path.join(REPO, 'image-library-webp', 'themes', C.TUCK + '@2x.webp')) && !BW.test(C.TUCK + '/') && /hamster$/.test(C.TUCK), `picture ${C.TUCK}: on disk, in colour`);
const S = ACT.strings, src = fs.readFileSync(ACTF, 'utf8').replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*\/\*STRINGS-END\*\//, '') + fs.readFileSync(CORE, 'utf8');
const KEYS = Object.keys(S); ok(KEYS.length >= 34, `strings: the set is there (${KEYS.length})`);
const NODIGIT = ['instruction', 'hintType', 'hintTooMany', 'hintCount', 'hintShow', 'hintShort', 'hintTall', 'okHundred', 'okBoth', 'okNone', 'aLockT', 'aLockO', 'aSplit', 'aCrankUp'];
const NEED = { okHundred: ['a', 'b', 'c'], okBoth: ['a', 'b', 'c'], okNone: ['a', 'b', 'c'], hintShow: ['h', 't', 'o'], aBay: ['col', 'n'], aBed: ['n'], aTyped: ['v'] };
const FREE = /(?<!\p{L})(free|kostenlos\w*|gratis|gratuit\w*|grátis|ilmai\w*|maksuton\w*|kostnadsfri\w*|vederlagsfri\w*|gratuito|gratuita)(?!\p{L})/iu;
for (const k of KEYS) for (const l of LOCS) {
  const v = S[k][l]; ok(typeof v === 'string' && v.length > 0, `strings.${k}.${l} present`); if (typeof v !== 'string') continue;
  ok(!FREE.test(v), `strings.${k}.${l} never says free`);
  if (NODIGIT.indexOf(k) >= 0) ok(!/\d/.test(v.replace(/\{\w+\}/g, '')), `strings.${k}.${l}: no digit`);
  if (NEED[k]) ok(NEED[k].every(x => v.split('{' + x + '}').length - 1 === 1), `strings.${k}.${l}: carries ${NEED[k].join(', ')} once each`);
  ok(!/\{(?!(a|b|c|h|t|o|n|col|v|msg)\})/.test(v), `strings.${k}.${l}: no unknown placeholder`);
  if (l === 'fr' || l === 'it') ok(v.indexOf("'") < 0, `strings.${k}.${l}: typographic apostrophe`);
  if (l === 'fr') ok(!/ [:!?;»]/.test(v) && !/« /.test(v), `strings.${k}.fr: a narrow space before : ! ? ; and inside « »`);
  if (l === 'es' && /[!?]/.test(v)) ok(/[¡¿]/.test(v), `strings.${k}.es: opens its ¡ ¿`);
}
for (const l of LOCS) ok(S.title[l].indexOf('Tuck') >= 0, `${l}: Tuck in the title`);
/* the success lines, built by the activity, say the round */
for (const l of LOCS) {
  ACT.api = { t: k => S[k][l] }; ACT._view = {};
  const want = (k, a, b, c) => S[k][l].replace('{a}', a).replace('{b}', b).replace('{c}', c);
  ACT.st = C.newState('hundred', 0); ok(ACT._okLine() === want('okHundred', 160, 50, 210), `${l}: «${ACT._okLine()}»`);
  ACT.st = C.newState('both', 0); ok(ACT._okLine() === want('okBoth', 268, 157, 425), `${l}: «${ACT._okLine()}»`);
  ACT.st = C.newState('none', 0); ok(ACT._okLine() === want('okNone', 34, 25, 59), `${l}: «${ACT._okLine()}»`);
}
ACT.api = null; ACT.st = null;
const BYSHELL = ['title', 'instruction', 'instrBubble', 'okBubble'], BYSETTING = ['setNumbers', 'nNone', 'nHundred', 'nBoth', 'setWritten', 'wHidden', 'wShown'];
for (const k of KEYS) ok(BYSHELL.concat(BYSETTING).indexOf(k) >= 0 || new RegExp("'" + k + "'").test(src), `strings.${k} is reached`);
ok(!/role', 'img'|role="img"/.test(src), 'no role="img" anywhere');

/* ---------- 6. prose + manifest ---------- */
for (const l of LOCS) {
  const j = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'messages', 'activity-content', l + '.json'), 'utf8')), p = j.prose[ID];
  ok(p && p.about && p.about.length === 3 && p.practices.length === 4 && p.howToPlay.length === 3 && p.learningGoals.length === 3, `prose.${l}: the whole entry`);
  if (!p) continue;
  const all = [].concat(p.about, p.practices, p.howToPlay, p.learningGoals).join(' ');
  ok(!FREE.test(all), `prose.${l}: never says free`);
  ok(l === 'en' ? /Common Core/.test(all) : !/Common Core|2\.NBT/.test(all), `prose.${l}: the framework name`);
  ok(['160 + 50', '210', '320 + 80', '400', '34 + 25 = 59', '268 + 157 = 425'].every(x => all.indexOf(x) >= 0), `prose.${l}: quotes what the activity shows`);
  ok(all.indexOf('Tuck') >= 0, `prose.${l}: names Tuck`);
  ok(!/'Make a hundred'|bundle ten ten-rods/.test(all), `prose.${l}: no word of the old automatic button`);
  if (l === 'fr' || l === 'it') ok(all.indexOf("'") < 0, `prose.${l}: typographic apostrophes`);
}
const rows = JSON.parse(fs.readFileSync(MAN, 'utf8')), row = rows.find(x => x.id === ID);
ok(rows.length === headRows.length && row && row.tool === 'square-vice-activity', 'manifest: the row, tool square-vice-activity');
ok(row && row.params.numbers.join() === 'none,hundred,both' && row.params.written.join() === 'hidden,shown' && ['none', 'hundred', 'both'].every(f => row.params.rounds[f].map(r => r.a + '+' + r.b).join() === C.rounds(f).map(r => r.a + '+' + r.b).join()), 'manifest: params match the core');
['id', 'alignment', 'task_template', 'kid_prompt_template', 'theme'].forEach(k => ok(JSON.stringify(row[k]) === JSON.stringify(head[k]), `manifest: ${k} frozen`));
['slug', 'page_title', 'page_intro'].forEach(k => Object.keys(head[k]).forEach(l => ok(row[k][l] === head[k][l], `manifest: ${k}.${l} frozen`)));
['da', 'no', 'fi'].forEach(l => ok(!head.slug[l] && /^[a-z0-9-]+$/.test(row.slug[l] || '') && row.page_title[l] && row.page_intro[l] && !FREE.test(row.page_title[l] + row.page_intro[l]) && !/Common Core|2\.NBT/.test(row.page_title[l] + row.page_intro[l]), `manifest: ${l} gets a new slug, title and intro`));
ok(LOCS.every(l => row.slug[l]), 'manifest: the row ships in all 11 locales');
rows.filter(x => x.id !== ID).forEach(x => { const h = headRows.find(y => y.id === x.id); ok(h && JSON.stringify(h) === JSON.stringify(x), `manifest: ${x.id} untouched`); });

console.log(`\nverify-square-vice-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
