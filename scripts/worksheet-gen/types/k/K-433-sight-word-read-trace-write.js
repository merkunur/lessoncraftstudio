/**
 * K-433 — Sight Word: Read, Trace, Write (maker template, 2026-10-31). One sight word per page (unit axis):
 *   a three-column table — READ (the word solid) · TRACE (the word dashed) · WRITE (an empty school line) — repeated
 *   on 3 / 3 / 2 rows, then the word written into bank sentences (2 / 3 / 3), and at level 3 a sentence of the child's own.
 * Sentences: data/literacy/sight-levelset/<loc>.txt (the word exactly once; validated + native-reviewed).
 */
'use strict';
const P = require('../_shared/sight-word-pages.js');
const { SW } = P;
const { strokeWordLane, writingRow } = require('../../primitives/trace-path.js');

const COL = [180, 230, 230];

module.exports = {
  id: 'K-433',
  slug: 'sight-word-read-trace-write',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'sight-words',
  themeAxis: { applicable: false },
  unitAxis: SW.unitAxis,
  difficulty: {
    1: { rows: 3, rowH: 118, glyphH: 72, sentences: 2, own: false, initial: 'prefer', sentPx: 26 },
    2: { rows: 3, rowH: 106, glyphH: 64, sentences: 3, own: false, initial: 'prefer', sentPx: 24 },
    3: { rows: 2, rowH: 104, glyphH: 62, sentences: 3, own: true, initial: 'any', sentPx: 24 },
  },
  i18n: { en: { title: 'Read, Trace, Write: {UNIT}', instruction: 'Read the word. Trace it. Write it. Then write it in each sentence.' } },

  build({ difficulty, locale, unit }, ctx) {
    const d = this.difficulty[difficulty];
    const loc = (locale || 'en').slice(0, 2);
    const word = SW.wordOf(unit || SW.unitAxis.exemplar(loc), loc);
    const sents = SW.pickSentences(word, loc, { n: d.sentences, level: difficulty, rng: ctx.rng, initial: d.initial, accept: (s) => SW.blankable(s, word) });
    const head = (key, w) => `<div style="width:${w}px;text-align:center;font-family:${P.FONT_B};font-weight:800;font-size:17px;color:${P.TEAL};padding:6px 0;border-bottom:2px solid ${P.GRID}">${P.esc(SW.label(key, loc))}</div>`;
    const cell = (html, w, last) => `<div style="width:${w}px;display:flex;align-items:center;justify-content:center;${last ? '' : `border-right:2px solid ${P.GRID};`}padding:4px 0">${html}</div>`;
    const solidPx = P.fitFont(word, COL[0] - 24, { floor: 26, ceil: d.glyphH + 8 });
    const rows = [];
    for (let i = 0; i < d.rows; i++) {
      rows.push(`<div data-lcs-rtw-row style="display:flex;${i < d.rows - 1 ? `border-bottom:2px solid ${P.GRID}` : ''}">` +
        cell(`<span data-lcs-rtw-read style="font-family:${P.FONT_D};font-weight:700;font-size:${solidPx}px;color:${P.INK};line-height:1">${P.esc(word)}</span>`, COL[0]) +
        cell(strokeWordLane({ text: word, w: COL[1] - 10, h: d.rowH, glyphH: d.glyphH, reps: 1, stack: true, modelless: true, align: 'center', padLeft: 6 }).svg, COL[1]) +
        cell(writingRow({ w: COL[2] - 14, h: d.rowH, glyphH: d.glyphH, xHeight: true }).svg, COL[2], true) +
        `</div>`);
    }
    const table = `<div data-lcs-rtw style="border:2.5px solid ${P.INK};border-radius:14px;overflow:hidden;align-self:center">` +
      `<div style="display:flex;background:${'#FBF3E4'}">${head('colRead', COL[0])}${head('colTrace', COL[1])}${head('colWrite', COL[2])}</div>` +
      rows.join('') + `</div>`;
    const parts = [
      `<div style="display:flex;justify-content:center"><div data-lcs-frame>${SW.wordBox(word, 80)}</div></div>`,
      table,
      SW.sectionLabel(SW.label('complete', loc)),
    ];
    if (sents.some((s) => SW.startsSentence(s, word))) parts.push(`<div data-lcs-capital style="font-family:${P.FONT_B};font-size:14px;font-style:italic;margin:-2px 0 2px">${P.esc(SW.label('capital', loc))}</div>`);
    for (const s of sents) parts.push(SW.blankSentence(s, word, { fontPx: d.sentPx }));
    if (d.own) parts.push(SW.sectionLabel(SW.label('own', loc)), `<div data-lcs-own>${writingRow({ w: 660, h: 84, glyphH: 48, xHeight: true }).svg}</div>`);
    return {
      bodyHtml: `<div data-ws-content data-lcs-sightword="${P.esc(word)}" style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:8px">${parts.join('')}</div>`,
      meta: { word, sentences: sents },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-lcs-sightword]');
      if (!root) return ['no sight-word root'];
      const word = root.dataset.lcsSightword;
      const rows = [...document.querySelectorAll('[data-lcs-rtw-row]')];
      if (rows.length < 2) fails.push(`only ${rows.length} table rows`);
      rows.forEach((r, i) => {
        if ((r.querySelector('[data-lcs-rtw-read]') || {}).textContent !== word) fails.push(`row ${i + 1}: READ cell is not the word`);
        const lane = r.querySelector('[data-lcs-prim="trace-word"]');
        if (!lane || lane.dataset.lcsText !== word) fails.push(`row ${i + 1}: TRACE cell traces something else`);
        if (!r.querySelector('[data-lcs-prim="writing-row"]')) fails.push(`row ${i + 1}: no WRITE line`);
      });
      const esc = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp('(?<!\\p{L})' + esc + '(?!\\p{L})', 'iu');
      const sents = [...document.querySelectorAll('[data-lcs-sentence]')];
      if (sents.length < 2) fails.push('fewer than 2 sentences');
      sents.forEach((p, i) => {
        if (re.test(p.textContent)) fails.push(`sentence ${i + 1} still prints the word`);
        if (p.dataset.lcsAnswer.toLocaleLowerCase() !== word.toLocaleLowerCase()) fails.push(`sentence ${i + 1} answer "${p.dataset.lcsAnswer}"`);
        if (p.querySelectorAll('[data-lcs-gap]').length !== 1) fails.push(`sentence ${i + 1}: gaps ≠ 1`);
      });
      if (sents.some((p) => p.dataset.lcsInitial === '1') !== !!document.querySelector('[data-lcs-capital]')) fails.push('capital reminder present iff a sentence-initial blank');
      return fails;
    });
  },
};
