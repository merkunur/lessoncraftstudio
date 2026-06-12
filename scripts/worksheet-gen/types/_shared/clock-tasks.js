/**
 * Factory for the telling-time family (class 6):
 *  - 'read-circle':  clock → circle the digital time (G1-148 o'clock,
 *                    G1-149 half past, G2-249 five minutes — stepM differs)
 *  - 'match':        clocks ↔ digital times, draw lines (G1-150)
 *  - 'elapsed':      start + end clocks → write elapsed hours (G3-344)
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const clock = require('../../primitives/clock.js');
const { answerBox } = require('../../templates/components.js');

const fmt = (h, m) => `${h}:${String(m).padStart(2, '0')}`;

function makeClockType(cfg) {
  const { id, slug, mode, stepM, gradeBand, i18n } = cfg;
  return {
    id,
    slug,
    gradeBand: gradeBand || 'G1',
    assetClass: 'clocks',
    exerciseType: 'telling-time',
    themeAxis: { applicable: false },
    difficulty: cfg.difficulty || {
      1: { cards: 4, stepM: stepM || 60 },
      2: { cards: 4, stepM: stepM || 60 },
      3: { cards: 6, stepM: stepM || 60 },
    },
    i18n,

    build({ difficulty }, ctx) {
      const d = this.difficulty[difficulty];
      const rng = ctx.rng;
      const step = d.stepM;
      const used = new Set();
      const pickTime = () => {
        let h, m, guard = 0;
        do {
          h = rng.int(1, 12);
          m = step * rng.int(0, Math.floor(59 / step));
          guard++;
        } while (used.has(h + ':' + m) && guard < 60);
        used.add(h + ':' + m);
        return { h, m };
      };

      if (mode === 'match') {
        const times = Array.from({ length: 4 }, pickTime);
        let order;
        do { order = rng.shuffle(times.map((_, i) => i)); }
        while (order.some((v, i) => v === i));
        const itemH = Math.floor((760 - 3 * 14) / 4);
        const left = times.map((t) =>
          `<div class="ws-match-item" style="width:200px;height:${itemH}px" data-lcs-left="${fmt(t.h, t.m)}">` +
          clock({ h: t.h, m: t.m, size: Math.min(150, itemH - 20) }).svg +
          `<span class="ws-match-dot ws-match-dot--right"></span></div>`).join('');
        const right = order.map((idx) =>
          `<div class="ws-match-item ws-match-item--plain" style="width:150px;height:${itemH}px" data-lcs-right="${fmt(times[idx].h, times[idx].m)}">` +
          `<span style="font-family:'Baloo 2';font-weight:700;font-size:34px;color:#3A3530">${fmt(times[idx].h, times[idx].m)}</span>` +
          `<span class="ws-match-dot ws-match-dot--left"></span></div>`).join('');
        return {
          bodyHtml: `<div class="ws-match" style="padding:6px 60px">` +
            `<div class="ws-match-col">${left}</div><div class="ws-match-col">${right}</div></div>`,
          meta: {},
        };
      }

      const cards = [];
      for (let i = 0; i < d.cards; i++) {
        if (mode === 'read-circle') {
          const { h, m } = pickTime();
          const opts = new Set([fmt(h, m)]);
          const wrongs = step >= 30
            ? [fmt((h % 12) + 1, m), fmt(m === 30 ? h : (h % 12) + 1, m === 30 ? 0 : 30), fmt(m === 0 ? 12 : m / 5, (h % 12) * 5)]
            : [fmt(m === 0 ? 12 : Math.max(1, Math.round(m / 5)), (h % 12) * 5), fmt(h, (m + step) % 60), fmt((h % 12) + 1, m)];
          for (const w of wrongs) if (opts.size < 3 && w !== fmt(h, m)) opts.add(w);
          const chips = rng.shuffle([...opts]).map((v) =>
            `<span class="ws-chip" style="width:auto;min-width:84px;height:48px;font-size:22px;padding:0 14px;border-radius:24px" ` +
            `data-lcs-choice="${v}"${v === fmt(h, m) ? ' data-lcs-correct="1"' : ''}>${v}</span>`).join('');
          cards.push(
            `<div class="ws-card-stage" style="flex-direction:column;gap:14px">` +
            clock({ h, m, size: d.cards > 4 ? 150 : 180 }).svg +
            `<div class="ws-choices">${chips}</div></div>`
          );
        } else if (mode === 'elapsed') {
          const h1 = rng.int(1, 8);
          const dur = rng.int(1, Math.min(4, 11 - h1));
          const m = d.stepM === 30 && rng.next() < 0.5 ? 30 : 0;
          const arrow = `<span style="font-family:'Baloo 2';font-weight:700;font-size:30px;color:#F2784B">→</span>`;
          cards.push(
            `<div class="ws-card-stage" style="gap:16px;justify-content:space-between;padding:6px 12px" data-lcs-dur="${dur}">` +
            `<span data-lcs-role="start">${clock({ h: h1, m, size: 140 }).svg}</span>` + arrow +
            `<span data-lcs-role="end">${clock({ h: h1 + dur, m, size: 140 }).svg}</span>` +
            answerBox({ w: 64, h: 54, answer: dur }) + `</div>`
          );
        }
      }
      const cols = mode === 'elapsed' ? 1 : 2;
      return { bodyHtml: cardGrid({ cards, cols, rows: Math.ceil(cards.length / cols) }), meta: {} };
    },

    async verify(page) {
      const m = mode;
      return page.evaluate((mode) => {
        const fails = [];
        const angleOk = (svg) => {
          const h = +svg.dataset.lcsH, mm = +svg.dataset.lcsM;
          const hourA = parseFloat(svg.querySelector('[data-lcs-hourhand]').dataset.lcsHourhand);
          const minA = parseFloat(svg.querySelector('[data-lcs-minutehand]').dataset.lcsMinutehand);
          return Math.abs(hourA - ((((h % 12) + mm / 60) / 12) * 360)) < 0.6 && Math.abs(minA - ((mm / 60) * 360)) < 0.6;
        };
        if (mode === 'match') {
          const left = [...document.querySelectorAll('[data-lcs-left]')];
          const right = [...document.querySelectorAll('[data-lcs-right]')].map((e) => e.dataset.lcsRight);
          if (left.map((e) => e.dataset.lcsLeft).sort().join() !== [...right].sort().join()) fails.push('right not a permutation');
          left.forEach((item, i) => {
            const svg = item.querySelector('[data-lcs-prim="clock"]');
            const t = `${svg.dataset.lcsH}:${String(svg.dataset.lcsM).padStart(2, '0')}`;
            if (t !== item.dataset.lcsLeft) fails.push(`row ${i + 1}: clock != declared`);
            if (!angleOk(svg)) fails.push(`row ${i + 1}: hand angles wrong`);
            if (right[i] === item.dataset.lcsLeft) fails.push(`row ${i + 1}: straight-across`);
          });
          return fails;
        }
        document.querySelectorAll('[data-lcs-card]').forEach((card, i) => {
          if (mode === 'read-circle') {
            const svg = card.querySelector('[data-lcs-prim="clock"]');
            if (!angleOk(svg)) fails.push(`card ${i + 1}: hand angles wrong`);
            const want = `${svg.dataset.lcsH}:${String(svg.dataset.lcsM).padStart(2, '0')}`;
            const correct = [...card.querySelectorAll('[data-lcs-correct]')];
            if (correct.length !== 1 || correct[0].dataset.lcsChoice !== want) fails.push(`card ${i + 1}: chips wrong`);
            const chips = [...card.querySelectorAll('[data-lcs-choice]')].map((c) => c.dataset.lcsChoice);
            if (new Set(chips).size !== chips.length || chips.length < 3) fails.push(`card ${i + 1}: bad option set`);
          } else if (mode === 'elapsed') {
            const dur = +card.querySelector('[data-lcs-dur]').dataset.lcsDur;
            const s = card.querySelector('[data-lcs-role="start"] [data-lcs-prim="clock"]');
            const e = card.querySelector('[data-lcs-role="end"] [data-lcs-prim="clock"]');
            if (!angleOk(s) || !angleOk(e)) fails.push(`card ${i + 1}: hand angles wrong`);
            if (+e.dataset.lcsH - +s.dataset.lcsH !== dur || s.dataset.lcsM !== e.dataset.lcsM) fails.push(`card ${i + 1}: elapsed != ${dur}h`);
            if (+card.querySelector('[data-lcs-answer]').dataset.lcsAnswer !== dur) fails.push(`card ${i + 1}: answer mismatch`);
          }
        });
        return fails;
      }, m);
    },
  };
}

module.exports = { makeClockType };
