/**
 * K-237 — Number tracing 0-9 with PER-LOCALE digit forms: continental
 * hooked 1 + crossed 7 for the 10 non-EN locales, plain forms for en (a
 * German teacher rejects an uncrossed 7 — the exact live platform gap the
 * digit-strokes dataset closes). Centerline stroke paths with direction
 * arrows + stroke-order badges on school lines: one solid teal model, then
 * dashed repetitions. pt "números pontilhados" / de "Zahlen schreiben
 * lernen" / fr "écriture des chiffres GS".
 * d1: 1-5 large · d2: 0-9 full ladder · d3: 0-9 with more repetitions.
 */
'use strict';
const { strokeGlyphLane } = require('../../primitives/trace-path.js');
const { FORMS, FORM_BY_LOCALE, BOX } = require('../../data/tracing/digit-strokes.js');

module.exports = {
  id: 'K-237',
  slug: 'number-tracing-0-9',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'number-tracing',
  themeAxis: { applicable: false },
  difficulty: {
    1: { digits: [1, 2, 3, 4, 5], glyphH: 92, laneH: 128, reps: 4 },
    2: { digits: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], glyphH: 52, laneH: 71, reps: 5 },
    3: { digits: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], glyphH: 52, laneH: 71, reps: 6 },
  },
  i18n: {
    en: {
      title: 'Trace the Numbers 0 to 9',
      instruction: 'Trace each number. Start at the orange dot and follow the arrows.',
    },
  },

  build({ difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const form = FORMS[FORM_BY_LOCALE[(locale || 'en').slice(0, 2)] || 'continental'];
    void ctx;
    const laneW = 660;
    const lanes = d.digits.map((digit) => {
      const lane = strokeGlyphLane({
        strokes: form[digit], box: BOX, w: laneW, h: d.laneH, glyphH: d.glyphH,
        reps: d.reps, label: `trace digit ${digit}`,
      });
      return `<div class="ws-trace-lane" style="display:flex;justify-content:center" data-lcs-digit-lane="${digit}">${lane.svg}</div>`;
    });
    return {
      bodyHtml: `<div style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly">${lanes.join('')}</div>`,
      meta: {},
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const lanes = document.querySelectorAll('[data-lcs-digit-lane]');
      if (lanes.length < 5) fails.push(`only ${lanes.length} lanes`);
      const seen = new Set();
      lanes.forEach((lane, i) => {
        const digit = lane.dataset.lcsDigitLane;
        if (seen.has(digit)) fails.push(`lane ${i + 1}: duplicate digit`);
        seen.add(digit);
        const svg = lane.querySelector('[data-lcs-prim="trace-digit"]');
        if (!svg) { fails.push(`lane ${i + 1}: no glyph svg`); return; }
        const reps = +svg.dataset.lcsReps;
        const strokes = +svg.dataset.lcsStrokes;
        const groups = svg.querySelectorAll('g');
        if (groups.length !== reps) fails.push(`lane ${i + 1}: ${groups.length} reps != ${reps}`);
        groups.forEach((g, j) => {
          const paths = g.querySelectorAll('path');
          if (paths.length !== strokes) fails.push(`lane ${i + 1} rep ${j + 1}: ${paths.length} strokes != ${strokes}`);
          const dashed = [...paths].filter((p) => p.getAttribute('stroke-dasharray'));
          if (j === 0 && dashed.length !== 0) fails.push(`lane ${i + 1}: model is dashed`);
          if (j > 0 && dashed.length !== paths.length) fails.push(`lane ${i + 1} rep ${j + 1}: not fully dashed`);
        });
        // school lines present: ≥3 horizontal rules
        if (svg.querySelectorAll('line').length < 3) fails.push(`lane ${i + 1}: missing school lines`);
        // the first trace rep carries the start dot
        if (!svg.querySelector('circle')) fails.push(`lane ${i + 1}: no start dot`);
      });
      return fails;
    });
  },
};
