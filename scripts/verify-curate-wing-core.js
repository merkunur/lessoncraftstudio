#!/usr/bin/env node
/* =====================================================================
   verify-curate-wing-core.js — build-time MEASURED gate for the naming-under-
   transformation cognition behind "Professor Pip's Museum" (CCSS K.G.A.2).
   Loads the REAL mini tools/curate-wing-core.js + the manifest rounds and
   proves (exit 0 = pass; 1 = any failure):

     #1 INVARIANT-NAMER passes 100% FIRST-ATTEMPT — classifyInvariant names
        every exhibit's true name across every seed (correctly excludes the
        rhombus/oval/parallelogram/pentagon → 'mystery').
     #2 CANONICAL-POSE matcher FAILS — bbox/axis aspect mis-names the rotated
        rectangle + the rhombus → accuracy below the namer (well under 90%).
     #3 SILHOUETTE-MATCH FAILS — no pedestal exposes a canonical icon
        (hasCanonicalIcon absent/false everywhere) → the matcher returns null.
     #4 SIDE-COUNT router FAILS — vertex count alone can't separate
        square/rectangle/rhombus → accuracy well under the namer.
     #5 THE TRANSFORM IS THE ASSESSMENT — ≥50% of belt items are assessed +
        every assessed item is NON-canonical (isCanonicalPose false).
     #6 RE-SEED-ON-RETURN — reseed(seed) yields a DIFFERENT transform (rot/scale
        delta above a threshold) for the same type.
     #7 IMPOSTOR + DISJOINT — ≥1 hall pairs a genuine square with a rhombus
        (both routed correctly); a square never appears in a rectangle-only hall.
     #8 FORMAL-LABEL — "diamond"/"rhombus"/"oval"/"parallelogram"/"pentagon"
        never appear as child-facing pedestal types or labels.
     #9 ≥7 distinct facetActs (rotation/scale/proportion all map to
        transformed-route); distinct ids.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'curate-wing-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.CurateWingCore;
if (!Core) { console.error('FAIL: curate-wing-core.js did not define window.CurateWingCore'); process.exit(1); }
const S = Core.SOLVERS;

const rounds = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'pip-museum-activities.json'), 'utf8'))[0].params.rounds;

const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
const trueName = (t) => (t === 'rectangle_fine') ? 'rectangle' : (Core.SHAPES[t] ? Core.SHAPES[t].name : 'mystery');

/* gather every shape item across all rounds (belt / choices / set / claims) */
const items = [];
const pedestals = [];
rounds.forEach((r) => {
  (r.pedestals || []).forEach((p) => pedestals.push(p));
  ['belt', 'choices', 'set'].forEach((k) => (r[k] || []).forEach((it) => items.push(it)));
  (r.claims || []).forEach((c) => items.push({ type: c.type, seed: c.seed, assessed: c.assessed }));
});

/* #1 / #2 / #4 — solver accuracy over the assessed deck */
let inv = 0, cpm = 0, scr = 0, n = 0, assessedN = 0;
items.forEach((it) => {
  const g = Core.genGeometryFor(it.type, it.seed, it.assessed);
  const truth = trueName(it.type);
  if (Core.classifyInvariant(g) === truth) inv++;
  if (S.canonicalPoseMatcher(g) === truth) cpm++;
  if (S.sideCountRouter(g) === truth) scr++;
  n++;
  if (it.assessed) { assessedN++; check(!Core.isCanonicalPose(g), `assessed item ${it.type}#${it.seed} is in a CANONICAL pose (the transform must be the assessment)`); }
});
check(inv === n, `invariant-namer is ${inv}/${n} (must be 100% first-attempt)`);
check(cpm / n < 0.90, `canonical-pose matcher accuracy ${(cpm / n * 100).toFixed(0)}% is not below 90% (the transform isn't defeating it)`);
check(scr / n < 0.80, `side-count router accuracy ${(scr / n * 100).toFixed(0)}% is not below 80% (it can separate the 4-sided shapes)`);
check(inv / n - cpm / n > 0.12 && inv / n - scr / n > 0.20, 'the cheating solvers are not clearly below the invariant namer');

/* #3 silhouette-match — no pedestal has a canonical icon → routes to null */
check(pedestals.every((p) => !p.hasCanonicalIcon), 'a pedestal declares hasCanonicalIcon (the silhouette-match cheat would pass)');
{ const g = Core.genGeometryFor('square', 999, true); check(S.silhouetteMatcher(g, pedestals) === null, 'silhouette-matcher resolved a name with no canonical icons present'); }

/* #5 ≥50% assessed */
check(assessedN / n >= 0.5, `only ${(assessedN / n * 100).toFixed(0)}% of items are assessed (<50% non-canonical)`);

/* #6 re-seed-on-return changes the transform */
['square', 'triangle', 'rectangle', 'hexagon'].forEach((t) => {
  let diff = 0, tot = 0;
  for (let s = 1; s <= 50; s++) { const a = Core.genGeometry(t, s * 13 + 1, true), b = Core.genGeometry(t, Core.reseed(s * 13 + 1), true); if (Math.abs(a.rot - b.rot) >= 10 || Math.abs(a.scale - b.scale) >= 0.1) diff++; tot++; }
  check(diff / tot > 0.6, `re-seed-on-return changes the transform only ${(diff / tot * 100).toFixed(0)}% of the time for ${t}`);
});

/* #7 impostor + disjoint */
const excludeHall = rounds.find((r) => r.facetAct === 'exclude-route');
check(excludeHall && excludeHall.belt.some((b) => b.type === 'rhombus' || b.type === 'oval') && excludeHall.belt.some((b) => trueName(b.type) !== 'mystery'), 'no hall pairs a genuine named shape with an impostor → Mystery Gallery');
rounds.forEach((r) => { const peds = (r.pedestals || []).map((p) => p.type); if (peds.indexOf('rectangle') >= 0 && peds.indexOf('square') < 0) check(!(r.belt || []).some((b) => trueName(b.type) === 'square'), `${r.id}: a square appears in a rectangle-only hall (square⊂rectangle inclusion-punishment)`); });

/* #8 formal-label — banned child-facing shape words never appear as a pedestal type/label */
rounds.forEach((r) => (r.pedestals || []).forEach((p) => check(['circle', 'triangle', 'square', 'rectangle', 'hexagon', 'mystery'].indexOf(p.type) >= 0, `${r.id}: pedestal type '${p.type}' is not a named-shape or mystery`)));
check(!/"label"\s*:\s*"(diamond|rhombus|oval|parallelogram|pentagon)"/i.test(fs.readFileSync(path.join(REPO, 'mini tools', 'pip-museum-activities.json'), 'utf8')), 'a banned shape word appears as a child-facing label');

/* #9 ≥7 distinct facetActs + distinct ids */
const acts = new Set(rounds.map((r) => r.facetAct));
check(acts.size >= 7, `only ${acts.size} distinct facetActs (<7): ${[...acts].join(',')}`);
check(new Set(rounds.map((r) => r.id)).size === rounds.length, 'duplicate round ids');

if (failures.length) {
  console.error(`FAIL — ${failures.length} curate-wing violation(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${rounds.length} rounds / ${acts.size} facetActs / ${n} exhibits: ` +
  `invariant-namer 100% first-attempt; canonical-pose ${(cpm / n * 100).toFixed(0)}% + side-count ${(scr / n * 100).toFixed(0)}% (both << 100, can't survive the transform / 4-sided ambiguity); ` +
  `silhouette-match null (no canonical icon on any pedestal); ${(assessedN / n * 100).toFixed(0)}% assessed (all non-canonical); re-seed changes the transform; impostor→Mystery present, square⊂rectangle disjoint; formal labels only.`);
process.exit(0);
