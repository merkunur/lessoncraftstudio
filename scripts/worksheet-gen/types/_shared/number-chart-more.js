/**
 * number-chart-more.js — the new chart templates of the Number Charts maker (NEW-TEMPLATES §4, 2026-11-01).
 * Print-only (the maker's answer key; a screen version comes with the makers' play page). Four modes:
 *
 *   chart120  T1 · G1-434 — the chart runs on to 120; most missing numbers past 100 (1.NBT.A.1)
 *   hidden    T2 · G1-435 — colour every number of the list on the chart: a picture appears (1.NBT.A.1 / B.2).
 *             ONE colour, never a colour code: a chart printed in black and white must still work, and a
 *             language-free page needs no colour words. The key paints the picture in ONE colour too: the teacher
 *             compares it with the child's page.
 *   blank     T3 · G1-436 — write every number of an empty chart from the ones given (1.NBT.A.1, 2.NBT.A.2)
 *   piece3    T5 · G2-394 — a hundred-cell chart inside one hundred (301-400 …): the hundreds digit stays,
 *             the tens and ones run (2.NBT.A.1-2)
 *
 * Missing numbers never include the chart's first and last number (the anchors). `isolated` = no two missing numbers
 * touch (left/right in a row, up/down in a column); `runs` = two runs of three across and one of three down.
 * The key: the same chart with every missing number written in coral (hundreds-chart keyText) — the boxes keep their
 * size, nothing moves; the hidden picture's key paints the picture's cells.
 */
'use strict';
const hundredsChart = require('../../primitives/hundreds-chart.js');
const { codeColors } = require('../../primitives/_tokens.js');
const { LS_PIXEL_FIGURES } = require('../../data/b2/figures-levelset.js');

/** the pictures whose ONE-colour outline still reads as the thing (read on the ASCII silhouettes, 2026-11-01) */
const HIDDEN = {
  f7: ['apple-tree', 'train', 'pear', 'popsicle'],
  // (helicopter left out: in one colour its rotor floats loose — reviewer 2026-11-01)
  f8: ['dog', 'cupcake', 'airplane', 'turtle', 'hen', 'frog', 'tent', 'butterfly', 'lighthouse'],
  f9: ['robot', 'ship', 'owl', 'castle', 'strawberry'],
};

const LEVELS = {
  chart120: {
    1: { start: 1, end: 120, missing: 10, past: 6, isolated: true },
    2: { start: 1, end: 120, missing: 16, past: 8, isolated: true },
    3: { start: 1, end: 120, missing: 24, past: 10, runs: true },
  },
  hidden: {
    1: { start: 1, end: 100, cls: 'f7', order: 'sorted' },
    2: { start: 1, end: 100, cls: 'f8', order: 'shuffled' },
    3: { start: 101, end: 200, cls: 'f9', order: 'shuffled', compact: true },   // up to 48 three-digit numbers: smaller cells + chips
  },
  blank: {
    1: { starts: [1], given: 'row+col' },
    2: { starts: [1], given: 'col' },
    3: { starts: [101], given: 'first' },   // 101-200 (Grade 1 counts to 120; 201-300 is Grade 2)
  },
  piece3: {
    1: { hundreds: [1, 2, 3], missing: 10, isolated: true },
    2: { hundreds: [1, 2, 3, 4, 5, 6, 7, 8, 9], missing: 16, isolated: true },
    3: { hundreds: [1, 2, 3, 4, 5, 6, 7, 8, 9], missing: 24, runs: true },
  },
};

/** neighbours on the chart (same row left/right, same column up/down) */
function touches(set, v, start) {
  const row = (u) => Math.floor((u - start) / 10);
  return [v - 1, v + 1].some((u) => set.has(u) && row(u) === row(v)) || [v - 10, v + 10].some((u) => set.has(u));
}

/** the missing numbers of one chart (start..end, never the anchors) */
function pickMissing(rng, start, end, d) {
  const inner = []; for (let v = start + 1; v < end; v++) inner.push(v);
  for (let attempt = 0; attempt < 60; attempt++) {
    const out = new Set();
    const ok = (v) => v > start && v < end && !out.has(v);
    if (d.runs) {
      const rows = Math.ceil((end - start + 1) / 10), rowsUsed = new Set();
      for (let t = 0; out.size < 6 && t < 300; t++) {
        const r = rng.int(0, rows - 1), c = rng.int(0, 7);
        const run = [0, 1, 2].map((k) => start + r * 10 + c + k);
        if (rowsUsed.has(r) || !run.every(ok)) continue;
        rowsUsed.add(r); run.forEach((v) => out.add(v));
      }
      for (let t = 0; out.size < 9 && t < 300; t++) {
        const r = rng.int(0, rows - 3), c = rng.int(0, 9);
        const run = [0, 1, 2].map((k) => start + (r + k) * 10 + c);
        if (!run.every(ok)) continue;
        run.forEach((v) => out.add(v));
      }
      if (out.size !== 9) continue;
    }
    const fill = (pool, target, count) => {
      for (const v of rng.shuffle(pool.slice())) {
        if (count() >= target) break;
        if (!ok(v) || (d.isolated && touches(out, v, start))) continue;
        out.add(v);
      }
    };
    // the 120 chart: the numbers past 100 first (the new part), then the rest of the chart
    if (d.past) fill(inner.filter((v) => v > 100), d.past, () => [...out].filter((v) => v > 100).length);
    fill(inner, d.missing, () => out.size);
    if (out.size === d.missing && (!d.past || [...out].filter((v) => v > 100).length >= d.past)) return [...out].sort((a, b) => a - b);
  }
  throw new Error('number-chart-more: could not place ' + d.missing + ' missing numbers on ' + start + '-' + end);
}

function makeChartMoreType(cfg) {
  const { id, slug, mode, gradeBand, i18n } = cfg;
  return {
    id,
    slug,
    gradeBand,
    assetClass: 'numeral-charts',
    exerciseType: 'number-charts',
    themeAxis: { applicable: false },
    difficulty: LEVELS[mode],
    i18n,
    // what makes a copy different: the missing numbers / the picture and where it sits
    levelSetWords(m) { return (m.missing || m.colour || []).map(String); },

    build(args, ctx) {
      const d = this.difficulty[args.difficulty];
      const key = !!(ctx && ctx.answerKey);
      const rng = ctx.rng;
      const wrap = (inner, attrs = '') => `<div data-ws-content data-lcs-chart-mode="${mode}"${attrs} style="flex:1 1 auto;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;min-height:0">${inner}</div>`;
      const keyed = (svg) => (key ? `<div data-lcs-key-sample="1">${svg}</div>` : svg);

      if (mode === 'hidden') {
        const pick = rng.pick(HIDDEN[d.cls]);
        const fig = LS_PIXEL_FIGURES.find((f) => f.key === pick);
        const n = fig.rows.length;
        const r0 = rng.int(0, 10 - n), c0 = rng.int(0, 10 - n);
        const colour = [], fills = {};
        fig.rows.forEach((row, i) => [...row].forEach((ch, j) => {
          if (ch === '.') return;
          const v = d.start + (r0 + i) * 10 + c0 + j;
          colour.push(v); fills[v] = codeColors.codeBlue;
        }));
        colour.sort((a, b) => a - b);
        const list = d.order === 'sorted' ? colour.slice() : rng.shuffle(colour.slice());
        const chart = hundredsChart({ start: d.start, end: d.end, cell: d.compact ? 46 : 50, ...(key ? { fills } : {}), ...(ctx.screen ? { cellBoxes: { rings: colour } } : {}) });
        const chip = d.compact || list.length > 28 ? { w: 44, h: 31, fs: 18, gap: 5 } : { w: 46, h: 36, fs: 21, gap: 7 };
        const chips = list.map((v) => `<span data-lcs-colour-n="${v}" style="display:inline-flex;align-items:center;justify-content:center;min-width:${chip.w}px;height:${chip.h}px;padding:0 4px;box-sizing:border-box;border:2px solid #C8BFAE;border-radius:9px;background:#FFFFFF;font-family:'Baloo 2';font-weight:700;font-size:${chip.fs}px;color:#3A3530">${v}</span>`).join('');
        const listBox = `<div data-lcs-colour-list style="display:flex;flex-wrap:wrap;justify-content:center;gap:${chip.gap}px;width:${Math.max(chart.width, 560)}px;box-sizing:border-box;padding:12px 10px;border:2.5px solid #146B5E;border-radius:14px;background:#FFFDF8">` +
          `<span aria-hidden="true" style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px"><svg width="30" height="30" viewBox="0 0 30 30"><path d="M6 24 L20 6 L25 10 L11 28 L5 29 Z" fill="#F2784B" stroke="#3A3530" stroke-width="2" stroke-linejoin="round"/></svg></span>` +
          chips + `</div>`;
        return {
          bodyHtml: wrap(keyed(chart.svg) + listBox, ` data-lcs-figure="${fig.key}"`),
          meta: { colour, figure: fig.key, at: [r0, c0], start: d.start, end: d.end },
        };
      }

      if (mode === 'blank') {
        const start = rng.pick(d.starts), end = start + 99;
        const given = new Set([start]);
        if (d.given === 'row+col' || d.given === 'col') for (let r = 0; r < 10; r++) given.add(start + r * 10);
        if (d.given === 'row+col') for (let c = 0; c < 10; c++) given.add(start + c);
        const missing = []; for (let v = start; v <= end; v++) if (!given.has(v)) missing.push(v);
        const chart = hundredsChart({ start, end, missing, cell: 60, keyText: key, blank: 'plain' });
        return { bodyHtml: wrap(keyed(chart.svg)), meta: { ...chart.meta, missing } };
      }

      const start = mode === 'piece3' ? rng.pick(d.hundreds) * 100 + 1 : d.start;
      const end = mode === 'piece3' ? start + 99 : d.end;
      const missing = pickMissing(rng, start, end, d);
      const cell = end - start + 1 > 100 ? 56 : 60;
      const chart = hundredsChart({ start, end, missing, cell, keyText: key });
      return { bodyHtml: wrap(keyed(chart.svg)), meta: chart.meta };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const svg = document.querySelector('[data-lcs-prim="hundreds-chart"]');
        if (!svg) return ['no chart'];
        const start = +svg.dataset.lcsStart, end = +svg.dataset.lcsEnd;
        const cells = [...svg.querySelectorAll('[data-lcs-cell]')].map((e) => +e.dataset.lcsCell);
        const missing = [...svg.querySelectorAll('[data-lcs-missing]')].map((e) => +e.dataset.lcsMissing);
        const seen = new Set();
        [...cells, ...missing].forEach((v) => { if (seen.has(v)) fails.push(`value ${v} twice`); seen.add(v); });
        for (let v = start; v <= end; v++) if (!seen.has(v)) fails.push(`value ${v} absent`);
        svg.querySelectorAll('[data-lcs-cell]').forEach((e) => { if (e.textContent.trim() !== e.dataset.lcsCell) fails.push(`cell text ${e.textContent} != ${e.dataset.lcsCell}`); });
        if (missing.includes(start) || missing.includes(end)) {
          const mode = document.querySelector('[data-lcs-chart-mode]').dataset.lcsChartMode;
          if (mode !== 'blank' || missing.includes(start)) fails.push('an anchor is missing');
        }
        // the hidden picture: every listed number is on the chart, once; the list is the colour set
        const list = [...document.querySelectorAll('[data-lcs-colour-n]')].map((e) => +e.dataset.lcsColourN);
        if (document.querySelector('[data-lcs-colour-list]')) {
          if (!list.length) fails.push('empty colour list');
          if (new Set(list).size !== list.length) fails.push('a number listed twice');
          list.forEach((v) => { if (v < start || v > end) fails.push(`listed ${v} is not on the chart`); });
          document.querySelectorAll('[data-lcs-colour-n]').forEach((e) => { if (e.textContent.trim() !== e.dataset.lcsColourN) fails.push('list chip text'); });
        }
        return fails;
      });
    },
  };
}

module.exports = { makeChartMoreType, pickMissing, touches, HIDDEN, LEVELS };
