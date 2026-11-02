/**
 * Factory for the size-comparison family:
 *  - circle-superlative: circle the biggest/smallest/tallest/longest (K-032/035/037)
 *  - order-by-size: write 1..N under the icons, smallest→biggest (K-033/034/036)
 * Same-noun icons at distinct uniform scales, baseline-aligned so the size
 * relation reads truthfully (art is never stretched).
 *
 * cfg.shape (2026-11-02, Measurement maker): the attribute the title names must be the one the pictures have — a
 * koala has no "length" a child compares, a car is not "tall". 'tall' (K-035, K-036) draws only the theme's pictures
 * taller than wide (ink height ≥ 1.1 × width), 'long' (K-037) only the ones clearly longer than tall (ink width ≥
 * 1.3 × height); a theme with fewer than two such pictures is refused, two cover three rows (A B A). These pictures are
 * drawn INK-TIGHT (the drawing's own box, lib/silhouette artExtentSync) on one baseline, so the tallest one's top and
 * the longest one's ends are what the eye compares. Without cfg.shape the page is byte-identical to the catalogue.
 *
 * Maker (2026-11-02): a picture slot per row (lib/slot.js) and, in screen / key builds only, data-lcs-correct on the
 * right picture's wrapper (circle mode: the screen is a choice among the row's pictures; the key rings it).
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const { artExtentSync } = require('../../image-cache/silhouette.js');
const { answerBox } = require('../../templates/components.js');
const slot = require('../../lib/slot.js');

/** Distinct visual scales, ratio >= 1.3 between neighbors so K eyes rank them. */
const SCALE_LADDER = [0.42, 0.58, 0.76, 1.0, 1.3];

/** the pictures a shaped page may use: their ink is taller than wide / clearly longer than tall */
const SHAPE_OK = {
  tall: (e) => e.heightFrac / e.widthFrac >= 1.1,
  long: (e) => e.widthFrac / e.heightFrac >= 1.3,
};
function shapedPool(theme, shape) {
  return labelSafeNouns(theme).filter((n) => SHAPE_OK[shape](artExtentSync(theme, n.noun)));
}

function makeSizeCompareType(cfg) {
  const { id, slug, mode, target, rows, itemsPerRow, i18n, shape } = cfg;
  return {
    id,
    slug,
    gradeBand: 'K',
    assetClass: 'icon-placement',
    exerciseType: 'comparing-sizes',
    themeAxis: { applicable: true, minNouns: shape ? 2 : rows },
    difficulty: {
      1: { rows, items: itemsPerRow[0] },
      2: { rows, items: itemsPerRow[1] || itemsPerRow[0] + 1 },
      3: { rows, items: itemsPerRow[2] || itemsPerRow[1] || itemsPerRow[0] + 2 },
    },
    i18n,

    build({ theme, difficulty }, ctx) {
      const d = this.difficulty[difficulty];
      const rng = ctx.rng;
      const marks = !!(ctx && (ctx.answerKey || ctx.screen));
      let nouns, slots;
      if (shape) {
        const pool = shapedPool(theme, shape);
        if (pool.length < 2) throw new Error(`${id}: theme ${theme} has ${pool.length} ${shape} pictures (a page needs 2)`);
        const pick = slot.pictures(ctx, rng.sample(pool, Math.min(d.rows, pool.length)), pool, theme);
        slots = pick.length;
        nouns = Array.from({ length: d.rows }, (_, i) => pick[i % pick.length]);
      } else {
        const pool = labelSafeNouns(theme);
        nouns = slot.pictures(ctx, rng.sample(pool, d.rows), pool, theme);
        slots = d.rows;
      }
      // largest item fills the card stage (~200px tall for 3 stacked cards);
      // order mode reserves room for the write-in box below each icon
      const basePx = mode === 'order' ? 120 : 150;
      const cards = [];
      const truth = [];
      for (let i = 0; i < d.rows; i++) {
        // consecutive ladder steps normalized so the largest = 1.0 (full base size)
        const steps = SCALE_LADDER.slice(0, d.items);
        const maxStep = Math.max(...steps);
        const scales = rng.shuffle(steps.map((s) => Math.round((s / maxStep) * 100) / 100));
        const targetIdx = target === 'largest'
          ? scales.indexOf(Math.max(...scales))
          : scales.indexOf(Math.min(...scales));
        const rank = scales.map((s) => [...scales].sort((a, b) => a - b).indexOf(s) + 1);

        let drawn;
        if (shape) {
          // ink-tight: the largest drawing is as tall (tall) or as long (long) as the row allows; every other one is the
          // same drawing at its scale — so the compared attribute is exactly in the ratio of the scales
          const e = artExtentSync(theme, nouns[i].noun);
          const sum = scales.reduce((a, b) => a + b, 0);
          const maxH = mode === 'order' ? 140 : 170, rowW = 600 - 24 * (scales.length - 1);
          const inkH1 = Math.min(maxH, (rowW / sum) * (e.heightFrac / e.widthFrac));   // the largest ink height
          drawn = scales.map((s) => {
            const ih = inkH1 * s, box = ih / e.heightFrac, iw = box * e.widthFrac;
            return { w: iw, h: ih, html: `<span style="position:relative;display:block;flex:0 0 auto;width:${iw.toFixed(1)}px;height:${ih.toFixed(1)}px;overflow:hidden" data-lcs-ink="1" data-lcs-art="1">` +
              `<img class="ws-icon" src="${fileUri(theme, nouns[i].noun)}" alt="" style="position:absolute;left:${(-e.leftFrac * box).toFixed(1)}px;top:${(-e.topFrac * box).toFixed(1)}px;width:${box.toFixed(1)}px;height:${box.toFixed(1)}px"${'{T}'} data-lcs-scale="${s}"></span>` };
          });
        }
        const items = scales.map((s, k) => {
          const px = Math.round(basePx * s);
          const tgt = mode === 'circle' && k === targetIdx ? ' data-lcs-target="1"' : '';
          const img = shape ? drawn[k].html.replace('{T}', tgt)
            : `<img class="ws-icon" src="${fileUri(theme, nouns[i].noun)}" alt="" ` +
            `style="width:${px}px;height:${px}px"${tgt} data-lcs-scale="${s}">`;
          const stageH = shape ? Math.ceil(Math.max(...drawn.map((x) => x.h))) : Math.round(basePx * 1.3);
          if (mode === 'order') {
            return `<span style="display:inline-flex;flex-direction:column;align-items:center;gap:8px;justify-content:flex-end">` +
              `<span style="display:flex;align-items:flex-end;height:${stageH}px">${img}</span>` +
              answerBox({ w: 46, h: 40, answer: rank[k] }) + `</span>`;
          }
          const right = marks && k === targetIdx ? ' data-lcs-correct="1"' : '';
          return `<span style="display:flex;align-items:flex-end;height:${stageH}px"${right}>${img}</span>`;
        });

        cards.push(
          `<div class="ws-card-stage" style="justify-content:space-evenly;align-items:flex-end;padding:10px" ` +
          `data-lcs-mode="${mode}" data-lcs-targetscale="${target === 'largest' ? Math.max(...scales) : Math.min(...scales)}"${shape ? ` data-lcs-shape="${shape}"` : ''}${i < slots ? slot.attr(ctx, 'pic', i) : ''}>` +
          items.join('') + `</div>`
        );
        truth.push({ row: i + 1, scales, targetIdx, rank });
      }
      return { bodyHtml: cardGrid({ cards, cols: 1, rows: d.rows, numbered: false }), meta: { rows: truth } };
    },

    async verify(page) {
      const m = mode, tgt = target;
      return page.evaluate(({ mode, target }) => {
        const fails = [];
        document.querySelectorAll('[data-lcs-mode]').forEach((stage, i) => {
          const icons = [...stage.querySelectorAll('.ws-icon')];
          const scales = icons.map((el) => parseFloat(el.dataset.lcsScale));
          if (new Set(scales).size !== scales.length) fails.push(`row ${i + 1}: duplicate scales`);
          // a shaped row: the RENDERED ink boxes — the attribute the title names ranks like the scales, every step a
          // visible one (≥ 1.25×), every drawing standing on the one baseline
          const shape = stage.dataset.lcsShape;
          if (shape) {
            const ink = [...stage.querySelectorAll('[data-lcs-ink]')].map((el) => el.getBoundingClientRect());
            const attr = ink.map((r) => (shape === 'tall' ? r.height : r.width));
            const byScale = scales.map((s, k) => [s, attr[k]]).sort((a, b) => a[0] - b[0]);
            for (let k = 1; k < byScale.length; k++) if (byScale[k][1] < byScale[k - 1][1] * 1.25) fails.push(`row ${i + 1}: the ${shape === 'tall' ? 'heights' : 'lengths'} are not clearly different`);
            const bottoms = ink.map((r) => r.bottom);
            if (Math.max(...bottoms) - Math.min(...bottoms) > 1) fails.push(`row ${i + 1}: the drawings do not stand on one line`);
            const wide = ink.map((r) => r.width / r.height);
            if (shape === 'tall' && wide.some((w) => w > 1 / 1.1 + 0.02)) fails.push(`row ${i + 1}: a picture is not tall`);
            if (shape === 'long' && wide.some((w) => w < 1.3 - 0.02)) fails.push(`row ${i + 1}: a picture is not long`);
          }
          if (mode === 'circle') {
            const t = icons.find((el) => el.dataset.lcsTarget);
            if (!t) { fails.push(`row ${i + 1}: no target`); return; }
            const ts = parseFloat(t.dataset.lcsScale);
            const expected = target === 'largest' ? Math.max(...scales) : Math.min(...scales);
            if (ts !== expected) fails.push(`row ${i + 1}: target scale ${ts} != ${expected}`);
            const right = stage.querySelector('[data-lcs-correct]');
            if (right && !right.contains(t)) fails.push(`row ${i + 1}: the key marks another picture`);
          } else {
            const boxes = [...stage.querySelectorAll('[data-lcs-answer]')].map((b) => parseInt(b.dataset.lcsAnswer, 10));
            const sorted = scales.map((s) => [...scales].sort((a, b) => a - b).indexOf(s) + 1);
            if (boxes.join() !== sorted.join()) fails.push(`row ${i + 1}: rank labels wrong`);
          }
        });
        return fails;
      }, { mode: m, target: tgt });
    },
  };
}

module.exports = { makeSizeCompareType, SCALE_LADDER, shapedPool };
