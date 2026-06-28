/* =====================================================================
   CORE — Fix-It / Sentence-editing  (fix-it-core.js)
   ---------------------------------------------------------------------
   Generic, LOCALE-NEUTRAL grammar-editing cognition (the spec's
   `engine-fix-it.js`). First skin: "Dr. Plume's Sentence Clinic" —
   CCSS L.2.1 (Grade 2 grammar/usage). A muddled sentence arrives; the
   child DIAGNOSES the trouble (taps the bad word / gap / seam) and then
   performs the right REPAIR so it "sounds right." The repair affordance
   is only valid AFTER a correct diagnosis → blind-swapping is impossible.

   The core NEVER contains UI/DOM and NEVER hard-codes a language rule —
   it consumes pre-tokenized round descriptors and validates against them,
   so the same engine generalises to a whole "edit-the-sentence" family
   (per-locale round files swap in later). Distinctness = the 7 ACTIONS.

   Round descriptor:
     { id, band, action, tokens:[...], convention,
       targetIndex?  (capitalize|swap|delete),
       gapIndex?     (insert-punct|insert-word — slot position),
       seamIndex?    (split — period goes AFTER tokens[seamIndex]),
       replacement?  (swap|insert-punct|insert-word — the correct chip),
       distractors?  ([] same-lemma / same-class wrong options),
       correctOrder? (reorder — the token indices in correct order),
       clean:[...]   (the corrected token array — the "sounds-right" form) }

   Answer is DERIVED from the descriptor, never stored as an index the UI
   reads directly. Pure functions (mirrors ordering-core / mosaic core).
   ===================================================================== */
(function (global) {
  'use strict';

  /* ---- the 7 distinct ACTIONS / rounds (EN pilot). Each is a genuinely
     different thing the child DOES (§A.13.60 distinctness = the action).
     `clean` is the corrected sentence the repair must produce. ---- */
  var ROUNDS = [
    /* Band 1 — capitalize: tap the word that needs a capital letter. */
    {
      id: 'cap-start', band: 1, action: 'capitalize',
      tokens: ['my', 'dog', 'is', 'happy', '.'], targetIndex: 0, replacement: 'My',
      convention: 'Start a sentence with a capital letter.',
      clean: ['My', 'dog', 'is', 'happy', '.']
    },
    /* Band 1 — insert-punct: drop the right end mark into the gap slot. */
    {
      id: 'mark-end', band: 1, action: 'insert-punct',
      tokens: ['The', 'sun', 'is', 'hot'], gapIndex: 4, replacement: '.', distractors: [',', '?'],
      convention: 'End a telling sentence with a period.',
      clean: ['The', 'sun', 'is', 'hot', '.']
    },
    /* Band 2 — swap-form: tap the wrong-form word, pick the right form. */
    {
      id: 'swap-agree', band: 2, action: 'swap',
      tokens: ['She', 'run', 'to', 'school', '.'], targetIndex: 1, replacement: 'runs', distractors: ['running', 'ran'],
      convention: 'A she/he/it subject takes a verb ending in -s.',
      clean: ['She', 'runs', 'to', 'school', '.']
    },
    /* Band 2 — insert-word: fill the empty slot with the missing word. */
    {
      id: 'fill-verb', band: 2, action: 'insert-word',
      tokens: ['The', 'cat', 'milk', '.'], gapIndex: 2, replacement: 'drinks', distractors: ['green', 'under'],
      convention: 'Every sentence needs an action word (a verb).',
      clean: ['The', 'cat', 'drinks', 'milk', '.']
    },
    /* Band 3 — reorder: arrange the jumbled words into a real sentence. */
    {
      id: 'order-svo', band: 3, action: 'reorder',
      tokens: ['fast', 'runs', 'dog', 'The'], correctOrder: [3, 2, 1, 0],
      convention: 'Words go in an order that makes sense.',
      clean: ['The', 'dog', 'runs', 'fast']
    },
    /* Band 3 — delete: remove the word that does not belong (double subject). */
    {
      id: 'del-double', band: 3, action: 'delete',
      tokens: ['My', 'mom', 'she', 'cooks', '.'], targetIndex: 2,
      convention: "Don't name the subject twice.",
      clean: ['My', 'mom', 'cooks', '.']
    },
    /* Band 3 — split: tap the seam where two sentences collide (run-on). */
    {
      id: 'split-runon', band: 3, action: 'split',
      tokens: ['I', 'ran', 'it', 'was', 'fun'], seamIndex: 1, replacement: 'It',
      convention: 'Two ideas need two sentences.',
      clean: ['I', 'ran', '.', 'It', 'was', 'fun']
    }
  ];

  function clone(a) { return a.slice(); }
  function cap(w) { return w ? w.charAt(0).toUpperCase() + w.slice(1) : w; }

  /* the ELEMENT kind a round diagnoses (so the skin knows what's tappable). */
  function diagnoseKind(round) {
    switch (round.action) {
      case 'capitalize': case 'swap': case 'delete': return 'word';
      case 'insert-punct': case 'insert-word': return 'gap';
      case 'split': return 'seam';
      default: return null;            // reorder has no single diagnosis
    }
  }

  /* is tapping element `index` the correct DIAGNOSIS? (word index / gap index /
     seam index, per action). reorder returns false (no diagnose step). */
  function diagnoseCorrect(round, index) {
    switch (round.action) {
      case 'capitalize': case 'swap': case 'delete': return index === round.targetIndex;
      case 'insert-punct': case 'insert-word': return index === round.gapIndex;
      case 'split': return index === round.seamIndex;
      default: return false;
    }
  }

  /* the repair options the skin shows AFTER a correct diagnosis (chips), or
     null for single-tap actions (capitalize/delete/split apply on diagnosis). */
  function repairOptions(round) {
    if (round.action === 'swap' || round.action === 'insert-punct' || round.action === 'insert-word') {
      return [round.replacement].concat(round.distractors || []);   // skin shuffles position
    }
    return null;
  }

  /* is `payload` the correct REPAIR? payload = chosen chip text (swap/insert),
     or an order array (reorder), or undefined for single-tap actions. */
  function repairCorrect(round, payload) {
    switch (round.action) {
      case 'capitalize': case 'delete': case 'split': return true;   // the correct diagnosis tap IS the repair
      case 'swap': case 'insert-punct': case 'insert-word': return payload === round.replacement;
      case 'reorder':
        if (!Array.isArray(payload) || payload.length !== round.correctOrder.length) return false;
        for (var i = 0; i < payload.length; i++) if (payload[i] !== round.correctOrder[i]) return false;
        return true;
      default: return false;
    }
  }

  /* apply the correct repair → the CLEAN token array (the "sounds-right" form). */
  function applyRepair(round) {
    var t = clone(round.tokens);
    switch (round.action) {
      case 'capitalize': t[round.targetIndex] = cap(t[round.targetIndex]); return t;
      case 'swap': t[round.targetIndex] = round.replacement; return t;
      case 'delete': t.splice(round.targetIndex, 1); return t;
      case 'insert-punct': case 'insert-word': t.splice(round.gapIndex, 0, round.replacement); return t;
      case 'split':
        // period AFTER tokens[seamIndex]; capitalize the next word
        t.splice(round.seamIndex + 1, 0, '.');
        t[round.seamIndex + 2] = cap(t[round.seamIndex + 2]);
        return t;
      case 'reorder': return round.correctOrder.map(function (i) { return round.tokens[i]; });
      default: return t;
    }
  }

  function buildRounds() { return ROUNDS.map(function (r) { return JSON.parse(JSON.stringify(r)); }); }

  global.FixItCore = {
    ROUNDS: ROUNDS,
    buildRounds: buildRounds,
    diagnoseKind: diagnoseKind,
    diagnoseCorrect: diagnoseCorrect,
    repairOptions: repairOptions,
    repairCorrect: repairCorrect,
    applyRepair: applyRepair,
    cap: cap
  };

}(typeof window !== 'undefined' ? window : this));
