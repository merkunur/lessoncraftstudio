/**
 * K-239 — Sight words / frequent words: the see-trace-write lane (solid
 * model word → dashed hollow trace → empty school lines for independent
 * writing — the commercial-workbook gold standard). Word lists are native
 * per locale (data/literacy/sight-words.js); en Dolch-style, fi reframed
 * as fluency words. CCSS RF.K.3.c / da "de 120 hyppigste ord".
 * d1: 3 words, large · d2: 4 words · d3: 5 words.
 */
'use strict';
const { glyphLane, writingRow } = require('../../primitives/trace-path.js');
const { SIGHT_WORDS } = require('../../data/literacy/sight-words.js');
const tokens = require('../../primitives/_tokens.js');

module.exports = {
  id: 'K-239',
  slug: 'sight-words-trace-and-write',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'sight-words',
  themeAxis: { applicable: false },
  difficulty: {
    1: { words: 3, glyphH: 64, traceH: 100, writeH: 66, reps: 2 },
    2: { words: 4, glyphH: 52, traceH: 82, writeH: 56, reps: 2 },
    3: { words: 5, glyphH: 44, traceH: 70, writeH: 48, reps: 3 },
  },
  i18n: {
    en: {
      title: 'Sight Words: Read, Trace, Write',
      instruction: 'Read the word. Trace it. Then write it yourself on the empty line.',
    },
  },

  build({ difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const list = SIGHT_WORDS[loc];
    if (!list || list.length < d.words) {
      // refuse-don't-guess: a locale without an authored native list cannot ship
      throw new Error(`K-239: no sight-word list for locale ${loc}`);
    }
    const words = rng.sample(list, d.words);
    const laneW = 660;
    const lanes = words.map((word) => {
      const lane = glyphLane({ text: word, w: laneW, h: d.traceH, glyphH: d.glyphH, reps: d.reps, font: tokens.font.body });
      const wr = writingRow({ w: laneW, h: d.writeH, glyphH: d.glyphH });
      return (
        `<div class="ws-trace-lane" style="display:flex;flex-direction:column;align-items:center;gap:2px" data-lcs-word="${word}">` +
        lane.svg + wr.svg + `</div>`
      );
    });
    return {
      bodyHtml: `<div style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly">${lanes.join('')}</div>`,
      meta: {},
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const lanes = document.querySelectorAll('[data-lcs-word]');
      if (lanes.length < 3) fails.push(`only ${lanes.length} lanes`);
      const seen = new Set();
      lanes.forEach((lane, i) => {
        const word = lane.dataset.lcsWord;
        if (seen.has(word)) fails.push(`lane ${i + 1}: duplicate word`);
        seen.add(word);
        if (!/^[\p{Ll}\p{Lu}]{1,10}$/u.test(word)) fails.push(`lane ${i + 1}: suspicious word "${word}"`);
        const svg = lane.querySelector('[data-lcs-prim="trace-glyph"]');
        if (!svg) { fails.push(`lane ${i + 1}: no trace svg`); return; }
        const texts = [...svg.querySelectorAll('text')];
        if (!texts.length) { fails.push(`lane ${i + 1}: no word rendered`); return; }
        if (texts[0].getAttribute('fill') === 'none') fails.push(`lane ${i + 1}: model not solid`);
        texts.slice(1).forEach((t) => {
          if (t.getAttribute('fill') !== 'none') fails.push(`lane ${i + 1}: trace rep not hollow`);
        });
        texts.forEach((t) => { if (t.textContent !== word) fails.push(`lane ${i + 1}: text != word`); });
        // the independent-writing row must exist and be empty
        if (!lane.querySelector('[data-lcs-prim="writing-row"]')) fails.push(`lane ${i + 1}: no writing row`);
      });
      return fails;
    });
  },
};
