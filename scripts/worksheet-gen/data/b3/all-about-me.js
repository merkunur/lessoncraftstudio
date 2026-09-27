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
    // F1 tile labels, one per option vocabKey (Phase 2, 2026-09-14): each must === displayWord(vocab[key][loc][0], loc)
    // (the gate cross-checks; the spec never reads image-vocabulary.js at render). An option with no label in a
    // locale DROPS from that locale's page (never a vocab fallback); a category under 6 labelled options drops.
    // Colour labels come from data/color-words.js COLOR_WORDS[loc] and are not listed here.
    optionWords: {
      cat: 'cat', dog: 'dog', fish: 'fish', horse: 'horse', rabbit: 'rabbit', duck: 'duck', pig: 'pig', sheep: 'sheep', elephant: 'elephant', giraffe: 'giraffe', penguin: 'penguin', tiger: 'tiger',
      apple: 'apple', banana: 'banana', bread: 'bread', cheese: 'cheese', pizza: 'pizza', carrot: 'carrot', strawberry: 'strawberry', cookie: 'cookie', pasta: 'pasta', milk: 'milk', grapes: 'grapes', cake: 'cake',
      ball: 'ball', doll: 'doll', car: 'car', train: 'train', kite: 'kite', blocks: 'blocks', robot: 'robot', balloon: 'balloon', dinosaur: 'dinosaur', boat: 'boat',
    },
    strings: {
      'K-323': {
        title: 'All About Me',
        instruction: 'Write your name and your age, draw yourself and your family, then draw your three favorite things.',
      },
      // Phase 2 faces (design §6 title patterns; en = US spelling; <= 70 / <= 150; unique in band K)
      'K-342': { title: 'My Favorite Things: Circle and Write', instruction: 'In each row, circle your favorite picture and copy its word onto the line.' },
      'K-343': { title: 'All About My Family: Draw and Count', instruction: 'Draw your family. Then show how many people, brothers, sisters and pets on the ten-frames and write the number.' },
      'K-344': { title: 'This Is Me: Label the Face', instruction: 'Copy each word from the bank onto the line that points to that part of the face. Then draw your own face.' },
      'K-345': { title: 'I Can: Tick What You Can Do', instruction: 'Read each sentence and tick the things you can do. Then write one thing you want to learn.' },
      'K-346': { title: 'My Name: Write, Count and Compare', instruction: 'Write your name with one letter in each box and count the letters. Then do the same for a friend and circle who has more.' },
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
    // `lane` (optional, a fraction of the figure height) pins a lane's TOP where the anchor-centred slot would
    // run the pointer through another feature: the nose lane at the design's y 196 sends its line THROUGH the
    // left ear (measured 10.5 px from the ear's centre); at 0.73 (y 263 of 360) it clears every disc by >= 37 px.
    anchors: {
      hair: { x: 0.50, y: 0.20, side: 'L' }, nose: { x: 0.50, y: 0.68, side: 'L', lane: 0.73 },
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




// >>> LEVEL SET 2026-09-27 — generated by tools/level-set-aam/integrate.js (design.js + the 11 native panels beside it).
// Copies ask NEW questions: favourite sets per copy (sets[0] = the published animal/food/colour) and
// "I can" pages by area of life (domains). levelSetOnly actions never enter the published mixed pool.
Object.assign(ALL_ABOUT_ME_PICTURES, { sets: [["animal","food","color"],["fruit","pet","instrument"],["hobby","treat","vehicle"],["vegetable","bird","clothes"],["sea","bug","breakfast"],["farm","shape","toy"]], domains: {"move":["run","jumprope","bike","swim","soccer","bounce","slide","hike"],"self":["brushteeth","comb","washhands","dress","coat","boots","bed","tidy"],"school":["writename","read","puzzle","paint","cut","glue","draw","backpack"],"play":["sing","drum","guitar","blocks","dice","bake","photo","kite"],"outdoors":["iceskate","ski","fish","tent","water","puddle","swing","umbrella"]} });
ALL_ABOUT_ME_PICTURES.categories.push(...[{"id":"fruit","options":[{"theme":"fruits","noun":"banana","picOpened":true},{"theme":"fruits","noun":"lemon","picOpened":true},{"theme":"fruits","noun":"kiwi","picOpened":true},{"theme":"fruits","noun":"orange","picOpened":true},{"theme":"fruits","noun":"pear","picOpened":true},{"theme":"fruits","noun":"pineapple","picOpened":true},{"theme":"fruits","noun":"watermelon","picOpened":true},{"theme":"fruits","noun":"raspberry","picOpened":true},{"theme":"fruits","noun":"coconut","picOpened":true},{"theme":"fruits","noun":"strawberry","picOpened":true},{"theme":"fruits","noun":"apple","picOpened":true}]},{"id":"vegetable","options":[{"theme":"vegetables","noun":"carrot","picOpened":true},{"theme":"vegetables","noun":"broccoli","picOpened":true},{"theme":"vegetables","noun":"corn","picOpened":true},{"theme":"vegetables","noun":"cucumber","picOpened":true},{"theme":"vegetables","noun":"tomato","picOpened":true},{"theme":"vegetables","noun":"potato","picOpened":true},{"theme":"vegetables","noun":"pumpkin","picOpened":true},{"theme":"vegetables","noun":"eggplant","picOpened":true},{"theme":"vegetables","noun":"lettuce","picOpened":true},{"theme":"vegetables","noun":"onion","picOpened":true},{"theme":"vegetables","noun":"cauliflower","picOpened":true}]},{"id":"pet","options":[{"theme":"pets","noun":"cat","picOpened":true},{"theme":"pets","noun":"dog","picOpened":true},{"theme":"pets","noun":"goldfish","picOpened":true},{"theme":"pets","noun":"hamster","picOpened":true},{"theme":"pets","noun":"rabbit","picOpened":true},{"theme":"pets","noun":"parrot","picOpened":true},{"theme":"pets","noun":"turtle","picOpened":true},{"theme":"pets","noun":"mouse","picOpened":true},{"theme":"pets","noun":"frog","picOpened":true}]},{"id":"instrument","options":[{"theme":"music","noun":"drum","picOpened":true},{"theme":"music","noun":"flute","picOpened":true},{"theme":"music","noun":"guitar","picOpened":true},{"theme":"music","noun":"piano","picOpened":true},{"theme":"music","noun":"trumpet","picOpened":true},{"theme":"music","noun":"violin","picOpened":true},{"theme":"music","noun":"harp","picOpened":true},{"theme":"music","noun":"xylophone","picOpened":true},{"theme":"music","noun":"accordion","picOpened":true},{"theme":"music","noun":"saxophone","picOpened":true}]},{"id":"hobby","options":[{"theme":"activities","noun":"soccer","picOpened":true},{"theme":"activities","noun":"tennis","picOpened":true},{"theme":"activities","noun":"basketball","picOpened":true},{"theme":"activities","noun":"swimming","picOpened":true},{"theme":"activities","noun":"skating","picOpened":true},{"theme":"activities","noun":"biking","picOpened":true},{"theme":"activities","noun":"chess","picOpened":true}]},{"id":"treat","options":[{"theme":"desserts and sweets","noun":"cake","picOpened":true},{"theme":"desserts and sweets","noun":"cookie","picOpened":true},{"theme":"desserts and sweets","noun":"cupcake","picOpened":true},{"theme":"desserts and sweets","noun":"donut","picOpened":true},{"theme":"desserts and sweets","noun":"lollipop","picOpened":true},{"theme":"desserts and sweets","noun":"popsicle","picOpened":true},{"theme":"desserts and sweets","noun":"waffle","picOpened":true},{"theme":"desserts and sweets","noun":"muffin","picOpened":true}]},{"id":"bird","options":[{"theme":"birds","noun":"eagle","picOpened":true},{"theme":"birds","noun":"flamingo","picOpened":true},{"theme":"birds","noun":"owl","picOpened":true},{"theme":"birds","noun":"parrot","picOpened":true},{"theme":"birds","noun":"peacock","picOpened":true},{"theme":"birds","noun":"penguin","picOpened":true},{"theme":"birds","noun":"toucan","picOpened":true},{"theme":"birds","noun":"ostrich","picOpened":true},{"theme":"birds","noun":"pelican","picOpened":true}]},{"id":"bug","options":[{"theme":"insects and bugs","noun":"bee","picOpened":true},{"theme":"insects and bugs","noun":"ant","picOpened":true},{"theme":"insects and bugs","noun":"butterfly","picOpened":true},{"theme":"insects and bugs","noun":"caterpillar","picOpened":true},{"theme":"insects and bugs","noun":"ladybug","picOpened":true},{"theme":"insects and bugs","noun":"dragonfly","picOpened":true},{"theme":"insects and bugs","noun":"snail","picOpened":true},{"theme":"insects and bugs","noun":"spider","picOpened":true},{"theme":"insects and bugs","noun":"worm","picOpened":true}]},{"id":"sea","options":[{"theme":"ocean life","noun":"crab","picOpened":true},{"theme":"ocean life","noun":"dolphin","picOpened":true},{"theme":"ocean life","noun":"octopus","picOpened":true},{"theme":"ocean life","noun":"jellyfish","picOpened":true},{"theme":"ocean life","noun":"whale","picOpened":true},{"theme":"ocean life","noun":"starfish","picOpened":true},{"theme":"ocean life","noun":"shark","picOpened":true},{"theme":"ocean life","noun":"seal","picOpened":true}]},{"id":"vehicle","options":[{"theme":"vehicles","noun":"airplane","picOpened":true},{"theme":"vehicles","noun":"bus","picOpened":true},{"theme":"vehicles","noun":"car","picOpened":true},{"theme":"vehicles","noun":"helicopter","picOpened":true},{"theme":"vehicles","noun":"train","picOpened":true},{"theme":"vehicles","noun":"tractor","picOpened":true},{"theme":"vehicles","noun":"rocket","picOpened":true},{"theme":"vehicles","noun":"motorcycle","picOpened":true},{"theme":"vehicles","noun":"sailboat","picOpened":true},{"theme":"vehicles","noun":"submarine","picOpened":true}]},{"id":"clothes","options":[{"theme":"clothing","noun":"hat","picOpened":true},{"theme":"clothing","noun":"boots","picOpened":true},{"theme":"clothing","noun":"dress","picOpened":true},{"theme":"clothing","noun":"coat","picOpened":true},{"theme":"clothing","noun":"cap","picOpened":true},{"theme":"clothing","noun":"t-shirt","picOpened":true},{"theme":"clothing","noun":"scarf","picOpened":true},{"theme":"clothing","noun":"jeans","picOpened":true},{"theme":"clothing","noun":"pajamas","picOpened":true},{"theme":"clothing","noun":"sweater","picOpened":true},{"theme":"clothing","noun":"skirt","picOpened":true},{"theme":"clothing","noun":"shorts","picOpened":true}]},{"id":"breakfast","options":[{"theme":"breakfast","noun":"cereal","picOpened":true},{"theme":"breakfast","noun":"pancake","picOpened":true},{"theme":"breakfast","noun":"croissant","picOpened":true},{"theme":"breakfast","noun":"bagel","picOpened":true},{"theme":"breakfast","noun":"sausage","picOpened":true},{"theme":"breakfast","noun":"muffin","picOpened":true},{"theme":"breakfast","noun":"juice","picOpened":true}]},{"id":"shape","options":[{"theme":"shapes","noun":"circle","picOpened":true},{"theme":"shapes","noun":"square","picOpened":true},{"theme":"shapes","noun":"triangle","picOpened":true},{"theme":"shapes","noun":"star","picOpened":true},{"theme":"shapes","noun":"heart","picOpened":true},{"theme":"shapes","noun":"diamond","picOpened":true},{"theme":"shapes","noun":"oval","picOpened":true},{"theme":"shapes","noun":"moon","picOpened":true},{"theme":"shapes","noun":"hexagon","picOpened":true},{"theme":"shapes","noun":"rectangle","picOpened":true},{"theme":"shapes","noun":"pentagon","picOpened":true}]},{"id":"farm","options":[{"theme":"farm animals","noun":"cow","picOpened":true},{"theme":"farm animals","noun":"goat","picOpened":true},{"theme":"farm animals","noun":"donkey","picOpened":true},{"theme":"farm animals","noun":"duck","picOpened":true},{"theme":"farm animals","noun":"pig","picOpened":true},{"theme":"farm animals","noun":"sheep","picOpened":true},{"theme":"farm animals","noun":"horse","picOpened":true},{"theme":"farm animals","noun":"rabbit","picOpened":true},{"theme":"farm animals","noun":"turkey","picOpened":true},{"theme":"farm animals","noun":"goose","picOpened":true},{"theme":"farm animals","noun":"llama","picOpened":true}]}]);
ALL_ABOUT_ME_PICTURES.actions.push(...[{"id":"bounce","cue":{"theme":"activities","noun":"basketball"},"picOpened":true,"levelSetOnly":true},{"id":"slide","cue":{"theme":"toys","noun":"slide"},"picOpened":true,"levelSetOnly":true},{"id":"hike","cue":{"theme":"activities","noun":"hiking"},"picOpened":true,"levelSetOnly":true},{"id":"comb","cue":{"theme":"around the house","noun":"comb"},"picOpened":true,"levelSetOnly":true},{"id":"washhands","cue":{"theme":"around the house","noun":"faucet"},"picOpened":true,"levelSetOnly":true},{"id":"dress","cue":{"theme":"clothing","noun":"t-shirt"},"picOpened":true,"levelSetOnly":true},{"id":"coat","cue":{"theme":"clothing","noun":"coat"},"picOpened":true,"levelSetOnly":true},{"id":"boots","cue":{"theme":"clothing","noun":"boots"},"picOpened":true,"levelSetOnly":true},{"id":"bed","cue":{"theme":"around the house","noun":"bed"},"picOpened":true,"levelSetOnly":true},{"id":"tidy","cue":{"theme":"around the house","noun":"broom"},"picOpened":true,"levelSetOnly":true},{"id":"cut","cue":{"theme":"classroom","noun":"scissors"},"picOpened":true,"levelSetOnly":true},{"id":"glue","cue":{"theme":"classroom","noun":"glue"},"picOpened":true,"levelSetOnly":true},{"id":"draw","cue":{"theme":"classroom","noun":"crayon"},"picOpened":true,"levelSetOnly":true},{"id":"backpack","cue":{"theme":"classroom","noun":"backpack"},"picOpened":true,"levelSetOnly":true},{"id":"drum","cue":{"theme":"music","noun":"drum"},"picOpened":true,"levelSetOnly":true},{"id":"guitar","cue":{"theme":"music","noun":"guitar"},"picOpened":true,"levelSetOnly":true},{"id":"blocks","cue":{"theme":"toys","noun":"blocks"},"picOpened":true,"levelSetOnly":true},{"id":"dice","cue":{"theme":"toys","noun":"dice"},"picOpened":true,"levelSetOnly":true},{"id":"bake","cue":{"theme":"kitchen tools","noun":"whisk"},"picOpened":true,"levelSetOnly":true},{"id":"photo","cue":{"theme":"activities","noun":"photography"},"picOpened":true,"levelSetOnly":true},{"id":"kite","cue":{"theme":"toys","noun":"kite"},"picOpened":true,"levelSetOnly":true},{"id":"fish","cue":{"theme":"camping","noun":"fishing_rod"},"picOpened":true,"levelSetOnly":true},{"id":"tent","cue":{"theme":"camping","noun":"tent"},"picOpened":true,"levelSetOnly":true},{"id":"water","cue":{"theme":"around the house","noun":"watering_can"},"picOpened":true,"levelSetOnly":true},{"id":"puddle","cue":{"theme":"weather","noun":"puddle"},"picOpened":true,"levelSetOnly":true},{"id":"swing","cue":{"theme":"toys","noun":"swing"},"picOpened":true,"levelSetOnly":true},{"id":"umbrella","cue":{"theme":"weather","noun":"umbrella"},"picOpened":true,"levelSetOnly":true},{"id":"jumprope","cue":{"theme":"activities","noun":"jumping"},"picOpened":true,"levelSetOnly":true},{"id":"iceskate","cue":{"theme":"activities","noun":"skating"},"picOpened":true,"levelSetOnly":true}]);
Object.assign(ALL_ABOUT_ME.en.labels.favHeading, {"fruit":"My favorite fruit","vegetable":"My favorite vegetable","pet":"My favorite pet","instrument":"My favorite instrument","hobby":"My favorite hobby","treat":"My favorite treat","bird":"My favorite bird","bug":"My favorite bug","sea":"My favorite sea animal","vehicle":"My favorite vehicle","clothes":"My favorite clothes","breakfast":"My favorite breakfast","shape":"My favorite shape","farm":"My favorite farm animal"});
Object.assign(ALL_ABOUT_ME.en.can, {"bounce":"I can bounce a ball","slide":"I can go down a slide","hike":"I can go on a hike","comb":"I can comb my hair","washhands":"I can wash my hands","dress":"I can get dressed","coat":"I can button my coat","boots":"I can put on my boots","bed":"I can make my bed","tidy":"I can sweep the floor","cut":"I can cut with scissors","glue":"I can use glue","draw":"I can color in the lines","backpack":"I can pack my backpack","drum":"I can drum a beat","guitar":"I can play the guitar","blocks":"I can build a tower","dice":"I can play a board game","bake":"I can help bake a cake","photo":"I can take a picture","kite":"I can fly a kite","fish":"I can catch a fish","tent":"I can sleep in a tent","water":"I can water the plants","puddle":"I can jump in puddles","swing":"I can swing by myself","umbrella":"I can open an umbrella","jumprope":"I can jump rope","iceskate":"I can skate"});
Object.assign(ALL_ABOUT_ME.en.optionWords, {"banana":"banana","lemon":"lemon","kiwi":"kiwi","orange":"orange","pear":"pear","pineapple":"pineapple","watermelon":"watermelon","raspberry":"raspberry","coconut":"coconut","strawberry":"strawberry","apple":"apple","carrot":"carrot","broccoli":"broccoli","corn":"corn","cucumber":"cucumber","tomato":"tomato","potato":"potato","pumpkin":"pumpkin","eggplant":"eggplant","lettuce":"lettuce","onion":"onion","cauliflower":"cauliflower","cat":"cat","dog":"dog","goldfish":"goldfish","hamster":"hamster","rabbit":"rabbit","parrot":"parrot","turtle":"turtle","mouse":"mouse","frog":"frog","drum":"drum","flute":"flute","guitar":"guitar","piano":"piano","trumpet":"trumpet","violin":"violin","harp":"harp","xylophone":"xylophone","accordion":"accordion","saxophone":"saxophone","soccer":"soccer","tennis":"tennis","basketball":"basketball","swimming":"swimming","skating":"skating","biking":"biking","chess":"chess","cake":"cake","cookie":"cookie","cupcake":"cupcake","donut":"donut","lollipop":"lollipop","popsicle":"popsicle","waffle":"waffle","muffin":"muffin","eagle":"eagle","flamingo":"flamingo","owl":"owl","peacock":"peacock","penguin":"penguin","toucan":"toucan","ostrich":"ostrich","pelican":"pelican","bee":"bee","ant":"ant","butterfly":"butterfly","caterpillar":"caterpillar","ladybug":"ladybug","dragonfly":"dragonfly","snail":"snail","spider":"spider","worm":"worm","crab":"crab","dolphin":"dolphin","octopus":"octopus","jellyfish":"jellyfish","whale":"whale","starfish":"starfish","shark":"shark","seal":"seal","airplane":"airplane","bus":"bus","car":"car","helicopter":"helicopter","train":"train","tractor":"tractor","rocket":"rocket","motorcycle":"motorcycle","sailboat":"sailboat","submarine":"submarine","hat":"hat","boots":"boots","dress":"dress","coat":"coat","cap":"cap","t-shirt":"t-shirt","scarf":"scarf","jeans":"jeans","pajamas":"pajamas","sweater":"sweater","skirt":"skirt","shorts":"shorts","cereal":"cereal","pancake":"pancake","croissant":"croissant","bagel":"bagel","sausage":"sausage","juice":"juice","circle":"circle","square":"square","triangle":"triangle","star":"star","heart":"heart","diamond":"diamond","oval":"oval","moon":"moon","hexagon":"hexagon","rectangle":"rectangle","pentagon":"pentagon","cow":"cow","goat":"goat","donkey":"donkey","duck":"duck","pig":"pig","sheep":"sheep","horse":"horse","turkey":"turkey","goose":"goose","llama":"llama"});
ALL_ABOUT_ME.en.excludeOptions = [];
// <<< LEVEL SET

module.exports = { ALL_ABOUT_ME, ALL_ABOUT_ME_PICTURES };
