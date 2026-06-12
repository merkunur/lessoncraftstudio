/**
 * Factory for the ten-frame/subitizing counting family:
 *  - 'count-frame':   icon-filled ten-frame → write how many (K-004)
 *  - 'fill-frame':    numeral + empty frame → child draws counters (K-005)
 *  - 'make-10':       n filled → n + [] = 10 (G1-106)
 *  - 'subitize':      dice-style dot/icon flash → circle the numeral (K-017/018)
 *  - 'match-frame':   numerals ↔ frames, lines (K-024)
 *  - 'match-tally':   numerals ↔ tally marks (K-025)
 *  - 'tally-read':    tally → write number (K-015)
 *  - 'tally-write':   icon group → empty tally box (K-014)
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const tenFrame = require('../../primitives/ten-frame.js');
const tally = require('../../primitives/tally.js');
const diceFace = require('../../primitives/dice.js');
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const { iconRows, fitIcons, chipRow, answerBox, distractorsFor } = require('../../templates/components.js');

const NUM = (v) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:34px;color:#3A3530" data-lcs-num="${v}">${v}</span>`;
const OP = (ch) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:28px;color:#146B5E">${ch}</span>`;

function distinct(rng, count, lo, hi) {
  const s = new Set(); let g = 0;
  while (s.size < count && g++ < 300) s.add(rng.int(lo, hi));
  return [...s];
}

function makeFrameCountingType(cfg) {
  const { id, slug, mode, gradeBand, i18n } = cfg;
  return {
    id,
    slug,
    gradeBand: gradeBand || 'K',
    assetClass: 'ten-frames',
    exerciseType: mode.startsWith('tally') || mode === 'match-tally' ? 'tally-counting' : 'counting-frames',
    themeAxis: { applicable: ['count-frame', 'subitize-icons', 'tally-write'].includes(mode), minNouns: 4 },
    difficulty: cfg.difficulty || {
      1: { min: 1, max: 6, items: 4 },
      2: { min: 2, max: 10, items: 4 },
      3: { min: 4, max: 10, items: 6 },
    },
    i18n,

    build({ theme, difficulty }, ctx) {
      const d = this.difficulty[difficulty];
      const rng = ctx.rng;
      const cards = [];

      if (mode === 'match-frame' || mode === 'match-tally') {
        const counts = distinct(rng, d.items, d.min, d.max);
        let order;
        do { order = rng.shuffle(counts.map((_, i) => i)); }
        while (order.some((v, i) => v === i));
        const itemH = Math.floor((760 - (d.items - 1) * 14) / d.items);
        const left = counts.map((n) =>
          `<div class="ws-match-item ws-match-item--plain" style="width:120px;height:${itemH}px" data-lcs-left="${n}">` +
          `<span style="font-family:'Baloo 2';font-weight:700;font-size:42px;color:#3A3530">${n}</span>` +
          `<span class="ws-match-dot ws-match-dot--right"></span></div>`).join('');
        const right = order.map((idx) => {
          const n = counts[idx];
          const inner = mode === 'match-frame'
            ? tenFrame({ a: n, cell: Math.min(34, Math.floor((itemH - 24) / 2)) }).svg
            : tally({ n, strokeH: Math.min(46, itemH - 36) }).svg;
          return `<div class="ws-match-item" style="width:280px;height:${itemH}px" data-lcs-right="${n}">` +
            inner + `<span class="ws-match-dot ws-match-dot--left"></span></div>`;
        }).join('');
        return {
          bodyHtml: `<div class="ws-match" style="padding:6px 50px">` +
            `<div class="ws-match-col">${left}</div><div class="ws-match-col">${right}</div></div>`,
          meta: { counts },
        };
      }

      const counts = distinct(rng, d.items, d.min, d.max);
      const nouns = this.themeAxis.applicable ? rng.sample(labelSafeNouns(theme), d.items) : null;
      for (let i = 0; i < d.items; i++) {
        const n = counts[i];
        let stage;
        if (mode === 'count-frame') {
          stage = tenFrame({ a: n, cell: 50, iconHref: fileUri(theme, nouns[i].noun) }).svg +
            `<div class="ws-choices">${answerBox({ w: 76, h: 56, answer: n })}</div>`;
          stage = `<div class="ws-card-stage" style="flex-direction:column;gap:12px" data-lcs-expect="${n}">${stage}</div>`;
        } else if (mode === 'fill-frame') {
          stage = `<div class="ws-card-stage" style="flex-direction:column;gap:12px" data-lcs-expect="${n}">` +
            NUM(n) + tenFrame({ a: 0, cell: 50 }).svg + `</div>`;
        } else if (mode === 'make-10') {
          stage = `<div class="ws-card-stage" style="flex-direction:column;gap:12px" data-lcs-expect="${10 - n}">` +
            tenFrame({ a: n, cell: 50 }).svg +
            `<span style="display:inline-flex;align-items:center;gap:10px">` +
            NUM(n) + OP('+') + answerBox({ w: 62, h: 52, answer: 10 - n }) + OP('=') + NUM(10) + `</span></div>`;
        } else if (mode === 'subitize-dots' || mode === 'subitize-icons') {
          let visual;
          if (mode === 'subitize-dots') {
            visual = diceFace({ n, size: 120 }).svg;
          } else {
            const fit = fitIcons({ n, stageW: 150, stageH: 130, maxPx: 44, gapX: 5, gapY: 5 });
            visual = `<span data-lcs-iconpattern="${n}">` +
              iconRows({ theme, noun: nouns[i].noun, n, iconPx: fit.iconPx, perRow: fit.perRow, rng, gapX: 5, gapY: 5 }) + `</span>`;
          }
          const choices = rng.shuffle([n, ...distractorsFor({ correct: n, count: 2, min: d.min, max: d.max, rng, deltas: [-2, -1, 1, 2] })]);
          stage = `<div class="ws-card-stage" style="flex-direction:column;gap:14px" data-lcs-expect="${n}">` +
            visual + chipRow({ choices, correct: n }) + `</div>`;
        } else if (mode === 'tally-read') {
          stage = `<div class="ws-card-stage" style="flex-direction:column;gap:14px" data-lcs-expect="${n}">` +
            tally({ n }).svg + `<div class="ws-choices">${answerBox({ w: 76, h: 56, answer: n })}</div></div>`;
        } else if (mode === 'tally-write') {
          const fit = fitIcons({ n, stageW: 200, stageH: 110, maxPx: 42, gapX: 5, gapY: 4 });
          stage = `<div class="ws-card-stage" style="gap:16px" data-lcs-expect="${n}">` +
            `<span data-lcs-iconpattern="${n}">` +
            iconRows({ theme, noun: nouns[i].noun, n, iconPx: fit.iconPx, perRow: fit.perRow, rng, gapX: 5, gapY: 4 }) + `</span>` +
            `<span class="ws-answerbox" style="width:190px;height:72px" data-lcs-answer="${n}"></span></div>`;
        }
        cards.push(stage);
      }
      const cols = 2;
      return { bodyHtml: cardGrid({ cards, cols, rows: Math.ceil(d.items / cols) }), meta: { counts } };
    },

    async verify(page) {
      const m = mode;
      return page.evaluate((mode) => {
        const fails = [];
        if (mode === 'match-frame' || mode === 'match-tally') {
          const left = [...document.querySelectorAll('[data-lcs-left]')].map((e) => e.dataset.lcsLeft);
          const right = [...document.querySelectorAll('[data-lcs-right]')];
          if ([...left].sort().join() !== right.map((e) => e.dataset.lcsRight).sort().join()) fails.push('right not a permutation');
          right.forEach((item, i) => {
            const n = parseInt(item.dataset.lcsRight, 10);
            const shown = mode === 'match-frame'
              ? item.querySelectorAll('[data-lcs-counter]').length
              : item.querySelectorAll('[data-lcs-stroke]').length;
            if (shown !== n) fails.push(`row ${i + 1}: visual shows ${shown} != ${n}`);
            if (item.dataset.lcsRight === left[i]) fails.push(`row ${i + 1}: straight-across match`);
          });
          if (new Set(left).size !== left.length) fails.push('duplicate counts — ambiguous');
          return fails;
        }
        document.querySelectorAll('[data-lcs-expect]').forEach((card, i) => {
          const n = parseInt(card.dataset.lcsExpect, 10);
          if (mode === 'count-frame') {
            const c = card.querySelectorAll('[data-lcs-counter]').length;
            if (c !== n) fails.push(`card ${i + 1}: frame ${c} != ${n}`);
          } else if (mode === 'fill-frame') {
            if (card.querySelectorAll('[data-lcs-counter]').length !== 0) fails.push(`card ${i + 1}: frame must be empty`);
            const printed = parseInt(card.querySelector('[data-lcs-num]').dataset.lcsNum, 10);
            if (printed < 1 || printed > 10) fails.push(`card ${i + 1}: numeral out of frame range`);
          } else if (mode === 'make-10') {
            const filled = card.querySelectorAll('[data-lcs-counter]').length;
            const box = parseInt(card.querySelector('[data-lcs-answer]').dataset.lcsAnswer, 10);
            if (filled + box !== 10) fails.push(`card ${i + 1}: ${filled}+${box} != 10`);
          } else if (mode === 'subitize-dots') {
            const pips = card.querySelectorAll('[data-lcs-pip]').length;
            if (pips !== n) fails.push(`card ${i + 1}: ${pips} pips != ${n}`);
            const correct = card.querySelectorAll('[data-lcs-correct]');
            if (correct.length !== 1 || parseInt(correct[0].dataset.lcsChoice, 10) !== n) fails.push(`card ${i + 1}: chips wrong`);
          } else if (mode === 'subitize-icons') {
            const icons = card.querySelectorAll('.ws-icon').length;
            if (icons !== n) fails.push(`card ${i + 1}: ${icons} icons != ${n}`);
            const correct = card.querySelectorAll('[data-lcs-correct]');
            if (correct.length !== 1 || parseInt(correct[0].dataset.lcsChoice, 10) !== n) fails.push(`card ${i + 1}: chips wrong`);
          } else if (mode === 'tally-read') {
            const strokes = card.querySelectorAll('[data-lcs-stroke]').length;
            if (strokes !== n) fails.push(`card ${i + 1}: ${strokes} tally strokes != ${n}`);
            if (parseInt(card.querySelector('[data-lcs-answer]').dataset.lcsAnswer, 10) !== n) fails.push(`card ${i + 1}: answer mismatch`);
          } else if (mode === 'tally-write') {
            const icons = card.querySelectorAll('.ws-icon').length;
            if (icons !== n) fails.push(`card ${i + 1}: ${icons} icons != ${n}`);
          }
        });
        return fails;
      }, m);
    },
  };
}

module.exports = { makeFrameCountingType };
