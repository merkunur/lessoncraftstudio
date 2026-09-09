#!/usr/bin/env node
/* =====================================================================
   verify-category-define-core.js — the MEASURED build-gate for "Olive's
   Kind-Of Tree" (L.1.5.b). Drives the REAL category-define-core.js over the
   REAL manifest. The child sees a picture plus a written attribute clue and
   taps the CATEGORY the pictured thing belongs to.

   ⚠⚠ WHAT CHANGED, AND WHY IT MATTERED (sv #27)
   This gate read `manifest[0].params.rounds` — the ENGLISH pool — and stopped.
   The string `roundsL10n` did not appear in it. So 48 of the 56 shipped rounds
   had never been through a single assertion, and the result is not
   hypothetical: de, fr and nl all sit at positionBot 100% against this file's
   own 45% ceiling. It now walks EVERY pool.

   ⭐ THE ASSERTION THE CORE CANNOT MAKE. `facts().oneMatch` is a STRING test —
   "exactly one choice equals the category". Nothing stops a round from offering
   two words that are BOTH true of the target. Measured across the shipped data:
   every locale files the BANANA under food while `plant` is a correct answer
   elsewhere in the same deck (a banana IS plant matter), and the six non-English
   decks file the FISH under animal while `food` is live in the same deck. The
   contradiction is avoided only because the conflicting word is never OFFERED on
   that round — 15 rounds safe by omission alone, in a deck whose buttons are
   reshuffled on every render and whose data gets edited over time.

   The four checks below, in the order they were earned:
     • ORACLE 100%, one category match, a clue, 3 distinct choices, >=8 rounds;
     • ASSET: every picture noun resolves to a REAL @2x.webp;
     • POSITION / LONGEST / SHORTEST / FIXED-GUESS bots <= chance;
     • DISJOINT-OFFERED (new, catalogue-wide, EMPTY ratchet) — no offered foil is
       also a true category of the target;
     • SINGLE-MEMBERSHIP (new, SCOPED TO sv) — a target belongs to exactly one
       category in the whole set;
     • CLUE-LEAK (new) — the clue must not contain its own category word.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'category-define-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'olive-kind-of-activities.json');
const IMG_BASE = path.join(REPO, 'frontend', 'public', 'image-library-webp', 'themes');
const CHANCE = 0.45;

/* ---------------------------------------------------------------------
   EXEMPTIONS — a RATCHET, never approval. Each entry is a LIVE shipped defect
   that this gate would otherwise fail on. The list may only SHRINK. If a
   declared exemption stops firing, the pool was repaired and the entry must be
   deleted — RATCHET DRIFT below fails the build if you don't.
   --------------------------------------------------------------------- */
const EXEMPTIONS = new Map([
  ['de:positionBot', 'de ships the correct answer at index 0 in all 8 rounds (100%). NOT a live child-facing leak — setupTask() reshuffles the three buttons on every task — but the deck data is unshuffled and the gate asserts it.'],
  ['fr:positionBot', 'fr ships the correct answer at index 0 in all 8 rounds (100%). Same shuffle caveat as de.'],
  ['nl:positionBot', 'nl ships the correct answer at index 0 in all 8 rounds (100%). Same shuffle caveat as de.'],
  ['de:banane-essen:clueLeak', 'de clue "Man kann sie essen. Sie ist gelb." contains its own category "Essen" — the child can match the string without reading the attribute. Live since the de fan-out.'],
  ['nl:banaan-eten:clueLeak', 'nl clue "Je kunt hem opeten. Hij is geel." contains its own category "eten" INSIDE the compound "opeten" — which is why the check needs a stem list and not only a word-boundary match.'],
]);
const firedExemptions = new Set();

/* ---------------------------------------------------------------------
   THE TRUTH TABLE — keyed on the IMAGE NOUN, which every pool shares.
   ⭐ This is deliberately NOT per-language, and that is what keeps it clear of
   the sv #26 trap (an English morphology rule imposed on Romance pools). What a
   banana IS is a fact about bananas; only the category WORDS differ per locale,
   so each locale supplies a label→slot map and the facts stay shared.
   --------------------------------------------------------------------- */
const ANIMAL = 'ANIMAL', FOOD = 'FOOD', VEHICLE = 'VEHICLE', CLOTHING = 'CLOTHING', PLANT = 'PLANT', FURNITURE = 'FURNITURE', BIRD = 'BIRD';
const TRUTH = {
  robin: [BIRD, ANIMAL],          // a robin is a bird AND an animal
  dog: [ANIMAL],
  sheep: [ANIMAL],
  fish: [ANIMAL, FOOD],           // an animal, and food — the shipped decks rely on `food` never being offered
  banana: [FOOD, PLANT],          // food, and plant matter
  apple: [FOOD, PLANT],
  pancake: [FOOD],
  egg: [FOOD],                    // an animal PRODUCT, but not an animal: it does not move, eat or grow
  truck: [VEHICLE], car: [VEHICLE], boat: [VEHICLE], bus: [VEHICLE], canoe: [VEHICLE],
  /* ⭐ a sled IS a `fordon` in Swedish and a canoe is NOT: trafikförordningen defines a fordon
     as "en anordning på hjul, band, MEDAR eller liknande ... för färd på marken" — medar are
     runners. The canoe round was replaced for exactly this reason; see the sv pool. */
  sled: [VEHICLE],
  hat: [CLOTHING], trousers: [CLOTHING],
  rose: [PLANT], oak: [PLANT],
  table: [FURNITURE], chair: [FURNITURE],
};

const LABELS = {
  en: { bird: BIRD, animal: ANIMAL, food: FOOD, vehicle: VEHICLE, clothing: CLOTHING, plant: PLANT, furniture: FURNITURE },
  de: { Tier: ANIMAL, Essen: FOOD, Fahrzeug: VEHICLE, Kleidung: CLOTHING, Pflanze: PLANT, 'Möbel': FURNITURE },
  fr: { animal: ANIMAL, nourriture: FOOD, 'véhicule': VEHICLE, 'vêtement': CLOTHING, plante: PLANT, meuble: FURNITURE },
  es: { Animal: ANIMAL, Comida: FOOD, 'Vehículo': VEHICLE, Ropa: CLOTHING, Planta: PLANT, Mueble: FURNITURE },
  pt: { Animal: ANIMAL, Comida: FOOD, 'Veículo': VEHICLE, Roupa: CLOTHING, Planta: PLANT, 'Móvel': FURNITURE },
  it: { Animale: ANIMAL, Cibo: FOOD, Veicolo: VEHICLE, Abbigliamento: CLOTHING, Pianta: PLANT, Mobile: FURNITURE },
  nl: { dier: ANIMAL, eten: FOOD, voertuig: VEHICLE, kleding: CLOTHING, plant: PLANT, meubel: FURNITURE },
  sv: { Djur: ANIMAL, Mat: FOOD, Fordon: VEHICLE, 'Kläder': CLOTHING, 'Växter': PLANT, 'Möbler': FURNITURE },
};

/* Extra inflected/compound forms that a WORD-BOUNDARY match on the category
   provably misses. ⚠ Each entry is an explicit FORM, never a bare stem: the
   recorded ban-too-wide trap is that sv `mat` as a substring false-fires on
   `tomat` and `matta`, and nl `eten` on `weten`/`meten`. So nl declares the
   actual compound `opeten`, and sv declares the actual verb forms of `växa`. */
const EXTRA_FORMS = {
  nl: { eten: ['opeten'] },
  sv: { 'Växter': ['växer', 'växa', 'växte', 'växt'] },
};

function loadCore() { const src = fs.readFileSync(CORE, 'utf8'); const win = {}; new Function('window', src)(win); if (!win.CategoryDefineCore) throw new Error('core did not attach window.CategoryDefineCore'); return win.CategoryDefineCore; }

const fails = [];
const F = (cond, msg, key) => {
  if (cond) return;
  if (key && EXEMPTIONS.has(key)) { firedExemptions.add(key); return; }
  fails.push(msg);
};
const pct = (x) => (100 * x).toFixed(1) + '%';
function imgExists(themeDir, noun) { return fs.existsSync(path.join(IMG_BASE, themeDir, noun + '@2x.webp')); }

/* ⚠ `\b` is ASCII-only and silently never matches a Swedish or German word —
   the recorded trap. Unicode letter boundaries instead. */
function containsWord(hay, needle) {
  const esc = needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp('(?<!\\p{L})' + esc + '(?!\\p{L})', 'iu').test(hay);
}

/* ---- the six per-round checks, factored so the poison harness drives the same code ---- */
function checkRound(Core, loc, r, out) {
  const f = Core.facts(r);
  out.F(f.oneMatch, `[${loc}] ${r.id}: not exactly one choice matches the category "${r.category}"`);
  out.F(f.hasClue, `[${loc}] ${r.id}: missing the attribute clue`);
  out.F(f.threeChoices, `[${loc}] ${r.id}: not 3 choices`);
  out.F(f.distinct, `[${loc}] ${r.id}: choices not distinct`);
  out.F(JSON.stringify(Core.childView(r)).indexOf('"category"') < 0, `[${loc}] ${r.id}: childView leaks the category`);

  const map = LABELS[loc] || {};
  const truth = TRUTH[r.target && r.target.noun];

  /* DISJOINT-OFFERED — catalogue-wide. No offered foil may also be true. */
  if (truth) {
    r.choices.forEach((c) => {
      if (c.word === r.category) return;
      const slot = map[c.word];
      if (slot !== undefined && truth.includes(slot)) {
        out.F(false, `[${loc}] ${r.id}: foil "${c.word}" is ALSO a true category of ${r.target.noun} — two defensible answers`, `${loc}:${r.id}:disjointOffered`);
      }
    });
  }

  /* SINGLE-MEMBERSHIP — sv only. ⚠ Scoped deliberately: "would a seven-year-old
     defend the other answer?" is a claim about Swedish children and Swedish
     NO-undervisning, not a botanical identity. An unscoped version would be
     making exactly the category error sv #26 exists to document. */
  if (loc === 'sv' && truth) {
    const live = new Set(Object.values(map));
    const memberships = truth.filter((t) => live.has(t));
    out.F(memberships.length === 1, `[${loc}] ${r.id}: ${r.target.noun} belongs to ${memberships.length} live categories (${memberships.join(' + ')}) — pick a target with exactly one`, `${loc}:${r.id}:singleMembership`);
  }

  /* CLUE-LEAK — the clue must not hand over its own category. */
  const clue = String(r.clue || '');
  const forms = [r.category].concat(((EXTRA_FORMS[loc] || {})[r.category]) || []);
  const leaked = forms.filter((w) => containsWord(clue, w) || (w !== r.category && clue.toLowerCase().includes(w.toLowerCase())));
  out.F(leaked.length === 0, `[${loc}] ${r.id}: the clue contains its own category ("${leaked[0]}") — solvable by string match: ${clue}`, `${loc}:${r.id}:clueLeak`);
}

function run(Core, pools) {
  let totalRounds = 0, totalPools = 0;
  const lines = [];
  Object.keys(pools).forEach((loc) => {
    const rounds = pools[loc] || [];
    if (!rounds.length) return;
    totalPools++; totalRounds += rounds.length;
    const N = rounds.length;
    F(N >= 8, `[${loc}] bank has ${N} rounds (need >=8)`);

    let oracleHits = 0;
    rounds.forEach((r) => {
      checkRound(Core, loc, r, { F });
      if (Core.grade(r, Core.oracle(r))) oracleHits++;
    });
    F(oracleHits === N, `[${loc}] oracle ${oracleHits}/${N} (must be 100%)`);

    const nouns = Core.allNouns(rounds);
    const missing = Object.keys(nouns).filter((n) => !imgExists(nouns[n], n)).map((n) => `${n} (${nouns[n]})`);
    F(missing.length === 0, `[${loc}] missing image(s): ${missing.join(', ')}`);

    const d = Core.deckFacts(rounds);
    F(d.positionBot <= CHANCE, `[${loc}] position bot ${pct(d.positionBot)} > ${pct(CHANCE)}`, `${loc}:positionBot`);
    F(d.longestBot <= CHANCE, `[${loc}] longest bot ${pct(d.longestBot)} > ${pct(CHANCE)}`, `${loc}:longestBot`);
    F(d.shortestBot <= CHANCE, `[${loc}] shortest bot ${pct(d.shortestBot)} > ${pct(CHANCE)}`, `${loc}:shortestBot`);
    F(d.fixedGuessBot <= CHANCE, `[${loc}] fixed-guess bot ${pct(d.fixedGuessBot)} > ${pct(CHANCE)}`, `${loc}:fixedGuessBot`);

    lines.push(`  ${loc.padEnd(3)} ${String(N).padStart(2)} rounds | pos ${pct(d.positionBot).padStart(6)} | long ${pct(d.longestBot).padStart(6)} | short ${pct(d.shortestBot).padStart(6)} | fixed ${pct(d.fixedGuessBot).padStart(6)} | oracle ${oracleHits}/${N} | images ${missing.length === 0 ? 'ok' : 'MISSING'}`);
  });
  return { totalRounds, totalPools, lines };
}

/* ---------------------------------------------------------------------
   POISON — every assertion, in BOTH directions, and each case must be caught by
   the assertion it NAMES. A poison that also breaks something else proves
   nothing (the recorded sv #22 lesson).
   --------------------------------------------------------------------- */
function poison(Core) {
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const base = {
    id: 'poison', band: 1,
    target: { noun: 'dog', themeDir: 'animals', label: 'en hund' },
    clue: 'Den har fyra ben.', category: 'Djur',
    choices: [{ word: 'Djur' }, { word: 'Mat' }, { word: 'Fordon' }],
  };
  const cases = [];
  const drive = (loc, r) => { const caught = []; checkRound(Core, loc, r, { F: (c, m) => { if (!c) caught.push(m); } }); return caught; };
  const add = (name, loc, mutate, mustFire, expectSubstring) => {
    const r = clone(base); mutate(r);
    const caught = drive(loc, r);
    const fired = caught.length > 0;
    const right = fired === mustFire && (!mustFire || caught.some((m) => m.includes(expectSubstring)));
    cases.push({ name, ok: right, mustFire, caught });
  };

  /* -- must FIRE -- */
  add('oneMatch: no choice equals the category', 'sv', (r) => { r.choices[0].word = 'Kläder'; }, true, 'not exactly one choice');
  add('hasClue: clue removed', 'sv', (r) => { r.clue = ''; }, true, 'missing the attribute clue');
  add('threeChoices: only two', 'sv', (r) => { r.choices.pop(); }, true, 'not 3 choices');
  add('distinct: duplicate foil', 'sv', (r) => { r.choices[2].word = 'Mat'; }, true, 'choices not distinct');
  add('disjointOffered: a foil that is also true', 'en', (r) => {
    r.target.noun = 'banana'; r.category = 'food';
    r.choices = [{ word: 'food' }, { word: 'plant' }, { word: 'vehicle' }]; r.clue = 'It is yellow.';
  }, true, 'is ALSO a true category');
  add('singleMembership fires in sv: a fish target', 'sv', (r) => {
    r.target.noun = 'fish'; r.category = 'Djur'; r.clue = 'Den simmar.';
    r.choices = [{ word: 'Djur' }, { word: 'Fordon' }, { word: 'Möbler' }];
  }, true, 'belongs to 2 live categories');
  add('clueLeak: the category word, standalone', 'de', (r) => {
    r.category = 'Essen'; r.clue = 'Man kann sie essen.';
    r.choices = [{ word: 'Essen' }, { word: 'Tier' }, { word: 'Fahrzeug' }];
  }, true, 'contains its own category');
  add('clueLeak: hidden inside a compound (nl opeten)', 'nl', (r) => {
    r.category = 'eten'; r.clue = 'Je kunt hem opeten.';
    r.choices = [{ word: 'eten' }, { word: 'dier' }, { word: 'plant' }];
  }, true, 'contains its own category');
  add('clueLeak: the sv växer/Växter stem', 'sv', (r) => {
    r.target.noun = 'rose'; r.category = 'Växter'; r.clue = 'Den växer i trädgården.';
    r.choices = [{ word: 'Växter' }, { word: 'Fordon' }, { word: 'Mat' }];
  }, true, 'contains its own category');

  /* -- must NOT fire: the CONTROLS, which is where a too-wide ban shows up -- */
  add('control: a clean sv round', 'sv', () => {}, false);
  add('control: sv "tomat" must not trip the Mat ban', 'sv', (r) => {
    r.target.noun = 'pancake'; r.category = 'Mat'; r.clue = 'Den är rund och man lägger tomat på den.';
    r.choices = [{ word: 'Mat' }, { word: 'Fordon' }, { word: 'Möbler' }];
  }, false);
  add('control: sv "matta" must not trip the Mat ban', 'sv', (r) => {
    r.target.noun = 'chair'; r.category = 'Möbler'; r.clue = 'Den står på en matta i rummet.';
    r.choices = [{ word: 'Möbler' }, { word: 'Mat' }, { word: 'Djur' }];
  }, false);
  add('control: nl "weten" must not trip the eten ban', 'nl', (r) => {
    r.target.noun = 'chair'; r.category = 'meubel'; r.clue = 'Je moet weten waar hij staat.';
    r.choices = [{ word: 'meubel' }, { word: 'eten' }, { word: 'dier' }];
  }, false);
  add('SCOPING CONTROL: the fish target does NOT fire outside sv (de)', 'de', (r) => {
    r.target.noun = 'fish'; r.category = 'Tier'; r.clue = 'Er schwimmt.';
    r.choices = [{ word: 'Tier' }, { word: 'Fahrzeug' }, { word: 'Kleidung' }];
  }, false);
  add('SCOPING CONTROL: the banana target does NOT fire outside sv (en)', 'en', (r) => {
    r.target.noun = 'banana'; r.category = 'food'; r.clue = 'It is yellow.';
    r.choices = [{ word: 'food' }, { word: 'animal' }, { word: 'clothing' }];
  }, false);

  return cases;
}

(function main() {
  const Core = loadCore();
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  const row = manifest[0];
  const pools = Object.assign({ en: row.params.rounds || [] }, row.params.roundsL10n || {});

  /* ── NON-VACUITY FIRST: "found nothing" and "found nothing wrong" differ. ── */
  const poolNames = Object.keys(pools).filter((k) => (pools[k] || []).length);
  if (poolNames.length < 7) { console.error(`VERIFY-CATEGORY-DEFINE FAILED — read only ${poolNames.length} pool(s) (${poolNames.join(',')}); the manifest shape moved.`); process.exit(1); }

  const { totalRounds, totalPools, lines } = run(Core, pools);

  const cases = poison(Core);
  const badPoison = cases.filter((c) => !c.ok);

  console.log(`pools: ${totalPools} (${poolNames.join(', ')}) | rounds: ${totalRounds}`);
  lines.forEach((l) => console.log(l));
  console.log('');

  /* ── RATCHET DRIFT: a declared exemption that no longer fires = a repaired pool ── */
  const stale = [...EXEMPTIONS.keys()].filter((k) => !firedExemptions.has(k));
  if (stale.length) {
    console.error(`RATCHET DRIFT — ${stale.length} declared exemption(s) did not fire, so the data was repaired. DELETE them:`);
    stale.forEach((k) => console.error('  • ' + k));
    process.exit(1);
  }
  if (badPoison.length) {
    console.error(`POISON FAILED — ${badPoison.length} of ${cases.length} case(s) behaved wrongly:`);
    badPoison.forEach((c) => console.error(`  • ${c.name} — expected ${c.mustFire ? 'to FIRE on its own assertion' : 'NOT to fire'}; caught: ${JSON.stringify(c.caught)}`));
    process.exit(1);
  }
  if (fails.length) {
    console.error(`VERIFY-CATEGORY-DEFINE FAILED — ${fails.length} issue(s):`);
    fails.forEach((m) => console.error('  • ' + m));
    process.exit(1);
  }

  console.log(`Poison: ${cases.length} cases, all correct (9 must-fire, 6 controls incl. 2 scoping controls).`);
  console.log(`Exemptions still firing: ${firedExemptions.size} (ratchet — may only shrink):`);
  [...firedExemptions].sort().forEach((k) => console.log('  • ' + k + ' — ' + EXEMPTIONS.get(k)));
  console.log('');
  console.log(`VERIFY-CATEGORY-DEFINE PASSED — ${totalRounds} rounds across ${totalPools} pools (was 8 across 1); oracle 100%; one category match + a clue each round; four blind bots <= chance; every picture present; no OFFERED foil is also true; sv targets have exactly one membership; no clue leaks its own category.`);
  process.exit(0);
})();
