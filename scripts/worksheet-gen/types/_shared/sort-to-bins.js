/**
 * Factory for sorting-to-bins (K-042 two bins, G1-160 three bins):
 * a shuffled strip of mixed icons; icon-labeled bins below; the child draws
 * a line from each picture to its bin.
 * Makers (2026-11-02): each bin's picture is a slot (bin); the KEY numbers the bins and gives every picture its bin's
 * number, the SCREEN makes the bins a palette and the pictures drop targets (place). The catalogue page is unchanged.
 */
'use strict';
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const slot = require('../../lib/slot.js');
const { keyNumber } = require('./key-number.js');

function makeSortBinsType(cfg) {
  const { id, slug, bins, gradeBand, i18n } = cfg;
  return {
    id,
    slug,
    gradeBand: gradeBand || 'K',
    assetClass: 'icon-placement',
    exerciseType: 'sorting-categories',
    themeAxis: { applicable: true, minNouns: bins + 2 },
    difficulty: {
      1: { perBin: 2 },
      2: { perBin: 3 },
      3: { perBin: 4 },
    },
    i18n,

    build({ theme, difficulty }, ctx) {
      const d = this.difficulty[difficulty];
      const rng = ctx.rng;
      const pool = labelSafeNouns(theme);
      const cats = slot.pictures(ctx, rng.sample(pool, bins), pool, theme, 'bin');
      const key = !!(ctx && ctx.answerKey), scr = !key && !!(ctx && ctx.screen);
      const items = rng.shuffle(cats.flatMap((c) => Array.from({ length: d.perBin }, () => c)));

      // the page fills its body (2026-11-03, final-phase review: one row of small pictures over ~500 px of empty page):
      // six pictures or more take two even rows, the pictures up to 100 px, a ~200 px line area, the bins grow below
      const perRow = Math.ceil(items.length / (items.length >= 6 ? 2 : 1));
      const itemPx = Math.min(100, Math.floor((600 - 14 * (perRow - 1)) / perRow) - 18);
      const stripW = perRow * (itemPx + 18) + (perRow - 1) * 14;
      const strip = items.map((c) =>
        `<span class="ws-pattern-slot" style="width:${itemPx + 18}px;height:${itemPx + 18}px${key ? ';position:relative' : ''}" data-lcs-item="${c.vocabKey}"` +
        (scr ? ` data-lcs-drop="1" data-lcs-answer="${c.vocabKey}"` : '') + `>` + (key ? keyNumber(cats.indexOf(c) + 1) : '') +
        `<img class="ws-icon" src="${fileUri(theme, c.noun)}" alt="" style="width:${itemPx}px;height:${itemPx}px"></span>`).join('');

      const binBoxes = cats.map((c, k) =>
        `<div class="ws-bin" style="height:auto" data-lcs-bin="${c.vocabKey}"${slot.attr(ctx, 'bin', k)}>` + (key ? keyNumber(k + 1) : '') +
        `<span class="ws-bin-label"><img class="ws-icon" src="${fileUri(theme, c.noun)}" alt="" style="width:44px;height:44px"></span>` +
        `</div>`).join('');

      return {
        bodyHtml:
          `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:flex-start;min-height:0;padding:8px 0">` +
          `<div style="display:flex;justify-content:center;gap:14px;flex-wrap:wrap;max-width:${stripW}px;margin:0 auto">${strip}</div>` +
          `<div style="flex:0 1 200px;min-height:110px"></div>` +
          `<div style="flex:1 1 auto;display:flex;justify-content:space-evenly;align-items:stretch;gap:20px;padding-top:30px;min-height:200px;max-height:330px">${binBoxes}</div>` +
          `</div>`,
        meta: { bins: cats.map((c) => c.vocabKey), perBin: d.perBin },
      };
    },

    /** THE ITEM BANK (Part 7.6; docs/daily-teaching-system/PART-7-DESIGN.md "7.6"): the page's task made small — one picture
     *  of the strip over the bins it is sorted into, the right bin carrying data-lcs-correct (a line drawn on a check has no
     *  mark its key can show: the check circles the bin). Seven cards, each with its own set of bins (two cards with the
     *  same bins would be the same task), the right bin's place drawn evenly over the cards. */
    checkPage({ theme }, ctx) {
      const { checkGrid } = require('../../lib/check-page.js');
      const rng = ctx.rng, n = 7;
      const pool = labelSafeNouns(theme);
      if (pool.length < bins + 1) throw new Error(id + ': theme ' + theme + ' has too few pictures for a check');
      const sets = [], seen = new Set();
      for (let guard = 0; sets.length < n && guard < 400; guard++) {
        const cats = rng.sample(pool, bins), k = cats.map((c) => c.noun).sort().join('|');
        if (!seen.has(k)) { seen.add(k); sets.push(cats); }
      }
      if (sets.length < n) throw new Error(id + ': theme ' + theme + ' gives fewer than ' + n + ' sets of bins');
      const at = rng.shuffle(sets.map((_, i) => i % bins));
      const cards = sets.map((cats, ci) => {
        const item = cats[at[ci]];
        const binBoxes = cats.map((c) =>
          `<div class="ws-bin" style="flex:0 0 92px;height:62px" data-lcs-bin="${c.vocabKey}"${c === item ? ' data-lcs-correct="1"' : ''}>` +
          `<span class="ws-bin-label" style="width:52px;height:52px;top:-26px"><img class="ws-icon" src="${fileUri(theme, c.noun)}" alt="" style="width:40px;height:40px"></span></div>`).join('');
        return `<div style="display:flex;flex-direction:column;align-items:center;gap:36px;padding-top:2px">` +
          `<span class="ws-pattern-slot" style="width:78px;height:78px" data-lcs-item="${item.vocabKey}"><img class="ws-icon" src="${fileUri(theme, item.noun)}" alt="" style="width:66px;height:66px"></span>` +
          `<div style="display:flex;justify-content:center;gap:18px;width:100%">${binBoxes}</div></div>`;
      });
      return { bodyHtml: `<div data-lcs-check-page>${checkGrid(cards, { cols: 2 })}</div>`, meta: {} };   // (in a wrapper: a grid straight in the body is cut as an old card page, keyed by the numbers it shows)
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const binKeys = [...document.querySelectorAll('[data-lcs-bin]')].map((b) => b.dataset.lcsBin);
        const counts = {};
        document.querySelectorAll('[data-lcs-item]').forEach((it) => {
          counts[it.dataset.lcsItem] = (counts[it.dataset.lcsItem] || 0) + 1;
          if (!binKeys.includes(it.dataset.lcsItem)) fails.push(`item ${it.dataset.lcsItem} has no bin`);
        });
        const ns = Object.values(counts);
        if (new Set(ns).size !== 1) fails.push('bins are unevenly filled: ' + JSON.stringify(counts));
        if (Object.keys(counts).length !== binKeys.length) fails.push('item kinds != bin count');
        return fails;
      });
    },
  };
}

module.exports = { makeSortBinsType };
