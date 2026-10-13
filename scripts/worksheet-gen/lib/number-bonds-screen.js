/**
 * number-bonds-screen.js — Level Set 2026-10-13 (Number Bonds, PDF + interactive): the SCREEN version and the ANSWER
 * KEY of a built K-243-family page, and the robot's INDEPENDENT oracle. Cloned from times-tables-screen.js.
 *
 * Screen: one card per bond, drawn as on the page with a "?" in the dashed circle; tap the number. Wrong numbers are
 * the real slips, ± 1 and ± 2, and for a missing part the printed part copied over — never a part bigger than its whole
 * nor a whole smaller than its bigger part (its size alone would mark it wrong). Ranks are balanced by
 * lib/graph-screen.js numberItems in a salted order; of eight salted draws the one whose best rotation guess hits least
 * is kept. The salt carries the locale and the copy: a number page is the same in every locale (Doubles and Halves
 * 2026-10-07 — a layout keyed by the numbers alone repeats one lucky pattern ×11).
 * Key: the printed page with every answer written in its dashed circle.
 * The oracle recomputes the missing number from the stamped bond.
 */
'use strict';
const GS = require('./graph-screen.js');
const { seededShuffle } = require('./answer-slots.js');
const TK = require('../primitives/_tokens.js').color;

const SCREEN_SIZE = 250;

function ansOf(s) { return s.blank === 'whole' ? s.whole : s.blank === 'a' ? s.a : s.b; }

/** the wrong numbers a child really writes, and their bounds */
function slips(s) {
  const ans = ansOf(s);
  if (s.blank === 'whole') return { s: [ans - 1, ans + 1, ans + 2, ans - 2], lo: Math.max(s.a, s.b) + 1 };
  const given = s.blank === 'a' ? s.b : s.a;
  return { s: [ans - 1, ans + 1, given, ans + 2, ans - 2].filter((x) => x !== ans), lo: 0, hi: s.whole };
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

const qOf = (s) => `nb:${s.whole}:${s.a}:${s.b}:${s.blank}`;

function screen(S, salt, draw) {
  const qs = S.map((s) => {
    const sl = slips(s);
    const svg = draw({ ...s, size: SCREEN_SIZE, blankText: { text: '?', color: TK.coral } }).svg;
    return { q: qOf(s), prompt: `<div style="display:flex;justify-content:center">${svg}</div>`, ans: ansOf(s), slips: sl.s, lo: sl.lo, hi: sl.hi };
  });
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

function screenOrKey(built, S, ctx, draw) {
  if (!S || !S.length) throw new Error('number-bonds screen: the page carries no bonds');
  const loc = ctx.locale || 'en';
  if (!ctx.interactive) {
    // the key: the same page, every answer written in its dashed circle (the svg is redrawn, so nothing else moves)
    let k = 0;
    const body = built.bodyHtml.replace(/<svg[^>]*data-lcs-prim="number-bond"[\s\S]*?<\/svg>/g, () => {
      const s = S[k++];
      return draw({ ...s, blankText: { text: ansOf(s), color: TK.coral } }).svg;
    });
    if (k !== S.length) throw new Error(`number-bonds key: ${k} bonds on the page, ${S.length} built`);
    return { bodyHtml: body, meta: built.meta };
  }
  const salt = [loc, ctx.variant || '', ctx.seedVariant || '', S.map(qOf).join(',')].join('/');
  return { bodyHtml: screen(S, salt, draw), meta: built.meta };
}

// ---- oracle: the missing number from the stamped bond ----
function answerOf(q) {
  const [k, w0, a0, b0, blank] = String(q).split(':');
  if (k !== 'nb') throw new Error('number-bonds oracle: unknown question ' + q);
  const w = +w0, a = +a0, b = +b0;
  if (!(a >= 0 && b >= 0 && a + b === w)) throw new Error('number-bonds oracle: bad bond ' + q);
  return String(blank === 'whole' ? a + b : blank === 'a' ? w - b : w - a);
}
function oracle(items) {
  return items.map((it) => {
    const want = answerOf((it.meta || {})['data-lcs-q']);
    const hits = it.options.map((o) => String(typeof o === 'object' ? o.label : o)).map((l, i) => (l === want ? i : -1)).filter((i) => i >= 0);
    if (hits.length !== 1) throw new Error(`number-bonds oracle: ${hits.length} options right for ${it.meta['data-lcs-q']}`);
    return hits[0];
  });
}
function interactiveFor() {
  return { kind: 'tap-choice', item: '[data-lcs-item]', option: '[data-lcs-opt]', answerAttr: 'data-lcs-correct', labelAttr: 'data-lcs-word',
    metaAttrs: ['data-lcs-q'], instructionKey: 'screen', screenHeight: 6000, oracle: (items) => oracle(items) };
}

module.exports = { screenOrKey, interactiveFor, oracle, answerOf, slips };
