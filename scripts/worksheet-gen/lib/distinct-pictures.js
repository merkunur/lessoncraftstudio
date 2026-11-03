/**
 * distinct-pictures — keep ONE noun per picture FILE CONTENT (Level Set 2026-09-29).
 *
 * Two vocab entries of a theme can point at the same artwork under two names (measured over every cached
 * theme: "4th of July" liberty = statue, "household bw" hanger = towel). A page that draws two different
 * nouns then shows the same picture twice — the live Picture to Picture sheet ran a path from a Statue of
 * Liberty to a Statue of Liberty. The first noun of each picture is kept, in pool order. Pure over its input.
 *
 * The classes of identical files are measured offline (tools/build-picture-twins.js → data/picture-twins.json: the md5
 * of the file fileUri resolves, the hash this helper used to take at build time) — a maker builds its pages in the
 * browser, which cannot read the picture files (makers 2026-11-02). A noun outside the table is its own picture.
 */
'use strict';
const TWINS = require('../data/picture-twins.json');

/** the identity of a noun's picture: its class of identical files, or the noun itself */
function pictureHash(theme, noun) {
  const t = TWINS[theme];
  return (t && t[noun]) || theme + '/' + noun;
}

/** nouns: [{ noun, vocabKey, … }] → the same list without a second noun of an already-seen picture. */
function distinctPictures(theme, nouns) {
  const seen = new Set();
  return nouns.filter((n) => { const h = pictureHash(theme, n.noun); if (seen.has(h)) return false; seen.add(h); return true; });
}

module.exports = { distinctPictures, pictureHash };
