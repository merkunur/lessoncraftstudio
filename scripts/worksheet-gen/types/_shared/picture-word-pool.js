/**
 * picture-word-pool.js — the themed picture + word pool of the Picture Word Cards maker's new templates (2026-11-02):
 * K-324's card bank rules (data/b3/picture-word-cards.js + locales: its exclude list and cardCase — de keeps the noun's
 * capital, the other locales print lower case; a word without a gender, an adjective or a colour, is always lower case),
 * pictures only (no B&W directory unless asked), every picture a child names with another word refused
 * (lib/picture-name-refusals.js, by noun), letters / spaces / hyphens only, one word once.
 */
'use strict';
const { bank } = require('../../lib/b3-common.js');
const { entriesFor, displayWord, distinctByWord, vocab } = require('../../lib/b2-common.js');
const { nameRefused, REFUSED, NAME_ONLY } = require('../../lib/picture-name-refusals.js');

const REFUSED_NOUNS = new Set([...REFUSED, ...NAME_ONLY].map((x) => x.split('/')[1]));

/** [{ theme, noun, vocabKey, word, gender, entry }] for (theme, locale), nouns only unless opts.anyWord */
function pictureWordPool(theme, locale, opts = {}) {
  const L = String(locale || 'en').slice(0, 2);
  const b = bank('picture-word-cards', L) || {};
  const cardCase = b.cardCase || 'lower', exclude = new Set(b.exclude || []);
  const max = opts.maxLetters || 14;
  const out = [];
  for (const e of entriesFor(theme, L)) {
    if (exclude.has(e.vocabKey) || nameRefused(theme, e.noun) || REFUSED_NOUNS.has(e.noun)) continue;
    // a THING (the vocabulary's noun tell: a de gender) — en and fi carry no gender of their own
    const v = vocab()[e.vocabKey];
    if (!opts.anyWord && !(v && v.de && v.de[2])) continue;
    let w = e.gender ? displayWord(e.singular, L) : displayWord(e.singular, L, 'lower');
    if (cardCase === 'lower') w = displayWord(w, L, 'lower');
    else if (cardCase === 'upper') w = w.toLocaleUpperCase(L);
    if (!/^[\p{L}][\p{L} -]*$/u.test(w) || [...w].length > max) continue;
    out.push({ theme, noun: e.noun, vocabKey: e.vocabKey, word: w, gender: e.gender || null, entry: e });
  }
  return distinctByWord(out, (x) => x.word.toLocaleLowerCase(L));
}

// pictures one child can take for the other (a baby doll · a baby; toy blocks · building bricks; a pumpkin · a squash):
// a page that matches words to pictures never shows both (review 2026-11-02)
const CONFUSABLE = [['doll', 'baby'], ['blocks', 'lego'], ['pumpkin', 'squash'], ['ship', 'boat'], ['cup', 'mug']];
const partnerOf = new Map(CONFUSABLE.flatMap(([a, b]) => [[a, b], [b, a]]));

/** n words of the pool in random order, never both of a confusable pair; fewer when the pool runs out */
function sampleMatchable(pool, n, rng) {
  const out = [], nouns = new Set();
  for (const e of rng.shuffle(pool.slice())) {
    if (out.length === n) break;
    if (nouns.has(partnerOf.get(e.noun))) continue;
    out.push(e); nouns.add(e.noun);
  }
  return out;
}

/** a page holding two confusable pictures (the pair sampleMatchable never draws) — a teacher's swap must not make one */
const hasConfusable = (picks) => picks.some((e) => picks.some((o) => o !== e && partnerOf.get(e.noun) === o.noun));
/** a teacher's picture choices (maker, lib/slot.js) over a sampleMatchable draw: refused when they make a confusable pair */
function matchableSlots(ctx, picks, pool, theme) {
  const slot = require('../../lib/slot.js');
  const chosen = slot.pictures(ctx, picks, pool, theme);
  if (!hasConfusable(chosen)) return chosen;
  const plain = slot.pictures(ctx && { ...ctx, overrides: null }, picks, pool, theme);
  slot.refuse(ctx, 'pic');
  return plain;
}

module.exports = { pictureWordPool, sampleMatchable, CONFUSABLE, hasConfusable, matchableSlots };
