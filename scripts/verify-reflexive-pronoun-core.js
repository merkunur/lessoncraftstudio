#!/usr/bin/env node
/* =====================================================================
   verify-reflexive-pronoun-core.js — the MEASURED build-gate for "Robin's
   Mirror" (L.2.1.c, reflexive pronouns). Drives the REAL reflexive-pronoun-
   core.js over the REAL manifest. The child taps the reflexive that matches
   the subject; foils are reflexives of other referents.

     • ORACLE (REFLEXIVE_TABLE[referent]) → 100%;
     • FIXED-GUESS bot (always tap the same reflexive word) → <= chance: no
       single reflexive is the answer in too many rounds;
     • LONGEST / SHORTEST chip bots → <= chance (length is no cue).
   Plus STRUCTURAL: answer DERIVED-not-stored; 3 distinct chips; the correct
   reflexive is NOT already a token in the sentence (no-answer-leak); the blank
   "___" is present; referent + both wrongs are valid + the trio distinct;
   >=7 rounds; >=4 distinct referents.
   (Chip POSITION is a render concern — the activity shuffles the 3 chips; the
   local-test verifies the rendered order is not fixed.)
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'reflexive-pronoun-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'robin-mirror-activities.json');
const CHANCE = 0.45;

function loadCore() { const src = fs.readFileSync(CORE, 'utf8'); const win = {}; new Function('window', src)(win); if (!win.ReflexivePronounCore) throw new Error('core did not attach window.ReflexivePronounCore'); return win.ReflexivePronounCore; }

const fails = [];
const F = (cond, msg) => { if (!cond) fails.push(msg); };
const pct = (x) => (100 * x).toFixed(1) + '%';

(function main() {
  const Core = loadCore();
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  const rounds = manifest[0].params.rounds || [];
  const N = rounds.length || 1;

  F(rounds.length >= 7, `bank has ${rounds.length} rounds (need >=7)`);

  rounds.forEach((r) => {
    const f = Core.facts(r);
    F(f.referentValid, `${r.id}: referent "${r.referent}" not in REFLEXIVE_TABLE`);
    F(f.wrongsValid, `${r.id}: a wrong referent is invalid`);
    F(f.threeDistinctChips, `${r.id}: chips not 3 distinct reflexives (${Core.chips(r).join(',')})`);
    F(f.sentenceHasBlank, `${r.id}: sentence has no "___" blank`);
    F(f.sentenceNoAnswerLeak, `${r.id}: the correct reflexive "${Core.oracle(r)}" already appears in the sentence`);
    F(f.derivedNotStored, `${r.id}: has a stored answer`);
    const view = Core.childView(r);
    F(JSON.stringify(view).indexOf('referent') < 0 && JSON.stringify(view).indexOf('wrong') < 0, `${r.id}: childView leaks referent/wrong`);
  });

  let oracle = 0, longest = 0, shortest = 0;
  const ansCount = {};
  rounds.forEach((r) => {
    if (Core.isAnswer(r, Core.oracle(r))) oracle++;
    const c = Core.chips(r);
    const lo = c.slice().sort((a, b) => a.length - b.length);
    if (Core.isAnswer(r, lo[lo.length - 1])) longest++;   // longest chip
    if (Core.isAnswer(r, lo[0])) shortest++;              // shortest chip
    const a = Core.oracle(r); ansCount[a] = (ansCount[a] || 0) + 1;
  });
  const maxFixed = Math.max.apply(null, Object.keys(ansCount).map((k) => ansCount[k]));

  F(oracle === N, `oracle ${oracle}/${N} (must be 100%)`);
  F(longest / N <= CHANCE, `longest-chip bot ${pct(longest / N)} > ${pct(CHANCE)} (the answer is systematically the longest word)`);
  F(shortest / N <= CHANCE, `shortest-chip bot ${pct(shortest / N)} > ${pct(CHANCE)}`);
  F(maxFixed / N <= CHANCE, `fixed-guess bot ${pct(maxFixed / N)} > ${pct(CHANCE)} (one reflexive is the answer too often — vary referents)`);

  const refs = Core.deckFacts(rounds).distinctReferents;
  F(refs.length >= 4, `only ${refs.length} distinct referents (need >=4)`);

  console.log(`bank: ${N} rounds | referents: ${refs.join('/')} | answer counts: ${JSON.stringify(ansCount)}`);
  console.log(`  ${oracle === N ? 'ok  ' : 'FAIL'} oracle: ${oracle}/${N}`);
  console.log(`  longest ${pct(longest / N)} | shortest ${pct(shortest / N)} | fixed-guess ${pct(maxFixed / N)}  (ceiling ${pct(CHANCE)})`);
  console.log('');
  if (fails.length) { console.error(`VERIFY-REFLEXIVE-PRONOUN FAILED — ${fails.length} issue(s):`); fails.forEach((m) => console.error('  • ' + m)); process.exit(1); }
  console.log('VERIFY-REFLEXIVE-PRONOUN PASSED — oracle 100%; longest/shortest/fixed-guess bots all <= chance; answer DERIVED from REFLEXIVE_TABLE; 3 distinct chips; no-answer-leak; >=7 rounds; >=4 distinct referents.');
  process.exit(0);
})();
