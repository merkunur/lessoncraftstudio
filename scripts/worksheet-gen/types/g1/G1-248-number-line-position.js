/**
 * G1-248 — Where on the Number Line? (nt20-B; `number-lines` REUSE, G1,
 * 1.NBT.A.1 — Zahlenstrahl beschriften / droite graduée / getallenlijn).
 * A number line with only landmark labels (0, 5, 10, 15, 20). Coral arrows
 * point at unlabelled ticks, each with an empty dashed box above: what
 * number lives here? Position given → numeral wanted (the inverse of
 * G1-138). d1 0-10, 3 lines × 2 · d2 0-20, 4 × 3 · d3 0-100 by 5s, 4 × 3.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const numberLine = require('../../primitives/number-line.js');

module.exports = {
  id: 'G1-248',
  slug: 'where-on-the-number-line',
  gradeBand: 'G1',
  assetClass: 'geometry',
  exerciseType: 'number-lines',
  themeAxis: { applicable: false },
  difficulty: {
    1: { lines: 3, max: 10, tick: 1, label: 5, pointers: 2, gap: 2 },
    2: { lines: 4, max: 20, tick: 1, label: 5, pointers: 3, gap: 3 },
    3: { lines: 4, max: 100, tick: 5, label: 2, pointers: 2, gap: 3 },
  },
  i18n: {
    en: {
      title: 'Where on the Number Line?',
      instruction: 'Each arrow points to a tick mark. Count on from the number before it and write the number in the box.',
    },
  },

  build({ difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const usedPage = new Set();
    const cards = [];
    for (let i = 0; i < d.lines; i++) {
      const ticks = [];
      // `min` comes from the CONFIG so a line can start somewhere other than zero.
      // Every shipped face starts at 0, which lets a child always fall back on
      // counting from the start; a line beginning at 40 removes that escape and
      // forces the landmark strategy.
      // ⚠ THE LABEL TEST MUST BE RELATIVE TO min. `tickRow` in primitives/_svg.js
      // decides what to print with `Math.round((v - min) / tickStep) % labelEvery`,
      // so the old absolute `(v / d.tick) % d.label` agrees with the render only
      // when min is 0 or decade-aligned — a coincidence, not a contract, and it
      // would silently list printed labels as pointer candidates.
      const lo = d.min || 0;
      for (let v = lo; v <= d.max; v += d.tick) if (((v - lo) / d.tick) % d.label !== 0 && v !== lo && v !== d.max) ticks.push(v);
      let picks = null, guard = 0;
      while (!picks && guard++ < 200) {
        const fresh = ticks.filter((v) => !usedPage.has(v));
        const cand = rng.sample(fresh.length >= d.pointers * 2 ? fresh : ticks, d.pointers).sort((a, b) => a - b);
        if (cand.length < d.pointers) break;
        if (cand.some((v, k) => k && (v - cand[k - 1]) / d.tick < d.gap)) continue;
        picks = cand;
      }
      if (!picks) throw new Error('G1-248: cannot place pointers');
      picks.forEach((v) => usedPage.add(v));
      const nl = numberLine({ min: lo, max: d.max, tickStep: d.tick, labelEvery: d.label, width: 560, pointers: picks.map((value) => ({ value })) });
      cards.push(`<div class="ws-card-stage">${nl.svg}</div>`);
    }
    return { bodyHtml: cardGrid({ cards, cols: 1, rows: d.lines }), meta: {} };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const lines = [...document.querySelectorAll('[data-lcs-prim="number-line"]')];
      if (lines.length < 3) fails.push(`only ${lines.length} lines`);
      const all = new Set();
      lines.forEach((l, i) => {
        const labels = new Set([...l.querySelectorAll('[data-lcs-ticklabel]')].map((t) => +t.dataset.lcsTicklabel));
        const ticks = [...l.querySelectorAll('[data-lcs-tick]')];
        if (labels.size >= ticks.length) fails.push(`line ${i + 1}: every tick labelled (answers printed)`);
        const ptrs = [...l.querySelectorAll('[data-lcs-pointer]')];
        if (ptrs.length < 2) fails.push(`line ${i + 1}: ${ptrs.length} pointers`);
        const vals = ptrs.map((p) => +p.dataset.lcsPointer).sort((a, b) => a - b);
        ptrs.forEach((p) => {
          const v = +p.dataset.lcsPointer;
          if (labels.has(v)) fails.push(`line ${i + 1}: pointer ${v} is a printed label`);
          if (+p.dataset.lcsAnswer !== v) fails.push(`line ${i + 1}: answer stamp != pointer`);
          if (all.has(v)) fails.push(`line ${i + 1}: value ${v} repeated on the page`);
          all.add(v);
          const tick = l.querySelector(`[data-lcs-tick="${v}"]`);
          const arrow = l.querySelector(`[data-lcs-pointer-arrow="${v}"]`);
          if (!tick || !arrow) { fails.push(`line ${i + 1}: pointer ${v} has no tick/arrow`); return; }
          if (Math.abs(+tick.getAttribute('x1') - +arrow.getAttribute('x1')) > 1) fails.push(`line ${i + 1}: arrow ${v} misses its tick`);
        });
        const step = ticks.length > 1 ? Math.abs(+ticks[1].dataset.lcsTick - +ticks[0].dataset.lcsTick) : 1;
        vals.forEach((v, k) => { if (k && (v - vals[k - 1]) / step < 2) fails.push(`line ${i + 1}: pointers too close`); });
      });
      return fails;
    });
  },
};
