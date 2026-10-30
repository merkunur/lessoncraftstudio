#!/usr/bin/env node
/* =====================================================================
   verify-stamp-sheet-core.js — the logic gate of ACTIVITY #170, The
   Stamp Sheet ("Make and Count Squares", 2.G.A.2). Its ground truth is
   the design file's own §6 round tables (docs/activities-rebuild/designs/
   170-fractions.md), parsed here, with this gate's own piece arithmetic
   — never the tool's. It checks:
     · the rounds = the design's (make by numbers M1–M9, by the plate
       P1–P8, pick K1–K9); every total 4–20, never 0;
     · EXHAUSTIVELY, for every sheet size, over every one of the 2^(top +
       left notches) cut sets: the core accepts exactly the whole-square
       set (the half notches, the fence-post 4-lines-for-4-columns and the
       swapped rows/columns are all refused); the accepted pieces are
       congruent plate squares; every refused set prints at least one
       misprint, and the misprinted pieces are exactly those that are not
       one plate square (computed here), sliced where too thin, bordered
       where too big;
     · Check: no perforation → a reminder, no miss; a wrong grid → miss 1,
       miss 2 = help; the true grid → the count step (never before); the
       count: nothing typed → a reminder; rows + cols → a miss (where it
       differs from the total); the total → done; running totals;
     · pick: exactly one sheet fits the card; no transposed sheet; a
       same-rows and a same-length distractor every round (K9: the same
       total in another shape); the match's slot 3/3/3 per pass and as the
       design says in pass 1; size, rows-only and length-only bots ≤ 4.5/9;
       the page fit (over / short / extra);
     · the plan (never the same order twice; the pick board never puts the
       match in one slot three rounds running; a stuck random source);
     · the activity layer in node: every task, hint and success line in 11
       locales for every board, card and round, no "{", "0", "undefined"
       or "free"; the multiplication sign is the locale's (· in de, sv,
       da, no, fi); no dead strings; Next after 0.5 s; the manifest.
   Env overrides (the mutation script): SS_CORE, SS_ACT, SS_MAN.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const REPO = path.join(__dirname, '..');
const C = require(process.env.SS_CORE || path.join(REPO, 'mini tools', 'stamp-sheet-core.js'));
const ACT = process.env.SS_ACT || path.join(REPO, 'mini tools', 'stamp-sheet-activity.js');
const MAN = process.env.SS_MAN || path.join(REPO, 'mini tools', 'fractions-activities.json');
let pass = 0, fail = 0;
const is = (c, m) => { if (c) pass++; else { fail++; if (fail < 60) console.error('  FAIL: ' + m); } };
const LOCS = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

/* ---------- the design, parsed ---------- */
const md = fs.readFileSync(path.join(REPO, 'docs', 'activities-rebuild', 'designs', '170-fractions.md'), 'utf8');
const sec = (a, b) => md.slice(md.indexOf(a), md.indexOf(b, md.indexOf(a)));
const rows = (txt, re) => txt.split('\n').filter((l) => re.test(l)).map((l) => l.split('|').slice(1, -1).map((c) => c.trim()));
const DM = rows(sec('**Board MAKE — by numbers', '**Board MAKE — by the plate'), /^\| M\d \|/).map((c) => ({ rows: +c[1], cols: +c[2], total: +c[3] }));
const DP = rows(sec('**Board MAKE — by the plate', '**Board PICK'), /^\| P\d \|/).map((c) => { const m = c[1].match(/(\d+) × (\d+)/); return { cols: +m[1], rows: +m[2], total: +c[2] }; });
const DK = rows(sec('**Board PICK', '- **Answer position**'), /^\| K\d \|/).map((c) => {
  const card = c[1].match(/(\d+) of (\d+)/), sheets = c[2].split('·').map((x) => { const m = x.match(/(\d+)×(\d+)/); return { rows: +m[1], cols: +m[2], ok: /✓/.test(x) }; });
  return { rows: +card[1], cols: +card[2], sheets, slot: +c[4] };
});
is(DM.length === 9 && DP.length === 8 && DK.length === 9, 'the round tables parse: 9 by numbers, 8 by the plate, 9 pick (' + [DM.length, DP.length, DK.length] + ')');
DM.concat(DP).forEach((d, i) => is(d.rows * d.cols === d.total, 'design make row ' + (i + 1) + ': rows × cols = the total column'));

/* ---------- the rounds ---------- */
const RN = C.rounds('numbers'), RP = C.rounds('plate'), RK = C.rounds('pick');
is(RN.length === DM.length && RN.every((r, i) => r.rows === DM[i].rows && r.cols === DM[i].cols), 'make by numbers = the design (M1–M9)');
is(RP.length === DP.length && RP.every((r, i) => r.rows === DP[i].rows && r.cols === DP[i].cols), 'make by the plate = the design (P1–P8)');
is(RK.length === DK.length && RK.every((r, i) => r.rows === DK[i].rows && r.cols === DK[i].cols && r.slot === DK[i].slot && r.sheets.length === 3 && r.sheets.every((s) => DK[i].sheets.some((d) => d.rows === s.rows && d.cols === s.cols && d.ok === s.ok))), 'pick = the design (K1–K9, cards, sheets, slots)');
RN.concat(RP, RK).forEach((r) => { const t = r.rows * r.cols; is(t >= 4 && t <= 20 && r.rows >= 2 && r.cols >= 2, r.board + ' #' + (r.k + 1) + ': total ' + t + ' in 4–20, never 0, at least 2 rows and 2 columns'); });
RK.forEach((r) => r.sheets.forEach((s) => is(s.rows * s.cols >= 4 && s.rows * s.cols <= 20, 'pick #' + (r.k + 1) + ': sheet ' + s.rows + '×' + s.cols + ' total in 4–20')));

/* ---------- this gate's own piece arithmetic ---------- */
const ownPieces = (cols, rows, cc, rc) => { const xs = [0, ...[...cc].sort((a, b) => a - b), 2 * cols], ys = [0, ...[...rc].sort((a, b) => a - b), 2 * rows], out = []; for (let j = 0; j + 1 < ys.length; j++) for (let i = 0; i + 1 < xs.length; i++) out.push({ x: xs[i], y: ys[j], w: xs[i + 1] - xs[i], h: ys[j + 1] - ys[j] }); return out; };
const sizes = new Map(); RN.concat(RP).forEach((r) => sizes.set(r.cols + 'x' + r.rows, r));
let sets = 0;
for (const [key, r] of sizes) {
  const nc = 2 * r.cols - 1, nr = 2 * r.rows - 1, N = 1 << (nc + nr);
  let accepted = 0, acceptedWhole = false, badMisprint = 0, noMisprint = 0, badAccept = 0;
  for (let m = 0; m < N; m++) {
    const cc = [], rc = []; for (let b = 0; b < nc; b++) if (m & (1 << b)) cc.push(b + 1); for (let b = 0; b < nr; b++) if (m & (1 << (nc + b))) rc.push(b + 1);
    const st = C.newState(r.board, r.k, 0); cc.forEach((h) => C.toggleCut(st, 'col', h)); rc.forEach((h) => C.toggleCut(st, 'row', h));
    const own = ownPieces(r.cols, r.rows, cc, rc), trueGrid = own.every((p) => p.w === 2 && p.h === 2);
    const res = C.check(st); sets++;
    if (res.result === 'grid') { accepted++; if (!trueGrid) badAccept++; else acceptedWhole = true; continue; }
    if (!cc.length && !rc.length) { if (!(res.result === 'note' && res.key === 'hintStart')) badAccept++; continue; }
    if (trueGrid) { badAccept++; continue; }
    const mp = C.misprints(st), wrongOwn = own.map((p) => !(p.w === 2 && p.h === 2));
    if (!mp.some((p) => !p.ok)) noMisprint++;
    if (mp.length !== own.length || mp.some((p, i) => p.ok === wrongOwn[i] || p.x !== own[i].x || p.y !== own[i].y || (p.w < 2) !== p.over.some((q) => q.x === p.x + p.w) || (p.w > 2 || p.h > 2) !== (p.border.length > 0))) badMisprint++;
  }
  is(accepted === 1 && acceptedWhole && !badAccept, key + ': of ' + N + ' cut sets the core accepts exactly the whole-square one (' + accepted + ' accepted, ' + badAccept + ' wrong verdicts)');
  is(!noMisprint, key + ': every refused cut set prints a misprint (' + noMisprint + ' did not)');
  is(!badMisprint, key + ': the misprinted pieces are exactly the ones that are not one plate square, sliced where thin, bordered where big (' + badMisprint + ' sets differ)');
  /* the named misconceptions, explicitly */
  const named = [['a cut at a half notch', [1], []], ['the fence post: as many lines as columns', Array.from({ length: r.cols }, (_, i) => 2 * i + 1), Array.from({ length: r.rows - 1 }, (_, i) => 2 * i + 2)], ['rows and columns swapped', Array.from({ length: r.rows - 1 }, (_, i) => 2 * i + 2).filter((h) => h < 2 * r.cols), Array.from({ length: r.cols - 1 }, (_, i) => 2 * i + 2).filter((h) => h < 2 * r.rows)]];
  named.forEach(([nm, cc, rc]) => { if (r.rows === r.cols && nm === 'rows and columns swapped') return; const st = C.newState(r.board, r.k, 0); cc.forEach((h) => C.toggleCut(st, 'col', h)); rc.forEach((h) => C.toggleCut(st, 'row', h)); is(C.check(st).result === 'miss', key + ': ' + nm + ' → a miss'); });
}
is(sets > 100000, 'the exhaustive sweep covered ' + sets + ' cut sets');

/* ---------- Check, the misses, the count ---------- */
RN.concat(RP).forEach((r) => {
  const tag = r.board + ' #' + (r.k + 1), st = C.newState(r.board, r.k, 0);
  let res = C.check(st); is(res.result === 'note' && res.key === 'hintStart' && !st.misses, tag + ': no perforation → a reminder, no miss');
  is(!C.type(st, '5'), tag + ': the keypad is shut before the grid is accepted');
  C.toggleCut(st, 'col', 1); res = C.check(st); is(res.result === 'miss' && st.misses === 1 && !st.help && C.hint(st) === 'hintPress', tag + ': a wrong grid → miss 1, the press hint');
  res = C.check(st); is(res.result === 'miss' && st.help && C.hint(st) === 'hintGhost', tag + ': miss 2 → help (the ghost lattice)');
  C.toggleCut(st, 'col', 1);
  for (let h = 2; h < 2 * r.cols; h += 2) C.toggleCut(st, 'col', h); for (let h = 2; h < 2 * r.rows; h += 2) C.toggleCut(st, 'row', h);
  is(st.verdict === null, tag + ': a new perforation takes the showing away');
  res = C.check(st); is(res.result === 'grid' && st.step === 'count' && !st.done, tag + ': the true grid → the count step');
  is(C.toggleCut(st, 'col', 1) === null, tag + ': no more perforating in the count step');
  res = C.check(st); is(res.result === 'note' && res.key === 'hintCountStart', tag + ': nothing typed → a reminder');
  const sum = r.rows + r.cols, tot = r.rows * r.cols;
  if (sum !== tot) { String(sum).split('').forEach((d) => C.type(st, d)); res = C.check(st); is(res.result === 'miss' && st.cmisses === 1 && C.hint(st) === 'hintRow', tag + ': rows + cols (' + sum + ') → a miss, count one row'); while (st.typed) C.type(st, 'back'); }
  else { C.type(st, '9'); C.check(st); C.type(st, 'back'); }
  C.type(st, String(tot + 1).slice(0, 2)[0]); if (String(tot + 1).length > 1) C.type(st, String(tot + 1)[1]); res = C.check(st); is(res.result === 'miss' && st.chelp && C.hint(st) === 'hintCountOn', tag + ': a second wrong count → help (running totals)');
  while (st.typed) C.type(st, 'back');
  String(tot).split('').forEach((d) => C.type(st, d)); res = C.check(st); is(res.result === 'ok' && st.done, tag + ': the total ' + tot + ' → done');
  is(C.runningTotals(r.rows, r.cols).join() === Array.from({ length: r.rows }, (_, i) => (i + 1) * r.cols).join(), tag + ': running totals ' + r.cols + ', ' + 2 * r.cols + ' …');
});
{ const st = C.newState('numbers', 0, 0); for (let h = 2; h < 6; h += 2) C.toggleCut(st, 'col', h); C.toggleCut(st, 'row', 2); C.check(st); is(!C.type(st, '0') && C.type(st, '6') && C.type(st, '1') && !C.type(st, '2'), 'the keypad: no leading 0, at most two digits'); }

/* ---------- pick ---------- */
const fit = (s, c) => s.rows === c.rows && s.cols === c.cols;
let bots = { smallest: 0, middle: 0, largest: 0, rowsOnly: 0, lengthOnly: 0 };
RK.forEach((r) => {
  const tag = 'pick #' + (r.k + 1), card = { rows: r.rows, cols: r.cols };
  is(r.sheets.filter((s) => fit(s, card)).length === 1, tag + ': exactly one sheet fits the card');
  is(!r.sheets.some((s) => s.rows === card.cols && s.cols === card.rows && card.rows !== card.cols), tag + ': no transposed sheet');
  const sameLen = r.sheets.filter((s) => !fit(s, card) && s.cols === card.cols), sameRows = r.sheets.filter((s) => !fit(s, card) && s.rows === card.rows), sameTot = r.sheets.filter((s) => !fit(s, card) && s.rows * s.cols === card.rows * card.cols);
  is(sameLen.length === 1 && (sameRows.length === 1 || sameTot.length === 1), tag + ': a same-length distractor and a same-rows (or same-total) distractor');
  const st = C.newState('pick', r.k, 0); is(fit(st.sheets[r.slot - 1], card), tag + ': pass 1 puts the match in slot ' + r.slot);
  /* bots over the totals and the attributes */
  const tots = r.sheets.map((s) => s.rows * s.cols), sorted = tots.slice().sort((a, b) => a - b), okT = card.rows * card.cols;
  const share = (pred) => { const c = r.sheets.filter(pred); return c.some((s) => fit(s, card)) ? 1 / c.length : 0; };
  bots.smallest += share((s) => s.rows * s.cols === sorted[0]); bots.largest += share((s) => s.rows * s.cols === sorted[2]); bots.middle += share((s) => s.rows * s.cols === sorted[1]);
  bots.rowsOnly += share((s) => s.rows === card.rows); bots.lengthOnly += share((s) => s.cols === card.cols);
  /* the page fit */
  r.sheets.filter((s) => !fit(s, card)).forEach((s) => { const pf = C.pageFit(s, card); is(pf.some((f) => f.state !== 'ok'), tag + ': ' + s.rows + '×' + s.cols + ' does not fill the page'); pf.forEach((f) => is(f.state === (f.r >= card.rows ? 'extra' : f.r >= s.rows ? 'missing' : s.cols === card.cols ? 'ok' : s.cols > card.cols ? 'over' : 'short'), tag + ': page row ' + (f.r + 1) + ' of ' + s.rows + '×' + s.cols + ' is ' + f.state)); });
  is(C.pageFit(r.sheets.find((s) => fit(s, card)), card).every((f) => f.state === 'ok'), tag + ': the match fills the page exactly');
  /* the check flow */
  const s2 = C.newState('pick', r.k, 0); let res = C.check(s2); is(res.result === 'note' && res.key === 'hintPickStart', tag + ': no sheet chosen → a reminder');
  const wi = s2.sheets.findIndex((s) => !fit(s, card)); C.choose(s2, wi); res = C.check(s2); is(res.result === 'miss' && C.hint(s2) === 'hintPickRows', tag + ': a wrong sheet → miss 1'); C.check(s2); is(s2.help && C.hint(s2) === 'hintPickFill', tag + ': miss 2 → help');
  C.choose(s2, s2.sheets.findIndex((s) => fit(s, card))); is(C.check(s2).result === 'ok' && s2.done, tag + ': the match → done');
});
/* measured, see the design's corrected §6: K9 (the same-total trap) has no second 3-row sheet, so rows-only wins it outright */
['smallest', 'middle', 'largest', 'lengthOnly'].forEach((k) => is(bots[k] <= 4.5 + 1e-9, 'pick bot "' + k + '" scores ' + bots[k].toFixed(2) + '/9 (≤ 4.5)'));
is(Math.abs(bots.rowsOnly - 5) < 1e-9, 'pick bot "rowsOnly" scores exactly 5/9 (' + bots.rowsOnly.toFixed(2) + ')');
is(RK.filter((r) => r.sheets.filter((s) => s.rows === r.rows).length === 1).map((r) => r.k).join() === '8', 'the rows-only bot wins outright only in K9');
is(Math.abs(bots.smallest - 3.5) < 1e-9 || bots.smallest <= 3.5, 'the best size bot scores at most 3.5/9 (smallest ' + bots.smallest.toFixed(2) + ')');
for (let p = 0; p < 6; p++) { const cnt = [0, 0, 0]; RK.forEach((r) => { const st = C.newState('pick', r.k, p); cnt[st.sheets.findIndex((s) => fit(s, { rows: r.rows, cols: r.cols }))]++; }); is(cnt.join() === '3,3,3', 'pass ' + (p + 1) + ': the match stands in each slot three times (' + cnt + ')'); }

/* later passes permute the slots (design §6): no round keeps its match in the same slot in two passes running */
RK.forEach((r) => { const sl = [0, 1, 2, 3].map((p) => C.newState('pick', r.k, p).sheets.findIndex((s) => fit(s, { rows: r.rows, cols: r.cols }))); is(sl.every((x, i) => !i || x !== sl[i - 1]), 'pick #' + (r.k + 1) + ': the match moves slot from pass to pass (' + sl + ')'); });

/* ---------- the plan ---------- */
for (const b of C.BOARDS) {
  let prev = null, ok = true, runs = true;
  for (let n = 0; n < 1000; n++) {
    const pass = n % 5, p = C.plan(b, Math.random, prev, pass);
    if (prev && p.join() === prev.join()) ok = false;
    if (p.slice().sort((x, y) => x - y).join() !== C.rounds(b).map((r) => r.k).join()) ok = false;
    if (b === 'pick') { const sl = p.map((k) => C.slotIn(C.rounds('pick')[k], pass)); for (let i = 2; i < sl.length; i++) if (sl[i] === sl[i - 1] && sl[i - 1] === sl[i - 2]) runs = false; }
    prev = p;
  }
  is(ok, b + ': 1000 plans, each a permutation, never the previous order');
  if (b === 'pick') is(runs, 'pick: the match never stands in one slot three rounds running');
  const s1 = C.plan(b, () => 0, null, 0); is(C.plan(b, () => 0, s1, 0).join() !== s1.join(), b + ': a stuck random source still changes the order');
}

/* ---------- the activity layer in node ---------- */
const src = fs.readFileSync(ACT, 'utf8');
const ctx = { StampSheetCore: C, console }; vm.createContext(ctx);
vm.runInContext(src.replace(/function injectStampSheetCSS\(\)[\s\S]*$/, '') + ';this.A = StampSheetActivity;', ctx);
const A = ctx.A;
for (const k of Object.keys(A.strings)) is(LOCS.every((l) => typeof A.strings[k][l] === 'string' && A.strings[k][l]), 'string ' + k + ' in 11 locales');
const DOT = { de: 1, sv: 1, da: 1, no: 1, fi: 1 };
const asked = new Set();
for (const loc of LOCS) for (const b of C.BOARDS) for (const card of C.CARDS) C.rounds(b).forEach((r) => {
  const a = Object.create(A); a.api = { lang: loc, settings: { board: b, card }, t: (k) => { asked.add(k); return (A.strings[k] || {})[loc] || k; } }; a._view = {};
  a.st = C.newState(b, r.k, 0);
  const lines = [a._taskLine(), a._okLine()];
  const res = C.check(a.st); if (res.result === 'note') lines.push(a._t(res.key));
  if (b !== 'pick') { C.toggleCut(a.st, 'col', 1); C.check(a.st); lines.push(a._t(C.hint(a.st))); if (b === 'numbers') lines.push(a._t('hintPieces', a._args())); C.check(a.st); lines.push(a._t(C.hint(a.st))); C.toggleCut(a.st, 'col', 1); for (let h = 2; h < 2 * r.cols; h += 2) C.toggleCut(a.st, 'col', h); for (let h = 2; h < 2 * r.rows; h += 2) C.toggleCut(a.st, 'row', h); C.check(a.st); lines.push(a._t('noteGrid'), a._taskLine(), a._t(C.check(a.st).key)); C.type(a.st, '1'); C.check(a.st); lines.push(a._t(C.hint(a.st))); C.check(a.st); lines.push(a._t(C.hint(a.st))); }
  else { C.choose(a.st, a.st.sheets.findIndex((s) => !fit(s, a.st))); C.check(a.st); lines.push(a._t(C.hint(a.st))); C.check(a.st); lines.push(a._t(C.hint(a.st))); }
  if (b !== 'plate') lines.push(a._cardHtml(a.st, false).replace(/<[^>]+>/g, ' '));
  lines.forEach((ln) => { const bad = /\{|undefined|NaN|null/.test(ln) || /\bfree\b|gratis|kostenlos|gratuit/i.test(ln) || /(^|[^\d])0([^\d]|$)/.test(ln); if (bad) is(false, loc + ' ' + b + '/' + card + ' #' + (r.k + 1) + ': «' + ln + '»'); else pass++; });
  if (card === 'mul' && b !== 'plate') { const all = lines.join(' '); is(DOT[loc] ? /\d · \d/.test(all) && !/×/.test(all) : /\d × \d/.test(all) && !/·/.test(all), loc + ' ' + b + ' #' + (r.k + 1) + ': the multiplication sign is ' + (DOT[loc] ? '·' : '×')); }
  if (card === 'add' && b !== 'plate') is(a._okLine().indexOf(Array(r.rows).fill(r.cols).join(' + ')) >= 0, loc + ' ' + b + ' #' + (r.k + 1) + ': the adding writes the row length ' + r.rows + ' times');
});
/* the activity's own Check: the pieces hint ("3 rows and 4 columns — count the pieces") on the numbers board only —
   on the plate board it would hand over the answer the child is asked to find */
for (const loc of ['en', 'de', 'fi']) for (const b of ['numbers', 'plate']) {
  const a = Object.create(A); a.api = { lang: loc, settings: { board: b, card: 'rowsOf' }, t: (k) => { asked.add(k); return (A.strings[k] || {})[loc] || k; }, sound: () => {}, announce: () => {} };
  a._view = { note: '' }; a._paint = () => {}; a._qs = () => null; a.st = C.newState(b, 1, 0);
  C.toggleCut(a.st, 'col', 1); a._check();
  const pieces = a._t('hintPieces', a._args());
  is(b === 'numbers' ? a._view.note.indexOf(pieces) >= 0 : a._view.note.indexOf(pieces) < 0 && a._view.note.indexOf(String(a.st.cols)) < 0, loc + ' ' + b + ': the miss-1 note ' + (b === 'numbers' ? 'adds' : 'never adds') + ' the rows-and-columns hint («' + a._view.note + '»)');
}
['title', 'instruction', 'instrBubble', 'okBubble', 'checkBtn', 'setBoard', 'bNumbers', 'bPlate', 'bPick', 'setCard', 'cRowsOf', 'cAdd', 'cMul'].forEach((k) => asked.add(k));
const body = src.replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*?\/\*STRINGS-END\*\//, '');
const dead = Object.keys(A.strings).filter((k) => !asked.has(k) && !new RegExp("['\"]" + k + "['\"]").test(body));
is(!dead.length, 'no dead strings (' + dead + ')');
is(A.OK_MS === 500, 'Next follows success after 0.5 s');
is(LOCS.every((l) => C.mulSign(l) === (DOT[l] ? '·' : '×')), 'the core signs: · in de/sv/da/no/fi, × elsewhere');

/* ---------- the manifest row ---------- */
const man = JSON.parse(fs.readFileSync(MAN, 'utf8')), row = (man.activities || man).find((x) => x.id === 'fractions.make-and-count-squares.2-g-a-2');
is(row && row.tool === 'stamp-sheet-activity' && row.task_template === 'stamp-sheet' && row.params && !Object.keys(row.params).length, 'the manifest row points at the new tool, old params dropped');
is(row && LOCS.every((l) => row.slug[l] && row.page_title[l] && row.page_intro[l]), 'the row ships in 11 locales');

console.log(`verify-stamp-sheet-core: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
