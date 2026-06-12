/**
 * G2-239 — Complete the bar graph from the tally chart (class-8 exemplar).
 * Tally rows with icon labels feed an EMPTY gridded graph the child fills.
 */
'use strict';
const tallyPrim = require('../../primitives/tally.js');
const barGraph = require('../../primitives/bar-graph.js');
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');

module.exports = {
  id: 'G2-239',
  slug: 'tally-to-bar-graph',
  gradeBand: 'G23',
  assetClass: 'graphs',
  exerciseType: 'graphing-data',
  themeAxis: { applicable: true, minNouns: 4 },
  difficulty: {
    1: { cats: 3, maxN: 6 },
    2: { cats: 4, maxN: 8 },
    3: { cats: 4, maxN: 10 },
  },
  i18n: {
    en: { title: 'Tally to Graph', instruction: 'Read the tally chart. Color one bar for each count.' },
  },

  build({ theme, difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const nouns = rng.sample(labelSafeNouns(theme), d.cats);
    const values = [];
    const usedV = new Set();
    for (let i = 0; i < d.cats; i++) {
      let v, guard = 0;
      do { v = rng.int(1, d.maxN); guard++; } while (usedV.has(v) && guard < 20);
      usedV.add(v);
      values.push(v);
    }

    const tallyRows = nouns.map((n, i) =>
      `<div style="display:flex;align-items:center;gap:18px;background:#FFFFFF;border:2px solid #F0E4CB;border-radius:12px;padding:8px 16px" data-lcs-tallycat="${i}" data-lcs-catn="${values[i]}">` +
      `<img class="ws-icon" src="${fileUri(theme, n.noun)}" alt="" style="width:42px;height:42px">` +
      tallyPrim({ n: values[i], strokeH: 34 }).svg + `</div>`).join('');

    // empty graph: same categories, all bars at 0 (the child colors)
    const graph = barGraph({
      values: values.map(() => 0),
      iconHrefs: nouns.map((n) => fileUri(theme, n.noun)),
      yMax: d.maxN,
      w: 380, h: 430,
    });

    return {
      bodyHtml:
        `<div style="flex:1 1 auto;display:flex;gap:20px;align-items:center;min-height:0" data-lcs-values="${values.join(',')}">` +
        `<div style="display:flex;flex-direction:column;gap:14px;flex:1 1 0">${tallyRows}</div>` +
        `<div class="ws-scene" style="flex:0 0 auto;padding:12px">${graph.svg}</div>` +
        `</div>`,
      meta: { values },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const wrap = document.querySelector('[data-lcs-values]');
      const values = wrap.dataset.lcsValues.split(',').map(Number);
      wrap.querySelectorAll('[data-lcs-tallycat]').forEach((row, i) => {
        const n = +row.dataset.lcsCatn;
        if (n !== values[i]) fails.push(`row ${i + 1}: declared ${n} != ${values[i]}`);
        const strokes = row.querySelectorAll('[data-lcs-stroke]').length;
        if (strokes !== n) fails.push(`row ${i + 1}: ${strokes} tally strokes != ${n}`);
      });
      const svg = wrap.querySelector('[data-lcs-prim="bar-graph"]');
      const yMax = +svg.dataset.lcsYmax;
      if (Math.max(...values) > yMax) fails.push('a value exceeds the graph scale');
      svg.querySelectorAll('[data-lcs-bar]').forEach((b) => {
        if (+b.dataset.lcsBar !== 0) fails.push('graph must start empty');
      });
      if (svg.querySelectorAll('[data-lcs-caticon]').length !== values.length) fails.push('category icons missing');
      return fails;
    });
  },
};
