#!/usr/bin/env node
/* =====================================================================
   verify-be-agreement-core.js — the MEASURED build-gate for "Vera's Verb Match"
   (L.1.1.c). EIGHT pools: en de fr es pt it nl sv.

   ⚠⚠ THIS GATE MUST NOT ASK THE CORE ABOUT A NON-ENGLISH POOL, AND UNTIL sv #28
   IT ONLY EVER READ THE ENGLISH ONE — 48 shipped rounds, 0 assertions.
   `be-agreement-core.js` hard-codes FORMS = ['am','is','are'], so for every other
   locale `correctIndex()` returns -1 and the numbers it reports are ARTEFACTS,
   not measurements. Measured before this rewrite:

       loc   position  longest  shortest  fixedGuess
       en      38%       38%       0%        38%     <- genuine
       de/fr/es/pt/it  100%        0%       0%        38%
       nl              63%         0%       0%        38%

   `positionBot 100%` is not a position leak — every round lands in posCount[-1].
   `longest/shortest 0%` is not "clean" — lens[-1] is undefined, so they measured
   NOTHING. Only fixedGuessBot survives, because it keys on the STRING. And nl's
   63% is the dangerous one: a plausible number is harder to disbelieve than an
   obviously broken one. So this gate computes every bot ITSELF.

   ⭐ Its ground truth is declared here AND cross-checked against what the activity
   actually ships (FORMS_L10N parses cleanly out of vera-verb-match-activity.js).
   That gives independent truth *and* drift detection, instead of the two recorded
   failure modes — reading the expectation off the tool (marking its own homework)
   or hard-coding a copy that silently rots.

   Per pool:
     1  every round's `correct` is one of that locale's three cards;
     2  the shipped FORMS_L10N triple equals the declared one (DRIFT);
     3  the three cards are DISTINCT — the assertion that would have caught
        Swedish trött/trött/trötta, and exactly why it/es/pt switched to
        stare/estar (io sono === loro sono collides);
     4  FORM-MIX: each card is correct in ≥1 round (the core's English-keyed
        formMix is dead for seven pools);
     5  the four blind bots ≤ CHANCE, on the locale's OWN forms;
     6  childView never leaks a "correct" property;
     7  NO PADDING — the renderer already adds the spaces around the blank;
     8  CELL BALANCE (sv) — with per-round cards fixedGuessBot is always 1/8 and
        never binds again, so the live bot is MORPHOLOGICAL: "always tap the -a
        card", "always tap the -t card", "always tap the bare stem". Nothing else
        measures this, and it is the only bot that constrains the sv deck;
     9  length bots measured PER ROUND, inside that round's own cards — a
        deck-wide length comparison is meaningless once every round differs;
    10  THE TAIL RULE (sv) — every `after` must open with a preposition, adverb,
        infinitive marker or conjunction, never a bare noun. For EVERY Swedish
        adjective the plural is homographic with the definite attributive
        ("stora" is both «Bilarna är stora» and «den stora bilen»), so a bare
        noun after the blank would admit the attributive reading the deck bans.
        ⚠⚠ (?<!\p{L})…(?!\p{L}), never \b — \b is ASCII-only and fails silently
        after å/ä/ö, which it did in my own first draft of this very check.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'be-agreement-core.js');
const ACTIVITY = path.join(REPO, 'mini tools', 'vera-verb-match-activity.js');
const MANIFEST = path.join(REPO, 'mini tools', 'vera-verb-match-activities.json');
const CHANCE = 0.45;

/* ---------------------------------------------------------------- ground truth
   Declared HERE, then cross-checked against the shipped FORMS_L10N. sv is the
   fallback triple only: every sv round carries its own `cards`. */
const FORMS = {
  en: ['am', 'is', 'are'],
  de: ['bin', 'ist', 'sind'],
  fr: ['suis', 'est', 'sont'],
  es: ['estoy', 'está', 'están'],
  pt: ['estou', 'está', 'estão'],
  it: ['sto', 'sta', 'stanno'],
  nl: ['ben', 'is', 'zijn'],
  sv: ['stor', 'stort', 'stora'],
};

/* sv cells, in the order the cards ship: [en-ord, ett-ord, flera] */
const SV_CELLS = ['en-ord', 'ett-ord', 'flera'];

/* Swedish function words a tail may open with. A bare noun may not follow the
   blank (see assertion 10). */
const SV_TAIL_OPENERS = [
  'i', 'på', 'vid', 'under', 'över', 'bakom', 'framför', 'bredvid', 'mellan',
  'till', 'från', 'med', 'utan', 'om', 'av', 'åt', 'hos', 'genom', 'runt',
  'nere', 'uppe', 'inne', 'ute', 'inuti', 'överallt', 'idag', 'redan', 'alltid',
  'ibland', 'nu', 'här', 'där', 'hemma',
  'att', 'när', 'som', 'och', 'men', 'för', 'efter', 'innan',
];

const fails = [];
const F = (cond, msg) => { if (!cond) fails.push(msg); };
const pct = (x) => (100 * x).toFixed(1) + '%';
const word = (w) => new RegExp('(?<!\\p{L})' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?!\\p{L})', 'iu');

function loadCore() {
  const win = {};
  new Function('window', fs.readFileSync(CORE, 'utf8'))(win);
  if (!win.BeAgreementCore) throw new Error('core did not attach window.BeAgreementCore');
  return win.BeAgreementCore;
}

/* parse the SHIPPED per-locale triples straight out of the activity layer */
function shippedForms() {
  const src = fs.readFileSync(ACTIVITY, 'utf8').replace(/\/\*[\s\S]*?\*\//g, ''); // ⚠ strip comments: a gate can read PROSE instead of code
  const consts = {};
  const re = /var\s+FORMS_([A-Z]{2})\s*=\s*(\[[^\]]*\])\s*;/g;
  let m;
  while ((m = re.exec(src))) consts['FORMS_' + m[1]] = JSON.parse(m[2].replace(/'/g, '"'));
  const map = src.match(/var\s+FORMS_L10N\s*=\s*\{([^}]*)\}/);
  if (!map) throw new Error('could not parse FORMS_L10N out of the activity layer');
  const out = {};
  map[1].split(',').forEach((pair) => {
    const p = pair.split(':').map((x) => x.trim());
    if (p.length === 2 && consts[p[1]]) out[p[0]] = consts[p[1]];
  });
  return out;
}

/* ---------------------------------------------------------------- bots
   Every number is computed from the round's OWN cards, never from the core.

   ⚠ longestBot is STRUCTURALLY 0% in Swedish and that is not a clean bill of
   health: for every Swedish adjective the ett- and plural forms tie at the
   maximum length (stort/stora, rött/röda), so the longest card is never UNIQUE
   and the assertion cannot bind. It is a property of the morphology, not of the
   data — poison it by manufacturing a unique longest, or you are poisoning
   nothing. shortestBot DOES bind, because the en-form is the bare stem and is
   therefore always uniquely shortest: it equals the share of en-ord rounds,
   which is why the sv deck caps those at 3 of 8. */
function bots(rounds, fallback) {
  const n = rounds.length || 1;
  const posCount = {}, ans = {};
  let longHits = 0, shortHits = 0;
  rounds.forEach((r) => {
    const cards = r.cards || fallback;
    const ci = cards.indexOf(r.correct);
    posCount[ci] = (posCount[ci] || 0) + 1;
    ans[r.correct] = (ans[r.correct] || 0) + 1;
    const lens = cards.map((c) => c.length);
    const mx = Math.max.apply(null, lens), mn = Math.min.apply(null, lens);
    if (ci >= 0 && lens[ci] === mx && lens.filter((l) => l === mx).length === 1) longHits++;
    if (ci >= 0 && lens[ci] === mn && lens.filter((l) => l === mn).length === 1) shortHits++;
  });
  const max = (o) => Math.max.apply(null, Object.keys(o).map((k) => o[k]));
  return {
    positionBot: max(posCount) / n,
    longestBot: longHits / n,
    shortestBot: shortHits / n,
    fixedGuessBot: max(ans) / n,
  };
}

/* the sv-only bot: which CELL is correct, not which WORD */
function cellBot(rounds, fallback) {
  const cell = {};
  rounds.forEach((r) => {
    const i = (r.cards || fallback).indexOf(r.correct);
    cell[i] = (cell[i] || 0) + 1;
  });
  const n = rounds.length || 1;
  const counts = SV_CELLS.map((_, i) => cell[i] || 0);
  return { rate: Math.max.apply(null, counts) / n, counts };
}

(function main() {
  const Core = loadCore();
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  const row = manifest[0];
  const pools = Object.assign({ en: row.params.rounds || [] }, row.params.roundsL10n || {});
  const shipped = shippedForms();

  /* ---- 2. DRIFT: the shipped triples must equal the declared ones ---- */
  Object.keys(FORMS).filter((l) => l !== 'en').forEach((loc) => {
    const s = shipped[loc];
    F(!!s, `DRIFT: the activity layer ships no FORMS_L10N.${loc}`);
    if (s) F(JSON.stringify(s) === JSON.stringify(FORMS[loc]),
      `DRIFT: FORMS_L10N.${loc} ships ${JSON.stringify(s)}, this gate declares ${JSON.stringify(FORMS[loc])}`);
  });
  Object.keys(shipped).forEach((loc) => F(!!FORMS[loc], `DRIFT: the activity ships FORMS_L10N.${loc} that this gate does not know`));
  Object.keys(pools).forEach((loc) => F(!!FORMS[loc], `pool "${loc}" has no declared form triple in this gate`));

  const rows = [];
  Object.keys(pools).forEach((loc) => {
    const rounds = pools[loc];
    const fallback = FORMS[loc] || [];
    const n = rounds.length || 1;
    F(rounds.length >= 8, `${loc}: ${rounds.length} rounds (need >=8)`);

    const seen = {};
    rounds.forEach((r) => {
      const cards = r.cards || fallback;
      const tag = `${loc}/${r.id}`;

      /* 1 + 3 */
      F(cards.length === 3, `${tag}: ${cards.length} cards (need 3)`);
      F(new Set(cards).size === cards.length, `${tag}: cards not distinct — ${JSON.stringify(cards)}`);
      F(cards.indexOf(r.correct) >= 0, `${tag}: correct "${r.correct}" is not one of its cards ${JSON.stringify(cards)}`);
      cards.forEach((c) => { seen[c] = seen[c] || 0; });
      if (cards.indexOf(r.correct) >= 0) seen[r.correct]++;

      /* has a sentence */
      F(typeof r.before === 'string' || typeof r.after === 'string', `${tag}: missing sentence`);

      /* 7 — the renderer writes before + ' ' … ' ' + after itself */
      F(!/\s$/.test(r.before || ''), `${tag}: "before" ends with whitespace — the renderer already pads it (double space on screen)`);
      F(!/^\s/.test(r.after || ''), `${tag}: "after" begins with whitespace — the renderer already pads it (double space on screen)`);

      /* 6 — childView is locale-neutral, so this one CAN go through the core */
      F(JSON.stringify(Core.childView(r)).indexOf('"correct"') < 0, `${tag}: childView leaks the correct property`);
    });

    /* 4 — form-mix over the locale's own cards */
    if (loc === 'sv') {
      const c = cellBot(rounds, fallback);
      SV_CELLS.forEach((name, i) => F(c.counts[i] > 0, `sv: no round is answered by the ${name} card (form-mix)`));
      /* 8 — CELL BALANCE, the only bot that binds once cards are per-round */
      F(c.rate <= CHANCE, `sv: cell bot ${pct(c.rate)} > ${pct(CHANCE)} — ${SV_CELLS.map((s, i) => s + ' ' + c.counts[i]).join(' / ')}`);
      /* 10 — the tail rule */
      rounds.forEach((r) => {
        const first = String(r.after || '').trim().split(/\s+/)[0].replace(/[.,!?;:]+$/, '');
        F(SV_TAIL_OPENERS.some((w) => word(w).test(first)),
          `sv/${r.id}: the tail opens with "${first}" — it must open with a preposition, adverb, infinitive marker or conjunction, or the -a card admits the banned attributive reading («den stora bilen»)`);
      });
    } else {
      fallback.forEach((f) => F(seen[f] > 0, `${loc}: "${f}" is never the correct answer — the bank is not a genuine 3-way`));
    }

    /* 5 + 9 */
    const b = bots(rounds, fallback);
    F(b.positionBot <= CHANCE, `${loc}: position bot ${pct(b.positionBot)} > ${pct(CHANCE)}`);
    F(b.longestBot <= CHANCE, `${loc}: longest bot ${pct(b.longestBot)} > ${pct(CHANCE)}`);
    F(b.shortestBot <= CHANCE, `${loc}: shortest bot ${pct(b.shortestBot)} > ${pct(CHANCE)}`);
    F(b.fixedGuessBot <= CHANCE, `${loc}: fixed-guess bot ${pct(b.fixedGuessBot)} > ${pct(CHANCE)}`);

    const perRound = rounds.some((r) => r.cards);
    rows.push(`  ${loc.padEnd(3)} ${String(rounds.length).padStart(2)} rounds  ` +
      `position ${pct(b.positionBot).padStart(6)} | longest ${pct(b.longestBot).padStart(6)} | ` +
      `shortest ${pct(b.shortestBot).padStart(6)} | fixed-guess ${pct(b.fixedGuessBot).padStart(6)}` +
      (perRound ? `  | cell ${pct(cellBot(rounds, fallback).rate)} (per-round cards)` : ''));
  });

  console.log(`vera-verb-match: ${Object.keys(pools).length} pools, ${Object.values(pools).reduce((a, r) => a + r.length, 0)} rounds  (ceiling ${pct(CHANCE)})`);
  rows.forEach((r) => console.log(r));
  console.log('');
  if (fails.length) {
    console.error(`VERIFY-BE-AGREEMENT FAILED — ${fails.length} issue(s):`);
    fails.forEach((m) => console.error('  • ' + m));
    process.exit(1);
  }
  console.log('VERIFY-BE-AGREEMENT PASSED — 8 pools; correct ∈ its own cards; 3 distinct; genuine 3-way; position/longest/shortest/fixed-guess ≤ chance on each locale’s OWN forms; sv cell balance ≤ chance; sv tail rule; no padding; childView leak-free; shipped FORMS_L10N matches this gate’s declared truth.');
  process.exit(0);
})();
