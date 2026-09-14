/**
 * data/b3/opposites.js — the G1-307 `opposites` bank (family key `opposites`;
 * design docs/worksheet-gen/b3-designs/G1-307-opposites.md §5).
 *
 * EN block HAND-AUTHORED (2026-09-14, G1-307 base build); the ten non-EN
 * blocks are GENERATED later by tools/apply-b3-locale.js from
 * i18n/.draft-b3-<loc>.json (native panels REBUILD the pair set in their own
 * citation form — es/pt/it/fr masculine sg · de lowercase · nl base form ·
 * sv/da/no indefinite common sg · fi nominative sg — and author `syn`, `far`,
 * `frames`, `prefix`, `strings`). `data/` is gitignored — the reviewer
 * force-adds this module.
 *
 * Shape (design §5):
 *   OPPOSITES[loc] = {
 *     nameSlot: true|false,                 {name} allowed in frames (false: es pt it fr)
 *     pairs: [{ id, a, b, tier:1|2, pos:'adj'|'noun', family,
 *               alt:{a:[…], b:[…]},         answer-key note ONLY (accepted alternates PER
 *                                           member: little for small, large for big — the
 *                                           direction is random, so both members are answers;
 *                                           F4's syn.a must never be in alt.b, the P5 class)
 *               exclusiveWith:[ids],        never on one page (a member of one pair is a
 *                                           plausible antonym of a word in the other)
 *               syn:{a}, far,               F4: a G1-legible near-synonym of `a`; one
 *                                           unrelated bank word from ANOTHER family
 *               pic: {kind:'scale', theme, noun, scales:[1.0, 0.42]}
 *                  | {kind:'two', a:{theme,noun}, b:{theme,noun}}
 *                  | null,
 *               picOpened: true }],         every pic was OPENED on the contact sheet
 *     frames:  [{ pair, text, answer, pic }],           F2 (whole literals, stored answer)
 *     prefix:  { prefixes, items:[{base, prefix, expected}], ban },   F5
 *     strings: { 'G1-307': {title, instruction} }      faces F1..F5 added in Phase 2
 *   }
 *   `pic` and `frames[].pic` are LOCALE-NEUTRAL pictures (the word beside a
 *   picture is never a noun, so nothing agrees with it); a panel may swap a
 *   pair's pictures only after opening them.
 *
 * EN data rules applied here (contact sheet out/dev/G1-307-pictures-sheet.png,
 * every picture opened 2026-09-14 — see the build record):
 *   - 20 pairs, a strict BIJECTION (every word in exactly one pair): `short`
 *     pairs with `tall` only (long/short would reuse it); `light` with `heavy`
 *     only, so the light/dark relation is carried by `bright-dark` and the two
 *     pairs are `exclusiveWith` each other (a child asked for the opposite of
 *     "dark" may write "light", which is another card's answer); `high-low`
 *     and `tall-short` likewise; `old-new` only (young/old would reuse `old`);
 *   - 9 pictured pairs = the design's 7 honest pairs + the two reserves
 *     (sweet/sour: candy + lemon, opened: a red wrapped sweet and a lemon);
 *     REFUSED pictures per the design: weather/hot (a smiling sun), weather/
 *     cold (a penguin in a hat), space/sun (black square — blocked in the
 *     index), colors/black + white (paint drops), full/empty via jug;
 *   - `syn.a` on 12 pairs (≥ 8, so F4 is not refused in en): each a word a
 *     first-grader reads, never a synonym of `b` (the P5 class) and never a
 *     member of the same pair; `far` = a member of a pair in another family;
 *   - tier 1 = the 13 pairs with both members ≤ 6 letters and a concrete
 *     picture-or-body sense; tier 2 = the 7 abstract / longer pairs;
 *   - the four word-classes.js adjective pairs (big/small hot/cold fast/slow
 *     loud/quiet) are spelled as that bank spells them (validator rule 8);
 *   - `alt` records the home word the school word displaces (little → small);
 *     never printed.
 */
'use strict';
const OPPOSITES = {
  en: {
    nameSlot: true,
    pairs: [
      { id: 'big-small', a: 'big', b: 'small', tier: 1, pos: 'adj', family: 'size', alt: { a: ['large', 'huge'], b: ['little'] }, exclusiveWith: [], syn: { a: 'large' }, far: 'wet',
        pic: { kind: 'scale', theme: 'animals', noun: 'dog', scales: [1.0, 0.42] }, picOpened: true },
      { id: 'hot-cold', a: 'hot', b: 'cold', tier: 1, pos: 'adj', family: 'temperature', alt: { a: ['warm'], b: ['cool'] }, exclusiveWith: [], syn: { a: 'warm' }, far: 'big',
        pic: { kind: 'two', a: { theme: 'camping', noun: 'campfire' }, b: { theme: 'weather', noun: 'snowflake' } }, picOpened: true },
      { id: 'happy-sad', a: 'happy', b: 'sad', tier: 1, pos: 'adj', family: 'feeling', alt: { a: ['glad'], b: ['unhappy'] }, exclusiveWith: [], syn: { a: 'glad' }, far: 'cold',
        pic: { kind: 'two', a: { theme: 'emotions', noun: 'happy' }, b: { theme: 'emotions', noun: 'sad' } }, picOpened: true },
      { id: 'fast-slow', a: 'fast', b: 'slow', tier: 1, pos: 'adj', family: 'speed', alt: { a: ['quick'], b: [] }, exclusiveWith: [], syn: { a: 'quick' }, far: 'soft',
        pic: { kind: 'two', a: { theme: 'zoo animals', noun: 'cheetah' }, b: { theme: 'forest creatures', noun: 'snail' } }, picOpened: true },
      { id: 'heavy-light', a: 'heavy', b: 'light', tier: 2, pos: 'adj', family: 'weight', alt: { a: [], b: [] }, exclusiveWith: ['bright-dark'], syn: null, far: 'happy',
        pic: { kind: 'two', a: { theme: 'zoo animals', noun: 'elephant' }, b: { theme: 'easter', noun: 'feather' } }, picOpened: true },
      { id: 'day-night', a: 'day', b: 'night', tier: 1, pos: 'noun', family: 'time', alt: { a: ['daytime'], b: ['nighttime'] }, exclusiveWith: [], syn: null, far: 'hard',
        pic: { kind: 'two', a: { theme: 'weather', noun: 'sun' }, b: { theme: 'space', noun: 'moon' } }, picOpened: true },
      { id: 'soft-hard', a: 'soft', b: 'hard', tier: 1, pos: 'adj', family: 'texture', alt: { a: [], b: [] }, exclusiveWith: [], syn: { a: 'fluffy' }, far: 'fast',
        pic: { kind: 'two', a: { theme: 'around the house', noun: 'pillow' }, b: { theme: 'camping', noun: 'rock' } }, picOpened: true },
      { id: 'sweet-sour', a: 'sweet', b: 'sour', tier: 2, pos: 'adj', family: 'taste', alt: { a: ['sugary'], b: [] }, exclusiveWith: [], syn: { a: 'sugary' }, far: 'tall',
        pic: { kind: 'two', a: { theme: 'At the Supermarket', noun: 'candy' }, b: { theme: 'fruits', noun: 'lemon' } }, picOpened: true },
      { id: 'wet-dry', a: 'wet', b: 'dry', tier: 1, pos: 'adj', family: 'moisture', alt: { a: ['damp'], b: [] }, exclusiveWith: [], syn: { a: 'damp' }, far: 'loud', pic: null, picOpened: true },
      { id: 'tall-short', a: 'tall', b: 'short', tier: 1, pos: 'adj', family: 'height', alt: { a: [], b: [] }, exclusiveWith: ['high-low'], syn: null, far: 'sweet', pic: null, picOpened: true },
      { id: 'loud-quiet', a: 'loud', b: 'quiet', tier: 2, pos: 'adj', family: 'sound', alt: { a: ['noisy'], b: ['silent'] }, exclusiveWith: [], syn: { a: 'noisy' }, far: 'new', pic: null, picOpened: true },
      { id: 'old-new', a: 'old', b: 'new', tier: 1, pos: 'adj', family: 'age', alt: { a: [], b: [] }, exclusiveWith: [], syn: null, far: 'clean', pic: null, picOpened: true },
      { id: 'clean-dirty', a: 'clean', b: 'dirty', tier: 1, pos: 'adj', family: 'cleanliness', alt: { a: ['tidy', 'neat'], b: ['messy'] }, exclusiveWith: [], syn: { a: 'neat' }, far: 'open', pic: null, picOpened: true },
      { id: 'full-empty', a: 'full', b: 'empty', tier: 1, pos: 'adj', family: 'fill', alt: { a: [], b: [] }, exclusiveWith: [], syn: null, far: 'dry', pic: null, picOpened: true },
      { id: 'open-closed', a: 'open', b: 'closed', tier: 1, pos: 'adj', family: 'state', alt: { a: [], b: ['shut'] }, exclusiveWith: [], syn: null, far: 'thin', pic: null, picOpened: true },
      { id: 'high-low', a: 'high', b: 'low', tier: 1, pos: 'adj', family: 'level', alt: { a: [], b: [] }, exclusiveWith: ['tall-short'], syn: null, far: 'sour', pic: null, picOpened: true },
      { id: 'thick-thin', a: 'thick', b: 'thin', tier: 2, pos: 'adj', family: 'thickness', alt: { a: ['fat'], b: ['skinny'] }, exclusiveWith: [], syn: null, far: 'full', pic: null, picOpened: true },
      { id: 'strong-weak', a: 'strong', b: 'weak', tier: 2, pos: 'adj', family: 'strength', alt: { a: ['tough'], b: [] }, exclusiveWith: [], syn: { a: 'tough' }, far: 'day', pic: null, picOpened: true },
      { id: 'bright-dark', a: 'bright', b: 'dark', tier: 2, pos: 'adj', family: 'brightness', alt: { a: ['shiny'], b: ['dim'] }, exclusiveWith: ['heavy-light'], syn: { a: 'shiny' }, far: 'slow', pic: null, picOpened: true },
      { id: 'rough-smooth', a: 'rough', b: 'smooth', tier: 2, pos: 'adj', family: 'surface', alt: { a: ['bumpy'], b: [] }, exclusiveWith: [], syn: { a: 'bumpy' }, far: 'night', pic: null, picOpened: true },
    ],
    // F2 — whole literals with a stored answer; `{name}` allowed (nameSlot). The text prints ONE member and the
    // child writes the other; the pictured noun is never printed beside the adjective it is not (pic = the subject).
    frames: [
      { pair: 'big-small', text: 'The elephant is not small. It is ___.', answer: 'big', pic: { theme: 'zoo animals', noun: 'elephant' } },
      { pair: 'hot-cold', text: 'The snowflake is not hot. It is ___.', answer: 'cold', pic: { theme: 'weather', noun: 'snowflake' } },
      { pair: 'fast-slow', text: 'The snail is not fast. It is ___.', answer: 'slow', pic: { theme: 'forest creatures', noun: 'snail' } },
      { pair: 'soft-hard', text: 'The pillow is not hard. It is ___.', answer: 'soft', pic: { theme: 'around the house', noun: 'pillow' } },
      { pair: 'heavy-light', text: 'The feather is not heavy. It is ___.', answer: 'light', pic: { theme: 'easter', noun: 'feather' } },
      { pair: 'happy-sad', text: '{name} is not sad today. {name} is ___.', answer: 'happy', pic: { theme: 'emotions', noun: 'happy' } },
      { pair: 'sweet-sour', text: 'The lemon is not sweet. It is ___.', answer: 'sour', pic: { theme: 'fruits', noun: 'lemon' } },
      { pair: 'day-night', text: 'The moon is out. It is not day. It is ___.', answer: 'night', pic: { theme: 'space', noun: 'moon' } },
    ],
    // F5 — L.1.4.b; `happy` is also a pair member, so the F5 page excludes happy-sad (validator rule 7)
    prefix: {
      prefixes: ['un', 'dis', 'in'],
      items: [
        { base: 'happy', prefix: 'un', expected: 'unhappy' },
        { base: 'kind', prefix: 'un', expected: 'unkind' },
        { base: 'safe', prefix: 'un', expected: 'unsafe' },
        { base: 'fair', prefix: 'un', expected: 'unfair' },
        { base: 'tidy', prefix: 'un', expected: 'untidy' },
        { base: 'lucky', prefix: 'un', expected: 'unlucky' },
        { base: 'honest', prefix: 'dis', expected: 'dishonest' },
        { base: 'obey', prefix: 'dis', expected: 'disobey' },
        { base: 'visible', prefix: 'in', expected: 'invisible' },
      ],
      ban: [],
    },
    strings: {
      'G1-307': {
        title: 'Opposites: Write the Opposite Word',
        instruction: 'Read the word on each card. Find its opposite in the word bank and write it on the line.',
      },
    },
  },
};
module.exports = { OPPOSITES };
