/** G1-481 — Our Class Graph (Graphs & Data maker, 2026-11-02; graph-tasks mode survey): the class's own data — a tally
 *  line per picture to fill as the children answer, then an empty bar graph to colour from the tallies. Material: no
 *  right answer, no key, no screen. 1.MD.C.4 (up to three categories at level 1), 2.MD.D.10, 3.MD.B.3. */
'use strict';
const { makeGraphType } = require('../_shared/graph-tasks.js');
module.exports = makeGraphType({
  id: 'G1-481', slug: 'our-class-graph', mode: 'survey',
  difficulty: { 1: { cats: 3, maxN: 8 }, 2: { cats: 4, maxN: 10 }, 3: { cats: 5, maxN: 12 } },
  i18n: { en: { title: "Our Class Graph", instruction: "Ask 8 classmates which one they like best. Make a tally mark next to their choice. Then color one box in the graph for each mark." } },
});
