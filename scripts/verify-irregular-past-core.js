#!/usr/bin/env node
/* =====================================================================
   verify-irregular-past-core.js — the MEASURED build-gate for "Rusty's Yesterday
   Machine" (L.2.1.d). Drives the REAL irregular-past-core.js over the REAL
   manifest, EVERY locale pool.

   ⚠ Until sv #33 this gate read `params.rounds` ONLY — the English pool — so 48
   of 56 shipped rounds were ungated, and two latent defects had never been seen:
   de scores 0.750 and fr 0.625 on the shortest-card bot, both far over the 0.45
   ceiling this file has always declared.

   WHAT IS ASSERTED
     • ORACLE (the choice whose word === correct) → 100%, every locale;
     • structural per round: exactly one match, the past actually changed, 3
       distinct choices, a present form, childView does not leak `correct`;
     • ⭐ WHOLE-WORD no-duplicate: no card may equal a WORD of its own prompt.
       Flat 0 for sv. The seven shipped pools are 8/8 — the reason a bot with no
       language at all halves the board — and carry a may-only-shrink baseline.
       ⚠ WHOLE-WORD, never substring: a substring test condemned three CORRECT
       French rounds in sv #31 («Maya ___ repose» contains "se"), and here it
       would condemn «dåtid» for containing the card «åt». Case-folded, NEVER
       diacritic-folded — this deck holds `åt`, `ätit` and `äter` in one round.
     • LONGEST / SHORTEST / FIXED-GUESS <= 0.45, with a measured baseline for the
       locales that already breach it.
     • ⭐ SOLVERS THAT NEED NO READING, or only half the rule. Each is a measured
       ratchet that MAY ONLY SHRINK — never a number chosen to pass.

   WHAT IS DELIBERATELY *NOT* ASSERTED
     ⚠ positionBot. It measures the STORED order, and `setupTask` does
       `this._cards = shuffle(...)` (rusty-yesterday-activity.js:63) before a chip
       is drawn, so the stored order is never seen by a child. Five locales read
       1.000 on it and always have. Asserting it would fail five correct decks on
       an artefact; it is printed as informational only, and the RENDERED order is
       asserted where it can actually be seen — in local-test-rusty-yesterday.js.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'irregular-past-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'rusty-yesterday-activities.json');
const CHANCE = 0.45;

/* Measured baselines. ⚠ RATCHET: these may only ever SHRINK. Every number here was
   printed by `--measure` against the shipped data, never estimated — I have twice
   invented ratchet numbers in this fan-out and been wrong in the direction that
   fails a CORRECT deck. A locale absent from a table is held to the flat rule. */
const DUP_BASELINE = { en: 8, de: 8, fr: 8, es: 8, pt: 8, it: 8, nl: 8 };   // sv must be 0
const SHORTEST_BASELINE = { de: 0.750, fr: 0.625 };
const LONGEST_BASELINE = { pt: 0.500 };
const SOLVER_BASELINE = {                       // worst-solver ceiling, per locale
  en: 1.000, de: 1.000, fr: 0.813, es: 0.563, pt: 0.813, it: 1.000, nl: 1.000, sv: 0.604
};

const fails = [];
const F = (cond, msg) => { if (!cond) fails.push(msg); };
const pct = (x) => (100 * x).toFixed(1) + '%';

function loadCore() {
  const src = fs.readFileSync(CORE, 'utf8');
  const win = {};
  new Function('window', src)(win);
  if (!win.IrregularPastCore) throw new Error('core did not attach window.IrregularPastCore');
  return win.IrregularPastCore;
}

/* ---- solvers. None of these reads the language; the dropT family knows only
   that a final -t marks the har-word, which is half of what the deck teaches. --- */
const words = (r) => r.choices.map((c) => c.word);
const isC = (r, w) => w === r.correct;
const share = (r, cand) => (cand.length ? cand.filter((w) => isC(r, w)).length / cand.length : 0);
const minBy = (a, f) => { const v = Math.min.apply(null, a.map(f)); return a.filter((x) => f(x) === v); };
const maxBy = (a, f) => { const v = Math.max.apply(null, a.map(f)); return a.filter((x) => f(x) === v); };
const L = (w) => w.length;
const prefix = (a, b) => { let i = 0; while (i < a.length && i < b.length && a[i] === b[i]) i++; return i; };
const dropT = (r) => words(r).filter((w) => !/t$/.test(w));

const SOLVERS = {
  shortest: (r) => share(r, minBy(words(r), L)),
  longest: (r) => share(r, maxBy(words(r), L)),
  middle: (r) => share(r, [words(r).slice().sort((a, b) => a.length - b.length)[1]]),
  // "the card least like the bolded prompt word" — for a strong verb this IS the rule
  stemPrefix: (r) => share(r, minBy(words(r), (w) => prefix(w.toLowerCase(), String(r.present).toLowerCase()))),
  dropT_short: (r) => { const k = dropT(r); return share(r, k.length ? minBy(k, L) : words(r)); },
  dropT_long: (r) => { const k = dropT(r); return share(r, k.length ? maxBy(k, L) : words(r)); },
  /* ⭐ The one that forced the sv deck to be re-foiled. Drop the har-word, then let
     the SURVIVING foil's SHAPE choose the direction. If every weak round takes the
     infinitive and every strong round the invented form, foil type names the verb
     class and this scores 100% — so the sv deck deliberately mixes them. */
  dropT_typed: (r) => {
    const k = dropT(r);
    if (!k.length) return share(r, words(r));
    return share(r, k.some((w) => /a$/.test(w)) ? maxBy(k, L) : minBy(k, L));
  },
  // conj-1 is orthographically marked: an -ar present means an -ade past
  arTell: (r) => share(r, /ar$/.test(String(r.present)) ? maxBy(words(r), L) : minBy(words(r), L))
};
const SOLVER_NAMES = Object.keys(SOLVERS);

// ⚠ WHOLE words, case-folded, never diacritic-folded.
const tokens = (s) => String(s).toLowerCase().split(/[^\p{L}]+/u).filter(Boolean);
function dupCount(pool) {
  return pool.filter((r) => {
    const t = tokens(r.present);
    return r.choices.some((c) => t.indexOf(c.word.toLowerCase()) >= 0);
  }).length;
}

(function main() {
  const measure = process.argv.includes('--measure');
  const Core = loadCore();
  const params = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'))[0].params;
  const pools = Object.assign({ en: params.rounds || [] }, params.roundsL10n || {});
  const locales = Object.keys(pools);

  F(locales.length >= 8, `only ${locales.length} pools (need >=8 — did a locale vanish?)`);
  F(locales.indexOf('sv') >= 0, 'no sv pool — the Swedish deck is missing');

  const table = [];
  locales.forEach((loc) => {
    const pool = pools[loc];
    const N = pool.length || 1;
    F(pool.length >= 8, `${loc}: ${pool.length} rounds (need >=8)`);

    let oracleHits = 0;
    pool.forEach((r) => {
      const f = Core.facts(r);
      const w = `${loc}/${r.id}`;
      F(f.oneMatch, `${w}: not exactly one choice matches correct "${r.correct}"`);
      F(f.changed, `${w}: correct "${r.correct}" equals the present (must change)`);
      F(f.threeChoices, `${w}: not 3 choices`);
      F(f.distinct, `${w}: choices not distinct`);
      F(f.hasPresent, `${w}: missing the present form`);
      F(JSON.stringify(Core.childView(r)).indexOf('correct') < 0, `${w}: childView leaks correct`);
      if (Core.grade(r, Core.oracle(r))) oracleHits++;
    });
    F(oracleHits === N, `${loc}: oracle ${oracleHits}/${N} (must be 100%)`);

    const d = Core.deckFacts(pool);
    const dup = dupCount(pool);
    const solv = {};
    SOLVER_NAMES.forEach((n) => { solv[n] = pool.reduce((a, r) => a + SOLVERS[n](r), 0) / N; });
    const worst = Math.max.apply(null, SOLVER_NAMES.map((n) => solv[n]));

    if (!measure) {
      const dupCeil = Object.prototype.hasOwnProperty.call(DUP_BASELINE, loc) ? DUP_BASELINE[loc] : 0;
      F(dup <= dupCeil, `${loc}: ${dup} round(s) offer a card that is a WORD of the prompt (baseline ${dupCeil}; ratchet may only shrink)`);

      const sCeil = Object.prototype.hasOwnProperty.call(SHORTEST_BASELINE, loc) ? SHORTEST_BASELINE[loc] : CHANCE;
      const lCeil = Object.prototype.hasOwnProperty.call(LONGEST_BASELINE, loc) ? LONGEST_BASELINE[loc] : CHANCE;
      F(d.shortestBot <= sCeil, `${loc}: shortest bot ${pct(d.shortestBot)} > ${pct(sCeil)}`);
      F(d.longestBot <= lCeil, `${loc}: longest bot ${pct(d.longestBot)} > ${pct(lCeil)}`);
      F(d.fixedGuessBot <= CHANCE, `${loc}: fixed-guess bot ${pct(d.fixedGuessBot)} > ${pct(CHANCE)}`);

      const wCeil = Object.prototype.hasOwnProperty.call(SOLVER_BASELINE, loc) ? SOLVER_BASELINE[loc] : CHANCE;
      F(worst <= wCeil + 1e-3, `${loc}: worst solver ${pct(worst)} > baseline ${pct(wCeil)} (ratchet may only shrink — fix the FOILS, never this number)`);
    }
    table.push({ loc, N: pool.length, dup, d, solv, worst });
  });

  const pad = (s, n) => String(s).padStart(n);
  console.log('loc  n   dup  short  long   fixed  | ' + SOLVER_NAMES.map((n) => pad(n.slice(0, 11), 12)).join('') + '  worst');
  table.forEach((t) => {
    console.log(t.loc.padEnd(5) + pad(t.N, 2) + pad(t.dup + '/' + t.N, 6) + pad(t.d.shortestBot.toFixed(3), 7) +
      pad(t.d.longestBot.toFixed(3), 7) + pad(t.d.fixedGuessBot.toFixed(3), 7) + '  | ' +
      SOLVER_NAMES.map((n) => pad((100 * t.solv[n]).toFixed(1), 12)).join('') + pad((100 * t.worst).toFixed(1), 8));
  });
  console.log('\n(positionBot is NOT asserted — it reads the STORED order, which setupTask shuffles away: ' +
    table.map((t) => t.loc + ' ' + t.d.positionBot.toFixed(2)).join(', ') + ')');

  if (measure) {
    console.log('\n--measure: paste these into the baselines, never estimate them');
    console.log('  DUP_BASELINE     ' + JSON.stringify(table.reduce((a, t) => (a[t.loc] = t.dup, a), {})));
    console.log('  SOLVER_BASELINE  ' + JSON.stringify(table.reduce((a, t) => (a[t.loc] = Number(t.worst.toFixed(3)), a), {})));
    process.exit(0);
  }

  console.log('');
  if (fails.length) {
    console.error(`VERIFY-IRREGULAR-PAST FAILED — ${fails.length} issue(s):`);
    fails.forEach((m) => console.error('  • ' + m));
    process.exit(1);
  }
  console.log(`VERIFY-IRREGULAR-PAST PASSED — ${locales.length} pools, ${table.reduce((a, t) => a + t.N, 0)} rounds; oracle 100%; ` +
    'sv offers no card that is a word of its own prompt (0/8 against 8/8 shipped); every length/guess/solver ratchet held.');
  process.exit(0);
})();
