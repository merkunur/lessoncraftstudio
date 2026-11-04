/**
 * picture-name-risk.js — ONE answer to "would a K-2 child NAME this picture with another word?" (2026-11-03, final
 * phase). A page that shows only a picture and asks for its word (its first sound, its article, its plural) has two
 * right answers when a child calls the picture otherwise: a chicken drawn for "hen", a wolf that looks like a husky.
 *
 *   UNAIDED_KEYS            pictures named otherwise in every language (types/_shared/alphabet-more.js reads it)
 *   nameRisky(loc, key)     the key is a picture a child of that language names otherwise — the union of the native
 *                           reviews: data/b2/article-name-risk.js (another word with another article),
 *                           data/literacy/sound-name-risk.json (another word with another sound) and the contact-sheet
 *                           refusals of lib/picture-name-refusals.js
 * A page that PRINTS the word (or offers a word bank) does not need it: the word decides there.
 */
'use strict';
const { NAME_RISK } = require('../data/b2/article-name-risk.js');
const SOUND = require('../data/literacy/sound-name-risk.json');
const { REFUSED, NAME_ONLY } = require('./picture-name-refusals.js');

// a narwhal is "a whale", a hen "a chicken", both library wolves look like a grey husky ("a dog"), a goose is "a duck"
const UNAIDED_KEYS = new Set(['narwhal', 'hen', 'wolf', 'goose']);
const REFUSED_NOUNS = new Set([...REFUSED, ...NAME_ONLY].map((x) => x.split('/')[1]));
const loc2 = (l) => String(l || 'en').slice(0, 2);

function nameRisky(locale, key) {
  const l = loc2(locale), k = String(key);
  if (UNAIDED_KEYS.has(k) || REFUSED_NOUNS.has(k)) return true;
  if ((NAME_RISK[l] || {})[k] != null) return true;
  return ['beginning', 'ending', 'middle'].some((b) => ((SOUND[b] || {})[l] || {})[k] != null);
}

module.exports = { UNAIDED_KEYS, nameRisky };
