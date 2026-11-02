/**
 * K-057 — Match the shadow (icon ↔ its silhouette).
 * Asset class 1: plain icon placement + Sharp silhouette derivation.
 * Makers (2026-11-02): synchronous — the shapes are compared on the precomputed masks (lib/picture-masks.js maskA, bit
 * for bit the old maskSignature, so the same pictures are picked) and the shadow is the picture itself drawn with a CSS
 * filter (brightness 0: its alpha in dark ink), the same in Node, in the PDF and in a maker in the browser.
 *
 * Left column: theme icons in cream cards. Right column: their silhouettes,
 * shuffled (never the identity permutation). The child draws connecting lines
 * between the coral dots.
 */
'use strict';
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const PM = require('../../lib/picture-masks.js');
const slot = require('../../lib/slot.js');
const { keyNumber } = require('../_shared/key-number.js');

/** pick `count` nouns whose shadows are pairwise distinct — image-cache/silhouette.js pickDistinctSilhouettes, synchronous */
function pickDistinctShadows(theme, nouns, count, rng, thr = 0.72) {
  const picked = [];
  for (const cand of rng.shuffle(nouns)) {
    const m = PM.maskA(theme, cand.noun);
    if (picked.every((p) => PM.iou(m, p.m) < thr)) picked.push({ n: cand, m });
    if (picked.length === count) return picked.map((p) => p.n);
  }
  throw new Error(`K-057: theme ${theme} cannot supply ${count} shape-distinct nouns (got ${picked.length})`);
}

module.exports = {
  id: 'K-057',
  slug: 'shadow-matching',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'visual-matching',
  themeAxis: { applicable: true, minNouns: 6, excludeBw: true },
  difficulty: {
    1: { pairs: 4 },
    2: { pairs: 5 },
    3: { pairs: 6 },
  },
  i18n: {
    en: {
      title: 'Match the Shadow',
      instruction: 'Draw a line from each picture to its shadow.',
    },
  },

  build({ theme, difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    // shape-distinct selection: no two near-identical shadows on one page
    const pool = labelSafeNouns(theme).filter((n) => PM.has(theme, n.noun));
    const drawn = pickDistinctShadows(theme, pool, d.pairs, rng);
    // makers (2026-11-02): each picture is a slot; a picture whose shadow is too like another one's is refused (two
    // shadows would fit it) — the page keeps its drawn pictures. The picker OFFERS only pictures whose shadow is unlike
    // every drawn one (a round-fruit page would otherwise refuse nearly every fruit offered); the check stays for a choice
    // that meets another changed picture
    const offer = ctx && ctx.slotsOut ? pool.filter((p) => drawn.includes(p) || drawn.every((q) => PM.iou(PM.maskA(theme, p.noun), PM.maskA(theme, q.noun)) < 0.72)) : pool;
    let nouns = slot.pictures(ctx, drawn, offer, theme, 'pic');
    const clash = nouns.some((a, i) => nouns.some((b, j) => j > i && PM.iou(PM.maskA(theme, a.noun), PM.maskA(theme, b.noun)) >= 0.72));
    if (clash) { nouns = slot.pictures(ctx && { ...ctx, overrides: null }, drawn, offer, theme, 'pic'); slot.refuse(ctx, 'pic'); }
    // the KEY numbers each picture (top to bottom) and gives its shadow the same number; the SCREEN makes each picture an
    // item that answers its shadow (the catalogue page is unchanged)
    const key = !!(ctx && ctx.answerKey), scr = !key && !!(ctx && ctx.screen);

    // derangement: no silhouette sits straight across from its picture
    let order;
    do {
      order = rng.shuffle(nouns.map((_, i) => i));
    } while (order.some((v, i) => v === i));

    const itemH = Math.floor((760 - (d.pairs - 1) * 14) / d.pairs);
    const iconPx = Math.min(96, itemH - 24);

    const left = [];
    const right = [];
    for (let i = 0; i < d.pairs; i++) {
      const ln = nouns[i];
      left.push(
        `<div class="ws-match-item" style="width:190px;height:${itemH}px" data-lcs-left="${ln.vocabKey}"${key ? ` data-lcs-pair="${i + 1}"` : scr ? ` data-lcs-key-badge="s${i + 1}"` : ''}${slot.attr(ctx, 'pic', i)}>` + (key ? keyNumber(i + 1) : '') +
        `<img class="ws-icon" src="${fileUri(theme, ln.noun)}" alt="" style="width:${iconPx}px;height:${iconPx}px">` +
        `<span class="ws-match-dot ws-match-dot--right"></span></div>`
      );
      const rn = nouns[order[i]];
      right.push(
        `<div class="ws-match-item ws-match-item--plain" style="width:190px;height:${itemH}px" data-lcs-right="${rn.vocabKey}"${key ? ` data-lcs-key-badge="${order[i] + 1}"` : scr ? ` data-lcs-pair="s${order[i] + 1}" data-lcs-label="•"` : ''}>` +
        `<img class="ws-icon" src="${fileUri(theme, rn.noun)}" alt="" data-lcs-shadow="1" style="width:${iconPx}px;height:${iconPx}px;filter:brightness(0);opacity:.82">` +
        `<span class="ws-match-dot ws-match-dot--left"></span></div>`
      );
    }

    return {
      bodyHtml:
        `<div class="ws-match">` +
        `<div class="ws-match-col">${left.join('')}</div>` +
        `<div class="ws-match-col">${right.join('')}</div>` +
        `</div>`,
      meta: { pairs: nouns.map((n, i) => ({ left: n.vocabKey, rightRow: order.indexOf(i) })) },
    };
  },

  /** QA: right column is a permutation of left; never identity-aligned. */
  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const left = [...document.querySelectorAll('[data-lcs-left]')].map((e) => e.dataset.lcsLeft);
      const right = [...document.querySelectorAll('[data-lcs-right]')].map((e) => e.dataset.lcsRight);
      if (left.length !== right.length) fails.push('column length mismatch');
      if ([...left].sort().join() !== [...right].sort().join()) fails.push('right column is not a permutation of left');
      left.forEach((v, i) => { if (right[i] === v) fails.push(`row ${i + 1}: shadow sits straight across from its picture`); });
      return fails;
    });
  },
};
