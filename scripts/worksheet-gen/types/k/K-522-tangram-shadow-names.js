/**
 * K-522 — Match the Shadow to Its Name (Tangram maker 2026-11-02, NEW-TEMPLATES §36 T4; vocabulary + shape recognition):
 * tangram shadows on the left, their names in shuffled order on the right; the child draws a line from each shadow to its
 * name — the wordless family's one reading face.
 * The shadows are the bank's named seven-piece figures (data/b4/tangram-figures.js) — cat, rabbit, boat and the shapes
 * square, triangle, rectangle (trapezoid and parallelogram are left out: grade 1-3 words, and a square or rectangle shadow
 * is a parallelogram too — two right names). The tree and the arrow are left out: they cast
 * one shadow, and that shadow reads as an arrow (a child would fairly name the tree "arrow"). The names are the image
 * vocabulary's (data/b4/tangram-names.json). Each shadow is as big as its box allows, standing as stored.
 * Levels: 1 four of cat, rabbit, boat, square, triangle · 2 five of those and rectangle · 3 all six.
 */
'use strict';
const TG = require('../../primitives/tangram.js');
const { TANGRAM_FIGURES: FIG } = require('../../data/b4/tangram-figures.js');
const NAMES = require('../../data/b4/tangram-names.json').names;
const { keyNumber } = require('../_shared/key-number.js');
const T = require('../../primitives/_tokens.js').color;

const D = {
  1: { n: 4, pool: ['cat', 'rabbit', 'boat', 'square', 'triangle'] },
  2: { n: 5, pool: ['cat', 'rabbit', 'boat', 'square', 'triangle', 'rectangle'] },
  3: { n: 6, pool: ['cat', 'rabbit', 'boat', 'square', 'triangle', 'rectangle'] },
};

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
    // each shadow as big as its box allows (naming needs no common scale)
    const scaleOf = (k) => { const b = FIG.figure(k).bbox; return Math.floor(Math.min((box - 10) / b.h, (226 - 10) / b.w)); };
    const words = rng.shuffle(figs.map((k, i) => ({ k, i })));
    const left = figs.map((k, i) => {
      const sil = TG.tangramFigure({ figure: k, tans: FIG.figure(k).tans, S: scaleOf(k), mode: 'silhouette', stroke: 3, pad: 1.5 });
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
      if (sh.some((x) => ['arrow', 'tree'].includes(x.dataset.lcsShadowOf))) fails.push('the tree / arrow shadow (it reads as an arrow)');
      if (nm.some((x) => !x.textContent.trim())) fails.push('an empty name');
      // every shadow inside its box
      sh.forEach((x) => { const R = x.getBoundingClientRect(), s = x.querySelector('svg[data-lcs-prim="tangram"]').getBoundingClientRect(); if (s.width > R.width + 1 || s.height > R.height + 1) fails.push(`${x.dataset.lcsShadowOf}: the shadow leaves its box`); });
      return fails;
    });
  },
};
