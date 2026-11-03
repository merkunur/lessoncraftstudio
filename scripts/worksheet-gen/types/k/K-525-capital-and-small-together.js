/**
 * K-525 — Capital and Small Letters Together (Letter Tracing maker 2026-11-02, NEW-TEMPLATES §33 T4; RF.K.1.d upper- and
 * lowercase): each line traces a letter's capital and small form side by side (Aa), once solid with its start dots,
 * arrows and stroke order shown on the first traced pair, then dashed, then an empty space — pairing the two forms while
 * writing (K-238 / K-278 trace one case at a time). The letters are the locale's school alphabet in order with its own
 * letters (Ä Ö Ü, Å Ä Ö, Æ Ø Å, Ñ, IJ …; K-238's letter units — ß has no capital and is left out); copies walk the
 * alphabet (copy 1 from A, copy 2 the next letters …). Both letters sit on one baseline under the small-letter lines.
 * Levels: 1 four pairs, big · 2 six pairs · 3 eight pairs, small, two empty spaces to write alone.
 */
'use strict';
const { strokeLetterLane } = require('../../primitives/trace-path.js');
const { letterUnits, unitForms } = require('./K-238-letter-tracing.js');

const D = {
  1: { n: 4, glyphH: 78, laneH: 132, reps: 3, empty: 1 },
  2: { n: 6, glyphH: 62, laneH: 100, reps: 4, empty: 1 },
  3: { n: 8, glyphH: 48, laneH: 78, reps: 5, empty: 2 },
};

module.exports = {
  id: 'K-525',
  slug: 'capital-and-small-letters-together',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'letter-tracing',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Capital and Lowercase Letters Together', instruction: 'Trace each capital letter and its lowercase letter side by side, then write them yourself. Start at the orange dot and follow the arrows.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], L = String(locale || 'en').slice(0, 2);
    const units = letterUnits(L).filter((u) => u !== 'ß');
    const copy = Math.max(1, parseInt(String((ctx && ctx.variant) || 1), 10) || 1);
    const start = ((copy - 1) * d.n) % units.length;
    const letters = Array.from({ length: d.n }, (_, i) => units[(start + i) % units.length]);
    const lanes = letters.map((u) => {
      const f = unitForms(u, L), pair = f.cap + f.low;
      const lane = strokeLetterLane({ text: pair, w: 660, h: d.laneH, glyphH: d.glyphH, reps: d.reps, emptyCount: d.empty, lowercase: true });
      return `<div class="ws-trace-lane" style="display:flex;justify-content:center" data-lcs-letter="${pair}">${lane.svg}</div>`;
    });
    return { bodyHtml: `<div data-ws-content style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly" data-lcs-pairs="${letters.join(',')}">${lanes.join('')}</div>`, meta: { letters } };
  },

  async verify(page) {
    // K-238's lane checks (centreline strokes, solid model, dashed reps, guides, badges inside, school lines, empty slot)
    const base = await require('./K-238-letter-tracing.js').verify(page);
    const own = await page.evaluate(() => {
      const out = [];
      const lanes = [...document.querySelectorAll('[data-lcs-letter]')];
      lanes.forEach((l, i) => {
        const t = l.dataset.lcsLetter, svg = l.querySelector('svg');
        if ([...t].length < 2 || t[0] !== t[0].toLocaleUpperCase() || t.slice(-1) !== t.slice(-1).toLocaleLowerCase()) out.push(`lane ${i + 1}: "${t}" is not a capital and its small letter`);
        // every traced pair stays inside its share of the lane (no pair runs into the next)
        const reps = [...svg.querySelectorAll(':scope > g')], box = svg.getBoundingClientRect(), share = box.width / (+svg.dataset.lcsReps + (+svg.dataset.lcsEmptySlot || 0));
        reps.forEach((g, j) => { const r = g.getBoundingClientRect(); if (r.width > share - 6) out.push(`lane ${i + 1} rep ${j + 1}: the pair is wider than its space`); });
      });
      return out;
    });
    return base.concat(own);
  },
};
