/* =====================================================================
   letterbox-core.js — the MODEL of "Pip's Round" (K.CC.A.3), activity #6
   of the one-by-one rebuild (docs/activities-rebuild/006-letterbox.md).
   ---------------------------------------------------------------------
   Pure functions, no DOM, Node-loadable (scripts/verify-letterbox-core.js
   drives it; scripts/mutate-letterbox.js proves the gate bites).

   THE SKILL. K.CC.A.3, the reading face: read a written numeral 0–20.
   The apparatus is THE LETTERBOX STREET: five houses with PRINTED number
   plates and a van with three letters whose addresses are HANDWRITTEN
   (the handwriting instrument's own glyphs), so the number must be read,
   not matched. This core owns the pedagogy: the pools (to 10 / to 20),
   the two lure houses chosen from each letter's confusables, the seeded
   house order, the delivery (one slot only), the slip named from the two
   numbers, the help after two misses, the handwriting per locale, the
   layout. It LOADS two shipped instruments unchanged and never edits them:
     NumberTraceCore — the digit glyphs 0–9, the per-locale barred seven;
     StrokeTraceCore — flatten(), the same curve the writing line draws.
   ===================================================================== */
(function (global) {
  'use strict';

  var NT = global.NumberTraceCore, ST = global.StrokeTraceCore;
  if ((!NT || !ST) && typeof require === 'function') {
    try { NT = NT || require('./number-trace-core.js').NumberTraceCore; } catch (e) { /* the gate points at a dir */ }
    try { ST = ST || require('./stroke-trace-core.js').StrokeTraceCore; } catch (e) { /* idem */ }
  }

  var HOUSES = 5, LETTERS = 3, HELP_AFTER = 2;
  /* the letters per round, in order — sequenced, not random: look-alikes first, then the teens, then teens beside their lone digit */
  var POOLS = {
    to20: [[2, 5, 7], [4, 9, 6], [0, 8, 3], [1, 10, 12], [13, 14, 11], [15, 17, 16], [20, 18, 19], [13, 3, 16], [14, 18, 7]],
    to10: [[2, 5, 7], [4, 9, 6], [0, 8, 3], [1, 10, 7], [1, 7, 9], [3, 2, 5], [8, 0, 4], [10, 6, 9]]
  };
  /* the lure policy per round: SN = one STRONG lure (reversal / teen of a digit) + one NEAR lure;
     NN = two NEAR lures, used where the letters already confuse each other (14 beside 13 and 15),
     so that the biggest plate on a street is sometimes a letter and never a tell */
  var POLICY = { to20: ['SN', 'SN', 'SN', 'SN', 'SN', 'NN', 'SN', 'SN', 'NN'], to10: ['SN', 'SN', 'SN', 'SN', 'SN', 'SN', 'SN', 'SN'] };
  var MAXN = { to20: 99, to10: 10 };
  var LOOKALIKE = { 6: 9, 9: 6, 2: 5, 5: 2, 1: 7, 7: 1, 3: 8, 8: 3, 0: 8, 4: 9 };   /* the pair a K child confuses in print or in a young hand */
  /* the neighbours who live on the street: library nouns of the `animals` theme */
  var RESIDENTS = ['cat', 'dog', 'duck', 'fox', 'owl', 'pig', 'rabbit', 'sheep', 'turtle', 'horse', 'elephant', 'giraffe', 'panda', 'penguin', 'koala', 'zebra', 'tiger', 'raccoon', 'donkey', 'hippopotamus', 'wolf', 'swan', 'camel', 'moose'];
  var THEME = 'animals';
  /* house geometry in units of its width (the svg viewBox is 100 × 136) */
  var GEOM = { h: 1.36, plateFont: 0.24, picture: 0.84 };

  /* ---- a seeded PRNG (mulberry32 over a string hash) ---- */
  function hash(s) { var h = 2166136261 >>> 0; s = String(s); for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; } return h >>> 0; }
  function rng(seed) { var a = hash(seed); return function () { a |= 0; a = (a + 0x6D2B79F5) | 0; var t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function shuffle(arr, r) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(r() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  /* ---- the slip table: what a wrong door says about the letter ---- */
  function rev(n) { return parseInt(String(n).split('').reverse().join(''), 10); }
  function classify(n, h) {
    if (n === h) return 'right';
    var tn = n >= 10, th = h >= 10;
    if (tn && th && rev(n) === h && n % 10 !== 0) return 'reversed';        /* 13 ↔ 31 */
    if (tn && !th && h === n % 10) return 'oneDigit';                        /* letter 14, door 4 */
    if (!tn && th && h % 10 === n && n !== 0) return 'twoDigits';            /* letter 4, door 14 */
    if (tn && th && Math.floor(n / 10) === Math.floor(h / 10)) return 'lastDigit';   /* 14 among 13, 15 */
    if (tn && th && n % 10 === h % 10) return 'firstDigit';                  /* 10 and 20 */
    if (!tn && !th && LOOKALIKE[n] === h) return 'shape';                    /* 6 / 9 */
    return 'off';
  }
  /* the confusables of one letter: STRONG (the misconception reads a different, bigger number —
     the reversal 13→31, the teen of a digit 4→14) and NEAR (the lone digit 14→4, the look-alike
     6→9, the neighbours), each in priority order */
  function confusables(n, max) {
    var strong = [], near = [], push = function (list, v) { if (v !== n && v >= 0 && v <= max && strong.indexOf(v) < 0 && near.indexOf(v) < 0) list.push(v); };
    if (n >= 10) {
      if (n % 10 !== 0 && n !== 11) push(strong, rev(n));
      push(strong, n + 10);
      if (n % 10 !== 0) push(near, n % 10); if (n !== 10) push(near, n - 1); push(near, n + 1); push(near, n - 10);
    } else {
      if (n !== 0) push(strong, 10 + n);
      if (LOOKALIKE[n] !== undefined) push(near, LOOKALIKE[n]);
      push(near, n - 1); push(near, n + 1);
    }
    return { strong: strong, near: near };
  }
  /* does letter n have a confusable among the other plates on the street? */
  function coveredBy(n, plates) { for (var i = 0; i < plates.length; i++) if (plates[i] !== n && classify(n, plates[i]) !== 'off') return true; return false; }
  /* the two lure houses: one STRONG lure (SN) or NEAR lure (NN) walked from the first letter that no
     other plate yet confuses, then one NEAR lure walked from the next uncovered letter — so every
     letter on the street has a confusable, and a bigger plate is no more likely a lure than a smaller one */
  function lures(letters, max, policy) {
    var lists = letters.map(function (n) { return confusables(n, max); }), out = [];
    var confuses = function (v) { for (var i = 0; i < letters.length; i++) if (classify(letters[i], v) !== 'off') return true; return false; };
    /* a candidate that names a slip for some letter is preferred over a mere neighbour */
    var walk = function (kind, start) {
      for (var pass = 0; pass < 2; pass++) for (var k = 0; k < 6; k++) for (var j = 0; j < lists.length; j++) {
        var v = lists[(start + j) % lists.length][kind][k];
        if (v !== undefined && letters.indexOf(v) < 0 && out.indexOf(v) < 0 && (pass === 1 || confuses(v))) return v;
      }
      return undefined;
    };
    var uncovered = function (fallback) { for (var i = 0; i < letters.length; i++) if (!coveredBy(letters[i], letters.concat(out))) return i; return fallback; };
    var first = policy === 'NN' ? 'near' : 'strong', s0 = uncovered(0);
    var a = walk(first, s0); if (a === undefined) a = walk(first === 'near' ? 'strong' : 'near', s0); if (a !== undefined) out.push(a);
    var s1 = uncovered((s0 + 1) % letters.length);
    var b = walk('near', s1); if (b === undefined) b = walk('strong', s1); if (b !== undefined) out.push(b);
    return out;
  }

  /* ---- rounds: deterministic from the range + seed ---- */
  function rounds(range, seed) {
    var pool = POOLS[range] || POOLS.to20, max = MAXN[range] || 99, out = [];
    for (var i = 0; i < pool.length; i++) {
      var letters = pool[i].slice(), r = rng((seed || 'lb') + ':' + range + ':' + i);
      var houses = shuffle(letters.concat(lures(letters, max, (POLICY[range] || [])[i])), r);
      var who = shuffle(RESIDENTS, r).slice(0, HOUSES);
      out.push({ id: range + '-' + i, range: range, letters: letters, houses: houses.map(function (n, j) { return { n: n, resident: who[j] }; }) });
    }
    return out;
  }

  /* ---- state ---- */
  function newState(round, lang, opts) {
    opts = opts || {};
    return {
      id: round.id, range: round.range, lang: lang,
      houses: round.houses.map(function (h) { return { n: h.n, resident: h.resident, open: false }; }),
      letters: round.letters.slice(), at: 0, misses: 0, help: false,
      spoken: !!opts.spoken, revealed: !opts.spoken, done: false, log: []
    };
  }
  function letter(st) { return st.done ? null : st.letters[st.at]; }
  function houseOf(st, n) { for (var i = 0; i < st.houses.length; i++) if (st.houses[i].n === n) return i; return -1; }
  function rightHouse(st) { var n = letter(st); return n === null ? -1 : houseOf(st, n); }
  /* the current letter goes to house i: 'right' (the slot takes it) | 'wrong' (+ the slip, + help) | 'none' */
  function deliver(st, i) {
    var n = letter(st), h = st.houses[i];
    if (n === null || !h) return { result: 'none' };
    if (h.open) return { result: 'none' };
    if (h.n === n) {
      h.open = true; st.log.push({ n: n, misses: st.misses });
      st.at++; st.misses = 0; st.help = false; st.revealed = !st.spoken;
      if (st.at >= st.letters.length) { st.done = true; return { result: 'right', house: i, n: n, round: true }; }
      return { result: 'right', house: i, n: n, round: false };
    }
    st.misses++;
    var helped = false;
    if (st.misses >= HELP_AFTER && !st.help) { st.help = true; helped = true; }
    return { result: 'wrong', house: i, n: n, door: h.n, slip: classify(n, h.n), helped: helped };
  }
  function reveal(st) { if (st.done) return false; st.revealed = true; return true; }
  function verdict(st) { return st.done ? 'done' : 'unfinished'; }
  function delivered(st) { return st.at; }

  /* ---- the handwritten address: one flattened path set per digit ---- */
  function handwriting(n, lang) {
    var digits = String(n).split(''), out = [];
    for (var i = 0; i < digits.length; i++) {
      var strokes = NT.glyphFor(digits[i], lang);
      out.push({ digit: digits[i], strokes: strokes.map(function (s) { return ST.flatten(s, 1.2); }) });
    }
    return out;
  }

  /* ---- layout: one row of five from 560 px; three + two + the van below ---- */
  function layout(W) {
    if (W >= 560) { var gap = 12; return { mode: 'row', cols: HOUSES, gap: gap, hw: Math.floor((W - (HOUSES - 1) * gap) / HOUSES) }; }
    var g = 8; return { mode: 'grid', cols: 3, gap: g, hw: Math.floor((W - 2 * g) / 3) };
  }

  var api = {
    HOUSES: HOUSES, LETTERS: LETTERS, HELP_AFTER: HELP_AFTER, POOLS: POOLS, POLICY: POLICY, MAXN: MAXN, LOOKALIKE: LOOKALIKE, RESIDENTS: RESIDENTS, THEME: THEME, GEOM: GEOM,
    rng: rng, shuffle: shuffle, classify: classify, confusables: confusables, coveredBy: coveredBy, lures: lures, rounds: rounds,
    newState: newState, letter: letter, houseOf: houseOf, rightHouse: rightHouse, deliver: deliver, reveal: reveal, verdict: verdict, delivered: delivered,
    handwriting: handwriting, layout: layout,
    deps: function () { return { NT: NT, ST: ST }; }
  };
  global.LetterboxCore = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
}(typeof window !== 'undefined' ? window : globalThis));
