/* =====================================================================
   value-keys-core.js — the model of THE VALUE-KEY ADDING MACHINE (row
   150, "Expanded Form", 2.NBT.A.3 with 1.NBT.B.2; G1-120/121/122/133,
   G2-223/225). Pure, no DOM.
   Design: docs/activities-rebuild/designs/150-place-value.md
   ---------------------------------------------------------------------
   An adding machine with one column of keys per place. Every key is
   labelled with what it is WORTH (100…900, 10…90, 1…9), a column holds
   one key, and there is no zero key: a zero place is a column where
   nothing is pressed. Pulling the crank adds the pressed values, the
   drums show the sum and the tape prints the expanded form, largest
   first (247 = 200 + 40 + 7; 305 = 300 + 5).
   Jobs: make (press the keys for the ticket) · read (press the keys the
   shown blocks are worth) · worth (press the ONE key the bright digit
   is worth) · set (two digits: feed one of three block sets; the machine
   presses that set's keys by itself, only the choice is judged).
   ===================================================================== */
(function (root) {
  'use strict';

  var PLACES = ['h', 't', 'o'];
  var UNIT = { h: 100, t: 10, o: 1 };
  /* Make, three digits: the old activity's 18 targets, two passes of nine that alternate */
  var MAKE3_A = [108, 247, 305, 420, 500, 604, 730, 850, 974];
  var MAKE3_B = [160, 200, 408, 463, 583, 670, 702, 836, 906];
  var MAKE2 = [43, 70, 58, 16, 91, 35, 62, 27, 89];
  var READ3 = [238, 406, 571, 690, 145, 802, 367, 954, 713];
  var READ2 = [34, 60, 75, 19, 82, 47, 90, 56, 23];
  /* Worth: the number and the place of the bright digit */
  var WORTH3 = [[472, 't'], [721, 'h'], [217, 'o'], [358, 't'], [583, 'h'], [835, 'o'], [946, 't'], [469, 'h'], [694, 'o']];
  var WORTH2 = [[47, 't'], [74, 'o'], [36, 't'], [63, 'o'], [85, 't'], [58, 'o'], [29, 't'], [92, 'o'], [61, 't']];
  /* Which set (two digits only): the ticket and the three sets top to bottom */
  var SETS = [
    [34, [34, 36, 44]], [52, [53, 52, 22]], [71, [70, 11, 71]],
    [46, [45, 46, 66]], [80, [81, 90, 80]], [29, [29, 28, 19]],
    [63, [62, 33, 63]], [15, [15, 16, 55]], [57, [56, 57, 77]]
  ];

  function jobOf(v) { return v === 'read' || v === 'worth' || v === 'set' ? v : 'make'; }
  /* the job decides the places: "which set?" is two digits only */
  function placesOf(job, numbers) { return jobOf(job) === 'set' ? 2 : (numbers === 'two' ? 2 : 3); }
  function placeList(places) { return places === 2 ? ['t', 'o'] : PLACES; }
  function digits(n) { return { h: Math.floor(n / 100) % 10, t: Math.floor(n / 10) % 10, o: n % 10 }; }
  function valueOf(p, d) { return d * UNIT[p]; }
  function sumOf(keys) { var s = 0; PLACES.forEach(function (p) { if (keys[p]) s += valueOf(p, keys[p]); }); return s; }
  /* the parts of n, largest first, zero places left out */
  function parts(n) { var d = digits(n); return PLACES.filter(function (p) { return d[p] > 0; }).map(function (p) { return valueOf(p, d[p]); }); }
  function expanded(n) { return parts(n).join(' + '); }
  /* the keys that make n: one per non-zero place */
  function keysFor(n) { var d = digits(n); return { h: d.h || null, t: d.t || null, o: d.o || null }; }
  /* the tape: the pressed values largest first, then = the sum; right-aligned by the view */
  function tapeLines(keys) {
    var v = PLACES.filter(function (p) { return keys[p]; }).map(function (p) { return valueOf(p, keys[p]); });
    if (!v.length) return [];
    return v.map(function (x, i) { return (i ? '+ ' : '') + x; }).concat(['= ' + v.reduce(function (a, b) { return a + b; }, 0)]);
  }
  function keyCount(keys) { return PLACES.filter(function (p) { return keys[p]; }).length; }

  function rounds(job, places) {
    job = jobOf(job);
    if (job === 'set') return SETS.map(function (r, i) { return { k: i, job: job, places: 2, n: r[0], sets: r[1].slice(), right: r[1].indexOf(r[0]) }; });
    if (job === 'worth') return (places === 2 ? WORTH2 : WORTH3).map(function (r, i) { return { k: i, job: job, places: places, n: r[0], place: r[1], d: digits(r[0])[r[1]] }; });
    if (job === 'read') return (places === 2 ? READ2 : READ3).map(function (n, i) { return { k: i, job: job, places: places, n: n }; });
    if (places === 2) return MAKE2.map(function (n, i) { return { k: i, job: job, places: 2, n: n, pass: -1 }; });
    return MAKE3_A.concat(MAKE3_B).map(function (n, i) { return { k: i, job: job, places: 3, n: n, pass: i < 9 ? 0 : 1 }; });
  }

  function newState(job, places, k) {
    job = jobOf(job); places = job === 'set' ? 2 : places;
    var pool = rounds(job, places), r = pool[k] || pool[0];
    return { job: job, places: places, k: r.k, round: r, keys: { h: null, t: null, o: null }, fed: null,
      misses: 0, help: false, verdict: null, done: false, tape: [], drums: null, cranks: 0 };
  }
  /* a column holds one key; pressing the pressed key lifts it (the column is empty again) */
  function press(st, p, d) {
    if (st.done || st.job === 'set' || placeList(st.places).indexOf(p) < 0 || !(d >= 1 && d <= 9 && d === Math.floor(d))) return false;
    st.keys[p] = st.keys[p] === d ? null : d;
    st.verdict = null;
    return true;
  }
  function release(st, p) { if (st.done || st.job === 'set' || !st.keys[p]) return false; st.keys[p] = null; st.verdict = null; return true; }
  /* which set: the machine presses the fed set's keys by itself */
  function feed(st, i) {
    if (st.done || st.job !== 'set' || !(i >= 0 && i < st.round.sets.length)) return false;
    st.fed = i; st.keys = keysFor(st.round.sets[i]); st.verdict = null;
    return true;
  }
  function differs(a, b, places) { var x = digits(a), y = digits(b); return placeList(places).filter(function (p) { return x[p] !== y[p]; }); }

  /* the crank: adds, prints, judges */
  function crank(st) {
    if (st.done) return { result: 'no' };
    var r = st.round, job = st.job, n = r.n;
    if (job === 'set' && st.fed == null) return { result: 'note', key: 'hintPickSet' };
    if (!keyCount(st.keys)) return { result: 'note', key: 'hintNoKey' };
    if (job === 'worth' && keyCount(st.keys) > 1) return { result: 'note', key: 'hintOneKey' };
    var sum = sumOf(st.keys);
    st.cranks++; st.drums = sum; st.tape = tapeLines(st.keys);
    var want = job === 'worth' ? valueOf(r.place, r.d) : n;
    if (sum === want) return win(st);
    var kind;
    if (job === 'worth') {
      var p = PLACES.filter(function (q) { return st.keys[q]; })[0];
      kind = { kind: 'wrongWorth', v: sum, place: p, places: [r.place] };
    } else if (job === 'set') {
      kind = { kind: 'wrongSet', sum: sum, places: differs(sum, n, 2) };
    } else {
      var d = digits(n), zero = placeList(st.places).filter(function (q) { return d[q] === 0 && st.keys[q]; });
      if (zero.length && job === 'make') kind = { kind: 'zeroPressed', sum: sum, places: zero };
      else kind = { kind: job === 'read' ? 'wrongRead' : 'wrongMake', sum: sum, places: differs(sum, n, st.places) };
    }
    st.misses++; st.help = st.misses >= 2; st.verdict = kind;
    return { result: 'miss', kind: kind.kind };
  }
  function win(st) { st.done = true; st.verdict = null; return { result: 'ok' }; }

  /* literal keys only (the reachability gate reads them) */
  function hint(st) {
    var v = st.verdict;
    if (!v) return null;
    if (v.kind === 'zeroPressed') return 'hintZero';
    if (v.kind === 'wrongMake') return st.help ? 'hintMakeWorth' : 'hintMakeLook';
    if (v.kind === 'wrongRead') return st.help ? 'hintReadCount' : 'hintReadLook';
    if (v.kind === 'wrongWorth') return st.help ? 'hintWorthCol' : 'hintWorthLook';
    if (v.kind === 'wrongSet') return st.help ? 'hintSetFind' : 'hintSetLook';
    return null;
  }
  /* the place a help line talks about: the first differing place that has a digit in the target */
  function helpPlace(st) {
    var v = st.verdict, d = digits(st.round.n);
    if (!v) return null;
    if (v.kind === 'wrongWorth') return st.round.place;
    var nz = v.places.filter(function (p) { return d[p] > 0; });
    return nz[0] || v.places[0] || null;
  }
  /* the success line's key */
  function okKey(st) {
    if (st.job === 'worth') return 'okWorth';
    if (st.job === 'set') return 'okSet';
    return parts(st.round.n).length === 1 ? 'okOne' : 'okExp';
  }

  /* the order of a pass: order-only reshuffle, never the same order twice in a row; make-3 alternates its two passes */
  function passSize() { return 9; }
  function plan(job, places, pass, rnd, prev) {
    job = jobOf(job); places = job === 'set' ? 2 : places;
    var pool = rounds(job, places).filter(function (r) { return !(job === 'make' && places === 3) || r.pass === (pass % 2); });
    var ks = pool.map(function (r) { return r.k; });
    for (var tries = 0; tries < 50; tries++) {
      var o = ks.slice();
      for (var i = o.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = o[i]; o[i] = o[j]; o[j] = t; }
      if (!prev || prev.join() !== o.join()) return { order: o };
    }
    return { order: ks.slice().reverse() };
  }
  /* the stage bands: wide = the whole bank of key columns; compact = place tabs + one 3 × 3 pad */
  function band(W) { return { wide: W >= 560, compact: W < 560 }; }

  var api = { PLACES: PLACES, UNIT: UNIT, jobOf: jobOf, placesOf: placesOf, placeList: placeList, digits: digits, valueOf: valueOf, sumOf: sumOf,
    parts: parts, expanded: expanded, keysFor: keysFor, tapeLines: tapeLines, keyCount: keyCount, rounds: rounds, newState: newState,
    press: press, release: release, feed: feed, crank: crank, hint: hint, helpPlace: helpPlace, okKey: okKey, passSize: passSize, plan: plan, band: band };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.ValueKeysCore = api;
})(typeof window !== 'undefined' ? window : this);
