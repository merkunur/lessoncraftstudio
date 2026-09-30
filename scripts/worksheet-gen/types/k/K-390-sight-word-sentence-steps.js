/**
 * K-390 — Sight Word Sentence (one sentence, step by step). Level Set 2026-09-30: a NEW one-word page in family
 * sight-words (the operator's screenshot "Sight Word Sentences: best"): ONE sentence carrying the word goes through
 * the steps read → complete (the word taken out) → trace (the whole sentence dashed) → circle the word → write it.
 * Levels by the sentence and the steps:
 *   1 the shortest sentence; read · complete · trace · circle (no copying the whole sentence yet)
 *   2 a middle-length sentence; all five steps
 *   3 the longest sentence that still traces at a readable size; all five steps
 * Below level 3 the complete step prefers a sentence where the word is not first. PDF only; no published page.
 */
'use strict';
const SW = require('../../lib/sight-words-levelset.js');
const { strokeWordLane, writingRow } = require('../../primitives/trace-path.js');

const W = 660;

module.exports = {
  id: 'K-390',
  slug: 'sight-word-sentence-steps',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'sight-words',
  themeAxis: { applicable: false },
  unitAxis: SW.unitAxis,
  difficulty: {
    1: { write: false, traceH: 86, glyphH: 50, minGlyph: 34, initial: 'prefer', fontPx: 28 },
    2: { write: true, traceH: 80, glyphH: 46, minGlyph: 30, initial: 'prefer', fontPx: 26 },
    3: { write: true, traceH: 76, glyphH: 42, minGlyph: 28, initial: 'any', fontPx: 25 },
  },
  i18n: { en: { title: 'Sight Word Sentence: {UNIT}', instruction: 'Work through one sentence, step by step.' } },

  build({ difficulty, locale, unit }, ctx) {
    const d = this.difficulty[difficulty];
    const loc = (locale || 'en').slice(0, 2);
    const word = SW.wordOf(unit || SW.unitAxis.exemplar(loc), loc);
    const fits = (s) => SW.tracedGlyphH(s, { w: W, h: d.traceH, glyphH: d.glyphH }) >= d.minGlyph;
    const [s] = SW.pickSentences(word, loc, { n: 1, level: difficulty, rng: ctx.rng, initial: d.initial, accept: fits });
    const { before, target, after } = SW.splitAtWord(s, word);
    const box = (label, n, inner) => `<div data-lcs-step="${n}" style="border:2px solid #3B3632;border-radius:12px;padding:6px 12px 8px">${SW.sectionLabel(label, n)}${inner}</div>`;
    const big = (inner, extra = '') => `<p data-lcs-read style="margin:0;font-family:'Nunito',sans-serif;font-weight:700;font-size:${d.fontPx}px;line-height:1.5${extra}">${inner}</p>`;
    let n = 0;
    const steps = [];
    steps.push(box(SW.label('readSentence', loc), ++n, big(SW.esc(s))));
    steps.push(box(SW.label('completeSentence', loc), ++n, SW.blankSentence(s, word, { fontPx: d.fontPx })));
    steps.push(box(SW.label('traceSentence', loc), ++n, strokeWordLane({ text: s, w: W - 30, h: d.traceH, glyphH: d.glyphH, reps: 1, stack: true, modelless: true }).svg));
    // circle: the same sentence with generous word spacing so a child's circle fits round one word
    steps.push(box(SW.label('circle', loc), ++n, `<div data-lcs-circle-target="${SW.esc(target)}">${big(SW.esc(s), ';word-spacing:18px')}</div>`));
    if (d.write) steps.push(box(SW.label('writeSentence', loc), ++n, `<div data-lcs-own>${writingRow({ w: W - 30, h: d.traceH, glyphH: d.glyphH, xHeight: true }).svg}</div>`));
    const head = `<div style="display:flex;justify-content:flex-end">${SW.wordBox(word, 54)}</div>`;
    const cap = SW.startsSentence(s, word) ? `<div data-lcs-capital style="font-family:'Nunito',sans-serif;font-size:14px;font-style:italic">${SW.esc(SW.label('capital', loc))}</div>` : '';
    return {
      bodyHtml: `<div data-ws-content data-lcs-sightword="${SW.esc(word)}" data-lcs-sentence-text="${SW.esc(s)}" style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:8px">${head}${cap}${steps.join('')}</div>`,
      meta: { word, sentences: [s], parts: [before, target, after] },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-lcs-sightword]');
      if (!root) return ['no sight-word root'];
      const word = root.dataset.lcsSightword;
      const s = root.dataset.lcsSentenceText;
      const steps = document.querySelectorAll('[data-lcs-step]');
      if (steps.length < 4) fails.push(`${steps.length} steps < 4`);
      const reads = [...document.querySelectorAll('[data-lcs-read]')];
      // the page's French typography pass adds a word joiner after hyphens (est-⁠il) and narrow spaces before ? !
      const norm = (t) => t.replace(/⁠/g, '').replace(/[‐‑]/g, '-').replace(/[‘’]/g, "'").replace(/[\s  ]+/g, ' ').trim();
      if (reads.length !== 2 || reads.some((r) => norm(r.textContent) !== norm(s))) fails.push('read/circle steps do not print the sentence');
      const lane = document.querySelector('[data-lcs-step="3"] [data-lcs-prim="trace-word"]');
      if (!lane || lane.dataset.lcsText !== s) fails.push('trace step does not trace the sentence');
      const blank = document.querySelector('[data-lcs-sentence]');
      if (!blank || blank.dataset.lcsAnswer.toLocaleLowerCase() !== word.toLocaleLowerCase()) fails.push('complete step answer is not the word');
      const esc = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (blank && new RegExp('(?<!\\p{L})' + esc + '(?!\\p{L})', 'iu').test(blank.textContent)) fails.push('complete step still prints the word');
      return fails;
    });
  },
};
