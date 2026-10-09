/**
 * mental-math-screen.js — Level Set 2026-10-09 (Mental Math, PDF + interactive): the SCREEN version and ANSWER KEY of
 * a built G1-208-family page, and the robot's INDEPENDENT oracle. New pages only — the published page (level 2, copy 1)
 * never reaches this module.
 *
 * Screen: one card per equation, drawn with a "?" where the page has its box; tap the number. The wrong numbers are the
 * real slips — one or two off, the other operation (8 + 7 → 1 · 15 − 8 → 23), and for a missing first / second number
 * the value got by doing the printed sign instead of undoing it (7 + ☐ = 12 → 19 · ☐ − 3 = 4 → 1) — rank-balanced by
 * lib/graph-screen.js numberItems, which gets them in a salted order (page order made ranks follow the item number,
 * Measurement 2026-10-09). The oracle recomputes the unknown from the stamped numbers.
 */
'use strict';
const GS = require('./graph-screen.js');
const { seededShuffle } = require('./answer-slots.js');
const TK = require('../primitives/_tokens.js').color;

const SIGN = (o) => (o === '-' ? '−' : '+');
const OPS = (o) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:36px;color:${o === '+' ? TK.teal : TK.coral}">${SIGN(o)}</span>`;
const Q = `<span style="font-family:'Baloo 2';font-weight:700;font-size:40px;color:${TK.coral}">?</span>`;

function prompt(n) {
  const v = (x, p) => (p === n.pos ? Q : GS.NUM(x, 40));
  return GS.row(v(n.a, 'a') + OPS(n.op) + v(n.b, 'b') + (n.op2 ? OPS(n.op2) + GS.NUM(n.c, 40) : '') + GS.SYM('=', 36) + v(n.res, 'res'), 12);
}

function slips(n, ans) {
  const s = [ans + 1, ans - 1, ans + 2, ans - 2];
  if (n.pos === 'res' && !n.op2) s.push(n.op === '+' ? Math.abs(n.a - n.b) : n.a + n.b);
  if (n.pos === 'res' && n.op2) s.push(n.op === '+' ? n.a - n.b + (n.op2 === '+' ? n.c : -n.c) : n.a + n.b + (n.op2 === '+' ? n.c : -n.c));
  if (n.pos === 'b') s.push(n.op === '+' ? n.a + n.res : n.a + n.res);       // did the sign instead of undoing it
  if (n.pos === 'a') s.push(n.op === '+' ? n.res + n.b : Math.abs(n.res - n.b));
  return s.filter((x) => x >= 0 && x !== ans);
}

/** the most answers on one page a rotation guess would hit ("slot k mod 3", "rank k mod 3", either direction, any start) */
function rotationHits(html) {
  const items = html.map((h) => {
    const opts = [...h.matchAll(/data-lcs-label="(\d+)"/g)].map((m) => +m[1]);
    const at = [...h.matchAll(/data-lcs-opt="(\d+)"[^>]*?data-lcs-correct="1"/g)].map((m) => +m[1])[0];
    const sorted = [...opts].sort((a, b) => a - b);
    return { slot: at, rank: sorted.indexOf(opts[at]), n: opts.length };
  });
  let worst = 0;
  for (const key of ['slot', 'rank']) for (const dir of [1, -1]) for (let r = 0; r < 3; r++) {
    const hits = items.filter((it, k) => it[key] === (((dir * k + r) % 3) + 3) % 3).length;
    worst = Math.max(worst, hits);
  }
  return worst;
}

function screen(S, salt) {
  const qs = S.map((s) => ({ q: s.q, prompt: prompt(s.nums), ans: s.ans, slips: slips(s.nums, s.ans), step: 1 }));
  // a page's answers must not line up with any rotation guess (2026-10-09: one shipped set let "rank = item number"
  // win 46%): of eight salted draws, keep the one whose best rotation guess hits least
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

function key(bodyHtml) {
  return bodyHtml + `<style data-lcs-key>.ws-answerbox[data-lcs-answer]{position:relative}.ws-answerbox[data-lcs-answer]::after{content:attr(data-lcs-answer);` +
    `position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:700 40px 'Baloo 2',cursive;color:${TK.coral}}</style>`;
}

function screenOrKey(built, S, ctx) {
  if (!S || !S.length) throw new Error('mental-math screen: the page carries no questions');
  const salt = [ctx.locale || 'en', ctx.variant || '', S.map((s) => s.ask).join(',')].join('/');
  if (!ctx.interactive) return { bodyHtml: key(built.bodyHtml), meta: built.meta };
  return { bodyHtml: screen(S, salt), meta: built.meta };
}

// ---- oracle: the unknown from the stamped numbers ----
function answerOf(q) {
  const [k, a0, op, b0, op2, c0, pos] = q.split(':');
  if (k !== 'mm') throw new Error('mental-math oracle: unknown question ' + q);
  const a = +a0, b = +b0, c = c0 === '' ? null : +c0;
  const r1 = op === '+' ? a + b : a - b;
  const res = op2 ? (op2 === '+' ? r1 + c : r1 - c) : r1;
  if (r1 < 0 || res < 0) throw new Error('mental-math oracle: negative ' + q);
  return String(pos === 'a' ? a : pos === 'b' ? b : res);
}
function oracle(items) {
  return items.map((it) => {
    const want = answerOf((it.meta || {})['data-lcs-q']);
    const hits = it.options.map((o) => String(typeof o === 'object' ? o.label : o)).map((l, i) => (l === want ? i : -1)).filter((i) => i >= 0);
    if (hits.length !== 1) throw new Error(`mental-math oracle: ${hits.length} options right for ${it.meta['data-lcs-q']}`);
    return hits[0];
  });
}
function interactiveFor() {
  return { kind: 'tap-choice', item: '[data-lcs-item]', option: '[data-lcs-opt]', answerAttr: 'data-lcs-correct', labelAttr: 'data-lcs-word',
    metaAttrs: ['data-lcs-q'], instructionKey: 'screen', screenHeight: 6000, oracle: (items) => oracle(items) };
}

module.exports = { screenOrKey, interactiveFor, oracle, answerOf };
