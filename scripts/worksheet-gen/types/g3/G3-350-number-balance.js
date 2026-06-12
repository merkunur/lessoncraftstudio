/**
 * G3-350 — Number balance: which number makes both sides equal?
 * A balance scale with an expression on each pan; one side has a blank.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { answerBox } = require('../../templates/components.js');
const { svgRoot, el, line, circle } = require('../../primitives/_svg.js');
const tokens = require('../../primitives/_tokens.js');

function balanceSvg(w, h) {
  const t = tokens;
  const cx = w / 2;
  return svgRoot({ width: w, height: h, label: 'balance scale' }, [
    line({ x1: cx, y1: 16, x2: cx, y2: h - 14, strokeColor: t.color.teal, strokeWidth: 5 }),
    line({ x1: cx - 4, y1: h - 12, x2: cx + 4, y2: h - 12, strokeColor: t.color.teal, strokeWidth: 8, cap: 'round' }),
    line({ x1: 16, y1: 16, x2: w - 16, y2: 16, strokeColor: t.color.teal, strokeWidth: 5 }),
    line({ x1: 18, y1: 18, x2: 18, y2: 38, strokeColor: t.color.teal, strokeWidth: 3 }),
    line({ x1: w - 18, y1: 18, x2: w - 18, y2: 38, strokeColor: t.color.teal, strokeWidth: 3 }),
    el('path', { d: `M 2 40 Q 18 58 34 40`, fill: 'none', stroke: t.color.coral, 'stroke-width': 3.5, 'stroke-linecap': 'round' }),
    el('path', { d: `M ${w - 34} 40 Q ${w - 18} 58 ${w - 2} 40`, fill: 'none', stroke: t.color.coral, 'stroke-width': 3.5, 'stroke-linecap': 'round' }),
    circle({ cx, cy: 16, r: 6, fill: t.color.coral }),
  ].join(''));
}

const NUM = (v) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:26px;color:#3A3530" data-lcs-num="${v}">${v}</span>`;
const OP = (ch) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:24px;color:#146B5E">${ch}</span>`;

module.exports = {
  id: 'G3-350',
  slug: 'balancing-equations',
  gradeBand: 'G23',
  assetClass: 'visual-logic',
  exerciseType: 'visual-logic',
  themeAxis: { applicable: false },
  difficulty: {
    1: { max: 10, rows: 4 },
    2: { max: 20, rows: 4 },
    3: { max: 50, rows: 4 },
  },
  i18n: {
    en: { title: 'Make It Balance', instruction: 'Both sides must weigh the same. Write the missing number.' },
  },

  build({ difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const cards = [];
    for (let i = 0; i < d.rows; i++) {
      const a = rng.int(2, d.max - 1);
      const b = rng.int(1, d.max - a);
      const total = a + b;
      const c = rng.int(1, total - 1);
      const missing = total - c;
      cards.push(
        `<div class="ws-card-stage" style="flex-direction:column;gap:0" data-lcs-total="${total}">` +
        `<div style="display:flex;justify-content:space-between;width:440px;padding:0 6px">` +
        `<span style="display:inline-flex;align-items:center;gap:6px;background:#FFFFFF;border:2px solid #F0E4CB;border-radius:12px;padding:8px 14px" data-lcs-pan="left">` +
        NUM(a) + OP('+') + NUM(b) + `</span>` +
        `<span style="display:inline-flex;align-items:center;gap:6px;background:#FFFFFF;border:2px solid #F0E4CB;border-radius:12px;padding:8px 14px" data-lcs-pan="right">` +
        NUM(c) + OP('+') + answerBox({ w: 56, h: 44, answer: missing }) + `</span>` +
        `</div>` +
        balanceSvg(440, 74) +
        `</div>`
      );
    }
    return { bodyHtml: cardGrid({ cards, cols: 1, rows: d.rows }), meta: {} };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      document.querySelectorAll('[data-lcs-total]').forEach((stage, i) => {
        const total = +stage.dataset.lcsTotal;
        const left = [...stage.querySelectorAll('[data-lcs-pan="left"] [data-lcs-num]')].map((e) => +e.dataset.lcsNum);
        const right = [...stage.querySelectorAll('[data-lcs-pan="right"] [data-lcs-num]')].map((e) => +e.dataset.lcsNum);
        const box = +stage.querySelector('[data-lcs-pan="right"] [data-lcs-answer]').dataset.lcsAnswer;
        if (left.reduce((x, y) => x + y, 0) !== total) fails.push(`row ${i + 1}: left pan != ${total}`);
        if (right.reduce((x, y) => x + y, 0) + box !== total) fails.push(`row ${i + 1}: right pan + blank != ${total}`);
        if (box < 1) fails.push(`row ${i + 1}: non-positive missing value`);
      });
      return fails;
    });
  },
};
