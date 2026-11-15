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

/** the kinds of thing a check sorts by (checkPage): each a colour theme of the library and members a child names at once
 *  (pictures opened 2026-11-15: no cherry or plum, which read as apples; one of hen and chicken, which are one picture) */
const SORT_KINDS = [
  { key: 'animals', theme: 'farm animals', members: ['cow', 'pig', 'horse', 'sheep', 'duck', 'hen', 'goat', 'rabbit', 'dog', 'donkey', 'cat'] },
  { key: 'fruit', theme: 'fruits', members: ['banana', 'apple', 'pear', 'lemon', 'strawberry', 'pineapple', 'watermelon', 'orange'] },
  { key: 'vehicles', theme: 'vehicles', members: ['car', 'bus', 'truck', 'train', 'airplane', 'bicycle', 'boat', 'tractor', 'helicopter'] },
  { key: 'clothes', theme: 'clothing', members: ['t-shirt', 'hat', 'shoe', 'dress', 'jacket', 'pants', 'boots', 'scarf', 'mitten', 'sweater', 'skirt', 'cap'] },
];

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
     *  over the bins it is sorted into, the right bin carrying data-lcs-correct (a line drawn on a check has no mark its key
     *  can show: the check circles the bin). Seven cards, each with its own set of bins, the right bin's place drawn evenly
     *  over the cards.
     *  2026-11-15 (native reviews en, de, sv: "picture-to-identical-picture matching that every child gets right"): a bin
     *  of a check is a KIND of thing — animals, fruit, vehicles, clothes — labelled by two of its members, and the picture
     *  to sort is a third member that no bin of the card shows. The kinds and their members are SORT_KINDS below (every
     *  picture opened and read: a cherry and a plum read as apples, a hen and a chicken are one picture, so they are out);
     *  colour pictures only. No word is printed, so the card is the same in every language. */
    checkPage(args, ctx) {
      const { checkGrid } = require('../../lib/check-page.js');
      const rng = ctx.rng, n = 7;
      // (two cards may share their kinds, not their picture to sort: each card draws its own label pictures and its own item)
      const sets = Array.from({ length: n }, () => rng.sample(SORT_KINDS, bins));
      const at = rng.shuffle(sets.map((_, i) => i % bins));
      const usedItems = new Set();
      const cards = sets.map((kinds, ci) => {
        const right = kinds[at[ci]];
        // the picture to sort: a member of the right kind not sorted on another card of the page; the two label pictures of
        // each bin: two other members of its kind
        const free = right.members.filter((m) => !usedItems.has(right.theme + '/' + m));
        const item = rng.pick(free.length ? free : right.members);
        usedItems.add(right.theme + '/' + item);
        const binBoxes = kinds.map((c) => {
          const labels = rng.sample(c.members.filter((m) => !(c === right && m === item)), 2);
          return `<div class="ws-bin" style="flex:0 0 ${bins === 3 ? 96 : 104}px;height:62px" data-lcs-bin="${c.key}" data-lcs-choice="${c.key}"${c === right ? ' data-lcs-correct="1"' : ''}>` +
            `<span class="ws-bin-label" style="width:${bins === 3 ? 84 : 90}px;height:48px;top:-26px;display:flex;align-items:center;justify-content:center;gap:2px">` +
            labels.map((m) => `<img class="ws-icon" src="${fileUri(c.theme, m)}" alt="" style="width:${bins === 3 ? 38 : 40}px;height:${bins === 3 ? 38 : 40}px">`).join('') + `</span></div>`;
        }).join('');
        return `<div style="display:flex;flex-direction:column;align-items:center;gap:36px;padding-top:2px">` +
          `<span class="ws-pattern-slot" style="width:78px;height:78px" data-lcs-item="${right.key}:${item}"><img class="ws-icon" src="${fileUri(right.theme, item)}" alt="" style="width:66px;height:66px"></span>` +
          `<div style="display:flex;justify-content:center;gap:${bins === 3 ? 10 : 18}px;width:100%">${binBoxes}</div></div>`;
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
