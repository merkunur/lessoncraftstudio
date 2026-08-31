/**
 * K-238 — Capital letter tracing (hollow dashed outlines on school lines;
 * one solid model then dashed repetitions). Per-locale letter sets — the d3
 * page features the locale's OWN letters (Ä Ö Ü / Å Ä Ö / Æ Ø Å / Ñ …),
 * the page an English-only competitor cannot print. pt "alfabeto
 * pontilhado" / de "Buchstaben nachspuren".
 * d1: A-D large · d2: A-F ladder · d3: specials + continuation letters.
 */
'use strict';
const { glyphLane } = require('../../primitives/trace-path.js');
const { LETTER_SETS } = require('../../data/tracing/letter-sets.js');

module.exports = {
  id: 'K-238',
  slug: 'letter-tracing-capitals',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'letter-tracing',
  themeAxis: { applicable: false },
  difficulty: {
    1: { count: 4, glyphH: 104, laneH: 152, reps: 4, from: 0 },
    2: { count: 6, glyphH: 74, laneH: 108, reps: 5, from: 0 },
    3: { count: 6, glyphH: 74, laneH: 108, reps: 5, from: 'specials' },
  },
  i18n: {
    en: {
      title: 'Trace the Capital Letters',
      instruction: 'Trace each letter, then try one on your own on the empty line.',
    },
  },

  build({ difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    void ctx;
    const set = LETTER_SETS[(locale || 'en').slice(0, 2)] || LETTER_SETS.en;
    let letters;
    if (d.from === 'specials') {
      const rest = set.alphabet.filter((c) => !set.specials.includes(c));
      letters = [...set.specials, ...rest.slice(6, 6 + d.count)].slice(0, d.count);
    } else {
      letters = set.alphabet.slice(d.from, d.from + d.count);
    }
    const laneW = 660;
    const lanes = letters.map((ch) => {
      const lane = glyphLane({ text: ch, w: laneW, h: d.laneH, glyphH: d.glyphH, reps: d.reps });
      return `<div class="ws-trace-lane" style="display:flex;justify-content:center" data-lcs-letter="${ch}">${lane.svg}</div>`;
    });
    return {
      bodyHtml: `<div style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly">${lanes.join('')}</div>`,
      meta: {},
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const lanes = document.querySelectorAll('[data-lcs-letter]');
      if (lanes.length < 4) fails.push(`only ${lanes.length} lanes`);
      const seen = new Set();
      lanes.forEach((lane, i) => {
        const ch = lane.dataset.lcsLetter;
        if (seen.has(ch)) fails.push(`lane ${i + 1}: duplicate letter`);
        seen.add(ch);
        const svg = lane.querySelector('[data-lcs-prim="trace-glyph"]');
        if (!svg) { fails.push(`lane ${i + 1}: no glyph svg`); return; }
        const texts = [...svg.querySelectorAll('text')];
        if (texts.length !== +svg.dataset.lcsReps) fails.push(`lane ${i + 1}: ${texts.length} reps`);
        texts.forEach((t, j) => {
          if (t.textContent !== ch) fails.push(`lane ${i + 1}: glyph text mismatch`);
          const solid = t.getAttribute('fill') !== 'none';
          if (j === 0 && !solid) fails.push(`lane ${i + 1}: model not solid`);
          if (j > 0 && solid) fails.push(`lane ${i + 1} rep ${j + 1}: not hollow`);
          if (j > 0 && !t.getAttribute('stroke-dasharray')) fails.push(`lane ${i + 1} rep ${j + 1}: not dashed`);
        });
        if (svg.querySelectorAll('line').length < 3) fails.push(`lane ${i + 1}: missing school lines`);
      });
      return fails;
    });
  },
};
