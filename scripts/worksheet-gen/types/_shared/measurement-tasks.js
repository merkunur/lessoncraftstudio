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
const { pageFill, cardFill } = require('../../lib/page-fill.js');
const CARD_FLOOR = 0.25;
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const thermometerPrim = require('../../primitives/thermometer.js');
const unitCubes = require('../../primitives/unit-cubes.js');
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const { artExtentSync } = require('../../image-cache/silhouette.js');
const { answerBox } = require('../../templates/components.js');
const { MASS_RANK, NEW_PAGE_EXCLUDE } = require('../../lib/mass-rank.js');
const { svgRoot, roundedRect } = require('../../primitives/_svg.js');
const tokens = require('../../primitives/_tokens.js');

const U = 44, BAND = 110;
// 2026-10-09: the drawings were small in big cards. Order and compare keep their June FACTS (the noun pick and the
// lengths use the unscaled U/BAND) and are DRAWN larger by these factors.
const K_ORDER = 1.25, K_COMPARE = 1.2;
const BODY_H = 800, GRID_GAP = 14;
/** a NEW order page prints its three objects in one of the SIX orders, each as likely (2026-10-09: refusing the two
 *  sorted orders is itself a tell — a "rotate by one" guess then won 56-60% on the screen; uniform leaves every guessing
 *  pattern at a third) */
const SIX_ORDERS = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];
function anyOrder(three, len, rng) {
  const sorted = [...three].sort((a, b) => len(a) - len(b));
  return rng.pick(SIX_ORDERS).map((r) => sorted[r]);
}
/** draw an svg k× larger (its viewBox keeps the drawing; only the outer width/height grow) */
function zoomSvg(svg, k) {
  return svg.replace(/^<svg([^>]*?) width="([\d.]+)" height="([\d.]+)"/, (m, pre, w, h) => `<svg${pre} width="${+(w * k).toFixed(1)}" height="${+(h * k).toFixed(1)}"`);
}
/** the art band of a cubes-measure card: card height − padding − the square row − gaps */
function cubesBand(rows, u) {
  const cardH = (BODY_H - GRID_GAP * (rows - 1)) / rows;
  return Math.floor(cardH - 30 - Math.round(u * 36 / 44) - 6);
}
/** `count` DIFFERENT lengths, each on its own picture that can be drawn that long (item.maxLen); longest first */
function distinctLengths(pool, count, lenMin, rng) {
  const top = Math.max(lenMin - 1, ...pool.map((x) => x.maxLen));
  const range = []; for (let v = lenMin; v <= top; v++) range.push(v);
  if (range.length < count) return null;
  for (let tries = 0; tries < 80; tries++) {
    const lens = rng.sample(range, count).sort((a, b) => b - a);
    const used = new Set(), out = [];
    for (const len of lens) {
      const fit = pool.filter((x) => x.maxLen >= len && !used.has(x));
      if (!fit.length) break;
      const item = rng.pick(fit); used.add(item); out.push({ item, len });
    }
    if (out.length === count) return rng.shuffle(out);
  }
  return null;
}

function cubeRow(n, max, u) {
  const t = tokens;
  const parts = [];
  const uu = u || U, rh = Math.round(uu * 36 / 44);
  for (let i = 0; i < max; i++) {
    parts.push(roundedRect({
      x: i * uu + 1, y: 1, w: uu - 2, h: rh, r: 4,
      fill: i < n ? t.color.tealSoft : t.color.white,
      strokeColor: t.color.teal, strokeWidth: 2,
      data: i < n ? { 'data-lcs-cubeunit': 1 } : { 'data-lcs-cubespare': 1 },
    }));
  }
  return svgRoot({ width: max * uu + 2, height: rh + 2, label: `${n} unit squares` },
    parts.join(''), { 'data-lcs-cuberow': n, 'data-lcs-cubemax': max });
}

/** object art registered over its cube row, starting at 0 (ruler-exemplar math) */
function measuredObject(theme, item, lengthU, maxU, band, u) {
  const uu = u || U;
  const targetPx = lengthU * uu;
  const boxW = targetPx / item.ext.widthFrac;
  const leftShift = item.ext.leftFrac * boxW;
  const artH = item.ext.heightFrac * boxW;
  const topShift = item.ext.topFrac * boxW;
  const bandH = Math.min(artH, band || BAND);
  return `<span style="display:inline-flex;flex-direction:column;align-items:flex-start" data-lcs-objlen="${lengthU}">` +
    `<span data-lcs-art="1" style="position:relative;display:block;width:${maxU * uu + 2}px;height:${bandH.toFixed(1)}px;overflow:hidden">` +
    `<img class="ws-icon" src="${fileUri(theme, item.noun, 0, { full: true })}" alt="" ` +
    `style="position:absolute;left:${(1 - leftShift).toFixed(1)}px;top:${(-topShift).toFixed(1)}px;width:${boxW.toFixed(1)}px;height:${boxW.toFixed(1)}px">` +
    `</span>` + cubeRow(lengthU, maxU, uu) + `</span>`;
}

function flatNouns(theme, rng, count, maxLenU, minMaxLen, band, u) {
  const pool = labelSafeNouns(theme);
  const out = [];
  const floor = minMaxLen || 3;
  for (const n of rng.shuffle(pool)) {
    const ext = artExtentSync(theme, n.noun);
    const maxLen = Math.floor((band || BAND) * ext.widthFrac / ((u || U) * ext.heightFrac));
    if (maxLen >= floor) out.push({ ...n, ext, maxLen: Math.min(maxLen, maxLenU) });
    if (out.length >= count) break;
  }
  if (isFinite(count) && out.length < count) throw new Error(`measurement: theme ${theme} lacks flat nouns (need ${count} with maxLen>=${floor})`);
  return out;
}

const DEFAULT_LEVELS = {
  // levels (2026-10-09 Level Set; level 2 = the published page unless noted)
  thermometer: { 1: { max: 60, step: 10, labelEvery: 1 }, 2: { max: 40, step: 5, labelEvery: 1 }, 3: { max: 40, step: 1, labelEvery: 5 } },
  'volume-cubes': { 1: { walls: [[2, 2], [3, 2], [2, 3], [4, 2], [2, 4], [5, 2], [3, 3]] }, 2: {}, 3: { walls: [[4, 3], [5, 3], [6, 3], [3, 4], [4, 4], [5, 4], [6, 4]] } },
  heavier: { 1: { rows: 3, gapMin: 5 }, 2: { rows: 3 }, 3: { rows: 4, gapMin: 3, gapMax: 4 } },
  'order-units': { 1: { gapMin: 2 }, 2: {}, 3: { consecutive: true } },
  'cubes-measure': { 1: { rows: 3, u: 56, lenMin: 2, lenMax: 5 }, 2: { rows: 3, u: 40, lenMin: 3, lenMax: 8 }, 3: { rows: 4, u: 36, lenMin: 3, lenMax: 9 } },
};

function makeMeasurementType(cfg) {
  const { id, slug, mode, gradeBand, i18n } = cfg;
  return {
    id,
    slug,
    gradeBand: gradeBand || 'G1',
    assetClass: 'measurement',
    exerciseType: 'measurement',
    themeAxis: { applicable: ['cubes-measure', 'order-units', 'compare-length', 'heavier'].includes(mode), minNouns: 4 },
    interactive: require('../../lib/measurement-screen.js').interactiveFor({ 'cubes-measure': 'cubes', 'order-units': 'order', 'compare-length': 'compare', thermometer: 'thermometer', 'volume-cubes': 'towers', heavier: 'heavier' }[mode]),
    difficulty: cfg.difficulty || DEFAULT_LEVELS[mode] || { 1: { rows: 3 }, 2: { rows: 3 }, 3: { rows: 4 } },
    i18n,

    // Level Set (2026-10-09, PDF + interactive): level 2 copy 1 is the published page; every other page gets a screen
    // version + key from the questions collected (S) while the page is drawn — the same drawing, the same facts
    build(args, ctx) {
      const published = Number(args.difficulty) === 2 && ((ctx && ctx.variant) || 1) === 1;
      const S = [];
      const b = this._build(args, ctx, S);
      if (published) return b;
      b.meta = { ...b.meta, mode, asks: S.map((x) => String(x.ask)) };
      if (ctx && (ctx.interactive || ctx.answerKey)) {
        return require('../../lib/measurement-screen.js').screenOrKey(b, S, { ...ctx, locale: (args.locale || 'en').slice(0, 2), theme: args.theme });
      }
      return b;
    },
    levelSetWords(m) { return (m.asks || []).map(String); },

    _build({ theme, difficulty }, ctx, S) {
      const d = this.difficulty[difficulty];
      const published = Number(difficulty) === 2 && ((ctx && ctx.variant) || 1) === 1;
      const rng = ctx.rng;
      const cards = [];

      if (mode === 'cubes-measure') {
        // 2026-10-09 redesign: one square size per page (d.u), the picture as tall as its card allows (band from the
        // card height), and every row a DIFFERENT length in lenMin..lenMax — the June pages drew squarish pictures in a
        // 110 px band, so most could only be 3 squares long and whole pages asked "3, 3, 3".
        const { u, lenMin, lenMax } = d;
        const band = cubesBand(d.rows, u);
        const pool = flatNouns(theme, rng, Infinity, lenMax, lenMin, band, u);
        const pick = distinctLengths(pool, d.rows, lenMin, rng);
        if (!pick) throw new Error(`cubes-measure: theme ${theme} cannot give ${d.rows} different lengths ${lenMin}..${lenMax}`);
        for (const { item, len } of pick) {
          S.push({ kind: 'num', q: `len:${len}`, ask: len, ans: len, slips: [len + 1, len - 1, lenMax + 2], prompt: measuredObject(theme, item, len, lenMax + 2, band, u) });
          cards.push(`<div class="ws-card-stage" style="gap:44px;justify-content:center;padding:4px 8px">` +
            measuredObject(theme, item, len, lenMax + 2, band, u) +
            answerBox({ w: 72, h: 52, answer: len }) + `</div>`);
        }
        return { bodyHtml: cardGrid({ cards, cols: 1, rows: d.rows }), meta: {} };
      }

      if (mode === 'order-units') {
        let items, lens;
        if (d.gapMin || d.consecutive) {
          // L1 lengths at least 2 squares apart · L3 three lengths 1 square apart; each on a picture that can be that long
          const pool = flatNouns(theme, rng, Infinity, 8, 2, 150);
          const triples = [];
          for (let a = 2; a <= 8; a++) for (let b = a + 1; b <= 8; b++) for (let c = b + 1; c <= 8; c++) {
            if (d.consecutive ? (b === a + 1 && c === b + 1) : (b - a >= d.gapMin && c - b >= d.gapMin)) triples.push([a, b, c]);
          }
          let got = null;
          for (const tr of rng.shuffle(triples)) {
            const used = new Set(), out = [];
            for (const len of [...tr].reverse()) { const fit = pool.filter((x) => x.maxLen >= len && !used.has(x)); if (!fit.length) break; const it = rng.pick(fit); used.add(it); out.push([it, len]); }
            if (out.length === 3) { got = rng.shuffle(out); break; }
          }
          if (got) got = anyOrder(got, (x) => x[1], rng);
          if (!got) throw new Error(`order-units: theme ${theme} cannot give the level-${difficulty} lengths`);
          items = got.map((x) => x[0]); lens = got.map((x) => x[1]);
        } else {
          items = flatNouns(theme, rng, 3, 8, 5, 150);   // taller band: 3 cards have room
          lens = rng.sample([3, 4, 5, 6, 7, 8].filter((v) => v <= Math.min(...items.map((x) => x.maxLen))), 3);
          if (lens.length < 3) throw new Error('order-units: not enough distinct lengths');
          if (!published) lens = anyOrder(lens, (x) => x, rng);
        }
        const rank = lens.map((v) => [...lens].sort((a, b) => a - b).indexOf(v) + 1);
        items.forEach((item, i) => {
          S.push({ kind: 'rank', q: `rank:${lens.join(',')}:${i}`, ask: rank[i], ans: rank[i], prompt: measuredObject(theme, item, lens[i], 9, 150, U) });
          cards.push(`<div class="ws-card-stage" style="gap:20px;justify-content:space-between;padding:4px 8px" data-lcs-rank="${rank[i]}"${d.gapMin ? ` data-lcs-lengap="${d.gapMin}"` : d.consecutive ? ' data-lcs-lengap="1"' : ''}>` +
            measuredObject(theme, item, lens[i], 9, 150 * K_ORDER, U * K_ORDER) +
            answerBox({ w: 56, h: 48, answer: rank[i] }) + `</div>`);
        });
        return { bodyHtml: cardGrid({ cards, cols: 1, rows: 3 }), meta: {} };
      }

      if (mode === 'compare-length') {
        // levels (2026-09-27): L1 keeps the difference at 1-3 units; L2 and L3
        // are the original page. This type has only TWO real levels with the
        // pictures that exist: lengths run 3..~8 units, a third pair of tall
        // pictures runs off the page, and a 4+ difference fits only 3 themes.
        let prevDiff = null;
        for (let i = 0; i < 2; i++) {
          let items, a, b;
          // new pages: the two cards ask DIFFERENT differences — a pair that cannot is drawn again (the published page as it was)
          for (let tries = 0; ; tries++) {
            items = flatNouns(theme, rng, 2, 8, 4);   // range [3..≥4] guarantees a≠b exists
            a = rng.int(3, items[0].maxLen);
            let guard = 0;
            do { b = rng.int(3, items[1].maxLen); guard++; } while ((b === a || (difficulty === 1 && Math.abs(a - b) > 3)) && guard < 30);
            if (b === a) b = a > 3 ? a - 1 : a + 1;
            if (difficulty === 1 && Math.abs(a - b) > 3) b = a + (b > a ? 3 : -3);   // never a silent fallback
            if (published || Math.abs(a - b) !== prevDiff) break;
            if (tries > 60) throw new Error(`compare-length: theme ${theme} gives the same difference twice`);
          }
          prevDiff = Math.abs(a - b);
          S.push({ kind: 'num', q: `diff:${a}:${b}`, ask: Math.abs(a - b), ans: Math.abs(a - b), slips: [a, b, a + b, Math.abs(a - b) + 1, Math.abs(a - b) - 1],
            prompt: `<div style="display:flex;flex-direction:column;gap:8px">${measuredObject(theme, items[0], a, 9)}${measuredObject(theme, items[1], b, 9)}</div>` });
          cards.push(`<div class="ws-card-stage" style="position:relative;flex-direction:column;gap:10px;align-items:flex-start;padding:4px 14px" data-lcs-a="${a}" data-lcs-b="${b}">` +
            measuredObject(theme, items[0], a, 9, BAND * K_COMPARE, U * K_COMPARE) +
            measuredObject(theme, items[1], b, 9, BAND * K_COMPARE, U * K_COMPARE) +
            `<span style="position:absolute;right:16px;top:50%;transform:translateY(-50%);display:inline-flex;align-items:center;gap:8px">` +
            `<span style="font-family:'Baloo 2';font-weight:700;font-size:22px;color:#146B5E">Δ</span>` +
            answerBox({ w: 64, h: 48, answer: Math.abs(a - b) }) + `</span></div>`);
        }
        return { bodyHtml: cardGrid({ cards, cols: 1, rows: 2 }), meta: {} };
      }

      if (mode === 'thermometer') {
        const used = new Set();
        for (let i = 0; i < 3; i++) {
          let v;
          if (d.step && d.step !== 5) {
            // L1 tens scale (values ON the labels) · L3 per-degree marks (values between the labelled fives)
            // never 0, never the top of the scale
            do { v = d.step * rng.int(1, Math.floor(d.max / d.step) - 1); } while (used.has(v) || (d.labelEvery > 1 && v % (d.step * d.labelEvery) === 0));
          } else do { v = 5 * rng.int(1, 7); } while (used.has(v));
          used.add(v);
          // 2026-10-09: drawn ×1.4 of a 400 px thermometer (was 250 px in a 780 px card): a wider tube, larger numerals
          const th = d.step && d.step !== 5
            ? thermometerPrim({ value: v, min: 0, max: d.max, step: d.step, labelEvery: d.labelEvery, height: 400 })
            : thermometerPrim({ value: v, min: 0, max: 40, step: 5, height: 400 });
          const st = d.step || 5, le = d.labelEvery || 1, near = Math.round(v / (st * le)) * st * le;
          S.push({ kind: 'num', q: `therm:${v}`, ask: v, ans: v, step: 1, slips: [v + st, v - st, near !== v ? near : v + st * le, v + st * 2], prompt: th.svg });
          cards.push(`<div class="ws-card-stage" style="flex-direction:column;gap:26px" data-lcs-step="${d.step || 5}" data-lcs-labelevery="${d.labelEvery || 1}">` + zoomSvg(th.svg, 1.4) +
            answerBox({ w: 76, h: 54, answer: v }) + `</div>`);
        }
        return { bodyHtml: cardGrid({ cards, cols: 3, rows: 1 }), meta: {} };
      }

      if (mode === 'volume-cubes') {
        const used = new Set();
        for (let i = 0; i < 4; i++) {
          // Single-depth wall (w=1): every cube shows a front face → all are
          // countable by sight (a full l×w×h box hides interior/back cubes in
          // the isometric view, making "count all the cubes" impossible). h≥2
          // keeps it a clear wall, not a confusing diagonal 1×1×N row.
          let l, w = 1, h, g = 0;
          if (d.walls) {
            // L1 small walls (4-10 cubes) · L3 big walls (up to 6 × 4); four DIFFERENT walls
            do { [l, h] = rng.pick(d.walls); g++; } while (used.has(`${l}.${w}.${h}`) && g < 200);
            if (used.has(`${l}.${w}.${h}`)) throw new Error('volume-cubes: not enough different walls');
          } else do { l = rng.int(2, 5); h = rng.int(2, 3); g++; }
          while (used.has(`${l}.${w}.${h}`) && g < 30);
          used.add(`${l}.${w}.${h}`);
          // 2026-10-09: each wall drawn as large as its card allows (cubes were 24 px, small in a big card), the box underneath
          const unit = Math.min(60, Math.floor(Math.min((290 - 16) / ((l + w) * 0.866), (270 - 16) / ((l + w) * 0.5 + h))));
          const stack = unitCubes({ l, w, h, unit });
          S.push({ kind: 'num', q: `cubes:${l}:${h}`, ask: `${l}x${h}`, ans: l * h, slips: [l + h, l * h + l, l * h + 1, l * h - 1], prompt: unitCubes({ l, w, h, unit: Math.min(unit, 44) }).svg });
          cards.push(`<div class="ws-card-stage" style="flex-direction:column;gap:22px;padding:6px 18px"${d.walls ? ` data-lcs-walls="${d.walls.map((x) => x.join('x')).join(' ')}"` : ''}>` +
            stack.svg + answerBox({ w: 68, h: 52, answer: l * w * h }) + `</div>`);
        }
        return { bodyHtml: cardGrid({ cards, cols: 2, rows: 2 }), meta: {} };
      }

      if (mode === 'heavier') {
        const rank = MASS_RANK[theme];
        if (!rank) throw new Error(`heavier: no MASS_RANK for theme ${theme}`);
        const have = labelSafeNouns(theme).map((n) => n.noun);
        const skip = published ? [] : (NEW_PAGE_EXCLUDE[theme] || []);
        const ranked = rank.filter((n) => have.includes(n) && !skip.includes(n));
        // 2026-10-09: the pictures fill their row (were 130 px chips in a 257 px row)
        const chip = d.rows >= 4 ? 160 : 210;
        // a NEW page shows every picture once (2026-10-09: an L1 vehicles page drew the airplane — the heaviest — in all
        // three rows, so it was the answer every time): all its pairs are chosen together, from every valid pair
        let preset = null;
        const gMin = d.gapMin || 3, gMax = d.gapMax || 99;
        for (let t = 0; !published && t < 300 && !preset; t++) {
          const used = new Set(), ps = [];
          for (let r = 0; r < d.rows; r++) {
            const cand = [];
            for (let a = 0; a < ranked.length; a++) for (let b = a + gMin; b < ranked.length && b - a <= gMax; b++) if (!used.has(a) && !used.has(b)) cand.push([a, b]);
            if (!cand.length) break;
            const p = rng.pick(cand); used.add(p[0]); used.add(p[1]); ps.push(p);
          }
          if (ps.length === d.rows) preset = ps;
        }
        if (!published && !preset) throw new Error(`heavier: theme ${theme} has no ${d.rows} different pairs for level ${difficulty}`);
        for (let i = 0; i < d.rows; i++) {
          let i1, i2, g = 0;
          if (preset) [i1, i2] = preset[i];
          else {
            do { i1 = rng.int(0, ranked.length - 1); i2 = rng.int(0, ranked.length - 1); g++; }
            while ((Math.abs(i1 - i2) < gMin || Math.abs(i1 - i2) > gMax) && g < 60);   // ≥3 ranks apart = obvious (the published page)
          }
          const heavy = Math.min(i1, i2), light = Math.max(i1, i2);
          const sides = rng.shuffle([{ n: ranked[heavy], ok: true }, { n: ranked[light], ok: false }]);
          S.push({ kind: 'pick', q: `heavy:${theme}:${sides[0].n}:${sides[1].n}`, ask: ranked[heavy],
            options: sides.map((x) => ({ label: x.n, ok: x.ok, html: `<img src="${fileUri(theme, x.n)}" alt="" style="width:150px;height:150px;object-fit:contain">` })) });
          const chips = sides.map((s) =>
            `<span class="ws-pattern-chip" style="width:${chip}px;height:${chip}px"${s.ok ? ' data-lcs-correct="1"' : ''} data-lcs-noun="${s.n}">` +
            `<img class="ws-icon" src="${fileUri(theme, s.n)}" alt="" style="width:${Math.round(chip * 0.78)}px;height:${Math.round(chip * 0.78)}px"></span>`).join('');
          cards.push(`<div class="ws-card-stage" style="justify-content:space-evenly" data-lcs-heavy="${ranked[heavy]}" data-lcs-gap="${light - heavy}"${d.gapMin ? ` data-lcs-gapmin="${d.gapMin}" data-lcs-gapmax="${d.gapMax || 99}"` : ''}>${chips}</div>`);
        }
        return { bodyHtml: cardGrid({ cards, cols: 1, rows: d.rows }), meta: {} };
      }

      throw new Error('measurement-tasks: unknown mode ' + mode);
    },

    async verify(page) {
      const m = mode;
      const fails0 = await page.evaluate((mode) => {
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
            if (+card.querySelector('[data-lcs-answer]').dataset.lcsAnswer !== +card.querySelector('[data-lcs-rank]').dataset.lcsRank) fails.push(`row ${i + 1}: answer != rank`);
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
            const st = card.querySelector('[data-lcs-step]'), step = +st.dataset.lcsStep, le = +st.dataset.lcsLabelevery;
            if (v % step !== 0) fails.push(`card ${i + 1}: ${v} is not on a mark`);
            if (le > 1 && v % (step * le) === 0) fails.push(`card ${i + 1}: ${v} sits on a numeral (this level reads between the numerals)`);
            if (le > 1 && svg.querySelectorAll('[data-lcs-minor]').length === 0) fails.push(`card ${i + 1}: no small marks drawn`);
            if (+card.querySelector('[data-lcs-answer]').dataset.lcsAnswer !== v) fails.push(`card ${i + 1}: answer mismatch`);
          } else if (mode === 'volume-cubes') {
            const svg = card.querySelector('[data-lcs-prim="unit-cubes"]');
            const want = +svg.dataset.lcsL * +svg.dataset.lcsW * +svg.dataset.lcsH;
            // count top faces (one per cube)
            const cubes = svg.querySelectorAll('[data-lcs-cube]').length;
            if (cubes !== want) fails.push(`card ${i + 1}: ${cubes} cubes drawn != ${want}`);
            const ws = card.querySelector('[data-lcs-walls]');
            if (ws && !ws.dataset.lcsWalls.split(' ').includes(`${svg.dataset.lcsL}x${svg.dataset.lcsH}`)) fails.push(`card ${i + 1}: wall ${svg.dataset.lcsL}x${svg.dataset.lcsH} not of this level`);
            if (+card.querySelector('[data-lcs-answer]').dataset.lcsAnswer !== want) fails.push(`card ${i + 1}: volume mismatch`);
          } else if (mode === 'heavier') {
            const correct = [...card.querySelectorAll('.ws-pattern-chip')].filter((c) => c.dataset.lcsCorrect);
            if (correct.length !== 1) fails.push(`row ${i + 1}: ${correct.length} correct`);
            else if (correct[0].dataset.lcsNoun !== card.querySelector('[data-lcs-heavy]').dataset.lcsHeavy) fails.push(`row ${i + 1}: heavy mark wrong`);
            const hv = card.querySelector('[data-lcs-heavy]');
            if (hv.dataset.lcsGapmin && (+hv.dataset.lcsGap < +hv.dataset.lcsGapmin || +hv.dataset.lcsGap > +hv.dataset.lcsGapmax)) fails.push(`row ${i + 1}: ${hv.dataset.lcsGap} ranks apart, this level wants ${hv.dataset.lcsGapmin}-${hv.dataset.lcsGapmax}`);
          }
        });
        if (mode === 'order-units') {
          const lens = [...document.querySelectorAll('[data-lcs-card] [data-lcs-objlen]')].map((w) => +w.dataset.lcsObjlen).sort((a, b) => a - b);
          if (new Set(lens).size !== lens.length) fails.push('two objects the same length');
          const g = document.querySelector('[data-lcs-lengap]');
          if (g) { const want = +g.dataset.lcsLengap; for (let k = 1; k < lens.length; k++) { const d = lens[k] - lens[k - 1]; if (want === 1 ? d !== 1 : d < want) fails.push(`lengths ${lens.join(',')} break the level rule (${want === 1 ? '1 apart' : '≥' + want + ' apart'})`); } }
        }
        if (mode === 'cubes-measure') {
          const lens = [...document.querySelectorAll('[data-lcs-card] [data-lcs-objlen]')].map((w) => +w.dataset.lcsObjlen);
          if (new Set(lens).size !== lens.length) fails.push(`two rows ask the same length (${lens.join(',')})`);
        }
        return fails;
      }, m);
      // 2026-10-09: the page and every card must USE their space (the drawings were small in big cards)
      const pf = await page.evaluate(pageFill), cf = await page.evaluate(cardFill, CARD_FLOOR);
      return [...fails0, ...pf.fails, ...cf.fails];
    },
  };
}

module.exports = { makeMeasurementType, distinctLengths };
