/**
 * column-screen.js — Level Set 2026-10-05 (Column Addition and Subtraction, PDF + interactive): the SCREEN version and
 * the ANSWER KEY of a built page of the column-arithmetic family (types/_shared/column-arithmetic.js), plus the robot's
 * INDEPENDENT oracle. New pages only: the published pages never reach this file.
 *
 *   screen: each problem is drawn as its column card (enlarged) above three big number chips — the answer and two
 *           TYPICAL MISTAKES, never random numbers:
 *             + with carrying      the "forgot to carry" sum (each column added on its own, mod 10)
 *             − with borrowing     the "took the smaller digit from the bigger" difference (each column |dx − dy|)
 *             every page           place slips (±10, ±1, ±100) — every wrong answer has the answer's digit count
 *           The answer's place rotates (never the same place twice in a row).
 *   key:    the printed page with every answer digit written in its own dashed cell.
 */
'use strict';
const { slotFor } = require('./answer-slots.js');

const CORAL = '#F2784B';
const SCR_W = 660, OPT_H = 100;

/** each column on its own: + ignores carries, − takes the smaller digit from the larger */
function columnwise(a, b, op) {
  let x = a, y = b, out = 0, p = 1;
  while (x > 0 || y > 0) {
    const dx = x % 10, dy = y % 10;
    out += (op === '+' ? (dx + dy) % 10 : Math.abs(dx - dy)) * p;
    x = Math.floor(x / 10); y = Math.floor(y / 10); p *= 10;
  }
  return out;
}
const solve = (a, b, op) => (op === '+' ? a + b : a - b);

/**
 * the two typical mistakes for one problem: distinct, positive, never the answer, and ALWAYS the same number of digits
 * as the answer (reviewer 2026-10-05: a wrong answer one digit shorter, or bigger than the number subtracted from, can
 * be ruled out by its size without working the problem)
 *   + with carrying   "forgot to carry": every column adds without the carried one, the last column writes its whole sum
 *                     (57 + 68 → 115, not 125)
 *   − with borrowing  "smaller from larger" in every column (52 − 38 → 26)
 *   then place slips  ±10, ±1, ±100
 */
function forgotCarry(a, b) {
  const da = String(a).split('').reverse().map(Number), db = String(b).split('').reverse().map(Number);
  const n = Math.max(da.length, db.length); let out = '';
  for (let i = 0; i < n; i++) { const t = (da[i] || 0) + (db[i] || 0); out = (i === n - 1 ? String(t) : String(t % 10)) + out; }
  return Number(out);
}
/**
 * rank = where the answer sits among the three numbers (0 smallest, 1 middle, 2 largest): the caller rotates it so
 * "pick the middle one" never works (2026-10-05, read on the first render: ±10 slips put the answer in the middle every
 * time). The typical mistake is kept whenever it fits the requested side.
 */
function mistakes(a, b, op, regroup, rank = 1) {
  const r = solve(a, b, op), len = String(r).length;
  // and never a size giveaway: same digit count, a difference below the number subtracted from, a sum above both addends
  const fits = (v) => Number.isInteger(v) && v > 0 && v !== r && String(v).length === len && (op === '-' ? v < a : v > Math.max(a, b));
  const typical = regroup ? (op === '+' ? forgotCarry(a, b) : columnwise(a, b, '-')) : null;
  const pool = [];
  for (const v of [typical, r + 10, r - 10, r + 20, r - 20, r + 1, r - 1, r + 100, r - 100, r + 30, r - 30, r + 2, r - 2, r + 3, r - 3]) if (v != null && fits(v) && !pool.includes(v)) pool.push(v);
  if (pool.length < 2) throw new Error(`column screen: no two same-length mistakes for ${a}${op}${b}`);
  const hi = pool.filter((v) => v > r), lo = pool.filter((v) => v < r);
  const want = rank === 0 ? [hi[0], hi[1]] : rank === 2 ? [lo[0], lo[1]] : [lo[0], hi[0]];
  const pair = want.every((v) => v != null) ? want : pool.slice(0, 2);   // the side cannot be honoured: any two
  return pair.sort((x, y) => x - y);
}

function screenOrKey(built, ctx, { regroup }) {
  const P = built._probs;
  if (!P || !P.length) throw new Error('column screen: the page has no problems');
  const out = { bodyHtml: built.bodyHtml, meta: built.meta };
  if (ctx.interactive) {
    // the page's own cards, one per item (the ws-card-stage markup), enlarged
    const cards = [...built.bodyHtml.matchAll(/<div class="ws-card-stage"[\s\S]*?<\/div><\/div><\/div>(?=<\/section>)/g)].map((m) => m[0]);
    if (cards.length !== P.length) throw new Error(`column screen: ${cards.length} cards for ${P.length} problems`);
    // the answer is the smallest, middle or largest of the three in turn (a fixed rotation, never twice in a row);
    // the chips read in ascending order, so the answer's place is its rank
    const ROT = [1, 0, 2, 0, 1, 2, 2, 0, 1];
    const items = P.map((p, i) => {
      const vals = [...mistakes(p.a, p.b, p.op, regroup, ROT[slotFor(p.a + p.op + p.b + '|' + i, ROT.length)]), solve(p.a, p.b, p.op)].sort((x, y) => x - y);
      const at = vals.indexOf(solve(p.a, p.b, p.op));
      const chips = vals.map((v, j) => `<span class="ws-achip" data-lcs-opt="${j}" data-lcs-label="${v}"${j === at ? ' data-lcs-correct="1"' : ''} style="width:190px;height:${OPT_H}px;box-sizing:border-box;font-size:42px">${v}</span>`).join('');
      // the card without its empty answer row's dashed cells looking like a question to tap: the chips answer it
      const card = cards[i].replace(/ data-lcs-digit="\d"/g, '');
      return `<div data-lcs-item data-lcs-word="${i + 1}" data-lcs-q="${p.a}${p.op}${p.b}" data-ws-content style="display:flex;flex-direction:column;align-items:center;gap:16px;width:${SCR_W}px;padding:16px 10px;background:#FFFDF8;border:2px solid #EFE4D2;border-radius:16px;box-sizing:border-box">` +
        `<div style="zoom:1.35;display:flex;justify-content:center">${card}</div>` +
        `<div style="display:flex;align-items:center;justify-content:center;gap:12px">${chips}</div></div>`;
    });
    out.bodyHtml = `<div data-ws-content data-lcs-type="column-arithmetic" data-lcs-screen="column" style="flex:1;display:flex;flex-direction:column;gap:14px;align-items:center;padding-top:10px">${items.join('')}</div>`;
    return out;
  }
  // the answer key: each dashed answer cell carries its digit
  out.bodyHtml += `<style data-lcs-key>[data-lcs-digit]{position:relative}[data-lcs-digit]::after{content:attr(data-lcs-digit);color:${CORAL};font:700 26px 'Baloo 2',cursive}</style>`;
  return out;
}

/** the robot's oracle: the option that answers the item's problem, computed here */
function oracle(items) {
  return items.map((it) => {
    const q = (it.meta || {})['data-lcs-q'];
    const m = /^(\d+)([+-])(\d+)$/.exec(q || '');
    if (!m) throw new Error(`column oracle: cannot read "${q}"`);
    const want = String(solve(+m[1], +m[3], m[2]));
    const L = it.options.map((o) => (typeof o === 'object' ? o.label : o));
    const hits = L.map((l, i) => (String(l) === want ? i : -1)).filter((i) => i >= 0);
    if (hits.length !== 1) throw new Error(`column oracle: ${q}: ${hits.length} options are ${want} (${L.join(', ')})`);
    return hits[0];
  });
}

function interactiveFor() {
  return {
    kind: 'tap-choice', item: '[data-lcs-item]', option: '[data-lcs-opt]', answerAttr: 'data-lcs-correct', labelAttr: 'data-lcs-word',
    metaAttrs: ['data-lcs-q'], instructionKey: 'solve', screenHeight: 9000,
    oracle: (items) => oracle(items),
  };
}

module.exports = { screenOrKey, oracle, interactiveFor, mistakes, columnwise };
