/**
 * Factory: LITERACY vocab-match — two columns; a printed WORD on the left, its
 * PICTURE on the right (deranged); the child draws a line from each word to the
 * picture it names. (Mode 'word-picture'; the read-the-word ↔ meaning skill.)
 *
 * NATIVE-PER-LANGUAGE: each locale's words come from its gated
 * approved-words-<locale>.json pool, paired with the noun's picture. The word
 * is the locale word ("Katze" with a cat picture in de); authored per locale.
 *
 * cfg: { id, slug, gradeBand, exerciseType, [mode], data, i18n, [difficulty] }
 *   data = { pairs: { en:[{theme,noun,word}], … } }
 *
 * Cores untouched: borrows .ws-match / .ws-match-col / .ws-match-item /
 * .ws-match-dot; word-tile CSS scoped inline. themeAxis OFF; pair sample +
 * derangement = variety.
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');
const slot = require('../../lib/slot.js');

// 2026-11-14 (a German native reviewer of K-225): a picture a child may name with ANOTHER word of the same sheet gives that
// word two pictures — a calf beside the word "Kuh", a toe beside "Fuß", a gate beside "Tür" — and a word printed twice
// (de "Uhr" and da "ur" for a clock and a watch, fi "kana" for a chicken and a hen) has two pictures by construction.
// A sheet, and the pictures of a check card, never hold one word twice or two nouns of one family below (a whole and its
// part — a face and a nose, a leg and a knee — or two things a child names alike — a car and a van, an onion and garlic).
const FAMILIES = [
  ['cow', 'calf', 'bull', 'ox'], ['chicken', 'hen', 'rooster', 'chick'], ['deer', 'moose'], ['duck', 'goose'],
  ['leg', 'knee', 'foot', 'toe', 'heel'], ['arm', 'hand', 'finger', 'nail'],
  ['face', 'head', 'chin', 'forehead', 'mouth', 'nose', 'eye', 'eyelashes', 'ear', 'hair'],
  ['door', 'gate'], ['clock', 'watch'], ['cup', 'mug'], ['jar', 'jug'], ['hat', 'cap', 'beanie'],
  ['lake', 'river', 'water', 'wave'], ['bread', 'bun'], ['car', 'van', 'jeep'], ['airplane', 'jet'],
  ['kitchen', 'oven', 'sink', 'faucet'], ['onion', 'garlic'], ['baby', 'doll'],
];
const FAMILY_OF = new Map();
FAMILIES.forEach((f, i) => f.forEach((n) => FAMILY_OF.set(n, i)));
const clash = (a, b) => a.word.toLowerCase() === b.word.toLowerCase() || (FAMILY_OF.has(a.noun) && FAMILY_OF.get(a.noun) === FAMILY_OF.get(b.noun));
const noClash = (set) => set.every((a, i) => set.every((b, j) => j <= i || !clash(a, b)));

const SCOPED_CSS = `
.lit-vm-word{display:flex;align-items:center;justify-content:center;background:#FBF3E4;border:2px solid #F0E4CB;border-radius:14px;font-family:'Baloo 2',cursive;font-weight:700;color:#146B5E}
`;

function makeLitVocabMatch(cfg) {
  const pairsByLocale = (cfg.data && cfg.data.pairs) || {};
  return {
    id: cfg.id,
    slug: cfg.slug,
    gradeBand: cfg.gradeBand || 'K',
    assetClass: 'icon-placement',
    exerciseType: cfg.exerciseType || 'picture-vocabulary',
    mode: cfg.mode || 'word-picture',
    themeAxis: { applicable: false },
    difficulty: cfg.difficulty || { 1: { pairs: 5 }, 2: { pairs: 6 }, 3: { pairs: 7 } },
    i18n: cfg.i18n,

    build({ difficulty, locale }, ctx) {
      const rng = ctx.rng;
      const d = this.difficulty[difficulty] || this.difficulty[2];
      const all = pairsByLocale[locale] || pairsByLocale.en || [];
      const n = Math.min(d.pairs, all.length);
      // a teacher's picture choice (maker): any pair of the reviewed list (its word comes with its picture), else as drawn.
      // A draw with two pairs that clash (above) is drawn again: the first draw stays whenever it is clean
      let drawn = rng.sample(all, n);
      for (let g = 0; g < 200 && !noClash(drawn); g++) drawn = rng.sample(all, n);
      if (!noClash(drawn)) throw new Error(`${this.id}: no ${n} pairs without a clash in ${locale}`);
      const pairs = slot.anyPictures(ctx, drawn, all, 'pic');

      let order;
      do { order = rng.shuffle(pairs.map((_, i) => i)); }
      while (n > 1 && order.some((v, i) => v === i));

      const itemH = Math.floor((720 - (n - 1) * 16) / n);
      const iconPx = Math.min(96, itemH - 26);
      const wordFs = Math.min(34, Math.round(itemH * 0.34));

      // answer marks (2026-11-03): the key numbers each word and badges its picture with the same number; the screen pairs
      // them (tap a word, then its picture)
      const key = !!(ctx && ctx.answerKey), scr = !!(ctx && ctx.screen);
      const num = (i) => `<span data-lcs-key-sample style="position:absolute;left:4px;top:4px;min-width:28px;height:28px;padding:0 6px;box-sizing:border-box;border-radius:14px;background:#146B5E;color:#FFFFFF;font:700 17px/28px 'Baloo 2',cursive;text-align:center">${i}</span>`;
      const left = pairs.map((p, i) =>
        `<div class="ws-match-item" style="${key ? 'position:relative;' : ''}width:230px;height:${itemH}px" data-lit-left="${p.noun}"${key ? ` data-lcs-pair="${i + 1}"` : scr ? ` data-lcs-key-badge="p${i + 1}"` : ''}>` + (key ? num(i + 1) : '') +
        `<span class="lit-vm-word" data-lit-content style="min-width:150px;height:${Math.min(64, itemH - 24)}px;` +
        `padding:0 16px;font-size:${wordFs}px">${p.word}</span>` +
        `<span class="ws-match-dot ws-match-dot--right"></span></div>`).join('');

      const right = order.map((srcIdx) => {
        const p = pairs[srcIdx];
        return `<div class="ws-match-item ws-match-item--plain" style="width:200px;height:${itemH}px" data-lit-right="${p.noun}"${slot.attr(ctx, 'pic', srcIdx)}${key ? ` data-lcs-key-badge="${srcIdx + 1}"` : scr ? ` data-lcs-pair="p${srcIdx + 1}"` : ''}>` +
          `<span class="ws-match-dot ws-match-dot--left"></span>` +
          `<img class="ws-icon" src="${fileUri(p.theme, p.noun)}" alt="" style="width:${iconPx}px;height:${iconPx}px"></div>`;
      }).join('');

      return {
        bodyHtml:
          `<style>${SCOPED_CSS}</style>` +
          `<div class="ws-match" style="padding:6px 44px">` +
          `<div class="ws-match-col">${left}</div><div class="ws-match-col">${right}</div></div>`,
        meta: { mode: this.mode, pairs: pairs.map((p) => p.word + '→' + p.noun) },
      };
    },

    /** THE ITEM BANK (Part 7.6; docs/daily-teaching-system/PART-7-DESIGN.md): eight pairs of the reviewed list drawn as
     *  the page draws them, each a card of its own — the word, and three pictures of the draw to draw its line to (its own
     *  and two others, in a shuffled order); the right picture carries data-lcs-correct. Eight: the cutter pairs a page's
     *  cards with the key page of build() by their place when the counts agree, and a page holds five to seven pairs. */
    checkPage({ difficulty, locale }, ctx) {
      const { checkGrid } = require('../../lib/check-page.js');
      const rng = ctx.rng;
      const all = pairsByLocale[locale] || pairsByLocale.en || [];
      if (all.length < 8) throw new Error(`${this.id} checkPage: ${all.length} pairs < 8`);
      const pairs = rng.sample(all, 8);
      const blocks = pairs.map((p, i) => {
        // the two other pictures come from other themes when the draw has them (a cap beside "hat", a jug beside "jar":
        // two pictures a child may name with the same word)
        // and never a picture that clashes with the card's word (a calf beside "Kuh", a watch beside "Uhr")
        const rest = pairs.filter((o, j) => j !== i && !clash(o, p)), far = rest.filter((o) => o.theme !== p.theme);
        if (rest.length < 2) throw new Error(`${this.id} checkPage: too few pictures for "${p.word}"`);
        const others = rng.sample(far.length >= 2 ? far : rest, 2);
        const opts = rng.shuffle([p, ...others]);
        return `<div style="display:flex;align-items:center;justify-content:center;gap:56px;padding:4px 0">` +
          `<div class="ws-match-item" style="width:190px;height:96px;flex:0 0 auto" data-lit-left="${p.noun}"><span class="lit-vm-word" style="min-width:130px;height:60px;padding:0 16px;font-size:32px">${p.word}</span><span class="ws-match-dot ws-match-dot--right"></span></div>` +
          `<div style="display:flex;gap:18px">` + opts.map((o) =>
            `<div class="ws-match-item ws-match-item--plain" style="width:112px;height:96px" data-lit-right="${o.noun}"${o === p ? ' data-lcs-correct="1"' : ''}>` +
            `<img class="ws-icon" src="${fileUri(o.theme, o.noun)}" alt="" style="width:80px;height:80px"></div>`).join('') +
          `</div></div>`;
      });
      // (the style sheet stands once, before the grid: the cutter carries a page's style sheets along with its cards)
      return { bodyHtml: `<style>${SCOPED_CSS}</style><div>${checkGrid(blocks)}</div>`, meta: {} };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const left = [...document.querySelectorAll('[data-lit-left]')].map((e) => e.dataset.litLeft);
        const right = [...document.querySelectorAll('[data-lit-right]')].map((e) => e.dataset.litRight);
        if (left.length < 4) fails.push('fewer than 4 word-picture pairs');
        if (left.length !== right.length) fails.push('column length mismatch');
        if ([...left].sort().join() !== [...right].sort().join()) fails.push('right column not a permutation of left');
        left.forEach((v, i) => { if (right[i] === v) fails.push(`row ${i + 1}: word sits straight across from its picture`); });
        // one word printed twice gives it two pictures (the families are checked where the sheet is drawn)
        const words = [...document.querySelectorAll('[data-lit-left] [data-lit-content]')].map((e) => e.textContent.trim().toLowerCase());
        if (new Set(words).size !== words.length) fails.push('a word printed twice: ' + words.join(', '));
        return fails;
      });
    },
  };
}

module.exports = { makeLitVocabMatch };
