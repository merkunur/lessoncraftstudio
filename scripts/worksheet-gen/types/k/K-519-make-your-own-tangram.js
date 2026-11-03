/**
 * K-519 — Make Your Own Tangram Figure (Tangram maker 2026-11-02, NEW-TEMPLATES §36 T1; K.G.B.6 compose shapes): the
 * seven-piece cut-out square (the K-353 template block, the same 216 px set) and a big board below it — the child cuts the
 * pieces, invents a figure on the board, draws round it and (levels 2-3) writes its name on the line. Open: no answer.
 * Levels: 1 the colour legend beside the pieces and a dotted board (the dots every quarter of the square's side, the
 * pieces' own lattice) · 2 no legend (plain pieces), the dotted board and a name line · 3 no legend, an empty board and a
 * name line. Wordless like the family: nothing on the page but the pieces, the board and the line.
 */
'use strict';
const TG = require('../../primitives/tangram.js');
const C4 = require('../../templates/components-b4.js');
const { TANGRAM_FIGURES: FIG } = require('../../data/b4/tangram-figures.js');
const T = require('../../primitives/_tokens.js').color;

const S = 216;
const D = { 1: { legend: true, dots: true, name: false }, 2: { legend: false, dots: true, name: true }, 3: { legend: false, dots: false, name: true } };

module.exports = {
  id: 'K-519',
  slug: 'make-your-own-tangram',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'tangram',
  themeAxis: { applicable: false },
  difficulty: D,
  fitsChrome: true,
  i18n: { en: { title: 'Make Your Own Tangram Figure', instruction: 'Color each piece like the legend and cut out the seven pieces. Make your own figure with all of them on the board, then draw around it.' } },

  build({ difficulty }, ctx) {
    const d = D[difficulty] || D[2];
    const tpl = C4.templateBlock({ S, legend: d.legend, Sg: 64, tans: FIG.figure('square').tans });
    // the board takes the height the cut-out square (and the name line) leave in the page body (748 px: a German level-1
    // instruction runs to three lines), less a teacher's longer title (ctx.chromeExtra, fitsChrome); the dots are the
    // pieces' own lattice: every quarter of the square's side (54 px)
    const extra = (ctx && ctx.chromeExtra) || 0;
    const boardH = Math.max(300, 748 - extra - tpl.height - (d.name ? 50 : 0) - 14 * (d.name ? 2 : 1) - 8);
    const step = S / 4, dots = [];
    if (d.dots) for (let y = step / 2; y < boardH - 8; y += step) for (let x = step / 2; x < 652; x += step) dots.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.6" fill="${T.grid}"/>`);
    const field = d.dots ? `<svg xmlns="http://www.w3.org/2000/svg" width="654" height="${boardH - 6}" viewBox="0 0 654 ${boardH - 6}" style="display:block">${dots.join('')}</svg>` : '';
    const board = `<div data-lcs-board="${d.dots ? 'dotted' : 'empty'}" style="flex:0 0 auto;height:${boardH}px;width:660px;box-sizing:border-box;border:3px solid ${T.teal};border-radius:18px;background:#FFFFFF;overflow:hidden">${field}</div>`;
    // the name line: a small drawn pencil and a line (the family prints no word)
    const pencil = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" aria-hidden="true" style="flex:0 0 auto"><g transform="rotate(-45 20 20)" fill="none" stroke="${T.inkSoft}" stroke-width="2.4" stroke-linejoin="round"><rect x="6" y="15" width="22" height="10" rx="1.5"/><path d="M28 15L36 20L28 25Z"/><path d="M10 15V25"/></g></svg>`;
    const name = d.name ? `<div data-lcs-name-line style="display:flex;align-items:flex-end;gap:10px;flex:0 0 auto">${pencil}<span style="display:block;width:420px;height:36px;border-bottom:2.5px solid ${T.inkSoft}"></span></div>` : '';
    const body = `<div data-ws-content data-lcs-own-tangram="${difficulty}" style="flex:1 1 auto;display:flex;flex-direction:column;align-items:center;gap:14px;min-height:0">` +
      `<div style="align-self:${d.legend ? 'flex-start' : 'center'};display:flex">${tpl.html}</div>${board}${name}</div>`;
    return { bodyHtml: body, meta: { legend: d.legend, board: d.dots ? 'dotted' : 'empty', name: d.name } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const set = document.querySelector('[data-lcs-set]');
      if (!set || set.querySelectorAll('[data-lcs-tan]').length !== 7) fails.push('the cut-out square does not hold seven pieces');
      if (document.querySelectorAll('[data-lcs-scissors]').length !== 1) fails.push('no scissors');
      const b = document.querySelector('[data-lcs-board]');
      if (!b) fails.push('no board');
      else {
        // the board holds the largest figure of the set (the 7 pieces cover 1 square unit; the tallest stored figure is 1.77 units)
        const r = b.getBoundingClientRect(), sq = set.getBoundingClientRect();
        if (r.height < 1.3 * sq.height || r.width < 2.5 * sq.width) fails.push('the board is too small to build on');
      }
      const lv = +document.querySelector('[data-lcs-own-tangram]').dataset.lcsOwnTangram;
      if ((lv > 1) !== !!document.querySelector('[data-lcs-name-line]')) fails.push('the name line does not match the level');
      if ((lv === 1) !== !!document.querySelector('[data-lcs-tan-legend]')) fails.push('the legend does not match the level');
      return fails;
    });
  },
};
