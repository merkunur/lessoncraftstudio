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

// the per-locale sign table lives in _shared/notation.js (sv panel ruling:
// '/' in Swedish, ':' in de/it/nl/da/no/fi, '÷' elsewhere; '·' for × in
// de/sv/da/no/fi) — shared with array-tasks / number-line-tasks since C1.
const { divGlyph, mulGlyph } = require('../_shared/notation.js');

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
  // Level Set 2026-10-07: level 1 the 2, 5 and 10 tables (products to 50), level 2 the published page, level 3 the 6 to 9
  // tables with each fact missing a different number
  difficulty: { 1: { ...D, tables: [2, 5, 10], factorMin: 2, factorMax: 5 }, 2: { ...D }, 3: { ...D, factorMin: 6, factorMax: 9, blank: 'mixed' } },
  i18n: {
    en: {
      title: 'Multiply and Divide Fact Families',
      instruction: 'Use the three numbers on the roof. Complete the four related facts.',
    },
  },

  // Level Set 2026-10-07: the screen version + answer key of every NEW page (lib/fact-families-screen.js)
  interactive: require('../../lib/fact-families-screen.js').interactiveFor(),
  /** Level Set copies: the families a page asks (build-waves compares copies by these) */
  levelSetWords(m) { return (m.families || []).map(String); },

  build({ difficulty, locale }, ctx) {
    // the published page (level 2, copy 1) builds exactly as it shipped; a NEW page may also be its screen / key
    const published = Number(difficulty) === 2 && ((ctx && ctx.variant) || 1) === 1;
    if (!published && ctx && (ctx.interactive || ctx.answerKey)) {
      const built = this.build({ difficulty, locale }, { ...ctx, interactive: false, answerKey: false });
      return require('../../lib/fact-families-screen.js').screenOrKey(built, { ...ctx, locale: (locale || 'en').slice(0, 2) });
    }
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const mul = mulGlyph(locale);
    const div = divGlyph(locale);
    const used = new Set();
    const cards = [];
    for (let i = 0; i < d.cards; i++) {
      let a, b, guard = 0;
      // d.tables (Level Set level 1): one factor from these tables (2, 5, 10), the other from factorMin..factorMax
      do {
        a = d.tables ? rng.pick(d.tables) : rng.int(d.factorMin, d.factorMax);
        b = rng.int(d.factorMin, d.factorMax);
        guard++;
      } while ((a === b || used.has([Math.min(a, b), Math.max(a, b)].join('|'))) && guard < 120);
      used.add([Math.min(a, b), Math.max(a, b)].join('|'));
      const p = a * b;

      // d.blank 'mixed' (Level Set level 3): each fact blanks its own place — the result, the second number or the first
      const POS = d.blank === 'mixed' ? rng.shuffle(['result', 'partner', 'first', rng.pick(['partner', 'first'])]) : null;
      let k = 0;
      const posRow = (x, op, y, res) => {
        const pos = POS[k++];
        const cell = (v, blank) => (blank ? answerBox({ w: 50, h: 40, answer: v }) : NUM(v));
        return `<div style="display:flex;align-items:center;justify-content:center;gap:8px" data-lcs-eq="${x}${op === mul ? '*' : '/'}${y}=${res}" data-lcs-pos="${pos}">` +
          cell(x, pos === 'first') + OP(op) + cell(y, pos === 'partner') + EQ() + cell(res, pos === 'result') + '</div>';
      };
      const row = (x, op, y, res) => POS ? posRow(x, op, y, res) :
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
    // a NEW page records its families (Level Set copies differ by them); the published page's meta stays {}
    return { bodyHtml: cardGrid({ cards, cols: d.cols, rows: d.rows }), meta: published ? {} : { families: [...used] } };
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
        if (rows[0].dataset.lcsPos) {
          const facts = [`${a}*${b}=${p}`, `${b}*${a}=${p}`, `${p}/${a}=${b}`, `${p}/${b}=${a}`];
          rows.forEach((r, j) => {
            if (r.dataset.lcsEq !== facts[j]) fails.push(`card ${i + 1} row ${j + 1}: eq ${r.dataset.lcsEq} != ${facts[j]}`);
            const [lhs, res] = r.dataset.lcsEq.split('='); const m = /^(\d+)([*/])(\d+)$/.exec(lhs);
            const v = { first: +m[1], partner: +m[3], result: +res }[r.dataset.lcsPos];
            const boxes = r.querySelectorAll('[data-lcs-answer]');
            if (boxes.length !== 1 || +boxes[0].dataset.lcsAnswer !== v) fails.push(`card ${i + 1} row ${j + 1}: blank ${r.dataset.lcsPos} != ${v}`);
          });
          return;
        }
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
