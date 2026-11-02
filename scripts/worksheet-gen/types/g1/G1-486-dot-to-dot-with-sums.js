/**
 * G1-486 — Dot-to-Dot with Sums (Dot to Dot maker, 2026-11-02; 1.OA.C.6). The dots of a scene picture (K-285's d2d pool)
 * carry the ANSWERS of a numbered list of sums printed under the picture, in a scrambled order: the child solves sum 1,
 * starts at the orange dot (its answer), solves sum 2, joins to the dot with that answer, and so on — the picture appears
 * only when every sum is right. The answers are all different, so every sum leads to exactly one dot.
 *   level 1  ten sums, answers 2-12 (two addends of at least 1)
 *   level 2  ten teen sums, answers 11-20 (addends up to 10: bridging ten)
 *   level 3  twenty problems, + and −, every answer 1-20 once (within 20)
 * The answer boxes are write-ins (data-lcs-answer): the key writes the answers, the screen types them.
 */
'use strict';
const sceneDotFigure = require('../../primitives/scene-dot-figure.js');
const { answerBox } = require('../../templates/components.js');
const { d2d } = require('../k/K-285-dot-to-dot.js');

const LEVELS = {
  1: { n: 10, band: 'low', offset: 2, labelPx: 22, values: () => Array.from({ length: 11 }, (_, i) => i + 2), ops: ['+'] },
  2: { n: 10, band: 'mid', offset: 4, labelPx: 20, values: () => Array.from({ length: 10 }, (_, i) => i + 11), ops: ['+'] },
  3: { n: 20, band: 'all', offset: 6, labelPx: 18, values: () => Array.from({ length: 20 }, (_, i) => i + 1), ops: ['+', '−'] },
};
const MINUS = '−';

/** a problem whose answer is v: a + b (addends ≥ 1; level 2 addends ≤ 10) or m − s (m ≤ 20, s ≥ 1) */
function problemFor(v, lv, rng) {
  const L = LEVELS[lv];
  const canPlus = v >= 2, canMinus = L.ops.includes(MINUS) && v <= 19;
  const op = canPlus && canMinus ? rng.pick(['+', MINUS]) : canPlus ? '+' : MINUS;
  if (op === '+') {
    const lo = lv === 2 ? Math.max(1, v - 10) : 1, hi = lv === 2 ? Math.min(10, v - 1) : v - 1;
    const a = rng.int(lo, hi);
    return { a, op, b: v - a, v };
  }
  // never m − v = v (8 − 4 = 4): the answer would be printed in its own problem
  let s = rng.int(1, 20 - v);
  if (s === v) s = s > 1 ? s - 1 : s + 1;
  return { a: v + s, op, b: s, v };
}

module.exports = {
  id: 'G1-486',
  slug: 'dot-to-dot-with-sums',
  gradeBand: 'G1',
  assetClass: 'geometry',
  exerciseType: 'dot-to-dot',
  themeAxis: { applicable: false },
  difficulty: { 1: { n: 10 }, 2: { n: 10 }, 3: { n: 20 } },
  i18n: { en: { title: "Dot-to-Dot Math", instruction: "Solve each problem and write the answer. Start at the orange dot: it is the answer to problem 1. Then join it to the answer to problem 2, then problem 3, and so on." } },
  levelSetWords: (m) => [m.scene || String(m.figure)],

  build({ difficulty }, ctx) {
    const lv = Number(difficulty) || 2, L = LEVELS[lv], rng = ctx.rng;
    const answers = rng.sample(L.values(), L.n);
    // never an order a child could follow without the sums: not ascending, not descending
    const asc = (a) => a.every((x, i) => i === 0 || x > a[i - 1]), desc = (a) => a.every((x, i) => i === 0 || x < a[i - 1]);
    for (let g = 0; g < 20 && (asc(answers) || desc(answers)); g++) rng.shuffle(answers).forEach((x, i) => { answers[i] = x; });
    const problems = answers.map((v) => problemFor(v, lv, rng));
    const values = answers.map(String);
    // the pool is measured with the widest labels the level prints (two digits), so a page's own labels always find room
    // minGap: the dots keep verify's 22 px at this width (level 3 draws 20 dots at 470 px: night-tent crowded, 2026-11-02)
    const probe = { count: L.n, values: Array.from({ length: L.n }, () => '20'), lite: true, labelPx: L.labelPx, width: L.n > 10 ? 470 : 560, minGap: 22 };
    const pool = d2d.d2dPool({ band: L.band }, L.n, probe, null);
    if (!pool.length) throw new Error('G1-486: no picture for ' + L.n + ' dots — REFUSED');
    const scene = d2d.fullScene(pool[(L.offset + d2d.copyOf(ctx) - 1) % pool.length]);
    const fig = sceneDotFigure({ scene, count: L.n, values, lite: true, labelPx: L.labelPx, width: probe.width });
    const key = !!(ctx && ctx.answerKey);
    const cell = (p, i) =>
      `<span style="display:inline-flex;align-items:center;gap:5px;font-family:'Baloo 2',cursive;font-weight:700;font-size:19px;color:#3A3530;white-space:nowrap" data-lcs-card="${i + 1}" data-lcs-sum="${i + 1}" data-lcs-a="${p.a}" data-lcs-op="${p.op === '+' ? 'plus' : 'minus'}" data-lcs-b="${p.b}">` +
      `<span style="display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;background:${i === 0 ? '#F2784B' : '#146B5E'};color:#FFFFFF;font-size:15px">${i + 1}</span>` +
      `${p.a} ${p.op} ${p.b} =` + answerBox({ w: 46, h: 36, answer: p.v }) + `</span>`;
    // the KEY also draws the joined path (dot 1 to the last, in the order of the problems): the picture a teacher checks
    const svg = key ? d2d.withPath(fig, !/data-lcs-open="1"/.test(fig.svg)) : fig.svg;
    return {
      bodyHtml:
        `<div style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;gap:10px" data-ws-content data-lcs-sums="${L.n}">` +
        `<div class="ws-card" style="width:660px;align-items:center;justify-content:center;padding:4px">${svg}</div>` +
        `<div class="ws-card" style="width:660px;padding:10px 8px;display:grid;grid-template-columns:repeat(4,1fr);gap:8px 6px;justify-items:start;padding-left:18px">${problems.map(cell).join('')}</div></div>`,
      meta: { scene: scene.id, answers },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const svg = document.querySelector('[data-lcs-prim="dot-figure"]');
      if (!svg) return ['no dot figure'];
      const dots = [...svg.querySelectorAll('[data-lcs-dot]')].map((c) => ({ k: +c.dataset.lcsDot, x: +c.dataset.lcsX, y: +c.dataset.lcsY, el: c })).sort((a, b) => a.k - b.k);
      const labels = [...svg.querySelectorAll('[data-lcs-label]')].map((l) => l.textContent.trim());
      const sums = [...document.querySelectorAll('[data-lcs-sum]')];
      const n = +document.querySelector('[data-lcs-sums]').dataset.lcsSums;
      if (dots.length !== n || labels.length !== n || sums.length !== n) fails.push(`${dots.length} dots, ${labels.length} labels, ${sums.length} sums (want ${n})`);
      if (new Set(labels).size !== labels.length) fails.push('two dots carry the same answer');
      // sum i, worked out here, is the label of dot i — and its write-in box holds that answer
      sums.forEach((s, i) => {
        const a = +s.dataset.lcsA, b = +s.dataset.lcsB, v = s.dataset.lcsOp === 'plus' ? a + b : a - b;
        if (!(v >= 1 && v <= 20) || a > 20) fails.push(`sum ${i + 1}: out of range`);
        if (String(v) !== labels[i]) fails.push(`sum ${i + 1} = ${v}, but dot ${i + 1} reads ${labels[i]}`);
        const box = s.querySelector('[data-lcs-answer]');
        if (!box || box.dataset.lcsAnswer !== String(v)) fails.push(`sum ${i + 1}: its answer box does not hold ${v}`);
        if (s.textContent.replace(/\s/g, '').indexOf(String(a)) < 0) fails.push(`sum ${i + 1}: the printed sum is not ${a} ${s.dataset.lcsOp} ${b}`);
      });
      const nums = labels.map(Number);
      if (nums.every((x, i) => i === 0 || x > nums[i - 1]) || nums.every((x, i) => i === 0 || x < nums[i - 1])) fails.push('the answers run in order: the sums are not needed');
      const coral = dots.filter((d) => d.el.getAttribute('fill') === '#F2784B');
      if (coral.length !== 1 || coral[0].k !== 1) fails.push('start dot is not exactly dot 1');
      for (let i = 0; i < dots.length; i++) for (let j = i + 1; j < dots.length; j++) if (Math.hypot(dots[i].x - dots[j].x, dots[i].y - dots[j].y) < 22) fails.push(`dots ${i + 1},${j + 1} closer than 22 px`);
      // the numbers' ink boxes overlap no other number and no dot (K-285's rule)
      const ctx2 = document.createElement('canvas').getContext('2d');
      const boxes = [...svg.querySelectorAll('[data-lcs-label]')].map((l) => {
        const bb = l.getBBox(), cs = getComputedStyle(l);
        ctx2.font = cs.fontWeight + ' ' + parseFloat(l.getAttribute('font-size') || cs.fontSize) + 'px ' + cs.fontFamily; ctx2.textBaseline = 'middle';
        const m = ctx2.measureText(l.textContent), y = +l.getAttribute('y');
        return { x: bb.x, w: bb.width, y: y - m.actualBoundingBoxAscent, h: m.actualBoundingBoxAscent + m.actualBoundingBoxDescent };
      });
      boxes.forEach((b, i) => {
        for (let j = i + 1; j < boxes.length; j++) { const c = boxes[j]; if (!(b.x + b.w < c.x || c.x + c.w < b.x || b.y + b.h < c.y || c.y + c.h < b.y)) fails.push(`numbers ${i + 1},${j + 1} overlap`); }
        dots.forEach((d) => { const r = +d.el.getAttribute('r') + 2; if (d.x + r > b.x && d.x - r < b.x + b.w && d.y + r > b.y && d.y - r < b.y + b.h) fails.push(`number ${i + 1} overlaps dot ${d.k}`); });
      });
      return fails;
    });
  },
};
