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
      instruction: 'Start at the top. Draw a path through the maze to reach the goal at the bottom.',
    },
  },

  build({ theme, difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const nouns = labelSafeNouns(theme);
    if (nouns.length < 2) throw new Error(`K-242: theme ${theme} has ${nouns.length} nouns < 2`);
    const [startNoun, goalNoun] = rng.sample(nouns, 2);

    const { walls, solution } = generateMaze({ cols: d.cols, rows: d.rows, rng });
    const m = renderMaze({ cols: d.cols, rows: d.rows, walls, cell: d.cell });
    const iconPx = Math.round(d.cell * 0.72);
    const start = m.cellRect(0, 0);
    const goal = m.cellRect(d.cols - 1, d.rows - 1);
    const place = (rect, noun, key, role) =>
      `<img class="ws-icon" src="${fileUri(theme, noun)}" alt="" data-lcs-maze-icon="${role}" data-lcs-noun="${key}" ` +
      `style="position:absolute;left:${(rect.x + (rect.w - iconPx) / 2 + 4).toFixed(1)}px;` +
      `top:${(rect.y + (rect.h - iconPx) / 2 + 4).toFixed(1)}px;width:${iconPx}px;height:${iconPx}px">`;

    // goal icon repeated beside the exit as the "destination" cue below the maze
    const bodyHtml =
      `<div data-ws-content data-lcs-solution-len="${solution.length}" ` +
      `style="flex:1;display:flex;align-items:center;justify-content:center">` +
      `<div style="position:relative;width:${m.width}px;height:${m.height}px">` +
      m.svg + place(start, startNoun.noun, startNoun.vocabKey, 'start') + place(goal, goalNoun.noun, goalNoun.vocabKey, 'goal') +
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
