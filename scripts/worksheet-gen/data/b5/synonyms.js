/**
 * data/b5/synonyms.js — the G2-358 `synonyms` bank (nt10-E; design
 * docs/worksheet-gen/b5-designs/G2-358-synonyms.md §4-§5).
 *
 * SYNONYMS[loc] — the per-locale block, read ONLY through
 * lib/b5-common.js bank('synonyms', loc) (a missing block REFUSES, never an
 * en fallback; the module's FIRST export is the locale map). The EN block is
 * HAND-AUTHORED here (2026-09-23, the base build); the ten non-EN blocks are
 * GENERATED later by tools/apply-b5-locale.js into
 * data/b5/locales/synonyms.<loc>.json from the native panels' drafts after
 * tools/validate-b5-draft.js, which runs validateBank(block, loc)
 * (qa/verify-b5-synonyms.js, §5 rules 1-15; re-exported lazily below).
 *
 * Block shape (§5):
 *   head      the type name (the rail name)
 *   allowed   non-letter characters a word may carry (en: space, hyphen, apostrophe)
 *   ban       polysemous / regional / vague words: never printed anywhere (rule 1)
 *   regional  [[a, b]] regional doublets: `near` or `ban`, never one group (rule 5)
 *   groups    [{ id, concept, pos:'adj'|'verb', domain, tier:1|2, words:[>= 2] }]
 *             every member substitutable for every other in a child's sentence
 *             (the panel signs each group); a word sits in ONE group only
 *   near      [{ a, b, why }] words a child could read as the same although they
 *             are not (a shade, another dimension, a second sense): never on one
 *             card with the target or the answer. The composer applies them at
 *             GROUP level (a group any of whose words is near the target's group
 *             never supplies that card's distractors).
 *   falseOf   F1: per pictured concept, words of OTHER pictured concepts' groups
 *   scales    F3: [{ id, pos, words:[weakest, middle, strongest] }]
 *   fields    F4 `say` { head, form, words[6-7], sentences[{ id, text, fit }] } ·
 *             F5 `go` / `look` { head, words[>= 8] }
 *   quotes    the locale's quote pair (F4 / F5 heads)
 *   strings   { base, pictures, pairs, shades, say, fields }: { title, instruction },
 *             keyed by MODE until tools/alloc-b5var-ids.js allocates the face ids;
 *             base === the spec's i18n.en (the gate asserts one source).
 *   The en block is a SOURCE TO AUDIT (§4): every panel returns an enAudit list.
 *
 * Locale-neutral tables:
 *   CONCEPTS   the list the seed walks (so one seed draws the same MEANINGS in every
 *              locale that signed them); `opp` = the concepts whose words are the
 *              antonyms of this one (the opposites bank only knows ITS 20 pairs, so a
 *              `gloomy` foil on a `happy` card would pass it: the concept link bans it)
 *   PICTURES   F1 pictured concepts, each OPENED by the design editor (picOpened)
 *   EXCLUSIVE  pictured concepts that never share an F1 page
 *   FACES      mode -> id (docs/worksheet-gen/b5-designs/_records/b5var-id-allocation.json)
 *
 * EN authoring notes (2026-09-23):
 *   - `unhappy` / `untidy` / `unkind` are G2-320 prefix items: never a group word.
 *   - `hard` (soft / difficult), `tear` (rip / cry), `odd` (strange / odd number),
 *     `spot`, `nice` are banned beside the design's list (a word of two meanings).
 *   - `huge`, `tiny`, `boiling` … are SHADES of a group word (big -> huge): they live
 *     in `scales` and `near`, never in a group (rule 6: a group is one strength).
 *   - no group word is a field word (the F5 pile and the base never share a literal).
 *   - 2026-09-23 review: quiet / silent differ in DEGREE (silent = no sound at all) -> quiet / hushed;
 *     sloppy means CARELESS, not messy -> messy / cluttered. Neither old word is printed anywhere.
 *
 * `data/` is gitignored — the reviewer force-adds this module.
 */
'use strict';

const SYNONYMS = {
  en: {
    head: 'Synonyms',
    allowed: [' ', '-', "'"],
    ban: ['light', 'right', 'kind', 'mean', 'fine', 'bright', 'cool', 'skip', 'cried', 'hard', 'tear', 'odd', 'spot', 'nice'],
    regional: [],
    groups: [
      // adjectives ------------------------------------------------------------ 25
      { id: 'g.happy', concept: 'happy', pos: 'adj', domain: 'feelings', tier: 1, words: ['happy', 'glad', 'cheerful'] },
      { id: 'g.sad', concept: 'sad', pos: 'adj', domain: 'feelings', tier: 1, words: ['sad', 'gloomy'] },
      { id: 'g.angry', concept: 'angry', pos: 'adj', domain: 'feelings', tier: 1, words: ['angry', 'grumpy'] },
      { id: 'g.scared', concept: 'scared', pos: 'adj', domain: 'feelings', tier: 1, words: ['scared', 'afraid', 'frightened'] },
      { id: 'g.surprised', concept: 'surprised', pos: 'adj', domain: 'feelings', tier: 2, words: ['surprised', 'amazed', 'astonished'] },
      { id: 'g.calm', concept: 'calm', pos: 'adj', domain: 'feelings', tier: 2, words: ['calm', 'peaceful'] },
      { id: 'g.tired', concept: 'tired', pos: 'adj', domain: 'body', tier: 1, words: ['tired', 'sleepy'] },
      { id: 'g.sick', concept: 'sick', pos: 'adj', domain: 'body', tier: 1, words: ['sick', 'ill'] },
      { id: 'g.strong', concept: 'strong', pos: 'adj', domain: 'body', tier: 2, words: ['strong', 'powerful'] },
      { id: 'g.big', concept: 'big', pos: 'adj', domain: 'size-speed', tier: 1, words: ['big', 'large'] },
      { id: 'g.small', concept: 'small', pos: 'adj', domain: 'size-speed', tier: 1, words: ['small', 'little'] },
      { id: 'g.fast', concept: 'fast', pos: 'adj', domain: 'size-speed', tier: 1, words: ['fast', 'quick', 'speedy'] },
      { id: 'g.easy', concept: 'easy', pos: 'adj', domain: 'thinking', tier: 1, words: ['easy', 'simple'] },
      { id: 'g.difficult', concept: 'difficult', pos: 'adj', domain: 'thinking', tier: 2, words: ['difficult', 'tricky'] },
      { id: 'g.smart', concept: 'smart', pos: 'adj', domain: 'thinking', tier: 2, words: ['smart', 'clever'] },
      { id: 'g.brave', concept: 'brave', pos: 'adj', domain: 'character', tier: 2, words: ['brave', 'fearless'] },
      { id: 'g.funny', concept: 'funny', pos: 'adj', domain: 'character', tier: 2, words: ['funny', 'amusing'] },
      { id: 'g.strange', concept: 'strange', pos: 'adj', domain: 'character', tier: 2, words: ['strange', 'weird'] },
      { id: 'g.loud', concept: 'loud', pos: 'adj', domain: 'senses', tier: 1, words: ['loud', 'noisy'] },
      { id: 'g.quiet', concept: 'quiet', pos: 'adj', domain: 'senses', tier: 2, words: ['quiet', 'hushed'] },
      { id: 'g.tasty', concept: 'tasty', pos: 'adj', domain: 'senses', tier: 1, words: ['tasty', 'yummy', 'delicious'] },
      { id: 'g.cozy', concept: 'cozy', pos: 'adj', domain: 'senses', tier: 2, words: ['cozy', 'snug'] },
      { id: 'g.pretty', concept: 'pretty', pos: 'adj', domain: 'looks', tier: 1, words: ['pretty', 'beautiful', 'lovely'] },
      { id: 'g.tidy', concept: 'tidy', pos: 'adj', domain: 'looks', tier: 2, words: ['tidy', 'neat'] },
      { id: 'g.messy', concept: 'messy', pos: 'adj', domain: 'looks', tier: 2, words: ['messy', 'cluttered'] },
      { id: 'g.dirty', concept: 'dirty', pos: 'adj', domain: 'looks', tier: 2, words: ['dirty', 'grubby'] },
      // verbs ------------------------------------------------------------------ 13 (2026-09-23: throw dropped — toss is off-register, no clean partner; smile dropped — grin is a bigger smile, a shade not a synonym)
      { id: 'g.begin', concept: 'begin', pos: 'verb', domain: 'begin-end', tier: 1, words: ['begin', 'start'] },
      { id: 'g.end', concept: 'end', pos: 'verb', domain: 'begin-end', tier: 1, words: ['end', 'finish'] },
      { id: 'g.shut', concept: 'shut', pos: 'verb', domain: 'hands', tier: 1, words: ['shut', 'close'] },
      { id: 'g.fix', concept: 'fix', pos: 'verb', domain: 'hands', tier: 1, words: ['fix', 'repair'] },
      { id: 'g.choose', concept: 'choose', pos: 'verb', domain: 'hands', tier: 2, words: ['choose', 'pick', 'select'] },
      { id: 'g.collect', concept: 'collect', pos: 'verb', domain: 'hands', tier: 2, words: ['collect', 'gather'] },
      { id: 'g.help', concept: 'help', pos: 'verb', domain: 'hands', tier: 2, words: ['help', 'assist'] },
      { id: 'g.jump', concept: 'jump', pos: 'verb', domain: 'move', tier: 1, words: ['jump', 'leap'] },
      { id: 'g.fall', concept: 'fall', pos: 'verb', domain: 'move', tier: 2, words: ['fall', 'tumble'] },
      { id: 'g.stay', concept: 'stay', pos: 'verb', domain: 'move', tier: 2, words: ['stay', 'remain'] },
      { id: 'g.talk', concept: 'talk', pos: 'verb', domain: 'speak', tier: 1, words: ['talk', 'speak', 'chat'] },
      { id: 'g.shout', concept: 'shout', pos: 'verb', domain: 'speak', tier: 1, words: ['shout', 'yell'] },
      { id: 'g.cry', concept: 'cry', pos: 'verb', domain: 'face', tier: 2, words: ['cry', 'weep'] },
    ],
    near: [
      { a: 'big', b: 'huge', why: 'shade: huge is much more than big' },
      { a: 'hot', b: 'warm', why: 'shade' },
      { a: 'cold', b: 'chilly', why: 'shade' },
      { a: 'wet', b: 'damp', why: 'shade' },
      { a: 'angry', b: 'annoyed', why: 'shade' },
      { a: 'scared', b: 'nervous', why: 'shade' },
      { a: 'sad', b: 'miserable', why: 'shade' },
      { a: 'quiet', b: 'calm', why: 'quiet is no sound; calm is a feeling' },
      { a: 'messy', b: 'dirty', why: 'messy is not tidy; dirty is not clean' },      { a: 'strong', b: 'brave', why: 'strength of body vs courage' },
      { a: 'close', b: 'end', why: 'close can mean end (close a meeting)' },
      { a: 'pick', b: 'collect', why: 'pick flowers = gather them' },
      { a: 'good', b: 'great', why: 'shade' },
      { a: 'like', b: 'love', why: 'shade' },
      { a: 'cozy', b: 'calm', why: 'a cozy room can feel calm; not the same word' },
      { a: 'talk', b: 'shout', why: 'shouting is loud talking' },
    ],
    // F1 (Phase E, 2026-09-23): per pictured concept, every word of the OTHER pictured concepts that is
    // plainly FALSE of this picture (the closed world needs a home for every answer word). Removed as
    // plausible, never a foil: sad face: tired/scared words · scared face: angry · surprised face: scared ·
    // tired face: sad · race car: size words (size is relative) · elephant calf: happy + tired (it sits and
    // smiles) · ant: fast (ants scurry), happy, angry (a cartoon ant).
    falseOf: {
      happy: ['sad', 'gloomy', 'angry', 'grumpy', 'scared', 'afraid', 'frightened', 'surprised', 'amazed', 'astonished', 'tired', 'sleepy', 'fast', 'quick', 'speedy', 'big', 'large', 'small', 'little'],
      sad: ['happy', 'glad', 'cheerful', 'angry', 'grumpy', 'surprised', 'amazed', 'astonished', 'fast', 'quick', 'speedy', 'big', 'large', 'small', 'little'],
      angry: ['happy', 'glad', 'cheerful', 'sad', 'gloomy', 'scared', 'afraid', 'frightened', 'surprised', 'amazed', 'astonished', 'tired', 'sleepy', 'fast', 'quick', 'speedy', 'big', 'large', 'small', 'little'],
      scared: ['happy', 'glad', 'cheerful', 'sad', 'gloomy', 'tired', 'sleepy', 'fast', 'quick', 'speedy', 'big', 'large', 'small', 'little'],
      surprised: ['happy', 'glad', 'cheerful', 'sad', 'gloomy', 'angry', 'grumpy', 'tired', 'sleepy', 'fast', 'quick', 'speedy', 'big', 'large', 'small', 'little'],
      tired: ['happy', 'glad', 'cheerful', 'angry', 'grumpy', 'scared', 'afraid', 'frightened', 'surprised', 'amazed', 'astonished', 'fast', 'quick', 'speedy', 'big', 'large', 'small', 'little'],
      fast: ['happy', 'glad', 'cheerful', 'sad', 'gloomy', 'angry', 'grumpy', 'scared', 'afraid', 'frightened', 'surprised', 'amazed', 'astonished', 'tired', 'sleepy'],
      big: ['sad', 'gloomy', 'angry', 'grumpy', 'scared', 'afraid', 'frightened', 'surprised', 'amazed', 'astonished', 'fast', 'quick', 'speedy', 'small', 'little'],
      small: ['sad', 'gloomy', 'scared', 'afraid', 'frightened', 'surprised', 'amazed', 'astonished', 'tired', 'sleepy', 'big', 'large'],
    },
    // nearOnly: words that live ONLY in `near` (kept off every card beside their partner) since their F3
    // scales were dropped; rule 4 accepts them as bank words. (Kept so the base page stays byte-identical.)
    nearOnly: ['huge', 'nervous', 'miserable'],
    // F3 bar (lead ruling, Phase E 2026-09-23): every scale has ONE order a teacher could not dispute.
    // Dropped as arguable: sad / miserable / heartbroken (miserable vs heartbroken), nervous / scared /
    // terrified (nervous is another feeling, not a weaker fear), big / huge / gigantic (huge vs gigantic).
    scales: [
      { id: 's.heat', pos: 'adj', words: ['warm', 'hot', 'boiling'] },
      { id: 's.cold', pos: 'adj', words: ['chilly', 'cold', 'freezing'] },
      { id: 's.wet', pos: 'adj', words: ['damp', 'wet', 'soaked'] },
      { id: 's.angry', pos: 'adj', words: ['annoyed', 'angry', 'furious'] },
      { id: 's.good', pos: 'adj', words: ['good', 'great', 'fantastic'] },
      { id: 's.eat', pos: 'verb', words: ['nibble', 'eat', 'gobble'] },
      { id: 's.drink', pos: 'verb', words: ['sip', 'drink', 'gulp'] },
      { id: 's.like', pos: 'verb', words: ['like', 'love', 'adore'] },
      { id: 's.voice', pos: 'verb', words: ['whisper', 'talk', 'shout'] },
      { id: 's.knock', pos: 'verb', words: ['tap', 'knock', 'bang'] },
    ],
    fields: {
      say: {
        head: 'said',
        form: 'past',
        // plainVerbOK (round 1, 2026-09-23): the panel asserts the struck head ("said") could stand in the gap
        // unchanged in meaning — the face's instruction says "instead of said", so every frame is direct speech.
        words: ['whispered', 'shouted', 'asked', 'answered', 'explained', 'promised'],
        sentences: [
          { id: 'f1', text: '“Shh, the baby is sleeping,” {name} {gap} very softly.', plainVerbOK: true, fit: { whispered: true, shouted: false, asked: false, answered: false, explained: false, promised: false } },
          { id: 'f2', text: '“I have a secret for you,” {name} {gap} into Grandma’s ear.', plainVerbOK: true, fit: { whispered: true, shouted: false, asked: false, answered: false, explained: false, promised: false } },
          { id: 'f3', text: 'The bus was leaving, so {name} {gap}, “Wait for me!”', plainVerbOK: true, fit: { whispered: false, shouted: true, asked: false, answered: false, explained: false, promised: false } },
          { id: 'f4', text: '“Come and play!” {name} {gap} across the big field.', plainVerbOK: true, fit: { whispered: false, shouted: true, asked: false, answered: false, explained: false, promised: false } },
          { id: 'f5', text: '“Where is my red hat?” {name} {gap}.', plainVerbOK: true, fit: { whispered: false, shouted: false, asked: true, answered: false, explained: false, promised: false } },
          { id: 'f6', text: '“Seven and three make ten,” {name} {gap} with a big smile.', plainVerbOK: true, fit: { whispered: false, shouted: false, asked: false, answered: true, explained: false, promised: false } },
          { id: 'f7', text: '“First dig a hole, then drop in the seed,” {name} {gap}.', plainVerbOK: true, fit: { whispered: false, shouted: false, asked: false, answered: false, explained: true, promised: false } },
          { id: 'f8', text: '“I will feed the fish every day,” {name} {gap}.', plainVerbOK: true, fit: { whispered: false, shouted: false, asked: false, answered: false, explained: false, promised: true } },
        ],
      },
      go: { head: 'go', words: ['walk', 'march', 'crawl', 'hurry', 'stroll', 'wander', 'creep', 'dash'] },
      look: { head: 'look', words: ['peek', 'stare', 'glance', 'watch', 'peer', 'gaze', 'observe', 'squint'] },
    },
    quotes: ['“', '”'],
    strings: {
      base: { title: 'Synonyms: Circle the Word That Means the Same', instruction: 'Read the big word on each card and circle the word under it that means the same.' },
      pictures: { title: 'Synonyms with Pictures: Two Words, One Picture', instruction: 'Look at each picture and circle the two words under it that mean the same and tell about the picture.' },
      pairs: { title: 'Synonym Pairs: Match the Words That Mean the Same', instruction: 'Draw a line to link each word on the left with the word on the right that means the same.' },
      shades: { title: 'Shades of Meaning: From a Little to a Lot', instruction: 'Read the three words in each row and write 1, 2 and 3 in the boxes, from the weakest word to the strongest.' },
      say: { title: 'Synonyms for Said: Pick the Word That Fits', instruction: 'Read each sentence and write the word from the bubble that fits best in the box instead of said.' },
      fields: { title: 'Word Fields: Words for Go and Look', instruction: 'Write each word in the field it belongs to.' },
    },
  },
};

/** Locale-neutral; the seed walks THIS list (same meanings in every locale that signed them). */
const CONCEPTS = [
  { id: 'happy', pos: 'adj', domain: 'feelings', opp: ['sad'] },
  { id: 'sad', pos: 'adj', domain: 'feelings', opp: ['happy'] },
  { id: 'angry', pos: 'adj', domain: 'feelings', opp: ['calm'] },
  { id: 'scared', pos: 'adj', domain: 'feelings', opp: ['brave', 'calm'] },
  { id: 'surprised', pos: 'adj', domain: 'feelings', opp: [] },
  { id: 'calm', pos: 'adj', domain: 'feelings', opp: ['angry', 'scared'] },
  { id: 'tired', pos: 'adj', domain: 'body', opp: [] },
  { id: 'sick', pos: 'adj', domain: 'body', opp: [] },
  { id: 'strong', pos: 'adj', domain: 'body', opp: [] },
  { id: 'big', pos: 'adj', domain: 'size-speed', opp: ['small'] },
  { id: 'small', pos: 'adj', domain: 'size-speed', opp: ['big'] },
  { id: 'fast', pos: 'adj', domain: 'size-speed', opp: [] },
  { id: 'easy', pos: 'adj', domain: 'thinking', opp: ['difficult'] },
  { id: 'difficult', pos: 'adj', domain: 'thinking', opp: ['easy'] },
  { id: 'smart', pos: 'adj', domain: 'thinking', opp: [] },
  { id: 'brave', pos: 'adj', domain: 'character', opp: ['scared'] },
  { id: 'funny', pos: 'adj', domain: 'character', opp: [] },
  { id: 'strange', pos: 'adj', domain: 'character', opp: [] },
  { id: 'loud', pos: 'adj', domain: 'senses', opp: ['quiet'] },
  { id: 'quiet', pos: 'adj', domain: 'senses', opp: ['loud'] },
  { id: 'tasty', pos: 'adj', domain: 'senses', opp: [] },
  { id: 'cozy', pos: 'adj', domain: 'senses', opp: [] },
  { id: 'pretty', pos: 'adj', domain: 'looks', opp: [] },
  { id: 'tidy', pos: 'adj', domain: 'looks', opp: ['messy', 'dirty'] },
  { id: 'messy', pos: 'adj', domain: 'looks', opp: ['tidy'] },
  { id: 'dirty', pos: 'adj', domain: 'looks', opp: ['tidy'] },
  { id: 'begin', pos: 'verb', domain: 'begin-end', opp: ['end'] },
  { id: 'end', pos: 'verb', domain: 'begin-end', opp: ['begin'] },
  { id: 'shut', pos: 'verb', domain: 'hands', opp: [] },
  { id: 'fix', pos: 'verb', domain: 'hands', opp: [] },
  { id: 'choose', pos: 'verb', domain: 'hands', opp: [] },
  { id: 'collect', pos: 'verb', domain: 'hands', opp: [] },
  { id: 'help', pos: 'verb', domain: 'hands', opp: [] },
  { id: 'jump', pos: 'verb', domain: 'move', opp: [] },
  { id: 'throw', pos: 'verb', domain: 'move', opp: [] },
  { id: 'fall', pos: 'verb', domain: 'move', opp: [] },
  { id: 'stay', pos: 'verb', domain: 'move', opp: [] },
  { id: 'talk', pos: 'verb', domain: 'speak', opp: [] },
  { id: 'shout', pos: 'verb', domain: 'speak', opp: [] },
  { id: 'cry', pos: 'verb', domain: 'face', opp: ['smile'] },
  { id: 'smile', pos: 'verb', domain: 'face', opp: ['cry'] },
];

/** F1 pictures, OPENED 2026-09-23 by the design editor + designers A and B (scratchpad/G2-358-crit-pics.png).
 *  box = the MEASURED drawn-content box [x0, y0, x1, y1] as fractions of the 512 px bitmap (alpha > 24 and not
 *  near-white; Phase E 2026-09-23): the F1 card fits the picture by its content, so the wide race car fills the frame. */
const PICTURES = {
  happy: { theme: 'emotions', noun: 'happy', picOpened: true, box: [0.029, 0.025, 0.971, 0.984] },
  sad: { theme: 'emotions', noun: 'sad', picOpened: true, box: [0.02, 0.018, 0.982, 0.986] },
  angry: { theme: 'emotions', noun: 'angry', picOpened: true, box: [0.02, 0.018, 0.98, 0.988] },
  scared: { theme: 'emotions', noun: 'scared', picOpened: true, box: [0.025, 0.031, 0.975, 0.98] },
  surprised: { theme: 'emotions', noun: 'surprised', picOpened: true, box: [0.029, 0.029, 0.975, 0.975] },
  tired: { theme: 'emotions', noun: 'tired', picOpened: true, box: [0.031, 0.02, 0.967, 0.986] },
  fast: { theme: 'vehicles', noun: 'race_car', picOpened: true, box: [0.027, 0.318, 0.977, 0.703] },
  big: { theme: 'ocean life', noun: 'whale', picOpened: true, box: [0.022, 0.270, 0.981, 0.783], alt: { theme: 'zoo animals', noun: 'elephant', picOpened: true } }, // whale first: the elephant is drawn as a sitting calf and read as SMALL by four landing panels (de en sv da)
  small: { theme: 'insects and bugs', noun: 'ant', picOpened: true, box: [0.021, 0.094, 0.973, 0.93], alt: { theme: 'pets', noun: 'mouse', picOpened: true } },
};
/** Never on one F1 page (confusable at 72 px). */
const EXCLUSIVE = [['scared', 'surprised']];
/** Pictures the design EXCLUDED (never substitute a similarly named one). */
const PICTURE_EXCLUDED = ['emotions/excited', 'emotions/merry', 'emotions/content', 'emotions/bored', 'emotions/confused', 'emotions/shy', 'zoo animals/giraffe', 'zoo animals/cheetah'];
const FACES = { base: 'G2-358', pictures: 'G1-395', pairs: 'G2-373', shades: 'G1-396', say: 'G2-374', fields: 'G3-397' };
const MODES = ['base', 'pictures', 'pairs', 'shades', 'say', 'fields'];

/** The gate owns the validator (tools/b5-probe-child.js requires qa/verify-b5-synonyms.js); this is a lazy door to it. */
function validateBank(block, loc) { return require('../../qa/verify-b5-synonyms.js').validateBank(block, loc); }

module.exports = { SYNONYMS, CONCEPTS, PICTURES, EXCLUSIVE, PICTURE_EXCLUDED, FACES, MODES, validateBank };
