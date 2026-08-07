/* =====================================================================
   gen-number-sieve-boards.js — grow the Number Sieve library
   ---------------------------------------------------------------------
   Run:  node scripts/gen-number-sieve-boards.js [--write]

   Writes `mini tools/number-sieve-boards.json`. Every board is produced
   by the tool's own builder and then RE-PROVED here against an
   independent implementation of the six families before it is allowed
   into the file — so an invalid board cannot ship even if the builder
   were wrong.

   ⭐ THE BOARDS CARRY NO AUTHORED TEXT, IN ANY LOCALE. That is the whole
   reason this library can grow. wodb-grids.json is 84,734 bytes for 21
   grids because each one needs an 11-locale title and four 11-locale
   reasons; validity there is a judgement, so a generator cannot make one
   and a human must. Here a board is a range and a clue list, and
   validity is arithmetic — so the library is machine-grown and
   machine-proven, and it is bounded by taste rather than by translation.

   ⭐⭐ WHY THIS FILE WAS REWRITTEN, and it is the difference between 60
   boards and 307.

   (1) THE SHIPPED LIBRARY ENDED 2 -> 1 ON 44 OF ITS 60 BOARDS. The last
       card extinguished ONE number, so nothing went dark in a pattern
       and there was no rule to read off the closing move — the tool's
       entire thesis held for every card except the one the class cared
       about. Boards now have to arrive at the last card with at least
       MIN_PENULTIMATE numbers still alight.
   (2) THE BUILDER IS A TOTAL ORDER OVER EQUALLY-GOOD CARDS, so exactly
       ONE deck existed per (field, target) and the library could never
       have exceeded 240 boards however it was curated. A deterministic
       ROTATION of the keeper list reaches different — equally provable —
       decks. Measured: 307 boards satisfying every constraint at once,
       against 115 without it.
   (3) EVERY BOARD MUST ADMIT THE CLOSING CHOICE — one spare that
       isolates and two that do not, with distinct residues. A board that
       cannot offer the choice is not admitted, so the routine's best
       move is available on every single board in the library.

   Curation, which is the part a generator cannot do: the library favours
   decks that narrow in four or more steps and that use several different
   families, because that is what makes a board worth standing in front
   of. The builder guarantees CORRECT; this script chooses INTERESTING.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const TOOLS = path.join(ROOT, 'mini tools');
const OUT = path.join(TOOLS, 'number-sieve-boards.json');
const WRITE = process.argv.indexOf('--write') > -1;

const sandbox = {
  document: { getElementById: () => null, createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }), head: { appendChild() {} }, body: { classList: { add() {}, remove() {} } } },
  window: {}, localStorage: { getItem: () => null, setItem() {} },
  fetch: () => Promise.resolve({ ok: false }),
  setTimeout: () => 0, clearTimeout() {}, Promise, Math, Date, JSON, console
};
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(TOOLS, 'number-sieve.js'), 'utf8') + '\n;this.__T = NumberSieve;', sandbox);
const T = sandbox.__T;

/* the same independent oracle the gate uses — a board is never admitted
   on the builder's own word.
   ⚠ AN UNKNOWN OP RETURNS null, NOT A SILENT DEFAULT. The previous cut
   read `c.op === 'ge' ? >= : <=`, which treats ANY unrecognised op as
   "at most" — so this admission test was strictly WEAKER than the gate
   it claims to duplicate, and a malformed range card would have been
   admitted here and refused there. A duplicated oracle is only worth
   having if the duplicate is at least as strict; `verify` cross-checks
   the two against each other so drift is caught rather than assumed
   absent. */
const oracle = (c, n) => {
  if (typeof n !== 'number' || !isFinite(n)) return false;
  const v = Math.round(n);
  if (c.f === 'range') return c.op === 'ge' ? v >= c.a : (c.op === 'le' ? v <= c.a : null);
  if (c.f === 'parity') return (((v % 2) + 2) % 2) === (c.r ? 1 : 0);
  if (c.f === 'multiple') { const hit = v % c.m === 0; return c.keep ? hit : !hit; }
  if (c.f === 'digit') { const d = c.place === 'tens' ? Math.floor(Math.abs(v) / 10) % 10 : Math.abs(v) % 10; return c.keep ? d === c.d : d !== c.d; }
  if (c.f === 'quantity') return c.op === 'lt' ? v < c.q : (c.op === 'gt' ? v > c.q : null);
  if (c.f === 'nearer') return Math.abs(v - c.a) < Math.abs(v - c.b);
  return null;
};
const alive = (field, clues) => {
  const out = [];
  for (let n = 1; n <= field; n++) {
    let ok = true;
    for (const c of clues) { const r = oracle(c, n); if (r === null) return null; if (!r) { ok = false; break; } }
    if (ok) out.push(n);
  }
  return out;
};

/* the admission test — the properties the gate proves, plus the two this
   library now guarantees on every board */
function admits(field, clues, target) {
  const full = alive(field, clues);
  if (!full || full.length !== 1 || full[0] !== target) return 'does not isolate the target';
  let prev = Infinity;
  for (let k = 0; k <= clues.length; k++) {
    const n = alive(field, clues.slice(0, k)).length;
    if (!(n < prev)) return `card ${k} takes nothing away`;
    prev = n;
  }
  for (let i = 0; i < clues.length; i++) {
    const without = clues.slice(0, i).concat(clues.slice(i + 1));
    if (alive(field, without).length <= 1) return `card ${i} is redundant`;
  }
  const masks = clues.map((c) => { const m = []; for (let n = 1; n <= field; n++) m.push(oracle(c, n)); return m; });
  for (let i = 0; i < masks.length; i++) {
    for (let j = i + 1; j < masks.length; j++) {
      let ab = true, ba = true;
      for (let k = 0; k < masks[i].length; k++) { if (masks[i][k] && !masks[j][k]) ab = false; if (masks[j][k] && !masks[i][k]) ba = false; }
      if (ab || ba) return `cards ${i} and ${j} imply one another`;
    }
  }
  /* the closing card must act on a PATTERN, not on a coin flip */
  const pen = alive(field, clues.slice(0, clues.length - 1)).length;
  if (pen < T.MIN_PENULTIMATE) return `the last card acts on only ${pen} number(s)`;
  /* and the class must be able to choose it */
  const sp = T.sparesFor(field, clues, 0);
  if (!sp || sp.length !== 3) return 'the closing choice cannot be dealt';
  const res = sp.map((c) => alive(field, clues.slice(0, clues.length - 1)).filter((n) => oracle(c, n)));
  if (res.filter((r) => r.length === 1).length !== 1) return 'the closing choice does not have exactly one closer';
  if (res.filter((r) => r.length >= 2).length !== 2) return 'the closing choice does not have two live decoys';
  const keys = res.map((r) => r.join(','));
  if (new Set(keys).size !== 3) return 'two of the closing candidates leave the same numbers';
  return null;
}

/* ⚠ POISON-TEST THE ADMISSION TEST BEFORE TRUSTING IT. Every candidate
   passes, which is exactly the state in which a test that cannot fail
   looks identical to a test that works. Each case below must be REFUSED,
   and for the stated reason. */
(function () {
  const base = T.buildFor(100, 37, 4, { minPen: T.MIN_PENULTIMATE }) || T.buildFor(100, 37);
  const cases = [
    ['a deck that isolates nothing', base.slice(0, 1), 37, /isolate/],
    ['a deck that isolates the wrong number', base, 38, /isolate/],
    ['a deck carrying a card that takes nothing away', base.concat([{ f: 'range', op: 'ge', a: 10 }]), 37, /takes nothing away|redundant|imply/],
    /* ⚠ this fixture has to ISOLATE, or it is refused for the wrong
       reason and proves nothing about the implication check. */
    ['a deck with two cards that imply one another',
      [{ f: 'range', op: 'ge', a: 30 }, { f: 'range', op: 'ge', a: 40 }, { f: 'digit', place: 'ones', d: 7, keep: true }, { f: 'range', op: 'le', a: 50 }],
      47, /imply|redundant/],
    /* ⭐ AND THE TWO NEW PROPERTIES GET POISONED TOO, or they are
       decoration on a test that already passed everything.
       ⚠ MY FIRST FIXTURE HERE WAS MIS-SORTED AND THE POISON TEST CAUGHT
       IT: [>=40, <=50, ones-7] arrives at the last card with ELEVEN
       numbers alight, not two, so it was a CORRECT board filed under
       "must be refused" — the recorded trap where a bad example teaches
       you to loosen a working check. Sort each example by what it MEANS.
       This one really does end 2 -> 1: {ones 7} n {>=40} n {<=60} is
       {47, 57}, and dropping the multiples of three takes 57. That is
       the shape 44 of the 60 shipped boards had. */
    ['a deck that ends on a coin flip',
      [{ f: 'digit', place: 'ones', d: 7, keep: true }, { f: 'range', op: 'ge', a: 40 }, { f: 'range', op: 'le', a: 60 }, { f: 'multiple', m: 3, keep: false }],
      47, /acts on only|closing choice/]
  ];
  let bad = 0;
  cases.forEach(([name, clues, target, want]) => {
    const why = admits(100, clues, target);
    if (!why) { console.error(`  FATAL the admission test ACCEPTED ${name} — it cannot fail, so it is not a test`); bad++; }
    else if (!want.test(why)) { console.error(`  FATAL ${name} was refused for the wrong reason: "${why}"`); bad++; }
  });
  /* ⚠ AND THE OTHER DIRECTION, because a ban that cannot pass a correct
     input is worse than no ban: it teaches the next person to loosen it. */
  const good = T.buildFor(100, 37, 4, { minPen: T.MIN_PENULTIMATE, cleanTens: true });
  if (good) {
    const why = admits(100, good, 37);
    if (why) { console.error(`  FATAL the admission test REFUSED a correct board: "${why}"`); bad++; }
  }
  if (bad) process.exit(1);
  console.log(`  admission test      : poison-tested BOTH ways, ${cases.length}/${cases.length} refused, 1/1 accepted`);
}());

const pad = (n, w) => String(n).padStart(w, '0');
const sig = (d) => d.map((c) => JSON.stringify(c)).sort().join('|');

/* build every candidate, then curate.
   The rotation is what makes more than one deck per target reachable. */
/* ⚠ MORE ROTATIONS BUY TARGET COVERAGE, NOT JUST BOARD COUNT, which is
   what a repertoire actually needs — four boards on the same number is
   worse than one board on each of four numbers. `pick` caps per target
   for the same reason. Primes and near-primes so the rotations do not
   land on the same keeper repeatedly for small keeper lists. */
const ROT = [0, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127];
const candidates = [];
const seen = new Set();
let rejected = 0;
for (const field of T.FIELDS) {
  for (let target = 1; target <= field; target++) {
    for (const want of [4, 5, 6]) {
      for (const rot of ROT) {
        const clues = T.buildFor(field, target, want, { minPen: T.MIN_PENULTIMATE, cleanTens: true, rot });
        if (!clues || clues.length < 4) continue;
        const key = field + ':' + sig(clues);
        if (seen.has(key)) continue;
        seen.add(key);
        const families = {};
        clues.forEach((c) => { families[c.f] = 1; });
        if (Object.keys(families).length < 3) continue;
        const why = admits(field, clues, target);
        if (why) { rejected++; if (rejected <= 5) console.error(`  REJECTED ${field}/${target}: ${why}`); continue; }
        candidates.push({ field, target, clues, cards: clues.length, families: Object.keys(families).length });
      }
    }
  }
}

/* CURATION — correct is the builder's job, interesting is this script's.
   ⭐ AND THE FIRST CARD IS RE-ORDERED, WHICH COSTS NOTHING BECAUSE THE
   TOOL PROVED IT. 47 of the 60 shipped boards opened on a magnitude card,
   whose residue is a solid block — the least informative pattern there
   is — so the card that should teach the class HOW TO READ A CARD taught
   nothing, and they had to acquire the reading skill on card two while
   already behind. A periodic card (parity, a kept multiple, a ones
   digit) leaves stripes or a comb, which is a pattern a six-year-old can
   name. Invention 2 is that the survivors are byte-identical under any
   permutation of the deck, so re-ordering for legibility moves no
   invariant whatsoever — and `Shuffle` then lets the class TEST that it
   did not matter, which is the theorem the tool exists to demonstrate.
   Highest ratio of pedagogical gain to engineering cost in the rebuild. */
const PERIODIC = { parity: 3, multiple: 2, digit: 1 };
function legible(clues) {
  const rank = (c) => {
    let r = PERIODIC[c.f] || 0;
    /* a KEPT multiple leaves a lit comb; an excluded one leaves noise,
       because the eye reads the lit set */
    if (c.f === 'multiple' && !c.keep) r -= 1;
    if (c.f === 'digit' && !c.keep) r -= 1;
    return r;
  };
  /* ⚠⚠ THE CLOSING CARD IS HELD FIXED, AND THE RE-PROOF IS WHAT TAUGHT ME
     THAT. Sorting the whole deck moved a different card into last place
     and broke the penultimate floor on 60-odd boards — the floor is a
     property of WHICH card closes, not of the deck as a set.
     Holding the closer and permuting only the cards before it is
     provably safe rather than merely tested: the survivors after n-1
     cards are the INTERSECTION of those n-1 cards, and an intersection
     does not care about order. So the floor cannot move, and the
     re-proof below confirms it on every shipped board rather than
     trusting the argument. */
  const head = clues.slice(0, clues.length - 1);
  const tail = clues.slice(clues.length - 1);
  head.sort((a, b) => rank(b) - rank(a));
  return head.concat(tail);
}

function pick(field, want) {
  const pool = candidates
    .filter((c) => c.field === field)
    .sort((a, b) => (b.families - a.families) || (a.target - b.target));
  const chosen = [], perTarget = {};
  /* spread across targets first: at most two boards per target until
     every target that can be covered has been */
  for (let cap = 1; cap <= 4 && chosen.length < want; cap++) {
    for (let i = 0; i < pool.length && chosen.length < want; i++) {
      const c = pool[i];
      if ((perTarget[c.target] || 0) >= cap) continue;
      if (chosen.indexOf(c) > -1) continue;
      perTarget[c.target] = (perTarget[c.target] || 0) + 1;
      chosen.push(c);
    }
  }
  return chosen.sort((a, b) => (a.target - b.target));
}

/* ⚠ THE WANTS ARE CEILINGS, NOT QUOTAS — `pick` returns whatever the
   admitted pool actually holds, so these are set above it deliberately
   and the real number is reported. Setting them below the pool silently
   discarded 28 provably-valid boards on the first run. */
const shape = [
  { field: 20, want: 60 },
  { field: 100, want: 200 },
  { field: 120, want: 260 }
];

/* ⚠ THE BOARD DOES NOT CARRY ITS ANSWER, AND ITS ID DOES NOT EITHER. The
   number a board leaves is whatever survives its cards, so the tool
   derives it; the id is a plain sequence. The spares are derived too. */
const boards = [];
shape.forEach((s) => {
  let seq = 0;
  pick(s.field, s.want).forEach((c) => {
    seq++;
    boards.push({
      id: 's' + s.field + '-' + pad(seq, 3),
      range: c.field,
      clues: legible(c.clues),
      free: false
    });
  });
});

/* ⚠ A GENERATOR THAT CAN WRITE AN EMPTY LIBRARY AND EXIT 0 IS A LOADED
   GUN. The previous cut logged each rejection and continued with no
   counter and no floor, so a builder regression would have overwritten
   the shipped library with zero boards and reported success. */
const FLOOR = 200;
if (boards.length < FLOOR) {
  console.error(`  FATAL only ${boards.length} boards survived curation (floor ${FLOOR}) — refusing to write`);
  process.exit(1);
}

/* re-prove EVERY board that will actually ship, after the legibility
   re-order, because the re-order is a change to the artefact */
let bad = 0;
boards.forEach((b) => {
  const surv = alive(b.range, b.clues);
  if (!surv || surv.length !== 1) { console.error(`  FATAL ${b.id} does not isolate after re-ordering`); bad++; return; }
  const why = admits(b.range, b.clues, surv[0]);
  if (why) { console.error(`  FATAL ${b.id} failed re-proof after re-ordering: ${why}`); bad++; }
});
if (bad) process.exit(1);

/* THE FREE EIGHT — deliberately spread across the three fields so the
   free tier demonstrates the whole apparatus rather than a corner of it.
   ⚠ AND THE SPREAD CANNOT SILENTLY COME UP SHORT. The previous cut
   dropped index collisions without retrying and then derived `freeMax`
   from whatever it got, so the free eight could have become a free three
   and every downstream consistency check would still have passed. */
const freeIds = [];
const spread = (field, want) => {
  const pool = boards.filter((b) => b.range === field);
  const out = [];
  if (!pool.length) return out;
  for (let i = 0; i < want; i++) {
    let idx = Math.round((i + 0.5) * (pool.length - 1) / want);
    /* walk forward until an unused one is found, rather than dropping it */
    for (let k = 0; k < pool.length && out.indexOf(pool[idx]) > -1; k++) idx = (idx + 1) % pool.length;
    if (out.indexOf(pool[idx]) === -1) out.push(pool[idx]);
  }
  return out;
};
const want = { 20: 4, 100: 3, 120: 1 };
Object.keys(want).forEach((f) => {
  const got = spread(Number(f), want[f]);
  if (got.length !== want[f]) {
    console.error(`  FATAL the free spread for the 1-${f} field returned ${got.length} of ${want[f]}`);
    process.exit(1);
  }
  got.forEach((b) => { b.free = true; freeIds.push(b.id); });
});
const FREE_TOTAL = 8;
if (freeIds.length !== FREE_TOTAL) {
  console.error(`  FATAL the free tier is ${freeIds.length} boards, not ${FREE_TOTAL}`);
  process.exit(1);
}

/* free boards first, so a signed-out teacher meets the apparatus in the
   order it was curated and never lands on a locked chip on arrival */
boards.sort((a, b) => (Number(b.free) - Number(a.free)) || (a.range - b.range) || a.id.localeCompare(b.id));

const file = {
  version: 2,
  note: 'Locale-NEUTRAL, and it carries no authored text of any kind. A board is a range and an ordered clue list; the number that survives them, and the three closing candidates the class chooses between, are both DERIVED by the tool rather than stored — so neither the answer nor the winning card is in this file. The cards render as icons and numerals, so there is nothing here to translate. Every board is produced by the builder in mini tools/number-sieve.js and then re-proved against an independent implementation of the six families in scripts/gen-number-sieve-boards.js before admission: it isolates its target, every card strictly narrows, no card is redundant, no card implies another, the LAST card acts on at least three numbers so that what it takes is a pattern rather than a coin flip, and the closing choice can be dealt with exactly one card that closes and two that do not. Regenerate with: node scripts/gen-number-sieve-boards.js --write',
  freeMax: freeIds.length,
  premiumMax: boards.length,
  boards
};

const byField = {};
boards.forEach((b) => { byField[b.range] = (byField[b.range] || 0) + 1; });
const cardDist = {};
boards.forEach((b) => { cardDist[b.clues.length] = (cardDist[b.clues.length] || 0) + 1; });
const penDist = {};
boards.forEach((b) => { const p = alive(b.range, b.clues.slice(0, b.clues.length - 1)).length; penDist[p] = (penDist[p] || 0) + 1; });
const openers = {};
boards.forEach((b) => { openers[b.clues[0].f] = (openers[b.clues[0].f] || 0) + 1; });

console.log(`  candidates admitted : ${candidates.length}  (rejected ${rejected})`);
console.log(`  library             : ${boards.length} boards  ${JSON.stringify(byField)}`);
console.log(`  deck lengths        : ${JSON.stringify(cardDist)}`);
console.log(`  alight at the close : ${JSON.stringify(penDist)}   (floor ${T.MIN_PENULTIMATE})`);
console.log(`  opening card family : ${JSON.stringify(openers)}`);
console.log(`  free                : ${freeIds.length}  [${freeIds.join(', ')}]`);

if (WRITE) {
  /* one board per line keeps a 300-board file readable AND small */
  const body = boards.map((b) => '    ' + JSON.stringify(b)).join(',\n');
  const out = '{\n  "version": ' + file.version + ',\n  "note": ' + JSON.stringify(file.note)
    + ',\n  "freeMax": ' + file.freeMax + ',\n  "premiumMax": ' + file.premiumMax
    + ',\n  "boards": [\n' + body + '\n  ]\n}\n';
  fs.writeFileSync(OUT, out.replace(/\r\n/g, '\n'), 'utf8');
  console.log(`  written             : ${path.relative(ROOT, OUT)} (${fs.statSync(OUT).size.toLocaleString('en-US')} bytes)`);
} else {
  console.log('  (dry run — pass --write to save)');
}
