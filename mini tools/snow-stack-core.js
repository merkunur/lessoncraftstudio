/* =====================================================================
   snow-stack-core.js — the model of THE SNOW-LID STACK (row 140,
   "Squirrel's Fair Winter Piles", 2.OA.C.4; G2-216/217 in Levels 2–3).
   Pure, no DOM. Design: docs/activities-rebuild/designs/140-winter-piles.md
   ---------------------------------------------------------------------
   Twigs cut an acorn tray between rows into piles; the piles are stacked
   one on top of another on a tree stump, and the snow lays one flat lid
   only on a fair stack (every pile the same size).
   Level 1: cut into fair piles (the nine kept round ids, each with ONE
   right cut), type how many in each pile. Level 2: each hole holds k —
   cut piles of k, type how many holes (quotitive). Level 3: share a heap
   into n holes one acorn at a time, type how many each (partitive).
   ===================================================================== */
(function (root) {
  'use strict';

  /* Level 1 — the nine kept ids; arrays re-specified so each has ONE right cut */
  var L1 = [
    { id: 'fair-2x3', r: 2, c: 3, n: 2, kind: 'open' },
    { id: 'fair-3x4', r: 3, c: 4, n: 3, kind: 'open' },
    { id: 'fair-4x4', r: 4, c: 4, n: 2, kind: 'n' },
    { id: 'make2-4x3', r: 6, c: 2, n: 3, kind: 'n' },
    { id: 'make2-4x2', r: 6, c: 3, n: 2, kind: 'n' },
    { id: 'fix-4x3', r: 4, c: 3, n: 2, kind: 'fix', preset: [1] },
    { id: 'fix-4x2', r: 6, c: 2, n: 3, kind: 'fix', preset: [1, 3] },
    { id: 'match-3x4', r: 6, c: 3, n: 3, kind: 'match' },
    { id: 'match-4x3', r: 4, c: 2, n: 4, kind: 'match' }
  ];
  /* Level 2 — How many holes? each hole holds k (never k = the answer: "holds 4 … 4 holes" is a tell) */
  var L2 = [
    { r: 4, c: 3, k: 6 }, { r: 6, c: 2, k: 4 }, { r: 5, c: 4, k: 4 }, { r: 6, c: 3, k: 9 },
    { r: 5, c: 2, k: 2 }, { r: 6, c: 4, k: 8 }, { r: 6, c: 5, k: 10 }, { r: 4, c: 5, k: 5 }
  ];
  /* Level 3 — Share the heap into n holes (never n = the share) */
  var L3 = [
    { total: 12, n: 3 }, { total: 10, n: 2 }, { total: 15, n: 5 }, { total: 12, n: 4 },
    { total: 16, n: 2 }, { total: 18, n: 3 }, { total: 14, n: 2 }, { total: 20, n: 5 }
  ];

  function levelOf(v) { return v === '2' || v === '3' ? v : '1'; }
  function eqOf(v) { return v === 'hidden' ? 'hidden' : 'shown'; }
  function rounds(level) { level = levelOf(level); return level === '1' ? L1 : level === '2' ? L2 : L3; }

  /* the right cut set (gaps after these rows) for a tray round */
  function rightCuts(level, rd) {
    var per = levelOf(level) === '2' ? rd.k / rd.c : rd.r / rd.n, out = [];
    for (var g = per; g < rd.r; g += per) out.push(g);
    return out;
  }
  /* the answer typed: L1 the size of one pile, L2 how many holes, L3 how many in each */
  function answer(level, rd) { level = levelOf(level); return level === '1' ? rd.r * rd.c / rd.n : level === '2' ? rd.r * rd.c / rd.k : rd.total / rd.n; }
  function totalOf(level, rd) { return levelOf(level) === '3' ? rd.total : rd.r * rd.c; }

  /* a scattered heap: seeded positions (0..1), never a tidy array */
  function heapSpots(rd, k) {
    var s = 97 + 31 * k + rd.total * 7, out = [];
    var rnd = function () { s = (s * 16807) % 2147483647; return s / 2147483647; };
    for (var i = 0; i < rd.total; i++) {
      var a = rnd() * Math.PI * 2, d = Math.sqrt(rnd()) * 0.92;
      out.push([0.5 + Math.cos(a) * d * 0.46, 0.55 + Math.sin(a) * d * 0.4]);
    }
    return out;
  }

  function newState(level, k) {
    level = levelOf(level);
    var rd = rounds(level)[k];
    var st = { level: level, k: k, rd: rd, cuts: (rd.preset || []).slice(), pockets: [], heap: 0, typed: '', stacked: false, misses: 0, help: false, last: null, done: false };
    if (level === '3') { for (var i = 0; i < rd.n; i++) st.pockets.push(0); st.heap = rd.total; }
    return st;
  }

  /* the piles: rows between twigs (tray levels) or the holes' acorns (Level 3) */
  function piles(st) {
    var out = [];
    if (st.level === '3') { st.pockets.forEach(function (p) { out.push({ rows: Math.ceil(p / 5) || 0, cols: Math.min(p, 5), size: p }); }); return out; }
    var cuts = st.cuts.slice().sort(function (a, b) { return a - b; }), prev = 0, c = st.rd.c;
    cuts.concat([st.rd.r]).forEach(function (g) { out.push({ rows: g - prev, cols: c, size: (g - prev) * c }); prev = g; });
    return out;
  }
  function sizes(st) { return piles(st).map(function (p) { return p.size; }); }
  function isFair(sz) { if (sz.length < 2 || sz[0] < 1) return false; for (var i = 1; i < sz.length; i++) if (sz[i] !== sz[0]) return false; return true; }

  function touch(st) { st.stacked = false; st.help = false; }
  function toggleCut(st, g) {
    if (st.done || st.level === '3' || g < 1 || g >= st.rd.r || g !== Math.floor(g)) return 'no';
    var i = st.cuts.indexOf(g);
    if (i >= 0) st.cuts.splice(i, 1); else { st.cuts.push(g); st.cuts.sort(function (a, b) { return a - b; }); }
    touch(st); return i >= 0 ? 'out' : 'in';
  }
  function deal(st, i) { if (st.done || st.level !== '3' || st.pockets[i] == null || st.heap < 1) return 'no'; st.pockets[i]++; st.heap--; touch(st); return 'dealt'; }
  function undeal(st, i) { if (st.done || st.level !== '3' || !st.pockets[i]) return 'no'; st.pockets[i]--; st.heap++; touch(st); return 'back'; }
  /* the stack: a test, never a commitment — any change slides it off again */
  function stack(st) {
    if (st.done) return 'no';
    if (nothingDone(st)) return 'no';
    st.stacked = true; return isFair(sizes(st)) ? 'flat' : 'slides';
  }
  function nothingDone(st) { return st.level === '3' ? st.pockets.every(function (p) { return p === 0; }) : st.cuts.length === 0; }

  /* one box, one digit (every answer is 2–9) */
  function type(st, d) { if (st.done || !/^[1-9]$/.test(String(d))) return 'no'; st.typed = String(d); st.help = false; return 'typed'; }
  function del(st) { if (st.done || !st.typed) return 'no'; st.typed = ''; st.help = false; return 'del'; }

  function miss(st, kind, extra) {
    st.misses++; st.help = st.misses >= 2; st.last = { result: kind };
    for (var k in (extra || {})) st.last[k] = extra[k];
    /* miss 2 in Level 3 on unequal holes: everything back to the heap, then one acorn to each hole */
    if (st.help && kind === 'unfair' && st.level === '3') { st.heap = st.rd.total - st.rd.n; for (var i = 0; i < st.pockets.length; i++) st.pockets[i] = 1; st.stacked = false; }
    return st.last;
  }
  function check(st) {
    if (st.done) return { result: 'done' };
    var rd = st.rd;
    if (nothingDone(st)) { st.last = { result: 'empty' }; return st.last; }
    st.stacked = true;
    var sz = sizes(st);
    if (st.level === '2') for (var i = 0; i < sz.length; i++) if (sz[i] !== rd.k) return miss(st, 'mould', { k: rd.k });
    if (!isFair(sz)) return miss(st, 'unfair', { sizes: sz });
    if (st.level === '1' && sz.length !== rd.n) return miss(st, 'wrongCount', { n: rd.n });
    if (st.level === '3' && st.heap > 0) return miss(st, 'heapLeft', { left: st.heap });
    if (st.typed === '') { st.last = { result: 'noTyped' }; return st.last; }
    if (+st.typed !== answer(st.level, rd)) return miss(st, 'read');
    st.done = true; st.help = false; st.last = { result: 'ok' }; return st.last;
  }
  /* literal keys only (the reachability gate reads them) */
  function hint(st) {
    var L = st.last; if (!L) return null;
    switch (L.result) {
      case 'empty': return st.level === '3' ? 'hDeal' : 'hCut';
      case 'noTyped': return st.level === '1' ? 'boxPile' : st.level === '2' ? 'boxHoles' : 'boxEach';
      case 'unfair': return st.level === '3' ? (st.help ? 'miss2Deal' : 'unfairDeal') : (st.help ? 'miss2Cut' : 'unfair');
      case 'mould': return st.help ? 'miss2Cut' : 'mould';
      case 'wrongCount': return st.help ? 'miss2Cut' : 'wrongCount';
      case 'heapLeft': return 'heapLeft';
      case 'read': return st.level === '1' ? 'readPile' : st.level === '2' ? 'readStack' : 'readEach';
    }
    return null;
  }

  /* ---------- the order ---------- */
  function shuffle(a, rnd) { a = a.slice(); for (var k = a.length - 1; k > 0; k--) { var j = Math.floor(rnd() * (k + 1)), x = a[k]; a[k] = a[j]; a[j] = x; } return a; }
  function plan(level, rnd, prev) {
    rnd = rnd || Math.random; var n = rounds(level).length, ids = []; for (var i = 0; i < n; i++) ids.push(i);
    for (var a = 0; a < 2000; a++) { var o = shuffle(ids, rnd); if (!prev || prev.join() !== o.join()) return { order: o }; }
    return { order: ids.slice().reverse() };
  }
  function band(W) { return { wide: W >= 560, cramp: W < 310 }; }

  var api = { L1: L1, L2: L2, L3: L3, levelOf: levelOf, eqOf: eqOf, rounds: rounds, rightCuts: rightCuts, answer: answer, totalOf: totalOf, heapSpots: heapSpots, newState: newState, piles: piles, sizes: sizes, isFair: isFair, toggleCut: toggleCut, deal: deal, undeal: undeal, stack: stack, type: type, del: del, check: check, hint: hint, plan: plan, band: band };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.SnowStackCore = api;
})(typeof window !== 'undefined' ? window : this);
