#!/usr/bin/env node
/* =====================================================================
   verify-fact-detail-core.js — the MEASURED build-gate for "Atlas's Fact Files"
   (RI.K.1). Drives the REAL fact-detail-core.js over the REAL manifest. The
   child reads a fact and taps the key-detail answer.

     • ORACLE (the option === the answer) → 100%;
     • POSITION / LONGEST / SHORTEST / FIXED-GUESS bots → <= chance.
   Plus STRUCTURAL per round: exactly one option === answer; 3 distinct; the
   answer is genuinely FINDABLE in the fact (a substring) so it's a real
   comprehension check; childView never leaks the answer. Plus a DERIVED proof
   (a bogus authored index is ignored — oracle = options.indexOf(answer)).
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'fact-detail-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'atlas-fact-files-activities.json');
const CHANCE = 0.45;

function loadCore() { const src = fs.readFileSync(CORE, 'utf8'); const win = {}; new Function('window', src)(win); if (!win.FactDetailCore) throw new Error('core did not attach window.FactDetailCore'); return win.FactDetailCore; }

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
    F(f.hasAnswer, `${r.id}: missing answer`);
    F(f.oneMatch, `${r.id}: not exactly one option === answer "${r.answer}"`);
    F(f.threeOptions, `${r.id}: not 3 options`);
    F(f.distinct, `${r.id}: options not distinct`);
    F(f.answerInFact, `${r.id}: the answer "${r.answer}" is not findable in the fact (not a substring)`);
    if (Core.grade(r, Core.oracle(r))) oracleHits++;
    const view = Core.childView(r);
    F(JSON.stringify(view).indexOf('"answer"') < 0, `${r.id}: childView leaks the answer property`);
  });
  F(oracleHits === N, `oracle ${oracleHits}/${N} (must be 100%)`);

  // DERIVED-not-stored: a bogus authored index is ignored (oracle = options.indexOf(answer)).
  const poison = Object.assign({}, rounds[0], { correctIndex: 0, answerIndex: 0 });
  F(Core.oracle(poison) === rounds[0].options.indexOf(rounds[0].answer), 'oracle is read from a stored index (must DERIVE options.indexOf(answer))');

  const d = Core.deckFacts(rounds);
  F(d.positionBot <= CHANCE, `position bot ${pct(d.positionBot)} > ${pct(CHANCE)}`);
  F(d.longestBot <= CHANCE, `longest bot ${pct(d.longestBot)} > ${pct(CHANCE)}`);
  F(d.shortestBot <= CHANCE, `shortest bot ${pct(d.shortestBot)} > ${pct(CHANCE)}`);
  F(d.fixedGuessBot <= CHANCE, `fixed-guess bot ${pct(d.fixedGuessBot)} > ${pct(CHANCE)}`);

  /* ANSWER-SENTENCE BALANCE (2026-10-17): every fact carries a sentence-1 question (base)
     and a sentence-2 question (alt); the wrapper asks variant (k + pass) % 2 for data index k,
     so each pass must split ~half/half — "grab the end of sentence 2" may not pass. Checked
     in EVERY shipped locale, with the same per-round structure checks on both variants. */
  const sentOf = (fact, ans) => { const ss = fact.split(/(?<=[.!?])\s+/); const h = ss.map((x, i) => (x.toLowerCase().indexOf(ans.toLowerCase()) >= 0 ? i + 1 : 0)).filter(Boolean); return h.length === 1 ? h[0] : -1; };
  const banks = Object.assign({ en: rounds }, manifest[0].params.roundsL10n || {});
  Object.keys(banks).forEach((L) => {
    const rs = banks[L];
    [0, 1].forEach((pass) => {
      const c = { 1: 0, 2: 0 };
      const vs = rs.map((r, k) => {
        F(!!r.alt, `${L}/${r.id}: no alt (sentence-2) question`);
        const v = (r.alt && (k + pass) % 2 === 1) ? Object.assign({ fact: r.fact, id: r.id + '.alt' }, r.alt) : r;
        const f = Core.facts(v);
        F(f.oneMatch && f.threeOptions && f.distinct && f.answerInFact, `${L}/${v.id}: structural check failed (oneMatch/3 options/distinct/answer in fact)`);
        const sn = sentOf(r.fact, v.answer);
        F(sn === 1 || sn === 2, `${L}/${v.id}: answer "${v.answer}" is not in exactly one sentence`);
        if (sn === 1 || sn === 2) c[sn]++;
        return v;
      });
      F(Math.abs(c[1] - c[2]) <= 1, `${L} pass ${pass + 1}: answer sentence split S1=${c[1]} S2=${c[2]} (must be balanced)`);
      const dv = Core.deckFacts(vs);
      F(dv.longestBot <= CHANCE && dv.shortestBot <= CHANCE, `${L} pass ${pass + 1}: longest ${pct(dv.longestBot)} / shortest ${pct(dv.shortestBot)} > ${pct(CHANCE)}`);
      console.log(`  ${L} pass ${pass + 1}: S1=${c[1]} S2=${c[2]} longest ${pct(dv.longestBot)} shortest ${pct(dv.shortestBot)}`);
    });
  });

  console.log(`bank: ${N} rounds`);
  console.log(`  ${oracleHits === N ? 'ok  ' : 'FAIL'} oracle: ${oracleHits}/${N}`);
  console.log(`  position ${pct(d.positionBot)} | longest ${pct(d.longestBot)} | shortest ${pct(d.shortestBot)} | fixed-guess ${pct(d.fixedGuessBot)}  (ceiling ${pct(CHANCE)})`);
  console.log('');
  if (fails.length) { console.error(`VERIFY-FACT-DETAIL FAILED — ${fails.length} issue(s):`); fails.forEach((m) => console.error('  • ' + m)); process.exit(1); }
  console.log('VERIFY-FACT-DETAIL PASSED — oracle 100%; oracle DERIVED options.indexOf(answer) (bogus index ignored); one match + answer findable in the fact; position/longest/shortest/fixed-guess <= chance; >=8 rounds.');
  process.exit(0);
})();
