#!/usr/bin/env node
/* =====================================================================
   verify-series-comma-core.js — the MEASURED build-gate for "Cleo's Packing List"
   (L.1.2.b), across ALL EIGHT pools.

   ⚠⚠ IT MUST NOT ASK THE CORE ABOUT A NON-ENGLISH POOL. `series-comma-core.js`
   hardcodes the ENGLISH serial comma (", and "), so `oracle`/`grade`/`facts`/
   `deckFacts` are meaningless on any of the seven localized decks. The previous
   version of this file read `params.rounds` only — 8 English rounds, one pool —
   so the six shipped locales had NO GATE AT ALL, and neither would sv.

   This version does two things at once, and needs both:
     • it DRIVES THE REAL ACTIVITY (loads cleo-packing-list-activity.js in a
       sandbox, sets LANG through init(), and reads the cards back out of
       setupTask/view + isCorrect) — so it is testing the shipped builder, not a
       copy of it re-implemented here, which would be testing a copy;
     • it holds its OWN independently declared expected correct form per locale —
       so the shipped builder cannot mark its own homework. A disagreement is
       reported as DRIFT and names both strings.

   ⭐ THE BOT TABLE IS THE POINT. A foil set is meant to leave a surface heuristic
   at the real discrimination and no further. Four heuristics are measured, each as
   the uniform pick among the cards sharing the correct card's value:
       earliest  where the FIRST comma falls in the string
       count     how many commas
       length    rendered characters
       nearConj  is there a comma immediately before the final conjunction
   ⚠ Five of the seven three-item decks score 1.00 on `earliest` — with three items
   the correct card is ALWAYS the earliest-comma card, because a foil can only push
   the single comma rightward. That is a live defect and it is recorded below as a
   RATCHET that may only shrink, never a hard fail: repairing it means new native
   round data in six locales, six panels, six commits. The Swedish deck is the
   rebuild — FOUR items, so all three cards share their first comma and the
   discrimination moves to the second one.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'series-comma-core.js');
const ACT = path.join(REPO, 'mini tools', 'cleo-packing-list-activity.js');
const MANIFEST = path.join(REPO, 'mini tools', 'cleo-packing-list-activities.json');
const CHANCE = 0.45;

/* ---- independently declared truth. NOT read off the activity. ------------------
   en is the only locale with the serial comma before the conjunction. sv is the
   only one with FOUR items, and its correct form puts a comma between every pair
   of items and none before «och» (Svenska skrivregler). */
const TRUTH = {
  en: { items: 3, correct: (r) => `${r.lead} ${r.items[0]}, ${r.items[1]}, and ${r.items[2]}.` },
  de: { items: 3, correct: (r) => `${r.lead} ${r.items[0]}, ${r.items[1]} und ${r.items[2]}.` },
  fr: { items: 3, correct: (r) => `${r.lead} ${r.items[0]}, ${r.items[1]} et ${r.items[2]}.` },
  es: { items: 3, correct: (r) => `${r.lead} ${r.items[0]}, ${r.items[1]} y ${r.items[2]}.` },
  pt: { items: 3, correct: (r) => `${r.lead} ${r.items[0]}, ${r.items[1]} e ${r.items[2]}.` },
  it: { items: 3, correct: (r) => `${r.lead} ${r.items[0]}, ${r.items[1]} e ${r.items[2]}.` },
  nl: { items: 3, correct: (r) => `${r.lead} ${r.items[0]}, ${r.items[1]} en ${r.items[2]}.` },
  sv: { items: 4, correct: (r) => `${r.lead} ${r.items[0]}, ${r.items[1]}, ${r.items[2]} och ${r.items[3]}.` },
};
const CONJ = { en: 'and', de: 'und', fr: 'et', es: 'y', pt: 'e', it: 'e', nl: 'en', sv: 'och' };

/* ⚠ RATCHET, measured 2026-09-10. These decks are solvable by a surface heuristic
   and the fix is native round data per locale. A number here may only go DOWN. */
const RATCHET = {
  en: 1.00, de: 1.00, fr: 1.00, es: 1.00, pt: 1.00, it: 1.00, nl: 1.00, sv: 0.50,
};

const fails = [];
const F = (cond, msg) => { if (!cond) fails.push(msg); };
const pct = (x) => (100 * x).toFixed(0) + '%';

/* ---- load the REAL activity in a sandbox and drive it per locale -------------- */
function loadCore() {
  const win = {};
  new Function('window', fs.readFileSync(CORE, 'utf8'))(win);
  if (!win.SeriesCommaCore) throw new Error('core did not attach window.SeriesCommaCore');
  return win.SeriesCommaCore;
}
function loadActivity(core) {
  const win = { SeriesCommaCore: core };
  new Function('window', fs.readFileSync(ACT, 'utf8'))(win);
  if (!win.CleoPackingListActivity) throw new Error('activity did not attach window.CleoPackingListActivity');
  return win.CleoPackingListActivity;
}
/* the shipped builder's own output for one round in one locale */
function shippedCards(A, loc, round) {
  A.init({ lang: loc });
  A.setupTask(round);
  const texts = A.view.choices.map((c) => c.text);
  const ok = [];
  for (let i = 0; i < texts.length; i++) { A.sel = i; if (A.isCorrect()) ok.push(i); }
  A.sel = null;
  return { texts, ok };
}

/* ---- surface heuristics ------------------------------------------------------- */
const axis = {
  earliest: (t) => { const i = t.indexOf(','); return i < 0 ? 1e9 : i; },
  count: (t) => (t.match(/,/g) || []).length,
  length: (t) => t.length,
};
const nearConj = (loc) => (t) => (t.indexOf(', ' + CONJ[loc] + ' ') >= 0 ? 1 : 0);
const bot = (vals, ci) => 1 / vals.filter((v) => v === vals[ci]).length;

/* ---- Swedish-only content rules ------------------------------------------------
   ⚠ Only items 2 and 3 are ever juxtaposed (in the gap-missing card), so the
   compound test applies to that pair and no other.
   ⚠ The verb-homograph ban is SCOPED: Swedish -ar plurals are systematically
   homographous with first-conjugation presents (bilar/bila, bollar/bolla), so a
   formal-identity ban would reject half the language. Only high-frequency STRONG
   verb presents, which match no plural pattern, can actually be read as a verb
   here — and only in slots 2-4, where a clause or a coordination can form. */
const SV_STRONG_PRESENTS = ['bär', 'far', 'ser', 'är', 'får', 'ler', 'bor', 'står', 'tar', 'ger', 'syr', 'dör', 'mår'];
/* real Swedish compounds whose split form would rescue a foil, checked as <a><b> */
const SV_REAL_COMPOUNDS = ['husbilar', 'barnböcker', 'glasburkar', 'djurungar', 'äppelsmör', 'äggost', 'saltsmör', 'lövbark'];
const SV_MAX_RENDERED = 42;  /* measured: 42 chars is the one-line budget at 17px in a 376px card */

function svContentRules(rounds) {
  const seen = new Set();
  for (const r of rounds) {
    const [, b, c, d] = r.items;
    F(r.items.length === 4, `sv/${r.id}: ${r.items.length} items, expected 4`);
    F(!/[,]/.test(r.lead + r.items.join('')), `sv/${r.id}: a comma inside the DATA — the engine owns every comma`);
    for (const w of r.items) {
      F(!seen.has(w), `sv/${r.id}: "${w}" already appears in another round`);
      seen.add(w);
      F(!/^(och|eller|samt)$/.test(w), `sv/${r.id}: "${w}" is a conjunction — it would license a tydlighetskomma`);
      F(w.indexOf(' ') < 0, `sv/${r.id}: "${w}" is not a single word`);
    }
    /* the ONLY juxtaposed pair, in the gap-missing card */
    const solid = (b + c).toLowerCase();
    F(SV_REAL_COMPOUNDS.indexOf(solid) < 0,
      `sv/${r.id}: "${b} ${c}" reads as the compound "${solid}" — that card is a särskrivning, not a comma error`);
    /* ⚠ reverse order is an ORDER LOCK, not a defect: särskrivning preserves order,
       so <c><b> being a word does not break the card as displayed — but a future
       reorder would. Reported, never failed. */
    const rev = (c + b).toLowerCase();
    if (SV_REAL_COMPOUNDS.indexOf(rev) >= 0) console.log(`  note  sv/${r.id}: ORDER-LOCKED — "${c}${b}" is a real word, so items 2 and 3 may not be swapped`);
    for (const [slot, w] of [[2, b], [3, c], [4, d]]) {
      F(SV_STRONG_PRESENTS.indexOf(w) < 0,
        `sv/${r.id}: "${w}" in slot ${slot} is a strong-verb present — it can be read as a verb and the card stops being a clean comma error`);
    }
    const rendered = TRUTH.sv.correct(r);
    F(rendered.length <= SV_MAX_RENDERED,
      `sv/${r.id}: renders ${rendered.length} chars (> ${SV_MAX_RENDERED}) — the cards then disagree on LINE COUNT at desktop and card shape identifies one`);
  }
}

(function main() {
  const core = loadCore();
  const A = loadActivity(core);
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'))[0];
  const pools = Object.assign({ en: manifest.params.rounds }, manifest.params.roundsL10n);

  F(Object.keys(pools).length === Object.keys(TRUTH).length,
    `manifest has ${Object.keys(pools).length} pools, this gate declares ${Object.keys(TRUTH).length} — a locale shipped without a declared truth, or vice versa`);

  console.log('pool  n  items   earliest  count  length  nearConj   position   ceiling ' + pct(CHANCE));
  for (const loc of Object.keys(TRUTH)) {
    const rounds = pools[loc];
    if (!rounds) { F(false, `${loc}: declared here but absent from the manifest`); continue; }
    const N = rounds.length;
    F(N >= 8, `${loc}: ${N} rounds (need >= 8)`);

    const scores = { earliest: 0, count: 0, length: 0, nearConj: 0 };
    const posCount = {};
    for (const r of rounds) {
      F(typeof r.lead === 'string' && r.lead.length > 0, `${loc}/${r.id}: no lead`);
      F(Array.isArray(r.items) && r.items.length === TRUTH[loc].items,
        `${loc}/${r.id}: ${(r.items || []).length} items, this locale's decks carry ${TRUTH[loc].items}`);

      const { texts, ok } = shippedCards(A, loc, r);
      F(texts.length === 3, `${loc}/${r.id}: ${texts.length} cards, expected 3`);
      F(new Set(texts).size === texts.length, `${loc}/${r.id}: two cards are identical`);
      F(ok.length === 1, `${loc}/${r.id}: ${ok.length} cards grade as correct, expected exactly 1`);
      if (ok.length !== 1) continue;
      const ci = ok[0];

      /* ⭐ DRIFT: the shipped builder against this gate's own declared truth */
      const want = TRUTH[loc].correct(r);
      F(texts[ci] === want,
        `${loc}/${r.id}: DRIFT — the deck grades\n      "${texts[ci]}"\n    but this gate's declared correct form for ${loc} is\n      "${want}"`);

      /* ⭐ DERIVED, not stored: bogus authored fields must change nothing */
      const poisoned = Object.assign({}, r, { answer: 'ZZZ', forms: ['x', 'y', 'z'], text: 'nope' });
      F(shippedCards(A, loc, poisoned).texts.join('|') === texts.join('|'),
        `${loc}/${r.id}: the cards changed when bogus fields were injected — they are not derived from items`);

      posCount[ci] = (posCount[ci] || 0) + 1;
      for (const k of ['earliest', 'count', 'length']) scores[k] += bot(texts.map(axis[k]), ci);
      scores.nearConj += bot(texts.map(nearConj(loc)), ci);
    }
    const positionBot = Math.max(...Object.values(posCount)) / N;
    const worst = Math.max(...Object.values(scores).map((s) => s / N));
    F(positionBot <= CHANCE, `${loc}: position bot ${pct(positionBot)} > ${pct(CHANCE)} — the answer sits in the same slot too often`);

    /* ⚠ RATCHET, not a hard fail: the shipped three-item decks are solvable by
       surface and the repair is native round data per locale. May only shrink. */
    const allowed = RATCHET[loc];
    F(allowed !== undefined, `${loc}: no ratchet entry — a new locale must declare its measured worst bot`);
    if (allowed !== undefined) {
      F(worst <= allowed + 1e-9,
        `${loc}: worst surface bot ${pct(worst)} EXCEEDS its ratchet ${pct(allowed)} — a change made this deck MORE guessable`);
    }
    console.log(
      loc.padEnd(5), String(N).padEnd(2), String(TRUTH[loc].items).padEnd(6),
      pct(scores.earliest / N).padStart(9), pct(scores.count / N).padStart(6),
      pct(scores.length / N).padStart(7), pct(scores.nearConj / N).padStart(9),
      pct(positionBot).padStart(10), '   worst ' + pct(worst) + ' (ratchet ' + pct(allowed) + ')'
    );
  }

  if (pools.sv) svContentRules(pools.sv);

  console.log('');
  if (fails.length) {
    console.error(`VERIFY-SERIES-COMMA FAILED — ${fails.length} issue(s):`);
    fails.forEach((m) => console.error('  • ' + m));
    process.exit(1);
  }
  console.log('VERIFY-SERIES-COMMA PASSED — 8 pools driven through the REAL activity builder, each ' +
    'cross-checked against this gate\'s own declared correct form (drift); cards DERIVED from items ' +
    '(bogus fields ignored); exactly one correct, three distinct; position bot <= chance; the four ' +
    'surface heuristics within each pool\'s ratchet; sv content rules (4 items, single words, no ' +
    'conjunction as an item, item2+item3 not a real compound, no strong-verb present in slots 2-4, ' +
    'no repeated item, rendered <= ' + SV_MAX_RENDERED + ' chars so the three cards never disagree on line count).');
  process.exit(0);
})();
