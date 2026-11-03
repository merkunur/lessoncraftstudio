/**
 * G1-513 — Write a Story for the Number Sentence (Word Problems maker 2026-11-02, NEW-TEMPLATES §50 T4; 1.OA.A.1 /
 * 2.OA.A.1 represent, in production; sv "egna räknehändelser", de "Rechengeschichten erfinden", no "lage
 * regnefortellinger"): a number sentence with its answer and a picture of something to count, and lines; the child
 * writes a story that fits. Open writing: no answer key, no screen. The pictures are the Word Problems engine's reviewed
 * nouns (lib/word-problems-levelset.js nounsFor: things a child can have, give or put in a box).
 * Levels: 1 two addition sentences within 10 · 2 an addition and a subtraction within 20 · 3 three sentences within 20.
 */
'use strict';
const W = require('../../lib/word-problems-levelset.js');
const WF = require('../_shared/writing-frames.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { kinds: ['add', 'add'], max: 10, iconMax: 10, lines: 3 }, 2: { kinds: ['add', 'sub'], max: 20, iconMax: 20, lines: 3 }, 3: { kinds: ['add', 'sub', 'add'], max: 20, iconMax: 20, lines: 2 } };
const MINUS = '−';

module.exports = {
  id: 'G1-513',
  slug: 'write-a-story-for-the-number-sentence',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'word-problems',
  themeAxis: { applicable: true, minNouns: 3, excludeBw: true },
  difficulty: D,
  i18n: { en: { title: 'Write a Story for the Number Sentence', instruction: 'Look at each number sentence. Write a story that fits it. You can tell it about the picture.' } },

  build({ theme, difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = String(locale || 'en').slice(0, 2);
    const pool = W.nounsFor(theme, L);
    if (pool.length < d.kinds.length) throw new Error(`G1-513: theme ${theme}/${L} has ${pool.length} nouns (< ${d.kinds.length})`);
    const nouns = rng.sample(pool, d.kinds.length), eqs = [], results = new Set();
    const blocks = d.kinds.map((kind, i) => {
      let nums = null, g = 0;
      // never the same number sentence twice on a page, and a different result for each (review 2026-11-02)
      do { nums = W.drawG1(kind, d, rng); g++; } while ((!nums || results.has(nums.answer)) && g < 400);
      if (!nums || results.has(nums.answer)) throw new Error('G1-513: no different number sentence');
      results.add(nums.answer);
      const eq = kind === 'add' ? `${nums.n1} + ${nums.n2} = ${nums.answer}` : `${nums.n1} ${MINUS} ${nums.n2} = ${nums.answer}`;
      eqs.push(eq);
      return `<div data-lcs-own-story="${i + 1}" style="display:flex;flex-direction:column;gap:6px;padding:10px 14px;border-radius:16px;background:${T.cream}">` +
        `<div style="display:flex;align-items:center;gap:18px"><span style="padding:6px 18px;border:3px solid ${T.teal};border-radius:14px;background:#FFFFFF;font:700 34px/1.1 'Baloo 2',cursive;color:${T.ink}">${eq}</span>` +
        `${W.iconImg(theme, nouns[i].noun, 58)}</div>${WF.lines(d.lines, 640, 48)}</div>`;
    });
    return {
      bodyHtml: `<div data-ws-content data-lcs-own-stories style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:12px;min-height:0">${blocks.join('')}</div>`,
      meta: { kinds: d.kinds, eqs, nouns: nouns.map((n) => n.vocabKey) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const bs = [...document.querySelectorAll('[data-lcs-own-story]')];
      if (bs.length < 2) fails.push(`${bs.length} number sentences`);
      const root = document.querySelector('[data-lcs-own-stories]').getBoundingClientRect();
      bs.forEach((b, i) => { const r = b.getBoundingClientRect(); if (r.right > root.right + 1 || r.bottom > root.bottom + 1) fails.push(`block ${i + 1} leaves the page`); });
      return fails;
    });
  },
};
