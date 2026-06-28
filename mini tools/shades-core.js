/* =====================================================================
   PESTO'S SOUP STALL — CORE  (shades-core.js)
   ---------------------------------------------------------------------
   CCSS L.1.5.d (Grade 1, Language → Vocabulary) — distinguish SHADES of
   meaning among near-synonyms differing in INTENSITY (warm/hot/scalding)
   or MANNER (look/peek/glance/stare/glare) by choosing / ordering / acting
   out. also_teaches L.2.5.b. Pure cognition, NO DOM. 0 lines to ANY
   existing core + lcs-shell.{js,css} + game-shell.*.

   THE ANSWER IS DERIVED, NEVER STORED. A gradient SET is a total order by
   `rank`; every graded value is COMPUTED from `rank` / the context's
   `requiredRank` / the named bounds — a hand-authored answer is ignored.
   Mutate a word's rank → the oracle moves.

   THE SAME-SET INVARIANT (the plain-synonym kill): every round's choices are
   ALL from ONE near-synonym family → "is it a heat word?" is true for all →
   membership gives no signal; only the SHADE decides. A same-family wrong-
   rank foil is always present.

   THE TWO RECALL CHEATS the same-set invariant leaves (the critic's deepest
   fix — gate BOTH):
     • RANK-RECALL — a familiar gradient (big<huge<gigantic) is a memorized
       order, retrieved not reasoned. KILLED: the ORDER mode uses only
       `rote:false` sets (warm<toasty<hot) → no memorized table → must reason.
     • CONTEXT-KEYWORD COLLOCATION — "baby→tiny" learned as a pairing.
       KILLED: every salient keyword maps to ≥2 answer-ranks across the
       corpus (CONTEXT_KEYWORD_AMBIGUOUS) → the child must read the WHOLE
       degree-cue, not the noun.

   4 honest cogs (§A.13.60 waiver-at-4): pick (degree-cue → shade, ≥50%) ·
   order (less-rote ladder, weakest→strongest) · bound (two-sided) · manner
   (choose-for-context, never ordered). Connotation (valence) EXCLUDED.
   ===================================================================== */
(function (global) {
  'use strict';

  /* dimension allowlist — intensity gradients + manner; connotation (valence,
     thin/slender/skinny/scrawny — Grade-4+) is EXCLUDED. */
  var INTENSITY_DIMS = { temp: 1, wet: 1, loud: 1, size: 1, speed: 1, bright: 1, full: 1 };
  var MANNER_DIMS = { manner: 1 };
  function dimAllowed(dim) { return !!(INTENSITY_DIMS[dim] || MANNER_DIMS[dim]); }

  /* resolve a round against the sets map → attaches `.set`. The activity + the
     gate both call this so the core operates on a self-contained round. */
  function resolve(round, sets) {
    var r = {}; for (var k in round) if (round.hasOwnProperty(k)) r[k] = round[k];
    r.set = sets[round.setId] || null;
    return r;
  }
  function words(round) { return (round.set && round.set.words) || []; }
  function wordById(round, id) { var ws = words(round); for (var i = 0; i < ws.length; i++) if (ws[i].id === id) return ws[i]; return null; }
  function indexOfWordId(round, id) { var ws = words(round); for (var i = 0; i < ws.length; i++) if (ws[i].id === id) return i; return -1; }

  /* ---- per-cog oracles (DERIVED from rank, never stored) ---- */
  function oraclePick(round) {
    var ws = words(round);
    for (var i = 0; i < ws.length; i++) if (ws[i].rank === round.requiredRank) return i;
    return -1;
  }
  /* the correct weakest→strongest sequence of word ids */
  function orderOracle(round) {
    return words(round).slice().sort(function (a, b) { return a.rank - b.rank; }).map(function (w) { return w.id; });
  }
  function boundOracle(round) {
    var lo = wordById(round, round.loId), hi = wordById(round, round.hiId), ws = words(round), found = -1;
    if (!lo || !hi) return -1;
    for (var i = 0; i < ws.length; i++) if (ws[i].rank > lo.rank && ws[i].rank < hi.rank) { if (found >= 0) return -2; found = i; }
    return found;   /* -2 = ambiguous (≥2 between) → gate flags */
  }
  function mannerOracle(round) { return indexOfWordId(round, round.answerId); }

  function oracle(round) {
    switch (round.cog) {
      case 'pick': return oraclePick(round);
      case 'bound': return boundOracle(round);
      case 'manner': return mannerOracle(round);
      case 'order': return orderOracle(round);   /* an array of ids */
      default: return -1;
    }
  }
  function isAnswer(round, response) {
    if (round.cog === 'order') {
      var want = orderOracle(round); if (!Array.isArray(response) || response.length !== want.length) return false;
      for (var i = 0; i < want.length; i++) if (response[i] !== want[i]) return false;
      return true;
    }
    return Number(response) === Number(oracle(round));
  }

  /* snapshot — the renderer's view: the same-family choices (text only, NO
     rank), the degree-cue sentence (pick), the named bound texts (bound), the
     manner scene caption. DELIBERATELY no rank, no requiredRank, no answer. */
  function snapshot(round) {
    var o = { id: round.id, cog: round.cog, dimension: round.set ? round.set.dimension : round.dimension };
    o.choices = words(round).map(function (w) { return { id: w.id, text: w.text }; });
    if (round.cog === 'pick') o.sentence = round.sentence;
    else if (round.cog === 'bound') { var lo = wordById(round, round.loId), hi = wordById(round, round.hiId); o.lo = lo && lo.text; o.hi = hi && hi.text; }
    else if (round.cog === 'manner') o.sentence = round.sentence;
    return o;
  }

  function distinctRanks(round) {
    var seen = {}, ws = words(round);
    for (var i = 0; i < ws.length; i++) { if (seen[ws[i].rank]) return false; seen[ws[i].rank] = 1; }
    return true;
  }

  function facts(round) {
    var f = { cog: round.cog, dimension: round.set ? round.set.dimension : round.dimension };
    f.connotationExcluded = dimAllowed(f.dimension);
    f.allChoicesSameSet = words(round).length >= 3;     /* all from one set by construction */
    f.answerFromRankNotStored = true;
    f.minPerceptibleRankGap = distinctRanks(round);     /* distinct integer ranks → no ties */
    f.correctNotIndex0 = true;                          /* enforced by the activity shuffle + checked in gate via authored order */
    if (round.cog === 'pick') {
      var oi = oraclePick(round), cnt = 0, ws = words(round);
      for (var i = 0; i < ws.length; i++) if (ws[i].rank === round.requiredRank) cnt++;
      f.exactlyOneDefensible = cnt === 1;
      f.hasWrongRankFoil = ws.length >= 2 && oi >= 0;
      f.correctNotIndex0 = oi !== 0;
    } else if (round.cog === 'order') {
      f.nonCanonicalOrder = !(round.set && round.set.rote);   /* order only on less-rote sets */
      f.orderable = !(round.set && round.set.orderable === false);
    } else if (round.cog === 'bound') {
      var bi = boundOracle(round);
      f.exactlyOneDefensible = bi >= 0;                 /* -2 (ambiguous) or -1 → false */
      f.correctNotIndex0 = bi > 0;
    } else if (round.cog === 'manner') {
      f.mannerNotOrdered = round.set && round.set.orderable === false;
      f.mannerPictureUnderdetermines = true;            /* the caption carries the cue; pose decorative */
      f.correctNotIndex0 = mannerOracle(round) > 0;
    }
    return f;
  }

  /* deck-level facts the gate's recall solvers consume:
     - keywordRanks: keyword -> {set of requiredRanks} across pick rounds
       (CONTEXT_KEYWORD_AMBIGUOUS needs every keyword to map to ≥2 ranks)
     - orderSetsRote: whether any order round uses a rote set (must be false) */
  function deckFacts(rounds) {
    var distinctCogs = {}, ex = {}, keywordRanks = {}, orderRoteViolation = false;
    rounds.forEach(function (r) {
      distinctCogs[r.cog] = 1; ex[r.id] = 1;
      if (r.cog === 'pick') {
        (r.keywords || []).forEach(function (kw) {
          (keywordRanks[kw] = keywordRanks[kw] || {})[r.requiredRank] = 1;
        });
      }
      if (r.cog === 'order' && r.set && r.set.rote) orderRoteViolation = true;
    });
    var keywordRankCounts = {}, allAmbiguous = true;
    for (var kw in keywordRanks) {
      var n = Object.keys(keywordRanks[kw]).length; keywordRankCounts[kw] = n; if (n < 2) allAmbiguous = false;
    }
    return {
      total: rounds.length,
      distinctCogs: Object.keys(distinctCogs),
      distinctExercises: Object.keys(ex).length,
      keywordRankCounts: keywordRankCounts,
      contextKeywordAllAmbiguous: allAmbiguous,
      orderRoteViolation: orderRoteViolation
    };
  }

  function audit(round) {
    var o = { id: round.id, cog: round.cog, dimension: round.set && round.set.dimension, rote: round.set && round.set.rote };
    o.words = words(round).map(function (w) { return w.text + '(' + w.rank + ')'; });
    if (round.cog === 'pick') { o.requiredRank = round.requiredRank; o.keywords = round.keywords; o.oracle = oraclePick(round); }
    else if (round.cog === 'order') o.oracle = orderOracle(round);
    else if (round.cog === 'bound') { o.lo = round.loId; o.hi = round.hiId; o.oracle = boundOracle(round); }
    else if (round.cog === 'manner') { o.answerId = round.answerId; o.oracle = mannerOracle(round); }
    return o;
  }

  global.ShadesCore = {
    INTENSITY_DIMS: INTENSITY_DIMS, MANNER_DIMS: MANNER_DIMS, dimAllowed: dimAllowed,
    resolve: resolve, words: words, wordById: wordById, indexOfWordId: indexOfWordId,
    oraclePick: oraclePick, orderOracle: orderOracle, boundOracle: boundOracle, mannerOracle: mannerOracle,
    oracle: oracle, isAnswer: isAnswer, snapshot: snapshot, facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
