#!/usr/bin/env node
/**
 * generate-topic-theme-art.js — builds frontend/lib/topic-theme-art.json:
 * one archetypal image-library picture per theme axis-key, for the /topic
 * index page's theme tiles.
 *
 * Source of truth: the local webp mirror at image-library-webp/themes/
 * (identical tree served by nginx at /image-library-webp/themes/). Directory
 * resolution is done against the ACTUAL dir listing (case-insensitive match
 * on the underscore→space form), so the 8 casing exceptions (4th of July,
 * At the Supermarket, reptiles and Amphibians, Things That Fly, Christmas
 * bw…) need no hand table.
 *
 * Noun choice: per-theme preference list (curated archetypes, first-existing
 * wins; BW variants inherit their color base's list), then a generic
 * archetype list, then first file alphabetically. Every emitted path is
 * verified to exist on disk before it is written.
 *
 * Companion gate: scripts/verify-topic-theme-art.js re-asserts every path in
 * the committed JSON still exists (run before any deploy that touches the map).
 *
 * Usage: node scripts/generate-topic-theme-art.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const MIRROR = path.join(ROOT, 'image-library-webp', 'themes');
const TAXONOMY = require(path.join(ROOT, 'frontend', 'config', 'topics-taxonomy.json'));
const OUT = path.join(ROOT, 'frontend', 'lib', 'topic-theme-art.json');

// Curated archetypal nouns per COLOR theme key; BW variants inherit via
// stripBw(). First existing file wins.
const PICKS = {
  '4th_of_july': ['flag', 'fireworks'],
  accessories: ['hat', 'sunglasses', 'backpack', 'scarf'],
  activities: ['painting', 'reading', 'swimming', 'dancing'],
  animals: ['cat', 'dog', 'rabbit'],
  around_the_house: ['house', 'lamp', 'sofa', 'armchair'],
  at_the_supermarket: ['shopping cart', 'basket', 'cash register', 'apple'],
  bakery: ['bread', 'croissant', 'cake', 'baguette'],
  beach: ['sandcastle', 'sand castle', 'bucket', 'starfish', 'umbrella'],
  birds: ['owl', 'parrot', 'robin', 'duck'],
  birds_2: ['parrot', 'toucan', 'flamingo', 'owl'],
  body_parts: ['hand', 'ear', 'eye'],
  breakfast: ['pancakes', 'pancake', 'egg', 'toast', 'croissant'],
  camping: ['tent', 'campfire', 'lantern'],
  christmas: ['santa', 'santa claus', 'christmas tree', 'gift', 'snowman'],
  classroom: ['backpack', 'chalkboard', 'crayons', 'pencil', 'globe'],
  clothing: ['t-shirt', 'shirt', 'dress', 'jacket'],
  colors: ['rainbow', 'paint', 'crayons', 'palette', 'red', 'blue'],
  desserts_and_sweets: ['cupcake', 'ice cream', 'donut', 'cake'],
  dinosaurs: ['t-rex', 'tyrannosaurus', 'brachiosaurus', 'triceratops'],
  easter: ['easter egg', 'easter bunny', 'bunny', 'egg', 'chick'],
  emotions: ['happy', 'smile'],
  farm_animals: ['cow', 'pig', 'sheep', 'chicken'],
  flowers: ['sunflower', 'tulip', 'rose', 'daisy'],
  forest_creatures: ['fox', 'deer', 'owl', 'squirrel', 'hedgehog'],
  fruits: ['apple', 'banana', 'strawberry'],
  furniture: ['sofa', 'chair', 'armchair', 'table'],
  hospital: ['doctor', 'ambulance', 'nurse', 'stethoscope'],
  insects_and_bugs: ['butterfly', 'ladybug', 'bee', 'dragonfly'],
  kitchen_tools: ['pot', 'pan', 'whisk', 'spatula'],
  miscellaneous: ['house', 'star', 'ball'],
  music: ['guitar', 'drum', 'piano', 'trumpet'],
  occupations: ['chef', 'firefighter', 'doctor', 'teacher'],
  ocean_life: ['octopus', 'dolphin', 'whale', 'fish', 'seahorse'],
  pets: ['dog', 'cat', 'rabbit', 'hamster'],
  post_office: ['mailbox', 'envelope', 'letter', 'stamp'],
  reptiles_and_amphibians: ['frog', 'turtle', 'chameleon', 'lizard'],
  shapes: ['star', 'circle', 'triangle', 'heart'],
  space: ['rocket', 'astronaut', 'planet', 'ufo'],
  spring: ['flower', 'butterfly', 'bee', 'tulip'],
  summer: ['sun', 'ice cream', 'beach ball', 'watermelon'],
  thanksgivinng: ['pumpkin', 'turkey'],
  things_that_fly: ['airplane', 'hot air balloon', 'helicopter', 'butterfly'],
  tools: ['hammer', 'wrench', 'screwdriver', 'saw'],
  toys: ['teddy bear', 'ball', 'robot', 'kite'],
  tree: ['oak', 'pine', 'maple'],
  vegetables: ['carrot', 'tomato', 'broccoli', 'pumpkin'],
  vehicles: ['car', 'fire truck', 'bus', 'tractor'],
  weather: ['rainbow', 'sun', 'cloud', 'umbrella'],
  winter: ['snowman', 'snowflake', 'mittens', 'sled'],
  zoo_animals: ['elephant', 'lion', 'giraffe', 'zebra'],
  // BW-only bases (no color sibling key of the same name)
  apparel: ['t-shirt', 'shirt', 'dress', 'jacket'],
  dessert: ['cupcake', 'ice cream', 'donut', 'cake'],
  education: ['pencil', 'book', 'backpack', 'globe'],
  faces: ['happy', 'smile', 'face'],
  farm: ['barn', 'tractor', 'cow', 'scarecrow'],
  food: ['bread', 'apple', 'pizza', 'sandwich'],
  home_and_nature: ['house', 'tree', 'flower', 'lamp'],
  home: ['house', 'lamp', 'sofa', 'armchair'],
  household: ['house', 'lamp', 'broom', 'kettle'],
  kitchen: ['pot', 'pan', 'whisk', 'kettle'],
  nature: ['tree', 'flower', 'mushroom', 'leaf'],
  objects: ['umbrella', 'key', 'clock', 'book'],
  sea_life: ['octopus', 'dolphin', 'whale', 'fish'],
  sports: ['soccer ball', 'basketball', 'ball', 'tennis'],
  travel_and_holiday: ['suitcase', 'airplane', 'camera', 'passport'],
  valentine: ['heart', 'love letter', 'rose', 'cupid', 'gift', 'tulip'],
  vegetables_bw_2: ['corn', 'pepper', 'mushroom'],
};

// Generic archetypes when a theme has no curated hit.
const GENERIC = ['cat', 'dog', 'apple', 'car', 'flower', 'star', 'sun', 'house', 'ball', 'heart', 'tree', 'fish', 'book', 'butterfly'];

function stripBw(key) {
  return key.replace(/_bw(_\d+)?$/, '');
}

function main() {
  const dirs = fs.readdirSync(MIRROR).filter((d) => {
    try { return fs.statSync(path.join(MIRROR, d)).isDirectory(); } catch { return false; }
  });
  // Case-insensitive lookup: "4th of july" -> "4th of July"
  const dirByLower = new Map(dirs.map((d) => [d.toLowerCase(), d]));

  const themeKeys = Object.keys(TAXONOMY.axes.theme);
  const out = {};
  const misses = [];
  const fallbacks = [];

  for (const key of themeKeys) {
    const wanted = key.replace(/_/g, ' ').toLowerCase();
    const dir = dirByLower.get(wanted);
    if (!dir) { misses.push(key); continue; }

    const files = fs.readdirSync(path.join(MIRROR, dir)).filter((f) => f.endsWith('@2x.webp'));
    const nouns = new Set(files.map((f) => f.slice(0, -'@2x.webp'.length).toLowerCase()));

    const prefs = [...(PICKS[key] ?? PICKS[stripBw(key)] ?? []), ...GENERIC];
    let chosen = prefs.find((n) => nouns.has(n.toLowerCase()));
    if (!chosen) {
      chosen = files.sort()[0]?.slice(0, -'@2x.webp'.length);
      if (chosen) fallbacks.push(`${key} -> ${chosen} (first-alphabetical)`);
    }
    if (!chosen) { misses.push(key); continue; }

    // Preserve the dir's real casing + the file's real casing.
    const file = files.find((f) => f.slice(0, -'@2x.webp'.length).toLowerCase() === chosen.toLowerCase());
    out[key] = `/image-library-webp/themes/${dir}/${file}`;
  }

  if (misses.length) {
    console.error('FAIL — themes with no resolvable image:', misses.join(', '));
    process.exit(1);
  }

  const json = {
    _comment: 'Archetypal image-library picture per theme axis-key, for the /topic index theme tiles. Generated by scripts/generate-topic-theme-art.js against the local image-library-webp/themes mirror; verified by scripts/verify-topic-theme-art.js. Underscore-prefixed keys are documentation.',
    ...out,
  };
  fs.writeFileSync(OUT, JSON.stringify(json, null, 2) + '\n');
  console.log(`Wrote ${Object.keys(out).length}/${themeKeys.length} theme-art entries to ${path.relative(ROOT, OUT)}`);
  if (fallbacks.length) {
    console.log(`\n${fallbacks.length} first-alphabetical fallbacks (no curated/generic hit):`);
    for (const f of fallbacks) console.log('  ' + f);
  }
}

main();
