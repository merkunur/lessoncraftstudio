#!/usr/bin/env node
/* =====================================================================
   verify-takeaway-scoop-core.js — the build gate for ACTIVITY #147, The
   Take-Away Scoop ("Tuck Breaks a Ten", 2.NBT.B.7), all 11 locales.
   ---------------------------------------------------------------------
   It does NOT trust the core. Its own ground truth:
     · its own copy of the design's three tables, re-solved by column
       subtraction: ones only (337 443 206 127 406 118 343 238 — one rod
       snap each, two leave 0 tens), nothing to snap (35 32 34 33 43 41 24
       42 — no column borrows), tens and ones (25 45 27 217 425 317 35 281
       — one snap each, 627 − 346 the one flat); answers distinct;
     · the old activity's rounds (read from git) are the default table;
     · the scoop: it cannot lift at the start of any snap round and can
       after exactly the snap the column arithmetic names; it lifts at once
       in the warm-up; a refused lift moves nothing; a lift takes exactly
       its number; one lift per round; pour puts it back;
     · snapping only downhill, never while the next shelf holds ten;
     · an exhaustive search over every 6-move sequence from every round:
       no lift with an empty cup, no shelf negative or over nineteen, the
       mat plus the scoop always equals the top number;
     · a scripted player for EVERY round of every face;
     · the shortcut bots of §6 (smaller from bigger 0/16, snap but forget
       the rod is gone 0/8, copy the top number 0/24) — and the core marks
       each a miss;
     · the written marks: its own strike-and-rewrite chains;
     · every verdict and its literal hint key, typing, the plan;
     · the picture on disk (colour), strings ×11 (never "free", no digit
       in a hint, every placeholder, every key reached), prose ×11 and
       the manifest.
   Usage: node scripts/verify-takeaway-scoop-core.js   (TK_CORE / TK_ACT / TK_MANIFEST override the files)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), { execSync } = require('child_process'), vm = require('vm');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const CORE = process.env.TK_CORE || path.join(MINI, 'takeaway-scoop-core.js');
const ACTF = process.env.TK_ACT || path.join(MINI, 'takeaway-scoop-activity.js');
const MAN = process.env.TK_MANIFEST || path.join(MINI, 'place-value-regroup-activities.json');
const ID = 'place-value-regroup.subtract-decompose.2-nbt-b-7', BEFORE = 'ce9f35dc';
const C = require(CORE);
const ACT = (() => { const ctx = { window: {}, TakeawayScoopCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(ACTF, 'utf8') + '\n;this.__A = window.TakeawayScoopActivity;', ctx); return ctx.__A; })();
const LOCS = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
let PASS = 0, FAIL = 0;
const ok = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL <= 80) console.error('  FAIL: ' + m); } };
let rng = 13; const rnd = () => { rng = (rng * 1103515245 + 12345) % 2147483648; return rng / 2147483648; };
const H = (n) => Math.floor(n / 100) % 10, T = (n) => Math.floor(n / 10) % 10, O = (n) => n % 10;
const headRows = JSON.parse(execSync(`git show ${BEFORE}:"mini tools/place-value-regroup-activities.json"`, { cwd: REPO, encoding: 'utf8', maxBuffer: 1e8 })), head = headRows.find(x => x.id === ID);
const typeIn = (st, s) => { while (st.typed) C.type(st, 'del'); String(s).split('').forEach(d => C.type(st, d)); };

/* ---------- 1. my own tables, re-solved by column subtraction ---------- */
const MY = {
  ones: [[342, 5, 337], [451, 8, 443], [213, 7, 206], [132, 5, 127], [415, 9, 406], [124, 6, 118], [351, 8, 343], [243, 5, 238]],
  none: [[58, 23, 35], [47, 15, 32], [86, 52, 34], [79, 46, 33], [64, 21, 43], [95, 54, 41], [38, 14, 24], [77, 35, 42]],
  tens: [[52, 27, 25], [84, 39, 45], [71, 44, 27], [345, 128, 217], [462, 37, 425], [536, 219, 317], [93, 58, 35], [627, 346, 281]]
};
/* my column subtraction: which snaps the written method makes */
function colSub(a, b) {
  let h = H(a), t = T(a), o = O(a), rods = 0, flats = 0;
  if (o < O(b)) { t--; o += 10; rods++; }
  if (t < T(b)) { h--; t += 10; flats++; }
  return { val: (h - H(b)) * 100 + (t - T(b)) * 10 + (o - O(b)), rods, flats, top: { H: h, T: t, O: o } };
}
for (const face of ['ones', 'none', 'tens']) {
  const R = C.rounds(face);
  ok(R.length === 8, `${face}: eight rounds`);
  R.forEach((r, i) => {
    const [a, b, ans] = MY[face][i], cs = colSub(a, b);
    ok(r.a === a && r.b === b && a - b === ans && cs.val === ans, `${face} ${i}: ${a} − ${b} = ${ans} (column subtraction ${cs.val})`);
    if (face === 'none') ok(cs.rods + cs.flats === 0, `none ${i}: no column borrows`);
    else ok(cs.rods + cs.flats === 1, `${face} ${i}: exactly one snap (${cs.rods} rod, ${cs.flats} flat)`);
    if (face === 'ones') ok(b < 10 && cs.rods === 1, `ones ${i}: a few ones, one rod snapped`);
  });
  ok(new Set(MY[face].map(x => x[2])).size === 8, `${face}: every answer different`);
}
ok(colSub(627, 346).flats === 1 && MY.tens.filter(x => colSub(x[0], x[1]).flats).length === 1, 'tens: 627 − 346 is the one flat snap');
ok(MY.ones.filter(x => T(x[2]) === 0).length === 2, 'ones: two rounds leave 0 tens (206, 406)');
ok(head && head.params.rounds.map(r => r.a + '-' + r.b).join() === C.rounds('ones').map(r => r.a + '-' + r.b).join(), `the old activity's eight rounds (git ${BEFORE}) are the default table`);

/* ---------- 2. the scoop and the snaps ---------- */
for (const face of ['ones', 'none', 'tens']) C.rounds(face).forEach((r, k) => {
  const cs = colSub(r.a, r.b), st = C.newState(face, k);
  ok(C.canLift(st) === (face === 'none'), `${face} ${k}: the scoop ${face === 'none' ? 'lifts at once' : 'cannot lift before a snap'}`);
  if (face !== 'none') {
    const before = JSON.stringify(st.mat), res = C.lift(st);
    ok(res.result === 'short' && JSON.stringify(st.mat) === before && !st.scoop.used, `${face} ${k}: a refused lift moves nothing`);
    const empty = res.empty, expectO = Math.max(0, O(r.b) - O(r.a)), expectT = Math.max(0, T(r.b) - T(r.a));
    ok(empty.O === expectO && (cs.flats ? empty.T === expectT : true), `${face} ${k}: the empty cups are the ones the mat cannot fill`);
  }
  if (cs.rods) ok(C.snap(st, 'T').result === 'snap', `${face} ${k}: a rod snaps`);
  if (cs.flats) ok(C.snap(st, 'H').result === 'snap', `${face} ${k}: a flat snaps`);
  ok(C.canLift(st), `${face} ${k}: after the method's snap the scoop can lift`);
  ok(JSON.stringify(st.mat) === JSON.stringify(cs.top), `${face} ${k}: the mat now reads the regrouped top number`);
  const v0 = C.value(st);
  ok(C.lift(st).result === 'lift' && C.value(st) === v0 - r.b && st.scoop.used, `${face} ${k}: the lift takes exactly ${r.b}`);
  ok(C.lift(st).result === 'no', `${face} ${k}: one scoop per round`);
  ok(C.pour(st) && C.value(st) === v0 && !st.scoop.used, `${face} ${k}: the bowl pours it back`);
});
{
  const st = C.newState('ones', 0);
  ok(C.snap(st, 'O').result === 'no', 'cubes cannot be snapped');
  ok(C.snap(st, 'T').result === 'snap' && st.mat.T === 3 && st.mat.O === 12, 'a rod snaps into ten cubes: 4 rods, 2 cubes → 3, 12');
  ok(C.snap(st, 'T').result === 'enough' && st.mat.T === 3, 'a second rod stays whole while ten or more cubes lie loose');
  ok(C.rebuild(st, 'O') && st.mat.T === 4 && st.mat.O === 2 && st.snaps.T === 0, 'ten cubes click back into a rod');
  ok(!C.rebuild(st, 'O'), 'two cubes do not click into anything');
  const s2 = C.newState('none', 0); ok(C.snap(s2, 'H').result === 'empty', 'no flat to snap on a two-digit mat');
}
/* exhaustive: every 6-move sequence from every round's start */
const MOVES = ['snapH', 'snapT', 'rebT', 'rebO', 'lift', 'pour'];
const doMove = (st, m) => m === 'snapH' ? C.snap(st, 'H') : m === 'snapT' ? C.snap(st, 'T') : m === 'rebT' ? C.rebuild(st, 'T') : m === 'rebO' ? C.rebuild(st, 'O') : m === 'lift' ? C.lift(st) : C.pour(st);
let seqs = 0, bad = 0;
for (const face of ['ones', 'none', 'tens']) C.rounds(face).forEach((r, k) => {
  const walk = (st, depth) => {
    if (depth === 6) return;
    for (const m of MOVES) {
      const s2 = JSON.parse(JSON.stringify(st)), canBefore = C.canLift(s2); const res = doMove(s2, m); seqs++;
      if (m === 'lift' && res.result === 'lift' && !canBefore) bad++;
      if (['H', 'T', 'O'].some(c => s2.mat[c] < 0 || s2.mat[c] > C.SHELF_MAX)) bad++;
      if (C.value(s2) + C.scoopValue(s2) !== r.a) bad++;
      walk(s2, depth + 1);
    }
  };
  walk(C.newState(face, k), 0);
});
ok(seqs > 100000 && bad === 0, `exhaustive 6-move search: ${seqs} moves, ${bad} lifted with an empty cup, broke a shelf or lost value`);

/* ---------- 3. a scripted player for every round, and every verdict ---------- */
for (const face of ['ones', 'none', 'tens']) C.rounds(face).forEach((r, k) => {
  const st = C.newState(face, k), cs = colSub(r.a, r.b);
  typeIn(st, r.a - r.b);
  ok(C.check(st).key === 'hintScoop' && st.misses === 0, `${face} ${k}: Check with the scoop still parked → hintScoop, no miss`);
  if (cs.rods) C.snap(st, 'T'); if (cs.flats) C.snap(st, 'H'); C.lift(st);
  ok(JSON.stringify(C.marks(st)) === JSON.stringify(C.truthMarks(r.a, r.b)), `${face} ${k}: the child's marks are the written method's marks`);
  const res = C.check(st);
  ok(res.result === 'ok' && st.done && C.answer(st) === r.a - r.b, `${face} ${k}: ${r.a - r.b} → solved`);
});
{
  const st = C.newState('ones', 0); C.snap(st, 'T'); C.lift(st);
  ok(C.check(st).key === 'hintType', 'nothing typed → hintType');
  typeIn(st, '327'); let r = C.check(st);
  ok(r.result === 'miss' && r.wrongs.join() === 'T' && C.hint(st) === 'hintCount' && !st.help, '327 → the tens box wrong, hintCount');
  typeIn(st, '338'); r = C.check(st);
  ok(r.result === 'miss' && r.wrongs.join() === 'O' && st.help && C.hint(st) === 'hintCountOn', '338 → miss 2: hintCountOn');
  C.type(st, 'del'); ok(st.verdict === null && C.hint(st) === null, 'a keystroke takes the help away');
  typeIn(st, '37'); r = C.check(st); ok(r.result === 'miss' && r.wrongs.join() === 'H', '37 for 337 → only the hundreds box is off (right-aligned)');
  typeIn(st, '337'); ok(C.check(st).result === 'ok', '337 → solved');
  ok(C.check(st).result === 'no' && !C.type(st, '1') && C.snap(st, 'T').result === 'no', 'a solved round takes nothing more');
  /* the marks follow the snap */
  const s3 = C.newState('ones', 0);
  ok(JSON.stringify(C.marks(s3)) === JSON.stringify({ H: [3], T: [4], O: [2] }), 'no marks before a snap');
  C.snap(s3, 'T'); ok(JSON.stringify(C.marks(s3)) === JSON.stringify({ H: [3], T: [4, 3], O: [2, 12] }), 'a rod snapped: 4→3 and 12 over the ones');
  C.lift(s3); ok(JSON.stringify(C.marks(s3)) === JSON.stringify({ H: [3], T: [4, 3], O: [2, 12] }), 'the lift does not change the marks');
  C.pour(s3); C.rebuild(s3, 'O'); ok(JSON.stringify(C.marks(s3)) === JSON.stringify({ H: [3], T: [4], O: [2] }), 'clicked back: the marks go away again');
  /* a right answer on an untidy mat is accepted, the mat tidied */
  const s4 = C.newState('none', 0); C.snap(s4, 'T'); C.lift(s4); typeIn(s4, '35'); r = C.check(s4);
  ok(r.result === 'ok' && r.tidied === 1 && s4.mat.T === 3 && s4.mat.O === 5 && s4.snaps.T === 0, '58 − 23 with a needless snap: 35 accepted, ten cubes click back into a rod');
  ok(!C.type(C.newState('ones', 0), '0') && (() => { const s = C.newState('ones', 0); ['1', '2', '3', '4'].forEach(d => C.type(s, d)); return s.typed === '123'; })(), 'typing: no leading 0, three digits at most');
  ok(C.boxDigit('97', 'O') === '7' && C.boxDigit('97', 'T') === '9' && C.boxDigit('97', 'H') === '', 'digits are right-aligned under the shelves');
}
/* ---------- 4. the shortcut bots, from the round data ---------- */
{
  const smaller = (a, b) => Math.abs(H(a) - H(b)) * 100 + Math.abs(T(a) - T(b)) * 10 + Math.abs(O(a) - O(b));
  const forgotRod = (a, b) => H(a) * 100 + T(a) * 10 + (O(a) + 10 - O(b)) - (H(b) * 100 + T(b) * 10); /* the ten became ones but the tens stay */
  const all = MY.ones.concat(MY.tens), snapRounds = MY.ones;
  const n1 = all.filter(x => smaller(x[0], x[1]) === x[2]).length, n2 = snapRounds.filter(x => forgotRod(x[0], x[1]) === x[2]).length, n3 = MY.ones.concat(MY.none, MY.tens).filter(x => x[0] === x[2]).length;
  ok(n1 === 0 && n2 === 0 && n3 === 0, `bots: smaller from bigger ${n1}/16, snap but forget the rod is gone ${n2}/8, copy the top number ${n3}/24`);
  ok(smaller(342, 5) === 343 && forgotRod(342, 5) === 347 && smaller(52, 27) === 35, 'bots on the first rounds: 343, 347, 35');
  for (const face of ['ones', 'tens']) C.rounds(face).forEach((r, k) => {
    for (const bot of [smaller].concat(face === 'ones' ? [forgotRod] : [])) {
      const st = C.newState(face, k), cs = colSub(r.a, r.b); if (cs.rods) C.snap(st, 'T'); if (cs.flats) C.snap(st, 'H'); C.lift(st); typeIn(st, bot(r.a, r.b));
      ok(C.check(st).result === 'miss', `${face} ${k}: the bot's ${bot(r.a, r.b)} is a miss`);
    }
  });
}
/* the plan */
for (const face of ['ones', 'none', 'tens']) {
  let prev = null; const R = C.rounds(face);
  for (let t = 0; t < 60; t++) {
    const p = C.plan(face, rnd, prev);
    ok(p.order.slice().sort((a, b) => a - b).join() === R.map(r => r.k).join() && (!prev || p.order.join() !== prev.join()), `plan ${face}: every round once, never the previous order`);
    if (face === 'ones') ok(!(C.zeroTens(face, p.order[0]) && C.zeroTens(face, p.order[1])), 'plan ones: the two 0-tens rounds never open together');
    prev = p.order;
  }
}
ok(C.faceOf('none') === 'none' && C.faceOf('tens') === 'tens' && C.faceOf(undefined) === 'ones' && C.faceOf('x') === 'ones', 'the setting picks the face');
ok(C.band(560).wide && !C.band(559).wide && C.band(309).cramp && !C.band(310).cramp, 'the width bands');

/* ---------- 5. picture + strings ---------- */
const BW = /(^|\/)[^/]*\b(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?\//i;
ok(fs.existsSync(path.join(REPO, 'image-library-webp', 'themes', C.TUCK + '@2x.webp')) && !BW.test(C.TUCK + '/') && /hamster$/.test(C.TUCK), `picture ${C.TUCK}: on disk, in colour`);
const S = ACT.strings, src = fs.readFileSync(ACTF, 'utf8').replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*\/\*STRINGS-END\*\//, '') + fs.readFileSync(CORE, 'utf8');
const KEYS = Object.keys(S); ok(KEYS.length >= 36, `strings: the set is there (${KEYS.length})`);
const NODIGIT = ['instruction', 'hintScoop', 'hintType', 'hintCount', 'hintCountOn', 'hintShort', 'hintEnough', 'okTen', 'okHundred', 'okNone', 'aPackT', 'aPackO', 'aBowl'];
const NEED = { okTen: ['a', 'b', 'c'], okHundred: ['a', 'b', 'c'], okNone: ['a', 'b', 'c'], aShelfH: ['n'], aShelfT: ['n'], aShelfO: ['n'], aScoop: ['b', 'full', 'empty'], aScoopUsed: ['b'], aLift: ['b'], aState: ['h', 't', 'o'], aTyped: ['v'] };
const FREE = /(?<!\p{L})(free|kostenlos\w*|gratis|gratuit\w*|grátis|ilmai\w*|maksuton\w*|kostnadsfri\w*|vederlagsfri\w*|gratuito|gratuita)(?!\p{L})/iu;
for (const k of KEYS) for (const l of LOCS) {
  const v = S[k][l]; ok(typeof v === 'string' && v.length > 0, `strings.${k}.${l} present`); if (typeof v !== 'string') continue;
  ok(!FREE.test(v), `strings.${k}.${l} never says free`);
  if (NODIGIT.indexOf(k) >= 0) ok(!/\d/.test(v.replace(/\{\w+\}/g, '')), `strings.${k}.${l}: no digit`);
  if (NEED[k]) ok(NEED[k].every(x => v.split('{' + x + '}').length - 1 === 1), `strings.${k}.${l}: carries ${NEED[k].join(', ')} once each`);
  ok(!/\{(?!(a|b|c|h|t|o|n|full|empty|v|msg)\})/.test(v), `strings.${k}.${l}: no unknown placeholder`);
  if (l === 'fr' || l === 'it') ok(v.indexOf("'") < 0, `strings.${k}.${l}: typographic apostrophe`);
  if (l === 'fr') ok(!/ [:!?;»]/.test(v) && !/« /.test(v), `strings.${k}.fr: a narrow space before : ! ? ; and inside « »`);
  if (l === 'es' && /[!?]/.test(v)) ok(/[¡¿]/.test(v), `strings.${k}.es: opens its ¡ ¿`);
  if (l === 'de') ok(!/borg/i.test(v) && !/ergänz/i.test(v), `strings.${k}.de: never borgen or Ergänzen`);
}
for (const l of LOCS) ok(S.title[l].indexOf('Tuck') >= 0, `${l}: Tuck in the title`);
for (const l of LOCS) {
  ACT.api = { t: k => S[k][l] }; ACT._view = {};
  const want = (k, a, b, c) => S[k][l].replace('{a}', a).replace('{b}', b).replace('{c}', c);
  let st = C.newState('ones', 0); C.snap(st, 'T'); ACT.st = st; ok(ACT._okLine() === want('okTen', 342, 5, 337), `${l}: «${ACT._okLine()}»`);
  st = C.newState('tens', 7); C.snap(st, 'H'); ACT.st = st; ok(ACT._okLine() === want('okHundred', 627, 346, 281), `${l}: «${ACT._okLine()}»`);
  ACT.st = C.newState('none', 0); ok(ACT._okLine() === want('okNone', 58, 23, 35), `${l}: «${ACT._okLine()}»`);
  ok(ACT._taskLine() === '58 − 23 = ?', `${l}: the task line uses U+2212`);
}
ACT.api = null; ACT.st = null;
const BYSHELL = ['title', 'instruction', 'instrBubble', 'okBubble'], BYSETTING = ['setTake', 'tNone', 'tOnes', 'tTens', 'setWritten', 'wHidden', 'wShown'];
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
  ok(['342 − 5', '337', '343', '58 − 23 = 35', '627 − 346 = 281'].every(x => all.indexOf(x) >= 0), `prose.${l}: quotes what the activity shows`);
  ok(all.indexOf('Tuck') >= 0, `prose.${l}: names Tuck`);
  ok(!/Break a ten/.test(all), `prose.${l}: no word of the old automatic button`);
  if (l === 'fr' || l === 'it') ok(all.indexOf("'") < 0, `prose.${l}: typographic apostrophes`);
  if (l === 'de') ok(!/borg/i.test(all), 'prose.de: never borgen');
}
const rows = JSON.parse(fs.readFileSync(MAN, 'utf8')), row = rows.find(x => x.id === ID);
ok(rows.length === headRows.length && row && row.tool === 'takeaway-scoop-activity', 'manifest: the row, tool takeaway-scoop-activity');
ok(row && row.params.take.join() === 'none,ones,tens' && row.params.written.join() === 'hidden,shown' && ['none', 'ones', 'tens'].every(f => row.params.rounds[f].map(r => r.a + '-' + r.b).join() === C.rounds(f).map(r => r.a + '-' + r.b).join()), 'manifest: params match the core');
['id', 'alignment', 'task_template', 'kid_prompt_template', 'theme'].forEach(k => ok(JSON.stringify(row[k]) === JSON.stringify(head[k]), `manifest: ${k} frozen`));
['slug', 'page_title', 'page_intro'].forEach(k => Object.keys(head[k]).forEach(l => ok(row[k][l] === head[k][l], `manifest: ${k}.${l} frozen`)));
['da', 'no', 'fi'].forEach(l => ok(!head.slug[l] && /^[a-z0-9-]+$/.test(row.slug[l] || '') && row.page_title[l] && row.page_intro[l] && !FREE.test(row.page_title[l] + row.page_intro[l]) && !/Common Core|2\.NBT/.test(row.page_title[l] + row.page_intro[l]), `manifest: ${l} gets a new slug, title and intro`));
ok(LOCS.every(l => row.slug[l]), 'manifest: the row ships in all 11 locales');
rows.filter(x => x.id !== ID).forEach(x => { const h = headRows.find(y => y.id === x.id); ok(h && JSON.stringify(h) === JSON.stringify(x), `manifest: ${x.id} untouched`); });

console.log(`\nverify-takeaway-scoop-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
