/**
 * G1-511 — Compare Word Problems (Word Problems maker 2026-11-02, NEW-TEMPLATES §50 T1; 1.OA.A.1 compare with an unknown
 * difference, 2.OA.A.1; de "Vergleichsaufgaben"): how many more / how many fewer stories, each with the two amounts drawn
 * as two rows of pictures side by side (the bar-model picture) and a box for the difference. A face of the Word Problems
 * engine (G1-213 _levelSet: the native compare frames of data/word-problems/word-problems-levelset.json, the reviewed
 * noun allow-list, {Q} agreement, fr elision, its interactive screen) with every story a compare story; this face has no
 * published page, so every level is built by the Level Set path.
 * Levels: 1 two stories within 10 · 2 two stories within 20 · 3 three stories within 20.
 */
'use strict';
const base = require('./G1-213-word-problems.js');

module.exports = {
  ...base,
  id: 'G1-511',
  slug: 'compare-word-problems',
  difficulty: {
    1: { max: 10, iconMax: 10, problems: 2, kinds: ['compare', 'compare'], newPage: true },
    2: { max: 20, iconMax: 14, problems: 2, kinds: ['compare', 'compare'], newPage: true },
    3: { max: 20, iconMax: 14, problems: 3, kinds: ['compare', 'compare', 'compare'], iconPx: 28, thinkH: 44, newPage: true },
  },
  i18n: { en: { title: 'Compare Word Problems', instruction: 'Read each story. Compare the two rows of pictures. Write how many more or how many fewer in the box.' } },
  // no published page: every level is a Level Set page
  build({ theme, difficulty, locale }, ctx) {
    return this._levelSet(this.difficulty[difficulty] || this.difficulty[2], theme, (locale || 'en').slice(0, 2), ctx || {});
  },
};
