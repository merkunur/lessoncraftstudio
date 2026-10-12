/**
 * data/hmx/scenes-b6.js — Maze Puzzles Level Set scenes, batch 6: FIRST SOUND (K-412, 6) and the MAZE COLOURING PAGE
 * (K-413, 15).
 *
 * First sound: the hero is the CUE — an animal (or the tractor) whose name starts with the same sound in all eleven
 * languages (checked by tools/level-set/hmx-sound-pools.js against image-vocabulary.js): leopard /l/ (the published /l/
 * pool), tiger, toucan, tractor /t/, panda, pelican /p/ (data/hmx/sound-pools.json, every card picture read).
 * Colouring: black-and-white library drawings ONLY (never mixed with colour), the scenery drawn as ink outlines on white
 * paper (lib/hmx-scenery.js line mode), so the whole picture is there to colour after the way is found.
 */
'use strict';
const { SET } = require('./settings.js');
const h = (src, hh) => ({ src, h: hh });
const opt = (src, hh) => ({ src, h: hh, optional: true });
const sound = (set, v, flip, rest, o = {}) => ({ face: 'first-sound', setting: set + v, ...SET[set]({ v, flip, flat: true, ...o }), ...rest });

/** a colouring scene: white paper, ink lines; motifs / decor drawn as outlines */
function colour(id, o) {
  return {
    id, face: 'maze-colouring', setting: 'line-' + o.look, paint: 'line',
    band: { h: 76, sky: '#FFFFFF', hill: '#FFFFFF' }, motifs: o.motifs || [],
    field: '#FFFFFF', corridor: { fill: '#FFFFFF', edge: '#3A3530', outline: 2.5 },
    slots: o.slots, hero: o.hero, goal: o.goal, cast: o.cast, decor: o.decor || [],
    texture: { n: o.texN || 16, gap: 50, kinds: o.tex || ['linetuft'], colours: { linetuft: ['#3A3530'], sand: ['#3A3530'], star: ['#FFFFFF'], bubble: ['#3A3530'] } },
  };
}

module.exports = [
  // ------------------------------------------------------------------ FIRST SOUND
  sound('jungle', 2, false, { id: 'hmx-sound-leopard', slots: ['TR', 'BR'], hero: h('animals/leopard', 84), goal: h('tree/coconut', 104), labels: { target: 'l' }, cast: [] }),
  sound('jungle', 1, true, { id: 'hmx-sound-tiger', slots: ['TL', 'BL'], hero: h('zoo animals/tiger', 80), goal: h('tree/banana', 104), labels: { target: 't' }, cast: [] }),
  sound('forest', 1, false, { id: 'hmx-sound-toucan', slots: ['TR', 'BR'], hero: h('birds 2/toucan', 74), goal: h('tree/orange', 104), labels: { target: 't' }, cast: [] }),
  sound('farmyard', 0, true, { id: 'hmx-sound-tractor', slots: ['TL', 'BL'], hero: h('vehicles/tractor', 66), goal: h('thanksgivinng/pumpkin', 62), labels: { target: 't' }, cast: [] }),
  sound('blossom', 2, false, { id: 'hmx-sound-panda', slots: ['TR', 'BR'], hero: h('zoo animals/panda', 80), goal: h('flowers/cherry_blossom', 80), labels: { target: 'p' }, cast: [] }),

  // ------------------------------------------------------------------ MAZE COLOURING PAGE (black and white)
  colour('hmx-colour-pig', { look: 'farm', slots: ['BL', 'TR'], hero: h('farm bw/pig', 72), goal: h('farm bw/barn', 96),
    cast: [h('farm bw/windmill', 110), opt('farm bw/hay', 48), opt('farm bw/watering_can', 44)], motifs: [{ k: 'sun', x: 90, y: 30, r: 15 }, { k: 'cloud', x: 330, y: 26, s: 0.9 }], decor: [{ k: 'flowerbed', n: 2 }] }),
  colour('hmx-colour-horse', { look: 'field', slots: ['TL', 'BR'], hero: h('farm bw/horse', 80), goal: h('farm bw/hay', 64),
    cast: [h('farm bw/scarecrow', 100), opt('farm bw/wheelbarrow', 50), opt('farm bw/rooster', 52)], motifs: [{ k: 'fence', near: true }, { k: 'cloud', x: 540, y: 22, s: 0.8 }], decor: [{ k: 'rocks', n: 1 }] }),
  colour('hmx-colour-monkey', { look: 'jungle', slots: ['BR', 'TL'], hero: h('animals bw 5/monkey', 74), goal: h('home and nature bw/tree_3', 120),
    cast: [h('animals bw 5/snake', 56), opt('animals bw 5/frog', 44), opt('animals bw 5/sloth', 60)], motifs: [{ k: 'treeline', h: 40, step: 26, key: 'cj' }], decor: [{ k: 'fern', n: 2 }] }),
  colour('hmx-colour-penguin', { look: 'ice', slots: ['BL', 'TR'], hero: h('animals bw 5/penguin', 74), goal: h('sea life bw/fish', 50),
    cast: [h('sea life bw/orca', 54), opt('nature bw/snowflake', 40), opt('sea life bw/whale', 50)], motifs: [{ k: 'mountains', peaks: [[160, 170, 48], [380, 140, 36]], snow: '#FFFFFF' }], decor: [{ k: 'iceblock', n: 2 }], tex: ['sand'] }),
  colour('hmx-colour-hedgehog', { look: 'meadow', slots: ['TR', 'BL'], hero: h('animals bw 5/hedgehog', 62), goal: h('nature bw/mushroom', 66),
    cast: [h('nature bw/butterfly', 46), opt('nature bw/ladybug', 40), opt('nature bw/leaf', 40)], motifs: [{ k: 'sun', x: 590, y: 30, r: 15 }, { k: 'cloud', x: 140, y: 24, s: 0.9 }], decor: [{ k: 'flowerbed', n: 1 }, { k: 'fern', n: 1 }] }),
  colour('hmx-colour-turtle', { look: 'beach', slots: ['BC', 'TR'], hero: h('sea life bw/turtle', 62), goal: h('beach bw 2/island', 96),
    cast: [h('beach bw 2/umbrella', 90), opt('beach bw 2/seashell', 40), opt('beach bw 2/bucket', 44)], motifs: [{ k: 'sun', x: 90, y: 26, r: 13 }, { k: 'sea', y: 46 }], decor: [{ k: 'shells', n: 1 }], tex: ['sand'] }),
  colour('hmx-colour-squirrel', { look: 'forest', slots: ['BR', 'TL'], hero: h('animals bw 5/squirrel', 66), goal: h('home and nature bw/tree', 120),
    cast: [h('animals bw 5/owl', 54), opt('home and nature bw/leaf', 40), opt('animals bw 5/fox', 60)], motifs: [{ k: 'treeline', kind: 'pine', h: 40, step: 28, key: 'cf' }], decor: [{ k: 'stump', n: 1 }, { k: 'leafpile', n: 1 }] }),
  colour('hmx-colour-camel', { look: 'desert', slots: ['BL', 'TR'], hero: h('animals bw 5/camel', 76), goal: h('nature bw/pyramid', 76),
    cast: [h('nature bw/cactus', 60), opt('animals bw 5/lizard', 40), opt('animals bw 5/ostrich_2', 70)], motifs: [{ k: 'sun', x: 120, y: 32, r: 17 }, { k: 'dunes', list: [[-40, 260, 22], [200, 520, 28], [460, 720, 20]] }], decor: [{ k: 'rocks', n: 1 }], tex: ['sand'] }),
  colour('hmx-colour-frog', { look: 'rain', slots: ['TL', 'BR'], hero: h('animals bw 5/frog', 58), goal: h('nature bw/umbrella', 74),
    cast: [h('nature bw/rain', 54), opt('nature bw/droplet', 36), opt('home and nature bw/flower', 50)], motifs: [{ k: 'cloud', x: 160, y: 24, s: 1.1 }, { k: 'cloud', x: 470, y: 20, s: 0.9 }], decor: [{ k: 'puddle', n: 2 }] }),
  colour('hmx-colour-octopus', { look: 'sea', slots: ['TR', 'BL'], hero: h('sea life bw/octopus', 66), goal: h('sea life bw/starfish', 54),
    cast: [h('sea life bw/seahorse', 56), opt('sea life bw/jellyfish', 50), opt('sea life bw/clown_fish', 40)], motifs: [{ k: 'sea', y: 30 }], decor: [{ k: 'seaweed', n: 2 }, { k: 'rocks', n: 1 }], tex: ['bubble'] }),
  colour('hmx-colour-bee', { look: 'garden', slots: ['BL', 'TR'], hero: h('animals bw 5/bee', 56), goal: h('nature bw/flower', 86),
    cast: [h('nature bw/butterfly', 44), opt('home and nature bw/plant', 54), opt('animals bw 5/bird', 44)], motifs: [{ k: 'sun', x: 600, y: 30, r: 15 }, { k: 'fence', near: true }], decor: [{ k: 'flowerbed', n: 2 }] }),
  colour('hmx-colour-dog', { look: 'home', slots: ['BR', 'TL'], hero: h('animals bw 5/dog', 66), goal: h('home and nature bw/house', 96),
    cast: [h('home and nature bw/tree_2', 100), opt('home and nature bw/trash_can', 46), opt('farm bw/fence', 40)], motifs: [{ k: 'cloud', x: 520, y: 26, s: 0.9 }, { k: 'birds', pts: [[250, 30, 1]] }], decor: [{ k: 'flowerbed', n: 2 }] }),
  colour('hmx-colour-rocket', { look: 'space', slots: ['BL', 'TR'], hero: h('space bw/rocket', 84), goal: h('space bw/earth', 76),
    cast: [h('space bw/planet', 60), opt('space bw/ufo', 46), opt('space bw/meteor', 46)], motifs: [{ k: 'moon', x: 590, y: 34, r: 16 }, { k: 'stars', n: 12, y1: 56, key: 'cs' }], decor: [{ k: 'crater', n: 2 }], tex: ['sand'], texN: 14 }),
  colour('hmx-colour-ambulance', { look: 'town', slots: ['TL', 'BR'], hero: h('vehicles bw/ambulance', 54), goal: h('home and nature bw/house', 90),
    cast: [h('home and nature bw/tree', 100), opt('vehicles bw/bus', 40), opt('vehicles bw/scooter', 40)], motifs: [{ k: 'skyline', key: 'ct' }], decor: [{ k: 'flowerbed', n: 1 }] }),
  colour('hmx-colour-snowman', { look: 'christmas', slots: ['BR', 'TL'], hero: h('Christmas bw/snowman', 76), goal: h('Christmas bw/christmas_tree', 110),
    cast: [h('Christmas bw/gift_box', 50), opt('Christmas bw/candy_cane', 50), opt('Christmas bw/stocking', 46)], motifs: [{ k: 'stars', n: 10, y1: 50, key: 'cx' }, { k: 'mountains', peaks: [[140, 160, 44], [430, 150, 38]], snow: '#FFFFFF' }], decor: [{ k: 'drift', n: 2 }], tex: ['sand'] }),
  colour('hmx-colour-tractor', { look: 'harvest', slots: ['BL', 'TR'], hero: h('vehicles bw/tractor', 62), goal: h('farm bw/vegetables', 66),
    cast: [h('farm bw/turkey', 60), opt('farm bw/goat', 54), opt('farm bw/duck', 46)], motifs: [{ k: 'sun', x: 120, y: 30, r: 15 }, { k: 'treeline', near: true, h: 30, key: 'ch' }], decor: [{ k: 'hay', n: 1 }] }),
];
