/**
 * Localised picture names for deck families that record only a file path.
 *
 * WHY THIS IS NEEDED FOR SOME FAMILIES AND NOT OTHERS
 * addition, subtraction and code-addition store `image.name` already in the deck's language
 * ("Möwe", "Torte", "Schlittschuhlaufen"), so their nouns need no lookup. more-less stores
 * nothing but a URL — `/images/4th_of_july/hotdog-1769383003177-43b0a824.webp` — so the noun
 * has to be recovered from the filename and then translated, or a German page would print
 * English nouns to German readers.
 *
 * This is the same route `scripts/seo-per-page/build-deck-vocab.js` takes for thumbnail alt
 * text: filename stem -> vocabulary key -> `IMAGE_VOCABULARY[key][locale][0]`. Reusing the
 * key-normalisation rules rather than re-inventing them keeps one answer to "what is this
 * picture called", which is the point of §6 being canonical.
 *
 * READ-ONLY on image-vocabulary.js, which is operator-approval-gated (§10.3). The file is
 * parsed, never executed and never written.
 */
'use strict';

var fs = require('fs');

var CANDIDATE_PATHS = [
  '/opt/lessoncraftstudio/REFERENCE TRANSLATIONS/image-vocabulary.js',
  require('path').resolve(__dirname, '..', '..', 'REFERENCE TRANSLATIONS', 'image-vocabulary.js'),
];

var _vocab = null;

function loadVocabulary() {
  if (_vocab) return _vocab;
  for (var i = 0; i < CANDIDATE_PATHS.length; i++) {
    if (!fs.existsSync(CANDIDATE_PATHS[i])) continue;
    var src = fs.readFileSync(CANDIDATE_PATHS[i], 'utf8');
    var m = src.match(/const IMAGE_VOCABULARY = (\{[\s\S]*?\n\});/);
    if (!m) continue;
    _vocab = JSON.parse(m[1]);
    return _vocab;
  }
  _vocab = {};
  return _vocab;
}

/**
 * Vocabulary key from an image URL.
 *   /images/4th_of_july/french-fries-1769383000963-125936f4.webp  ->  french-fries
 *   /images/animals/cat 2.png                                     ->  cat
 * The upload suffix is a timestamp plus a random id; the trailing number is the duplicate
 * marker (§20.5) — the second cat is still a cat.
 */
function keyFromPath(p) {
  if (!p) return null;
  var base = String(p).split('/').pop().replace(/\.(webp|png|jpe?g|svg)$/i, '');
  base = base
    .replace(/-\d{10,}-[a-z0-9]+$/i, '')   // -1769383000963-125936f4
    .replace(/-\d{10,}$/, '')
    .replace(/[\s-]+\d+$/, '')             // "cat 2" / "cat-2"
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-');
  return base || null;
}

/**
 * The singular form of this picture's name in `locale`, or null when the library does not
 * know the key. Null is a legitimate answer: the caller then names fewer objects, or skips
 * the sentence entirely (§17.8.11 defensive skip), rather than printing a raw English key.
 */
function localizedNoun(imagePath, locale) {
  var key = keyFromPath(imagePath);
  if (!key) return null;
  var entry = loadVocabulary()[key];
  if (!entry) return null;
  var forms = entry[locale] || entry.en;
  return (forms && forms[0]) || null;
}

/**
 * The DECK_BUNDLE object out of a rendered deck.html.
 *
 * `var DECK_BUNDLE = {...};` is followed by the whole runtime, so the object has to be
 * delimited by matching braces rather than by looking for a terminator. A first attempt cut
 * at the first `};` and silently produced nothing for every code-addition deck — the sums
 * that only exist here would have been reported as unreadable rather than as a parse bug.
 *
 * The scan is string-aware because the bundle embeds a base64 JPEG and image keys.
 */
function readDeckBundle(html) {
  var marker = 'var DECK_BUNDLE = ';
  var start = html.indexOf(marker);
  if (start === -1) return null;
  var i = html.indexOf('{', start);
  if (i === -1) return null;

  var depth = 0, inStr = false, esc = false;
  for (var p = i; p < html.length; p++) {
    var ch = html[p];
    if (inStr) {
      if (esc) esc = false;
      else if (ch === '\\') esc = true;
      else if (ch === '"') inStr = false;
      continue;
    }
    if (ch === '"') { inStr = true; continue; }
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) {
        try { return JSON.parse(html.slice(i, p + 1)); } catch (e) { return null; }
      }
    }
  }
  return null;
}

module.exports = {
  keyFromPath: keyFromPath,
  localizedNoun: localizedNoun,
  loadVocabulary: loadVocabulary,
  readDeckBundle: readDeckBundle,
};
