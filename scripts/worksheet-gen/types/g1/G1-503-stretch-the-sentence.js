/**
 * G1-503 — Stretch the Sentence (Sentences maker 2026-11-02, NEW-TEMPLATES §47 T6; L.1.1.j expand simple sentences,
 * W.1.3; de "Sätze erweitern", fr "enrichir la phrase", sv "bygga ut meningar"): a short sentence (who + what they do:
 * The big dog plays.), then question words with a short line each — the child answers them (in the park, after school,
 * happily) and writes the longer sentence on the line below. Open writing: any answer that fits is right, so the page
 * has no answer key and no screen. The short sentences are the tagged grammar sentences cut after their verb, only
 * where subject + verb is a whole sentence (data/grammar/grammar-tables.js SENTENCES + types/_shared/sentence-items.js
 * INTRANSITIVE); the question words are literals per locale (QUESTIONS, with the locale's punctuation: es ¿…?, fr a
 * narrow space before ?).
 * Levels: 1 three sentences, where? when? · 2 three sentences, where? when? how? · 3 four sentences, where? when? how?
 */
'use strict';
const slot = require('../../lib/slot.js');
const { sentencesOf, split, text, INTRANSITIVE } = require('../_shared/sentence-items.js');
const { writingRow } = require('../../primitives/trace-path.js');
const A = require('../_shared/alphabet-more.js');
const T = require('../../primitives/_tokens.js').color;

const NNBSP = ' ';
const QUESTIONS = {
  en: ['Where?', 'When?', 'How?'], de: ['Wo?', 'Wann?', 'Wie?'], fr: [`Où${NNBSP}?`, `Quand${NNBSP}?`, `Comment${NNBSP}?`],
  es: ['¿Dónde?', '¿Cuándo?', '¿Cómo?'], pt: ['Onde?', 'Quando?', 'Como?'], it: ['Dove?', 'Quando?', 'Come?'],
  nl: ['Waar?', 'Wanneer?', 'Hoe?'], sv: ['Var?', 'När?', 'Hur?'], da: ['Hvor?', 'Hvornår?', 'Hvordan?'], no: ['Hvor?', 'Når?', 'Hvordan?'],
  fi: ['Missä?', 'Milloin?', 'Miten?'],
};
const D = { 1: { n: 3, q: 2 }, 2: { n: 3, q: 3 }, 3: { n: 4, q: 3 } };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

module.exports = {
  id: 'G1-503',
  slug: 'stretch-the-sentence',
  gradeBand: 'G1',
  assetClass: 'none',
  exerciseType: 'sentence-building',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Stretch the Sentence', instruction: 'Read the short sentence. Answer the questions on the short lines. Then write a longer sentence with your answers.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = A.loc2(locale);
    const Q = QUESTIONS[L];
    if (!Q) throw new Error(`G1-503: no question words for ${L}`);
    const pool = rng.shuffle(sentencesOf(L).filter((s) => INTRANSITIVE.includes(s.i)).map((s) => ({ ...s, sp: split(s.tokens) })).filter((s) => s.sp));
    if (pool.length < d.n) throw new Error(`G1-503: ${L} has ${pool.length} short sentences (< ${d.n})`);
    const tagged = pool.map((s) => ({ ...s, word: text(s.tokens) }));
    const picks = slot.words(ctx, tagged.slice(0, d.n), tagged, 'sent');   // a teacher's sentences (maker): another short sentence of the bank
    // the short sentence: the subject and the verb (and a clitic before it), with a full stop
    const short = (s) => text([...s.sp.subject, ...s.sp.predicate.slice(0, s.sp.predicate.findIndex((t) => t.tag === 'V') + 1)]) + '.';
    const lineW = d.q === 2 ? 300 : 196;
    const blocks = picks.map((s, i) => `<div data-lcs-stretch="${i + 1}"${slot.attr(ctx, 'sent', i)} style="display:flex;flex-direction:column;gap:6px;padding:8px 14px;border-radius:14px;background:${T.cream}">` +
      `<div style="font:700 28px/1.2 'Baloo 2',cursive;color:${T.ink}">${esc(short(s))}</div>` +
      `<div style="display:flex;justify-content:space-between;gap:10px">${Q.slice(0, d.q).map((q) => `<div style="display:flex;flex-direction:column;gap:2px"><span style="font:700 22px/1 'Baloo 2',cursive;color:${T.teal}">${q}</span>${writingRow({ w: lineW, h: 46, glyphH: 24, xHeight: true }).svg}</div>`).join('')}</div>` +
      `<div>${writingRow({ w: 630, h: 54, glyphH: 28, xHeight: true }).svg}</div></div>`);
    return {
      bodyHtml: `<div data-ws-content data-lcs-stretch-page style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:10px;min-height:0">${blocks.join('')}</div>`,
      meta: { sentences: picks.map(short), questions: Q.slice(0, d.q) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const bs = [...document.querySelectorAll('[data-lcs-stretch]')];
      if (bs.length < 3) fails.push(`${bs.length} sentences`);
      const root = document.querySelector('[data-lcs-stretch-page]').getBoundingClientRect();
      bs.forEach((b, i) => { const r = b.getBoundingClientRect(); if (r.right > root.right + 1 || r.bottom > root.bottom + 1) fails.push(`sentence ${i + 1} leaves the page`); });
      return fails;
    });
  },
};
