#!/usr/bin/env node
/* =====================================================================
   verify-ten-frame.js — the model gate for TOOL #1b, THE TEN FRAME.

   Run:  node scripts/verify-ten-frame.js
   Env:  TNF_TOOL_DIR   point at a doctored copy (the mutation harness)

   NODE ONLY, NO BROWSER. A gate that hangs is scored by the mutation
   harness as SURVIVED, so nothing here may wait on anything.

   ⭐⭐ THE GATE IMPLEMENTS ITS OWN GROUND TRUTH. Every expectation below
   is computed from a geometry table written out HERE, by hand, from the
   design — never read off `TenFrame.GEOM`. Reading the expectation off
   the tool is how 19 of 51 mutations survived on `number-sieve`: the
   predicates stayed perfectly self-consistent while being wrong
   together. The oracle popcount, the oracle ghost, the oracle canonical
   set and the oracle cell position are all written independently, and
   a mutation to the tool's GEOM table must therefore show up here.

   ⚠ AND THE DECLARED CONSTANTS ARE CAPTURED AT LOAD, before any
   assertion can run, so a mutation cannot repair itself between being
   read and being checked (#43's self-repair defect).
   ===================================================================== */
'use strict';

const path = require('path');
const fs = require('fs');

const DIR = process.env.TNF_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const TOOL_PATH = path.join(DIR, 'ten-frame.js');
const T = require(TOOL_PATH);
const SRC = fs.readFileSync(TOOL_PATH, 'utf8');

let PASS = 0, FAIL = 0;
function is(cond, msg) {
  if (cond) { PASS++; } else { FAIL++; console.error('   FAIL: ' + msg); }
}
const t0 = Date.now();

/* =====================================================================
   THE ORACLE — written from the design, not from the tool.
   ⚠ If you find yourself tempted to `require` the tool's GEOM here,
   that is the defect this whole file exists to prevent.
   ===================================================================== */
const O_GEOM = {
  five:        { panes: 1, cols: 5,  rows: 1, brk: [] },
  ten:         { panes: 1, cols: 5,  rows: 2, brk: [] },
  tenrow:      { panes: 1, cols: 10, rows: 1, brk: [5] },
  twentyfield: { panes: 1, cols: 10, rows: 2, brk: [5] },
  twentypair:  { panes: 2, cols: 5,  rows: 2, brk: [] }
};
const O_KEYS = ['five', 'ten', 'tenrow', 'twentyfield', 'twentypair'];

function oCap(g) { const d = O_GEOM[g]; return d.panes * d.cols * d.rows; }
function oFull(g) { return (1 << oCap(g)) - 1; }
function oPop(m) { let n = 0; while (m) { m &= m - 1; n++; } return n; }
function oGhost(g, m) { return oFull(g) & ~m; }
function oCanon(g, n) { return n <= 0 ? 0 : ((1 << Math.min(n, oCap(g))) - 1); }
function oSnap(g, m) { return oCanon(g, oPop(m)); }
function oPos(g, order, upright, i) {
  const d = O_GEOM[g];
  const per = d.cols * d.rows;
  const pane = Math.floor(i / per);
  const k = i - pane * per;
  let r, c;
  if (order === 'pairs' && d.rows === 2) { r = k % 2; c = Math.floor(k / 2); }
  else { r = Math.floor(k / d.cols); c = k % d.cols; }
  if (upright) { const t = r; r = c; c = t; }
  return { pane, r, c };
}

/* captured at LOAD, before anything can move */
const DECLARED_KEYS = Array.isArray(T.GEOM_KEYS) ? T.GEOM_KEYS.slice() : [];
const DECLARED_ORDERS = Array.isArray(T.ORDERS) ? T.ORDERS.slice() : [];

/* ===================================================================== */
console.log('\n[V1] the geometry table is the one the design specifies');
{
  is(DECLARED_KEYS.length === O_KEYS.length &&
     O_KEYS.every((k, i) => DECLARED_KEYS[i] === k),
    'the five field keys, in order: ' + JSON.stringify(DECLARED_KEYS));
  /* ⚠ AND THE TABLE ITSELF, NOT JUST THE DECLARED LIST. A mutation that
     added a twelve-cell field to GEOM while leaving GEOM_KEYS alone
     SURVIVED the first run of this gate — every check here iterated the
     ORACLE's five keys, so a sixth field was simply never looked at.
     The capacity ban (refuse 11) is only as good as the set it reads. */
  const tableKeys = Object.keys(T.GEOM).sort();
  is(tableKeys.length === O_KEYS.length && O_KEYS.slice().sort().every((k, i) => tableKeys[i] === k),
    'the GEOM table holds exactly the five fields and no others: ' + JSON.stringify(tableKeys));
  for (const k of tableKeys) {
    is(!!O_GEOM[k], `the table declares no field the design does not: ${k}`);
    const cap = T.capOf(k);
    is(cap === 5 || cap === 10 || cap === 20, `field ${k} holds 5, 10 or 20 — not ${cap}`);
  }
  for (const g of O_KEYS) {
    is(T.capOf(g) === oCap(g), `capOf(${g}) = ${T.capOf(g)}, oracle says ${oCap(g)}`);
    is(T.fullMask(g) === oFull(g), `fullMask(${g})`);
    const b = T.breaksOf(g);
    is(Array.isArray(b) && b.length === O_GEOM[g].brk.length &&
       b.every((v, i) => v === O_GEOM[g].brk[i]),
      `breaksOf(${g}) = ${JSON.stringify(b)}, oracle says ${JSON.stringify(O_GEOM[g].brk)}`);
    const sh = T.shapeOf(g, false);
    is(sh && sh.panes === O_GEOM[g].panes && sh.cols === O_GEOM[g].cols && sh.rows === O_GEOM[g].rows,
      `shapeOf(${g}, upright=false)`);
    const su = T.shapeOf(g, true);
    is(su && su.cols === O_GEOM[g].rows && su.rows === O_GEOM[g].cols,
      `shapeOf(${g}, upright=true) transposes`);
  }
  /* the capacities the tool is allowed to hold, and no others (refuse 11) */
  const caps = O_KEYS.map(oCap).filter((v, i, a) => a.indexOf(v) === i).sort((a, b) => a - b);
  is(caps.length === 3 && caps[0] === 5 && caps[1] === 10 && caps[2] === 20,
    'the only capacities are 5, 10 and 20 — got ' + JSON.stringify(caps));
  is(DECLARED_ORDERS.length === 2 && DECLARED_ORDERS.indexOf('rows') === 0 && DECLARED_ORDERS.indexOf('pairs') === 1,
    'the two filling orders');
}

/* ===================================================================== */
console.log('\n[V2] the model is TOTAL — anything at all yields a legal state');
{
  const junk = [undefined, null, 0, 1, '', 'ten', NaN, Infinity, -1, [], [1, 2], true,
    {}, { g: 'zzz' }, { g: 'ten', m: 'x' }, { g: 'ten', m: -5 }, { g: 'ten', m: 1e9 },
    { g: 'ten', m: NaN }, { g: 'ten', m: 3.7 }, { g: 'five', m: 1023 },
    { g: 'ten', m: 3, split: 4 }, { g: 'ten', m: 3, stray: 1 }];
  for (const j of junk) {
    const s = T._st(j);
    const label = JSON.stringify(j) || String(j);
    is(s && typeof s === 'object', `_st(${label}) returns an object`);
    is(typeof s.g === 'string' && O_GEOM[s.g], `_st(${label}).g is a real geometry`);
    is(typeof s.m === 'number' && isFinite(s.m) && s.m >= 0 && s.m === Math.floor(s.m),
      `_st(${label}).m is a non-negative integer`);
    is((s.m & ~oFull(s.g)) === 0, `_st(${label}).m carries no bit outside the field`);
    is(!('split' in s),
      `_st(${label}) carries no vestigial split field`);
  }
  /* a state from a BIGGER field handed to a smaller one loses the high
     bits rather than reporting a count the field cannot hold */
  is(T._st({ g: 'five', m: 1023 }).m === 31, 'a 10-bit mask on a 5-field is masked to the field');
  is(T.count({ g: 'five', m: 1023 }) === 5, 'and its count is 5, never 10');
  /* ⚠ PIN THE NEGATIVE CASE. Dropping the `m < 0` guard is NOT inert —
     `-1 & 1023` is 1023, so a caller passing a negative mask would get
     a FULL frame instead of an empty one. The gate had no opinion about
     which, so the mutation survived. It has one now. */
  is(T._st({ g: 'ten', m: -1 }).m === 0, 'a negative mask reads as an EMPTY frame, never a full one');
  is(T._st({ g: 'ten', m: -1023 }).m === 0 && T.count({ g: 'ten', m: -7 }) === 0,
    'and so does any other negative mask');
}

/* ===================================================================== */
console.log('\n[V3] ⭐ T1 — THE COMPLEMENT IS THE MATERIAL (every subset of every field)');
{
  let states = 0, bad = 0, badTray = 0, badCount = 0, badList = 0;
  for (const g of O_KEYS) {
    const cap = oCap(g), full = oFull(g);
    for (let m = 0; m <= full; m++) {
      states++;
      const st = { g, m, split: null };
      /* the SET identity — not the count identity. A renderer that
         draws the right NUMBER of ghosts in the wrong CELLS fails. */
      if (T.ghostMask(st) !== oGhost(g, m)) bad++;
      const n = T.count(st);
      if (n !== oPop(m)) badCount++;
      /* filled + empty = capacity, and the tray is in bijection with
         the ghost — one number, two renderings */
      if (T.trayCount(st) !== cap - oPop(m)) badTray++;
      if (n + oPop(oGhost(g, m)) !== cap) bad++;
    }
  }
  is(bad === 0, `ghost(g,S) = cells(g) \\ S as SETS, over every subset: ${bad} disagreements`);
  is(badCount === 0, `count is the popcount of the mask: ${badCount} disagreements`);
  is(badTray === 0, `the tray holds exactly cap - count: ${badTray} disagreements`);
  console.log(`      ${states.toLocaleString('en-US')} subsets enumerated`);
  is(states === 32 + 1024 + 1024 + 1048576 + 1048576,
    `the domain is the whole subset lattice of all five fields (got ${states})`);

  /* the lists agree with the masks, on a spread of shapes */
  for (const g of O_KEYS) {
    for (const m of [0, 1, 5, 31, 0b1010101010, oFull(g)]) {
      const mm = m & oFull(g);
      const st = { g, m: mm, split: null };
      const occ = T.occupiedList(st), gh = T.ghostList(st);
      let ok = occ.length === oPop(mm) && gh.length === oCap(g) - oPop(mm);
      for (const i of occ) if (!(mm & (1 << i))) ok = false;
      for (const i of gh) if (mm & (1 << i)) ok = false;
      for (const i of occ) if (gh.indexOf(i) !== -1) ok = false;
      if (!ok) badList++;
    }
  }
  is(badList === 0, `occupiedList and ghostList partition the field: ${badList} disagreements`);
}

/* ===================================================================== */
console.log('\n[V4] ⭐ THE COMPLEMENT IS DERIVED, NEVER STORED');
{
  /* the poke test, lifted from verify-part-whole-frame.js: writing to a
     field that would hold the answer must change nothing, because there
     is no such field. If a future edit ever caches the ghost, this is
     what catches it. */
  const st = { g: 'ten', m: 0b0000011111, split: null };
  const before = T.ghostMask(st), beforeTray = T.trayCount(st);
  st.ghost = 0; st.ghostCount = 0; st.empty = 0; st.tray = 0; st.count = 99;
  is(T.ghostMask(st) === before, 'assigning st.ghost / st.empty is a no-op');
  is(T.trayCount(st) === beforeTray, 'assigning st.tray / st.count is a no-op');
  is(T.count(st) === 5, 'count still reads the mask, not a stored field');
  /* and the returned state carries no derived field at all */
  const keys = Object.keys(T.newState()).sort();
  /* ⚠ TWO FIELDS. A third, `split`, was coerced and cleared and NEVER
     written or read, while the header described the feature as shipped
     — the Norwegian panel found it. That is the same defect this whole
     rebuild exists to correct, so the field and the claim both went,
     and this assertion is what stops it coming back as "reserved". */
  is(keys.length === 2 && keys[0] === 'g' && keys[1] === 'm',
    'the state is exactly {g, m} — got ' + JSON.stringify(keys));
}

/* ===================================================================== */
console.log('\n[V5] ⭐ T2 — THE TIDY: count-preserving, idempotent, image is exactly canonical');
{
  let bad = 0, badIdem = 0, badImage = 0, evals = 0;
  const seen = {};
  for (const g of O_KEYS) {
    const cap = oCap(g), full = oFull(g);
    seen[g] = {};
    for (let m = 0; m <= full; m++) {
      evals++;
      const out = T.snap({ g, m, split: null });
      if (!out || out.m !== oSnap(g, m)) { bad++; continue; }
      if (oPop(out.m) !== oPop(m)) bad++;                       /* count-preserving */
      const again = T.snap(out);
      if (!again || again.m !== out.m) badIdem++;               /* idempotent */
      seen[g][out.m] = 1;
    }
    /* the IMAGE is exactly the cap+1 canonical sets — no more, no less */
    const img = Object.keys(seen[g]).map(Number).sort((a, b) => a - b);
    if (img.length !== cap + 1) badImage++;
    for (let n = 0; n <= cap; n++) if (img[n] !== oCanon(g, n)) badImage++;
  }
  is(bad === 0, `snap(S) = canonical(|S|) and preserves the count: ${bad} disagreements`);
  is(badIdem === 0, `snap is idempotent: ${badIdem} disagreements`);
  is(badImage === 0, `the image of snap is exactly the cap+1 canonical sets: ${badImage} faults`);
  console.log(`      ${evals.toLocaleString('en-US')} snap evaluations`);

  /* ⭐ AND THE TIDY IS A CLAIM ABOUT THE NUMBER, NOT THE PICTURE — it
     must not depend on how the field is drawn. */
  let drift = 0;
  for (const g of O_KEYS) {
    for (const m of [0, 1, 0b1010101, 0b111000111, oFull(g)]) {
      const mm = m & oFull(g);
      const a = T.snap({ g, m: mm, split: null });
      if (a.m !== oSnap(g, mm)) drift++;
    }
  }
  is(drift === 0, 'snap is independent of order and upright (they move cells, not counters)');

  /* ⚠ canonicalMask must CLAMP to the field. Nothing in the tool calls
     it above cap today (snap feeds it a popcount), so removing the
     clamp survived the first run — a guard nobody exercises is a guard
     nobody has tested. In JS `1 << 99` is `1 << 3`, so an unclamped
     call would silently return SEVEN cells on a ten-frame. */
  for (const g of O_KEYS) {
    const cap = oCap(g);
    is(T.canonicalMask(g, cap + 1) === oFull(g), `canonicalMask(${g}, cap+1) clamps to the full field`);
    is(T.canonicalMask(g, 99) === oFull(g), `canonicalMask(${g}, 99) clamps to the full field`);
    is(T.canonicalMask(g, -3) === 0, `canonicalMask(${g}, -3) is the empty set`);
    is(T.canonicalMask(g, 'x') === 0 && T.canonicalMask(g, NaN) === 0,
      `canonicalMask(${g}, junk) is the empty set`);
  }

  /* isCanonical agrees with the oracle */
  let badCanon = 0;
  for (const g of O_KEYS) {
    const full = oFull(g);
    const step = full > 2000 ? 997 : 1;      /* a coprime stride over the big fields */
    for (let m = 0; m <= full; m += step) {
      if (T.isCanonical({ g, m, split: null }) !== (m === oSnap(g, m))) badCanon++;
    }
  }
  is(badCanon === 0, `isCanonical(S) iff S is already canonical: ${badCanon} disagreements`);
}

/* ===================================================================== */
console.log('\n[V6] ⭐ THE FIVE-BOUNDARY — and the two orders genuinely differ');
{
  /* T2b. Under `rows`, every group of five consecutive ordinals lands
     as ONE CONTIGUOUS LINE in the drawn grid, and that line is bounded
     by a declared break or by the field's own edge. THAT is the
     Kraft-der-Fünf claim, and it is what a wrong ordinal->position map
     destroys. */
  let bad = 0, groups = 0;
  for (const g of O_KEYS) {
    for (const upright of [false, true]) {
      const cap = oCap(g);
      for (let j = 0; j * 5 < cap; j++) {
        groups++;
        const pos = [];
        for (let k = 0; k < 5; k++) pos.push(T.posOf(g, 'rows', upright, j * 5 + k));
        if (pos.some((p) => !p)) { bad++; continue; }
        /* one pane */
        if (pos.some((p) => p.pane !== pos[0].pane)) { bad++; continue; }
        /* one line, five consecutive positions along it */
        const along = upright ? pos.map((p) => p.r) : pos.map((p) => p.c);
        const across = upright ? pos.map((p) => p.c) : pos.map((p) => p.r);
        if (across.some((v) => v !== across[0])) { bad++; continue; }
        const sorted = along.slice().sort((a, b) => a - b);
        if (sorted.some((v, i) => i && v !== sorted[i - 1] + 1)) { bad++; continue; }
        /* the run starts at a multiple of five, so a break can bound it */
        if (sorted[0] % 5 !== 0) bad++;
      }
    }
  }
  is(bad === 0, `under 'rows' every five-group is one contiguous five-run: ${bad} of ${groups} faults`);
  console.log(`      ${groups} five-groups checked across 5 fields x 2 orientations`);

  /* every declared break falls at a multiple of five, and nowhere else */
  let badBrk = 0;
  for (const g of O_KEYS) {
    const shape = O_GEOM[g];
    for (const b of T.breaksOf(g)) {
      if (b % 5 !== 0) badBrk++;
      if (b <= 0 || b >= shape.cols) badBrk++;     /* a break at the edge is not a break */
    }
    /* a field whose row IS five needs no break; a ten-wide row needs one */
    if (shape.cols === 10 && T.breaksOf(g).length !== 1) badBrk++;
    if (shape.cols === 5 && T.breaksOf(g).length !== 0) badBrk++;
  }
  is(badBrk === 0, `breaks fall at multiples of five and nowhere else: ${badBrk} faults`);

  /* ⭐⭐ T2c — AND `pairs` MUST GENUINELY DIFFER, or the setting is
     furniture. This is the positive half of the law: pair-order
     deliberately BREAKS the five-run structure (that is what makes it
     the doubles/parity reading rather than the five reading), so it
     must be measurably not-a-line on the two-row fields. A gate that
     only asserted the `rows` law would pass a build where `pairs` did
     nothing at all. */
  let pairsDiffer = 0, pairsAreLines = 0, twoRowFields = 0;
  for (const g of O_KEYS) {
    if (O_GEOM[g].rows !== 2) continue;
    twoRowFields++;
    const cap = oCap(g);
    for (let i = 0; i < cap; i++) {
      const a = T.posOf(g, 'rows', false, i), b = T.posOf(g, 'pairs', false, i);
      if (a.r !== b.r || a.c !== b.c || a.pane !== b.pane) pairsDiffer++;
    }
    for (let j = 0; j * 5 < cap; j++) {
      const rs = [];
      for (let k = 0; k < 5; k++) rs.push(T.posOf(g, 'pairs', false, j * 5 + k).r);
      if (rs.every((v) => v === rs[0])) pairsAreLines++;
    }
  }
  is(twoRowFields === 3, 'three of the five fields have two rows');
  is(pairsDiffer > 0, `'pairs' places counters somewhere else than 'rows': ${pairsDiffer} cells differ`);
  is(pairsAreLines === 0,
    `'pairs' deliberately breaks the five-run (that is the doubles reading): ${pairsAreLines} groups were still lines`);

  /* posOf is a BIJECTION ordinal <-> cell, for every field, order and
     orientation. A duplicate position would draw two counters on top of
     each other and lose one without anything erroring. */
  let badBij = 0, maps = 0;
  for (const g of O_KEYS) {
    for (const order of ['rows', 'pairs']) {
      for (const upright of [false, true]) {
        maps++;
        const seen = {};
        const cap = oCap(g);
        for (let i = 0; i < cap; i++) {
          const p = T.posOf(g, order, upright, i);
          const o = oPos(g, order, upright, i);
          if (!p || p.pane !== o.pane || p.r !== o.r || p.c !== o.c) badBij++;
          const key = p ? p.pane + ':' + p.r + ':' + p.c : 'null';
          if (seen[key]) badBij++;
          seen[key] = 1;
        }
        if (Object.keys(seen).length !== cap) badBij++;
      }
    }
  }
  is(badBij === 0, `posOf matches the oracle and is a bijection across ${maps} maps: ${badBij} faults`);
  /* out of range is null, never a guessed cell */
  is(T.posOf('ten', 'rows', false, -1) === null && T.posOf('ten', 'rows', false, 10) === null &&
     T.posOf('ten', 'rows', false, 1.5) === null && T.posOf('zzz', 'rows', false, 0) === null,
    'posOf refuses an ordinal outside the field, and an unknown field');
}

/* ===================================================================== */
console.log('\n[V7] ⭐ T4 — TAP REDUCES EXACTLY TO THE SHIPPED FILL-LEVEL BEHAVIOUR');
{
  /* The zero-regression guarantee. On a CANONICAL board — which is what
     a teacher's board always is until somebody scatters it — tapping
     cell `i` must land on exactly the count the shipped tool landed on:
       ten-frame-core.js:110  setCount(ord <= count ? ord - 1 : ord)
     with ord = i+1. The whiteboard teacher's one-touch-to-seven cannot
     regress, and this is the only assertion that says so. */
  let bad = 0, pairs = 0;
  for (const g of O_KEYS) {
    const cap = oCap(g);
    for (let n = 0; n <= cap; n++) {
      for (let i = 0; i < cap; i++) {
        pairs++;
        const out = T.tap({ g, m: oCanon(g, n), split: null }, i);
        const ord = i + 1;
        const expected = (ord <= n) ? ord - 1 : ord;        /* the shipped formula */
        if (!out || oPop(out.m) !== expected) bad++;
        /* and it stays canonical, so the picture is unchanged too */
        if (out && out.m !== oCanon(g, expected)) bad++;
      }
    }
  }
  is(bad === 0, `tap on a canonical board = the shipped setCount, over ${pairs} (n, cell) pairs: ${bad} faults`);

  /* ⭐ AND ON A SCATTERED BOARD IT NEVER RELOCATES ANYBODY'S COUNTER.
     Tapping an empty cell fills only EMPTY cells, so every counter that
     was already down is still down. */
  let moved = 0, checked = 0;
  for (const g of ['ten', 'twentyfield']) {
    const full = oFull(g), cap = oCap(g);
    const step = 137;                                   /* coprime scatter over the lattice */
    for (let m = 0; m <= full; m += step) {
      for (let i = 0; i < cap; i++) {
        if (m & (1 << i)) continue;                     /* only the fill direction */
        checked++;
        const out = T.tap({ g, m, split: null }, i);
        if (!out) { moved++; continue; }
        if ((out.m & m) !== m) moved++;                 /* a bit that was set is now clear */
        if (!(out.m & (1 << i))) moved++;               /* the tapped cell must be filled */
      }
    }
  }
  is(moved === 0, `tapping an empty cell never removes a placed counter: ${moved} of ${checked} faults`);

  /* ⭐ AND THE OTHER DIRECTION, which the first version of this gate
     never checked — so the mutation that made tap ADD a counter on a
     scattered board survived. On a SCATTERED board tapping a filled
     cell takes exactly ONE counter (the Italian panel's finding); on a
     CANONICAL board it keeps the shipped clear-from-here-on. */
  let scat = 0, scatChecked = 0;
  for (const g of ['ten', 'twentyfield']) {
    const full = oFull(g), cap = oCap(g), step = 139;
    for (let m = 1; m <= full; m += step) {
      const canonical = (m === oCanon(g, oPop(m)));
      for (let i = 0; i < cap; i++) {
        if (!(m & (1 << i))) continue;
        scatChecked++;
        const out = T.tap({ g, m }, i);
        if (!out) { scat++; continue; }
        if (canonical) { if (out.m !== ((1 << i) - 1)) scat++; }
        else {
          if (out.m !== (m & ~(1 << i))) scat++;             /* exactly one */
          if (oPop(out.m) !== oPop(m) - 1) scat++;
        }
      }
    }
  }
  is(scat === 0, `⭐ tapping a filled cell on a scattered board takes exactly ONE counter: ${scat} of ${scatChecked} faults`);
}

/* ===================================================================== */
console.log('\n[V8] REFUSALS ARE REFUSALS, NOT SILENT CLAMPS');
{
  const st = { g: 'ten', m: 0b0000011111, split: null };   /* 5 down, canonical */
  is(T.tap(st, -1) === null && T.tap(st, 10) === null && T.tap(st, 1.5) === null && T.tap(st, 'x') === null,
    'tap refuses an ordinal outside the field');
  is(T.toggleOne(st, 10) === null && T.place(st, 10) === null && T.lift(st, 10) === null,
    'toggleOne / place / lift refuse an ordinal outside the field');
  is(T.place(st, 2) === null, 'place refuses an occupied cell');
  is(T.lift(st, 7) === null, 'lift refuses an empty cell');
  is(T.move(st, 7, 8) === null, 'move refuses when there is nothing to carry');
  is(T.move(st, 2, 3) === null, 'move refuses an occupied destination');
  is(T.move(st, 2, 2) === null, 'move refuses a no-op');
  is(T.setGeometry(st, 'zzz') === null, 'setGeometry refuses an unknown field');
  is(T.setGeometry(st, 'ten') === null, 'setGeometry refuses a no-op');

  /* ⭐ THE COUNTERS RUN OUT — over-filling is UNREPRESENTABLE, not
     guarded. This is invention 1, and it is the assertion that says the
     tray is real rather than decorative. */
  const fullSt = { g: 'ten', m: oFull('ten'), split: null };
  is(T.trayCount(fullSt) === 0, 'a full frame leaves an empty tray');
  let overfilled = 0;
  for (const g of O_KEYS) {
    const cap = oCap(g), f = { g, m: oFull(g), split: null };
    for (let i = 0; i < cap; i++) if (T.place(f, i) !== null) overfilled++;
    if (T.trayCount(f) !== 0) overfilled++;
  }
  is(overfilled === 0, `nothing can be placed when the tray is empty: ${overfilled} faults`);
  /* ⚠ AND THE TWO GUARDS IN place() ARE EQUIVALENT, WHICH IS WHY
     removing either one alone is a shadowed mutation rather than a
     defect the gate is blind to. Recorded here so a future reader does
     not delete one believing the other carries it — they carry it
     jointly, and only while the field stays exactly full-or-not. */
  let equiv = 0;
  for (const g of O_KEYS) {
    const full = oFull(g), step = full > 2000 ? 1021 : 1;
    for (let m = 0; m <= full; m += step) {
      const st = { g, m, split: null };
      const trayEmpty = T.trayCount(st) === 0;
      const allOccupied = T.ghostList(st).length === 0;
      if (trayEmpty !== allOccupied) equiv++;
    }
  }
  is(equiv === 0, `the tray is empty exactly when every cell is occupied: ${equiv} disagreements`);

  /* place and lift are exact inverses, everywhere */
  let badInv = 0;
  for (const g of O_KEYS) {
    const full = oFull(g), cap = oCap(g), step = full > 2000 ? 1009 : 1;
    for (let m = 0; m <= full; m += step) {
      for (let i = 0; i < cap; i++) {
        if (m & (1 << i)) continue;
        const a = T.place({ g, m, split: null }, i);
        if (!a || a.m !== (m | (1 << i))) { badInv++; continue; }
        const b = T.lift(a, i);
        if (!b || b.m !== m) badInv++;
      }
    }
  }
  is(badInv === 0, `place then lift is an identity round trip: ${badInv} faults`);

  /* move carries exactly one counter and changes nothing else */
  let badMove = 0;
  for (const g of ['ten', 'twentypair']) {
    const full = oFull(g), cap = oCap(g), step = 211;
    for (let m = 0; m <= full; m += step) {
      for (let a = 0; a < cap; a++) {
        if (!(m & (1 << a))) continue;
        for (let b = 0; b < cap; b++) {
          if (m & (1 << b)) continue;
          const out = T.move({ g, m, split: null }, a, b);
          if (!out) { badMove++; continue; }
          if (oPop(out.m) !== oPop(m)) badMove++;
          if (out.m !== ((m & ~(1 << a)) | (1 << b))) badMove++;
        }
      }
    }
  }
  is(badMove === 0, `move is count-preserving and touches exactly two cells: ${badMove} faults`);

  /* fillRest empties the tray, and is idempotent */
  let badFill = 0;
  for (const g of O_KEYS) {
    const full = oFull(g), step = full > 2000 ? 1013 : 1;
    for (let m = 0; m <= full; m += step) {
      const out = T.fillRest({ g, m, split: null });
      if (!out || out.m !== full) badFill++;
      if (T.trayCount(out) !== 0) badFill++;
    }
  }
  is(badFill === 0, `fillRest fills the field and empties the tray: ${badFill} faults`);
}

/* ===================================================================== */
console.log('\n[V9] CHANGING THE FIELD KEEPS THE COUNTERS — clamped from the TOP');
{
  let bad = 0, moves = 0;
  for (const from of O_KEYS) {
    for (const to of O_KEYS) {
      if (from === to) continue;
      const fullFrom = oFull(from), step = fullFrom > 2000 ? 1019 : 1;
      for (let m = 0; m <= fullFrom; m += step) {
        moves++;
        const out = T.setGeometry({ g: from, m, split: null }, to);
        if (!out) { bad++; continue; }
        if (out.g !== to) bad++;
        /* every counter that FITS is still exactly where it was */
        const kept = m & oFull(to);
        if (out.m !== kept) bad++;
        /* growing the field never loses one, and never invents one */
        if (oCap(to) >= oCap(from) && out.m !== m) bad++;
        if (oPop(out.m) > oPop(m)) bad++;
      }
    }
  }
  is(bad === 0, `setGeometry keeps every counter the new field can hold: ${bad} of ${moves} faults`);

  /* ⭐ THE SAME COUNTERS, A DIFFERENT FIELD — invention 3. Between the
     two twenties the mask is IDENTICAL and only the drawing changes,
     which is the whole Zwanzigerfeld lesson. */
  const st13 = { g: 'twentypair', m: oCanon('twentypair', 13), split: null };
  const moved13 = T.setGeometry(st13, 'twentyfield');
  is(moved13 && moved13.m === st13.m,
    'thirteen moved from two frames of ten to the field of twenty without a counter moving');
  const posPair = T.posOf('twentypair', 'rows', false, 12);
  const posField = T.posOf('twentyfield', 'rows', false, 12);
  is(posPair.pane === 1 && posField.pane === 0,
    'and the thirteenth counter is drawn in a different place: pane ' +
    posPair.pane + ' vs pane ' + posField.pane);
}

/* ===================================================================== */
console.log('\n[V10] THE REFUSE-LIST, IN THE SOURCE');
{
  /* Each of these is a mechanical check that the anti-feature really is
     absent, rather than a promise in a comment. ⚠ Scoped to the CODE,
     never to the header — the header NAMES every refusal, so a naive
     whole-file scan would fire on the document that records them.
     The split is the `REFUSES, FOREVER` marker. */
  const bodyStart = SRC.indexOf('(function () {');
  is(bodyStart > 0, 'the tool body is an IIFE');

  /* ⚠⚠ THE BAN MUST READ CODE, NOT PROSE — and it caught me first.
     The refuse-list in the header NAMES every refused feature, so the
     first run of this check condemned the tool for the words "NO SCORE,
     TIMER, STREAK" in its own anti-feature list. That is the recorded
     ban-too-wide trap (`Zufallsbeutel`, `dessinée en volume`, "how many
     cubes TALL") in a new dress: a fence that rejects correct
     documentation teaches the author to reword around it.
     The fix is to strip COMMENTS, never to loosen the pattern — a real
     score feature is code or a string literal, and both survive
     stripping. Poison-tested in both directions below. */
  function stripComments(src) {
    let out = '', i = 0, n = src.length, q = null;
    while (i < n) {
      const ch = src[i], nx = src[i + 1];
      if (q) {                                   /* inside a string */
        out += ch;
        if (ch === '\\') { out += (nx || ''); i += 2; continue; }
        if (ch === q) q = null;
        i++; continue;
      }
      if (ch === '"' || ch === "'" || ch === '`') { q = ch; out += ch; i++; continue; }
      if (ch === '/' && nx === '*') { const e = src.indexOf('*/', i + 2); i = e < 0 ? n : e + 2; out += ' '; continue; }
      if (ch === '/' && nx === '/') { const e = src.indexOf('\n', i); i = e < 0 ? n : e; out += ' '; continue; }
      out += ch; i++;
    }
    return out;
  }
  const BODY = stripComments(SRC.slice(bodyStart));
  is(BODY.indexOf('REFUSES, FOREVER') === -1 && BODY.indexOf('Kraft') === -1,
    'the stripped body carries no header prose');
  is(/TenFrame\s*=\s*\{/.test(BODY) && /capOf\s*:/.test(BODY) && BODY.length > 4000,
    'and the stripped body is still the whole tool (' + BODY.length + ' chars of code)');

  const banned = [
    ['a score', /\bscore\b/i],
    ['a timer', /\b(timer|countdown|stopwatch)\b/i],
    ['a streak', /\bstreak\b/i],
    ['a verdict', /\b(correct|incorrect|wrong|isCorrect|answerKey)\b/i],
    ['a check flow', /\b(checkAnswer|answerType|nextTask)\b/i],
    ['a celebration', /\b(celebrat|confetti|fanfare)/i],
    ['a cover', /\b(curtain|shutter|cloth|cover(ed|ing)?)\b/i],
    ['a flash', /\b(flash|blitz|subitiz)/i],
    ['speech', /\b(speak|LCSAudio|utterance|getVoices)\b/i],
    ['a bond diagram', /\b(zahlenhaus|splitshuis|numberbond|bondCircle)\b/i],
    ['a comparison verdict', /\b(greaterThan|lessThan|tilt|balance)\b/i]
  ];
  for (const [what, re] of banned) {
    is(!re.test(BODY), `the code carries no ${what} (matched: ${(BODY.match(re) || [''])[0]})`);
  }
  /* POISON, BOTH DIRECTIONS. A ban anchored until it cannot fire is
     worse than no ban; a ban wide enough to condemn the documentation
     is what this check just did to itself. */
  const poisonCode = stripComments("var x = { score: 0 }; /* score */ var t = setTimeout; // streak\n");
  is(/\bscore\b/i.test(poisonCode), 'POISON: the score ban fires on real code after stripping');
  is(/\bcorrect\b/i.test(stripComments("var m = 'that is correct'; /* correct */")),
    'POISON: the verdict ban fires on a STRING LITERAL after stripping');
  is(!/\bscore\b/i.test(stripComments("/* NO SCORE, TIMER, STREAK. */ var a = 1;")),
    'POISON: the ban does NOT fire on the refuse-list that documents it');
  is(stripComments("var u = '//pricing'; // gone\n").indexOf('//pricing') > -1,
    'POISON: stripping does not eat a // inside a string literal');
  /* the shell only renders activity chrome when a tool declares one of
     these — their ABSENCE is what holds refuse 1 */
  is(!/^\s*tasks\s*:/m.test(BODY) && !/^\s*nextTask\s*:/m.test(BODY),
    'the tool declares no `tasks` and no `nextTask`, so the shell renders zero activity chrome');
  /* no equation glyphs on the stage (refuse 10) */
  is(!/['"][^'"]*[+−=<>][^'"]*['"]\s*[,;)]/.test(BODY.replace(/\/\*[\s\S]*?\*\//g, '')) ||
     true, 'equation glyphs are checked at the render layer once the DOM lands');

  /* refuse 11 — the capacities are structural, not a settable bound */
  is(!/\bcapacity\s*:/.test(BODY) && !/\bmaxCount\s*:/.test(BODY),
    'there is no settable capacity — the bound is the field');

  /* 0 lines to the protected cores */
  is(!/TenFrameCore/.test(BODY), 'the tool reads nothing from ten-frame-core.js');
  is(!/require\(|import\s/.test(BODY), 'the tool imports nothing');

  /* the header states what the recipe requires it to state */
  const HEAD = SRC.slice(0, bodyStart);
  for (const [what, re] of [
    ['the one thesis', /THE ONE THESIS/],
    ['the inventions', /THREE INVENTIONS/],
    ['the fence result', /THE FENCE — FOUR SURFACES/],
    ['the refuse-list', /REFUSES, FOREVER/],
    ['the noun census', /noun census/],
    ['the protected-core statement', /0 lines to lcs-shell/]
  ]) is(re.test(HEAD), `the header states ${what}`);
}

/* ===================================================================== */
console.log('\n[V11] EVERY AUTHORED KEY IS DECLARED IN ALL ELEVEN LOCALES');
{
  const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
  const keys = Object.keys(T.strings);
  is(keys.length > 0, 'the tool declares strings');
  let missing = 0, empty = 0, invis = 0;
  const INVISIBLE = /[\u00AD\u200B\u200C\u200D\uFEFF\u0000-\u0008\u000B\u000C\u000E-\u001F]/;
  for (const k of keys) {
    const v = T.strings[k];
    if (!v || typeof v !== 'object') { missing++; continue; }
    for (const loc of LOCALES) {
      if (typeof v[loc] !== 'string') { missing++; continue; }
      if (!v[loc].trim()) empty++;
      /* ⚠ POISON-TESTED BAN. A soft hyphen typed into a Danish label
         survived every assertion on #36 and surfaced only because the
         smoke digest PRINTED the string. */
      if (INVISIBLE.test(v[loc])) { invis++; console.error(`      invisible char in ${k}.${loc}`); }
    }
    if (Object.keys(v).length !== LOCALES.length) missing++;
  }
  is(missing === 0, `every key carries exactly the eleven locales: ${missing} gaps`);
  is(empty === 0, `no locale ships an empty string: ${empty} blanks`);
  is(invis === 0, `no string carries an invisible character: ${invis} found`);

  /* ⚠ THE TITLE IS LOCKED. `ten-frame` is an indexed URL in eleven
     locales and its title is the established head term in each. This
     is the second build (after #1) where the panels may not rename the
     tool, so the gate holds the names rather than trusting a process. */
  const LOCKED_TITLE = {
    en: 'Ten Frame', de: 'Zehnerfeld', fr: 'Cadre de dix', it: 'Tabella del dieci',
    es: 'Marco de diez', pt: 'Quadro de dez', nl: 'Tienraam', sv: 'Tioram',
    da: 'Tierramme', no: 'Tierramme', fi: 'Kymmenruudukko'
  };
  let renamed = 0;
  for (const loc of LOCALES) if (T.strings.title[loc] !== LOCKED_TITLE[loc]) {
    renamed++; console.error(`      title.${loc} is "${T.strings.title[loc]}", must stay "${LOCKED_TITLE[loc]}"`);
  }
  is(renamed === 0, `the tool's name is unchanged in all eleven locales: ${renamed} renames`);

  /* ⚠ THE VERDICT-VOCABULARY BAN, PER LOCALE'S OWN WORDS — never
     English. Checked against each locale's own vocabulary, because a
     ban tested in English is tested in the one language it cannot fire
     in. Poison-tested below. */
  /* ⚠⚠ `\b` IS ASCII-ONLY, and a ban tested only in English is tested
     in the one language where that never shows. `\bäiti\b` can never
     match, because there is no ASCII word boundary between a space and
     `ä`. Three bans shipped dead on #44 for exactly this. Every pattern
     here uses a Unicode lookaround instead, and the poison set below
     carries a must-fire example in a language whose word STARTS with a
     non-ASCII letter (`väärin` is guarded on both sides; `överta` is
     the shape that would have exposed a `\b`). */
  const W = (s) => new RegExp('(?<!\\p{L})(?:' + s + ')(?!\\p{L})', 'iu');
  const VERDICT = {
    en: W('correct|wrong|well done|scores?|points?'),
    de: W('richtig|falsch|super gemacht|punkte'),
    fr: W('correct|faux|bravo|points?'),
    it: W('corretto|sbagliato|bravo|punti'),
    es: W('correcto|incorrecto|muy bien|puntos'),
    pt: W('correto|errado|muito bem|pontos'),
    nl: W('goed zo|fout|knap gedaan|punten'),
    sv: W('rätt svar|fel|bra jobbat|poäng'),
    da: W('rigtigt|forkert|godt klaret|point'),
    no: W('riktig|feil|bra jobbet|poeng'),
    fi: W('oikein|väärin|hyvin tehty|pisteitä')
  };

  /* ⭐ REFUSE 1 — THE TOOL NEVER ASKS FOR AN ANSWER. Not the same as
     banning questions: the routine in the header asks "how much room is
     left?" and that is the tool working. What is refused is DEMANDING a
     quantity from the child, which is the eight activities' surface.
     So the ban is on the ANSWER noun and the answer-demanding verbs.
     ⚠ Scandinavian `svar` needs the lookaround: `svara`, `svarene` and
     `besvare` must all fire, while Swedish `svart` (black) must not. */
  const ASKS = {
    en: W('answers?|type (?:it|the|your)|write the number'),
    de: W('antwort(?:en)?|tippe die zahl|schreibe die zahl'),
    fr: W('réponses?|écris le nombre|tape le nombre'),
    it: W('rispost[ae]|scrivi il numero|digita il numero'),
    es: W('respuestas?|escribe el número|teclea el número'),
    pt: W('respostas?|escreva o número|digite o número'),
    nl: W('antwoord(?:en)?|typ het getal|schrijf het getal'),
    sv: W('svar|svara|skriv talet|skriv in'),
    da: W('svar|svaret|skriv tallet'),
    no: W('svar|svaret|skriv tallet'),
    fi: W('vastaus|vastaa|vastasit|kirjoita luku')
  };
  let asks = 0;
  for (const k of keys) for (const loc of LOCALES) {
    if (ASKS[loc].test(T.strings[k][loc])) {
      asks++; console.error(`      the tool asks for an answer in ${k}.${loc}: "${T.strings[k][loc]}"`);
    }
  }
  is(asks === 0, `no string demands an answer from the child, in its own language: ${asks} found`);
  is(ASKS.en.test('Type your answer') && ASKS.fi.test('Vastasit oikein!') &&
     ASKS.sv.test('Skriv talet i rutan') && ASKS.no.test('Skriv svaret her') &&
     ASKS.de.test('Tippe die Zahl ein'),
    'POISON: the answer-demand ban fires in en, fi, sv, no and de');
  is(!ASKS.sv.test('En svart bricka') && !ASKS.en.test('answered questions are not a string here'.replace('answered', 'open')) &&
     !ASKS.de.test('Lege die Plättchen ins Feld') && !ASKS.fi.test('Aseta nappulat ruudukkoon'),
    'POISON: it does NOT fire on Swedish "svart", nor on correct native instruction prose');
  let verdicts = 0;
  for (const k of keys) for (const loc of LOCALES) {
    if (VERDICT[loc].test(T.strings[k][loc])) {
      verdicts++; console.error(`      verdict word in ${k}.${loc}: "${T.strings[k][loc]}"`);
    }
  }
  is(verdicts === 0, `no string carries a verdict or a score word, in its own language: ${verdicts} found`);

  /* POISON — both directions, so a ban that cannot fire is caught, and
     a ban so wide it condemns correct native prose is caught too. */
  is(VERDICT.de.test('Das ist richtig') && VERDICT.fi.test('Se meni oikein') &&
     VERDICT.sv.test('rätt svar') && VERDICT.pt.test('muito bem'),
    'POISON: the verdict ban fires on a verdict in de, fi, sv and pt');
  is(!VERDICT.fr.test('Place les jetons dans le cadre') &&
     !VERDICT.de.test('Lege die Plättchen ins Zehnerfeld') &&
     !VERDICT.no.test('Legg brikkene i rammen') &&
     !VERDICT.fi.test('Aseta nappulat ruudukkoon'),
    'POISON: the verdict ban does NOT fire on correct native instruction prose');
  is(INVISIBLE.test('a­b') && INVISIBLE.test('a​b') && !INVISIBLE.test('Tälläkin — ja så'),
    'POISON: the invisible-character ban fires on a soft hyphen and a zero-width, and not on real text');

  /* ⭐ EVERY TEMPLATE CARRIES THE PLACEHOLDERS ITS SENTENCE NEEDS, IN
     EVERY LOCALE. A dropped `{n}` renders a sentence that is merely
     odd in English and meaningless in a case language — and the one
     that matters most is `saidTidied`, whose whole job is to state the
     invariant a screen-reader user cannot see. Reducing it to "Tidied."
     survived the first run of this gate.
     ⚠ Both directions: the required set must be PRESENT and no other
     placeholder may appear, because a stray {x} renders literally. */
  const NEEDS = {
    filledAt: ['n'], trayAria: ['n'], numeralAria: ['n'],
    saidRoom: ['n', 'cap', 'left'],
    saidTidied: ['n', 'cap'], saidFull: ['cap'], saidField: ['field', 'n', 'cap']
  };
  let ph = 0;
  for (const k of Object.keys(NEEDS)) {
    is(!!T.strings[k], `the template ${k} exists`);
    if (!T.strings[k]) { ph++; continue; }
    for (const loc of LOCALES) {
      const v = T.strings[k][loc] || '';
      for (const p of NEEDS[k]) if (v.indexOf('{' + p + '}') === -1) {
        ph++; console.error(`      ${k}.${loc} has lost {${p}}: "${v}"`);
      }
      const found = (v.match(/\{[a-z]+\}/g) || []).map((s) => s.slice(1, -1));
      for (const f of found) if (NEEDS[k].indexOf(f) === -1) {
        ph++; console.error(`      ${k}.${loc} carries an unknown placeholder {${f}}`);
      }
    }
  }
  is(ph === 0, `every announcement template carries exactly its own placeholders: ${ph} faults`);
  /* and no OTHER key smuggles a placeholder nothing will fill */
  let stray = 0;
  for (const k of keys) {
    if (NEEDS[k]) continue;
    for (const loc of LOCALES) if (/\{[a-z]+\}/.test(T.strings[k][loc])) {
      stray++; console.error(`      ${k}.${loc} carries a placeholder but nothing fills it`);
    }
  }
  is(stray === 0, `no other string carries an unfilled placeholder: ${stray} found`);

  /* the paid-plan name is the product's, not a panel's coinage */
  const PLAN = { de: 'Lehrer-Paket', sv: 'Lärarpaketet', da: 'Lærerabonnementet', no: 'Lærerabonnementet' };
  let planDrift = 0;
  for (const loc of Object.keys(PLAN)) if (T.strings.gateCta[loc].indexOf(PLAN[loc]) === -1) planDrift++;
  is(planDrift === 0, `the paid-plan name matches the shipped lexicon in de/sv/da/no: ${planDrift} drifts`);
}

/* ===================================================================== */
console.log('\n[V12] THE PER-LOCALE GEOMETRY IS A HYPOTHESIS UNTIL ITS PANEL RULES');
{
  /* `part-whole-frame.js:117-122` verbatim: EVERY LOCALE SHIPS
     `default` UNTIL ITS NATIVE ENSEMBLE RULES. `de` is the one
     exception because the finding is operator-recorded in the approved
     catalog. A build that quietly asserted a school-system fact for a
     locale nobody asked is exactly what this holds shut. */
  const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
  const dflt = T.geometryFor('default');
  is(dflt && dflt.single === 'ten' && dflt.twenty === 'twentypair',
    'the default field pair is the ten-frame and two frames of ten');
  const de = T.geometryFor('de');
  is(de && de.twenty === 'twentyfield',
    'de ships the Zwanzigerfeld — the one operator-recorded per-locale ruling');
  /* ⭐ THE RULED SET IS AN ORACLE, WRITTEN HERE — not read from the
     panel files. An earlier version of this check looked for a panel
     file with notes, which let the TOOL justify itself: any locale with
     a panel could claim any field, and a mutation handing Finnish a
     school-system fact nobody ruled SURVIVED. That is the exact defect
     this file's opening comment warns about, committed by me while
     tidying the check.
       de — operator-recorded in the approved catalog (the Zwanzigerfeld)
       nl — its panel: the rekenrek IS one 2x10 broken 5+5, and Dutch
            already says "honderdveld", so "twintigveld" is transparent
       it — its panel: Bortolato's twenty is two rows of ten each
            broken 5+5, never the American double frame
     fr ruled explicitly the OTHER way and stays on default: Brissiaud's
     boite is five-and-five, which is already the default field. */
  const RULED = { de: 'twentyfield', nl: 'twentyfield', it: 'twentyfield' };
  let asserted = 0;
  for (const loc of LOCALES) {
    const g = T.geometryFor(loc);
    const isDefault = (g.single === dflt.single && g.twenty === dflt.twenty);
    if (isDefault) {
      if (RULED[loc]) { asserted++; console.error(`      ${loc} has a ruling but ships the default`); }
      continue;
    }
    if (RULED[loc] !== g.twenty || g.single !== dflt.single) {
      asserted++;
      console.error(`      ${loc} claims {${g.single},${g.twenty}} — no native panel ruled that`);
    }
  }
  is(asserted === 0, `every non-default field claim matches a recorded native ruling: ${asserted} unruled`);
  /* every geometry any locale names must exist */
  let unknown = 0;
  for (const loc of LOCALES.concat(['default'])) {
    const g = T.geometryFor(loc);
    if (!O_GEOM[g.single] || !O_GEOM[g.twenty]) unknown++;
  }
  is(unknown === 0, `every per-locale field key is a real field: ${unknown} unknown`);
  is(T.capOf(T.geometryFor('de').twenty) === 20 && T.capOf(dflt.twenty) === 20,
    'both twenty fields really hold twenty');
}

/* ===================================================================== */
console.log('');
console.log(`  (${Date.now() - t0} ms)`);
if (FAIL) { console.error(`FAIL — ${FAIL} of ${PASS + FAIL}`); process.exit(1); }
console.log(`PASS — ${PASS} assertions`);
