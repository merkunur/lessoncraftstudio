/**
 * geometry-screen.js — Level Set 2026-10-08 (Geometry, PDF + interactive): the SCREEN version and ANSWER KEY of a built
 * geometry page (types/_shared/geometry-tasks.js + G2-244), and the robot's INDEPENDENT oracle. New pages only — the
 * published page (level 2, copy 1) never reaches this module.
 *
 *   number faces (sides, faces, edges, corners, mirror lines, perimeter): tap the number; the wrong numbers are the
 *       real slips (another count of the same solid; the AREA or half the perimeter for a perimeter), rank-balanced by
 *       lib/answer-slots.js numberChoices
 *   sort-sides: tap the bin (number of sides) · solid-real: tap the object with the same shape
 *   pick-symmetric / same-area / same-perimeter: tap the picture / the rectangle
 *   tap-select: every rectangle (classify), every solid (G2-244), every picture whose dashed line is a mirror line
 *       (symmetry-yn), every right angle (angles)
 * Slots and ranks are seeded by the page + locale + copy (number pages are the same in every locale).
 */
'use strict';
const { fileUri } = require('../image-cache/resolve.js');
const { slotFor, tappingRhythm, seededShuffle, numberChoices } = require('./answer-slots.js');
const { SHAPES_3D } = require('./shape-data.js');
const GT = () => require('../types/_shared/geometry-tasks.js');   // lazy: that module loads this one

const CORAL = '#F2784B', INK = '#1F2B2A', TEAL = '#146B5E';
const SCR_W = 660, OPT_H = 112;
const shape = (k, px) => `<img src="${fileUri('shapes', k)}" alt="" style="width:${px}px;height:${px}px">`;
const pic = (t, n, px) => `<img src="${fileUri(t, n)}" alt="" style="width:${px}px;height:${px}px;object-fit:contain">`;
const NUM = (v, px) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:${px || 44}px;color:${INK}">${v}</span>`;

function chip(j, label, ok, html, w, h) {
  return `<span class="ws-achip" data-lcs-opt="${j}" data-lcs-label="${label}"${ok ? ' data-lcs-correct="1"' : ''} ` +
    `style="width:${w || 190}px;height:auto;min-height:${h || OPT_H}px;padding:10px;box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center">${html}</span>`;
}
function itemBox(k, q, inner) {
  return `<div data-lcs-item data-lcs-word="${k + 1}" data-lcs-q="${q}" data-ws-content ` +
    `style="display:flex;flex-direction:column;align-items:center;gap:14px;width:${SCR_W}px;padding:16px 10px;background:#FFFDF8;border:2px solid #EFE4D2;border-radius:16px;box-sizing:border-box">${inner}</div>`;
}
const row = (html, gap) => `<div style="display:flex;gap:${gap || 14}px;justify-content:center;align-items:center;flex-wrap:wrap">${html}</div>`;
const wrap = (inner) => `<div data-ws-content data-lcs-screen="geometry" style="flex:1;display:flex;flex-direction:column;gap:14px;align-items:center;padding-top:6px">${inner}</div>`;

/** number questions: [{ q, prompt, ans, slips }] → tap-choice items */
function numberScreen(qs, salt) {
  const page = qs.map((x) => x.q).join('|') + '|' + salt + '|';
  const items = qs.map((x, k) => {
    const { opts, at } = numberChoices(x.ans, x.slips, page + k + '|' + x.q, { min: 0 });
    return { x, opts, at };
  });
  // a page whose answers' slots tap a rhythm moves one card's answer by re-drawing it under another salt
  for (let k = 3; k < items.length; k++) {
    if (!tappingRhythm(items.slice(0, k + 1).map((i) => i.at), 3)) continue;
    for (let s = 1; s < 20; s++) {
      const r = numberChoices(items[k].x.ans, items[k].x.slips, page + k + '|' + items[k].x.q + '|' + s, { min: 0 });
      items[k] = { x: items[k].x, ...r };
      if (!tappingRhythm(items.slice(0, k + 1).map((i) => i.at), 3)) break;
    }
  }
  // an answer of 0 is always the smallest option (nothing below it): on such a page no OTHER card's answer is the
  // smallest, so "tap the smallest" wins only the zero card (guessability 2026-10-08)
  const isMin = (it) => it.opts[it.at] === Math.min(...it.opts);
  if (items.some((it) => it.x.ans === 0)) {
    items.forEach((it, k) => {
      if (it.x.ans === 0 || !isMin(it)) return;
      for (let s2 = 1; s2 < 40 && isMin(items[k]); s2++) items[k] = { x: it.x, ...numberChoices(it.x.ans, it.x.slips, page + k + '|' + it.x.q + '|z' + s2, { min: 0 }) };
    });
  }
  return wrap(items.map(({ x, opts, at }, k) =>
    itemBox(k, x.q, `<div style="display:flex;justify-content:center">${x.prompt}</div>` +
      row(opts.map((v, j) => chip(j, String(v), j === at, NUM(v))).join(''), 12))).join(''));
}

/** choice questions with given option lists: [{ q, prompt, opts: [{ label, html, ok }] }] */
function choiceScreen(qs, salt, w) {
  const page = qs.map((x) => x.q).join('|') + '|' + salt + '|';
  let orders = qs.map((x, k) => seededShuffle(x.opts, page + k));
  for (let s = 0; s < 30; s++) {
    const slots = orders.map((o) => o.findIndex((x) => x.ok));
    if (!tappingRhythm(slots, Math.max(...qs.map((x) => x.opts.length)))) break;
    orders = qs.map((x, k) => seededShuffle(x.opts, page + k + '|' + s));
  }
  return wrap(qs.map((x, k) => itemBox(k, x.q,
    (x.prompt ? `<div style="display:flex;justify-content:center">${x.prompt}</div>` : '') +
    row(orders[k].map((o, j) => chip(j, o.label, o.ok, o.html, w || (orders[k].length > 3 ? 146 : 190))).join(''), 12))).join(''));
}

/** tap-select: items = [{ label, html, hit, meta: {attr: value} }] in cards of a few */
function selectScreen(groups, salt) {
  let k = 0;
  return wrap(groups.map((g, gi) => {
    const its = seededShuffle(g, salt + '|sel|' + gi).map((it) => {
      const i = k++;
      const meta = Object.entries(it.meta || {}).map(([a, v]) => ` ${a}="${v}"`).join('');
      return `<span data-lcs-item data-lcs-word="${i + 1}"${meta}${it.hit ? ' data-lcs-hit="1"' : ''} ` +
        `style="display:inline-flex;align-items:center;justify-content:center;width:${it.w || 150}px;height:${it.h || 150}px;box-sizing:border-box;padding:8px;background:#FFFFFF;border:2px solid #EFE4D2;border-radius:14px">${it.html}</span>`;
    }).join('');
    return `<div data-ws-content style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;width:${SCR_W}px;padding:14px 8px;background:#FFFDF8;border:2px solid #EFE4D2;border-radius:16px;box-sizing:border-box">${its}</div>`;
  }).join(''));
}

function screen(C, salt) {
  const it = C.items;
  const m = C.mode;
  // a drawn polygon carries its corners in the question (the oracle counts them); a library shape its name
  const ptsQ = (x) => x.P.map((q) => q.join(',')).join(' ');
  const fig = (x, px) => (x.shape === 'poly' ? GT().polySvg(x.P, px, x.fill) : shape(x.shape, px));
  if (m === 'count-sides') return numberScreen(it.map((x) => ({ q: x.shape === 'poly' ? `pts:${ptsQ(x)}` : `sides:${x.shape}`, prompt: fig(x, 150), ans: x.ans, slips: [x.ans + 1, x.ans - 1] })), salt);
  if (m === 'symmetry-count') return numberScreen(it.map((x) => ({ q: `symn:${x.shape}`, prompt: shape(x.shape, 150), ans: x.ans, slips: [x.ans + 1, x.ans - 1, x.ans * 2] })), salt);
  if (m === 'solid-counts') {
    return numberScreen(it.map((x) => {
      const S = SHAPES_3D[x.shape];
      // the other counts of the SAME solid are the real slip (faces for edges, corners for faces …)
      const slips = ['faces', 'edges', 'vertices'].filter((f) => f !== C.facet).map((f) => S[f]);
      return { q: `solid:${x.shape}:${C.facet}`, prompt: GT().DRAWN_SOLIDS.includes(x.shape) ? GT().solidSvg(x.shape, 150) : shape(x.shape, 150), ans: x.ans, slips };
    }), salt);
  }
  if (m === 'perimeter') {
    // the slips: the AREA (squares counted inside), half the perimeter (two sides only), one side forgotten
    return numberScreen(it.map((x) => ({ q: `per:${x.r}x${x.c}`, prompt: x.svg, ans: x.ans, slips: [x.r * x.c, x.r + x.c, 2 * x.r + x.c] })), salt);
  }
  if (m === 'sort-sides') {
    return choiceScreen(it.map((x) => ({
      q: x.shape === 'poly' ? `pts:${ptsQ(x)}` : `bin:${x.shape}`, prompt: fig(x, 150),
      opts: x.bins.map((b) => ({ label: String(b), html: NUM(b), ok: b === x.ans })),
    })), salt);
  }
  if (m === 'solid-real') {
    const objs = it.map((x) => x.obj);
    return choiceScreen(it.map((x) => ({
      q: `real:${x.solid}`, prompt: shape(x.solid, 150),
      opts: objs.map((o, j) => ({ label: `${o.theme}/${o.noun}`, html: pic(o.theme, o.noun, 96), ok: it[j].solid === x.solid })),
    })), salt);
  }
  if (m === 'pick-symmetric') {
    return choiceScreen(it.map((x) => ({
      q: `pick:${C.theme}`, prompt: '',
      opts: x.opts.map((o) => ({ label: `${C.theme}|${o.noun}`, html: pic(C.theme, o.noun, 110), ok: o.ok })),
    })), salt);
  }
  if (m === 'same-area' || m === 'same-perimeter') {
    const GTs = GT();
    return choiceScreen(it.map((x) => ({
      q: `${x.isArea ? 'area' : 'sameper'}:${x.target[0]}x${x.target[1]}`, prompt: GTs.unitRectSvg(x.target[0], x.target[1], 20),
      opts: x.opts.map((o) => ({ label: `${o.r}x${o.c}`, html: GTs.unitRectSvg(o.r, o.c, 16), ok: o.ok })),
    })), salt, 200);
  }
  if (m === 'classify-quads') {
    const GTs = GT();
    return selectScreen([it.map((x) => ({ html: GTs.quadSvg(x.P, 120, x.fill), hit: x.rect, meta: { 'data-lcs-pts': x.P.map((p) => p.join(',')).join(' ') } }))], salt);
  }
  if (m === 'flat-solid') {
    return selectScreen([it.map((x) => ({ html: shape(x.shape, 110), hit: x.dim === '3d', meta: { 'data-lcs-shape': x.shape } }))], salt);
  }
  if (m === 'symmetry-yn') {
    return selectScreen([it.map((x) => ({
      html: `<span style="position:relative;display:inline-block">${pic(C.theme, x.noun, 120)}<span style="position:absolute;left:50%;top:-4px;bottom:-4px;width:0;border-left:3px dashed ${CORAL}"></span></span>`,
      hit: x.sym, meta: { 'data-lcs-noun': `${C.theme}|${x.noun}` },
    }))], salt);
  }
  if (m === 'angles') {
    const GTs = GT();
    return selectScreen(it.map((x) => x.degs.map((deg) => ({ html: GTs.angleSvgPublic(deg, 112), hit: deg === 90, meta: { 'data-lcs-deg': deg } }))), salt);
  }
  throw new Error('geometry screen: no screen for mode ' + m);
}

/** answer key: the printed page with every answer shown */
function key(built, C, locale) {
  let h = built.bodyHtml;
  const css = [];
  if (h.includes('class="ws-answerbox"')) {
    h = h.split('class="ws-answerbox"').join('class="ws-answerbox" data-lcs-gapbox');
    css.push(`[data-lcs-gapbox]{position:relative}[data-lcs-gapbox]::after{content:attr(data-lcs-answer);position:absolute;top:0;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center;font:700 26px 'Baloo 2',cursive;color:${CORAL}}`);
  }
  if (C.mode === 'sort-sides' || C.mode === 'classify-quads' || C.mode === 'flat-solid') {
    // under each shape, the bin it goes to
    const words = require('../data/geometry-words.js');
    const W = words[locale] || words.en;
    h = h.replace(/data-lcs-item="([^"]+)"( data-lcs-sides="(\d+)")?( data-lcs-class="(\w+)")?/g, (m0, k, s1, sides, c1, cls) => {
      const label = sides ? sides : cls === 'rect' ? W.rectangle : cls === 'not' ? W.notRectangle : '';
      return m0 + (label ? ` data-lcs-keybin="${label}"` : '');
    });
    h = h.replace(/data-lcs-dim="(2d|3d)"/g, (m0, d) => m0 + ` data-lcs-keybin="${d === '3d' ? '▲ 3D' : '■ 2D'}"`);
    css.push(`[data-lcs-keybin]{position:relative}[data-lcs-keybin]::before{content:attr(data-lcs-keybin);position:absolute;left:50%;top:100%;transform:translateX(-50%);margin-top:2px;white-space:nowrap;font:800 13px 'Nunito',sans-serif;color:${CORAL}}`);
  } else if (C.mode === 'solid-real') {
    // the objects numbered 1..n down the right column; each solid shows the number of its object
    const rightOrder = [...h.matchAll(/data-lcs-right="(\w+)"/g)].map((m) => m[1]);
    let n = 0;
    h = h.replace(/data-lcs-right="(\w+)"/g, (m0) => m0 + ` data-lcs-keyrow="${++n}"`);
    h = h.replace(/data-lcs-left="(\w+)"/g, (m0, s) => m0 + ` data-lcs-keybin="→ ${rightOrder.indexOf(s) + 1}"`);
    css.push(`[data-lcs-keybin],[data-lcs-keyrow]{position:relative}[data-lcs-keybin]::before{content:attr(data-lcs-keybin);position:absolute;right:8px;top:6px;font:800 18px 'Nunito',sans-serif;color:${CORAL}}[data-lcs-keyrow]::before{content:attr(data-lcs-keyrow);position:absolute;left:8px;top:6px;font:800 18px 'Nunito',sans-serif;color:${CORAL}}`);
  } else {
    // circle-one, ✓/✗ and right-angle pages: the right choices ringed
    css.push(`[data-lcs-correct],[data-lcs-target]{box-shadow:0 0 0 5px ${CORAL} !important;border-radius:14px}`);
  }
  return h + (css.length ? `<style data-lcs-key>${css.join('')}</style>` : '');
}

function screenOrKey(built, ctx) {
  const C = built._cards;
  if (!C) throw new Error('geometry screen: the page carries no _cards');
  const salt = [ctx.locale || 'en', ctx.variant || '', ctx.theme || ''].join('/');
  if (!ctx.interactive) return { bodyHtml: key(built, C, ctx.locale || 'en'), meta: built.meta };
  return { bodyHtml: screen(C, salt), meta: built.meta };
}

// ---- oracle: recomputes every answer from the stamped question / shape, never from the page's marks ----
const SIDES = { triangle: 3, square: 4, rectangle: 4, diamond: 4, trapezoid: 4, parallelogram: 4, pentagon: 5, hexagon: 6, heptagon: 7, octogon: 8 };
function choiceAnswer(q, labels) {
  const [kind, rest] = q.split(/:(.*)/s);
  if (kind === 'sides' || kind === 'bin') return String(SIDES[rest]);
  if (kind === 'pts') return String(rest.trim().split(' ').length);   // a drawn polygon: count its corners
  if (kind === 'symn') return String(GT().SYMMETRY_COUNT[rest]);
  if (kind === 'solid') { const [s, f] = rest.split(':'); return String(SHAPES_3D[s][f]); }
  if (kind === 'per') { const [r, c] = rest.split('x').map(Number); return String(2 * (r + c)); }
  if (kind === 'sameper') { const [r, c] = rest.split('x').map(Number); return labels.find((l) => { const [a, b] = l.split('x').map(Number); return a + b === r + c; }); }
  if (kind === 'area') { const [r, c] = rest.split('x').map(Number); return labels.find((l) => { const [a, b] = l.split('x').map(Number); return a * b === r * c; }); }
  if (kind === 'real') { const O = require('./shape-data.js').SOLID_REAL_OBJECTS[rest] || []; return labels.find((l) => O.some((o) => `${o.theme}/${o.noun}` === l)); }
  if (kind === 'pick') { const R = require('../data/symmetry-review.js')[rest]; return labels.find((l) => R.sym.includes(l.split('|')[1])); }
  throw new Error('geometry oracle: cannot read "' + q + '"');
}
function oracle(items) {
  if (items.length && items[0].options) {
    return items.map((it) => {
      const q = (it.meta || {})['data-lcs-q'];
      const L = it.options.map((o) => String(typeof o === 'object' ? o.label : o));
      const want = choiceAnswer(q, L);
      const hits = L.map((l, i) => (l === want ? i : -1)).filter((i) => i >= 0);
      if (hits.length !== 1) throw new Error(`geometry oracle: ${hits.length} options right for ${q}`);
      return hits[0];
    });
  }
  // tap-select
  return items.map((it) => {
    const m = it.meta || {};
    if (m['data-lcs-pts'] != null) return GT().isRectangle(m['data-lcs-pts'].split(' ').map((s) => s.split(',').map(Number)));
    if (m['data-lcs-shape'] != null) return !!SHAPES_3D[m['data-lcs-shape']];
    if (m['data-lcs-deg'] != null) return +m['data-lcs-deg'] === 90;
    if (m['data-lcs-noun'] != null) {
      const [t, n] = m['data-lcs-noun'].split('|'); const R = require('../data/symmetry-review.js')[t];
      if (!R || (!R.sym.includes(n) && !R.asym.includes(n))) throw new Error('geometry oracle: ' + t + '/' + n + ' not reviewed');
      return R.sym.includes(n);
    }
    throw new Error('geometry oracle: a select item without a stamp');
  });
}

const KEYS = {
  'count-sides': 'sides', 'sort-sides': 'sides', 'symmetry-count': 'symn', perimeter: 'perimeter', 'solid-real': 'object',
  'pick-symmetric': 'pick', 'same-area': 'sameArea', 'same-perimeter': 'samePerimeter', 'classify-quads': 'rect',
  'flat-solid': 'solid', 'symmetry-yn': 'mirrorLine', angles: 'right',
};
const SELECT = new Set(['classify-quads', 'flat-solid', 'symmetry-yn', 'angles']);
function interactiveFor(mode, facet) {
  const instructionKey = mode === 'solid-counts' ? facet : KEYS[mode];
  if (SELECT.has(mode)) {
    return { kind: 'tap-select', item: '[data-lcs-item]', answerAttr: 'data-lcs-hit', labelAttr: 'data-lcs-word',
      metaAttrs: ['data-lcs-pts', 'data-lcs-shape', 'data-lcs-deg', 'data-lcs-noun'], instructionKey, screenHeight: 6000, oracle: (items) => oracle(items) };
  }
  return { kind: 'tap-choice', item: '[data-lcs-item]', option: '[data-lcs-opt]', answerAttr: 'data-lcs-correct', labelAttr: 'data-lcs-word',
    metaAttrs: ['data-lcs-q'], instructionKey, screenHeight: 6000, oracle: (items) => oracle(items) };
}

module.exports = { screenOrKey, interactiveFor, oracle, screen };
