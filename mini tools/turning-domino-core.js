/* =====================================================================
   turning-domino-core.js — the model of ACTIVITY #84, THE TURNING DOMINO
   ("Find the Missing Part", 1.OA.B.4). Pure, no DOM.
   Design sheet: docs/activities-rebuild/designs/084-numberbond.md
   ---------------------------------------------------------------------
   One domino is a whole fact family. Its brass plate is the whole, its two
   halves are the parts. A round opens the domino in the stance of ONE
   equation form — the unknown is a face-down half (or, for "? − a = b",
   the plate under a felt lid). The child dials the unknown; Check marches
   every pip into the plate's sockets: too few → empty sockets, too many →
   pips hang off the end. Then (fact house on) the child turns the domino
   (the addition swaps) and breaks a half off (the subtraction) until the
   four facts of the family are written.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.TurningDominoCore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  var LOCALES = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
  var LEVELS = ['w20', 'w10'];
  var FORMS = ['a+?', '?+a', 'w-a', 'w-?', '?-a'];
  /* [whole, form, the number the strip shows beside the whole (a, or b for "w − ? = b"), lid stance: the half on the holder] */
  var ROUNDS = {
    w20: [[8, 'a+?', 3], [9, '?+a', 5], [11, 'w-a', 4], [12, 'w-?', 7], [13, '?-a', 5, 8], [14, '?+a', 8], [15, 'a+?', 6], [16, 'w-a', 9], [17, 'w-?', 8], [19, '?-a', 10, 9]],
    w10: [[6, 'a+?', 2], [7, '?+a', 4], [8, 'w-a', 2], [9, 'w-?', 7], [10, '?-a', 4, 6], [5, 'a+?', 4], [10, '?+a', 3], [9, '?-a', 5, 4]]
  };
  function levelOf(l) { return LEVELS.indexOf(l) >= 0 ? l : 'w20'; }
  function locale(l) { l = String(l || 'en').slice(0, 2).toLowerCase(); return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function ids(level) { var n = ROUNDS[levelOf(level)].length, out = []; for (var i = 0; i < n; i++) out.push(i); return out; }
  function shuffle(a, rnd) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  /* a round: the two halves as the domino lies at the start (L left, R right), where they lie and what is hidden */
  function round(level, idx) {
    level = levelOf(level); var d = ROUNDS[level][idx], w = d[0], f = d[1], x = d[2], r = { level: level, idx: idx, w: w, form: f };
    if (f === 'a+?') { r.L = x; r.R = w - x; r.hidden = 'right'; r.removed = null; r.answer = w - x; }
    else if (f === '?+a') { r.L = w - x; r.R = x; r.hidden = 'left'; r.removed = null; r.answer = w - x; }
    else if (f === 'w-a') { r.L = w - x; r.R = x; r.hidden = 'left'; r.removed = 'right'; r.answer = w - x; }   /* a in the tray face up, the holder half face down */
    else if (f === 'w-?') { r.L = x; r.R = w - x; r.hidden = 'right'; r.removed = 'right'; r.answer = w - x; }   /* the tray half face down, b on the holder */
    else { r.L = d[3]; r.R = x; r.hidden = 'lid'; r.removed = 'right'; r.answer = w; }   /* "? − a = b": both halves face up, the whole is under the lid */
    r.lid = r.hidden === 'lid';
    r.dialMin = r.lid ? 2 : 1; r.dialMax = r.lid ? (level === 'w10' ? 10 : 20) : 10;
    return r;
  }
  function plan(level, rnd, prev) {
    var all = ids(level), order;
    for (var k = 0; k < 4000; k++) {
      order = shuffle(all, rnd);
      if (prev && prev.length && prev.join() === order.join()) continue;
      var bad = false; for (var p = 1; p < order.length && !bad; p++) if (round(level, order[p]).answer === round(level, order[p - 1]).answer) bad = true;
      if (!bad) break;
    }
    return { order: order };
  }

  /* ---- state ---- */
  function newState(r, house) {
    return { r: r, house: house !== false, left: r.L, right: r.R, removed: r.removed, hidden: r.hidden, turned: false,
      dial: null, misses: 0, show: 0, last: null, stage: 1, facts: [], done: false };
  }
  function moved(st) { st.show = 0; st.last = null; }
  function setDial(st, n) {
    if (st.stage !== 1 || st.done) return false;
    var r = st.r; n = Math.max(r.dialMin, Math.min(r.dialMax, n | 0));
    if (n === st.dial) return false;
    st.dial = n; moved(st); return true;
  }
  function step(st, k) { return setDial(st, st.dial == null ? (k > 0 ? st.r.dialMin : st.r.dialMax) : st.dial + k); }
  /* the march test: every pip goes into the plate's sockets */
  function march(r, d) {
    if (r.lid) return { sockets: d, pips: r.w, empty: Math.max(0, d - r.w), overflow: Math.max(0, r.w - d) };
    var visible = r.w - r.answer;
    return { sockets: r.w, pips: visible + d, visible: visible, ghosts: d, empty: Math.max(0, r.w - visible - d), overflow: Math.max(0, visible + d - r.w) };
  }
  /* the equation the domino shows as it lies now; null values for what is hidden */
  function equation(st) {
    var r = st.r, w = st.hidden === 'lid' ? null : r.w;
    var lv = st.hidden === 'left' ? null : st.left, rv = st.hidden === 'right' ? null : st.right;
    if (st.removed) { var off = st.removed === 'left' ? lv : rv, on = st.removed === 'left' ? rv : lv; return { op: '-', x: w, y: off, z: on }; }
    return { op: '+', x: lv, y: rv, z: w };
  }
  /* the four facts of the family as windows: 0 the domino as it lay, 1 turned, 2 the left half off, 3 the right half off (all from the start orientation) */
  function factKey(e) { return e.op + ':' + e.x + ',' + e.y + ',' + e.z; }
  function windows(r) {
    var w = r.w, L = r.L, R = r.R;
    return [{ op: '+', x: L, y: R, z: w }, { op: '+', x: R, y: L, z: w }, { op: '-', x: w, y: L, z: R }, { op: '-', x: w, y: R, z: L }];
  }
  function windowOf(r, e) { var ws = windows(r), k = factKey(e); for (var i = 0; i < 4; i++) if (factKey(ws[i]) === k) return i; return -1; }
  function stamp(st) {
    var e = equation(st), i = windowOf(st.r, e);
    if (i < 0) return { win: -1, isNew: false };
    if (st.facts.indexOf(i) >= 0) return { win: i, isNew: false };
    st.facts.push(i);
    if (st.facts.length === 4) st.done = true;
    return { win: i, isNew: true };
  }
  function check(st) {
    var r = st.r;
    if (st.done || st.stage !== 1) return { ok: st.stage !== 1 };
    if (st.dial == null) { st.last = { reason: 'empty' }; st.show = 0; return { ok: false, reason: 'empty' }; }
    if (st.dial === r.answer) {
      st.hidden = null; st.show = 0; st.last = { reason: 'ok', m: march(r, st.dial) };
      var s = stamp(st);            /* the solved equation is one of the four facts */
      st.removed = null;            /* any tray half snaps back on: stage 2 starts with the whole domino */
      st.stage = 2;
      if (!st.house) st.done = true;
      return { ok: true, win: s.win };
    }
    st.misses++; var m = march(r, st.dial);
    st.show = Math.min(2, st.misses);
    st.last = { reason: r.lid ? 'lid' : (m.overflow > 0 ? 'many' : 'few'), m: m, d: st.dial };
    return { ok: false, reason: st.last.reason, show: st.show };
  }
  function hint(st) {
    if (!st.last || st.stage !== 1) return null;
    var R = st.last.reason, lid = st.r.lid;
    if (R === 'empty') return lid ? 'hDialLid' : 'hDial';
    if (R === 'ok') return null;
    if (st.show >= 2) return lid ? 'hCountLid' : 'hCount';
    if (R === 'lid') return 'hLid';
    return R === 'many' ? 'hOver' : 'hGap';
  }
  /* ---- stage 2: handling the whole domino ---- */
  function turn(st) {
    if (st.stage !== 2 || st.done || st.removed) return null;
    var t = st.left; st.left = st.right; st.right = t; st.turned = !st.turned;
    return stamp(st);
  }
  function breakOff(st, side) {
    if (st.stage !== 2 || st.done || st.removed || (side !== 'left' && side !== 'right')) return null;
    st.removed = side; return stamp(st);
  }
  function putBack(st) {
    if (st.stage !== 2 || st.done || !st.removed) return null;
    st.removed = null; return stamp(st);
  }
  function layout(W) { var wide = W >= 620; return { mode: wide ? 'wide' : 'narrow', tiny: W < 300, W: W }; }
  return {
    DATA: { ROUNDS: ROUNDS, FORMS: FORMS }, LOCALES: LOCALES, LEVELS: LEVELS,
    levelOf: levelOf, locale: locale, ids: ids, shuffle: shuffle, round: round, plan: plan,
    newState: newState, setDial: setDial, step: step, march: march, equation: equation, factKey: factKey, windows: windows, windowOf: windowOf,
    check: check, hint: hint, turn: turn, breakOff: breakOff, putBack: putBack, layout: layout
  };
});
