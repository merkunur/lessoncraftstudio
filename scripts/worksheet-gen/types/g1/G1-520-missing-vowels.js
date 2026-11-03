/**
 * G1-520 — Missing Vowels (Spelling maker 2026-11-02, NEW-TEMPLATES §3 T5; RF.1.3.b-c vowel sounds and their letters;
 * es "las vocales"): a picture and its word with every vowel left out (the consonants printed); the child writes each
 * vowel in its box. The vowels are each language's own (y in sv / da / no / fi, ä ö ü å æ ø, the accented vowels of fr /
 * es / pt / it: types/_shared/spelling-words.js VOWELS). A word is used only when no other word of the language has the
 * same consonants in the same places (b_t: bat, bit, but) and no rude word fits. A first letter stays printed (the
 * picture's sound; a German noun's capital), es / pt / it keep the final vowel (gatt_: gatto or gatta?), nl ij is one vowel
 * (one box). Native review 2026-11-03. Levels 1-2 show the vowels of the language as a help; level 1
 * keeps to words without accented vowels. Each vowel is an answer box; the key prints the vowels.
 * Levels: 1 six words of 3-6 letters · 2 eight words of 4-8 letters · 3 eight words of 6-10 letters, no help.
 */
'use strict';
const { fileUri } = require('../../lib/b2-common.js');
const SW = require('../_shared/spelling-words.js');
const slot = require('../../lib/slot.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { n: 6, min: 3, max: 6, help: true, plain: true }, 2: { n: 8, min: 4, max: 8, help: true, plain: false }, 3: { n: 8, min: 6, max: 10, help: false, plain: false } };
// the help row: the plain vowels of the language (+ the accented ones a page of that level uses)
const PLAIN = Object.fromEntries(Object.entries({ en: 'aeiou', de: 'aeiouäöü', fr: 'aeiouy', es: 'aeiou', pt: 'aeiou', it: 'aeiou', nl: 'aeiou', sv: 'aeiouyåäö', da: 'aeiouyæøå', no: 'aeiouyæøå', fi: 'aeiouyäö' })
  .map(([L, v]) => [L, [...v].concat(L === 'nl' ? ['ij'] : [])]));
/** the letters of a word that are boxes: every vowel (nl ij one) but the first letter (the picture's sound, a German
 *  capital) and, in es / pt / it, the final vowel (gatt_: gatto or gatta? the picture cannot say) */
function boxed(word, L) {
  const u = SW.units(word, L), n = u.length;
  return u.map((c, i) => i > 0 && SW.isVowel(c, L) && !(i === n - 1 && /^(es|pt|it)$/.test(L)));
}
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

module.exports = {
  id: 'G1-520',
  slug: 'missing-vowels',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'word-building',
  themeAxis: { applicable: true, minNouns: 8, excludeBw: true },
  difficulty: D,
  i18n: { en: { title: 'Missing Vowels', instruction: 'Look at each picture. Write the missing vowels to finish the word.' } },

  build({ theme, difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = String(locale || 'en').slice(0, 2);
    const low = (c) => c.toLocaleLowerCase(L);
    const pool = SW.pool(theme, L, d.min, d.max).filter((e) => {
      const u = SW.units(e.word, L), b = boxed(e.word, L), v = u.filter((c, i) => b[i]);
      if (!v.length) return false;                                               // a vowel to write
      if (d.plain && v.some((c) => !PLAIN[L].includes(low(c)))) return false;    // level 1: no accented vowel
      const pattern = u.flatMap((c, i) => (b[i] ? [...c].map(() => null) : [...c]));
      return !SW.fits(pattern, L, e).length && !SW.rudeFit(pattern, L);         // one word only fits, never a rude one
    });
    if (pool.length < d.n) throw new Error(`G1-520: theme ${theme}/${L} has ${pool.length} words with one filling (< ${d.n})`);
    const picks = slot.pictures(ctx, rng.sample(pool, d.n), pool, theme);   // a teacher's words (maker; the pool keeps only words whose vowels can be blanked)
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    // two cards a row while every word has 5 letters or fewer; else one compact card a row (the page holds 8)
    const two = Math.max(...picks.map((e) => e.word).map((w) => [...w].length)) <= 5, roomy = two || picks.length <= 6;
    const bw = roomy ? 36 : 32, lw = roomy ? 30 : 26, ch = roomy ? 46 : 40, px = two ? 80 : roomy ? 76 : 58;
    const cards = picks.map((e, i) => {
      const b = boxed(e.word, L);
      const cells = SW.units(e.word, L).map((c, j) => (b[j]
        ? `<span class="ws-answerbox"${mark ? ` data-lcs-answer="${esc(c)}"` : ''} style="width:${bw * [...c].length}px;height:${ch}px"></span>`
        : `<span style="display:inline-flex;align-items:flex-end;justify-content:center;width:${lw}px;height:${ch}px;font:700 ${roomy ? 30 : 26}px/1 'Baloo 2',cursive;color:${T.ink}">${esc(c)}</span>`)).join('');
      return `<div data-lcs-vowels="${i + 1}"${slot.attr(ctx, 'pic', i)} data-lcs-word="${esc(e.word)}" style="display:flex;align-items:center;gap:14px;padding:${roomy ? '10px 14px' : '5px 12px'};border-radius:16px;background:${T.cream}">` +
        `<img class="ws-icon" src="${fileUri(theme, e.noun)}" alt="" style="width:${px}px;height:${px}px;object-fit:contain;flex:0 0 auto">` +
        `<span style="display:flex;gap:4px;align-items:flex-end">${cells}</span></div>`;
    });
    const used = [...new Set(picks.flatMap((e) => SW.units(e.word, L).filter((c, j) => boxed(e.word, L)[j]).map(low)))];
    const helpSet = [...PLAIN[L]].concat(used.filter((c) => !PLAIN[L].includes(c)).sort());
    const help = d.help ? `<div data-lcs-vowel-help style="display:flex;justify-content:center;flex-wrap:wrap;gap:10px">${helpSet.map((v) => `<span style="display:inline-flex;align-items:center;justify-content:center;min-width:34px;height:38px;border:2px solid ${T.teal};border-radius:9px;background:#FFFFFF;font:700 22px/1 'Baloo 2',cursive;color:${T.teal}">${esc(v)}</span>`).join('')}</div>` : '';
    return {
      bodyHtml: `<div data-ws-content data-lcs-missing-vowels style="flex:1;display:flex;flex-direction:column;gap:12px;justify-content:space-evenly;min-height:0">${help}` +
        `<div style="display:grid;grid-template-columns:${two ? 'repeat(2,minmax(0,1fr))' : 'minmax(0,1fr)'};gap:${two ? '12px 16px' : roomy ? '14px' : '6px'}">${cards.join('')}</div></div>`,
      meta: { words: picks.map((e) => e.word) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const cards = [...document.querySelectorAll('[data-lcs-vowels]')];
      if (cards.length < 6) fails.push(`${cards.length} words`);
      const root = document.querySelector('[data-lcs-missing-vowels]').getBoundingClientRect();
      cards.forEach((c, i) => {
        const r = c.getBoundingClientRect();
        if (r.right > root.right + 1 || r.bottom > root.bottom + 1) fails.push(`card ${i + 1} leaves the page`);
        c.querySelectorAll('span').forEach((x) => { if (x.getBoundingClientRect().right > r.right + 0.5) fails.push(`card ${i + 1}: content past its edge`); });
      });
      return fails;
    });
  },
};
