/**
 * K-440 — Sight Words: Roll and Read (maker template, 2026-10-31). A game page: six columns headed by the six die
 * faces, a sight word in every cell. The child rolls a die, reads a word in that column and colours its cell — until a
 * column is full. Fluency through play: the same words are read again and again.
 *   level 1: 4 rows of the core 24   level 2: 5 rows of the first 50   level 3: 6 rows of the whole list
 * Every word appears once on the page. Words: the Sight Words Level Set bank; a teacher may swap any word (lib/slot.js).
 */
'use strict';
const P = require('../_shared/sight-word-pages.js');
const { SW } = P;
const slot = require('../../lib/slot.js');
const diceFace = require('../../primitives/dice.js');

const COLW = 106;

module.exports = {
  id: 'K-440',
  slug: 'sight-words-roll-and-read',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'sight-words',
  themeAxis: { applicable: false },
  difficulty: {
    1: { rows: 4 },
    2: { rows: 5 },
    3: { rows: 6 },
  },
  i18n: { en: { title: 'Roll and Read Sight Words', instruction: 'Roll a die. Read a word in that column and color it. Which column is full first?' } },

  build({ difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const loc = (locale || 'en').slice(0, 2);
    const rng = ctx.rng;
    const pool = P.levelWords(loc, difficulty).filter((w) => [...w].length <= 10);
    const n = 6 * d.rows;
    if (pool.length < n) throw new Error(`K-440: ${pool.length} words < ${n} (${loc})`);
    const words = slot.words(ctx, rng.sample(pool, n), pool);
    const longest = Math.max(...words.map((w) => [...w].length));
    const px = Math.max(16, Math.min(28, Math.floor((COLW - 14) / (longest * 0.62))));
    const cols = [];
    for (let c = 0; c < 6; c++) {
      const cells = [];
      for (let r = 0; r < d.rows; r++) {
        const i = c * d.rows + r;
        cells.push(slot.stamp(ctx, 'word', i, `<div data-lcs-given data-lcs-cell="${P.esc(words[i])}" style="flex:1 1 0;min-height:70px;display:flex;align-items:center;justify-content:center;border:2px solid ${P.INK};border-radius:12px;background:#FFFFFF;font-family:${P.FONT_B};font-weight:800;font-size:${px}px;color:${P.INK}">${P.esc(words[i])}</div>`));
      }
      cols.push(`<div data-lcs-col="${c + 1}" style="width:${COLW}px;display:flex;flex-direction:column;gap:10px"><div style="display:flex;justify-content:center;padding-bottom:4px">${diceFace({ n: c + 1, size: 74 }).svg}</div>${cells.join('')}</div>`);
    }
    return {
      bodyHtml: `<div data-ws-content data-lcs-roll style="flex:1;display:flex;justify-content:space-between;align-items:stretch">${cols.join('')}</div>`,
      meta: { words },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const cols = [...document.querySelectorAll('[data-lcs-col]')];
      if (cols.length !== 6) fails.push(`${cols.length} columns, not 6`);
      const all = [];
      cols.forEach((c, i) => {
        if (c.querySelectorAll('[data-lcs-prim="dice"], svg').length < 1) fails.push(`column ${i + 1}: no die face`);
        const cells = [...c.querySelectorAll('[data-lcs-cell]')];
        if (cells.length < 4) fails.push(`column ${i + 1}: ${cells.length} words`);
        cells.forEach((x) => { all.push(x.dataset.lcsCell); if (x.scrollWidth > x.clientWidth + 1) fails.push(`"${x.dataset.lcsCell}" overflows its cell`); });
      });
      if (new Set(all).size !== all.length) fails.push('a word appears twice');
      return fails;
    });
  },
};
