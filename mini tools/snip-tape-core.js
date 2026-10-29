/* =====================================================================
   snip-tape-core.js — the model of ACTIVITY #155 of the one-by-one
   rebuild: "Span's Length Gap" → THE SNIP-OUT TAPE (2.MD.A.4).
   Pure, no DOM. Design: docs/activities-rebuild/designs/155-span-length-gap.md
   ---------------------------------------------------------------------
   Two real things lie on two lanes against a zero wall, one shared tape
   measure between them. The child clips where each thing ends (coral clip
   for the top thing, teal for the bottom one) and types how many cm longer
   the long one is. On Check the tape between the two clips is snipped out:
   the piece IS the gap and counts itself from zero. A wrong number is laid
   beside the piece as a dashed strip of the child's own length; a clip in
   the wrong place shades what it missed. In "loose starts" the things sit
   away from the wall and nothing is graded until both are pushed against it
   — lengths are compared from one start.
   ===================================================================== */
(function (root) {
  'use strict';
  /* each picture: its theme, the exact turn that lays it flat (0 or 90), and its ink box after that turn
     (fractions of the image side, relative to the image centre — measured from the pixels, alpha > 40) */
  var PICS = {
    caterpillar: { theme: 'insects and bugs', ang: 0, l: -0.4609, r: 0.4697, t: -0.3496, b: 0.3799 },
    centipede: { theme: 'insects and bugs', ang: 0, l: -0.4717, r: 0.4697, t: -0.2383, b: 0.2832 },
    key: { theme: 'around the house', ang: 90, l: -0.4883, r: 0.4834, t: -0.248, b: 0.2285 },
    glue: { theme: 'classroom', ang: 90, l: -0.4873, r: 0.4746, t: -0.1943, b: 0.166 },
    airplane: { theme: 'toys', ang: 0, l: -0.4727, r: 0.4746, t: -0.2236, b: 0.2246 },
    car: { theme: 'toys', ang: 0, l: -0.4766, r: 0.4727, t: -0.2822, b: 0.3262 },
    snail: { theme: 'insects and bugs', ang: 0, l: -0.4717, r: 0.4736, t: -0.3428, b: 0.3779 },
    goldfish: { theme: 'pets', ang: 0, l: -0.4844, r: 0.4814, t: -0.3848, b: 0.3994 },
    pinecone: { theme: 'miscellaneous', ang: 90, l: -0.4834, r: 0.4736, t: -0.3154, b: 0.3008 },
    grasshopper: { theme: 'forest creatures', ang: 0, l: -0.4746, r: 0.4766, t: -0.4063, b: 0.4258 },
    stapler: { theme: 'classroom', ang: 0, l: -0.4775, r: 0.4775, t: -0.2344, b: 0.249 },
    frog: { theme: 'camping', ang: 0, l: -0.4717, r: 0.4668, t: -0.3711, b: 0.3877 },
    wand: { theme: 'accessories', ang: 90, l: -0.4717, r: 0.4707, t: -0.1689, b: 0.166 },
    truck: { theme: 'toys', ang: 0, l: -0.4785, r: 0.4766, t: -0.29, b: 0.3438 },
    train: { theme: 'toys', ang: 0, l: -0.4766, r: 0.4756, t: -0.3379, b: 0.3672 },
    spoon: { theme: 'kitchen tools', ang: 90, l: -0.4863, r: 0.4814, t: -0.1533, b: 0.1035 },
    lizard: { theme: 'forest creatures', ang: 0, l: -0.4746, r: 0.4775, t: -0.3623, b: 0.3652 },
    fish: { theme: 'pets', ang: 0, l: -0.4766, r: 0.4834, t: -0.3145, b: 0.3281 },
    corn: { theme: 'vegetables', ang: 90, l: -0.4834, r: 0.4727, t: -0.2734, b: 0.2686 },
    brush: { theme: 'around the house', ang: 90, l: -0.4854, r: 0.4863, t: -0.2803, b: 0.2451 },
    parsnip: { theme: 'vegetables', ang: 90, l: -0.4814, r: 0.4785, t: -0.165, b: 0.1563 }
  };
  /* [top thing, its cm, bottom thing, its cm, loose starts (top, bottom)] — design §6 */
  var R12 = [
    ['caterpillar', 5, 'centipede', 7, [2, 1]], ['key', 7, 'glue', 10, [1, 3]], ['airplane', 11, 'car', 6, [1, 3]],
    ['snail', 4, 'goldfish', 5, [1, 2]], ['pinecone', 9, 'grasshopper', 5, [1, 2]], ['stapler', 12, 'frog', 7, [1, 3]],
    ['wand', 10, 'truck', 6, [3, 2]], ['train', 5, 'spoon', 12, [2, 1]], ['lizard', 7, 'fish', 8, [1, 2]]
  ];
  var R20 = [
    ['corn', 18, 'brush', 16, [1, 2]], ['stapler', 15, 'pinecone', 10, [3, 1]], ['spoon', 16, 'caterpillar', 6, [1, 3]],
    ['goldfish', 6, 'parsnip', 17, [1, 3]], ['centipede', 9, 'wand', 16, [2, 1]], ['grasshopper', 7, 'lizard', 9, [1, 3]],
    ['frog', 8, 'truck', 12, [3, 1]], ['airplane', 14, 'fish', 10, [2, 1]], ['car', 9, 'glue', 12, [3, 2]]
  ];

  function levelOf(v) { return String(v) === '20' ? '20' : '12'; }
  function startsOf(v) { return v === 'loose' ? 'loose' : 'lined'; }
  function maxOf(level) { return levelOf(level) === '20' ? 20 : 12; }
  function rounds(level) {
    level = levelOf(level);
    var T = level === '20' ? R20 : R12, max = maxOf(level);
    return T.map(function (x, i) {
      return { k: i, level: level, max: max, a: { obj: x[0], len: x[1], loose: x[4][0] }, b: { obj: x[2], len: x[3], loose: x[4][1] },
        gap: Math.abs(x[1] - x[3]), longer: x[1] > x[3] ? 'a' : 'b' };
    });
  }
  /* the picture's ink along (its length) and across, as fractions of the image side */
  function ink(obj) { var p = PICS[obj]; return { along: p.r - p.l, across: p.b - p.t }; }
  /* the short side in px of a thing drawn `len` cm long at u px per cm */
  function shortSide(obj, len, u) { var i = ink(obj); return len * u * i.across / i.along; }

  function newState(level, k, starts) {
    var pool = rounds(level), r = pool[k] || pool[0], loose = startsOf(starts) === 'loose';
    return { level: levelOf(level), k: r.k, round: r, loose: loose, startA: loose ? r.a.loose : 0, startB: loose ? r.b.loose : 0,
      clipA: null, clipB: null, typed: null, misses: 0, help: false, verdict: null, done: false };
  }
  function clear(st) { if (!st.done) st.verdict = null; }
  /* a clip rides the tape from 0 to max + 1, whole centimetres only */
  function placeClip(st, which, cm) {
    var max = st.round.max, v = Math.max(0, Math.min(max + 1, Math.round(+cm)));
    if (!(cm === cm) || cm == null) return false;
    var key = which === 'b' ? 'clipB' : 'clipA';
    if (st[key] === v) return false;
    st[key] = v; clear(st); return true;
  }
  /* loose starts: a thing slides along its lane (never past the tape's end); 0 = against the wall */
  function moveThing(st, which, cm) {
    if (!st.loose || st.done) return false;
    var t = which === 'b' ? st.round.b : st.round.a, key = which === 'b' ? 'startB' : 'startA';
    var v = Math.max(0, Math.min(st.round.max + 1 - t.len, Math.round(+cm)));
    if (st[key] === v) return false;
    st[key] = v; clear(st); return true;
  }
  function pushToWall(st, which) { return moveThing(st, which, 0); }
  function atWall(st) { return st.startA === 0 && st.startB === 0; }
  function endOf(st, which) { return which === 'b' ? st.startB + st.round.b.len : st.startA + st.round.a.len; }
  /* the keypad: up to two digits, never a leading zero */
  function typeDigit(st, d) {
    if (st.done) return false;
    d = String(d); if (!/^[0-9]$/.test(d)) return false;
    var s = st.typed == null ? '' : String(st.typed);
    if (s.length >= 2 || (s === '' && d === '0')) return false;
    st.typed = +(s + d); clear(st); return true;
  }
  function backspace(st) {
    if (st.done || st.typed == null) return false;
    var s = String(st.typed).slice(0, -1); st.typed = s === '' ? null : +s; clear(st); return true;
  }
  function check(st) {
    if (st.done) return { result: 'no' };
    var r = st.round;
    if (!atWall(st)) return { result: 'note', key: 'hintWall', which: st.startA !== 0 ? 'a' : 'b' };
    if (st.clipA === null || st.clipB === null) return { result: 'note', key: 'hintClips' };
    var kind = null;
    if (st.clipA !== r.a.len) kind = 'clipA';
    else if (st.clipB !== r.b.len) kind = 'clipB';
    else if (st.typed === null) return { result: 'note', key: 'hintType' };
    else if (st.typed !== r.gap) kind = 'number';
    if (!kind) { st.done = true; st.verdict = null; return { result: 'ok' }; }
    st.misses++; st.help = st.misses >= 2;
    st.verdict = { kind: kind, typed: st.typed };
    return { result: 'miss', kind: kind };
  }
  /* literal keys only (the reachability gate reads them) */
  function hint(st) {
    var v = st.verdict;
    if (!v) return null;
    if (v.kind === 'clipA') return 'hintClipA';
    if (v.kind === 'clipB') return 'hintClipB';
    return st.help ? 'hintDots' : 'hintGhost';
  }
  function okKey(r) { return r.longer === 'a' ? 'okTop' : 'okBottom'; }
  function okArgs(r) { var L = r[r.longer], S = r[r.longer === 'a' ? 'b' : 'a']; return { a: L.len, b: S.len, gap: r.gap }; }

  function passSize(level) { return rounds(level).length; }
  function shuffle(a, rnd) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  /* an order-only reshuffle per pass, never the previous order */
  function plan(level, pass, rnd, prev) {
    var ks = rounds(level).map(function (r) { return r.k; });
    for (var tries = 0; tries < 50; tries++) { var c = shuffle(ks.slice(), rnd); if (!prev || prev.join() !== c.join()) return c; }
    return ks.slice().reverse();
  }

  var api = { PICS: PICS, levelOf: levelOf, startsOf: startsOf, maxOf: maxOf, rounds: rounds, ink: ink, shortSide: shortSide, newState: newState,
    placeClip: placeClip, moveThing: moveThing, pushToWall: pushToWall, atWall: atWall, endOf: endOf, typeDigit: typeDigit, backspace: backspace,
    check: check, hint: hint, okKey: okKey, okArgs: okArgs, passSize: passSize, plan: plan };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.SnipTapeCore = api;
})(typeof window !== 'undefined' ? window : this);
