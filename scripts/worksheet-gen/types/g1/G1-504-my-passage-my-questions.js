/**
 * G1-504 — Read and Answer (my passage, my questions) (Reading maker 2026-11-02, NEW-TEMPLATES §48 T1; RL / RI.1-3.1 ask
 * and answer questions about a text; de "Leseverständnis", nl "begrijpend lezen"): a passage in a box and questions,
 * each with a line for the answer. The page starts from a native bank passage and its own questions, asked open (the
 * key prints the right answer on its line: data/reading/reading-new.js passagesFor); the teacher may tap the passage
 * and type her own text (up to 120 words) and tap any question to type her own (sentences-Q1: nothing is generated —
 * her text and questions are the content; a page with her passage prints a small pencil, teacher-made). With her
 * passage, a question she has not typed is printed as an empty question line she writes by hand, and the key holds only
 * the answers of the bank's questions.
 * Levels: 1 a short passage, 3 questions · 2 a passage, 4 questions · 3 a longer passage, 5 questions.
 */
'use strict';
const { passagesFor, pickQuestions } = require('../../data/reading/reading-new.js');
const { writingRow } = require('../../primitives/trace-path.js');
const { seatOnRow } = require('../../lib/key-on-row.js');
const slot = require('../../lib/slot.js');
const A = require('../_shared/alphabet-more.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { n: 3, font: 22 }, 2: { n: 4, font: 19 }, 3: { n: 5, font: 17 } };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const PENCIL = `<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20l1-5L15 5l4 4L9 19z" fill="none" stroke="${T.teal}" stroke-width="2" stroke-linejoin="round"/><path d="M13 7l4 4" stroke="${T.teal}" stroke-width="2"/></svg>`;

module.exports = {
  id: 'G1-504',
  slug: 'read-and-answer',
  gradeBand: 'G1',
  assetClass: 'none',
  exerciseType: 'reading-comprehension',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Read and Answer', instruction: 'Read the text. Answer each question on the line.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = A.loc2(locale);
    // n questions that never give each other away and never repeat (data/reading/reading-new.js pickQuestions)
    const pool = passagesFor(L, Number(difficulty) || 2).map((p) => ({ p, qs: pickQuestions(p, d.n, rng, L) })).filter((x) => x.qs);
    if (!pool.length) throw new Error(`G1-504: ${L} has no passage with ${d.n} questions`);
    const { p, qs: picked } = rng.sample(pool, 1)[0];
    const key = !!(ctx && ctx.answerKey);
    // the teacher's passage: 3-120 words with a letter in it, else the bank's
    let text = slot.text(ctx, p.text, 'text', 800), own = text !== p.text;
    const nWords = String(text).split(/\s+/).filter(Boolean).length;
    if (own && !(nWords >= 3 && nWords <= 120 && /\p{L}/u.test(text))) { slot.refuse(ctx, 'text'); text = p.text; own = false; }
    const qs = picked.map((q, i) => {
      let t = slot.text(ctx, q.q, 'q' + i, 110), mine = t !== q.q;
      if (mine && !(/\p{L}/u.test(t) && /[?？]$/.test(t))) { slot.refuse(ctx, 'q' + i); t = q.q; mine = false; }
      // with her passage the bank's question no longer fits: an empty line she writes her question on
      const blank = own && !mine;
      return { t: blank ? '' : t, mine, blank, answer: !own && !mine ? q.choices[q.correct] : null };
    });
    const row = () => writingRow({ w: 620, h: 50, glyphH: 26, xHeight: true }).svg;
    const passage = `<div data-lcs-passage="${own ? 'own' : p.id}" style="position:relative;padding:14px 18px;border:2.5px solid ${T.teal};border-radius:16px;background:#FFFFFF">` +
      (own ? `<span style="position:absolute;right:10px;top:10px">${PENCIL}</span>` : `<div style="font:700 26px/1.2 'Baloo 2',cursive;color:${T.teal};margin-bottom:6px">${esc(p.title)}</div>`) +
      `<div style="font:600 ${d.font}px/1.5 'Nunito',sans-serif;color:${T.ink};white-space:pre-wrap">${esc(text)}</div></div>`;
    const rows = qs.map((q, i) => slot.stamp(ctx, 'q' + i, 0, `<div data-lcs-question="${i + 1}" style="display:flex;flex-direction:column;gap:2px;padding:4px 12px;border-radius:14px;background:${T.cream}">`) +
      `<div style="display:flex;align-items:flex-end;gap:6px;font:700 19px/1.3 'Nunito',sans-serif;color:${T.ink}">${i + 1}. ${q.blank ? `<div style="flex:1">${row()}</div>` : esc(q.t)}</div>` +
      `<div${key && q.answer ? ' data-lcs-key-sample="1"' : ''}>${key && q.answer ? seatOnRow(row(), q.answer, { fill: T.teal }) : row()}</div></div>`);
    return {
      bodyHtml: `<div data-ws-content data-lcs-read-answer style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:10px;min-height:0">${slot.stamp(ctx, 'text', 0, passage)}${rows.join('')}</div>`,
      meta: { passage: p.id, questions: picked.map((q) => `${q.q} → ${q.choices[q.correct]}`) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const qs = [...document.querySelectorAll('[data-lcs-question]')];
      if (qs.length < 3) fails.push(`${qs.length} questions`);
      const root = document.querySelector('[data-lcs-read-answer]').getBoundingClientRect();
      [document.querySelector('[data-lcs-passage]'), ...qs].forEach((x, i) => { const b = x.getBoundingClientRect(); if (b.right > root.right + 1 || b.bottom > root.bottom + 1) fails.push(`block ${i + 1} leaves the page`); });
      return fails;
    });
  },
};
