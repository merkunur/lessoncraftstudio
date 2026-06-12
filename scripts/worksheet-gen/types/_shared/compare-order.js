/**
 * Factory for numeral comparison/ordering:
 *  - 'compare': two numerals, circle <, =, > (G1-137, G2-219, G3-325 by digits)
 *  - 'order':   3-5 numerals, write rank 1..N (G1-135/136 asc/desc, G2-220)
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { answerBox } = require('../../templates/components.js');

const NUMBOX = (v) => `<span class="ws-pattern-slot" style="width:auto;min-width:96px;height:72px;padding:0 14px;` +
  `font-family:'Baloo 2';font-weight:700;font-size:32px;color:#3A3530" data-lcs-num="${v}">${v}</span>`;

function distinctNumbers(rng, n, lo, hi) {
  const s = new Set();
  let guard = 0;
  while (s.size < n && guard++ < 400) s.add(rng.int(lo, hi));
  return [...s];
}

function makeCompareOrderType(cfg) {
  const { id, slug, mode, digits, descending, count, gradeBand, i18n } = cfg;
  const lo = digits === 1 ? 1 : Math.pow(10, digits - 1);
  const hi = Math.pow(10, digits) - 1;
  return {
    id,
    slug,
    gradeBand: gradeBand || 'G1',
    assetClass: 'numeral-charts',
    exerciseType: 'comparing-numbers',
    themeAxis: { applicable: false },
    difficulty: cfg.difficulty || {
      1: { rows: mode === 'compare' ? 6 : 4 },
      2: { rows: mode === 'compare' ? 8 : 5 },
      3: { rows: mode === 'compare' ? 8 : 5 },
    },
    i18n,

    build({ difficulty }, ctx) {
      const d = this.difficulty[difficulty];
      const rng = ctx.rng;
      const cards = [];
      for (let i = 0; i < d.rows; i++) {
        if (mode === 'compare') {
          // mostly distinct pairs; occasionally equal (the = case must exist in the wild)
          let a = rng.int(lo, hi);
          let b = rng.next() < 0.15 ? a : rng.int(lo, hi);
          const sym = a < b ? '&lt;' : (a > b ? '&gt;' : '=');
          const chips = ['&lt;', '=', '&gt;'].map((s) =>
            `<span class="ws-chip" style="width:44px;height:44px;font-size:22px" data-lcs-sym="${s}"` +
            `${s === sym ? ' data-lcs-correct="1"' : ''}>${s}</span>`).join('');
          cards.push(
            `<div class="ws-card-stage" style="justify-content:center;gap:18px" data-lcs-mode="compare">` +
            NUMBOX(a) + `<span style="display:inline-flex;flex-direction:column;gap:6px">${chips}</span>` + NUMBOX(b) +
            `</div>`);
        } else {
          const ns = distinctNumbers(rng, count || 3, lo, hi);
          const sorted = [...ns].sort((x, y) => descending ? y - x : x - y);
          const items = ns.map((v) =>
            `<span style="display:inline-flex;flex-direction:column;align-items:center;gap:8px">` +
            NUMBOX(v) + answerBox({ w: 48, h: 42, answer: sorted.indexOf(v) + 1 }) + `</span>`).join('');
          cards.push(
            `<div class="ws-card-stage" style="justify-content:space-evenly" data-lcs-mode="order" data-lcs-dir="${descending ? 'desc' : 'asc'}">${items}</div>`);
        }
      }
      const cols = mode === 'compare' && d.rows > 6 ? 2 : 1;
      return { bodyHtml: cardGrid({ cards, cols, rows: Math.ceil(d.rows / cols), numbered: false }), meta: {} };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        document.querySelectorAll('[data-lcs-mode]').forEach((stage, i) => {
          if (stage.dataset.lcsMode === 'compare') {
            const [a, b] = [...stage.querySelectorAll('[data-lcs-num]')].map((e) => parseInt(e.dataset.lcsNum, 10));
            const expected = a < b ? '<' : (a > b ? '>' : '=');
            const correct = [...stage.querySelectorAll('.ws-chip')].filter((c) => c.dataset.lcsCorrect);
            if (correct.length !== 1) fails.push(`row ${i + 1}: ${correct.length} correct chips`);
            else if (correct[0].textContent.trim() !== expected) fails.push(`row ${i + 1}: ${a} ${correct[0].textContent} ${b} is false`);
          } else {
            const desc = stage.dataset.lcsDir === 'desc';
            const pairs = [...stage.querySelectorAll('[data-lcs-num]')].map((e, k) => ({
              v: parseInt(e.dataset.lcsNum, 10),
              rank: parseInt(stage.querySelectorAll('[data-lcs-answer]')[k].dataset.lcsAnswer, 10),
            }));
            const sorted = [...pairs].sort((x, y) => desc ? y.v - x.v : x.v - y.v);
            sorted.forEach((p, k) => { if (p.rank !== k + 1) fails.push(`row ${i + 1}: ${p.v} ranked ${p.rank}, expected ${k + 1}`); });
            if (new Set(pairs.map((p) => p.v)).size !== pairs.length) fails.push(`row ${i + 1}: duplicate numbers`);
          }
        });
        return fails;
      });
    },
  };
}

module.exports = { makeCompareOrderType };
