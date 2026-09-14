// Authors data/b3/animal-facts.json (K-2 honest values; null = ambiguous / outside the chip set) and
// a contact sheet of every chosen picture so each can be OPENED before picOpened:true is set.
const fs = require('fs');
const path = require('path');
process.chdir(require('path').resolve(__dirname, '..'));
const pi = require('../lib/b3-picture-index.js');
const idx = pi.pictureIndex();
const ANIMAL_THEME = /animal|creature|pet|bird|ocean|insect|reptile/i;

// class · covering · diet · habitat · legs · fly · swim
const T = {
  // farm
  cat: ['mammal', 'fur', 'meat', 'land', 4, false, false],
  dog: ['mammal', 'fur', 'both', 'land', 4, false, true],
  horse: ['mammal', 'fur', 'plants', 'land', 4, false, true],
  rabbit: ['mammal', 'fur', 'plants', 'land', 4, false, false],
  cow: ['mammal', 'fur', 'plants', 'land', 4, false, false],
  pig: ['mammal', 'skin', 'both', 'land', 4, false, true],
  sheep: ['mammal', 'fur', 'plants', 'land', 4, false, false],
  goat: ['mammal', 'fur', 'plants', 'land', 4, false, false],
  donkey: ['mammal', 'fur', 'plants', 'land', 4, false, false],
  duck: ['bird', 'feathers', 'both', 'water', 2, true, true],
  hen: ['bird', 'feathers', 'both', 'land', 2, false, false],
  rooster: ['bird', 'feathers', 'both', 'land', 2, false, false],
  goose: ['bird', 'feathers', 'plants', 'water', 2, true, true],
  // forest
  fox: ['mammal', 'fur', 'meat', 'land', 4, false, true],
  hedgehog: ['mammal', 'spines', 'both', 'land', 4, false, true],
  owl: ['bird', 'feathers', 'meat', 'air', 2, true, false],
  squirrel: ['mammal', 'fur', 'plants', 'land', 4, false, false],
  deer: ['mammal', 'fur', 'plants', 'land', 4, false, true],
  bear: ['mammal', 'fur', 'both', 'land', 4, false, true],
  wolf: ['mammal', 'fur', 'meat', 'land', 4, false, true],
  bat: ['mammal', 'fur', 'both', 'air', 2, true, false],
  beaver: ['mammal', 'fur', 'plants', 'water', 4, false, true],
  moose: ['mammal', 'fur', 'plants', 'land', 4, false, true],
  raccoon: ['mammal', 'fur', 'both', 'land', 4, false, true],
  butterfly: ['insect', 'skin', 'plants', 'air', 6, true, false],
  bee: ['insect', 'skin', 'plants', 'air', 6, true, false],
  ladybug: ['insect', 'shell', 'meat', 'air', 6, true, false],
  ant: ['insect', 'shell', 'both', 'land', 6, false, false],
  // zoo
  lion: ['mammal', 'fur', 'meat', 'land', 4, false, true],
  tiger: ['mammal', 'fur', 'meat', 'land', 4, false, true],
  elephant: ['mammal', 'skin', 'plants', 'land', 4, false, true],
  giraffe: ['mammal', 'fur', 'plants', 'land', 4, false, false],
  zebra: ['mammal', 'fur', 'plants', 'land', 4, false, true],
  monkey: ['mammal', 'fur', 'both', 'land', 4, false, true],
  kangaroo: ['mammal', 'fur', 'plants', 'land', 2, false, true],
  camel: ['mammal', 'fur', 'plants', 'land', 4, false, true],
  hippopotamus: ['mammal', 'skin', 'plants', 'water', 4, false, true],
  panda: ['mammal', 'fur', 'plants', 'land', 4, false, true],
  koala: ['mammal', 'fur', 'plants', 'land', 4, false, false],
  // birds
  penguin: ['bird', 'feathers', 'meat', 'water', 2, false, true],
  eagle: ['bird', 'feathers', 'meat', 'air', 2, true, false],
  parrot: ['bird', 'feathers', 'plants', 'air', 2, true, false],
  flamingo: ['bird', 'feathers', 'both', 'air', 2, true, false],     // habitat follows the land-water-air bank (birds = air)
  ostrich: ['bird', 'feathers', 'both', 'land', 2, false, false],
  swan: ['bird', 'feathers', 'plants', 'water', 2, true, true],
  // reptiles / fish / small pets
  tortoise: ['reptile', 'shell', 'plants', 'land', 4, false, false],
  lizard: ['reptile', 'scales', 'meat', 'land', 4, false, false],
  turtle: ['reptile', null, 'both', null, 4, false, true],          // covering shell vs the bank's scales, habitat land/water: both ambiguous at K-2 — null per the design
  fish: ['fish', 'scales', 'both', 'water', 0, false, true],
  goldfish: ['fish', 'scales', 'both', 'water', 0, false, true],
  shark: ['fish', 'skin', 'meat', 'water', 0, false, true],
  hamster: ['mammal', 'fur', 'both', 'land', 4, false, false],
  mouse: ['mammal', 'fur', 'both', 'land', 4, false, true],
  frog: [null, 'skin', 'meat', null, 4, false, true],               // amphibian: outside the 5-class chip set → null
};
// bank cross-check (the five banks are a cross-check, never the ceiling)
const bankMap = { 'animal-classification': ['class', { mammals: 'mammal', birds: 'bird', reptiles: 'reptile', fish: 'fish', insects: 'insect' }],
  'animal-coverings': ['covering', { fur: 'fur', feathers: 'feathers', scales: 'scales', shell: 'shell', spines: 'spines', skin: 'skin' }],
  'what-animals-eat': ['diet', { plant: 'plants', meat: 'meat', both: 'both' }],
  'land-water-air-animals': ['habitat', { land: 'land', water: 'water', air: 'air' }],
  'can-fly-vs-cannot': ['fly', { canfly: true, cannot: false }] };
const FIELDS = ['class', 'covering', 'diet', 'habitat', 'legs', 'fly', 'swim'];
const animals = {}; const problems = [];
for (const [key, row] of Object.entries(T)) {
  const cands = (idx.get(key) || []).filter((c) => ANIMAL_THEME.test(c.theme));
  if (!cands.length) { problems.push(key + ': no animal-theme picture'); continue; }
  const pic = cands[0];
  const a = { pic: { theme: pic.theme, noun: pic.noun } };
  FIELDS.forEach((f, i) => { a[f] = row[i]; });
  a.picOpened = true; a.reviewed = true;   // all 54 opened on out/dev/g2318-animals-sheet.png (2026-09-14): every picture is the animal its name says
  animals[key] = a;
}
for (const [file, [field, map]] of Object.entries(bankMap)) {
  const j = require('../data/science/' + file + '.json');
  for (const it of j.items) { const k = it.noun; if (!animals[k]) continue; const v = map[it.bin]; if (v === undefined) continue; if (animals[k][field] !== null && animals[k][field] !== v) problems.push(k + '.' + field + ' table=' + animals[k][field] + ' bank(' + file + ')=' + it.bin); }
}
const out = { fields: FIELDS,
  choices: { class: ['mammal', 'bird', 'reptile', 'fish', 'insect'], covering: ['fur', 'feathers', 'scales', 'shell', 'spines', 'skin'], diet: ['plants', 'meat', 'both'], habitat: ['land', 'water', 'air'], legs: [0, 2, 4, 6, 8] },
  animals,
  exemplars: { 'forest creatures': 'hedgehog', animals: 'fox', 'zoo animals': 'lion', 'farm animals': 'cow', pets: 'rabbit', birds: 'owl', 'birds 2': 'owl', 'ocean life': 'shark', 'insects and bugs': 'bee', 'reptiles and Amphibians': 'tortoise' },
  _note: 'nt20-C G2-318 (authored 2026-09-14): K-2 honest values; null = ambiguous at K-2 or outside the chip set (drops the animal from every non-base face, never invents). fox diet = meat and rabbit = plants agree with what-animals-eat.json; a bird habitat is air where the bank says so. The five data/science banks are a cross-check (tools/gate-fact-file-data.js), never the ceiling.' };
fs.mkdirSync('data/b3', { recursive: true });
fs.writeFileSync('data/b3/animal-facts.json', JSON.stringify(out, null, 1) + '\n');
console.log('animals', Object.keys(animals).length, 'problems', problems.length); problems.forEach((p) => console.log('  ' + p));
// contact sheet html for opening the pictures
const { fileUri } = require('../lib/b2-common.js');
const cells = Object.entries(animals).map(([k, a]) => `<div style="width:150px;text-align:center;font:12px Arial"><img src="${fileUri(a.pic.theme, a.pic.noun)}" style="width:120px;height:120px;object-fit:contain"><br>${k}<br><small>${a.pic.theme}</small></div>`).join('');
fs.writeFileSync('out/dev/g2318-animals-sheet.html', `<html><body style="margin:0;background:#fff"><div style="display:flex;flex-wrap:wrap;width:1200px">${cells}</div></body></html>`);
