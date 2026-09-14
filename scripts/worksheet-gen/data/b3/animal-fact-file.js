/**
 * data/b3/animal-fact-file.js — the G2-318 `animal-fact-file` per-locale literals
 * bank (design file docs/worksheet-gen/b3-designs/G2-318-animal-fact-file.md
 * §5; the task names THIS file `fact-file.js`, and the spec reads it through
 * lib/b3-common.js bank('animal-fact-file', loc) — the build brief's `<key>.js`
 * naming is recorded as a deviation in _work/G2-318-build.md).
 *
 * The locale-NEUTRAL truth (7 fields × 54 animals, the chip sets, the
 * per-theme exemplars) lives in data/b3/animal-facts.json and is NEVER
 * re-authored here: this file holds only what a native panel WRITES — labels,
 * option literals, frames, the animal name/title/def literals, the strings.
 *
 * EN block HAND-AUTHORED (2026-09-14, G2-318 base build); the ten non-EN
 * blocks are GENERATED later by tools/apply-b3-locale.js from
 * i18n/.draft-b3-<loc>.json (native panels rebuild, never translate).
 * `data/` is gitignored — the reviewer force-adds this module.
 *
 * Shape (design §5):
 *   FACT_FILE[loc] = {
 *     labels:      { class, habitat, diet, legs, covering, fly, swim, special }
 *                  // <= 28 chars, the row labels of the fact table (160 px col,
 *                  // Nunito 800 17, <= 2 measured lines — the render gate decides)
 *     eyebrow:     'Name:'         // the `unit:'blank'` banner eyebrow
 *     drawLabel:   'Draw where it lives.'
 *     sentence:    'A sentence about the animal:'   // the fact-lane caption
 *                  // printed when the animal has no `def` (never a bare vocab word)
 *     factStarter: '{def} can'     // filled with animals[key].def, upper-first
 *     special:     the d3 caption over the free ruling block (labels.special)
 *     options:     { class|covering|diet|habitat: { <choiceKey>: {cell, inFrame} } }
 *                  // cell <= 16 (a chip / a bank word), inFrame <= 22 (the
 *                  // article/preposition travels INSIDE the literal)
 *     yesno:       { yes, no }
 *     legsFrames:  { 0, 2, 4, 6, 8 }          // whole first-person literals (F6)
 *     animals:     { <vocabKey>: { name, title, def, nom, ade, reviewed } }
 *                  // name = the vocab singular AS STORED (initial capital);
 *                  // title = the {U} token in the deck title; def = the
 *                  // definite phrase a frame subject takes ('the hedgehog');
 *                  // fi authors nom + ade instead of def; a missing literal
 *                  // drops the ANIMAL from the face that needs it, never the face
 *     frames:      [{field, text}] × 3, `{def}` exactly once (F4)
 *     sameDiff:    { same, diff, laneSame, laneDiff }                     (F5)
 *     mystery:     { class, covering, diet, habitat, fly:{true,false}, swim:{true,false}, prompt }   (F6)
 *     allowCompound: []            // sv only: the compounds carrying `grupp`
 *     blankTitle:  'Template'       // the {U} of the wave-pinnable `blank` unit
 *     strings:     { 'G2-318': {title, instruction} }   (F2..F6 added in Phase 2)
 *   }
 *
 * EN rules applied here:
 *   - en = the US market: "Animal group" not "Class" for a 7-year-old; the
 *     `a/an` article is STORED in `inFrame`, never computed;
 *   - `skin` reads `smooth skin` (every animal has skin — the covering the
 *     child is asked about is the visible one; es/pt/fr/it/nl/sv literals in
 *     the design carry the same qualifier);
 *   - the diet mystery frame takes {inFrame} so `both` reads "plants and
 *     meat", never "I eat both.";
 *   - the base prints ONLY labels.* / drawLabel / factStarter (or sentence)
 *     / labels.special / animals[unit].name + strings['G2-318']; the rest is
 *     authored so the panels see the whole shape.
 */
'use strict';

const FACT_FILE = {
  en: {
    labels: {
      class: 'Animal group',
      habitat: 'Where it lives',
      diet: 'What it eats',
      legs: 'Legs',
      covering: 'Body covering',
      fly: 'Can it fly?',
      swim: 'Can it swim?',
      special: 'Special feature:',
    },
    eyebrow: 'Name:',
    drawLabel: 'Draw where it lives.',
    sentence: 'A sentence about the animal:',
    factStarter: '{def} can',
    options: {
      class: {
        mammal: { cell: 'mammal', inFrame: 'a mammal' },
        bird: { cell: 'bird', inFrame: 'a bird' },
        reptile: { cell: 'reptile', inFrame: 'a reptile' },
        fish: { cell: 'fish', inFrame: 'a fish' },
        insect: { cell: 'insect', inFrame: 'an insect' },
      },
      covering: {
        fur: { cell: 'fur', inFrame: 'fur' },
        feathers: { cell: 'feathers', inFrame: 'feathers' },
        scales: { cell: 'scales', inFrame: 'scales' },
        shell: { cell: 'shell', inFrame: 'a shell' },
        spines: { cell: 'spines', inFrame: 'spines' },
        skin: { cell: 'smooth skin', inFrame: 'smooth skin' },
      },
      diet: {
        plants: { cell: 'plants', inFrame: 'plants' },
        meat: { cell: 'meat', inFrame: 'meat' },
        both: { cell: 'both', inFrame: 'plants and meat' },
      },
      habitat: {
        land: { cell: 'land', inFrame: 'on land' },
        water: { cell: 'water', inFrame: 'in water' },
        air: { cell: 'air', inFrame: 'in the air' },
      },
    },
    yesno: { yes: 'yes', no: 'no' },
    legsFrames: {
      0: 'I have no legs.',
      2: 'I have 2 legs.',
      4: 'I have 4 legs.',
      6: 'I have 6 legs.',
      8: 'I have 8 legs.',
    },
    animals: {
      cat: { name: 'Cat', title: 'Cat', def: 'the cat', nom: null, ade: null, reviewed: true },
      dog: { name: 'Dog', title: 'Dog', def: 'the dog', nom: null, ade: null, reviewed: true },
      horse: { name: 'Horse', title: 'Horse', def: 'the horse', nom: null, ade: null, reviewed: true },
      rabbit: { name: 'Rabbit', title: 'Rabbit', def: 'the rabbit', nom: null, ade: null, reviewed: true },
      cow: { name: 'Cow', title: 'Cow', def: 'the cow', nom: null, ade: null, reviewed: true },
      pig: { name: 'Pig', title: 'Pig', def: 'the pig', nom: null, ade: null, reviewed: true },
      sheep: { name: 'Sheep', title: 'Sheep', def: 'the sheep', nom: null, ade: null, reviewed: true },
      goat: { name: 'Goat', title: 'Goat', def: 'the goat', nom: null, ade: null, reviewed: true },
      donkey: { name: 'Donkey', title: 'Donkey', def: 'the donkey', nom: null, ade: null, reviewed: true },
      duck: { name: 'Duck', title: 'Duck', def: 'the duck', nom: null, ade: null, reviewed: true },
      hen: { name: 'Hen', title: 'Hen', def: 'the hen', nom: null, ade: null, reviewed: true },
      rooster: { name: 'Rooster', title: 'Rooster', def: 'the rooster', nom: null, ade: null, reviewed: true },
      goose: { name: 'Goose', title: 'Goose', def: 'the goose', nom: null, ade: null, reviewed: true },
      fox: { name: 'Fox', title: 'Fox', def: 'the fox', nom: null, ade: null, reviewed: true },
      hedgehog: { name: 'Hedgehog', title: 'Hedgehog', def: 'the hedgehog', nom: null, ade: null, reviewed: true },
      owl: { name: 'Owl', title: 'Owl', def: 'the owl', nom: null, ade: null, reviewed: true },
      squirrel: { name: 'Squirrel', title: 'Squirrel', def: 'the squirrel', nom: null, ade: null, reviewed: true },
      deer: { name: 'Deer', title: 'Deer', def: 'the deer', nom: null, ade: null, reviewed: true },
      bear: { name: 'Bear', title: 'Bear', def: 'the bear', nom: null, ade: null, reviewed: true },
      wolf: { name: 'Wolf', title: 'Wolf', def: 'the wolf', nom: null, ade: null, reviewed: true },
      bat: { name: 'Bat', title: 'Bat', def: 'the bat', nom: null, ade: null, reviewed: true },
      beaver: { name: 'Beaver', title: 'Beaver', def: 'the beaver', nom: null, ade: null, reviewed: true },
      moose: { name: 'Moose', title: 'Moose', def: 'the moose', nom: null, ade: null, reviewed: true },
      raccoon: { name: 'Raccoon', title: 'Raccoon', def: 'the raccoon', nom: null, ade: null, reviewed: true },
      butterfly: { name: 'Butterfly', title: 'Butterfly', def: 'the butterfly', nom: null, ade: null, reviewed: true },
      bee: { name: 'Bee', title: 'Bee', def: 'the bee', nom: null, ade: null, reviewed: true },
      ladybug: { name: 'Ladybug', title: 'Ladybug', def: 'the ladybug', nom: null, ade: null, reviewed: true },
      ant: { name: 'Ant', title: 'Ant', def: 'the ant', nom: null, ade: null, reviewed: true },
      lion: { name: 'Lion', title: 'Lion', def: 'the lion', nom: null, ade: null, reviewed: true },
      tiger: { name: 'Tiger', title: 'Tiger', def: 'the tiger', nom: null, ade: null, reviewed: true },
      elephant: { name: 'Elephant', title: 'Elephant', def: 'the elephant', nom: null, ade: null, reviewed: true },
      giraffe: { name: 'Giraffe', title: 'Giraffe', def: 'the giraffe', nom: null, ade: null, reviewed: true },
      zebra: { name: 'Zebra', title: 'Zebra', def: 'the zebra', nom: null, ade: null, reviewed: true },
      monkey: { name: 'Monkey', title: 'Monkey', def: 'the monkey', nom: null, ade: null, reviewed: true },
      kangaroo: { name: 'Kangaroo', title: 'Kangaroo', def: 'the kangaroo', nom: null, ade: null, reviewed: true },
      camel: { name: 'Camel', title: 'Camel', def: 'the camel', nom: null, ade: null, reviewed: true },
      hippopotamus: { name: 'Hippopotamus', title: 'Hippopotamus', def: 'the hippopotamus', nom: null, ade: null, reviewed: true },
      panda: { name: 'Panda', title: 'Panda', def: 'the panda', nom: null, ade: null, reviewed: true },
      koala: { name: 'Koala', title: 'Koala', def: 'the koala', nom: null, ade: null, reviewed: true },
      penguin: { name: 'Penguin', title: 'Penguin', def: 'the penguin', nom: null, ade: null, reviewed: true },
      eagle: { name: 'Eagle', title: 'Eagle', def: 'the eagle', nom: null, ade: null, reviewed: true },
      parrot: { name: 'Parrot', title: 'Parrot', def: 'the parrot', nom: null, ade: null, reviewed: true },
      flamingo: { name: 'Flamingo', title: 'Flamingo', def: 'the flamingo', nom: null, ade: null, reviewed: true },
      ostrich: { name: 'Ostrich', title: 'Ostrich', def: 'the ostrich', nom: null, ade: null, reviewed: true },
      swan: { name: 'Swan', title: 'Swan', def: 'the swan', nom: null, ade: null, reviewed: true },
      tortoise: { name: 'Tortoise', title: 'Tortoise', def: 'the tortoise', nom: null, ade: null, reviewed: true },
      lizard: { name: 'Lizard', title: 'Lizard', def: 'the lizard', nom: null, ade: null, reviewed: true },
      turtle: { name: 'Turtle', title: 'Turtle', def: 'the turtle', nom: null, ade: null, reviewed: true },
      fish: { name: 'Fish', title: 'Fish', def: 'the fish', nom: null, ade: null, reviewed: true },
      goldfish: { name: 'Goldfish', title: 'Goldfish', def: 'the goldfish', nom: null, ade: null, reviewed: true },
      shark: { name: 'Shark', title: 'Shark', def: 'the shark', nom: null, ade: null, reviewed: true },
      hamster: { name: 'Hamster', title: 'Hamster', def: 'the hamster', nom: null, ade: null, reviewed: true },
      mouse: { name: 'Mouse', title: 'Mouse', def: 'the mouse', nom: null, ade: null, reviewed: true },
      frog: { name: 'Frog', title: 'Frog', def: 'the frog', nom: null, ade: null, reviewed: true },
    },
    frames: [
      { field: 'class', text: '{def} is' },
      { field: 'covering', text: '{def} has' },
      { field: 'diet', text: '{def} eats' },
    ],
    sameDiff: { same: 'same', diff: 'different', laneSame: 'Same:', laneDiff: 'Different:' },
    mystery: {
      class: 'I am {inFrame}.',
      covering: 'I have {cell}.',
      diet: 'I eat {inFrame}.',
      habitat: 'I live {inFrame}.',
      fly: { true: 'I can fly.', false: 'I cannot fly.' },
      swim: { true: 'I can swim.', false: 'I cannot swim.' },
      prompt: 'Who am I?',
    },
    allowCompound: [],
    blankTitle: 'Template',
    strings: {
      'G2-318': {
        title: 'Animal Fact File: {U}',
        instruction: 'Find out about this animal. Write one fact in each row of the fact file, then fill in the rest of the page with your own drawing or words.',
      },
    },
  },
};

module.exports = { FACT_FILE };
