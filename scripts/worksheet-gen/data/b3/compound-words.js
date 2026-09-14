/**
 * data/b3/compound-words.js — the G2-316 `compound-words` bank (family key
 * `compound-words`; design docs/worksheet-gen/b3-designs/G2-316-compound-words.md
 * §5). `bank('compound-words', loc)`.
 *
 * EN block HAND-AUTHORED (2026-09-14, G2-316 base build); the ten non-EN
 * blocks are GENERATED later by tools/apply-b3-locale.js from
 * i18n/.draft-b3-<loc>.json (native panels REBUILD the item set in their own
 * shape — compound en de nl sv da no fi · family es fr · alterati it pt — and
 * author every pair, link, affix, foil, hub, title and instruction as a
 * LITERAL; the code never joins, inflects, cases or infers a link).
 * `data/` is gitignored — the reviewer force-adds this module.
 *
 * Shape (design §5; the three additions are recorded in the build record):
 *   COMPOUND_WORDS[loc] = {
 *     shape: 'compound'|'family'|'alterati',
 *     casing: 'keep-first'|'lower',          de keeps a's capital, b lowercased inside the whole
 *     links: ['', 'n', …],                    the locale's joint set ('' always)
 *     linkBoxW: 36|90,                        F1 box width (fixed, never by the answer)
 *     exemplar: 'A',                          the unit a unit-less build() ships
 *     units: [{ id:'A', items:[ITEM] }, …],   the base SETS (unitAxis); within one set every
 *                                             part is distinct (2N parts for N items); a set
 *                                             below 8 items is REFUSED for the base, never
 *                                             filled; the exemplar set must reach 10 so that
 *                                             d3 (10 rows) can draw (ADDITION 1: the design's
 *                                             "set A: 8 disjoint" leaves d3 nothing to sample)
 *     opaque: [ITEM],                         ADDITION 2: both-pictured compounds whose meaning
 *                                             is NOT the sum of the parts (bluebell buttercup
 *                                             cornflower) live OUTSIDE the base sets — they are
 *                                             F2/F4 material only (analysis), never synthesis
 *     onePart: [ITEM],                        a OR b unpictured, whole.vocabKey REQUIRED (F1/F2/F4/F5)
 *     hubs: [{ hub:{vocabKey, word}, side:'a'|'b', satellites:[whole words] }],   F5
 *     foils: [{ vocabKey, word, looksLike:[…] }],   F4: pictured words that only SEEM to hide two
 *                                             words; a foil that DOES split into two pictured
 *                                             words must declare that split in `looksLike`
 *                                             (the teaching point, auditable), and is never a
 *                                             pool whole
 *     sizePairs: [],                          alterati / es F5 only
 *     crossWords: [[a, b]],                   F3: real words formed by a_i + b_j (i ≠ j) that are
 *                                             not pictured wholes (measured en: none)
 *     refuse: { F1, F3, F5 },                 firm refusals (design §3: F1 forced true for en)
 *     strings: { 'G2-316': {title, instruction} }   faces F1..F5 added in Phase 2
 *   }
 *   ITEM = { a:{vocabKey, word, pic?:{theme, noun}}, aStem:null|'…', link:'',
 *            b:{vocabKey, word, pic?} | {affix:'-ista'},
 *            whole:{word, vocabKey|null, scale:1|0.55|1.35}, hubSide:'a'|'b', opaque:false,
 *            picOpened:true }
 *   `pic` on a part is an OPTIONAL PIN (ADDITION 3): the part renders that picture; without it
 *   lib/b3-picture-index.js pictureFor() picks among the key's colour candidates, so every
 *   candidate must be honest (the gate's OPENED record is the lock, both ways).
 *
 * EN data rules applied here (contact sheets out/dev/G2-316-pictures-sheet.png +
 * G2-316-pictures-zoom.png + G2-316-pictures-sheet-2.png, EVERY colour candidate of every
 * key opened 2026-09-14 — the rulings are in the build record and the gate's OPENED table):
 *   - the both-pictured pool is exactly the 20 measured pairs (design §1 (m)); the 3 opaque
 *     ones (bluebell buttercup cornflower) are in `opaque`; the 17 transparent ones split
 *     into set A (12, all 24 parts distinct: the design's 8 seed items + birdhouse earthworm
 *     sunflower cheesecake) and set B (4: angelfish football cupcake saucepan — REFUSED for
 *     the base, < 8) and set C (pancake alone — `cake` and `pan` are taken in B; REFUSED);
 *     `cake` (cheesecake / cupcake / pancake), `fish` (starfish / angelfish), `ball`
 *     (basketball / football) and `pan` (saucepan / pancake) are the shared parts;
 *   - pins: water → beach/water (all three candidates are a bottle of water — the library's
 *     only depiction; the clearest one is pinned and the weak cue is recorded), chair →
 *     furniture/chair (beach/chair is a deckchair), shelf → furniture/shelf (classroom/shelf
 *     sits on a grey disc), star → christmas/star (shapes/star is an outline), basket → At the
 *     Supermarket/basket (easter/basket is a basket OF EGGS), ball → toys/ball, pan → around
 *     the house/pan (kitchen tools/pan is a lidded POT), cake → bakery/cake (a plain slice;
 *     4th of July/cake is a strawberry layer cake — honest too, pinned for the cleaner cue),
 *     flower → spring/flower (a red flower: easter/flower is a yellow daisy that READS AS A
 *     SUNFLOWER beside the sun — seen on the d3 render — and summer/flower is pink; all three
 *     are flowers, the pin keeps the cue from giving the answer away);
 *     every other part has only honest candidates and stays unpinned (art variety per seed);
 *   - `rain` = spring/rain, a smiling cloud with falling drops (the library's only rain; G1-309
 *     dropped it for a RHYME, where the child must say exactly "rain" — here the drops are the
 *     cue and d1 prints the word); `sauce` = a red bottle of sauce (weak: reads ketchup) — the
 *     one reason saucepan sits in set B; `brush` = a paint brush (a brush);
 *   - onePart: whole pictured + exactly one pictured part; snowman (snow + man, neither
 *     pictured), seashell, ladybug, skateboard, firefly, snowflake, toolbox, airplane,
 *     haystack, bathtub, scarecrow(crow pictured → kept) … are NOT one-part items unless one
 *     part is pictured; opaque one-part words (butterfly pineapple eggplant) carry
 *     `opaque:true` and are F2/F4 material only;
 *   - hubs measured on the pool ∪ onePart: fish 6 (b-side) · sun 3 · rain 3 (a-side) · cake 3
 *     (b-side) → only ONE hub reaches the F5 floor of 4; F5 in en needs the panel's ruling
 *     (`lanes:3` on the second web) — `refuse.F5` stays false, the note is in the record;
 *   - foils: pictured words that only seem to hide two words; `carpet` (car + pet: both
 *     pictured, declared in looksLike — the canonical false split) `hamster` `pumpkin`
 *     `carrot` `kitchen` `cabinet` `mushroom` `penguin` `donkey` `potato` (10 ≥ 8 → F4 not
 *     refused); REFUSED after opening: `pelican` (all four library pictures are a STORK —
 *     long plain beak, black wing tips, red legs; the sv #35 class) and `harvest` (a wheat
 *     sheaf: a child says "wheat"); pins on onePart parts: apple → fruits/apple
 *     (thanksgivinng/apple is a basket of apples, tree/apple an apple TREE), egg → At the
 *     Supermarket/egg (easter/egg is a painted Easter egg);
 *   - crossWords: none measured (no a_i + b_j of set A is a pictured word);
 *   - refuse.F1 true (en link is always '' = no decision), F3 false, F5 false.
 */
'use strict';

const P = (theme, noun) => ({ theme, noun });
const part = (vocabKey, word, pic) => (pic ? { vocabKey, word, pic } : { vocabKey, word });
const item = (a, b, whole, opts = {}) => ({
  a, aStem: null, link: '', b,
  whole: { word: whole, vocabKey: whole, scale: 1 },
  hubSide: 'b', opaque: !!opts.opaque, picOpened: true,
});

const COMPOUND_WORDS = {
  en: {
    shape: 'compound',
    casing: 'lower',
    links: [''],
    linkBoxW: 36,
    exemplar: 'A',
    units: [
      { id: 'A', items: [
        item(part('water', 'water', P('beach', 'water')), part('melon', 'melon'), 'watermelon'),
        item(part('tooth', 'tooth'), part('brush', 'brush'), 'toothbrush'),
        item(part('hand', 'hand'), part('bag', 'bag'), 'handbag'),
        item(part('basket', 'basket', P('At the Supermarket', 'basket')), part('ball', 'ball', P('toys', 'ball')), 'basketball'),
        item(part('arm', 'arm'), part('chair', 'chair', P('furniture', 'chair')), 'armchair'),
        item(part('book', 'book'), part('shelf', 'shelf', P('furniture', 'shelf')), 'bookshelf'),
        item(part('star', 'star', P('christmas', 'star')), part('fish', 'fish'), 'starfish'),
        item(part('rain', 'rain'), part('coat', 'coat'), 'raincoat'),
        item(part('bird', 'bird'), part('house', 'house'), 'birdhouse'),
        item(part('earth', 'earth'), part('worm', 'worm'), 'earthworm'),
        item(part('sun', 'sun'), part('flower', 'flower', P('spring', 'flower')), 'sunflower'),
        item(part('cheese', 'cheese'), part('cake', 'cake', P('bakery', 'cake')), 'cheesecake'),
      ] },
      { id: 'B', items: [
        item(part('angel', 'angel'), part('fish', 'fish'), 'angelfish'),
        item(part('foot', 'foot'), part('ball', 'ball', P('toys', 'ball')), 'football'),
        item(part('cup', 'cup'), part('cake', 'cake', P('bakery', 'cake')), 'cupcake'),
        item(part('sauce', 'sauce'), part('pan', 'pan', P('around the house', 'pan')), 'saucepan'),
      ] },
      { id: 'C', items: [
        item(part('pan', 'pan', P('around the house', 'pan')), part('cake', 'cake', P('bakery', 'cake')), 'pancake'),
      ] },
    ],
    opaque: [
      item(part('blue', 'blue'), part('bell', 'bell'), 'bluebell', { opaque: true }),
      item(part('butter', 'butter'), part('cup', 'cup'), 'buttercup', { opaque: true }),
      item(part('corn', 'corn'), part('flower', 'flower', P('spring', 'flower')), 'cornflower', { opaque: true }),
    ],
    onePart: [
      item(part('rain', 'rain'), { vocabKey: null, word: 'bow' }, 'rainbow'),
      item(part('rain', 'rain'), { vocabKey: null, word: 'drop' }, 'raindrop'),
      item(part('sun', 'sun'), { vocabKey: null, word: 'glasses' }, 'sunglasses'),
      item(part('sun', 'sun'), { vocabKey: null, word: 'screen' }, 'sunscreen'),
      item(part('key', 'key'), { vocabKey: null, word: 'board' }, 'keyboard'),
      item(part('tooth', 'tooth'), { vocabKey: null, word: 'paste' }, 'toothpaste'),
      item({ vocabKey: null, word: 'jelly' }, part('fish', 'fish'), 'jellyfish'),
      item({ vocabKey: null, word: 'clown' }, part('fish', 'fish'), 'clownfish'),
      item({ vocabKey: null, word: 'puffer' }, part('fish', 'fish'), 'pufferfish'),
      item({ vocabKey: null, word: 'gold' }, part('fish', 'fish'), 'goldfish'),
      item({ vocabKey: null, word: 'pop' }, part('corn', 'corn'), 'popcorn'),
      item({ vocabKey: null, word: 'light' }, part('house', 'house'), 'lighthouse'),
      item(part('sand', 'sand'), { vocabKey: null, word: 'castle' }, 'sandcastle'),
      item({ vocabKey: null, word: 'scare' }, part('crow', 'crow'), 'scarecrow'),
      item({ vocabKey: null, word: 'wheel' }, part('chair', 'chair', P('furniture', 'chair')), 'wheelchair'),
      item(part('neck', 'neck'), { vocabKey: null, word: 'lace' }, 'necklace'),
      item({ vocabKey: null, word: 'tea' }, part('pot', 'pot'), 'teapot'),
      item({ vocabKey: null, word: 'note' }, part('book', 'book'), 'notebook'),
      item(part('butter', 'butter'), { vocabKey: null, word: 'fly' }, 'butterfly', { opaque: true }),
      item({ vocabKey: null, word: 'pine' }, part('apple', 'apple', P('fruits', 'apple')), 'pineapple', { opaque: true }),
      item(part('egg', 'egg', P('At the Supermarket', 'egg')), { vocabKey: null, word: 'plant' }, 'eggplant', { opaque: true }),
    ],
    hubs: [
      { hub: { vocabKey: 'fish', word: 'fish' }, side: 'b', satellites: ['starfish', 'angelfish', 'jellyfish', 'clownfish', 'pufferfish', 'goldfish'] },
      { hub: { vocabKey: 'sun', word: 'sun' }, side: 'a', satellites: ['sunflower', 'sunglasses', 'sunscreen'] },
      { hub: { vocabKey: 'rain', word: 'rain' }, side: 'a', satellites: ['raincoat', 'rainbow', 'raindrop'] },
      { hub: { vocabKey: 'cake', word: 'cake' }, side: 'b', satellites: ['cheesecake', 'cupcake', 'pancake'] },
    ],
    foils: [
      { vocabKey: 'carpet', word: 'carpet', looksLike: ['car', 'pet'] },
      { vocabKey: 'hamster', word: 'hamster', looksLike: ['ham', 'ster'] },
      { vocabKey: 'pumpkin', word: 'pumpkin', looksLike: ['pump', 'kin'] },
      { vocabKey: 'carrot', word: 'carrot', looksLike: ['car', 'rot'] },
      { vocabKey: 'kitchen', word: 'kitchen', looksLike: ['kit', 'chen'] },
      { vocabKey: 'cabinet', word: 'cabinet', looksLike: ['cab', 'inet'] },
      { vocabKey: 'mushroom', word: 'mushroom', looksLike: ['mush', 'room'] },
      { vocabKey: 'penguin', word: 'penguin', looksLike: ['pen', 'guin'] },
      { vocabKey: 'donkey', word: 'donkey', looksLike: ['don', 'key'] },
      { vocabKey: 'potato', word: 'potato', looksLike: ['pot', 'ato'] },
    ],
    sizePairs: [],
    crossWords: [],
    refuse: { F1: true, F3: false, F5: false },
    strings: {
      'G2-316': {
        title: 'Compound Words: Picture + Picture',
        instruction: 'Name the two pictures, join the two words and write the new word on the line.',
      },
    },
  },
};

module.exports = { COMPOUND_WORDS };
