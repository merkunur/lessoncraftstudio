/**
 * data/science/dk-k2.js — the bank of Batch K2 (Daily Teaching System Stage D-5, 2026-11-23): the four Kindergarten
 * health lessons the year design marked teacher-led (scripts/units/year/design.en.health.json, grade K):
 *   K-708 Calm-Down Tools (NHES.8.2.1) · K-709 Kind Words and Kind Hands (NHES.4.2.5) ·
 *   K-710 My Space Bubble: Ask First (NHES.4.2.4) · K-711 Germ Busters: When Do I Wash? (NHES.7.2.2).
 * English only. `data/` is gitignored: add with -f. Factory: types/_shared/dk-k2.js. Gate: qa/verify-dk-k2.js.
 *
 * Pictures: colour library pictures only (cache/themes-512), every one OPENED; actions the library cannot show (a
 * kind or unkind hand, asking before a hug, stopping) are DRAWN faceless figures (types/_shared/dk-k2.js), as the
 * Batch K push / pull cards were. The child the item is about is drawn in ink; the friend who acts, in teal.
 *
 * The traps the coordinator named (2026-11-23), and how the bank closes them:
 *   - a kind / unkind item whose context could flip: only acts that are kind or unkind in ANY context are drawn
 *     (helping pick up, sharing a block, helping up, inviting with a ball vs kicking things, pushing a child over).
 *     Refused (FLIP): a hug, a high five, a tickle (wanted or not), a push on a swing (that is kind), taking a toy
 *     (it may be given back), walking away (it may be to fetch the teacher).
 *   - a calm-down tool that is also an unkind act: the three tools of the lesson touch no one and nothing (breathe,
 *     count, squeeze your OWN hands). Refused: hitting a pillow, stomping, squeezing a friend, throwing a ball.
 *   - a space-bubble picture that reads as a hug between friends who asked: every "stop" choice card draws the
 *     friend's STOP hand (an open palm) in the picture itself, so a hug that goes on is a hug after "Stop, please".
 */
'use strict';
const P = (theme, noun) => ({ theme, noun });

/* ------------------------------------------------------------ K-708 calm-down tools (NHES.8.2.1) */
const CALM = {
  upset: [P('emotions', 'angry'), P('emotions', 'sad')],
  // the three tools of the lesson: none touches another child or a thing (people: 0)
  tools: [
    { id: 'breathe', label: ['smell the flower,', 'blow out the candle'], pics: [P('spring', 'flower'), P('christmas', 'candle')], people: 0 },
    { id: 'count', label: ['count slowly', 'to 5'], drawn: 'count', people: 0 },
    { id: 'squeeze', label: ['squeeze your hands,', 'then let go'], drawn: 'squeeze', pics: [P('body parts', 'hand')], people: 0 },
  ],
  help: ['I need a break, please.', 'Can you help me?'],
  REFUSED: {
    'hit a pillow': 'hitting is the act the tool replaces', stomp: 'stomping reads as anger, not calm',
    'squeeze a friend': 'touches another child', 'throw a ball': 'can hit someone',
  },
};

/* ------------------------------------------------------------ K-709 kind words and kind hands (NHES.4.2.5) */
const KIND = {
  words: ['please', 'thank you', 'Are you OK?', 'Do you want to play?'],
  trace: ['please', 'thank you', 'Are you OK?'],
  // each scene: the child (ink) in a small upset, the friend's (teal) KIND act and UNKIND act, both drawn
  scenes: [
    { id: 'crayons', kind: 'hand-back', unkind: 'kick-things', props: [P('classroom', 'crayon'), P('toys', 'crayons')] },
    { id: 'tower', kind: 'share-block', unkind: 'kick-tower' },
    { id: 'fell', kind: 'help-up', unkind: 'push' },
    { id: 'alone', kind: 'invite-ball', unkind: 'push', props: P('toys', 'ball') },
  ],
  // how the child feels after the kind act: happy; the other two faces are never right after a kindness (sad is
  // NOT offered: a child helped up after a fall may still be a little sad)
  after: { right: P('emotions', 'happy'), wrong: [P('emotions', 'angry'), P('emotions', 'scared')] },
  FLIP: {
    hug: 'kind only when wanted', 'high-five': 'kind only when wanted', tickle: 'kind only when wanted',
    'push-swing': 'a push on a swing is kind', 'take-toy': 'may be giving it back', 'walk-away': 'may be going for the teacher',
  },
};

/* ------------------------------------------------------------ K-710 my space bubble: ask first (NHES.4.2.4) */
const SPACE = {
  ask: 'May I give you a hug?',
  answers: ['Yes!', 'No, thank you.'],
  hellos: ['hug', 'high-five', 'wave', 'fist-bump'],
  stop: 'Stop, please.',
  // the friend says "Stop, please" and shows a stop hand in EVERY card of the item; you stop (right) or go on (wrong)
  stopItems: [
    { id: 'hug', right: 'step-back', wrong: 'keep-hugging' },
    // a chasing game: the friend turns and shows the stop hand; you keep running (wrong) or stand still (right)
    { id: 'chase', right: 'stand-still', wrong: 'keep-chasing' },
  ],
  // someone does not stop: tell a grown-up (right) or push them (wrong)
  notStop: { right: 'tell-teacher', wrong: 'push' },   // the teacher is DRAWN (a tall grown-up): the library portrait printed no taller than the child (review round 3)
};

/* ------------------------------------------------------------ K-711 germ busters: when do I wash? (NHES.7.2.2) */
// K-380 matches a child to the thing used, K-382 orders the hand-washing steps, G1-404 chooses the healthy way
// (elbow, tissue in the bin, own cup, soap): none asks WHEN to wash, the lesson's "tell when to wash".
const WASH = {
  times: [
    { id: 'eat', label: 'before I eat', pic: P('classroom', 'lunchbox'), wash: true },
    { id: 'toilet', label: 'after I use the bathroom', pic: P('around the house', 'toilet'), wash: true },   // US wording (review round 3; was "after the toilet")
    { id: 'recess', label: 'after recess', pic: P('activities', 'playground'), wash: true },
    { id: 'nose', label: 'after I blow my nose', pic: P('hospital', 'tissue'), wash: true },
  ],
  // moments with no touching at all: no K teacher asks for a wash after them
  notTimes: [
    { id: 'story', label: 'after a story', pic: P('classroom', 'book'), wash: false },
    { id: 'rainbow', label: 'after I see a rainbow', pic: P('weather', 'rainbow'), wash: false },
  ],
  NOT_TIME_REFUSED: {
    'toys/swing': 'a swing is recess (wash after it)', 'classroom/crayon': 'after art some classes wash',
    'toys/teddy_bear': 'a cuddly toy may be germy', 'clothing/shoes': 'shoes are dirty: some say wash',
    'farm animals/dog': 'after touching a pet you wash', 'around the house/bed': 'some wash before bed',
  },
  cake: P('4th of July', 'cake'),
  // the germ-buster checklist (what the child did ALONE): a record, never a choice (G1-404 is the choice page)
  check: [
    { id: 'soap', label: 'wash with soap', pic: P('around the house', 'sink') },
    // DRAWN, not a picture (review round 4): the library elbow (a skin-coloured L with a red dot) read as a leg or a boot
    { id: 'elbow', label: 'cough in my elbow', draw: 'cough' },
    { id: 'trash', label: 'tissue in the trash', pic: P('around the house', 'trash_can') },
  ],
};

module.exports = { CALM, KIND, SPACE, WASH };
