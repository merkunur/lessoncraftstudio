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
function build(n, k, spread) {
  let st = T.newState();
  st.n = n; st.seed = n * 7919; st.lids = []; st.guess = null; st.lifted = false;
  for (let i = 0; i < k; i++) {
    const cx = spread ? Math.round((O_W / (k + 1)) * (i + 1)) : 200 + i * 37;
    const cy = spread ? Math.round(O_H / 2) : 250 + i * 29;
    const next = T.addLid(st, cx, cy);
    if (!next) return null;
    st = next;
  }
  return st;
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
      if (pack.length !== x) { err(`V15 the packing holds ${pack.length} but the share is ${x} at n=${n} k=${k}`); return; }
      if (r < 44) { err(`V15 lid radius ${r} at n=${n} k=${k} is under the tap floor`); return; }
      /* ⚠ THE MIDDLE OF A LID IS THE FIRST PLACE A COUNTER GOES. A pile
         with a hole in it is not a pile — and mutation proved this is
         not pedantry: dropping the centre point left every fits-and-does
         not-overlap law green while a single counter sat off to one side
         of an oversized lid. */
      if (pack.length && (pack[0].dx !== 0 || pack[0].dy !== 0)) {
        err(`V15 the packing has a hole in the middle at n=${n} k=${k}`); return;
      }
      /* ⚠ AND THE LID IS NO BIGGER THAN IT NEEDS. "Fits" alone is
         satisfied by drawing every lid the size of the table. This
         cross-checks lidRadius() against packing() — two functions, so
         it is not the gate reading its expectation off the one thing it
         is testing. */
      let far = 0;
      for (const q of pack) far = Math.max(far, Math.sqrt(q.dx * q.dx + q.dy * q.dy));
      const want = Math.round(Math.max(T.MIN_R, far + T.C_R));
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
  const liftAt = RENDER.indexOf('if (s.lifted) {');
  if (liftAt < 0) err('V15 the lifted branch of the table was not found');
  else if (RENDER.slice(liftAt, liftAt + 900).indexOf('packing(') === -1) {
    err('V15 the lift does not seat the counters under their own lid');
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

  const VERDICT = /\b(score|scoring|correct|incorrect|wrong|winner|wins|verdict|rank|ranking|closest|better|worse|accuracy|streak)\b/i;
  if (VERDICT.test(SRC_NC)) err(`V7 verdict machinery in the source ("${SRC_NC.match(VERDICT)[0]}")`);
  if (/lid-(correct|wrong|right|good|bad|win|fail)/.test(SRC)) err('V7 a verdict class name exists');
  /* nothing may compare the guess with the share */
  if (/guess[^;\n]*===[^;\n]*share|share[^;\n]*===[^;\n]*guess/.test(SRC_NC)) err('V7 the guess is compared with the share');
  if (!VERDICT.test('var score = 1;')) err('V7 POISON: the verdict ban no longer fires');
  console.log('V6/V7 committed prior: moves freely, freezes at the lift by refusal, survives it, and nothing marks it');
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
  const BAN = {
    en: /\b(correct|wrong|well done|good job)\b/i,
    de: /\b(richtig|falsch|gut gemacht)\b/i,
    fr: /\b(correct|faux|bravo|bien joué)\b/i,
    es: /\b(correcto|incorrecto|bien hecho)\b/i,
    pt: /\b(correto|errado|muito bem)\b/i,
    it: /\b(giusto|sbagliato|bravo)\b/i,
    nl: /\b(goed zo|fout|correct)\b/i,
    sv: /\b(rätt|fel|bra jobbat)\b/i,
    da: /\b(rigtigt|forkert|godt klaret)\b/i,
    no: /\b(riktig|galt|bra jobba)\b/i,
    fi: /\b(oikein|väärin|hyvin tehty)\b/i
  };
  const MUSTFIRE = { en: 'correct', de: 'richtig', fr: 'bravo', es: 'correcto', pt: 'errado', it: 'giusto', nl: 'fout', sv: 'rätt', da: 'forkert', no: 'riktig', fi: 'oikein' };

  /* ⚠ THE BRAND. Word-boundary anchored on purpose: the corpus contains
     the Dutch `Koekjesplaten` (baking trays) and a bare substring ban
     would reject correct Dutch — the `par`-rejects-French defect again. */
  const BRAND = /\bsplat\w*\b/i;
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
  const PAIRS = [['addLid', 'addLid('], ['takeLid', 'removeLid('], ['newSetBtn', '_stepSetup(']];
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
    ['placeGuess', (s) => T.placeGuess(s, 3)],
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

console.log('');
if (ERRORS) { console.error('FAIL — ' + ERRORS + ' error(s)'); process.exit(1); }
console.log('PASS — 0 errors');
