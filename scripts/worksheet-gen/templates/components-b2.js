/**
 * components-b2.js — the nt20-B component vocabulary (2026-09). Kept in its
 * OWN module so templates/components.js (consumed by 358 published types)
 * stays byte-for-byte untouched. Everything here is HTML + inline SVG on the
 * token palette; ground truth rides on data-lcs-* attributes.
 *
 * Exports: wordTiles · priceTag · articleChips · rulingBlock · colorLegend ·
 * dotPanel · numberStrip · alphabetStrip · classIcons · sceneStage ·
 * equalGroups · wordBank · copyArrow · pillChoice · codeList · countBadge ·
 * shelf · fixChecklist · letterBoxes · mirrorGroups
 */
'use strict';
const tokens = require('../primitives/_tokens.js');
const { svgRoot, roundedRect, line, circle, el, esc } = require('../primitives/_svg.js');
const { writingRow, textLaneGeometry, LM } = require('../primitives/trace-path.js');
const { fileUri } = require('../image-cache/resolve.js');

const T = tokens.color;
const F = tokens.font;
const SWATCH = {
  red: tokens.codeColors.codeRed, blue: tokens.codeColors.codeBlue, yellow: tokens.codeColors.codeYellow, green: tokens.codeColors.codeGreen,
  orange: tokens.codeColors.codeOrange, purple: tokens.codeColors.codePurple, brown: tokens.codeColors.codeBrown, pink: tokens.codeColors.codePink,
};

/* ---------- word tiles (G1-249 unscramble / G2-275 chips) ---------- */
function wordTiles({ tokens: toks, order, fontPx = 18, tileH = 40, extraClass = '' }) {
  const seq = order || toks.map((_, i) => i);
  const tiles = seq.map((idx) =>
    `<span class="ws-tile${extraClass ? ' ' + extraClass : ''}" style="height:${tileH}px;font-size:${fontPx}px" data-lcs-tile="${idx}">${esc(toks[idx])}</span>`);
  return `<div class="ws-tilerow">${tiles.join('')}</div>`;
}

/* ---------- price tag (G2-276) ---------- */
function priceTag({ value, unit, fontPx = 17 }) {
  const text = `${value} ${unit}`;
  const W = Math.max(64, 26 + text.length * (fontPx * 0.62));
  const H = 34;
  const d = `M14 2 H ${W - 6} a4 4 0 0 1 4 4 V 28 a4 4 0 0 1 -4 4 H 14 L 3 17 Z`;
  return svgRoot({ width: W + 2, height: H + 2, label: `price ${text}` },
    el('path', { d, fill: T.white, stroke: T.teal, 'stroke-width': 2, 'stroke-linejoin': 'round' }) +
    circle({ cx: 12, cy: 17, r: 2.5, fill: T.cream, strokeColor: T.teal, strokeWidth: 1.2 }) +
    el('text', { x: W / 2 + 7, y: 18, 'font-family': F.display, 'font-size': fontPx, 'font-weight': 700, fill: T.ink, 'text-anchor': 'middle', 'dominant-baseline': 'central' }, esc(text)),
    { 'data-lcs-prim': 'price-tag', 'data-lcs-price': value, 'data-lcs-unit': unit });
}

/* ---------- article chips (K-288) ---------- */
function articleChips({ chips, correctIndex, w = 84, h = 48, fontPx = 24, dots }) {
  const items = chips.map((label, i) => {
    const dot = dots && dots[i]
      ? `<svg width="12" height="12" viewBox="0 0 12 12" style="position:absolute;left:6px;top:6px" aria-hidden="true"><circle cx="6" cy="6" r="5" fill="${tokens.codeColors[dots[i]]}" stroke="${T.ink}" stroke-width="1"/></svg>`
      : '';
    return `<span class="ws-achip" style="width:${w}px;height:${h}px;font-size:${fontPx}px" data-lcs-chip="${i}" data-lcs-label="${esc(label)}"${i === correctIndex ? ' data-lcs-correct="1"' : ''}>${dot}${esc(label)}</span>`;
  });
  return `<div class="ws-achips">${items.join('')}</div>`;
}

/* ---------- ruling block (stacked school-line rows, optional starters) ---------- */
function rulingBlock({ rows, w, h, glyphH, starters = {}, gap = 6 }) {
  const out = [];
  for (let i = 0; i < rows; i++) {
    let svg = writingRow({ w, h, glyphH, xHeight: true }).svg;
    const st = starters[i];
    if (st) {
      const g = textLaneGeometry({ h, glyphH, heightUnits: LM.base - LM.ascender, inkTop: LM.ascender, inkBottom: LM.desc });
      const txt = el('text', {
        x: 8, y: (g.yBase - 2).toFixed(1), 'font-family': F.body, 'font-size': Math.round(glyphH * 0.78), 'font-weight': 700,
        fill: T.inkSoft, 'data-lcs-starter': '1',
      }, esc(st));
      svg = svg.replace('</svg>', txt + '</svg>');
    }
    out.push(`<div data-lcs-ruling-row="${i + 1}">${svg}</div>`);
  }
  return `<div style="display:flex;flex-direction:column;gap:${gap}px">${out.join('')}</div>`;
}

/* ---------- colour legend (G1-242 / G2-279) ---------- */
function colorLegend({ entries, wordPx = 17 }) {
  const items = entries.map((e) =>
    `<span style="display:inline-flex;align-items:center;gap:8px" data-lcs-legend="${esc(e.key)}" data-lcs-color="${esc(e.key)}">` +
    svgRoot({ width: 22, height: 22, label: e.key }, el('rect', { x: 1, y: 1, width: 20, height: 20, rx: 5, fill: SWATCH[e.key], stroke: T.ink, 'stroke-width': 1 }), { class: 'ws-legend-swatch' }) +
    `<span style="font-family:${F.body};font-weight:800;font-size:${wordPx}px;color:${T.ink}">${esc(e.word)}</span></span>`).join('');
  return `<div class="ws-scene-banner" style="gap:22px;flex-wrap:wrap" data-lcs-legend-banner>${items}</div>`;
}

/* ---------- working-space dot panel (G1-213 idiom) ---------- */
function dotPanel({ w = 490, h = 92 }) {
  const rows = Math.max(2, Math.floor((h - 8) / 24));
  const cols = Math.floor((w - 14) / 26);
  const dots = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) dots.push(`<circle cx="${14 + c * 26}" cy="${14 + r * 24}" r="1.6" fill="${T.grid}"/>`);
  return `<div style="flex:1;min-width:0;background:${T.white};border:2px solid #F0E4CB;border-radius:12px;min-height:${h}px;display:flex;align-items:center;overflow:hidden" data-lcs-workspace>` +
    `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true" preserveAspectRatio="xMinYMid meet">${dots.join('')}</svg></div>`;
}

/* ---------- number strip (K-285 counting strip) ---------- */
function numberStrip({ values, chip = 26, fontPx }) {
  const fs = fontPx || Math.round(chip * 0.58);
  const items = values.map((v) =>
    `<span class="ws-nchip" style="width:${chip}px;height:${chip}px;font-size:${fs}px" data-lcs-strip-value="${v}">${esc(v)}</span>`);
  return `<div class="ws-nstrip" data-lcs-strip>${items.join('')}</div>`;
}

/* ---------- alphabet strip (G1-245) ---------- */
function alphabetStrip({ letters, w = 660, upper = false }) {
  const N = letters.length;
  const cellW = Math.min(28, Math.floor(w / N));
  const H = 34;
  const total = N * cellW;
  const x0 = (w - total) / 2;
  const fs = Math.round(cellW * 0.68);
  const parts = [];
  letters.forEach((ch, i) => {
    parts.push(el('rect', { x: x0 + i * cellW, y: 1, width: cellW, height: H - 2, fill: i % 2 ? T.tealSoft : T.white }));
    parts.push(el('text', { x: x0 + i * cellW + cellW / 2, y: H / 2 + 1, 'font-family': F.display, 'font-size': fs, 'font-weight': 700, fill: T.teal, 'text-anchor': 'middle', 'dominant-baseline': 'central' }, esc(upper ? ch.toLocaleUpperCase() : ch)));
    if (i) parts.push(line({ x1: x0 + i * cellW, y1: 2, x2: x0 + i * cellW, y2: H - 2, strokeColor: T.grid, strokeWidth: 1, cap: 'butt' }));
  });
  parts.push(roundedRect({ x: x0, y: 1, w: total, h: H - 2, r: 8, fill: 'none', strokeColor: T.teal, strokeWidth: 2 }));
  return svgRoot({ width: w, height: H, label: 'alphabet strip' }, parts.join(''), { 'data-lcs-strip': 'alphabet', 'data-lcs-alphabet': letters.join('') });
}

/* ---------- word-class bin icons (G2-275) ---------- */
const classIcons = {
  noun: () => svgRoot({ width: 40, height: 40, label: 'noun' },
    roundedRect({ x: 4, y: 6, w: 32, h: 28, r: 3, fill: T.white, strokeColor: T.teal, strokeWidth: 2.5 }) +
    circle({ cx: 13, cy: 15, r: 3, fill: T.coral }) +
    el('path', { d: 'M6 30 L16 19 L22 25 L27 21 L34 30', fill: 'none', stroke: T.teal, 'stroke-width': 2, 'stroke-linejoin': 'round' }), {}),
  verb: () => svgRoot({ width: 40, height: 40, label: 'verb' },
    circle({ cx: 24, cy: 9, r: 4, fill: T.teal }) +
    el('path', { d: 'M20 14 L13 24 M20 14 L26 21 L21 32 M26 21 L33 27 M20 14 L28 12 L34 8', fill: 'none', stroke: T.teal, 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }), {}),
  adj: () => svgRoot({ width: 40, height: 40, label: 'adjective' },
    circle({ cx: 14, cy: 22, r: 9, fill: T.coralSoft, strokeColor: T.teal, strokeWidth: 1.5 }) +
    circle({ cx: 24, cy: 16, r: 9, fill: T.tealSoft, strokeColor: T.teal, strokeWidth: 1.5 }) +
    circle({ cx: 26, cy: 26, r: 9, fill: T.coral, strokeColor: T.teal, strokeWidth: 1.5 }) +
    circle({ cx: 8, cy: 10, r: 2.5, fill: T.coral }) + circle({ cx: 35, cy: 12, r: 2.5, fill: T.coral }), {}),
};

/* ---------- scene stage (G2-278): 3 depth bands + ground ellipses ---------- */
function sceneStage({ theme, nouns, w = 660, h = 270, rng, heroIndex = 0, repeats = 1 }) {
  // objects: nouns[0] is the hero (front band, large); others split over the
  // middle/back bands; `repeats` extra clones of non-hero nouns, mirrored.
  const objs = [];
  // bands scale with the stage height (d3 stages are shorter)
  const k = h / 270;
  const bands = {
    back: { yMin: 8, yMax: Math.round(100 * k), sMin: Math.round(62 * Math.min(1, k + 0.15)), sMax: Math.round(84 * Math.min(1, k + 0.15)) },
    mid: { yMin: Math.round(80 * k), yMax: Math.round(178 * k), sMin: Math.round(82 * Math.min(1, k + 0.15)), sMax: Math.round(112 * Math.min(1, k + 0.15)) },
    front: { yMin: Math.round(110 * k), yMax: h - 8, sMin: 140, sMax: Math.round(156 * Math.min(1, k + 0.1)) },
  };
  const others = nouns.filter((_, i) => i !== heroIndex);
  const list = [{ noun: nouns[heroIndex], band: 'front', mirror: false }];
  others.forEach((n, i) => list.push({ noun: n, band: i % 2 ? 'back' : 'mid', mirror: false }));
  for (let k = 0; k < repeats && others.length; k++) list.push({ noun: others[k % others.length], band: k % 2 ? 'mid' : 'back', mirror: true });
  // rejection placement: each object tries random spots in its band until its
  // box overlaps nothing already placed by more than a sliver (8px); after 20
  // misses it shrinks 10 % (never below the band minimum); 80 misses = refuse
  const overlapPx = (a, b) => Math.min(Math.min(a.x + a.size, b.x + b.size) - Math.max(a.x, b.x), Math.min(a.y + a.size, b.y + b.size) - Math.max(a.y, b.y));
  list.forEach((it) => {
    const b = bands[it.band];
    let size = rng.int(b.sMin, b.sMax);
    let placed = null;
    for (let tries = 0; tries < 160 && !placed; tries++) {
      if (tries && tries % 12 === 0) size = Math.max(Math.min(b.sMin, 56), Math.round(size * 0.9));
      const x = 4 + rng.next() * Math.max(1, w - size - 8);
      const yFoot = Math.min(h - 6, Math.max(b.yMin + size, b.yMin + size + rng.next() * Math.max(1, b.yMax - b.yMin - size)));
      const cand = { ...it, size, x, y: yFoot - size };
      if (objs.every((o) => overlapPx(o, cand) <= 8)) placed = cand;
    }
    if (!placed) throw new Error('sceneStage: cannot place ' + it.noun.noun);
    objs.push(placed);
  });
  // draw order: back → front so bigger objects overlap smaller ones' feet
  objs.sort((a, b) => (a.y + a.size) - (b.y + b.size));
  const ground = objs.map((o) => el('ellipse', { cx: (o.x + o.size / 2).toFixed(1), cy: (o.y + o.size - 2).toFixed(1), rx: (o.size * 0.42).toFixed(1), ry: (o.size * 0.09).toFixed(1), fill: T.tealSoft, 'data-lcs-ground': '1' })).join('');
  const imgs = objs.map((o) =>
    `<img class="ws-icon" src="${fileUri(theme, o.noun.noun, undefined, { full: o.size > 120 })}" alt="" data-lcs-noun="${esc(o.noun.vocabKey)}" ` +
    `style="position:absolute;left:${o.x.toFixed(1)}px;top:${o.y.toFixed(1)}px;width:${o.size}px;height:${o.size}px;${o.mirror ? 'transform:scaleX(-1);' : ''}">`).join('');
  return {
    html: `<div class="ws-scene-stage" style="position:relative;width:${w}px;height:${h}px;background:${T.white};border:2px solid #F0E4CB;border-radius:14px;overflow:hidden" data-lcs-scene data-ws-content>` +
      `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="position:absolute;left:0;top:0" aria-hidden="true">${ground}</svg>${imgs}</div>`,
    objects: objs,
  };
}

/* ---------- equal groups pictures (G3-370) ---------- */
function equalGroups({ op, a, b, iconSrc, iconPx = 22, w = 600 }) {
  const icon = (extra) => `<img class="ws-icon" src="${iconSrc}" alt="" style="width:${iconPx}px;height:${iconPx}px"${extra || ''}>`;
  if (op === 'mul') {
    const boxW = Math.min(120, Math.floor((w - (a - 1) * 10) / a));
    const boxes = [];
    for (let g = 0; g < a; g++) {
      boxes.push(`<div class="ws-groupbox" style="width:${boxW}px" data-lcs-group="${g + 1}">` +
        Array.from({ length: b }, () => icon(' data-lcs-g="1"')).join('') + `</div>`);
    }
    return `<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap" data-lcs-picture="mul">${boxes.join('')}</div>`;
  }
  const strip = `<div style="display:flex;gap:4px;justify-content:center;flex-wrap:wrap" data-lcs-picture-strip>` +
    Array.from({ length: a }, () => icon(' data-lcs-g1="1"')).join('') + `</div>`;
  if (op === 'share') {
    const slotW = Math.floor((w - (b - 1) * 10) / b);
    const slots = Array.from({ length: b }, (_, i) => `<div class="ws-groupbox ws-groupbox--empty" style="width:${slotW}px;height:44px" data-lcs-slot="${i + 1}"></div>`).join('');
    return `<div style="display:flex;flex-direction:column;gap:8px" data-lcs-picture="share">${strip}<div style="display:flex;gap:10px;justify-content:center">${slots}</div></div>`;
  }
  return `<div data-lcs-picture="group">${strip}</div>`;
}

/* ---------- word bank (G1-244 d1 / G2-278) ---------- */
function wordBank({ words, wordPx = 17, withIcons }) {
  const items = words.map((wd) =>
    `<span class="ws-bankword" style="font-size:${wordPx}px" data-lcs-bank-word="${esc(wd.word)}"${wd.vocabKey ? ` data-lcs-bank="${esc(wd.vocabKey)}"` : ''}>` +
    (withIcons && wd.src ? `<img class="ws-icon" src="${wd.src}" alt="" style="width:44px;height:44px">` : '') +
    `<span>${esc(wd.word)}</span></span>`).join('');
  return `<div class="ws-scene-banner ws-bank${withIcons ? ' ws-bank--icons' : ''}" data-lcs-bank-banner>${items}</div>`;
}

/* ---------- copy arrow chip (K-286) ---------- */
function copyArrow() {
  return svgRoot({ width: 40, height: 40, label: 'copy' },
    circle({ cx: 20, cy: 20, r: 18, fill: T.coralSoft }) +
    el('path', { d: 'M10 20 H 28 M22 13 L 29 20 L 22 27', fill: 'none', stroke: T.coral, 'stroke-width': 3.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }), { 'data-lcs-copy-arrow': '1' });
}

/* ---------- two white pills to circle (G1-243) ---------- */
function pillChoice({ items, fontPx = 20 }) {
  return `<div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap">` +
    items.map((it) => `<span class="ws-pill" style="font-size:${fontPx}px" data-lcs-pill="${esc(it.key)}">${esc(it.label)}</span>`).join('') + `</div>`;
}

/* ---------- colour-grouped code list (G2-279) ---------- */
function codeList({ groups, wordPx = 15 }) {
  const rows = groups.map((g) =>
    `<div class="ws-codegroup" data-lcs-group="${esc(g.key)}">` +
    `<span style="display:inline-flex;align-items:center;gap:8px;margin-bottom:4px">` +
    svgRoot({ width: 22, height: 22, label: g.key }, el('rect', { x: 1, y: 1, width: 20, height: 20, rx: 5, fill: SWATCH[g.key], stroke: T.ink, 'stroke-width': 1 }), {}) +
    `<span style="font-family:${F.body};font-weight:800;font-size:${wordPx}px;color:${T.ink}" data-lcs-color-word="${esc(g.key)}">${esc(g.word)}</span></span>` +
    `<div class="ws-codechips">${g.codes.map((c) => `<span class="ws-codechip" data-lcs-code="${esc(c)}">${esc(c)}</span>`).join('')}</div></div>`);
  return `<div class="ws-codelist">${rows.join('')}</div>`;
}

/* ---------- count badge (K-287) ---------- */
function countBadge(n) {
  return svgRoot({ width: 26, height: 26, label: `${n}` },
    circle({ cx: 13, cy: 13, r: 12, fill: T.teal }) +
    el('text', { x: 13, y: 14, 'font-family': F.display, 'font-size': 14, 'font-weight': 700, fill: T.white, 'text-anchor': 'middle', 'dominant-baseline': 'central' }, esc(n)),
    { class: 'ws-countbadge', 'data-lcs-count-badge': n });
}

/* ---------- shop shelf (G2-276) ---------- */
function shelf({ items, w = 640, iconPx = 76, tagPx = 17 }) {
  const cells = items.map((it, i) =>
    `<div class="ws-shelfitem" data-lcs-shelfitem="${i}" data-lcs-price="${it.price}">` +
    `<img class="ws-icon" src="${it.src}" alt="" style="width:${iconPx}px;height:${iconPx}px" data-lcs-shelf-img="${i}">` +
    `<div class="ws-shelf-tag">${priceTag({ value: it.price, unit: it.unit, fontPx: tagPx })}</div></div>`).join('');
  const plank = svgRoot({ width: w, height: 22, label: 'shelf' },
    roundedRect({ x: 0, y: 4, w, h: 10, r: 5, fill: T.teal }) +
    el('rect', { x: 40, y: 14, width: 8, height: 8, fill: T.teal }) + el('rect', { x: w - 48, y: 14, width: 8, height: 8, fill: T.teal }), { 'aria-hidden': 'true' });
  return `<div class="ws-shelf" data-lcs-shelf style="width:${w}px"><div class="ws-shelf-row">${cells}</div>${plank}</div>`;
}

/* ---------- fix-the-sentence checklist chips (G2-274) ---------- */
function fixChecklist({ chips }) {
  const items = chips.map((c) =>
    `<span style="display:inline-flex;align-items:center;gap:8px" data-lcs-fixchip="${esc(c.key)}">` +
    svgRoot({ width: 30, height: 30, label: c.key }, circle({ cx: 15, cy: 15, r: 14, fill: T.coral }) +
      el('text', { x: 15, y: 16, 'font-family': F.display, 'font-size': c.glyph.length > 2 ? 10 : 13, 'font-weight': 700, fill: T.white, 'text-anchor': 'middle', 'dominant-baseline': 'central' }, esc(c.glyph)), {}) +
    (c.label ? `<span style="font-family:${F.body};font-weight:700;font-size:14px;color:${T.inkSoft}">${esc(c.label)}</span>` : '') + `</span>`).join('');
  return `<div class="ws-scene-banner" style="gap:26px;padding:6px 14px" data-lcs-checklist>${items}</div>`;
}

/* ---------- letter-count boxes (G1-244 d2 dictée muette) ---------- */
function letterBoxes({ n, box = 26, gap = 4 }) {
  const W = n * box + (n - 1) * gap + 2, H = box + 2;
  const parts = [];
  for (let i = 0; i < n; i++) {
    parts.push(roundedRect({ x: 1 + i * (box + gap), y: 1, w: box, h: box, r: 5, fill: T.white, strokeColor: T.coral, strokeWidth: 2, dash: '5 4' }));
  }
  return svgRoot({ width: W, height: H, label: `${n} letter boxes` }, parts.join(''), { 'data-lcs-letterboxes': n });
}

/* ---------- mirrored icon groups (G1-247 doubles) ---------- */
function mirrorGroups({ src, n, iconPx = 40, gap = 6, perRow = 3 }) {
  const rows = [];
  let left = n;
  while (left > 0) { const take = Math.min(perRow, left); rows.push(take); left -= take; }
  const group = (tag) => `<div style="display:flex;flex-direction:column;gap:${gap}px;align-items:flex-start" ${tag}>` +
    rows.map((take) => `<div style="display:flex;gap:${gap}px">${Array.from({ length: take }, () => `<img class="ws-icon" src="${src}" alt="" style="width:${iconPx}px;height:${iconPx}px">`).join('')}</div>`).join('') + `</div>`;
  const mirrorLine = svgRoot({ width: 14, height: rows.length * (iconPx + gap), label: 'mirror' },
    line({ x1: 7, y1: 4, x2: 7, y2: rows.length * (iconPx + gap) - 4, strokeColor: T.teal, strokeWidth: 2, dash: '7 5' }) +
    circle({ cx: 7, cy: 4, r: 3, fill: T.teal }) + circle({ cx: 7, cy: rows.length * (iconPx + gap) - 4, r: 3, fill: T.teal }), { 'aria-hidden': 'true' });
  return `<div style="display:flex;align-items:center;gap:8px;justify-content:center">${group('data-lcs-g1')}${mirrorLine}` +
    `<div style="transform:scaleX(-1)" data-lcs-g2 data-lcs-mirror="1">${group('')}</div></div>`;
}

module.exports = {
  SWATCH, wordTiles, priceTag, articleChips, rulingBlock, colorLegend, dotPanel, numberStrip, alphabetStrip, classIcons,
  sceneStage, equalGroups, wordBank, copyArrow, pillChoice, codeList, countBadge, shelf, fixChecklist, letterBoxes, mirrorGroups,
};
