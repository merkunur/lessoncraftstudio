/**
 * K-541 — Clap and Count (Syllables maker 2026-11-02, NEW-TEMPLATES §40 T3, the open clapping sheet; RF.K.2.b practice,
 * ungraded): rows of a picture and its word, five empty circles and an empty box; the child says the word, claps its
 * syllables, colours a circle for each clap and writes the number. The page makes NO syllable claim — no split, no
 * count, no answer key (syllables-Q1 "the one safe path": a syllable count is a safety-gated claim, and this sheet is
 * where a teacher uses her OWN words): every picture is a slot the teacher may swap for any picture of the theme (the
 * reviewed library, lib/slot.js), the word printed under it follows. Pictures a child names with another word are left
 * out (lib/picture-name-refusals.js); so are words of more than one word, loanwords whose spoken syllables differ from
 * their spelling (CLAP_REJECT), and every word with more than four vowel groups (CLAP_VOWELS — an upper count of the
 * written syllables), so a word's claps always fit the FIVE circles (a hiatus word like sv "dinosaurie", four vowel
 * groups, is five claps; review 2026-11-02).
 * Levels: 1 six rows · 2 eight rows · 3 ten rows.
 */
'use strict';
const { entriesFor, displayWord, distinctByWord, fileUri } = require('../../lib/b2-common.js');
const { nameRefused, REFUSED, NAME_ONLY } = require('../../lib/picture-name-refusals.js');
const slot = require('../../lib/slot.js');
const A = require('../_shared/alphabet-more.js');
const T = require('../../primitives/_tokens.js').color;

const D = {
  1: { rows: 6, px: 74 },
  2: { rows: 8, px: 60 },
  3: { rows: 10, px: 48 },
};
const REFUSED_NOUNS = new Set([...REFUSED, ...NAME_ONLY].map((x) => x.split('/')[1]));
// loanwords whose claps differ from their letters, and words whose syllables differ by region (review 2026-11-02)
const CLAP_REJECT = { en: ['crayons', 'crayon'], es: ['scooter'], pt: ['skate'] };
const CLAP_VOWELS = { en: 'aeiouy', fr: 'aeiouyéèêëàâîïôûùœ', es: 'aeiouáéíóúü', pt: 'aeiouáéíóúâêôãõà', it: 'aeiouàèéìòù', de: 'aeiouyäöü', nl: 'aeiouyëïéè', sv: 'aeiouyåäö', da: 'aeiouyæøå', no: 'aeiouyæøå', fi: 'aeiouyäö' };
function vowelGroups(word, L) {
  let w = word.toLocaleLowerCase(L);
  if (L === 'fr') w = w.replace(/(es|ent|e)$/u, '');
  if (L === 'en' && w.length > 3) w = w.replace(/([^aeiouy])e$/u, '$1');
  const v = new Set([...(CLAP_VOWELS[L] || 'aeiou')]);
  let n = 0, prev = false;
  for (const ch of w) { const isV = v.has(ch); if (isV && !prev) n++; prev = isV; }
  return n;
}

module.exports = {
  id: 'K-541',
  slug: 'clap-and-count',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'syllable-split',
  themeAxis: { applicable: true, minNouns: 10, excludeBw: true },
  difficulty: D,
  i18n: { en: { title: 'Clap and Count', instruction: 'Say each word and clap its syllables. Color one circle for each clap, then write how many claps you made.' } },

  build({ theme, difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = A.loc2(locale);
    let pool = entriesFor(theme, L).filter((e) => !nameRefused(theme, e.noun) && !REFUSED_NOUNS.has(e.noun))
      .map((e) => ({ ...e, word: displayWord(e.singular, L) })).filter((e) => /^[\p{L}-]+$/u.test(e.word) && [...e.word].length <= 14 &&
        !(CLAP_REJECT[L] || []).includes(e.word.toLocaleLowerCase(L)) && vowelGroups(e.word, L) <= 4);
    pool = distinctByWord(pool, (e) => e.word);
    if (pool.length < d.rows) throw new Error(`K-541: theme ${theme}/${L} has ${pool.length} pictures (< ${d.rows})`);
    const picks = slot.pictures(ctx, rng.sample(pool, d.rows), pool, theme, 'pic');
    const circleR = Math.round(d.px * 0.2);
    const rows = picks.map((e, i) => `<div data-lcs-clap-row="${e.word}" style="display:flex;align-items:center;gap:18px;padding:4px 14px;border-radius:14px;background:${T.cream}">` +
      `<img class="ws-icon" src="${fileUri(theme, e.noun)}" alt=""${slot.attr(ctx, 'pic', i)} style="width:${d.px}px;height:${d.px}px;flex:0 0 auto">` +
      `<span style="flex:1 1 auto;min-width:0;font:700 ${Math.round(Math.min(30, d.px * 0.42))}px/1.1 'Baloo 2',cursive;color:${T.ink};overflow-wrap:anywhere">${e.word}</span>` +
      `<span style="display:inline-flex;gap:${Math.round(circleR * 0.7)}px;flex:0 0 auto">${'<span style="display:inline-block;width:' + circleR * 2 + 'px;height:' + circleR * 2 + 'px;box-sizing:border-box;border:2.5px solid ' + T.teal + ';border-radius:50%"></span>'.repeat(5)}</span>` +
      `<span style="display:inline-block;width:${Math.round(d.px * 0.7)}px;height:${Math.round(d.px * 0.7)}px;box-sizing:border-box;border:2.5px dashed ${T.coral};border-radius:10px;background:#FFFFFF;flex:0 0 auto"></span></div>`);
    return {
      bodyHtml: `<div data-ws-content data-lcs-clap style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:6px;min-height:0">${rows.join('')}</div>`,
      meta: { words: picks.map((e) => e.word) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const rows = [...document.querySelectorAll('[data-lcs-clap-row]')];
      if (rows.length < 6) fails.push(`${rows.length} rows`);
      const ws = rows.map((r) => r.dataset.lcsClapRow);
      if (new Set(ws).size !== ws.length) fails.push('a word twice');
      const root = document.querySelector('[data-lcs-clap]').getBoundingClientRect();
      rows.forEach((r, i) => {
        const b = r.getBoundingClientRect();
        if (b.right > root.right + 1) fails.push(`row ${i + 1} leaves the page`);
        const im = r.querySelector('img'); if (!im.complete || !im.naturalWidth) fails.push(`row ${i + 1}: the picture did not load`);
        if (r.querySelector('[data-lcs-answer]')) fails.push(`row ${i + 1} carries an answer (the sheet makes no claim)`);
      });
      return fails;
    });
  },
};
