/**
 * G1-129 — Hundreds chart: fill in the missing numbers.
 * Asset class 2 exemplar (numeral strips & charts) — the densest text grid.
 * Theme rides only in the corner flourish; the chart is the content.
 *
 * Level Set 2026-10-13 (PDF + interactive + key): level 1 the whole chart with 8 missing numbers, never two side by
 * side (the old level 1 was a half chart, half a page empty); level 2 the published page (12 missing); level 3 twenty
 * missing, among them two runs of three across and one run of three down (a whole bit of a row or a column to rebuild).
 */
'use strict';
const hundredsChart = require('../../primitives/hundreds-chart.js');
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const NCS = require('../../lib/number-charts-screen.js');

/** missing numbers of a level 1 / 3 page (never 1 or 100, the anchors) */
function pickMissing(rng, d) {
  const all = []; for (let v = d.start + 1; v < d.end; v++) all.push(v);
  const out = new Set();
  if (d.runs) {
    // two runs of three across (inside one row), one run of three down (one column), in different rows
    const rowsUsed = new Set();
    for (let t = 0; out.size < 6 && t < 200; t++) {
      const r = rng.int(0, 9), c = rng.int(0, 7);
      const run = [0, 1, 2].map((k) => 1 + r * 10 + c + k);
      if (rowsUsed.has(r) || run.some((v) => v <= d.start || v >= d.end || out.has(v))) continue;
      rowsUsed.add(r); run.forEach((v) => out.add(v));
    }
    for (let t = 0; out.size < 9 && t < 200; t++) {
      const r = rng.int(0, 7), c = rng.int(0, 9);
      const run = [0, 1, 2].map((k) => 1 + (r + k) * 10 + c);
      if (run.some((v) => v <= d.start || v >= d.end || out.has(v))) continue;
      run.forEach((v) => out.add(v));
    }
  }
  const near = (v) => [v - 1, v + 1, v - 10, v + 10].some((u) => out.has(u) && (Math.abs(u - v) === 10 || Math.floor((u - 1) / 10) === Math.floor((v - 1) / 10)));
  for (const v of rng.shuffle(all)) {
    if (out.size >= d.missing) break;
    if (out.has(v)) continue;
    if (d.isolated && near(v)) continue;
    out.add(v);
  }
  if (out.size !== d.missing) throw new Error('G1-129 level: could not place ' + d.missing + ' missing numbers');
  return [...out].sort((a, b) => a - b);
}

module.exports = {
  id: 'G1-129',
  slug: 'hundreds-chart-missing-numbers',
  gradeBand: 'G1',
  assetClass: 'numeral-charts',
  exerciseType: 'number-charts',
  themeAxis: { applicable: true, minNouns: 2, decorative: true },
  difficulty: {
    1: { v2: true, start: 1, end: 100, missing: 8, isolated: true },
    2: { start: 1, end: 100, missing: 12 },
    3: { v2: true, start: 1, end: 100, missing: 20, runs: true },
  },
  interactive: NCS.interactiveFor('choice', 'fill', 9600),
  i18n: {
    en: {
      title: 'The Hundreds Chart',
      instruction: 'Some numbers are hiding. Write each missing number in its box.',
    },
  },
  levelSetWords(m) { return (m.missing || []).map(String); },

  build(args, ctx) {
    const { theme, difficulty } = args;
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    let missing;
    if (d.v2) missing = pickMissing(rng, d);
    else {
      const all = [];
      for (let v = d.start + 1; v < d.end; v++) all.push(v);   // never blank the anchors
      missing = rng.sample(all, d.missing).sort((a, b) => a - b);
    }
    const cell = d.end <= 50 ? 64 : 60;
    const keyText = !!(ctx && ctx.answerKey && !ctx.interactive);
    const chart = hundredsChart({ start: d.start, end: d.end, missing, cell, keyText, ...(d.cellH ? { cellH: d.cellH } : {}) });

    // two small theme flourishes flank the chart bottom — decoration only
    const ns = rng.sample(labelSafeNouns(theme), 2);
    const flourish = (n, flip) =>
      `<img class="ws-icon" src="${fileUri(theme, n.noun)}" alt="" style="width:${d.flourish || 54}px;height:${d.flourish || 54}px${flip ? ';transform:scaleX(-1)' : ''}">`;

    const b = {
      bodyHtml:
        `<div data-ws-content style="flex:1 1 auto;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;min-height:0">` +
        chart.svg +
        `<div style="display:flex;justify-content:space-between;width:${chart.width}px;padding:0 6px">` +
        flourish(ns[0], false) + flourish(ns[1], true) +
        `</div></div>`,
      meta: chart.meta,
    };
    if (ctx && ctx.interactive) {
      // one card per missing number: its row and the rows above and below, the asked box with a "?"
      const qs = missing.map((v) => {
        const r = Math.floor((v - d.start) / 10), c = (v - d.start) % 10;
        const r0 = Math.max(0, r - 1), r1 = Math.min(Math.floor((d.end - d.start) / 10), r + 1);
        const s = d.start + r0 * 10, e = Math.min(d.end, d.start + r1 * 10 + 9);
        const part = hundredsChart({ start: s, end: e, missing: missing.filter((u) => u >= s && u <= e), cell: 50, ask: v });
        return { q: `hc:${d.start}:${r}:${c}`, prompt: `<div style="display:flex;justify-content:center">${part.svg}</div>`, ans: v, slips: [v - 1, v + 1, v - 10, v + 10], lo: d.start, hi: d.end };
      });
      const loc = (args.locale || 'en').slice(0, 2);
      return { bodyHtml: NCS.choiceScreen(qs, NCS.saltOf({ ...ctx, locale: loc, theme }, qs)), meta: b.meta };
    }
    return b;
  },

  /**
   * THE ITEM BANK of the unit checks (Part 7.6; docs/daily-teaching-system/PART-7-DESIGN.md "7.6"), 2026-11-19 (units
   * g1-hundreds-chart-skip-counting and k-teen-numbers-and-counting-to-100): the page is one chart, one task, and cannot
   * be cut. Here a card is three rows of the same chart (the level's own start and end; K-633 to 50), drawn by the same
   * primitive with square cells, with a few numbers hiding: two at level 1, three at level 2, four at level 3; never the
   * chart's first or last number, and where the level keeps its blanks apart (d.isolated) never two side by side or one
   * under the other. Every empty box carries its number as the answer (the key writes it in). The empty boxes stand last
   * in the drawing (on paper nothing moves: an empty box is drawn on an empty cell), so that two pieces with three empty
   * boxes are one kind of task wherever the boxes are — form B is held to form A's count and size, not to its places.
   */
  checkPage(args, ctx) {
    const { checkGrid } = require('../../lib/check-page.js');
    const d = this.difficulty[args.difficulty] || this.difficulty[2];
    const rng = ctx.rng;
    const rows = Math.ceil((d.end - d.start + 1) / 10), win = Math.min(3, rows);
    const n = ({ 1: 2, 2: 3, 3: 4 })[args.difficulty] || 3;
    const touch = (u, v) => Math.abs(u - v) === 10 || (Math.abs(u - v) === 1 && Math.floor((u - d.start) / 10) === Math.floor((v - d.start) / 10));
    const cards = [], seen = new Set();
    for (let t = 0; cards.length < 8 && t < 400; t++) {
      const s = d.start + rng.int(0, rows - win) * 10, e = Math.min(d.end, s + win * 10 - 1);
      const all = []; for (let v = s; v <= e; v++) if (v !== d.start && v !== d.end) all.push(v);
      // (2026-11-19, review en-1119-math: form A hid three cells inside rows, form B two at the ends of rows, which need the
      // down-the-column pattern and are harder) from three empty boxes up, exactly one stands at the end of a row (the first
      // or the last number of its row), the others inside rows; never two side by side or one under the other
      const isEnd = (v) => v % 10 === 1 || v % 10 === 0, ends = n >= 3 ? 1 : 0;
      const miss = rng.sample(all.filter(isEnd), ends).concat(rng.sample(all.filter((v) => !isEnd(v)), n - ends)).sort((a, b) => a - b);
      if (miss.some((v) => miss.some((u) => u !== v && touch(u, v)))) continue;
      const k = s + ':' + miss.join(','); if (seen.has(k)) continue; seen.add(k);
      let svg = hundredsChart({ start: s, end: e, missing: miss, cell: 56 }).svg;
      const boxes = [];
      svg = svg.replace(/<rect([^>]*?) data-lcs-missing="(\d+)"\/>/g, (m, a, v) => { boxes.push(`<rect${a} data-lcs-missing="${v}" data-lcs-answer="${v}"/>`); return ''; });
      if (boxes.length !== n) throw new Error(this.id + ' checkPage: ' + boxes.length + ' empty boxes');
      cards.push(`<div class="ws-card-stage" style="justify-content:center;padding:4px">${svg.replace('</svg>', boxes.join('') + '</svg>')}</div>`);
    }
    if (cards.length < 6) throw new Error(this.id + ' checkPage: ' + cards.length + ' pieces of the chart');
    return { bodyHtml: checkGrid(cards), meta: {} };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const svg = document.querySelector('[data-lcs-prim="hundreds-chart"]');
      if (document.querySelector('[data-lcs-screen]')) return fails;
      const start = parseInt(svg.dataset.lcsStart, 10), end = parseInt(svg.dataset.lcsEnd, 10);
      const cells = [...svg.querySelectorAll('[data-lcs-cell]')].map((e) => parseInt(e.dataset.lcsCell, 10));
      const missing = [...svg.querySelectorAll('[data-lcs-missing]')].map((e) => parseInt(e.dataset.lcsMissing, 10));
      // every value start..end appears exactly once, as numeral XOR blank
      const seen = new Set();
      [...cells, ...missing].forEach((v) => {
        if (seen.has(v)) fails.push(`value ${v} appears twice`);
        seen.add(v);
      });
      for (let v = start; v <= end; v++) if (!seen.has(v)) fails.push(`value ${v} absent`);
      cells.forEach((v) => { if (missing.includes(v)) fails.push(`value ${v} both numeral and blank`); });
      // numerals visibly correct: each label's text equals its declared value
      svg.querySelectorAll('[data-lcs-cell]').forEach((e) => {
        if (e.textContent.trim() !== e.dataset.lcsCell) fails.push(`cell text ${e.textContent} != ${e.dataset.lcsCell}`);
      });
      return fails;
    });
  },
};
