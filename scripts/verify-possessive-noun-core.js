#!/usr/bin/env node
/* =====================================================================
   verify-possessive-noun-core.js — the MEASURED build-gate for "Hattie's
   Whose-Is-It" (L.1.1.b). Drives the REAL possessive-noun-core.js over the REAL
   manifest. The child taps the singular-possessive form (dog's).

     • ORACLE (the form === noun+"'s") → 100%;
     • POSITION / LONGEST / SHORTEST / FIXED-GUESS bots → <= chance.
   Plus STRUCTURAL per round: exactly one form === answer; 3 distinct; the answer
   is DERIVED as noun+"'s"; childView never leaks a correctness flag. Plus a
   DERIVED proof (the forms come from `noun`, not a stored answer string).
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'possessive-noun-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'hattie-whose-is-it-activities.json');
const CHANCE = 0.45;

function loadCore() { const src = fs.readFileSync(CORE, 'utf8'); const win = {}; new Function('window', src)(win); if (!win.PossessiveNounCore) throw new Error('core did not attach window.PossessiveNounCore'); return win.PossessiveNounCore; }

const fails = [];
const F = (cond, msg) => { if (!cond) fails.push(msg); };
const pct = (x) => (100 * x).toFixed(1) + '%';

(function main() {
  const Core = loadCore();
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  const rounds = manifest[0].params.rounds || [];
  const N = rounds.length || 1;

  F(rounds.length >= 8, `bank has ${rounds.length} rounds (need >=8)`);

  let oracleHits = 0;
  rounds.forEach((r) => {
    const f = Core.facts(r);
    F(f.hasNoun, `${r.id}: missing noun`);
    F(f.oneMatch, `${r.id}: not exactly one form === "${Core.answerOf(r)}"`);
    F(f.threeForms, `${r.id}: not 3 forms`);
    F(f.distinct, `${r.id}: forms not distinct`);
    F(f.answerIsPossessive, `${r.id}: answer is not noun+"'s"`);
    if (Core.grade(r, Core.oracle(r))) oracleHits++;
    const view = Core.childView(r);
    F(JSON.stringify(view).indexOf('"correct"') < 0 && JSON.stringify(view).indexOf('"answer"') < 0, `${r.id}: childView leaks a correctness flag`);
  });
  F(oracleHits === N, `oracle ${oracleHits}/${N} (must be 100%)`);

  // DERIVED-not-stored: forms are built from `noun`; a bogus authored answer is irrelevant.
  const poison = Object.assign({}, rounds[0], { answer: 'ZZZ', forms: ['x', 'y', 'z'] });
  F(Core.answerOf(poison) === rounds[0].noun + "'s", 'answer is read from a stored field (must DERIVE noun+"\'s")');
  F(Core.grade(poison, Core.oracle(poison)), 'oracle broke when bogus fields were injected (must ignore them)');

  const d = Core.deckFacts(rounds);
  F(d.positionBot <= CHANCE, `position bot ${pct(d.positionBot)} > ${pct(CHANCE)}`);
  F(d.longestBot <= CHANCE, `longest bot ${pct(d.longestBot)} > ${pct(CHANCE)}`);
  F(d.shortestBot <= CHANCE, `shortest bot ${pct(d.shortestBot)} > ${pct(CHANCE)}`);
  F(d.fixedGuessBot <= CHANCE, `fixed-guess bot ${pct(d.fixedGuessBot)} > ${pct(CHANCE)}`);

  console.log(`bank: ${N} rounds`);
  console.log(`  ${oracleHits === N ? 'ok  ' : 'FAIL'} oracle: ${oracleHits}/${N}`);
  console.log(`  position ${pct(d.positionBot)} | longest ${pct(d.longestBot)} | shortest ${pct(d.shortestBot)} | fixed-guess ${pct(d.fixedGuessBot)}  (ceiling ${pct(CHANCE)})`);
  console.log('');
  if (fails.length) { console.error(`VERIFY-POSSESSIVE-NOUN FAILED — ${fails.length} issue(s):`); fails.forEach((m) => console.error('  • ' + m)); process.exit(1); }
  console.log('VERIFY-POSSESSIVE-NOUN PASSED — oracle 100%; answer DERIVED noun+"\'s" (bogus fields ignored); one match + 3 distinct; position/longest/shortest/fixed-guess <= chance; >=8 rounds.');
  process.exit(0);
})();
