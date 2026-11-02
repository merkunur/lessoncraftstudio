/** G1-482 — Count and Graph the Scene (Graphs & Data maker, 2026-11-02; graph-tasks mode scene-fill; replaces the old
 *  chart-count app): count each kind of picture in the mixed field, then colour one box for each in the graph.
 *  Level 1: three kinds, up to 5 each · level 2: three kinds, up to 8 · level 3: four kinds, up to 9. 1.MD.C.4. */
'use strict';
const { makeGraphType } = require('../_shared/graph-tasks.js');
module.exports = makeGraphType({
  id: 'G1-482', slug: 'count-and-graph-the-scene', mode: 'scene-fill',
  difficulty: { 1: { cats: 3, maxN: 5 }, 2: { cats: 3, maxN: 8 }, 3: { cats: 4, maxN: 9 } },
  i18n: { en: { title: "Count, Then Graph", instruction: "Count each kind of picture. Color one box in the graph for each one you count." } },
});
