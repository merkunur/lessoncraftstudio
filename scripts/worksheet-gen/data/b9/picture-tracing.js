/**
 * data/b9/picture-tracing.js — the K-418 `picture-tracing` family bank (b9 Picture Tracing; FINAL contract
 * docs/worksheet-gen/b9-designs/K-418-picture-tracing.md §2-§4). Locale-neutral, hand-authored: the twenty MODES with
 * their face id + band, plus the EN locale block — the SOURCE every native panel audits (hand it over as a source to
 * audit, not a target to copy: it is the only review the English ever gets). The other ten locale blocks are GENERATED
 * into data/b9/locales/picture-tracing.<loc>.json by tools/apply-b9-locale.js and read through
 * lib/b9-common.js bank('picture-tracing', loc).
 *
 * Per face, three strings:
 *   title        the deck / catalog title: the face's harvested head + its story (≤ 60: publish appends the locale's
 *                worksheet word, ' Worksheet' / ' ficha' …, and the audit caps the rendered <title> at 70; never "free"; never promises a key
 *                or a screen — the family is PDF only)
 *   printTitle   the heading PRINTED on the page (the story; ≤ 34)
 *   instruction  ≤ 110, one or two short sentences a teacher reads aloud; names only what is drawn on the face
 * Plus `words` (F17 picture-and-word): the locale's four picture names in school-print case (de capital initial, fr
 * capitals), 3-7 letters, no article, for the fixed pictures sun · fish · cat · apple.
 * Scene data is NOT here: data/b9/face-scenes.js.
 */
'use strict';

/** mode → { id, band } — the face contract (FINAL §1, ids from _records/b9var-id-allocation.json) */
const FACES = {
  base:                 { id: 'K-418',  band: 'K' },
  'first-tracing':      { id: 'K-419',  band: 'PreK' },
  'look-then-trace':    { id: 'K-420',  band: 'PreK' },
  'round-and-round':    { id: 'K-421',  band: 'PreK' },
  'straight-lines':     { id: 'K-422',  band: 'K' },
  zigzags:              { id: 'K-423',  band: 'K' },
  curls:                { id: 'K-424',  band: 'K' },
  'trace-and-color':    { id: 'K-425',  band: 'K' },
  'where-to-start':     { id: 'K-426',  band: 'K' },
  'trace-and-count':    { id: 'K-427',  band: 'K' },
  'finish-the-picture': { id: 'K-428',  band: 'K' },
  christmas:            { id: 'K-429',  band: 'K' },
  'shape-picture':      { id: 'K-430',  band: 'K' },
  'summer-sea':         { id: 'K-431',  band: 'K' },
  'big-middle-small':   { id: 'K-432',  band: 'K' },
  'dotted-street':      { id: 'G1-429', band: 'G1' },
  'picture-and-word':   { id: 'G1-430', band: 'G1' },
  'trace-and-draw':     { id: 'G1-431', band: 'G1' },
  'other-half':         { id: 'G1-432', band: 'G1' },
  'hidden-animals':     { id: 'G1-433', band: 'G1' },
};
const MODES = Object.keys(FACES);

const EN_STRINGS = {
  base: { title: 'Picture Tracing: Trace the Garden Path to the Door', printTitle: 'The Path to the Door', instruction: 'Trace every dashed line to finish the garden, from the sun and the cloud down to the path and the rabbit.' },
  'first-tracing': { title: 'Tracing Worksheets for Preschool: My First Big Whale', printTitle: 'My First Tracing', instruction: 'Start at the dot. Trace the big whale slowly, all the way round.' },
  'look-then-trace': { title: 'Trace the Picture: Look at the Animal, Then Trace It', printTitle: 'Look, Then Trace', instruction: 'Look at the picture in the frame. Then trace the same animal next to it.' },
  'round-and-round': { title: 'Tracing for Toddlers and Preschoolers: Round Pictures', printTitle: 'Round and Round', instruction: 'Start at each dot and trace round and round, like the letter o.' },
  'straight-lines': { title: 'Straight-Line Picture Tracing: Down, Across and Slanted', printTitle: 'Down, Across, Slanted', instruction: 'Look at the arrow above each column. Trace one column at a time: down, then across, then slanted.' },
  zigzags: { title: 'Trace the Picture: Zigzag Mountains and a Stormy Camp', printTitle: 'Storm over the Camp', instruction: 'Trace the whole picture. Stop at every tip of the zigzags: the mountains, the trees, the tent and the lightning.' },
  curls: { title: 'Tracing Pictures for Kids: Spirals and Loops', printTitle: 'The Spiral Gallery', instruction: 'Trace the spirals and loops: the snail, the lollipop, the bow, the pretzel and the pinwheel.' },
  'trace-and-color': { title: 'Trace and Color the Picture: A Picnic Under the Tree', printTitle: 'The Picnic', instruction: 'Trace the whole picnic picture. Then color it in any colors you like.' },
  'where-to-start': { title: 'Picture Tracing for Kindergarten: Where Do I Start?', printTitle: 'Where Do I Start?', instruction: 'Start at each dot and follow the arrow. Go down the stairs, one picture at a time.' },
  'trace-and-count': { title: 'Trace and Count: How Many Ducks Are on the Pond?', printTitle: 'Ducks on the Pond', instruction: 'Trace the ducks. Count them. Write how many in the box.' },
  'finish-the-picture': { title: 'Picture Tracing Sheets: Finish the Picture', printTitle: 'The Mending Shelf', instruction: 'Trace the dashed parts to finish each picture: wheels, a spout, a stick, a handle, a point and ears.' },
  christmas: { title: 'Christmas Picture Tracing: Trace Round Every Bauble and Star', printTitle: 'Christmas Eve', instruction: 'Trace the tree, the gifts, the armchair, the window and the rug. Then trace round every bauble and star.' },
  'shape-picture': { title: 'Shape Tracing: A Rocket of Circles, Squares and Triangles', printTitle: 'The Shape Rocket', instruction: 'Trace every shape of the rocket and the sky. Then color every circle.' },
  'summer-sea': { title: 'Summer Picture Tracing: Trace the Waves Across the Sea', printTitle: 'A Postcard from the Sea', instruction: 'Trace the waves from left to right. Then trace the boat and the beach.' },
  'big-middle-small': { title: 'Tracing Pictures for Kids: Big, Middle and Small', printTitle: 'Big, Middle, Small', instruction: 'In every row, trace the big one, then the middle one, then the small one.' },
  'dotted-street': { title: 'Dotted Picture Tracing for 1st Grade: A Morning in Town', printTitle: 'A Morning in Town', instruction: 'Trace the dotted lines carefully, the small details too.' },
  'picture-and-word': { title: 'Trace the Picture, Say Its Name and Trace the Word', printTitle: 'Picture Words', instruction: 'Trace the picture. Say its name. Trace the word under it.' },
  'trace-and-draw': { title: 'Trace the Picture, Then Draw: What Is the Tractor Carrying?', printTitle: 'What Is the Tractor Carrying?', instruction: 'Trace the whole picture: the tractor, the trailer and the animals. Then draw what the tractor is carrying.' },
  'other-half': { title: 'Symmetry Picture Tracing: Trace the Other Half', printTitle: 'The Other Half', instruction: 'Trace the dashed half so both sides of each picture look the same.' },
  'hidden-animals': { title: 'Animal Tracing Pictures: Find the 5 Hidden Animals', printTitle: 'Who Hides in the Forest?', instruction: 'Find the 5 hidden animals in the forest. Trace them.' },
};

const PICTURE_TRACING = {
  en: { strings: EN_STRINGS, words: ['sun', 'fish', 'cat', 'apple'] },
};

/** bank rules for one locale block (the validator every apply / gate runs) */
function validateBank(a, b2) {
  // validateBank(loc) or validateBank(block, loc) (the probe and the family gate pass a block). ⚠ An object passed as a
  // locale name used to fail as "no block" — the gate's bank poisons passed vacuously; anything else is a caller bug.
  if (typeof a !== 'string' && !(a && typeof a === 'object')) throw new Error('validateBank: want (loc) or (block, loc)');
  const loc = typeof a === 'string' ? a : b2;
  const b = typeof a === 'object' ? a : (PICTURE_TRACING[loc] || (() => { try { return require('../../lib/b9-common.js').bank('picture-tracing', loc); } catch (e) { return null; } })());
  const errs = [];
  if (!b) return ['no ' + loc + ' block'];
  for (const m of MODES) {
    const s = b.strings && b.strings[m];
    if (!s) { errs.push(loc + ' ' + m + ': no strings'); continue; }
    for (const k of ['title', 'printTitle', 'instruction']) if (!s[k] || typeof s[k] !== 'string') errs.push(loc + ' ' + m + '.' + k + ' missing');
    if (s.title && [...s.title].length > 70) errs.push(loc + ' ' + m + '.title ' + [...s.title].length + ' > 70');
    if (s.printTitle && [...s.printTitle].length > 40) errs.push(loc + ' ' + m + '.printTitle ' + [...s.printTitle].length + ' > 40');
    if (s.instruction && [...s.instruction].length > 130) errs.push(loc + ' ' + m + '.instruction ' + [...s.instruction].length + ' > 130');
    for (const k of ['title', 'printTitle', 'instruction']) {
      const v = s[k] || '';
      if (/\b(free|gratis|gratuit|kostenlos|gratuito|grátis|gratuiti|ilmainen|gratis)\b/i.test(v)) errs.push(loc + ' ' + m + '.' + k + ' claims free');
      if (/answer key|solution|lösung|corrigé|respuestas|respostas|soluzion|antwoordblad|antwoorden|facit|fasit|vastau/i.test(v)) errs.push(loc + ' ' + m + '.' + k + ' promises a key');
    }
  }
  if (!/\b5\b/.test((b.strings['hidden-animals'] || {}).instruction || '')) errs.push(loc + ' hidden-animals.instruction must state N = 5');
  if (!Array.isArray(b.words) || b.words.length !== 4) errs.push(loc + ' words: want 4');
  else for (const w of b.words) if (!/^[\p{L}]{2,7}$/u.test(w)) errs.push(loc + ' word "' + w + '": 2-7 letters, letters only');
  return errs;
}

if (require.main === module) {
  const errs = validateBank(process.argv[2] || 'en');
  if (errs.length) { errs.forEach((e) => console.error(' - ' + e)); process.exit(1); }
  console.log('ok ' + (process.argv[2] || 'en') + ': ' + MODES.length + ' faces');
}
module.exports = { PICTURE_TRACING, FACES, MODES, EN_STRINGS, validateBank };
