/* =====================================================================
   verify-lids.js — the model gate for TOOL #39, The Lids
   ---------------------------------------------------------------------
   Run:  node scripts/verify-lids.js
   Mutations run it against a copy via LID_TOOL_DIR.

   ZERO CORPUS. Ground truth is implemented HERE and never read off the
   tool — the number-sieve lesson, where 19 of 51 mutations survived
   because the gate derived its expectations from the thing under test.
   Every constant below is HARDCODED for the same reason.

   ⚠ THE CATALOG'S GATE SPEC WAS WRONG AND IS RE-DERIVED HERE. It claims
   "~2,300 configurations". The actual domain over N x k x valid x is
   940 (x>=1) / 1,060 (x>=0) — computed, not estimated. This is the
   second catalog gate spec to be off, after arrow-strip's inverse
   claim, which is why the recipe says re-derive at build time.

     V1  CONSERVATION      hidden + visible === total, always
     V2 ⭐ THE VALUE LOCK   every lid holds exactly the same share
     V3 ⭐ HONEST REMAINDER x = floor(N/k), and what will not share stays
                           visible on the table
     V4  UNREACHABILITY    revealed() throws until the lids are lifted
     V5  DISJOINT + TOTAL  no counter under two lids; none invented
     V6 ⭐ COMMITTED PRIOR  the marker freezes at the lift, by refusal
     V7  NO VERDICT        nothing compares the guess to the share
     V8  NO WORDS ON THE STAGE / no numeral leak in the model
     V9  THE 11-LOCALE BAN poison-tested in BOTH directions
     V10 DETERMINISM       the settle is seeded; no unseeded randomness
     V11 LABELS ARE TRUE   noun-labelled controls do what they say
     V12 IDENTITY          no tasks, one fetch allow-list, no exfil
     V13 THE TABLE BOOK    library + offline fallback
     V14 PURITY + SHAPE    immutable reducers, frozen state shape
     V15 ⭐ THE LID HOLDS WHAT IT HIDES
     V16 ⭐ THE TRUTH LANDS ON THE STRIP  the answer is marked on the
                           same numeral strip the class committed on
     V17 ⭐ NO DEAD STRINGS  every authored key is REACHED, not merely
                           present — the check that would have caught
                           `hintMark` before the operator did
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const TOOL_DIR = process.env.LID_TOOL_DIR || path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(TOOL_DIR, 'lids.js'), 'utf8');
const SRC_NC = SRC.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

let ERRORS = 0;
const err = (m) => { ERRORS++; console.error('  ERROR  ' + m); };

const sandbox = {
  document: { getElementById: () => null, createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }), head: { appendChild() {} }, body: { classList: { add() {}, remove() {} } } },
  window: {}, localStorage: { getItem: () => null, setItem() {} },
  fetch: () => Promise.resolve({ ok: false }), setTimeout: () => 0, clearTimeout() {}, Promise, Math, Date, JSON, console
};
vm.createContext(sandbox);
vm.runInContext(SRC + '\n;this.__T = Lids;', sandbox);
const T = sandbox.__T;
if (!T) { console.error('FATAL: the tool did not define Lids'); process.exit(1); }

const MODEL_END = SRC_NC.indexOf('_loadStore:');
const MODEL = MODEL_END > 0 ? SRC_NC.slice(0, MODEL_END) : SRC_NC;
const RENDER = MODEL_END > 0 ? SRC_NC.slice(MODEL_END) : '';

/* ---- the oracle: hardcoded, independent ---- */
const O_MIN = 4, O_MAX = 30, O_MAXLIDS = 4, O_W = 1000, O_H = 620;
const oShare = (n, k) => (k < 1 ? 0 : Math.floor(n / k));
const oLeft = (n, k) => n - k * oShare(n, k);

/* build a state with n counters and k lids spread across the table */
/* ⚠ THE REACHABLE SET IS {0, 2, 3, 4} AND THE BUILDER HAS TO KNOW IT.
   Placing from an empty table lays TWO lids — one lid takes floor(n/1)=n
   and swallows every counter, which used to be one click from the
   opening frame. So the first addLid buys two, and k=1 is reachable only
   by writing the state directly, which is exactly what the oracle sweep
   below still does: the MODEL must keep answering correctly at k=1 even
   though the interface can no longer get there. That is the difference
   between a refusal and a hole. */
function build(n, k, spread) {
  let st = T.newState();
  st.n = n; st.seed = n * 7919; st.lids = []; st.guess = null; st.lifted = false;
  if (k === 0) return st;
  if (k === 1) {
    /* direct, on purpose — see above */
    st.lids = [{ cx: Math.round(O_W / 2), cy: Math.round(O_H / 2) }];
    return st;
  }
  for (let i = 0; i < k - 1; i++) {
    const cx = spread ? Math.round((O_W / (k + 1)) * (i + 1)) : 200 + i * 37;
    const cy = spread ? Math.round(O_H / 2) : 250 + i * 29;
    const next = T.addLid(st, cx, cy);
    if (!next) return null;
    st = next;
  }
  return st.lids.length === k ? st : null;
}

/* =====================================================================
   V1 / V2 / V3 / V5 — the whole domain, both lid layouts
   ===================================================================== */
(function core() {
  let configs = 0, checkedLids = 0;
  for (const spread of [true, false]) {
    for (let n = O_MIN; n <= O_MAX; n++) {
      for (let k = 1; k <= O_MAXLIDS; k++) {
        const st = build(n, k, spread);
        if (!st) { err(`build failed at n=${n} k=${k}`); return; }
        const x = T.share(st), a = T.assignment(st), vis = T.visibleIndices(st);

        if (x !== oShare(n, k)) { err(`V3 share n=${n} k=${k}: tool ${x}, oracle ${oShare(n, k)}`); return; }

        /* V2 — the lock */
        for (const set of a) {
          if (set.length !== x) { err(`V2 THE LOCK BROKE n=${n} k=${k}: a lid holds ${set.length}, the share is ${x}`); return; }
          checkedLids++;
        }
        /* V5 — disjoint, and nothing invented */
        const all = [].concat(...a);
        if (new Set(all).size !== all.length) { err(`V5 a counter is under two lids at n=${n} k=${k}`); return; }
        for (const i of all) if (!(i >= 0 && i < n)) { err(`V5 out-of-range counter index at n=${n} k=${k}`); return; }
        /* V1 — conservation */
        if (all.length + vis.length !== n) { err(`V1 conservation n=${n} k=${k}: ${all.length}+${vis.length} != ${n}`); return; }
        if (T.hidden(st) !== k * x) { err(`V1 hidden() disagrees at n=${n} k=${k}`); return; }
        /* V3 — the remainder is honest and VISIBLE */
        if (T.leftover(st) !== oLeft(n, k)) { err(`V3 leftover n=${n} k=${k}`); return; }
        if (vis.length !== oLeft(n, k)) { err(`V3 the remainder is not on the table at n=${n} k=${k}`); return; }
        configs++;
      }
    }
  }
  console.log(`V1/V2/V3/V5  ${configs} configurations (n ${O_MIN}..${O_MAX} x k 1..${O_MAXLIDS} x 2 layouts), ${checkedLids} lids — every lid holds the same share, nothing lost, remainder on the table`);
})();

/* =====================================================================
   V2b ⭐ THE RE-SETTLE — the transition is where the lock does its work
   ===================================================================== */
(function resettle() {
  let gaveBack = 0, checked = 0;
  for (let n = O_MIN; n <= O_MAX; n++) {
    for (let k = 1; k < O_MAXLIDS; k++) {
      let st = build(n, k, true);
      const before = T.assignment(st).map((s) => s.length);
      const gap = O_W / (k + 2);
      const next = T.addLid(st, Math.round(gap * (k + 1)), Math.round(O_H / 2));
      if (!next) { err(`V2b addLid refused at n=${n} k=${k}`); return; }
      const after = T.assignment(next).map((s) => s.length);
      const xa = oShare(n, k + 1);
      for (const c of after) if (c !== xa) { err(`V2b after the drop a lid holds ${c}, the new share is ${xa} (n=${n} k=${k}->${k + 1})`); return; }
      if (before[0] > after[0]) gaveBack++;
      checked++;
    }
  }
  /* ⚠ the invariant is only interesting if the giving-back HAPPENS —
     an assertion that is almost never exercised is vacuous (the recorded
     folding-sheet ghost-invariant lesson) */
  if (!gaveBack) { err('V2b no configuration ever made an existing lid give counters back — the invention is not being exercised'); return; }
  console.log(`V2b re-settle: ${checked} drops, the share re-derives every time, and ${gaveBack} of them made an existing lid GIVE COUNTERS BACK`);
})();

/* =====================================================================
   V15 ⭐ THE LID HOLDS WHAT IT HIDES — and every lid is the same size
   The apparatus must not claim anything it does not show. A lid is drawn
   big enough to hold its share packed in hexagonal rings, and on the
   lift those counters are shown sitting inside it in exactly that
   packing. Three laws, all exhaustive:
     a. THE PACKING FITS      every packed counter is inside the circle
     b. THE PACKING IS TIDY   no two counters under a lid overlap
     c. ⭐ ONE SIZE, NEVER GROWING   every lid of a colour is identical
                              (the value lock, visible), and dropping
                              another lid never makes them bigger
   ⚠ (c) is gated only because the SECOND design made it true. It was
   asserted once against a geometry-derived radius, measured, and found
   FALSE — 50 shrank, 77 held, 35 GREW — and the honest response was to
   fix the design, not to soften the law into a percentage.
   ===================================================================== */
(function honest() {
  let checked = 0, tightest = Infinity, closest = Infinity;
  for (let n = O_MIN; n <= O_MAX; n++) {
    for (let k = 1; k <= O_MAXLIDS; k++) {
      const st = build(n, k, true);
      const x = T.share(st), r = T.lidRadius(st), pack = T.packing(x);
      let reach = 0;
      for (const p of pack) reach = Math.max(reach, Math.sqrt(p.dx * p.dx + p.dy * p.dy));
      if (pack.length !== x) { err(`V15 the packing holds ${pack.length} but the share is ${x} at n=${n} k=${k}`); return; }
      if (r < 44) { err(`V15 lid radius ${r} at n=${n} k=${k} is under the tap floor`); return; }
      /* ⚠ THIS LAW WAS RE-DERIVED IN THE 2026-08 REBUILD, BECAUSE THE OLD
         FORM CONDEMNED CORRECT GEOMETRY. It used to require pack[0] to be
         the exact centre — true of the old fixed-pitch hexagonal rings,
         and FALSE of the tightest arrangement for small shares: four
         counters pack as a square with nothing in the middle, and that is
         the smallest circle that holds them. A centre-point law would
         force a strictly worse packing.
         The defect it was written for is real and is still caught, by two
         stronger laws that do not care about the arrangement:
           (a) the pile is CENTRED — its centroid sits on the lid's own
               centre, so no counter can sit off to one side of an
               oversized lid (the mutation that motivated the original);
           (b) the lid is TIGHT — its radius is the reach plus one counter
               radius, never slack, unless MIN_R is what is binding.
         Together those forbid "an oversized lid with the pile pushed to
         the edge" without forbidding a legitimate ring. */
      let sx = 0, sy = 0;
      for (const p of pack) { sx += p.dx; sy += p.dy; }
      const off = Math.sqrt((sx / pack.length) ** 2 + (sy / pack.length) ** 2);
      if (pack.length && off > 1e-6) {
        err(`V15 the pile is not centred under its lid at n=${n} k=${k} (centroid ${off.toFixed(2)} units off)`); return;
      }
      if (r > Math.max(T.MIN_R, reach + T.C_R) + 1) {
        err(`V15 the lid is slack at n=${n} k=${k}: radius ${r} against a reach of ${Math.round(reach)}`); return;
      }
      /* ⚠ AND THE LID IS NO BIGGER THAN IT NEEDS. "Fits" alone is
         satisfied by drawing every lid the size of the table. This
         cross-checks lidRadius() against packing() — two functions, so
         it is not the gate reading its expectation off the one thing it
         is testing. */
      let far = 0;
      for (const q of pack) far = Math.max(far, Math.sqrt(q.dx * q.dx + q.dy * q.dy));
      /* ⚠ CEIL, NOT ROUND — the oracle itself was wrong, and in the
         dangerous direction. Rounding permits a lid up to half a unit
         SMALLER than its own contents: at share 9 the pile reaches 101.24
         and round() asks for 101, so the outer counters sit outside the
         circle that claims to hold them. The tool had exactly that defect
         until this same law caught it from the other side. The 1e-9 shave
         kills floating-point dust (six counters reach exactly 56 and
         compute as 56.000000000000014), which would otherwise buy a unit
         of slack out of nothing. */
      const want = Math.ceil(Math.max(T.MIN_R, far + T.C_R) - 1e-9);
      if (r !== want) { err(`V15 the lid is ${r} at n=${n} k=${k} but its contents need ${want} — padded, not measured`); return; }
      /* a. every packed counter inside the circle */
      for (const q of pack) {
        const d = Math.sqrt(q.dx * q.dx + q.dy * q.dy) + T.C_R;
        if (d > r + 1) { err(`V15 THE LID DOES NOT HOLD IT at n=${n} k=${k}: a counter needs ${Math.round(d)}, the lid is ${r}`); return; }
        tightest = Math.min(tightest, r - d);
      }
      /* b. no two counters under one lid overlap */
      for (let a = 0; a < pack.length; a++) {
        for (let b = a + 1; b < pack.length; b++) {
          const dx = pack[a].dx - pack[b].dx, dy = pack[a].dy - pack[b].dy;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 2 * T.C_R - 1) { err(`V15 two counters overlap under one lid at n=${n} k=${k} (${d.toFixed(1)} apart, need ${2 * T.C_R})`); return; }
          closest = Math.min(closest, d);
        }
      }
      checked++;
    }
  }
  /* c. ⭐ one size, and it shrinks */
  let shrank = 0, tried = 0;
  for (let n = O_MIN; n <= O_MAX; n++) {
    for (let k = 1; k < O_MAXLIDS; k++) {
      const st = build(n, k, true);
      const p = T._farPoint(st);
      const next = T.addLid(st, p.cx, p.cy);
      if (!next) continue;
      tried++;
      const before = T.lidRadius(st), after = T.lidRadius(next);
      if (after > before) { err(`V15 a lid GREW when another went down at n=${n} k=${k}: ${before} -> ${after}`); return; }
      if (after < before) shrank++;
    }
  }
  /* ⚠ THE LAW IS "NEVER GROWS", NOT "ALWAYS SHRINKS" — asserted above,
     exhaustively, and it holds. A ">= half the time" threshold was
     written here first and failed at 38/81, and the reason is not a
     defect: the radius is a STEP function of the share, so 6 counters
     and 4 counters both need exactly one hexagonal ring and the lid
     honestly stays the same size. Loosening a percentage until it passes
     is how a gate stops meaning anything; the monotonic law is the real
     one. All that is left to rule out is a law that never fires. */
  if (!shrank) err('V15 dropping a lid never shrank the rest even once — the non-increasing law is vacuous');

  /* "Another lid" must not drop one on top of another */
  let minSep = Infinity;
  for (let n = O_MIN; n <= O_MAX; n += 3) {
    let st = build(n, 1, true);
    for (let k = 2; k <= O_MAXLIDS; k++) {
      const p = T._farPoint(st);
      st = T.addLid(st, p.cx, p.cy);
      for (let i = 0; i < st.lids.length; i++) {
        for (let j = i + 1; j < st.lids.length; j++) {
          const dx = st.lids[i].cx - st.lids[j].cx, dy = st.lids[i].cy - st.lids[j].cy;
          minSep = Math.min(minSep, Math.sqrt(dx * dx + dy * dy));
        }
      }
    }
  }
  if (minSep < 150) err(`V15 "Another lid" places lids ${Math.round(minSep)} apart — they would land in a heap`);

  /* ⚠ AND THE BUTTON MUST ACTUALLY USE IT. The check above proves
     _farPoint spreads lids out; it says nothing about whether anything
     CALLS it. Mutation caught exactly that gap: restoring the old
     marching W/(k+2) placement inside the click handler left every model
     assertion green while three lids landed in a heap on screen. */
  const addAt = RENDER.indexOf("api.t('addLid')");
  if (addAt < 0) err('V15 the "Another lid" control was not found');
  else if (RENDER.slice(addAt, addAt + 700).indexOf('_farPoint(') === -1) {
    err('V15 "Another lid" does not place through _farPoint — the lids would land on top of each other');
  }
  /* AND THE LIFT MUST SEAT THE COUNTERS IN THE PACKING, not scatter them
     back where they came from — which answers the question with a shrug */
  /* ⚠ ANCHOR ON THE BUILDER, THEN ON ITS BRANCH. A bare search for
     `if (s.lifted) {` finds the HINT LADDER's branch first — it is
     earlier in the file and has the identical text — so the three laws
     below were being measured against the wrong function entirely. */
  const tableAt = RENDER.indexOf('_buildTable: function');
  const liftAt = tableAt < 0 ? -1 : RENDER.indexOf('if (s.lifted) {', tableAt);
  if (liftAt < 0) err('V15 the lifted branch of the table was not found');
  else if (RENDER.slice(liftAt, liftAt + 1800).indexOf('lid.cx + pack[q].dx') === -1) {
    /* ⚠ anchored on the SEATING EXPRESSION, not on a nearby `packing(`
       token: the old form measured proximity and would have passed a
       branch that merely mentioned the packing without using it. */
    err('V15 the lift does not seat the counters under their own lid');
  }
  /* ⭐⭐ AND AT THE LIFT THE LIDS ARE PAINTED FIRST, SO THE COUNTERS SIT
     ON TOP OF THEM. The shipped build appended counters first and lids
     second with no z-index, so the lid painted last — over its own
     answer. At `.lid-up` opacity .32 that veiled every revealed counter:
     measured, coral at 32% over #146B5E blends to #5B6F58, which is
     1.17:1 against an unveiled neighbour. The one thing the lift exists
     to show is WHICH counters were under WHICH lid, and the old paint
     order destroyed exactly that. No count, class or geometry assertion
     could see it — only the render could. */
  if (liftAt >= 0) {
    const branch = RENDER.slice(liftAt, liftAt + 1800);
    const lidsAt = branch.indexOf('paintLids()');
    const seatAt = branch.indexOf('lid.cx + pack[q].dx');
    if (lidsAt < 0 || seatAt < 0 || lidsAt > seatAt) {
      err('V15 at the lift the lids are not painted before the counters — the reveal would be veiled by its own lid');
    }
    /* and the other way round while they are DOWN: a cover that does not
       cover is not a cover */
    const elseAt = RENDER.indexOf('} else {', liftAt);
    const down = elseAt > 0 ? RENDER.slice(elseAt, elseAt + 400) : '';
    if (down.indexOf('paintLids()') < 0 || down.indexOf('_counter(') > down.indexOf('paintLids()')) {
      err('V15 while the lids are down they are not painted last — they would not cover the counters');
    }
  }
  console.log(`V15 the lid holds what it hides: ${checked} configurations — every packed counter inside its circle (tightest ${Math.round(tightest)} units of room, closest pair ${Math.round(closest)} apart against a floor of ${2 * T.C_R}); ONE size for every lid, and dropping another never grows them (it shrinks them in ${shrank}/${tried}); auto-placed lids ${Math.round(minSep)} apart`);
})();
/* =====================================================================
   V4 — unreachability
   ===================================================================== */
(function unreachable() {
  let st = build(12, 3, true);
  let threw = false;
  try { T.revealed(st); } catch (_) { threw = true; }
  if (!threw) { err('V4 revealed() did not throw while the lids were down'); return; }
  const up = T.lift(st);
  let got = null;
  try { got = T.revealed(up); } catch (_) {}
  if (!got) { err('V4 revealed() still throws after the lift'); return; }
  if (got.share !== oShare(12, 3) || got.leftover !== oLeft(12, 3)) { err('V4 the reveal disagrees with the oracle'); return; }
  if (T.lift(up) !== null) err('V4 an already-lifted table could be lifted again');
  if (T.lift(T.newState()) !== null) err('V4 a table with no lids could be lifted');
  /* the model must not expose the share through any other reader */
  if (/share\s*:\s*function/.test(MODEL) && !/lifted/.test(SRC_NC.slice(SRC_NC.indexOf('revealed:')))) {
    err('V4 revealed() does not gate on lifted');
  }
  console.log('V4  unreachability: revealed() throws until the lids are lifted, then agrees with the oracle');
})();

/* =====================================================================
   V6 / V7 — the committed prior, and no verdict on it
   ===================================================================== */
(function prior() {
  let st = build(12, 3, true);
  /* ⚠ POISON FIRST: it must MOVE before the lift, or "it cannot be
     changed afterwards" is true for the boring reason. */
  const moved = T.placeGuess(st, 4);
  if (!moved || moved.guess !== 4) { err('V6 the marker cannot be placed at all'); return; }
  const toggled = T.placeGuess(moved, 4);
  if (!toggled || toggled.guess !== null) { err('V6 tapping the same numeral does not clear the marker'); return; }
  const up = T.lift(moved);
  for (let v = 0; v <= 12; v++) {
    if (T.placeGuess(up, v) !== null) { err('V6 the marker moved after the lift'); return; }
  }
  if (up.guess !== 4) { err('V6 the guess did not survive the lift'); return; }
  if (T.placeGuess(st, -1) !== null || T.placeGuess(st, 999) !== null) err('V6 an out-of-range guess was accepted');

  /* ⭐ V6b — THE STRIP REFUSES UNTIL THERE IS A QUESTION. The operator's
     report was "the numbers under the board has no function", and the
     state they were looking at had NO LIDS ON THE TABLE: nothing had
     been asked, and the strip took an answer anyway. Two lids is the
     floor, because one lid is the subtraction this tool refuses to be. */
  for (let k = 0; k <= 1; k++) {
    const thin = build(12, k, true);
    for (let v = 0; v <= 12; v++) {
      if (T.placeGuess(thin, v) !== null) {
        err(`V6b a marker was parked with ${k} lid(s) on the table — there is no question yet`); return;
      }
    }
  }
  if (!T.placeGuess(build(12, 2, true), 5)) { err('V6b POISON: two lids is refused too — the floor is wrong'); return; }

  /* ⭐ V6c — CHANGING THE QUESTION VOIDS THE COMMITMENT. "Now put a third
     one down" is the routine's whole move; a marker parked for two lids
     is not an answer to the three-lid question, and carrying it over
     would be the tool silently re-using an old commitment. */
  const two = T.placeGuess(build(20, 2, true), 10);
  if (!two || two.guess !== 10) { err('V6c could not park a marker on the two-lid table'); return; }
  const three = T.addLid(two, 500, 300);
  if (!three || three.guess !== null) { err('V6c adding a lid did not void the commitment'); return; }
  const back = T.removeLid(T.placeGuess(build(20, 3, true), 6));
  if (!back || back.guess !== null) { err('V6c removing a lid did not void the commitment'); return; }
  /* ...but moving one does NOT, because the share is unchanged by where
     a lid sits; and neither does lowering, so the class can look again */
  const moved2 = T.moveLid(T.placeGuess(build(20, 3, true), 6), 0, 300, 400);
  if (!moved2 || moved2.guess !== 6) { err('V6c sliding a lid wrongly voided the commitment'); return; }
  const relid = T.lower(T.lift(T.placeGuess(build(20, 3, true), 6)));
  if (!relid || relid.guess !== 6) { err('V6c putting the lids back on wrongly voided the commitment'); return; }

  /* ⚠ `closest` IS NARROWED, AND THE NARROWING IS AUDITABLE, NOT A
     LOOSENING. The stylesheet legitimately contains CSS's own
     `radial-gradient(circle closest-side …)` — six times, in the lid and
     the counter — and `\bclosest\b` matched it, because a hyphen is a
     word boundary. So the gate condemned correct CSS as verdict
     machinery: the ban-too-wide trap, in its fourth recorded dress. The
     word is still banned as a WORD; only the CSS keyword is exempt, and
     the poison below proves both directions. */
  const VERDICT = /(?<!\p{L})(score|scoring|correct|incorrect|wrong|winner|wins|verdict|rank|ranking|closest(?!-side)|better|worse|accuracy|streak)(?!\p{L})/iu;
  if (VERDICT.test('radial-gradient(circle closest-side at 50% 50%)')) {
    err('V7 POISON: the verdict ban rejects CSS closest-side, which is correct code');
  }
  if (!VERDICT.test('the closest guess wins')) {
    err('V7 POISON: the verdict ban no longer fires on real verdict prose');
  }
  if (VERDICT.test(SRC_NC)) err(`V7 verdict machinery in the source ("${SRC_NC.match(VERDICT)[0]}")`);
  if (/lid-(correct|wrong|right|good|bad|win|fail)/.test(SRC)) err('V7 a verdict class name exists');
  /* nothing may compare the guess with the share */
  if (/guess[^;\n]*===[^;\n]*share|share[^;\n]*===[^;\n]*guess/.test(SRC_NC)) err('V7 the guess is compared with the share');
  if (!VERDICT.test('var score = 1;')) err('V7 POISON: the verdict ban no longer fires');
  console.log('V6/V7 committed prior: refuses until two lids are down, moves freely, is voided when the question changes, freezes at the lift by refusal, and is never marked');
})();

/* =====================================================================
   V8 — no words on the stage, no numeral leak in the model
   ===================================================================== */
(function nowords() {
  const STAGE = ['_buildTable', '_counter', '_buildStrip'];
  for (const fn of STAGE) {
    const at = SRC_NC.indexOf(fn + ': function');
    if (at < 0) { err(`V8 stage builder ${fn} not found`); continue; }
    const rest = SRC_NC.slice(at + 1);
    const end = rest.search(/\n {2}[_a-zA-Z]+: function/);
    const body = end > 0 ? rest.slice(0, end) : rest;
    if (/\.innerHTML\s*=/.test(body)) err(`V8 ${fn} writes innerHTML onto the stage`);
    /* the strip legitimately prints numerals (the law allows them); the
       table must print nothing at all */
    if (fn !== '_buildStrip' && /\.textContent\s*=/.test(body)) err(`V8 ${fn} writes a text node onto the table`);
  }
  /* the share must never be rendered before the lift */
  if (/textContent\s*=\s*String\(\s*(this\.)?share/.test(SRC_NC)) err('V8 the share is rendered as text');
  for (const key of Object.keys(T.strings)) {
    for (const loc of LOCALES) {
      const v = T.strings[key][loc];
      if (typeof v !== 'string') { err(`V8 ${key} has no ${loc} string`); continue; }
      if (v.indexOf('%') !== -1) err(`V8 ${key}.${loc} carries a percent sign`);
    }
  }
  console.log('V8  no words on the table; the numeral strip is the only place a numeral is authored');
})();

/* =====================================================================
   V9 — the 11-locale ban, BOTH directions
   ⚠ Two lessons converge here. The ban must FIRE on a verdict word, and
   it must PASS the tool's own vocabulary — the recorded Zufallsbeutel
   defect, where a ban on the SUBJECT word would have rejected the German
   panel's own name. And the brand ban is word-boundary anchored because
   the corpus already contains Dutch `Koekjesplaten`.
   ===================================================================== */
(function locales() {
  /* ⚠⚠ `\b` IS ASCII-ONLY, EVEN UNDER /u, AND THAT MADE THESE BANS LIE.
     The Finnish panel measured it on this very file and I reproduced it:

         /\bpöytä\b/.test('pöytä')       -> false    the bare word: MISSED
         /\bpöytä\b/.test('pöytäliina')  -> true     a compound: FALSE POSITIVE
         /\bväärä\b/i.test('Väärä!')     -> false    even with the /u flag

     The old Finnish ban worked ONLY BY LUCK — `oikein`, `väärin` and
     `hyvin tehty` all happen to begin and end with ASCII letters — and
     its poison example was `oikein`, so the poison could never reveal the
     gap. That is "a poison set is only as good as its examples" exactly.
     `väärä`, the most natural Finnish verdict, was invisible to it; so
     were `rätt`-class Swedish forms the moment anyone widened them.
     Every ban is now (?<!\p{L})…(?!\p{L}) with /u, and every MUSTFIRE is
     a word that would have EXPOSED the bug in its own language. */
  const W = (alts) => new RegExp('(?<!\\p{L})(' + alts + ')(?!\\p{L})', 'iu');
  const BAN = {
    en: W('correct|wrong|well done|good job'),
    de: W('richtig|falsch|gut gemacht'),
    fr: W('correct|faux|bravo|bien joué'),
    es: W('correcto|incorrecto|bien hecho'),
    pt: W('correto|errado|muito bem'),
    it: W('giusto|sbagliato|bravo'),
    nl: W('goed zo|fout|correct'),
    sv: W('rätt|fel|bra jobbat|rätta'),
    da: W('rigtigt|forkert|godt klaret'),
    no: W('riktig|galt|bra jobba'),
    fi: W('oikein|väärin|väärä|hyvin tehty')
  };
  /* ⚠ EVERY ONE OF THESE ENDS IN A NON-ASCII LETTER WHERE THE LANGUAGE
     HAS ONE, so a regression to \b fails the poison instead of passing
     it. `väärä` and `rätta` are the two that the old form could not see. */
  const MUSTFIRE = { en: 'correct', de: 'richtig', fr: 'bravo', es: 'correcto', pt: 'errado', it: 'giusto', nl: 'fout', sv: 'rätta', da: 'forkert', no: 'riktig', fi: 'väärä' };
  /* and the other direction: correct native prose that must NOT fire */
  const MUSTPASS = { en: 'Lift the lids.', de: 'Hebt die Deckel an.', fr: 'Soulevez les couvercles.', es: 'Destapar', pt: 'Destampar', it: 'Alza i coperchi', nl: 'Deksels optillen', sv: 'Lyft på locken', da: 'Løft lågene', no: 'Løft lokkene', fi: 'Vetäkää pöydälle kaksi kantta.' };
  for (const loc of LOCALES) {
    if (BAN[loc].test(MUSTPASS[loc])) err(`V9 POISON: the ${loc} verdict ban is TOO WIDE — it rejects "${MUSTPASS[loc]}"`);
  }
  /* the ASCII-only regression, named so it cannot come back quietly */
  if (/\bväärä\b/iu.test('Väärä!')) err('V9 POISON: \\b unexpectedly works on Finnish — re-derive this check');
  if (!BAN.fi.test('Väärä!')) err('V9 POISON: the Finnish ban cannot see a Finnish verdict');

  /* ⚠ THE BRAND. Word-boundary anchored on purpose: the corpus contains
     the Dutch `Koekjesplaten` (baking trays) and a bare substring ban
     would reject correct Dutch — the `par`-rejects-French defect again. */
  const BRAND = /(?<!\p{L})splat\p{L}*(?!\p{L})/iu;
  if (!BRAND.test('a splat mat')) err('V9 POISON: the brand ban no longer fires');
  if (BRAND.test('Koekjesplaten')) err('V9 POISON: the brand ban is too wide — it rejects the Dutch Koekjesplaten');

  for (const loc of LOCALES) {
    if (!BAN[loc].test(MUSTFIRE[loc])) { err(`V9 POISON: the ${loc} verdict ban no longer fires on "${MUSTFIRE[loc]}"`); continue; }
    for (const key of Object.keys(T.strings)) {
      const v = T.strings[key][loc];
      if (typeof v !== 'string') continue;
      if (BAN[loc].test(v)) err(`V9 a verdict word in ${key}.${loc}`);
      if (BRAND.test(v)) err(`V9 the brand word in ${key}.${loc}`);
    }
  }
  const INVIS = /[­​-‍⁠﻿ --]/;
  for (const key of Object.keys(T.strings)) {
    for (const loc of LOCALES) {
      const v = T.strings[key][loc];
      if (typeof v === 'string' && INVIS.test(v)) err(`V9 an invisible character in ${key}.${loc}`);
    }
  }
  if (!INVIS.test('a­b')) err('V9 POISON: the invisible-character ban no longer fires');
  console.log('V9  11 locales: no verdict word, no brand word, no invisibles — every ban poison-tested both ways');
})();

/* =====================================================================
   V10 — determinism, and no unseeded randomness
   ===================================================================== */
(function determinism() {
  const BANNED = /\b(Math\s*\.\s*random|crypto\s*\.\s*getRandomValues|performance\s*\.\s*now)\b/;
  if (BANNED.test(SRC_NC)) err('V10 unseeded randomness is reachable in the tool');
  if (/\b(Date\s*\.\s*now|new\s+Date)\b/.test(MODEL)) err('V10 the model reads the clock');
  if (!BANNED.test('var x = Math.random();')) err('V10 POISON: the randomness ban no longer fires');
  for (let n = O_MIN; n <= O_MAX; n += 3) {
    const a = JSON.stringify(T.scatter(build(n, 2, true)));
    const b = JSON.stringify(T.scatter(build(n, 2, true)));
    if (a !== b) { err(`V10 the scatter is not deterministic at n=${n}`); return; }
    const p = JSON.stringify(T.assignment(build(n, 3, true)));
    const q = JSON.stringify(T.assignment(build(n, 3, true)));
    if (p !== q) { err(`V10 the settle is not deterministic at n=${n}`); return; }
  }
  /* ⭐ ONE INVARIANT NO OUTPUT GATE CAN SEE. Array.prototype.sort is
     stable on V8, so dropping the index tie-break from the settle's
     comparator changes NOTHING observable here — and would still be a
     defect, because stability is not guaranteed by the language and a
     different engine (or a future one) may reorder equidistant counters,
     making the same table settle differently in two browsers. Mutation
     testing surfaced this as a survivor; the honest fix is a STRUCTURAL
     assertion, not a pretend behavioural one. */
  const CMPS = SRC_NC.match(/\.sort\(function \(a, b\) \{ return [^;]*[ad]\.[dijregt]+ [-+][^;]*; \}\)/g) || [];
  const RANK = CMPS.filter((c) => /a\.d - b\.d/.test(c));
  const ORDER = CMPS.filter((c) => /regret/.test(c));
  if (!RANK.length) err('V10 the per-counter distance ranking was not found');
  else if (!RANK.every((c) => /\|\|\s*a\.i - b\.i/.test(c))) {
    err('V10 the distance ranking has no lid-index tie-break — two lids equally far would order by sort stability');
  }
  if (!ORDER.length) err('V10 the regret ordering was not found');
  else if (!ORDER.every((c) => /\|\|\s*a\.j - b\.j/.test(c))) {
    err('V10 the regret ordering has no counter-index tie-break — equally-torn counters would order by sort stability');
  }
  console.log('V10 determinism: the scatter and the settle replay identically; the comparator breaks ties by index; no unseeded randomness, no clock in the model');
})();

/* =====================================================================
   V11 — labels are true
   ===================================================================== */
(function labels() {
  /* ⚠ THE PLACING CONTROL NOW GOES THROUGH ONE HOP, AND THE LAW FOLLOWS
     IT RATHER THAN BEING DROPPED. Three surfaces place a lid — the chip,
     a ghost, and the keyboard — so they share `_placeFrom`, which is the
     single site that calls addLid and the single site that speaks. The
     label-truth law therefore checks the hop AND that the hop lands. */
  const PAIRS = [['addLid', '_placeFrom('], ['firstLid', '_placeFrom('],
                 ['takeLid', 'removeLid('], ['newSetBtn', '_stepSetup(']];
  if (!/_placeFrom:\s*function[\s\S]{0,400}?this\.addLid\(/.test(SRC)) {
    err('V11 _placeFrom does not call addLid — the placing controls promise a lid and land nowhere');
  }
  for (const [key, call] of PAIRS) {
    const needle = `api.t('${key}')`;
    let at = RENDER.indexOf(needle), found = false, seen = 0;
    while (at >= 0) {
      seen++;
      if (RENDER.slice(at, at + 800).indexOf(call) >= 0) { found = true; break; }
      at = RENDER.indexOf(needle, at + 1);
    }
    if (!seen) { err(`V11 the control labelled ${key} was not found`); continue; }
    if (!found) err(`V11 no site labelled ${key} calls ${call}`);
  }

  /* ⭐ THE TOGGLE. One button carries two labels, so "the label is true"
     becomes "the two ternaries agree". A swapped branch here ships a
     button that READS "Lift the lids" and PUTS THEM BACK — the label is
     individually present, individually spelled right, and wrong. */
  /* ⚠ `(?:\w+\.)*` and NOT `[\w.]*` — the latter is greedy across the dot,
     so `self.lower(` backtracks to a capture of "r". The first draft of
     this check reported a SWAPPED TOGGLE on a correct tool. Every
     narrowed regex gets poison-tested on a synthetic pair below. */
  const LABEL = /\.textContent\s*=\s*api\.t\(\s*(?:\w+\.)*lifted\s*\?\s*'(\w+)'\s*:\s*'(\w+)'\s*\)/;
  const ACTION = /lifted\s*\?\s*(?:\w+\.)*(\w+)\(\s*[\w.]+\s*\)\s*:\s*(?:\w+\.)*(\w+)\(/;
  const GOOD = "var next = self.st.lifted ? self.lower(self.st) : self.lift(self.st);";
  const BAD = "var next = self.st.lifted ? self.lift(self.st) : self.lower(self.st);";
  const g = GOOD.match(ACTION), b = BAD.match(ACTION);
  if (!g || g[1] !== 'lower' || g[2] !== 'lift') err(`V11 POISON: the action regex mis-extracts a CORRECT toggle (${g && g[1]}/${g && g[2]})`);
  if (!b || b[1] !== 'lift' || b[2] !== 'lower') err('V11 POISON: the action regex cannot see a swapped toggle');
  const lm = RENDER.match(LABEL);
  if (!lm) { err('V11 the lift/again toggle label was not found'); }
  else {
    const after = RENDER.slice(RENDER.indexOf(lm[0]));
    const am = after.slice(0, 1200).match(ACTION);
    if (!am) err('V11 the lift/again toggle has a label but no branching action beside it');
    else {
      const WANT = { againBtn: 'lower', liftBtn: 'lift' };
      if (WANT[lm[1]] !== am[1] || WANT[lm[2]] !== am[2]) {
        err(`V11 THE TOGGLE IS SWAPPED — the button reads ${lm[1]}/${lm[2]} but calls ${am[1]}()/${am[2]}()`);
      }
      /* poison: prove the pairing check can fail */
      if (WANT.againBtn === 'lift') err('V11 POISON: the toggle pairing table is degenerate');
    }
  }
  /* "another table" must land on a table that renders differently */
  const inst = Object.create(T);
  inst.api = { lang: 'en', t: (k) => k, el: () => ({ setAttribute() {}, appendChild() {}, addEventListener() {}, classList: { add() {} }, style: {} }) };
  inst.premium = true;
  inst.data = T.FALLBACK_SETUPS;
  inst._setupIdx = 0;
  inst.st = T.loadSetup(T.newState(), T.FALLBACK_SETUPS.setups[0]);
  inst.render = function () {};
  const sig = (s) => s.n + ':' + s.lids.length;
  const first = sig(inst.st);
  inst._stepSetup();
  if (sig(inst.st) === first) err('V11 "another table" stepped to a table that renders identically');
  console.log('V11 labels are true: every noun-labelled control calls what it promises');
})();

/* =====================================================================
   V12 / V13 / V14
   ===================================================================== */
(function rest() {
  if (T.tasks || T.nextTask) err('V12 this is a free-play instrument and must declare no tasks');
  const urls = (SRC_NC.match(/fetch\(\s*'([^']+)'/g) || []).map((m) => m.replace(/fetch\(\s*'/, '').replace(/'$/, ''));
  const want = ['/api/auth/me', '/mini-tools/lids-setups.json'].sort().join(',');
  if (urls.sort().join(',') !== want) err(`V12 the fetch allow-list is ${urls.join(',')}, expected ${want}`);
  if (/method\s*:\s*['"]POST['"]/i.test(SRC_NC)) err('V12 the tool POSTs somewhere');
  if (/lcs:my-classes/.test(SRC_NC)) err('V12 the tool touches the name-sticks roster store');
  if (T.STORE_KEY !== 'lcs:lids:v1') err('V12 the store key is ' + T.STORE_KEY);

  /* V13 the table book + its fallback */
  let BOOK = null;
  try { BOOK = JSON.parse(fs.readFileSync(path.join(TOOL_DIR, 'lids-setups.json'), 'utf8')); }
  catch (e) { err('V13 cannot read lids-setups.json: ' + e.message); }
  if (BOOK) {
    const FIELDS = ['id', 'n', 'k', 'free'];
    const ids = new Set();
    let free = 0;
    for (const r of BOOK.setups || []) {
      for (const f of Object.keys(r)) if (FIELDS.indexOf(f) === -1) err(`V13 setup ${r.id} carries an extra field "${f}"`);
      if (!/^t-\d{3}$/.test(r.id)) err(`V13 bad id shape "${r.id}"`);
      if (ids.has(r.id)) err(`V13 duplicate id ${r.id}`);
      ids.add(r.id);
      if (!(r.n >= O_MIN && r.n <= O_MAX)) err(`V13 setup ${r.id} total ${r.n} out of range`);
      if (!(r.k >= 1 && r.k <= O_MAXLIDS)) err(`V13 setup ${r.id} lid count ${r.k} out of range`);
      /* ⚠ a setup whose total divides exactly every time never shows a
         remainder — the book must carry both kinds or the tool only ever
         teaches half of itself */
      if (r.free) free++;
    }
    if (free !== BOOK.freeMax) err(`V13 freeMax says ${BOOK.freeMax} but ${free} setups are free`);
    const sharing = (BOOK.setups || []).filter((r) => oLeft(r.n, r.k) > 0).length;
    if (!sharing) err('V13 not one setup in the book leaves a remainder — the honest-remainder invariant is never seen');
    const fb = T.FALLBACK_SETUPS;
    if (!fb || !fb.setups || !fb.setups.length) err('V13 the offline fallback is empty');
    else {
      if (fb.setups.some((s) => !s.free)) err('V13 the offline fallback carries a paid setup');
      const freeIds = (BOOK.setups || []).filter((s) => s.free).map((s) => s.id).join(',');
      if (fb.setups.map((s) => s.id).join(',') !== freeIds) err('V13 the fallback ids do not match the free setups');
    }
    /* entitlement really filters */
    const probe = Object.create(T);
    probe.data = BOOK; probe.premium = false;
    if (probe.setupsFor().length !== free) err('V13 a free account can reach more than the free setups');
    probe.premium = true;
    if (probe.setupsFor().length !== (BOOK.setups || []).length) err('V13 a paid account cannot reach the whole book');
  }

  /* V14 purity + shape */
  const SHAPE = ['n', 'seed', 'lids', 'guess', 'lifted'].sort().join(',');
  const st0 = T.newState();
  if (Object.keys(st0).sort().join(',') !== SHAPE) err(`V14 the state shape is ${Object.keys(st0).sort().join(',')}, expected ${SHAPE}`);
  const probes = [
    ['addLid', (s) => T.addLid(s, 300, 300)],
    /* ⚠ placeGuess is probed through a TWO-LID state. It now refuses on a
       bare newState(), so probing it there returns null, skips the shape
       check and exercises nothing — a passing assertion that tests
       nothing at all. */
    ['placeGuess', (s) => T.placeGuess(T.addLid(T.addLid(s, 300, 300), 700, 300), 3)],
    ['setTotal', (s) => T.setTotal(s, 16)],
    ['lift', (s) => T.lift(T.addLid(s, 300, 300))],
    ['lower', (s) => T.lower(T.lift(T.addLid(s, 300, 300)))],
    ['removeLid', (s) => T.removeLid(T.addLid(s, 300, 300))],
    ['moveLid', (s) => T.moveLid(T.addLid(s, 300, 300), 0, 500, 400)],
    ['loadSetup', (s) => T.loadSetup(s, { id: 't-001', n: 12, k: 2, free: true })]
  ];
  for (const [name, fn] of probes) {
    const s = T.newState();
    const snap = JSON.stringify(s);
    const out = fn(s);
    if (JSON.stringify(s) !== snap) err(`V14 ${name} mutated its input`);
    /* ⭐ THE SHAPE MUST HOLD ON THE WAY OUT TOO. Checking only newState()
       misses the case a state GROWS a field — which is exactly how a
       cached share or a verdict flag gets into the tree, one reducer at
       a time. (Caught by mutation: `lift` grew a `revealedAt`.) */
    if (out && Object.keys(out).sort().join(',') !== SHAPE) {
      err(`V14 ${name} returned a state shaped ${Object.keys(out).sort().join(',')}, expected ${SHAPE}`);
    }
  }
  const src = build(12, 2, true);
  const out = T.addLid(src, 500, 300);
  if (out && out.lids === src.lids) err('V14 addLid shares its input\'s lids array rather than copying it');
  if (T.setTotal(build(12, 2, true), 16) !== null) err('V14 the total changed while lids were down instead of refusing');
  if (T.setTotal(T.newState(), 99) !== null) err('V14 an out-of-range total was accepted');
  if (T.addLid(build(12, 4, true), 500, 300) !== null) err('V14 a fifth lid was accepted');
  if (T.removeLid(T.newState()) !== null) err('V14 a lid was removed from an empty table');
  for (const h of [null, undefined, 0, '', []]) {
    try { T.share(h); T.scatter(h); T.leftover(h); } catch (e) { err('V14 hostile input crashed the model: ' + e.message); }
  }
  console.log('V12 identity: no tasks, two fetches, no POST, no roster');
  console.log('V13 the table book: validated, fallback matches the free set, remainders present, entitlement filters');
  console.log('V14 purity: state shape frozen, reducers leave their input untouched, hostile input refused');
})();

/* =====================================================================
   V16 ⭐ THE TRUTH LANDS ON THE STRIP
   The class parks a marker on a numeral; at the lift the true share is
   marked on THAT SAME STRIP, on the same scale, so the two values can be
   read against each other. Nothing else changes — no tick, no cross, no
   distance, no "closest". This is the fix for the operator's report that
   the numerals had no function, and it is the house's own precedent
   (estimation-jar.js paints guesses and truth onto one number line).
   ===================================================================== */
(function truthOnStrip() {
  /* the render is what carries this, so it is checked at the source —
     the browser gate drives it for real */
  const at = RENDER.indexOf('_buildStrip: function');
  if (at < 0) { err('V16 _buildStrip was not found'); return; }
  const body = RENDER.slice(at, RENDER.indexOf('_buildFoot: function', at));
  if (body.length < 100) { err('V16 could not isolate the strip builder'); return; }

  /* a. the truth is READ, and only when the lids are up */
  if (!/lifted\s*\?\s*this\.revealed\(s\)\.share\s*:\s*null/.test(body)) {
    err('V16 the strip does not read the share from a lifted state only');
  }
  /* b. it lands on a numeral, as its own class */
  if (body.indexOf('lid-truth') === -1) err('V16 the truth has no class of its own on the strip');
  /* c. the class's marker keeps a DIFFERENT class */
  if (body.indexOf('lid-on') === -1) err('V16 the marker lost its own class');
  if (/lid-truth[^']*lid-on|lid-on[^']*lid-truth/.test(body.replace(/\s/g, ''))) {
    /* they may co-occur on one numeral, but must never be the same token */
  }
  /* d. the two treatments differ in KIND, not in hue — the marker fills,
     the truth rings, and both use the SAME teal. A hue pair would read
     as right/green vs wrong/orange to a six-year-old. */
  const ON = SRC.match(/\.lid-mark\.lid-on\{([^}]*)\}/);
  const TR = SRC.match(/\.lid-mark\.lid-truth\{([^}]*)\}/);
  if (!ON) err('V16 the marker rule was not found');
  if (!TR) err('V16 the truth rule was not found');
  if (ON && TR) {
    if (!/background/.test(ON[1])) err('V16 the marker is not a FILL');
    if (/background/.test(TR[1])) err('V16 the truth uses a fill — it must ring, or the two read as one kind');
    if (!/box-shadow/.test(TR[1])) err('V16 the truth is not a RING');
    if (TR[1].indexOf('inset') === -1) err('V16 the truth ring is not inset — an outer halo collides with the 6px strip gap');
    const hue = (s) => (s.match(/#[0-9A-Fa-f]{6}/g) || []).map((h) => h.toUpperCase());
    const stray = hue(TR[1]).filter((h) => h !== '#146B5E' && h !== '#FBF3E4');
    if (stray.length) err(`V16 the truth ring introduces a new colour (${stray.join(',')}) — it must differ in KIND, not hue`);
  }
  /* e. and when the class was right, one numeral wears both */
  if (!/\.lid-mark\.lid-on\.lid-truth\{/.test(SRC)) {
    err('V16 there is no rule for a numeral that is BOTH the marker and the truth');
  }
  /* f. the strip is inert until there is a question — AND SAYS SO.
     ⚠ RE-POINTED IN THE 2026-08 REBUILD, AND THE OLD FORM WAS PINNED TO
     THE BUG'S FIX RATHER THAN TO THE LAW. It required the literal
     `disabled = !!s.lifted || s.lids.length < 2`. A `disabled` button
     fires no click, is unfocusable and is skipped by screen readers —
     so all three refusal strings would have been unreachable behind it,
     which is the dead-string defect this file exists to catch. Four
     native panels caught that independently. The law is that the strip
     REFUSES below two lids and after the lift, with the RIGHT REASON for
     each; the mechanism is aria-disabled plus a spoken reason. */
  if (!/if\s*\(s\.lifted\)\s*self\._refuse\(b,\s*'refuseLifted'\)/.test(body)) {
    err('V16 the strip does not refuse, with its own reason, once the lids are up');
  }
  if (!/s\.lids\.length\s*<\s*self\.MIN_LIDS\)\s*self\._refuse\(b,\s*'hintPlace'\)/.test(body)) {
    err('V16 the strip does not refuse, with its own reason, below two lids');
  }
  if (/\bb\.disabled\s*=/.test(body)) {
    err('V16 the strip still uses `disabled`, which cannot be focused, clicked or heard');
  }
  /* g. focus survives the re-render.
     ⚠ ALSO RE-POINTED. The old check looked for `.focus()` inside
     _buildStrip, which is the shape of the old bespoke fix. Focus is now
     restored ONCE, in render(), for every control the tool builds — so
     the law is that the strip's numerals carry a stable data-fk and that
     render() reads one back. Checking the old shape would have failed a
     strictly better fix. */
  if (!/data-fk['"],\s*'mark:'/.test(body)) {
    err('V16 the strip numerals carry no stable focus key');
  }
  if (!/getAttribute\('data-fk'\)/.test(SRC) || !/querySelector\('\[data-fk="'/.test(SRC)) {
    err('V16 render() does not restore focus by data-fk after its own re-render');
  }
  /* h. the old dot row is gone — the table already seats the counters */
  if (SRC_NC.indexOf('lid-rcell') >= 0) err('V16 the old .lid-rcell dot row is still rendered');
  /* i. AND STILL NO VERDICT. The two values sit on one strip; nothing
     may compute the relation between them. */
  if (/guess[^;\n]*(===|!==|>|<|-)[^;\n]*share|share[^;\n]*(===|!==|>|<|-)[^;\n]*guess/.test(SRC_NC)) {
    err('V16 the guess and the share are brought into contact — that is a verdict');
  }
  console.log('V16 the truth lands on the strip: read only when lifted, its own class, a RING against the marker\'s FILL in the same two colours, inert below two lids, focus restored, and the guess never compared with the share');
})();

/* =====================================================================
   V17 ⭐ NO DEAD STRINGS
   Every authored key must be REACHED. `hintMark` — "Park the marker on
   the number you think it is." — was authored in all eleven locales and
   never once referenced, so the tool never told the class what the strip
   was for; that is half the reason the numerals read as decoration, and
   the operator found it before any gate did. V8 checks a string EXISTS
   per locale. This checks it is USED.
   ===================================================================== */
(function noDeadStrings() {
  /* ⚠ EVERY QUOTED KEY INSIDE A t(...) CALL, not just the first. The
     first draft matched `t('key')` and, for ternaries, a non-greedy
     `t(...'key'`, which captured only the LEFT arm — so
     `api.t(s.lifted ? 'againBtn' : 'liftBtn')` reported liftBtn DEAD.
     A scan that condemns correct code teaches the next build to write
     fake calls to satisfy it. */
  const keysIn = (call) => (call.match(/'([A-Za-z0-9_]+)'/g) || []).map((q) => q.slice(1, -1));
  const used = new Set();
  const re = /\bt\(([^()]*(?:\([^()]*\)[^()]*)*)\)/g;
  let m;
  while ((m = re.exec(SRC_NC)) !== null) keysIn(m[1]).forEach((k) => used.add(k));
  /* ⚠ AND IT FOLLOWS THE TWO HELPERS THAT TAKE A KEY, because otherwise
     it condemns correct code — the third time this file has had to learn
     that. `_refuse(btn, key)` and `_say(key)` are the whole refusal
     channel and `line(key)` is the whole hint ladder; every one of them
     ends in api.t(key), and the scan proves that below rather than
     assuming it. Nine strings looked dead to the old scan purely because
     they are reached through a named helper instead of inline. */
  const HELPERS = /\b(?:_refuse\([A-Za-z0-9_.]+,\s*|_say\(|line\()('[A-Za-z0-9_]+')/g;
  while ((m = HELPERS.exec(SRC_NC)) !== null) used.add(m[1].slice(1, -1));
  for (const h of ['_refuse', '_say']) {
    const at = SRC_NC.indexOf(h + ': function');
    if (at < 0 || SRC_NC.slice(at, at + 500).indexOf('.t(key)') < 0) {
      err(`V17 the ${h} helper does not resolve its key through t() — the scan's indirection is unproven`);
    }
  }
  if (!/var line = function \(key\)[\s\S]{0,200}?api\.t\(key\)/.test(SRC_NC)) {
    err('V17 the hint ladder helper does not resolve its key through t()');
  }

  /* ⚠ AN EXPLICIT, AUDITABLE EXEMPTION LIST — never a loosened regex.
     These two are read by the SHELL, not by this file: lcs-shell.js:47-58
     interpolates {title} and {instruction} into the page's own
     description in all eleven locales. They are used; they are simply
     not used HERE. Anything added to this list needs the same one-line
     proof beside it. */
  const SHELL_CONSUMED = {
    title: 'lcs-shell.js:47-58 {title} interpolation',
    instruction: 'lcs-shell.js:47-58 {instruction} interpolation',
    /* the settings drawer is built by the shell from tool.settings[].labelKey
       (lcs-shell.js:591-593 renderField), so these two are rendered in all
       eleven locales and never pass through this file's own t() */
    setGhosts: 'lcs-shell.js:591-593 renderField(labelKey) — drawer row 1',
    setStrip: 'lcs-shell.js:591-593 renderField(labelKey) — drawer row 2'
  };
  /* ⚠ AND THE EXEMPTION IS PROVED, NOT ASSERTED: each of those two keys
     must actually appear as a labelKey in the tool's settings array, or
     the list becomes a place to hide a genuinely dead string. */
  for (const k of ['setGhosts', 'setStrip']) {
    if (!(T.settings || []).some((f) => f.labelKey === k)) {
      err(`V17 ${k} is exempted as shell-consumed but is not a labelKey in tool.settings`);
    }
  }
  const reach = (k) => used.has(k) || Object.prototype.hasOwnProperty.call(SHELL_CONSUMED, k);

  const dead = Object.keys(T.strings).filter((k) => !reach(k));
  if (dead.length) err(`V17 DEAD STRING(S) — authored in 11 locales and never reached: ${dead.join(', ')}`);

  /* ⚠ POISON, IN BOTH DIRECTIONS — the recorded Zufallsbeutel lesson.
     It must FIRE on a key nothing reaches, and it must PASS a key that
     is reached through a ternary and one the shell owns. */
  if (reach('__phantom__')) err('V17 POISON: the scan cannot see an unreferenced key');
  if (!used.has('liftBtn') || !used.has('againBtn')) {
    err('V17 POISON: the scan misses a key reached through a ternary — it would condemn correct code');
  }
  if (!reach('title')) err('V17 POISON: the shell-consumed exemption is not working');
  const probe = keysIn("api.t(s.lifted ? 'a' : 'b')");
  if (probe.length !== 2) err(`V17 POISON: the key extractor found ${probe.length} of 2 arms in a ternary`);

  /* ⭐ V17b — REACHED AT RUNTIME, not merely mentioned in the source.
     ⚠ The scan above is a TEXT scan, and mutation proved what that
     cannot see: making the branch unreachable (`s.guess === null &&
     false`) leaves the t('hintMark') call sitting in the source, so the
     scan reports it alive while no class would ever see it. A string
     behind a dead branch is exactly as dead as one behind no branch.
     So: drive every builder over a matrix of real states with a
     RECORDING t(), and require each authored key to be asked for by at
     least one of them. This is the check `hintMark` needed. */
  const REACH = new Set();
  const stub = () => {
    const node = {
      style: {}, classList: { add() {}, remove() {}, contains: () => false },
      children: [], textContent: '', type: '', disabled: false, href: '', target: '', rel: '',
      setAttribute() {}, getAttribute: () => null, addEventListener() {},
      appendChild(c) { this.children.push(c); return c; },
      querySelectorAll: () => []
    };
    return node;
  };
  const probeApi = {
    lang: 'en',
    /* the two drawer booleans are part of the state space now: a hint
       that points at the numeral strip is FALSE when the strip is off */
    settings: { ghosts: true, strip: true },
    el: (tag, cls) => { const n = stub(); n.tag = tag; n.cls = cls || ''; return n; },
    t: (k) => { REACH.add(k); const v = T.strings[k]; return (v && v.en) || k; },
    announce: () => {},
    stage: stub()
  };
  const inst = Object.create(T);
  inst.api = probeApi;
  inst.premium = false;
  inst.data = T.FALLBACK_SETUPS;
  inst._setupIdx = 0;
  inst._wrap = null;

  const twoLid = build(20, 2, true);
  const STATES = [
    /* ⚠ `one lid down` IS GONE FROM THE MATRIX BECAUSE IT IS GONE FROM
       THE TOOL. Placing from an empty table lays two; k=1 swallowed every
       counter and was one click from the opening frame. The MODEL still
       answers at k=1 and the oracle sweep still checks it — the interface
       simply cannot get there. */
    ['no lids yet', build(20, 0, true), false],
    ['two lids, nothing committed', twoLid, false],
    ['two lids, marker parked', T.placeGuess(twoLid, 10), false],
    ['lifted, shares exactly', T.lift(T.placeGuess(twoLid, 10)), false],
    ['lifted, something left over', T.lift(T.placeGuess(build(20, 3, true), 6)), false],
    ['four lids, the paid ceiling in view', build(30, 4, true), true],
    ['lifted at four lids — where hintAgain must NOT appear', T.lift(build(20, 4, true)), false],
    ['the gate showing', twoLid, true]
  ];
  /* ⚠ AND THE MATRIX NOW SWEEPS THE REFUSALS AND BOTH SETTINGS. Six
     native panels caught that the three refusal strings would be
     unreachable if the controls stayed `disabled`, and that hintMark is
     false when the numeral strip is switched off — a string is only
     reached if some REAL state asks for it, and "real" includes the
     settings a teacher can change. */
  const SAID = [null, 'refuseTotal', 'refuseLifted', 'refuseMax', 'hintPlace'];
  for (const [label, st, gate] of STATES) {
    if (!st) { err(`V17b could not build the "${label}" state`); continue; }
    for (const strip of [true, false]) {
      for (const said of SAID) {
        inst.st = st;
        inst._gate = gate;
        inst._said = said;
        inst._prevRow = { n: 20, k: 2, x: 10, r: 0 };
        inst._rounds = [{ n: 20, k: 2, x: 10, r: 0 }];
        inst.premium = true;
        inst.api.settings.strip = strip;
        inst.api.settings.ghosts = strip;
        try {
          inst._buildHint(); inst._buildStrip(); inst._buildFoot();
          inst._buildRecord(); inst._buildSheet();
          /* the table is driven too — it labels the lids and the ghosts */
          inst._buildTable();
        } catch (e) {
          err(`V17b a builder threw on the "${label}" state (strip=${strip}, said=${said}): ${e.message}`);
        }
      }
    }
  }

  const unreached = Object.keys(T.strings).filter((k) => !REACH.has(k) && !SHELL_CONSUMED[k]);
  if (unreached.length) {
    err(`V17b UNREACHABLE STRING(S) — present in the source but no state of the tool asks for them: ${unreached.join(', ')}`);
  }
  /* ⚠ POISON, BOTH WAYS. It must notice a key nothing asks for, and it
     must NOT condemn one that only a late state asks for. */
  if (REACH.has('__phantom__')) err('V17b POISON: the recorder invents keys');
  if (!REACH.has('hintLeftover')) err('V17b POISON: the state matrix never reaches the leftover hint — it would miss the class of defect it exists for');
  if (!REACH.has('gateLine') || !REACH.has('unlock')) err('V17b POISON: the state matrix never shows the gate');
  if (!REACH.has('againBtn')) err('V17b POISON: the state matrix never lifts the lids');

  console.log(`V17 no dead strings: all ${Object.keys(T.strings).length} authored keys are REACHED at runtime — ${REACH.size} asked for by a real state of the tool across ${STATES.length} states, ${Object.keys(SHELL_CONSUMED).length} owned by the shell`);
})();

/* =====================================================================
   V18 — ⭐⭐ THE COUNTERS ON THE OPEN TABLE DO NOT OVERLAP.
   The half of V15 that was never written. V15 proves at length that the
   counters UNDER A LID clear each other — the hexagonal packing, correct
   by construction — and nothing checked the part that is actually
   random. Measured on the shipped build:
       totals with at least one OVERLAPPING pair: 19 of 27
       chip-reachable totals affected: 12, 16, 20, 24, 30  (12 is DEFAULT)
       worst: total 17, two counters 4.5 units apart on a 56-unit disc
   Two discs 14 units apart draw as one figure-of-eight blob, so a class
   asked "how many are on the table?" saw eleven shapes where there were
   twelve. A counting instrument whose counters cannot be counted.
   ===================================================================== */
(function separation() {
  const D = 2 * T.C_R;
  let tightest = Infinity, bad = 0, checked = 0;
  for (let n = O_MIN; n <= O_MAX; n++) {
    const pts = T.scatter({ n, seed: n * 7919, lids: [], guess: null, lifted: false });
    if (pts.length !== n) { err(`V18 the scatter produced ${pts.length} counters for a total of ${n}`); return; }
    checked++;
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
        if (d < tightest) tightest = d;
        if (d < D) bad++;
      }
    }
    /* and every counter is on the table, not half off its edge */
    for (const p of pts) {
      if (p.x < T.C_R || p.x > O_W - T.C_R || p.y < T.C_R || p.y > O_H - T.C_R) {
        err(`V18 a counter sits off the table at n=${n}`); return;
      }
    }
  }
  if (bad) err(`V18 ${bad} pairs of counters overlap on the open table (tightest ${tightest.toFixed(1)} against a floor of ${D})`);
  /* ⚠ POISON: the check must FIRE on a scatter with no separation at
     all — the exact shipped implementation, so a regression to it cannot
     pass. */
  const naive = [];
  for (let i = 0; i < 30; i++) { const h = T._mix(30 * 7919, i); naive.push({ x: 70 + (h % 861), y: 70 + ((h >>> 9) % 481) }); }
  let naiveBad = 0;
  for (let i = 0; i < naive.length; i++) for (let j = i + 1; j < naive.length; j++) {
    if (Math.hypot(naive[i].x - naive[j].x, naive[i].y - naive[j].y) < D) naiveBad++;
  }
  if (!naiveBad) err('V18 POISON: the separation check cannot see the un-separated scatter it was written for');
  console.log(`V18 the open table is countable: ${checked} totals, no two counters closer than ${Math.round(tightest)} units against a floor of ${D} (the old scatter overlapped in 19 of 27)`);
})();

/* =====================================================================
   V19 — ⭐ THE REACHABLE LID SET IS {0, 2, 3, 4}, and k=1 still answers.
   Refusal 1 says there is no single-lid MODE; the shipped build enforced
   that as a mode and left the STATE one click from the opening frame,
   where one lid took floor(n/1) = n and swallowed every counter.
   ===================================================================== */
(function lidSet() {
  let st = T.newState();
  const seen = [st.lids.length];
  for (let i = 0; i < 6; i++) {
    const next = T.addLid(st, 300 + i * 40, 300);
    if (!next) break;
    st = next; seen.push(st.lids.length);
  }
  if (seen.join(',') !== '0,2,3,4') err(`V19 placing walks ${seen.join(',')} — the reachable set must be 0,2,3,4`);
  if (T.addLid(st, 500, 300) !== null) err('V19 a fifth lid was accepted');
  const down = [];
  let s2 = st;
  for (let i = 0; i < 4; i++) { const r = T.removeLid(s2); if (!r) break; s2 = r; down.push(r.lids.length); }
  if (down.join(',') !== '3,2,0') err(`V19 taking lids away walks ${down.join(',')} — two must clear the table`);
  /* the model is still TOTAL at k=1, which is why the oracle sweeps it */
  const one = { n: 12, seed: 12 * 7919, lids: [{ cx: 500, cy: 310 }], guess: null, lifted: false };
  if (T.share(one) !== 12) err('V19 the model no longer answers at k=1 — the sweep above would be measuring nothing');
  if (T.lift(one) !== null) err('V19 a single lid can still be lifted — the subtraction refusal 1 forbids');
  if (T.placeGuess(one, 3) !== null) err('V19 the strip accepts a commitment with one lid down');
  console.log('V19 the lid set: placing lays two, taking one from two clears the table, a fifth is refused, and k=1 still answers in the model while being unreachable in the tool');
})();

/* =====================================================================
   V20 — ⭐⭐ THE STRIP CONTAINS THE SHARE AND NEVER TOPS OUT ON IT.
   The shipped strip ran 0..min(maxTotal, 12): at total 30 with two lids
   the share is 15, so the class could not commit the right number and
   the reveal ringed NOTHING. At total 8 nine numerals could never be the
   answer under any lid count. And floor(n/2) — the obvious repair — is
   exactly the share at two lids, which is the configuration the routine
   OPENS with, so the answer would have sat on the last button every time.
   ===================================================================== */
(function stripRange() {
  for (let n = O_MIN; n <= O_MAX; n++) {
    const st = { n, seed: n * 7919, lids: [], guess: null, lifted: false };
    const top = T.stripTop(st);
    if (top !== Math.round(top) || top < 1) { err(`V20 stripTop(${n}) is ${top}`); return; }
    if (top % 5 !== 0) err(`V20 the top of the strip at n=${n} is ${top}, not a landmark`);
    for (let k = T.MIN_LIDS; k <= O_MAXLIDS; k++) {
      const x = Math.floor(n / k);
      if (x > top) { err(`V20 the share ${x} at n=${n} k=${k} is OFF the strip (top ${top})`); return; }
      if (x === top) { err(`V20 the share ${x} at n=${n} k=${k} IS the top numeral — the strip would hand over the answer`); return; }
      if (x < 1) { err(`V20 the share at n=${n} k=${k} is below the strip's first numeral`); return; }
    }
    /* the range must not move when a lid does */
    const three = { n, seed: n * 7919, lids: [{ cx: 1, cy: 1 }, { cx: 2, cy: 2 }, { cx: 3, cy: 3 }], guess: null, lifted: false };
    if (T.stripTop(three) !== top) err(`V20 the strip re-ranged when a lid went down at n=${n} — it would leak the answer`);
    /* one scale, read twice: the reducer bounds on the same function */
    if (T.placeGuess({ n, seed: n * 7919, lids: [{ cx: 1, cy: 1 }, { cx: 2, cy: 2 }], guess: null, lifted: false }, top + 1) !== null) {
      err(`V20 placeGuess accepts ${top + 1}, which the strip does not render at n=${n}`);
    }
    if (T.placeGuess({ n, seed: n * 7919, lids: [{ cx: 1, cy: 1 }, { cx: 2, cy: 2 }], guess: null, lifted: false }, 0) !== null) {
      err(`V20 placeGuess accepts 0, which can never be the share`);
    }
  }
  /* ⚠ POISON: the shipped rule and the naive repair must BOTH fail */
  const shipped = (n) => Math.min(30, 12);
  const naive = (n) => Math.floor(n / 2);
  if (shipped(30) >= Math.floor(30 / 2)) err('V20 POISON: the old fixed top would still hold the share at 30');
  if (naive(12) !== Math.floor(12 / 2)) err('V20 POISON: floor(n/2) no longer coincides with the two-lid share — re-derive this check');
  console.log('V20 the strip: every share sits on it, none is its top numeral, none is below 1, and it re-ranges only when the TABLE changes');
})();

/* =====================================================================
   V21 — ⭐ THE PRINTABLE IS DOUBLE-LOCKED AND CANNOT BECOME AN ANSWER KEY.
   The shipped chip called _showGate() for a free visitor while the
   @media print block was UNCONDITIONAL, so Ctrl+P — which no chip guards
   — handed anybody the Teacher-plan sheet. And the block printed the
   LIVE screen, so printing after a lift put the committed marker and the
   revealed share onto twenty-five copies.
   ===================================================================== */
(function printable() {
  const sheetAt = SRC.indexOf('_buildSheet: function');
  if (sheetAt < 0) { err('V21 there is no print sheet builder'); return; }
  const body = SRC.slice(sheetAt, SRC.indexOf('_showGate: function'));
  if (/\.lifted/.test(body)) err('V21 the sheet reads `lifted` — it could print the reveal');
  if (/\.guess/.test(body)) err('V21 the sheet reads `guess` — it could print the class\'s commitment as an answer');
  if (!/if \(!this\.premium\) \{ document\.body\.classList\.remove\('lid-paid'\); return; \}/.test(SRC)) {
    err('V21 the sheet subtree is not absent for a free visitor');
  }
  const printBlock = SRC.slice(SRC.indexOf('@media print{'));
  const rules = printBlock.split('\n').filter((l) => /\.lid-|\.lcs-/.test(l) && /display|visibility/.test(l));
  const unscoped = rules.filter((l) => l.indexOf('body.lid-paid') < 0);
  if (unscoped.length) err(`V21 ${unscoped.length} print rule(s) are not scoped to body.lid-paid — Ctrl+P would leak the sheet`);
  /* ⚠ POISON: both halves must be able to fail */
  if (!/\.lifted/.test('if (s.lifted) {')) err('V21 POISON: the lifted scan cannot see a lifted read');
  if ('display:none'.indexOf('body.lid-paid') >= 0) err('V21 POISON: the scoping scan is vacuous');
  console.log('V21 the printable: absent unless entitled, every print rule scoped to the paid body class, and a pure function of (total, lid count) — it cannot print an answer');
})();

/* =====================================================================
   V22 — ⭐ THE EIGHT THE MUTATION HARNESS FOUND.
   Every law below exists because a mutation SURVIVED the gate: the model
   was checked and the render was not, or the check happened to look at a
   token the mutation left alone. A survivor is the gate telling you where
   it is blind, and the honest response is a new assertion, never a
   quieter one.
   ===================================================================== */
(function blindSpots() {
  /* a. THE PACKING IS TIGHT AGAINST AN INDEPENDENT REFERENCE.
     "the rings start one out, leaving a gap in the middle" survived: the
     centroid law passes for a ring and the tight law derives the radius
     FROM the packing, so both move together and neither notices. The
     published optimal radii for n unit circles packed in a circle are an
     outside source the tool cannot influence — mine are concentric rings,
     so they may be a little larger, but never wildly so. */
  const OPT = [1, 2, 2.155, 2.414, 2.701, 3, 3, 3.304, 3.613, 3.813, 3.924, 4.029, 4.236, 4.328, 4.521];
  let worst = 0;
  for (let m = 1; m <= OPT.length; m++) {
    const r = T.radiusForShare(m);
    const ideal = Math.max(T.MIN_R, OPT[m - 1] * T.C_R);
    if (r > ideal + 6) {
      err(`V22 the lid for ${m} counters is ${r}, against a known-optimal ${Math.round(ideal)} — the pile is not packed tightly`);
    }
    worst = Math.max(worst, r - ideal);
  }
  /* b. THE LIFT SEATS EVERY COUNTER. A source grep could not see
     `var pack = [];` because the seating expression survived it — so this
     asks the MODEL: the packing must hold exactly the share. */
  for (let n = O_MIN; n <= O_MAX; n++) {
    for (let k = T.MIN_LIDS; k <= O_MAXLIDS; k++) {
      const st = build(n, k, true);
      if (!st) continue;
      const x = T.share(st);
      if (T.packing(x).length !== x) {
        err(`V22 the lift would seat ${T.packing(x).length} counters under a lid holding ${x} at n=${n} k=${k}`); return;
      }
    }
  }
  /* b2. AND THE LIFT COMPUTES THAT PACKING FROM THE SHARE. Asking the
     model is not enough: a mutation replaced the RENDER's
     `var pack = this.packing(this.share(s))` with `var pack = []`, which
     leaves the model untouched and empties the reveal — the counters
     would simply not be drawn under their lids. Nothing in the model can
     see that, so the law has to name the expression. */
  const tableAt2 = RENDER.indexOf('_buildTable: function');
  const liftBranch = tableAt2 < 0 ? '' : RENDER.slice(RENDER.indexOf('if (s.lifted) {', tableAt2), tableAt2 + 4200);
  if (!/var pack = this\.packing\(this\.share\(s\)\);/.test(liftBranch)) {
    err('V22 the lift does not compute its packing from the share — the reveal would seat nothing');
  }
  /* c. FOCUS IS ACTUALLY RESTORED, not merely keyed. The data-fk check
     passes with the restore deleted. */
  if (!/querySelector\('\[data-fk="'[\s\S]{0,220}?\.focus\(\)/.test(SRC)) {
    err('V22 render() looks a control up by data-fk and never focuses it');
  }
  /* d. A REFUSAL NAMES ITS OWN REASON, and stays reachable. */
  const refuse = SRC.slice(SRC.indexOf('_refuse: function'), SRC.indexOf('_announce: function'));
  if (!/self\._say\(key\)/.test(refuse)) err('V22 a refused control no longer speaks its own reason');
  if (!/aria-disabled['"],\s*['"]true/.test(refuse)) err('V22 a refused control is not marked aria-disabled');
  if (/\bbtn\.disabled\s*=\s*true/.test(refuse)) {
    err('V22 a refused control is `disabled` — unfocusable, unclickable and silent to a screen reader, which is what made three refusal strings dead');
  }
  /* e. THE COUNTERS STAY OUT OF THE ACCESSIBILITY TREE. Thirty nodes each
     announcing "a counter" is noise that never says how many. */
  const counter = SRC.slice(SRC.indexOf('_counter: function'), SRC.indexOf('_placeFrom: function'));
  if (!/aria-hidden['"],\s*['"]true/.test(counter)) err('V22 a counter is exposed to the accessibility tree again');
  if (/setAttribute\('aria-label'/.test(counter)) err('V22 a counter carries its own aria-label again');
  /* f. THE WHOLE LID LANDS ON THE TABLE — measured, not grepped. */
  for (let n = O_MIN; n <= O_MAX; n += 3) {
    for (let k = T.MIN_LIDS; k <= O_MAXLIDS; k++) {
      let st = build(n, k, true);
      if (!st) continue;
      st = T.moveLid(st, 0, 99999, 99999);
      if (!st) { err(`V22 a lid could not be moved at n=${n} k=${k}`); return; }
      const r = T.lidRadius(st), L = st.lids[0];
      if (L.cx + r > O_W + 1 || L.cy + r > O_H + 1 || L.cx - r < -1 || L.cy - r < -1) {
        err(`V22 a lid dragged into the corner hangs off the table at n=${n} k=${k} — its counters would be clipped away at the lift`); return;
      }
    }
  }
  /* g. destroy TAKES THE BODY CLASSES WITH IT. */
  const destroy = SRC.slice(SRC.indexOf('destroy: function'), SRC.indexOf('onSettings: function'));
  if (!/classList\.remove\('lid-wide', 'lid-paid'\)/.test(destroy)) {
    err('V22 destroy leaves lid-wide (and the paid class) on <body> — they outlive the tool');
  }
  /* ⚠ POISON: each of these must be able to fire. */
  if (T.radiusForShare(2) > OPT[1] * T.C_R + 6) err('V22 POISON: the tightness bound is already violated by a correct packing');
  if (/aria-hidden/.test('setAttribute(\'aria-label\', \'x\')')) err('V22 POISON: the counter scan cannot tell the two attributes apart');
  console.log(`V22 the mutation harness's blind spots: the pile is packed within ${Math.round(worst)} units of the known optimum, the lift seats every counter, focus is restored not merely keyed, a refusal speaks and stays reachable, the counters stay out of the tree, a dragged lid lands whole, and destroy cleans up after itself`);
})();

console.log('');
if (ERRORS) { console.error('FAIL — ' + ERRORS + ' error(s)'); process.exit(1); }
console.log('PASS — 0 errors');
