/* =====================================================================
   CORE — River Steer  (river-steer-core.js)
   ---------------------------------------------------------------------
   Generic, LOCALE-NEUTRAL binary-compare cognition (the spec's
   `engine-river-steer.js`). First skin: "Comparison Creek" — CCSS K.CC.C.7
   (compare two written numerals 1–10). Each bend FORKS into two channels
   carrying number/dot/sum BUOYS; the child reads the prompt + the buoys
   and steers to the correct side. The correct side is DERIVED from the
   rule + the channels (never stored), so the activity can't leak it.

   The HEART is ADJACENT numerals (6v7, 8v9) — reading is the only way to
   win; far-apart pairs are eyeball-by-size onboarding, not scored. Anti-
   guess is proven by the build-gate: a READER (read both buoys, apply the
   rule) scores 1.0, while every fixed blind strategy + the by-ear strategy
   score worse.

   Fork descriptor:
     { id, band, promptKey:'bigger|smaller|sum|tie|nameMore|between',
       channels:[{side:'L|R', value, render:'numeral|dots|sum',
                  addends?:[a,b], printScale?}],
       between?:{lo,hi}, responseMode:'side|equal|relation' }
   Pure functions, no DOM (mirrors ordering-core.js / fix-it-core.js).
   ===================================================================== */
(function (global) {
  'use strict';

  function ch(fork, side) { return fork.channels.filter(function (c) { return c.side === side; })[0]; }
  function val(c) { return (c.render === 'sum' && c.addends) ? c.addends.reduce(function (a, b) { return a + b; }, 0) : c.value; }
  function forkVal(fork, side) { return val(ch(fork, side)); }

  /* the EN fork pool. responseMode 'side' → 'L'|'R'; 'equal' → 'equal';
     'relation' → 'more'|'less'. Sides authored ~50/50; the four pure
     steer-compare forks are all diff-1 (the adjacency heart). */
  var ROUNDS = [
    /* B3 — steer-compare on ADJACENT numerals (the heart) */
    { id: 'sc-7-6', band: 3, promptKey: 'bigger', responseMode: 'side', channels: [{ side: 'L', value: 7, render: 'numeral' }, { side: 'R', value: 6, render: 'numeral' }] },
    { id: 'sc-5-6', band: 3, promptKey: 'bigger', responseMode: 'side', channels: [{ side: 'L', value: 5, render: 'numeral' }, { side: 'R', value: 6, render: 'numeral' }] },
    { id: 'sc-8-9', band: 3, promptKey: 'smaller', responseMode: 'side', channels: [{ side: 'L', value: 8, render: 'numeral' }, { side: 'R', value: 9, render: 'numeral' }] },
    { id: 'sc-7-6s', band: 3, promptKey: 'smaller', responseMode: 'side', channels: [{ side: 'L', value: 7, render: 'numeral' }, { side: 'R', value: 6, render: 'numeral' }] },
    /* B1 — dot-compare (count, the C.6 scaffold) */
    { id: 'dot-4-5', band: 1, promptKey: 'bigger', responseMode: 'side', channels: [{ side: 'L', value: 4, render: 'dots' }, { side: 'R', value: 5, render: 'dots' }] },
    /* B1 — rosetta: numeral vs dot-set (symbol↔quantity bridge) */
    { id: 'ros-7-6', band: 1, promptKey: 'bigger', responseMode: 'side', channels: [{ side: 'L', value: 7, render: 'dots' }, { side: 'R', value: 6, render: 'numeral' }] },
    /* B6 — sum-fork (compute then compare) */
    { id: 'sum-4-5', band: 6, promptKey: 'sum', responseMode: 'side', channels: [{ side: 'L', value: 0, render: 'sum', addends: [2, 2] }, { side: 'R', value: 0, render: 'sum', addends: [3, 2] }] },
    /* B4 — size-decoupled (read VALUE, not print-size): printScale ⊥ side */
    { id: 'sz-3-8', band: 4, promptKey: 'bigger', responseMode: 'side', channels: [{ side: 'L', value: 3, render: 'numeral', printScale: 1.7 }, { side: 'R', value: 8, render: 'numeral', printScale: 0.7 }] },
    { id: 'sz-9-4', band: 4, promptKey: 'bigger', responseMode: 'side', channels: [{ side: 'L', value: 9, render: 'numeral', printScale: 1.6 }, { side: 'R', value: 4, render: 'numeral', printScale: 0.7 }] },
    /* B4 — tie / equals (teaches =) */
    { id: 'tie-6-6', band: 4, promptKey: 'tie', responseMode: 'equal', channels: [{ side: 'L', value: 6, render: 'numeral' }, { side: 'R', value: 6, render: 'numeral' }] },
    /* B5 — name-it (productive: generate the relation word) */
    { id: 'name-6-7', band: 5, promptKey: 'nameMore', responseMode: 'relation', channels: [{ side: 'L', value: 6, render: 'numeral' }, { side: 'R', value: 7, render: 'numeral' }] },
    /* B5 — betweenness micro-fork (a different relation) */
    { id: 'btw-5-8', band: 5, promptKey: 'between', responseMode: 'side', between: { lo: 4, hi: 6 }, channels: [{ side: 'L', value: 5, render: 'numeral' }, { side: 'R', value: 8, render: 'numeral' }] }
  ];

  /* THE ONLY answer source — derive the correct response from rule + channels. */
  function deriveCorrect(fork) {
    var L = forkVal(fork, 'L'), R = forkVal(fork, 'R');
    switch (fork.promptKey) {
      case 'bigger': case 'sum': return L > R ? 'L' : 'R';
      case 'smaller': return L < R ? 'L' : 'R';
      case 'tie': return L === R ? 'equal' : (L > R ? 'L' : 'R');
      case 'nameMore': return L > R ? 'more' : 'less';     // is L more or less than R
      case 'between': return (fork.between.lo < L && L < fork.between.hi) ? 'L' : 'R';
      default: return 'L';
    }
  }
  function isCorrect(fork, response) { return response === deriveCorrect(fork); }

  /* render signature (distinctness is render×responseMode×channelCount, NOT the
     prompt word). printScale → 'scaled'; mixed renders → 'mixed'. */
  function signature(fork) {
    var renders = fork.channels.map(function (c) { return c.render; });
    var rt;
    if (fork.channels.some(function (c) { return c.printScale && c.printScale !== 1; })) rt = 'scaled';
    else if (new Set(renders).size > 1) rt = 'mixed';
    else rt = renders[0];
    return rt + '|' + fork.responseMode + '|' + fork.channels.length;
  }
  function diff(fork) { return Math.abs(forkVal(fork, 'L') - forkVal(fork, 'R')); }
  function isSteerCompare(fork) { return (fork.promptKey === 'bigger' || fork.promptKey === 'smaller') && fork.responseMode === 'side' && !fork.channels.some(function (c) { return c.printScale && c.printScale !== 1 || c.render !== 'numeral'; }); }

  /* ---- solvers for the gate ---- */
  function reader(fork) { return deriveCorrect(fork); }                 // reads + applies rule → always correct
  function fixedSide(side) { return function (fork) { return fork.responseMode === 'side' ? side : null; }; }
  function biggerPrint(fork) {                                           // "tap the side with the bigger digits"
    if (fork.responseMode !== 'side') return null;
    var L = ch(fork, 'L'), R = ch(fork, 'R'); var sl = L.printScale || 1, sr = R.printScale || 1;
    return sl === sr ? null : (sl > sr ? 'L' : 'R');
  }
  function byEar() { return null; }                                     // commit-lock: hears only the committed buoy → no compare

  global.RiverSteerCore = {
    ROUNDS: ROUNDS,
    buildRounds: function () { return ROUNDS.map(function (r) { return JSON.parse(JSON.stringify(r)); }); },
    deriveCorrect: deriveCorrect,
    isCorrect: isCorrect,
    forkVal: forkVal,
    val: val,
    signature: signature,
    diff: diff,
    isSteerCompare: isSteerCompare,
    SOLVERS: { reader: reader, alwaysLeft: fixedSide('L'), alwaysRight: fixedSide('R'), biggerPrint: biggerPrint, byEar: byEar }
  };

}(typeof window !== 'undefined' ? window : this));
