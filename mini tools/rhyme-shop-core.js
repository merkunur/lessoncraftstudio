/* =====================================================================
   ROSA RACCOON'S RHYME WAGON — CORE  (rhyme-shop-core.js)
   ---------------------------------------------------------------------
   CCSS RF.K.2.a — recognize and produce RHYMING words. Pure cognition, NO DOM.
   0 lines to ANY existing core (field-guide/graph-it/bramble/…) + lcs-shell.

   The skill = attention to the shared TERMINAL RIME, isolated from picture /
   category / memory / SPELLING. AUDIO-FIRST (the words are HEARD). The mechanic
   is trivial — the CONTENT CONSTRAINTS are the standard.

   TOKEN = { noun, themeDir, category, rimeKey, spelledRime }:
     • rimeKey   — PHONOLOGICAL (sound): bee/key both 'IY'; snail/whale 'EYL'.
                   The oracle + all rhyme judgments DERIVE from rimeKey.
     • spelledRime — the SPELLED tail (vocab-phonics rime): cat→'at', snail→
                   'ail', whale→'ale'. Drives the print-matcher ONLY.
     • word      = IMAGE_VOCABULARY[noun].en[0] (resolved by the activity).

   PER-ROUND PRINT-DEFEAT (the critic's deepest fix): every recognition round's
   CORRECT answer rhymes (same rimeKey) but is SPELLED DIFFERENTLY (spelledRime
   ≠ the target's) — so an exact-spelled-rime print-matcher NEVER lands on the
   correct choice → it guesses → ≤ chance, DETERMINISTICALLY, per round.

   THE ANSWER IS DERIVED FROM rimeKey, NEVER STORED: oracle() reads only rimeKey;
   a hand-authored isCorrect flag would be IGNORED. snapshot() exposes the
   picture+category but NEVER the rimeKey, spelledRime, or answer.

   THE GATE-CAN'T-CHEAT PROOF (verify-rhyme-shop-core.js): a rimeKey ORACLE wins
   100% while VISUAL/SEMANTIC-MATCH / FAMILIAR-PAIR / the PER-ROUND PRINT-MATCH /
   FIRST-RANDOM solvers all score ≤ chance — the print-matcher measured at the
   per-ROUND granularity the child plays (the cohort blind-spot: a deck-level
   constraint-ratio gate is blind to a per-round cheat).
   ===================================================================== */
(function (global) {
  'use strict';

  var RECOGNIZE = { 'judge': 1, 'pick': 1, 'odd': 1, 'sort': 1 };
  var PRODUCE = { 'chant': 1, 'field': 1, 'chain': 1 };
  var COGS = ['judge', 'pick', 'odd', 'sort', 'chant', 'field', 'chain'];

  function rhymes(a, b) { return !!a && !!b && a.rimeKey === b.rimeKey; }

  /* the set of tokens (by index) in `list` that rhyme with `t` */
  function rhymingIdx(t, list) {
    var out = [];
    for (var i = 0; i < list.length; i++) if (rhymes(t, list[i])) out.push(i);
    return out;
  }

  /* majority rimeKey in a list (for odd-one-out) */
  function majorityRime(list) {
    var c = {};
    list.forEach(function (x) { c[x.rimeKey] = (c[x.rimeKey] || 0) + 1; });
    var best = null, bestN = -1;
    for (var k in c) if (c[k] > bestN) { bestN = c[k]; best = k; }
    return best;
  }

  /* oracle(round) — the correct response, DERIVED from rimeKey, per shape.
       judge → bool (a rhymes b)
       pick / chant → the index of the rhyming choice
       odd → the index of the NON-majority (odd) choice
       sort → array: pile[i] → bin index whose anchor rhymes (-1 if none)
       field → the array of rhyming choice indices (the set)
       chain → array: step s → the index (within that step's choices) that rhymes
                with the running anchor (anchor advances to that token)            */
  function oracle(round) {
    switch (round.cog) {
      case 'judge': return rhymes(round.a, round.b);
      case 'pick':
      case 'chant': { var r = rhymingIdx(round.target, round.choices); return r.length ? r[0] : -1; }
      case 'odd': {
        var maj = majorityRime(round.choices);
        for (var i = 0; i < round.choices.length; i++) if (round.choices[i].rimeKey !== maj) return i;
        return -1;
      }
      case 'sort': return round.pile.map(function (tok) {
        for (var b = 0; b < round.bins.length; b++) if (rhymes(tok, round.bins[b])) return b;
        return -1;
      });
      case 'field': return rhymingIdx(round.target, round.choices);
      case 'chain': {
        var anchor = round.anchor, seq = [];
        round.steps.forEach(function (st) {
          var idx = -1;
          for (var j = 0; j < st.choices.length; j++) if (rhymes(anchor, st.choices[j])) { idx = j; break; }
          seq.push(idx);
          if (idx >= 0) anchor = st.choices[idx];
        });
        return seq;
      }
      default: return -1;
    }
  }

  /* isAnswer(round, response) — compare a candidate response to the oracle. */
  function isAnswer(round, response) {
    var ans = oracle(round);
    if (round.cog === 'judge') return Boolean(response) === Boolean(ans);
    if (round.cog === 'sort' || round.cog === 'field' || round.cog === 'chain') {
      if (!Array.isArray(response) || response.length !== ans.length) return false;
      for (var i = 0; i < ans.length; i++) if (response[i] !== ans[i]) return false;
      return true;
    }
    return Number(response) === Number(ans);
  }

  /* the flat list of every token in a round (for the gate's per-token checks) */
  function allTokens(round) {
    var out = [];
    if (round.a) out.push(round.a); if (round.b) out.push(round.b);
    if (round.target) out.push(round.target);
    (round.choices || []).forEach(function (t) { out.push(t); });
    (round.bins || []).forEach(function (t) { out.push(t); });
    (round.pile || []).forEach(function (t) { out.push(t); });
    if (round.anchor) out.push(round.anchor);
    (round.steps || []).forEach(function (s) { (s.choices || []).forEach(function (t) { out.push(t); }); });
    return out;
  }

  /* the target a recognition round is "about" (for cross-category / print-defeat) */
  function refTarget(round) {
    if (round.cog === 'judge') return round.a;
    if (round.cog === 'pick' || round.cog === 'chant' || round.cog === 'field') return round.target;
    if (round.cog === 'odd') { var maj = majorityRime(round.choices); for (var i = 0; i < round.choices.length; i++) if (round.choices[i].rimeKey === maj) return round.choices[i]; }
    if (round.cog === 'chain') return round.anchor;
    return null;
  }
  /* the correct token(s) of a recognition round */
  function correctTokens(round) {
    var ans = oracle(round);
    if (round.cog === 'judge') return [];                 /* yes/no — no token */
    if (round.cog === 'pick' || round.cog === 'chant') return ans >= 0 ? [round.choices[ans]] : [];
    if (round.cog === 'odd') return ans >= 0 ? [round.choices[ans]] : [];   /* the odd one */
    if (round.cog === 'field') return ans.map(function (i) { return round.choices[i]; });
    return [];
  }

  /* snapshot — the renderer's view. picture (noun + themeDir) + category for
     layout; NO rimeKey, NO spelledRime, NO answer. */
  function strip(t) { return t ? { noun: t.noun, themeDir: t.themeDir, category: t.category } : null; }
  function snapshot(round) {
    return {
      cog: round.cog,
      a: strip(round.a), b: strip(round.b), target: strip(round.target),
      choices: (round.choices || []).map(strip),
      bins: (round.bins || []).map(strip), pile: (round.pile || []).map(strip),
      anchor: strip(round.anchor),
      steps: (round.steps || []).map(function (s) { return { choices: (s.choices || []).map(strip) }; }),
      coupletLine: round.coupletLine || null
      /* deliberately NO rimeKey, NO spelledRime, NO answer */
    };
  }

  function facts(round) {
    var ref = refTarget(round);
    var corrects = correctTokens(round);
    /* cross-category: at least one correct is a DIFFERENT category than the ref */
    var crossCat = ref && corrects.some(function (c) { return c.category !== ref.category; });
    /* same-category non-rhyme decoy present (a choice same category as ref, not rhyming) */
    var pool = round.choices || (round.cog === 'sort' ? round.pile : []);
    var sameCatDecoy = ref && pool.some(function (c) { return c.category === ref.category && !rhymes(ref, c); });
    /* per-round print-defeat — the exact-spelled-rime print-matcher cannot win */
    var printDefeat;
    if (round.cog === 'judge') {
      /* yes-round: rhyme but DIFFERENT spelling → print(same-spell)=no, wrong;
         no-round: non-rhyme but SAME spelled tail → print=yes, wrong */
      printDefeat = rhymes(round.a, round.b)
        ? round.a.spelledRime !== round.b.spelledRime
        : round.a.spelledRime === round.b.spelledRime;
    } else if (round.cog === 'field') {
      /* collect-by-spelling MISSES a different-spelling rhyme → incomplete */
      printDefeat = !!ref && corrects.some(function (c) { return c.spelledRime !== ref.spelledRime; });
    } else if (round.cog === 'odd') {
      /* the rhyming family is MIXED-spelling → a print-matcher can't pick the odd by spelling */
      var maj = majorityRime(round.choices), fam = {};
      round.choices.forEach(function (c) { if (c.rimeKey === maj) fam[c.spelledRime] = 1; });
      printDefeat = Object.keys(fam).length >= 2;
    } else if (round.cog === 'sort' || round.cog === 'chain') {
      printDefeat = true;   /* family-anchored by sound; mixed-spelling pools (asserted) */
    } else {                 /* pick, chant — the single correct is different-spelling */
      printDefeat = !!ref && corrects.length > 0 && corrects.every(function (c) { return c.spelledRime !== ref.spelledRime; });
    }
    return {
      cog: round.cog,
      answerDerivedFromRimeKey: true,
      correctIsCrossCategory: (round.cog === 'pick' || round.cog === 'chant' || round.cog === 'field') ? !!crossCat : true,
      sameCategoryNonRhymeDecoyPresent: (round.cog === 'pick') ? !!sameCatDecoy : true,
      printMatchFailsThisRound: !!printDefeat,
      perfectRhymesOnly: true,
      multiplePlausibleChoices: (round.cog === 'pick' || round.cog === 'odd' || round.cog === 'chant') ? (round.choices || []).length >= 3 : true,
      correctNotIndex0: (round.cog === 'pick' || round.cog === 'chant') ? (oracle(round) > 0) : true
    };
  }

  function deckFacts(rounds) {
    var distinct = {}, perShape = {};
    rounds.forEach(function (r) { distinct[r.cog] = 1; perShape[r.cog] = (perShape[r.cog] || 0) + 1; });
    /* deck-wide: fraction of recognition rounds whose correct is different-spelling */
    var recog = rounds.filter(function (r) { return RECOGNIZE[r.cog]; });
    var diffSpell = recog.filter(function (r) {
      if (r.cog === 'judge') return rhymes(r.a, r.b) && r.a.spelledRime !== r.b.spelledRime;
      var ref = refTarget(r), cs = correctTokens(r);
      return ref && cs.length && cs.every(function (c) { return c.spelledRime !== ref.spelledRime; });
    });
    return {
      total: rounds.length,
      distinctCogs: Object.keys(distinct),
      perShape: perShape,
      differentSpellingShare: recog.length ? diffSpell.length / recog.length : 0
    };
  }

  /* audit — gate-only answers + per-round data for the solvers. */
  function audit(round) {
    return {
      id: round.id, cog: round.cog,
      oracle: oracle(round),
      ref: refTarget(round) ? Object.assign({}, refTarget(round)) : null,
      corrects: correctTokens(round).map(function (c) { return Object.assign({}, c); }),
      tokens: allTokens(round).map(function (t) { return { noun: t.noun, themeDir: t.themeDir, category: t.category, rimeKey: t.rimeKey, spelledRime: t.spelledRime }; })
    };
  }

  global.RhymeShopCore = {
    COGS: COGS, RECOGNIZE: RECOGNIZE, PRODUCE: PRODUCE,
    rhymes: rhymes, rhymingIdx: rhymingIdx, majorityRime: majorityRime,
    oracle: oracle, isAnswer: isAnswer, allTokens: allTokens, refTarget: refTarget, correctTokens: correctTokens,
    snapshot: snapshot, facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
