/** K-268 — Add and Subtract Coloring. nt20-VAR variation of K-241 (same family: color-by-number). */
'use strict';
const base = require('./K-241-color-by-code.js');
module.exports = {
  ...base,
  id: 'K-268',
  slug: 'color-by-add-subtract',
  // real levels (2026-11-02: all three were the published level 2)
  difficulty: { 1: {"mode":"sums","codes":3,"items":9,"size":104,"ops":["+","-"],"values":[1,2,3,4,5],"top":5}, 2: {"mode":"sums","codes":4,"items":12,"size":100,"max":10,"ops":["+","-"]}, 3: {"mode":"sums","codes":4,"items":12,"size":100,"ops":["+","-"],"values":[5,6,7,8,9,10,11,12,13,14,15],"top":20} },
  i18n: { en: { title: "Add and Subtract Coloring", instruction: "Look at the code. Then color every shape to match it." } },

  /**
   * THE ITEM BANK of the unit checks (Part 7.6; docs/daily-teaching-system/PART-7-DESIGN.md): the page made small, six
   * times — each card its own code (three numbers and their colours, the level's numbers and signs) over a row of six
   * shapes, each code on two of them. Built by the page's own generator and drawing (K-241 build, three codes, a card's
   * shape size); the shapes are taken out of the page's stage and set in a row. Under each shape an empty place carries
   * the colour's word as its answer (the key writes it there; the form shows nothing).
   */
  checkPage({ theme, difficulty, locale }, ctx) {
    const { checkGrid } = require('../../lib/check-page.js');
    const { COLOR_WORDS } = require('../../data/color-words.js');
    const words = COLOR_WORDS[(locale || 'en').slice(0, 2)] || COLOR_WORDS.en;
    const d0 = this.difficulty[difficulty] || this.difficulty[2];
    const codes = Math.min(3, d0.codes);
    const d = { ...d0, codes, items: 2 * codes, size: 84 };
    const self = Object.assign(Object.create(this), { difficulty: { check: d } });
    // 2026-11-15 (Swedish reviewer: form A had four subtractions and two additions, form B one subtraction and five
    // additions, 4 + 6 beside 6 + 4): a card is drawn again until it has as many additions as subtractions, give or take
    // one, and no sum stands twice in either order
    const fair = (html) => {
      const ex = [...html.matchAll(/data-lcs-expr="(\d+) ([+−]) (\d+)"/g)];
      const minus = ex.filter((m) => m[2] === '−').length, sums = ex.filter((m) => m[2] === '+').map((m) => [+m[1], +m[3]].sort((a, b) => a - b).join('+'));
      return !(d.ops.includes('+') && d.ops.includes('-')) || (Math.abs(2 * minus - ex.length) <= 2 && new Set(sums).size === sums.length);
    };
    const cards = Array.from({ length: 6 }, () => {
      let html, guard = 0;
      do { html = base.build.call(self, { theme, difficulty: 'check', locale }, { ...(ctx || {}), interactive: false, answerKey: false, screen: false }).bodyHtml; }
      while (!fair(html) && ++guard < 60);
      const at = html.indexOf('<div data-ws-content');
      if (at < 0) throw new Error('K-268 checkPage: no stage');
      const colorOf = {};
      for (const m of html.slice(0, at).matchAll(/data-lcs-legend="([^"]+)" data-lcs-color="([^"]+)"/g)) colorOf[m[1]] = m[2];
      const shapes = [...html.slice(at).matchAll(/<span style="position:absolute;left:-?\d+px;top:-?\d+px"( data-lcs-item="([^"]+)"[^>]*)>(<svg[\s\S]*?<\/svg>)<\/span>/g)]
        .map((m) => `<span style="display:inline-flex;flex-direction:column;align-items:center;gap:2px"${m[1]}>${m[3]}` +
          `<span data-lcs-answer="${words[colorOf[m[2]]]}" style="display:block;width:84px;height:24px"></span></span>`);
      if (shapes.length !== d.items || shapes.some((s) => /data-lcs-answer="undefined"/.test(s))) throw new Error('K-268 checkPage: ' + shapes.length + ' shapes');
      return `<div class="ws-card-stage" style="flex-direction:column;gap:6px;padding:2px">${html.slice(0, at)}` +
        `<div style="display:flex;justify-content:center;align-items:flex-end;gap:12px;flex-wrap:wrap">${shapes.join('')}</div></div>`;
    });
    return { bodyHtml: checkGrid(cards), meta: {} };
  },
};
