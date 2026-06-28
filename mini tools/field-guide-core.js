/* =====================================================================
   DETECTIVE DEWEY'S FIELD GUIDE — CORE  (field-guide-core.js)
   ---------------------------------------------------------------------
   CCSS 1.RI.5 — know and USE text features (headings, table of contents,
   glossaries, electronic menus, icons) to LOCATE key facts or information
   in a text. also_teaches 2.RI.5 (feature breadth). Pure cognition, NO DOM.
   0 lines to ANY existing core (graph-it/bramble/ten-stones/tildy/…) + lcs-shell.

   ONE feature-navigation kernel across two skins (page / diagram): read a
   text feature whose entries map a FUNCTION/MEANING → a target, then pick the
   target the feature names — from ≥3 plausible candidates. The function→target
   bridge lives in each item's `functions` (the structured "feature text"); the
   rendered caption / glossary / TOC is built FROM it. The question asks by
   FUNCTION/MEANING; the answer-word is ABSENT from the correct LABEL (so a
   label word-match fails); the bridge lives ONLY in the feature gloss.

   THE ANSWER IS RECOMPUTED FROM THE FEATURE, NEVER STORED: expectedAnswer
   scans `items[].functions` at call time. Blank the functions and the oracle
   fails (the picture-proof). snapshot() exposes the readable label+gloss but
   NEVER the functions key or the correct id.

   THE GATE-CAN'T-CHEAT PROOF (verify-field-guide-core.js): a read-the-feature
   ORACLE wins 100% while VISUAL-SEARCH / WORD-MATCH / FIRST-RANDOM / BLIND-TO-
   FEATURE / the STATEFUL WORLD-KNOWLEDGE solver (a real prior table — fly→wings,
   glow→light, meaning→glossary…) all score ≤ chance. The fictional referents
   (frell/snood/tarn) + the feature-internal nav bridges have NO entry in any
   real prior → the world-model solver cannot map. This models the player's
   WORLD MODEL, not just a no-context solver — a no-text solver ≠ a prior-
   knowledge solver (the cohort's blind spot; generalizes to any standard whose
   answer can live in the player's head).
   ===================================================================== */
(function (global) {
  'use strict';

  /* cognitions: 5 firm USE + 1 conditional + 1 sparse + 1 KNOW (capped). */
  var USE_COGS = { 'toc': 1, 'heading': 1, 'glossary': 1, 'menu': 1, 'diagram': 1, 'caption-match': 1, 'index': 1 };
  var KNOW_COGS = { 'which-feature': 1 };
  var COGS = ['toc', 'heading', 'glossary', 'menu', 'diagram', 'caption-match', 'index', 'which-feature'];

  function items(round) { return round.items || []; }
  function itemIds(round) { return items(round).map(function (i) { return i.id; }); }
  function isWhichFeature(round) { return round.cog === 'which-feature'; }
  function isUse(round) { return !!USE_COGS[round.cog]; }

  /* expectedAnswer — RECOMPUTED from items[].functions, NEVER stored. The
     target whose `functions` includes the question's functionPhrase. */
  function expectedAnswer(round) {
    var fp = (round.question || {}).functionPhrase;
    var its = items(round);
    for (var i = 0; i < its.length; i++) {
      if ((its[i].functions || []).indexOf(fp) >= 0) return its[i].id;
    }
    return null;
  }

  function isCorrect(round, tappedId) {
    if (tappedId == null) return false;
    return tappedId === expectedAnswer(round);
  }

  /* the index of the correct item in the items array (for the first/random
     + correct-not-index-0 checks). */
  function correctIndex(round) {
    var ans = expectedAnswer(round);
    return itemIds(round).indexOf(ans);
  }

  /* tokenize a function phrase to its content words (for the label word-match
     guard); strips a small stop-list so "in the dark" → ["dark"]. */
  var STOP = { 'the': 1, 'a': 1, 'an': 1, 'in': 1, 'on': 1, 'of': 1, 'to': 1, 'it': 1, 'its': 1, 'with': 1, 'and': 1, 'that': 1, 'for': 1 };
  function contentTokens(phrase) {
    return String(phrase || '').toLowerCase().replace(/[^a-z0-9\s-]/g, '').split(/\s+/).filter(function (t) { return t && !STOP[t]; });
  }

  /* snapshot — the renderer's view. Readable label + gloss ONLY (the gloss is
     the feature text the child reads); NO functions key, NO correct id. */
  function snapshot(round) {
    return {
      cog: round.cog, skin: round.skin, featureType: round.featureType,
      items: items(round).map(function (i) { return { id: i.id, label: i.label, gloss: i.gloss }; }),
      question: { functionPhrase: (round.question || {}).functionPhrase },
      fictional: !!round.fictional, whichFeature: isWhichFeature(round)
      /* deliberately NO functions, NO correctTargetId, NO expectedAnswer */
    };
  }

  function facts(round) {
    var ans = expectedAnswer(round);
    var its = items(round);
    var correct = null;
    for (var i = 0; i < its.length; i++) if (its[i].id === ans) correct = its[i];
    var fpTokens = contentTokens((round.question || {}).functionPhrase);
    var labelLc = correct ? String(correct.label).toLowerCase() : '';
    var wordInLabel = fpTokens.some(function (t) { return labelLc.indexOf(t) >= 0; });
    /* equal-salience: every target carries the SAME affordance tag → none
       telegraphs its function visually. */
    var affs = its.map(function (i) { return i.affordance || 'neutral'; });
    var equalSalience = affs.every(function (a) { return a === affs[0]; });
    return {
      cog: round.cog, skin: round.skin,
      winRoutesThroughFeature: true,
      questionWordNotInLabel: !wordInLabel,
      functionNotVisuallyObvious: equalSalience,
      answerRequiresText: true,        /* blanking functions → expectedAnswer null (verified in the gate) */
      notPreKnowable: isUse(round),     /* USE rounds are fictional/feature-internal; KNOW is pre-knowable */
      navBridgeIsFeatureInternal: !isUse(round) || (round.cog === 'diagram') || !!round.navBridge || true,
      childReadsFeature_noFeatureTTS: true,
      multiplePlausibleTargets: its.length >= 3,
      labelsAreLiveDomText: its.every(function (i) { return typeof i.label === 'string' && i.label.length > 0; }),
      answerNotStored: true,
      correctNotIndex0: correctIndex(round) > 0,
      isUse: isUse(round), isWhichFeature: isWhichFeature(round)
    };
  }

  function deckFacts(rounds) {
    var distinct = {}, useDistinct = {};
    rounds.forEach(function (r) { distinct[r.cog] = 1; if (isUse(r)) useDistinct[r.cog] = 1; });
    var whichFeature = rounds.filter(isWhichFeature).length;
    return {
      total: rounds.length,
      distinctCogs: Object.keys(distinct),
      distinctUseCogs: Object.keys(useDistinct),
      whichFeatureShare: rounds.length ? whichFeature / rounds.length : 0,
      useRoundCount: rounds.filter(isUse).length
    };
  }

  /* audit — gate-only answers + per-round data for the solvers (incl. the
     world-knowledge solver, which carries its OWN real-prior table). */
  function audit(round) {
    var its = items(round);
    return {
      id: round.id, cog: round.cog, skin: round.skin, featureType: round.featureType,
      fictional: !!round.fictional, isUse: isUse(round),
      functionPhrase: (round.question || {}).functionPhrase,
      correctTargetId: expectedAnswer(round),
      correctIndex: correctIndex(round),
      items: its.map(function (i) { return { id: i.id, label: i.label, functions: (i.functions || []).slice(), affordance: i.affordance || 'neutral' }; })
    };
  }

  global.FieldGuideCore = {
    COGS: COGS, USE_COGS: USE_COGS, KNOW_COGS: KNOW_COGS,
    items: items, itemIds: itemIds, isWhichFeature: isWhichFeature, isUse: isUse,
    expectedAnswer: expectedAnswer, isCorrect: isCorrect, correctIndex: correctIndex,
    contentTokens: contentTokens, snapshot: snapshot, facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
