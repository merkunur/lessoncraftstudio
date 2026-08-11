/* =====================================================================
   MODEL GATE — TOOL #58, THE QUEUE
   =====================================================================
   Binds no port and opens no browser. Everything a browser must answer
   lives in probe-the-queue.js; everything a human must answer lives in
   smoke-the-queue-locales.js.

   ⭐⭐ THE HEADLINE, EXHAUSTIVELY (L1). The tool's whole claim is that
   counting k from one end and k from the other lands on DIFFERENT
   members. So the oracle here defines "the j-th from that end" ITSELF —
   `fromA(j) = members[j-1]`, `fromB(j) = members[n-j]` — and never asks
   the tool what it thinks that means. #44 shipped a MIRRORED profile
   because the gate counted cubes in the renderer's own index order and
   both sides of the comparison carried the identical bug. Here every
   case is checked on the INDEX **and** on the MEMBER VALUE, so no shared
   convention can satisfy it by accident, and the coincidences are
   COUNTED (exactly 6 of 114) rather than decreed — if either half were
   vacuous the count would say so.

   ⚠⚠ THE CLONE TRAP, CLOSED TWO WAYS. A sed-clone whose pattern did not
   match once kept loading the PREVIOUS tool and reported a plausible
   pass. (i) a grep for the sibling's name and class prefix over each new
   gate file must return 0 — ⚠ and this sentence deliberately does NOT
   quote either token, because the first draft did and made the check
   report 2 hits against a perfectly clean file: a gate that fails on its
   own instructions teaches the next reader to ignore it;
   (ii) structurally, L0 refuses to proceed unless `T.id === 'the-queue'`
   and the parsed constant list is plausible. A mis-clone fails LOUDLY.

   ⚠ THIS TOOL DOES NOT EXPORT `GEO`. The constant list is PARSED OUT OF
   SOURCE and derived, never hard-coded — demanding an export the tool
   never promised would be an invented law.

   ⚠ `line` IS NOT BANNED. The header's NOUNS paragraph is a naming note
   for the locale fan-out (which siblings already own which noun), not a
   design ban on an English word — the recorded "a naming note is not a
   design ban" defect. It is carried below as a WATCH list, not a regex.

   Run: node scripts/verify-the-queue.js
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const TOOL_DIR = process.env.QUE_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const SRC_PATH = path.join(TOOL_DIR, 'the-queue.js');
const RAW = fs.readFileSync(SRC_PATH, 'utf8').replace(/\r\n/g, '\n');
const T = require(SRC_PATH);

/* ⚠ COMMENTS STRIPPED BEFORE ANY SOURCE SCAN. A `.lcs-` ban once matched
   a COMMENT twice running, and an apostrophe in ordinary English opens a
   string match that crosses newlines. */
const CODE = RAW.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/(^|[^:])\/\/[^\n]*/g, '$1 ');

const fails = [];
let checks = 0;
const ok = (c, m) => { checks++; if (!c) fails.push(m); };

/* a Unicode-safe word boundary. ⚠ `\b` IS ASCII-ONLY and is born dead in
   ten of eleven locales — `\byhteensä\b` can never match. */
const word = s => new RegExp('(?<!\\p{L})' + s + '(?!\\p{L})', 'iu');

/* ================================================================== */
/* L0 — NON-VACUITY. Nothing below is trusted until this passes.       */
/* ================================================================== */
{
  ok(T && typeof T === 'object', 'L0: the module did not export an object');
  ok(T.id === 'the-queue', 'L0: id is "' + (T && T.id) + '", not "the-queue" — WRONG TOOL LOADED');
  ok(T.premium === false, 'L0: premium must ship false');
  ok(!('tasks' in T), 'L0: a free-play instrument must declare no `tasks` — the shell would render activity chrome');
  ok(Array.isArray(T.settings) && T.settings.length === 1, 'L0: expected exactly one setting');
  ok(T.settings[0] && T.settings[0].key === 'size', 'L0: the setting is not `size`');
  ok(T.defaults && T.defaults.size === 'four', 'L0: default size is not four');
  /* ⚠ `defaults` MUST correspond exactly to the declared settings. A
     stray `end: 'a'` here would be the one thing the whole tool refuses
     — a home end — smuggled in through a key nobody reads. */
  const dkeys = Object.keys(T.defaults || {}).sort().join(',');
  const skeys = (T.settings || []).map(s => s.key).sort().join(',');
  ok(dkeys === skeys, 'L0: defaults declare [' + dkeys + '] but the settings declare [' + skeys + ']');
  /* ⚠ THE SIBLING'S MARKERS ARE ASSEMBLED FROM FRAGMENTS so that the
     literal tokens never appear in this file — otherwise the external
     clone-trap grep matches this very line and can never return 0,
     which would make the check unusable exactly when it matters. */
  const SIB = ['shape', 'stretcher'].join('-');
  const SIBPFX = 'sh' + 'p-';
  ok(RAW.indexOf(SIB) < 0 && RAW.indexOf(SIBPFX) < 0, 'L0: CLONE TRAP — sibling markers found in the tool source');
  /* poison it: the check must be able to see a marker that IS present */
  ok(('x ' + SIB).indexOf(SIB) >= 0, 'L0 poison: the clone-trap needle cannot match itself');

  /* the constant list, PARSED and DERIVED */
  const geoBlock = RAW.match(/var GEO = \{([\s\S]*?)\n  \};/);
  ok(!!geoBlock, 'L0: could not find the GEO block in source');
  const GEO_NAMES = geoBlock ? [...geoBlock[1].matchAll(/^\s{4}([A-Z][A-Z0-9_]*):/gm)].map(m => m[1]) : [];
  ok(GEO_NAMES.length >= 12, 'L0: parsed only ' + GEO_NAMES.length + ' GEO constants — the parse is implausible, not the tool');
  ok(new Set(GEO_NAMES).size === GEO_NAMES.length, 'L0: a GEO constant name is declared twice');
  module.exports = null;
  global.__GEO_NAMES = GEO_NAMES;

  const formsM = RAW.match(/var FORMS = \[([^\]]*)\]/);
  ok(!!formsM, 'L0: could not parse FORMS');
  const FORMS = formsM ? formsM[1].split(',').map(s => s.trim().replace(/^'|'$/g, '')) : [];
  ok(FORMS.length === 4, 'L0: expected four forms, parsed ' + FORMS.length);
  const capM = RAW.match(/CAP:\s*(\d+)/);
  ok(capM && Number(capM[1]) === FORMS.length, 'L0: CAP does not equal the number of FORMS — a deal could not draw distinct members');
  global.__FORMS = FORMS;

  if (fails.length) { console.log('L0 NON-VACUITY FAILED — refusing to run the rest:\n  ' + fails.join('\n  ')); process.exit(1); }
}
const GEO_NAMES = global.__GEO_NAMES;
const FORMS = global.__FORMS;

/* ================================================================== */
/* ⭐⭐ L1 — THE REVERSAL, EXHAUSTIVELY. 114 cases.                     */
/* ================================================================== */
{
  const perms = a => {
    if (a.length <= 1) return [a.slice()];
    const out = [];
    for (let i = 0; i < a.length; i++) {
      const r = a.slice(); const x = r.splice(i, 1)[0];
      for (const p of perms(r)) out.push([x].concat(p));
    }
    return out;
  };

  /* THE ORACLE, defined here and derived from the plain English meaning
     of "the j-th one counting from that end". It never consults T. */
  const fromA = (members, j) => ({ idx: j - 1, val: members[j - 1] });
  const fromB = (members, j) => ({ idx: members.length - j, val: members[members.length - j] });

  /* poison the oracle itself before trusting it */
  ok(fromA([9, 8, 7], 1).val === 9, 'L1 poison: fromA(1) is not the member at the a end');
  ok(fromB([9, 8, 7], 1).val === 7, 'L1 poison: fromB(1) is not the member at the b end');
  ok(fromA([9, 8, 7], 3).idx === fromB([9, 8, 7], 1).idx, 'L1 poison: the oracle disagrees with itself on the shared member');

  let cases = 0, coincide = 0, differ = 0;
  const bad = [];
  for (const n of [3, 4]) {
    const base = []; for (let i = 0; i < n; i++) base.push(i);
    for (const members of perms(base)) {
      const tag = 'n=' + n + ' [' + members + ']';
      for (let k = 1; k <= n; k++) {
        cases++;
        const stA = { members: members.slice(), end: 'a', k: k };
        const stB = { members: members.slice(), end: 'b', k: k };
        const oA = fromA(members, k), oB = fromB(members, k);
        const iA = T.landedIndex(stA), iB = T.landedIndex(stB);

        if (iA !== oA.idx) bad.push(tag + ' k=' + k + ': landedIndex from a = ' + iA + ', oracle ' + oA.idx);
        if (members[iA] !== oA.val) bad.push(tag + ' k=' + k + ': MEMBER from a = ' + members[iA] + ', oracle ' + oA.val);
        if (iB !== oB.idx) bad.push(tag + ' k=' + k + ': landedIndex from b = ' + iB + ', oracle ' + oB.idx);
        if (members[iB] !== oB.val) bad.push(tag + ' k=' + k + ': MEMBER from b = ' + members[iB] + ', oracle ' + oB.val);

        /* the stated arithmetic: k from a IS (n+1-k) from b, both ways */
        const mk = T.mirrorK(stA, k);
        if (mk !== n + 1 - k) bad.push(tag + ' k=' + k + ': mirrorK = ' + mk + ', expected ' + (n + 1 - k));
        const oM = fromB(members, n + 1 - k);
        if (oM.idx !== oA.idx) bad.push(tag + ' k=' + k + ': ORACLE says the mirror rule is false');
        if (oM.val !== oA.val) bad.push(tag + ' k=' + k + ': ORACLE mirror member disagrees');

        /* the coincidence is MEASURED, never re-typed as a parity rule */
        const same = iA === iB;
        if (same) coincide++; else differ++;
        if (T.isSelfSame(stA, k) !== same) {
          bad.push(tag + ' k=' + k + ': isSelfSame said ' + T.isSelfSame(stA, k) + ' but the two landings ' + (same ? 'DO' : 'do NOT') + ' coincide');
        }
      }
    }
  }
  ok(cases === 114, 'L1: enumerated ' + cases + ' cases, expected 114 — the space is not what it claims');
  ok(bad.length === 0, 'L1: ' + bad.length + ' disagreements, first: ' + bad[0]);
  /* ⚠ NEITHER HALF MAY BE VACUOUS. If every case coincided the reversal
     would be a lie; if none did, the self-same moment would be
     unreachable and the tool's best claim empty. */
  ok(coincide === 6, 'L1: coincidences = ' + coincide + ', expected exactly 6 (n=3, k=2, over 6 permutations)');
  ok(differ === 108, 'L1: non-coincidences = ' + differ + ', expected exactly 108');
  console.log('   L1  114 cases · ' + coincide + ' coincide · ' + differ + ' differ · 0 disagreements');
}

/* ================================================================== */
/* L2 — NO DEFAULT END, over real deals. Plus the CONTROL.            */
/* ================================================================== */
{
  const N = 10000;
  let sawThree = 0, sawFour = 0, badEnd = 0, badK = 0, notDistinct = 0, badLanded = 0, badMove = 0;
  for (let i = 0; i < N; i++) {
    const size = i % 2 ? 'three' : 'four';
    const st = T.newState(size);            /* ⚠ real Math.random, not a stub */
    if (st.members.length === 3) sawThree++; else if (st.members.length === 4) sawFour++;
    if (st.end !== null) badEnd++;
    if (st.k !== 0) badK++;
    if (new Set(st.members).size !== st.members.length) notDistinct++;
    if (T.landedIndex(st) !== null) badLanded++;
    /* with no end chosen, EVERY move must refuse */
    if (T.step(st) !== null) badMove++;
    if (T.board(st) !== null) badMove++;
    const before = st.members.join(',');
    T.step(st); T.board(st); T.pickEnd(st, 'a');
    if (st.members.join(',') !== before || st.end !== null || st.k !== 0) badMove++;
  }
  ok(badEnd === 0, 'L2: ' + badEnd + ' fresh deals arrived with an end already chosen — a default end IS the misconception');
  ok(badK === 0, 'L2: ' + badK + ' fresh deals arrived with a non-zero count');
  ok(notDistinct === 0, 'L2: ' + notDistinct + ' deals had a repeated member — "which one" would be unanswerable');
  ok(badLanded === 0, 'L2: landedIndex was non-null with no end chosen');
  /* ⚠ the DEFENSIVE half of that guard, asserted on its own. A dealt
     state always has k=0, so `!s.end` is unreachable-with-k>=1 through
     the moves and dropping it survives every loop above. It is still a
     stated law — "null until an end is chosen" — so it is stated here. */
  ok(T.landedIndex({ members: [0, 1, 2, 3], end: null, k: 2 }) === null,
    'L2: landedIndex answered with no end chosen — there is nobody to count from');
  ok(badMove === 0, 'L2: a move acted, or mutated its input, with no end chosen');

  /* ⚠⚠ ALIASING IS THE DEFECT, NOT MUTATION-IN-PLACE. A move that returns
     `s.members` rather than `s.members.slice()` mutates nothing at the
     moment it returns — so a before/after comparison of the INPUT sees
     nothing wrong. The damage arrives one move later, when `board()`
     shifts the array both states are now sharing. Assert the array
     IDENTITY, which is the thing that is actually wrong. */
  const alias = { members: [0, 1, 2, 3], end: 'a', k: 1 };
  ['pickEnd', 'step', 'board'].forEach(mv => {
    const out = mv === 'pickEnd' ? T.pickEnd(alias, 'b') : T[mv](alias);
    ok(out && out.members !== alias.members,
      'L2: ' + mv + ' returned an ALIAS of its input array — a later move would rewrite the state it came from');
  });
  ok(sawThree > 100 && sawFour > 100, 'L2: both sizes must be reached (saw ' + sawThree + '/' + sawFour + ')');

  /* ⚠⚠ THE CONTROL. A `step()` that ALWAYS returned null passes every
     assertion above. #39's no-op click helper hollowed out the very next
     assertion for exactly this reason. */
  const st0 = T.newState('four');
  const a = T.pickEnd(st0, 'a');
  ok(a && a.end === 'a' && a.k === 0, 'L2 CONTROL: pickEnd did not choose an end');
  let s = a, ks = [];
  for (let i = 0; i < 4; i++) { s = T.step(s); if (!s) break; ks.push(s.k); }
  ok(ks.join(',') === '1,2,3,4', 'L2 CONTROL: step did not advance 1,2,3,4 — it produced ' + ks.join(','));
  ok(T.step(s) === null, 'L2: step past the far end must refuse');
  ok(T.landedIndex(a) === null, 'L2: an end chosen but no step taken must land on nobody');
  const b4 = T.board(a);
  ok(b4 && b4.members.length === 3, 'L2 CONTROL: board did not remove one');
  ok(T.pickEnd(a, 'a') === null, 'L2: re-picking the end already chosen must refuse');
  ok(T.pickEnd(a, 'z') === null, 'L2: an end that is not a or b must refuse');
  const flip = T.pickEnd({ members: [0, 1, 2, 3], end: 'a', k: 3 }, 'b');
  ok(flip && flip.k === 0, 'L2: choosing an end must restart the count');

  /* ⚠ THE NO-ARG PATH IS A REAL PATH — `_paint` calls `this.step(null)`
     and `this.board(null)` to decide whether a control is live. Every
     assertion above passes an explicit state, so without this block a
     broken `_st` fallback would survive the whole gate. */
  const held = T.st;
  T.st = { members: [0, 1, 2, 3], end: 'a', k: 1 };
  ok(T.n() === 4, 'L2: n() does not fall back to the held state');
  ok(T.endOf() === 'a', 'L2: endOf() does not fall back to the held state');
  ok(T.landedIndex() === 0, 'L2: landedIndex() does not fall back to the held state');
  ok(T.step(null) !== null, 'L2: step(null) does not read the held state — the step control would paint dead');
  ok(T.board(null) !== null, 'L2: board(null) does not read the held state');
  T.st = { members: [0, 1, 2], end: null, k: 0 };
  ok(T.step(null) === null, 'L2: step(null) acted on a held state with no end chosen');
  ok(T.board(null) === null, 'L2: board(null) acted at MIN on the held state');
  T.st = held;
  console.log('   L2  ' + N + ' real deals · every one endless · ' + ks.length + '-step control advanced');
}

/* ================================================================== */
/* L3 — BOARD REMOVES ONE, NEVER TWO; AND THE SELF-SAME IS REACHABLE.  */
/* ================================================================== */
{
  const src = CODE.match(/board: function[\s\S]*?\n    \},/);
  ok(!!src, 'L3: could not isolate board()');
  const bs = src ? src[0] : '';
  ok(/\.shift\(\)/.test(bs) && /\.pop\(\)/.test(bs), 'L3: board must shift at one end and pop at the other');
  ok(!/shift\(\);\s*m?\.?shift\(\)/.test(bs) && !/slice\(2\)/.test(bs) && !/slice\(0,\s*-2\)/.test(bs),
    'L3: board removes TWO — the pitch rule the header rejects, which preserves parity and hides the self-same member');

  for (const end of ['a', 'b']) {
    const st = { members: [0, 1, 2, 3], end: end, k: 2 };
    const r = T.board(st);
    ok(r && r.members.length === 3, 'L3: board at ' + end + ' did not leave exactly one fewer');
    ok(r && r.k === 0, 'L3: board must restart the count');
    ok(r && r.end === end, 'L3: board must not change which end you are counting from');
    ok(st.members.length === 4, 'L3: board mutated its input');
    const expect = end === 'a' ? [1, 2, 3] : [0, 1, 2];
    ok(r && r.members.join(',') === expect.join(','), 'L3: board at ' + end + ' removed the wrong one');
    ok(T.board({ members: [0, 1, 2], end: end, k: 0 }) === null, 'L3: board must refuse at MIN from ' + end);
  }

  /* ⭐ THE SELF-SAME CASE IS REACHABLE AFTER BOARDING — measured with the
     L1 oracle, not decreed. n=4 has none (even n); board once and n=3
     has exactly one k where the two ends agree. */
  const four = { members: [0, 1, 2, 3], end: 'a', k: 0 };
  let coincAt4 = 0;
  for (let k = 1; k <= 4; k++) if (T.landedIndex({ members: four.members, end: 'a', k }) === T.landedIndex({ members: four.members, end: 'b', k })) coincAt4++;
  ok(coincAt4 === 0, 'L3: an even platform must have no self-same member, found ' + coincAt4);
  const three = T.board(four);
  let coincAt3 = [];
  for (let k = 1; k <= 3; k++) if (T.landedIndex({ members: three.members, end: 'a', k }) === T.landedIndex({ members: three.members, end: 'b', k })) coincAt3.push(k);
  ok(coincAt3.length === 1 && coincAt3[0] === 2, 'L3: after boarding, exactly one k must coincide — found [' + coincAt3 + ']');
  ok(T.isSelfSame(three, 2) === true, 'L3: isSelfSame disagrees with the measured coincidence after boarding');
  console.log('   L3  board removes one · refuses at MIN both ends · self-same reachable at k=' + coincAt3[0] + ' after one boarding');
}

/* ================================================================== */
/* L4 — EVERY CONSTANT REACHES A CALL SITE, and the A1/A5 motion laws. */
/* ================================================================== */
{
  const dead = [];
  GEO_NAMES.forEach(nm => {
    /* uses OUTSIDE the declaration itself */
    const uses = (CODE.match(new RegExp('GEO\\.' + nm + '(?![A-Z0-9_])', 'g')) || []).length;
    if (uses === 0) dead.push(nm);
  });
  ok(dead.length === 0, 'L4: DEAD CONSTANTS — ' + dead.join(', ') + ' are declared and never read');

  /* poison the scan in both directions */
  ok((CODE.match(/GEO\.T_STEP(?![A-Z0-9_])/g) || []).length > 0, 'L4 poison: the scan cannot even see a constant that IS used');
  ok((CODE.match(/GEO\.NOT_A_REAL_CONSTANT(?![A-Z0-9_])/g) || []).length === 0, 'L4 poison: the scan sees a constant that does not exist');

  /* ⭐ A1 — the duration is WRITTEN, so some rule must READ it. */
  ok(/setProperty\('--que-dur'/.test(CODE), 'L4: --que-dur is never written');
  ok(/var\(--que-dur/.test(RAW), 'L4: --que-dur is written and read by NOTHING — the motion constants would name a travel that never occurs');

  /* ⭐⭐ A5 — MEASURED, then gated. `_paint` used to wipe the svg and make
     a fresh walker every time, so the transition had no previous computed
     style to fire from and the walker teleported. A persistent node is
     NOT the whole of it either: re-appending an existing child is a
     remove-then-insert and cancels the transition just as thoroughly.
     Dense rAF timeline, distinct sampled positions across one step:
       fresh node every paint .......... 1
       transition:none poison .......... 1
       persistent node, re-appended .... 1
       persistent node, left in place .. 19
     The pixel proof lives in probe-the-queue.js; these are its
     structural preconditions, so a regression fails in one second. */
  /* ⚠⚠ SCOPED TO `_paint`'S OWN BODY. My first version tested the whole
     file for `this._svg.innerHTML=` and the mutation writes `svg.innerHTML=`
     through the local alias — so the check watched a spelling rather than
     the act, and its own mutation walked past it. */
  const paintBody = (CODE.split('_paint: function')[1] || '').split('_checkEntitlement:')[0];
  ok(paintBody.length > 400, 'L4/A5: could not isolate _paint — the scan is broken, not the tool');
  ok(!/\.innerHTML\s*=/.test(paintBody), 'L4/A5: _paint wipes a container with innerHTML — that destroys the walker and the travel with it');
  ok(!/appendChild/.test(paintBody), 'L4/A5: _paint appends a child — every new node must be inserted BEFORE the walker, and the walker must never be re-inserted');
  ok((paintBody.match(/insertBefore\([a-z]+, walker\)/g) || []).length >= 2,
    'L4/A5: fewer than two insertBefore(…, walker) calls — the bar and the members must both go in front of it');
  ok(/removeChild/.test(paintBody), 'L4/A5: _paint never removes the previous members');
  ok(/if \(c !== walker\)/.test(paintBody), 'L4/A5: the per-paint sweep does not spare the walker');
  ok(/_walker\s*=\s*document\.createElementNS/.test(CODE), 'L4/A5: the walker is not built as a persistent node');
  ok((CODE.match(/_walker\s*=\s*document\.createElementNS/g) || []).length === 1, 'L4/A5: the walker is constructed in more than one place');
  ok(!/_walker\s*=\s*document\.createElementNS/.test(paintBody), 'L4/A5: the walker is constructed inside _paint');
  ok(/\bwalker\.style\.display\s*=\s*'none'/.test(paintBody), 'L4/A5: the walker must be HIDDEN when no end is chosen, not removed');
  ok(!/removeChild\(walker\)|walker\.parentNode\.removeChild/.test(paintBody), 'L4/A5: the walker is removed from the document — re-inserting it cancels the transition');
  console.log('   L4  ' + GEO_NAMES.length + ' constants, 0 dead · --que-dur written and read · walker persistent and never re-inserted');
}

/* ================================================================== */
/* L5 — NO ORDER IN THE MATERIAL.                                     */
/* ================================================================== */
{
  const ordinalish = /(first|second|third|fourth|fifth|last|front|rear|final|top|bottom|big|small|large|tiny|one|two|three|four)/i;
  FORMS.forEach(f => ok(!ordinalish.test(f), 'L5: form name "' + f + '" carries an order or a size'));
  FORMS.forEach(f => ok(!/[0-9]/.test(f), 'L5: form name "' + f + '" carries a numeral'));
  ok(new Set(FORMS).size === FORMS.length, 'L5: a form is listed twice');

  const shape = CODE.match(/_shape: function[\s\S]*?\n    \},/);
  ok(!!shape, 'L5: could not isolate _shape()');
  const ss = shape ? shape[0] : '';
  /* ⚠⚠ ROTATION IS REFUSED ON THESIS GROUNDS: a facing asserts an end. */
  ok(!/rotate\(/.test(ss), 'L5: _shape rotates a member — a facing asserts an end');
  ok(!/scale\(/.test(ss), 'L5: _shape scales a member — a size ramp is an order');
  ok(!/matrix\(/.test(ss), 'L5: _shape applies a matrix transform to a member');

  /* every member gets the SAME area and the SAME baseline — the call site
     is the proof; the pixels are the probe's job.
     ⚠ THE ARGUMENTS ARE SPLIT ON BALANCED DEPTH, NOT BY REGEX. My first
     version wrote `FORMS\[[^\]]+\]`, which stops inside the NESTED bracket
     of `FORMS[s.members[i]]` and matched zero of the two real call sites —
     a wrong measurement wearing the costume of a defect. */
  const splitArgs = (s, from) => {
    let d = 0, cur = '', out = [];
    for (let i = from; i < s.length; i++) {
      const c = s[i];
      if (c === '(' || c === '[') { d++; cur += c; continue; }
      if (c === ')' && d === 0) { out.push(cur); return out; }
      if (c === ')' || c === ']') { d--; cur += c; continue; }
      if (c === ',' && d === 0) { out.push(cur); cur = ''; continue; }
      cur += c;
    }
    return null;
  };
  const calls = [];
  let at = -1;
  while ((at = CODE.indexOf('this._shape(', at + 1)) >= 0) {
    const args = splitArgs(CODE, at + 'this._shape('.length);
    if (args) calls.push(args.map(a => a.trim()));
  }
  /* poison the parser before trusting it */
  ok(splitArgs('f(A[b[c]], d, e)', 2).length === 3, 'L5 poison: the argument splitter cannot handle a nested bracket');
  ok(splitArgs('f(g(1,2), h)', 2).length === 2, 'L5 poison: the argument splitter splits inside a nested call');
  ok(calls.length >= 2, 'L5: expected _shape to be called from the stage and the sheet, found ' + calls.length);
  calls.forEach((c, i) => ok(c.length === 4, 'L5: call ' + i + ' has ' + c.length + ' arguments, expected 4'));
  calls.forEach((c, i) => {
    ok(/^GEO\.[A-Z_]+$/.test(c[3]), 'L5: call ' + i + ' passes a computed area "' + c[3] + '" rather than the one shared constant');
    ok(/^\d+(\.\d+)?$/.test(c[2]), 'L5: call ' + i + ' passes a varying baseline "' + c[2] + '" — a height ramp is an order');
  });
  const areas = new Set(calls.map(c => c[3]));
  ok(areas.size === 1, 'L5: members are drawn at more than one area constant: ' + [...areas].join(', '));
  console.log('   L5  ' + FORMS.length + ' forms, no order in the names · no rotate/scale · one area constant, fixed baseline per surface');
}

/* ================================================================== */
/* L6 — THE STRINGS AND THE REFUSE-LIST.                              */
/* ================================================================== */
{
  const S = T.strings;
  const keys = Object.keys(S);
  ok(keys.length >= 20, 'L6: only ' + keys.length + ' authored keys — implausible');
  keys.forEach(k => {
    ok(S[k] && typeof S[k].en === 'string' && S[k].en.length > 0, 'L6: key ' + k + ' has no English');
  });

  /* ⚠ EXEMPTIONS ARE AN AUDITABLE LIST WITH A CITATION EACH, never a
     loosened regex. A ban that condemns correct prose teaches the next
     author to reword AROUND it instead of reporting it. */
  const EXEMPT = {
    sizeThree: 'a SETTINGS quantity, not an ordinal — §23.2 permits chrome',
    sizeFour: 'a SETTINGS quantity, not an ordinal — §23.2 permits chrome'
  };
  /* ⚠ AND `line` IS NOT ON ANY BAN LIST. The header NOUNS note is a
     locale-naming note (which sibling already owns which word), not a
     design ban on the English noun. WATCH for the fan-out only: */
  const NOUN_WATCH = ['line', 'board', 'queue', 'lineup', 'stop'];

  const BANS = [
    ['POSITION', '(first|second|third|fourth|fifth|sixth|last|front|rearmost|foremost|final|middle)', 'names a position — the binding law is that no string may'],
    ['JUDGE', '(correct|incorrect|wrong|right|well\\s+done|good\\s+job|score|streak|points?|stars?|winner|lose)', 'marks a child right or wrong, or keeps a score'],
    ['EFFICACY', '(proven|research[- ]?based|evidence[- ]?based|boosts?|guarantee[ds]?|mastery)', 'makes an efficacy claim the routine does not have'],
    ['TIMER', '(timer|countdown|stopwatch|seconds\\s+left)', 'introduces a clock']
  ];

  BANS.forEach(([name, pat, why]) => {
    const re = word(pat);
    /* ⚠⚠ POISON IN BOTH DIRECTIONS. A ban tested only on English strings
       that happen to pass is a ban tested nowhere. */
    const mustFire = { POSITION: 'the third one waiting', JUDGE: 'that is correct', EFFICACY: 'a proven method', TIMER: 'the timer is running' }[name];
    const mustPass = { POSITION: 'Pick an end and step along the line', JUDGE: 'Count again from the same end', EFFICACY: 'A different platform', TIMER: 'One step along' }[name];
    ok(re.test(mustFire), 'L6 poison: the ' + name + ' ban does not fire on "' + mustFire + '" — it is born dead');
    ok(!re.test(mustPass), 'L6 poison: the ' + name + ' ban condemns the correct sentence "' + mustPass + '"');

    keys.forEach(k => {
      if (EXEMPT[k]) return;
      if (re.test(S[k].en)) fails.push('L6 ' + name + ': key `' + k + '` ' + why + ' — "' + S[k].en + '"');
      checks++;
    });
  });

  /* NO CARDINAL NUMERAL STANDING FOR AN ORDINAL: no digits at all in
     authored prose, and the one token is not a digit. */
  keys.forEach(k => {
    if (EXEMPT[k]) return;
    ok(!/[0-9]/.test(S[k].en), 'L6: key `' + k + '` prints a bare numeral — "' + S[k].en + '"');
  });

  /* every {token} is one the paint actually supplies */
  const supplied = new Set(['n', 'k']);
  keys.forEach(k => {
    (S[k].en.match(/\{(\w+)\}/g) || []).forEach(tok => {
      const nm = tok.slice(1, -1);
      ok(supplied.has(nm), 'L6: key `' + k + '` uses {' + nm + '}, which the paint never supplies');
    });
  });

  /* every key the code asks for is authored */
  const asked = new Set();
  [...CODE.matchAll(/\bt\(\s*'([a-zA-Z]+)'\s*\)/g)].forEach(m => asked.add(m[1]));
  [...CODE.matchAll(/_mk\([^,]+,[^,]+,[^,]+,\s*'([a-zA-Z]+)'\)/g)].forEach(m => asked.add(m[1]));
  [...CODE.matchAll(/'(say[A-Z][a-zA-Z]*)'/g)].forEach(m => asked.add(m[1]));
  /* ⚠ ONLY TERNARIES INSIDE `t(...)`. My first version scanned EVERY
     `cond ? 'x' : 'y'` and reported `endA`/`endB` as unauthored string
     keys — they are BUTTON keys for `_refuse(which)` and index
     `this._btn`, never `strings`. A ban too wide, third dress. */
  [...CODE.matchAll(/\bt\(\s*[^()']*\?\s*'([a-zA-Z]+)'\s*:\s*'([a-zA-Z]+)'\s*\)/g)].forEach(m => { asked.add(m[1]); asked.add(m[2]); });
  const missing = [...asked].filter(k => !(k in S));
  ok(missing.length === 0, 'L6: the render asks for unauthored keys: ' + missing.join(', '));
  ok(asked.size >= 10, 'L6: the key scan found only ' + asked.size + ' asked keys — the scan is broken, not the tool');

  console.log('   L6  ' + keys.length + ' keys · ' + BANS.length + ' bans, each poisoned both ways · ' +
    Object.keys(EXEMPT).length + ' cited exemptions · noun-watch: ' + NOUN_WATCH.join('/') + ' (NOT banned)');
}

/* ================================================================== */
/* L7 — THE STYLESHEET.                                               */
/* ================================================================== */
{
  const css = RAW.match(/injectCSS: function[\s\S]*?\n    \}/);
  ok(!!css, 'L7: could not isolate injectCSS()');
  const cs = css ? css[0] : '';

  /* ⚠⚠ TWO SEPARATE RULES, NEVER A SELECTOR LIST. `html,body.que-scroll`
     is a LIST — the html half applies unconditionally, so the class is
     decorative and poisoning the classList.add would prove nothing. */
  ok(/'html\.que-scroll\{/.test(cs), 'L7: no standalone html.que-scroll rule');
  ok(/'body\.que-scroll\{/.test(cs), 'L7: no standalone body.que-scroll rule');
  ok(!/html\s*,\s*body\.que-scroll/.test(cs), 'L7: the two scroll rules are a SELECTOR LIST — the html half would apply unconditionally');
  ['html', 'body'].forEach(sel => {
    const m = cs.match(new RegExp("'" + sel + "\\.que-scroll\\{([^}]*)\\}"));
    ok(!!m, 'L7: could not read the ' + sel + ' scroll rule');
    if (m) {
      ok(/overflow-y:\s*auto/.test(m[1]), 'L7: ' + sel + ' scroll rule lacks overflow-y:auto');
      /* ⚠ overflow-y ALONE is INERT against a shell that pins height:100% */
      ok(/height:\s*auto/.test(m[1]), 'L7: ' + sel + ' scroll rule lacks height:auto — overflow-y alone is inert');
      ok(/min-height:\s*100%/.test(m[1]), 'L7: ' + sel + ' scroll rule lacks min-height:100%');
    }
  });
  ok(/documentElement\.classList\.add\('que-scroll'\)/.test(CODE), 'L7: the html class is never added');
  ok(/body\.classList\.add\('que-scroll'\)/.test(CODE), 'L7: the body class is never added');

  /* ⚠ `vh` IS FORBIDDEN INSIDE A MANIPULATIVE — it resolves against the
     iframe, not the page. */
  ok(!/\d\s*vh\b/.test(cs), 'L7: a vh unit appears in the stylesheet');
  /* ⚠ never an inline `background` shorthand */
  ok(!/[^-]background:\s*[^;#]*url\(/.test(cs), 'L7: a background shorthand with a url');

  /* the print sheet must reset the shell AND the tool wrapper */
  const pr = cs.match(/@media print\{([\s\S]*)$/);
  ok(!!pr, 'L7: no @media print block');
  if (pr) {
    ok(/\.lcs-shell/.test(pr[1]), 'L7: print does not reset .lcs-shell — lcs-shell.css ships no print block of its own');
    ok(/\.que-wrap/.test(pr[1]), 'L7: print does not hide the live apparatus');
    ok(/\.que-sheet\{display:block/.test(pr[1]), 'L7: print does not reveal the sheet');
  }

  /* the walker's transition must survive edits */
  ok(/\.que-walker\{[^}]*transition:transform var\(--que-dur/.test(cs), 'L7: the walker has lost its transition');

  /* ⚠ Ctrl+P IS A PRINT PATH TOO — the guard belongs on the SHEET */
  const bp = CODE.match(/beforeprint[\s\S]{0,240}/);
  ok(!!bp, 'L7: no beforeprint listener');
  ok(bp && /!self\.premium/.test(bp[0]), 'L7: the beforeprint listener does not check entitlement — Ctrl+P would hand the paid sheet to everyone');
  ok(/_print: function[\s\S]{0,120}!this\.premium/.test(CODE), 'L7: the print button does not check entitlement');

  /* the entitlement fetch must degrade to the FREE TIER, never to nothing */
  ok(/this\.premium\s*=\s*false;/.test(CODE), 'L7: premium does not start false');
  ok(/\['catch'\]\(function/.test(CODE) || /\.catch\(function/.test(CODE), 'L7: the entitlement fetch has no catch — a network failure would leave the tier undefined');
  console.log('   L7  two separate scroll rules, both complete · no vh · print resets shell+wrap · both print paths gated · fetch degrades free');
}

/* ================================================================== */
if (fails.length) {
  console.log('\n' + fails.length + ' FAIL of ' + checks + ' assertions:');
  fails.forEach(f => console.log('  ✗ ' + f));
  process.exit(1);
}
console.log('\n✓ verify-the-queue: ' + checks + ' assertions, 0 failures');
