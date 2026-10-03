/**
 * picture-word-review.js — the native + pedagogy review of picture words for pages that NAME a picture by its
 * word (Word Tracing K-284 family, Write the Word G1-244 family). Moved out of K-284 on 2026-10-03 so both
 * families read one list. Level Set pages only (the published level-2 copy-1 pages read nothing here except
 * PAGE_SWAP, which is a defect on every page).
 */
'use strict';
const { vocab, displayWord } = require('./b2-common.js');
const { refusedPicture } = require('./picture-refusals.js');

/* Level Set 2026-10-02 — words NEW pages never trace or ask to write (the native + pedagogy review), per locale vocab keys.
   New pages also never name a picture that does not show its word (lib/picture-refusals.js). The published
   pages (level 2, copy 1) read neither. */
const WORD_EXCLUDE = {
  // every locale: abbreviations, a brand, proper names (printed lower case), an adult drink, words that cannot be pictured,
  // things a K child cannot name, species a child calls "flower" / "dinosaur" / "bird", look-alike sky objects
  all: ['us', 'ufo', 'suv', 'lego', 'cocktail', 'christmas', 'easter', 'halloween', 'santa', 'saturn', 'earth', 'bible',
    'capricious', 'content', 'disgusted', 'hot', 'cold', 'scrubs', 'vanity', 'ottoman', 'lounger', 'cabana', 'rosette', 'loader',
    'kettlebell', 'aster', 'azalea', 'carnation', 'columbine', 'cornflower', 'crocus', 'dahlia', 'forsythia', 'hibiscus',
    'hydrangea', 'jasmine', 'lilac', 'peony', 'petunia', 'phlox', 'trillium', 'zinnia', 'allosaurus', 'apatosaurus',
    'brachiosaurus', 'carnotaurus', 'deinonychus', 'dimetrodon', 'giganotosaurus', 'ichthyosaurus', 'iguanodon', 'maiasaura',
    'mosasaurus', 'oviraptor', 'plesiosaurus', 'styracosaurus', 'cockatiel', 'hornbill', 'cardinal', 'durian', 'persimmon',
    'gopher', 'meteor', 'comet', 'camp', 'food', 'violet', 'flip-flops', 'plum',
    // the picture review: species a child names "dinosaur" / "bird" / "flower", a cheese-like butter, look-alikes
    'ankylosaurus', 'diplodocus', 'velociraptor', 'kingfisher', 'puffin', 'quail', 'lavender', 'lily', 'lotus',
    'salamander', 'manatee', 'millipede', 'butter', 'mistletoe',
    // Write the Word review 2026-10-03: a brand, a ball labelled "soccer", birds and a building a child cannot name, a white-carrot parsnip
    'rollerblade', 'soccer', 'falcon', 'magpie', 'museum', 'parsnip'],
  de: ['boombox', 'peeler', 'bud'],
  en: ['heater', 'forest'],
  es: ['chandelier', 'rosette', 'cardigan', 'leek'],
  fr: ['barber', 'purse', 'smartphone', 'lock'],
  it: ['stingray', 'dandelion', 'baby', 'forest', 'pretzels'],
  pt: ['lamp', 'minibus', 'cranberry', 'icicle', 'mitten', 'bandage', 'cardigan'],
  nl: ['squash', 'boombox', 'swimming', 'cymbals'],
  sv: ['sledding', 'peeler', 'outlet', 'sled', 'cape'],
  da: ['angelfish', 'cereal', 'angry', 'rainy', 'smartphone', 'timer', 'sled'],
  no: ['porcupine', 'pretzels', 'sunny', 'timer'],
  fi: ['baseball', 'pretzels', 'toilet', 'fishbowl', 'heron'],
};
// a NEW page traces nouns only (an adjective has no German gender in the vocabulary — "Wütend", "Sonnig" were printed as
// nouns) and one word only (a phrase is not a word to trace: "pez payaso", "bac à sable")
const isPhrase = (w) => /\s/u.test(w);
const isNonNoun = (key) => { const e = vocab()[key]; return !(e && e.de && e.de[2]); };
// a defect on EVERY page, published ones included (2026-10-02): persimmon is drawn as a tomato, LEGO is a brand, a phrase
// is not a tracing word. Swapped AFTER the draw for the next clean word, so a page without one is byte-identical.
// 2026-10-03 (Write the Word review, pictures opened): a single king piece for "chess", a fawn for "reindeer", a pear-like
// lime, a train for "subway" — a child names each picture otherwise
const PAGE_SWAP = new Set(['persimmon', 'lego', 'chess', 'reindeer', 'lime', 'subway']);

/** true when a NEW page may name this entry ({noun, vocabKey, singular}) in this theme and locale */
function freshKeep(theme, e, loc) {
  return !(refusedPicture(theme, e.noun) || WORD_EXCLUDE.all.includes(e.vocabKey) || (WORD_EXCLUDE[loc] || []).includes(e.vocabKey)
    || isNonNoun(e.vocabKey) || isPhrase(displayWord(e.singular, loc)));
}

module.exports = { WORD_EXCLUDE, isPhrase, isNonNoun, PAGE_SWAP, freshKeep };
