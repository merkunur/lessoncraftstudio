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
      // filler letters may not repeat a special or any letter INSIDE one
      // (nl: the IJ digraph would otherwise sit beside bare I and J lanes)
      const rest = set.alphabet.filter((c) => !set.specials.some((s) => s === c || s.includes(c)));
      // nt20-VAR: locales with no special capitals (en, it) get the vowels —
      // a real query face — instead of a degenerate duplicate of the G-L page
      const feature = set.specials.length ? set.specials : ['A', 'E', 'I', 'O', 'U'].filter((v) => set.alphabet.includes(v));
      letters = set.specials.length
        ? [...feature, ...rest.slice(6, 6 + d.count)].slice(0, d.count)
        : feature;
    } else {
      // nt20-VAR: `pool:'rest'` slices the base alphabet with the locale's own
      // letters removed (they own the specials page); `toEnd` covers to the
      // pool's end (min 6 / max 9 lanes), clamped so short alphabets (it: 21
      // letters) still render a full page instead of a 3-lane verify() fail.
      const pool = d.pool === 'rest' ? set.alphabet.filter((c) => !set.specials.includes(c)) : set.alphabet;
      let from = d.from;
      let count = d.count;
      if (d.toEnd) {
        count = Math.min(9, Math.max(6, pool.length - from));
        from = Math.max(0, Math.min(from, pool.length - count));
      } else {
        from = Math.min(from, Math.max(0, pool.length - count));
      }
      letters = pool.slice(from, from + count);
    }
    const laneW = 660;
    const lanes = letters.map((ch) => {
      // last slot stays empty — the "try one on your own" spot the instruction promises
      const lane = glyphLane({ text: ch, w: laneW, h: d.laneH, glyphH: d.glyphH, reps: d.reps, emptyLast: true });
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
        // the promised "try one on your own" empty slot must exist
        if (!svg.hasAttribute('data-lcs-empty-slot')) fails.push(`lane ${i + 1}: no empty writing slot`);
      });
      return fails;
    });
  },
};
