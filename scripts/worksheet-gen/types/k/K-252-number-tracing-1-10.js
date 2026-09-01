/**
 * K-252 — Number tracing 1 to 10 (nt20-VAR). Digits 1-9 on single-glyph
 * lanes, 10 on the two-glyph pair lane (strokeGlyphPairLane) — the page
 * every "numbers 1-10" search wants and the base 0-9 ladder cannot honestly
 * serve. Same per-locale digit forms as K-237.
 */
'use strict';
const { strokeGlyphLane, strokeGlyphPairLane } = require('../../primitives/trace-path.js');
const { FORMS, FORM_BY_LOCALE, BOX } = require('../../data/tracing/digit-strokes.js');

const D = { glyphH: 52, laneH: 71, reps: 5 };

module.exports = {
  id: 'K-252',
  slug: 'number-tracing-1-10',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'number-tracing',
  themeAxis: { applicable: false },
  difficulty: { 1: { ...D }, 2: { ...D }, 3: { ...D } },
  i18n: {
    en: {
      title: 'Trace the Numbers 1 to 10',
      instruction: 'Trace each number. Start at the orange dot and follow the arrows.',
    },
  },

  build({ difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const form = FORMS[FORM_BY_LOCALE[(locale || 'en').slice(0, 2)] || 'continental'];
    void ctx;
    const laneW = 660;
    const lanes = [];
    for (let n = 1; n <= 10; n++) {
      const lane = n < 10
        ? strokeGlyphLane({
            strokes: form[n], box: BOX, w: laneW, h: d.laneH, glyphH: d.glyphH,
            reps: d.reps, label: `trace digit ${n}`,
          })
        : strokeGlyphPairLane({
            tens: form[1], ones: form[0], box: BOX, w: laneW, h: d.laneH,
            glyphH: d.glyphH, reps: d.reps, label: 'trace number 10',
          });
      lanes.push(`<div class="ws-trace-lane" style="display:flex;justify-content:center" data-lcs-number-lane="${n}">${lane.svg}</div>`);
    }
    return {
      bodyHtml: `<div style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly">${lanes.join('')}</div>`,
      meta: {},
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const lanes = document.querySelectorAll('[data-lcs-number-lane]');
      if (lanes.length !== 10) fails.push(`${lanes.length} lanes != 10`);
      lanes.forEach((lane, i) => {
        const n = +lane.dataset.lcsNumberLane;
        const svg = lane.querySelector(n < 10 ? '[data-lcs-prim="trace-digit"]' : '[data-lcs-prim="trace-digit-pair"]');
        if (!svg) { fails.push(`lane ${n}: wrong/missing prim`); return; }
        const reps = +svg.dataset.lcsReps;
        const strokes = +svg.dataset.lcsStrokes;
        const paths = svg.querySelectorAll('path');
        if (paths.length !== reps * strokes) fails.push(`lane ${n}: ${paths.length} paths != ${reps}×${strokes}`);
        const dashed = [...paths].filter((p) => p.getAttribute('stroke-dasharray'));
        if (dashed.length !== (reps - 1) * strokes) fails.push(`lane ${n}: ${dashed.length} dashed != ${(reps - 1) * strokes}`);
        if (svg.querySelectorAll('line').length < 3) fails.push(`lane ${n}: missing school lines`);
        if (!svg.querySelector('circle')) fails.push(`lane ${n}: no start dot`);
      });
      return fails;
    });
  },
};
