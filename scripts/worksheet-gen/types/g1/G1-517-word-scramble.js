/**
 * G1-517 — Word Scramble (Spelling & Word Building maker 2026-11-02, NEW-TEMPLATES §3 T1, the old word-scramble app kept;
 * L.1.2.d-e / L.2.2.d; de "Wörter bauen", fr "remets les lettres dans l'ordre"): a picture and the letters of its word
 * mixed up; the child writes the word. The mix never spells the word, never another word of the language (any picture
 * word of the vocabulary, singular or plural: types/_shared/spelling-words.js isWord), and moves most letters; the tiles
 * are lower case (a capital would give away the first letter of a German noun) and the answer is the word as printed
 * (de nouns capitalised; the screen also accepts it in lower case). The words are the theme's reviewed picture words.
 * Level 1 colours the vowels on the tiles. nl ij is one tile (Dutch teaching treats it as one letter); a mix is never a
 * rude word either (types/_shared/spelling-words.js rudeFit).
 * Levels: 1 six words of 3-5 letters, vowels coloured · 2 eight words of 4-7 letters · 3 six words of 6-8 letters.
 */
'use strict';
const { fileUri } = require('../../lib/b2-common.js');
const SW = require('../_shared/spelling-words.js');
const slot = require('../../lib/slot.js');
const T = require('../../primitives/_tokens.js').color;

// level 3 stops at 8 letters (review 2026-11-03: a 9-11 letter scramble — woodpecker, Fledermaus — is beyond grade 1)
const D = { 1: { n: 6, min: 3, max: 5, vowels: true }, 2: { n: 8, min: 4, max: 7, vowels: false }, 3: { n: 6, min: 6, max: 8, vowels: false } };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** a mix of the word's letters (nl ij one tile) that is no word of the language, no rude word, and leaves at most a third
 *  of the letters in place */
function scramble(word, L, rng) {
  const lower = SW.units(word.toLocaleLowerCase(L), L);
  for (let t = 0; t < 80; t++) {
    const mix = rng.shuffle(lower);
    const s = mix.join('');
    if (s === lower.join('') || SW.isRealFor(s, word, L) || SW.rudeFit(s, L)) continue;
    if (mix.filter((c, i) => c === lower[i]).length > Math.floor(lower.length / 3)) continue;
    return mix;
  }
  return null;
}

module.exports = {
  id: 'G1-517',
  slug: 'word-scramble',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'word-building',
  themeAxis: { applicable: true, minNouns: 8, excludeBw: true },
  difficulty: D,
  i18n: { en: { title: 'Word Scramble', instruction: 'Look at each picture. Put the letters in the right order and write the word.' } },

  build({ theme, difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = String(locale || 'en').slice(0, 2);
    const pool = SW.pool(theme, L, d.min, d.max);
    if (pool.length < d.n) throw new Error(`G1-517: theme ${theme}/${L} has ${pool.length} words of ${d.min}-${d.max} letters (< ${d.n})`);
    const items = [];
    for (const e of rng.shuffle(pool)) {
      if (items.length === d.n) break;
      const mix = scramble(e.word, L, rng);
      if (mix) items.push({ e, mix });
    }
    if (items.length < d.n) throw new Error(`G1-517: theme ${theme}/${L} gives ${items.length} words that can be mixed (< ${d.n})`);
    const picks = slot.pictures(ctx, items.map((x) => x.e), pool, theme, 'pic');
    // a teacher's swapped picture gets its own mix (the random stream stays the same: scramble() uses rng only here)
    const mixes = picks.map((e, i) => (e === items[i].e ? items[i].mix : (scramble(e.word, L, rng) || SW.units(e.word.toLocaleLowerCase(L), L).reverse())));
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    // two cards a row while every word has 5 letters or fewer; else one card a row, the tiles and the box side by side
    const maxLen = Math.max(...picks.map((e) => [...e.word].length)), two = maxLen <= 5;
    const tw = two ? 34 : (maxLen >= 9 ? 28 : 31), th = two ? 38 : 36, px = two ? 84 : 60;
    const tile = (c) => `<span data-lcs-tile style="display:inline-flex;align-items:center;justify-content:center;width:${tw}px;height:${th}px;box-sizing:border-box;border:2px solid ${T.grid};border-radius:9px;background:#FFFFFF;font:700 ${two ? 24 : 21}px/1 'Baloo 2',cursive;color:${d.vowels && SW.isVowel(c, L) ? T.coral : T.teal}">${esc(c)}</span>`;
    const cards = picks.map((e, i) => {
      const lower = e.word.toLocaleLowerCase(L), alts = lower !== e.word ? [lower] : [];
      const w = two ? Math.max(130, [...e.word].length * 24 + 24) : [...e.word].length * 18 + 34;
      const box = `<span class="ws-answerbox"${mark ? ` data-lcs-answer="${esc(e.word)}"${alts.length ? ` data-lcs-alts="${esc(alts.join('|'))}"` : ''}` : ''} style="width:${w}px;height:${two ? 50 : 46}px;flex:0 0 auto"></span>`;
      const tiles = `<div style="display:flex;gap:${two ? 5 : 4}px;flex-wrap:${two ? 'wrap' : 'nowrap'}">${mixes[i].map(tile).join('')}</div>`;
      return `<div data-lcs-scramble="${i + 1}" data-lcs-word="${esc(e.word)}" style="display:flex;align-items:center;gap:${two ? 14 : 12}px;padding:${two ? '10px 14px' : '6px 12px'};border-radius:16px;background:${T.cream}">` +
        `<img class="ws-icon" src="${fileUri(theme, e.noun)}" alt=""${slot.attr(ctx, 'pic', i)} style="width:${px}px;height:${px}px;object-fit:contain;flex:0 0 auto">` +
        (two ? `<div style="display:flex;flex-direction:column;gap:10px;min-width:0">${tiles}${box}</div>` : `${tiles}<span style="font:700 24px/1 'Baloo 2',cursive;color:${T.teal}">→</span>${box}`) + '</div>';
    });
    return {
      bodyHtml: `<div data-ws-content data-lcs-scrambles style="flex:1;display:grid;grid-template-columns:${two ? 'repeat(2,minmax(0,1fr))' : 'minmax(0,1fr)'};gap:${two ? '14px 16px' : '8px'};align-content:space-evenly;min-height:0">${cards.join('')}</div>`,
      meta: { words: picks.map((e, i) => `${mixes[i].join('')} → ${e.word}`) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const cards = [...document.querySelectorAll('[data-lcs-scramble]')];
      if (cards.length < 6) fails.push(`${cards.length} words`);
      const root = document.querySelector('[data-lcs-scrambles]').getBoundingClientRect();
      cards.forEach((c, i) => {
        const r = c.getBoundingClientRect();
        if (r.right > root.right + 1 || r.bottom > root.bottom + 1) fails.push(`card ${i + 1} leaves the page`);
        c.querySelectorAll('span, img').forEach((x) => { const q = x.getBoundingClientRect(); if (q.right > r.right + 0.5) fails.push(`card ${i + 1}: content past its edge`); });
        const tiles = [...c.querySelectorAll('[data-lcs-tile]')].map((s) => s.textContent).join('').toLowerCase();
        const word = c.dataset.lcsWord.toLowerCase();
        if ([...tiles].sort().join('') !== [...word].sort().join('')) fails.push(`card ${i + 1}: the tiles are not the word's letters`);
        if (tiles === word) fails.push(`card ${i + 1}: the tiles spell the word`);
      });
      document.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push('a picture did not load'); });
      return fails;
    });
  },
};
