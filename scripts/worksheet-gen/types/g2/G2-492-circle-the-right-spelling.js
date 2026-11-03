/**
 * G2-492 — Circle the Right Spelling (Spelling maker 2026-11-02, NEW-TEMPLATES §3 T4; L.2.2.d, L.3.2.f spelling
 * patterns; de "Rechtschreibung", nl "spelling", pt "ortografia"): a picture and its word written two or three ways;
 * the child circles the right spelling. Each wrong spelling is ONE error a child of that language really makes
 * (types/_shared/spelling-words.js misspellings, native review 2026-11-03): a consonant between vowels doubled or a double
 * made single, a consonant of a cluster left out, or the language's own confusions — en e/i ck/k silent e, de ie/i ck/k
 * final d/t Dehnungs-h, fr the mute final letter and the accents, es b/v ll/y c/s/z h, pt s/ss/ç x/ch final o/u, it the
 * double letters qu/cu gli, nl ei/ij final d/t, sv / da / no e/ä o/å silent d, fi vowel and consonant length. Never a
 * final letter doubled, never the only vowel of a syllable dropped, never a word of the language (the vocabulary, the 50k
 * rivals list, the review's extra words) or a rude word, never the word itself; the first letter stays (it is the
 * picture's sound); each wrong spelling of a word comes from a different rule where the word allows. The right one stands
 * in each place as often as the page allows. The words are the theme's reviewed picture words (de nouns capitalised).
 * Each spelling is a choice; the right one is ringed on the key.
 * Levels (words of 5 letters or more): 1 six words, two spellings · 2 six words, three spellings · 3 six longer words,
 * three spellings.
 */
'use strict';
const { fileUri } = require('../../lib/b2-common.js');
const SW = require('../_shared/spelling-words.js');
const slot = require('../../lib/slot.js');
const T = require('../../primitives/_tokens.js').color;

const D = {
  // words of 5 letters or more: one change to a short word too often makes another word (cat → cot, plane → pane)
  1: { n: 6, min: 5, max: 7, choices: 2 },
  2: { n: 6, min: 5, max: 8, choices: 3 },
  3: { n: 6, min: 6, max: 10, choices: 3 },
};
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** `k` wrong spellings of the word, each from a different rule where the word allows (never a real or rude word) */
function wrongSpellings(word, L, k, rng) {
  const all = SW.misspellings(word, L).filter((x) => !SW.isRealFor(x.s, word, L) && !SW.rudeFit(x.s, L));
  const byKind = {};
  for (const x of rng.shuffle(all)) if (!byKind[x.kind]) byKind[x.kind] = x.s;
  const out = [];
  for (const kind of rng.shuffle(Object.keys(byKind))) if (out.length < k && !out.some((o) => o.toLocaleLowerCase(L) === byKind[kind].toLocaleLowerCase(L))) out.push(byKind[kind]);
  for (const x of all) if (out.length < k && !out.some((o) => o.toLocaleLowerCase(L) === x.s.toLocaleLowerCase(L))) out.push(x.s);
  return out.length === k ? out : null;
}

module.exports = {
  id: 'G2-492',
  slug: 'circle-the-right-spelling',
  gradeBand: 'G2',
  assetClass: 'icon-placement',
  exerciseType: 'spelling-rules',
  themeAxis: { applicable: true, minNouns: 8, excludeBw: true },
  difficulty: D,
  i18n: { en: { title: 'Circle the Right Spelling', instruction: 'Look at each picture. Read the words. Circle the word that is spelled right.' } },

  build({ theme, difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = String(locale || 'en').slice(0, 2);
    const pool = SW.pool(theme, L, d.min, d.max);
    const items = [];
    for (const e of rng.shuffle(pool)) {
      if (items.length === d.n) break;
      const wrong = wrongSpellings(e.word, L, d.choices - 1, rng);
      if (wrong) items.push({ e, wrong });
    }
    if (items.length < d.n) throw new Error(`G2-492: theme ${theme}/${L} gives ${items.length} words with wrong spellings (< ${d.n})`);
    // a teacher's words (maker): a word of the pool that has wrong spellings to offer (the page's own rule), else refused
    {
      const cur = items.map((x) => x.e), chosen = slot.pictures(ctx, cur, pool, theme);
      if (chosen.some((e, i) => e !== cur[i])) {
        const wr = chosen.map((e, i) => (e === cur[i] ? items[i].wrong : wrongSpellings(e.word, L, d.choices - 1, rng)));
        if (wr.every(Boolean)) chosen.forEach((e, i) => { items[i] = { e, wrong: wr[i] }; });
        else { slot.pictures({ ...ctx, overrides: null }, cur, pool, theme); slot.refuse(ctx, 'pic'); }
      }
    }
    const places = rng.shuffle(items.map((_, i) => i % d.choices));
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    // two cards a row only for two short spellings; else one compact card a row (the page holds 8)
    const maxLen = Math.max(...items.map(({ e }) => [...e.word].length)), two = d.choices === 2 ? maxLen <= 6 : maxLen <= 4, roomy = two || items.length <= 6;
    const chip = (s, right) => `<span data-lcs-pick="1"${mark && right ? ' data-lcs-correct="1"' : ''} style="padding:6px 14px;border:2.5px solid ${T.grid};border-radius:12px;background:#FFFFFF;font:700 ${d.choices > 2 ? 21 : 24}px/1.2 'Nunito',sans-serif;color:${T.ink};white-space:nowrap">${esc(s)}</span>`;
    const cards = items.map(({ e, wrong }, i) => {
      const opts = wrong.slice();
      opts.splice(places[i], 0, e.word);
      return `<div data-lcs-spelling="${i + 1}"${slot.attr(ctx, 'pic', i)} data-lcs-word="${esc(e.word)}" style="display:flex;align-items:center;gap:14px;padding:${roomy ? '10px 14px' : '5px 12px'};border-radius:16px;background:${T.cream}">` +
        `<img class="ws-icon" src="${fileUri(theme, e.noun)}" alt="" style="width:${roomy ? 76 : 56}px;height:${roomy ? 76 : 56}px;object-fit:contain;flex:0 0 auto">` +
        `<span class="ws-choices" style="display:flex;flex-wrap:wrap;gap:8px 10px">${opts.map((o) => chip(o, o === e.word)).join('')}</span></div>`;
    });
    const cols = two ? 2 : 1;
    return {
      bodyHtml: `<div data-ws-content data-lcs-spellings style="flex:1;display:grid;grid-template-columns:repeat(${cols},minmax(0,1fr));gap:${two ? '12px 16px' : roomy ? '14px' : '7px'};align-content:space-evenly;min-height:0">${cards.join('')}</div>`,
      meta: { items: items.map(({ e, wrong }) => `${e.word} (${wrong.join(', ')})`) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const cards = [...document.querySelectorAll('[data-lcs-spelling]')];
      if (cards.length < 6) fails.push(`${cards.length} words`);
      const root = document.querySelector('[data-lcs-spellings]').getBoundingClientRect();
      cards.forEach((c, i) => {
        const r = c.getBoundingClientRect();
        if (r.right > root.right + 1 || r.bottom > root.bottom + 1) fails.push(`card ${i + 1} leaves the page`);
        const opts = [...c.querySelectorAll('[data-lcs-pick]')].map((o) => o.textContent);
        if (opts.filter((o) => o === c.dataset.lcsWord).length !== 1) fails.push(`card ${i + 1}: the right spelling is not there once`);
        if (new Set(opts.map((o) => o.toLowerCase())).size !== opts.length) fails.push(`card ${i + 1}: two spellings alike`);
        c.querySelectorAll('[data-lcs-pick]').forEach((o) => { if (o.getBoundingClientRect().right > r.right + 0.5) fails.push(`card ${i + 1}: a word past its edge`); });
      });
      return fails;
    });
  },
};
