/**
 * Factory: SCIENCE concept-sort — a shuffled strip of DIFFERENT pictures over
 * WORD-labeled bins; the child draws a line from each picture to the category
 * it belongs to (living/non-living, animal class, float/sink, …).
 *
 * Distinct from the existing `sorting-categories` factory (sort-to-bins.js),
 * which sorts DUPLICATE icons to their own ICON-labeled bin (identity match).
 * Science sorts are CONCEPT-based: each bin holds different nouns, the bin is
 * labeled with a localized WORD, and the noun→bin map is hand-curated (the
 * library carries no science metadata). Curated data + bin labels are authored
 * once (EN); noun labels come free from image-vocabulary.js; only the small bin
 * label set localizes (the i18n `extras` mechanism, K-016 precedent).
 *
 * cfg: { id, slug, gradeBand, data, i18n, [maxBins], [difficulty] }
 *   data = { bins:[{key,label:{en,…}}], items:[{theme,noun,bin}] }
 *
 * Curated (theme,noun) refs span themes, so themeAxis is OFF — one instance per
 * (difficulty, variant, locale); the bin/item shuffle is the variety axis.
 *
 * Cores untouched: borrows the .ws-bin shape + .ws-icon; all sort-specific CSS
 * is scoped inline (no page.css edit).
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');

const SCOPED_CSS = `
.sci-sort{flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;min-height:0;padding:6px 0 2px}
.sci-strip{display:flex;justify-content:center;align-items:center;gap:12px;flex-wrap:wrap;padding:4px 0 8px}
.sci-item{position:relative;display:inline-flex;align-items:center;justify-content:center;background:#FBF3E4;border:2px solid #F0E4CB;border-radius:14px}
.sci-item .sci-dot{position:absolute;bottom:-7px;left:50%;transform:translateX(-50%);width:11px;height:11px;border-radius:50%;background:#F2784B;border:2px solid #FFFFFF}
.sci-bins{display:flex;justify-content:space-evenly;align-items:flex-end;gap:18px;padding-top:26px}
.sci-bin{flex:1 1 0;max-width:210px;height:185px;background:#FFFFFF;border:3px solid #146B5E;border-top:3px dashed #146B5E;border-radius:0 0 18px 18px;position:relative;display:block}
.sci-bin-label{position:absolute;top:-26px;left:50%;transform:translateX(-50%);white-space:nowrap;background:#FBF3E4;border:2.5px solid #146B5E;border-radius:999px;padding:6px 16px;font-family:'Baloo 2',cursive;font-weight:700;font-size:17px;color:#146B5E}
`;

function makeScienceCategorySort(cfg) {
  const data = cfg.data;
  const binByKey = Object.fromEntries(data.bins.map((b) => [b.key, b]));
  const itemsByBin = {};
  for (const it of data.items) (itemsByBin[it.bin] = itemsByBin[it.bin] || []).push(it);

  return {
    id: cfg.id,
    slug: cfg.slug,
    gradeBand: cfg.gradeBand || 'K',
    assetClass: 'icon-placement',
    exerciseType: cfg.exerciseType || 'science-sort',
    themeAxis: { applicable: false },
    difficulty: cfg.difficulty || { 1: { perBin: 2 }, 2: { perBin: 3 }, 3: { perBin: 3 } },
    i18n: cfg.i18n,

    build({ difficulty, locale }, ctx) {
      const rng = ctx.rng;
      const d = this.difficulty[difficulty] || this.difficulty[2];
      const maxBins = cfg.maxBins || data.bins.length;
      const binKeys = data.bins.map((b) => b.key).slice(0, maxBins);

      // per-bin label: resolved strings.binLabels (localized) → data label[locale] → label.en
      const labelFor = (key) => {
        const sl = (ctx.binLabels && ctx.binLabels[key]);
        const dl = binByKey[key].label;
        return sl || (dl && (dl[locale] || dl.en)) || key;
      };

      // sample perBin distinct items from each bin (bounded by availability)
      const chosen = [];
      for (const bk of binKeys) {
        const pool = itemsByBin[bk] || [];
        const take = Math.min(d.perBin, pool.length);
        for (const it of rng.sample(pool, take)) chosen.push(it);
      }
      const strip = rng.shuffle(chosen);

      const itemPx = Math.min(78, Math.floor(648 / strip.length) - 12);
      const pad = Math.round(itemPx * 0.12);
      const stripHtml = strip.map((it) =>
        `<span class="sci-item" style="padding:${pad}px" data-sci-item="${it.bin}">` +
        `<img class="ws-icon" src="${fileUri(it.theme, it.noun)}" alt="" style="width:${itemPx}px;height:${itemPx}px">` +
        `<span class="sci-dot"></span></span>`).join('');

      const binsHtml = binKeys.map((bk) =>
        `<div class="ws-bin sci-bin" data-sci-bin="${bk}">` +
        `<span class="sci-bin-label">${labelFor(bk)}</span></div>`).join('');

      return {
        bodyHtml:
          `<style>${SCOPED_CSS}</style>` +
          `<div class="sci-sort">` +
          `<div class="sci-strip">${stripHtml}</div>` +
          `<div class="sci-bins">${binsHtml}</div>` +
          `</div>`,
        meta: { bins: binKeys, perBin: d.perBin, items: strip.map((it) => ({ noun: it.noun, bin: it.bin })) },
      };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const binKeys = [...document.querySelectorAll('[data-sci-bin]')].map((b) => b.dataset.sciBin);
        const items = [...document.querySelectorAll('[data-sci-item]')].map((i) => i.dataset.sciItem);
        if (binKeys.length < 2) fails.push('fewer than 2 bins');
        items.forEach((b, i) => { if (!binKeys.includes(b)) fails.push(`item ${i + 1} bin "${b}" has no labeled bin`); });
        // every bin must receive at least one item
        binKeys.forEach((bk) => { if (!items.includes(bk)) fails.push(`bin "${bk}" got no items`); });
        return fails;
      });
    },
  };
}

module.exports = { makeScienceCategorySort };
