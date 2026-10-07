/**
 * doubles-halves-screen.js — Level Set 2026-10-07 (Doubles and Halves, PDF + interactive): the SCREEN version and the
 * ANSWER KEY of a built G1-247 page (the base or one of its nine faces), plus the robot's INDEPENDENT oracle.
 * New pages only — the published page (level 2, copy 1) never reaches this module.
 *
 *   screen: one card per page card — its pictures (the mirrored groups / the two rows, exactly as printed), the
 *           card's own question with "?" for the boxes (4 + 4 = ? · 12 = ? + ? · ? + ? = 14 · ? = 7 + 7), and three
 *           numbers. Wrong numbers = the slip the card is about (doubling: the number not doubled; halving: the whole
 *           not halved) and near misses; an EVEN answer (a double, a whole) gets only even near misses, so "tap the
 *           even number" tells nothing. Rank and slot of the right number come from lib/answer-slots.js numberChoices
 *           (smallest / middle / largest equally often, never a rotation).
 *   oracle: from the card's op, n and form — 2n or n — never the page's stamped answer.
 *   key:    the printed page with every answer written centred in its box.
 */
'use strict';
const { numberChoices } = require('./answer-slots.js');

const CORAL = '#F2784B', INK = '#1F2B2A';
const SCR_W = 660, OPT_H = 96;

/** the right answer and the question of one card */
function card(op, n, inv) {
  if (op === 'double') return inv ? { ans: n, slip: 2 * n, step: 1, q: `? + ? = ${2 * n}` } : { ans: 2 * n, slip: n, step: 2, q: `${n} + ${n} = ?` };
  return inv ? { ans: 2 * n, slip: n, step: 2, q: `? = ${n} + ${n}` } : { ans: n, slip: 2 * n, step: 1, q: `${2 * n} = ? + ?` };
}

/** the cards of a built page: op, n, inverse flag and the picture stage as printed */
function cardsOf(html) {
  const parts = html.split(/(?=<div class="ws-card-stage" style="flex-direction:column;gap:8px;justify-content:space-evenly" data-lcs-op=")/).slice(1);
  return parts.map((seg) => {
    const m = /data-lcs-op="(double|half)" data-lcs-n="(\d+)"/.exec(seg);
    if (!m) throw new Error('doubles-halves screen: a card without op / n');
    const inv = /data-lcs-inv="1"/.test(seg);
    // the stage: everything between the pill and the number strip (pictures, or the empty dot panel on number cards)
    const a = seg.indexOf('</span>') + 7, b = seg.indexOf('<div style="display:flex;align-items:center;gap:8px" data-lcs-strip>');
    const stage = a > 6 && b > a ? seg.slice(a, b) : '';
    return { op: m[1], n: +m[2], inv, stage: /<img/.test(stage) ? stage : '' };
  });
}

function screen(built, salt = '') {
  const cards = cardsOf(built.bodyHtml);
  if (!cards.length) throw new Error('doubles-halves screen: no cards');
  // the page's own signature joins every hash: a card that recurs on many pages (double 4) must not keep one layout
  // + salt (locale, copy, theme — 2026-10-07): number pages are identical in every locale, so a layout keyed by the
  // numbers alone repeated one lucky (or unlucky) rank pattern eleven times
  const page = cards.map((c) => c.op[0] + c.n + (c.inv ? 'i' : '')).join(',') + '|' + salt + '|';
  const items = cards.map((c, i) => {
    const k = card(c.op, c.n, c.inv);
    const nc = numberChoices(k.ans, [k.slip], page + i, { min: 0, max: 40, step: k.step === 2 && k.ans > 4 ? 2 : 1 })   // tiny even answers (1 + 1 = ?) need odd near misses, or the right one is never the largest;
    const chips = nc.opts.map((v, j) => `<span class="ws-achip" data-lcs-opt="${j}" data-lcs-label="${v}"${j === nc.at ? ' data-lcs-correct="1"' : ''} ` +
      `style="width:190px;height:${OPT_H}px;box-sizing:border-box;font-size:42px">${v}</span>`).join('');
    const pic = c.stage ? `<div style="width:300px;zoom:1.5;display:flex;justify-content:center">${c.stage}</div>` : '';
    return `<div data-lcs-item data-lcs-word="${i + 1}" data-lcs-op="${c.op}" data-lcs-n="${c.n}" data-lcs-inv="${c.inv ? 1 : 0}" data-ws-content ` +
      `style="display:flex;flex-direction:column;align-items:center;gap:14px;width:${SCR_W}px;padding:14px 10px;background:#FFFDF8;border:2px solid #EFE4D2;border-radius:16px;box-sizing:border-box">` +
      pic + `<p style="margin:0;font-family:'Baloo 2',cursive;font-weight:700;font-size:40px;line-height:1.2;color:${INK}">${k.q}</p>` +
      `<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">${chips}</div></div>`;
  });
  return `<div data-ws-content data-lcs-screen="doubles-halves" style="flex:1;display:flex;flex-direction:column;gap:14px;align-items:center;padding-top:6px">${items.join('')}</div>`;
}

/** the answer key: every answer box carries its answer, written centred in the box */
function key(built) {
  const h = built.bodyHtml.split('class="ws-answerbox"').join('class="ws-answerbox" data-lcs-gapbox');
  const css = `[data-lcs-gapbox]{position:relative}[data-lcs-gapbox]::after{content:attr(data-lcs-answer);position:absolute;top:0;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center;font:700 26px 'Baloo 2',cursive;color:${CORAL}}`;
  return h + `<style data-lcs-key>${css}</style>`;
}

function screenOrKey(built, ctx) {
  const salt = [ctx.locale || '', ctx.variant || '', ctx.theme || ''].join('/');
  return { bodyHtml: ctx.interactive ? screen(built, salt) : key(built), meta: built.meta };
}

/** the robot's oracle: the option equal to 2n or n by the card's op and form */
function oracle(items) {
  return items.map((it) => {
    const m = it.meta || {};
    const op = m['data-lcs-op'], n = +m['data-lcs-n'], inv = m['data-lcs-inv'] === '1';
    if (!(op === 'double' || op === 'half') || !(n > 0)) throw new Error('doubles-halves oracle: card without op / n');
    const want = String((op === 'double') !== inv ? 2 * n : n);
    const L = it.options.map((o) => String(typeof o === 'object' ? o.label : o));
    const hits = L.map((l, i) => (l === want ? i : -1)).filter((i) => i >= 0);
    if (hits.length !== 1) throw new Error(`doubles-halves oracle: ${hits.length} options read "${want}" (${L.join(' | ')})`);
    return hits[0];
  });
}

function interactiveFor() {
  return { kind: 'tap-choice', item: '[data-lcs-item]', option: '[data-lcs-opt]', answerAttr: 'data-lcs-correct', labelAttr: 'data-lcs-word',
    metaAttrs: ['data-lcs-op', 'data-lcs-n', 'data-lcs-inv'], instructionKey: 'choose', screenHeight: 6000, oracle: (items) => oracle(items) };
}

module.exports = { screenOrKey, interactiveFor, oracle, cardsOf };
