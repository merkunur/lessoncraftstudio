/* =====================================================================
   CORE — Puppet Speak  (puppet-speak-core.js)
   ---------------------------------------------------------------------
   Generic, LOCALE-NEUTRAL "say it clearly enough" cognition (the spec's
   `engine-puppet-speak.js`) — the head of a reusable referential-
   communication family. First skin: "Sock & Shadow" — CCSS SL.K.6 (the
   express-ideas-CLEARLY facet) + co-primary L.1.1.J. The child composes a
   spoken turn from meaning-tiles; SHADOW (who CANNOT see the bin) acts on
   the WORDS. A vague turn can't secretly succeed — Shadow honestly holds
   BOTH cups. The keystone: say ENOUGH, not too much (over-telling
   overwhelms Shadow's memory).

   Correctness is DERIVED from the match-set CARDINALITY + a memory cap,
   NEVER a stored `correctAnswer`. Politeness + feeling tiles are INERT
   (they don't filter). The build-gate proves under-spec ambiguates,
   over-spec overwhelms, and a random-tile-piler can't brute-force it.

   Slot taxonomy:
     • object  — required for a fetch turn (the head noun)
     • FILTERING attrs (narrow the match-set + count toward attrCount):
         color · size · position · reason
     • INERT slots (expressed, but never filter / never count): feeling · politeness

   Pure functions, no DOM. Mirrors mend-page-core.js / judge-balance-core.js.
   ===================================================================== */
(function (global) {
  'use strict';

  var FILTER_CATS = ['color', 'size', 'position', 'reason'];

  function filterCatsFor(round) {
    // which filtering categories actually VARY in this round's tray (the live axes)
    var tray = round.tray, cats = [];
    FILTER_CATS.forEach(function (c) {
      var vals = {}; tray.forEach(function (o) { if (o[c] != null) vals[o[c]] = 1; });
      if (Object.keys(vals).length >= 2) cats.push(c);
    });
    // mood rounds disambiguate purely by 'reason'
    if (round.listenerAction === 'mood') return ['reason'];
    return cats.filter(function (c) { return c !== 'reason'; });   // fetch uses color/size/position
  }

  // the live match set for a turn against the tray (object + each present filtering attr).
  function matchSet(round, turn) {
    var tray = round.tray;
    return tray.filter(function (o) {
      if (round.listenerAction !== 'mood') { if (turn.object == null || o.object !== turn.object) return false; }
      var a = turn.attrs || {};
      for (var i = 0; i < FILTER_CATS.length; i++) { var c = FILTER_CATS[i]; if (a[c] != null && o[c] !== a[c]) return false; }
      return true;
    });
  }

  function attrCount(turn) {
    var a = turn.attrs || {}, n = 0;
    FILTER_CATS.forEach(function (c) { if (a[c] != null) n++; });
    return n;   // feeling + politeness NOT counted (inert)
  }

  // smallest set of filtering categories whose target-values yield a singleton.
  function minimalSet(round) {
    var cats = filterCatsFor(round), target = round.tray[round.target];
    function turnFrom(subset) {
      var attrs = {}; subset.forEach(function (c) { attrs[c] = target[c]; });
      return round.listenerAction === 'mood' ? { attrs: attrs } : { object: target.object, attrs: attrs };
    }
    for (var k = 0; k <= cats.length; k++) {
      var subs = kSubsets(cats, k);
      for (var i = 0; i < subs.length; i++) { if (matchSet(round, turnFrom(subs[i])).length === 1) return subs[i]; }
    }
    return cats.slice();   // (shouldn't happen on a well-formed round)
  }
  function kSubsets(arr, k) {
    var out = []; (function rec(start, acc) { if (acc.length === k) { out.push(acc.slice()); return; } for (var i = start; i < arr.length; i++) { acc.push(arr[i]); rec(i + 1, acc); acc.pop(); } })(0, []);
    return out;
  }
  function memoryCap(round) { return minimalSet(round).length + 1; }   // minimal wins; ≥2 redundant overwhelms

  /* THE listener — DERIVED outcome, never stored. 'clear' requires the match set
     to be EXACTLY the target (describing the wrong object clearly = 'wrong'). */
  function resolve(round, turn) {
    var n = attrCount(turn), cap = memoryCap(round);
    if (n > cap) return { outcome: 'overwhelmed', matches: [] };
    var ms = matchSet(round, turn), target = round.tray[round.target];
    if (ms.indexOf(target) < 0) return { outcome: 'wrong', matches: ms };   // described something else / nothing
    if (ms.length === 1) return { outcome: 'clear', matches: ms };
    return { outcome: 'ambiguous', matches: ms, missingCategory: missingCategory(round, turn) };
  }

  // a category NOT yet in the turn that would split the current (ambiguous) match set.
  function missingCategory(round, turn) {
    var cats = filterCatsFor(round), a = turn.attrs || {}, ms = matchSet(round, turn);
    for (var i = 0; i < cats.length; i++) {
      var c = cats[i]; if (a[c] != null) continue;
      var vals = {}; ms.forEach(function (o) { vals[o[c]] = 1; });
      if (Object.keys(vals).length >= 2) return c;   // this axis differs across the matches
    }
    return cats.filter(function (c) { return a[c] == null; })[0] || null;
  }

  // structural-coherence gate: the head slot must be filled (no attribute-without-
  // noun, no empty/politeness-only turn is sayable).
  function coherent(round, turn) {
    if (round.listenerAction === 'mood') return turn.reason != null;          // mood needs the reason
    return turn.object != null;                                               // fetch needs the noun
  }

  /* a LOCALIZED TEMPLATE (EN) — NOT chip-concatenation (§A.13.54). */
  function utter(round, turn, lang) {
    if (round.listenerAction === 'mood') {
      return ('I feel ' + (turn.feeling || 'this') + (turn.reason ? ' because ' + REASON_TEXT[turn.reason] : '') + '.').replace(/\s+/g, ' ');
    }
    var a = turn.attrs || {}, parts = ['the'];
    if (a.size) parts.push(a.size); if (a.color) parts.push(a.color);
    parts.push(turn.object || '…'); if (a.position) parts.push('on ' + a.position);
    var s = parts.join(' '); if (turn.politeness) s += ', ' + turn.politeness; return s + '.';
  }
  var REASON_TEXT = { 'tower-fell': 'my tower fell down', 'lost-teddy': 'I lost my teddy', 'cant-reach': "I can't reach the shelf" };

  /* available chips for a round (derived from the tray + the inert flavor tiles). */
  function chipsFor(round) {
    if (round.listenerAction === 'mood') {
      return (round.chips || []).slice();   // mood authors its feelings + reasons + politeness explicitly
    }
    var seen = {}, chips = [];
    function add(slot, value) { var key = slot + ':' + value; if (value != null && !seen[key]) { seen[key] = 1; chips.push({ slot: slot, value: value }); } }
    round.tray.forEach(function (o) { add('object', o.object); });
    round.tray.forEach(function (o) { ['color', 'size', 'position'].forEach(function (c) { add(c, o[c]); }); });
    chips.push({ slot: 'politeness', value: 'please' });
    return chips;
  }

  /* ---- the dumb-solver gauntlet (the gate drives these) ---- */
  function minimalTurn(round) {
    var target = round.tray[round.target], set = minimalSet(round), attrs = {};
    set.forEach(function (c) { attrs[c] = target[c]; });
    return round.listenerAction === 'mood' ? { reason: target.reason, attrs: { reason: target.reason }, feeling: 'sad' } : { object: target.object, attrs: attrs };
  }
  function lazyVague(round) { return round.listenerAction === 'mood' ? { attrs: {} } : { object: round.tray[round.target].object, attrs: {} }; }
  function politeOnly(round) { return { politeness: 'please', attrs: {} }; }
  // the non-reading piler: add RANDOM attribute chip values (may be wrong), one per
  // slot, until non-ambiguous. Wrong value → 'wrong'; overshoot cap → 'overwhelmed';
  // only the lucky right-values-within-cap path → 'clear'. Models a child who piles
  // tiles without reading the bin.
  function randomTilePiler(round, rng) {
    var target = round.tray[round.target];
    var chips = chipsFor(round).filter(function (c) { return ['color', 'size', 'position', 'reason'].indexOf(c.slot) >= 0; });
    var order = chips.slice(); for (var i = order.length - 1; i > 0; i--) { var j = Math.floor(rng() * (i + 1)); var t = order[i]; order[i] = order[j]; order[j] = t; }
    var attrs = {}, turn = round.listenerAction === 'mood' ? { attrs: attrs } : { object: target.object, attrs: attrs };
    for (var k = 0; k < order.length; k++) {
      var r = resolve(round, turn);
      if (r.outcome === 'clear') return 'clear';
      if (r.outcome === 'overwhelmed' || r.outcome === 'wrong') return r.outcome;
      var c = order[k]; if (attrs[c.slot] != null) continue;   // one value per slot
      attrs[c.slot] = c.value;
    }
    return resolve(round, turn).outcome;
  }

  global.PuppetSpeakCore = {
    FILTER_CATS: FILTER_CATS,
    filterCatsFor: filterCatsFor, matchSet: matchSet, attrCount: attrCount,
    minimalSet: minimalSet, memoryCap: memoryCap, resolve: resolve, missingCategory: missingCategory,
    coherent: coherent, utter: utter, chipsFor: chipsFor, REASON_TEXT: REASON_TEXT,
    SOLVERS: { minimalTurn: minimalTurn, lazyVague: lazyVague, politeOnly: politeOnly, randomTilePiler: randomTilePiler }
  };

}(typeof window !== 'undefined' ? window : this));
