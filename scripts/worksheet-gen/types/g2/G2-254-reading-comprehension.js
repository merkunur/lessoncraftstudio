/**
 * G2-254 — Reading comprehension: a short native passage + 3 multiple-
 * choice questions (2 literal recall + 1 inference). The SEO panel's single
 * biggest catalog omission (pt "interpretação de texto", de "Lesetexte mit
 * Fragen", fr "lecture compréhension"). Passages are ORIGINAL per locale —
 * authored by native ensembles, never translated (data/literacy/
 * reading-passages.js). Correctness of content is curated + native-
 * reviewed; structure is machine-verified here.
 * d1/d2/d3 = short/medium/longer passage.
 */
'use strict';
const { READING_PASSAGES } = require('../../data/literacy/reading-passages.js');

const LETTERS = ['A', 'B', 'C'];

module.exports = {
  id: 'G2-254',
  slug: 'reading-comprehension',
  gradeBand: 'G2',
  assetClass: 'icon-placement',
  exerciseType: 'reading-comprehension',
  themeAxis: { applicable: false },
  difficulty: { 1: { idx: 0 }, 2: { idx: 1 }, 3: { idx: 2 } },
  i18n: {
    en: {
      title: 'Read and Answer',
      instruction: 'Read the story carefully. Then circle the best answer to each question.',
    },
  },

  build({ difficulty, locale }, ctx) {
    void ctx;
    const loc = (locale || 'en').slice(0, 2);
    const passages = READING_PASSAGES[loc];
    if (!passages || !passages[this.difficulty[difficulty].idx]) {
      // refuse-don't-guess: no native passage ⇒ the locale cannot ship
      throw new Error(`G2-254: no native passage for locale ${loc} at d${difficulty}`);
    }
    const p = passages[this.difficulty[difficulty].idx];

    const passageCard =
      `<div style="background:#FBF3E4;border:2px solid #F0E4CB;border-radius:14px;padding:20px 26px" data-lcs-passage="${p.id}">` +
      `<div style="font-family:'Baloo 2';font-weight:700;font-size:22px;color:#146B5E;margin-bottom:8px">${p.title}</div>` +
      `<p style="font-family:'Nunito';font-weight:600;font-size:18px;line-height:1.65;color:#3A3530" data-lcs-text>${p.text}</p>` +
      `</div>`;

    const questions = p.questions.map((q, qi) =>
      `<div class="ws-card-stage" style="flex-direction:column;align-items:flex-start;gap:10px;background:#FFFFFF;` +
      `border:2px solid #F0E4CB;border-radius:12px;padding:14px 18px" data-lcs-q="${qi}">` +
      `<div style="display:flex;gap:10px;align-items:baseline">` +
      `<span style="flex:0 0 auto;width:26px;height:26px;border-radius:50%;background:#146B5E;color:#FFFFFF;` +
      `display:inline-flex;align-items:center;justify-content:center;font-family:'Baloo 2';font-weight:700;font-size:15px">${qi + 1}</span>` +
      `<span style="font-family:'Nunito';font-weight:800;font-size:17px;color:#3A3530">${q.q}</span></div>` +
      `<div style="display:flex;gap:14px;flex-wrap:wrap;padding-left:36px">` +
      q.choices.map((c, ci) =>
        `<span style="display:inline-flex;align-items:center;gap:7px;background:#FFFFFF;border:2px solid #146B5E;` +
        `border-radius:18px;padding:5px 16px;font-family:'Nunito';font-weight:700;font-size:16px;color:#3A3530" ` +
        `data-lcs-choice="${ci}"${ci === q.correct ? ' data-lcs-correct="1"' : ''}>` +
        `<span style="font-family:'Baloo 2';font-weight:700;color:#F2784B">${LETTERS[ci]}</span>${c}</span>`
      ).join('') +
      `</div></div>`
    ).join('');

    return {
      bodyHtml:
        `<div data-ws-content style="flex:1;display:flex;flex-direction:column;gap:16px;justify-content:space-evenly;padding-top:4px">` +
        passageCard +
        `<div style="display:flex;flex-direction:column;gap:14px">${questions}</div>` +
        `</div>`,
      meta: { passage: p.id },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const passage = document.querySelector('[data-lcs-passage]');
      if (!passage) { fails.push('no passage'); return fails; }
      const text = passage.querySelector('[data-lcs-text]');
      if (!text || text.textContent.trim().length < 100) fails.push('passage too short');
      const qs = [...document.querySelectorAll('[data-lcs-q]')];
      if (qs.length !== 3) fails.push(`${qs.length} questions (want 3)`);
      qs.forEach((q, i) => {
        const choices = [...q.querySelectorAll('[data-lcs-choice]')];
        if (choices.length !== 3) fails.push(`q${i + 1}: ${choices.length} choices`);
        const correct = choices.filter((c) => c.hasAttribute('data-lcs-correct'));
        if (correct.length !== 1) fails.push(`q${i + 1}: ${correct.length} correct`);
        const texts = choices.map((c) => c.textContent.trim());
        if (new Set(texts).size !== texts.length) fails.push(`q${i + 1}: duplicate choices`);
      });
      return fails;
    });
  },
};
