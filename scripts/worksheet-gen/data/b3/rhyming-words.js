/**
 * data/b3/rhyming-words.js — the G1-309 `rhyming-words` bank (family key
 * `rhyming-words`; design docs/worksheet-gen/b3-designs/G1-309-rhyming-words.md
 * §5, where the file is named `rhymes.js` — the brief's `data/b3/<key>.js`
 * rule names it after the family key; `bank('rhyming-words', loc)`).
 *
 * EN block HAND-AUTHORED (2026-09-14, G1-309 base build); the ten non-EN
 * blocks are GENERATED later by tools/apply-b3-locale.js from
 * i18n/.draft-b3-<loc>.json (native panels author rhyme classes BY SOUND in
 * their own citation form — sv/da/no INDEFINITE singular · nl bare noun · fi
 * nominative · es/pt/it/fr bare noun, no article · de keeps the capital).
 * `data/` is gitignored — the reviewer force-adds this module.
 *
 * Shape (design §5):
 *   RHYMES[loc] = {
 *     rule: 'stressedVowelCoda' | 'lastTwoSyllables' (fi),
 *     orthographyTrusted: false | true,          en fr da = false: every member carries sameSpelling explicitly
 *     exemplar: [classId × 6],                   the class set the wave ships with no unit (d2 rows)
 *     classes: [{ id, rime:'-at', sound:'æt' (IPA), cap,
 *                 members: [{ vocabKey, word, pic:{theme, noun}, sameSpelling, productive, picOpened:true }],
 *                 extra: [verse words, never pictured],
 *                 nearMiss: [{ vocabKey, word, pic }] }],   pictured words sharing onset + vowel with a
 *                                                          member and NOT rhyming — d3 foils only; a
 *                                                          nearMiss may be a member of ANOTHER class
 *     couplets: [{ id, lines:[l1, l2], answer:{vocabKey}, rhymeWith, cueFree }],   F3 (Phase 2)
 *     strings: { 'G1-309': {title, instruction} }          faces F1..F5 added in Phase 2
 *   }
 *
 * EN classes are keyed on SOUND (General American), never on spelling:
 *   - `key` sits in -ee, `crane` in -ain, `whale` in -ail, `chair` in -ear,
 *     `bread`/`head` in -ed, `thumb` in -um, `eye` in -ie — all
 *     `sameSpelling:false`; write faces (the base included: the child WRITES
 *     the rhyming word) draw anchor + partner from `sameSpelling:true` only,
 *     so a child never spells `key` by analogy with `bee`;
 *   - `swan` /swɑn/ and `wand` /wɑnd/ are NOT in -an / -and (the G1-306 word
 *     FAMILY has them; a rhyme class by sound does not); `ear` /ɪr/ is not in
 *     -ear (pear/bear/chair /ɛr/); colour and other adjectives (red, pink,
 *     blue, hot, gray, black, brown) never enter a class;
 *   - the 8 pairs of data/literacy/rhyming-pairs.json (K-232) each land in one
 *     class (validator rule 8): at og un ar ee oat ed ag.
 * Every picture was OPENED on the contact sheets
 * out/dev/G1-309-pictures-sheet-{1,2,3}.png + G1-309-pictures-zoom.png
 * (2026-09-14; the rulings, incl. the refused pictures, are in the build
 * record docs/worksheet-gen/b3-designs/_work/G1-309-build.md and the gate's
 * OPENED table). Dropped for their picture, not their sound: knee (a bent
 * leg), hair (a girl's face), rain (a cloud with a face), trail / lake
 * (landscapes), ice (an ice sheet), rice (a carton), quail / stork / dove /
 * cook / ox / lip / blouse / tart / jet / fig / chess / heel / scale
 * (read as another word). `christmas/tree` is the ONLY `tree` picture in the
 * library (a decorated Christmas tree; K-232 ships the same file for bee/tree
 * — the child says "tree" or "Christmas tree", both end in /triː/).
 */
'use strict';

const P = (theme, noun) => ({ theme, noun });
const M = (vocabKey, word, theme, noun, sameSpelling, productive = true) => ({ vocabKey, word, pic: P(theme, noun), sameSpelling, productive, picOpened: true });
const N = (vocabKey, word, theme, noun) => ({ vocabKey, word, pic: P(theme, noun), picOpened: true });

const RHYMING_WORDS = {
  en: {
    rule: 'stressedVowelCoda',
    orthographyTrusted: false,
    exemplar: ['at', 'og', 'un', 'ar', 'ee', 'oat'],
    classes: [
      { id: 'at', rime: '-at', sound: 'æt', cap: 8,
        members: [M('cat', 'cat', 'animals', 'cat', true), M('hat', 'hat', 'accessories', 'hat', true), M('bat', 'bat', 'animals', 'bat', true)],
        extra: ['mat', 'rat', 'sat'],
        nearMiss: [N('cap', 'cap', 'clothing', 'cap'), N('can', 'can', 'At the Supermarket', 'can'), N('ham', 'ham', 'At the Supermarket', 'ham')] },
      { id: 'og', rime: '-og', sound: 'ɔɡ', cap: 8,
        members: [M('dog', 'dog', 'animals', 'dog', true), M('frog', 'frog', 'forest creatures', 'frog', true), M('log', 'log', 'camping', 'log', true)],
        extra: ['hog', 'fog', 'jog'],
        nearMiss: [N('doll', 'doll', 'toys', 'doll'), N('lock', 'lock', 'around the house', 'lock')] },
      { id: 'un', rime: '-un', sound: 'ʌn', cap: 8,
        members: [M('sun', 'sun', 'beach', 'sun', true), M('bun', 'bun', 'bakery', 'bun', true)],
        extra: ['run', 'fun', 'one'],
        nearMiss: [N('bus', 'bus', 'vehicles', 'bus')] },
      { id: 'ar', rime: '-ar', sound: 'ɑr', cap: 8,
        members: [M('star', 'star', 'christmas', 'star', true), M('car', 'car', 'vehicles', 'car', true), M('jar', 'jar', 'kitchen tools', 'jar', true), M('guitar', 'guitar', 'music', 'guitar', true)],
        extra: ['far', 'bar'],
        nearMiss: [N('cart', 'cart', 'At the Supermarket', 'cart')] },
      { id: 'ee', rime: '-ee', sound: 'iː', cap: 8,
        members: [M('bee', 'bee', 'farm animals', 'bee', true), M('tree', 'tree', 'christmas', 'tree', true), M('key', 'key', 'around the house', 'key', false)],
        extra: ['see', 'me', 'three'],
        nearMiss: [N('beach', 'beach', 'summer', 'beach'), N('beetle', 'beetle', 'Things That Fly', 'beetle')] },
      { id: 'oat', rime: '-oat', sound: 'oʊt', cap: 8,
        members: [M('boat', 'boat', 'vehicles', 'boat', true), M('coat', 'coat', 'clothing', 'coat', true), M('goat', 'goat', 'farm animals', 'goat', true)],
        extra: ['note', 'float'],
        nearMiss: [N('bowl', 'bowl', 'kitchen tools', 'bowl'), N('cone', 'cone', 'shapes', 'cone')] },
      { id: 'ed', rime: '-ed', sound: 'ɛd', cap: 8,
        members: [M('bed', 'bed', 'around the house', 'bed', true), M('sled', 'sled', 'winter', 'sled', true), M('bread', 'bread', 'At the Supermarket', 'bread', false), M('head', 'head', 'body parts', 'head', false)],
        extra: ['red', 'fed', 'shed'],
        nearMiss: [N('bell', 'bell', 'christmas', 'bell'), N('belt', 'belt', 'accessories', 'belt')] },
      { id: 'ag', rime: '-ag', sound: 'æɡ', cap: 8,
        members: [M('bag', 'bag', 'At the Supermarket', 'bag', true), M('flag', 'flag', '4th of July', 'flag', true)],
        extra: ['tag', 'rag', 'wag'],
        nearMiss: [N('bat', 'bat', 'animals', 'bat')] },
      { id: 'ock', rime: '-ock', sound: 'ɑk', cap: 8,
        members: [M('sock', 'sock', 'accessories', 'sock', true), M('clock', 'clock', 'around the house', 'clock', true), M('lock', 'lock', 'around the house', 'lock', true), M('rock', 'rock', 'camping', 'rock', true)],
        extra: ['block', 'knock'],
        nearMiss: [N('log', 'log', 'camping', 'log'), N('rocket', 'rocket', 'space', 'rocket')] },
      { id: 'ug', rime: '-ug', sound: 'ʌɡ', cap: 8,
        members: [M('rug', 'rug', 'furniture', 'rug', true), M('slug', 'slug', 'forest creatures', 'slug', true), M('jug', 'jug', 'kitchen tools', 'jug', true), M('mug', 'mug', 'kitchen tools', 'mug', true)],
        extra: ['bug', 'hug', 'tug'],
        nearMiss: [N('muffin', 'muffin', 'bakery', 'muffin')] },
      { id: 'an', rime: '-an', sound: 'æn', cap: 8,
        members: [M('can', 'can', 'At the Supermarket', 'can', true), M('fan', 'fan', 'around the house', 'fan', true), M('pan', 'pan', 'around the house', 'pan', true), M('van', 'van', 'vehicles', 'van', true)],
        extra: ['man', 'ran', 'tan'],
        nearMiss: [N('cap', 'cap', 'clothing', 'cap'), N('pants', 'pants', 'clothing', 'pants')] },
      { id: 'and', rime: '-and', sound: 'ænd', cap: 8,
        members: [M('hand', 'hand', 'body parts', 'hand', true), M('sand', 'sand', 'summer', 'sand', true)],
        extra: ['band', 'land'],
        nearMiss: [N('ham', 'ham', 'At the Supermarket', 'ham'), N('hat', 'hat', 'accessories', 'hat')] },
      { id: 'ain', rime: '-ain', sound: 'eɪn', cap: 8,
        members: [M('train', 'train', 'vehicles', 'train', true), M('brain', 'brain', 'body parts', 'brain', true), M('crane', 'crane', 'vehicles', 'crane', false)],
        extra: ['rain', 'chain', 'plane'],
        nearMiss: [N('crayon', 'crayon', 'classroom', 'crayon')] },
      { id: 'ail', rime: '-ail', sound: 'eɪl', cap: 8,
        members: [M('nail', 'nail', 'tools', 'nail', true), M('snail', 'snail', 'forest creatures', 'snail', true), M('whale', 'whale', 'ocean life', 'whale', false)],
        extra: ['mail', 'tail', 'pail'],
        nearMiss: [N('wave', 'wave', 'beach', 'wave')] },
      { id: 'ear', rime: '-ear', sound: 'ɛr', cap: 8,
        members: [M('pear', 'pear', 'fruits', 'pear', true), M('bear', 'bear', 'camping', 'bear', true), M('chair', 'chair', 'furniture', 'chair', false)],
        extra: ['care', 'wear', 'hair'],
        nearMiss: [N('bell', 'bell', 'christmas', 'bell'), N('pepper', 'pepper', 'At the Supermarket', 'pepper'), N('cherry', 'cherry', 'fruits', 'cherry')] },
      { id: 'ake', rime: '-ake', sound: 'eɪk', cap: 8,
        members: [M('cake', 'cake', 'bakery', 'cake', true), M('rake', 'rake', 'around the house', 'rake', true)],
        extra: ['snake', 'lake', 'bake'],
        nearMiss: [] },
      { id: 'ose', rime: '-ose', sound: 'oʊz', cap: 8,
        members: [M('rose', 'rose', 'flowers', 'rose', true), M('nose', 'nose', 'body parts', 'nose', true), M('hose', 'hose', 'around the house', 'hose', true)],
        extra: ['toes', 'bows'],
        nearMiss: [N('rope', 'rope', 'camping', 'rope'), N('robot', 'robot', 'toys', 'robot')] },
      { id: 'oon', rime: '-oon', sound: 'uːn', cap: 8,
        members: [M('moon', 'moon', 'shapes', 'moon', true), M('spoon', 'spoon', 'kitchen tools', 'spoon', true), M('balloon', 'balloon', 'Things That Fly', 'balloon', true), M('raccoon', 'raccoon', 'forest creatures', 'raccoon', true)],
        extra: ['noon', 'soon'],
        nearMiss: [N('moose', 'moose', 'animals', 'moose')] },
      { id: 'ing', rime: '-ing', sound: 'ɪŋ', cap: 8,
        members: [M('ring', 'ring', 'accessories', 'ring', true), M('swing', 'swing', 'toys', 'swing', true)],
        extra: ['king', 'wing', 'sing'],
        nearMiss: [] },
      { id: 'eep', rime: '-eep', sound: 'iːp', cap: 8,
        members: [M('sheep', 'sheep', 'farm animals', 'sheep', true), M('jeep', 'jeep', 'vehicles', 'jeep', true)],
        extra: ['sleep', 'deep'],
        nearMiss: [N('jeans', 'jeans', 'clothing', 'jeans')] },
      { id: 'amp', rime: '-amp', sound: 'æmp', cap: 8,
        members: [M('lamp', 'lamp', 'furniture', 'lamp', true), M('stamp', 'stamp', 'post office', 'stamp', true)],
        extra: ['camp', 'champ'],
        nearMiss: [] },
      { id: 'en', rime: '-en', sound: 'ɛn', cap: 8,
        members: [M('pen', 'pen', 'classroom', 'pen', true), M('hen', 'hen', 'farm animals', 'hen', true)],
        extra: ['ten', 'men', 'den'],
        nearMiss: [N('pepper', 'pepper', 'At the Supermarket', 'pepper'), N('hedgehog', 'hedgehog', 'forest creatures', 'hedgehog')] },
      { id: 'est', rime: '-est', sound: 'ɛst', cap: 8,
        members: [M('nest', 'nest', 'spring', 'nest', true), M('vest', 'vest', 'clothing', 'vest', true)],
        extra: ['rest', 'best', 'chest'],
        nearMiss: [N('net', 'net', 'beach', 'net')] },
      { id: 'irt', rime: '-irt', sound: 'ɜrt', cap: 8,
        members: [M('shirt', 'shirt', 'clothing', 'shirt', true), M('skirt', 'skirt', 'clothing', 'skirt', true)],
        extra: ['dirt', 'hurt'],
        nearMiss: [] },
      { id: 'ool', rime: '-ool', sound: 'uːl', cap: 8,
        members: [M('stool', 'stool', 'furniture', 'stool', true), M('pool', 'pool', 'summer', 'pool', true)],
        extra: ['school', 'tool', 'cool'],
        nearMiss: [] },
      { id: 'ouse', rime: '-ouse', sound: 'aʊs', cap: 8,
        members: [M('mouse', 'mouse', 'pets', 'mouse', true), M('house', 'house', 'miscellaneous', 'house', true)],
        extra: ['louse'],
        nearMiss: [N('mouth', 'mouth', 'body parts', 'mouth')] },
      { id: 'ap', rime: '-ap', sound: 'æp', cap: 8,
        members: [M('cap', 'cap', 'clothing', 'cap', true), M('map', 'map', 'classroom', 'map', true)],
        extra: ['nap', 'tap', 'lap'],
        nearMiss: [N('cat', 'cat', 'animals', 'cat'), N('mask', 'mask', 'hospital', 'mask')] },
      { id: 'um', rime: '-um', sound: 'ʌm', cap: 8,
        members: [M('plum', 'plum', 'fruits', 'plum', true), M('drum', 'drum', 'music', 'drum', true), M('thumb', 'thumb', 'body parts', 'thumb', false)],
        extra: ['gum', 'hum'],
        nearMiss: [N('plunger', 'plunger', 'tools', 'plunger')] },
      { id: 'uck', rime: '-uck', sound: 'ʌk', cap: 8,
        members: [M('duck', 'duck', 'farm animals', 'duck', true), M('truck', 'truck', 'vehicles', 'truck', true)],
        extra: ['luck', 'stuck'],
        nearMiss: [N('dustpan', 'dustpan', 'around the house', 'dustpan')] },
      { id: 'ie', rime: '-ie', sound: 'aɪ', cap: 8,
        members: [M('pie', 'pie', 'bakery', 'pie', true), M('tie', 'tie', 'clothing', 'tie', true), M('eye', 'eye', 'body parts', 'eye', false)],
        extra: ['sky', 'fly', 'my'],
        nearMiss: [N('tiger', 'tiger', 'animals', 'tiger')] },
      { id: 'each', rime: '-each', sound: 'iːtʃ', cap: 8,
        members: [M('peach', 'peach', 'fruits', 'peach', true), M('beach', 'beach', 'summer', 'beach', true)],
        extra: ['reach', 'teach'],
        nearMiss: [N('peas', 'peas', 'At the Supermarket', 'peas'), N('beetle', 'beetle', 'Things That Fly', 'beetle')] },
      { id: 'art', rime: '-art', sound: 'ɑrt', cap: 8,
        members: [M('cart', 'cart', 'At the Supermarket', 'cart', true), M('heart', 'heart', 'shapes', 'heart', true)],
        extra: ['part', 'start'],
        nearMiss: [N('car', 'car', 'vehicles', 'car')] },
      { id: 'am', rime: '-am', sound: 'æm', cap: 8,
        members: [M('ham', 'ham', 'At the Supermarket', 'ham', true), M('jam', 'jam', 'At the Supermarket', 'jam', true)],
        extra: ['clam', 'ram'],
        nearMiss: [N('hat', 'hat', 'accessories', 'hat'), N('jacket', 'jacket', 'clothing', 'jacket')] },
      { id: 'eg', rime: '-eg', sound: 'ɛɡ', cap: 8,
        members: [M('egg', 'egg', 'easter', 'egg', false), M('leg', 'leg', 'body parts', 'leg', true)],
        extra: ['peg', 'beg'],
        nearMiss: [N('lemon', 'lemon', 'fruits', 'lemon'), N('elf', 'elf', 'christmas', 'elf')] },
      { id: 'ate', rime: '-ate', sound: 'eɪt', cap: 8,
        members: [M('gate', 'gate', 'around the house', 'gate', true), M('plate', 'plate', 'around the house', 'plate', true)],
        extra: ['late', 'date'],
        nearMiss: [] },
    ],
    // F3 (Phase 2) — line 1 ends in the PRINTED rhyme partner (a member or `extra` of the answer's class);
    // line 2 carries the one ___ slot and never the answer. Authored now so the shape is concrete for the panels.
    couplets: [
      { id: 'cat-hat', lines: ['The cat sat down on the mat', 'and put on a big red ___'], answer: { vocabKey: 'hat' }, rhymeWith: 'mat', cueFree: false },
      { id: 'dog-frog', lines: ['A dog ran off to jog', 'and met a little green ___'], answer: { vocabKey: 'frog' }, rhymeWith: 'jog', cueFree: false },
      { id: 'sun-bun', lines: ['We had some fun in the sun', 'and ate a sticky ___'], answer: { vocabKey: 'bun' }, rhymeWith: 'sun', cueFree: false },
      { id: 'star-car', lines: ['Up in the sky I saw a star', 'and down the road I saw a ___'], answer: { vocabKey: 'car' }, rhymeWith: 'star', cueFree: false },
      { id: 'bee-tree', lines: ['A buzzing bee flew up to me', 'and landed on the tall green ___'], answer: { vocabKey: 'tree' }, rhymeWith: 'me', cueFree: false },
      { id: 'boat-goat', lines: ['Out on the lake there is a boat', 'and on the boat there is a ___'], answer: { vocabKey: 'goat' }, rhymeWith: 'boat', cueFree: false },
      { id: 'bed-sled', lines: ['At night I sleep in my warm bed', 'by day I ride my snowy ___'], answer: { vocabKey: 'sled' }, rhymeWith: 'bed', cueFree: false },
      { id: 'bag-flag', lines: ['I put my lunch inside my bag', 'then I wave my little ___'], answer: { vocabKey: 'flag' }, rhymeWith: 'bag', cueFree: false },
      { id: 'moon-spoon', lines: ['The cow jumped over the moon', 'the dish ran off with the ___'], answer: { vocabKey: 'spoon' }, rhymeWith: 'moon', cueFree: false },
      { id: 'sock-clock', lines: ['I lost one stripy sock', 'right under the big round ___'], answer: { vocabKey: 'clock' }, rhymeWith: 'sock', cueFree: false },
    ],
    strings: {
      'G1-309': {
        title: 'Rhyming Words: Rhyme and Write',
        instruction: 'Say the first picture. Circle the picture that rhymes with it, then write its word on the line.',
      },
    },
  },
};
module.exports = { RHYMING_WORDS };
