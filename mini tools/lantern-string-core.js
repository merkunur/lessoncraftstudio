/* =====================================================================
   lantern-string-core.js — the model of THE TWO-ENDED LANTERN STRING
   (activity #27 of the one-by-one rebuild, "Make the Number", K.OA.A.3).
   Design sheet: docs/activities-rebuild/designs/027-match-pairs.md
   ---------------------------------------------------------------------
   The target number is a string of exactly N bulbs. The first card plugged
   lights it from the LEFT socket, the second from the RIGHT: if the two
   lights meet exactly, the string glows (a + b = N); if they cross, the
   bulbs lit twice show by how many (a + b − N); if they fall short, the
   dark bulbs between them show the gap (N − a − b). Rounds: PAIR UP (a
   board holding every pair of the number once — or a set of them), MISSING
   (the given part plugged left; choose its partner from a tray of four in
   counting order) and WHOLE (two parts in the sockets and no string yet —
   the child chooses the string's length, and the same law judges it).
   Pure model, no DOM. Node-loadable (verify-lantern-string-core.js).
   ===================================================================== */
(function (global) {
  'use strict';

  var LEVELS_LIST = ['upto5', 'six9', 'ten'];
  /* the design's tables: pair {n, cards} · missing {n, given, tray} · whole {a, b} */
  var LEVELS = {
    upto5: [
      { kind: 'pair', n: 4, cards: [1, 3, 2, 2] },
      { kind: 'missing', n: 5, given: 2, tray: [2, 3, 4, 5] },
      { kind: 'pair', n: 5, cards: [1, 4, 2, 3] },
      { kind: 'whole', a: 1, b: 3 },
      { kind: 'missing', n: 4, given: 1, tray: [1, 2, 3, 4] },
      { kind: 'whole', a: 2, b: 3 },
      { kind: 'missing', n: 3, given: 2, tray: [1, 2, 3, 4] },
      { kind: 'missing', n: 5, given: 1, tray: [1, 2, 3, 4] }
    ],
    six9: [
      { kind: 'pair', n: 6, cards: [1, 5, 2, 4, 3, 3] },
      { kind: 'missing', n: 8, given: 5, tray: [2, 3, 4, 5] },
      { kind: 'pair', n: 7, cards: [1, 6, 2, 5, 3, 4] },
      { kind: 'whole', a: 4, b: 3 },
      { kind: 'pair', n: 8, cards: [1, 7, 2, 6, 3, 5, 4, 4] },
      { kind: 'missing', n: 9, given: 2, tray: [5, 6, 7, 8] },
      { kind: 'pair', n: 9, cards: [1, 8, 2, 7, 3, 6, 4, 5] },
      { kind: 'whole', a: 6, b: 3 },
      { kind: 'missing', n: 6, given: 4, tray: [2, 3, 4, 5] }
    ],
    ten: [
      { kind: 'pair', n: 10, cards: [1, 9, 2, 8, 3, 7, 4, 6, 5, 5] },
      { kind: 'missing', n: 10, given: 7, tray: [3, 4, 5, 6] },
      { kind: 'missing', n: 10, given: 4, tray: [5, 6, 7, 8] },
      { kind: 'pair', n: 10, cards: [1, 9, 3, 7] },
      { kind: 'missing', n: 10, given: 8, tray: [1, 2, 3, 4] },
      { kind: 'missing', n: 10, given: 1, tray: [6, 7, 8, 9] },
      { kind: 'pair', n: 10, cards: [2, 8, 4, 6, 5, 5] },
      { kind: 'missing', n: 10, given: 6, tray: [2, 3, 4, 5] },
      { kind: 'missing', n: 10, given: 5, tray: [2, 3, 4, 5] }
    ]
  };

  function level(name) { return LEVELS_LIST.indexOf(name) >= 0 ? name : 'upto5'; }
  function rounds(name) {
    var lv = level(name);
    return LEVELS[lv].map(function (x, i) {
      var r = { level: lv, index: i, kind: x.kind };
      if (x.kind === 'pair') { r.n = x.n; r.cards = x.cards.slice(); r.pairs = x.cards.length / 2; r.all = r.pairs === Math.floor(x.n / 2); }
      if (x.kind === 'missing') { r.n = x.n; r.given = x.given; r.tray = x.tray.slice(); r.answer = x.n - x.given; r.slot = x.tray.indexOf(x.n - x.given); }
      if (x.kind === 'whole') { r.a = x.a; r.b = x.b; r.n = x.a + x.b; r.answer = r.n; }
      r.id = lv + '.' + r.kind + '.' + r.n + '.' + i;
      return r;
    });
  }

  /* THE LAW: two lights from the two ends of a string of `len` bulbs */
  function light(a, b, len) {
    var s = a + b;
    if (s === len) return { result: 'meet', k: 0 };
    return s > len ? { result: 'cross', k: s - len } : { result: 'short', k: len - s };
  }
  /* bulb i (0-based) of a string of `len`: lit from the left by a, from the right by b */
  function bulbs(a, b, len) {
    var out = [];
    for (var i = 0; i < len; i++) {
      var L = i < a, R = i >= len - b;
      out.push(L && R ? 'twice' : L ? 'left' : R ? 'right' : 'dark');
    }
    return out;
  }

  /* ---------------- the order ----------------
     a pass opens on a PAIR UP board · no two WHOLE rounds side by side · never the same order
     twice · a pass never opens where the last one closed */
  function order(pool, rand, prev) {
    rand = rand || Math.random;
    var n = pool.length;
    if (n < 2) return pool.map(function (r, i) { return i; });
    var lastPrev = prev && prev.length ? prev[prev.length - 1] : -1;
    var used = [], seq = [];
    for (var u = 0; u < n; u++) used.push(false);
    var ok = (function dfs() {
      if (seq.length === n) return !(prev && prev.length === n && prev.join(',') === seq.join(','));
      var cands = [];
      for (var i = 0; i < n; i++) if (!used[i]) cands.push(i);
      for (var j = cands.length - 1; j > 0; j--) { var k = Math.floor(rand() * (j + 1)); var t = cands[j]; cands[j] = cands[k]; cands[k] = t; }
      for (var c = 0; c < cands.length; c++) {
        var x = cands[c], L = seq.length;
        if (L === 0 && (x === lastPrev || pool[x].kind !== 'pair')) continue;
        if (L > 0 && pool[x].kind === 'whole' && pool[seq[L - 1]].kind === 'whole') continue;
        used[x] = true; seq.push(x);
        if (dfs()) return true;
        used[x] = false; seq.pop();
      }
      return false;
    }());
    return ok ? seq : pool.map(function (r, i) { return i; });
  }

  /* the board grid: one row up to five cards, else two rows */
  function cols(count) { return count <= 5 ? count : Math.ceil(count / 2); }
  function adjacent(i, j, count) {
    var c = cols(count), ri = Math.floor(i / c), rj = Math.floor(j / c), ci = i % c, cj = j % c;
    return (ri === rj && Math.abs(ci - cj) === 1) || (ci === cj && Math.abs(ri - rj) === 1);
  }
  /* a shuffled board, never laid out in counting order */
  function layoutBoard(values, rand) {
    rand = rand || Math.random;
    for (var tries = 0; tries < 50; tries++) {
      var a = values.slice();
      for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rand() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
      var sorted = true;
      for (var k = 1; k < a.length; k++) if (a[k] < a[k - 1]) { sorted = false; break; }
      if (!sorted || a.length < 2) return a;
    }
    return values.slice().reverse();
  }

  /* ---------------- state ---------------- */
  function newState(r, rand) {
    var st = { id: r.id, level: r.level, kind: r.kind, n: r.n, cards: [], left: null, right: null, given: null, chosen: null, found: [], misses: 0, help: 0, last: null, done: false, explore: false };
    if (r.kind === 'pair') st.cards = layoutBoard(r.cards, rand).map(function (v, i) { return { id: 'c' + i, v: v, found: false }; });
    if (r.kind === 'missing') { st.given = r.given; st.cards = r.tray.map(function (v, i) { return { id: 't' + i, v: v, found: false }; }); }
    if (r.kind === 'whole') { st.a = r.a; st.b = r.b; st.n = r.n; }
    return st;
  }
  /* free play ("Lantern maker"): any string 2–10, cards 1–9, nothing judged */
  function newPlay(len) {
    var st = { id: 'play', level: 'play', kind: 'play', n: len || 7, cards: [], left: null, right: null, given: null, chosen: null, found: [], misses: 0, help: 0, last: null, done: false, explore: true };
    for (var v = 1; v <= 9; v++) st.cards.push({ id: 'p' + v, v: v, found: false });
    return st;
  }
  function setLength(st, len) { if (!st.explore) return false; st.n = Math.max(2, Math.min(10, len)); st.left = st.right = null; st.last = null; return true; }
  function card(st, id) { for (var i = 0; i < st.cards.length; i++) if (st.cards[i].id === id) return st.cards[i]; return null; }
  function moved(st) { st.help = 0; st.last = null; }
  /* the two values on the string now: [left, right] (null when a socket is empty) */
  function plugged(st) {
    if (st.kind === 'whole') return [st.a, st.b];
    var L = st.kind === 'missing' ? st.given : (st.left ? card(st, st.left).v : null);
    var R = st.right ? card(st, st.right).v : null;
    return [L, R];
  }
  /* the string's length: N, or in a WHOLE round the length the child chose (null = no string yet) */
  function length(st) { return st.kind === 'whole' ? st.chosen : st.n; }

  /* plug a card: PAIR UP / free play fill the left socket, then the right (the right one is
     judged at once); the same card again unplugs it. MISSING: a tray card goes in the right
     socket (another replaces it). */
  function plug(st, id) {
    if (st.done || st.kind === 'whole') return { act: 'locked' };
    var c = card(st, id);
    if (!c || c.found) return { act: 'locked' };
    if (st.kind === 'missing') {
      if (st.right === id) { st.right = null; moved(st); return { act: 'unplug' }; }
      st.right = id; moved(st); return { act: 'plug', side: 'R' };
    }
    if (st.left === id) { st.left = null; st.right = null; moved(st); return { act: 'unplug' }; }
    if (st.right === id) { st.right = null; moved(st); return { act: 'unplug' }; }
    if (!st.left) { st.left = id; moved(st); return { act: 'plug', side: 'L' }; }
    st.right = id; moved(st);
    if (st.explore) return { act: 'plug', side: 'R', test: light(card(st, st.left).v, c.v, st.n) };
    return { act: 'plug', side: 'R', test: judgePair(st) };
  }
  /* a PAIR UP pair: meet → both cards found (they hang on the garland); cross / short → a miss,
     both unplugged — after a second miss the first card stays plugged (its light stays on) */
  function judgePair(st) {
    var a = card(st, st.left).v, b = card(st, st.right).v, t = light(a, b, st.n);
    var res = { result: t.result, k: t.k, a: a, b: b };
    if (t.result === 'meet') {
      card(st, st.left).found = true; card(st, st.right).found = true;
      st.found.push([a, b]); st.left = null; st.right = null;
      st.misses = 0; st.help = 0;
      if (st.cards.every(function (c) { return c.found; })) { st.done = true; res.complete = true; }
    } else {
      st.misses++; st.help = Math.min(2, st.misses); res.miss = true;
      if (st.help < 2) st.left = null;
      st.right = null;
    }
    st.last = res;
    return res;
  }
  function unplug(st, side) { if (st.done) return false; if (side === 'L' && st.kind !== 'missing') { st.left = null; st.right = null; } else st.right = null; moved(st); return true; }
  /* WHOLE: the child chooses the string's length — the cord takes that many bulbs */
  function choose(st, v) { if (st.done || st.kind !== 'whole') return false; v = +v; if (!(v >= 2 && v <= 10)) return false; st.chosen = v; moved(st); return true; }

  /* "Light it" (Check) in MISSING and WHOLE */
  function check(st) {
    if (st.done || st.explore || st.kind === 'pair') return null;
    var res, p = plugged(st), len = length(st);
    if (st.kind === 'missing' && p[1] == null) res = { result: 'empty' };
    else if (st.kind === 'whole' && len == null) res = { result: 'empty' };
    else {
      var t = light(p[0], p[1], len);
      res = { result: t.result, k: t.k, a: p[0], b: p[1] };
      if (t.result === 'meet') { st.done = true; res.complete = true; st.found.push([p[0], p[1]]); }
      else { st.misses++; st.help = Math.min(2, st.misses); res.miss = true; }
    }
    st.last = res;
    return res;
  }

  /* the help: numerals on the doubled / dark bulbs (miss 1, the size of the error); a bracket over
     the dark bulbs the partner must fill (miss 2, PAIR UP / MISSING); a ghost string numbered
     1 … n−1 and "?" (miss 2, WHOLE — never the answer) */
  /* a light longer than the string runs past the far socket: coral past the right end, teal past the left */
  function over(a, b, len) { return { pastL: Math.max(0, (b || 0) - len), pastR: Math.max(0, (a || 0) - len) }; }
  /* the error numbers itself, left to right: teal past the left end, the doubled (or dark) bulbs, coral past the right end */
  function marksFor(a, b, len) {
    var t = light(a, b, len);
    if (t.result === 'meet') return null;
    var bs = bulbs(Math.min(a, len), Math.min(b, len), len), o = over(a, b, len), c = 0, m = { pastL: [], inside: [], pastR: [] };
    for (var i = 0; i < o.pastL; i++) m.pastL.push(++c);
    for (var j = 0; j < bs.length; j++) m.inside.push((t.result === 'cross' && bs[j] === 'twice') || (t.result === 'short' && bs[j] === 'dark') ? ++c : '');
    for (var q = 0; q < o.pastR; q++) m.pastR.push(++c);
    m.count = c;
    return m;
  }
  function errorMarks(st) {
    var L = st.last;
    if (!L || !L.miss) return null;
    return marksFor(L.a, L.b, st.kind === 'whole' ? st.chosen : st.n);
  }
  function bracket(st) {
    if (st.done || st.help < 2 || st.kind === 'whole') return null;
    var p = plugged(st);
    if (p[0] == null) return null;
    return { from: p[0], to: st.n, count: st.n - p[0] };
  }
  function ghost(st) {
    if (st.done || st.help < 2 || st.kind !== 'whole') return null;
    var out = [];
    for (var i = 0; i < st.n; i++) out.push(i === st.n - 1 ? '?' : i + 1);
    return out;
  }

  /* the note */
  function hint(st) {
    if (st.explore || st.done) return null;
    var L = st.last;
    if (!L) return null;
    if (L.result === 'empty') return { key: st.kind === 'whole' ? 'hintChoose' : 'hintPlug' };
    if (L.result === 'meet') return { key: 'pairDone', a: L.a, b: L.b, n: st.n, good: true };
    if (st.help >= 2) return { key: st.kind === 'whole' ? 'hintBulbs' : 'hintPartner', wrong: true };
    if (st.kind === 'whole') return { key: L.result === 'cross' ? (L.k === 1 ? 'hintWholeCross1' : 'hintWholeCross') : (L.k === 1 ? 'hintWholeShort1' : 'hintWholeShort'), k: L.k, wrong: true };
    if (L.result === 'cross') return { key: L.k === 1 ? 'hintCross1' : 'hintCross', k: L.k, wrong: true };
    return { key: L.k === 1 ? 'hintShort1' : 'hintShort', k: L.k, wrong: true };
  }
  function promptKey(r) { return r.kind === 'pair' ? (r.all ? 'promptPair' : 'promptBoard') : r.kind === 'missing' ? 'promptMissing' : 'promptWhole'; }
  function celebrateKey(r, lastOfPass) {
    if (lastOfPass) return 'celebratePass';
    if (r.kind === 'pair') return r.all ? 'celebrateAll' : 'celebrateBoard';
    return 'celebrateMake';
  }

  /* ---------------- layout ----------------
     wide (≥ 560): the string and the board on the left, the garland in a 196 px column; narrow:
     stacked, the garland as a strip. The string fits N bulbs (and the five-gap) in its width. */
  function layout(W, n) {
    var wide = W >= 640, L = { mode: wide ? 'wide' : 'narrow' };
    L.col = wide ? 196 : 0; L.gap = wide ? 12 : 8; L.left = wide ? W - L.col - L.gap : W;
    L.socket = wide ? 26 : 20;
    var five = n > 5 ? (wide ? 14 : 10) : 0, sp = wide ? 6 : 3;
    L.five = five; L.sp = sp;
    /* the string spans the whole stage, above the board and the garland */
    L.bulb = Math.max(18, Math.min(wide ? 44 : 34, Math.floor((W - 2 * L.socket - 16 - five - (n - 1) * sp) / n)));
    var cw = Math.max(52, Math.min(60, Math.floor((W - 32) / 5)));
    L.card = wide ? { w: 80, h: 92, font: 48 } : { w: cw, h: cw + 12, font: cw >= 56 ? 36 : 32 };
    L.key = wide ? 52 : 46;
    return L;
  }

  var api = {
    LEVELS_LIST: LEVELS_LIST, LEVELS: LEVELS, level: level, rounds: rounds, light: light, bulbs: bulbs, order: order,
    cols: cols, adjacent: adjacent, layoutBoard: layoutBoard, newState: newState, newPlay: newPlay, setLength: setLength,
    card: card, plugged: plugged, length: length, plug: plug, unplug: unplug, choose: choose, check: check,
    over: over, marksFor: marksFor, errorMarks: errorMarks, bracket: bracket, ghost: ghost, hint: hint, promptKey: promptKey, celebrateKey: celebrateKey, layout: layout
  };
  global.LanternStringCore = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
}(typeof window !== 'undefined' ? window : globalThis));
