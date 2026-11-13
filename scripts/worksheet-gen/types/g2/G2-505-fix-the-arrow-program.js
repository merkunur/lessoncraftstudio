/**
 * G2-505 — Fix the Arrow Program (Year pages M, 2026-11-13; sv Lgr22 åk 1-3 "stegvisa instruktioner … hur de
 * konstrueras, beskrivs och följs", testing and correcting them; a first debugging task): six small grids, each with a
 * start (a flag), a goal (a star) and under it a program of arrows, one arrow a square. The program does NOT reach the
 * star: exactly one arrow is wrong. The child follows the program with a pencil, circles the wrong arrow and draws the
 * right arrow in the box under it.
 *
 * One right answer by construction AND by proof: of all the ways to change ONE arrow of the printed program into
 * another direction, exactly one ends on the star, counted on a board without edges, so that no second "repair"
 * exists even for a child who walks off the grid (every candidate is tried; verify tries them again on the rendered
 * page); the one repair stays on the grid. The printed program itself stays on the grid and never crosses the star; the right
 * program never visits a square twice.
 * Levels: 1 a 4 × 4 grid, four arrows · 2 a 5 × 5 grid, five arrows · 3 a 6 × 6 grid, seven arrows.
 * No words on a card: the page is the same in every language but for its title and instruction. Printed page only.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { n: 4, k: 4, cell: 30 }, 2: { n: 5, k: 5, cell: 26 }, 3: { n: 6, k: 7, cell: 22 } };
const DIRS = ['up', 'right', 'down', 'left'];
const DELTA = { up: [-1, 0], right: [0, 1], down: [1, 0], left: [0, -1] };
const ROT = { up: 0, right: 90, down: 180, left: 270 };
const arrow = (dir, px, color) => `<svg width="${px}" height="${px}" viewBox="0 0 24 24" style="flex:0 0 auto;display:block" aria-hidden="true"><g transform="rotate(${ROT[dir]} 12 12)"><path d="M12 3 L19 11 L14.5 11 L14.5 21 L9.5 21 L9.5 11 L5 11 Z" fill="${color || T.teal}"/></g></svg>`;

/** where a program ends from `start` on an n × n grid; null when it leaves the grid. `cells` = every square it stands on */
function run(n, start, prog) {
  let [r, c] = start; const cells = [[r, c]];
  for (const d of prog) { r += DELTA[d][0]; c += DELTA[d][1]; if (r < 0 || r >= n || c < 0 || c >= n) return null; cells.push([r, c]); }
  return { end: [r, c], cells };
}
/** every way to change ONE arrow so that the program ends on the goal: [[index, direction], …]. A change counts even
 *  when its path steps OFF the grid on the way: a child who does not notice the edge finds that "repair" too (native
 *  reader, 2026-11-13: two cards of six had such a second answer), so the count is taken on a board without edges. */
function repairs(n, start, goal, prog) {
  const out = [];
  for (let i = 0; i < prog.length; i++) for (const d of DIRS) {
    if (d === prog[i]) continue;
    const q = prog.slice(); q[i] = d;
    let [r, c] = start; for (const x of q) { r += DELTA[x][0]; c += DELTA[x][1]; }
    if (r === goal[0] && c === goal[1]) out.push([i, d]);
  }
  return out;
}
function puzzle(n, k, rng) {
  for (let t = 0; t < 4000; t++) {
    // the right program: k single steps, never onto a square it has stood on
    const start = [rng.int(0, n - 1), rng.int(0, n - 1)]; let [r, c] = start; const seen = new Set([r + ',' + c]), good = [];
    for (let i = 0; i < k; i++) {
      const opts = DIRS.filter((d) => { const nr = r + DELTA[d][0], nc = c + DELTA[d][1]; return nr >= 0 && nr < n && nc >= 0 && nc < n && !seen.has(nr + ',' + nc); });
      if (!opts.length) break;
      const d = rng.pick(opts); good.push(d); r += DELTA[d][0]; c += DELTA[d][1]; seen.add(r + ',' + c);
    }
    if (good.length < k) continue;
    const goal = [r, c];
    if (new Set(good).size < 2) continue;   // a program of one direction only is a straight line: nothing to follow
    // the wrong arrow: one position, another direction
    const i = rng.int(0, k - 1), wrong = rng.pick(DIRS.filter((d) => d !== good[i]));
    const bad = good.slice(); bad[i] = wrong;
    const res = run(n, start, bad);
    if (!res) continue;                                                              // the printed program stays on the grid
    if (res.cells.some(([a, b]) => a === goal[0] && b === goal[1])) continue;        // and never stands on the star
    const fix = repairs(n, start, goal, bad);
    if (fix.length !== 1 || fix[0][0] !== i || fix[0][1] !== good[i]) continue;      // one repair, and it is ours
    return { n, start, goal, prog: bad, bug: i, fix: good[i] };
  }
  throw new Error('G2-505: no puzzle with exactly one repair');
}

module.exports = {
  id: 'G2-505',
  slug: 'fix-the-arrow-program',
  gradeBand: 'G2',
  assetClass: 'numeral-charts',
  exerciseType: 'maps',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Fix the Arrow Program', instruction: 'Follow the arrows from the flag. One arrow is wrong: the path does not end on the star. Circle the wrong arrow and draw the right arrow in the box under it.' } },
  levelSetWords(m) { return (m.items || []).map(String); },
  run, repairs,

  build(args, ctx) {
    const d = this.difficulty[args.difficulty] || this.difficulty[2];
    const rng = ctx.rng, key = !!(ctx && ctx.answerKey);
    const used = new Set(), ps = [];
    for (let t = 0; ps.length < 6 && t < 200; t++) {
      const p = puzzle(d.n, d.k, rng);
      const sig = p.start.join() + '|' + p.prog.join('');
      // no two cards of a page with the same program, and the wrong arrow not always in the same place
      if (used.has(sig) || ps.filter((q) => q.bug === p.bug).length >= 2) continue;
      used.add(sig); ps.push(p);
    }
    if (ps.length < 6) throw new Error('G2-505: not enough puzzles');
    const C = d.cell, box = Math.min(34, Math.floor(300 / d.k) - 6);
    const cards = ps.map((p) => {
      const W = p.n * C;
      let g = '';
      for (let i = 0; i <= p.n; i++) g += `<line x1="${i * C}" y1="0" x2="${i * C}" y2="${W}" stroke="${T.grid}" stroke-width="1.5"/><line x1="0" y1="${i * C}" x2="${W}" y2="${i * C}" stroke="${T.grid}" stroke-width="1.5"/>`;
      const cx = (cell) => cell[1] * C + C / 2, cy = (cell) => cell[0] * C + C / 2;
      // the flag (start) and the star (goal), drawn: the page fonts have no such glyphs
      const f = C * 0.3;
      const flag = `<g data-lcs-start><line x1="${cx(p.start) - f * 0.6}" y1="${cy(p.start) - f}" x2="${cx(p.start) - f * 0.6}" y2="${cy(p.start) + f}" stroke="${T.ink}" stroke-width="2.2" stroke-linecap="round"/><path d="M${cx(p.start) - f * 0.6} ${cy(p.start) - f} L${cx(p.start) + f} ${cy(p.start) - f * 0.45} L${cx(p.start) - f * 0.6} ${cy(p.start) + f * 0.1} Z" fill="${T.teal}"/></g>`;
      const sr = C * 0.36, pts = Array.from({ length: 10 }, (_, i) => { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? sr * 0.45 : sr; return (cx(p.goal) + rr * Math.cos(a)).toFixed(1) + ',' + (cy(p.goal) + rr * Math.sin(a)).toFixed(1); }).join(' ');
      const star = `<polygon data-lcs-goal points="${pts}" fill="${T.coral}"/>`;
      // the key draws the right path
      let path = '';
      if (key) { const q = p.prog.slice(); q[p.bug] = p.fix; const cells = run(p.n, p.start, q).cells; path = `<polyline points="${cells.map((c) => cx(c) + ',' + cy(c)).join(' ')}" fill="none" stroke="${T.coral}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.7" data-lcs-key-sample="1"/>`; }
      const grid = `<svg width="${W + 2}" height="${W + 2}" viewBox="-1 -1 ${W + 2} ${W + 2}" data-lcs-grid="${p.n}"><rect x="0" y="0" width="${W}" height="${W}" fill="${T.white}"/>${g}${path}${flag}${star}</svg>`;
      const steps = p.prog.map((dir, i) => {
        const ring = key && i === p.bug ? `box-shadow:0 0 0 3px ${T.coral};` : '';
        return `<span style="display:flex;flex-direction:column;align-items:center;gap:4px">` +
          `<span data-lcs-step="${dir}" style="width:${box}px;height:${box}px;display:flex;align-items:center;justify-content:center;background:${T.white};border:2px solid ${T.creamDeep};border-radius:50%;${ring}">${arrow(dir, Math.round(box * 0.7))}</span>` +
          `<span data-lcs-fixbox style="width:${box}px;height:${box}px;display:flex;align-items:center;justify-content:center;background:${T.white};border:2px dashed ${T.grid};border-radius:8px">${key && i === p.bug ? arrow(p.fix, Math.round(box * 0.7), T.coral) : ''}</span></span>`;
      }).join('');
      return `<div class="ws-card-stage" data-lcs-bug="${p.start.join(',')}|${p.goal.join(',')}|${p.prog.join(',')}|${p.bug}|${p.fix}" style="flex-direction:column;justify-content:center;align-items:center;gap:8px">${grid}<span style="display:flex;gap:5px;align-items:flex-start">${steps}</span></div>`;
    });
    return { bodyHtml: `<div data-ws-content data-lcs-bugs="${d.n}" style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0">${cardGrid({ cards, cols: 2, rows: 3 })}</div>`, meta: { items: ps.map((p) => p.start.join('') + p.prog.map((x) => x[0]).join('') + p.bug) } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const DELTA = { up: [-1, 0], right: [0, 1], down: [1, 0], left: [0, -1] }, DIRS = Object.keys(DELTA);
      const box = document.querySelector('[data-lcs-bugs]'); if (!box) return ['no content'];
      const n = +box.dataset.lcsBugs;
      const run = (start, prog) => { let [r, c] = start; const cells = [[r, c]]; for (const d of prog) { r += DELTA[d][0]; c += DELTA[d][1]; if (r < 0 || r >= n || c < 0 || c >= n) return null; cells.push([r, c]); } return { end: [r, c], cells }; };
      const cards = [...document.querySelectorAll('[data-lcs-bug]')];
      if (cards.length !== 6) fails.push(cards.length + ' cards');
      const seen = new Set();
      cards.forEach((card, i) => {
        const P = 'card ' + (i + 1);
        const [s, g, pr, bug, fix] = card.dataset.lcsBug.split('|'); const start = s.split(',').map(Number), goal = g.split(',').map(Number), prog = pr.split(',');
        if (seen.has(s + pr)) fails.push(P + ': the same program twice on the page'); seen.add(s + pr);
        const res = run(start, prog);
        if (!res) { fails.push(P + ': the printed program leaves the grid'); return; }
        if (res.cells.some(([a, b]) => a === goal[0] && b === goal[1])) fails.push(P + ': the printed program stands on the star');
        const reps = [];
        // counted without edges: a change whose path leaves the grid and still nets out on the star is a second answer
        for (let k = 0; k < prog.length; k++) for (const d of DIRS) { if (d === prog[k]) continue; const q = prog.slice(); q[k] = d; let [r, c] = start; for (const x of q) { r += DELTA[x][0]; c += DELTA[x][1]; } if (r === goal[0] && c === goal[1]) reps.push(k + d); }
        { const q = prog.slice(); q[+bug] = fix; if (!run(start, q)) fails.push(P + ': the right program leaves the grid'); }
        if (reps.length !== 1 || reps[0] !== bug + fix) fails.push(P + ': ' + reps.length + ' repairs (' + reps.join(' ') + '), the key says ' + bug + fix);
        // what is drawn is what the stamps say
        const drawn = [...card.querySelectorAll('[data-lcs-step]')].map((e) => e.dataset.lcsStep);
        if (drawn.join() !== prog.join()) fails.push(P + ': the arrows drawn are not the program');
        if (card.querySelectorAll('[data-lcs-fixbox]').length !== prog.length) fails.push(P + ': a box under every arrow');
        if (!card.querySelector('[data-lcs-start]') || !card.querySelector('[data-lcs-goal]')) fails.push(P + ': flag or star missing');
        const cr = card.getBoundingClientRect();
        card.querySelectorAll('*').forEach((e) => { const r = e.getBoundingClientRect(); if (r.width && (r.right > cr.right + 1 || r.left < cr.left - 1 || r.bottom > cr.bottom + 1 || r.top < cr.top - 1)) fails.push(P + ': something runs out of it'); });
      });
      return [...new Set(fails)];
    });
  },
};
