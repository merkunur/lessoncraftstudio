/**
 * distinct-pictures — keep ONE noun per picture FILE CONTENT (Level Set 2026-09-29).
 *
 * Two vocab entries of a theme can point at the same artwork under two names (measured over every cached
 * theme: "4th of July" liberty = statue, "household bw" hanger = towel). A page that draws two different
 * nouns then shows the same picture twice — the live Picture to Picture sheet ran a path from a Statue of
 * Liberty to a Statue of Liberty. Nouns are compared by the md5 of the file they render; the first noun
 * of each picture is kept, in pool order. Pure over its input; hashes are cached per path.
 */
'use strict';
const fs = require('fs');
const crypto = require('crypto');
const { fileURLToPath } = require('url');
const { fileUri } = require('../image-cache/resolve.js');

const _hash = new Map();
function pictureHash(theme, noun) {
  const uri = fileUri(theme, noun);
  if (!_hash.has(uri)) {
    let h;
    try { h = crypto.createHash('md5').update(fs.readFileSync(uri.startsWith('file:') ? fileURLToPath(uri) : uri)).digest('hex'); } catch (e) { h = uri; }
    _hash.set(uri, h);
  }
  return _hash.get(uri);
}

/** nouns: [{ noun, vocabKey, … }] → the same list without a second noun of an already-seen picture. */
function distinctPictures(theme, nouns) {
  const seen = new Set();
  return nouns.filter((n) => { const h = pictureHash(theme, n.noun); if (seen.has(h)) return false; seen.add(h); return true; });
}

module.exports = { distinctPictures, pictureHash };
