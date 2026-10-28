/* =====================================================================
   round-trip-core.js — the model of THE ROUND-TRIP CART (row 143, "Gus's
   Snack Cart", 2.NBT.B.5; G2-251/255/256/259, G2-393, G3-389). Pure, no
   DOM. Design: docs/activities-rebuild/designs/143-gus-snack-cart.md
   ---------------------------------------------------------------------
   The child types where the story leaves Gus's stock. The cart drives
   out to that number, turns, and drives the story's INVERSE back: only
   the right answer brings it home to the number it started from. A
   route chains three such trips; "round first" adds the estimate the
   exact answer must sit next to.
   ===================================================================== */
(function (root) {
  'use strict';

  /* the snacks: library picture + vocabulary key (the story names the picture) */
  var ITEMS = [
    { key: 'cookie', pic: 'bakery/cookie' },
    { key: 'raspberry', pic: 'At the Supermarket/raspberry' },
    { key: 'bagel', pic: 'bakery/bagel' },
    { key: 'acorn', pic: 'miscellaneous/acorn' },
    { key: 'carrot', pic: 'At the Supermarket/carrot' },
    { key: 'apple', pic: 'At the Supermarket/apple' },
    { key: 'pretzel', pic: 'bakery/pretzel' },
    { key: 'cherry', pic: 'At the Supermarket/cherry' }
  ];
  var CART = 'At the Supermarket/cart';
  /* one stop: the old eight stories — [start, signed step, snack, band] */
  var ONE = [[45, -8, 0, 1], [23, 15, 1, 1], [60, -25, 2, 2], [34, 9, 3, 2], [70, -40, 4, 1], [27, 36, 5, 3], [88, -16, 6, 2], [19, 47, 7, 3]];
  /* a route of three stops (G2-393): [start, [three signed steps]] */
  var ROUTE = [[24, [30, -6, 15]], [58, [-20, 7, -19]], [17, [25, -9, 40]], [66, [-8, 16, -30]], [39, [12, -24, 35]], [81, [-40, 9, -13]], [45, [8, -28, 50]], [92, [-35, 6, -18]]];
  /* round first (G3-389): addition only */
  var ROUND = [[38, 21], [43, 36], [25, 42], [17, 34], [61, 28], [46, 45], [33, 12], [54, 19]];

  function modeOf(trips, round) { return trips === 'route' ? 'route' : round === 'on' ? 'round' : 'one'; }
  function rounds(mode) {
    if (mode === 'route') return ROUTE.map(function (r, i) { return { k: i, start: r[0], steps: r[1].slice(), item: i % ITEMS.length, band: 1 }; });
    if (mode === 'round') return ROUND.map(function (r, i) { return { k: i, start: r[0], steps: [r[1]], item: i % ITEMS.length, band: 1 }; });
    return ONE.map(function (r, i) { return { k: i, start: r[0], steps: [r[1]], item: r[2], band: r[3] }; });
  }
  function nearerTen(n) { return Math.floor((n + 5) / 10) * 10; }
  function posts(n) { var lo = Math.floor(n / 10) * 10; return [lo, lo + 10]; }
  /* the story's hops: tens first, then ones, in the step's direction */
  function hops(step) { var m = Math.abs(step); return { tens: Math.floor(m / 10), ones: m % 10, dir: step < 0 ? -1 : 1 }; }
  /* the round trip: out to the claim, back by the INVERSE of the story's step */
  function tripFor(start, step, claim) { var back = claim - step; return { from: start, step: step, claim: claim, back: back, closes: back === start, gap: back - start }; }
  function stops(rd) { var out = [], v = rd.start; rd.steps.forEach(function (s) { v += s; out.push(v); }); return out; }

  /* ---------- state ---------- */
  function boxesOf(mode) { return mode === 'route' ? ['leg0', 'leg1', 'leg2'] : mode === 'round' ? ['about', 'answer'] : ['answer']; }
  function newState(mode, k) {
    var rd = rounds(mode)[k];
    var st = { mode: mode, k: k, rd: rd, typed: {}, rounded: [null, null], focus: null, column: false, misses: 0, help: false, trip: null, aboutOk: null, done: false, cart: rd.start };
    boxesOf(mode).forEach(function (b) { st.typed[b] = ''; });
    st.focus = mode === 'round' ? null : boxesOf(mode)[0];
    return st;
  }
  function roundingDone(st) { return st.mode !== 'round' || (st.rounded[0] != null && st.rounded[1] != null); }
  function maxLen(box) { return box === 'about' ? 3 : 2; }
  function setFocus(st, box) { if (st.done || boxesOf(st.mode).indexOf(box) < 0) return false; if (box === 'about' || box === 'answer') { if (!roundingDone(st)) return false; } st.focus = box; return true; }
  /* typing clears the last trip's marks (the bracket, the ghost) until the next Check */
  function type(st, d) {
    if (st.done || !st.focus) return false;
    var cur = st.typed[st.focus];
    if (d === 'del') { if (!cur) return false; st.typed[st.focus] = cur.slice(0, -1); st.trip = null; return true; }
    if (!/^[0-9]$/.test(d) || cur.length >= maxLen(st.focus)) return false;
    if (cur === '0') cur = '';
    st.typed[st.focus] = cur + d; st.trip = null;
    /* a route box with two digits hands on to the next empty sign */
    if (st.mode === 'route' && st.typed[st.focus].length === 2) { var bx = boxesOf('route'), at = bx.indexOf(st.focus); for (var i = at + 1; i < bx.length; i++) if (!st.typed[bx[i]]) { st.focus = bx[i]; break; } }
    return true;
  }
  /* round first: tap a post — only the nearer ten takes the tag (five rounds up) */
  function roundTap(st, i, post) {
    if (st.mode !== 'round' || st.done) return 'no';
    var n = i === 0 ? st.rd.start : st.rd.steps[0];
    if (i !== (st.rounded[0] == null ? 0 : 1) || st.rounded[i] != null) return 'no';
    if (posts(n).indexOf(post) < 0) return 'no';
    if (post !== nearerTen(n)) return n % 10 === 5 ? 'five' : 'far';
    st.rounded[i] = post;
    if (roundingDone(st)) st.focus = 'about';
    return 'ok';
  }
  function unround(st, i) { if (st.mode !== 'round' || st.done || st.rounded[i] == null || st.typed.about) return false; st.rounded[i] = null; if (i === 0) st.rounded[1] = null; st.focus = null; return true; }
  function aboutValue(st) { return st.rounded[0] + st.rounded[1]; }

  /* Check: a gentle note (no miss) or the round trip */
  function check(st) {
    if (st.done) return { result: 'no' };
    if (st.mode === 'round' && !roundingDone(st)) return { result: 'note', key: 'hintRound' };
    if (st.mode === 'round' && st.typed.about === '') { st.focus = 'about'; return { result: 'note', key: 'hintAbout' }; }
    var bx = boxesOf(st.mode), empty = bx.filter(function (b) { return b !== 'about' && st.typed[b] === ''; })[0];
    if (empty) { st.focus = empty; return { result: 'note', key: st.mode === 'route' ? 'hintLeg' : 'hintStart' }; }
    var legs = [], from = st.rd.start, fail = -1;
    st.rd.steps.forEach(function (s, i) {
      if (fail >= 0) return;
      var claim = +st.typed[st.mode === 'route' ? 'leg' + i : 'answer'], t = tripFor(from, s, claim); t.i = i;
      legs.push(t); if (!t.closes) fail = i; else from = claim;
    });
    st.aboutOk = st.mode === 'round' ? +st.typed.about === aboutValue(st) : null;
    st.trip = { legs: legs, fail: fail };
    if (fail < 0) { st.done = true; st.cart = st.rd.start; return { result: 'home', trip: st.trip }; }
    st.misses++; st.help = st.misses >= 2;
    return { result: 'away', trip: st.trip };
  }
  /* literal keys only (the reachability gate reads them) */
  function hint(st) {
    var T = st.trip; if (!T || T.fail < 0) return null;
    var L = T.legs[T.fail];
    if (st.help) return 'hintHops';
    if (L.back < 0 || L.back > 100) return 'hintOff';
    return 'hintGap';
  }
  /* free play: the cart rolls anywhere on the road once the round is home */
  function drive(st, n) { if (!st.done) return false; n = Math.max(0, Math.min(100, Math.round(n))); if (n === st.cart) return false; st.cart = n; return true; }

  function shuffle(a, rnd) { a = a.slice(); for (var k = a.length - 1; k > 0; k--) { var j = Math.floor(rnd() * (k + 1)), x = a[k]; a[k] = a[j]; a[j] = x; } return a; }
  /* order-only reshuffle inside the bands, never the same order twice */
  function plan(mode, rnd, prev) {
    rnd = rnd || Math.random;
    var R = rounds(mode), bands = {};
    R.forEach(function (r) { (bands[r.band] = bands[r.band] || []).push(r.k); });
    var keys = Object.keys(bands).sort();
    for (var a = 0; a < 2000; a++) {
      var o = []; keys.forEach(function (b) { o = o.concat(shuffle(bands[b], rnd)); });
      if (!prev || prev.join() !== o.join()) return { order: o };
    }
    var f = []; keys.forEach(function (b) { f = f.concat(bands[b].slice().reverse()); }); return { order: f };
  }
  function band(W) { return { wide: W >= 560, cramp: W < 310 }; }

  var api = { ITEMS: ITEMS, CART: CART, ONE: ONE, ROUTE: ROUTE, ROUND: ROUND, modeOf: modeOf, rounds: rounds, nearerTen: nearerTen, posts: posts, hops: hops, tripFor: tripFor, stops: stops, boxesOf: boxesOf, newState: newState, roundingDone: roundingDone, setFocus: setFocus, type: type, roundTap: roundTap, unround: unround, aboutValue: aboutValue, check: check, hint: hint, drive: drive, plan: plan, band: band };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.RoundTripCore = api;
})(typeof window !== 'undefined' ? window : this);
