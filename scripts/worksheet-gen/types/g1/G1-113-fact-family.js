/**
 * G1-113 — Fact family from a picture: two icon groups define the family;
 * the child completes 2 additions + 2 subtractions (write-in boxes).
 * The two numerals are printed in each line; only the answer is blank —
 * keeping the K-3 floor (full blank families are a G2 format).
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { labelSafeNouns } = require('../../image-cache/resolve.js');
const { iconRows, answerBox } = require('../../templates/components.js');

const NUM = (n) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:24px;color:#3A3530" data-lcs-num="${n}">${n}</span>`;
const OPS = (ch) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:22px;color:#146B5E">${ch}</span>`;

module.exports = {
  id: 'G1-113',
  slug: 'fact-families-pictures',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'picture-arithmetic',
  themeAxis: { applicable: true, minNouns: 2 },
  difficulty: {
    1: { maxTotal: 6, cards: 2 },
    2: { maxTotal: 10, cards: 2 },
    3: { maxTotal: 15, cards: 2 },
  },
  i18n: {
    en: {
      title: 'Fact Families',
      instruction: 'Use the two groups to finish all four number sentences.',
    },
  },

  build({ theme, difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const nouns = rng.sample(labelSafeNouns(theme), d.cards);
    const cards = [];
    for (let i = 0; i < d.cards; i++) {
      let a = rng.int(1, d.maxTotal - 1);
      let b = rng.int(1, d.maxTotal - a);
      if (a === b) b = Math.max(1, b - 1) === a ? b + 1 : Math.max(1, b - 1);   // a≠b keeps 4 distinct facts
      const t = a + b;
      // rows of ≤3 so groups read as compact blocks that FILL their boxes
      const fit = (n) => {
        const perRow = Math.min(3, n);
        const rows = Math.ceil(n / perRow);
        const iconPx = Math.min(64, Math.floor((150 - (perRow - 1) * 6) / perRow), Math.floor((280 - (rows - 1) * 6) / rows));
        return { perRow, iconPx };
      };
      const fitA = fit(a);
      const fitB = fit(b);
      const line = (x, op, y, ans) =>
        `<span style="display:inline-flex;align-items:center;gap:8px" data-lcs-fact="${x}${op === '−' ? '-' : '+'}${y}=${ans}">` +
        NUM(x) + OPS(op) + NUM(y) + OPS('=') + answerBox({ w: 52, h: 42, answer: ans }) + `</span>`;
      cards.push(
        `<div class="ws-card-stage" style="gap:20px" data-lcs-a="${a}" data-lcs-b="${b}">` +
        `<div class="ws-subgroup" style="max-width:170px" data-lcs-part="a">` +
        iconRows({ theme, noun: nouns[i].noun, n: a, iconPx: fitA.iconPx, perRow: fitA.perRow, rng, gapX: 4, gapY: 4 }) + `</div>` +
        `<div class="ws-subgroup" style="max-width:170px" data-lcs-part="b">` +
        iconRows({ theme, noun: nouns[i].noun, n: b, iconPx: fitB.iconPx, perRow: fitB.perRow, rng, gapX: 4, gapY: 4 }) + `</div>` +
        `<span style="display:inline-flex;flex-direction:column;gap:12px;flex:0 0 auto">` +
        line(a, '+', b, t) + line(b, '+', a, t) + line(t, '−', a, b) + line(t, '−', b, a) +
        `</span></div>`
      );
    }
    return { bodyHtml: cardGrid({ cards, cols: 1, rows: d.cards }), meta: {} };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      document.querySelectorAll('[data-lcs-a]').forEach((stage, i) => {
        const a = parseInt(stage.dataset.lcsA, 10), b = parseInt(stage.dataset.lcsB, 10);
        const ca = stage.querySelector('[data-lcs-part="a"]').querySelectorAll('.ws-icon').length;
        const cb = stage.querySelector('[data-lcs-part="b"]').querySelectorAll('.ws-icon').length;
        if (ca !== a || cb !== b) fails.push(`card ${i + 1}: icon groups ${ca},${cb} != ${a},${b}`);
        const facts = [...stage.querySelectorAll('[data-lcs-fact]')].map((f) => f.dataset.lcsFact);
        if (facts.length !== 4) fails.push(`card ${i + 1}: ${facts.length} facts`);
        const t = a + b;
        const want = [`${a}+${b}=${t}`, `${b}+${a}=${t}`, `${t}-${a}=${b}`, `${t}-${b}=${a}`];
        want.forEach((w) => { if (!facts.includes(w)) fails.push(`card ${i + 1}: missing fact ${w}`); });
        facts.forEach((f) => {
          const m = f.match(/^(\d+)([+-])(\d+)=(\d+)$/);
          if (!m) { fails.push(`card ${i + 1}: bad fact ${f}`); return; }
          const v = m[2] === '+' ? +m[1] + +m[3] : +m[1] - +m[3];
          if (v !== +m[4]) fails.push(`card ${i + 1}: fact ${f} is FALSE`);
        });
      });
      return fails;
    });
  },
};
