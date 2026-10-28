#!/usr/bin/env node
/* =====================================================================
   verify-acorn-sieve-core.js — the build gate for ACTIVITY #144, The
   Acorn Sieve ("Tally's Acorn Baskets", 2.NBT.B.6), all 11 locales.
   ---------------------------------------------------------------------
   It does NOT trust the core. Its own ground truth:
     · its own copy of the design's tables, re-solved from scratch: the
       nine kept rounds (37 56 67 80 78 77 82 72 90, bands 1/2/3, five
       of them with ones of ten or more), the eight two-or-three rounds
       (ones never reach ten), the seven small rounds (totals 4–10, all
       different), the eight walls (every brick the two under it, tops
       63 78 79 80 82 84 75 81);
     · the old activity's rounds (read from git): every one is still a
       round;
     · a scripted player for EVERY round of every face, cloth on and off:
       tip all, shake, type the oracle → solved; a wall solved brick by
       brick; tipping twice never changes the sieve; a shake conserves
       every acorn; no groove ever holds more than ten; a full groove
       rolls into a cup and nothing is lost;
     · the shortcut bots of §6 (digits as ones 0/9, tens only 0/9, first
       two baskets 3/9, cups beside loose right only where the ones stay
       under ten);
     · every verdict and its literal hint key, typing, the plan (bands
       kept, never the same order twice);
     · the picture on disk (colour), strings ×11 (never "free", no digit
       in a hint, every placeholder, every key reached), prose ×11 and
       the manifest.
   Usage: node scripts/verify-acorn-sieve-core.js   (AS_CORE / AS_ACT / AS_MANIFEST override the files)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), { execSync } = require('child_process'), vm = require('vm');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const CORE = process.env.AS_CORE || path.join(MINI, 'acorn-sieve-core.js');
const ACTF = process.env.AS_ACT || path.join(MINI, 'acorn-sieve-activity.js');
const MAN = process.env.AS_MANIFEST || path.join(MINI, 'tally-squirrel-activities.json');
const ID = 'tally-squirrel.add-four.2-nbt-b-6', BEFORE = '072c1b9e';
const C = require(CORE);
const ACT = (() => { const ctx = { window: {}, AcornSieveCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(ACTF, 'utf8') + '\n;this.__A = window.AcornSieveActivity;', ctx); return ctx.__A; })();
const LOCS = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
let PASS = 0, FAIL = 0;
const ok = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL <= 80) console.error('  FAIL: ' + m); } };
let rng = 7; const rnd = () => { rng = (rng * 1103515245 + 12345) % 2147483648; return rng / 2147483648; };
const sum = (a) => a.reduce((s, x) => s + x, 0);
const T = (n) => Math.floor(n / 10), O = (n) => n % 10;

/* ---------- 1. my own tables ---------- */
const MY_FOUR = [[[23, 14], 1, 37], [[31, 25], 1, 56], [[12, 34, 21], 1, 67], [[42, 15, 23], 2, 80], [[21, 14, 32, 11], 2, 78], [[33, 26, 18], 2, 77], [[15, 22, 34, 11], 3, 82], [[44, 28], 3, 72], [[13, 21, 32, 24], 3, 90]];
const MY_FEW = [[21, 13], [32, 15], [14, 22, 31], [11, 23, 42], [25, 13, 21], [34, 12], [16, 22, 30], [41, 12, 25]];
const MY_SMALL = [[2, 1, 1], [1, 3, 1], [2, 2, 2], [3, 1, 3], [4, 3, 1], [2, 5, 2], [3, 4, 3]];
const MY_WALL = [[12, 15, 21, 63], [14, 23, 18, 78], [25, 11, 32, 79], [16, 19, 26, 80], [31, 12, 27, 82], [13, 28, 15, 84], [22, 17, 19, 75], [18, 26, 11, 81]];
const four = C.rounds('four'), few = C.rounds('few'), small = C.rounds('small'), wall = C.rounds('wall');
ok(four.length === 9 && few.length === 8 && small.length === 7 && wall.length === 8, 'faces: 9 / 8 / 7 / 8 rounds');
four.forEach((r, i) => {
  const [n, b, tot] = MY_FOUR[i];
  ok(r.nums.join() === n.join() && r.band === b && sum(n) === tot, `four ${i}: ${n.join(' + ')} = ${tot}, band ${b}`);
  ok(n.length >= 2 && n.length <= 4 && n.every(x => x >= 11 && x <= 44), `four ${i}: two to four baskets of 11–44`);
  ok(sum(n.map(T)) * 10 + sum(n.map(O)) === tot, `four ${i}: cups and loose make the total`);
});
ok(new Set(MY_FOUR.map(x => x[2])).size === 9, 'four: the totals are all different');
const fullRounds = MY_FOUR.map((x, i) => sum(x[0].map(O)) >= 10 ? i : -1).filter(i => i >= 0);
ok(fullRounds.join() === '3,5,6,7,8', `four: the ones reach ten in rounds 4, 6, 7, 8, 9 (${fullRounds.map(i => i + 1)})`);
ok(fullRounds.length * 2 >= 9, 'four: full-groove rounds are at least half of a pass');
few.forEach((r, i) => {
  const n = MY_FEW[i];
  ok(r.nums.join() === n.join(), `few ${i}: ${n.join(' + ')}`);
  ok(n.length >= 2 && n.length <= 3 && n.every(x => x >= 11 && x <= 44) && sum(n.map(O)) < 10, `few ${i}: two or three baskets, the ones stay under ten`);
});
ok(new Set(MY_FEW.map(sum)).size === 8, 'few: the totals are all different');
small.forEach((r, i) => {
  const n = MY_SMALL[i];
  ok(r.nums.join() === n.join() && n.length === 3 && n.every(x => x >= 1 && x <= 5) && sum(n) <= 10 && sum(n) >= 1, `small ${i}: ${n.join(' + ')} = ${sum(n)}, three baskets of 1–5, up to ten`);
});
ok(MY_SMALL.map(sum).join() === '4,5,6,7,8,9,10', 'small: the totals are 4 to 10, all different');
wall.forEach((r, i) => {
  const [a, b, c, top] = MY_WALL[i], br = C.bricksOf(r.base), m = [a + b, b + c];
  ok(r.base.join() === [a, b, c].join(), `wall ${i}: the bottom row ${a} ${b} ${c}`);
  ok(br.join() === [a, b, c, m[0], m[1], m[0] + m[1]].join() && m[0] + m[1] === top, `wall ${i}: ${m[0]} ${m[1]} → ${top}`);
  ok(br.every(x => x >= 10 && x <= 99), `wall ${i}: every brick has two digits`);
});
ok(new Set(MY_WALL.map(x => x[3])).size === 8, 'wall: the tops are all different');
ok(C.SUPPORTS[3].join() === '0,1' && C.SUPPORTS[4].join() === '1,2' && C.SUPPORTS[5].join() === '3,4', 'wall: each brick stands on the two below it');
/* the old activity's rounds, from git */
const headRows = JSON.parse(execSync(`git show ${BEFORE}:"mini tools/tally-squirrel-activities.json"`, { cwd: REPO, encoding: 'utf8', maxBuffer: 1e8 })), head = headRows.find(x => x.id === ID);
const old = (head.params && head.params.rounds) || [];
ok(old.length === 9, 'the old activity has nine rounds');
old.forEach(o => ok(four.some(r => r.nums.join() === o.addends.join() && r.band === o.band), `the old round ${o.addends.join(' + ')} is still a round, same band`));

/* ---------- 2. a scripted player for every round ---------- */
const typeIn = (st, w, str) => { C.setFocus(st, w); String(str).split('').forEach(d => C.type(st, d)); };
const conserved = (st) => st.cups * 10 + st.sieve + st.tray === sum(st.tubs.filter(t => t.tipped).map(t => t.n));
for (const face of ['four', 'few', 'small']) for (const cloth of [true, false]) C.rounds(face).forEach((r, i) => {
  const st = C.newState(face, i, cloth), tot = sum(r.nums);
  ok(st.tubs.length === r.nums.length && st.tubs.every((t, j) => t.n === r.nums[j] && !t.tipped) && st.covered === cloth, `${face}/${cloth ? 'cloth' : 'bare'} ${i}: the baskets are full, the cloth ${cloth ? 'on' : 'off'}`);
  let good = true;
  r.nums.forEach((n, j) => { const before = JSON.stringify([st.cups, st.sieve]); C.tip(st, j); if (!conserved(st)) good = false; if (C.tip(st, j) || JSON.stringify([st.cups, st.sieve]) === before) good = false; });
  ok(good, `${face} ${i}: every basket tips once, never twice; nothing is lost`);
  if (!cloth) { const moved = C.shake(st); ok(moved === sum(r.nums.map(O)) && st.sieve === 0 && st.tray === moved && conserved(st) && C.shake(st) === 0, `${face} ${i}: a shake drops every loose acorn, the cups stay`); }
  else ok(C.shake(st) === 0 && st.tray === 0, `${face} ${i}: under the cloth the sieve cannot be shaken`);
  ok(C.grooves(Object.assign({}, st, { tray: sum(r.nums.map(O)) })).every(g => g <= 10), `${face} ${i}: no groove holds more than ten`);
  if (face !== 'small') { typeIn(st, 'cups', sum(r.nums.map(T))); typeIn(st, 'loose', sum(r.nums.map(O))); }
  typeIn(st, 'all', tot);
  const res = C.check(st);
  ok(res.result === 'ok' && st.done && st.covered === false && st.tray === sum(r.nums.map(O)) && st.cups === sum(r.nums.map(T)), `${face}/${cloth ? 'cloth' : 'bare'} ${i}: the oracle solves it, the cloth is off, everything sorted`);
  ok(C.check(st).result === 'no' && !C.tip(st, 0) && !C.type(st, '1'), `${face} ${i}: a finished round takes nothing`);
});
for (const cloth of [true, false]) wall.forEach((r, i) => {
  const st = C.newState('wall', i, cloth), br = C.bricksOf(r.base);
  ok(st.active === 3 && st.filled.join() === 'true,true,true,false,false,false' && !C.setFocus(st, 'all'), `wall ${i}: the first middle brick waits to be poured`);
  let order = [];
  for (let step = 0; step < 3; step++) {
    const at = st.active, sup = C.SUPPORTS[at];
    let r0 = C.check(st); ok(r0.result === 'note' && r0.key === 'hintPour' && st.misses === 0, `wall ${i} brick ${at}: Check before pouring → hintPour, no miss`);
    ok(C.pour(st) && !C.pour(st) && st.cups === T(br[sup[0]]) + T(br[sup[1]]) && st.sieve === O(br[sup[0]]) + O(br[sup[1]]) && st.focus === 'all', `wall ${i} brick ${at}: pouring puts both bricks on the sieve, once`);
    r0 = C.check(st); ok(r0.result === 'note' && r0.key === 'hintBrick', `wall ${i} brick ${at}: an empty brick → hintBrick`);
    if (!cloth) C.shake(st);
    typeIn(st, 'all', br[at]);
    const res = C.check(st); order.push(at);
    ok((at < 5 ? res.result === 'brick' && res.value === br[at] && st.filled[at] && st.active === at + 1 && st.cups === 0 && st.tray === 0 && st.win.all === '' : res.result === 'ok' && st.done), `wall ${i} brick ${at}: ${br[at]} is right`);
  }
  ok(order.join() === '3,4,5' && st.filled.every(Boolean), `wall ${i}: the wall fills bottom-up`);
});

/* ---------- 3. the hand, the verdicts, the hints ---------- */
{
  const st = C.newState('four', 0, false);
  let r = C.check(st); ok(r.result === 'note' && r.key === 'hintTip' && st.misses === 0, 'Check with a basket upright → hintTip, no miss');
  C.tip(st, 0); r = C.check(st); ok(r.result === 'note' && r.key === 'hintTip', 'one basket still upright → hintTip');
  C.tip(st, 1); r = C.check(st); ok(r.result === 'note' && r.key === 'hintFill' && st.focus === 'cups', 'empty windows → hintFill, the cups window opens');
  ok(st.focus === 'cups' && C.type(st, '3') && !C.type(st, '4') && st.win.cups === '3', 'the cups window takes one digit');
  typeIn(st, 'loose', '10'); typeIn(st, 'all', '40');
  r = C.check(st); ok(r.result === 'miss' && r.wrong === 'loose' && st.verdict.wrongs.join() === 'loose,all' && st.tray === 7 && st.misses === 1 && C.hint(st) === 'hintCount', '23 + 14 with 10 loose → the loose window is wrong (7 lie there), hintCount');
  ok(C.type(st, 'del') && st.verdict === null, 'a keystroke clears the marks');
  typeIn(st, 'loose', '7'); C.setFocus(st, 'loose'); C.type(st, 'del'); C.type(st, 'del'); C.type(st, '7');
  r = C.check(st); ok(r.result === 'miss' && r.wrong === 'all' && st.help && C.hint(st) === 'hintSplit', 'a second miss → hintSplit');
  const S = C.split(st); ok(S.tens.join() === '20,10' && S.tensSum === 30 && S.ones.join() === '3,4' && S.onesSum === 7, 'the split: 20 + 10 = 30, 3 + 4 = 7');
  C.setFocus(st, 'all'); C.type(st, 'del'); C.type(st, 'del'); typeIn(st, 'all', '37');
  r = C.check(st); ok(r.result === 'ok' && st.done && st.verdict === null, '37 → solved, the marks cleared');
}
{
  /* a full groove rolls into a cup; the windows read what lies there */
  const st = C.newState('four', 7, false); C.tip(st, 0); C.tip(st, 1); C.shake(st);
  ok(st.cups === 6 && st.tray === 12 && C.fullGrooves(st) === 1 && C.grooves(st).join() === '10,2,0,0', '44 + 28: 6 cups, 12 loose — one full groove and two');
  ok(C.grooveToCup(st) && st.cups === 7 && st.tray === 2 && st.rolled === 1 && !C.grooveToCup(st) && conserved(st), 'the full groove rolls into a cup; two loose acorns cannot');
  typeIn(st, 'cups', '7'); typeIn(st, 'loose', '2'); typeIn(st, 'all', '72');
  ok(C.check(st).result === 'ok', 'after rolling, 7 cups and 2 loose make 72');
  const s2 = C.newState('four', 7, false); C.tip(s2, 0); C.tip(s2, 1); C.shake(s2); typeIn(s2, 'cups', '6'); typeIn(s2, 'loose', '12'); typeIn(s2, 'all', '612'.slice(0, 2));
  ok(s2.win.all === '61' && C.check(s2).result === 'miss', 'the total window takes two digits: no 612');
  const s3 = C.newState('four', 7, true); C.tip(s3, 0); C.tip(s3, 1);
  ok(!C.grooveToCup(s3) && C.shake(s3) === 0, 'under the cloth nothing rolls and nothing shakes');
  { const s4 = C.newState('four', 7, true); C.tip(s4, 0); C.tip(s4, 1); s4.tray = 12; s4.sieve = 0; ok(!C.grooveToCup(s4) && s4.tray === 12, 'a full groove under the cloth does not roll'); }
  typeIn(s3, 'cups', '6'); typeIn(s3, 'loose', '12'); typeIn(s3, 'all', '72');
  const r3 = C.check(s3); ok(r3.result === 'ok' && r3.revealed && r3.shook === 12 && !s3.covered, 'Check lifts the cloth and shakes the sieve itself');
}
{
  const st = C.newState('small', 6, false);
  ok(C.shownWindows('small').join() === 'loose,all' && C.neededWindows('small').join() === 'all' && st.focus === 'all' && !C.setFocus(st, 'cups'), 'small: no cups window, only the total is needed');
  [0, 1, 2].forEach(i => C.tip(st, i)); let r = C.check(st); ok(r.result === 'note' && r.key === 'hintTotal', 'small: an empty total → hintTotal');
  C.shake(st); ok(st.cups === 0 && st.tray === 10 && C.fullGrooves(st) === 1, '3 + 4 + 3 fills exactly one groove');
  typeIn(st, 'loose', '9'); typeIn(st, 'all', '10'); r = C.check(st); ok(r.result === 'miss' && r.wrong === 'loose', 'small: a typed loose window is still checked');
}
/* the shortcut bots over the nine default rounds */
{
  const tot = MY_FOUR.map(x => x[2]);
  const digits = MY_FOUR.filter((x, i) => sum(x[0].map(n => T(n) + O(n))) === tot[i]).length;
  const tensOnly = MY_FOUR.filter((x, i) => sum(x[0].map(T)) * 10 === tot[i]).length;
  const firstTwo = MY_FOUR.filter((x, i) => x[0][0] + x[0][1] === tot[i]).length;
  const side = MY_FOUR.filter((x, i) => +('' + sum(x[0].map(T)) + sum(x[0].map(O))) === tot[i]).length;
  const sideOk = MY_FOUR.every((x, i) => (+('' + sum(x[0].map(T)) + sum(x[0].map(O))) === tot[i]) === (sum(x[0].map(O)) < 10));
  ok(digits === 0 && tensOnly === 0 && firstTwo === 3 && side === 4 && sideOk, `bots: digits ${digits}/9, tens only ${tensOnly}/9, first two ${firstTwo}/9, side by side ${side}/9 (only where the ones stay under ten)`);
  /* the core agrees: a bot's window is a miss */
  four.forEach((r, i) => { const st = C.newState('four', i, false); r.nums.forEach((n, j) => C.tip(st, j)); C.shake(st); typeIn(st, 'cups', sum(r.nums.map(T))); typeIn(st, 'loose', sum(r.nums.map(O))); typeIn(st, 'all', String(sum(r.nums.map(n => T(n) + O(n)))).slice(0, 2)); ok(C.check(st).result === 'miss', `four ${i}: the digits-as-ones total is a miss`); });
}
/* the plan */
for (const face of ['four', 'few', 'small', 'wall']) {
  let prev = null; const R = C.rounds(face), n = R.length;
  for (let t = 0; t < 40; t++) {
    const p = C.plan(face, rnd, prev);
    ok(p.order.slice().sort((a, b) => a - b).join() === R.map(r => r.k).join() && (!prev || p.order.join() !== prev.join()), `plan ${face}: every round once, never the previous order`);
    if (face === 'four') ok(p.order.map(k => R[k].band).join() === R.map(r => r.band).sort().join(), 'plan four: the bands stay in order');
    prev = p.order;
  }
}
ok(C.faceOf('wall') === 'wall' && C.faceOf(undefined) === 'four' && C.faceOf('x') === 'four', 'the setting picks the face');
ok(C.band(560).wide && !C.band(559).wide && C.band(309).cramp && !C.band(310).cramp, 'the width bands');

/* ---------- 4. picture + strings ---------- */
const BW = /(^|\/)[^/]*\b(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?\//i;
ok(fs.existsSync(path.join(REPO, 'image-library-webp', 'themes', C.TALLY + '@2x.webp')) && !BW.test(C.TALLY + '/') && /squirrel$/.test(C.TALLY), `picture ${C.TALLY}: on disk, in colour`);
const S = ACT.strings, src = fs.readFileSync(ACTF, 'utf8').replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*\/\*STRINGS-END\*\//, '') + fs.readFileSync(CORE, 'utf8');
const KEYS = Object.keys(S); ok(KEYS.length >= 38, `strings: the set is there (${KEYS.length})`);
const NODIGIT = ['instruction', 'pFour', 'pSmall', 'pWall', 'hintTip', 'hintPour', 'hintFill', 'hintTotal', 'hintBrick', 'hintCount', 'hintSplit', 'okFour', 'okSmall', 'okBrick', 'okWall', 'aShook', 'aShookLoose'];
const NEED = { okFour: ['list', 'total', 't', 'o'], okSmall: ['list', 'total'], okBrick: ['a', 'b', 'c'], okWall: ['top'], aBrick: ['n'], aTub: ['n'], aTubDone: ['n'], aShook: ['c', 'l'], aShookLoose: ['l'] };
const COUNT = { okFour: { list: 1, total: 2, t: 1, o: 1 }, okSmall: { list: 1, total: 1 }, okBrick: { a: 1, b: 1, c: 1 } };
const FREE = /(?<!\p{L})(free|kostenlos\w*|gratis|gratuit\w*|grátis|ilmai\w*|maksuton\w*|kostnadsfri\w*|vederlagsfri\w*|gratuito|gratuita)(?!\p{L})/iu;
for (const k of KEYS) for (const l of LOCS) {
  const v = S[k][l]; ok(typeof v === 'string' && v.length > 0, `strings.${k}.${l} present`); if (typeof v !== 'string') continue;
  ok(!FREE.test(v), `strings.${k}.${l} never says free`);
  if (NODIGIT.indexOf(k) >= 0) ok(!/\d/.test(v.replace(/\{\w+\}/g, '')), `strings.${k}.${l}: no digit`);
  if (NEED[k]) ok(NEED[k].every(x => v.indexOf('{' + x + '}') >= 0), `strings.${k}.${l}: carries ${NEED[k].join(', ')}`);
  if (COUNT[k]) ok(Object.keys(COUNT[k]).every(x => v.split('{' + x + '}').length - 1 === COUNT[k][x]), `strings.${k}.${l}: says ${JSON.stringify(COUNT[k])}`);
  ok(!/\{(?!(list|total|t|o|a|b|c|top|n|l|msg)\})/.test(v), `strings.${k}.${l}: no unknown placeholder`);
  if (l === 'fr' || l === 'it') ok(v.indexOf("'") < 0, `strings.${k}.${l}: typographic apostrophe`);
  if (l === 'fr') ok(!/ [:!?;»]/.test(v) && !/« /.test(v), `strings.${k}.fr: a narrow space before : ! ? ; and inside « »`);
  if (l === 'es' && /[!?]/.test(v)) ok(/[¡¿]/.test(v), `strings.${k}.es: opens its ¡ ¿`);
}
for (const l of LOCS) ok(S.title[l].indexOf(l === 'sv' ? 'Kurre' : 'Tally') >= 0 && S.title[l].indexOf(l === 'sv' ? 'Tally' : 'Kurre') < 0, `${l}: the squirrel's name in the title`);
/* the success lines, built by the activity, say the round */
for (const l of LOCS) {
  ACT.api = { t: k => S[k][l] }; ACT._view = {};
  const st = C.newState('four', 6, false); ACT.st = st; const line = ACT._okLine();
  const want = S.okFour[l].replace('{list}', '15 + 22 + 34 + 11').replace(/{total}/g, '82').replace('{t}', '7').replace('{o}', '12');
  ok(line === want, `${l}: «${line}» is «${want}»`);
  ACT.st = C.newState('small', 6, false); const ls = ACT._okLine(); ok(ls.indexOf('3 + 4 + 3') >= 0 && ls.indexOf('10') >= 0, `${l}: «${ls}»`);
  ACT.st = C.newState('wall', 0, false); const lw = ACT._okLine(); ok(lw.indexOf('63') >= 0, `${l}: «${lw}»`);
}
ACT.api = null; ACT.st = null;
const BYSHELL = ['title', 'instruction', 'instrBubble', 'okBubble'], BYSETTING = ['setBaskets', 'bSmall', 'bFew', 'bFour', 'bWall', 'setCloth', 'cOn', 'cOff'];
for (const k of KEYS) ok(BYSHELL.concat(BYSETTING).indexOf(k) >= 0 || new RegExp("'" + k + "'").test(src), `strings.${k} is reached`);
ok(!/role', 'img'|role="img"/.test(src), 'no role="img" anywhere');

/* ---------- 5. prose + manifest ---------- */
for (const l of LOCS) {
  const j = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'messages', 'activity-content', l + '.json'), 'utf8')), p = j.prose[ID];
  ok(p && p.about && p.about.length === 3 && p.practices.length === 4 && p.howToPlay.length === 3 && p.learningGoals.length === 3, `prose.${l}: the whole entry`);
  if (!p) continue;
  const all = [].concat(p.about, p.practices, p.howToPlay, p.learningGoals).join(' ');
  ok(!FREE.test(all), `prose.${l}: never says free`);
  ok(l === 'en' ? /Common Core/.test(all) : !/Common Core|2\.NBT/.test(all), `prose.${l}: the framework name`);
  ok(['15 + 22 + 34 + 11', '82', '70', '12', '23 + 14', ' 7', '3 + 4 + 3 = 10', '12, 15, 21 → 27, 36 → 63'].every(x => all.indexOf(x) >= 0), `prose.${l}: quotes what the activity shows`);
  ok(all.indexOf(l === 'sv' ? 'Kurre' : 'Tally') >= 0, `prose.${l}: names the squirrel`);
  if (l === 'fr' || l === 'it') ok(all.indexOf("'") < 0, `prose.${l}: typographic apostrophes`);
}
const rows = JSON.parse(fs.readFileSync(MAN, 'utf8')), row = rows.find(x => x.id === ID);
ok(rows.length === headRows.length && row && row.tool === 'acorn-sieve-activity', 'manifest: the row, tool acorn-sieve-activity');
ok(row && row.params.baskets.join() === 'small,few,four,wall' && row.params.cloth.join() === 'on,off' && row.params.rounds.small === 7 && row.params.rounds.few === 8 && row.params.rounds.four === 9 && row.params.rounds.wall === 8, 'manifest: params match the core');
['id', 'alignment', 'task_template', 'kid_prompt_template', 'theme'].forEach(k => ok(JSON.stringify(row[k]) === JSON.stringify(head[k]), `manifest: ${k} frozen`));
['slug', 'page_title', 'page_intro'].forEach(k => Object.keys(head[k]).forEach(l => ok(row[k][l] === head[k][l], `manifest: ${k}.${l} frozen`)));
['da', 'no', 'fi'].forEach(l => ok(!head.slug[l] && /^[a-z0-9-]+$/.test(row.slug[l] || '') && row.page_title[l] && row.page_intro[l] && !FREE.test(row.page_title[l] + row.page_intro[l]) && !/Common Core|2\.NBT/.test(row.page_title[l] + row.page_intro[l]), `manifest: ${l} gets a new slug, title and intro`));
ok(LOCS.every(l => row.slug[l]), 'manifest: the row ships in all 11 locales');

console.log(`\nverify-acorn-sieve-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
