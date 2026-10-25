/* =====================================================================
   set-clock-core.js — the model for ACTIVITY #104 of the one-by-one
   rebuild: "Set the Clock" → THE ECHO SLICE (1.MD.B.3).
   Design: docs/activities-rebuild/designs/104-clock.md
   ---------------------------------------------------------------------
   The child places BOTH hands (they are not geared, as on the paper
   worksheet). On Check the long hand's swept slice of the face (12 → the
   long hand) is echoed, shrunk to one twelfth, inside the hour slice the
   short hand belongs to; the true short hand points at the echo's
   LEADING edge. The receipt prints what the hands really say.
   Units: the short hand s ∈ 0…143 in 2.5° steps (12 steps per hour, s = 0
   on the 12); the long hand in minutes 0…59 (settled to fives). Pure and
   DOM-free; UMD (window.SetClockCore / require()).
   ===================================================================== */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.SetClockCore = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var LOCALES = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
  /* one round list per level (design §6). No time repeats one of the sibling 2.MD.C.7 row's eight. */
  var LEVELS = {
    both: ['3:00', '7:30', '9:00', '6:30', '12:00', '4:30', '10:00', '1:30', '5:00', '11:30'],
    hour: ['3:00', '8:00', '12:00', '6:00', '10:00', '1:00', '5:00', '9:00'],
    half: ['7:30', '4:30', '11:30', '2:30', '9:30', '12:30', '6:30', '1:30'],
    quarter: ['4:15', '9:45', '10:15', '5:45', '12:15', '8:45', '1:15', '11:45', '2:30', '6:00'],
    five: ['2:10', '8:20', '5:40', '11:50', '4:05', '6:25', '9:35', '1:55'],
    mixed: ['4:00', '9:30', '2:15', '6:45', '11:10', '3:50', '12:30', '7:05', '8:25', '5:35']
  };
  var SIBLING = ['3:15', '7:45', '6:10', '9:20', '4:40', '1:50', '10:05', '12:25'];
  /* the accepted short-hand window, in hours after the target hour (design §6 table) */
  var WINDOWS = { 0: [-0.2, 0.2], 5: [-0.05, 0.45], 10: [-0.05, 0.45], 15: [0.10, 0.55], 20: [0.10, 0.55], 25: [0.10, 0.55], 30: [0.30, 0.70], 35: [0.45, 0.90], 40: [0.45, 0.90], 45: [0.45, 0.90], 50: [0.55, 1.05], 55: [0.55, 1.05] };

  function locale(l) { l = String(l || 'en').slice(0, 2).toLowerCase(); return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function levelOf(v) { return LEVELS[v] ? v : 'both'; }
  function echoOf(v) { return v === 'live' ? 'live' : 'after'; }
  function parse(s) { var p = String(s).split(':'); return { h: +p[0], m: +p[1] }; }
  function fmt(t) { return t.h + ':' + (t.m < 10 ? '0' : '') + t.m; }
  function ids(level) { return LEVELS[levelOf(level)].slice(); }
  function mod(a, n) { return ((a % n) + n) % n; }

  /* the hands' angles in degrees, clockwise from 12 */
  function shortDeg(s) { return mod(s, 144) * 2.5; }
  function longDeg(m) { return mod(m, 60) * 6; }
  /* a pointer angle → the hand's step (the short hand settles on 2.5° steps; the long hand drags by the minute, settles on fives) */
  function shortStep(deg) { return mod(Math.round(mod(deg, 360) / 2.5), 144); }
  function longMinute(deg) { return mod(Math.round(mod(deg, 360) / 6), 60); }
  function settleLong(m) { return mod(Math.round(m / 5) * 5, 60); }
  /* the TRUE short hand for a time: p = h + m/60 hours → steps */
  function trueStep(t) { return mod((t.h % 12) * 12 + t.m / 5, 144); }

  /* where the short hand belongs once the minutes are taken off: h′ = round(q − m/60) (half rounds up), 0 → 12 */
  function hourOf(s, m) { var x = mod(s, 144) - m / 5, h = mod(Math.floor((x + 6) / 12), 12); return h === 0 ? 12 : h; }
  /* is the short hand (steps) inside the accepted window for h:m? (circular) */
  function inWindow(s, h, m) {
    var w = WINDOWS[m]; if (!w) return false;
    var d = mod(mod(s, 144) / 12 - (h % 12), 12); if (d > 6) d -= 12;
    return d >= w[0] - 1e-9 && d <= w[1] + 1e-9;
  }
  /* the echo: the long hand's slice shrunk into hour slice h′ — start angle 30·h′, span 0.5·m° (its leading edge = the true short hand) */
  function echo(s, m) { var h = hourOf(s, m); return { h: h, start: 30 * (h % 12), span: 0.5 * m }; }
  /* the receipt: what the hands really say */
  function receipt(st) {
    if (st.short == null || st.long == null) return null;
    var m = settleLong(st.long), h = hourOf(st.short, m);
    return { h: h, m: m, unsure: !inWindow(st.short, h, m) };
  }

  function round(id) { return parse(id); }
  function newState(t) { return { t: t, short: null, long: null, sel: null, misses: 0, show: 0, last: null, done: false, touched: false }; }
  /* tray → the hub, pointing at the 12, selected */
  function place(st, hand) { if (st[hand] != null) { st.sel = hand; return 'selected'; } st[hand] = 0; st.sel = hand; return 'placed'; }
  function select(st, hand) { if (st[hand] == null) return 'no'; st.sel = hand; return 'selected'; }
  function swapSel(st) { if (st.short == null || st.long == null) return 'no'; st.sel = st.sel === 'short' ? 'long' : 'short'; return 'selected'; }
  /* point the selected hand at an angle (drag/tap); `final` settles the long hand on fives */
  function point(st, deg, final) {
    if (!st.sel || st[st.sel] == null) return 'no';
    if (st.sel === 'short') st.short = shortStep(deg); else st.long = final ? settleLong(longMinute(deg)) : longMinute(deg);
    st.touched = true; return 'moved';
  }
  /* the keyboard: one snap step (Shift = one numeral) */
  function nudge(st, hand, dir, big) {
    if (st[hand] == null) return 'no';
    if (hand === 'short') st.short = mod(st.short + dir * (big ? 12 : 1), 144);
    else st.long = mod(settleLong(st.long) + dir * (big ? 15 : 5), 60);
    st.sel = hand; st.touched = true; return 'moved';
  }
  function settle(st) { if (st.long != null) st.long = settleLong(st.long); }

  /* Check: tray (no miss) · ok · swapped · minutes · edge · hour */
  function kindOf(st) {
    var t = st.t;
    if (st.short == null || st.long == null) return 'tray';
    var m = settleLong(st.long);
    if (m === t.m && inWindow(st.short, t.h, t.m)) return 'ok';
    var hourPlace = (t.h % 12) * 5;
    if (hourPlace !== t.m && m === hourPlace) {
      var d = Math.abs(mod(mod(st.short, 144) / 12 - t.m / 5, 12)); if (d > 6) d = 12 - d;
      if (d <= 0.6) return 'swapped';
    }
    if (m !== t.m) return 'minutes';
    /* the minutes are right: the short hand is in the right hour's slice but not at the echo's end (edge), or in another hour's slice (hour) */
    return hourOf(st.short, m) === t.h ? 'edge' : 'hour';
  }
  function check(st) {
    if (st.done) return { result: 'done' };
    settle(st);
    var k = kindOf(st); st.last = k;
    if (k === 'tray') return { result: 'tray' };
    if (k === 'ok') { st.done = true; return { result: 'ok' }; }
    st.misses++; st.show = Math.min(2, st.misses);
    return { result: 'miss', kind: k };
  }
  var HINT = { swapped: 'hintSwap', minutes: 'hintMinutes', edge: 'hintEdge', hour: 'hintHour' };
  function hint(st) {
    if (st.last === 'tray') return { key: 'hintTray' };
    if (st.show >= 2) return { key: 'hintScale' };
    if (st.show === 1 && HINT[st.last]) return { key: HINT[st.last] };
    return null;
  }

  function shuffle(a, rnd) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
  function eq(a, b) { if (!a || !b || a.length !== b.length) return false; for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false; return true; }
  /* order-only reshuffle; never the previous pass's order */
  function plan(level, rnd, prev) { rnd = rnd || Math.random; var base = ids(level); for (var k = 0; k < 50; k++) { var o = shuffle(base, rnd); if (!eq(o, prev)) return { order: o }; } return { order: base.slice(1).concat(base[0]) }; }
  /* the width band: a side tray and a time card from 560 px; tiny under 300 */
  function band(w) { return { wide: w >= 560, tiny: w < 300 }; }

  return {
    locale: locale, levelOf: levelOf, echoOf: echoOf, parse: parse, fmt: fmt, ids: ids, round: round,
    shortDeg: shortDeg, longDeg: longDeg, shortStep: shortStep, longMinute: longMinute, settleLong: settleLong, trueStep: trueStep,
    hourOf: hourOf, inWindow: inWindow, echo: echo, receipt: receipt,
    newState: newState, place: place, select: select, swapSel: swapSel, point: point, nudge: nudge, settle: settle, kindOf: kindOf, check: check, hint: hint,
    plan: plan, band: band,
    DATA: { LOCALES: LOCALES, LEVELS: LEVELS, SIBLING: SIBLING, WINDOWS: WINDOWS }
  };
});
