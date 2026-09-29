/**
 * K-387 — Picture to Picture. Level Set 2026-09-29: a NEW variation in family pre-writing (not a face of
 * K-236's lanes). Each lane is ONE long dashed path from a start picture to a finish picture: the child
 * starts at the orange dot beside the first picture and draws all the way across to the second — one
 * continuous arm movement, not repeated short marks. Levels by path difficulty (every path dashed):
 * 1 straight lines and gentle waves · 2 zigzags, bumps and mountains · 3 loops, castle walls and many-turn paths.
 * Each copy changes the rhythm (turns per path). No published page (all levels are new).
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { strokeLane } = require('../../primitives/trace-path.js');
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');

const POOLS = {
  1: ['line', 'wave', 'bumps', 'cups'],
  2: ['zigzag', 'mountains', 'wave', 'bumps', 'cups'],
  3: ['loops', 'castle', 'zigzag', 'mountains'],   // one continuous line each (spirals/eights lift the pencil)
};

module.exports = {
  id: 'K-387',
  slug: 'prewriting-picture-to-picture',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'pre-writing',
  themeAxis: { applicable: true, minNouns: 8, decorative: true },
  difficulty: {
    1: { lanes: 4, n: 3, laneH: 120 },
    2: { lanes: 4, n: 6, laneH: 110 },
    3: { lanes: 4, n: 8, laneH: 110 },
  },
  i18n: {
    en: {
      title: 'Picture to Picture',
      instruction: 'Start at the orange dot next to the first picture. Trace the path all the way to the other picture.',
    },
  },

  build({ theme, difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const nouns = labelSafeNouns(theme);
    if (nouns.length < d.lanes * 2) throw new Error(`K-387: theme ${theme} has ${nouns.length} nouns < ${d.lanes * 2}`);
    const strokes = rng.sample(POOLS[difficulty], d.lanes);
    const picks = rng.sample(nouns, d.lanes * 2);
    const iconPx = 52;
    const laneW = 675 - 24 - 2 * iconPx - 2 * 10;
    const img = (p, role) => `<img class="ws-icon" src="${fileUri(theme, p.noun)}" alt="" data-lcs-noun="${p.vocabKey}" data-lcs-end="${role}" style="width:${iconPx}px;height:${iconPx}px;flex:0 0 auto">`;
    const cards = strokes.map((key, i) => {
      const n = Math.max(2, d.n + (((ctx.variant || 1) + i) % 3) - 1);
      const lane = strokeLane({ stroke: key, w: laneW, h: d.laneH, n, modes: ['trace'] });
      return `<div class="ws-trace-lane ws-card-stage" style="flex-direction:row;gap:10px;justify-content:space-between;align-items:center" data-lcs-stroke-key="${key}" data-lcs-path-lane>` +
        img(picks[2 * i], 'start') + lane.svg + img(picks[2 * i + 1], 'finish') + `</div>`;
    });
    return { bodyHtml: cardGrid({ cards, cols: 1, rows: strokes.length }), meta: { strokes } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const lanes = [...document.querySelectorAll('[data-lcs-path-lane]')];
      if (lanes.length < 4) fails.push(`only ${lanes.length} lanes`);
      const keys = lanes.map((l) => l.dataset.lcsStrokeKey);
      if (new Set(keys).size !== keys.length) fails.push('a path shape repeats');
      const nouns = [];
      lanes.forEach((lane, i) => {
        const imgs = [...lane.querySelectorAll('img[data-lcs-noun]')];
        if (imgs.length !== 2 || imgs[0].dataset.lcsEnd !== 'start' || imgs[1].dataset.lcsEnd !== 'finish') fails.push(`lane ${i + 1}: not picture → path → picture`);
        imgs.forEach((im) => nouns.push(im.dataset.lcsNoun));
        const svg = lane.querySelector('[data-lcs-prim="trace-stroke"]');
        if (!svg || svg.dataset.lcsModes !== 'trace') { fails.push(`lane ${i + 1}: not one dashed path`); return; }
        const ps = svg.querySelectorAll('path');
        if (ps.length !== 1 || !ps[0].getAttribute('stroke-dasharray')) fails.push(`lane ${i + 1}: ${ps.length} paths / not dashed`);
        if (svg.querySelectorAll('circle').length !== 1) fails.push(`lane ${i + 1}: needs exactly one start dot`);
        // the path runs from the start picture to the finish picture: the svg sits between them
        const a = imgs[0] && imgs[0].getBoundingClientRect(), b = imgs[1] && imgs[1].getBoundingClientRect(), s = svg.getBoundingClientRect();
        if (a && b && !(a.right <= s.left + 1 && s.right <= b.left + 1)) fails.push(`lane ${i + 1}: the path is not between its two pictures`);
      });
      if (new Set(nouns).size !== nouns.length) fails.push('a picture repeats on the page');
      return fails;
    });
  },
};
