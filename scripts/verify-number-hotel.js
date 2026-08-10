/* =====================================================================
   verify-number-hotel.js — TOOL #49's model, against its OWN oracle.
   Run:  node scripts/verify-number-hotel.js
         NUMBER_HOTEL_TOOL_DIR=<dir> node scripts/verify-number-hotel.js

   ⚠⚠ THIS GATE IMPLEMENTS ITS OWN GROUND TRUTH. Reading the expectation
   off the tool means it marks its own homework — on #48 the gate read
   NN_FLOOR from GEO and a mutation lowering that constant lowered the
   gate's own expectation with it. Here the arithmetic is re-derived
   from the STANDARD (a corridor holds ten rooms), never imported.

   ⚠ NON-VACUITY FIRST. Every law asserts its sample is non-empty before
   it asserts anything about the sample's contents.

   ⚠ THE STATE SPACE IS FINITE AND SMALL — 100 rooms x 5 moves — so this
   gate ENUMERATES IT ENTIRELY rather than sampling.
   ===================================================================== */
'use strict';
const path = require('path');
const DIR = process.env.NUMBER_HOTEL_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const T = require(path.join(DIR, 'number-hotel.js'));

let PASS = 0, FAIL = 0;
const fails = [];
function ok(c, m) { if (c) PASS++; else { FAIL++; if (fails.length < 40) fails.push(m); } }
function head(s) { console.log('\n— ' + s); }

/* ---------- the gate's own oracle, re-derived ---------------------- */
const PER = 10;                 /* a corridor holds ten rooms: the standard */
const CORRS = 10;
const TOP = PER * CORRS - 1;    /* 99 */
const at = (r) => ({ room: r, visited: [] });
const oCorr = (r) => Math.floor(r / PER);
const oDoor = (r) => r % PER;

/* ===================================================================
   L1 — THE CORRIDOR NUMBER IS THE TENS DIGIT. This is the tool's whole
   claim, and it is checked for all 100 rooms against arithmetic this
   file derives itself.
   =================================================================== */
head('L1 the corridor number IS the tens digit');
{
  let n = 0;
  for (let r = 0; r <= TOP; r++) {
    n++;
    ok(T.corridorOf(r) === oCorr(r), `L1 room ${r}: corridor ${T.corridorOf(r)} != tens digit ${oCorr(r)}`);
    ok(T.doorOf(r) === oDoor(r), `L1 room ${r}: door ${T.doorOf(r)} != ones digit ${oDoor(r)}`);
  }
  ok(n === 100, `L1 non-vacuity: only ${n} rooms checked`);
  console.log(`  all ${n} rooms: corridor === tens digit, door === ones digit`);
}

/* ===================================================================
   L2 — THE WALK NEVER LEAVES ITS CORRIDOR, and it is REFUSED at both
   ends. This is the wall, and it is the reason the tool exists.
   =================================================================== */
head('L2 the walk, and the wall');
{
  let walked = 0, refusedR = 0, refusedL = 0;
  for (let r = 0; r <= TOP; r++) {
    const R = T.walkRight(at(r)), L = T.walkLeft(at(r));
    if (oDoor(r) === PER - 1) {
      ok(R === null, `L2 room ${r} is the last door and the walk was NOT refused`);
      refusedR++;
    } else {
      ok(R !== null, `L2 room ${r} refused a legal walk`);
      if (R) {
        walked++;
        ok(R.st.room === r + 1, `L2 walk from ${r} landed on ${R.st.room}`);
        ok(oCorr(R.st.room) === oCorr(r), `L2 a walk left its corridor: ${r} -> ${R.st.room}`);
      }
    }
    if (oDoor(r) === 0) { ok(L === null, `L2 room ${r} is the first door and the back-walk was NOT refused`); refusedL++; }
    else {
      ok(L !== null, `L2 room ${r} refused a legal back-walk`);
      if (L) ok(oCorr(L.st.room) === oCorr(r), `L2 a back-walk left its corridor: ${r} -> ${L.st.room}`);
    }
  }
  ok(refusedR === 10, `L2 expected 10 right-hand walls, found ${refusedR}`);
  ok(refusedL === 10, `L2 expected 10 left-hand walls, found ${refusedL}`);
  ok(walked === 90, `L2 expected 90 legal walks, found ${walked}`);
  console.log(`  ${walked} legal walks, ${refusedR} + ${refusedL} walls — and no walk ever changed corridor`);
}

/* ===================================================================
   L3 — THE ELEVATOR NEVER MOVES THE DOOR POSITION. This is the ones
   digit holding still, and it is why the elevator cannot be the escape
   from the dead end.
   =================================================================== */
head('L3 the elevator holds the ones digit');
{
  let rode = 0, top = 0, bottom = 0;
  for (let r = 0; r <= TOP; r++) {
    const U = T.rideUp(at(r)), D = T.rideDown(at(r));
    if (oCorr(r) === CORRS - 1) { ok(U === null, `L3 room ${r} is on the top corridor and the ride up was NOT refused`); top++; }
    else {
      ok(U !== null, `L3 room ${r} refused a legal ride up`);
      if (U) {
        rode++;
        ok(U.st.room === r + PER, `L3 ride up from ${r} landed on ${U.st.room}`);
        ok(oDoor(U.st.room) === oDoor(r), `L3 THE ELEVATOR MOVED THE ONES DIGIT: ${r} -> ${U.st.room}`);
        ok(oCorr(U.st.room) === oCorr(r) + 1, `L3 the ride up skipped a corridor`);
      }
    }
    if (oCorr(r) === 0) { ok(D === null, `L3 room ${r} is on the bottom corridor and the ride down was NOT refused`); bottom++; }
    else if (D) ok(oDoor(D.st.room) === oDoor(r), `L3 the ride down moved the ones digit: ${r} -> ${D.st.room}`);
  }
  ok(top === 10 && bottom === 10, `L3 expected 10 top and 10 bottom refusals, found ${top}/${bottom}`);
  ok(rode === 90, `L3 expected 90 legal rides up, found ${rode}`);
  console.log(`  ${rode} rides, and not one moved the door position`);
}

/* ===================================================================
   L4 — THE STAIRS ARE THE CARRY: the ONLY move that changes both digits
   at once, and they exist at exactly two places on a corridor.
   =================================================================== */
head('L4 the stairs are the carry');
{
  let up = 0, down = 0, none = 0;
  for (let r = 0; r <= TOP; r++) {
    const S = T.stairs(at(r));
    const isEnd = oDoor(r) === PER - 1, isStart = oDoor(r) === 0;
    const legal = (isEnd && oCorr(r) < CORRS - 1) || (isStart && oCorr(r) > 0);
    if (!legal) { ok(S === null, `L4 room ${r} offered stairs where there are none`); none++; continue; }
    ok(S !== null, `L4 room ${r} refused legal stairs`);
    if (!S) continue;
    if (isEnd) {
      up++;
      ok(S.st.room === r + 1, `L4 stairs up from ${r} landed on ${S.st.room}`);
      ok(oCorr(S.st.room) === oCorr(r) + 1, `L4 stairs up did not change corridor`);
      ok(oDoor(S.st.room) === 0, `L4 stairs up did not land on the FIRST door`);
    } else {
      down++;
      ok(S.st.room === r - 1, `L4 stairs down from ${r} landed on ${S.st.room}`);
      ok(oDoor(S.st.room) === PER - 1, `L4 stairs down did not land on the LAST door`);
    }
    /* ⭐ BOTH DIGITS MOVE. That is what makes it the carry, and it is
       exactly what the elevator is forbidden to do. */
    ok(oCorr(S.st.room) !== oCorr(r) && oDoor(S.st.room) !== oDoor(r),
      `L4 the stairs did not change BOTH digits: ${r} -> ${S.st.room}`);
  }
  ok(up === 9, `L4 expected 9 upward staircases, found ${up}`);
  ok(down === 9, `L4 expected 9 downward staircases, found ${down}`);
  ok(none === 82, `L4 expected 82 rooms with no stairs, found ${none}`);
  console.log(`  ${up} up, ${down} down, ${none} rooms with none — and every one changed both digits`);
}

/* ===================================================================
   L5 — THE THREE MOVES ARE DISTINCT AT THE WALL. At room 49 the walk is
   refused, the elevator goes to 59, and the stairs go to 50. If any two
   of those ever agree, the tool has no thesis.
   =================================================================== */
head('L5 the three moves are distinct at every wall');
{
  let n = 0;
  for (let c = 0; c < CORRS - 1; c++) {
    const r = c * PER + (PER - 1);       /* 9, 19, 29 … 89 */
    n++;
    ok(T.walkRight(at(r)) === null, `L5 the walk was not refused at ${r}`);
    const U = T.rideUp(at(r)), S = T.stairs(at(r));
    ok(U && U.st.room === r + PER, `L5 the elevator did not go to ${r + PER}`);
    ok(S && S.st.room === r + 1, `L5 the stairs did not go to ${r + 1}`);
    ok(U && S && U.st.room !== S.st.room, `L5 the elevator and the stairs AGREE at ${r} — the tool has no thesis`);
  }
  ok(n === 9, `L5 non-vacuity: only ${n} walls tested`);
  console.log(`  ${n} walls: walk refused, elevator +10, stairs +1 — all three distinct`);
}

/* ===================================================================
   L6 — REVERSIBILITY, and a refusal leaves the state IDENTICAL.
   =================================================================== */
head('L6 reversibility, and the refusal changes nothing');
{
  let n = 0;
  for (let r = 0; r <= TOP; r++) {
    const R = T.walkRight(at(r));
    if (R) { const back = T.walkLeft(R.st); ok(back && back.st.room === r, `L6 walk round trip broke at ${r}`); n++; }
    const U = T.rideUp(at(r));
    if (U) { const d = T.rideDown(U.st); ok(d && d.st.room === r, `L6 elevator round trip broke at ${r}`); }
    const S = T.stairs(at(r));
    if (S) { const b = T.stairs(S.st); ok(b && b.st.room === r, `L6 stairs round trip broke at ${r}`); }
  }
  ok(n === 90, `L6 non-vacuity: only ${n} round trips`);

  /* ⚠ A REFUSAL RETURNS null AND MUTATES NOTHING — no bounce, no nudge,
     no clamp. `arrow-strip.js:427`: the pose is unchanged.
     ⭐ AND THE GUARANTEE IS STRUCTURAL, not defensive: `_st` returns a
     FRESH object on every call, so no mutator can reach the caller's
     state at all. Assert the guarantee itself, or a mutation that
     nudges inside a mutator is equivalent and cannot be killed. */
  for (const r of [0, 44, 99]) {
    const s0 = at(r);
    ok(T._st(s0) !== s0, `L6 _st ALIASED its input at ${r} — a refusal could then mutate the caller`);
    ok(T._st(s0).room === s0.room, `L6 _st changed the room at ${r}`);
  }
  for (const r of [0, 9, 90, 99, 10, 19]) {
    const s = at(r), before = s.room;
    T.walkRight(s); T.walkLeft(s); T.rideUp(s); T.rideDown(s); T.stairs(s);
    ok(s.room === before, `L6 a refused move MUTATED the state at ${r}`);
  }
  console.log(`  ${n} round trips, and no refusal touched the state`);
}

/* ===================================================================
   L7 — THE READABILITY RULE: a door's number is readable ONLY from its
   own corridor. This is the decision the tool is built around.
   =================================================================== */
head('L7 only the occupied corridor can be read');
{
  let readable = 0, dark = 0;
  for (let here = 0; here <= TOP; here += 7) {
    for (let r = 0; r <= TOP; r++) {
      const can = T.canRead(at(here), r);
      const should = oCorr(r) === oCorr(here);
      ok(can === should, `L7 from ${here}, room ${r} readable=${can} but should be ${should}`);
      if (should) readable++; else dark++;
    }
  }
  ok(readable > 100 && dark > 900, `L7 non-vacuity: ${readable} readable / ${dark} dark`);
  /* exactly ten doors are readable from anywhere */
  for (const here of [0, 44, 99]) {
    let k = 0;
    for (let r = 0; r <= TOP; r++) if (T.canRead(at(here), r)) k++;
    ok(k === PER, `L7 from ${here}, ${k} doors are readable — expected exactly ${PER}`);
  }
  console.log(`  exactly ten doors readable from any room; ${dark} dark across the sample`);
}

/* ===================================================================
   L8 — _st IS TOTAL, and the model cannot express a wrong state.
   =================================================================== */
head('L8 totality');
{
  for (const junk of [null, undefined, 0, NaN, '', 'x', [], 42, true,
    { room: -5 }, { room: 999 }, { room: 250 }, { room: -250 }, { room: 'a' }, { room: 3.7 }, { visited: 'no' }]) {
    let threw = false, r = null;
    try { r = T._st(junk); } catch (e) { threw = true; }
    ok(!threw, `L8 _st threw on ${JSON.stringify(junk)}`);
    ok(r && typeof r.room === 'number' && r.room >= 0 && r.room <= TOP,
      `L8 _st(${JSON.stringify(junk)}) gave room ${r && r.room}`);
    ok(r && Array.isArray(r.visited), `L8 _st(${JSON.stringify(junk)}) gave no visited array`);
  }
  /* there is no representation for being between corridors */
  for (let r = 0; r <= TOP; r++) {
    ok(Number.isInteger(T._st(at(r)).room), `L8 room ${r} is not an integer`);
  }
  console.log('  _st survived every junk input; every room is an integer in 0..99');
}

/* ===================================================================
   L9 — STRINGS. No banned structural noun, and no operator glyph.
   ⚠ The ban is the four ARITHMETIC operators plus U+2212 MINUS SIGN.
   Dashes and hyphens are punctuation — banning the em-dash condemned
   five correct strings on #48's first gate run.
   =================================================================== */
head('L9 strings');
{
  const OPERATOR = /[+×÷=−]/;
  /* every one of these is formally owned by another shipped tool */
  const BANNED = ['floor', 'building', 'tower', 'storey', 'skyline', 'level'];
  const keys = Object.keys(T.strings);
  ok(keys.length >= 25, `L9 non-vacuity: only ${keys.length} strings`);
  let checked = 0;
  for (const k of keys) {
    const v = T.strings[k];
    ok(v && typeof v.en === 'string' && v.en.length > 0, `L9 ${k} has no English`);
    if (!v || typeof v.en !== 'string') continue;
    checked++;
    ok(!OPERATOR.test(v.en), `L9 ${k} carries an operator glyph: "${v.en}"`);
    for (const b of BANNED) {
      ok(!new RegExp('(^|[^a-z])' + b + '([^a-z]|$)', 'i').test(v.en),
        `L9 ${k} uses the owned noun "${b}": "${v.en}"`);
    }
  }
  ok(checked === keys.length, 'L9 every string was checked');

  /* ⚠ POISON BOTH DIRECTIONS, or a ban is only tested where it holds */
  const MUST_FIRE = ['the third floor', 'a tall building', 'the tower', 'top storey', 'the skyline', '3 + 4', 'n = 10'];
  const MUST_PASS = ['The corridor ends here — the stairs are the way on.',
    'Take the elevator up one corridor', 'Room 49.', 'well-lit, half-empty'];
  for (const s of MUST_FIRE) {
    const hits = OPERATOR.test(s) || BANNED.some(b => new RegExp('(^|[^a-z])' + b + '([^a-z]|$)', 'i').test(s));
    ok(hits, `L9 poison: the bans missed "${s}"`);
  }
  for (const s of MUST_PASS) {
    const hits = OPERATOR.test(s) || BANNED.some(b => new RegExp('(^|[^a-z])' + b + '([^a-z]|$)', 'i').test(s));
    ok(!hits, `L9 poison: the bans condemned "${s}"`);
  }
  console.log(`  ${keys.length} strings, no operator glyphs, none of the six owned nouns`);
}

/* ===================================================================
   L10 — GEOMETRY fits the viewBox, and the numeral clears the floor.
   =================================================================== */
head('L10 geometry');
{
  const G = T.GEO;
  const used = G.SHAFT_W + G.ROOM_W * PER + G.MARGIN;
  ok(used <= G.VB_W + 0.01, `L10 the hotel needs ${used} of ${G.VB_W} units across`);
  ok(used > G.VB_W * 0.95, `L10 the hotel wastes ${(G.VB_W - used).toFixed(0)} units`);
  ok(G.CORR_H * CORRS + G.MARGIN * 2 <= G.VB_H + 0.01, 'L10 the corridors overflow the viewBox');
  /* ⭐ at a 296px arena (the measured 320px viewport) the numeral must
     clear a 14px legibility floor — computed here, not imported */
  const px = 296 / G.VB_W;
  const numPx = G.ROOM_W * G.NUM_F * px;
  ok(numPx >= 14, `L10 a room numeral is ${numPx.toFixed(1)}px at a 320px viewport, floor 14`);
  /* the largest numeral is two digits — no condensation case exists */
  ok(String(TOP).length === 2, `L10 the largest room is ${TOP}, which needs ${String(TOP).length} digits`);
  /* corridor 0 sits at the BOTTOM */
  ok(T.corrY(0) > T.corrY(CORRS - 1), 'L10 corridor 0 is not at the bottom');
  console.log(`  ${used}/${G.VB_W}u across; numeral ${numPx.toFixed(1)}px at 320; corridor 0 at the bottom`);
}

/* ===================================================================
   L11 — ⭐⭐ EVERY NAMED CONSTANT REACHES A CALL SITE.
   The art panel found that `exchange-machine.js:197-203` ships FIVE
   motion constants — T_LIFT, T_TRAVEL, T_HOLD, T_BURST, T_TOTAL — that
   NO CALL SITE READS. A ceremony was documented and never implemented,
   and the named-constants convention made it look shipped. A `T_HOLD`
   with the comment "SACRED" is worth nothing if nothing reads it.
   This file had THREE of its own when the panel reported.
   ⚠ MIN_FEATURE is deliberately consumed HERE rather than in the tool:
   it is a design LAW about what may be drawn, so the gate is its call
   site, and the gate enforces it.
   =================================================================== */
head('L11 no dead constants');
{
  const fs = require('fs');
  const src = fs.readFileSync(path.join(DIR, 'number-hotel.js'), 'utf8');
  const geo = src.slice(src.indexOf('var GEO = {'), src.indexOf('var ROOMS ='));
  const names = (geo.match(/^\s{4}([A-Z_0-9]+):/gm) || []).map(s => s.trim().replace(':', ''));
  ok(names.length >= 15, `L11 non-vacuity: parsed only ${names.length} constants — the regex is wrong`);
  const body = src.slice(src.indexOf('var ROOMS ='));
  const GATE_OWNED = ['MIN_FEATURE'];
  let dead = [];
  for (const n of names) {
    if (GATE_OWNED.indexOf(n) !== -1) continue;
    if (body.indexOf('GEO.' + n) === -1) dead.push(n);
  }
  ok(dead.length === 0, `L11 declared but never read: ${dead.join(', ')}`);

  /* MIN_FEATURE's own enforcement: nothing drawn 10 or 100 times may
     fall below it, measured against the room pitch. */
  const G = T.GEO;
  const floor = G.MIN_FEATURE * G.ROOM_W;
  ok(G.KNOB_F * G.ROOM_W >= floor,
    `L11 the door handle (${(G.KNOB_F * G.ROOM_W).toFixed(1)}u) is under the minimum-feature law (${floor.toFixed(1)}u)`);
  ok(G.WALL_W * G.ROOM_W >= floor,
    `L11 the end wall (${(G.WALL_W * G.ROOM_W).toFixed(1)}u) is under the minimum-feature law`);
  console.log(`  ${names.length} constants, ${dead.length} dead; minimum feature ${floor.toFixed(1)}u and every repeated mark clears it`);
}

console.log('\n' + '='.repeat(64));
console.log(`verify-number-hotel: ${PASS} passed, ${FAIL} failed`);
if (FAIL) { console.log('\nfirst failures:'); fails.forEach(f => console.log('  ✗ ' + f)); }
console.log('='.repeat(64));
process.exit(FAIL ? 1 : 0);
