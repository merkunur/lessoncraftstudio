'use strict';
/**
 * data/b6/healthy-habits.js — the K-380 `healthy-habits` bank (nt5-F). Design:
 * docs/worksheet-gen/b6-designs/K-380-healthy-habits.md §5.
 *
 * TWO layers:
 *   COMMON          locale-neutral tables the GATE owns (the tool of each habit, the
 *                   hand-washing state vectors, the brushing phase of each card, the
 *                   germ pairs, the co-occurrence sets for the 1-bit confusability gate,
 *                   the library pictures opened and refused). Never per locale.
 *   HEALTHY_HABITS  one block per locale. The EN block is hand-authored here; every
 *                   other locale is GENERATED into data/b6/locales/healthy-habits.<loc>.json
 *                   by tools/apply-b6-locale.js after tools/validate-b6-draft.js (the
 *                   §5 rules live in qa/verify-b6-healthy-habits.js validateBank). An
 *                   absent block REFUSES (lib/b6-common.js bank() throws; never an en
 *                   fallback).
 *
 * THE EN BLOCK IS A SOURCE TO AUDIT, not a target: every literal was written against
 * the §5 validator rules (no reason names its own habit or another habit's stem, no
 * food word, no number, no quantity or time unit, the cough goes into the elbow, every
 * instruction names only the apparatus of its face). No noun forms, no objForms: no
 * printed word agrees with a picture noun on any face.
 *
 * The bank object is exported FIRST (lib/b6-common.js bankModule reads the first export).
 */

const HEALTHY_HABITS = {
  en: {
    strings: {
      base: {
        title: 'Healthy Habits: What Does Each Child Need?',
        instruction: 'Draw a line from each child to the thing that child needs.',
      },
      'hand-washing-steps': {
        title: 'Hand Washing Steps',
        instruction: 'Write 1 to 5 in the boxes to show how we wash our hands.',
      },
      'brushing-teeth': {
        title: 'Brushing Teeth: Before, During and After',
        instruction: 'Circle the word that tells when it happens: before, during or after brushing.',
      },
      'stop-the-germs': {
        title: 'Stop the Germs: Choose the Healthy Way',
        instruction: 'In each row, circle the picture that stops germs from spreading.',
      },
      'why-habits': {
        title: 'Healthy Habits: Why Do We Do Them?',
        instruction: 'Draw a line from each habit to the sentence that tells why we do it.',
      },
      'habit-chart': {
        title: 'Healthy Habits Chart for the Week',
        instruction: 'Each day, put a check in the box for every habit you did.',
      },
    },
    phases: { before: 'before', during: 'during', after: 'after' },
    labels: {
      'wash-hands': 'wash hands', 'brush-teeth': 'brush teeth', sleep: 'sleep', 'move-body': 'move',
      'drink-water': 'drink water', 'sun-protect': 'stay safe in the sun', 'blow-nose': 'blow your nose', 'comb-hair': 'comb hair',
    },
    labelStems: {
      'wash-hands': ['wash', 'hand', 'hands', 'soap'],
      'brush-teeth': ['brush', 'brushing', 'teeth', 'tooth', 'toothpaste'],
      sleep: ['sleep', 'bed', 'night'],
      'move-body': ['move', 'run', 'play', 'sport'],
      'sun-protect': ['sun', 'hat', 'cream', 'skin'],
      'drink-water': ['drink', 'water', 'glass'],
      'blow-nose': ['blow', 'tissue'],
      'comb-hair': ['comb', 'hair'],
    },
    reasons: {
      // FIX ROUND 1 (native panels auditing the EN source, 2026-09-23): no reason names its habit's body part or
      // tool ("nose", "skin" were), the wash-hands reason no longer fits brushing, and "keeps holes away" (cavities)
      // is gone. Each is pinned to the one habit it fits in qa/verify-b6-healthy-habits.js REASON_READ.
      'wash-hands': 'It clears away the germs from all the things we touched.',
      'brush-teeth': 'It keeps our smile clean and bright.',
      sleep: 'Our body and brain rest and get ready for a new day.',
      'move-body': 'It makes us fit, fast and strong.',
      'sun-protect': 'We do not get burnt on a hot, sunny day.',
      'drink-water': 'Our body needs it to work well.',
      'blow-nose': 'We can breathe easily again.',
    },
    kaiOrder: false,
    coughPhrase: 'into your elbow',
    weekStartOverride: null,
  },
};

const COMMON = {
  modes: ['base', 'hand-washing-steps', 'brushing-teeth', 'stop-the-germs', 'why-habits', 'habit-chart'],
  /** drawn tool kinds (primitives/habit-pictogram.js habitTool), never a library theme/noun */
  TOOL_OF: { 'wash-hands': 'soap', 'brush-teeth': 'toothbrush', sleep: 'bed', 'comb-hair': 'comb', 'blow-nose': 'tissue-box', 'sun-protect': 'hat' },
  /**
   * The cue parts that NAME a habit on the drawing (verify() derives the pose from the parts it can SEE,
   * never from a stamp): a plaque showing these parts, and no other habit's cue, is that habit.
   */
  CUE_OF: { 'wash-hands': ['tap', 'water', 'basin'], 'brush-teeth': ['scrub', 'foam'], sleep: ['moon', 'stars', 'pajamas'], 'comb-hair': ['tufts'], 'blow-nose': ['burst', 'pinch'], 'sun-protect': ['sun'] },
  /** FIX ROUND 1: parts that draw the UNHEALTHY variant of a habit (F3's other twins) — never on a base plaque */
  UNHEALTHY_PARTS: ['spray', 'tissue', 'cup-shared'],
  /**
   * FIX ROUND 1: the body part / tool a reason must NEVER name, per habit, as image-vocabulary keys (the validator
   * reads each key's singular + plural in the locale, so the ban exists in all 11 without new bank keys). The EN-only
   * words the vocabulary lacks (skin) live in labelStems.
   */
  REASON_BAN_KEYS: { 'wash-hands': ['hand', 'finger', 'sink', 'faucet', 'towel'], 'brush-teeth': ['tooth', 'mouth', 'lip', 'tongue', 'toothbrush', 'toothpaste'],
    sleep: ['bed', 'pillow', 'blanket', 'eye'], 'move-body': ['leg'], 'sun-protect': ['hat', 'sunscreen'], 'drink-water': ['glass', 'cup', 'mouth'],
    'blow-nose': ['nose', 'tissue'], 'comb-hair': ['comb', 'hair'] },
  /** the parts that NAME a tool on the drawing (the same rule for the shelf) */
  GLYPH_PARTS: { soap: ['dish', 'bar'], toothbrush: ['brush-handle', 'brush-head', 'bristles'], bed: ['frame', 'mattress', 'pillow', 'blanket'], comb: ['spine', 'teeth'], 'tissue-box': ['puff', 'box'], hat: ['brim', 'crown'] },
  /** a mark a tool may NEVER carry (the shared-mark rule: bubbles on the soap pull the brushing child's line) */
  TOOL_FORBIDDEN: { soap: ['bubbles', 'foam', 'scrub'], toothbrush: ['foam', 'bubbles', 'paste'], bed: ['moon', 'stars'], comb: ['tufts'], 'tissue-box': ['burst', 'cross'], hat: ['sun'] },
  baseD2: ['wash-hands', 'brush-teeth', 'sleep', 'comb-hair', 'blow-nose'],
  baseD1: ['wash-hands', 'brush-teeth', 'sleep', 'comb-hair'],
  baseD3: ['wash-hands', 'brush-teeth', 'sleep', 'comb-hair', 'blow-nose', 'sun-protect'],
  /** the d2 contingency (data, never code): if the human read of blow-nose fails, it swaps for sun-protect */
  baseD2Contingency: { 'blow-nose': 'sun-protect' },
  neverTogether: [['brush-teeth', 'drink-water'], ['wash-hands', 'bath'], ['toothbrush', 'toothpaste'], ['wash-hands', 'towel']],
  handSteps: ['wet', 'soap', 'rub', 'rinse', 'dry'],
  HAND_STATES: { wet: ['on', 0, 'rim', 0], soap: ['off', 0, 'hands', 0], rub: ['off', 1, 'rim', 0], rinse: ['on', 1, 'rim', 0], dry: ['off', 0, 'rim', 1] },
  PHASE_OF: {
    'open-tube': 'before', 'paste-on-brush': 'before', chewing: 'during', outside: 'during', inside: 'during',
    spit: 'after', 'rinse-brush': 'after',
  },
  /**
   * DROPPED from F2 (lead review 2026-09-23): a brush standing in a cup by the sink reads equally as "take the
   * brush" (BEFORE) and "put the brush away" (AFTER) — two defensible answers. The drawing stays in the primitive;
   * the card is never offered. F2 ships 7 cards: before 2 · during 3 · after 2 (every phase >= 2).
   */
  DROPPED_BRUSH: { 'brush-in-cup': 'take the brush (before) or put it away (after): two right answers' },
  kaiSlots: ['chewing', 'outside', 'inside'],
  GERM_PAIRS: [
    { key: 'cough', healthy: 'cough-elbow', other: 'cough-open' },
    { key: 'tissue', healthy: 'tissue-in-bin', other: 'tissue-on-floor' },
    { key: 'cup', healthy: 'own-cup', other: 'shared-cup' },
    { key: 'soap', healthy: 'hands-soap', other: 'hands-water-only' },
    { key: 'toilet', healthy: 'wash-after-toilet', other: 'walk-away-toilet', reserve: true },
  ],
  reasonD2: ['wash-hands', 'brush-teeth', 'sleep', 'move-body', 'sun-protect'],
  reasonReserve: ['drink-water', 'blow-nose'],
  chartRows: ['brush-teeth', 'wash-hands', 'move-body', 'drink-water', 'sleep'],
  /** F4 / F5 draw each habit WITH its tool (design §2 table); the drawn pose per habit */
  SHOWN_POSE: { 'wash-hands': 'wash-hands-soap', 'brush-teeth': 'brush-teeth-brush', sleep: 'sleep-bed', 'move-body': 'move-body',
    'sun-protect': 'sun-hat', 'drink-water': 'drink-water', 'blow-nose': 'blow-nose' },
  /** the parts that NAME a tool-shown habit on the drawing (F4 / F5 verify: every listed part drawn, and no other habit's) */
  SHOWN_CUE: { 'wash-hands': ['tap', 'bubbles'], 'brush-teeth': ['toothbrush-held'], sleep: ['bed', 'moon'], 'move-body': ['motion'],
    'sun-protect': ['hat-on', 'sun'], 'drink-water': ['glass'], 'blow-nose': ['burst'] },
  /**
   * Items that may share a page (qa/verify-b6-habit-pictogram.js rule 1: 1-bit Jaccard < 0.72 at 60 px for
   * every pair inside one set). `figure:` = habitFigure pose, `tool:` = habitTool kind, `hands:` = handsView
   * state, `brush:` = brushCard kind.
   */
  coOccur: {
    base: ['figure:wash-hands', 'figure:brush-teeth', 'figure:sleep', 'figure:comb-hair', 'figure:blow-nose', 'figure:sun-protect',
      'tool:soap', 'tool:toothbrush', 'tool:bed', 'tool:comb', 'tool:tissue-box', 'tool:hat'],
    F1: ['hands:wet', 'hands:soap', 'hands:rub', 'hands:rinse', 'hands:dry'],
    F2: ['brush:open-tube', 'brush:paste-on-brush', 'brush:chewing', 'brush:outside', 'brush:inside', 'brush:spit', 'brush:rinse-brush'],
    F3: ['figure:cough-elbow', 'figure:cough-open', 'figure:tissue-in-bin', 'figure:tissue-on-floor'],
    F4: ['figure:wash-hands-soap', 'figure:brush-teeth-brush', 'figure:sleep-bed', 'figure:move-body', 'figure:sun-hat'],
    F5: ['figure:brush-teeth-brush', 'figure:wash-hands-soap', 'figure:move-body', 'figure:drink-water', 'figure:sleep-bed'],
    F3pairs: ['figure:cough-elbow', 'figure:cough-open', 'figure:tissue-in-bin', 'figure:tissue-on-floor', 'hands:hands-soap', 'hands:hands-water-only'],
  },
  /** provenance: library pictures OPENED and refused (design §2 "NOT used"); none may reach a page */
  REFUSED_LIBRARY: {
    'hospital/tissue': 'a pink box with a RED MEDICAL CROSS (reads first aid, not nose)',
    'around the house/glass': 'a WINE glass',
    'around the house/cup': 'a hot drink',
    'kitchen tools/cup': 'a hot drink',
    'around the house/shampoo': 'a pump bottle that reads as liquid soap',
    'around the house/sink': 'vocab = KITCHEN sink in 7 locales',
    'hospital/mask': 'excluded topic',
    'hospital/bed': 'illness',
    'around the house/trash_can': 'an outdoor wheelie bin with a red lid',
    'around the house/brush': 'a paint brush',
    'around the house/faucet': 'a blue garden-style tap',
    'kitchen tools/glass': 'a plain tumbler (fine) but a library picture beside drawn art (one art source)',
  },
};

module.exports = { HEALTHY_HABITS, COMMON };
