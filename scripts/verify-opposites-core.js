#!/usr/bin/env node
/* =====================================================================
   verify-opposites-core.js — the MEASURED build-gate for "Quill's Mirror
   Market" (K.L.5.b · antonyms). Loads the REAL opposites-core.js + the deck +
   the opposites-pairs.json SoT, drives an opposite-relation ORACLE + the
   critic-armed adversary set. HALTS the build on any failure.

   THE HEADLINE PROOF (the critic's deepest fix): an opposite-relation ORACLE
   wins 100% while —
     • DIMENSION-MATCH (picks any choice sharing the target's dimension) → ≤chance
       on CATEGORICAL rounds (the opposite AND the same-dim sibling both share it)
     • ASSOCIATION (argmax most-related) → mis-fires on the related/sibling decoy
     • FAMILIAR-PAIR (a common-opposites table) → ≤chance on categorical
     • FIRST/RANDOM (index-0) → 0%
   — all lose on the categorical rounds. A same-dimension distractor is what
   makes opposition load-bearing (the cohort's association-only gate was blind
   to the dimension heuristic).
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'opposites-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'opposites-activities.json');
const SOT = path.join(REPO, 'mini tools', 'opposites-pairs.json');

function loadCore() {
  const src = fs.readFileSync(CORE, 'utf8');
  const sandbox = {};
  new Function('window', 'self', src)(sandbox, sandbox);
  if (!sandbox.OppositesCore) throw new Error('OppositesCore did not attach');
  return sandbox.OppositesCore;
}

const C = loadCore();
const ROUNDS = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'))[0].params.rounds;
const PAIRS = JSON.parse(fs.readFileSync(SOT, 'utf8'));
const GRADABLE_MIDDLES = new Set((PAIRS.gradableMiddles || []).map((s) => s.toLowerCase()));
const fails = [];
const note = (cond, msg) => { if (!cond) fails.push(msg); };
const pct = (n, d) => (d ? Math.round((n / d) * 100) : 0);

const categorical = ROUNDS.filter((r) => C.isCategorical(r));
const single = ROUNDS.filter((r) => C.SINGLE_OPPOSITE[r.cog]);

/* ---------- 1. OPPOSITE-RELATION ORACLE → 100% ---------- */
let oracleOk = 0;
ROUNDS.forEach((r) => { if (C.isAnswer(r, C.oracle(r))) oracleOk += 1; });
note(oracleOk === ROUNDS.length, `oracle self-consistency ${oracleOk}/${ROUNDS.length}`);
/* answer derived from relation, not stored: flip the opposite's relation → oracle changes */
note(single.every((r) => {
  const probe = JSON.parse(JSON.stringify(r));
  const before = C.oracle(probe);
  probe.choices.forEach((c) => { if (c.relation === 'opposite') c.relation = 'related'; });
  return C.oracle(probe) !== before;   /* the opposite is gone → answer changes (-1) */
}), 'ANSWER_FROM_RELATION_NOT_STORED: oracle unchanged when the opposite relation was removed');

/* ---------- 2. DIMENSION-MATCH (the deepest) → ≤chance on categorical ---------- */
/* A dimension-keyed cheat picks any choice sharing the target's dimension but
   CANNOT tell the opposite from the same-dim sibling — both carry the dimension.
   The honest model is a UNIFORM pick among the same-dim choices, so the expected
   accuracy on a round is 1/sameDimCount. (A deterministic "first same-dim"
   solver would land on the opposite by mere array order — that measures choice
   ORDERING, not the discrimination the standard demands.) Every categorical
   round must have ≥2 same-dim choices → expected ≤ 0.5. */
function sameDimCount(r) {
  const oid = r.target && r.target.oppositionId;
  return r.choices.filter((c) => c.dimension && c.dimension === oid).length;
}
let dmExpected = 0;
categorical.forEach((r) => {
  const n = sameDimCount(r);
  /* the opposite is one of the n same-dim choices → uniform-pick hits it 1/n */
  dmExpected += n >= 1 ? 1 / n : 0;
});
const dmExpectedPct = pct(dmExpected, categorical.length);
note(dmExpectedPct <= 50, `DIMENSION-MATCH expected ${dmExpectedPct}% on categorical rounds (need ≤50% — uniform-pick among ≥2 same-dim choices cannot disambiguate the opposite from the same-dim sibling)`);
note(categorical.every((r) => sameDimCount(r) >= 2), 'a categorical round has <2 same-dimension choices (a dimension cheat could then uniquely pick the opposite)');
note(categorical.every((r) => C.facts(r).dimensionMatchSolverFails), 'dimensionMatchSolverFails not true on a categorical round (need ≥2 same-dimension choices)');
note(categorical.every((r) => C.facts(r).sameDimensionNonOppositeNonMiddleDecoyPresent), 'a categorical round lacks a same-dimension-sibling decoy');

/* ---------- 3. ASSOCIATION → mis-fires on the sibling/related decoy ---------- */
/* picks the same-dim-sibling/related choice (the "most associated" non-opposite) */
function assoc(r) {
  for (let i = 0; i < r.choices.length; i++) if (r.choices[i].relation === 'same-dim-sibling') return i;
  for (let j = 0; j < r.choices.length; j++) if (r.choices[j].relation === 'related') return j;
  return 0;
}
let asRight = 0;
categorical.forEach((r) => { if (C.isAnswer(r, assoc(r))) asRight += 1; });
note(asRight === 0, `ASSOCIATION scored ${pct(asRight, categorical.length)}% on categorical (need 0% — the opposite is not the most-associated)`);
note(categorical.every((r) => C.facts(r).oppositeIsNotMostAssociated), 'oppositeIsNotMostAssociated violated');

/* ---------- 4. FAMILIAR-PAIR → ≤chance on categorical ---------- */
const FAMILIAR = { 'black': 'white', 'up': 'down', 'big': 'small', 'hot': 'cold', 'happy': 'sad', 'day': 'night', 'open': 'closed', 'on': 'off', 'full': 'empty' };
function familiar(r) {
  const want = r.target && FAMILIAR[r.target.word];
  if (want) for (let i = 0; i < r.choices.length; i++) if (r.choices[i].word === want) return i;
  return 0;
}
let famRight = 0;
categorical.forEach((r) => { if (C.isAnswer(r, familiar(r))) famRight += 1; });
/* rote is accepted on complementary; on categorical the familiar table only
   covers black/up so it should NOT win them all */
note(famRight <= Math.ceil(categorical.length / 2), `FAMILIAR-PAIR scored ${pct(famRight, categorical.length)}% on categorical (need ≤50% — not all categorical are rote table pairs)`);

/* ---------- 5. FIRST/RANDOM → 0% on single-opposite ---------- */
let firstRight = 0;
single.forEach((r) => { if (C.isAnswer(r, 0)) firstRight += 1; });
note(firstRight === 0, `FIRST (index-0) scored ${pct(firstRight, single.length)}% (need 0% — correct never index-0)`);
note(single.every((r) => C.facts(r).correctNotIndex0 && C.facts(r).multiplePlausibleChoices), 'correctNotIndex0 / multiplePlausibleChoices violated');

/* ---------- 6. STRUCTURAL ---------- */
const df = C.deckFacts(ROUNDS);
note(df.distinctCogs.length >= 7, `only ${df.distinctCogs.length} distinct ACTIONS (need ≥7): ${df.distinctCogs.join(', ')}`);
note(df.complementaryShare <= 0.5, `complementary share ${Math.round(df.complementaryShare * 100)}% over the 50% cap`);
note(df.categoricalCount >= 4, `only ${df.categoricalCount} categorical rounds (need ≥4 for a load-bearing discrimination layer)`);
/* oppositionId never in the rendered snapshot */
note(ROUNDS.every((r) => !/oppositionId|"relation"|"dimension"/.test(JSON.stringify(C.snapshot(r)))), 'snapshot leaked oppositionId / relation / dimension');
note(ROUNDS.every((r) => C.facts(r).oppositionIdNotRendered && C.facts(r).answerFromRelationNotStored && C.facts(r).choicesImageAnchored), 'oppositionIdNotRendered / answerFromRelationNotStored / choicesImageAnchored false');
/* NO gradable middle as a choice (validated vs the SoT) */
note(ROUNDS.every((r) => C.allTokens(r).every((t) => !GRADABLE_MIDDLES.has(String(t.word).toLowerCase()))), 'NO_GRADABLE_MIDDLE_AS_CHOICE: a gradable middle (warm/medium/…) appears as a choice');
/* verb rounds carry a same-axis-non-opposite motion decoy */
note(ROUNDS.filter((r) => r.cog === 'verb').every((r) => C.facts(r).verbRoundHasSameAxisNonOppositeMotion), 'a verb round lacks a same-axis-non-opposite motion decoy');
/* the Mirror-Book is receive-only — there is no category-sort mechanic (no round routes INTO a category bin; route is relation-judgment) */
note(ROUNDS.every((r) => r.cog !== 'route' || (r.stream && !r.bins)), 'NO_CATEGORY_SORT_MECHANIC: a route round looks like a category-sort (has bins)');

/* ---------- report ---------- */
console.log('Opposites core gate —');
console.log(`  opposite-relation oracle: ${pct(oracleOk, ROUNDS.length)}%  (${oracleOk}/${ROUNDS.length})`);
console.log(`  dimension-match (categ.) : ${dmExpectedPct}% expected   on ${categorical.length} categorical (uniform among same-dim)`);
console.log(`  association (categ.)     : ${pct(asRight, categorical.length)}%`);
console.log(`  familiar-pair (categ.)   : ${pct(famRight, categorical.length)}%`);
console.log(`  first/random (single)    : ${pct(firstRight, single.length)}%`);
console.log(`  distinct ACTIONS         : ${df.distinctCogs.length} (${df.distinctCogs.join(', ')})`);
console.log(`  per-cog: ${JSON.stringify(df.perCog)}   categorical: ${df.categoricalCount}   complementary: ${Math.round(df.complementaryShare * 100)}%`);
console.log('');
if (fails.length) {
  console.error(`OPPOSITES CORE GATE FAILED — ${fails.length}:`);
  [...new Set(fails)].forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log('OPPOSITES CORE GATE PASSED — the opposite-relation oracle wins 100%; the DIMENSION-MATCH solver (the critic\'s deepest) + association + familiar-pair + first/random all ≤chance on the categorical rounds (the same-dimension sibling makes "pick the same-kind word" ambiguous); the answer is derived from relation (not stored); oppositionId never rendered; no gradable middle as a choice; verb rounds carry a same-axis motion decoy; ≥7 distinct ACTIONS; complementary recall tagged + capped.');
process.exit(0);
