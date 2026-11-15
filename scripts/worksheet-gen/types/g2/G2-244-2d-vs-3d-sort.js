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

  /** THE ITEM BANK (Part 7.6; docs/daily-teaching-system/PART-7-DESIGN.md "7.6"): a card is the page made small — a row
   *  of three shapes (four from level 2), flat and solid mixed, over the page's two bins labelled as the page labels them
   *  (a square: flat, left · a cube: solid, right); the child draws a line from each shape to its bin (review en f1115,
   *  2026-11-15: one shape and two bins was a guess that scored half the time). The square and the cube are not asked: a
   *  picture the same as a bin's label is matched, not sorted; nor is the sphere (see build). The key draws the lines. */
  checkPage({ difficulty }, ctx) {
    const rng = ctx.rng, key = !!(ctx && ctx.answerKey);
    const have = Object.keys(themeEntry('shapes').nouns);
    const flatAll = Object.keys(SHAPES_2D).filter((k) => have.includes(k) && !LABELS.includes(k));
    const solidAll = Object.keys(SHAPES_3D).filter((k) => have.includes(k) && k !== 'sphere' && !LABELS.includes(k));
    const n = Number(difficulty) === 1 ? 3 : 4, W = 600, H = 262, S = 92, BIN = { w: 150, h: 84, y: 170 };
    const binX = { '2d': W * 0.3, '3d': W * 0.7 };
    const seen = new Set(), cards = [];
    for (let guard = 0; cards.length < 6 && guard < 200; guard++) {
      const nSolid = rng.int(1, n - 1);
      const items = rng.shuffle([
        ...rng.sample(flatAll, n - nSolid).map((k) => ({ k, dim: '2d' })),
        ...rng.sample(solidAll, Math.min(solidAll.length, nSolid)).map((k) => ({ k, dim: '3d' })),
      ]);
      const sig = items.map((x) => x.k).join(',');
      if (items.length !== n || seen.has(sig)) continue;
      seen.add(sig);
      const cx = (i) => W * (i + 0.5) / n;
      const shapes = items.map((it, i) => `<span data-lcs-dim="${it.dim}" data-lcs-shape="${it.k}" style="position:absolute;left:${(cx(i) - S / 2).toFixed(1)}px;top:0;width:${S}px;height:${S}px;display:flex">` +
        `<img class="ws-icon" src="${fileUri('shapes', it.k)}" alt="" style="width:${S}px;height:${S}px"></span>`).join('');
      const bin = (labelKey, dim) => `<span data-lcs-bin="${dim}" style="position:absolute;left:${(binX[dim] - BIN.w / 2).toFixed(1)}px;top:${BIN.y}px;width:${BIN.w}px;height:${BIN.h}px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;border:2.5px dashed #146B5E;border-radius:14px;background:#FFFFFF">` +
        `<img class="ws-icon" src="${fileUri('shapes', labelKey)}" alt="" style="width:46px;height:46px"></span>`;
      // the key: a line from each shape to its bin (the cutter reads the drawing as the card's one mark)
      const lines = key ? `<svg data-lcs-key-sample="1" data-lcs-label="${items.map((x) => x.dim).join(',')}" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="position:absolute;left:0;top:0;pointer-events:none">` +
        items.map((it, i) => `<line x1="${cx(i).toFixed(1)}" y1="${S + 4}" x2="${binX[it.dim].toFixed(1)}" y2="${BIN.y - 4}" stroke="#C9552E" stroke-width="3.5" stroke-linecap="round"/>`).join('') + '</svg>' : '';
      cards.push(`<div class="ws-card-stage" style="justify-content:center;align-items:center;padding:8px 4px"><div style="position:relative;width:${W}px;height:${H}px;flex:0 0 auto">` +
        shapes + bin('square', '2d') + bin('cube', '3d') + lines + '</div></div>');
    }
    return { bodyHtml: checkGrid(cards), meta: {} };
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
