/**
 * lineart-scenes.js — the 100 Color by Number scenes, built from the image library's line drawings on a ground in a
 * frame, like the operator's duck-pond and elephant-meadow reference sheets. Units 600 × 560; an item stands with its
 * bottom on y (anchor 'c': centred on y); h = the drawing's ink height. The sky, the ground and named areas (pond,
 * sea, road) are fixed parts found by a point inside them.
 */
'use strict';
const hz = (y) => ({ d: `M-20 ${y} C150 ${y - 16} 450 ${y + 16} 620 ${y}` });
const SUN = { src: 'beach bw/sun', x: 515, y: 150, h: 110 };
const CLOUD = (x, y, h = 60) => ({ src: 'home and nature bw/cloud', x, y, h });
// a library tree drawn a little wider, so its trunk is wide enough for a number (the drawn trunks are thin)
const TREE = (x, y, h = 260, src = 'nature bw/tree') => ({ src, x, y, h, sx: 1.5, mergeSmall: 13 });
const FLOWER = (x, y, h = 120, src = 'nature bw/flower') => ({ src, x, y, h });

const THEMES = {
  farm: { hy: 330, items: [SUN, CLOUD(140, 100), { src: 'farm bw/barn', x: 455, y: 360, h: 190 }], hero: { x: 250, y: 520, h: 270 } },
  garden: { hy: 340, items: [SUN, CLOUD(130, 95), FLOWER(85, 525, 190, 'home and nature bw/flower'), FLOWER(520, 525, 180, 'valentine bw 2/tulip')], hero: { x: 300, y: 515, h: 260 } },
  pond: { hy: 300, lines: [{ d: 'M90 440a210 70 0 1 0 420 0a210 70 0 1 0 -420 0' }], items: [SUN, CLOUD(130, 95), FLOWER(55, 385, 130, 'valentine bw 2/tulip')], hero: { x: 300, y: 470, h: 230 }, fixed: [{ name: 'pond', at: [125, 440], colour: 'blue' }, { name: 'pond', at: [478, 440], colour: 'blue' }] },
  forest: { hy: 360, items: [CLOUD(130, 90), TREE(425, 400), FLOWER(530, 525, 150, 'valentine bw 2/tulip')], hero: { x: 210, y: 520, h: 260 } },
  savanna: { hy: 350, items: [{ ...SUN, x: 95 }, CLOUD(320, 85), TREE(440, 385)], hero: { x: 220, y: 520, h: 280 }, ground: 'lightgreen' },
  sea: { hy: 420, items: [{ src: 'beach bw/starfish', x: 500, y: 545, h: 125, mergeSmall: 13 }, { src: 'beach bw/seashell', x: 100, y: 540, h: 105, mergeSmall: 13 }], hero: { x: 300, y: 235, h: 280, anchor: 'c' }, sky: 'lightblue', ground: 'yellow' },
  beach: { hy: 300, lines: [{ d: 'M-20 380 C150 360 450 400 620 380' }], items: [SUN, CLOUD(130, 95)], hero: { x: 300, y: 520, h: 250 }, ground: 'yellow', fixed: [{ name: 'sea', at: [20, 340], colour: 'blue' }, { name: 'sea', at: [585, 345], colour: 'blue' }] },
  desert: { hy: 350, items: [{ ...SUN, x: 95 }, CLOUD(320, 85), { src: 'nature bw/pyramid', x: 470, y: 400, h: 180 }], hero: { x: 230, y: 520, h: 280 }, ground: 'yellow' },
  winter: { hy: 350, items: [CLOUD(130, 95), { ...SUN, x: 330, y: 140, h: 95 }, { src: 'Christmas bw/christmas_tree', x: 492, y: 410, h: 300 }], hero: { x: 260, y: 520, h: 270 }, ground: 'none' },
  night: { hy: 370, items: [{ src: 'nature bw/moon', x: 500, y: 150, h: 110 }, { src: 'nature bw/star', x: 90, y: 90, h: 50 }, { src: 'nature bw/star', x: 320, y: 70, h: 40 }], hero: { x: 290, y: 520, h: 270 }, sky: 'blue' },
  room: { hy: 390, items: [{ src: 'household bw/window', x: 470, y: 250, h: 170 }, { src: 'household bw/plant', x: 85, y: 420, h: 150 }], hero: { x: 290, y: 520, h: 280 }, sky: 'yellow', ground: 'orange' },
  table: { hy: 400, lines: [{ d: 'M-20 400 L620 400' }], items: [{ src: 'household bw/window', x: 470, y: 230, h: 170 }], hero: { x: 300, y: 430, h: 300 }, sky: 'yellow', ground: 'orange' },
  town: { hy: 385, items: [SUN, CLOUD(130, 90), { src: 'home and nature bw/house', x: 445, y: 392, h: 200 }], hero: { x: 270, y: 530, h: 200 }, ground: 'lightgreen' },
};

/** a scene: theme + hero (the character); opts.hero overrides its placement, opts.extra adds items before it */
function S(id, en, theme, src, opts = {}) {
  const T = THEMES[theme];
  const hero = { src, ...T.hero, ...(opts.hero || {}) };
  const lines = [hz(opts.hy || T.hy), ...(T.lines || [])];
  const fixed = [{ name: 'sky', at: [20, 20], colour: T.sky || 'lightblue' }, { name: 'ground', at: T.groundAt || [20, 548], colour: T.ground || 'green' }, ...(T.fixed || [])];
  return { id, kind: 'scene', theme, hy: opts.hy || T.hy, names: { en }, stroke: 7, lines, items: [...T.items, ...(opts.extra || []), hero], fixed };
}

const SCENES = [
  // farm
  S('farm-cow', 'Cow on the Farm', 'farm', 'farm bw/cow'),
  S('farm-pig', 'Pig on the Farm', 'farm', 'farm bw/pig'),
  S('farm-sheep', 'Sheep on the Farm', 'farm', 'farm bw/sheep'),
  S('farm-horse', 'Horse on the Farm', 'farm', 'farm bw/horse'),
  S('farm-donkey', 'Donkey on the Farm', 'farm', 'farm bw/donkey'),
  S('farm-rooster', 'Rooster on the Farm', 'farm', 'farm bw/rooster'),
  S('farm-duck', 'Duck on the Farm', 'farm', 'farm bw/duck'),
  S('farm-goat', 'Goat on the Farm', 'farm', 'farm bw/goat'),
  S('farm-turkey', 'Turkey on the Farm', 'farm', 'farm bw/turkey'),
  S('farm-rabbit', 'Rabbit on the Farm', 'farm', 'farm bw/rabbit'),
  // garden
  S('garden-bunny', 'Bunny in the Garden', 'garden', 'animals bw/rabbit'),
  S('garden-cat', 'Cat in the Garden', 'garden', 'animals bw 2/cat'),
  S('garden-dog', 'Dog in the Garden', 'garden', 'animals bw 2/dog'),
  S('garden-butterfly', 'Butterfly in the Garden', 'garden', 'Easter bw/butterfly', { hero: { y: 300, h: 150 } }),
  S('garden-bird', 'Bird in the Garden', 'garden', 'animals bw 5/bird', { hero: { h: 220 } }),
  S('garden-squirrel', 'Squirrel in the Garden', 'garden', 'animals bw 2/squirrel'),
  S('garden-chick', 'Chick in the Garden', 'garden', 'Easter bw 2/chick', { hero: { h: 200 } }),
  S('garden-hedgehog', 'Hedgehog in the Garden', 'garden', 'animals bw 5/hedgehog'),
  S('garden-ladybug', 'Ladybug in the Garden', 'garden', 'nature bw/ladybug', { hero: { y: 505, h: 150 } }),
  S('garden-mouse', 'Mouse in the Garden', 'garden', 'animals bw 4/mouse', { hero: { h: 230 } }),
  // pond
  S('pond-duck', 'Duck on the Pond', 'pond', 'farm bw/duck_2'),
  S('pond-frog', 'Frog at the Pond', 'pond', 'animals bw/frog'),
  S('pond-flamingo', 'Flamingo at the Pond', 'pond', 'birds bw 2/flamingo', { hero: { h: 280 } }),
  S('pond-turtle', 'Turtle at the Pond', 'pond', 'animals bw 5/turtle', { hero: { y: 548 } }),
  S('pond-goose', 'Goose at the Pond', 'pond', 'birds bw 2/goose'),
  S('pond-otter', 'Otter at the Pond', 'pond', 'animals bw/otter'),
  S('pond-alligator', 'Alligator at the Pond', 'pond', 'animals bw 3/alligator', { hero: { y: 548 } }),
  S('pond-beaver', 'Beaver at the Pond', 'pond', 'animals bw/beaver', { hero: { mergeSmall: 13 } }),
  S('pond-little-duck', 'Little Duck at the Pond', 'pond', 'animals bw 4/duck_2'),
  S('pond-pelican', 'Pelican at the Pond', 'pond', 'birds bw/pelican'),
  // forest
  S('forest-fox', 'Fox in the Forest', 'forest', 'animals bw 5/fox'),
  S('forest-bear', 'Bear in the Forest', 'forest', 'animals bw/bear_2'),
  S('forest-raccoon', 'Raccoon in the Forest', 'forest', 'animals bw/raccoon_2'),
  S('forest-owl', 'Owl in the Forest', 'forest', 'birds bw 2/owl'),
  S('forest-squirrel', 'Squirrel in the Forest', 'forest', 'animals bw 5/squirrel_2'),
  S('forest-porcupine', 'Porcupine in the Forest', 'forest', 'zoo animals bw/porcupine'),
  S('forest-deer', 'Deer in the Forest', 'forest', 'zoo animals bw/reindeer'),
  S('forest-rabbit', 'Rabbit in the Forest', 'forest', 'animals bw 4/rabbit'),
  S('forest-little-raccoon', 'Little Raccoon', 'forest', 'animals bw 2/raccoon'),
  S('forest-koala', 'Koala in the Forest', 'forest', 'animals bw/koala'),
  // savanna
  S('savanna-lion', 'Lion on the Savanna', 'savanna', 'animals bw/lion'),
  S('savanna-elephant', 'Elephant on the Savanna', 'savanna', 'animals bw/elephant'),
  S('savanna-giraffe', 'Giraffe on the Savanna', 'savanna', 'animals bw 2/giraffe', { hero: { h: 330 } }),
  S('savanna-trex', 'Little T. rex', 'savanna', 'animals bw/tyrannosaurus_rex'),
  S('savanna-hippo', 'Hippo on the Savanna', 'savanna', 'animals bw 5/hippopotamus'),
  S('savanna-rhino', 'Rhino on the Savanna', 'savanna', 'animals bw 5/rhinoceros'),
  S('savanna-meerkat', 'Meerkat on the Savanna', 'savanna', 'animals bw/meerkat', { hero: { h: 240 } }),
  S('savanna-ostrich', 'Ostrich on the Savanna', 'savanna', 'birds bw 2/ostrich', { hero: { h: 370 } }),
  S('savanna-camel', 'Camel in the Desert', 'desert', 'animals bw 5/camel'),
  S('savanna-leopard', 'Leopard on the Savanna', 'savanna', 'animals bw 5/leopard'),
  // under the sea
  S('sea-whale', 'Whale in the Sea', 'sea', 'sea life bw/whale'),
  S('sea-shark', 'Shark in the Sea', 'sea', 'sea life bw/shark'),
  S('sea-dolphin', 'Dolphin in the Sea', 'sea', 'sea life bw/dolphin'),
  S('sea-fish', 'Fish in the Sea', 'sea', 'sea life bw/fish_3'),
  S('sea-octopus', 'Octopus in the Sea', 'sea', 'sea life bw 2/octopus'),
  S('sea-jellyfish', 'Jellyfish in the Sea', 'sea', 'sea life bw/jellyfish'),
  S('sea-seahorse', 'Seahorse in the Sea', 'sea', 'sea life bw 2/seahorse'),
  S('sea-crab', 'Crab on the Sea Floor', 'sea', 'sea life bw/crab', { hero: { anchor: null, y: 520, h: 220 } }),
  S('sea-turtle-swim', 'Sea Turtle Swimming', 'sea', 'sea life bw 2/turtle'),
  S('sea-stingray', 'Stingray in the Sea', 'sea', 'sea life bw/stingray'),
  // beach
  S('beach-sandcastle', 'Sandcastle on the Beach', 'beach', 'beach bw 2/sandcastle'),
  S('beach-crab', 'Crab on the Beach', 'beach', 'beach bw 2/crab', { hero: { h: 200 } }),
  S('beach-umbrella', 'Beach Umbrella', 'beach', 'beach bw/umbrella'),
  S('beach-boat', 'Boat at the Beach', 'beach', 'beach bw 2/boat', { hero: { x: 270, y: 372, h: 190 } }),
  S('beach-swim-ring', 'Swim Ring on the Beach', 'beach', 'beach bw 2/inflatable_ring', { hero: { h: 200 } }),
  S('beach-palm', 'Palm Tree on the Beach', 'beach', 'beach bw/palm_tree', { hero: { h: 330 } }),
  S('beach-bucket', 'Bucket and Spade', 'beach', 'beach bw 2/bucket', { hero: { h: 200 } }),
  S('beach-surfboard', 'Surfboard on the Beach', 'beach', 'beach bw 2/surfboard'),
  S('beach-lighthouse', 'Lighthouse by the Sea', 'beach', 'beach bw/lighthouse', { hero: { h: 340 } }),
  S('beach-lounger', 'Sunny Beach', 'beach', 'beach bw 2/lounger', { hero: { h: 180 } }),
  // winter
  S('winter-snowman', 'Snowman in the Snow', 'winter', 'Christmas bw/snowman'),
  S('winter-penguin', 'Penguin in the Snow', 'winter', 'birds bw/penguin'),
  S('winter-santa', 'Santa in the Snow', 'winter', 'Christmas bw 2/santa_claus'),
  S('winter-sleigh', 'Sleigh in the Snow', 'winter', 'Christmas bw 2/sleigh', { hero: { h: 200 } }),
  S('winter-gingerbread', 'Gingerbread House', 'winter', 'Christmas bw 2/gingerbread_house'),
  S('winter-cabin', 'Cabin in the Snow', 'winter', 'travel and holiday bw/log_cabin', { hero: { h: 300 } }),
  S('winter-little-penguin', 'Little Penguin in the Snow', 'winter', 'animals bw/penguin_2'),
  S('winter-happy-snowman', 'Happy Snowman', 'winter', 'Christmas bw 2/snowman'),
  S('winter-seal', 'Seal on the Ice', 'winter', 'sea life bw/walrus'),
  S('winter-skates', 'Ice Skates', 'winter', 'Christmas bw 2/ice_skates', { hero: { h: 200 } }),
  // night
  S('night-owl', 'Owl at Night', 'night', 'birds bw/owl'),
  S('night-bat', 'Bat at Night', 'night', 'animals bw/bat', { hero: { y: 300, h: 190 } }),
  S('night-rocket', 'Rocket at Night', 'night', 'space bw/rocket', { hero: { h: 330 } }),
  S('night-ufo', 'Flying Saucer at Night', 'night', 'space bw/ufo', { hero: { y: 380, h: 180 } }),
  S('night-tent', 'Camping at Night', 'night', 'travel and holiday bw/tent', { hero: { h: 220 } }),
  S('night-campfire', 'Campfire at Night', 'night', 'travel and holiday bw/campfire', { hero: { h: 250 } }),
  S('night-cat', 'Cat at Night', 'night', 'animals bw 3/cat'),
  S('night-telescope', 'Telescope at Night', 'night', 'space bw/telescope'),
  S('night-raccoon', 'Raccoon at Night', 'night', 'animals bw/raccoon_3'),
  S('night-camper', 'Camper at Night', 'night', 'travel and holiday bw/camper', { hero: { h: 200 } }),
  // town
  S('town-car', 'Car in Town', 'town', 'vehicles bw/car', { hero: { maxW: 460 } }),
  S('town-bus', 'Bus in Town', 'town', 'vehicles bw/bus_2'),
  S('town-ice-cream-truck', 'Ice Cream Truck', 'town', 'vehicles bw 3/ice_cream_truck'),
  S('town-ambulance', 'Ambulance in Town', 'town', 'vehicles bw/ambulance'),
  S('town-garbage-truck', 'Garbage Truck in Town', 'town', 'vehicles bw/garbage_truck'),
  S('town-scooter', 'Scooter in Town', 'town', 'vehicles bw 3/motorcycle'),
  S('town-train', 'Train in Town', 'town', 'vehicles bw/train'),
  S('town-van', 'Van in Town', 'town', 'vehicles bw 3/van'),
  S('town-taxi', 'Taxi in Town', 'town', 'vehicles bw 2/taxi'),
  S('town-race-car', 'Race Car', 'town', 'vehicles bw/race_car', { hero: { maxW: 460 } }),
];

/* ---------------------------------------------------------------- the second hundred (K-394). Operator 2026-10-05:
 * all 200 should be scenes. Each library drawing that was a single picture now stands in its own scene. */
const SECOND = [
  ['cat', 'animals bw 3/cat_2', 'Cat', 'garden'], ['hen', 'animals bw 3/chicken', 'Hen', 'farm'], ['cow', 'animals bw 3/cow', 'Cow', 'farm'],
  ['deer', 'animals bw 3/deer', 'Deer', 'forest'], ['dinosaur', 'animals bw 3/dinosaur', 'Dinosaur', 'savanna'], ['triceratops', 'animals bw 3/dinosaur_2', 'Triceratops', 'savanna'],
  ['puppy', 'animals bw 3/dog', 'Puppy', 'garden'], ['donkey', 'animals bw 3/donkey', 'Donkey', 'farm'], ['elephant', 'animals bw 3/elephant_2', 'Elephant', 'savanna'],
  ['fish', 'animals bw 3/fish_2', 'Fish', 'sea'], ['frog', 'animals bw 3/frog_2', 'Frog', 'pond'], ['scarecrow', 'farm bw/scarecrow', 'Scarecrow', 'farm'],
  ['hippo', 'animals bw 3/hippopotamus_2', 'Hippo', 'savanna'], ['police-car', 'vehicles bw 3/police_car', 'Police Car', 'town'], ['chick', 'animals bw 4/chick', 'Chick', 'farm', { h: 300 }],
  ['ladybug', 'animals bw 3/ladybug', 'Ladybug', 'garden', { h: 170 }], ['lion', 'animals bw 3/lion', 'Lion', 'savanna'], ['monkey', 'animals bw 3/monkey', 'Monkey', 'forest'],
  ['mouse', 'animals bw 3/mouse', 'Mouse', 'garden'], ['crocodile', 'animals bw/alligator_2', 'Crocodile', 'pond', { y: 548 }], ['duck', 'animals bw 4/duck', 'Duck', 'pond'],
  ['goat', 'animals bw 4/goat', 'Goat', 'farm'], ['kangaroo', 'animals bw 4/kangaroo', 'Kangaroo', 'savanna'], ['koala', 'animals bw 4/koala', 'Koala', 'forest'],
  ['hummingbird', 'birds bw/hummingbird', 'Hummingbird', 'garden', { y: 330, h: 200 }], ['nest', 'farm bw/nest', 'Hen on the Nest', 'farm'], ['pony', 'farm animals bw/pony', 'Pony', 'farm'],
  ['rabbit', 'animals bw 4/rabbit_2', 'Rabbit', 'garden'], ['rooster', 'animals bw 4/rooster', 'Rooster', 'farm'], ['sheep', 'animals bw 4/sheep', 'Sheep', 'farm'],
  ['turtle', 'animals bw 4/turtle', 'Turtle', 'pond', { y: 548 }], ['unicorn', 'farm animals bw/unicorn', 'Unicorn', 'garden'], ['dump-truck', 'vehicles bw 2/dump_truck', 'Dump Truck', 'town'],
  ['bat', 'animals bw 5/bat', 'Bat', 'night', { y: 360, h: 190 }], ['bee', 'animals bw 5/bee', 'Bee', 'garden', { x: 290, y: 315, h: 260 }], ['bull', 'animals bw 5/bull', 'Bull', 'farm'],
  ['chameleon', 'animals bw 5/chameleon', 'Chameleon', 'savanna', { h: 170 }], ['crab', 'animals bw 5/crab', 'Crab', 'beach', { h: 200 }], ['eagle', 'animals bw 5/eagle', 'Eagle', 'forest'],
  ['fox', 'animals bw 5/fox_2', 'Fox', 'forest'], ['gorilla', 'animals bw 5/gorilla', 'Gorilla', 'forest'], ['lobster', 'sea life bw/lobster', 'Lobster', 'sea', { anchor: null, x: 320, y: 540, h: 150 }],
  ['ostrich', 'animals bw 5/ostrich', 'Ostrich', 'savanna', { h: 330 }], ['owl', 'animals bw 5/owl', 'Owl', 'night'], ['panda', 'animals bw 5/panda', 'Panda', 'forest'],
  ['peacock', 'animals bw 5/peacock', 'Peacock', 'garden'], ['penguin', 'animals bw 5/penguin', 'Penguin', 'winter'], ['reindeer', 'animals bw 5/reindeer', 'Reindeer', 'winter'],
  ['sloth', 'animals bw 5/sloth', 'Sloth', 'forest'], ['snake', 'animals bw 5/snake', 'Snake', 'forest', { h: 330 }], ['squirrel', 'animals bw 5/squirrel', 'Squirrel', 'forest'],
  ['tiger', 'animals bw 5/tiger', 'Tiger', 'forest'], ['parrot', 'birds bw 2/parrot', 'Parrot', 'forest'], ['toucan', 'birds bw 2/toucan', 'Toucan', 'forest'],
  ['turkey', 'birds bw 2/turkey', 'Turkey', 'farm'], ['mushroom', 'vegetables bw 2/mushroom', 'Mushroom', 'forest', { h: 230 }], ['yak', 'farm animals bw/yak', 'Yak', 'winter'],
  ['donut', 'dessert bw/donut', 'Donut', 'table', { h: 165 }], ['flying-saucer', 'toys bw/ufo', 'Flying Saucer', 'night', { y: 330, h: 150 }], ['beach-ball', 'beach bw/beach_ball', 'Beach Ball', 'beach', { h: 200 }],
  ['rhino', 'zoo animals bw/rhinoceros', 'Rhino', 'savanna'], ['bear', 'zoo animals bw/bear_2', 'Bear', 'forest'], ['narwhal', 'sea life bw/narwhal', 'Narwhal', 'sea'],
  ['clownfish', 'sea life bw/clown_fish', 'Clownfish', 'sea'], ['seahorse', 'sea life bw/seahorse', 'Seahorse', 'sea'], ['sea-turtle', 'sea life bw/turtle', 'Sea Turtle', 'sea'],
  ['hermit-crab', 'sea life bw 2/hermit_crab', 'Hermit Crab', 'beach', { h: 210 }], ['snail', 'sea life bw 2/snail', 'Snail', 'garden', { h: 210 }], ['starfish', 'sea life bw 2/starfish', 'Starfish', 'beach', { h: 200 }],
  ['octopus', 'sea life bw/octopus', 'Octopus', 'sea'], ['robot', 'toys bw/robot', 'Robot', 'room'], ['rocking-horse', 'toys bw/rocking_horse', 'Rocking Horse', 'room'],
  ['teddy-bear', 'toys bw/teddy_bear', 'Teddy Bear', 'room'], ['toy-train', 'toys bw/train', 'Toy Train', 'room', { h: 160 }], ['drum', 'toys bw/drum', 'Drum', 'room', { h: 230 }],
  ['spinning-top', 'toys bw/spinning_top', 'Spinning Top', 'room', { h: 230 }], ['dice', 'toys bw 2/dice', 'Dice', 'table', { h: 200 }], ['pinwheel', 'toys bw 2/pinwheel', 'Pinwheel', 'garden'],
  ['kite', 'toys bw 2/kite', 'Kite', 'garden', { y: 320, h: 250 }], ['telephone', 'toys bw 2/telephone', 'Telephone', 'table', { h: 220 }], ['xylophone', 'toys bw 2/xylophone', 'Xylophone', 'room', { h: 200 }],
  ['school-bus', 'vehicles bw/bus', 'School Bus', 'town'], ['airplane', 'vehicles bw 2/airplane_2', 'Airplane', 'garden', { y: 290, h: 170 }], ['hot-air-balloon', 'vehicles bw 2/hot_air_balloon', 'Hot Air Balloon', 'garden', { y: 330, h: 280 }],
  ['helicopter', 'vehicles bw 2/helicopter_2', 'Helicopter', 'garden', { y: 300, h: 170 }], ['rocket', 'vehicles bw 2/rocket', 'Rocket', 'night', { h: 320 }], ['tugboat', 'vehicles bw 3/boat', 'Tugboat', 'beach', { x: 260, y: 372, h: 200 }],
  ['fire-truck', 'vehicles bw 3/fire_truck', 'Fire Truck', 'town'], ['tractor', 'farm bw/tractor', 'Tractor', 'farm', { h: 230 }], ['sailboat', 'beach bw/sailboat', 'Sailboat', 'beach', { x: 260, y: 372, h: 260 }],
  ['apple', 'fruits bw/apple', 'Apple', 'table', { h: 300 }], ['cherries', 'fruits bw/cherry', 'Cherries', 'table', { h: 300 }], ['cupcake', 'dessert bw/cupcake', 'Cupcake', 'table', { h: 240 }],
  ['sundae', 'dessert bw/sundae', 'Ice Cream Sundae', 'table', { h: 300 }], ['birthday-cake', 'dessert bw/cake', 'Birthday Cake', 'table', { h: 250 }], ['pumpkin', 'vegetables bw/pumpkin', 'Pumpkin', 'garden', { h: 280 }],
  ['house', 'home and nature bw/house', 'House', 'garden', { h: 300 }], ['flower-pot', 'household bw/plant', 'Flower Pot', 'table', { h: 410 }], ['teapot', 'home bw/teapot', 'Teapot', 'table', { h: 220 }],
  ['sandcastle', 'beach bw/sandcastle', 'Sandcastle', 'beach'],
].map(([id, src, en, theme, hero]) => ({ ...S(id, en, theme, src, { hero }), kind: 'picture' }));

module.exports = { SCENES, SECOND, THEMES };
