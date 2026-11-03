/**
 * K-490 — Look, Fold and Find (Find the Differences maker 2026-11-02, NEW-TEMPLATES §29 T3): a memory page. The child
 * looks at picture 1 for as long as they like, folds the page on the dashed line so picture 1 is hidden, and circles
 * what changed in picture 2 from memory, ticking a box for each. No timer anywhere (the platform's no-timer rule): the
 * child decides when they are ready. On the screen, picture 1 is hidden when the child taps it (the marks runtime's
 * cover, scripts/makers/screen.js).
 *
 * The changes are gated candidates of the scene (fd-faces pickSpread: a different kind each where the scene allows),
 * BIG at every level (from memory, a subtle change is a guess): the floors stay at the K level or above. The page's
 * raster diff proves the count; the ledger has one box per change.
 * Levels: 1 three changes (something gone, new or swapped) · 2 four, + bigger or smaller · 3 five, + flipped.
 */
'use strict';
const F = require('../../lib/fd-faces.js');
const C7 = require('../../templates/components-b7.js');
const { screenHotspots } = require('./K-395-find-the-differences.js');

const D = {
  1: { n: 3, ops: { kinds: ['remove', 'add', 'swap'], ring: 64, area: 3000 } },
  2: { n: 4, ops: { kinds: ['remove', 'add', 'swap', 'scale'], ring: 56, area: 2500 } },
  3: { n: 5, ops: { kinds: ['remove', 'add', 'swap', 'scale', 'mirror'], ring: 48, area: 2000 } },
};
const PW = 376;   // two pictures and the fold band fill the body: 2 × 351 + 26 = 728
const compose = (scene, d, rng) => ({ scene, r: F.pickSpread(scene, { n: d.n, ...d.ops }, PW, rng) });
/** the fold band between the pictures: a dashed line across the page and a fold arc at each end */
const foldBand = (w) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="26" viewBox="0 0 ${w} 26" data-lcs-fd-fold="h" style="display:block">` +
  `<line x1="16" y1="13" x2="${w - 16}" y2="13" stroke="#8A8276" stroke-width="2.5" stroke-dasharray="10 7"/>` +
  `<path d="M10,4 C2,4 2,22 10,22" fill="none" stroke="#146B5E" stroke-width="2.5"/><path d="M${w - 10},4 C${w - 2},4 ${w - 2},22 ${w - 10},22" fill="none" stroke="#146B5E" stroke-width="2.5"/></svg>`;

module.exports = {
  id: 'K-490',
  slug: 'look-fold-and-find',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'find-the-differences',
  themeAxis: { applicable: false },
  fitsChrome: true,
  difficulty: D,
  i18n: {
    en: {
      title: 'Look, Fold and Find',
      instruction: 'Look at picture 1 for as long as you like. Then fold the page on the dashed line so picture 1 is hidden. Circle the changes in picture 2 and tick a box for each one.',
    },
  },

  build({ difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng, key = !!(ctx && ctx.answerKey);
    const chromeExtra = (ctx && ctx.chromeExtra) || 0;   // (fitsChrome: a teacher's longer title gives back its px)
    const pw = chromeExtra ? Math.floor(PW * Math.max(0.7, 1 - chromeExtra / 733)) : PW, ph = Math.round(pw * F.H / F.W);
    const got = F.sceneFor('K-490', difficulty, ctx, (scene) => compose(scene, d, rng));
    const p1svg = F.panel(got.scene, [], { width: pw, clipId: 'fdf1', attrs: ' data-lcs-fd-panel="1"' });
    const p2svg = F.panel(got.scene, got.r.ops, { width: pw, clipId: 'fdf2', attrs: ' data-lcs-fd-panel="2"' });
    // the tap targets of the screen (and the key's rings, drawn by the key layer round [data-lcs-correct]): every change
    // padded to ≥ 89 units, a decoy on every unchanged drawing (K-395's own screen hotspots)
    const k = pw / F.W;
    const hots = screenHotspots({ ...got.r, scene: got.scene }, 0, {}).map((h) => `<div data-lcs-pick="1" data-lcs-label="${h.label.replace(/"/g, '')}"${h.diff ? ' data-lcs-correct=""' : ''} style="position:absolute;left:${(h.bbox[0] * k).toFixed(1)}px;top:${(h.bbox[1] * k).toFixed(1)}px;width:${((h.bbox[2] - h.bbox[0]) * k).toFixed(1)}px;height:${((h.bbox[3] - h.bbox[1]) * k).toFixed(1)}px;border-radius:50%"></div>`).join('');
    const p1 = C7.fdPicture({ svg: p1svg, w: pw, h: ph, tab: 1, attrs: 'data-lcs-cover="1" data-lcs-label="1"' });
    const p2 = C7.fdPicture({ svg: p2svg + hots, w: pw, h: ph, tab: 2 });
    const stack = `<div style="display:flex;flex-direction:column;gap:0">${p1}${foldBand(pw + 32)}${p2}</div>`;
    const ledger = `<div style="padding-top:${ph + 26 + 6}px">${C7.fdLedger({ n: got.r.ops.length, box: d.n > 4 ? 48 : 54, gap: 8, ticks: key ? Array(got.r.ops.length).fill(1) : null })}</div>`;
    const body = `<div data-ws-content data-lcs-fd-face="memory" data-lcs-fd-unit="${got.id}" data-lcs-fd-count="${got.r.ops.length}"${key ? ' data-lcs-fd-key="1"' : ''} style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center">` +
      C7.fdColumns({ cells: [stack, '', ledger], widths: [pw + 32, 18, 118] }) + `</div>`;
    return { bodyHtml: body, meta: { unit: got.id, ops: got.r.ops.map((c) => c.kind).join(',') } };
  },

  /** the pin tool's test (tools/build-fd-face-pins.js) */
  pinFits(scene, level) { return F.fits('K-490', level, scene, (s, rng) => compose(s, D[level], rng)); },

  async verify(page) {
    const fails = [];
    const info = await page.evaluate(() => {
      const R = document.querySelector('[data-lcs-fd-face]');
      const picks = [...document.querySelectorAll('[data-lcs-pick]')];
      return { n: +R.dataset.lcsFdCount, ledger: document.querySelectorAll('[data-lcs-fd-box]').length, right: picks.filter((p) => p.hasAttribute('data-lcs-correct')).length, picks: picks.length, covers: document.querySelectorAll('[data-lcs-cover]').length, fold: !!document.querySelector('[data-lcs-fd-fold]') };
    });
    if (info.ledger !== info.n) fails.push(`${info.ledger} ledger boxes for ${info.n} changes`);
    if (info.right !== info.n) fails.push(`${info.right} change targets for ${info.n} changes`);
    if (info.picks <= info.right) fails.push('no unchanged drawing to tap by mistake');
    if (info.covers !== 1) fails.push(`${info.covers} pictures to hide`);
    if (!info.fold) fails.push('no fold line');
    const r = await F.changes(page, 'svg[data-lcs-fd-panel="1"]', 'svg[data-lcs-fd-panel="2"]');
    if (r.error) fails.push(r.error);
    else if (r.comps.length !== info.n) fails.push(`${r.comps.length} visible changes, the page says ${info.n}`);
    // every visible change sits inside one change target (picture 2's box, in units)
    if (!r.error) {
      const boxes = await page.evaluate(() => { const s = document.querySelector('svg[data-lcs-fd-panel="2"]').getBoundingClientRect(); const k = 600 / s.width; return [...document.querySelectorAll('[data-lcs-pick][data-lcs-correct]')].map((p) => { const b = p.getBoundingClientRect(); return [(b.left - s.left) * k, (b.top - s.top) * k, (b.right - s.left) * k, (b.bottom - s.top) * k]; }); });
      for (const c of r.comps) if (!boxes.some((b) => c.x0 >= b[0] - 2 && c.y0 >= b[1] - 2 && c.x1 <= b[2] + 2 && c.y1 <= b[3] + 2)) fails.push('a visible change outside every change target');
    }
    return fails.concat(await F.pageChecks(page));
  },
};
