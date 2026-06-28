/* =====================================================================
   CORE — Mend Page  (mend-page-core.js)
   ---------------------------------------------------------------------
   Generic, LOCALE-NEUTRAL "restore the meaning" cognition (the spec's
   `engine-mend-page.js`) — the head of the reusable restore-the-text
   family. First skin: "Granny's Mending Basket" — CCSS RF.1.4.a (read
   for purpose + UNDERSTANDING; comprehension-MONITORING). A torn album
   page shows a faded grey picture + a caption with a tear; the child
   reads, works out the piece the MEANING needs, and mends it — the
   picture then develops into colour (the reward, NEVER the answer-key).

   ONE abstract op: tear-slots + a piece set + ONE validator
   `attempt(round, response)`. The round `type` is a strategy field, not
   a code fork. **The engine NEVER holds a sentence** — every string lives
   in the round descriptor (authored per locale) or the activity chrome.

   The anti-guess backbone, proven MEASURED by the build-gate (the analog
   of Game 5's counting-solver): for every option-menu page
   (cloze / contradiction / connect) FOUR dumb non-reading solvers run and
   ALL must FAIL — keyword-only, POS-only, picture-only, frequency-sense
   (the soup-catcher). A page any solver passes is REJECTED. The answer is
   fixed by an UPSTREAM keystone word (not in the gap's ±1 neighbours), the
   options are POS-uniform + grammar-valid, and the picture is disjoint from
   the option set (visibleObjects ∩ pieceValues = ∅; the answer-detail lives
   in the torn region, shown only on the correct mend).

   Pure functions, no DOM (mirrors missing-part-core.js / river-steer-core.js).
   ===================================================================== */
(function (global) {
  'use strict';

  /* the option-menu reading types the adversarial solver bank defends */
  var SOLVER_TYPES = ['cloze', 'contradiction', 'connect'];

  /* ---- the ONE validator (per-type; the answer is DERIVED from the descriptor) ---- */
  function attempt(round, response) {
    switch (round.type) {
      case 'cloze':
      case 'connect':
      case 'contradiction':
      case 'placement':
      case 'match':
        return response === round.answer;
      case 'sort': {
        var map = round.extras && round.extras.sortMap; if (!map) return false;
        var keys = Object.keys(map); if (!keys.length) return false;
        for (var i = 0; i < keys.length; i++) { if (!response || response[keys[i]] !== map[keys[i]]) return false; }
        return true;
      }
      case 'sequence': {
        var ord = round.extras && round.extras.sequenceOrder; if (!ord || !response || response.length !== ord.length) return false;
        for (var j = 0; j < ord.length; j++) { if (response[j] !== ord[j]) return false; }
        return true;
      }
      default: return false;
    }
  }

  /* connect step-1: is this token the pronoun's referent? */
  function isReferent(round, idx) { return !!(round.extras) && idx === round.extras.referentIndex; }

  function signature(round) { return round.type; }                       // 7 type+render signatures
  function pieceValues(round) { return (round.pieces || []).map(function (p) { return p.value; }); }
  function visibleObjects(round) { return (round.picture && round.picture.visibleObjects) || []; }

  /* ---- the adversarial solver bank (operate on the hand-authored attributes) ---- */
  // keyword-only: pick the option with the strongest LOCAL tie to the gap's ±1 neighbours.
  function sKeyword(round) {
    var p = round.pieces; if (!p || !p.length) return null;
    var best = p[0]; for (var i = 1; i < p.length; i++) if ((p[i].localAssocScore || 0) > (best.localAssocScore || 0)) best = p[i];
    return best.value;
  }
  // frequency-sense: pick the most frequent / idiomatic completion (freqRank 1 = most frequent). THE SOUP-CATCHER.
  function sFrequency(round) {
    var p = round.pieces; if (!p || !p.length) return null;
    var best = p[0]; for (var i = 1; i < p.length; i++) if ((p[i].freqRank || 99) < (best.freqRank || 99)) best = p[i];
    return best.value;
  }
  // POS-only: if every option shares a part of speech, the POS picker is at chance → null. Else it can exploit the odd one.
  function sPos(round) {
    var p = round.pieces; if (!p || !p.length) return null;
    var first = p[0].pos, uniform = p.every(function (x) { return x.pos === first; });
    if (uniform) return null;
    // not uniform → the discriminating strategy picks the POS-minority option
    var counts = {}; p.forEach(function (x) { counts[x.pos] = (counts[x.pos] || 0) + 1; });
    var odd = p.filter(function (x) { return counts[x.pos] === 1; })[0];
    return odd ? odd.value : null;
  }
  // picture-only: pick any option that names a thing visible in the (grey) picture.
  function sPicture(round) {
    var vis = visibleObjects(round), p = round.pieces || [];
    for (var i = 0; i < p.length; i++) { if (p[i].picsTrap || vis.indexOf(p[i].value) >= 0) return p[i].value; }
    return null;
  }

  /* ---- structural predicates the gate asserts ---- */
  // keystone clue is UPSTREAM of the gap and NOT in its ±1 neighbours (forces global reading).
  function keystoneOK(round) {
    if (typeof round.keystoneIndex !== 'number' || typeof round.gapIndex !== 'number') return false;
    return round.keystoneIndex < round.gapIndex && (round.gapIndex - round.keystoneIndex) >= 2;
  }
  // the picture cannot be the answer-key: no option is a visible object + the detail is torn-away.
  function pictureDisjoint(round) {
    var vis = visibleObjects(round), vals = pieceValues(round);
    var overlap = vals.some(function (v) { return vis.indexOf(v) >= 0; });
    return !overlap && round.picture && round.picture.answerDetailInTornRegion !== false;
  }
  function hasLocalFitDecoy(round) { return sKeyword(round) !== round.answer; }    // a decoy out-scores the answer locally
  function hasFrequencyDecoy(round) { return sFrequency(round) !== round.answer; }  // a more-frequent decoy exists
  function posUniform(round) { return sPos(round) === null; }
  // a picture-trap is required only where options could name a thing (a noun option).
  function picsTrapRequired(round) { return round.picsTrapExpected === true; }
  function hasPicsTrap(round) { return (round.pieces || []).some(function (p) { return p.picsTrap; }); }

  // enumerate the option/arrangement space → guess rate (exactly one correct).
  function guessRate(round) {
    switch (round.type) {
      case 'cloze': case 'connect': case 'contradiction': return round.pieces && round.pieces.length ? 1 / round.pieces.length : 1;
      case 'placement': return round.extras && round.extras.zones ? 1 / round.extras.zones.length : 1;
      case 'match': return round.extras && round.extras.pictures ? 1 / round.extras.pictures : 0.5;
      case 'sequence': { var n = (round.extras && round.extras.sequenceOrder || []).length; var f = 1; for (var i = 2; i <= n; i++) f *= i; return n ? 1 / f : 1; }
      case 'sort': { var bins = (round.extras && round.extras.sortBins || []).length || 2; var items = round.extras && round.extras.sortMap ? Object.keys(round.extras.sortMap).length : 0; return items ? 1 / Math.pow(bins, items) : 1; }
      default: return 1;
    }
  }

  // a minimal pair: same referents, differ by exactly one meaning-token, different answers.
  function minimalPairValid(a, b) {
    if (!a || !b || a.minimalPairId == null || a.minimalPairId !== b.minimalPairId) return false;
    if (a.answer === b.answer) return false;
    var ta = (a.tokens || []).map(function (t) { return t.t || (t.gap ? '__' : '__'); });
    var tb = (b.tokens || []).map(function (t) { return t.t || (t.gap ? '__' : '__'); });
    if (ta.length !== tb.length) return false;
    var diffs = 0; for (var i = 0; i < ta.length; i++) if (ta[i] !== tb[i]) diffs++;
    return diffs === 1;
  }

  global.MendPageCore = {
    SOLVER_TYPES: SOLVER_TYPES,
    attempt: attempt,
    isReferent: isReferent,
    signature: signature,
    pieceValues: pieceValues,
    visibleObjects: visibleObjects,
    keystoneOK: keystoneOK,
    pictureDisjoint: pictureDisjoint,
    hasLocalFitDecoy: hasLocalFitDecoy,
    hasFrequencyDecoy: hasFrequencyDecoy,
    posUniform: posUniform,
    picsTrapRequired: picsTrapRequired,
    hasPicsTrap: hasPicsTrap,
    guessRate: guessRate,
    minimalPairValid: minimalPairValid,
    SOLVERS: { keyword: sKeyword, pos: sPos, picture: sPicture, frequency: sFrequency }
  };

}(typeof window !== 'undefined' ? window : this));
