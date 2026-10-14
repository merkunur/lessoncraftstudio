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
const { codeList, SWATCH } = require('../../templates/components-b2.js');
const { PIXEL_FIGURES, COLOR_LETTERS, pixelFiguresOfSize } = require('../../data/b2/figures.js');
const { COLOR_WORDS } = require('../../data/color-words.js');
const { LS_PIXEL_FIGURES } = require('../../data/b2/figures-levelset.js');

/*
 * LEVEL SET (2026-10-14) — three levels per face, each copy a DIFFERENT picture.
 * The published page of each face is level 2, copy 1 (variant 1, no seedVariant): it keeps the
 * June draw from PIXEL_FIGURES byte for byte (`legacy` in build). Every other page draws from a
 * named pool — the new pictures in data/b2/figures-levelset.js plus, where a level shares the
 * published size, the June pictures. Twin pages (the base's 6x6 level and G2-302's 6x6 page;
 * the base's 10x10 level and G2-303's 10x10 page) take DIFFERENT pictures, so two faces never
 * print the same sheet.
 *   sorted: the code list in reading order (row 1 left to right, then row 2 ...) — the easier
 *   level's scaffold; every other page keeps the codes shuffled (a sorted list draws the picture).
 * WARNING: tools/gen-b2var-specs.js writes the face files with {1:D,2:D,3:D}; the levels live HERE,
 *   so a re-run of that tool does not change them — never move them into the face files.
 */
const LIVE6 = ['duck', 'flag', 'cup', 'boot'];
const LIVE7 = ['boat', 'key', 'fish', 'cherries'];
const LIVE8 = ['elephant', 'bird', 'giraffe', 'umbrella'];
const F7 = ['apple-tree', 'train', 'bus', 'pear', 'popsicle'];
const SMALL6 = ['balloon', 'note', 'flower', 'pencil', 'pine', 'icecream', 'mushroom'];
const LS_LEVELS = {
  'G2-279': {
    1: { cols: 6, rows: 6, cell: 62, offsets: [0], pool: ['cat', 'shirt', 'bell', 'tulip', 'goldfish'] },
    2: { cols: 8, rows: 8, cell: 52, offsets: [0, 1], pool: [...LIVE7, ...F7] },
    3: { cols: 10, rows: 10, cell: 40, offsets: [0, 1, 2], pool: ['dog', 'cupcake', 'airplane', 'turtle', 'sunflower', 'hen'] },
  },
  'G2-302': {
    1: { cols: 6, rows: 6, cell: 62, offsets: [0], sorted: true, pool: SMALL6 },
    2: { cols: 6, rows: 6, cell: 62, offsets: [0], pool: [...LIVE6, 'hat', 'gift'] },
    3: { cols: 6, rows: 6, cell: 62, offsets: [0], minColors: 3, pool: ['house', 'rocket', 'apple', 'car', 'pumpkin'] },
  },
  'G2-303': {
    1: { cols: 10, rows: 10, cell: 42, offsets: [0, 1, 2, 3], sorted: true, pool: [...LIVE7, ...F7] },
    2: { cols: 10, rows: 10, cell: 42, offsets: [0, 1, 2], pool: [...LIVE8, 'frog', 'tent', 'butterfly', 'lighthouse', 'helicopter'] },
    3: { cols: 10, rows: 10, cell: 36, offsets: [0, 1], pool: ['robot', 'ship', 'owl', 'castle', 'strawberry'] },
  },
  'G2-308': {
    1: { cols: 6, rows: 6, cell: 62, offsets: [0], inverse: true, pool: SMALL6 },
    2: { cols: 6, rows: 6, cell: 62, offsets: [0], inverse: true, pool: [...LIVE6, 'hat', 'gift', 'tulip', 'shirt'] },
    3: { cols: 8, rows: 8, cell: 52, offsets: [0, 1], inverse: true, maxCells: 24, pool: ['pear', 'popsicle', 'apple-tree', 'airplane', 'tent', 'cherries'] },
  },
};
const ALL_FIGURES = [...PIXEL_FIGURES, ...LS_PIXEL_FIGURES];
const figureByKey = (k) => { const f = ALL_FIGURES.find((x) => x.key === k); if (!f) throw new Error('G2-279: no picture ' + k); return f; };
/** The level table of a face (null for a face without one). */
function levelsFor(id) { return LS_LEVELS[id] || null; }

module.exports = {
  levelsFor,
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
      title: 'Grid Coordinates',
      instruction: 'Find each square by its letter and number, like B2. Color it with the color of its group to reveal the picture.',
    },
  },

  build({ difficulty, locale }, ctx) {
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const words = COLOR_WORDS[loc];
    if (!words) throw new Error(`G2-279: no colour words for ${loc}`);
    // the published page (level 2, copy 1) keeps the June draw; every Level Set page reads its level table
    const legacy = difficulty === 2 && (ctx.seedVariant || ctx.variant || 1) === 1;
    const ls = legacy ? null : (levelsFor(this.id) || {})[difficulty];
    if (!legacy && !ls) throw new Error(`G2-279: ${this.id} has no Level Set level ${difficulty}`);
    const d = legacy ? this.difficulty[difficulty] : { ...this.difficulty[difficulty], ...ls };
    const figure = legacy ? rng.pick(pixelFiguresOfSize(d.figSize)) : figureByKey(rng.pick(ls.pool));
    // a Level Set picture may fill the whole grid: only the offsets it fits at (the June pictures always fit theirs)
    const offs = legacy ? d.offsets : d.offsets.filter((o) => o + figure.rows.length <= d.cols);
    const offset = { ox: rng.pick(offs), oy: rng.pick(offs) };
    if (ls) {
      const filled = figure.rows.join('').replace(/\./g, '');
      if (ls.maxCells && filled.length > ls.maxCells) throw new Error(`G2-279: ${figure.key} has ${filled.length} cells, the level allows ${ls.maxCells}`);
      if (ls.minColors && new Set(filled).size < ls.minColors) throw new Error(`G2-279: ${figure.key} has ${new Set(filled).size} colours, the level wants ${ls.minColors}`);
    }
    // inverse: the picture is printed and the child WRITES the coordinates —
    // producing a coordinate instead of locating one, which is naming rather
    // than finding, and the standard classroom pairing. Sourced at 6x6
    // deliberately: those four figures fill 18-25 cells, which is a page of
    // writing, while the 8x8 figures fill 29-36, which is too much.
    const fills = d.inverse
      ? Object.fromEntries(Object.entries(COLOR_LETTERS).map(([ch, key]) => [ch, SWATCH[key]]))
      : null;
    const grid = coordGrid({ cols: d.cols, rows: d.rows, cell: d.cell, figure, offset, fills });
    const byColor = {};
    grid.cells.forEach((c) => { (byColor[c.color] = byColor[c.color] || []).push(c.code); });
    const groups = Object.keys(byColor).map((letter) => {
      const key = COLOR_LETTERS[letter];
      let codes = byColor[letter].slice(), guard = 0;
      const rowMajor = codes.slice().join('|');
      if (d.sorted) codes = codes.slice();   // reading order: coordGrid lists the cells row by row
      else if (codes.length > 1) { do { codes = rng.shuffle(codes); guard++; } while (codes.join('|') === rowMajor && guard < 20); }
      return { key, letter, word: words[key], codes };
    });
    const demo = coordGrid.coordDemo({ cell: 18 });
    return {
      bodyHtml: `<div style="flex:1;display:flex;flex-direction:column;gap:14px;align-items:center;justify-content:space-evenly" data-ws-content data-lcs-page${d.inverse ? ' data-lcs-inverse="1"' : ''}${ls ? ` data-lcs-gc="${d.sorted ? 'sorted' : 'shuffled'}" data-lcs-gc-level="${difficulty}"` : ''}>` +
        `<div style="display:flex;gap:18px;align-items:flex-start;justify-content:center">` +
        `<div class="ws-card" style="padding:10px;flex:0 0 auto">${grid.svg}</div>` +
        `<div style="display:flex;flex-direction:column;align-items:center;gap:6px;padding-top:6px">${demo.svg}<span class="ws-codechip" style="font-size:17px;height:28px" data-lcs-demo-chip>B2</span></div></div>` +
        `<div class="ws-card" style="width:660px;padding:12px 14px;flex-direction:row;flex-wrap:wrap;gap:12px 22px;justify-content:center">${codeList({ groups: groups.map((g) => ({ key: g.key, word: g.word, codes: d.inverse ? g.codes.map(() => '') : g.codes })) })}</div></div>`,
      meta: { figure: figure.key, offset },
    };
  },

  // a Level Set copy is a different PICTURE (build-waves compares these between the copies of a level)
  levelSetWords(meta) { return [meta.figure]; },

  async verify(page) {
    const figures = ALL_FIGURES.map((f) => ({ key: f.key, rows: f.rows }));
    const pf = await page.evaluate(require('../../lib/page-fill.js').pageFill);
    const own = await page.evaluate((FIG, LETTERS_MAP) => {
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
      // ⚠ On the inverse face the chips are deliberately EMPTY — the child writes
      // them — so the "code list matches the figure" assertion would fail a
      // correct page. What must hold instead is that the right NUMBER of blank
      // boxes is printed, and that the grid is genuinely filled.
      const inverse = !!document.querySelector('[data-lcs-inverse]');
      const chips = [...document.querySelectorAll('[data-lcs-code]')].map((c) => c.dataset.lcsCode);
      if (inverse) {
        if (chips.length !== expect.size) fails.push(`${chips.length} blank code boxes, want ${expect.size}`);
        if (chips.some((c) => c)) fails.push('inverse page printed a code the child should write');
        const filled = answer.filter((a) => { const f = a.getAttribute('fill'); return f && f !== 'none'; });
        if (filled.length !== expect.size) fails.push(`${filled.length} filled cells, want ${expect.size}`);
      } else {
      if (chips.slice().sort().join('|') !== [...expect.keys()].sort().join('|')) fails.push('code list != figure cells');
      if (new Set(chips).size !== chips.length) fails.push('duplicate code');
      chips.forEach((code) => { const m = code.match(/^([A-P])(\d+)$/); if (!m || L.indexOf(m[1]) >= cols || +m[2] > rows) fails.push(`code ${code} outside the grid`); });
      }
      // no visible fill in the main grid; only the demo has a teal cell
      // ⚠ On the inverse face a filled grid is the POINT — the picture is printed
      // and the child writes the codes. This assertion guards the normal face,
      // where a filled cell would hand the child the answer.
      if (!inverse) for (const r of grid.querySelectorAll('rect')) { const f = (r.getAttribute('fill') || '').toUpperCase(); if (f && f !== 'NONE' && f !== '#FFFFFF') fails.push('main grid has a filled cell'); }
      if (!document.querySelector('[data-lcs-demo] rect[fill="#146B5E"]')) fails.push('demo cell missing');
      // groups: colour word + swatch + shuffled codes
      const groups = [...document.querySelectorAll('[data-lcs-group]')];
      const expectColours = new Set([...expect.values()].map((ch) => LETTERS_MAP[ch]));
      if (groups.map((g) => g.dataset.lcsGroup).sort().join() !== [...expectColours].sort().join()) fails.push('groups != figure colours');
      groups.forEach((g) => {
        const codes = [...g.querySelectorAll('[data-lcs-code]')].map((c) => c.dataset.lcsCode);
        const rowMajor = codes.slice().sort((a, b) => (+a.slice(1) - +b.slice(1)) || a.charCodeAt(0) - b.charCodeAt(0));
        // The anti-row-major guard exists so a code LIST cannot draw the picture
        // by itself. On the inverse face the boxes are blank, so there is no order
        // to leak — and comparing empty strings makes the check fire on a correct
        // page. The count assertion below still holds and is the one that matters.
        // a Level Set easier page lists its codes in READING ORDER on purpose (data-lcs-gc="sorted"); every other
        // page must not (a sorted list draws the picture)
        const sortedPage = !!document.querySelector('[data-lcs-gc="sorted"]');
        if (sortedPage && codes.join() !== rowMajor.join()) fails.push(`group ${g.dataset.lcsGroup} codes not in reading order on the easier page`);
        if (!sortedPage && !inverse && codes.length > 1 && codes.join() === rowMajor.join()) fails.push(`group ${g.dataset.lcsGroup} codes in row-major order (draws the picture)`);
        const want = [...expect.entries()].filter(([, ch]) => LETTERS_MAP[ch] === g.dataset.lcsGroup).length;
        if (codes.length !== want) fails.push(`group ${g.dataset.lcsGroup} has ${codes.length} codes, want ${want}`);
        const word = g.querySelector('[data-lcs-color-word]');
        if (!word || !word.textContent.trim()) fails.push(`group ${g.dataset.lcsGroup} has no colour word`);
      });
      return fails;
    }, figures, COLOR_LETTERS);
    // the page must USE its page (lib/page-fill.js; Graphs and Data 2026-10-08)
    return [...own, ...pf.fails];
  },
};
