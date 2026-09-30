/**
 * K-389 — Sight Word in Sentences. Level Set 2026-09-30: a NEW one-word page in family sight-words (the operator's
 * screenshots: "complete the sentences using the sight word"). The word sits in a box at the top; below, numbered
 * sentences with the word taken out, a school-lined gap in its place. Levels:
 *   1 four short sentences, the word printed DASHED in each gap to trace (sentence-initial gaps only when the others run out)
 *   2 five sentences, empty gaps (sentence-initial only when the others run out)
 *   3 all six sentences, empty gaps, sentence-initial gaps allowed (with the capital-letter reminder)
 * PDF only; no published page.
 */
'use strict';
const SW = require('../../lib/sight-words-levelset.js');

module.exports = {
  id: 'K-389',
  slug: 'sight-word-in-sentences',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'sight-words',
  themeAxis: { applicable: false },
  unitAxis: SW.unitAxis,
  difficulty: {
    1: { n: 4, traced: true, initial: 'prefer', fontPx: 24 },
    2: { n: 5, traced: false, initial: 'prefer', fontPx: 23 },
    3: { n: 6, traced: false, initial: 'any', fontPx: 22 },
  },
  i18n: { en: { title: 'Sight Word in Sentences: {UNIT}', instruction: 'Read each sentence. Write the word “{UNIT}” on the line.' } },

  build({ difficulty, locale, unit }, ctx) {
    const d = this.difficulty[difficulty];
    const loc = (locale || 'en').slice(0, 2);
    const word = SW.wordOf(unit || SW.unitAxis.exemplar(loc), loc);
    const sents = SW.pickSentences(word, loc, { n: d.n, level: difficulty, rng: ctx.rng, initial: d.initial });
    const initial = sents.some((s) => SW.startsSentence(s, word));
    const rows = sents.map((s, i) => `<div style="display:flex;align-items:baseline;gap:10px"><span style="font-family:'Nunito',sans-serif;font-weight:800;font-size:${d.fontPx}px;min-width:28px">${i + 1}.</span>${SW.blankSentence(s, word, { traced: d.traced, fontPx: d.fontPx })}</div>`);
    const head = `<div style="display:flex;align-items:center;justify-content:space-between;gap:16px">${SW.sectionLabel(SW.label('complete', loc))}${SW.wordBox(word, 60)}</div>` +
      (initial ? `<div data-lcs-capital style="font-family:'Nunito',sans-serif;font-size:15px;font-style:italic">${SW.esc(SW.label('capital', loc))}</div>` : '');
    return {
      bodyHtml: `<div data-ws-content data-lcs-sightword="${SW.esc(word)}" style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:8px">${head}${rows.join('')}</div>`,
      meta: { word, sentences: sents },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-lcs-sightword]');
      if (!root) return ['no sight-word root'];
      const word = root.dataset.lcsSightword;
      const esc = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp('(?<!\\p{L})' + esc + '(?!\\p{L})', 'iu');
      const sents = [...document.querySelectorAll('[data-lcs-sentence]')];
      if (sents.length < 4) fails.push(`only ${sents.length} sentences`);
      const seen = new Set();
      sents.forEach((p, i) => {
        if (re.test(p.textContent)) fails.push(`sentence ${i + 1} still prints the word`);
        if (p.dataset.lcsAnswer.toLocaleLowerCase() !== word.toLocaleLowerCase()) fails.push(`sentence ${i + 1} answer "${p.dataset.lcsAnswer}"`);
        if (p.querySelectorAll('[data-lcs-gap]').length !== 1) fails.push(`sentence ${i + 1}: gaps ≠ 1`);
        const t = p.textContent.trim();
        if (seen.has(t)) fails.push(`sentence ${i + 1} repeats`);
        seen.add(t);
        const traced = p.querySelector('[data-lcs-gap] [data-lcs-prim="trace-word"]');
        if (traced && traced.dataset.lcsText !== p.dataset.lcsAnswer) fails.push(`sentence ${i + 1}: gap traces "${traced.dataset.lcsText}"`);
      });
      const anyInitial = sents.some((p) => p.dataset.lcsInitial === '1');
      if (anyInitial !== !!document.querySelector('[data-lcs-capital]')) fails.push('capital reminder present iff a sentence-initial blank');
      return fails;
    });
  },
};
