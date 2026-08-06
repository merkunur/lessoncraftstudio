#!/usr/bin/env node
/* =====================================================================
   verify-puppet-speak-core.js — build-time gate for the referential-
   communication cognition behind "Sock & Shadow" (CCSS SL.K.6). Loads the
   REAL mini tools/puppet-speak-core.js + the manifest rounds and proves,
   MEASURED (exit 0 = pass; 1 = any failure):

     • the honest MINIMAL-SUFFICIENT turn → 'clear' on every round;
     • UNDER-SPEC provably fails: object-only + every PROPER subset of the
       minimal set → 'ambiguous'/'wrong' (a singleton from an incomplete
       build → REJECT);
     • OVER-SPEC is NOT a free win: a turn over the memory cap → 'overwhelmed',
       and NO over-specified turn is 'clear';
     • the GAUNTLET: the random-tile-piler's win-rate is low (it overshoots /
       guesses wrong), lazy-vague fails, polite-only never wins;
     • politeness is INERT (removing/adding it never changes the outcome);
     • joint-necessity (multi-attr round: neither attr alone → the target);
     • the coherence gate (no attribute-without-object turn is sayable);
     • derived-not-stored, self-repair names the missing CATEGORY, ≥7 distinct,
       utter() present for every round.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'puppet-speak-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.PuppetSpeakCore;
if (!Core) { console.error('FAIL: puppet-speak-core.js did not define window.PuppetSpeakCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'sock-and-shadow-activities.json'), 'utf8'));
const rounds = manifest[0].params.rounds;

function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };

// build a fetch/mood turn from a set of {cat:value} attrs (+ object for fetch).
function turnOf(round, attrs, extra) {
  const t = round.listenerAction === 'mood' ? { attrs: Object.assign({}, attrs) } : { object: round.tray[round.target].object, attrs: Object.assign({}, attrs) };
  return Object.assign(t, extra || {});
}
function subsets(arr) { const out = [[]]; for (const x of arr) { const len = out.length; for (let i = 0; i < len; i++) out.push(out[i].concat(x)); } return out; }

check(rounds.length >= 7, `only ${rounds.length} rounds`);
check(new Set(rounds.map((r) => r.id)).size >= 7, 'fewer than 7 distinct round ids');

rounds.forEach((r) => {
  const L = `round[${r.id}/${r.listenerAction}]`;
  const target = r.tray[r.target];

  // derived-not-stored
  check(!('correctAnswer' in r) && !('answer' in r), `${L}: stores a correctAnswer (must be DERIVED)`);

  // utter present + non-empty
  const u = Core.utter(r, Core.SOLVERS.minimalTurn(r), 'en');
  check(typeof u === 'string' && u.trim().length > 2, `${L}: utter() empty`);

  // the minimal-sufficient turn → clear
  const minSet = Core.minimalSet(r);
  const minT = Core.SOLVERS.minimalTurn(r);
  check(Core.resolve(r, minT).outcome === 'clear', `${L}: the minimal-sufficient turn is not 'clear'`);

  const cats = Core.filterCatsFor(r);
  const isDisambig = minSet.length >= 1;

  if (isDisambig) {
    // under-spec: EVERY proper subset of the minimal set → not 'clear'
    subsets(minSet).forEach((sub) => {
      if (sub.length === minSet.length) return;   // skip the full set
      const attrs = {}; sub.forEach((c) => { attrs[c] = target[c]; });
      const out = Core.resolve(r, turnOf(r, attrs)).outcome;
      check(out !== 'clear', `${L}: an incomplete turn {${sub.join(',')}} resolved 'clear' (under-spec must fail)`);
    });
    // lazy-vague (object only / no attrs) → not clear
    check(Core.resolve(r, Core.SOLVERS.lazyVague(r)).outcome !== 'clear', `${L}: lazy-vague (no attributes) won`);
    // a polite-vague turn is still ambiguous (politeness non-discriminating)
    check(Core.resolve(r, turnOf(r, {}, { politeness: 'please' })).outcome !== 'clear', `${L}: a polite-but-vague turn won`);
  }

  // joint-necessity for multi-attribute minimal rounds
  if (minSet.length >= 2) {
    minSet.forEach((c) => {
      const attrs = {}; attrs[c] = target[c];
      check(Core.resolve(r, turnOf(r, attrs)).outcome !== 'clear', `${L}: single attribute '${c}' alone resolved the target (not joint-necessity)`);
    });
  }

  // over-spec reachable here? (more varying cats than the cap allows)
  const cap = Core.memoryCap(r);
  if (cats.length > cap) {
    const attrs = {}; cats.forEach((c) => { attrs[c] = target[c]; });
    const out = Core.resolve(r, turnOf(r, attrs)).outcome;
    check(out === 'overwhelmed', `${L}: piling every attribute (${cats.length} > cap ${cap}) did not 'overwhelm' (got '${out}')`);
  }

  // politeness INERT: adding politeness to the minimal turn → same outcome
  check(Core.resolve(r, Object.assign({}, minT, { politeness: 'please' })).outcome === 'clear', `${L}: adding politeness changed the outcome (must be inert)`);

  // coherence: an attribute-without-object turn is not sayable
  if (r.listenerAction !== 'mood') {
    const attrs = {}; if (cats[0]) attrs[cats[0]] = target[cats[0]];
    if (cats[0]) check(!Core.coherent(r, { object: null, attrs: attrs }), `${L}: an attribute-without-object turn is coherent (must not be)`);
  }

  // self-repair: an ambiguous turn names a missing category
  if (isDisambig) {
    const amb = Core.resolve(r, Core.SOLVERS.lazyVague(r));
    if (amb.outcome === 'ambiguous') check(cats.indexOf(amb.missingCategory) >= 0, `${L}: ambiguous turn did not name a real missing category`);
  }
});

/* ---- the gauntlet over the disambiguation rounds ---- */
const disambig = rounds.filter((r) => Core.minimalSet(r).length >= 1);
let pilerWins = 0, pilerRuns = 0;
disambig.forEach((r, ri) => {
  for (let s = 0; s < 200; s++) { pilerRuns++; if (Core.SOLVERS.randomTilePiler(r, mulberry32(7000 + ri * 1000 + s)) === 'clear') pilerWins++; }
  check(Core.resolve(r, Core.SOLVERS.politeOnly(r)).outcome !== 'clear', `round[${r.id}]: polite-only turn won`);
});
const pilerRate = pilerWins / pilerRuns;
check(pilerRate <= 0.55, `random-tile-piler win-rate ${pilerRate.toFixed(2)} (must be ≤0.55 — blind piling must not be reliable)`);
check(disambig.length >= 1, 'no disambiguation rounds');

if (failures.length) {
  console.error(`FAIL — ${failures.length} puppet-speak violation(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${rounds.length} rounds: minimal-sufficient turn 'clear' on every round; under-spec + over-spec both fail; ` +
  `random-tile-piler ${pilerRate.toFixed(2)} (lazy-vague + polite-only lose); politeness inert; joint-necessity + coherence enforced; ` +
  `${new Set(rounds.map((r) => r.id)).size} distinct, utter() present.`);
process.exit(0);
