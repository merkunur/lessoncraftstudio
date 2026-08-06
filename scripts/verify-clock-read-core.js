#!/usr/bin/env node
/* =====================================================================
   verify-clock-read-core.js — the MEASURED, critic-armed build-gate for
   "Owl's Cuckoo Cottage" (1.MD.B.3, read+set). Drives the REAL core
   (loaded via `new Function`) over the REAL manifest. HALTS the build on
   any failure. Models E10's verify-clock-core.js pattern + adds the two
   new adversarial solvers the critic demanded.

   THE SOLVER SET:
     • READ-AND-SET ORACLE → 100% (the true read/set heals every round;
       the coupled position holds: hourAngle === 30H + 0.5M);
     • COPY-READOUT solver → FAILS (no digital target exposed);
     • WRONG-COUPLING solver → FAILS (hour-on-number at half-past is a
       DIFFERENT angle than the coupled 30H+15 the oracle produces);
     • TOLD-TARGET solver (the headline — catches the decorative-sequence
       cheat 1a) → PASSES the SET rounds (honest — they name a target) but
       FAILS the READ / order / world-cue rounds (no named target → the
       child must read the FACE / decode the cue);
     • COTTAGE-ONLY solver (catches the proximity cheat 1b) → cannot
       converge (the cottage is FROZEN during the solve).

   Plus STRUCTURAL: >=7 distinct cognition-TYPES; read-rounds have no named
   target; the day-arc advances regardless of correctness; coupled render
   at half-hours; Gr1 minutes in {0,30}; 5-min gated to the Gr2 band;
   exactly one matching event/clock per read/order round.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const CORE = path.join(MINI, 'clock-read-core.js');
const MANIFEST = path.join(MINI, 'clock-read-activities.json');

function loadCore() {
  const src = fs.readFileSync(CORE, 'utf8');
  const win = {};
  new Function('window', src)(win);
  if (!win.ClockReadCore) throw new Error('core did not attach window.ClockReadCore');
  return win.ClockReadCore;
}

const fails = [];
const F = (cond, msg) => { if (!cond) fails.push(msg); };
function pct(x) { return (100 * x).toFixed(1) + '%'; }

(function main() {
  const Core = loadCore();
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  const row = Array.isArray(manifest) ? manifest[0] : manifest;
  const rounds = (row && row.params && row.params.rounds) || [];

  F(rounds.length >= 7, `bank has ${rounds.length} rounds (need >=7)`);

  /* ---- (A) per-round structural facts ---- */
  rounds.forEach((r) => {
    const f = Core.facts(r);
    F(f.noDigitalTargetShown, `${r.id}: a digital target is exposed (none allowed)`);
    F(f.readoutMirrorsCurrentNotTarget, `${r.id}: the readout does not mirror the child's current hands`);
    F(f.cottageFrozenDuringSolve, `${r.id}: the cottage is not frozen during the solve (proximity cheat)`);
    F(f.dayArcAdvancesRegardlessOfCorrectness, `${r.id}: the day-arc is gated on correctness (must be a non-streak per-commit advance)`);
    F(f.coupledHourHand, `${r.id}: the hour hand is NOT coupled at half-past (must sit between numbers)`);
    F(f.gr1MinuteInScope, `${r.id}: minute out of Gr1 scope {0,30} (non five-min)`);
    F(f.fiveMinGatedToGr2, `${r.id}: a five-min round is not gated to the Gr2 band (band>=3)`);
    F(f.readEventHasOneMatch, `${r.id}: read round does not have exactly one matching event`);
    F(f.orderHasOneMatch, `${r.id}: order round does not have exactly one matching clock`);
    if (r.mode === 'read' || r.mode === 'order' || r.mode === 'world-cue') {
      F(f.readRoundHasNoNamedTarget, `${r.id}: a read/order/world-cue round names a target time (must read the face / decode the cue)`);
    }
  });

  /* ---- (B) >=7 distinct cogs ---- */
  const cogs = new Set(rounds.map((r) => r.cog));
  F(cogs.size >= 7, `only ${cogs.size} distinct cogs (need >=7)`);
  Core.COGS.forEach((c) => F(cogs.has(c), `cog "${c}" missing`));

  /* ---- (C) the coupled render (WRONG-COUPLING fails) ---- */
  rounds.forEach((r) => {
    if (!r.targetTime) return;   /* order rounds: coupling checked over their clocks in facts() */
    const a = Core.handAngles(r.targetTime.hour, r.targetTime.minute);
    const expected = (30 * r.targetTime.hour + 0.5 * r.targetTime.minute) % 360;
    F(Math.abs(a.hour - ((expected % 360 + 360) % 360)) < 1e-9, `${r.id}: hand-angle not coupled (got ${a.hour}, expected ${expected})`);
    if (r.targetTime.minute === 30) {
      const onNumber = (30 * r.targetTime.hour) % 360;
      F(Math.abs(a.hour - onNumber) > 10, `${r.id}: the half-past hour hand is ON the number (wrong-coupling would pass)`);
    }
  });

  /* ---- (D) THE SOLVER SET ---- */
  const N = rounds.length || 1;
  let oracle = 0, copyReadout = 0;
  let toldTargetOnSet = 0, setRounds = 0, toldTargetOnRead = 0, readishRounds = 0;
  rounds.forEach((r) => {
    const aud = Core.audit(r);
    /* ORACLE — the true read/set */
    let ok = false;
    if (r.mode === 'read') ok = Core.isCorrectRead(r, aud.correctEventId);
    else if (r.mode === 'order') ok = Core.isCorrectOrder(r, aud.correctClockIndex);
    else ok = Core.isCorrectSet(r, r.targetTime.hour, r.targetTime.minute);   /* set / world-cue */
    if (ok) oracle++;
    /* COPY-READOUT — a digital target to copy? must be null everywhere */
    if (aud.shownDigitalTarget != null) copyReadout++;
    /* TOLD-TARGET — solvable iff the round NAMES the time (setWord present = pure 'set') */
    if (r.mode === 'set') { setRounds++; if (aud.setWord != null) toldTargetOnSet++; }
    else { readishRounds++; if (aud.setWord != null) toldTargetOnRead++; }
  });
  F(oracle === N, `read-and-set oracle ${oracle}/${N} (must be 100%)`);
  F(copyReadout === 0, `COPY-READOUT could copy a digital target on ${copyReadout} round(s) (must be 0 — no target shown)`);
  /* told-target PASSES every set round, FAILS every read/order/world-cue round */
  F(setRounds > 0 && toldTargetOnSet === setRounds, `TOLD-TARGET should solve every SET round (${toldTargetOnSet}/${setRounds})`);
  F(readishRounds > 0 && toldTargetOnRead === 0, `TOLD-TARGET solved ${toldTargetOnRead}/${readishRounds} read/order/world-cue round(s) — they must NOT name a target (decorative-sequence cheat)`);

  /* ---- (E) COTTAGE-ONLY can't converge (frozen) — structural ---- */
  F(rounds.every((r) => Core.facts(r).cottageFrozenDuringSolve === true), 'a round does not freeze the cottage during the solve (cottage-only proximity cheat survives)');

  /* ---- report ---- */
  console.log(`bank: ${rounds.length} rounds, cogs: ${[...cogs].sort().join('/')}`);
  console.log(`set rounds: ${setRounds} (told-target passes ${toldTargetOnSet}); read/order/world-cue: ${readishRounds} (told-target passes ${toldTargetOnRead} — must be 0)`);
  console.log('solvers:');
  console.log(`  ${oracle === N ? 'ok  ' : 'FAIL'} read-and-set oracle: ${oracle}/${N}`);
  console.log(`  ${copyReadout === 0 ? 'ok  ' : 'FAIL'} copy-readout: ${copyReadout} solvable (must be 0)`);
  console.log(`  ${toldTargetOnRead === 0 ? 'ok  ' : 'FAIL'} told-target on read/order/world-cue: ${pct(toldTargetOnRead / Math.max(1, readishRounds))} (must be 0%)`);
  console.log(`  ok   cottage-only: cannot converge (frozen)`);
  console.log('');
  if (fails.length) {
    console.error(`VERIFY-CLOCK-READ-CORE FAILED — ${fails.length} issue(s):`);
    fails.forEach((m) => console.error('  • ' + m));
    process.exit(1);
  }
  console.log('VERIFY-CLOCK-READ-CORE PASSED — the read-and-set oracle heals 100% with the coupled 30H+0.5M render; no digital target to copy; the half-past hour hand sits between numbers (wrong-coupling fails); the TOLD-TARGET solver passes every SET round but FAILS every read/order/world-cue round (the decorative-sequence cheat caught); the cottage is frozen during the solve (the proximity cheat caught); >=7 distinct cogs, Gr1 minutes in {0,30}, 5-min gated to the Gr2 band, one match per read/order.');
  process.exit(0);
})();
