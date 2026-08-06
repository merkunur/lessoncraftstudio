#!/usr/bin/env node
/* =====================================================================
   verify-picture-moment-core.js — build-time MEASURED gate for the
   "which illustration depicts this moment" cognition behind "Otto's
   Picture Book" (CCSS RL.K.7). Loads the REAL mini tools/picture-moment-
   core.js + the manifest rounds and proves (exit 0 = pass; 1 = fail):

     #1 ORACLE solves 100% (the target beat's panel is always accepted);
     #2 RANDOM-GUESS scores ≈ chance (1/choices) — no free signal;
     #3 NO fixed-position bot ("always tap the Nth picture") beats chance —
        the target position is balanced across the deck, so position carries
        no advantage (the keystone: a non-reader can't win by position);
     #4 the foils are the SAME story's other real moments (every non-target
        choice is itself a beat of this round's story — not a foreign panel),
        so the choice is comprehension, not "spot the odd picture";
     #5 DERIVED / NO-COPY: childView carries only {prompt, choices:[{panel}]}
        — never the answer, correctIndex, or the choices' captions; the round
        carries no baked answer/solution;
     #6 VARIETY: ≥7 distinct rounds; every round has ≥3 choices + a unique
        target that is one of the choices.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'picture-moment-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.PictureMomentCore;
if (!Core) { console.error('FAIL: picture-moment-core.js did not define window.PictureMomentCore'); process.exit(1); }

const rounds = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'otto-picture-book-activities.json'), 'utf8'))[0].params.rounds;

const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
const hashSeed = (a, b) => ((a * 73856093) ^ (b * 19349663) ^ 0x9e3779b9) >>> 0;

/* #1 oracle 100% */
let oracleHits = 0;
rounds.forEach((r) => { if (Core.grade(r, Core.SOLVERS.oracleSolver(r))) oracleHits++; });
check(oracleHits === rounds.length, `oracle solved only ${oracleHits}/${rounds.length} (the target panel must always be accepted)`);

/* #2 random-guess ≈ chance */
const TRIALS = 600;
let rndHits = 0, rndN = 0;
rounds.forEach((r, ri) => { for (let t = 0; t < TRIALS; t++) { const rng = Core.mulberry32(hashSeed(ri, t + 1)); if (Core.grade(r, Core.SOLVERS.randomGuess(r, rng))) rndHits++; rndN++; } });
const rndAcc = rndHits / rndN;
const choiceCounts = rounds.map((r) => Core.choicePanels(r).length);
const maxChoices = Math.max.apply(null, choiceCounts), minChoices = Math.min.apply(null, choiceCounts);
const chanceHi = 1 / minChoices;            // most generous chance
check(rndAcc <= chanceHi + 0.06, `random-guess acc ${rndAcc.toFixed(3)} > chance ${chanceHi.toFixed(3)}+margin (a free signal leaks)`);
check(rndAcc >= 1 / maxChoices - 0.06, `random-guess acc ${rndAcc.toFixed(3)} implausibly low (<1/${maxChoices}) — power guard`);

/* #3 no fixed-position bot beats chance (position is balanced) */
for (let pos = 0; pos < maxChoices; pos++) {
  let hit = 0, n = 0;
  rounds.forEach((r) => { if (pos < Core.choicePanels(r).length) { if (Core.grade(r, Core.SOLVERS.fixedPosition(r, pos))) hit++; n++; } });
  const acc = n ? hit / n : 0;
  check(acc <= chanceHi + 0.13, `fixed-position bot "always tap picture #${pos + 1}" acc ${acc.toFixed(3)} > chance ${chanceHi.toFixed(3)} (position cue leaks — rebalance targets)`);
}

/* #4 foils are the SAME story's other real moments */
rounds.forEach((r) => {
  const L = `round[${r.id}]`;
  const beatPanels = Core.beats(r).map((b) => b.panel);
  Core.choicePanels(r).forEach((p) => check(beatPanels.indexOf(p) >= 0, `${L}: choice ${p} is not a beat of this story (foil must be a real moment)`));
  const correct = Core.correctPanel(r);
  const foils = Core.choicePanels(r).filter((p) => p !== correct);
  check(foils.length >= 2, `${L}: only ${foils.length} foil(s) (<2)`);
});

/* #5 DERIVED / NO-COPY */
const FORBIDDEN = ['target', 'answer', 'correct', 'correctIndex', 'caption', 'solution'];
function deepKeys(o, acc) { if (o && typeof o === 'object') { if (Array.isArray(o)) o.forEach((v) => deepKeys(v, acc)); else Object.keys(o).forEach((k) => { acc.push(k); deepKeys(o[k], acc); }); } return acc; }
rounds.forEach((r) => {
  const L = `round[${r.id}]`;
  const view = Core.childView(r);
  const keys = deepKeys(view, []);
  FORBIDDEN.forEach((f) => check(keys.indexOf(f) < 0, `${L}: childView leaks a "${f}" field`));
  check(typeof view.prompt === 'string' && view.prompt.length > 0, `${L}: childView.prompt missing`);
  (view.choices || []).forEach((c) => check(Object.keys(c).join(',') === 'panel', `${L}: a choice carries extra keys (${Object.keys(c).join(',')}) — only {panel} allowed`));
  check(!('answer' in r) && !('solution' in r), `${L}: round carries a baked answer/solution`);
});
check(!/round\.(answer|solution)\b/.test(coreSrc), 'core references round.answer / round.solution');

/* #6 variety */
check(rounds.length >= 7, `only ${rounds.length} rounds (<7)`);
check(new Set(rounds.map((r) => r.id)).size >= 7, 'fewer than 7 distinct round ids');
rounds.forEach((r) => {
  const L = `round[${r.id}]`;
  check(Core.choicePanels(r).length >= 3, `${L}: only ${Core.choicePanels(r).length} choices (<3)`);
  check(Core.choicePanels(r).indexOf(Core.correctPanel(r)) >= 0, `${L}: target panel is not among the choices`);
  check(!!Core.targetBeat(r), `${L}: target "${r.target}" is not a beat id`);
});

if (failures.length) {
  console.error(`FAIL — ${failures.length} picture-moment violation(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${rounds.length} stories: oracle 100%; random-guess ${rndAcc.toFixed(3)} ≈ chance ${chanceHi.toFixed(3)}; ` +
  `no fixed-position bot beats chance (targets balanced across positions); every foil is a real same-story moment; ` +
  `childView carries only {prompt, choices:[{panel}]} (no answer/caption leak); ≥7 distinct rounds.`);
process.exit(0);
