/**
 * fact-families-screen.js — Level Set 2026-10-07 (Fact Families, PDF + interactive): the SCREEN version and the ANSWER
 * KEY of a built fact-family page (G1-209 + its faces, G3-369), plus the robot's INDEPENDENT oracle. New pages only —
 * the published page (level 2, copy 1) never reaches this module.
 *
 *   screen: every house becomes THREE questions — one whose answer is the whole (the product), one the bigger part, one
 *           the smaller — each with the house's roof and one fact of the family with "?" (a + b = ? · ? − a = b ·
 *           W − a = ? · a + ? = W; × and ÷ in the locale's own signs). The three options are the three roof numbers:
 *           the child reads which roof number fits, the point of a fact family. Because every house asks each role
 *           once, the right number is the largest, the middle and the smallest equally often; the order of a house's
 *           questions and the slot of the right number are seeded by the page + locale + copy (lib/answer-slots.js),
 *           and a page whose slots tap out a rhythm is re-drawn.
 *   oracle: solves the stamped question (7+?=12, ?/6=7 …) — never the page's marked answer.
 *   key:    the printed page with every answer written centred in its box.
 */
'use strict';
const { slotFor, tappingRhythm, seededShuffle } = require('./answer-slots.js');
const { divGlyph, mulGlyph } = require('../types/_shared/notation.js');

const CORAL = '#F2784B', INK = '#1F2B2A';
const SCR_W = 660, OPT_H = 96;

function housesOf(html) {
  const parts = html.split(/(?=<div class="ws-card-stage" style="flex-direction:column;gap:\d+px" data-lcs-a=")/).slice(1);
  return parts.map((seg) => {
    const m = /data-lcs-a="(\d+)" data-lcs-b="(\d+)" data-lcs-whole="(\d+)"/.exec(seg);
    const roof = (/<svg[^>]*data-lcs-prim="fact-roof"[\s\S]*?<\/svg>/.exec(seg) || [''])[0];
    const mul = /data-lcs-eq="\d+\*/.test(seg);
    return { a: +m[1], b: +m[2], w: +m[3], roof, mul };
  });
}

/** the three questions of a house: [{ q (stamped, ascii), shown, ans }] — answer roles: whole, bigger part, smaller part */
function questionsOf(h, loc, key) {
  const add = h.mul ? '*' : '+', sub = h.mul ? '/' : '-';
  const G = { '+': '+', '-': '−', '*': mulGlyph(loc), '/': divGlyph(loc) };
  const show = (q) => q.replace(/[+\-*/]/g, (o) => ` ${G[o]} `).replace('=', ' = ');
  const big = Math.max(h.a, h.b), small = Math.min(h.a, h.b);
  const whole = slotFor(key + '|w', 2) ? `${h.a}${add}${h.b}=?` : `?${sub}${h.a}=${h.b}`;
  const part = (p, other, k) => (slotFor(key + '|' + k, 2) ? `${h.w}${sub}${other}=?` : `${other}${add}?=${h.w}`);
  return [
    { q: whole, ans: h.w },
    { q: part(big, small, 'b'), ans: big },
    { q: part(small, big, 's'), ans: small },
  ].map((x) => ({ ...x, shown: show(x.q) }));
}

function screen(built, salt) {
  const houses = housesOf(built.bodyHtml);
  if (!houses.length) throw new Error('fact-families screen: no houses');
  const loc = salt.split('/')[0] || 'en';
  const page = houses.map((h) => `${h.a},${h.b},${h.w}`).join('|') + '|' + salt + '|';
  const qs = [];
  houses.forEach((h, i) => {
    for (const x of seededShuffle(questionsOf(h, loc, page + i), page + i + '|order')) qs.push({ ...x, h });
  });
  // the slot of each right number; a page whose slots tap a rhythm moves one card's answer one place
  const slots = qs.map((x, k) => slotFor(page + k + '|' + x.q, 3));
  for (let k = 3; k < slots.length; k++) if (tappingRhythm(slots.slice(0, k + 1), 3)) slots[k] = (slots[k] + 1) % 3;
  const items = qs.map((x, k) => {
    const others = seededShuffle([x.h.a, x.h.b, x.h.w].filter((v) => v !== x.ans), page + k + '|o');
    const opts = others.slice(); opts.splice(slots[k], 0, x.ans);
    const chips = opts.map((v, j) => `<span class="ws-achip" data-lcs-opt="${j}" data-lcs-label="${v}"${j === slots[k] ? ' data-lcs-correct="1"' : ''} ` +
      `style="width:190px;height:${OPT_H}px;box-sizing:border-box;font-size:42px">${v}</span>`).join('');
    return `<div data-lcs-item data-lcs-word="${k + 1}" data-lcs-q="${x.q}" data-ws-content ` +
      `style="display:flex;flex-direction:column;align-items:center;gap:12px;width:${SCR_W}px;padding:14px 10px;background:#FFFDF8;border:2px solid #EFE4D2;border-radius:16px;box-sizing:border-box">` +
      `<div style="display:flex;justify-content:center">${x.h.roof}</div>` +
      `<p style="margin:0;font-family:'Baloo 2',cursive;font-weight:700;font-size:40px;line-height:1.2;color:${INK}">${x.shown}</p>` +
      `<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">${chips}</div></div>`;
  });
  return `<div data-ws-content data-lcs-screen="fact-families" style="flex:1;display:flex;flex-direction:column;gap:14px;align-items:center;padding-top:6px">${items.join('')}</div>`;
}

function key(built) {
  const h = built.bodyHtml.split('class="ws-answerbox"').join('class="ws-answerbox" data-lcs-gapbox');
  const css = `[data-lcs-gapbox]{position:relative}[data-lcs-gapbox]::after{content:attr(data-lcs-answer);position:absolute;top:0;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center;font:700 24px 'Baloo 2',cursive;color:${CORAL}}`;
  return h + `<style data-lcs-key>${css}</style>`;
}

function screenOrKey(built, ctx) {
  const salt = [ctx.locale || 'en', ctx.variant || ''].join('/');
  return { bodyHtml: ctx.interactive ? screen(built, salt) : key(built), meta: built.meta };
}

/** solve "7+?=12", "?-5=7", "12-5=?", "?/6=7", "4*?=24" … */
function solve(q) {
  const [lhs, rhs] = q.split('=');
  const m = /^(\d+|\?)([+\-*/])(\d+|\?)$/.exec(lhs);
  if (!m) throw new Error(`fact-families oracle: cannot read "${q}"`);
  const [x, op, y] = [m[1], m[2], m[3]];
  if (rhs === '?') { const A = +x, B = +y; return op === '+' ? A + B : op === '-' ? A - B : op === '*' ? A * B : A / B; }
  const R = +rhs;
  if (x === '?') return op === '+' ? R - +y : op === '-' ? R + +y : op === '*' ? R / +y : R * +y;
  return op === '+' ? R - +x : op === '-' ? +x - R : op === '*' ? R / +x : +x / R;
}
function oracle(items) {
  return items.map((it) => {
    const q = (it.meta || {})['data-lcs-q'];
    const want = String(solve(q));
    const L = it.options.map((o) => String(typeof o === 'object' ? o.label : o));
    const hits = L.map((l, i) => (l === want ? i : -1)).filter((i) => i >= 0);
    if (hits.length !== 1) throw new Error(`fact-families oracle: ${hits.length} options read "${want}" for ${q}`);
    return hits[0];
  });
}

function interactiveFor() {
  return { kind: 'tap-choice', item: '[data-lcs-item]', option: '[data-lcs-opt]', answerAttr: 'data-lcs-correct', labelAttr: 'data-lcs-word',
    metaAttrs: ['data-lcs-q'], instructionKey: 'choose', screenHeight: 6000, oracle: (items) => oracle(items) };
}

module.exports = { screenOrKey, interactiveFor, oracle, solve, housesOf };
