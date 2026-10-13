/**
 * number-charts-screen.js — Level Set 2026-10-13 (Number Charts, PDF + interactive): the SCREEN version and the ANSWER
 * KEY of a built number-charts page, and the robot's INDEPENDENT oracle. One module for the whole family (21 faces):
 *
 *   tap-choice — one card per empty box: the row (strip, neighbours, machine row, chart rows, groups) is drawn with a
 *       coral "?" in that box, the other empty boxes stay empty; tap the number. Wrong numbers are the real slips and
 *       stay in the row's own family (a strip of fives never offers a number that is not on the fives — its last digit
 *       alone would mark it wrong). Ranks are balanced by lib/graph-screen.js numberItems in a salted order; of eight
 *       salted draws the one whose best rotation guess hits least is kept (Number Bonds 2026-10-13). The salt carries
 *       the locale and the copy: a number page is the same in every locale.
 *   tap-select — odd numbers (G2-218) and the counting path (G1-130): tap every number that belongs.
 *
 * Key: the printed page with every answer written in its box (the boxes keep their size — nothing moves).
 * Oracle: recomputes every answer from the question stamp (the row's anchor and step, the machine's rule, the chart's
 * place, the group size), never from the page's correct marks.
 */
'use strict';
const GS = require('./graph-screen.js');
const { seededShuffle } = require('./answer-slots.js');

const CORAL = '#F2784B', INK = '#1F2B2A', TEAL = '#146B5E';
const SCR_W = 660;

/** the most answers one rotation guess would hit ("slot k mod 3", "rank k mod 3", either direction, any start) */
function rotationHits(html) {
  const items = html.map((h) => {
    const opts = [...h.matchAll(/data-lcs-label="(\d+)"/g)].map((m) => +m[1]);
    const at = [...h.matchAll(/data-lcs-opt="(\d+)"[^>]*?data-lcs-correct="1"/g)].map((m) => +m[1])[0];
    const sorted = [...opts].sort((a, b) => a - b);
    return { slot: at, rank: sorted.indexOf(opts[at]) };
  });
  let worst = 0;
  for (const key of ['slot', 'rank']) for (const dir of [1, -1]) for (let r = 0; r < 3; r++) {
    worst = Math.max(worst, items.filter((it, k) => it[key] === (((dir * k + r) % 3) + 3) % 3).length);
  }
  return worst;
}

/** qs: [{ q, prompt, ans, slips, step, lo, hi }] → the tap-choice screen */
function choiceScreen(qs, salt) {
  let best = null;
  for (let t = 0; t < 8; t++) {
    const s2 = t ? salt + '|r' + t : salt;
    const perm = seededShuffle([...qs.keys()], s2 + '|order');
    const shuffled = GS.numberItems(perm.map((i) => qs[i]), s2);
    const html = []; perm.forEach((i, j) => { html[i] = shuffled[j].replace(/data-lcs-word="\d+"/, `data-lcs-word="${i + 1}"`); });
    const h = rotationHits(html);
    if (!best || h < best.h) best = { h, html };
  }
  return GS.wrap(best.html.join(''));
}

/** items: [{ v, hit, meta }] — tap every number that belongs; `cols` cells a line, `cell` px each */
function selectScreen(items, salt, { cols, cell, given }) {
  const cells = items.map((it, i) => {
    const meta = Object.entries(it.meta || {}).map(([a, v]) => ` ${a}="${v}"`).join('');
    if (it.given) {
      return `<span data-lcs-given="${it.v}" style="display:inline-flex;align-items:center;justify-content:center;width:${cell}px;height:${cell}px;box-sizing:border-box;` +
        `background:#FBD9C9;border:2px solid ${CORAL};border-radius:14px;font-family:'Baloo 2';font-weight:700;font-size:${Math.round(cell * 0.4)}px;color:${INK}">${it.v}</span>`;
    }
    return `<span data-lcs-item data-lcs-word="${i + 1}" data-lcs-val="${it.v}"${meta}${it.hit ? ' data-lcs-hit="1"' : ''} ` +
      `style="display:inline-flex;align-items:center;justify-content:center;width:${cell}px;height:${cell}px;box-sizing:border-box;` +
      `background:#FFFFFF;border:2px solid #EFE4D2;border-radius:14px;font-family:'Baloo 2';font-weight:700;font-size:${Math.round(cell * 0.4)}px;color:${INK}">${it.v}</span>`;
  });
  void salt; void given;
  return `<div data-ws-content data-lcs-screen="number-charts" style="flex:1;display:flex;flex-direction:column;align-items:center;padding-top:6px">` +
    `<div data-ws-content style="display:grid;grid-template-columns:repeat(${cols},${cell}px);gap:10px;justify-content:center;width:${SCR_W}px;padding:14px 8px;` +
    `background:#FFFDF8;border:2px solid #EFE4D2;border-radius:16px;box-sizing:border-box">${cells.join('')}</div></div>`;
}

// ---- small drawing helpers for the question prompts ----
const cellBox = (v, w, kind) => {
  const fs = Math.round(Math.min(w * 0.44, 30));
  const base = `display:inline-flex;align-items:center;justify-content:center;width:${w}px;height:${Math.round(w * 0.86)}px;box-sizing:border-box;border-radius:10px;font-family:'Baloo 2';font-weight:700;font-size:${fs}px;`;
  if (kind === 'ask') return `<span style="${base}border:3px solid ${CORAL};background:#FFF4EE;color:${CORAL}">?</span>`;
  if (kind === 'empty') return `<span style="${base}border:2px dashed #CDBFA8;background:#FFFFFF"></span>`;
  if (kind === 'given') return `<span style="${base}border:2px solid ${TEAL};background:#DDEBE8;color:${INK}">${v}</span>`;
  return `<span style="${base}border:2px solid #EFE4D2;background:#FFFFFF;color:${INK}">${v}</span>`;
};
const op = (s) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:24px;color:${CORAL}">${s}</span>`;
const line = (html, gap) => `<div style="display:flex;gap:${gap === undefined ? 6 : gap}px;justify-content:center;align-items:center;flex-wrap:nowrap">${html}</div>`;

/** fill every empty answer box of a printed page with its answer (the key) */
function keyFill(bodyHtml) {
  let n = 0;
  const out = bodyHtml.replace(/(<span class="ws-answerbox"[^>]*?data-lcs-answer="(-?\d+)"[^>]*>)<\/span>/g, (m, open, v) => {
    n++;
    return `${open}<span style="font-family:'Baloo 2';font-weight:700;font-size:26px;color:${CORAL};line-height:1">${v}</span></span>`;
  });
  return { html: out, n };
}

// ---- oracle ----
function apply(o, k, x) { return o === '+' ? x + k : o === '-' ? x - k : o === 'x' ? x * k : NaN; }
function answerOf(q) {
  const p = String(q).split(':');
  switch (p[0]) {
    case 'seq': { const [, a, ai, st, i] = p.map(Number); return a + (i - ai) * st; }          // strip: anchor, its index, step, index
    case 'nbr': { const [, g, d, dir] = p; return Number(g) + Number(dir) * Number(d); }      // neighbour: given, delta, ±1
    case 'hc': { const [, s, r, c] = p.map(Number); return s + r * 10 + c; }                  // chart: start, row, column
    case 'grp': { const [, k, g] = p.map(Number); return k * g; }                              // groups: size, how many
    case 'io': {                                                                               // machine: op, k, known, which
      const [, o, k0, v0, which] = p; const k = +k0, v = +v0;
      if (which === 'out') return apply(o, k, v);
      return o === '+' ? v - k : o === '-' ? v + k : v / k;
    }
    default: throw new Error('number-charts oracle: cannot read "' + q + '"');
  }
}
function oracle(items) {
  if (items.length && items[0].options) {
    return items.map((it) => {
      const want = String(answerOf((it.meta || {})['data-lcs-q']));
      const hits = it.options.map((o) => String(typeof o === 'object' ? o.label : o)).map((l, i) => (l === want ? i : -1)).filter((i) => i >= 0);
      if (hits.length !== 1) throw new Error(`number-charts oracle: ${hits.length} options right for ${it.meta['data-lcs-q']}`);
      return hits[0];
    });
  }
  return items.map((it) => {
    const m = it.meta || {};
    const v = Number(m['data-lcs-val']);
    if (m['data-lcs-kind'] === 'odd') return v % 2 === 1;
    if (m['data-lcs-rule'] != null) { const [st, off] = m['data-lcs-rule'].split(':').map(Number); return v >= off && (v - off) % st === 0; }
    throw new Error('number-charts oracle: a select item without a stamp');
  });
}
function interactiveFor(kind, instructionKey, height) {
  if (kind === 'select') {
    return { kind: 'tap-select', item: '[data-lcs-item]', answerAttr: 'data-lcs-hit', labelAttr: 'data-lcs-word',
      metaAttrs: ['data-lcs-val', 'data-lcs-kind', 'data-lcs-rule'], instructionKey, screenHeight: 6000, oracle: (items) => oracle(items) };
  }
  return { kind: 'tap-choice', item: '[data-lcs-item]', option: '[data-lcs-opt]', answerAttr: 'data-lcs-correct', labelAttr: 'data-lcs-word',
    metaAttrs: ['data-lcs-q'], instructionKey, screenHeight: height || 6000, oracle: (items) => oracle(items) };
}

/** the salt of a page: locale + copy + the page's questions */
function saltOf(ctx, qs) { return [ctx.locale || 'en', ctx.variant || '', ctx.seedVariant || '', ctx.theme || '', qs.map((x) => x.q).join(',')].join('/'); }

module.exports = { choiceScreen, selectScreen, keyFill, cellBox, op, line, answerOf, oracle, interactiveFor, saltOf, SCR_W, CORAL, INK, TEAL };
