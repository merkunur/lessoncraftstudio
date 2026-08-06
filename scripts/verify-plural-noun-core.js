#!/usr/bin/env node
/* =====================================================================
   verify-plural-noun-core.js — the MEASURED build-gate for "Daisy's Plate
   Stack" (L.K.1.c, regular plural nouns). Drives the REAL plural-noun-core.js
   over the REAL manifest. The child taps the correctly-spelled plural.

     • ORACLE (pluralize(noun)) → 100%;
     • the RULE is CORRECT: pluralize(noun) === a HARDCODED ground-truth plural
       for every noun (incl. all /es/ cases) — proves the /s/-vs-/es/ rule;
     • FIXED-GUESS bot (most-common answer literal) → <= chance;
     • LONGEST / SHORTEST chip bots → <= chance.
   Plus STRUCTURAL: answer DERIVED-not-stored; 3 distinct chips per round
   ([plural, singular, wrongPlural]); "___" present; the plural is NOT already
   a token in the sentence (no-answer-leak); >= 2 /es/-class nouns; >=7 rounds.

   Ground-truth lives HERE (not in the round) so the round stays answer-free.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'plural-noun-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'daisy-plate-stack-activities.json');
const CHANCE = 0.45;

/* hand-authored correct plurals — the gate's independent ground truth */
const EXPECTED = {
  cup: 'cups', egg: 'eggs', dish: 'dishes', fork: 'forks', plate: 'plates',
  box: 'boxes', spoon: 'spoons', apple: 'apples', peach: 'peaches'
};

function loadCore() { const src = fs.readFileSync(CORE, 'utf8'); const win = {}; new Function('window', src)(win); if (!win.PluralNounCore) throw new Error('core did not attach window.PluralNounCore'); return win.PluralNounCore; }

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
    F(f.hasNoun, `${r.id}: no noun`);
    F(f.sentenceHasBlank, `${r.id}: no "___" blank`);
    F(f.sentenceNoAnswerLeak, `${r.id}: the plural "${Core.oracle(r)}" already appears in the sentence`);
    F(f.derivedNotStored, `${r.id}: has a stored answer`);
    F(f.threeDistinctChips, `${r.id}: chips not 3 distinct (${Core.chips(r).join('/')})`);
    /* the RULE must produce the hand-authored ground-truth plural */
    F(EXPECTED[r.noun] !== undefined, `${r.id}: noun "${r.noun}" missing from EXPECTED ground truth`);
    F(Core.oracle(r) === EXPECTED[r.noun], `${r.id}: pluralize("${r.noun}")="${Core.oracle(r)}" but expected "${EXPECTED[r.noun]}"`);
    const view = Core.childView(r);
    F(JSON.stringify(view).indexOf('noun') < 0, `${r.id}: childView leaks noun`);
  });

  let oracle = 0, longest = 0, shortest = 0;
  const ansCount = {};
  rounds.forEach((r) => {
    if (Core.isAnswer(r, Core.oracle(r))) oracle++;
    const c = Core.chips(r).slice().sort((a, b) => a.length - b.length);
    if (Core.isAnswer(r, c[c.length - 1])) longest++;
    if (Core.isAnswer(r, c[0])) shortest++;
    const a = Core.oracle(r); ansCount[a] = (ansCount[a] || 0) + 1;
  });
  const maxFixed = Math.max.apply(null, Object.keys(ansCount).map((k) => ansCount[k]));

  F(oracle === N, `oracle ${oracle}/${N} (must be 100%)`);
  F(longest / N <= CHANCE, `longest-chip bot ${pct(longest / N)} > ${pct(CHANCE)} (the +es plural is the answer too often)`);
  F(shortest / N <= CHANCE, `shortest-chip bot ${pct(shortest / N)} > ${pct(CHANCE)}`);
  F(maxFixed / N <= CHANCE, `fixed-guess bot ${pct(maxFixed / N)} > ${pct(CHANCE)}`);

  const df = Core.deckFacts(rounds);
  F(df.esCount >= 2, `only ${df.esCount} /es/-class noun(s) (need >=2)`);

  console.log(`bank: ${N} rounds | distinct nouns: ${df.distinctNouns} | /es/-class: ${df.esCount} | answer counts: max ${maxFixed}`);
  console.log(`  ${oracle === N ? 'ok  ' : 'FAIL'} oracle: ${oracle}/${N}`);
  console.log(`  longest ${pct(longest / N)} | shortest ${pct(shortest / N)} | fixed-guess ${pct(maxFixed / N)}  (ceiling ${pct(CHANCE)})`);
  console.log('');
  if (fails.length) { console.error(`VERIFY-PLURAL-NOUN FAILED — ${fails.length} issue(s):`); fails.forEach((m) => console.error('  • ' + m)); process.exit(1); }
  console.log('VERIFY-PLURAL-NOUN PASSED — oracle 100%; pluralize matches ground truth incl. all /es/ cases; longest/shortest/fixed-guess bots all <= chance; answer DERIVED from the /s/-or-/es/ rule; 3 distinct chips; no-answer-leak; >=2 /es/ nouns; >=7 rounds.');
  process.exit(0);
})();
