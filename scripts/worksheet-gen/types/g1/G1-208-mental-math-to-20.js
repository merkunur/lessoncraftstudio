/**
 * G1-208 — Mental math to 20 (bare-number add/sub drill). The abstract
 * drill-sheet query face the picture-arithmetic family deliberately lacks
 * (de "Rechnen bis 20 / Kopfrechnen", fr "calcul mental", nl "sommen tot 20").
 * CCSS 1.OA.C.6 / DE Klasse 1 Zahlenraum bis 20.
 * d1: addition within 10 · d2: mixed ± within 20 (result unknown) ·
 * d3: missing-number Platzhalter forms (☐+3=8 — unknown in any position,
 *     1.OA.D.8 algebra readiness).
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { answerBox } = require('../../templates/components.js');

const NUM = (v) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:30px;color:#3A3530">${v}</span>`;
const OP = (op) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:28px;color:${op === '+' ? '#146B5E' : '#F2784B'}">${op === '-' ? '−' : op}</span>`;
const EQ = () => `<span style="font-family:'Baloo 2';font-weight:700;font-size:28px;color:#8A8276">=</span>`;

module.exports = {
  id: 'G1-208',
  slug: 'mental-math-to-20',
  gradeBand: 'G1',
  assetClass: 'numeral-charts',
  exerciseType: 'mental-math',
  themeAxis: { applicable: false },
  difficulty: {
    1: { max: 10, cards: 8, cols: 2, rows: 4, ops: ['+'], missing: false },
    2: { max: 20, cards: 12, cols: 3, rows: 4, ops: ['+', '-'], missing: false },
    3: { max: 20, cards: 12, cols: 3, rows: 4, ops: ['+', '-'], missing: true },
  },
  i18n: {
    en: {
      title: 'Mental Math to 20',
      instruction: 'Solve each problem in your head. Write the missing number in the box.',
    },
  },

  build({ difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const used = new Set();
    const cards = [];
    for (let i = 0; i < d.cards; i++) {
      let a, b, res, op, guard = 0;
      do {
        op = rng.pick(d.ops);
        if (op === '+') {
          // both addends ≥2 — a page dominated by +1 facts is weak drill
          a = rng.int(2, d.max - 2);
          b = rng.int(2, d.max - a);
          res = a + b;
        } else {
          // subtrahend ≥2 and result ≥2 for the same reason
          a = rng.int(5, d.max);
          b = rng.int(2, a - 2);
          res = a - b;
        }
        guard++;
      } while (used.has(`${a}${op}${b}`) && guard < 120);
      used.add(`${a}${op}${b}`);

      // unknown position: result for the drill modes; any slot for d3
      const pos = d.missing ? rng.pick(['a', 'b', 'res']) : 'res';
      const answer = pos === 'a' ? a : pos === 'b' ? b : res;
      const slot = (v, p) => p === pos
        ? answerBox({ w: 58, h: 50, answer: v })
        : NUM(v);
      cards.push(
        `<div class="ws-card-stage" style="gap:12px" data-lcs-a="${a}" data-lcs-b="${b}" data-lcs-op="${op}" data-lcs-pos="${pos}">` +
        slot(a, 'a') + OP(op) + slot(b, 'b') + EQ() + slot(res, 'res') +
        `</div>`
      );
      void answer;
    }
    return { bodyHtml: cardGrid({ cards, cols: d.cols, rows: d.rows }), meta: {} };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const cards = document.querySelectorAll('[data-lcs-card]');
      if (!cards.length) fails.push('no cards');
      cards.forEach((card, i) => {
        const st = card.querySelector('[data-lcs-a]');
        const a = +st.dataset.lcsA, b = +st.dataset.lcsB, op = st.dataset.lcsOp, pos = st.dataset.lcsPos;
        const res = op === '+' ? a + b : a - b;
        if (op === '-' && (res < 0 || b >= a)) fails.push(`card ${i + 1}: negative-space subtraction`);
        const boxes = [...card.querySelectorAll('[data-lcs-answer]')];
        if (boxes.length !== 1) { fails.push(`card ${i + 1}: ${boxes.length} answer boxes`); return; }
        const want = pos === 'a' ? a : pos === 'b' ? b : res;
        if (+boxes[0].dataset.lcsAnswer !== want) fails.push(`card ${i + 1}: box answer != ${want}`);
        // the unknown's value must not be visible as text in this card
        const visible = [...card.querySelectorAll('.ws-card-stage > span')]
          .filter((s) => !s.hasAttribute('data-lcs-answer'))
          .map((s) => s.textContent.trim());
        const numerals = visible.filter((t) => /^\d+$/.test(t));
        if (numerals.length !== 2) fails.push(`card ${i + 1}: ${numerals.length} printed numerals (want 2)`);
      });
      return fails;
    });
  },
};
