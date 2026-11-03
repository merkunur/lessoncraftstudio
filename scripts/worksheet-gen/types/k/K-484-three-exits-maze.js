/**
 * K-484 — Which Exit? (Mazes maker 2026-11-02, NEW-TEMPLATES §28 T5): reasoning about where a maze LEADS, not only
 * tracing it. Each maze has its start on the left and two or three numbered exits on the right; walls close every exit
 * but one. The child follows the corridors and circles the number of the exit the start reaches.
 *
 * Built from a perfect maze (lib/maze.js: every cell reaches every cell by exactly one way): for each wrong exit one
 * corridor on its way back to the start is walled, a few cells in (never at the exit itself, never on the right exit's
 * way), so its whole branch is sealed off. A search over the drawn walls then proves the start reaches the right exit
 * and no other. On a page the right exits are spread over the positions (never the same number every time).
 *
 * Levels: 1 four mazes 5 × 5, two exits · 2 four mazes 6 × 6, three exits · 3 two big mazes 10 × 8, three exits.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { generateMaze, renderMaze, wallKey } = require('../../lib/maze.js');

const D = {
  // sized to the card: a 2 × 2 card is ~320 × 340 px (maze + start arrow 34 + exit numbers 46 across), a full-width one
  // ~650 × 340
  1: { mazes: 4, cols: 5, rows: 5, exits: 2, cell: 48 },
  2: { mazes: 4, cols: 6, rows: 6, exits: 3, cell: 40 },
  3: { mazes: 2, cols: 10, rows: 8, exits: 3, cell: 40 },
};

const { reach, wayBetween } = require('../../lib/maze-ways.js');

/** one maze: start row sy on the left, exits at rows `ex` on the right, the right one ex[ok]; null when no fair cut exists */
function oneMaze(rng, d, ok) {
  const { walls } = generateMaze({ cols: d.cols, rows: d.rows, rng });
  const sy = rng.int(1, d.rows - 2);
  const rowsAt = d.exits === 2 ? [1, d.rows - 2] : [0, Math.floor(d.rows / 2), d.rows - 1];
  const ex = rowsAt.map((r) => [d.cols - 1, r]);
  const start = [0, sy];
  const good = wayBetween(walls, d.cols, d.rows, start, ex[ok]);
  if (good.length < d.cols + 2) return null;   // the right way must wander, not run straight across
  const onGood = new Set(good.slice(0, -1).map((c, i) => wallKey(c[0], c[1], good[i + 1][0], good[i + 1][1])));
  for (let i = 0; i < ex.length; i++) {
    if (i === ok) continue;
    const way = wayBetween(walls, d.cols, d.rows, ex[i], start);
    // the corridors on this exit's way back that the right way does not use (in a tree, walling ANY of them seals the
    // exit off), from the 2nd step on — a wall in the exit's own doorway would show at a glance which exits are dead
    const cand = [];
    for (let k = 1; k < way.length - 1; k++) { const w = wallKey(way[k][0], way[k][1], way[k + 1][0], way[k + 1][1]); if (!onGood.has(w)) cand.push(w); }
    if (!cand.length) return null;
    walls.add(cand[rng.int(0, Math.min(cand.length - 1, 4))]);
  }
  const R = reach(walls, d.cols, d.rows, start[0], start[1]);
  const hits = ex.map((e) => R.has(e.join(',')));
  if (!hits[ok] || hits.filter(Boolean).length !== 1) return null;
  return { walls, sy, ex, ok };
}

module.exports = {
  id: 'K-484',
  slug: 'which-exit-maze',
  gradeBand: 'K',
  assetClass: 'none',
  exerciseType: 'mazes',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: {
    en: {
      title: 'Which Exit? Maze Puzzles',
      instruction: 'Start at the arrow. Follow the paths with your finger. Only one exit is open: circle its number.',
    },
  },

  build({ difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    // the right exits of the page: every position as often as possible, in a shuffled order
    const oks = rng.shuffle(Array.from({ length: d.mazes }, (_, i) => i % d.exits));
    const mazes = oks.map((ok) => { for (let t = 0; t < 200; t++) { const m = oneMaze(rng, d, ok); if (m) return m; } throw new Error('K-484: no fair maze'); });
    const cards = mazes.map((m, i) => {
      const r = renderMaze({ cols: d.cols, rows: d.rows, walls: m.walls, cell: d.cell });
      // the border: open at the start (left) and the exits (right) — renderMaze opens top-left / bottom-right; the
      // openings of this page are drawn instead: the outer frame rebuilt with gaps
      const W = d.cols * d.cell, H = d.rows * d.cell, c = d.cell;
      const inner = r.svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '').split('/>').filter((x) => /data-lcs-wall/.test(x)).map((x) => x + '/>').join('');
      const frame = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${tokens.color.teal}" stroke-width="3.5" stroke-linecap="round"/>`;
      const segs = [frame(0, 0, W, 0), frame(0, H, W, H), frame(0, 0, 0, m.sy * c), frame(0, (m.sy + 1) * c, 0, H)];
      const exitRows = m.ex.map((e) => e[1]).sort((a, b) => a - b);
      let y0 = 0;
      for (const er of exitRows) { if (er * c > y0) segs.push(frame(W, y0, W, er * c)); y0 = (er + 1) * c; }
      if (y0 < H) segs.push(frame(W, y0, W, H));
      const arrow = `<path d="M -26 ${(m.sy + 0.5) * c - 9} L -8 ${(m.sy + 0.5) * c} L -26 ${(m.sy + 0.5) * c + 9} Z" fill="${tokens.color.coral}"/>`;
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W + 34}" height="${H + 8}" viewBox="-30 -4 ${W + 34} ${H + 8}" role="img" aria-label="maze" data-lcs-prim="maze" data-lcs-cols="${d.cols}" data-lcs-rows="${d.rows}" data-lcs-exit-maze="${i + 1}" data-lcs-start-row="${m.sy}" data-lcs-exit-rows="${m.ex.map((e) => e[1]).join(',')}">${segs.join('')}${inner}${arrow}</svg>`;
      // the exit numbers: chips beside each opening (the right one marked for the key and the screen)
      const chips = m.ex.map((e, k) => `<span class="ws-numchip" data-lcs-exit="${k + 1}"${k === m.ok ? ' data-lcs-correct=""' : ''} style="position:absolute;left:${W + 34 + 6}px;top:${(e[1] + 0.5) * c + 4 - 17}px;width:34px;height:34px;display:flex;align-items:center;justify-content:center;font:700 20px/1 'Baloo 2',cursive;border:2.5px solid ${tokens.color.teal};border-radius:50%;background:#FFFFFF;color:${tokens.color.ink}">${k + 1}</span>`).join('');
      return `<section class="ws-card" data-lcs-card="${i + 1}" style="display:flex;align-items:center;justify-content:center"><div data-lcs-choice="exit-${i + 1}" style="position:relative;width:${W + 34 + 46}px;height:${H + 8}px">${svg}${chips}</div></section>`;
    });
    const cols = d.mazes === 2 ? 1 : 2;
    const body = `<div class="ws-cardgrid" data-ws-content style="grid-template-columns:repeat(${cols},minmax(0,1fr));grid-template-rows:repeat(${Math.ceil(d.mazes / cols)},minmax(0,1fr))">${cards.join('')}</div>`;
    return { bodyHtml: body, meta: { exits: mazes.map((m) => m.ok + 1) } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const svgs = [...document.querySelectorAll('svg[data-lcs-exit-maze]')];
      if (svgs.length < 2) return [`only ${svgs.length} mazes`];
      const key = (x1, y1, x2, y2) => (x1 < x2 || (x1 === x2 && y1 < y2) ? `${x1},${y1}|${x2},${y2}` : `${x2},${y2}|${x1},${y1}`);
      const answers = [];
      svgs.forEach((svg, i) => {
        // the page's own walls → which exits the start reaches (the chips must agree)
        const cols = +svg.dataset.lcsCols, rows = +svg.dataset.lcsRows, sy = +svg.dataset.lcsStartRow;
        const exits = svg.dataset.lcsExitRows.split(',').map(Number);
        const walls = new Set([...svg.querySelectorAll('[data-lcs-wall]')].map((w) => w.dataset.lcsWall));
        const seen = new Set(['0,' + sy]), q = [[0, sy]];
        while (q.length) { const [x, y] = q.shift(); for (const [a, b] of [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]]) { if (a < 0 || b < 0 || a >= cols || b >= rows) continue; const k = a + ',' + b; if (!seen.has(k) && !walls.has(key(x, y, a, b))) { seen.add(k); q.push([a, b]); } } }
        const open = exits.map((r) => seen.has((cols - 1) + ',' + r));
        if (open.filter(Boolean).length !== 1) fails.push(`maze ${i + 1}: ${open.filter(Boolean).length} exits reachable (exactly 1)`);
        const chips = [...svg.parentElement.querySelectorAll('[data-lcs-exit]')];
        if (chips.length !== exits.length) fails.push(`maze ${i + 1}: ${chips.length} exit numbers for ${exits.length} exits`);
        const marked = chips.filter((c) => c.hasAttribute('data-lcs-correct')).map((c) => +c.dataset.lcsExit - 1);
        if (marked.length !== 1 || !open[marked[0]]) fails.push(`maze ${i + 1}: the marked exit is not the open one`);
        answers.push(marked[0]);
      });
      if (svgs.length >= 3 && new Set(answers).size === 1) fails.push('every maze has the same right exit');
      return fails;
    });
  },
};
