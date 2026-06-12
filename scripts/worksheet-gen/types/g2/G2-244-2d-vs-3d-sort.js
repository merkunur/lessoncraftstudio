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

  build({ difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const have = Object.keys(themeEntry('shapes').nouns);
    const flat = rng.sample(Object.keys(SHAPES_2D).filter((k) => have.includes(k)), d.per);
    const solid = rng.sample(Object.keys(SHAPES_3D).filter((k) => have.includes(k)), d.per);
    const items = rng.shuffle([
      ...flat.map((k) => ({ k, dim: '2d' })),
      ...solid.map((k) => ({ k, dim: '3d' })),
    ]);
    const px = 72;
    const strip = items.map((it) =>
      `<span class="ws-pattern-slot" style="width:${px + 22}px;height:${px + 22}px" data-lcs-dim="${it.dim}" data-lcs-shape="${it.k}">` +
      `<img class="ws-icon" src="${fileUri('shapes', it.k)}" alt="" style="width:${px}px;height:${px}px"></span>`).join('');

    // bin labels: a square (flat) vs a cube (solid)
    const bin = (labelKey, dim) =>
      `<div class="ws-bin" data-lcs-bin="${dim}">` +
      `<span class="ws-bin-label"><img class="ws-icon" src="${fileUri('shapes', labelKey)}" alt="" style="width:40px;height:40px"></span>` +
      `</div>`;

    return {
      bodyHtml:
        `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;min-height:0;padding:10px 0">` +
        `<div style="display:flex;justify-content:center;gap:16px;flex-wrap:wrap;max-width:640px;margin:0 auto">${strip}</div>` +
        `<div style="display:flex;justify-content:space-evenly;gap:30px">${bin('square', '2d')}${bin('cube', '3d')}</div>` +
        `</div>`,
      meta: { flat, solid },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
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
  },
};
