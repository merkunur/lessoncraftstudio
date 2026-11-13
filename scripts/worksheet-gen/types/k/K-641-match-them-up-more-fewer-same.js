/** K-641 — Match Them Up: More, Fewer, or the Same (Year pages G, 2026-11-13; K.CC.C.6): two rows of pictures, one above
 *  the other and column by column, so the child can draw a line from each picture to its partner. The row with pictures
 *  left over has more: the child circles it; when every picture has a partner the child colors the star.
 *  Five tasks a page (six on level 3): one where the rows are the same, two where the top row has more, two where the bottom row has more,
 *  in a shuffled order. Level 1 rows of 1 to 5; level 2 rows of 1 to 10; level 3 rows of 6 to 10 that differ by one
 *  or two, six tasks, two of them the same. Printed page only (K-012 pairs two EQUAL rows and asks for no decision). */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');

const STAR = `<svg width="54" height="54" viewBox="0 0 54 54" role="img" aria-label="star" data-lcs-star="1"><path d="M27 4 L33.8 19.6 L50.5 21.2 L37.9 32.4 L41.6 48.8 L27 40.2 L12.4 48.8 L16.1 32.4 L3.5 21.2 L20.2 19.6 Z" fill="#FFFFFF" stroke="#8A8276" stroke-width="2.5" stroke-linejoin="round" stroke-dasharray="5 4"/></svg>`;

function rowOf(theme, noun, n, cell, px, which) {
  return `<div style="display:flex" data-lcs-row="${which}">` + Array.from({ length: n }, () =>
    `<span style="width:${cell}px;display:inline-flex;justify-content:center"><img class="ws-icon" src="${fileUri(theme, noun)}" alt="" style="width:${px}px;height:${px}px"></span>`).join('') + `</div>`;
}

module.exports = {
  id: 'K-641',
  slug: 'match-them-up-more-fewer-same',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'comparing-groups',
  themeAxis: { applicable: true, minNouns: 4 },
  difficulty: {
    1: { lo: 1, hi: 5, cards: 5, same: 1, diffs: [1, 2, 3] },
    2: { lo: 1, hi: 10, cards: 5, same: 1, diffs: [1, 2, 3, 4] },
    3: { lo: 6, hi: 10, cards: 6, same: 2, diffs: [1, 2] },
  },
  i18n: { en: { title: 'Match Them Up: More, Fewer, or the Same', instruction: 'Draw a line from each picture to a partner in the other row. Circle the row that has more. If both rows have the same number, color the star.' } },
  levelSetWords(m) { return (m.pairs || []).map(String); },

  build({ theme, difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const nouns = rng.shuffle(labelSafeNouns(theme).slice());
    // which row has more: the same number of "top" and "bottom" tasks, the rest "same", in a shuffled order
    const unequal = d.cards - d.same;
    const kinds = rng.shuffle([...Array(d.same).fill('same'), ...Array.from({ length: unequal }, (_, i) => (i % 2 ? 'bottom' : 'top'))]);
    const used = new Set(), pairs = [];
    for (const kind of kinds) {
      let top, bottom, ok = false;
      for (let t = 0; t < 200 && !ok; t++) {
        const big = rng.int(d.lo, d.hi);
        if (kind === 'same') { top = bottom = big; if (big < 2) continue; }
        else {
          const small = big - rng.pick(d.diffs);
          if (small < d.lo) continue;
          [top, bottom] = kind === 'top' ? [big, small] : [small, big];
        }
        ok = !used.has(top + ':' + bottom);
      }
      if (!ok) throw new Error('K-641: no pair of rows left');
      used.add(top + ':' + bottom); pairs.push({ top, bottom, kind });
    }
    const cell = 50, px = 40;
    const cards = pairs.map((p, i) => {
      const a = nouns[(2 * i) % nouns.length], b = nouns[(2 * i + 1) % nouns.length];
      return `<div class="ws-card-stage" style="justify-content:space-between;gap:10px;padding:4px 16px 4px 44px" data-lcs-rows="${p.top}:${p.bottom}" data-lcs-more="${p.kind}">` +
        `<div style="display:flex;flex-direction:column;gap:14px">${rowOf(theme, a.noun, p.top, cell, px, 'top')}${rowOf(theme, b.noun, p.bottom, cell, px, 'bottom')}</div>${STAR}</div>`;
    });
    return { bodyHtml: cardGrid({ cards, cols: 1, rows: d.cards }), meta: { pairs: pairs.map((p) => p.top + ':' + p.bottom) } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const stages = [...document.querySelectorAll('[data-lcs-rows]')];
      if (stages.length < 5) fails.push(stages.length + ' cards');
      const kinds = [];
      stages.forEach((st, i) => {
        const [top, bottom] = st.dataset.lcsRows.split(':').map(Number);
        const t = st.querySelector('[data-lcs-row="top"]'), b = st.querySelector('[data-lcs-row="bottom"]');
        if (t.querySelectorAll('.ws-icon').length !== top || b.querySelectorAll('.ws-icon').length !== bottom) fails.push(`card ${i + 1}: rows drawn are not ${top} and ${bottom}`);
        const kind = top === bottom ? 'same' : top > bottom ? 'top' : 'bottom';
        if (st.dataset.lcsMore !== kind) fails.push(`card ${i + 1}: marked ${st.dataset.lcsMore}, the rows say ${kind}`);
        kinds.push(kind);
        if (!st.querySelector('[data-lcs-star]')) fails.push(`card ${i + 1}: no star`);
        // the partners stand one above the other: picture k of each row at the same x
        const xs = (row) => [...row.querySelectorAll('.ws-icon')].map((x) => Math.round(x.getBoundingClientRect().left));
        const xt = xs(t), xb = xs(b);
        for (let k = 0; k < Math.min(xt.length, xb.length); k++) if (Math.abs(xt[k] - xb[k]) > 1) { fails.push(`card ${i + 1}: picture ${k + 1} does not stand over its partner`); break; }
        if (t.getBoundingClientRect().right > st.querySelector('[data-lcs-star]').getBoundingClientRect().left) fails.push(`card ${i + 1}: a row runs into the star`);
        const srcT = t.querySelector('.ws-icon').getAttribute('src'), srcB = b.querySelector('.ws-icon').getAttribute('src');
        if (srcT === srcB) fails.push(`card ${i + 1}: both rows show the same picture`);
      });
      if (kinds.filter((k) => k === 'top').length !== kinds.filter((k) => k === 'bottom').length) fails.push('the row with more is not as often on top as below: ' + kinds.join(','));
      if (!kinds.includes('same')) fails.push('no task with the same number');
      return fails;
    });
  },
};
