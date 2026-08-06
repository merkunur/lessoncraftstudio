#!/usr/bin/env node
/* =====================================================================
   verify-trait-evidence-core.js — the MEASURED build-gate for "Marlo's
   Magnifier" (RL.1.3, describe a character with key details). Drives the
   REAL trait-evidence-core.js over the REAL manifest. The child taps the
   detail that PROVES a trait; foils are other true story details.

     • ORACLE (the `supports` detail) → 100%;
     • POSITION bots (always detail #1/#2/#3) → <= chance;
     • LONGEST / SHORTEST / RECENCY(last) bots → <= chance;
     • TRAIT-WORD bot (tap the detail that contains the trait word) → <= chance
       — the evidence is an ACTION and never restates the trait word.
   Plus STRUCTURAL: exactly one `supports` per round; derived-not-stored;
   childView never exposes `supports`; the trait claim names the trait word
   but the supporting detail does NOT; >=7 rounds.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'trait-evidence-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'marlo-magnifier-activities.json');
const CHANCE = 0.45;

function loadCore() { const src = fs.readFileSync(CORE, 'utf8'); const win = {}; new Function('window', src)(win); if (!win.TraitEvidenceCore) throw new Error('core did not attach window.TraitEvidenceCore'); return win.TraitEvidenceCore; }

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
    F(f.threeDetails, `${r.id}: not exactly 3 details`);
    F(f.oneSupports, `${r.id}: not exactly one supporting detail`);
    F(f.derivedNotStored, `${r.id}: has a stored answer/correctIndex`);
    F(f.traitNamesWord, `${r.id}: the trait claim does not contain its traitWord`);
    F(f.supportLacksTraitWord, `${r.id}: the supporting detail restates the trait word (trait-word-match would win)`);
    const view = Core.childView(r);
    F((view.details || []).every((d) => Object.keys(d).sort().join(',') === 'id,text'), `${r.id}: childView detail carries extra keys (only {id,text})`);
  });

  const byLen = (r, dir) => { const d = Core.details(r); let best = d[0]; d.forEach((x) => { if (dir > 0 ? x.text.length > best.text.length : x.text.length < best.text.length) best = x; }); return best.id; };
  const traitWordPick = (r) => { const d = Core.details(r); for (let i = 0; i < d.length; i++) if (Core.hasTraitWord(r, d[i])) return d[i].id; return null; };

  let oracle = 0, longest = 0, shortest = 0, recency = 0, tw = 0;
  const pos = [0, 0, 0];
  rounds.forEach((r) => {
    if (Core.grade(r, Core.oracle(r))) oracle++;
    if (Core.grade(r, byLen(r, +1))) longest++;
    if (Core.grade(r, byLen(r, -1))) shortest++;
    const d = Core.details(r);
    if (Core.grade(r, d[d.length - 1].id)) recency++;
    if (Core.grade(r, traitWordPick(r))) tw++;
    for (let p = 0; p < 3; p++) if (d[p] && Core.grade(r, d[p].id)) pos[p]++;
  });

  F(oracle === N, `oracle ${oracle}/${N} (must be 100%)`);
  F(longest / N <= CHANCE, `longest bot ${pct(longest / N)} > ${pct(CHANCE)}`);
  F(shortest / N <= CHANCE, `shortest bot ${pct(shortest / N)} > ${pct(CHANCE)}`);
  F(recency / N <= CHANCE, `recency(last) bot ${pct(recency / N)} > ${pct(CHANCE)}`);
  F(tw / N <= CHANCE, `trait-word bot ${pct(tw / N)} > ${pct(CHANCE)} (evidence must not restate the trait word)`);
  pos.forEach((h, p) => F(h / N <= CHANCE, `position bot "always #${p + 1}" ${pct(h / N)} > ${pct(CHANCE)}`));

  console.log(`bank: ${N} rounds`);
  console.log(`  ${oracle === N ? 'ok  ' : 'FAIL'} oracle: ${oracle}/${N}`);
  console.log(`  longest ${pct(longest / N)} | shortest ${pct(shortest / N)} | recency ${pct(recency / N)} | trait-word ${pct(tw / N)} | pos #1 ${pct(pos[0] / N)} #2 ${pct(pos[1] / N)} #3 ${pct(pos[2] / N)}  (ceiling ${pct(CHANCE)})`);
  console.log('');
  if (fails.length) { console.error(`VERIFY-TRAIT-EVIDENCE FAILED — ${fails.length} issue(s):`); fails.forEach((m) => console.error('  • ' + m)); process.exit(1); }
  console.log('VERIFY-TRAIT-EVIDENCE PASSED — oracle 100%; the evidence never restates the trait word (trait-word-match fails); longest/shortest/recency/position bots all <= chance; exactly one supporting detail per round; derived-not-stored; childView hides supports; >=7 rounds.');
  process.exit(0);
})();
