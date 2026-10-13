/**
 * K-253 — Teen number tracing 11 to 20 (nt20-VAR). Every lane is a
 * two-glyph pair lane (strokeGlyphPairLane): the teen-numbers page — a
 * classic K search face ("teen numbers tracing") and the natural next step
 * after 0-9. Same per-locale digit forms as K-237.
 */
'use strict';
const { digitFadeLane, strokeGlyphPairLane } = require('../../primitives/trace-path.js');
const { FORMS, FORM_BY_LOCALE, BOX } = require('../../data/tracing/digit-strokes.js');

const D = { glyphH: 52, laneH: 71, reps: 5 };

module.exports = {
  id: 'K-253',
  slug: 'teen-number-tracing-11-20',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'number-tracing',
  themeAxis: { applicable: false },
  // Level Set 2026-10-13: L1 every slot traced from its own dot · L2 published · L3 fade (trace, start dot only, two blank)
  difficulty: {
    1: { glyphH: 52, laneH: 71, modes: ['model', 'trace', 'trace', 'trace', 'trace'] },
    2: { ...D },
    3: { glyphH: 52, laneH: 71, modes: ['model', 'trace', 'dot', 'empty', 'empty'] },
  },
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
    if (d.modes) {
      // Level Set fading lanes (new pages only); the published d2 keeps the lanes below byte for byte
      for (let n = 11; n <= 20; n++) {
        const glyphs = n < 10 ? [form[n]] : [form[Math.floor(n / 10)], form[n % 10]];
        const lane = digitFadeLane({ glyphs, box: BOX, w: laneW, h: d.laneH, glyphH: d.glyphH, modes: d.modes, number: n, label: `trace number ${n}` });
        lanes.push(`<div class="ws-trace-lane" style="display:flex;justify-content:center" data-lcs-digit-lane="${n}">${lane.svg}</div>`);
      }
      return { bodyHtml: `<div style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly">${lanes.join('')}</div>`, meta: {} };
    }
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
    // Level Set fading pages: K-237's mode-aware check, plus the full range in order
    if (await page.$('[data-lcs-prim="trace-number"]')) {
      const fails = await require('./K-237-number-tracing.js').verify(page);
      const got = await page.evaluate(() => [...document.querySelectorAll('[data-lcs-digit-lane]')].map((l) => +l.dataset.lcsDigitLane).join(','));
      if (got !== Array.from({ length: 10 }, (_, k) => k + 11).join(',')) fails.push(`lanes ${got}, want 11-20 in order`);
      return fails;
    }
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
