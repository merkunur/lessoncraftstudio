/**
 * G2-244 — 2D vs 3D sort (class-10 exemplar): flat shapes and solids from
 * the shapes theme, drawn to two labeled bins.
 */
'use strict';
const { themeEntry, fileUri } = require('../../image-cache/resolve.js');
const { SHAPES_2D, SHAPES_3D } = require('../../lib/shape-data.js');
const { checkGrid } = require('../../lib/check-page.js');
// the bins' labels (flat · solid): never a shape to sort, on the page or on the check
const LABELS = ['square', 'cube'];

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

  /** THE ITEM BANK (Part 7.6; docs/daily-teaching-system/PART-7-DESIGN.md "7.6"): each shape a card of its own beside
   *  its own two small bins, labelled as the page labels them (a square: flat · a cube: solid); the page's two bins stand
   *  beside its row of shapes, so a shape could not be cut from it. The square and the cube are not asked: a picture the
   *  same as a bin's label is matched, not sorted. Two flat shapes more than the level draws, and three or four solids
   *  (all the page has besides the cube and the sphere): never as many cards as the page, whose key cards the cutter
   *  pairs with the cards by their number. The right bin carries data-lcs-correct. */
  checkPage({ difficulty }, ctx) {
    const d = this.difficulty[difficulty] || this.difficulty[2], rng = ctx.rng;
    const have = Object.keys(themeEntry('shapes').nouns);
    const flatAll = Object.keys(SHAPES_2D).filter((k) => have.includes(k) && k !== 'square');
    const solidAll = Object.keys(SHAPES_3D).filter((k) => have.includes(k) && k !== 'sphere' && k !== 'cube');   // (the sphere: see build)
    const items = rng.shuffle([
      ...rng.sample(flatAll, d.per + 2).map((k) => ({ k, dim: '2d' })),
      ...rng.sample(solidAll, Math.min(solidAll.length, d.per)).map((k) => ({ k, dim: '3d' })),
    ]);
    const bin = (labelKey, dim, ok) => `<span data-lcs-choice="${dim}" data-lcs-bin="${dim}"${ok ? ' data-lcs-correct="1"' : ''} style="display:inline-flex;align-items:center;justify-content:center;width:84px;height:66px;box-sizing:border-box;border:2.5px dashed #146B5E;border-radius:12px;background:#FFFFFF">` +
      `<img class="ws-icon" src="${fileUri('shapes', labelKey)}" alt="" style="width:40px;height:40px"></span>`;
    const cards = items.map((it) => `<div class="ws-card-stage" style="justify-content:space-evenly;align-items:center;gap:16px;padding:6px 4px" data-lcs-dim="${it.dim}" data-lcs-shape="${it.k}">` +
      `<img class="ws-icon" src="${fileUri('shapes', it.k)}" alt="" style="width:104px;height:104px">` +
      `<span style="display:flex;gap:14px">${bin('square', '2d', it.dim === '2d')}${bin('cube', '3d', it.dim === '3d')}</span></div>`);
    return { bodyHtml: checkGrid(cards, { cols: 2 }), meta: { flat: items.filter((x) => x.dim === '2d').map((x) => x.k), solid: items.filter((x) => x.dim === '3d').map((x) => x.k) } };
  },

  build({ difficulty, locale }, ctx) {
    const published = Number(difficulty) === 2 && ((ctx && ctx.variant) || 1) === 1;
    if ((!published || (ctx && ctx.publishedScreen && ctx.interactive)) && ctx && (ctx.interactive || ctx.answerKey)) {
      const built = this.build({ difficulty, locale }, { ...ctx, interactive: false, answerKey: false });
      return require('../../lib/geometry-screen.js').screenOrKey(built, { ...ctx, locale: (locale || 'en').slice(0, 2), mode: 'flat-solid' });
    }
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const have = Object.keys(themeEntry('shapes').nouns);
    // 2026-11-14: the square and the cube are the bins' labels, so they are never shapes to sort: a picture the same as
    // a label is matched, not sorted (a reviewer found both on live pages). LABELS below is the one list.
    const flat = rng.sample(Object.keys(SHAPES_2D).filter((k) => have.includes(k) && !LABELS.includes(k)), d.per);
    // 2026-11-13: no sphere on this page. The library's ball is a disc with a faint shine: beside a flat circle a
    // child (and a reviewing teacher) sorts it as flat, and the key says solid. Four solids are left (box, cone,
    // cylinder, pyramid), so level 3 sorts five flat shapes and four solids.
    const solidAll = Object.keys(SHAPES_3D).filter((k) => have.includes(k) && k !== 'sphere' && !LABELS.includes(k));
    const solid = rng.sample(solidAll, Math.min(d.per, solidAll.length));
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
        if (k === 'square' || k === 'cube') fails.push(`${k}: a bin's label is a shape to sort (matched, not sorted)`);
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
