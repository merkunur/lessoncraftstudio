/**
 * K-485 — Write the Directions (Mazes maker 2026-11-02, NEW-TEMPLATES §28 T4): reading a SOLVED maze and writing its
 * route — the step from tracing a way to describing one (the maps link). The way through a grid maze is drawn; the
 * child writes it as straight runs: which way (an arrow) and how many squares, one run per row; level 3 also counts
 * the turns.
 *
 * A run is as long as the way goes straight (maximal: "→ 3", never "→ 1, → 2"), the instruction says so, and the
 * runs are counted from the drawn way itself. The start and the goal sit in two opposite corners chosen per copy, so
 * no arrow is the usual answer. Levels: 1 a 4 × 4 maze, 3–5 runs, the arrows printed — write how many squares ·
 * 2 a 5 × 5 maze, 4–6 runs, circle the arrow and write how many · 3 a 6 × 6 maze, 5–8 runs, arrows + squares + turns.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { generateMaze } = require('../../lib/maze.js');
const { wayBetween, runsOf, frameWithOpenings, wallLines } = require('../../lib/maze-ways.js');

const D = {
  // sized to the body (2026-11-03, final-phase review: the maze beside the table used 40 % of the page height): the maze
  // ~410 px across the top, the table below it in two columns
  1: { n: 4, runs: [3, 5], cell: 104, circle: false, turns: false },
  2: { n: 5, runs: [4, 6], cell: 84, circle: true, turns: false },
  3: { n: 6, runs: [5, 8], cell: 66, circle: true, turns: true },
};
const DIRS = ['up', 'right', 'down', 'left'];
const ROT = { up: -90, right: 0, down: 90, left: 180 };
// the turn sign: a way that bends (drawn — an arrow codepoint is outside the page fonts)
const turnIcon = (px) => `<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}" viewBox="0 0 24 24" aria-label="turns"><path d="M 4 20 L 4 9 Q 4 5 8 5 L 17 5" fill="none" stroke="${tokens.color.ink}" stroke-width="2.6" stroke-linecap="round"/><path d="M 15 1.5 L 21 5 L 15 8.5 Z" fill="${tokens.color.ink}"/></svg>`;
const arrowSvg = (dir, px) => `<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}" viewBox="-12 -12 24 24" aria-label="${dir}"><path d="M -8 -2.5 L 2 -2.5 L 2 -7 L 9 0 L 2 7 L 2 2.5 L -8 2.5 Z" fill="${tokens.color.ink}" transform="rotate(${ROT[dir]})"/></svg>`;

module.exports = {
  id: 'K-485',
  slug: 'write-the-maze-directions',
  gradeBand: 'G1',
  assetClass: 'none',
  exerciseType: 'mazes',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: {
    en: {
      title: 'Write the Directions Through the Maze',
      instruction: 'Follow the way from the green dot to the flag. For each straight part, write how many steps (arrows) it has.',
    },
  },

  build({ difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const corners = [[0, 0], [d.n - 1, 0], [d.n - 1, d.n - 1], [0, d.n - 1]];
    let maze = null;
    for (let t = 0; t < 400 && !maze; t++) {
      const { walls } = generateMaze({ cols: d.n, rows: d.n, rng });
      const c = rng.int(0, 3), from = corners[c], to = corners[(c + 2) % 4];
      const way = wayBetween(walls, d.n, d.n, from, to);
      const runs = runsOf(way);
      if (runs.length >= d.runs[0] && runs.length <= d.runs[1]) maze = { walls, from, to, way, runs };
    }
    if (!maze) throw new Error('K-485: no maze with the level\'s number of runs');
    const c = d.cell, W = d.n * c;
    // the openings: the start and the goal corners open on the side they face (left / right edge)
    const open = [{ side: maze.from[0] === 0 ? 'left' : 'right', at: maze.from[1] }, { side: maze.to[0] === 0 ? 'left' : 'right', at: maze.to[1] }];
    const ctr = (p) => [(p[0] + 0.5) * c, (p[1] + 0.5) * c];
    const pts = maze.way.map(ctr);
    // the way: a light line through the squares and ONE chevron on every step, so a run's count is the chevrons it
    // has (never "do I count the square I start on?")
    const chev = pts.slice(1).map((p, i) => { const q = pts[i], a = Math.atan2(p[1] - q[1], p[0] - q[0]) * 180 / Math.PI;
      return `<path d="M -6 -8 L 4 0 L -6 8" fill="none" stroke="${tokens.color.coral}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" transform="translate(${((p[0] + q[0]) / 2).toFixed(1)} ${((p[1] + q[1]) / 2).toFixed(1)}) rotate(${a.toFixed(0)})" data-lcs-step="${i + 1}"/>`; }).join('');
    const route = `<polyline points="${pts.map((p) => p.join(',')).join(' ')}" fill="none" stroke="${tokens.color.coralSoft}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" data-lcs-route="${maze.way.map((p) => p.join(',')).join(' ')}"/>${chev}`;
    const [sx, sy] = pts[0], [gx, gy] = pts[pts.length - 1];
    const marks = `<circle cx="${sx}" cy="${sy}" r="10" fill="${tokens.codeColors.codeGreen}" data-lcs-route-start="1"/><g transform="translate(${gx} ${gy})" data-lcs-route-goal="1"><rect x="-1.5" y="-22" width="3" height="24" fill="${tokens.color.inkSoft}"/><path d="M1.5 -22 L18 -17 L1.5 -11 Z" fill="${tokens.color.coral}"/></g>`;
    // grid ticks: faint square marks so the squares can be counted
    const ticks = [];
    for (let y = 0; y < d.n; y++) for (let x = 0; x < d.n; x++) ticks.push(`<circle cx="${(x + 0.5) * c}" cy="${(y + 0.5) * c}" r="2" fill="${tokens.color.grid}"/>`);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W + 8}" height="${W + 8}" viewBox="-4 -4 ${W + 8} ${W + 8}" role="img" aria-label="maze" data-lcs-prim="maze" data-lcs-cols="${d.n}" data-lcs-rows="${d.n}">${ticks.join('')}${frameWithOpenings(d.n, d.n, c, open)}${wallLines(maze.walls, c)}${route}${marks}</svg>`;
    // the direction table: one row per run
    // two columns under the maze: rows of at most 58 px (two columns of four arrow chips + a box fit the 675 px body)
    const perCol = Math.ceil(maze.runs.length / 2);
    const rowH = Math.min(58, Math.floor((766 - (W + 8) - 30 - (d.turns ? 64 : 0)) / perCol));
    const chip = (dir, correct) => `<span class="ws-numchip" data-lcs-arrow="${dir}"${correct ? ' data-lcs-correct=""' : ''} style="display:inline-flex;align-items:center;justify-content:center;width:${rowH - 12}px;height:${rowH - 12}px;border:2px solid ${tokens.color.grid};border-radius:10px;background:#FFFFFF">${arrowSvg(dir, rowH - 22)}</span>`;
    const box = (ans, attrs = '') => `<span class="ws-answerbox" data-lcs-answer="${ans}" ${attrs} style="display:inline-block;width:${rowH}px;height:${rowH - 10}px;border:2.5px solid ${tokens.color.teal};border-radius:8px;background:#FFFFFF;font-size:${Math.round(rowH * 0.5)}px;text-align:center;line-height:${rowH - 14}px"></span>`;
    const rowEls = maze.runs.map((r, i) => `<div data-lcs-run="${i + 1}" style="display:flex;align-items:center;gap:8px;height:${rowH}px">` +
      `<span style="width:20px;font:700 15px/1 'Baloo 2',cursive;color:${tokens.color.inkSoft}">${i + 1}.</span>` +
      (d.circle ? `<span data-lcs-choice="run-${i + 1}" style="display:flex;gap:6px">${DIRS.map((dir) => chip(dir, dir === r.dir)).join('')}</span>` : `<span data-lcs-arrow-given="${r.dir}" style="display:inline-flex;width:${rowH}px;justify-content:center">${arrowSvg(r.dir, rowH - 16)}</span>`) +
      box(r.n, `data-lcs-run-count="${i + 1}"`) + `</div>`);
    const turns = d.turns ? `<div style="display:flex;align-items:center;justify-content:center;gap:10px;margin-top:10px"><span data-lcs-turns-label="1" style="display:inline-flex">${turnIcon(Math.min(44, rowH - 8))}</span>${box(maze.runs.length - 1, 'data-lcs-turns="1"')}</div>` : '';
    const col = (xs) => `<div style="display:flex;flex-direction:column">${xs.join('')}</div>`;
    const table = `<div data-lcs-runs="${maze.runs.length}" style="display:flex;flex-direction:column;align-items:center"><div style="display:flex;gap:24px;align-items:flex-start">${col(rowEls.slice(0, perCol))}${col(rowEls.slice(perCol))}</div>${turns}</div>`;
    const body = `<div data-ws-content style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:space-evenly;gap:14px">${svg}${table}</div>`;
    return { bodyHtml: body, meta: { runs: maze.runs.map((r) => r.dir[0] + r.n).join(' ') } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const pl = document.querySelector('[data-lcs-route]');
      if (!pl) return ['no drawn way'];
      const way = pl.dataset.lcsRoute.split(' ').map((s) => s.split(',').map(Number));
      // the runs of the drawn way, counted here
      const dirOf = (a, b) => (b[0] > a[0] ? 'right' : b[0] < a[0] ? 'left' : b[1] > a[1] ? 'down' : 'up');
      const runs = [];
      for (let i = 1; i < way.length; i++) { const dd = dirOf(way[i - 1], way[i]); if (runs.length && runs[runs.length - 1].dir === dd) runs[runs.length - 1].n++; else runs.push({ dir: dd, n: 1 }); }
      // the way follows open corridors (no wall crossed)
      const walls = new Set([...document.querySelectorAll('[data-lcs-wall]')].map((w) => w.dataset.lcsWall));
      const key = (a, b) => (a[0] < b[0] || (a[0] === b[0] && a[1] < b[1]) ? `${a[0]},${a[1]}|${b[0]},${b[1]}` : `${b[0]},${b[1]}|${a[0]},${a[1]}`);
      for (let i = 1; i < way.length; i++) if (walls.has(key(way[i - 1], way[i]))) fails.push(`the way crosses a wall at step ${i}`);
      const rows = [...document.querySelectorAll('[data-lcs-run]')];
      if (rows.length !== runs.length) fails.push(`${rows.length} rows for ${runs.length} straight runs`);
      rows.forEach((r, i) => {
        const run = runs[i]; if (!run) return;
        const b = r.querySelector('[data-lcs-run-count]');
        if (!b || (b.dataset.lcsAnswer !== '' && +b.dataset.lcsAnswer !== run.n)) fails.push(`row ${i + 1}: the count is not ${run.n}`);
        if (b && b.textContent.trim()) fails.push(`row ${i + 1}: a count printed in its box`);
        const given = r.querySelector('[data-lcs-arrow-given]'), chips = [...r.querySelectorAll('[data-lcs-arrow]')];
        if (given && given.dataset.lcsArrowGiven !== run.dir) fails.push(`row ${i + 1}: the printed arrow is not ${run.dir}`);
        if (!given) {
          if (chips.length !== 4) fails.push(`row ${i + 1}: ${chips.length} arrows to choose from`);
          const right = chips.filter((c) => c.hasAttribute('data-lcs-correct'));
          if (right.length !== 1 || right[0].dataset.lcsArrow !== run.dir) fails.push(`row ${i + 1}: the marked arrow is not ${run.dir}`);
        }
      });
      const t = document.querySelector('[data-lcs-turns]');
      if (t && +t.dataset.lcsAnswer !== runs.length - 1) fails.push(`the turns box is not ${runs.length - 1}`);
      if (!document.querySelector('[data-lcs-route-start]') || !document.querySelector('[data-lcs-route-goal]')) fails.push('no start or goal mark');
      return fails;
    });
  },
};
