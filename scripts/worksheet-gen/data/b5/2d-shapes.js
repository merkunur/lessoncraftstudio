/**
 * data/b5/2d-shapes.js — the K-368 `2d-shapes` bank (nt10-E; design
 * docs/worksheet-gen/b5-designs/K-368-2d-shapes.md §4-§5).
 *
 * SHAPES_2D[loc] — the per-locale block, read ONLY through
 * lib/b5-common.js bank('2d-shapes', loc) (a missing block REFUSES, never an
 * en fallback). The EN block is HAND-AUTHORED here (2026-09-23, the base
 * build); the ten non-EN blocks are GENERATED later by tools/apply-b5-locale.js
 * into data/b5/locales/2d-shapes.<loc>.json from the native panels' drafts
 * (i18n/.draft-b5-<loc>.json) after tools/validate-b5-draft.js, which runs the
 * gate's validateBank(block, loc) (qa/verify-b5-2d-shapes.js, §5 rules 1-10).
 *
 * Block shape (§5):
 *   names        {circle, square, triangle, rectangle, hexagon?} — each ===
 *                displayWord(vocab[kind][loc][0], loc) unless overrides[kind]
 *                carries a reason (fr K "rond"); hexagon iff inventory.hexagon
 *   overrides    {kind: {word, reason}} | {}
 *   inflections  {kind: [every inflected / plural form a riddle must not contain]}
 *   inventory    {hexagon: bool}
 *   riddles      {circle|square|triangle|rectangle: [{text, clue}] x2, hexagon?: x2}
 *                clue: circle 'round' · triangle 'three' · square 'equal' ·
 *                rectangle 'longShort' (hexagon 'six'); <= 90 chars, 1-2
 *                sentences, never a name or an inflection
 *   strings      {base, real-or-not, around-us, write-name, riddles, dot-draw}
 *                each {title, instruction}; base === the spec's i18n.en
 * Nothing on the page inflects: every word is a whole literal from here.
 *
 * OBJECTS — the F2 ("Shapes Around Us") pictures, LOCALE-NEUTRAL and PINNED
 * ({theme, noun} through fileUri(theme, noun), never pictureFor): opened
 * 2026-09-23 by design A + the editor (B opened the pedagogy's nine). The
 * design's rejected-after-opening list (notebook, ruler, eraser, chocolate bar,
 * carpet, rug, pancake, donut, the 3D around-the-house clock, folder,
 * picture_frame …) is REJECTED below and the validator refuses any of them.
 *
 * `data/` is gitignored — the reviewer force-adds this module.
 */
'use strict';

const SHAPES_2D = {
  en: {
    names: { circle: 'circle', square: 'square', triangle: 'triangle', rectangle: 'rectangle', hexagon: 'hexagon' },
    overrides: {},
    inflections: {
      circle: ['circles'],
      square: ['squares'],
      triangle: ['triangles'],
      rectangle: ['rectangles'],
      hexagon: ['hexagons'],
    },
    inventory: { hexagon: true },
    riddles: {
      circle: [
        { text: 'I am round all the way around and have no corners. What am I?', clue: 'round' },
        { text: 'I have no straight sides and no corners at all. What am I?', clue: 'round' },
      ],
      square: [
        { text: 'I have 4 equal sides and 4 corners like the corner of a book. What am I?', clue: 'equal' },
        { text: 'All my 4 sides are the same length, and my corners are like a book corner. What am I?', clue: 'equal' },
      ],
      triangle: [
        { text: 'I have 3 sides and 3 corners. What am I?', clue: 'three' },
        { text: 'I have only 3 straight sides. What am I?', clue: 'three' },
      ],
      rectangle: [
        { text: 'I have 2 long sides, 2 short sides and 4 corners like the corner of a book. What am I?', clue: 'longShort' },
        { text: 'My 4 corners are like a book corner, and I have 2 long and 2 short sides. What am I?', clue: 'longShort' },
      ],
      hexagon: [
        { text: 'I have 6 sides and 6 corners. What am I?', clue: 'six' },
        { text: 'I have 6 straight sides. What am I?', clue: 'six' },
      ],
    },
    strings: {
      base: {
        title: '2D Shapes',
        instruction: 'Look at each shape, even the turned and skinny ones, and circle its name.',
      },
      'real-or-not': {
        title: '2D Shapes: Real or Not?',
        instruction: 'Read the name in each row and circle every shape that really is that shape.',
      },
      'around-us': {
        title: '2D Shapes Around Us',
        instruction: 'Look at each picture and color the shape it has: the circle or the rectangle.',
      },
      'write-name': {
        title: '2D Shapes: Write the Names',
        instruction: 'Look at each shape and write its name on the line, using the names in the box.',
      },
      riddles: {
        title: '2D Shape Riddles',
        instruction: 'Read each riddle and circle the name of the shape.',
      },
      'dot-draw': {
        title: 'Draw 2D Shapes on Dot Paper',
        instruction: 'Read the shape name and join the dots to draw it, starting from the thick line where there is one.',
      },
    },
  },
};

/** F2 objects (locale-neutral, pinned files; design §3 F2 + §5). */
const OBJECTS = [
  { theme: 'classroom', noun: 'clock', shape: 'circle', picOpened: true },
  { theme: 'around the house', noun: 'plate', shape: 'circle', picOpened: true },
  { theme: 'At the Supermarket', noun: 'pizza', shape: 'circle', picOpened: true },
  { theme: 'bakery', noun: 'cookie', shape: 'circle', picOpened: true },
  { theme: 'desserts and sweets', noun: 'lollipop', shape: 'circle', picOpened: true },
  { theme: 'around the house', noun: 'door', shape: 'rectangle', picOpened: true },
  { theme: 'post office', noun: 'envelope', shape: 'rectangle', picOpened: true },
  { theme: 'classroom', noun: 'whiteboard', shape: 'rectangle', picOpened: true },
  // landing-panel round 1 (2026-09-23): the tablet has ROUNDED corners — K-371 called it a rectangle while G1-381
  // teaches that a rounded-corner outline is NOT one. Replaced by the wall map (opened: a crisp square-cornered sheet).
  { theme: 'classroom', noun: 'map', shape: 'rectangle', picOpened: true },
];

/** Pictures OPENED and REJECTED by the design (§3 F2): never an object, whatever the theme. */
const REJECTED = [
  'classroom/notebook', 'classroom/ruler', 'classroom/eraser', 'desserts and sweets/chocolate_bar',
  'around the house/carpet', 'furniture/rug', 'breakfast/pancake', 'At the Supermarket/donut',
  'around the house/clock', 'classroom/folder', 'around the house/picture_frame',
  // ROUNDED CORNERS (landing round 1, 2026-09-23): a rounded-corner rectangle is a G1-381 near-miss, never a K-371 rectangle
  'classroom/tablet', 'toys/domino', 'around the house/fridge', 'around the house/television',
];

const KINDS = ['circle', 'square', 'triangle', 'rectangle'];
const OPTIONAL_KINDS = ['hexagon'];
const MODES = ['base', 'real-or-not', 'around-us', 'write-name', 'riddles', 'dot-draw'];
const CLUE_OF = { circle: 'round', square: 'equal', triangle: 'three', rectangle: 'longShort', hexagon: 'six' };

module.exports = { SHAPES_2D, OBJECTS, REJECTED, KINDS, OPTIONAL_KINDS, MODES, CLUE_OF };
