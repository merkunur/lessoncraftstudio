/* =====================================================================
   animal-train-core.js — the MODEL of the Animal Train, activity #10 of the
   one-by-one rebuild: "Count to 10 with Animals" (K.CC.B.4).
   Design sheet: docs/activities-rebuild/010-animal-train.md · law: LAW.md
   ---------------------------------------------------------------------
   Pure functions, no DOM, Node-loadable (scripts/verify-animal-train-core.js
   drives it; scripts/mutate-animal-train.js proves the gate bites).

   THE SKILL. K.CC.B.4, PRODUCED: a ticket shows a number; the child puts
   that many animals on a train of ten seats (two rows of five = a
   ten-frame) and presses Go.
     (a) one-to-one — board() fills the NEXT seat, one animal per seat;
     (b) cardinality — the child must decide when to STOP: more animals
         wait on the platform than any ticket asks for (except a full
         train), and go() compares the seats with the ticket;
     (c) one more — at a second stop the ticket becomes one more (or one
         fewer); the child changes the train by exactly one.
   go() names the slip ('more' = too many on board, 'fewer' = too few) and
   the help grows per stop: legMisses 1 → the train numbers its
   passengers; 2 → it also marks the extra passengers / the empty seats
   still waiting. The help never moves an animal.
   ===================================================================== */
(function (global) {
  'use strict';

  var SEATS = 10, CAR = 5;
  var THEME = 'animals';
  /* contact sheet read 2026-10-16: upright, whole, one animal each */
  var NOUNS = ['cat', 'dog', 'pig', 'duck', 'rabbit', 'sheep', 'panda', 'penguin', 'fox', 'koala', 'tiger', 'elephant'];
  var WAIT = { to10: 12, to5: 7 };
  var POOLS = {
    to10: [
      { n: 4 }, { n: 7, stop: 'more' }, { n: 9 }, { n: 6, stop: 'fewer' }, { n: 10 },
      { n: 3, stop: 'more' }, { n: 8 }, { n: 5, stop: 'more' }, { n: 9, stop: 'fewer' }, { n: 7 }
    ],
    to5: [
      { n: 3 }, { n: 2, stop: 'more' }, { n: 5 }, { n: 4, stop: 'fewer' },
      { n: 1, stop: 'more' }, { n: 4 }, { n: 3, stop: 'more' }, { n: 5, stop: 'fewer' }
    ]
  };
  var RANGES = ['to5', 'to10'];

  function rounds(range, prefix) {
    var key = POOLS[range] ? range : 'to10', out = [];
    for (var i = 0; i < POOLS[key].length; i++) {
      var r = POOLS[key][i];
      out.push({ id: (prefix || 'tr') + '-' + key + '-' + i, n: r.n, stop: r.stop || null, noun: NOUNS[(i * 5 + (key === 'to5' ? 2 : 0)) % NOUNS.length], wait: WAIT[key] });
    }
    return out;
  }
  function secondTicket(r) { return !r.stop ? null : (r.stop === 'more' ? r.n + 1 : r.n - 1); }

  function newState(r) {
    var plat = [];
    for (var i = 0; i < r.wait; i++) plat.push(true);
    return { id: r.id, n: r.n, stop: r.stop || null, noun: r.noun, wait: r.wait,
      ticket: r.n, leg: 0, prev: null, arrived: false,
      plat: plat, seats: [], misses: 0, legMisses: 0, checked: null, done: false };
  }
  function aboard(st) { return st.seats.length; }

  /* the animal on platform slot i takes the NEXT seat */
  function board(st, i) {
    if (!st || st.done || i < 0 || i >= st.plat.length || !st.plat[i] || st.seats.length >= SEATS) return false;
    st.plat[i] = false;
    st.seats.push(i);
    st.checked = null; st.arrived = false;
    return true;
  }
  /* the last animal on board gets off, back to the platform slot it came from */
  function off(st) {
    if (!st || st.done || !st.seats.length) return -1;
    var i = st.seats.pop();
    st.plat[i] = true;
    st.checked = null; st.arrived = false;
    return i;
  }

  /* Go: the train compares its passengers with the ticket */
  function go(st) {
    if (!st || st.done) return null;
    var a = st.seats.length, t = st.ticket;
    if (a === t) {
      if (st.leg === 0 && st.stop) {
        st.prev = t; st.leg = 1; st.ticket = st.stop === 'more' ? st.n + 1 : st.n - 1;
        st.legMisses = 0; st.checked = null; st.arrived = true;
        return { ok: true, slip: 'right', a: a, t: t, next: true };
      }
      st.done = true; st.arrived = false;
      st.checked = { ok: true, slip: 'right', a: a, t: t };
      return { ok: true, slip: 'right', a: a, t: t, next: false };
    }
    st.misses++; st.legMisses++; st.arrived = false;
    st.checked = { ok: false, slip: a > t ? 'more' : 'fewer', a: a, t: t };
    return { ok: false, slip: st.checked.slip, a: a, t: t, next: false };
  }

  function helpLevel(st) { return st.done ? 0 : Math.min(2, st.legMisses); }

  /* per seat: the number shown on its passenger ('' = none) and a mark:
     'extra' = a passenger beyond the ticket, 'need' = an empty seat the ticket
     still wants, 'last' = the last passenger of a finished round */
  function seatView(st) {
    var a = st.seats.length, lv = helpLevel(st), out = [];
    for (var s = 0; s < SEATS; s++) {
      var v = { num: '', mark: '' };
      if (s < a && (st.done || lv >= 1)) v.num = s + 1;
      if (lv >= 2 && s < a && s >= st.ticket) v.mark = 'extra';
      if (lv >= 2 && s >= a && s < st.ticket) v.mark = 'need';
      if (st.done && s === a - 1) v.mark = 'last';
      out.push(v);
    }
    return out;
  }

  /* the note under the train: { key, args } or null */
  function note(st) {
    if (st.done) {
      if (st.stop === 'more') return { key: 'noteOneMore', args: { a: st.prev, b: st.ticket } };
      if (st.stop === 'fewer') return { key: 'noteOneFewer', args: { a: st.prev, b: st.ticket } };
      return null;
    }
    if (st.checked && !st.checked.ok) return { key: st.checked.slip === 'more' ? 'noteTooMany' : 'noteTooFew', args: { a: st.checked.a, t: st.checked.t } };
    if (st.arrived) return { key: 'noteNewTicket', args: { t: st.ticket } };
    return null;
  }

  /* LAYOUT — integer px, gated without a browser.
     row (W >= 560): ticket + Go above; carriage two rows of five, full width;
     platform below. stack: carriage upright (two columns of five) left,
     platform (two columns) right, ticket + Go on top. */
  function layout(W, wait) {
    W = Math.max(240, Math.floor(W)); wait = wait || 12;
    if (W >= 560) {
      var FR = 12, G = 6;
      var seat = Math.min(136, Math.floor((W - 2 * FR - 4 * G) / 5));
      var cols = wait > 7 ? 6 : 4, PG = 8, PP = 8;
      var pic = seat - 8;   /* the passenger sits in the window with a 4 px rim */
      var plat = Math.min(112, pic, Math.floor((W - (cols - 1) * PG - 2 * PP) / cols));   /* never bigger than a passenger */
      return { mode: 'row', seat: seat, pic: pic, frame: FR, gap: G, plat: plat, platCols: cols, platGap: PG, platPad: PP,
        ticket: Math.max(84, Math.min(112, seat)), carW: 5 * seat + 4 * G + 2 * FR };
    }
    var fr = 8, g = 5, split = 12, pp = 4, pg = 4, edge = 8;   /* edge = the platform's yellow stripe */
    var cell = Math.min(88, Math.floor((W - 2 * fr - g - split - 2 * pp - pg - edge) / 4));
    return { mode: 'stack', seat: cell, pic: cell, frame: fr, gap: g, plat: cell, platCols: 2, platGap: pg, platPad: pp,
      ticket: Math.max(56, Math.min(84, cell)), carW: 2 * cell + g + 2 * fr, split: split, edge: edge };
  }

  var api = { SEATS: SEATS, CAR: CAR, THEME: THEME, NOUNS: NOUNS, WAIT: WAIT, POOLS: POOLS, RANGES: RANGES,
    rounds: rounds, secondTicket: secondTicket, newState: newState, aboard: aboard, board: board, off: off, go: go,
    helpLevel: helpLevel, seatView: seatView, note: note, layout: layout };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.AnimalTrainCore = api;
}(typeof window !== 'undefined' ? window : globalThis));
