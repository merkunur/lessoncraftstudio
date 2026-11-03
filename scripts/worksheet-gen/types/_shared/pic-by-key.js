/**
 * pic-by-key.js — the picture of a vocabulary key (2026-11-02): the first colour theme (alphabetical; never a B&W
 * directory) whose reviewed nouns carry the key, skipping pictures a child names with another word
 * (lib/picture-name-refusals.js). null when the library has none. Built once.
 */
'use strict';
const { manifest, labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const { nameRefused, REFUSED, NAME_ONLY } = require('../../lib/picture-name-refusals.js');

const REFUSED_NOUNS = new Set([...REFUSED, ...NAME_ONLY].map((x) => x.split('/')[1]));
let PIC = null;
function picOf(key) {
  if (!PIC) {
    PIC = new Map();
    for (const theme of Object.keys(manifest().themes).filter((t) => !/\sbw(\s+\d+)?$/i.test(t)).sort()) for (const n of labelSafeNouns(theme)) {
      const k = n.vocabKey || n.noun;
      if (!PIC.has(k) && !nameRefused(theme, n.noun) && !REFUSED_NOUNS.has(n.noun)) PIC.set(k, { theme, noun: n.noun });
    }
  }
  return PIC.get(key) || null;
}
const srcOf = (p) => fileUri(p.theme, p.noun);

module.exports = { picOf, srcOf };
