/* =====================================================================
   minute-train-core.js — the model of ACTIVITY #161 of the one-by-one
   rebuild: "Sprocket's Clock — Read the Clock to Five Minutes" → THE
   MINUTE TRAIN (2.MD.C.7). Pure, no DOM.
   Design: docs/activities-rebuild/designs/161-clock-digital.md
   ---------------------------------------------------------------------
   A railway runs round the inside of the clock's rim. Every carriage is
   exactly five minutes long (one number-gap); carriages leave a tunnel at
   the 12 and couple behind each other until the train reaches the long
   hand, a level-crossing barrier — so the last roof says the minutes. The
   child writes the hour and the minutes on a digital card. During a round
   the hands never move; once it is solved the train PUSHES the clock (free
   play): every carriage moves it on five minutes, and the twelfth closes
   the ring and steps the short hand to the next number.
   ===================================================================== */
(function (root) {
  'use strict';
  var T = function (h, m) { return { h: h, m: m }; };
  var TABLE = {
    /* Level 1 — quarter hours (G2-250) */
    '1': [T(3, 15), T(9, 45), T(6, 30), T(12, 15), T(4, 45), T(8, 0), T(11, 30), T(2, 45), T(7, 15)],
    /* Level 2 — five minutes (G2-249; the old activity's nine) */
    '2': [T(3, 20), T(7, 5), T(10, 40), T(2, 25), T(5, 50), T(8, 10), T(12, 35), T(4, 55), T(9, 5)]
  };
  var LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
  var DOT = ['nl', 'sv', 'da', 'no', 'fi'];

  function levelOf(v) { return String(v) === '2' ? '2' : '1'; }
  function locOf(l) { l = String(l || 'en').slice(0, 2); return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  /* the card's time: "3:20" · "3.20" · fr « 3 h 20 » (no a.m./p.m. — a face cannot show it) */
  function fmt(loc, h, m) { var l = locOf(loc), mm = (m < 10 ? '0' : '') + m; if (l === 'fr') return h + ' h ' + mm; return h + (DOT.indexOf(l) >= 0 ? '.' : ':') + mm; }
  /* the hands: the hour hand turns 30° an hour and 0.5° a minute */
  function hourAngle(h, m) { return ((h % 12) * 30 + m / 2) % 360; }
  function minuteAngle(m) { return m * 6; }
  /* the number the long hand points at (12 at :00) */
  function longNumber(m) { return m / 5 || 12; }
  function maxCars(r) { return r.m / 5; }
  function rounds(level) { level = levelOf(level); return TABLE[level].map(function (x, i) { return { k: i, level: level, h: x.h, m: x.m }; }); }
  function newState(level, k) {
    var pool = rounds(level), r = pool[k] || pool[0];
    return { level: levelOf(level), k: r.k, round: r, cars: 0, h: '', m: '', focus: 'h', misses: 0, help: false, verdict: null, done: false, free: null };
  }
  function clear(st) { if (!st.done) st.verdict = null; }
  /* send a carriage out of the tunnel: it couples behind the last one — or, at the long hand, bumps the barrier and rolls back */
  function addCar(st) {
    if (st.done) return freeAdd(st);
    if (st.cars >= maxCars(st.round)) return 'bump';
    st.cars++; clear(st); return 'ok';
  }
  function removeCar(st) {
    if (st.done) return freeBack(st);
    if (st.cars <= 0) return false;
    st.cars--; clear(st); return true;
  }
  /* free play, only once the round is solved: the train pushes the clock on five minutes per carriage; the twelfth closes the ring and the short hand steps on */
  function freeAt(st) { return st.free === null ? st.round.h * 60 + st.round.m : st.free; }
  function freeAdd(st) { var t = freeAt(st) + 5; if (t >= 13 * 60) t -= 12 * 60; st.free = t; return t % 60 === 0 ? 'ring' : 'push'; }
  function freeBack(st) { var t = freeAt(st); if (t === st.round.h * 60 + st.round.m) return false; t -= 5; if (t < 60) t += 12 * 60; st.free = t; return true; }
  /* the free-play clock as (h, m) and its train (one carriage per five minutes past the hour) */
  function freeClock(st) { var t = freeAt(st); return { h: Math.floor(t / 60), m: t % 60, cars: (t % 60) / 5 }; }
  function focus(st, box) { if (st.done || (box !== 'h' && box !== 'm')) return false; st.focus = box; return true; }
  /* two digits per box; a third replaces; an hour that cannot grow (2–9, or two digits) moves on to the minutes */
  function typeDigit(st, d) {
    if (st.done || !/^[0-9]$/.test(String(d))) return false;
    var b = st.focus, v = st[b];
    st[b] = v.length >= 2 ? String(d) : v + d;
    if (b === 'h' && (st.h.length === 2 || +st.h > 1)) st.focus = 'm';
    clear(st); return true;
  }
  function back(st) {
    if (st.done) return false;
    if (!st[st.focus] && st.focus === 'm') st.focus = 'h';
    if (!st[st.focus]) return false;
    st[st.focus] = st[st.focus].slice(0, -1); clear(st); return true;
  }
  /* Check: the hour is the number the short hand has PASSED, the minutes how far the long hand has gone from the 12 */
  function check(st) {
    if (st.done) return { result: 'no' };
    if (st.h === '' || st.m === '') return { result: 'note', key: 'hintBlank' };
    /* Check again with nothing changed (every change clears the verdict): a reminder, never a second miss */
    if (st.verdict) return { result: 'note', key: 'hintChange' };
    var r = st.round, h = parseInt(st.h, 10), m = parseInt(st.m, 10);
    if (h === r.h && m === r.m) { st.done = true; st.verdict = null; st.cars = maxCars(r); return { result: 'ok' }; }
    var kind;
    if (h === longNumber(r.m) && h !== r.h && m === (r.h % 12) * 5) kind = 'swap';
    else if (m !== r.m) kind = 'minutes';
    /* the next hour is a lap-error only when the short hand has left its number (on the hour it sits ON it) */
    else if (h === r.h % 12 + 1 && r.m > 0) kind = 'nextHour';
    else kind = 'hour';
    st.misses++; st.help = st.misses >= 2;
    st.verdict = { kind: kind, h: h, m: m };
    return { result: 'miss', kind: kind };
  }
  /* literal keys only (the reachability gate reads them) */
  function hint(st) {
    var v = st.verdict; if (!v) return null;
    if (st.help) return 'hintHelp';
    if (v.kind === 'minutes') return 'hintMinutes';
    if (v.kind === 'nextHour') return 'hintNext';
    /* on the hour the short hand is ON its number, not past it */
    return st.round.m === 0 ? 'hintHourOn' : 'hintHour';
  }
  /* the train the child's minutes make: whole carriages and the part of one more (04 = four fifths of a carriage) */
  function childTrain(m) { return { whole: Math.floor(m / 5), part: (m % 5) / 5 }; }
  /* the success line: digits first, then the hands; the quarter idioms are the locale's own (L1) */
  function okKey(r) { if (r.level === '2') return 'okFive'; return r.m === 0 ? 'okOclock' : r.m === 15 ? 'okPast' : r.m === 30 ? 'okHalf' : 'okTo'; }
  function okArgs(r, loc) { var c = []; for (var x = 5; x <= r.m; x += 5) c.push(x); return { t: fmt(loc, r.h, r.m), h: r.h, h1: r.h % 12 + 1, n: longNumber(r.m), m: r.m, count: c.join(', ') }; }

  function passSize(level) { return TABLE[levelOf(level)].length; }
  function shuffle(a, rnd) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  /* an order-only reshuffle per pass, never the previous order */
  function plan(level, pass, rnd, prev) {
    var ks = TABLE[levelOf(level)].map(function (x, i) { return i; });
    for (var tries = 0; tries < 200; tries++) { var c = shuffle(ks.slice(), rnd); if (!prev || prev.join() !== c.join()) return c; }
    return ks.slice().reverse();
  }

  var api = { LOCALES: LOCALES, levelOf: levelOf, locOf: locOf, fmt: fmt, hourAngle: hourAngle, minuteAngle: minuteAngle, longNumber: longNumber, maxCars: maxCars,
    rounds: rounds, newState: newState, addCar: addCar, removeCar: removeCar, freeClock: freeClock, focus: focus, typeDigit: typeDigit, back: back,
    check: check, hint: hint, childTrain: childTrain, okKey: okKey, okArgs: okArgs, passSize: passSize, plan: plan };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.MinuteTrainCore = api;
})(typeof window !== 'undefined' ? window : this);
