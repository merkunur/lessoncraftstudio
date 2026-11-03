/**
 * G1-506 — Story Map (Stories & Writing maker 2026-11-02, NEW-TEMPLATES §49 T1; W.1.3 / W.2.3 a narrative with a
 * sequence of events; de "Erzählplan", fr "schéma narratif"): boxes for the beginning, the middle and the end of a story
 * (level 3 adds the problem), each with its question as a prompt, a box to draw in and lines to write on; the child
 * plans a story or retells one. The box names and prompts are literals per locale (data/writing/stories-new.js STORY).
 * Open writing: no answer key, no screen.
 * Levels: 1 beginning · middle · end, 2 lines each · 2 the same, 3 lines each · 3 beginning · problem · middle · end,
 * 2 lines each.
 */
'use strict';
const { STORY } = require('../../data/writing/stories-new.js');
const W = require('../_shared/writing-frames.js');
const A = require('../_shared/alphabet-more.js');
const T = require('../../primitives/_tokens.js').color;

const D = {
  1: { parts: ['beginning', 'middle', 'end'], lines: 2, draw: 150 },
  2: { parts: ['beginning', 'middle', 'end'], lines: 3, draw: 150 },
  3: { parts: ['beginning', 'problem', 'middle', 'end'], lines: 2, draw: 120 },
};
const PROMPT = { beginning: 'pBeginning', middle: 'pMiddle', end: 'pEnd', problem: 'pProblem' };

module.exports = {
  id: 'G1-506',
  slug: 'story-map',
  gradeBand: 'G1',
  assetClass: 'none',
  exerciseType: 'story-writing',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Story Map', instruction: 'Plan your story. Draw and write what happens at the beginning, in the middle and at the end.' } },

  build({ difficulty, locale }) {
    const d = D[difficulty] || D[2], L = A.loc2(locale);
    const t = STORY[L];
    if (!t) throw new Error(`G1-506: no story-map words for ${L}`);
    const boxes = d.parts.map((k, i) => `<div data-lcs-story-part="${k}" style="display:flex;flex-direction:column;gap:6px;padding:8px 14px;border-radius:16px;background:${T.cream}">` +
      `<div style="display:flex;align-items:baseline;gap:12px;flex-wrap:wrap"><span style="min-width:30px;height:30px;border-radius:15px;background:${T.teal};color:#FFFFFF;font:700 18px/30px 'Baloo 2',cursive;text-align:center">${i + 1}</span>` +
      `<span style="font:700 26px/1.1 'Baloo 2',cursive;color:${T.teal}">${t[k]}</span><span style="font:600 18px/1.2 'Nunito',sans-serif;color:${T.ink}">${W.esc(t[PROMPT[k]])}</span></div>` +
      `<div style="display:flex;gap:14px;align-items:center">${W.drawBox(d.draw, d.lines * 46)}<div style="flex:1;min-width:0">${W.lines(d.lines, 450, 46)}</div></div></div>`);
    return {
      bodyHtml: `<div data-ws-content data-lcs-story-map style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:10px;min-height:0">${boxes.join('')}</div>`,
      meta: { parts: d.parts },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const ps = [...document.querySelectorAll('[data-lcs-story-part]')];
      if (ps.length < 3) fails.push(`${ps.length} parts`);
      const root = document.querySelector('[data-lcs-story-map]').getBoundingClientRect();
      ps.forEach((p, i) => { const b = p.getBoundingClientRect(); if (b.right > root.right + 1 || b.bottom > root.bottom + 1) fails.push(`part ${i + 1} leaves the page`); });
      return fails;
    });
  },
};
