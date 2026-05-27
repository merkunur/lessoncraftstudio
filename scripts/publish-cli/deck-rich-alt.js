/**
 * Rich alt-text composer (Node-CJS). Mirror of frontend/lib/deck-seo.ts
 * per the duplicate-state convention used by build-seo-head.js +
 * OG_LOCALE_MAP + schema-generator. Consumed by substitute.js for the
 * placeholders introduced in the alt-text SEO commission 2026-05-27:
 *
 *   __OG_IMAGE_ALT__       (replaces title-mirror at substitute.js:365)
 *   __WORKSHEET_MAIN_ALT__ (new placeholder; main worksheet <img> alt)
 *   __APP_ARIA_LABEL__     (new placeholder; <main role="application"> aria-label)
 *   __SUGGESTION_i_ALT__   (new placeholder × 6; deck-end suggestion thumbs)
 *
 * Per CLAUDE.md §1 SEO-first emit-site framing + §17.4 native-language
 * SEO doctrine + §A.13.48 11-locale recreation discipline.
 *
 * All composers fall back to deck.title (substrate-honesty per §16.6.1)
 * when taxonomy or i18n lookup misses — a half-composed template would
 * read worse than the bare title.
 */

'use strict';

var path = require('path');
var i18n = require('./i18n');
var taxonomy = require('./taxonomy');

// IMAGE_VOCABULARY loader — read REFERENCE TRANSLATIONS/image-vocabulary.js
// once at module init. The file declares a global IIFE-style var; we eval-
// scope it into a sandbox to extract the IMAGE_VOCABULARY constant.
var fs = require('fs');
var VOCAB_FILE = path.join(__dirname, '..', '..', 'REFERENCE TRANSLATIONS', 'image-vocabulary.js');
var _vocabCache = null;

function loadVocab() {
  if (_vocabCache !== null) return _vocabCache;
  if (!fs.existsSync(VOCAB_FILE)) {
    _vocabCache = {};
    return _vocabCache;
  }
  var raw = fs.readFileSync(VOCAB_FILE, 'utf8');
  // The file is `const IMAGE_VOCABULARY = { ... };` (or `var`). Extract the
  // object literal via regex on the assignment shape.
  var m = raw.match(/(?:const|var|let)\s+IMAGE_VOCABULARY\s*=\s*(\{[\s\S]*?\});?\s*(?:\n\s*(?:if|module|window|export|\/\*|\/\/)|\s*$)/);
  if (!m) {
    // Fallback: eval the whole file in a sandbox with a window stub.
    try {
      var sandbox = { window: {}, module: {}, exports: {} };
      var fn = new Function('window', 'module', 'exports', raw + '\nreturn (typeof IMAGE_VOCABULARY !== "undefined") ? IMAGE_VOCABULARY : (window.IMAGE_VOCABULARY || {});');
      _vocabCache = fn(sandbox.window, sandbox.module, sandbox.exports) || {};
    } catch (e) {
      _vocabCache = {};
    }
    return _vocabCache;
  }
  try {
    // The matched object literal MUST be valid JSON5-ish. Use Function eval
    // since it's our own file (no untrusted input).
    _vocabCache = new Function('return ' + m[1])() || {};
  } catch (e) {
    _vocabCache = {};
  }
  return _vocabCache;
}

/**
 * Convert an image filename/path to a vocabulary canonical key.
 * Mirror of catalog-export.js `vocabKeyFromImage` for the Node-CJS side.
 * Strips: directory path, server-stored `-<13digit>-<hash>` suffix,
 * file extension (.webp/.png/.jpg). Returns null on unparseable input.
 */
function imagePathToVocabKey(p) {
  if (!p || typeof p !== 'string') return null;
  // Strip directory: take basename after last `/`
  var base = p.split('/').pop() || p;
  // Strip extension
  base = base.replace(/\.(webp|png|jpe?g)$/i, '');
  // Strip server-upload `-<13digit>-<hash>` suffix
  base = base.replace(/-\d{13}-[a-z0-9]+$/i, '');
  // Strip trailing numeric suffix (e.g. "cat 2" → "cat") + multiple-word variants
  base = base.replace(/\s+\d+$/, '');
  // Lowercase + space-to-hyphen for vocab-key normalization
  base = base.trim().toLowerCase().replace(/\s+/g, '-');
  return base || null;
}

/**
 * Resolve top-N localized vocab nouns from a list of image filenames.
 * Each entry can be a vocab key OR a path; this helper normalizes via
 * imagePathToVocabKey then resolves through IMAGE_VOCABULARY.
 */
function resolveVocabNamesFromPaths(paths, locale, maxN) {
  if (!paths || !paths.length) return [];
  var keys = [];
  for (var i = 0; i < paths.length; i++) {
    var k = imagePathToVocabKey(paths[i]);
    if (k) keys.push(k);
  }
  return resolveVocabNames(keys, locale, maxN);
}

/**
 * Resolve top-N localized vocab nouns from a list of image vocab keys.
 * Skips keys missing from IMAGE_VOCABULARY or missing the requested locale.
 * Returns an array of strings (may be shorter than maxN; may be empty).
 */
function resolveVocabNames(vocabKeys, locale, maxN) {
  if (!vocabKeys || !vocabKeys.length) return [];
  var n = maxN || 3;
  var vocab = loadVocab();
  var out = [];
  var seen = {};
  for (var i = 0; i < vocabKeys.length && out.length < n; i++) {
    var key = vocabKeys[i];
    if (!key || seen[key]) continue;
    seen[key] = true;
    var entry = vocab[key];
    if (!entry) continue;
    var localized = entry[locale];
    if (!localized) continue;
    // Locale entry shape: [singular, plural, gender?] per CLAUDE.md §6.
    var singular = Array.isArray(localized) ? localized[0] : localized;
    if (singular && typeof singular === 'string') out.push(singular);
  }
  return out;
}

/**
 * Format a list of vocab nouns into locale-natural prose using Intl.ListFormat,
 * with hardcoded EN fallback per §17.8.13 convention.
 */
function formatVocabPhrase(vocabNames, locale) {
  if (!vocabNames || !vocabNames.length) return null;
  try {
    var fmt = new Intl.ListFormat(locale, { style: 'long', type: 'conjunction' });
    return fmt.format(vocabNames);
  } catch (e) {
    if (vocabNames.length === 1) return vocabNames[0];
    if (vocabNames.length === 2) return vocabNames[0] + ' and ' + vocabNames[1];
    return vocabNames.slice(0, -1).join(', ') + ', and ' + vocabNames[vocabNames.length - 1];
  }
}

/**
 * Extract theme axis-key from subjectTags by intersection with the
 * registered theme axis-keys in topics-taxonomy.json axes.theme.
 */
function findThemeKey(subjectTags) {
  if (!subjectTags || !subjectTags.length) return null;
  var t = taxonomy.load();
  var themeAxis = t.axes && t.axes.theme;
  if (!themeAxis) return null;
  for (var i = 0; i < subjectTags.length; i++) {
    if (themeAxis[subjectTags[i]]) return subjectTags[i];
  }
  return null;
}

/**
 * Compose OG image alt text. Drives og:image:alt + twitter:image:alt +
 * sitemap-image og-image caption + Schema.org LearningResource image.caption.
 *
 * meta: { exerciseType, subjectTags, ageRange, language, title }
 * vocabKeys: optional array of image-vocabulary keys to enumerate (top 3)
 * Returns: localized string, ≤140 chars typical.
 */
function composeOgImageAlt(meta, vocabKeys) {
  var locale = meta.language || 'en';
  try {
    var typeEntry = taxonomy.axisLookup('exercise-type', meta.exerciseType, locale);
    var typeName = typeEntry && typeEntry.name;
    var levelEntry = taxonomy.levelFor(meta.ageRange, locale);
    var levelName = levelEntry && levelEntry.name;
    if (!typeName || !levelName) return meta.title || '';

    var themeKey = findThemeKey(meta.subjectTags);
    var themeEntry = themeKey ? taxonomy.axisLookup('theme', themeKey, locale) : null;
    var themeName = themeEntry && themeEntry.name;

    // Accept either vocab keys ('cat') or image paths/filenames
    // ('/images/animals/cat.png'). resolveVocabNamesFromPaths normalizes
    // both forms — pure keys pass through imagePathToVocabKey untouched.
    var vocabNames = resolveVocabNamesFromPaths(vocabKeys, locale, 3);
    var vocabPhrase = formatVocabPhrase(vocabNames, locale);

    var keyVariant;
    var params = { exerciseType: typeName, level: levelName };
    if (themeName && vocabPhrase) {
      keyVariant = 'seo.ogImageAlt.withTheme';
      params.theme = themeName;
      params.vocab = vocabPhrase;
    } else if (themeName) {
      keyVariant = 'seo.ogImageAlt.withThemeNoVocab';
      params.theme = themeName;
    } else if (vocabPhrase) {
      keyVariant = 'seo.ogImageAlt.withoutTheme';
      params.vocab = vocabPhrase;
    } else {
      keyVariant = 'seo.ogImageAlt.withoutThemeNoVocab';
    }
    var template = i18n.resolve(locale, keyVariant, null).value;
    return i18n.interpolate(template, params);
  } catch (e) {
    return meta.title || '';
  }
}

/**
 * Compose main worksheet image alt text (the largest <img> in each
 * deck.html — currently `alt=""` HARDCODED EMPTY per audit).
 */
function composeWorksheetMainAlt(meta, vocabKeys) {
  var locale = meta.language || 'en';
  try {
    var typeEntry = taxonomy.axisLookup('exercise-type', meta.exerciseType, locale);
    var typeName = typeEntry && typeEntry.name;
    var levelEntry = taxonomy.levelFor(meta.ageRange, locale);
    var levelName = levelEntry && levelEntry.name;
    if (!typeName || !levelName) return meta.title || '';

    var themeKey = findThemeKey(meta.subjectTags);
    var themeEntry = themeKey ? taxonomy.axisLookup('theme', themeKey, locale) : null;
    var themeName = themeEntry && themeEntry.name;

    // Accept either vocab keys ('cat') or image paths/filenames
    // ('/images/animals/cat.png'). resolveVocabNamesFromPaths normalizes
    // both forms — pure keys pass through imagePathToVocabKey untouched.
    var vocabNames = resolveVocabNamesFromPaths(vocabKeys, locale, 3);
    var vocabPhrase = formatVocabPhrase(vocabNames, locale);

    var keyVariant;
    var params = { exerciseType: typeName, level: levelName };
    if (themeName && vocabPhrase) {
      keyVariant = 'seo.worksheetMainAlt.withTheme';
      params.theme = themeName;
      params.vocab = vocabPhrase;
    } else if (themeName) {
      keyVariant = 'seo.worksheetMainAlt.withThemeNoVocab';
      params.theme = themeName;
    } else if (vocabPhrase) {
      keyVariant = 'seo.worksheetMainAlt.withoutTheme';
      params.vocab = vocabPhrase;
    } else {
      keyVariant = 'seo.worksheetMainAlt.withoutThemeNoVocab';
    }
    var template = i18n.resolve(locale, keyVariant, null).value;
    return i18n.interpolate(template, params);
  } catch (e) {
    return meta.title || '';
  }
}

/**
 * Compose deck-card thumbnail alt text. Mirror of buildDeckRichAlt
 * in deck-seo.ts; used by suggestion-strip alt + sitemap thumbnail caption.
 */
function composeDeckCardAlt(meta) {
  var locale = meta.language || 'en';
  try {
    var typeEntry = taxonomy.axisLookup('exercise-type', meta.exerciseType, locale);
    var typeName = typeEntry && typeEntry.name;
    var levelEntry = taxonomy.levelFor(meta.ageRange, locale);
    var levelName = levelEntry && levelEntry.name;
    if (!typeName || !levelName) return meta.title || '';

    var themeKey = findThemeKey(meta.subjectTags);
    var themeEntry = themeKey ? taxonomy.axisLookup('theme', themeKey, locale) : null;
    var themeName = themeEntry && themeEntry.name;

    var keyVariant = themeName ? 'seo.deckCardAlt.withTheme' : 'seo.deckCardAlt.withoutTheme';
    var params = { exerciseType: typeName, level: levelName };
    if (themeName) params.theme = themeName;
    var template = i18n.resolve(locale, keyVariant, null).value;
    return i18n.interpolate(template, params);
  } catch (e) {
    return meta.title || '';
  }
}

/**
 * Compose <main role="application"> aria-label for deck.html.
 * `instruction` defaults to empty when missing — substitute.js extracts
 * the same value it already uses for meta description.
 */
function composeDeckContainerAriaLabel(meta, instruction) {
  var locale = meta.language || 'en';
  try {
    var typeEntry = taxonomy.axisLookup('exercise-type', meta.exerciseType, locale);
    var typeName = typeEntry && typeEntry.name;
    var levelEntry = taxonomy.levelFor(meta.ageRange, locale);
    var levelName = levelEntry && levelEntry.name;
    if (!typeName || !levelName) return meta.title || '';

    var themeKey = findThemeKey(meta.subjectTags);
    var themeEntry = themeKey ? taxonomy.axisLookup('theme', themeKey, locale) : null;
    var themeName = themeEntry && themeEntry.name;

    var keyVariant = themeName ? 'aria.deckContainerTemplate.withTheme' : 'aria.deckContainerTemplate.withoutTheme';
    var params = { exerciseType: typeName, level: levelName, instruction: instruction || '' };
    if (themeName) params.theme = themeName;
    var template = i18n.resolve(locale, keyVariant, null).value;
    return i18n.interpolate(template, params).trim();
  } catch (e) {
    return meta.title || '';
  }
}

/**
 * Compose celebration-mini `<img>` alt text shown on completion. Uses
 * exercise-type name + level only (no vocab; the image displays the
 * teacher's filled worksheet, not the per-image vocab).
 */
function composeCelebrationMiniAlt(meta) {
  var locale = meta.language || 'en';
  try {
    var typeEntry = taxonomy.axisLookup('exercise-type', meta.exerciseType, locale);
    var typeName = typeEntry && typeEntry.name;
    if (!typeName) return meta.title || '';
    var template = i18n.resolve(locale, 'seo.celebrationMiniAlt', null).value;
    return i18n.interpolate(template, { exerciseType: typeName });
  } catch (e) {
    return meta.title || '';
  }
}

/**
 * Compose iframe-embed title attribute for the snippet generated by
 * buildEmbedAffordance in catalog-export.js (line 1461). Embed iframes
 * appear on external classroom blogs; the title is the iframe's
 * WCAG-required accessible name.
 */
function composeIframeEmbedTitle(deckTitle, locale) {
  try {
    var template = i18n.resolve(locale || 'en', 'aria.iframeEmbedTitle', null).value;
    return i18n.interpolate(template, { deckTitle: deckTitle || '' });
  } catch (e) {
    return deckTitle || '';
  }
}

module.exports = {
  composeOgImageAlt: composeOgImageAlt,
  composeWorksheetMainAlt: composeWorksheetMainAlt,
  composeDeckCardAlt: composeDeckCardAlt,
  composeDeckContainerAriaLabel: composeDeckContainerAriaLabel,
  composeCelebrationMiniAlt: composeCelebrationMiniAlt,
  composeIframeEmbedTitle: composeIframeEmbedTitle,
  resolveVocabNames: resolveVocabNames,
  resolveVocabNamesFromPaths: resolveVocabNamesFromPaths,
  imagePathToVocabKey: imagePathToVocabKey,
  formatVocabPhrase: formatVocabPhrase,
  findThemeKey: findThemeKey,
  loadVocab: loadVocab,
  // Test-helper: clear vocab cache
  _clearVocabCache: function () { _vocabCache = null; }
};
