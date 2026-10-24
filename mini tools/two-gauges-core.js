/* =====================================================================
   two-gauges-core.js — the model of ACTIVITY #89, THE TWO GAUGES
   ("Fixit's Fix-It Corner", 1.OA.D.8 + G3-350 make-it-balance + the
   tens-friendly "Big gadgets"). Pure, no DOM.
   Design sheet: docs/activities-rebuild/designs/089-fix-it-corner.md
   ---------------------------------------------------------------------
   Every gadget has two gauges, one for each side of the equals sign. The
   child puts one number in the socket and pulls the lever: each needle
   sweeps its side term by term (up for +, back for −), and the gadget
   runs only when both needles stop on the same number. A needle that
   would leave its dial bonks a pin (the zero pin below 0, the stop pin
   past the top). Nothing shows what the socket does before the lever,
   and no hint ever prints the answer.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.TwoGaugesCore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  var LOCALES = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
  var LEVELS = ['10', '20', 'big'], TOP = { '10': 10, '20': 20, 'big': 100 }, VMAX = { '10': 10, '20': 20, 'big': 99 };
  /* the rounds: [equation with ? as the socket, answer, panel] */
  var ROUNDS = {
    '10': [['10=7+?', 3], ['?+4=9', 5], ['6+3=?', 9], ['10-?=6', 4], ['?-3=5', 8], ['9-7=?', 2], ['2+?=8', 6], ['4+4=?+1', 7], ['?+2=3', 1]],
    '20': [['8+5=?', 13], ['9+?=15', 6], ['13-?=8', 5], ['?+5=12', 7], ['?-6=8', 14], ['6+6=?+4', 8], ['16-7=?', 9], ['18=7+?', 11], ['10+?=9+3', 2]],
    'big': [['40+30=?', 70], ['90=50+?', 40], ['?+20=80', 60], ['60=90-?', 30], ['?-40=50', 90], ['35+?=40', 5], ['62+?=72', 10, 'wall'], ['30+40=?+50', 20], ['25+10+?=50', 15, 'chain']]
  };
  /* the broken gadgets on the bench (library pictures: dir, key) — the noun is never shown or spoken */
  var GADGETS = [['kitchen tools', 'toaster'], ['kitchen tools', 'blender'], ['kitchen tools', 'kettle'], ['kitchen tools', 'mixer'], ['kitchen tools', 'microwave'],
    ['toys', 'robot'], ['toys', 'train'], ['toys', 'helicopter'], ['around the house', 'fan']];

  function levelOf(l) { l = String(l); return LEVELS.indexOf(l) >= 0 ? l : '20'; }
  function locale(l) { l = String(l || 'en').slice(0, 2).toLowerCase(); return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function ids(level) { var n = ROUNDS[levelOf(level)].length, out = []; for (var i = 0; i < n; i++) out.push(i); return out; }
  function shuffle(a, rnd) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function parseSide(s) {
    var out = [], re = /([+-]?)(\d+|\?)/g, m, first = true;
    while ((m = re.exec(s))) { out.push({ n: m[2] === '?' ? null : +m[2], op: first ? '+' : (m[1] === '-' ? '-' : '+') }); first = false; }
    return out;
  }
  /* the kind of blank: result · addend · subtrahend · minuend · balance */
  function kindOf(L, R, sock) {
    var mine = sock.side === 'L' ? L : R, other = sock.side === 'L' ? R : L;
    if (mine.length === 1) return 'result';
    if (other.length >= 2) return 'balance';
    if (mine[sock.index].op === '-') return 'subtrahend';
    if (sock.index === 0 && mine.length >= 2 && mine[1].op === '-') return 'minuend';
    return 'addend';
  }
  function round(level, idx) {
    level = levelOf(level);
    var row = ROUNDS[level][idx], halves = row[0].split('='), L = parseSide(halves[0]), R = parseSide(halves[1]), sock = null;
    [['L', L], ['R', R]].forEach(function (p) { p[1].forEach(function (t, i) { if (t.n === null) sock = { side: p[0], index: i }; }); });
    return { level: level, idx: idx, top: TOP[level], vmax: VMAX[level], L: L, R: R, socket: sock, ans: row[1], panel: row[2] || 'strip', kind: kindOf(L, R, sock) };
  }
  function termsWith(terms, v, which, sock) { return terms.map(function (t, i) { return { n: sock && sock.side === which && sock.index === i ? v : t.n, op: t.op }; }); }
  function value(terms) { var s = 0; for (var i = 0; i < terms.length; i++) { if (terms[i].n == null) return null; s += terms[i].op === '-' ? -terms[i].n : terms[i].n; } return s; }
  /* the needle's run along one side: its stops, its reading, and a pin if it would leave the dial */
  function sweep(terms, top) {
    var s = 0, stops = [0], pin = null;
    for (var i = 0; i < terms.length; i++) {
      s += terms[i].op === '-' ? -terms[i].n : terms[i].n;
      if (s < 0) { stops.push(0); pin = 'zero'; break; }
      if (s > top) { stops.push(top); pin = 'stop'; break; }
      stops.push(s);
    }
    return { stops: stops, reading: stops[stops.length - 1], pin: pin };
  }
  function sides(r, v) { return { L: termsWith(r.L, v, 'L', r.socket), R: termsWith(r.R, v, 'R', r.socket) }; }
  /* my own check: the one value that balances (null if none or several) */
  function solve(r) {
    var hit = [];
    for (var v = 1; v <= r.vmax; v++) { var s = sides(r, v), a = sweep(s.L, r.top), b = sweep(s.R, r.top); if (!a.pin && !b.pin && a.reading === b.reading) hit.push(v); }
    return hit.length === 1 ? hit[0] : null;
  }
  /* at rest: a side with no socket shows its reading — unless the socket stands ALONE on the other side (that reading IS the answer) */
  function rest(r) {
    var out = { L: null, R: null }, other = r.socket.side === 'L' ? 'R' : 'L';
    if (r.kind !== 'result') out[other] = value(other === 'L' ? r.L : r.R);
    return out;
  }
  function text(r, v, blank) {
    blank = blank || '□';
    var side = function (terms, which) { return terms.map(function (t, i) { var n = r.socket.side === which && r.socket.index === i ? (v == null ? blank : String(v)) : String(t.n); return (i ? (t.op === '-' ? ' − ' : ' + ') : '') + n; }).join(''); };
    return side(r.L, 'L') + ' = ' + side(r.R, 'R');
  }
  /* the task-line prompt for a round: a key and its numbers (never the answer) */
  function prompt(r) {
    var mine = r.socket.side === 'L' ? r.L : r.R, other = r.socket.side === 'L' ? r.R : r.L, ov = value(other);
    if (r.panel === 'chain') return { key: 'pChain', args: { c: ov } };
    if (r.kind === 'balance') return { key: 'pBal', args: {} };
    if (r.kind === 'result') return other[1].op === '-' ? { key: 'pDiff', args: { a: other[0].n, b: other[1].n } } : { key: 'pSum', args: { a: other[0].n, b: other[1].n } };
    if (r.kind === 'subtrahend') return { key: 'pSub', args: { a: mine[0].n, c: ov } };
    if (r.kind === 'minuend') return { key: 'pMin', args: { b: mine[1].n, c: ov } };
    if (ov === 10 && r.level === '10' && r.socket.index === 1) return { key: 'pMake10', args: {} };
    if (r.socket.index === 0) return { key: 'pAdd1', args: { b: mine[1].n, c: ov } };
    return { key: 'pAdd2', args: { a: mine[0].n, c: ov } };
  }

  /* ---- order: never the previous pass; never one blank kind 3 times running ---- */
  function runOk(level, order) {
    var run = 0, last = null;
    for (var i = 0; i < order.length; i++) { var k = round(level, order[i]).kind; run = k === last ? run + 1 : 1; last = k; if (run > 2) return false; }
    return true;
  }
  function plan(level, rnd, prev) {
    var all = ids(level), order = all, ok = false;
    for (var k = 0; k < 6000 && !ok; k++) { order = shuffle(all, rnd); ok = runOk(level, order) && !(prev && prev.length && prev.join() === order.join()); }
    return { order: order, gadgets: shuffle(GADGETS.map(function (g, i) { return i; }), rnd) };
  }

  /* ---- state ---- */
  function newState(r) { return { r: r, value: null, misses: 0, show: 0, last: null, done: false, run: null }; }
  function moved(st) { st.show = 0; st.last = null; st.run = null; }
  function setValue(st, v) {
    if (st.done) return false;
    v = Math.round(+v);
    if (!(v >= 1 && v <= st.r.vmax)) return false;
    if (v === st.value) return false;
    st.value = v; moved(st); return true;
  }
  /* pull the lever */
  function pull(st) {
    if (st.done) return null;
    if (st.value == null) { st.last = { reason: 'empty' }; return { ok: false, reason: 'empty' }; }
    var s = sides(st.r, st.value), a = sweep(s.L, st.r.top), b = sweep(s.R, st.r.top);
    var res = { L: a, R: b, ok: !a.pin && !b.pin && a.reading === b.reading, gap: Math.abs(a.reading - b.reading), pin: a.pin || b.pin };
    st.run = res;
    if (res.ok) { st.done = true; st.last = { reason: 'ok', n: a.reading }; res.reason = 'ok'; return res; }
    st.misses++; st.show = Math.min(2, st.misses); st.last = { reason: res.pin ? 'pin' : 'gap' }; res.reason = st.last.reason;
    return res;
  }
  /* the help: miss 1 the gap (or the pin); miss 2 a hint chosen by the blank so it never prints the answer */
  function hint(st) {
    var L = st.last; if (!L) return null;
    if (L.reason === 'empty') return { key: 'hEmpty', args: {} };
    if (L.reason !== 'gap' && L.reason !== 'pin') return null;
    if (st.show < 2) return { key: L.reason === 'pin' ? 'hPin' : 'hGap', args: {} };
    var p = countPath(st.r); return { key: p.hint, args: p.args };
  }
  /* the counting path for miss 2 (and "Always"): on the socket's gauge, from one tick AFTER the start */
  function countPath(r) {
    var mine = r.socket.side === 'L' ? r.L : r.R, other = r.socket.side === 'L' ? r.R : r.L, ov = value(other);
    var known = mine.filter(function (t, i) { return i !== r.socket.index; });
    var kv = value(known.map(function (t, i) { return i === 0 ? { n: t.n, op: '+' } : t; }));
    if (r.kind === 'result') {
      var a = other[0].n, b = other[1].n;
      /* a difference is found by counting UP from the number taken away ("think addition"), never by counting back b */
      if (other[1].op === '-') return { side: r.socket.side, from: b, to: a, hint: 'hSteps', args: { k: b, target: a }, endsOnAnswer: false };
      return { side: r.socket.side, from: a, to: a + b, hint: 'hOn', args: { a: a, b: b }, endsOnAnswer: true };
    }
    if (r.kind === 'minuend') { var bb = mine[1].n; return { side: r.socket.side, from: ov, to: ov + bb, hint: 'hOn', args: { a: ov, b: bb }, endsOnAnswer: true }; }
    if (r.kind === 'balance') return { side: r.socket.side, from: kv, to: ov, hint: 'hBoth', args: { n: ov }, endsOnAnswer: false };
    if (r.kind === 'subtrahend') return { side: r.socket.side, from: ov, to: mine[0].n, hint: 'hSteps', args: { k: ov, target: mine[0].n }, endsOnAnswer: false };
    return { side: r.socket.side, from: kv, to: ov, hint: 'hSteps', args: { k: kv, target: ov }, endsOnAnswer: false };
  }
  /* the dial: 270° from 0 at the lower left, clockwise; degrees with 0 = pointing right, y down */
  function angle(v, top) { return 135 + 270 * v / top; }
  function layout(W) { var narrow = W < 560; return { narrow: narrow, tiny: W < 330, W: W, gauge: narrow ? Math.max(118, Math.min(150, Math.floor((W - 44) / 2))) : 180, plate: narrow ? 28 : 40 }; }
  return {
    DATA: { ROUNDS: ROUNDS, GADGETS: GADGETS }, LOCALES: LOCALES, LEVELS: LEVELS, TOP: TOP,
    levelOf: levelOf, locale: locale, ids: ids, shuffle: shuffle, parseSide: parseSide, round: round, value: value, sweep: sweep, sides: sides, solve: solve, rest: rest,
    text: text, prompt: prompt, runOk: runOk, plan: plan, newState: newState, setValue: setValue, pull: pull, hint: hint, countPath: countPath, angle: angle, layout: layout
  };
});
