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
 *   rootFamilies[]  (Phase E, F2 only) more families of the SAME shape and rules as
 *               families[]; kept apart so the base composer (which reads families[]
 *               only) draws byte-identical pages. F2 draws from families + rootFamilies.
 *   picFamilies[] (Phase E, F1 only) PICTURE-ROOT families: { id, stem, root:{ word,
 *               pic:{theme,noun}, picOpened:true }, members:[>= 1 derived, non-compound,
 *               each CONTAINING the root word], lookAlikes:[>= 3], signed }. The root is
 *               never printed (the child names the picture), so its family need not
 *               reach the >= 7-member floor of a printed wall: a picture root in en has
 *               one or two honest derived words (sun: sunny) and the rest are compounds
 *               (sunflower, sunshine: owned by compound-words). F1 floor = >= 1 member,
 *               >= 3 look-alikes that share >= 2 initial letters with the root and do
 *               NOT contain it (so exactly ONE brick per card is built from the picture
 *               word, by construction). Pictures OPENED 2026-09-23 (scratchpad
 *               wp-f1-sheet.png): refused spring/rain (a raining cloud: a child names
 *               "cloud"), At the Supermarket/milk (a bottle), /salt (prints SALT);
 *               dropped At the Supermarket/cheese (cheesy drops the e: a member must
 *               CONTAIN the root); cloud = spring/cloud (a plain pale-blue cloud): weather/cloud is
 *               the nt10-D-refused "pink faced blob" and weather/cloudy's vocab word is
 *               cloudy (the answer itself). 12 picture roots.
 *
 * `data/` is gitignored — the reviewer force-adds this module.
 */
'use strict';

const m = (word, kind, slot, extra) => ({ word, kind, slot, ...(extra || {}) });
/** A picture-root family (F1): the root word is the picture's own vocab word; look-alikes share its first letters only. */
const pf = (id, theme, noun, members, looks) => ({
  id, stem: id, rootIsFreeWord: true, root: { word: id, pic: { theme, noun }, picOpened: true }, signed: true, members,
  lookAlikes: looks.map((w) => ({ word: w, whyNotFamily: 'starts like "' + id + '" but is not built from it' })),
});

const WORD_PARTS = {
  en: {
    familyHead: 'Prefixes, Suffixes and Root Words',
    families: [
      {
        id: 'help', stem: 'help', rootIsFreeWord: true, root: { word: 'help' }, signed: true,
        members: [
          m('helper', 'derived', 'noun-person'), m('helpful', 'derived', 'adjective'), m('helpfully', 'derived', 'adverb'),
          m('helpless', 'derived', 'adjective'), m('helplessly', 'derived', 'adverb'),
          m('helpfulness', 'derived', 'noun-thing'),   // kept: rule 4 needs 7 members and help has no other grade-2 derived form (no un-); the F5 sentence that printed it is gone
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
          m('daycare', 'compound', 'noun-thing'),
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
        lookAlikes: [{ word: 'usual', whyNotFamily: 'what happens most days; not built from "use"' }],
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
    // F2 only (root-word): three more families, same rules as families[] (the base never reads them).
    rootFamilies: [
      {
        id: 'cheer', stem: 'cheer', rootIsFreeWord: true, root: { word: 'cheer' }, signed: true,
        members: [
          m('cheerful', 'derived', 'adjective'), m('cheerfully', 'derived', 'adverb'), m('cheerfulness', 'derived', 'noun-thing'),
          m('cheerless', 'derived', 'adjective'), m('cheery', 'derived', 'adjective'), m('cheerily', 'derived', 'adverb'),
          m('cheerleader', 'compound', 'noun-person'),
        ],
        lookAlikes: [{ word: 'cherry', whyNotFamily: 'a small red fruit' }, { word: 'cheese', whyNotFamily: 'a food made from milk' },
          { word: 'check', whyNotFamily: 'to look again; only "che" matches' }],
      },
      {
        id: 'power', stem: 'power', rootIsFreeWord: true, root: { word: 'power' }, signed: true,
        members: [
          m('powerful', 'derived', 'adjective'), m('powerfully', 'derived', 'adverb'), m('powerfulness', 'derived', 'noun-thing'),
          m('powerless', 'derived', 'adjective'), m('powerlessly', 'derived', 'adverb'), m('empower', 'prefixed', 'verb'),
          m('powerlessness', 'derived', 'noun-thing'),
        ],
        lookAlikes: [{ word: 'powder', whyNotFamily: 'a fine dust, like flour' }, { word: 'pocket', whyNotFamily: 'a pouch in your clothes' },
          { word: 'pour', whyNotFamily: 'to tip water out of a jug' }],
      },
      {
        id: 'rest', stem: 'rest', rootIsFreeWord: true, root: { word: 'rest' }, signed: true,
        members: [
          m('restful', 'derived', 'adjective'), m('restfully', 'derived', 'adverb'), m('restfulness', 'derived', 'noun-thing'),
          m('restless', 'derived', 'adjective'), m('restlessly', 'derived', 'adverb'), m('restlessness', 'derived', 'noun-thing'),
          m('armrest', 'compound', 'noun-thing'),
        ],
        lookAlikes: [{ word: 'red', whyNotFamily: 'a color' }, { word: 'rescue', whyNotFamily: 'to save someone' },
          { word: 'recess', whyNotFamily: 'break time at school' }],
      },
    ],
    // F1 only (picture-family): picture roots, never printed; see the header.
    picFamilies: [
      pf('sun', 'weather', 'sun', [m('sunny', 'derived', 'adjective')], ['summer', 'supper', 'super']),
      pf('cloud', 'spring', 'cloud', [m('cloudy', 'derived', 'adjective')], ['clock', 'clown', 'close']),
      pf('grass', 'spring', 'grass', [m('grassy', 'derived', 'adjective')], ['grape', 'gravy', 'grab']),
      pf('hand', 'body parts', 'hand', [m('handful', 'derived', 'noun-thing'), m('handy', 'derived', 'adjective')], ['hamster', 'hanger', 'happen']),
      pf('tooth', 'body parts', 'tooth', [m('toothless', 'derived', 'adjective'), m('toothy', 'derived', 'adjective')], ['today', 'tomato', 'toad']),
      pf('drum', 'music', 'drum', [m('drummer', 'derived', 'noun-person')], ['dream', 'dress', 'drop']),
      pf('book', 'classroom', 'book', [m('booklet', 'derived', 'noun-thing')], ['boot', 'bone', 'bottle']),
      pf('fish', 'ocean life', 'fish', [m('fishy', 'derived', 'adjective')], ['fist', 'first', 'fit']),
      pf('flower', 'spring', 'flower', [m('flowery', 'derived', 'adjective')], ['flour', 'float', 'flute']),
      pf('rock', 'camping', 'rock', [m('rocky', 'derived', 'adjective')], ['robot', 'rope', 'rose']),
      pf('star', 'christmas', 'star', [m('starry', 'derived', 'adjective')], ['stamp', 'stair', 'stack']),
      pf('leaf', 'spring', 'leaf', [m('leafy', 'derived', 'adjective')], ['learn', 'leap', 'lemon']),
    ],
    // F5 (family-in-sentence): four sentence-ready members per family (one per slot); the face draws two compatible blocks.
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
      use: [
        { word: 'reuse', slot: 'verb', frame: 'We {gap} old jars to hold our crayons.' },
        { word: 'user', slot: 'noun-person', frame: 'Every {gap} of the slide must wait in line.' },
        { word: 'useful', slot: 'adjective', frame: 'A ruler is {gap} for drawing straight lines.' },
        { word: 'usefully', slot: 'adverb', frame: 'Sam spent the rainy day {gap}, tidying his room.' },
      ],
      sleep: [
        { word: 'sleeper', slot: 'noun-person', frame: 'Our baby is a light {gap} and wakes at every sound.' },
        { word: 'sleepy', slot: 'adjective', frame: 'After the long trip, I felt {gap} and yawned.' },
        { word: 'sleepily', slot: 'adverb', frame: 'The cat stretched {gap} in the warm sun.' },
        { word: 'sleepover', slot: 'noun-thing', frame: 'Five friends came to my birthday {gap}.' },
      ],
      joy: [
        { word: 'enjoy', slot: 'verb', frame: 'I {gap} reading books in bed.' },
        { word: 'joyful', slot: 'adjective', frame: 'Everyone felt {gap} when the snow came.' },
        { word: 'joyfully', slot: 'adverb', frame: 'The dog jumped {gap} when we came home.' },
        { word: 'enjoyment', slot: 'noun-thing', frame: 'We read the funny story for pure {gap}.' },
      ],
    },
    prefixKey: {
      // mis- is KEPT (Danish panel 2026-09-23 asked): it means "wrongly / badly" — the action still happens, done wrong —
      // so it does not NEGATE the base the way un- / dis- / non- do (misspell is still spelling). CCSS L.2.4b + the face title name it.
      prefixes: [{ prefix: 're', meaning: 'again' }, { prefix: 'pre', meaning: 'before' }, { prefix: 'mis', meaning: 'wrongly' }],
      // round 1 (2026-09-23): no gloss quotes its key meaning (again / before / wrongly) — the rows were solvable by word-spotting.
      rows: [
        { base: 'read', prefix: 're', word: 'reread', gloss: 'to read a story one more time' },
        { base: 'fill', prefix: 're', word: 'refill', gloss: 'to fill an empty cup back up' },
        { base: 'tell', prefix: 're', word: 'retell', gloss: 'to tell a story you heard in your own words' },
        { base: 'heat', prefix: 'pre', word: 'preheat', gloss: 'to heat the oven so it is hot when the cake goes in' },
        { base: 'view', prefix: 'pre', word: 'preview', gloss: 'to see part of a movie early, ahead of the show' },
        { base: 'pay', prefix: 'pre', word: 'prepay', gloss: 'to pay first and get the thing later' },
        { base: 'spell', prefix: 'mis', word: 'misspell', gloss: 'to spell a word with a mistake in it' },
        { base: 'count', prefix: 'mis', word: 'miscount', gloss: 'to make a mistake when you count the coins' },
        { base: 'place', prefix: 'mis', word: 'misplace', gloss: 'to put your keys down somewhere and then lose them' },
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
    // round 1 (2026-09-23): musician (-ian) dropped — the face is 'the person word (-er)' and every answer obeys agentSuffixes.
    agentSuffixes: ['er'],
    agents: [
      { key: 'baker', base: 'bake', answer: { any: 'baker' } },
      { key: 'teacher', base: 'teach', answer: { any: 'teacher' } },
      { key: 'singer', base: 'sing', answer: { any: 'singer' } },
      { key: 'gardener', base: 'garden', answer: { any: 'gardener' } },
      { key: 'farmer', base: 'farm', answer: { any: 'farmer' } },
      { key: 'photographer', base: 'photograph', answer: { any: 'photographer' } },
      { key: 'athlete', base: 'run', answer: { any: 'runner' } },
      { key: 'ballerina', base: 'dance', answer: { any: 'dancer' } },
    ],
    exemplar: {
      base: ['help', 'fear'],
      F1: ['weather/sun', 'spring/cloud', 'spring/grass', 'body parts/hand', 'body parts/tooth', 'music/drum', 'classroom/book', 'ocean life/fish', 'spring/flower', 'camping/rock', 'christmas/star', 'spring/leaf'],
      F2: ['help', 'play', 'care', 'use', 'joy', 'fear', 'act', 'sleep', 'cheer', 'power', 'rest'],
      F5: ['play', 'act', 'use', 'sleep', 'joy'],
    },
    refuse: { base: false, 'picture-family': false, 'root-word': false, 'prefix-key': false, 'who-does-it': false, 'family-in-sentence': false },
    strings: {
      base: { title: 'Root Words: Sort by the Root', instruction: 'Read each word at the top and write it on a line of the wall that stands on its root word.' },
      'picture-family': { title: 'Root Words with Pictures: Circle the Word', instruction: 'Name each picture, then circle the one word above it that is built from that picture word.' },
      'root-word': { title: 'Find the Root Word', instruction: 'Circle the part the three words share and write that root word in the empty stone.' },
      'prefix-key': { title: 'Prefixes re-, pre- and mis-: Pick by Meaning', instruction: 'Read what each new word means, find its prefix in the key and write it in the empty piece.' },
      'who-does-it': { title: 'Who Does It? The Person Word', instruction: 'Look at each person, read the word beside them and write the person word in the empty brick.' },
      'family-in-sentence': { title: 'Root Words in Sentences', instruction: 'Write each of the four words on the stone into the sentence it fits.' },
    },
  },
};

module.exports = { WORD_PARTS };
