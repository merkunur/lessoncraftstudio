/**
 * Factory for the geometry family (class 10), driven by the shapes library
 * theme + lib/shape-data.js facts:
 *  - 'count-sides':    polygon cards → write sides (K-075)
 *  - 'sort-sides':     shapes strip → numeral-labeled bins (K-076/G2-241)
 *  - 'solid-counts':   solids → write faces|edges|vertices (G2-242/245)
 *  - 'solid-real':     solids ↔ real-world objects, lines (G2-243)
 *  - 'symmetry-yn':    icon split by a dashed line → ✓/✗ chips (G2-247)
 *  - 'pick-symmetric': circle the mirror-symmetric picture (G2-248)
 *  - 'perimeter':      unit-grid rectangle → perimeter (G3-337)
 *  - 'same-area':      circle the shape with the SAME area/perimeter (G3-338/339)
 *  - 'classify-quads': quads strip → square/rectangle/other bins (G3-340)
 *  - 'angles':         circle every RIGHT angle (G3-341)
 *  - 'symmetry-count': write how many mirror lines (G3-342)
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { themeEntry, fileUri, labelSafeNouns } = require('../../image-cache/resolve.js');
const { maskSignature, maskIoU } = require('../../image-cache/silhouette.js');
const { SHAPES_2D, SHAPES_3D, SOLID_REAL_OBJECTS } = require('../../lib/shape-data.js');
const { answerBox } = require('../../templates/components.js');
const { svgRoot, el, roundedRect, line } = require('../../primitives/_svg.js');
const tokens = require('../../primitives/_tokens.js');

// mirror-line counts for the shapes-theme art (hand-curated; circle skipped — "endless")
const SYMMETRY_COUNT = { square: 4, rectangle: 2, triangle: 3, diamond: 2, oval: 2, pentagon: 5, hexagon: 6, heart: 1, star: 5, trapezoid: 1 };
const QUAD_CLASS = { square: 'square', rectangle: 'rectangle', diamond: 'other', trapezoid: 'other', parallelogram: 'other' };

function flipMask(m) {
  const out = new Array(m.length);
  for (let r = 0; r < 24; r++) for (let c = 0; c < 24; c++) out[r * 24 + c] = m[r * 24 + (23 - c)];
  return out;
}

function shapeImg(k, px, extra) {
  return `<img class="ws-icon" src="${fileUri('shapes', k)}" alt="" style="width:${px}px;height:${px}px"${extra || ''}>`;
}

function angleSvg(deg, size, mark) {
  const t = tokens;
  const c = 14, len = size - 22;
  const a = (-deg) * Math.PI / 180;
  const x2 = c + len * Math.cos(a), y2 = (size - 14) + len * Math.sin(a);
  const parts = [
    line({ x1: c, y1: size - 14, x2: c + len, y2: size - 14, strokeColor: t.color.ink, strokeWidth: 3.5 }),
    line({ x1: c, y1: size - 14, x2, y2, strokeColor: t.color.ink, strokeWidth: 3.5 }),
  ];
  if (mark) {
    parts.push(el('path', { d: `M ${c + 16} ${size - 14} L ${c + 16} ${size - 30} L ${c} ${size - 30}`, fill: 'none', stroke: t.color.coral, 'stroke-width': 2.5 }));
  }
  return svgRoot({ width: size, height: size, label: `angle ${deg} degrees` },
    parts.join(''), { 'data-lcs-angle': deg });
}

function unitRect(r, c, cell) {
  const t = tokens;
  const parts = [];
  for (let rr = 0; rr < r; rr++) for (let cc = 0; cc < c; cc++) {
    parts.push(roundedRect({
      x: cc * cell + 1, y: rr * cell + 1, w: cell - 2, h: cell - 2, r: 2,
      fill: t.color.tealSoft, strokeColor: t.color.teal, strokeWidth: 1.5, data: { 'data-lcs-sq': 1 },
    }));
  }
  return svgRoot({ width: c * cell + 2, height: r * cell + 2, label: `${r} by ${c} rectangle` },
    parts.join(''), { 'data-lcs-rect-r': r, 'data-lcs-rect-c': c });
}

function makeGeometryType(cfg) {
  const { id, slug, mode, facet, gradeBand, i18n } = cfg;
  return {
    id,
    slug,
    gradeBand: gradeBand || 'G23',
    assetClass: 'geometry',
    exerciseType: 'geometry',
    themeAxis: { applicable: ['symmetry-yn', 'pick-symmetric'].includes(mode), minNouns: 6 },
    difficulty: cfg.difficulty || { 1: { rows: 4 }, 2: { rows: 4 }, 3: { rows: 5 } },
    i18n,

    async build({ theme, difficulty }, ctx) {
      const d = this.difficulty[difficulty];
      const rng = ctx.rng;
      const have = Object.keys(themeEntry('shapes').nouns);
      const cards = [];

      if (mode === 'count-sides') {
        const polys = rng.sample(Object.keys(SHAPES_2D).filter((k) => have.includes(k) && SHAPES_2D[k].sides > 0), Math.min(6, d.rows + 2));
        polys.slice(0, 6).forEach((k) => {
          cards.push(`<div class="ws-card-stage" style="flex-direction:column;gap:14px" data-lcs-shape="${k}" data-lcs-sides="${SHAPES_2D[k].sides}">` +
            shapeImg(k, 110) + answerBox({ w: 64, h: 50, answer: SHAPES_2D[k].sides }) + `</div>`);
        });
        return { bodyHtml: cardGrid({ cards, cols: 3, rows: 2 }), meta: {} };
      }

      if (mode === 'sort-sides') {
        const sideGroups = [3, 4, rng.pick([5, 6])];
        const pool = Object.keys(SHAPES_2D).filter((k) => have.includes(k) && sideGroups.includes(SHAPES_2D[k].sides));
        const items = rng.shuffle(pool).slice(0, 7);
        const strip = items.map((k) =>
          `<span class="ws-pattern-slot" style="width:88px;height:88px" data-lcs-item="${k}" data-lcs-sides="${SHAPES_2D[k].sides}">${shapeImg(k, 64)}</span>`).join('');
        const bins = sideGroups.map((s) =>
          `<div class="ws-bin" data-lcs-bin="${s}">` +
          `<span class="ws-bin-label" style="font-family:'Baloo 2';font-weight:700;font-size:22px;color:#146B5E">${s}</span></div>`).join('');
        return {
          bodyHtml: `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;min-height:0">` +
            `<div style="display:flex;justify-content:center;gap:16px;flex-wrap:wrap">${strip}</div>` +
            `<div style="display:flex;justify-content:space-evenly;gap:24px">${bins}</div></div>`,
          meta: {},
        };
      }

      if (mode === 'solid-counts') {
        const solids = rng.shuffle(Object.keys(SHAPES_3D).filter((k) => have.includes(k) && !SHAPES_3D[k].curved));
        const extra = rng.shuffle(['cylinder', 'cone'].filter((k) => have.includes(k) && facet === 'faces'));
        const picked = [...solids, ...extra].slice(0, 4);
        picked.forEach((k) => {
          cards.push(`<div class="ws-card-stage" style="gap:30px" data-lcs-shape="${k}" data-lcs-count="${SHAPES_3D[k][facet]}">` +
            shapeImg(k, 120) + answerBox({ w: 64, h: 52, answer: SHAPES_3D[k][facet] }) + `</div>`);
        });
        return { bodyHtml: cardGrid({ cards, cols: 2, rows: 2 }), meta: { facet } };
      }

      if (mode === 'solid-real') {
        const entries = Object.entries(SOLID_REAL_OBJECTS).filter(([k]) => have.includes(k));
        const items = rng.shuffle(entries).slice(0, 4);
        let order;
        do { order = rng.shuffle(items.map((_, i) => i)); }
        while (order.some((v, i) => v === i));
        const itemH = Math.floor((760 - 3 * 14) / 4);
        const left = items.map(([solid]) =>
          `<div class="ws-match-item" style="width:200px;height:${itemH}px" data-lcs-left="${solid}">` +
          shapeImg(solid, Math.min(110, itemH - 30)) +
          `<span class="ws-match-dot ws-match-dot--right"></span></div>`).join('');
        const right = order.map((idx) => {
          const [solid, objs] = items[idx];
          const obj = objs[0];
          return `<div class="ws-match-item ws-match-item--plain" style="width:200px;height:${itemH}px" data-lcs-right="${solid}">` +
            `<img class="ws-icon" src="${fileUri(obj.theme, obj.noun)}" alt="" style="width:${Math.min(100, itemH - 34)}px;height:${Math.min(100, itemH - 34)}px">` +
            `<span class="ws-match-dot ws-match-dot--left"></span></div>`;
        }).join('');
        return {
          bodyHtml: `<div class="ws-match" style="padding:6px 60px">` +
            `<div class="ws-match-col">${left}</div><div class="ws-match-col">${right}</div></div>`,
          meta: {},
        };
      }

      if (mode === 'symmetry-yn' || mode === 'pick-symmetric') {
        // classify theme nouns by mirror symmetry of their alpha mask
        const pool = labelSafeNouns(theme);
        const sym = [], asym = [];
        for (const n of rng.shuffle(pool)) {
          const m = await maskSignature(theme, n.noun);
          const iou = maskIoU(m, flipMask(m));
          if (iou >= 0.9) sym.push(n);
          else if (iou < 0.78) asym.push(n);
          if (sym.length >= d.rows && asym.length >= d.rows * 2) break;
        }
        // A theme with too few mirror-symmetric (or asymmetric) nouns would
        // produce a blank/degraded sheet (e.g. vehicles: side-view cars are
        // asymmetric → 0 symmetric). Throw so cli.js retries an alternate theme;
        // never emit an empty worksheet. (symmetry-yn needs 2 symmetric for the
        // two ✓ cards; pick-symmetric needs ≥1 symmetric + 2 asymmetric per row.)
        const minSym = mode === 'symmetry-yn' ? 2 : 1;
        if (sym.length < minSym || asym.length < 2) {
          throw new Error(`geometry: theme ${theme} lacks mirror-symmetry variety for ${mode} (sym=${sym.length}, asym=${asym.length})`);
        }
        if (mode === 'symmetry-yn') {
          const picks = rng.shuffle([...sym.slice(0, 2).map((n) => ({ n, s: true })), ...asym.slice(0, 2).map((n) => ({ n, s: false }))]);
          picks.forEach(({ n, s }) => {
            cards.push(
              `<div class="ws-card-stage" style="flex-direction:column;gap:12px" data-lcs-sym="${s ? 1 : 0}">` +
              `<span style="position:relative;display:inline-block">` +
              `<img class="ws-icon" src="${fileUri(theme, n.noun)}" alt="" style="width:120px;height:120px">` +
              `<span style="position:absolute;left:50%;top:-6px;bottom:-6px;width:0;border-left:3px dashed #F2784B"></span></span>` +
              `<div class="ws-choices">` +
              `<span class="ws-chip" style="width:52px;height:52px;font-size:24px" data-lcs-val="yes"${s ? ' data-lcs-correct="1"' : ''}>✓</span>` +
              `<span class="ws-chip" style="width:52px;height:52px;font-size:24px" data-lcs-val="no"${!s ? ' data-lcs-correct="1"' : ''}>✗</span>` +
              `</div></div>`);
          });
          return { bodyHtml: cardGrid({ cards, cols: 2, rows: 2 }), meta: {} };
        }
        // pick-symmetric rows: 1 symmetric + 2 asymmetric
        for (let i = 0; i < Math.min(d.rows, sym.length); i++) {
          const opts = rng.shuffle([{ n: sym[i], ok: true }, ...rng.sample(asym, 2).map((n) => ({ n, ok: false }))]);
          const chips = opts.map((o) =>
            `<span class="ws-pattern-chip" style="width:96px;height:96px"${o.ok ? ' data-lcs-correct="1"' : ''}>` +
            `<img class="ws-icon" src="${fileUri(theme, o.n.noun)}" alt="" style="width:70px;height:70px"></span>`).join('');
          cards.push(`<div class="ws-card-stage" style="justify-content:center;gap:26px">${chips}</div>`);
        }
        return { bodyHtml: cardGrid({ cards, cols: 1, rows: cards.length }), meta: {} };
      }

      if (mode === 'perimeter') {
        const used = new Set();
        for (let i = 0; i < 4; i++) {
          let r, c, g = 0;
          do { r = rng.int(2, 5); c = rng.int(3, 8); g++; } while (used.has(r + 'x' + c) && g < 30);
          used.add(r + 'x' + c);
          const cell = Math.min(30, Math.floor(230 / c), Math.floor(130 / r));
          cards.push(`<div class="ws-card-stage" style="gap:26px;justify-content:space-between;padding:6px 16px">` +
            unitRect(r, c, cell) + answerBox({ w: 72, h: 52, answer: 2 * (r + c) }) + `</div>`);
        }
        return { bodyHtml: cardGrid({ cards, cols: 2, rows: 2 }), meta: {} };
      }

      if (mode === 'same-area' || mode === 'same-perimeter') {
        const isArea = mode === 'same-area';
        for (let i = 0; i < 2; i++) {
          // target r×c; correct = different rect with same area (or perimeter)
          let r1, c1, r2, c2, g = 0;
          do {
            r1 = rng.int(2, 4); c1 = rng.int(3, 6);
            const candidates = [];
            for (let rr = 1; rr <= 8; rr++) for (let cc = rr; cc <= 12; cc++) {
              if (rr === r1 && cc === c1) continue;
              if (rr === c1 && cc === r1) continue;
              if (isArea ? rr * cc === r1 * c1 : 2 * (rr + cc) === 2 * (r1 + c1)) candidates.push([rr, cc]);
            }
            if (candidates.length) { [r2, c2] = rng.pick(candidates); break; }
            g++;
          } while (g < 40);
          if (r2 === undefined) { [r1, c1, r2, c2] = [2, 6, 3, 4]; }
          // distractor: differs on the measured quantity
          let r3, c3;
          do { r3 = rng.int(2, 5); c3 = rng.int(2, 8); }
          while (isArea ? r3 * c3 === r1 * c1 : 2 * (r3 + c3) === 2 * (r1 + c1));
          const cell = 18;
          const opt = (r, c, ok) =>
            `<span class="ws-pattern-chip" style="width:auto;height:auto;border-radius:12px;padding:8px"${ok ? ' data-lcs-correct="1"' : ''}>` +
            unitRect(r, c, cell) + `</span>`;
          const opts = rng.shuffle([opt(r2, c2, true), opt(r3, c3, false)]);
          cards.push(`<div class="ws-card-stage" style="gap:24px;justify-content:space-between;padding:6px 14px" data-lcs-measure="${isArea ? 'area' : 'perimeter'}">` +
            `<span data-lcs-target>${unitRect(r1, c1, cell)}</span>` +
            `<span style="font-family:'Baloo 2';font-weight:700;font-size:24px;color:#F2784B">=?</span>` +
            `<span class="ws-pattern-choices">${opts.join('')}</span></div>`);
        }
        return { bodyHtml: cardGrid({ cards, cols: 1, rows: 2 }), meta: {} };
      }

      if (mode === 'classify-quads') {
        const pool = Object.keys(QUAD_CLASS).filter((k) => have.includes(k));
        const items = rng.shuffle([...pool, ...rng.sample(pool, Math.max(0, 7 - pool.length))]).slice(0, 7);
        const strip = items.map((k) =>
          `<span class="ws-pattern-slot" style="width:84px;height:84px" data-lcs-item="${k}" data-lcs-class="${QUAD_CLASS[k]}">${shapeImg(k, 60)}</span>`).join('');
        const bins = ['square', 'rectangle', 'other'].map((cls) => {
          const labelKey = cls === 'other' ? 'trapezoid' : cls;
          return `<div class="ws-bin" data-lcs-bin="${cls}">` +
            `<span class="ws-bin-label">${shapeImg(labelKey, 38)}</span></div>`;
        }).join('');
        return {
          bodyHtml: `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;min-height:0">` +
            `<div style="display:flex;justify-content:center;gap:14px;flex-wrap:wrap">${strip}</div>` +
            `<div style="display:flex;justify-content:space-evenly;gap:20px">${bins}</div></div>`,
          meta: {},
        };
      }

      if (mode === 'angles') {
        for (let i = 0; i < 2; i++) {
          const degs = rng.shuffle([90, rng.int(30, 65), rng.int(110, 150), rng.next() < 0.5 ? 90 : rng.int(35, 60)]);
          const chips = degs.map((deg) =>
            `<span class="ws-pattern-slot" style="width:120px;height:120px"${deg === 90 ? ' data-lcs-target="1"' : ''}>` +
            angleSvg(deg, 100, deg === 90) + `</span>`).join('');
          cards.push(`<div class="ws-card-stage" style="justify-content:space-evenly">${chips}</div>`);
        }
        return { bodyHtml: cardGrid({ cards, cols: 1, rows: 2 }), meta: {} };
      }

      if (mode === 'symmetry-count') {
        const pool = Object.keys(SYMMETRY_COUNT).filter((k) => have.includes(k));
        rng.sample(pool, Math.min(6, pool.length)).forEach((k) => {
          cards.push(`<div class="ws-card-stage" style="flex-direction:column;gap:14px" data-lcs-shape="${k}" data-lcs-symn="${SYMMETRY_COUNT[k]}">` +
            shapeImg(k, 104) + answerBox({ w: 60, h: 48, answer: SYMMETRY_COUNT[k] }) + `</div>`);
        });
        return { bodyHtml: cardGrid({ cards, cols: 3, rows: 2 }), meta: {} };
      }

      throw new Error('geometry-tasks: unknown mode ' + mode);
    },

    async verify(page) {
      const m = mode, f = facet;
      return page.evaluate(({ mode, facet }) => {
        const fails = [];
        const SIDES = { circle: 0, oval: 0, triangle: 3, square: 4, rectangle: 4, diamond: 4, trapezoid: 4, parallelogram: 4, pentagon: 5, hexagon: 6, heptagon: 7, octogon: 8 };
        const SOLIDS = {
          cube: { faces: 6, edges: 12, vertices: 8 }, rectangular_box: { faces: 6, edges: 12, vertices: 8 },
          sphere: { faces: 0, edges: 0, vertices: 0 }, cone: { faces: 1, edges: 1, vertices: 1 },
          cylinder: { faces: 2, edges: 2, vertices: 0 }, pyramid: { faces: 5, edges: 8, vertices: 5 },
        };
        if (mode === 'count-sides') {
          document.querySelectorAll('[data-lcs-shape]').forEach((c) => {
            const k = c.dataset.lcsShape;
            if (SIDES[k] !== +c.dataset.lcsSides) fails.push(`${k}: sides fact wrong`);
            if (+c.querySelector('[data-lcs-answer]').dataset.lcsAnswer !== SIDES[k]) fails.push(`${k}: answer mismatch`);
          });
        } else if (mode === 'sort-sides') {
          const bins = [...document.querySelectorAll('[data-lcs-bin]')].map((b) => b.dataset.lcsBin);
          document.querySelectorAll('[data-lcs-item]').forEach((it) => {
            const k = it.dataset.lcsItem;
            if (SIDES[k] !== +it.dataset.lcsSides) fails.push(`${k}: sides fact wrong`);
            if (!bins.includes(String(SIDES[k]))) fails.push(`${k}: no bin for ${SIDES[k]} sides`);
          });
        } else if (mode === 'solid-counts') {
          document.querySelectorAll('[data-lcs-shape]').forEach((c) => {
            const k = c.dataset.lcsShape;
            if (SOLIDS[k][facet] !== +c.dataset.lcsCount) fails.push(`${k}: ${facet} fact wrong`);
            if (+c.querySelector('[data-lcs-answer]').dataset.lcsAnswer !== SOLIDS[k][facet]) fails.push(`${k}: answer mismatch`);
          });
        } else if (mode === 'solid-real') {
          const left = [...document.querySelectorAll('[data-lcs-left]')].map((e) => e.dataset.lcsLeft);
          const right = [...document.querySelectorAll('[data-lcs-right]')].map((e) => e.dataset.lcsRight);
          if ([...left].sort().join() !== [...right].sort().join()) fails.push('right not a permutation');
          left.forEach((v, i) => { if (right[i] === v) fails.push(`row ${i + 1}: straight-across`); });
        } else if (mode === 'symmetry-yn') {
          const cards = [...document.querySelectorAll('[data-lcs-sym]')];
          if (cards.length < 2) fails.push(`blank/degraded: ${cards.length} cards (need ≥2)`);
          const yes = cards.filter((c) => c.dataset.lcsSym === '1').length;
          if (yes < 1 || yes >= cards.length) fails.push(`needs both a symmetric and an asymmetric example (yes=${yes}/${cards.length})`);
          cards.forEach((c, i) => {
            const s = c.dataset.lcsSym === '1';
            const correct = [...c.querySelectorAll('.ws-chip')].filter((x) => x.dataset.lcsCorrect);
            if (correct.length !== 1) fails.push(`card ${i + 1}: ${correct.length} correct`);
            else if ((correct[0].dataset.lcsVal === 'yes') !== s) fails.push(`card ${i + 1}: chip != symmetry`);
          });
        } else if (mode === 'pick-symmetric') {
          const cards = [...document.querySelectorAll('[data-lcs-card]')];
          if (cards.length < 1) fails.push('blank: 0 cards rendered');
          cards.forEach((c, i) => {
            if (c.querySelectorAll('[data-lcs-correct]').length !== 1) fails.push(`row ${i + 1}: correct count`);
          });
        } else if (mode === 'perimeter') {
          document.querySelectorAll('[data-lcs-card]').forEach((c, i) => {
            const svg = c.querySelector('[data-lcs-rect-r]');
            const r = +svg.dataset.lcsRectR, cc = +svg.dataset.lcsRectC;
            if (svg.querySelectorAll('[data-lcs-sq]').length !== r * cc) fails.push(`card ${i + 1}: grid wrong`);
            if (+c.querySelector('[data-lcs-answer]').dataset.lcsAnswer !== 2 * (r + cc)) fails.push(`card ${i + 1}: perimeter mismatch`);
          });
        } else if (mode === 'same-area' || mode === 'same-perimeter') {
          document.querySelectorAll('[data-lcs-measure]').forEach((c, i) => {
            const meas = c.dataset.lcsMeasure;
            const tgt = c.querySelector('[data-lcs-target] [data-lcs-rect-r]');
            const tv = meas === 'area' ? (+tgt.dataset.lcsRectR * +tgt.dataset.lcsRectC) : 2 * (+tgt.dataset.lcsRectR + +tgt.dataset.lcsRectC);
            c.querySelectorAll('.ws-pattern-chip').forEach((chip) => {
              const g = chip.querySelector('[data-lcs-rect-r]');
              const v = meas === 'area' ? (+g.dataset.lcsRectR * +g.dataset.lcsRectC) : 2 * (+g.dataset.lcsRectR + +g.dataset.lcsRectC);
              if (!!chip.dataset.lcsCorrect !== (v === tv)) fails.push(`card ${i + 1}: ${meas} mark wrong (${v} vs ${tv})`);
            });
          });
        } else if (mode === 'classify-quads') {
          const cls = { square: 'square', rectangle: 'rectangle', diamond: 'other', trapezoid: 'other', parallelogram: 'other' };
          document.querySelectorAll('[data-lcs-item]').forEach((it) => {
            if (cls[it.dataset.lcsItem] !== it.dataset.lcsClass) fails.push(`${it.dataset.lcsItem}: class wrong`);
          });
          if (document.querySelectorAll('[data-lcs-bin]').length !== 3) fails.push('need 3 bins');
        } else if (mode === 'angles') {
          document.querySelectorAll('[data-lcs-card]').forEach((c, i) => {
            c.querySelectorAll('[data-lcs-angle]').forEach((svg) => {
              const deg = +svg.dataset.lcsAngle;
              const marked = !!svg.closest('.ws-pattern-slot').dataset.lcsTarget;
              if ((deg === 90) !== marked) fails.push(`card ${i + 1}: ${deg}° mark wrong`);
            });
          });
        } else if (mode === 'symmetry-count') {
          const SY = { square: 4, rectangle: 2, triangle: 3, diamond: 2, oval: 2, pentagon: 5, hexagon: 6, heart: 1, star: 5, trapezoid: 1 };
          document.querySelectorAll('[data-lcs-shape]').forEach((c) => {
            const k = c.dataset.lcsShape;
            if (SY[k] !== +c.dataset.lcsSymn) fails.push(`${k}: symmetry fact wrong`);
            if (+c.querySelector('[data-lcs-answer]').dataset.lcsAnswer !== SY[k]) fails.push(`${k}: answer mismatch`);
          });
        }
        return fails;
      }, { mode: m, facet: f });
    },
  };
}

module.exports = { makeGeometryType };
