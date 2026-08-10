/* =====================================================================
   MODEL GATE — TOOL #50, THE NUMBER DRUM
   =====================================================================
   ⚠⚠ THIS GATE IMPLEMENTS ITS OWN GROUND TRUTH. It re-derives every
   expectation from arithmetic written here, never by asking the tool
   what it thinks — a gate that reads its expectation off the artefact
   marks its own homework, which once let 19 of 51 mutations survive.
   The only things imported from the tool are the MEASUREMENTS in GEO,
   because a gate carrying its own copy of a constant tests a copy (#44).

   ⚠ NON-VACUITY IS ASSERTED FIRST. Every enumeration below states how
   many states and how many moves it actually visited, and fails if that
   count is zero or outside the range this file computes independently.
   A `for` loop over an empty set passes every assertion inside it.

   ⚠ THE SPACE IS ENUMERATED, NOT SAMPLED. It is finite and small:
   199 half-notch states at 0-99 and 1999 at 0-999, times six moves.

   Run: node scripts/verify-number-drum.js
   ===================================================================== */
'use strict';
const path = require('path');
const fs = require('fs');

const DIR = process.env.NUMBER_DRUM_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const SRC = path.join(DIR, 'number-drum.js');
const T = require(SRC);
const G = T.GEO;

let pass = 0;
const fails = [];
function ok(cond, msg) { if (cond) pass++; else fails.push(msg); }
function eq(a, b, msg) { ok(a === b, msg + ' — got ' + JSON.stringify(a) + ', expected ' + JSON.stringify(b)); }

/* ---------------------------------------------------------------- the
   ORACLE. Written from the apparatus as described, not from the code:
   a ring of ten numerals; the ones ring turns one numeral per notch;
   ring k is dragged round exactly when every ring below it comes round
   from its 9 to its 0. Two whole numbers `a` and `a+1` differ in digit
   k precisely when a's bottom k digits are all 9.                     */
function oDigit(v, k) { return Math.floor(v / Math.pow(10, k)) % 10; }
function oCarriesInto(a, k) {          /* does a -> a+1 turn ring k?  */
  if (k === 0) return true;
  return (a % Math.pow(10, k)) === Math.pow(10, k) - 1;
}
function oPos(half, k) {               /* where ring k is standing     */
  const lo = Math.floor(half / 2);
  if (half % 2 === 0) return oDigit(lo, k);
  return oCarriesInto(lo, k) ? oDigit(lo, k) + 0.5 : oDigit(lo, k);
}

/* ================================================================== */
/* L0 — the constants are present and sane BEFORE anything uses them    */
const NEEDED = ['STRIP', 'STRIP_OFF', 'LEAD', 'WINDOW', 'RINGS_FREE', 'RINGS_PAID',
  'TOP_FREE', 'TOP_PAID', 'HALF', 'JUMP', 'T_TURN', 'T_CARRY', 'T_CATCH',
  'T_REFUSE', 'RM_F', 'RM_FLOOR', 'SND_FWD', 'SND_BACK', 'SND_CATCH',
  'SND_REFUSE', 'SND_DEBOUNCE'];
ok(NEEDED.length >= 20, 'L0 non-vacuity: the constant list is implausibly short (' + NEEDED.length + ')');
NEEDED.forEach(k => ok(typeof G[k] === 'number' && isFinite(G[k]), 'L0 GEO.' + k + ' missing or not finite'));
eq(G.HALF, 2, 'L0 a notch is two half-notches');
eq(G.WINDOW, 3, 'L0 the window shows three numerals');

/* ================================================================== */
/* L1 — THE STRIP DRAWS A CLOSED RING.
   The one claim this whole tool rests on: the numeral below the 9 is
   the 0 and the numeral above the 0 is the 9, at every position, at
   rest. Re-derived from the strip's own arithmetic.                   */
{
  const digit = i => (i + G.STRIP_OFF) % 10;
  let checked = 0;
  /* at ring position p the window's three cells are p+LEAD-1, p+LEAD,
     p+LEAD+1 — so the cell BELOW must read one more, cyclically */
  for (let p = 0; p <= 9; p++) {
    const at = p + G.LEAD, above = at - 1, below = at + 1;
    ok(above >= 0, 'L1 strip runs off the top at p=' + p);
    ok(below < G.STRIP, 'L1 strip runs off the bottom at p=' + p);
    eq(digit(at), p, 'L1 the numeral at the window at p=' + p);
    eq(digit(below), (p + 1) % 10, 'L1 ⭐ the numeral BELOW ' + p + ' must be ' + ((p + 1) % 10));
    eq(digit(above), (p + 9) % 10, 'L1 ⭐ the numeral ABOVE ' + p + ' must be ' + ((p + 9) % 10));
    checked++;
  }
  eq(checked, 10, 'L1 non-vacuity: every one of the ten positions was checked');
  /* and a half-notch past 9 must still have a cell on both sides */
  ok(9.5 + G.LEAD + 1 < G.STRIP, 'L1 the strip is too short to show the 9-to-0 seam mid-turn');
  ok(G.STRIP >= 13, 'L1 the strip is too short to be a ring (' + G.STRIP + ')');
}

/* ================================================================== */
/* the enumeration, for both ceilings                                   */
const MOVES = [
  { name: 'crank+1',   run: (st) => T.crank(st, 1, false),  d: +G.HALF },
  { name: 'crank-1',   run: (st) => T.crank(st, -1, false), d: -G.HALF },
  { name: 'crank+half', run: (st) => T.crank(st, 1, true),  d: +1 },
  { name: 'crank-half', run: (st) => T.crank(st, -1, true), d: -1 },
  { name: 'jump+10',   run: (st) => T.jump(st, 1),          d: +G.JUMP * G.HALF },
  { name: 'jump-10',   run: (st) => T.jump(st, -1),         d: -G.JUMP * G.HALF }
];

[G.TOP_FREE, G.TOP_PAID].forEach(function (TOP) {
  const RINGS = TOP === G.TOP_PAID ? G.RINGS_PAID : G.RINGS_FREE;
  const N = TOP * G.HALF;                       /* the largest half-notch */
  let states = 0, moved = 0, refused = 0, carries = 0, doubles = 0, mids = 0;

  for (let half = 0; half <= N; half++) {
    const st = { half: half, top: TOP };
    states++;

    /* -- L2  the number the apparatus is standing on ---------------- */
    const settled = half % 2 === 0;
    eq(T.settled(st), settled, 'L2 settled at half=' + half);
    eq(T.lo(st), Math.floor(half / 2), 'L2 lo at half=' + half);
    eq(T.hi(st), Math.ceil(half / 2), 'L2 hi at half=' + half);
    /* ⚠ THE NUMBER IS NEVER FRACTIONAL. Both ends of a mid state are
       whole numbers one apart; nothing ever divides an odd half by two. */
    ok(Number.isInteger(T.lo(st)) && Number.isInteger(T.hi(st)),
      'L2 ⚠ a fractional NUMBER appeared at half=' + half);
    eq(T.hi(st) - T.lo(st), settled ? 0 : 1, 'L2 the two ends are one apart at half=' + half);
    if (!settled) mids++;

    /* -- L3  every ring stands where the oracle says ---------------- */
    let anyFrac = false, fracCount = 0;
    for (let k = 0; k < RINGS; k++) {
      const p = T.ringPos(st, k);
      eq(p, oPos(half, k), 'L3 ring ' + k + ' position at half=' + half);
      ok(p >= 0 && p <= 9.5, 'L3 ring ' + k + ' out of range at half=' + half + ': ' + p);
      ok(p * 2 === Math.round(p * 2), 'L3 ring ' + k + ' is not on a half-notch at half=' + half);
      eq(T.turning(st, k), p % 1 !== 0, 'L3 turning agrees with position, ring ' + k + ' half=' + half);
      if (p % 1 !== 0) { anyFrac = true; fracCount++; }
    }
    /* -- L4  a settled apparatus has NO ring caught between numerals - */
    eq(anyFrac, !settled, 'L4 caught-between disagrees with settled at half=' + half);

    /* -- L5  THE CARRY LAW: a ring turns only when every ring below it
          is coming round from 9 to 0. Re-derived, not read.          */
    if (!settled) {
      const a = Math.floor(half / 2);
      for (let k = 1; k < RINGS; k++) {
        const should = oCarriesInto(a, k);
        eq(T.turning(st, k), should,
          'L5 ⭐ ring ' + k + ' turning at ' + a + '->' + (a + 1));
        if (should) {
          ok(T.turning(st, k - 1),
            'L5 ⚠ ring ' + k + ' turned while ring ' + (k - 1) + ' did not — impossible');
        }
      }
      if (fracCount >= 2) carries++;
      if (fracCount >= 3) doubles++;
    }

    /* -- L6  every move: exact, or an honest refusal ----------------- */
    MOVES.forEach(function (m) {
      const want = half + m.d;
      const legal = want >= 0 && want <= N;
      const got = m.run(st);
      if (!legal) {
        ok(got === null, 'L6 ⚠ ' + m.name + ' at half=' + half + ' must REFUSE, not clamp — got ' + JSON.stringify(got));
        refused++;
        return;
      }
      ok(got !== null, 'L6 ' + m.name + ' at half=' + half + ' refused a legal move');
      if (!got) return;
      eq(got.half, want, 'L6 ' + m.name + ' landed wrong at half=' + half);
      eq(got.top, TOP, 'L6 ' + m.name + ' changed the ceiling at half=' + half);
      ok(got !== st, 'L6 ' + m.name + ' mutated the state in place at half=' + half);
      eq(st.half, half, 'L6 ' + m.name + ' nudged the state it was given at half=' + half);
      moved++;
    });

    /* -- L7  the tens ring on its own NEVER moves the ones ring ------ */
    [1, -1].forEach(function (dir) {
      const j = T.jump(st, dir);
      if (!j) return;
      eq(T.ringPos(j, 0), T.ringPos(st, 0),
        'L7 ⚠ the ones ring moved during a tens-only turn at half=' + half);
      eq(j.half % 2, half % 2, 'L7 a tens-only turn tidied up a caught ring at half=' + half);
    });

    /* -- L8  forward then back is a round trip ---------------------- */
    [false, true].forEach(function (slow) {
      const f = T.crank(st, 1, slow);
      if (!f) return;
      const b = T.crank(f, -1, slow);
      ok(b !== null && b.half === half, 'L8 no round trip at half=' + half + ' slow=' + slow);
    });
  }

  /* -- non-vacuity, stated AFTER the loop and computed independently - */
  eq(states, N + 1, 'L9 non-vacuity: states visited at top=' + TOP);
  ok(moved > 0, 'L9 non-vacuity: no legal move was ever exercised at top=' + TOP);
  ok(refused > 0, 'L9 non-vacuity: no REFUSAL was ever exercised at top=' + TOP);
  eq(mids, TOP, 'L9 caught-between states at top=' + TOP);
  /* every crossing of a ten is a carry: 0-99 has 9 of them, 0-999 has 99 */
  eq(carries, Math.floor(TOP / 10), 'L9 ⭐ carries counted at top=' + TOP);
  /* ⭐ the double catch exists ONLY on the three-ring apparatus */
  eq(doubles, TOP === G.TOP_PAID ? 9 : 0, 'L9 ⭐ double catches at top=' + TOP);

  /* refusals: exactly the moves that would leave the range.
     Six moves; at each end a whole crank, a half crank and a tens turn
     are refused for as many states as their step is long. */
  const expectRefused = MOVES.reduce((s, m) => s + Math.min(Math.abs(m.d), N + 1), 0);
  eq(refused, expectRefused, 'L9 refusals counted at top=' + TOP);

  console.log('  top=' + TOP + '  states=' + states + '  legal moves=' + moved +
    '  refusals=' + refused + '  carries=' + carries + '  double catches=' + doubles);
});

/* ================================================================== */
/* L10 — 99 -> 100, THE DOUBLE CATCH, named explicitly rather than left
   to the count above. Both teeth are seated in the SAME half-notch;
   nothing is staged and nothing happens second.                       */
{
  const st = { half: 99 * G.HALF, top: G.TOP_PAID };
  eq(T.ringPos(st, 0), 9, 'L10 at 99 the ones ring shows 9');
  eq(T.ringPos(st, 1), 9, 'L10 at 99 the tens ring shows 9');
  eq(T.ringPos(st, 2), 0, 'L10 at 99 the hundreds ring shows 0');
  const mid = T.crank(st, 1, true);
  ok(mid !== null, 'L10 the half crank out of 99 was refused');
  eq(T.ringPos(mid, 0), 9.5, 'L10 ⭐ mid-catch: the ones ring is between 9 and 0');
  eq(T.ringPos(mid, 1), 9.5, 'L10 ⭐ mid-catch: the tens ring is between 9 and 0');
  eq(T.ringPos(mid, 2), 0.5, 'L10 ⭐ mid-catch: the hundreds ring is between 0 and 1');
  const done = T.crank(mid, 1, true);
  eq(T.lo(done), 100, 'L10 the second half notch lands on 100');
  [0, 1].forEach(k => eq(T.ringPos(done, k), 0, 'L10 ring ' + k + ' shows 0 at 100'));
  eq(T.ringPos(done, 2), 1, 'L10 the hundreds ring shows 1 at 100');
  /* and backwards through it, which is the catalog's own promise */
  const back = T.crank(done, -1, false);
  eq(T.lo(back), 99, 'L10 ⭐ 100 back to 99');
  eq(T.ringPos(back, 2), 0, 'L10 the hundreds ring surrendered on the way back');
}

/* L11 — the ONLY escape from the range is a refusal, from every state
   at both ends, on every move. Asserted at the boundary by name.      */
[G.TOP_FREE, G.TOP_PAID].forEach(function (TOP) {
  const top = { half: TOP * G.HALF, top: TOP }, zero = { half: 0, top: TOP };
  eq(T.crank(top, 1, false), null, 'L11 the rings went past ' + TOP);
  eq(T.crank(top, 1, true), null, 'L11 the rings half-turned past ' + TOP);
  eq(T.jump(top, 1), null, 'L11 the tens ring went past ' + TOP);
  eq(T.crank(zero, -1, false), null, 'L11 the rings went below zero at top=' + TOP);
  eq(T.crank(zero, -1, true), null, 'L11 the rings half-turned below zero at top=' + TOP);
  eq(T.jump(zero, -1), null, 'L11 the tens ring went below zero at top=' + TOP);
});

/* ================================================================== */
/* L12 — ⭐ EVERY NAMED CONSTANT REACHES A CALL SITE.
   `exchange-machine.js` ships five that nothing reads and #49 shipped
   three: a documented ceremony that the named-constants convention
   makes LOOK implemented. A crank tool is nothing but motion, so this
   is load-bearing here more than anywhere.                            */
{
  const src = fs.readFileSync(SRC, 'utf8').replace(/\r\n/g, '\n');
  const body = src.replace(/\/\*[\s\S]*?\*\//g, '');   /* comments are not call sites */
  const declared = Object.keys(G);
  ok(declared.length >= 20, 'L12 non-vacuity: implausibly few constants parsed (' + declared.length + ')');
  let reached = 0;
  declared.forEach(function (k) {
    const uses = (body.match(new RegExp('GEO\\.' + k + '\\b', 'g')) || []).length;
    ok(uses >= 1, 'L12 ⚠ GEO.' + k + ' is DEAD — declared, documented, and never read');
    if (uses >= 1) reached++;
  });
  eq(reached, declared.length, 'L12 every constant reaches a call site');
}

/* L13 — ⭐ NO WORDS ON THE APPARATUS, and no part named after another
   tool's part. Both bans are poison-tested below.                     */
{
  const OWNED = ['drum', 'gear', 'cog', 'dial', 'handle', 'lever', 'counter',
    'tape', 'column', 'roller', 'tumbler', 'floor', 'storey'];
  const ban = w => new RegExp('(?<!\\p{L})' + w + '(?!\\p{L})', 'iu');
  /* the apparatus is the strings the CHILD sees on it — there are none;
     every authored string is chrome. So the ban is on the part-names in
     the strings, with the product title exempted because the name is the
     operator's and the parts are not called that anywhere. */
  /* ⚠⚠ L13a — EVERY STRING IS A PER-LOCALE OBJECT WITH AN ENGLISH
     MEMBER. `lcs-shell.js:488` resolves `i18n.t(tool.strings, key)`, so
     a FLAT `{key: 'English'}` map makes t() hand back the KEY — the
     heading renders the literal word "title" and every aria-label is a
     camelCase identifier. This shipped here and NOT ONE GATE SAW IT:
     the model gate tests arithmetic, the render probe tests geometry,
     and neither reads a word. It was caught by looking at the picture.
     ⚠ This law is why that can never happen twice. */
  const all = Object.keys(T.strings);
  ok(all.length >= 20, 'L13 non-vacuity: implausibly few strings (' + all.length + ')');
  all.forEach(function (k) {
    const v = T.strings[k];
    ok(v && typeof v === 'object' && !Array.isArray(v),
      'L13a ⚠ string `' + k + '` is not a per-locale object — the shell will render the KEY');
    ok(v && typeof v.en === 'string' && v.en.length > 0,
      'L13a ⚠ string `' + k + '` has no English');
  });
  const strs = all.filter(k => k !== 'title');
  strs.forEach(function (k) {
    OWNED.forEach(function (w) {
      ok(!ban(w).test(T.strings[k].en),
        'L13 ⚠ string `' + k + '` uses "' + w + '", which is another tool\'s part');
    });
  });
  /* poison, BOTH directions — a ban tested only on English `\b` is
     tested in the one alphabet where `\b` happens to work (#44). */
  ok(ban('drum').test('turn the drum'), 'L13 poison: the ban failed to fire on a real violation');
  ok(ban('gear').test('Zahnräder und gear'), 'L13 poison: the ban failed to fire mid-sentence');
  ok(!ban('drum').test('eardrums'), 'L13 poison: the ban fired on a word that merely contains it');
  ok(!ban('counter').test('encounter'), 'L13 poison: the ban fired inside another word');
  ok(!ban('cog').test('cognition'), 'L13 poison: the ban fired inside "cognition"');
  eq(T.strings.title.en, 'The Number Drum', 'L13 the product name is the operator\'s and is unchanged');
}

/* ================================================================== */
console.log('\n' + (fails.length ? 'FAIL' : 'PASS') + '  ' + pass + ' assertions, ' + fails.length + ' failures');
if (fails.length) { fails.slice(0, 40).forEach(f => console.log('  ✗ ' + f)); process.exit(1); }
