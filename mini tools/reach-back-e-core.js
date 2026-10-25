/* =====================================================================
   reach-back-e-core.js — the model for ACTIVITY #111 of the one-by-one
   rebuild: "Add the Magic e" → THE REACH-BACK e (RF.1.3, en only).
   Design: docs/activities-rebuild/designs/111-cvc-builder.md
   ---------------------------------------------------------------------
   The final e is silent, but it has an arm: dropped in the end socket it
   swings back over exactly ONE letter and taps the vowel, which flips
   from its short face to its name face. Two clues: Finish the word (the
   consonants are seated; the child picks the vowel and decides whether
   the e belongs — four rounds in nine must NOT take it) and Read and find
   (the word arrives built; tap the picture it names).
   · EN only: the final silent e that lengthens the vowel is an English
     spelling convention; in the other ten languages it would be false.
   · One socket per letter: the rail spells, it claims no sound split.
   Pure and DOM-free; UMD (window.ReachBackECore / require()).
   ===================================================================== */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.ReachBackECore = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* every picture (library theme/noun) — viewed on a contact sheet 2026-10-25; around-the-house/pen is a PENCIL, so the
     pen is classroom/pen */
  var PICS = {
    kite: 'beach/kite', cake: '4th of July/cake', rose: 'flowers/rose', cap: 'accessories/cap', cube: 'shapes/cube',
    hat: 'accessories/hat', pig: 'animals/pig', mop: 'around the house/mop', nose: 'body parts/nose', cape: 'accessories/cape',
    plate: 'kitchen tools/plate', pot: 'around the house/pot', globe: 'classroom/globe', slide: 'toys/slide', cup: 'around the house/cup',
    van: 'vehicles/van', pen: 'classroom/pen', whale: 'beach/whale', cat: 'animals/cat', gate: 'around the house/gate',
    tie: 'accessories/tie', net: 'beach/net'
  };
  /* Finish the word: [word, other vowel]; the rail is the word's consonants with ONE vowel socket, then the end socket */
  var FINISH = [
    [['kite', 'u'], ['cake', 'u'], ['rose', 'i'], ['cap', 'u'], ['cube', 'a'], ['hat', 'i'], ['pig', 'a'], ['mop', 'a'], ['nose', 'u']],
    [['cape', 'o'], ['plate', 'i'], ['pot', 'a'], ['globe', 'a'], ['slide', 'o'], ['cup', 'a'], ['van', 'u'], ['pen', 'i'], ['whale', 'o']]
  ];
  /* Read and find: [the built word, three pictures; the first is right — the plan decides where it is shown] */
  var READ = [
    ['cape', 'cap', 'cake'], ['cap', 'cape', 'cat'], ['cake', 'cape', 'gate'], ['kite', 'slide', 'tie'], ['rose', 'nose', 'globe'],
    ['nose', 'rose', 'net'], ['cube', 'cup', 'cake'], ['cup', 'cube', 'cap'], ['plate', 'gate', 'slide']
  ];
  var VOWELS = 'aeiou', DECOY = 'b';

  /* a word's shape: VCe words end in e with the vowel two letters before the end; the rest are short (CVC / CCVC) */
  function shape(word) {
    var needsE = /[aeiou][^aeiou]e$/.test(word), base = needsE ? word.slice(0, -1) : word, v = -1;
    for (var i = base.length - 1; i >= 0; i--) if (VOWELS.indexOf(base[i]) >= 0) { v = i; break; }
    return { word: word, base: base, needsE: needsE, vowel: base[v], vIdx: v, rail: base.split('').map(function (c, i) { return i === v ? null : c; }) };
  }
  function rounds(clue, set) { return clue === 'read' ? READ.map(function (r, i) { return i; }) : FINISH[(set || 0) % 2].map(function (r, i) { return i; }); }
  function clueOf(v) { return v === 'read' ? 'read' : 'finish'; }

  /* ---------------- the state ---------------- */
  function newState(clue, set, r, opts) {
    opts = opts || {}; clue = clueOf(clue);
    var st = { clue: clue, set: (set || 0) % 2, r: r, misses: 0, show: 0, last: null, done: false };
    if (clue === 'finish') {
      var F = FINISH[st.set][r], s = shape(F[0]);
      st.word = F[0]; st.base = s.base; st.needsE = s.needsE; st.answer = s.vowel; st.vIdx = s.vIdx; st.rail = s.rail; st.other = F[1];
      st.given = opts.vowel === 'given';
      /* the tray: Pick — the right vowel, the other vowel and the e; Given — the e and a decoy consonant */
      var slot = opts.slot == null ? 2 : opts.slot, vFirst = opts.vFirst == null ? true : opts.vFirst;
      if (st.given) { st.tray = slot % 2 ? [{ k: 'c', c: DECOY }, { k: 'e', c: 'e' }] : [{ k: 'e', c: 'e' }, { k: 'c', c: DECOY }]; st.vowel = s.vowel; }
      else {
        var vs = vFirst ? [s.vowel, F[1]] : [F[1], s.vowel], t = vs.map(function (c) { return { k: 'v', c: c }; });
        t.splice(slot, 0, { k: 'e', c: 'e' }); st.tray = t; st.vowel = null;
      }
      st.end = null;   /* null · 'e' · the decoy consonant */
    } else {
      var R = READ[r], pos = opts.pos == null ? 0 : opts.pos, others = R.slice(1);
      st.word = R[0]; var s2 = shape(R[0]); st.base = s2.base; st.needsE = s2.needsE; st.answer = s2.vowel; st.vIdx = s2.vIdx; st.rail = s2.rail;
      st.vowel = s2.vowel; st.end = s2.needsE ? 'e' : null;
      st.choices = others.slice(0, pos).concat([R[0]], others.slice(pos)); st.right = pos; st.picked = null;
    }
    return st;
  }
  /* the arm's geometry is fixed: its hand lands TWO places to the left of the end socket, over exactly one letter */
  function endIdx(st) { return st.rail.length; }
  function armTarget(st) { return endIdx(st) - 2; }
  /* the vowel's face: its name face only when the e is on the end AND the arm's hand lands on a seated vowel */
  function vowelFace(st) { return st.end === 'e' && st.vowel && armTarget(st) === st.vIdx ? 'name' : 'short'; }
  function setVowel(st, v) { if (st.done || st.clue !== 'finish' || st.given || VOWELS.indexOf(v) < 0) return 'no'; st.vowel = v; st.last = null; return 'set'; }
  function clearVowel(st) { if (st.done || st.clue !== 'finish' || st.given || !st.vowel) return 'no'; st.vowel = null; st.last = null; return 'cleared'; }
  function setEnd(st, c) { if (st.done || st.clue !== 'finish' || (c !== 'e' && c !== DECOY)) return 'no'; st.end = c; st.last = null; return 'set'; }
  function clearEnd(st) { if (st.done || st.clue !== 'finish' || !st.end) return 'no'; st.end = null; st.last = null; return 'cleared'; }
  function pick(st, k) { if (st.done || st.clue !== 'read' || k < 0 || k > 2) return 'no'; st.picked = k; st.last = null; return 'picked'; }
  /* the word the rail spells now */
  function spelled(st) { return st.rail.map(function (c) { return c == null ? (st.vowel || '') : c; }).join('') + (st.end || ''); }

  function kindOf(st) {
    if (st.clue === 'read') return st.picked == null ? 'tray' : st.picked === st.right ? 'ok' : 'read';
    if (!st.vowel) return 'tray';
    if (st.vowel !== st.answer) return 'vowel';
    if (st.end && st.end !== 'e') return 'end';
    if (st.end === 'e' && !st.needsE) return 'eExtra';
    if (st.end !== 'e' && st.needsE) return 'eMissing';
    return 'ok';
  }
  function check(st) {
    if (st.done) return { result: 'done' };
    var k = kindOf(st); st.last = k;
    if (k === 'tray') return { result: 'tray' };
    if (k === 'ok') { st.done = true; return { result: 'ok' }; }
    st.misses++; st.show = Math.min(2, st.misses);
    return { result: 'miss', kind: k };
  }
  function hint(st) {
    var k = st.last;
    if (k === 'tray') return { key: st.clue === 'read' ? 'hintReadEmpty' : 'hintEmpty' };
    if (!st.show || !k || k === 'ok') return null;
    var two = st.show >= 2;
    if (k === 'vowel') return { key: two ? 'hintVowel2' : 'hintVowel' };
    if (k === 'end') return { key: 'hintEnd' };
    if (k === 'eExtra') return { key: two ? 'hintBadgeShort' : 'hintExtra' };
    if (k === 'eMissing') return { key: two ? 'hintBadgeName' : 'hintMissing' };
    return { key: two ? 'hintRead2' : 'hintRead' };
  }
  /* miss 2 on the e question: the picture's badge fills — gold (says its name) or teal (short); never at rest */
  function badge(st) { return st.show >= 2 && (st.last === 'eExtra' || st.last === 'eMissing') ? { face: st.needsE ? 'name' : 'short', vowel: st.answer } : null; }
  /* what the child sees wrong at miss 1 (the tile that lifts and rings coral) */
  function wrongAt(st) { var k = st.last; return k === 'vowel' ? 'vowel' : k === 'eExtra' || k === 'end' ? 'end' : k === 'eMissing' ? 'endEmpty' : null; }

  /* ---------------- the plan ---------------- */
  function shuffle(a, rnd) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
  function eq(a, b) { if (!a || !b || a.length !== b.length) return false; for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false; return true; }
  function noThree(p) { for (var q = 2; q < p.length; q++) if (p[q] === p[q - 1] && p[q] === p[q - 2]) return false; return true; }
  /* an order is fair when the e question never has the same answer three rounds running */
  function fair(clue, set, o) { if (clue !== 'finish') return true; return noThree(o.map(function (i) { return shape(FINISH[set][i][0]).needsE ? 1 : 0; })); }
  /* pass p uses set p % 2 (Finish); the order is reshuffled every pass, never the previous one; Finish: the e tile's tray
     slot is left / middle / right three times each and the right vowel stands first in 4 or 5 of nine; Read: the right
     picture's slot is 3/3/3 — never three times running in one place */
  function plan(clue, rnd, prev, pass) {
    rnd = rnd || Math.random; clue = clueOf(clue); var set = clue === 'finish' ? (pass || 0) % 2 : 0, ids = rounds(clue, set), o = null;
    for (var k = 0; k < 500; k++) { var c = shuffle(ids, rnd); if (!eq(c, prev) && fair(clue, set, c)) { o = c; break; } }
    if (!o) o = ids;
    var pos = null, vFirst = null;
    for (var t = 0; t < 300; t++) { var p = shuffle([0, 0, 0, 1, 1, 1, 2, 2, 2], rnd); if (noThree(p)) { pos = p; break; } }
    if (!pos) pos = [0, 1, 2, 0, 1, 2, 0, 1, 2];
    if (clue === 'finish') { var f0 = rnd() < 0.5 ? 4 : 5; for (var u = 0; u < 300; u++) { var b = shuffle([1, 1, 1, 1, 1, 0, 0, 0, 0].map(function (x, i) { return i < f0 ? 1 : 0; }), rnd); if (noThree(b)) { vFirst = b.map(Boolean); break; } } }
    return { order: o, pos: pos, vFirst: vFirst, set: set };
  }
  function band(w) { return { wide: w >= 560, tiny: w < 300 }; }

  return {
    PICS: PICS, FINISH: FINISH, READ: READ, VOWELS: VOWELS, DECOY: DECOY,
    shape: shape, rounds: rounds, clueOf: clueOf, newState: newState, endIdx: endIdx, armTarget: armTarget, vowelFace: vowelFace,
    setVowel: setVowel, clearVowel: clearVowel, setEnd: setEnd, clearEnd: clearEnd, pick: pick, spelled: spelled,
    kindOf: kindOf, check: check, hint: hint, badge: badge, wrongAt: wrongAt, plan: plan, fair: fair, band: band
  };
});
