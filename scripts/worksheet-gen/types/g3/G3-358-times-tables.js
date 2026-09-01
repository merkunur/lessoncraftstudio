/**
 * G3-358 — Multiplication tables drill (the "tabuada / Einmaleins / tafels"
 * query face — bare-fact fluency, distinct from the arrays-multiplication
 * concept family). CCSS 3.OA.C.7 / de kleines Einmaleins / nl de tafels.
 * Per-locale conventions honored at BUILD time (the locale reaches build):
 *  - operator glyph: middle dot (·) for de/sv/da/no/fi, × elsewhere
 *  - table mode row order: multiplier-first (1×4, 2×4 …) — the native
 *    "tafel van 4" / Einmaleins-Reihe column form everywhere it applies
 * d1: one table in order (ladder) · d2: mixed facts 2-10 · d3: missing factor.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { answerBox } = require('../../templates/components.js');

const DOT_LOCALES = new Set(['de', 'sv', 'da', 'no', 'fi']);

const NUM = (v) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:28px;color:#3A3530">${v}</span>`;
const OPX = (g) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:26px;color:#146B5E">${g}</span>`;
const EQ = () => `<span style="font-family:'Baloo 2';font-weight:700;font-size:26px;color:#8A8276">=</span>`;

module.exports = {
  id: 'G3-358',
  slug: 'multiplication-tables-drill',
  gradeBand: 'G3',
  assetClass: 'numeral-charts',
  exerciseType: 'multiplication-tables',
  themeAxis: { applicable: false },
  difficulty: {
    1: { mode: 'table', cards: 10, cols: 2, rows: 5 },
    2: { mode: 'mixed', cards: 12, cols: 3, rows: 4 },
    3: { mode: 'missing', cards: 12, cols: 3, rows: 4 },
  },
  i18n: {
    en: {
      title: 'Times Tables Practice',
      instruction: 'Multiply. Write each product in the box.',
    },
  },

  build({ difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const glyph = DOT_LOCALES.has((locale || 'en').slice(0, 2)) ? '·' : '×';
    const cards = [];

    if (d.mode === 'table') {
      // nt20-VAR: d.table pins the table (the per-table query pages: tabuada
      // do 2, 2er-Einmaleins, table de 2…); default keeps the seeded pick
      const table = d.table || rng.int(2, 9);
      for (let k = 1; k <= 10; k++) {
        cards.push(
          `<div class="ws-card-stage" style="gap:10px" data-lcs-a="${k}" data-lcs-b="${table}" data-lcs-mode="table">` +
          NUM(k) + OPX(glyph) + NUM(table) + EQ() + answerBox({ w: 62, h: 46, answer: k * table }) +
          `</div>`
        );
      }
    } else {
      const used = new Set();
      for (let i = 0; i < d.cards; i++) {
        let a, b, guard = 0;
        // dedup UNORDERED (6·3 and 3·6 are one fact — visual-critic finding)
        do { a = rng.int(2, 10); b = rng.int(2, 10); guard++; }
        while (used.has(`${Math.min(a, b)}x${Math.max(a, b)}`) && guard < 150);
        used.add(`${Math.min(a, b)}x${Math.max(a, b)}`);
        if (d.mode === 'mixed') {
          cards.push(
            `<div class="ws-card-stage" style="gap:10px" data-lcs-a="${a}" data-lcs-b="${b}" data-lcs-mode="mixed">` +
            NUM(a) + OPX(glyph) + NUM(b) + EQ() + answerBox({ w: 62, h: 46, answer: a * b }) +
            `</div>`
          );
        } else {
          // missing factor: a × ☐ = product (3.OA.A.4)
          cards.push(
            `<div class="ws-card-stage" style="gap:10px" data-lcs-a="${a}" data-lcs-b="${b}" data-lcs-mode="missing">` +
            NUM(a) + OPX(glyph) + answerBox({ w: 56, h: 46, answer: b }) + EQ() + NUM(a * b) +
            `</div>`
          );
        }
      }
    }
    return { bodyHtml: cardGrid({ cards, cols: d.cols, rows: d.rows }), meta: {} };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const stages = document.querySelectorAll('[data-lcs-card] [data-lcs-a]');
      if (!stages.length) fails.push('no problems');
      const seen = new Set();
      stages.forEach((st, i) => {
        const a = +st.dataset.lcsA, b = +st.dataset.lcsB, mode = st.dataset.lcsMode;
        const box = st.querySelector('[data-lcs-answer]');
        if (!box) { fails.push(`p${i + 1}: no answer box`); return; }
        const want = mode === 'missing' ? b : a * b;
        if (+box.dataset.lcsAnswer !== want) fails.push(`p${i + 1}: answer != ${want}`);
        if (mode === 'table') {
          if (a !== i + 1) fails.push(`p${i + 1}: table ladder out of order`);
        } else {
          if (seen.has(`${a}x${b}`)) fails.push(`p${i + 1}: duplicate fact`);
          seen.add(`${a}x${b}`);
        }
        // in missing mode the sought factor must not be printed
        const printed = [...st.querySelectorAll(':scope > span')].filter((s) => !s.hasAttribute('data-lcs-answer')).map((s) => s.textContent.trim()).filter((t) => /^\d+$/.test(t));
        if (printed.length !== 2) fails.push(`p${i + 1}: ${printed.length} printed numerals`);
      });
      return fails;
    });
  },
};
