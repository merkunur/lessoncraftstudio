/**
 * K-063 — Mirror match: pick the correct mirror image.
 * Prompt icon left; three choices: true mirror (scaleX), the unflipped
 * original, and the picture turned upside down. Only ASYMMETRIC icons qualify —
 * symmetric art would make the options indistinguishable (mask check).
 * 2026-11-02: the upside-down choice is a HALF TURN (rotate 180°), no longer a flip across a horizontal line — that
 * flip is a mirror image too (a reflection in water), so the row had two right answers. Masks are the precomputed
 * ones (lib/picture-masks.js maskA = the old maskSignature): the build is synchronous (makers).
 */
'use strict';
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const slot = require('../../lib/slot.js');
const PM = require('../../lib/picture-masks.js');

/** a half turn (180°) of a 24×24 row-major binary mask */
function turnMask(m) {
  const out = new Array(m.length);
  for (let i = 0; i < m.length; i++) out[i] = m[m.length - 1 - i];
  return out;
}

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

  build({ theme, difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    // asymmetry gate: mirror must be visibly different from the original
    let candidates = [];
    // the half turn must differ from the mirror image as well (a picture symmetric top to bottom would make them one)
    const asym = (n) => { const m = PM.maskA(theme, n.noun); return PM.iou(m, flipMask(m)) < 0.82 && PM.iou(flipMask(m), turnMask(m)) < 0.82; };
    const all = labelSafeNouns(theme).filter((x) => PM.has(theme, x.noun));
    for (const n of rng.shuffle(all)) {
      if (asym(n)) candidates.push(n);
      if (candidates.length >= d.rows) break;
    }
    if (candidates.length < d.rows) {
      throw new Error(`K-063: theme ${theme} has only ${candidates.length} asymmetric nouns (< ${d.rows})`);
    }

    // makers (2026-11-02): each row's picture is a slot, from the theme's pictures that pass the same two gates
    candidates = slot.pictures(ctx, candidates, all.filter(asym), theme, 'pic');
    const px = 72;
    const cards = candidates.map((n, i) => {
      const src = fileUri(theme, n.noun);
      const variants = rng.shuffle([
        { t: 'scaleX(-1)', correct: true },
        { t: 'none', correct: false },
        { t: 'rotate(180deg)', correct: false },
      ]);
      const chips = variants.map((v) =>
        `<span class="ws-pattern-chip" style="width:${px + 22}px;height:${px + 22}px"${v.correct ? ' data-lcs-correct="1"' : ''}>` +
        `<img class="ws-icon" src="${src}" alt="" data-lcs-tf="${v.t}" style="width:${px}px;height:${px}px;transform:${v.t}"></span>`).join('');
      return `<div class="ws-card-stage" style="justify-content:space-between;padding:6px 14px" data-lcs-prompt="${n.vocabKey}">` +
        `<span class="ws-pattern-slot" style="width:${px + 30}px;height:${px + 30}px"${slot.attr(ctx, 'pic', i)}>` +
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
