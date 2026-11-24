/**
 * dk-g3.js — the bank of the Batch 3 Grade 3 science and health pages (Daily Teaching System Stage D-5, 2026-11-24;
 * factories types/_shared/dk-g3.js + dk-g3-health.js, gate qa/verify-dk-g3.js). English only.
 *
 * Every library picture here was OPENED at print size on a contact sheet (lcs-stage-d/batch-3/work/c*.png) before it was
 * placed; colour themes only. What the library cannot show (or shows as something else) is drawn by the factory in
 * simple shapes and listed in the result for the reviewer: `draw: '<kind>'`. Refused pictures are listed in REFUSED with
 * why, and the gate refuses them. The CLOSED items carry their answer here; the gate re-derives every one from its OWN
 * tables, never from this file.
 */
'use strict';
const P = (theme, noun) => ({ theme, noun });

/* ---------------------------------------------------------------- forces and motion (G3-581 .. G3-583) */
// G3-581: each scene says what the forces are; the child decides balanced or not and what the object does
const FORCE_SCENES = [
  { id: 'tug', label: 'Two children pull a rope. Both pull equally hard.', forces: 'balanced', motion: 'still', arrows: [['left', 3], ['right', 3]] },
  { id: 'book', label: 'A book rests on a table.', forces: 'balanced', motion: 'still', arrows: [['down', 2], ['up', 2]] },
  { id: 'bag', label: 'A bag hangs from a hook.', forces: 'balanced', motion: 'still', arrows: [['down', 2], ['up', 2]] },
  { id: 'kick', label: 'A foot kicks a ball that was sitting still.', forces: 'unbalanced', motion: 'moves', arrows: [['right', 3]] },
  { id: 'wagon', label: 'A child pulls a wagon hard. Only a small force pulls back on it.', forces: 'unbalanced', motion: 'moves', arrows: [['right', 3], ['left', 1]] },
  { id: 'box', label: 'Two children push a box from opposite sides. One pushes much harder.', forces: 'unbalanced', motion: 'moves', arrows: [['right', 4], ['left', 1]] },
];
// G3-582: string lengths (inches) and the count the pattern gives (one swing = over and back, 15 seconds; physics:
// T = 2 pi sqrt(L / g): 12 in -> 1.11 s -> about 13; 9 in -> 0.96 s -> about 15; 6 in -> 0.78 s -> about 19)
const PENDULUM_STRINGS = [{ id: 'long', inches: 12 }, { id: 'middle', inches: 9 }, { id: 'short', inches: 6 }];
// G3-583: the ramp surfaces (drawn swatches)
const SURFACES = [{ id: 'tile', label: 'tile floor' }, { id: 'carpet', label: 'carpet' }, { id: 'sandpaper', label: 'sandpaper' }];

/* ---------------------------------------------------------------- magnets and static (G3-584 .. G3-588) */
// G3-584: the balloon tests (a record: the class's own results); the last is the control (a balloon NOT rubbed)
const STATIC_TESTS = [
  { id: 'paper', label: 'a rubbed balloon near tiny bits of paper', draw: 'balloon-paper' },
  { id: 'water', label: 'a rubbed balloon near a thin stream of tap water', draw: 'balloon-water' },
  { id: 'balloon', label: 'a rubbed balloon near another rubbed balloon', draw: 'balloon-balloon' },
  { id: 'unrubbed', label: 'a balloon we did NOT rub, near tiny bits of paper', draw: 'balloon-plain' },
];
// G3-585: the objects (what each is made of is printed; the gate's own table decides pulled or not)
const MAGNET_OBJECTS = [
  { id: 'paper-clip', label: 'paper clip', made: 'steel', draw: 'paper-clip', pulled: true },
  { id: 'nail', label: 'nail', made: 'steel', pic: P('tools', 'nail'), pulled: true },
  { id: 'scissors', label: 'scissors', made: 'steel and plastic', pic: P('classroom', 'scissors'), pulled: true },
  { id: 'washer', label: 'washer', made: 'steel', draw: 'washer', pulled: true },
  { id: 'safety-pin', label: 'safety pin', made: 'steel', draw: 'safety-pin', pulled: true },
  { id: 'bottle-cap', label: 'bottle cap', made: 'steel', draw: 'bottle-cap', pulled: true },
  { id: 'foil', label: 'aluminum foil', made: 'aluminum', draw: 'foil-ball', pulled: false },
  { id: 'penny', label: 'penny', made: 'copper and zinc', draw: 'penny', pulled: false },
  { id: 'brass-key', label: 'brass key', made: 'brass', draw: 'brass-key', pulled: false },
  { id: 'spoon', label: 'wooden spoon', made: 'wood', draw: 'wood-spoon', pulled: false },   // review round 1: drawn all wood (the library spoon has a red plastic-looking handle)
  { id: 'eraser', label: 'eraser', made: 'rubber', pic: P('classroom', 'eraser'), pulled: false },
  { id: 'button', label: 'button', made: 'plastic', draw: 'button', pulled: false },
];
// G3-586: what the pull goes through (a record: the class tests it)
const THROUGH = [{ id: 'paper', label: 'a sheet of paper' }, { id: 'cardboard', label: 'cardboard' }, { id: 'water', label: 'a plastic cup of water' }, { id: 'book', label: 'a thick book' }];
// G3-587: the problems magnets could help with (drawn), and the criteria chips (level 1 circles the ones for its problem)
const MAGNET_PROBLEMS = [
  { id: 'door', label: 'A cabinet door keeps swinging open.', draw: 'door-open' },
  { id: 'cans', label: 'A box of steel cans and aluminum cans must be sorted.', draw: 'cans' },
  { id: 'needle', label: 'A sewing needle is lost in the rug.', draw: 'needle-rug' },
];
const MAGNET_CRITERIA = ['holds the door shut', 'still opens easily', 'pulls out only the steel cans', 'finds the needle fast', 'is safe for small hands'];
/** the limits (constraints) circled at level 1 of both planners and scored on G3-588 (review round 1: not among the criteria) */
const LIMITS = ['costs very little', 'uses only things in our classroom'];

/* ---------------------------------------------------------------- weather and climate (G3-589 .. G3-593) */
// G3-590: Seattle, Washington: average daily high (°F) and rain (inches), rounded from the 1991-2020 NOAA normals for
// Seattle-Tacoma (highs to the whole degree, rain to the whole inch), checked in review round 1 against the NOAA values:
// highs 48.0 50.3 54.2 59.3 66.3 71.1 77.4 77.6 71.6 60.5 52.1 47.0 °F; rain 5.78 3.76 4.17 3.18 1.88 1.45 0.60 0.97 1.61
// 3.91 6.31 5.72 inches. Seattle, not Chicago: in
// Chicago the warmest and the wettest season are the same (summer), so level 3's "compare the warmest and the wettest
// seasons" had nothing to compare; in Seattle summer is warmest and driest, winter is wettest (16 inches against 3).
const CITY = {
  name: 'Seattle, Washington',
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  high: [48, 50, 54, 59, 66, 71, 77, 78, 72, 61, 52, 47],
  rain: [6, 4, 4, 3, 2, 1, 1, 1, 2, 4, 6, 6],
};
const SEASON_WORDS = ['hot', 'warm', 'cool', 'cold', 'snowy', 'rainy', 'dry', 'sunny', 'windy', 'mild'];
// G3-591: four places; average daily high (°F) and rain (inches) per month, rounded and plausible (the cold place's
// winter highs are below 0 °F: printed as a note, the bars start at 0). The gate's own table decides each sort.
const CLIMATE_PLACES = [
  { id: 'alaska', label: 'Utqiagvik, northern Alaska', lat: 71.3, lon: -156.8, high: [-7, -10, -7, 7, 26, 39, 47, 43, 34, 20, 5, -4], rain: [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0], belowZeroNote: true },
  { id: 'miami', label: 'Miami, Florida', lat: 25.8, lon: -80.2, high: [76, 78, 80, 83, 87, 89, 91, 91, 89, 86, 82, 78], rain: [2, 2, 3, 3, 6, 10, 7, 9, 10, 8, 3, 2] },
  { id: 'sahara', label: 'Tamanrasset, in the Sahara', lat: 22.8, lon: 5.5, high: [68, 72, 79, 86, 92, 96, 95, 94, 91, 84, 76, 70], rain: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { id: 'amazon', label: 'Manaus, in the Amazon rain forest', lat: -3.1, lon: -60.0, high: [87, 87, 87, 87, 88, 89, 90, 92, 92, 92, 91, 89], rain: [10, 11, 12, 11, 9, 4, 3, 2, 3, 4, 7, 9] },
];
const CLIMATE_SORT = ['hot and dry', 'hot and wet', 'cold'];
// G3-592: hazards (drawn) and criteria chips; G3-593: the real examples
const HAZARDS = [
  { id: 'flood', label: 'a flood', draw: 'hazard-flood' }, { id: 'wind', label: 'high wind', draw: 'hazard-wind' },
  { id: 'blizzard', label: 'a blizzard', draw: 'hazard-blizzard' }, { id: 'lightning', label: 'lightning', draw: 'hazard-lightning' },
];
const HAZARD_CRITERIA = ['keeps water out of the school', 'keeps the playground safe', 'keeps the path to the door clear', 'protects people outside', 'is strong enough for a storm'];
const REAL_EXAMPLES = [{ id: 'posts', label: 'a house raised on posts' }, { id: 'levee', label: 'a levee (a wall of earth along a river)' }, { id: 'shelter', label: 'a storm shelter' }, { id: 'rod', label: 'a lightning rod' }, { id: 'windbreak', label: 'a row of trees to block the wind' }];

/* ---------------------------------------------------------------- life cycles and traits (G3-594 .. G3-596) */
const BEETLE_STAGES = ['egg', 'larva', 'pupa', 'adult beetle'];
// G3-595: the dog family (new drawings); each animal's traits are drawn exactly as listed (the gate checks the stamps)
const DOGS = [
  { id: 'mother', label: 'mother', fur: 'brown', ears: 'floppy', spots: 'no' },
  { id: 'father', label: 'father', fur: 'white', ears: 'pointed', spots: 'yes' },
  { id: 'pup1', label: 'puppy 1', fur: 'brown', ears: 'pointed', spots: 'no' },
  { id: 'pup2', label: 'puppy 2', fur: 'white', ears: 'floppy', spots: 'yes' },
  { id: 'pup3', label: 'puppy 3', fur: 'brown', ears: 'floppy', spots: 'yes' },
  { id: 'pup4', label: 'puppy 4', fur: 'white', ears: 'pointed', spots: 'no' },
  { id: 'pup5', label: 'puppy 5', fur: 'brown', ears: 'floppy', spots: 'no' },
];
// Every cat is striped (a tabby); the traits are fur color and white paws. The kittens' father (named, not drawn) is an
// brown tabby without white paws, so every kitten's two traits come from one parent or the other (no "plain" kitten
// and no orange kitten: orange rides on the X chromosome, so a gray mother does not have solid orange kittens; gray is
// the recessive dilute of brown, and white paws are dominant: both can skip as drawn)
// whose coat no parent shows: a teacher could ask where it came from).
const CAT_FATHER = 'The kittens’ father is a brown tabby with no white paws.';
const CATS = [
  { id: 'mother', label: 'mother cat', fur: 'gray', paws: 'yes' },
  { id: 'kit1', label: 'kitten 1', fur: 'gray', paws: 'yes' },
  { id: 'kit2', label: 'kitten 2', fur: 'brown', paws: 'no' },
  { id: 'kit3', label: 'kitten 3', fur: 'gray', paws: 'no' },
];
// G3-596: the two bean plants (same kind) and the eight traits to sort (the gate's own table decides each)
const BEAN_PLANTS = [{ id: 'plenty', label: 'watered every day', inches: 10, leaves: 12 }, { id: 'little', label: 'watered once a week', inches: 4, leaves: 5 }];
const DOG_TEXT = 'Max is a beagle. He was born with long, floppy ears and brown and white fur. Max got heavy because he ate too much food and did not get much exercise.';
const TRAITS = [
  { id: 'spots', label: 'a puppy born with spotted fur', from: 'parents' },
  { id: 'longfur', label: 'a kitten born with long, fluffy fur', from: 'parents' },
  { id: 'ears', label: "Max's long, floppy ears", from: 'parents' },
  { id: 'flower', label: 'the color of a bean plant\'s flowers', from: 'parents' },
  { id: 'heavy', label: 'Max got heavy from too much food and little exercise', from: 'environment' },
  { id: 'short', label: 'a bean plant that stayed short with too little water', from: 'environment' },
  { id: 'pale', label: 'a plant with pale leaves after a week in a dark closet', from: 'environment' },
  { id: 'bent', label: 'a tree that grew bent by strong winds', from: 'environment' },
];

/* ---------------------------------------------------------------- surviving in a changing world (G3-597 .. G3-601) */
// G3-597: the group animals; `helps` = what the card's own text says (the gate's own table decides)
const GROUP_ANIMALS = [
  { id: 'wolves', label: 'wolves', pic: P('zoo animals', 'wolf'), text: 'Wolves live in a pack. They hunt together, so they can catch big animals like deer that one wolf could not catch alone.', helps: ['find food'], works: 'They hunt together as a pack.' },
  { id: 'bees', label: 'honeybees', pic: P('insects and bugs', 'bee'), text: 'Honeybees live in a hive. Some bees gather food for all of them, and others guard the door from enemies.', helps: ['find food', 'stay safe'], works: 'Some bees gather food and some guard the hive.' },
  { id: 'geese', label: 'Canada geese', draw: 'geese-v', text: 'Canada geese fly in a V. Each goose flies just behind and beside another goose, where the air is pushed up. This helps the flock use less energy.', helps: ['save energy'], works: 'They fly in a V, each one behind another.' },
  { id: 'fish', label: 'a school of fish', draw: 'fish-school', text: 'Small fish swim close together in a school. A hunting fish has trouble picking out one fish to catch.', helps: ['stay safe'], works: 'They swim close together.' },
];
const GROUP_HELPS = ['find food', 'stay safe', 'save energy'];
const MOTH_COLORS = ['green', 'gray', 'red', 'yellow'];
const MOTH_BACKGROUNDS = [{ id: 'news', label: 'newspaper' }, { id: 'lawn', label: 'green lawn' }];
// G3-599: the desert and its cards; each card names what the living thing needs (the gate's own table decides the column)
const DESERT = 'The desert: very little rain, hot days and cold nights. The only water is one small water hole. In the summer it gets very small and shallow. Plants that need water often can grow only right next to the water hole.';   // review round 2: the sunflower's column follows from the card
const DESERT_CARDS = [
  { id: 'cactus', label: 'cactus', needs: 'stores water in its thick stem', draw: 'cactus', col: 'well' },
  { id: 'camel', label: 'camel', needs: 'can go many days without drinking', pic: P('zoo animals', 'camel'), col: 'well' },
  { id: 'tortoise', label: 'desert tortoise', needs: 'stores water in its body and hides in a burrow', pic: P('reptiles and Amphibians', 'tortoise'), col: 'well' },
  { id: 'horse', label: 'horse', needs: 'must drink water every day', pic: P('farm animals', 'horse'), col: 'less' },
  { id: 'sunflower', label: 'sunflower', needs: 'needs water often', pic: P('flowers', 'sunflower'), col: 'less' },
  { id: 'goldfish', label: 'goldfish', needs: 'must swim in deep water all year', pic: P('pets', 'goldfish'), col: 'not' },
  { id: 'water-lily', label: 'water lily', needs: 'needs a deep pond that never dries up', pic: P('flowers', 'water_lily'), col: 'not' },
  { id: 'polar-bear', label: 'polar bear', needs: 'needs cold, ice and snow to hunt and stay cool', pic: P('zoo animals', 'polar_bear'), col: 'not' },
];
const SURVIVE_COLS = { well: 'survives well', less: 'survives less well', not: 'cannot survive' };
// G3-600: the fossils (drawn, and named on the card so a fan-shaped shell and a fan-shaped palm leaf cannot be mixed
// up). "What lived here" asks what KIND of living thing (a water animal / a land plant), an inference the card does not
// print; "then" says "under water", not "under the sea" (a fish or a shell fossil can come from a lake). Level 1 circles
// one answer per column from mutually exclusive options (the gate's own table decides).
const FOSSILS = [
  { id: 'fish', label: 'a fish fossil found high on a mountain', draw: 'fossil-fish', lived: 'a water animal', then: 'under water', now: 'a high, dry mountain' },
  { id: 'fern', label: 'a fern fossil found in Antarctica', draw: 'fossil-fern', lived: 'a land plant', then: 'a warm forest on land', now: 'cold and icy' },
  { id: 'shell', label: 'a seashell fossil found in a desert', draw: 'fossil-shell', lived: 'a water animal', then: 'under water', now: 'a hot, dry desert' },
  { id: 'palm', label: 'a palm leaf fossil found in a snowy place', draw: 'fossil-palm', lived: 'a land plant', then: 'a warm forest on land', now: 'cold and snowy in winter' },
];
const FOSSIL_LIVED = ['a water animal', 'a land plant', 'a land animal'];
const FOSSIL_THEN = ['under water', 'a warm forest on land', 'cold and icy'];   // mutually exclusive: one right per fossil
// G3-601: the habitat change and the two solutions
const CHANGE_TEXT = 'A new highway was built through a forest. Deer, foxes and turtles live on both sides. When they try to cross the road, many are hit by cars, and the animals on one side cannot reach the pond on the other side.';
const SOLUTIONS3 = [
  { id: 'bridge', label: 'a wildlife bridge over the highway, covered with soil and plants', draw: 'wildlife-bridge', helps: 'The animals cross over the road, away from cars, and can reach the pond.', costs: 'It costs a lot of money and takes a long time to build.' },
  { id: 'tunnel', label: 'a tunnel under the highway, with fences that lead the animals to it', draw: 'wildlife-tunnel', helps: 'The fences lead the animals under the road, away from cars, to the pond.', costs: 'It costs money, and some animals may not walk into a dark tunnel.' },
];

/* ---------------------------------------------------------------- health (G3-602 .. G3-611) */
// G3-602: the germ's trip; `stop` = a habit would stop the germ here (the gate's own table decides)
const GERM_FRAMES = [
  { id: 'sneeze', label: 'Ava sneezes into her hand.', stop: true, habit: 'sneeze into your elbow' },
  { id: 'handle', label: 'Ava does not wash her hands. She opens the door.', stop: true, habit: 'wash your hands with soap for 20 seconds' },
  { id: 'ben-door', label: 'Ben opens the same door to go to lunch.', stop: true, habit: 'wash your hands with soap for 20 seconds' },   // review round 1: a stop (the germ gets onto Ben's hands here)
  { id: 'mouth', label: 'Ben eats his snack without washing his hands.', stop: true, habit: 'wash your hands before you eat' },
  { id: 'bottle', label: 'Ben shares his water bottle with Cam.', stop: true, habit: 'use your own water bottle' },
  { id: 'cam', label: 'The germ gets to Cam.', stop: false, habit: null },
];
const GERM_L1 = ['sneeze', 'mouth', 'bottle'];
const HABITS = ['sneeze into your elbow', 'wash your hands with soap for 20 seconds', 'wash your hands before you eat', 'use your own water bottle'];   // review round 1: "stay home when you have a fever" fits no frame (the teacher note covers it)
// G3-603: MyPlate groups, the lunch cards (level 1) and the drinks (the gate's own table decides)
const GROUPS5 = ['fruits', 'vegetables', 'grains', 'protein', 'dairy'];
const LUNCH_CARDS = [
  { id: 'apple', label: 'apple', pic: P('fruits', 'apple'), group: 'fruits' }, { id: 'banana', label: 'banana', pic: P('fruits', 'banana'), group: 'fruits' },
  { id: 'carrot', label: 'carrot', pic: P('vegetables', 'carrot'), group: 'vegetables' }, { id: 'broccoli', label: 'broccoli', pic: P('vegetables', 'broccoli'), group: 'vegetables' },
  { id: 'bread', label: 'bread', pic: P('At the Supermarket', 'bread'), group: 'grains' }, { id: 'rice', label: 'rice', pic: P('At the Supermarket', 'rice'), group: 'grains' },
  { id: 'egg', label: 'egg', pic: P('At the Supermarket', 'egg'), group: 'protein' }, { id: 'fish', label: 'fish', pic: P('At the Supermarket', 'fish'), group: 'protein' },
  { id: 'milk', label: 'milk', pic: P('breakfast', 'milk'), group: 'dairy' }, { id: 'cheese', label: 'cheese', pic: P('breakfast', 'cheese'), group: 'dairy' },
];
const DRINKS = [
  { id: 'water', label: 'water', pic: P('At the Supermarket', 'water'), when: 'everyday' },
  { id: 'milk', label: 'milk', pic: P('At the Supermarket', 'milk'), when: 'everyday' },
  { id: 'soda', label: 'soda', pic: P('At the Supermarket', 'soda'), when: 'sometimes' },
];
// G3-605: the scenes (invented names; no product names); the gate's own table decides the influence and the direction
const INFLUENCE_SCENES = [
  { id: 'helmet', label: 'Max rides his bike to the park without a helmet. He tells Jay, "Helmets are for babies."', who: 'friends', way: 'less', draw: 'bike-no-helmet' },
  { id: 'ad', label: 'A TV ad shows kids laughing while they drink a big, sugary drink.', who: 'ads', way: 'less', draw: 'tv-ad' },
  { id: 'walk', label: "After dinner, Rosa's family goes for a walk around the block.", who: 'family', way: 'healthy', draw: 'family-walk' },
  { id: 'late', label: 'An online video says staying up very late to play a game is fun.', who: 'online videos', way: 'less', draw: 'video-late' },
  { id: 'fruit', label: 'At lunch, Mia shares orange slices with Kai and says they taste great.', who: 'friends', way: 'healthy', draw: 'share-oranges' },
  { id: 'smoothie', label: 'Sam watches an online video that shows an easy way to make a fruit smoothie.', who: 'online videos', way: 'healthy', draw: 'video-smoothie' },
];
const INFLUENCE_L1 = ['helmet', 'ad', 'walk'];
const INFLUENCES5 = ['family', 'friends', 'ads', 'online videos'];
// G3-608: situations and helpers (the gate's own table decides the match)
const HELPERS = [
  { id: 'nurse', label: 'the school nurse', draw: 'school-nurse' }, { id: 'counselor', label: 'the school counselor', draw: 'counselor' },
  { id: 'parent', label: 'a parent', draw: 'parent' }, { id: 'lifeguard', label: 'the lifeguard', pic: P('beach', 'lifeguard') },
  { id: '911', label: 'call 911', draw: 'phone-911' }, { id: 'store', label: 'a store worker at the checkout', pic: P('occupations', 'cashier') },
];
const SITUATIONS = [
  { id: 'stomach', label: 'a stomachache at school', helper: 'nurse' }, { id: 'worry', label: 'a worry at school that will not go away', helper: 'counselor' },
  { id: 'dream', label: 'a bad dream at night', helper: 'parent' }, { id: 'swim', label: 'a friend who cannot swim well, at the pool', helper: 'lifeguard' },
  { id: 'fire', label: 'a fire in a building', helper: '911' }, { id: 'lost', label: 'lost in a store', helper: 'store' },
  { id: 'left-out', label: 'a classmate who is left out again and again at school', helper: 'counselor' }, { id: 'headache', label: 'a headache at home', helper: 'parent' },
];
const SITUATIONS_L1 = ['stomach', 'dream', 'swim', 'lost'];
// G3-609 .. G3-611 (teacher-led)
const FEELING_SITUATIONS = [
  { id: 'line', label: 'Someone cut in front of me in line.' }, { id: 'seat', label: 'My friend did not save me a seat.' },
  { id: 'book', label: 'I lost my library book.' }, { id: 'team', label: 'I was picked last for a team.' },
];
const FEELINGS = [P('emotions', 'angry'), P('emotions', 'sad'), P('emotions', 'scared'), P('emotions', 'happy')];
const FEELING_WORDS = { angry: 'angry', sad: 'sad', scared: 'scared', happy: 'happy' };
/** G3-609 (review round 1): third-grade feeling words beyond the four faces, so every card has a fitting word */
const FEELING_MORE = ['worried', 'frustrated', 'disappointed', 'left out'];
const CALM_TOOLS = ['take three deep breaths', 'count slowly to 10', 'take a break in the calm corner', 'talk to a grown-up'];
const CONFLICT_STEPS = ['Cool down.', 'Each tell your side with an I-message.', 'Listen to the other side.', 'Think of solutions together.', 'Choose one that is fair to both.'];
const CONFLICT_SOLUTIONS = [
  { id: 'turns', label: 'take turns', fair: true }, { id: 'together', label: 'play together', fair: true }, { id: 'timer', label: 'use a timer and switch', fair: true },
  { id: 'grab', label: 'grab it first', fair: false }, { id: 'mean', label: 'say something mean', fair: false }, { id: 'quit', label: 'tell them to go away', fair: false },
];
const GROWN_UP_SORT = [
  { id: 'swing', label: 'We both want the same swing.', grownUp: false }, { id: 'rules', label: 'My friend keeps changing the rules of the game.', grownUp: false },
  { id: 'game', label: 'We cannot agree on which game to play.', grownUp: false }, { id: 'hurt', label: 'Someone got hurt.', grownUp: true },
  { id: 'hitting', label: 'Someone is hitting or pushing.', grownUp: true }, { id: 'threat', label: 'Someone says they will hurt someone.', grownUp: true },
];
// G3-611: both choices begin with "No" (a child must read for the CLEAR no, not spot the word); the wrong one gives in
const REFUSAL_SCENES = [
  { id: 'helmet', label: 'Dev dares you to ride your bike down the hill without a helmet.', no: 'No. I always wear my helmet.', yes: 'No… well, okay, just this once.' },
  { id: 'medicine', label: 'A friend offers you medicine from her backpack. It is not yours.', no: 'No. I only take medicine from my grown-up or the school nurse.', yes: 'No… okay, if you say it helps.' },
  { id: 'leave-out', label: 'Your friends want to play a game and leave out the new kid.', no: 'No. Everyone can play.', yes: 'No… okay, we can play without her.' },
];
const REFUSAL_MOVES = ['Say no clearly.', 'Give a reason.', 'Suggest something else.', 'Walk away and tell a trusted adult.'];

/* ---------------------------------------------------------------- refused pictures (opened, and why) */
const REFUSED = {
  'around the house/spoon': 'a red plastic-looking handle: not a wooden spoon',
  'hospital/nurse': 'an old-style cap with a red cross (US school nurses wear scrubs; the emblem is protected)',
  'tools/bolt': 'a gold bolt: reads as brass, not steel', 'tools/nut': 'a red and gold nut: reads as painted, not steel',
  'around the house/key': 'a pink key: not a brass key and not steel', 'At the Supermarket/can': 'a food can: steel, but children say "cans are aluminum"',
  'farm animals/goose': 'a white farm goose, not a Canada goose', 'Things That Fly/goose': 'a white farm goose, not a Canada goose', 'birds 2/goose': 'a white farm goose, not a Canada goose',
  'camping/rope': 'a looped rope on a stake: not a tug-of-war rope', 'around the house/telephone': 'an old dial phone',
  'emotions/content': 'reads as happy (two answers with happy)', 'zoo animals/tiger': 'a tiger on a cereal box recalls a real mascot',
  'zoo animals/sloth': 'reads as a red panda', 'occupations/coach': 'a child in a cap: reads as a friend', 'emotions/tired': 'red cheeks: reads as sick',
};

module.exports = {
  FORCE_SCENES, PENDULUM_STRINGS, SURFACES, STATIC_TESTS, MAGNET_OBJECTS, THROUGH, MAGNET_PROBLEMS, MAGNET_CRITERIA, LIMITS,
  CITY, SEASON_WORDS, CLIMATE_PLACES, CLIMATE_SORT, HAZARDS, HAZARD_CRITERIA, REAL_EXAMPLES, BEETLE_STAGES, DOGS, CATS,
  CAT_FATHER, BEAN_PLANTS, DOG_TEXT, TRAITS, GROUP_ANIMALS, GROUP_HELPS, MOTH_COLORS, MOTH_BACKGROUNDS, DESERT, DESERT_CARDS, SURVIVE_COLS,
  FOSSILS, FOSSIL_LIVED, FOSSIL_THEN, CHANGE_TEXT, SOLUTIONS3, GERM_FRAMES, GERM_L1, HABITS, GROUPS5, LUNCH_CARDS, DRINKS, INFLUENCE_SCENES,
  INFLUENCE_L1, INFLUENCES5, HELPERS, SITUATIONS, SITUATIONS_L1, FEELING_SITUATIONS, FEELINGS, FEELING_WORDS, FEELING_MORE, CALM_TOOLS,
  CONFLICT_STEPS, CONFLICT_SOLUTIONS, GROWN_UP_SORT, REFUSAL_SCENES, REFUSAL_MOVES, REFUSED,
};
