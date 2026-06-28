/* =====================================================================
   PEPPER'S SOUND SWAP — CORE  (phoneme-swap-core.js)
   ---------------------------------------------------------------------
   CCSS RF.K.2.e — add/substitute individual phonemes to make new words.
   First skin: "Pepper's Sound Swap." Pure cognition, NO DOM. The child hears a
   picture-word, swaps ONE sound (cued by the new letter), and taps the picture
   of the new word.

   THE ANSWER IS DERIVED BY PHONEME MATCH, NEVER STORED. A round stores
   {target:{noun,themeDir,b,m,e}, swap:{position:'b'|'m'|'e', phoneme, letter},
    choices:[{noun,themeDir,b,m,e}×3]}. `oracle` = the choice whose {b,m,e}
   equals the target with [position] replaced by swap.phoneme. The `letter` is a
   DISPLAY cue (the grapheme), not the answer. 0 lines to any protected core +
   lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  function swapped(target, swap) {
    var t = { b: target.b, m: target.m, e: target.e };
    t[swap.position] = swap.phoneme;
    return t;
  }
  function same(a, b) { return a.b === b.b && a.m === b.m && a.e === b.e; }
  function correctIndex(round) {
    var goal = swapped(round.target, round.swap), ch = round.choices || [];
    for (var i = 0; i < ch.length; i++) { if (same(ch[i], goal)) return i; }
    return -1;
  }
  function oracle(round) { return correctIndex(round); }
  function grade(round, id) {
    var c = (round.choices || [])[id]; if (!c) return false;
    return same(c, swapped(round.target, round.swap));
  }

  function childView(round) {
    return {
      target: { noun: round.target.noun, themeDir: round.target.themeDir },
      swap: { position: round.swap.position, letter: round.swap.letter },
      choices: (round.choices || []).map(function (c, i) { return { id: i, noun: c.noun, themeDir: c.themeDir }; })
    };
  }

  /* phonemes shared between two tokens (of b/m/e) */
  function shareCount(a, b) { var n = 0; if (a.b === b.b) n++; if (a.m === b.m) n++; if (a.e === b.e) n++; return n; }

  function facts(round) {
    var goal = swapped(round.target, round.swap), ch = round.choices || [];
    var matches = ch.filter(function (c) { return same(c, goal); }).length;
    /* a near-miss foil shares exactly 2 of 3 phonemes with the ANSWER (looks like it) */
    var nearMiss = ch.some(function (c) { return !same(c, goal) && shareCount(c, goal) === 2; });
    var positions = { b: 1, m: 1, e: 1 };
    return {
      validPosition: !!positions[round.swap.position],
      exactlyOneMatch: matches === 1,
      targetNotAmongChoices: !ch.some(function (c) { return c.noun === round.target.noun; }),
      nearMissPresent: nearMiss,
      threeChoices: ch.length === 3,
      distinct: new Set(ch.map(function (c) { return c.noun; })).size === ch.length
    };
  }

  function deckFacts(rounds) {
    rounds = rounds || [];
    var n = rounds.length || 1, longHits = 0, shortHits = 0, posCount = {}, ans = {};
    rounds.forEach(function (r) {
      var ch = r.choices || [], ci = correctIndex(r);
      posCount[ci] = (posCount[ci] || 0) + 1;
      ans[ch[ci].noun] = (ans[ch[ci].noun] || 0) + 1;
      var lens = ch.map(function (c) { return c.noun.length; });
      var mx = Math.max.apply(null, lens), mn = Math.min.apply(null, lens);
      if (lens[ci] === mx && lens.filter(function (l) { return l === mx; }).length === 1) longHits++;
      if (lens[ci] === mn && lens.filter(function (l) { return l === mn; }).length === 1) shortHits++;
    });
    var maxPos = Math.max.apply(null, Object.keys(posCount).map(function (k) { return posCount[k]; }));
    var maxAns = Math.max.apply(null, Object.keys(ans).map(function (k) { return ans[k]; }));
    return { total: rounds.length, positionBot: maxPos / n, longestBot: longHits / n, shortestBot: shortHits / n, fixedGuessBot: maxAns / n };
  }

  function allNouns(rounds) {
    var s = {};
    (rounds || []).forEach(function (r) { s[r.target.noun] = r.target.themeDir; (r.choices || []).forEach(function (c) { s[c.noun] = c.themeDir; }); });
    return s;
  }

  function audit(round) { var ci = correctIndex(round); return { target: round.target.noun, swap: round.swap, answer: (round.choices[ci] || {}).noun }; }

  global.PhonemeSwapCore = {
    oracle: oracle, grade: grade, childView: childView, swapped: swapped,
    facts: facts, deckFacts: deckFacts, allNouns: allNouns, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
