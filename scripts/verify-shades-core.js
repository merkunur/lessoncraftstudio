#!/usr/bin/env node
/* =====================================================================
   verify-shades-core.js — build-time shades-of-meaning correctness gate
   ---------------------------------------------------------------------
   Loads the REAL mini tools/shades-core.js (window shim), resolves the
   shipped manifest's rounds against its sets, and proves every recall/cheat
   solver FAILS while the rank/degree-cue oracle is 100% (CCSS L.1.5.d):

     1. ORACLE 100% — pick (rank===requiredRank), order (rank permutation),
        bound (strictly between), manner (the context-matched word).
     2. PLAIN_SYNONYM (pick any same-set word) FAILS — ALL_CHOICES_SAME_SET
        (≥3) + EXACTLY_ONE_DEFENSIBLE (only one shade is right).
     3. FAMILIAR_RANK (memorized rote-rank table) FAILS the order mode —
        NON_CANONICAL_ORDER (order rounds use only rote:false sets) +
        SHOWN_ORDER_NOT_SOLUTION (authored order ≠ rank-sorted order).
     4. CONTEXT_KEYWORD ({keyword→rank} lookup) FAILS — CONTEXT_KEYWORD_-
        AMBIGUOUS (every pick keyword maps to ≥2 distinct ranks).
     5. ANTONYM (most-opposite) FAILS — NOT_ANTONYM_DECIDABLE (the farthest-
        rank word ≠ the answer; same-polarity near-synonyms).
     6. FIRST/RANDOM FAILS — CORRECT_NOT_INDEX_0 (authored choices) + ≥3.
     + STRUCTURAL: ANSWER_FROM_RANK_NOT_STORED (mutate a rank → oracle moves;
       no answer/correct/correctIndex field — deep scan; manner's authored
       answerId is the legitimate semantic pairing, exempt), MIN_PERCEPTIBLE_-
       RANK_GAP (distinct ranks), MANNER_NOT_ORDERED, CONNOTATION_EXCLUDED
       (dimension allowlist), ≥7 distinct rounds + 4 cogs.

   "Measured, not eyeballed." Exit 0 = all pass; exit 1 = any failure.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');
const FORBIDDEN_KEYS = ['answer', 'correct', 'correctIndex', 'answerIndex'];   /* NOT rank/requiredRank/answerId(manner)/loId/hiId — those are structure/cue */

const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'shades-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.ShadesCore;
if (!Core) { console.error('FAIL: shades-core.js did not define window.ShadesCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'shades-activities.json'), 'utf8'));
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };

function scanForbidden(obj, label) {
  if (obj == null || typeof obj !== 'object') return;
  Object.keys(obj).forEach((k) => {
    if (FORBIDDEN_KEYS.indexOf(k) >= 0) failures.push(`${label}: forbidden stored-answer key "${k}"`);
    scanForbidden(obj[k], label);
  });
}

let roundCount = 0;
const cogs = {};

for (const row of manifest) {
  const sets = row.params.sets, rawRounds = row.params.rounds || [];
  check(rawRounds.length >= VARIETY_MIN, `${row.id}: ${rawRounds.length} rounds < ${VARIETY_MIN} (§A.13.60)`);
  const resolved = rawRounds.map((r) => Core.resolve(r, sets));

  resolved.forEach((round, ri) => {
    roundCount++; cogs[round.cog] = 1;
    const label = `${round.id}[${round.cog}]`;
    scanForbidden(rawRounds[ri], label);
    check(!!round.set, `${label}: setId did not resolve`);
    const f = Core.facts(round);

    check(f.connotationExcluded, `${label}: CONNOTATION_EXCLUDED — dimension "${f.dimension}" not in the allowlist`);
    check(f.minPerceptibleRankGap, `${label}: MIN_PERCEPTIBLE_RANK_GAP — duplicate ranks in the set (ties)`);
    check(f.allChoicesSameSet, `${label}: <3 same-set choices (membership would discriminate)`);
    check(f.correctNotIndex0, `${label}: CORRECT_NOT_INDEX_0 — the answer is at authored index 0`);

    // 1. oracle 100%
    check(Core.isAnswer(round, Core.oracle(round)), `${label}: oracle is not a correct answer`);

    if (round.cog === 'pick') {
      check(f.exactlyOneDefensible, `${label}: not exactly one word matches requiredRank (ties/none)`);
      // 5. ANTONYM solver: the word whose rank is FARTHEST from requiredRank ≠ oracle
      const ws = Core.words(round), oi = Core.oraclePick(round);
      let far = 0, fd = -1; ws.forEach((w, i) => { const d = Math.abs(w.rank - round.requiredRank); if (d > fd) { fd = d; far = i; } });
      check(far !== oi, `${label}: NOT_ANTONYM_DECIDABLE — the most-opposite word IS the answer`);
    } else if (round.cog === 'order') {
      check(f.nonCanonicalOrder, `${label}: NON_CANONICAL_ORDER — order round uses a ROTE set (FAMILIAR_RANK would solve it)`);
      check(f.orderable, `${label}: order round on a non-orderable set`);
      // SHOWN_ORDER_NOT_SOLUTION: the authored words order ≠ the rank-sorted answer
      const shown = Core.words(round).map((w) => w.id), sorted = Core.orderOracle(round);
      check(shown.join(',') !== sorted.join(','), `${label}: SHOWN_ORDER_NOT_SOLUTION — authored order already equals the solution`);
    } else if (round.cog === 'bound') {
      check(f.exactlyOneDefensible, `${label}: not exactly one word strictly between the bounds (ambiguous/none)`);
    } else if (round.cog === 'manner') {
      check(f.mannerNotOrdered, `${label}: MANNER_NOT_ORDERED — the manner set is marked orderable`);
      check(Core.mannerOracle(round) >= 0, `${label}: manner answerId not found`);
    }
  });

  // 4. CONTEXT_KEYWORD_AMBIGUOUS (deck-level): every pick keyword → ≥2 ranks
  const df = Core.deckFacts(resolved);
  check(df.contextKeywordAllAmbiguous, `CONTEXT_KEYWORD_AMBIGUOUS — a keyword maps to a UNIQUE rank: ${JSON.stringify(df.keywordRankCounts)}`);
  // 3. FAMILIAR_RANK / NON_CANONICAL_ORDER (deck-level): no order round on a rote set
  check(!df.orderRoteViolation, `NON_CANONICAL_ORDER — an order round uses a rote set`);

  // STRUCTURAL: ANSWER_FROM_RANK_NOT_STORED — mutate a rank, the order oracle moves
  const orderRound = resolved.find((r) => r.cog === 'order');
  if (orderRound) {
    const before = Core.orderOracle(orderRound).join(',');
    const clone = Core.resolve(rawRounds.find((r) => r.id === orderRound.id), JSON.parse(JSON.stringify(sets)));
    clone.set.words[0].rank = 999;
    const after = Core.orderOracle(clone).join(',');
    check(before !== after, `${orderRound.id}: ANSWER_FROM_RANK_NOT_STORED — orderOracle did not move when a rank changed`);
  }
}

const distinctCogs = Object.keys(cogs);
check(distinctCogs.length >= 4, `only ${distinctCogs.length} distinct cogs (expected 4: pick/order/bound/manner)`);

if (failures.length) {
  console.error(`FAIL — ${failures.length} shades-correctness violation(s) across ${roundCount} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${roundCount} round(s), ${distinctCogs.length} cogs [${distinctCogs.join('/')}]: oracle 100%; PLAIN_SYNONYM fails (same-set, one defensible); FAMILIAR_RANK fails (non-canonical order, shown≠solution); CONTEXT_KEYWORD fails (every keyword ≥2 ranks); ANTONYM fails (no opposite); first/random fails; answer derived-from-rank-not-stored; no ties; ≥${VARIETY_MIN} rounds.`);
process.exit(0);
