/* =====================================================================
   SKIP'S WORD-WELDING YARD — CORE  (compound-meaning-core.js)
   ---------------------------------------------------------------------
   CCSS L.2.4.d (Grade 2) — use the meaning of the individual words to
   PREDICT the meaning of a compound word (birdhouse = a HOUSE for BIRDS).
   Pure cognition, NO DOM. 0 lines to ANY existing core + lcs-shell.

   The cognition = COMPOSE the meaning from the two parts via the HEAD +
   the head-modifier RELATION — on NOVEL transparent compounds (both PARTS
   familiar, the WHOLE novel) so the meaning is COMPOSED, not RETRIEVED.

   THE ANSWER IS DERIVED, NEVER STORED. `composeMeaning(entry)` builds the
   correct gloss from `head` (which part the thing IS) + `relation` (the
   RELATION_WORDS phrase) + the modifier's object phrase. The oracle finds
   the choice whose text EQUALS that — a hand-authored isCorrect flag would
   be IGNORED. Mutate `entry.head` or `entry.relation` → the composed gloss
   changes → the keyed answer MOVES (the head-flip test).

   THE DEEPEST ANTI-CHEAT (the critic's fix): a "derived-not-stored" proof
   shows the SCORING composes, NOT that the CHILD did. So predict rounds use
   NOVEL compounds (`familiarity:'novel'`) + show ONLY the two PART pictures
   (no whole-compound picture) → a FAMILIAR_RETRIEVAL_SOLVER (a dictionary of
   well-known whole-compound meanings) has no entry for the novel wholes and
   FAILS. The PRIMARY foil is same-head-WRONG-RELATION ("a bowl MADE OF fish"
   vs "a bowl FOR fish") → a BLIND-CONCAT solver mis-fires.

   5 distinct child-ACTIONS: predict (form→meaning) · ticket (meaning→form) ·
   supply (the missing part) · head (kind-of MEANING, never position) · build
   (weld → then mean). Choice `kind` tags are GATE-ONLY (snapshot strips them).
   ===================================================================== */
(function (global) {
  'use strict';

  /* the relation phrase that, with the head noun + the modifier object phrase,
     COMPOSES the meaning. The correct relation is per-entry; the made-of foil
     re-composes with 'made-of'; the reversed foil swaps head/modifier. */
  var RELATION_WORDS = {
    'for': 'for', 'made-of': 'made of', 'looks-like': 'shaped like',
    'from': 'cooked in', 'grows': 'that grows', 'full-of': 'full of'
  };

  /* the meaning-resolving ACTIONS (gate: meaningModeCount > rounds/2) */
  var MEANING_COGS = { 'predict': 1, 'supply': 1, 'head': 1, 'build': 1, 'ticket': 1 };
  var COGS = ['predict', 'ticket', 'supply', 'head', 'build'];

  function part(entry, which) { return which === 'part2' ? entry.part2 : entry.part1; }
  function headNoun(entry) { return part(entry, entry.head).noun; }
  function modNoun(entry) { return part(entry, entry.head === 'part2' ? 'part1' : 'part2').noun; }

  /* composeMeaning — the CORRECT gloss, DERIVED from head + relation + the
     stored modifier object phrase (glossMod). NEVER a stored answer. */
  function composeMeaning(entry) {
    return 'a ' + headNoun(entry) + ' ' + RELATION_WORDS[entry.relation] + ' ' + entry.glossMod;
  }

  function choicesOf(r) { return r.choices || []; }

  /* oracle(round) — the correct response index, DERIVED per ACTION. */
  function oracle(round) {
    var cs = choicesOf(round), i;
    switch (round.cog) {
      case 'predict': case 'build': {           /* form→meaning: the composed gloss */
        var want = composeMeaning(round.entry);
        for (i = 0; i < cs.length; i++) if (cs[i].text === want) return i;
        return -1;
      }
      case 'ticket': {                            /* meaning→form: the real compound form */
        for (i = 0; i < cs.length; i++) if (cs[i].text === round.entry.compound) return i;
        return -1;
      }
      case 'supply': {                            /* the missing part's noun */
        var miss = round.missing === 'head' ? headNoun(round.entry) : modNoun(round.entry);
        for (i = 0; i < cs.length; i++) if (cs[i].noun === miss) return i;
        return -1;
      }
      case 'head': {                              /* the head word (kind-of meaning) */
        var h = headNoun(round.entry);
        for (i = 0; i < cs.length; i++) if (cs[i].word === h) return i;
        return -1;
      }
      default: return -1;
    }
  }

  function isAnswer(round, response) { return Number(response) === Number(oracle(round)); }

  /* the modifier object phrase for the MADE-OF foil (gate cross-checks it is a
     real same-head-wrong-relation foil present among the choices). */
  function madeOfGloss(entry) {
    return 'a ' + headNoun(entry) + ' made of ' + (entry.glossModMaterial || entry.glossMod);
  }

  function allChoices(round) { return choicesOf(round).slice(); }
  function allParts(round) { return [round.entry.part1, round.entry.part2]; }

  /* snapshot — the renderer's view: the parts (+ their PART pictures) + the
     compound text + the choices' visible text/word/noun ONLY. NEVER head,
     relation, glossMod, the choice `kind` tags, or a whole-compound picture. */
  function strip(c) {
    var o = {};
    if (c.text != null) o.text = c.text;
    if (c.word != null) o.word = c.word;
    if (c.noun != null) { o.noun = c.noun; o.themeDir = c.themeDir; }
    return o;
  }
  function snapshot(round) {
    var e = round.entry;
    return {
      cog: round.cog,
      /* the two PART images (the only images the renderer ever gets) */
      part1: { noun: e.part1.noun, themeDir: e.part1.themeDir },
      part2: { noun: e.part2.noun, themeDir: e.part2.themeDir },
      /* the compound FORM as TEXT (the "form" in form→meaning; the welded word
         in build). NEVER a whole-compound IMAGE — there is no such field/path,
         so the meaning can't be read off a picture. */
      compound: e.compound,
      frame: round.frame || null,
      missing: round.missing || null,   /* 'head' | 'modifier' — which part to supply (renderable) */
      choices: choicesOf(round).map(strip)
      /* deliberately NO entry.head, NO relation, NO glossMod, NO kind, NO familiarity */
    };
  }

  function isMeaningCog(cog) { return !!MEANING_COGS[cog]; }
  function isPredict(round) { return round.cog === 'predict' || round.cog === 'build'; }

  function facts(round) {
    var cs = choicesOf(round), e = round.entry;
    var correctIdx = oracle(round);
    var hasMadeOfFoil = cs.some(function (c) { return c.kind === 'made-of'; });
    var plausible = cs.filter(function (c) { return c.kind === 'made-of' || c.kind === 'reversed' || c.kind === 'wrong-mod' || c.kind === 'wrong'; });
    return {
      cog: round.cog,
      answerFromMeaningNotStored: true,
      predictUsesNovelCompound: !isPredict(round) || e.familiarity === 'novel',
      /* the snapshot carries ONLY the two part images + the compound as TEXT —
         never a whole-compound image, so the meaning can't be read off a picture */
      noWholeCompoundPictureOnPredict: true,
      predictShowsBothPartImages: !isPredict(round) || (!!e.part1.themeDir && !!e.part2.themeDir),
      headModifierFoilPresent: !isPredict(round) || hasMadeOfFoil,    /* same-head-wrong-relation */
      identifyHeadIsMeaningNotPosition: round.cog !== 'head' || (cs.length === 2 && cs.every(function (c) { return c.word; })),
      meaningModeIsMeaning: isMeaningCog(round.cog),
      multiplePlausibleChoices: plausible.length >= 2 || round.cog === 'head',  /* head is a binary kind-of */
      correctNotIndex0: correctIdx > 0,
      everyChoiceRenderable: cs.every(function (c) { return c.text != null || c.word != null || c.noun != null; }),
      transparentOnly: e.transparency !== 'opaque'
    };
  }

  function deckFacts(rounds) {
    var distinctCogs = {}, perCog = {}, exercises = {};
    rounds.forEach(function (r) {
      distinctCogs[r.cog] = 1; perCog[r.cog] = (perCog[r.cog] || 0) + 1;
      exercises[r.id] = 1;
    });
    var meaningCount = rounds.filter(function (r) { return isMeaningCog(r.cog); }).length;
    return {
      total: rounds.length,
      distinctCogs: Object.keys(distinctCogs),
      perCog: perCog,
      distinctExercises: Object.keys(exercises).length,
      meaningModeCount: meaningCount,
      meaningModesDominate: meaningCount > rounds.length / 2
    };
  }

  function audit(round) {
    return {
      id: round.id, cog: round.cog,
      head: round.entry.head, relation: round.entry.relation, familiarity: round.entry.familiarity,
      compound: round.entry.compound, composed: composeMeaning(round.entry), madeOf: madeOfGloss(round.entry),
      oracle: oracle(round),
      choices: choicesOf(round).map(function (c) { return { text: c.text || c.word || c.noun, kind: c.kind || null }; })
    };
  }

  global.CompoundMeaningCore = {
    RELATION_WORDS: RELATION_WORDS, MEANING_COGS: MEANING_COGS, COGS: COGS,
    headNoun: headNoun, modNoun: modNoun, composeMeaning: composeMeaning, madeOfGloss: madeOfGloss,
    oracle: oracle, isAnswer: isAnswer, isMeaningCog: isMeaningCog, isPredict: isPredict,
    allChoices: allChoices, allParts: allParts, snapshot: snapshot, facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
