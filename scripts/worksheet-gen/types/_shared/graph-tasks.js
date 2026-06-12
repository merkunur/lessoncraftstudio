/**
 * Factory for the graphs & data family (class 8):
 *  - 'pict-read':    pictograph → write each row's count (G1-141; scaled G2-238/G3-333)
 *  - 'pict-which':   pictograph → circle the category with most/least (G1-142)
 *  - 'bar-read':     bar graph → write each bar's value (G1-143; scaled G3-332)
 *  - 'bar-which':    bar graph → circle tallest/shortest category (G1-144)
 *  - 'bar-2step':    bar graph → two symbolic questions ([A]+[B]=, [A]−[B]=) (G2-237)
 *  - 'bar-fill':     value table → empty gridded graph (G3-334)
 *  - 'lineplot':     line plot → write counts per value (G2-240; fractions G3-335)
 *  - 'table-sort':   mixed icon strip → count into a 2-col table (G1-146)
 *  - 'pict-fill':    counts table → empty pictograph grid (G1-147)
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const barGraph = require('../../primitives/bar-graph.js');
const pictograph = require('../../primitives/pictograph.js');
const linePlot = require('../../primitives/line-plot.js');
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const { answerBox } = require('../../templates/components.js');

function distinctVals(rng, n, lo, hi) {
  const s = new Set(); let g = 0;
  while (s.size < n && g++ < 200) s.add(rng.int(lo, hi));
  return [...s];
}

const ICONBOX = (href, extra) =>
  `<span class="ws-pattern-slot" style="width:56px;height:56px"${extra || ''}>` +
  `<img class="ws-icon" src="${href}" alt="" style="width:40px;height:40px"></span>`;

function makeGraphType(cfg) {
  const { id, slug, mode, scale, which, gradeBand, i18n, fracLabels } = cfg;
  return {
    id,
    slug,
    gradeBand: gradeBand || 'G1',
    assetClass: 'graphs',
    exerciseType: 'graphing-data',
    themeAxis: { applicable: true, minNouns: 4 },
    difficulty: cfg.difficulty || {
      1: { cats: 3, maxN: 5 },
      2: { cats: 4, maxN: 8 },
      3: { cats: 4, maxN: 10 },
    },
    i18n,

    build({ theme, difficulty }, ctx) {
      const d = this.difficulty[difficulty];
      const rng = ctx.rng;
      const sc = scale || 1;
      const nouns = rng.sample(labelSafeNouns(theme), d.cats);
      const values = distinctVals(rng, d.cats, 1, d.maxN).map((v) => v * sc);
      const hrefs = nouns.map((n) => fileUri(theme, n.noun));

      const answerCol = (boxFor) =>
        `<div style="display:flex;flex-direction:column;gap:14px">` +
        nouns.map((n, i) =>
          `<span style="display:inline-flex;align-items:center;gap:12px" data-lcs-row="${i}" data-lcs-rown="${values[i]}">` +
          ICONBOX(hrefs[i]) +
          `<span style="font-family:'Baloo 2';font-weight:700;font-size:22px;color:#146B5E">=</span>` +
          boxFor(i) + `</span>`).join('') + `</div>`;

      let body;
      if (mode === 'pict-read') {
        const g = pictograph({ rows: nouns.map((n, i) => ({ iconHref: hrefs[i], n: values[i] })), scale: sc, cell: 36 });
        body = `<div style="flex:1 1 auto;display:flex;gap:26px;align-items:center;justify-content:space-evenly" data-lcs-values="${values.join(',')}" data-lcs-scale="${sc}">` +
          `<div class="ws-scene" style="flex:0 1 auto;padding:16px">${g.svg}</div>` +
          answerCol((i) => answerBox({ w: 64, h: 48, answer: values[i] })) + `</div>`;
      } else if (mode === 'pict-which' || mode === 'bar-which') {
        const target = which === 'most'
          ? values.indexOf(Math.max(...values))
          : values.indexOf(Math.min(...values));
        const graph = mode === 'pict-which'
          ? pictograph({ rows: nouns.map((n, i) => ({ iconHref: hrefs[i], n: values[i] })), cell: 36 })
          : barGraph({ values, iconHrefs: hrefs, yMax: Math.max(...values) + 1, w: 400, h: 380 });
        const chips = nouns.map((n, i) =>
          ICONBOX(hrefs[i], (i === target ? ' data-lcs-correct="1"' : '') + ` data-lcs-cat="${i}"`)).join('');
        body = `<div style="flex:1 1 auto;display:flex;flex-direction:column;gap:18px;align-items:center;justify-content:center" data-lcs-values="${values.join(',')}" data-lcs-which="${which}">` +
          `<div class="ws-scene" style="padding:14px">${graph.svg}</div>` +
          `<div style="display:flex;gap:18px">${chips}</div></div>`;
      } else if (mode === 'bar-read') {
        const g = barGraph({ values, iconHrefs: hrefs, yMax: Math.max(...values) + (sc > 1 ? sc : 1), w: 380, h: 400, yStep: sc });
        body = `<div style="flex:1 1 auto;display:flex;gap:26px;align-items:center;justify-content:space-evenly" data-lcs-values="${values.join(',')}">` +
          `<div class="ws-scene" style="padding:14px">${g.svg}</div>` +
          answerCol((i) => answerBox({ w: 64, h: 48, answer: values[i] })) + `</div>`;
      } else if (mode === 'bar-2step') {
        const g = barGraph({ values, iconHrefs: hrefs, yMax: Math.max(...values) + 1, w: 400, h: 360 });
        const [i1, i2] = rng.sample(values.map((_, i) => i), 2);
        const q = (a, b, op, ans) =>
          `<span style="display:inline-flex;align-items:center;gap:10px" data-lcs-q="${op}" data-lcs-qa="${a}" data-lcs-qb="${b}">` +
          ICONBOX(hrefs[a]) +
          `<span style="font-family:'Baloo 2';font-weight:700;font-size:26px;color:#146B5E">${op}</span>` +
          ICONBOX(hrefs[b]) +
          `<span style="font-family:'Baloo 2';font-weight:700;font-size:26px;color:#146B5E">=</span>` +
          answerBox({ w: 64, h: 48, answer: ans }) + `</span>`;
        const hi = values[i1] >= values[i2] ? i1 : i2;
        const lo = hi === i1 ? i2 : i1;
        body = `<div style="flex:1 1 auto;display:flex;flex-direction:column;gap:18px;align-items:center;justify-content:center" data-lcs-values="${values.join(',')}">` +
          `<div class="ws-scene" style="padding:14px">${g.svg}</div>` +
          `<div style="display:flex;gap:36px">${q(i1, i2, '+', values[i1] + values[i2])}${q(hi, lo, '−', values[hi] - values[lo])}</div></div>`;
      } else if (mode === 'bar-fill') {
        const table = nouns.map((n, i) =>
          `<span style="display:inline-flex;align-items:center;gap:12px;background:#FFFFFF;border:2px solid #F0E4CB;border-radius:12px;padding:8px 16px" data-lcs-row="${i}" data-lcs-rown="${values[i]}">` +
          ICONBOX(hrefs[i]) +
          `<span style="font-family:'Baloo 2';font-weight:700;font-size:30px;color:#3A3530">${values[i]}</span></span>`).join('');
        const g = barGraph({ values: values.map(() => 0), iconHrefs: hrefs, yMax: Math.max(...values), w: 380, h: 420 });
        body = `<div style="flex:1 1 auto;display:flex;gap:22px;align-items:center" data-lcs-values="${values.join(',')}">` +
          `<div style="display:flex;flex-direction:column;gap:16px;flex:1 1 0">${table}</div>` +
          `<div class="ws-scene" style="flex:0 0 auto;padding:12px">${g.svg}</div></div>`;
      } else if (mode === 'lineplot') {
        const lo = 1, hi = fracLabels ? 4 : 6;
        const step = fracLabels ? 0.5 : 1;
        const counts = {};
        const nvals = Math.round((hi - lo) / step) + 1;
        const chosen = rng.sample(Array.from({ length: nvals }, (_, k) => lo + k * step), Math.min(4, nvals));
        chosen.forEach((v) => { counts[v] = rng.int(1, 5); });
        const g = linePlot({ counts, min: lo, max: hi, step, width: 460, fracLabels });
        const qs = chosen.slice(0, 3).map((v) =>
          `<span style="display:inline-flex;align-items:center;gap:10px" data-lcs-qv="${v}" data-lcs-qn="${counts[v]}">` +
          `<span style="font-family:'Baloo 2';font-weight:700;font-size:24px;color:#3A3530">${fracLabels && v % 1 !== 0 ? Math.floor(v) + '½' : v}</span>` +
          `<span style="font-family:'Baloo 2';font-weight:700;font-size:22px;color:#146B5E">→</span>` +
          answerBox({ w: 56, h: 46, answer: counts[v] }) + `</span>`).join('');
        body = `<div style="flex:1 1 auto;display:flex;flex-direction:column;gap:26px;align-items:center;justify-content:center">` +
          `<div class="ws-scene" style="padding:16px">${g.svg}</div>` +
          `<div style="display:flex;gap:30px">${qs}</div></div>`;
      } else if (mode === 'table-sort') {
        const two = nouns.slice(0, 2);
        const counts2 = [rng.int(3, d.maxN), rng.int(3, d.maxN)];
        const items = rng.shuffle(two.flatMap((n, i) => Array.from({ length: counts2[i] }, () => i)));
        const strip = items.map((i) =>
          `<img class="ws-icon" src="${hrefs[i]}" alt="" data-lcs-item="${i}" style="width:44px;height:44px">`).join('');
        const cols = two.map((n, i) =>
          `<span style="display:inline-flex;flex-direction:column;align-items:center;gap:10px;background:#FFFFFF;border:2px solid #F0E4CB;border-radius:12px;padding:14px 26px" data-lcs-col="${i}" data-lcs-coln="${counts2[i]}">` +
          ICONBOX(hrefs[i]) + answerBox({ w: 64, h: 50, answer: counts2[i] }) + `</span>`).join('');
        body = `<div style="flex:1 1 auto;display:flex;flex-direction:column;gap:30px;align-items:center;justify-content:center">` +
          `<div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;max-width:560px">${strip}</div>` +
          `<div style="display:flex;gap:40px">${cols}</div></div>`;
      } else if (mode === 'pict-fill') {
        const table = nouns.map((n, i) =>
          `<span style="display:inline-flex;align-items:center;gap:12px;background:#FFFFFF;border:2px solid #F0E4CB;border-radius:12px;padding:6px 14px" data-lcs-row="${i}" data-lcs-rown="${values[i]}">` +
          ICONBOX(hrefs[i]) +
          `<span style="font-family:'Baloo 2';font-weight:700;font-size:26px;color:#3A3530">${values[i]}</span></span>`).join('');
        const g = pictograph({ rows: nouns.map((n, i) => ({ iconHref: hrefs[i], n: values[i] })), cell: 36, emptyGrid: true, slots: Math.max(...values) });
        body = `<div style="flex:1 1 auto;display:flex;flex-direction:column;gap:20px;align-items:center;justify-content:center" data-lcs-values="${values.join(',')}">` +
          `<div style="display:flex;gap:14px;flex-wrap:wrap;justify-content:center">${table}</div>` +
          `<div class="ws-scene" style="padding:14px">${g.svg}</div></div>`;
      }
      return { bodyHtml: body, meta: { values } };
    },

    async verify(page) {
      const m = mode, w = which;
      return page.evaluate(({ mode, which }) => {
        const fails = [];
        const stamps = (svg, i) => svg.querySelectorAll(`[data-lcs-stamp="${i}"]`).length;
        if (mode === 'pict-read') {
          const wrap = document.querySelector('[data-lcs-values]');
          const values = wrap.dataset.lcsValues.split(',').map(Number);
          const sc = +wrap.dataset.lcsScale;
          const svg = wrap.querySelector('[data-lcs-prim="pictograph"]');
          values.forEach((v, i) => {
            if (stamps(svg, i) * sc !== v) fails.push(`row ${i}: ${stamps(svg, i)} stamps × ${sc} != ${v}`);
          });
          wrap.querySelectorAll('[data-lcs-row]').forEach((row) => {
            const i = +row.dataset.lcsRow;
            if (+row.querySelector('[data-lcs-answer]').dataset.lcsAnswer !== values[i]) fails.push(`row ${i}: answer mismatch`);
          });
        } else if (mode === 'pict-which' || mode === 'bar-which') {
          const wrap = document.querySelector('[data-lcs-values]');
          const values = wrap.dataset.lcsValues.split(',').map(Number);
          const target = which === 'most' ? values.indexOf(Math.max(...values)) : values.indexOf(Math.min(...values));
          const correct = [...wrap.querySelectorAll('[data-lcs-cat]')].filter((c) => c.dataset.lcsCorrect);
          if (correct.length !== 1 || +correct[0].dataset.lcsCat !== target) fails.push('target category wrong');
          if (new Set(values).size !== values.length) fails.push('tied values — ambiguous');
        } else if (mode === 'bar-read' || mode === 'bar-fill') {
          const wrap = document.querySelector('[data-lcs-values]');
          const values = wrap.dataset.lcsValues.split(',').map(Number);
          const bars = [...wrap.querySelectorAll('[data-lcs-bar]')].map((b) => +b.dataset.lcsBar);
          if (mode === 'bar-read' && bars.join() !== values.join()) fails.push(`bars ${bars} != ${values}`);
          if (mode === 'bar-fill' && bars.some((b) => b !== 0)) fails.push('graph must start empty');
          wrap.querySelectorAll('[data-lcs-row]').forEach((row) => {
            const i = +row.dataset.lcsRow;
            if (+row.dataset.lcsRown !== values[i]) fails.push(`row ${i}: declared mismatch`);
          });
        } else if (mode === 'bar-2step') {
          const wrap = document.querySelector('[data-lcs-values]');
          const values = wrap.dataset.lcsValues.split(',').map(Number);
          wrap.querySelectorAll('[data-lcs-q]').forEach((q) => {
            const a = values[+q.dataset.lcsQa], b = values[+q.dataset.lcsQb];
            const want = q.dataset.lcsQ === '+' ? a + b : a - b;
            if (want < 0) fails.push('negative difference');
            if (+q.querySelector('[data-lcs-answer]').dataset.lcsAnswer !== want) fails.push(`question ${q.dataset.lcsQ}: mismatch`);
          });
        } else if (mode === 'lineplot') {
          document.querySelectorAll('[data-lcs-qv]').forEach((q) => {
            const v = q.dataset.lcsQv, n = +q.dataset.lcsQn;
            const xs = document.querySelectorAll(`[data-lcs-x="${v}"]`).length;
            if (xs !== n) fails.push(`value ${v}: ${xs} X marks != ${n}`);
            if (+q.querySelector('[data-lcs-answer]').dataset.lcsAnswer !== n) fails.push(`value ${v}: answer mismatch`);
          });
        } else if (mode === 'table-sort') {
          document.querySelectorAll('[data-lcs-col]').forEach((col) => {
            const i = col.dataset.lcsCol, n = +col.dataset.lcsColn;
            const items = document.querySelectorAll(`[data-lcs-item="${i}"]`).length;
            if (items !== n) fails.push(`category ${i}: strip has ${items} != ${n}`);
            if (+col.querySelector('[data-lcs-answer]').dataset.lcsAnswer !== n) fails.push(`category ${i}: answer mismatch`);
          });
        } else if (mode === 'pict-fill') {
          const wrap = document.querySelector('[data-lcs-values]');
          const values = wrap.dataset.lcsValues.split(',').map(Number);
          const svg = wrap.querySelector('[data-lcs-prim="pictograph"]');
          if (svg.querySelectorAll('[data-lcs-stamp]').length !== 0) fails.push('pictograph must start empty');
          values.forEach((v, i) => {
            const cells = svg.querySelectorAll(`[data-lcs-emptycell="${i}"]`).length;
            if (cells < v) fails.push(`row ${i}: only ${cells} cells for ${v}`);
          });
        }
        return fails;
      }, { mode: m, which: w });
    },
  };
}

module.exports = { makeGraphType };
