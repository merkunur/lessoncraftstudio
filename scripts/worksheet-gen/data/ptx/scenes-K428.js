/**
 * data/ptx/scenes-K428.js — K-428 "Finish the picture" Level Set copies (ptl): pictures on two shelves, each with exactly
 * ONE nameable missing part dashed (`render: 'part'`, the region in the drawing's own box) and the rest drawn solid; the
 * copy's instruction lists the parts by kind, in shelf order ("a cap, a shell …"). Never a left/right half (G1-432 owns
 * that). Concepts: _work/ptl-scenes-B.json (Designer B); every region set by MEASUREMENT (out/ptl/_part.js: what the page
 * dashes, as a share of the picture's whole line length) and read on the render.
 * Levels (ptl-levels.md §K-428): L1 K-1 — 4 pictures (2 × 2) 230-280 px, one BIG part (measured 30-70 %) · L2 K —
 * 6 (2 × 3, the published shelves) 190-230 px, one part (≈ 15-45 %) · L3 K-3 — 8 (2 × 4) 130-160 px, one small part
 * (a beak, a stem, a handle ≈ 5-25 %).
 */
'use strict';
const { helpers: { SOLID } } = require('../b9/face-scenes.js');
const BAND = { 1: { band: 'K-1', style: 'P1' }, 2: { band: 'K', style: 'P2' }, 3: { band: 'K-3', style: 'P3' } };
const SHELVES = [{ m: 'roundRect', a: [10, 345, 655, 10, 5], fill: SOLID }, { m: 'roundRect', a: [10, 700, 655, 10, 5], fill: SOLID }];
const LAY = { 1: { n: 2, fit: 255 }, 2: { n: 3, fit: 205 }, 3: { n: 4, fit: 145 } };
/** pictures [src, [x0, y0, x1, y1], extra?] → two shelves of n each, every picture fitted to the level's size */
function shelves(level, pics, top) {
  const { n, fit } = LAY[level];
  if (pics.length !== 2 * n) throw new Error(`K-428 L${level}: ${pics.length} pictures for ${2 * n} places`);
  const W = 655 / n, items = pics.map(([src, r, extra = {}], i) => ({ src, x: Math.round(10 + W * ((i % n) + 0.5)), y: i < n ? 340 : 695, fit: Math.min(fit, W - 28), render: 'part', part: { x0: r[0], y0: r[1], x1: r[2], y1: r[3] }, noBlobs: true, ...extra }));
  return { ...BAND[level], occlusion: false, decor: [...SHELVES, ...top], items, motifs: [] };
}
const bunting = (w = 2) => [{ m: 'bunting', a: [4, 671, 30, 30, 8], w }];
// L1 pictures stand 255 px tall: the bunting would touch their tops, so L1 shelves carry none
const copy = (id, level, name, parts, pics, top = level === 1 ? [] : bunting()) => ({ id: 'ptx-K-428-' + id, face: 'K-428', level, name: { en: name },
  instr: { en: 'Finish each picture: trace ' + parts.slice(0, -1).join(', ') + ' and ' + parts[parts.length - 1] + '.' }, skin: () => shelves(level, pics, top) });
const SCENES = [
  // ── L1 — four big pictures, one big part each ────────────────────────────────────────────────────────────────────────
  copy('nature-shelf', 1, 'The Nature Shelf', ['a cap', 'a shell', 'a treetop', 'a flower'], [
    ['Easter bw/mushroom', [0, 0, 1, 0.45]], ['animals bw/snail', [0.4, 0, 1, 0.85]], ['home and nature bw/tree', [0, 0, 1, 0.62]], ['Easter bw/tulip', [0.15, 0, 0.85, 0.42]]]),
  // one claw: a box round both claws dashes the eyes too; the porthole hull of vehicles bw/sailboat read as "ooo"
  copy('boat-hut', 1, 'The Boat Hut', ['sails', 'a claw', 'a sunshade', 'a lamp room'], [
    ['beach bw/sailboat', [0, 0, 1, 0.7]], ['animals bw 5/crab', [0.64, 0, 1, 0.45]], ['beach bw/umbrella', [0, 0, 1, 0.5]], ['beach bw/lighthouse', [0.42, 0, 0.7, 0.33]]]),
  copy('toy-street', 1, 'The Toy Street', ['a roof', 'a lampshade', 'wheels', 'a handlebar'], [
    ['home and nature bw/house', [0, 0, 1, 0.45]], ['home bw/lamp', [0, 0, 1, 0.45]], ['vehicles bw 2/bus', [0, 0.78, 1, 1]], ['sports bw/scooter', [0, 0, 0.5, 0.5]]]),
  copy('dolls-house', 1, 'The Doll’s House', ['a chair back', 'a lampshade', 'a table stand', 'a sofa back'], [
    ['furniture bw/chair', [0, 0, 1, 0.52]], ['furniture bw/floor_lamp', [0, 0, 1, 0.32]], ['furniture bw/table', [0, 0.3, 1, 1]], ['furniture bw/sofa', [0, 0, 1, 0.45]]]),
  copy('sweet-shop', 1, 'The Sweet Shop', ['icing', 'a scoop', 'a top layer', 'a donut’s top'], [
    ['valentine bw/cupcake', [0, 0, 1, 0.52]], ['dessert bw/ice_cream', [0, 0, 1, 0.45]], ['valentine bw/cake', [0, 0, 1, 0.45]], ['food bw/donut', [0, 0, 1, 0.5]]]),
  // ── L2 — the published six, one part each ────────────────────────────────────────────────────────────────────────────
  copy('pet-shop', 2, 'The Pet Shop', ['a cat’s tail', 'a tail fin', 'ears', 'an ear', 'a bird’s tail', 'feet'], [
    ['animals bw 4/cat', [0.7, 0, 1, 0.75]], ['nature bw/fish', [0.75, 0, 1, 1]], ['faces bw/mouse', [0, 0, 1, 0.38]], ['faces bw/rabbit', [0.6, 0.05, 0.95, 0.5]], ['birds bw 2/bird', [0.7, 0.4, 1, 0.8]], ['animals bw 4/chick', [0, 0.85, 1, 1]]]),
  copy('aquarium', 2, 'The Aquarium', ['a dolphin’s tail', 'tentacles', 'a horn', 'a flipper', 'a claw', 'a seahorse’s tail'], [
    ['sea life bw/dolphin', [0.5, 0.6, 1, 1]], ['sea life bw/jellyfish', [0, 0.42, 1, 1]], ['sea life bw/narwhal', [0, 0, 0.35, 0.4]], ['sea life bw/penguin', [0, 0.4, 0.26, 0.78]], ['sea life bw/crab', [0.7, 0, 1, 0.32]], ['sea life bw/seahorse', [0, 0.62, 1, 1]]]),
  copy('kitchen', 2, 'The Kitchen Dresser', ['a pan handle', 'a jar lid', 'a kettle handle', 'a rolling pin handle', 'a blender lid', 'a bowl'], [
    ['kitchen bw/saucepan', [0.58, 0, 1, 0.56]], ['kitchen bw/jar', [0, 0, 1, 0.18]], ['kitchen bw/electric_kettle', [0.62, 0, 1, 0.7]], ['kitchen bw/rolling_pin', [0.78, 0, 1, 0.6]], ['home bw/blender', [0, 0, 1, 0.12]], ['home bw/mixer', [0, 0.45, 0.75, 1]]]),
  copy('garden-shed', 2, 'The Garden Shed', ['a spout', 'a blade', 'a mower handle', 'a head', 'a stick', 'a roller handle'], [
    ['home bw 2/watering_can', [0, 0, 0.36, 0.62]], ['tools bw/shovel', [0, 0.62, 1, 1]], ['tools bw/lawn_mower', [0.35, 0, 1, 0.6]], ['tools bw/hammer', [0.45, 0, 1, 0.45]], ['home bw 2/broom', [0.1, 0, 1, 0.78]], ['tools bw/paint_roller', [0, 0.38, 1, 1]]]),
  copy('clothes-shop', 2, 'The Clothes Shop', ['a peak', 'a sleeve', 'a heel', 'a hood', 'a handle', 'cuffs'], [
    ['apparel bw/cap', [0, 0.45, 0.5, 1]], ['apparel bw/t-shirt', [0, 0, 0.28, 0.5]], ['apparel bw/high-heeled_shoes', [0.62, 0.35, 1, 1]], ['apparel bw/coat_2', [0.25, 0, 0.75, 0.22]], ['valentine bw 2/handbag', [0, 0, 1, 0.36]], ['apparel bw/mittens', [0, 0.72, 1, 1]]]),
  // ── L3 — eight smaller pictures, one small part each ─────────────────────────────────────────────────────────────────
  copy('bird-house', 3, 'The Birdwatchers’ Hut', ['a beak', 'a wing', 'a parrot’s tail', 'a comb', 'legs', 'ear tufts', 'a pigeon’s tail', 'a neck'], [
    ['birds bw 2/toucan', [0, 0, 0.45, 0.45]], ['birds bw/woodpecker', [0.4, 0.04, 0.86, 0.7]], ['birds bw/parrot', [0.55, 0.6, 1, 1]], ['birds bw 2/chicken', [0, 0, 0.35, 0.2]],
    ['birds bw/flamingo', [0, 0.55, 1, 1]], ['animals bw 5/owl', [0, 0, 1, 0.12]], ['birds bw/pigeon', [0.6, 0.55, 1, 1]], ['birds bw 2/swan', [0, 0, 0.45, 0.65]]]),
  copy('toy-cupboard', 3, 'The Toy Cupboard', ['ears', 'a rocker', 'an aerial', 'a tail rotor', 'a funnel', 'a stick', 'drumsticks', 'a trumpet’s bell'], [
    ['animals bw/teddy_bear_2', [0, 0, 1, 0.25]], ['toys bw/rocking_horse', [0, 0.82, 1, 1]], ['toys bw 2/robot', [0, 0, 1, 0.18]], ['toys bw 2/helicopter', [0.8, 0, 1, 0.6]],
    ['toys bw/train', [0.05, 0, 0.3, 0.35]], ['toys bw 2/pinwheel', [0, 0.58, 0.55, 1]], ['toys bw/drum', [0, 0, 1, 0.28]], ['toys bw 2/trumpet', [0.7, 0, 1, 1]]]),
  copy('bathroom', 3, 'The Bathroom Shelf', ['a brush handle', 'a cup handle', 'a bucket handle', 'feet', 'a bar', 'a lid', 'a mirror', 'teeth'], [
    ['objects bw/toothbrush', [0, 0.35, 0.62, 1]], ['home bw/cup', [0.62, 0.55, 0.97, 0.9]], ['household bw/bucket', [0, 0, 1, 0.32]], ['home bw/bathtub', [0, 0.9, 1, 1]],
    ['home bw 2/hanger', [0, 0.88, 1, 1]], ['household bw/toilet', [0, 0, 1, 0.18]], ['household bw/sink', [0, 0, 1, 0.36]], ['objects bw/comb', [0, 0, 1, 0.5]]]),
  copy('market-stall', 3, 'The Market Stall', ['a leaf', 'stems', 'a pumpkin stem', 'leaves', 'a mushroom stalk', 'an eggplant’s cap', 'a melon stalk', 'a pear stem'], [
    ['fruits bw/apple_2', [0.5, 0, 1, 0.3]], ['fruits bw/cherry', [0, 0, 1, 0.55]], ['vegetables bw/pumpkin', [0.35, 0, 0.65, 0.25]], ['vegetables bw/carrot', [0.6, 0, 1, 0.35]],
    ['vegetables bw 2/mushroom', [0.2, 0.55, 0.8, 1]], ['vegetables bw/eggplant', [0.7, 0, 1, 0.45]], ['fruits bw/watermelon', [0.35, 0, 0.7, 0.18]], ['fruits bw/pear', [0.3, 0, 0.8, 0.3]]]),
  copy('zoo-shop', 3, 'The Zoo Gift Shop', ['a trunk', 'horns', 'a leopard’s tail', 'an ear', 'a monkey’s tail', 'a neck', 'ears', 'a head'], [
    ['animals bw/elephant', [0, 0.3, 0.3, 0.8]], ['animals bw/rhinoceros', [0, 0, 0.3, 0.5]], ['animals bw 2/leopard', [0.78, 0.38, 1, 0.84]], ['animals bw 5/koala', [0.66, 0.04, 1, 0.53]],
    ['animals bw/monkey', [0.65, 0, 1, 0.6]], ['animals bw 5/ostrich_2', [0.05, 0, 0.45, 0.55]], ['animals bw/panda', [0, 0, 1, 0.25]], ['animals bw 5/turtle', [0, 0, 0.35, 0.6]]]),
];
module.exports = { SCENES };
