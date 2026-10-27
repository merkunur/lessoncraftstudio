#!/usr/bin/env node
/* =====================================================================
   verify-accordion-core.js — the build gate for ACTIVITY #139, The
   Accordion Sentence (Equal Groups, 2.OA.C.4; Level 3 3.OA.A.1/C.7), all
   11 locales.
   ---------------------------------------------------------------------
   It does NOT trust the core. Its own ground truth:
     · the old activity's eight rounds, read from the committed manifest at
       the commit before this build — they are Level 1, in order;
     · its own fold rule: a strip folds only when every pleat is the same
       height and at least one bead tall — tried on every strip it can make
       from the rounds and on every ±1 change of a fair strip;
     · its own running totals and its own times sentence (either factor
       order, product g·e);
     · the fix rounds: exactly one tray off by one, the odd tray moving one
       place per pass and landing on every tray equally often;
     · every verdict, every miss and its literal hint key, the plan,
       strings ×11 (no digits in a hint or a Level 2/3 task line, the
       school's × / ·, the success lines filled and true, pMake = the
       shipped promptGroups sentence), prose and the manifest.
   Usage: node scripts/verify-accordion-core.js   (AC_CORE / AC_ACT / AC_MANIFEST override the files)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), { execSync } = require('child_process'), vm = require('vm');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const CORE = process.env.AC_CORE || path.join(MINI, 'accordion-core.js');
const ACTF = process.env.AC_ACT || path.join(MINI, 'accordion-activity.js');
const MAN = process.env.AC_MANIFEST || path.join(MINI, 'array-activities.json');
const ID = 'array.equal-groups.2-oa-c-4', BEFORE = 'c80e967d';
const C = require(CORE);
const ACT = (() => { const ctx = { window: {}, AccordionCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(ACTF, 'utf8') + '\n;this.__A = window.AccordionActivity;', ctx); return ctx.__A; })();
const LOCS = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
let PASS = 0, FAIL = 0;
const ok = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL <= 80) console.error('  FAIL: ' + m); } };
const DOT = /^(de|sv|da|no|fi)$/;

/* ---------- my own rules ---------- */
const myFold = (b) => b.length >= 2 && b[0] >= 1 && b.every(x => x === b[0]);
const myRun = (b) => { let s = 0; return b.map(x => (s += x)); };

/* ---------- 1. the tables ---------- */
const headRows = JSON.parse(execSync(`git show ${BEFORE}:"mini tools/array-activities.json"`, { cwd: REPO, encoding: 'utf8', maxBuffer: 1e8 })), head = headRows.find(x => x.id === ID);
const OLD = head.params.rounds.map(r => [r.groups, r.each]);
ok(OLD.length === 8, 'the shipped activity had 8 rounds');
const L1 = C.rounds('1');
ok(L1.length === 8 && OLD.every((o, i) => L1[i].g === o[0] && L1[i].e === o[1]), 'Level 1 = the shipped 8 rounds, in order');
for (const lv of ['1', '2', '3']) {
  const R = C.rounds(lv);
  ok(R.length >= 7, `level ${lv}: at least 7 rounds`);
  ok(new Set(R.map(r => r.g + 'x' + r.e)).size === R.length, `level ${lv}: no round twice`);
  R.forEach(r => {
    ok(r.g >= 2 && r.e >= 2 && r.e <= C.MAX, `level ${lv} ${r.g}×${r.e}: at least 2 groups of at least 2, a tray holds it`);
    if (lv !== '3') ok(r.g * r.e <= 20 || lv === '2', `level ${lv} ${r.g}×${r.e}: within its band`);
    if (lv === '1') ok(r.g * r.e <= 20, `level 1 ${r.g}×${r.e}: within 20`);
    if (lv === '2') ok(r.g * r.e <= 50 && [2, 5, 10].indexOf(r.e) >= 0, `level 2 ${r.g}×${r.e}: groups of 2, 5 or 10, within 50`);
    if (lv === '3') ok(r.g * r.e <= 50 && r.g <= 9, `level 3 ${r.g}×${r.e}: within the band`);
    if (r.odd != null) { ok(lv !== '1' && Math.abs(r.delta) === 1 && r.odd >= 0 && r.odd < r.g && r.g >= 3 && !r.array, `level ${lv} ${r.g}×${r.e}: a fix round — one tray off by one, a clear majority`); }
  });
  ok(lv === '1' || R.filter(r => r.odd != null).length >= 1, `level ${lv}: has a fix round`);
}
ok(C.rounds('3').filter(r => r.array).length >= 3, 'level 3: at least three arrays');

/* ---------- 2. the fold ---------- */
let foldChecks = 0;
for (const lv of ['1', '2', '3']) C.rounds(lv).forEach(r => {
  const fair = Array(r.g).fill(r.e);
  ok(C.canFold(fair) === true, `${r.g}×${r.e}: a fair strip folds`);
  for (let i = 0; i < r.g; i++) for (const d of [-1, 1]) {
    const b = fair.slice(); b[i] += d; ok(C.canFold(b) === myFold(b) && C.canFold(b) === false, `${r.g}×${r.e}: pleat ${i + 1} ${d > 0 ? '+' : '−'}1 does not fold`); foldChecks++;
  }
  ok(C.runningTotals(fair).join() === myRun(fair).join() && C.sum(fair) === r.g * r.e, `${r.g}×${r.e}: running totals end at the product`);
});
ok(C.canFold([0, 0, 0]) === false && C.canFold([3]) === false && C.canFold([2, 2]) === true, 'the fold: never empty pleats, never one pleat');
/* every strip of up to 4 pleats 0..5 — the core's rule equals mine */
{ let bad = 0; const walk = (b) => { if (b.length >= 1 && C.canFold(b) !== myFold(b)) bad++; if (b.length < 4) for (let v = 0; v <= 5; v++) walk(b.concat(v)); }; walk([]); ok(bad === 0, `the fold rule agrees with mine on every small strip (${bad} disagree)`); }

/* ---------- 3. the fix rounds ---------- */
for (const lv of ['2', '3']) C.rounds(lv).forEach((r, k) => {
  const hits = Array(r.g).fill(0);
  for (let p = 0; p < r.g * 3; p++) {
    const st = C.newState(lv, k, p);
    if (r.array) { ok(!st.fix && st.beads.every(x => x === r.e), `${r.g}×${r.e} array: a full array`); continue; }
    if (r.odd == null) { ok(!st.fix && st.beads.every(x => x === r.e), `L${lv} ${r.g}×${r.e}: arrives fair`); continue; }
    const off = st.beads.map((x, i) => x !== r.e ? i : -1).filter(i => i >= 0);
    ok(st.fix && off.length === 1 && st.beads[off[0]] === r.e + r.delta && off[0] === (r.odd + p) % r.g && C.oddIndex(r, p) === off[0], `L${lv} ${r.g}×${r.e} pass ${p}: one tray off by one, moved one place`);
    if (off.length) hits[off[0]]++;
  }
  if (r.odd != null) ok(hits.every(h => h === 3), `L${lv} ${r.g}×${r.e}: the odd tray lands on every tray equally (${hits})`);
});

/* ---------- 4. the model ---------- */
const fill = (st, key, v) => { C.focus(st, key); String(v).split('').forEach(d => C.type(st, d)); };
C.rounds('1').forEach((r, k) => {
  const tag = `L1 ${r.g}×${r.e}`;
  for (const run of ['shown', 'hidden']) {
    const st = C.newState('1', k, 0);
    ok(st.beads.every(x => x === 0), `${tag}: the trays start empty`);
    let res = C.check(st, run); ok(res.result === 'empty' && C.hint(st) === 'hEmpty' && st.misses === 0, `${tag}: Check on empty trays — no miss`);
    ok(C.squeeze(st) === 'spring' && !st.folded, `${tag}: an empty strip springs back`);
    for (let i = 0; i < r.g; i++) for (let j = 0; j < r.e; j++) C.addBead(st, i);
    C.addBead(st, r.g - 1);
    ok(C.squeeze(st) === 'spring', `${tag}: one bead too many springs back`);
    fill(st, 'total', r.g * r.e + 1);
    res = C.check(st, run); ok(res.result === 'unequal' && st.misses === 1 && C.hint(st) === 'missUnequal', `${tag}: unequal groups — miss 1`);
    res = C.check(st, run); ok(res.result === 'unequal' && st.help && C.hint(st) === 'miss2Row', `${tag}: unequal again — miss 2 (the row)`);
    C.removeBead(st, r.g - 1); ok(!st.help, `${tag}: a move takes the help away`);
    ok(C.squeeze(st) === 'folded' && st.folded, `${tag}: a fair strip folds`);
    ok(C.addBead(st, 0) === 'added' && !st.folded, `${tag}: a bead unfolds it`); C.removeBead(st, 0);
    /* fair but the wrong size */
    const st2 = C.newState('1', k, 0); for (let i = 0; i < r.g; i++) for (let j = 0; j < r.e + 1; j++) C.addBead(st2, i);
    fill(st2, 'total', r.g * (r.e + 1)); res = C.check(st2, run); ok(res.result === 'wrongSize' && C.hint(st2) === 'missWrongSize', `${tag}: equal but not ${r.e} — wrong size`);
    /* the total */
    while (st.total) C.del(st);
    res = C.check(st, run); ok(res.result === 'noTotal' && C.hint(st) === 'hTotal', `${tag}: no total — no miss`);
    fill(st, 'total', r.g * r.e + 1); res = C.check(st, run); ok(res.result === 'total' && C.hint(st) === (st.help ? 'miss2Total' : 'missTotal'), `${tag}: a wrong total`);
    C.del(st); C.del(st); fill(st, 'total', r.g + r.e); res = C.check(st, run); ok(res.result === 'total', `${tag}: groups + each is not the total`);
    C.del(st); C.del(st); fill(st, 'total', r.g * r.e); res = C.check(st, run); ok(res.result === 'ok' && st.done, `${tag}: ${r.g} × ${r.e} = ${r.g * r.e} — done`);
    ok(C.addBead(st, 0) === 'no' && C.squeeze(st) === 'no' && C.type(st, '1') === 'no', `${tag}: nothing moves after success`);
  }
});
C.rounds('2').forEach((r, k) => {
  const tag = `L2 ${r.g}×${r.e}`;
  for (const run of ['shown', 'hidden']) {
    const st = C.newState('2', k, 0), win = C.windowsTyped(st, run);
    ok(win === (run === 'shown'), `${tag} ${run}: the windows are typed only when the totals are shown`);
    let res;
    if (st.fix) {
      fill(st, 'total', r.g * r.e); res = C.check(st, run); ok(res.result === 'unequal' && C.hint(st) === 'missUnequal', `${tag}: the fix round must be fixed first`);
      const i = st.odd; if (r.delta > 0) C.removeBead(st, i); else C.addBead(st, i);
      st.misses = 0; st.help = false; C.focus(st, 'total'); while (C.del(st) !== 'no');
    }
    ok(C.canFold(st.beads) && st.beads[0] === r.e, `${tag}: the strip is fair`);
    const rt = myRun(st.beads);
    if (win) {
      res = C.check(st, run); ok(res.result === 'noWindows' && C.hint(st) === 'hWindows' && st.misses === 0, `${tag}: empty windows — no miss`);
      const bad = r.g >= 3 ? 1 : 0; for (let w = 0; w < r.g - 1; w++) fill(st, 'w' + w, w === bad ? rt[w] + 1 : rt[w]);
      res = C.check(st, run); ok(res.result === 'run' && !st.folded && res.at === bad && res.previous === (bad ? rt[0] : 0) && C.hint(st) === (bad ? 'missRun' : 'missRunFirst'), `${tag}: a wrong running total names the one before it`);
      C.focus(st, 'w' + bad); C.del(st); C.del(st); fill(st, 'w' + bad, rt[bad]);
    }
    res = C.check(st, run); ok(res.result === 'noTotal' && C.hint(st) === 'hTotal', `${tag}: no total — no miss`);
    fill(st, 'total', r.g * r.e - r.e); res = C.check(st, run); ok(res.result === 'total', `${tag}: one group short is wrong`);
    C.del(st); C.del(st); fill(st, 'total', r.g * r.e); res = C.check(st, run); ok(res.result === 'ok' && st.done, `${tag}: = ${r.g * r.e}`);
  }
});
C.rounds('3').forEach((r, k) => {
  const tag = `L3 ${r.g}×${r.e}${r.array ? ' array' : ''}`, st = C.newState('3', k, 0);
  if (r.array) ok(C.addBead(st, 0) === 'no' && C.removeBead(st, 0) === 'no', `${tag}: an array is not edited`);
  if (st.fix) { const i = st.odd; if (r.delta > 0) C.removeBead(st, i); else C.addBead(st, i); }
  let res = C.check(st); ok(res.result === 'noSentence' && C.hint(st) === 'hSentence' && st.misses === 0, `${tag}: an empty sentence — no miss`);
  const put = (a, b, c) => { ['s0', 's1', 's2'].forEach(key => { C.focus(st, key); while (C.del(st) !== 'no'); }); fill(st, 's0', a); fill(st, 's1', b); fill(st, 's2', c); };
  put(r.g, r.e, r.g * r.e + 1); res = C.check(st); ok(res.result === 'total' && C.hint(st) === 'missTotal', `${tag}: right factors, wrong product`);
  put(r.g + 1, r.e, (r.g + 1) * r.e); res = C.check(st); ok(res.result === 'sentence' && st.help && C.hint(st) === 'miss2Total', `${tag}: a wrong factor — the sentence (miss 2)`);
  put(r.g, r.e + 1, r.g * (r.e + 1)); res = C.check(st); ok(res.result === 'sentence', `${tag}: a wrong second factor`);
  put(r.e, r.g, r.g * r.e); res = C.check(st); ok(res.result === 'ok' && st.done, `${tag}: ${r.e} × ${r.g} also reads it`);
  const st2 = C.newState('3', k, 0); if (st2.fix) { const i = st2.odd; if (r.delta > 0) C.removeBead(st2, i); else C.addBead(st2, i); }
  ['s0', 's1', 's2'].forEach((key, j) => fill(st2, key, [r.g, r.e, r.g * r.e][j])); res = C.check(st2); ok(res.result === 'ok', `${tag}: ${r.g} × ${r.e} reads it`);
});
{ const r = C.rounds('3').find(x => x.odd != null), k = C.rounds('3').indexOf(r), st = C.newState('3', k, 0);
  ['s0', 's1', 's2'].forEach((key, j) => fill(st, key, [r.g, r.e, r.g * r.e][j]));
  ok(C.check(st).result === 'unequal', 'L3: the fix round cannot be read before it is fixed'); }
{ const st = C.newState('1', 0, 0); fill(st, 'total', 123); ok(st.total === '12', 'a box holds two digits'); for (let j = 0; j < 12; j++) C.addBead(st, 0); ok(st.beads[0] === C.MAX, 'a tray holds at most ten'); ok(C.removeBead(st, 1) === 'no', 'an empty tray gives nothing'); }

/* ---------- 5. the plan ---------- */
let seed = 13; const rnd = () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
for (const lv of ['1', '2', '3']) {
  const n = C.rounds(lv).length, firsts = {}; let prev = null;
  for (let p = 0; p < 1500; p++) {
    const o = C.plan(lv, rnd, prev).order;
    ok(o.slice().sort((a, b) => a - b).join() === Array.from({ length: n }, (_, i) => i).join(), `L${lv}: a pass is every round once`);
    if (prev) ok(o.join() !== prev.join(), `L${lv}: never the order of the pass before`);
    prev = o; firsts[o[0]] = 1;
  }
  ok(Object.keys(firsts).length === n, `L${lv}: every round can open a pass`);
}
ok(C.levelOf('2') === '2' && C.levelOf('x') === '1' && C.runOf('hidden') === 'hidden' && C.runOf(undefined) === 'shown', 'the settings pick the level and the totals');

/* ---------- 6. strings ---------- */
const S = ACT.strings, src = fs.readFileSync(ACTF, 'utf8').replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*\/\*STRINGS-END\*\//, '') + fs.readFileSync(CORE, 'utf8');
const KEYS = Object.keys(S); ok(KEYS.length >= 36, 'strings: the set is there');
const NODIGIT = ['pAdd', 'pFix', 'pTimes', 'hEmpty', 'hTotal', 'hWindows', 'hSentence', 'missUnequal', 'missWrongSize', 'missRun', 'missRunFirst', 'missTotal', 'missSentence', 'miss2Row', 'miss2Total'];
const FREE = /(?<!\p{L})(free|kostenlos\w*|gratis|gratuit\w*|grátis|ilmai\w*|maksuton\w*|kostnadsfri\w*|vederlagsfri\w*|gratuito|gratuita)(?!\p{L})/iu;
for (const k of KEYS) for (const l of LOCS) {
  const v = S[k][l]; ok(typeof v === 'string' && v.length > 0, `strings.${k}.${l} present`); if (typeof v !== 'string') continue;
  ok(!FREE.test(v), `strings.${k}.${l} never says free`);
  if (NODIGIT.indexOf(k) >= 0) ok(!/\d/.test(v), `strings.${k}.${l}: no digit`);
  if (/^(pAdd|pFix|pTimes)$/.test(k)) ok(!/\{/.test(v), `strings.${k}.${l}: a Level 2/3 task line names no number`);
  if (/^miss2Total$|^missTotal$|^missSentence$/.test(k)) ok(!/\{total\}/.test(v), `strings.${k}.${l}: never names the total`);
  if (l === 'fr' || l === 'it') ok(v.indexOf("'") < 0, `strings.${k}.${l}: typographic apostrophe`);
  if (l === 'fr') ok(!/ [:!?;»]/.test(v) && !/« /.test(v), `strings.${k}.fr: a narrow space before : ! ? ; and inside « »`);
  if (l === 'es' && /[!?]$/.test(v)) ok(/[¡¿]/.test(v), `strings.${k}.es: opens its ¡ ¿`);
  if (/^(okGroups|okRows)$/.test(k)) ok(v.indexOf(DOT.test(l) ? '·' : '×') >= 0 && v.indexOf(DOT.test(l) ? '×' : '·') < 0, `strings.${k}.${l}: the school's times sign`);
}
/* pMake = the shipped sentence of array-core.js promptGroups (the first sentence) */
{ const ac = fs.readFileSync(path.join(MINI, 'array-core.js'), 'utf8'), line = ac.match(/promptGroups:\s*(\{[^\n]*\})/)[1], PG = vm.runInNewContext('(' + line + ')');
  for (const l of LOCS) { const first = PG[l].replace(/\. .*$/, '.'); ok(S.pMake[l] === first, `${l}: pMake is the shipped sentence (${S.pMake[l]} / ${first})`); } }
for (const l of LOCS) {
  const g = DOT.test(l) ? '·' : '×', f = (k, a) => S[k][l].replace(/\{(\w+)\}/g, (m, x) => a[x]);
  const okG = f('okGroups', { sum: '4 + 4 + 4', total: 12, groups: 3, each: 4 }), okR = f('okRows', { sum: '4 + 4 + 4', total: 12, rows: 3, cols: 4 });
  for (const [nm, line] of [['groups', okG], ['rows', okR]]) {
    ok(line.indexOf('4 + 4 + 4 = 12') === 0 && line.indexOf('3 ' + g + ' 4 = 12') > 0 && !/\{/.test(line), `${l}: the ${nm} line is true (${line})`);
  }
  ok(/\{each\}/.test(S.missWrongSize[l]) && /\{each\}/.test(S.miss2Row[l]) && /\{previous\}/.test(S.missRun[l]) && /\{each\}/.test(S.missRun[l]), `${l}: the miss lines name the numbers they need`);
  ok(/\{groups\}/.test(S.pMake[l]) && /\{each\}/.test(S.pMake[l]), `${l}: Level 1 names its target`);
}
const BYSHELL = ['title', 'instruction', 'instrBubble', 'okBubble'], BYSETTING = ['setLevel', 'lv1', 'lv2', 'lv3', 'setRun', 'rShown', 'rHidden'];
for (const k of KEYS) ok(BYSHELL.concat(BYSETTING).indexOf(k) >= 0 || new RegExp("'" + k + "'").test(src), `strings.${k} is reached`);
ok(!/role', 'img'|role="img"/.test(src), 'no role="img" anywhere');

/* ---------- 7. prose + manifest ---------- */
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
ok(row && row.tool === 'accordion-activity', 'manifest: the row points at the accordion');
ok(row && row.params.level.join() === '1,2,3' && row.params.run.join() === 'shown,hidden' && ['1', '2', '3'].every(k => row.params.rounds[k] === C.rounds(k).length), 'manifest: params match the core');
['slug', 'page_title', 'page_intro', 'alignment', 'id', 'task_template', 'kid_prompt_template', 'theme'].forEach(k => ok(JSON.stringify(row[k]) === JSON.stringify(head[k]), `manifest: ${k} frozen`));
rows.forEach(x => { if (x.id !== ID) ok(JSON.stringify(x) === JSON.stringify(headRows.find(y => y.id === x.id)), `manifest: the other row ${x.id} is untouched`); });

console.log(`verify-accordion-core: ${PASS} pass, ${FAIL} fail (${foldChecks} ±1 strips)`);
process.exit(FAIL ? 1 : 0);
