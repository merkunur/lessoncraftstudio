/**
 * data/b4/cloze.js — the G1-350 `cloze` bank (family key `cloze`; design
 * docs/worksheet-gen/b4-designs/G1-350-cloze.md §5; critic record
 * _work/G1-350-critic.md rulings 11-15, 18-20).
 *
 * EN block HAND-AUTHORED (2026-09-21, G1-350 base build); the ten non-EN blocks
 * are GENERATED later by tools/apply-b4-locale.js from i18n/.draft-b4-<loc>.json
 * into data/b4/locales/cloze.<loc>.json (each native panel REBUILDS its 16
 * frames + 12 plural frames + 6 stories + strings from its own grammar and
 * audits this EN block as a SOURCE, never translates it). `data/` is
 * gitignored — the reviewer force-adds this module.
 *
 * THE RULE THAT LOCKS THE TYPE (design §1): a frame is a whole panel literal
 * with exactly one `{gap}` and NO answer text. It names `noun` (a vocabKey),
 * `form` (`sg` = the vocab singular through displayWord; `pl` = objForms.pl;
 * or an objForms form unique | def | defPl | part | gen | a2), `case` (de),
 * `fits` (EVERY pool noun the panel judges to satisfy the predicate, the answer
 * included), `foil` (F2), `pic` (pinned + OPENED), `predicateKind`. The code
 * READS the answer literal (`answerFor(loc, noun, form)`) from the reviewed b3
 * `objForms` bank / the vocab, prints it in the bank / chips / box count and
 * stamps it; the panel never types a noun form. Exclusivity is data: the
 * composer places a frame only when `bank ∩ fits === {answer}` (mechanical,
 * poisoned) and the panel signs `signedExclusive:true` (semantic). The article
 * before the gap is typed INSIDE the frame literal and checked against the
 * gender code for the declared case (en: `a / an` by ARTICLES.en.keyFor; `the`
 * is free), never generated. Nothing inflects; nothing is substituted but
 * `{name}` (where `nameSlot`) and the rendered gap.
 *
 * Shape:
 *   CLOZE.twins / excludeKeys / strongThemes   GLOBAL (the design's opened-picture
 *              rulings): at most one key per twin group per page on every face;
 *              excludeKeys never appear (around-the-house pictures unreadable at
 *              44 px + `glass` = a glass of red wine); the panels pin pictures
 *              from strongThemes first.
 *   CLOZE[loc] = {
 *     nameSlot:      true|false (false: es pt it fr); names from SENTENCES[loc].names
 *     articleTable:  { a:'a', an:'an', the:'the' } (en) | { nom:{m,f,n}, acc:{…}, dat:{…} } (de) | … | null (fi)
 *     boxWord:       the F1 letter-box PHRASE (in the F1 instruction only)
 *     confusable:    [[a, b]] pool-noun pairs never on one page
 *     agreeingAdjectives: [] (optional; the locale's adjective stop-list before an article)
 *     frames:  16 singular frames {id, noun, form, text, fits, foil, predicateKind, [exclusiveWhy], pic:{theme, noun}, picOpened:true, signedExclusive:true}
 *     plural:  12 plural frames {id, noun, form:'pl', text, clones:null|2|3, fits, predicateKind, pic, picOpened, signedExclusive}
 *     stories: 6 {id, nouns:[k1,k2,k3], forms:['sg','sg','sg'], text:[s1,s2,s3], fits:[[…],[…],[…]], pics:[{theme,noun} x3], picOpened, signedExclusive}
 *     strings: { base, letters, choice, plural, story, match: {title, instruction} }
 *     refuse:  { plural:false }   (da: true — the `singular-plural` head owns the only honest da title)
 *   }
 *
 * EN data rules applied here:
 *   - every `text` carries exactly one {gap}, <= 2 sentences, the gap in the LAST;
 *     gap-removed length <= 48 (base d2 maxChars); stories <= 42 per sentence;
 *   - the answer literal (and the noun's other number) never appears in the text;
 *   - `fits` lists EVERY pool noun (the 133 with a colour picture + objForms) the
 *     predicate admits, the answer first; the composer keeps such nouns off one page;
 *   - a `copula` frame carries `exclusiveWhy`;
 *   - `foil` ∉ fits, same number, a pool noun with a picture + objForms, never the
 *     noun's confusable partner; the frames print `the` (a / an would be checked
 *     against ARTICLES.en.keyFor and EN_AMBIGUOUS);
 *   - >= 12 of the 16 frames are F1-eligible (sg, ^\p{L}+$, 2..12 graphemes) and
 *     >= 10 F2-eligible (<= 40 chars gap-removed, answer <= 9 glyphs, foil);
 *   - every picture pinned here was OPENED at 56 px and 112 px on the build's
 *     contact sheets (scratch G1-350-sheet56.png / -sheet112.png, read by the
 *     builder — _work/G1-350-build.md): `animals`, `farm animals`, `zoo animals`,
 *     `forest creatures`, `birds 2`, `Things That Fly`, `beach`, `vehicles`,
 *     `toys`, `fruits` pins only (the twelve strong themes); no `around the
 *     house` picture is pinned;
 *   - names: {name} where used; the same name inside one story (one rng.pick);
 *   - strings.base === the spec's i18n.en (the validator asserts it); titles <= 70,
 *     no "worksheet", never "with answers", no free claim; "Fill in the Blank"
 *     singular in every title; "cloze" never in a title; F1's instruction is the
 *     only one carrying `boxWord`.
 */
'use strict';

const CLOZE = {
  // ---- GLOBAL (design §5; opened-picture rulings, every face, every locale)
  twins: [
    ['jaguar', 'leopard'], ['cat', 'tiger'], ['swan', 'seagull'], ['apple', 'cherry', 'plum', 'pomegranate'],
    ['orange', 'clementine', 'grapefruit', 'peach', 'nectarine', 'apricot'], ['lemon', 'lime'], ['blueberry', 'blackberry'],
    ['sofa', 'couch'], ['fridge', 'refrigerator'], ['oven', 'stove'], ['carpet', 'rug'], ['pen', 'pencil'], ['clock', 'alarm_clock'],
    ['lamp', 'floor_lamp'], ['pot', 'pan'], ['cup', 'glass'], ['closet', 'wardrobe', 'cabinet', 'dresser', 'nightstand'],
    ['lawn_mower', 'vacuum_cleaner'], ['door', 'gate'],
  ],
  excludeKeys: ['hose', 'light_switch', 'outlet', 'picture_frame', 'kitchen', 'toothpaste', 'shampoo', 'comb', 'brush', 'glass'],
  strongThemes: ['animals', 'zoo animals', 'farm animals', 'vehicles', 'toys', 'fruits', 'At the Supermarket', 'Things That Fly',
    'forest creatures', 'beach', 'birds 2', 'tree'],

  en: {
    nameSlot: true,
    articleTable: { a: 'a', an: 'an', the: 'the' },
    boxWord: 'one letter in each box',
    confusable: [['duck', 'goose'], ['hen', 'chicken'], ['bus', 'van'], ['boat', 'sailboat']],
    agreeingAdjectives: [],

    // ---- 16 singular frames (base, F1, F2, F5). `fits` = every pool noun the predicate admits, the answer first.
    frames: [
      { id: 'cow-milk', noun: 'cow', form: 'sg', text: 'The {gap} gives us milk.', fits: ['cow', 'goat'], foil: 'horse',
        predicateKind: 'verb', pic: { theme: 'farm animals', noun: 'cow' }, picOpened: true, signedExclusive: true },
      { id: 'pig-mud', noun: 'pig', form: 'sg', text: 'The {gap} rolls in the mud and says oink.', fits: ['pig'], foil: 'cow',
        predicateKind: 'verb', pic: { theme: 'farm animals', noun: 'pig' }, picOpened: true, signedExclusive: true },
      { id: 'rooster-crow', noun: 'rooster', form: 'sg', text: 'The {gap} crows early in the morning.', fits: ['rooster', 'chicken'], foil: 'hen',
        predicateKind: 'verb', pic: { theme: 'birds 2', noun: 'rooster' }, picOpened: true, signedExclusive: true },
      { id: 'owl-hoot', noun: 'owl', form: 'sg', text: 'The {gap} hoots in the tree at night.', fits: ['owl'], foil: 'duck',
        predicateKind: 'verb', pic: { theme: 'forest creatures', noun: 'owl' }, picOpened: true, signedExclusive: true },
      { id: 'bee-honey', noun: 'bee', form: 'sg', text: 'The {gap} makes honey in the hive.', fits: ['bee'], foil: 'bat',
        predicateKind: 'verb', pic: { theme: 'Things That Fly', noun: 'bee' }, picOpened: true, signedExclusive: true },
      { id: 'giraffe-neck', noun: 'giraffe', form: 'sg', text: 'The {gap} has a very long neck.', fits: ['giraffe', 'swan'], foil: 'zebra',
        predicateKind: 'verb', pic: { theme: 'zoo animals', noun: 'giraffe' }, picOpened: true, signedExclusive: true },
      { id: 'elephant-trunk', noun: 'elephant', form: 'sg', text: 'The {gap} sprays water with its trunk.', fits: ['elephant'], foil: 'rhinoceros',
        predicateKind: 'verb', pic: { theme: 'animals', noun: 'elephant' }, picOpened: true, signedExclusive: true },
      { id: 'kangaroo-pouch', noun: 'kangaroo', form: 'sg', text: 'The {gap} carries its baby in a pouch.', fits: ['kangaroo', 'koala'], foil: 'monkey',
        predicateKind: 'verb', pic: { theme: 'zoo animals', noun: 'kangaroo' }, picOpened: true, signedExclusive: true },
      { id: 'penguin-ice', noun: 'penguin', form: 'sg', text: 'The {gap} slides on its belly on the ice.', fits: ['penguin', 'seal'], foil: 'duck',
        predicateKind: 'verb', pic: { theme: 'birds 2', noun: 'penguin' }, picOpened: true, signedExclusive: true },
      { id: 'zebra-stripes', noun: 'zebra', form: 'sg', text: 'The {gap} has black and white stripes.', fits: ['zebra'], foil: 'giraffe',
        predicateKind: 'verb', pic: { theme: 'animals', noun: 'zebra' }, picOpened: true, signedExclusive: true },
      { id: 'woodpecker-tree', noun: 'woodpecker', form: 'sg', text: 'The {gap} pecks holes in the tree.', fits: ['woodpecker'], foil: 'owl',
        predicateKind: 'verb', pic: { theme: 'forest creatures', noun: 'woodpecker' }, picOpened: true, signedExclusive: true },
      { id: 'turtle-shell', noun: 'turtle', form: 'sg', text: 'The {gap} hides inside its hard shell.', fits: ['turtle'], foil: 'rabbit',
        predicateKind: 'verb', pic: { theme: 'beach', noun: 'turtle' }, picOpened: true, signedExclusive: true },
      { id: 'rabbit-carrot', noun: 'rabbit', form: 'sg', text: 'The {gap} hops and nibbles a carrot.', fits: ['rabbit'], foil: 'fox',
        predicateKind: 'verb', pic: { theme: 'animals', noun: 'rabbit' }, picOpened: true, signedExclusive: true },
      { id: 'tractor-plow', noun: 'tractor', form: 'sg', text: 'The {gap} plows the field on the farm.', fits: ['tractor'], foil: 'truck',
        predicateKind: 'verb', pic: { theme: 'vehicles', noun: 'tractor' }, picOpened: true, signedExclusive: true },
      { id: 'helicopter-blades', noun: 'helicopter', form: 'sg', text: 'The {gap} has spinning blades on top.', fits: ['helicopter'], foil: 'airplane',
        predicateKind: 'verb', pic: { theme: 'Things That Fly', noun: 'helicopter' }, picOpened: true, signedExclusive: true },
      { id: 'sailboat-lake', noun: 'sailboat', form: 'sg', text: 'The {gap} sails across the lake.', fits: ['sailboat', 'boat', 'ship', 'yacht'], foil: 'canoe',
        predicateKind: 'verb', pic: { theme: 'beach', noun: 'sailboat' }, picOpened: true, signedExclusive: true },
      { id: 'train-tracks', noun: 'train', form: 'sg', text: 'The {gap} rolls along the railway tracks.', fits: ['train', 'subway'], foil: 'bus',
        predicateKind: 'verb', pic: { theme: 'vehicles', noun: 'train' }, picOpened: true, signedExclusive: true },
      { id: 'kite-wind', noun: 'kite', form: 'sg', text: '{name} flies the {gap} on a windy day.', fits: ['kite'], foil: 'ball',
        predicateKind: 'verb', pic: { theme: 'toys', noun: 'kite' }, picOpened: true, signedExclusive: true },
    ],

    // ---- 12 plural frames (F3). The number cue is the clone count; `clones` names it only when the text names a number.
    plural: [
      { id: 'cows-barn', noun: 'cow', form: 'pl', text: 'Three {gap} sleep in the barn.', clones: 3, fits: ['cow', 'horse', 'pig', 'goat', 'donkey', 'calf', 'bull', 'ox', 'foal', 'lamb', 'llama'],
        predicateKind: 'verb', pic: { theme: 'farm animals', noun: 'cow' }, picOpened: true, signedExclusive: true },
      { id: 'bees-flowers', noun: 'bee', form: 'pl', text: 'The {gap} buzz around the flowers.', clones: null, fits: ['bee'],
        predicateKind: 'verb', pic: { theme: 'forest creatures', noun: 'bee' }, picOpened: true, signedExclusive: true },
      { id: 'ducks-pond', noun: 'duck', form: 'pl', text: 'The {gap} quack on the pond.', clones: null, fits: ['duck', 'duckling'],
        predicateKind: 'verb', pic: { theme: 'farm animals', noun: 'duck' }, picOpened: true, signedExclusive: true },
      { id: 'horses-gallop', noun: 'horse', form: 'pl', text: 'Two {gap} gallop across the field.', clones: 2, fits: ['horse', 'foal', 'zebra', 'donkey'],
        predicateKind: 'verb', pic: { theme: 'animals', noun: 'horse' }, picOpened: true, signedExclusive: true },
      { id: 'penguins-waddle', noun: 'penguin', form: 'pl', text: 'The {gap} waddle across the ice.', clones: null, fits: ['penguin', 'duck', 'goose'],
        predicateKind: 'verb', pic: { theme: 'animals', noun: 'penguin' }, picOpened: true, signedExclusive: true },
      { id: 'bats-cave', noun: 'bat', form: 'pl', text: 'The {gap} hang upside down in the cave.', clones: null, fits: ['bat'],
        predicateKind: 'verb', pic: { theme: 'Things That Fly', noun: 'bat' }, picOpened: true, signedExclusive: true },
      { id: 'monkeys-swing', noun: 'monkey', form: 'pl', text: 'The {gap} swing from tree to tree.', clones: null, fits: ['monkey', 'chimpanzee', 'orangutan', 'gorilla', 'lemur'],
        predicateKind: 'verb', pic: { theme: 'zoo animals', noun: 'monkey' }, picOpened: true, signedExclusive: true },
      { id: 'blueberries-blue', noun: 'blueberry', form: 'pl', text: 'The {gap} are small, round and blue.', clones: null, fits: ['blueberry'],
        predicateKind: 'copula', exclusiveWhy: 'the only blue fruit in the pool; blackberry is black and a twin (never on the same page)',
        pic: { theme: 'fruits', noun: 'blueberry' }, picOpened: true, signedExclusive: true },
      { id: 'airplanes-runway', noun: 'airplane', form: 'pl', text: 'Two {gap} land on the runway.', clones: 2, fits: ['airplane', 'jet'],
        predicateKind: 'verb', pic: { theme: 'vehicles', noun: 'airplane' }, picOpened: true, signedExclusive: true },
      { id: 'lions-roar', noun: 'lion', form: 'pl', text: 'The {gap} roar loudly in the grass.', clones: null, fits: ['lion', 'tiger', 'jaguar', 'leopard'],
        predicateKind: 'verb', pic: { theme: 'zoo animals', noun: 'lion' }, picOpened: true, signedExclusive: true },
      { id: 'hens-seeds', noun: 'hen', form: 'pl', text: 'The {gap} peck at seeds in the yard.', clones: null, fits: ['hen', 'chicken', 'rooster', 'chick', 'turkey'],
        predicateKind: 'verb', pic: { theme: 'farm animals', noun: 'hen' }, picOpened: true, signedExclusive: true },
      { id: 'balls-hill', noun: 'ball', form: 'pl', text: 'Three {gap} roll down the hill.', clones: 3, fits: ['ball'],
        predicateKind: 'verb', pic: { theme: 'toys', noun: 'ball' }, picOpened: true, signedExclusive: true },
    ],

    // ---- 6 stories (F4): three sentences, one {gap} each, 18 nouns pairwise distinct, every fits disjoint from the other stories' nouns.
    stories: [
      { id: 'farm-morning', nouns: ['rooster', 'cow', 'tractor'], forms: ['sg', 'sg', 'sg'],
        text: ['Early in the morning the {gap} crows.', 'Then {name} milks the {gap}.', 'Then {name} drives the {gap} to the field.'],
        fits: [['rooster'], ['cow', 'goat'], ['tractor']],
        pics: [{ theme: 'farm animals', noun: 'rooster' }, { theme: 'farm animals', noun: 'cow' }, { theme: 'vehicles', noun: 'tractor' }], picOpened: true, signedExclusive: true },
      { id: 'pond-day', nouns: ['duck', 'turtle', 'dog'], forms: ['sg', 'sg', 'sg'],
        text: ['The {gap} quacks on the pond.', 'The {gap} sleeps on a rock in the sun.', 'Then a {gap} barks and wags its tail.'],
        fits: [['duck'], ['turtle', 'iguana', 'seal'], ['dog']],
        pics: [{ theme: 'farm animals', noun: 'duck' }, { theme: 'animals', noun: 'turtle' }, { theme: 'animals', noun: 'dog' }], picOpened: true, signedExclusive: true },
      { id: 'zoo-visit', nouns: ['elephant', 'giraffe', 'monkey'], forms: ['sg', 'sg', 'sg'],
        text: ['At the zoo the {gap} sprays water.', 'The {gap} eats leaves from a tall tree.', 'The {gap} swings from branch to branch.'],
        fits: [['elephant'], ['giraffe'], ['monkey', 'chimpanzee', 'orangutan', 'gorilla', 'lemur']],
        pics: [{ theme: 'zoo animals', noun: 'elephant' }, { theme: 'zoo animals', noun: 'giraffe' }, { theme: 'zoo animals', noun: 'monkey' }], picOpened: true, signedExclusive: true },
      { id: 'sky-day', nouns: ['airplane', 'rocket', 'kite'], forms: ['sg', 'sg', 'sg'],
        text: ['The {gap} flies over the clouds.', 'The {gap} blasts off into space.', '{name} flies the {gap} on the hill.'],
        fits: [['airplane', 'jet'], ['rocket'], ['kite']],
        pics: [{ theme: 'vehicles', noun: 'airplane' }, { theme: 'vehicles', noun: 'rocket' }, { theme: 'toys', noun: 'kite' }], picOpened: true, signedExclusive: true },
      { id: 'beach-day', nouns: ['dolphin', 'seagull', 'sailboat'], forms: ['sg', 'sg', 'sg'],
        text: ['The {gap} jumps out of the waves.', 'The {gap} squawks over the sand.', 'The {gap} sails away with the wind.'],
        fits: [['dolphin', 'whale'], ['seagull'], ['sailboat', 'boat', 'ship', 'yacht']],
        pics: [{ theme: 'beach', noun: 'dolphin' }, { theme: 'beach', noun: 'seagull' }, { theme: 'beach', noun: 'sailboat' }], picOpened: true, signedExclusive: true },
      { id: 'forest-night', nouns: ['owl', 'fox', 'rabbit'], forms: ['sg', 'sg', 'sg'],
        text: ['At night the {gap} hoots in the oak.', 'The {gap} sneaks out of its den.', 'The {gap} nibbles a carrot in the garden.'],
        fits: [['owl'], ['fox', 'wolf', 'bear'], ['rabbit']],
        pics: [{ theme: 'forest creatures', noun: 'owl' }, { theme: 'forest creatures', noun: 'fox' }, { theme: 'forest creatures', noun: 'rabbit' }], picOpened: true, signedExclusive: true },
    ],

    strings: {
      base: { title: 'Fill in the Blank Sentences', instruction: 'Look at the picture. Find the word that fits the sentence in the word bank and write it in the box.' },
      letters: { title: 'Fill in the Blank: Letter Boxes', instruction: 'Look at the picture. Write the missing word in the boxes. One letter in each box.' },
      choice: { title: 'Fill in the Blank: Choose the Word', instruction: 'Look at the picture and read the sentence. Circle the word that fits and write it in the box.' },
      plural: { title: 'Fill in the Blank: Plural Nouns', instruction: 'Look at the pictures. There is more than one. Write the word for more than one in the box.' },
      story: { title: 'Fill in the Blank Story', instruction: 'Read the whole story. The three pictures show the missing words. Write each word from the bank in its box.' },
      match: { title: 'Match the Sentence to the Picture', instruction: 'Read each sentence. Which picture fills the gap? Draw a line from the sentence to that picture.' },
    },
    refuse: { plural: false },
  },
};

module.exports = { CLOZE };
