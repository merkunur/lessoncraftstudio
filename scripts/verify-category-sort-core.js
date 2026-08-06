#!/usr/bin/env node
/* =====================================================================
   verify-category-sort-core.js — build-time MEASURED gate for the sort-objects-
   into-categories cognition behind "Mim's Memory Baskets" (CCSS L.K.5.A). Loads
   the REAL mini tools/category-sort-core.js + the manifest rounds and proves
   (exit 0 = pass; 1 = any failure) the critic-fixed solver set:

     #1 CATEGORY-SORTER PASSES 100% — the concept-map sorts every object correctly
        across the 4 cogs.
     #2 VISUAL-FEATURE-SORTER FAILS (the headline — proves CONCEPT not appearance)
        — no single visible feature sorts everything (`bestSingleFeatureCorrect <
        spillCount`) on EVERY round; `withinCategoryVisualDiverse===true` (no
        category's members share a tag) on every round; `crossCategoryVisual
        Confound===true` on confound rounds.
     #3 3+ BASKETS + NON-LEAKING WRONG-DROP — basketsCount≥3 on sort/confound/
        diverse; `wrongDropLeaksRightBin===false`.
     #4 CATEGORY-GENERALIZATION — a category used in ≥2 rounds holds ≥2 distinct
        nouns (an instance-memorizer can't pass).
     #5 NO COUNTING — `noCountingSurface===true`.
     #6 4 COGS by `cog` with a BLOCKLIST (sort/confound/diverse/odd).
     #7 every spill noun resolves to a real bank entry (category+theme+label+vis);
        every basket id is a real category.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'category-sort-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.CategorySortCore;
if (!Core) { console.error('FAIL: category-sort-core.js did not define window.CategorySortCore'); process.exit(1); }
const S = Core.SOLVERS;

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'mims-baskets-activities.json'), 'utf8'))[0];
const rounds = manifest.params.rounds;

const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
const COGS = ['sort', 'confound', 'diverse', 'odd'];

/* #7 bank integrity */
rounds.forEach((r) => {
  const L = `round[${r.id}/${r.cog}]`;
  r.spill.forEach((n) => {
    const b = Core.info(n);
    check(!!b, `${L}: spill noun "${n}" not in the OBJECT_CATEGORY bank`);
    if (b) { check(!!b.theme && !!b.label && Array.isArray(b.vis), `${L}: bank entry "${n}" missing theme/label/vis`); check(r.baskets.indexOf(b.category) >= 0, `${L}: noun "${n}" category "${b.category}" has no basket in this round`); }
  });
  r.baskets.forEach((c) => check(!!Core.CATEGORY[c], `${L}: basket "${c}" is not a real category`));
  check(new Set(r.baskets).size === r.baskets.length, `${L}: duplicate baskets`);
});

rounds.forEach((r) => {
  const L = `round[${r.id}/${r.cog}]`;
  const f = Core.facts(r, Core.newState(r));

  /* #1 category-sorter solves */
  check(S.categorySorter(r).solved === true, `${L}: the CATEGORY-SORTER did not solve`);

  /* #2 visual-feature-sorter fails */
  check(f.withinCategoryVisualDiverse === true, `${L}: a category's members share a visible feature (sort-by-appearance possible)`);
  const vf = S.visualFeatureSorter(r);
  check(vf.reconstructs === false && vf.bestCorrect < vf.spillCount, `${L}: a single visual feature sorts everything (${vf.bestCorrect}/${vf.spillCount}) — concept not load-bearing`);
  if (r.cog === 'confound') check(f.crossCategoryVisualConfound === true, `${L}: a confound round has NO cross-category visual confound`);

  /* #3 baskets + non-leaking */
  if (r.cog !== 'odd') check(f.basketsCount >= 3, `${L}: <3 baskets (coin-flip risk)`);
  check(f.wrongDropLeaksRightBin === false, `${L}: a wrong drop leaks the right basket`);

  /* #5 no counting */
  check(f.noCountingSurface === true, `${L}: a counting surface exists`);

  /* #6 cog in the allowed set */
  check(COGS.indexOf(r.cog) >= 0, `${L}: cog "${r.cog}" not in {${COGS.join(',')}}`);

  /* a wrong drop returns the object + records nothing about the right basket */
  const wrong = r.spill.find((n) => Core.categoryOf(n) !== r.baskets[0]) || r.spill[0];
  const wrongBasket = r.baskets.find((b) => b !== Core.categoryOf(wrong));
  if (wrongBasket) { const s2 = Core.newState(r); const res = Core.drop(s2, wrong, wrongBasket); check(res.correct === false && res.concept === null && Object.keys(s2.placed).length === 0, `${L}: a wrong drop was accepted / leaked a concept`); }
});

/* #4 category-generalization across the pool */
check(Core.categoryGeneralizes(rounds) === true, 'a multi-round category holds <2 distinct nouns (instance-memorizable)');

/* #6 4 cogs, ≥7 rounds, distinct ids, the confound/diverse/odd present */
const cogsSeen = new Set(rounds.map((r) => r.cog));
COGS.forEach((c) => check(cogsSeen.has(c), `missing cog "${c}"`));
check(cogsSeen.size === 4, `expected 4 cogs, got ${cogsSeen.size} (${[...cogsSeen].join(',')})`);
check(rounds.length >= 7, `only ${rounds.length} rounds (<7)`);
check(new Set(rounds.map((r) => r.id)).size === rounds.length, 'duplicate round ids');
check(rounds.some((r) => r.cog === 'confound'), 'no confound round');
check(rounds.some((r) => r.cog === 'diverse'), 'no diverse round');
check(rounds.some((r) => r.cog === 'odd'), 'no odd round');

if (failures.length) {
  console.error(`FAIL — ${failures.length} category-sort violation(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
const confN = rounds.filter((r) => r.cog === 'confound').length;
console.log(`PASS — ${rounds.length} rounds / ${cogsSeen.size} cogs (${confN} confound): ` +
  `CATEGORY-SORTER solves 100%; VISUAL-FEATURE-SORTER fails every round (within-diverse, no single feature sorts all, cross-confound on confound rounds); ` +
  `3+ baskets + non-leaking wrong-drop (returns the object, reveals nothing); category-generalization (multi-round categories hold ≥2 distinct nouns); ` +
  `NO counting; 4 cogs; every spill noun resolves to a real bank entry.`);
process.exit(0);
