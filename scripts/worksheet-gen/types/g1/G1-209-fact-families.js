/**
 * G1-209 — Fact families (add/subtract inverse relationship). The beloved
 * Rechenhaus form: a roof triangle holds the number trio (whole on top,
 * parts at the corners); the house body holds the four related equations
 * with blank RESULTS the child completes. CCSS 1.OA.B.4 / DE Aufgabenfamilien
 * / NL sommenfamilies.
 * d1: trios within 10 · d2: within 20 · d3: within 20, one full equation
 * slot blank (both operands known ⇒ still uniquely determined).
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { answerBox } = require('../../templates/components.js');
const tokens = require('../../primitives/_tokens.js');
const { svgRoot, el, label } = require('../../primitives/_svg.js');

const NUM = (v) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:24px;color:#3A3530">${v}</span>`;
const OP = (op) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:22px;color:${op === '+' ? '#146B5E' : '#F2784B'}">${op === '-' ? '−' : op}</span>`;
const EQ = () => `<span style="font-family:'Baloo 2';font-weight:700;font-size:22px;color:#8A8276">=</span>`;

function roof({ whole, a, b, w = 240, h = 92 }) {
  const parts = [
    el('path', {
      d: `M ${w / 2} 4 L ${w - 6} ${h - 4} L 6 ${h - 4} Z`,
      fill: tokens.color.cream, stroke: tokens.color.teal, 'stroke-width': 3, 'stroke-linejoin': 'round',
    }),
    label({ x: w / 2, y: h * 0.42, text: whole, size: 26, color: tokens.color.ink, fontFamily: tokens.font.display, weight: 700, data: { 'data-lcs-whole': whole } }),
    label({ x: w * 0.28, y: h - 24, text: a, size: 21, color: tokens.color.ink, fontFamily: tokens.font.display, weight: 700, data: { 'data-lcs-parta': a } }),
    label({ x: w * 0.72, y: h - 24, text: b, size: 21, color: tokens.color.ink, fontFamily: tokens.font.display, weight: 700, data: { 'data-lcs-partb': b } }),
  ];
  return svgRoot({ width: w, height: h, label: `fact family ${a}, ${b}, ${whole}` }, parts.join(''), { 'data-lcs-prim': 'fact-roof' });
}

module.exports = {
  id: 'G1-209',
  slug: 'fact-families-add-subtract',
  gradeBand: 'G1',
  assetClass: 'numeral-charts',
  exerciseType: 'fact-families',
  themeAxis: { applicable: false },
  difficulty: {
    1: { max: 10, cards: 4, cols: 2, rows: 2 },
    2: { max: 20, cards: 4, cols: 2, rows: 2 },
    3: { max: 20, cards: 6, cols: 2, rows: 3 },
  },
  i18n: {
    en: {
      title: 'Fact Family Houses',
      instruction: 'Use the three numbers on the roof. Complete the four related facts.',
    },
  },

  build({ difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const used = new Set();
    const cards = [];
    for (let i = 0; i < d.cards; i++) {
      let a, b, whole, guard = 0;
      do {
        whole = rng.int(5, d.max);
        a = rng.int(2, whole - 2); // both parts ≥2 — avoids a ±1-dominated page
        b = whole - a;
        guard++;
      } while ((a === b || used.has([Math.min(a, b), Math.max(a, b)].join('|'))) && guard < 120);
      used.add([Math.min(a, b), Math.max(a, b)].join('|'));

      const row = (x, op, y, res) =>
        `<div style="display:flex;align-items:center;justify-content:center;gap:8px" data-lcs-eq="${x}${op}${y}">` +
        NUM(x) + OP(op) + NUM(y) + EQ() + answerBox({ w: 50, h: 40, answer: res }) + `</div>`;

      const compact = d.cards > 4;
      cards.push(
        `<div class="ws-card-stage" style="flex-direction:column;gap:${compact ? 6 : 10}px" data-lcs-a="${a}" data-lcs-b="${b}" data-lcs-whole="${whole}">` +
        roof({ whole, a, b, w: compact ? 210 : 240, h: compact ? 74 : 92 }) +
        `<div style="display:flex;flex-direction:column;gap:${compact ? 5 : 8}px">` +
        row(a, '+', b, whole) + row(b, '+', a, whole) +
        row(whole, '-', a, b) + row(whole, '-', b, a) +
        `</div></div>`
      );
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
        const a = +st.dataset.lcsA, b = +st.dataset.lcsB, whole = +st.dataset.lcsWhole;
        if (a + b !== whole) fails.push(`card ${i + 1}: ${a}+${b}!=${whole}`);
        if (a === b) fails.push(`card ${i + 1}: degenerate a==b family`);
        const rows = [...card.querySelectorAll('[data-lcs-eq]')];
        if (rows.length !== 4) { fails.push(`card ${i + 1}: ${rows.length} equations`); return; }
        const want = [[`${a}+${b}`, whole], [`${b}+${a}`, whole], [`${whole}-${a}`, b], [`${whole}-${b}`, a]];
        rows.forEach((r, j) => {
          if (r.dataset.lcsEq !== want[j][0]) fails.push(`card ${i + 1} row ${j + 1}: eq ${r.dataset.lcsEq} != ${want[j][0]}`);
          const box = r.querySelector('[data-lcs-answer]');
          if (!box || +box.dataset.lcsAnswer !== want[j][1]) fails.push(`card ${i + 1} row ${j + 1}: answer != ${want[j][1]}`);
        });
        // roof numerals agree with the data attributes
        const roofSvg = card.querySelector('[data-lcs-prim="fact-roof"]');
        if (!roofSvg || +roofSvg.querySelector('[data-lcs-whole]').textContent !== whole) fails.push(`card ${i + 1}: roof whole mismatch`);
      });
      return fails;
    });
  },
};
