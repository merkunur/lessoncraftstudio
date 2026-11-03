/**
 * K-527 — Trace a Sentence (Word Tracing & Writing maker 2026-11-02, NEW-TEMPLATES §34 T1; L.K.1.a + L.1.2.b): a short
 * sentence on school lines — once solid to read, then dashed to trace, then empty lines to copy it. The teacher types the
 * sentences (free-text slots, up to 40 characters each, written as typed — her capital and end mark are the model); until
 * she does, the page shows short everyday sentences of the language. Every character is drawn from the platform's
 * centreline letters (data/tracing/letter-strokes.js); a sentence with a character the table cannot draw, or too long to
 * keep its letters at school size on one line, is refused (the page keeps its own sentence and the maker says it does not
 * fit) — never a blank or a substituted letter.
 * Levels: 1 one sentence, big: read, trace three times, write three times · 2 two sentences: read, trace twice, write
 * once · 3 two sentences: read, trace once, write twice (each level fills its page: 700-730 px of the 766 px body; every
 * level traces, as the title says).
 */
'use strict';
const { strokeWordLane } = require('../../primitives/trace-path.js');
const LS = require('../../data/tracing/letter-strokes.js');
const slot = require('../../lib/slot.js');

const SENTENCES = {
  en: ['I can read.', 'I like my cat.'],
  de: ['Ich kann lesen.', 'Ich mag meine Katze.'],
  fr: ['Je sais lire.', 'J’aime mon chat.'],
  es: ['Yo sé leer.', 'Me gusta mi gato.'],
  pt: ['Eu sei ler.', 'Eu gosto do meu gato.'],
  it: ['Io so leggere.', 'Mi piace il mio gatto.'],
  nl: ['Ik kan lezen.', 'Ik hou van mijn kat.'],
  sv: ['Jag kan läsa.', 'Jag tycker om min katt.'],
  da: ['Jeg kan læse.', 'Jeg kan lide min kat.'],
  no: ['Jeg kan lese.', 'Jeg liker katten min.'],
  fi: ['Minä osaan lukea.', 'Minulla on kissa.'],
};
const D = {
  1: { n: 1, glyphH: 54, laneH: 100, trace: 3, empty: 3 },
  2: { n: 2, glyphH: 44, laneH: 86, trace: 2, empty: 1 },
  3: { n: 2, glyphH: 44, laneH: 84, trace: 1, empty: 2 },
};
const MIN_GLYPH = 28;   // a sentence that must shrink its letters below this to fit one line is refused
/** the letter size a sentence keeps on one line: the lane shrinks a long sentence to its 640 px (glyph units: 70 from the
 *  ascender to the baseline, letter-strokes METRICS) */
function fits(t, d) {
  try { const { width } = LS.textGlyphs(t); return /\p{L}/u.test(t) && Math.min(d.glyphH / 70, 640 / width) * 70 >= MIN_GLYPH; } catch (e) { return false; }
}

module.exports = {
  id: 'K-527',
  slug: 'trace-a-sentence',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'word-tracing',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Trace a Sentence', instruction: 'Read the sentence. Trace it on the dashed lines, then write it yourself on the empty lines.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], L = String(locale || 'en').slice(0, 2);
    const own = SENTENCES[L] || SENTENCES.en;
    const blocks = Array.from({ length: d.n }, (_, i) => {
      let t = slot.text(ctx, own[i], 'sentence' + i, 40);
      if (!fits(t, d)) { slot.refuse(ctx, 'sentence' + i); t = own[i]; }
      const lane = (reps, empty) => strokeWordLane({ text: t, w: 660, h: d.laneH, glyphH: d.glyphH, reps, stack: true, emptyLast: empty, padLeft: 12 }).svg;
      const blanks = Array.from({ length: d.empty }, () => `<div data-lcs-write-row>${lane(0, true)}</div>`).join('');
      return `<div data-lcs-sentence="${t.replace(/"/g, '')}" style="display:flex;flex-direction:column;gap:8px"${slot.attr(ctx, 'sentence' + i, 0)}>` +
        `<div data-lcs-trace-rows>${lane(1 + d.trace, false)}</div>${blanks}</div>`;
    });
    return { bodyHtml: `<div data-ws-content style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;align-items:center">${blocks.join('')}</div>`, meta: {} };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const blocks = [...document.querySelectorAll('[data-lcs-sentence]')];
      if (!blocks.length) return ['no sentence'];
      blocks.forEach((b, i) => {
        const t = b.dataset.lcsSentence, lane = b.querySelector('[data-lcs-trace-rows] [data-lcs-prim="trace-word"]');
        if (!lane || lane.dataset.lcsText !== t) fails.push(`sentence ${i + 1}: the lines do not hold the sentence`);
        if (!b.querySelector('[data-lcs-write-row]')) fails.push(`sentence ${i + 1}: no line to write it`);
      });
      const pg = document.querySelector('[data-lcs-page]').getBoundingClientRect();
      document.querySelectorAll('[data-lcs-prim="trace-word"]').forEach((s) => { const r = s.getBoundingClientRect(); if (r.right > pg.right + 1 || r.bottom > pg.bottom + 1) fails.push('a line leaves the page'); });
      return fails;
    });
  },
};
