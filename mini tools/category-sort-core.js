/* =====================================================================
   CORE — Category Sort  (category-sort-core.js)
   ---------------------------------------------------------------------
   Generic "sort common objects into superordinate CATEGORIES to gain a sense of
   the CONCEPTS" cognition. First skin: "Mim's Memory Baskets" — CCSS L.K.5.A
   (Vocabulary Acquisition & Use). The child drags each object into its labeled
   category basket — the literal category-FORMATION act. A logic-deduce sibling.

   THE SPINE — SPILL → SORT → REMEMBER: a few mixed objects + 3+ labeled category
   baskets; the child drops each object into the basket of the category it
   belongs to. Correct → the concept is spoken ("a dog is an ANIMAL!").

   LOAD-BEARING: CONCEPT-knowledge, not appearance.
     • WITHIN-CATEGORY VISUAL DIVERSITY — a category's objects share no single
       visible feature (a furry dog + a scaly fish + a feathery bird all ANIMALS)
       → a sort-by-appearance solver can't group them.
     • CROSS-CATEGORY VISUAL CONFOUND — objects in DIFFERENT categories share a
       feature (a red apple [Food] + a red fire-truck [Vehicle]) → sorting by
       color/shape MISLEADS.
     • 3+ LABELED BINS + NON-LEAKING WRONG-DROP — no coin-flip; a wrong drop
       returns the object + reveals nothing → category knowledge is the only path.
     • CATEGORY-GENERALIZATION — a category holds DIFFERENT objects across rounds
       → can't memorize an instance → the superordinate CONCEPT is forced.
     • NO COUNTING (the K.MD.B.3-differentiator).

   The OBJECT→CATEGORY bank + the visual-feature tags are HAND-AUTHORED (the image
   vocabulary has no category/attribute data). EN labels sourced from
   image-vocabulary.js (fire_truck authored for the EN pilot). Pure functions, no
   DOM. Mirrors mail-route / make-total / slingshot-tens.
   ===================================================================== */
(function (global) {
  'use strict';

  /* the superordinate category bins (concept-icon + text label — NEVER a bare
     color; the anti-color-sort) + the spoken concept stem. */
  var CATEGORY = {
    animal: { label: 'Animals', icon: '🐾', concept: 'an ANIMAL' },
    food: { label: 'Foods', icon: '🍴', concept: 'a FOOD' },
    vehicle: { label: 'Vehicles', icon: '🚗', concept: 'a thing you RIDE' },
    clothing: { label: 'Clothes', icon: '👕', concept: 'a thing you WEAR' },
    toy: { label: 'Toys', icon: '🧸', concept: 'a TOY' },
    shape: { label: 'Shapes', icon: '🔷', concept: 'a SHAPE' }
  };

  /* the HAND-AUTHORED bank: noun → { category, theme, label, vis:[feature-tags] }.
     Every noun confirmed to exist as a COLOR @2x.webp in its theme (§20.5). */
  var BANK = {
    dog: { category: 'animal', theme: 'animals', label: 'Dog', vis: ['furry'] },
    cat: { category: 'animal', theme: 'animals', label: 'Cat', vis: ['furry'] },
    fish: { category: 'animal', theme: 'animals', label: 'Fish', vis: ['scaly'] },
    duck: { category: 'animal', theme: 'animals', label: 'Duck', vis: ['feathery', 'yellow'] },
    rabbit: { category: 'animal', theme: 'animals', label: 'Rabbit', vis: ['furry'] },
    turtle: { category: 'animal', theme: 'animals', label: 'Turtle', vis: ['scaly'] },
    owl: { category: 'animal', theme: 'animals', label: 'Owl', vis: ['feathery'] },
    horse: { category: 'animal', theme: 'animals', label: 'Horse', vis: ['furry'] },
    pig: { category: 'animal', theme: 'animals', label: 'Pig', vis: ['pink'] },
    apple: { category: 'food', theme: 'fruits', label: 'Apple', vis: ['red', 'round'] },
    banana: { category: 'food', theme: 'fruits', label: 'Banana', vis: ['yellow', 'long'] },
    orange: { category: 'food', theme: 'fruits', label: 'Orange', vis: ['orange', 'round'] },
    strawberry: { category: 'food', theme: 'fruits', label: 'Strawberry', vis: ['red'] },
    cherry: { category: 'food', theme: 'fruits', label: 'Cherry', vis: ['red', 'round'] },
    carrot: { category: 'food', theme: 'vegetables', label: 'Carrot', vis: ['orange', 'long'] },
    broccoli: { category: 'food', theme: 'vegetables', label: 'Broccoli', vis: ['green'] },
    corn: { category: 'food', theme: 'vegetables', label: 'Corn', vis: ['yellow', 'long'] },
    tomato: { category: 'food', theme: 'vegetables', label: 'Tomato', vis: ['red', 'round'] },
    car: { category: 'vehicle', theme: 'vehicles', label: 'Car', vis: [] },
    bus: { category: 'vehicle', theme: 'vehicles', label: 'Bus', vis: ['yellow', 'long'] },
    train: { category: 'vehicle', theme: 'vehicles', label: 'Train', vis: ['long'] },
    fire_truck: { category: 'vehicle', theme: 'vehicles', label: 'Fire Truck', vis: ['red', 'long'] },
    boat: { category: 'vehicle', theme: 'vehicles', label: 'Boat', vis: [] },
    bicycle: { category: 'vehicle', theme: 'vehicles', label: 'Bicycle', vis: [] },
    hat: { category: 'clothing', theme: 'clothing', label: 'Hat', vis: [] },
    shoe: { category: 'clothing', theme: 'clothing', label: 'Shoe', vis: [] },
    shirt: { category: 'clothing', theme: 'clothing', label: 'Shirt', vis: [] },
    scarf: { category: 'clothing', theme: 'clothing', label: 'Scarf', vis: ['long'] },
    mitten: { category: 'clothing', theme: 'clothing', label: 'Mitten', vis: [] },
    ball: { category: 'toy', theme: 'toys', label: 'Ball', vis: ['round'] },
    kite: { category: 'toy', theme: 'toys', label: 'Kite', vis: [] },
    blocks: { category: 'toy', theme: 'toys', label: 'Blocks', vis: [] },
    circle: { category: 'shape', theme: 'shapes', label: 'Circle', vis: ['round'] },
    square: { category: 'shape', theme: 'shapes', label: 'Square', vis: [] },
    star: { category: 'shape', theme: 'shapes', label: 'Star', vis: [] },
    heart: { category: 'shape', theme: 'shapes', label: 'Heart', vis: ['red'] },
    triangle: { category: 'shape', theme: 'shapes', label: 'Triangle', vis: [] },
    diamond: { category: 'shape', theme: 'shapes', label: 'Diamond', vis: [] }
  };

  function info(noun) { return BANK[noun] || null; }
  function categoryOf(noun) { return BANK[noun] ? BANK[noun].category : null; }

  function newState(round) { return { round: round, placed: {}, everWrong: false, lastWrong: null }; }
  /* DROP — the ONLY input. Reads the object's CATEGORY (not a visible attribute).
     Correct → record; wrong → non-leaking (no state about the right basket). */
  function drop(s, noun, basketId) {
    var cat = categoryOf(noun), correct = (cat === basketId);
    if (correct) { s.placed[noun] = basketId; }
    else { s.everWrong = true; s.lastWrong = noun; }
    return { correct: correct, concept: correct ? CATEGORY[cat].concept : null, label: BANK[noun] ? BANK[noun].label : noun };
  }
  function isSolved(round, s) { return round.spill.every(function (n) { return s.placed[n] === categoryOf(n); }); }
  function isComplete(round, s) { return isSolved(round, s); }
  function firstAttemptCorrect(round, s) { return isSolved(round, s) && !s.everWrong; }

  /* ---- visual-feature analysis (the concept-load-bearing proofs) ---- */
  function tagsOf(noun) { return (BANK[noun] && BANK[noun].vis) || []; }
  /* a category is "visually diverse" iff its ≥2 members share NO common tag. */
  function withinCategoryVisualDiverse(round) {
    var byCat = {}; round.spill.forEach(function (n) { (byCat[categoryOf(n)] = byCat[categoryOf(n)] || []).push(n); });
    return Object.keys(byCat).every(function (c) {
      var members = byCat[c]; if (members.length < 2) return true;             // single-member: vacuously diverse
      var inter = tagsOf(members[0]).slice();
      members.slice(1).forEach(function (n) { inter = inter.filter(function (t) { return tagsOf(n).indexOf(t) >= 0; }); });
      return inter.length === 0;                                               // no tag common to all members
    });
  }
  /* a round has a cross-category visual confound iff two objects in DIFFERENT
     categories share a visible tag. */
  function crossCategoryVisualConfound(round) {
    var sp = round.spill;
    for (var i = 0; i < sp.length; i++) for (var j = i + 1; j < sp.length; j++) {
      if (categoryOf(sp[i]) !== categoryOf(sp[j])) {
        var shared = tagsOf(sp[i]).some(function (t) { return tagsOf(sp[j]).indexOf(t) >= 0; });
        if (shared) return true;
      }
    }
    return false;
  }
  /* the BEST a single-feature (binary has/lacks-tag) classifier can score. If it
     can't reach all-correct, a visual-feature-sorter FAILS. */
  function bestSingleFeatureCorrect(round) {
    var sp = round.spill, tags = {}; sp.forEach(function (n) { tagsOf(n).forEach(function (t) { tags[t] = 1; }); });
    var best = 0;
    Object.keys(tags).forEach(function (t) {
      var have = sp.filter(function (n) { return tagsOf(n).indexOf(t) >= 0; });
      var lack = sp.filter(function (n) { return tagsOf(n).indexOf(t) < 0; });
      var bestCat = function (group) { var c = {}; group.forEach(function (n) { c[categoryOf(n)] = (c[categoryOf(n)] || 0) + 1; }); var m = 0; Object.keys(c).forEach(function (k) { if (c[k] > m) m = c[k]; }); return m; };
      best = Math.max(best, bestCat(have) + bestCat(lack));
    });
    return best;   // < spill.length  ⇒  no single feature sorts everything
  }

  function basketsCount(round) { return round.baskets.length; }
  function facts(round, s) {
    return {
      cog: round.cog,
      withinCategoryVisualDiverse: withinCategoryVisualDiverse(round),
      crossCategoryVisualConfound: crossCategoryVisualConfound(round),
      basketsCount: basketsCount(round),
      wrongDropLeaksRightBin: false,                                           // structural: a wrong drop records nothing about the right basket
      noCountingSurface: true,                                                 // structural: no count API anywhere
      bestSingleFeatureCorrect: bestSingleFeatureCorrect(round),
      spillCount: round.spill.length,
      firstAttemptCorrect: s ? firstAttemptCorrect(round, s) : false
    };
  }
  function snapshot(round, s) { return { cog: round.cog, spill: round.spill.slice(), baskets: round.baskets.slice(), placed: Object.keys(s.placed) }; }

  /* a category "generalizes" across the pool iff (where it is the sorted category
     of an object in ≥2 rounds) it holds ≥2 DISTINCT nouns. */
  function categoryGeneralizes(rounds) {
    var byCat = {}, roundsPerCat = {};
    rounds.forEach(function (r) {
      var seen = {};
      r.spill.forEach(function (n) { var c = categoryOf(n); (byCat[c] = byCat[c] || {})[n] = 1; if (!seen[c]) { roundsPerCat[c] = (roundsPerCat[c] || 0) + 1; seen[c] = 1; } });
    });
    return Object.keys(roundsPerCat).every(function (c) { return roundsPerCat[c] < 2 || Object.keys(byCat[c]).length >= 2; });
  }

  /* ---- the SOLVER gauntlet (the gate drives these against the REAL core) ---- */
  /* CATEGORY-SORTER (PASSES 100%) — knows the concept-map → sorts every object. */
  function categorySorter(round) { var s = newState(round); round.spill.forEach(function (n) { drop(s, n, categoryOf(n)); }); return { solved: isSolved(round, s) }; }
  /* VISUAL-FEATURE-SORTER (FAILS) — sorts only by a visible feature → cannot
     reach all-correct (within-diverse + cross-confound). */
  function visualFeatureSorter(round) { return { bestCorrect: bestSingleFeatureCorrect(round), spillCount: round.spill.length, reconstructs: bestSingleFeatureCorrect(round) >= round.spill.length }; }
  /* TRIAL-AND-ERROR — a wrong drop returns the object + reveals nothing; with 3+
     baskets a random dropper is at chance. */
  function trialAndError(round) { return { baskets: basketsCount(round), leaks: false }; }

  global.CategorySortCore = {
    CATEGORY: CATEGORY, BANK: BANK, info: info, categoryOf: categoryOf,
    newState: newState, drop: drop, isSolved: isSolved, isComplete: isComplete, firstAttemptCorrect: firstAttemptCorrect,
    withinCategoryVisualDiverse: withinCategoryVisualDiverse, crossCategoryVisualConfound: crossCategoryVisualConfound,
    bestSingleFeatureCorrect: bestSingleFeatureCorrect, categoryGeneralizes: categoryGeneralizes, facts: facts, snapshot: snapshot,
    SOLVERS: { categorySorter: categorySorter, visualFeatureSorter: visualFeatureSorter, trialAndError: trialAndError }
  };

}(typeof window !== 'undefined' ? window : this));
