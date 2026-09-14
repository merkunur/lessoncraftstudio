#!/usr/bin/env node
/**
 * gate-fact-file-data.js — data/b3/animal-facts.json (G2-318 animal-fact-file)
 * against the five live data/science banks + the design's shape rules.
 * Disagreement table != bank on any key = FAIL; a value outside `choices` =
 * FAIL; a reviewed animal whose picture does not resolve on disk, is not
 * opened, or comes from a BW theme = FAIL; every exemplar must exist.
 * `null` is the sanctioned answer for a K-2 ambiguity (turtle covering /
 * habitat, frog class) and drops the animal from every non-base face.
 * Poison (each must FAIL): P1 rabbit.diet:'meat' (contradicts
 * what-animals-eat.json) · P2 fox.legs:5 (outside choices) · P3 a picture
 * from `zoo animals bw` · P4 picOpened:false on a reviewed animal.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { fileUri } = require('../lib/b2-common.js');

const FILE = path.join(__dirname, '..', 'data', 'b3', 'animal-facts.json');
const BANKS = { 'animal-classification': ['class', { mammals: 'mammal', birds: 'bird', reptiles: 'reptile', fish: 'fish', insects: 'insect' }],
  'animal-coverings': ['covering', { fur: 'fur', feathers: 'feathers', scales: 'scales', shell: 'shell', spines: 'spines', skin: 'skin' }],
  'what-animals-eat': ['diet', { plant: 'plants', meat: 'meat', both: 'both' }],
  'land-water-air-animals': ['habitat', { land: 'land', water: 'water', air: 'air' }],
  'can-fly-vs-cannot': ['fly', { canfly: true, cannot: false }] };
const BW = /\b(BW|SW|BN|NB|ZW|SH|PB|MV|SV)$/i;

function check(data) {
  const f = [];
  const { fields, choices, animals, exemplars } = data;
  if (!animals || Object.keys(animals).length < 36) f.push('fewer than 36 animals');
  for (const [k, a] of Object.entries(animals || {})) {
    for (const fld of fields) {
      if (!(fld in a)) { f.push(k + ': missing ' + fld); continue; }
      const v = a[fld];
      if (v === null) continue;
      if (fld === 'fly' || fld === 'swim') { if (typeof v !== 'boolean') f.push(k + '.' + fld + ' not boolean'); }
      else if (!choices[fld].includes(v)) f.push(k + '.' + fld + ' = ' + JSON.stringify(v) + ' outside choices');
    }
    if (!a.pic || !a.pic.theme || !a.pic.noun) { f.push(k + ': no pic'); continue; }
    if (BW.test(a.pic.theme)) f.push(k + ': BW theme ' + a.pic.theme);
    if (a.reviewed && !a.picOpened) f.push(k + ': reviewed but picture not opened');
    try {
      const uri = fileUri(a.pic.theme, a.pic.noun);
      const p = decodeURIComponent(uri.replace(/^file:\/\/\/?/, ''));
      if (!fs.existsSync(p)) f.push(k + ': picture missing on disk ' + p);
    } catch (e) { f.push(k + ': fileUri threw ' + e.message); }
  }
  for (const [file, [field, map]] of Object.entries(BANKS)) {
    const j = require('../data/science/' + file + '.json');
    for (const it of j.items) {
      const a = animals[it.noun]; if (!a) continue;
      const v = map[it.bin]; if (v === undefined) continue;
      if (a[field] !== null && a[field] !== v) f.push(it.noun + '.' + field + ' table=' + a[field] + ' bank(' + file + ')=' + it.bin);
    }
  }
  for (const [theme, ex] of Object.entries(exemplars || {})) if (!animals[ex]) f.push('exemplar ' + theme + ' → ' + ex + ' not in animals');
  return f;
}

const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const real = check(data);
const poisons = [
  ['P1 rabbit.diet meat (bank says plant)', (d) => { d.animals.rabbit.diet = 'meat'; }],
  ['P2 fox.legs 5 (outside choices)', (d) => { d.animals.fox.legs = 5; }],
  ['P3 zoo animals bw picture', (d) => { d.animals.lion.pic.theme = 'zoo animals bw'; }],
  ['P4 reviewed animal not opened', (d) => { d.animals.hedgehog.picOpened = false; }],
];
let killed = 0;
for (const [name, mut] of poisons) {
  const d = JSON.parse(JSON.stringify(data)); mut(d);
  const r = check(d);
  const ok = r.length > real.length;
  console.log('  poison ' + name + ': ' + (ok ? 'KILLED' : 'SURVIVED'));
  if (ok) killed++;
}
console.log(`animal-facts: ${Object.keys(data.animals).length} animals, ${real.length} failures, poison ${killed}/${poisons.length}`);
real.slice(0, 20).forEach((x) => console.log('  FAIL ' + x));
process.exit(real.length || killed !== poisons.length ? 1 : 0);
