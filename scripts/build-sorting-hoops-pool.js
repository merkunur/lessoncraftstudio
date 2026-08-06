#!/usr/bin/env node
/* =====================================================================
   build-sorting-hoops-pool.js — writes `mini tools/sorting-hoops-pool.json`

   THE K-2 POOL. The shipped tool dealt twelve cards drawn uniformly from
   933, and a measured live tray read: Dimetrodon, Coat, Parasaurolophus,
   Sled, Vacuum Cleaner, Cooler. For five-year-olds.

   Five gates, all must pass. Gate 4 (syllable count present in >= 9 of
   the 11 locales) is mechanical and runs here; gates 1, 2, 3 and 5 are
   the ruling of three three-person panels (early-years vocabulary
   specialist + multilingual lexicographer + K-2 classroom teacher) over
   the 573 keys that survived gate 4.

     G1 nameable UNPROMPTED by a five-year-old in all eleven languages
     G2 a single concrete bounded object — drops seasons and events,
        places and landscape, substances and mass nouns, body parts, and
        celestial bodies and weather
     G3 no mythical or supernatural referent — the hoop silently enforces
        its tags with no teacher override, so it would insist a dragon IS
        ALIVE and that NOBODY MADE IT
     G4 syllable count in >= 9 locales
     G5 a five-year-old can argue about it on the conceptual attributes

   ⚠ THE CORRECTIONS ARE APPLIED HERE, NOT TO object-attributes.json.
   That corpus is regenerated from `_object-attributes.seed.json` by
   `merge-object-attributes.js`, so a direct edit is lost at the next
   merge. The overrides ride in the pool file, which is this tool's own
   artifact, and every one of them is listed below with its reason.

   ⚠⚠ THE VEHICLE CORRECTIONS ARE REJECTED, DELIBERATELY. All three
   curation panels proposed `moves: moved -> self` for car, bus, truck,
   train, tractor, ship, ferry, rocket, helicopter, motorcycle, ambulance,
   bulldozer and forklift, on the reasoning that an engine moves a vehicle
   under its own power. The PEDAGOGY panel had already ruled on exactly
   this case and ruled the other way, because lesson preset #15 —
   "People made it" x "It moves by itself" — is built on it:

       "THE CAR. The class will insist a car moves by itself; the corpus
        says something else moves it. That argument — who is doing the
        moving? — is the single richest conversation this instrument can
        manufacture, and the empty lens is the reason it happens.
        Do not fix this by re-tagging vehicles."

   Re-tagging would fill that lens and delete the lesson. The corpus
   convention is that `self` means a living thing moving itself, and it
   is kept.

   Usage: node scripts/build-sorting-hoops-pool.js [--check]
   `--check` writes nothing and exits 1 if the file on disk is stale.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
const OUT = path.join(MINI, 'sorting-hoops-pool.json');
const CHECK = process.argv.indexOf('--check') > -1;

const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const SYLL_LOCALE_FLOOR = 9;

/* ---------------------------------------------------------------------
   The panel verdict. KEEP only; anything not named here is dropped, so a
   key added to the corpus later is excluded until a panel has seen it —
   silence is a DROP, never a KEEP.
   --------------------------------------------------------------------- */
const KEEP = `
alligator ambulance apron backpack badger ball balloon banana bandage barbecue basket bat beanie
bear beaver bed bee bell bell-pepper belt bench bicycle binoculars bird biscuit blackberry
blueberry boat book bookcase bookshelf bottle bowl bracelet bread broccoli broom brush bucket
bull bulldozer bun bunny bus butterfly cabbage cabinet cake calculator calf camel candle candy
cap car carpet carrot cart cat caterpillar chair cheese cheetah cherry chick chicken clock closet
coat comb computer cookie corn cow crab crib crow crown cucumber cup deer desk dice dog doll
dolphin domino donut door doughnut dragonfly dress dresser drum duck duckling earthworm egg
envelope eraser excavator faucet feather
fence ferry fireplace fish flag flamingo flashlight flower flute folder fork forklift fox fridge
frog garlic gate giraffe girl glass glove goat goose gorilla grasshopper grill guitar ham hammer
hammock hamster handbag hat helicopter hippopotamus horse hose house jacket jar jellyfish jug
kettle key kite knife ladder lamb lamp lantern leaf lemon lettuce lid lighthouse lizard lock log
lunchbox mango map marker mask medal melon millipede mirror moose mop mosquito motorcycle mouse
mug mushroom necklace nest net notebook octopus onion orange orca ostrich otter oven overalls
package paint-brush pajamas palm-tree pan panda pants peach peacock pear
pelican pen penguin pepper pie pig pillow pine-tree pinecone pitcher pizza plate plum pot potato
pumpkin rabbit raccoon radish rake refrigerator reindeer rhinoceros ring rock rocket rooster rope
rug sailboat sandbox sausage scale scarecrow scarf scissors scooter seal seashell shark sheep
shelf ship shirt shoe shorts shovel sink skirt sled slide snail snorkel sock spider spoon stool
stork stove strawberry sunflower swan sweater syringe table teapot telephone tent tie tiger tights
tissue toad toaster tomato toucan tractor train trash-can tree trousers truck trumpet tulip turkey
turtle umbrella underpants vacuum-cleaner waffle wallet walrus wasp watch watering-can watermelon
whale whisk window wolf worm xylophone zebra
`.trim().split(/\s+/);

/* ---------------------------------------------------------------------
   Attribute corrections. Each is a data error the panels found while
   reading the cards, with the reason. These override object-attributes
   .json at load time; they do not modify it.
   --------------------------------------------------------------------- */
const FIX = {
  /* the adjacent contradiction that started the audit: `tree` was tagged
     once_living while `pine-tree` was living, and both can be dealt into
     the same twelve-card tray, where the hoop accepts one and releases
     the other on the SAME rule. A child cannot resolve that. */
  tree:          { living: 'living', size_band: 'bigger', habitat: 'land' },

  /* a bell pepper was tagged "people made it" and "we do not eat it" */
  pepper:        { living: 'once_living', natural: 'natural', edible: 'yes' },

  /* meat was alive */
  ham:           { living: 'once_living' },
  sausage:       { living: 'once_living' },

  /* habitat */
  hippopotamus:  { habitat: 'water' },
  stork:         { habitat: 'land' },   /* storks wade, but nest and stand on land */
  toad:          { habitat: 'land' },   /* the toad is the LAND amphibian; the frog is not */

  /* size_band — none of these fits in a child's hand */
  chicken:       { size_band: 'person' },
  rooster:       { size_band: 'person' },
  duck:          { size_band: 'person' },
  crow:          { size_band: 'person' },
  toucan:        { size_band: 'person' },
  watermelon:    { size_band: 'person' },
  sunflower:     { size_band: 'person' },
  shovel:        { size_band: 'person' },
  apron:         { size_band: 'person' }  /* consistent with coat/dress/blouse */
};

/* Rejected corrections, recorded so a later reader does not "fix" them
   again. Each is a real proposal from a curation panel, overruled. */
const REJECTED = {
  'car,bus,truck,train,tractor,ship,ferry,rocket,helicopter,motorcycle,ambulance,bulldozer,excavator,forklift':
    'moves: moved -> self — REJECTED. Lesson preset #15 ("People made it" x "It moves by itself") ' +
    'is built on the empty lens this produces; the pedagogy panel named the car by name and ruled ' +
    '"do not fix this by re-tagging vehicles". The corpus convention is that `self` means a living ' +
    'thing moving itself.',
  leaf:
    'living: living -> once_living — REJECTED as contested. A leaf on the tree is alive and a fallen ' +
    'one is not; the card does not settle which, so neither tag is safe and neither is a data error.',
  coral:
    'living: living -> contested — not a value in the field, and the card is dropped by G5 anyway.'
};

/* --------------------------------------------------------------------- */
function main() {
  const idx = JSON.parse(fs.readFileSync(path.join(MINI, 'pww-index-en.json'), 'utf8'));
  const attrs = JSON.parse(fs.readFileSync(path.join(MINI, 'object-attributes.json'), 'utf8'));
  const syl = JSON.parse(fs.readFileSync(path.join(MINI, 'syllable-counts.json'), 'utf8'));

  /* the key set the picture index can actually show */
  const inIndex = new Set();
  idx.themes.forEach((t) => t.c.forEach((c) => { if (!c.na) inIndex.add(c.k); }));

  const cover = (k) => LOCALES.filter((l) => syl.keys[k] && syl.keys[k][l]).length;

  const kept = [];
  const rejected = { notInIndex: [], noAttrs: [], thinSyllables: [] };
  const seen = new Set();

  for (const k of KEEP) {
    if (seen.has(k)) continue;
    seen.add(k);
    if (!inIndex.has(k)) { rejected.notInIndex.push(k); continue; }
    if (!attrs.keys[k]) { rejected.noAttrs.push(k); continue; }
    /* ⚠ gate 4 is re-applied here rather than trusted from the panel run:
       the panels saw a list that had already passed it, and a gate that
       trusts its own input is not a gate. */
    if (cover(k) < SYLL_LOCALE_FLOOR) { rejected.thinSyllables.push(k); continue; }
    kept.push(k);
  }
  kept.sort();

  /* every FIX key must be in the pool, or it is a silent no-op */
  const orphanFix = Object.keys(FIX).filter((k) => kept.indexOf(k) < 0);
  /* every FIX field must be a real field with a real value */
  const FIELDS = attrs.$fields || {};
  const badFix = [];
  Object.keys(FIX).forEach((k) => {
    Object.keys(FIX[k]).forEach((f) => {
      if (!FIELDS[f]) { badFix.push(k + '.' + f + ' is not a field'); return; }
      if (FIELDS[f].indexOf(FIX[k][f]) < 0) badFix.push(k + '.' + f + ' = ' + FIX[k][f] + ' is not a value');
      /* a correction that matches what is already there is INERT and
         should be deleted, not carried */
      if (attrs.keys[k] && attrs.keys[k][f] === FIX[k][f]) badFix.push(k + '.' + f + ' is INERT (already ' + FIX[k][f] + ')');
    });
  });

  const doc = {
    $comment:
      'The K-2 pool for Sorting Hoops. Built by scripts/build-sorting-hoops-pool.js from a ' +
      'three-panel curation over the ' + SYLL_LOCALE_FLOOR + '-locale syllable-gated candidates. ' +
      '`fix` overrides object-attributes.json at load time and does not modify it. ' +
      'Silence is a DROP: a key not named by a panel is not in the pool.',
    v: 1,
    count: kept.length,
    keys: kept,
    fix: FIX,
    rejectedCorrections: REJECTED
  };

  console.log('candidates named by the panels : ' + seen.size);
  console.log('  not in the picture index     : ' + rejected.notInIndex.length +
    (rejected.notInIndex.length ? '  ' + rejected.notInIndex.join(', ') : ''));
  console.log('  no attribute row             : ' + rejected.noAttrs.length +
    (rejected.noAttrs.length ? '  ' + rejected.noAttrs.join(', ') : ''));
  console.log('  syllables in < ' + SYLL_LOCALE_FLOOR + ' locales     : ' + rejected.thinSyllables.length +
    (rejected.thinSyllables.length ? '  ' + rejected.thinSyllables.join(', ') : ''));
  console.log('POOL                           : ' + kept.length);
  console.log('corrections                    : ' + Object.keys(FIX).length);

  if (orphanFix.length) {
    console.error('FAIL  correction(s) for a key that is not in the pool — silent no-op: ' + orphanFix.join(', '));
    process.exit(1);
  }
  if (badFix.length) {
    console.error('FAIL  malformed or inert correction(s):\n    ' + badFix.join('\n    '));
    process.exit(1);
  }
  if (kept.length < 200) {
    console.error('FAIL  the pool is ' + kept.length + ' cards. Below ~200 the rule floors ' +
      '(24 per rule, 25 per syllable value) start emptying the menu.');
    process.exit(1);
  }

  const text = JSON.stringify(doc, null, 1) + '\n';
  if (CHECK) {
    const cur = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
    if (cur !== text) { console.error('FAIL  sorting-hoops-pool.json is STALE — re-run without --check'); process.exit(1); }
    console.log('ok    the pool file on disk is current');
    return;
  }
  fs.writeFileSync(OUT, text);
  console.log('written: ' + OUT);
}

main();
