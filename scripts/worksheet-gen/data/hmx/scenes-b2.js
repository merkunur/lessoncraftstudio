/**
 * data/hmx/scenes-b2.js — Maze Puzzles Level Set scenes, batch 2: MY FIRST MAZE (K-406, wide roads, 12), BIG PICTURE
 * MAZE (G1-420, dense, 12) and the RIVER MAZE (K-407, water roads, 12). Every drawing opened on its contact sheet.
 */
'use strict';
const { SET } = require('./settings.js');
const F = (face) => (set, v, flip, rest, o = {}) => ({ face, setting: set + v + (o.kind ? '-' + o.kind : ''), ...SET[set]({ v, flip, ...o }), ...rest });
const first = F('first-maze'), big = F('big-maze'), river = F('river');

module.exports = [
  // ------------------------------------------------------------------ MY FIRST MAZE (PreK): one wide road, a few short stubs
  first('garden', 1, false, { id: 'hmx-first-hamster', slots: ['L', 'R'], hero: { src: 'pets/hamster', h: 80 }, goal: { src: 'fruits/apple', h: 64 },
    cast: [{ src: 'flowers/sunflower', h: 92 }, { src: 'spring/watering_can', h: 56 }, { src: 'insects and bugs/butterfly', h: 40, optional: true }] }),
  first('farmyard', 1, true, { id: 'hmx-first-kitten', slots: ['BL', 'TR'], hero: { src: 'farm animals/cat_2', h: 86 }, goal: { src: 'breakfast/milk', h: 72 },
    cast: [{ src: 'farm animals/hen', h: 64 }, { src: 'farm animals/dog', h: 66 }, { src: 'thanksgivinng/haystack', h: 70, optional: true }] }),
  first('beach', 1, false, { id: 'hmx-first-crab', slots: ['BR', 'TL'], hero: { src: 'summer/crab', h: 70 }, goal: { src: 'summer/beach_ball', h: 66 },
    cast: [{ src: 'summer/palm_tree', h: 120 }, { src: 'beach/bucket', h: 52 }, { src: 'summer/seashell', h: 44, optional: true }] }),
  first('meadow', 2, false, { id: 'hmx-first-ladybug', slots: ['BL', 'TR'], hero: { src: 'forest creatures/ladybug', h: 60 }, goal: { src: 'flowers/sunflower', h: 110 },
    cast: [{ src: 'spring/bee', h: 48 }, { src: 'flowers/aster', h: 60, optional: true }, { src: 'spring/caterpillar', h: 42 }, { src: 'flowers/tulip', h: 58, optional: true }] }),
  first('arctic', 0, false, { id: 'hmx-first-penguin', slots: ['TL', 'BR'], hero: { src: 'winter/penguin', h: 84 }, goal: { src: 'winter/snowman', h: 92 },
    cast: [{ src: 'winter/snowflake', h: 44 }, { src: 'winter/hat', h: 44, optional: true }, { src: 'winter/sled', h: 50, optional: true }] }),
  first('pond', 1, false, { id: 'hmx-first-turtle', slots: ['BR', 'TL'], hero: { src: 'animals/turtle', h: 62 }, goal: { src: 'flowers/lotus', h: 70 },
    cast: [{ src: 'forest creatures/frog', h: 52 }, { src: 'insects and bugs/dragonfly', h: 46 }, { src: 'animals/duck', h: 56, optional: true }] }),
  first('park', 1, true, { id: 'hmx-first-girl', slots: ['BL', 'TR'], hero: { src: 'toys/girl', h: 94 }, goal: { src: 'toys/swing', h: 100 },
    cast: [{ src: 'toys/sandbox', h: 56 }, { src: 'pets/dog', h: 56 }, { src: 'spring/kite', h: 60, optional: true }] }),
  first('blossom', 1, false, { id: 'hmx-first-chick', slots: ['TR', 'BL'], hero: { src: 'easter/chick', h: 66 }, goal: { src: 'easter/egg', h: 66 },
    cast: [{ src: 'easter/tulip', h: 64 }, { src: 'easter/butterfly', h: 46 }, { src: 'easter/lamb', h: 60, optional: true }] }),
  first('orchard', 0, true, { id: 'hmx-first-horse', slots: ['BL', 'R'], hero: { src: 'farm animals/horse_2', h: 92 }, goal: { src: 'vegetables/carrot', h: 66 },
    cast: [{ src: 'tree/apple', h: 130 }, { src: 'birds 2/robin', h: 44 }, { src: 'fruits/pear', h: 44, optional: true }] }),
  first('wheat', 1, false, { id: 'hmx-first-chicken', slots: ['TL', 'BR'], hero: { src: 'farm animals/chicken', h: 76 }, goal: { src: 'thanksgivinng/corn', h: 72 },
    cast: [{ src: 'thanksgivinng/haystack', h: 70 }, { src: 'thanksgivinng/scarecrow', h: 104 }, { src: 'birds 2/sparrow', h: 40, optional: true }] }),
  first('candy', 1, false, { id: 'hmx-first-dino-toy', slots: ['BR', 'TL'], hero: { src: 'toys/dinosaur', h: 84 }, goal: { src: 'desserts and sweets/cake', h: 70 },
    cast: [{ src: 'desserts and sweets/macaron', h: 44 }, { src: 'desserts and sweets/popsicle', h: 62 }, { src: 'toys/blocks', h: 54, optional: true }] }),
  first('sky', 1, false, { id: 'hmx-first-bird', slots: ['BL', 'TR'], hero: { src: 'Things That Fly/bird', h: 66 }, goal: { src: 'spring/birdhouse', h: 104 },
    cast: [{ src: 'Things That Fly/butterfly', h: 48 }, { src: 'Things That Fly/paper_airplane', h: 44 }, { src: 'weather/sun', h: 60, optional: true }] }),

  // ------------------------------------------------------------------ BIG PICTURE MAZE (G1): a long way, many deep dead ends
  big('jungle', 1, false, { id: 'hmx-big-monkey', slots: ['BR', 'TL'], hero: { src: 'zoo animals/monkey', h: 72 }, goal: { src: 'fruits/banana', h: 54 },
    cast: [{ src: 'birds/toucan', h: 52 }, { src: 'zoo animals/jaguar', h: 56 }, { src: 'reptiles and Amphibians/frog', h: 40, optional: true }, { src: 'flowers/morning_glory', h: 44, optional: true }, { src: 'birds 2/hummingbird', h: 40, optional: true }] }),
  big('forest', 1, true, { id: 'hmx-big-rabbit', slots: ['TL', 'BR'], hero: { src: 'forest creatures/rabbit', h: 64 }, goal: { src: 'vegetables/cabbage', h: 52 },
    cast: [{ src: 'forest creatures/fox', h: 58 }, { src: 'forest creatures/hawk', h: 52 }, { src: 'forest creatures/caterpillar', h: 34, optional: true }, { src: 'forest creatures/chipmunk', h: 44, optional: true }, { src: 'vegetables/mushroom', h: 36, optional: true }] }),
  big('reef', 1, false, { id: 'hmx-big-seahorse', slots: ['BL', 'TR'], hero: { src: 'ocean life/sea_horse', h: 62 }, goal: { src: 'ocean life/seaweed', h: 80 },
    cast: [{ src: 'ocean life/ray', h: 46 }, { src: 'ocean life/crab', h: 42 }, { src: 'ocean life/starfish', h: 40, optional: true }, { src: 'ocean life/squid', h: 48, optional: true }, { src: 'ocean life/shrimp', h: 40, optional: true }], band: { h: 76, sky: '#6FB7D6', hill: '#6FB7D6', hills: [] } }),
  big('autumn', 1, false, { id: 'hmx-big-badger', slots: ['TR', 'BL'], hero: { src: 'forest creatures/badger', h: 56 }, goal: { src: 'tree/chestnut', h: 130 },
    cast: [{ src: 'forest creatures/hedgehog', h: 42 }, { src: 'miscellaneous/acorn', h: 34 }, { src: 'forest creatures/owl', h: 44, optional: true }, { src: 'miscellaneous/leaf', h: 36, optional: true }] }),
  big('night', 1, false, { id: 'hmx-big-santa', slots: ['BL', 'TR'], hero: { src: 'christmas/santa', h: 84 }, goal: { src: 'christmas/sleigh', h: 62 },
    cast: [{ src: 'christmas/reindeer', h: 76 }, { src: 'christmas/present', h: 44 }, { src: 'christmas/snowman', h: 60, optional: true }, { src: 'christmas/elf', h: 64, optional: true }] }),
  big('mountain', 1, true, { id: 'hmx-big-llama', slots: ['BR', 'TL'], hero: { src: 'farm animals/llama', h: 82 }, goal: { src: 'camping/cabin', h: 92 },
    cast: [{ src: 'birds 2/falcon', h: 48 }, { src: 'flowers/bluebell', h: 48 }, { src: 'camping/rock', h: 40, optional: true }, { src: 'tree/juniper', h: 100, optional: true }] }),
  big('savanna', 1, false, { id: 'hmx-big-rhino', slots: ['L', 'R'], hero: { src: 'zoo animals/rhinoceros', h: 62 }, goal: { src: 'zoo animals/hippopotamus', h: 62 },
    cast: [{ src: 'zoo animals/cheetah', h: 56 }, { src: 'birds/vulture', h: 48 }, { src: 'zoo animals/antelope', h: 64, optional: true }, { src: 'tree/baobab', h: 110, optional: true }] }),
  big('desert', 1, true, { id: 'hmx-big-tortoise', slots: ['TL', 'BR'], hero: { src: 'reptiles and Amphibians/tortoise', h: 54 }, goal: { src: 'fruits/watermelon', h: 44 },
    cast: [{ src: 'zoo animals/armadillo', h: 44, optional: true }, { src: 'reptiles and Amphibians/komodo_dragon', h: 46 }, { src: 'birds 2/hawk', h: 50, optional: true }] }),
  big('prehistoric', 1, false, { id: 'hmx-big-parasaur', slots: ['BR', 'TL'], hero: { src: 'dinosaurs/parasaurolophus', h: 70 }, goal: { src: 'tree/redwood', h: 130 },
    cast: [{ src: 'insects and bugs/dragonfly', h: 34 }, { src: 'insects and bugs/snail', h: 32, optional: true }] }),   // "the dinosaur": no other dinosaur on the page
  big('campsite', 1, false, { id: 'hmx-big-bear', slots: ['TL', 'BR'], hero: { src: 'camping/bear', h: 80 }, goal: { src: 'breakfast/honey', h: 56 },
    cast: [{ src: 'camping/squirrel', h: 50 }, { src: 'camping/rabbit', h: 46 }, { src: 'camping/picnic_table', h: 52, optional: true }, { src: 'camping/pine_tree', h: 100, optional: true }] }),
  big('harbour', 1, true, { id: 'hmx-big-seagull', slots: ['BL', 'TR'], hero: { src: 'beach/seagull', h: 60 }, goal: { src: 'beach/boat', h: 60 },
    cast: [{ src: 'beach/lighthouse', h: 96, optional: true }, { src: 'camping/fishing_rod', h: 54 }, { src: 'beach/starfish', h: 36, optional: true }, { src: 'beach/rock', h: 40, optional: true }] }),
  big('town', 1, false, { id: 'hmx-big-garbage', slots: ['BR', 'TL'], hero: { src: 'vehicles/garbage_truck', h: 56 }, goal: { src: 'around the house/trash_can', h: 60 },
    cast: [{ src: 'around the house/garage', h: 60 }, { src: 'around the house/mailbox', h: 54 }, { src: 'vehicles/scooter', h: 40, optional: true }, { src: 'pets/cat', h: 40, optional: true }] }),

  // ------------------------------------------------------------------ RIVER MAZE (K): the roads are water; the goal waits on the bank
  river('water', 0, false, { id: 'hmx-river-canoe', slots: ['BL', 'TR'], hero: { src: 'vehicles/canoe', h: 44 }, goal: { src: 'camping/tent', h: 76 },
    cast: [{ src: 'forest creatures/deer', h: 76 }, { src: 'forest creatures/beaver', h: 46 }, { src: 'tree/pine', h: 104, optional: true }] }, { kind: 'forest' }),
  river('water', 1, true, { id: 'hmx-river-kayak', slots: ['TL', 'BR'], hero: { src: 'camping/kayak', h: 44 }, goal: { src: 'winter/cabin', h: 92 },
    cast: [{ src: 'tree/maple', h: 110 }, { src: 'forest creatures/fox', h: 50 }, { src: 'thanksgivinng/pumpkin', h: 44, optional: true }] }, { kind: 'autumn' }),
  river('water', 0, false, { id: 'hmx-river-ship', slots: ['BR', 'TL'], hero: { src: 'vehicles/ship', h: 58 }, goal: { src: 'beach/lighthouse', h: 110 },
    cast: [{ src: 'beach/seagull', h: 46 }, { src: 'beach/beach_umbrella', h: 92 }, { src: 'beach/crab', h: 38, optional: true }] }, { kind: 'sea' }),
  river('water', 1, false, { id: 'hmx-river-sailboat', slots: ['TR', 'BL'], hero: { src: 'vehicles/sailboat', h: 70 }, goal: { src: 'beach/island', h: 66 },
    cast: [{ src: 'beach/palm_tree', h: 110 }, { src: 'beach/turtle', h: 40 }, { src: 'beach/starfish', h: 36, optional: true }] }, { kind: 'tropic' }),
  river('water', 0, true, { id: 'hmx-river-duck', slots: ['BL', 'TR'], hero: { src: 'birds 2/duck', h: 56 }, goal: { src: 'summer/beach_ball', h: 54 },
    cast: [{ src: 'summer/palm_tree', h: 110 }, { src: 'summer/sandcastle', h: 60 }, { src: 'summer/sunglasses', h: 30, optional: true }] }, { kind: 'tropic' }),
  river('water', 2, false, { id: 'hmx-river-yacht', slots: ['TL', 'BR'], hero: { src: 'vehicles/yacht', h: 52 }, goal: { src: 'beach/cabana', h: 80 },
    cast: [{ src: 'beach/chair', h: 56 }, { src: 'beach/seagull', h: 44 }, { src: 'beach/cooler', h: 40, optional: true }] }, { kind: 'sea' }),
  river('water', 1, false, { id: 'hmx-river-beaver', slots: ['BR', 'TL'], hero: { src: 'forest creatures/beaver', h: 54 }, goal: { src: 'tree/birch', h: 110 },
    cast: [{ src: 'forest creatures/frog', h: 42 }, { src: 'flowers/forget-me-not', h: 46 }, { src: 'insects and bugs/snail', h: 36, optional: true }] }, { kind: 'meadow' }),
  river('water', 2, true, { id: 'hmx-river-turtle', slots: ['BL', 'R'], hero: { src: 'pets/turtle', h: 48 }, goal: { src: 'pets/frog', h: 56 },
    cast: [{ src: 'birds 2/kingfisher', h: 44 }, { src: 'insects and bugs/dragonfly', h: 40 }, { src: 'insects and bugs/snail', h: 34, optional: true }] }, { kind: 'marsh' }),
  river('water', 0, false, { id: 'hmx-river-puffin', slots: ['TR', 'BL'], hero: { src: 'birds 2/puffin', h: 56 }, goal: { src: 'winter/igloo', h: 80 },
    cast: [{ src: 'winter/polar_bear', h: 56 }, { src: 'winter/walrus', h: 50 }, { src: 'winter/seal', h: 46, optional: true }] }, { kind: 'ice' }),
  river('water', 1, true, { id: 'hmx-river-fishing-boat', slots: ['L', 'TR'], hero: { src: 'beach/boat', h: 54 }, goal: { src: 'beach/lifeguard_tower', h: 100 },
    cast: [{ src: 'beach/beach_ball', h: 40 }, { src: 'beach/sandcastle', h: 56 }, { src: 'beach/seagull', h: 44, optional: true }] }, { kind: 'sea' }),
  river('water', 0, true, { id: 'hmx-river-tug', slots: ['TL', 'BR'], hero: { src: 'vehicles/boat', h: 56 }, goal: { src: 'miscellaneous/house', h: 80 },
    cast: [{ src: 'tree/elm', h: 110, optional: true }, { src: 'farm animals/goose', h: 50 }, { src: 'around the house/fence', h: 40 }] }, { kind: 'meadow' }),
  river('water', 2, false, { id: 'hmx-river-goose', slots: ['BR', 'TL'], hero: { src: 'birds 2/goose', h: 54 }, goal: { src: 'spring/nest', h: 48 },
    cast: [{ src: 'birds 2/heron', h: 70 }, { src: 'forest creatures/dragonfly', h: 38 }, { src: 'birds 2/stork', h: 70, optional: true }] }, { kind: 'forest' }),
];
