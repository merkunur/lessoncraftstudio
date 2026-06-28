/* =====================================================================
   CORE — Compound Order  (compound-order-core.js)
   ---------------------------------------------------------------------
   Generic, LOCALE-NEUTRAL "say the whole order back as one complete
   sentence" cognition (the spec's `engine-compound-order.js`) — the head
   of a reusable order-taking / compound-sentence family. First skin:
   "Sunny-Side Diner" — CCSS L.K.1.F (produce + EXPAND a complete COMPOUND
   sentence: "two pancakes and a milk, please"), gated on the READ-BACK
   (production), never the tray. Co-primary SL.K.2 (the tray-gather phase).

   Validity is DERIVED (tray-multiset / read-back / completeness), NEVER a
   stored boolean. The conjunction is an OBLIGATORY separately-placed token
   (the coupler): the two clause-halves only join when "and" is placed —
   the build-gate proves a DROP-THE-CONJUNCTION bot fails (the load-bearing
   proof, the analog of Game 5's counting-solver), the tray alone never
   gates, grab-first-noun + ignore-count fail, and the complete compound is
   the one valid path. Agreement (singular/plural) rides the utter-TEMPLATE
   (slots, not chip-concatenation §A.13.54), voiced from a per-locale table.

   Pure functions, no DOM. Mirrors puppet-speak-core.js / judge-balance-core.js.
   ===================================================================== */
(function (global) {
  'use strict';

  /* EN lexicon — the AGREEMENT SOURCE (the gate checks the utter output vs this;
     English "+s" is forbidden as the *rule*, the table IS the rule §A.13.54).
     `one` = the count-1 surface incl. article; `many` = the bare plural noun. */
  var FOOD = {
    pancake: { one: 'a pancake', many: 'pancakes' },
    egg: { one: 'an egg', many: 'eggs' },
    waffle: { one: 'a waffle', many: 'waffles' },
    muffin: { one: 'a muffin', many: 'muffins' },
    cookie: { one: 'a cookie', many: 'cookies' },
    banana: { one: 'a banana', many: 'bananas' },
    milk: { one: 'a milk', many: 'milks' },
    juice: { one: 'a juice', many: 'juices' },
    apple: { one: 'an apple', many: 'apples' }
  };
  var NUMWORD = { 1: 'one', 2: 'two', 3: 'three', 4: 'four' };

  /* the agreeing quantity+noun phrase: 1 → "a pancake"; 2 → "two pancakes". */
  function agree(food, count) {
    var f = FOOD[food]; if (!f) return String(count) + ' ' + food;
    return count === 1 ? f.one : (NUMWORD[count] + ' ' + f.many);
  }

  /* the LOCALIZED TEMPLATE — slots, not concatenation. Same string → TTS + bubble. */
  function utter(order, lang) {
    var lemma = (order.conjunction && order.conjunction.lemma) || 'and';
    var phrases = order.items.map(function (it) { return agree(it.food, it.quantity); });
    return "I'd like " + phrases.join(' ' + lemma + ' ') + ', please.';
  }

  /* the food multiset the tray must hold (NECESSARY, never the win). */
  function trayMultiset(order) {
    var m = {}; order.items.forEach(function (it) { m[it.food] = (m[it.food] || 0) + it.quantity; }); return m;
  }
  function sameMultiset(a, b) {
    var ka = Object.keys(a), kb = Object.keys(b); if (ka.length !== kb.length) return false;
    for (var i = 0; i < ka.length; i++) { if (a[ka[i]] !== b[ka[i]]) return false; } return true;
  }
  function trayValid(tray, order) { return sameMultiset(multisetOf(tray), trayMultiset(order)); }
  function multisetOf(list) { var m = {}; (list || []).forEach(function (food) { m[food] = (m[food] || 0) + 1; }); return m; }

  function needsCoupler(order) { return order.items.length >= 2; }

  /* the assembled read-back = { slots:[{food,count}|null,…], coupler:bool }. */
  function slotMultiset(assembled) {
    var m = {}; (assembled.slots || []).forEach(function (s) { if (s && s.food) m[s.food + '#' + s.count] = (m[s.food + '#' + s.count] || 0) + 1; }); return m;
  }
  function orderMultiset(order) {
    var m = {}; order.items.forEach(function (it) { m[it.food + '#' + it.quantity] = (m[it.food + '#' + it.quantity] || 0) + 1; }); return m;
  }

  /* "Say it back" ENABLE = all slots filled + the coupler placed — COMPLETENESS,
     never correctness (a complete-but-wrong read-back is voiced + diegetic, fix #4). */
  function structurallyComplete(order, assembled) {
    if ((assembled.slots || []).length !== order.items.length) return false;
    if (assembled.slots.some(function (s) { return !s || s.food == null || s.count == null; })) return false;
    if (needsCoupler(order) && !assembled.coupler) return false;
    return true;
  }

  /* the WIN (adjudicated only at voicing): frame ∧ coupler ∧ each food+count correct. */
  function readBackValid(order, assembled) {
    if (needsCoupler(order) && !assembled.coupler) return false;
    if ((assembled.slots || []).some(function (s) { return !s || s.food == null || s.count == null; })) return false;
    return sameMultiset(slotMultiset(assembled), orderMultiset(order));
  }

  function signature(round) { return round.type; }

  /* ---- the dumb-solver gauntlet (the gate drives these against readBackValid) ---- */
  function correctAssembled(round) { return { slots: round.order.items.map(function (it) { return { food: it.food, count: it.quantity }; }), coupler: true }; }
  function dropConjunction(round) { var a = correctAssembled(round); a.coupler = false; return a; }
  function grabFirstNoun(round) { var first = round.order.items[0]; return { slots: round.order.items.map(function () { return { food: first.food, count: first.quantity }; }), coupler: true }; }
  function ignoreCount(round) { return { slots: round.order.items.map(function (it) { return { food: it.food, count: 1 }; }), coupler: true }; }

  global.CompoundOrderCore = {
    FOOD: FOOD, NUMWORD: NUMWORD,
    agree: agree, utter: utter,
    trayMultiset: trayMultiset, trayValid: trayValid, multisetOf: multisetOf, sameMultiset: sameMultiset,
    needsCoupler: needsCoupler, structurallyComplete: structurallyComplete, readBackValid: readBackValid,
    orderMultiset: orderMultiset, slotMultiset: slotMultiset, signature: signature,
    SOLVERS: { correctAssembled: correctAssembled, dropConjunction: dropConjunction, grabFirstNoun: grabFirstNoun, ignoreCount: ignoreCount }
  };

}(typeof window !== 'undefined' ? window : this));
