/**
 * Factory: LITERACY per-locale concept-sort — visually IDENTICAL to
 * science-category-sort (a shuffled strip of pictures over WORD/LETTER/NUMBER
 * labeled bins; draw a line from each picture to its bin), but the bin
 * ASSIGNMENT is LOCALE-SPECIFIC, so bins + items are read per locale.
 *
 * Used by sort-by-beginning-sound (a noun's initial grapheme differs per locale:
 * cat→C en, Katze→K de) and syllable-sort (a noun's syllable count differs per
 * locale). The (theme,noun) image is locale-neutral; the bin it lands in is not.
 *
 * cfg: { id, slug, gradeBand, exerciseType, data, i18n, [difficulty] }
 *   data = { binsByLocale:{en:[{key,label}],…}, itemsByLocale:{en:[{theme,noun,bin}],…} }
 *          (falls back to neutral data.bins / data.items if a locale is absent)
 *
 * Cores untouched — borrows .ws-bin / .ws-icon; sort CSS scoped inline (same as
 * science-category-sort). themeAxis OFF; per-locale item shuffle = variety.
 */
'use strict';
const slot = require('../../lib/slot.js');
const { fileUri } = require('../../image-cache/resolve.js');
const { keyNumber } = require('./key-number.js');

const SCOPED_CSS = `
.sci-sort{flex:1 1 auto;display:flex;flex-direction:column;justify-content:flex-start;min-height:0;padding:6px 0}
.sci-gap{flex:0 1 200px;min-height:110px}
.sci-strip{display:flex;justify-content:center;align-items:center;gap:12px;flex-wrap:wrap;padding:4px 0 8px}
.sci-item{position:relative;display:inline-flex;align-items:center;justify-content:center;background:#FBF3E4;border:2px solid #F0E4CB;border-radius:14px}
.sci-item .sci-dot{position:absolute;bottom:-7px;left:50%;transform:translateX(-50%);width:11px;height:11px;border-radius:50%;background:#F2784B;border:2px solid #FFFFFF}
.sci-bins{flex:1 1 auto;display:flex;justify-content:space-evenly;align-items:stretch;gap:18px;padding-top:26px;min-height:211px;max-height:326px}
.sci-bin{flex:1 1 0;max-width:210px;height:auto;background:#FFFFFF;border:3px solid #146B5E;border-top:3px dashed #146B5E;border-radius:0 0 18px 18px;position:relative;display:block}
.sci-bin-label{position:absolute;top:-26px;left:50%;transform:translateX(-50%);white-space:nowrap;background:#FBF3E4;border:2.5px solid #146B5E;border-radius:999px;padding:6px 16px;font-family:'Baloo 2',cursive;font-weight:700;font-size:17px;color:#146B5E}
`;

function makeLitSort(cfg) {
  const data = cfg.data;
  return {
    id: cfg.id,
    slug: cfg.slug,
    gradeBand: cfg.gradeBand || 'K',
    assetClass: 'icon-placement',
    exerciseType: cfg.exerciseType || 'beginning-sounds',
    themeAxis: { applicable: false },
    difficulty: cfg.difficulty || { 1: { perBin: 2 }, 2: { perBin: 3 }, 3: { perBin: 3 } },
    i18n: cfg.i18n,

    build({ difficulty, locale }, ctx) {
      const rng = ctx.rng;
      const d = this.difficulty[difficulty] || this.difficulty[2];
      const bins = (data.binsByLocale && (data.binsByLocale[locale] || data.binsByLocale.en)) || data.bins;
      const items = (data.itemsByLocale && (data.itemsByLocale[locale] || data.itemsByLocale.en)) || data.items;
      const binByKey = Object.fromEntries(bins.map((b) => [b.key, b]));
      const itemsByBin = {};
      for (const it of items) (itemsByBin[it.bin] = itemsByBin[it.bin] || []).push(it);

      const binKeys = bins.map((b) => b.key);
      const labelFor = (key) => {
        const dl = binByKey[key] && binByKey[key].label;
        return (dl && (typeof dl === 'string' ? dl : (dl[locale] || dl.en))) || key;
      };

      // a teacher's pictures (maker): one role per bin (bin<k>), its pool that bin's own pictures — a picture keeps its answer
      const chosen = [], tapOf = new Map();
      binKeys.forEach((bk, k) => {
        const pool = itemsByBin[bk] || [];
        slot.anyPictures(ctx, rng.sample(pool, Math.min(d.perBin, pool.length)), pool, 'bin' + k).forEach((it, j) => { chosen.push(it); tapOf.set(it, slot.attr(ctx, 'bin' + k, j)); });
      });
      const strip = rng.shuffle(chosen);

      // the page fills its body (2026-11-03, final-phase review — as types/_shared/science-category-sort.js): six pictures
      // or more take two even rows, up to 104 px, a ~200 px line area, the bins grow into the rest
      const perRow = Math.max(1, Math.ceil(strip.length / (strip.length >= 6 ? 2 : 1)));
      const itemPx = Math.min(104, Math.floor(((648 - 12 * (perRow - 1)) / perRow - 4) / 1.24));
      const pad = Math.round(itemPx * 0.12);
      // the maker's answer key (each picture and its bin numbered alike) and drag-to-bin screen (2026-11-02, as
      // science-category-sort); the catalogue page is byte-unchanged
      const key = !!(ctx && ctx.answerKey), scr = !key && !!(ctx && ctx.screen);
      const stripHtml = strip.map((it) =>
        `<span class="sci-item" style="padding:${pad}px" data-sci-item="${it.bin}"${tapOf.get(it) || ''}` + (scr ? ` data-lcs-drop="1" data-lcs-answer="${it.bin}"` : '') + '>' +
        (key ? keyNumber(binKeys.indexOf(it.bin) + 1) : '') +
        `<img class="ws-icon" src="${fileUri(it.theme, it.noun)}" alt="" style="width:${itemPx}px;height:${itemPx}px">` +
        `<span class="sci-dot"></span></span>`).join('');
      const binsHtml = binKeys.map((bk, k) =>
        `<div class="ws-bin sci-bin" data-sci-bin="${bk}"${scr ? ` data-lcs-bin="${bk}"` : ''}>` + (key ? keyNumber(k + 1) : '') + `<span class="sci-bin-label">${labelFor(bk)}</span></div>`).join('');

      return {
        bodyHtml:
          `<style>${SCOPED_CSS}</style>` +
          `<div class="sci-sort"><div class="sci-strip" style="max-width:${perRow * (itemPx + 2 * pad + 4) + (perRow - 1) * 12}px;margin:0 auto">${stripHtml}</div>` +
          `<div class="sci-gap"></div><div class="sci-bins">${binsHtml}</div></div>`,
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
        binKeys.forEach((bk) => { if (!items.includes(bk)) fails.push(`bin "${bk}" got no items`); });
        return fails;
      });
    },
  };
}

module.exports = { makeLitSort };
