/**
 * K-491 — Draw What Is Missing (Find the Differences maker 2026-11-02, NEW-TEMPLATES §29 T4): picture 1 is complete;
 * some of its drawings are gone from picture 2, and the child DRAWS them back in their places (production, where
 * "What Is Missing?" K-399 only circles the empty places). Observation first, then a drawing with a model to copy.
 *
 * The gone drawings are gated `remove` candidates of the scene (lib/fd-compose.js), big enough to draw into (the K
 * floors raised), never the scene's main character (a garden without its dog is a different picture). Levels 1-2 draw
 * a dashed guide circle round each empty place; level 3 leaves the child to find the places. The page's raster diff
 * proves the count and (with guides) that every empty place sits inside its circle. The key is picture 2 complete
 * again, the places ringed.
 * Levels: 1 two drawings gone, guides · 2 three gone, guides · 3 three gone, no guides.
 */
'use strict';
const F = require('../../lib/fd-faces.js');
const C7 = require('../../templates/components-b7.js');

const D = {
  1: { n: 2, guides: true, ring: 64, area: 3000 },
  2: { n: 3, guides: true, ring: 48, area: 1800 },
  3: { n: 3, guides: false, ring: 48, area: 1800 },
};
/** the gone drawings: n separated removals of drawings big enough to draw, never the hero */
const compose = (scene, d, pw, rng) => ({ scene, r: F.pickOps(scene, F.cfgOf({ n: d.n, kinds: ['remove'], ring: d.ring, area: d.area, noKindCap: true, heroProb: 0 }, pw), rng) });

module.exports = {
  id: 'K-491',
  slug: 'draw-what-is-missing',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'find-the-differences',
  themeAxis: { applicable: false },
  fitsChrome: true,
  difficulty: D,
  i18n: {
    en: {
      title: 'Draw What Is Missing',
      instruction: 'Some things from picture 1 are missing in picture 2. Draw each one back in its place in picture 2.',
    },
  },

  build({ difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng, key = !!(ctx && ctx.answerKey);
    const chromeExtra = (ctx && ctx.chromeExtra) || 0;   // (fitsChrome: a teacher's longer title gives back its px)
    const pw = chromeExtra ? Math.floor(384 * Math.max(0.7, 1 - chromeExtra / 733)) : 384, ph = Math.round(pw * F.H / F.W);
    const got = F.sceneFor('K-491', difficulty, ctx, (scene) => compose(scene, d, 384, rng));
    const p1 = C7.fdPicture({ svg: F.panel(got.scene, [], { width: pw, clipId: 'fdm1', attrs: ' data-lcs-fd-panel="1"' }), w: pw, h: ph, tab: 1 });
    // the key: picture 2 whole again, each place ringed; the page: the drawings gone (+ the guide circles)
    const svg2 = key ? F.panel(got.scene, [], { width: pw, clipId: 'fdm2', attrs: ' data-lcs-fd-panel="2"', rings: got.r.rings })
      : F.panel(got.scene, got.r.ops, { width: pw, clipId: 'fdm2', attrs: ' data-lcs-fd-panel="2"', dashed: d.guides ? got.r.rings : null });
    const p2 = C7.fdPicture({ svg: svg2, w: pw, h: ph, tab: 2 });
    const body = `<div data-ws-content${require('../../lib/fl-art.js').tap(ctx)} data-lcs-fd-face="missing-draw" data-lcs-fd-unit="${got.id}" data-lcs-fd-count="${got.r.ops.length}"${key ? ' data-lcs-fd-key="1"' : ''} style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center">` +
      `<div data-lcs-key-sample="picture" style="display:flex;justify-content:center;width:675px;padding-right:30px;box-sizing:border-box">${C7.fdStack({ p1, p2 })}</div></div>`;
    return { bodyHtml: body, meta: { unit: got.id, gone: got.r.ops.map((c) => c.item).join(',') } };
  },

  /** the pin tool's test (tools/build-fd-face-pins.js) */
  pinFits(scene, level) { return F.fits('K-491', level, scene, (s, rng) => compose(s, D[level], 384, rng)); },

  async verify(page) {
    const fails = [];
    const info = await page.evaluate(() => {
      const R = document.querySelector('[data-lcs-fd-face]');
      const g = [...document.querySelectorAll('svg[data-lcs-fd-panel="2"] [data-lcs-fd-ring="guide"]')].map((e) => { const cx = +e.getAttribute('cx'), cy = +e.getAttribute('cy'), rx = +e.getAttribute('rx'), ry = +e.getAttribute('ry'); return [cx - rx, cy - ry, cx + rx, cy + ry]; });
      return { n: +R.dataset.lcsFdCount, key: R.hasAttribute('data-lcs-fd-key'), guides: g };
    });
    const r = await F.changes(page, 'svg[data-lcs-fd-panel="1"]', 'svg[data-lcs-fd-panel="2"]');
    if (r.error) return fails.concat([r.error]);
    if (info.key) { if (r.comps.length) fails.push(`the key's picture 2 is not whole again (${r.comps.length} differences)`); }
    else {
      if (r.comps.length !== info.n) fails.push(`${r.comps.length} drawings gone, the page says ${info.n}`);
      if (info.guides.length && info.guides.length !== info.n) fails.push(`${info.guides.length} guide circles for ${info.n} gone drawings`);
      for (const c of r.comps) if (info.guides.length && !info.guides.some((g) => c.x0 >= g[0] - 2 && c.y0 >= g[1] - 2 && c.x1 <= g[2] + 2 && c.y1 <= g[3] + 2)) fails.push('an empty place outside every guide circle');
    }
    return fails.concat(await F.pageChecks(page));
  },
};
