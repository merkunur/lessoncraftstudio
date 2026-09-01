/**
 * K-253 — Teen number tracing 11 to 20 (nt20-VAR). Every lane is a
 * two-glyph pair lane (strokeGlyphPairLane): the teen-numbers page — a
 * classic K search face ("teen numbers tracing") and the natural next step
 * after 0-9. Same per-locale digit forms as K-237.
 */
'use strict';
const { strokeGlyphPairLane } = require('../../primitives/trace-path.js');
const { FORMS, FORM_BY_LOCALE, BOX } = require('../../data/tracing/digit-strokes.js');

const D = { glyphH: 52, laneH: 71, reps: 5 };

module.exports = {
  id: 'K-253',
  slug: 'teen-number-tracing-11-20',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'number-tracing',
  themeAxis: { applicable: false },
  difficulty: { 1: { ...D }, 2: { ...D }, 3: { ...D } },
  i18n: {
    en: {
      title: 'Trace the Teen Numbers 11 to 20',
      instruction: 'Trace each number. Start at the orange dot and follow the arrows.',
    },
  },

  build({ difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const form = FORMS[FORM_BY_LOCALE[(locale || 'en').slice(0, 2)] || 'continental'];
    void ctx;
    const laneW = 660;
    const lanes = [];
    for (let n = 11; n <= 20; n++) {
      const lane = strokeGlyphPairLane({
        tens: form[Math.floor(n / 10)], ones: form[n % 10], box: BOX,
        w: laneW, h: d.laneH, glyphH: d.glyphH, reps: d.reps, label: `trace number ${n}`,
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
      let expect = 11;
      lanes.forEach((lane) => {
        const n = +lane.dataset.lcsNumberLane;
        if (n !== expect++) fails.push(`lane order broken at ${n}`);
        const svg = lane.querySelector('[data-lcs-prim="trace-digit-pair"]');
        if (!svg) { fails.push(`lane ${n}: no pair svg`); return; }
        const reps = +svg.dataset.lcsReps;
        const strokes = +svg.dataset.lcsStrokes;
        const paths = svg.querySelectorAll('path');
        if (paths.length !== reps * strokes) fails.push(`lane ${n}: ${paths.length} paths != ${reps}×${strokes}`);
        const dashed = [...paths].filter((p) => p.getAttribute('stroke-dasharray'));
        if (dashed.length !== (reps - 1) * strokes) fails.push(`lane ${n}: dashed count wrong`);
        if (svg.querySelectorAll('line').length < 3) fails.push(`lane ${n}: missing school lines`);
        if (!svg.querySelector('circle')) fails.push(`lane ${n}: no start dot`);
      });
      return fails;
    });
  },
};
