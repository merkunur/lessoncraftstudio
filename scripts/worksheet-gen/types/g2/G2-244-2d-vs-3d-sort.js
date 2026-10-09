/**
 * G2-244 — 2D vs 3D sort (class-10 exemplar): flat shapes and solids from
 * the shapes theme, drawn to two labeled bins.
 */
'use strict';
const { themeEntry, fileUri } = require('../../image-cache/resolve.js');
const { SHAPES_2D, SHAPES_3D } = require('../../lib/shape-data.js');

module.exports = {
  id: 'G2-244',
  slug: '2d-and-3d-shapes',
  gradeBand: 'G23',
  assetClass: 'geometry',
  exerciseType: 'geometry',
  themeAxis: { applicable: false },   // the shapes theme IS the content
  difficulty: {
    1: { per: 3 },
    2: { per: 4 },
    3: { per: 5 },
  },
  i18n: {
    en: { title: 'Flat or Solid?', instruction: 'Draw a line from each shape to its bin: flat shapes left, solid shapes right.' },
  },

  // Level Set 2026-10-08: the screen version (tap every solid) + answer key of every NEW page
  interactive: require('../../lib/geometry-screen.js').interactiveFor('flat-solid'),
  levelSetWords(m) { return [...(m.flat || []), ...(m.solid || [])].map(String); },

  build({ difficulty, locale }, ctx) {
    const published = Number(difficulty) === 2 && ((ctx && ctx.variant) || 1) === 1;
    if (!published && ctx && (ctx.interactive || ctx.answerKey)) {
      const built = this.build({ difficulty, locale }, { ...ctx, interactive: false, answerKey: false });
      return require('../../lib/geometry-screen.js').screenOrKey(built, { ...ctx, locale: (locale || 'en').slice(0, 2), mode: 'flat-solid' });
    }
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const have = Object.keys(themeEntry('shapes').nouns);
    const flat = rng.sample(Object.keys(SHAPES_2D).filter((k) => have.includes(k)), d.per);
    const solid = rng.sample(Object.keys(SHAPES_3D).filter((k) => have.includes(k)), d.per);
    const items = rng.shuffle([
      ...flat.map((k) => ({ k, dim: '2d' })),
      ...solid.map((k) => ({ k, dim: '3d' })),
    ]);
    // 2026-10-09: bigger shapes and bins that use the page (the old page left its lower half empty)
    const px = 104;
    const strip = items.map((it) =>
      `<span class="ws-pattern-slot" style="width:${px + 22}px;height:${px + 22}px" data-lcs-dim="${it.dim}" data-lcs-shape="${it.k}">` +
      `<img class="ws-icon" src="${fileUri('shapes', it.k)}" alt="" style="width:${px}px;height:${px}px"></span>`).join('');

    // bin labels: a square (flat) vs a cube (solid)
    const bin = (labelKey, dim) =>
      `<div class="ws-bin" data-lcs-bin="${dim}">` +
      `<span class="ws-bin-label"><img class="ws-icon" src="${fileUri('shapes', labelKey)}" alt="" style="width:44px;height:44px"></span>` +
      `</div>`;
    const binRow = `<div style="display:flex;justify-content:space-evenly;gap:30px">${bin('square', '2d')}${bin('cube', '3d')}</div>`.replace(/class="ws-bin" /g, 'class="ws-bin" style="max-width:290px;height:300px" ');

    return {
      bodyHtml:
        `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;min-height:0;padding:10px 0">` +
        `<div style="display:flex;justify-content:center;gap:16px;flex-wrap:wrap;max-width:640px;margin:0 auto">${strip}</div>` +
        binRow +
        `</div>`,
      meta: { flat, solid },
      _cards: { mode: 'flat-solid', items: items.map((it) => ({ shape: it.k, dim: it.dim })) },
    };
  },

  async verify(page) {
    const fails0 = await page.evaluate(() => {
      const fails = [];
      const flat2d = ['circle', 'oval', 'triangle', 'square', 'rectangle', 'diamond', 'trapezoid', 'parallelogram', 'pentagon', 'hexagon', 'heptagon', 'octogon'];
      const solid3d = ['cube', 'rectangular_box', 'sphere', 'cone', 'cylinder', 'pyramid'];
      const items = [...document.querySelectorAll('[data-lcs-shape]')];
      let n2 = 0, n3 = 0;
      items.forEach((it) => {
        const k = it.dataset.lcsShape, dim = it.dataset.lcsDim;
        const want = flat2d.includes(k) ? '2d' : (solid3d.includes(k) ? '3d' : null);
        if (!want) fails.push(`${k}: unknown shape`);
        else if (want !== dim) fails.push(`${k}: tagged ${dim}, is ${want}`);
        if (dim === '2d') n2++; else n3++;
      });
      if (n2 < 2 || n3 < 2) fails.push('need at least 2 of each dimension');
      if (document.querySelectorAll('[data-lcs-bin]').length !== 2) fails.push('need exactly 2 bins');
      return fails;
    });
    // 2026-10-09 (operator: half-empty pages): the page uses its height — shapes and bins, no empty half
    const { pageFill } = require('../../lib/page-fill.js');
    const pf = await page.evaluate(pageFill);
    return [...fails0, ...pf.fails];
  },
};
