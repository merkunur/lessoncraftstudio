#!/usr/bin/env node
/**
 * build-picture-twins.js — data/picture-twins.json: the image-library nouns whose picture FILE is byte-identical to
 * another noun's of the same theme (lib/distinct-pictures.js). Two vocab entries can point at one artwork under two
 * names ("4th of July" liberty = statue; "household bw" hanger = towel); a page that draws two different nouns must not
 * show one picture twice. distinct-pictures used to hash the files at build time — a maker builds in the browser,
 * which cannot read them (makers 2026-11-02), so the classes are measured here, over the very files fileUri resolves
 * (the same md5 the helper took), and the helper reads the table in Node and in the browser alike.
 *   { <theme>: { <noun>: <the class id: the md5 of the file> } }   only nouns that share their file with another noun
 *   node tools/build-picture-twins.js [--check]
 */
'use strict';
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const { fileURLToPath } = require('url');
const { fileUri } = require('../image-cache/resolve.js');
const OUT = path.join(__dirname, '..', 'data', 'picture-twins.json');
const themes = require('../cache/manifest.json').themes;

const out = {};
let n = 0;
for (const theme of Object.keys(themes).sort()) {
  const by = new Map();
  for (const noun of Object.keys(themes[theme].nouns).sort()) {
    let h;
    try { const uri = fileUri(theme, noun); h = crypto.createHash('md5').update(fs.readFileSync(uri.startsWith('file:') ? fileURLToPath(uri) : uri)).digest('hex'); } catch (e) { continue; }
    if (!by.has(h)) by.set(h, []);
    by.get(h).push(noun);
  }
  for (const [h, nouns] of by) if (nouns.length > 1) { out[theme] = out[theme] || {}; for (const x of nouns) { out[theme][x] = h; n++; } }
}
const text = JSON.stringify(out, null, 1) + '\n';
if (process.argv.includes('--check')) { if ((fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '') !== text) { console.error('picture-twins.json is STALE — node tools/build-picture-twins.js'); process.exit(1); } console.log('picture-twins: current'); }
else { fs.writeFileSync(OUT, text); console.log(`${n} nouns in ${Object.keys(out).length} themes share their picture with another noun`); }
