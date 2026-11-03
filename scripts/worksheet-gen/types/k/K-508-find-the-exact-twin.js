/**
 * K-508 — Find the Exact Twin (Same & Different maker 2026-11-02, NEW-TEMPLATES §23 T4): each row shows a picture and
 * then the same picture again several times — once exactly as it is, the others turned or flipped; the child circles the
 * one that is exactly the same. The b / d / p / q readiness task in pictures: orientation matters (K-063 asks for the
 * mirror image; this one asks for the unchanged copy among mirrors and turns).
 *
 * Every choice but one is a transform of the picture, and every transform must LOOK different from the picture (its
 * mask overlaps the picture's own by less than 0.82 — lib/picture-masks.js, as K-063): a picture that looks the same
 * flipped or turned would make two right answers and is not drawn. The twin's place is the row's own shuffle.
 * Levels: 1 three choices (the twin, a mirror image, upside down) · 2 four (+ a quarter turn each way instead of upside
 * down) · 3 four, the turns and a picture flipped upside down (a mirror top to bottom), five rows.
 */
'use strict';
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const slot = require('../../lib/slot.js');
const PM = require('../../lib/picture-masks.js');

/** the transforms on the 24 × 24 row-major masks: [CSS transform, mask function] */
const N = 24;
const map = (fn) => (m) => { const o = new Array(m.length); for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) { const [rr, cc] = fn(r, c); o[r * N + c] = m[rr * N + cc]; } return o; };
const TF = {
  flip: ['scaleX(-1)', map((r, c) => [r, N - 1 - c])],
  half: ['rotate(180deg)', map((r, c) => [N - 1 - r, N - 1 - c])],
  right: ['rotate(90deg)', map((r, c) => [N - 1 - c, r])],
  left: ['rotate(-90deg)', map((r, c) => [c, N - 1 - r])],
  vflip: ['scaleY(-1)', map((r, c) => [N - 1 - r, c])],
};
const D = { 1: { rows: 4, kinds: ['flip', 'half'] }, 2: { rows: 4, kinds: ['flip', 'right', 'left'] }, 3: { rows: 5, kinds: ['right', 'left', 'vflip'] } };

module.exports = {
  id: 'K-508',
  slug: 'find-the-exact-twin',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'visual-discrimination',
  themeAxis: { applicable: true, minNouns: 8 },
  difficulty: D,
  i18n: {
    en: {
      title: 'Find the Exact Twin',
      instruction: 'Look at the first picture in each row. Circle the picture that is exactly the same, not turned and not flipped.',
    },
  },

  build({ theme, difficulty }, ctx) {
    const d = this.difficulty[difficulty], rng = ctx.rng;
    // every transform of the level must look different from the picture itself, and from each other
    const ok = (n) => {
      const m = PM.maskA(theme, n.noun), ms = d.kinds.map((k) => TF[k][1](m));
      return ms.every((x) => PM.iou(m, x) < 0.82) && ms.every((x, i) => ms.every((y, j) => j <= i || PM.iou(x, y) < 0.82));
    };
    const all = labelSafeNouns(theme).filter((x) => PM.has(theme, x.noun));
    const pool = all.filter(ok);
    if (pool.length < d.rows) throw new Error(`K-508: theme ${theme} has only ${pool.length} pictures that change when turned (< ${d.rows})`);
    let picks = rng.sample(pool, d.rows);
    picks = slot.pictures(ctx, picks, pool, theme, 'pic');
    const px = d.kinds.length > 2 ? 64 : 72;
    const cards = picks.map((n, i) => {
      const src = fileUri(theme, n.noun);
      const variants = rng.shuffle([{ t: 'none', correct: true }].concat(d.kinds.map((k) => ({ t: TF[k][0], kind: k }))));
      const chips = variants.map((v) =>
        `<span class="ws-pattern-chip" data-lcs-choice="1" style="width:${px + 22}px;height:${px + 22}px"${v.correct ? ' data-lcs-correct="1"' : ''}>` +
        `<img class="ws-icon" src="${src}" alt="" data-lcs-tf="${v.t}" style="width:${px}px;height:${px}px;transform:${v.t}"></span>`).join('');
      return `<div class="ws-card-stage" style="justify-content:space-between;padding:6px 14px" data-lcs-prompt="${n.vocabKey}">` +
        `<span class="ws-pattern-slot" style="width:${px + 30}px;height:${px + 30}px"${slot.attr(ctx, 'pic', i)}>` +
        `<img class="ws-icon" src="${src}" alt="" style="width:${px}px;height:${px}px"></span>` +
        `<span class="ws-pattern-choices">${chips}</span></div>`;
    });
    const { cardGrid } = require('../../templates/layouts/card-grid.js');
    return { bodyHtml: cardGrid({ cards, cols: 1, rows: d.rows, numbered: false }), meta: { nouns: picks.map((c) => c.vocabKey) } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const rows = [...document.querySelectorAll('[data-lcs-prompt]')];
      if (rows.length < 4) fails.push(`${rows.length} rows`);
      rows.forEach((card, i) => {
        const chips = [...card.querySelectorAll('.ws-pattern-chip')];
        const correct = chips.filter((c) => c.dataset.lcsCorrect);
        if (correct.length !== 1) { fails.push(`row ${i + 1}: ${correct.length} twins`); return; }
        if (correct[0].querySelector('img').dataset.lcsTf !== 'none') fails.push(`row ${i + 1}: the twin is turned or flipped`);
        const tfs = chips.map((c) => c.querySelector('img').dataset.lcsTf);
        if (new Set(tfs).size !== tfs.length) fails.push(`row ${i + 1}: two choices are the same`);
        const src = card.querySelector('.ws-pattern-slot img').getAttribute('src');
        if (chips.some((c) => c.querySelector('img').getAttribute('src') !== src)) fails.push(`row ${i + 1}: a choice is another picture`);
      });
      return fails;
    });
  },
};
