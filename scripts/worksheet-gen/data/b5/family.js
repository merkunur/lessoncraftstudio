/**
 * data/b5/family.js — the K-370 `family` bank (nt10-E; design
 * docs/worksheet-gen/b5-designs/K-370-family.md §4-§5).
 *
 * FAMILY[loc] — the per-locale block, read ONLY through
 * lib/b5-common.js bank('family', loc) (a missing block REFUSES, never an en
 * fallback). The EN block is HAND-AUTHORED here (2026-09-23, the base build);
 * the ten non-EN blocks are GENERATED later by tools/apply-b5-locale.js into
 * data/b5/locales/family.<loc>.json from the native panels' drafts after
 * tools/validate-b5-draft.js, which runs the gate's validateBank(block, loc)
 * (qa/verify-b5-family.js, §5 rules 1-16).
 *
 * Block shape (§5):
 *   kin        path -> wordKey. Keyed on the PATH ONLY (M mother, F father,
 *              Z / B older sister / brother, Zy / By baby sister / brother,
 *              MM mother's mother … MZ mother's sister, MZD her daughter …).
 *              sv / da (and no with lineage:true) map every M-side lineage path
 *              (MM MF MZ MB) to a mo- literal and every F-side one to a fa- literal
 *              (rule 2: mormor morfar moster morbror / farmor farfar faster farbror).
 *   words      wordKey -> { text, register:'K'|'G2' }: WHOLE native literals
 *              (fr / es / it / pt carry the article INSIDE the literal where a
 *              frame needs one). Kin words are NEVER read from
 *              image-vocabulary.js (it stores sv grandfather = "Morfar", it
 *              baby = "Bambino", and no aunt / uncle / cousin keys at all).
 *   names      [{ name, sex:'f'|'m', gen }] >= 6 f + >= 6 m, <= 7 chars; `gen` is
 *              the stored genitive literal where the locale's frames use
 *              {egoGen} (en "Mia's"; fr / es / it / pt null — their frames say
 *              "de Léa"). Initialised from data/b4/pronouns.js PRONOUNS.en.names.
 *   clueFrames   (F3) path -> whole literal, slots {name} + {egoGen}
 *   riddleFrames (F4) path -> whole literal, slot {egoGen} only, one "___"
 *   distractors  (F4) words that share a generation with an answer and fit no riddle
 *   repeatsNote  (F4) true IFF the locale's d2 riddle answers repeat
 *   generationOK (F1) the words whose generation is unambiguous in the locale
 *   agreeing     words that, immediately before "___", would agree with the
 *                answer (rule 10; en a / an / his / her)
 *   firstPerson  the locale's first-person tokens (rule 11)
 *   meWord · forbiddenInTemplate · familyHead · instructionBans
 *   strings    { base, generations, trace-words, tree-clues, relation-riddles,
 *                tree-template } each { title, instruction }; keyed by MODE until
 *                the emitter allocates the face ids (§1: K-371+ / G1-381+ / G2-360+);
 *                strings.base === the spec's i18n.en.
 *   The en block is a SOURCE TO AUDIT (§4): every panel reads it and reports defects.
 *
 * FAMILY_NEUTRAL — the locale-neutral facts (§5): the ONE structure, the path
 * list, the d2 riddle paths. genOf / parentsOf live in primitives/family-tree.js
 * (the ONE place the graph is derived).
 *
 * `data/` is gitignored — the reviewer force-adds this module.
 */
'use strict';

const FAMILY = {
  en: {
    kin: {
      M: 'mom', F: 'dad', Z: 'sister', B: 'brother', Zy: 'babySister', By: 'babyBrother',
      MM: 'grandma', FM: 'grandma', MF: 'grandpa', FF: 'grandpa',
      MZ: 'aunt', FZ: 'aunt', MB: 'uncle', FB: 'uncle',
      MZD: 'cousin', MZS: 'cousin', MBD: 'cousin', MBS: 'cousin', FZD: 'cousin', FZS: 'cousin', FBD: 'cousin', FBS: 'cousin',
    },
    words: {
      mom: { text: 'mom', register: 'K' },
      dad: { text: 'dad', register: 'K' },
      sister: { text: 'sister', register: 'K' },
      brother: { text: 'brother', register: 'K' },
      babySister: { text: 'baby sister', register: 'K' },
      babyBrother: { text: 'baby brother', register: 'K' },
      grandma: { text: 'grandma', register: 'K' },
      grandpa: { text: 'grandpa', register: 'K' },
      aunt: { text: 'aunt', register: 'K' },
      uncle: { text: 'uncle', register: 'K' },
      cousin: { text: 'cousin', register: 'K' },
    },
    names: [
      { name: 'Mia', sex: 'f', gen: "Mia's" }, { name: 'Ben', sex: 'm', gen: "Ben's" },
      { name: 'Emma', sex: 'f', gen: "Emma's" }, { name: 'Leo', sex: 'm', gen: "Leo's" },
      { name: 'Anna', sex: 'f', gen: "Anna's" }, { name: 'Tom', sex: 'm', gen: "Tom's" },
      { name: 'Lily', sex: 'f', gen: "Lily's" }, { name: 'Max', sex: 'm', gen: "Max's" },
      { name: 'Zoe', sex: 'f', gen: "Zoe's" }, { name: 'Jack', sex: 'm', gen: "Jack's" },
      { name: 'Ava', sex: 'f', gen: "Ava's" }, { name: 'Eli', sex: 'm', gen: "Eli's" },
    ],
    clueFrames: {
      M: '{name} is {egoGen} mom.', F: '{name} is {egoGen} dad.',
      Z: '{name} is {egoGen} sister.', B: '{name} is {egoGen} brother.',
      Zy: '{name} is {egoGen} baby sister.', By: '{name} is {egoGen} baby brother.',
      MM: '{name} is {egoGen} grandma.', FM: '{name} is {egoGen} grandma.',
      MF: '{name} is {egoGen} grandpa.', FF: '{name} is {egoGen} grandpa.',
      MZ: '{name} is {egoGen} aunt.', FZ: '{name} is {egoGen} aunt.',
      MB: '{name} is {egoGen} uncle.', FB: '{name} is {egoGen} uncle.',
      MZD: '{name} is {egoGen} cousin.', MZS: '{name} is {egoGen} cousin.', MBD: '{name} is {egoGen} cousin.', MBS: '{name} is {egoGen} cousin.',
      FZD: '{name} is {egoGen} cousin.', FZS: '{name} is {egoGen} cousin.', FBD: '{name} is {egoGen} cousin.', FBS: '{name} is {egoGen} cousin.',
    },
    riddleFrames: {
      MM: "{egoGen} mom's mom is {egoGen} ___.", FM: "{egoGen} dad's mom is {egoGen} ___.",
      MF: "{egoGen} mom's dad is {egoGen} ___.", FF: "{egoGen} dad's dad is {egoGen} ___.",
      MZ: "{egoGen} mom's sister is {egoGen} ___.", FZ: "{egoGen} dad's sister is {egoGen} ___.",
      MB: "{egoGen} mom's brother is {egoGen} ___.", FB: "{egoGen} dad's brother is {egoGen} ___.",
    },
    distractors: ['mom', 'dad'],
    repeatsNote: true,
    repeatsNoteText: 'one word can fit more than one riddle',   // (F4) the instruction clause, present IFF repeatsNote (validator rule 7)
    generationOK: ['grandma', 'grandpa', 'mom', 'dad', 'aunt', 'uncle', 'sister', 'brother', 'cousin', 'babySister', 'babyBrother'],
    agreeing: ['a', 'an', 'his', 'her', 'the'],
    firstPerson: ['my', 'I', 'me', 'mine', 'our', 'we'],
    meWord: 'me',
    forbiddenInTemplate: ['mom', 'dad', 'mother', 'father', 'your family'],
    instructionBans: ['tick', 'cut', 'colour', 'color', 'free', 'answer key', 'with answers'],
    familyHead: 'Family Members',
    strings: {
      base: { title: 'Family Members: Who Is Who?', instruction: 'Find each person on the family tree and write their number in the box next to their family word.' },
      generations: { title: 'Family Generations: Oldest to Youngest', instruction: 'In each row, write 1, 2 and 3 in the boxes to put the family words in order from the oldest generation to the youngest.' },
      'trace-words': { title: 'Family Words: Trace and Write', instruction: 'Find the person with the same number on the tree, trace their family word and write it again on the line.' },
      'tree-clues': { title: 'Family Tree: Read the Clues', instruction: 'Read the clues and write each name in the right name box on the family tree.' },
      'relation-riddles': { title: 'Family Relationships: Riddles', instruction: 'Read each riddle and write the right family word from the box on the line; one word can fit more than one riddle.' },
      'tree-template': { title: 'Family Tree Template', instruction: 'Draw the people who are important to you in the frames and write their names on the lines.' },
    },
  },
};

const FAMILY_NEUTRAL = {
  structure: 'conventional',   // the ONE structure (lead ruling); build() throws on anything else
  paths: ['', 'M', 'F', 'Z', 'B', 'Zy', 'By', 'MM', 'MF', 'FM', 'FF', 'MZ', 'MB', 'FZ', 'FB', 'MZD', 'MZS', 'MBD', 'MBS', 'FZD', 'FZS', 'FBD', 'FBS'],
  riddlePathsD2: ['MM', 'FM', 'MF', 'FF', 'MZ', 'FZ', 'MB', 'FB'],
  riddlePathsD1: ['M', 'F', 'Z', 'B'],
  modes: ['base', 'generations', 'trace-words', 'tree-clues', 'relation-riddles', 'tree-template'],
  /** the paths each shipped face asks under the ONE structure (validator rule 1 / 4) */
  basePaths: ['M', 'F', 'Z', 'B', 'Zy', 'By', 'MM', 'MF', 'FM', 'FF'],
};

module.exports = { FAMILY, FAMILY_NEUTRAL };
