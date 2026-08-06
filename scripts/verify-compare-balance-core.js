#!/usr/bin/env node
/* =====================================================================
   verify-compare-balance-core.js — build-time MEASURED gate for the
   compare-by-matching cognition behind "The Friendship Bridge" (CCSS
   K.CC.C.6). Loads the REAL mini tools/compare-balance-core.js + the manifest
   rounds and proves (exit 0 = pass; 1 = any failure):

     #1 MATCH/COUNT solver PASSES 100% — pairs/counts → the true relation /
        the true difference / builds to equal, completing EVERY round.
     #2 PERCEPTION solver FAILS on every MISLEADING identify round (judging by
        the longer/more-spread side is WRONG exactly when look ≠ count), and is
        right on honest rounds (perception==count when no illusion). The
        free-tile single-perceptual-tap is the same → this activity is NOT
        completable by perceiving on the misleading subset.
     #3 DECLARED misleading === COMPUTED misleading (facts().misleading) for
        every round — the data is honest about which rounds carry the illusion.
     #4 ≥⅓ of the deck misleading + ≥1 CONSERVATION (equal count, spread
        illusion → SAME); reject all-congruent / easy-far-pair-in-congruent.
     #5 HONEST identify rounds are NEAR-PAIRS (|Δ|≤1) — hard by eye, easy by
        count; far pairs live ONLY in misleading layouts.
     #6 NO-ENGINE-COMPARISON — correctChoice returns ONLY 'left'/'right'/'same'
        (a relation WORD slot), never a number; judge returns a boolean; the
        core never emits a >/</= of the two cardinals.
     #7 COUNT-NOT-LENGTH — group sizes are integers 0..10.
     #8 ≥7 distinct act-types (the misleading LAYOUTS are the internal variety
        of match-judge, NOT separate acts) + distinct ids + structural shapes.
     #9 ACTIVITY static guards — relation-words-only (no </>/= in child copy),
        NO pre-commit emphasis (no glow/pulse; the beam tilt is gated on
        `solved` — locked flat through match+judge).
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'compare-balance-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.CompareBalanceCore;
if (!Core) { console.error('FAIL: compare-balance-core.js did not define window.CompareBalanceCore'); process.exit(1); }
const S = Core.SOLVERS;

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'friendship-bridge-activities.json'), 'utf8'))[0];
const rounds = manifest.params.rounds;
const activitySrc = fs.readFileSync(path.join(REPO, 'mini tools', 'friendship-bridge-activity.js'), 'utf8');

const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };

const isIdentify = (r) => !r.ask || r.ask === 'identify';

rounds.forEach((r) => {
  const L = `round[${r.id}/${r.actType}]`;

  /* #1 match/count solver completes EVERY round */
  check(S.matchSolver(r).complete === true, `${L}: the genuine match/count solver did NOT complete`);

  /* #7 count-not-length: integer counts 0..10 */
  [r.left, r.right].forEach((g, i) => check(Number.isInteger(g.count) && g.count >= 0 && g.count <= 10, `${L}: ${i ? 'right' : 'left'} count ${g.count} not an integer in 0..10`));

  /* #3 declared === computed misleading */
  const s = Core.newState(r), f = Core.facts(s);
  check(f.misleading === !!r.misleading, `${L}: declared misleading=${!!r.misleading} but computed=${f.misleading} (perceptualSide=${f.perceptualSide}, matchSide=${f.matchSide})`);

  /* #2 perception vs match on identify rounds */
  if (isIdentify(r)) {
    const p = S.perceptualSolver(r);
    check(!p.skip, `${L}: perceptualSolver skipped an identify round`);
    if (r.misleading) check(p.correct === false, `${L}: PERCEPTION was correct on a misleading round (the illusion did not bust the eye-cheat)`);
    else check(p.correct === true, `${L}: perception was WRONG on an honest round (the layout is accidentally misleading — declare it)`);
    check(S.freeTapSolver(r).correct === p.correct, `${L}: free-tile tap diverged from perception (alias broken)`);
  }

  /* #6 no-engine-comparison: correctChoice is a relation WORD slot, judge is boolean */
  const cc = Core.correctChoice(s);
  check(cc === 'left' || cc === 'right' || cc === 'same', `${L}: correctChoice returned "${cc}" — not a relation word slot`);
  check(typeof Core.judge(Core.newState(r), 'left') === 'boolean', `${L}: judge() did not return a boolean`);

  /* #5 honest identify rounds are near-pairs (|Δ|≤1) */
  if (isIdentify(r) && !r.misleading) check(Math.abs(r.left.count - r.right.count) <= 1, `${L}: an HONEST identify round is a far pair (|Δ|=${Math.abs(r.left.count - r.right.count)}) — easy by eye, no learning`);
});

/* #4 misleading coverage + conservation */
const mislead = rounds.filter((r) => r.misleading).length;
check(mislead >= Math.ceil(rounds.length / 3), `only ${mislead}/${rounds.length} misleading rounds (need ≥⅓ = ${Math.ceil(rounds.length / 3)})`);
const cons = rounds.find((r) => r.actType === 'conservation');
check(!!cons, 'no conservation round');
if (cons) {
  const cs = Core.newState(cons);
  check(Core.relation(cs) === 'same' && cons.misleading, 'the conservation round is not an equal-count, misleading (spread-illusion) SAME');
}

/* #8 ≥7 distinct act-types + ids + structural shapes */
const acts = new Set(rounds.map((r) => r.actType));
check(acts.size >= 7, `only ${acts.size} distinct act-types (<7): ${[...acts].join(',')}`);
check(new Set(rounds.map((r) => r.id)).size === rounds.length, 'duplicate round ids');
const hmm = rounds.find((r) => r.ask === 'how-many-more');
check(hmm && Math.abs(hmm.left.count - hmm.right.count) >= 1, 'how-many-more round has no positive difference to count');
const me = rounds.find((r) => r.ask === 'make-equal');
check(me && me.left.count !== me.right.count && me.left.count > 0, 'make-equal round must start UNEQUAL with a non-empty smaller side');
const be = rounds.find((r) => r.ask === 'build-equal');
check(be && be.left.count === 0 && be.right.count > 0, 'build-equal round must start with one side EMPTY (built from scratch)');
check(rounds.some((r) => r.actType === 'predict-verify' && r.predict), 'predict-verify round lacks predict:true');

/* #9 activity static guards */
const sm = activitySrc.match(/\/\*\s*RELATION-WORDS-ONLY:strings\s*\*\/([\s\S]*?)\/\*\s*:strings\s*\*\//);
check(!!sm, 'activity: the strings block is not delimited by /* RELATION-WORDS-ONLY:strings */ … /* :strings */ sentinels');
if (sm) check(!/[<>]/.test(sm[1].replace(/=>/g, '')), 'activity: a child-facing string uses a </> inequality symbol (relation WORDS only — MORE/FEWER/SAME)');
check(!/glow|pulse/i.test(activitySrc), 'activity: a glow/pulse token is present (NO pre-commit emphasis on leftovers — the eye-cheat in a new costume)');
check(/data-tip/.test(activitySrc) && /solved\s*\?\s*[^:]*:\s*['"]['"]/.test(activitySrc), "activity: the beam tilt (data-tip) is not gated on `this.solved ? … : ''` (the beam must stay locked flat through match+judge)");

if (failures.length) {
  console.error(`FAIL — ${failures.length} compare-balance violation(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${rounds.length} rounds / ${acts.size} act-types: ` +
  `match/count solver completes 100%; PERCEPTION fails on every misleading round (right only when look==count) — the free-tile tap can't pass the misleading subset; ` +
  `declared==computed misleading; ${mislead}/${rounds.length} misleading incl. a conservation SAME; honest identify rounds are near-pairs; ` +
  `correctChoice is a relation WORD (no >/</= of cardinals), judge boolean; integer counts 0..10; ≥7 distinct acts; relation-words-only + NO pre-commit emphasis (beam locked flat until solved).`);
process.exit(0);
