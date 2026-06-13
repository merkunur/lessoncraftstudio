/**
 * Factory: LITERACY letter-knowledge — TEXT-tile letter work (no pictures).
 * Modes:
 *   'upper-lower'      two columns (UPPERCASE left, lowercase right, deranged);
 *                      child draws a line from each capital to its small letter.
 *   'missing-alphabet' the locale alphabet in order with some letters blanked
 *                      (dashed boxes); child writes the missing letters.
 *
 * NATIVE-PER-LANGUAGE: the alphabet is the locale's own (en a-z; de adds ä ö ü;
 * Nordic adds å æ ø; es ñ; etc.) — supplied per locale in the data file. No
 * pool words are needed (this is pure letter knowledge), so it is buildable for
 * every locale from its alphabet alone.
 *
 * cfg: { id, slug, gradeBand, exerciseType, mode, data, i18n, [difficulty] }
 *   data = { alphabets: { en:"abc…", de:"abc…äöü", … } }   (lowercase, in order)
 *
 * Cores untouched: borrows .ws-match / .ws-match-col / .ws-match-item /
 * .ws-match-dot for the match mode; all letter-tile CSS scoped inline.
 * themeAxis OFF; the letter sample + derangement (or blank positions) = variety.
 */
'use strict';

const SCOPED_CSS = `
.lit-lk{flex:1 1 auto;display:flex;align-items:stretch;justify-content:center;min-height:0;padding:6px 0}
.lit-letter{font-family:'Baloo 2',cursive;font-weight:700;color:#146B5E;line-height:1}
.lit-lk-mtile{display:flex;align-items:center;justify-content:center;background:#FBF3E4;border:2px solid #F0E4CB;border-radius:16px}
.lit-lk-seq{flex:1 1 auto;display:flex;flex-wrap:wrap;align-content:space-evenly;justify-content:center;gap:16px 14px}
.lit-lk-cell{display:flex;align-items:center;justify-content:center;background:#FBF3E4;border:2px solid #F0E4CB;border-radius:16px}
.lit-lk-blank{background:#FFFFFF;border:2.5px dashed #F2784B}
`;

function makeLitLetterKnowledge(cfg) {
  const alphabets = (cfg.data && cfg.data.alphabets) || {};
  return {
    id: cfg.id,
    slug: cfg.slug,
    gradeBand: cfg.gradeBand || 'K',
    assetClass: 'icon-placement',
    exerciseType: cfg.exerciseType || 'letter-knowledge',
    mode: cfg.mode || 'upper-lower',
    themeAxis: { applicable: false },
    difficulty: cfg.difficulty || { 1: { n: 6 }, 2: { n: 8 }, 3: { n: 10 } },
    i18n: cfg.i18n,

    build({ difficulty, locale }, ctx) {
      const rng = ctx.rng;
      const d = this.difficulty[difficulty] || this.difficulty[2];
      const alphabet = (alphabets[locale] || alphabets.en || 'abcdefghijklmnopqrstuvwxyz').split('');

      if (this.mode === 'missing-alphabet') return buildMissingAlphabet(alphabet, d, rng);
      return buildUpperLower(alphabet, d, rng);
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const blanks = document.querySelectorAll('.lit-lk-blank').length;
        const left = [...document.querySelectorAll('[data-lk-left]')].map((e) => e.dataset.lkLeft);
        const right = [...document.querySelectorAll('[data-lk-right]')].map((e) => e.dataset.lkRight);
        if (left.length) {
          if (left.length !== right.length) fails.push('letter column length mismatch');
          if ([...left].sort().join() !== [...right].sort().join()) fails.push('right column not a permutation of left');
          left.forEach((v, i) => { if (right[i] === v) fails.push(`row ${i + 1}: capital sits straight across from its match`); });
        } else if (blanks === 0) {
          fails.push('letter-knowledge: neither match rows nor missing-letter blanks rendered');
        }
        return fails;
      });
    },
  };
}

/* --- upper-lower match --- */
function buildUpperLower(alphabet, d, rng) {
  const n = Math.min(d.n, alphabet.length);
  const letters = rng.sample(alphabet, n);
  let order;
  do { order = rng.shuffle(letters.map((_, i) => i)); }
  while (n > 1 && order.some((v, i) => v === i));

  const itemH = Math.floor((720 - (n - 1) * 14) / n);
  const tile = Math.min(78, itemH - 18);
  const fs = Math.round(tile * 0.6);

  const left = letters.map((ch) =>
    `<div class="ws-match-item" style="width:170px;height:${itemH}px" data-lk-left="${ch}">` +
    `<span class="lit-lk-mtile lit-letter" style="width:${tile}px;height:${tile}px;font-size:${fs}px">${ch.toUpperCase()}</span>` +
    `<span class="ws-match-dot ws-match-dot--right"></span></div>`).join('');
  const right = order.map((srcIdx) => {
    const ch = letters[srcIdx];
    return `<div class="ws-match-item ws-match-item--plain" style="width:170px;height:${itemH}px" data-lk-right="${ch}">` +
      `<span class="ws-match-dot ws-match-dot--left"></span>` +
      `<span class="lit-lk-mtile lit-letter" style="width:${tile}px;height:${tile}px;font-size:${fs}px">${ch}</span></div>`;
  }).join('');

  return {
    bodyHtml:
      `<style>${SCOPED_CSS}</style>` +
      `<div class="lit-lk ws-match" style="padding:6px 56px">` +
      `<div class="ws-match-col">${left}</div><div class="ws-match-col">${right}</div></div>`,
    meta: { mode: 'upper-lower', pairs: letters.map((c) => c.toUpperCase() + '→' + c) },
  };
}

/* --- missing-letter-in-alphabet --- */
function buildMissingAlphabet(alphabet, d, rng) {
  // blank out d.n positions (never the first), spaced out
  const total = alphabet.length;
  const blankCount = Math.min(d.n, Math.floor(total / 2));
  const candidatePositions = alphabet.map((_, i) => i).filter((i) => i > 0);
  const blanks = new Set(rng.sample(candidatePositions, blankCount));

  const tile = 56;
  const fs = 30;
  const cells = alphabet.map((ch, i) => {
    if (blanks.has(i)) {
      return `<span class="lit-lk-cell lit-lk-blank" data-lit-content data-lk-missing="${ch}" style="width:${tile}px;height:${tile}px"></span>`;
    }
    return `<span class="lit-lk-cell lit-letter" data-lit-content style="width:${tile}px;height:${tile}px;font-size:${fs}px">${ch}</span>`;
  }).join('');

  return {
    bodyHtml:
      `<style>${SCOPED_CSS}</style>` +
      `<div class="lit-lk"><div class="lit-lk-seq">${cells}</div></div>`,
    meta: { mode: 'missing-alphabet', missing: [...blanks].sort((a, b) => a - b).map((i) => alphabet[i]) },
  };
}

module.exports = { makeLitLetterKnowledge };
