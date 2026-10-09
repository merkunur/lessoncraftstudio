/**
 * data/fd/props.js — the prop drawings a Find-the-Differences scene may ADD or SWAP in (nt2-G / b7). Every entry is a
 * library B&W drawing already used in a reviewed Color by Number scene, or one opened on the contact sheets of this
 * batch (tools/fd-sheets.js --props). `place` says where it may stand: 'sky' (anchor 'c', y in the sky band) or
 * 'ground' (bottom on the ground). `h` is its drawing height in picture units; `alt` lists swap partners of the same
 * kind and similar size (a swap keeps the place and the size).
 */
'use strict';
const PROPS = {
  'home and nature bw/cloud': { place: 'sky', h: 60, colour: ['none'], alt: ['home and nature bw/cloud'] },
  'beach bw/sun': { place: 'sky', h: 110, colour: ['yellow'], alt: ['nature bw/moon'] },
  'nature bw/moon': { place: 'sky', h: 110, colour: ['yellow'], alt: ['beach bw/sun'] },
  'nature bw/star': { place: 'sky', h: 45, colour: ['yellow'], alt: [] },
  'home and nature bw/flower': { place: 'ground', h: 150, colour: ['pink', 'pink', 'pink', 'pink', 'pink', 'yellow'], alt: ['valentine bw 2/tulip', 'nature bw/flower'] },
  'nature bw/flower': { place: 'ground', h: 150, colour: ['yellow', 'green', 'green'], alt: ['home and nature bw/flower', 'valentine bw 2/tulip'] },
  'valentine bw 2/tulip': { place: 'ground', h: 150, colour: ['red', 'green', 'green'], alt: ['home and nature bw/flower', 'nature bw/flower'] },
  'nature bw/mushroom': { place: 'ground', h: 110, colour: ['red', 'none'], alt: ['Easter bw/mushroom'] },
  'Easter bw/mushroom': { place: 'ground', h: 110, colour: ['red', 'none'], alt: ['nature bw/mushroom'] },
  'nature bw/cactus': { place: 'ground', h: 170, colour: ['green', 'orange'], alt: [] },
  'beach bw/seashell': { place: 'ground', h: 90, colour: ['pink'], alt: ['beach bw/starfish', 'beach bw 2/seashell_2'] },
  'beach bw 2/seashell_2': { place: 'ground', h: 90, colour: ['orange'], alt: ['beach bw/seashell', 'beach bw/starfish'] },
  'beach bw/starfish': { place: 'ground', h: 100, colour: ['orange'], alt: ['beach bw/seashell'] },
  'beach bw/beach_ball': { place: 'ground', h: 110, colour: ['red', 'yellow', 'blue', 'none'], alt: ['beach bw/bucket'] },
  'beach bw/bucket': { place: 'ground', h: 120, colour: ['red', 'yellow'], alt: ['beach bw/beach_ball'] },
  'nature bw/bird': { place: 'ground', h: 60, colour: ['lightblue', 'orange'], alt: [] },   // a STANDING chick: on the ground, never in the sky (designer B, 2026-10-09)
  'birds bw/hummingbird': { place: 'sky', h: 70, colour: ['green', 'orange'], alt: ['nature bw/butterfly'] },
  'nature bw/butterfly': { place: 'sky', h: 70, colour: ['purple', 'orange'], alt: ['Easter bw/butterfly'] },
  'Easter bw/butterfly': { place: 'sky', h: 70, colour: ['purple', 'orange'], alt: ['nature bw/butterfly'] },
  'farm bw/hay': { place: 'ground', h: 120, colour: ['yellow'], alt: [] },
  'farm bw/fence': { place: 'ground', h: 110, colour: ['brown'], alt: [] },
  'Christmas bw/snowman': { place: 'ground', h: 170, colour: ['none', 'none', 'red', 'black'], alt: [] },
  'Easter bw/egg': { place: 'ground', h: 80, colour: ['pink', 'blue'], alt: ['Easter bw/basket'] },
  'Easter bw/basket': { place: 'ground', h: 110, colour: ['brown', 'pink', 'blue'], alt: ['Easter bw/egg'] },
  'farm bw/watering_can': { place: 'ground', h: 110, colour: ['green'], alt: ['farm bw/wheelbarrow'] },
  'farm bw/wheelbarrow': { place: 'ground', h: 120, colour: ['red', 'black'], alt: ['farm bw/watering_can'] },
  'space bw/planet': { place: 'sky', h: 90, colour: ['orange', 'yellow'], alt: ['space bw/planet_2'] },
  'space bw/planet_2': { place: 'sky', h: 90, colour: ['purple', 'lightblue'], alt: ['space bw/planet'] },
  'nature bw/leaf': { place: 'ground', h: 70, colour: ['green'], alt: ['home and nature bw/leaf'] },
  'home and nature bw/leaf': { place: 'ground', h: 70, colour: ['orange'], alt: ['nature bw/leaf'] },
  'nature bw/ladybug': { place: 'ground', h: 55, colour: ['red', 'black'], alt: [] },
  'nature bw/snowflake': { place: 'sky', h: 55, colour: ['lightblue'], alt: [] },
  'sea life bw/fish_3': { place: 'sky', h: 80, colour: ['orange', 'yellow'], alt: ['sea life bw/clown_fish'] },
  'sea life bw/clown_fish': { place: 'sky', h: 80, colour: ['orange', 'none'], alt: ['sea life bw/fish_3'] },
  'beach bw/sandcastle': { place: 'ground', h: 130, colour: ['yellow', 'red'], alt: ['beach bw/bucket'] },
  'beach bw/umbrella': { place: 'ground', h: 170, colour: ['red', 'yellow', 'grey'], alt: [] },
  'home and nature bw/frame': { place: 'sky', h: 110, colour: ['brown', 'lightblue'], alt: [] },
  'home and nature bw/teacup': { place: 'ground', h: 70, colour: ['lightblue'], alt: ['home and nature bw/bowl'] },
  'home and nature bw/bowl': { place: 'ground', h: 60, colour: ['blue'], alt: ['home and nature bw/teacup'] },
  'fruits bw/apple': { place: 'ground', h: 70, colour: ['red', 'green'], alt: ['dessert bw/cupcake'] },
  'dessert bw/cupcake': { place: 'ground', h: 80, colour: ['pink', 'brown'], alt: ['fruits bw/apple'] },
  'toys bw 2/dice': { place: 'ground', h: 60, colour: ['none', 'black'], alt: [] },
  'toys bw/teddy_bear': { place: 'ground', h: 110, colour: ['brown'], alt: [] },
  'Christmas bw/christmas_tree': { place: 'ground', h: 200, colour: ['green', 'red', 'yellow', 'blue'], alt: [] },
  'household bw/plant': { place: 'ground', h: 110, colour: ['red', 'orange'], alt: [] },
  'Easter bw/carrot': { place: 'ground', h: 80, colour: ['orange', 'green'], alt: [] },
};
/** props a theme's scene may receive (ADD): sky and ground lists, in preference order */
const THEME_PROPS = {
  farm: { sky: ['birds bw/hummingbird', 'home and nature bw/cloud', 'nature bw/butterfly'], ground: ['nature bw/bird', 'farm bw/hay', 'home and nature bw/flower', 'farm bw/fence', 'farm bw/watering_can', 'farm bw/wheelbarrow'] },
  garden: { sky: ['nature bw/butterfly', 'birds bw/hummingbird', 'home and nature bw/cloud'], ground: ['nature bw/bird', 'nature bw/mushroom', 'nature bw/flower', 'farm bw/watering_can', 'nature bw/ladybug', 'valentine bw 2/tulip'] },
  pond: { sky: ['birds bw/hummingbird', 'home and nature bw/cloud', 'nature bw/butterfly'], ground: ['nature bw/bird', 'nature bw/flower', 'nature bw/mushroom', 'valentine bw 2/tulip'] },
  forest: { sky: ['birds bw/hummingbird', 'home and nature bw/cloud', 'nature bw/butterfly'], ground: ['nature bw/bird', 'nature bw/mushroom', 'home and nature bw/flower', 'Easter bw/mushroom', 'nature bw/leaf'] },
  savanna: { sky: ['home and nature bw/cloud'], ground: ['nature bw/bird', 'nature bw/cactus', 'nature bw/flower'] },
  sea: { sky: ['sea life bw/fish_3', 'sea life bw/clown_fish'], ground: ['beach bw/seashell', 'beach bw/starfish', 'beach bw 2/seashell_2'] },
  beach: { sky: ['home and nature bw/cloud'], ground: ['nature bw/bird', 'beach bw/beach_ball', 'beach bw/bucket', 'beach bw/seashell', 'beach bw/starfish', 'beach bw/sandcastle'] },
  desert: { sky: ['home and nature bw/cloud'], ground: ['nature bw/cactus'] },
  winter: { sky: ['home and nature bw/cloud', 'nature bw/snowflake'], ground: ['Christmas bw/snowman', 'Christmas bw/christmas_tree'] },
  night: { sky: ['nature bw/star', 'space bw/planet', 'space bw/planet_2'], ground: ['nature bw/mushroom'] },
  room: { sky: ['home and nature bw/frame'], ground: ['household bw/plant', 'toys bw/teddy_bear', 'toys bw 2/dice'] },
  table: { sky: ['home and nature bw/frame'], ground: ['home and nature bw/teacup', 'fruits bw/apple', 'dessert bw/cupcake', 'home and nature bw/bowl'] },
  town: { sky: ['home and nature bw/cloud'], ground: ['nature bw/bird', 'home and nature bw/flower', 'farm bw/fence'] },
};
module.exports = { PROPS, THEME_PROPS };
