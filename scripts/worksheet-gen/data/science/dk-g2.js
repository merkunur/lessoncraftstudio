/**
 * dk-g2.js — the bank of the Batch 2 Grade 2 science and health pages (Daily Teaching System Stage D-5, 2026-11-24;
 * factories types/_shared/dk-g2.js + dk-g2-health.js, gate qa/verify-dk-g2.js). English only.
 *
 * Every library picture here was OPENED at print size on a contact sheet (lcs-stage-d/batch-2/work/d1..d3.png) before
 * it was placed; colour themes only. What the library cannot show (or shows as something else) is drawn by the factory
 * in simple shapes and listed in the result for the reviewer: `draw: '<kind>'`. Refused pictures are listed in REFUSED
 * with why, and the gate refuses them.
 *
 * The CLOSED items carry their answer here; the gate re-derives every one from its OWN tables, never from this file.
 */
'use strict';
const P = (theme, noun) => ({ theme, noun });

/* ---------------------------------------------------------------- materials (G2-584 .. G2-586) */
// G2-584: the six materials the class tests (record page: the class's own results)
const PROPERTY_MATERIALS = [
  { id: 'wood-block', label: 'wood block', draw: 'wood-block' },
  { id: 'sponge', label: 'sponge', pic: P('kitchen tools', 'sponge') },
  { id: 'metal-spoon', label: 'metal spoon', draw: 'spoon' },
  { id: 'rubber-band', label: 'rubber band', draw: 'rubber-band' },
  { id: 'paper-towel', label: 'paper towel', draw: 'paper-towel' },
  { id: 'plastic-lid', label: 'plastic lid', draw: 'plastic-lid' },
];
const PROPERTY_TESTS = [
  { id: 'hard', a: 'hard', b: 'soft' }, { id: 'bend', a: 'bends', b: 'stays stiff' },
  { id: 'rough', a: 'rough', b: 'smooth' }, { id: 'soak', a: 'soaks up water', b: 'does not' },
];
// G2-585: the umbrella roof materials (drawn swatches; the class counts the drops)
const ROOF_MATERIALS = [
  { id: 'paper', label: 'paper', pic: P('classroom', 'paper') }, { id: 'plastic-wrap', label: 'plastic wrap', draw: 'plastic-wrap' },
  { id: 'foil', label: 'foil', draw: 'foil' }, { id: 'cloth', label: 'cloth', draw: 'cloth' }, { id: 'paper-towel', label: 'paper towel', draw: 'paper-towel' },
];
const ROOF_TOY = P('toys', 'teddy_bear');
const BLOCKS = P('toys', 'blocks');

/* ---------------------------------------------------------------- land and water (G2-587 .. G2-590) */
// G2-587: the four features the island map labels (one numbered tag points to each)
const MAP_FEATURES = ['lake', 'river', 'hill', 'ocean'];
// G2-588: the landform cards (drawn, side view)
const LANDFORMS = ['hill', 'valley', 'plain', 'lake', 'mountain', 'river'];
// G2-589: where is water? (the gate's own table decides solid / liquid and salty / fresh)
const WATER_CARDS = [
  { id: 'ocean', label: 'ocean', pic: P('beach', 'wave'), state: 'liquid', salt: 'salty' },
  { id: 'river', label: 'river', pic: P('camping', 'river'), state: 'liquid', salt: 'fresh' },
  { id: 'puddle', label: 'puddle', pic: P('weather', 'puddle'), state: 'liquid', salt: 'fresh' },
  { id: 'rain', label: 'rain', pic: P('weather', 'raindrop'), state: 'liquid', salt: 'fresh' },
  { id: 'mountain-snow', label: 'a snowy mountain top', pic: P('camping', 'mountain'), state: 'solid', salt: 'fresh' },
  { id: 'snowflakes', label: 'snowflakes', pic: P('weather', 'snowflake'), state: 'solid', salt: 'fresh' },
  { id: 'icicle', label: 'icicle', pic: P('winter', 'icicle'), state: 'solid', salt: 'fresh' },
  { id: 'frozen-pond', label: 'frozen pond', pic: P('winter', 'ice'), state: 'solid', salt: 'fresh' },
];
const MOST_WATER = { answer: 'the ocean', bank: ['the ocean', 'rivers', 'puddles'] };

/* ---------------------------------------------------------------- Earth changes (G2-591 .. G2-594) */
// G2-591: fast (minutes, hours or days) or slow (many years); every card drawn and labelled
const EARTH_EVENTS = [
  { id: 'earthquake', label: 'an earthquake', speed: 'fast' }, { id: 'volcano', label: 'a volcano erupting', speed: 'fast' },
  { id: 'landslide', label: 'a landslide', speed: 'fast' }, { id: 'flood', label: 'a flood', speed: 'fast' },
  { id: 'canyon', label: 'a river carving a canyon', speed: 'slow' }, { id: 'mountain', label: 'a mountain wearing down', speed: 'slow' },
  { id: 'ice-crack', label: 'ice cracking a rock, winter after winter', speed: 'slow' }, { id: 'dunes', label: 'sand dunes moving', speed: 'slow' },
];
// G2-592: the erosion tray's closed frame (word bank)
const TRAY_FRAME = { tray: 'minutes', canyon: 'millions of years', bank: ['minutes', 'millions of years'] };
// G2-594: real solutions; what each one slows (the gate's own table decides)
const SOLUTIONS = [
  { id: 'seawall', label: 'a seawall', slows: 'water' }, { id: 'windbreak', label: 'a windbreak of trees', slows: 'wind' },
  { id: 'sand-fence', label: 'a sand fence', slows: 'wind' }, { id: 'riverbank-rocks', label: 'riverbank rocks', slows: 'water' },
];
const DESIGN_IDEAS = ['rocks', 'a grass mat', 'a craft-stick wall', 'soil and plants'];

/* ---------------------------------------------------------------- heating and cooling (G2-595 .. G2-598) */
const ICE_PLACES = [
  { id: 'sun', label: 'in the sun', draw: 'sun' }, { id: 'shade', label: 'in the shade', pic: P('tree', 'oak') },
  { id: 'tray', label: 'on a metal tray', where: 'in the shade', draw: 'metal-tray' }, { id: 'mitten', label: 'in a mitten', where: 'in the shade', pic: P('winter', 'mittens') },
];
const MELT_ITEMS = [
  { id: 'ice', label: 'ice', draw: 'ice-cube', cool: 'freezer' },
  { id: 'chocolate', label: 'chocolate', pic: P('At the Supermarket', 'chocolate_bar'), cool: 'refrigerator' },
  { id: 'butter', label: 'butter', draw: 'butter', cool: 'refrigerator' },
];
// G2-597: before / after pairs (the gate's own table decides can / cannot change back)
const CHANGE_PAIRS = [
  { id: 'ice', before: { draw: 'ice-cube' }, after: { pic: P('weather', 'puddle') }, labels: ['ice', 'water'], back: 'can' },
  { id: 'chocolate', before: { pic: P('At the Supermarket', 'chocolate_bar') }, after: { draw: 'melted-chocolate' }, labels: ['chocolate', 'melted chocolate'], back: 'can' },
  { id: 'butter', before: { draw: 'butter' }, after: { draw: 'melted-butter' }, labels: ['butter', 'melted butter'], back: 'can' },
  { id: 'egg', before: { pic: P('At the Supermarket', 'egg') }, after: { pic: P('breakfast', 'fried_egg') }, labels: ['raw eggs', 'a cooked egg'], back: 'cannot' },
  { id: 'bread', before: { pic: P('At the Supermarket', 'bread') }, after: { pic: P('bakery', 'toast') }, labels: ['bread', 'toast'], back: 'cannot' },
  { id: 'batter', before: { draw: 'batter' }, after: { pic: P('bakery', 'cupcake') }, labels: ['cake batter', 'a cupcake'], back: 'cannot' },
  { id: 'clay', before: { draw: 'clay' }, after: { pic: P('activities', 'pottery') }, labels: ['wet clay', 'a fired pot'], back: 'cannot' },
];
const CANNOT_FRAME = { answer: 'heat', bank: ['heat', 'water', 'cold'] };
const CLAIM_CHANGES = [
  { id: 'ice', label: 'ice melting', draw: 'ice-cube' }, { id: 'chocolate', label: 'chocolate melting', pic: P('At the Supermarket', 'chocolate_bar') },
  { id: 'egg', label: 'an egg cooking', pic: P('breakfast', 'fried_egg') }, { id: 'bread', label: 'bread toasting', pic: P('bakery', 'toast') },
];

/* ---------------------------------------------------------------- plants (G2-599 .. G2-601) */
const PLANT_CUPS = [
  { id: 'A', light: true, water: true }, { id: 'B', light: true, water: false },
  { id: 'C', light: false, water: true }, { id: 'D', light: false, water: false },
];
// G2-600: seeds and how they travel (the gate's own table decides)
const SEEDS = [
  { id: 'burr', label: 'burr', draw: 'burr', moves: 'sticks' }, { id: 'cleavers', label: 'cleavers seeds', draw: 'cleavers', moves: 'sticks' },
  { id: 'maple', label: 'maple seed', draw: 'maple', moves: 'wind' }, { id: 'dandelion', label: 'dandelion seeds', draw: 'dandelion', moves: 'wind' },
  { id: 'cherry', label: 'cherries', draw: 'cherries', moves: 'eaten' }, { id: 'acorn', label: 'acorn', pic: P('miscellaneous', 'acorn'), moves: 'eaten' },
];
const SEED_BINS = { sticks: 'sticks to fur', eaten: 'eaten or buried by animals', wind: 'blown by the wind' };
const GARDEN_FLOWER = P('flowers', 'sunflower');   // review round 1: ONE kind (pollen must reach a flower of the same kind)
const BEE = P('insects and bugs', 'bee');

/* ---------------------------------------------------------------- habitats (G2-602 .. G2-604) */
const SURVEY_KINDS = [
  { id: 'ant', pic: P('insects and bugs', 'ant') }, { id: 'spider', pic: P('insects and bugs', 'spider') },
  { id: 'ladybug', pic: P('insects and bugs', 'ladybug') }, { id: 'snail', pic: P('insects and bugs', 'snail') },
  { id: 'clover', draw: 'clover3', plant: true }, { id: 'grass', pic: P('spring', 'grass'), plant: true },
];
// G2-603: the picture bank of level 1 (the gate's own table decides each card's habitat)
const HABITAT_BANK = [
  { id: 'camel', pic: P('zoo animals', 'camel'), home: 'desert' }, { id: 'meerkat', pic: P('zoo animals', 'meerkat'), home: 'desert' },
  { id: 'cactus', draw: 'cactus', home: 'desert' },
  { id: 'toucan', pic: P('birds', 'toucan'), home: 'rain forest' }, { id: 'tree-frog', label: 'tree frog', pic: P('pets', 'frog'), home: 'rain forest' },
  { id: 'monkey', pic: P('zoo animals', 'monkey'), home: 'rain forest' },
  { id: 'octopus', pic: P('ocean life', 'octopus'), home: 'ocean' }, { id: 'whale', pic: P('ocean life', 'whale'), home: 'ocean' },
  { id: 'starfish', pic: P('ocean life', 'starfish'), home: 'ocean' },
];
const HABITATS3 = ['desert', 'rain forest', 'ocean'];
// G2-604: plants and where they grow best; the part that helps (one phrase each)
const PLANT_HOMES = [
  { id: 'cactus', label: 'cactus', draw: 'cactus', home: 'desert', part: 'a thick stem that holds water' },
  { id: 'fern', label: 'fern', draw: 'fern', home: 'shady forest', part: 'big leaves to catch a little light' },
  { id: 'water-lily', label: 'water lily', pic: P('flowers', 'water_lily'), home: 'pond', part: 'leaves that float' },
];

/* ---------------------------------------------------------------- health (G2-605 .. G2-613) */
// G2-605: the three parts of being well (the gate's own table decides each card)
const WELL_CARDS = [
  { id: 'sleep', label: 'sleeping at night', part: 'body' }, { id: 'apple', label: 'eating an apple', part: 'body', pic: P('fruits', 'apple') },
  { id: 'running', label: 'running fast', part: 'body' },
  { id: 'breath', label: 'a deep breath to calm down', part: 'feelings' }, { id: 'worry', label: 'telling a grown-up a worry', part: 'feelings' },
  { id: 'drawing', label: 'drawing to feel better', part: 'feelings' },
  { id: 'sharing', label: 'sharing crayons', part: 'friendships', pic: P('toys', 'crayons') }, { id: 'inviting', label: 'inviting a friend to play', part: 'friendships' },
  { id: 'turns', label: 'taking turns in a game', part: 'friendships', pic: P('toys', 'dice') },
];
const WELL_PARTS = { body: 'my body', feelings: 'my feelings', friendships: 'my friendships' };
// G2-606: influences and choices (level 1: the three choices whose clue names one influence)
const INFLUENCES = [
  { id: 'family', label: 'family', draw: 'family' }, { id: 'friends', label: 'friends', draw: 'friends' },
  { id: 'teacher', label: 'teacher', pic: P('occupations', 'teacher') }, { id: 'coach', label: 'coach', draw: 'coach' },
  { id: 'tv', label: 'TV or videos', pic: P('around the house', 'television') }, { id: 'ads', label: 'ads and packages', pic: P('At the Supermarket', 'cereal') },
];
const CHOICES = [
  { id: 'carrots', label: 'carrots at dinner', pic: P('vegetables', 'carrot'), clue: 'family', level1: true },
  { id: 'cereal-toy', label: 'a cereal with a toy', draw: 'cereal-toy', clue: 'ads', level1: true },
  { id: 'late-show', label: 'up late for a show', draw: 'late-show', clue: 'tv', level1: true },
  { id: 'helmet', label: 'wearing a helmet', draw: 'helmet' }, { id: 'new-sport', label: 'a new sport', pic: P('toys', 'ball') },
  { id: 'water', label: 'water after recess', pic: P('At the Supermarket', 'water') },
];
// G2-607: pretend ads (invented names) and the tricks each one uses (the gate's own table decides)
const TRICKS = ['a cartoon character', 'a free prize', '“everybody loves it”', 'rainbow colors'];
const ADS = [
  { id: 'cereal', name: 'Zoomeroos', what: 'a cereal', tricks: ['a cartoon character', 'a free prize'], art: P('zoo animals', 'kangaroo'), prize: P('toys', 'car') },
  { id: 'drink', name: 'Zingle Pop', what: 'a soda', tricks: ['“everybody loves it”'] },
  { id: 'snack', name: 'Rainbow Wigglies', what: 'a fruit snack', tricks: ['rainbow colors'], art: P('spring', 'rainbow') },
];
// G2-608 / G2-610: goals (healthy-habits pictograms only)
const GOALS = [
  { id: 'water', tool: 'glass', label: 'drink water at lunch' }, { id: 'brush', pose: 'brush-teeth', label: 'brush for two minutes' },
  { id: 'play', pose: 'move-body', label: 'play actively every day' }, { id: 'bed', pose: 'sleep-bed', label: 'go to bed on time' },
];
const HOW_IT_WENT = [{ id: 'great', pic: P('emotions', 'happy'), label: 'great' }, { id: 'okay', pic: P('emotions', 'content'), label: 'okay' }, { id: 'hard', pic: P('emotions', 'sad'), label: 'hard' }];
// G2-609: when to see the nurse, doctor or dentist (the gate's own table decides)
const CARE_CARDS = [
  { id: 'fever', label: 'a fever at school', pic: P('hospital', 'thermometer'), go: 'see' }, { id: 'tooth', label: 'a tooth that aches', pic: P('body parts', 'tooth'), go: 'see' },
  { id: 'ear', label: 'an ear that hurts', pic: P('body parts', 'ear'), go: 'see' }, { id: 'fall', label: 'a fall that still hurts the next day', pic: P('body parts', 'knee'), go: 'see' },
  { id: 'scrape', label: 'a small scrape at home', pic: P('hospital', 'bandage'), go: 'home' }, { id: 'tired', label: 'sleepy after a late night', draw: 'sleepy', go: 'home' },
  { id: 'dental', label: 'a dental checkup', draw: 'dentist', go: 'see', checkup: true }, { id: 'yearly', label: 'a yearly checkup', pic: P('hospital', 'stethoscope'), go: 'see', checkup: true },
];
const CARE_HELPERS = [P('hospital', 'nurse'), P('hospital', 'doctor')];
// G2-611: stop, think, choose (the safe card of each pair)
const SAFETY_PAIRS = [
  { id: 'helmet', safe: { draw: 'bike-helmet-on', label: 'helmet on my head' }, risky: { draw: 'bike-helmet-off', label: 'helmet on the bike' } },
  { id: 'pool', safe: { draw: 'pool-watched', label: 'a grown-up watching' }, risky: { draw: 'pool-alone', label: 'no grown-up' } },
  { id: 'boat', safe: { draw: 'boat-jacket', label: 'wearing a life jacket' }, risky: { draw: 'boat-no-jacket', label: 'no life jacket' } },
  { id: 'scooter', safe: { draw: 'scooter-sidewalk', label: 'on the sidewalk' }, risky: { draw: 'scooter-street', label: 'in the street' } },
];
const HELMET_RULE = { bank: ['low', 'snug', 'buckled'] };
// G2-612: weather and protection (the gate's own table: lines a page must have, and lines a teacher also accepts)
const WEATHERS = [
  { id: 'beach', label: 'a sunny beach', pic: P('summer', 'beach') }, { id: 'hot', label: 'a hot playground', pic: P('activities', 'playground'), thermo: true },
  { id: 'cloudy', label: 'a cloudy spring day', draw: 'cloudy' }, { id: 'snow', label: 'a snowy day', pic: P('winter', 'snowman') },
];
const PROTECTIONS = [
  { id: 'sunscreen', label: 'sunscreen', pic: P('beach', 'sunscreen') }, { id: 'sun-hat', label: 'a sun hat', pic: P('summer', 'sun_hat') },
  { id: 'water', label: 'a water bottle', pic: P('At the Supermarket', 'water') }, { id: 'shade', label: 'a shade tree', pic: P('tree', 'oak') },
  { id: 'coat', label: 'a winter coat', pic: P('winter', 'coat') }, { id: 'mittens', label: 'mittens', pic: P('winter', 'mittens') },
];
// G2-613: campaigns to circle (record: the class votes)
const CAMPAIGNS = [{ id: 'wash', label: 'wash hands before lunch', pic: P('around the house', 'sink') }, { id: 'helmet', label: 'wear a helmet', draw: 'helmet' }, { id: 'water', label: 'drink water', pic: P('At the Supermarket', 'water') }];

/* ---------------------------------------------------------------- refused pictures (opened, and why) */
const REFUSED = {
  'At the Supermarket/butter': 'a yellow block with holes: reads as cheese', 'breakfast/butter': 'a yellow block with holes: reads as cheese',
  'kitchen tools/spoon': 'a purple spoon: reads as plastic, not metal', 'kitchen tools/lid': 'a green dome: reads as a cake cover',
  'kitchen tools/baking_sheet': 'a tray full of food: reads as a cake, not a metal tray', 'toys/scooter': 'a motor scooter, not a kick scooter',
  'vehicles/boat': 'a ship', 'spring/rain': 'a cloud with a face', 'flowers/dandelion': 'a white flower: reads as a daisy',
  'Things That Fly/beetle': 'a red beetle: reads as a ladybug', 'kitchen tools/jar': 'reads as a plastic peanut-butter jar (Batch 1 notes)',
  'camping/forest': 'autumn trees in the sun, not a shady forest floor', 'beach/water': 'a water bottle, not the ocean',
  'camping/lake': 'a mountain landscape, not water (Batch K)',
  // review round 1 (a US second-grade teacher read the sheets)
  'zoo animals/sloth': 'reads as a red panda or a fox', 'occupations/coach': 'a child in a cap (Batch K): reads as a friend',
  'emotions/tired': 'red cheeks: reads as sick next to the fever card', 'emotions/bored': 'red cheeks', 'fruits/cherry': 'one round cherry: reads as an apple',
  'At the Supermarket/cherry': 'one cherry with a leaf: reads as an apple', 'flowers/clover': 'a four-leaf clover (a good-luck charm), not lawn clover',
  'breakfast/cereal': 'a bowl: says breakfast, not a package', 'zoo animals/tiger': 'a tiger on a cereal box recalls a real mascot'
};

module.exports = {
  PROPERTY_MATERIALS, PROPERTY_TESTS, ROOF_MATERIALS, ROOF_TOY, BLOCKS, MAP_FEATURES, LANDFORMS, WATER_CARDS, MOST_WATER,
  EARTH_EVENTS, TRAY_FRAME, SOLUTIONS, DESIGN_IDEAS, ICE_PLACES, MELT_ITEMS, CHANGE_PAIRS, CANNOT_FRAME, CLAIM_CHANGES,
  PLANT_CUPS, SEEDS, SEED_BINS, GARDEN_FLOWER, BEE, SURVEY_KINDS, HABITAT_BANK, HABITATS3, PLANT_HOMES,
  WELL_CARDS, WELL_PARTS, INFLUENCES, CHOICES, TRICKS, ADS, GOALS, HOW_IT_WENT, CARE_CARDS, CARE_HELPERS, SAFETY_PAIRS,
  HELMET_RULE, WEATHERS, PROTECTIONS, CAMPAIGNS, REFUSED,
};
