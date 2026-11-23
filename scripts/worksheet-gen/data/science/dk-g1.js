/**
 * dk-g1.js — the bank of the Batch 1 Grade 1 science and health pages (Daily Teaching System Stage D-5, 2026-11-23;
 * factory types/_shared/dk-g1.js, gate qa/verify-dk-g1.js). English only.
 *
 * Every library picture here was OPENED at print size on a contact sheet (lcs-stage-d/batch-1/work/c1..c5.png) before
 * it was placed; colour themes only. What the library cannot show is drawn by the factory in simple shapes (material
 * swatches, cups, a speaker, a tuning fork, a raft, mirrors, windows, the faceless figures of Batch K2), or the page
 * asks the child to draw it. Refused pictures (with why) are listed in REFUSED and gated.
 *
 * The CLOSED items carry their one right answer here and the gate re-derives it from its OWN tables (never from this
 * file): the mirror by its own reflection, the matchings by counting perfect matchings over its own table of every
 * reading a child or teacher could defend, the clues by its own picture facts, the food groups by its own MyPlate table.
 */
'use strict';
const P = (theme, noun) => ({ theme, noun });

/* ---------------------------------------------------------------- sound (G1-626 .. G1-628) */
// the four sound stations; `draw` = drawn by the factory (no library picture shows it)
const SOUND_STATIONS = [
  { id: 'band-box', label: 'rubber bands on a box', draw: 'band-box', moves: 'the rubber bands' },
  { id: 'drum', label: 'a drum with rice on it', pic: P('music', 'drum'), moves: 'the drum top and the rice' },
  { id: 'ruler', label: 'a ruler on a desk', draw: 'ruler-desk', moves: 'the end of the ruler' },
  { id: 'hum', label: 'humming, fingers on my throat', draw: 'hum', moves: 'my throat' },
];
// the three "sound makes things move" tests (G1-627)
// review round 1: every row names WHAT moved (the rice, the water); the speaker row is felt, not seen, so its choice is
// "I felt it shake" / "I did not feel it shake"
const SOUND_TESTS = [
  { id: 'pan-drum', label: 'a pan banged near a drum with rice on it', pics: [P('around the house', 'pan'), P('music', 'drum')], chips: ['the rice moved', 'the rice stayed still'] },
  { id: 'fork-water', label: 'a ringing tuning fork in water', draw: 'fork-water', chips: ['the water moved', 'the water stayed still'] },
  { id: 'speaker', label: 'my hand on a speaker playing music', draw: 'speaker', pics: [P('body parts', 'hand')], chips: ['I felt it shake', 'I did not feel it shake'] },
];
// cup telephone tests (G1-628): the string tight, loose, touching a chair
const PHONE_TESTS = [
  { id: 'tight', label: 'string tight' },
  { id: 'loose', label: 'string loose' },
  { id: 'chair', label: 'string touching a chair', pic: P('furniture', 'chair') },
];
const PHONE_PLAN = [{ id: 'paper-cups', label: 'paper cups', draw: 'cup' }, { id: 'plastic-cups', label: 'plastic cups', draw: 'cup2' }, { id: 'string', label: 'string', draw: 'string' }, { id: 'yarn', label: 'yarn', draw: 'yarn' }];

/* ---------------------------------------------------------------- light (G1-629 .. G1-633) */
// the light test materials (G1-630): drawn swatches (no library picture shows wax paper, plastic wrap, foil, cloth or
// cardboard); the class tests them, so the page holds no answer
const LIGHT_MATERIALS = [
  { id: 'wax-paper', label: 'wax paper' }, { id: 'plastic-wrap', label: 'plastic wrap' }, { id: 'cardboard', label: 'cardboard' },
  { id: 'clear-cup', label: 'clear cup' }, { id: 'cloth', label: 'thick cloth' }, { id: 'foil', label: 'foil' },
];
// the mirror rooms (G1-631): the flashlight shines to the RIGHT; where the star hangs; `mirror` = the way the mirror
// must be turned for the light to reach it (a slash `/` sends rightward light UP the page, a backslash `\` DOWN,
// an upright `|` straight BACK). The gate re-derives the answer by its own reflection.
const MIRROR_ROOMS = [
  { id: 'star-up', star: 'up', mirror: 'slash' },
  { id: 'star-down', star: 'down', mirror: 'backslash' },
  { id: 'star-back', star: 'back', mirror: 'upright' },
];
const MIRROR_TURNS = ['slash', 'backslash', 'upright'];
const STAR = P('christmas', 'star');
// shadow toys (G1-632): toys whose shadows are told apart (the gate measures every pair's mask overlap < 0.72)
const SHADOW_TOYS = [P('toys', 'teddy_bear'), P('toys', 'dinosaur'), P('toys', 'rocket'), P('toys', 'airplane'), P('toys', 'kite'), P('toys', 'train'), P('toys', 'robot'), P('toys', 'car')];
// light-code messages (G1-633)
const CODE_MESSAGES = ['yes', 'no', 'come here'];

/* ---------------------------------------------------------------- sky (G1-634 .. G1-637): drawn bodies only (the
   earth-and-space family uses no library picture) */
const MONTHS = ['September', 'October', 'November', 'December', 'January'];
// review round 1: the class reads the hours of daylight on the 21st of each month (the solstice lands in the December
// bar); whole hours, never computed from sunrise and sunset; the axis starts at 7 so no month in the 48 states has an
// empty bar (Seattle about 8 1/2 hours on December 21)
const DAYLIGHT_HOURS = [7, 8, 9, 10, 11, 12, 13, 14, 15];

/* ---------------------------------------------------------------- animals (G1-638 .. G1-640) */
// G1-638: families the class reads about; the actions are a RECORD (every parent here does them; the page records
// what the book or clip showed). The closed row: which parent never takes care of its babies.
const ANIMAL_FAMILIES = [
  { id: 'robin', pic: P('spring', 'robin'), name: 'robin', baby: 'chicks' },
  { id: 'cat', pic: P('pets', 'cat'), name: 'cat', baby: 'kittens' },
  { id: 'kangaroo', pic: P('zoo animals', 'kangaroo'), name: 'kangaroo', baby: 'joey' },
  { id: 'penguin', pic: P('animals', 'penguin'), name: 'penguin', baby: 'chick' },
];
const PARENT_ACTS = ['feeds', 'carries', 'keeps warm', 'protects'];
const BABY_ACTS = ['calls', 'follows'];
const NO_CARE = { id: 'sea-turtle', pic: P('ocean life', 'sea_turtle'), name: 'sea turtle', cares: false };
// G1-639: animal part -> the invention that copies it. `part` is printed under the animal. The gate counts the
// perfect matchings of every page over its OWN table of every pairing a child or teacher could defend.
const COPY_PAIRS = [
  { id: 'duck', animal: P('animals', 'duck'), part: 'webbed feet', name: 'duck', invention: P('camping', 'oar'), inv: 'paddle' },
  { id: 'toucan', animal: P('birds', 'toucan'), part: 'beak', name: 'toucan', invention: P('kitchen tools', 'tongs'), inv: 'tongs' },
  { id: 'beaver', animal: P('forest creatures', 'beaver'), part: 'front teeth', name: 'beaver', invention: P('tools', 'handsaw'), inv: 'saw' },
  { id: 'whale', animal: P('ocean life', 'whale'), part: 'body shape', name: 'whale', invention: P('vehicles', 'submarine'), inv: 'submarine' },
  { id: 'woodpecker', animal: P('birds 2', 'woodpecker'), part: 'beak', name: 'woodpecker', invention: P('tools', 'hammer'), inv: 'hammer' },
];
// G1-640: parent and young (the young drawn smaller beside its parent); each clue's answer is what the two PICTURES
// show, opened at 260 px: horse and foal both have a dark mane (no color clue: the foal is speckled); sheep and lamb
// both woolly (no color clue: the sheep's face is tan, the lamb's white); the hen white, the chick yellow, both beaked
const PARENT_YOUNG = [
  { id: 'horse', parent: P('farm animals', 'horse'), young: P('farm animals', 'foal'), names: ['horse', 'foal'], clues: { size: 'different', 'has four legs': 'same', 'has a mane': 'same' } },
  { id: 'sheep', parent: P('farm animals', 'sheep'), young: P('farm animals', 'lamb'), names: ['sheep', 'lamb'], clues: { size: 'different', 'has four legs': 'same', 'has wool': 'same' } },
  { id: 'hen', parent: P('farm animals', 'hen'), young: P('farm animals', 'chick'), names: ['hen', 'chick'], clues: { size: 'different', 'has two legs': 'same', color: 'different', 'has a beak': 'same' } },
];

/* ---------------------------------------------------------------- rafts (G1-642, G1-643) */
const RAFT_MATERIALS = [{ id: 'craft-sticks', label: 'craft sticks' }, { id: 'foam-tray', label: 'foam tray' }, { id: 'corks', label: 'corks' }, { id: 'straws', label: 'straws' }, { id: 'tape', label: 'tape' }];

/* ---------------------------------------------------------------- health */
// G1-644: what only a trusted adult may give or use, among everyday foods and drinks
const ASK_FIRST = {
  adult: [
    // review round 1: the lesson's own items (medicine, gummy vitamins that look like candy, a spray cleaner) instead of
    // the iron and the knife (tool safety); the vitamins and the cleaner are DRAWN (no library picture)
    { id: 'medicine', pic: P('hospital', 'medicine'), word: 'medicine' },
    { id: 'vitamins', draw: 'vitamins', word: 'gummy vitamins' },
    { id: 'cleaner', draw: 'spray', word: 'spray cleaner' },
    { id: 'shot', pic: P('hospital', 'syringe'), word: 'a shot' },
  ],
  food: [
    { id: 'apple', pic: P('fruits', 'apple'), word: 'apple' }, { id: 'milk', pic: P('breakfast', 'milk'), word: 'milk' },
    { id: 'water', pic: P('At the Supermarket', 'water'), word: 'water' }, { id: 'bread', pic: P('At the Supermarket', 'bread'), word: 'bread' },
    { id: 'banana', pic: P('fruits', 'banana'), word: 'banana' }, { id: 'carrot', pic: P('vegetables', 'carrot'), word: 'carrot' },
  ],
  line: 'I ask a grown-up first.',
  candyLine: 'Medicine can look like candy. Only a trusted grown-up gives it to you.',
};
// G1-645 / G1-646: MyPlate foods, each in exactly ONE MyPlate group (two-group foods are out: tomato, cucumber, corn,
// beans, peas; butter and ice cream are not MyPlate dairy)
const MYPLATE = {
  groups: ['fruits', 'vegetables', 'grains', 'protein', 'dairy'],
  label: { fruits: 'Fruits', vegetables: 'Vegetables', grains: 'Grains', protein: 'Protein', dairy: 'Dairy' },
  foods: [
    { id: 'apple', pic: P('fruits', 'apple'), g: 'fruits' }, { id: 'banana', pic: P('fruits', 'banana'), g: 'fruits' },
    { id: 'strawberry', pic: P('fruits', 'strawberry'), g: 'fruits' }, { id: 'orange', pic: P('fruits', 'orange'), g: 'fruits' },
    { id: 'pear', pic: P('fruits', 'pear'), g: 'fruits' },
    { id: 'carrot', pic: P('vegetables', 'carrot'), g: 'vegetables' }, { id: 'broccoli', pic: P('vegetables', 'broccoli'), g: 'vegetables' },
    { id: 'lettuce', pic: P('vegetables', 'lettuce'), g: 'vegetables' }, { id: 'celery', pic: P('vegetables', 'celery'), g: 'vegetables' },
    { id: 'bread', pic: P('At the Supermarket', 'bread'), g: 'grains' }, { id: 'cereal', pic: P('breakfast', 'cereal'), g: 'grains' },
    { id: 'toast', pic: P('bakery', 'toast'), g: 'grains' }, { id: 'oatmeal', pic: P('breakfast', 'oatmeal'), g: 'grains' },
    { id: 'egg', pic: P('breakfast', 'boiled_egg'), g: 'protein' }, { id: 'fish', pic: P('At the Supermarket', 'fish'), g: 'protein' },
    { id: 'ham', pic: P('At the Supermarket', 'ham'), g: 'protein' },
    { id: 'milk', pic: P('breakfast', 'milk'), g: 'dairy' }, { id: 'yogurt', pic: P('breakfast', 'yoghurt'), g: 'dairy' },
    { id: 'cheese', pic: P('At the Supermarket', 'cheese'), g: 'dairy' },
  ],
  drinks: [{ id: 'water', pic: P('At the Supermarket', 'water'), word: 'water' }, { id: 'milk', pic: P('breakfast', 'milk'), word: 'milk' }],
  times: [{ id: 'breakfast', label: 'breakfast', h: 7, m: 30 }, { id: 'snack', label: 'snack', h: 10, m: 0 }, { id: 'lunch', label: 'lunch', h: 12, m: 0 }, { id: 'recess', label: 'a drink after recess', h: 1, m: 30 }],
};
// G1-647: the habits (healthy-habits pictograms; never beside library art)
const HABITS = [
  { id: 'brush-teeth', pose: 'brush-teeth', label: 'I brushed my teeth two times.' },
  { id: 'wash-hands', pose: 'wash-hands', label: 'I washed my hands.' },
  { id: 'drink-water', pose: 'drink-water', label: 'I drank water.' },
  { id: 'move-body', pose: 'move-body', label: 'I moved my body.' },
  { id: 'sleep', pose: 'sleep', label: 'I went to bed on time.' },
];
// G1-648: helpers and their names; the gate counts the matchings over its own table of readings
const HELPERS = [
  { id: 'doctor', pic: P('hospital', 'doctor'), name: 'doctor' },
  { id: 'nurse', pic: P('hospital', 'nurse'), name: 'nurse' },
  { id: 'firefighter', pic: P('occupations', 'firefighter'), name: 'firefighter' },
  // review round 1: the library pharmacist reads as a boy in a doctor's coat; the pharmacist is DRAWN as a grown-up behind
  // a pharmacy counter, shelves of medicine behind (the library medicine bottle on the counter)
  { id: 'pharmacist', draw: 'pharmacy', counterPic: P('hospital', 'medicine'), name: 'pharmacist' },
];
// G1-649: whole-body listening
const LISTEN = [
  { id: 'eyes', pic: P('body parts', 'eye'), label: 'My eyes look at the speaker.' },
  { id: 'ears', pic: P('body parts', 'ear'), label: 'My ears listen.' },
  { id: 'mouth', pic: P('body parts', 'lip'), label: 'My mouth is quiet.' },
  { id: 'hands', pic: P('body parts', 'hand'), label: 'My hands are still.' },
  { id: 'feet', pic: P('body parts', 'foot'), label: 'My feet are still.' },
];
// G1-650 / G1-651: drawn step cards (one valid order each, by the factory's model)
const FIRE_STEPS = ['stop', 'drop', 'roll'];
const NO_GO_TELL = ['no', 'go', 'tell'];
const TELL_PLACES = [{ id: 'school', label: 'at school', pic: P('classroom', 'desk') }, { id: 'recess', label: 'at recess', pic: P('activities', 'playground') }, { id: 'home', label: 'at home', pic: P('miscellaneous', 'house') }];
// G1-652: the friendly and the bossy reminder for each scene (the gate's own table says which one a friend listens to)
const FRIEND_SCENES = [
  { id: 'lunch', pic: P('classroom', 'lunchbox'), label: 'before lunch', friendly: 'Let’s wash our hands before lunch!', bossy: 'Wash your hands. Now!' },
  { id: 'shade', pic: P('tree', 'oak'), label: 'a hot day at recess', friendly: 'Come sit with me in the shade!', bossy: 'Get out of the sun!' },
  { id: 'play', pic: P('toys', 'ball'), label: 'a friend sits alone', friendly: 'Do you want to play ball with us?', bossy: 'Stop sitting there. Play!' },
  { id: 'water', pic: P('At the Supermarket', 'water'), label: 'after running', friendly: 'Let’s get a drink of water!', bossy: 'Go drink water. Hurry!' },
];
const HELP_WAYS = [P('classroom', 'lunchbox'), P('tree', 'oak'), P('toys', 'ball'), P('occupations', 'teacher')];

/* ---------------------------------------------------------------- refused pictures (opened, and why) */
const REFUSED = {
  'weather/sun': 'the sun has a face (the earth-and-space family draws its own Sun)', 'space/sun': 'a photo-like sun on a black square',
  'weather/cloud': 'every library cloud has a face', 'weather/cloudy': 'every library cloud has a face', 'beach/cloud': 'every library cloud has a face', 'spring/cloud': 'every library cloud has a face',
  'farm animals/duck': 'drawn as a yellow duckling: no parent and young pair', 'farm animals/duckling': 'looks like the duck picture',
  'occupations/paramedic': 'reads as a child in a helmet', 'body parts/mouth': 'an open mouth (reads as talking, not quiet)',
  'body parts/neck': 'a neck with a necklace: no throat to hum with', 'camping/rope': 'a coiled rope that reads as a broom',
  'kitchen tools/cup': 'a teacup full of a hot drink', 'kitchen tools/bottle': 'a red-filled glass bottle (juice or medicine)',
  'At the Supermarket/juice': 'an orange bottle that reads as juice or medicine', 'At the Supermarket/bagel': 'reads as a donut (a sometimes food)',
  'occupations/pharmacist': 'reads as a boy in a doctor\'s coat', 'around the house/iron': 'tool safety, not the medicine lesson', 'kitchen tools/knife': 'tool safety, not the medicine lesson', 'At the Supermarket/candy': 'candy is neither medicine nor an everyday food',
  'At the Supermarket/shampoo': 'a pump bottle: soap a child may use', 'hospital/thermometer': 'a thermometer: safe for a child with a grown-up (two answers)',
  'hospital/bandage': 'a bandage: a child may put one on (two answers)', 'vegetables/potato': 'reads as bread or a rock',
  'vegetables/green_beans': 'beans: a vegetable and a protein (two groups)', 'At the Supermarket/peas': 'peas: two food groups',
  'farm animals/calf': 'its spots differ in color from the cow (the color clue has two answers)',
  'insects and bugs/worm': 'banded, with a face: reads as a snake', 'forest creatures/spider': 'no web: the web cannot be its part',
};

module.exports = {
  SOUND_STATIONS, SOUND_TESTS, PHONE_TESTS, PHONE_PLAN, LIGHT_MATERIALS, MIRROR_ROOMS, MIRROR_TURNS, STAR, SHADOW_TOYS, CODE_MESSAGES,
  MONTHS, DAYLIGHT_HOURS, ANIMAL_FAMILIES, PARENT_ACTS, BABY_ACTS, NO_CARE, COPY_PAIRS, PARENT_YOUNG, RAFT_MATERIALS,
  ASK_FIRST, MYPLATE, HABITS, HELPERS, LISTEN, FIRE_STEPS, NO_GO_TELL, TELL_PLACES, FRIEND_SCENES, HELP_WAYS, REFUSED,
};
