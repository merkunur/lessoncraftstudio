/**
 * K-547 — Where Is It? Write the Word (Position Words maker 2026-11-02, NEW-TEMPLATES §44 T2; K.G.A.1, production): a
 * scene showing ONE relation of a picture to a shape, and the grammar engine's sentence with a gap where the position
 * word goes (worksheet = prefix + box + suffix, key = prefix + expected + suffix — the Prepositions app's contract); the
 * level's position words are printed in a box at the top to copy from. Every gap is an answer box holding its words.
 * Levels: 1 four rows (in, on top of, under, next to) · 2 five rows (+ above, between) · 3 six rows (+ behind, in front of).
 */
'use strict';
const P = require('../_shared/position-scenes.js');
const { positionItems, sentenceHtml } = require('../_shared/position-items.js');
const slot = require('../../lib/slot.js');
const A = require('../_shared/alphabet-more.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { rows: 4 }, 2: { rows: 5 }, 3: { rows: 6 } };

module.exports = {
  id: 'K-547',
  slug: 'where-is-it-write',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'position-words',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Where Is It?', instruction: 'Look at each picture. Write the missing position word. The words in the box can help you.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], L = A.loc2(locale);
    const items = positionItems({ locale: L, level: difficulty, rows: d.rows, rng: ctx.rng, ctx });
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    // the word box: every position word of the level, as the engine prints it (one entry per label)
    const words = [...new Set(items.map((it) => it.sent.expected))].sort((a, b) => a.localeCompare(b, L));
    const h = d.rows <= 4 ? 140 : d.rows === 5 ? 118 : 100;
    const longest = Math.max(...words.map((w) => [...w].length));
    const gapW = Math.max(110, Math.round(longest * 15 + 30));
    const rows = items.map((it, ri) => `<div data-lcs-where-row="${it.prep}"${slot.attr(ctx, 'pic', ri)} style="display:flex;align-items:center;gap:14px;padding:4px 12px;border-radius:14px;background:${T.cream}">` +
      `${P.scene(it.prep, it.shape, it.src, { w: 230, h, s: Math.round(h * 0.5), o: Math.round(h * 0.4) })}` +
      `<div style="flex:1 1 auto;min-width:0;font:700 22px/1.5 'Baloo 2',cursive;color:${T.ink}">${sentenceHtml(it, `<span class="ws-answerbox"${mark ? ` data-lcs-answer="${it.sent.expected}"` : ''} style="display:inline-flex;vertical-align:middle;width:${gapW}px;height:40px;margin:0 4px;box-sizing:border-box;border:2.5px dashed ${T.coral};border-radius:10px;background:#FFFFFF"></span>`, 36)}</div></div>`);
    const box = `<div data-lcs-word-box style="display:flex;flex-wrap:wrap;justify-content:center;gap:10px 18px;padding:8px 14px;border:2.5px solid ${T.teal};border-radius:14px;flex:0 0 auto">` +
      words.map((w) => `<span style="font:700 22px/1.2 'Baloo 2',cursive;color:${T.teal}">${w}</span>`).join('') + `</div>`;
    return {
      bodyHtml: `<div data-ws-content data-lcs-where style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:8px;min-height:0">${box}${rows.join('')}</div>`,
      meta: { rows: items.map((it) => `${it.key} ${it.prep} ${it.shape}`), sentences: items.map((it) => it.sent.prefix.replace('{img}', `[${it.key}]`) + `<${it.sent.expected}>` + it.sent.suffix), answers: items.map((it) => it.sent.expected) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const rows = [...document.querySelectorAll('[data-lcs-where-row]')];
      if (rows.length < 4) fails.push(`${rows.length} rows`);
      const root = document.querySelector('[data-lcs-where]').getBoundingClientRect();
      rows.forEach((r, i) => { const b = r.getBoundingClientRect(); if (b.right > root.right + 1) fails.push(`row ${i + 1} leaves the page`); r.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push(`row ${i + 1}: a picture did not load`); }); });
      return fails;
    });
  },
};
