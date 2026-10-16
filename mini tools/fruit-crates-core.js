/* =====================================================================
   fruit-crates-core.js — the MODEL of "Write the Number 0 to 20 with
   Fruits" (K.CC.A.3), activity #8 of the one-by-one rebuild
   (docs/activities-rebuild/008-fruit-crates.md).
   ---------------------------------------------------------------------
   Pure functions, no DOM, Node-loadable (scripts/verify-fruit-crates-core.js
   drives it; scripts/mutate-fruit-crates.js proves the gate bites).

   THE SKILL. K.CC.A.3: represent a number of objects (0–20) with a
   written numeral. The apparatus is THE FRUIT CRATES: two wooden crates
   that are ten-frames (a full crate is ten), library fruit in the boxes in
   frame order (the first line of five, then the second). The child writes
   how many on a slate. THE INVENTION — the crates read themselves: after a
   miss the landmark numbers (5, 10, 15) appear on the fruit; after a second
   miss the count-on numbers run along the fruit and stop at a "?" on the
   last one, so the help never writes the answer. This core owns the pools,
   the typing rules, the slip table, the help ladder, the chips and the
   layout (incl. the 320 × 640 budget).
   ===================================================================== */
(function (global) {
  'use strict';

  var MAX = 20, DIGITS = 2, CRATE = 10, LINE = 5;
  var POOLS = {
    to20: [3, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    to10: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  };
  var LOOKS = ['open', 'quick'];
  /* library nouns of the `fruits` theme, each one whole fruit a child names (contact sheet read 2026-10-16) */
  var NOUNS = ['apple', 'banana', 'pear', 'lemon', 'strawberry', 'orange', 'pineapple', 'cherry'];
  var THEME = 'fruits';
  var LANDMARKS = [5, 10, 15, 20];

  /* ---- a seeded PRNG (mulberry32 over a string hash) ---- */
  function hash(s) { var h = 2166136261 >>> 0; s = String(s); for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; } return h >>> 0; }
  function rng(seed) { var a = hash(seed); return function () { a |= 0; a = (a + 0x6D2B79F5) | 0; var t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function shuffle(arr, r) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(r() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  /* ---- rounds ---- */
  function crates(range) { return range === 'to10' ? 1 : 2; }
  function rounds(range, seed) {
    range = POOLS[range] ? range : 'to20';
    var pool = POOLS[range], out = [];
    var nouns = shuffle(NOUNS, rng((seed || 'fc') + ':nouns:' + range));
    for (var i = 0; i < pool.length; i++) out.push({ id: range + '-' + pool[i], n: pool[i], crates: crates(range), noun: nouns[i % nouns.length], seed: (seed || 'fc') + ':' + range + ':' + pool[i] });
    return out;
  }

  /* ---- state ---- */
  function newState(round) {
    return { id: round.id, n: round.n, crates: round.crates || 2, noun: round.noun, seed: round.seed, typed: '', checked: null, misses: 0, done: false };
  }
  /* typing on the slate: up to two digits, a leading zero is replaced */
  function typeDigit(st, d) {
    if (st.done) return false;
    d = String(d);
    if (!/^[0-9]$/.test(d)) return false;
    if (st.typed.length >= DIGITS) return false;
    st.typed = (st.typed === '0') ? d : st.typed + d;
    return true;
  }
  function erase(st) { if (st.done || !st.typed) return false; st.typed = st.typed.slice(0, -1); return true; }
  function answer(st) { return st.typed === '' ? null : parseInt(st.typed, 10); }

  /* ---- the slip table ---- */
  function rev(n) { return parseInt(String(n).split('').reverse().join(''), 10); }
  function classify(a, n) {
    if (a === null || a === undefined) return 'none';
    if (a === n) return 'right';
    if (a >= 10 && a % 10 !== 0 && rev(a) === n) return 'reversed';
    if (a >= 1 && a <= 9 && n >= 10 && n % 10 === a) return 'oneDigit';
    if (a === 10 && n > 10) return 'tensOnly';
    return a < n ? 'more' : 'fewer';
  }
  /* Check reads the slate against the crates; a wrong number written counts as a miss (an empty slate does not) */
  function check(st) {
    if (st.done) return { ok: true, slip: 'right' };
    var a = answer(st), slip = classify(a, st.n);
    var res = { ok: slip === 'right', slip: slip, a: a, n: st.n };
    if (!res.ok && slip !== 'none') st.misses++;
    st.checked = res;
    if (res.ok) st.done = true;
    return res;
  }

  /* ---- the help ladder ----
     0 nothing shown · 1 the landmark numbers below n (only when one exists, n ≥ 6) ·
     2 the count-on numbers from the last landmark, "?" on the last fruit.
     A first miss on 5 or fewer gets no numbers (count again). No round is ever 0. */
  function lastLandmark(n) { var L = 0; for (var i = 0; i < LANDMARKS.length; i++) if (LANDMARKS[i] < n) L = LANDMARKS[i]; return L; }
  function helpLevel(st) {
    if (st.done || st.misses === 0) return 0;
    if (st.misses >= 2) return 2;
    return lastLandmark(st.n) > 0 ? 1 : 0;
  }
  /* the chip on each fruit (index i = the (i+1)-th fruit): '' | number | '?' */
  function chips(st) {
    var n = st.n, out = [], i, L = lastLandmark(n), lv = helpLevel(st);
    for (i = 0; i < n; i++) out.push('');
    if (st.done) {
      for (i = 0; i < n; i++) if (LANDMARKS.indexOf(i + 1) >= 0) out[i] = i + 1;
      if (n > 0) out[n - 1] = n;
      return out;
    }
    if (lv >= 1) for (i = 0; i < n; i++) if (LANDMARKS.indexOf(i + 1) >= 0 && i + 1 < n) out[i] = i + 1;
    if (lv === 2) { for (i = L; i < n - 1; i++) out[i] = i + 1; out[n - 1] = '?'; }
    return out;
  }
  function hintKey(st) {
    var c = st.checked, slip = c ? c.slip : 'none';
    if (slip === 'none') return 'hintNone';
    var lv = helpLevel(st);
    if (lv === 2) return 'hintCountOn';
    if (slip === 'reversed') return 'hintReversed';
    if (slip === 'oneDigit') return 'hintOneDigit';
    if (slip === 'tensOnly') return 'hintTensOnly';
    if (lv === 0) return slip === 'more' ? 'hintRecountMore' : 'hintRecountFewer';
    return slip === 'more' ? 'hintMore' : 'hintFewer';
  }

  /* ---- where fruit i sits: crate, box within the crate (frame order: a line of five first) ---- */
  function place(i) { var c = Math.floor(i / CRATE), j = i % CRATE; return { crate: c, box: j, line: Math.floor(j / LINE), pos: j % LINE }; }

  /* ---- layout ----
     W = the stage content width. From 560 ('row'): the crates one above the other, 5 × 2 boxes each;
     a box is as wide as the stage allows (the crates fill the width, boxW ≤ 150) and at most 104 tall,
     so a crate of twenty + the key row + the hint bubble fit 1366 × 900; the slate and ONE aligned row
     of eleven keys under them (the slate on its own line below 632). Below 560 ('stack'): the crates
     side by side as vertical frames (2 × 5), boxes as wide as the stage allows and ≤ 68 tall so Check stays in the 360 × 740 fold with the
     hint bubble shown; the slate above with a pencil that opens a floating pad. The fruit is box × box. */
  var FRAME = 8, GAP = 3, SLATE = 96;
  function layout(W, nCrates) {
    nCrates = nCrates || 2;
    if (W >= 560) {
      var boxW = Math.min(150, Math.floor((W - 2 * FRAME - 4 * GAP) / 5)), box = Math.min(104, boxW);
      var inline = W >= SLATE + 12 + 11 * 44 + 10 * 4;
      var key = inline ? Math.min(52, Math.floor((W - SLATE - 12 - 10 * 4) / 11)) : Math.min(52, Math.floor((W - 10 * 4) / 11));
      return { mode: 'row', box: box, boxW: boxW, frame: FRAME, gap: GAP, key: key, slate: SLATE, inline: inline, cols: 5, rows: 2, between: 10 };
    }
    var fr = 5, g = 2, between = 8;
    var bw = nCrates === 1 ? Math.floor((W - 2 * fr - g) / 2) : Math.floor((W - between - 4 * fr - 2 * g) / 4);
    bw = Math.min(bw, 120);
    var b = Math.min(bw, nCrates === 1 ? 84 : 68);
    return { mode: 'stack', box: b, boxW: bw, frame: fr, gap: g, key: 50, slate: SLATE, inline: false, cols: 2, rows: 5, between: between };
  }

  var api = {
    MAX: MAX, DIGITS: DIGITS, CRATE: CRATE, LINE: LINE, POOLS: POOLS, LOOKS: LOOKS, NOUNS: NOUNS, THEME: THEME, LANDMARKS: LANDMARKS,
    rng: rng, shuffle: shuffle, crates: crates, rounds: rounds, newState: newState, typeDigit: typeDigit, erase: erase, answer: answer,
    classify: classify, check: check, lastLandmark: lastLandmark, helpLevel: helpLevel, chips: chips, hintKey: hintKey, place: place, layout: layout
  };
  global.FruitCratesCore = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
}(typeof window !== 'undefined' ? window : globalThis));
