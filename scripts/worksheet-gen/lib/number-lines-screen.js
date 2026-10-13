/**
 * number-lines-screen.js — Level Set 2026-10-13 (Number Lines, PDF + interactive + key): the SCREEN version and the
 * ANSWER KEY of a built number-lines page, and the robot's INDEPENDENT oracle. One module for the whole family
 * (21 faces: types/_shared/number-line-tasks.js, G1-118, G1-248 and its eleven variations).
 *
 *   number questions (tap-choice) — one card per answer box: the line is drawn again with its hops / its arrow, the
 *       box asked about shows a coral "?". Wrong numbers are the real slips and stay ON the line: one hop too few or
 *       too many, the start number, a neighbouring tick; on a multiples line only multiples (a number off the hops is
 *       wrong by its last digit alone); on an arrow line never a number that is PRINTED on the line. Ranks balanced
 *       by lib/graph-screen.js numberItems; of eight salted draws the one a rotation guess hits least is kept
 *       (lib/number-charts-screen.js choiceScreen). The salt carries the locale and the copy — a number page is the
 *       same in every locale.
 *   place (G1-138, "circle its dot") — the dots are lettered A, B, C … from the left; tap the letter of the number's
 *       dot. The page builder already spreads the right dot's place over the rows.
 *   round (G2-221, G3-323) — tap the ten / hundred the dot is closer to; the two chips in a salted order, the right
 *       one left and right equally often on a page.
 *
 * Oracle: recomputes every answer from the question stamp (start, direction and hops; hop size and count; the
 * pointer's value; the dot's value and its line), never from the page's correct marks.
 */
'use strict';
const GS = require('./graph-screen.js');
const NCS = require('./number-charts-screen.js');
const { seededShuffle } = require('./answer-slots.js');
const numberLine = require('../primitives/number-line.js');

const CORAL = '#F2784B', INK = '#1F2B2A', TEAL = '#146B5E';
const LETTERS = 'ABCDEF';
const LINE_W = 540;

const opS = (s) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:30px;color:${TEAL}">${s}</span>`;
const numS = (v) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:32px;color:${INK}">${v}</span>`;
const ask = () => `<span style="display:inline-flex;align-items:center;justify-content:center;width:62px;height:52px;box-sizing:border-box;border:3px solid ${CORAL};border-radius:10px;background:#FFF4EE;font-family:'Baloo 2';font-weight:700;font-size:30px;color:${CORAL}">?</span>`;
const empty = () => `<span style="display:inline-flex;width:52px;height:44px;box-sizing:border-box;border:2px dashed #CDBFA8;border-radius:10px;background:#FFFFFF"></span>`;
const col = (html) => `<div style="display:flex;flex-direction:column;align-items:center;gap:6px">${html}</div>`;
const rowH = (html, gap) => `<div style="display:flex;gap:${gap || 10}px;justify-content:center;align-items:center;flex-wrap:wrap">${html}</div>`;

/** the line of a row, as drawn on the page (r.line = the numberLine params) */
const lineSvg = (r, extra) => numberLine({ ...r.line, width: LINE_W, ...(extra || {}) }).svg;

/** the questions of a page: [{ q, prompt, ans, slips, step, lo, hi, not }] */
function questions(mode, rows) {
  const qs = [];
  rows.forEach((r) => {
    if (mode === 'count-on' || mode === 'count-back' || mode === 'jump-sub' || mode === 'add') {
      const dir = r.to > r.a ? 1 : -1;
      const eq = mode === 'add' ? numS(r.a) + opS('+') + numS(r.b) + opS('=') + ask()
        : mode === 'jump-sub' ? numS(r.a) + opS('−') + numS(r.b) + opS('=') + ask()
          : `<span style="font-family:'Nunito';font-weight:800;font-size:24px;color:#8A8276">→</span>` + ask();
      qs.push({ q: `hop:${r.a}:${dir}:${r.b}`, prompt: col(lineSvg(r) + rowH(eq)), ans: r.to,
        // one hop too few (the start counted as a hop) / too many, the start number, two hops off
        slips: [r.to - dir, r.to + dir, r.a, r.to - 2 * dir, r.to + 2 * dir], lo: r.line.min, hi: r.line.max });
    } else if (mode === 'multiples') {
      for (let h = 1; h <= r.hops; h++) {
        const boxes = Array.from({ length: r.hops }, (_, j) => (j + 1 === h ? ask() : empty())).join('');
        const ans = h * r.k;
        qs.push({ q: `mul:${r.k}:${h}`, prompt: col(lineSvg(r) + rowH(boxes, 8)), ans,
          slips: [ans + r.k, ans - r.k, ans + 2 * r.k, ans - 2 * r.k], step: r.k, lo: r.k, hi: r.line.max });
      }
    } else if (mode === 'repeated-sub') {
      qs.push({ q: `rsub:${r.n}:${r.k}`, prompt: col(lineSvg(r) + rowH(numS(r.n) + opS(r.div) + numS(r.k) + opS('=') + ask())),
        ans: r.hops, slips: [r.hops + 1, r.hops - 1, r.hops + 2], lo: 1, hi: r.n });
    } else if (mode === 'pointer') {
      r.pointers.forEach((v) => {
        const t = r.line.tickStep;
        // the stretch of the line round the arrow: from a printed number before it to one after, at least ten ticks
        // (a whole 0-50 line on a phone puts the ticks 5 px apart — too close to count)
        const L = r.line.labelEvery * t;
        let lo = r.labels.filter((x) => x <= v).pop(), hi = r.labels.find((x) => x >= v);
        if (hi === undefined) hi = r.line.max;
        while ((hi - lo) / t < 10 && (lo > r.line.min || hi < r.line.max)) { lo = Math.max(r.line.min, lo - L); hi = Math.min(r.line.max, hi + L); }
        const ptrs = r.pointers.filter((p) => p > lo && p < hi).map((p) => ({ value: p, ask: p === v }));
        qs.push({ q: `ptr:${v}`, prompt: col(numberLine({ ...r.line, min: lo, max: hi, width: LINE_W, pointers: ptrs }).svg), ans: v,
          slips: [v - t, v + t, v - 2 * t, v + 2 * t], step: t, lo: r.line.min + t, hi: r.line.max - t, not: r.labels });
      });
    }
  });
  return qs;
}

/** place: line + lettered dots, chips A, B, C … */
function placeItems(rows, salt) {
  return rows.map((r, k) => {
    const cands = r.cands.slice().sort((a, b) => a - b);
    const W = LINE_W + 52;
    const xFor = (v) => 26 + ((v - r.line.min) / (r.line.max - r.line.min)) * LINE_W;
    const letters = cands.map((v, j) => `<span style="position:absolute;top:0;left:${(xFor(v) - 15).toFixed(1)}px;width:30px;height:30px;border-radius:15px;background:${TEAL};color:#FFFFFF;` +
      `font-family:'Baloo 2';font-weight:700;font-size:20px;line-height:30px;text-align:center">${LETTERS[j]}</span>`).join('');
    const line = `<div style="position:relative;width:${W}px;padding-top:34px">${letters}${numberLine({ ...r.line, width: LINE_W }).svg}</div>`;
    const target = `<span style="display:inline-flex;align-items:center;gap:12px">${numS(r.target)}</span>`;
    const chips = cands.map((v, j) => GS.chip(j, LETTERS[j], v === r.target, `<span style="font-family:'Baloo 2';font-weight:700;font-size:40px;color:${INK}">${LETTERS[j]}</span>`, 110)).join('');
    void salt;
    return GS.itemBox(k, `plc:${r.target}:${cands.join(',')}`, col(target + line) + rowH(chips, 12));
  });
}

/** round: the dot on its line, two chips; the right chip left on half the cards (salted) */
function roundItems(rows, salt) {
  const left = seededShuffle(rows.map((_, i) => i % 2 === 0), salt + '|left');
  return rows.map((r, k) => {
    const nearer = (r.v - r.lo) < r.step / 2 ? r.lo : r.lo + r.step;
    const other = nearer === r.lo ? r.lo + r.step : r.lo;
    const pair = left[k] ? [nearer, other] : [other, nearer];
    const chips = pair.map((c, j) => GS.chip(j, String(c), c === nearer, `<span style="font-family:'Baloo 2';font-weight:700;font-size:38px;color:${INK}">${c}</span>`, 150)).join('');
    return GS.itemBox(k, `rnd:${r.v}:${r.lo}:${r.step}`, col(lineSvg(r)) + rowH(chips, 16));
  });
}

function screen(mode, rows, salt) {
  if (mode === 'place') return GS.wrap(placeItems(rows, salt).join(''));
  if (mode === 'round') return GS.wrap(roundItems(rows, salt).join(''));
  return NCS.choiceScreen(questions(mode, rows), salt);
}

// ---- oracle ----
function answerOf(q) {
  const p = String(q).split(':');
  switch (p[0]) {
    case 'hop': { const [, a, d, b] = p.map(Number); return String(a + d * b); }
    case 'mul': { const [, k, h] = p.map(Number); return String(k * h); }
    case 'rsub': { const [, n, k] = p.map(Number); if (n % k) throw new Error('number-lines oracle: ' + q); return String(n / k); }
    case 'ptr': return String(Number(p[1]));
    case 'plc': { const t = Number(p[1]); const c = p[2].split(',').map(Number).sort((a, b) => a - b); return LETTERS[c.indexOf(t)]; }
    case 'rnd': { const [, v, lo, st] = p.map(Number); if ((v - lo) * 2 === st) throw new Error('number-lines oracle: halfway ' + q); return String((v - lo) < st / 2 ? lo : lo + st); }
    default: throw new Error('number-lines oracle: cannot read "' + q + '"');
  }
}
function oracle(items) {
  return items.map((it) => {
    const want = answerOf((it.meta || {})['data-lcs-q']);
    const hits = it.options.map((o) => String(typeof o === 'object' ? o.label : o)).map((l, i) => (l === want ? i : -1)).filter((i) => i >= 0);
    if (hits.length !== 1) throw new Error(`number-lines oracle: ${hits.length} options right for ${it.meta['data-lcs-q']}`);
    return hits[0];
  });
}
function interactiveFor(instructionKey) {
  return { kind: 'tap-choice', item: '[data-lcs-item]', option: '[data-lcs-opt]', answerAttr: 'data-lcs-correct', labelAttr: 'data-lcs-word',
    metaAttrs: ['data-lcs-q'], instructionKey, screenHeight: 6000, oracle: (items) => oracle(items) };
}

/** the key: answer boxes filled; the right chip / dot ringed */
function keyOf(bodyHtml) {
  let html = NCS.keyFill(bodyHtml).html;
  html = html.replace(/(<span class="ws-chip" style=")([^"]*)("[^>]*data-lcs-correct="1")/g, (m, a, st, b) => `${a}${st};box-shadow:0 0 0 4px ${CORAL};border-color:${CORAL}${b}`);
  return html;
}

module.exports = { screen, questions, answerOf, oracle, interactiveFor, keyOf, LETTERS };
