/**
 * K-522 — Match the Shadow to Its Name (Tangram maker 2026-11-02, NEW-TEMPLATES §36 T4; vocabulary + shape recognition):
 * tangram shadows on the left, their names in shuffled order on the right; the child draws a line from each shadow to its
 * name — the wordless family's one reading face.
 * The shadows are the bank's named seven-piece figures (data/b4/tangram-figures.js) — cat, rabbit and the shapes
 * square, triangle, rectangle (trapezoid and parallelogram are left out: grade 1-3 words, and a square or rectangle shadow
 * is a parallelogram too — two right names). The tree, the arrow and the boat are left out: their shadows read as an
 * arrow (the boat's sail and keel melt into one down-pointing arrow — 2026-11-04 contact-sheet read). The names are the
 * image vocabulary's (data/b4/tangram-names.json). Each shadow is as big as its box allows, clear of the key's number.
 * Levels: 1 cat, rabbit, square, triangle · 2 those and rectangle · 3 the same five, the SHAPES turned (K.G.A.2: a shape
 * keeps its name in any orientation — the square turned 45 degrees, "a diamond is still a square"; the rectangle standing
 * tall; the triangle point-down or on its side) and the animals facing the other way (an upside-down cat reads as a "7",
 * a sideways rabbit as a boot — native + pedagogy review 2026-11-04).
 */
'use strict';
const TG = require('../../primitives/tangram.js');
const { TANGRAM_FIGURES: FIG } = require('../../data/b4/tangram-figures.js');
const NAMES = require('../../data/b4/tangram-names.json').names;
const { keyNumber } = require('../_shared/key-number.js');
const T = require('../../primitives/_tokens.js').color;

const D = {
  1: { n: 4, pool: ['cat', 'rabbit', 'square', 'triangle'] },
  2: { n: 5, pool: ['cat', 'rabbit', 'square', 'triangle', 'rectangle'] },
  3: { n: 5, pool: ['cat', 'rabbit', 'square', 'triangle', 'rectangle'], turn: true },
};
// level 3, per figure: the lattice turns tangram.js re-derives, or 'rot45' (the square drawn upright and turned on the page)
const TURNS = { cat: ['mirX'], rabbit: ['mirX'], square: ['rot45'], rectangle: ['rot90'], triangle: ['rot90', 'rot180', 'rot270'] };
const MAX_W = 148;   // the shadow box is 240 wide, the shadow centred; the key's number sits in its top-right corner (6 + 32 px) — 148 + pad keeps clear of it

module.exports = {
  id: 'K-522',
  slug: 'tangram-shadow-names',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'tangram',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Match the Shadow to Its Name', instruction: 'Look at each tangram shadow. Draw a line from the shadow to its name.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = String(locale || 'en').slice(0, 2);
    const key = !!(ctx && ctx.answerKey), scr = !key && !!(ctx && ctx.screen);
    const extra = (ctx && ctx.chromeExtra) || 0;
    const figs = rng.sample(d.pool, d.n);
    const itemH = Math.floor((716 - extra - (d.n - 1) * 12) / d.n), box = itemH - 8;
    // level 3: each figure's own turn (TURNS) — one the box holds at a size at least 3/4 of the figure standing
    const fitS = (tans) => { const q = TG.placeTans(tans, 1, { pad: 0 }); return Math.floor(Math.min((box - 10) / q.h, MAX_W / q.w)); };
    const turnOf = figs.map((k) => {
      if (!d.turn) return null;
      if (TURNS[k][0] === 'rot45') return 'rot45';
      const up = fitS(FIG.figure(k).tans);
      const ok = TURNS[k].filter((t) => fitS(TG.transformTiling(FIG.figure(k).tans, t)) >= 0.75 * up);
      if (!ok.length) throw new Error(`K-522: no turn of ${k} fits its box`);
      return rng.pick(ok);
    });
    const words = rng.shuffle(figs.map((k, i) => ({ k, i })));
    const left = figs.map((k, i) => {
      // each shadow as big as its box allows (naming needs no common scale); the 45-degree square is drawn upright at
      // 1/√2 of that size and turned, so its diagonal fits where the upright side would
      const t = turnOf[i], lattice = t && t !== 'rot45';
      const tans = lattice ? TG.transformTiling(FIG.figure(k).tans, t) : FIG.figure(k).tans;
      const S = t === 'rot45' ? Math.floor(fitS(tans) / Math.SQRT2) : fitS(tans);
      const sil0 = TG.tangramFigure({ figure: k, tans, S, mode: 'silhouette', stroke: 3, pad: 1.5, ...(t ? { transform: t } : {}) });
      const sil = t === 'rot45' ? { html: `<span data-lcs-turn="45" style="display:inline-flex;transform:rotate(45deg)">${sil0.html}</span>` } : sil0;
      return `<div class="ws-match-item" data-lcs-shadow-of="${k}" style="width:240px;height:${itemH}px;position:relative"` +
        (key ? ` data-lcs-pair="${i + 1}"` : scr ? ` data-lcs-key-badge="t${i + 1}"` : '') + `>` + (key ? keyNumber(i + 1) : '') +
        `${sil.html}<span class="ws-match-dot ws-match-dot--right"></span></div>`;
    }).join('');
    const right = words.map(({ k, i }) => {
      const w = NAMES[k] && NAMES[k][L];
      if (!w) throw new Error(`K-522: no ${L} name for ${k}`);
      return `<div class="ws-match-item ws-match-item--plain" data-lcs-name-of="${k}" style="width:240px;height:${itemH}px"` +
        (key ? ` data-lcs-key-badge="${i + 1}"` : scr ? ` data-lcs-pair="t${i + 1}" data-lcs-label="${w}"` : '') + `>` +
        `<span style="font-family:'Baloo 2',cursive;font-weight:700;font-size:${[...w].length > 12 ? 24 : 30}px;color:${T.ink}">${w}</span>` +
        `<span class="ws-match-dot ws-match-dot--left"></span></div>`;
    }).join('');
    return { bodyHtml: `<div class="ws-match" data-ws-content data-lcs-shadow-names="${difficulty}" style="padding:6px 30px"><div class="ws-match-col">${left}</div><div class="ws-match-col">${right}</div></div>`,
      meta: { figures: figs } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const sh = [...document.querySelectorAll('[data-lcs-shadow-of]')], nm = [...document.querySelectorAll('[data-lcs-name-of]')];
      if (sh.length < 4 || sh.length !== nm.length) fails.push(`${sh.length} shadows, ${nm.length} names`);
      const a = sh.map((x) => x.dataset.lcsShadowOf).sort().join(), b = nm.map((x) => x.dataset.lcsNameOf).sort().join();
      if (a !== b) fails.push('the names are not the shadows\' names');
      if (sh.some((x) => ['arrow', 'tree', 'boat'].includes(x.dataset.lcsShadowOf))) fails.push('the tree / arrow / boat shadow (it reads as an arrow)');
      // the key's number stays clear of the shadow
      sh.forEach((x) => { const n = x.querySelector('[data-lcs-key-sample]'), s = x.querySelector('svg[data-lcs-prim="tangram"]'); if (n && s) { const a = n.getBoundingClientRect(), b = s.getBoundingClientRect(); if (a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom) fails.push(`${x.dataset.lcsShadowOf}: the key number covers the shadow`); } });
      if (nm.some((x) => !x.textContent.trim())) fails.push('an empty name');
      // every shadow inside its box
      sh.forEach((x) => { const R = x.getBoundingClientRect(), s = x.querySelector('svg[data-lcs-prim="tangram"]').getBoundingClientRect(); if (s.width > R.width + 1 || s.height > R.height + 1) fails.push(`${x.dataset.lcsShadowOf}: the shadow leaves its box`); });
      return fails;
    });
  },
};
