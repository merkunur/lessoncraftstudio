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

function roof({ whole, a, b, w = 240, h = 92, keep = false }) {
  const parts = [
    el('path', {
      d: `M ${w / 2} 4 L ${w - 6} ${h - 4} L 6 ${h - 4} Z`,
      fill: tokens.color.cream, stroke: tokens.color.teal, 'stroke-width': 3, 'stroke-linejoin': 'round',
    }),
    label({ x: w / 2, y: h * 0.42, text: whole, size: 26, color: tokens.color.ink, fontFamily: tokens.font.display, weight: 700, data: { 'data-lcs-whole': whole } }),
    label({ x: w * 0.28, y: h - 24, text: a, size: 21, color: tokens.color.ink, fontFamily: tokens.font.display, weight: 700, data: { 'data-lcs-parta': a } }),
    label({ x: w * 0.72, y: h - 24, text: b, size: 21, color: tokens.color.ink, fontFamily: tokens.font.display, weight: 700, data: { 'data-lcs-partb': b } }),
  ];
  return svgRoot({ width: w, height: h, label: `fact family ${a}, ${b}, ${whole}` }, parts.join(''), { 'data-lcs-prim': 'fact-roof', ...(keep ? { style: 'flex-shrink:0' } : {}) });
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
    // Level Set 2026-10-07: level 3 = facts that cross ten, each fact missing a different number (the header promised a blank)
    3: { max: 20, cards: 6, cols: 2, rows: 3, bridge: 'yes', blank: 'mixed' },
  },
  i18n: {
    en: {
      title: 'Fact Family Houses',
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
    const used = new Set();
    const cards = [];
    // 6-house pages (2026-10-07): the four fact rows filled the card and the roof SVG was squeezed to ~half size (its
    // numbers printed at ~10 px). The roof now keeps its size and the rows are a little more compact.
    const BOX = d.cards > 4 ? { w: 46, h: 34 } : { w: 50, h: 40 };
    for (let i = 0; i < d.cards; i++) {
      let a, b, whole, guard = 0;
      // Level Set 2026-10-07 (each a no-op when absent, so published pages draw exactly as before):
      //   d.minPart  smallest part (default 2) — level 1 within 6 needs 1 + 2 = 3
      //   d.bridge   'no': the parts' ones never cross ten (3, 12, 15) · 'yes': two one-digit parts that cross ten (5, 8, 13)
      const minPart = d.minPart || 2;
      const okBridge = (x, y) => !d.bridge || (d.bridge === 'no' ? (x % 10) + (y % 10) < 10 : x < 10 && y < 10 && x + y > 10);
      do {
        whole = rng.int(d.minPart ? 2 * minPart + 1 : 5, d.max);
        a = rng.int(minPart, whole - minPart); // both parts ≥2 — avoids a ±1-dominated page
        b = whole - a;
        guard++;
      } while ((a === b || used.has([Math.min(a, b), Math.max(a, b)].join('|')) || !okBridge(a, b)) && guard < (d.bridge ? 600 : 120));
      if (d.bridge && !okBridge(a, b)) throw new Error('G1-209: no ' + (d.bridge === 'yes' ? 'bridging' : 'non-bridging') + ' family left');
      used.add([Math.min(a, b), Math.max(a, b)].join('|'));

      // nt20-VAR d.blank 'partner': the MISSING-PARTNER page — the second
      // operand is the blank (7 + ☐ = 12), result printed; default blanks
      // the result exactly as before.
      // d.blank 'mixed' / 'parts' (Level Set level 3): each fact blanks its own place — the result, the second number
      // or the first — so the child reads the roof both ways ('parts': the two numbers before "=" only)
      const POS = d.blank === 'mixed' ? rng.shuffle(['result', 'partner', 'first', rng.pick(['partner', 'first'])])
        : d.blank === 'parts' ? rng.shuffle(['partner', 'first', 'partner', 'first']) : null;
      let k = 0;
      const posRow = (x, op, y, res) => {
        const pos = POS[k++];
        const cell = (v, blank) => (blank ? answerBox({ ...BOX, answer: v }) : NUM(v));
        return `<div style="display:flex;align-items:center;justify-content:center;gap:8px" data-lcs-eq="${x}${op}${y}=${res}" data-lcs-pos="${pos}">` +
          cell(x, pos === 'first') + OP(op) + cell(y, pos === 'partner') + EQ() + cell(res, pos === 'result') + '</div>';
      };
      const row = (x, op, y, res) => POS ? posRow(x, op, y, res) : d.blank === 'partner'
        ? `<div style="display:flex;align-items:center;justify-content:center;gap:8px" data-lcs-eq="${x}${op}_${res}" data-lcs-partner="${y}">` +
          NUM(x) + OP(op) + answerBox({ ...BOX, answer: y }) + EQ() + NUM(res) + `</div>`
        : `<div style="display:flex;align-items:center;justify-content:center;gap:8px" data-lcs-eq="${x}${op}${y}">` +
          NUM(x) + OP(op) + NUM(y) + EQ() + answerBox({ ...BOX, answer: res }) + `</div>`;

      const compact = d.cards > 4;
      cards.push(
        `<div class="ws-card-stage" style="flex-direction:column;gap:${compact ? 6 : 10}px" data-lcs-a="${a}" data-lcs-b="${b}" data-lcs-whole="${whole}">` +
        roof({ whole, a, b, w: compact ? 210 : 240, h: compact ? 68 : 92, keep: compact }) +
        `<div style="display:flex;flex-direction:column;gap:${compact ? 5 : 8}px">` +
        row(a, '+', b, whole) + row(b, '+', a, whole) +
        row(whole, '-', a, b) + row(whole, '-', b, a) +
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
        const a = +st.dataset.lcsA, b = +st.dataset.lcsB, whole = +st.dataset.lcsWhole;
        if (a + b !== whole) fails.push(`card ${i + 1}: ${a}+${b}!=${whole}`);
        if (a === b) fails.push(`card ${i + 1}: degenerate a==b family`);
        const rows = [...card.querySelectorAll('[data-lcs-eq]')];
        if (rows.length !== 4) { fails.push(`card ${i + 1}: ${rows.length} equations`); return; }
        if (rows[0].dataset.lcsPos) {
          // Level Set mixed blanks: the four facts of the roof, each blanking its own place; the box holds that number
          const facts = [`${a}+${b}=${whole}`, `${b}+${a}=${whole}`, `${whole}-${a}=${b}`, `${whole}-${b}=${a}`];
          rows.forEach((r, j) => {
            if (r.dataset.lcsEq !== facts[j]) fails.push(`card ${i + 1} row ${j + 1}: eq ${r.dataset.lcsEq} != ${facts[j]}`);
            const [lhs, res] = r.dataset.lcsEq.split('='); const m = /^(\d+)([+-])(\d+)$/.exec(lhs);
            const v = { first: +m[1], partner: +m[3], result: +res }[r.dataset.lcsPos];
            const boxes = r.querySelectorAll('[data-lcs-answer]');
            if (boxes.length !== 1 || +boxes[0].dataset.lcsAnswer !== v) fails.push(`card ${i + 1} row ${j + 1}: blank ${r.dataset.lcsPos} != ${v}`);
          });
          const roofSvg = card.querySelector('[data-lcs-prim="fact-roof"]');
          if (!roofSvg || +roofSvg.querySelector('[data-lcs-whole]').textContent !== whole) fails.push(`card ${i + 1}: roof whole mismatch`);
          return;
        }
        const partnerMode = rows[0].dataset.lcsPartner != null;
        const want = partnerMode
          // missing-partner rows: x + ☐ = res, box holds the partner
          ? [[`${a}+_${whole}`, b], [`${b}+_${whole}`, a], [`${whole}-_${b}`, a], [`${whole}-_${a}`, b]]
          : [[`${a}+${b}`, whole], [`${b}+${a}`, whole], [`${whole}-${a}`, b], [`${whole}-${b}`, a]];
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
