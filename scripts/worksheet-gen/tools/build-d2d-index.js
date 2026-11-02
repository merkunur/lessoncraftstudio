#!/usr/bin/env node
/**
 * build-d2d-index.js — data/d2d/index.json, what a dot-to-dot MAKER (the browser) needs to choose a picture without
 * downloading the 200 scenes (makers 2026-11-02):
 *   scenes     [{ id, fit: { <dots>: { ok, complexity } } }] — every scene, sorted by id (the order Node reads them)
 *   placeable  { <figKey>: [scene ids whose numbers all find a free place with that figure setting] } — measured here by
 *              building every dot-to-dot template × level × language in Node (K-285 d2dPool's own placement test)
 * The page then fetches only its one scene. Run after any change to data/d2d or to a dot-to-dot template's settings;
 * --check (the unit tests) fails when the file on disk is not what this would write.
 *
 *   node scripts/worksheet-gen/tools/build-d2d-index.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const WG = path.join(__dirname, '..');
const DIR = path.join(WG, 'data', 'd2d');
const OUT = path.join(DIR, 'index.json');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const IDS = ['K-285', 'K-294', 'K-295', 'K-296', 'K-308', 'K-309', 'G1-285', 'G1-294', 'G2-304', 'G2-314', 'K-473', 'G1-486'];

const typeFile = (id) => { const g = id.startsWith('K-') ? 'k' : id.slice(0, 2).toLowerCase(); return path.join(WG, 'types', g, fs.readdirSync(path.join(WG, 'types', g)).find((f) => f.startsWith(id + '-'))); };
const { makeRng } = require(path.join(WG, 'lib', 'rng.js'));

const scenes = fs.readdirSync(DIR).filter((f) => f.endsWith('.json') && f !== 'index.json').sort().map((f) => {
  const s = JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8'));
  const fit = {};
  for (const [n, v] of Object.entries(s.fit || {})) fit[n] = { ok: !!(v && v.ok), complexity: v && v.complexity != null ? v.complexity : null };
  return { id: s.id, fit };
});

// build one page of every template × level × language (copies 1 and 2: a level's pool is the same for every copy)
const K285 = require(typeFile('K-285'));
let built = 0, refused = 0;
for (const id of IDS) {
  const type = require(typeFile(id));
  for (const lv of [1, 2, 3]) for (const loc of LOCALES) for (const v of [2, 3]) {
    try { type.build({ difficulty: lv, locale: loc }, { rng: makeRng(id + lv + loc + v), variant: v, seedVariant: v }); built++; } catch (e) { refused++; }
  }
}
const placeable = {};
for (const [k, ok] of K285.d2d.placeable) {
  const at = k.indexOf('|'), sid = k.slice(0, at), fig = JSON.parse(k.slice(at + 1));
  const key = K285.d2d.figKey(fig);
  (placeable[key] = placeable[key] || []);
  if (ok) placeable[key].push(sid);
}
for (const k of Object.keys(placeable)) placeable[k].sort();
const sortedKeys = Object.keys(placeable).sort();
const out = JSON.stringify({ note: 'tools/build-d2d-index.js — do not edit', scenes, placeable: Object.fromEntries(sortedKeys.map((k) => [k, placeable[k]])) }) + '\n';

if (process.argv.includes('--check')) {
  const cur = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
  if (cur !== out) { console.error('data/d2d/index.json is stale — node scripts/worksheet-gen/tools/build-d2d-index.js'); process.exit(1); }
  console.log(`d2d index current: ${scenes.length} scenes, ${sortedKeys.length} figure settings`);
} else {
  fs.writeFileSync(OUT, out);
  console.log(`wrote ${path.relative(process.cwd(), OUT)}: ${scenes.length} scenes, ${sortedKeys.length} figure settings, ${(out.length / 1024).toFixed(0)} KB (${built} pages built, ${refused} refused)`);
}
