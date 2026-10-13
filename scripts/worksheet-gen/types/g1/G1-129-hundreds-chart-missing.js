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
    const chart = hundredsChart({ start: d.start, end: d.end, missing, cell, keyText });

    // two small theme flourishes flank the chart bottom — decoration only
    const ns = rng.sample(labelSafeNouns(theme), 2);
    const flourish = (n, flip) =>
      `<img class="ws-icon" src="${fileUri(theme, n.noun)}" alt="" style="width:54px;height:54px${flip ? ';transform:scaleX(-1)' : ''}">`;

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
