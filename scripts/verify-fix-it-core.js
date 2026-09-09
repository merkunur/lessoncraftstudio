#!/usr/bin/env node
/* =====================================================================
   verify-fix-it-core.js — build-time gate for the sentence-editing
   cognition behind the fix-it clinic (Dr. Plume / Doktor Fjäder).

   ⚠⚠ WHAT CHANGED, AND WHY IT MATTERED (sv #25).
   This gate used to read `Core.buildRounds()` — a fixture hard-coded
   INSIDE fix-it-core.js — and never opened the manifest at all. The
   English pilot was therefore the only thing it had ever checked, while
   SEVEN localized pools shipped: 42 rounds that had never been through a
   single assertion below. That is how the two defects named in the
   EXEMPTIONS block reached production.

   It now walks EVERY pool in mini tools/sentence-clinic-activities.json
   (params.rounds = en, plus params.roundsL10n.*) through the same pure
   core functions. Unlike the pronoun gate, no scope split is needed:
   the forbidden keys here are `answer`/`correctIndex`, which NO pool
   carries — every locale stores `replacement` exactly as English does.

   Proven, MEASURED, for every round of every locale:

     • exactly ONE correct diagnosis target (the trouble is a unique,
       locatable violation — not "anything goes");
     • the ORACLE (correct diagnosis + correct repair) → applyRepair
       yields the authored CLEAN sentence;
     • BLIND solvers do not track the answer: "always diagnose the first
       token" < 1.0; a repair has ≥2 options so "pick one" isn't free;
     • chip actions carry ≥2 DISTINCT wrong options, and ⭐ NONE of them
       is a word already sitting in the sentence (see EXEMPTIONS);
     • ⭐ a reorder's correctOrder is neither the IDENTITY nor a PURE
       REVERSAL — because the reorder tray renders in DESCRIPTOR order
       (sentence-clinic-activity.js `this.round.tokens.forEach`, no
       shuffle), so [3,2,1,0] means the answer is literally "tap the tray
       right to left", solvable without reading a word (see EXEMPTIONS);
     • ≥7 DISTINCT actions per pool (§A.13.60 — distinctness IS the action);
     • no round stores a UI answer/correctIndex (DERIVED from the descriptor).

   ⚠ NOT asserted here, deliberately: "a chip-action convention must not
   name its own replacement". That is a defect only while _giggle
   ANNOUNCES the convention pre-solve; with that removed the caption is a
   post-solve reward and naming the answer is exactly right. As a data
   rule it would condemn the correct Swedish `Vi säger ”å” — men vi
   skriver ”och”.` The channel is what was broken, so the assertion lives
   in local-test-sentence-clinic.js, driving a real miss.

   "Repair is gated behind a correct diagnosis" is an ENGINE-state
   property → also asserted in local-test-sentence-clinic.js.

   "Measured, not eyeballed." Exit 0 = all pass; exit 1 = any failure.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');

/* ---------------------------------------------------------------------
   EXEMPTIONS — a RATCHET, never approval. Each entry is a LIVE shipped
   defect whose repair is AUTHORING (it needs a native panel for that
   locale), so the gate names it rather than staying silent about it.
   ⚠ This set may only SHRINK. Never add an entry to make a build pass.
   A declared entry that stops firing means the round was repaired —
   delete it (RATCHET DRIFT below fails the build if you don't).
   ------------------------------------------------------------------ */
const EXEMPTIONS = new Map([
  ['nl/swap-agree/distractor-already-in-sentence',
   'nl offers "rennen" as a repair for "rennen" — the exact word the child was just told is wrong. Needs a native nl panel to choose a plausible distractor.'],
  ['en/order-svo/reorder-trivially-ordered',
   'correctOrder [3,2,1,0] against an unshuffled tray — solvable right-to-left without reading. Repair = re-authoring the token array so the sentence still reads naturally.'],
  ['de/order-svo/reorder-trivially-ordered', 'as en — needs a native de panel.'],
  ['fr/order-svo/reorder-trivially-ordered', 'as en — needs a native fr panel.'],
  ['nl/order-svo/reorder-trivially-ordered', 'as en — needs a native nl panel.'],
]);

/* ---- load the REAL core under a window shim ---- */
const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'fix-it-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.FixItCore;
if (!Core) { console.error('FAIL: fix-it-core.js did not define window.FixItCore'); process.exit(1); }

/* ---- load EVERY pool from the manifest (this is the part that was missing) ---- */
const MANIFEST = path.join(REPO, 'mini tools', 'sentence-clinic-activities.json');
const rows = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
const row = (rows.rows || rows)[0];
if (!row || !row.params || !Array.isArray(row.params.rounds)) {
  console.error('FAIL: could not read params.rounds from ' + MANIFEST); process.exit(1);
}
const pools = Object.assign({ en: row.params.rounds }, row.params.roundsL10n || {});

/* ⚠ non-vacuity: a gate that walks an empty set reports success. Assert we found
   the pools we expect BEFORE asserting anything about their contents. */
const locales = Object.keys(pools);
if (locales.length < 2) { console.error('FAIL: only ' + locales.length + ' pool(s) — the manifest read is broken, not the data'); process.exit(1); }

const eqArr = (a, b) => Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((x, i) => x === b[i]);

/* ---- the checks, as pure functions so the poison suite can drive them ---- */
function diagnosisTargets(r) {
  const span = r.tokens.length + 1;            // gap/seam can sit at the end
  let correct = 0, firstIsCorrect = false;
  for (let i = 0; i < span; i++) if (Core.diagnoseCorrect(r, i)) { correct++; if (i === 0) firstIsCorrect = true; }
  return { correct, firstIsCorrect };
}
/* ⭐ a wrong option must not be a word ALREADY IN the sentence */
function distractorsInSentence(r) {
  return (r.distractors || []).filter((d) => r.tokens.indexOf(d) >= 0);
}
/* ⭐ the reorder tray is UNSHUFFLED, so these two orders need no reading */
function reorderIsTrivial(r) {
  const n = r.correctOrder.length;
  const identity = r.correctOrder.every((v, i) => v === i);
  const reversal = r.correctOrder.every((v, i) => v === n - 1 - i);
  return identity ? 'identity' : (reversal ? 'pure reversal' : null);
}

const failures = [];
const firedExemptions = new Set();
function check(cond, key, msg) {
  if (cond) return;
  if (key && EXEMPTIONS.has(key)) { firedExemptions.add(key); return; }
  failures.push(msg);
}

let totalRounds = 0, oracleHits = 0, blindFirstHits = 0, diagnoseRounds = 0;

for (const loc of locales) {
  const rounds = pools[loc];
  const L = (r, i) => `[${loc}] round#${i}[${r.id}/${r.action}]`;

  check(rounds.length >= VARIETY_MIN, null, `[${loc}]: only ${rounds.length} rounds (< ${VARIETY_MIN} §A.13.60)`);
  const actions = new Set(rounds.map((r) => r.action));
  check(actions.size >= VARIETY_MIN, null, `[${loc}]: only ${actions.size} DISTINCT actions (distinctness is the action)`);
  check(new Set(rounds.map((r) => r.id)).size === rounds.length, null, `[${loc}]: round ids not distinct`);

  let poolBlindFirst = 0, poolDiagnose = 0;

  rounds.forEach((r, i) => {
    totalRounds++;
    check(!('answer' in r) && !('correctIndex' in r), null, `${L(r, i)}: stores a UI answer/correctIndex (must be DERIVED)`);
    check(Array.isArray(r.clean) && r.clean.length > 0, null, `${L(r, i)}: missing the clean (repaired) form`);

    const got = Core.applyRepair(r);
    if (eqArr(got, r.clean)) oracleHits++;
    else failures.push(`${L(r, i)}: applyRepair → [${got.join(' ')}] ≠ clean [${(r.clean || []).join(' ')}]`);

    if (r.action !== 'reorder') {
      poolDiagnose++; diagnoseRounds++;
      const d = diagnosisTargets(r);
      check(d.correct === 1, null, `${L(r, i)}: ${d.correct} correct diagnosis targets (must be exactly 1)`);
      if (d.firstIsCorrect) { poolBlindFirst++; blindFirstHits++; }
      check(!!Core.diagnoseKind(r), null, `${L(r, i)}: no diagnoseKind`);
    }

    if (r.action === 'swap' || r.action === 'insert-punct' || r.action === 'insert-word') {
      const opts = Core.repairOptions(r);
      check(Array.isArray(opts) && opts.length >= 2, null, `${L(r, i)}: < 2 repair options (a single option is a free win)`);
      check(opts.indexOf(r.replacement) >= 0, null, `${L(r, i)}: replacement not among the options`);
      check(new Set(opts).size === opts.length, null, `${L(r, i)}: duplicate repair options`);
      check(Core.repairCorrect(r, r.replacement) === true, null, `${L(r, i)}: the replacement is not accepted as correct`);
      (r.distractors || []).forEach((d) => check(d !== r.replacement, null, `${L(r, i)}: a distractor equals the replacement`));
      /* ⚠ the message is a COUNT, not a morphology claim — "same-lemma" was English/German talking,
         and Swedish's å/o/åh are same-SOUND spellings with no shared lemma at all. */
      if (r.action === 'swap') check((r.distractors || []).length >= 2, null, `${L(r, i)}: swap needs ≥2 wrong options`);
      const inSentence = distractorsInSentence(r);
      check(inSentence.length === 0, `${loc}/${r.id}/distractor-already-in-sentence`,
        `${L(r, i)}: distractor ${JSON.stringify(inSentence[0])} is ALREADY a token in the sentence — the child is offered back the word they were just told is wrong`);
    } else {
      check(Core.repairOptions(r) === null, null, `${L(r, i)}: non-chip action should expose no repair options`);
    }

    if (r.action === 'reorder') {
      check(Core.repairCorrect(r, r.correctOrder.slice()) === true, null, `${L(r, i)}: correct order rejected`);
      const wrong = r.correctOrder.slice().reverse();
      check(eqArr(wrong, r.correctOrder) || Core.repairCorrect(r, wrong) === false, null, `${L(r, i)}: a reversed order was accepted`);
      const trivial = reorderIsTrivial(r);
      check(!trivial, `${loc}/${r.id}/reorder-trivially-ordered`,
        `${L(r, i)}: correctOrder is the ${trivial} of an UNSHUFFLED tray — solvable without reading a single word`);
    }
  });

  check(!poolDiagnose || poolBlindFirst / poolDiagnose < 1, null,
    `[${loc}]: "always diagnose the first token" scored 1.00 — the trouble is positionally trivial`);
}

const oracleAcc = totalRounds ? oracleHits / totalRounds : 0;
const blindFirstAcc = diagnoseRounds ? blindFirstHits / diagnoseRounds : 0;
check(oracleAcc === 1, null, `the ORACLE solved ${oracleHits}/${totalRounds} (must be all)`);
check(blindFirstAcc < 1, null, `"always diagnose the first token" scored ${blindFirstAcc.toFixed(2)} across the catalogue`);

/* ---------------------------------------------------------------------
   POISON — prove each NEW assertion fails on a synthetic violation AND
   passes on a synthetic correct case. A check tested in one direction
   only is how a ban-too-wide ships. (§23.6, and the sv #22 rule: each
   poison must be caught by the assertion it NAMES.)
   ------------------------------------------------------------------ */
const poison = [];
function pcheck(name, actual, expected) {
  if (actual !== expected) poison.push(`${name}: expected ${expected}, got ${actual}`);
}
// (a) distractor-already-in-sentence
pcheck('MUST FIRE  distractor is a token',
  distractorsInSentence({ tokens: ['Het', 'kind', 'rennen', '.'], distractors: ['rennen', 'ren'] }).length > 0, true);
pcheck('MUST PASS  distractors are all fresh',
  distractorsInSentence({ tokens: ['Jag', 'å', 'min', 'bror', '.'], distractors: ['o', 'åh'] }).length > 0, false);
pcheck('MUST PASS  no distractors at all (delete/split)',
  distractorsInSentence({ tokens: ['Jag', 'kan', 'att', '.'] }).length > 0, false);
// (c) reorder-trivially-ordered
pcheck('MUST FIRE  pure reversal', reorderIsTrivial({ correctOrder: [3, 2, 1, 0] }), 'pure reversal');
pcheck('MUST FIRE  identity', reorderIsTrivial({ correctOrder: [0, 1, 2, 3] }), 'identity');
pcheck('MUST PASS  a genuine order', reorderIsTrivial({ correctOrder: [2, 0, 3, 1] }), null);
pcheck('MUST PASS  the es/pt/it order', reorderIsTrivial({ correctOrder: [3, 1, 0, 2] }), null);
// controls: the pre-existing assertions still bite
pcheck('CONTROL    oracle catches a wrong clean',
  eqArr(Core.applyRepair({ action: 'delete', tokens: ['a', 'b', 'c'], targetIndex: 1 }), ['a', 'b', 'c']), false);
pcheck('CONTROL    two diagnosis targets is not one',
  diagnosisTargets({ action: 'capitalize', tokens: ['a', 'b'], targetIndex: 0 }).correct === 1, true);

if (poison.length) {
  console.error('FAIL — the gate itself is broken: ' + poison.length + ' poison case(s) behaved wrongly:');
  poison.forEach((p) => console.error('  • ' + p));
  process.exit(1);
}

/* ---- RATCHET DRIFT: a declared exemption that no longer fires is a repaired round ---- */
const stale = [...EXEMPTIONS.keys()].filter((k) => !firedExemptions.has(k));
if (stale.length) {
  console.error('RATCHET DRIFT — ' + stale.length + ' declared exemption(s) did not fire, so the round was repaired. Delete them:');
  stale.forEach((k) => console.error('  • ' + k));
  process.exit(1);
}

if (failures.length) {
  console.error(`FAIL — ${failures.length} fix-it violation(s) across ${totalRounds} round(s) in ${locales.length} pool(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}

console.log(`PASS — ${totalRounds} rounds across ${locales.length} pools (${locales.join(', ')}): ` +
  `ORACLE ${oracleAcc.toFixed(2)}; blind-first-token ${blindFirstAcc.toFixed(2)} < 1.00; exactly one diagnosis ` +
  `target per round, ≥2 distinct options on chip actions, no distractor already in its own sentence, ` +
  `no trivially-ordered reorder, no stored answer.`);
console.log(`Poison: ${9} cases, all correct. Exemptions still firing: ${firedExemptions.size} (ratchet — may only shrink):`);
[...firedExemptions].sort().forEach((k) => console.log('  • ' + k + ' — ' + EXEMPTIONS.get(k)));
process.exit(0);
