/**
 * K-241 — Color by code (fr "coloriage magique" — one of the biggest French
 * school-printable terms; en color-by-number; de Rechenbilder register).
 * The legend banner maps a CODE to a color: swatch square + the NATIVE color
 * word (the word is the B&W-proof, literacy-bearing signal). The child
 * colors outline shapes. Outlines are warm ink; swatches use the governed
 * tokens.codeColors namespace (legend-swatch-only — see _tokens.js).
 * d1: shape code (color all triangles red) · d2: addition code (color by
 * sum) · d3: mixed ± code. CCSS K.G.A.2 / K.OA.A.5 fluency dressing.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { svgRoot, el } = require('../../primitives/_svg.js');
const { COLOR_WORDS } = require('../../data/color-words.js');

const COLOR_KEYS = ['red', 'blue', 'yellow', 'green'];
const SWATCH = { red: tokens.codeColors.codeRed, blue: tokens.codeColors.codeBlue, yellow: tokens.codeColors.codeYellow, green: tokens.codeColors.codeGreen };

function shapeSvg(kind, size, inner) {
  const s = size, c = s / 2;
  const stroke = { fill: tokens.color.white, stroke: tokens.color.ink, 'stroke-width': 2.5, 'stroke-linejoin': 'round' };
  let el1;
  if (kind === 'circle') el1 = el('circle', { cx: c, cy: c, r: c - 3, ...stroke });
  else if (kind === 'square') el1 = el('rect', { x: 3, y: 3, width: s - 6, height: s - 6, rx: 6, ...stroke });
  else if (kind === 'triangle') el1 = el('path', { d: `M ${c} 4 L ${s - 3} ${s - 4} L 3 ${s - 4} Z`, ...stroke });
  else if (kind === 'star') {
    const pts = [];
    for (let i = 0; i < 10; i++) {
      const r = i % 2 === 0 ? c - 2 : (c - 2) * 0.45;
      const a = -Math.PI / 2 + i * Math.PI / 5;
      pts.push(`${(c + r * Math.cos(a)).toFixed(1)},${(c + r * Math.sin(a)).toFixed(1)}`);
    }
    el1 = el('polygon', { points: pts.join(' '), ...stroke });
  } else { // heart — wide lobes, school-poster proportions
    el1 = el('path', {
      d: `M ${c} ${s - 6} C ${s * 0.02} ${s * 0.52} ${s * 0.08} ${s * 0.06} ${c} ${s * 0.3} C ${s * 0.92} ${s * 0.06} ${s * 0.98} ${s * 0.52} ${c} ${s - 6}`,
      ...stroke,
    });
  }
  return el1 + (inner || '');
}

function legendBanner({ entries, mode }) {
  // entries: [{code, colorKey, word}] — code is a shape kind (d1) or number (d2/3)
  const items = entries.map((e) => {
    const codeCell = mode === 'shapes'
      ? svgRoot({ width: 30, height: 30, label: e.code }, shapeSvg(e.code, 30), {})
      : `<span style="font-family:'Baloo 2';font-weight:700;font-size:22px;color:#3A3530">${e.code}</span>`;
    return `<span style="display:inline-flex;align-items:center;gap:8px" data-lcs-legend="${e.code}" data-lcs-color="${e.colorKey}">` +
      codeCell +
      `<span style="font-family:'Baloo 2';font-weight:700;font-size:16px;color:#8A8276">→</span>` +
      svgRoot({ width: 22, height: 22, label: e.colorKey },
        el('rect', { x: 1, y: 1, width: 20, height: 20, rx: 5, fill: SWATCH[e.colorKey], stroke: tokens.color.ink, 'stroke-width': 1 }), {}) +
      `<span style="font-family:'Nunito';font-weight:800;font-size:17px;color:#3A3530">${e.word}</span></span>`;
  }).join('');
  return `<div class="ws-scene-banner" style="gap:24px;flex-wrap:wrap">${items}</div>`;
}

module.exports = {
  id: 'K-241',
  slug: 'color-by-code',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'color-by-number',
  themeAxis: { applicable: false },
  difficulty: {
    1: { mode: 'shapes', codes: 3, items: 12, size: 92 },
    2: { mode: 'sums', codes: 4, items: 12, size: 100, max: 10, ops: ['+'] },
    3: { mode: 'sums', codes: 4, items: 12, size: 100, max: 10, ops: ['+', '-'] },
  },
  i18n: {
    en: {
      title: 'Color by Code',
      instruction: 'Look at the code. Then color every shape to match it.',
    },
  },

  build({ difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const words = COLOR_WORDS[(locale || 'en').slice(0, 2)] || COLOR_WORDS.en;
    const colorKeys = rng.shuffle(COLOR_KEYS).slice(0, d.codes);
    const stageW = 660, stageH = 615;
    const cols = 4, rows = 3;
    const cellW = stageW / cols, cellH = stageH / rows;
    const items = [];
    let entries;

    if (d.mode === 'shapes') {
      const kinds = rng.shuffle(['triangle', 'circle', 'square', 'star', 'heart']).slice(0, d.codes);
      entries = kinds.map((k, i) => ({ code: k, colorKey: colorKeys[i], word: words[colorKeys[i]] }));
      // guarantee ≥3 of each kind across 12 items
      const bag = [];
      kinds.forEach((k) => { for (let j = 0; j < 3; j++) bag.push(k); });
      while (bag.length < d.items) bag.push(rng.pick(kinds));
      const order = rng.shuffle(bag);
      order.forEach((k, i) => items.push({ kind: k, code: k, inner: '' }));
    } else {
      // number codes: distinct target values, each value ≥2 shapes
      // nt20-VAR: d.values = custom value pool (sums-to-20 page); mode
      // 'numbers' = the classic plain color-by-number (numeral in the shape,
      // no arithmetic — the legend numeral IS the code)
      const values = rng.sample(d.values || [2, 3, 4, 5, 6, 7, 8, 9, 10], d.codes);
      entries = values.map((v, i) => ({ code: v, colorKey: colorKeys[i], word: words[colorKeys[i]] }));
      const bag = [];
      values.forEach((v) => { bag.push(v, v); });
      while (bag.length < d.items) bag.push(rng.pick(values));
      const order = rng.shuffle(bag);
      const kinds = ['circle', 'square', 'triangle', 'star', 'heart'];
      if (d.mode === 'numbers') {
        order.forEach((v) => items.push({ kind: rng.pick(kinds), code: v, plain: true }));
        entries = entries.slice(); // same legend shape; no expressions anywhere
      } else {
      const usedExpr = new Set();
      order.forEach((v) => {
        // find a fresh ± expression landing exactly on v
        let a, b, op, guard = 0;
        do {
          op = rng.pick(d.ops);
          if (op === '+') { a = rng.int(0, v); b = v - a; }
          else { b = rng.int(1, 9); a = v + b; }
          guard++;
        } while ((op === '-' && a > 12 || usedExpr.has(`${a}${op}${b}`)) && guard < 60);
        usedExpr.add(`${a}${op}${b}`);
        const expr = `${a} ${op === '-' ? '−' : '+'} ${b}`;
        items.push({ kind: rng.pick(kinds), code: v, expr });
      });
      }
    }

    // jittered grid scatter of outline shapes
    const cells = [];
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) cells.push([c, r]);
    const picked = rng.shuffle(cells).slice(0, d.items);
    const shapes = items.map((it, i) => {
      const [c, r] = picked[i];
      const size = d.size + rng.int(-10, 8);
      const x = c * cellW + (cellW - size) / 2 + rng.int(-8, 8);
      const y = r * cellH + (cellH - size) / 2 + rng.int(-8, 8);
      const innerLabel = it.expr || (it.plain ? String(it.code) : '');
      const inner = innerLabel
        ? el('text', {
            x: size / 2, y: size * (it.kind === 'triangle' ? 0.68 : it.kind === 'heart' ? 0.5 : 0.5),
            'font-family': tokens.font.display, 'font-size': Math.round(size * (it.plain ? 0.3 : 0.2)), 'font-weight': 700,
            fill: tokens.color.ink, 'text-anchor': 'middle', 'dominant-baseline': 'central',
          }, innerLabel)
        : '';
      return `<span style="position:absolute;left:${x.toFixed(0)}px;top:${y.toFixed(0)}px" data-lcs-item="${it.code}"${it.expr ? ` data-lcs-expr="${it.expr}"` : ''}>` +
        svgRoot({ width: size, height: size, label: String(it.code) }, shapeSvg(it.kind, size, inner), {}) + `</span>`;
    }).join('');

    const bodyHtml =
      legendBanner({ entries, mode: d.mode }) +
      `<div data-ws-content style="flex:1;position:relative;margin-top:6px">` +
      `<div style="position:relative;width:${stageW}px;height:${stageH}px;margin:0 auto">${shapes}</div></div>`;
    return { bodyHtml, meta: {} };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const legend = [...document.querySelectorAll('[data-lcs-legend]')];
      const items = [...document.querySelectorAll('[data-lcs-item]')];
      if (legend.length < 3) fails.push(`legend has ${legend.length} entries`);
      if (items.length < 10) fails.push(`only ${items.length} shapes`);
      const codes = new Set(legend.map((l) => l.dataset.lcsLegend));
      if (codes.size !== legend.length) fails.push('duplicate legend codes');
      const colors = legend.map((l) => l.dataset.lcsColor);
      if (new Set(colors).size !== colors.length) fails.push('duplicate legend colors');
      const counts = {};
      items.forEach((it) => {
        const code = it.dataset.lcsItem;
        if (!codes.has(code)) fails.push(`item code ${code} not in legend`);
        counts[code] = (counts[code] || 0) + 1;
        const expr = it.dataset.lcsExpr;
        if (expr) {
          const m = expr.match(/^(\d+) ([+−]) (\d+)$/);
          if (!m) { fails.push(`bad expr "${expr}"`); return; }
          const v = m[2] === '+' ? +m[1] + +m[3] : +m[1] - +m[3];
          if (v !== +code) fails.push(`expr ${expr} != code ${code}`);
        }
      });
      codes.forEach((code) => {
        if ((counts[code] || 0) < 2) fails.push(`code ${code} appears ${counts[code] || 0}× (want ≥2)`);
      });
      return fails;
    });
  },
};
