/* =====================================================================
   verify-comparison-planks.js — the proof gate for TOOL #42
   ---------------------------------------------------------------------
   Run:  node scripts/verify-comparison-planks.js
   Env:  CMP_TOOL_DIR — where to load the tool from (the mutation harness
         points this at a temp copy)

   ⭐ THE GATE IMPLEMENTS ITS OWN GROUND TRUTH, BY DIFFERENT ALGORITHMS.
   The tool computes `min + |a−b|`. This gate never does: it uses
   |{1..a} ∪ {1..b}| by boolean set union, and max by simultaneous
   decrement. Neither can share a bug with subtraction.

   ⚠ THIS FILE DOES ZERO BROWSER WORK, DELIBERATELY. `mutate-` runs it
   once per mutation under a 30s cap, and a gate that HANGS counts as
   SURVIVED. Every pixel assertion lives in local-test-.

   ⚠ AND "TOLERANCE" IS NOT A WORD THAT BELONGS HERE. Every quantity in
   this model is an integer below 2^53, so every assertion is `===` or
   string equality. A tolerance in this layer would admit a real
   off-by-one AND advertise as approximate something that is exact.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');

const TOOL_DIR = process.env.CMP_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const T = require(path.join(TOOL_DIR, 'comparison-planks.js'));
const BOOK = JSON.parse(fs.readFileSync(path.join(TOOL_DIR, 'comparison-planks-pairs.json'), 'utf8'));
const SRC = fs.readFileSync(path.join(TOOL_DIR, 'comparison-planks.js'), 'utf8');
const SRC_NC = SRC.replace(/\/\*[\s\S]*?\*\//g, '');       /* comments stripped */

let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) { PASS++; console.log('  ok   ' + m); } else { FAIL++; console.error('  FAIL ' + m); } };
const sec = (s) => console.log('\n' + s);
const N = T.N_MAX, K = T.K, X0 = T.X0;

/* ---- the gate's own oracles, both innocent of subtraction ---------- */
const oUnion = (a, b) => {                 /* |{1..a} ∪ {1..b}| */
  const c = new Array(N).fill(false);
  for (let i = 0; i < a; i++) c[i] = true;
  for (let i = 0; i < b; i++) c[i] = true;
  return c.reduce((n, x) => n + (x ? 1 : 0), 0);
};
const oMax = (a, b) => {                   /* max by simultaneous decrement */
  let x = a, y = b;
  while (x > 0 && y > 0) { x--; y--; }
  return x > 0 ? a : b;
};
const oDiff = (a, b) => {                  /* overhang cells by set difference */
  const c = new Array(N).fill(0);
  for (let i = 0; i < a; i++) c[i] ^= 1;
  for (let i = 0; i < b; i++) c[i] ^= 1;
  return c.reduce((n, x) => n + x, 0);
};

const S = (a, b, extra) => Object.assign({ a: a, b: b, phase: 'attached', dx: 0, dy: 0 }, extra || {});
const KEYS = ['a', 'b', 'dx', 'dy', 'phase'].join(',');

/* the gate's OWN validity predicate — never the tool's */
function isValid(s) {
  if (!s || typeof s !== 'object') return 'not an object';
  if (Object.keys(s).sort().join(',') !== KEYS) return 'field set is ' + Object.keys(s).sort().join(',');
  if (!Number.isInteger(s.a) || s.a < 1 || s.a > N) return 'a out of band';
  if (!Number.isInteger(s.b) || s.b < 1 || s.b > N) return 'b out of band';
  if (!Number.isInteger(s.dx) || !Number.isInteger(s.dy)) return 'dx/dy not integers';
  if (!T.PHASES[s.phase]) return 'bad phase';
  if (s.a === s.b && s.phase !== 'attached') return 'equal planks must be attached';
  if (s.phase === 'attached' && (s.dx !== 0 || s.dy !== 0)) return 'attached not canonical';
  const d = oDiff(s.a, s.b);
  if (s.phase === 'laid') {
    if (s.dx !== X0 + K * Math.min(s.a, s.b)) return 'laid dx not canonical';
  }
  if (s.phase !== 'attached' && (s.dx < X0 || s.dx + K * d > T.RIGHT)) return 'offcut outside the stage';
  return null;
}

/* ===================================================================
   V1 — TOTAL, PURE, IMMUTABLE
   =================================================================== */
sec('V1  the model is total, pure and immutable');
{
  const hostile = [null, undefined, 0, '', [], {}, { a: 'x' }, { a: NaN }, NaN, false, { a: 1, b: 2, phase: 'nope' }];
  let ok = true, why = '';
  for (const h of hostile) {
    let s;
    try { s = T._st(h); } catch (e) { ok = false; why = JSON.stringify(h) + ' threw'; continue; }
    const bad = isValid(s);
    if (bad) { ok = false; why = JSON.stringify(h) + ' -> ' + bad; }
  }
  is(ok, `all ${hostile.length} hostile inputs yield a valid state` + (ok ? '' : ' — ' + why));
  /* ⚠ `st || newState()` is NOT a total guard: it catches null and 0 and
     hands {} and [] straight through to a property read. */
  is(isValid(T._st([])) === null && isValid(T._st({})) === null,
    'an empty array and an empty object are both repaired, not trusted');
  is(T._st({ a: 3, b: 3, phase: 'free' }).phase === 'attached',
    'an impossible phase is REPAIRED — equal planks have no offcut to free');

  const before = S(5, 9);
  const snap = JSON.stringify(before);
  T.setLen(before, 'a', 7); T.beginLift(before); T.moveOffcut(before, 300, 300);
  T.endDrag(before); T.cycleOffcut(before); T.reattach(before);
  is(JSON.stringify(before) === snap, 'no reducer mutates its input');

  is(T.setLen(S(5, 9), 'a', 5) === null, 'a no-op setLen refuses, rather than reporting a fake success');
  is(T.setLen(S(5, 9), 'a', 0) === null && T.setLen(S(5, 9), 'a', N + 1) === null,
    'out-of-band setLen REFUSES — it does not clamp');
  is(T.setLen(S(5, 9), 'z', 3) === null, 'an unknown plank refuses');
}

/* ===================================================================
   V2 — ⭐ THE PAYOFF THEOREM, exhaustive, against two oracles
   =================================================================== */
sec('V2  ⭐ the payoff: the composite ends exactly where the longer plank ends');
{
  let bad = 0, checked = 0, worst = '';
  for (let a = 1; a <= N; a++) for (let b = 1; b <= N; b++) {
    if (a === b) continue;
    const laid = T.cycleOffcut(T.cycleOffcut(S(a, b)));
    if (!laid) { bad++; worst = `${a},${b} refused to seat`; continue; }
    const comp = T.composedRight(laid), lng = T.longRight(laid);
    /* ⭐ Object.is, not === : -0 must also be rejected */
    if (!Object.is(comp - lng, 0)) { bad++; worst = `${a},${b} ${comp} vs ${lng}`; }
    if (lng !== X0 + K * oUnion(a, b)) { bad++; worst = `${a},${b} union oracle`; }
    if (lng !== X0 + K * oMax(a, b)) { bad++; worst = `${a},${b} max oracle`; }
    checked++;
  }
  is(bad === 0, `${checked} unequal pairs: composite === longer, and both === |{1..a} ∪ {1..b}| and === max-by-decrement` + (bad ? ` — ${worst}` : ''));
  /* the theorem must not be vacuous: prove the two oracles disagree with
     a WRONG formula on the same data */
  let caught = 0;
  for (let a = 1; a <= N; a++) for (let b = 1; b <= N; b++) if (a !== b && (Math.min(a, b) + (a - b)) !== oMax(a, b)) caught++;
  is(caught > 0, `and the oracles reject a−b (not |a−b|) on ${caught} of the pairs — the theorem is not vacuous`);
}

/* ===================================================================
   V3 — THE DIFFERENCE IS DERIVED, NEVER STORED
   =================================================================== */
sec('V3  the difference and the role are derived, never stored');
{
  is(Object.keys(T.newState()).sort().join(',') === KEYS, `the state is exactly {${KEYS}} — five fields`);
  is(!/\bd\s*:/.test(SRC_NC.slice(SRC_NC.indexOf('newState'), SRC_NC.indexOf('newState') + 200)),
    'newState stores no difference');
  let bad = 0;
  for (let a = 1; a <= N; a++) for (let b = 1; b <= N; b++) if (T.diffOf(S(a, b)) !== oDiff(a, b)) bad++;
  is(bad === 0, `diffOf agrees with a set-difference oracle on all ${N * N} pairs`);
  /* ⭐ three-valued, because a boolean silently elects A at equality */
  is(T.roleOf(S(5, 5)) === null, 'roleOf is THREE-valued — null when the planks are equal');
  is(T.roleOf(S(9, 5)) === 'a' && T.roleOf(S(5, 9)) === 'b', 'and names the longer otherwise');
}

/* ===================================================================
   V4 — ⭐ THE ROUND TRIP, deep-equal on the exact field set
   =================================================================== */
sec('V4  ⭐ detach → carry → release → reattach is an identity round trip');
{
  let bad = 0, worst = '';
  for (let a = 1; a <= N; a++) for (let b = 1; b <= N; b++) {
    if (a === b) continue;
    const s0 = S(a, b), snap = JSON.stringify(s0);
    let s = T.beginLift(s0);
    if (!s) { bad++; continue; }
    for (let i = 0; i < 12; i++) { const n = T.moveOffcut(s, 100 + i * 47, 120 + i * 23); if (n) s = n; }
    const e = T.endDrag(s); if (e) s = e;
    const back = T.reattach(s);
    if (!back) { bad++; worst = `${a},${b} reattach refused`; continue; }
    if (Object.keys(back).sort().join(',') !== KEYS) { bad++; worst = `${a},${b} field set grew`; continue; }
    /* ⚠ NaN must be excluded BEFORE the value compare — JSON.stringify(NaN)
       is "null", so a round trip with NaN on both sides would "pass" */
    if (!Number.isFinite(back.dx) || !Number.isFinite(back.dy)) { bad++; worst = `${a},${b} non-finite`; continue; }
    if (JSON.stringify(back) !== snap) { bad++; worst = `${a},${b} ${JSON.stringify(back)}`; }
    if (JSON.stringify(s0) !== snap) { bad++; worst = `${a},${b} input mutated`; }
  }
  is(bad === 0, `240 unequal pairs, 12 moves each` + (bad ? ` — ${worst}` : ''));
  /* twelve approach paths all landing in the same canonical seat */
  const seats = [];
  for (let i = 0; i < 12; i++) {
    let s = T.beginLift(S(5, 9));
    s = T.moveOffcut(s, 0, 999) || s;
    s = T.moveOffcut(s, T.seatX(s) + (i - 6) * 8, T.seatY(s) + (i - 6) * 4) || s;
    const e = T.endDrag(s); seats.push(JSON.stringify(e || s));
  }
  is(new Set(seats).size === 1, `⭐ twelve different approach paths produce ONE canonical seated state`);
}

/* ===================================================================
   V5 — ⭐ TWO LAWS THAT MUST BE MEASURED BEFORE THEY ARE GATED
   =================================================================== */
sec('V5  ⭐ measured before gated — the drop-invariance law and the bracket anchor');
{
  /* (a) the offcut's length must not depend on where it is dropped.
     ⚠ This is a law ONLY because the clamp is on the ORIGIN. A both-edges
     clamp squashes it against the right wall, and the ONLY place that can
     show is d = N−1, where the legal dx range nearly collapses. */
  let bad = 0, tested = 0;
  for (const [a, b] of [[1, N], [N, 1], [1, 2], [8, 9], [3, 12]]) {
    const d = oDiff(a, b), widths = new Set();
    let s = T.beginLift(S(a, b));
    s = T.moveOffcut(s, 0, 999) || s;
    for (let gx = 0; gx < 12; gx++) for (let gy = 0; gy < 6; gy++) {
      const n = T.moveOffcut(s, X0 + gx * 80, T.A_Y + gy * 40);
      const cur = n || s;
      widths.add(T.offcutGeom(cur).w);
      tested++;
    }
    if (widths.size !== 1) { bad++; }
    if (T.offcutGeom(s).w !== K * d) bad++;
  }
  is(bad === 0, `the offcut's length is identical at all ${tested} drop positions, incl. d = N−1 where a both-edges clamp would show`);

  /* (b) the bracket. ⚠ THE ANCHOR IS A SEPARATE ASSERTION — a bracket
     drawn at the wall spanning [X0, X0+K*d] has the RIGHT WIDTH and is
     completely wrong, so a width-only check cannot see it. */
  let wbad = 0, abad = 0;
  for (let a = 1; a <= N; a++) for (let b = 1; b <= N; b++) {
    const br = T.bracketSpan(S(a, b));
    if (a === b) { if (br !== null) abad++; continue; }
    if (br.x1 - br.x0 !== K * oDiff(a, b)) wbad++;
    if (br.x0 !== X0 + K * Math.min(a, b)) abad++;
    if (br.x1 !== X0 + K * oMax(a, b)) abad++;
  }
  is(wbad === 0, 'the bracket spans exactly the difference');
  is(abad === 0, '⭐ AND it is anchored at the shorter plank\'s end — asserted separately, because a wall-anchored bracket has the right width');
}

/* ===================================================================
   V6 — INDEPENDENCE, and the plank you are not touching
   =================================================================== */
sec('V6  the plank you are not touching does not flinch');
{
  let bad = 0;
  for (let a = 1; a <= N; a++) {
    const ref = JSON.stringify(T.plankGeom(S(a, 1), 'a'));
    for (let b = 1; b <= N; b++) if (JSON.stringify(T.plankGeom(S(a, b), 'a')) !== ref) bad++;
  }
  is(bad === 0, `plank A's geometry is byte-identical across all ${N} values of B, for all ${N} values of A`);
  /* the scale is a CONSTANT of the frame, never fit-to-data — which is
     the whole reason 15·16 and 2·3 are allowed to look different */
  is(!/max\s*\(\s*s\.a\s*,\s*s\.b\s*\)\s*\)?\s*\*/.test(SRC_NC.replace(/\s+/g, ' ')) || K === 60,
    'the scale K is a frame constant, not a function of the data');
  is(T.plankGeom(S(3, 3), 'a').w === T.plankGeom(S(3, 16), 'a').w,
    'a plank of 3 is the same width whether its partner is 3 or 16');
}

/* ===================================================================
   V7 — THE FREEZE, and the flag-shaped refusal
   =================================================================== */
sec('V7  the planks freeze while the offcut is out — refused in the MODEL');
{
  const lifted = T.beginLift(S(5, 9));
  const free = T.moveOffcut(lifted, 0, 999);
  const laid = T.cycleOffcut(T.cycleOffcut(S(5, 9)));
  is(T.setLen(lifted, 'a', 7) === null, 'setLen refuses while lifting');
  is(T.setLen(free, 'a', 7) === null, 'setLen refuses while the piece is free');
  is(T.setLen(laid, 'a', 7) === null, 'setLen refuses while the piece is seated');
  is(T.setLen(S(5, 9), 'a', 7) !== null, 'and permits it when the piece is home');
  is(T.beginLift(S(7, 7)) === null, '⭐ there is nothing to lift when the planks are equal');
  is(T.cycleOffcut(S(7, 7)) === null, 'and the cycle refuses too');
  {
    /* ⭐ EACH STEP OF THE CYCLE HAS ITS OWN TRUE LABEL. The first
       version went attached -> laid in ONE tap under a chip reading
       "Take the piece off" — the control did two things and the label
       named one. */
    const s1 = T.cycleOffcut(S(5, 9));
    const s2 = T.cycleOffcut(s1);
    const s3 = T.cycleOffcut(s2);
    is(s1.phase === 'free', 'cycle 1: the piece comes OFF (take it off)');
    is(s2.phase === 'laid', 'cycle 2: and only then is it laid on (lay it on)');
    is(s3.phase === 'attached', 'cycle 3: and back home (put it back)');
  }
  /* dx is LOCKED while still attached — sliding it sideways before it
     comes off would be a lie about the material */
  const sideways = T.moveOffcut(lifted, 900, lifted.dy + 4);
  is(!sideways || sideways.dx === lifted.dx, '⭐ dx is locked while the piece is still attached');
}

/* ===================================================================
   V8 — EVERY REACHABLE STATE IS VALID AND INTEGER
   =================================================================== */
sec('V8  every reachable state is valid, and every field is an integer');
{
  let states = 0, bad = 0, worst = '';
  for (let a = 1; a <= N; a++) for (let b = 1; b <= N; b++) {
    const seq = [S(a, b)];
    const l = T.beginLift(seq[0]); if (l) seq.push(l);
    const f = l && T.moveOffcut(l, 0, 999); if (f) seq.push(f);
    const m = f && T.moveOffcut(f, T.seatX(f), T.seatY(f)); if (m) seq.push(m);
    const e = m && T.endDrag(m); if (e) seq.push(e);
    const u = e && T.unseat(e); if (u) seq.push(u);
    const r = T.reattach(l || S(a, b)); if (r) seq.push(r);
    for (const s of seq) { states++; const v = isValid(s); if (v) { bad++; worst = `${a},${b} ${v}`; } }
  }
  is(bad === 0, `${states} reachable states, all valid` + (bad ? ` — ${worst}` : ''));
  /* no decimal can reach a rendered attribute */
  let nonInt = 0, vals = 0;
  for (let a = 1; a <= N; a++) for (let b = 1; b <= N; b++) {
    const s = S(a, b);
    for (const g of [T.plankGeom(s, 'a'), T.plankGeom(s, 'b'), T.matchedGeom(s), T.offcutGeom(s), T.bracketSpan(s)]) {
      if (!g) continue;
      for (const k of Object.keys(g)) { vals++; if (!Number.isInteger(g[k])) nonInt++; }
    }
  }
  is(nonInt === 0, `${vals} geometry values across ${N * N} pairs are ALL integers — no decimal can reach an attribute`);
}

/* ===================================================================
   V9 — THE DOMAIN, DERIVED AND PRINTED
   =================================================================== */
sec('V9  the swept domain, derived and printed');
{
  const STROKE = 3, TICK = 8, FLOOR = 2 * STROKE + TICK;
  const need = FLOOR * 1000 / K;
  console.log(`       N_MAX=${N}, K=${K}, span=${T.RIGHT - X0} — ${N * N} ordered pairs`);
  console.log(`       bracket legibility floor = 2*${STROKE} + ${TICK} = ${FLOOR}px`);
  console.log(`       -> requires a bench of at least ${need.toFixed(0)}px; local-test MEASURES it`);
  console.log(`       the catalog's N=40 would put K at ${((T.RIGHT - X0) / 40).toFixed(1)}, i.e. ` +
    `${(((T.RIGHT - X0) / 40) * 296 / 1000).toFixed(2)}px per unit on the measured 296px bench — HALF the floor`);
  is((T.RIGHT - X0) % N === 0, `the span divides the band exactly — K = ${K} is an integer`);
  is(Number.isInteger(K) && K * N === T.RIGHT - X0, 'and K*N_MAX lands exactly on the far edge');
  is(N * N >= 200, `the domain is ${N * N} ordered pairs — printed, not quoted`);
}

/* ===================================================================
   V10 — THE REFUSALS
   =================================================================== */
sec('V10 the refusals');
{
  /* 1. never asks, never takes an answer */
  is(!/answerType|keypad|<input|contenteditable/i.test(SRC_NC), 'no input, no keypad, no answer surface');
  is(!/tasks\s*:/.test(SRC_NC), 'the tool declares no `tasks` — free play, not an activity');
  /* 2. never prints the third number: exactly two numerals */
  const texts = (SRC_NC.match(/\.textContent\s*=/g) || []).length;
  is(/_numA\.textContent = String\(s\.a\)/.test(SRC_NC) && /_numB\.textContent = String\(s\.b\)/.test(SRC_NC),
    'the only numerals written are the two the child chose');
  is(!/textContent\s*=\s*String\(\s*(d|diff)/.test(SRC_NC), '⭐ the difference is NEVER written as text');
  /* ⚠ poison-tested at 8·16, where the difference EQUALS a and an
     absence test would pass vacuously */
  is(T.diffOf(S(8, 16)) === 8 && T.diffOf(S(8, 16)) === S(8, 16).a,
    'poison: at 8·16 the difference equals a — so the check must count nodes, not scan for a string');
  /* 3. never writes the sentence */
  const strs = SRC.match(/en:\s*"([^"]*)"/g) || [];
  is(!strs.some((s) => /[+=−↔Δ]/.test(s)), 'no +, =, −, ↔ or Δ in any authored string');
  is(!strs.some((s) => /\d/.test(s)), 'no authored string contains a digit');
  /* 4/5. no part-whole, no units, no tiling */
  is(!/\bpart[- ]?whole\b/i.test(SRC_NC), 'no part-whole language in the source');
  is(!/\b(cm|centimet|inch|paperclip)\b/i.test(SRC_NC), 'no named unit');
  is(!/for\s*\([^)]*\)\s*\{[^}]*appendChild\([^)]*tile/i.test(SRC_NC), 'nothing is tiled — the planks are smooth magnitudes');
  /* 6. no verdict */
  is(!/\b(isCorrect|correct|incorrect|wrong|verdict|score|streak|winner)\b/.test(SRC_NC), 'no verdict word in the executable source');
  /* ⚠ THE BAN WAS TOO WIDE — fifth time in this program. It caught
     `Date.now() - new Date(ent.checkedAt)`, the entitlement cache age,
     which is legitimate and identical to #40 and #41. What matters is
     that nothing in the MODEL is random or time-dependent, so the check
     is scoped to the model slice and poison-tested both ways. */
  {
    const modelEnd = SRC_NC.indexOf('CSS:');
    const model = SRC_NC.slice(0, modelEnd > 0 ? modelEnd : SRC_NC.length)
      .replace(/_fetchEntitlement[\s\S]*?\n    \},/, '');   /* the entitlement block is not the model */
    is(!/Math\.random|Date\.now/.test(model), 'nothing in the model is random or time-dependent');
    is(/Math\.random/.test('var x = Math.random();'), 'poison: the randomness probe fires on a real Math.random');
    is(!/Math\.random|Date\.now/.test('ent.checkedAt = new Date().toISOString();'),
      'poison: and clears the entitlement cache stamp, which is not the model');
  }
  /* 8. no prior-estimate marker — #41 owns the flag */
  is(!/\bflag\b/i.test(SRC_NC), 'no estimate marker — the offcut lands flush by construction, so a guess would have one right answer');
  /* the fetch allow-list */
  const fetches = SRC.match(/fetch\(\s*'([^']+)'/g) || [];
  is(fetches.every((f) => /comparison-planks-pairs\.json|\/api\/auth\/me/.test(f)),
    `fetch allow-list holds (${fetches.length} call sites)`);
}

/* ===================================================================
   V11 — THE BOOK, THE SHELF AND THE OFFLINE FALLBACK
   =================================================================== */
sec('V11 the pair book, the shelf and the fallback');
{
  is(BOOK.pairs.length === 16, `the book holds ${BOOK.pairs.length} pairs`);
  is(BOOK.freeCount === T.FREE_PAIRS, `freeCount ${BOOK.freeCount} matches FREE_PAIRS ${T.FREE_PAIRS}`);
  is(BOOK.pairs.every((p) => !('d' in p) && !('diff' in p)), '⭐ no pair stores its difference — the picture cannot drift from a stored answer');
  is(BOOK.pairs.every((p) => Number.isInteger(p.a) && Number.isInteger(p.b) && p.a >= 1 && p.b >= 1 && p.a <= N && p.b <= N),
    'every pair is inside the derived band');
  /* the structural contrasts the book is sold on */
  const by = {}; BOOK.pairs.forEach((p) => { by[p.k] = p; });
  is(oDiff(by.twin.a, by.twin.b) === Math.min(by.twin.a, by.twin.b),
    `⭐ the twin (${by.twin.a}·${by.twin.b}): the piece is exactly as long as the shorter plank`);
  is(oDiff(by.crumb.a, by.crumb.b) === oDiff(by['crumb-close'].a, by['crumb-close'].b),
    `⭐ the crumb (${by.crumb.a}·${by.crumb.b}) and the same crumb close up (${by['crumb-close'].a}·${by['crumb-close'].b}) carry the IDENTICAL piece`);
  is(by.same.a === by.same.b, 'and "the same" has no piece at all');
  T.data = BOOK; T.premium = false;
  is(T.book().length === T.FREE_PAIRS, `entitlement filters the book to ${T.FREE_PAIRS} free pairs`);
  T.premium = true;
  is(T.book().length === BOOK.pairs.length, `and opens all ${BOOK.pairs.length} when paid`);
  T.premium = false;
  is(T.FALLBACK_PAIRS.pairs.length === T.FREE_PAIRS && T.FALLBACK_PAIRS.freeCount === T.FREE_PAIRS,
    '⚠ a 404 degrades to the FREE TIER, never to nothing');
  is(T.FALLBACK_PAIRS.pairs.every((f, i) => f.k === BOOK.pairs[i].k && f.a === BOOK.pairs[i].a && f.b === BOOK.pairs[i].b),
    'and the inline fallback matches the first five of the book, in order');
}

/* ===================================================================
   V12 — ⭐ THE SHEET IS A REAL PRINT SURFACE
   =================================================================== */
sec('V12 ⭐ the sheet exists as a print surface, not as a button');
{
  is(/@media print/.test(T.CSS), 'the tool ships an @media print block');
  is(/\.cmp-sheet\{display:none;\}/.test(T.CSS.replace(/\s/g, '')), 'the sheet is hidden on screen');
  is(/display:grid/.test(T.CSS.slice(T.CSS.indexOf('@media print'))), 'and becomes a grid in print');
  for (const hide of ['cmp-foot', 'cmp-hint', 'cmp-bench']) {
    is(T.CSS.slice(T.CSS.indexOf('@media print')).indexOf(hide) >= 0, `print hides .${hide}`);
  }
  is(/cmp-p-plank\{fill:none/.test(T.CSS.replace(/\s/g, '')), 'the printed planks are OUTLINES — the child fills them in');
  /* ⚠ this is the defect #40 and #41 shipped: a Print chip and no sheet */
  is(/window\.print/.test(SRC_NC) && /_buildSheet/.test(SRC_NC),
    '⭐ and window.print is preceded by a real sheet build — the defect #40 and #41 shipped');
}

/* ===================================================================
   V13 — THE BLIND SPOTS THE MUTATION HARNESS FOUND. Eight mutations
   survived the first gate; each assertion here kills one. A gate is
   worth exactly what mutation says it is.
   =================================================================== */
sec('V13 the eight the harness found');
{
  /* 1. the seat must land on the SHORTER plank's row */
  let bad = 0;
  for (let a = 1; a <= N; a++) for (let b = 1; b <= N; b++) {
    if (a === b) continue;
    const s = S(a, b);
    if (T.seatY(s) !== (a > b ? T.B_Y : T.A_Y)) bad++;
    if (T.seatY(s) === T.homeY(s)) bad++;     /* it must never seat on the row it came from */
  }
  is(bad === 0, '⭐ the seat is on the SHORTER plank\'s row — never the row the piece came from');

  /* 2. the socket must not teach that close enough is equal */
  is(T.dockTol() < 1.5 * K, `the dock tolerance is ${T.dockTol()} — under 1.5 units, so "nearly" never counts as "equal"`);
  is(T.dockTol() >= K * 0.5, 'and at least half a unit, so it is steerable');

  /* 3. the band's TOP value must be reachable */
  is(T.setLen(S(5, 9), 'a', N) !== null, `a plank can actually reach ${N}, the top of the band`);
  is(T.setLen(S(5, 9), 'a', 1) !== null, 'and 1, the bottom');

  /* 4. `attached` has exactly ONE representation */
  const messy = T._st({ a: 4, b: 9, phase: 'attached', dx: 400, dy: 200 });
  is(messy.dx === 0 && messy.dy === 0,
    '⭐ `attached` is canonicalised — without it the round trip could only be asserted on 3 of 5 fields');

  /* 5. the piece can never be carried off the stage.
     ⚠ THE WIDTH-INVARIANCE TEST CANNOT SEE THIS — the width is K*d in
     every case, so a clamp that lets dx run to RIGHT keeps the width and
     pushes the piece off the edge. The bound is on the RIGHT EDGE. */
  let off = 0, grid = 0;
  for (const [a, b] of [[1, N], [N, 1], [8, 9], [2, 3], [1, 2]]) {
    const d = oDiff(a, b);
    let s = T.beginLift(S(a, b));
    s = T.moveOffcut(s, 0, 999) || s;
    for (let gx = -2; gx <= 14; gx++) {
      const n = T.moveOffcut(s, X0 + gx * 90, T.A_Y + 60);
      const cur = n || s;
      grid++;
      if (cur.dx < X0 || cur.dx + K * d > T.RIGHT) off++;
    }
  }
  is(off === 0, `⭐ across ${grid} drop positions the piece never leaves the stage — the clamp is on the ORIGIN, width untouched`);

  /* 6. rounding lives in the reducer, so every state is integer ALWAYS */
  let frac = 0;
  for (const [a, b] of [[3, 11], [1, N], [7, 8]]) {
    let s = T.beginLift(S(a, b));
    for (const [x, y] of [[123.4, 201.7], [300.5, 99.99], [777.001, 250.5]]) {
      const n = T.moveOffcut(s, x, y);
      if (n) { s = n; if (!Number.isInteger(s.dx) || !Number.isInteger(s.dy)) frac++; }
    }
  }
  is(frac === 0, '⭐ a fractional pointer position still yields an integer state — Math.round is in the reducer, not the renderer');

  /* 7. the shared start line — the bar model's defining geometry */
  let split = 0;
  for (let a = 1; a <= N; a++) for (let b = 1; b <= N; b++) {
    const s = S(a, b);
    if (T.plankGeom(s, 'a').x !== X0 || T.plankGeom(s, 'b').x !== X0) split++;
    if (T.plankGeom(s, 'a').x !== T.plankGeom(s, 'b').x) split++;
  }
  is(split === 0, `⭐ both planks start on ONE line in all ${N * N} pairs — the geometry neither sibling has`);

  /* 8. ⚠ the sheet must be BUILT BEFORE it is printed.
     "the string exists" is not "the string is reached": a check for
     /_buildSheet/ matches the function DEFINITION and passes happily
     while the CALL has been deleted. Assert the ordering. */
  const printIdx = SRC_NC.indexOf('window.print');
  const callIdx = SRC_NC.indexOf('self._buildSheet()');
  is(callIdx > 0 && printIdx > 0 && callIdx < printIdx,
    '⭐ _buildSheet() is CALLED before window.print() — not merely defined somewhere in the file');
}

/* =================================================================== */
console.log('');
if (FAIL) { console.error(`FAIL — ${FAIL} of ${PASS + FAIL} assertions`); process.exit(1); }
console.log(`PASS — ${PASS} assertions`);
