/* =====================================================================
   ride-hands-core.js — the model of ACTIVITY #102 of the one-by-one
   rebuild: "Sprocket's Clock" (to the hour) → THE DIGITS THAT RIDE THE
   HANDS (1.MD.B.3). Pure, no DOM. Design: docs/activities-rebuild/designs/102-clock-digital.md
   ---------------------------------------------------------------------
   A digital time is the two hands written down. When the child checks a
   card, its HOUR rides out along the short hand to the number that hand
   has reached (at half past: out to the rim between two numbers, then
   back to the number it has PASSED), and its MINUTES ride the long hand
   to the minutes collar it points at (00 at the 12, 30 at the 6). Each
   part merges only if it equals the number its hand points to; so a
   12:00 card on a 3 o'clock clock sends a 12 to the 3, where it will not
   fit.
   ===================================================================== */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.RideHandsCore = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var LOCALES = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
  /* the rounds: [id, target 'h:mm', cards (right first)] */
  var HOUR = [
    ['H1', '3:00', ['3:00', '12:00', '4:00']], ['H2', '9:00', ['9:00', '12:00', '8:00']], ['H3', '6:00', ['6:00', '12:00', '7:00']],
    ['H4', '1:00', ['1:00', '7:00', '2:00']], ['H5', '11:00', ['11:00', '12:00', '10:00']], ['H6', '5:00', ['5:00', '11:00', '6:00']],
    ['H7', '8:00', ['8:00', '12:00', '9:00']], ['H8', '2:00', ['2:00', '8:00', '1:00']], ['H9', '7:00', ['7:00', '12:00', '6:00']],
    ['H10', '12:00', ['12:00', '6:00', '11:00']]
  ];
  var BOTH = [
    ['M1', '4:00', ['4:00', '4:30', '5:00']], ['M2', '10:30', ['10:30', '10:00', '11:30']], ['M3', '2:30', ['2:30', '2:00', '3:30']],
    ['M4', '7:00', ['7:00', '7:30', '6:00']], ['M5', '12:30', ['12:30', '12:00', '1:30']], ['M6', '9:00', ['9:00', '9:30', '12:00']],
    ['M7', '5:30', ['5:30', '5:00', '6:30']], ['M8', '1:00', ['1:00', '1:30', '12:00']], ['M9', '8:30', ['8:30', '8:00', '9:30']],
    ['M10', '3:00', ['3:00', '3:30', '2:00']]
  ];
  var DATA = { HOUR: HOUR, BOTH: BOTH };

  function locale(l) { l = String(l || 'en').toLowerCase().slice(0, 2); if (l === 'nb' || l === 'nn') l = 'no'; return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function timesOf(x) { return x === 'both' ? 'both' : 'hour'; }
  function coloursOf(x) { return x === 'off' ? 'off' : 'on'; }
  function parse(s) { var p = String(s).split(':'); return { h: +p[0], m: +p[1] }; }
  function fmt(t) { return t.h + ':' + (t.m < 10 ? '0' : '') + t.m; }
  function table(times) { return timesOf(times) === 'both' ? BOTH : HOUR; }
  function ids(times) { return table(times).map(function (r) { return r[0]; }); }
  function round(id) {
    var row = null; HOUR.concat(BOTH).forEach(function (r) { if (r[0] === id) row = r; });
    if (!row) row = HOUR[0];
    return { id: row[0], target: parse(row[1]), cards: row[2].map(parse) };
  }

  /* ---- the hands ---- */
  function handAngles(t) { return { short: (30 * (t.h % 12) + 0.5 * t.m) % 360, long: (6 * t.m) % 360 }; }
  /* the number the short hand has reached or passed (12 at the top) */
  function passed(angle) { var n = Math.floor(((angle % 360) + 360) % 360 / 30 + 1e-9); return n === 0 ? 12 : n; }
  /* the minutes collar the long hand points at: 00 at the 12, 30 at the 6 */
  function collar(angle) { var a = ((angle % 360) + 360) % 360; return a === 0 ? 0 : a === 180 ? 30 : null; }
  /* a card's ride: each part lands where ITS hand points, and merges only if it is that number */
  function ride(target, card) {
    var A = handAngles(target), hAt = passed(A.short), mAt = collar(A.long);
    return { hour: { at: hAt, between: target.m === 30, merges: card.h === hAt }, minutes: { at: mAt, merges: card.m === mAt } };
  }
  function errorKind(target, card) {
    var r = ride(target, card);
    return r.hour.merges && r.minutes.merges ? 'right' : !r.hour.merges && !r.minutes.merges ? 'both' : !r.hour.merges ? 'hour' : 'minutes';
  }

  /* ---- a showing: the right card's place drawn from a bag of the three places (a third each, never three running) ---- */
  function shuffle(a, rnd) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
  function cardOrder(rnd, prevPlaces) {
    rnd = rnd || Math.random; prevPlaces = prevPlaces || [];
    var used = prevPlaces.slice(prevPlaces.length - prevPlaces.length % 3), left = [0, 1, 2].filter(function (p) { return used.indexOf(p) < 0; });
    var at = left[Math.floor(rnd() * left.length)], wrong = shuffle([1, 2], rnd), o = [];
    for (var i = 0, w = 0; i < 3; i++) o.push(i === at ? 0 : wrong[w++]);
    return o;
  }
  function newState(r, order) { return { r: r, order: order || [0, 1, 2], chosen: null, misses: 0, show: 0, last: null, done: false, rode: null }; }
  function cardAt(st, i) { return st.r.cards[st.order[i]]; }
  function rightPlace(st) { return st.order.indexOf(0); }
  function choose(st, i) { if (st.done || !(i >= 0 && i < 3)) return 'no'; st.chosen = i; st.last = null; st.rode = null; return 'chosen'; }
  function check(st) {
    if (st.done) return { result: 'ok' };
    if (st.chosen == null) { st.last = { reason: 'none' }; return { result: 'none' }; }
    var card = cardAt(st, st.chosen), R = ride(st.r.target, card), kind = errorKind(st.r.target, card);
    st.rode = { card: card, ride: R, kind: kind };
    if (kind === 'right') { st.done = true; st.last = { reason: 'ok' }; return { result: 'ok', ride: R }; }
    st.misses++; st.show = Math.min(2, st.misses); st.last = { reason: 'miss', kind: kind };
    return { result: 'miss', kind: kind, ride: R };
  }
  /* hints point at the HANDS — never a number the child should answer */
  function hint(st, colours) {
    var L = st.last; if (!L) return null;
    if (L.reason === 'none') return { key: 'hintNone' };
    if (L.reason !== 'miss') return null;
    if (st.show >= 2) return { key: 'hintWatch' };
    var c = coloursOf(colours) === 'on' ? 'C' : '';
    /* at half past the short hand is BETWEEN two numbers: the hour hint says which one counts */
    return { key: (L.kind === 'minutes' ? 'hintMin' : st.r.target.m === 30 ? 'hintHourHalf' : 'hintHour') + c };
  }
  /* free play after success: an hour passes (the clock only — never the round's target) */
  function hourLater(t) { return { h: t.h % 12 + 1, m: t.m }; }

  function plan(times, rnd, prev) {
    rnd = rnd || Math.random;
    var base = ids(times), same = function (a, b) { return !!(a && b && a.join() === b.join()); };
    for (var k = 0; k < 400; k++) { var o = shuffle(base, rnd); if (!same(o, prev)) return { order: o }; }
    var f = base.slice(); if (same(f, prev)) f.reverse(); return { order: f };
  }
  function band(w) { return { wide: w >= 560, tiny: w < 300 }; }

  return {
    LOCALES: LOCALES, DATA: DATA,
    locale: locale, timesOf: timesOf, coloursOf: coloursOf, parse: parse, fmt: fmt, ids: ids, round: round,
    handAngles: handAngles, passed: passed, collar: collar, ride: ride, errorKind: errorKind,
    cardOrder: cardOrder, newState: newState, cardAt: cardAt, rightPlace: rightPlace, choose: choose, check: check, hint: hint,
    hourLater: hourLater, plan: plan, band: band
  };
});
