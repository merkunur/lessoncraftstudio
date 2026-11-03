/**
 * G1-510 — Write a Postcard (Stories & Writing maker 2026-11-02, NEW-TEMPLATES §49 T5; W.1.3 / W.2.3 with the letter
 * form; de "Brief schreiben", fr "écrire une carte postale"): the back of a postcard — the greeting printed with a gap
 * for the name, lines for the message, the closing with a line for the child's name, a stamp box and the address lines;
 * level 3 is a letter on the whole page. The greeting and closing are the informal forms a child writes to family,
 * literals per locale (data/writing/stories-new.js POSTCARD). Open writing: no answer key, no screen.
 * Levels: 1 a postcard, three lines · 2 a postcard, five lines · 3 a letter, eight lines.
 */
'use strict';
const { POSTCARD } = require('../../data/writing/stories-new.js');
const W = require('../_shared/writing-frames.js');
const A = require('../_shared/alphabet-more.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { lines: 3, card: true }, 2: { lines: 5, card: true }, 3: { lines: 8, card: false } };

module.exports = {
  id: 'G1-510',
  slug: 'write-a-postcard',
  gradeBand: 'G1',
  assetClass: 'none',
  exerciseType: 'story-writing',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Write a Postcard', instruction: 'Write a postcard to someone you love. Write their name after the greeting and your name at the end.' } },

  build({ difficulty, locale }) {
    const d = D[difficulty] || D[2], L = A.loc2(locale);
    const p = POSTCARD[L];
    if (!p) throw new Error(`G1-510: no postcard words for ${L}`);
    const msgW = d.card ? 380 : 640;
    const message = `<div data-lcs-message style="display:flex;flex-direction:column;gap:6px;flex:1;min-width:0">` +
      W.starter(p.greeting, { font: 24, blank: 140 }) + W.lines(d.lines, msgW, 48) +
      `<div style="display:flex;flex-direction:column;align-items:flex-end;gap:2px;margin-top:6px"><span style="font:700 24px/1.2 'Baloo 2',cursive;color:${T.ink}">${W.esc(p.closing)}</span>${W.line(200, 46)}</div></div>`;
    const right = d.card ? `<div style="flex:0 0 220px;display:flex;flex-direction:column;justify-content:space-between;padding-left:16px;border-left:2.5px solid ${T.grid}">` +
      `<div style="align-self:flex-end;width:78px;height:92px;box-sizing:border-box;border:2.5px dashed ${T.coral};border-radius:6px"></div>` +
      `<div data-lcs-address style="display:flex;flex-direction:column;gap:8px">${W.lines(3, 200, 44)}</div></div>` : '';
    return {
      bodyHtml: `<div data-ws-content data-lcs-postcard style="flex:1;display:flex;align-items:center;justify-content:center;min-height:0">` +
        `<div style="display:flex;width:100%;${d.card ? 'min-height:440px;' : 'min-height:640px;'}box-sizing:border-box;padding:20px;border:3px solid ${T.teal};border-radius:${d.card ? 8 : 14}px;background:#FFFFFF">${message}${right}</div></div>`,
      meta: { form: d.card ? 'postcard' : 'letter', lines: d.lines },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-lcs-postcard]').getBoundingClientRect();
      const card = document.querySelector('[data-lcs-postcard] > div').getBoundingClientRect();
      if (card.right > root.right + 1 || card.bottom > root.bottom + 1) fails.push('the card leaves the page');
      return fails;
    });
  },
};
