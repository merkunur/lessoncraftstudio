/**
 * G1-505 — Right Answer or Not? (Reading maker 2026-11-02, NEW-TEMPLATES §48 T2, the true / false face; RL.1.1 / RI.2.1
 * ask and answer questions about key details; de "richtig oder falsch"): a passage, then its questions, each printed
 * with ONE answer — the right one or a wrong one; the child reads and ticks a right answer, crosses a wrong one. Nothing
 * is generated: the passages, the questions and their right and wrong answers are the native banks' own (the short
 * passages data/literacy/reading-passages.js, the Reading Comprehension Level Set pools data/literacy/rc-levels — data/
 * reading/reading-new.js passagesFor), each wrong answer one of the question's own wrong choices. About half the answers
 * are right, never all one way. The tick / cross is a choice; the right one is ringed on the key.
 * Levels: 1 a short passage, 3 questions · 2 a passage, 5 questions · 3 a longer passage, 6 questions.
 */
'use strict';
const { passagesFor, pickQuestions } = require('../../data/reading/reading-new.js');
const A = require('../_shared/alphabet-more.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { n: 3 }, 2: { n: 5 }, 3: { n: 6 } };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const TICK = `<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12.5l5 5L20 6.5" fill="none" stroke="${T.teal}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const CROSS = `<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="${T.coral}" stroke-width="3.2" stroke-linecap="round"/></svg>`;

module.exports = {
  id: 'G1-505',
  slug: 'right-answer-or-not',
  gradeBand: 'G1',
  assetClass: 'none',
  exerciseType: 'reading-comprehension',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Right Answer or Not?', instruction: 'Read the story. Then read each question and its answer. Circle the check if the answer is right. Circle the X if it is wrong.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = A.loc2(locale);
    // right or wrong per question: half and half (a 3-question page 2 / 1 either way); the questions and the answers
    // shown with them never give each other away (data/reading/reading-new.js pickQuestions, the shown answer checked too)
    const nRight = d.n % 2 ? rng.int(0, 1) + Math.floor(d.n / 2) : d.n / 2;
    const right = rng.shuffle(Array.from({ length: d.n }, (_, i) => i < nRight));
    const shownOf = (q, r) => { const wrongs = q.choices.map((c, k) => k).filter((k) => k !== q.correct); return q.choices[r.sample(wrongs, 1)[0]]; };
    const pool = passagesFor(L, Number(difficulty) || 2).map((p) => ({ p, qs: pickQuestions(p, d.n, rng, L, shownOf) })).filter((x) => x.qs);
    if (!pool.length) throw new Error(`G1-505: ${L} has no passage with ${d.n} questions`);
    const { p, qs } = rng.sample(pool, 1)[0];
    const items = qs.map((q, i) => ({ q: q.q, a: right[i] ? q.choices[q.correct] : q.shown, right: right[i] }));
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    const chip = (svg, ok) => `<span data-lcs-pick="1"${mark && ok ? ' data-lcs-correct="1"' : ''} style="display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;border:2.5px solid ${T.grid};border-radius:999px;background:#FFFFFF">${svg}</span>`;
    const passage = `<div data-lcs-passage="${p.id}" style="padding:14px 18px;border:2.5px solid ${T.teal};border-radius:16px;background:#FFFFFF">` +
      `<div style="font:700 26px/1.2 'Baloo 2',cursive;color:${T.teal};margin-bottom:6px">${esc(p.title)}</div>` +
      `<div style="font:600 ${d.n > 3 ? 19 : 22}px/1.5 'Nunito',sans-serif;color:${T.ink}">${esc(p.text)}</div></div>`;
    const rows = items.map((it, i) => `<div data-lcs-tf-item="${i + 1}" data-lcs-right="${it.right ? 1 : 0}" style="display:flex;align-items:center;gap:14px;padding:6px 14px;border-radius:14px;background:${T.cream}">` +
      `<div style="flex:1;min-width:0"><div style="font:700 19px/1.3 'Nunito',sans-serif;color:${T.ink}">${i + 1}. ${esc(it.q)}</div><div style="font:700 21px/1.3 'Baloo 2',cursive;color:${T.teal};margin-left:22px">${esc(it.a)}</div></div>` +
      `<span class="ws-choices" style="display:inline-flex;gap:10px;flex:0 0 auto">${chip(TICK, it.right)}${chip(CROSS, !it.right)}</span></div>`);
    return {
      bodyHtml: `<div data-ws-content data-lcs-true-false style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:10px;min-height:0">${passage}${rows.join('')}</div>`,
      meta: { passage: p.id, items: items.map((it) => `${it.q} → ${it.a} ${it.right ? '✓' : '✗'}`) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const rows = [...document.querySelectorAll('[data-lcs-tf-item]')];
      if (rows.length < 3) fails.push(`${rows.length} questions`);
      const r = rows.filter((x) => x.dataset.lcsRight === '1').length;
      if (!r || r === rows.length) fails.push('every answer the same way');
      const root = document.querySelector('[data-lcs-true-false]').getBoundingClientRect();
      [document.querySelector('[data-lcs-passage]'), ...rows].forEach((x, i) => { const b = x.getBoundingClientRect(); if (b.right > root.right + 1 || b.bottom > root.bottom + 1) fails.push(`block ${i + 1} leaves the page`); });
      return fails;
    });
  },
};
