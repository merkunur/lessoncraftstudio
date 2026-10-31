/**
 * K-439 — Sight Word: Rainbow Writing (maker template, 2026-10-31). One sight word per page:
 *   big dashed copies of the word, each with three crayon dots — the child traces the same word three times over, once
 *   in each colour (the classroom "rainbow writing" routine: many repetitions of one word that do not feel like
 *   repetition); then writes it alone on empty lines.
 *   level 1: 3 rainbow rows   level 2: 3 rainbow rows + 1 write row   level 3: 2 rainbow rows + 2 write rows
 * The dots use the crayon colours of the library (tokens.codeColors); no colour is named in text (no per-locale words).
 */
'use strict';
const P = require('../_shared/sight-word-pages.js');
const { SW } = P;
const tokens = require('../../primitives/_tokens.js');
const { strokeWordLane, writingRow } = require('../../primitives/trace-path.js');

const CRAYONS = [tokens.codeColors.codeRed, tokens.codeColors.codeBlue, tokens.codeColors.codeGreen];

module.exports = {
  id: 'K-439',
  slug: 'sight-word-rainbow-write',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'sight-words',
  themeAxis: { applicable: false },
  unitAxis: SW.unitAxis,
  difficulty: {
    1: { rainbow: 3, write: 0, laneH: 150, glyphH: 104 },
    2: { rainbow: 3, write: 1, laneH: 124, glyphH: 84 },
    3: { rainbow: 2, write: 2, laneH: 120, glyphH: 80 },
  },
  i18n: { en: { title: 'Rainbow Writing: {UNIT}', instruction: 'Trace each word three times, with a different color each time. Then write it.' } },

  build({ difficulty, locale, unit }, ctx) {
    const d = this.difficulty[difficulty];
    const loc = (locale || 'en').slice(0, 2);
    const word = SW.wordOf(unit || SW.unitAxis.exemplar(loc), loc);
    const dots = `<span data-lcs-crayons style="display:flex;flex-direction:column;gap:8px">${CRAYONS.map((c) => `<span data-lcs-crayon="${c}" style="display:block;width:26px;height:26px;border-radius:50%;background:${c};border:2px solid ${P.INK}"></span>`).join('')}</span>`;
    const parts = [
      `<div style="display:flex;justify-content:center"><div data-lcs-frame>${SW.wordBox(word, 80)}</div></div>`,
      SW.sectionLabel(SW.label('rainbow', loc)),
    ];
    for (let i = 0; i < d.rainbow; i++) {
      parts.push(`<div data-lcs-rainbow-row style="display:flex;align-items:center;gap:16px">${dots}${strokeWordLane({ text: word, w: 610, h: d.laneH, glyphH: d.glyphH, reps: 1, stack: true, modelless: true, align: 'center' }).svg}</div>`);
    }
    if (d.write) {
      parts.push(SW.sectionLabel(SW.label('write', loc)));
      for (let i = 0; i < d.write; i++) parts.push(`<div data-lcs-own>${writingRow({ w: 660, h: d.laneH - 20, glyphH: d.glyphH - 16, xHeight: true }).svg}</div>`);
    }
    return {
      bodyHtml: `<div data-ws-content data-lcs-sightword="${P.esc(word)}" style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:8px">${parts.join('')}</div>`,
      meta: { word },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-lcs-sightword]');
      if (!root) return ['no sight-word root'];
      const word = root.dataset.lcsSightword;
      const rows = [...document.querySelectorAll('[data-lcs-rainbow-row]')];
      if (rows.length < 2) fails.push(`only ${rows.length} rainbow rows`);
      rows.forEach((r, i) => {
        const lane = r.querySelector('[data-lcs-prim="trace-word"]');
        if (!lane || lane.dataset.lcsText !== word) fails.push(`row ${i + 1} traces something else`);
        const c = new Set([...r.querySelectorAll('[data-lcs-crayon]')].map((x) => x.dataset.lcsCrayon));
        if (c.size !== 3) fails.push(`row ${i + 1}: ${c.size} crayon colours, not 3`);
      });
      return fails;
    });
  },
};
