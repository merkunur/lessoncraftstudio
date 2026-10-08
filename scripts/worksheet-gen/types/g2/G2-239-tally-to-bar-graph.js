/**
 * G2-239 — Complete the bar graph from the tally chart (class-8 exemplar).
 * Tally rows with icon labels feed an EMPTY gridded graph the child fills.
 * Since the 2026-10-08 page redesign it is the graph-tasks factory's 'tally-fill' mode (same draws, same numbers):
 * the tally cards across the top, a full-width graph below.
 */
'use strict';
const { makeGraphType } = require('../_shared/graph-tasks.js');
module.exports = makeGraphType({
  id: 'G2-239', slug: 'tally-to-bar-graph', mode: 'tally-fill', gradeBand: 'G23',
  difficulty: {
    1: { cats: 3, maxN: 6 },
    2: { cats: 4, maxN: 8 },
    3: { cats: 4, maxN: 10 },
  },
  i18n: { en: { title: 'Tally to Graph', instruction: 'Read the tally chart. Color one bar for each count.' } },
});
