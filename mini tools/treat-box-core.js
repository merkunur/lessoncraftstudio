/* =====================================================================
   treat-box-core.js — the MODEL of the Treat Box, activity #14 of the
   one-by-one rebuild: "Feed Mochi — count out treats" (K.CC.B.5).
   Design sheet: docs/activities-rebuild/014-treat-box.md · law: LAW.md
   ---------------------------------------------------------------------
   Pure functions, no DOM, Node-loadable (scripts/verify-treat-box-core.js
   drives it; scripts/mutate-treat-box.js proves the gate bites).

   THE SKILL. K.CC.B.5, the count-out half: given a number, count out that
   many. THE INVENTION IS THE LID: every treat the child taps on the tray
   goes into a lidded bakery box and is gone from sight, so the count has to
   live in the child's head — the last number said tells how many are in
   (K.CC.B.4b). Lifting the lid is a peek (it drops again by itself); Check
   opens the box. Miss 1 → the lid stays off for the rest of the round;
   miss 2 → the treats in the box are numbered and the box marks the extra
   ones and the empty places still needed. The help never moves a treat.
   The tray always holds the same number of treats (12, or 7 up to five),
   so its size never tells the answer. Never 0.
   ===================================================================== */
(function (global) {
  'use strict';

  var POOLS = { to10: [7, 4, 9, 6, 3, 8, 5, 10, 2], to5: [3, 5, 2, 4, 1, 5, 3, 4] };
  var TRAY = { to10: 12, to5: 7 };
  var SLOTS = { to10: 12, to5: 6 };
  var RANGES = ['to5', 'to10'], LIDS = ['on', 'off'];
  var THEME = 'desserts and sweets';
  var NOUNS = ['cookie', 'cupcake', 'donut', 'muffin', 'lollipop', 'brownie', 'waffle'];

  /* mulberry32, seeded per round: the tray's scatter is fixed per round */
  function rng(seed) { var a = 0; for (var i = 0; i < seed.length; i++) a = (a * 31 + seed.charCodeAt(i)) | 0; return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

  function rounds(range, prefix) {
    var key = POOLS[range] ? range : 'to10', out = [];
    for (var i = 0; i < POOLS[key].length; i++) out.push({ id: (prefix || 'tb') + '-' + key + '-' + i, n: POOLS[key][i], noun: NOUNS[(i * 3) % NOUNS.length], tray: TRAY[key], slots: SLOTS[key] });
    return out;
  }
  function newState(r) {
    return { id: r.id, n: r.n, noun: r.noun, tray: r.tray, slots: r.slots, box: [], misses: 0, peeks: 0, checked: null, done: false };
  }
  function inBox(st, h) { return st.box.indexOf(h) >= 0; }
  function onTray(st) { return st.tray - st.box.length; }
  /* a tap on a treat on the tray: it goes into the next place in the box; returns the place or -1 */
  function put(st, h) {
    if (!st || st.done || h < 0 || h >= st.tray || h !== Math.floor(h) || inBox(st, h) || st.box.length >= st.slots) return -1;
    st.box.push(h); st.checked = null; return st.box.length - 1;
  }
  /* a tap on a treat in the (open) box: it goes back to its own spot on the tray; the rest close up */
  function takeOut(st, j) {
    if (!st || st.done || j < 0 || j >= st.box.length) return -1;
    var h = st.box.splice(j, 1)[0]; st.checked = null; return h;
  }
  function empty(st) { if (!st || st.done) return false; st.box = []; st.checked = null; return true; }

  function check(st) {
    if (st.done) return { ok: true, slip: 'right', a: st.box.length };
    var a = st.box.length, slip;
    if (a === 0) slip = 'none';
    else if (a !== st.n) slip = a > st.n ? 'more' : 'fewer';
    else slip = 'right';
    var res = { ok: slip === 'right', slip: slip, a: a };
    if (res.ok) st.done = true;
    else if (slip !== 'none') st.misses++;
    st.checked = res;
    return res;
  }
  function helpLevel(st) { return st.done ? 0 : Math.min(2, st.misses); }
  /* the lid: off when the teacher took it off, after a miss, when done, or while a peek lasts */
  function lidOpen(st, lid, peeking) { return lid === 'off' || st.done || st.misses >= 1 || !!peeking; }
  /* numbers on the treats in the box: help 2 and done */
  function boxNums(st) { var on = st.done || helpLevel(st) >= 2; return st.box.map(function (h, j) { return on ? String(j + 1) : ''; }); }
  /* the box's places at help 2: a filled place past the order is 'extra'; an empty one before it is 'need' */
  function slotMarks(st) {
    var out = [], lv = helpLevel(st);
    for (var j = 0; j < st.slots; j++) {
      var full = j < st.box.length;
      out.push(lv < 2 ? '' : (full && j >= st.n) ? 'extra' : (!full && j < st.n) ? 'need' : '');
    }
    return out;
  }
  function hintKey(st) {
    var s = st.checked ? st.checked.slip : 'none';
    return { more: 'hintMore', fewer: 'hintFewer' }[s] || 'hintStart';
  }

  /* THE BENCH. The box (its places in rows) above the tray (a grid of spots
     with a seeded jitter so the treats lie like a heap, never in rows). */
  function layout(W, slots) {
    W = Math.max(240, Math.floor(W)); slots = slots === 6 ? 6 : 12;
    var PAD = 8;
    if (W >= 560) {
      var cell = Math.min(112, Math.floor((W - 2 * PAD) / 6));
      return { mode: 'wide', cell: cell, pic: cell - 6, pad: PAD, boxCols: slots === 6 ? 3 : 6, boxRows: 2, trayCols: 6, trayRows: 2 };
    }
    if (W >= 300 || W < 280) {   /* a phone: 4 × 3 places, cells capped so the Check stays above the fold (and below 280, where six across would drop under 44 px) */
      var c2 = Math.min(66, Math.floor((W - 2 * PAD) / 4));
      return { mode: 'stack', cell: c2, pic: c2 - 2, pad: PAD, boxCols: slots === 6 ? 3 : 4, boxRows: slots === 6 ? 2 : 3, trayCols: 4, trayRows: 3 };
    }
    var c3 = Math.floor((W - 2 * PAD) / 6);
    return { mode: 'narrow', cell: c3, pic: c3, pad: PAD, boxCols: slots === 6 ? 3 : 6, boxRows: 2, trayCols: 6, trayRows: 2 };
  }
  /* where each tray treat lies: a seeded cell + jitter + tilt, in px inside the tray */
  function traySpots(st, L) {
    var cells = [], r, c, i, j, t;
    for (r = 0; r < L.trayRows; r++) for (c = 0; c < L.trayCols; c++) cells.push([c, r]);
    var rand = rng(st.id + ':' + L.mode);
    for (i = cells.length - 1; i > 0; i--) { j = Math.floor(rand() * (i + 1)); t = cells[i]; cells[i] = cells[j]; cells[j] = t; }
    var room = L.cell - L.pic, out = [];
    for (i = 0; i < st.tray; i++) {
      var q = cells[i];
      out.push({ x: L.pad + q[0] * L.cell + room / 2 + (rand() - 0.5) * room, y: L.pad + q[1] * L.cell + room / 2 + (rand() - 0.5) * room, tilt: Math.round((rand() - 0.5) * (L.mode === 'narrow' ? 12 : 24)) });   /* the 320 bench has no room around a treat: half the tilt */
    }
    return out;
  }
  function slotCell(j, L) { return [j % L.boxCols, Math.floor(j / L.boxCols)]; }

  var api = { POOLS: POOLS, TRAY: TRAY, SLOTS: SLOTS, RANGES: RANGES, LIDS: LIDS, THEME: THEME, NOUNS: NOUNS,
    rounds: rounds, newState: newState, inBox: inBox, onTray: onTray, put: put, takeOut: takeOut, empty: empty,
    check: check, helpLevel: helpLevel, lidOpen: lidOpen, boxNums: boxNums, slotMarks: slotMarks, hintKey: hintKey,
    layout: layout, traySpots: traySpots, slotCell: slotCell };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.TreatBoxCore = api;
}(typeof window !== 'undefined' ? window : globalThis));
