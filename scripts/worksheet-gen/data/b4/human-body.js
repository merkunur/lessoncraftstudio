/**
 * data/b4/human-body.js — the K-354 `human-body` bank (design file
 * docs/worksheet-gen/b4-designs/K-354-human-body.md §5; read through
 * lib/b4-common.js bank('human-body', loc)).
 *
 * EN block HAND-AUTHORED (2026-09-21, K-354 base build); the ten non-EN
 * blocks are GENERATED later by tools/apply-b4-locale.js from
 * i18n/.draft-b4-<loc>.json into data/b4/locales/human-body.<loc>.json (the
 * native panels author every literal WHOLE; the code substitutes and stamps,
 * it never composes an article, a plural or a case). `data/` is gitignored —
 * the reviewer force-adds this module.
 *
 * Shape (every value a whole literal; validated by qa/verify-b4-human-body.js
 * validateBank(block, loc) — the rules of design §5):
 *   partWords   16 singulars === displayWord(vocab[id][loc][0], loc) unless an
 *               audited overrides[id] = {word, reason} exists (rule 4)
 *   overrides   {} | { <id>: {word, reason} }
 *   bankWords   16 bank literals (default = partWords; may carry an article:
 *               de "das Auge", nl "het oog"; must END with partWords[id])
 *   plural      16 nominative plural literals (the F2 legend; default = vocab plural)
 *   factLabels  16 parts + fingersOneHand + toesOneFoot (the F1 "how many X" form;
 *               fi partitive; <= 34 chars, no digit, no slot)
 *   use         optional landing-prose phrases (page-free)
 *   refuseWords { <face>: [ids] } per face (count|color|write|missing|pairs|base)
 *   refuse      [faces this locale will not ship]
 *   strings     { 'K-354':{title, instruction}, K-360, K-361, G1-356, K-362, K-363 }
 *               (the five face ids from _records/b4var-id-allocation.json; the
 *               EN titles are the §6 candidates the panels rewrite)
 * The locale-neutral facts (counts, cue pictures, pools, the chip fence) live in
 * data/b4/body-facts.json — ONE file for all 11 locales.
 */
'use strict';
const HUMAN_BODY = {
  en: {
    partWords: {
      head: 'head', hair: 'hair', eye: 'eye', ear: 'ear', nose: 'nose', mouth: 'mouth', neck: 'neck', shoulder: 'shoulder',
      arm: 'arm', elbow: 'elbow', hand: 'hand', finger: 'finger', leg: 'leg', knee: 'knee', foot: 'foot', toe: 'toe',
    },
    overrides: {},
    bankWords: {
      head: 'head', hair: 'hair', eye: 'eye', ear: 'ear', nose: 'nose', mouth: 'mouth', neck: 'neck', shoulder: 'shoulder',
      arm: 'arm', elbow: 'elbow', hand: 'hand', finger: 'finger', leg: 'leg', knee: 'knee', foot: 'foot', toe: 'toe',
    },
    plural: {
      head: 'heads', hair: 'hair', eye: 'eyes', ear: 'ears', nose: 'noses', mouth: 'mouths', neck: 'necks', shoulder: 'shoulders',
      arm: 'arms', elbow: 'elbows', hand: 'hands', finger: 'fingers', leg: 'legs', knee: 'knees', foot: 'feet', toe: 'toes',
    },
    factLabels: {
      head: 'How many heads?', hair: 'How much hair?', eye: 'How many eyes?', ear: 'How many ears?', nose: 'How many noses?',
      mouth: 'How many mouths?', neck: 'How many necks?', shoulder: 'How many shoulders?', arm: 'How many arms?',
      elbow: 'How many elbows?', hand: 'How many hands?', finger: 'How many fingers?', leg: 'How many legs?',
      knee: 'How many knees?', foot: 'How many feet?', toe: 'How many toes?',
      fingersOneHand: 'How many fingers on one hand?', toesOneFoot: 'How many toes on one foot?',
    },
    use: {
      head: 'You think with your head.', hair: 'Hair keeps your head warm.', eye: 'You see with your eyes.', ear: 'You hear with your ears.',
      nose: 'You smell with your nose.', mouth: 'You eat and talk with your mouth.', neck: 'Your neck turns your head.',
      shoulder: 'Your shoulders carry a backpack.', arm: 'You hug with your arms.', elbow: 'Your elbows bend your arms.',
      hand: 'You hold things with your hands.', finger: 'You point with a finger.', leg: 'You run with your legs.',
      knee: 'Your knees bend when you jump.', foot: 'You stand on your feet.', toe: 'Your toes help you balance.',
    },
    refuseWords: {},
    refuse: [],
    strings: {
      'K-354': { title: 'Parts of the Body', instruction: 'Copy each word from the bank onto the line that points to that part of the body.' },
      'K-360': { title: 'Parts of the Body: How Many?', instruction: 'How many of each do you have? Count on your own body and write the number in the box.' },
      'K-361': { title: 'Parts of the Body: Color by Legend', instruction: 'Read the legend and color each part of the body in the color written next to its name.' },
      'G1-356': { title: 'Parts of the Body: Write the Word', instruction: 'Find each numbered part on the figure and write its name, one letter in each box.' },
      'K-362': { title: 'Parts of the Body: What Is Missing?', instruction: 'Each body is missing one part: circle the picture of the missing part, then draw it on.' },
      'K-363': { title: 'Parts of the Body: Which Come in Twos?', instruction: 'Circle every part of the body that you have two of.' },
    },
  },
};
module.exports = { HUMAN_BODY };
