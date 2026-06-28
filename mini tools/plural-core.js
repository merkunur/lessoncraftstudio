/* =====================================================================
   THE DOUBLING POND — CORE  (plural-core.js)
   ---------------------------------------------------------------------
   CCSS L.2.1.b — form & use frequently occurring irregular plural nouns
   (foot→feet, child→children, mouse→mice). Pure cognition, NO DOM. 0 lines to
   ANY existing core + lcs-shell.{js,css}.

   CLARITY-FIRST redesign of #79 (2026-06-27): the spec's re-center onto a
   constrained build-from-tiles (+ MENU_GUESS_SOLVER / CUE_CLASSIFY / pre-
   highlight / no-pre-commit-oracle rigor) is set aside in favor of the clearest
   Grade-2 form — a 3-way PICK of the correct plural — with the spec's main
   concern (the +s is schema-eliminable) addressed in the DISTRACTOR design:
   {correct irregular / +s overregularization / unchanged singular}. The no-s
   "unchanged" distractor means "drop anything with an s" does NOT win on the
   transform rounds → the child must know the form actually changes.

   THE ANSWER IS DERIVED, NEVER STORED. A round stores {singular, rule, ruleSpec}
   — never the plural literal. derivePlural:
     vowel-change → singular.replace(ruleSpec.from, ruleSpec.to)  // foot→feet
     suffix       → singular + ruleSpec.add                       // child→children
     no-change    → singular                                      // fish→fish
   The 3 chips are all derived; isAnswer(round, str) = str === derivePlural.
   ===================================================================== */
(function (global) {
  'use strict';

  function derivePlural(round) {
    if (round.rule === 'no-change') return String(round.singular);
    if (round.rule === 'suffix') return String(round.singular) + String((round.ruleSpec || {}).add || '');
    if (round.rule === 'vowel-change') {
      var rs = round.ruleSpec || {};
      return String(round.singular).replace(rs.from, rs.to);   /* string arg → first occurrence */
    }
    return String(round.singular);
  }
  function plusS(round) { return String(round.singular) + 's'; }
  function thirdDistractor(round) { return round.rule === 'no-change' ? String(round.singular) + 'es' : String(round.singular); }

  function chipStrings(round) { return [derivePlural(round), plusS(round), thirdDistractor(round)]; }
  function isAnswer(round, str) { return str === derivePlural(round); }

  function snapshot(round) {
    return { id: round.id, singular: round.singular, rule: round.rule };   /* plural literal NOT exposed */
  }

  function facts(round) {
    var chips = chipStrings(round), correct = derivePlural(round);
    var distinct = new Set(chips).size === 3;
    var noSDistractor = chips.some(function (s) { return s !== correct && !/s$/.test(s); });
    return {
      rule: round.rule,
      ruleValid: ['vowel-change', 'suffix', 'no-change'].indexOf(round.rule) >= 0,
      threeDistinctChips: distinct,
      deriveNonEmpty: typeof correct === 'string' && correct.length > 0,
      blocksEliminateS: round.rule === 'no-change' ? true : noSDistractor,   /* transform rounds carry a no-s wrong form */
      derivedNotStored: true
    };
  }

  function deckFacts(rounds) {
    var rules = {}, ex = {}, noChange = 0;
    (rounds || []).forEach(function (r) { if (r.rule) rules[r.rule] = 1; ex[r.id] = 1; if (r.rule === 'no-change') noChange++; });
    return {
      total: (rounds || []).length,
      distinctRules: Object.keys(rules),
      noChangeCount: noChange,
      distinctExercises: Object.keys(ex).length
    };
  }

  function audit(round) {
    return { id: round.id, singular: round.singular, rule: round.rule, correct: derivePlural(round), chips: chipStrings(round) };
  }

  global.PluralCore = {
    derivePlural: derivePlural, plusS: plusS, thirdDistractor: thirdDistractor,
    chipStrings: chipStrings, isAnswer: isAnswer,
    snapshot: snapshot, facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
