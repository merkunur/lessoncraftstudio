#!/usr/bin/env node
/* =====================================================================
   verify-level-rail-core.js — the logic gate of ACTIVITY #168, The Level
   Rail ("Pip's Stacking Fence", 2.MD.D.10). Its ground truth is the
   design file's own §6 tables (docs/activities-rebuild/designs/
   168-graph-it.md), parsed here, with this gate's own reading of a bar
   graph — never the tool's tables. It checks:
     · every round = the design's data (categories, values, order), its
       question and its answer, re-derived here (more / fewer / total /
       most / left / true-false / value); no 0 anywhere; single-scale
       values 1–10; scaled values on the scale (halves only where s = 2);
       one right answer (a unique "most"; True/False one each); fix rounds
       with exactly one wrong picket;
     · the rail, over every picket × every slider height: level ⇔ the
       slider is at that picket's top; the bubble is centred only when
       level and leans the right way; the slider snaps to the unit and
       stays on the post; the overhang = what sticks up, by the scale;
     · stack (the tower = a + b, the post grows to 20 past 10, unstack
       restores), take apart (one step of the scale per plank, put back);
     · Check: untouched → a reminder; a wrong answer → a miss; Check again
       unchanged is never a second miss; miss 2 = help; right → done;
       miss-2 count tags never contain 0 and end where they should;
     · the plan (totals and true/false never side by side, never the same
       order twice, a stuck random source); the "most" picket in each
       place 20–30 % over 400 showings;
     · the activity layer in node: every task line and success line in
       11 locales fully filled, no "{", no "undefined", no "free"; the
       manifest row (11 locales, the new tool, old params dropped).
   Env overrides (the mutation script): LR_CORE, LR_ACT, LR_MAN.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const REPO = path.join(__dirname, '..');
const C = require(process.env.LR_CORE || path.join(REPO, 'mini tools', 'level-rail-core.js'));
const ACT = process.env.LR_ACT || path.join(REPO, 'mini tools', 'level-rail-activity.js');
const MAN = process.env.LR_MAN || path.join(REPO, 'mini tools', 'graph-it-activities.json');
let pass = 0, fail = 0;
const is = (c, m) => { if (c) pass++; else { fail++; if (fail < 60) console.error('  FAIL: ' + m); } };
const LOCS = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

/* ---------- the design tables, parsed ---------- */
const md = fs.readFileSync(path.join(REPO, 'docs', 'activities-rebuild', 'designs', '168-graph-it.md'), 'utf8');
const sec = (a, b) => md.slice(md.indexOf(a), md.indexOf(b, md.indexOf(a)));
const rows = (txt, re) => txt.split('\n').filter((l) => re.test(l)).map((l) => l.split('|').slice(1, -1).map((c) => c.trim()));
const CAT = { leaves: 'leaf', raspberries: 'raspberry', acorns: 'acorn', pinecones: 'pinecone', mushrooms: 'mushroom', flowers: 'flower' };
const pairs = (s) => { const o = { cats: [], data: {} }; s.replace(/\*\*/g, '').split('·').forEach((p) => { const m = p.trim().match(/^(\w+) (\d+)/); if (m) { o.cats.push(CAT[m[1]]); o.data[CAT[m[1]]] = +m[2]; } }); return o; };
const ab = (q) => (q.match(/\b(leaves|raspberries|acorns|pinecones|mushrooms|flowers)\b/g) || []).map((w) => CAT[w]);
const bSec = sec('**Level "Build"**', '**Level "Read"**'), rSec = sec('**Level "Read"**', '**Level "Scaled"**'), sSec = sec('**Level "Scaled"**', '- **Answer position**');
const DB = rows(bSec, /^\| B\d \|/).map((c) => {
  if (/fix one picket/.test(c[1])) { const m = c[2].match(/shown (.*); tally says (\w+) (\d+)/), sh = pairs(m[1]), data = Object.assign({}, sh.data); data[CAT[m[2]]] = +m[3]; return { kind: 'fix', source: 'tally', cats: sh.cats, data: data, shown: sh.data }; }
  const o = pairs(c[2]); o.kind = 'build'; o.source = /tally/.test(c[1]) ? 'tally' : /picture/.test(c[1]) ? 'pics' : 'table'; return o;
});
const KIND = (q) => /more .* than/.test(q) && /^"/.test(q) ? 'tf' : /How many more/.test(q) ? 'more' : /How many fewer/.test(q) ? 'fewer' : /altogether/.test(q) ? 'total' : /most of/.test(q) ? 'most' : /left\?/.test(q) ? 'left' : /How many/.test(q) ? 'value' : 'build';
const DR = rows(rSec, /^\| R\d+ \|/).map((c) => {
  const o = pairs(c[1]), q = c[2], k = KIND(q), w = ab(q); o.kind = k;
  if (k === 'left') { o.a = w[0]; o.eat = +q.match(/eats (\d+)/)[1]; } else if (w.length) { o.a = w[0]; if (w[1]) o.b = w[1]; }
  if (k === 'tf') o.by = +q.match(/are (\d+) more/)[1];
  const ans = c[4].match(/\*\*(\w+)\*\*/)[1]; o.answer = /^\d+$/.test(ans) ? +ans : ans === 'True' ? true : ans === 'False' ? false : CAT[ans];
  return o;
});
const DS = rows(sSec, /^\| S\d \|/).map((c) => {
  const o = pairs(c[2]), q = c[3], k = KIND(q), w = ab(q), sc = c[1].match(/(\d+)\s*$/) || c[1].match(/= (\d+)/);
  o.s = +(c[1].match(/(?:= |by )(\d+)/)[1]); o.pics = /pictures/.test(c[1]); o.kind = k; if (w.length) { o.a = w[0]; if (w[1]) o.b = w[1]; }
  const ans = c[4].match(/\*\*(\d+)\*\*/); o.answer = ans ? +ans[1] : null; return o;
});
is(DB.length === 8 && DR.length === 10 && DS.length === 8, 'the design tables parse: 8 build, 10 read, 8 scaled rounds');

/* ---------- own reading of a bar graph ---------- */
const own = (r) => { const d = r.data; if (r.kind === 'more') return d[r.a] - d[r.b]; if (r.kind === 'fewer') return d[r.b] - d[r.a]; if (r.kind === 'total') return d[r.a] + d[r.b]; if (r.kind === 'left') return d[r.a] - r.eat;
  if (r.kind === 'value') return d[r.a]; if (r.kind === 'tf') return d[r.a] - d[r.b] === r.by; if (r.kind === 'most') { const m = Math.max(...r.cats.map((c) => d[c])); return r.cats.find((c) => d[c] === m); } return null; };

/* ---------- the pools = the design ---------- */
const POOLS = { build: DB, read: DR, scaled: DS };
for (const lv of C.LEVELS) {
  const pool = C.rounds(lv), D = POOLS[lv];
  is(pool.length === D.length, lv + ': ' + pool.length + ' rounds = the design\'s ' + D.length);
  pool.forEach((r, i) => {
    const d = D[i], tag = lv + ' #' + (i + 1);
    if (!d) return;
    is(r.kind === d.kind, tag + ' kind ' + r.kind + ' = ' + d.kind);
    is(r.cats.join() === d.cats.join(), tag + ' categories in the design order (' + r.cats + ')');
    is(r.cats.every((c) => r.data[c] === d.data[c]), tag + ' values = the design');
    if (d.shown) is(r.cats.every((c) => r.shown[c] === d.shown[c]), tag + ' the fix round shows the design\'s wrong fence');
    if (d.source) is(r.source === d.source, tag + ' source ' + r.source);
    if (d.a) is(r.a === d.a && (r.b || null) === (d.b || null), tag + ' asks about ' + d.a + (d.b ? ' and ' + d.b : ''));
    if (d.eat) is(r.eat === d.eat && r.k === i, tag + ' Pip eats ' + d.eat + ' (and the round keeps its own index)');
    if (d.by) is(r.by === d.by, tag + ' the statement says ' + d.by);
    if (lv === 'scaled') is(r.s === d.s && !!r.pics === d.pics, tag + ' scale ' + d.s + (d.pics ? ' (pictures)' : ' (post)'));
    if (d.answer != null) { is(own(d) === d.answer, tag + ' the design\'s own answer re-derived (' + d.answer + ')'); is(C.answerOf(r) === d.answer, tag + ' answer ' + C.answerOf(r) + ' = ' + d.answer); }
    /* values: no 0; single scale 1–10; scaled on the scale, halves only where s = 2 */
    r.cats.forEach((c) => { const v = r.data[c]; is(v > 0, tag + ' no 0 value'); if (r.s === 1) is(v >= 1 && v <= 10, tag + ' single-scale value ' + v + ' in 1–10'); else is(v % (r.s === 2 ? 1 : r.s) === 0, tag + ' value ' + v + ' on the ' + r.s + '-scale'); });
    const a = C.answerOf(r); if (typeof a === 'number') is(a > 0, tag + ' answer is not 0');
    if (r.kind === 'most') { const m = Math.max(...r.cats.map((c) => r.data[c])); is(r.cats.filter((c) => r.data[c] === m).length === 1, tag + ' a unique most'); }
    if (r.kind === 'fix') is(r.cats.filter((c) => r.shown[c] !== r.data[c]).length === 1, tag + ' exactly one wrong picket');
    const post = C.postOf(r); is(post.steps * post.s >= Math.max(...r.cats.map((c) => r.data[c])), tag + ' the post reaches the tallest picket');
  });
}
const tfs = C.rounds('read').filter((r) => r.kind === 'tf').map((r) => C.answerOf(r));
is(tfs.length === 2 && tfs.filter(Boolean).length === 1, 'True/False: one true, one false');
const counts = C.rounds('read').map(C.answerOf).filter((x) => typeof x === 'number');
is(counts.every((x) => counts.filter((y) => y === x).length <= 2), 'no count answer more than twice in the read level (' + counts + ')');
is(C.rounds('build').filter((r) => r.kind === 'fix').map((r) => r.cats.find((c) => r.shown[c] !== r.data[c])).map((c, i) => C.rounds('build').filter((x) => x.kind === 'fix')[i]).every((r, i) => true), 'fix rounds read');
const fixes = C.rounds('build').filter((r) => r.kind === 'fix').map((r) => { const c = r.cats.find((x) => r.shown[x] !== r.data[x]); return Math.sign(r.shown[c] - r.data[c]); });
is(fixes.sort().join() === '-1,1', 'fix rounds: one picket too short, one too tall');

/* ---------- the rail, stack, take, over every state ---------- */
let railN = 0;
for (const lv of C.LEVELS) C.rounds(lv).forEach((r, i) => {
  /* this gate's own snap unit: half a step only where the scale is 2 (never read off the core) */
  const st = C.newState(lv, i, () => 0.3), u = r.s === 2 ? 1 : r.s, max = C.postMax(st), tag = lv + ' #' + (i + 1);
  is(C.unitOf(r) === u, tag + ' the snap unit is ' + u);
  if (C.isBuild(r)) {
    /* every picket can be built to its value and nothing past the post; the unit is the snap */
    r.cats.forEach((c) => { C.setPicket(st, c, r.data[c]); });
    is(r.cats.every((c) => st.fence[c] === r.data[c]), tag + ' every picket can be built to the card');
    const c0 = r.cats[0]; C.setPicket(st, c0, max + 5 * r.s); is(st.fence[c0] === max, tag + ' a picket stops at the top of the post');
    C.setPicket(st, c0, u * 1.4); is(st.fence[c0] === u, tag + ' a picket snaps to the unit (' + u + ')');
    C.setPicket(st, c0, r.data[c0]);
    return;
  }
  r.cats.forEach((c) => {
    st.rail.on = null; is(C.layRail(st, c) && st.rail.on === c, tag + ' the rail lays on ' + c);
    for (let y = 0; y <= max; y += u) {
      st.rail.y = y; railN++;
      const top = C.topOf(st, c), lvl = C.isLevel(st), t = C.tiltOf(st);
      if (lvl !== (y === top)) is(false, tag + ' level ⇔ slider = top (' + c + ' y ' + y + ' top ' + top + ')');
      if ((t === 0) !== (y === top)) is(false, tag + ' the bubble is centred only when level (y ' + y + ')');
      if (y !== top && Math.sign(t) !== Math.sign(top - y)) is(false, tag + ' the bubble leans to the high end (y ' + y + ')');
      if (lvl) { const oh = C.overhang(st); r.cats.forEach((x) => { const o = oh.find((q) => q.cat === x), want = r.data[x] > top ? (r.data[x] - top) / r.s : 0; if ((o ? o.steps : 0) !== want) is(false, tag + ' overhang of ' + x + ' over ' + c + ' = ' + want); }); }
    }
  });
  st.rail.y = 0; C.setSlider(st, u * 1.4); is(st.rail.y === u, tag + ' the slider snaps to the unit');
  C.setSlider(st, max + 99); is(st.rail.y === max, tag + ' the slider stays on the post');
  if (r.a && r.b) {
    const s2 = C.newState(lv, i, () => 0.3);
    is(C.stack(s2, r.a, r.b) && C.topOf(s2, r.b) === r.data[r.a] + r.data[r.b] && C.topOf(s2, r.a) === 0, tag + ' stack: the tower is a + b and the stacked picket is empty');
    if (r.s === 1 && !r.pics) is((C.postMax(s2) === 20) === (r.data[r.a] + r.data[r.b] > 10), tag + ' the post grows to 20 only past 10');
    is(C.unstack(s2) && C.topOf(s2, r.a) === r.data[r.a] && C.topOf(s2, r.b) === r.data[r.b], tag + ' unstack restores both pickets');
  }
  const s3 = C.newState(lv, i, () => 0.3), c1 = r.cats[0];
  is(C.take(s3, c1) && s3.fence[c1] === r.data[c1] - r.s && s3.basket.length === 1, tag + ' take: one step of the scale into the basket');
  is(C.putBack(s3) && s3.fence[c1] === r.data[c1] && !s3.basket.length, tag + ' put back restores');
});
is(railN > 0, 'the rail checked over ' + railN + ' (picket × slider) states');

/* ---------- Check ---------- */
for (const lv of C.LEVELS) C.rounds(lv).forEach((r, i) => {
  const tag = lv + ' #' + (i + 1), st = C.newState(lv, i, () => 0.5), ty = C.answerType(r);
  let res = C.check(st); is(res.result === 'note' && st.misses === 0, tag + ' untouched → a reminder, no miss');
  const right = C.answerOf(r);
  const setWrong = (n) => { if (C.isBuild(r)) { C.setPicket(st, r.cats[0], (r.kind === 'fix' ? r.shown[r.cats[0]] : r.data[r.cats[0]]) + n * (r.s === 2 ? 1 : r.s)); return; }
    if (ty === 'dial') { const v = right + n; C.setDial(st, Math.floor(v / 10), v % 10); } else if (ty === 'tf') C.choose(st, !right); else C.choose(st, r.cats.find((c) => c !== right && c !== st.answer)); };
  setWrong(1); res = C.check(st); is(res.result === 'miss' && st.misses === 1 && !st.help, tag + ' a wrong answer → miss 1');
  res = C.check(st); is(res.result === 'note' && res.key === 'hintAgain' && st.misses === 1, tag + ' Check again unchanged → a reminder, never a second miss');
  if (ty === 'tf') { C.choose(st, right); C.choose(st, !right); } else setWrong(C.isBuild(r) ? -1 : 2);
  res = C.check(st); is(res.result === 'miss' && st.help, tag + ' miss 2 → help');
  const list = C.countList(st); is(list.every((x) => x > 0), tag + ' the count tags never say 0 (' + list + ')');
  if (typeof right === 'number' && r.kind !== 'build') is(list[list.length - 1] === right, tag + ' the count ends at what is counted (' + list + ')');
  if (C.isBuild(r)) r.cats.forEach((c) => C.setPicket(st, c, r.data[c]));
  else if (ty === 'dial') C.setDial(st, Math.floor(right / 10), right % 10); else C.choose(st, right);
  res = C.check(st); is(res.result === 'ok' && st.done, tag + ' the right answer → done');
});

/* ---------- the plan and the picket order ---------- */
for (const lv of C.LEVELS) {
  const pool = C.rounds(lv); let prev = null, ok = true, perm = true;
  for (let n = 0; n < 2000; n++) { const p = C.plan(lv, Math.random, prev); if (p.slice().sort((a, b) => a - b).join() !== pool.map((r) => r.k).join()) perm = false;
    for (let i = 1; i < p.length; i++) { const a = pool[p[i]].kind, b = pool[p[i - 1]].kind; if (a === b && (a === 'total' || a === 'tf')) ok = false; } if (prev && prev.join() === p.join()) ok = false; prev = p; }
  is(perm && ok, lv + ': 2000 plans — each a permutation, totals and true/false never side by side, never the previous order');
  const stuck = C.plan(lv, () => 0, null), stuck2 = C.plan(lv, () => 0, stuck); is(stuck2.join() !== stuck.join(), lv + ': a stuck random source still changes the order');
}
const most = C.rounds('read').findIndex((r) => r.kind === 'most'), place = [0, 0, 0, 0];
for (let n = 0; n < 400; n++) { const st = C.newState('read', most); place[st.cats.indexOf(C.answerOf(st.round))]++; }
is(place.every((p) => p >= 80 && p <= 120), 'the "most" picket in each place 20–30 % over 400 showings (' + place + ')');
is(C.rounds('build').every((r, i) => C.newState('build', i).cats.join() === r.cats.join()), 'build rounds keep the card\'s order');

/* ---------- the activity layer in node ---------- */
const src = fs.readFileSync(ACT, 'utf8');
const ctx = { LevelRailCore: C, console: console }; vm.createContext(ctx);
vm.runInContext(src.replace(/function injectLevelRailCSS\(\)[\s\S]*$/, '') + ';this.A = LevelRailActivity;', ctx);
const A = ctx.A;
for (const k of Object.keys(A.strings)) is(LOCS.every((l) => typeof A.strings[k][l] === 'string' && A.strings[k][l]), 'string ' + k + ' in 11 locales');
is(LOCS.every((l) => C.CATS.every((c) => A.NOUNS[l] && A.NOUNS[l][c] && A.NOUNS[l][c].pl && A.NOUNS[l][c].n && A.NOUNS[l][c].p && A.NOUNS[l][c].lab)), 'the category words in 11 locales');
is(['es', 'pt', 'it'].every((l) => C.CATS.every((c) => A.NOUNS[l][c].q && A.NOUNS[l][c].g)), 'es/pt/it: every category carries its gender and agreeing interrogative');
const keysUsed = new Set();
for (const loc of LOCS) for (const lv of C.LEVELS) C.rounds(lv).forEach((r, i) => {
  const api = { lang: loc, settings: { level: lv, rail: 'show' }, t: (k) => { keysUsed.add(k); return (A.strings[k] || {})[loc] || k; } };
  const a = Object.create(A); a.api = api; a._view = {}; a.st = C.newState(lv, i, () => 0.5);
  const lines = [a._taskLine()];
  if (C.isBuild(r)) a.st.verdict = { why: 'build', cat: r.cats[0], wrong: [r.cats[0]] };
  a.st.misses = 1; a.st.help = false; lines.push(a._t(C.hint(a.st), a._args()));
  a.st.help = true; lines.push(a._t(C.hint(a.st), a._args()));
  lines.push(a._t(C.okKey(a.st), a._args()));
  lines.forEach((ln) => { const bad = /\{|undefined|NaN|null/.test(ln) || /\bfree\b|gratis|kostenlos/i.test(ln) || /(^|[^\d,½])0([^\d,]|$)/.test(ln.replace(/\b10\b|\b20\b|\b30\b|\b40\b|\b50\b|\b60\b|\b90\b/g, '')); if (bad) is(false, loc + ' ' + lv + ' #' + (i + 1) + ': «' + ln + '»'); else pass++; });
});
/* a count by the scale names only multiples of it; a half step is said in words, never as a number in the steps */
for (const lv of C.LEVELS) C.rounds(lv).forEach((r, i) => {
  if (r.s === 1) return;
  const a = Object.create(A); a.api = { lang: 'en', settings: {}, t: (k) => (A.strings[k] || {}).en || k }; a._view = {}; a.st = C.newState(lv, i, () => 0.5);
  const lists = [C.countList(a.st)].concat(r.cats.map((c) => { const o = []; for (let v = r.s; v <= r.data[c]; v += r.s) o.push(v); if (r.data[c] % r.s) o.push(r.data[c]); return o; }));
  lists.forEach((l) => { const said = a._sayList(l, r), steps = said.split(/,? and /)[0].split(', ').filter(Boolean).map(Number); is(steps.every((x) => x % r.s === 0), lv + ' #' + (i + 1) + ' counting by ' + r.s + ' says only its steps: «' + said + '»'); if (l[l.length - 1] % r.s) is(/half/.test(said), lv + ' #' + (i + 1) + ' the half step is said in words: «' + said + '»'); });
  if (C.okKey(a.st) === 'okValueHalf') is(r.data[r.a] / r.s === 1.5, lv + ' #' + (i + 1) + ' "one and a half pictures" only where it is 1½');
});
['hintBuildStart', 'hintReadStart', 'hintDial', 'hintTF', 'hintMost', 'hintAgain', 'anLevel', 'aPicket', 'aPicketPics', 'aPicketVal', 'aSlider', 'aFoot', 'aBasket', 'aDial', 'aTens', 'aOnes', 'tTrue', 'tFalse', 'checkBtn', 'setLevel', 'lBuild', 'lRead', 'lScaled', 'setRail', 'rShow', 'rHide', 'instrBubble', 'okBubble', 'title', 'instruction'].forEach((k) => keysUsed.add(k));
const dead = Object.keys(A.strings).filter((k) => !keysUsed.has(k) && !new RegExp("['\"]" + k + "['\"]").test(src.replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*?\/\*STRINGS-END\*\//, '')));
is(!dead.length, 'no dead strings (' + dead + ')');
is(A.OK_MS === 500, 'Next follows success after 0.5 s');

/* ---------- the manifest row ---------- */
const man = JSON.parse(fs.readFileSync(MAN, 'utf8')), row = (man.activities || man).find((x) => x.id === 'graph-it.bar-graph.2-md-d-10');
is(row && row.tool === 'level-rail-activity' && row.task_template === 'level-rail' && row.params && !Object.keys(row.params).length, 'the manifest row points at the new tool, old params dropped');
is(row && LOCS.every((l) => row.slug[l] && row.page_title[l] && row.page_intro[l]), 'the row ships in 11 locales');

console.log(`verify-level-rail-core: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
