#!/usr/bin/env node
/* =====================================================================
   verify-tide-plot-core.js — the logic gate of ACTIVITY #167, The Tide
   You Push ("Shelly's Tide-Line", 2.MD.D.9). Its ground truth is the
   design file's own §6 tables (docs/activities-rebuild/designs/
   167-line-plot.md), parsed here, with this gate's own reading of a line
   plot — never the tool's tables. It checks:
     · every read round = the design's data set, question and answer; the
       answers re-derived (no 0; unique modes; the mode never equal to its
       own count; no count answer in more than 30 % of a level's rounds);
     · every tide state (left shore × right shore × sea level) of every read
       round: the tool's verdict equals this gate's — "longer than n" never
       accepted with the n column dry, the range only with both shores
       touching, the mode only with one stack sticking out; at least one
       accepted tide exists and the canonical tide is accepted;
     · Check: tide wrong + the right number is still a miss; tide right +
       wrong number → "count the dry ones"; untouched → a reminder; Check
       again unchanged is never a second miss; miss 2 moves the sea itself;
     · measure: shells, offsets and plots = the design; zeroing needed in 11
       of 16 whole-cm shells; the unzeroed edge never equals the length when
       the offset is not 0; the slide snaps to the stop and stays on the
       ruler; a shell drops only on a number; undrop returns it where it was
       measured; the two misses; success only with every shell on its length;
     · the shell is drawn by its INK box (ink width = length × px per cm);
     · the plan (mode / range rounds never side by side, a stuck random
       source); the strings (11 locales, placeholders, no "free"); the
       manifest row (11 locales, old params dropped).
   Env overrides (the mutation script): TP_CORE, TP_ACT, TP_MAN.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const REPO = path.join(__dirname, '..');
const C = require(process.env.TP_CORE || path.join(REPO, 'mini tools', 'tide-plot-core.js'));
const ACT = process.env.TP_ACT || path.join(REPO, 'mini tools', 'tide-plot-activity.js');
const MAN = process.env.TP_MAN || path.join(REPO, 'mini tools', 'line-plot-activities.json');
let pass = 0, fail = 0;
const is = (c, m) => { if (c) pass++; else { fail++; if (fail < 60) console.error('  FAIL: ' + m); } };
const num = (s) => { s = s.trim(); return s.endsWith('½') ? (parseInt(s, 10) || 0) * 2 + 1 : parseInt(s, 10) * 2; };
const list = (s) => s.split(/[ ,]+/).filter(Boolean).map(num);

/* ---------- the design tables, parsed ---------- */
const md = fs.readFileSync(path.join(REPO, 'docs', 'activities-rebuild', 'designs', '167-line-plot.md'), 'utf8');
const sec = (a, b) => md.slice(md.indexOf(a), md.indexOf(b, md.indexOf(a)));
const rows = (txt, re) => txt.split('\n').filter((l) => re.test(l)).map((l) => l.split(/(?<!\\)\|/).slice(1, -1).map((c) => c.trim()));
const readSec = sec('**Level "Read the tide-line"**', '**Level "Measure and plot"**');
const SETS = {}; (readSec.match(/D\d \[[\d,]+\]/g) || []).forEach((m) => { const [, n, d] = m.match(/(D\d) \[([\d,]+)\]/); SETS[n] = list(d); });
const KIND = (q) => /most common/.test(q) ? 'mode' : /longest shell than the shortest/.test(q) ? 'range' : /How many more/.test(q) ? 'more' : /longer than/.test(q) ? 'longer' : /shorter than/.test(q) ? 'shorter' : 'at';
const ns = (q) => (q.match(/(\d+½?) cm/g) || []).map((x) => num(x.replace(' cm', '')));
const DR = rows(readSec, /^\| R\d+ \|/).map((c) => { const k = KIND(c[2]), n = ns(c[2]); return { data: SETS[c[1]], kind: k, n: n[0] == null ? null : n[0], b: n[1] == null ? null : n[1], answer: +c[4].match(/\*\*(\d+)\*\*/)[1] }; });
const DM = rows(sec('**Level "Measure and plot"**', '**Level "Halves"**'), /^\| M\d \|/).map((c) => { const sh = (s) => { const m = s.match(/(\d+½?) cm, at (\d+)/); return { len: num(m[1]), off: num(m[2]) }; }; return { plot: list(c[1]), shells: [sh(c[2]), sh(c[3])], final: list(c[4]) }; });
const DH = rows(sec('**Level "Halves"**', '- **Answer position**'), /^\| H\d \|/).map((c) => {
  if (c[1] === 'measure') { const m = c[2].match(/plot ([\d½, ]+) · shell (\d+½?) cm at (\d+)/); return { kind: 'measure', plot: list(m[1]), len: num(m[2]), off: num(m[3]), x: num(c[3].replace('X on', '')) }; }
  const m = c[2].match(/\[([\d½,]+)\] — (.*)$/); const k = KIND(m[2]); return { kind: k, data: list(m[1]), n: ns(m[2])[0] == null ? null : ns(m[2])[0], answer: +c[3].match(/\*\*(\d+)\*\*/)[1] };
});
is(Object.keys(SETS).length === 4 && DR.length === 10 && DM.length === 8 && DH.length === 8, 'the design tables parse: 4 data sets, 10 read rounds, 8 measure rounds, 8 halves rounds');

/* ---------- own reading of a line plot ---------- */
const cnt = (d, v) => d.filter((x) => x === v).length;
const own = (r) => { const d = r.data; if (r.kind === 'at') return cnt(d, r.n); if (r.kind === 'longer') return d.filter((x) => x > r.n).length; if (r.kind === 'shorter') return d.filter((x) => x < r.n).length;
  if (r.kind === 'range') return (Math.max(...d) - Math.min(...d)) / 2; if (r.kind === 'more') return cnt(d, r.n) - cnt(d, r.b);
  const vals = [...new Set(d)], top = Math.max(...vals.map((v) => cnt(d, v))), m = vals.filter((v) => cnt(d, v) === top); return m.length === 1 ? m[0] : NaN; };

const R = C.rounds('read'), Hh = C.rounds('halves'), M = C.rounds('measure');
const checkRead = (level, r, d, tag) => {
  is(r.kind === d.kind && r.data.join() === d.data.join() && r.n === d.n && (d.b == null || r.b === d.b), tag + ': = the design (' + d.kind + ')');
  const a = own(r);
  is(C.answerOf(r) === a && (r.kind === 'mode' ? a / 2 === d.answer : a === d.answer), tag + ': the answer ' + d.answer + ' re-derived');
  is(r.kind === 'mode' ? a > 0 && cnt(r.data, a) !== a / 2 : a >= 1, tag + ': no 0 answer' + (r.kind === 'mode' ? '; the mode is never its own count' : ''));
  /* every tide state against this gate's own rule */
  const st0 = C.newState(level, r.k), n = st0.cols.length, top = Math.max(...C.heights(st0));
  let accepted = 0, bad = 0;
  for (let L = 0; L <= n; L++) for (let Rr = 0; L + Rr <= n; Rr++) for (let S = 0; S <= top; S++) {
    const st = C.newState(level, r.k); st.tide = { L, R: Rr, S };
    const dryV = []; const h = {}; r.data.slice().sort((x, y) => x - y).forEach((v) => { const i = st.cols.indexOf(v); h[i] = (h[i] || 0) + 1; if (i >= L && i < n - Rr && h[i] > S) dryV.push({ v, row: h[i] }); });
    let want;
    if (r.kind === 'at') want = dryV.length === cnt(r.data, r.n) && dryV.every((x) => x.v === r.n);
    else if (r.kind === 'longer') want = dryV.length === r.data.filter((x) => x > r.n).length && dryV.every((x) => x.v > r.n);
    else if (r.kind === 'shorter') want = dryV.length === r.data.filter((x) => x < r.n).length && dryV.every((x) => x.v < r.n);
    else if (r.kind === 'mode') want = dryV.length > 0 && dryV.every((x) => x.v === a);
    else if (r.kind === 'range') want = L === st.cols.indexOf(Math.min(...r.data)) && Rr === n - 1 - st.cols.indexOf(Math.max(...r.data)) && S === 0;
    else if (r.kind === 'more') want = dryV.length === cnt(r.data, r.n) - cnt(r.data, r.b) && dryV.every((x) => x.v === r.n && x.row > cnt(r.data, r.b));
    if (C.tideRight(st) !== want) bad++;
    if (want) accepted++;
    if (r.kind === 'longer' && dryV.some((x) => x.v === r.n) && C.tideRight(st)) bad++;
  }
  is(bad === 0 && accepted >= 1, tag + ': every tide state judged as this gate judges it (' + accepted + ' accepted)');
  const sc = C.newState(level, r.k); sc.tide = C.canonicalTide(sc); is(C.tideRight(sc), tag + ': the tide miss 2 moves to is accepted');
};
DR.forEach((d, i) => checkRead('read', R[i], d, 'R' + (i + 1)));
DH.forEach((d, i) => { if (d.kind !== 'measure') checkRead('halves', Hh[i], d, 'H' + (i + 1)); });
/* answer spread: no count answer value in more than 30 % of a level's rounds */
{ const vals = R.filter((r) => r.kind !== 'mode').map(C.answerOf), share = Math.max(...vals.map((v) => vals.filter((x) => x === v).length)) / R.length;
  is(share <= 0.3, 'read: no count answer in more than 30 % of the rounds (' + (share * 100).toFixed(0) + ' %)'); }
/* the misconception tides */
{ const st = C.newState('read', 2); st.tide = { L: 4, R: 0, S: 0 }; is(C.tideRight(st), 'R3 longer than 4: the sea over 1–4 is right'); st.tide = { L: 5, R: 0, S: 0 }; is(!C.tideRight(st), 'R3: the sea over the 5s too is not');
  st.tide = { L: 3, R: 0, S: 0 }; is(C.tideRight(st) === (cnt(st.round.data, 8) === 0), 'R3: the 4 column holds no X, so L=3 and L=4 leave the same dry set'); }
{ const st = C.newState('read', 6); st.tide = { L: 1, R: 0, S: 0 }; is(C.tideRight(st), 'R7 range: both shores touching (2 and 8) is accepted'); st.tide = { L: 0, R: 0, S: 0 }; is(!C.tideRight(st), 'R7 range: shores out is not'); }

/* ---------- Check ---------- */
for (const level of ['read', 'halves']) C.rounds(level).forEach((r) => {
  if (r.kind === 'measure') return; const tag = level + ' ' + r.k + ' ' + r.kind;
  const a = C.newState(level, r.k); is(C.check(a).key === 'hintStart' && a.misses === 0, tag + ': untouched → a reminder, no miss');
  const b = C.newState(level, r.k); C.choose(b, C.answerOf(r)); const rb = C.check(b);
  const tideOk0 = C.tideRight(b);
  is(tideOk0 ? rb.result === 'ok' : rb.result === 'miss' && rb.why === 'tide', tag + ': the right number with the wrong tide is ' + (tideOk0 ? 'accepted (the open beach is already right)' : 'still a miss'));
  const c = C.newState(level, r.k); c.tide = C.canonicalTide(c); is(C.check(c).key === 'hintAnswer', tag + ': the right tide, no answer → hintAnswer');
  const wrong = r.kind === 'mode' ? c.cols.find((v) => v !== C.answerOf(r)) : (C.answerOf(r) % 8) + 1;
  C.choose(c, wrong); const rc = C.check(c); is(rc.result === 'miss' && rc.why === 'answer' && C.hint(c) === (r.kind === 'range' ? 'hintCountSteps' : r.kind === 'mode' ? 'hintModeNumber' : 'hintCountDry'), tag + ': the right tide, a wrong answer → ' + C.hint(c));
  is(C.check(c).key === 'hintAgain' && c.misses === 1, tag + ': Check again unchanged → hintAgain, no second miss');
  C.setShore(c, 'L', 0); C.setShore(c, 'R', 0); C.setSea(c, 0); C.choose(c, C.answerOf(r) === 1 ? 2 : r.kind === 'mode' ? c.cols[0] : 1); C.check(c);
  const can = C.canonicalTide(c);
  is(c.misses === 2 && c.help && c.tide.L === can.L && c.tide.R === can.R && c.tide.S === can.S, tag + ': miss 2 moves the sea to the answer\'s tide');
  C.choose(c, C.answerOf(r)); is(C.check(c).result === 'ok' && c.done, tag + ': then the right answer → success');
});
/* the shores never cross; the sea stays within the stacks */
{ const st = C.newState('read', 0); C.setShore(st, 'L', 6); C.setShore(st, 'R', 5); is(st.tide.L + st.tide.R <= st.cols.length, 'the shores never cross'); C.setSea(st, 99); is(st.tide.S === Math.max(...C.heights(st)), 'the sea stops at the top of the tallest stack'); C.setShore(st, 'L', -3); is(st.tide.L === 0, 'a shore never goes past the beach end'); }

{ const st = C.newState('read', 0); C.setShore(st, 'L', 2.4); C.setSea(st, 1.6); is(st.tide.L === 2 && st.tide.S === 2, 'a shore stops only in a gap between numbers, the sea only at a row (never on a column)'); }
/* ---------- measure ---------- */
let zeroNeeded = 0, offs = { 0: 0, 2: 0, 4: 0 };
DM.forEach((d, i) => {
  const r = M[i], tag = 'M' + (i + 1);
  is(r.data.join() === d.plot.join() && r.shells.map((s) => s.len + '@' + s.off).join() === d.shells.map((s) => s.len + '@' + s.off).join(), tag + ': = the design (plot ' + d.plot.map((x) => x / 2) + ')');
  is(r.data.concat(r.shells.map((s) => s.len)).sort((a, b) => a - b).join() === d.final.join(), tag + ': the final plot = the design');
  r.shells.forEach((s) => { offs[s.off]++; if (s.off) { zeroNeeded++; is(s.off + s.len !== s.len, tag + ': the unzeroed edge (' + (s.off + s.len) / 2 + ') is not the length'); } is(s.off + s.len <= C.RULER.measure, tag + ': the shell fits the 0–9 ruler'); });
  /* the play: dropping where the unzeroed edge ends is a miss (zero), at the length a success */
  const st = C.newState('measure', r.k);
  st.shells.forEach(() => { const j = C.boardShell(st), s = st.shells[j]; C.drop(st, st.cols.indexOf(s.off + s.len) >= 0 ? s.off + s.len : st.cols[st.cols.length - 1]); });
  const res = C.check(st), anyOff = r.shells.some((s) => s.off);
  is(anyOff ? res.result === 'miss' && res.why === 'zero' && C.hint(st) === 'hintZero' : res.result === 'ok', tag + ': drops at the unzeroed edges → ' + (anyOff ? 'a miss (slide to 0 first)' : 'right (both arrived at 0)'));
  const s2 = C.newState('measure', r.k); s2.shells.forEach(() => { const j = C.boardShell(s2); C.slide(s2, 0); is(C.edgeAt(s2.shells[j]) === s2.shells[j].len, tag + ': from the stop the edge reads the length'); C.drop(s2, s2.shells[j].len); });
  is(C.check(s2).result === 'ok' && s2.done, tag + ': both on their lengths → success');
});
is(zeroNeeded === 11 && offs[0] === 5 && offs[2] === 6 && offs[4] === 5, 'measure: offsets 0/1/2 cm = 5/6/5, zeroing needed in 11 of 16 (' + JSON.stringify(offs) + ')');
{ const st = C.newState('measure', 0); is(C.check(st).key === 'hintMeasureFirst', 'measure: nothing dropped → a reminder');
  C.slide(st, 2); is(st.shells[0].pos === 0, 'the slide snaps to the stop within 3 mm');
  C.slide(st, 999); is(st.shells[0].pos === (C.RULER.measure - st.shells[0].len) * 5, 'the slide stays on the ruler');
  is(C.drop(st, 7) === null && C.drop(st, 10) === 0, 'a shell drops only on a number of the beach (3½ cm is refused on a whole-cm beach)');
  is(C.check(st).key === 'hintNextShell', 'one shell dropped → measure the next');
  const pos = st.shells[0].droppedAt; C.undrop(st, 0); is(st.shells[0].col === null && st.shells[0].pos === pos, 'a dropped shell flies back to where it was measured');
  C.slide(st, 0); C.drop(st, st.shells[0].len + 2); C.slide(st, 0); C.drop(st, st.shells[1].len); const r1 = C.check(st);
  is(r1.result === 'miss' && r1.why === 'edge' && st.shells[0].col === null && st.shells[1].col !== null, 'zeroed but misread → "look at the edge", only the wrong shell comes back');
  C.drop(st, st.shells[0].len + 2); C.check(st); is(st.help && st.shells[0].pos === 0 && C.hint(st) === 'helpMeasure', 'miss 2: the shell slides to the stop, the guide line'); }
DH.forEach((d, i) => { if (d.kind !== 'measure') return; const r = Hh[i]; is(r.shells.length === 1 && r.shells[0].len === d.len && r.shells[0].off === d.off && d.x === d.len && r.data.join() === d.plot.join(), 'H' + (i + 1) + ': = the design (shell ' + d.len / 2 + ' cm at ' + d.off / 2 + ')'); is(d.len + d.off <= C.RULER.halves, 'H' + (i + 1) + ': fits the 0–6 ruler'); });

/* ---------- the plan ---------- */
for (const level of C.LEVELS) {
  const pool = C.rounds(level); let prev = null;
  for (let p = 0; p < 40; p++) { const o = C.plan(level, Math.random, prev); is(o.length === pool.length && new Set(o).size === pool.length && (!prev || o.join() !== prev.join()), level + ': a reshuffle, never the previous order');
    is(o.every((k, i) => i === 0 || !(pool[k].kind === pool[o[i - 1]].kind && (pool[k].kind === 'mode' || pool[k].kind === 'range'))), level + ': two mode / range rounds never side by side'); prev = o; }
  const s0 = C.plan(level, () => 0, null), s1 = C.plan(level, () => 0, s0); is(s1.join() !== s0.join(), level + ': a stuck random source still gets a new order');
}

/* ---------- the activity layer: strings, the ink box ---------- */
const ctx = { window: {}, TidePlotCore: C, setTimeout: () => 0 }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(ACT, 'utf8').replace(/injectTidePlotCSS\(\);/, '') + '\n;this.__A = TidePlotActivity;', ctx);
const A = ctx.__A, LOC = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'], keys = Object.keys(A.strings);
is(keys.length >= 55, 'the strings block holds ' + keys.length + ' keys');
for (const k of keys) for (const l of LOC) {
  const s = A.strings[k][l], ph = (x) => (x.match(/\{\w+\}/g) || []).sort().join();
  is(typeof s === 'string' && s.length > 0, k + ' [' + l + '] authored'); if (typeof s !== 'string') continue;
  is(ph(s) === ph(A.strings[k].en), k + ' [' + l + '] carries the same placeholders as en');
  is(!/(?<!\p{L})(free|gratis|kostenlos|gratuit|gratuito|ilmainen|gratuita)(?!\p{L})/iu.test(s), k + ' [' + l + '] says nothing is free');
  if (l === 'fr') is(!/ [?!:;]/.test(s), k + ' [fr] a narrow no-break space before ? ! : ;');
}
const src = fs.readFileSync(ACT, 'utf8').replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*?\/\*STRINGS-END\*\//, ''), coreSrc = fs.readFileSync(process.env.TP_CORE || path.join(REPO, 'mini tools', 'tide-plot-core.js'), 'utf8');
for (const k of keys) is(['title', 'instruction', 'instrBubble', 'okBubble'].includes(k) || src.includes("'" + k + "'") || coreSrc.includes("'" + k + "'"), 'the key ' + k + ' is reached by the code');
{ const m = src.match(/\.tp-x\.is-wet\{[^}]*opacity:\s*([\d.]+)/); is(m && +m[1] >= 0.5 && !/\.tp-x\.is-wet\{[^}]*(display:\s*none|visibility:\s*hidden)/.test(src), "X's under water turn blue but stay visible (opacity " + (m && m[1]) + ')'); }
is(/OK_MS: 500/.test(src), 'Next appears 0.5 s after success (OK_MS 500)');
/* the shell is drawn by its ink box: ink width = length × px per cm (± 1 px) at every board scale */
for (const ppc of [24, 30, 37, 48]) for (const len of [5, 6, 7, 8, 9, 10, 12, 14]) { const box = Math.round(len / 2 * ppc / A.INK.frac); is(Math.abs(box * A.INK.frac - len / 2 * ppc) <= 1, 'ink width of a ' + len / 2 + ' cm shell at ' + ppc + ' px/cm'); }
is(Math.abs(A.INK.frac - 980 / 1024) < 1e-9 && Math.abs(A.INK.inset - 22 / 1024) < 1e-9, 'the seashell\'s measured ink box (980 of 1024 px, 22 px inset)');
{ const a = Object.create(A); a.api = { lang: 'de', t: (k) => A.strings[k].de }; is(a._len(9) === '4½' && a._len(10) === '5' && a._dec(9) === '4,5' && Object.assign(Object.create(A), { api: { lang: 'en' } })._dec(9) === null, 'halves: «4½», the locale decimal «4,5» (none in en)'); }
/* ---------- the manifest row ---------- */
const row = JSON.parse(fs.readFileSync(MAN, 'utf8')).find((x) => x.id === 'line-plot.read.2-md-d-9');
is(row && row.tool === 'tide-plot-activity' && row.task_template === 'tide-plot' && JSON.stringify(row.params) === '{}', 'the manifest row points at the new tool, old params dropped');
is(row && LOC.every((l) => row.slug[l] && row.page_title[l] && row.page_intro[l]) && row.alignment.code === '2.MD.D.9', 'the row ships in 11 locales (da/no/fi new), 2.MD.D.9');
console.log(`verify-tide-plot-core: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
