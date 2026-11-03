/**
 * G1-492 — Letter Before and After (Alphabet & Letters maker 2026-11-02, NEW-TEMPLATES §37 T4; RF.K.1.d, alphabetical
 * order readiness): a letter with an empty box on one or both sides; the child writes its neighbour(s) in the locale's
 * alphabet (it: the 21-letter strip, so after h comes i; sv/fi: z å ä ö; da/no: z æ ø å). K-223 fills gaps in the whole
 * alphabet; this isolates the neighbour relation, as K-021 does for numbers. The first and the last letter are never
 * asked (one neighbour only). Every box is an empty answer box holding its letter: the key writes it, the screen types
 * it. The letters asked are distinct and spread over the alphabet (no two items next to each other).
 * Levels: 1 the letter after, six items, the alphabet printed at the top to look along · 2 the letter before, eight
 * items · 3 both neighbours, eight items.
 */
'use strict';
const A = require('../_shared/alphabet-more.js');
const T = require('../../primitives/_tokens.js').color;

const D = {
  1: { n: 6, side: 'after', strip: true },
  2: { n: 8, side: 'before', strip: false },
  3: { n: 8, side: 'both', strip: false },
};

module.exports = {
  id: 'G1-492',
  slug: 'letter-before-and-after',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'alphabetical-order',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Letter Before and After', instruction: 'Write the letter that comes before the letter, and the letter that comes after it in the alphabet.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = A.loc2(locale);
    const alpha = A.orderAlphabetOf(L);
    // the letters asked: inner letters only, no two neighbours of each other (one item would give the other's answer)
    const inner = rng.shuffle(alpha.map((_, i) => i).slice(1, -1));
    const picked = [];
    for (const i of inner) { if (picked.length >= d.n) break; if (picked.every((j) => Math.abs(j - i) > 1)) picked.push(i); }
    if (picked.length < d.n) throw new Error(`G1-492: ${L} gives only ${picked.length} letters`);
    const box = (ch, px) => `<span class="ws-answerbox" data-lcs-answer="${ch}" style="width:${px}px;height:${px}px;font-size:${Math.round(px * 0.58)}px;border-width:2.5px"></span>`;
    const given = (ch, px) => `<span data-lcs-given="${ch}" style="display:inline-flex;align-items:center;justify-content:center;width:${px}px;height:${px}px;box-sizing:border-box;background:${T.cream};border:2.5px solid ${T.teal};border-radius:12px;font:700 ${Math.round(px * 0.6)}px/1 'Baloo 2',cursive;color:${T.teal}">${ch}</span>`;
    const px = d.strip ? 88 : 80;
    const items = picked.map((i, k) => {
      const parts = [];
      if (d.side !== 'after') parts.push(box(alpha[i - 1], px));
      parts.push(given(alpha[i], px));
      if (d.side !== 'before') parts.push(box(alpha[i + 1], px));
      return `<div class="ws-card" data-lcs-neighbour="${alpha[i]}" style="flex-direction:row;align-items:center;justify-content:center;gap:12px;padding:12px 10px"><span class="ws-card-badge">${k + 1}</span>${parts.join('')}</div>`;
    });
    const cols = 2, rows = Math.ceil(d.n / cols);
    const strip = d.strip ? `<div data-lcs-abc-strip style="display:flex;flex-wrap:wrap;justify-content:center;gap:4px;padding:0 0 14px">${alpha.map((ch) => `<span style="display:inline-flex;align-items:center;justify-content:center;width:30px;height:34px;border-radius:6px;background:${T.tealSoft};font:700 21px/1 'Baloo 2',cursive;color:${T.teal}">${ch}</span>`).join('')}</div>` : '';
    const grid = `<div style="flex:1;display:grid;grid-template-columns:repeat(${cols},1fr);grid-template-rows:repeat(${rows},minmax(0,1fr));gap:14px">${items.join('')}</div>`;
    return { bodyHtml: `<div data-ws-content data-lcs-before-after="${d.side}" data-lcs-alphabet="${alpha.join('')}" style="flex:1;display:flex;flex-direction:column;min-height:0">${strip}${grid}</div>`, meta: { letters: picked.map((i) => alpha[i]) } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-lcs-before-after]'), side = root.dataset.lcsBeforeAfter, alpha = [...root.dataset.lcsAlphabet];
      const items = [...document.querySelectorAll('[data-lcs-neighbour]')];
      const idx = items.map((it) => alpha.indexOf(it.dataset.lcsNeighbour));
      if (items.length < 6) fails.push(`${items.length} items`);
      idx.forEach((i, k) => {
        if (i <= 0 || i >= alpha.length - 1) fails.push(`item ${k + 1}: the first or last letter`);
        const it = items[k], boxes = [...it.querySelectorAll('[data-lcs-answer]')].map((b) => b.dataset.lcsAnswer);
        const want = (side === 'after' ? [] : [alpha[i - 1]]).concat(side === 'before' ? [] : [alpha[i + 1]]);
        if (boxes.join('') !== want.join('')) fails.push(`item ${k + 1}: boxes ${boxes.join(',')} ≠ ${want.join(',')}`);
        if ([...it.querySelectorAll('[data-lcs-answer]')].some((b) => b.textContent.trim())) fails.push(`item ${k + 1}: an answer is printed`);
        idx.forEach((j, m) => { if (m > k && Math.abs(j - i) <= 1) fails.push(`items ${k + 1} and ${m + 1} are neighbours (one gives the other's answer)`); });
      });
      if (new Set(idx).size !== idx.length) fails.push('a letter twice');
      return fails;
    });
  },
};
