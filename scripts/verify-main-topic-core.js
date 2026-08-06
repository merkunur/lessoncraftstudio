#!/usr/bin/env node
/* =====================================================================
   verify-main-topic-core.js — the MEASURED build-gate for "Marina's Headline
   Desk" (RI.2.2, main topic). Drives the REAL main-topic-core.js over the
   REAL manifest. The child taps the MAIN TOPIC; foils are a true small detail
   (quotes the article) + an off-topic.

     • ORACLE (the `topic` card) → 100%;
     • POSITION bots (always #1/#2/#3) → <= chance;
     • LONGEST / SHORTEST option bots → <= chance;
     • ARTICLE-OVERLAP bot ("pick the card most like the text") → <= chance —
       it must grab the DETAIL foil (highest article-overlap), not the topic.
   Plus STRUCTURAL: one topic + one detail + one offtopic per round; answer
   derived-not-stored; childView never exposes `kind`; the detail has STRICTLY
   the highest article-overlap on every round; >=7 rounds.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'main-topic-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'marina-headline-desk-activities.json');
const CHANCE = 0.45;

function loadCore() { const src = fs.readFileSync(CORE, 'utf8'); const win = {}; new Function('window', src)(win); if (!win.MainTopicCore) throw new Error('core did not attach window.MainTopicCore'); return win.MainTopicCore; }

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
    F(f.threeOptions, `${r.id}: not exactly 3 options`);
    F(f.oneTopic, `${r.id}: not exactly one topic`);
    F(f.oneDetail, `${r.id}: not exactly one detail foil`);
    F(f.oneOfftopic, `${r.id}: not exactly one offtopic foil`);
    F(f.derivedNotStored, `${r.id}: has a stored answer/correctIndex`);
    const view = Core.childView(r);
    F((view.options || []).every((o) => Object.keys(o).sort().join(',') === 'id,text'), `${r.id}: childView option carries extra keys`);
    const a = Core.audit(r);
    const detail = a.options.filter((o) => o.kind === 'detail')[0];
    const others = a.options.filter((o) => o.kind !== 'detail');
    F(detail && others.every((o) => detail.overlap > o.overlap), `${r.id}: the detail foil is not the unique highest article-overlap (${a.options.map((o) => o.kind + '=' + o.overlap).join(', ')})`);
  });

  const byLen = (r, dir) => { const o = Core.options(r); let best = o[0]; o.forEach((x) => { if (dir > 0 ? x.text.length > best.text.length : x.text.length < best.text.length) best = x; }); return best.id; };
  const byOverlap = (r) => { const o = Core.options(r); let best = o[0], bo = Core.overlap(r, o[0]); o.forEach((x) => { const ov = Core.overlap(r, x); if (ov > bo) { bo = ov; best = x; } }); return best.id; };

  let oracle = 0, longest = 0, shortest = 0, ovl = 0; const pos = [0, 0, 0];
  rounds.forEach((r) => {
    if (Core.grade(r, Core.oracle(r))) oracle++;
    if (Core.grade(r, byLen(r, +1))) longest++;
    if (Core.grade(r, byLen(r, -1))) shortest++;
    if (Core.grade(r, byOverlap(r))) ovl++;
    const o = Core.options(r);
    for (let p = 0; p < 3; p++) if (o[p] && Core.grade(r, o[p].id)) pos[p]++;
  });

  F(oracle === N, `oracle ${oracle}/${N} (must be 100%)`);
  F(longest / N <= CHANCE, `longest bot ${pct(longest / N)} > ${pct(CHANCE)}`);
  F(shortest / N <= CHANCE, `shortest bot ${pct(shortest / N)} > ${pct(CHANCE)}`);
  F(ovl / N <= CHANCE, `article-overlap bot ${pct(ovl / N)} > ${pct(CHANCE)} (the topic is too article-like)`);
  pos.forEach((h, p) => F(h / N <= CHANCE, `position bot "always #${p + 1}" ${pct(h / N)} > ${pct(CHANCE)}`));

  console.log(`bank: ${N} rounds`);
  console.log(`  ${oracle === N ? 'ok  ' : 'FAIL'} oracle: ${oracle}/${N}`);
  console.log(`  longest ${pct(longest / N)} | shortest ${pct(shortest / N)} | article-overlap ${pct(ovl / N)} | pos #1 ${pct(pos[0] / N)} #2 ${pct(pos[1] / N)} #3 ${pct(pos[2] / N)}  (ceiling ${pct(CHANCE)})`);
  console.log('');
  if (fails.length) { console.error(`VERIFY-MAIN-TOPIC FAILED — ${fails.length} issue(s):`); fails.forEach((m) => console.error('  • ' + m)); process.exit(1); }
  console.log('VERIFY-MAIN-TOPIC PASSED — oracle 100%; the detail foil is the unique highest article-overlap so "pick the card most like the text" reliably MISSES the topic; longest/shortest/article-overlap/position bots all <= chance; one topic + one detail + one offtopic per round; derived-not-stored; childView hides kind; >=7 rounds.');
  process.exit(0);
})();
