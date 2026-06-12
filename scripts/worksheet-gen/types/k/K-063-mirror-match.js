/**
 * K-063 — Mirror match: pick the correct mirror image.
 * Prompt icon left; three choices: true mirror (scaleX), the unflipped
 * original, and an upside-down flip. Only ASYMMETRIC icons qualify —
 * symmetric art would make the options indistinguishable (mask check).
 */
'use strict';
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const { maskSignature, maskIoU } = require('../../image-cache/silhouette.js');

/** horizontal flip of a 24×24 row-major binary mask */
function flipMask(m) {
  const out = new Array(m.length);
  for (let r = 0; r < 24; r++) for (let c = 0; c < 24; c++) out[r * 24 + c] = m[r * 24 + (23 - c)];
  return out;
}

module.exports = {
  id: 'K-063',
  slug: 'mirror-images',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'visual-discrimination',
  themeAxis: { applicable: true, minNouns: 8 },
  difficulty: {
    1: { rows: 4 },
    2: { rows: 4 },
    3: { rows: 5 },
  },
  i18n: {
    en: {
      title: 'Mirror, Mirror',
      instruction: 'Circle the picture that shows the mirror image.',
    },
  },

  async build({ theme, difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    // asymmetry gate: mirror must be visibly different from the original
    const candidates = [];
    for (const n of rng.shuffle(labelSafeNouns(theme))) {
      const m = await maskSignature(theme, n.noun);
      if (maskIoU(m, flipMask(m)) < 0.82) candidates.push(n);
      if (candidates.length >= d.rows) break;
    }
    if (candidates.length < d.rows) {
      throw new Error(`K-063: theme ${theme} has only ${candidates.length} asymmetric nouns (< ${d.rows})`);
    }

    const px = 72;
    const cards = candidates.map((n) => {
      const src = fileUri(theme, n.noun);
      const variants = rng.shuffle([
        { t: 'scaleX(-1)', correct: true },
        { t: 'none', correct: false },
        { t: 'scaleY(-1)', correct: false },
      ]);
      const chips = variants.map((v) =>
        `<span class="ws-pattern-chip" style="width:${px + 22}px;height:${px + 22}px"${v.correct ? ' data-lcs-correct="1"' : ''}>` +
        `<img class="ws-icon" src="${src}" alt="" data-lcs-tf="${v.t}" style="width:${px}px;height:${px}px;transform:${v.t}"></span>`).join('');
      return `<div class="ws-card-stage" style="justify-content:space-between;padding:6px 14px" data-lcs-prompt="${n.vocabKey}">` +
        `<span class="ws-pattern-slot" style="width:${px + 30}px;height:${px + 30}px">` +
        `<img class="ws-icon" src="${src}" alt="" style="width:${px}px;height:${px}px"></span>` +
        `<span class="ws-pattern-choices">${chips}</span>` +
        `</div>`;
    });

    const { cardGrid } = require('../../templates/layouts/card-grid.js');
    return {
      bodyHtml: cardGrid({ cards, cols: 1, rows: d.rows, numbered: false }),
      meta: { nouns: candidates.map((c) => c.vocabKey) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      document.querySelectorAll('[data-lcs-prompt]').forEach((card, i) => {
        const chips = [...card.querySelectorAll('.ws-pattern-chip')];
        const correct = chips.filter((c) => c.dataset.lcsCorrect);
        if (correct.length !== 1) { fails.push(`row ${i + 1}: ${correct.length} correct`); return; }
        const tf = correct[0].querySelector('img').dataset.lcsTf;
        if (tf !== 'scaleX(-1)') fails.push(`row ${i + 1}: correct chip transform is ${tf}, not the mirror`);
        const tfs = chips.map((c) => c.querySelector('img').dataset.lcsTf);
        if (new Set(tfs).size !== tfs.length) fails.push(`row ${i + 1}: duplicate variants`);
      });
      return fails;
    });
  },
};
