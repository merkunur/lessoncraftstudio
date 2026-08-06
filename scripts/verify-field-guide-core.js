#!/usr/bin/env node
/* =====================================================================
   verify-field-guide-core.js — the MEASURED build-gate for "Detective
   Dewey's Field Guide" (1.RI.5 · use text features to LOCATE). Loads the
   REAL field-guide-core.js via `new Function` + the field-guide-activities.json
   deck, then drives the core with a read-the-feature oracle + the critic-armed
   adversary set. HALTS the build on any failure. NOTHING re-implements the core.

   THE HEADLINE PROOF (the critic's deepest, program-wide fix): a read-the-
   feature ORACLE wins 100% while —
     • VISUAL-SEARCH   (pick by salience; equal-salience tags)          → 0%
     • WORD-MATCH      (label overlaps the question token; absent)      → 0%
     • FIRST/RANDOM    (index-0 / fixed position; correct never idx-0)  → 0%
     • BLIND-TO-FEATURE(blank items[].functions → no resolve)           → fails
     • WORLD-KNOWLEDGE (a REAL prior table — fly→wings, glow→light,
                        meaning→glossary…; fictional referents have no entry) → ≤chance on USE rounds
   — all lose. The world-model adversary closes the cohort's blind spot (a
   no-text solver ≠ a prior-knowledge solver; generalizes to any standard
   whose answer can live in the player's head).
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'field-guide-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'field-guide-activities.json');

function loadCore() {
  const src = fs.readFileSync(CORE, 'utf8');
  const sandbox = {};
  new Function('window', 'self', src)(sandbox, sandbox);
  if (!sandbox.FieldGuideCore) throw new Error('FieldGuideCore did not attach to the global');
  return sandbox.FieldGuideCore;
}
function loadDeck() {
  const rows = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  const row = rows.find((r) => r.id === 'field-guide.text-features.1-ri-5');
  if (!row || !row.params || !Array.isArray(row.params.rounds)) throw new Error('rounds not found');
  return row.params.rounds;
}

const C = loadCore();
const ROUNDS = loadDeck();
const fails = [];
const note = (cond, msg) => { if (!cond) fails.push(msg); };
const pct = (n, d) => (d ? Math.round((n / d) * 100) : 0);

const useRounds = ROUNDS.filter((r) => C.isUse(r));

function score(solver, subset) {
  let ok = 0;
  subset.forEach((r) => { if (C.isCorrect(r, solver(r))) ok += 1; });
  return { ok: ok, n: subset.length, rate: subset.length ? ok / subset.length : 0 };
}

/* ---------- 1. READ-THE-FEATURE ORACLE → 100% ---------- */
const oracle = (r) => C.audit(r).correctTargetId;
const oRes = score(oracle, ROUNDS);
note(oRes.rate === 1, `oracle scored ${pct(oRes.ok, oRes.n)}% (need 100%) — deck/core inconsistent`);
/* consistency: every round resolvable + correct id present in the items */
note(ROUNDS.every((r) => C.expectedAnswer(r) != null && C.itemIds(r).indexOf(C.expectedAnswer(r)) >= 0),
  'a round has no resolvable correct target (functionPhrase not in any item.functions)');

/* ---------- 2. VISUAL-SEARCH → 0% ---------- */
/* pick the highest-salience target; all are equal-salience → falls to index-0 */
const visual = (r) => C.itemIds(r)[0];
const vRes = score(visual, ROUNDS);
note(vRes.rate === 0, `VISUAL-SEARCH (salience→index-0) scored ${pct(vRes.ok, vRes.n)}% (need 0% — equal salience + correct never index-0)`);
note(ROUNDS.every((r) => C.facts(r).functionNotVisuallyObvious), 'functionNotVisuallyObvious violated (a target telegraphs its function)');

/* ---------- 3. WORD-MATCH → 0% ---------- */
/* pick the target whose LABEL shares a content token with the question phrase */
const wordMatch = (r) => {
  const toks = C.contentTokens(r.question.functionPhrase);
  const hit = C.items(r).find((i) => toks.some((t) => String(i.label).toLowerCase().indexOf(t) >= 0));
  return hit ? hit.id : C.itemIds(r)[0];
};
const wRes = score(wordMatch, ROUNDS);
note(wRes.rate === 0, `WORD-MATCH scored ${pct(wRes.ok, wRes.n)}% (need 0% — the function word is absent from every correct label)`);
note(ROUNDS.every((r) => C.facts(r).questionWordNotInLabel), 'questionWordNotInLabel violated (the function token appears in a correct label)');

/* ---------- 4. FIRST/RANDOM → 0% (index-0) ---------- */
const first = (r) => C.itemIds(r)[0];
const fRes = score(first, ROUNDS);
note(fRes.rate === 0, `FIRST (index-0) scored ${pct(fRes.ok, fRes.n)}% (need 0% — correct never at index 0)`);
note(ROUNDS.every((r) => C.facts(r).multiplePlausibleTargets && C.facts(r).correctNotIndex0), 'multiplePlausibleTargets / correctNotIndex0 violated');

/* ---------- 5. BLIND-TO-FEATURE → cannot resolve ---------- */
/* blank items[].functions → expectedAnswer null → the legit solver cannot answer */
let blindResolvable = 0;
ROUNDS.forEach((r) => {
  const probe = JSON.parse(JSON.stringify(r));
  probe.items.forEach((i) => { i.functions = []; });
  if (C.expectedAnswer(probe) != null) blindResolvable += 1;
});
note(blindResolvable === 0, `BLIND-TO-FEATURE: ${blindResolvable} round(s) still resolvable with the feature text blanked (ANSWER_REQUIRES_TEXT broken)`);

/* ---------- 6. WORLD-KNOWLEDGE (the deepest) → ≤ chance on USE rounds ---------- */
/* a real-world prior table mapping a FUNCTION → the real-world part/feature it
   lives in. The solver picks the target whose label matches its prior; fictional
   referents (frell/snood/…) + feature-internal nav bridges have NO entry. */
const PRIOR = {
  fly: 'wings', swim: 'fins', dig: 'claws', glow: 'light', climb: 'legs', jump: 'legs',
  sting: 'stinger', float: 'bladder', spark: 'flint', hide: 'shell', see: 'eyes',
  breathe: 'gills', eat: 'mouth', turn: 'page', search: 'magnifier', listen: 'ears',
  meaning: 'glossary', topic: 'contents', section: 'contents', page: 'index'
};
const worldKnowledge = (r) => {
  const want = PRIOR[r.question.functionPhrase];
  if (!want) return C.itemIds(r)[0];
  const hit = C.items(r).find((i) => String(i.label).toLowerCase().indexOf(want) >= 0);
  return hit ? hit.id : C.itemIds(r)[0];   /* no prior match → guess index-0 */
};
const wkUse = score(worldKnowledge, useRounds);
const chance = 1 / 3;   /* ~3 plausible targets */
note(wkUse.rate <= chance + 0.001, `WORLD-KNOWLEDGE scored ${pct(wkUse.ok, wkUse.n)}% on the USE rounds (need ≤ ${Math.round(chance * 100)}% — fictional/feature-internal, no prior match)`);
note(useRounds.every((r) => C.facts(r).notPreKnowable), 'notPreKnowable violated on a USE round');

/* ---------- 7. STRUCTURAL ---------- */
const df = C.deckFacts(ROUNDS);
note(df.distinctCogs.length >= 7, `only ${df.distinctCogs.length} distinct cognitions (need ≥7): ${df.distinctCogs.join(', ')}`);
note(df.whichFeatureShare <= 1 / 3, `which-feature over the ⅓ cap (${Math.round(df.whichFeatureShare * 100)}%)`);
note(df.useRoundCount >= 7, `only ${df.useRoundCount} non-pre-knowable USE rounds (need ≥7)`);
note(ROUNDS.every((r) => C.facts(r).answerNotStored && C.facts(r).winRoutesThroughFeature && C.facts(r).childReadsFeature_noFeatureTTS && C.facts(r).labelsAreLiveDomText),
  'a structural flag (answerNotStored / winRoutesThroughFeature / childReadsFeature_noFeatureTTS / labelsAreLiveDomText) is false');
/* answer-not-stored, demonstrated: moving the function to another item changes expectedAnswer */
note(ROUNDS.every((r) => {
  const before = C.expectedAnswer(r);
  const probe = JSON.parse(JSON.stringify(r));
  const fp = probe.question.functionPhrase;
  /* strip fp from its item, give it to a different item → expectedAnswer must change */
  probe.items.forEach((i) => { i.functions = (i.functions || []).filter((f) => f !== fp); });
  const other = probe.items.find((i) => i.id !== before);
  other.functions.push(fp);
  return C.expectedAnswer(probe) === other.id && other.id !== before;
}), 'ANSWER_NOT_STORED: expectedAnswer did not track the function moving to a different item');
/* snapshot must not leak the answer */
note(ROUNDS.every((r) => !/correctTargetId|"functions"|expectedAnswer/.test(JSON.stringify(C.snapshot(r)))), 'snapshot leaked the functions key / correct id');

/* ---------- report ---------- */
console.log('Field-Guide core gate —');
console.log(`  read-the-feature oracle: ${pct(oRes.ok, oRes.n)}%  (${oRes.ok}/${oRes.n})`);
console.log(`  visual-search          : ${pct(vRes.ok, vRes.n)}%`);
console.log(`  word-match             : ${pct(wRes.ok, wRes.n)}%`);
console.log(`  first/random (index-0) : ${pct(fRes.ok, fRes.n)}%`);
console.log(`  blind-to-feature       : ${blindResolvable === 0 ? 'cannot resolve (text blanked)' : 'LEAK'}`);
console.log(`  world-knowledge (USE)  : ${pct(wkUse.ok, wkUse.n)}%  on ${useRounds.length} USE rounds (chance ~${Math.round(chance * 100)}%)`);
console.log(`  distinct cognitions    : ${df.distinctCogs.length} (${df.distinctCogs.join(', ')})`);
console.log(`  USE rounds: ${df.useRoundCount}   which-feature share: ${Math.round(df.whichFeatureShare * 100)}%`);
console.log('');
if (fails.length) {
  console.error(`FIELD-GUIDE CORE GATE FAILED — ${fails.length}:`);
  fails.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log('FIELD-GUIDE CORE GATE PASSED — the read-the-feature oracle wins 100%; visual-search/word-match/first-random all 0%; blanking the feature text breaks solvability (picture-proof); the STATEFUL world-knowledge solver (a real prior table) scores ≤chance on the USE rounds (fictional referents + feature-internal bridges have no prior); the answer is recomputed from the feature (not stored); ≥7 distinct cognitions, ≥7 non-pre-knowable USE rounds, which-feature capped.');
process.exit(0);
