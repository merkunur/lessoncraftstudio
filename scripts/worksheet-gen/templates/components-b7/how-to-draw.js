/**
 * components-b7/how-to-draw.js — the How to Draw page apparatus (nt2-G / b7; K-396 FINAL §2 "rail and paper").
 * Everything here is a rail, a card, a box, a grid, a fold mark, a word lane or a ruled row on the token palette; the
 * ONLY pictures are the engine's (lib/htd-steps.js stepSvg / fullSvg over data/htd/<slug>.json) and, for the scene face,
 * lib/fd-scene.js renderPanel over data/fd/<id>.json with the hero removed. Exports prefixed `htd`.
 */
'use strict';
const { color: T, font: F } = require('../../primitives/_tokens.js');
const Hd = require('../../lib/htd-steps.js');
const { strokeWordLane } = require('../../primitives/trace-path.js');
const { rulingBlock } = require('../components-b2.js');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

const CARD_BORDER = 2, CARD_INSET = 1;          // card outer = inner + 6
const BADGE = 28;

/** the rail: a teal line with a hook at both ends; vertical (length tall) or horizontal (length wide) */
function htdRail({ orient = 'ladder', length }) {
  const v = orient === 'ladder';
  const w = v ? 16 : length, h = v ? length : 16;
  const line = v ? `<line x1="8" y1="8" x2="8" y2="${length - 8}"` : `<line x1="8" y1="8" x2="${length - 8}" y2="8"`;
  const hooks = v ? `<circle cx="8" cy="8" r="4"/><circle cx="8" cy="${length - 8}" r="4"/>` : `<circle cx="8" cy="8" r="4"/><circle cx="${length - 8}" cy="8" r="4"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" data-lcs-htd-rail="${orient}" aria-hidden="true" style="display:block;flex:0 0 auto">` +
    `<g stroke="${T.teal}" stroke-width="3" stroke-linecap="round" fill="${T.white}">${line}/>${hooks}</g></svg>`;
}

/** the step number on the rail: a teal disc with a white digit (a locale-neutral label, never an answer) */
function htdBadge(n, { kind = 'digit' } = {}) {
  const base = `position:absolute;width:${BADGE}px;height:${BADGE}px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-sizing:border-box;`;
  if (kind === 'dot') return `<span data-lcs-htd-badge="dot" style="${base}background:${T.teal}"></span>`;
  if (kind === 'ring') return `<span data-lcs-htd-badge="ring" style="${base}background:${T.white};border:2.5px dashed ${T.coral}"></span>`;
  return `<span data-lcs-htd-n="${n}" data-lcs-htd-badge="digit" style="${base}background:${T.teal};color:${T.white};font-family:${F.display},cursive;font-weight:700;font-size:17px;line-height:1">${n}</span>`;
}

/** a white step card: the engine's panel inside a creamDeep border; badge at its top-left corner, on the rail */
function htdCard({ svg, size = 150, n = null, badge = null, badgeAt = 'ladder', attrs = '' }) {
  const outer = size + 2 * (CARD_BORDER + CARD_INSET);
  // ladder: the badge sits on the vertical rail 8 px left of the card (centre x = -8) and on the card's top edge;
  // strip: on the horizontal rail above (centre y = -8) at the card's left edge
  const pos = badgeAt === 'ladder' ? `left:${-8 - BADGE / 2}px;top:${-BADGE / 2}px` : `left:${-BADGE / 2 + 8}px;top:${-8 - BADGE / 2}px`;
  const b = badge ? htdBadge(n, { kind: badge }).replace('style="', `style="${pos};`) : '';
  return `<div data-lcs-htd-card${n != null ? ` data-lcs-htd-k="${n}"` : ''} ${attrs} style="position:relative;box-sizing:border-box;width:${outer}px;height:${outer}px;padding:${CARD_INSET}px;border:${CARD_BORDER}px solid ${T.creamDeep};border-radius:12px;background:${T.white};flex:0 0 auto;line-height:0">${b}${svg}</div>`;
}

/** the paper: white, the page's dashed coral frame; `guides` = {S, ...} draws the engine's shapes inside, pale and dashed */
function htdPaper({ w, h, role = 'primary', free = false, guides = null, attrs = '' }) {
  let inner = '';
  if (guides && guides.S) {
    const vb = Hd.panelBox(guides.S, { viewBox: 'bbox' });
    const g = T.inkSoft;
    const shapes = (guides.S.shapes || []).filter((x) => x.kind).map((sh) => sh.kind === 'ellipse'
      ? `<ellipse cx="${sh.cx}" cy="${sh.cy}" rx="${sh.rx}" ry="${sh.ry}" transform="rotate(${sh.angle} ${sh.cx} ${sh.cy})" fill="none" stroke="${g}" stroke-width="4" stroke-dasharray="14 10" vector-effect="non-scaling-stroke"/>`
      : `<rect x="${sh.box.x}" y="${sh.box.y}" width="${sh.box.w}" height="${sh.box.h}" rx="${Math.min(sh.box.w, sh.box.h) * 0.18}" fill="none" stroke="${g}" stroke-width="4" stroke-dasharray="14 10" vector-effect="non-scaling-stroke"/>`).join('');
    const outline = guides.outline ? `<path d="${guides.S.full}" fill="${T.creamDeep}"/>` : '';
    inner = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.map((v) => +v.toFixed(1)).join(' ')}" width="${w - 5}" height="${h - 5}" preserveAspectRatio="xMidYMid meet" data-lcs-htd-guides="${(guides.S.shapes || []).filter((x) => x.kind).length}" style="position:absolute;left:0;top:0;display:block">${outline}${shapes}</svg>`;
  }
  return `<span data-lcs-htd-box="${w}x${h}" data-lcs-htd-role="${role}"${free ? ' data-lcs-htd-free="1"' : ''} ${attrs} style="position:relative;display:block;box-sizing:border-box;width:${w}px;height:${h}px;background:${T.white};border:2.5px dashed ${T.coral};border-radius:12px;flex:0 0 auto;overflow:hidden">${inner}</span>`;
}

/** the whole drawing (or the drawing minus some steps, or a pale trace) in a card or in a dashed pencil frame */
function htdFullCard({ S, w, h = null, without = [], fill = null, frame = 'card', badge = null, attrs = '' }) {
  const vb = Hd.panelBox(S, { viewBox: 'bbox' });
  const hh = h || Math.round(w * vb[3] / vb[2]);
  const svg = Hd.fullSvg(S, { width: w, height: hh, viewBox: 'bbox', fill: fill || T.ink, without });
  const b = badge ? htdBadge(null, { kind: badge }).replace('style="', `style="left:-${BADGE / 2 - 2}px;top:-${BADGE / 2 - 2}px;`) : '';
  const border = frame === 'pencil' ? `2.5px dashed ${T.coral}` : `${CARD_BORDER}px solid ${T.creamDeep}`;
  return `<div data-lcs-htd-fullcard="${frame}"${without.length ? ` data-lcs-htd-without="${without.join(',')}"` : ''} ${attrs} style="position:relative;box-sizing:border-box;width:${w + 6}px;height:${hh + 6}px;padding:${CARD_INSET}px;border:${border};border-radius:12px;background:${T.white};flex:0 0 auto;line-height:0;display:flex;align-items:center;justify-content:center">${b}${svg}</div>`;
}

/**
 * the ladder: a vertical rail with n cards at `order` (step indices, DOM order = slot order), space-between in `height`;
 * `beside` = 'numeral' (an empty numeral box beside each card) | 'box' (an empty paper beside each card) | null
 */
function htdLadder({ S, cardPx = 150, order = null, badges = true, beside = null, besideW = 64, besideH = 60, besideRatio = null, height = 660, rail = 'left' }) {
  const n = S.steps.length, seq = order || S.steps.map((_, i) => i);
  const rows = seq.map((k, slot) => {
    const svg = Hd.stepSvg(S, k, { width: cardPx, height: cardPx, viewBox: 'bbox', lastInInk: true, shapes: false });
    const card = htdCard({ svg, size: cardPx, n: badges ? k + 1 : null, badge: badges ? 'digit' : null, badgeAt: 'ladder', attrs: `data-lcs-htd-slot="${slot + 1}"` });
    let side = '';
    if (beside === 'numeral') side = `<span class="ws-blankbox" data-lcs-answer="" data-lcs-htd-numeral="${slot + 1}" style="width:${besideW}px;height:${besideH}px;flex:0 0 ${besideW}px;display:block"></span>`;
    if (beside === 'box') side = htdPaper({ w: besideW, h: besideH, role: 'stepBox', attrs: `data-lcs-htd-col="${slot + 1}"` });
    return `<div style="display:flex;align-items:center;gap:10px;flex-direction:${rail === 'right' ? 'row-reverse' : 'row'}">${card}${side}</div>`;
  }).join('');
  const col = `<div data-lcs-htd-ladder="${n}" style="display:flex;flex-direction:column;justify-content:space-between;height:${height}px;flex:0 0 auto">${rows}</div>`;
  const railSvg = htdRail({ orient: 'ladder', length: height });
  return `<div style="display:flex;flex-direction:${rail === 'right' ? 'row-reverse' : 'row'};align-items:flex-start;flex:0 0 auto">${railSvg}${col}</div>`;
}

/** the strip: a horizontal rail above a row of cards (gap `gap`), centred in `width` */
function htdStrip({ S, cardPx = 140, order = null, badges = true, gap = 12, width = 639, under = null }) {
  const n = S.steps.length, seq = order || S.steps.map((_, i) => i);
  const outer = cardPx + 6, rowW = n * outer + (n - 1) * gap;
  const cards = seq.map((k, slot) => {
    const svg = Hd.stepSvg(S, k, { width: cardPx, height: cardPx, viewBox: 'bbox', lastInInk: true });
    const card = htdCard({ svg, size: cardPx, n: badges ? k + 1 : null, badge: badges ? 'digit' : null, badgeAt: 'strip', attrs: `data-lcs-htd-slot="${slot + 1}"` });
    const u = under ? under(k, slot) : '';
    return u ? `<div data-lcs-htd-col="${slot + 1}" style="display:flex;flex-direction:column;align-items:center;gap:8px">${card}${u}</div>` : card;
  }).join('');
  return `<div data-lcs-htd-strip="${n}" style="display:flex;flex-direction:column;align-items:center;width:${width}px;flex:0 0 auto">` +
    `<div style="width:${rowW}px">${htdRail({ orient: 'strip', length: rowW })}</div>` +
    `<div style="display:flex;gap:${gap}px;width:${rowW}px;justify-content:space-between;margin-top:6px">${cards}</div></div>`;
}

/** two surfaces side by side */
function htdTwin({ left, right, gap = 39, attrs = '' }) {
  return `<div data-lcs-htd-twin ${attrs} style="display:flex;gap:${gap}px;justify-content:center;align-items:flex-start;flex:0 0 auto">${left}${right}</div>`;
}

/** a cells × cells grid; `model` draws the whole drawing fitted inside (6 % padding) as a nested svg; `frame` card | pencil */
function htdGrid({ cells = 4, cellPx = 72, frame = 'card', model = null, labels = false, attrs = '' }) {
  const inner = cells * cellPx, pad = labels ? 22 : 0, size = inner + 4;
  const lines = [];
  for (let i = 1; i < cells; i++) { lines.push(`<line x1="${2 + i * cellPx}" y1="2" x2="${2 + i * cellPx}" y2="${2 + inner}"/>`); lines.push(`<line x1="2" y1="${2 + i * cellPx}" x2="${2 + inner}" y2="${2 + i * cellPx}"/>`); }
  const frameAttr = frame === 'pencil' ? `stroke="${T.coral}" stroke-width="2.5" stroke-dasharray="8 6"` : `stroke="${T.teal}" stroke-width="2"`;
  let m = '';
  if (model) {
    const vb = Hd.panelBox(model, { viewBox: 'bbox' });
    const p = Math.round(inner * 0.06);
    m = `<svg x="${2 + p}" y="${2 + p}" width="${inner - 2 * p}" height="${inner - 2 * p}" viewBox="${vb.map((v) => +v.toFixed(1)).join(' ')}" preserveAspectRatio="xMidYMid meet" data-lcs-prim="htd-full" data-lcs-htd-gridmodel="1"><path d="${model.full}" fill="${T.ink}"/></svg>`;
  }
  let lab = '';
  if (labels) {
    const L = 'ABCDEFGH';
    for (let i = 0; i < cells; i++) { lab += `<text x="${2 + i * cellPx + cellPx / 2}" y="${size + 16}" text-anchor="middle" font-family="${F.display}" font-weight="700" font-size="14" fill="${T.inkSoft}">${L[i]}</text>`; lab += `<text x="${size + 6}" y="${2 + i * cellPx + cellPx / 2 + 5}" font-family="${F.display}" font-weight="700" font-size="14" fill="${T.inkSoft}">${i + 1}</text>`; }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size + pad}" height="${size + pad}" viewBox="0 0 ${size + pad} ${size + pad}" data-lcs-htd-grid="${cells}x${cells}@${cellPx}" data-lcs-htd-gridframe="${frame}" ${attrs} style="display:block;flex:0 0 auto">` +
    `<rect x="2" y="2" width="${inner}" height="${inner}" rx="${frame === 'pencil' ? 12 : 10}" fill="${T.white}" ${frameAttr}/>` +
    `<g stroke="${T.grid}" stroke-width="1">${lines.join('')}</g>${m}${lab}</svg>`;
}

/** the word lane under the drawing: a solid model, a dashed trace and an empty trio on school lines (stacked) */
function htdWordLane({ noun, w, glyphH = 40, h = 60, reps = 2, emptyLast = true, modelless = false, stack = true }) {
  const lane = strokeWordLane({ text: noun, w, h, glyphH, reps, stack, modelless, emptyLast, padLeft: 10 });
  return `<div data-lcs-htd-wordlane="${esc(noun)}" style="width:${w}px;flex:0 0 auto;line-height:0">${lane.svg}</div>`;
}

/** the drawing's own scene with the hero removed, inside a dashed coral frame; `ring` draws a pale ellipse where the hero was */
function htdSceneBank({ scene, heroItem, w = 540, ring = false, renderPanel }) {
  const hero = scene.items.find((l) => l.idx === heroItem);
  if (!hero) throw new Error('htdSceneBank: the hero item is not in the scene');
  const svg = renderPanel(scene, [{ kind: 'remove', item: heroItem }], { mode: 'line', width: w, frame: false, clipId: 'htdsb' });
  const hh = Math.round(w * scene.h / scene.w);
  let r = '';
  if (ring) { const s = w / scene.w, [x0, y0, x1, y1] = hero.bbox; r = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${hh}" style="position:absolute;left:0;top:0" data-lcs-htd-ring="1"><ellipse cx="${((x0 + x1) / 2 * s).toFixed(1)}" cy="${((y0 + y1) / 2 * s).toFixed(1)}" rx="${((x1 - x0) / 2 * s + 10).toFixed(1)}" ry="${((y1 - y0) / 2 * s + 10).toFixed(1)}" fill="none" stroke="${T.inkSoft}" stroke-width="2" stroke-dasharray="10 8"/></svg>`; }
  return `<div data-lcs-htd-scenebank data-lcs-htd-hero="${heroItem}" data-lcs-htd-bank="${hero.bbox.map((v) => Math.round(v)).join(',')}" style="position:relative;box-sizing:border-box;width:${w + 5}px;height:${hh + 5}px;border:2.5px dashed ${T.coral};border-radius:12px;overflow:hidden;background:${T.white};flex:0 0 auto;line-height:0">${svg}${r}</div>`;
}

/** the cream flap the memory model sits on (the part of the page that folds back) */
function htdFlap({ w = 639, h, inner }) {
  return `<div class="ws-lane" data-lcs-htd-flap style="box-sizing:border-box;width:${w + 36}px;height:${h}px;display:flex;align-items:center;justify-content:center">${inner}</div>`;
}

/** the fold: a plain dashed grid line across the page's inner width (the instruction says 'the dotted line'; arrowheads read as 'cut here') */
function htdFold({ w = 675, h = 24 }) {
  const g = T.inkSoft;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" data-lcs-fold="1" style="display:block;flex:0 0 auto">` +
    `<line x1="16" y1="${h / 2}" x2="${w - 16}" y2="${h / 2}" stroke="${T.grid}" stroke-width="2.5" stroke-dasharray="8 6"/>` +
    `</svg>`;
}

/** three school-ruled rows, each opening with a printed starter */
function htdRows({ starters, w, rows = 3, h = 48, glyphH = 24, gap = 6 }) {
  const st = {}; (starters || []).forEach((s, i) => { st[i] = s; });
  // line-height 0: an inline <svg> row otherwise carries a 6 px descender gap (measured 54 for h 48), which broke the 660 column
  return `<div data-lcs-htd-rows="${rows}" style="width:${w}px;flex:0 0 auto;line-height:0">${rulingBlock({ rows, w, h, glyphH, starters: st, gap })}</div>`;
}

module.exports = { htdRail, htdBadge, htdCard, htdPaper, htdFullCard, htdLadder, htdStrip, htdTwin, htdGrid, htdWordLane, htdSceneBank, htdFlap, htdFold, htdRows };
