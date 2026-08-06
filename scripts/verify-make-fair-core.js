#!/usr/bin/env node
/* =====================================================================
   verify-make-fair-core.js — build-time MEASURED gate for the determine-and-
   produce-the-unknown cognition behind "The Sharing Jar" (CCSS 1.OA.D.8), the
   social-fair family head. Loads the REAL mini tools/make-fair-core.js + the
   manifest rounds and proves (exit 0 = pass; 1 = any failure):

     #1 PRODUCE-THE-UNKNOWN PASSES 100% — produce unknownFor(schema,nums) → seals
        EVERY round (all 5 schemas + the 0-case + a within-20).
     #2 NO INCREMENT-AND-WATCH SURFACE — the core exposes NO fill/increment/
        addBead API; `incrementSurfaceExists===false` (the only input is
        produceNumeral → the perceptual cheat cannot be performed).
     #3 viaNumber LITERAL — commit with NO produced numeral → no seal.
     #4 OFF-BY-ONE FAILS — produce unknown±1 → never seals.
     #5 DISCRIMINATING GRADE — no fixed schema-blind formula spans the 5: an
        always-subtract stub FAILS ≥1 round (start-unknown is a sum) AND an
        always-add stub FAILS ≥1 (the differences); always-1 / always-copy fail too.
     #6 CEILING-TIER ANTI-READ — for ceiling rounds the bigger given's numeral is
        hidden (`biggerCountRenderedDuringDecide===false`).
     #7 0-CASE REQUIRED — ≥1 round unknown===0, sealed by producing 0.
     #8 ≥5 distinct schemas (the 5 present, BLOCKLIST), distinct ids, non-
        monotonic unknowns, unknowns 0-10, a within-20 round present.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'make-fair-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.MakeFairCore;
if (!Core) { console.error('FAIL: make-fair-core.js did not define window.MakeFairCore'); process.exit(1); }
const S = Core.SOLVERS;

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'sharing-jar-activities.json'), 'utf8'))[0];
const rounds = manifest.params.rounds;

const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };

/* #2 NO increment/fill API on the core */
['addBead', 'fill', 'increment', 'addToBasket', 'incrementBasket', 'give'].forEach((k) =>
  check(typeof Core[k] === 'undefined', `core exposes a "${k}" API — an increment-and-watch surface (the perceptual cheat could be performed)`));
check(!/function\s+(addBead|incrementBasket|fillTo)/.test(coreSrc), 'core has a fill/increment helper');

rounds.forEach((r) => {
  const L = `round[${r.id}/${r.schema}]`, u = Core.unknownFor(r.schema, r.nums);

  /* #1 genuine solver seals */
  check(S.produceUnknownSolver(r).sealed === true, `${L}: produce-the-unknown (${u}) did NOT seal`);

  /* #2 facts: no increment surface */
  const s0 = Core.newState(r), f0 = Core.facts(r, s0);
  check(f0.incrementSurfaceExists === false, `${L}: incrementSurfaceExists !== false`);

  /* #3 viaNumber literal */
  check(S.viaNumberLiteralSolver(r).sealed === false, `${L}: commit with no produced numeral sealed (viaNumber not load-bearing)`);

  /* #4 off-by-one fails */
  check(S.offByOneSolver(r).neverSeals === true, `${L}: unknown±1 sealed (the determined number is not load-bearing)`);

  /* #6 ceiling anti-read */
  if ((r.tier || 'floor') === 'ceiling') check(Core.biggerCountRenderedDuringDecide(r) === false, `${L}: ceiling tier renders the bigger given's numeral (no missing-addend work)`);

  /* #8 unknown range */
  check(u >= 0 && u <= 10, `${L}: unknown ${u} out of 0..10 (tile row)`);
});

/* #5 discriminating grade — no fixed schema-blind formula spans the 5 */
check(S.schemaBlindStub(rounds, 'sub').sealedEveryRound === false, 'an always-SUBTRACT stub sealed every round (start-unknown should break it)');
check(S.schemaBlindStub(rounds, 'add').sealedEveryRound === false, 'an always-ADD stub sealed every round (the difference schemas should break it)');
check(S.schemaBlindStub(rounds, 'one').sealedEveryRound === false, 'an always-1 stub sealed every round');
check(S.schemaBlindStub(rounds, 'first').sealedEveryRound === false, 'an always-copy-first stub sealed every round');

/* #7 0-case */
const zr = rounds.find((r) => Core.unknownFor(r.schema, r.nums) === 0);
check(!!zr, 'no 0-case round (unknown===0)');
if (zr) { const s = Core.newState(zr); Core.produceNumeral(s, 0); check(Core.commit(s) === 'sealed', 'the 0-case did not seal by producing 0'); }

/* #8 schemas + ids + non-monotonic + within-20 + unknownFor sanity */
const schemas = new Set(rounds.map((r) => r.schema));
['equalize-add', 'compare-diff', 'restore', 'reduce-to-target', 'start-unknown'].forEach((sc) => check(schemas.has(sc), `missing schema "${sc}"`));
check(schemas.size >= 5, `only ${schemas.size} distinct schemas (<5)`);
check(new Set(rounds.map((r) => r.id)).size === rounds.length, 'duplicate round ids');
const us = rounds.map((r) => Core.unknownFor(r.schema, r.nums));
let asc = true; for (let i = 1; i < us.length; i++) if (us[i] <= us[i - 1]) asc = false;
check(!asc, `unknowns strictly ascending ${JSON.stringify(us)} (anti-ordering)`);
check(rounds.some((r) => Object.values(r.nums).some((v) => (v | 0) > 10)), 'no within-20 round (a given >10)');
check(Core.unknownFor('start-unknown', { k: 3, r: 4 }) === 7 && Core.unknownFor('restore', { s: 7, r: 4 }) === 3 && Core.unknownFor('reduce-to-target', { a: 6, T: 4 }) === 2, 'unknownFor sanity failed for a schema');

if (failures.length) {
  console.error(`FAIL — ${failures.length} make-fair violation(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${rounds.length} rounds / ${schemas.size} schemas: ` +
  `produce-the-unknown seals 100%; NO increment surface (incrementSurfaceExists===false, no fill API); viaNumber literal (no-produce → no seal); off-by-one fails; ` +
  `discriminating grade (no fixed sub/add/one/copy stub spans the 5 schemas); ceiling hides the bigger numeral; 0-case seals by producing 0; ` +
  `5 distinct schemas, non-monotonic unknowns 0-10, a within-20 present.`);
process.exit(0);
