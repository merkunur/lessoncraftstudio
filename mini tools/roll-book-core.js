/* =====================================================================
   roll-book-core.js — the MODEL of the Roll Book, activity #13 of the
   one-by-one rebuild: "Mama's Roll Call" (K.CC.B.5).
   Design sheet: docs/activities-rebuild/013-roll-book.md · law: LAW.md
   ---------------------------------------------------------------------
   Pure functions, no DOM, Node-loadable (scripts/verify-roll-book-core.js
   drives it; scripts/mutate-roll-book.js proves the gate bites).

   THE SKILL. K.CC.B.5 both ways and the numeral that tells how many:
   Mama's call is a DOT CARD (never a numeral, unless the teacher chooses);
   the child sends that many ducklings from the raft to the bank, one per
   tap (count out); then signs the roll — presses the number stamp for how
   many came and traces it in the mud (K.CC.A.3). check() reads the bank
   first (more / fewer), then the signature (unsigned / not traced / a
   number that is not how many came). Help per miss: 1 → the bank's
   ducklings are numbered; 2 → Mama's dots too. Never 0.

   It LOADS two shipped instruments unchanged and never edits them:
     NumberTraceCore  — the digit glyphs, glyphFor(d, lang) (barred seven);
     StrokeTraceCore  — the live-ink judge for the tracing.
   ===================================================================== */
(function (global) {
  'use strict';

  var NT = global.NumberTraceCore, ST = global.StrokeTraceCore;
  if ((!NT || !ST) && typeof require === 'function') {
    try { NT = NT || require('./number-trace-core.js').NumberTraceCore; } catch (e) { /* the gate points at a dir */ }
    try { ST = ST || require('./stroke-trace-core.js').StrokeTraceCore; } catch (e) { /* idem */ }
  }

  var POOLS = {
    to9: [{ n: 5, card: 'frame' }, { n: 7, card: 'frame' }, { n: 3, card: 'scatter' }, { n: 9, card: 'frame' }, { n: 6, card: 'frame' }, { n: 8, card: 'frame' }, { n: 4, card: 'scatter' }, { n: 2, card: 'scatter' }],
    to5: [{ n: 3, card: 'frame' }, { n: 5, card: 'frame' }, { n: 2, card: 'scatter' }, { n: 4, card: 'frame' }, { n: 1, card: 'frame' }, { n: 5, card: 'scatter' }, { n: 2, card: 'frame' }, { n: 4, card: 'scatter' }]
  };
  var RAFT = { to9: 10, to5: 7 };
  var RANGES = ['to5', 'to9'], CALLS = ['dots', 'numeral'];
  var THEME = 'animals', NOUN = 'duck';
  /* the dots on Mama's card, in a 5 × 2 box (cell units, centres) */
  var SCATTER = {
    1: [[2.5, 1]], 2: [[1.2, 0.6], [3.6, 1.4]], 3: [[0.8, 0.5], [2.6, 1.5], [4.2, 0.6]],
    4: [[0.7, 0.6], [2.2, 1.5], [3.1, 0.5], [4.4, 1.4]], 5: [[0.6, 0.5], [1.8, 1.5], [2.7, 0.6], [3.7, 1.5], [4.5, 0.5]]
  };
  function dots(card, n) {
    var out = [], i;
    if (card === 'scatter') { var s = SCATTER[n]; return s ? s.map(function (q) { return [q[0], q[1]]; }) : null; }
    if (n < 1 || n > 10) return null;
    for (i = 0; i < n; i++) out.push([(i % 5) + 0.5, Math.floor(i / 5) + 0.5]);
    return out;
  }

  /* mulberry32, seeded per round: the landing spots' order is fixed per round */
  function rng(seed) { var a = 0; for (var i = 0; i < seed.length; i++) a = (a * 31 + seed.charCodeAt(i)) | 0; return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

  function rounds(range, prefix) {
    var key = POOLS[range] ? range : 'to9', out = [];
    for (var i = 0; i < POOLS[key].length; i++) out.push({ id: (prefix || 'rb') + '-' + key + '-' + i, n: POOLS[key][i].n, card: POOLS[key][i].card, raft: RAFT[key], max: key === 'to5' ? 5 : 9 });
    return out;
  }
  function newState(r, lang) {
    return { id: r.id, n: r.n, card: r.card, max: r.max, raft: r.raft, lang: lang || 'en',
      bank: [], digit: null, trace: null, misses: 0, checked: null, done: false };
  }
  function aboard(st) { return st.raft - st.bank.length; }
  /* a tap on a duckling on the bank: it swims back; the others keep their spots */
  function recall(st, k) {
    if (!st || st.done || k < 0 || k >= st.bank.length) return -1;
    var spot = st.bank.splice(k, 1)[0]; st.checked = null; return spot;
  }
  /* the next free landing spot index (smallest not taken) */
  function nextSpot(st) { var used = {}; for (var i = 0; i < st.bank.length; i++) used[st.bank[i]] = 1; var k = 0; while (used[k]) k++; return k; }
  /* a tap on the raft: one duckling swims to the next free landing spot; returns the spot or -1 */
  function send(st) {
    if (!st || st.done || st.bank.length >= st.raft) return -1;
    var k = nextSpot(st); st.bank.push(k); st.checked = null; return k;
  }
  /* signing: a stamp chooses the digit and lays its dotted shape in the mud */
  function stamp(st, d) {
    if (!st || st.done || d < 1 || d > st.max || d !== Math.floor(d)) return false;
    st.digit = d; st.trace = ST.newTrace(NT.glyphFor(d, st.lang), {}); st.checked = null; return true;
  }
  function glyph(st) { return st.digit === null ? null : NT.glyphFor(st.digit, st.lang); }
  function sample(st, pt) { if (!st || st.done || !st.trace) return null; return ST.sample(st.trace, pt); }
  function endStroke(st) { if (!st || st.done || !st.trace) return null; var r = ST.endStroke(st.trace); if (r === 'formed') st.checked = null; return r; }
  function rubOut(st) { if (!st || st.done || st.digit === null) return false; st.trace = ST.newTrace(NT.glyphFor(st.digit, st.lang), {}); return true; }
  function signed(st) { return !!(st.trace && ST.isComplete(st.trace)); }

  function check(st) {
    if (st.done) return { ok: true, slip: 'right', a: st.bank.length };
    var a = st.bank.length, slip;
    if (a === 0) slip = 'none';
    else if (a !== st.n) slip = a > st.n ? 'more' : 'fewer';
    else if (st.digit === null) slip = 'unsigned';
    else if (st.digit !== a) slip = 'digit';
    else if (!signed(st)) slip = 'trace';
    else slip = 'right';
    var res = { ok: slip === 'right', slip: slip, a: a };
    if (res.ok) st.done = true;
    else if (slip === 'more' || slip === 'fewer' || slip === 'digit') st.misses++;
    st.checked = res;
    return res;
  }
  function helpLevel(st) { return st.done ? 0 : Math.min(2, st.misses); }
  /* numbers shown: on the bank's ducklings (help ≥ 1, done) and on Mama's dots (help 2, done) */
  function bankNums(st) { var lv = helpLevel(st); return st.bank.map(function (s, i) { return (st.done || lv >= 1) ? String(i + 1) : ''; }); }
  function dotNums(st) { var lv = helpLevel(st), out = []; for (var i = 0; i < st.n; i++) out.push((st.done || lv >= 2) ? String(i + 1) : ''); return out; }
  function hintKey(st) {
    var s = st.checked ? st.checked.slip : 'none';
    return { none: 'hintSend', more: 'hintMore', fewer: 'hintFewer', unsigned: 'hintSign', trace: 'hintTrace', digit: 'hintDigit' }[s] || 'hintSend';
  }

  /* THE POND GRID. Mama's card takes cells (0,0)+(1,0), the raft (C−1,0); the
     rest are landing spots, their order shuffled per round (fixed by the seed). */
  function layout(W, max) {
    W = Math.max(240, Math.floor(W)); max = max || 9;
    var PAD = 8;
    if (W >= 560) {
      var cell = Math.min(112, Math.floor((W - 2 * PAD) / 5));
      return { mode: 'wide', cols: 5, rows: 3, cell: cell, pic: cell - 12, pad: PAD, mud: 168, stamp: Math.min(56, Math.floor((W - 168 - 16 - (max - 1) * 6) / Math.min(max, 5)) ), stampCols: Math.min(max, 5) };
    }
    if (W >= 300) {   /* a 360 phone: a 4 × 4 pond, cells capped so the Check stays above the fold */
      var c2 = Math.min(70, Math.floor((W - 2 * PAD) / 4));
      return { mode: 'stack', cols: 4, rows: 4, cell: c2, pic: c2 - 4, pad: PAD, mud: 120, stamp: 44, stampCols: 3 };
    }
    /* the 320 × 640 phone: the pond lies 5 × 3, so the whole round fits the fold */
    var c3 = Math.floor((W - 2 * PAD) / 5);
    return { mode: 'narrow', cols: 5, rows: 3, cell: c3, pic: c3 - 4, pad: PAD, mud: Math.min(112, W - 10 - (3 * 44 + 12)), stamp: 44, stampCols: 3 };   /* the mud gives way so the stamps keep 44 px */
  }
  function freeCells(L) { var out = []; for (var r = 0; r < L.rows; r++) for (var c = 0; c < L.cols; c++) { if (r === 0 && (c === 0 || c === 1 || c === L.cols - 1)) continue; out.push([c, r]); } return out; }
  function spotCells(st, L) {
    var cells = freeCells(L), rand = rng(st.id + ':' + L.mode), i, j, t;
    for (i = cells.length - 1; i > 0; i--) { j = Math.floor(rand() * (i + 1)); t = cells[i]; cells[i] = cells[j]; cells[j] = t; }
    return cells;
  }

  var api = { POOLS: POOLS, RAFT: RAFT, RANGES: RANGES, CALLS: CALLS, THEME: THEME, NOUN: NOUN,
    dots: dots, rounds: rounds, newState: newState, aboard: aboard, send: send, recall: recall, nextSpot: nextSpot,
    stamp: stamp, glyph: glyph, sample: sample, endStroke: endStroke, rubOut: rubOut, signed: signed,
    check: check, helpLevel: helpLevel, bankNums: bankNums, dotNums: dotNums, hintKey: hintKey,
    layout: layout, freeCells: freeCells, spotCells: spotCells, _NT: function () { return NT; }, _ST: function () { return ST; } };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.RollBookCore = api;
}(typeof window !== 'undefined' ? window : globalThis));
