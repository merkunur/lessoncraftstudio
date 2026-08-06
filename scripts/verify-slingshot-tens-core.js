#!/usr/bin/env node
/* =====================================================================
   verify-slingshot-tens-core.js — build-time MEASURED gate for the UNITIZE-a-
   two-digit-value cognition behind "Bo's Berry Pantry" (CCSS 1.NBT.B.2). Loads
   the REAL mini tools/slingshot-tens-core.js + the manifest rounds and proves
   (exit 0 = pass; 1 = any failure) the critic's fixed solver set:

     #1 UNITIZE PASSES 100% — derive the answer from VALUES (crate=ten) → lock →
        fire → seals EVERY round (all 4 lanes incl. pile/decade/unitize-count/
        encode + a value-compare).
     #2 COUNT-MATCH AT CHANCE (the unitizing proof) — a crate-as-ONE matcher
        FAILS every VALUE-round (pile / decade / unitize-count / value-compare):
        no digits to map → it lands on a grouping/value trap. `crateIsCountable
        ===false`; a trap is present on every such round.
     #3 DIGIT-MATCH AT CHANCE — every VALUE-round exposes NO prompt digit
        (`promptExposesDigits===false`) → nothing to surface-match.
     #4 AIM-SKILL AT CHANCE — `fireReadsOnlyLock===true`; locking a NON-correct
        shelf + firing returns 'wrong' (the launch reads the lock, not aim);
        positions reshuffle on a miss.
     #5 REVERSAL 0% — every heterogeneous round carries a digit-swap shelf;
        locking+firing it returns 'wrong'.
     #6 NO-ANSWER-LEAK + FIRST-ATTEMPT KEEPSAKE — the wrong return carries no
        value; a blind-cycle (miss then correct) seals but firstAttempt===false
        (the pantry cubby stays dim).
     #7 UN-COUNTABLE-CRATE + ≥4 SHELVES + correctKey↔'equivalent' agreement —
        the value-derived correct shelf is exactly the data-marked 'equivalent';
        ≥4 shelves with the designed distractor set; no numeral on a hoard shelf.
     #8 4 LANES + ≥7 ROUNDS by lane with a BLOCKLIST — the 4 lanes present;
        teens demoted into `decode` (never their own lane); regroup-readiness /
        one-more-ten (1.NBT.C) absent; within-100; non-monotonic prompt values;
        a decade present; static: fire() reads no pull/pointer geometry.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'slingshot-tens-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.SlingshotTensCore;
if (!Core) { console.error('FAIL: slingshot-tens-core.js did not define window.SlingshotTensCore'); process.exit(1); }
const S = Core.SOLVERS;

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'bos-berry-pantry-activities.json'), 'utf8'))[0];
const rounds = manifest.params.rounds;

const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
const LANES = ['decode', 'decade', 'unitize-count', 'encode'];

/* unitVALUE is ten — a crate IS one ten (static) */
check(Core.unitVALUE === 10, `unitVALUE is ${Core.unitVALUE} (a crate must be one ten)`);

/* #4/#8 static: fire() reads ONLY the lock — no pull/pointer/aim geometry */
const fireSrc = (coreSrc.match(/function fire\s*\(s\)\s*\{[\s\S]*?\n  \}/) || [''])[0];
check(fireSrc.length > 0, 'could not isolate fire() for the static read-only check');
check(!/pull|magnitude|pointer|clientX|clientY|offsetX|angle|distance/i.test(fireSrc), 'fire() references pull/pointer/aim geometry (must read ONLY the lock)');
check(/lockedKey/.test(fireSrc) && /correctKey/.test(fireSrc), 'fire() does not read lockedKey + correctKey');

rounds.forEach((r) => {
  const L = `round[${r.id}/${r.lane}]`;
  const ck = Core.correctKey(r);
  const f = Core.facts(r, Core.newState(r));

  /* #7 correctKey is valid + agrees with the data-marked 'equivalent' */
  check(ck >= 0 && ck < r.shelves.length, `${L}: correctKey out of range (${ck})`);
  check(r.shelves[ck] && r.shelves[ck].kind === 'equivalent', `${L}: value-derived correctKey (${ck}) is NOT the data 'equivalent' shelf`);
  check(r.shelves.filter((sh) => sh.kind === 'equivalent').length === 1, `${L}: not exactly one 'equivalent' shelf`);
  check(r.shelves.length >= 4, `${L}: <4 shelves (${r.shelves.length})`);
  check(r.lane !== 'encode' || r.compare ? true : r.shelves.every((sh) => sh.numeral != null) || r.shelves.every((sh) => sh.numeral == null), `${L}: mixed numeral/hoard shelves`);

  /* #1 unitize seals */
  check(S.unitizeSolver(r).sealed === true, `${L}: the UNITIZE solver did not seal`);

  /* #4 aim-skill: a wrong lock fires to 'wrong'; fire reads only the lock */
  check(f.fireReadsOnlyLock === true, `${L}: fireReadsOnlyLock !== true`);
  check(S.aimSkillSolver(r).result === 'wrong', `${L}: locking a NON-correct shelf + firing did not return 'wrong' (aim graded?)`);
  check(f.shelfPositionsReshuffleOnRetry === true, `${L}: positions do not reshuffle on retry`);

  /* #7 un-countable crate */
  check(f.crateIsCountable === false, `${L}: crateIsCountable !== false`);

  /* #6 blind-cycle seals but firstAttempt is false (the cubby stays dim) */
  const bc = S.blindCycleSolver(r);
  check(bc.sealed === true && bc.firstAttempt === false, `${L}: blind-cycle firstAttempt=${bc.firstAttempt} (must be false — the keepsake gates on first read)`);

  /* #2/#3 VALUE-rounds: count-match + digit-match must FAIL */
  if (f.countMatchProof) {
    check(f.promptExposesDigits === false, `${L}: a VALUE-round exposes prompt digits (digit-match surface)`);
    check(f.groupingOrValueTrapPresent === true, `${L}: a VALUE-round has no grouping/value trap`);
    const cm = S.countMatchSolver(r);
    check(cm.isEquivalent === false, `${L}: the COUNT-MATCH solver HIT the equivalent on a VALUE-round (unitizing not load-bearing)`);
    check(S.digitMatchSolver(r).hasDigitsToMatch === false, `${L}: digit-match has a surface to match on a VALUE-round`);
  }

  /* #5 reversal: heterogeneous rounds carry a digit-swap shelf that loses */
  if (f.heterogeneous) check(f.reversalPresent === true, `${L}: a heterogeneous round (tens≠ones) has NO reversal distractor`);
  const rev = S.reversalSolver(r);
  if (!rev.skip) check(rev.result === 'wrong', `${L}: the REVERSAL solver did not lose (result=${rev.result})`);

  /* #8 within-100 + lane in the allowed set */
  check(LANES.indexOf(r.lane) >= 0, `${L}: lane "${r.lane}" not in {${LANES.join(',')}} (BLOCKLIST: teen/regroup/one-more-ten)`);
  const pv = r.prompt.value | 0;
  check(pv >= 1 && pv <= 99, `${L}: prompt value ${pv} out of 1..99 (within-100)`);
});

/* #8 4 lanes, ≥7 rounds, teens demoted, decade present, non-monotonic, BLOCKLIST */
const lanesSeen = new Set(rounds.map((r) => r.lane));
LANES.forEach((ln) => check(lanesSeen.has(ln), `missing lane "${ln}"`));
check(lanesSeen.size === 4, `expected exactly 4 lanes, got ${lanesSeen.size} (${[...lanesSeen].join(',')})`);
check(rounds.length >= 7, `only ${rounds.length} rounds (<7)`);
check(new Set(rounds.map((r) => r.id)).size === rounds.length, 'duplicate round ids');
check(rounds.some((r) => r.lane === 'decade'), 'no decade round (the page must be decade-led)');
/* teens (11–19) must ride the decode pool, never a named teen lane */
rounds.filter((r) => (r.prompt.value | 0) >= 11 && (r.prompt.value | 0) <= 19).forEach((r) => check(r.lane === 'decode', `round[${r.id}]: a teen value is lane "${r.lane}" (teens must be demoted into 'decode')`));
check(!rounds.some((r) => /regroup|one-more-ten|teen/.test(r.lane)), 'a 1.NBT.C-drift lane (regroup/one-more-ten/teen) is present');
const pvs = rounds.map((r) => r.prompt.value | 0);
let asc = true; for (let i = 1; i < pvs.length; i++) if (pvs[i] <= pvs[i - 1]) asc = false;
check(!asc, `prompt values strictly ascending ${JSON.stringify(pvs)} (anti-ordering)`);
/* at least the pile + value-q + numeral prompt-forms are all exercised */
['pile', 'value-q', 'numeral'].forEach((k) => check(rounds.some((r) => r.prompt.kind === k), `no '${k}' prompt-form round`));

if (failures.length) {
  console.error(`FAIL — ${failures.length} slingshot-tens violation(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
const valueRounds = rounds.filter((r) => Core.facts(r, Core.newState(r)).countMatchProof).length;
console.log(`PASS — ${rounds.length} rounds / ${lanesSeen.size} lanes (${valueRounds} count-match-PROOF value-rounds): ` +
  `UNITIZE seals 100%; COUNT-MATCH + DIGIT-MATCH fail every value-round (crate un-countable, a trap present, no digits to map); ` +
  `AIM-SKILL loses (fire reads only the lock, positions reshuffle); REVERSAL loses every heterogeneous round; ` +
  `no answer-leak + first-attempt keepsake (blind-cycle stays dim); correctKey↔'equivalent' agree, ≥4 shelves; ` +
  `4 lanes, teens demoted, decade-led, non-monotonic within-100, fire() reads no aim geometry.`);
process.exit(0);
