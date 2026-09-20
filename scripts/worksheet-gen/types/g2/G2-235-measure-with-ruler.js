/**
 * G2-235 — Measure with the ruler (class-11 exemplar).
 * The object's ART (not its padded image box) is registered to span exactly
 * N units from the ruler's zero — the honest-measurement guarantee.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const rulerPrim = require('../../primitives/ruler.js');
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const { artExtent } = require('../../image-cache/silhouette.js');
const { answerBox } = require('../../templates/components.js');

module.exports = {
  id: 'G2-235',
  slug: 'measuring-with-a-ruler',
  gradeBand: 'G23',
  assetClass: 'measurement',
  exerciseType: 'measurement',
  themeAxis: { applicable: true, minNouns: 4 },
  // d3 is harder by the 12-unit ruler ONLY. It shipped as rows:4 (2026-06 →
  // 2026-09): four cards leave 156 px per stage for a 105–120 px art band plus
  // a 64 px ruler, so the column-flex stage SHRANK both — the band cropped
  // the animal and the ruler's default xMidYMid re-centred its 0 tick 134 px
  // right of the picture, on every d3 deck in 11 locales. Measured at the
  // fix (out/dev/_measure-budget.js): 3 rows = 233 px per stage, 4 = 164.
  // Fitting four would mean a smaller band → a tighter maxLen filter → a
  // different noun pool → alternate themes → different slugs (no longer an
  // in-place update). Three rows is the d2 layout, proven.
  difficulty: {
    1: { cmMax: 8, rows: 3 },
    2: { cmMax: 10, rows: 3 },
    3: { cmMax: 12, rows: 3 },
  },
  i18n: {
    en: { title: 'Measure It!', instruction: 'Each object starts at 0. Read the ruler and write how many units long it is.' },
  },

  async build({ theme, difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const pool = labelSafeNouns(theme);
    const pxPerCmConst = 44, bandMax = 120;
    // only art FLAT enough to span ≥3 units inside the 120px band qualifies:
    // artH = (heightFrac/widthFrac) × lengthCm × pxPerCm must stay ≤ bandMax
    const wide = [];
    for (const n of rng.shuffle(pool)) {
      const ext = await artExtent(theme, n.noun);
      const maxLen = Math.floor(bandMax * ext.widthFrac / (pxPerCmConst * ext.heightFrac));
      if (maxLen >= 3) wide.push({ ...n, ext, maxLen });
      if (wide.length >= d.rows) break;
    }
    if (wide.length < d.rows) {
      throw new Error(`G2-235: theme ${theme} has only ${wide.length} flat-enough nouns for ruler registration`);
    }

    const pxPerCm = 44;
    const cards = [];
    for (let i = 0; i < d.rows; i++) {
      const item = wide[i];
      const lengthCm = rng.int(3, Math.min(d.cmMax - 1, item.maxLen));
      const r = rulerPrim({ cm: d.cmMax, pxPerCm });
      // box sized so the ART spans lengthCm horizontally; the wrapper crops
      // away the image's transparent top/bottom so the page shows only the
      // art band, registered to start at the ruler's zero.
      const targetPx = lengthCm * pxPerCm;
      const boxW = targetPx / item.ext.widthFrac;        // full square image width
      const leftShift = item.ext.leftFrac * boxW;
      const artH = item.ext.heightFrac * boxW;           // images are square: H == W
      const topShift = item.ext.topFrac * boxW;
      const bandH = Math.min(artH, 120);
      const scale = bandH / artH;                        // shrink tall art into the band
      const dispW = boxW * scale;
      const dispShift = leftShift * scale;
      const lenPx = lengthCm * pxPerCm * scale;          // art span AFTER scaling
      // keep horizontal truth: scale must stay 1 for wide art (artH ≤ 120)
      cards.push(
        `<div class="ws-card-stage" style="flex-direction:column;gap:0;align-items:flex-start;padding:4px 0 4px ${Math.max(0, (640 - r.width) / 2)}px" ` +
        `data-lcs-len="${lengthCm}" data-lcs-dispw="${dispW.toFixed(1)}" data-lcs-dispshift="${dispShift.toFixed(1)}" ` +
        `data-lcs-widthfrac="${item.ext.widthFrac.toFixed(4)}" data-lcs-scale="${scale.toFixed(4)}">` +
        `<div data-lcs-artband style="position:relative;flex:0 0 auto;width:${r.width}px;height:${bandH.toFixed(1)}px;overflow:hidden">` +
        `<img class="ws-icon" src="${fileUri(theme, item.noun)}" alt="" ` +
        `style="position:absolute;left:${(r.meta.zeroX - dispShift).toFixed(1)}px;top:${(-topShift * scale).toFixed(1)}px;width:${dispW.toFixed(1)}px;height:${dispW.toFixed(1)}px">` +
        `</div>` +
        r.svg +
        `<div style="align-self:flex-end;margin-top:10px">${answerBox({ w: 76, h: 52, answer: lengthCm })}</div>` +
        `</div>`
      );
    }
    return { bodyHtml: cardGrid({ cards, cols: 1, rows: d.rows }), meta: {} };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      document.querySelectorAll('[data-lcs-len]').forEach((stage, i) => {
        const len = +stage.dataset.lcsLen;
        const svg = stage.querySelector('[data-lcs-prim="ruler"]');
        const cmMax = +svg.dataset.lcsCmmax;
        const pxPerCm = +svg.dataset.lcsPxpercm;
        const zeroX = +svg.dataset.lcsZerox;
        if (len >= cmMax) fails.push(`row ${i + 1}: object longer than the ruler`);
        const scale = +stage.dataset.lcsScale;
        if (Math.abs(scale - 1) > 0.001) fails.push(`row ${i + 1}: art was rescaled (scale ${scale}) — registration broken`);
        // geometric re-check: art span == len * pxPerCm (within 1.5px)
        const dispW = +stage.dataset.lcsDispw;
        const widthFrac = +stage.dataset.lcsWidthfrac;
        const artSpan = dispW * widthFrac;
        if (Math.abs(artSpan - len * pxPerCm) > 1.5) fails.push(`row ${i + 1}: art spans ${artSpan.toFixed(1)}px != ${len * pxPerCm}px`);
        // art left edge registered at the ruler zero (within 1.5px)
        const img = stage.querySelector('img.ws-icon');
        const imgLeft = parseFloat(img.style.left);
        const shift = +stage.dataset.lcsDispshift;
        if (Math.abs((imgLeft + shift) - zeroX) > 1.5) fails.push(`row ${i + 1}: art does not start at 0`);
        if (+stage.querySelector('[data-lcs-answer]').dataset.lcsAnswer !== len) fails.push(`row ${i + 1}: answer mismatch`);
        // RENDERED geometry — the style attributes above were all correct on the
        // shipped d3 decks while the flex layout shrank the band and re-scaled the
        // ruler under them (2026-09). Measure the boxes the child sees.
        const band = stage.querySelector('[data-lcs-artband]') || img.parentElement;   // (the pre-stamp markup: the crop wrapper is the img's parent)
        const bandR = band.getBoundingClientRect();
        if (Math.abs(bandR.height - parseFloat(band.style.height)) > 1) fails.push(`row ${i + 1}: art band renders ${bandR.height.toFixed(1)} px, declared ${band.style.height} (shrunk)`);
        const svgR = svg.getBoundingClientRect();
        if (Math.abs(svgR.width - +svg.getAttribute('width')) > 0.5 || Math.abs(svgR.height - +svg.getAttribute('height')) > 0.5) fails.push(`row ${i + 1}: ruler renders ${svgR.width.toFixed(1)}×${svgR.height.toFixed(1)}, declared ${svg.getAttribute('width')}×${svg.getAttribute('height')}`);
        const tickX = (v) => { const l = svg.querySelector(`line[data-lcs-cm="${v}"]`); const pt = svg.createSVGPoint(); pt.x = +l.getAttribute('x1'); pt.y = 0; return pt.matrixTransform(l.getScreenCTM()).x; };
        const zeroPage = tickX(0);
        if (Math.abs((tickX(1) - zeroPage) - pxPerCm) > 0.5) fails.push(`row ${i + 1}: rendered tick spacing ${(tickX(1) - zeroPage).toFixed(1)} != ${pxPerCm} (ruler re-scaled)`);
        const artLeftPage = img.getBoundingClientRect().left + shift;
        if (Math.abs(artLeftPage - zeroPage) > 1.5) fails.push(`row ${i + 1}: rendered art left ${artLeftPage.toFixed(1)} vs rendered 0 tick ${zeroPage.toFixed(1)}`);
        const artRightPage = artLeftPage + len * pxPerCm;
        if (Math.abs(artRightPage - tickX(len)) > 1.5) fails.push(`row ${i + 1}: rendered art right ${artRightPage.toFixed(1)} vs tick ${len} at ${tickX(len).toFixed(1)}`);
        const card = stage.closest('.ws-card').getBoundingClientRect();
        for (const ch of stage.children) { const r = ch.getBoundingClientRect(); if (r.bottom > card.bottom + 0.5 || r.right > card.right + 0.5) fails.push(`row ${i + 1}: <${ch.tagName.toLowerCase()}> overflows its card (${r.bottom.toFixed(0)} > ${card.bottom.toFixed(0)})`); }
      });
      return fails;
    });
  },
};
