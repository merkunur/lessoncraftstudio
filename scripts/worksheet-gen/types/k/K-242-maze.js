/**
 * K-242 — Maze (perfect spanning-tree maze — unique solution by
 * construction, §lib/maze.js). Full-page hero layout: ONE generous maze,
 * a theme icon waiting at the entrance and another at the goal ("help the
 * rabbit reach the carrot"). Language-free content; the universal K
 * printable. d1: 7×8 wide corridors · d2: 9×11 · d3: 11×13.
 */
'use strict';
const { generateMaze, renderMaze } = require('../../lib/maze.js');
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const slot = require('../../lib/slot.js');

module.exports = {
  id: 'K-242',
  slug: 'maze',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'mazes',
  themeAxis: { applicable: true, minNouns: 2 },
  difficulty: {
    1: { cols: 7, rows: 8, cell: 74 },
    2: { cols: 9, rows: 11, cell: 58 },
    3: { cols: 11, rows: 13, cell: 48 },
  },
  i18n: {
    en: {
      title: 'Follow the Maze',
      instruction: 'Start at the picture at the top. Draw a path through the maze to reach the goal at the bottom.',
    },
  },

  // the screen (makers 2026-11-02, NEW-TEMPLATES §28 T1): drag the way through the maze — the scene mazes' trace-path
  // player over the cell graph the interactive build declares; one way by construction, K-405's oracle proves it
  interactive: {
    kind: 'trace-path', instructionKey: 'mz-grid',
    oracle: (B) => require('./K-405-maze-puzzles.js').interactive.oracle(B),
    chrome: (locale) => require('../../lib/b8-common.js').bank('maze-puzzles', locale).chrome,
  },

  build({ theme, difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const nouns = labelSafeNouns(theme);
    if (nouns.length < 2) throw new Error(`K-242: theme ${theme} has ${nouns.length} nouns < 2`);
    // makers (2026-11-02): the start and the goal picture are slots (the teacher's own pair: her class pet and its bowl);
    // the maze is drawn after them from the same stream, so a swap changes the pictures and nothing else
    const [startNoun, goalNoun] = slot.pictures(ctx, rng.sample(nouns, 2), nouns, theme, 'pic');

    const { walls, solution } = generateMaze({ cols: d.cols, rows: d.rows, rng });
    const m = renderMaze({ cols: d.cols, rows: d.rows, walls, cell: d.cell });
    const iconPx = Math.round(d.cell * 0.72);
    const start = m.cellRect(0, 0);
    const goal = m.cellRect(d.cols - 1, d.rows - 1);
    const place = (rect, noun, key, role) =>
      `<img class="ws-icon" src="${fileUri(theme, noun)}" alt="" data-lcs-maze-icon="${role}" data-lcs-noun="${key}"${slot.attr(ctx, 'pic', role === 'start' ? 0 : 1)} ` +
      `style="position:absolute;left:${(rect.x + (rect.w - iconPx) / 2 + 4).toFixed(1)}px;` +
      `top:${(rect.y + (rect.h - iconPx) / 2 + 4).toFixed(1)}px;width:${iconPx}px;height:${iconPx}px">`;

    // the interactive build declares the maze as a graph (cell centres in the svg's units — its viewBox starts at -4 —,
    // the open corridors, the one way, the entrance above the first cell and the exit below the last); the page build
    // is unchanged
    let svg = m.svg;
    if (ctx && ctx.interactive) {
      const c = d.cell, at = (x, y) => [+((x + 0.5) * c + 4).toFixed(1), +((y + 0.5) * c + 4).toFixed(1)], id = (x, y) => y * d.cols + x;
      const nodes = [], edges = [];
      for (let y = 0; y < d.rows; y++) for (let x = 0; x < d.cols; x++) nodes.push(at(x, y));
      for (let y = 0; y < d.rows; y++) for (let x = 0; x < d.cols; x++) {
        if (x + 1 < d.cols && !walls.has(`${x},${y}|${x + 1},${y}`)) edges.push({ a: id(x, y), b: id(x + 1, y), pts: [at(x, y), at(x + 1, y)] });
        if (y + 1 < d.rows && !walls.has(`${x},${y}|${x},${y + 1}`)) edges.push({ a: id(x, y), b: id(x, y + 1), pts: [at(x, y), at(x, y + 1)] });
      }
      const route = solution.map((k) => { const [x, y] = k.split(',').map(Number); return id(x, y); });
      const s0 = at(0, 0), g0 = at(d.cols - 1, d.rows - 1);
      const stamp = { W: Math.round(c * 0.8), nodes, edges, route, s: route[0], g: route[route.length - 1], tree: true,
        mouths: { start: [s0, [s0[0], 4]], goal: [g0, [g0[0], d.rows * c + 4]] } };
      svg = svg.replace('<svg ', `<svg data-lcs-hm-graph='${JSON.stringify(stamp)}' `);
    }

    // goal icon repeated beside the exit as the "destination" cue below the maze
    const bodyHtml =
      `<div data-ws-content data-lcs-solution-len="${solution.length}" ` +
      `style="flex:1;display:flex;align-items:center;justify-content:center">` +
      `<div style="position:relative;width:${m.width}px;height:${m.height}px">` +
      svg + place(start, startNoun.noun, startNoun.vocabKey, 'start') + place(goal, goalNoun.noun, goalNoun.vocabKey, 'goal') +
      `</div></div>`;
    return { bodyHtml, meta: { solution: solution.length } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const svg = document.querySelector('[data-lcs-prim="maze"]');
      if (!svg) { fails.push('no maze'); return fails; }
      const expected = +svg.dataset.lcsExpectedWalls;
      const walls = svg.querySelectorAll('[data-lcs-wall]').length;
      // a perfect maze has EXACTLY slots-(cells-1) internal walls: more ⇒
      // disconnected (unsolvable), fewer ⇒ loops (multiple solutions)
      if (walls !== expected) fails.push(`walls ${walls} != perfect-maze ${expected}`);
      const icons = [...document.querySelectorAll('[data-lcs-maze-icon]')].map((i) => i.dataset.lcsMazeIcon);
      if (!icons.includes('start') || !icons.includes('goal')) fails.push('missing start/goal icon');
      const wrap = document.querySelector('[data-lcs-solution-len]');
      const cols = +svg.dataset.lcsCols, rows = +svg.dataset.lcsRows;
      const len = +wrap.dataset.lcsSolutionLen;
      // the unique path must be a real journey, not a straight shot
      if (len < cols + rows - 1) fails.push(`solution length ${len} impossible`);
      if (len < Math.round(cols * rows * 0.25)) fails.push(`solution too short (${len}) — joyless maze`);
      return fails;
    });
  },
};
