#!/usr/bin/env node
/* =====================================================================
   verify-retell-core.js — build-time MEASURED gate for the story-retell
   cognition behind "Wake Up, Pip!" (CCSS RL.K.2). Loads the REAL
   mini tools/retell-story-core.js + the manifest rounds and proves
   (exit 0 = pass; 1 = any failure):

     #1 SURFACE-CUE solvers (panel-position / caption-length / recency) score
        ≤ the DAG-blind random baseline (surface features don't crack it);
     #2 the FEEDBACK-HILL-CLIMBER gains NOTHING from seeing breakKind — a
        seen-arm and a hidden-arm sharing the identical random stream solve at
        the same rate + same calls-to-solve (breakKind names the CATEGORY,
        never the slot → no localizing gradient). THE keystone anti-leak proof;
     #3 the causal gate is REAL (canonical placement ok; resolution-before-
        problem → not ok / EFFECT_BEFORE_CAUSE);
     #4 TWO-SOURCE key-ness (problem-root + resolution-terminal both
        narrative_key, ≥2 per round; multi-free FDF rounds have ≥2 keySlots);
     #5 a TRUE-BUT-TRIVIAL detail in a key slot → FACE_DOESNT_FIT;
     #6 a FOREIGN (other-story) panel never satisfies;
     #7 NO-COPY: childView carries only {panel,caption}+structure, never
        order/key/requires; the tray scramble ≠ the solution order;
     #8 ≥7 distinct rounds across ≥3 types.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'retell-story-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.RetellStoryCore;
if (!Core) { console.error('FAIL: retell-story-core.js did not define window.RetellStoryCore'); process.exit(1); }
const BK = Core.BREAK_KINDS;

const rounds = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'wake-up-pip-activities.json'), 'utf8'))[0].params.rounds;

const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
const accepts = (round, placed) => Core.validateRetell(round, placed).ok;
const hashSeed = (a, b) => ((a * 73856093) ^ (b * 19349663) ^ 0x9e3779b9) >>> 0;

/* ---------------- #1 surface-cue ≤ baseline ---------------- */
const surfaceSolvers = ['pickByPanelPosition', 'pickByCaptionLength', 'pickByRecency'];
const TRIALS = 400, K = 30;
let baselineHits = 0, baselineN = 0;
rounds.forEach((r, ri) => { for (let t = 0; t < TRIALS; t++) { const rng = Core.mulberry32(hashSeed(ri, t + 1)); if (accepts(r, Core.SOLVERS.dagBlindBaseline(r, rng))) baselineHits++; baselineN++; } });
const accBaseline = baselineHits / baselineN;
surfaceSolvers.forEach((s) => {
  let hit = 0; rounds.forEach((r) => { if (accepts(r, Core.SOLVERS[s](r))) hit++; });
  const accS = hit / rounds.length;
  check(accS <= accBaseline + 1e-9, `surface solver ${s} acc ${accS.toFixed(3)} > baseline ${accBaseline.toFixed(3)} (surface cue cracks it)`);
});

/* ---------------- #2 FEEDBACK-HILL-CLIMBER must gain nothing ---------------- */
let seenSolved = 0, hidSolved = 0, n2 = 0, seenCalls = 0, hidCalls = 0, seenCallsN = 0, hidCallsN = 0;
rounds.forEach((r, ri) => {
  for (let t = 0; t < TRIALS; t++) {
    const seed = hashSeed(ri, t + 101); // SAME seed for both arms → identical random stream; only the move-choice branch differs
    const seen = Core.SOLVERS.feedbackClimber(r, Core.mulberry32(seed), { seeBreakKind: true, K });
    const hid = Core.SOLVERS.feedbackClimber(r, Core.mulberry32(seed), { seeBreakKind: false, K });
    n2++;
    if (seen.solved) { seenSolved++; seenCalls += seen.calls; seenCallsN++; }
    if (hid.solved) { hidSolved++; hidCalls += hid.calls; hidCallsN++; }
  }
});
const rateSeen = seenSolved / n2, rateHidden = hidSolved / n2;
const callsSeen = seenCallsN ? seenCalls / seenCallsN : K, callsHidden = hidCallsN ? hidCalls / hidCallsN : K;
const MARGIN = 0.10;
check(rateSeen <= rateHidden * (1 + MARGIN), `breakKind RAISES solve-rate (leak): seen ${rateSeen.toFixed(3)} > hidden ${rateHidden.toFixed(3)}·${1 + MARGIN}`);
check(callsSeen >= callsHidden * (1 - MARGIN), `breakKind LOWERS calls-to-solve (leak): seen ${callsSeen.toFixed(2)} < hidden ${callsHidden.toFixed(2)}·${1 - MARGIN}`);
check(rateHidden > 0.02 && rateHidden < 0.98, `climber experiment not in a measurable regime (rateHidden ${rateHidden.toFixed(3)} ∉ (0.02,0.98)) — power guard`);

/* ---------------- #3 causal gate is REAL ---------------- */
rounds.forEach((r) => {
  const L = `round[${r.id}]`;
  const canon = Core.canonicalPlacement(r);
  check(accepts(r, canon), `${L}: the canonical placement is not accepted`);
  // resolution-before-problem: swap first & last slots of the canonical
  const broken = canon.slice(); const tmp = broken[0]; broken[0] = broken[broken.length - 1]; broken[broken.length - 1] = tmp;
  const res = Core.validateRetell(r, broken);
  check(!res.ok, `${L}: a resolution-before-problem order was accepted`);
  if (r.type === 'order') check(res.breakKind === BK.EFFECT_BEFORE_CAUSE, `${L}: swap-ends did not surface EFFECT_BEFORE_CAUSE (got ${res.breakKind})`);
});

/* ---------------- #4 two-source key-ness ---------------- */
rounds.forEach((r) => {
  const L = `round[${r.id}]`, bs = r.story.beats;
  const nk = bs.filter((b) => b.narrative_key);
  check(nk.length >= 2, `${L}: only ${nk.length} narrative_key beat(s) (<2)`);
  const roots = bs.filter((b) => !(b.requires || []).length);
  const terminals = bs.filter((b) => !bs.some((o) => (o.requires || []).indexOf(b.id) >= 0));
  check(roots.some((b) => b.narrative_key), `${L}: the problem (DAG root) is not narrative_key`);
  check(terminals.some((b) => b.narrative_key), `${L}: the resolution (DAG terminal) is not narrative_key`);
  const canon = Core.canonicalOrder(r);
  (r.keySlots || []).forEach((i) => { const b = canon[i]; check(Core.isHinge(r, b) || Core.isNarrativeKey(b), `${L}: keySlot ${i} beat is neither hinge nor narrative_key`); });
  // multi-free FDF rounds must range FDF over ≥2 keySlots (else FACE_DOESNT_FIT degenerates to a 1-slot pointer)
  if ((r.keySlots || []).length && Core.freeSlots(r).length >= 2) check(r.keySlots.length >= 2, `${L}: FDF-bearing multi-free round has only ${r.keySlots.length} keySlot (localizes)`);
});

/* ---------------- #5 true-but-trivial → FACE_DOESNT_FIT ---------------- */
rounds.filter((r) => r.type === 'supply-key').forEach((r) => {
  const L = `round[${r.id}]`, slot = r.keySlots[0];
  const canonBeat = Core.canonicalOrder(r)[slot];
  const tw = (r.trivialWhats && r.trivialWhats[canonBeat.id]) || [];
  check(tw.length >= 1, `${L}: no trivialWhat for the open key beat`);
  if (tw.length) {
    const trivial = tw[0];
    check(trivial.in_story === true, `${L}: trivialWhat ${trivial.id} is not in_story:true`);
    check(Core.panelToBeat(r, trivial.id) == null, `${L}: trivialWhat ${trivial.id} is actually a story beat`);
    const placed = Core.canonicalPlacement(r).slice(); placed[slot] = trivial.id;
    const res = Core.validateRetell(r, placed);
    check(!res.ok && res.breakKind === BK.FACE_DOESNT_FIT, `${L}: a true-but-trivial detail in the key slot was not FACE_DOESNT_FIT (got ${JSON.stringify(res)})`);
  }
});

/* ---------------- #6 foreign never satisfies ---------------- */
rounds.forEach((r) => {
  const L = `round[${r.id}]`;
  const foreigns = (r.foreignWhats || []).concat(r.foreignWhos || []).map((d) => d.id);
  foreigns.forEach((fp) => {
    const slots = (r.keySlots && r.keySlots.length) ? r.keySlots : [0];
    slots.forEach((i) => { const placed = Core.canonicalPlacement(r).slice(); placed[i] = fp; check(!accepts(r, placed), `${L}: foreign ${fp} in slot ${i} satisfied the retell`); });
  });
});

/* ---------------- #7 NO-COPY ---------------- */
const FORBIDDEN = ['order', 'requires', 'key', 'narrative_key', 'trivialWhats', 'foreignWhats', 'foreignWhos'];
function deepKeys(o, acc) { if (o && typeof o === 'object') { if (Array.isArray(o)) o.forEach((v) => deepKeys(v, acc)); else Object.keys(o).forEach((k) => { acc.push(k); deepKeys(o[k], acc); }); } return acc; }
rounds.forEach((r) => {
  const L = `round[${r.id}]`;
  const view = Core.childView(r);
  const keys = deepKeys(view, []);
  FORBIDDEN.forEach((f) => check(keys.indexOf(f) < 0, `${L}: childView leaks a "${f}" field`));
  check(!('answer' in r) && !('solution' in r), `${L}: round carries a baked answer/solution`);
  if (r.type === 'order') { const sol = Core.canonicalPlacement(r).join(','); check((r.tray || []).join(',') !== sol, `${L}: tray order EQUALS the solution order (not scrambled)`); }
});
check(!/round\.(solution|answer)\b/.test(coreSrc), 'core references round.solution / round.answer');
check(/childView/.test(coreSrc) && !/narration/.test(JSON.stringify(Core.childView(rounds[0]))), 'childView still carries a narration/answer surface');

/* ---------------- #8 variety ---------------- */
check(rounds.length >= 7, `only ${rounds.length} rounds (<7)`);
check(new Set(rounds.map((r) => r.type)).size >= 3, `only ${new Set(rounds.map((r) => r.type)).size} distinct types (<3)`);
check(new Set(rounds.map((r) => r.id)).size >= 7, 'fewer than 7 distinct round ids');

/* ---------------- report ---------------- */
if (failures.length) {
  console.error(`FAIL — ${failures.length} retell-core violation(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${rounds.length} stories / ${new Set(rounds.map((r) => r.type)).size} types: ` +
  `surface ≤ baseline ${accBaseline.toFixed(3)}; ` +
  `climber seen(rate ${rateSeen.toFixed(3)}, calls ${callsSeen.toFixed(1)}) ≈ hidden(rate ${rateHidden.toFixed(3)}, calls ${callsHidden.toFixed(1)}) → breakKind carries NO localizing signal; ` +
  `causal-gate real; two-source key-ness; trivial→FACE_DOESNT_FIT; foreign never satisfies; no-copy childView.`);
process.exit(0);
