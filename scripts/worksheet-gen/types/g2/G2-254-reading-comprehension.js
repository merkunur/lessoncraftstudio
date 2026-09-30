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
const { poolOf, levelData } = require('../../data/literacy/reading-passages-levels.js');
const RC_SCREEN = require('../../lib/reading-comprehension-screen.js');
const { writingRow } = require('../../primitives/trace-path.js');
// the MEASURED size tier of each (locale, story, level): tools/level-set/rc-fit-tiers.js renders every page at each tier
// and keeps the largest that fits the page box (the estimate below is only the fallback for an unmeasured page)
const RC_FIT = (() => { try { return require('../../data/literacy/rc-levels/fit.json'); } catch (e) { return {}; } })();

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

  /**
   * Level Set 2026-09-30: a copy (ctx.seedVariant) reads the page's native POOL (data/literacy/reading-passages-levels.js).
   * The same story serves every level; the level changes the questions:
   *   1  numbered sentences + 3 LITERAL questions, each with a "Sentence N" chip
   *   2  the core set (as published: 3 multiple-choice questions)
   *   3  2 INFERENCE questions + 1 write-in question on two writing rows
   * Level 2 copy k = pool[k] (pool[0] is the published page itself); levels 1 and 3 copy k = pool[k-1].
   * The published page (no seedVariant) never reaches this path.
   */
  _storyFor(difficulty, loc, sv) {
    const pool = poolOf(this.id, loc);
    const s = pool[difficulty === 2 ? sv : sv - 1];
    if (!s) throw new Error(`${this.id}: ${loc} has no pool story ${sv} at level ${difficulty}`);
    return s;
  },

  _buildLevel(difficulty, loc, sv, forceTier) {
    const L = levelData(loc);
    const p = this._storyFor(difficulty, loc, sv);
    const numbered = difficulty !== 2;
    const questions = difficulty === 1
      ? p.l1.map((q) => ({ kind: 'literal', q: q.q, choices: q.choices, correct: q.correct, hint: q.sentence }))
      : difficulty === 3
        ? [...p.l3.mc.map((q) => ({ kind: 'inference', q: q.q, choices: q.choices, correct: q.correct })),
          { kind: 'write', q: p.l3.write.q, model: p.l3.write.model, evidence: p.l3.write.evidence }]
        : p.core.map((q) => ({ kind: 'core', q: q.q, choices: q.choices, correct: q.correct }));
    // size tiers by story length (the level-3 page carries two writing rows, so it counts ~110 characters longer);
    // measured by the probe's overflow/footer lints, never guessed per story
    const eff = p.text.length + (difficulty === 3 ? 110 : difficulty === 1 ? 30 : 0);
    const measured = RC_FIT[loc + '|' + p.id + '|' + difficulty];
    const tier = forceTier != null ? forceTier : measured != null ? measured : eff <= 330 ? 0 : eff <= 430 ? 1 : eff <= 540 ? 2 : 3;
    const long = tier >= 1;
    const px = [18, 17, 16, 15][tier];
    const cardPad = tier >= 3 ? '8px 14px' : tier >= 2 ? '10px 16px' : '14px 18px';
    const tight = tier >= 3;   // the longest stories: every gap one step smaller
    const textHtml = numbered
      ? p.sentences.map((t, i) => `<span data-lcs-sn="${i + 1}" style="font-family:'Baloo 2';font-weight:700;font-size:${px - 3}px;color:#146B5E;vertical-align:super;line-height:0;margin-right:2px">${i + 1}</span><span data-lcs-s="${i + 1}">${t}</span>`).join(' ')
      : p.text;
    const passageCard =
      `<div style="background:#FBF3E4;border:2px solid #F0E4CB;border-radius:14px;padding:${tight ? '12px 22px' : long ? '16px 24px' : '20px 26px'}" data-lcs-passage="${p.id}">` +
      `<div style="font-family:'Baloo 2';font-weight:700;font-size:22px;color:#146B5E;margin-bottom:8px">${p.title}</div>` +
      `<p style="font-family:'Nunito';font-weight:600;font-size:${px}px;line-height:${[1.65, 1.58, 1.5, 1.45][tier]};color:#3A3530" data-lcs-text>${textHtml}</p>` +
      `</div>`;
    const badge = (qi) => `<span style="flex:0 0 auto;width:26px;height:26px;border-radius:50%;background:#146B5E;color:#FFFFFF;` +
      `display:inline-flex;align-items:center;justify-content:center;font-family:'Baloo 2';font-weight:700;font-size:15px">${qi + 1}</span>`;
    const cards = questions.map((q, qi) => {
      const head = `<div style="display:flex;gap:10px;align-items:baseline;flex-wrap:wrap">${badge(qi)}` +
        `<span style="font-family:'Nunito';font-weight:800;font-size:17px;color:#3A3530">${q.q}</span>` +
        (q.hint ? `<span data-lcs-hint="${q.hint}" style="font-family:'Nunito';font-weight:800;font-size:14px;color:#146B5E;background:#E3F1EE;border-radius:10px;padding:2px 10px;white-space:nowrap">${L.sentenceChip.replace('{n}', q.hint)}</span>` : '') +
        `</div>`;
      const open = `<div class="ws-card-stage" style="flex-direction:column;align-items:flex-start;gap:${tight ? 6 : 10}px;background:#FFFFFF;` +
        `border:2px solid #F0E4CB;border-radius:12px;padding:${cardPad}" data-lcs-q="${qi}"${q.kind === 'write' ? ' data-lcs-write="1"' : ''}>`;
      if (q.kind === 'write') {
        const row = () => writingRow({ w: 560, h: tight ? 40 : 46, glyphH: tight ? 21 : 24 }).svg;
        return open + head + `<div style="display:flex;flex-direction:column;gap:4px;padding-left:36px" data-lcs-wlines>${row()}${row()}</div></div>`;
      }
      return open + head + `<div style="display:flex;gap:14px;flex-wrap:wrap;padding-left:36px">` +
        q.choices.map((c, ci) =>
          `<span style="display:inline-flex;align-items:center;gap:7px;background:#FFFFFF;border:2px solid #146B5E;` +
          `border-radius:18px;padding:5px 16px;font-family:'Nunito';font-weight:700;font-size:16px;color:#3A3530" ` +
          `data-lcs-choice="${ci}"${ci === q.correct ? ' data-lcs-correct="1"' : ''}>` +
          `<span style="font-family:'Baloo 2';font-weight:700;color:#F2784B">${LETTERS[ci]}</span>${c}</span>`
        ).join('') + `</div></div>`;
    }).join('');
    return {
      bodyHtml:
        `<div data-ws-content style="flex:1;display:flex;flex-direction:column;gap:${tight ? 10 : 16}px;justify-content:space-evenly;padding-top:4px">` +
        passageCard + `<div style="display:flex;flex-direction:column;gap:${tight ? 8 : 14}px">${cards}</div></div>`,
      meta: { passage: p.id, level: difficulty, questions },
    };
  },

  /** A copy with a new story on a face prints that story's own title (the face titles name their story). */
  copyStrings(strings, { locale, difficulty, seedVariant }) {
    if (!seedVariant) return strings;
    const s = this._storyFor(difficulty, (locale || 'en').slice(0, 2), seedVariant);
    return s.pageTitle ? { ...strings, title: s.pageTitle } : strings;
  },

  interactive: {
    kind: 'tap-choice', item: '[data-lcs-item]', option: '[data-lcs-opt]',
    metaAttrs: ['data-lcs-story', 'data-lcs-qkind', 'data-lcs-question', 'data-lcs-hint'], instructionKey: 'mc', screenHeight: 3200,
    oracle: (items, l) => RC_SCREEN.oracle(items, l),
  },

  build({ difficulty, locale }, ctx) {
    if (ctx && ctx.seedVariant) {
      const lloc = (locale || 'en').slice(0, 2);
      const built = this._buildLevel(difficulty, lloc, ctx.seedVariant, ctx.forceTier);
      if (this.interactive && (ctx.interactive || ctx.answerKey)) return RC_SCREEN.screenOrKey(built, ctx, lloc, levelData(lloc));
      return built;
    }
    void ctx;
    const loc = (locale || 'en').slice(0, 2);
    const passages = READING_PASSAGES[loc];
    if (!passages || !passages[this.difficulty[difficulty].idx]) {
      // refuse-don't-guess: no native passage ⇒ the locale cannot ship
      throw new Error(`G2-254: no native passage for locale ${loc} at d${difficulty}`);
    }
    const p = passages[this.difficulty[difficulty].idx];

    // long stories (the nt20-VAR pages 3-7 in wordy locales) drop a font
    // step so the passage + 3 questions stay inside the page box; every
    // published passage (idx 0-2 at ≤400 chars... pt story texts run longer)
    // keeps the original metrics
    const long = p.text.length > 400;
    const passageCard =
      `<div style="background:#FBF3E4;border:2px solid #F0E4CB;border-radius:14px;padding:${long ? '16px 24px' : '20px 26px'}" data-lcs-passage="${p.id}">` +
      `<div style="font-family:'Baloo 2';font-weight:700;font-size:22px;color:#146B5E;margin-bottom:8px">${p.title}</div>` +
      `<p style="font-family:'Nunito';font-weight:600;font-size:${long ? 16 : 18}px;line-height:${long ? 1.55 : 1.65};color:#3A3530" data-lcs-text>${p.text}</p>` +
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
        if (q.hasAttribute('data-lcs-write')) {
          if (q.querySelectorAll('svg[data-lcs-prim="writing-row"]').length !== 2) fails.push(`q${i + 1}: write-in without 2 writing rows`);
          return;
        }
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
