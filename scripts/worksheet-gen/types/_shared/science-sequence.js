/**
 * Factory: SCIENCE ordered-sequence — N curated stage pictures shown SCRAMBLED;
 * the child writes 1,2,3,… in the box under each to put them in order (the
 * chicken life cycle: egg → chick → hen).
 *
 * Distinct from the existing order-by-size types (size-compare): those order by
 * a visual magnitude the image itself carries; a life cycle orders by a curated
 * stage index that lives only in the data file. Cores untouched — borrows the
 * .ws-card / .ws-card-stage / .ws-answerbox primitives; layout CSS scoped inline.
 *
 * cfg: { id, slug, gradeBand, data:{stages:[{theme,noun}]}, i18n }
 * Stage order in the data file IS the correct order (1-indexed at render).
 * themeAxis OFF (curated cross-theme refs); the scramble is the variety axis.
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');

const SCOPED_CSS = `
.sci-seq{flex:1 1 auto;display:flex;align-items:center;justify-content:center;min-height:0}
.sci-seq-row{display:flex;align-items:stretch;justify-content:center;gap:26px}
.sci-seq-card{display:flex;flex-direction:column;min-height:380px;background:#FBF3E4;border:2px solid #F0E4CB;border-radius:18px;padding:16px}
.sci-seq-stage{flex:1 1 auto;display:flex;align-items:center;justify-content:center;min-height:0;padding:4px}
.sci-seq-num{display:flex;justify-content:center;padding-top:14px}
.sci-seq-box{width:60px;height:60px;background:#FFFFFF;border:2.5px dashed #F2784B;border-radius:14px}
`;

function makeScienceSequence(cfg) {
  const stages = cfg.data.stages;
  return {
    id: cfg.id,
    slug: cfg.slug,
    gradeBand: cfg.gradeBand || 'K',
    assetClass: 'icon-placement',
    exerciseType: cfg.exerciseType || 'science-sequence',
    themeAxis: { applicable: false },
    // difficulty controls how many stages show (small sets show all)
    difficulty: cfg.difficulty || { 1: { n: Math.min(3, stages.length) }, 2: { n: stages.length }, 3: { n: stages.length } },
    i18n: cfg.i18n,

    build({ difficulty }, ctx) {
      const rng = ctx.rng;
      const d = this.difficulty[difficulty] || this.difficulty[2];
      const n = Math.min(d.n, stages.length);
      const ordered = stages.slice(0, n); // correct order = data order
      // present scrambled (never already-sorted)
      let order;
      do { order = rng.shuffle(ordered.map((_, i) => i)); }
      while (n > 1 && order.every((v, i) => v === i));

      // size from available width: n*(cardPx+32 padding) + (n-1)*26 gap <= ~672
      const cardPx = Math.min(180, Math.floor((672 - (n - 1) * 26) / n) - 32);
      const cards = order.map((srcIdx) => {
        const s = ordered[srcIdx];
        return `<div class="sci-seq-card" data-sci-stage="${srcIdx + 1}" style="width:${cardPx + 34}px">` +
          `<div class="ws-card-stage sci-seq-stage"><img class="ws-icon" src="${fileUri(s.theme, s.noun)}" alt="" style="width:${cardPx}px;height:${cardPx}px"></div>` +
          `<div class="sci-seq-num"><span class="sci-seq-box"></span></div>` +
          `</div>`;
      }).join('');

      return {
        bodyHtml:
          `<style>${SCOPED_CSS}</style>` +
          `<div class="sci-seq"><div class="sci-seq-row">${cards}</div></div>`,
        meta: { order: order.map((i) => i + 1), correctCount: n },
      };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const stages = [...document.querySelectorAll('[data-sci-stage]')];
        if (stages.length < 2) fails.push('fewer than 2 stages');
        const ranks = stages.map((s) => Number(s.dataset.sciStage));
        if (new Set(ranks).size !== ranks.length) fails.push('duplicate stage ranks');
        // must be scrambled (not already in 1..n order left-to-right)
        if (ranks.length > 1 && ranks.every((v, i) => v === i + 1)) fails.push('stages render already in order');
        return fails;
      });
    },
  };
}

module.exports = { makeScienceSequence };
