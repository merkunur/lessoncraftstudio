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

let _manifest = null;
function manifest() {
  if (!_manifest) _manifest = platform.readJson(MANIFEST);
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

module.exports = { manifest, themeEntry, labelSafeNouns, fileUri, labels };
