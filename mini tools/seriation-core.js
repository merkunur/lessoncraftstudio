/* =====================================================================
   THE FARAWAY SHELF — CORE  (seriation-core.js)
   ---------------------------------------------------------------------
   CCSS 1.MD.A.1 — order three objects by length; compare the lengths of two
   objects indirectly by using a third object. Pure cognition, NO DOM. 0 lines
   to ANY existing core + lcs-shell.{js,css}.

   CLARITY-FIRST redesign of #69 (2026-06-27): the spec's scale-inverted
   "lying pixels", frozen cord-segment memory rail, REMEASURE_IMPOSSIBLE, and
   PREMISE_ROLE_FREQUENCY solver rigor (+ the genuine-40%-transitive ceiling)
   are set aside for clarity. The standard's heart — order by length + compare
   indirectly via a third object — is kept in a clear, HONEST-pixel form: a
   shared measuring cord is the go-between (the "third object"), each ribbon's
   drawn length IS its real length, and the child finds the longest / shortest
   / the-one-as-long-as-the-cord.

   THE ANSWER IS DERIVED FROM THE RIBBON LENGTHS, NEVER STORED:
     mode 'longest'  → the ribbon with the greatest len
     mode 'shortest' → the ribbon with the least len
     mode 'samecord' → the ribbon whose len === the round's cordLen
   No stored isCorrect / correctIndex anywhere.
   ===================================================================== */
(function (global) {
  'use strict';

  function ribbonsOf(round) { return (round && round.ribbons) || []; }

  function oracle(round) {
    var r = ribbonsOf(round); if (!r.length) return -1;
    if (round.mode === 'samecord') {
      for (var i = 0; i < r.length; i++) if (r[i].len === round.cordLen) return i;
      return -1;
    }
    var best = 0;
    for (var j = 1; j < r.length; j++) {
      if (round.mode === 'shortest' ? r[j].len < r[best].len : r[j].len > r[best].len) best = j;
    }
    return best;
  }
  function isAnswer(round, idx) {
    var r = ribbonsOf(round);
    if (idx < 0 || idx >= r.length) return false;
    if (round.mode === 'samecord') return r[idx].len === round.cordLen;
    return idx === oracle(round);   /* the unique extreme (lengths are distinct per round) */
  }
  function correctCount(round) {
    var r = ribbonsOf(round), n = 0;
    for (var i = 0; i < r.length; i++) if (isAnswer(round, i)) n++;
    return n;
  }

  function snapshot(round) {
    return {
      id: round.id, mode: round.mode, cordLen: round.cordLen,
      ribbons: ribbonsOf(round).map(function (x) { return { id: x.id, color: x.color, label: x.label, len: x.len }; })   /* answer NOT exposed */
    };
  }

  function facts(round) {
    var r = ribbonsOf(round), lens = r.map(function (x) { return x.len; });
    var distinct = new Set(lens).size === lens.length;
    var cordMatches = r.filter(function (x) { return x.len === round.cordLen; }).length;
    return {
      mode: round.mode,
      modeValid: round.mode === 'longest' || round.mode === 'shortest' || round.mode === 'samecord',
      ribbonCount: r.length,
      distinctLengths: distinct,
      sameCordValid: round.mode !== 'samecord' || cordMatches === 1,
      exactlyOneCorrect: correctCount(round) === 1,
      derivedNotStored: true,
      oracleValid: oracle(round) >= 0
    };
  }

  function deckFacts(rounds) {
    var modes = {}, sets = {}, ex = {};
    (rounds || []).forEach(function (r) {
      modes[r.mode] = 1; ex[r.id] = 1;
      sets[ribbonsOf(r).map(function (x) { return x.id + ':' + x.len; }).sort().join(',') + '|' + r.cordLen] = 1;
    });
    return {
      total: (rounds || []).length,
      distinctModes: Object.keys(modes),
      distinctSets: Object.keys(sets).length,
      distinctExercises: Object.keys(ex).length
    };
  }

  function audit(round) {
    return {
      id: round.id, mode: round.mode, cordLen: round.cordLen,
      ribbons: ribbonsOf(round).map(function (x) { return x.id + '=' + x.len; }),
      oracleIndex: oracle(round)
    };
  }

  global.SeriationCore = {
    oracle: oracle, isAnswer: isAnswer, correctCount: correctCount,
    snapshot: snapshot, facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
