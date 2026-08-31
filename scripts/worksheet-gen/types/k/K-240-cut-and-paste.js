/**
 * K-240 — Cut and paste sorting (the "recortar y pegar / Schneideübungen"
 * format — physicality no other type offers). Design-panel ergonomics:
 * the cut strip sits at the BOTTOM so a K child makes ONE long horizontal
 * cut then short vertical cuts (never interior cutting); tiles ≥ ~104px
 * (real scissor ergonomics); paste targets are dashed ghost squares
 * slightly LARGER than the tiles (glue slop tolerance); scissors glyph at
 * the strip's left end. Single-sided by design (schema has no answer key).
 * d1: 2 bins × 2 · d2: 3 bins × 2 · d3: 2 strips, 2 bins × 4.
 */
'use strict';
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const tokens = require('../../primitives/_tokens.js');
const { svgRoot, el, circle } = require('../../primitives/_svg.js');

function scissorsGlyph(size = 26) {
  const s = size;
  const parts = [
    el('path', { d: `M ${s * 0.2} ${s * 0.2} L ${s * 0.85} ${s * 0.62}`, stroke: tokens.color.inkSoft, 'stroke-width': 2.4, 'stroke-linecap': 'round', fill: 'none' }),
    el('path', { d: `M ${s * 0.2} ${s * 0.8} L ${s * 0.85} ${s * 0.38}`, stroke: tokens.color.inkSoft, 'stroke-width': 2.4, 'stroke-linecap': 'round', fill: 'none' }),
    circle({ cx: s * 0.16, cy: s * 0.16, r: s * 0.13, strokeColor: tokens.color.inkSoft, strokeWidth: 2 }),
    circle({ cx: s * 0.16, cy: s * 0.84, r: s * 0.13, strokeColor: tokens.color.inkSoft, strokeWidth: 2 }),
  ];
  return svgRoot({ width: s, height: s, label: 'cut here' }, parts.join(''), { 'data-lcs-scissors': '1' });
}

module.exports = {
  id: 'K-240',
  slug: 'cut-and-paste-sorting',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'cutting-practice',
  themeAxis: { applicable: true, minNouns: 5 },
  difficulty: {
    1: { bins: 2, perBin: 2, tilePx: 128 },
    2: { bins: 3, perBin: 2, tilePx: 104 },
    3: { bins: 2, perBin: 4, tilePx: 104, twoStrips: true },
  },
  i18n: {
    en: {
      title: 'Cut, Sort, and Paste',
      instruction: 'Cut out the pictures at the bottom. Sort them and glue each one into its box.',
    },
  },

  build({ theme, difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const nouns = labelSafeNouns(theme);
    if (nouns.length < this.themeAxis.minNouns) {
      throw new Error(`K-240: theme ${theme} has ${nouns.length} nouns < min`);
    }
    const cats = rng.sample(nouns, d.bins);
    const tiles = rng.shuffle(cats.flatMap((c) => Array.from({ length: d.perBin }, () => c)));
    const ghost = d.tilePx + 8;

    const binBoxes = cats.map((c) =>
      `<div class="ws-bin" style="max-width:none;flex:1 1 0;height:auto;align-self:stretch;` +
      `display:flex;flex-direction:column;align-items:center;justify-content:space-evenly;gap:10px;padding:26px 12px 16px" data-lcs-bin="${c.vocabKey}">` +
      `<span class="ws-bin-label" style="width:56px;height:56px">` +
      `<img class="ws-icon" src="${fileUri(theme, c.noun)}" alt="" style="width:42px;height:42px"></span>` +
      Array.from({ length: d.perBin }, () =>
        `<span style="width:${ghost}px;height:${ghost}px;border:2.5px dashed #C8BFAE;border-radius:12px;background:#FFFFFF;flex:0 0 auto" data-lcs-ghost="${c.vocabKey}"></span>`
      ).join('') +
      `</div>`).join('');

    const tileHtml = (c) =>
      `<span style="display:inline-flex;align-items:center;justify-content:center;width:${d.tilePx}px;height:${d.tilePx}px;` +
      `background:#FFFFFF;border-right:2px dashed #C8BFAE" data-lcs-tile="${c.vocabKey}">` +
      `<img class="ws-icon" src="${fileUri(theme, c.noun)}" alt="" style="width:${Math.round(d.tilePx * 0.78)}px;height:${Math.round(d.tilePx * 0.78)}px"></span>`;

    const strips = [];
    const perStrip = d.twoStrips ? tiles.length / 2 : tiles.length;
    for (let s = 0; s < (d.twoStrips ? 2 : 1); s++) {
      const part = tiles.slice(s * perStrip, (s + 1) * perStrip);
      strips.push(
        `<div style="display:flex;align-items:center;gap:10px;justify-content:center">` +
        scissorsGlyph() +
        `<div style="display:inline-flex;border:2.5px dashed #C8BFAE;border-radius:4px;overflow:hidden" data-lcs-strip="${s}">` +
        part.map(tileHtml).join('') +
        `</div></div>`
      );
    }

    return {
      bodyHtml:
        `<div style="flex:1;display:flex;flex-direction:column;gap:22px;padding-top:26px;min-height:0">` +
        `<div style="flex:1 1 auto;display:flex;align-items:stretch;gap:24px;padding:12px 6px 0;min-height:0">${binBoxes}</div>` +
        `<div style="flex:0 0 auto;display:flex;flex-direction:column;gap:14px;padding-bottom:4px">${strips.join('')}</div>` +
        `</div>`,
      meta: {},
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const bins = [...document.querySelectorAll('[data-lcs-bin]')];
      const tiles = [...document.querySelectorAll('[data-lcs-tile]')];
      const ghosts = [...document.querySelectorAll('[data-lcs-ghost]')];
      if (bins.length < 2) fails.push(`only ${bins.length} bins`);
      if (!document.querySelector('[data-lcs-scissors]')) fails.push('no scissors glyph');
      const binKeys = bins.map((b) => b.dataset.lcsBin);
      const tileCounts = {}, ghostCounts = {};
      tiles.forEach((t) => { tileCounts[t.dataset.lcsTile] = (tileCounts[t.dataset.lcsTile] || 0) + 1; });
      ghosts.forEach((g) => { ghostCounts[g.dataset.lcsGhost] = (ghostCounts[g.dataset.lcsGhost] || 0) + 1; });
      binKeys.forEach((k) => {
        if ((tileCounts[k] || 0) !== (ghostCounts[k] || 0)) fails.push(`bin ${k}: ${tileCounts[k]} tiles vs ${ghostCounts[k]} ghosts`);
      });
      Object.keys(tileCounts).forEach((k) => {
        if (!binKeys.includes(k)) fails.push(`tile kind ${k} has no bin`);
      });
      // scissor ergonomics: tiles at least ~100px
      tiles.forEach((t) => {
        const r = t.getBoundingClientRect();
        if (r.width < 96 || r.height < 96) fails.push('tile below scissor-ergonomic size');
      });
      // paste ghosts must be LARGER than tiles (glue slop)
      if (tiles.length && ghosts.length) {
        const tw = tiles[0].getBoundingClientRect().width;
        const gw = ghosts[0].getBoundingClientRect().width;
        if (gw <= tw) fails.push('ghost not larger than tile');
      }
      return fails;
    });
  },
};
