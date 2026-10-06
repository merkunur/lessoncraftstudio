/**
 * arrays-screen.js — Level Set 2026-10-04 (Arrays and Multiplication, PDF + interactive): the SCREEN version and the
 * ANSWER KEY of a built page of the family (G2-211 and the array-tasks factory's eleven modes), plus the robot's
 * INDEPENDENT oracle. The builder hands over `_ans` (outside meta): per question the drawing, the sentence with the
 * empty place, the QUESTION as an expression ("3*4", "12/3", "?*4=12", "2+5", build-array "3x4") and the answer.
 * The oracle evaluates the question itself — never the page's answer marks. New pages only: the published pages
 * never reach this file.
 *
 *   every mode but build-array:  the drawing + its sentence with "?" → tap the number (3 numbers: the answer + two
 *                                typical slips — one row / group too many or too few, adding instead of
 *                                multiplying, the perimeter on the area grid, ±1); the right one never keeps one place
 *   build-array (G2-212):        "r × c" → tap the array that shows it (the page's own three arrays)
 *   fact-family (G3-311):        the four facts of a card one by one
 *
 * The key is the printed page with every answer written centred in its own answer box (the measured gap-box rule),
 * and the right array ringed on build-array pages.
 */
'use strict';
const { slotFor } = require('./answer-slots.js');

const CORAL = '#F2784B';
const SCR_W = 660, OPT_H = 100;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** how much each mode's print-size drawing is enlarged on the screen (measured against the 660 px lane) */
const ZOOM = { 'count-array': 1.8, 'missing-factor': 1.8, 'fact-family': 1.5, base: 1.6, 'domino-add': 1.6, 'dice-add': 1.6, 'area-grid': 1.7, commutative: 1.3, 'rep-add': 1.25, 'groups-mult': 1.25, 'group-rings': 1.25, 'share-bins': 1.15 };

/** the answer + two different, positive, typical slips; the answer at position `at` */
function optionsFor(x, at) {
  const ds = [];
  for (const v of [...x.d, x.a + 1, x.a + 2, x.a + 3]) if (Number.isInteger(v) && v > 0 && v !== x.a && !ds.includes(v)) ds.push(v);
  const o = ds.slice(0, 2);
  o.splice(at, 0, x.a);
  return o;
}
function item(attrs, top, body) {
  return `<div data-lcs-item ${attrs} data-ws-content style="display:flex;flex-direction:column;align-items:center;gap:14px;width:${SCR_W}px;padding:14px 10px;background:#FFFDF8;border:2px solid #EFE4D2;border-radius:16px;box-sizing:border-box">${top}${body}</div>`;
}
const row = (html, gap = 14) => `<div style="display:flex;align-items:center;justify-content:center;gap:${gap}px;flex-wrap:wrap">${html}</div>`;
function numOpts(vals, at) {
  return row(vals.map((v, j) => `<span class="ws-achip" data-lcs-opt="${j}" data-lcs-label="${v}"${j === at ? ' data-lcs-correct="1"' : ''} style="width:190px;height:${OPT_H}px;box-sizing:border-box;font-size:42px">${v}</span>`).join(''), 12);
}

function screenOrKey(mode, built, ctx, loc) {
  const A = built._ans;
  if (!A || !A.length) throw new Error(`arrays screen: ${mode} has no answer data`);
  const out = { bodyHtml: built.bodyHtml, meta: built.meta };
  if (ctx.interactive) {
    const items = A.map((x, i) => {
      const at = slotFor(x.a + '|' + i, 3);   // never i % 3 (a diagonal tell, 2026-10-06)
      if (x.choose) {
        const opts = x.opts.map((o, j) => `<span class="ws-achip" data-lcs-opt="${j}" data-lcs-label="${o.label}"${o.ok ? ' data-lcs-correct="1"' : ''} style="height:auto;min-height:${OPT_H}px;padding:14px;box-sizing:border-box">${o.html}</span>`).join('');
        return item(`data-lcs-word="${i + 1}" data-lcs-q="${x.q}"`, row(`<span style="display:inline-flex;align-items:center;gap:10px;zoom:1.6">${x.eq}</span>`), row(opts, 12));
      }
      const vals = optionsFor(x, at);
      const z = ZOOM[mode] || 1.4;
      const top = `<div style="zoom:${z};display:flex;justify-content:center">${x.visual}</div>` + row(`<span style="display:inline-flex;align-items:center;gap:8px;zoom:1.5">${x.eq}</span>`);
      return item(`data-lcs-word="${i + 1}" data-lcs-q="${x.q}"`, top, numOpts(vals, at));
    });
    out.bodyHtml = `<div data-ws-content data-lcs-type="arrays-multiplication" data-lcs-screen="${mode}" style="flex:1;display:flex;flex-direction:column;gap:14px;align-items:center;padding-top:10px">${items.join('')}</div>`;
    return out;
  }
  // the answer key: every answer box carries its answer, written centred in the box (measured: gap-box rule G)
  let h = out.bodyHtml.split('class="ws-answerbox"').join('class="ws-answerbox" data-lcs-gapbox');
  const css = [
    `[data-lcs-gapbox]{position:relative}`,
    `[data-lcs-gapbox]::after{content:attr(data-lcs-answer);position:absolute;top:0;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center;font:700 26px 'Baloo 2',cursive;color:${CORAL}}`,
  ];
  if (mode === 'build-array') css.push(`[data-lcs-correct]{outline:4px solid ${CORAL};outline-offset:3px}`);
  out.bodyHtml = h + `<style data-lcs-key>${css.join('')}</style>`;
  return out;
}

/** the robot's oracle: the index of the option that answers the item's QUESTION, evaluated here */
function solve(q) {
  let m;
  if ((m = /^(\d+)\*(\d+)$/.exec(q))) return +m[1] * +m[2];
  if ((m = /^(\d+)\+(\d+)$/.exec(q))) return +m[1] + +m[2];
  if ((m = /^(\d+)\/(\d+)$/.exec(q))) { if (+m[1] % +m[2]) throw new Error(`arrays oracle: ${q} does not divide`); return +m[1] / +m[2]; }
  if ((m = /^\?\*(\d+)=(\d+)$/.exec(q))) { if (+m[2] % +m[1]) throw new Error(`arrays oracle: ${q} has no whole factor`); return +m[2] / +m[1]; }
  throw new Error(`arrays oracle: cannot read "${q}"`);
}
function oracle(mode, items) {
  return items.map((it) => {
    const q = (it.meta || {})['data-lcs-q'];
    const L = it.options.map((o) => (typeof o === 'object' ? o.label : o));
    const want = mode === 'build-array' ? q : String(solve(q));
    const hits = L.map((l, i) => (String(l) === want ? i : -1)).filter((i) => i >= 0);
    if (hits.length !== 1) throw new Error(`arrays oracle: ${q}: ${hits.length} options are ${want} (${L.join(', ')})`);
    return hits[0];
  });
}

function interactiveFor(mode) {
  return {
    kind: 'tap-choice', item: '[data-lcs-item]', option: '[data-lcs-opt]', answerAttr: 'data-lcs-correct', labelAttr: 'data-lcs-word',
    metaAttrs: ['data-lcs-q'], instructionKey: mode === 'count-array' ? 'count' : mode === 'build-array' ? 'build' : 'missing',
    screenHeight: mode === 'fact-family' ? 9000 : 4600,
    oracle: (items) => oracle(mode, items),
  };
}

module.exports = { screenOrKey, oracle, interactiveFor, solve, optionsFor };
