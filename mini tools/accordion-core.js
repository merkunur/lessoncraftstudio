/* =====================================================================
   accordion-core.js — the model of THE ACCORDION SENTENCE (row 139,
   "Equal Groups", 2.OA.C.4; G3-301/302 faces in Level 3). Pure, no DOM.
   Design: docs/activities-rebuild/designs/139-array.md
   ---------------------------------------------------------------------
   The repeated-addition sentence is an accordion: one pleat per group,
   each pleat as tall as its group. It folds flat only when every pleat
   is the same height (canFold), and then reads as the multiplication.
   Level 1: fill empty trays for "Make g groups of e", type the total.
   Level 2: trays arrive filled (some with one tray off by one — a fix
   round); type the running totals and the total. Level 3: trays or an
   array; type the times sentence a × b = c (either factor order).
   ===================================================================== */
(function (root) {
  'use strict';

  var L1 = [[2, 3], [3, 4], [4, 2], [2, 5], [3, 3], [5, 2], [4, 4], [3, 5]];
  /* odd: the fix round's odd tray in pass 1, and how its count differs */
  var L2 = [{ g: 3, e: 2 }, { g: 4, e: 5 }, { g: 2, e: 10 }, { g: 5, e: 2, odd: 2, delta: 1 }, { g: 3, e: 10 }, { g: 6, e: 5, odd: 4, delta: -1 }, { g: 4, e: 10 }, { g: 7, e: 2 }];
  var L3 = [{ g: 6, e: 3 }, { g: 4, e: 7 }, { g: 8, e: 4 }, { g: 3, e: 9, odd: 1, delta: -1 }, { g: 5, e: 6, array: true }, { g: 4, e: 9, array: true }, { g: 6, e: 8, array: true }, { g: 9, e: 3 }];
  var MAX = 10;

  function levelOf(v) { return v === '2' || v === '3' ? v : '1'; }
  function runOf(v) { return v === 'hidden' ? 'hidden' : 'shown'; }
  function rounds(level) { level = levelOf(level); return level === '1' ? L1.map(function (x) { return { g: x[0], e: x[1] }; }) : level === '2' ? L2 : L3; }
  /* the fix round's odd tray moves +1 per pass, so every tray gets its turn */
  function oddIndex(rd, pass) { return rd.odd == null ? null : (rd.odd + (pass || 0)) % rd.g; }

  function newState(level, k, pass) {
    level = levelOf(level);
    var rd = rounds(level)[k], st = { level: level, k: k, g: rd.g, e: rd.e, array: !!rd.array, fix: rd.odd != null, beads: [], windows: {}, total: '', sentence: ['', '', ''], focus: null, folded: false, misses: 0, help: false, last: null, done: false };
    var odd = oddIndex(rd, pass);
    for (var i = 0; i < rd.g; i++) st.beads.push(level === '1' ? 0 : rd.e + (i === odd ? rd.delta : 0));
    st.odd = odd;
    return st;
  }
  function editable(st) { return !st.array && !st.done; }
  function canFold(beads) { if (beads.length < 2 || beads[0] < 1) return false; for (var i = 1; i < beads.length; i++) if (beads[i] !== beads[0]) return false; return true; }
  function runningTotals(beads) { var out = [], s = 0; for (var i = 0; i < beads.length; i++) { s += beads[i]; out.push(s); } return out; }
  function sum(beads) { return runningTotals(beads).pop() || 0; }

  function addBead(st, i) { if (!editable(st) || st.beads[i] == null || st.beads[i] >= MAX) return 'no'; st.beads[i]++; st.folded = false; st.help = false; return 'added'; }
  function removeBead(st, i) { if (!editable(st) || !st.beads[i]) return 'no'; st.beads[i]--; st.folded = false; st.help = false; return 'removed'; }
  /* the squeeze: equal pleats fold flat; any other strip springs back */
  function squeeze(st) { if (st.done) return 'no'; if (canFold(st.beads)) { st.folded = true; return 'folded'; } st.folded = false; return 'spring'; }
  function unfold(st) { if (st.done || !st.folded) return 'no'; st.folded = false; return 'open'; }

  /* typed boxes: windows after each pleat but the last (Level 2 with running totals shown),
     the total (Levels 1 and 2), the sentence a, b, c (Level 3) */
  function windowsTyped(st, run) { return st.level === '2' && runOf(run) === 'shown'; }
  function focus(st, key) { if (st.done) return 'no'; st.focus = key; return 'focus'; }
  function read(st, key) { if (key === 'total') return st.total; if (/^s\d$/.test(key)) return st.sentence[+key[1]]; if (/^w\d$/.test(key)) return st.windows[+key[1]] || ''; return null; }
  function write(st, key, v) { if (key === 'total') st.total = v; else if (/^s\d$/.test(key)) st.sentence[+key[1]] = v; else if (/^w\d$/.test(key)) st.windows[+key[1]] = v; }
  function type(st, d) {
    if (st.done || !st.focus || !/^\d$/.test(String(d))) return 'no';
    var v = read(st, st.focus); if (v == null) return 'no';
    if (v === '0') v = '';
    if (v.length >= 2) return 'full';
    write(st, st.focus, v + d); st.help = false; return 'typed';
  }
  function del(st) { if (st.done || !st.focus) return 'no'; var v = read(st, st.focus); if (!v) return 'no'; write(st, st.focus, v.slice(0, -1)); st.help = false; return 'del'; }

  function miss(st, kind, extra) { st.misses++; st.help = st.misses >= 2; st.last = { result: kind }; for (var k in (extra || {})) st.last[k] = extra[k]; return st.last; }
  function check(st, run) {
    if (st.done) return { result: 'done' };
    var b = st.beads, t = st.g * st.e;
    if (st.level === '1' && sum(b) === 0) { st.last = { result: 'empty' }; return st.last; }
    if (!canFold(b)) { st.folded = false; return miss(st, 'unequal'); }
    st.folded = true;
    if (st.level === '1' && b[0] !== st.e) return miss(st, 'wrongSize');
    if (st.level === '3') {
      if (st.sentence.some(function (x) { return x === ''; })) { st.last = { result: 'noSentence' }; return st.last; }
      var a = +st.sentence[0], bb = +st.sentence[1], c = +st.sentence[2];
      var factors = (a === st.g && bb === st.e) || (a === st.e && bb === st.g);
      if (factors && c === t) { st.done = true; st.help = false; st.last = { result: 'ok' }; return st.last; }
      if (factors) return miss(st, 'total');
      return miss(st, 'sentence');
    }
    if (windowsTyped(st, run)) {
      var rt = runningTotals(b);
      for (var i = 0; i < st.g - 1; i++) if (!st.windows[i]) { st.folded = false; st.last = { result: 'noWindows' }; return st.last; }
      for (var j = 0; j < st.g - 1; j++) if (+st.windows[j] !== rt[j]) { st.folded = false; return miss(st, 'run', { at: j, previous: j ? rt[j - 1] : 0 }); }
    }
    if (st.total === '') { st.last = { result: 'noTotal' }; return st.last; }
    if (+st.total === t) { st.done = true; st.help = false; st.last = { result: 'ok' }; return st.last; }
    return miss(st, 'total');
  }
  /* literal keys only (the reachability gate reads them) */
  function hint(st) {
    var L = st.last; if (!L) return null;
    switch (L.result) {
      case 'empty': return 'hEmpty';
      case 'noTotal': return 'hTotal';
      case 'noWindows': return 'hWindows';
      case 'noSentence': return 'hSentence';
      case 'unequal': return st.help ? 'miss2Row' : 'missUnequal';
      case 'wrongSize': return st.help ? 'miss2Row' : 'missWrongSize';
      case 'run': return st.help ? 'miss2Total' : (L.at ? 'missRun' : 'missRunFirst');
      case 'total': return st.help ? 'miss2Total' : 'missTotal';
      case 'sentence': return st.help ? 'miss2Total' : 'missSentence';
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

  var api = { L1: L1, L2: L2, L3: L3, MAX: MAX, levelOf: levelOf, runOf: runOf, rounds: rounds, oddIndex: oddIndex, newState: newState, canFold: canFold, runningTotals: runningTotals, sum: sum, addBead: addBead, removeBead: removeBead, squeeze: squeeze, unfold: unfold, windowsTyped: windowsTyped, focus: focus, type: type, del: del, check: check, hint: hint, plan: plan, band: band };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.AccordionCore = api;
})(typeof window !== 'undefined' ? window : this);
