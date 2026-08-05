/* =====================================================================
   gen-lids-setups.js — builds the table book for TOOL #39, The Lids
   ---------------------------------------------------------------------
   Run:  node scripts/gen-lids-setups.js [--write]

   A setup is a TOTAL and a LID COUNT, nothing else — the positions are
   laid out by the tool. So the book is locale-neutral by construction
   and can be grown and proven mechanically.

   ⚠ THE BOOK NEVER CONTAINS k = 1. One lid over a known total is
   precisely the tool that part-whole-frame, number-balance and rekenrek
   already are (refusal 1 in lids.js). The second lid is not a feature
   here, it is the subject.

   ⚠ PROVABLY VALID IS NOT THE SAME AS WORTH TURNING OVER (the recorded
   number-sieve lesson). The admission test is POISON-TESTED and the book
   is balanced across two families, because a book of only one family
   teaches half the tool:
     SHARES   n % k === 0 — the total divides; nothing is left over.
     REMAINS  n % k !== 0 — ⭐ the star family. What will not share stays
              on the table, and that leftover is the most interesting
              thing in the routine.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'mini tools', 'lids-setups.json');
const WRITE = process.argv.includes('--write');

const MIN_TOTAL = 4, MAX_TOTAL = 30, MIN_LIDS = 2, MAX_LIDS = 4;
const FREE_MAX_TOTAL = 20;

let ERRORS = 0;
const err = (m) => { ERRORS++; console.error('  ERROR  ' + m); };

function admit(n, k) {
  if (!(n >= MIN_TOTAL && n <= MAX_TOTAL)) return false;
  if (!(k >= MIN_LIDS && k <= MAX_LIDS)) return false;   /* never k = 1 */
  if (Math.floor(n / k) < 1) return false;               /* every lid must hold something */
  /* ⚠⚠ THE `> 12` CLAUSE IS GONE, AND IT SHOULD NEVER HAVE BEEN HERE.
     It read "the marker strip tops out at 12" — so the BOOK was generated
     around a defect in the strip instead of the strip being fixed to fit
     the book. Measured against the shipped JSON, it cost the paid tier
     every two-lid table above 25: totals 26, 27, 28, 29 and 30 had NO
     k=2 entry at all, while the Teacher plan sells "bigger totals". At
     the five largest paid totals the routine's own opening move — put two
     lids down — had no ready-made table behind it.
     The strip is now state-sized (stripTop: the next multiple of five
     strictly greater than floor(n/2)), so it holds every share the model
     can produce and the book no longer has to duck. */
  return true;
}
const family = (n, k) => (n % k === 0 ? 'shares' : 'remains');

/* ---- POISON TEST. A gate that cannot fail is not a gate. ---- */
(function poison() {
  const cases = [
    ['a single lid is refused', () => admit(12, 1) === false],
    ['a fifth lid is refused', () => admit(20, 5) === false],
    ['a total below the floor is refused', () => admit(3, 2) === false],
    ['a total above the ceiling is refused', () => admit(31, 2) === false],
    ['a share of zero is refused', () => admit(4, 5) === false],
    /* ⚠ THIS CASE USED TO ASSERT admit(30,2) === false, AND IT WAS
       PINNING A DEFECT RATHER THAN GUARDING AGAINST ONE. The strip could
       not hold a share of 15, so the generator was taught to refuse the
       table instead — and a poison case then locked that in, which is
       how five paid two-lid totals stayed missing for a whole release.
       Sort each example by what it MEANS, not by whether it currently
       passes: 30 counters under two lids is the routine's opening move
       at the largest total the plan sells, and it must be ADMITTED. */
    ['the biggest paid two-lid table is ADMITTED', () => admit(30, 2) === true],
    ['a legitimate setup is ADMITTED', () => admit(12, 3) === true],
    ['families split correctly', () => family(12, 3) === 'shares' && family(13, 3) === 'remains']
  ];
  let bad = 0;
  for (const [name, fn] of cases) { let ok = false; try { ok = fn(); } catch (_) {} if (!ok) { console.error('  POISON FAILED  ' + name); bad++; } }
  if (bad) { console.error('FATAL: the admission test can no longer reject'); process.exit(1); }
  console.log(`poison test: ${cases.length}/${cases.length} — every clause still rejects`);
})();

/* ---- enumerate, canonical order, no randomness ---- */
const all = [];
for (let n = MIN_TOTAL; n <= MAX_TOTAL; n++) {
  for (let k = MIN_LIDS; k <= MAX_LIDS; k++) {
    if (admit(n, k)) all.push({ n, k, fam: family(n, k) });
  }
}

/* ⭐ THE FREE EIGHT ARE CURATED, NOT COMPUTED. A formula over the sorted
   domain opens the tool on 4 counters under 2 lids, which is arithmetic a
   class does not need an apparatus for — a first impression is a
   judgement, not an index. These are ordinary classroom totals, four that
   share exactly and four that leave a remainder, across k 2..4, so a
   teacher who never signs in still meets BOTH halves of the tool. */
const FREE_EIGHT = [[12, 2], [12, 3], [13, 3], [10, 2], [15, 4], [16, 4], [9, 2], [20, 3]];

const chosen = [];
const used = new Set();
for (const [n, k] of FREE_EIGHT) {
  if (!admit(n, k)) { err(`the curated free setup ${n}/${k} does not pass admission`); continue; }
  if (n > FREE_MAX_TOTAL) { err(`the curated free setup ${n}/${k} exceeds the free total ceiling`); continue; }
  const key = n + ':' + k;
  if (used.has(key)) { err(`the curated free set repeats ${key}`); continue; }
  used.add(key);
  chosen.push({ n, k, fam: family(n, k) });
}
if (chosen.length !== 8) err(`the free set came out at ${chosen.length}, expected 8`);
if (chosen.filter((s) => s.fam === 'shares').length !== 4) err('the curated free set is not 4 shares / 4 remains');
if (new Set(chosen.map((s) => s.k)).size < 3) err('the curated free set does not span at least three lid counts');
/* then the rest, interleaved by family so the book never runs a long
   stretch that always divides */
const restShares = all.filter((s) => s.fam === 'shares' && !used.has(s.n + ':' + s.k));
const restRemains = all.filter((s) => s.fam === 'remains' && !used.has(s.n + ':' + s.k));
for (let i = 0; i < Math.max(restShares.length, restRemains.length); i++) {
  if (restRemains[i]) chosen.push(restRemains[i]);
  if (restShares[i]) chosen.push(restShares[i]);
}

const setups = chosen.map((s, i) => ({
  id: 't-' + String(i + 1).padStart(3, '0'),
  n: s.n, k: s.k, free: i < 8
}));

for (const s of setups) if (!admit(s.n, s.k)) err(`${s.id} does not pass admission`);
const sig = new Set();
for (const s of setups) { const key = s.n + ':' + s.k; if (sig.has(key)) err(`duplicate setup ${s.id}`); sig.add(key); }
const freeRemains = setups.filter((s) => s.free && (s.n % s.k !== 0)).length;
if (!freeRemains) err('no FREE setup leaves a remainder — the free tier would never show the star family');

const NOTE =
  'THE TABLE BOOK. A setup is a TOTAL and a LID COUNT and nothing else — the tool lays the lids out — ' +
  'so this file is locale-NEUTRAL by construction and is validated by arithmetic (see scripts/verify-lids.js V13). ' +
  '⚠ It never contains k = 1: one lid over a known total is the tool part-whole-frame, number-balance and rekenrek ' +
  'already are, and refusal 1 in lids.js forbids it. Two families, deliberately interleaved — SHARES (n % k === 0, ' +
  'nothing left over) and REMAINS (n % k !== 0, the star family, where what will not share stays on the table). ' +
  'freeMax/premiumMax are a LIBRARY-SIZE budget, not a capacity ceiling. ' +
  'Regenerate with: node scripts/gen-lids-setups.js --write';

const doc = { version: 1, note: NOTE, freeMax: 8, premiumMax: setups.length, setups: setups };

const tally = {};
for (const s of setups) { const f = s.n % s.k === 0 ? 'shares' : 'remains'; tally[f] = (tally[f] || 0) + 1; }
console.log(`setups: ${setups.length} (8 free) — ${JSON.stringify(tally)}`);
console.log('free eight:', setups.filter((s) => s.free).map((s) => `${s.n}/${s.k}${s.n % s.k ? '*' : ''}`).join(' '), ' (* = leaves a remainder)');

if (ERRORS) { console.error(`FAIL — ${ERRORS} error(s); nothing written`); process.exit(1); }

if (WRITE) {
  const lines = setups.map((s) => `    { "id": "${s.id}", "n": ${s.n}, "k": ${s.k}, "free": ${s.free} }`);
  const withBreak = lines.map((l, i) => (i === 8 ? '\n' + l : l));
  const body = '{\n  "version": 1,\n  "note": ' + JSON.stringify(NOTE) + ',\n  "freeMax": 8,\n  "premiumMax": ' + setups.length + ',\n  "setups": [\n' + withBreak.join(',\n') + '\n  ]\n}\n';
  JSON.parse(body);
  fs.writeFileSync(OUT, body, 'utf8');
  console.log(`wrote ${path.relative(ROOT, OUT)} (${Buffer.byteLength(body)} bytes)`);
} else {
  console.log('(preview only — pass --write)');
}
