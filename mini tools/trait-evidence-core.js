/* =====================================================================
   TRAIT EVIDENCE — CORE  (trait-evidence-core.js)
   ---------------------------------------------------------------------
   CCSS RL.1.3 — describe a CHARACTER using KEY DETAILS. First skin:
   "Marlo's Magnifier." Pure cognition, NO DOM. The child reads a short
   story, sees a trait CLAIM ("Mira is brave"), and taps the story detail
   that SHOWS it (the evidence) — not just any true thing that happened.

   THE ANSWER IS THE DETAIL TAGGED `supports`, NEVER A STORED INDEX. The
   foils are other TRUE story details that do NOT demonstrate the trait. The
   evidence is an ACTION and never contains the literal trait word, so a
   "match the trait word to a detail" shortcut fails. `childView` exposes the
   story + trait + detail TEXTS only (never `supports`). 0 lines to any
   protected core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  function details(round) { return round.details || []; }
  function detailById(round, id) { var d = details(round); for (var i = 0; i < d.length; i++) if (d[i].id === id) return d[i]; return null; }
  function supporting(round) { var d = details(round); for (var i = 0; i < d.length; i++) if (d[i].supports) return d[i]; return null; }

  /* THE GRADE — the tapped detail IS the `supports` detail. DERIVED; no
     stored index. Pure → the verify gate tests it. */
  function grade(round, pickedId) { var d = detailById(round, pickedId); return !!(d && d.supports); }
  function oracle(round) { var s = supporting(round); return s ? s.id : null; }
  function traitWord(round) { return String(round.traitWord || '').toLowerCase(); }
  function hasTraitWord(round, d) { return traitWord(round) !== '' && String(d.text || '').toLowerCase().indexOf(traitWord(round)) >= 0; }

  function childView(round) {
    return { id: round.id, trait: round.trait, story: (round.story || []).slice(), details: details(round).map(function (d) { return { id: d.id, text: d.text }; }) };
  }

  function facts(round) {
    var d = details(round);
    var s = supporting(round);
    return {
      threeDetails: d.length === 3,
      oneSupports: d.filter(function (x) { return x.supports; }).length === 1,
      derivedNotStored: !('answer' in round) && !('correctIndex' in round),
      traitNamesWord: traitWord(round) !== '' && String(round.trait || '').toLowerCase().indexOf(traitWord(round)) >= 0,
      supportLacksTraitWord: !!s && !hasTraitWord(round, s)
    };
  }

  function audit(round) {
    return {
      id: round.id, trait: round.trait, traitWord: traitWord(round),
      details: details(round).map(function (d) { return { id: d.id, text: d.text, supports: !!d.supports, len: d.text.length, hasTraitWord: hasTraitWord(round, d) }; }),
      supportId: (supporting(round) || {}).id
    };
  }

  global.TraitEvidenceCore = {
    details: details, detailById: detailById, supporting: supporting,
    grade: grade, oracle: oracle, traitWord: traitWord, hasTraitWord: hasTraitWord,
    childView: childView, facts: facts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
