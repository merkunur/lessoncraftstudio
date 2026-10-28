/* =====================================================================
   capped-mat-core.js — the model of THE CAPPED MAT (row 149, "Hundreds,
   Tens, and Ones", 2.NBT.A.1 a/b; G2-222, G2-224, G2-227). Pure, no DOM.
   Design: docs/activities-rebuild/designs/149-place-value.md
   ---------------------------------------------------------------------
   A place-value mat of three columns (hundreds, tens, ones; always in
   that order) holds base-ten blocks at true scale. The mat only closes
   when every column wears a numeral cap — one digit per cap, so a column
   holds at most nine and a tenth block is refused. An EMPTY column still
   needs its 0 cap: leave it bare and it folds shut, so 3 flats + 7 cubes
   read "37" instead of 307.
   Jobs: build (+ / − blocks; the caps read the build at Check) · read
   (cap each column; tidy = blocks in their columns, jumbled = blocks in
   a delivery tray in scrambled order) · match (which of three trays
   shows the ticket's number).
   ===================================================================== */
(function (root) {
  'use strict';

  var PLACES = ['h', 't', 'o'];
  /* Build: the old activity's 18 targets, kept, in two passes of nine that alternate */
  var BUILD_A = [108, 247, 305, 420, 500, 604, 730, 850, 974];
  var BUILD_B = [160, 200, 408, 463, 583, 670, 702, 836, 906];
  /* Read (G2-222 / G2-224): the jumbled delivery lays the kinds in this left-to-right order */
  var READ = [
    { n: 136, order: 'oht' }, { n: 254, order: 'toh' }, { n: 307, order: 'oh' },
    { n: 412, order: 'hto' }, { n: 529, order: 'oth' }, { n: 640, order: 'th' },
    { n: 718, order: 'tho' }, { n: 805, order: 'oh' }, { n: 963, order: 'hot' }
  ];
  /* Match (G2-227): ticket, the three trays top to bottom (right tray in bold in the design) */
  var MATCH = [
    { ticket: 427, trays: [427, 472, 527] }, { ticket: 306, trays: [360, 306, 406] },
    { ticket: 518, trays: [158, 517, 518] }, { ticket: 340, trays: [304, 340, 440] },
    { ticket: 263, trays: [623, 264, 263] }, { ticket: 605, trays: [605, 506, 615] },
    { ticket: 461, trays: [164, 451, 461] }, { ticket: 380, trays: [380, 308, 480] },
    { ticket: 452, trays: [352, 452, 425] }
  ];
  /* a jumbled tray scatters the kinds (never hundreds-tens-ones) */
  var SCATTER = ['oht', 'toh', 'tho', 'oth', 'hot'];

  function jobOf(v) { return v === 'read' || v === 'match' ? v : 'build'; }
  function digits(n) { return { h: Math.floor(n / 100), t: Math.floor(n / 10) % 10, o: n % 10 }; }
  function numOf(m) { return m.h * 100 + m.t * 10 + m.o; }
  function capsText(c) { return PLACES.map(function (p) { return c[p] == null ? '' : String(c[p]); }).join(''); }

  function rounds(job) {
    job = jobOf(job);
    if (job === 'read') return READ.map(function (r, i) { return { k: i, job: 'read', n: r.n, order: r.order }; });
    if (job === 'match') return MATCH.map(function (r, i) { return { k: i, job: 'match', n: r.ticket, trays: r.trays.slice(), right: r.trays.indexOf(r.ticket) }; });
    return BUILD_A.concat(BUILD_B).map(function (n, i) { return { k: i, job: 'build', n: n, pass: i < 9 ? 0 : 1 }; });
  }
  /* the kinds of a tray, left to right */
  function trayOrder(k, i, jumbled) { return jumbled ? SCATTER[(k * 3 + i) % SCATTER.length] : 'hto'; }
  /* the delivery for a jumbled read round: every block, grouped by kind in the round's order */
  function delivery(r) {
    var d = digits(r.n), out = [];
    r.order.split('').forEach(function (p) { for (var i = 0; i < d[p]; i++) out.push(p); });
    return out;
  }

  /* ---------- state ---------- */
  function newState(job, jumbled, k) {
    job = jobOf(job);
    var r = rounds(job)[k], mat = { h: 0, t: 0, o: 0 }, del = [];
    if (job === 'read') { if (jumbled) del = delivery(r); else mat = digits(r.n); }
    return { job: job, jumbled: !!jumbled, k: k, round: r, mat: mat, delivery: del, caps: { h: null, t: null, o: null }, tray: null,
      misses: 0, help: false, verdict: null, done: false, refused: null, moved: false };
  }
  /* any new move takes the help marks away until the next Check (the help ladder itself stays) */
  function clearMarks(st) { st.verdict = null; st.refused = null; if (st.job === 'build') st.caps = { h: null, t: null, o: null }; }
  /* Build: + adds one block; a tenth is refused — a cap holds only one digit */
  function add(st, p) {
    if (st.done || st.job !== 'build' || PLACES.indexOf(p) < 0) return { ok: false };
    if (st.mat[p] >= 9) { st.refused = p; return { ok: false, refused: true }; }
    clearMarks(st); st.mat[p]++; st.moved = true;
    return { ok: true };
  }
  function remove(st, p) {
    if (st.done || st.job !== 'build' || PLACES.indexOf(p) < 0 || st.mat[p] <= 0) return false;
    clearMarks(st); st.mat[p]--; st.moved = true;
    return true;
  }
  /* Read (jumbled): a delivery block slides to its own column — the column decides, never the order it lay in */
  function sendBlock(st, i) {
    if (st.done || st.job !== 'read' || i < 0 || i >= st.delivery.length) return null;
    var p = st.delivery[i];
    if (st.mat[p] >= 9) return null;
    st.delivery.splice(i, 1); st.mat[p]++; clearMarks(st); st.moved = true;
    return p;
  }
  /* Read (jumbled): a block on the mat taps back to the delivery */
  function backBlock(st, p) {
    if (st.done || st.job !== 'read' || !st.jumbled || PLACES.indexOf(p) < 0 || st.mat[p] <= 0) return false;
    st.mat[p]--; st.delivery.push(p); clearMarks(st); st.moved = true;
    return true;
  }
  /* Read: a cap is not used up — the rack holds endless copies */
  function cap(st, p, d) {
    if (st.done || st.job !== 'read' || PLACES.indexOf(p) < 0 || !/^[0-9]$/.test(String(d))) return false;
    st.caps[p] = +d; clearMarks(st); st.moved = true;
    return true;
  }
  function uncap(st, p) {
    if (st.done || st.job !== 'read' || PLACES.indexOf(p) < 0 || st.caps[p] == null) return false;
    st.caps[p] = null; clearMarks(st); st.moved = true;
    return true;
  }
  function pickTray(st, i) {
    if (st.done || st.job !== 'match' || i < 0 || i > 2) return false;
    st.tray = i; clearMarks(st); st.moved = true;
    return true;
  }
  /* the caps left when every BARE column folds shut: caps 3,–,7 read "37" */
  function foldReading(caps) { return PLACES.filter(function (p) { return caps[p] != null; }).map(function (p) { return String(caps[p]); }).join(''); }
  function differs(a, b) { return PLACES.filter(function (p) { return a[p] !== b[p]; }); }

  /* Check → { result: 'note' | 'miss' | 'ok' | 'no', key?, kind? } */
  function check(st) {
    if (st.done) return { result: 'no' };
    var r = st.round, kind = null;
    if (st.job === 'build') {
      if (!st.mat.h && !st.mat.t && !st.mat.o) return { result: 'note', key: 'hintBuildEmpty' };
      /* the caps drop by themselves and read what was built */
      st.caps = { h: st.mat.h, t: st.mat.t, o: st.mat.o };
      var built = numOf(st.mat);
      if (built === r.n) return win(st);
      var want = digits(r.n);
      /* help 2 needs both directions: outlines where blocks are missing, crosses where there are too many */
      kind = { kind: 'wrongBuild', built: capsText(st.caps), places: differs(st.mat, want),
        over: PLACES.filter(function (p) { return st.mat[p] > want[p]; }), under: PLACES.filter(function (p) { return st.mat[p] < want[p]; }) };
    } else if (st.job === 'read') {
      if (st.delivery.length) return { result: 'note', key: 'hintDelivery' };
      if (st.caps.h == null && st.caps.t == null && st.caps.o == null) return { result: 'note', key: 'hintCapAll' };
      var unfilled = PLACES.filter(function (p) { return st.mat[p] > 0 && st.caps[p] == null; });
      if (unfilled.length) { st.verdict = { kind: 'capMissing', places: unfilled }; return { result: 'note', key: 'hintCapMissing', places: unfilled }; }
      var bare = PLACES.filter(function (p) { return st.mat[p] === 0 && st.caps[p] == null; });
      if (bare.length) kind = { kind: 'zeroFold', bare: bare, fold: foldReading(st.caps), places: bare };
      else {
        var wrong = PLACES.filter(function (p) { return st.caps[p] !== st.mat[p]; });
        if (!wrong.length) return win(st);
        kind = { kind: 'wrongCap', places: wrong };
      }
    } else {
      if (st.tray == null) return { result: 'note', key: 'hintPickTray' };
      if (st.tray === r.right) return win(st);
      var shown = r.trays[st.tray];
      kind = { kind: 'wrongTray', shown: shown, places: differs(digits(shown), digits(r.n)) };
    }
    st.misses++; st.help = st.misses >= 2; st.verdict = kind;
    return { result: 'miss', kind: kind.kind };
  }
  function win(st) {
    st.done = true; st.verdict = null; st.refused = null;
    if (st.job !== 'match') st.caps = { h: st.mat.h, t: st.mat.t, o: st.mat.o };
    return { result: 'ok' };
  }
  /* literal keys only (the reachability gate reads them) */
  function hint(st) {
    var v = st.verdict;
    if (!v) return null;
    if (v.kind === 'capMissing') return 'hintCapMissing';
    if (v.kind === 'wrongBuild') return !st.help ? 'hintBuildLook' : v.over.length && v.under.length ? 'hintBuildBoth' : v.over.length ? 'hintBuildTake' : 'hintBuildFill';
    if (v.kind === 'zeroFold') return st.help ? 'hintZeroCap' : 'hintZeroFold';
    if (v.kind === 'wrongCap') return st.help ? 'hintCountNum' : 'hintCount';
    return st.help ? 'hintTrayAll' : 'hintTray';
  }
  function refusedKey(p) { return p === 'o' ? 'hintTenthO' : p === 't' ? 'hintTenthT' : 'hintTenthH'; }
  /* the success line's counts are the mat (or the ticket, in match) */
  function counts(st) { return st.job === 'match' ? digits(st.round.n) : { h: st.mat.h, t: st.mat.t, o: st.mat.o }; }

  function shuffle(a, rnd) { a = a.slice(); for (var k = a.length - 1; k > 0; k--) { var j = Math.floor(rnd() * (k + 1)), x = a[k]; a[k] = a[j]; a[j] = x; } return a; }
  /* order-only reshuffle; Build alternates its two passes (A, B, A, …); never the same order twice */
  function plan(job, pass, rnd, prev) {
    rnd = rnd || Math.random; job = jobOf(job);
    var ks = rounds(job).filter(function (r) { return job !== 'build' || r.pass === (pass % 2); }).map(function (r) { return r.k; });
    for (var a = 0; a < 200; a++) { var o = shuffle(ks, rnd); if (!prev || prev.join() !== o.join()) return { order: o }; }
    return { order: ks.slice().reverse() };
  }
  function passSize(job) { return 9; }
  function band(W) { return { wide: W >= 560, cramp: W < 330 }; }

  var api = { PLACES: PLACES, BUILD_A: BUILD_A, BUILD_B: BUILD_B, READ: READ, MATCH: MATCH, SCATTER: SCATTER, jobOf: jobOf, digits: digits, numOf: numOf, capsText: capsText,
    rounds: rounds, trayOrder: trayOrder, delivery: delivery, newState: newState, add: add, remove: remove, sendBlock: sendBlock, backBlock: backBlock, cap: cap, uncap: uncap,
    pickTray: pickTray, foldReading: foldReading, check: check, hint: hint, refusedKey: refusedKey, counts: counts, plan: plan, passSize: passSize, band: band };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.CappedMatCore = api;
})(typeof window !== 'undefined' ? window : this);
