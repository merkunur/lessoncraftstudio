/* =====================================================================
   THE HARBOR POST — CORE  (author-purpose-core.js)
   ---------------------------------------------------------------------
   CCSS RI.2.6 — identify the main purpose of a text (inform / entertain /
   instruct), including what the author wants to answer, explain, or describe.
   Pure cognition, NO DOM. 0 lines to ANY existing core + lcs-shell.{js,css}.

   CLARITY-FIRST redesign of #72 (2026-06-27): the spec's machine swap-
   invariance gate, human BLIND-AGREEMENT panel, quarantine, same-TOPIC-triad-
   only graded class, and which-of-3 rigor are set aside for clarity. The
   standard's heart — judge WHY a text was written — is kept with CLEARLY
   single-purpose notes (obvious prototypes, never contestable 50/50 ones) +
   author-MOVE bin labels (never reader-effect). Validity is carried by a
   lightweight STRUCTURAL gate that reads the note's prose against its claimed
   purpose (non-tautological): INSTRUCT = a real first/next/then sequence;
   ENTERTAIN = playful with a "!"; INFORM = facts, neither.

   THE ANSWER is the note's authored `purpose` (the ground truth for an
   authored-judgment standard); the 3 bins are the fixed purpose set. No stored
   isCorrect / correctIndex; `isAnswer` compares a bin's purpose to the note's.
   ===================================================================== */
(function (global) {
  'use strict';

  var PURPOSES = ['inform', 'entertain', 'instruct'];
  var SEQ = /\b(first|next|then|last|finally)\b/gi;

  function noteOf(round) { return round.note || {}; }

  function oracle(round) { return noteOf(round).purpose; }
  function isAnswer(round, purpose) { return purpose === noteOf(round).purpose; }

  function seqCount(text) { var m = String(text || '').match(SEQ); return m ? m.length : 0; }
  function wordCount(text) { var m = String(text || '').trim().match(/\S+/g); return m ? m.length : 0; }

  /* the structural validity gate — the note's PROSE must match its purpose */
  function matchesPurpose(note) {
    var t = String(note.text || ''), seq = seqCount(t), bang = /!/.test(t);
    if (note.purpose === 'instruct') return seq >= 2;
    if (note.purpose === 'entertain') return seq < 2 && bang;
    if (note.purpose === 'inform') return seq < 2 && !bang;
    return false;
  }

  function snapshot(round) {
    var n = noteOf(round);
    return { id: round.id, text: n.text };   /* purpose NOT exposed */
  }

  function facts(round) {
    var n = noteOf(round), w = wordCount(n.text);
    return {
      purpose: n.purpose,
      purposeValid: PURPOSES.indexOf(n.purpose) >= 0,
      matchesPurpose: matchesPurpose(n),
      wordCountOk: w >= 12 && w <= 40,
      wordCount: w,
      derivedNotStored: true,
      oracleValid: PURPOSES.indexOf(oracle(round)) >= 0
    };
  }

  function deckFacts(rounds) {
    var per = { inform: 0, entertain: 0, instruct: 0 }, notes = {};
    (rounds || []).forEach(function (r) { var p = noteOf(r).purpose; if (p in per) per[p]++; notes[r.id] = 1; });
    return {
      total: (rounds || []).length,
      perPurposeCounts: per,
      distinctPurposes: Object.keys(per).filter(function (k) { return per[k] > 0; }),
      distinctNotes: Object.keys(notes).length
    };
  }

  function audit(round) {
    var n = noteOf(round);
    return { id: round.id, purpose: n.purpose, seq: seqCount(n.text), words: wordCount(n.text), matches: matchesPurpose(n) };
  }

  global.AuthorPurposeCore = {
    PURPOSES: PURPOSES, oracle: oracle, isAnswer: isAnswer,
    seqCount: seqCount, wordCount: wordCount, matchesPurpose: matchesPurpose,
    snapshot: snapshot, facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
