/**
 * maze — seeded perfect-maze generator + SVG renderer (K-242).
 * Iterative randomized DFS over a cols×rows grid produces a spanning tree:
 * every pair of cells is connected by EXACTLY one path, so the puzzle is
 * solvable with a unique solution BY CONSTRUCTION — the property the QA
 * verify re-checks structurally (remaining-wall count of a perfect maze is
 * exactly slots − (cells − 1)).
 *
 * generateMaze({cols, rows, rng})  → { walls:Set<string>, solution:[cells] }
 * renderMaze({cols, rows, walls, cell, entrance, exit}) → { svg, cellRect }
 */
'use strict';
const tokens = require('../primitives/_tokens.js');
const { svgRoot, line } = require('../primitives/_svg.js');

const wallKey = (x1, y1, x2, y2) =>
  x1 < x2 || (x1 === x2 && y1 < y2) ? `${x1},${y1}|${x2},${y2}` : `${x2},${y2}|${x1},${y1}`;

function generateMaze({ cols, rows, rng }) {
  // all internal walls present initially
  const walls = new Set();
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (x + 1 < cols) walls.add(wallKey(x, y, x + 1, y));
      if (y + 1 < rows) walls.add(wallKey(x, y, x, y + 1));
    }
  }
  // iterative DFS spanning tree
  const seen = new Set(['0,0']);
  const stack = [[0, 0]];
  while (stack.length) {
    const [x, y] = stack[stack.length - 1];
    const nbrs = [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]]
      .filter(([nx, ny]) => nx >= 0 && ny >= 0 && nx < cols && ny < rows && !seen.has(`${nx},${ny}`));
    if (!nbrs.length) { stack.pop(); continue; }
    const [nx, ny] = nbrs[Math.floor(rng.next() * nbrs.length)];
    walls.delete(wallKey(x, y, nx, ny));
    seen.add(`${nx},${ny}`);
    stack.push([nx, ny]);
  }
  // unique solution path entrance (0,0) → exit (cols-1, rows-1) via BFS
  const prev = new Map([['0,0', null]]);
  const q = [[0, 0]];
  while (q.length) {
    const [x, y] = q.shift();
    if (x === cols - 1 && y === rows - 1) break;
    for (const [nx, ny] of [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]]) {
      if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue;
      if (walls.has(wallKey(x, y, nx, ny))) continue;
      const k = `${nx},${ny}`;
      if (prev.has(k)) continue;
      prev.set(k, `${x},${y}`);
      q.push([nx, ny]);
    }
  }
  const solution = [];
  let cur = `${cols - 1},${rows - 1}`;
  while (cur) { solution.unshift(cur); cur = prev.get(cur); }
  return { walls, solution };
}

/** Expected remaining internal walls of a perfect maze (QA ground truth). */
function expectedWallCount({ cols, rows }) {
  const slots = cols * (rows - 1) + rows * (cols - 1);
  return slots - (cols * rows - 1);
}

function renderMaze({ cols, rows, walls, cell = 52, entrance = 'top', exit = 'bottom' }) {
  const w = cols * cell, h = rows * cell;
  const parts = [];
  const wallLine = (x1, y1, x2, y2, data) => line({
    x1, y1, x2, y2, strokeColor: tokens.color.teal, strokeWidth: 3.5, cap: 'round', data,
  });

  // outer border with entrance (top of cell 0,0) and exit (bottom of last cell) openings
  // top edge: open above the entrance cell
  parts.push(wallLine(cell, 0, w, 0));                    // top (skip first cell)
  parts.push(wallLine(0, h, w - cell, h));                // bottom (skip last cell)
  parts.push(wallLine(0, 0, 0, h));                       // left
  parts.push(wallLine(w, 0, w, h));                       // right

  // internal walls
  for (const key of walls) {
    const [a, b] = key.split('|');
    const [x1, y1] = a.split(',').map(Number);
    const [x2, y2] = b.split(',').map(Number);
    const data = { 'data-lcs-wall': key };
    if (x2 === x1 + 1) {
      // vertical wall between horizontally-adjacent cells
      parts.push(wallLine((x1 + 1) * cell, y1 * cell, (x1 + 1) * cell, (y1 + 1) * cell, data));
    } else {
      // horizontal wall between vertically-adjacent cells
      parts.push(wallLine(x1 * cell, (y1 + 1) * cell, (x1 + 1) * cell, (y1 + 1) * cell, data));
    }
  }

  return {
    svg: svgRoot({ width: w + 8, height: h + 8, viewBox: `-4 -4 ${w + 8} ${h + 8}`, label: 'maze' },
      parts.join(''),
      { 'data-lcs-prim': 'maze', 'data-lcs-cols': cols, 'data-lcs-rows': rows, 'data-lcs-expected-walls': expectedWallCount({ cols, rows }) }),
    cellRect: (x, y) => ({ x: x * cell, y: y * cell, w: cell, h: cell }),
    width: w + 8, height: h + 8,
  };
}

module.exports = { generateMaze, renderMaze, expectedWallCount, wallKey };
