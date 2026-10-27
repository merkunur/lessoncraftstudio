/* =====================================================================
   chimney-roof-core.js — the model of THE CHIMNEY ROOF (row 137, "Even or
   Odd?", 2.OA.C.3). Pure, no DOM.
   Design: docs/activities-rebuild/designs/137-choice-board.md
   ---------------------------------------------------------------------
   A number is poured, brick by brick, into a tower two bricks wide: every
   brick rolls into the LOWER column (a tie goes left), so the columns are
   ceil(p/2) and floor(p/2). A flat top takes the flat roof (even); a lone
   brick sticking up needs the chimney roof (odd). A roof that does not
   fit falls off and is a miss. Then the child writes the two equal
   columns: n = a + a (+ 1 with the chimney). To 99: the tens arrive as
   finished slabs (five pairs each — always flat), four bags on a shelf
   are roofed BEFORE their ones are poured.
   ===================================================================== */
(function (root) {
  'use strict';

  var R10 = [2, 3, 4, 5, 6, 7, 8, 9, 10];
  var R20 = [11, 12, 13, 14, 15, 16, 17, 19, 20];
  var R99 = [[50, 49, 42, 93], [99, 81, 44, 83], [88, 84, 91, 30], [52, 75, 47, 56], [78, 20, 65, 36], [69, 58, 87, 35], [59, 38, 71, 46], [34, 43, 40, 27], [37, 85, 86, 82]];

  function numOf(v) { return v === '10' || v === '99' ? v : '20'; }
  function roofModeOf(v, num) { return numOf(num) === '99' ? 'before' : (v === 'before' ? 'before' : 'after'); }
  function rounds(num) { num = numOf(num); return num === '10' ? R10 : num === '20' ? R20 : R99; }
  function even(n) { return n % 2 === 0; }
  /* the tower after p bricks: the left column takes the odd one */
  function columns(p) { return { L: Math.ceil(p / 2), R: Math.floor(p / 2) }; }
  /* a big number: its tens as slabs (5 pairs each), its ones poured */
  function split(n) { return { slabs: Math.floor(n / 10), ones: n % 10 }; }
  function towerOf(n, poured) { var s = split(n), c = columns(poured); return { slabs: s.slabs, L: s.slabs * 5 + c.L, R: s.slabs * 5 + c.R, loose: c }; }
  function fits(n, kind) { return even(n) === (kind === 'flat'); }

  function newState(num, mode, r, opt) {
    num = numOf(num); mode = roofModeOf(mode, num); opt = opt || {};
    var st = { num: num, mode: mode, r: r, side: opt.side || 'flatLeft', misses: 0, eqMisses: 0, help: false, eqHelp: false, last: null, done: false };
    if (num === '99') {
      st.bags = rounds(num)[r].map(function (n) { return { n: n, roof: null, landed: false, poured: false }; });
      st.sel = null;
    } else {
      st.n = rounds(num)[r]; st.poured = 0; st.roof = null; st.hover = null; st.eq = ['', '']; st.focus = 0; st.phase = 'pour';
    }
    return st;
  }

  /* ---------- to 10 / to 20: one tower ---------- */
  function pour(st) {
    if (st.num === '99' || st.done || st.roof) return 'no';
    if (st.poured >= st.n) return 'full';
    st.poured++; st.help = false;
    var side = st.poured % 2 === 1 ? 'L' : 'R';
    if (st.poured === st.n) {
      if (st.mode === 'before' && st.hover) { var res = land(st, st.hover); return res; }
      st.phase = 'roof';
    }
    return side;
  }
  /* a brick sent back rises into the bag (only before a roof lands) */
  function unpour(st) { if (st.num === '99' || st.roof || st.poured <= 0 || st.done) return 'no'; st.poured--; st.phase = 'pour'; return 'back'; }
  /* a roof chosen: after the tower it lands at once (the verdict); before the tower it hovers */
  function roof(st, kind) {
    if (st.num === '99' || st.done || st.roof) return { result: 'no' };
    if (kind !== 'flat' && kind !== 'chimney') return { result: 'no' };
    if (st.poured < st.n) {
      if (st.mode === 'before') { st.hover = kind; st.help = false; return { result: 'hover' }; }
      st.last = { result: 'notPoured' }; return st.last;
    }
    return land(st, kind);
  }
  function land(st, kind) {
    if (fits(st.n, kind)) { st.roof = kind; st.hover = null; st.help = false; st.phase = 'eq'; st.last = { result: 'fits', kind: kind }; return st.last; }
    st.misses++; st.help = st.misses >= 2; st.hover = null; st.phase = 'roof';
    st.last = { result: 'fell', kind: kind }; return st.last;
  }
  function focus(st, i) { if (st.phase !== 'eq') return 'no'; st.focus = i === 1 ? 1 : 0; return 'focus'; }
  function typeEq(st, d) {
    if (st.phase !== 'eq' || st.done || !/^\d$/.test(String(d))) return 'no';
    var b = st.eq[st.focus];
    if (b === '0') b = '';
    if (b.length >= 2) return 'full';
    st.eq[st.focus] = b + d; st.eqHelp = false;
    if (st.focus === 0 && st.eq[0].length >= (st.n >= 20 ? 2 : 1)) st.focus = 1;
    return 'typed';
  }
  function delEq(st) {
    if (st.phase !== 'eq' || st.done) return 'no';
    if (!st.eq[st.focus] && st.focus === 1) st.focus = 0;
    if (!st.eq[st.focus]) return 'no';
    st.eq[st.focus] = st.eq[st.focus].slice(0, -1); st.eqHelp = false; return 'del';
  }
  /* the Check: notPoured / noRoof / eqEmpty (no miss) · eqUnequal / eqWrong (a miss) · ok */
  function check(st) {
    if (st.num === '99') return check99(st);
    if (st.done) return { result: 'done' };
    if (st.poured < st.n) { st.last = { result: 'notPoured' }; return st.last; }
    if (!st.roof) { st.last = { result: 'noRoof' }; return st.last; }
    if (st.eq[0] === '' || st.eq[1] === '') { st.last = { result: 'eqEmpty' }; return st.last; }
    var a = +st.eq[0], b = +st.eq[1], h = Math.floor(st.n / 2);
    if (a === h && b === h) { st.done = true; st.eqHelp = false; st.last = { result: 'ok' }; return st.last; }
    st.eqMisses++; st.eqHelp = st.eqMisses >= 2;
    /* the box whose number differs from its column */
    var bad = a !== h ? 0 : 1;
    st.last = { result: a === b ? 'eqWrong' : 'eqUnequal', bad: bad }; return st.last;
  }

  /* ---------- to 99: a shelf of four bags ---------- */
  function select(st, kind) { if (st.num !== '99' || st.done) return 'no'; st.sel = st.sel === kind ? null : kind; return 'sel'; }
  function seat(st, i, kind) {
    if (st.num !== '99' || st.done) return 'no';
    var b = st.bags[i]; if (!b || b.landed) return 'no';
    kind = kind || st.sel; if (kind !== 'flat' && kind !== 'chimney') return 'no';
    b.roof = kind; st.help = false; return 'seated';
  }
  function check99(st) {
    if (st.done) return { result: 'done' };
    if (st.bags.some(function (b) { return !b.landed && !b.roof; })) { st.last = { result: 'noRoof' }; return st.last; }
    var wrong = [];
    st.bags.forEach(function (b, i) { b.poured = true; if (b.landed) return; if (fits(b.n, b.roof)) b.landed = true; else { wrong.push(i); b.roof = null; } });
    if (!wrong.length) { st.done = true; st.help = false; st.last = { result: 'ok' }; return st.last; }
    st.misses++; st.help = st.misses >= 2;
    st.last = { result: 'fell', wrong: wrong }; return st.last;
  }

  /* literal keys only (the reachability gate reads them) */
  function hint(st) {
    var L = st.last; if (!L) return null;
    if (L.result === 'notPoured') return 'hPour';
    if (L.result === 'noRoof') return 'hRoofs';
    if (L.result === 'eqEmpty') return 'hEq';
    if (L.result === 'fell') { if (st.num === '99') return st.help ? 'miss2' : 'miss99'; return st.help ? 'miss2' : 'miss1'; }
    if (L.result === 'eqUnequal') return st.eqHelp ? 'eqMiss2' : 'eqUnequal';
    if (L.result === 'eqWrong') return st.eqHelp ? 'eqMiss2' : 'eqMiss1';
    return null;
  }

  /* ---------- the order ---------- */
  function shuffle(a, rnd) { a = a.slice(); for (var k = a.length - 1; k > 0; k--) { var j = Math.floor(rnd() * (k + 1)), x = a[k]; a[k] = a[j]; a[j] = x; } return a; }
  function verdict(num, r) { return num === '99' ? null : even(rounds(num)[r]); }
  /* a fresh round order every pass: never three of one verdict in a row; the flat roof
     left or right half the time, never the same side three rounds running */
  function plan(num, rnd, prev) {
    num = numOf(num); rnd = rnd || Math.random;
    var n = rounds(num).length, ids = []; for (var i = 0; i < n; i++) ids.push(i);
    var order = ids;
    for (var a = 0; a < 20000; a++) {
      var c = shuffle(ids, rnd);
      if (prev && prev.join() === c.join()) continue;
      var bad = false;
      if (num !== '99') for (var j = 2; j < n; j++) if (verdict(num, c[j]) === verdict(num, c[j - 1]) && verdict(num, c[j]) === verdict(num, c[j - 2])) { bad = true; break; }
      if (!bad) { order = c; break; }
    }
    var sides = [], half = []; for (var s = 0; s < n; s++) half.push(s < Math.ceil(n / 2) ? 'flatLeft' : 'flatRight');
    if (rnd() < 0.5) half = half.map(function (x) { return x === 'flatLeft' ? 'flatRight' : 'flatLeft'; }).reverse();
    for (var b = 0; b < 20000; b++) { var t = shuffle(half, rnd), ok = true; for (var q = 2; q < n; q++) if (t[q] === t[q - 1] && t[q] === t[q - 2]) { ok = false; break; } if (ok) { sides = t; break; } }
    if (!sides.length) sides = half;
    var bySide = {}; order.forEach(function (r, k) { bySide[r] = sides[k]; });
    return { order: order, side: bySide };
  }
  function band(W) { return { wide: W >= 560, cramp: W < 310 }; }

  var api = { R10: R10, R20: R20, R99: R99, numOf: numOf, roofModeOf: roofModeOf, rounds: rounds, even: even, columns: columns, split: split, towerOf: towerOf, fits: fits, newState: newState, pour: pour, unpour: unpour, roof: roof, focus: focus, typeEq: typeEq, delEq: delEq, check: check, select: select, seat: seat, hint: hint, plan: plan, band: band };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.ChimneyRoofCore = api;
})(typeof window !== 'undefined' ? window : this);
