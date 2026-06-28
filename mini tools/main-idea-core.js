/* =====================================================================
   NILA'S IDEA POND — CORE  (main-idea-core.js)
   ---------------------------------------------------------------------
   CCSS RI.K.2 — identify the MAIN TOPIC + retell KEY DETAILS of a text
   that is READ ALOUD. Pure cognition, NO DOM. The skin (nila-pond-
   activity.js) consumes ONLY fishStage1 / detailsStage2 / supplyOptions
   (which never carry the answer) + the post-commit checkers. The answer
   is ALWAYS f(authored topicId / belongs) — NEVER f(label / phrase /
   picture surface).

   THE GATE-CAN'T-READ PROOF (verify-main-idea-core.js):
     - the COMPREHENSION oracle is GIVEN the authored topicId + belongs →
       scores 100% (the answer is fully determined by the authored truth);
     - the ARMED SURFACE-CUE solver (length / first-mention / position /
       odd-one-out / phrase-frame / register / head-noun-generality /
       word-overlap — NO comprehension) must score <= chance.
   audit() exposes the per-fish surface metrics the gate needs; the round
   descriptor exposes NO isTopic flag to the renderer (snapshot()).

   0 lines to any protected core + lcs-shell.{js,css}. A NEW clean
   hide-reveal sibling — no shared import.
   ===================================================================== */
(function (global) {
  'use strict';

  var COGS = ['pick-topic', 'nest-reject', 'reject-narrow', 'supply-detail'];

  /* ---- text helpers (the surface the armed solver is allowed to see) ---- */
  function paraText(round) { return (round.paragraph || []).join(' '); }
  function wordCount(s) { return String(s || '').trim().split(/\s+/).filter(Boolean).length; }
  function keyList(key) { return Array.isArray(key) ? key : (key == null ? [] : [key]); }

  /* whole-word, case-insensitive, diacritic-naive (EN pilot). */
  function firstIndexOfKey(text, key) {
    var lo = text.toLowerCase(), best = Infinity;
    keyList(key).forEach(function (k) {
      k = String(k).toLowerCase();
      if (!k) return;
      var re = new RegExp('\\b' + k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b');
      var m = re.exec(lo);
      if (m && m.index < best) best = m.index;
    });
    return best;
  }
  function countKey(text, key) {
    var lo = text.toLowerCase(), n = 0;
    keyList(key).forEach(function (k) {
      k = String(k).toLowerCase(); if (!k) return;
      var re = new RegExp('\\b' + k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'g');
      var m; while ((m = re.exec(lo))) n++;
    });
    return n;
  }
  /* structural signature of a phrase — the "register/frame" surface. All
     fish SHOULD share it (uniform declaratives) so register/frame/odd-one-
     out give no signal. */
  function phraseShape(phrase) {
    var s = String(phrase || '').trim();
    var first = (s.split(/\s+/)[0] || '').toLowerCase().replace(/[^a-z]/g, '');
    var q = /\?$/.test(s) ? 'q' : 'd';
    var frame = /\b(how|why|about|what)\b/i.test(s) ? 'framed' : 'plain';
    return first + '|' + q + '|' + frame;
  }

  function fishById(round, id) {
    var all = (round.fish || []).concat(round.altDetails || []);
    for (var i = 0; i < all.length; i++) if (all[i].id === id) return all[i];
    return null;
  }

  /* ---- what the SKIN may see (no answer leaks) ---- */
  /* the 4 topic candidates, id + phrase only (the skin shuffles the order). */
  function fishStage1(round) {
    return (round.fish || []).map(function (f) { return { id: f.id, phrase: f.phrase }; });
  }
  /* the 3 non-topic fish for the school stage (nest-reject). */
  function detailsStage2(round) {
    return (round.fish || []).filter(function (f) { return f.id !== round.topicId; })
      .map(function (f) { return { id: f.id, phrase: f.phrase }; });
  }
  /* the 2 NEW candidate fish for supply-detail (one was in the text). */
  function supplyOptions(round) {
    return (round.altDetails || []).map(function (f) { return { id: f.id, phrase: f.phrase }; });
  }

  /* ---- the AUTHORED-TRUTH checkers (correctness is f(topicId/belongs)) ---- */
  function isTopic(round, id) { return id === round.topicId; }
  function belongs(round, id) {
    var src = (round.details || []).concat(round.altDetails || []);
    for (var i = 0; i < src.length; i++) if (src[i].id === id) return !!src[i].belongs;
    return false;
  }
  function slotCount(round) {
    return (round.details || []).filter(function (d) { return d.belongs; }).length;
  }
  function nonBelongerId(round) {
    var d = (round.details || []).filter(function (x) { return !x.belongs; });
    return d.length ? d[0].id : null;
  }
  /* the swap-group for regenerate-on-wrong: other rounds, same group. */
  function regenGroup(round, allRounds) {
    if (round.regenGroup && round.regenGroup.length) return round.regenGroup.slice();
    return (allRounds || []).filter(function (r) { return r.group === round.group && r.id !== round.id; })
      .map(function (r) { return r.id; });
  }

  /* snapshot() — the renderer's view. NO isTopic / belongs leak; the skin
     must call the checkers (post-commit) to learn the answer. */
  function snapshot(round, stage, nestedIds) {
    return {
      cog: round.cog,
      stage: stage || 'hear',
      labels: fishStage1(round),                 /* id + phrase only */
      nestedIds: (nestedIds || []).slice(),
      slotCount: slotCount(round)
      /* deliberately NO topicId / belongs here */
    };
  }

  /* facts() — per-round structural booleans for the gate. */
  function facts(round) {
    var t = paraText(round);
    var nb = nonBelongerId(round);
    var nbFish = nb ? fishById(round, nb) : null;
    return {
      cog: round.cog,
      commitRequiredBeforeReveal: true,
      noContentPicturePerFish: (round.fish || []).every(function (f) { return f.picture == null; }),
      topicInLabelSet: (round.fish || []).some(function (f) { return f.id === round.topicId; }),
      exactlyOneNonBelonger: (round.cog === 'nest-reject')
        ? (round.details || []).filter(function (d) { return !d.belongs; }).length === 1
        : true,
      moreFishThanSlots: (round.cog === 'nest-reject')
        ? (round.details || []).length > slotCount(round)
        : true,
      nonBelongerNounAbsentFromText: nbFish ? (countKey(t, nbFish.key) === 0) : true,
      belongingDetailNounsInText: (round.details || []).filter(function (d) { return d.belongs; })
        .every(function (d) { var f = fishById(round, d.id); return f && countKey(t, f.key) > 0; }),
      topicNounInText: (function () { var f = fishById(round, round.topicId); return f && countKey(t, f.key) > 0; })()
    };
  }

  /* audit() — the per-fish SURFACE metrics the armed solver is allowed to
     use, plus the authored answer (so the gate can score both oracles). */
  function audit(round) {
    var t = paraText(round);
    var fish = (round.fish || []).map(function (f) {
      return {
        id: f.id,
        len: wordCount(f.phrase),
        firstMention: firstIndexOfKey(t, f.key),   /* Infinity if absent */
        overlap: countKey(t, f.key),
        inText: countKey(t, f.key) > 0,
        shape: phraseShape(f.phrase)
      };
    });
    return {
      id: round.id,
      cog: round.cog,
      group: round.group,
      topicId: round.topicId,
      fish: fish,
      nonBelongerId: nonBelongerId(round),
      slotCount: slotCount(round),
      details: (round.details || []).map(function (d) { return { id: d.id, belongs: !!d.belongs }; }),
      altDetails: (round.altDetails || []).map(function (d) { return { id: d.id, belongs: !!d.belongs }; })
    };
  }

  global.MainIdeaCore = {
    COGS: COGS,
    COMMIT_REQUIRED_BEFORE_REVEAL: true,
    /* skin-facing (no answer leak) */
    fishStage1: fishStage1,
    detailsStage2: detailsStage2,
    supplyOptions: supplyOptions,
    snapshot: snapshot,
    /* authored-truth checkers */
    isTopic: isTopic,
    belongs: belongs,
    slotCount: slotCount,
    nonBelongerId: nonBelongerId,
    regenGroup: regenGroup,
    /* gate-facing */
    facts: facts,
    audit: audit,
    /* exposed for tests */
    _paraText: paraText,
    _firstIndexOfKey: firstIndexOfKey,
    _countKey: countKey,
    _phraseShape: phraseShape
  };

}(typeof window !== 'undefined' ? window : this));
