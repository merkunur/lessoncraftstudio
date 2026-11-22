#!/usr/bin/env node
/**
 * What every page the week days hand out shows (Part 5.4): its pictures, from the page's manifest (`vocabulary`: the
 * picture library keys of the page), and the picture words it prints (its title, directions, word banks and stories,
 * from the page's printed text). Both are fetched read-only by fetch-pages.js --text --manifest into
 * out/sub-plans/thumbs/text/. Written to scripts/sub-plans/page-pictures.json, which gate P4 reads (committed files
 * only) to check that a guest teacher script names only things that are on the page it is shown with.
 *
 *   node scripts/sub-plans/page-pictures.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { named } = require('./picture-words.js');
const REPO = path.join(__dirname, '..', '..');
const T = path.join(REPO, 'out', 'sub-plans', 'thumbs', 'text');
const OUT = path.join(__dirname, 'page-pictures.json');
const packs = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'content', 'sub-plans', 'packs.en.json'), 'utf8')).packs.filter((p) => p.week);
const pages = {};
let missing = 0;
for (const p of packs) for (const b of p.blocks) {
  const f = path.join(T, b.core + '.json'), t = path.join(T, b.core + '.txt');
  if (!fs.existsSync(f) || !fs.existsSync(t)) { missing++; console.log('FAIL  no manifest or text for ' + b.core + ' (node scripts/sub-plans/fetch-pages.js --text --manifest)'); continue; }
  const printed = fs.readFileSync(t, 'utf8').replace(/Made with LessonCraftStudio\.com/g, ' ');
  pages[b.core] = { pictures: (JSON.parse(fs.readFileSync(f, 'utf8')).vocabulary || []).slice().sort(), words: named(printed).sort() };
}
const sorted = Object.fromEntries(Object.keys(pages).sort().map((k) => [k, pages[k]]));
const text = JSON.stringify({ $comment: 'What each page the English week days hand out shows: its pictures (picture library keys, from the page\'s manifest) and the picture words it prints (from its printed text). scripts/sub-plans/page-pictures.js; read by gate P4.', pages: sorted }, null, 1) + '\n';
if (missing) process.exit(1);
if (process.argv.includes('--check')) { const have = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8').replace(/\r\n/g, '\n') : ''; if (have !== text) { console.log('FAIL  ' + path.relative(REPO, OUT) + ' is not current'); process.exit(1); } console.log('page pictures: current'); }
else { fs.writeFileSync(OUT, text); console.log(Object.keys(sorted).length + ' pages -> ' + path.relative(REPO, OUT)); }
