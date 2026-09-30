/**
 * K-391 — Trace the Sentences. Level Set 2026-09-30: a NEW one-word page in family sight-words (the operator's
 * screenshots "his" / "eat"): sentences carrying the sight word, each traced in dashed centreline strokes with an
 * empty school-lined row under it to write the sentence alone. Levels:
 *   1 two short sentences, big
 *   2 three sentences
 *   3 three longer sentences (still traceable at a readable size) + write your own sentence
 * PDF only; no published page.
 */
'use strict';
const SW = require('../../lib/sight-words-levelset.js');
const { strokeWordLane, writingRow } = require('../../primitives/trace-path.js');

const W = 660;

module.exports = {
  id: 'K-391',
  slug: 'sight-word-trace-sentences',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'sight-words',
  themeAxis: { applicable: false },
  unitAxis: SW.unitAxis,
  difficulty: {
    1: { n: 2, laneH: 92, glyphH: 54, minGlyph: 33, own: false },
    2: { n: 3, laneH: 80, glyphH: 46, minGlyph: 30, own: false },
    3: { n: 3, laneH: 72, glyphH: 40, minGlyph: 28, own: true },
  },
  i18n: { en: { title: 'Trace the Sentences: {UNIT}', instruction: 'Trace each sentence. Then write it on the line below.' } },

  build({ difficulty, locale, unit }, ctx) {
    const d = this.difficulty[difficulty];
    const loc = (locale || 'en').slice(0, 2);
    const word = SW.wordOf(unit || SW.unitAxis.exemplar(loc), loc);
    const fits = (s) => SW.tracedGlyphH(s, { w: W, h: d.laneH, glyphH: d.glyphH }) >= d.minGlyph;
    const sents = SW.pickSentences(word, loc, { n: d.n, level: difficulty, rng: ctx.rng, accept: fits });
    const lanes = sents.map((s) => `<div class="ws-trace-lane" data-lcs-trace-sentence="${SW.esc(s)}">${strokeWordLane({ text: s, w: W, h: d.laneH, glyphH: d.glyphH, reps: 1, stack: true, modelless: true, emptyLast: true }).svg}</div>`);
    const own = d.own ? SW.sectionLabel(SW.label('own', loc)) + `<div data-lcs-own>${writingRow({ w: W, h: d.laneH, glyphH: d.glyphH, xHeight: true }).svg}</div>` : '';
    const head = `<div style="display:flex;align-items:center;justify-content:space-between;gap:16px">${SW.sectionLabel(SW.label('traceSentence', loc))}${SW.wordBox(word, 56)}</div>`;
    return {
      bodyHtml: `<div data-ws-content data-lcs-sightword="${SW.esc(word)}" style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:10px">${head}${lanes.join('')}${own}</div>`,
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
      const lanes = [...document.querySelectorAll('[data-lcs-trace-sentence]')];
      if (lanes.length < 2) fails.push(`only ${lanes.length} sentences`);
      lanes.forEach((l, i) => {
        const s = l.dataset.lcsTraceSentence;
        if (!re.test(s)) fails.push(`sentence ${i + 1} lacks the word`);
        const svg = l.querySelector('[data-lcs-prim="trace-word"]');
        if (!svg || svg.dataset.lcsText !== s) fails.push(`sentence ${i + 1}: lane traces something else`);
        if (svg && svg.dataset.lcsEmptySlot !== '1') fails.push(`sentence ${i + 1}: no empty row to write it`);
        if (svg && svg.querySelectorAll('text').length) fails.push(`sentence ${i + 1}: drawn as <text>, not strokes`);
      });
      return fails;
    });
  },
};
