/* =====================================================================
   pull-key-core.js — the model of ACTIVITY #103 of the one-by-one
   rebuild: "Owl's Cuckoo Cottage" → THE PULL-BACK KEY (1.MD.B.3).
   Pure, no DOM. Design: docs/activities-rebuild/designs/103-clock-read.md
   ---------------------------------------------------------------------
   Owl's clock is geared like a real one: the hour hand stands at exactly
   30·h + m/2 degrees. Its brass key is a spring: wound back, both hands
   run backwards together, five minutes a click, and the key STOPS itself
   when the long hand reaches the 12 — so the short hand lands on the hour
   the clock is IN (half past seven winds back to 7, never 8). Let go and
   it whirrs back to now. In set rounds the key is pulled out and winds
   the clock on (or back) from Owl's last activity to her next.
   Four kinds of round: the day board (which event is it?), write (turn
   two wheels), partners (which of three clocks says this digital time?)
   and set (wind the clock to a time).
   ===================================================================== */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PullKeyCore = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var LOCALES = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
  /* Owl's day: event → library picture */
  var EVENTS = {
    breakfast: ['breakfast', 'pancake'], reading: ['activities', 'reading'], puzzle: ['activities', 'puzzle'], lunch: ['classroom', 'lunchbox'],
    playground: ['activities', 'playground'], snack: ['breakfast', 'muffin'], music: ['activities', 'piano'], supper: ['around the house', 'pot'],
    bath: ['around the house', 'bathtub'], bed: ['around the house', 'bed']
  };
  var OWL = ['forest creatures', 'owl'];
  /* the rounds: [id, type, time, extra] — board: cards [event, time] (the right one placed by the table); partners: clocks; write: the wheels'
     start; set: [start event, start time, target event] plus the read-only replacement [time, wheel start] */
  var ROUNDS = {
    R1: ['board', '7:00', [['breakfast', '7:00'], ['supper', '6:00'], ['lunch', '12:00']]],
    R2: ['write', '3:00', '12:30'],
    R3: ['board', '8:30', [['reading', '9:00'], ['bath', '7:30'], ['bed', '8:30']]],
    R4: ['partners', '6:30', ['6:00', '7:30', '6:30']],
    R5: ['set', '9:00', ['breakfast', '7:00', 'reading'], ['9:00', '10:30']],
    R6: ['write', '1:30', '2:00'],
    R7: ['board', '12:00', [['playground', '1:30'], ['lunch', '12:00'], ['supper', '6:00']]],
    R8: ['set', '4:30', ['snack', '3:00', 'music'], ['4:30', '5:00']],
    R9: ['partners', '10:30', ['10:30', '11:30', '10:00']],
    R10: ['write', '6:30', '7:00'],
    R11: ['partners', '4:00', ['5:00', '4:00', '4:30']],
    Q1: ['board', '3:15', [['snack', '3:15'], ['playground', '3:45'], ['music', '4:15']]],
    Q2: ['write', '7:45', '8:15'],
    Q3: ['partners', '9:15', ['9:45', '9:15', '3:45']],
    Q4: ['set', '7:45', ['supper', '6:30', 'bath'], ['4:45', '5:15']],
    Q5: ['board', '11:45', [['lunch', '12:15'], ['puzzle', '11:45'], ['reading', '11:15']]],
    Q6: ['write', '2:15', '3:45'],
    Q7: ['partners', '5:45', ['6:45', '5:15', '5:45']],
    Q8: ['set', '1:15', ['lunch', '12:00', 'playground'], ['1:15', '2:45']]
  };
  var HALF = ['R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8', 'R9', 'R10', 'R11'];
  var QUARTER = ['R1', 'R3', 'R4', 'R6', 'Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'];
  var DATA = { EVENTS: EVENTS, OWL: OWL, ROUNDS: ROUNDS, HALF: HALF, QUARTER: QUARTER };

  function locale(l) { l = String(l || 'en').toLowerCase().slice(0, 2); if (l === 'nb' || l === 'nn') l = 'no'; return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function timesOf(x) { return x === 'quarter' ? 'quarter' : 'half'; }
  function roundsOf(x) { return x === 'read' ? 'read' : 'readset'; }
  function parse(s) { var p = String(s).split(':'); return { h: +p[0], m: +p[1] }; }
  function fmt(t) { return t.h + ':' + (t.m < 10 ? '0' : '') + t.m; }
  function same(a, b) { return !!(a && b && a.h === b.h && a.m === b.m); }
  function ids(times) { return (timesOf(times) === 'quarter' ? QUARTER : HALF).slice(); }
  function stepOf(times) { return timesOf(times) === 'quarter' ? 15 : 30; }
  function minutesOf(times) { return timesOf(times) === 'quarter' ? [0, 15, 30, 45] : [0, 30]; }
  /* a round, as the child meets it: in "read only" a set round becomes a write round */
  function round(id, rounds) {
    var row = ROUNDS[id] || ROUNDS.R1, r = { id: id in ROUNDS ? id : 'R1', type: row[0], time: parse(row[1]) };
    if (r.type === 'board') r.cards = row[2].map(function (c) { return { event: c[0], t: parse(c[1]) }; });
    if (r.type === 'partners') r.clocks = row[2].map(parse);
    if (r.type === 'write') r.start = parse(row[2]);
    if (r.type === 'set') {
      if (roundsOf(rounds) === 'read') { r.type = 'write'; r.time = parse(row[3][0]); r.start = parse(row[3][1]); }
      else { r.from = row[2][0]; r.start = parse(row[2][1]); r.event = row[2][2]; }
    }
    if (r.type === 'board') r.event = r.cards.filter(function (c) { return same(c.t, r.time); })[0].event;
    return r;
  }

  /* ---- the geared clock ---- */
  function angles(t) { return { hour: (30 * (t.h % 12) + 0.5 * t.m) % 360, minute: (6 * t.m) % 360 }; }
  function toMin(t) { return (t.h % 12) * 60 + t.m; }
  function fromMin(x) { x = ((x % 720) + 720) % 720; var h = Math.floor(x / 60); return { h: h === 0 ? 12 : h, m: x % 60 }; }
  function add(t, d) { return fromMin(toMin(t) + d); }
  /* how many five-minute clicks the spring winds back before the long hand reaches the 12 */
  function backToHour(t) { return t.m / 5; }
  function nextHour(t) { return { h: t.h % 12 + 1, m: t.m }; }
  function longHandNumber(t) { var n = t.m / 5; return n === 0 ? 12 : n; }

  /* ---- a state ---- */
  function newState(r) {
    var st = { r: r, back: 0, pick: null, sel: null, misses: 0, show: 0, last: null, done: false, touched: false };
    st.shown = r.type === 'set' ? { h: r.start.h, m: r.start.m } : { h: r.time.h, m: r.time.m };
    if (r.type === 'write') st.wheels = { h: r.start.h, m: r.start.m };
    return st;
  }
  /* the clock the key turns: the selected partner, or the one cottage clock */
  function clockOf(st) { var r = st.r; return r.type === 'partners' ? (st.sel == null ? null : r.clocks[st.sel]) : st.shown; }
  /* what the face shows now: the clock wound back by `back` clicks */
  function face(st, t) { t = t || clockOf(st); return t ? add(t, -5 * st.back) : null; }
  function fixed(st) { return st.done; }
  /* the spring: one click back — refused at the o'clock (it cannot wind past the last o'clock) */
  function windBack(st) {
    if (st.r.type === 'set' && !st.done) return 'no';
    var t = clockOf(st); if (!t) return 'no';
    if (st.back >= backToHour(t)) return 'stop';
    st.back++; return 'click';
  }
  function release(st) { var b = st.back; st.back = 0; return b; }
  /* set rounds: the key pulled out — one detent on or back (the level's step) */
  function windOn(st, dir, times) {
    if (st.done || st.r.type !== 'set') return 'no';
    var step = stepOf(times), x = toMin(st.shown) + dir * step;
    x = Math.round(x / step) * step;
    st.shown = fromMin(x); st.touched = true; st.last = null; st.show = 0; return 'wound';
  }
  /* set rounds by DRAG: one click (five minutes) at a time; on release the hands settle on the nearest detent */
  function windFive(st, dir) { if (st.done || st.r.type !== 'set') return 'no'; st.shown = add(st.shown, 5 * dir); st.touched = true; st.last = null; st.show = 0; return 'wound'; }
  function settle(st, times) { if (st.r.type !== 'set') return null; var step = stepOf(times); st.shown = fromMin(Math.round(toMin(st.shown) / step) * step); return st.shown; }
  /* free play after success: any click on or back, five minutes at a time */
  function freeWind(st, dir) { if (!st.done) return 'no'; var t = clockOf(st) || st.r.time; st.free = add(st.free || t, 5 * dir); return st.free; }
  function pick(st, i) { if (st.done || st.r.type !== 'board' || !(i >= 0 && i < 3)) return 'no'; st.pick = st.pick === i ? null : i; st.back = 0; st.last = null; return 'picked'; }
  function select(st, i) { if (st.done || st.r.type !== 'partners' || !(i >= 0 && i < 3)) return 'no'; st.sel = st.sel === i ? null : i; st.back = 0; st.last = null; return 'selected'; }
  function wheel(st, part, dir, times) {
    if (st.done || st.r.type !== 'write') return 'no';
    if (part === 'h') st.wheels.h = ((st.wheels.h - 1 + dir + 12) % 12) + 1;
    else { var L = minutesOf(times), i = L.indexOf(st.wheels.m); st.wheels.m = L[((i < 0 ? 0 : i) + dir + L.length) % L.length]; }
    st.touched = true; st.last = null; st.show = 0; return 'turned';
  }
  /* what the child answered */
  function answer(st) {
    var r = st.r;
    if (r.type === 'board') return st.pick == null ? null : r.cards[st.pick].t;
    if (r.type === 'partners') return st.sel == null ? null : r.clocks[st.sel];
    if (r.type === 'write') return st.touched ? st.wheels : null;
    return st.touched && !same(st.shown, r.start) ? st.shown : null;
  }
  /* the kind of a wrong answer, for the gate and the hints */
  function errorKind(target, a) {
    if (same(a, target)) return 'right';
    if (same(a, nextHour(target))) return 'nextHour';
    if (a.h === longHandNumber(target)) return 'longHand';
    if (a.h === target.h) return 'minute';
    if (Math.abs(a.h % 12 - target.h % 12) === 1 || Math.abs(a.h % 12 - target.h % 12) === 11) return 'neighbour';
    return 'other';
  }
  function check(st) {
    var r = st.r;
    if (st.done) return { result: 'ok' };
    var a = answer(st);
    if (!a) { var k = { board: 'hintChoose', partners: 'hintChooseClock', write: 'hintWheels', set: 'hintWind' }[r.type]; st.last = { reason: 'none', hint: k }; return { result: 'none', hint: k }; }
    /* partners: the SIGN is the target; every other type: the clock's own time */
    var kind = errorKind(r.time, a);
    st.back = 0;
    if (kind === 'right') { st.done = true; st.last = { reason: 'ok' }; return { result: 'ok' }; }
    st.misses++; st.show = Math.min(2, st.misses); st.last = { reason: 'miss', kind: kind };
    return { result: 'miss', kind: kind };
  }
  /* hints point at the apparatus — never the answer's number */
  function hint(st) {
    var L = st.last; if (!L) return null;
    if (L.reason === 'none') return { key: L.hint };
    if (L.reason !== 'miss') return null;
    if (st.show >= 2) return { key: 'hintCount' };
    return { key: st.r.type === 'set' ? 'hintShortFirst' : 'hintBack' };
  }
  /* Owl's calls on success: the hour on the hour, once otherwise */
  function bobs(t) { return t.m === 0 ? t.h : 1; }
  /* the window after success (Owl's day runs 7 o'clock to 8.30): morning 7–11, afternoon 12–5, evening 6 on */
  /* the window after success: an event that belongs to one part of the day sets it (bed at 8:30 is evening, never morning); otherwise the hour */
  var EVENT_PART = { breakfast: 'morning', supper: 'evening', bath: 'evening', bed: 'evening' };
  function dayPart(t, event) { if (event && EVENT_PART[event]) return EVENT_PART[event]; return t.h >= 7 && t.h <= 11 ? 'morning' : (t.h === 12 || t.h <= 5) ? 'afternoon' : 'evening'; }

  function shuffle(a, rnd) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
  function plan(times, rnd, prev) {
    rnd = rnd || Math.random;
    var base = ids(times), eq = function (a, b) { return !!(a && b && a.join() === b.join()); };
    for (var k = 0; k < 400; k++) { var o = shuffle(base, rnd); if (!eq(o, prev)) return { order: o }; }
    var f = base.slice(); if (eq(f, prev)) f.reverse(); return { order: f };
  }
  function band(w) { return { wide: w >= 560, tiny: w < 300 }; }

  return {
    LOCALES: LOCALES, DATA: DATA,
    locale: locale, timesOf: timesOf, roundsOf: roundsOf, parse: parse, fmt: fmt, same: same, ids: ids, stepOf: stepOf, minutesOf: minutesOf, round: round,
    angles: angles, toMin: toMin, fromMin: fromMin, add: add, backToHour: backToHour, nextHour: nextHour, longHandNumber: longHandNumber,
    newState: newState, clockOf: clockOf, face: face, fixed: fixed, windBack: windBack, release: release, windOn: windOn, windFive: windFive, settle: settle, freeWind: freeWind,
    pick: pick, select: select, wheel: wheel, answer: answer, errorKind: errorKind, check: check, hint: hint, bobs: bobs, dayPart: dayPart, plan: plan, band: band
  };
});
