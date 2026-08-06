#!/usr/bin/env node
/* =====================================================================
   verify-conjunction-core.js — the MEASURED build-gate for "Hazel's Word
   Bridge" (L.1.1.g, conjunctions). Drives the REAL conjunction-core.js over
   the REAL manifest. The child taps the joining word that fits the relation.

     • ORACLE (RELATION_CONJ[relation]) → 100%;
     • FIXED-GUESS bot (always tap the same conjunction) → <= chance: no single
       conjunction is the answer in too many rounds (relations are balanced);
     • LONGEST / SHORTEST chip bots → <= chance (e.g. "because" is the longest
       and "so" the shortest, but each is the answer only ~25% of the time).
   Plus STRUCTURAL: answer DERIVED-not-stored; the 4 chips are the fixed
   conjunction set [and,but,because,so]; relation valid; "___" present; the
   conjunction is NOT already a token in the sentence (no-answer-leak); all 4
   relations present; >=7 rounds.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'conjunction-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'hazel-word-bridge-activities.json');
const CHANCE = 0.45;

function loadCore() { const src = fs.readFileSync(CORE, 'utf8'); const win = {}; new Function('window', src)(win); if (!win.ConjunctionCore) throw new Error('core did not attach window.ConjunctionCore'); return win.ConjunctionCore; }

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
    F(f.relationValid, `${r.id}: relation "${r.relation}" invalid`);
    F(f.fourChips, `${r.id}: chips not the fixed 4`);
    F(f.sentenceHasBlank, `${r.id}: no "___" blank`);
    F(f.sentenceNoAnswerLeak, `${r.id}: the conjunction "${Core.oracle(r)}" already appears in the sentence`);
    F(f.derivedNotStored, `${r.id}: has a stored answer`);
    const view = Core.childView(r);
    F(JSON.stringify(view).indexOf('relation') < 0, `${r.id}: childView leaks relation`);
    F(Core.chips(r).join(',') === 'and,but,because,so', `${r.id}: chips are not the fixed conjunction set`);
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
  F(longest / N <= CHANCE, `longest-chip bot ${pct(longest / N)} > ${pct(CHANCE)}`);
  F(shortest / N <= CHANCE, `shortest-chip bot ${pct(shortest / N)} > ${pct(CHANCE)}`);
  F(maxFixed / N <= CHANCE, `fixed-guess bot ${pct(maxFixed / N)} > ${pct(CHANCE)} (one conjunction is the answer too often — balance relations)`);

  const rels = Core.deckFacts(rounds).distinctRelations;
  ['addition', 'contrast', 'cause', 'result'].forEach((rel) => F(rels.indexOf(rel) >= 0, `missing relation "${rel}"`));

  console.log(`bank: ${N} rounds | relations: ${rels.join('/')} | answer counts: ${JSON.stringify(ansCount)}`);
  console.log(`  ${oracle === N ? 'ok  ' : 'FAIL'} oracle: ${oracle}/${N}`);
  console.log(`  longest ${pct(longest / N)} | shortest ${pct(shortest / N)} | fixed-guess ${pct(maxFixed / N)}  (ceiling ${pct(CHANCE)})`);
  console.log('');
  if (fails.length) { console.error(`VERIFY-CONJUNCTION FAILED — ${fails.length} issue(s):`); fails.forEach((m) => console.error('  • ' + m)); process.exit(1); }
  console.log('VERIFY-CONJUNCTION PASSED — oracle 100%; longest/shortest/fixed-guess bots all <= chance; answer DERIVED from RELATION_CONJ; fixed 4-chip set; no-answer-leak; all 4 relations present; >=7 rounds.');
  process.exit(0);
})();
