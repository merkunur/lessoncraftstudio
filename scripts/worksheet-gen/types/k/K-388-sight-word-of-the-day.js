/**
 * K-388 — Sight Word of the Day. Level Set 2026-09-30: a NEW one-word page in family sight-words (the operator's
 * screenshots: the commercial "read · trace · write · use it in a sentence" sheet). One page per sight word of the
 * locale's ~100-word K-1 list (unit axis = the word), at three levels:
 *   1 two trace rows of the word (model + dashed), one write row, TWO short sentences (a sentence-initial blank only if no other sentence is left)
 *   2 one trace row, two write rows, TWO sentences, write your own sentence
 *   3 one short trace row, two write rows, THREE sentences (a capital-letter blank allowed, with the reminder),
 *     write your own sentence
 * Sentences: data/literacy/sight-levelset/<loc>.txt (the word exactly once; validated + native-reviewed).
 * PDF only; no published page.
 */
'use strict';
const SW = require('../../lib/sight-words-levelset.js');
const { strokeWordLane, writingRow } = require('../../primitives/trace-path.js');

const W = 660;

module.exports = {
  id: 'K-388',
  slug: 'sight-word-of-the-day',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'sight-words',
  themeAxis: { applicable: false },
  unitAxis: SW.unitAxis,
  difficulty: {
    1: { traceRows: 2, reps: 3, traceH: 90, glyphH: 56, writeRows: 1, sentences: 2, own: false, initial: 'prefer', box: 72 },
    2: { traceRows: 1, reps: 4, traceH: 88, glyphH: 52, writeRows: 2, sentences: 2, own: true, initial: 'prefer', box: 64 },
    3: { traceRows: 1, reps: 3, traceH: 80, glyphH: 46, writeRows: 2, sentences: 3, own: true, initial: 'any', box: 60 },
  },
  i18n: { en: { title: 'Sight Word of the Day: {UNIT}', instruction: 'Read the word. Trace it, write it, and use it in sentences.' } },

  build({ difficulty, locale, unit }, ctx) {
    const d = this.difficulty[difficulty];
    const loc = (locale || 'en').slice(0, 2);
    const word = SW.wordOf(unit || SW.unitAxis.exemplar(loc), loc);
    const sents = SW.pickSentences(word, loc, { n: d.sentences, level: difficulty, rng: ctx.rng, initial: d.initial, accept: (s) => SW.blankable(s, word) });
    let n = 0;
    const parts = [];
    parts.push(`<div style="display:flex;align-items:center;justify-content:space-between;gap:16px">${SW.sectionLabel(SW.label('read', loc), ++n)}${SW.wordBox(word, d.box)}</div>`);
    parts.push(SW.sectionLabel(SW.label('trace', loc), ++n));
    for (let i = 0; i < d.traceRows; i++) parts.push(strokeWordLane({ text: word, w: W, h: d.traceH, glyphH: d.glyphH, reps: d.reps }).svg);
    parts.push(SW.sectionLabel(SW.label('write', loc), ++n));
    for (let i = 0; i < d.writeRows; i++) parts.push(writingRow({ w: W, h: d.traceH - 10, glyphH: d.glyphH - 4, xHeight: true }).svg);
    parts.push(SW.sectionLabel(SW.label('complete', loc), ++n));
    if (sents.some((s) => SW.startsSentence(s, word))) parts.push(`<div data-lcs-capital style="font-family:'Nunito',sans-serif;font-size:14px;font-style:italic;margin:-2px 0 2px">${SW.esc(SW.label('capital', loc))}</div>`);
    for (const s of sents) parts.push(SW.blankSentence(s, word));
    if (d.own) {
      parts.push(SW.sectionLabel(SW.label('own', loc), ++n));
      parts.push(`<div data-lcs-own>${writingRow({ w: W, h: 70, glyphH: 40, xHeight: true }).svg}</div>`);
    }
    return {
      bodyHtml: `<div data-ws-content data-lcs-sightword="${SW.esc(word)}" style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:6px">${parts.join('')}</div>`,
      meta: { word, sentences: sents },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-lcs-sightword]');
      if (!root) return ['no sight-word root'];
      const word = root.dataset.lcsSightword;
      const box = document.querySelector('[data-lcs-wordbox]');
      if (!box || box.textContent.trim() !== word) fails.push('word box does not show the word');
      const lanes = [...document.querySelectorAll('[data-lcs-prim="trace-word"]')].filter((s) => !s.closest('[data-lcs-gap]'));
      if (!lanes.length) fails.push('no trace row');
      lanes.forEach((s, i) => { if (s.dataset.lcsText !== word) fails.push(`trace row ${i + 1} traces "${s.dataset.lcsText}"`); });
      const esc = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp('(?<!\\p{L})' + esc + '(?!\\p{L})', 'iu');
      const sents = [...document.querySelectorAll('[data-lcs-sentence]')];
      if (!sents.length) fails.push('no sentences');
      sents.forEach((p, i) => {
        if (re.test(p.textContent)) fails.push(`sentence ${i + 1} still prints the word`);
        if (p.dataset.lcsAnswer.toLocaleLowerCase() !== word.toLocaleLowerCase()) fails.push(`sentence ${i + 1} answer "${p.dataset.lcsAnswer}"`);
        if (p.querySelectorAll('[data-lcs-gap]').length !== 1) fails.push(`sentence ${i + 1}: gaps ≠ 1`);
      });
      const anyInitial = sents.some((p) => p.dataset.lcsInitial === '1');
      if (anyInitial !== !!document.querySelector('[data-lcs-capital]')) fails.push('capital reminder present iff a sentence-initial blank');
      if (!document.querySelectorAll('[data-lcs-prim="writing-row"]').length) fails.push('no writing row');
      return fails;
    });
  },
};
