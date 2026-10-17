/* =====================================================================
   partner-bows-core.js — the MODEL of the Partner Bows, activity #17 of
   the one-by-one rebuild: "Which group has more?" (K.CC.C.6).
   Design sheet: docs/activities-rebuild/017-partner-bows.md
   ---------------------------------------------------------------------
   Pure functions, no DOM, Node-loadable (scripts/verify-partner-bows-core.js
   drives it; scripts/mutate-partner-bows.js proves the gate bites).

   THE SKILL. K.CC.C.6: say whether one group has more than, fewer than or
   the same as another (up to 10) — by matching or by counting. THE
   INVENTION IS THE PARTNER BOWS: two groups that belong together (bees and
   flowers, bunnies and carrots…) lie on two mats, and the spacing is often
   a trick (the smaller group spread out, the bigger one huddled — the
   conservation trap — but not always, so spacing never gives the answer). The child pairs them: a tap on one in the top group,
   a tap on one in the bottom group, and both wear the same bow. Whoever is
   left without a bow shows the answer. Or the child counts. The answer is a
   "More" on one mat or "The same". Miss 1 → a hint (pair them up / look
   who has no partner); miss 2 → the rest are paired for the child and the
   ones without a partner are ringed. Done → every pair bowed, both groups
   numbered. Never 0.
   ===================================================================== */
(function (global) {
  'use strict';

  /* contact sheet read 2026-10-17: the spring nest already holds chicks and the Easter egg is a
     painted egg, so bird/nest and chick/egg are out; these six fit together at a glance */
  var KINDS = [
    { a: 'bee', aTheme: 'spring', b: 'flower', bTheme: 'spring' },
    { a: 'bunny', aTheme: 'easter', b: 'carrot', bTheme: 'easter' },
    { a: 'squirrel', aTheme: 'forest creatures', b: 'acorn', bTheme: 'miscellaneous' },
    { a: 'mouse', aTheme: 'forest creatures', b: 'cheese', bTheme: 'breakfast' },
    { a: 'snail', aTheme: 'spring', b: 'leaf', bTheme: 'spring' },
    { a: 'robin', aTheme: 'spring', b: 'birdhouse', bTheme: 'spring' }
  ];
  /* a = the top group, b = the bottom group; trick = which group is spread out ('a' | 'b' | '').
     The spacing must NEVER predict the answer (review 2026-10-17: spreading only the smaller group
     made "pick the huddled one" win every round — a reverse tell): in most tricky rounds the
     spread group is the smaller one (the eye is fooled), in the others it is the bigger one (the
     eye happens to be right), and in "same" rounds one group is spread and one huddled */
  var POOLS = {
    to10: [
      { a: 6, b: 8, trick: 'a' }, { a: 7, b: 7, trick: 'b' }, { a: 9, b: 6, trick: 'a' },
      { a: 5, b: 4, trick: 'b' }, { a: 4, b: 9, trick: 'b' }, { a: 8, b: 8, trick: 'a' },
      { a: 10, b: 7, trick: 'b' }, { a: 3, b: 5, trick: 'b' }, { a: 6, b: 7, trick: 'a' }
    ],
    to5: [
      { a: 3, b: 4, trick: 'a' }, { a: 5, b: 5, trick: 'b' }, { a: 4, b: 2, trick: 'a' },
      { a: 2, b: 5, trick: 'b' }, { a: 5, b: 3, trick: 'b' }, { a: 1, b: 3, trick: '' },
      { a: 4, b: 4, trick: 'a' }, { a: 3, b: 2, trick: 'b' }
    ]
  };
  var PLACES = { to10: 12, to5: 8 };
  var RANGES = ['to5', 'to10'], SPACINGS = ['tricky', 'even'];
  var BOWS = 10;

  function rng(seed) { var a = 0; for (var i = 0; i < seed.length; i++) a = (a * 31 + seed.charCodeAt(i)) | 0; return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

  function rounds(range, prefix, spacing) {
    var key = POOLS[range] ? range : 'to10', out = [];
    for (var i = 0; i < POOLS[key].length; i++) {
      var p = POOLS[key][i], k = KINDS[i % KINDS.length];
      out.push({ id: (prefix || 'pb') + '-' + key + '-' + i, a: p.a, b: p.b, trick: spacing === 'even' ? '' : p.trick,
        kind: k, places: PLACES[key], answer: p.a > p.b ? 'a' : p.a < p.b ? 'b' : 'same' });
    }
    return out;
  }
  function newState(r) {
    return { id: r.id, a: r.a, b: r.b, trick: r.trick, kind: r.kind, places: r.places, answer: r.answer,
      pairs: [], pick: null, choice: null, misses: 0, checked: null, done: false, helped: false };
  }
  function pairOf(st, side, i) { for (var k = 0; k < st.pairs.length; k++) if (st.pairs[k][side === 'a' ? 0 : 1] === i) return k; return -1; }
  /* a tap on a creature: the first tap picks it; a tap on the other group pairs the two (one bow);
     a tap on a bowed one takes its pair apart; a tap on the picked one, or one in the same group,
     moves the pick */
  function tap(st, side, i) {
    if (!st || st.done || (side !== 'a' && side !== 'b') || i !== Math.floor(i) || i < 0 || i >= st[side]) return false;
    var k = pairOf(st, side, i);
    if (k >= 0) { st.pairs.splice(k, 1); st.pick = null; st.checked = null; return 'unpair'; }
    if (st.pick && st.pick.side !== side) {
      var pa = side === 'a' ? i : st.pick.i, pb = side === 'b' ? i : st.pick.i;
      st.pairs.push([pa, pb]); st.pick = null; st.checked = null; return 'pair';
    }
    if (st.pick && st.pick.side === side && st.pick.i === i) { st.pick = null; return 'unpick'; }
    st.pick = { side: side, i: i }; return 'pick';
  }
  function choose(st, c) { if (!st || st.done || (c !== 'a' && c !== 'b' && c !== 'same')) return false; st.choice = c; st.checked = null; return true; }
  function canPair(st) { return st.pairs.length < Math.min(st.a, st.b); }
  /* pair every one still free (the help, and the end): the lowest free of each side together */
  function pairAll(st) {
    var fa = [], fb = [], i;
    for (i = 0; i < st.a; i++) if (pairOf(st, 'a', i) < 0) fa.push(i);
    for (i = 0; i < st.b; i++) if (pairOf(st, 'b', i) < 0) fb.push(i);
    var n = Math.min(fa.length, fb.length);
    for (i = 0; i < n; i++) st.pairs.push([fa[i], fb[i]]);
    st.pick = null; return n;
  }
  function lone(st, side) { var out = []; for (var i = 0; i < st[side]; i++) if (pairOf(st, side, i) < 0) out.push(i); return out; }

  function check(st) {
    if (st.done) return { ok: true, slip: 'right' };
    var slip;
    if (!st.choice) slip = 'none';
    else if (st.choice !== st.answer) slip = 'wrong';
    else slip = 'right';
    var res = { ok: slip === 'right', slip: slip, choice: st.choice };
    if (res.ok) { st.done = true; pairAll(st); }
    else if (slip === 'wrong') { st.misses++; if (st.misses >= 2) { pairAll(st); st.helped = true; } }
    st.checked = res;
    return res;
  }
  function helpLevel(st) { return st.done ? 0 : Math.min(2, st.misses); }
  function hintKey(st) {
    var s = st.checked ? st.checked.slip : 'none';
    if (s === 'wrong') {
      if (helpLevel(st) >= 2) return 'hintTied';
      return canPair(st) ? 'hintPair' : 'hintLeft';
    }
    return 'hintStart';
  }
  /* the ones left without a partner are ringed: when done, or from miss 2 (until a change) */
  function showLone(st) { return st.done || (helpLevel(st) >= 2 && !!st.checked); }
  function celebrateKey(r) { return r.answer === 'a' ? 'celebrateMore' : r.answer === 'b' ? 'celebrateFewer' : 'celebrateSame'; }

  /* THE BENCH. Two mats of the same size, top group over bottom group, a seam between them for
     "The same". wide (W ≥ 560): 6 × 2 places, cell ≤ 112, picture cell − 6; stack (300–559, and
     < 280): 4 × 3 (4 × 2 up to five), cell ≤ 66, picture cell − 2; narrow (280–299, twelve places
     only): 6 × 2, picture = cell. */
  function layout(W, places) {
    W = Math.max(240, Math.floor(W)); places = places === 8 ? 8 : 12;
    var PAD = 8, cols, rows, cell, pic, mode;
    if (W >= 560) { mode = 'wide'; cols = places === 8 ? 4 : 6; rows = 2; cell = Math.min(112, Math.floor((W - 2 * PAD) / 6)); pic = cell - 6; }
    else if (W >= 300 || W < 280 || places === 8) { mode = 'stack'; cols = 4; rows = places === 8 ? 2 : 3; cell = Math.min(66, Math.floor((W - 2 * PAD) / 4)); pic = cell - 2; }
    else { mode = 'narrow'; cols = 6; rows = 2; cell = Math.floor((W - 2 * PAD) / 6); pic = cell; }
    return { mode: mode, cols: cols, rows: rows, cell: cell, pic: pic, pad: PAD, matW: cols * cell + 2 * PAD, matH: rows * cell + 2 * PAD };
  }
  /* the top-right place (two on the 320 phone) holds the mat's "More" button: no creature goes there */
  function reserved(L, c, r) { return r === 0 && (c === L.cols - 1 || (L.mode === 'narrow' && c === L.cols - 2)); }
  /* where a group lies on its mat: 'spread' = over the whole mat, as far apart as it goes;
     'huddle' = packed close from the left; 'even' = loose, at random places */
  function spots(st, side, L) {
    var n = st[side], s = L.pic, rand = rng(st.id + ':' + side + ':' + L.mode), out = [], i, c, r;
    var style = !st.trick ? 'even' : (st.trick === side ? 'spread' : 'huddle');
    var free = [];
    for (c = 0; c < L.cols; c++) for (r = 0; r < L.rows; r++) if (!reserved(L, c, r)) free.push([c, r]);   /* column by column */
    var tilt = function () { return Math.round((rand() - 0.5) * (L.mode === 'narrow' ? 10 : 18)); };
    var pickCells;
    if (style === 'huddle') pickCells = free.slice(0, n);
    else if (style === 'spread') {
      var zig = []; for (c = 0; c < L.cols; c++) { var col = free.filter(function (q) { return q[0] === c; }); if (c % 2) col.reverse(); zig = zig.concat(col); }
      pickCells = []; for (i = 0; i < n; i++) pickCells.push(zig[n === 1 ? Math.floor(zig.length / 2) : Math.round(i * (zig.length - 1) / (n - 1))]);   /* first place to last, evenly */
    } else {
      var sh = free.slice(); for (i = sh.length - 1; i > 0; i--) { var j = Math.floor(rand() * (i + 1)), t = sh[i]; sh[i] = sh[j]; sh[j] = t; }
      pickCells = sh.slice(0, n);
    }
    var room = L.cell - s, jit = style === 'huddle' ? 0.15 : 1;   /* a huddle stays tight */
    pickCells.forEach(function (q) { out.push({ x: L.pad + q[0] * L.cell + room / 2 + (rand() - 0.5) * room * jit, y: L.pad + q[1] * L.cell + room / 2 + (rand() - 0.5) * room * jit, tilt: tilt() }); });
    return out;
  }
  /* the footprint of a group: the box its pictures cover, as a share of the mat (what the eye
     judges "more" by) */
  function footprint(sp, L) {
    if (!sp.length) return 0;
    var x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    sp.forEach(function (p) { x0 = Math.min(x0, p.x); x1 = Math.max(x1, p.x + L.pic); y0 = Math.min(y0, p.y); y1 = Math.max(y1, p.y + L.pic); });
    return ((x1 - x0) * (y1 - y0)) / ((L.matW - 2 * L.pad) * (L.matH - 2 * L.pad));
  }

  var api = { KINDS: KINDS, POOLS: POOLS, PLACES: PLACES, RANGES: RANGES, SPACINGS: SPACINGS, BOWS: BOWS,
    rounds: rounds, newState: newState, pairOf: pairOf, tap: tap, choose: choose, canPair: canPair, pairAll: pairAll, lone: lone,
    check: check, helpLevel: helpLevel, hintKey: hintKey, showLone: showLone, celebrateKey: celebrateKey,
    layout: layout, reserved: reserved, spots: spots, footprint: footprint };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.PartnerBowsCore = api;
}(typeof window !== 'undefined' ? window : globalThis));
