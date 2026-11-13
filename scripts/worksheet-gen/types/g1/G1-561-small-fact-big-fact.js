/** G1-561 — Small Fact, Big Fact (Year pages E, 2026-11-13; 1.OA.C.6, de "kleine Aufgabe, große Aufgabe", sv "samma
 *  ental, en tia till"): each card prints a fact within 10 and under it the same fact with a ten more in the first
 *  number (3 + 4 and 13 + 4; 7 − 5 and 17 − 5). Never across the ten. Level 1 plus, level 2 minus, level 3 both.
 *  Printed page only (G1-216 / G1-217 are the pages of the big facts alone). */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { answerBox } = require('../../templates/components.js');

const FS = 44;
const NUM = (v, first) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:${FS}px;color:#3A3530${first ? ';justify-self:end' : ''}">${v}</span>`;
const OP = (op) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:${FS - 4}px;color:${op === '+' ? '#146B5E' : '#F2784B'}">${op === '-' ? '−' : op}</span>`;
const EQ = () => `<span style="font-family:'Baloo 2';font-weight:700;font-size:${FS - 4}px;color:#8A8276">=</span>`;

/** every small fact of a kind: both numbers at least 2, the result of a plus at most 9, of a minus at least 1 */
function factsOf(op) {
  const out = [];
  for (let a = 2; a <= 9; a++) for (let b = 2; b <= 8; b++) {
    if (op === '+' && a + b <= 9) out.push({ a, op, b, res: a + b });
    if (op === '-' && a - b >= 1) out.push({ a, op, b, res: a - b });
  }
  return out;
}

module.exports = {
  id: 'G1-561',
  slug: 'small-fact-big-fact',
  gradeBand: 'G1',
  assetClass: 'numeral-charts',
  exerciseType: 'mental-math',
  themeAxis: { applicable: false },
  difficulty: { 1: { cards: 6, ops: ['+'] }, 2: { cards: 6, ops: ['-'] }, 3: { cards: 6, ops: ['+', '-'] } },
  i18n: { en: { title: 'Small Fact, Big Fact', instruction: 'Solve the small problem first. Use it to solve the big problem under it.' } },
  levelSetWords(m) { return (m.asks || []).map(String); },

  build({ difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    // the kinds in turn (level 3: three plus, three minus), in a shuffled order; no fact twice, no first number three times
    const kinds = rng.shuffle(Array.from({ length: d.cards }, (_, i) => d.ops[i % d.ops.length]));
    const pools = {}; d.ops.forEach((op) => { pools[op] = rng.shuffle(factsOf(op)); });
    const firsts = {}, picked = [];
    for (const op of kinds) {
      const f = pools[op].find((x) => (firsts[x.a] || 0) < 2 && !picked.some((y) => y.op === x.op && y.a === x.a && y.b === x.b));
      if (!f) throw new Error('G1-561: no fact left');
      firsts[f.a] = (firsts[f.a] || 0) + 1; picked.push(f);
    }
    const cards = picked.map(({ a, op, b, res }) =>
      `<div class="ws-card-stage" data-lcs-pair="${a}:${op}:${b}" style="display:grid;grid-template-columns:repeat(5,auto);justify-content:center;justify-items:center;align-items:center;column-gap:12px;row-gap:12px">` +
      NUM(a, true) + OP(op) + NUM(b) + EQ() + answerBox({ w: 78, h: 60, answer: res }) +
      NUM(10 + a, true) + OP(op) + NUM(b) + EQ() + answerBox({ w: 78, h: 60, answer: 10 + res }) +
      `</div>`);
    return { bodyHtml: cardGrid({ cards, cols: 2, rows: Math.ceil(d.cards / 2) }), meta: { asks: picked.map((x) => `${x.a}${x.op}${x.b}`) } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const stages = [...document.querySelectorAll('[data-lcs-pair]')];
      if (stages.length !== 6) fails.push(stages.length + ' cards');
      const seen = new Set();
      stages.forEach((st, i) => {
        const [a, op, b] = st.dataset.lcsPair.split(':'); const A = +a, B = +b;
        const res = op === '+' ? A + B : A - B;
        if (seen.has(st.dataset.lcsPair)) fails.push(`card ${i + 1}: ${st.dataset.lcsPair} twice`);
        seen.add(st.dataset.lcsPair);
        if (op === '+' ? res > 9 : res < 1) fails.push(`card ${i + 1}: ${A} ${op} ${B} leaves the ten`);
        if (A < 2 || B < 2) fails.push(`card ${i + 1}: a number below 2`);
        const boxes = [...st.querySelectorAll('[data-lcs-answer]')].map((x) => +x.dataset.lcsAnswer);
        if (boxes.length !== 2 || boxes[0] !== res || boxes[1] !== res + 10) fails.push(`card ${i + 1}: boxes ${boxes}`);
        const nums = [...st.children].map((x) => x.textContent.trim()).filter((t) => /^\d+$/.test(t)).map(Number);
        if (nums.join() !== [A, B, 10 + A, B].join()) fails.push(`card ${i + 1}: printed numbers ${nums}`);
      });
      return fails;
    });
  },
};
