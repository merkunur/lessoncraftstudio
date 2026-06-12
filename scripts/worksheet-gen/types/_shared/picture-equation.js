/**
 * Factory for the G1 picture-equation family:
 *  - 'add':        a icons + b icons, write a + b = []        (G1-101/102)
 *  - 'add3':       three groups                               (G1-112)
 *  - 'crossout':   n icons, k crossed out, write n − k = []   (G1-103/104)
 *  - 'compare':    two groups, circle <, =, >                 (G1-114)
 *  - 'missing':    a icons + [] = total (numeral), write the missing addend (G1-115)
 * Each row: icon groups + an equation strip with write-in boxes.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const { iconRows, fitIcons, answerBox } = require('../../templates/components.js');

const OP = (ch) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:32px;color:#146B5E;flex:0 0 auto">${ch}</span>`;
const NUM = (n) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:34px;color:#3A3530;flex:0 0 auto" data-lcs-num="${n}">${n}</span>`;

function group(theme, noun, n, rng, opts) {
  const o = opts || {};
  const fit = fitIcons({ n, stageW: o.w || 170, stageH: o.h || 110, maxPx: o.maxPx || 46, gapX: 5, gapY: 4 });
  return `<div class="ws-subgroup" style="flex:1 1 0" data-lcs-group="${n}">` +
    iconRows({ theme, noun, n, iconPx: fit.iconPx, perRow: fit.perRow, rng, gapX: 5, gapY: 4 }) +
    `</div>`;
}

/** n icons in rows; the LAST k get a coral cross-out X overlay. */
function crossoutGroup(theme, noun, n, k, rng) {
  const fit = fitIcons({ n, stageW: 360, stageH: 110, maxPx: 50, gapX: 6, gapY: 5 });
  const imgs = [];
  for (let i = 0; i < n; i++) {
    const crossed = i >= n - k;
    const X = crossed
      ? `<svg style="position:absolute;inset:0" width="${fit.iconPx}" height="${fit.iconPx}" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">` +
        `<path d="M7 7l26 26M33 7L7 33" stroke="#F2784B" stroke-width="5" stroke-linecap="round"/></svg>`
      : '';
    imgs.push(`<span style="position:relative;display:inline-block;width:${fit.iconPx}px;height:${fit.iconPx}px"` +
      `${crossed ? ' data-lcs-crossed="1"' : ''}>` +
      `<img class="ws-icon" src="${fileUri(theme, noun)}" alt="" style="width:100%;height:100%${crossed ? ';opacity:0.85' : ''}">${X}</span>`);
  }
  const rows = [];
  let i = 0;
  while (i < n) {
    rows.push(`<div class="ws-icon-row" style="gap:6px">${imgs.slice(i, i + fit.perRow).join('')}</div>`);
    i += fit.perRow;
  }
  return `<div class="ws-subgroup" style="flex:1 1 0" data-lcs-total="${n}" data-lcs-crossedn="${k}">` +
    `<div class="ws-icon-rows" style="gap:5px">${rows.join('')}</div></div>`;
}

function makePictureEquationType(cfg) {
  const { id, slug, mode, maxTotal, i18n } = cfg;
  return {
    id,
    slug,
    gradeBand: 'G1',
    assetClass: 'icon-placement',
    exerciseType: mode === 'compare' ? 'comparing-groups' : 'picture-arithmetic',
    themeAxis: { applicable: true, minNouns: 4 },
    difficulty: cfg.difficulty || {
      1: { maxTotal: Math.min(5, maxTotal), rows: 4 },
      2: { maxTotal, rows: 4 },
      3: { maxTotal: maxTotal + 5, rows: 4 },
    },
    i18n,

    build({ theme, difficulty }, ctx) {
      const d = this.difficulty[difficulty];
      const rng = ctx.rng;
      const nouns = rng.sample(labelSafeNouns(theme), d.rows);
      const cards = [];
      const truth = [];
      for (let i = 0; i < d.rows; i++) {
        const noun = nouns[i].noun;
        let stage;
        if (mode === 'add' || mode === 'compare') {
          const a = rng.int(1, d.maxTotal - 1);
          const b = mode === 'add' ? rng.int(1, d.maxTotal - a) : rng.int(1, d.maxTotal - 1);
          if (mode === 'add') {
            stage = group(theme, noun, a, rng) + OP('+') + group(theme, noun, b, rng) + OP('=') +
              answerBox({ w: 70, h: 58, answer: a + b });
            truth.push({ a, b, ans: a + b });
          } else {
            const sym = a < b ? '&lt;' : (a > b ? '&gt;' : '=');
            const chips = rng.shuffle(['&lt;', '=', '&gt;']).map((s) =>
              `<span class="ws-chip" style="width:46px;height:46px;font-size:24px" data-lcs-sym="${s}"` +
              `${s === sym ? ' data-lcs-correct="1"' : ''}>${s}</span>`).join('');
            stage = group(theme, noun, a, rng) +
              `<span style="display:inline-flex;flex-direction:column;gap:8px;flex:0 0 auto">${chips}</span>` +
              group(theme, noun, b, rng);
            truth.push({ a, b, sym });
          }
        } else if (mode === 'add3') {
          const a = rng.int(1, Math.max(1, Math.floor(d.maxTotal / 3)));
          const b = rng.int(1, Math.max(1, Math.floor((d.maxTotal - a) / 2)));
          const c = rng.int(1, Math.max(1, d.maxTotal - a - b));
          stage = group(theme, noun, a, rng, { w: 120 }) + OP('+') + group(theme, noun, b, rng, { w: 120 }) +
            OP('+') + group(theme, noun, c, rng, { w: 120 }) + OP('=') + answerBox({ w: 64, h: 56, answer: a + b + c });
          truth.push({ a, b, c, ans: a + b + c });
        } else if (mode === 'crossout') {
          const n = rng.int(2, d.maxTotal);
          const k = rng.int(1, n - 1);
          stage = crossoutGroup(theme, noun, n, k, rng) + OP('') +
            `<span style="display:inline-flex;align-items:center;gap:8px;flex:0 0 auto">` +
            NUM(n) + OP('−') + NUM(k) + OP('=') + answerBox({ w: 64, h: 56, answer: n - k }) + `</span>`;
          truth.push({ n, k, ans: n - k });
        } else if (mode === 'missing') {
          const total = rng.int(3, d.maxTotal);
          const a = rng.int(1, total - 1);
          stage = group(theme, noun, a, rng) + OP('+') +
            answerBox({ w: 70, h: 58, answer: total - a }) + OP('=') + NUM(total);
          truth.push({ a, total, ans: total - a });
        }
        cards.push(`<div class="ws-card-stage" style="gap:12px" data-lcs-mode="${mode}">${stage}</div>`);
      }
      return { bodyHtml: cardGrid({ cards, cols: 1, rows: d.rows }), meta: { rows: truth } };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const count = (g) => g.querySelectorAll('.ws-icon').length;
        document.querySelectorAll('[data-lcs-mode]').forEach((stage, i) => {
          const mode = stage.dataset.lcsMode;
          const groups = [...stage.querySelectorAll('[data-lcs-group]')];
          groups.forEach((g) => {
            const n = parseInt(g.dataset.lcsGroup, 10);
            if (count(g) !== n) fails.push(`row ${i + 1}: group shows ${count(g)} != ${n}`);
          });
          const box = stage.querySelector('[data-lcs-answer]');
          if (mode === 'add') {
            const [a, b] = groups.map((g) => parseInt(g.dataset.lcsGroup, 10));
            if (parseInt(box.dataset.lcsAnswer, 10) !== a + b) fails.push(`row ${i + 1}: sum mismatch`);
          } else if (mode === 'add3') {
            const [a, b, c] = groups.map((g) => parseInt(g.dataset.lcsGroup, 10));
            if (parseInt(box.dataset.lcsAnswer, 10) !== a + b + c) fails.push(`row ${i + 1}: sum mismatch`);
          } else if (mode === 'crossout') {
            const g = stage.querySelector('[data-lcs-total]');
            const n = parseInt(g.dataset.lcsTotal, 10), k = parseInt(g.dataset.lcsCrossedn, 10);
            if (count(g) !== n) fails.push(`row ${i + 1}: ${count(g)} icons != ${n}`);
            const crossed = g.querySelectorAll('[data-lcs-crossed]').length;
            if (crossed !== k) fails.push(`row ${i + 1}: ${crossed} crossed != ${k}`);
            const nums = [...stage.querySelectorAll('[data-lcs-num]')].map((e) => parseInt(e.dataset.lcsNum, 10));
            if (nums[0] !== n || nums[1] !== k) fails.push(`row ${i + 1}: printed equation != picture`);
            if (parseInt(box.dataset.lcsAnswer, 10) !== n - k) fails.push(`row ${i + 1}: difference mismatch`);
          } else if (mode === 'compare') {
            const [a, b] = groups.map((g) => parseInt(g.dataset.lcsGroup, 10));
            const expected = a < b ? '<' : (a > b ? '>' : '=');
            const correct = [...stage.querySelectorAll('.ws-chip')].filter((c) => c.dataset.lcsCorrect);
            if (correct.length !== 1) fails.push(`row ${i + 1}: ${correct.length} correct chips`);
            else if (correct[0].textContent.trim() !== expected) fails.push(`row ${i + 1}: chip ${correct[0].textContent} != ${expected}`);
          } else if (mode === 'missing') {
            const a = parseInt(groups[0].dataset.lcsGroup, 10);
            const total = parseInt(stage.querySelector('[data-lcs-num]').dataset.lcsNum, 10);
            if (parseInt(box.dataset.lcsAnswer, 10) !== total - a) fails.push(`row ${i + 1}: missing addend mismatch`);
          }
        });
        return fails;
      });
    },
  };
}

module.exports = { makePictureEquationType };
