/**
 * K-011 — Count and color: color exactly N pictures in each row.
 * Uses the BW (outline) variant of the page's theme so coloring is real.
 * The coral badge shows N; the row holds more than N outline icons.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { manifest, themeEntry, labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const slot = require('../../lib/slot.js');

/** the BW (outline) theme to print: a BW theme itself (the maker offers those), or the cached BW sibling of a colour theme (e.g. animals → "animals bw") */
function bwSibling(theme) {
  const m = manifest();
  if (m.themes[theme] && m.themes[theme].bw) return theme;
  const hit = Object.entries(m.themes).find(([name, t]) => t.bw && t.baseTheme.toLowerCase() === theme.toLowerCase());
  if (!hit) throw new Error(`K-011: no BW sibling cached for theme ${theme} (pull "<theme> bw" first)`);
  return hit[0];
}

module.exports = {
  id: 'K-011',
  slug: 'count-and-color',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'counting-pictures',
  themeAxis: { applicable: true, minNouns: 4, needsBwSibling: true },
  difficulty: {
    1: { maxN: 4, rows: 4, rowLen: 6 },
    2: { maxN: 6, rows: 4, rowLen: 8 },
    3: { maxN: 8, rows: 5, rowLen: 9 },
  },
  i18n: {
    en: {
      title: 'Count and Color',
      instruction: 'Color exactly as many pictures as the number shows.',
    },
  },

  build({ theme, difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const bw = bwSibling(theme);
    const nouns = slot.pictures(ctx, rng.sample(labelSafeNouns(bw), d.rows), labelSafeNouns(bw), bw);
    const iconPx = Math.min(56, Math.floor((470 - (d.rowLen - 1) * 8) / d.rowLen));
    const cards = [];
    for (let i = 0; i < d.rows; i++) {
      const n = rng.int(1, Math.min(d.maxN, d.rowLen - 1));
      const icons = Array.from({ length: d.rowLen }, () =>
        `<img class="ws-icon" src="${fileUri(bw, nouns[i].noun)}" alt="" style="width:${iconPx}px;height:${iconPx}px">`).join('');
      cards.push(
        `<div class="ws-card-stage" style="gap:16px;padding:6px 10px" data-lcs-colorn="${n}" data-lcs-rowlen="${d.rowLen}">` +
        `<span style="flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:46px;height:46px;border-radius:50%;` +
        `background:#F2784B;color:#FFFFFF;font-family:'Baloo 2';font-weight:700;font-size:24px">${n}</span>` +
        `<span style="flex:1 1 auto;display:flex;justify-content:space-evenly;align-items:center;min-width:0">${icons}</span>` +
        `</div>`
      );
    }
    // tap-to-edit targets (maker only): item i shows picture i
    for (let i = 0; i < cards.length; i++) cards[i] = slot.stamp(ctx, 'pic', i, cards[i]);
    return { bodyHtml: cardGrid({ cards, cols: 1, rows: d.rows, numbered: false }), meta: { bwTheme: bw } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      document.querySelectorAll('[data-lcs-colorn]').forEach((stage, i) => {
        const n = parseInt(stage.dataset.lcsColorn, 10);
        const len = parseInt(stage.dataset.lcsRowlen, 10);
        const icons = stage.querySelectorAll('.ws-icon').length;
        if (icons !== len) fails.push(`row ${i + 1}: ${icons} icons != ${len}`);
        if (n >= len) fails.push(`row ${i + 1}: target ${n} >= row length ${len} — no choice left`);
        if (n < 1) fails.push(`row ${i + 1}: target < 1`);
      });
      return fails;
    });
  },
};
