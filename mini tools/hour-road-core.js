/* =====================================================================
   hour-road-core.js — the model of ACTIVITY #101 of the one-by-one
   rebuild: "Sprocket's Clock" (to the half-hour) → THE HOUR ROAD
   (1.MD.B.3). Pure, no DOM. Design: docs/activities-rebuild/designs/101-clock-digital.md
   ---------------------------------------------------------------------
   The clock's rim, unrolled into a straight road: thirteen posts (12, 1,
   … 11, 12) with a half stone between every two. A time is a PLACE on the
   road, t half-segments from the first 12 post: t = 2·(h mod 12) + m/30.
   The short hand points at 15·t degrees and the long hand at 180·(t mod 2)
   degrees, so rolling the road back round the clock (post k on numeral k's
   ray) puts the tapped card's spot on the short hand's tip exactly when
   the card is right. Every wrong card lands a measured distance away:
   half a segment (the long-hand error, or half past the hour before) or a
   whole segment (the next-number error).
   ===================================================================== */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.HourRoadCore = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var LOCALES = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
  var T_FULL = 24;      /* half-segments round the road */
  /* the rounds: [id, target 'h:mm', cards (right first)] */
  var BOTH = [
    ['R1', '3:30', ['3:30', '3:00', '4:30']], ['R2', '6:00', ['6:00', '6:30', '5:30']], ['R3', '9:30', ['9:30', '9:00', '10:30']],
    ['R4', '1:00', ['1:00', '1:30', '12:30']], ['R5', '11:30', ['11:30', '11:00', '12:30']], ['R6', '5:00', ['5:00', '5:30', '4:30']],
    ['R7', '8:30', ['8:30', '8:00', '9:30']], ['R8', '2:00', ['2:00', '2:30', '1:30']], ['R9', '7:30', ['7:30', '7:00', '8:30']],
    ['R10', '12:30', ['12:30', '12:00', '1:30']]
  ];
  var HALF = [
    ['H1', '4:30', ['4:30', '4:00', '5:30']], ['H2', '10:30', ['10:30', '10:00', '11:30']], ['H3', '2:30', ['2:30', '2:00', '3:30']],
    ['H4', '6:30', ['6:30', '6:00', '7:30']], ['H5', '12:30', ['12:30', '12:00', '1:30']], ['H6', '1:30', ['1:30', '1:00', '2:30']],
    ['H7', '9:30', ['9:30', '9:00', '10:30']], ['H8', '5:30', ['5:30', '5:00', '6:30']], ['H9', '11:30', ['11:30', '11:00', '12:30']]
  ];
  var DATA = { T_FULL: T_FULL, BOTH: BOTH, HALF: HALF };

  function locale(l) { l = String(l || 'en').toLowerCase().slice(0, 2); if (l === 'nb' || l === 'nn') l = 'no'; return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function timesOf(x) { return x === 'half' ? 'half' : 'both'; }
  function roadOf(x) { return x === 'check' ? 'check' : 'shown'; }
  function parse(s) { var p = String(s).split(':'); return { h: +p[0], m: +p[1] }; }
  function fmt(t) { return t.h + ':' + (t.m < 10 ? '0' : '') + t.m; }
  function table(times) { return timesOf(times) === 'half' ? HALF : BOTH; }
  function ids(times) { return table(times).map(function (r) { return r[0]; }); }
  function round(id) {
    var row = null; BOTH.concat(HALF).forEach(function (r) { if (r[0] === id) row = r; });
    if (!row) row = BOTH[0];
    return { id: row[0], target: parse(row[1]), cards: row[2].map(parse) };
  }

  /* ---- the road ---- */
  function roadPos(t) { return 2 * (t.h % 12) + t.m / 30; }
  function shortAngle(p) { return 15 * p; }                 /* degrees clockwise from 12 */
  function longAngle(p) { return 180 * (((p % 2) + 2) % 2); }
  /* a card's landing against the target: diff in half-segments, wrap-aware (−11 … 12) */
  function wrap(d) { d = ((d % T_FULL) + T_FULL) % T_FULL; return d > T_FULL / 2 ? d - T_FULL : d; }
  function landing(target, card) { return { t: roadPos(card), diff: wrap(roadPos(card) - roadPos(target)) }; }
  function errorKind(target, card) {
    var d = landing(target, card).diff;
    if (d === 0) return 'right';
    if (card.h === target.h) return 'minutes';
    if (d === 2) return 'nextHour';
    if (d === -1) return 'halfShort';
    return 'other';
  }

  /* ---- a showing: the cards in an order. The right card's place is drawn from a BAG of the three places, refilled
     every three showings (the history's last length mod 3 entries are the current bag), so each place gets a third of
     the showings by construction and no place can come up three times running; the wrong cards fill the rest at random ---- */
  function shuffle(a, rnd) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
  function cardOrder(rnd, prevPlaces) {
    rnd = rnd || Math.random; prevPlaces = prevPlaces || [];
    var used = prevPlaces.slice(prevPlaces.length - prevPlaces.length % 3), left = [0, 1, 2].filter(function (p) { return used.indexOf(p) < 0; });
    var at = left[Math.floor(rnd() * left.length)], wrong = shuffle([1, 2], rnd), o = [];
    for (var i = 0, w = 0; i < 3; i++) o.push(i === at ? 0 : wrong[w++]);
    return o;
  }
  function newState(r, order) {
    return { r: r, order: order || [0, 1, 2], chosen: null, misses: 0, show: 0, last: null, done: false, landed: null };
  }
  function cardAt(st, i) { return st.r.cards[st.order[i]]; }
  function rightPlace(st) { return st.order.indexOf(0); }
  function choose(st, i) { if (st.done || !(i >= 0 && i < 3)) return 'no'; st.chosen = i; st.last = null; st.landed = null; return 'chosen'; }

  function check(st) {
    if (st.done) return { result: 'ok' };
    if (st.chosen == null) { st.last = { reason: 'none' }; return { result: 'none' }; }
    var card = cardAt(st, st.chosen), L = landing(st.r.target, card), kind = errorKind(st.r.target, card);
    st.landed = { t: L.t, diff: L.diff, kind: kind };
    if (kind === 'right') { st.done = true; st.last = { reason: 'ok' }; return { result: 'ok', landing: L }; }
    st.misses++; st.show = Math.min(2, st.misses); st.last = { reason: 'miss', kind: kind };
    return { result: 'miss', kind: kind, landing: L };
  }
  /* hints talk about the HANDS only — never a number, never the half-past idiom (it names the next hour in six locales) */
  function hint(st) {
    var L = st.last; if (!L) return null;
    if (L.reason === 'none') return { key: 'hintNone' };
    if (L.reason !== 'miss') return null;
    if (st.show >= 2) return { key: 'hintWatch' };
    return { key: { minutes: 'hintLong', nextHour: 'hintNext', halfShort: 'hintShort' }[L.kind] || 'hintLong' };
  }
  /* free play after success: a road position snapped to the nearest half stone or post */
  function snap(p) { return Math.max(0, Math.min(T_FULL, Math.round(p))); }
  function timeAt(p) { p = snap(p); var h = Math.floor(p / 2) % 12; return { h: h === 0 ? 12 : h, m: p % 2 ? 30 : 0 }; }

  /* ---- order: never the previous pass; in the mixed level never three o'clocks or three half-pasts running ---- */
  function kindOf(id) { return round(id).target.m === 30 ? 'h' : 'o'; }
  function plan(times, rnd, prev) {
    rnd = rnd || Math.random;
    var base = ids(times), same = function (a, b) { return !!(a && b && a.join() === b.join()); };
    var ok = function (o) { if (timesOf(times) === 'half') return true; for (var i = 2; i < o.length; i++) if (kindOf(o[i]) === kindOf(o[i - 1]) && kindOf(o[i]) === kindOf(o[i - 2])) return false; return true; };
    for (var k = 0; k < 2000; k++) { var o = shuffle(base, rnd); if (ok(o) && !same(o, prev)) return { order: o }; }
    var f = timesOf(times) === 'half' ? base.slice() : ['R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8', 'R9', 'R10'];
    if (same(f, prev)) f.reverse(); return { order: f };
  }
  function band(w) { return { wide: w >= 560, tiny: w < 300 }; }

  return {
    LOCALES: LOCALES, DATA: DATA, T_FULL: T_FULL,
    locale: locale, timesOf: timesOf, roadOf: roadOf, parse: parse, fmt: fmt, ids: ids, round: round,
    roadPos: roadPos, shortAngle: shortAngle, longAngle: longAngle, wrap: wrap, landing: landing, errorKind: errorKind,
    cardOrder: cardOrder, newState: newState, cardAt: cardAt, rightPlace: rightPlace, choose: choose, check: check, hint: hint,
    snap: snap, timeAt: timeAt, plan: plan, band: band
  };
});
