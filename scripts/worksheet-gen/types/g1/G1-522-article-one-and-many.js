/**
 * G1-522 — The Article, One and Many (One & Many, Articles maker 2026-11-03, NEW-TEMPLATES §42 T1; L.1.1.c singular and
 * plural nouns with matching articles; de "Nomen: Artikel und Mehrzahl", nl "lidwoorden en meervoud", sv "en eller ett,
 * en och flera"): a table, one row per picture — the article and the word for ONE, then the word for MANY with its
 * article where the language has one (de der Hund → die Hunde, es el perro → los perros, it il cane → i cani, fr le
 * chien → les chiens, nl de hond → de honden; en a dog → dogs, sv en hund → hundar, da / no en hund → hunde / hunder; fi
 * has no article: koira → koirat). Every form is the vocabulary's (REFERENCE TRANSLATIONS/image-vocabulary.js: the
 * plural as stored — de Äpfel, fr chevaux — and the article from the stored gender, types/_shared/noun-forms.js, which
 * refuses what the data cannot decide: fr / it nouns in h-, es feminines in a stressed a-). Each blank is an answer box;
 * the key prints the forms.
 * Levels: 1 the singular with its article given, write the plural (with its article) · 2 the singular word only, write
 * both articles and the plural (fi: no level 2 — without articles it is level 1) · 3 the plural given, write the article
 * and the singular (fr l', it lo / l' join in).
 */
'use strict';
const { fileUri } = require('../../lib/b2-common.js');
const NF = require('../_shared/noun-forms.js');
const slot = require('../../lib/slot.js');
const { LABELS } = require('../../data/b2/labels.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { n: 6, mode: 'plural' }, 2: { n: 6, mode: 'both' }, 3: { n: 6, mode: 'reverse', hard: true } };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// the article a K-2 table shows for one: the definite where the language teaches der / die / das (de fr es pt it nl), the
// indefinite where its one-word article is the indefinite (en a / an, sv en / ett, da / no en / et)
const INDEF = new Set(['en', 'sv', 'da', 'no']);

/** the row's forms, or null when the language cannot decide one of them */
function forms(e, L, hard) {
  if (L === 'fi') return { art: '', part: '' };
  const art = INDEF.has(L) ? NF.indefinite(e, L, hard) : NF.definite(e, L, hard);
  const part = NF.pluralArticle(e, L);
  if (art == null || part == null) return null;
  return { art, part };
}

module.exports = {
  id: 'G1-522',
  slug: 'article-one-and-many',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'articles',
  themeAxis: { applicable: true, minNouns: 8, excludeBw: true },
  difficulty: D,
  i18n: { en: { title: 'One and Many with the Article', instruction: 'Look at each picture. Write the missing words for one and for many.' } },

  build({ theme, difficulty, locale }, ctx) {
    const d = (this.difficulty || D)[difficulty] || D[2], rng = ctx.rng, L = String(locale || 'en').slice(0, 2);
    if (L === 'fi' && d.mode === 'both') throw new Error('G1-522: fi has no articles — its level 2 would be level 1');
    const pool = NF.pool(theme, L).map((e) => ({ e, f: forms(e, L, !!d.hard), noun: e.noun })).filter((x) => x.f);
    // the articles mixed: no article more than half the rows while another is there (en: an, sv: ett, nl: het are rare)
    const byArt = {};
    for (const x of rng.shuffle(pool)) (byArt[x.f.art] = byArt[x.f.art] || []).push(x);
    const arts = Object.keys(byArt), cap = arts.length > 1 ? Math.ceil(d.n / 2) : d.n, items = [];
    for (let round = 0; items.length < d.n && round < d.n; round++) {
      for (const a of rng.shuffle(arts)) {
        if (items.length === d.n) break;
        if (items.filter((x) => x.f.art === a).length >= cap) continue;
        const x = byArt[a].shift();
        if (x) items.push(x);
      }
    }
    // a theme short of the rarer article (one «an» noun) still fills the page, the rarer article as often as it can
    for (const a of rng.shuffle(arts)) while (items.length < d.n && byArt[a].length) items.push(byArt[a].shift());
    if (items.length < d.n) throw new Error(`G1-522: theme ${theme}/${L} gives ${items.length} nouns with sure articles (< ${d.n})`);
    let rows = rng.shuffle(items);
    // a teacher's pictures (maker): row i's noun swapped for a pool noun with the SAME article (the page's mix stays)
    {
      const chosen = slot.pictures(ctx, rows, pool, theme);
      if (chosen.every((x, i) => x === rows[i] || x.f.art === rows[i].f.art)) rows = chosen;
      else { slot.pictures(ctx && { ...ctx, overrides: null }, rows, pool, theme); slot.refuse(ctx, 'pic'); }
    }
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    const no = L === 'no';
    const maxW = Math.max(...rows.map(({ e }) => Math.max([...e.sing].length, [...e.plur].length)));
    // a word box gives a grade-1 hand ~22 px a letter (one line each for one and many: the box has the row's width)
    const fs = maxW > 11 ? 22 : 26, boxW = Math.min(300, 40 + maxW * 22);
    const box = (answer, w, alts) => `<span class="ws-answerbox"${mark ? ` data-lcs-answer="${esc(answer)}"${alts && alts.length ? ` data-lcs-alts="${esc(alts.join('|'))}"` : ''}` : ''} style="width:${Math.round(w)}px;height:44px;flex:0 0 auto"></span>`;
    const word = (s) => `<span style="font:700 ${fs}px/1.1 'Nunito',sans-serif;color:${T.ink};white-space:nowrap">${esc(s)}</span>`;
    // an article box fits its longest answer; no: «ei» is right for a feminine too (bokmål accepts both)
    const artBox = (a, e) => box(a, 76, [...(no && a === 'en' && NF.eiOK(e) ? ['ei'] : []), ...(a === f0(e).art ? NF.articleAlts(e, L) : [])]);
    const f0 = (e) => rows.find((x) => x.e === e).f;
    const cell = (art, w, given, e) => {
      if (given) return word(NF.join(art, w));
      return (art ? artBox(art, e) : '') + box(w, boxW);
    };
    const one = ({ e, f }) => (d.mode === 'plural' ? word(NF.join(f.art, e.sing)) : d.mode === 'both' ? (f.art ? artBox(f.art, e) : '') + word(e.sing) : cell(f.art, e.sing, false, e));
    const many = ({ e, f }) => (d.mode === 'reverse' ? word(NF.join(f.part, e.plur)) : (f.part ? (d.mode === 'plural' ? word(f.part) : box(f.part, 76)) : '') + box(e.plur, boxW, NF.pluralAlts(e, L)));
    const lab = (LABELS[L] && LABELS[L].singularPlural) || { one: 'one', many: 'many' };
    // each row: the picture, then two lines — for one, for many — each led by its label (Einzahl / Mehrzahl …)
    const pill = (side, text) => `<span class="ws-pill" data-lcs-head="${side}" style="flex:0 0 150px;box-sizing:border-box;text-align:center;font-size:17px;padding:2px 8px">${esc(text)}</span>`;
    const body = rows.map((x, i) => `<div data-lcs-noun-row="${i + 1}"${slot.attr(ctx, 'pic', i)} data-lcs-vocab="${esc(x.e.vocabKey)}" style="display:flex;align-items:center;gap:16px;padding:7px 14px;border-radius:16px;background:${T.cream}">` +
      `<img class="ws-icon" src="${fileUri(theme, x.e.noun)}" alt="" style="width:76px;height:76px;object-fit:contain;flex:0 0 auto">` +
      `<div style="display:flex;flex-direction:column;gap:6px;min-width:0;flex:1">` +
      `<span data-lcs-side="one" style="display:flex;align-items:center;gap:8px;min-height:44px">${pill('one', '1 · ' + lab.one)}${one(x)}</span>` +
      `<span data-lcs-side="many" style="display:flex;align-items:center;gap:8px;min-height:44px">${pill('many', '2 · 3 · ' + lab.many)}${many(x)}</span></div></div>`);
    return {
      bodyHtml: `<div data-ws-content data-lcs-noun-table style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:10px;min-height:0">${body.join('')}</div>`,
      meta: { rows: rows.map(({ e, f }) => `${NF.join(f.art, e.sing)} → ${NF.join(f.part, e.plur)}`) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const rows = [...document.querySelectorAll('[data-lcs-noun-row]')];
      if (rows.length < 6) fails.push(`${rows.length} rows`);
      if (new Set(rows.map((r) => r.dataset.lcsVocab)).size !== rows.length) fails.push('a noun twice');
      const root = document.querySelector('[data-lcs-noun-table]').getBoundingClientRect();
      rows.forEach((r, i) => {
        const b = r.getBoundingClientRect();
        if (b.right > root.right + 1 || b.bottom > root.bottom + 1) fails.push(`row ${i + 1} leaves the page`);
        if (!r.querySelector('.ws-answerbox')) fails.push(`row ${i + 1}: nothing to write`);
        r.querySelectorAll('[data-lcs-side]').forEach((s) => { const q = s.getBoundingClientRect(); [...s.children].forEach((c) => { if (c.getBoundingClientRect().right > b.right - 6) fails.push(`row ${i + 1}: a word past the row`); }); if (q.width < 40) fails.push(`row ${i + 1}: a column too narrow`); });
        // an answer is never printed beside its own box
        r.querySelectorAll('.ws-answerbox[data-lcs-answer]').forEach((x) => { const a = x.dataset.lcsAnswer; const side = x.closest('[data-lcs-side]'); if ([...side.querySelectorAll('span:not(.ws-answerbox)')].some((s) => s.textContent.trim() === a)) fails.push(`row ${i + 1}: "${a}" printed beside its box`); });
      });
      return fails;
    });
  },
};
