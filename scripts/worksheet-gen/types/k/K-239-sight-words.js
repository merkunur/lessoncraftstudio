/**
 * K-239 — Sight words / frequent words: the see-trace-write lane (solid
 * model word → dashed hollow trace → empty school lines for independent
 * writing — the commercial-workbook gold standard). Word lists are native
 * per locale (data/literacy/sight-words.js); en Dolch-style, fi reframed
 * as fluency words. CCSS RF.K.3.c / da "de 120 hyppigste ord".
 * d1: 3 words, large · d2: 4 words · d3: 5 words.
 */
'use strict';
const { strokeWordLane, writingRow } = require('../../primitives/trace-path.js');
const { SIGHT_WORDS } = require('../../data/literacy/sight-words.js');

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
    // nt20-VAR: `slice` = deterministic word-set window (set N covers indices
    // 4N..4N+words-1) so each variation page owns a stable, distinct word set;
    // base path (no slice) keeps the seeded sample. Refuse when the pool is
    // too short for the requested window — never repeat another set's words.
    let words;
    if (d.slice != null) {
      const start = d.slice * 4;
      if (list.length < start + d.words) {
        throw new Error(`K-239: locale ${loc} pool ${list.length} words < set ${d.slice} window end ${start + d.words}`);
      }
      words = list.slice(start, start + d.words);
    } else {
      // base page samples the ORIGINAL 12-word core — frozen so growing the
      // pool for the set pages never changes the published base deck's draw
      words = rng.sample(list.slice(0, 12), d.words);
    }
    const laneW = 660;
    const lanes = words.map((word) => {
      const lane = strokeWordLane({ text: word, w: laneW, h: d.traceH, glyphH: d.glyphH, reps: d.reps });
      // xHeight: rule the empty row exactly like the trace lane above it
      const wr = writingRow({ w: laneW, h: d.writeH, glyphH: d.glyphH, xHeight: true });
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
        const svg = lane.querySelector('[data-lcs-prim="trace-word"]');
        if (!svg) { fails.push(`lane ${i + 1}: no trace svg`); return; }
        // the word is CENTRELINE strokes, one dashed line per pen stroke —
        // never a stroked font outline (which drew two contours per stem)
        if (svg.querySelectorAll('text').length) fails.push(`lane ${i + 1}: word rendered as <text>, not strokes`);
        if (+svg.dataset.lcsLetters !== [...word].length) {
          fails.push(`lane ${i + 1}: ${svg.dataset.lcsLetters} letters, want ${[...word].length}`);
        }
        const reps = +svg.dataset.lcsReps;
        const perRep = +svg.dataset.lcsStrokes;
        const groups = [...svg.querySelectorAll(':scope > g')];
        if (groups.length !== reps) fails.push(`lane ${i + 1}: ${groups.length} reps, want ${reps}`);
        groups.forEach((g, j) => {
          const paths = [...g.querySelectorAll('path')];
          if (paths.length !== perRep) fails.push(`lane ${i + 1} rep ${j + 1}: ${paths.length} strokes, want ${perRep}`);
          paths.forEach((p) => {
            if (p.getAttribute('fill') !== 'none') fails.push(`lane ${i + 1} rep ${j + 1}: stroke is filled`);
            const dashed = !!p.getAttribute('stroke-dasharray');
            if (j === 0 && dashed) fails.push(`lane ${i + 1}: model is dashed, not solid`);
            if (j > 0 && !dashed) fails.push(`lane ${i + 1} rep ${j + 1}: not dashed`);
          });
        });
        // a word lane carries NO stroke guides — a dot per letter is clutter,
        // and the instruction promises reading and tracing, not stroke order
        if (svg.querySelectorAll('circle, polygon').length) {
          fails.push(`lane ${i + 1}: word lane must carry no start dots or arrows`);
        }
        if (svg.querySelectorAll('line').length < 3) fails.push(`lane ${i + 1}: missing school lines`);
        // the independent-writing row must exist and be empty
        if (!lane.querySelector('[data-lcs-prim="writing-row"]')) fails.push(`lane ${i + 1}: no writing row`);
      });
      return fails;
    });
  },
};
