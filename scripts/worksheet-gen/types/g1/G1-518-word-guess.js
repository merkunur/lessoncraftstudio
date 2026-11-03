/**
 * G1-518 — Missing Letters (Spelling & Word Building maker 2026-11-02, NEW-TEMPLATES §3 T2, the old word-guess app
 * kept; RF.1.3 / L.1.2.d; es "completa la palabra", fr "lettres manquantes"): a picture and its word with letters left
 * out; the child writes each missing letter in its box. Level 1 leaves out the vowels, levels 2-3 every other letter
 * (half the letters, never the first; level 3 on long words). A word is used only when no other word of the language fits the same pattern
 * (types/_shared/spelling-words.js fits: the vocabulary and the real words of a 50k list, data/spelling/rivals.js — "b_t"
 * could be bat, bit or but; the picture alone must not have to decide);
 * level 1 shows the language's vowels as a help. The first letter is always printed; es / pt / it never leave out the final
 * vowel (gatt_: gatto or gatta?); nl ij is one letter (one box, one help tile); a pattern never fits a rude word (native
 * review 2026-11-03: d_ck, p_t_, c_c_). Each missing letter is an answer box; the key prints the letters.
 * Levels: 1 six words of 3-6 letters, the vowels left out · 2 eight words of 4-7 letters, every other letter · 3 eight
 * words of 6-10 letters, every other letter.
 */
'use strict';
const { fileUri } = require('../../lib/b2-common.js');
const SW = require('../_shared/spelling-words.js');
const slot = require('../../lib/slot.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { n: 6, min: 3, max: 6, mode: 'vowels' }, 2: { n: 8, min: 4, max: 7, mode: 'alternate' }, 3: { n: 8, min: 6, max: 10, mode: 'alternate' } };
// the vowels level 1 leaves out and shows as a help (an accented vowel — es limón, fr épée — stays printed: the accent is
// not this level's point)
// not printed: nl ij is one vowel (one box, one help tile)
const HELP = Object.fromEntries(Object.entries({ en: 'aeiou', de: 'aeiouäöü', fr: 'aeiouy', es: 'aeiou', pt: 'aeiou', it: 'aeiou', nl: 'aeiou', sv: 'aeiouyåäö', da: 'aeiouyæøå', no: 'aeiouyæøå', fi: 'aeiouyäö' })
  .map(([L, v]) => [L, [...v].concat(L === 'nl' ? ['ij'] : [])]));
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * the blanked letters (indexes into SW.units: nl ij is one) for a mode, or null when the word cannot be blanked uniquely.
 * The first letter is always printed (it is the picture's sound, and a German noun's capital); es / pt / it never blank the
 * final vowel (gatt_ is gatto or gatta: the picture cannot say); a pattern never fits another word of the vocabulary or a
 * rude word (d_ck, p_t_).
 */
function blanks(entry, L, mode) {
  const u = SW.units(entry.word, L), n = u.length, low = (c) => c.toLocaleLowerCase(L);
  let set = mode === 'vowels'
    ? u.map((c, i) => i).filter((i) => i > 0 && HELP[L].includes(low(u[i])))
    : u.map((c, i) => i).filter((i) => i % 2 === 1);
  if (/^(es|pt|it)$/.test(L)) set = set.filter((i) => !(i === n - 1 && SW.isVowel(u[i], L)));
  if (!set.length || set.length === n) return null;
  const pattern = u.flatMap((c, i) => (set.includes(i) ? [...c].map(() => null) : [...c]));
  return SW.fits(pattern, L, entry).length || SW.rudeFit(pattern, L) ? null : set;
}

module.exports = {
  id: 'G1-518',
  slug: 'missing-letters',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'word-building',
  themeAxis: { applicable: true, minNouns: 8, excludeBw: true },
  difficulty: D,
  i18n: { en: { title: 'Missing Letters', instruction: 'Look at each picture. Write the missing letters to finish the word.' } },

  build({ theme, difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = String(locale || 'en').slice(0, 2);
    const pool = SW.pool(theme, L, d.min, d.max);
    const items = [];
    for (const e of rng.shuffle(pool)) {
      if (items.length === d.n) break;
      const set = blanks(e, L, d.mode);
      if (set) items.push({ e, set });
    }
    if (items.length < d.n) throw new Error(`G1-518: theme ${theme}/${L} gives ${items.length} words with one filling (< ${d.n})`);
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    // two cards a row while every word has 5 letters or fewer; else one compact card a row (the page holds 8)
    const two = Math.max(...items.map(({ e }) => e.word).map((w) => [...w].length)) <= 5, roomy = two || items.length <= 6;
    const bw = roomy ? 36 : 32, lw = roomy ? 30 : 26, ch = roomy ? 46 : 40, px = two ? 84 : roomy ? 76 : 58;
    const cards = items.map(({ e, set }, i) => {
      const cells = SW.units(e.word, L).map((c, j) => (set.includes(j)
        ? `<span class="ws-answerbox"${mark ? ` data-lcs-answer="${esc(c)}"` : ''} style="width:${bw * [...c].length}px;height:${ch}px"></span>`
        : `<span style="display:inline-flex;align-items:flex-end;justify-content:center;width:${lw}px;height:${ch}px;font:700 ${roomy ? 30 : 26}px/1 'Baloo 2',cursive;color:${T.ink}">${esc(c)}</span>`)).join('');
      return `<div data-lcs-guess="${i + 1}" data-lcs-word="${esc(e.word)}" style="display:flex;align-items:center;gap:14px;padding:${roomy ? '10px 14px' : '5px 12px'};border-radius:16px;background:${T.cream}">` +
        `<img class="ws-icon" src="${fileUri(theme, e.noun)}" alt="" style="width:${px}px;height:${px}px;object-fit:contain;flex:0 0 auto">` +
        `<span style="display:flex;gap:4px;align-items:flex-end">${cells}</span></div>`;
    });
    const help = d.mode === 'vowels'
      ? `<div data-lcs-vowel-help style="display:flex;justify-content:center;gap:10px">${[...HELP[L]].map((v) => `<span style="display:inline-flex;align-items:center;justify-content:center;min-width:34px;height:38px;border:2px solid ${T.teal};border-radius:9px;background:#FFFFFF;font:700 22px/1 'Baloo 2',cursive;color:${T.teal}">${esc(v)}</span>`).join('')}</div>`
      : '';
    return {
      bodyHtml: `<div data-ws-content data-lcs-guesses style="flex:1;display:flex;flex-direction:column;gap:12px;justify-content:space-evenly;min-height:0">${help}` +
        `<div style="display:grid;grid-template-columns:${two ? 'repeat(2,minmax(0,1fr))' : 'minmax(0,1fr)'};gap:${two ? '14px 16px' : roomy ? '14px' : '6px'}">${cards.join('')}</div></div>`,
      meta: { words: items.map(({ e, set }) => SW.units(e.word, L).map((c, j) => (set.includes(j) ? '_' : c)).join('') + ' → ' + e.word) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const cards = [...document.querySelectorAll('[data-lcs-guess]')];
      if (cards.length < 6) fails.push(`${cards.length} words`);
      const root = document.querySelector('[data-lcs-guesses]').getBoundingClientRect();
      cards.forEach((c, i) => {
        const r = c.getBoundingClientRect();
        if (r.right > root.right + 1 || r.bottom > root.bottom + 1) fails.push(`card ${i + 1} leaves the page`);
        c.querySelectorAll('span').forEach((x) => { if (x.getBoundingClientRect().right > r.right + 0.5) fails.push(`card ${i + 1}: content past its edge`); });
        if (!c.querySelector('.ws-answerbox')) fails.push(`card ${i + 1}: no missing letter`);
      });
      return fails;
    });
  },
};
