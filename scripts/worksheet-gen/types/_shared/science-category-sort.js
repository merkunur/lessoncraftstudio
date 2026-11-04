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
 *
 * Makers (2026-11-02, Sorting): each bin's pictures are a slot (role b<k>, from that bin's own reviewed list — a swap
 * never moves a picture to another group); the KEY numbers the bins and gives each picture its bin's number, the SCREEN
 * makes the bins a palette and the pictures drop targets (place). Level 3 sorts four a bin (it was level 2 again) and a
 * strip of more than nine pictures takes two rows. The catalogue page (level 2) is unchanged.
 * Two options for K-472 (the teacher's own groups): cfg.slotPool() — the pictures a bin's slot may take (default: the
 * bin's own reviewed list), and cfg.nameSlots — each bin's name is a free-text slot (name<k>, lib/slot.js text()). A
 * picture chosen for one bin that already sits in another is refused (the page keeps its drawn picture).
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');
const slot = require('../../lib/slot.js');
const { keyNumber } = require('./key-number.js');

const SCOPED_CSS = `
.sci-sort{flex:1 1 auto;display:flex;flex-direction:column;justify-content:flex-start;min-height:0;padding:6px 0 2px}
.sci-gap{flex:0 1 200px;min-height:110px}
.sci-strip{display:flex;justify-content:center;align-items:center;gap:12px;flex-wrap:wrap;padding:4px 0 8px}
.sci-item{position:relative;display:inline-flex;align-items:center;justify-content:center;background:#FBF3E4;border:2px solid #F0E4CB;border-radius:14px}
.sci-item .sci-dot{position:absolute;bottom:-7px;left:50%;transform:translateX(-50%);width:11px;height:11px;border-radius:50%;background:#F2784B;border:2px solid #FFFFFF}
.sci-bins{flex:1 1 auto;display:flex;justify-content:space-evenly;align-items:stretch;gap:18px;padding-top:26px;min-height:211px;max-height:326px}
.sci-bin{flex:1 1 0;max-width:210px;height:auto;background:#FFFFFF;border:3px solid #146B5E;border-top:3px dashed #146B5E;border-radius:0 0 18px 18px;position:relative;display:block}
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
    difficulty: cfg.difficulty || { 1: { perBin: 2 }, 2: { perBin: 3 }, 3: { perBin: 4 } },
    i18n: cfg.i18n,

    build({ difficulty, locale }, ctx) {
      const rng = ctx.rng;
      const d = this.difficulty[difficulty] || this.difficulty[2];
      const maxBins = cfg.maxBins || data.bins.length;
      const binKeys = data.bins.map((b) => b.key).slice(0, maxBins);

      // per-bin label: resolved strings.binLabels (localized) → data label[locale] → label.en
      const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
      const labelFor = (key) => {
        const sl = (ctx.binLabels && ctx.binLabels[key]);
        const dl = binByKey[key].label;
        const drawn = sl || (dl && (dl[locale] || dl.en)) || key;
        return cfg.nameSlots ? esc(slot.text(ctx, drawn, 'name' + binKeys.indexOf(key), 20)) : drawn;
      };

      // sample perBin distinct items from each bin (bounded by availability). A RETIRED item (data `retired: true`, or
      // `retired: [locales]` — 2026-11-02 sorting review: cheese is dairy, not protein; potato and corn are grains /
      // cereals in every non-US food model; a party balloon is no vehicle; pizza is no clear "not healthy") is never
      // shown: a draw that holds one is drawn again — so a page that never held one keeps every draw it shipped with
      const loc2 = String(locale || 'en').slice(0, 2);
      const retired = (it) => it.retired === true || (Array.isArray(it.retired) && it.retired.includes(loc2));
      const chosen = [];
      for (const bk of binKeys) {
        const pool = itemsByBin[bk] || [];
        const live = pool.filter((it) => !retired(it));
        const take = Math.min(d.perBin, live.length);
        let got = rng.sample(pool, take);
        for (let g = 0; g < 200 && got.some(retired); g++) got = rng.sample(pool, take);
        if (got.some(retired)) got = rng.sample(live, take);
        const role = 'b' + binKeys.indexOf(bk);
        const slotPool = cfg.slotPool ? cfg.slotPool(bk) : live;
        let put = slot.anyPictures(ctx, got, slotPool, role).map((it) => (it.bin === bk ? it : { ...it, bin: bk }));
        // one picture in two groups would have two right answers: the later group's choice is refused
        if (put.some((it) => chosen.some((c) => c.theme === it.theme && c.noun === it.noun))) {
          const ov = { ...((ctx && ctx.overrides) || {}) }; delete ov[role];
          put = slot.anyPictures(ctx && { ...ctx, overrides: ov }, got, slotPool, role).map((it) => (it.bin === bk ? it : { ...it, bin: bk }));
        }
        for (const it of put) chosen.push(it);
      }
      let strip = rng.shuffle(chosen);
      // a NEW page (never the published one: same rng draws there) re-draws a strip whose bins follow a tapping rhythm —
      // the screen asks one bin per picture in strip order (2026-10-06: good, bad, good, bad in every locale)
      // OPT-IN per type (cfg.levelSetRhythm): ~24 types share this factory and several shipped pages at levels 1 and 3, so
      // only an interactive Level Set type (Feelings K-333) re-draws; its published page (level 2, copy 1) never does
      const published = Number(difficulty) === 2 && ((ctx && ctx.variant) || 1) === 1;
      if (cfg.levelSetRhythm && !published) {
        const { tappingRhythm } = require('../../lib/answer-slots.js');
        for (let g = 0; g < 50 && tappingRhythm(strip.map((it) => binKeys.indexOf(it.bin)), binKeys.length); g++) strip = rng.shuffle(chosen);
      }

      // the page fills its body (2026-11-03, final-phase review: one row of 78 px pictures over ~450 px of empty page
      // above the bins): six pictures or more take two rows, the pictures up to 104 px (their padded tile + gap still
      // fits the 648 px row), a line area of ~200 px, and the bins grow into what is left (211-326 px); the rows split evenly (3 + 3, never 4 + 2)
      const perRow = Math.ceil(strip.length / (strip.length >= 6 ? 2 : 1));
      const itemPx = Math.min(104, Math.floor(((648 - 12 * (perRow - 1)) / perRow - 4) / 1.24));
      const pad = Math.round(itemPx * 0.12);
      const key = !!(ctx && ctx.answerKey), scr = !key && !!(ctx && ctx.screen);
      const slotOf = (it) => { const b = binKeys.indexOf(it.bin); return slot.attr(ctx, 'b' + b, chosen.filter((x) => x.bin === it.bin).indexOf(it)); };
      const stripHtml = strip.map((it) =>
        `<span class="sci-item" style="padding:${pad}px" data-sci-item="${it.bin}"` +
        (scr ? ` data-lcs-drop="1" data-lcs-answer="${it.bin}"` : '') + `${slotOf(it)}>` + (key ? keyNumber(binKeys.indexOf(it.bin) + 1) : '') +
        `<img class="ws-icon" src="${fileUri(it.theme, it.noun)}" alt="" style="width:${itemPx}px;height:${itemPx}px">` +
        `<span class="sci-dot"></span></span>`).join('');

      // a label wider than its bin wraps onto two lines inside it (2026-11-02: de "Fleisch, Fisch, Eier" over four bins);
      // the labels that fit stay on one line, as shipped
      const BIN_W = { 2: 200, 3: 180, 4: 152 }, MAX_CH = { 2: 22, 3: 17, 4: 13 };
      const longLabel = (t) => [...String(t)].length > (MAX_CH[binKeys.length] || 13);
      const binsHtml = binKeys.map((bk, k) =>
        `<div class="ws-bin sci-bin" data-sci-bin="${bk}"${scr ? ` data-lcs-bin="${bk}"` : ''}>` + (key ? keyNumber(k + 1) : '') +
        `<span class="sci-bin-label"${longLabel(labelFor(bk)) ? ' style="white-space:normal;text-align:center;width:max-content;max-width:' + (BIN_W[binKeys.length] || 150) + 'px;line-height:1.15;padding:5px 10px;font-size:15px"' : ''}${cfg.nameSlots ? slot.attr(ctx, 'name' + k, 0) : ''}>${labelFor(bk)}</span></div>`).join('');

      return {
        bodyHtml:
          `<style>${SCOPED_CSS}</style>` +
          `<div class="sci-sort">` +
          `<div class="sci-strip" style="max-width:${perRow * (itemPx + 2 * pad + 4) + (perRow - 1) * 12}px;margin:0 auto">${stripHtml}</div>` +
          `<div class="sci-gap"></div>` +
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
