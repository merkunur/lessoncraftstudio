'use strict';
/**
 * data/b6/sink-or-float.js — the G1-399 `sink-or-float` bank (design
 * docs/worksheet-gen/b6-designs/G1-399-sink-or-float.md §5). Read ONLY through
 * lib/b6-common.js bank('sink-or-float', loc) (the locale map, the FIRST export) and
 * `SINK_OR_FLOAT_NEUTRAL` (the locale-neutral facts of the same bank module).
 *
 * The CLAIM table is the correctness SoT: every float/sink outcome on every page is a
 * hand-read row here (tap water, whole, dry), keyed by (theme, noun) — the code never infers
 * an outcome and no page prints one. Every row's picture was OPENED (the editor, 2026-09-23,
 * contact sheets scratchpad/G1-399-crit-{A,B,C}.png; re-opened by the builder 2026-09-23:
 * the football, the log round, the pumpkin, the red apple, the lemon, the banana, the maple
 * leaf, the feather, the pine cone, the pencil, the toy boat, the ship, the whole orange,
 * the grey rock, the nail, the gold ring, the PINK key, the claw hammer, the brass bolt, the
 * pliers, the scissors, the potato — every one is what its noun says). The gold ring was
 * REMOVED (lead review 2026-09-23): its label is the page's own apparatus word.
 *
 * Picture LABELS are panel literals in each locale block (`labels[claimId]`), never the vocab
 * at render (`nail` = fingernail in 7 locales, `rock` = cliff in 7). The non-EN blocks are
 * GENERATED into data/b6/locales/sink-or-float.<loc>.json by tools/apply-b6-locale.js.
 */

/* ------------------------------------------------------------ locale-neutral facts */
const R = (id, theme, noun, result, use, extra = {}) => ({ id, theme, noun, result, conf: 'high', testable: true, use, picOpened: true, ...extra });
const CLAIMS = [
  R('ball', 'toys', 'ball', 'float', ['base', 'scale', 'truth'], { big: true }),
  R('log', 'camping', 'log', 'float', ['base', 'scale', 'truth'], { big: true }),
  R('pumpkin', 'vegetables', 'pumpkin', 'float', ['base', 'scale', 'truth'], { big: true }),
  R('apple', 'fruits', 'apple', 'float', ['base', 'scale', 'truth']),
  R('lemon', 'fruits', 'lemon', 'float', ['base', 'scale']),
  R('banana', 'fruits', 'banana', 'float', ['base']),
  R('leaf', 'miscellaneous', 'leaf', 'float', ['base', 'scale']),
  R('feather', 'easter', 'feather', 'float', ['base', 'scale', 'truth']),
  R('pinecone', 'camping', 'pinecone', 'float', ['base', 'scale']),
  R('pencil', 'classroom', 'pencil', 'float', ['base', 'scale']),
  R('toyboat', 'toys', 'boat', 'float', ['base']),
  R('ship', 'vehicles', 'ship', 'float', ['shape', 'truth'], { testable: false }),
  { id: 'orange', theme: 'fruits', noun: 'orange', result: null, conf: 'question', testable: true, use: ['report'], picOpened: true },
  R('rock', 'camping', 'rock', 'sink', ['base', 'scale']),
  R('nail', 'tools', 'nail', 'sink', ['base', 'scale', 'truth'], { small: true }),
  R('key', 'around the house', 'key', 'sink', ['base'], { small: true }),   // the art is PINK (reads as a toy): base only
  R('hammer', 'tools', 'hammer', 'sink', ['base', 'scale']),
  R('bolt', 'tools', 'bolt', 'sink', ['base', 'shape']),
  R('pliers', 'tools', 'pliers', 'sink', ['base', 'scale']),
  R('scissors', 'classroom', 'scissors', 'sink', ['base']),
  R('potato', 'vegetables', 'potato', 'sink', ['base', 'scale', 'truth']),
];
/** Pictures ruled OUT on sight or on physics (design §5 + _work/G1-399-pedagogy.md §A); the validator refuses them. */
const EXCLUDED = ['accessories/ring',   // lead review 2026-09-23: the jewellery ring clashes with the page's own apparatus word ("colour a RING") and is a choking-size object no teacher drops in a tub
  'christmas/candle', 'around the house/spoon', 'kitchen tools/spoon', 'kitchen tools/sponge', 'toys/blocks',
  'beach/seashell', 'classroom/eraser', 'kitchen tools/fork', 'toys/balloon', 'beach/driftwood', 'beach/rock', 'around the house/hammer',
  'camping/canoe', 'miscellaneous/acorn', 'fruits/lime', 'fruits/pear', 'fruits/pineapple', 'vegetables/carrot', 'At the Supermarket/egg',
  'classroom/crayon', 'toys/lego', 'toys/dice', 'tools/nut', 'tools/screwdriver', 'vehicles/submarine', 'winter/ice',
  'fruits/orange slice', 'fruits/watermelon', 'kitchen tools/knife', 'kitchen tools/bowl', 'kitchen tools/cup', 'around the house/bucket'];
/** F1 balance pairs: `a` is the floater, `b` the sinker; `heavier` = the heavier side (hand-read mass order). */
const PAIRS = [
  { id: 'P1', a: 'pumpkin', b: 'potato', heavier: 'a' },
  { id: 'P2', a: 'log', b: 'hammer', heavier: 'a' },
  { id: 'P3', a: 'ball', b: 'nail', heavier: 'a' },
  { id: 'P4', a: 'apple', b: 'nail', heavier: 'a' },   // was apple / ring (ring removed, lead review)
  { id: 'P5', a: 'lemon', b: 'nail', heavier: 'a' },   // was lemon / ring
  { id: 'Q1', a: 'pencil', b: 'hammer', heavier: 'b' },
  { id: 'Q2', a: 'feather', b: 'rock', heavier: 'b' },
  { id: 'Q3', a: 'leaf', b: 'pliers', heavier: 'b' },
  { id: 'Q4', a: 'pinecone', b: 'potato', heavier: 'b' },
  { id: 'Q5', a: 'feather', b: 'hammer', heavier: 'b' },
];
/** F2 clay: the outcome of each SHAPE of one lump (never computed). */
const SHAPES = { ball: 'sink', boat: 'float' };
/** F3 truth claims (truth hand-set; kind spec names an object, gen is general). */
const TF = {
  T1: { truth: 'T', kind: 'spec', objects: ['log'] },
  T2: { truth: 'T', kind: 'spec', objects: ['nail'] },
  T3: { truth: 'T', kind: 'spec', objects: ['ship'] },
  T4: { truth: 'T', kind: 'spec', objects: ['pumpkin'] },
  T5: { truth: 'T', kind: 'spec', objects: ['apple', 'potato'], claims: { apple: 'float', potato: 'sink' } },
  T6: { truth: 'T', kind: 'gen', objects: [] },
  T7: { truth: 'T', kind: 'gen', objects: [] },
  T8: { truth: 'T', kind: 'gen', objects: [] },
  F1: { truth: 'F', kind: 'spec', objects: ['potato'], claims: { potato: 'float' } },
  F2: { truth: 'F', kind: 'spec', objects: ['feather'], claims: { feather: 'sink' } },
  F3: { truth: 'F', kind: 'spec', objects: ['ship'], claims: { ship: 'sink' } },
  F4: { truth: 'F', kind: 'spec', objects: ['ball'], claims: { ball: 'sink' } },
  F5: { truth: 'F', kind: 'gen', objects: [], misconception: true },
  F6: { truth: 'F', kind: 'gen', objects: [], misconception: true },
  F7: { truth: 'F', kind: 'gen', objects: [] },
  F8: { truth: 'F', kind: 'gen', objects: [], misconception: true },
  F9: { truth: 'F', kind: 'gen', objects: [] },
};
/* T-sentence object claims (what each TRUE spec sentence asserts about its object) */
TF.T1.claims = { log: 'float' }; TF.T2.claims = { nail: 'sink' }; TF.T3.claims = { ship: 'float' }; TF.T4.claims = { pumpkin: 'float' };
const QUESTIONS = ['orange', 'cargo'];
/** face id -> the layout knob it sets (the rows module and the validator read this one map). */
const FACE_OF_ID = { 'G1-399': 'base', 'G1-408': 'scale', 'G2-382': 'shape', 'G2-383': 'truth', 'K-384': 'draw', 'G3-400': 'report' };
const LEVEL_BY_LOC = {
  base: { en: 'G1', de: 'G1', es: 'K', pt: 'K', fr: 'G1', it: 'G1', nl: 'K', sv: 'G1', da: 'G1', no: 'G1', fi: 'G1' },
  scale: 'G1', shape: 'G2', truth: 'G2', draw: 'K', report: 'G3',
};
/** Vocab singulars that are a KNOWN wrong word for the picture (validator rule 6: a label must not be the trap). */
const LABEL_TRAPS = { nail: ['es', 'pt', 'fr', 'it', 'da', 'no', 'fi'], rock: ['de', 'es', 'fr', 'it', 'nl', 'sv', 'da', 'fi'] };

const SINK_OR_FLOAT_NEUTRAL = { CLAIMS, EXCLUDED, PAIRS, SHAPES, TF, QUESTIONS, LEVEL_BY_LOC, LABEL_TRAPS, FACE_OF_ID };

/* ------------------------------------------------------------ the locale blocks */
const SINK_OR_FLOAT = {
  en: {
    floatWord: 'floats',
    sinkWord: 'sinks',
    heads: { guess: 'My guess', test: 'The test', surprise: 'Surprise?' },
    trueWord: 'true',
    falseWord: 'false',
    clayWord: 'clay',
    labels: {
      ball: 'ball', log: 'log', pumpkin: 'pumpkin', apple: 'apple', lemon: 'lemon', banana: 'banana', leaf: 'leaf',
      feather: 'feather', pinecone: 'pine cone', pencil: 'pencil', toyboat: 'toy boat', ship: 'ship', orange: 'orange',
      rock: 'rock', nail: 'nail', key: 'key', hammer: 'hammer', bolt: 'bolt', pliers: 'pliers', scissors: 'scissors', potato: 'potato',
    },
    tf: {
      T1: 'A big log floats.', T2: 'A small nail sinks.', T3: 'A steel ship floats.', T4: 'A heavy pumpkin floats.',
      T5: 'An apple floats, but a potato sinks.', T6: 'The same clay can sink or float.', T7: 'Some heavy things float.', T8: 'Some light things sink.',
      F1: 'A potato floats.', F2: 'A feather sinks.', F3: 'A steel ship sinks.', F4: 'A ball full of air sinks.',
      F5: 'All heavy things sink.', F6: 'All light things float.', F7: 'Big things always sink.', F8: 'A thing floats because it is light.', F9: 'Only small things can float.',
    },
    report: { question: 'My question', predict: 'I think', result: 'What happened', learned: 'I learned', starter: 'I learned that' },
    questions: {
      orange: 'Does an orange float with its peel? Does it float without its peel?',
      cargo: 'How many cubes can a clay boat carry before it sinks?',
    },
    forbidden: ['heavy things sink', 'light things float', 'because it is light', 'density', 'buoyancy', 'salt'],
    experimentWords: ['experiment', 'test', 'predict', 'investigation', 'lab'],
    /** The apparatus words the instructions name (validator rule 11): no picture label may equal or contain one. */
    apparatus: { ring: 'ring', tank: 'tank', star: 'star' },
    /** rule 8, per FACE (design §5): line / group / bin / tick / cut on every face; circle on base + draw; colour on scale + truth. */
    instructionBans: {
      base: ['line', 'group', 'bin', 'tick', 'cut', 'circle'],
      scale: ['line', 'group', 'bin', 'tick', 'cut', 'color', 'colour'],
      shape: ['line', 'group', 'bin', 'tick', 'cut'],
      truth: ['line', 'group', 'bin', 'tick', 'cut', 'color', 'colour'],
      draw: ['line', 'group', 'bin', 'tick', 'cut', 'circle'],
      report: ['line', 'group', 'bin', 'tick', 'cut'],
    },
    refuse: [],
    strings: {
      'G1-399': {
        title: 'Sink or Float Experiment: Predict and Test',
        instruction: 'Color a ring in the first tank before the test, a ring in the second tank after it, and the star if you were surprised.',
      },
      // the five faces (Phase E; ids FIXED by _records/b6var-id-allocation.json). Titles = design §6 (en), instructions = §4.
      'G1-408': { title: 'Heavy or Light? A Sink or Float Experiment With a Scale', instruction: 'The scale shows which thing is heavier: circle the thing that floats in water.' },
      'G2-382': { title: 'Make Clay Float: A Change the Shape Experiment', instruction: 'Color where each clay shape ends up, circle the thing that floats, then draw your own clay boat on the water.' },
      'G2-383': { title: 'Sink or Float Experiment: True or False, Why Things Float', instruction: 'Read each sentence and circle true or false.' },
      'K-384': { title: 'Draw What Floats and Sinks: A Sink or Float Experiment', instruction: 'Draw two things that float on the water and two things that sink to the bottom.' },
      'G3-400': { title: 'Sink or Float Investigation: My Lab Report', instruction: 'Choose a question, write what you think, test it, then draw what happened and write what you learned.' },
    },
  },
};

module.exports = { SINK_OR_FLOAT, SINK_OR_FLOAT_NEUTRAL };
