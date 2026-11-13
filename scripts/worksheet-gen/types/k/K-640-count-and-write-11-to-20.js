/** K-640 — Count and Write: 11 to 20 (Year pages G, 2026-11-13; K.CC.B.5): 11 to 20 pictures laid in rows of FIVE (two
 *  full rows are ten), a box to write how many. Any number from 11 to 20 comes up; K-006 scatters its pictures and stops
 *  at 15, K-027 draws full arrays only (12, 15, 16, 20). Level 1 11 to 15, level 2 11 to 20, level 3 six cards 11 to 20.
 *  Printed page only. */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const { answerBox } = require('../../templates/components.js');

/** rows of five, upright (a tilted picture is harder to count), the rows left-aligned so a short last row shows */
function rowsOfFive(theme, noun, n, px) {
  let rows = '';
  for (let r = 0; r * 5 < n; r++) {
    const k = Math.min(5, n - r * 5);
    rows += `<div style="display:flex;gap:6px" data-lcs-row="${k}">` +
      Array.from({ length: k }, () => `<img class="ws-icon" src="${fileUri(theme, noun)}" alt="" style="width:${px}px;height:${px}px">`).join('') + `</div>`;
  }
  return `<div style="display:flex;flex-direction:column;gap:6px;align-items:flex-start" data-lcs-part="pile">${rows}</div>`;
}

module.exports = {
  id: 'K-640',
  slug: 'count-and-write-11-to-20',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'counting-pictures',
  themeAxis: { applicable: true, minNouns: 4 },
  difficulty: {
    1: { lo: 11, hi: 15, cards: 4, px: 46 },
    2: { lo: 11, hi: 20, cards: 4, px: 46 },
    3: { lo: 11, hi: 20, cards: 6, px: 30, side: true },   // six shorter cards: the box stands beside the pictures
  },
  i18n: { en: { title: 'Count and Write: 11 to 20', instruction: 'Count all the pictures. Write how many there are in all.' } },
  levelSetWords(m) { return (m.counts || []).map(String); },

  build({ theme, difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const nouns = rng.sample(labelSafeNouns(theme), d.cards);
    const all = []; for (let v = d.lo; v <= d.hi; v++) all.push(v);
    // no number twice; the page never shows its numbers in counting order
    let counts = rng.sample(all, d.cards);
    for (let t = 0; t < 20 && counts.every((v, i) => !i || v > counts[i - 1]); t++) counts = rng.shuffle(counts);
    const cards = counts.map((n, i) =>
      `<div class="ws-card-stage" style="${d.side ? 'gap:12px;justify-content:space-between;padding:6px 10px 6px 34px' : 'flex-direction:column;gap:14px;justify-content:center;padding:8px'}" data-lcs-count="${n}">` +
      rowsOfFive(theme, nouns[i].noun, n, d.px) + answerBox({ w: d.side ? 64 : 84, h: d.side ? 56 : 62, answer: n }) + `</div>`);
    return { bodyHtml: cardGrid({ cards, cols: 2, rows: Math.ceil(d.cards / 2) }), meta: { counts } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const stages = [...document.querySelectorAll('[data-lcs-count]')];
      if (stages.length < 4) fails.push(stages.length + ' cards');
      const seen = new Set();
      stages.forEach((st, i) => {
        const n = +st.dataset.lcsCount;
        if (n < 11 || n > 20) fails.push(`card ${i + 1}: ${n} is not 11 to 20`);
        if (seen.has(n)) fails.push(`card ${i + 1}: ${n} twice`);
        seen.add(n);
        const icons = st.querySelectorAll('[data-lcs-part="pile"] .ws-icon').length;
        if (icons !== n) fails.push(`card ${i + 1}: ${icons} pictures for ${n}`);
        const rows = [...st.querySelectorAll('[data-lcs-row]')].map((r) => r.querySelectorAll('.ws-icon').length);
        if (rows.slice(0, -1).some((k) => k !== 5) || rows[rows.length - 1] > 5) fails.push(`card ${i + 1}: rows ${rows}`);
        const box = st.querySelector('[data-lcs-answer]');
        if (!box || +box.dataset.lcsAnswer !== n) fails.push(`card ${i + 1}: the box does not hold ${n}`);
        const pile = st.querySelector('[data-lcs-part="pile"]').getBoundingClientRect(), card = st.getBoundingClientRect();
        const bx = box.getBoundingClientRect();
        if (pile.bottom > card.bottom + 1 || pile.right > card.right + 1 || bx.right > card.right + 1 || bx.bottom > card.bottom + 1 || bx.left < card.left) fails.push(`card ${i + 1}: the pictures or the box leave their card`);
        if (!(pile.right <= bx.left + 1 || pile.bottom <= bx.top + 1)) fails.push(`card ${i + 1}: the box lies on the pictures`);
      });
      return fails;
    });
  },
};
