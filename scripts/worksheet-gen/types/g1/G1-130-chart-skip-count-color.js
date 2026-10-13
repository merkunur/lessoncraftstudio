/**
 * G1-130 — Hundreds chart: color the skip-count path. The first two
 * numbers of the path come pre-colored as the example; the child colors the rest.
 *
 * Level Set 2026-10-13 (PDF + interactive + key). Every copy is its own path (step + where it starts), so no two copies
 * ask the same thing; the two coloured boxes always show it (the instruction stays true):
 *   level 1 the tens — from 10, or from 3 (3, 13, 23 …), 7, 5, 1: a straight column down the chart
 *   level 2 copy 1 the published page (the fives from 5); the other copies fives from 2 / 4 / 1 and twos from 2 / 1
 *   level 3 threes, fours, sixes, nines and elevens — diagonal and zig-zag paths
 * Screen: tap every number of the path (tap-select, the chart shown five numbers a line so a box is big enough to tap;
 * the two example boxes coloured and not tappable). Key: the whole path coloured.
 */
'use strict';
const hundredsChart = require('../../primitives/hundreds-chart.js');
const NCS = require('../../lib/number-charts-screen.js');

const PLANS = {
  1: [[10, 10], [10, 3], [10, 7], [10, 5], [10, 1], [10, 9]],
  2: [[5, 5], [5, 2], [2, 2], [5, 4], [2, 1], [5, 1]],
  3: [[3, 3], [4, 4], [9, 9], [11, 11], [6, 6], [3, 1]],
};

module.exports = {
  id: 'G1-130',
  slug: 'hundreds-chart-skip-counting',
  gradeBand: 'G1',
  assetClass: 'numeral-charts',
  exerciseType: 'number-charts',
  themeAxis: { applicable: false },
  difficulty: {
    1: { step: 10 },
    2: { step: 5 },
    3: { step: 3 },
  },
  interactive: NCS.interactiveFor('select', 'path'),
  i18n: {
    en: {
      title: 'Color the Counting Path',
      instruction: 'Two boxes are colored to start you off. Color every number in the same counting pattern.',
    },
  },
  levelSetWords(m) { return [`s${m.step}`, `f${m.first}`]; },

  build(args, ctx) {
    const { difficulty } = args;
    const copy = Number(ctx && ctx.variant) || 1;
    const plans = PLANS[difficulty];
    const [step, first] = plans[(copy - 1) % plans.length];
    const path = []; for (let v = first; v <= 100; v += step) path.push(v);
    const keyAll = !!(ctx && ctx.answerKey && !ctx.interactive);
    const chart = hundredsChart({ start: 1, end: 100, highlights: keyAll ? path : [path[0], path[1]], cell: 60 });
    // the published page (step 5 from 5) carries only its step, as it always did
    const off = first === step ? '' : ` data-lcs-first="${first}"`;
    const b = {
      bodyHtml:
        `<div data-ws-content style="flex:1 1 auto;display:flex;align-items:center;justify-content:center" data-lcs-skipstep="${step}"${off}>` +
        chart.svg + `</div>`,
      meta: { step, first },
    };
    if (ctx && ctx.interactive) {
      const items = [];
      for (let v = 1; v <= 100; v++) items.push({ v, given: v === path[0] || v === path[1], hit: path.includes(v), meta: { 'data-lcs-rule': `${step}:${first}` } });
      const loc = (args.locale || 'en').slice(0, 2);
      return { bodyHtml: NCS.selectScreen(items, loc + '/' + copy, { cols: 5, cell: 104 }), meta: b.meta };
    }
    return b;
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const wrap = document.querySelector('[data-lcs-skipstep]');
      if (!wrap) return document.querySelector('[data-lcs-screen]') ? fails : ['no chart'];
      const step = parseInt(wrap.dataset.lcsSkipstep, 10);
      const first = wrap.dataset.lcsFirst ? parseInt(wrap.dataset.lcsFirst, 10) : step;
      const his = [...wrap.querySelectorAll('[data-lcs-highlight]')].map((e) => parseInt(e.dataset.lcsHighlight, 10));
      if (his.length < 2) fails.push(`${his.length} example highlights (want 2)`);
      his.forEach((v) => { if (v < first || (v - first) % step !== 0) fails.push(`highlight ${v} not on the path ${first} + ${step}·n`); });
      if (his.length === 2 && his[1] - his[0] !== step) fails.push('the two example boxes are not one step apart');
      const cells = wrap.querySelectorAll('[data-lcs-cell]').length;
      if (cells !== 100) fails.push(`${cells} numerals != 100 (chart must be complete — nothing blank)`);
      return fails;
    });
  },
};
