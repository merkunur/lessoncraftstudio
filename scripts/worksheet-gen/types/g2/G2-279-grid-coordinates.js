/**
 * G2-279 — Grid Coordinates: Color the Squares (nt20-B; `grid-coordinates`,
 * G2, readiness — repérage sur quadrillage / pixel art à imprimer). An
 * empty lettered grid on the left, a colour-grouped list of cell codes on
 * the right (red: C4 · D4 · D5 …). The child finds each cell (letter across,
 * number down), colours it, and a boot / bird / cherries emerge. A 3×3
 * "what B2 means" legend explains the notation without a sentence. Codes
 * within a colour are SHUFFLED (sorted codes would draw the picture).
 * d1 6×6 · d2 8×8 (7×7 figure at a seeded offset) · d3 10×10 (8×8 figure).
 */
'use strict';
const coordGrid = require('../../primitives/coord-grid.js');
const { codeList } = require('../../templates/components-b2.js');
const { PIXEL_FIGURES, COLOR_LETTERS, pixelFiguresOfSize } = require('../../data/b2/figures.js');
const { COLOR_WORDS } = require('../../data/color-words.js');

module.exports = {
  id: 'G2-279',
  slug: 'grid-coordinates-color-the-squares',
  gradeBand: 'G2',
  assetClass: 'geometry',
  exerciseType: 'grid-coordinates',
  themeAxis: { applicable: false },
  difficulty: {
    1: { cols: 6, rows: 6, cell: 62, figSize: 6, offsets: [0] },
    2: { cols: 8, rows: 8, cell: 52, figSize: 7, offsets: [0, 1] },
    3: { cols: 10, rows: 10, cell: 42, figSize: 8, offsets: [0, 1, 2] },
  },
  i18n: {
    en: {
      title: 'Grid Coordinates: Color the Squares',
      instruction: 'Find each square by its letter and number, like B2. Color it with the color of its group to reveal the picture.',
    },
  },

  build({ difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const words = COLOR_WORDS[loc];
    if (!words) throw new Error(`G2-279: no colour words for ${loc}`);
    const figure = rng.pick(pixelFiguresOfSize(d.figSize));
    const offset = { ox: rng.pick(d.offsets), oy: rng.pick(d.offsets) };
    const grid = coordGrid({ cols: d.cols, rows: d.rows, cell: d.cell, figure, offset });
    const byColor = {};
    grid.cells.forEach((c) => { (byColor[c.color] = byColor[c.color] || []).push(c.code); });
    const groups = Object.keys(byColor).map((letter) => {
      const key = COLOR_LETTERS[letter];
      let codes = byColor[letter].slice(), guard = 0;
      const rowMajor = codes.slice().join('|');
      if (codes.length > 1) { do { codes = rng.shuffle(codes); guard++; } while (codes.join('|') === rowMajor && guard < 20); }
      return { key, letter, word: words[key], codes };
    });
    const demo = coordGrid.coordDemo({ cell: 18 });
    return {
      bodyHtml: `<div style="flex:1;display:flex;flex-direction:column;gap:14px;align-items:center;justify-content:space-evenly" data-ws-content data-lcs-page>` +
        `<div style="display:flex;gap:18px;align-items:flex-start;justify-content:center">` +
        `<div class="ws-card" style="padding:10px;flex:0 0 auto">${grid.svg}</div>` +
        `<div style="display:flex;flex-direction:column;align-items:center;gap:6px;padding-top:6px">${demo.svg}<span class="ws-codechip" style="font-size:17px;height:28px" data-lcs-demo-chip>B2</span></div></div>` +
        `<div class="ws-card" style="width:660px;padding:12px 14px;flex-direction:row;flex-wrap:wrap;gap:12px 22px;justify-content:center">${codeList({ groups: groups.map((g) => ({ key: g.key, word: g.word, codes: g.codes })) })}</div></div>`,
      meta: { figure: figure.key, offset },
    };
  },

  async verify(page) {
    const figures = PIXEL_FIGURES.map((f) => ({ key: f.key, rows: f.rows }));
    return page.evaluate((FIG, LETTERS_MAP) => {
      const fails = [];
      const grid = document.querySelector('[data-lcs-prim="coord-grid"]');
      if (!grid) return ['no grid'];
      const cols = +grid.dataset.lcsCols, rows = +grid.dataset.lcsRows, ox = +grid.dataset.lcsOx, oy = +grid.dataset.lcsOy;
      const fig = FIG.find((f) => f.key === grid.dataset.lcsFigure);
      if (!fig) return ['unknown figure'];
      const L = 'ABCDEFGHIJKLMNOP';
      const expect = new Map();
      fig.rows.forEach((row, r) => [...row].forEach((ch, c) => { if (ch !== '.') expect.set(`${L[c + ox]}${r + oy + 1}`, ch); }));
      const answer = [...grid.querySelectorAll('[data-lcs-answer-cell]')];
      if (answer.length !== expect.size) fails.push(`${answer.length} answer cells, want ${expect.size}`);
      answer.forEach((a) => { if (expect.get(a.dataset.lcsAnswerCell) !== a.dataset.lcsColor) fails.push(`cell ${a.dataset.lcsAnswerCell} colour mismatch`); });
      // codes
      const chips = [...document.querySelectorAll('[data-lcs-code]')].map((c) => c.dataset.lcsCode);
      if (chips.slice().sort().join('|') !== [...expect.keys()].sort().join('|')) fails.push('code list != figure cells');
      if (new Set(chips).size !== chips.length) fails.push('duplicate code');
      chips.forEach((code) => { const m = code.match(/^([A-P])(\d+)$/); if (!m || L.indexOf(m[1]) >= cols || +m[2] > rows) fails.push(`code ${code} outside the grid`); });
      // no visible fill in the main grid; only the demo has a teal cell
      for (const r of grid.querySelectorAll('rect')) { const f = (r.getAttribute('fill') || '').toUpperCase(); if (f && f !== 'NONE' && f !== '#FFFFFF') fails.push('main grid has a filled cell'); }
      if (!document.querySelector('[data-lcs-demo] rect[fill="#146B5E"]')) fails.push('demo cell missing');
      // groups: colour word + swatch + shuffled codes
      const groups = [...document.querySelectorAll('[data-lcs-group]')];
      const expectColours = new Set([...expect.values()].map((ch) => LETTERS_MAP[ch]));
      if (groups.map((g) => g.dataset.lcsGroup).sort().join() !== [...expectColours].sort().join()) fails.push('groups != figure colours');
      groups.forEach((g) => {
        const codes = [...g.querySelectorAll('[data-lcs-code]')].map((c) => c.dataset.lcsCode);
        const rowMajor = codes.slice().sort((a, b) => (+a.slice(1) - +b.slice(1)) || a.charCodeAt(0) - b.charCodeAt(0));
        if (codes.length > 1 && codes.join() === rowMajor.join()) fails.push(`group ${g.dataset.lcsGroup} codes in row-major order (draws the picture)`);
        const want = [...expect.entries()].filter(([, ch]) => LETTERS_MAP[ch] === g.dataset.lcsGroup).length;
        if (codes.length !== want) fails.push(`group ${g.dataset.lcsGroup} has ${codes.length} codes, want ${want}`);
        const word = g.querySelector('[data-lcs-color-word]');
        if (!word || !word.textContent.trim()) fails.push(`group ${g.dataset.lcsGroup} has no colour word`);
      });
      return fails;
    }, figures, COLOR_LETTERS);
  },
};
