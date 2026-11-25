/**
 * Image-cache resolver — the ONLY API other modules use to reference theme
 * images. Resolves (theme, noun) → absolute file:// URI + vocab labels.
 */
'use strict';
const path = require('path');
const platform = require('../lib/platform/index.js');   // disk + file:// in Node, preload + CDN in the makers' browser bundle
const loadVocab = () => platform.vocab();

const CACHE = path.join(__dirname, '..', 'cache');
const MANIFEST = path.join(CACHE, 'manifest.json');

// Pictures that show ANOTHER thing than their word: not a look-alike a child might name otherwise (lib/picture-refusals.js
// keeps those off the pages that name a picture), but a different animal or object. They leave the cache as it is read,
// so no page can draw or name them, whatever path it takes to a theme's pictures.
//   2026-11-25 (the pre-K designer, reading the things-that-fly word cards): Things That Fly/firefly is a HOUSEFLY (red
//   compound eyes, a hairy body, no light).
//   2026-11-25 (the pre-K reviewer, the same day, every picture opened): kitchen tools/timer is a ringing ALARM CLOCK;
//   vegetables/turnip is a solid red BEET (the black-and-white turnip, a white bulb, stays; the letter-of-the-week rows
//   that pinned the colour one for "nauris" and "navet" left their banks).
// A picture that shows a thing the vocabulary HAS a word for keeps its place under that word instead (RENAMED_PICTURES):
// its pages keep their layout and print the right word.
//   2026-11-25: space bw/sky is a crescent MOON with two stars (the theme has no other moon).
// (space/venus, a banded orange planet, was weighed and KEPT: Venus is drawn with swirled cloud bands in picture books
// too; a stylized look-alike, as lib/picture-refusals.js treats the squids.)
// The live printable pages that showed a wrong picture were regenerated and republished in place (11 languages).
const WRONG_PICTURES = { 'Things That Fly': ['firefly'], 'kitchen tools': ['timer'], vegetables: ['turnip'] };
const RENAMED_PICTURES = { 'space bw': { sky: 'moon' } };
let _manifest = null;
function manifest() {
  if (!_manifest) {
    _manifest = platform.readJson(MANIFEST);
    for (const [theme, nouns] of Object.entries(WRONG_PICTURES)) {
      const t = _manifest.themes && _manifest.themes[theme];
      if (t && t.nouns) for (const n of nouns) delete t.nouns[n];
    }
    for (const [theme, names] of Object.entries(RENAMED_PICTURES)) {
      const t = _manifest.themes && _manifest.themes[theme];
      if (t && t.nouns) for (const [n, key] of Object.entries(names)) if (t.nouns[n]) t.nouns[n] = Object.assign({}, t.nouns[n], { vocabKey: key });
    }
  }
  return _manifest;
}

function themeEntry(theme) {
  const t = manifest().themes[theme];
  if (!t) throw new Error('resolve: theme not in cache manifest: ' + theme + ' (run pull-themes.js first)');
  return t;
}

/** All nouns of a theme that resolve to a vocab key (label-safe). */
function labelSafeNouns(theme) {
  const t = themeEntry(theme);
  return Object.entries(t.nouns)
    .filter(([, v]) => v.vocabKey)
    .map(([noun, v]) => ({ noun, vocabKey: v.vocabKey, px: v.px }));
}

function fileUri(theme, noun, variantIndex, opts) {
  const t = themeEntry(theme);
  const entry = t.nouns[noun];
  if (!entry) throw new Error('resolve: noun not cached: ' + theme + '/' + noun);
  const file = entry.files[variantIndex || 0];
  // Prefer the derived 512px copy (image-cache/derive.js) — icons render at
  // ≤~240px CSS so 512 device px is full retina sharpness at a fraction of the
  // embedded-PDF weight. opts.full opts back into the @3x source for call
  // sites that scale art larger (e.g. measurement-tasks artExtent objects).
  if (!opts || !opts.full) {
    const derived = path.join(CACHE, 'themes-512', theme, file);
    if (platform.exists(derived)) return platform.fileHref(derived);
  }
  return platform.fileHref(path.join(CACHE, 'themes', theme, file));
}

/** Localized [singular, plural] for a noun (vocab SoT; never re-authored). */
function labels(noun, locale) {
  const t = manifest();
  // find vocabKey from any cached theme containing this noun
  for (const theme of Object.values(t.themes)) {
    if (theme.nouns[noun] && theme.nouns[noun].vocabKey) {
      const v = loadVocab()[theme.nouns[noun].vocabKey];
      if (v && v[locale]) return v[locale];
    }
  }
  return null;
}

/**
 * Localized [singular, plural, gender] for a VOCABULARY KEY (a picture's vocabKey). A noun name is not a key: the vehicles
 * crane and the birds crane share the name, their keys differ (construction-crane / crane, 2026-11-01) — a caller holding a
 * vocabKey uses this, never labels(), whose name search finds the first theme with that noun.
 */
function labelsForKey(vocabKey, locale) {
  const v = loadVocab()[vocabKey];
  return (v && v[locale]) || null;
}

module.exports = { manifest, themeEntry, labelSafeNouns, fileUri, labels, labelsForKey };
