/**
 * G2-485 — Conjugation Table (Grammar maker 2026-11-02, NEW-TEMPLATES §45 T3; L.1.1.c / L.3.1.e subject and verb agree,
 * the present tense; de "Verben konjugieren", fr "conjuguer au présent", es "conjugar en presente", fi "verbin
 * persoonamuodot"): a table, one row per person (I, you, he / she, we, you, they — the language's own list) and one
 * column per verb, its infinitive at the top; every cell an answer box for the verb's form with that person. The forms
 * are literals per locale (data/grammar/grammar-tables.js CONJUGATION, regular verbs only); sv / da / no have one form for
 * every person, so they are refused. Level 1 gives the first two forms of its one verb as a model.
 * Levels: 1 one verb, two forms given · 2 two verbs · 3 three verbs.
 */
'use strict';
const slot = require('../../lib/slot.js');
const { CONJUGATION } = require('../../data/grammar/grammar-tables.js');
const A = require('../_shared/alphabet-more.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { verbs: 1, given: 2 }, 2: { verbs: 2, given: 0 }, 3: { verbs: 3, given: 0 } };

module.exports = {
  id: 'G2-485',
  slug: 'conjugation-table',
  gradeBand: 'G2',
  assetClass: 'none',
  exerciseType: 'verb-forms',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Verb Table', instruction: 'Write the verb in each box so it goes with the word at the start of the row.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = A.loc2(locale);
    const c = CONJUGATION[L];
    if (!c) throw new Error(`G2-485: ${L} has one verb form for every person`);
    // a teacher's verbs (maker): any verb of the table (key = its infinitive)
    const vpool = c.verbs.map((_, i) => ({ i, word: c.infinitive[i] }));
    const idx = slot.words(ctx, rng.sample(c.verbs.map((_, i) => i), d.verbs).map((i) => vpool[i]), vpool, 'verb').map((x) => x.i);
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    const longest = Math.max(...idx.flatMap((i) => [...c.verbs[i], c.infinitive[i]]).map((w) => [...w].length));
    // the person column wraps a long label ("er / sie / es") onto two lines; the verb columns share what is left
    const personW = 150;
    const cellW = Math.min(d.verbs === 1 ? 300 : 220, Math.max(150, longest * 15 + 30), Math.floor((660 - personW - 14 * d.verbs) / d.verbs));
    // the table fills the body (620-740 px measured, the page-fill rule)
    const rowH = 94;
    const cell = (w, given) => given
      ? `<span data-lcs-given="1" style="display:inline-flex;align-items:center;justify-content:center;width:${cellW}px;height:62px;font:700 26px/1 'Baloo 2',cursive;color:${T.ink}">${w}</span>`
      : `<span class="ws-answerbox"${mark ? ` data-lcs-answer="${w}"` : ''} style="display:inline-flex;width:${cellW}px;height:62px;box-sizing:border-box;border:2.5px dashed ${T.coral};border-radius:10px;background:#FFFFFF"></span>`;
    const head = `<div style="display:flex;gap:14px;align-items:flex-end;justify-content:center"><span style="width:${personW}px"></span>` +
      idx.map((i, vi) => `<span data-lcs-infinitive="${c.infinitive[i]}"${slot.attr(ctx, 'verb', vi)} style="width:${cellW}px;padding:8px 0;border-radius:12px;background:${T.teal};color:#FFFFFF;text-align:center;font:700 26px/1.1 'Baloo 2',cursive">${c.infinitive[i]}</span>`).join('') + '</div>';
    const rows = c.persons.map((p, r) => `<div data-lcs-person="${r + 1}" style="display:flex;gap:14px;align-items:center;justify-content:center;height:${rowH}px;border-radius:14px;background:${r % 2 ? '#FFFFFF' : T.cream}">` +
      `<span style="width:${personW}px;text-align:right;font:700 ${[...p].length > 9 ? 22 : 26}px/1.1 'Baloo 2',cursive;color:${T.teal}">${p}</span>` +
      idx.map((i) => cell(c.verbs[i][r], r < d.given)).join('') + '</div>');
    return {
      bodyHtml: `<div data-ws-content data-lcs-conjugation style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:8px;min-height:0">${head}${rows.join('')}</div>`,
      meta: { verbs: idx.map((i) => `${c.infinitive[i]}: ${c.persons.map((p, r) => `${p} ${c.verbs[i][r]}`).join(', ')}`) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const rows = [...document.querySelectorAll('[data-lcs-person]')];
      if (rows.length < 6) fails.push(`${rows.length} persons`);
      const root = document.querySelector('[data-lcs-conjugation]').getBoundingClientRect();
      rows.forEach((r, i) => { const b = r.getBoundingClientRect(); if (b.right > root.right + 1 || b.left < root.left - 1) fails.push(`row ${i + 1} leaves the page`); });
      if (root.bottom < [...document.querySelectorAll('[data-lcs-person]')].pop().getBoundingClientRect().bottom - 1) fails.push('the table leaves the page');
      return fails;
    });
  },
};
