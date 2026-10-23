/* =====================================================================
   bond-basket-core.js — the model of ACTIVITY #81, THE COVERED BASKET
   ("Find the Total", 1.OA.A.1; bond faces K.OA.A.3–A.5). Pure, no DOM.
   Design sheet: docs/activities-rebuild/designs/081-numberbond.md
   ---------------------------------------------------------------------
   The first part is POURED into the basket and a cloth drops over it with
   the part's number pinned on top; the other part is POSTED in one at a
   time through a slot. The running count is never shown — the only way to
   the total is to count on from the number on the cloth.
   Faces: total (within 20) · bonds (to 10) · whole (the cloth already holds
   one part, the whole is on the rim; post until the basket is full, then
   say how many were posted) · to20 (parts 4–10).
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.BondBasketCore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  var LOCALES = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
  var FACES = ['total', 'bonds', 'whole', 'to20'];
  var COATS = ['pictures', 'dots', 'frames'];
  /* one kind of thing per round, identical instances (all opened on contact sheets) */
  var KINDS = ['toys/ball', 'fruits/strawberry', 'insects-and-bugs/ladybug', 'desserts-and-sweets/cookie', 'toys/car', 'vegetables/carrot', 'fruits/banana'];
  /* [left, right] — the bigger bowl alternates (total: L4 R5 E1); whole: [whole, given] */
  var ROUNDS = {
    total: [[3, 4], [6, 2], [5, 5], [4, 7], [8, 3], [2, 7], [7, 5], [5, 8], [9, 6], [8, 9]],
    bonds: [[3, 2], [4, 2], [3, 4], [5, 3], [3, 6], [6, 4], [1, 5], [2, 2], [3, 5]],
    whole: [[10, 7], [10, 4], [10, 9], [10, 2], [10, 6], [5, 2], [6, 4], [7, 3], [8, 3], [9, 2]],
    to20: [[4, 10], [9, 7], [8, 9], [6, 9], [10, 9], [7, 6], [9, 9], [5, 8]]
  };
  var TRAY_EXTRA = 2;   /* make the whole: the tray holds the answer + 2, so counting the tray is not the answer */

  function faceOf(f) { return FACES.indexOf(f) >= 0 ? f : 'total'; }
  function coatOf(c) { return COATS.indexOf(c) >= 0 ? c : 'pictures'; }
  function locale(l) { l = String(l || 'en').slice(0, 2).toLowerCase(); return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function ids(face) { var n = ROUNDS[faceOf(face)].length, out = []; for (var i = 0; i < n; i++) out.push(i); return out; }
  function shuffle(a, rnd) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  /* a round: two parts and their total (or the whole, the given part and the answer) */
  function round(face, idx) {
    face = faceOf(face); var x = ROUNDS[face][idx], kind = KINDS[(idx + FACES.indexOf(face) * 3) % KINDS.length];
    if (face === 'whole') return { face: face, idx: idx, kind: kind, whole: x[0], given: x[1], answer: x[0] - x[1], tray: Math.min(10, x[0] - x[1] + TRAY_EXTRA) };
    return { face: face, idx: idx, kind: kind, a: x[0], b: x[1], answer: x[0] + x[1] };
  }
  function bigger(r) { return r.face === 'whole' ? null : r.a > r.b ? 'L' : r.b > r.a ? 'R' : 'E'; }

  /* a pass: every round once, never the order just played */
  function plan(face, rnd, prev) {
    var all = ids(face), order;
    for (var t = 0; t < 2000; t++) { order = shuffle(all, rnd); if (!(prev && prev.length && prev.join() === order.join())) break; }
    return { order: order };
  }

  /* ---- state ---- */
  function newState(r) {
    var st = { r: r, poured: null, under: 0, posted: 0, left: 0, typed: '', misses: 0, show: 0, last: null, done: false, smallerFirst: false };
    if (r.face === 'whole') { st.poured = 'L'; st.under = r.given; st.left = r.tray; }
    return st;
  }
  function moved(st) { st.show = 0; st.last = null; }
  /* pour a bowl into the EMPTY basket; the other bowl becomes the posting bowl */
  function pour(st, side) {
    var r = st.r;
    if (st.done || r.face === 'whole' || st.poured || (side !== 'L' && side !== 'R')) return false;
    st.poured = side; st.under = side === 'L' ? r.a : r.b; st.left = side === 'L' ? r.b : r.a; st.posted = 0;
    st.smallerFirst = st.under < st.left;
    moved(st); return true;
  }
  /* post ONE thing through the slot; in make-the-whole a post past the whole rolls off ('full') */
  function post(st) {
    if (st.done || !st.poured || st.left <= 0) return false;
    if (st.r.face === 'whole' && st.under + st.posted >= st.r.whole) { moved(st); st.last = { reason: 'full' }; return 'full'; }
    st.posted++; st.left--; moved(st); return true;
  }
  function empty(st) {
    if (st.done) return false;
    var r = st.r;
    if (r.face === 'whole') { st.posted = 0; st.left = r.tray; }
    else { st.poured = null; st.under = 0; st.posted = 0; st.left = 0; st.smallerFirst = false; }
    moved(st); return true;
  }
  function runningCount(st) { return st.under + st.posted; }
  function type(st, d) {
    if (st.done) return false;
    if (d === 'del') { if (!st.typed) return false; st.typed = st.typed.slice(0, -1); moved(st); return true; }
    if (!/^[0-9]$/.test(String(d)) || st.typed.length >= 2) return false;
    st.typed = st.typed === '0' ? String(d) : st.typed + d; moved(st); return true;
  }
  /* Check: nothing poured / still waiting / nothing typed are hints (no miss); a wrong total is a miss */
  function check(st) {
    var r = st.r;
    if (st.done) return { ok: true };
    if (r.face !== 'whole') {
      if (!st.poured) return hintOnly(st, 'pour');
      if (st.left > 0) return hintOnly(st, 'waiting');
    }
    if (st.typed === '') return hintOnly(st, 'type');
    if (+st.typed === r.answer) { st.done = true; st.show = 0; st.last = { reason: 'ok' }; return { ok: true }; }
    st.misses++; st.show = Math.min(2, st.misses);
    st.last = { reason: r.face === 'whole' && st.show === 1 && runningCount(st) < r.whole ? 'notFull' : 'wrong' };
    return { ok: false, reason: st.last.reason, show: st.show };
  }
  function hintOnly(st, why) { st.last = { reason: why }; st.show = 0; return { ok: false, reason: why }; }
  /* the numbers the miss-1 arc writes over the posted things: one after the cloth's number, never the cloth's number again */
  function arc(st) { var out = []; for (var i = 1; i <= st.posted; i++) out.push(st.under + i); return out; }
  function hint(st) {
    if (st.done || !st.last) return null;
    var R = st.last.reason;
    if (R === 'pour') return 'hPour';
    if (R === 'waiting') return 'hWaiting';
    if (R === 'type') return st.r.face === 'whole' ? 'promptAdd' : 'promptWhole';
    if (R === 'full') return 'hFull';
    if (R === 'notFull') return 'hFull';
    if (st.show >= 2) return st.r.face === 'whole' ? 'hMiss2w' : 'hMiss2';
    return st.r.face === 'whole' ? 'hMiss1w' : 'hMiss1';   /* make-the-whole: the arc ENDS on the whole — ask how many numbers it counted, never "count on to 10" */
  }
  /* what a bowl shows: library pictures while they fit, else drawn counters (ten-frame or dice) */
  function coatFor(coat, n, cap) { coat = coatOf(coat); return coat === 'pictures' ? (n <= cap ? 'pictures' : 'frames') : coat; }
  /* dice patterns: 1–6 one die; 7–10 a five and the rest */
  function dice(n) { return n <= 6 ? [n] : [5, n - 5]; }
  function layout(W) {
    var wide = W >= 620, tiny = W < 300;
    return { mode: wide ? 'wide' : 'narrow', tiny: tiny, W: W, pic: wide ? 96 : 64, cap: wide ? 6 : 4 };
  }
  return {
    DATA: { KINDS: KINDS, ROUNDS: ROUNDS, TRAY_EXTRA: TRAY_EXTRA }, LOCALES: LOCALES, FACES: FACES, COATS: COATS,
    faceOf: faceOf, coatOf: coatOf, locale: locale, ids: ids, shuffle: shuffle, round: round, bigger: bigger, plan: plan,
    newState: newState, pour: pour, post: post, empty: empty, runningCount: runningCount, type: type, check: check,
    arc: arc, hint: hint, coatFor: coatFor, dice: dice, layout: layout
  };
});
