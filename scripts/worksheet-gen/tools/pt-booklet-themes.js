#!/usr/bin/env node
/**
 * pt-booklet-themes.js — data/pt/booklet-themes.json: the themes of "A Tracing Booklet" (K-500, makers 2026-11-02) and the
 * name its cover prints in each language. A booklet's three pictures come from ONE library theme (its black-and-white
 * folders); the cover name is the site's own theme name (frontend/config/topics-taxonomy.json axes.theme.<key>.name, the
 * reviewed 11-language names the catalogue shows), never a folder name ("animals bw 2").
 *   { <base theme of the image library>: { key, names: { <loc>: name } } }
 *   node tools/pt-booklet-themes.js [--check]
 */
'use strict';
const fs = require('fs'), path = require('path');
const TAX = require('../../../frontend/config/topics-taxonomy.json').axes.theme;
const OUT = path.join(__dirname, '..', 'data', 'pt', 'booklet-themes.json');
// the library's base theme → the site's theme key (a base theme with no site theme of its own is not offered; 'farm'
// holds barns and tractors as well as animals, so it is not "Farm Animals")
const MAP = {
  Christmas: 'christmas', Easter: 'easter', animals: 'animals', beach: 'beach', birds: 'birds', classroom: 'classroom',
  'farm animals': 'farm_animals', fruits: 'fruits', toys: 'toys', vegetables: 'vegetables',
  vehicles: 'vehicles', 'zoo animals': 'zoo_animals', 'sea life': 'ocean_life', dessert: 'desserts_and_sweets',
  apparel: 'clothing', tools: 'tools',
};
const out = {};
for (const [base, key] of Object.entries(MAP)) {
  const t = TAX[key];
  if (!t || !t.name) throw new Error(`pt-booklet-themes: no site theme "${key}" for ${base}`);
  out[base] = { key, names: t.name };
}
const text = JSON.stringify(out, null, 1) + '\n';
if (process.argv.includes('--check')) { if ((fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '') !== text) { console.error('booklet-themes.json is STALE'); process.exit(1); } console.log('booklet-themes: current'); }
else { fs.writeFileSync(OUT, text); console.log(Object.entries(out).map(([b, v]) => b + ' → ' + v.names.en + ' / ' + v.names.fi).join('\n')); }
