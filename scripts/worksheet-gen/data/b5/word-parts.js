/**
 * data/b5/word-parts.js — the G2-359 `word-parts` bank (nt10-E; design
 * docs/worksheet-gen/b5-designs/G2-359-word-parts.md §4-§5).
 *
 * WORD_PARTS[loc] — the per-locale block, read ONLY through
 * lib/b5-common.js bank('word-parts', loc) (a missing block REFUSES, never an en
 * fallback). The EN block is HAND-AUTHORED here (2026-09-23, the base build); the ten
 * non-EN blocks are GENERATED later by tools/apply-b5-locale.js into
 * data/b5/locales/word-parts.<loc>.json from the native panels' drafts after
 * tools/validate-b5-draft.js, which runs the gate's validateBank(block, loc)
 * (qa/verify-b5-word-parts.js, §5 rules 1-15). The EN is a SOURCE TO AUDIT, not a target.
 *
 * Block shape (§5):
 *   families[]  { id, root:{ word, pic?:{theme,noun}, picOpened? }, stem, rootIsFreeWord,
 *                 members:[{ word, kind:'derived'|'prefixed'|'compound', slot, stemSigned?, sentence? }],
 *                 lookAlikes:[{ word, whyNotFamily }], signed:true }
 *     - every member a whole literal (the code never builds, inflects or re-cases a word);
 *       >= 7 members, <= 1 compound; no inflected form; no member beginning with a
 *       G2-320 negating prefix (en un / dis / in) or the locale's `negating[]`;
 *       none equal to any compound-words bank word (all 11 locales).
 *     - root.pic is an OPENED library picture that stands for the root word
 *       (scared face = fear, laughing face = joy, stage = act); the base prints it on
 *       BOTH stones or on NEITHER. Opened 2026-09-23: contact sheet
 *       scratchpad/G2-359-sheet1.png.
 *   prefixKey   { prefixes:[{prefix, meaning}], rows:[{base, prefix, word, gloss}],
 *                 crossCheck:[{base, prefix, isWord, fitsGloss}] }            (F3)
 *   negating[]  the locale's negating prefixes beyond G2-320's opposites list
 *   agents[]    { key (data/b4/pronouns.js people key), base, answer:{m?,f?,any?}, stemSigned? }  (F4)
 *   exemplar    { base:[famId,famId], F2:[famId…], F5:[famId,famId] }
 *   refuse      { <mode>: bool } — faces this locale will not ship
 *   familyHead  the taxonomy head (§1 table B)
 *   strings     { base, 'picture-family', 'root-word', 'prefix-key', 'who-does-it',
 *                 'family-in-sentence' } each {title, instruction}; base === the spec's i18n.en.
 *
 * F1 (picture-family) is NOT authored here: its picture-root families (sun, cloud, tooth,
 * hand, hair, drum, book, fish, boat, flower, bread) cannot meet the >= 7 members /
 * <= 1 compound rule in en (measured: sun has sunny, sunless and compounds only);
 * recorded as an open item for Phase E in _work/G2-359-build.md.
 *
 * `data/` is gitignored — the reviewer force-adds this module.
 */
'use strict';

const m = (word, kind, slot, extra) => ({ word, kind, slot, ...(extra || {}) });

const WORD_PARTS = {
  en: {
    familyHead: 'Prefixes, Suffixes and Root Words',
    families: [
      {
        id: 'help', stem: 'help', rootIsFreeWord: true, root: { word: 'help' }, signed: true,
        members: [
          m('helper', 'derived', 'noun-person'), m('helpful', 'derived', 'adjective'), m('helpfully', 'derived', 'adverb'),
          m('helpfulness', 'derived', 'noun-thing'), m('helpless', 'derived', 'adjective'), m('helplessly', 'derived', 'adverb'),
          m('helpline', 'compound', 'noun-thing'),
        ],
        lookAlikes: [{ word: 'helmet', whyNotFamily: 'a hat that keeps your head safe; it has nothing to do with helping' },
          { word: 'hello', whyNotFamily: 'a greeting; no help inside it' }, { word: 'hen', whyNotFamily: 'a bird; only the first two letters match' }],
      },
      {
        id: 'play', stem: 'play', rootIsFreeWord: true, root: { word: 'play' }, signed: true,
        members: [
          m('player', 'derived', 'noun-person'), m('playful', 'derived', 'adjective'), m('playfully', 'derived', 'adverb'),
          m('playfulness', 'derived', 'noun-thing'), m('playable', 'derived', 'adjective'), m('replay', 'prefixed', 'verb'),
          m('playtime', 'compound', 'noun-thing'),
        ],
        lookAlikes: [{ word: 'plate', whyNotFamily: 'a dish; not about playing' }, { word: 'plane', whyNotFamily: 'a flying machine' },
          { word: 'plant', whyNotFamily: 'a growing thing; only "pla" matches' }],
      },
      {
        id: 'care', stem: 'care', rootIsFreeWord: true, root: { word: 'care' }, signed: true,
        members: [
          m('careful', 'derived', 'adjective'), m('carefully', 'derived', 'adverb'), m('carefulness', 'derived', 'noun-thing'),
          m('careless', 'derived', 'adjective'), m('carelessly', 'derived', 'adverb'), m('carelessness', 'derived', 'noun-thing'),
          m('caregiver', 'compound', 'noun-person'),
        ],
        lookAlikes: [{ word: 'carrot', whyNotFamily: 'a vegetable' }, { word: 'cart', whyNotFamily: 'a thing with wheels' },
          { word: 'carpet', whyNotFamily: 'a rug on the floor' }],
      },
      {
        id: 'use', stem: 'use', rootIsFreeWord: true, root: { word: 'use' }, signed: true,
        members: [
          m('useful', 'derived', 'adjective'), m('usefully', 'derived', 'adverb'), m('usefulness', 'derived', 'noun-thing'),
          m('useless', 'derived', 'adjective'), m('uselessly', 'derived', 'adverb'), m('user', 'derived', 'noun-person'),
          m('reuse', 'prefixed', 'verb'), m('misuse', 'prefixed', 'verb'),
        ],
        lookAlikes: [{ word: 'usher', whyNotFamily: 'a person who shows you to your seat; not "use"' }],
      },
      {
        id: 'joy', stem: 'joy', rootIsFreeWord: true, root: { word: 'joy', pic: { theme: 'emotions', noun: 'merry' }, picOpened: true }, signed: true,
        members: [
          m('joyful', 'derived', 'adjective'), m('joyfully', 'derived', 'adverb'), m('joyless', 'derived', 'adjective'),
          m('joyous', 'derived', 'adjective'), m('enjoy', 'prefixed', 'verb'), m('enjoyable', 'derived', 'adjective'),
          m('enjoyment', 'derived', 'noun-thing'),
        ],
        lookAlikes: [{ word: 'jog', whyNotFamily: 'to run slowly' }, { word: 'job', whyNotFamily: 'work you do' },
          { word: 'joke', whyNotFamily: 'something funny; only "jo" matches' }],
      },
      {
        id: 'fear', stem: 'fear', rootIsFreeWord: true, root: { word: 'fear', pic: { theme: 'emotions', noun: 'scared' }, picOpened: true }, signed: true,
        members: [
          m('fearful', 'derived', 'adjective'), m('fearfully', 'derived', 'adverb'), m('fearfulness', 'derived', 'noun-thing'),
          m('fearless', 'derived', 'adjective'), m('fearlessly', 'derived', 'adverb'), m('fearlessness', 'derived', 'noun-thing'),
          m('fearsome', 'derived', 'adjective'),
        ],
        lookAlikes: [{ word: 'feather', whyNotFamily: 'what covers a bird' }, { word: 'feast', whyNotFamily: 'a big meal' },
          { word: 'fence', whyNotFamily: 'a wall of wood round a garden' }],
      },
      {
        id: 'act', stem: 'act', rootIsFreeWord: true, root: { word: 'act', pic: { theme: 'activities', noun: 'theater' }, picOpened: true }, signed: true,
        members: [
          m('actor', 'derived', 'noun-person'), m('action', 'derived', 'noun-thing'), m('active', 'derived', 'adjective'),
          m('actively', 'derived', 'adverb'), m('activity', 'derived', 'noun-thing'), m('react', 'prefixed', 'verb'),
          m('reaction', 'derived', 'noun-thing'),
        ],
        lookAlikes: [{ word: 'acorn', whyNotFamily: 'the nut of an oak tree' }, { word: 'ace', whyNotFamily: 'a playing card' }],
      },
      {
        id: 'sleep', stem: 'sleep', rootIsFreeWord: true, root: { word: 'sleep' }, signed: true,
        members: [
          m('sleepy', 'derived', 'adjective'), m('sleepily', 'derived', 'adverb'), m('sleepiness', 'derived', 'noun-thing'),
          m('sleepless', 'derived', 'adjective'), m('sleeper', 'derived', 'noun-person'), m('asleep', 'prefixed', 'adjective'),
          m('sleepover', 'compound', 'noun-thing'),
        ],
        lookAlikes: [{ word: 'sleeve', whyNotFamily: 'the arm of a shirt' }, { word: 'sled', whyNotFamily: 'you ride it on snow' },
          { word: 'sleet', whyNotFamily: 'icy rain' }],
      },
    ],
    // F5 (family-in-sentence): the two exemplar families' four sentence-ready members.
    sentences: {
      play: [
        { word: 'replay', slot: 'verb', frame: 'Can we {gap} the song one more time?' },
        { word: 'player', slot: 'noun-person', frame: 'The best {gap} on our team kicked the ball.' },
        { word: 'playtime', slot: 'noun-thing', frame: 'We run outside at {gap} after lunch.' },
        { word: 'playful', slot: 'adjective', frame: 'Our new puppy is very {gap} and chases its tail.' },
      ],
      act: [
        { word: 'react', slot: 'verb', frame: 'How did the cat {gap} to the loud bang?' },
        { word: 'actor', slot: 'noun-person', frame: 'The {gap} waved to us from the stage.' },
        { word: 'action', slot: 'noun-thing', frame: 'That movie was full of fast {gap} and chases.' },
        { word: 'active', slot: 'adjective', frame: 'Grandpa stays {gap} by walking every day.' },
      ],
    },
    prefixKey: {
      prefixes: [{ prefix: 're', meaning: 'again' }, { prefix: 'pre', meaning: 'before' }, { prefix: 'mis', meaning: 'wrongly' }],
      rows: [
        { base: 'read', prefix: 're', word: 'reread', gloss: 'to read a story again' },
        { base: 'fill', prefix: 're', word: 'refill', gloss: 'to fill a cup again' },
        { base: 'tell', prefix: 're', word: 'retell', gloss: 'to tell a story again' },
        { base: 'heat', prefix: 'pre', word: 'preheat', gloss: 'to heat the oven before you bake' },
        { base: 'view', prefix: 'pre', word: 'preview', gloss: 'to see part of a movie before it comes out' },
        { base: 'pay', prefix: 'pre', word: 'prepay', gloss: 'to pay before you get the thing' },
        { base: 'spell', prefix: 'mis', word: 'misspell', gloss: 'to spell a word wrongly' },
        { base: 'count', prefix: 'mis', word: 'miscount', gloss: 'to count the coins wrongly' },
        { base: 'place', prefix: 'mis', word: 'misplace', gloss: 'to put your keys in the wrong place and lose them' },
        { base: 'behave', prefix: 'mis', word: 'misbehave', gloss: 'to behave badly' },
      ],
      crossCheck: [
        { base: 'read', prefix: 're', isWord: true, fitsGloss: true }, { base: 'read', prefix: 'pre', isWord: false, fitsGloss: false }, { base: 'read', prefix: 'mis', isWord: true, fitsGloss: false },
        { base: 'fill', prefix: 're', isWord: true, fitsGloss: true }, { base: 'fill', prefix: 'pre', isWord: true, fitsGloss: false }, { base: 'fill', prefix: 'mis', isWord: false, fitsGloss: false },
        { base: 'tell', prefix: 're', isWord: true, fitsGloss: true }, { base: 'tell', prefix: 'pre', isWord: false, fitsGloss: false }, { base: 'tell', prefix: 'mis', isWord: false, fitsGloss: false },
        { base: 'heat', prefix: 're', isWord: true, fitsGloss: false }, { base: 'heat', prefix: 'pre', isWord: true, fitsGloss: true }, { base: 'heat', prefix: 'mis', isWord: false, fitsGloss: false },
        { base: 'view', prefix: 're', isWord: true, fitsGloss: false }, { base: 'view', prefix: 'pre', isWord: true, fitsGloss: true }, { base: 'view', prefix: 'mis', isWord: false, fitsGloss: false },
        { base: 'pay', prefix: 're', isWord: true, fitsGloss: false }, { base: 'pay', prefix: 'pre', isWord: true, fitsGloss: true }, { base: 'pay', prefix: 'mis', isWord: false, fitsGloss: false },
        { base: 'spell', prefix: 're', isWord: true, fitsGloss: false }, { base: 'spell', prefix: 'pre', isWord: false, fitsGloss: false }, { base: 'spell', prefix: 'mis', isWord: true, fitsGloss: true },
        { base: 'count', prefix: 're', isWord: true, fitsGloss: false }, { base: 'count', prefix: 'pre', isWord: false, fitsGloss: false }, { base: 'count', prefix: 'mis', isWord: true, fitsGloss: true },
        { base: 'place', prefix: 're', isWord: true, fitsGloss: false }, { base: 'place', prefix: 'pre', isWord: false, fitsGloss: false }, { base: 'place', prefix: 'mis', isWord: true, fitsGloss: true },
        { base: 'behave', prefix: 're', isWord: false, fitsGloss: false }, { base: 'behave', prefix: 'pre', isWord: false, fitsGloss: false }, { base: 'behave', prefix: 'mis', isWord: true, fitsGloss: true },
      ],
    },
    negating: ['non', 'anti'],
    // F4 (who-does-it): portraits from data/b4/pronouns.js; en agents are invariant (`any`).
    agents: [
      { key: 'baker', base: 'bake', answer: { any: 'baker' } },
      { key: 'teacher', base: 'teach', answer: { any: 'teacher' } },
      { key: 'singer', base: 'sing', answer: { any: 'singer' } },
      { key: 'musician', base: 'music', answer: { any: 'musician' } },
      { key: 'gardener', base: 'garden', answer: { any: 'gardener' } },
      { key: 'farmer', base: 'farm', answer: { any: 'farmer' } },
      { key: 'photographer', base: 'photograph', answer: { any: 'photographer' } },
      { key: 'athlete', base: 'run', answer: { any: 'runner' } },
      { key: 'ballerina', base: 'dance', answer: { any: 'dancer' } },
      { key: 'cashier', base: 'cash', answer: { any: 'cashier' } },
    ],
    exemplar: { base: ['help', 'fear'], F2: ['help', 'play', 'care', 'use', 'joy', 'fear', 'act', 'sleep'], F5: ['play', 'act'] },
    refuse: { base: false, 'picture-family': false, 'root-word': false, 'prefix-key': false, 'who-does-it': false, 'family-in-sentence': false },
    strings: {
      base: { title: 'Root Words: Sort by the Root', instruction: 'Read each word at the top and write it on a line of the wall that stands on its root word.' },
      'picture-family': { title: 'Root Words with Pictures', instruction: 'Name each picture, then circle the one word above it that is built from that picture word.' },
      'root-word': { title: 'Find the Root Word', instruction: 'Circle the part the three words share and write that root word in the empty stone.' },
      'prefix-key': { title: 'Prefixes re-, pre-, mis-', instruction: 'Read what each new word means, find its prefix in the key and write it in the empty piece.' },
      'who-does-it': { title: 'Suffix -er: Who Does It?', instruction: 'Look at each person at work and write the person word in the empty brick.' },
      'family-in-sentence': { title: 'Root Words in Sentences', instruction: 'Write each of the four words on the stone into the sentence it fits.' },
    },
  },
};

module.exports = { WORD_PARTS };
