/**
 * K-553 — Picture Sentences (rebus) (Sentences maker 2026-11-02, NEW-TEMPLATES §47 T3; RF.K.4 / L.K.1.f read emergent
 * text; the pre-reader sentence): each sentence printed with a picture where its noun stands — as many of the thing as
 * the sentence says (a numeral before the noun, else three for a plural, one for a singular or a Finnish object
 * partitive); the child writes the picture's word in the box, and at levels 2-3 writes the whole sentence on the line.
 * The sentences are the native bank's frames with a picture noun of the theme (data/b2/sentences.js, the G1-249
 * rules), and the word to write is the form the sentence needs (de Hunde, fi kissaa) — the bank's own literal. The box
 * is an answer box; the key also prints the sentence on its line.
 * Levels: 1 four sentences, the word · 2 four sentences, the word and the sentence · 3 five sentences, the word and the
 * sentence.
 */
'use strict';
const slot = require('../../lib/slot.js');
const { frameSentences } = require('../_shared/sentence-items.js');
const { writingRow } = require('../../primitives/trace-path.js');
const { seatOnRow } = require('../../lib/key-on-row.js');
const A = require('../_shared/alphabet-more.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { n: 4, line: false, px: 54 }, 2: { n: 4, line: true, px: 44 }, 3: { n: 5, line: true, px: 38 } };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

module.exports = {
  id: 'K-553',
  slug: 'rebus-sentences',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'sentence-building',
  themeAxis: { applicable: true, minNouns: 6, excludeBw: true },
  difficulty: D,
  i18n: { en: { title: 'Picture Sentences', instruction: 'Read each sentence. Write the word for the picture in the box.' } },

  build({ theme, difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = A.loc2(locale);
    const items = frameSentences({ locale: L, theme, rng, n: d.n, maxTokens: 8, ctx });
    const mark = !!(ctx && (ctx.answerKey || ctx.screen)), key = !!(ctx && ctx.answerKey);
    const rows = items.map((it, i) => {
      const at = it.canonical.indexOf(it.noun);
      if (at < 0) throw new Error(`K-553: ${L} the noun "${it.noun}" is not in "${it.canonical}"`);
      const pics = `<span data-lcs-rebus-pics="${it.count}" style="display:inline-flex;gap:2px;vertical-align:middle;margin:0 4px">${Array.from({ length: Math.min(it.count, 5) }, () => `<img class="ws-icon" src="${it.src}" alt="" style="width:${d.px}px;height:${d.px}px;object-fit:contain">`).join('')}</span>`;
      const sentence = `<div style="font:700 26px/1.7 'Baloo 2',cursive;color:${T.ink}">${esc(it.canonical.slice(0, at))}${pics}${esc(it.canonical.slice(at + it.noun.length))}</div>`;
      const box = `<span class="ws-answerbox"${mark ? ` data-lcs-answer="${esc(it.noun)}"` : ''} style="display:inline-flex;flex:0 0 auto;width:${Math.min(230, Math.max(140, [...it.noun].length * 16 + 30))}px;height:46px;box-sizing:border-box;border:2.5px dashed ${T.coral};border-radius:10px;background:#FFFFFF"></span>`;
      const row = writingRow({ w: 640, h: 56, glyphH: 28, xHeight: true }).svg;
      const line = d.line ? `<div>${key ? seatOnRow(row, it.canonical, { fill: T.teal }) : row}</div>` : '';
      return `<div data-lcs-rebus-row="${i + 1}"${slot.attr(ctx, 'pic', i)} style="display:flex;flex-direction:column;gap:4px;padding:6px 12px;border-radius:14px;background:${T.cream}">` +
        `<div style="display:flex;align-items:center;justify-content:space-between;gap:14px">${sentence}${box}</div>${line}</div>`;
    });
    return {
      bodyHtml: `<div data-ws-content data-lcs-rebus style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:8px;min-height:0">${rows.join('')}</div>`,
      meta: { sentences: items.map((it) => `${it.canonical} (${it.count}× ${it.entry.vocabKey})`) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const rows = [...document.querySelectorAll('[data-lcs-rebus-row]')];
      if (rows.length < 4) fails.push(`${rows.length} sentences`);
      const root = document.querySelector('[data-lcs-rebus]').getBoundingClientRect();
      rows.forEach((r, i) => {
        const b = r.getBoundingClientRect(); if (b.right > root.right + 1 || b.bottom > root.bottom + 1) fails.push(`sentence ${i + 1} leaves the page`);
        r.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push(`sentence ${i + 1}: a picture did not load`); });
      });
      return fails;
    });
  },
};
