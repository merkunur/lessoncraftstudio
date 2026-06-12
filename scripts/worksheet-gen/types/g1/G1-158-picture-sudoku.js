/**
 * G1-158 — Picture sudoku 4×4 (class-12 exemplar).
 * A 4×4 Latin square with 2×2 boxes; clue cells show icons, empty cells are
 * dashed. A brute-force solver guarantees the puzzle has a UNIQUE solution.
 */
'use strict';
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');

/** count solutions of a 4×4 sudoku (values 0-3 or -1), early-exit at 2 */
function countSolutions(grid) {
  const idx = grid.indexOf(-1);
  if (idx === -1) return 1;
  const r = Math.floor(idx / 4), c = idx % 4;
  let total = 0;
  for (let v = 0; v < 4; v++) {
    let ok = true;
    for (let k = 0; k < 4; k++) {
      if (grid[r * 4 + k] === v || grid[k * 4 + c] === v) { ok = false; break; }
    }
    if (ok) {
      const br = Math.floor(r / 2) * 2, bc = Math.floor(c / 2) * 2;
      for (let rr = br; rr < br + 2 && ok; rr++) for (let cc = bc; cc < bc + 2; cc++) {
        if (grid[rr * 4 + cc] === v) { ok = false; break; }
      }
    }
    if (ok) {
      grid[idx] = v;
      total += countSolutions(grid);
      grid[idx] = -1;
      if (total > 1) return total;
    }
  }
  return total;
}

module.exports = {
  id: 'G1-158',
  slug: 'picture-sudoku-4x4',
  gradeBand: 'G1',
  assetClass: 'visual-logic',
  exerciseType: 'visual-logic',
  themeAxis: { applicable: true, minNouns: 4 },
  difficulty: {
    1: { clues: 10 },
    2: { clues: 8 },
    3: { clues: 6 },
  },
  i18n: {
    en: { title: 'Picture Sudoku', instruction: 'Every row, column, and box needs all four pictures — draw or write what goes in each empty cell.' },
  },

  build({ theme, difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const nouns = rng.sample(labelSafeNouns(theme), 4);

    // random Latin square via row/col/symbol shuffles of a base solution
    const base = [0, 1, 2, 3, 2, 3, 0, 1, 1, 0, 3, 2, 3, 2, 1, 0];
    const sym = rng.shuffle([0, 1, 2, 3]);
    const rowOrder = [...rng.shuffle([0, 1]), ...rng.shuffle([2, 3]).map((r) => r)];
    const solution = [];
    for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) {
      solution[r * 4 + c] = sym[base[rowOrder[r] * 4 + c]];
    }

    // remove cells (keep unique solution) until `clues` remain
    const grid = solution.slice();
    const order = rng.shuffle(Array.from({ length: 16 }, (_, i) => i));
    let remaining = 16;
    for (const cell of order) {
      if (remaining <= d.clues) break;
      const keep = grid[cell];
      grid[cell] = -1;
      if (countSolutions(grid.slice()) !== 1) grid[cell] = keep;
      else remaining--;
    }

    const cellPx = 110;
    const cells = grid.map((v, i) => {
      const r = Math.floor(i / 4), c = i % 4;
      const thick = (side) => `border-${side}:3.5px solid #146B5E`;
      const borders = [
        r % 2 === 0 ? thick('top') : 'border-top:1.5px solid #C8BFAE',
        c % 2 === 0 ? thick('left') : 'border-left:1.5px solid #C8BFAE',
        r === 3 ? thick('bottom') : '',
        c === 3 ? thick('right') : '',
      ].filter(Boolean).join(';');
      if (v === -1) {
        return `<span style="width:${cellPx}px;height:${cellPx}px;${borders};background:#FFFFFF;display:flex;align-items:center;justify-content:center" ` +
          `data-lcs-cell="${i}" data-lcs-solution="${solution[i]}"></span>`;
      }
      return `<span style="width:${cellPx}px;height:${cellPx}px;${borders};background:#FBF3E4;display:flex;align-items:center;justify-content:center" ` +
        `data-lcs-cell="${i}" data-lcs-clue="${v}">` +
        `<img class="ws-icon" src="${fileUri(theme, nouns[v].noun)}" alt="" style="width:${cellPx - 28}px;height:${cellPx - 28}px"></span>`;
    }).join('');

    const key = nouns.map((n) =>
      `<span class="ws-pattern-slot" style="width:74px;height:74px">` +
      `<img class="ws-icon" src="${fileUri(theme, n.noun)}" alt="" style="width:52px;height:52px"></span>`).join('');

    return {
      bodyHtml:
        `<div style="flex:1 1 auto;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:22px" data-lcs-clues="${16 - grid.filter((v) => v === -1).length}">` +
        `<div style="display:grid;grid-template-columns:repeat(4,${cellPx}px)">${cells}</div>` +
        `<div style="display:flex;gap:16px">${key}</div>` +
        `</div>`,
      meta: { solution, clues: grid.filter((v) => v !== -1).length },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const cells = [...document.querySelectorAll('[data-lcs-cell]')];
      if (cells.length !== 16) return ['grid is not 4x4'];
      // rebuild grid: clue values + -1
      const grid = cells.map((c) => c.dataset.lcsClue !== undefined ? +c.dataset.lcsClue : -1);
      const solution = cells.map((c) => c.dataset.lcsClue !== undefined ? +c.dataset.lcsClue : +c.dataset.lcsSolution);
      // solution must be a valid Latin square with 2x2 boxes
      for (let r = 0; r < 4; r++) {
        const row = new Set(), col = new Set();
        for (let k = 0; k < 4; k++) { row.add(solution[r * 4 + k]); col.add(solution[k * 4 + r]); }
        if (row.size !== 4) fails.push(`row ${r + 1} not complete`);
        if (col.size !== 4) fails.push(`col ${r + 1} not complete`);
      }
      [[0, 0], [0, 2], [2, 0], [2, 2]].forEach(([br, bc]) => {
        const box = new Set();
        for (let r = br; r < br + 2; r++) for (let c = bc; c < bc + 2; c++) box.add(solution[r * 4 + c]);
        if (box.size !== 4) fails.push(`box ${br},${bc} not complete`);
      });
      // uniqueness: re-count solutions from the clues
      const count = (g) => {
        const idx = g.indexOf(-1);
        if (idx === -1) return 1;
        const r = Math.floor(idx / 4), c = idx % 4;
        let total = 0;
        for (let v = 0; v < 4; v++) {
          let ok = true;
          for (let k = 0; k < 4; k++) if (g[r * 4 + k] === v || g[k * 4 + c] === v) { ok = false; break; }
          if (ok) {
            const br = Math.floor(r / 2) * 2, bc = Math.floor(c / 2) * 2;
            outer: for (let rr = br; rr < br + 2; rr++) for (let cc = bc; cc < bc + 2; cc++) {
              if (g[rr * 4 + cc] === v) { ok = false; break outer; }
            }
          }
          if (ok) { g[idx] = v; total += count(g); g[idx] = -1; if (total > 1) return total; }
        }
        return total;
      };
      if (count(grid.slice()) !== 1) fails.push('puzzle does not have a unique solution');
      return fails;
    });
  },
};
