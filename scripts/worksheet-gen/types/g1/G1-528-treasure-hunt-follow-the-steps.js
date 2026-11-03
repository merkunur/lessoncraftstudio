/**
 * G1-528 — Treasure Hunt: Follow the Steps (Maps & Coordinates maker 2026-11-03, NEW-TEMPLATES §54 T1, the old
 * treasure-hunt app's core kept; K.G.A.1 position + 2nd-grade map skills, de "Wege beschreiben", sv "följa en
 * vägbeskrivning"): a grid of pictures, the start marked with a flag, and the steps to follow (Move 2 squares right.
 * Move 1 square up …); the child follows them and circles the picture where she lands. The move sentences are the old
 * app's per-language frames (data/maps/maps-new.js: the word order and the direction phrase are the language's, the
 * number agrees with the unit — 1 Feld / 2 Felder, 1 ruutu / 2 ruutua). Every picture on the grid is different, the route
 * never leaves the grid and never ends on the start. Each picture is a choice; the landing one is ringed on the key.
 * Levels: 1 a 4 × 4 grid, two steps, arrows and words · 2 a 5 × 5 grid, three steps · 3 a 5 × 5 grid, four steps in
 * compass directions (north, east, south, west; a compass rose beside the grid).
 */
'use strict';
const { fileUri } = require('../../lib/b2-common.js');
const { labelSafeNouns } = require('../../image-cache/resolve.js');
const { refusedPicture } = require('../../lib/picture-refusals.js');
const { compassRose } = require('../../primitives/compass-rose.js');
const B5 = require('../../lib/b5-common.js');
const { MAPS_NEW, DELTA } = require('../../data/maps/maps-new.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { n: 4, steps: 2, compass: false }, 2: { n: 5, steps: 3, compass: false }, 3: { n: 5, steps: 4, compass: true } };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// an arrow drawn (not a text glyph: the page fonts have none)
const ARROW = { up: 0, right: 90, down: 180, left: 270 };
const arrow = (dir, px = 26) => `<svg width="${px}" height="${px}" viewBox="0 0 24 24" style="vertical-align:middle;flex:0 0 auto" aria-hidden="true"><g transform="rotate(${ARROW[dir]} 12 12)"><path d="M12 3 L19 11 L14.5 11 L14.5 21 L9.5 21 L9.5 11 L5 11 Z" fill="${T.teal}"/></g></svg>`;

/** a route of `k` moves from (r, c) that stays on the n × n grid and does not end where it began */
function route(n, k, rng, dirs) {
  for (let t = 0; t < 500; t++) {
    const start = [rng.int(0, n - 1), rng.int(0, n - 1)], moves = [];
    let [r, c] = start, ok = true;
    for (let i = 0; i < k && ok; i++) {
      const opts = [];
      for (const dir of dirs) for (let s = 1; s <= 3; s++) {
        const [dr, dc] = DELTA[dir], nr = r + dr * s, nc = c + dc * s;
        // every move turns a corner: never straight back (a step undone) and never on the same way (two moves that are one)
        const prev = moves.length ? DELTA[moves[moves.length - 1].dir] : null;
        const back = prev && prev.every((v, j) => v === -[dr, dc][j]), same = prev && prev.every((v, j) => v === [dr, dc][j]);
        if (nr >= 0 && nr < n && nc >= 0 && nc < n && !back && !same) opts.push({ dir, steps: s, to: [nr, nc] });
      }
      if (!opts.length) { ok = false; break; }
      const m = rng.pick(opts);
      moves.push(m); [r, c] = m.to;
    }
    if (ok && !(r === start[0] && c === start[1])) return { start, moves, end: [r, c] };
  }
  throw new Error('G1-528: no route');
}

module.exports = {
  id: 'G1-528',
  slug: 'treasure-hunt-follow-the-steps',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'maps',
  themeAxis: { applicable: true, minNouns: 16, excludeBw: true },
  difficulty: D,
  i18n: { en: { title: 'Treasure Hunt: Follow the Steps', instruction: 'Start at the flag. Follow the steps. Circle the picture where you land.' } },
  route,

  build({ theme, difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = String(locale || 'en').slice(0, 2);
    const M = MAPS_NEW[L];
    const pool = labelSafeNouns(theme).filter((x) => !refusedPicture(theme, x.noun));
    if (pool.length < d.n * d.n) throw new Error(`G1-528: theme ${theme} has ${pool.length} pictures (< ${d.n * d.n})`);
    const pics = rng.sample(pool, d.n * d.n);
    const dirs = d.compass ? ['north', 'east', 'south', 'west'] : ['up', 'right', 'down', 'left'];
    const { start, moves, end } = route(d.n, d.steps, rng, dirs);
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    const cell = d.n === 4 ? 118 : d.compass ? 92 : 100;   // level 3 leaves room for the compass rose
    const at = (r, c) => pics[r * d.n + c];
    const startPic = at(start[0], start[1]);
    const cells = [];
    for (let r = 0; r < d.n; r++) for (let c = 0; c < d.n; c++) {
      const isStart = r === start[0] && c === start[1], isEnd = r === end[0] && c === end[1];
      cells.push(`<div class="ws-th-cell" data-lcs-th-cell="${r}-${c}"${mark && isEnd ? ' data-lcs-correct="1"' : ''} data-lcs-label="${esc(String.fromCharCode(65 + c) + (r + 1))}" style="position:relative;width:${cell}px;height:${cell}px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;background:${isStart ? T.cream : '#FFFFFF'};border-radius:10px">` +
        `<img class="ws-icon" src="${fileUri(theme, at(r, c).noun)}" alt="" style="width:${cell - 26}px;height:${cell - 26}px;object-fit:contain">` +
        (isStart ? `<svg width="30" height="30" viewBox="0 0 24 24" style="position:absolute;top:3px;left:3px" aria-hidden="true" data-lcs-th-start><path d="M5 22 L5 2" stroke="${T.ink}" stroke-width="2.2"/><path d="M5.5 3 L19 7 L5.5 11 Z" fill="${T.coral}"/></svg>` : '') + '</div>');
    }
    const grid = `<div data-lcs-th-grid style="display:grid;grid-template-columns:repeat(${d.n},${cell}px);gap:4px;padding:4px;background:${T.grid};border:3px solid ${T.teal};border-radius:14px">${cells.join('')}</div>`;
    const startImg = `<img class="ws-icon" src="${fileUri(theme, startPic.noun)}" alt="" style="width:34px;height:34px;object-fit:contain;vertical-align:middle">`;
    const lines = [`<div data-lcs-th-step="0">${esc(M.start).replace('{pic}', startImg)}</div>`].concat(moves.map((m, i) => {
      const s = M.move.replace('{steps}', String(m.steps)).replace('{unit}', M.unit[m.steps === 1 ? 0 : 1]).replace('{dir}', M.dirs[m.dir]);
      return `<div data-lcs-th-step="${i + 1}" style="display:flex;align-items:center;gap:10px"><span style="flex:0 0 28px;height:28px;border-radius:14px;background:${T.teal};color:#FFFFFF;display:inline-flex;align-items:center;justify-content:center;font:700 16px/1 'Baloo 2',cursive">${i + 1}</span>${d.compass ? '' : arrow(m.dir)}<span>${esc(s)}</span></div>`;
    }));
    const steps = `<div data-lcs-th-steps style="display:flex;flex-direction:column;gap:10px;padding:12px 16px;border-radius:14px;background:${T.cream};font:700 22px/1.3 'Nunito',sans-serif;color:${T.ink}">${lines.join('')}</div>`;
    const rose = d.compass ? compassRose({ px: 120, letters: B5.bank('maps', L).dirLetters, reference: true }).svg : '';
    return {
      bodyHtml: `<div data-ws-content data-lcs-treasure style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:space-evenly;gap:16px;min-height:0">` +
        `<div style="display:flex;align-items:center;gap:18px">${grid}${rose ? `<div style="flex:0 0 auto">${rose}</div>` : ''}</div>${steps}</div>`,
      meta: { start, end, moves: moves.map((m) => `${m.dir} ${m.steps}`) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const cells = [...document.querySelectorAll('[data-lcs-th-cell]')];
      if (cells.length < 16) fails.push(`${cells.length} cells`);
      if (document.querySelectorAll('[data-lcs-th-start]').length !== 1) fails.push('not one start flag');
      const srcs = cells.map((c) => c.querySelector('img').getAttribute('src'));
      if (new Set(srcs).size !== srcs.length) fails.push('a picture twice on the grid');
      const root = document.querySelector('[data-lcs-treasure]').getBoundingClientRect();
      document.querySelectorAll('[data-lcs-th-grid], [data-lcs-th-steps]').forEach((e) => { const r = e.getBoundingClientRect(); if (r.right > root.right + 1 || r.bottom > root.bottom + 1) fails.push('a block leaves the page'); });
      document.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push('a picture did not load'); });
      return fails;
    });
  },
};
