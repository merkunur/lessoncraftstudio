/* =====================================================================
   acorn-sieve-core.js — the model of THE ACORN SIEVE (row 144, "Tally's
   Acorn Baskets", 2.NBT.B.6; G1-112, G2-313). Pure, no DOM.
   Design: docs/activities-rebuild/designs/144-tally-squirrel.md
   ---------------------------------------------------------------------
   Each basket holds cups of ten and loose acorns. Tipping a basket puts
   its cups and its loose acorns on Tally's sieve; shaking drops every
   loose acorn through the holes into the tray (grooves of ten) while the
   cups stay on top. So all the tens of all the baskets end up together
   and all the ones end up together — the partial-sums method as a
   machine. The child writes the cups, the loose acorns and the total;
   Check compares each window with what lies on the sieve and in the
   tray. A full groove rolls into a cup (the ten inside the ones).
   Faces: three small baskets (loose only, total up to 10) · two or three
   baskets · up to four baskets (default) · a number wall.
   ===================================================================== */
(function (root) {
  'use strict';

  var TALLY = 'forest creatures/squirrel';
  /* up to four baskets: the old activity's nine rounds — [baskets, band] */
  var FOUR = [[[23, 14], 1], [[31, 25], 1], [[12, 34, 21], 1], [[42, 15, 23], 2], [[21, 14, 32, 11], 2], [[33, 26, 18], 2], [[15, 22, 34, 11], 3], [[44, 28], 3], [[13, 21, 32, 24], 3]];
  /* two or three baskets: the ones never reach ten */
  var FEW = [[21, 13], [32, 15], [14, 22, 31], [11, 23, 42], [25, 13, 21], [34, 12], [16, 22, 30], [41, 12, 25]];
  /* three small baskets (G1-112): loose acorns only, the total up to ten */
  var SMALL = [[2, 1, 1], [1, 3, 1], [2, 2, 2], [3, 1, 3], [4, 3, 1], [2, 5, 2], [3, 4, 3]];
  /* the number wall (G2-313): the three bottom bricks */
  var WALL = [[12, 15, 21], [14, 23, 18], [25, 11, 32], [16, 19, 26], [31, 12, 27], [13, 28, 15], [22, 17, 19], [18, 26, 11]];
  /* a wall brick and the two bricks it stands on */
  var SUPPORTS = { 3: [0, 1], 4: [1, 2], 5: [3, 4] };
  var GROOVE = 10, GROOVES = 4;

  function faceOf(v) { return v === 'small' || v === 'few' || v === 'wall' ? v : 'four'; }
  function rounds(face) {
    if (face === 'wall') return WALL.map(function (b, i) { return { k: i, base: b.slice(), band: 1 }; });
    var T = face === 'small' ? SMALL : face === 'few' ? FEW : null;
    if (T) return T.map(function (n, i) { return { k: i, nums: n.slice(), band: 1 }; });
    return FOUR.map(function (r, i) { return { k: i, nums: r[0].slice(), band: r[1] }; });
  }
  function bricksOf(base) { var a = base[0], b = base[1], c = base[2]; return [a, b, c, a + b, b + c, a + b + b + c]; }
  function tens(n) { return Math.floor(n / 10); }
  function ones(n) { return n % 10; }
  function sum(a) { return a.reduce(function (s, x) { return s + x; }, 0); }

  /* ---------- state ---------- */
  function shownWindows(face) { return face === 'small' ? ['loose', 'all'] : face === 'wall' ? ['cups', 'loose', 'all'] : ['cups', 'loose', 'all']; }
  function neededWindows(face) { return face === 'small' || face === 'wall' ? ['all'] : ['cups', 'loose', 'all']; }
  function maxLen(w) { return w === 'cups' ? 1 : 2; }
  function emptyBench(st) { st.cups = 0; st.sieve = 0; st.tray = 0; st.rolled = 0; st.shaken = false; st.win = { cups: '', loose: '', all: '' }; st.misses = 0; st.help = false; st.verdict = null; st.covered = st.cloth; }
  function tubsFor(st) {
    if (st.face !== 'wall') return st.rd.nums.map(function (n) { return { n: n, tipped: false }; });
    return SUPPORTS[st.active].map(function (b) { return { n: st.bricks[b], tipped: false, brick: b }; });
  }
  function newState(face, k, cloth) {
    face = faceOf(face);
    var rd = rounds(face)[k];
    var st = { face: face, k: k, rd: rd, cloth: !!cloth, done: false, focus: null };
    if (face === 'wall') { st.bricks = bricksOf(rd.base); st.filled = [true, true, true, false, false, false]; st.active = 3; }
    emptyBench(st);
    st.tubs = tubsFor(st);
    st.focus = face === 'wall' ? null : face === 'small' ? 'all' : 'cups';
    return st;
  }
  /* what the round asks for: the sum of the baskets, or the active brick */
  function target(st) { return st.face === 'wall' ? st.bricks[st.active] : sum(st.rd.nums); }
  function allTipped(st) { return st.tubs.every(function (t) { return t.tipped; }); }

  /* ---------- the hand ---------- */
  /* tip a basket: its cups and its loose acorns land on the sieve (never twice) */
  function tip(st, i) {
    var t = st.tubs[i];
    if (st.done || !t || t.tipped || st.face === 'wall') return false;
    t.tipped = true; st.cups += tens(t.n); st.sieve += ones(t.n); st.verdict = null;
    return true;
  }
  /* the wall: tapping the empty brick pours both bricks under it */
  function pour(st) {
    if (st.done || st.face !== 'wall' || allTipped(st)) return false;
    st.tubs.forEach(function (t) { if (!t.tipped) { t.tipped = true; st.cups += tens(t.n); st.sieve += ones(t.n); } });
    st.verdict = null; st.focus = 'all';
    return true;
  }
  /* shake: every loose acorn drops through a hole into the tray; the cups stay on top */
  function shake(st) {
    if (st.covered || st.sieve === 0) return 0;
    var moved = st.sieve; st.tray += moved; st.sieve = 0; st.shaken = true; st.verdict = null;
    return moved;
  }
  function grooves(st) { var out = [], left = st.tray; for (var g = 0; g < GROOVES; g++) { out.push(Math.max(0, Math.min(GROOVE, left))); left -= GROOVE; } return out; }
  function fullGrooves(st) { return Math.floor(st.tray / GROOVE); }
  /* a full groove rolls into a cup and climbs back onto the sieve, where it no longer fits through */
  function grooveToCup(st) {
    if (st.done || st.covered || st.tray < GROOVE) return false;
    st.tray -= GROOVE; st.cups += 1; st.rolled += 1; st.verdict = null;
    return true;
  }
  function setFocus(st, w) {
    if (st.done || shownWindows(st.face).indexOf(w) < 0) return false;
    if (st.face === 'wall' && w === 'all' && !allTipped(st)) return false;
    st.focus = w; return true;
  }
  /* typing clears the last Check's marks until the next Check */
  function type(st, d) {
    if (st.done || !st.focus) return false;
    var cur = st.win[st.focus];
    if (d === 'del') { if (!cur) return false; st.win[st.focus] = cur.slice(0, -1); st.verdict = null; return true; }
    if (!/^[0-9]$/.test(d) || cur.length >= maxLen(st.focus)) return false;
    if (cur === '0' && maxLen(st.focus) > 1) cur = '';
    st.win[st.focus] = cur + d; st.verdict = null;
    return true;
  }

  /* Check: a gentle note (no miss), or each window against what lies there */
  function check(st) {
    if (st.done) return { result: 'no' };
    if (!allTipped(st)) return { result: 'note', key: st.face === 'wall' ? 'hintPour' : 'hintTip' };
    var need = neededWindows(st.face), empty = need.filter(function (w) { return st.win[w] === ''; })[0];
    if (empty) { st.focus = empty; return { result: 'note', key: st.face === 'wall' ? 'hintBrick' : st.face === 'small' ? 'hintTotal' : 'hintFill' } ; }
    /* the reveal: the cloth comes off and an unshaken sieve shakes itself */
    var wasCovered = st.covered; st.covered = false;
    var autoShook = st.sieve > 0 ? shake(st) : 0;
    var truth = { cups: st.cups, loose: st.tray, all: target(st) }, wrongs = [];
    shownWindows(st.face).forEach(function (w) { if (st.win[w] !== '' && +st.win[w] !== truth[w]) wrongs.push(w); });
    if (!wrongs.length) {
      if (st.face === 'wall' && st.active < 5) {
        var at = st.active; st.filled[at] = true; st.active = at + 1;
        emptyBench(st); st.tubs = tubsFor(st); st.focus = null;
        return { result: 'brick', brick: at, value: st.bricks[at], revealed: wasCovered, shook: autoShook };
      }
      if (st.face === 'wall') st.filled[5] = true;
      st.done = true; st.focus = null; st.verdict = null;
      return { result: 'ok', revealed: wasCovered, shook: autoShook };
    }
    st.misses++; st.help = st.misses >= 2;
    st.verdict = { wrong: wrongs[0], wrongs: wrongs, truth: truth };
    return { result: 'miss', wrong: wrongs[0], revealed: wasCovered, shook: autoShook };
  }
  /* literal keys only (the reachability gate reads them) */
  function hint(st) { if (!st.verdict) return null; return st.help ? 'hintSplit' : 'hintCount'; }
  /* miss 2: the baskets split — every tens part over the sieve, every ones part over the tray */
  function split(st) {
    var ns = st.tubs.map(function (t) { return t.n; });
    var T = ns.map(function (n) { return tens(n) * 10; }).filter(function (x) { return x > 0; }), O = ns.map(ones).filter(function (x) { return x > 0; });
    return { tens: T, tensSum: sum(T), ones: O, onesSum: sum(O) };
  }

  function shuffle(a, rnd) { a = a.slice(); for (var k = a.length - 1; k > 0; k--) { var j = Math.floor(rnd() * (k + 1)), x = a[k]; a[k] = a[j]; a[j] = x; } return a; }
  /* order-only reshuffle inside the bands, never the same order twice */
  function plan(face, rnd, prev) {
    rnd = rnd || Math.random;
    var R = rounds(faceOf(face)), bands = {};
    R.forEach(function (r) { (bands[r.band] = bands[r.band] || []).push(r.k); });
    var keys = Object.keys(bands).sort();
    for (var a = 0; a < 2000; a++) {
      var o = []; keys.forEach(function (b) { o = o.concat(shuffle(bands[b], rnd)); });
      if (!prev || prev.join() !== o.join()) return { order: o };
    }
    var f = []; keys.forEach(function (b) { f = f.concat(bands[b].slice().reverse()); }); return { order: f };
  }
  function band(W) { return { wide: W >= 560, cramp: W < 310 }; }

  var api = { TALLY: TALLY, FOUR: FOUR, FEW: FEW, SMALL: SMALL, WALL: WALL, SUPPORTS: SUPPORTS, GROOVE: GROOVE, GROOVES: GROOVES, faceOf: faceOf, rounds: rounds, bricksOf: bricksOf, tens: tens, ones: ones, shownWindows: shownWindows, neededWindows: neededWindows, newState: newState, target: target, allTipped: allTipped, tip: tip, pour: pour, shake: shake, grooves: grooves, fullGrooves: fullGrooves, grooveToCup: grooveToCup, setFocus: setFocus, type: type, check: check, hint: hint, split: split, plan: plan, band: band };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.AcornSieveCore = api;
})(typeof window !== 'undefined' ? window : this);
