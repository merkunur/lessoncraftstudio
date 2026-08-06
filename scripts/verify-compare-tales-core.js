#!/usr/bin/env node
/* =====================================================================
   verify-compare-tales-core.js — build-time MEASURED gate for the
   "compare two characters' adventures" cognition behind "Willow's Story
   Corner" (CCSS RL.K.9). Loads the REAL mini tools/compare-tales-core.js +
   the manifest (stories+rounds), resolves each round, and proves
   (exit 0 = pass; 1 = fail):

     #1 ORACLE solves 100% (the derived answer is always accepted);
     #2 RANDOM-GUESS ≈ chance (1/4) — no free signal;
     #3 NO fixed-pick bot ("always A" / "always Both" / …) beats chance —
        the answers are spread across a/b/both/neither (a non-comparer can't
        win by always tapping one option);
     #4 the answer is DERIVED from the fact-keys (flipping a story's fact
        flips the answer) — not stored;
     #5 NO-COPY: childView carries the two tales + option labels but NEVER
        the facts or the answer key;
     #6 all FOUR answer types occur across the deck (a, b, both, neither are
        each load-bearing) + ≥7 distinct rounds.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'compare-tales-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.CompareTalesCore;
if (!Core) { console.error('FAIL: compare-tales-core.js did not define window.CompareTalesCore'); process.exit(1); }

const params = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'willow-story-corner-activities.json'), 'utf8'))[0].params;
const stories = params.stories;
const clone = (o) => JSON.parse(JSON.stringify(o));
const rounds = params.rounds.map((r) => ({ id: r.id, dim: r.dim, prompt: r.prompt, a: clone(stories[r.aId]), b: clone(stories[r.bId]) }));

const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
const hashSeed = (a, b) => ((a * 73856093) ^ (b * 19349663) ^ 0x9e3779b9) >>> 0;

/* #1 oracle 100% */
let oracleHits = 0;
rounds.forEach((r) => { if (Core.grade(r, Core.SOLVERS.oracleSolver(r))) oracleHits++; });
check(oracleHits === rounds.length, `oracle solved only ${oracleHits}/${rounds.length}`);

/* #2 random ≈ chance (1/4) */
const TRIALS = 800;
let rnd = 0, rndN = 0;
rounds.forEach((r, ri) => { for (let t = 0; t < TRIALS; t++) { const rng = Core.mulberry32(hashSeed(ri, t + 1)); if (Core.grade(r, Core.SOLVERS.randomGuess(r, rng))) rnd++; rndN++; } });
const rndAcc = rnd / rndN;
check(rndAcc <= 0.25 + 0.06, `random-guess acc ${rndAcc.toFixed(3)} > chance 0.25 + margin (a free signal leaks)`);
check(rndAcc >= 0.25 - 0.06, `random-guess acc ${rndAcc.toFixed(3)} implausibly low — power guard`);

/* #3 no fixed-pick bot beats chance */
Core.OPTIONS.forEach((key) => {
  let hit = 0; rounds.forEach((r) => { if (Core.grade(r, Core.SOLVERS.fixedPick(r, key))) hit++; });
  const acc = hit / rounds.length;
  check(acc <= 0.25 + 0.15, `fixed-pick bot "always ${key}" acc ${acc.toFixed(3)} > chance + margin (rebalance answers)`);
});

/* #4 DERIVED — flipping a fact flips the answer */
rounds.forEach((r) => {
  const base = Core.answerKey(r);
  const flipped = clone(r); flipped.a.facts = clone(flipped.a.facts || {}); flipped.a.facts[r.dim] = !Core.has(r.a, r.dim);
  check(Core.answerKey(flipped) !== base || Core.has(r.b, r.dim), `round[${r.id}]: flipping A's "${r.dim}" did not change the derived answer (answer may be stored, not derived)`);
});
check(!/round\.(answer|correctKey|solution)\b/.test(coreSrc), 'core references a stored round.answer / correctKey / solution');

/* #5 NO-COPY: childView has no facts / answer */
const FORBIDDEN = ['facts', 'answer', 'answerKey', 'correct', 'correctKey', 'dim', 'solution'];
function deepKeys(o, acc) { if (o && typeof o === 'object') { if (Array.isArray(o)) o.forEach((v) => deepKeys(v, acc)); else Object.keys(o).forEach((k) => { acc.push(k); deepKeys(o[k], acc); }); } return acc; }
rounds.forEach((r) => {
  const view = Core.childView(r);
  const keys = deepKeys(view, []);
  FORBIDDEN.forEach((f) => check(keys.indexOf(f) < 0, `round[${r.id}]: childView leaks a "${f}" field`));
  check(typeof view.prompt === 'string' && view.prompt.length > 0, `round[${r.id}]: childView.prompt missing`);
  check((view.options || []).length === 4, `round[${r.id}]: expected 4 options, got ${(view.options || []).length}`);
});

/* #6 all four answer types + variety */
const answers = rounds.map((r) => Core.answerKey(r));
['a', 'b', 'both', 'neither'].forEach((k) => check(answers.indexOf(k) >= 0, `no round resolves to "${k}" (that option is not load-bearing)`));
check(rounds.length >= 7, `only ${rounds.length} rounds (<7)`);
check(new Set(params.rounds.map((r) => r.id)).size >= 7, 'fewer than 7 distinct round ids');

if (failures.length) {
  console.error(`FAIL — ${failures.length} compare-tales violation(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
const dist = answers.reduce((m, k) => (m[k] = (m[k] || 0) + 1, m), {});
console.log(`PASS — ${rounds.length} rounds: oracle 100%; random ${rndAcc.toFixed(3)} ≈ 0.25; no fixed-pick bot beats chance; ` +
  `answer DERIVED from fact-keys (flip-test); childView carries no facts/answer; all 4 answer types present ${JSON.stringify(dist)}.`);
process.exit(0);
