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
   and a human must. Here a board is a range, a clue list and a target,
   and validity is arithmetic — so the library is machine-grown and
   machine-proven, and it is bounded by taste rather than by translation.

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
   on the builder's own word */
const oracle = (c, n) => {
  if (typeof n !== 'number' || !isFinite(n)) return false;
  const v = Math.round(n);
  if (c.f === 'range') return c.op === 'ge' ? v >= c.a : v <= c.a;
  if (c.f === 'parity') return (((v % 2) + 2) % 2) === (c.r ? 1 : 0);
  if (c.f === 'multiple') { const hit = v % c.m === 0; return c.keep ? hit : !hit; }
  if (c.f === 'digit') { const d = c.place === 'tens' ? Math.floor(Math.abs(v) / 10) % 10 : Math.abs(v) % 10; return c.keep ? d === c.d : d !== c.d; }
  if (c.f === 'quantity') return c.op === 'lt' ? v < c.q : v > c.q;
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

/* the admission test — the same five properties the gate proves */
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
  return null;
}

/* ⚠ POISON-TEST THE ADMISSION TEST BEFORE TRUSTING IT. Every candidate
   passes, which is exactly the state in which a test that cannot fail
   looks identical to a test that works. Each case below must be REFUSED,
   and for the stated reason. */
(function () {
  const base = T.buildFor(100, 37);
  const cases = [
    ['a deck that isolates nothing', base.slice(0, 1), 37, /isolate/],
    ['a deck that isolates the wrong number', base, 38, /isolate/],
    ['a deck carrying a card that takes nothing away', base.concat([{ f: 'range', op: 'ge', a: 10 }]), 37, /takes nothing away|redundant|imply/],
    /* ⚠ this fixture has to ISOLATE, or it is refused for the wrong
       reason and proves nothing about the implication check. The first
       cut left off the upper bound and was rejected as "does not isolate
       the target" — the poison test caught its own bad fixture. */
    ['a deck with two cards that imply one another',
      [{ f: 'range', op: 'ge', a: 30 }, { f: 'range', op: 'ge', a: 40 }, { f: 'digit', place: 'ones', d: 7, keep: true }, { f: 'range', op: 'le', a: 50 }],
      47, /imply|redundant/]
  ];
  let bad = 0;
  cases.forEach(([name, clues, target, want]) => {
    const why = admits(100, clues, target);
    if (!why) { console.error(`  FATAL the admission test ACCEPTED ${name} — it cannot fail, so it is not a test`); bad++; }
    else if (!want.test(why)) { console.error(`  FATAL ${name} was refused for the wrong reason: "${why}"`); bad++; }
  });
  if (bad) process.exit(1);
  console.log(`  admission test      : poison-tested, ${cases.length}/${cases.length} refused`);
}());

const pad = (n, w) => String(n).padStart(w, '0');

/* build every candidate, then curate */
const candidates = [];
for (const field of T.FIELDS) {
  for (let target = 1; target <= field; target++) {
    const clues = T.buildFor(field, target);
    if (!clues) continue;
    const why = admits(field, clues, target);
    if (why) { console.error(`  REJECTED ${field}/${target}: ${why}`); continue; }
    const families = {};
    clues.forEach((c) => { families[c.f] = 1; });
    candidates.push({ field, target, clues, cards: clues.length, families: Object.keys(families).length });
  }
}

/* CURATION — correct is the builder's job, interesting is this script's.
   Prefer decks with a real middle (>=4 cards) and several kinds of
   thinking (>=3 families), then spread the targets across each field so
   the library does not cluster. */
function pick(field, want, minCards, minFamilies) {
  const pool = candidates
    .filter((c) => c.field === field && c.cards >= minCards && c.families >= minFamilies)
    .sort((a, b) => (b.families - a.families) || (b.cards - a.cards) || (a.target - b.target));
  const chosen = [], seen = {};
  /* walk the pool taking a spread of targets rather than a run of them */
  const stride = Math.max(1, Math.floor(pool.length / Math.max(1, want)));
  for (let i = 0; i < pool.length && chosen.length < want; i += 1) {
    const c = pool[i * stride % pool.length] || pool[i];
    if (!c || seen[c.target]) continue;
    seen[c.target] = 1;
    chosen.push(c);
  }
  for (let i = 0; i < pool.length && chosen.length < want; i++) {
    if (seen[pool[i].target]) continue;
    seen[pool[i].target] = 1;
    chosen.push(pool[i]);
  }
  return chosen.sort((a, b) => a.target - b.target);
}

const shape = [
  { field: 20, want: 16, minCards: 4, minFamilies: 3 },
  { field: 100, want: 26, minCards: 4, minFamilies: 3 },
  { field: 120, want: 18, minCards: 4, minFamilies: 3 }
];

/* ⚠ THE BOARD DOES NOT CARRY ITS ANSWER, AND ITS ID DOES NOT EITHER. The
   first cut wrote `target` into every record and named them `s20-003` —
   which put the answer in a public file AND spelled it in the id. The
   number a board leaves is whatever survives its cards, so the tool
   derives it; the id is a plain sequence. */
const boards = [];
shape.forEach((s) => {
  let seq = 0;
  pick(s.field, s.want, s.minCards, s.minFamilies).forEach((c) => {
    seq++;
    boards.push({
      id: 's' + s.field + '-' + pad(seq, 2),
      range: c.field,
      clues: c.clues,
      free: false
    });
  });
});

/* THE FREE EIGHT — gentlest first, and deliberately spread across the
   three fields so the free tier demonstrates the whole apparatus rather
   than a corner of it (the sorting-hoops precedent). */
const freeIds = [];
/* ⚠ a SPREAD, not the first few. Sorting by target and slicing gave the
   free tier targets 1, 2, 3 and 4 — the dullest numbers on the field, and
   the first thing a signed-out teacher would ever see. */
const spread = (field, want) => {
  const pool = boards.filter((b) => b.range === field);
  const out = [];
  for (let i = 0; i < want && pool.length; i++) {
    const idx = Math.round((i + 0.5) * (pool.length - 1) / want);
    if (out.indexOf(pool[idx]) === -1) out.push(pool[idx]);
  }
  return out;
};
spread(20, 4).concat(spread(100, 3), spread(120, 1)).forEach((b) => { b.free = true; freeIds.push(b.id); });

/* free boards first, so a signed-out teacher meets the apparatus in the
   order it was curated and never lands on a locked chip on arrival */
boards.sort((a, b) => (Number(b.free) - Number(a.free)) || (a.range - b.range) || a.id.localeCompare(b.id));

const file = {
  version: 1,
  note: 'Locale-NEUTRAL, and it carries no authored text of any kind. A board is a range, an ordered clue list and the number that survives them; the cards render as icons and numerals, so there is nothing here to translate. That is what lets this library be machine-grown and machine-proven — every board is produced by the builder in mini tools/number-sieve.js and then re-proved against an independent implementation of the six families in scripts/gen-number-sieve-boards.js before admission (isolates the target, every card strictly narrows, no card is redundant, no card implies another). Regenerate with: node scripts/gen-number-sieve-boards.js --write',
  freeMax: freeIds.length,
  premiumMax: 300,
  boards
};

const byField = {};
boards.forEach((b) => { byField[b.range] = (byField[b.range] || 0) + 1; });
const cardDist = {};
boards.forEach((b) => { cardDist[b.clues.length] = (cardDist[b.clues.length] || 0) + 1; });

console.log(`  candidates admitted : ${candidates.length}`);
console.log(`  library             : ${boards.length} boards  ${JSON.stringify(byField)}`);
console.log(`  deck lengths        : ${JSON.stringify(cardDist)}`);
console.log(`  free                : ${freeIds.length}  [${freeIds.join(', ')}]`);

if (WRITE) {
  fs.writeFileSync(OUT, JSON.stringify(file, null, 2).replace(/\r\n/g, '\n') + '\n', 'utf8');
  console.log(`  written             : ${path.relative(ROOT, OUT)} (${fs.statSync(OUT).size.toLocaleString('en-US')} bytes)`);
} else {
  console.log('  (dry run — pass --write to save)');
}
