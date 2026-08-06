#!/usr/bin/env node
/* =====================================================================
   verify-central-message-core.js — the MEASURED build-gate for "Juniper's
   Story Lantern" (RL.1.2, central message / lesson). Drives the REAL
   central-message-core.js over the REAL manifest. The child picks the LESSON
   card; the foils are a true-detail (quotes the story) + a wrong-moral.

     • ORACLE (the `moral` card) → 100%;
     • POSITION bots (always card #1/#2/#3, authored order) → <= chance;
     • LONGEST / SHORTEST option bots → <= chance (length is no cue);
     • OVERLAP bot ("pick the card most like the story") → <= chance — it must
       grab the TRUE-DETAIL foil (highest story-word overlap), not the moral.
   Plus STRUCTURAL: exactly one moral + one detail + one wrong-moral per round;
   answer derived-not-stored; childView never exposes `kind`; >=7 rounds; and
   the detail foil has STRICTLY the highest overlap on every round (so the
   "most-like-the-text" shortcut is reliably WRONG).
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'central-message-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'juniper-story-lantern-activities.json');
const CHANCE = 0.45;

function loadCore() { const src = fs.readFileSync(CORE, 'utf8'); const win = {}; new Function('window', src)(win); if (!win.CentralMessageCore) throw new Error('core did not attach window.CentralMessageCore'); return win.CentralMessageCore; }

const fails = [];
const F = (cond, msg) => { if (!cond) fails.push(msg); };
const pct = (x) => (100 * x).toFixed(1) + '%';

(function main() {
  const Core = loadCore();
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  const rounds = manifest[0].params.rounds || [];
  const N = rounds.length || 1;

  F(rounds.length >= 7, `bank has ${rounds.length} rounds (need >=7)`);

  /* structural */
  rounds.forEach((r) => {
    const f = Core.facts(r);
    F(f.threeOptions, `${r.id}: not exactly 3 options`);
    F(f.oneMoral, `${r.id}: not exactly one moral`);
    F(f.oneDetail, `${r.id}: not exactly one detail foil`);
    F(f.oneWrongMoral, `${r.id}: not exactly one wrong-moral foil`);
    F(f.derivedNotStored, `${r.id}: has a stored answer/correctIndex`);
    const view = Core.childView(r);
    F((view.options || []).every((o) => Object.keys(o).sort().join(',') === 'id,text'), `${r.id}: childView option carries extra keys (only {id,text} allowed)`);
    /* the detail foil must have STRICTLY the highest story-overlap */
    const a = Core.audit(r);
    const detail = a.options.filter((o) => o.kind === 'detail')[0];
    const others = a.options.filter((o) => o.kind !== 'detail');
    F(detail && others.every((o) => detail.overlap > o.overlap), `${r.id}: the detail foil is not the unique highest story-overlap (overlaps: ${a.options.map((o) => o.kind + '=' + o.overlap).join(', ')}) — the 'most-like-the-text' shortcut would not reliably miss`);
  });

  /* solvers */
  const byMaxLen = (r, dir) => { const o = Core.options(r); let best = o[0]; o.forEach((x) => { if (dir > 0 ? x.text.length > best.text.length : x.text.length < best.text.length) best = x; }); return best.id; };
  const byMaxOverlap = (r) => { const o = Core.options(r); let best = o[0], bo = Core.overlap(r, o[0]); o.forEach((x) => { const ov = Core.overlap(r, x); if (ov > bo) { bo = ov; best = x; } }); return best.id; };

  let oracle = 0, longest = 0, shortest = 0, ovl = 0;
  const posHits = [0, 0, 0];
  rounds.forEach((r) => {
    if (Core.grade(r, Core.oracle(r))) oracle++;
    if (Core.grade(r, byMaxLen(r, +1))) longest++;
    if (Core.grade(r, byMaxLen(r, -1))) shortest++;
    if (Core.grade(r, byMaxOverlap(r))) ovl++;
    const o = Core.options(r);
    for (let p = 0; p < 3; p++) if (o[p] && Core.grade(r, o[p].id)) posHits[p]++;
  });

  F(oracle === N, `oracle ${oracle}/${N} (must be 100%)`);
  F(longest / N <= CHANCE, `longest-option bot ${pct(longest / N)} > ${pct(CHANCE)} (length cue)`);
  F(shortest / N <= CHANCE, `shortest-option bot ${pct(shortest / N)} > ${pct(CHANCE)} (length cue)`);
  F(ovl / N <= CHANCE, `overlap ("most-like-the-story") bot ${pct(ovl / N)} > ${pct(CHANCE)} — the moral is too story-like`);
  posHits.forEach((h, p) => F(h / N <= CHANCE, `position bot "always card #${p + 1}" ${pct(h / N)} > ${pct(CHANCE)} (the moral sits at a fixed slot — vary it)`));

  console.log(`bank: ${N} rounds`);
  console.log(`  ${oracle === N ? 'ok  ' : 'FAIL'} oracle: ${oracle}/${N}`);
  console.log(`  ${longest / N <= CHANCE ? 'ok  ' : 'FAIL'} longest: ${pct(longest / N)}   ${shortest / N <= CHANCE ? 'ok  ' : 'FAIL'} shortest: ${pct(shortest / N)}   ${ovl / N <= CHANCE ? 'ok  ' : 'FAIL'} overlap: ${pct(ovl / N)}`);
  console.log(`  position bots: #1 ${pct(posHits[0] / N)}  #2 ${pct(posHits[1] / N)}  #3 ${pct(posHits[2] / N)} (ceiling ${pct(CHANCE)})`);
  console.log('');
  if (fails.length) { console.error(`VERIFY-CENTRAL-MESSAGE FAILED — ${fails.length} issue(s):`); fails.forEach((m) => console.error('  • ' + m)); process.exit(1); }
  console.log('VERIFY-CENTRAL-MESSAGE PASSED — oracle 100%; the detail foil is the unique highest story-overlap so the "most-like-the-text" shortcut reliably MISSES; longest/shortest/overlap/position bots all <= chance; one moral + one detail + one wrong-moral per round; derived-not-stored; childView hides kind; >=7 rounds.');
  process.exit(0);
})();
