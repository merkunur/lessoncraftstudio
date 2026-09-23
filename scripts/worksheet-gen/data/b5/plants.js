/**
 * data/b5/plants.js — the G1-376 `plants` bank (nt10-E; design
 * docs/worksheet-gen/b5-designs/G1-376-plants.md §4-§5).
 *
 * PLANTS[loc] — the per-locale block, read ONLY through
 * lib/b5-common.js bank('plants', loc) (a missing block REFUSES, never an en
 * fallback). The EN block is HAND-AUTHORED here (2026-09-23, the base build);
 * the ten non-EN blocks are GENERATED later by tools/apply-b5-locale.js into
 * data/b5/locales/plants.<loc>.json from the native panels' drafts after
 * tools/validate-b5-draft.js, which runs the gate's validateBank(block, loc)
 * (qa/verify-b5-plants.js, §5 rules 1-12).
 *
 * Block shape (§5 PLANTS_LOC):
 *   partWords    {root, stem, leaf, flower, fruit, seed} bare nouns as the locale's
 *                diagram register prints them (en "roots": the figure draws several;
 *                "leaf": the tag points at one). NEVER a vocab lookup (root / stem /
 *                seed have no vocab entry; de vocab `flower` = "Blume", the part is "Blüte").
 *   flowerWords  {petal, sepal, stamen, pistil, stalk, ovary?} (F5; stalk MAY equal partWords.stem)
 *   jobs         {root, stem, leaf, flower, seed, fruit?} (F4) each true of ONE part only,
 *                <= 90 chars, containing no part word and no partStems entry
 *   partStems    the job-leak list: inflected / compound forms of the part words
 *   forbidden    the locale's WRONG-register part words (de Blume, Stengel …)
 *   refuseItems  F3 item ids this locale will not print (e.g. ['celery'])
 *   refuse       faces this locale will not ship (layout names)
 *   strings      { base: {title, instruction}, needs|cycle|eat|jobs|flower: {title, instruction} }
 *                keyed by LAYOUT until the emitter allocates the face ids (§1: K-371+ /
 *                G1-381+ / G2-360+ / G3-392+); base === the spec's i18n.en.
 *   The en strings are a SOURCE TO AUDIT (§4): every panel reads them and reports defects.
 *
 * PLANTS_NEUTRAL — the locale-neutral facts (§5 PLANTS): parts, needs pictures, the F1
 * non-needs pool, the F3 eat pool with its single-answer `allow` lists, the blocked
 * nouns, the growth stages, the F4 job parts. Every picture is a PINNED
 * {theme, noun} read with fileUri(theme, noun) (never pictureFor: `corn` exists in
 * `vegetables` AND `At the Supermarket`), each opened by the design editor
 * (picOpened:true, contact sheets scripts/worksheet-gen/scratchpad/G1-376-crit-*.png).
 *
 * `data/` is gitignored — the reviewer force-adds this module.
 */
'use strict';

const PLANTS = {
  en: {
    partWords: { root: 'roots', stem: 'stem', leaf: 'leaf', flower: 'flower', fruit: 'fruit', seed: 'seed' },
    flowerWords: { petal: 'petal', sepal: 'sepal', stamen: 'stamen', pistil: 'pistil', stalk: 'stalk', ovary: 'ovary' },
    jobs: {
      root: 'takes in water from the soil',
      stem: 'holds the plant up tall',
      leaf: 'makes food for the plant from sunlight',
      flower: 'calls bees with its bright colors',
      seed: 'can grow into a new plant',
    },
    partStems: ['root', 'roots', 'stem', 'stems', 'leaf', 'leaves', 'flower', 'flowers', 'fruit', 'fruits', 'seed', 'seeds', 'blossom', 'bloom', 'petal', 'petals'],
    forbidden: ['vegetable', 'veggie', 'trunk', 'bud'],
    refuseItems: [],
    refuse: [],
    strings: {
      base: { title: 'Parts of a Plant', instruction: 'Follow each numbered tag to a part of the plant. Write the name of that part from the word bank on the line with the same number.' },
      needs: { title: 'What Plants Need to Grow', instruction: 'Look at what each plant gets. Circle the plant that gets both things it needs to grow.' },
      cycle: { title: 'Plant Life Cycle: From Seed to Plant', instruction: 'Cut out the four pictures. Glue each one in the next empty box, going round the arrows from the seed.' },
      eat: { title: 'Parts of a Plant We Eat', instruction: 'Look at each food. Circle the part of the plant that we eat.' },
      jobs: { title: 'Parts of a Plant and Their Functions', instruction: 'Read what each part does. Find that part on the plant and write the number of its tag in the box.' },
      flower: { title: 'Parts of a Flower', instruction: 'Write the name of each numbered part of the flower on its line. Cross out the word in the bank that is not a part of a flower.' },
    },
  },
};

const PLANTS_NEUTRAL = {
  PARTS: ['root', 'stem', 'leaf', 'flower', 'fruit', 'seed'],
  FLOWER_PARTS: ['petal', 'sepal', 'stamen', 'pistil', 'stalk', 'ovary'],
  NEEDS: ['sun', 'raindrop'],
  NEED_PICS: {
    sun: { theme: 'weather', noun: 'sun', picOpened: true },            // a smiling sun = light (space/sun is BLOCKED)
    raindrop: { theme: 'weather', noun: 'raindrop', picOpened: true },  // a blue drop = water
  },
  NON_NEEDS: [
    { theme: 'toys', noun: 'ball', picOpened: true }, { theme: 'toys', noun: 'blocks', picOpened: true },
    { theme: 'toys', noun: 'car', picOpened: true }, { theme: 'toys', noun: 'dice', picOpened: true },
    { theme: 'toys', noun: 'train', picOpened: true }, { theme: 'toys', noun: 'robot', picOpened: true },
    { theme: 'clothing', noun: 'shoe', picOpened: true }, { theme: 'clothing', noun: 'glove', picOpened: true },
    { theme: 'music', noun: 'drum', picOpened: true }, { theme: 'music', noun: 'guitar', picOpened: true },
    { theme: 'classroom', noun: 'pencil', picOpened: true }, { theme: 'classroom', noun: 'book', picOpened: true },
  ],
  NON_NEED_FORBIDDEN: ['kite', 'hat', 'cap', 'lamp', 'moon', 'watering_can', 'water', 'cloud', 'rainy', 'hot', 'puddle', 'rain', 'sun'],
  EAT: [
    { theme: 'vegetables', noun: 'carrot', part: 'root', allow: ['flower', 'fruit', 'seed'], picOpened: true },
    { theme: 'vegetables', noun: 'radish', part: 'root', allow: ['flower', 'fruit', 'seed'], picOpened: true },
    { theme: 'vegetables', noun: 'beetroot', part: 'root', allow: ['flower', 'fruit', 'seed'], picOpened: true },
    { theme: 'vegetables', noun: 'parsnip', part: 'root', allow: ['flower', 'fruit', 'seed'], picOpened: true },
    { theme: 'vegetables', noun: 'lettuce', part: 'leaf', allow: ['root', 'flower', 'fruit', 'seed'], picOpened: true },
    { theme: 'vegetables', noun: 'spinach', part: 'leaf', allow: ['root', 'flower', 'fruit', 'seed'], picOpened: true },
    { theme: 'vegetables', noun: 'cabbage', part: 'leaf', allow: ['root', 'flower', 'fruit', 'seed'], picOpened: true },
    { theme: 'vegetables', noun: 'broccoli', part: 'flower', allow: ['root', 'fruit', 'seed'], picOpened: true },
    { theme: 'vegetables', noun: 'cauliflower', part: 'flower', allow: ['root', 'fruit', 'seed'], picOpened: true },
    { theme: 'vegetables', noun: 'celery', part: 'stem', allow: ['root', 'flower', 'fruit', 'seed'], picOpened: true },
    { theme: 'vegetables', noun: 'corn', part: 'seed', allow: ['root', 'stem'], picOpened: true },   // flower OUT (faces build, opened): an ear of corn IS an inflorescence and baby corn is eaten whole as one

    { theme: 'At the Supermarket', noun: 'peas', part: 'seed', allow: ['root', 'stem', 'flower'], picOpened: true },
    { theme: 'vegetables', noun: 'tomato', part: 'fruit', allow: ['root', 'leaf', 'stem'], picOpened: true },
    { theme: 'vegetables', noun: 'cucumber', part: 'fruit', allow: ['root', 'leaf', 'stem'], picOpened: true },
    { theme: 'vegetables', noun: 'eggplant', part: 'fruit', allow: ['root', 'leaf', 'stem'], picOpened: true },
    { theme: 'At the Supermarket', noun: 'pepper', part: 'fruit', allow: ['root', 'leaf', 'stem'], picOpened: true },
  ],
  EAT_BLOCKED: ['asparagus', 'potato', 'onion', 'garlic', 'leek', 'mushroom', 'turnip', 'pumpkin', 'squash', 'bell_pepper', 'chilli_pepper', 'green_beans'],
  STAGES: ['seed', 'sprout', 'seedling', 'young', 'flowering', 'fruiting'],
  JOB_PARTS: ['root', 'stem', 'leaf', 'flower', 'seed'],   // fruit only with a validator-clean literal
  LAYOUTS: ['needs', 'cycle', 'eat', 'jobs', 'flower'],
};

module.exports = { PLANTS, PLANTS_NEUTRAL };
