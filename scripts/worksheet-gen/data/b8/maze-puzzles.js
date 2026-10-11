/**
 * data/b8/maze-puzzles.js — the K-405 `maze-puzzles` family bank (b8 Handmade Mazes; FINAL
 * docs/worksheet-gen/b8-designs/K-405-maze-puzzles.md §3-§5). Locale-neutral, hand-authored: the twenty MODES with
 * their face id + scene, plus the EN locale block — the SOURCE every native panel audits (they are the only review
 * the English ever gets: hand it over as a source to audit, not a target to copy). The other ten locale blocks are
 * GENERATED into data/b8/locales/maze-puzzles.<loc>.json by tools/apply-b8-locale.js and read through
 * lib/b8-common.js bank('maze-puzzles', loc).
 *
 * Per face, four strings:
 *   title        the deck / catalog title: the face's searched head + its story (≤ 70; no "worksheet", never "free";
 *                never a grid-family head — easy / hard / giant / animal maze belong to K-270/271/272)
 *   printTitle   the heading PRINTED on the page (the story only; the head is SEO, the child reads the story)
 *   instruction  ≤ 150, at most two short sentences; names the hero by its vocab word; names only what is drawn on
 *                the face (stones, cards, carrots, signs, boxes); never prints an answer (no letter / number on the
 *                route, never "the path with …")
 *   tap          the screen's instruction (i18n/interactive-instructions.json `mz-<mode>` — two places, the b7 trap; the
 *                parity gate checks both)
 * Scene data is NOT here: data/hm/scenes.js (the engine's scene specs).
 */
'use strict';

/** mode → { id, scene, band } — the face contract (FINAL §3). Faces without a scene yet carry scene: null. */
const FACES = {
  base:              { id: 'K-405',  scene: 'orchard-hedgehog',     band: 'K' },
  'first-maze':      { id: 'K-406',  scene: 'park-puppy',           band: 'K' },
  'big-maze':        { id: 'G1-420', scene: 'jungle-orangutan',     band: 'G1' },
  river:             { id: 'K-407',  scene: 'stream-boat',          band: 'K' },
  burrow:            { id: 'G1-421', scene: null,                   band: 'G1' },
  'shortest-way':    { id: 'G1-422', scene: null,                   band: 'G1' },
  'babies-mothers':  { id: 'K-408',  scene: null,                   band: 'K' },
  'tangled-lines':   { id: 'G1-423', scene: null,                   band: 'G1' },
  collect:           { id: 'G1-424', scene: 'garden-rabbit',        band: 'G1' },
  avoid:             { id: 'G1-425', scene: 'arctic-polarbear',     band: 'G1' },
  'abc-capitals':    { id: 'K-409',  scene: 'space-rocket',         band: 'K' },
  'abc-lowercase':   { id: 'K-410',  scene: 'reef-clownfish',       band: 'K' },
  'letter-hop':      { id: 'G1-426', scene: null,                   band: 'G1' },
  'numbers-20':      { id: 'K-411',  scene: 'alpine-train',         band: 'K' },
  'skip-5':          { id: 'G2-392', scene: 'dawn-balloon',         band: 'G2' },
  'make-10':         { id: 'G1-427', scene: 'savanna-giraffe',      band: 'G1' },
  'subtract-20':     { id: 'G1-428', scene: 'candy-gingerbread',    band: 'G1' },
  'first-sound':     { id: 'K-412',  scene: 'market-lion',          band: 'K' },
  'running-total':   { id: 'G2-393', scene: 'site-dumptruck',       band: 'G2' },
  'maze-colouring':  { id: 'K-413',  scene: 'beach-crab-colouring', band: 'K' },
};
const MODES = Object.keys(FACES);

const EN_STRINGS = {
  base: {
    title: 'Picture Maze: Help the Hedgehog Reach the Apple Tree',
    printTitle: 'Help the Hedgehog Reach the Apple Tree',
    instruction: 'Help the hedgehog get to the apple tree. Draw a line along the way.',
    tap: 'Start at the green circle with the arrow. Drag along the path to the flag.',
  },
  'first-maze': {
    title: 'My First Maze for Preschool: The Puppy and the Ball',
    printTitle: 'Help the Puppy Get to the Ball',
    instruction: 'Help the puppy get to the ball. Draw a line along the wide road and stay between its edges.',
    tap: 'Start at the green circle. Drag along the wide road to the ball.',
  },
  'big-maze': {
    title: 'Big Picture Maze for 1st Grade: The Orangutan in the Jungle',
    printTitle: 'Help the Orangutan Find the Banana Tree',
    instruction: 'Look at the whole maze first. Then draw the orangutan\'s way to the banana tree.',
    tap: 'Look first. Then drag from the green circle to the banana tree. If a path stops, go back.',
  },
  river: {
    title: 'River Maze: Sail the Boat to the Teddy Bear',
    printTitle: 'Sail the Boat to the Teddy Bear',
    instruction: 'Help the boat sail along the stream to the teddy bear on the dock. Draw a line through the water.',
    tap: 'Start at the green circle. Drag through the water to the teddy bear.',
  },
  burrow: {
    title: 'Underground Maze: The Ant\'s Tunnels',
    printTitle: 'Help the Ant Reach Its Raspberry',
    instruction: 'Help the ant go down and up through the tunnels to the raspberry. Draw a line along the way.',
    tap: 'Start at the green circle. Drag through the tunnels to the raspberry.',
  },
  'shortest-way': {
    title: 'Town Maze: Find the Shortest Way',
    printTitle: 'The Shortest Way to the Green Car',
    instruction: 'Many streets lead to the green car. Draw the shortest way for the tow truck and write how many street pieces it takes.',
    tap: 'Drag the shortest way from the green circle to the green car.',
  },
  'babies-mothers': {
    title: 'Babies and Mothers Maze on the Farm',
    printTitle: 'Help Each Baby Find Its Mother',
    instruction: 'Help each baby animal find its own mother. Draw a line from every baby to its mother.',
    tap: 'Drag from each baby to its own mother.',
  },
  'tangled-lines': {
    title: 'Tangled Lines Puzzle: Whose Kite Is It?',
    printTitle: 'Whose Kite Is It?',
    instruction: 'Follow each string from an animal to its kite. Write the animal\'s number in the box by the kite.',
    tap: 'Drag along each string from the animal to its kite.',
  },
  collect: {
    title: 'Collect-the-Carrots Maze: The Rabbit\'s Garden',
    printTitle: 'Help the Rabbit Pick Up Every Carrot',
    instruction: 'Help the rabbit get to the bucket and pick up every carrot on the way. Tick a circle for each carrot.',
    tap: 'Drag from the green circle to the bucket. Pass every carrot on the way.',
  },
  avoid: {
    title: 'Avoid the Walruses: Polar Bear Maze',
    printTitle: 'Bring the Polar Bear Home Safely',
    instruction: 'Help the polar bear get to the igloo. Do not pass a walrus or a hole in the ice.',
    tap: 'Drag from the green circle to the igloo. Do not pass a walrus or a hole.',
  },
  'abc-capitals': {
    title: 'Alphabet Maze A to Z: Rocket to the Moon',
    printTitle: 'Fly the Rocket to the Moon from A to Z',
    instruction: 'Help the rocket fly to the moon. At every fork, go to the stone with the next letter of the alphabet.',
    tap: 'Start at the green circle. At every fork, drag to the next letter.',
  },
  'abc-lowercase': {
    title: 'Lowercase Letter Maze a to z: Under the Sea',
    printTitle: 'Swim Home from a to z',
    instruction: 'Help the clownfish swim to the coral. At every fork, go to the bubble with the next small letter.',
    tap: 'Start at the green circle. At every fork, drag to the next small letter.',
  },
  'letter-hop': {
    title: 'ABC Order Letter Hop: The Bear\'s Honeycomb',
    printTitle: 'Hop Through the Honeycomb in ABC Order',
    instruction: 'Start at the cell by the bear. Colour the next letter of the alphabet in a cell that touches it, until you reach {LAST}.',
    tap: 'Start at the cell by the bear. Tap the next letter in a cell that touches it.',
  },
  'numbers-20': {
    title: 'Number Maze 1 to 20: The Little Train',
    printTitle: 'Count the Train to the Cabin',
    instruction: 'Help the train get to the cabin. At every fork, go to the next number from 1 to 20.',
    tap: 'Start at the green circle. At every fork, drag to the next number.',
  },
  'skip-5': {
    title: 'Skip Counting Maze by 5s: Balloon to the Rainbow',
    printTitle: 'Count by 5s to the Rainbow',
    instruction: 'Help the balloon float to the rainbow. Count by 5s from cloud to cloud, all the way to 100.',
    tap: 'Start at the green circle. Drag from cloud to cloud, counting by 5s.',
  },
  'make-10': {
    title: 'Addition Maze for 1st Grade: Sums That Make 10',
    printTitle: 'Step on the Sums That Make 10',
    instruction: 'Help the giraffe get to the baobab tree. Step only on the stones whose sum is 10.',
    tap: 'Start at the green circle. Drag only over the stones whose sum is 10.',
  },
  'subtract-20': {
    title: 'Subtraction Maze Within 20: The Gingerbread Man',
    printTitle: 'Help the Gingerbread Man Reach the Cake',
    instruction: 'Look at the number by the gingerbread man. Step only on the stones whose answer is that number.',
    tap: 'Start at the green circle. Drag only over the stones whose answer is the gingerbread man\'s number.',
  },
  'first-sound': {
    title: 'Beginning Sounds Maze: Pictures That Start Like Lion',
    printTitle: 'Pictures That Start Like Lion',
    instruction: 'Say each picture\'s name. Step only on pictures that start with the same sound as lion.',
    tap: 'Start at the green circle. Drag only over pictures that start like lion.',
  },
  'running-total': {
    title: 'Math Maze for 2nd Grade: Add and Subtract Within 100',
    printTitle: 'Bring the Crane Its Number',
    instruction: 'Start with the truck\'s number and change it at every sign you pass. Find the road that ends on the crane\'s number.',
    tap: 'Start at the green circle. Drag along the road that ends on the crane\'s number.',
  },
  'maze-colouring': {
    title: 'Maze Colouring Page: The Crab at the Beach',
    printTitle: 'Solve the Maze, Then Colour the Beach',
    instruction: 'Draw the crab\'s way to the sandcastle and colour the whole road. Then colour the beach picture.',
    tap: 'Start at the green circle. Drag along the path to the sandcastle.',
  },
};

/** the screen's runtime messages (FINAL §4: thirteen strings; fi / de write whole frames, never a templated case) */
const EN_CHROME = {
  mzGoBack: 'Go back',
  mzKeepGoing: 'Keep going: the path does not end here.',
  mzLookAtRing: 'Look at the picture in the red ring.',
  mzMissed: 'A carrot was missed. Look at the red ring.',
  mzTwice: 'This path is already used.',
  mzAvoid: 'This path passes something to avoid.',
  mzShorter: 'There is a shorter way.',
  mzWrongHome: 'This baby is not with its mother yet.',
  mzWaysHere: 'Ways from here',
  mzPathN: 'Path {n}',
  mzAt: 'Stop {n}',
  mzDeadEnd: 'This path stops here.',
  mzAtGoal: 'You made it!',
};

const MAZE_PUZZLES = {
  en: { strings: EN_STRINGS, chrome: EN_CHROME },
};

/**
 * validateBank(loc) → string[] errors. Hard rules for every locale block (FINAL §5 validator 1-6, the parts a bank can
 * check alone; the page-level checks live in the family gate).
 */
const FREE = /\b(free|gratis|gratuit|gratuita?s?|kostenlos|gratuito|gratuiti|ilmai)/i;
const WORKSHEET = /\b(worksheet|arbeitsblatt|fiche|ficha|scheda|werkblad|arbetsblad|arbejdsark|arbeidsark|tehtäväsivu|atividade impressa)\b/i;
function validateBank(loc) {
  const b = MAZE_PUZZLES[loc]; const errs = [];
  if (!b) return ['no ' + loc + ' block'];
  for (const m of MODES) {
    const s = b.strings && b.strings[m];
    if (!s) { errs.push(loc + ' ' + m + ': no strings'); continue; }
    for (const k of ['title', 'printTitle', 'instruction', 'tap']) if (!s[k] || !String(s[k]).trim()) errs.push(loc + ' ' + m + ': no ' + k);
    if (s.title && s.title.length > 70) errs.push(loc + ' ' + m + ': title ' + s.title.length + ' > 70');
    if (s.instruction && s.instruction.length > 150) errs.push(loc + ' ' + m + ': instruction ' + s.instruction.length + ' > 150');
    for (const k of ['title', 'printTitle', 'instruction', 'tap']) {
      if (FREE.test(s[k] || '')) errs.push(loc + ' ' + m + ': ' + k + ' claims free');
      if (WORKSHEET.test(s[k] || '')) errs.push(loc + ' ' + m + ': ' + k + ' says worksheet');
    }
    if (s.instruction && (s.instruction.match(/[.!?](\s|$)/g) || []).length > 2) errs.push(loc + ' ' + m + ': instruction has more than two sentences');
    if (m === 'letter-hop' && s.instruction && !s.instruction.includes('{LAST}')) errs.push(loc + ' letter-hop: the instruction must name the run\'s last letter via {LAST}');
    if (m !== 'letter-hop' && /\{[A-Z]+\}/.test(s.instruction || '')) errs.push(loc + ' ' + m + ': an unfilled token');
  }
  for (const k of Object.keys(EN_CHROME)) if (!b.chrome || !b.chrome[k]) errs.push(loc + ' chrome ' + k + ' missing');
  if (b.chrome && !/\{n\}/.test(b.chrome.mzPathN || '')) errs.push(loc + ' chrome mzPathN lacks {n}');
  return errs;
}

// MAZE_PUZZLES FIRST: lib/b8-common.js bankModule() takes the module's first export as the locale map
module.exports = { MAZE_PUZZLES, FACES, MODES, EN_STRINGS, EN_CHROME, validateBank };

if (require.main === module) {
  const errs = validateBank(process.argv[2] || 'en');
  if (errs.length) { errs.forEach((e) => console.error(' - ' + e)); process.exit(1); }
  console.log('ok ' + (process.argv[2] || 'en') + ': ' + MODES.length + ' faces');
}
