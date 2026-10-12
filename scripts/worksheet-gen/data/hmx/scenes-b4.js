/**
 * data/hmx/scenes-b4.js — Maze Puzzles Level Set scenes, batch 4: COLLECT ON THE WAY (G1-424, 12), AVOID THE OBSTACLES
 * (G1-425, 12) and the LETTER HOP (G1-426, 6). Collect / avoid are FLAT scenes (the maze fills the frame, a strip under
 * it carries the rule); the item / obstacles are each scene's own and named in its text.
 */
'use strict';
const { SET } = require('./settings.js');
const flat = (face) => (set, v, flip, rest, o = {}) => ({ face, setting: set + v + (o.kind ? '-' + o.kind : ''), ...SET[set]({ v, flip, flat: true, ...o }), ...rest });
const collect = flat('collect'), avoid = flat('avoid');
/** a collect scene: the item picture on its white stones */
const C = (item) => ({ labels: { item } });
/** an avoid scene: two kinds of obstacle on the roads (a library drawing, 'hole', or a drawn 'decor:<kind>') */
const A = (a, b) => ({ labels: { kinds: [a, b] } });

/** letter hop: the honeycomb geometry stays; colours, hero, goal and corner art are the scene's */
function hop(id, o) {
  return {
    id, face: 'letter-hop', setting: 'cells-' + o.look, field: o.field,
    hex: { cellW: 85, comb: [8, 80, 659, 562], combFill: o.comb, cellFill: o.cell, cellEdge: o.edge, capH: 34 },
    hero: { src: o.hero, h: o.heroH }, goal: { src: o.goal, h: o.goalH, at: o.goalAt || [640, 82] }, cast: o.cast,
  };
}

module.exports = [
  // ------------------------------------------------------------------ COLLECT
  collect('forest', 0, false, { id: 'hmx-collect-acorns', slots: ['BL', 'TR'], hero: { src: 'camping/squirrel', h: 72 }, goal: { src: 'tree/oak', h: 110 }, ...C('miscellaneous/acorn'),
    cast: [{ src: 'forest creatures/owl', h: 44, optional: true }, { src: 'forest creatures/woodpecker', h: 44, optional: true }, { src: 'vegetables/mushroom', h: 34, optional: true }] }),
  collect('meadow', 0, true, { id: 'hmx-collect-flowers', slots: ['TL', 'BR'], hero: { src: 'spring/bee', h: 56 }, goal: { src: 'breakfast/honey', h: 60 }, ...C('flowers/sunflower'),
    cast: [{ src: 'insects and bugs/butterfly', h: 36, optional: true }, { src: 'insects and bugs/ladybug', h: 30, optional: true }, { src: 'flowers/tulip', h: 40, optional: true }] }),
  collect('farmyard', 2, false, { id: 'hmx-collect-corn', slots: ['BR', 'TL'], hero: { src: 'farm animals/hen', h: 64 }, goal: { src: 'spring/nest', h: 48 }, ...C('thanksgivinng/corn'),
    cast: [{ src: 'farm animals/pig', h: 46, optional: true }, { src: 'farm animals/goat', h: 50, optional: true }, { src: 'farm animals/cat', h: 40, optional: true }] }),
  collect('arctic', 0, false, { id: 'hmx-collect-fish', slots: ['BL', 'R'], hero: { src: 'birds/penguin', h: 70 }, goal: { src: 'winter/ice', h: 50 }, ...C('animals/fish'),
    cast: [{ src: 'winter/snowflake', h: 32, optional: true }] }),
  collect('beach', 2, true, { id: 'hmx-collect-shells', slots: ['TR', 'BL'], hero: { src: 'beach/crab', h: 54 }, goal: { src: 'summer/sandcastle', h: 72 }, ...C('summer/seashell'),
    cast: [{ src: 'beach/starfish', h: 34, optional: true }, { src: 'beach/beach_umbrella', h: 70, optional: true }, { src: 'beach/seagull', h: 40, optional: true }] }),
  collect('garden', 2, false, { id: 'hmx-collect-strawberries', slots: ['BL', 'TR'], hero: { src: 'pets/guinea_pig', h: 62 }, goal: { src: 'around the house/bowl', h: 46 }, ...C('fruits/strawberry'),
    cast: [{ src: 'spring/watering_can', h: 42, optional: true }, { src: 'flowers/marigold', h: 40, optional: true }, { src: 'insects and bugs/snail', h: 30, optional: true }] }),
  collect('space', 1, false, { id: 'hmx-collect-stars', slots: ['BL', 'TR'], hero: { src: 'space/rocket', h: 84 }, goal: { src: 'space/moon', h: 76 }, ...C('christmas/star'),
    cast: [{ src: 'space/saturn', h: 40, optional: true }, { src: 'space/earth', h: 40, optional: true }, { src: 'space/satellite', h: 36, optional: true }] }),
  collect('jungle', 1, true, { id: 'hmx-collect-bananas', slots: ['BR', 'TL'], hero: { src: 'zoo animals/lemur', h: 66 }, goal: { src: 'tree/palm', h: 110 }, ...C('fruits/banana'),
    cast: [{ src: 'birds 2/parrot', h: 42, optional: true }, { src: 'flowers/hibiscus', h: 36, optional: true }, { src: 'zoo animals/sloth', h: 44, optional: true }] }),
  collect('snow', 1, false, { id: 'hmx-collect-presents', slots: ['TL', 'BR'], hero: { src: 'christmas/elf', h: 76 }, goal: { src: 'christmas/sack', h: 64 }, ...C('christmas/present'),
    cast: [{ src: 'christmas/candy_cane', h: 40, optional: true }, { src: 'christmas/rudolph', h: 54, optional: true }, { src: 'christmas/bell', h: 34, optional: true }] }),
  collect('blossom', 2, false, { id: 'hmx-collect-eggs', slots: ['BL', 'TR'], hero: { src: 'toys/baby_girl', h: 72 }, goal: { src: 'easter/basket', h: 56 }, ...C('easter/egg'),
    cast: [{ src: 'easter/bunny', h: 44, optional: true }, { src: 'easter/daffodil', h: 40, optional: true }, { src: 'easter/chick', h: 34, optional: true }] }),
  collect('orchard', 2, true, { id: 'hmx-collect-apples', slots: ['TR', 'BL'], hero: { src: 'farm animals/foal', h: 66 }, goal: { src: 'tree/apple', h: 110 }, ...C('fruits/apple'),
    cast: [{ src: 'birds 2/robin', h: 36, optional: true }, { src: 'insects and bugs/bee', h: 28, optional: true }, { src: 'forest creatures/snail', h: 30, optional: true }] }),
  collect('park', 2, false, { id: 'hmx-collect-hibiscus', slots: ['BL', 'TR'], hero: { src: 'Things That Fly/hummingbird', h: 58 }, goal: { src: 'tree/cherry', h: 110 }, ...C('flowers/hibiscus'),
    cast: [{ src: 'birds 2/pigeon', h: 36, optional: true }, { src: 'insects and bugs/ladybug', h: 30, optional: true }, { src: 'insects and bugs/dragonfly', h: 30, optional: true }] }),

  // ------------------------------------------------------------------ AVOID
  avoid('pond', 1, false, { id: 'hmx-avoid-duckling', slots: ['BL', 'R'], hero: { src: 'spring/duckling', h: 62 }, goal: { src: 'weather/puddle', h: 48 }, ...A('forest creatures/fox', 'reptiles and Amphibians/cobra'),
    cast: [{ src: 'birds 2/swan', h: 44, optional: true }, { src: 'flowers/forget-me-not', h: 36, optional: true }] }),
  avoid('reef', 2, false, { id: 'hmx-avoid-fish', slots: ['TL', 'BR'], hero: { src: 'ocean life/fish', h: 52 }, goal: { src: 'ocean life/coral', h: 76 }, ...A('ocean life/shark', 'ocean life/jellyfish'),
    cast: [{ src: 'ocean life/starfish', h: 32, optional: true }, { src: 'ocean life/sea_horse', h: 40, optional: true }] }),
  avoid('space', 2, true, { id: 'hmx-avoid-rocket', slots: ['BL', 'TR'], hero: { src: 'Things That Fly/rocket', h: 78 }, goal: { src: 'space/planet', h: 70 }, ...A('space/asteroid', 'space/meteor'),
    cast: [{ src: 'space/satellite', h: 36, optional: true }, { src: 'space/telescope', h: 44, optional: true }] }),
  avoid('snow', 0, true, { id: 'hmx-avoid-snowboard', slots: ['TL', 'BR'], hero: { src: 'winter/snowboarding', h: 76 }, goal: { src: 'winter/cocoa', h: 50 }, ...A('decor:rock', 'tree/pine'),
    cast: [{ src: 'winter/snowman', h: 52, optional: true }, { src: 'winter/sled', h: 30, optional: true }] }),
  avoid('garden', 1, false, { id: 'hmx-avoid-butterfly', slots: ['BR', 'TL'], hero: { src: 'insects and bugs/butterfly', h: 54 }, goal: { src: 'flowers/rose', h: 70 }, ...A('insects and bugs/spider', 'insects and bugs/wasp'),
    cast: [{ src: 'flowers/aster', h: 40, optional: true }, { src: 'spring/watering_can', h: 38, optional: true }] }),
  avoid('water', 1, false, { id: 'hmx-avoid-frog', slots: ['BL', 'TR'], hero: { src: 'forest creatures/frog', h: 58 }, goal: { src: 'flowers/water_lily', h: 50 }, ...A('birds 2/heron', 'reptiles and Amphibians/alligator'),
    cast: [{ src: 'insects and bugs/dragonfly', h: 30, optional: true }, { src: 'forest creatures/turtle', h: 34, optional: true }] }, { kind: 'marsh' }),
  avoid('forest', 2, false, { id: 'hmx-avoid-rabbit', slots: ['TR', 'BL'], hero: { src: 'camping/rabbit', h: 62 }, goal: { src: 'vegetables/radish', h: 52 }, ...A('forest creatures/hawk', 'forest creatures/wolf'),
    cast: [{ src: 'forest creatures/hedgehog', h: 36, optional: true }, { src: 'forest creatures/blue_jay', h: 34, optional: true }] }),
  avoid('rainy', 1, false, { id: 'hmx-avoid-toycar', slots: ['BL', 'R'], hero: { src: 'toys/car', h: 50 }, goal: { src: 'around the house/garage', h: 64 }, ...A('decor:puddle', 'decor:rocks'),
    cast: [{ src: 'weather/umbrella', h: 40, optional: true }, { src: 'weather/rain_boots', h: 34, optional: true }] }),
  avoid('prehistoric', 2, false, { id: 'hmx-avoid-raptor', slots: ['BR', 'TL'], hero: { src: 'dinosaurs/styracosaurus', h: 62 }, goal: { src: 'tree/hemlock', h: 110 }, ...A('dinosaurs/tyrannosaurus_rex', 'decor:rocks'),
    cast: [] }),   // no other dinosaur on the page: every dinosaur but the hero is one to avoid
  avoid('arctic', 2, true, { id: 'hmx-avoid-penguin', slots: ['TL', 'BR'], hero: { src: 'birds 2/penguin', h: 70 }, goal: { src: 'At the Supermarket/fish', h: 40 }, ...A('ocean life/orca', 'hole'),
    cast: [{ src: 'winter/snowflake', h: 30, optional: true }] }),
  avoid('autumn', 0, true, { id: 'hmx-avoid-ant', slots: ['BL', 'TR'], hero: { src: 'insects and bugs/ant', h: 50 }, goal: { src: 'desserts and sweets/cookie', h: 50 }, ...A('decor:puddle', 'insects and bugs/spider'),
    cast: [{ src: 'miscellaneous/acorn', h: 30, optional: true }, { src: 'miscellaneous/leaf', h: 30, optional: true }] }),
  avoid('savanna', 2, false, { id: 'hmx-avoid-gazelle', slots: ['BR', 'TL'], hero: { src: 'zoo animals/gazelle', h: 72 }, goal: { src: 'tree/baobab', h: 110 }, ...A('animals/leopard', 'zoo animals/hyena'),
    cast: [{ src: 'birds 2/ostrich', h: 50, optional: true }, { src: 'zoo animals/meerkat', h: 40, optional: true }] }),

  // ------------------------------------------------------------------ LETTER HOP
  hop('hmx-hop-frog', { look: 'pond', field: '#9CC78A', comb: '#6FB5CF', cell: '#E1F2CF', edge: '#5E9A55', hero: 'forest creatures/frog', heroH: 66, goal: 'insects and bugs/dragonfly', goalH: 44, goalAt: [612, 86],
    cast: [{ src: 'insects and bugs/butterfly', at: [44, 44], h: 36 }, { src: 'flowers/forget-me-not', at: [36, 674], h: 54 }, { src: 'spring/grass', at: [646, 694], h: 30 }] }),
  hop('hmx-hop-penguin', { look: 'ice', field: '#BFD9EC', comb: '#7FB4D6', cell: '#FFFFFF', edge: '#86AFCB', hero: 'animals/penguin', heroH: 70, goal: 'animals/fish', goalH: 36, goalAt: [612, 86],
    cast: [{ src: 'winter/snowflake', at: [44, 44], h: 32 }, { src: 'winter/seal', at: [40, 674], h: 46 }, { src: 'winter/icicle', at: [646, 690], h: 34 }] }),
  hop('hmx-hop-caterpillar', { look: 'garden', field: '#B5D98C', comb: '#C9A57E', cell: '#F4EDE2', edge: '#A79C8E', hero: 'forest creatures/caterpillar', heroH: 52, goal: 'vegetables/cabbage', goalH: 52,
    cast: [{ src: 'spring/butterfly', at: [44, 44], h: 34 }, { src: 'flowers/tulip', at: [36, 674], h: 56 }, { src: 'spring/worm', at: [646, 694], h: 30 }] }),
  hop('hmx-hop-astronaut', { look: 'space', field: '#3D4A85', comb: '#5A6AA8', cell: '#FFF8E6', edge: '#C8B98A', hero: 'occupations/astronaut', heroH: 76, goal: 'space/earth', goalH: 56,
    cast: [{ src: 'space/saturn', at: [44, 44], h: 34 }, { src: 'space/comet', at: [36, 674], h: 40 }, { src: 'space/asteroid', at: [646, 694], h: 26 }] }),
  hop('hmx-hop-teddy', { look: 'candy', field: '#CDEEDF', comb: '#F2B4CA', cell: '#FFF4F7', edge: '#E5A2BA', hero: 'toys/teddy_bear', heroH: 66, goal: 'desserts and sweets/cupcake', goalH: 54,
    cast: [{ src: 'desserts and sweets/lollipop', at: [44, 44], h: 38 }, { src: 'desserts and sweets/donut', at: [36, 674], h: 40 }, { src: 'desserts and sweets/macaron', at: [646, 694], h: 26 }] }),
  hop('hmx-hop-fox', { look: 'autumn', field: '#E6C98A', comb: '#D9893F', cell: '#FCEBC4', edge: '#B98A4A', hero: 'forest creatures/fox', heroH: 66, goal: 'vegetables/pumpkin', goalH: 50,
    cast: [{ src: 'miscellaneous/leaf', at: [44, 44], h: 32 }, { src: 'thanksgivinng/acorn', at: [36, 680], h: 34 }, { src: 'vegetables/mushroom', at: [646, 694], h: 28 }] }),
];
