/**
 * K-523 — Trace Your Name (Letter Tracing maker 2026-11-02, NEW-TEMPLATES §33 T1; L.K.1.a print letters): a child's name
 * on school lines — once solid to look at, then dashed to trace, then empty lines to write it alone. The teacher types the
 * name (a free-text slot, 1-12 letters as typed: capital first, the rest small — never case-folded); until she does, the
 * page shows a common first name of the language. Every letter is drawn from the platform's centreline letterforms
 * (data/tracing/letter-strokes.js — the same school letters as every letter-tracing page, accents included); a name with
 * a character the table cannot draw is refused (the page keeps its name and the maker says it does not fit) — never a
 * blank or a substituted letter. Words, not single letters: no start dots or arrows (a dot per letter is clutter — the
 * word-tracing lanes' rule).
 * Levels: 1 big — the name once to look at, twice to trace, one line to write · 2 three to trace, two to write · 3 small
 * — two to trace, five to write.
 */
'use strict';
const { strokeWordLane } = require('../../primitives/trace-path.js');
const LS = require('../../data/tracing/letter-strokes.js');
const slot = require('../../lib/slot.js');

const NAMES = { en: 'Mia', de: 'Lena', fr: 'Léo', es: 'Sofía', pt: 'Ana', it: 'Luca', nl: 'Emma', sv: 'Elsa', da: 'Ida', no: 'Nora', fi: 'Aino' };
const D = {
  1: { glyphH: 84, laneH: 128, trace: 2, empty: 1 },
  2: { glyphH: 64, laneH: 98, trace: 3, empty: 2 },
  3: { glyphH: 48, laneH: 74, trace: 2, empty: 5 },
};
const drawable = (t) => { try { LS.textGlyphs(t); return /^\p{L}/u.test(t); } catch (e) { return false; } };

module.exports = {
  id: 'K-523',
  slug: 'name-tracing',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'letter-tracing',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Trace Your Name', instruction: 'Look at the name. Trace it on the dashed lines, then write it yourself on the empty lines.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], L = String(locale || 'en').slice(0, 2);
    const drawn = NAMES[L] || NAMES.en;
    let name = slot.text(ctx, drawn, 'name', 12);
    if (!drawable(name)) { slot.refuse(ctx, 'name'); name = drawn; }
    const lane = (reps, empty) => strokeWordLane({ text: name, w: 660, h: d.laneH, glyphH: d.glyphH, reps, stack: true, emptyLast: empty, padLeft: 14 }).svg;
    const blanks = Array.from({ length: d.empty }, () => `<div data-lcs-write-row>${lane(0, true)}</div>`).join('');
    const body = `<div data-ws-content data-lcs-name="${name.replace(/"/g, '')}" style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:10px;align-items:center"${slot.attr(ctx, 'name', 0)}>` +
      `<div data-lcs-trace-rows>${lane(1 + d.trace, false)}</div>${blanks}</div>`;
    return { bodyHtml: body, meta: { name } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-lcs-name]'), name = root && root.dataset.lcsName;
      if (!name) return ['no name'];
      const lane = document.querySelector('[data-lcs-trace-rows] [data-lcs-prim="trace-word"]');
      if (!lane || lane.dataset.lcsText !== name) fails.push('the traced word is not the name');
      if (lane && +lane.dataset.lcsLetters !== [...name].length) fails.push('a letter of the name is not drawn');
      const rows = document.querySelectorAll('[data-lcs-write-row]').length;
      if (rows < 1) fails.push('no line to write the name alone');
      const pg = document.querySelector('[data-lcs-page]').getBoundingClientRect();
      document.querySelectorAll('[data-lcs-prim="trace-word"]').forEach((s) => { const r = s.getBoundingClientRect(); if (r.right > pg.right + 1 || r.bottom > pg.bottom + 1) fails.push('a line leaves the page'); });
      return fails;
    });
  },
};
