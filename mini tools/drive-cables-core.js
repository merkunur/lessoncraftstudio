/* =====================================================================
   drive-cables-core.js — the model of ACTIVITY #160 of the one-by-one
   rebuild: "Sprocket's Clock — Match Analog and Digital" → THE DRIVE
   CABLES (2.MD.C.7). Pure, no DOM.
   Design: docs/activities-rebuild/designs/160-clock-digital.md
   ---------------------------------------------------------------------
   A switchboard: four analog clocks (three that match a card, one LURE
   that differs from one card by exactly one named error) and three
   digital cards, each with a cable. The child plugs every card into a
   clock; on Check each card drives a ghost pair of hands to its own time
   on that clock — the lamp lights only where the ghost hands land on the
   painted ones. Right pairs stay lit; a wrong pair shows two hand-sets on
   one face. The clocks' and cards' times are the round's own; nothing
   else is stored.
   ===================================================================== */
(function (root) {
  'use strict';
  /* [cards (h, m) ×3, lure (h, m), slots A–D as an index into cards (0–2) or 'L' for the lure] */
  var T = function (h, m) { return h * 60 + m; };
  var TABLE = {
    '1': [
      [[T(3, 0), T(7, 30), T(11, 0)], T(6, 30), ['L', 0, 1, 2]],
      [[T(9, 0), T(2, 30), T(5, 0)], T(1, 30), [0, 'L', 2, 1]],
      [[T(12, 0), T(4, 30), T(8, 0)], T(4, 0), [2, 1, 'L', 0]],
      [[T(6, 0), T(10, 30), T(1, 0)], T(12, 30), [0, 'L', 1, 2]],
      [[T(2, 0), T(8, 30), T(11, 30)], T(7, 30), [1, 2, 0, 'L']],
      [[T(7, 0), T(3, 30), T(10, 0)], T(3, 0), [2, 1, 0, 'L']],
      [[T(5, 30), T(9, 30), T(4, 0)], T(12, 20), ['L', 1, 0, 2]],
      [[T(1, 30), T(6, 30), T(12, 0)], T(6, 0), [1, 2, 'L', 0]]
    ],
    '2': [
      [[T(10, 15), T(5, 20), T(8, 0)], T(10, 45), [1, 'L', 2, 0]],
      [[T(1, 45), T(7, 30), T(11, 15)], T(1, 15), [1, 2, 0, 'L']],
      [[T(6, 45), T(2, 30), T(4, 5)], T(6, 15), ['L', 1, 0, 2]],
      [[T(9, 40), T(12, 15), T(3, 25)], T(9, 20), ['L', 2, 1, 0]],
      [[T(11, 15), T(3, 50), T(7, 10)], T(11, 45), [2, 0, 'L', 1]],
      [[T(4, 45), T(1, 20), T(8, 35)], T(5, 45), [1, 'L', 0, 2]],
      [[T(2, 55), T(10, 25), T(4, 15)], T(3, 55), [0, 'L', 2, 1]],
      [[T(12, 45), T(9, 10), T(5, 35)], T(1, 45), [0, 1, 'L', 2]],
      [[T(3, 0), T(8, 20), T(11, 40)], T(12, 15), [2, 0, 1, 'L']]
    ]
  };
  var LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
  var DOT = ['nl', 'sv', 'da', 'no', 'fi'];

  function levelOf(v) { return String(v) === '2' ? '2' : '1'; }
  function locOf(l) { l = String(l || 'en').slice(0, 2); return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function hm(t) { return { h: Math.floor(t / 60), m: t % 60 }; }
  /* the digital card: "7:30" · "7.30" · fr « 7 h 30 » (a face cannot show a.m./p.m., so neither does the card) */
  function fmt(loc, t) { var x = hm(t), l = locOf(loc), mm = (x.m < 10 ? '0' : '') + x.m; if (l === 'fr') return x.h + ' h ' + mm; return x.h + (DOT.indexOf(l) >= 0 ? '.' : ':') + mm; }
  /* the hands: the hour hand turns 30° an hour and 0.5° a minute (never ON the hour at :30) */
  function hourAngle(t) { var x = hm(t); return ((x.h % 12) * 30 + x.m / 2) % 360; }
  function minuteAngle(t) { return hm(t).m * 6; }
  /* the clock a card would show with its hands swapped: the short hand on m/5, the long hand on h */
  function swapped(t) { var x = hm(t); return T(x.m / 5 || 12, (x.h % 12) * 5); }
  /* the error that tells a card's time c from a clock's time k (null when they match) */
  function errorOf(c, k) {
    if (c === k) return null;
    var a = hm(c), b = hm(k);
    if (a.m % 5 === 0 && swapped(c) === k) return 'swap';
    var near = Math.abs(a.h % 12 - b.h % 12) === 1 || Math.abs(a.h % 12 - b.h % 12) === 11;
    if (a.m === b.m && near) return a.m === 30 ? 'half' : 'hourHand';
    if (a.h === b.h && a.m === 30 && b.m === 0) return 'longHand';
    if (a.h === b.h && (a.m === 15 || a.m === 45) && b.m === 60 - a.m) return 'quarter';
    if (a.h === b.h && a.m % 15 !== 0) return 'five';
    return 'other';
  }
  function rounds(level) {
    level = levelOf(level);
    return TABLE[level].map(function (x, i) {
      var cards = x[0], lure = x[1], slots = x[2].map(function (s) { return s === 'L' ? lure : cards[s]; });
      var baited = cards.map(function (c, j) { return [j, errorOf(c, lure)]; }).filter(function (p) { return p[1] && p[1] !== 'other'; });
      return { k: i, level: level, cards: cards.slice(), lure: lure, slots: slots, layout: x[2].slice(), baited: baited.length ? baited[0][0] : 0, lureError: baited.length ? baited[0][1] : 'other' };
    });
  }
  function newState(level, k) {
    var pool = rounds(level), r = pool[k] || pool[0];
    return { level: levelOf(level), k: r.k, round: r, plugs: [null, null, null], locked: [false, false, false], misses: 0, help: false, verdict: null, done: false };
  }
  function clear(st) { if (!st.done) st.verdict = null; }
  /* plug a card into a clock: a socket holds one plug — a plug already there springs back to its card; a lit (locked) pair cannot move */
  function plug(st, card, slot) {
    if (st.done || st.locked[card] || slot < 0 || slot > 3) return false;
    if (st.plugs[card] === slot) return false;
    var owner = st.plugs.indexOf(slot);
    if (owner >= 0) { if (st.locked[owner]) return false; st.plugs[owner] = null; }
    st.plugs[card] = slot; clear(st); return true;
  }
  function unplug(st, card) { if (st.done || st.locked[card] || st.plugs[card] === null) return false; st.plugs[card] = null; clear(st); return true; }
  function check(st) {
    if (st.done) return { result: 'no' };
    if (st.plugs.indexOf(null) >= 0) return { result: 'note', key: 'hintPlug' };
    var r = st.round, pairs = st.plugs.map(function (s, c) { return { card: c, slot: s, error: errorOf(r.cards[c], r.slots[s]) }; });
    if (pairs.every(function (p) { return p.error === null; })) { st.done = true; st.verdict = null; st.locked = [true, true, true]; return { result: 'ok' }; }
    st.misses++; st.help = st.misses >= 2;
    pairs.forEach(function (p) { if (p.error === null) st.locked[p.card] = true; });
    st.verdict = { pairs: pairs, first: pairs.filter(function (p) { return p.error !== null; })[0] };
    return { result: 'miss', error: st.verdict.first.error };
  }
  /* literal keys only (the reachability gate reads them) */
  function hint(st) {
    var v = st.verdict; if (!v) return null;
    if (st.help) return 'hintHelp';
    var e = v.first.error;
    if (e === 'swap') return 'hintSwap';
    if (e === 'half') return 'hintHalf';
    if (e === 'hourHand') return 'hintHourHand';
    if (e === 'longHand') return 'hintLongHand';
    if (e === 'quarter') return 'hintQuarter';
    if (e === 'five') return 'hintFive';
    return 'hintOther';
  }
  /* the success line's explaining sentence: about the card the lure was built to catch */
  function tipOf(r, loc) {
    var c = r.cards[r.baited], x = hm(c), next = x.h % 12 + 1;
    var key = x.m === 0 ? 'tipOclock' : x.m === 30 ? 'tipHalf' : x.m === 15 ? 'tipPast' : x.m === 45 ? 'tipTo' : 'tipFive';
    return { key: key, args: { t: fmt(loc, c), h: x.h, h1: next, n: x.m / 5, m: x.m } };
  }

  function passSize(level) { return TABLE[levelOf(level)].length; }
  function shuffle(a, rnd) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  /* an order-only reshuffle per pass, never the previous order (each round keeps its measured slot layout) */
  function plan(level, pass, rnd, prev) {
    var ks = TABLE[levelOf(level)].map(function (x, i) { return i; });
    for (var tries = 0; tries < 200; tries++) { var c = shuffle(ks.slice(), rnd); if (!prev || prev.join() !== c.join()) return c; }
    return ks.slice().reverse();
  }

  var api = { LOCALES: LOCALES, levelOf: levelOf, locOf: locOf, hm: hm, fmt: fmt, hourAngle: hourAngle, minuteAngle: minuteAngle, swapped: swapped, errorOf: errorOf,
    rounds: rounds, newState: newState, plug: plug, unplug: unplug, check: check, hint: hint, tipOf: tipOf, passSize: passSize, plan: plan };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.DriveCablesCore = api;
})(typeof window !== 'undefined' ? window : this);
