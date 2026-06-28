/* =====================================================================
   QUILL'S MIRROR MARKET — CORE  (opposites-core.js)
   ---------------------------------------------------------------------
   CCSS K.L.5.b — relate frequently-occurring verbs/adjectives to their
   OPPOSITES (antonyms). Pure cognition, NO DOM. 0 lines to ANY existing core
   (rhyme-shop/field-guide/graph-it/bramble/…) + lcs-shell.

   The cognition = the SAME-DIMENSION word at the OPPOSITE pole, DISCRIMINATED
   from a same-dimension SIBLING that is NOT the opposite (black→white, NOT red).
   The mechanic is trivial — the DECOY STRUCTURE is the standard.

   TOKEN = { word, glyph, relation, dimension }:
     • relation ∈ opposite | same-dim-sibling | related | synonym | unrelated
       — the oracle DERIVES the answer as relation==='opposite'; a hand-authored
         isCorrect flag would be IGNORED (none is stored).
     • dimension — the broad axis (color/direction/motion/…); the DIMENSION-MATCH
       cheat keys on it. On a CATEGORICAL round BOTH the opposite AND the same-
       dim sibling carry the target's dimension → "pick the same-dimension word"
       cannot disambiguate → ≤ chance (the critic's deepest fix).
     • glyph — a CODE-DRAWN descriptor {type,param} (no library photos).
   The target's `oppositionId` (= its dimension) is GATE-ONLY, NEVER rendered.

   COMPLEMENTARY rounds (binary or gradable-without-a-discrete-sibling:
   open/closed, big/small, hot/cold) are tagged + EXEMPT from dimension-match-
   fails (rote IS the K standard) + CAPPED in deck share.

   THE GATE-CAN'T-CHEAT PROOF (verify-opposites-core.js): an opposite-relation
   ORACLE wins 100% while the DIMENSION-MATCH solver (the critic's deepest) /
   ASSOCIATION / FAMILIAR-PAIR / FIRST-RANDOM all score ≤ chance on the
   categorical rounds — a same-dimension distractor is what makes opposition
   load-bearing (the cohort's association-only gate was blind to the dimension
   heuristic).
   ===================================================================== */
(function (global) {
  'use strict';

  /* the 7 distinct child-ACTIONS (operator INVEST) */
  var SINGLE_OPPOSITE = { 'pick': 1, 'generate': 1, 'balance': 1, 'verb': 1 };  /* oracle = the opposite choice index */
  var COGS = ['pick', 'route', 'oddpair', 'scene', 'generate', 'balance', 'verb'];

  function choicesOf(r) { return r.choices || []; }

  /* oracle(round) — the correct response, DERIVED from `relation`, per ACTION. */
  function oracle(round) {
    switch (round.cog) {
      case 'pick': case 'generate': case 'balance': case 'verb': {
        var cs = choicesOf(round);
        for (var i = 0; i < cs.length; i++) if (cs[i].relation === 'opposite') return i;
        return -1;
      }
      case 'route':   /* each stream word → door 0 ('opposite of anchor') or 1 ('same kind') */
        return (round.stream || []).map(function (t) { return t.relation === 'opposite' ? 0 : 1; });
      case 'oddpair': {  /* the index of the pair that is NOT an opposite-pair */
        var ps = round.pairs || [];
        for (var j = 0; j < ps.length; j++) if (ps[j].relation !== 'opposite') return j;
        return -1;
      }
      case 'scene':   /* every element starts in the WRONG state → all must flip */
        return (round.elements || []).map(function (_, k) { return k; });
      default: return -1;
    }
  }

  function isAnswer(round, response) {
    var ans = oracle(round);
    if (round.cog === 'route') {
      /* POSITION-SENSITIVE: response[i] = the door chosen for stream token i.
         A set-comparison would let a child swap white↔red across the doors and
         still pass; opposition is per-token, so compare element-wise. */
      if (!Array.isArray(response) || response.length !== ans.length) return false;
      for (var i = 0; i < ans.length; i++) if (Number(response[i]) !== Number(ans[i])) return false;
      return true;
    }
    if (round.cog === 'scene') {
      /* a SET: which element indices were flipped (every element must flip) */
      if (!Array.isArray(response) || response.length !== ans.length) return false;
      var a = response.slice().sort(), b = ans.slice().sort();
      for (var j = 0; j < b.length; j++) if (Number(a[j]) !== Number(b[j])) return false;
      return true;
    }
    return Number(response) === Number(ans);
  }

  function isCategorical(round) {
    return !round.complementary && !!SINGLE_OPPOSITE[round.cog];
  }

  /* every token across a round (gate-side) */
  function allTokens(round) {
    var out = [];
    if (round.target) out.push(round.target);
    choicesOf(round).forEach(function (t) { out.push(t); });
    (round.stream || []).forEach(function (t) { out.push(t); });
    (round.pairs || []).forEach(function (p) { if (p.a) out.push(p.a); if (p.b) out.push(p.b); });
    (round.elements || []).forEach(function (e) { out.push(e); });
    if (round.anchor) out.push(round.anchor);
    return out;
  }

  function correctChoice(round) {
    var ans = oracle(round);
    if (SINGLE_OPPOSITE[round.cog]) return ans >= 0 ? choicesOf(round)[ans] : null;
    return null;
  }

  /* snapshot — the renderer's view. word + glyph ONLY; NO oppositionId, NO
     relation, NO answer. */
  function strip(t) { return t ? { word: t.word, glyph: t.glyph } : null; }
  function snapshot(round) {
    return {
      cog: round.cog,
      target: round.target ? { word: round.target.word, glyph: round.target.glyph, pos: round.target.pos || null } : null,
      choices: choicesOf(round).map(strip),
      stream: (round.stream || []).map(strip),
      pairs: (round.pairs || []).map(function (p) { return { a: strip(p.a), b: strip(p.b) }; }),
      elements: (round.elements || []).map(function (e) { return { word: e.word, glyph: e.glyph }; }),
      anchor: round.anchor ? { word: round.anchor.word } : null,
      doors: round.cog === 'route' ? ['opposite', 'same-kind'] : null
      /* deliberately NO oppositionId, NO relation, NO answer */
    };
  }

  function facts(round) {
    var cs = choicesOf(round);
    var oid = round.target ? round.target.oppositionId : null;
    var correct = correctChoice(round);
    /* dimension-match: how many choices share the target's dimension */
    var sameDim = cs.filter(function (c) { return c.dimension && c.dimension === oid; });
    var sibling = cs.filter(function (c) { return c.relation === 'same-dim-sibling'; });
    /* opposite is NOT the most-associated: a related/sibling choice is present */
    var hasAssociate = cs.some(function (c) { return c.relation === 'same-dim-sibling' || c.relation === 'related' || c.relation === 'synonym'; });
    var cat = isCategorical(round);
    return {
      cog: round.cog,
      answerFromRelationNotStored: true,
      sameDimensionNonOppositeNonMiddleDecoyPresent: cat ? sibling.length >= 1 : true,
      dimensionMatchSolverFails: cat ? sameDim.length >= 2 : true,   /* opposite + sibling both share the dim */
      noGradableMiddleAsChoice: true,                                 /* validated vs the SoT in the gate */
      oppositionIdNotRendered: true,
      verbRoundHasSameAxisNonOppositeMotion: round.cog !== 'verb' || sibling.length >= 1,
      oppositeIsNotMostAssociated: !cat || hasAssociate,
      multiplePlausibleChoices: !SINGLE_OPPOSITE[round.cog] || cs.length >= 3,
      correctNotIndex0: !SINGLE_OPPOSITE[round.cog] || oracle(round) > 0,
      choicesImageAnchored: allTokens(round).every(function (t) { return t.glyph && t.glyph.type; }),
      isCategorical: cat, isComplementary: !!round.complementary
    };
  }

  function deckFacts(rounds) {
    var distinct = {}, perCog = {};
    rounds.forEach(function (r) { distinct[r.cog] = 1; perCog[r.cog] = (perCog[r.cog] || 0) + 1; });
    var comp = rounds.filter(function (r) { return r.complementary; }).length;
    return {
      total: rounds.length,
      distinctCogs: Object.keys(distinct),
      perCog: perCog,
      complementaryShare: rounds.length ? comp / rounds.length : 0,
      categoricalCount: rounds.filter(isCategorical).length
    };
  }

  function audit(round) {
    return {
      id: round.id, cog: round.cog, complementary: !!round.complementary, categorical: isCategorical(round),
      oppositionId: round.target ? round.target.oppositionId : null,
      oracle: oracle(round),
      choices: choicesOf(round).map(function (c) { return { word: c.word, relation: c.relation, dimension: c.dimension || null }; }),
      stream: (round.stream || []).map(function (t) { return { word: t.word, relation: t.relation }; }),
      pairs: (round.pairs || []).map(function (p) { return { a: p.a && p.a.word, b: p.b && p.b.word, relation: p.relation }; }),
      tokens: allTokens(round).map(function (t) { return { word: t.word, glyph: t.glyph }; })
    };
  }

  global.OppositesCore = {
    COGS: COGS, SINGLE_OPPOSITE: SINGLE_OPPOSITE,
    oracle: oracle, isAnswer: isAnswer, isCategorical: isCategorical, allTokens: allTokens, correctChoice: correctChoice,
    snapshot: snapshot, facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
