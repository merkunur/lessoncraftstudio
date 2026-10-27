#!/usr/bin/env node
/* =====================================================================
   verify-snow-stack-core.js — the build gate for ACTIVITY #140, The
   Snow-Lid Stack (Squirrel's Fair Winter Piles, 2.OA.C.4; G2-216/217),
   all 11 locales.
   ---------------------------------------------------------------------
   It does NOT trust the core. Its own ground truth:
     · the old activity's nine round ids, read from the committed manifest
       at the commit before this build — kept, in order, as Level 1;
     · its own enumerator: every one of the 2^(rows−1) cut sets of every
       tray round — exactly ONE is fair AND meets the round's target (n
       piles / piles of k), and it is the core's right cut; fix presets
       are never already right;
     · the design's three fixed-strategy bots (every gap / one cut in the
       middle / two cuts into thirds) pass exactly the measured counts;
     · Level 3: a fair share is only total/n in every hole, every one-acorn
       move breaks it, a fair share with acorns left is not finished;
     · every verdict and its literal hint key, the plan, the pictures on
       disk, strings ×11 (no digit in a hint or a task template, never
       "free", placeholders, the success lines true), prose and the
       manifest (frozen fields; the four new locales present).
   Usage: node scripts/verify-snow-stack-core.js   (WS_CORE / WS_ACT / WS_MANIFEST override the files)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), { execSync } = require('child_process'), vm = require('vm');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const CORE = process.env.WS_CORE || path.join(MINI, 'snow-stack-core.js');
const ACTF = process.env.WS_ACT || path.join(MINI, 'snow-stack-activity.js');
const MAN = process.env.WS_MANIFEST || path.join(MINI, 'winter-piles-activities.json');
const ID = 'winter-piles.draw-partition.2-oa-c-4', BEFORE = '0a94c6da';
const C = require(CORE);
const ACT = (() => { const ctx = { window: {}, SnowStackCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(ACTF, 'utf8') + '\n;this.__A = window.SnowStackActivity;', ctx); return ctx.__A; })();
const LOCS = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
let PASS = 0, FAIL = 0;
const ok = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL <= 80) console.error('  FAIL: ' + m); } };

/* ---------- my own rules ---------- */
const pilesOf = (r, c, cuts) => { const out = []; let prev = 0; cuts.slice().sort((a, b) => a - b).concat([r]).forEach(g => { out.push((g - prev) * c); prev = g; }); return out; };
const fair = (sz) => sz.length >= 2 && sz[0] >= 1 && sz.every(x => x === sz[0]);
const meets = (lv, rd, sz) => fair(sz) && (lv === '1' ? sz.length === rd.n : sz.every(x => x === rd.k));
const subsets = (r) => { const out = []; for (let m = 0; m < 1 << (r - 1); m++) { const s = []; for (let g = 1; g < r; g++) if (m & (1 << (g - 1))) s.push(g); out.push(s); } return out; };

/* ---------- 1. the tables ---------- */
const headRows = JSON.parse(execSync(`git show ${BEFORE}:"mini tools/winter-piles-activities.json"`, { cwd: REPO, encoding: 'utf8', maxBuffer: 1e8 })), head = headRows.find(x => x.id === ID);
const OLDIDS = head.params.rounds.map(r => r.id);
ok(OLDIDS.length === 9 && C.L1.map(r => r.id).join() === OLDIDS.join(), `Level 1 keeps the nine shipped round ids in order (${OLDIDS})`);
for (const lv of ['1', '2', '3']) {
  const R = C.rounds(lv);
  ok(R.length >= 7, `level ${lv}: at least 7 rounds`);
  R.forEach((rd, k) => {
    const a = C.answer(lv, rd), tag = `L${lv} r${k + 1}`;
    ok(Number.isInteger(a) && a >= 2 && a <= 9, `${tag}: the typed answer ${a} is 2–9 (one key, never 0)`);
    if (lv !== '3') ok(rd.r >= 2 && rd.r <= 6 && rd.c >= 2 && rd.c <= 6, `${tag}: a tray of at most 6 × 6, never one row`);
    if (lv === '3') ok(rd.total % rd.n === 0 && rd.n >= 2 && rd.n <= 5 && rd.total <= 20, `${tag}: ${rd.total} shares exactly into ${rd.n} (no remainder)`);
  });
}

/* ---------- 2. one right cut — my enumerator ---------- */
for (const lv of ['1', '2']) C.rounds(lv).forEach((rd, k) => {
  const tag = `L${lv} r${k + 1} ${rd.id || rd.r + '×' + rd.c}`, right = subsets(rd.r).filter(s => meets(lv, rd, pilesOf(rd.r, rd.c, s)));
  ok(right.length === 1, `${tag}: exactly one cut set is fair and meets the target (${right.length})`);
  if (right.length === 1) ok(right[0].join() === C.rightCuts(lv, rd).join(), `${tag}: the core's right cut is mine (${right[0]})`);
  if (rd.preset) ok(!fair(pilesOf(rd.r, rd.c, rd.preset)), `${tag}: the preset twigs are not already fair`);
});
/* the fixed-strategy bots (the design's measured counts) */
const bot = (lv, f) => C.rounds(lv).filter(rd => meets(lv, rd, pilesOf(rd.r, rd.c, f(rd)))).length;
const every = rd => Array.from({ length: rd.r - 1 }, (_, i) => i + 1), middle = rd => [Math.floor(rd.r / 2)], thirds = rd => rd.r % 3 ? [] : [rd.r / 3, 2 * rd.r / 3];
ok(bot('1', every) === 3 && bot('2', every) === 3, `the every-gap bot passes L1 ${bot('1', every)}/9, L2 ${bot('2', every)}/8 (design 3, 3)`);
ok(bot('1', middle) === 4 && bot('2', middle) === 2, `the middle-cut bot passes L1 ${bot('1', middle)}/9, L2 ${bot('2', middle)}/8 (design 4, 2)`);
ok(bot('1', thirds) === 4 && bot('2', thirds) === 3, `the thirds bot passes L1 ${bot('1', thirds)}/9, L2 ${bot('2', thirds)}/8 (design 4, 3)`);

/* ---------- 3. Level 3 shares ---------- */
C.L3.forEach((rd, k) => {
  const tag = `L3 r${k + 1} ${rd.total}/${rd.n}`, each = rd.total / rd.n;
  const shares = []; const walk = (left, i, acc) => { if (i === rd.n - 1) { shares.push(acc.concat([left])); return; } for (let v = 0; v <= left; v++) walk(left - v, i + 1, acc.concat([v])); };
  if (rd.n <= 4 || rd.total <= 15) { walk(rd.total, 0, []); ok(shares.filter(fair).length === 1 && shares.filter(fair)[0].every(x => x === each), `${tag}: of ${shares.length} full shares only ${each} each is fair`); }
  const base = Array(rd.n).fill(each);
  for (let i = 0; i < rd.n; i++) for (let j = 0; j < rd.n; j++) if (i !== j) { const b = base.slice(); b[i]--; b[j]++; ok(!C.isFair(b), `${tag}: moving one acorn from hole ${i + 1} to ${j + 1} is not fair`); }
  const sp = C.heapSpots(rd, k); ok(sp.length === rd.total && sp.every(p => p[0] >= 0 && p[0] <= 1 && p[1] >= 0 && p[1] <= 1) && JSON.stringify(sp) === JSON.stringify(C.heapSpots(rd, k)), `${tag}: the heap is ${rd.total} seeded spots inside the heap area`);
  ok(new Set(sp.map(p => Math.round(p[1] * 4))).size >= 3, `${tag}: the heap is scattered, not one tidy row`);
});

/* ---------- 4. the model ---------- */
const typeN = (st, v) => C.type(st, String(v));
for (const lv of ['1', '2']) C.rounds(lv).forEach((rd, k) => {
  const tag = `L${lv} r${k + 1}`, st = C.newState(lv, k), ans = C.answer(lv, rd);
  if (!rd.preset) { const r0 = C.check(st); ok(r0.result === 'empty' && C.hint(st) === 'hCut' && st.misses === 0, `${tag}: Check with no twig — no miss`); ok(C.stack(st) === 'no', `${tag}: nothing to stack yet`); }
  else { const r0 = C.check(st); ok(r0.result === 'unfair' && st.misses === 1 && C.hint(st) === 'unfair' && st.stacked, `${tag}: the preset stack is unfair — miss 1`); }
  ok(C.toggleCut(st, 0) === 'no' && C.toggleCut(st, rd.r) === 'no' && C.toggleCut(st, 1.5) === 'no', `${tag}: a twig only goes in a gap between rows`);
  /* a wrong cut set: the first unfair one (a 2-row tray has none — its only cut is the right one) */
  const wrong = subsets(rd.r).find(s => s.length && !fair(pilesOf(rd.r, rd.c, s)));
  if (wrong) {
    st.cuts = []; wrong.forEach(g => C.toggleCut(st, g)); ok(!st.stacked, `${tag}: a twig slides the stack off`);
    ok(C.stack(st) === 'slides', `${tag}: an unfair stack slides`);
    let r1 = C.check(st); const want = lv === '2' ? 'mould' : 'unfair';
    ok(r1.result === want, `${tag}: an unfair cut is ${want}`);
    C.check(st); ok(st.help && C.hint(st) === 'miss2Cut', `${tag}: again — miss 2 (the dotted places)`);
  } else ok(rd.r === 2, `${tag}: only a 2-row tray has no unfair cut`);
  if (lv === '1') { const other = subsets(rd.r).find(s => fair(pilesOf(rd.r, rd.c, s)) && pilesOf(rd.r, rd.c, s).length !== rd.n); if (other) { const s2 = C.newState('1', k); s2.cuts = []; other.forEach(g => C.toggleCut(s2, g)); const r2 = C.check(s2); ok(r2.result === 'wrongCount' && r2.n === rd.n && C.hint(s2) === 'wrongCount', `${tag}: fair but not ${rd.n} piles — wrong count`); } }
  if (lv === '2') { const fairWrong = subsets(rd.r).find(s => fair(pilesOf(rd.r, rd.c, s)) && pilesOf(rd.r, rd.c, s)[0] !== rd.k); if (fairWrong) { const s2 = C.newState('2', k); fairWrong.forEach(g => C.toggleCut(s2, g)); ok(C.check(s2).result === 'mould', `${tag}: fair piles of the wrong size do not fit the mould`); } }
  st.cuts = []; C.rightCuts(lv, rd).forEach(g => C.toggleCut(st, g)); ok(!st.help, `${tag}: a move takes the help away`);
  ok(C.stack(st) === 'flat', `${tag}: the right stack is flat`);
  let res = C.check(st); ok(res.result === 'noTyped' && C.hint(st) === (lv === '1' ? 'boxPile' : 'boxHoles'), `${tag}: a fair stack, nothing typed — no miss`);
  typeN(st, ans === 9 ? 8 : ans + 1); res = C.check(st); ok(res.result === 'read' && C.hint(st) === (lv === '1' ? 'readPile' : 'readStack'), `${tag}: a wrong number — count`);
  if (lv === '1' && rd.n !== ans) { typeN(st, rd.n); res = C.check(st); ok(res.result === 'read', `${tag}: typing the number of piles (${rd.n}) for the pile size is wrong`); }
  if (lv === '2' && rd.k <= 9 && rd.k !== ans) { typeN(st, rd.k); res = C.check(st); ok(res.result === 'read', `${tag}: typing the hole size (${rd.k}) for the number of holes is wrong`); }
  typeN(st, ans); res = C.check(st); ok(res.result === 'ok' && st.done, `${tag}: ${ans} — done`);
  ok(C.toggleCut(st, 1) === 'no' && C.type(st, '3') === 'no' && C.stack(st) === 'no', `${tag}: nothing moves after success`);
});
C.L3.forEach((rd, k) => {
  const tag = `L3 r${k + 1}`, st = C.newState('3', k), each = rd.total / rd.n;
  let res = C.check(st); ok(res.result === 'empty' && C.hint(st) === 'hDeal' && st.misses === 0, `${tag}: Check with empty holes — no miss`);
  ok(st.heap === rd.total && st.pockets.length === rd.n, `${tag}: the whole heap waits`);
  for (let i = 0; i < rd.n; i++) C.deal(st, i);
  res = C.check(st); ok(res.result === 'heapLeft' && C.hint(st) === 'heapLeft' && st.misses === 1, `${tag}: one each, acorns left — not finished`);
  C.deal(st, 0); res = C.check(st); ok(res.result === 'unfair' && st.help && C.hint(st) === 'miss2Deal', `${tag}: unequal holes — miss 2`);
  ok(st.pockets.every(p => p === 1) && st.heap === rd.total - rd.n, `${tag}: miss 2 gives one acorn to each hole, the rest back in the heap`);
  for (let q = 0; st.heap > 0; q++) C.deal(st, q % rd.n);
  ok(C.deal(st, 0) === 'no', `${tag}: an empty heap gives nothing`);
  ok(C.undeal(st, 0) === 'back' && st.heap === 1 && C.deal(st, 0) === 'dealt', `${tag}: a hold takes one back, a tap puts it in`);
  res = C.check(st); ok(res.result === 'noTyped' && C.hint(st) === 'boxEach', `${tag}: shared fairly, nothing typed — no miss`);
  typeN(st, rd.n === each ? each + 1 : rd.n); res = C.check(st); ok(res.result === 'read' && C.hint(st) === 'readEach', `${tag}: typing the number of holes is wrong`);
  typeN(st, each); res = C.check(st); ok(res.result === 'ok' && st.done, `${tag}: ${each} each — done`);
});
{ const st = C.newState('1', 0); ok(C.type(st, '0') === 'no' && C.type(st, '12') === 'no', 'no 0 key, one digit only'); C.type(st, '3'); C.type(st, '5'); ok(st.typed === '5', 'a new digit replaces the old one'); ok(C.del(st) === 'del' && st.typed === '' && C.del(st) === 'no', 'delete empties the box'); }
ok(C.toggleCut(C.newState('3', 0), 1) === 'no' && C.deal(C.newState('1', 0), 0) === 'no', 'no twigs in Level 3, no dealing in a tray level');

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
ok(C.levelOf('3') === '3' && C.levelOf('x') === '1' && C.eqOf('hidden') === 'hidden' && C.eqOf(undefined) === 'shown', 'the settings pick the level and the equation');

/* ---------- 6. pictures ---------- */
for (const p of [ACT.ACORN, ACT.SQUIRREL]) ok(fs.existsSync(path.join(REPO, 'image-library-webp', 'themes', p + '@2x.webp')) && !/(^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?\//i.test(p), `the picture ${p} exists, in colour`);

/* ---------- 7. strings ---------- */
const S = ACT.strings, src = fs.readFileSync(ACTF, 'utf8').replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*\/\*STRINGS-END\*\//, '') + fs.readFileSync(CORE, 'utf8');
const KEYS = Object.keys(S); ok(KEYS.length >= 40, 'strings: the set is there');
const NODIGIT = ['pOpen', 'pN', 'pMatch', 'pFix', 'pHoles', 'pShare', 'hCut', 'hDeal', 'unfair', 'unfairDeal', 'wrongCount', 'mould', 'heapLeft', 'readPile', 'readStack', 'readEach', 'miss2Cut', 'miss2Deal', 'boxPile', 'boxHoles', 'boxEach'];
const NEED = { pN: ['n'], pFix: ['n'], pHoles: ['k'], pShare: ['n'], pMatch: ['eq'], eqHoles: ['total', 'k', 'box'], eqShare: ['total', 'n', 'box'], okPiles: ['eq', 'total'], okHoles: ['total', 'piles', 'k', 'eq'], okShare: ['each', 'eq', 'total'], wrongCount: ['n'], mould: ['k'], aGap: ['i'], aPocket: ['i', 'n'], aPocketEmpty: ['i'], aStore: ['n'] };
const FREE = /(?<!\p{L})(free|kostenlos\w*|gratis|gratuit\w*|grátis|ilmai\w*|maksuton\w*|kostnadsfri\w*|vederlagsfri\w*|gratuito|gratuita)(?!\p{L})/iu;
for (const k of KEYS) for (const l of LOCS) {
  const v = S[k][l]; ok(typeof v === 'string' && v.length > 0, `strings.${k}.${l} present`); if (typeof v !== 'string') continue;
  ok(!FREE.test(v), `strings.${k}.${l} never says free`);
  if (NODIGIT.indexOf(k) >= 0) ok(!/\d/.test(v), `strings.${k}.${l}: no digit`);
  if (NEED[k]) ok(NEED[k].every(x => v.indexOf('{' + x + '}') >= 0), `strings.${k}.${l}: carries ${NEED[k].join(', ')}`);
  ok(!/\{(?!(n|k|eq|total|piles|each|box|i|msg)\})/.test(v), `strings.${k}.${l}: no unknown placeholder`);
  if (l === 'fr' || l === 'it') ok(v.indexOf("'") < 0, `strings.${k}.${l}: typographic apostrophe`);
  if (l === 'fr') ok(!/ [:!?;»]/.test(v) && !/« /.test(v), `strings.${k}.fr: a narrow space before : ! ? ; and inside « »`);
  if (l === 'es' && /[!?]/.test(v)) ok(/[¡¿]/.test(v), `strings.${k}.es: opens its ¡ ¿`);
}
for (const l of LOCS) {
  const f = (k, a) => S[k][l].replace(/\{(\w+)\}/g, (m, x) => a[x]);
  const a = f('okPiles', { eq: '4 + 4 + 4', total: 12 }), b = f('okHoles', { total: 12, piles: 2, k: 6, eq: '6 + 6' }), c = f('okShare', { each: 4, eq: '4 + 4 + 4', total: 12 });
  ok(a.indexOf('4 + 4 + 4 = 12') >= 0 && b.indexOf('6 + 6 = 12') >= 0 && b.indexOf('12') < b.indexOf('2') + 3 && c.indexOf('4 + 4 + 4 = 12') >= 0 && c.indexOf('4') < c.indexOf('4 + 4'), `${l}: the success lines are true (${a} | ${b} | ${c})`);
}
/* the numbers in the holes line come in the true order: total, holes, how many in each */
for (const l of LOCS) { const v = S.okHoles[l].replace(/\{(\w+)\}/g, (m, x) => ({ total: 30, piles: 3, k: 10, eq: '10 + 10 + 10' })[x]), seq = (v.match(/\d+/g) || []).map(Number); ok(seq.slice(0, 3).join() === '30,3,10' && seq.slice(-1)[0] === 30, `${l}: «${v}» names 30 acorns, 3 holes of 10`); }
ok(C.isFair([6]) === false && C.isFair([0, 0]) === false && C.isFair([6, 6]) === true && C.isFair([6, 5]) === false, 'one pile, or empty piles, are never a fair stack');
const BYSHELL = ['title', 'instruction', 'instrBubble', 'okBubble'], BYSETTING = ['setLevel', 'lv1', 'lv2', 'lv3', 'setEq', 'eShown', 'eHidden'];
for (const k of KEYS) ok(BYSHELL.concat(BYSETTING).indexOf(k) >= 0 || new RegExp("'" + k + "'").test(src), `strings.${k} is reached`);
ok(!/role', 'img'|role="img"/.test(src), 'no role="img" anywhere');
ok(/this\._stored > 0 \? this\._t\('aStore'/.test(src) && /cnt \? self\._t\('aPocket'/.test(src), 'never a 0: an empty hole and an empty hollow say so without a numeral');

/* the task line never prints the typed answer (the match rounds once printed "6 + 6 + 6" and asked for 6) */
for (const lv of ['1', '2', '3']) C.rounds(lv).forEach((rd, k) => { for (const l of LOCS) {
  ACT.api = { t: (key) => S[key][l] }; ACT.st = C.newState(lv, k);
  const line = ACT._taskLine(), ans = C.answer(lv, rd), nums = (line.match(/\d+/g) || []).map(Number);
  ok(line && !/\{/.test(line) && nums.indexOf(ans) < 0, `${l} L${lv} r${k + 1}: the task line «${line}» does not show the answer ${ans}`);
} });
delete ACT.api; delete ACT.st;

/* ---------- 8. prose + manifest ---------- */
for (const l of LOCS) {
  const j = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'messages', 'activity-content', l + '.json'), 'utf8')), p = j.prose[ID];
  ok(p && p.about && p.about.length === 3 && p.practices.length === 4 && p.howToPlay.length === 3 && p.learningGoals.length === 3, `prose.${l}: the whole entry`);
  if (!p) continue;
  const all = [].concat(p.about, p.practices, p.howToPlay, p.learningGoals).join(' ');
  ok(!FREE.test(all), `prose.${l}: never says free`);
  ok(l === 'en' ? /Common Core/.test(all) : !/Common Core/.test(all), `prose.${l}: the framework name`);
  ok(all.indexOf('4 + 4 + 4 = 12') >= 0 && all.indexOf('6 + 6 = 12') >= 0, `prose.${l}: quotes the sentences the activity really shows`);
  if (l === 'fr' || l === 'it') ok(all.indexOf("'") < 0, `prose.${l}: typographic apostrophes`);
}
ok(C.L1.some(r => r.r * r.c === 12 && r.r * r.c / r.n === 4 && r.n === 3) && C.L1.some(r => r.r * r.c === 12 && r.n === 2), 'the prose sentences 4 + 4 + 4 = 12 and 6 + 6 = 12 are real Level-1 rounds');
const rows = JSON.parse(fs.readFileSync(MAN, 'utf8')), row = rows.find(x => x.id === ID);
ok(rows.length === 1 && row && row.tool === 'winter-piles-activity', 'manifest: the one row, tool winter-piles-activity');
ok(row && row.params.level.join() === '1,2,3' && row.params.eq.join() === 'shown,hidden' && ['1', '2', '3'].every(k => row.params.rounds[k] === C.rounds(k).length), 'manifest: params match the core');
['id', 'alignment', 'task_template', 'kid_prompt_template', 'theme'].forEach(k => ok(JSON.stringify(row[k]) === JSON.stringify(head[k]), `manifest: ${k} frozen`));
['slug', 'page_title', 'page_intro'].forEach(k => Object.keys(head[k]).forEach(l => ok(row[k][l] === head[k][l], `manifest: ${k}.${l} frozen`)));
['sv', 'da', 'no', 'fi'].forEach(l => { ok(!head.slug[l] && /^[a-z0-9-]+$/.test(row.slug[l] || '') && row.page_title[l] && row.page_intro[l] && !FREE.test(row.page_title[l] + row.page_intro[l]), `manifest: ${l} gets a new slug, title and intro`); });
ok(LOCS.every(l => row.slug[l]), 'manifest: the row ships in all 11 locales');

console.log(`verify-snow-stack-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
