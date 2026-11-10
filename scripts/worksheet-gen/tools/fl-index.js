#!/usr/bin/env node
/**
 * fl-index.js — data/fl/index.json, the one small file the six flagship makers read (docs/makers/FLAGSHIP.md): for every
 * B&W picture its group and what each store can do with it. A picture a review refused (data/fl/review.js) is left out of
 * that engine; lib/picture-refusals.js refusals are left out of all of them.
 *   node tools/fl-index.js
 */
'use strict';
const fs = require('fs'); const path = require('path');
const FL = require('../lib/fl-art.js');
const { groupOfTheme } = require('../data/fl/groups.js');
const { refusedPicture } = require('../lib/picture-refusals.js');
const { makeRng } = require('../lib/rng.js');
const review = fs.existsSync(path.join(__dirname, '..', 'data', 'fl', 'review.js')) ? require('../data/fl/review.js') : {};

const D = path.join(__dirname, '..', 'data', 'fl');
const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'cache', 'manifest.json'), 'utf8'));
const read = (dir, slug) => { const f = path.join(D, dir, slug + '.json'); return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : null; };
const refused = (eng, key) => !!(review[eng] && review[eng][key]);
/** a person never reaches Color by Number (flagship visual check 2026-11-08): the library knows no skin part, so the rules
 *  coloured children's faces blue; which skin colour a child's picture should carry is not a rule's call. People stay in
 *  every maker where the child chooses the colours. */
const PERSON = /^(fairy|knight|prince|princess|tooth_fairy|wizard|witch|mermaid|king|queen|astronaut|santa|santa_claus|elf|pirate|clown|ballerina|cowboy|angel)$/;
const isPerson = (theme, noun) => groupOfTheme.get(theme) === 'people' || PERSON.test(String(noun).replace(/_[0-9]+$/, ''));

const PT = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'pt', 'index.json'), 'utf8'));
const PTNEW = JSON.parse(fs.readFileSync(path.join(D, 'pt-index.json'), 'utf8'));
const pictures = {}; const count = {};
const add = (e, n = 1) => { count[e] = (count[e] || 0) + n; };
for (const { key, theme, noun } of FL.bwPictures(manifest)) {
  const g = groupOfTheme.get(theme);
  if (!g) throw new Error('fl-index: theme without a group: ' + theme);
  if (refusedPicture(theme, noun)) continue;
  const slug = FL.slugOf(key), rec = { g };
  if (manifest.themes[theme].fl) rec.n = 1;
  const d = read('d2d', slug);
  if (d && !refused('d2d', key)) {
    const fit = {};
    for (const [k, v] of Object.entries(d.fit)) if (v.ok) fit[k] = v.complexity;
    if (Object.keys(fit).length) { rec.d2d = fit; add('d2d'); }
  }
  const b = (PT[key] || PTNEW[key] || {}).band;
  if (b && b !== 'X' && !refused('pt', key)) { rec.pt = b; add('pt'); }
  const h = read('htd', slug);
  if (h && !refused('htd', key)) { const sh = h.steps.map((x) => x.share); if (sh.length >= 4 && sh.length <= 5 && sh[0] >= 0.25 && sh.slice(1).every((x) => x >= 0.08) && h.stats && !h.stats.missing && !h.stats.extra && !h.stats.dup) { rec.htd = sh.length; add('htd'); } }
  const c = read('cbn', slug);
  // cbnR: the smallest number's room (picture units) — the sums and multiplication keys print two-digit codes and take
  // only pictures where every number has room for two digits (lib/cbn-type.js)
  if (c && c.ok && !refused('cbn', key) && !isPerson(theme, noun)) { rec.cbn = c.level; rec.cbnR = +Math.min(...c.labels.map((l) => l[2])).toFixed(1); add('cbn'); }
  pictures[key] = rec;
}
const order = makeRng('fl-order').shuffle(Object.keys(pictures).sort());
fs.writeFileSync(path.join(D, 'index.json'), JSON.stringify({ v: 1, order, pictures }));
console.log(Object.keys(pictures).length + ' pictures', count);
