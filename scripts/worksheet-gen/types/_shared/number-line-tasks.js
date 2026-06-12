/**
 * Factory for number-line task types (class 4):
 *  - 'count-on':     dot at a, b hops → write the landing number (G1-116)
 *  - 'count-back':   dot at a, b hops backward → write the landing (G1-117)
 *  - 'jump-sub':     hops backward + equation a − b = [] (G1-119)
 *  - 'place':        numeral shown → circle the right mark among candidates (G1-138)
 *  - 'round':        dot at v → circle the nearer ten/hundred (G2-221/G3-323)
 *  - 'multiples':    hops of k from 0 → write each landing (G3-308)
 *  - 'repeated-sub': start n, hops of −k to 0 → n − k − k … = 0, write hop count (G3-310)
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const numberLine = require('../../primitives/number-line.js');
const { answerBox } = require('../../templates/components.js');

const NUM = (v) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:28px;color:#3A3530" data-lcs-num="${v}">${v}</span>`;
const OP = (ch) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:26px;color:#146B5E">${ch}</span>`;

function makeNumberLineTaskType(cfg) {
  const { id, slug, mode, gradeBand, i18n } = cfg;
  return {
    id,
    slug,
    gradeBand: gradeBand || 'G1',
    assetClass: 'number-lines',
    exerciseType: 'number-lines',
    themeAxis: { applicable: false },
    difficulty: cfg.difficulty || {
      1: { lineMax: 10, rows: 3 },
      2: { lineMax: 20, rows: 3 },
      3: { lineMax: 20, rows: 4 },
    },
    i18n,

    build({ difficulty }, ctx) {
      const d = this.difficulty[difficulty];
      const rng = ctx.rng;
      const cards = [];
      for (let i = 0; i < d.rows; i++) {
        let stage;
        const labelEvery = (d.lineMax > 20 ? 10 : (d.lineMax > 10 ? 2 : 1));
        if (mode === 'count-on' || mode === 'count-back' || mode === 'jump-sub') {
          const back = mode !== 'count-on';
          const b = rng.int(1, Math.min(6, d.lineMax - 2));
          const a = back ? rng.int(b + 1, d.lineMax) : rng.int(0, d.lineMax - b - 1);
          const to = back ? a - b : a + b;
          const nl = numberLine({ min: 0, max: d.lineMax, labelEvery, width: 540, jumps: [{ from: a, to }], marks: [a] });
          const eq = mode === 'jump-sub'
            ? NUM(a) + OP('−') + NUM(b) + OP('=') + answerBox({ w: 60, h: 48, answer: to })
            : `<span style="font-family:'Nunito';font-weight:800;font-size:18px;color:#8A8276">→</span>` + answerBox({ w: 60, h: 48, answer: to });
          stage = `<div class="ws-card-stage" style="flex-direction:column;gap:8px" data-lcs-a="${a}" data-lcs-b="${b}" data-lcs-to="${to}">` +
            nl.svg + `<span style="display:inline-flex;align-items:center;gap:10px">${eq}</span></div>`;
        } else if (mode === 'place') {
          const target = rng.int(1, d.lineMax - 1);
          const candSet = new Set([target]);
          let guard = 0;
          while (candSet.size < 4 && guard++ < 60) {
            const c = rng.int(0, d.lineMax);
            if (Math.abs(c - target) >= 2) candSet.add(c);
          }
          const nl = numberLine({ min: 0, max: d.lineMax, labelEvery, width: 540, marks: [...candSet] });
          // marks are dots; the child circles the dot matching the numeral
          stage = `<div class="ws-card-stage" style="flex-direction:column;gap:10px" data-lcs-target="${target}">` +
            `<span style="display:inline-flex;align-items:center;gap:12px">` +
            `<span style="font-family:'Nunito';font-weight:800;font-size:16px;color:#8A8276">●</span>` + NUM(target) + `</span>` + nl.svg + `</div>`;
        } else if (mode === 'round') {
          const step = d.roundTo;
          const lineMax = d.lineMax;
          const lo = step * rng.int(0, (lineMax / step) - 1);
          let v;
          do { v = lo + rng.int(1, step - 1); } while (v % step === 0 || v - lo === step / 2);
          const nearer = (v - lo) < step / 2 ? lo : lo + step;
          const nl = numberLine({ min: lo, max: lo + step, tickStep: step / 10, labelEvery: 10, width: 540, marks: [v] });
          const chips = ctx.rng.shuffle([lo, lo + step]).map((c) =>
            `<span class="ws-chip" style="width:auto;min-width:72px;height:52px;font-size:24px;padding:0 12px;border-radius:26px" ` +
            `data-lcs-choice="${c}"${c === nearer ? ' data-lcs-correct="1"' : ''}>${c}</span>`).join('');
          stage = `<div class="ws-card-stage" style="flex-direction:column;gap:10px" data-lcs-v="${v}" data-lcs-lo="${lo}" data-lcs-step="${step}">` +
            nl.svg + `<div class="ws-choices">${chips}</div></div>`;
        } else if (mode === 'multiples') {
          const k = d.ks[i % d.ks.length];
          const hops = rng.int(3, Math.min(5, Math.floor(d.lineMax / k)));
          const nl = numberLine({ min: 0, max: hops * k + k, tickStep: 1, labelEvery: k, width: 540, jumps: [{ from: 0, to: hops * k }], marks: [0] });
          const boxes = Array.from({ length: hops }, (_, h) =>
            answerBox({ w: 52, h: 44, answer: (h + 1) * k })).join('<span style="color:#C8BFAE;font-weight:800">,</span>');
          stage = `<div class="ws-card-stage" style="flex-direction:column;gap:8px" data-lcs-k="${k}" data-lcs-hops="${hops}">` +
            nl.svg + `<span style="display:inline-flex;align-items:center;gap:8px">${boxes}</span></div>`;
        } else if (mode === 'repeated-sub') {
          const k = d.ks[i % d.ks.length];
          const hops = rng.int(2, Math.min(5, Math.floor(d.lineMax / k)));
          const n = hops * k;
          const nl = numberLine({ min: 0, max: Math.min(d.lineMax, n + k), tickStep: 1, labelEvery: k, width: 540, jumps: [{ from: n, to: 0 }], marks: [n] });
          stage = `<div class="ws-card-stage" style="flex-direction:column;gap:8px" data-lcs-n="${n}" data-lcs-k="${k}" data-lcs-hops="${hops}">` +
            nl.svg +
            `<span style="display:inline-flex;align-items:center;gap:10px">` +
            NUM(n) + OP('÷') + NUM(k) + OP('=') + answerBox({ w: 56, h: 46, answer: hops }) + `</span></div>`;
        }
        cards.push(stage);
      }
      return { bodyHtml: cardGrid({ cards, cols: 1, rows: d.rows }), meta: {} };
    },

    async verify(page) {
      const m = mode;
      return page.evaluate((mode) => {
        const fails = [];
        document.querySelectorAll('[data-lcs-card]').forEach((card, i) => {
          const svg = card.querySelector('[data-lcs-prim="number-line"]');
          const hops = svg ? [...svg.querySelectorAll('[data-lcs-hop]')].map((e) => e.dataset.lcsHop) : [];
          if (mode === 'count-on' || mode === 'count-back' || mode === 'jump-sub') {
            const st = card.querySelector('[data-lcs-a]');
            const a = +st.dataset.lcsA, b = +st.dataset.lcsB, to = +st.dataset.lcsTo;
            if (hops.length !== b) fails.push(`row ${i + 1}: ${hops.length} hops != ${b}`);
            const dir = to > a ? 1 : -1;
            for (let k = 0; k < b; k++) {
              const want = `${a + k * dir}->${a + (k + 1) * dir}`;
              if (!hops.includes(want)) fails.push(`row ${i + 1}: missing hop ${want}`);
            }
            if (+card.querySelector('[data-lcs-answer]').dataset.lcsAnswer !== to) fails.push(`row ${i + 1}: landing mismatch`);
            if (to < 0) fails.push(`row ${i + 1}: lands below zero`);
          } else if (mode === 'place') {
            const target = +card.querySelector('[data-lcs-target]').dataset.lcsTarget;
            const marks = [...svg.querySelectorAll('[data-lcs-mark]')].map((e) => +e.dataset.lcsMark);
            if (!marks.includes(target)) fails.push(`row ${i + 1}: target ${target} has no mark`);
            if (marks.length < 3) fails.push(`row ${i + 1}: too few candidate marks`);
            marks.forEach((mv) => { if (mv !== target && Math.abs(mv - target) < 2) fails.push(`row ${i + 1}: distractor ${mv} too close to ${target}`); });
          } else if (mode === 'round') {
            const st = card.querySelector('[data-lcs-v]');
            const v = +st.dataset.lcsV, lo = +st.dataset.lcsLo, step = +st.dataset.lcsStep;
            const nearer = (v - lo) < step / 2 ? lo : lo + step;
            const correct = [...card.querySelectorAll('[data-lcs-correct]')];
            if (correct.length !== 1 || +correct[0].dataset.lcsChoice !== nearer) fails.push(`row ${i + 1}: rounding target wrong (v=${v})`);
            if (v % step === 0 || v - lo === step / 2) fails.push(`row ${i + 1}: ambiguous value ${v}`);
          } else if (mode === 'multiples') {
            const st = card.querySelector('[data-lcs-k]');
            const k = +st.dataset.lcsK, n = +st.dataset.lcsHops;
            if (hops.length !== n * k) fails.push(`row ${i + 1}: hop count`);
            const boxes = [...card.querySelectorAll('[data-lcs-answer]')].map((e) => +e.dataset.lcsAnswer);
            boxes.forEach((bv, h) => { if (bv !== (h + 1) * k) fails.push(`row ${i + 1}: box ${h + 1} = ${bv} != ${(h + 1) * k}`); });
          } else if (mode === 'repeated-sub') {
            const st = card.querySelector('[data-lcs-n]');
            const n = +st.dataset.lcsN, k = +st.dataset.lcsK, h = +st.dataset.lcsHops;
            if (n !== k * h) fails.push(`row ${i + 1}: ${n} != ${k}×${h}`);
            if (+card.querySelector('[data-lcs-answer]').dataset.lcsAnswer !== h) fails.push(`row ${i + 1}: quotient mismatch`);
            if (hops.length !== n) fails.push(`row ${i + 1}: ${hops.length} unit hops != ${n}`);
          }
        });
        return fails;
      }, m);
    },
  };
}

module.exports = { makeNumberLineTaskType };
