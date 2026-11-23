/**
 * dk-kinder.js — the banks of the Batch K Kindergarten science and health pages (Daily Teaching System, Stage D-5,
 * 2026-11-23; factory types/_shared/dk-kinder.js, gate qa/verify-dk-kinder.js). English only.
 *
 * Every picture is a COLOUR library picture (cache/themes-512), opened on a contact sheet at print size before it was
 * listed. A picture is { theme, noun }. Pictures that were looked at and refused are listed with why (REFUSED), so the
 * next reader does not try them again.
 *
 * ONE RIGHT ANSWER is held by the facts here, never by luck: each closed item lists everything a Kindergarten child or
 * teacher could defend (`eats` = every food on the list that animal really eats; `safe` = the one safe choice of a row,
 * and every other choice of that row is unsafe in THAT weather), and the factory draws only rows whose right set is the
 * one intended. A retired item (`retired: true`, the science-data mechanism) is never drawn.
 */
'use strict';

const P = (theme, noun) => ({ theme, noun });

/* ------------------------------------------------------------ en-K-003 what a body needs (K-687) */
// needs: food, water, air (air is a drawn card: no library picture shows air). wants: things that are nice to have.
const BODY_NEEDS = {
  food: [
    { id: 'apple', pic: P('fruits', 'apple'), word: 'apple' },
    { id: 'bread', pic: P('At the Supermarket', 'bread'), word: 'bread' },
    { id: 'banana', pic: P('fruits', 'banana'), word: 'banana' },
    { id: 'carrot', pic: P('vegetables', 'carrot'), word: 'carrot' },
  ],
  water: { id: 'water', pic: P('At the Supermarket', 'water'), word: 'water' },
  air: { id: 'air', drawn: 'air', word: 'air' },
  wants: [
    { id: 'ball', pic: P('toys', 'ball'), word: 'ball' },
    { id: 'tv', pic: P('around the house', 'television'), word: 'TV' },
    { id: 'teddy', pic: P('toys', 'teddy_bear'), word: 'teddy bear' },
    { id: 'bike', pic: P('toys', 'bicycle'), word: 'bike' },
    { id: 'doll', pic: P('toys', 'doll'), word: 'doll' },
    { id: 'blocks', pic: P('toys', 'blocks'), word: 'blocks' },
  ],
  REFUSED: {
    'body parts/nose': 'reads as a nose, not as air',
    'activities/hiking': 'a hike: a child can defend it as a want',
    'toys/kite': 'a want that looks like wind: never on the page beside the air card',
    'toys/balloon': 'full of air: two answers',
    'kitchen tools/glass': 'an EMPTY glass, not water',
    'around the house/glass': 'a wine glass',
    'breakfast/milk': 'a drink a child can call a want',
    'clothing/shirt, furniture/bed, miscellaneous/house': 'needs in the family sense (K-212): two answers here',
  },
};

/* ------------------------------------------------------------ en-K-009 storm ready (K-690) */
// each row: the weather picture, ONE safe choice, and wrong choices that are unsafe or useless in THAT weather.
// The house (go indoors) is safe in EVERY bad weather, so it stands only in the thunderstorm row; a warm thing only in
// the snow row; water and shade only in the hot row (a beach umbrella is shade: it never stands beside the water).
const STORM_ROWS = [
  { id: 'thunder', weather: P('weather', 'thunderstorm'), word: 'thunderstorm', safe: { id: 'indoors', pic: P('miscellaneous', 'house') },
    wrong: [{ id: 'pool', pic: P('summer', 'pool') }, { id: 'playground', pic: P('activities', 'playground') }, { id: 'tree', pic: P('tree', 'oak') }] },
  { id: 'snow', weather: P('weather', 'snowflake'), word: 'snowstorm', safe: { id: 'coat', pic: P('winter', 'coat') },
    wrong: [{ id: 'tshirt', pic: P('clothing', 't-shirt') }, { id: 'shorts', pic: P('summer', 'shorts') }, { id: 'flipflops', pic: P('summer', 'flip-flops') }] },
  // review round 1 (2026-11-23): the plain smiling sun reads "sunny", and on a sunny FREEZING day a coat is right: the
  // hot row shows the sun AND a thermometer drawn full to the top (thermo: the thermometer primitive), with the word "hot"
  { id: 'hot', weather: P('weather', 'hot'), thermo: true, word: 'hot', safe: { id: 'water', pic: P('At the Supermarket', 'water') },
    wrong: [{ id: 'coat', pic: P('winter', 'coat') }, { id: 'mittens', pic: P('winter', 'mittens') }, { id: 'winterhat', pic: P('winter', 'hat') }] },
  { id: 'rain', weather: P('weather', 'rainy'), word: 'rain', safe: { id: 'umbrella', pic: P('accessories', 'umbrella') },
    // the rain row's wrong choices are things for a SUNNY day (a swimsuit and flip-flops were refused: a child can defend
    // them in the rain, "they can get wet")
    wrong: [{ id: 'sunglasses', pic: P('weather', 'sunglasses') }, { id: 'sunscreen', pic: P('beach', 'sunscreen') }, { id: 'fan', pic: P('around the house', 'fan') }] },
];
/* ------------------------------------------------------------ en-K-007 rain gauge (K-689) */
// review round 1: a rain picture beside every day (weather/rainy: a cloud WITHOUT a face, with falling drops)
const RAIN_CUE = P('weather', 'rainy');

const STORM_REFUSED = {
  tornado: 'no library picture of a tornado, a siren or a safe room: the tornado drill is practised aloud, never drawn',
  'weather/cloud, spring/cloud': 'every library cloud has a face',
};

/* ------------------------------------------------------------ en-K-011 what animals eat (K-691) */
// FOODS: the food pictures. EATS: every food on this list the animal really eats (a K child or teacher could defend);
// right = the food(s) the row is built on; the row's other choices come from `never` (foods it never eats).
const FOODS = {
  grass: P('spring', 'grass'), leaf: P('spring', 'leaf'), carrot: P('vegetables', 'carrot'),
  meat: P('At the Supermarket', 'ham'), fish: P('animals', 'fish'),
  bug: P('forest creatures', 'grasshopper'), cricket: P('insects and bugs', 'cricket'), caterpillar: P('insects and bugs', 'caterpillar'), berries: P('fruits', 'raspberry'),
};
// REFUSED (review round 1): insects and bugs/worm, forest creatures/earthworm and spring/worm are all banded with a face and
// read as a SNAKE to a five-year-old; camping/bear (no food is safely wrong for a bear); no raw meat picture exists, so the
// lion's meat stays At the Supermarket/ham (the teacher says "meat")
const ANIMAL_FOOD = [
  { id: 'rabbit', pic: P('forest creatures', 'rabbit'), eats: ['grass', 'leaf', 'carrot', 'berries'], right: [['carrot'], ['grass'], ['leaf']], never: ['meat', 'fish', 'bug', 'cricket', 'caterpillar'], kind: 'plant' },
  { id: 'cow', pic: P('farm animals', 'cow'), eats: ['grass', 'leaf', 'carrot'], right: [['grass']], never: ['meat', 'fish', 'bug', 'cricket', 'caterpillar'], kind: 'plant' },
  { id: 'lion', pic: P('zoo animals', 'lion'), eats: ['meat'], right: [['meat']], never: ['grass', 'leaf', 'carrot', 'berries'], kind: 'meat' },
  { id: 'frog', pic: P('forest creatures', 'frog'), eats: ['bug', 'cricket', 'caterpillar'], right: [['bug'], ['cricket']], never: ['grass', 'leaf', 'carrot', 'berries'], kind: 'meat' },
  // eats both: one plant food and one animal food are right. The bear is DROPPED (review round 1): bears eat grass,
  // leaves, roots and garden carrots, berries, bugs, fish and meat, so no food here is safely wrong for a bear
  { id: 'robin', pic: P('birds 2', 'robin'), eats: ['caterpillar', 'bug', 'cricket', 'berries'], right: [['caterpillar', 'berries']], never: ['fish', 'meat', 'carrot'], kind: 'both' },
];

/* ------------------------------------------------------------ en-K-012 a home for a frog (K-692) */
// what a frog needs: water, food (bugs, worms) and a place to hide (a log, a rock, tall grass). What it does not need here.
const FROG_HOME = {
  animal: P('forest creatures', 'frog'),
  fits: [
    { id: 'water', pic: P('weather', 'puddle'), need: 'water' },   // a small pond (camping/lake read as "mountains")
    { id: 'bug', pic: P('forest creatures', 'grasshopper'), need: 'food' },
    { id: 'cricket', pic: P('insects and bugs', 'cricket'), need: 'food' },   // the banded worm read as a snake
    { id: 'log', pic: P('camping', 'log'), need: 'home' },
    { id: 'rock', pic: P('camping', 'rock'), need: 'home' },
    { id: 'grass', pic: P('spring', 'grass'), need: 'home' },
  ],
  misfits: [
    { id: 'acorn', pic: P('miscellaneous', 'acorn') },
    { id: 'carrot', pic: P('vegetables', 'carrot') },
    { id: 'nest', pic: P('spring', 'nest') },
    { id: 'honey', pic: P('breakfast', 'honey') },
  ],
};

/* ------------------------------------------------------------ en-K-013 animals change the land (K-693) */
// before (drawn scenery) -> after (the drawn animal home, primitives/animal-home.js) -> the animal that made it.
const LAND_CHANGES = [
  // noExtraWith: the animals that may NOT be the extra animal on a page that shows this change (one-directional)
  { id: 'anthill', before: 'bare-ground', home: 'anthill', animal: P('insects and bugs', 'ant'), noExtraWith: ['burrow'] },
  { id: 'nest', before: 'bare-branch', home: 'nest', animal: P('birds 2', 'robin') },
  { id: 'lodge', before: 'stream', home: 'lodge', animal: P('forest creatures', 'beaver') },
  // review round 1: the habitats burrow (a narrow tunnel down to a chamber) and the anthill both show tunnels, so a child
  // could match the burrow to the ant. The rabbit's change is drawn here as a BIG round hole at ground level with dug-out
  // dirt (dk-kinder.js rabbitHole), and the ant is never the extra animal on a page that shows it (noExtraWith).
  // Review round 2: the beaver picture (upright, buck teeth, no flat paddle tail) reads to a US Kindergartner as a
  // GROUNDHOG, and groundhogs dig holes: the beaver is never the extra beside the hole either
  { id: 'burrow', before: 'lawn', home: 'rabbit-hole', animal: P('forest creatures', 'rabbit'), noExtraWith: ['anthill', 'lodge'] },
];

/* ------------------------------------------------------------ en-K-014 push or pull (K-694) */
// an ACTION card = a person (the road-safety walker) + a thing + the arrow the thing moves along. PUSH: the person walks
// BEHIND the thing, hands on it, and the thing moves on in front of them. PULL: the person walks IN FRONT, a rope from the
// person's hand to the thing, and the thing follows behind. The drawing decides the answer, and each thing is one people
// move that way (a shopping cart and a push mower are pushed; a sled, a sleigh, a toy truck on a string and a log on a
// rope are pulled), so the drawing and the child's own experience agree. REFUSED: a door, a drawer, a swing, a wagon
// handle seen from the side and a kite (each is pushed AND pulled, or has no library picture).
const PUSH_PULL = [
  { id: 'cart', pic: P('At the Supermarket', 'cart'), act: 'push' },
  { id: 'mower', pic: P('around the house', 'lawn_mower'), act: 'push' },
  { id: 'ball', pic: P('toys', 'ball'), act: 'push' },
  { id: 'train', pic: P('toys', 'train'), act: 'push' },
  { id: 'sled', pic: P('winter', 'sled'), act: 'pull' },
  { id: 'truck', pic: P('toys', 'truck'), act: 'pull' },
  { id: 'sleigh', pic: P('christmas', 'sleigh'), act: 'pull' },
  { id: 'log', pic: P('camping', 'log'), act: 'pull' },
];

/* ------------------------------------------------------------ en-K-016 change its direction (K-696) */
// a top view: the ball rolls RIGHT and meets a thing. right = where it goes after the push, wrong = a way it cannot go.
const DIRECTION = [
  { id: 'wall', obstacle: 'wall', right: 'back', wrong: 'up' },
  { id: 'hand', obstacle: 'hand', right: 'back', wrong: 'on' },
  { id: 'slant-up', obstacle: 'slant-up', right: 'up', wrong: 'back' },
  { id: 'slant-down', obstacle: 'slant-down', right: 'down', wrong: 'on' },
];

/* ------------------------------------------------------------ boats (K-699 .. K-701) */
const BOAT = {
  bear: P('toys', 'teddy_bear'),
  // what the class might test for a boat (the class circles what floated: a record); kitchen tools/bottle (a red glass
  // sauce bottle) and kitchen tools/lid (reads as a cake dome) were opened and refused
  // review round 1: the china teacup (full of coffee), the full water bottle and the china plate are no boat materials a
  // class tests; the library has no foil, tray, craft sticks or empty plastic cup, so those are draw-another boxes
  materials: [P('kitchen tools', 'sponge'), P('classroom', 'paper')],
  drawBoxes: 3,
  labels: ['sides', 'flat', 'tall'],
};

/* ------------------------------------------------------------ en-K-028 sun or shade (K-703) */
const SUN_SHADE = {
  sun: P('weather', 'sun'), shade: P('tree', 'oak'),
  things: [
    { id: 'water', pic: P('At the Supermarket', 'water'), cup: true },
    { id: 'rock', pic: P('camping', 'rock') },
    { id: 'sand', pic: P('toys', 'bucket') },   // review round 1: a pail of sand (the bare summer/sand pile read as dirt or cereal)
    { id: 'ball', pic: P('toys', 'ball') },
  ],
  REFUSED: { 'winter/ice': 'an ice floe in water, not an ice cube (no ice-cube picture exists)' },
};

/* ------------------------------------------------------------ en-K-029 shade for an ice cube (K-704) */
// review round 1: the cup (a teacup full of a HOT drink) is gone; cloth and craft sticks go in the draw-another boxes
const SHADE_MATERIALS = [P('classroom', 'paper'), P('kitchen tools', 'plate'), P('accessories', 'umbrella'), P('spring', 'leaf')];

/* ------------------------------------------------------------ health en-K-002 I can (K-705) */
const HELPERS = [
  { id: 'teacher', pic: P('occupations', 'teacher') },
  { id: 'friend', pic: P('classroom', 'student') },
  { id: 'doctor', pic: P('occupations', 'doctor') },
];

/* ------------------------------------------------------------ health en-K-005 sleep and play (K-706) */
// the bedtime chain: each card's drawn action forces the next (a bath comes before pajamas; pajamas before bed).
// Review round 1: the two EMPTY bed cards (bed + book "story", bed + moon "asleep") had no forced order (the moon reads as
// "nighttime", which starts before the bath), and the library has NO picture of a child in bed, asleep or being read to
// (searched: crib, sleeping bag, tired face, couch). So the strip is bath -> pajamas -> bed at every level: one order.
// Brushing teeth is NOT a card: it fits before or after the bath and the pajamas (three valid orders, refused).
const BEDTIME = [
  { id: 'bath', pics: [P('around the house', 'bathtub')] },
  { id: 'pajamas', pics: [P('clothing', 'pajamas')] },
  { id: 'bed', pics: [P('around the house', 'bed')] },
];
const BEDTIME_MOON = P('space', 'moon');   // the window on the level-3 "me asleep" box
const BEDTIME_REFUSED = {
  teeth: 'brushing teeth fits before the bath, between bath and pajamas, or after them: three valid orders',
  'story / asleep': 'two empty-bed cards (a book or the moon on the bed) have no forced order; no child-in-bed art exists',
};
// review round 1: the empty bench reads as a place to climb, and the TV set is an object (and children dance to videos):
// both gone. The library has no child watching TV (searched), so the still ways to play are a child sitting still and
// reading, a puzzle, and a handheld video game (screen play you do sitting down); activities/writing (a teenager at a
// desk) was opened and refused: homework, not a way to play
const PLAY = {
  active: [P('activities', 'running'), P('activities', 'jumping'), P('activities', 'dancing'), P('summer', 'swimming'), P('activities', 'biking'), P('activities', 'gymnastics')],
  still: [P('activities', 'reading'), P('activities', 'puzzle'), P('toys', 'video_game')],
};

/* ------------------------------------------------------------ health en-K-006 trusted adults (K-707) */
// Review round 1 (the page was not usable): the cashier and the teacher read as two interchangeable women, and the
// "places" were vehicles, a cart and a blank whiteboard. The library has no school, store, fire station or police
// station (only a post office and a house), so the page is REBUILT around what it can show without a swap: circle the
// GROWN-UPS who can help you (helpers in uniform and a teacher) among CHILDREN (a child is never a grown-up), with the
// help-seeking line printed ("Always check first with your grown-up."); levels 2 and 3 draw your own trusted grown-up
// and the safe place where you would find them. Refused: occupations/paramedic and occupations/coach (they look like
// children), occupations/crossing_guard (a child safety patrol), activities/biking (an older boy).
const TRUSTED = {
  grownUps: [P('occupations', 'police_officer'), P('occupations', 'firefighter'), P('occupations', 'doctor'), P('hospital', 'nurse'), P('occupations', 'teacher')],
  // review round 2: activities/running has grown-up proportions (reads as a teenager or a woman jogging, the stranger the
  // lesson does not want treated as a helper): out; toys/baby_girl (a toddler, big-head proportions) in her place
  children: [P('classroom', 'student'), P('toys', 'girl'), P('activities', 'reading'), P('activities', 'jumping'), P('toys', 'baby_girl')],
  line: 'Always check first with your grown-up before you go anywhere with anyone.',
};
const TRUSTED_HOME = P('miscellaneous', 'house');

module.exports = {
  BODY_NEEDS, RAIN_CUE, STORM_ROWS, STORM_REFUSED, FOODS, ANIMAL_FOOD, FROG_HOME, LAND_CHANGES, PUSH_PULL, DIRECTION, BOAT,
  SUN_SHADE, SHADE_MATERIALS, HELPERS, BEDTIME, BEDTIME_MOON, BEDTIME_REFUSED, PLAY, TRUSTED, TRUSTED_HOME,
};
