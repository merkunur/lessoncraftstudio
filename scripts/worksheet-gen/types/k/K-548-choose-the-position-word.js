/**
 * K-548 — Choose the Position Word (Position Words maker 2026-11-02, NEW-TEMPLATES §44 T3; K.G.A.1): a scene showing ONE
 * relation of a picture to a shape, the grammar engine's sentence with a gap, and three words to circle — the right one
 * and two the engine says fit the same sentence frame (prepDistractorLabels: frame-valid, never on top of against above).
 * Every word is a tap target; the right one is ringed on the key. A row whose frame gives fewer than two other words is
 * drawn with another shape.
 * Levels: 1 four rows (in, on top of, under, next to) · 2 five rows (+ above, between) · 3 six rows (+ behind, in front of).
 */
'use strict';
const P = require('../_shared/position-scenes.js');
const { positionItems, sentenceHtml, NO_PREP } = require('../_shared/position-items.js');
const A = require('../_shared/alphabet-more.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { rows: 4 }, 2: { rows: 5 }, 3: { rows: 6 } };

module.exports = {
  id: 'K-548',
  slug: 'choose-the-position-word',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'position-words',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Choose the Position Word', instruction: 'Look at each picture. Circle the word that fits in the sentence.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = A.loc2(locale);
    // a shape whose sentence frame gives two other words (frame-valid labels) — else another shape
    const items = positionItems({ locale: L, level: difficulty, rows: d.rows, rng, accept: (p, sh) => P.distractors(L, p, sh).length >= 2 });
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    const h = d.rows <= 4 ? 150 : d.rows === 5 ? 128 : 112;
    const rows = items.map((it) => {
      // the two other words: frame-valid labels of the level's position words where they exist, else any frame-valid one
      const levelWords = new Set((P.LEVEL_PREPS[difficulty] || []).filter((p) => !(NO_PREP[L] || []).includes(p)).map((p) => (P.sentence(L, p, it.shape) || {}).expected).filter(Boolean));
      // never a word of a relation the language leaves out (es / it / pt "above"), not even as a wrong option
      const dropped = new Set((NO_PREP[L] || []).map((p) => (P.sentence(L, p, it.shape) || {}).expected).filter(Boolean));
      const all = P.distractors(L, it.prep, it.shape).filter((w) => !dropped.has(w));
      const pick = [...rng.shuffle(all.filter((w) => levelWords.has(w))), ...rng.shuffle(all.filter((w) => !levelWords.has(w)))].slice(0, 2);
      if (pick.length < 2) throw new Error(`K-548: ${L} "${it.prep}" with a ${it.shape} has ${pick.length} other words`);
      const opts = rng.shuffle([it.sent.expected, ...pick]);
      const chips = opts.map((w) => `<span class="ws-chip" data-lcs-pos-chip="${w}"${mark && w === it.sent.expected ? ' data-lcs-correct="1"' : ''} style="width:auto;min-width:56px;height:46px;padding:0 16px;border-radius:23px;font:700 20px/1 'Baloo 2',cursive;color:${T.ink};white-space:nowrap">${w}</span>`).join('');
      return `<div data-lcs-choose-row="${it.prep}" style="display:flex;align-items:center;gap:14px;padding:4px 12px;border-radius:14px;background:${T.cream}">` +
        `${P.scene(it.prep, it.shape, it.src, { w: 220, h, s: Math.round(h * 0.5), o: Math.round(h * 0.4) })}` +
        `<div style="flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:8px"><div style="font:700 21px/1.4 'Baloo 2',cursive;color:${T.ink}">${sentenceHtml(it, `<span style="display:inline-block;width:80px;border-bottom:3px solid ${T.ink};margin:0 4px"></span>`, 34)}</div>` +
        `<div class="ws-choices" style="gap:10px;justify-content:flex-start;flex-wrap:wrap">${chips}</div></div></div>`;
    });
    return {
      bodyHtml: `<div data-ws-content data-lcs-choose style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:8px;min-height:0">${rows.join('')}</div>`,
      meta: { rows: items.map((it) => `${it.key} ${it.prep} ${it.shape}`), sentences: items.map((it) => it.sent.prefix.replace('{img}', `[${it.key}]`) + `<${it.sent.expected}>` + it.sent.suffix), answers: items.map((it) => it.sent.expected) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const rows = [...document.querySelectorAll('[data-lcs-choose-row]')];
      if (rows.length < 4) fails.push(`${rows.length} rows`);
      const root = document.querySelector('[data-lcs-choose]').getBoundingClientRect();
      rows.forEach((r, i) => {
        const chips = [...r.querySelectorAll('[data-lcs-pos-chip]')].map((c) => c.dataset.lcsPosChip);
        if (chips.length !== 3 || new Set(chips).size !== 3) fails.push(`row ${i + 1}: not three different words`);
        r.querySelectorAll('[data-lcs-pos-chip]').forEach((c) => { const b = c.getBoundingClientRect(); if (b.right > root.right + 1) fails.push(`row ${i + 1}: a word leaves the page`); });
        r.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push(`row ${i + 1}: a picture did not load`); });
      });
      return [...new Set(fails)];
    });
  },
};
