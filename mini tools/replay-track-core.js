/* =====================================================================
   replay-track-core.js — the model of THE REPLAY TRACK (row 136,
   "Story Problems", 2.OA.A.1 · 1.OA.A.1 · 3.OA.A.3). Pure, no DOM.
   Design: docs/activities-rebuild/designs/136-numberbond.md
   ---------------------------------------------------------------------
   Every story is a SCRIPT of steps on up to three lanes (A, B, C) of a
   measuring track, with the child's number as the symbol '?'. A value is
   a told number ('t0' = the first number in the story text), '?' or the
   end of another lane ('=A'). Ops: set / add / sub / rep (n segments of
   size s). A flag step says where a lane's bar must end: at a told number
   ('t1') or at the end of another lane ('=A'). A grey step plants a grey
   marker at a lane's end (the middle of a two-step story).
   play(rd, typed) substitutes the child's number and returns the frames,
   the flags hit or missed, and the first miss. Hitting a flag is exact
   equality — a bar one short is a miss.
   ===================================================================== */
(function (root) {
  'use strict';

  /* told numbers are in story order and identical in all 11 locales */
  var R = {
    w100: [
      { pic: 'flowers/tulip', type: 'pt', told: [20, 30], eq: '20+30=?', s: [['A', 'set', 't0'], ['A', 'add', 't1'], ['C', 'set', '?'], ['C', 'flag', '=A']] },
      { pic: 'classroom/book', type: 'ta', told: [45, 25], eq: '45-25=?', s: [['A', 'set', 't1'], ['A', 'add', '?'], ['A', 'flag', 't0']] },
      { pic: 'fruits/apple', type: 'pt', told: [18, 21], eq: '18+21=?', s: [['A', 'set', 't0'], ['A', 'add', 't1'], ['C', 'set', '?'], ['C', 'flag', '=A']] },
      { pic: 'farm animals/sheep', type: 'tfs', told: [20, 30], eq: '?-20=30', s: [['A', 'set', '?'], ['A', 'sub', 't0'], ['A', 'flag', 't1']] },
      { pic: 'toys/crayons', type: 'ta', told: [60, 35], eq: '60-35=?', s: [['A', 'set', 't1'], ['A', 'add', '?'], ['A', 'flag', 't0']] },
      { pic: 'farm animals/duck', type: 'atc', told: [16, 30], eq: '16+?=30', s: [['A', 'set', 't0'], ['A', 'add', '?'], ['A', 'flag', 't1']] },
      { pic: null, type: 'cd', told: [40, 22], eq: '40-22=?', s: [['A', 'set', 't0'], ['B', 'set', 't1'], ['B', 'add', '?'], ['B', 'flag', '=A']] },
      { pic: null, type: 'cb', told: [24, 23], eq: '24+23=?', s: [['A', 'set', 't0'], ['A', 'add', 't1'], ['C', 'set', '?'], ['C', 'flag', '=A']] },
      { pic: null, type: 'ats', told: [17, 45], eq: '?+17=45', s: [['A', 'set', '?'], ['A', 'add', 't0'], ['A', 'flag', 't1']] },
      { pic: 'beach/seashell', type: 'tfs', told: [15, 20], eq: '?-15=20', s: [['A', 'set', '?'], ['A', 'sub', 't0'], ['A', 'flag', 't1']] },
      { pic: null, type: 'cs', told: [38, 12], eq: '38-12=?', s: [['A', 'set', 't0'], ['B', 'set', '?'], ['B', 'add', 't1'], ['B', 'flag', 't0']] },
      { pic: 'toys/cards', type: 'cb', told: [27, 9], eq: '27+9=?', s: [['A', 'set', 't0'], ['B', 'set', '?'], ['B', 'sub', 't1'], ['B', 'flag', 't0']] },
      { pic: 'spring/bird', type: 'tfr', told: [52, 19], eq: '52-19=?', s: [['A', 'set', 't0'], ['A', 'sub', 't1'], ['C', 'set', '?'], ['C', 'flag', '=A']] },
      { pic: 'vehicles/bus', type: 'atr', told: [36, 25], eq: '36+25=?', s: [['A', 'set', 't0'], ['A', 'add', 't1'], ['C', 'set', '?'], ['C', 'flag', '=A']] }
    ],
    w20: [
      { pic: 'forest creatures/frog', type: 'atr', told: [4, 3], eq: '4+3=?', s: [['A', 'set', 't0'], ['A', 'add', 't1'], ['C', 'set', '?'], ['C', 'flag', '=A']] },
      { pic: 'fruits/apple', type: 'tfr', told: [9, 5], eq: '9-5=?', s: [['A', 'set', 't0'], ['A', 'sub', 't1'], ['C', 'set', '?'], ['C', 'flag', '=A']] },
      { pic: 'toys/car', type: 'atc', told: [5, 12], eq: '5+?=12', s: [['A', 'set', 't0'], ['A', 'add', '?'], ['A', 'flag', 't1']] },
      { pic: 'spring/bird', type: 'tfs', told: [4, 8], eq: '?-4=8', s: [['A', 'set', '?'], ['A', 'sub', 't0'], ['A', 'flag', 't1']] },
      { pic: 'fruits/strawberry', type: 'pt', told: [7, 8], eq: '7+8=?', s: [['A', 'set', 't0'], ['A', 'add', 't1'], ['C', 'set', '?'], ['C', 'flag', '=A']] },
      { pic: 'toys/balloon', type: 'tfr', told: [15, 6], eq: '15-6=?', s: [['A', 'set', 't0'], ['A', 'sub', 't1'], ['C', 'set', '?'], ['C', 'flag', '=A']] },
      { pic: 'toys/boat', type: 'atc', told: [10, 18], eq: '10+?=18', s: [['A', 'set', 't0'], ['A', 'add', '?'], ['A', 'flag', 't1']] },
      { pic: 'bakery/cookie', type: 'tfs', told: [7, 11], eq: '?-7=11', s: [['A', 'set', '?'], ['A', 'sub', 't0'], ['A', 'flag', 't1']] },
      { pic: 'insects and bugs/bee', pic2: 'insects and bugs/butterfly', type: 'cd', told: [14, 5], eq: '14-5=?', s: [['A', 'set', 't0'], ['B', 'set', 't1'], ['B', 'add', '?'], ['B', 'flag', '=A']] },
      { pic: 'toys/cards', type: 'tfs', told: [6, 9], eq: '?-6=9', s: [['A', 'set', '?'], ['A', 'sub', 't0'], ['A', 'flag', 't1']] }
    ],
    two: [
      { pic: 'vehicles/bus', type: 'two', told: [24, 8, 13], eq: '24-8+13=?', s: [['A', 'set', 't0'], ['A', 'sub', 't1'], ['A', 'grey'], ['A', 'add', 't2'], ['C', 'set', '?'], ['C', 'flag', '=A']] },
      { pic: null, type: 'two', told: [35, 12, 9], eq: '35-12-9=?', s: [['A', 'set', 't0'], ['A', 'sub', 't1'], ['A', 'grey'], ['A', 'sub', 't2'], ['C', 'set', '?'], ['C', 'flag', '=A']] },
      { pic: null, type: 'two', told: [18, 7], eq: '18+18+7=?', s: [['B', 'set', 't0'], ['B', 'add', 't1'], ['B', 'grey'], ['A', 'set', 't0'], ['A', 'add', '=B'], ['C', 'set', '?'], ['C', 'flag', '=A']] },
      { pic: 'spring/bird', type: 'two', told: [50, 25, 10], eq: '50-25+10=?', s: [['A', 'set', 't0'], ['A', 'sub', 't1'], ['A', 'grey'], ['A', 'add', 't2'], ['C', 'set', '?'], ['C', 'flag', '=A']] },
      { pic: 'classroom/book', type: 'two', told: [16, 16, 40], eq: '16+16+?=40', s: [['A', 'set', 't0'], ['A', 'add', 't1'], ['A', 'grey'], ['A', 'add', '?'], ['A', 'flag', 't2']] },
      { pic: 'toys/crayons', type: 'two', told: [40, 15, 15], eq: '15+15+?=40', s: [['A', 'set', 't1'], ['A', 'add', 't2'], ['A', 'grey'], ['A', 'add', '?'], ['A', 'flag', 't0']] },
      { pic: null, type: 'two', told: [27, 6, 9], eq: '27-6+9=?', s: [['A', 'set', 't0'], ['A', 'sub', 't1'], ['A', 'grey'], ['A', 'add', 't2'], ['C', 'set', '?'], ['C', 'flag', '=A']] },
      { pic: 'toys/balloon', type: 'two', told: [12, 30, 20], eq: '12+30-20=?', s: [['A', 'set', 't0'], ['A', 'add', 't1'], ['A', 'grey'], ['A', 'sub', 't2'], ['C', 'set', '?'], ['C', 'flag', '=A']] }
    ],
    groups: [
      { pic: 'fruits/apple', type: 'mul', told: [5, 6], eq: '5*6=?', s: [['A', 'rep', 't0', 't1'], ['C', 'set', '?'], ['C', 'flag', '=A']] },
      { pic: 'toys/crayons', type: 'mul', told: [4, 8], eq: '4*8=?', s: [['A', 'rep', 't0', 't1'], ['C', 'set', '?'], ['C', 'flag', '=A']] },
      { pic: 'classroom/chair', type: 'mul', told: [3, 7], eq: '3*7=?', s: [['A', 'rep', 't0', 't1'], ['C', 'set', '?'], ['C', 'flag', '=A']] },
      { pic: 'bakery/cookie', type: 'mul', told: [6, 4], eq: '6*4=?', s: [['A', 'rep', 't0', 't1'], ['C', 'set', '?'], ['C', 'flag', '=A']] },
      { pic: 'toys/bicycle', type: 'mul', told: [9, 2], eq: '9*2=?', s: [['A', 'rep', 't0', 't1'], ['C', 'set', '?'], ['C', 'flag', '=A']] },
      { pic: 'fruits/strawberry', type: 'share', told: [24, 4], eq: '24/4=?', s: [['A', 'rep', 't1', '?'], ['A', 'flag', 't0']] },
      { pic: null, type: 'share', told: [35, 5], eq: '35/5=?', s: [['A', 'rep', 't1', '?'], ['A', 'flag', 't0']] },
      { pic: 'toys/cards', type: 'share', told: [27, 3], eq: '27/3=?', s: [['A', 'rep', 't1', '?'], ['A', 'flag', 't0']] },
      { pic: null, type: 'grp', told: [28, 4], eq: '28/4=?', s: [['A', 'rep', '?', 't1'], ['A', 'flag', 't0']] },
      { pic: 'flowers/tulip', type: 'grp', told: [30, 5], eq: '30/5=?', s: [['A', 'rep', '?', 't1'], ['A', 'flag', 't0']] }
    ]
  };
  var SETS = ['w20', 'w100', 'two', 'groups'];
  var TOP = { w20: 20, w100: 100, two: 60, groups: 50 };
  var MAXREP = 60;

  function setOf(v) { return SETS.indexOf(v) >= 0 ? v : 'w100'; }
  function rounds(set) { return R[setOf(set)]; }
  function top(set) { return TOP[setOf(set)]; }

  /* the answer: solved from the round's equation (the table) */
  function answer(rd) {
    var e = rd.eq, parts = e.split('='), lhs = parts[0], rhs = parts[1];
    if (rhs === '?') return evalExpr(lhs);
    /* a missing operand: try every whole number up to 200 (exact) */
    for (var x = 0; x <= 200; x++) if (evalExpr(lhs.replace('?', String(x))) === +rhs) return x;
    return null;
  }
  function evalExpr(s) {
    var toks = s.match(/\d+|[+\-*/]/g), v = [], o = [];
    for (var i = 0; i < toks.length; i++) if (/\d/.test(toks[i])) v.push(+toks[i]); else o.push(toks[i]);
    /* * and / first, then + and − left to right */
    for (var j = 0; j < o.length; j++) if (o[j] === '*' || o[j] === '/') { var r = o[j] === '*' ? v[j] * v[j + 1] : v[j] / v[j + 1]; v.splice(j, 2, r); o.splice(j, 1); j--; }
    var acc = v[0];
    for (var k = 0; k < o.length; k++) acc = o[k] === '+' ? acc + v[k + 1] : acc - v[k + 1];
    return acc;
  }

  /* ---------- the replay ---------- */
  function val(rd, ref, typed, ends) {
    if (ref === '?') return typed;
    if (ref.charAt(0) === 't') return rd.told[+ref.slice(1)];
    if (ref.charAt(0) === '=') return ends[ref.slice(1)] || 0;
    return 0;
  }
  function play(rd, typed) {
    var ends = { A: 0, B: 0, C: 0 }, frames = [], flags = [], greys = [], firstMiss = -1;
    typed = Math.max(0, Math.floor(+typed || 0));
    for (var i = 0; i < rd.s.length; i++) {
      var st = rd.s[i], L = st[0], op = st[1], from = ends[L];
      if (op === 'set' || op === 'add' || op === 'sub') {
        var v = val(rd, st[2], typed, ends), to = op === 'set' ? v : op === 'add' ? from + v : from - v;
        frames.push({ i: i, lane: L, op: op, from: op === 'set' ? 0 : from, to: to, by: v, ref: st[2], yours: st[2] === '?' });
        ends[L] = to;
      } else if (op === 'rep') {
        var n = val(rd, st[2], typed, ends), sz = val(rd, st[3], typed, ends), segs = [];
        for (var q = 0; q < Math.min(n, MAXREP); q++) segs.push([from + q * sz, from + (q + 1) * sz]);
        var end = from + n * sz;
        frames.push({ i: i, lane: L, op: 'rep', from: from, to: end, n: n, size: sz, segs: segs, ref: st[2] === '?' ? st[2] : st[3], yours: st[2] === '?' || st[3] === '?', yoursN: st[2] === '?', yoursS: st[3] === '?' });
        ends[L] = end;
      } else if (op === 'grey') {
        greys.push({ lane: L, at: ends[L], after: frames.length });
      } else if (op === 'flag') {
        var at = val(rd, st[2], typed, ends), hit = ends[L] === at;
        flags.push({ i: i, lane: L, at: at, end: ends[L], told: st[2].charAt(0) === 't', ref: st[2], hit: hit, after: frames.length });
        if (!hit && firstMiss < 0) firstMiss = flags.length - 1;
      }
    }
    return { frames: frames, flags: flags, greys: greys, ends: ends, firstMiss: firstMiss, ok: firstMiss < 0 };
  }
  /* the told flags that may stand on the track before any replay */
  function toldFlags(rd) {
    var out = [];
    for (var i = 0; i < rd.s.length; i++) if (rd.s[i][1] === 'flag' && rd.s[i][2].charAt(0) === 't') out.push({ lane: rd.s[i][0], at: rd.told[+rd.s[i][2].slice(1)], ref: rd.s[i][2] });
    return out;
  }
  /* the miss-2 help: the right replay backwards from the told end; the region where the
     child's number belongs is outlined — never labelled with its numeral */
  function rewind(rd) {
    var P = play(rd, answer(rd)), you = null, back = [];
    for (var i = P.frames.length - 1; i >= 0; i--) { if (P.frames[i].yours) you = P.frames[i]; else back.push(P.frames[i]); }
    return { back: back, region: you ? { lane: you.lane, from: you.op === 'rep' ? you.from : Math.min(you.from, you.to), to: you.op === 'rep' ? (you.yoursS ? you.from + you.size : you.to) : Math.max(you.from, you.to), op: you.op, n: you.n, size: you.size, yoursN: !!you.yoursN } : null, play: P };
  }

  /* ---------- the bond and the equation shown on success ---------- */
  function bond(rd) {
    var a = answer(rd);
    if (rd.type === 'two') return null;
    if (rd.type === 'mul') return { whole: a, parts: rep(rd.told[1], rd.told[0]) };
    if (rd.type === 'share') return { whole: rd.told[0], parts: rep(a, rd.told[1]) };
    if (rd.type === 'grp') return { whole: rd.told[0], parts: rep(rd.told[1], a) };
    var ns = rd.told.concat([a]).slice().sort(function (x, y) { return y - x; });
    return { whole: ns[0], parts: [ns[1], ns[2]] };
  }
  function rep(v, n) { var o = []; for (var i = 0; i < n; i++) o.push(v); return o; }
  /* the equation as tokens; times and divide signs follow the locale's school habit */
  var DOT = { de: 1, sv: 1, da: 1, no: 1, fi: 1 }, COLON = { de: 1, nl: 1, da: 1, no: 1, fi: 1, fr: 1, it: 1 }, SLASH = { sv: 1 };
  function equation(rd, loc) {
    var a = answer(rd);
    return rd.eq.replace('?', '[' + a + ']').replace(/\*/g, DOT[loc] ? ' · ' : ' × ').replace(/\//g, SLASH[loc] ? ' / ' : COLON[loc] ? ' : ' : ' ÷ ').replace(/\+/g, ' + ').replace(/-/g, ' − ').replace(/=/g, ' = ');
  }

  /* ---------- the hand ---------- */
  function newState(set, r) {
    var rd = rounds(set)[r];
    return { set: setOf(set), r: r, rd: rd, typed: '', misses: 0, help: false, last: null, done: false };
  }
  function type(st, d) {
    d = String(d);
    if (!/^\d$/.test(d)) return 'no';
    if (st.typed === '0') st.typed = '';
    if (st.typed.length >= 3) return 'full';
    st.typed += d; st.help = false; return 'typed';
  }
  function del(st) { if (!st.typed) return 'no'; st.typed = st.typed.slice(0, -1); st.help = false; return 'del'; }
  function replay(st) {
    if (st.typed === '') { st.last = { result: 'empty' }; return st.last; }
    var P = play(st.rd, +st.typed);
    if (st.done) { st.last = { result: 'free', play: P }; return st.last; }
    if (P.ok) { st.done = true; st.help = false; st.last = { result: 'ok', play: P }; return st.last; }
    st.misses++; st.help = st.misses >= 2;
    st.last = { result: 'miss', play: P, flag: P.flags[P.firstMiss] };
    return st.last;
  }
  /* literal keys only (the reachability gate reads them) */
  function hint(st) {
    var L = st.last; if (!L) return null;
    if (L.result === 'empty') return 'hEmpty';
    if (L.result !== 'miss') return null;
    if (st.help) return L.flag.told ? 'miss2' : 'miss2End';
    return L.flag.told ? 'miss1' : 'miss1End';
  }

  /* ---------- the order ---------- */
  /* the operation that solves a round (for the "never three in a row" rule and the bots) */
  function opOf(rd) {
    if (rd.type === 'mul') return '*';
    if (rd.type === 'share' || rd.type === 'grp') return '/';
    var e = rd.eq.split('='), l = e[0];
    if (e[1] === '?') return /-/.test(l) && !/\+/.test(l) ? '-' : (/\+/.test(l) && !/-/.test(l) ? '+' : 'mix');
    if (/\?\+|\+\?/.test(l)) return '-';
    if (/^\?-/.test(l)) return '+';
    return '-';
  }
  function okOrder(set, ord) {
    var rs = rounds(set);
    if (set === 'two') return true;
    for (var i = 1; i < ord.length; i++) if (rs[ord[i]].type === rs[ord[i - 1]].type) return false;
    for (var j = 2; j < ord.length; j++) if (opOf(rs[ord[j]]) === opOf(rs[ord[j - 1]]) && opOf(rs[ord[j]]) === opOf(rs[ord[j - 2]])) return false;
    return true;
  }
  /* a fresh order every pass: never two of one story type in a row, never three of one
     operation in a row, never the order of the pass before */
  function plan(set, rnd, prev) {
    rnd = rnd || Math.random;
    var n = rounds(set).length, best = null;
    for (var t = 0; t < 40000; t++) {
      var o = []; for (var i = 0; i < n; i++) o.push(i);
      for (var k = n - 1; k > 0; k--) { var j = Math.floor(rnd() * (k + 1)), x = o[k]; o[k] = o[j]; o[j] = x; }
      if (prev && prev.join() === o.join()) continue;
      if (okOrder(set, o)) { best = o; break; }
    }
    if (!best) { best = []; for (var m = 0; m < n; m++) best.push(m); }
    return { order: best };
  }

  var api = { R: R, SETS: SETS, TOP: TOP, MAXREP: MAXREP, setOf: setOf, rounds: rounds, top: top, answer: answer, evalExpr: evalExpr, play: play, toldFlags: toldFlags, rewind: rewind, bond: bond, equation: equation, newState: newState, type: type, del: del, replay: replay, hint: hint, opOf: opOf, okOrder: okOrder, plan: plan };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.ReplayTrackCore = api;
})(typeof window !== 'undefined' ? window : this);
