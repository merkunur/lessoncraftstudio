/**
 * Factory: LITERACY word-build — picture + the word shown as letter tiles with
 * ONE tile blanked (a dashed box); the child writes the missing letter.
 * Modes:
 *   'cvc-missing'    blank a chosen letter position (default: the medial vowel,
 *                    the classic CVC "c _ t"); the picture disambiguates the word.
 *   'build-the-word' picture + empty letter slots + a scrambled letter bank;
 *                    the child writes the word in order using the bank letters.
 *
 * NATIVE-PER-LANGUAGE: each locale's words come from its gated
 * approved-words-<locale>.json pool (short, decodable). en uses CVC; other
 * locales use their own short decodable words with whichever position the
 * native ensemble blanks. Words off the pool are forbidden.
 *
 * cfg: { id, slug, gradeBand, exerciseType, [mode], data, i18n, [difficulty] }
 *   data = { items: { en:[{theme,noun,word,blank}], … } }
 *     word  = the locale word (lowercase letters drawn one-per-tile)
 *     blank = 0-based index of the letter to blank (the answer; never rendered)
 *
 * Cores untouched: borrows .ws-icon + .ws-card-stage; tile CSS scoped inline.
 * themeAxis OFF; the item sample + shuffle = variety.
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');

const SCOPED_CSS = `
.lit-wb{flex:1 1 auto;display:flex;align-items:stretch;justify-content:center;min-height:0;padding:6px 0}
.lit-wb-grid{flex:1 1 auto;display:grid;gap:18px 24px;justify-content:center;align-content:space-evenly}
.lit-wb-card{display:flex;flex-direction:column;align-items:center;background:#FBF3E4;border:2px solid #F0E4CB;border-radius:18px;padding:12px}
.lit-wb-word{display:flex;gap:8px;margin-top:10px;justify-content:center}
.lit-wb-tile{display:flex;align-items:center;justify-content:center;background:#FFFFFF;border:2px solid #F0E4CB;border-radius:11px;font-family:'Baloo 2',cursive;font-weight:700;color:#146B5E}
.lit-wb-tile.lit-wb-gap{border:2.5px dashed #F2784B;color:transparent}
.lit-wb-slots{display:flex;gap:8px;margin-top:10px;justify-content:center}
.lit-wb-slot{background:#FFFFFF;border:2.5px dashed #F2784B;border-radius:11px}
.lit-wb-bank{display:flex;gap:7px;margin-top:9px;justify-content:center;background:#FDF6E8;border:2px solid #F0E4CB;border-radius:12px;padding:7px 9px}
.lit-wb-bank .lit-wb-tile{background:#146B5E;color:#FFFFFF;border-color:#146B5E}
`;

function makeLitWordBuild(cfg) {
  const itemsByLocale = (cfg.data && cfg.data.items) || {};
  return {
    id: cfg.id,
    slug: cfg.slug,
    gradeBand: cfg.gradeBand || 'K',
    assetClass: 'icon-placement',
    exerciseType: cfg.exerciseType || 'word-building',
    mode: cfg.mode || 'cvc-missing',
    themeAxis: { applicable: false },
    difficulty: cfg.difficulty || { 1: { n: 6 }, 2: { n: 8 }, 3: { n: 8 } },
    i18n: cfg.i18n,

    build({ difficulty, locale }, ctx) {
      const rng = ctx.rng;
      const d = this.difficulty[difficulty] || this.difficulty[2];
      const pool = itemsByLocale[locale] || itemsByLocale.en || [];
      const n = Math.min(d.n, pool.length);
      const chosen = rng.shuffle(rng.sample(pool, n));

      if (this.mode === 'build-the-word') return buildBuildWord(chosen, n, rng);

      const cols = n >= 4 ? 4 : n;
      const iconPx = n > 6 ? 92 : 104;
      const tile = 38, fs = 24;

      const cards = chosen.map((it) => {
        const letters = String(it.word).split('');
        const gap = Number.isInteger(it.blank) ? it.blank : Math.max(0, Math.floor(letters.length / 2));
        const tiles = letters.map((ch, i) =>
          `<span class="lit-wb-tile${i === gap ? ' lit-wb-gap' : ''}" style="width:${tile}px;height:${tile}px;font-size:${fs}px">` +
          `${i === gap ? '' : ch}</span>`).join('');
        return `<div class="lit-wb-card" data-lit-content data-lit-word="${it.word}" data-lit-gap="${gap}">` +
          `<div class="ws-card-stage"><img class="ws-icon" src="${fileUri(it.theme, it.noun)}" alt="" ` +
          `style="width:${iconPx}px;height:${iconPx}px"></div>` +
          `<div class="lit-wb-word">${tiles}</div></div>`;
      }).join('');

      return {
        bodyHtml:
          `<style>${SCOPED_CSS}</style>` +
          `<div class="lit-wb"><div class="lit-wb-grid" style="grid-template-columns:repeat(${cols},auto)">` +
          `${cards}</div></div>`,
        meta: {
          mode: this.mode,
          items: chosen.map((it) => ({ word: it.word, answer: String(it.word)[Number.isInteger(it.blank) ? it.blank : Math.floor(it.word.length / 2)] })),
        },
      };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const cards = [...document.querySelectorAll('[data-lit-word]')];
        if (cards.length < 4) fails.push('fewer than 4 word cards');
        cards.forEach((c) => {
          const word = c.getAttribute('data-lit-word') || '';
          if (c.dataset.litMode === 'build') {
            const slots = c.querySelectorAll('.lit-wb-slot').length;
            const bank = [...c.querySelectorAll('.lit-wb-bank .lit-wb-tile')].map((t) => t.textContent);
            if (slots !== word.length) fails.push(`"${word}": slot count != word length`);
            if (bank.length !== word.length) fails.push(`"${word}": bank size != word length`);
            if (bank.slice().sort().join('') !== word.split('').sort().join('')) fails.push(`"${word}": bank is not a permutation of the word`);
          } else {
            const gap = Number(c.getAttribute('data-lit-gap'));
            const tiles = c.querySelectorAll('.lit-wb-tile').length;
            const gaps = c.querySelectorAll('.lit-wb-gap').length;
            if (tiles !== word.length) fails.push(`"${word}": tile count != word length`);
            if (gaps !== 1) fails.push(`"${word}": expected exactly 1 blank, got ${gaps}`);
            if (!(gap >= 0 && gap < word.length)) fails.push(`"${word}": blank index ${gap} out of range`);
          }
        });
        return fails;
      });
    },
  };
}

/* --- build-the-word: picture + empty slots + scrambled letter bank --- */
function buildBuildWord(chosen, n, rng) {
  // taller cards (picture + slots + bank) → cap at 6 in 3 columns to fit the page
  const items = chosen.slice(0, Math.min(6, chosen.length));
  const cols = items.length >= 3 ? 3 : items.length;
  const iconPx = 92;
  const slot = 32, tile = 28, fs = 19;
  const cards = items.map((it) => {
    const letters = String(it.word).split('');
    // scramble the bank (never already in order for words length >= 2)
    let bank;
    do { bank = rng.shuffle(letters); }
    while (letters.length > 1 && bank.join('') === letters.join(''));
    const slots = letters.map(() => `<span class="lit-wb-slot" style="width:${slot}px;height:${slot}px"></span>`).join('');
    const bankHtml = bank.map((ch) =>
      `<span class="lit-wb-tile" style="width:${tile}px;height:${tile}px;font-size:${fs}px">${ch}</span>`).join('');
    return `<div class="lit-wb-card" data-lit-content data-lit-word="${it.word}" data-lit-mode="build">` +
      `<div class="ws-card-stage"><img class="ws-icon" src="${fileUri(it.theme, it.noun)}" alt="" ` +
      `style="width:${iconPx}px;height:${iconPx}px"></div>` +
      `<div class="lit-wb-slots">${slots}</div>` +
      `<div class="lit-wb-bank">${bankHtml}</div></div>`;
  }).join('');
  return {
    bodyHtml:
      `<style>${SCOPED_CSS}</style>` +
      `<div class="lit-wb"><div class="lit-wb-grid" style="grid-template-columns:repeat(${cols},auto)">${cards}</div></div>`,
    meta: { mode: 'build-the-word', items: items.map((it) => ({ word: it.word })) },
  };
}

module.exports = { makeLitWordBuild };
