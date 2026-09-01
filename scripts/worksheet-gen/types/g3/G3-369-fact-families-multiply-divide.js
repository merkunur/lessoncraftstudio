/**
 * G3-369 — Multiplication & division fact families (nt20-VAR, fact-families
 * family at G3). The Rechenhaus form carried up a grade: the roof holds
 * factor · factor = product trio; the house body holds the four related
 * facts (a×b, b×a, p÷a, p÷b) with blank results. The inverse-operations
 * insight of G1-209, replayed for the multiplication tables. CCSS 3.OA.B.6
 * (division as an unknown-factor problem).
 * Locale glyphs: '·' for de/sv/da/no/fi (else '×'); ':' for the division
 * sign in the colon-school locales (de/it/nl/sv/da/no/fi), else '÷' —
 * PANEL-CONFIRM per locale at the i18n pass.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { answerBox } = require('../../templates/components.js');
const tokens = require('../../primitives/_tokens.js');
const { svgRoot, el, label } = require('../../primitives/_svg.js');

const MUL_DOT = new Set(['de', 'sv', 'da', 'no', 'fi']);
const DIV_COLON = new Set(['de', 'it', 'nl', 'sv', 'da', 'no', 'fi']);

const NUM = (v) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:24px;color:#3A3530">${v}</span>`;
const OP = (op) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:22px;color:${op === '×' || op === '·' ? '#146B5E' : '#F2784B'}">${op}</span>`;
const EQ = () => `<span style="font-family:'Baloo 2';font-weight:700;font-size:22px;color:#8A8276">=</span>`;

function roof({ product, a, b, w, h }) {
  const parts = [
    el('path', {
      d: `M ${w / 2} 4 L ${w - 6} ${h - 4} L 6 ${h - 4} Z`,
      fill: tokens.color.cream, stroke: tokens.color.teal, 'stroke-width': 3, 'stroke-linejoin': 'round',
    }),
    label({ x: w / 2, y: h * 0.42, text: product, size: 26, color: tokens.color.ink, fontFamily: tokens.font.display, weight: 700, data: { 'data-lcs-whole': product } }),
    label({ x: w * 0.28, y: h - 24, text: a, size: 21, color: tokens.color.ink, fontFamily: tokens.font.display, weight: 700, data: { 'data-lcs-parta': a } }),
    label({ x: w * 0.72, y: h - 24, text: b, size: 21, color: tokens.color.ink, fontFamily: tokens.font.display, weight: 700, data: { 'data-lcs-partb': b } }),
  ];
  return svgRoot({ width: w, height: h, label: `fact family ${a}, ${b}, ${product}` }, parts.join(''), { 'data-lcs-prim': 'fact-roof' });
}

const D = { factorMin: 2, factorMax: 9, cards: 4, cols: 2, rows: 2 };

module.exports = {
  id: 'G3-369',
  slug: 'fact-families-multiply-divide',
  gradeBand: 'G3',
  assetClass: 'numeral-charts',
  exerciseType: 'fact-families',
  themeAxis: { applicable: false },
  difficulty: { 1: { ...D }, 2: { ...D }, 3: { ...D } },
  i18n: {
    en: {
      title: 'Multiply and Divide Fact Families',
      instruction: 'Use the three numbers on the roof. Complete the four related facts.',
    },
  },

  build({ difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const mul = MUL_DOT.has(loc) ? '·' : '×';
    const div = DIV_COLON.has(loc) ? ':' : '÷';
    const used = new Set();
    const cards = [];
    for (let i = 0; i < d.cards; i++) {
      let a, b, guard = 0;
      do {
        a = rng.int(d.factorMin, d.factorMax);
        b = rng.int(d.factorMin, d.factorMax);
        guard++;
      } while ((a === b || used.has([Math.min(a, b), Math.max(a, b)].join('|'))) && guard < 120);
      used.add([Math.min(a, b), Math.max(a, b)].join('|'));
      const p = a * b;

      const row = (x, op, y, res) =>
        `<div style="display:flex;align-items:center;justify-content:center;gap:8px" data-lcs-eq="${x}${op === mul ? '*' : '/'}${y}">` +
        NUM(x) + OP(op) + NUM(y) + EQ() + answerBox({ w: 50, h: 40, answer: res }) + `</div>`;

      cards.push(
        `<div class="ws-card-stage" style="flex-direction:column;gap:10px" data-lcs-a="${a}" data-lcs-b="${b}" data-lcs-whole="${p}">` +
        roof({ product: p, a, b, w: 240, h: 92 }) +
        `<div style="display:flex;flex-direction:column;gap:8px">` +
        row(a, mul, b, p) + row(b, mul, a, p) +
        row(p, div, a, b) + row(p, div, b, a) +
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
        const a = +st.dataset.lcsA, b = +st.dataset.lcsB, p = +st.dataset.lcsWhole;
        if (a * b !== p) fails.push(`card ${i + 1}: ${a}*${b}!=${p}`);
        if (a === b) fails.push(`card ${i + 1}: degenerate a==b family`);
        const rows = [...card.querySelectorAll('[data-lcs-eq]')];
        if (rows.length !== 4) { fails.push(`card ${i + 1}: ${rows.length} equations`); return; }
        const want = [[`${a}*${b}`, p], [`${b}*${a}`, p], [`${p}/${a}`, b], [`${p}/${b}`, a]];
        rows.forEach((r, j) => {
          if (r.dataset.lcsEq !== want[j][0]) fails.push(`card ${i + 1} row ${j + 1}: eq ${r.dataset.lcsEq} != ${want[j][0]}`);
          const box = r.querySelector('[data-lcs-answer]');
          if (!box || +box.dataset.lcsAnswer !== want[j][1]) fails.push(`card ${i + 1} row ${j + 1}: answer != ${want[j][1]}`);
        });
        const roofSvg = card.querySelector('[data-lcs-prim="fact-roof"]');
        if (!roofSvg || +roofSvg.querySelector('[data-lcs-whole]').textContent !== p) fails.push(`card ${i + 1}: roof product mismatch`);
      });
      return fails;
    });
  },
};
