/**
 * graph-screen.js — Level Set 2026-10-08 (Graphs and Data, PDF + interactive): the SCREEN version and ANSWER KEY of a
 * built graph page (types/_shared/graph-tasks.js), and the robot's INDEPENDENT oracle. New pages only — the published
 * page (level 2, copy 1) never reaches this module.
 *
 *   read faces (picture graph, bar graph, scaled, line plot, sort-and-count, the two picture questions): the graph on
 *       top; one card per question, tap the number. The wrong numbers are the real slips — for a scaled graph the
 *       number of PICTURES (forgetting the key), a neighbour's value, one more / one less — rank-balanced by
 *       lib/answer-slots.js numberChoices
 *   most / tallest: tap the category
 *   build faces (count-and-graph, tally-to-graph, build-the-graph): tap the cells of each row / bar — a row is right
 *       when the number of tapped cells is its value (runtime ctx.countGroups, as the Fractions shade screens)
 * Slots and ranks are seeded by the page + locale + copy (pages of one copy are the same in every locale).
 */
'use strict';
const { fileUri } = require('../image-cache/resolve.js');
const { tappingRhythm, seededShuffle, numberChoices } = require('./answer-slots.js');
const pictograph = require('../primitives/pictograph.js');
const barGraph = require('../primitives/bar-graph.js');
const linePlot = require('../primitives/line-plot.js');
const tallyPrim = require('../primitives/tally.js');

const CORAL = '#F2784B', INK = '#1F2B2A', TEAL = '#146B5E';
const SCR_W = 660, OPT_H = 96;
const pic = (t, n, px) => `<img src="${fileUri(t, n)}" alt="" style="width:${px}px;height:${px}px;object-fit:contain">`;
const NUM = (v, px) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:${px || 40}px;color:${INK}">${v}</span>`;
const SYM = (s, px) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:${px || 32}px;color:${TEAL}">${s}</span>`;

function chip(j, label, ok, html, w) {
  return `<span class="ws-achip" data-lcs-opt="${j}" data-lcs-label="${label}"${ok ? ' data-lcs-correct="1"' : ''} ` +
    `style="width:${w || 150}px;height:auto;min-height:${OPT_H}px;padding:8px;box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center">${html}</span>`;
}
function itemBox(k, q, inner) {
  return `<div data-lcs-item data-lcs-word="${k + 1}" data-lcs-q="${q}" data-ws-content ` +
    `style="display:flex;align-items:center;justify-content:center;gap:18px;width:${SCR_W}px;padding:12px 10px;background:#FFFDF8;border:2px solid #EFE4D2;border-radius:16px;box-sizing:border-box;flex-wrap:wrap">${inner}</div>`;
}
const row = (html, gap) => `<div style="display:flex;gap:${gap || 12}px;justify-content:center;align-items:center">${html}</div>`;
const wrap = (inner) => `<div data-ws-content data-lcs-screen="graphs" style="flex:1;display:flex;flex-direction:column;gap:14px;align-items:center;padding-top:6px">${inner}</div>`;
const panel = (svg) => `<div data-ws-content style="background:#FBF3E4;border:2px solid #F0E4CB;border-radius:14px;padding:10px;display:flex;justify-content:center">${svg}</div>`;

/** the graph a read-screen shows above its questions (the same data as the page, drawn for the screen width) */
function graphFor(C) {
  const hrefs = (C.nouns || []).map((n) => fileUri(C.theme, n));
  if (C.mode === 'pict-read' || C.mode === 'pict-which') {
    const slots = Math.max(...C.values.map((v) => Math.ceil(v / C.scale)));
    const cell = Math.max(28, Math.min(56, Math.floor((620 - 40 - 6 * slots) / (slots + 1))));
    return pictograph({ rows: hrefs.map((h, i) => ({ iconHref: h, n: C.values[i] })), scale: C.scale, cell, rowGap: 16, keyScale: C.scale > 1 ? 1.4 : 1 }).svg;
  }
  if (C.mode === 'bar-read' || C.mode === 'bar-which' || C.mode === 'bar-2step') {
    return barGraph({ values: C.values, iconHrefs: hrefs, yMax: Math.max(...C.values) + (C.mode === 'bar-read' && C.scale > 1 ? C.scale : 1),
      yStep: C.mode === 'bar-read' ? C.scale : 1, w: 620, h: 380, padL: 52, padB: 66, fontSize: 18, iconSize: 48, barMax: 96 }).svg;
  }
  if (C.mode === 'lineplot') {
    const fr = C.items.some((it) => String(it.label).includes('½')) || Object.keys(C.counts).some((v) => +v % 1 !== 0);
    const max = Math.max(...Object.values(C.counts));
    const xH = Math.min(44, Math.floor(240 / max));
    return linePlot({ counts: C.counts, min: 1, max: fr ? 4 : 6, step: fr ? 0.5 : 1, width: 560, fracLabels: fr, xH, xSize: Math.min(34, Math.round(xH * 0.8)), labelSize: 24, padX: 30 }).svg;
  }
  return '';
}

/** number questions: [{ q, prompt, ans, slips, step }] → tap-choice items */
function numberItems(qs, salt) {
  const page = qs.map((x) => x.q).join('|') + '|' + salt + '|';
  const items = qs.map((x, k) => ({ x, ...numberChoices(x.ans, x.slips, page + k + '|' + x.q, { min: 0, step: x.step || 1 }) }));
  for (let k = 3; k < items.length; k++) {
    if (!tappingRhythm(items.slice(0, k + 1).map((i) => i.at), 3)) continue;
    for (let s = 1; s < 20; s++) {
      items[k] = { x: items[k].x, ...numberChoices(items[k].x.ans, items[k].x.slips, page + k + '|' + items[k].x.q + '|' + s, { min: 0, step: items[k].x.step || 1 }) };
      if (!tappingRhythm(items.slice(0, k + 1).map((i) => i.at), 3)) break;
    }
  }
  // the answer's RANK among its options (smallest / middle / largest) is spread over the page: no rank holds more than
  // a third (rounded up) of the cards. A small answer has nothing below it but 0, so it tends to be the smallest; capping
  // only the ends pushed the answers into the MIDDLE ("tap the middle number" won 49%, Hundreds Chart 2026-10-08).
  // Over-represented ranks are re-drawn under another salt, the item whose re-draw lands in the rarest rank first.
  const rankOf = (it) => { const so = it.opts.slice().sort((a, b) => a - b); const r = so.indexOf(it.opts[it.at]); return r === 0 ? 0 : r === so.length - 1 ? 2 : 1; };
  const cap = Math.max(1, Math.ceil(items.length / 3));
  for (let s2 = 1; s2 < 200; s2++) {
    const n = [0, 0, 0]; items.forEach((it) => n[rankOf(it)]++);
    const over = [0, 1, 2].filter((r) => n[r] > cap);
    if (!over.length) break;
    const rare = [0, 1, 2].sort((a, b) => n[a] - n[b])[0];
    const pool = items.map((it, i) => i).filter((i) => over.includes(rankOf(items[i])));
    const j = pool[s2 % pool.length];
    const r = numberChoices(items[j].x.ans, items[j].x.slips, page + j + '|' + items[j].x.q + '|rank' + s2, { min: 0, step: items[j].x.step || 1 });
    const cand = { x: items[j].x, ...r };
    if (rankOf(cand) === rare || !over.includes(rankOf(cand))) items[j] = cand;
  }
  return items.map(({ x, opts, at }, k) => itemBox(k, x.q, x.prompt + row(opts.map((v, j) => chip(j, String(v), j === at, NUM(v), 120)).join(''))));
}

/** the build faces: tap the cells of each row / bar (countGroups) */
function buildScreen(C) {
  // every row / bar has more cells than its value (a group may never want all of its parts). Cells are 98 px on the
  // page — about 46 px on a 360-px phone (×0.467) (the robot's tap floor is 44) — so they wrap, six to a line, under a header
  // with the picture and its count (2026-10-08: 36-px cells were 18 px on a phone).
  const slots = Math.max(...C.values) + 2, CELL = 98, PER = 6;
  let k = 0;
  const rows = C.values.map((v, i) => {
    const cells = Array.from({ length: slots }, (_, j) => {
      const idx = k++;
      return `<span data-lcs-item data-lcs-word="${idx + 1}" data-lcs-group="${i}" data-lcs-want="${v}" data-lcs-cell="${j}"${j < v ? ' data-lcs-hit="1"' : ''} ` +
        `style="display:inline-block;width:${CELL}px;height:${CELL}px;box-sizing:border-box;background:#FFFFFF;border:3px dashed #C9BBA2;border-radius:12px"></span>`;
    }).join('');
    return `<div data-ws-content data-lcs-buildrow="${i}" style="display:flex;flex-direction:column;align-items:center;gap:10px;width:${SCR_W}px;padding:12px 10px;background:#FFFDF8;border:2px solid #EFE4D2;border-radius:16px;box-sizing:border-box">` +
      `<span style="display:inline-flex;align-items:center;gap:14px">${pic(C.theme, C.nouns[i], 64)}` +
      (C.mode === 'tally-fill' ? tallyPrim({ n: v, strokeH: 40 }).svg : NUM(v, 44)) + `</span>` +
      `<div style="display:grid;grid-template-columns:repeat(${PER},${CELL}px);gap:10px;justify-content:center">${cells}</div></div>`;
  });
  return wrap(rows.join(''));
}

function screen(C, salt) {
  const m = C.mode;
  if (m === 'pict-fill' || m === 'bar-fill' || m === 'tally-fill') return buildScreen(C);
  const g = graphFor(C);
  const head = g ? panel(g) : '';
  if (m === 'pict-which' || m === 'bar-which') {
    // one question: tap the category with the most (the order salted per locale + copy)
    const target = C.which === 'most' ? C.values.indexOf(Math.max(...C.values)) : C.values.indexOf(Math.min(...C.values));
    const opts = seededShuffle(C.nouns.map((n, i) => ({ n, i })), C.nouns.join('|') + '|' + salt);
    return wrap(head + itemBox(0, `${C.which}:${C.values.join('-')}:${C.nouns.join('|')}`, row(opts.map((o, j) => chip(j, o.n, o.i === target, pic(C.theme, o.n, 72), 130)).join(''), 14)));
  }
  const qs = [];
  if (m === 'pict-read' || m === 'bar-read') {
    C.nouns.forEach((n, i) => {
      const v = C.values[i];
      // the classic slips: the number of PICTURES (the key forgotten), a neighbour's value, one step either side
      const slips = [...(C.scale > 1 && m === 'pict-read' ? [v / C.scale] : []), ...C.values.filter((x, j) => j !== i), v + C.scale, v - C.scale];
      qs.push({ q: `${m}:${C.scale}:${v}:${i}`, prompt: row(pic(C.theme, n, 60) + SYM('=') + SYM('?'), 10), ans: v, slips, step: C.scale });
    });
  } else if (m === 'bar-2step') {
    C.q.forEach((q) => {
      const a = C.values[q.a], b = C.values[q.b], ans = q.op === '+' ? a + b : a - b;
      // the slips: the other operation, one of the two numbers, one off
      qs.push({ q: `2step:${a}${q.op}${b}`, prompt: row(pic(C.theme, C.nouns[q.a], 54) + SYM(q.op) + pic(C.theme, C.nouns[q.b], 54) + SYM('=') + SYM('?'), 8),
        ans, slips: [q.op === '+' ? Math.abs(a - b) : a + b, a, b, ans + 1, ans - 1] });
    });
  } else if (m === 'lineplot') {
    C.items.forEach((it) => {
      const others = C.items.filter((o) => o !== it).map((o) => o.n);
      qs.push({ q: `plot:${it.v}:${it.n}`, prompt: row(NUM(it.label, 40) + SYM('→'), 10), ans: it.n, slips: [...others, it.n + 1, it.n - 1] });
    });
  } else if (m === 'table-sort') {
    C.items.forEach((it, i) => {
      const others = C.items.filter((o, j) => j !== i).map((o) => o.v);
      qs.push({ q: `sort:${it.noun}:${it.v}`, prompt: row(pic(C.theme, it.noun, 60) + SYM('=') + SYM('?'), 10), ans: it.v, slips: [...others, it.v + 1, it.v - 1, others.reduce((a, b) => a + b, it.v)] });
    });
  }
  return wrap(head + (m === 'table-sort' ? stripPanel(C) : '') + numberItems(qs, salt).join(''));
}

/** sort-and-count: the mixed strip (its order is the page's own) above the questions */
function stripPanel(C) {
  return `<div data-ws-content style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;width:${SCR_W}px;padding:10px;background:#FBF3E4;border:2px solid #F0E4CB;border-radius:14px;box-sizing:border-box">` +
    C.order.map((i) => pic(C.theme, C.nouns[i], 48)).join('') + `</div>`;
}

function key(built, C, rebuildFilled) {
  let h = built.bodyHtml;
  const css = [];
  if (C.mode === 'pict-fill' || C.mode === 'bar-fill' || C.mode === 'tally-fill') {
    // the build faces: the same page with the graph FILLED in
    h = rebuildFilled().bodyHtml;
    css.push(`[data-lcs-prim="pictograph"] [data-lcs-stamp],[data-lcs-prim="bar-graph"] [data-lcs-bar]{outline:none}`);
  }
  if (h.includes('class="ws-answerbox"')) {
    h = h.split('class="ws-answerbox"').join('class="ws-answerbox" data-lcs-gapbox');
    css.push(`[data-lcs-gapbox]{position:relative}[data-lcs-gapbox]::after{content:attr(data-lcs-answer);position:absolute;top:0;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center;font:700 30px 'Baloo 2',cursive;color:${CORAL}}`);
  }
  css.push(`[data-lcs-correct]{box-shadow:0 0 0 5px ${CORAL} !important;border-radius:14px}`);
  return h + `<style data-lcs-key>${css.join('')}</style>`;
}

function screenOrKey(built, ctx) {
  const C = built._cards;
  if (!C) throw new Error('graph screen: the page carries no _cards');
  const salt = [ctx.locale || 'en', ctx.variant || '', ctx.theme || ''].join('/');
  if (!ctx.interactive) return { bodyHtml: key(built, C, ctx.rebuildFilled), meta: built.meta };
  return { bodyHtml: screen(C, salt), meta: built.meta };
}

// ---- oracle: recomputes every answer from the stamped question / cell, never from the page's marks ----
function choiceAnswer(q) {
  const p = q.split(':');
  if (p[0] === 'pict-read' || p[0] === 'bar-read') return String(p[2]);   // mode:scale:value:index
  if (p[0] === 'plot' || p[0] === 'sort') return String(p[2]);
  if (p[0] === '2step') { const m = /^(\d+)([+−])(\d+)$/.exec(p[1]); return String(m[2] === '+' ? +m[1] + +m[3] : +m[1] - +m[3]); }
  if (p[0] === 'most' || p[0] === 'least') {
    const v = p[1].split('-').map(Number), nouns = p[2].split('|');
    return nouns[p[0] === 'most' ? v.indexOf(Math.max(...v)) : v.indexOf(Math.min(...v))];
  }
  throw new Error('graph oracle: unknown question ' + q);
}
function oracle(items) {
  if (items.length && items[0].options) {
    return items.map((it) => {
      const want = choiceAnswer((it.meta || {})['data-lcs-q']);
      const hits = it.options.map((o) => String(typeof o === 'object' ? o.label : o)).map((l, i) => (l === want ? i : -1)).filter((i) => i >= 0);
      if (hits.length !== 1) throw new Error(`graph oracle: ${hits.length} options right for ${it.meta['data-lcs-q']}`);
      return hits[0];
    });
  }
  // build cells: a row / bar of value v is right with v cells tapped (the first v, as the oracle's own answer)
  return items.map((it) => { const m = it.meta || {}; if (m['data-lcs-cell'] == null) throw new Error('graph oracle: a cell without its place'); return +m['data-lcs-cell'] < +m['data-lcs-want']; });
}

const KEYS = { 'pict-read': 'readPict', 'bar-read': 'readBar', 'pict-which': 'most', 'bar-which': 'tallest', 'bar-2step': 'twoStep', lineplot: 'plot',
  'table-sort': 'sort', 'pict-fill': 'buildPict', 'bar-fill': 'buildBar', 'tally-fill': 'buildTally' };
function interactiveFor(mode, which, scale) {
  void which;
  // a scaled graph's screen says what one picture / one step is worth, as its page does
  const instructionKey = KEYS[mode] + (scale > 1 && (mode === 'pict-read' || mode === 'bar-read') ? String(scale) : '');
  if (mode === 'pict-fill' || mode === 'bar-fill' || mode === 'tally-fill') {
    return { kind: 'tap-select', countGroups: true, item: '[data-lcs-item]', answerAttr: 'data-lcs-hit', labelAttr: 'data-lcs-word',
      metaAttrs: ['data-lcs-group', 'data-lcs-want', 'data-lcs-cell'], instructionKey, screenHeight: 6000, oracle: (items) => oracle(items) };
  }
  return { kind: 'tap-choice', item: '[data-lcs-item]', option: '[data-lcs-opt]', answerAttr: 'data-lcs-correct', labelAttr: 'data-lcs-word',
    metaAttrs: ['data-lcs-q'], instructionKey, screenHeight: 6000, oracle: (items) => oracle(items) };
}

module.exports = { screenOrKey, interactiveFor, oracle, numberItems, wrap, row, chip, itemBox, NUM, SYM };
