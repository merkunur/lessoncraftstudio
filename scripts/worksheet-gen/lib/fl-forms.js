/**
 * fl-forms.js — a library picture's name in the grammatical forms a How to Draw page prints (docs/makers/FLAGSHIP.md):
 *   t  the title form ({L}): article + noun in the case the titles want (de accusative, fi nominative)
 *   n  the bare noun ({N})
 *   g  the gender in the locale's own code (the write face's starters)
 *   word  the word for a trace lane (one word, at most 12 letters) or null
 * The 152 Level Set nouns keep their native-reviewed forms (data/htdx/names.js). Every other picture takes its word and
 * gender from the image vocabulary, or, for a drawing the vocabulary does not name, from data/fl/names.js + GENDERS below.
 * A picture with no gender in a language that needs one has no form there: the face does not offer it (never a guess).
 */
'use strict';
const path = require('path');
const platform = require('./platform/index.js');
const FL = require('./fl-art.js');

const VOWEL = /^[aeiouáéíóúàèìòùâêîôûäëïöüh]/i;
const low = (s, loc) => s.toLocaleLowerCase(loc);
function titleForm(n, g, loc) {
  switch (loc) {
    case 'en': return (/^[aeiou]/i.test(n) ? 'an ' : 'a ') + n;
    case 'de': return ({ m: 'einen ', f: 'eine ', n: 'ein ' })[g] + n;
    case 'fr': return ({ m: 'un ', f: 'une ' })[g] + low(n, loc);
    case 'es': return ({ m: 'un ', f: 'una ' })[g] + low(n, loc);
    case 'pt': return ({ m: 'um ', f: 'uma ' })[g] + low(n, loc);
    case 'it': { const w = low(n, loc); if (g === 'f') return (/^[aeiou]/i.test(w) ? 'un’' : 'una ') + w; return (/^(z|gn|ps|pn|x|y|s[bcdfgklmnpqrstvz])/i.test(w) ? 'uno ' : 'un ') + w; }
    case 'nl': return 'een ' + low(n, loc);
    case 'sv': return ({ n: 'en ', t: 'ett ' })[g] + low(n, loc);
    case 'da': return ({ n: 'en ', t: 'et ' })[g] + low(n, loc);
    case 'no': return ({ m: 'en ', f: 'ei ', n: 'et ' })[g] + low(n, loc);
    case 'fi': return low(n, loc);
    default: return null;
  }
}
const NEEDS_GENDER = new Set(['de', 'fr', 'es', 'pt', 'it', 'sv', 'da', 'no']);

/** the forms of a picture in a language, or null when it has none */
function formOf(key, loc) {
  const j = key.indexOf('/'), noun = key.slice(j + 1), base = noun.replace(/_\d+$/, '');
  const vocab = platform.vocab(), N = platform.requireData(path.join(FL.DIR, 'names.js'));
  if (N.NOFORM.has(base)) return null;
  const entry = (((require('../image-cache/resolve.js').manifest().themes[key.slice(0, j)] || {}).nouns || {})[noun] || {});
  const find = (x) => [x, x.replace(/_/g, '-'), x.replace(/_/g, ' ')].find((y) => vocab[y]);
  const vk = entry.vocabKey || find(N.ALIAS[base] || N.LIB[base] || base);
  // a reviewed Level Set noun
  const R = vk && platform.requireData(path.join(FL.DIR, '..', 'htdx', 'names.js')).NAMES[vk];
  if (R && R[loc]) return R[loc];
  let n, g;
  if (vk && vocab[vk] && vocab[vk][loc]) { n = vocab[vk][loc][0]; g = vocab[vk][loc][2] || null; }
  else if (N.NAMES[base]) { n = N.NAMES[base][loc]; g = (N.GENDERS && N.GENDERS[base] && N.GENDERS[base][loc]) || null; }
  if (!n) return null;
  if (NEEDS_GENDER.has(loc) && !g) return null;
  const t = titleForm(n, g, loc);
  if (!t || /undefined/.test(t)) return null;
  // the bare noun as the reviewed names write it: capital in de fr es it pt en, small in nl sv da no fi
  const clean = /^(nl|sv|da|no|fi)$/.test(loc) ? low(n, loc) : n;
  const word = !/[\s-]/.test(n) && [...n].length <= 12 ? (loc === 'de' ? n : low(n, loc)) : null;
  return { t, n: clean, g, word };
}
module.exports = { formOf, titleForm };
