/**
 * times-tables-screen.js — Level Set 2026-10-13 (Multiplication Tables, PDF + interactive): the SCREEN version and
 * ANSWER KEY of a built G3-358-family page, and the robot's INDEPENDENT oracle. Cloned from mental-math-screen.js.
 *
 * Screen: one card per question, drawn with a "?" where the page has its box; tap the number. The anchor facts of a
 * level-1 ladder (×1, ×5, ×10 already worked) are shown in place as plain rows, so the screen walks the same ladder.
 * Wrong numbers are the real slips:
 *  - a table page (the table of N): the neighbouring multiples (k ± 1)·N, (k ± 2)·N for a product — never a number
 *    outside the table, which a child who knows the table's endings could rule out unread; k ± 1, k ± 2 for a missing
 *    factor;
 *  - a mixed page: one factor one off ((a ± 1)·b, a·(b ± 1)), and "added instead of multiplied" (a + b) when it is no
 *    further from the answer than the bigger factor (else its size alone marks it wrong); a missing factor: ± 1, ± 2.
 * Ranks are balanced by lib/graph-screen.js numberItems in a salted order; of eight salted draws the one whose best
 * rotation guess hits least is kept. The salt carries the locale and the copy: a number page is the same in every
 * locale (Doubles and Halves 2026-10-07 — a layout keyed by the numbers alone repeats one lucky pattern ×11).
 * The oracle recomputes the unknown from the stamped numbers.
 */
'use strict';
const GS = require('./graph-screen.js');
const { seededShuffle } = require('./answer-slots.js');
const TK = require('../primitives/_tokens.js').color;

const DOT_LOCALES = new Set(['de', 'sv', 'da', 'no', 'fi']);
const Q = `<span style="font-family:'Baloo 2';font-weight:700;font-size:40px;color:${TK.coral}">?</span>`;
const OPX = (g) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:34px;color:${TK.teal}">${g}</span>`;

function prompt(n, glyph) {
  const v = (x, p) => (p === n.pos ? Q : GS.NUM(x, 40));
  return GS.row(v(n.a, 'a') + OPX(glyph) + v(n.b, 'b') + GS.SYM('=', 36) + v(n.res, 'res'), 12);
}

function givenRow(n, glyph) {
  return `<div data-ws-content data-lcs-keep style="display:flex;align-items:center;justify-content:center;gap:12px;width:640px;padding:10px;` +
    `background:#E3F1EE;border:2px solid #9FCBC2;border-radius:16px;box-sizing:border-box">` +
    GS.NUM(n.a, 40) + OPX(glyph) + GS.NUM(n.b, 40) + GS.SYM('=', 36) +
    `<span style="font-family:'Baloo 2';font-weight:700;font-size:40px;color:${TK.teal}">${n.res}</span></div>`;
}

/** the wrong numbers a child really writes, and the step and floor of the filler numbers */
function slips(n, ans) {
  if (n.n) {
    if (n.pos === 'res') return { s: [n.k - 1, n.k + 1, n.k + 2, n.k - 2].filter((k) => k >= 1).map((k) => k * n.n), step: n.n };
    return { s: [ans - 1, ans + 1, ans + 2, ans - 2].filter((x) => x >= 1), step: 1, min: 1 };
  }
  if (n.pos === 'res') {
    const s = [(n.a + 1) * n.b, (n.a - 1) * n.b, n.a * (n.b + 1), n.a * (n.b - 1)];
    if (Math.abs(n.a + n.b - ans) <= Math.max(n.a, n.b)) s.unshift(n.a + n.b);
    return { s: s.filter((x) => x > 0 && x !== ans), step: 1, min: 1 };
  }
  return { s: [ans - 1, ans + 1, ans + 2, ans - 2].filter((x) => x >= 1), step: 1, min: 1 };
}

/** the most answers on one page a rotation guess would hit ("slot k mod 3", "rank k mod 3", either direction, any start) */
function rotationHits(html) {
  const items = html.map((h) => {
    const opts = [...h.matchAll(/data-lcs-label="(\d+)"/g)].map((m) => +m[1]);
    const at = [...h.matchAll(/data-lcs-opt="(\d+)"[^>]*?data-lcs-correct="1"/g)].map((m) => +m[1])[0];
    const sorted = [...opts].sort((a, b) => a - b);
    return { slot: at, rank: sorted.indexOf(opts[at]) };
  });
  let worst = 0;
  for (const key of ['slot', 'rank']) for (const dir of [1, -1]) for (let r = 0; r < 3; r++) {
    const hits = items.filter((it, k) => it[key] === (((dir * k + r) % 3) + 3) % 3).length;
    worst = Math.max(worst, hits);
  }
  return worst;
}

function screen(S, salt, glyph) {
  const Qs = S.filter((s) => !s.given);
  const qs = Qs.map((s) => { const sl = slips(s.nums, s.ans); return { q: s.q, prompt: prompt(s.nums, glyph), ans: s.ans, slips: sl.s, step: sl.step, min: sl.min }; });
  let best = null;
  for (let t = 0; t < 8; t++) {
    const s2 = t ? salt + '|r' + t : salt;
    const perm = seededShuffle([...qs.keys()], s2 + '|order');
    const shuffled = GS.numberItems(perm.map((i) => qs[i]), s2);
    const html = []; perm.forEach((i, j) => { html[i] = shuffled[j].replace(/data-lcs-word="\d+"/, `data-lcs-word="${i + 1}"`); });
    const h = rotationHits(html);
    if (!best || h < best.h) best = { h, html };
  }
  // put the anchor rows back where the page has them
  const out = []; let qi = 0;
  for (const s of S) out.push(s.given ? givenRow(s.nums, glyph) : best.html[qi++]);
  return GS.wrap(out.join(''));
}

function key(bodyHtml) {
  return bodyHtml + `<style data-lcs-key>.ws-answerbox[data-lcs-answer]{position:relative}.ws-answerbox[data-lcs-answer]::after{content:attr(data-lcs-answer);` +
    `position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:700 44px 'Baloo 2',cursive;color:${TK.coral}}</style>`;
}

function screenOrKey(built, S, ctx) {
  if (!S || !S.some((s) => !s.given)) throw new Error('times-tables screen: the page carries no questions');
  const loc = ctx.locale || 'en';
  const salt = [loc, ctx.variant || '', ctx.seedVariant || '', S.filter((s) => !s.given).map((s) => s.ask).join(',')].join('/');
  if (!ctx.interactive) return { bodyHtml: key(built.bodyHtml), meta: built.meta };
  return { bodyHtml: screen(S, salt, DOT_LOCALES.has(loc) ? '·' : '×'), meta: built.meta };
}

// ---- oracle: the unknown from the stamped numbers ----
function answerOf(q) {
  const [k, a0, b0, pos] = String(q).split(':');
  if (k !== 'mt') throw new Error('times-tables oracle: unknown question ' + q);
  const a = +a0, b = +b0;
  if (!(a >= 1 && b >= 1)) throw new Error('times-tables oracle: bad factors ' + q);
  return String(pos === 'a' ? a : pos === 'b' ? b : a * b);
}
function oracle(items) {
  return items.map((it) => {
    const want = answerOf((it.meta || {})['data-lcs-q']);
    const hits = it.options.map((o) => String(typeof o === 'object' ? o.label : o)).map((l, i) => (l === want ? i : -1)).filter((i) => i >= 0);
    if (hits.length !== 1) throw new Error(`times-tables oracle: ${hits.length} options right for ${it.meta['data-lcs-q']}`);
    return hits[0];
  });
}
function interactiveFor() {
  return { kind: 'tap-choice', item: '[data-lcs-item]', option: '[data-lcs-opt]', answerAttr: 'data-lcs-correct', labelAttr: 'data-lcs-word',
    metaAttrs: ['data-lcs-q'], instructionKey: 'screen', screenHeight: 6000, oracle: (items) => oracle(items) };
}

module.exports = { screenOrKey, interactiveFor, oracle, answerOf, slips };
