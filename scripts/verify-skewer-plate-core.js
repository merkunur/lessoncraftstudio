#!/usr/bin/env node
/* =====================================================================
   verify-skewer-plate-core.js — the build gate for ACTIVITY #138, The
   Skewer Plate (Build an Array, 2.OA.C.4; big arrays 3.OA.A.1/C.7), all 11
   locales.
   ---------------------------------------------------------------------
   It does NOT trust the core. Its own ground truth:
     · the old activity's eight arrays, read from the committed manifest at
       the commit before this build — every one is still a Count round;
     · its own skewers: a row skewer is the c cells of one row, a column
       skewer the r cells of one column; together they cover the plate
       exactly once, and turning the sticks moves no cell;
     · the design's Find table and its measured properties (the right plate
       3/3/3 by position and by size rank, every wrong plate one row or one
       column off, never the turned target, rows-only / columns-only never
       unique, totals distinct), the big-array facts (one of each table
       2–10, products distinct), rows + columns never the total;
     · the model's verdicts, every miss and its literal hint key, the plan,
       pictures on disk in colour, strings ×11, the × / · habit, the
       success lines filled and true, prose and the manifest.
   Usage: node scripts/verify-skewer-plate-core.js   (SP_CORE / SP_ACT / SP_MANIFEST override the files)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), { execSync } = require('child_process'), vm = require('vm');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const CORE = process.env.SP_CORE || path.join(MINI, 'skewer-plate-core.js');
const ACTF = process.env.SP_ACT || path.join(MINI, 'skewer-plate-activity.js');
const MAN = process.env.SP_MANIFEST || path.join(MINI, 'array-activities.json');
const ID = 'array.build-array.2-oa-c-4', BEFORE = 'eaf25814';
const C = require(CORE);
const ACT = (() => { const ctx = { window: {}, SkewerPlateCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(ACTF, 'utf8') + '\n;this.__A = window.SkewerPlateActivity;', ctx); return ctx.__A; })();
const LOCS = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
let PASS = 0, FAIL = 0;
const ok = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL <= 80) console.error('  FAIL: ' + m); } };
const DOT = /^(de|sv|da|no|fi)$/;

/* ---------- 1. the tables ---------- */
const headRows = JSON.parse(execSync(`git show ${BEFORE}:"mini tools/array-activities.json"`, { cwd: REPO, encoding: 'utf8', maxBuffer: 1e8 })), head = headRows.find(x => x.id === ID);
const OLD = head.params.rounds.map(r => [r.rows, r.cols]);
ok(OLD.length === 8, 'the shipped activity had 8 arrays');
OLD.forEach(([r, c]) => ok(C.COUNT.some(x => x[0] === r && x[1] === c), `the shipped ${r} × ${c} is still a Count round`));
ok(C.COUNT.length === 9 && C.COUNT.some(x => x[0] === 3 && x[1] === 5), 'Count: the 8 shipped arrays + 3 × 5');
C.COUNT.forEach(([r, c, pic]) => {
  ok(r >= 2 && c >= 2 && r <= 5 && c <= 5, `${r} × ${c}: within 5 × 5, never a 1 or 0`);
  ok(r + c !== r * c && r + c - 1 !== r * c && r * (c - 1) !== r * c, `${r} × ${c}: rows + columns (and its kin) is never the total`);
  ok(fs.existsSync(path.join(REPO, 'image-library-webp', 'themes', pic + '@2x.webp')) && !/(^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?\//i.test(pic), `${r} × ${c}: the picture ${pic} exists, in colour`);
});
ok(new Set(C.COUNT.map(x => x[2])).size === 9, 'Count: nine different pictures');
/* Find */
const pos = [0, 0, 0], rank = [0, 0, 0];
C.FIND.forEach((f, i) => {
  const tag = `find ${i + 1}`, ri = f.plates.findIndex(p => p[0] === f.t[0] && p[1] === f.t[1]);
  ok(ri >= 0 && f.plates.filter(p => p[0] === f.t[0] && p[1] === f.t[1]).length === 1 && C.rightIndex(f) === ri, `${tag}: exactly one right plate`);
  pos[ri]++;
  const tots = f.plates.map(p => p[0] * p[1]), sorted = tots.slice().sort((a, b) => a - b); rank[sorted.indexOf(tots[ri])]++;
  ok(new Set(tots).size === 3, `${tag}: no two plates share a total`);
  f.plates.forEach((p, j) => { if (j === ri) return; const d = Math.abs(p[0] - f.t[0]) + Math.abs(p[1] - f.t[1]); ok(d === 1, `${tag}: plate ${j + 1} is one row or one column off`); ok(!(p[0] === f.t[1] && p[1] === f.t[0]), `${tag}: plate ${j + 1} is not the turned target`); });
  ok(f.plates.filter(p => p[0] === f.t[0]).length > 1 && f.plates.filter(p => p[1] === f.t[1]).length > 1, `${tag}: counting only rows, or only columns, never finds the plate`);
});
ok(pos.join() === '3,3,3' && rank.join() === '3,3,3', `find: the right plate 3/3/3 by position (${pos}) and by size (${rank})`);
/* big arrays */
{ const prods = C.BIG.map(x => x[0] * x[1]), tables = C.BIG.map(x => x[1]).sort((a, b) => a - b);
  ok(new Set(prods).size === 9, 'big: every product different');
  ok(tables.join() === '2,3,4,5,6,7,8,9,10', 'big: one fact of every table 2–10 (the table = the second factor)');
  ok(C.BIG.every(([r, c]) => r + c !== r * c && r <= 10 && c <= 10 && r >= 2), 'big: within 10 × 10, rows + columns never the product'); }

/* ---------- 2. the skewers ---------- */
for (const [r, c] of C.COUNT.concat(C.BIG)) for (const dir of ['rows', 'cols']) {
  const st = C.newState('count', 0); st.r = r; st.c = c; st.dir = dir;
  const n = C.skewers(st), seen = new Set(); let okLen = true;
  for (let i = 0; i < n; i++) { const cells = C.cellsOf(st, i); if (cells.length !== (dir === 'rows' ? c : r)) okLen = false; cells.forEach(([y, x]) => { seen.add(y + ',' + x); if (dir === 'rows' ? y !== i : x !== i) okLen = false; }); }
  ok(n === (dir === 'rows' ? r : c) && okLen && seen.size === r * c && C.holds(st) === (dir === 'rows' ? c : r), `${r} × ${c} by ${dir}: whole ${dir === 'rows' ? 'rows' : 'columns'}, the plate covered exactly once`);
}

/* ---------- 3. the model ---------- */
const fill = (st, key, v) => { C.focus(st, key); String(v).split('').forEach(d => C.type(st, d)); };
C.COUNT.forEach(([r, c], k) => {
  for (const dir of ['rows', 'cols']) {
    const tag = `count ${r}×${c} ${dir}`, st = C.newState('count', k);
    if (dir === 'cols') { ok(C.reskewer(st) === 'turned' && st.dir === 'cols', `${tag}: the pot turns the sticks`); }
    const n = C.skewers(st), h = C.holds(st);
    let res = C.check(st); ok(res.result === 'notLifted' && C.hint(st) === 'hLift' && st.misses === 0, `${tag}: Check before lifting — no miss`);
    C.lift(st, 0); res = C.check(st); ok(res.result === 'partly' && C.hint(st) === 'hPartly' && st.misses === 0, `${tag}: one skewer out — keep going`);
    ok(C.lift(st, 0) === 'no', `${tag}: a skewer comes out once`);
    ok(C.putBack(st, 0) === 'back' && st.lifted.length === 0, `${tag}: a skewer goes back`);
    for (let i = 0; i < n; i++) C.lift(st, i);
    res = C.check(st); ok(res.result === 'emptyBox' && C.hint(st) === 'hBoxes', `${tag}: empty boxes — no miss`);
    for (let i = 0; i < n; i++) fill(st, 'k' + i, i === n - 1 ? h + 1 : h);
    fill(st, 'total', r * c);
    res = C.check(st); ok(res.result === 'unequal' && res.bad === n - 1 && st.misses === 1 && C.hint(st) === 'missUnequal', `${tag}: one box off — that skewer`);
    st.boxes[n - 1] = String(h);
    st.totalBox = String(r + c); res = C.check(st); ok(res.result === 'edges' && C.hint(st) === 'missEdges', `${tag}: rows + columns — the edges`);
    st.totalBox = String(r + c - 1); res = C.check(st); ok(res.result === 'edges', `${tag}: rows + columns − 1 — the edges`);
    st.totalBox = String(r * c + 1); res = C.check(st); ok(res.result === 'total' && st.help && C.hint(st) === 'missTotal2', `${tag}: another wrong total — miss 2 (running totals)`);
    C.del(st); ok(!st.help, `${tag}: a new move takes the help away`);
    st.totalBox = String(r * c); res = C.check(st); ok(res.result === 'ok' && st.done, `${tag}: ${h} × ${n} = ${r * c} — done`);
    ok(C.reskewer(st) === 'no' && C.lift(st, 0) === 'no', `${tag}: nothing moves after success`);
  }
});
{ const st = C.newState('count', 0); C.lift(st, 0); fill(st, 'k0', 123); ok(st.boxes[0] === '12', 'a skewer box holds two digits'); fill(st, 'total', 1234); ok(st.totalBox === '123', 'the total holds three digits'); ok(C.focus(st, 'k1') === 'no', 'a box exists only for a lifted skewer'); }
C.COUNT.forEach(([r, c], k) => {
  const tag = `build ${r}×${c}`, st = C.newState('build', k);
  let res = C.check(st); ok(res.result === 'emptyPlate' && C.hint(st) === 'hBuild' && st.misses === 0, `${tag}: an empty plate — no miss`);
  ok(C.step(st, 'r', -1) === 'no', `${tag}: no fewer than 0 rows`);
  for (let i = 0; i < 6; i++) C.step(st, 'c', 1); ok(st.b.c === 5, `${tag}: no more than 5 columns`);
  st.b = { r: c, c: r };
  res = C.check(st); ok((r === c ? res.result === 'ok' : res.result === 'turned' && C.hint(st) === 'missTurned'), `${tag}: the turned plate is ${r === c ? 'the same plate' : 'refused — the skewers go the wrong way'}`);
  if (r === c) return;
  st.b = { r: r, c: c + (c < 5 ? 1 : -1) }; res = C.check(st); ok(res.result === 'shape' && res.k === st.b.c && st.help && C.hint(st) === 'missShape2', `${tag}: a wrong shape — miss 2 (the outline)`);
  C.step(st, 'c', st.b.c > c ? -1 : 1); ok(!st.help, `${tag}: a step takes the help away`);
  res = C.check(st); ok(res.result === 'ok' && st.done, `${tag}: ${r} rows of ${c} — done`);
});
C.FIND.forEach((f, k) => {
  const tag = `find ${k + 1}`, st = C.newState('find', k), ri = C.rightIndex(f), wrong = [0, 1, 2].find(i => i !== ri);
  let res = C.check(st); ok(res.result === 'noPick' && C.hint(st) === 'hPick', `${tag}: no plate — no miss`);
  C.pick(st, wrong); res = C.check(st); ok(res.result === 'tray' && res.r === f.plates[wrong][0] && res.c === f.plates[wrong][1] && C.hint(st) === 'missFind', `${tag}: a wrong plate names its own rows and columns`);
  C.check(st); ok(st.help && C.hint(st) === 'missFind2', `${tag}: miss 2 — every plate shows its rows and columns`);
  C.pick(st, ri); res = C.check(st); ok(res.result === 'ok' && st.done, `${tag}: the right plate`);
});
C.BIG.forEach(([r, c], k) => {
  const tag = `big ${r}×${c}`, st = C.newState('big', k);
  let res = C.check(st); ok(res.result === 'emptyBox' && st.misses === 0, `${tag}: an empty product — no miss`);
  fill(st, 'total', r + c); res = C.check(st); ok(res.result === 'big' && C.hint(st) === 'missBig', `${tag}: a wrong product — miss 1`);
  C.check(st); ok(C.hint(st) === 'missTotal2', `${tag}: miss 2 — count on skewer by skewer`);
  while (st.totalBox) C.del(st); fill(st, 'total', r * c); res = C.check(st); ok(res.result === 'ok' && st.done, `${tag}: ${r} × ${c} = ${r * c}`);
});

/* ---------- 4. the plan ---------- */
let seed = 13; const rnd = () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
for (const mode of ['count', 'build', 'find', 'big']) {
  const n = C.rounds(mode).length, tot = (k) => mode === 'find' ? C.FIND[k].t[0] * C.FIND[k].t[1] : C.rounds(mode)[k][0] * C.rounds(mode)[k][1], firsts = {}; let prev = null, same = 0;
  for (let p = 0; p < 1500; p++) {
    const o = C.plan(mode, rnd, prev).order;
    ok(o.slice().sort((a, b) => a - b).join() === Array.from({ length: n }, (_, i) => i).join(), `${mode}: a pass is every round once`);
    if (prev) ok(o.join() !== prev.join(), `${mode}: never the order of the pass before`);
    for (let j = 1; j < n; j++) if (tot(o[j]) === tot(o[j - 1])) same++;
    prev = o; firsts[o[0]] = 1;
  }
  ok(same === 0, `${mode}: never two rounds with the same total in a row (${same})`);
  ok(Object.keys(firsts).length === n, `${mode}: every round can open a pass`);
}
ok(C.modeOf('find', 'big') === 'big' && C.modeOf('build', 'pics') === 'build' && C.modeOf(undefined, undefined) === 'count', 'the settings pick the mode');

/* ---------- 5. strings ---------- */
const S = ACT.strings, src = fs.readFileSync(ACTF, 'utf8').replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*\/\*STRINGS-END\*\//, '') + fs.readFileSync(CORE, 'utf8');
const KEYS = Object.keys(S); ok(KEYS.length >= 38, 'strings: the set is there');
const HINTS = ['hLift', 'hPartly', 'hBoxes', 'hBuild', 'hPick', 'missUnequal', 'missUnequal2', 'missEdges', 'missTotal', 'missTotal2', 'missShape', 'missTurned', 'missShape2', 'missFind', 'missFind2', 'missBig'];
const FREE = /(?<!\p{L})(free|kostenlos\w*|gratis|gratuit\w*|grátis|ilmai\w*|maksuton\w*|kostnadsfri\w*|vederlagsfri\w*|gratuito|gratuita)(?!\p{L})/iu;
for (const k of KEYS) for (const l of LOCS) {
  const v = S[k][l]; ok(typeof v === 'string' && v.length > 0, `strings.${k}.${l} present`); if (typeof v !== 'string') continue;
  ok(!FREE.test(v), `strings.${k}.${l} never says free`);
  if (HINTS.indexOf(k) >= 0) ok(!/\d/.test(v), `strings.${k}.${l}: no digit in a hint`);
  if (l === 'fr' || l === 'it') ok(v.indexOf("'") < 0, `strings.${k}.${l}: typographic apostrophe`);
  if (l === 'fr') ok(!/ [:!?;»]/.test(v) && !/« /.test(v), `strings.${k}.fr: a narrow space before : ! ? ; and inside « »`);
  if (/^(ok|okCols|okBig|zPics)$/.test(k)) ok(v.indexOf(DOT.test(l) ? '·' : '×') >= 0 && v.indexOf(DOT.test(l) ? '×' : '·') < 0, `strings.${k}.${l}: the school's times sign`);
}
for (const l of LOCS) {
  const g = DOT.test(l) ? '·' : '×', f = (k, a) => S[k][l].replace(/\{(\w+)\}/g, (m, x) => a[x]);
  const okLine = f('ok', { r: 3, c: 4, sum: '4 + 4 + 4', t: 12 }), cols = f('okCols', { r: 3, c: 4, sum: '3 + 3 + 3 + 3', t: 12 }), big = f('okBig', { r: 8, c: 7, t: 56 });
  ok(okLine.indexOf('4 + 4 + 4 = 12') >= 0 && okLine.indexOf('3 ' + g + ' 4 = 12') >= 0 && okLine.indexOf('3') < okLine.indexOf('4 + 4'), `${l}: the rows line is true (${okLine})`);
  ok(cols.indexOf('3 + 3 + 3 + 3 = 12') >= 0 && cols.indexOf('4 ' + g + ' 3 = 12') >= 0 && cols.indexOf('4') < cols.indexOf('3 + 3'), `${l}: the columns line is true`);
  ok(big === '8 ' + g + ' 7 = 56.', `${l}: the big line is true`);
  ok(/\{r\}/.test(S.missFind[l]) && /\{c\}/.test(S.missFind[l]) && /\{k\}/.test(S.missShape[l]) && /\{c\}/.test(S.missShape[l]) && /\{c\}/.test(S.missTurned[l]), `${l}: the miss lines name the numbers they show`);
  ok(/\{sum\}/.test(S.tBuild[l]) && /\{r\}/.test(S.tFind[l]) && /\{c\}/.test(S.tFind[l]), `${l}: the task lines name the target`);
}
const BYSHELL = ['title', 'instruction', 'instrBubble', 'okBubble'], BYSETTING = ['setJob', 'jCount', 'jBuild', 'jFind', 'setSize', 'zPics', 'zBig'];
for (const k of KEYS) ok(BYSHELL.concat(BYSETTING).indexOf(k) >= 0 || new RegExp("'" + k + "'").test(src), `strings.${k} is reached`);

/* ---------- 6. prose + manifest ---------- */
for (const l of LOCS) {
  const j = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'messages', 'activity-content', l + '.json'), 'utf8')), p = j.prose[ID];
  ok(p && p.about && p.about.length === 3 && p.practices.length === 4 && p.howToPlay.length === 3 && p.learningGoals.length === 3, `prose.${l}: the whole entry`);
  if (!p) continue;
  const all = [].concat(p.about, p.practices, p.howToPlay, p.learningGoals).join(' ');
  ok(!FREE.test(all), `prose.${l}: never says free`);
  ok(l === 'en' ? /Common Core/.test(all) : !/Common Core/.test(all), `prose.${l}: the framework name`);
  ok(all.indexOf('4 + 4 + 4 = 12') >= 0 && all.indexOf('3 ' + (DOT.test(l) ? '·' : '×') + ' 4 = 12') >= 0, `prose.${l}: quotes the sentences the activity really shows`);
  if (l === 'fr' || l === 'it') ok(all.indexOf("'") < 0, `prose.${l}: typographic apostrophes`);
}
const rows = JSON.parse(fs.readFileSync(MAN, 'utf8')), row = rows.find(x => x.id === ID);
ok(row && row.tool === 'skewer-plate-activity', 'manifest: the row points at the skewer plate');
ok(row && row.params.job.join() === 'count,build,find' && row.params.size.join() === 'pics,big' && ['count', 'build', 'find', 'big'].every(k => row.params.rounds[k] === C.rounds(k).length), 'manifest: params match the core');
['slug', 'page_title', 'page_intro', 'alignment', 'id', 'task_template', 'kid_prompt_template', 'theme'].forEach(k => ok(JSON.stringify(row[k]) === JSON.stringify(head[k]), `manifest: ${k} frozen`));
rows.forEach(x => { if (x.id !== ID) ok(JSON.stringify(x) === JSON.stringify(headRows.find(y => y.id === x.id)), `manifest: the other row ${x.id} is untouched`); });

console.log(`verify-skewer-plate-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
