/**
 * G2-486 — Adjective Agreement (Grammar maker 2026-11-02, NEW-TEMPLATES §45 T5; L.2.1 / L.3.1 — the adjective takes the
 * noun's gender: fr "accord de l'adjectif", es "concordancia de género", it "concordanza", de "Adjektiv nach ein / eine",
 * nl "een grote hond / een groot paard", sv "en stor / ett stort"): each row a picture and its noun with the indefinite
 * article, an adjective to put with it in the right form (a size word the picture shows — drawn small or big — or pretty; never a colour the picture would contradict) — before the noun where the language puts it there (de nl sv da
 * no, fr petit / grand / joli), after it elsewhere. Levels 1-2 offer the adjective's forms to circle, level 3 gives the
 * plain form in brackets and a box to write the right one. The forms are literals per locale (data/grammar/
 * grammar-tables.js AGREEMENT, by the vocabulary's own gender code); the article comes from the grammar engine
 * (lcs-grammar indefArticle — never the de dative it returns, de uses the nominative ein / eine / ein). en and fi have no
 * agreement and are refused; es feminine nouns starting with a stressed a ("un águila") are left out.
 * Levels: 1 five rows, choose · 2 seven rows, choose · 3 six rows, write.
 */
'use strict';
const { AGREEMENT } = require('../../data/grammar/grammar-tables.js');
const G = require('../../../../REFERENCE TRANSLATIONS/lcs-grammar.js');
const { pictureWordPool } = require('../_shared/picture-word-pool.js');
const { fileUri } = require('../../image-cache/resolve.js');
const { vocab } = require('../../lib/b2-common.js');
const A = require('../_shared/alphabet-more.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { n: 5, write: false }, 2: { n: 7, write: false }, 3: { n: 6, write: true } };
// the gender code the AGREEMENT table keys on, from the vocabulary's code (no: f takes the common form with "en")
const genderKey = (L, g) => (L === 'no' && g === 'f' ? 'm' : g);

// never on this page: people (an adjective about a child's body or looks), a domino (de der Domino is a costume), and a
// picture of many things (the vocabulary's fi singular = plural, e.g. blocks, dice, crayons: "un blocs" — review 2026-11-02)
const NOT_HERE = new Set(['girl', 'boy', 'baby', 'man', 'woman', 'child', 'children', 'grandma', 'grandpa', 'mother', 'father', 'domino']);
const manyThings = (key) => { const f = vocab()[key] && vocab()[key].fi; return !!(f && f[0] === f[1]); };

function articleFor(L, g, nounAfter) {
  if (L === 'de') return AGREEMENT.de.article[g] || null;
  return G.indefArticle(L, g, nounAfter);
}

module.exports = {
  id: 'G2-486',
  slug: 'adjective-agreement',
  gradeBand: 'G2',
  assetClass: 'icon-placement',
  exerciseType: 'word-classes',
  themeAxis: { applicable: true, minNouns: 8, excludeBw: true },
  difficulty: D,
  i18n: { en: { title: 'Adjective Agreement', instruction: 'Circle the form of the adjective that goes with each noun.' } },

  build({ theme, difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = A.loc2(locale);
    const ag = AGREEMENT[L];
    if (!ag) throw new Error(`G2-486: ${L} has no grammatical gender`);
    const adjKeys = Object.keys(ag.adj);
    const pool = pictureWordPool(theme, L, { maxLetters: 11 }).filter((e) => {
      const g = genderKey(L, e.gender);
      if (NOT_HERE.has(e.vocabKey) || manyThings(e.vocabKey)) return false;
      if (!g || !adjKeys.every((k) => ag.adj[k][g])) return false;
      if (L === 'es' && g === 'f' && /^h?[aá]/i.test(e.word)) return false;
      return !!articleFor(L, g, e.word);
    });
    // both genders on every page, as evenly as the theme allows
    const byG = {};
    pool.forEach((e) => { (byG[genderKey(L, e.gender)] = byG[genderKey(L, e.gender)] || []).push(e); });
    const gs = Object.keys(byG).sort();
    if (gs.length < 2) throw new Error(`G2-486: theme ${theme}/${L} has nouns of one gender only`);
    const lists = gs.map((g) => rng.shuffle(byG[g]));
    const picks = [];
    for (let i = 0; picks.length < d.n && i < 40; i++) { const l = lists[i % lists.length]; if (l.length) picks.push(l.shift()); }
    if (picks.length < d.n) throw new Error(`G2-486: theme ${theme}/${L} has ${pool.length} nouns (< ${d.n})`);
    // every adjective used about as often, each with nouns of both genders where the rows allow
    const adjs = [];
    while (adjs.length < d.n) adjs.push(...rng.shuffle(adjKeys));
    adjs.length = d.n;
    const rows = rng.shuffle(picks).map((e, i) => {
      const g = genderKey(L, e.gender), key = adjs[i], form = ag.adj[key][g], before = !!ag.before[key];
      const art = articleFor(L, g, before ? form : e.word);
      const options = [...new Set(Object.values(ag.adj[key]))];
      return { e, g, key, form, before, art, options: rng.shuffle(options) };
    });
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    // the picture shows the size word: drawn small for "small", big for "big", in a frame of one size
    const base = d.n > 6 ? 62 : 74, frame = Math.round(base * 1.25);
    const px = (r) => { const sz = ag.size && ag.size[r.key]; return sz === 'small' ? Math.round(base * 0.55) : sz === 'big' ? frame : base; };
    const word = (w) => `<span style="font:700 28px/1.2 'Baloo 2',cursive;color:${T.ink}">${w}</span>`;
    const slotW = Math.max(...rows.flatMap((r) => r.options).map((w) => [...w].length)) * 15 + 34;
    const slot = (r) => d.write
      ? `<span class="ws-answerbox"${mark ? ` data-lcs-answer="${r.form}"` : ''} style="display:inline-flex;width:${slotW}px;height:46px;box-sizing:border-box;border:2.5px dashed ${T.coral};border-radius:10px;background:#FFFFFF"></span>`
      : `<span data-lcs-slot="1" style="display:inline-block;width:${slotW}px;height:34px;border-bottom:3px solid ${T.grid}"></span>`;
    const phrase = (r) => {
      // an elided article (it un') joins its word without a space
      const glue = (a, b) => (/'$/.test(a) ? `<span style="white-space:nowrap">${word(a)}${b}</span>` : `${word(a)} ${b}`);
      return r.before ? glue(r.art, `${slot(r)} ${word(r.e.word)}`) : glue(r.art, `${word(r.e.word)} ${slot(r)}`);
    };
    const html = rows.map((r, i) => `<div data-lcs-agree="${i + 1}" data-lcs-gender="${r.g}" style="display:flex;align-items:center;gap:16px;padding:6px 12px;border-radius:14px;background:${T.cream}">` +
      `<span style="flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:${frame}px;height:${frame}px"><img class="ws-icon" data-lcs-size="${ag.size && ag.size[r.key] || ''}" src="${fileUri(theme, r.e.noun)}" alt="" style="width:${px(r)}px;height:${px(r)}px"></span>` +
      `<div style="flex:1;display:flex;flex-wrap:wrap;align-items:center;gap:8px 14px">${phrase(r)}` +
      (d.write
        ? `<span style="font:600 24px/1 'Baloo 2',cursive;color:${T.teal}">(${r.key})</span>`
        : `<span style="display:inline-flex;gap:10px;margin-left:auto">${r.options.map((o) => `<span data-lcs-pick="1"${mark && o === r.form ? ' data-lcs-correct="1"' : ''} style="padding:4px 14px;border:2.5px solid ${T.teal};border-radius:999px;background:#FFFFFF;font:700 26px/1.2 'Baloo 2',cursive;color:${T.ink}">${o}</span>`).join('')}</span>`) +
      '</div></div>');
    return {
      bodyHtml: `<div data-ws-content data-lcs-agreement style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:8px;min-height:0">${html.join('')}</div>`,
      meta: { rows: rows.map((r) => { const sp = /'$/.test(r.art) ? '' : ' '; return r.before ? `${r.art}${sp}[${r.form}] ${r.e.word}` : `${r.art}${sp}${r.e.word} [${r.form}]`; }) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const rows = [...document.querySelectorAll('[data-lcs-agree]')];
      if (rows.length < 5) fails.push(`${rows.length} rows`);
      if (new Set(rows.map((r) => r.dataset.lcsGender)).size < 2) fails.push('one gender only');
      const root = document.querySelector('[data-lcs-agreement]').getBoundingClientRect();
      rows.forEach((r, i) => {
        const b = r.getBoundingClientRect();
        if (b.right > root.right + 1 || b.bottom > root.bottom + 1) fails.push(`row ${i + 1} leaves the page`);
        const im = r.querySelector('img'); if (!im.complete || !im.naturalWidth) fails.push(`row ${i + 1}: the picture did not load`);
      });
      return fails;
    });
  },
};
