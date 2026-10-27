#!/usr/bin/env node
/* =====================================================================
   verify-chimney-roof-core.js — the build gate for ACTIVITY #137, The
   Chimney Roof (Even or Odd?, 2.OA.C.3), all 11 locales.
   ---------------------------------------------------------------------
   It does NOT trust the core. Its own ground truth:
     · its own pour: every brick goes to the LOWER column, a tie left —
       simulated brick by brick and compared with the model's columns;
     · parity by n % 2, never by the model;
     · the design's round tables typed in here (to 10, to 20, the nine
       shelves of four bags to 99), and their measured properties: 18 even
       / 18 odd, even bags per shelf position 5/4/4/5, no three of one
       parity side by side, every ones digit 3–4 times, no shelf repeats a
       ones digit, the tens-digit rule right 17/36, "two even bags per
       shelf" false in 4 of 9;
     · the shipped even/odd words read from choice-board-activity.js.
   Then the model (pour, roofs that fit or fall, miss 2, the equation,
   the before-the-tower setting, the shelf), the plan (never three of one
   verdict, the flat roof left or right 50/50 and never three in a row),
   strings ×11, prose and the manifest.
   Usage: node scripts/verify-chimney-roof-core.js   (CR_CORE / CR_ACT / CR_MANIFEST override the files)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), { execSync } = require('child_process'), vm = require('vm');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const CORE = process.env.CR_CORE || path.join(MINI, 'chimney-roof-core.js');
const ACTF = process.env.CR_ACT || path.join(MINI, 'chimney-roof-activity.js');
const MAN = process.env.CR_MANIFEST || path.join(MINI, 'choice-board-activities.json');
const ID = 'choice-board.even-odd.2-oa-c-3', BEFORE = '6dd3a759';
const C = require(CORE);
const ACT = (() => { const ctx = { window: {}, ChimneyRoofCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(ACTF, 'utf8') + '\n;this.__A = window.ChimneyRoofActivity;', ctx); return ctx.__A; })();
const LOCS = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
let PASS = 0, FAIL = 0;
const ok = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL <= 80) console.error('  FAIL: ' + m); } };

/* ---------- the gate's own truth ---------- */
const T10 = [2, 3, 4, 5, 6, 7, 8, 9, 10], T20 = [11, 12, 13, 14, 15, 16, 17, 19, 20];
const T99 = [[50, 49, 42, 93], [99, 81, 44, 83], [88, 84, 91, 30], [52, 75, 47, 56], [78, 20, 65, 36], [69, 58, 87, 35], [59, 38, 71, 46], [34, 43, 40, 27], [37, 85, 86, 82]];
const isEven = (n) => n % 2 === 0;
const fill = (st, i, num) => String(num).split('').forEach(d => { C.focus(st, i); C.typeEq(st, d); });
/* my pour: the brick goes to the lower column, a tie to the left */
function myPour(p) { let L = 0, R = 0; const sides = []; for (let i = 0; i < p; i++) { if (L <= R) { L++; sides.push('L'); } else { R++; sides.push('R'); } } return { L, R, sides }; }

/* ---------- 1. the tables and their properties ---------- */
ok(JSON.stringify(C.rounds('10')) === JSON.stringify(T10), 'to 10: the design\'s numbers');
ok(JSON.stringify(C.rounds('20')) === JSON.stringify(T20), 'to 20: the design\'s numbers');
ok(JSON.stringify(C.rounds('99')) === JSON.stringify(T99), 'to 99: the design\'s nine shelves, bags in order');
ok(T10.filter(isEven).length === 5 && T20.filter(isEven).length === 4, 'to 10: 5 even : 4 odd · to 20: 4 even : 5 odd');
ok(T10.concat(T20).every(n => n >= 2), 'no 0 and no 1 anywhere');
{ const all = [].concat.apply([], T99), ev = all.filter(isEven).length, pos = [0, 1, 2, 3].map(i => T99.filter(r => isEven(r[i])).length);
  ok(ev === 18 && all.length === 36, `to 99: 18 even / 18 odd (${ev})`);
  ok(pos.every(x => x === 4 || x === 5) && pos.join() === '5,4,4,5', `to 99: even bags per shelf position 5/4/4/5 (${pos.join('/')})`);
  ok(T99.every(r => !(isEven(r[0]) === isEven(r[1]) && isEven(r[1]) === isEven(r[2])) && !(isEven(r[1]) === isEven(r[2]) && isEven(r[2]) === isEven(r[3]))), 'to 99: no three bags of one parity side by side');
  const ones = {}; all.forEach(n => { ones[n % 10] = (ones[n % 10] || 0) + 1; });
  ok(Object.keys(ones).length === 10 && Object.values(ones).every(c => c >= 3 && c <= 4), `to 99: every ones digit 3–4 times (${JSON.stringify(ones)})`);
  ok(T99.every(r => new Set(r.map(n => n % 10)).size === 4), 'to 99: no shelf repeats a ones digit');
  const tens = all.filter(n => isEven(Math.floor(n / 10)) === isEven(n)).length;
  ok(tens === 17, `to 99: the tens-digit rule is right 17/36 (${tens})`);
  ok(T99.filter(r => r.filter(isEven).length !== 2).length === 4, '"two even bags per shelf" is false in 4 of 9');
  ok(all.every(n => n >= 20 && n <= 99), 'to 99: every bag holds at least two slabs and at most 99'); }

/* ---------- 2. the pour, the slabs, the fit ---------- */
for (let p = 0; p <= 20; p++) { const m = myPour(p), c = C.columns(p); ok(c.L === m.L && c.R === m.R && Math.abs(c.L - c.R) <= 1 && c.L >= c.R, `pour ${p}: the lower column fills, a tie goes left (${c.L}/${c.R})`); }
for (const n of [].concat(T10, T20)) {
  const st = C.newState(n <= 10 ? '10' : '20', 'after', (n <= 10 ? T10 : T20).indexOf(n)), m = myPour(n), seen = [];
  for (let i = 0; i < n; i++) seen.push(C.pour(st));
  ok(seen.join('') === m.sides.join(''), `${n}: each brick rolls to the lower column`);
  ok(C.pour(st) === 'full', `${n}: the bag holds exactly ${n}`);
  ok(C.fits(n, 'flat') === isEven(n) && C.fits(n, 'chimney') === !isEven(n), `${n}: the flat roof fits iff even, the chimney iff odd`);
}
for (const n of [].concat.apply([], T99)) { const t = C.towerOf(n, n % 10), s = Math.floor(n / 10); ok(t.slabs === s && t.L === s * 5 + Math.ceil(n % 10 / 2) && t.R === s * 5 + Math.floor(n % 10 / 2) && t.L + t.R === n, `${n}: ${s} slabs of five pairs, the ones on top`); }

/* ---------- 3. the model ---------- */
for (const num of ['10', '20']) C.rounds(num).forEach((n, r) => {
  const tag = `${num}/${n}`, right = isEven(n) ? 'flat' : 'chimney', wrong = isEven(n) ? 'chimney' : 'flat', h = Math.floor(n / 2);
  let st = C.newState(num, 'after', r);
  let res = C.roof(st, right); ok(res.result === 'notPoured' && C.hint(st) === 'hPour' && st.misses === 0 && !st.roof, `${tag}: a roof before the pour — "pour first", no miss`);
  for (let i = 0; i < n - 1; i++) C.pour(st);
  res = C.roof(st, right); ok(res.result === 'notPoured' && !st.roof && st.misses === 0, `${tag}: one brick still in the bag — no roof lands yet`);
  C.pour(st);
  ok(C.unpour(st) === 'back' && st.poured === n - 1, `${tag}: a brick can be sent back before the roof`); C.pour(st);
  res = C.roof(st, wrong); ok(res.result === 'fell' && st.misses === 1 && !st.help && !st.roof && C.hint(st) === 'miss1', `${tag}: the wrong roof falls — miss 1`);
  res = C.roof(st, wrong); ok(res.result === 'fell' && st.misses === 2 && st.help && C.hint(st) === 'miss2', `${tag}: again — miss 2 brings the pairing help`);
  res = C.roof(st, right); ok(res.result === 'fits' && st.roof === right && st.phase === 'eq' && !st.help, `${tag}: the right roof fits`);
  ok(C.unpour(st) === 'no', `${tag}: no brick leaves once the roof is on`);
  res = C.check(st); ok(res.result === 'eqEmpty' && C.hint(st) === 'hEq' && st.eqMisses === 0, `${tag}: Check with empty boxes — no miss`);
  /* unequal parts (h, h+1) — the "7 + 8" misconception */
  fill(st, 0, h); fill(st, 1, h + 1);
  res = C.check(st); ok(res.result === 'eqUnequal' && !st.done && st.eqMisses === 1 && C.hint(st) === 'eqUnequal', `${tag}: ${h} + ${h + 1} — unequal parts never pass`);
  /* unequal parts that sum right (h-1, h+1) — still not two equal parts */
  if (h >= 2) { st.eq = ['', '']; fill(st, 0, h - 1); fill(st, 1, h + 1); res = C.check(st); ok(res.result === 'eqUnequal' && !st.done, `${tag}: ${h - 1} + ${h + 1} sums right but is not two equal parts`); }
  /* equal but wrong (h+1, h+1) */
  st.eq = ['', '']; fill(st, 0, h + 1); fill(st, 1, h + 1);
  res = C.check(st); ok(res.result === 'eqWrong' && st.eqHelp && C.hint(st) === 'eqMiss2', `${tag}: equal but wrong — the second equation miss`);
  C.delEq(st); ok(!st.eqHelp, `${tag}: a new move takes the help away`);
  st.eq = ['', '']; fill(st, 0, h); fill(st, 1, h);
  res = C.check(st); ok(res.result === 'ok' && st.done, `${tag}: ${n} = ${h} + ${h}${isEven(n) ? '' : ' + 1'} — done`);
  /* before the tower: the roof hovers, can be swapped, lands on the last brick */
  st = C.newState(num, 'before', r);
  ok(C.roof(st, wrong).result === 'hover' && C.roof(st, right).result === 'hover' && st.hover === right, `${tag}: before the tower the roof hovers and can be swapped`);
  let last = null; for (let i = 0; i < n; i++) last = C.pour(st);
  ok(last && last.result === 'fits' && st.roof === right, `${tag}: the hovering roof lands on the last brick and fits`);
  st = C.newState(num, 'before', r); C.roof(st, wrong); for (let i = 0; i < n; i++) last = C.pour(st);
  ok(last && last.result === 'fell' && st.misses === 1 && !st.roof && st.phase === 'roof', `${tag}: a wrong hovering roof falls when it lands`);
});
{ const st = C.newState('20', 'after', 8); for (let i = 0; i < 20; i++) C.pour(st); C.roof(st, 'flat'); C.typeEq(st, '1'); ok(st.focus === 0, '20: the first box waits for two digits'); C.typeEq(st, '0'); ok(st.focus === 1 && st.eq[0] === '10', '20: then the second box'); }
/* the shelf */
T99.forEach((shelf, r) => {
  const tag = `99/${r + 1}`, st = C.newState('99', 'after', r);
  ok(st.mode === 'before', `${tag}: to 99 is always roof-before-pour`);
  ok(C.check(st).result === 'noRoof' && C.hint(st) === 'hRoofs' && st.misses === 0, `${tag}: Pour with an empty seat — no miss`);
  shelf.forEach((n, i) => C.seat(st, i, isEven(n) ? 'chimney' : 'flat'));
  C.seat(st, 0, isEven(shelf[0]) ? 'flat' : 'chimney');
  let res = C.check(st); ok(res.result === 'fell' && res.wrong.join() === '1,2,3' && st.bags[0].landed && !st.bags[1].roof && st.misses === 1 && C.hint(st) === 'miss99', `${tag}: three wrong roofs fall, the right one stays`);
  ok(C.seat(st, 0, 'flat') === 'no', `${tag}: a landed roof cannot be moved`);
  shelf.forEach((n, i) => { if (i) C.seat(st, i, isEven(n) ? 'chimney' : 'flat'); });
  res = C.check(st); ok(res.result === 'fell' && st.help && C.hint(st) === 'miss2', `${tag}: again — miss 2`);
  shelf.forEach((n, i) => { if (i) C.seat(st, i, isEven(n) ? 'flat' : 'chimney'); });
  res = C.check(st); ok(res.result === 'ok' && st.done && st.bags.every(b => b.landed), `${tag}: every roof fits — done`);
});

/* ---------- 4. the plan ---------- */
let seed = 11; const rnd = () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
for (const num of ['10', '20', '99']) {
  const rs = C.rounds(num), n = rs.length, firsts = {}; let prev = null, breaks = 0, sideRun = 0, unbalanced = 0, flatLeft = 0, total = 0;
  for (let p = 0; p < 1500; p++) {
    const P = C.plan(num, rnd, prev), o = P.order;
    ok(o.slice().sort((a, b) => a - b).join() === rs.map((_, i) => i).join(), `${num}: a pass is every round once`);
    if (prev) ok(o.join() !== prev.join(), `${num}: never the order of the pass before`);
    prev = o; firsts[o[0]] = (firsts[o[0]] || 0) + 1;
    if (num !== '99') for (let j = 2; j < n; j++) { const e = (k) => isEven(rs[o[k]]); if (e(j) === e(j - 1) && e(j) === e(j - 2)) breaks++; }
    const sides = o.map(r => P.side[r]), fl = sides.filter(s => s === 'flatLeft').length; flatLeft += fl; total += n;
    if (Math.abs(fl - (n - fl)) > 1) unbalanced++;
    for (let j = 2; j < n; j++) if (sides[j] === sides[j - 1] && sides[j] === sides[j - 2]) sideRun++;
  }
  ok(breaks === 0, `${num}: never three of one verdict in a row (${breaks})`);
  ok(unbalanced === 0 && sideRun === 0, `${num}: the flat roof left or right half the time per pass, never three in a row (${unbalanced}, ${sideRun})`);
  ok(Math.abs(flatLeft / total - 0.5) < 0.03, `${num}: the flat roof is on the left ${(flatLeft / total * 100).toFixed(1)} % of rounds`);
  ok(Object.keys(firsts).length === n, `${num}: every round can open a pass`);
}

/* ---------- 5. strings ---------- */
const S = ACT.strings, src = fs.readFileSync(ACTF, 'utf8').replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*\/\*STRINGS-END\*\//, '') + fs.readFileSync(CORE, 'utf8');
const KEYS = Object.keys(S); ok(KEYS.length >= 30, 'strings: the set is there');
const HINTS = ['hPour', 'hRoofs', 'hEq', 'miss1', 'miss99', 'miss2', 'eqUnequal', 'eqMiss1', 'eqMiss2', 'roofFlat', 'roofChim'];
const FREE = /(?<!\p{L})(free|kostenlos\w*|gratis|gratuit\w*|grátis|ilmai\w*|maksuton\w*|kostnadsfri\w*|vederlagsfri\w*|gratuito|gratuita)(?!\p{L})/iu;
/* the verdict words, with Unicode letter boundaries (\b is ASCII-only and misses «ímpar»).
   EXEMPTIONS: pt «par» alone is also the noun "pair" («cada tijolo tem par») — only «ímpar» / «é par» are banned;
   da «lige store» means "equally big" — banned only when not followed by «store». */
const W = (re) => new RegExp('(?<!\\p{L})(' + re + ')(?!\\p{L})', 'iu');
const VERDICT = { en: W('even|odd'), de: W('gerade|ungerade'), fr: W('pair|impair'), es: W('par|impar'), pt: W('ímpar|é par'), it: W('pari|dispari'), nl: W('even|oneven'), sv: W('jämnt|jämna|udda'), da: new RegExp('(?<!\\p{L})(ulige|lige(?! store))(?!\\p{L})', 'iu'), no: W('partall|oddetall'), fi: /(parillinen|pariton)/iu };
/* the ban, poisoned both ways: it must fire on the verdict and pass the look-alikes */
[['pt', '15 é ímpar'], ['pt', '14 é par'], ['sv', 'ett jämnt tal'], ['sv', 'udda'], ['da', 'et ulige tal'], ['da', 'et lige tal'], ['es', 'es impar'], ['fi', 'on pariton'], ['no', 'et oddetall'], ['en', 'is odd']]
  .forEach(([l, t]) => ok(VERDICT[l].test(t), `the verdict ban fires on ${l} «${t}»`));
[['pt', 'cada tijolo tem par'], ['da', 'to lige store dele'], ['sv', 'jämför'], ['es', 'tiene pareja'], ['en', 'evenly'], ['it', 'parità']]
  .forEach(([l, t]) => ok(!VERDICT[l].test(t), `the verdict ban passes ${l} «${t}»`));
for (const k of KEYS) for (const l of LOCS) {
  const v = S[k][l]; ok(typeof v === 'string' && v.length > 0, `strings.${k}.${l} present`); if (typeof v !== 'string') continue;
  ok(!FREE.test(v), `strings.${k}.${l} never says free`);
  if (HINTS.indexOf(k) >= 0) ok(!/\d/.test(v), `strings.${k}.${l}: no digit in a hint`);
  if (/^miss|^h[A-Z]|^eq/.test(k)) ok(!VERDICT[l].test(v), `strings.${k}.${l}: a hint never names the verdict`);
  if (l === 'fr' || l === 'it') ok(v.indexOf("'") < 0, `strings.${k}.${l}: typographic apostrophe`);
  if (l === 'fr') ok(!/ [:!?;»]/.test(v) && !/« /.test(v), `strings.${k}.fr: a narrow space before : ! ? ; and inside « »`);
}
/* the roof words are the shipped even/odd words */
{ const cb = fs.readFileSync(path.join(MINI, 'choice-board-activity.js'), 'utf8'), grab = (key) => { const m = cb.match(new RegExp(key + ':\\s*\\{([\\s\\S]*?)\\}')); const o = {}; (m ? m[1] : '').replace(/(\w+):\s*'([^']*)'/g, (x, l, w) => { o[l] = w; }); return o; };
  const E = grab('labelEven'), O = grab('labelOdd'); for (const l of LOCS) ok(S.even[l] === E[l] && S.odd[l] === O[l], `${l}: the roof words are the shipped ones (${S.even[l]} / ${S.odd[l]})`); }
/* the success lines are true */
for (const l of LOCS) {
  const e = S.okEven[l].replace(/\{n\}/g, 14).replace(/\{a\}/g, 7), o = S.okOdd[l].replace(/\{n\}/g, 15).replace(/\{a\}/g, 7);
  ok(e.indexOf('14 = 7 + 7') === 0 && !/\+ 1/.test(e), `${l}: the even line is true`);
  ok(o.indexOf('15 = 7 + 7 + 1') === 0, `${l}: the odd line is true`);
  ok(/\{n\}/.test(S.tBuild[l]) && /\{n\}/.test(S.tBefore[l]), `${l}: the task line names the number`);
}
const BYSHELL = ['title', 'instruction', 'instrBubble', 'okBubble'], BYSETTING = ['setNum', 'n10', 'n20', 'n99', 'setRoof', 'rAfter', 'rBefore'];
for (const k of KEYS) ok(BYSHELL.concat(BYSETTING).indexOf(k) >= 0 || new RegExp("'" + k + "'").test(src), `strings.${k} is reached`);

/* ---------- 6. prose + manifest ---------- */
for (const l of LOCS) {
  const j = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'messages', 'activity-content', l + '.json'), 'utf8')), p = j.prose[ID];
  ok(p && p.about && p.about.length === 3 && p.practices.length === 4 && p.howToPlay.length === 3 && p.learningGoals.length === 3, `prose.${l}: the whole entry`);
  if (!p) continue;
  const all = [].concat(p.about, p.practices, p.howToPlay, p.learningGoals).join(' ');
  ok(!FREE.test(all), `prose.${l}: never says free`);
  ok(l === 'en' ? /Common Core/.test(all) : !/Common Core/.test(all), `prose.${l}: the framework name`);
  ok(all.indexOf('14 = 7 + 7') >= 0 && all.indexOf('15 = 7 + 7 + 1') >= 0, `prose.${l}: quotes the equations the activity really shows`);
  if (l === 'fr' || l === 'it') ok(all.indexOf("'") < 0, `prose.${l}: typographic apostrophes`);
}
const rows = JSON.parse(fs.readFileSync(MAN, 'utf8')), row = rows.find(x => x.id === ID);
const headRows = JSON.parse(execSync(`git show ${BEFORE}:"mini tools/choice-board-activities.json"`, { cwd: REPO, encoding: 'utf8', maxBuffer: 1e8 })), head = headRows.find(x => x.id === ID);
ok(row && row.tool === 'chimney-roof-activity', 'manifest: the row points at the chimney roof');
ok(row && row.params.num.join() === '10,20,99' && row.params.roof.join() === 'after,before' && ['10', '20', '99'].every(k => row.params.rounds[k] === C.rounds(k).length), 'manifest: params match the core');
['slug', 'page_title', 'page_intro', 'alignment', 'id', 'task_template', 'kid_prompt_template', 'theme'].forEach(k => ok(JSON.stringify(row[k]) === JSON.stringify(head[k]), `manifest: ${k} frozen`));
rows.forEach(x => { if (x.id !== ID) ok(JSON.stringify(x) === JSON.stringify(headRows.find(y => y.id === x.id)), `manifest: the other row ${x.id} is untouched`); });

console.log(`verify-chimney-roof-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
