#!/usr/bin/env node
/* =====================================================================
   verify-question-word-core.js — the MEASURED build-gate for "Wren's
   Question Window" (L.K.1.d, question words). Drives the REAL question-word-
   core.js over the REAL manifest. The child taps the wh-word that fits.

     • ORACLE (QWORD_TABLE[asks]) → 100%;
     • FIXED-GUESS bot (always the same wh-word) → <= chance (answer-types balanced);
     • LONGEST / SHORTEST chip bots → <= chance.
   Plus STRUCTURAL: answer DERIVED-not-stored; the 6 chips are the fixed wh-set
   [who,what,where,when,why,how]; asks valid; "___" present; the wh-word is NOT
   already a token in the sentence (no-answer-leak); all 6 answer-types present;
   >=7 rounds.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'question-word-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'wren-question-window-activities.json');
const CHANCE = 0.45;

function loadCore() { const src = fs.readFileSync(CORE, 'utf8'); const win = {}; new Function('window', src)(win); if (!win.QuestionWordCore) throw new Error('core did not attach window.QuestionWordCore'); return win.QuestionWordCore; }

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
    F(f.asksValid, `${r.id}: asks "${r.asks}" invalid`);
    F(f.sixChips, `${r.id}: chips not the fixed 6`);
    F(f.sentenceHasBlank, `${r.id}: no "___" blank`);
    F(f.sentenceNoAnswerLeak, `${r.id}: the wh-word "${Core.oracle(r)}" already appears in the sentence`);
    F(f.derivedNotStored, `${r.id}: has a stored answer`);
    const view = Core.childView(r);
    F(JSON.stringify(view).indexOf('asks') < 0, `${r.id}: childView leaks asks`);
    F(Core.chips(r).join(',') === 'who,what,where,when,why,how', `${r.id}: chips are not the fixed wh-set`);
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
  F(maxFixed / N <= CHANCE, `fixed-guess bot ${pct(maxFixed / N)} > ${pct(CHANCE)} (one wh-word is the answer too often)`);

  const asks = Core.deckFacts(rounds).distinctAsks;
  ['person', 'thing', 'place', 'time', 'reason', 'manner'].forEach((a) => F(asks.indexOf(a) >= 0, `missing answer-type "${a}"`));

  console.log(`bank: ${N} rounds | asks: ${asks.join('/')} | answer counts: ${JSON.stringify(ansCount)}`);
  console.log(`  ${oracle === N ? 'ok  ' : 'FAIL'} oracle: ${oracle}/${N}`);
  console.log(`  longest ${pct(longest / N)} | shortest ${pct(shortest / N)} | fixed-guess ${pct(maxFixed / N)}  (ceiling ${pct(CHANCE)})`);
  console.log('');
  if (fails.length) { console.error(`VERIFY-QUESTION-WORD FAILED — ${fails.length} issue(s):`); fails.forEach((m) => console.error('  • ' + m)); process.exit(1); }
  console.log('VERIFY-QUESTION-WORD PASSED — oracle 100%; longest/shortest/fixed-guess bots all <= chance; answer DERIVED from QWORD_TABLE; fixed 6-chip wh-set; no-answer-leak; all 6 answer-types present; >=7 rounds.');
  process.exit(0);
})();
