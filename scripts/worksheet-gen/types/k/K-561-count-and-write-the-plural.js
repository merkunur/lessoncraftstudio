/**
 * K-561 — Count and Write the Plural (One & Many, Articles maker 2026-11-03, NEW-TEMPLATES §42 T2; L.K.1.c form regular
 * plural nouns + K.CC.A.3 number words; de "Einzahl und Mehrzahl", nl "enkelvoud en meervoud", es "singular y plural"):
 * a card of the same picture two to ten times; the child counts them and writes the number word and the word for many —
 * "three cats", "drei Katzen", "duas bonecas". The plural is the vocabulary's (de Äpfel, fr chevaux, never a suffix
 * added); the number word is lib/number-words-1000.js, with pt dois → duas before a feminine (the vocabulary's gender).
 * Never a count of 0 or 1 (one is not many). fi refuses the template: after a number Finnish takes the singular partitive
 * (kolme kissaa), which is not the plural this page teaches. The key prints the words.
 * Levels: 1 two or three pictures, the number word given, write the plural · 2 two to five pictures, write both words ·
 * 3 four to ten pictures, write both words.
 */
'use strict';
const { fileUri } = require('../../lib/b2-common.js');
const NF = require('../_shared/noun-forms.js');
const { numberWord1000, numberWordAlts } = require('../../lib/number-words-1000.js');
const T = require('../../primitives/_tokens.js').color;

// a kindergartner writes short words: the plural has at most 8 letters (level 3: 10) — native review 2026-11-03
const D = { 1: { n: 6, lo: 2, hi: 3, give: true, max: 8 }, 2: { n: 6, lo: 2, hi: 5, max: 8 }, 3: { n: 6, lo: 4, hi: 10, max: 10 } };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** the number word before this noun (pt: duas before a feminine) */
function numWord(k, e, L) {
  const w = numberWord1000(k, L);
  return L === 'pt' && k === 2 && e.gender === 'f' ? 'duas' : w;
}

module.exports = {
  id: 'K-561',
  slug: 'count-and-write-the-plural',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'singular-plural',
  themeAxis: { applicable: true, minNouns: 8, excludeBw: true },
  difficulty: D,
  i18n: { en: { title: 'Count and Write the Plural', instruction: 'Count the pictures in each box. Write the number word and the word for many.' } },

  build({ theme, difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = String(locale || 'en').slice(0, 2);
    if (L === 'fi') throw new Error('K-561: fi takes the singular partitive after a number (kolme kissaa), not the plural');
    const pool = NF.pool(theme, L).filter((e) => [...e.plur].length <= d.max);
    if (pool.length < d.n) throw new Error(`K-561: theme ${theme}/${L} has ${pool.length} nouns with a plural (< ${d.n})`);
    const nouns = rng.sample(pool, d.n);
    // the counts: as many different counts as the range and the page allow (level 1: three of each), shuffled, and never
    // the same count on two neighbouring cards when the range has more than two
    const span = d.hi - d.lo + 1, range = Array.from({ length: span }, (_, i) => d.lo + i);
    const deal = span >= d.n ? rng.sample(range, d.n) : Array.from({ length: d.n }, (_, i) => range[i % span]);
    let counts = rng.shuffle(deal);
    for (let t = 0; t < 200 && span > 2 && !counts.every((c, i) => !i || c !== counts[i - 1]); t++) counts = rng.shuffle(deal);
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    const maxW = Math.max(...nouns.map((e) => [...e.plur].length)), nw = Math.max(...counts.map((k, i) => [...numWord(k, nouns[i], L)].length));
    const box = (answer, w, alts) => `<span class="ws-answerbox"${mark ? ` data-lcs-answer="${esc(answer)}"${alts && alts.length ? ` data-lcs-alts="${esc(alts.join('|'))}"` : ''}` : ''} style="width:${Math.round(w)}px;height:48px;flex:0 0 auto"></span>`;
    const cards = nouns.map((e, i) => {
      const k = counts[i], per = k > 5 ? Math.ceil(k / 2) : k, px = k > 5 ? 40 : k > 3 ? 46 : 58;
      const pics = Array.from({ length: k }, () => `<img class="ws-icon" src="${fileUri(theme, e.noun)}" alt="" data-lcs-pic style="width:${px}px;height:${px}px;object-fit:contain">`).join('');
      const nWord = numWord(k, e, L);
      const numW = 26 + nw * 15, plurW = Math.min(240, 30 + maxW * 15);
      const first = d.give ? `<span style="font:700 24px/1 'Nunito',sans-serif;color:${T.ink};white-space:nowrap">${esc(nWord)}</span>` : box(nWord, numW, numberWordAlts(k, L).concat(L === 'no' && k === 7 ? ['syv'] : []));
      // the two boxes side by side when they fit the card (≈ 276 px), else one under the other (it quattro / cinque)
      const stack = !d.give && numW + plurW + 8 > 276;
      return `<div data-lcs-count-card="${i + 1}" data-lcs-n="${k}" data-lcs-vocab="${esc(e.vocabKey)}" style="display:flex;flex-direction:column;align-items:center;justify-content:space-between;gap:8px;padding:10px 12px;border-radius:16px;background:${T.cream}">` +
        `<div style="display:grid;grid-template-columns:repeat(${per},auto);gap:4px 6px;justify-content:center;align-items:center;flex:1">${pics}</div>` +
        `<div style="display:flex;${stack ? 'flex-direction:column;' : ''}align-items:center;gap:8px;justify-content:center;flex-wrap:nowrap">${first}${box(e.plur, Math.min(stack ? 240 : 276 - (d.give ? 8 + nw * 13 : numW + 8), plurW), NF.pluralAlts(e, L))}</div></div>`;
    });
    return {
      bodyHtml: `<div data-ws-content data-lcs-count-plural style="flex:1;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));grid-auto-rows:1fr;gap:14px 16px;min-height:0">${cards.join('')}</div>`,
      meta: { items: nouns.map((e, i) => `${numWord(counts[i], e, L)} ${e.plur}`) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const cards = [...document.querySelectorAll('[data-lcs-count-card]')];
      if (cards.length < 6) fails.push(`${cards.length} cards`);
      if (new Set(cards.map((c) => c.dataset.lcsVocab)).size !== cards.length) fails.push('a noun twice');
      const root = document.querySelector('[data-lcs-count-plural]').getBoundingClientRect();
      cards.forEach((c, i) => {
        const n = +c.dataset.lcsN, b = c.getBoundingClientRect();
        if (n < 2) fails.push(`card ${i + 1}: a count of ${n}`);
        if (c.querySelectorAll('[data-lcs-pic]').length !== n) fails.push(`card ${i + 1}: ${c.querySelectorAll('[data-lcs-pic]').length} pictures, want ${n}`);
        if (b.right > root.right + 1 || b.bottom > root.bottom + 1) fails.push(`card ${i + 1} leaves the page`);
        c.querySelectorAll('img, .ws-answerbox, span').forEach((x) => { const q = x.getBoundingClientRect(); if (q.right > b.right + 0.5 || q.bottom > b.bottom + 0.5) fails.push(`card ${i + 1}: content past its edge`); });
      });
      if (new Set(cards.map((c) => c.dataset.lcsN)).size < 2) fails.push('every card has the same count');
      return fails;
    });
  },
};
