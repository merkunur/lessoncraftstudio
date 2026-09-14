/**
 * data/b3/all-about-me.js — the K-323 `all-about-me` bank (design file
 * docs/worksheet-gen/b3-designs/K-323-all-about-me.md §5; the design names the
 * file `about-me.js`, the build brief names it `all-about-me.js` = the family
 * key, and lib/b3-common.js bank('all-about-me', loc) reads THIS file).
 *
 * EN block HAND-AUTHORED (2026-09-14, K-323 base build); the ten non-EN
 * blocks are GENERATED later by tools/apply-b3-locale.js from
 * i18n/.draft-b3-<loc>.json (native panels author every label as a WHOLE
 * literal, the face words, the `can` sentences, a `refuse` list and the
 * strings). `data/` is gitignored — the reviewer force-adds this module.
 *
 * Shape:
 *   ALL_ABOUT_ME[loc] = {
 *     labels: { nameIs, age:{pre, post, glue}, thisIsMe, family, familyDraw,
 *               drawFace, school, favHeading:{animal, food, color, toy},
 *               countHeads:{people, brothers, sisters, pets}, wantLearn,
 *               myName, friendName, oneLetterPerBox, lettersCount,
 *               firstLetter, whoHasMore:{question, me, friend} },
 *     faceWords: { eye, ear, nose, mouth, hair, eyebrow, chin },
 *               // each === displayWord(vocab[key][loc][0], loc) — the F3 bank
 *     can:      { <actionId>: 'one whole first-person literal' },   // F4
 *     refuse:   [],                          // explicit per-face refusal ids
 *     strings:  { 'K-323':{title, instruction} }   (F1..F5 added in Phase 2)
 *   }
 *   ALL_ABOUT_ME_PICTURES = the GLOBAL, locale-neutral picture seed (the same
 *   pictures in all 11 locales; a locale may never swap one):
 *     categories: [{ id, options:[{theme, noun, picOpened} | {color}] }]  // F1
 *     face:       { theme:'body parts', noun:'face', anchors:{…} }          // F3
 *     actions:    [{ id, cue:{theme, noun}, picOpened }]                    // F4
 *
 * EN rules applied here:
 *   - en = the US market (design §4 trap): favorite / color, never favourite;
 *   - every label is a whole literal, no `{` slot, no digit; the numeral box
 *     sits INSIDE the age literal as pre + box + post (`glue:false` in en —
 *     fi alone is `glue:true` with a `-vuotias` suffix touching the box);
 *   - `countHeads` end with `:` so no numeral-noun agreement is ever printed;
 *   - `can` = first-person present, <= 34 chars, never the bare vocab noun
 *     (the vocab stores `Running / Swimming`, a NOUN — the sentence is the
 *     panel's), and every id is an `actions` entry;
 *   - the base prints ONLY labels.nameIs / age / thisIsMe / family /
 *     favHeading.animal|food|color (d3: + toy, school) + strings['K-323'];
 *     the rest is authored so the panels see the whole shape.
 *
 * Pictures OPENED 2026-09-14 (contact sheets k323-sheet-1/2.png in the build
 * report): every option below is what its filename says (a cat, a dog, …);
 * `toys/ball` is a football-patterned ball (kept: a ball); REJECTED and
 * absent: `At the Supermarket/egg` (a carton of three under a singular
 * label), `clothing/shoe` (a laceless loafer — no "tie my shoes"),
 * `activities/football` (an American football; the soccer ball is the cue),
 * `activities/baking` (an adult), `activities/dancing` (an adult ballerina),
 * `toys/teddy_bear` (no vocabKey); `toys/scooter` + `toys/crayons` fall to
 * the 96 px label ceiling (see the toy list). The F1 lists are CANDIDATES inside the
 * measured all-11 ceilings (animals 33 / supermarket 58 / colours 7); the
 * gate's global 96 px pool check (Nunito 800 16, real render, ALL 11
 * locales) is the backstop that drops any label that does not fit a tile.
 */
'use strict';

const ALL_ABOUT_ME = {
  en: {
    labels: {
      nameIs: 'My name is',
      age: { pre: 'I am', post: 'years old', glue: false },
      thisIsMe: 'This is me',
      family: 'My family',
      familyDraw: 'Draw your family',
      drawFace: 'Now draw your own face',
      school: 'My school is',
      favHeading: {
        animal: 'My favorite animal',
        food: 'My favorite food',
        color: 'My favorite color',
        toy: 'My favorite toy',
      },
      countHeads: {
        people: 'People in my family:',
        brothers: 'Brothers:',
        sisters: 'Sisters:',
        pets: 'Pets:',
      },
      wantLearn: 'I want to learn to',
      myName: 'My name',
      friendName: "My friend's name",
      oneLetterPerBox: 'Write one letter in each box',
      lettersCount: 'Letters in my name:',
      firstLetter: 'The first letter of my name:',
      whoHasMore: { question: 'Who has more letters?', me: 'me', friend: 'my friend' },
    },
    faceWords: { eye: 'eye', ear: 'ear', nose: 'nose', mouth: 'mouth', hair: 'hair', eyebrow: 'eyebrow', chin: 'chin' },
    can: {
      swim: 'I can swim',
      run: 'I can run',
      skip: 'I can skip with a rope',
      bike: 'I can ride a bike',
      read: 'I can read a book',
      soccer: 'I can kick a ball',
      puzzle: 'I can do a puzzle',
      paint: 'I can paint a picture',
      sing: 'I can sing a song',
      skate: 'I can skate',
      ski: 'I can ski',
      writename: 'I can write my name',
      brushteeth: 'I can brush my teeth',
    },
    refuse: [],
    strings: {
      'K-323': {
        title: 'All About Me',
        instruction: 'Write your name and your age, draw yourself and your family, then draw your three favorite things.',
      },
    },
  },
};

const ALL_ABOUT_ME_PICTURES = {
  categories: [
    { id: 'animal', options: [
      { theme: 'animals', noun: 'cat', picOpened: true }, { theme: 'animals', noun: 'dog', picOpened: true },
      { theme: 'animals', noun: 'fish', picOpened: true }, { theme: 'animals', noun: 'horse', picOpened: true },
      { theme: 'animals', noun: 'rabbit', picOpened: true }, { theme: 'animals', noun: 'duck', picOpened: true },
      { theme: 'animals', noun: 'pig', picOpened: true }, { theme: 'animals', noun: 'sheep', picOpened: true },
      { theme: 'animals', noun: 'elephant', picOpened: true }, { theme: 'animals', noun: 'giraffe', picOpened: true },
      { theme: 'animals', noun: 'penguin', picOpened: true }, { theme: 'animals', noun: 'tiger', picOpened: true },
    ] },
    { id: 'food', options: [
      { theme: 'At the Supermarket', noun: 'apple', picOpened: true }, { theme: 'At the Supermarket', noun: 'banana', picOpened: true },
      { theme: 'At the Supermarket', noun: 'bread', picOpened: true }, { theme: 'At the Supermarket', noun: 'cheese', picOpened: true },
      { theme: 'At the Supermarket', noun: 'pizza', picOpened: true }, { theme: 'At the Supermarket', noun: 'carrot', picOpened: true },
      { theme: 'At the Supermarket', noun: 'strawberry', picOpened: true }, { theme: 'At the Supermarket', noun: 'cookie', picOpened: true },
      { theme: 'At the Supermarket', noun: 'pasta', picOpened: true }, { theme: 'At the Supermarket', noun: 'milk', picOpened: true },
      { theme: 'At the Supermarket', noun: 'grapes', picOpened: true }, { theme: 'At the Supermarket', noun: 'cake', picOpened: true },
    ] },
    // pink excluded globally: fi `vaaleanpunainen` 128.4 px > 96 (design §3 F1)
    { id: 'color', options: [
      { color: 'red' }, { color: 'blue' }, { color: 'yellow' }, { color: 'green' }, { color: 'orange' }, { color: 'purple' }, { color: 'brown' },
    ] },
    { id: 'toy', options: [
      { theme: 'toys', noun: 'ball', picOpened: true }, { theme: 'toys', noun: 'doll', picOpened: true },
      { theme: 'toys', noun: 'car', picOpened: true }, { theme: 'toys', noun: 'train', picOpened: true },
      { theme: 'toys', noun: 'kite', picOpened: true }, { theme: 'toys', noun: 'blocks', picOpened: true },
      { theme: 'toys', noun: 'robot', picOpened: true }, { theme: 'toys', noun: 'balloon', picOpened: true },
      { theme: 'toys', noun: 'dinosaur', picOpened: true }, { theme: 'toys', noun: 'boat', picOpened: true },
      // measured OUT by the gate's global 96 px check (Nunito 800 16, real fonts): scooter (it `monopattino`
      // 97, no `sparkesykkel` 99) and crayons (fr `crayons de couleur` 142, nl `kleurpotloden` 108, pt 97)
    ] },
  ],
  face: {
    theme: 'body parts', noun: 'face', picOpened: true,
    anchors: {
      hair: { x: 0.50, y: 0.20, side: 'L' }, nose: { x: 0.50, y: 0.68, side: 'L' },
      eye: { x: 0.655, y: 0.59, side: 'R' }, ear: { x: 0.86, y: 0.64, side: 'R' }, mouth: { x: 0.50, y: 0.84, side: 'R' },
      eyebrow: { x: 0.32, y: 0.47, side: 'L' }, chin: { x: 0.50, y: 0.93, side: 'R' },
    },
  },
  actions: [
    { id: 'swim', cue: { theme: 'activities', noun: 'swimming' }, picOpened: true },       // goggles (object cue)
    { id: 'run', cue: { theme: 'activities', noun: 'running' }, picOpened: true },         // a girl running
    { id: 'skip', cue: { theme: 'activities', noun: 'jumping' }, picOpened: true },        // a girl with a skipping rope
    { id: 'bike', cue: { theme: 'activities', noun: 'biking' }, picOpened: true },         // a boy on a bicycle
    { id: 'read', cue: { theme: 'activities', noun: 'reading' }, picOpened: true },        // a child with a book
    { id: 'soccer', cue: { theme: 'activities', noun: 'soccer' }, picOpened: true },       // a football (the ball)
    { id: 'puzzle', cue: { theme: 'activities', noun: 'puzzle' }, picOpened: true },       // four jigsaw pieces
    { id: 'paint', cue: { theme: 'activities', noun: 'painting' }, picOpened: true },      // a palette with a brush
    { id: 'sing', cue: { theme: 'activities', noun: 'singing' }, picOpened: true },        // a microphone
    { id: 'skate', cue: { theme: 'activities', noun: 'skating' }, picOpened: true },       // an ice skate
    { id: 'ski', cue: { theme: 'activities', noun: 'skiing' }, picOpened: true },          // a pair of skis
    { id: 'writename', cue: { theme: 'classroom', noun: 'pencil' }, picOpened: true },     // a pencil
    { id: 'brushteeth', cue: { theme: 'At the Supermarket', noun: 'toothbrush' }, picOpened: true },   // a toothbrush
  ],
};

module.exports = { ALL_ABOUT_ME, ALL_ABOUT_ME_PICTURES };
