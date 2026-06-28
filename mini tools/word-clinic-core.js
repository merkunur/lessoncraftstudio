/* =====================================================================
   WORD DOCTOR'S CLINIC — CORE  (word-clinic-core.js)
   ---------------------------------------------------------------------
   CCSS L.1.2.e — SPELL untaught words PHONETICALLY (generative phoneme->
   grapheme ENCODING). Pure cognition, NO DOM. The child HEARS the word
   (whole-word TTS, never an isolated phoneme); the correct spelling is
   shown NOWHERE. One "sick" phoneme's grapheme is healed by EAR from a
   tray of DIFFERENT-sound competitors. A wrong grapheme makes the word
   VOICE BACK as a different word (the self-correcting loop).

   The correct grapheme + the complete spelling live ONLY in the closure
   (frameTiles() returns the sick slot as null; snapshot() carries no
   answer). The TRAY comes from the embedded CONFUSABLES table, which
   verify-word-clinic-core.js asserts is byte-equal to the gated SoT
   scripts/v2-data/en-phoneme-confusables.json (no drift).

   0 lines to any protected core + lcs-shell.{js,css}. A NEW clean
   repair-restore sibling.
   ===================================================================== */
(function (global) {
  'use strict';

  /* ---- EMBEDDED gated table (MUST equal scripts/v2-data/en-phoneme-confusables.json
     "confusables"; verify-word-clinic-core.js asserts deep-equality). The FIRST
     grapheme is the CORRECT spelling of the phoneme; the rest are DIFFERENT-
     SOUND competitors (a wrong pick = a wrong sound = a different word). */
  var CONFUSABLES = {
    short_a: ['a', 'e', 'o'],
    short_e: ['e', 'a', 'i'],
    short_i: ['i', 'e', 'a'],
    short_o: ['o', 'a', 'u'],
    short_u: ['u', 'o', 'a'],
    sh: ['sh', 'ch', 'th'],
    ch: ['ch', 'sh', 'th'],
    th: ['th', 'f', 'sh'],
    long_o: ['oa', 'o', 'u'],
    long_a: ['ai', 'a', 'e'],
    long_e: ['ea', 'e', 'i'],
    fr: ['fr', 'f', 'r'],
    fl: ['fl', 'f', 'l'],
    gr: ['gr', 'g', 'r'],
    st: ['st', 's', 't']
  };

  /* common K-1 sight/memorized words — the pool must EXCLUDE these so the
     child cannot sight-spell (the L.1.2.e "untaught words" requirement; the
     picture-recall gate-solver checks against this set). */
  var TOP_SIGHT = ['the', 'and', 'cat', 'dog', 'sun', 'run', 'red', 'big', 'see', 'man', 'mom', 'dad', 'bee', 'pig', 'hat', 'cup', 'box', 'bus', 'car', 'bed', 'egg'];

  var COGS = ['vowel-a', 'vowel-e', 'vowel-i', 'vowel-o', 'vowel-u', 'digraph', 'vowel-team', 'blend'];

  function correctGrapheme(round) { return round.graphemes[round.sickIndex]; }
  function trayFor(round) {
    var set = CONFUSABLES[round.sickPhoneme];
    return set ? set.slice() : [correctGrapheme(round)];
  }
  /* the scaffold: the healthy graphemes as letters; the SICK slot is null
     (the correct grapheme is NOT here — it lives only in the closure). */
  function frameTiles(round) {
    return round.graphemes.map(function (g, i) { return i === round.sickIndex ? null : g; });
  }
  /* the word as spelled with `placed` in the sick slot (the voice-back). */
  function assembled(round, placed) {
    return round.graphemes.map(function (g, i) { return i === round.sickIndex ? placed : g; }).join('');
  }
  function voiceBackString(round, placed) { return assembled(round, placed); }
  function isHealed(round, placed) { return placed === correctGrapheme(round); }

  /* snapshot() — the renderer's view. NO correct grapheme / complete spelling. */
  function snapshot(round) {
    return {
      cog: round.cog,
      frameTiles: frameTiles(round),       /* sick slot = null */
      sickIndex: round.sickIndex,
      tray: trayFor(round)                 /* the activity shuffles; correct is one unlabeled option */
      /* deliberately NO correctGrapheme / word spelling */
    };
  }

  /* facts() — per-round structural booleans for the gate. */
  function facts(round) {
    var cg = correctGrapheme(round);
    var tray = trayFor(round);
    return {
      cog: round.cog,
      graphemesSpellTheWord: round.graphemes.join('') === round.word,
      correctIsTrayHead: tray[0] === cg,
      trayHasCorrectPlusTwo: tray.indexOf(cg) !== -1 && tray.length >= 3,
      poolIsUntaught: TOP_SIGHT.indexOf(round.word) === -1,
      sickPhonemeInTable: !!CONFUSABLES[round.sickPhoneme],
      /* every competitor placed yields a string phonetically DIFFERENT from the
         target (a different word voiced back) — by construction (different-sound
         graphemes), asserted as: assembled(competitor) !== the real word. */
      competitorsVoiceDifferent: tray.filter(function (g) { return g !== cg; })
        .every(function (g) { return assembled(round, g) !== round.word; })
    };
  }

  /* audit() — the answer + per-competitor assembled strings, for the gate's
     solver scoring (the gate is GIVEN this; the renderer never is). */
  function audit(round) {
    var cg = correctGrapheme(round);
    var tray = trayFor(round);
    return {
      id: round.id, cog: round.cog, word: round.word,
      correctGrapheme: cg,
      tray: tray.slice(),
      assembled: tray.map(function (g) { return { grapheme: g, str: assembled(round, g), correct: g === cg }; }),
      frameTiles: frameTiles(round)
    };
  }

  global.WordClinicCore = {
    CONFUSABLES: CONFUSABLES,
    TOP_SIGHT: TOP_SIGHT,
    COGS: COGS,
    correctGrapheme: correctGrapheme,
    trayFor: trayFor,
    frameTiles: frameTiles,
    assembled: assembled,
    voiceBackString: voiceBackString,
    isHealed: isHealed,
    snapshot: snapshot,
    facts: facts,
    audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
