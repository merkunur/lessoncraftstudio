/** data/ptx/words.js — the four picture words of a picture-and-word Level Set copy (names-i18n.js WORDS); refuses when absent. */
'use strict';
function wordsFor(unit, loc) {
  const w = ((require('./names-i18n.js').WORDS || {})[unit] || {})[loc];
  if (!w || w.length !== 4) throw new Error(`ptx: no four picture words for ${unit} in ${loc}`);
  return w;
}
module.exports = { wordsFor };
