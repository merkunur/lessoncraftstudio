/**
 * G3-351 — Matrix reasoning 3×3: rows share a noun, columns share a size;
 * the missing cell must satisfy BOTH dimensions. Choices probe each axis.
 */
'use strict';
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');

const SIZES = [38, 56, 76];

module.exports = {
  id: 'G3-351',
  slug: 'matrix-reasoning',
  gradeBand: 'G23',
  assetClass: 'visual-logic',
  exerciseType: 'visual-logic',
  themeAxis: { applicable: true, minNouns: 5 },
  difficulty: {
    1: { cards: 1 },
    2: { cards: 1 },
    3: { cards: 1 },
  },
  i18n: {
    en: { title: 'What Completes the Puzzle?', instruction: 'Rows share a picture. Columns share a size. Circle what fits the empty cell.' },
  },

  build({ theme, difficulty }, ctx) {
    const rng = ctx.rng;
    const picked = rng.sample(labelSafeNouns(theme), 4); // 3 rows + distractor
    const rowNouns = picked.slice(0, 3);
    const colSizes = rng.shuffle(SIZES);
    const blankR = rng.int(0, 2), blankC = rng.int(0, 2);

    const cellPx = 132;
    const cells = [];
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (r === blankR && c === blankC) {
          cells.push(`<span class="ws-pattern-slot ws-pattern-slot--blank" style="width:${cellPx}px;height:${cellPx}px;font-size:34px" data-lcs-blankcell>?</span>`);
        } else {
          cells.push(`<span class="ws-pattern-slot" style="width:${cellPx}px;height:${cellPx}px" data-lcs-r="${r}" data-lcs-c="${c}" data-lcs-sz="${colSizes[c]}">` +
            `<img class="ws-icon" src="${fileUri(theme, rowNouns[r].noun)}" alt="" style="width:${colSizes[c]}px;height:${colSizes[c]}px"></span>`);
        }
      }
    }

    const answer = { noun: rowNouns[blankR], sz: colSizes[blankC] };
    const wrongSz = SIZES.find((s) => s !== answer.sz);
    const opts = rng.shuffle([
      { noun: answer.noun, sz: answer.sz, ok: true },
      { noun: answer.noun, sz: wrongSz, ok: false },                       // right noun, wrong size
      { noun: rowNouns[(blankR + 1) % 3], sz: answer.sz, ok: false },      // wrong noun, right size
      { noun: picked[3], sz: answer.sz, ok: false },                       // off-matrix noun
    ]);
    const chips = opts.map((o) =>
      `<span class="ws-pattern-chip" style="width:104px;height:104px"${o.ok ? ' data-lcs-correct="1"' : ''} ` +
      `data-lcs-opt="${o.noun.vocabKey}-${o.sz}">` +
      `<img class="ws-icon" src="${fileUri(theme, o.noun.noun)}" alt="" style="width:${Math.min(o.sz, 72)}px;height:${Math.min(o.sz, 72)}px"></span>`).join('');

    return {
      bodyHtml:
        `<div style="flex:1 1 auto;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px" ` +
        `data-lcs-expect="${answer.noun.vocabKey}-${answer.sz}" data-lcs-blankr="${blankR}" data-lcs-blankc="${blankC}">` +
        `<div style="display:grid;grid-template-columns:repeat(3,${cellPx}px);gap:10px">${cells.join('')}</div>` +
        `<div style="display:flex;gap:20px">${chips}</div>` +
        `</div>`,
      meta: { blankR, blankC },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const wrap = document.querySelector('[data-lcs-expect]');
      // row-consistency: same row cells share img src; col cells share size
      const cells = [...wrap.querySelectorAll('[data-lcs-r]')];
      const bySrc = {}, bySz = {};
      cells.forEach((cell) => {
        const r = cell.dataset.lcsR, c = cell.dataset.lcsC;
        const src = cell.querySelector('img').src;
        const sz = cell.dataset.lcsSz;
        (bySrc[r] = bySrc[r] || new Set()).add(src);
        (bySz[c] = bySz[c] || new Set()).add(sz);
      });
      Object.entries(bySrc).forEach(([r, s]) => { if (s.size !== 1) fails.push(`row ${r} mixes nouns`); });
      Object.entries(bySz).forEach(([c, s]) => { if (s.size !== 1) fails.push(`col ${c} mixes sizes`); });
      const correct = [...wrap.querySelectorAll('.ws-pattern-chip')].filter((x) => x.dataset.lcsCorrect);
      if (correct.length !== 1) fails.push(`${correct.length} correct chips`);
      else if (correct[0].dataset.lcsOpt !== wrap.dataset.lcsExpect) fails.push('correct chip != matrix expectation');
      const opts = [...wrap.querySelectorAll('.ws-pattern-chip')].map((x) => x.dataset.lcsOpt);
      if (new Set(opts).size !== opts.length) fails.push('duplicate options');
      return fails;
    });
  },
};
