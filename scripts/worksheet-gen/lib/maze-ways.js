/**
 * maze-ways.js — the ways through a grid maze (lib/maze.js walls): which cells a cell reaches, the one way between
 * two cells of a perfect maze, its straight runs, and a frame drawn with openings anywhere on the border (makers
 * 2026-11-02: K-484 Which Exit?, K-485 Write the Directions).
 */
'use strict';
const tokens = require('../primitives/_tokens.js');
const { wallKey } = require('./maze.js');

const nbrs = (x, y, cols, rows) => [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]].filter(([a, b]) => a >= 0 && b >= 0 && a < cols && b < rows);

/** the cells reachable from (sx, sy) through the open corridors (a Set of "x,y") */
function reach(walls, cols, rows, sx, sy) {
  const seen = new Set([sx + ',' + sy]), q = [[sx, sy]];
  while (q.length) {
    const [x, y] = q.shift();
    for (const [a, b] of nbrs(x, y, cols, rows)) { const k = a + ',' + b; if (!seen.has(k) && !walls.has(wallKey(x, y, a, b))) { seen.add(k); q.push([a, b]); } }
  }
  return seen;
}

/** the cells of the shortest way from `from` to `to` (the one way, in a perfect maze); [] when none */
function wayBetween(walls, cols, rows, from, to) {
  const prev = new Map([[from.join(','), null]]), q = [from];
  while (q.length) {
    const [x, y] = q.shift();
    if (x === to[0] && y === to[1]) break;
    for (const [a, b] of nbrs(x, y, cols, rows)) { const k = a + ',' + b; if (!prev.has(k) && !walls.has(wallKey(x, y, a, b))) { prev.set(k, x + ',' + y); q.push([a, b]); } }
  }
  if (!prev.has(to.join(','))) return [];
  const way = []; let c = to.join(',');
  while (c) { way.unshift(c.split(',').map(Number)); c = prev.get(c); }
  return way;
}

/** a way's straight runs: [{ dir: 'up'|'right'|'down'|'left', n }] — each run as long as it goes (maximal) */
function runsOf(way) {
  const dirOf = (a, b) => (b[0] > a[0] ? 'right' : b[0] < a[0] ? 'left' : b[1] > a[1] ? 'down' : 'up');
  const runs = [];
  for (let i = 1; i < way.length; i++) {
    const d = dirOf(way[i - 1], way[i]);
    if (runs.length && runs[runs.length - 1].dir === d) runs[runs.length - 1].n++;
    else runs.push({ dir: d, n: 1 });
  }
  return runs;
}

/** the outer frame of a cols × rows maze (cell px) with openings: [{ side: 'left'|'right'|'top'|'bottom', at }] */
function frameWithOpenings(cols, rows, cell, openings) {
  const W = cols * cell, H = rows * cell;
  const ln = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${tokens.color.teal}" stroke-width="3.5" stroke-linecap="round"/>`;
  const side = (name, len, n, mk) => {
    const gaps = openings.filter((o) => o.side === name).map((o) => o.at).sort((a, b) => a - b);
    const out = []; let p = 0;
    for (const g of gaps) { if (g * cell > p) out.push(mk(p, g * cell)); p = (g + 1) * cell; }
    if (p < len) out.push(mk(p, len));
    return out;
  };
  return [].concat(
    side('top', W, cols, (a, b) => ln(a, 0, b, 0)), side('bottom', W, cols, (a, b) => ln(a, H, b, H)),
    side('left', H, rows, (a, b) => ln(0, a, 0, b)), side('right', H, rows, (a, b) => ln(W, a, W, b))).join('');
}

/** the internal walls of lib/maze.js as lines (stamped data-lcs-wall, as renderMaze does) */
function wallLines(walls, cell) {
  return [...walls].map((key) => {
    const [a, b] = key.split('|'); const [x1, y1] = a.split(',').map(Number); const [x2] = b.split(',').map(Number);
    const p = x2 === x1 + 1 ? [(x1 + 1) * cell, y1 * cell, (x1 + 1) * cell, (y1 + 1) * cell] : [x1 * cell, (y1 + 1) * cell, (x1 + 1) * cell, (y1 + 1) * cell];
    return `<line x1="${p[0]}" y1="${p[1]}" x2="${p[2]}" y2="${p[3]}" stroke="${tokens.color.teal}" stroke-width="3.5" stroke-linecap="round" data-lcs-wall="${key}"/>`;
  }).join('');
}

module.exports = { nbrs, reach, wayBetween, runsOf, frameWithOpenings, wallLines };
