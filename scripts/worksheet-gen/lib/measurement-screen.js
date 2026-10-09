/**
 * measurement-screen.js — Level Set 2026-10-09 (Measurement, PDF + interactive): the SCREEN version and ANSWER KEY of
 * a built Measurement page, and the robot's INDEPENDENT oracle. New pages only — the published page (level 2, copy 1)
 * never reaches this module.
 *
 * The builders (types/_shared/measurement-tasks.js, G2-235, G2-252) collect one question per answer box while they draw
 * the page — the same drawing, the same facts — and this module turns them into tap-choice cards:
 *   number questions (a length, a difference, a temperature, cubes, ml, g): the drawing, then tap the number. The wrong
 *       numbers are the real slips (one more / one less, the next mark, the next numeral, a weight left out, the
 *       squares of the whole row, the two lengths instead of their difference), rank-balanced by
 *       lib/graph-screen.js numberItems (no rank — smallest / middle / largest — holds more than a third of a page)
 *   order (G1-140): each object over its squares, tap 1, 2 or 3
 *   heavier (K-038): each pair, tap the heavier picture (the two pictures in the page's order)
 * Every question stamps the facts its oracle needs; the oracle recomputes the answer from them (the rank from the
 * three lengths, the heavier from MASS_RANK, a sum from its weights) — never from the page.
 */
'use strict';
const GS = require('./graph-screen.js');
const { seededShuffle } = require('./answer-slots.js');
const { MASS_RANK } = require('./mass-rank.js');
const TK = require('../primitives/_tokens.js').color;
const CORAL = TK.coral;

const unitTag = (u) => (u ? `<span style="font-family:'Baloo 2';font-weight:700;font-size:28px;color:${TK.ink}">${u}</span>` : '');

function screen(S, salt) {
  const nums = [], out = [];
  S.forEach((s) => {
    if (s.kind === 'num') nums.push({ q: s.q, prompt: GS.row(s.prompt + GS.SYM('?', 40) + unitTag(s.unit), 16), ans: s.ans, slips: s.slips, step: s.step || 1 });
  });
  // the rank balancer (numberItems) re-draws items in the order it receives them; given in page order, a page's ranks
  // followed the item number ("smallest, middle, largest" down the page won 58% on one shipped set, 2026-10-09) — so it
  // gets them in a salted order, and the cards go back to page order
  const perm = seededShuffle([...nums.keys()], salt + '|order');
  const shuffledHtml = GS.numberItems(perm.map((i) => nums[i]), salt);
  const numHtml = []; perm.forEach((i, j) => { numHtml[i] = shuffledHtml[j]; });
  let k = 0, n = 0;
  S.forEach((s) => {
    if (s.kind === 'num') { out.push(numHtml[n++].replace(/data-lcs-word="\d+"/, `data-lcs-word="${k + 1}"`)); k++; return; }
    if (s.kind === 'rank') {
      out.push(GS.itemBox(k++, s.q, s.prompt + GS.row([1, 2, 3].map((v, j) => GS.chip(j, String(v), v === s.ans, GS.NUM(v), 120)).join(''))));
      return;
    }
    if (s.kind === 'pick') {   // the options in the page's order (already random on the page)
      out.push(GS.itemBox(k++, s.q, GS.row(s.options.map((o, j) => GS.chip(j, o.label, o.ok, o.html, 190)).join(''), 24)));
      return;
    }
    throw new Error('measurement screen: unknown question kind ' + s.kind);
  });
  void seededShuffle;
  return GS.wrap(out.join(''));
}

function key(bodyHtml) {
  const css = [
    `.ws-answerbox[data-lcs-answer]{position:relative}.ws-answerbox[data-lcs-answer]::after{content:attr(data-lcs-answer);position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:700 28px 'Baloo 2',cursive;color:${CORAL}}`,
    `.ws-pattern-chip[data-lcs-correct]{box-shadow:0 0 0 6px ${CORAL};border-radius:50%}`,
  ];
  return bodyHtml + `<style data-lcs-key>${css.join('')}</style>`;
}

/** built: the page; S: the questions collected while drawing it */
function screenOrKey(built, S, ctx) {
  if (!S || !S.length) throw new Error('measurement screen: the page carries no questions');
  const salt = [ctx.locale || 'en', ctx.variant || '', ctx.theme || '', built.meta && built.meta.mode].join('/');
  if (!ctx.interactive) return { bodyHtml: key(built.bodyHtml), meta: built.meta };
  return { bodyHtml: screen(S, salt), meta: built.meta };
}

// ---- oracle: from the stamped facts only ----
function answerOf(q) {
  const p = q.split(':');
  switch (p[0]) {
    case 'len': case 'therm': case 'jug': return String(+p[1]);
    case 'diff': return String(Math.abs(+p[1] - +p[2]));
    case 'cubes': return String(+p[1] * +p[2]);
    case 'bal': return String(p[1].split('+').reduce((a, b) => a + +b, 0));
    case 'rank': { const L = p[1].split(',').map(Number), me = L[+p[2]]; if (new Set(L).size !== L.length) throw new Error('measurement oracle: equal lengths ' + q); return String(L.filter((x) => x < me).length + 1); }
    case 'heavy': {
      const R = MASS_RANK[p[1]]; if (!R) throw new Error('measurement oracle: no mass ranks for ' + p[1]);
      const a = R.indexOf(p[2]), b = R.indexOf(p[3]);
      if (a < 0 || b < 0 || a === b) throw new Error('measurement oracle: cannot rank ' + q);
      return a < b ? p[2] : p[3];
    }
    default: throw new Error('measurement oracle: unknown question ' + q);
  }
}
function oracle(items) {
  return items.map((it) => {
    const want = answerOf((it.meta || {})['data-lcs-q']);
    const hits = it.options.map((o) => String(typeof o === 'object' ? o.label : o)).map((l, i) => (l === want ? i : -1)).filter((i) => i >= 0);
    if (hits.length !== 1) throw new Error(`measurement oracle: ${hits.length} options right for ${it.meta['data-lcs-q']}`);
    return hits[0];
  });
}

/** the face's screen: every Measurement screen is tap-choice; the instruction is keyed by the face's screen kind */
function interactiveFor(instructionKey) {
  return { kind: 'tap-choice', item: '[data-lcs-item]', option: '[data-lcs-opt]', answerAttr: 'data-lcs-correct', labelAttr: 'data-lcs-word',
    metaAttrs: ['data-lcs-q'], instructionKey, screenHeight: 6000, oracle: (items) => oracle(items) };
}

module.exports = { screenOrKey, interactiveFor, oracle, answerOf };
