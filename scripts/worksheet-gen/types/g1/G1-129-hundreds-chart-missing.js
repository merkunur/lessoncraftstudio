/**
 * G1-129 — Hundreds chart: fill in the missing numbers.
 * Asset class 2 exemplar (numeral strips & charts) — the densest text grid.
 * Theme rides only in the corner flourish; the chart is the content.
 */
'use strict';
const hundredsChart = require('../../primitives/hundreds-chart.js');
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');

module.exports = {
  id: 'G1-129',
  slug: 'hundreds-chart-missing-numbers',
  gradeBand: 'G1',
  assetClass: 'numeral-charts',
  exerciseType: 'number-charts',
  themeAxis: { applicable: true, minNouns: 2, decorative: true },
  difficulty: {
    1: { start: 1, end: 50, missing: 8 },
    2: { start: 1, end: 100, missing: 12 },
    3: { start: 1, end: 100, missing: 20 },
  },
  i18n: {
    en: {
      title: 'The Hundreds Chart',
      instruction: 'Some numbers are hiding. Write each missing number in its box.',
    },
  },

  build({ theme, difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const all = [];
    for (let v = d.start + 1; v < d.end; v++) all.push(v);   // never blank the anchors
    const missing = rng.sample(all, d.missing).sort((a, b) => a - b);
    const cell = d.end <= 50 ? 64 : 60;
    const chart = hundredsChart({ start: d.start, end: d.end, missing, cell });

    // two small theme flourishes flank the chart bottom — decoration only
    const ns = rng.sample(labelSafeNouns(theme), 2);
    const flourish = (n, flip) =>
      `<img class="ws-icon" src="${fileUri(theme, n.noun)}" alt="" style="width:54px;height:54px${flip ? ';transform:scaleX(-1)' : ''}">`;

    return {
      bodyHtml:
        `<div style="flex:1 1 auto;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;min-height:0">` +
        chart.svg +
        `<div style="display:flex;justify-content:space-between;width:${chart.width}px;padding:0 6px">` +
        flourish(ns[0], false) + flourish(ns[1], true) +
        `</div></div>`,
      meta: chart.meta,
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const svg = document.querySelector('[data-lcs-prim="hundreds-chart"]');
      const start = parseInt(svg.dataset.lcsStart, 10), end = parseInt(svg.dataset.lcsEnd, 10);
      const cells = [...svg.querySelectorAll('[data-lcs-cell]')].map((e) => parseInt(e.dataset.lcsCell, 10));
      const missing = [...svg.querySelectorAll('[data-lcs-missing]')].map((e) => parseInt(e.dataset.lcsMissing, 10));
      // every value start..end appears exactly once, as numeral XOR blank
      const seen = new Set();
      [...cells, ...missing].forEach((v) => {
        if (seen.has(v)) fails.push(`value ${v} appears twice`);
        seen.add(v);
      });
      for (let v = start; v <= end; v++) if (!seen.has(v)) fails.push(`value ${v} absent`);
      cells.forEach((v) => { if (missing.includes(v)) fails.push(`value ${v} both numeral and blank`); });
      // numerals visibly correct: each label's text equals its declared value
      svg.querySelectorAll('[data-lcs-cell]').forEach((e) => {
        if (e.textContent.trim() !== e.dataset.lcsCell) fails.push(`cell text ${e.textContent} != ${e.dataset.lcsCell}`);
      });
      return fails;
    });
  },
};
