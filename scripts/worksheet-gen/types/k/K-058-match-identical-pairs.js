/**
 * K-058 — Match the identical pairs: every picture appears twice in the grid;
 * the child draws a line between each matching pair.
 */
'use strict';
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const slot = require('../../lib/slot.js');

module.exports = {
  id: 'K-058',
  slug: 'matching-pairs',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'visual-matching',
  themeAxis: { applicable: true, minNouns: 6 },
  difficulty: {
    1: { pairs: 4, cols: 3 },
    2: { pairs: 6, cols: 4 },
    3: { pairs: 8, cols: 4 },
  },
  i18n: {
    en: {
      title: 'Find the Pairs',
      instruction: 'Every picture has a twin. Draw a line to join the two pictures in each pair.',
    },
  },

  build({ theme, difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const pool = labelSafeNouns(theme);
    // makers (2026-11-02): each pair's picture is a slot; the KEY prints the pair's number on both twins, the SCREEN
    // makes every card both an item and a target (mutual pairs: each card answers its twin) — the catalogue page is
    // unchanged (its cards carry only data-lcs-pair, as shipped)
    const nouns = slot.pictures(ctx, rng.sample(pool, d.pairs), pool, theme, 'pic');
    // duplicate + shuffle; reject layouts where a pair lands adjacent in the
    // same row (too easy / looks like a rendering mistake)
    let order;
    let guard = 0;
    do {
      order = rng.shuffle([...nouns, ...nouns]);
      guard++;
    } while (guard < 40 && order.some((n, i) =>
      i % d.cols !== d.cols - 1 && order[i + 1] && order[i + 1].vocabKey === n.vocabKey));

    const rows = Math.ceil(order.length / d.cols);
    const cellPx = Math.min(120, Math.floor(620 / d.cols) - 18, Math.floor(720 / rows) - 18);
    const iconPx = cellPx - 26;
    const key = !!(ctx && ctx.answerKey), scr = !key && !!(ctx && ctx.screen);
    const twinOf = (i) => order.findIndex((m, j) => j !== i && m.vocabKey === order[i].vocabKey);
    const cells = order.map((n, i) =>
      `<span class="ws-pattern-slot" style="width:${cellPx}px;height:${cellPx}px" ` +
      (scr ? `data-lcs-pair="c${i + 1}" data-lcs-key-badge="c${twinOf(i) + 1}" data-lcs-label="•"` : `data-lcs-pair="${n.vocabKey}"${key ? ` data-lcs-key-badge="${nouns.indexOf(n) + 1}"` : ''}`) +
      `${slot.attr(ctx, 'pic', nouns.indexOf(n))}>` +
      `<img class="ws-icon" src="${fileUri(theme, n.noun)}" alt="" style="width:${iconPx}px;height:${iconPx}px"></span>`).join('');

    return {
      bodyHtml:
        `<div style="flex:1 1 auto;display:flex;align-items:center;justify-content:center">` +
        `<div style="display:grid;grid-template-columns:repeat(${d.cols},${cellPx}px);gap:26px 44px;justify-content:center">${cells}</div>` +
        `</div>`,
      meta: { pairs: nouns.map((n) => n.vocabKey) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const counts = {};
      document.querySelectorAll('[data-lcs-pair]').forEach((el) => {
        counts[el.dataset.lcsPair] = (counts[el.dataset.lcsPair] || 0) + 1;
      });
      Object.entries(counts).forEach(([k, c]) => {
        if (c !== 2) fails.push(`${k} appears ${c} times (want 2)`);
      });
      return fails;
    });
  },
};
