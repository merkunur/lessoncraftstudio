#!/usr/bin/env node
/* =====================================================================
   verify-compound-order-core.js — build-time gate for the compound-
   sentence-production cognition behind "Sunny-Side Diner" (CCSS L.K.1.F).
   Loads the REAL mini tools/compound-order-core.js + the manifest rounds
   and proves, MEASURED (exit 0 = pass; 1 = any failure):

     • DROP-THE-CONJUNCTION bot FAILS — a read-back with the right foods +
       counts but NO coupler is neither structurally complete (can't even
       "Say it back") nor valid (the decisive proof: the conjunction is
       load-bearing, the analog of Game 5's counting-solver);
     • the COMPLETE COMPOUND is the one valid path (correct foods + counts +
       coupler → valid);
     • GRAB-FIRST-NOUN + IGNORE-COUNT bots can voice (complete) but FAIL
       (wrong) → the customer rejects; the tray alone never gates;
     • compound-majority ≥80%, AND-joins-DISTINCT-foods, counts ∈ {1,2,3},
       agreement-correct vs the table, ≥4 production-act types, no baked
       sentence/boolean.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'compound-order-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.CompoundOrderCore;
if (!Core) { console.error('FAIL: compound-order-core.js did not define window.CompoundOrderCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'sunny-side-diner-activities.json'), 'utf8'));
const rounds = manifest[0].params.rounds;

const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };

// extend rounds win on the GROWN order (base + extension); others on the order as-is.
function finalOrder(r) { return r.type === 'extend' ? { items: r.order.items.concat([r.extension]), conjunction: r.order.conjunction } : r.order; }

check(rounds.length >= 7, `only ${rounds.length} rounds`);
check(new Set(rounds.map((r) => r.type)).size >= 4, `only ${new Set(rounds.map((r) => r.type)).size} distinct act types (< 4 K-floor)`);
check(new Set(rounds.map((r) => r.id)).size >= 7, 'fewer than 7 distinct round ids');

let compoundCount = 0;
rounds.forEach((r) => {
  const L = `round[${r.id}/${r.type}]`;
  const order = finalOrder(r);

  // no baked sentence/boolean
  check(!('utter' in r) && !('valid' in r) && !('answer' in r), `${L}: stores a baked sentence/boolean (must be DERIVED)`);

  // counts ∈ {1,2,3,4}
  order.items.forEach((it) => check(it.quantity >= 1 && it.quantity <= 4, `${L}: count ${it.quantity} out of 1..4`));

  if (order.items.length >= 2) {
    compoundCount++;
    // AND joins DISTINCT foods (never degenerate into a count)
    const foods = order.items.map((it) => it.food);
    check(new Set(foods).size === foods.length, `${L}: the joined items are not distinct foods`);

    // the complete compound is the one valid path
    const correct = Core.SOLVERS.correctAssembled({ order });
    check(Core.readBackValid(order, correct), `${L}: the complete compound is not valid`);
    check(Core.structurallyComplete(order, correct), `${L}: the complete compound is not structurally complete`);

    // DROP-THE-CONJUNCTION — neither complete nor valid (the decisive proof)
    const noCoupler = Core.SOLVERS.dropConjunction({ order });
    check(!Core.structurallyComplete(order, noCoupler), `${L}: a coupler-less read-back is "Say it back"-able (the conjunction is not obligatory)`);
    check(!Core.readBackValid(order, noCoupler), `${L}: a coupler-less read-back is valid (the conjunction is not load-bearing)`);

    // GRAB-FIRST-NOUN — complete (voiceable) but wrong
    const gfn = Core.SOLVERS.grabFirstNoun({ order });
    check(Core.structurallyComplete(order, gfn), `${L}: grab-first-noun is not complete`);
    check(!Core.readBackValid(order, gfn), `${L}: grab-first-noun (ignore the near-cousin) was accepted`);

    // IGNORE-COUNT — fails on a count≥2 order
    if (order.items.some((it) => it.quantity >= 2)) {
      const ic = Core.SOLVERS.ignoreCount({ order });
      check(!Core.readBackValid(order, ic), `${L}: ignore-count (all quantity-1) was accepted`);
    }
  }

  // tray necessary-not-sufficient: a gathered tray + an EMPTY read-back is not complete
  check(!Core.structurallyComplete(order, { slots: [], coupler: false }), `${L}: an empty read-back counts as complete (tray alone gates)`);
  check(Core.trayValid(order.items.flatMap((it) => Array(it.quantity).fill(it.food)), order), `${L}: the correct tray is not trayValid`);

  // agreement-correct vs the table (utter contains the agreeing surfaces)
  const u = Core.utter(order, 'en');
  order.items.forEach((it) => {
    const surface = Core.agree(it.food, it.quantity);
    check(u.indexOf(surface) >= 0, `${L}: utter "${u}" missing the agreeing form "${surface}"`);
    if (it.quantity >= 2) check(/s\b/.test(surface) || surface !== Core.FOOD[it.food].one, `${L}: plural not agreed for ${it.quantity} ${it.food}`);
  });
  // the conjunction lemma appears once per join
  if (order.items.length >= 2) check(u.indexOf(' ' + (order.conjunction.lemma) + ' ') >= 0, `${L}: utter missing the conjunction "${order.conjunction.lemma}"`);
});

check(compoundCount / rounds.length >= 0.80, `compound-majority ${(compoundCount / rounds.length * 100).toFixed(0)}% (< 80%)`);

if (failures.length) {
  console.error(`FAIL — ${failures.length} compound-order violation(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${rounds.length} rounds / ${new Set(rounds.map((r) => r.type)).size} acts: the complete compound is the one valid path; ` +
  `drop-the-conjunction is neither complete nor valid (the coupler is load-bearing); grab-first-noun + ignore-count voice-but-fail; ` +
  `tray necessary-not-sufficient; ${(compoundCount / rounds.length * 100).toFixed(0)}% compound, AND joins distinct foods, agreement-correct.`);
process.exit(0);
