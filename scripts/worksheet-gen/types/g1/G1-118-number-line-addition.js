/**
 * G1-118 — Number-line addition: hops drawn from a, land on a+b; the child
 * reads the jumps and completes a + b = []. Asset class 4 exemplar.
 *
 * Level Set 2026-10-13: level 2 is the published draw (below, rng calls unchanged); levels 1 and 3, the screen and the
 * key come from types/_shared/number-line-tasks.js (NLT_LEVELS['G1-118'], mode 'add').
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const NLT = require('../_shared/number-line-tasks.js');
const NLS = require('../../lib/number-lines-screen.js');

const L = NLT.NLT_LEVELS['G1-118'];

module.exports = {
  id: 'G1-118',
  slug: 'number-line-addition',
  gradeBand: 'G1',
  assetClass: 'number-lines',
  exerciseType: 'number-lines',
  themeAxis: { applicable: false },
  difficulty: {
    1: L[1],
    2: { lineMax: 20, rows: 3 },
    3: L[3],
  },
  i18n: {
    en: {
      title: 'Hop Along the Line!',
      instruction: 'Start at the dot. Count the hops. Write the addition answer.',
    },
  },
  interactive: NLS.interactiveFor('sum'),
  levelSetWords(m) { return (m.asks || []).map(String); },

  build(args, ctx) {
    const d = this.difficulty[args.difficulty];
    const rng = ctx.rng;
    let rows;
    if (d.v2) rows = NLT.buildRowsV2('add', d, rng, args.locale);
    else {
      rows = [];
      for (let i = 0; i < d.rows; i++) {
        const a = rng.int(0, d.lineMax - 2);
        const b = rng.int(1, Math.min(6, d.lineMax - a));   // ≤6 hops stay readable
        rows.push({ a, b, to: a + b, line: { min: 0, max: d.lineMax, labelEvery: d.lineMax > 10 ? 2 : 1, width: 540, jumps: [{ from: a, to: a + b }], marks: [a] } });
      }
    }
    const cards = rows.map((r) => NLT.cardOf('add', r));
    const b = { bodyHtml: cardGrid({ cards, cols: 1, rows: d.rows }), meta: { asks: rows.map(NLT.askOf) }, _rows: rows };
    if (ctx && (ctx.interactive || ctx.answerKey)) return NLT.screenOrKey('add', b, args, ctx);
    delete b._rows;
    return b;
  },

  async verify(page) {
    return page.evaluate(NLT.verifyInPage, 'add');
  },
};
