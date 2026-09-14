/**
 * data/b3/letter-of-the-week.js — the K-317 `letter-of-the-week` bank.
 *
 * EN block HAND-AUTHORED (2026-09-14, K-317 base build); the ten non-EN blocks
 * are GENERATED later by tools/apply-b3-locale.js from i18n/.draft-b3-<loc>.json
 * (native panels author letters/items/foils/units/pairs/avoid/refuse/strings).
 * `data/` is gitignored — the reviewer force-adds this module.
 *
 * Shape (design file §5):
 *   LETTER_OF_THE_WEEK[loc] = {
 *     level: 'letter'|'sound',        hit rule: word[0] === L  |  graphemes[0] === L
 *     positionMode: 'letter'|'syllable', showWordInPositions: bool   (face 3)
 *     exemplar: 'm',                  the letter a unit-less build() renders
 *     letters: [{ L, upper, pair, avoid,
 *        items: [{theme, noun, key, word, graphemes, pos, split}],   pos 0 = initial hit; > 0 medial/final (faces 2-4)
 *        foils: [{theme, noun, key, word}] }],                       NFD base free of L
 *     unitExemplar: 'sh',             the unit a unit-less G1-311 build() renders (face 5)
 *     units: [{u, upper, band, items, foils}],   face 5 (>= 3 or refuse): items carry the unit as
 *        ONE grapheme (pos = its index); foils carry the component letters separately, no unit substring
 *     refuse: {},  strings: {'K-317': {title, instruction}, ...faces}
 *   }
 *
 * EN data rules applied here (measured with node against the real files):
 *   - every `word` is the approved-words-en.json entry for `key` (join key → word, split);
 *   - `graphemes` = the LETTERS of the word: en has NO verified grapheme (chunks) layer
 *     (README open item 4 / _SUBSTRATE.md) and en `level` is 'letter', so hit = word[0];
 *     a panel may re-author graphemes (sh/ch/th as units) for face 5 — not needed on the base;
 *   - `pos` = index of the first L in `graphemes`;
 *   - the picture is PINNED to one (theme, noun) that carries the key in
 *     image-cache/cache/manifest.json (colour dirs only, no BW marker) — the
 *     candidate opened during authoring; render uses fileUri(theme, noun);
 *   - every word is traceable(); no duplicate word inside a letter's items + foils;
 *   - foils: NFD base contains no L; >= 4 begin with an `avoid` letter (d2 draws
 *     from those), >= 2 begin with the `pair` letter (d3 draws two of those).
 *   - `pair` for s: the design file's est. s/z is REFUSED by measurement (z has 1
 *     initial word in the eligible en pool; rule 8 needs >= 4) → c (soft-c/s
 *     spelling confusion); the en panel may re-decide. Digraph-initial words
 *     (sh-, th-, ch-) are never initial HITS (a K "begins with the S sound" page
 *     must not show a shark), though they stay legal as foils/non-initial items.
 */
'use strict';
const LETTER_OF_THE_WEEK = {
  en: {
    level: 'letter',
    positionMode: 'letter',
    showWordInPositions: true,
    exemplar: 'm',
    letters: [
    {
      L: 'm', upper: 'M', pair: 'n', avoid: ['n', 'w'],
      // items: pos 0 = initial (base hits); pos > 0 = medial / final (faces 2-4)
      items: [
      { theme: 'post office', noun: 'mailbox', key: 'mailbox', word: 'mailbox', graphemes: ['m', 'a', 'i', 'l', 'b', 'o', 'x'], pos: 0, split: ['mail', 'box'] },
      { theme: 'classroom', noun: 'map', key: 'map', word: 'map', graphemes: ['m', 'a', 'p'], pos: 0, split: ['map'] },
      { theme: 'accessories', noun: 'mask', key: 'mask', word: 'mask', graphemes: ['m', 'a', 's', 'k'], pos: 0, split: ['mask'] },
      { theme: 'accessories', noun: 'medal', key: 'medal', word: 'medal', graphemes: ['m', 'e', 'd', 'a', 'l'], pos: 0, split: ['med', 'al'] },
      { theme: 'breakfast', noun: 'milk', key: 'milk', word: 'milk', graphemes: ['m', 'i', 'l', 'k'], pos: 0, split: ['milk'] },
      { theme: 'furniture', noun: 'mirror', key: 'mirror', word: 'mirror', graphemes: ['m', 'i', 'r', 'r', 'o', 'r'], pos: 0, split: ['mir', 'ror'] },
      { theme: 'clothing', noun: 'mitten', key: 'mitten', word: 'mitten', graphemes: ['m', 'i', 't', 't', 'e', 'n'], pos: 0, split: ['mit', 'ten'] },
      { theme: 'zoo animals', noun: 'monkey', key: 'monkey', word: 'monkey', graphemes: ['m', 'o', 'n', 'k', 'e', 'y'], pos: 0, split: ['mon', 'key'] },
      { theme: 'camping', noun: 'moon', key: 'moon', word: 'moon', graphemes: ['m', 'o', 'o', 'n'], pos: 0, split: ['moon'] },
      { theme: 'around the house', noun: 'mop', key: 'mop', word: 'mop', graphemes: ['m', 'o', 'p'], pos: 0, split: ['mop'] },
      { theme: 'pets', noun: 'mouse', key: 'mouse', word: 'mouse', graphemes: ['m', 'o', 'u', 's', 'e'], pos: 0, split: ['mouse'] },
      { theme: 'body parts', noun: 'mouth', key: 'mouth', word: 'mouth', graphemes: ['m', 'o', 'u', 't', 'h'], pos: 0, split: ['mouth'] },
      { theme: 'bakery', noun: 'muffin', key: 'muffin', word: 'muffin', graphemes: ['m', 'u', 'f', 'f', 'i', 'n'], pos: 0, split: ['muf', 'fin'] },
      { theme: 'kitchen tools', noun: 'mug', key: 'mug', word: 'mug', graphemes: ['m', 'u', 'g'], pos: 0, split: ['mug'] },
      { theme: 'vegetables', noun: 'mushroom', key: 'mushroom', word: 'mushroom', graphemes: ['m', 'u', 's', 'h', 'r', 'o', 'o', 'm'], pos: 0, split: ['mus', 'hroom'] },
      { theme: 'camping', noun: 'mountain', key: 'mountain', word: 'mountain', graphemes: ['m', 'o', 'u', 'n', 't', 'a', 'i', 'n'], pos: 0, split: ['moun', 'tain'] },
      { theme: 'tools', noun: 'hammer', key: 'hammer', word: 'hammer', graphemes: ['h', 'a', 'm', 'm', 'e', 'r'], pos: 2, split: ['ham', 'mer'] },
      { theme: 'fruits', noun: 'lemon', key: 'lemon', word: 'lemon', graphemes: ['l', 'e', 'm', 'o', 'n'], pos: 2, split: ['lem', 'on'] },
      { theme: 'zoo animals', noun: 'camel', key: 'camel', word: 'camel', graphemes: ['c', 'a', 'm', 'e', 'l'], pos: 2, split: ['cam', 'el'] },
      { theme: 'vegetables', noun: 'pumpkin', key: 'pumpkin', word: 'pumpkin', graphemes: ['p', 'u', 'm', 'p', 'k', 'i', 'n'], pos: 2, split: ['pum', 'pkin'] },
      { theme: 'vegetables', noun: 'tomato', key: 'tomato', word: 'tomato', graphemes: ['t', 'o', 'm', 'a', 't', 'o'], pos: 2, split: ['tom', 'at', 'o'] },
      { theme: 'furniture', noun: 'lamp', key: 'lamp', word: 'lamp', graphemes: ['l', 'a', 'm', 'p'], pos: 2, split: ['lamp'] },
      { theme: 'weather', noun: 'umbrella', key: 'umbrella', word: 'umbrella', graphemes: ['u', 'm', 'b', 'r', 'e', 'l', 'l', 'a'], pos: 1, split: ['um', 'brel', 'la'] },
      { theme: 'pets', noun: 'hamster', key: 'hamster', word: 'hamster', graphemes: ['h', 'a', 'm', 's', 't', 'e', 'r'], pos: 2, split: ['ham', 'ster'] },
      { theme: 'music', noun: 'drum', key: 'drum', word: 'drum', graphemes: ['d', 'r', 'u', 'm'], pos: 3, split: ['drum'] },
      { theme: 'around the house', noun: 'broom', key: 'broom', word: 'broom', graphemes: ['b', 'r', 'o', 'o', 'm'], pos: 4, split: ['broom'] },
      { theme: 'body parts', noun: 'arm', key: 'arm', word: 'arm', graphemes: ['a', 'r', 'm'], pos: 2, split: ['arm'] },
      { theme: 'insects and bugs', noun: 'worm', key: 'worm', word: 'worm', graphemes: ['w', 'o', 'r', 'm'], pos: 3, split: ['worm'] },
      { theme: 'breakfast', noun: 'jam', key: 'jam', word: 'jam', graphemes: ['j', 'a', 'm'], pos: 2, split: ['jam'] },
      { theme: 'At the Supermarket', noun: 'ham', key: 'ham', word: 'ham', graphemes: ['h', 'a', 'm'], pos: 2, split: ['ham'] },
      ],
      // foils: NFD base free of the letter; >= 4 begin with an `avoid` letter (d2), >= 2 with the `pair` letter (d3)
      foils: [
      { theme: 'spring', noun: 'nest', key: 'nest', word: 'nest' },
      { theme: 'body parts', noun: 'nose', key: 'nose', word: 'nose' },
      { theme: 'tools', noun: 'nut', key: 'nut', word: 'nut' },
      { theme: 'beach', noun: 'net', key: 'net', word: 'net' },
      { theme: 'accessories', noun: 'necklace', key: 'necklace', word: 'necklace' },
      { theme: 'hospital', noun: 'nurse', key: 'nurse', word: 'nurse' },
      { theme: 'classroom', noun: 'notebook', key: 'notebook', word: 'notebook' },
      { theme: 'accessories', noun: 'watch', key: 'watch', word: 'watch' },
      { theme: 'ocean life', noun: 'whale', key: 'whale', word: 'whale' },
      { theme: 'zoo animals', noun: 'wolf', key: 'wolf', word: 'wolf' },
      { theme: 'around the house', noun: 'window', key: 'window', word: 'window' },
      { theme: 'insects and bugs', noun: 'wasp', key: 'wasp', word: 'wasp' },
      { theme: 'accessories', noun: 'wallet', key: 'wallet', word: 'wallet' },
      { theme: 'pets', noun: 'cat', key: 'cat', word: 'cat' },
      { theme: 'pets', noun: 'dog', key: 'dog', word: 'dog' },
      { theme: 'toys', noun: 'ball', key: 'ball', word: 'ball' },
      { theme: 'furniture', noun: 'bed', key: 'bed', word: 'bed' },
      { theme: 'bakery', noun: 'cake', key: 'cake', word: 'cake' },
      { theme: 'around the house', noun: 'key', key: 'key', word: 'key' },
      { theme: 'ocean life', noun: 'fish', key: 'fish', word: 'fish' },
      ],
    },
    {
      L: 's', upper: 'S', pair: 'c', avoid: ['c', 'z'],
      // items: pos 0 = initial (base hits); pos > 0 = medial / final (faces 2-4)
      items: [
      { theme: 'accessories', noun: 'sock', key: 'sock', word: 'sock', graphemes: ['s', 'o', 'c', 'k'], pos: 0, split: ['sock'] },
      { theme: 'weather', noun: 'sun', key: 'sun', word: 'sun', graphemes: ['s', 'u', 'n'], pos: 0, split: ['sun'] },
      { theme: 'shapes', noun: 'star', key: 'star', word: 'star', graphemes: ['s', 't', 'a', 'r'], pos: 0, split: ['star'] },
      { theme: 'zoo animals', noun: 'seal', key: 'seal', word: 'seal', graphemes: ['s', 'e', 'a', 'l'], pos: 0, split: ['seal'] },
      { theme: 'kitchen tools', noun: 'spoon', key: 'spoon', word: 'spoon', graphemes: ['s', 'p', 'o', 'o', 'n'], pos: 0, split: ['spoon'] },
      { theme: 'spring', noun: 'snail', key: 'snail', word: 'snail', graphemes: ['s', 'n', 'a', 'i', 'l'], pos: 0, split: ['snail'] },
      { theme: 'furniture', noun: 'sofa', key: 'sofa', word: 'sofa', graphemes: ['s', 'o', 'f', 'a'], pos: 0, split: ['sof', 'a'] },
      { theme: 'winter', noun: 'snowman', key: 'snowman', word: 'snowman', graphemes: ['s', 'n', 'o', 'w', 'm', 'a', 'n'], pos: 0, split: ['snow', 'man'] },
      { theme: 'insects and bugs', noun: 'spider', key: 'spider', word: 'spider', graphemes: ['s', 'p', 'i', 'd', 'e', 'r'], pos: 0, split: ['spid', 'er'] },
      { theme: 'forest creatures', noun: 'squirrel', key: 'squirrel', word: 'squirrel', graphemes: ['s', 'q', 'u', 'i', 'r', 'r', 'e', 'l'], pos: 0, split: ['squir', 'rel'] },
      { theme: 'fruits', noun: 'strawberry', key: 'strawberry', word: 'strawberry', graphemes: ['s', 't', 'r', 'a', 'w', 'b', 'e', 'r', 'r', 'y'], pos: 0, split: ['straw', 'ber', 'ry'] },
      { theme: 'winter', noun: 'sled', key: 'sled', word: 'sled', graphemes: ['s', 'l', 'e', 'd'], pos: 0, split: ['sled'] },
      { theme: 'birds 2', noun: 'swan', key: 'swan', word: 'swan', graphemes: ['s', 'w', 'a', 'n'], pos: 0, split: ['swan'] },
      { theme: 'classroom', noun: 'scissors', key: 'scissors', word: 'scissors', graphemes: ['s', 'c', 'i', 's', 's', 'o', 'r', 's'], pos: 0, split: ['scis', 'sors'] },
      { theme: 'beach', noun: 'sandals', key: 'sandals', word: 'sandals', graphemes: ['s', 'a', 'n', 'd', 'a', 'l', 's'], pos: 0, split: ['san', 'dals'] },
      { theme: 'music', noun: 'saxophone', key: 'saxophone', word: 'saxophone', graphemes: ['s', 'a', 'x', 'o', 'p', 'h', 'o', 'n', 'e'], pos: 0, split: ['sax', 'op', 'hone'] },
      { theme: 'easter', noun: 'basket', key: 'basket', word: 'basket', graphemes: ['b', 'a', 's', 'k', 'e', 't'], pos: 2, split: ['bas', 'ket'] },
      { theme: 'classroom', noun: 'desk', key: 'desk', word: 'desk', graphemes: ['d', 'e', 's', 'k'], pos: 2, split: ['desk'] },
      { theme: 'ocean life', noun: 'fish', key: 'fish', word: 'fish', graphemes: ['f', 'i', 's', 'h'], pos: 2, split: ['fish'] },
      { theme: 'farm animals', noun: 'horse', key: 'horse', word: 'horse', graphemes: ['h', 'o', 'r', 's', 'e'], pos: 3, split: ['horse'] },
      { theme: 'flowers', noun: 'rose', key: 'rose', word: 'rose', graphemes: ['r', 'o', 's', 'e'], pos: 2, split: ['rose'] },
      { theme: 'around the house', noun: 'vase', key: 'vase', word: 'vase', graphemes: ['v', 'a', 's', 'e'], pos: 2, split: ['vase'] },
      { theme: 'miscellaneous', noun: 'house', key: 'house', word: 'house', graphemes: ['h', 'o', 'u', 's', 'e'], pos: 3, split: ['house'] },
      { theme: 'kitchen tools', noun: 'toaster', key: 'toaster', word: 'toaster', graphemes: ['t', 'o', 'a', 's', 't', 'e', 'r'], pos: 3, split: ['toas', 'ter'] },
      { theme: 'vehicles', noun: 'bus', key: 'bus', word: 'bus', graphemes: ['b', 'u', 's'], pos: 2, split: ['bus'] },
      { theme: 'clothing', noun: 'dress', key: 'dress', word: 'dress', graphemes: ['d', 'r', 'e', 's', 's'], pos: 3, split: ['dress'] },
      { theme: 'breakfast', noun: 'grapes', key: 'grapes', word: 'grapes', graphemes: ['g', 'r', 'a', 'p', 'e', 's'], pos: 5, split: ['grap', 'es'] },
      { theme: 'winter', noun: 'boots', key: 'boots', word: 'boots', graphemes: ['b', 'o', 'o', 't', 's'], pos: 4, split: ['boots'] },
      { theme: 'ocean life', noun: 'octopus', key: 'octopus', word: 'octopus', graphemes: ['o', 'c', 't', 'o', 'p', 'u', 's'], pos: 6, split: ['oc', 'top', 'us'] },
      { theme: 'winter', noun: 'walrus', key: 'walrus', word: 'walrus', graphemes: ['w', 'a', 'l', 'r', 'u', 's'], pos: 5, split: ['wal', 'rus'] },
      ],
      // foils: NFD base free of the letter; >= 4 begin with an `avoid` letter (d2), >= 2 with the `pair` letter (d3)
      foils: [
      { theme: 'pets', noun: 'cat', key: 'cat', word: 'cat' },
      { theme: 'farm animals', noun: 'cow', key: 'cow', word: 'cow' },
      { theme: 'vehicles', noun: 'car', key: 'car', word: 'car' },
      { theme: 'bakery', noun: 'cake', key: 'cake', word: 'cake' },
      { theme: 'kitchen tools', noun: 'cup', key: 'cup', word: 'cup' },
      { theme: 'vegetables', noun: 'corn', key: 'corn', word: 'corn' },
      { theme: 'vegetables', noun: 'carrot', key: 'carrot', word: 'carrot' },
      { theme: 'bakery', noun: 'cookie', key: 'cookie', word: 'cookie' },
      { theme: 'zoo animals', noun: 'zebra', key: 'zebra', word: 'zebra' },
      { theme: 'toys', noun: 'ball', key: 'ball', word: 'ball' },
      { theme: 'furniture', noun: 'bed', key: 'bed', word: 'bed' },
      { theme: 'pets', noun: 'dog', key: 'dog', word: 'dog' },
      { theme: 'farm animals', noun: 'pig', key: 'pig', word: 'pig' },
      { theme: 'easter', noun: 'egg', key: 'egg', word: 'egg' },
      { theme: 'around the house', noun: 'key', key: 'key', word: 'key' },
      { theme: 'clothing', noun: 'hat', key: 'hat', word: 'hat' },
      { theme: 'camping', noun: 'moon', key: 'moon', word: 'moon' },
      ],
    },
    {
      L: 't', upper: 'T', pair: 'd', avoid: ['d', 'f'],
      // items: pos 0 = initial (base hits); pos > 0 = medial / final (faces 2-4)
      items: [
      { theme: 'camping', noun: 'tent', key: 'tent', word: 'tent', graphemes: ['t', 'e', 'n', 't'], pos: 0, split: ['tent'] },
      { theme: 'zoo animals', noun: 'tiger', key: 'tiger', word: 'tiger', graphemes: ['t', 'i', 'g', 'e', 'r'], pos: 0, split: ['tig', 'er'] },
      { theme: 'vegetables', noun: 'tomato', key: 'tomato', word: 'tomato', graphemes: ['t', 'o', 'm', 'a', 't', 'o'], pos: 0, split: ['tom', 'at', 'o'] },
      { theme: 'body parts', noun: 'tooth', key: 'tooth', word: 'tooth', graphemes: ['t', 'o', 'o', 't', 'h'], pos: 0, split: ['tooth'] },
      { theme: 'vehicles', noun: 'tractor', key: 'tractor', word: 'tractor', graphemes: ['t', 'r', 'a', 'c', 't', 'o', 'r'], pos: 0, split: ['trac', 'tor'] },
      { theme: 'vehicles', noun: 'train', key: 'train', word: 'train', graphemes: ['t', 'r', 'a', 'i', 'n'], pos: 0, split: ['train'] },
      { theme: 'flowers', noun: 'tulip', key: 'tulip', word: 'tulip', graphemes: ['t', 'u', 'l', 'i', 'p'], pos: 0, split: ['tul', 'ip'] },
      { theme: 'farm animals', noun: 'turkey', key: 'turkey', word: 'turkey', graphemes: ['t', 'u', 'r', 'k', 'e', 'y'], pos: 0, split: ['tur', 'key'] },
      { theme: 'around the house', noun: 'toothbrush', key: 'toothbrush', word: 'toothbrush', graphemes: ['t', 'o', 'o', 't', 'h', 'b', 'r', 'u', 's', 'h'], pos: 0, split: ['toot', 'hbrush'] },
      { theme: 'vehicles', noun: 'taxi', key: 'taxi', word: 'taxi', graphemes: ['t', 'a', 'x', 'i'], pos: 0, split: ['tax', 'i'] },
      { theme: 'kitchen tools', noun: 'teapot', key: 'teapot', word: 'teapot', graphemes: ['t', 'e', 'a', 'p', 'o', 't'], pos: 0, split: ['teap', 'ot'] },
      { theme: 'around the house', noun: 'telephone', key: 'telephone', word: 'telephone', graphemes: ['t', 'e', 'l', 'e', 'p', 'h', 'o', 'n', 'e'], pos: 0, split: ['tel', 'ep', 'hone'] },
      { theme: 'clothing', noun: 'tie', key: 'tie', word: 'tie', graphemes: ['t', 'i', 'e'], pos: 0, split: ['tie'] },
      { theme: 'vehicles', noun: 'truck', key: 'truck', word: 'truck', graphemes: ['t', 'r', 'u', 'c', 'k'], pos: 0, split: ['truck'] },
      { theme: 'music', noun: 'trumpet', key: 'trumpet', word: 'trumpet', graphemes: ['t', 'r', 'u', 'm', 'p', 'e', 't'], pos: 0, split: ['trum', 'pet'] },
      { theme: 'birds 2', noun: 'toucan', key: 'toucan', word: 'toucan', graphemes: ['t', 'o', 'u', 'c', 'a', 'n'], pos: 0, split: ['touc', 'an'] },
      { theme: 'breakfast', noun: 'butter', key: 'butter', word: 'butter', graphemes: ['b', 'u', 't', 't', 'e', 'r'], pos: 2, split: ['but', 'ter'] },
      { theme: 'toys', noun: 'kite', key: 'kite', word: 'kite', graphemes: ['k', 'i', 't', 'e'], pos: 2, split: ['kite'] },
      { theme: 'post office', noun: 'letter', key: 'letter', word: 'letter', graphemes: ['l', 'e', 't', 't', 'e', 'r'], pos: 2, split: ['let', 'ter'] },
      { theme: 'music', noun: 'guitar', key: 'guitar', word: 'guitar', graphemes: ['g', 'u', 'i', 't', 'a', 'r'], pos: 3, split: ['guit', 'ar'] },
      { theme: 'zoo animals', noun: 'otter', key: 'otter', word: 'otter', graphemes: ['o', 't', 't', 'e', 'r'], pos: 1, split: ['ot', 'ter'] },
      { theme: 'vegetables', noun: 'potato', key: 'potato', word: 'potato', graphemes: ['p', 'o', 't', 'a', 't', 'o'], pos: 2, split: ['pot', 'at', 'o'] },
      { theme: 'vegetables', noun: 'lettuce', key: 'lettuce', word: 'lettuce', graphemes: ['l', 'e', 't', 't', 'u', 'c', 'e'], pos: 2, split: ['let', 'tuce'] },
      { theme: 'winter', noun: 'boots', key: 'boots', word: 'boots', graphemes: ['b', 'o', 'o', 't', 's'], pos: 3, split: ['boots'] },
      { theme: 'pets', noun: 'cat', key: 'cat', word: 'cat', graphemes: ['c', 'a', 't'], pos: 2, split: ['cat'] },
      { theme: 'vehicles', noun: 'boat', key: 'boat', word: 'boat', graphemes: ['b', 'o', 'a', 't'], pos: 3, split: ['boat'] },
      { theme: 'farm animals', noun: 'goat', key: 'goat', word: 'goat', graphemes: ['g', 'o', 'a', 't'], pos: 3, split: ['goat'] },
      { theme: 'clothing', noun: 'coat', key: 'coat', word: 'coat', graphemes: ['c', 'o', 'a', 't'], pos: 3, split: ['coat'] },
      { theme: 'tools', noun: 'nut', key: 'nut', word: 'nut', graphemes: ['n', 'u', 't'], pos: 2, split: ['nut'] },
      { theme: 'insects and bugs', noun: 'ant', key: 'ant', word: 'ant', graphemes: ['a', 'n', 't'], pos: 2, split: ['ant'] },
      { theme: 'toys', noun: 'robot', key: 'robot', word: 'robot', graphemes: ['r', 'o', 'b', 'o', 't'], pos: 4, split: ['rob', 'ot'] },
      { theme: 'space', noun: 'rocket', key: 'rocket', word: 'rocket', graphemes: ['r', 'o', 'c', 'k', 'e', 't'], pos: 5, split: ['roc', 'ket'] },
      ],
      // foils: NFD base free of the letter; >= 4 begin with an `avoid` letter (d2), >= 2 with the `pair` letter (d3)
      foils: [
      { theme: 'pets', noun: 'dog', key: 'dog', word: 'dog' },
      { theme: 'farm animals', noun: 'duck', key: 'duck', word: 'duck' },
      { theme: 'around the house', noun: 'door', key: 'door', word: 'door' },
      { theme: 'toys', noun: 'doll', key: 'doll', word: 'doll' },
      { theme: 'forest creatures', noun: 'deer', key: 'deer', word: 'deer' },
      { theme: 'ocean life', noun: 'dolphin', key: 'dolphin', word: 'dolphin' },
      { theme: 'farm animals', noun: 'donkey', key: 'donkey', word: 'donkey' },
      { theme: 'ocean life', noun: 'fish', key: 'fish', word: 'fish' },
      { theme: 'pets', noun: 'frog', key: 'frog', word: 'frog' },
      { theme: 'forest creatures', noun: 'fox', key: 'fox', word: 'fox' },
      { theme: 'kitchen tools', noun: 'fork', key: 'fork', word: 'fork' },
      { theme: 'toys', noun: 'ball', key: 'ball', word: 'ball' },
      { theme: 'insects and bugs', noun: 'bee', key: 'bee', word: 'bee' },
      { theme: 'farm animals', noun: 'cow', key: 'cow', word: 'cow' },
      { theme: 'around the house', noun: 'key', key: 'key', word: 'key' },
      { theme: 'camping', noun: 'moon', key: 'moon', word: 'moon' },
      { theme: 'farm animals', noun: 'pig', key: 'pig', word: 'pig' },
      { theme: 'weather', noun: 'sun', key: 'sun', word: 'sun' },
      { theme: 'vehicles', noun: 'bus', key: 'bus', word: 'bus' },
      ],
    },
    {
      L: 'b', upper: 'B', pair: 'p', avoid: ['p', 'd'],
      // items: pos 0 = initial (base hits); pos > 0 = medial / final (faces 2-4)
      items: [
      { theme: 'toys', noun: 'ball', key: 'ball', word: 'ball', graphemes: ['b', 'a', 'l', 'l'], pos: 0, split: ['ball'] },
      { theme: 'fruits', noun: 'banana', key: 'banana', word: 'banana', graphemes: ['b', 'a', 'n', 'a', 'n', 'a'], pos: 0, split: ['ban', 'an', 'a'] },
      { theme: 'zoo animals', noun: 'bear', key: 'bear', word: 'bear', graphemes: ['b', 'e', 'a', 'r'], pos: 0, split: ['bear'] },
      { theme: 'furniture', noun: 'bed', key: 'bed', word: 'bed', graphemes: ['b', 'e', 'd'], pos: 0, split: ['bed'] },
      { theme: 'insects and bugs', noun: 'bee', key: 'bee', word: 'bee', graphemes: ['b', 'e', 'e'], pos: 0, split: ['bee'] },
      { theme: 'christmas', noun: 'bell', key: 'bell', word: 'bell', graphemes: ['b', 'e', 'l', 'l'], pos: 0, split: ['bell'] },
      { theme: 'spring', noun: 'bird', key: 'bird', word: 'bird', graphemes: ['b', 'i', 'r', 'd'], pos: 0, split: ['bird'] },
      { theme: 'vehicles', noun: 'boat', key: 'boat', word: 'boat', graphemes: ['b', 'o', 'a', 't'], pos: 0, split: ['boat'] },
      { theme: 'classroom', noun: 'book', key: 'book', word: 'book', graphemes: ['b', 'o', 'o', 'k'], pos: 0, split: ['book'] },
      { theme: 'kitchen tools', noun: 'bowl', key: 'bowl', word: 'bowl', graphemes: ['b', 'o', 'w', 'l'], pos: 0, split: ['bowl'] },
      { theme: 'At the Supermarket', noun: 'bread', key: 'bread', word: 'bread', graphemes: ['b', 'r', 'e', 'a', 'd'], pos: 0, split: ['bread'] },
      { theme: 'vegetables', noun: 'broccoli', key: 'broccoli', word: 'broccoli', graphemes: ['b', 'r', 'o', 'c', 'c', 'o', 'l', 'i'], pos: 0, split: ['broc', 'col', 'i'] },
      { theme: 'vehicles', noun: 'bus', key: 'bus', word: 'bus', graphemes: ['b', 'u', 's'], pos: 0, split: ['bus'] },
      { theme: 'insects and bugs', noun: 'butterfly', key: 'butterfly', word: 'butterfly', graphemes: ['b', 'u', 't', 't', 'e', 'r', 'f', 'l', 'y'], pos: 0, split: ['but', 'ter', 'fly'] },
      { theme: 'toys', noun: 'balloon', key: 'balloon', word: 'balloon', graphemes: ['b', 'a', 'l', 'l', 'o', 'o', 'n'], pos: 0, split: ['bal', 'loon'] },
      { theme: 'beach', noun: 'bucket', key: 'bucket', word: 'bucket', graphemes: ['b', 'u', 'c', 'k', 'e', 't'], pos: 0, split: ['buc', 'ket'] },
      { theme: 'pets', noun: 'rabbit', key: 'rabbit', word: 'rabbit', graphemes: ['r', 'a', 'b', 'b', 'i', 't'], pos: 2, split: ['rab', 'bit'] },
      { theme: 'vegetables', noun: 'cabbage', key: 'cabbage', word: 'cabbage', graphemes: ['c', 'a', 'b', 'b', 'a', 'g', 'e'], pos: 2, split: ['cab', 'bage'] },
      { theme: 'body parts', noun: 'elbow', key: 'elbow', word: 'elbow', graphemes: ['e', 'l', 'b', 'o', 'w'], pos: 2, split: ['el', 'bow'] },
      { theme: 'toys', noun: 'robot', key: 'robot', word: 'robot', graphemes: ['r', 'o', 'b', 'o', 't'], pos: 2, split: ['rob', 'ot'] },
      { theme: 'insects and bugs', noun: 'ladybug', key: 'ladybug', word: 'ladybug', graphemes: ['l', 'a', 'd', 'y', 'b', 'u', 'g'], pos: 4, split: ['lad', 'yb', 'ug'] },
      { theme: 'zoo animals', noun: 'zebra', key: 'zebra', word: 'zebra', graphemes: ['z', 'e', 'b', 'r', 'a'], pos: 2, split: ['zeb', 'ra'] },
      { theme: 'weather', noun: 'umbrella', key: 'umbrella', word: 'umbrella', graphemes: ['u', 'm', 'b', 'r', 'e', 'l', 'l', 'a'], pos: 2, split: ['um', 'brel', 'la'] },
      { theme: 'weather', noun: 'rainbow', key: 'rainbow', word: 'rainbow', graphemes: ['r', 'a', 'i', 'n', 'b', 'o', 'w'], pos: 4, split: ['rain', 'bow'] },
      { theme: 'beach', noun: 'crab', key: 'crab', word: 'crab', graphemes: ['c', 'r', 'a', 'b'], pos: 3, split: ['crab'] },
      { theme: 'furniture', noun: 'crib', key: 'crib', word: 'crib', graphemes: ['c', 'r', 'i', 'b'], pos: 3, split: ['crib'] },
      { theme: 'farm animals', noun: 'lamb', key: 'lamb', word: 'lamb', graphemes: ['l', 'a', 'm', 'b'], pos: 3, split: ['lamb'] },
      { theme: 'body parts', noun: 'thumb', key: 'thumb', word: 'thumb', graphemes: ['t', 'h', 'u', 'm', 'b'], pos: 4, split: ['thumb'] },
      { theme: 'around the house', noun: 'comb', key: 'comb', word: 'comb', graphemes: ['c', 'o', 'm', 'b'], pos: 3, split: ['comb'] },
      ],
      // foils: NFD base free of the letter; >= 4 begin with an `avoid` letter (d2), >= 2 with the `pair` letter (d3)
      foils: [
      { theme: 'farm animals', noun: 'pig', key: 'pig', word: 'pig' },
      { theme: 'classroom', noun: 'pen', key: 'pen', word: 'pen' },
      { theme: 'fruits', noun: 'pear', key: 'pear', word: 'pear' },
      { theme: 'At the Supermarket', noun: 'pizza', key: 'pizza', word: 'pizza' },
      { theme: 'vegetables', noun: 'pumpkin', key: 'pumpkin', word: 'pumpkin' },
      { theme: 'winter', noun: 'penguin', key: 'penguin', word: 'penguin' },
      { theme: 'fruits', noun: 'peach', key: 'peach', word: 'peach' },
      { theme: 'bakery', noun: 'pie', key: 'pie', word: 'pie' },
      { theme: 'pets', noun: 'dog', key: 'dog', word: 'dog' },
      { theme: 'farm animals', noun: 'duck', key: 'duck', word: 'duck' },
      { theme: 'around the house', noun: 'door', key: 'door', word: 'door' },
      { theme: 'toys', noun: 'doll', key: 'doll', word: 'doll' },
      { theme: 'forest creatures', noun: 'deer', key: 'deer', word: 'deer' },
      { theme: 'pets', noun: 'cat', key: 'cat', word: 'cat' },
      { theme: 'weather', noun: 'sun', key: 'sun', word: 'sun' },
      { theme: 'clothing', noun: 'hat', key: 'hat', word: 'hat' },
      { theme: 'around the house', noun: 'key', key: 'key', word: 'key' },
      { theme: 'camping', noun: 'moon', key: 'moon', word: 'moon' },
      { theme: 'ocean life', noun: 'fish', key: 'fish', word: 'fish' },
      ],
    },
    ],
    unitExemplar: 'sh',
    // face 5 units (design §3 F5): every item carries the unit as ONE grapheme (the digraph is never a
    // morpheme-seam s+h / t+h: grasshopper, lighthouse, mishap-class words are excluded by hand); every
    // foil carries the component letters SEPARATELY and no unit substring. en F5 = K readiness, no code.
    units: [
    {
      u: 'sh', upper: 'Sh', band: 'K',
      items: [
      { theme: 'ocean life', noun: 'shark', key: 'shark', word: 'shark', graphemes: ['sh', 'a', 'r', 'k'], pos: 0, split: ['shark'] },
      { theme: 'animals', noun: 'sheep', key: 'sheep', word: 'sheep', graphemes: ['sh', 'e', 'e', 'p'], pos: 0, split: ['sheep'] },
      { theme: 'vehicles', noun: 'ship', key: 'ship', word: 'ship', graphemes: ['sh', 'i', 'p'], pos: 0, split: ['ship'] },
      { theme: 'clothing', noun: 'shirt', key: 'shirt', word: 'shirt', graphemes: ['sh', 'i', 'r', 't'], pos: 0, split: ['shirt'] },
      { theme: 'clothing', noun: 'shoe', key: 'shoe', word: 'shoe', graphemes: ['sh', 'o', 'e'], pos: 0, split: ['shoe'] },
      { theme: 'clothing', noun: 'shorts', key: 'shorts', word: 'shorts', graphemes: ['sh', 'o', 'r', 't', 's'], pos: 0, split: ['shorts'] },
      { theme: 'beach', noun: 'shovel', key: 'shovel', word: 'shovel', graphemes: ['sh', 'o', 'v', 'e', 'l'], pos: 0, split: ['shov', 'el'] },
      { theme: 'furniture', noun: 'shelf', key: 'shelf', word: 'shelf', graphemes: ['sh', 'e', 'l', 'f'], pos: 0, split: ['shelf'] },
      { theme: 'pets', noun: 'fish', key: 'fish', word: 'fish', graphemes: ['f', 'i', 'sh'], pos: 2, split: ['fish'] },
      { theme: 'around the house', noun: 'brush', key: 'brush', word: 'brush', graphemes: ['b', 'r', 'u', 'sh'], pos: 3, split: ['brush'] },
      { theme: 'ocean life', noun: 'shrimp', key: 'shrimp', word: 'shrimp', graphemes: ['sh', 'r', 'i', 'm', 'p'], pos: 0, split: ['shrimp'] },
      { theme: 'ocean life', noun: 'starfish', key: 'starfish', word: 'starfish', graphemes: ['s', 't', 'a', 'r', 'f', 'i', 'sh'], pos: 6, split: ['star', 'fish'] },
      { theme: 'beach', noun: 'jellyfish', key: 'jellyfish', word: 'jellyfish', graphemes: ['j', 'e', 'l', 'l', 'y', 'f', 'i', 'sh'], pos: 7, split: ['jel', 'lyf', 'ish'] },
      { theme: 'vegetables', noun: 'radish', key: 'radish', word: 'radish', graphemes: ['r', 'a', 'd', 'i', 'sh'], pos: 4, split: ['rad', 'ish'] },
      { theme: 'around the house', noun: 'toothbrush', key: 'toothbrush', word: 'toothbrush', graphemes: ['t', 'o', 'o', 't', 'h', 'b', 'r', 'u', 'sh'], pos: 8, split: ['toot', 'hbrush'] },
      { theme: 'desserts and sweets', noun: 'milkshake', key: 'milkshake', word: 'milkshake', graphemes: ['m', 'i', 'l', 'k', 'sh', 'a', 'k', 'e'], pos: 4, split: ['mil', 'kshake'] },
      { theme: 'beach', noun: 'seashell', key: 'seashell', word: 'seashell', graphemes: ['s', 'e', 'a', 'sh', 'e', 'l', 'l'], pos: 3, split: ['seas', 'hell'] },
      ],
      foils: [
      { theme: 'animals', noun: 'horse', key: 'horse', word: 'horse' },
      { theme: 'miscellaneous', noun: 'house', key: 'house', word: 'house' },
      { theme: 'around the house', noun: 'hose', key: 'hose', word: 'hose' },
      { theme: 'pets', noun: 'hamster', key: 'hamster', word: 'hamster' },
      { theme: 'kitchen tools', noun: 'whisk', key: 'whisk', word: 'whisk' },
      { theme: 'miscellaneous', noun: 'ghost', key: 'ghost', word: 'ghost' },
      { theme: 'christmas', noun: 'sleigh', key: 'sleigh', word: 'sleigh' },
      { theme: 'tools', noun: 'handsaw', key: 'handsaw', word: 'handsaw' },
      ],
    },
    {
      u: 'ch', upper: 'Ch', band: 'K',
      items: [
      { theme: 'furniture', noun: 'chair', key: 'chair', word: 'chair', graphemes: ['ch', 'a', 'i', 'r'], pos: 0, split: ['chair'] },
      { theme: 'breakfast', noun: 'cheese', key: 'cheese', word: 'cheese', graphemes: ['ch', 'e', 'e', 's', 'e'], pos: 0, split: ['cheese'] },
      { theme: 'fruits', noun: 'cherry', key: 'cherry', word: 'cherry', graphemes: ['ch', 'e', 'r', 'r', 'y'], pos: 0, split: ['cher', 'ry'] },
      { theme: 'easter', noun: 'chick', key: 'chick', word: 'chick', graphemes: ['ch', 'i', 'c', 'k'], pos: 0, split: ['chick'] },
      { theme: 'farm animals', noun: 'chicken', key: 'chicken', word: 'chicken', graphemes: ['ch', 'i', 'c', 'k', 'e', 'n'], pos: 0, split: ['chic', 'ken'] },
      { theme: 'easter', noun: 'chocolate', key: 'chocolate', word: 'chocolate', graphemes: ['ch', 'o', 'c', 'o', 'l', 'a', 't', 'e'], pos: 0, split: ['choc', 'ol', 'ate'] },
      { theme: 'christmas', noun: 'church', key: 'church', word: 'church', graphemes: ['ch', 'u', 'r', 'ch'], pos: 0, split: ['church'] },
      { theme: 'furniture', noun: 'couch', key: 'couch', word: 'couch', graphemes: ['c', 'o', 'u', 'ch'], pos: 3, split: ['couch'] },
      { theme: 'furniture', noun: 'bench', key: 'bench', word: 'bench', graphemes: ['b', 'e', 'n', 'ch'], pos: 3, split: ['bench'] },
      { theme: 'fruits', noun: 'peach', key: 'peach', word: 'peach', graphemes: ['p', 'e', 'a', 'ch'], pos: 3, split: ['peach'] },
      { theme: 'accessories', noun: 'watch', key: 'watch', word: 'watch', graphemes: ['w', 'a', 't', 'ch'], pos: 3, split: ['watch'] },
      { theme: 'zoo animals', noun: 'cheetah', key: 'cheetah', word: 'cheetah', graphemes: ['ch', 'e', 'e', 't', 'a', 'h'], pos: 0, split: ['cheet', 'ah'] },
      { theme: 'christmas', noun: 'chimney', key: 'chimney', word: 'chimney', graphemes: ['ch', 'i', 'm', 'n', 'e', 'y'], pos: 0, split: ['chim', 'ney'] },
      { theme: 'classroom', noun: 'lunchbox', key: 'lunchbox', word: 'lunchbox', graphemes: ['l', 'u', 'n', 'ch', 'b', 'o', 'x'], pos: 3, split: ['lun', 'chbox'] },
      { theme: 'around the house', noun: 'kitchen', key: 'kitchen', word: 'kitchen', graphemes: ['k', 'i', 't', 'ch', 'e', 'n'], pos: 3, split: ['kit', 'chen'] },
      { theme: 'hospital', noun: 'wheelchair', key: 'wheelchair', word: 'wheelchair', graphemes: ['w', 'h', 'e', 'e', 'l', 'ch', 'a', 'i', 'r'], pos: 5, split: ['wheel', 'chair'] },
      { theme: 'birds', noun: 'ostrich', key: 'ostrich', word: 'ostrich', graphemes: ['o', 's', 't', 'r', 'i', 'ch'], pos: 5, split: ['os', 'trich'] },
      ],
      foils: [
      { theme: 'camping', noun: 'hammock', key: 'hammock', word: 'hammock' },
      { theme: 'vehicles', noun: 'helicopter', key: 'helicopter', word: 'helicopter' },
      { theme: 'flowers', noun: 'hibiscus', key: 'hibiscus', word: 'hibiscus' },
      { theme: 'winter', noun: 'hockey', key: 'hockey', word: 'hockey' },
      { theme: 'zoo animals', noun: 'rhinoceros', key: 'rhinoceros', word: 'rhinoceros' },
      { theme: 'occupations', noun: 'pharmacist', key: 'pharmacist', word: 'pharmacist' },
      ],
    },
    {
      u: 'th', upper: 'Th', band: 'K',
      items: [
      { theme: 'body parts', noun: 'thumb', key: 'thumb', word: 'thumb', graphemes: ['th', 'u', 'm', 'b'], pos: 0, split: ['thumb'] },
      { theme: 'body parts', noun: 'tooth', key: 'tooth', word: 'tooth', graphemes: ['t', 'o', 'o', 'th'], pos: 3, split: ['tooth'] },
      { theme: 'around the house', noun: 'toothbrush', key: 'toothbrush', word: 'toothbrush', graphemes: ['t', 'o', 'o', 'th', 'b', 'r', 'u', 's', 'h'], pos: 3, split: ['toot', 'hbrush'] },
      { theme: 'around the house', noun: 'toothpaste', key: 'toothpaste', word: 'toothpaste', graphemes: ['t', 'o', 'o', 'th', 'p', 'a', 's', 't', 'e'], pos: 3, split: ['toot', 'hpaste'] },
      { theme: 'around the house', noun: 'bathtub', key: 'bathtub', word: 'bathtub', graphemes: ['b', 'a', 'th', 't', 'u', 'b'], pos: 2, split: ['bat', 'htub'] },
      { theme: 'easter', noun: 'feather', key: 'feather', word: 'feather', graphemes: ['f', 'e', 'a', 'th', 'e', 'r'], pos: 3, split: ['feat', 'her'] },
      { theme: 'body parts', noun: 'mouth', key: 'mouth', word: 'mouth', graphemes: ['m', 'o', 'u', 'th'], pos: 3, split: ['mouth'] },
      { theme: 'space', noun: 'earth', key: 'earth', word: 'earth', graphemes: ['e', 'a', 'r', 'th'], pos: 3, split: ['earth'] },
      { theme: 'forest creatures', noun: 'earthworm', key: 'earthworm', word: 'earthworm', graphemes: ['e', 'a', 'r', 'th', 'w', 'o', 'r', 'm'], pos: 3, split: ['ear', 'thworm'] },
      { theme: 'christmas', noun: 'wreath', key: 'wreath', word: 'wreath', graphemes: ['w', 'r', 'e', 'a', 'th'], pos: 4, split: ['wreath'] },
      { theme: 'weather', noun: 'thermometer', key: 'thermometer', word: 'thermometer', graphemes: ['th', 'e', 'r', 'm', 'o', 'm', 'e', 't', 'e', 'r'], pos: 0, split: ['ther', 'mom', 'et', 'er'] },
      { theme: 'zoo animals', noun: 'sloth', key: 'sloth', word: 'sloth', graphemes: ['s', 'l', 'o', 'th'], pos: 3, split: ['sloth'] },
      ],
      foils: [
      { theme: 'clothing', noun: 'hat', key: 'hat', word: 'hat' },
      { theme: 'shapes', noun: 'heart', key: 'heart', word: 'heart' },
      { theme: 'zoo animals', noun: 'elephant', key: 'elephant', word: 'elephant' },
      { theme: 'around the house', noun: 'telephone', key: 'telephone', word: 'telephone' },
      { theme: 'pets', noun: 'hamster', key: 'hamster', word: 'hamster' },
      { theme: 'bakery', noun: 'doughnut', key: 'doughnut', word: 'doughnut' },
      { theme: 'christmas', noun: 'lights', key: 'lights', word: 'lights' },
      { theme: 'occupations', noun: 'firefighter', key: 'firefighter', word: 'firefighter' },
      ],
    },
    ],
    refuse: {},
    strings: {
      'K-317': {
        title: 'Letter of the Week: {U}{L}',
        instruction: 'Trace the big and small letter, circle the four pictures whose name begins with {U}, then write a row of each.',
      },
      // faces (nt20-C Phase 2) — the SAME strings live in the emitted specs' i18n.en (tools/b3var-rows/letter-of-the-week.js);
      // the gate asserts bank === spec so the two copies cannot drift.
      'K-325': {
        title: 'Words with {U}: Hear It Anywhere',
        instruction: 'Trace the letter, then circle the four pictures that have the {U} sound somewhere inside the word, not at the start.',
      },
      'K-326': {
        title: 'Beginning, Middle or End: Where Is the {U}?',
        instruction: 'Say each picture. Colour the box that shows where you hear {U}: at the beginning, in the middle or at the end.',
      },
      'K-327': {
        title: 'Circle the {U} in the Words and Count',
        instruction: 'Find every {U} or {L} in each word and circle it. Then write in the box how many you found.',
      },
      'G1-311': {
        title: 'Sound of the Week: {L}',
        instruction: 'Trace {L}, circle the four pictures that have the {L} sound, then write a row of it.',
      },
      'K-328': {
        title: 'M or N? Hear the Difference',
        instruction: 'Say each picture. Circle the letter it begins with: m or n.',
      },
    },
  },
};
module.exports = { LETTER_OF_THE_WEEK };
