/**
 * K-642 — Draw and Solve (Year pages M, 2026-11-13; K.OA.A.2: solve addition and subtraction word problems within 10
 * with objects or drawings). Two stories a page; the teacher reads a story aloud, the child draws it in the large empty
 * box and writes the answer. Nothing is counted for the child: beside the story stands ONE picture of the thing.
 * A face of the Word Problems engine (G1-213 _levelSet with `draw`: the native story frames, the reviewed noun
 * allow-list, the same number draw); it has no published page and no screen, so every level is a Level Set page.
 * Levels: 1 two stories in which some more come, totals to 6 · 2 two stories in which some go away, within 10 · 3 one
 * of each, within 10. (A level per kind of story: the Swedish förskoleklass unit teaches "some come", "some go" and
 * "solve the problem" in three lessons, each on its level; no page prints a plus or a minus sign.)
 */
'use strict';
const base = require('../g1/G1-213-word-problems.js');

module.exports = {
  ...base,
  id: 'K-642',
  slug: 'draw-and-solve',
  gradeBand: 'K',
  interactive: false,
  difficulty: {
    1: { max: 6, iconMax: 6, problems: 2, kinds: ['add', 'add'], newPage: true, draw: true },
    2: { max: 10, iconMax: 10, problems: 2, kinds: ['sub', 'sub'], newPage: true, draw: true },
    3: { max: 10, iconMax: 10, problems: 2, kinds: ['add', 'sub'], newPage: true, draw: true },
  },
  i18n: { en: { title: 'Draw and Solve', instruction: 'Listen to each story. Draw it in the box. Write the answer.' } },
  build({ theme, difficulty, locale }, ctx) {
    return this._levelSet(this.difficulty[difficulty] || this.difficulty[2], theme, (locale || 'en').slice(0, 2), ctx || {});
  },
};
