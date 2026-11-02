/**
 * K-069 — Visual closure: which whole picture matches the part?
 * Prompt shows only the top portion of an icon (clipped); the child circles
 * the matching whole picture among three choices.
 * 2026-11-02 (read on the live pages): the clip took the top of the picture's padded BOX, so a wide picture (a ship, a
 * car) showed a speck or nothing; and on the shapes theme the top of a diamond IS a triangle with a triangle among the
 * choices — two right answers. The part is now the top of the DRAWING (data/art-extents.json), shown large, and a
 * choice is refused when the part could be read as it (lib/picture-masks.js partLooksLike: the part has the shape of
 * that whole picture, or of its own top) — synchronous, the same in a maker.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const { artExtentSync } = require('../../image-cache/silhouette.js');
const PM = require('../../lib/picture-masks.js');

module.exports = {
  id: 'K-069',
  slug: 'visual-closure',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'visual-discrimination',
  themeAxis: { applicable: true, minNouns: 8 },
  difficulty: {
    1: { rows: 4, visible: 0.6 },
    2: { rows: 4, visible: 0.5 },
    3: { rows: 5, visible: 0.4 },
  },
  i18n: {
    en: {
      title: 'What Is It?',
      instruction: 'Only part of the picture is showing. Circle the whole picture it belongs to.',
    },
  },

  build({ theme, difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const pool = labelSafeNouns(theme).filter((n) => PM.has(theme, n.noun));
    const px = 76, INK = 84;   // choices at 76 px; the part: the drawing's top, its ink box fitted into 84 px
    const cards = [], used = new Set();
    for (let i = 0; i < d.rows; i++) {
      // a target not used before on the page, and two choices its part cannot be read as
      // ... and whose visible part shows enough of the drawing to recognise (not a thin mast or an antenna)
      const targets = rng.shuffle(pool.filter((n) => !used.has(n.noun) && PM.partInk(theme, n.noun, d.visible) >= PM.MIN_PART_INK));
      let target = null, others = null;
      for (const t of targets) {
        const ok = rng.shuffle(pool.filter((n) => n.noun !== t.noun && n.vocabKey !== t.vocabKey && !PM.partLooksLike(theme, t.noun, n.noun, d.visible)));
        if (ok.length >= 2) { target = t; others = ok.slice(0, 2); break; }
      }
      if (!target) throw new Error(`K-069: theme ${theme} has no picture whose part leaves two clear choices`);
      used.add(target.noun);
      const [d1, d2] = others;
      const e = artExtentSync(theme, target.noun);
      const img = INK / Math.max(e.widthFrac, e.heightFrac);   // the image box size that fits its ink into INK
      const inkW = img * e.widthFrac, inkH = img * e.heightFrac, clipH = Math.round(inkH * d.visible);
      const prompt =
        `<span class="ws-pattern-slot" style="width:${px + 30}px;height:${px + 30}px" data-lcs-part="${target.vocabKey}">` +
        `<span style="display:block;position:relative;width:${Math.round(inkW)}px;height:${clipH}px;overflow:hidden" data-lcs-ink-h="${Math.round(inkH)}">` +
        `<img class="ws-icon" src="${fileUri(theme, target.noun)}" alt="" style="position:absolute;left:${(-img * e.leftFrac).toFixed(1)}px;top:${(-img * e.topFrac).toFixed(1)}px;width:${img.toFixed(1)}px;height:${img.toFixed(1)}px;max-width:none;display:block"></span></span>`;
      const chips = rng.shuffle([target, d1, d2]).map((n) =>
        `<span class="ws-pattern-chip" style="width:${px + 18}px;height:${px + 18}px"` +
        `${n.vocabKey === target.vocabKey ? ' data-lcs-correct="1"' : ''} data-lcs-opt="${n.vocabKey}">` +
        `<img class="ws-icon" src="${fileUri(theme, n.noun)}" alt="" style="width:${px - 8}px;height:${px - 8}px"></span>`).join('');
      cards.push(
        `<div class="ws-card-stage" style="justify-content:space-between;padding:6px 14px">` +
        prompt + `<span class="ws-pattern-choices">${chips}</span></div>`
      );
    }
    return { bodyHtml: cardGrid({ cards, cols: 1, rows: d.rows, numbered: false }), meta: {} };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      document.querySelectorAll('[data-lcs-card]').forEach((card, i) => {
        const part = card.querySelector('[data-lcs-part]');
        const correct = [...card.querySelectorAll('.ws-pattern-chip')].filter((c) => c.dataset.lcsCorrect);
        if (correct.length !== 1) { fails.push(`row ${i + 1}: ${correct.length} correct`); return; }
        if (correct[0].dataset.lcsOpt !== part.dataset.lcsPart) fails.push(`row ${i + 1}: correct chip != clipped noun`);
        // the clip shows part of the DRAWING (its ink box), never all of it, and enough of it to see
        const wrap = part.querySelector('[data-lcs-ink-h]');
        const h = wrap.getBoundingClientRect().height, ink = +wrap.dataset.lcsInkH;
        if (h >= ink - 2) fails.push(`row ${i + 1}: prompt is not actually clipped`);
        if (h < 18) fails.push(`row ${i + 1}: the part is only ${Math.round(h)} px high`);
      });
      return fails;
    });
  },
};
