/* =====================================================================
   jar-label-core.js — the MODEL of "Rivet's Number Forge" (K.CC.A.3),
   activity #7 of the one-by-one rebuild (docs/activities-rebuild/007-jar-label.md).
   ---------------------------------------------------------------------
   Pure functions, no DOM, Node-loadable (scripts/verify-jar-label-core.js
   drives it; scripts/mutate-jar-label.js proves the gate bites).

   THE SKILL. K.CC.A.3, the third face: represent a number of objects
   (0–20) with a written numeral — and, read a numeral, show that many.
   The apparatus is THE JAR LABEL: a jar of library toys with a label on
   its lid; the child counts (marks) and writes the number; Check lays the
   written number against the jar — the toys file into as many places as
   the label says, so a label too small leaves toys over and a label too
   big leaves empty places. Fill rounds turn it round: the label is given,
   the jar is empty, the child drops that many in. This core owns the
   pools, the typing rules, the marks, the shelf moves, the slip table,
   the layout (incl. the 320 × 640 budget).
   ===================================================================== */
(function (global) {
  'use strict';

  var MAX = 20, DIGITS = 2;
  var POOLS = {
    to20: { count: [6, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], fill: [7, 12, 15] },   /* never 0 (operator 2026-10-16) */
    to10: { count: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], fill: [3, 5, 8] }
  };
  var TASKS = ['both', 'count', 'fill'];
  /* library nouns of the `toys` theme, each a single countable thing (contact sheet read 2026-10-16) */
  var NOUNS = ['ball', 'balloon', 'kite', 'car', 'truck', 'robot', 'dinosaur', 'boat', 'rocket', 'train', 'airplane', 'helicopter'];
  var THEME = 'toys';
  var LOOSE_MAX = 10;        /* up to ten the toys sit loosely (K.CC.B.5: scattered to 10, arrays to 20) */
  var JITTER = 0.07;         /* of a cell, each way */

  /* ---- a seeded PRNG (mulberry32 over a string hash) ---- */
  function hash(s) { var h = 2166136261 >>> 0; s = String(s); for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; } return h >>> 0; }
  function rng(seed) { var a = hash(seed); return function () { a |= 0; a = (a + 0x6D2B79F5) | 0; var t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function shuffle(arr, r) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(r() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  /* ---- rounds ---- */
  function rounds(range, task, seed) {
    var pool = POOLS[range] || POOLS.to20, out = [];
    task = TASKS.indexOf(task) >= 0 ? task : 'both';
    var nouns = shuffle(NOUNS, rng((seed || 'jl') + ':nouns:' + range));
    var k = 0;
    if (task !== 'fill') for (var i = 0; i < pool.count.length; i++) out.push({ id: range + '-count-' + pool.count[i], kind: 'count', n: pool.count[i], noun: nouns[(k++) % nouns.length], seed: (seed || 'jl') + ':' + range + ':c' + pool.count[i] });
    if (task !== 'count') for (var j = 0; j < pool.fill.length; j++) out.push({ id: range + '-fill-' + pool.fill[j], kind: 'fill', n: pool.fill[j], noun: nouns[(k++) % nouns.length], seed: (seed || 'jl') + ':' + range + ':f' + pool.fill[j] });
    return out;
  }

  /* ---- state ---- */
  function newState(round) {
    var marks = [], jit = [], r = rng(round.seed + ':jit');
    for (var i = 0; i < MAX; i++) { marks.push(false); jit.push({ x: (r() * 2 - 1) * JITTER, y: (r() * 2 - 1) * JITTER }); }
    return { id: round.id, kind: round.kind, n: round.n, noun: round.noun, seed: round.seed, marks: marks, jit: jit, typed: '', inJar: round.kind === 'fill' ? 0 : round.n, checked: null, done: false };
  }
  /* how many toys stand in the jar right now */
  function shown(st) { return st.kind === 'fill' ? st.inJar : st.n; }
  /* typing on the label (count rounds): up to two digits, no leading zero kept */
  function typeDigit(st, d) {
    if (st.done || st.kind !== 'count') return false;
    d = String(d);
    if (!/^[0-9]$/.test(d)) return false;
    if (st.typed.length >= DIGITS) return false;
    st.typed = (st.typed === '0') ? d : st.typed + d;
    st.checked = null;
    return true;
  }
  function erase(st) { if (st.done || !st.typed) return false; st.typed = st.typed.slice(0, -1); st.checked = null; return true; }
  function answer(st) { return st.typed === '' ? null : parseInt(st.typed, 10); }
  /* a mark on toy i (count rounds): one-to-one, toggled */
  function toggleMark(st, i) {
    if (st.done || st.kind !== 'count' || i < 0 || i >= st.n) return false;
    st.marks[i] = !st.marks[i];
    return true;
  }
  function marked(st) { var c = 0; for (var i = 0; i < st.n; i++) if (st.marks[i]) c++; return c; }
  /* the shelf (fill rounds): drop one in, take one out */
  function addToJar(st) { if (st.done || st.kind !== 'fill' || st.inJar >= MAX) return false; st.inJar++; st.checked = null; return true; }
  function removeFromJar(st) { if (st.done || st.kind !== 'fill' || st.inJar <= 0) return false; st.inJar--; st.checked = null; return true; }

  /* ---- the slip table ---- */
  function rev(n) { return parseInt(String(n).split('').reverse().join(''), 10); }
  function classify(a, n) {
    if (a === null || a === undefined) return 'none';
    if (a === n) return 'right';
    if (a >= 10 && rev(a) === n && a % 10 !== 0) return 'reversed';
    if (a >= 1 && a < 10 && n >= 10 && n % 10 === a) return 'oneDigit';   /* 0 on a jar of 10 or 20 is just too few, not 'only the ones' */
    if (a < n) return 'more';
    return 'fewer';
  }
  /* Check: lays the label against the jar */
  function check(st) {
    if (st.done) return { ok: true, slip: 'right', k: 0 };
    var res;
    if (st.kind === 'count') {
      var a = answer(st), slip = classify(a, st.n);
      res = { ok: slip === 'right', slip: slip, a: a, n: st.n, k: slip === 'more' ? st.n - a : slip === 'fewer' ? a - st.n : 0 };
    } else {
      var d = st.n - st.inJar;
      res = { ok: d === 0, slip: d === 0 ? 'right' : d > 0 ? 'fillMore' : 'fillFewer', a: st.inJar, n: st.n, k: Math.abs(d) };
    }
    st.checked = res;
    if (res.ok) st.done = true;
    return res;
  }
  function verdict(st) { return st.done ? 'done' : 'unfinished'; }
  /* the places laid against the jar after a wrong count label: ticked / leftover / empty */
  function places(st) {
    var c = st.checked, out = [];
    if (!c || st.kind !== 'count' || c.ok || c.a === null) return out;
    var a = Math.min(c.a, MAX), n = st.n, i;
    for (i = 0; i < Math.max(a, n); i++) out.push(i < Math.min(a, n) ? 'ticked' : (i < n ? 'leftover' : 'empty'));
    return out;
  }

  /* ---- layout ---- */
  /* W = the stage content width. From 560 ('row'): the jar spans the width, 5 columns, and the eleven keys
     stand in ONE ROW under it (1 2 3 … 9 0 ⌫ — the numbers aligned in order, operator 2026-10-16); below 560
     ('stack'): 4 columns, the pad floating over the jar. Cell = floor((inner − (cols−1)·gap) / cols); picture = cell − gap. */
  function layout(W) {
    if (W >= 560) {
      var gap = 4, pad = 8, innerW = W - 2 * pad;
      var cell = Math.min(112, Math.floor((innerW - 4 * gap) / 5));   /* capped so a jar of twenty + the key row fits 1366 × 900 */
      var key = Math.min(52, Math.floor((W - 10 * 4) / 11));
      return { mode: 'row', cols: 5, gap: gap, padW: 0, key: key, jarW: W, jarPad: pad, cell: cell, pic: cell - gap };
    }
    var g = 2, jp = 6, inner = W - 2 * jp;
    var c = Math.floor((inner - 3 * g) / 4);
    return { mode: 'stack', cols: 4, gap: g, padW: 0, key: 50, jarW: W, jarPad: jp, cell: c, pic: c - g };
  }
  function rowsFor(n, cols) { return Math.max(1, Math.ceil(n / cols)); }
  /* a toy's offset inside its cell (loose up to ten, straight above) */
  function offset(st, i, L) {
    if (shown(st) > LOOSE_MAX) return { x: 0, y: 0 };
    return { x: Math.round(st.jit[i].x * L.cell), y: Math.round(st.jit[i].y * L.cell) };
  }

  var api = {
    MAX: MAX, DIGITS: DIGITS, POOLS: POOLS, TASKS: TASKS, NOUNS: NOUNS, THEME: THEME, LOOSE_MAX: LOOSE_MAX, JITTER: JITTER,
    rng: rng, shuffle: shuffle, rounds: rounds, newState: newState, shown: shown, typeDigit: typeDigit, erase: erase, answer: answer,
    toggleMark: toggleMark, marked: marked, addToJar: addToJar, removeFromJar: removeFromJar,
    classify: classify, check: check, verdict: verdict, places: places, layout: layout, rowsFor: rowsFor, offset: offset
  };
  global.JarLabelCore = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
}(typeof window !== 'undefined' ? window : globalThis));
