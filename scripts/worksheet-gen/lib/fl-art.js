/**
 * fl-art.js — the flagship picture library (docs/makers/FLAGSHIP.md): every black-and-white drawing behind the six picture
 * makers, whichever store it reached. One key per picture, "theme/noun" as the rest of the engine writes it.
 *
 * A template keeps its published pool exactly as it was. This file adds what a teacher can ask for on top of it:
 *   overrides.art[0]    this picture (a key the template's library pool holds)
 *   overrides.artTheme  a group of data/fl/groups.js: New version walks that group's pictures
 * and the copies past the published pool walk the library, so New version never runs dry.
 *
 *   keys(engine, ok)        every library picture the engine can draw (data/fl/index.json), reviewed, not refused
 *   wish(ctx)               the teacher's { key, group }
 *   choose(ctx, keys, n)    the key the wish asks for at copy n, or null (then the template picks as it always did)
 *   report(ctx, keys, cur)  tell the screen this page's pool and current picture (role "art": the picker, the theme tiles)
 *   tap(ctx)                the tap-target attribute of the page's picture ('' in the catalogue)
 *   slugOf(key)             the file name of a picture in every store of data/fl/
 */
'use strict';
const path = require('path');
const platform = require('./platform/index.js');
const slot = require('./slot.js');

const DIR = path.join(__dirname, '..', 'data', 'fl');
const isBw = (t) => /bw(\s+\d+)?$/i.test(String(t || ''));
const slugOf = (key) => String(key).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

let _index = null;
// (the picture manifest is read here too: the screen's tiles and picker show each picture from it, and a template that
//  draws from data/fl never reads it otherwise, so it would not be preloaded — no tile would have a picture)
const MANIFEST = path.join(__dirname, '..', 'cache', 'manifest.json');
const index = () => { if (!_index) { require('../image-cache/resolve.js').manifest(); _index = platform.readJson(path.join(DIR, 'index.json')); } return _index; };
/** tells the bundler what any page of this template can need: it records reads per build, and index() reads once, perhaps outside a recorded build */
const touch = () => { platform.exists(MANIFEST); platform.exists(path.join(DIR, 'index.json')); platform.vocab(); platform.requireData(path.join(DIR, 'names.js')); };
const groupOf = (key) => { const e = index().pictures[key]; return e ? e.g : null; };

let _bySlug = null;
/** the key of a store file's name */
const keyOf = (slug) => { if (!_bySlug) _bySlug = new Map(index().order.map((k) => [slugOf(k), k])); return _bySlug.get(slug) || null; };

/** the library pictures the engine can draw, in the index's fixed mixed order; ok(entry) narrows them */
function keys(engine, ok) {
  touch();
  const P = index().pictures;
  return index().order.filter((k) => P[k][engine] != null && (!ok || ok(P[k][engine], P[k])));
}

/** a picture's name in a language: the vocabulary's reviewed word (its own key, its base noun, an alias), else data/fl/names.js */
function nameOf(key, loc) {
  const j = key.indexOf('/'), noun = key.slice(j + 1), base = noun.replace(/_\d+$/, '');
  const vocab = platform.vocab(), N = platform.requireData(path.join(DIR, 'names.js'));
  const entry = (((require('../image-cache/resolve.js').manifest().themes[key.slice(0, j)] || {}).nouns || {})[noun] || {});
  const find = (n) => [n, n.replace(/_/g, '-'), n.replace(/_/g, ' ')].find((x) => vocab[x]);
  const k = entry.vocabKey || find(N.ALIAS[base] || N.LIB[base] || base);
  if (k && vocab[k] && vocab[k][loc]) return vocab[k][loc][0];
  return (N.NAMES[base] && N.NAMES[base][loc]) || null;
}

const wish = (ctx) => {
  const o = (ctx && ctx.overrides) || {};
  return { key: (o.art && o.art[0]) || null, group: o.artTheme || null };
};

function choose(ctx, list, n) {
  const w = wish(ctx);
  if (w.key && list.includes(w.key)) return w.key;
  if (w.group) {
    const mine = list.filter((k) => groupOf(k) === w.group);
    if (mine.length) return mine[(Math.max(1, n) - 1) % mine.length];
  }
  return null;
}

function report(ctx, list, current) {
  touch();
  if (ctx && ctx.slotsOut) ctx.slotsOut.art = { pool: list, values: [current], multi: true, art: true, derives: ['*'] };
}
const tap = (ctx) => slot.attr(ctx, 'art', 0);

/** every B&W picture of the image cache, sorted: Node tools only */
function bwPictures(manifest) {
  const out = [];
  for (const theme of Object.keys(manifest.themes).sort()) {
    if (!isBw(theme)) continue;
    for (const noun of Object.keys(manifest.themes[theme].nouns).sort()) out.push({ key: theme + '/' + noun, theme, noun });
  }
  return out;
}

module.exports = { isBw, slugOf, bwPictures, index, keys, wish, choose, report, tap, groupOf, nameOf, keyOf, DIR };
