/**
 * G1-333 — Word Families with Blends (nt20-C face 5 of G1-306
 * `syllable-reading`; design §3 "Complex Syllables", PARAM `structure:'complex'`).
 * HANDWRITTEN (listed under HANDWRITTEN in tools/b3var-rows/syllable-reading.js):
 * the config is exactly `{...base.difficulty[2], structure:'complex'}` — the
 * base's build() branched on `d.structure` from day one and reads the bank's
 * `complexUnits` — but the face FANS over those complex rows (en: the blend
 * ladders l1-l4; es/pt/it/fr/de: cluster rows; fi: closed syllables; B: cluster
 * words), so it needs its OWN `unitAxis` (units / exemplar / tokens are
 * function values a generated row cannot carry — the K-317 → G1-311 precedent).
 *
 * The page is the base page on the next decoding step: the carpet prints
 * blend-onset words with mixed rimes (`fl|ag cr|ab dr|um sw|an bl|ocks`), each
 * lane prints ITS word's rime in coral, and the child writes the BLEND. Every
 * cell's onset ∈ bank.blends and its rime matches bank.complexRime (the gate's
 * data rule; a single-consonant word in a complex row fails, a complex row in
 * the simple structure fails — the two structures are disjoint controls).
 * Band G1. One object for all three levels: the waves ship d2 only.
 */
'use strict';
const base = require('./G1-306-syllable-reading.js');

const D = { ...base.difficulty[2], structure: 'complex' };

module.exports = {
  ...base,
  id: 'G1-333',
  slug: 'syllable-reading-with-blends',
  unitAxis: {
    applicable: true,
    units: (loc) => base._complexUnits.units(loc),
    exemplar: (loc) => base._complexUnits.exemplar(loc),
    tokens: (unit, loc) => base._complexUnits.tokens(unit, loc),
  },
  difficulty: { 1: D, 2: D, 3: D },
  i18n: {
    en: {
      title: 'Word Families with Blends',
      instruction: 'Read every word on the carpet out loud. Say each picture word, find it on the carpet, then write the two letters it starts with on the line.',
    },
  },
};
