/* =====================================================================
   fair-ribbon-core.js — the model of ACTIVITY #91, THE FAIR RIBBON ("The
   Sharing Jar — Make It Fair", 1.OA.D.8). Pure, no DOM.
   Design sheet: docs/activities-rebuild/designs/091-sharing-jar.md
   ---------------------------------------------------------------------
   Two glass jars of beads — Pim's and Bo's — and a gold ribbon tied across
   both at the FAIR height. The child says a number first (taps a tile),
   then Check makes exactly that many beads move. The right number stops
   the beads on the ribbon; too few leaves a gap (or beads still above
   it); too many pushes past it and now the other friend has less. Five
   story kinds (MORE, HOW MANY MORE, GIVE BACK, PUT BACK, START), clear jars
   to 10 and frosted jars to 20.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.FairRibbonCore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  var LOCALES = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
  var LEVELS = ['clear', 'frosted'], STORIES = ['all', 'more'], TOP = { clear: 10, frosted: 20 };
  /* a jar holds CAP layers; ROOM more can heap above its rim (an overshoot) — anything past that is not drawn */
  var CAP = { clear: 12, frosted: 20 }, ROOM = 2;
  /* the rounds: [kind, x, y] — more: Pim x, Bo y · hmm: Pim x, Bo y · give: Bo had x, has y · put: Pim x, Bo y · start: got x, now y */
  var ROUNDS = {
    clear: { all: [['more', 5, 3], ['hmm', 6, 2], ['give', 7, 4], ['put', 6, 4], ['start', 4, 7], ['more', 9, 4], ['hmm', 10, 2], ['put', 8, 2], ['more', 10, 1]],
      more: [['more', 5, 3], ['hmm', 6, 2], ['more', 9, 4], ['hmm', 10, 2], ['more', 10, 1], ['more', 7, 4], ['hmm', 9, 5]] },
    frosted: { all: [['more', 8, 5], ['hmm', 12, 8], ['put', 9, 5], ['more', 18, 6], ['hmm', 19, 8], ['give', 12, 4], ['put', 17, 3], ['start', 6, 13], ['more', 15, 9]],
      more: [['more', 8, 5], ['hmm', 12, 8], ['more', 18, 6], ['hmm', 19, 8], ['more', 15, 9], ['more', 16, 9], ['hmm', 20, 7]] }
  };
  var FRIENDS = { pim: ['forest creatures', 'hedgehog'], bo: ['forest creatures', 'mouse'] };

  function levelOf(l) { return LEVELS.indexOf(l) >= 0 ? l : 'clear'; }
  function storyOf(s) { return STORIES.indexOf(s) >= 0 ? s : 'all'; }
  function locale(l) { l = String(l || 'en').slice(0, 2).toLowerCase(); return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function table(level, story) { return ROUNDS[levelOf(level)][storyOf(story)]; }
  function ids(level, story) { var n = table(level, story).length, out = []; for (var i = 0; i < n; i++) out.push(i); return out; }
  function shuffle(a, rnd) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  /* a round: the jars before (pim, bo), the ribbon, the answer */
  function round(level, story, idx) {
    level = levelOf(level); story = storyOf(story);
    var row = table(level, story)[idx], k = row[0], x = row[1], y = row[2], r = { level: level, story: story, idx: idx, kind: k, top: TOP[level], x: x, y: y, mark: null, fresh: 0 };
    if (k === 'more') { r.pim = x; r.bo = y; r.ribbon = x; r.ans = x - y; }
    else if (k === 'hmm') { r.pim = x; r.bo = y; r.ribbon = y; r.ans = x - y; }
    else if (k === 'give') { r.pim = 2 * x - y; r.bo = y; r.ribbon = x; r.mark = x; r.ans = x - y; }
    else if (k === 'put') { r.pim = x; r.bo = y; r.ribbon = y; r.ans = x - y; }
    else { r.pim = y; r.bo = y; r.ribbon = y; r.fresh = x; r.ans = y - x; }   /* start: Bo got x and now has y; Pim has y too */
    return r;
  }
  /* what the jars show when n beads act — every layer of each jar, bottom up:
     'b' a bead · 'mv' a bead that just moved in · 'new' a just-got bead (START) · 'st' a start bead (START)
     'over' a bead past the ribbon / overlapping (coral) · 'still' an extra bead still above the ribbon (coral) · 'dash' an empty layer up to the ribbon */
  function act(r, n) {
    var P = [], B = [], i, lifted = 0, res = n === r.ans ? 'fair' : (r.kind === 'start' ? (n < r.ans ? 'gap' : 'overlap') : (n < r.ans ? 'short' : 'over'));
    var fill = function (arr, count, kind) { for (var k = 0; k < count; k++) arr.push(kind); };
    if (r.kind === 'more' || r.kind === 'give') {
      var give = r.kind === 'give' ? Math.min(n, r.pim) : n;
      fill(P, r.kind === 'give' ? r.pim - give : r.pim, 'b');
      fill(B, r.bo, 'b');
      for (i = 0; i < give; i++) B.push(r.bo + i + 1 > r.ribbon ? 'over' : 'mv');
      if (r.bo + give < r.ribbon) fill(B, r.ribbon - r.bo - give, 'dash');
    } else if (r.kind === 'hmm' || r.kind === 'put') {
      var take = Math.min(n, r.pim), left = r.pim - take;
      for (i = 0; i < left; i++) P.push(i + 1 > r.ribbon ? 'still' : 'b');
      if (left < r.ribbon) fill(P, r.ribbon - left, 'dash');
      fill(B, r.bo, 'b'); lifted = take;
    } else {
      fill(P, r.pim, 'b');
      for (i = 0; i < r.bo; i++) { var isStart = i < n, isNew = i >= r.bo - r.fresh; B.push(isStart && isNew ? 'over' : isStart ? 'st' : isNew ? 'new' : (n < r.ans ? 'gapb' : 'b')); }
    }
    var lim = CAP[r.level] + ROOM; P = P.slice(0, lim); B = B.slice(0, lim);
    /* the beads a second miss numbers: are there exactly |n − answer| of them to count? (not when the number is past what can move — more than Pim has, or beyond the rim) */
    var mk = markOf(r, n), want = mk === 'dash' ? ['dash', 'gapb'] : ['over', 'still'], marks = 0;
    if (mk) P.concat(B).forEach(function (k) { if (want.indexOf(k) >= 0) marks++; });
    return { P: P, B: B, lifted: lifted, result: res, diff: Math.abs(n - r.ans), mark: mk, marks: marks, fits: !mk || marks === Math.abs(n - r.ans) };
  }
  /* the help's mark after a miss: dashed layers or coral beads */
  function markOf(r, n) {
    if (n === r.ans) return null;
    var short = n < r.ans;
    if (r.kind === 'more' || r.kind === 'give') return short ? 'dash' : 'glow';
    if (r.kind === 'hmm' || r.kind === 'put') return short ? 'glow' : 'dash';
    return short ? 'dash' : 'glow';
  }
  /* the jars at rest (before any Check) */
  function rest(r) {
    var P = [], B = [], i;
    for (i = 0; i < r.pim; i++) P.push('b');
    for (i = 0; i < r.bo; i++) B.push(r.kind === 'start' && i >= r.bo - r.fresh ? 'new' : 'b');
    return { P: P, B: B, lifted: 0 };
  }
  /* who is quiet: at rest the friend with less; after an overshoot Pim (the story flips); when fair, nobody */
  function mood(r, res) {
    if (res === 'fair') return { pim: 'glow', bo: 'glow', lean: true };
    if (res === 'over') return { pim: 'quiet', bo: 'glow', lean: false };
    if (r.kind === 'start') return { pim: 'glow', bo: 'glow', lean: false };
    return { pim: 'glow', bo: 'quiet', lean: false };
  }

  /* ---- order: never the previous pass; no equal answers side by side; (all) every kind in the first five ---- */
  function orderOk(level, story, order) {
    for (var i = 1; i < order.length; i++) if (round(level, story, order[i]).ans === round(level, story, order[i - 1]).ans) return false;
    if (storyOf(story) === 'all') { var seen = {}; for (var k = 0; k < 5; k++) seen[round(level, story, order[k]).kind] = 1; if (Object.keys(seen).length < 5) return false; }
    return true;
  }
  function plan(level, story, rnd, prev) {
    var all = ids(level, story), order = all, ok = false, n = all.length;
    for (var k = 0; k < 20000 && !ok; k++) { order = shuffle(all, rnd); ok = orderOk(level, story, order) && !(prev && prev.length && prev.join() === order.join()); }
    /* the swap mask: Bo at the left jar in 4 of 9 (3 of 7) rounds, so the fuller jar is not always on one side */
    var mask = shuffle(all.map(function (i) { return i < Math.floor((n - 1) / 2); }), rnd);
    return { order: order, swap: mask };
  }

  /* ---- state ---- */
  function newState(r) { return { r: r, chosen: null, misses: 0, show: 0, last: null, done: false, acted: null }; }
  function choose(st, n) {
    if (st.done) return false;
    n = Math.round(+n); if (!(n >= 1 && n <= st.r.top)) return false;
    if (n === st.chosen) return false;
    st.chosen = n; st.show = 0; st.last = null; st.acted = null; return true;
  }
  function check(st) {
    if (st.done) return null;
    if (st.chosen == null) { st.last = { reason: 'none' }; return { result: 'none' }; }
    var a = act(st.r, st.chosen); st.acted = a;
    if (a.result === 'fair') { st.done = true; st.last = { reason: 'fair' }; return a; }
    st.misses++; st.show = Math.min(2, st.misses); st.last = { reason: a.result, mark: a.mark, diff: a.diff, fits: a.fits };
    return a;
  }
  function hint(st) {
    var L = st.last; if (!L) return null;
    if (L.reason === 'none') return 'hNone';
    if (L.reason === 'fair') return null;
    if (st.show >= 2) return !L.fits ? 'hTooFar' : L.mark === 'dash' ? 'hCountDash' : 'hCountGlow';
    var k = st.r.kind;
    if (k === 'start') return 'hStart';
    if (L.reason === 'over') return 'hOver';
    return k === 'more' || k === 'give' ? 'hGap' : 'hAbove';
  }
  function layout(W) { var wide = W >= 560; return { wide: wide, tiny: W < 330, W: W }; }
  return {
    DATA: { ROUNDS: ROUNDS, FRIENDS: FRIENDS }, LOCALES: LOCALES, LEVELS: LEVELS, STORIES: STORIES, TOP: TOP, CAP: CAP, ROOM: ROOM,
    levelOf: levelOf, storyOf: storyOf, locale: locale, ids: ids, shuffle: shuffle, round: round, act: act, markOf: markOf, rest: rest, mood: mood,
    orderOk: orderOk, plan: plan, newState: newState, choose: choose, check: check, hint: hint, layout: layout
  };
});
