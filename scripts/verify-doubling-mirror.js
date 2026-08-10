/* =====================================================================
   MODEL GATE — TOOL #54, THE DOUBLING MIRROR
   =====================================================================
   ⚠⚠ THE ORACLE IS DERIVED FROM THE STATED RULE, NOT FROM THE CODE
   (#51: five live bugs under 16,626 assertions), AND EVERY STORED VALUE
   IS CHECKED AGAINST THE LAW THAT PRODUCED IT (#52: four contradictory
   states under 908).

   THE RULE, in words: a tray of two leaves. While the hinge is open the
   near leaf holds n and the far leaf holds nothing. Closing puts n REAL
   counters on the far leaf, so the tray carries 2n and every counter can
   be touched once. Opening a total t gives floor(t/2) to each leaf; when
   t is ODD one counter has no partner and WAITS — and the class gives it
   a leaf, which makes t into floor(t/2)+1 and floor(t/2).

   ⭐⭐ THE ODD CASE IS A CHOICE, NOT A REFUSAL, and that is a ruling
   rather than a preference: "the apparatus refuses at the boundary"
   already shipped twice this week (#52's teeter, #53's archway), and the
   pedagogy panel measured that "for 9 the line cannot rest" is FALSE —
   nine counters ARE symmetric about the fifth; the line rests, it just
   does not partition. This gate asserts that no path ever stalls.

   Run: node scripts/verify-doubling-mirror.js
   ===================================================================== */
'use strict';
const path = require('path');
const fs = require('fs');

const DIR = process.env.DOUBLING_MIRROR_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const SRC = path.join(DIR, 'doubling-mirror.js');
const T = require(SRC);
const G = T.GEO;

let pass = 0;
const fails = [];
const ok = (c, m) => { if (c) pass++; else fails.push(m); };
const eq = (a, b, m) => ok(a === b, m + ' — got ' + JSON.stringify(a) + ', expected ' + JSON.stringify(b));

/* L0 — constants first */
const NEEDED = ['CAP', 'ROW', 'T_CLOSE', 'T_OPEN', 'T_PLACE', 'T_REFUSE', 'T_BEAT',
  'RM_F', 'RM_FLOOR', 'SND_PLACE', 'SND_CLOSE', 'SND_OPEN', 'SND_SIDE', 'SND_REFUSE', 'T_SND_DEBOUNCE'];
ok(NEEDED.length >= 13, 'L0 non-vacuity: the constant list is implausibly short');
NEEDED.forEach(k => ok(typeof G[k] === 'number' && isFinite(G[k]), 'L0 GEO.' + k + ' missing'));

/* ================================================================== */
/* ⭐ L1 — CLOSING IS A DUPLICATION OF REAL COUNTERS, NOT AN IMAGE.
   Every n, enumerated: the far leaf holds exactly what the near one
   does, the tray carries 2n, and NOTHING is derived from a reflection. */
{
  let seen = 0, closed = 0;
  for (let n = 0; n <= G.CAP; n++) {
    let st = { near: n, closed: false, odd: null, opened: null };
    seen++;
    eq(T.far(st), 0, 'L1 the far leaf is not empty while the hinge is open, at n=' + n);
    eq(T.total(st), n, 'L1 an open tray carries more than its near leaf, at n=' + n);
    const c = T.close(st);
    if (n === 0) { ok(c === null, 'L1 an empty tray closed'); continue; }
    ok(c !== null, 'L1 close refused at n=' + n);
    eq(T.nearShown(c), n, 'L1 the near leaf changed on closing, at n=' + n);
    eq(T.far(c), n, 'L1 ⭐ the far leaf is not the same count as the near, at n=' + n);
    eq(T.total(c), 2 * n, 'L1 ⭐ the closed tray does not carry the double, at n=' + n);
    ok(T.close(c) === null, 'L1 the tray closed twice at n=' + n);
    /* @@ ADDING TO A CLOSED TRAY IS NOW THE ODD ONE, and this assertion
       used to say the opposite. It encoded the behaviour that made the
       headline unreachable, which is the oracle sharing the code's
       misconception - and it failed the moment the code was fixed,
       which is exactly what a gate is for. */
    const plus = T.place(c, 1);
    ok(plus !== null, 'L1 one more could not be added to a closed tray at n=' + n);
    if (plus) {
      eq(plus.odd, 0, 'L1 the extra counter is not waiting at n=' + n);
      eq(T.total(plus), 2 * n + 1, 'L1 the tray does not carry an ODD total at n=' + n);
      ok(T.place(plus, 1) === null, 'L1 a SECOND outsider was accepted at n=' + n);
    }
    closed++;
  }
  eq(seen, G.CAP + 1, 'L1 non-vacuity: near-counts walked');
  eq(closed, G.CAP, 'L1 non-vacuity: trays closed');
}

/* ================================================================== */
/* ⭐⭐ L2 — OPENING NEVER STALLS, AND THE ODD ONE ALWAYS GETS A SIDE.
   Every total from 2 to 2*CAP, both directions of the choice. */
{
  let evens = 0, odds = 0, placed = 0;
  const base = { near: 1, closed: true, odd: null, opened: null };
  for (let t = 2; t <= G.CAP * 2; t++) {
    const o = T.open(base, t);
    ok(o !== null, 'L2 open refused a legal total ' + t);
    if (!o) continue;
    eq(o.near, Math.floor(t / 2), 'L2 the halves are wrong at t=' + t);
    if (t % 2 === 0) {
      eq(T.waiting(o), false, 'L2 an EVEN total left somebody waiting at t=' + t);
      eq(T.nearShown(o) + T.far(o), t, 'L2 the tray lost counters opening ' + t);
      eq(T.nearShown(o), T.far(o), 'L2 ⭐ an even total did not open into two equal leaves at t=' + t);
      ok(T.giveSide(o, 1) === null, 'L2 a side was given with nobody waiting at t=' + t);
      evens++;
    } else {
      eq(T.waiting(o), true, 'L2 ⭐ an ODD total did not leave one waiting at t=' + t);
      odds++;
      /* ⭐⭐ AND IT NEVER STALLS: both sides are always available, and
         either choice conserves the total. This is the assertion that
         distinguishes this tool from #52 and #53, whose whole point is
         that the apparatus does NOT resolve. */
      [-1, 1].forEach(function (dir) {
        const g = T.giveSide(o, dir);
        ok(g !== null, 'L2 ⭐⭐ the odd one could not be given to side ' + dir + ' at t=' + t);
        if (!g) return;
        eq(T.waiting(g), false, 'L2 still waiting after a side was chosen at t=' + t);
        eq(T.nearShown(g) + T.far(g), t, 'L2 ⭐ giving the odd one a side changed the total at t=' + t);
        eq(Math.abs(T.nearShown(g) - T.far(g)), 1, 'L2 the two leaves differ by more than one at t=' + t);
        /* the chosen leaf is the one that grew */
        if (dir < 0) eq(T.nearShown(g), T.far(g) + 1, 'L2 the odd one went to the wrong leaf at t=' + t);
        else eq(T.far(g), T.nearShown(g) + 1, 'L2 the odd one went to the wrong leaf at t=' + t);
        ok(T.giveSide(g, dir) === null, 'L2 the odd one was given a side twice at t=' + t);
        placed++;
      });
    }
  }
  ok(evens > 0 && odds > 0, 'L2 non-vacuity: evens=' + evens + ' odds=' + odds);
  eq(placed, odds * 2, 'L2 non-vacuity: every odd total was resolved BOTH ways');
  /* @@ DERIVED, NOT GUESSED. My first version asserted CAP. The odd
     totals in [2, 2*CAP] are 3, 5, ... 2*CAP-1, which is CAP-1 of them,
     and asserting a number I liked rather than one I derived is the
     recorded #52 defect. */
  /* @@ CAP - 1, AND I BROKE THIS ONCE BY 'FIXING' IT. The odd totals in
     [2, 2*CAP] are 3, 5, ... 2*CAP-1, which is CAP-1 of them for ANY
     cap. When the cap changed from 20 to 9 I replaced the derivation
     with CAP because the two numbers had coincided under the old
     value - which is the invented-threshold defect arriving by the
     back door, as a REGRESSION of a correct derivation rather than as
     a fresh guess. The gate caught it immediately, which is the point
     of asserting a derived count rather than a remembered one. */
  eq(odds, G.CAP - 1, 'L2 non-vacuity: odd totals walked');
  console.log('  ' + evens + ' even totals split cleanly; ' + odds + ' odd totals each resolved BOTH ways');
}

/* ================================================================== */
/* @@@ L2b - REACHABILITY. WALK ONLY WHAT THE BUTTONS CAN REACH.
   This is the assertion that was missing, and its absence let the tool's
   headline invention ship UNREACHABLE under 626 assertions and 16 pixel
   checks. Both earlier gates called open(st, 9) with an explicit total -
   a path no control invokes - so both proved the MODEL correct and
   neither proved the TOOL could get there. That is "a gate you help past
   is not a gate", and I wrote the help myself.

   Every state below is produced ONLY by the moves a control calls:
   place(+-1), close(), open() with no argument, giveSide(). */
{
  const seen = {}, queue = [];
  const key = st => st.near + '|' + st.closed + '|' + st.odd + '|' + st.opened;
  ['few', 'ten'].forEach(function (start) {
    const s0 = T.newState(start);
    seen[key(s0)] = s0; queue.push(s0);
  });
  let guard = 0;
  while (queue.length && guard++ < 4000) {
    const st = queue.shift();
    [T.place(st, 1), T.place(st, -1), T.close(st), T.open(st),
     T.giveSide(st, -1), T.giveSide(st, 1)].forEach(function (n) {
      if (!n) return;
      const k = key(n);
      if (seen[k]) return;
      seen[k] = n; queue.push(n);
    });
  }
  const states = Object.keys(seen).map(k => seen[k]);
  ok(guard < 4000, 'L2b the reachable walk did not terminate');
  ok(states.length > 30, 'L2b non-vacuity: only ' + states.length + ' reachable states');

  /* @@@ THE HEADLINE MUST BE REACHABLE BY BUTTONS ALONE. */
  const odd = states.filter(x => x.odd === 0);
  ok(odd.length > 0,
    'L2b NO REACHABLE STATE LEAVES A COUNTER WAITING - the odd case, which is the whole headline, cannot be got to by pressing buttons');
  const sided = states.filter(x => x.odd === -1 || x.odd === 1);
  ok(sided.length > 0, 'L2b @@@ the odd one can never be given a leaf from any reachable state');
  const openedOdd = states.filter(x => x.odd !== null && x.opened !== null);
  ok(openedOdd.length > 0, 'L2b @@@ an ODD tray can never be opened from any reachable state');

  /* and the specific sentence the catalog sells */
  let six = T.newState('few');
  while (six.near < 6) six = T.place(six, 1);
  const thirteen = T.place(T.close(six), 1);
  ok(thirteen !== null, 'L2b one more could not be added to a closed tray');
  eq(T.total(thirteen), 13, 'L2b six doubled plus one is not thirteen');
  const split = T.open(thirteen);
  ok(split !== null && T.waiting(split), 'L2b thirteen did not open into a waiting odd one');
  const far = T.giveSide(split, 1);
  eq(T.nearShown(far) + '+' + T.far(far), '6+7', 'L2b @@@ "double six and the one who would not fit" does not produce 6 and 7');

  /* @@ OPENING MUST HAVE A CONSEQUENCE. It returned closed:true, so
     nothing in the DOM moved - the #39 consequence-free-control class,
     which the shared liveness gate scores GREEN because the control acts. */
  const closedStates = states.filter(x => x.closed && x.opened === null);
  ok(closedStates.length > 0, 'L2b non-vacuity: no closed state reached');
  closedStates.forEach(function (x) {
    const o = T.open(x);
    if (!o) return;
    ok(o.closed === false, 'L2b @@ opening left the tray CLOSED - the control has no consequence');
    ok(o.opened !== null, 'L2b opening did not record that the tray was taken apart');
  });
  console.log('  ' + states.length + ' states reachable by button alone; ' +
    odd.length + ' leave one waiting, ' + sided.length + ' resolve it');
}

/* @@@ L2c - NO ANSWER IS LIVE BEFORE ITS QUESTION EXISTS, AND NO CAP MAY
   DISAGREE WITH ANOTHER. Both of these were CREATED by the L2b fix and
   found by a native panel re-driving the repaired model - which is why a
   repair is not finished when the thing it repaired starts working. */
{
  const seen = {}, queue = [];
  const key = st => st.near + '|' + st.closed + '|' + st.odd + '|' + st.opened;
  ['few', 'ten'].forEach(function (start) {
    const s0 = T.newState(start); seen[key(s0)] = s0; queue.push(s0);
  });
  let guard = 0;
  while (queue.length && guard++ < 4000) {
    const st = queue.shift();
    [T.place(st, 1), T.place(st, -1), T.close(st), T.open(st),
     T.giveSide(st, -1), T.giveSide(st, 1)].forEach(function (n) {
      if (!n) return; const k = key(n); if (seen[k]) return; seen[k] = n; queue.push(n);
    });
  }
  const states = Object.keys(seen).map(k => seen[k]);
  ok(states.length > 30, 'L2c non-vacuity: only ' + states.length + ' states');

  /* @@ every state where a side can be given must ALREADY have been
     opened - otherwise the announcement carries a null `opened` straight
     into _fmt as a raw {t} token AND claims the tray opened while shut. */
  let livePremature = 0, sideable = 0;
  states.forEach(function (x) {
    const g = T.giveSide(x, 1);
    if (!g) return;
    sideable++;
    if (x.opened === null) livePremature++;
    ok(g.opened !== null, 'L2c a side was given from a state with no opened total');
  });
  ok(sideable > 0, 'L2c non-vacuity: no state could give a side');
  eq(livePremature, 0, 'L2c @@@ the side control is live before anything has been opened - the announcement leaks a raw {t}');

  /* @@ THE CAPS MUST AGREE. Anything place() can build, open() must take. */
  let unopenable = 0, built = 0;
  states.forEach(function (x) {
    if (!x.closed || x.opened !== null) return;
    built++;
    const t = T.total(x);
    if (T.open(x) === null && t >= 2) unopenable++;
  });
  ok(built > 0, 'L2c non-vacuity: no closed tray reached');
  eq(unopenable, 0, 'L2c @@@ a tray can be BUILT that open() refuses - the two caps disagree');
  eq(GEO_MAXT(), G.CAP * 2 + 1, 'L2c the open ceiling is not the build ceiling');
  function GEO_MAXT() {
    /* derived: the largest total place() can reach is the double plus
       the one outsider, so open() must accept exactly that. */
    let x = T.newState('few');
    while (T.place(x, 1)) x = T.place(x, 1);
    let c = T.close(x);
    const p = T.place(c, 1);
    return T.total(p || c);
  }
}

/* L3 — placing, and honest refusals at both ends */
{
  let refused = 0, moved = 0;
  for (let n = 0; n <= G.CAP; n++) {
    const st = { near: n, closed: false, odd: null, opened: null };
    const up = T.place(st, 1), down = T.place(st, -1);
    if (n === G.CAP) { ok(up === null, 'L3 ⚠ the leaf took more than CAP'); refused++; }
    else { ok(up !== null && up.near === n + 1, 'L3 add failed at n=' + n); moved++; }
    if (n === 0) { ok(down === null, 'L3 ⚠ the leaf went below zero'); refused++; }
    else { ok(down !== null && down.near === n - 1, 'L3 take failed at n=' + n); moved++; }
  }
  eq(refused, 2, 'L3 non-vacuity: end refusals');
  ok(moved > 0, 'L3 non-vacuity: no legal placement exercised');
}

/* L4 — every named constant reaches a call site */
{
  const src = fs.readFileSync(SRC, 'utf8').split(String.fromCharCode(13, 10)).join('\n');
  const body = src.replace(/\/\*[\s\S]*?\*\//g, '');
  Object.keys(G).forEach(function (k) {
    ok((body.match(new RegExp('GEO\\.' + k + '\\b', 'g')) || []).length >= 1,
      'L4 ⚠ GEO.' + k + ' is DEAD — declared, documented and never read');
  });
  ok(!/_dur\(\s*GEO\.T_BEAT/.test(body), 'L4 ⚠⚠ T_BEAT goes through _dur() — a wait is not movement');
}

/* ⭐⭐ L5 — THE REFUSE-LIST IS A GATE, NOT A NOTE. The pedagogy panel
   ruled DO NOT BUILD and its binding condition was that no reflection
   may ever represent a COUNT. These are the parts a gate can hold. */
{
  const BAN = ['mirror', 'reflection', 'reflect', 'glass', 'twin', 'fold', 'crease', 'image'];
  const ban = w => new RegExp('(?<!\\p{L})' + w + '(?!\\p{L})', 'iu');
  const all = Object.keys(T.strings);
  ok(all.length >= 28, 'L5 non-vacuity: implausibly few strings (' + all.length + ')');
  all.forEach(function (k) {
    const v = T.strings[k];
    ok(v && typeof v === 'object' && !Array.isArray(v),
      'L5 ⚠ `' + k + '` is not a per-locale object — the shell will render the KEY');
    ok(v && typeof v.en === 'string' && v.en.length > 0, 'L5 ⚠ `' + k + '` has no English');
  });
  /* ⚠ the product NAME is the operator's and is exempt; no PART may
     carry any of these, because a reflection may be a map and never a
     count, and because `mirror`, `fold` and `twin` belong to
     folding-sheet #35 in all eleven locales. */
  all.filter(k => k !== 'title').forEach(function (k) {
    BAN.forEach(function (w) {
      ok(!ban(w).test(T.strings[k].en),
        'L5 ⚠⚠ `' + k + '` uses "' + w + '" — the refuse-list forbids a reflection representing a count, and folding-sheet owns the noun');
    });
  });
  ok(ban('mirror').test('before the mirror'), 'L5 poison: the ban failed to fire');
  ok(!ban('mirror').test('mirrored-ish'), 'L5 poison: the ban fired across a boundary it should respect');
  eq(T.strings.title.en, 'The Doubling Mirror', 'L5 the product name is the operator\'s');
  /* ⭐ and the odd case must be worded as a CHOICE, never as a stall */
  ok(/which leaf/i.test(T.strings.saidOddWaiting.en),
    'L5 ⭐ the odd case does not ask the class to choose — it must not be a third "apparatus refuses" gesture');
  ok(!/cannot|will not rest|never rests/i.test(T.strings.saidOddWaiting.en),
    'L5 ⚠⚠ the odd case is worded as a refusal; #52 and #53 already ship that gesture, and "for 9 the line cannot rest" is false anyway');
}

console.log('\n' + (fails.length ? 'FAIL' : 'PASS') + '  ' + pass + ' assertions, ' + fails.length + ' failures');
if (fails.length) { fails.slice(0, 25).forEach(f => console.log('  ✗ ' + f)); process.exit(1); }
