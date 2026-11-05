/**
 * K-487 — Follow the Pattern Path (Mazes maker 2026-11-02, NEW-TEMPLATES §28 T6): a grid of stones from the start to
 * the flag; the way steps from stone to stone (up, down, left, right) in the order of the pattern shown at the top.
 * Exactly ONE way from the start to the flag follows the pattern (counted by a search over every way, stone by stone);
 * a stone a wrong turn reaches breaks the pattern.
 *
 * Levels (the patterns strand, then skip counting): 1 AB with two pictures, 5 × 5 stones · 2 ABC or AAB with three
 * pictures, 5 × 6 · 3 counting on by 2, 5 or 10, 6 × 6 stones with numbers. Pictures are the theme's, never two alike.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const { distinctPictures } = require('../../lib/distinct-pictures.js');
const slot = require('../../lib/slot.js');

const D = {
  1: { cols: 5, rows: 5, len: [9, 13], patterns: ['AB'], cell: 104 },
  2: { cols: 5, rows: 6, len: [11, 15], patterns: ['ABC', 'AAB'], cell: 96 },
  3: { cols: 6, rows: 6, len: [11, 15], steps: [2, 5, 10], cell: 88 },
};
const N4 = [[1, 0], [-1, 0], [0, 1], [0, -1]];

/** a random self-avoiding walk of exactly `len` cells from (0,0) to (cols-1, rows-1); null when none was found. The way never
 *  TOUCHES itself (no stone beside an earlier stone but the one before it), so the marked way reads as ONE way — a way that
 *  touched itself let a child step across from one leg to another (2026-11-04, the live gate: "not one way") */
function walk(rng, cols, rows, len) {
  const goal = [cols - 1, rows - 1], seen = new Set(['0,0']), path = [[0, 0]];
  let budget = 20000;
  const go = () => {
    if (--budget < 0) return false;
    const [x, y] = path[path.length - 1];
    const left = len - path.length;
    const md = Math.abs(goal[0] - x) + Math.abs(goal[1] - y);
    if (left === 0) return x === goal[0] && y === goal[1];
    if (md > left || (left - md) % 2) return false;
    for (const [dx, dy] of rng.shuffle(N4)) {
      const nx = x + dx, ny = y + dy, k = nx + ',' + ny;
      if (nx < 0 || ny < 0 || nx >= cols || ny >= rows || seen.has(k)) continue;
      if (nx === goal[0] && ny === goal[1] && left !== 1) continue;
      if (path.slice(0, -1).some(([px, py]) => Math.abs(px - nx) + Math.abs(py - ny) === 1)) continue;
      seen.add(k); path.push([nx, ny]);
      if (go()) return true;
      seen.delete(k); path.pop();
    }
    return false;
  };
  return go() ? path : null;
}

/** every way from (0,0) to the goal whose labels follow seq (label i of the way = seq[i]); stops at `cap` ways */
function waysFollowing(lab, cols, rows, seq, cap = 2) {
  const out = [], seen = new Set(['0,0']), path = [[0, 0]];
  const goalK = (cols - 1) + ',' + (rows - 1);
  if (lab[0][0] !== seq[0]) return out;
  const go = () => {
    if (out.length >= cap) return;
    const [x, y] = path[path.length - 1];
    if (x + ',' + y === goalK) { if (path.length === seq.length) out.push(path.slice()); return; }
    if (path.length >= seq.length) return;
    for (const [dx, dy] of N4) {
      const nx = x + dx, ny = y + dy, k = nx + ',' + ny;
      if (nx < 0 || ny < 0 || nx >= cols || ny >= rows || seen.has(k) || lab[ny][nx] !== seq[path.length]) continue;
      seen.add(k); path.push([nx, ny]); go(); seen.delete(k); path.pop();
    }
  };
  go();
  return out;
}

module.exports = {
  id: 'K-487',
  slug: 'pattern-path-maze',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'mazes',
  themeAxis: { applicable: true, minNouns: 6 },
  difficulty: D,
  i18n: {
    en: {
      title: 'Follow the Pattern Path',
      instruction: 'Look at the pattern at the top. Go from the arrow to the flag, stepping only on stones that follow the pattern.',
    },
  },

  build({ theme, difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const nouns = distinctPictures(theme, labelSafeNouns(theme));
    if (!d.steps && nouns.length < 6) throw new Error(`K-487: theme ${theme} has ${nouns.length} pictures < 6`);
    let made = null;
    for (let t = 0; t < 60 && !made; t++) {
      const len = rng.int(d.len[0], d.len[1]);
      const path = walk(rng, d.cols, d.rows, len);
      if (!path) continue;
      // the sequence the way follows, and the labels a stone may carry
      let seq, pattern, all;
      if (d.steps) {
        const step = rng.pick(d.steps);
        seq = path.map((_, i) => String(step * (i + 1)));
        pattern = seq.slice(0, 4);
        // the other stones: the sequence's own numbers (out of place) and near misses (one off a multiple)
        const near = []; for (let v = step; v <= step * (len + 2); v += step) near.push(String(v + 1), String(v - 1));
        all = [...new Set(seq.concat(near.filter((v) => +v > 0)))];
      } else {
        const kind = rng.pick(d.patterns);
        // the pattern's (2 or 3) + others for the stones off the way; a teacher's picture choice (maker), else as drawn
        const pics = slot.pictures(ctx, rng.sample(nouns, 5), nouns, theme);
        const unit = kind === 'AB' ? [0, 1] : kind === 'ABC' ? [0, 1, 2] : [0, 0, 1];
        seq = path.map((_, i) => pics[unit[i % unit.length]].noun);
        pattern = Array.from({ length: unit.length * 2 }, (_, i) => pics[unit[i % unit.length]].noun);
        all = pics.map((p) => p.noun);   // the pattern's pictures + two others
        made = { pics };
      }
      // fill every stone, then turn stones into others until exactly ONE way follows the pattern
      const lab = Array.from({ length: d.rows }, () => Array(d.cols).fill(null));
      path.forEach(([x, y], i) => { lab[y][x] = seq[i]; });
      const onPath = new Set(path.map((p) => p.join(',')));
      for (let y = 0; y < d.rows; y++) for (let x = 0; x < d.cols; x++) if (!onPath.has(x + ',' + y)) lab[y][x] = rng.pick(all);
      let ok = false;
      for (let fix = 0; fix < 80; fix++) {
        const ways = waysFollowing(lab, d.cols, d.rows, seq, 2);
        if (ways.length === 1) { ok = true; break; }
        const alt = ways.find((w) => w.some((p) => !onPath.has(p.join(','))));
        if (!alt) break;
        // the first stone of the other way that is not on the right one: something the pattern does not want there
        const p = alt.find((q) => !onPath.has(q.join(',')));
        const i = alt.indexOf(p);
        const bad = all.filter((v) => v !== seq[i]);
        lab[p[1]][p[0]] = rng.pick(bad);
      }
      if (ok) made = { ...(made || {}), path, seq, pattern, lab };
      else made = null;
    }
    if (!made || !made.lab) throw new Error('K-487: no grid with exactly one pattern way');
    const c = d.cell, W = d.cols * c, H = d.rows * c;
    const isNum = !!d.steps;
    const face = (v, px) => isNum
      ? `<span style="font:700 ${Math.round(px * 0.42)}px/1 'Baloo 2',cursive;color:${tokens.color.ink}">${v}</span>`
      : `<img src="${fileUri(theme, v)}" alt="" style="width:${px}px;height:${px}px;object-fit:contain" data-lcs-noun="${(made.pics.find((p) => p.noun === v) || {}).vocabKey || v}">`;
    const onPath = new Set(made.path.map((p) => p.join(',')));
    const stones = [];
    for (let y = 0; y < d.rows; y++) for (let x = 0; x < d.cols; x++) {
      stones.push(`<span class="ws-stone" data-lcs-pick="1"${onPath.has(x + ',' + y) ? ' data-lcs-correct=""' : ''} data-lcs-cell="${x},${y}" style="position:absolute;left:${x * c + 5}px;top:${y * c + 5}px;width:${c - 10}px;height:${c - 10}px;border-radius:50%;border:2.5px solid ${tokens.color.teal};background:#FFFFFF;display:flex;align-items:center;justify-content:center;box-sizing:border-box">${face(made.lab[y][x], Math.round(c * 0.6))}</span>`);
    }
    const startMark = `<span data-lcs-path-start="1" style="position:absolute;left:-34px;top:${c / 2 - 12}px;width:0;height:0;border-top:12px solid transparent;border-bottom:12px solid transparent;border-left:22px solid ${tokens.color.coral}"></span>`;
    const goalMark = `<svg xmlns="http://www.w3.org/2000/svg" data-lcs-path-goal="1" width="30" height="40" style="position:absolute;left:${W + 6}px;top:${H - c / 2 - 30}px"><rect x="2" y="2" width="3" height="36" fill="${tokens.color.inkSoft}"/><path d="M5 2 L28 9 L5 17 Z" fill="${tokens.color.coral}"/></svg>`;
    const strip = `<div data-lcs-pattern="${made.pattern.length}" style="display:flex;align-items:center;gap:8px;padding:8px 14px;border:2px dashed ${tokens.color.grid};border-radius:14px">${made.pattern.map((v) => `<span${isNum ? '' : slot.attr(ctx, 'pic', made.pics.findIndex((p) => p.noun === v))} style="width:${Math.round(c * 0.72)}px;height:${Math.round(c * 0.72)}px;border-radius:50%;border:2px solid ${tokens.color.teal};background:#FFFFFF;display:flex;align-items:center;justify-content:center">${face(v, Math.round(c * 0.5))}</span>`).join('')}<span style="font:700 24px/1 'Baloo 2',cursive;color:${tokens.color.inkSoft}">…</span></div>`;
    // the screen grades the EXACT way (the stones marked correct): the grid carries no data-lcs-want — a want made the
    // screen take "any N stones", so tapping as many stones as the way has, anywhere, scored (settings-space 2026-11-05)
    const body = `<div data-ws-content style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px">${strip}` +
      `<div data-lcs-choice="path" data-lcs-grid="${d.cols}x${d.rows}" data-lcs-seq="${made.seq.join('|')}" style="position:relative;width:${W}px;height:${H}px">${stones.join('')}${startMark}${goalMark}</div></div>`;
    return { bodyHtml: body, meta: { path: made.path.map((p) => p.join(',')).join(' '), seq: made.seq } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const G = document.querySelector('[data-lcs-grid]');
      if (!G) return ['no stone grid'];
      const [cols, rows] = G.dataset.lcsGrid.split('x').map(Number), seq = G.dataset.lcsSeq.split('|');
      const lab = Array.from({ length: rows }, () => Array(cols).fill(null));
      for (const s of G.querySelectorAll('[data-lcs-cell]')) {
        const [x, y] = s.dataset.lcsCell.split(',').map(Number);
        const im = s.querySelector('img');
        lab[y][x] = im ? im.getAttribute('src').split('/').pop() : s.textContent.trim();
      }
      // what each step of the sequence looks like on the page: the first stones of the marked way
      const marked = [...G.querySelectorAll('[data-lcs-correct]')];
      if (marked.length !== seq.length) fails.push(`${marked.length} stones marked for a way of ${seq.length}`);
      // count, from the PAGE, the ways from the top-left stone to the bottom-right one that follow the pattern of the
      // marked way's labels in order
      const want = [];
      { // the marked way in walking order: from (0,0), each next marked stone a neighbour
        const set = new Set(marked.map((s) => s.dataset.lcsCell)), order = ['0,0']; let cur = '0,0';
        while (order.length < set.size) { const [x, y] = cur.split(',').map(Number); const nx = [[1, 0], [-1, 0], [0, 1], [0, -1]].map(([dx, dy]) => (x + dx) + ',' + (y + dy)).find((k) => set.has(k) && !order.includes(k)); if (!nx) break; order.push(nx); cur = nx; }
        if (order.length !== set.size || cur !== (cols - 1) + ',' + (rows - 1)) fails.push('the marked stones are not one way from the start to the flag');
        for (const k of order) { const [x, y] = k.split(',').map(Number); want.push(lab[y][x]); }
      }
      let count = 0; const seen = new Set(['0,0']), path = [[0, 0]];
      const go = () => { if (count > 1) return; const [x, y] = path[path.length - 1]; if (x === cols - 1 && y === rows - 1) { if (path.length === want.length) count++; return; } if (path.length >= want.length) return;
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const nx = x + dx, ny = y + dy, k = nx + ',' + ny; if (nx < 0 || ny < 0 || nx >= cols || ny >= rows || seen.has(k) || lab[ny][nx] !== want[path.length]) continue; seen.add(k); path.push([nx, ny]); go(); seen.delete(k); path.pop(); } };
      if (lab[0][0] === want[0]) go();
      if (count !== 1) fails.push(`${count} ways from the start to the flag follow the pattern (exactly 1)`);
      // the way's labels repeat the pattern shown at the top
      const strip = document.querySelector('[data-lcs-pattern]');
      if (!strip) fails.push('no pattern strip');
      return fails;
    });
  },
};
