/* =====================================================================
   spirit-bench-core.js — the model of ACTIVITY #156 of the one-by-one
   rebuild: "Bram's Board Shop" → THE SPIRIT LEVEL (2.MD.B.5).
   Pure, no DOM. Design: docs/activities-rebuild/designs/156-bram-board-shop.md
   ---------------------------------------------------------------------
   Every length story is two rails that must end together: the longest
   length of the story on the top rail, the pieces end to end on the bottom
   rail. The child puts the two lengths the story gives on the bench (the
   rack also holds the keyword-trap board), types the mystery board, and on
   Check the saw cuts exactly that board and drops it into the empty place.
   A spirit level against the two rail ends stands straight only when they
   end together. The answer is never stored: it is derived from the story's
   two numbers by its shape.
   ===================================================================== */
(function (root) {
  'use strict';
  /* the eleven story shapes: where the mystery is, and how the two story numbers {a} {b} sit on the bench
     top = what lies on the top rail ('a' | 'b' | '?'), bottom = the bottom rail, the known piece first */
  var SHAPES = {
    addResult: { top: '?', bottom: ['a', 'b'] },     /* a + b = ?            */
    addChange: { top: 'b', bottom: ['a', '?'] },     /* a + ? = b            */
    addStart: { top: 'b', bottom: ['a', '?'] },      /* ? + a = b            */
    takeResult: { top: 'a', bottom: ['b', '?'] },    /* a − b = ?            */
    takeChange: { top: 'a', bottom: ['b', '?'] },    /* a − ? = b            */
    takeStart: { top: '?', bottom: ['b', 'a'] },     /* ? − a = b            */
    apartPart: { top: 'a', bottom: ['b', '?'] },     /* a = b + ?            */
    cmpDiff: { top: 'a', bottom: ['b', '?'] },       /* a − b = ? (longer)   */
    cmpBigger: { top: '?', bottom: ['a', 'b'] },     /* ? = a + b            */
    cmpSmaller: { top: 'a', bottom: ['b', '?'] },    /* ? = a − b (keyword "longer" is the trap) */
    together: { top: '?', bottom: ['a', 'b'] }       /* a + b = ?            */
  };
  var ORDER = ['addResult', 'addChange', 'addStart', 'takeResult', 'takeChange', 'takeStart', 'apartPart', 'cmpDiff', 'cmpBigger', 'cmpSmaller', 'together'];
  /* per level, in ORDER: [a, b, decoy, the rack's three boards in their order] — design §6 */
  var L80 = [[25, 20, 5, [5, 25, 20]], [20, 35, 55, [20, 35, 55]], [15, 40, 55, [40, 55, 15]], [45, 15, 60, [60, 15, 45]], [35, 25, 60, [25, 60, 35]], [20, 35, 15, [35, 20, 15]],
    [50, 30, 80, [50, 30, 80]], [55, 20, 75, [75, 55, 20]], [25, 15, 10, [15, 10, 25]], [65, 15, 80, [65, 15, 80]], [35, 30, 5, [35, 5, 30]]];
  var L100 = [[38, 27, 11, [38, 11, 27]], [34, 62, 96, [96, 62, 34]], [26, 64, 90, [26, 64, 90]], [52, 35, 87, [35, 87, 52]], [58, 39, 97, [97, 39, 58]], [27, 48, 21, [48, 21, 27]],
    [61, 24, 85, [24, 61, 85]], [63, 29, 92, [63, 92, 29]], [47, 36, 11, [11, 47, 36]], [64, 29, 93, [29, 64, 93]], [46, 39, 7, [7, 46, 39]]];
  var PIC = { addResult: ['clothing', 'scarf'], addChange: ['tools', 'hammer'], addStart: ['tools', 'hammer'], takeResult: ['tools', 'handsaw'], takeChange: ['tools', 'handsaw'], takeStart: ['tools', 'handsaw'],
    apartPart: ['tools', 'handsaw'], cmpDiff: ['furniture', 'shelf'], cmpBigger: ['furniture', 'shelf'], cmpSmaller: ['tools', 'handsaw'], together: ['tools', 'hammer'] };

  function levelOf(v) { return String(v) === '100' ? '100' : '80'; }
  function maxOf(level) { return levelOf(level) === '100' ? 100 : 80; }
  /* the answer, derived from the story's two numbers by the bench model (never stored) */
  function solve(shape, a, b) { var s = SHAPES[shape], v = { a: a, b: b }; return s.top === '?' ? v[s.bottom[0]] + v[s.bottom[1]] : v[s.top] - v[s.bottom[0]]; }
  function rounds(level) {
    level = levelOf(level);
    var T = level === '100' ? L100 : L80;
    return ORDER.map(function (shape, i) {
      var x = T[i], a = x[0], b = x[1], s = SHAPES[shape], v = { a: a, b: b }, rack = x[3].slice();
      return { k: i, level: level, max: maxOf(level), shape: shape, a: a, b: b, decoy: x[2], rack: rack, answer: solve(shape, a, b),
        topKnown: s.top === '?' ? null : v[s.top], bottomKnown: s.bottom.filter(function (q) { return q !== '?'; }).map(function (q) { return v[q]; }),
        mystery: s.top === '?' ? 'top' : 'bottom', pic: PIC[shape] };
    });
  }

  function newState(level, k) {
    var pool = rounds(level), r = pool[k] || pool[0];
    return { level: levelOf(level), k: r.k, round: r, top: null, bottom: [], typed: null, misses: 0, help: false, verdict: null, done: false, testing: false };
  }
  /* boards: rack index 0..2; where is board i? */
  function where(st, i) { return st.top === i ? 'top' : st.bottom.indexOf(i) >= 0 ? 'bottom' : 'rack'; }
  function placed(st) { return (st.top === null ? 0 : 1) + st.bottom.length; }
  function clear(st) { if (!st.done) { st.verdict = null; st.testing = false; } }
  /* put board i on a rail ('top' | 'bottom' | 'rack'); the bench holds two boards — the third place is the mystery's */
  function put(st, i, rail) {
    if (st.done || !(i >= 0 && i < 3)) return { ok: false };
    var from = where(st, i);
    if (from === rail) return { ok: false };
    if (rail === 'top' && st.top !== null) return { ok: false, full: true };
    if (rail !== 'rack' && from === 'rack' && placed(st) >= 2) return { ok: false, full: true };
    if (rail === 'bottom' && st.bottom.length >= 2) return { ok: false, full: true };
    if (from === 'top') st.top = null; else if (from === 'bottom') st.bottom.splice(st.bottom.indexOf(i), 1);
    if (rail === 'top') st.top = i; else if (rail === 'bottom') st.bottom.push(i);
    clear(st); return { ok: true };
  }
  /* the mystery place: once two boards are on the bench, the one empty place */
  function mystery(st) { if (placed(st) !== 2) return null; return st.top === null ? 'top' : 'bottom'; }
  function val(st, i) { return st.round.rack[i]; }
  /* the two rail lengths with a board of length `cut` in the mystery place (cut null = nothing cut) */
  function rails(st, cut) {
    var m = mystery(st), top = st.top === null ? 0 : val(st, st.top), bottom = 0;
    st.bottom.forEach(function (i) { bottom += val(st, i); });
    if (cut != null && m === 'top') top = cut; else if (cut != null && m === 'bottom') bottom += cut;
    return { top: top, bottom: bottom };
  }
  /* the keypad: up to two digits, never a leading zero; only once the bench is built */
  function typeDigit(st, d) {
    if (st.done || mystery(st) === null) return false;
    d = String(d); if (!/^[0-9]$/.test(d)) return false;
    var s = st.typed == null ? '' : String(st.typed);
    if (s.length >= 2 || (s === '' && d === '0')) return false;
    st.typed = +(s + d); clear(st); return true;
  }
  function backspace(st) {
    if (st.done || st.typed == null) return false;
    var s = String(st.typed).slice(0, -1); st.typed = s === '' ? null : +s; clear(st); return true;
  }
  /* is the bench built the way the story says? (the known lengths on their rails, no trap board) */
  function modelRight(st) {
    var r = st.round, top = st.top === null ? null : val(st, st.top), bot = st.bottom.map(function (i) { return val(st, i); }).sort();
    return top === r.topKnown && bot.join() === r.bottomKnown.slice().sort().join();
  }
  function decoyOn(st) { var d = st.round.rack.indexOf(st.round.decoy); return where(st, d) !== 'rack'; }
  function check(st) {
    if (st.done) return { result: 'no' };
    if (placed(st) < 2) return { result: 'note', key: 'hintBoards' };
    if (st.typed === null) return { result: 'note', key: 'hintType' };
    var r = st.round, R = rails(st, st.typed), kind = null;
    if (decoyOn(st)) kind = 'decoy';
    else if (!modelRight(st)) kind = 'wrongRail';
    else if (st.typed !== r.answer) kind = 'number';
    if (!kind) { st.done = true; st.verdict = null; st.testing = false; return { result: 'ok' }; }
    st.misses++; st.help = st.misses >= 2;
    st.verdict = { kind: kind, typed: st.typed, top: R.top, bottom: R.bottom };
    return { result: 'miss', kind: kind };
  }
  /* miss 2 with the bench built wrong: the boards go where the story puts them (the number stays the child's) */
  function fixModel(st) {
    var r = st.round, used = [], pick = function (v) { for (var i = 0; i < 3; i++) if (r.rack[i] === v && used.indexOf(i) < 0 && i !== r.rack.indexOf(r.decoy)) { used.push(i); return i; } return null; };
    st.top = r.topKnown === null ? null : pick(r.topKnown);
    st.bottom = r.bottomKnown.map(pick);
    return true;
  }
  /* the level, for any state: 0 = the rails end together, <0 the top rail is longer, >0 the bottom rail is longer */
  function tilt(st, cut) { var R = rails(st, cut); return R.bottom - R.top; }
  /* where the mystery board starts and has to reach in the story's model (for the counting-up help) */
  /* the same, for the bench as built: when the mystery is the whole it starts at 0, so the help counts on from the end of the first piece */
  function spanOf(st) { var r = st.round; if (r.mystery !== 'top') return span(r); var p = st.bottom.map(function (i) { return r.rack[i]; }); return { s: p[0], e: p[0] + p[1] }; }
  function span(r) { return r.mystery === 'top' ? { s: 0, e: r.bottomKnown[0] + r.bottomKnown[1] } : { s: r.bottomKnown[0], e: r.topKnown }; }
  /* literal keys only (the reachability gate reads them) */
  function hint(st) {
    var v = st.verdict;
    if (!v) return null;
    if (st.help) return v.kind === 'number' ? (st.round.mystery === 'top' ? 'hintCountTop' : 'hintCount') : 'hintFixed';
    /* a wrong bench can still balance (the sum is right for the bench that was built): say so, never let a straight level read as right */
    var flat = v.top === v.bottom;
    if (v.kind === 'decoy') return flat ? 'hintDecoyFlat' : 'hintDecoy';
    if (v.kind === 'wrongRail') return flat ? 'hintRailFlat' : 'hintRail';
    return 'hintLevel';
  }
  function storyKey(r) { return 's_' + r.shape; }
  function okKey(r) { return 'ok_' + r.shape; }

  function passSize(level) { return rounds(level).length; }
  function shuffle(a, rnd) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  /* the mystery never sits on the same rail in more than two rounds in a row */
  function runsOk(level, o) { var R = rounds(level); for (var i = 2; i < o.length; i++) if (R[o[i]].mystery === R[o[i - 1]].mystery && R[o[i]].mystery === R[o[i - 2]].mystery) return false; return true; }
  /* an order-only reshuffle per pass, never the previous order */
  function plan(level, pass, rnd, prev) {
    var ks = rounds(level).map(function (r) { return r.k; });
    for (var tries = 0; tries < 400; tries++) { var c = shuffle(ks.slice(), rnd); if ((!prev || prev.join() !== c.join()) && runsOk(level, c)) return c; }
    return prev && prev.join() === ks.join() ? ks.slice().reverse() : ks.slice();
  }

  var api = { SHAPES: SHAPES, ORDER: ORDER, levelOf: levelOf, maxOf: maxOf, solve: solve, rounds: rounds, newState: newState, where: where, placed: placed, put: put, mystery: mystery,
    rails: rails, spanOf: spanOf, typeDigit: typeDigit, backspace: backspace, modelRight: modelRight, decoyOn: decoyOn, check: check, fixModel: fixModel, tilt: tilt, span: span, hint: hint,
    storyKey: storyKey, okKey: okKey, passSize: passSize, runsOk: runsOk, plan: plan };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.SpiritBenchCore = api;
})(typeof window !== 'undefined' ? window : this);
