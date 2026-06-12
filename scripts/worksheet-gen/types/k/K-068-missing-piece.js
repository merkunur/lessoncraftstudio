/**
 * K-068 — Complete the picture grid: each row of the 3×3 grid holds one kind
 * of picture; one cell is empty. The child circles the piece that fits.
 */
'use strict';
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');

module.exports = {
  id: 'K-068',
  slug: 'missing-piece-grid',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'visual-logic',
  themeAxis: { applicable: true, minNouns: 5 },
  difficulty: {
    1: { size: 3 },
    2: { size: 3 },
    3: { size: 4 },
  },
  i18n: {
    en: {
      title: 'What Fits the Gap?',
      instruction: 'Each row shows one kind of picture. Circle the piece that fits the empty box.',
    },
  },

  build({ theme, difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const size = d.size;
    const rowNouns = rng.sample(labelSafeNouns(theme), size + 1); // +1 distractor
    const blankR = rng.int(0, size - 1), blankC = rng.int(0, size - 1);
    const answer = rowNouns[blankR];

    const cellPx = size === 3 ? 130 : 104;
    const iconPx = cellPx - 30;
    const cells = [];
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (r === blankR && c === blankC) {
          cells.push(`<span class="ws-pattern-slot ws-pattern-slot--blank" style="width:${cellPx}px;height:${cellPx}px" data-lcs-blank="${answer.vocabKey}">?</span>`);
        } else {
          cells.push(`<span class="ws-pattern-slot" style="width:${cellPx}px;height:${cellPx}px" data-lcs-row="${r}" data-lcs-el="${rowNouns[r].vocabKey}">` +
            `<img class="ws-icon" src="${fileUri(theme, rowNouns[r].noun)}" alt="" style="width:${iconPx}px;height:${iconPx}px"></span>`);
        }
      }
    }

    const opts = rng.shuffle([answer, rowNouns[(blankR + 1) % size], rowNouns[size]]);
    const chips = opts.map((n) =>
      `<span class="ws-pattern-chip" style="width:86px;height:86px"${n.vocabKey === answer.vocabKey ? ' data-lcs-correct="1"' : ''} data-lcs-opt="${n.vocabKey}">` +
      `<img class="ws-icon" src="${fileUri(theme, n.noun)}" alt="" style="width:60px;height:60px"></span>`).join('');

    return {
      bodyHtml:
        `<div style="flex:1 1 auto;display:flex;align-items:center;justify-content:space-evenly;min-height:0">` +
        `<div style="display:grid;grid-template-columns:repeat(${size},${cellPx}px);gap:12px">${cells.join('')}</div>` +
        `<div style="display:flex;flex-direction:column;gap:20px;padding-left:18px;border-left:2px dashed #C8BFAE">${chips}</div>` +
        `</div>`,
      meta: { answer: answer.vocabKey, blank: [blankR, blankC] },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      // row consistency
      const rows = {};
      document.querySelectorAll('[data-lcs-row]').forEach((el) => {
        (rows[el.dataset.lcsRow] = rows[el.dataset.lcsRow] || new Set()).add(el.dataset.lcsEl);
      });
      Object.entries(rows).forEach(([r, set]) => { if (set.size !== 1) fails.push(`row ${r} mixes nouns`); });
      const blank = document.querySelector('[data-lcs-blank]');
      const correct = [...document.querySelectorAll('.ws-pattern-chip')].filter((c) => c.dataset.lcsCorrect);
      if (correct.length !== 1) fails.push(`${correct.length} correct chips`);
      else if (correct[0].dataset.lcsOpt !== blank.dataset.lcsBlank) fails.push('correct chip != blank row noun');
      return fails;
    });
  },
};
