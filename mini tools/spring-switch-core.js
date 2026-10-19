/* =====================================================================
   spring-switch-core.js — the model of THE SPRING SWITCH (activity #25 of
   the one-by-one rebuild, "Chuffer's Switchyard", K.OA.A.3).
   Design sheet: docs/activities-rebuild/designs/025-chuffer.md
   ---------------------------------------------------------------------
   A load of N crates waits in the hill wagon. The release lever lets them
   roll one at a time; each crate goes into whichever car the SWITCH faces
   when it crosses the fork — so a split is a moment of throwing the switch.
   The child reads each car on a number-bond plate (whole over two parts)
   and pulls the coupler: a true, new split is banked into the route book's
   staircase. Rounds: ALL WAYS (every split of N), SEALED (one car holds k
   under a tarp — send the missing part; the wagon holds 10 so its size
   tells nothing), BACK UP (two loaded cars roll back into one wagon — set
   the whole). Make ten: nine sealed rounds that build the staircase of 10.

   Invariant: hill + left + right (+ the sealed crates) is the load, always.
   Pure model, no DOM. Node-loadable (verify-spring-switch-core.js).
   ===================================================================== */
(function (global) {
  'use strict';

  var LEVELS_LIST = ['upto5', 'six9', 'ten'];
  var CAR = 10;              /* slots per car: a ten-frame */
  var WAGON = 10;            /* the hill wagon holds at most ten */

  /* [kind, n, a, b, side] — all: the load n · sealed: n = a + b, side = the SEALED car (k = the
     sealed car's count) · backup: the cars hold a and b, the whole is a + b.
     all with a = 4 → "find four ways" (8 has seven) */
  var LEVELS = {
    upto5: [['all', 3], ['all', 4], ['sealed', 5, 2, 3, 'L'], ['backup', 5, 2, 3], ['all', 5], ['sealed', 4, 1, 3, 'R'], ['backup', 4, 1, 3], ['sealed', 5, 1, 4, 'L'], ['backup', 3, 2, 1]],
    six9:  [['all', 6], ['sealed', 7, 3, 4, 'L'], ['backup', 7, 4, 3], ['sealed', 8, 3, 5, 'R'], ['all', 7], ['backup', 9, 5, 4], ['sealed', 9, 7, 2, 'L'], ['backup', 8, 6, 2], ['all', 8, 4]],
    ten:   [['sealed', 10, 3, 7, 'L'], ['sealed', 10, 4, 6, 'R'], ['sealed', 10, 5, 5, 'L'], ['sealed', 10, 2, 8, 'R'], ['sealed', 10, 1, 9, 'L'], ['sealed', 10, 8, 2, 'R'], ['sealed', 10, 7, 3, 'L'], ['sealed', 10, 6, 4, 'R'], ['sealed', 10, 9, 1, 'L']]
  };

  function level(name) { return LEVELS_LIST.indexOf(name) >= 0 ? name : 'upto5'; }
  function rounds(name) {
    var lv = level(name);
    return LEVELS[lv].map(function (x, i) {
      var r = { level: lv, index: i, kind: x[0], n: x[1] };
      if (r.kind === 'all') { r.need = x[2] || (r.n - 1); r.id = lv + '.all.' + r.n; }
      else { r.a = x[2]; r.b = x[3]; r.id = lv + '.' + r.kind + '.' + r.a + '-' + r.b; }
      if (r.kind === 'sealed') { r.side = x[4]; r.k = r.side === 'L' ? r.a : r.b; r.missing = r.n - r.k; }
      return r;
    });
  }
  /* the answer a round is about: the missing part (sealed), the whole (backup), the ways (all) */
  function answerOf(r) { return r.kind === 'sealed' ? r.missing : r.kind === 'backup' ? r.a + r.b : r.need; }

  /* ---------------- the order: order-only reshuffle ----------------
     the first round of a pass is an ALL WAYS round (the switch is the hook) — except Make ten ·
     never three of one kind in a row · Make ten: never three sealed on one side in a row ·
     never the same order twice · a pass never opens where the last one closed */
  function tag(r) { return r.kind === 'sealed' && r.level === 'ten' ? r.side : r.kind; }
  function order(pool, rand, prev) {
    rand = rand || Math.random;
    var n = pool.length;
    if (n < 2) return pool.map(function (r, i) { return i; });
    var lastPrev = prev && prev.length ? prev[prev.length - 1] : -1;
    var used = [], seq = [];
    for (var u = 0; u < n; u++) used.push(false);
    var hasAll = pool.some(function (r) { return r.kind === 'all'; });
    var ok = (function dfs() {
      if (seq.length === n) return !(prev && prev.length === n && prev.join(',') === seq.join(','));
      var cands = [];
      for (var i = 0; i < n; i++) if (!used[i]) cands.push(i);
      for (var j = cands.length - 1; j > 0; j--) { var k = Math.floor(rand() * (j + 1)); var t = cands[j]; cands[j] = cands[k]; cands[k] = t; }
      for (var c = 0; c < cands.length; c++) {
        var x = cands[c], L = seq.length;
        if (L === 0 && x === lastPrev) continue;
        if (L === 0 && hasAll && pool[x].kind !== 'all') continue;
        if (L > 1 && tag(pool[seq[L - 1]]) === tag(pool[x]) && tag(pool[seq[L - 2]]) === tag(pool[x])) continue;
        used[x] = true; seq.push(x);
        if (dfs()) return true;
        used[x] = false; seq.pop();
      }
      return false;
    }());
    return ok ? seq : pool.map(function (r, i) { return i; });
  }

  /* ---------------- state ---------------- */
  function newState(r, tenBook) {
    var st = {
      id: r.id, level: r.level, kind: r.kind, n: r.n, need: r.need || 0,
      hill: 0, L: 0, R: 0, sw: 'L', sealed: null,
      plate: { w: null, a: null, b: null }, found: [], lastBanked: null,
      misses: 0, help: 0, last: null, done: false, backed: false, explore: false,
      tenBook: tenBook || null
    };
    if (r.kind === 'all') { st.hill = r.n; st.plate.w = r.n; }
    if (r.kind === 'sealed') {
      st.sealed = { side: r.side, k: r.k };
      st.hill = WAGON;
      st.sw = r.side === 'L' ? 'R' : 'L';
      st.plate.w = r.n;
      if (r.side === 'L') st.plate.a = r.k; else st.plate.b = r.k;
    }
    if (r.kind === 'backup') { st.L = r.a; st.R = r.b; st.plate.a = r.a; st.plate.b = r.b; st.a = r.a; st.b = r.b; }
    return st;
  }
  /* free play ("Shunting yard"): any load 2–10, everything open, the plate reads itself */
  function newPlay(n) { var st = newState({ id: 'play', level: 'play', kind: 'all', n: n || 5, need: 0 }); st.explore = true; st.kind = 'play'; return st; }
  function setLoad(st, n) { if (!st.explore) return false; n = Math.max(2, Math.min(10, n)); st.n = n; st.hill = n; st.L = 0; st.R = 0; st.plate.w = n; return true; }

  /* the open car: in a sealed round only the side without the tarp */
  function openSide(st) { return st.sealed ? (st.sealed.side === 'L' ? 'R' : 'L') : null; }
  function carCount(st, side) { return side === 'L' ? st.L : st.R; }
  function total(st) { return st.hill + st.L + st.R; }
  function moved(st) { st.help = 0; st.last = null; }

  /* one crate rolls down and goes to the side the switch faces as it crosses the fork */
  function release(st) {
    if (st.done || st.kind === 'backup') return 'locked';
    if (st.hill <= 0) return 'empty';
    var side = st.sealed ? openSide(st) : st.sw;
    if (carCount(st, side) >= CAR) return 'full';
    st.hill--;
    if (side === 'L') st.L++; else st.R++;
    if (!st.explore) moved(st);
    return side;
  }
  /* the switch: locked to the open car in a sealed round */
  function flick(st, side) {
    if (st.done || st.sealed || st.kind === 'backup') return false;
    var to = side === 'L' || side === 'R' ? side : (st.sw === 'L' ? 'R' : 'L');
    if (to === st.sw) return false;
    st.sw = to;
    return true;
  }
  /* back up: every crate in the open cars rolls home into the wagon (the whole is unchanged) */
  function backUp(st) {
    if (st.done) return false;
    if (st.kind === 'backup') { if (st.backed) return false; st.hill = st.L + st.R; st.L = 0; st.R = 0; st.backed = true; moved(st); return true; }
    if (!st.L && !st.R) return false;
    st.hill += st.L + st.R; st.L = 0; st.R = 0;
    if (st.sealed) { if (st.sealed.side === 'L') st.L = 0; else st.R = 0; }
    moved(st);
    return true;
  }
  /* which plate circles are dials this round */
  function dials(st) {
    if (st.explore) return [];
    if (st.kind === 'all') return ['a', 'b'];
    if (st.kind === 'sealed') return [openSide(st) === 'L' ? 'a' : 'b'];
    return ['w'];
  }
  function dialRange(st, box) { return box === 'w' ? 10 : (st.kind === 'all' ? st.n - 1 : 9); }
  function setPlate(st, box, v) {
    if (st.done || dials(st).indexOf(box) < 0) return false;
    v = +v;
    if (!(v >= 1 && v <= dialRange(st, box))) return false;
    st.plate[box] = v; moved(st);
    return true;
  }
  /* the mirror: the last banked pair, the cars turned round (only from an empty yard, only a new pair) */
  function canMirror(st) {
    if (st.done || st.kind !== 'all' || st.explore || !st.lastBanked) return false;
    var m = st.lastBanked;
    return m.a !== m.b && st.found.indexOf(m.b + '+' + m.a) < 0 && st.L === 0 && st.R === 0 && st.hill === st.n;
  }
  function mirror(st) {
    if (!canMirror(st)) return false;
    var m = st.lastBanked;
    st.hill = 0; st.L = m.b; st.R = m.a; moved(st);
    return true;
  }

  /* the coupler (= Check) */
  function couple(st) {
    if (st.done || st.explore) return null;
    var res;
    if (st.kind === 'all') {
      if (!st.L && !st.R) res = { ok: false, reason: 'empty' };
      else if (!st.L || !st.R) res = { ok: false, reason: 'oneEmpty', side: st.L ? 'R' : 'L' };
      else if (st.hill > 0) res = { ok: false, reason: 'hill' };
      else if (st.plate.a == null || st.plate.b == null) res = { ok: false, reason: 'unset' };
      else if (st.plate.a !== st.L) res = miss(st, { reason: 'wrongL', side: 'L' });
      else if (st.plate.b !== st.R) res = miss(st, { reason: 'wrongR', side: 'R' });
      else {
        var key = st.L + '+' + st.R;
        if (st.found.indexOf(key) >= 0) { res = { ok: false, reason: 'repeat', key: key }; backUp(st); clearParts(st); }
        else {
          st.found.push(key); st.lastBanked = { a: st.L, b: st.R };
          res = { ok: true, reason: 'banked', a: st.L, b: st.R };
          backUp(st); clearParts(st); st.misses = 0; st.help = 0;
          if (st.found.length >= st.need) { st.done = true; res.complete = true; }
        }
      }
    } else if (st.kind === 'sealed') {
      var side = openSide(st), open = carCount(st, side), want = st.n - st.sealed.k, box = side === 'L' ? 'a' : 'b';
      if (!open) res = { ok: false, reason: 'empty' };
      else if (open !== want) res = miss(st, { reason: 'sealedWrong', side: side, more: open < want });
      else if (st.plate[box] == null) res = { ok: false, reason: 'unset' };
      else if (st.plate[box] !== open) res = miss(st, { reason: side === 'L' ? 'wrongL' : 'wrongR', side: side });
      else {
        var a = side === 'L' ? open : st.sealed.k, b = side === 'L' ? st.sealed.k : open;
        res = { ok: true, reason: 'banked', a: a, b: b, complete: true }; st.done = true;
        if (st.tenBook && st.tenBook.indexOf(a + '+' + b) < 0) st.tenBook.push(a + '+' + b);
      }
    } else {
      if (!st.backed) res = { ok: false, reason: 'backFirst' };
      else if (st.plate.w == null) res = { ok: false, reason: 'unset' };
      else if (st.plate.w !== st.a + st.b) res = miss(st, { reason: 'wrongWhole' });
      else { res = { ok: true, reason: 'banked', a: st.a, b: st.b, complete: true }; st.done = true; }
    }
    st.last = res;
    return res;
  }
  function miss(st, r) { st.misses++; st.help = Math.min(2, st.misses); r.ok = false; r.miss = true; return r; }
  function clearParts(st) { if (st.kind === 'all') { st.plate.a = null; st.plate.b = null; } }

  /* the route book: N − 1 rows (all) or the nine bonds of ten (Make ten), each "a+b" found or not */
  function book(st) {
    if (st.explore) return null;
    if (st.level === 'ten') { var rows = []; for (var a = 1; a <= 9; a++) rows.push({ a: a, b: 10 - a, found: !!(st.tenBook && st.tenBook.indexOf(a + '+' + (10 - a)) >= 0) }); return rows; }
    if (st.kind !== 'all') return null;
    var out = [];
    for (var i = 1; i < st.n; i++) out.push({ a: i, b: st.n - i, found: st.found.indexOf(i + '+' + (st.n - i)) >= 0 });
    return out;
  }
  function waysLeft(st) { return st.kind === 'all' ? Math.max(0, st.need - st.found.length) : 0; }

  /* the note */
  function hint(st) {
    if (st.explore || st.done) return null;
    var L = st.last;
    if (L && L.reason === 'banked') return { key: 'banked', a: L.a, b: L.b, n: st.n };
    if (L && L.reason === 'repeat') return { key: 'hintRepeat' };
    if (L && L.reason === 'empty') return { key: st.kind === 'sealed' ? 'hintSealedStart' : 'hintStart' };
    if (L && L.reason === 'oneEmpty') return { key: 'hintOneEmpty' };
    if (L && L.reason === 'hill') return { key: 'hintHill' };
    if (L && L.reason === 'unset') return { key: 'hintUnset' };
    if (L && L.reason === 'backFirst') return { key: 'hintBackFirst' };
    if (st.help >= 1 && L) {
      if (L.reason === 'wrongL' || L.reason === 'wrongR') return { key: st.help >= 2 ? (L.side === 'L' ? 'hintHasL' : 'hintHasR') : (L.side === 'L' ? 'hintCountL' : 'hintCountR'), wrong: true };
      if (L.reason === 'sealedWrong') return { key: st.help >= 2 ? 'hintCountOn' : 'hintTogether', k: st.sealed.k, n: st.n, wrong: true };
      if (L.reason === 'wrongWhole') return { key: st.help >= 2 ? 'hintNumbers' : 'hintCountAll', wrong: true };
    }
    return null;
  }
  /* numerals on the crates the help counts: miss 2 → 1 … m−1 and "?" on the last (never the answer).
     what: 'L' / 'R' (a car), 'hill' (the wagon in a backup round). Sealed: counting on from k. */
  function chips(st) {
    var out = { L: [], R: [], hill: [], slots: [] };
    if (st.explore || st.done || st.help < 2 || !st.last) return out;
    var L = st.last, i;
    if (L.reason === 'wrongL' || L.reason === 'wrongR') { var m = carCount(st, L.side); for (i = 0; i < m; i++) out[L.side].push(i === m - 1 ? '?' : i + 1); }
    if (L.reason === 'wrongWhole') { for (i = 0; i < st.hill; i++) out.hill.push(i === st.hill - 1 ? '?' : i + 1); }
    if (L.reason === 'sealedWrong') { for (i = 0; i < st.n - st.sealed.k; i++) out.slots.push(st.sealed.k + i + 1); }
    return out;
  }
  function celebrateKey(r) {
    if (r.kind === 'all') return r.need < r.n - 1 ? 'celebrateSome' : 'celebrateAll';
    return 'celebrateMake';
  }
  function playLine(st) { return { n: st.n, a: st.L, b: st.R, hill: st.hill }; }

  /* ---------------- layout ----------------
     wide (≥ 560): the yard and a 196 px plate column side by side; narrow: stacked, the plate
     and the route book side by side under the yard. c = a crate slot. */
  function layout(W) {
    var wide = W >= 560, L = { mode: wide ? 'wide' : 'narrow' };
    if (wide) {
      L.col = 196; L.gap = 12; L.yard = W - L.col - L.gap;
      L.c = Math.max(26, Math.min(34, Math.floor((L.yard - 112) / 10)));
      L.train = 96; L.lever = 64; L.coupler = 56; L.whole = 64; L.part = 56; L.key = 52;
    } else {
      L.col = 0; L.gap = 8; L.yard = W;
      L.c = Math.max(18, Math.min(26, Math.floor((W - 96) / 10)));
      L.train = 64; L.lever = 52; L.coupler = 44; L.whole = 56; L.part = 50; L.key = W < 340 ? 44 : 48;
    }
    L.carW = 5 * L.c + 16; L.carH = 2 * L.c + 16;
    return L;
  }

  var api = {
    LEVELS_LIST: LEVELS_LIST, LEVELS: LEVELS, CAR: CAR, WAGON: WAGON,
    level: level, rounds: rounds, answerOf: answerOf, order: order,
    newState: newState, newPlay: newPlay, setLoad: setLoad, openSide: openSide, carCount: carCount, total: total,
    release: release, flick: flick, backUp: backUp, dials: dials, dialRange: dialRange, setPlate: setPlate,
    canMirror: canMirror, mirror: mirror, couple: couple, book: book, waysLeft: waysLeft,
    hint: hint, chips: chips, celebrateKey: celebrateKey, playLine: playLine, layout: layout
  };
  global.SpringSwitchCore = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
}(typeof window !== 'undefined' ? window : globalThis));
