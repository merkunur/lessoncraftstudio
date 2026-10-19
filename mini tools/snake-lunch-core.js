/* =====================================================================
   snake-lunch-core.js — the model of THE SNAKE-GROOVE LUNCHBOX (activity
   #26 of the one-by-one rebuild, "Clunk's Lost Lunch", K.OA.A.3).
   Design sheet: docs/activities-rebuild/designs/026-clunks-lost-lunch.md
   ---------------------------------------------------------------------
   Clunk's lunchbox has a snake-shaped groove of exactly N cups. Snacks hang
   on a wall as STRANDS of k identical treats; a strand dropped in the box
   snakes into the next k cups. The lid only shuts when the groove is exactly
   full — too little leaves empty dimples, too much leaves a tail hanging
   over the rim. The feed lever is the only judge, and it is padlocked until
   the lid shuts. A lunch is the SET of strands (6 + 4 = 4 + 6), printed in
   Clunk's log biggest part first.

   Round kinds: any (two different lunches), two (two ways, asked from the
   start), half (one strand locked in — add the one that fills it), finish
   (a locked strand — finish with exactly two), exact (exactly k strands),
   only (a restricted wall), toofull (the box arrives over-full — take out),
   whatdid (two strands in an exact box — set the whole).
   Pure model, no DOM. Node-loadable (verify-snake-lunch-core.js).
   ===================================================================== */
(function (global) {
  'use strict';

  var LEVELS_LIST = ['upto5', 'six10', 'big'];
  var TREATS = [['fruits', 'strawberry'], ['fruits', 'blueberry'], ['fruits', 'raspberry'], ['desserts and sweets', 'muffin'], ['desserts and sweets', 'cookie'], ['desserts and sweets', 'donut'], ['desserts and sweets', 'cupcake']];

  /* the design's tables: { kind, n, wall, locked, box (toofull / whatdid), k (exact) } */
  var LEVELS = {
    upto5: [
      { kind: 'any', n: 5, wall: [1, 2, 3, 4] },
      { kind: 'two', n: 4, wall: [1, 2, 2, 3] },
      { kind: 'half', n: 5, locked: [3], wall: [1, 2, 4] },
      { kind: 'whatdid', box: [2, 3] },
      { kind: 'half', n: 4, locked: [1], wall: [2, 3, 4] },
      { kind: 'any', n: 3, wall: [1, 1, 1, 2] },
      { kind: 'whatdid', box: [1, 3] },
      { kind: 'toofull', n: 5, box: [2, 2, 3] }
    ],
    six10: [
      { kind: 'any', n: 10, wall: [2, 3, 4, 6, 7, 8] },
      { kind: 'two', n: 8, wall: [1, 2, 3, 5, 6] },
      { kind: 'half', n: 10, locked: [6], wall: [2, 3, 4] },
      { kind: 'finish', n: 10, locked: [6], wall: [1, 2, 2, 3, 4] },
      { kind: 'exact', n: 10, k: 3, wall: [2, 3, 3, 4, 4, 6] },
      { kind: 'only', n: 10, wall: [3, 3, 4, 6, 7] },
      { kind: 'toofull', n: 8, box: [2, 3, 4, 5] },
      { kind: 'half', n: 7, locked: [4], wall: [2, 3, 5, 6] },
      { kind: 'whatdid', box: [6, 3] }
    ],
    big: [
      { kind: 'any', n: 12, wall: [3, 4, 5, 7, 8, 9] },
      { kind: 'two', n: 14, wall: [4, 5, 6, 7, 7, 8, 9] },
      { kind: 'half', n: 12, locked: [7], wall: [3, 4, 5, 6] },
      { kind: 'whatdid', box: [8, 5] },
      { kind: 'exact', n: 12, k: 3, wall: [3, 4, 4, 5, 6, 8] },
      { kind: 'toofull', n: 11, box: [2, 3, 4, 6] },
      { kind: 'half', n: 13, locked: [9], wall: [2, 3, 4, 6] }
    ]
  };

  function level(name) { return LEVELS_LIST.indexOf(name) >= 0 ? name : 'six10'; }
  function sum(a) { var s = 0; for (var i = 0; i < a.length; i++) s += a[i]; return s; }
  function rounds(name) {
    var lv = level(name);
    return LEVELS[lv].map(function (x, i) {
      var r = { level: lv, index: i, kind: x.kind, wall: (x.wall || []).slice(), locked: (x.locked || []).slice(), box: (x.box || []).slice(), k: x.k || 0 };
      r.n = x.kind === 'whatdid' ? sum(x.box) : x.n;
      r.need = (x.kind === 'any' || x.kind === 'two') ? 2 : 1;
      r.treat = TREATS[i % TREATS.length];
      r.id = lv + '.' + r.kind + '.' + r.n + '.' + i;
      return r;
    });
  }
  /* a lunch = the multiset of strand lengths, biggest first */
  function wayKey(parts) { return parts.slice().sort(function (a, b) { return b - a; }).join('+'); }

  /* every valid lunch of a round (the core's own enumeration; the gate keeps its own) */
  function solutions(r) {
    var out = {}, wall = r.wall, n = r.n, lockedSum = sum(r.locked);
    if (r.kind === 'whatdid') { out[wayKey(r.box)] = r.box.slice(); return out; }
    var pool = r.kind === 'toofull' ? r.box : wall;
    var m = pool.length;
    for (var mask = 1; mask < (1 << m); mask++) {
      var pick = [];
      for (var i = 0; i < m; i++) if (mask & (1 << i)) pick.push(pool[i]);
      if (lockedSum + sum(pick) !== n) continue;
      if (r.kind === 'half' && pick.length !== 1) continue;
      if (r.kind === 'finish' && pick.length !== 2) continue;
      if (r.kind === 'exact' && pick.length !== r.k) continue;
      var parts = r.locked.concat(pick);
      out[wayKey(parts)] = parts;
    }
    return out;
  }

  /* ---------------- the order ----------------
     the first round of a pass is an ANY WAY round · no two TOO FULL / WHAT DID rounds side by
     side · never the same order twice · a pass never opens where the last one closed */
  function order(pool, rand, prev) {
    rand = rand || Math.random;
    var n = pool.length;
    if (n < 2) return pool.map(function (r, i) { return i; });
    var lastPrev = prev && prev.length ? prev[prev.length - 1] : -1;
    var used = [], seq = [];
    for (var u = 0; u < n; u++) used.push(false);
    var lonely = function (r) { return r.kind === 'toofull' || r.kind === 'whatdid'; };
    var ok = (function dfs() {
      if (seq.length === n) return !(prev && prev.length === n && prev.join(',') === seq.join(','));
      var cands = [];
      for (var i = 0; i < n; i++) if (!used[i]) cands.push(i);
      for (var j = cands.length - 1; j > 0; j--) { var k = Math.floor(rand() * (j + 1)); var t = cands[j]; cands[j] = cands[k]; cands[k] = t; }
      for (var c = 0; c < cands.length; c++) {
        var x = cands[c], L = seq.length;
        if (L === 0 && (x === lastPrev || pool[x].kind !== 'any')) continue;
        if (L > 0 && lonely(pool[x]) && pool[seq[L - 1]].kind === pool[x].kind) continue;
        used[x] = true; seq.push(x);
        if (dfs()) return true;
        used[x] = false; seq.pop();
      }
      return false;
    }());
    return ok ? seq : pool.map(function (r, i) { return i; });
  }

  /* a seeded shuffle of the wall's pegs (the right strand lands anywhere) */
  function shuffle(a, rand) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rand() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  /* ---------------- state ----------------
     strands: { id, k, at: 'wall'|'box', locked } · box order = the order strands snaked in */
  function newState(r, rand) {
    rand = rand || Math.random;
    var st = {
      id: r.id, level: r.level, kind: r.kind, n: r.n, k: r.k, need: r.need,
      strands: [], boxOrder: [], ways: [], cloud: null, misses: 0, help: 0, lidTries: 0, last: null,
      done: false, explore: false, seq: 0
    };
    var add = function (k, at, locked) { var s = { id: 's' + (st.seq++), k: k, at: at, locked: !!locked }; st.strands.push(s); if (at === 'box') st.boxOrder.push(s.id); return s; };
    r.locked.forEach(function (k) { add(k, 'box', true); });
    if (r.kind === 'toofull') r.box.forEach(function (k) { add(k, 'box', false); });
    if (r.kind === 'whatdid') r.box.forEach(function (k) { add(k, 'box', true); });
    shuffle(r.wall, rand).forEach(function (k) { add(k, 'wall', false); });
    return st;
  }
  /* free play ("Snack bar"): a box of 2–10, strands 1–9, no judging */
  function newPlay(n) {
    var st = { id: 'play', level: 'play', kind: 'play', n: n || 6, k: 0, need: 0, strands: [], boxOrder: [], ways: [], cloud: null, misses: 0, help: 0, lidTries: 0, last: null, done: false, explore: true, seq: 0 };
    for (var k = 1; k <= 9; k++) st.strands.push({ id: 's' + (st.seq++), k: k, at: 'wall', locked: false });
    return st;
  }
  function setSize(st, n) { if (!st.explore) return false; st.n = Math.max(2, Math.min(10, n)); clearBox(st); return true; }
  function clearBox(st) { st.strands.forEach(function (s) { if (!s.locked) s.at = 'wall'; }); st.boxOrder = st.boxOrder.filter(function (id) { return byId(st, id).locked; }); }
  function byId(st, id) { for (var i = 0; i < st.strands.length; i++) if (st.strands[i].id === id) return st.strands[i]; return null; }
  function inBox(st) { return st.boxOrder.map(function (id) { return byId(st, id); }); }
  function filled(st) { return sum(inBox(st).map(function (s) { return s.k; })); }
  function overflow(st) { return Math.max(0, filled(st) - st.n); }
  /* the lid: shut exactly full, a gap over empty cups, a bonk on a hanging tail */
  function lid(st) { var f = filled(st); return f === st.n ? 'shut' : f < st.n ? 'gap' : 'bonk'; }
  function moved(st) { st.help = 0; st.last = null; st.lidTries = 0; }

  /* drop a strand from the wall into the box: it snakes into the next cups */
  function drop(st, id) {
    if (st.done || st.kind === 'whatdid') return 'locked';
    var s = byId(st, id);
    if (!s || s.at !== 'wall') return 'refused';
    s.at = 'box'; st.boxOrder.push(id); moved(st);
    return lid(st);
  }
  /* take a strand out: it slithers back to the wall (locked strands stay) */
  function takeOut(st, id) {
    if (st.done) return 'locked';
    var s = byId(st, id);
    if (!s || s.at !== 'box') return 'refused';
    if (s.locked) return 'locked';
    s.at = 'wall'; st.boxOrder = st.boxOrder.filter(function (x) { return x !== id; }); moved(st);
    return lid(st);
  }
  /* a tap on the lid: no miss, just the gap / the bonk / the clack; three blind tries → count on */
  function tryLid(st) {
    if (st.done || st.explore) return lid(st);
    var l = lid(st);
    if (l !== 'shut') { st.lidTries++; if (st.lidTries >= 3) st.help = Math.max(st.help, 1); st.last = { ok: false, reason: l === 'gap' ? (filled(st) ? 'gap' : 'empty') : 'bonk', countOn: st.lidTries >= 3 }; }
    return l;
  }
  /* the cloud (WHAT DID): Clunk's number set by the child */
  function cloudRange(st) { return st.level === 'big' ? 14 : 10; }
  function setCloud(st, v) { if (st.done || st.kind !== 'whatdid') return false; v = +v; if (!(v >= 2 && v <= cloudRange(st))) return false; st.cloud = v; moved(st); return true; }

  /* the parts of the lunch in the box, biggest first (the log's order) */
  function parts(st) { return inBox(st).map(function (s) { return s.k; }).sort(function (a, b) { return b - a; }); }
  function added(st) { return inBox(st).filter(function (s) { return !s.locked; }); }

  /* the feed lever (= Check) */
  function feed(st) {
    if (st.done || st.explore) return null;
    var res, l = lid(st);
    if (st.kind === 'whatdid') {
      if (st.cloud == null) res = { ok: false, reason: 'unset' };
      else if (st.cloud !== st.n) res = miss(st, { reason: 'cloud' });
      else res = bank(st);
    } else if (!filled(st) || (l === 'gap' && !added(st).length && st.kind !== 'toofull')) res = { ok: false, reason: 'empty' };
    else if (l === 'gap') res = { ok: false, reason: 'gap' };
    else if (l === 'bonk') res = { ok: false, reason: 'bonk' };
    else if (st.kind === 'exact' && inBox(st).length !== st.k) res = miss(st, { reason: 'clips', k: st.k, have: inBox(st).length });
    else if (st.kind === 'finish' && added(st).length !== 2) res = miss(st, { reason: 'clips', k: 2, have: added(st).length });
    else if (st.kind === 'half' && added(st).length !== 1) res = miss(st, { reason: 'clips', k: 1, have: added(st).length });
    else if (st.ways.indexOf(wayKey(parts(st))) >= 0) res = miss(st, { reason: 'repeat', key: wayKey(parts(st)) });
    else res = bank(st);
    if (!res.ok && !res.miss && res.reason !== 'unset') { st.lidTries++; if (st.lidTries >= 3) st.help = Math.max(st.help, 1); res.countOn = st.lidTries >= 3; }
    st.last = res;
    return res;
  }
  function miss(st, r) { st.misses++; st.help = Math.min(2, st.misses); r.ok = false; r.miss = true; return r; }
  function bank(st) {
    var p = parts(st), key = wayKey(p);
    st.ways.push(key);
    var res = { ok: true, reason: 'banked', parts: p, n: st.n, key: key };
    st.misses = 0; st.help = 0; st.lidTries = 0;
    if (st.ways.length >= st.need) { st.done = true; res.complete = true; }
    else clearBox(st);
    return res;
  }

  /* help on the stage: count on (the empty cups numbered on from the filled ones), the strands
     that could still finish a NEW valid lunch (miss 2 — all of them, never one), WHAT DID numbers */
  function countOn(st) {
    if (st.done || st.explore || !st.last || !st.last.countOn) return [];
    var f = filled(st), out = [];
    for (var i = f; i < st.n; i++) out.push(i + 1);
    return out;
  }
  function helpful(st, r) {
    if (st.done || st.explore || st.help < 2 || !st.last || !st.last.miss || st.kind === 'whatdid') return [];
    var sols = solutions(r), out = {}, wallLeft = st.strands.filter(function (s) { return !s.locked; });
    Object.keys(sols).forEach(function (key) {
      if (st.ways.indexOf(key) >= 0) return;
      var need = sols[key].slice();
      st.strands.filter(function (s) { return s.locked; }).forEach(function (s) { var i = need.indexOf(s.k); if (i >= 0) need.splice(i, 1); });
      wallLeft.forEach(function (s) { var i = need.indexOf(s.k); if (i >= 0) { need.splice(i, 1); out[s.id] = true; } });
    });
    return Object.keys(out);
  }
  /* WHAT DID miss 2: the cups numbered 1 … n−1 and "?" on the last — never the answer */
  function cupChips(st) {
    var out = [];
    if (st.kind !== 'whatdid' || st.done || st.help < 2) return out;
    for (var i = 0; i < st.n; i++) out.push(i === st.n - 1 ? '?' : i + 1);
    return out;
  }

  /* the note */
  function hint(st) {
    if (st.explore || st.done) return null;
    var L = st.last;
    if (!L) return st.kind === 'any' && st.ways.length === 1 ? { key: 'promptAgain', n: st.n } : null;
    if (L.ok) return { key: L.parts.length === 3 ? 'yum3' : 'yum', n: st.n, a: L.parts[0], b: L.parts[1], c: L.parts[2], good: true, more: st.kind === 'any' && !st.done ? 'promptAgain' : null };
    if (L.countOn && (L.reason === 'gap' || L.reason === 'empty')) return { key: 'hintCountOn', n: st.n };
    if (L.reason === 'empty') return { key: 'hintStart' };
    if (L.reason === 'gap') return { key: 'hintGap' };
    if (L.reason === 'bonk') return { key: 'hintBonk' };
    if (L.reason === 'unset') return { key: 'hintCloud' };
    if (L.reason === 'clips') return { key: st.help >= 2 ? 'hintCould' : (L.k === 1 ? 'hintOne' : 'hintExactly'), k: L.k, wrong: true };
    if (L.reason === 'repeat') return { key: st.help >= 2 ? 'hintCould' : 'hintRepeat', wrong: true };
    if (L.reason === 'cloud') return { key: st.help >= 2 ? 'hintNumbers' : 'hintCountCups', wrong: true };
    return null;
  }
  function celebrateKey(r, lastOfPass) {
    if (lastOfPass) return 'celebratePass';
    if (r.kind === 'any' || r.kind === 'two') return 'celebrateTwo';
    if (r.kind === 'whatdid') return 'celebrateWhat';
    if (r.kind === 'toofull') return 'celebrateJust';
    return 'celebrateFed';
  }
  function promptKey(r) { return { any: 'promptAny', two: 'promptTwo', half: 'promptHalf', finish: 'promptFinish', exact: 'promptExact', only: 'promptOnly', toofull: 'promptTooFull', whatdid: 'promptWhat' }[r.kind]; }

  /* the cups: a snake of rows of five — row 1 left → right, the hairpin, row 2 right → left … */
  function cupPos(i) { var row = Math.floor(i / 5), c = i % 5; return { row: row, col: row % 2 ? 4 - c : c }; }
  /* which strand fills each cup (by box order), and what hangs over the rim */
  function cups(st) {
    var out = [], ord = inBox(st);
    for (var a = 0; a < ord.length; a++) for (var j = 0; j < ord[a].k; j++) out.push({ strand: ord[a].id, slot: a, locked: ord[a].locked });
    return { inside: out.slice(0, st.n), over: out.slice(st.n) };
  }

  /* ---------------- layout ----------------
     wide (≥ 560): the wall and the box in a left column, Clunk / the lever / the log in a
     right column; cups ≥ 96 so a treat is a full 96 px picture. narrow: Clunk's row on top,
     the box edge to edge (cups 64 at the 360 phone). */
  function layout(W) {
    var wide = W >= 560, L = { mode: wide ? 'wide' : 'narrow' };
    if (wide) {
      L.right = 120; L.gap = 12; L.left = W - L.right - L.gap;
      L.cupGap = 4; L.cup = Math.min(110, Math.floor((L.left - 16 - 4 * L.cupGap) / 5));
      L.face = 96; L.coil = Math.min(124, Math.floor((L.left - 3 * 8) / 4)); L.robot = 100; L.lever = 64; L.key = 48;
    } else {
      L.right = 0; L.gap = 8; L.left = W;
      L.cupGap = 2; L.cup = Math.min(76, Math.floor((W - 4 * L.cupGap) / 5));
      L.face = W >= 326 ? 64 : 56; L.coil = Math.floor((W - 3 * 6) / 4); L.robot = W >= 326 ? 64 : 56; L.lever = 52; L.key = 46;
    }
    L.pic = L.cup;
    return L;
  }

  var api = {
    LEVELS_LIST: LEVELS_LIST, LEVELS: LEVELS, TREATS: TREATS,
    level: level, rounds: rounds, sum: sum, wayKey: wayKey, solutions: solutions, order: order, shuffle: shuffle,
    newState: newState, newPlay: newPlay, setSize: setSize, byId: byId, inBox: inBox, filled: filled, overflow: overflow,
    lid: lid, drop: drop, takeOut: takeOut, tryLid: tryLid, cloudRange: cloudRange, setCloud: setCloud, parts: parts,
    feed: feed, countOn: countOn, helpful: helpful, cupChips: cupChips, hint: hint, celebrateKey: celebrateKey,
    promptKey: promptKey, cupPos: cupPos, cups: cups, layout: layout
  };
  global.SnakeLunchCore = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
}(typeof window !== 'undefined' ? window : globalThis));
