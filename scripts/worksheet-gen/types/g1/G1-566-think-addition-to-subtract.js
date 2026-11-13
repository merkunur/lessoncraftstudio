/** G1-566 — Think Addition to Subtract (Year pages G, 2026-11-13; 1.OA.B.4): each card is a trio for one fact: the
 *  subtraction (13 − 8 = □), a number bond with the whole and the part taken away and the other part empty, and the
 *  helper addition (8 + □ = 13). The same number goes in all three: that is the strategy the page teaches.
 *  Level 1 wholes 6 to 10; level 2 wholes 11 to 18 with two one-digit parts (across ten); level 3 the same facts with
 *  no bond drawn, six cards. Printed page only (G1-222 prints all three numbers on a roof, so nothing is worked out). */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { answerBox } = require('../../templates/components.js');
const numberBond = require('../../primitives/number-bond.js');

const NUM = (v, fs) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:${fs}px;color:#3A3530">${v}</span>`;
const OP = (ch, fs) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:${fs - 4}px;color:${ch === '+' ? '#146B5E' : ch === '−' ? '#F2784B' : '#8A8276'}">${ch}</span>`;
const line = (parts) => `<span style="display:inline-flex;align-items:center;gap:8px">${parts.join('')}</span>`;

/** every fact of a level: whole, the part taken away (sub), the part left (ans); both parts at least 2 */
function factsOf(d) {
  const out = [];
  for (let w = d.lo; w <= d.hi; w++) for (let sub = 2; sub <= 9; sub++) {
    const ans = w - sub;
    if (ans < 2 || ans > 9 || ans === sub) continue;
    out.push({ w, sub, ans });
  }
  return out;
}

module.exports = {
  id: 'G1-566',
  slug: 'think-addition-to-subtract',
  gradeBand: 'G1',
  assetClass: 'numeral-charts',
  exerciseType: 'fact-families',
  themeAxis: { applicable: false },
  difficulty: {
    1: { lo: 6, hi: 10, cards: 4, bond: true },
    2: { lo: 11, hi: 18, cards: 4, bond: true },
    3: { lo: 11, hi: 18, cards: 6, bond: false },
  },
  i18n: { en: { title: 'Think Addition to Subtract', instruction: 'Find the missing number. Write it in the empty circle and in both number sentences.' } },
  levelSetWords(m) { return (m.asks || []).map(String); },

  build({ difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    // no whole twice where the range allows, no answer three times
    const picked = [], wholes = {}, answers = {};
    for (const f of rng.shuffle(factsOf(d))) {
      if (picked.length >= d.cards) break;
      if ((wholes[f.w] || 0) >= 1 || (answers[f.ans] || 0) >= 2) continue;
      wholes[f.w] = 1; answers[f.ans] = (answers[f.ans] || 0) + 1; picked.push(f);
    }
    if (picked.length < d.cards) throw new Error('G1-566: not enough facts for the page');
    const fs = d.bond ? 34 : 38;
    const box = (v) => answerBox({ w: 64, h: 52, answer: v });
    const cards = picked.map(({ w, sub, ans }) => {
      const subLine = line([NUM(w, fs), OP('−', fs), NUM(sub, fs), OP('=', fs), box(ans)]);
      const addLine = line([NUM(sub, fs), OP('+', fs), box(ans), OP('=', fs), NUM(w, fs)]);
      const bond = d.bond ? `<span data-lcs-part="bond">${numberBond({ whole: w, a: sub, b: ans, blank: 'b', size: 150 }).svg}</span>` : '';
      return `<div class="ws-card-stage" data-lcs-trio="${w}:${sub}:${ans}" style="gap:${d.bond ? 18 : 12}px;justify-content:space-evenly;${d.bond ? 'padding:4px 14px 4px 40px' : 'flex-direction:column;padding:10px'}">` +
        (d.bond ? subLine + bond + addLine : subLine + addLine) + `</div>`;
    });
    return { bodyHtml: cardGrid({ cards, cols: d.bond ? 1 : 2, rows: d.bond ? d.cards : Math.ceil(d.cards / 2) }), meta: { asks: picked.map((f) => `${f.w}-${f.sub}`) } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const stages = [...document.querySelectorAll('[data-lcs-trio]')];
      if (stages.length < 4) fails.push(stages.length + ' cards');
      const seen = new Set();
      stages.forEach((st, i) => {
        const [w, sub, ans] = st.dataset.lcsTrio.split(':').map(Number);
        if (w - sub !== ans || sub < 2 || ans < 2 || sub > 9 || ans > 9) fails.push(`card ${i + 1}: ${w} − ${sub} = ${ans} is not a fact of the page`);
        if (seen.has(w + ':' + sub)) fails.push(`card ${i + 1}: twice`);
        seen.add(w + ':' + sub);
        const html = [...st.querySelectorAll('span[data-lcs-answer], circle[data-lcs-answer]')].map((x) => +x.dataset.lcsAnswer);
        const bond = st.querySelector('[data-lcs-prim="number-bond"]');
        const want = bond ? 3 : 2;
        if (html.length !== want || html.some((v) => v !== ans)) fails.push(`card ${i + 1}: answers ${html} (want ${want} × ${ans})`);
        if (bond) {
          const vals = [...bond.querySelectorAll('[data-lcs-value]')].map((x) => +x.dataset.lcsValue).sort((a, b) => a - b);
          if (vals.join() !== [sub, w].sort((a, b) => a - b).join()) fails.push(`card ${i + 1}: the bond shows ${vals}`);
        }
        const r = st.getBoundingClientRect();
        for (const el of st.children) { const b = el.getBoundingClientRect(); if (b.right > r.right + 1 || b.left < r.left - 1) fails.push(`card ${i + 1}: a part leaves the card`); }
      });
      return fails;
    });
  },
};
