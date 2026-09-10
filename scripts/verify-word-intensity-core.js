#!/usr/bin/env node
/* =====================================================================
   verify-word-intensity-core.js — the MEASURED build-gate for "Roary's Roar
   Meter" (L.2.5.b, shades of meaning). Drives the REAL word-intensity-core.js
   over the REAL manifest, EVERY locale pool.

   ⚠⚠ WHY THIS FILE WAS REWRITTEN AT sv #34. The old version asserted
   `longestBot <= 0.45` and `shortestBot <= 0.45` and had always been green —
   English scores 0.38 and 0.25. But the `ask` ALTERNATES, so the real solver is
   ask-aware and needs no vocabulary at all:

       "if the question says STRONGEST tap the LONGEST word,
        if it says WEAKEST tap the SHORTEST"      -> en 68.8%, pt 50.0%

   ⭐ The exploit is the PRODUCT of the two bots the old gate measured
   SEPARATELY, and neither half breaches alone. A gate that measures a
   conjunction one conjunct at a time is not measuring it.

   ⭐ And length is not the only axis. Syllable count is independent — a deck
   tuned against one can get worse on the other (fr moves 25.0 -> 14.6 while es
   moves 16.7 -> 25.0). So the ratchet is the MAX OVER THE WHOLE FAMILY, never a
   per-axis number, or fixing one axis silently buys a regression on the next.

   ⚠ AND ONE MORE, WHICH IS THE OVER-CORRECTION TRAP: the core guarantees the
   MIDDLE-RANK word is never the answer, so "always tap the middle-LENGTH card"
   becomes powerful the moment a deck is tuned to keep the answer off both length
   extremes. It is in the family for exactly that reason. The target for every
   bot is CHANCE (33.3%), never zero — a deck where a rule is always wrong hands
   the win to that rule's inverse.

   WHAT IS DELIBERATELY *NOT* ASSERTED
     ⚠⚠ positionBot. It reads the STORED array order, and the activity shuffles
     one layer up — `roary-roar-meter-activity.js:61`
     `this._cards = shuffle(this.view.words.slice())`, with `render()` iterating
     `_cards` and never `view.words`. Five shipped locales store every round in
     ascending rank order and so read 1.000 here, which looks like a catastrophe
     and is an artefact: measured in a real browser over 24 remounts, all six
     permutations appear and the position bot sits at 13-46% against a 33%
     chance floor. It is printed as informational only. The RENDERED order is
     asserted where a child could actually see it — in local-test-roary-roar-meter.js.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'word-intensity-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'roary-roar-meter-activities.json');
const CHANCE = 0.45;

/* Measured baselines. ⚠ RATCHET: may only ever SHRINK. Every number is pasted from
   `--measure` against the shipped data, never estimated — I have invented a ratchet
   number three times in this fan-out and been wrong every time in the direction that
   fails a CORRECT deck. A locale absent from the table is held to the flat rule. */
const CUE_BASELINE = { en: 0.688, de: 0.479, fr: 0.625, es: 0.417, pt: 0.625, it: 0.542, nl: 0.479 };
/* ⚠⚠ WHICH locales may carry a ratchet at all is frozen here, and it is the only
   thing standing between this gate and a laundered regression: a poison that simply
   ADDED an sv row at 0.90 made a real 50% breach pass, because the max-over-family
   number is the sole cue assertion and there is no second axis to catch it. A locale
   not on this list is held to the flat ceiling, full stop. The list may only SHRINK. */
const RATCHET_ALLOWED = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl'];
/* ⚠⚠ EVERY ONE of the seven shipped pools breaches the 45% chance ceiling on SOME cue,
   and it is a DIFFERENT cue in each — en askLength 68.8, fr alwaysShortest 62.5, pt
   alwaysLongest 62.5, it midLength 54.2, de/nl midLength 47.9, es midLength 41.7. The
   old gate saw none of it because it measured two of these eight. Frozen here at the
   measured value so they can only improve and the finding stays visible; sv must come
   in UNDER the flat 45% on all eight, with no ratchet row of its own. */

const fails = [];
const F = (cond, msg) => { if (!cond) fails.push(msg); };
const pct = (x) => (100 * x).toFixed(1) + '%';

function loadCore() {
  const src = fs.readFileSync(CORE, 'utf8');
  const win = {};
  new Function('window', src)(win);
  if (!win.WordIntensityCore) throw new Error('core did not attach window.WordIntensityCore');
  return win.WordIntensityCore;
}

/* ---- the cue family. None of these reads Swedish, or any language. ---- */
const target = (r) => {
  const ranks = r.words.map((w) => w.rank);
  return r.ask === 'weakest' ? Math.min.apply(null, ranks) : Math.max.apply(null, ranks);
};
const share = (r, cand) => (cand.length ? cand.filter((w) => w.rank === target(r)).length / cand.length : 0);
const pickBy = (ws, f, dir) => { const v = Math[dir].apply(null, ws.map(f)); return ws.filter((w) => f(w) === v); };
const LEN = (w) => w.word.length;
const SYL = (w) => (w.word.toLowerCase().match(/[aeiouyåäöàéèìòùáíóúâêîôûü]+/g) || []).length;
const ALPHA = (w) => w.word.toLowerCase().charCodeAt(0);
const midBy = (ws, f) => { const s = ws.slice().sort((a, b) => f(a) - f(b)); return ws.filter((w) => f(w) === f(s[1])); };

// ask-aware: the ask tells the bot WHICH extreme to take, so it is one strategy, not two
const askAware = (f) => (r) => share(r, r.ask === 'strongest' ? pickBy(r.words, f, 'max') : pickBy(r.words, f, 'min'));
const askInverse = (f) => (r) => share(r, r.ask === 'strongest' ? pickBy(r.words, f, 'min') : pickBy(r.words, f, 'max'));

const CUES = {
  askLength: askAware(LEN),
  askLengthInv: askInverse(LEN),
  askSyllable: askAware(SYL),
  askSyllableInv: askInverse(SYL),
  askAlpha: askAware(ALPHA),
  // ⚠ the over-correction trap: the middle-RANK word is never the answer by construction
  midLength: (r) => share(r, midBy(r.words, LEN)),
  alwaysLongest: (r) => share(r, pickBy(r.words, LEN, 'max')),
  alwaysShortest: (r) => share(r, pickBy(r.words, LEN, 'min'))
};
const CUE_NAMES = Object.keys(CUES);

(function main() {
  const measure = process.argv.includes('--measure');
  const Core = loadCore();
  const params = JSON.parse(fs.readFileSync(MANIFEST, 'utf8')).find(Boolean).params;
  const pools = Object.assign({ en: params.rounds || [] }, params.roundsL10n || {});
  const locales = Object.keys(pools);

  F(locales.length >= 8, `only ${locales.length} pools — did a locale vanish?`);
  F(locales.indexOf('sv') >= 0, 'no sv pool — the Swedish deck is missing');

  Object.keys(CUE_BASELINE).forEach((loc) => {
    F(RATCHET_ALLOWED.indexOf(loc) >= 0,
      `${loc} carries a ratchet row, but only locales already breaching when this gate was written may have one — ` +
      `a locale added later must come in under the flat ${pct(CHANCE)}`);
  });

  const table = [];
  locales.forEach((loc) => {
    const pool = pools[loc];
    const N = pool.length || 1;
    F(pool.length >= 8, `${loc}: ${pool.length} rounds (need >=8)`);

    let oracleHits = 0;
    pool.forEach((r) => {
      const f = Core.facts(r);
      const w = `${loc}/${r.setId || r.id}`;
      F(f.validAsk, `${w}: ask is "${r.ask}" (must be strongest|weakest)`);
      F(f.threeWords, `${w}: not 3 words`);
      F(f.ranksDistinct, `${w}: ranks not distinct`);
      F(f.distinct, `${w}: words not distinct`);
      F(f.answerNotMiddle, `${w}: the answer is the MIDDLE-rank word`);
      F(JSON.stringify(Core.childView(r)).indexOf('rank') < 0, `${w}: childView leaks rank`);
      if (Core.grade(r, Core.oracle(r))) oracleHits++;
    });
    F(oracleHits === N, `${loc}: oracle ${oracleHits}/${N} (must be 100%)`);

    const d = Core.deckFacts(pool);
    F(d.askStrong === d.askWeak, `${loc}: ask is ${d.askStrong} strongest / ${d.askWeak} weakest (must be balanced, or a prompt-ignoring reader profits)`);
    F(d.middleHits === 0, `${loc}: ${d.middleHits} round(s) answer the middle-rank word`);
    F(d.fixedGuessBot <= CHANCE, `${loc}: fixed-guess bot ${pct(d.fixedGuessBot)} > ${pct(CHANCE)}`);

    const cue = {};
    CUE_NAMES.forEach((n) => { cue[n] = pool.reduce((a, r) => a + CUES[n](r), 0) / N; });
    const worst = Math.max.apply(null, CUE_NAMES.map((n) => cue[n]));
    const worstName = CUE_NAMES.find((n) => cue[n] === worst);

    if (!measure) {
      const ceil = Object.prototype.hasOwnProperty.call(CUE_BASELINE, loc) ? CUE_BASELINE[loc] : CHANCE;
      F(worst <= ceil + 1e-3,
        `${loc}: worst surface cue "${worstName}" ${pct(worst)} > baseline ${pct(ceil)} ` +
        `(ratchet may only shrink — fix the WORDS or the ask, never this number)`);
    }
    table.push({ loc, N: pool.length, d, cue, worst, worstName });
  });

  const pad = (s, n) => String(s).padStart(n);
  console.log('loc  n   S/W  fixed | ' + CUE_NAMES.map((n) => pad(n.slice(0, 12), 13)).join('') + '   worst');
  table.forEach((t) => {
    console.log(t.loc.padEnd(5) + pad(t.N, 2) + pad(t.d.askStrong + '/' + t.d.askWeak, 5) +
      pad(t.d.fixedGuessBot.toFixed(2), 7) + ' | ' +
      CUE_NAMES.map((n) => pad((100 * t.cue[n]).toFixed(1), 13)).join('') +
      pad((100 * t.worst).toFixed(1), 8) + '  ' + t.worstName);
  });
  console.log('\n(chance = 33.3%. positionBot is NOT asserted — it reads the STORED order, which the ' +
    'activity shuffles away before a card is drawn: ' + table.map((t) => t.loc + ' ' + t.d.positionBot.toFixed(2)).join(', ') + ')');

  if (measure) {
    console.log('\n--measure: paste this into CUE_BASELINE, never estimate it');
    console.log('  ' + JSON.stringify(table.reduce((a, t) => (a[t.loc] = Number(t.worst.toFixed(3)), a), {})));
    process.exit(0);
  }

  console.log('');
  if (fails.length) {
    console.error(`VERIFY-WORD-INTENSITY FAILED — ${fails.length} issue(s):`);
    fails.forEach((m) => console.error('  • ' + m));
    process.exit(1);
  }
  console.log(`VERIFY-WORD-INTENSITY PASSED — ${locales.length} pools, ${table.reduce((a, t) => a + t.N, 0)} rounds; ` +
    'oracle 100%; ask balanced; the middle-rank word is never the answer; every ask-aware surface cue inside its measured ratchet.');
  process.exit(0);
})();
