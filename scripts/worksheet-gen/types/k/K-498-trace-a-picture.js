/**
 * K-498 — Trace a Picture (Picture Tracing maker 2026-11-02, NEW-TEMPLATES §31 T1): ONE big picture from the image
 * library, redrawn as a tracing guide that lies on its own lines (the trace store, lib/pt-scene.js) — the freedom page:
 * every traced library drawing of the level's band, not only the twenty composed scenes.
 *
 * The drawing's band (data/pt/index.json: P1 simple · P2 · P3 detailed) matches the level, the page keeps the band's
 * rules (the traced length a child is asked for, the smallest picture; lib/pt-render.js classify prints a detail too short
 * to trace solid) and a drawing over its budget is drawn smaller, or skipped. Levels 1-2 show the original picture small
 * in a frame to look at (an eye badge); level 3 traces without it.
 * Levels: 1 PreK — thick dashes, a simple drawing · 2 K — dashes · 3 G1 — dots, a detailed drawing.
 */
'use strict';
const P = require('../../lib/pt-faces.js');

const D = { 1: { model: true }, 2: { model: true }, 3: { model: false } };
/** the eye badge of a look-model (K-418's own: a black disc with a white eye) */
const eyeBadge = (cx, cy) => [{ m: 'circle', a: [cx, cy, 22], fill: '#1a1a1a', stroke: false }, { m: 'glyph.eye', a: [cx, cy, 15], colour: '#FFFFFF', w: 3, clip: false }];

module.exports = {
  id: 'K-498',
  slug: 'trace-a-picture',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'picture-tracing',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: {
    en: {
      title: 'Trace a Picture',
      instruction: 'Trace all the lines of the picture. Start at the black dot.',
    },
  },

  build({ difficulty }, ctx) {
    const d = this.difficulty[difficulty], L = P.LEVEL[difficulty];
    const H = 700 - ((ctx && ctx.chromeExtra) || 0);
    const got = P.artFits(P.drawings('K-498', difficulty), ctx, (src) => {
      const decor = d.model ? [{ m: 'roundRect', a: [16, 24, 170, 190, 12] }, ...eyeBadge(101, 24)] : [];
      const items = d.model
        // the picture to trace keeps clear of the model's frame (x 16-186): centred in x 205-665 (flagship visual check
        // 2026-11-09: a wide picture ran into the frame on 71 of 423 pages, a narwhal's horn under it)
        ? [{ src, x: 101, y: 200, fitBox: [140, 150], render: 'model' }, { src, x: 435, y: Math.round(H / 2), anchor: 'centre', fitBox: [460, H - 30], start: 'top' }]
        : [{ src, x: 337, y: Math.round(H / 2), anchor: 'centre', fitBox: [620, H - 30], start: 'top' }];   // centred: a wide drawing (an open book) sat on the bottom edge under 60 % empty page (2026-11-03)
      return { out: P.composeFit({ W: 675, H, band: L.band, style: L.style, occlusion: false, decor, items }, L.band) };
    });
    const body = `<div data-ws-content${require('../../lib/fl-art.js').tap(ctx)} data-lcs-pt-face="trace-a-picture" data-lcs-pt-src="${got.src}" style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center">${got.out.svg}</div>`;
    return { bodyHtml: body, meta: { picture: got.src, band: L.band, tracedLen: got.out.metrics.tracedLen } };
  },

  async verify(page) { return P.checkPage(page); },
};
