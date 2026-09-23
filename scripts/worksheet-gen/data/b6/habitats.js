'use strict';
/**
 * data/b6/habitats.js — the G1-398 `habitats` bank (nt5-F, b6). Design:
 * docs/worksheet-gen/b6-designs/G1-398-habitats.md §5 (the claim table, every picture OPENED).
 *
 * TWO layers:
 *   HABITATS_LOC  one block per locale, read ONLY through lib/b6-common.js
 *                 bank('habitats', loc) — a missing block REFUSES (never an en fallback).
 *                 The EN block is HAND-AUTHORED here (2026-09-23, the base build); the ten
 *                 non-EN blocks are GENERATED later by tools/apply-b6-locale.js into
 *                 data/b6/locales/habitats.<loc>.json from the native panels' drafts after
 *                 tools/validate-b6-draft.js, which runs validateBank(block, loc)
 *                 (qa/verify-b6-habitats.js, §5 rules 1-12).
 *   HABITATS      the locale-free truth: habitat keys, the near / far tables, the ANIMALS
 *                 claim table (a FULL hand-read `lives` list per animal, never the favourite
 *                 one), the pictures EXCLUDED after opening, the homes, the adaptation claims,
 *                 the needs table. Never per locale.
 *
 * Block shape (§5 HABITATS_LOC). Frames NEVER inflect: every printed word is a whole panel
 * literal (tile plaques, claim sentences, report words); no animal name is ever printed
 * (`names` exists ONLY for the leak check) and no vocab / objForms / articles are read.
 *   sets.base       tile keys in the order the locale teaches them (generic locales: 7, the
 *                   base draws 4 by seed; fixed-set locales: exactly their 4)
 *   tileLabel       {ocean pond forest meadow polar polar-arctic savanna rainforest} plaque
 *                   literals ('polar-arctic' on a page whose polar window is the ARCTIC,
 *                   'polar' on an Antarctic page)
 *   rainforestRegion  OPTIONAL: 'americas' restricts the rainforest window to region
 *                   'americas' animals (pt Amazônia: no apes). ADDED at the build (the design
 *                   names the rule in §4/§5 rule 4 but gave the block no field for it).
 *   adapt           {<claim key>: sentence} (F3; the body part and its job, NEVER the animal)
 *   names           {<animal key>: [names a child might write]} (leak check only, never printed)
 *   needs           {line, foodHead, homeHead} (F4)
 *   report          {animals, plant, hot, cold, wet, dry} (F5; standalone words)
 *   homeWord        {nest hive web burrow anthill lodge} (titles / landings only, never on a page)
 *   refuse / refuseClaims   faces / claims this locale will not ship
 *   strings         {'G1-398' + the five allocated face ids: {title, instruction}} (K-383 homes,
 *                   G1-406 odd, G2-380 adapt, G1-407 needs, G2-381 report); each === that spec's
 *                   i18n.en (the family gate asserts it).
 *
 * THE EN BLOCK IS A SOURCE TO AUDIT (§4): every panel reads these strings and the claim
 * table and reports defects in them, not only its own.
 *
 * `data/` is gitignored — the reviewer force-adds this module. The locale map is the FIRST
 * export (lib/b6-common.js bankModule reads the first export).
 */

const HABITATS_LOC = {
  en: {
    sets: { base: ['ocean', 'pond', 'forest', 'meadow', 'polar', 'savanna', 'rainforest'] },
    tileLabel: {
      ocean: 'Ocean', pond: 'Pond', forest: 'Forest', meadow: 'Meadow',
      polar: 'Polar Ice', 'polar-arctic': 'Arctic', savanna: 'Savanna', rainforest: 'Rainforest',
    },
    adapt: {
      'camel-hump': 'Its hump stores fat, so it can go a long time without food.',
      'giraffe-neck': 'Its long neck reaches the leaves high up in the trees.',
      'elephant-trunk': 'Its long trunk sucks up water and picks up food.',
      'penguin-flippers': 'Its wings are flippers: it swims fast but cannot fly.',
      'walrus-tusks': 'It uses its long tusks to pull its heavy body out of the water.',
      'woodpecker-beak': 'Its strong, sharp beak drills holes in tree trunks.',
      'beaver-teeth': 'Its big front teeth cut down trees to build its home in the water.',
      'whale-blowhole': 'It breathes air through a hole on top of its head.',
      'fish-gills': 'It breathes under water with gills.',
      'duck-feet': 'Its webbed feet push the water like paddles.',
      'sloth-claws': 'Its long curved claws let it hang from branches for hours.',
      'toucan-beak': 'Its huge beak picks fruit far out on thin branches.',
      'squirrel-tail': 'Its bushy tail helps it balance when it jumps from branch to branch.',
    },
    names: {
      whale: ['whale'], dolphin: ['dolphin'], octopus: ['octopus'], starfish: ['starfish', 'sea star'], jellyfish: ['jellyfish'],
      shark: ['shark'], clownfish: ['clownfish', 'fish'], crab: ['crab'], ray: ['ray', 'stingray'],
      'seal-grey': ['seal'], 'seal-white': ['seal', 'baby seal'], walrus: ['walrus'], narwhal: ['narwhal'], penguin: ['penguin'],
      deer: ['deer', 'fawn'], squirrel: ['squirrel'], woodpecker: ['woodpecker'], badger: ['badger'], moose: ['moose'],
      frog: ['frog'], dragonfly: ['dragonfly'], beaver: ['beaver'], duck: ['duck', 'duckling'], swan: ['swan'],
      butterfly: ['butterfly'], bee: ['bee'], grasshopper: ['grasshopper'], ladybug: ['ladybug', 'ladybird'],
      lion: ['lion'], zebra: ['zebra'], giraffe: ['giraffe'], elephant: ['elephant'], rhinoceros: ['rhinoceros', 'rhino'], ostrich: ['ostrich'],
      monkey: ['monkey'], gorilla: ['gorilla'], orangutan: ['orangutan'], sloth: ['sloth'], toucan: ['toucan'], macaw: ['macaw', 'parrot'],
      camel: ['camel'], bird: ['bird'], spider: ['spider'], rabbit: ['rabbit', 'bunny'], ant: ['ant'],
    },
    needs: { line: 'Every animal needs food and a home.', foodHead: 'Food', homeHead: 'Home', undrawn: ['water', 'drink', 'air', 'sun', 'sunlight'] },
    report: { animals: 'Animals that live here', plant: 'A plant that grows here', hot: 'hot', cold: 'cold', wet: 'wet', dry: 'dry' },
    placeWords: ['desert', 'sea', 'ocean', 'ice', 'arctic', 'antarctic', 'pond', 'lake', 'forest', 'woods', 'meadow', 'field', 'savanna', 'rainforest', 'jungle'],
    homeWord: { nest: 'nest', hive: 'hive', web: 'web', burrow: 'burrow', anthill: 'anthill', lodge: 'lodge' },
    refuse: [],
    refuseClaims: [],
    strings: {
      'G1-398': {
        title: 'Animal Habitats: Match the Animal',
        instruction: 'Under each animal, write the letter of the habitat where it lives.',
      },
      'K-383': { title: 'Animal Homes', instruction: 'Draw a line from each animal to its home.' },
      'G1-406': { title: 'Who Does Not Live Here?', instruction: 'For each habitat, cross out the animal that does not live there.' },
      'G2-380': { title: 'How Animals Adapt', instruction: 'Write the letter of the animal each sentence tells about in its box; one animal is left over.' },
      'G1-407': { title: 'What Animals Need', instruction: 'For each animal, circle the food it eats and the home it lives in.' },
      'G2-381': { title: 'My Habitat Report', instruction: 'In the picture, draw three animals that live there, write their names and a plant that grows there, and circle the word that fits this habitat.' },
    },
  },
};

/* ------------------------------------------------------------------ the locale-free truth */
// Page-rule fields per animal (all hand-read; §5 claim table):
//   lives           EVERY habitat it truly lives in
//   coastal         true: never on a page with an OCEAN window (pond birds that also live on coasts)
//   notWithWindow   tile ids whose presence on the page excludes the animal (the §5 page rules:
//                   seal-grey / polar, moose / pond, frog / rainforest, elephant + rhino / rainforest,
//                   monkey / savanna — each an honest second home the drawing cannot rule out)
//   lookalike       animal keys never on the same page
//   group           'ape' — at most ONE per page (the monkey, the gorilla and the orangutan read alike)
//   region          'americas' — the rainforest animals of the Americas (pt Amazônia)
//   faces           the layouts it may appear on (default: every face); narwhal + white seal are the
//                   F2 Arctic row only, the camel F3 only
//   panelCheck      a naming risk the native panel must read on the picture
//   oddRow          F2: the ONLY row this animal may stand in (narwhal + white seal: the Arctic trio)
//   kind            'insect' | 'bird' — the GENERALISTS; the F2 stranger rule (every habitat of the stranger
//                   is FAR from the row) is what keeps them honest, and the gate reports them by kind
//
// GENERALIST AUDIT (2026-09-23, lead review of G1-406: a butterfly was the "stranger" of a Rainforest row).
// Every insect, bird and wide-ranging mammal re-read as a K-3 teacher would answer "does it also live there?":
//   butterfly  meadow, forest, rainforest, savanna, pond (edge)   bee        meadow, forest, rainforest, savanna
//   ladybug    meadow, forest (gardens, trees)                    grasshopper meadow, savanna (grasslands, locusts)
//   woodpecker forest, rainforest (tropical woodpeckers)          deer       forest, meadow (grazes in meadows)
//   badger     forest, meadow (setts at field edges)              frog       pond, rainforest (tree frogs; was a
//                                                                            notWithWindow rule, now honest lives)
// noStranger (F2): an animal whose honest range is wider than any row the table can name is never the
// stranger — the dragonfly and the pond birds (duck, swan); an insect is never the stranger at all. (heron EXCLUDED, fix round 1)
// notStrangerIn (F2): rows this animal is never the stranger of. Every cetacean (whale, dolphin, narwhal) is
// barred from the RAINFOREST row in every locale: Brazilian children know the boto cor-de-rosa, the Amazon
// river dolphin, so a dolphin 'stranger' in an Amazônia / selva row has two defensible answers (lead ruling
// 2026-09-23: one global rule is cheaper than a per-locale one).
// Kept narrow, with the reason: dragonfly pond (a teacher says "by the pond"; FAR tables keep it off every
// rainforest / meadow stranger slot anyway); beaver pond (the lodge stands IN the pond — widening it to forest
// would leave the es base (selva, bosque, mar, lago) with no pond animal at all); squirrel forest; duck, swan,
// (heron excluded) pond (their sea coasts are the `coastal` rule); ostrich, lion, zebra, giraffe savanna; sloth, toucan,
// macaw, gorilla, orangutan rainforest; the sea animals ocean.
const ANIMALS = [
  // ocean
  { key: 'whale', pic: { theme: 'ocean life', noun: 'whale' }, kidName: 'whale', lives: ['ocean'], cetacean: true, notStrangerIn: ['rainforest'] },
  { key: 'dolphin', pic: { theme: 'ocean life', noun: 'dolphin' }, kidName: 'dolphin', lives: ['ocean'], cetacean: true, notStrangerIn: ['rainforest'] },
  { key: 'octopus', pic: { theme: 'ocean life', noun: 'octopus' }, kidName: 'octopus', lives: ['ocean'] },
  { key: 'starfish', pic: { theme: 'ocean life', noun: 'starfish' }, kidName: 'starfish', lives: ['ocean'] },
  { key: 'jellyfish', pic: { theme: 'ocean life', noun: 'jellyfish' }, kidName: 'jellyfish', lives: ['ocean'] },
  { key: 'shark', pic: { theme: 'ocean life', noun: 'shark' }, kidName: 'shark', lives: ['ocean'] },
  { key: 'clownfish', pic: { theme: 'ocean life', noun: 'clownfish' }, kidName: 'clownfish / Nemo', lives: ['ocean'] },
  { key: 'crab', pic: { theme: 'ocean life', noun: 'crab' }, kidName: 'crab', lives: ['ocean'] },
  { key: 'ray', pic: { theme: 'ocean life', noun: 'ray' }, kidName: 'stingray', lives: ['ocean'] },
  { key: 'seal-grey', pic: { theme: 'ocean life', noun: 'seal' }, kidName: 'seal (a BROWN seal)', lives: ['ocean', 'polar-arctic'], notWithWindow: ['polar'], lookalike: ['walrus', 'seal-white'] },
  // polar
  { key: 'seal-white', pic: { theme: 'zoo animals', noun: 'seal' }, kidName: 'baby seal (white pup)', lives: ['polar-arctic', 'ocean'], faces: ['odd'], oddRow: 'polar-arctic' },
  { key: 'walrus', pic: { theme: 'winter', noun: 'walrus' }, kidName: 'walrus', lives: ['polar-arctic', 'ocean'], lookalike: ['seal-grey'] },
  { key: 'narwhal', pic: { theme: 'ocean life', noun: 'narwhal' }, kidName: 'narwhal / unicorn whale', lives: ['polar-arctic', 'ocean'], faces: ['odd'], oddRow: 'polar-arctic', cetacean: true, notStrangerIn: ['rainforest'] },
  { key: 'penguin', pic: { theme: 'birds 2', noun: 'penguin' }, kidName: 'penguin', lives: ['polar-antarctic', 'ocean'], kind: 'bird' },
  // forest
  { key: 'deer', pic: { theme: 'forest creatures', noun: 'deer' }, kidName: 'deer / Bambi (a spotted fawn)', lives: ['forest', 'meadow'], panelCheck: 'de/sv/da/no/fi: a fawn in a meadow is a Nordic / German image' },
  { key: 'squirrel', pic: { theme: 'forest creatures', noun: 'squirrel' }, kidName: 'squirrel', lives: ['forest'] },
  { key: 'woodpecker', pic: { theme: 'forest creatures', noun: 'woodpecker' }, kidName: 'woodpecker', lives: ['forest', 'rainforest'], kind: 'bird' },
  { key: 'badger', pic: { theme: 'forest creatures', noun: 'badger' }, kidName: 'badger', lives: ['forest', 'meadow'] },
  { key: 'moose', pic: { theme: 'animals', noun: 'moose' }, kidName: 'moose (palmate antlers)', lives: ['forest', 'pond'], notWithWindow: ['pond'] },
  // pond
  { key: 'frog', pic: { theme: 'forest creatures', noun: 'frog' }, kidName: 'frog', lives: ['pond', 'meadow', 'forest', 'rainforest'] },
  { key: 'dragonfly', pic: { theme: 'forest creatures', noun: 'dragonfly' }, kidName: 'dragonfly', lives: ['pond'], kind: 'insect', noStranger: 'hunts over every wet meadow, savanna waterhole and rainforest stream' },
  { key: 'beaver', pic: { theme: 'forest creatures', noun: 'beaver' }, kidName: 'beaver', lives: ['pond'], why: 'fix round 2 (nl landing panel: a forest window is a defensible second answer) REFUSED as a rule, measured: notWithWindow forest leaves the de/sv/da/no/fi fixed set (forest, meadow, pond, ocean) a capacity of 7 < 8 animals (forest squirrel + woodpecker, meadow grasshopper, pond dragonfly, ocean <= 3) and the base refuses in five locales; the lodge stands IN the water (K-383), the pond is the one best answer — open item for the lead' },
  { key: 'duck', pic: { theme: 'birds 2', noun: 'duck' }, kidName: 'duck / duckling (yellow)', lives: ['pond'], coastal: true, kind: 'bird', faces: ['adapt'], why: 'fix round 2 (de/es/fr/en landing panels): every duck picture in the library (animals/duck, birds 2/duck, Things That Fly/duck — all opened) is a yellow DUCKLING that children call a chick (a farm answer): off the base and F2, where a chick is a stranger / has no window; kept on F3, whose claim (webbed feet) the drawn orange feet answer', noStranger: 'water birds live wherever there is water: African waterholes, the Amazon, Arctic tundra', panelCheck: 'may be named "chick" (a farm answer; no farm window on any page)' },
  { key: 'swan', pic: { theme: 'birds 2', noun: 'swan' }, kidName: 'swan', lives: ['pond'], coastal: true, kind: 'bird', noStranger: 'swans breed on the Arctic tundra' },
  // meadow
  { key: 'butterfly', pic: { theme: 'forest creatures', noun: 'butterfly' }, kidName: 'butterfly', lives: ['meadow', 'forest', 'rainforest', 'savanna', 'pond'], kind: 'insect' },
  { key: 'bee', pic: { theme: 'forest creatures', noun: 'bee' }, kidName: 'bee', lives: ['meadow', 'forest', 'rainforest', 'savanna'], kind: 'insect' },
  { key: 'grasshopper', pic: { theme: 'forest creatures', noun: 'grasshopper' }, kidName: 'grasshopper', lives: ['meadow', 'savanna'], kind: 'insect' },
  { key: 'ladybug', pic: { theme: 'forest creatures', noun: 'ladybug' }, kidName: 'ladybug', lives: ['meadow', 'forest'], kind: 'insect' },
  // savanna
  { key: 'lion', pic: { theme: 'zoo animals', noun: 'lion' }, kidName: 'lion', lives: ['savanna'] },
  { key: 'zebra', pic: { theme: 'zoo animals', noun: 'zebra' }, kidName: 'zebra', lives: ['savanna'] },
  { key: 'giraffe', pic: { theme: 'zoo animals', noun: 'giraffe' }, kidName: 'giraffe', lives: ['savanna'] },
  { key: 'elephant', pic: { theme: 'zoo animals', noun: 'elephant' }, kidName: 'elephant (a baby, big ears)', lives: ['savanna', 'rainforest'], notWithWindow: ['rainforest'] },
  { key: 'rhinoceros', pic: { theme: 'zoo animals', noun: 'rhinoceros' }, kidName: 'rhino (pink, one big horn)', lives: ['savanna', 'rainforest'], notWithWindow: ['rainforest'] },
  { key: 'ostrich', pic: { theme: 'birds 2', noun: 'ostrich' }, kidName: 'ostrich', lives: ['savanna'], kind: 'bird' },
  // rainforest
  { key: 'monkey', pic: { theme: 'zoo animals', noun: 'monkey' }, kidName: 'monkey', lives: ['rainforest', 'savanna'], notWithWindow: ['savanna'], group: 'ape' },
  { key: 'gorilla', pic: { theme: 'zoo animals', noun: 'gorilla' }, kidName: 'gorilla', lives: ['rainforest'], group: 'ape' },
  { key: 'orangutan', pic: { theme: 'zoo animals', noun: 'orangutan' }, kidName: 'orangutan / monkey', lives: ['rainforest'], group: 'ape' },
  { key: 'sloth', pic: { theme: 'zoo animals', noun: 'sloth' }, kidName: 'sloth', lives: ['rainforest'], region: 'americas', onlyRegion: 'americas', notWithWindow: ['savanna'], why: 'fix round 2 (fr landing panel): the orange upright sitting sloth reads as a MEERKAT (a savanna animal) — opened beside zoo animals/meerkat at 220 px, the same pose; it stands only on pages of an americas-rainforest locale (pt Amazônia: the bicho-preguiça is a known animal, and its F2 rainforest row needs it) and never with a savanna window' },
  { key: 'toucan', pic: { theme: 'birds 2', noun: 'toucan' }, kidName: 'toucan', lives: ['rainforest'], region: 'americas', kind: 'bird' },
  { key: 'macaw', pic: { theme: 'birds 2', noun: 'macaw' }, kidName: 'parrot (yellow body, green wing)', lives: ['rainforest'], region: 'americas', kind: 'bird' },
  // F3 only
  { key: 'camel', pic: { theme: 'animals', noun: 'camel' }, kidName: 'camel (one hump)', lives: ['desert'], faces: ['adapt'] },
].map((a) => ({ picOpened: true, coastal: false, lookalike: [], group: null, region: null, panelCheck: null, notWithWindow: [], faces: null, oddRow: null, kind: null, noStranger: null, cetacean: false, notStrangerIn: [], onlyRegion: null, why: null, ...a }));

const HABITATS = {
  HABITAT_KEYS: ['ocean', 'pond', 'forest', 'meadow', 'polar-arctic', 'polar-antarctic', 'savanna', 'rainforest'],
  // the camel's desert is a LIFE fact (F3), never a window: no pool, no tile (§3 rejected non-moves)
  EXTRA_LIVES: ['desert'],
  TILE_OF: { 'polar-arctic': 'polar', 'polar-antarctic': 'polar' },
  NEAR: [['ocean', 'pond'], ['forest', 'rainforest'], ['savanna', 'meadow']],
  FAR: {
    forest: ['ocean', 'polar-arctic', 'polar-antarctic', 'savanna'], ocean: ['forest', 'meadow', 'savanna', 'rainforest'],
    pond: ['savanna', 'rainforest', 'polar-arctic', 'polar-antarctic'], meadow: ['ocean', 'polar-arctic', 'polar-antarctic', 'rainforest'],
    'polar-arctic': ['forest', 'meadow', 'savanna', 'rainforest'], savanna: ['ocean', 'pond', 'polar-arctic', 'polar-antarctic'],
    rainforest: ['ocean', 'polar-arctic', 'polar-antarctic', 'meadow'],
  },
  ANIMALS,
  // opened and refused (§5); the validator asserts none reaches a page (P3, P5, P13, P14)
  EXCLUDED: [
    { theme: 'forest creatures', noun: 'wolf', why: 'reads as a husky or a grey fox' },
    { theme: 'zoo animals', noun: 'jaguar', why: 'three near-identical spotted cats from two habitats' },
    { theme: 'zoo animals', noun: 'cheetah', why: 'three near-identical spotted cats from two habitats' },
    { theme: 'zoo animals', noun: 'leopard', why: 'three near-identical spotted cats from two habitats' },
    { theme: 'forest creatures', noun: 'bear', why: 'a teddy-like cub with a collar; not a native Wald animal' },
    { theme: 'zoo animals', noun: 'gazelle', why: 'reads as the deer' },
    { theme: 'zoo animals', noun: 'antelope', why: 'reads as the deer' },
    { theme: 'zoo animals', noun: 'reindeer', why: 'deer look' },
    { theme: 'forest creatures', noun: 'moose', why: 'reads as a reindeer (animals/moose is the moose)' },
    { theme: 'zoo animals', noun: 'chimpanzee', why: 'reads as the monkey or the gorilla; lives in savanna woodland too' },
    { theme: 'zoo animals', noun: 'otter', why: 'reads as a weasel' },
    { theme: 'birds 2', noun: 'parrot', why: 'the same yellow bird as birds 2/macaw' },
    { theme: 'birds', noun: 'parrot', why: 'the same yellow bird as birds 2/macaw' },
    { theme: 'birds', noun: 'macaw', why: 'the same yellow bird as birds 2/macaw' },
    { theme: 'ocean life', noun: 'squid', why: 'octopus look-alike' },
    { theme: 'ocean life', noun: 'orca', why: 'whale look-alike, polar AND ocean' },
    { theme: 'ocean life', noun: 'sea_turtle', why: 'vocab key NULL (no name, no alt)' },
    { theme: 'toys', noun: 'teddy_bear', why: 'vocab key NULL; a toy' },
    { theme: 'zoo animals', noun: 'polar_bear', why: 'vocab key NULL' },
    { theme: 'winter', noun: 'polar_bear', why: 'vocab key NULL' },
    { theme: 'insects and bugs', noun: 'worm', why: 'reads as a smiling snake' },
    { theme: 'forest creatures', noun: 'earthworm', why: 'reads as a smiling snake' },
    { theme: 'birds 2', noun: 'heron', why: 'fix round 1: reads as a STORK to Nordic children and as a cigogne to French ones (sv/da/no/fi/fr panels) — a stork is not a pond animal' },
    { theme: 'forest creatures', noun: 'rabbit', why: 'fix round 2 (de landing panel): a lanky long-eared orange HARE (Feldhase) — a hare lies in a form and never digs a burrow; animals/rabbit (compact, beige, white bib, cotton tail) is the burrow rabbit' },
    { theme: 'camping', noun: 'rabbit', why: 'fix round 2: the same lanky orange hare as forest creatures/rabbit' },
    { theme: 'spring', noun: 'nest', why: 'two chicks inside; every home is drawn' },
    { theme: 'spring', noun: 'birdhouse', why: 'a human home' },
    { theme: 'winter', noun: 'igloo', why: 'a human home' },
  ],
  // animal keys refused by name (several habitats, or a naming clash) — none may be added to ANIMALS
  EXCLUDED_KEYS: ['heron', 'stork', 'fox', 'owl', 'hedgehog', 'raccoon', 'snail', 'mouse', 'toad', 'salamander', 'chameleon', 'hyena', 'meerkat',
    'puffin', 'stork', 'tiger', 'hippopotamus', 'koala', 'panda', 'wolf', 'bear', 'jaguar', 'cheetah', 'leopard', 'squid', 'orca',
    'chimpanzee', 'otter', 'gazelle', 'antelope', 'reindeer', 'parrot', 'polar_bear', 'sea_turtle'],
  REFUSED_THEMES: ['pets', 'farm animals'],
  // F1 / F4 (Phase E)
  HOMES: { bird: 'nest', bee: 'hive', spider: 'web', rabbit: 'burrow', ant: 'anthill', beaver: 'lodge' },
  HOME_PICS: {
    bird: { theme: 'spring', noun: 'bird' }, bee: { theme: 'forest creatures', noun: 'bee' }, spider: { theme: 'forest creatures', noun: 'spider' },
    rabbit: { theme: 'animals', noun: 'rabbit' }, ant: { theme: 'forest creatures', noun: 'ant' }, beaver: { theme: 'forest creatures', noun: 'beaver' },
  },
  HOMES_REFUSED: ['cave', 'tree-hole', 'birdhouse', 'igloo', 'kennel', 'hutch', 'den'],
  ADAPT: [
    { key: 'camel-hump', trueOf: ['camel'] }, { key: 'giraffe-neck', trueOf: ['giraffe'], answers: [], why: 'both giraffe pictures are CALVES with a short neck' }, { key: 'elephant-trunk', trueOf: ['elephant'] },
    { key: 'penguin-flippers', trueOf: ['penguin'] }, { key: 'walrus-tusks', trueOf: ['walrus'] }, { key: 'woodpecker-beak', trueOf: ['woodpecker'] },
    { key: 'beaver-teeth', trueOf: ['beaver'] }, { key: 'whale-blowhole', trueOf: ['whale', 'dolphin', 'narwhal'], answers: [], why: 'no blowhole is drawn on the whale or the dolphin' },
    { key: 'fish-gills', trueOf: ['clownfish', 'shark', 'ray', 'octopus', 'crab'], answers: [], why: 'no gills are drawn on the clownfish, the shark or the ray' }, { key: 'duck-feet', trueOf: ['duck', 'swan', 'frog', 'beaver', 'penguin'], answers: ['duck'] },
    { key: 'sloth-claws', trueOf: ['sloth'], answers: [], why: 'the sitting sloth shows no long claws' }, { key: 'toucan-beak', trueOf: ['toucan', 'macaw'], answers: ['toucan'] }, { key: 'squirrel-tail', trueOf: ['squirrel', 'monkey'], answers: ['squirrel'] },
  ],
  // trueOf widened at the face build (2026-09-23, hand-read, conservative): octopus and crab ALSO breathe with
  // gills; a macaw ALSO picks fruit with a big beak — each would be a second right answer on one page.
  // `answers` (default = trueOf) = the animals a claim may be ASKED about; trueOf = everything it is true of
  // (the exclusivity set). The toucan claim is the toucan's, never answered by the macaw.
  // fix round 1 (2026-09-23): every ANSWER picture was re-opened at 150 px — the drawn animal must SHOW the trait.
  // Shown: camel hump, elephant trunk (a calf, trunk drawn), penguin flippers, walrus tusks, woodpecker beak,
  // beaver front teeth, duckling's webbed orange feet (the swan's feet are hidden -> not an answer), toucan beak,
  // squirrel's bushy tail. `answers: []` keeps a claim's literal in the bank but never on a page.
  ADAPT_BANNED: ['hump-water', 'fat-warm', 'stripes', 'chameleon', 'is-fish', 'cheetah'],
  NEEDS: {
    bee: { food: 'flower', home: 'hive', neverEats: ['mosquito', 'grass', 'leaf'], neverHome: ['web', 'lodge'] },
    spider: { food: 'mosquito', home: 'web', neverEats: ['flower', 'grass', 'leaf'], neverHome: ['hive', 'lodge'] },
    rabbit: { food: 'grass', home: 'burrow', neverEats: ['mosquito'], neverHome: ['web', 'hive', 'lodge', 'nest'] },
    beaver: { food: 'leaf', home: 'lodge', neverEats: ['mosquito'], neverHome: ['web', 'hive', 'nest'] },
    bird: { food: 'mosquito', home: 'nest', neverEats: ['grass', 'leaf'], neverHome: ['web', 'hive', 'lodge'] },
  },
  FOOD_PICS: {
    flower: { theme: 'spring', noun: 'flower' }, mosquito: { theme: 'insects and bugs', noun: 'mosquito' },
    grass: { theme: 'spring', noun: 'grass' }, leaf: { theme: 'spring', noun: 'leaf' },
  },
  // G1-202 / G2-318 printed strings the titles and instructions must never equal (Boundary, m)
  G1_202_EN: { title: 'Where Do Animals Live?', instruction: 'Draw a line from each animal to where it lives.' },
  LAYOUTS: ['homes', 'odd', 'adapt', 'needs', 'report'],
  // F5 (fix round 1, de panel): only a word pair with a TRUE answer for the habitat is offered; the report
  // habitat is the first set member with at least one true pair (forest and meadow have none: a forest is
  // neither hot nor cold, wet nor dry for a child to circle honestly)
  // fix round 2 (en/de/fr/nl landing panels: "circle the right word in each pair" over ONE printed pair): the report
  // prints exactly d.chipPairs pairs, taken in this order among the habitat's TRUE pairs; the habitat is the first set
  // member with at least that many (1 on the shipped face: ocean / pond / rainforest -> wet, savanna -> dry, polar -> cold)
  CHIP_ORDER: { ocean: ['wet'], pond: ['wet'], polar: ['temp'], savanna: ['wet', 'temp'], rainforest: ['wet', 'temp'], forest: [], meadow: [] },
  // fix round 2 (de landing panel on G1-406: every stranger was an exotic zoo animal, so a row solved by "not an animal of
  // my country" without reading the habitat): at least one F2 stranger per page lives in one of these (the child's own
  // temperate places), standing in a row of a far habitat — a squirrel in the ocean row, a beaver in the savanna row
  TEMPERATE: ['forest', 'meadow', 'pond'],
  CHIP_TRUTH: { ocean: { wet: 'wet' }, pond: { wet: 'wet' }, polar: { temp: 'cold' }, savanna: { temp: 'hot', wet: 'dry' }, rainforest: { temp: 'hot', wet: 'wet' }, forest: {}, meadow: {} },
  FACE_IDS: { homes: 'K-383', odd: 'G1-406', adapt: 'G2-380', needs: 'G1-407', report: 'G2-381' },
};

module.exports = { HABITATS_LOC, HABITATS };
