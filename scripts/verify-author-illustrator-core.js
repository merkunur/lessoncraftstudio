#!/usr/bin/env node
/* =====================================================================
   verify-author-illustrator-core.js — the MEASURED build-gate for "Inky's Book
   Workshop" (RL.K.6). Drives the REAL author-illustrator-core.js over the REAL
   manifest. The child taps whose job it is (author / illustrator / reader).

     • ORACLE (the card whose role === the job's role) → 100%;
     • POSITION / LONGEST / SHORTEST / FIXED-GUESS bots → <= chance.
   Plus STRUCTURAL per round: job valid; exactly one card matches; reader is the
   answer ONLY on `read` rounds; 3 distinct. Plus a centred-on-standard check
   (author + illustrator are the majority of answers) and a DERIVED proof
   (a bogus authored `answer` is ignored — the role is mapped from `job`).
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'author-illustrator-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'inky-book-workshop-activities.json');
const CHANCE = 0.45;

function loadCore() { const src = fs.readFileSync(CORE, 'utf8'); const win = {}; new Function('window', src)(win); if (!win.AuthorIllustratorCore) throw new Error('core did not attach window.AuthorIllustratorCore'); return win.AuthorIllustratorCore; }

const fails = [];
const F = (cond, msg) => { if (!cond) fails.push(msg); };
const pct = (x) => (100 * x).toFixed(1) + '%';

(function main() {
  const Core = loadCore();
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  const rounds = manifest[0].params.rounds || [];
  const N = rounds.length || 1;

  F(rounds.length >= 8, `bank has ${rounds.length} rounds (need >=8)`);

  let oracleHits = 0, authorIllu = 0;
  rounds.forEach((r) => {
    const f = Core.facts(r);
    F(f.jobValid, `${r.id}: job "${r.job}" not wrote/drew/read`);
    F(f.oneMatch, `${r.id}: not exactly one card matches the role`);
    F(f.threeChoices, `${r.id}: not 3 role cards`);
    F(f.distinct, `${r.id}: role cards not distinct`);
    F(f.readerOnlyOnRead, `${r.id}: reader/role mismatch (reader must be the answer only on a read round)`);
    const role = Core.roleOf(r);
    if (role === 'author' || role === 'illustrator') authorIllu++;
    if (Core.grade(r, Core.oracle(r))) oracleHits++;
    const view = Core.childView(r);
    F(JSON.stringify(view).indexOf('"answer"') < 0, `${r.id}: childView leaks an answer property`);
  });
  F(oracleHits === N, `oracle ${oracleHits}/${N} (must be 100%)`);
  F(authorIllu >= Math.ceil(N * 0.6), `only ${authorIllu}/${N} rounds are author/illustrator (standard must be centred on those)`);

  // DERIVED-not-stored: a bogus authored answer is ignored (role mapped from job).
  const poison = Object.assign({}, rounds[0], { answer: 99, role: 'reader' });
  F(Core.grade(poison, Core.oracle(poison)) && Core.roleOf(poison) === Core.roleOf(rounds[0]), 'role is read from a stored field (must DERIVE from job)');

  const d = Core.deckFacts(rounds);
  F(d.positionBot <= CHANCE, `position bot ${pct(d.positionBot)} > ${pct(CHANCE)}`);
  F(d.longestBot <= CHANCE, `longest bot ${pct(d.longestBot)} > ${pct(CHANCE)}`);
  F(d.shortestBot <= CHANCE, `shortest bot ${pct(d.shortestBot)} > ${pct(CHANCE)}`);
  F(d.fixedGuessBot <= CHANCE, `fixed-guess bot ${pct(d.fixedGuessBot)} > ${pct(CHANCE)}`);

  console.log(`bank: ${N} rounds  (author/illustrator ${authorIllu}/${N})`);
  console.log(`  ${oracleHits === N ? 'ok  ' : 'FAIL'} oracle: ${oracleHits}/${N}`);
  console.log(`  position ${pct(d.positionBot)} | longest ${pct(d.longestBot)} | shortest ${pct(d.shortestBot)} | fixed-guess ${pct(d.fixedGuessBot)}  (ceiling ${pct(CHANCE)})`);
  console.log('');
  if (fails.length) { console.error(`VERIFY-AUTHOR-ILLUSTRATOR FAILED — ${fails.length} issue(s):`); fails.forEach((m) => console.error('  • ' + m)); process.exit(1); }
  console.log('VERIFY-AUTHOR-ILLUSTRATOR PASSED — oracle 100%; role DERIVED from job (bogus answer ignored); one match + reader-only-on-read + author/illustrator-centred; position/longest/shortest/fixed-guess <= chance; >=8 rounds.');
  process.exit(0);
})();
