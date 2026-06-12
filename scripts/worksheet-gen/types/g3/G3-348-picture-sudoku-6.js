/**
 * G3-348 — Picture sudoku 6×6 (3×2 boxes), unique-solution guaranteed by the
 * same brute-force counter as the 4×4 (generalized).
 */
'use strict';
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');

const N = 6, BR = 2, BC = 3;   // 6x6 grid, boxes 2 rows × 3 cols

function countSolutions(grid, limit) {
  const idx = grid.indexOf(-1);
  if (idx === -1) return 1;
  const r = Math.floor(idx / N), c = idx % N;
  let total = 0;
  for (let v = 0; v < N; v++) {
    let ok = true;
    for (let k = 0; k < N; k++) {
      if (grid[r * N + k] === v || grid[k * N + c] === v) { ok = false; break; }
    }
    if (ok) {
      const br = Math.floor(r / BR) * BR, bc = Math.floor(c / BC) * BC;
      outer: for (let rr = br; rr < br + BR; rr++) for (let cc = bc; cc < bc + BC; cc++) {
        if (grid[rr * N + cc] === v) { ok = false; break outer; }
      }
    }
    if (ok) {
      grid[idx] = v;
      total += countSolutions(grid, limit);
      grid[idx] = -1;
      if (total >= limit) return total;
    }
  }
  return total;
}

/** build a random full solution via backtracking with rng-shuffled values */
function buildSolution(rng) {
  const grid = new Array(N * N).fill(-1);
  const fill = (idx) => {
    if (idx === N * N) return true;
    const r = Math.floor(idx / N), c = idx % N;
    for (const v of rng.shuffle([0, 1, 2, 3, 4, 5])) {
      let ok = true;
      for (let k = 0; k < N; k++) if (grid[r * N + k] === v || grid[k * N + c] === v) { ok = false; break; }
      if (ok) {
        const br = Math.floor(r / BR) * BR, bc = Math.floor(c / BC) * BC;
        outer: for (let rr = br; rr < br + BR; rr++) for (let cc = bc; cc < bc + BC; cc++) {
          if (grid[rr * N + cc] === v) { ok = false; break outer; }
        }
      }
      if (ok) {
        grid[idx] = v;
        if (fill(idx + 1)) return true;
        grid[idx] = -1;
      }
    }
    return false;
  };
  fill(0);
  return grid;
}

module.exports = {
  id: 'G3-348',
  slug: 'picture-sudoku-6x6',
  gradeBand: 'G23',
  assetClass: 'visual-logic',
  exerciseType: 'visual-logic',
  themeAxis: { applicable: true, minNouns: 6 },
  difficulty: {
    1: { clues: 24 },
    2: { clues: 20 },
    3: { clues: 17 },
  },
  i18n: {
    en: { title: 'Big Picture Sudoku', instruction: 'Every row, column, and box needs all six pictures — fill the empty cells.' },
  },

  build({ theme, difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const nouns = rng.sample(labelSafeNouns(theme), 6);
    const solution = buildSolution(rng);
    const grid = solution.slice();
    let remaining = N * N;
    for (const cell of rng.shuffle(Array.from({ length: N * N }, (_, i) => i))) {
      if (remaining <= d.clues) break;
      const keep = grid[cell];
      grid[cell] = -1;
      if (countSolutions(grid.slice(), 2) !== 1) grid[cell] = keep;
      else remaining--;
    }

    const cellPx = 76;
    const cells = grid.map((v, i) => {
      const r = Math.floor(i / N), c = i % N;
      const borders = [
        r % BR === 0 ? 'border-top:3px solid #146B5E' : 'border-top:1.5px solid #C8BFAE',
        c % BC === 0 ? 'border-left:3px solid #146B5E' : 'border-left:1.5px solid #C8BFAE',
        r === N - 1 ? 'border-bottom:3px solid #146B5E' : '',
        c === N - 1 ? 'border-right:3px solid #146B5E' : '',
      ].filter(Boolean).join(';');
      if (v === -1) {
        return `<span style="width:${cellPx}px;height:${cellPx}px;${borders};background:#FFFFFF;display:flex;align-items:center;justify-content:center" ` +
          `data-lcs-cell="${i}" data-lcs-solution="${solution[i]}"></span>`;
      }
      return `<span style="width:${cellPx}px;height:${cellPx}px;${borders};background:#FBF3E4;display:flex;align-items:center;justify-content:center" ` +
        `data-lcs-cell="${i}" data-lcs-clue="${v}">` +
        `<img class="ws-icon" src="${fileUri(theme, nouns[v].noun)}" alt="" style="width:${cellPx - 20}px;height:${cellPx - 20}px"></span>`;
    }).join('');

    const key = nouns.map((n) =>
      `<span class="ws-pattern-slot" style="width:62px;height:62px">` +
      `<img class="ws-icon" src="${fileUri(theme, n.noun)}" alt="" style="width:44px;height:44px"></span>`).join('');

    return {
      bodyHtml:
        `<div style="flex:1 1 auto;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px">` +
        `<div style="display:grid;grid-template-columns:repeat(${N},${cellPx}px)">${cells}</div>` +
        `<div style="display:flex;gap:14px">${key}</div>` +
        `</div>`,
      meta: { clues: grid.filter((v) => v !== -1).length },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const N2 = 6, BR2 = 2, BC2 = 3;
      const fails = [];
      const cells = [...document.querySelectorAll('[data-lcs-cell]')];
      if (cells.length !== 36) return ['grid is not 6x6'];
      const solution = cells.map((c) => c.dataset.lcsClue !== undefined ? +c.dataset.lcsClue : +c.dataset.lcsSolution);
      const grid = cells.map((c) => c.dataset.lcsClue !== undefined ? +c.dataset.lcsClue : -1);
      for (let r = 0; r < N2; r++) {
        const row = new Set(), col = new Set();
        for (let k = 0; k < N2; k++) { row.add(solution[r * N2 + k]); col.add(solution[k * N2 + r]); }
        if (row.size !== N2) fails.push(`row ${r + 1} invalid`);
        if (col.size !== N2) fails.push(`col ${r + 1} invalid`);
      }
      for (let br = 0; br < N2; br += BR2) for (let bc = 0; bc < N2; bc += BC2) {
        const box = new Set();
        for (let r = br; r < br + BR2; r++) for (let c = bc; c < bc + BC2; c++) box.add(solution[r * N2 + c]);
        if (box.size !== N2) fails.push(`box ${br},${bc} invalid`);
      }
      const count = (g, limit) => {
        const idx = g.indexOf(-1);
        if (idx === -1) return 1;
        const r = Math.floor(idx / N2), c = idx % N2;
        let total = 0;
        for (let v = 0; v < N2; v++) {
          let ok = true;
          for (let k = 0; k < N2; k++) if (g[r * N2 + k] === v || g[k * N2 + c] === v) { ok = false; break; }
          if (ok) {
            const br = Math.floor(r / BR2) * BR2, bc = Math.floor(c / BC2) * BC2;
            outer: for (let rr = br; rr < br + BR2; rr++) for (let cc = bc; cc < bc + BC2; cc++) {
              if (g[rr * N2 + cc] === v) { ok = false; break outer; }
            }
          }
          if (ok) { g[idx] = v; total += count(g, limit); g[idx] = -1; if (total >= limit) return total; }
        }
        return total;
      };
      if (count(grid.slice(), 2) !== 1) fails.push('not a unique solution');
      return fails;
    });
  },
};
