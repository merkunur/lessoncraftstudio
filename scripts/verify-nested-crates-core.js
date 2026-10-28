#!/usr/bin/env node
/* =====================================================================
   verify-nested-crates-core.js — the build gate for ACTIVITY #146, The
   Nested Crates ("Tuck Breaks a Hundred", 2.NBT.B.7), all 11 locales.
   ---------------------------------------------------------------------
   It does NOT trust the core. Its own ground truth:
     · its own copy of the design's tables, re-solved by column
       subtraction: the old eight (297 395 195 393 294 194 295 196) and
       the three-digit table (264 256 342 337 375 126 537 325); every
       round borrows in the ones AND across a zero ten; answers distinct;
     · the old activity's rounds (read from git) are the default table;
     · the nesting: a crate opens into ten BOXES, never cubes; a crate
       opens only while no loose box lies on the tens shelf; a box only
       while fewer than ten cubes lie loose; an exhaustive search over
       every 6-move sequence from every round's start never puts a cube
       on the ones shelf by opening a crate, never makes a shelf negative
       or overfull, and always conserves shelves + slip = the top number;
     · a scripted player for EVERY round of both faces: open a crate,
       open a box, fill the slip, type what is left → solved, with
       exactly one crate and one box opened;
     · the shortcut bots of §6, measured from the round data: smaller
       digit from the bigger 0/16, tens stay 0 0/8, the 0 becomes 10 but
       never 9 0/16 — and the core marks each of them a miss;
     · the written marks: its own strike-and-rewrite chains;
     · every verdict and its literal hint key, typing, the plan;
     · the picture on disk (colour), strings ×11 (never "free", no digit
       in a hint, every placeholder, every key reached), prose ×11 and
       the manifest.
   Usage: node scripts/verify-nested-crates-core.js   (NC_CORE / NC_ACT / NC_MANIFEST override the files)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), { execSync } = require('child_process'), vm = require('vm');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const CORE = process.env.NC_CORE || path.join(MINI, 'nested-crates-core.js');
const ACTF = process.env.NC_ACT || path.join(MINI, 'nested-crates-activity.js');
const MAN = process.env.NC_MANIFEST || path.join(MINI, 'place-value-regroup-activities.json');
const ID = 'place-value-regroup.subtract-decompose-hundred.2-nbt-b-7', BEFORE = '67eebf51';
const C = require(CORE);
const ACT = (() => { const ctx = { window: {}, NestedCratesCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(ACTF, 'utf8') + '\n;this.__A = window.NestedCratesActivity;', ctx); return ctx.__A; })();
const LOCS = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
let PASS = 0, FAIL = 0;
const ok = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL <= 80) console.error('  FAIL: ' + m); } };
let rng = 11; const rnd = () => { rng = (rng * 1103515245 + 12345) % 2147483648; return rng / 2147483648; };
const H = (n) => Math.floor(n / 100) % 10, T = (n) => Math.floor(n / 10) % 10, O = (n) => n % 10;
const headRows = JSON.parse(execSync(`git show ${BEFORE}:"mini tools/place-value-regroup-activities.json"`, { cwd: REPO, encoding: 'utf8', maxBuffer: 1e8 })), head = headRows.find(x => x.id === ID);
const typeIn = (st, s) => { while (st.typed) C.type(st, 'del'); String(s).split('').forEach(d => C.type(st, d)); };

/* ---------- 1. my own tables, re-solved by column subtraction ---------- */
const MY = {
  ones: [[302, 5, 297], [403, 8, 395], [201, 6, 195], [402, 9, 393], [303, 9, 294], [202, 8, 194], [301, 6, 295], [203, 7, 196]],
  big: [[400, 136, 264], [503, 247, 256], [600, 258, 342], [702, 365, 337], [801, 426, 375], [300, 174, 126], [905, 368, 537], [604, 279, 325]]
};
/* my column subtraction: borrow from the left, across a zero when the tens are empty */
function colSub(a, b) {
  let h = H(a), t = T(a), o = O(a), crates = 0, boxes = 0;
  if (o < O(b)) { if (t === 0) { h--; t += 10; crates++; } t--; o += 10; boxes++; }
  if (t < T(b)) { h--; t += 10; crates++; }
  return { val: (h - H(b)) * 100 + (t - T(b)) * 10 + (o - O(b)), crates, boxes, top: { H: h, T: t, O: o } };
}
for (const face of ['ones', 'big']) {
  const R = C.rounds(face);
  ok(R.length === 8, `${face}: eight rounds`);
  R.forEach((r, i) => {
    const [a, b, ans] = MY[face][i], cs = colSub(a, b);
    ok(r.a === a && r.b === b && a - b === ans && cs.val === ans, `${face} ${i}: ${a} − ${b} = ${ans} (column subtraction ${cs.val})`);
    ok(T(a) === 0 && O(a) < O(b), `${face} ${i}: the tens are empty and the ones too few — across a zero`);
    ok(cs.crates === 1 && cs.boxes === 1, `${face} ${i}: one crate and one box must open`);
    ok(face === 'ones' ? b < 10 : b >= 100, `${face} ${i}: the slip is ${face === 'ones' ? 'a few ones' : 'a three-digit number'}`);
  });
  ok(new Set(MY[face].map(x => x[2])).size === 8, `${face}: every answer different`);
}
ok(head && head.params.rounds.map(r => r.a + '-' + r.b).join() === C.rounds('ones').map(r => r.a + '-' + r.b).join(), `the old activity's eight rounds (git ${BEFORE}) are the default table`);

/* ---------- 2. the nesting ---------- */
{
  const st = C.newState('ones', 0);
  ok(C.openBox(st).result === 'empty' && st.shelves.O === 2, 'no box on the shelf: nothing to open, the ones untouched');
  const r = C.openCrate(st);
  ok(r.result === 'open' && st.shelves.H === 2 && st.shelves.T === 10 && st.shelves.O === 2, 'a crate opens into ten BOXES — the ones shelf gets nothing');
  ok(C.openCrate(st).result === 'full' && st.shelves.H === 2, 'a second crate stays shut while boxes lie loose');
  ok(C.openBox(st).result === 'open' && st.shelves.T === 9 && st.shelves.O === 12, 'a box opens into ten cubes');
  ok(C.openBox(st).result === 'full' && st.shelves.T === 9, 'another box stays shut while ten or more cubes lie loose');
  ok(C.pack(st, 'O') && st.shelves.T === 10 && st.shelves.O === 2 && st.opened.T === 0, 'ten cubes pack back into a box');
  ok(C.pack(st, 'T') && st.shelves.H === 3 && st.shelves.T === 0 && st.opened.H === 0, 'ten boxes pack back into a crate');
  ok(!C.pack(st, 'T') && !C.pack(st, 'O') && !C.pack(st, 'H'), 'nothing packs without ten loose');
  const s9 = C.newState('ones', 0); C.openCrate(s9); C.toSlip(s9, 'T', 0); s9.shelves.T = 9;
  ok(!C.pack(s9, 'T'), 'nine boxes do not pack');
}
/* exhaustive: every 6-move sequence from every round's start */
const MOVES = ['crate', 'box', 'packT', 'packO', 'slipH', 'slipT', 'slipO', 'back'];
const doMove = (st, m) => m === 'crate' ? C.openCrate(st) : m === 'box' ? C.openBox(st) : m === 'packT' ? C.pack(st, 'T') : m === 'packO' ? C.pack(st, 'O') : m === 'back' ? C.fromSlip(st) : C.toSlip(st, m.slice(4), 1);
let seqs = 0, bad = 0;
for (const face of ['ones', 'big']) C.rounds(face).forEach((r, k) => {
  const walk = (st, depth) => {
    if (depth === 6) return;
    for (const m of MOVES) {
      const s2 = JSON.parse(JSON.stringify(st)), O0 = s2.shelves.O; const res = doMove(s2, m); seqs++;
      const sh = s2.shelves, total = C.value(s2) + C.slipValue(s2);
      if (total !== r.a || ['H', 'T', 'O'].some(c => sh[c] < 0 || sh[c] > C.SHELF_MAX || s2.slip.have[c] > s2.slip.need[c])) bad++;
      if (m === 'crate' && sh.O !== O0) bad++;
      if (m === 'crate' && res.result === 'open' && JSON.stringify(st.shelves.T) !== '0') bad++;
      walk(s2, depth + 1);
    }
  };
  walk(C.newState(face, k), 0);
});
ok(seqs > 100000 && bad === 0, `exhaustive 6-move search: ${seqs} moves, ${bad} broke the value, a shelf, a slip or the nesting`);
/* the slip */
{
  const st = C.newState('ones', 0);
  ok(C.toSlip(st, 'O', 1).result === 'moved' && C.toSlip(st, 'O', 1).result === 'moved' && C.toSlip(st, 'O', 1).result === 'air' && st.shelves.O === 0, 'two cubes go on, the third pick is air');
  ok(C.toSlip(st, 'T', 1).result === 'full' && C.toSlip(st, 'H', 1).result === 'full', 'a ones slip has no box or crate cells');
  ok(C.fromSlip(st) === 'O' && st.shelves.O === 1 && st.slip.have.O === 1, 'the last piece goes back');
  C.openCrate(st); C.openBox(st);
  ok(C.toSlip(st, 'O', 9).moved === 4 && C.slipFull(st), 'a handful fills only the empty cells');
  ok(C.toSlip(st, 'O', 1).result === 'full', 'a full slip takes no more');
}

/* ---------- 3. a scripted player for every round, and every verdict ---------- */
for (const face of ['ones', 'big']) C.rounds(face).forEach((r, k) => {
  const st = C.newState(face, k);
  ok(C.check(st).key === 'hintSlip', `${face} ${k}: Check before the slip is full → hintSlip`);
  C.openCrate(st); C.openBox(st);
  ['H', 'T', 'O'].forEach(c => C.toSlip(st, c, 9));
  ok(C.slipFull(st) && st.opened.H === 1 && st.opened.T === 1, `${face} ${k}: one crate and one box fill the slip`);
  ok(C.check(st).key === 'hintType' && st.misses === 0, `${face} ${k}: nothing typed → hintType, no miss`);
  ok(JSON.stringify(C.marks(st)) === JSON.stringify(C.truthMarks(r.a, r.b)), `${face} ${k}: the child's marks are the written method's marks`);
  const cs = colSub(r.a, r.b), M = C.truthMarks(r.a, r.b);
  ok(M.H.join() === [H(r.a), cs.top.H].join() && M.T.join() === [0, 10, cs.top.T].join() && M.O.join() === [O(r.a), cs.top.O].join(), `${face} ${k}: strike-and-rewrite ${M.H.join('→')} | ${M.T.join('→')} | ${M.O.join('→')}`);
  typeIn(st, r.a - r.b);
  ok(C.check(st).result === 'ok' && st.done && C.answer(st) === r.a - r.b, `${face} ${k}: ${r.a - r.b} → solved`);
});
{
  const st = C.newState('ones', 0); C.openCrate(st); C.openBox(st); C.toSlip(st, 'O', 5);
  typeIn(st, '287'); let r = C.check(st);
  ok(r.result === 'miss' && r.wrongs.join() === 'T' && C.hint(st) === 'hintCount' && !st.help, '287 → the tens box wrong, hintCount');
  typeIn(st, '298'); r = C.check(st);
  ok(r.result === 'miss' && r.wrongs.join() === 'O' && st.help && C.hint(st) === 'hintNest', '298 → miss 2: hintNest');
  C.type(st, 'del'); ok(st.verdict === null && C.hint(st) === null, 'a keystroke takes the help away');
  typeIn(st, '297'); ok(C.check(st).result === 'ok', '297 → solved');
  ok(C.check(st).result === 'no' && !C.type(st, '1') && !C.openCrate(st).result.match(/open/), 'a solved round takes nothing more');
  /* a shelf with ten or more cannot be one digit */
  const s2 = C.newState('ones', 0); C.openCrate(s2); C.openBox(s2); C.toSlip(s2, 'O', 5); C.openBox(s2); typeIn(s2, '297');
  r = C.check(s2); ok(r.result === 'note' && r.key === 'hintTooMany' && r.cols.join() === 'O' && s2.misses === 0, 'a second box opened: seventeen cubes → hintTooMany, no miss');
  C.pack(s2, 'O'); ok(C.check(s2).result === 'ok', 'packed back → 297 solves');
  /* the marks follow the openings, one at a time — none before anything opens */
  const s3 = C.newState('ones', 0);
  ok(JSON.stringify(C.marks(s3)) === JSON.stringify({ H: [3], T: [0], O: [2] }), `no marks before anything opens (${JSON.stringify(C.marks(s3))})`);
  C.openCrate(s3);
  ok(JSON.stringify(C.marks(s3)) === JSON.stringify({ H: [3, 2], T: [0, 10], O: [2] }), `a crate opened: 3→2 and 10 over the 0, nothing over the ones yet (${JSON.stringify(C.marks(s3))})`);
  C.openBox(s3);
  ok(JSON.stringify(C.marks(s3)) === JSON.stringify({ H: [3, 2], T: [0, 10, 9], O: [2, 12] }), 'a box opened: 10→9 and 12 over the ones');
  C.pack(s3, 'O');
  ok(JSON.stringify(C.marks(s3)) === JSON.stringify({ H: [3, 2], T: [0, 10], O: [2] }), 'packed back: the box marks go away again');
  /* digits stand right-aligned under the shelves (a two-digit answer leaves the hundreds box empty) */
  ok(C.boxDigit('97', 'O') === '7' && C.boxDigit('97', 'T') === '9' && C.boxDigit('97', 'H') === '' && C.boxDigit('297', 'H') === '2', 'digits are right-aligned under the shelves');
  { const s4 = C.newState('ones', 0); C.openCrate(s4); C.openBox(s4); C.toSlip(s4, 'O', 5); typeIn(s4, '97'); const r4 = C.check(s4); ok(r4.result === 'miss' && r4.wrongs.join() === 'H', '97 for 297 → only the hundreds box is off'); }
  ok(!C.type(C.newState('ones', 0), '0') && (() => { const s = C.newState('ones', 0); ['1', '2', '3', '4'].forEach(d => C.type(s, d)); return s.typed === '123'; })(), 'typing: no leading 0, three digits at most');
}
/* ---------- 4. the shortcut bots, from the round data ---------- */
{
  const smaller = (a, b) => Math.abs(H(a) - H(b)) * 100 + Math.abs(T(a) - T(b)) * 10 + Math.abs(O(a) - O(b));
  const tensZero = (a, b) => (H(a) - 1 - H(b)) * 100 + (O(a) + 10 - O(b)); /* the hundred broken straight into ones */
  const neverNine = (a, b) => (H(a) - 1 - H(b)) * 100 + (10 - T(b)) * 10 + (O(a) + 10 - O(b)); /* the 0 becomes 10, never 9 */
  const all = MY.ones.concat(MY.big);
  const n1 = all.filter(x => smaller(x[0], x[1]) === x[2]).length, n2 = MY.ones.filter(x => tensZero(x[0], x[1]) === x[2]).length, n3 = all.filter(x => neverNine(x[0], x[1]) === x[2]).length;
  ok(n1 === 0 && n2 === 0 && n3 === 0, `bots: smaller from bigger ${n1}/16, tens stay 0 ${n2}/8, 0 becomes 10 never 9 ${n3}/16`);
  ok(all.every(x => neverNine(x[0], x[1]) - x[2] === 10), 'the never-9 bot is always exactly one ten too many: the box left unopened');
  ok(smaller(302, 5) === 303 && tensZero(302, 5) === 207 && neverNine(302, 5) === 307 && neverNine(400, 136) === 274, 'bots on the first rounds: 303, 207, 307, 274');
  for (const face of ['ones', 'big']) C.rounds(face).forEach((r, k) => {
    for (const bot of [smaller, neverNine].concat(face === 'ones' ? [tensZero] : [])) {
      const st = C.newState(face, k); C.openCrate(st); C.openBox(st); ['H', 'T', 'O'].forEach(c => C.toSlip(st, c, 9)); typeIn(st, bot(r.a, r.b));
      ok(C.check(st).result === 'miss', `${face} ${k}: the bot's ${bot(r.a, r.b)} is a miss`);
    }
  });
}
/* the plan */
for (const face of ['ones', 'big']) {
  let prev = null; const R = C.rounds(face);
  for (let t = 0; t < 60; t++) {
    const p = C.plan(face, rnd, prev);
    ok(p.order.slice().sort((a, b) => a - b).join() === R.map(r => r.k).join() && (!prev || p.order.join() !== prev.join()), `plan ${face}: every round once, never the previous order`);
    prev = p.order;
  }
}
ok(C.faceOf('big') === 'big' && C.faceOf(undefined) === 'ones' && C.faceOf('x') === 'ones', 'the setting picks the face');
ok(C.band(560).wide && !C.band(559).wide && C.band(309).cramp && !C.band(310).cramp, 'the width bands');

/* ---------- 5. picture + strings ---------- */
const BW = /(^|\/)[^/]*\b(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?\//i;
ok(fs.existsSync(path.join(REPO, 'image-library-webp', 'themes', C.TUCK + '@2x.webp')) && !BW.test(C.TUCK + '/') && /hamster$/.test(C.TUCK), `picture ${C.TUCK}: on disk, in colour`);
const S = ACT.strings, src = fs.readFileSync(ACTF, 'utf8').replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*\/\*STRINGS-END\*\//, '') + fs.readFileSync(CORE, 'utf8');
const KEYS = Object.keys(S); ok(KEYS.length >= 32, `strings: the set is there (${KEYS.length})`);
const NODIGIT = ['instruction', 'hintSlip', 'hintType', 'hintTooMany', 'hintCount', 'hintNest', 'hintEmpty', 'okOnes', 'okBig', 'aPackT', 'aPackO', 'aBack'];
const NEED = { okOnes: ['a', 'b', 'c'], okBig: ['a', 'b', 'c'], aShelfH: ['n'], aShelfT: ['n'], aShelfO: ['n'], aSlip: ['col', 'have', 'need'], aState: ['h', 't', 'o'], aTyped: ['v'] };
const FREE = /(?<!\p{L})(free|kostenlos\w*|gratis|gratuit\w*|grátis|ilmai\w*|maksuton\w*|kostnadsfri\w*|vederlagsfri\w*|gratuito|gratuita)(?!\p{L})/iu;
for (const k of KEYS) for (const l of LOCS) {
  const v = S[k][l]; ok(typeof v === 'string' && v.length > 0, `strings.${k}.${l} present`); if (typeof v !== 'string') continue;
  ok(!FREE.test(v), `strings.${k}.${l} never says free`);
  if (NODIGIT.indexOf(k) >= 0) ok(!/\d/.test(v.replace(/\{\w+\}/g, '')), `strings.${k}.${l}: no digit`);
  if (NEED[k]) ok(NEED[k].every(x => v.split('{' + x + '}').length - 1 === 1), `strings.${k}.${l}: carries ${NEED[k].join(', ')} once each`);
  ok(!/\{(?!(a|b|c|h|t|o|n|col|have|need|v|msg)\})/.test(v), `strings.${k}.${l}: no unknown placeholder`);
  if (l === 'fr' || l === 'it') ok(v.indexOf("'") < 0, `strings.${k}.${l}: typographic apostrophe`);
  if (l === 'fr') ok(!/ [:!?;»]/.test(v) && !/« /.test(v), `strings.${k}.fr: a narrow space before : ! ? ; and inside « »`);
  if (l === 'es' && /[!?]/.test(v)) ok(/[¡¿]/.test(v), `strings.${k}.es: opens its ¡ ¿`);
  if (l === 'de') ok(!/borg/i.test(v) && !/ergänz/i.test(v), `strings.${k}.de: entbündeln, never borgen or Ergänzen`);
}
for (const l of LOCS) ok(S.title[l].indexOf('Tuck') >= 0, `${l}: Tuck in the title`);
/* the success lines, built by the activity, say the round */
for (const l of LOCS) {
  ACT.api = { t: k => S[k][l] }; ACT._view = {};
  const want = (k, a, b, c) => S[k][l].replace('{a}', a).replace('{b}', b).replace('{c}', c);
  ACT.st = C.newState('ones', 0); ok(ACT._okLine() === want('okOnes', 302, 5, 297), `${l}: «${ACT._okLine()}»`);
  ACT.st = C.newState('big', 0); ok(ACT._okLine() === want('okBig', 400, 136, 264), `${l}: «${ACT._okLine()}»`);
  ACT.st = C.newState('ones', 0); ok(ACT._taskLine() === '302 − 5 = ?', `${l}: the task line uses U+2212`);
}
ACT.api = null; ACT.st = null;
const BYSHELL = ['title', 'instruction', 'instrBubble', 'okBubble'], BYSETTING = ['setTake', 'tOnes', 'tBig', 'setWritten', 'wHidden', 'wShown'];
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
  ok(['302 − 5', '297', '307', '400 − 136 = 264'].every(x => all.indexOf(x) >= 0), `prose.${l}: quotes what the activity shows`);
  ok(all.indexOf('Tuck') >= 0, `prose.${l}: names Tuck`);
  ok(!/Break a hundred|Break a ten/.test(all), `prose.${l}: no word of the old automatic buttons`);
  if (l === 'fr' || l === 'it') ok(all.indexOf("'") < 0, `prose.${l}: typographic apostrophes`);
  if (l === 'de') ok(!/borg/i.test(all), 'prose.de: entbündeln, never borgen');
}
const rows = JSON.parse(fs.readFileSync(MAN, 'utf8')), row = rows.find(x => x.id === ID);
ok(rows.length === headRows.length && row && row.tool === 'nested-crates-activity', 'manifest: the row, tool nested-crates-activity');
ok(row && row.params.take.join() === 'ones,big' && row.params.written.join() === 'hidden,shown' && ['ones', 'big'].every(f => row.params.rounds[f].map(r => r.a + '-' + r.b).join() === C.rounds(f).map(r => r.a + '-' + r.b).join()), 'manifest: params match the core');
['id', 'alignment', 'task_template', 'kid_prompt_template', 'theme'].forEach(k => ok(JSON.stringify(row[k]) === JSON.stringify(head[k]), `manifest: ${k} frozen`));
['slug', 'page_title', 'page_intro'].forEach(k => Object.keys(head[k]).forEach(l => ok(row[k][l] === head[k][l], `manifest: ${k}.${l} frozen`)));
['da', 'no', 'fi'].forEach(l => ok(!head.slug[l] && /^[a-z0-9-]+$/.test(row.slug[l] || '') && row.page_title[l] && row.page_intro[l] && !FREE.test(row.page_title[l] + row.page_intro[l]) && !/Common Core|2\.NBT/.test(row.page_title[l] + row.page_intro[l]), `manifest: ${l} gets a new slug, title and intro`));
ok(LOCS.every(l => row.slug[l]), 'manifest: the row ships in all 11 locales');
rows.filter(x => x.id !== ID).forEach(x => { const h = headRows.find(y => y.id === x.id); ok(h && JSON.stringify(h) === JSON.stringify(x), `manifest: ${x.id} untouched`); });

console.log(`\nverify-nested-crates-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
