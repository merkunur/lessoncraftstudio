/**
 * K-434 — Sight Word: Trace the Word, Trace the Sentence (maker template, 2026-10-31). One sight word per page:
 *   the word big in a box beside one bank sentence that uses it; rows tracing the word; then the SAME sentence traced
 *   on several rows (repetition is the routine: the child writes the word inside its sentence again and again);
 *   level 3 ends with a row to write the sentence alone.
 *   level 1: 3 word rows, the sentence traced 2×   level 2: 2 word rows, 3×   level 3: 2 word rows, 2× + 1 write row
 */
'use strict';
const P = require('../_shared/sight-word-pages.js');
const { SW } = P;
const { strokeWordLane, writingRow } = require('../../primitives/trace-path.js');

const W = 660;

module.exports = {
  id: 'K-434',
  slug: 'sight-word-trace-word-and-sentence',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'sight-words',
  themeAxis: { applicable: false },
  unitAxis: SW.unitAxis,
  difficulty: {
    1: { wordRows: 3, reps: 3, wordH: 92, wordGlyph: 58, sentRows: 2, laneH: 92, glyphH: 54, minGlyph: 34, write: false },
    2: { wordRows: 2, reps: 3, wordH: 88, wordGlyph: 54, sentRows: 3, laneH: 86, glyphH: 50, minGlyph: 32, write: false },
    3: { wordRows: 2, reps: 4, wordH: 84, wordGlyph: 50, sentRows: 2, laneH: 82, glyphH: 48, minGlyph: 30, write: true },
  },
  i18n: { en: { title: 'Word and Sentence Tracing: {UNIT}', instruction: 'Trace the word. Then trace the sentence on each line.' } },

  build({ difficulty, locale, unit }, ctx) {
    const d = this.difficulty[difficulty];
    const loc = (locale || 'en').slice(0, 2);
    const word = SW.wordOf(unit || SW.unitAxis.exemplar(loc), loc);
    // the largest tracing size a sentence of this word fits at: the level's own first, then smaller (floor 28 px)
    let sentence = null;
    for (let min = d.minGlyph; !sentence && min >= 28; min -= 2) {
      const fits = (s) => SW.tracedGlyphH(s, { w: W, h: d.laneH, glyphH: d.glyphH }) >= min;
      if (SW.sentencesOf(word, loc).some(fits)) [sentence] = SW.pickSentences(word, loc, { n: 1, level: difficulty, rng: ctx.rng, accept: fits });
    }
    if (!sentence) throw new Error(`${this.id}: no sentence of "${word}" (${loc}) can be traced at 28 px`);
    const head = `<div style="display:flex;align-items:center;gap:18px">` +
      `<div data-lcs-frame>${SW.wordBox(word, 76)}</div>` +
      `<div data-lcs-frame data-lcs-model-sentence="${P.esc(sentence)}" style="flex:1;border:2.5px solid ${P.INK};border-radius:14px;padding:12px 18px;font-family:${P.FONT_B};font-weight:700;font-size:26px;line-height:1.3;color:${P.INK}">${P.esc(sentence)}</div></div>`;
    const parts = [head, SW.sectionLabel(SW.label('trace', loc))];
    for (let i = 0; i < d.wordRows; i++) parts.push(`<div data-lcs-word-row>${strokeWordLane({ text: word, w: W, h: d.wordH, glyphH: d.wordGlyph, reps: d.reps }).svg}</div>`);
    parts.push(SW.sectionLabel(SW.label('traceSentence', loc)));
    for (let i = 0; i < d.sentRows; i++) parts.push(`<div class="ws-trace-lane" data-lcs-trace-sentence="${P.esc(sentence)}">${strokeWordLane({ text: sentence, w: W, h: d.laneH, glyphH: d.glyphH, reps: 1, stack: true, modelless: true }).svg}</div>`);
    if (d.write) parts.push(SW.sectionLabel(SW.label('writeSentence', loc)), `<div data-lcs-own>${writingRow({ w: W, h: d.laneH, glyphH: d.glyphH, xHeight: true }).svg}</div>`);
    return {
      bodyHtml: `<div data-ws-content data-lcs-sightword="${P.esc(word)}" style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:6px">${parts.join('')}</div>`,
      meta: { word, sentence },
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
      const model = document.querySelector('[data-lcs-model-sentence]');
      if (!model || !re.test(model.dataset.lcsModelSentence)) fails.push('the model sentence does not carry the word');
      const wr = [...document.querySelectorAll('[data-lcs-word-row] [data-lcs-prim="trace-word"]')];
      if (wr.length < 2) fails.push('fewer than 2 word rows');
      wr.forEach((s, i) => { if (s.dataset.lcsText !== word) fails.push(`word row ${i + 1} traces "${s.dataset.lcsText}"`); });
      const lanes = [...document.querySelectorAll('[data-lcs-trace-sentence]')];
      if (lanes.length < 2) fails.push('fewer than 2 sentence rows');
      lanes.forEach((l, i) => {
        if (model && l.dataset.lcsTraceSentence !== model.dataset.lcsModelSentence) fails.push(`sentence row ${i + 1} is another sentence`);
        const svg = l.querySelector('[data-lcs-prim="trace-word"]');
        if (!svg || svg.dataset.lcsText !== l.dataset.lcsTraceSentence) fails.push(`sentence row ${i + 1}: lane traces something else`);
      });
      return fails;
    });
  },
};
