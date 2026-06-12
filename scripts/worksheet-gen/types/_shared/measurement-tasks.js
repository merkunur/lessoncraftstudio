/**
 * Factory for the measurement family (class 11):
 *  - 'cubes-measure':  object over a row of unit squares → write length (G1-139)
 *  - 'order-units':    3 objects with cube rows → rank 1-3 by length (G1-140)
 *  - 'compare-length': two measured objects → how many units longer? (G2-236)
 *  - 'thermometer':    read the thermometer → write the value (G3-345)
 *  - 'volume-cubes':   iso cube stack → count the cubes (G3-346)
 *  - 'heavier':        two real things → circle the heavier (K-038, MASS_RANK)
 * Length modes reuse the artExtent zero-registration from the ruler exemplar.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const thermometerPrim = require('../../primitives/thermometer.js');
const unitCubes = require('../../primitives/unit-cubes.js');
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const { artExtent } = require('../../image-cache/silhouette.js');
const { answerBox } = require('../../templates/components.js');
const { MASS_RANK } = require('../../lib/mass-rank.js');
const { svgRoot, roundedRect } = require('../../primitives/_svg.js');
const tokens = require('../../primitives/_tokens.js');

const U = 44, BAND = 110;

function cubeRow(n, max) {
  const t = tokens;
  const parts = [];
  for (let i = 0; i < max; i++) {
    parts.push(roundedRect({
      x: i * U + 1, y: 1, w: U - 2, h: 36, r: 4,
      fill: i < n ? t.color.tealSoft : t.color.white,
      strokeColor: t.color.teal, strokeWidth: 2,
      data: i < n ? { 'data-lcs-cubeunit': 1 } : { 'data-lcs-cubespare': 1 },
    }));
  }
  return svgRoot({ width: max * U + 2, height: 38, label: `${n} unit squares` },
    parts.join(''), { 'data-lcs-cuberow': n, 'data-lcs-cubemax': max });
}

/** object art registered over its cube row, starting at 0 (ruler-exemplar math) */
function measuredObject(theme, item, lengthU, maxU, band) {
  const targetPx = lengthU * U;
  const boxW = targetPx / item.ext.widthFrac;
  const leftShift = item.ext.leftFrac * boxW;
  const artH = item.ext.heightFrac * boxW;
  const topShift = item.ext.topFrac * boxW;
  const bandH = Math.min(artH, band || BAND);
  return `<span style="display:inline-flex;flex-direction:column;align-items:flex-start" data-lcs-objlen="${lengthU}">` +
    `<span style="position:relative;display:block;width:${maxU * U + 2}px;height:${bandH.toFixed(1)}px;overflow:hidden">` +
    `<img class="ws-icon" src="${fileUri(theme, item.noun)}" alt="" ` +
    `style="position:absolute;left:${(1 - leftShift).toFixed(1)}px;top:${(-topShift).toFixed(1)}px;width:${boxW.toFixed(1)}px;height:${boxW.toFixed(1)}px">` +
    `</span>` + cubeRow(lengthU, maxU) + `</span>`;
}

async function flatNouns(theme, rng, count, maxLenU, minMaxLen, band) {
  const pool = labelSafeNouns(theme);
  const out = [];
  const floor = minMaxLen || 3;
  for (const n of rng.shuffle(pool)) {
    const ext = await artExtent(theme, n.noun);
    const maxLen = Math.floor((band || BAND) * ext.widthFrac / (U * ext.heightFrac));
    if (maxLen >= floor) out.push({ ...n, ext, maxLen: Math.min(maxLen, maxLenU) });
    if (out.length >= count) break;
  }
  if (out.length < count) throw new Error(`measurement: theme ${theme} lacks flat nouns (need ${count} with maxLen>=${floor})`);
  return out;
}

function makeMeasurementType(cfg) {
  const { id, slug, mode, gradeBand, i18n } = cfg;
  return {
    id,
    slug,
    gradeBand: gradeBand || 'G1',
    assetClass: 'measurement',
    exerciseType: 'measurement',
    themeAxis: { applicable: ['cubes-measure', 'order-units', 'compare-length', 'heavier'].includes(mode), minNouns: 4 },
    difficulty: cfg.difficulty || { 1: { rows: 3 }, 2: { rows: 3 }, 3: { rows: 4 } },
    i18n,

    async build({ theme, difficulty }, ctx) {
      const d = this.difficulty[difficulty];
      const rng = ctx.rng;
      const cards = [];

      if (mode === 'cubes-measure') {
        const items = await flatNouns(theme, rng, d.rows, 9);
        for (const item of items) {
          const len = rng.int(3, item.maxLen);
          cards.push(`<div class="ws-card-stage" style="gap:20px;justify-content:space-between;padding:4px 8px">` +
            measuredObject(theme, item, len, Math.min(item.maxLen + 1, 10)) +
            answerBox({ w: 72, h: 52, answer: len }) + `</div>`);
        }
        return { bodyHtml: cardGrid({ cards, cols: 1, rows: d.rows }), meta: {} };
      }

      if (mode === 'order-units') {
        const items = await flatNouns(theme, rng, 3, 8, 5, 150);   // taller band: 3 cards have room
        const lens = rng.sample([3, 4, 5, 6, 7, 8].filter((v) => v <= Math.min(...items.map((x) => x.maxLen))), 3);
        if (lens.length < 3) throw new Error('order-units: not enough distinct lengths');
        const rank = lens.map((v) => [...lens].sort((a, b) => a - b).indexOf(v) + 1);
        items.forEach((item, i) => {
          cards.push(`<div class="ws-card-stage" style="gap:20px;justify-content:space-between;padding:4px 8px" data-lcs-rank="${rank[i]}">` +
            measuredObject(theme, item, lens[i], 9, 150) +
            answerBox({ w: 56, h: 48, answer: rank[i] }) + `</div>`);
        });
        return { bodyHtml: cardGrid({ cards, cols: 1, rows: 3 }), meta: {} };
      }

      if (mode === 'compare-length') {
        for (let i = 0; i < 2; i++) {
          const items = await flatNouns(theme, rng, 2, 8, 4);   // range [3..≥4] guarantees a≠b exists
          let a = rng.int(3, items[0].maxLen), b;
          let guard = 0;
          do { b = rng.int(3, items[1].maxLen); guard++; } while (b === a && guard < 30);
          if (b === a) b = a > 3 ? a - 1 : a + 1;
          cards.push(`<div class="ws-card-stage" style="flex-direction:column;gap:10px;align-items:flex-start;padding:4px 14px" data-lcs-a="${a}" data-lcs-b="${b}">` +
            measuredObject(theme, items[0], a, 9) +
            measuredObject(theme, items[1], b, 9) +
            `<span style="align-self:flex-end;display:inline-flex;align-items:center;gap:8px">` +
            `<span style="font-family:'Baloo 2';font-weight:700;font-size:22px;color:#146B5E">Δ</span>` +
            answerBox({ w: 64, h: 48, answer: Math.abs(a - b) }) + `</span></div>`);
        }
        return { bodyHtml: cardGrid({ cards, cols: 1, rows: 2 }), meta: {} };
      }

      if (mode === 'thermometer') {
        const used = new Set();
        for (let i = 0; i < 3; i++) {
          let v;
          do { v = 5 * rng.int(1, 7); } while (used.has(v));
          used.add(v);
          const th = thermometerPrim({ value: v, min: 0, max: 40, step: 5, height: 250 });
          cards.push(`<div class="ws-card-stage" style="gap:30px">` + th.svg +
            answerBox({ w: 76, h: 54, answer: v }) + `</div>`);
        }
        return { bodyHtml: cardGrid({ cards, cols: 3, rows: 1 }), meta: {} };
      }

      if (mode === 'volume-cubes') {
        const used = new Set();
        for (let i = 0; i < 4; i++) {
          let l, w, h, g = 0;
          do { l = rng.int(2, 4); w = rng.int(1, 3); h = rng.int(1, 3); g++; }
          while (used.has(`${l}.${w}.${h}`) && g < 30);
          used.add(`${l}.${w}.${h}`);
          const stack = unitCubes({ l, w, h, unit: 24 });
          cards.push(`<div class="ws-card-stage" style="gap:26px;justify-content:space-between;padding:6px 18px">` +
            stack.svg + answerBox({ w: 68, h: 52, answer: l * w * h }) + `</div>`);
        }
        return { bodyHtml: cardGrid({ cards, cols: 2, rows: 2 }), meta: {} };
      }

      if (mode === 'heavier') {
        const rank = MASS_RANK[theme];
        if (!rank) throw new Error(`heavier: no MASS_RANK for theme ${theme}`);
        const have = labelSafeNouns(theme).map((n) => n.noun);
        const ranked = rank.filter((n) => have.includes(n));
        for (let i = 0; i < d.rows; i++) {
          let i1, i2, g = 0;
          do { i1 = rng.int(0, ranked.length - 1); i2 = rng.int(0, ranked.length - 1); g++; }
          while (Math.abs(i1 - i2) < 3 && g < 60);   // ≥3 ranks apart = obvious
          const heavy = Math.min(i1, i2), light = Math.max(i1, i2);
          const sides = rng.shuffle([{ n: ranked[heavy], ok: true }, { n: ranked[light], ok: false }]);
          const chips = sides.map((s) =>
            `<span class="ws-pattern-chip" style="width:130px;height:130px"${s.ok ? ' data-lcs-correct="1"' : ''} data-lcs-noun="${s.n}">` +
            `<img class="ws-icon" src="${fileUri(theme, s.n)}" alt="" style="width:96px;height:96px"></span>`).join('');
          cards.push(`<div class="ws-card-stage" style="justify-content:space-evenly" data-lcs-heavy="${ranked[heavy]}">${chips}</div>`);
        }
        return { bodyHtml: cardGrid({ cards, cols: 1, rows: d.rows }), meta: {} };
      }

      throw new Error('measurement-tasks: unknown mode ' + mode);
    },

    async verify(page) {
      const m = mode;
      return page.evaluate((mode) => {
        const fails = [];
        const rowOk = (wrap) => {
          const row = wrap.querySelector('[data-lcs-cuberow]');
          const n = +row.dataset.lcsCuberow;
          const filled = row.querySelectorAll('[data-lcs-cubeunit]').length;
          if (filled !== n) return `cube row shows ${filled} != ${n}`;
          if (+wrap.dataset.lcsObjlen !== n) return 'object length != cube row';
          return null;
        };
        document.querySelectorAll('[data-lcs-card]').forEach((card, i) => {
          if (mode === 'cubes-measure') {
            const wrap = card.querySelector('[data-lcs-objlen]');
            const err = rowOk(wrap);
            if (err) fails.push(`row ${i + 1}: ${err}`);
            if (+card.querySelector('[data-lcs-answer]').dataset.lcsAnswer !== +wrap.dataset.lcsObjlen) fails.push(`row ${i + 1}: answer mismatch`);
          } else if (mode === 'order-units') {
            const wrap = card.querySelector('[data-lcs-objlen]');
            const err = rowOk(wrap);
            if (err) fails.push(`row ${i + 1}: ${err}`);
          } else if (mode === 'compare-length') {
            const a = +card.querySelector('[data-lcs-a]').dataset.lcsA;
            const b = +card.querySelector('[data-lcs-a]').dataset.lcsB;
            const wraps = [...card.querySelectorAll('[data-lcs-objlen]')];
            wraps.forEach((w2) => { const e = rowOk(w2); if (e) fails.push(`card ${i + 1}: ${e}`); });
            if (+wraps[0].dataset.lcsObjlen !== a || +wraps[1].dataset.lcsObjlen !== b) fails.push(`card ${i + 1}: lengths != declared`);
            if (a === b) fails.push(`card ${i + 1}: equal lengths`);
            if (+card.querySelector('[data-lcs-answer]').dataset.lcsAnswer !== Math.abs(a - b)) fails.push(`card ${i + 1}: difference mismatch`);
          } else if (mode === 'thermometer') {
            const svg = card.querySelector('[data-lcs-prim="thermometer"]');
            const v = +svg.dataset.lcsValue;
            const merc = svg.querySelector('[data-lcs-mercury]');
            if (+merc.dataset.lcsMercury !== v) fails.push(`card ${i + 1}: mercury != ${v}`);
            if (+card.querySelector('[data-lcs-answer]').dataset.lcsAnswer !== v) fails.push(`card ${i + 1}: answer mismatch`);
          } else if (mode === 'volume-cubes') {
            const svg = card.querySelector('[data-lcs-prim="unit-cubes"]');
            const want = +svg.dataset.lcsL * +svg.dataset.lcsW * +svg.dataset.lcsH;
            // count top faces (one per cube)
            const cubes = svg.querySelectorAll('[data-lcs-cube]').length;
            if (cubes !== want) fails.push(`card ${i + 1}: ${cubes} cubes drawn != ${want}`);
            if (+card.querySelector('[data-lcs-answer]').dataset.lcsAnswer !== want) fails.push(`card ${i + 1}: volume mismatch`);
          } else if (mode === 'heavier') {
            const correct = [...card.querySelectorAll('.ws-pattern-chip')].filter((c) => c.dataset.lcsCorrect);
            if (correct.length !== 1) fails.push(`row ${i + 1}: ${correct.length} correct`);
            else if (correct[0].dataset.lcsNoun !== card.querySelector('[data-lcs-heavy]').dataset.lcsHeavy) fails.push(`row ${i + 1}: heavy mark wrong`);
          }
        });
        return fails;
      }, m);
    },
  };
}

module.exports = { makeMeasurementType };
