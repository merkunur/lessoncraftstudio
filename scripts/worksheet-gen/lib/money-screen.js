/**
 * money-screen.js — Level Set 2026-10-05 (Counting Money, PDF + interactive): the SCREEN version and the ANSWER KEY of
 * a built page of the money family, plus the robot's INDEPENDENT oracle. New pages only: the published pages never
 * reach this file.
 *
 *   count (G1-211 and its variations): each purse, enlarged, above three total chips — the answer and two REAL SLIPS:
 *            a coin left out, one coin counted twice, a coin read as its neighbour value (then small place slips).
 *   purse (G1-232): the two purses are the two options; tap the one with more money.
 *   shop  (G2-276 and its variations): the shelf stays at the top; every story card keeps its sentence and gets
 *            options — three number chips for total / change / difference (slips: a price left out, the price written
 *            instead of the change, the smaller price written instead of the difference, one price misread by a
 *            step) or the page's own yes / no words for "is there enough money?".
 *   Every wrong number has the answer's digit count and never gives itself away by size (a total below a price it
 *   adds, a change above the money paid, a difference above the dearer price). The answer is the smallest, middle or
 *   largest chip in turn (the lesson from Column Addition: "pick the middle one" must never work).
 *   key:   the printed page with every answer written in its box; the richer purse and the right yes / no ringed.
 */
'use strict';

const { SHOP_FRAMES } = require('../data/b2/shop-frames.js');
const { slotFor } = require('./answer-slots.js');

const CORAL = '#F2784B';
const SCR_W = 660, OPT_H = 96;
const ROT = [1, 0, 2, 0, 1, 2, 2, 0, 1];
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** two wrong numbers from an ordered list of candidates, honouring the requested rank of the answer when it can */
function pickTwo(answer, candidates, fits, rank, what, sameLen = (v) => String(v).length === String(answer).length) {
  const pool = [];
  for (const v of candidates) if (Number.isInteger(v) && v > 0 && v !== answer && sameLen(v) && fits(v) && !pool.includes(v)) pool.push(v);
  if (pool.length < 2) throw new Error(`money screen: no two same-length slips for ${what} (answer ${answer})`);
  const hi = pool.filter((v) => v > answer), lo = pool.filter((v) => v < answer);
  // the caller may pass a function: it is told which ranks this card can take (smallest / middle / largest)
  if (typeof rank === 'function') rank = rank([hi.length >= 2, lo.length >= 1 && hi.length >= 1, lo.length >= 2]);
  if (rank == null) rank = 0;
  // the requested rank, else the next rank that can be honoured (never a silent fall back to "whatever came first",
  // which put the answer at the bottom ~70% of the time on change / difference cards)
  for (const r of [rank, (rank + 1) % 3, (rank + 2) % 3]) {
    const want = r === 0 ? [hi[0], hi[1]] : r === 2 ? [lo[0], lo[1]] : [lo[0], hi[0]];
    if (want.every((v) => v != null)) return want.sort((x, y) => x - y);
  }
  return pool.slice(0, 2).sort((x, y) => x - y);
}

/** the slips a child makes counting one purse */
function countSlips(values, denoms, rank) {
  const T = values.reduce((a, b) => a + b, 0);
  const D = [...new Set(denoms)].sort((a, b) => a - b);
  const kinds = [...new Set(values)].sort((a, b) => b - a);
  const c = [];
  for (const v of kinds) c.push(T - v);                         // a coin left out
  for (const v of kinds) c.push(T + v);                         // one coin counted twice
  for (const v of kinds) {                                      // a coin read as its neighbour value
    const i = D.indexOf(v);
    if (i > 0) c.push(T - v + D[i - 1]);
    if (i >= 0 && i < D.length - 1) c.push(T - v + D[i + 1]);
  }
  c.push(T + 10, T - 10, T + 1, T - 1, T + 2, T - 2, T + 5, T - 5, T + 3, T - 3);
  return pickTwo(T, c, () => true, rank, values.join('+'));
}

/**
 * small changes and differences in a world of 5 c steps (every price is a multiple of 5): the wrong answers are other
 * 5 c steps whatever their digit count (5 c → 10 c and 15 c; 10 c → 5 c and 15 c), never 4 c or 6 c, which no coin step
 * gives; when that leaves no two, the same-length rule as everywhere else
 */
function steps5(A, c, fits, rank, what, scale) {
  if (scale === 5 && A <= 20) {
    try { return pickTwo(A, [...c, A - 5, A + 5, A - 10, A + 10, A + 15], fits, rank, what, (v) => v % 5 === 0); } catch (e) { /* fall through */ }
  }
  return pickTwo(A, c, fits, rank, what);
}

/** the slips for one shopping question */
function shopSlips(p, scale, rank) {
  const A = p.answer, P = p.prices;
  const steps = [scale, -scale, 10, -10, 2 * scale, -2 * scale, 20, -20, 3 * scale, -3 * scale, 1, -1, 2, -2, 3, -3, 4, -4];   // the ±1..4 tail only for tiny answers (5 ¢ has no same-length step of 5)
  if (p.kind === 'total' || p.kind === 'total3') {
    const c = [];
    if (P.length > 2) for (const x of P) c.push(A - x);         // a price left out
    for (const s of steps) c.push(A + s);                       // one price misread by a step
    return pickTwo(A, c, (v) => v > Math.max(...P), rank, p.kind + ' ' + P.join('+'));
  }
  if (p.kind === 'change') {
    const c = [P[0]];                                           // the price written instead of the change
    for (const s of steps) c.push(A + s);
    return steps5(A, c, (v) => v < p.paid, rank, 'change ' + p.paid + '-' + P[0], scale);
  }
  if (p.kind === 'diff') {
    const c = [Math.min(...P)];                                 // the smaller price written instead of the difference
    for (const s of steps) c.push(A + s);
    return steps5(A, c, (v) => v < Math.max(...P), rank, 'diff ' + P.join('-'), scale);
  }
  throw new Error('money screen: no number slips for ' + p.kind);
}

/**
 * the yes / no card on screen: the question only. The printed frame goes on "… ? Circle yes or no. Write the total." in
 * every locale — on screen there is nothing to circle or write, so everything after the question mark is cut (and the
 * nowrap span the picture + "?" sit in is closed again).
 */
function questionOnly(html) {
  let depth = 0;
  for (let i = 0; i < html.length; i++) {
    if (html[i] === '<') {
      const end = html.indexOf('>', i);
      const tag = html.slice(i, end + 1);
      if (/^<span/.test(tag)) depth++;
      else if (tag === '</span>') depth--;
      i = end;
    } else if (html[i] === '?') {
      return html.slice(0, i + 1) + '</span>'.repeat(Math.max(0, depth));
    }
  }
  throw new Error('money screen: a yes / no question without "?": ' + html.slice(0, 80));
}

function item(attrs, top, opts) {
  return `<div data-lcs-item ${attrs} data-ws-content style="display:flex;flex-direction:column;align-items:center;gap:14px;width:${SCR_W}px;padding:14px 10px;background:#FFFDF8;border:2px solid #EFE4D2;border-radius:16px;box-sizing:border-box">${top}` +
    `<div style="display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap">${opts}</div></div>`;
}
function numChips(vals, answer, unit) {
  const long = unit.length > 3;
  return vals.map((v, j) => `<span class="ws-achip" data-lcs-opt="${j}" data-lcs-label="${v}"${v === answer ? ' data-lcs-correct="1"' : ''} style="width:196px;height:${OPT_H}px;box-sizing:border-box;font-size:40px;gap:8px;white-space:nowrap">` +
    `${v}<span style="font-size:${long ? 18 : 24}px">${esc(unit)}</span></span>`).join('');
}

/** a stable start for the rotation, from the page's own content (so 2-card pages do not always ask ranks 1 and 0) */
const offsetOf = (s) => { let h = 0; for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) >>> 0; return h % ROT.length; };

function screenOrKey(mode, built, ctx, loc) {
  const out = { bodyHtml: built.bodyHtml, meta: built.meta };
  const lang = (loc || 'en').slice(0, 2);
  if (ctx.interactive) {
    let items;
    const off = offsetOf(JSON.stringify(built.meta || {}));
    const sig = JSON.stringify(built._purses || built._probs || built.meta || {}).slice(0, 400) + '|';   // the page joins every rank hash
    // the answer's RANK (smallest / middle / largest) is drawn fairly among the ranks this card can take, and its SLOT is
    // dealt evenly over the page, separately (2026-10-06: with the amounts in ascending order the slot WAS the rank, and a
    // card kind that cannot take one rank — 5 c change has no two smaller amounts — tied a rank to a card position)
    // A card whose answer is tiny can only be the SMALLEST (5 c change: every other 5 c step is larger); the page's free
    // cards then lean away from "smallest" so the page's ranks still come out even. Each card draws on its own (a dealt,
    // no-repeat order on 2-3 card pages fed the rotation strategies). The slot is a fair draw per card, apart from the rank.
    let W = [1, 1, 1];
    const pageWeights = (feasList) => {
      const m = feasList.length, forced = [0, 0, 0];
      for (const fz of feasList) { const ok = [0, 1, 2].filter((r) => fz[r]); if (ok.length === 1) forced[ok[0]]++; }
      const free = feasList.filter((fz) => fz.filter(Boolean).length > 1).length || 1;
      W = forced.map((c) => Math.max(0.05, (m / 3 - c) / free));
    };
    const rankOf = (key) => (feas) => {
      const ok = [0, 1, 2].filter((r) => feas[r]);
      if (!ok.length) return 0;
      const tot = ok.reduce((a, r) => a + W[r], 0);
      let x = (require('crypto').createHash('sha1').update(sig + key + '|rank').digest().readUInt32LE(0) / 4294967296) * tot;
      for (const r of ok) { if ((x -= W[r]) < 0) return r; }
      return ok[ok.length - 1];
    };
    const feasOf = (fn) => { let got = [true, true, true]; try { fn((fz) => { got = fz; return 0; }); } catch (e) { /* the real call reports it */ } return got; };
    const placed = (slips, answer, key) => { const w = slotFor(sig + key + '|swap', 2) ? slips.slice().reverse() : slips.slice(); w.splice(slotFor(sig + key + '|slot', 3), 0, answer); return w; };
    if (mode === 'count') {
      const P = built._purses;
      if (!P || !P.length) throw new Error('money screen: the page has no purses');
      pageWeights(P.map((p) => feasOf((rk) => countSlips(p.values, p.denoms, rk))));
      items = P.map((p, i) => {
        const T = p.values.reduce((a, b) => a + b, 0);
        // the answer's rank (its place: the chips read in ascending order) is hashed from the card, never a rotation over i
        // (2026-10-06 guessability audit: smallest / middle / largest in turn is the same tell as slot i % 3)
        const vals = placed(countSlips(p.values, p.denoms, rankOf(p.values.join('+') + '|' + i)), T, p.values.join('+') + '|' + i);
        const top = `<div style="zoom:1.3;display:flex;justify-content:center;max-width:480px">${p.row}</div>`;
        return item(`data-lcs-word="${i + 1}" data-lcs-q="${p.values.join('+')}"`, top, numChips(vals, T, p.unit));
      });
    } else if (mode === 'purse') {
      const R = built._rows;
      if (!R || !R.length) throw new Error('money screen: the page has no purse pairs');
      items = R.map((r, i) => {
        const opts = ['left', 'right'].map((side, j) => {
          const vals = r[side].values, more = r.more === side;
          return `<span class="ws-achip" data-lcs-opt="${j}" data-lcs-label="${vals.join('+')}"${more ? ' data-lcs-correct="1"' : ''} style="width:300px;height:auto;min-height:150px;padding:12px;box-sizing:border-box">${r[side].row}</span>`;
        }).join('');
        return item(`data-lcs-word="${i + 1}" data-lcs-q="${r.left.values.join('+')}|${r.right.values.join('+')}"`, '', opts);
      });
    } else {
      const P = built._probs;
      if (!P || !P.length) throw new Error('money screen: the page has no shopping questions');
      const bank = SHOP_FRAMES[lang];
      pageWeights(P.filter((p) => p.kind !== 'canBuy').map((p) => feasOf((rk) => shopSlips(p, p.scale, rk))));
      items = P.map((p, i) => {
        let opts, q;
        if (p.kind === 'canBuy') {
          q = `canBuy:${p.money}:${p.prices.join('+')}`;
          opts = [['yes', bank.yes], ['no', bank.no]].map(([k, w], j) => `<span class="ws-achip" data-lcs-opt="${j}" data-lcs-label="${esc(w)}"${(k === 'yes') === (p.money >= p.answer) ? ' data-lcs-correct="1"' : ''} style="width:200px;height:${OPT_H}px;box-sizing:border-box;font-size:38px">${esc(w)}</span>`).join('');
        } else {
          q = p.kind === 'change' ? `change:${p.coins.join('+')}-${p.prices[0]}` : p.kind === 'diff' ? `diff:${p.prices.join('-')}` : `total:${p.prices.join('+')}`;
          const vals = placed(shopSlips(p, p.scale, rankOf(JSON.stringify(p) + '|' + i)), p.answer, JSON.stringify(p) + '|' + i);
          opts = numChips(vals, p.answer, p.unit);
        }
        const top = `<p style="font-family:'Nunito';font-weight:800;font-size:22px;line-height:1.5;color:#3A3530;margin:0;text-align:center" data-lcs-sentence>${p.kind === 'canBuy' ? questionOnly(p.sentence) : p.sentence}</p>${p.extra || ''}`;
        return item(`data-lcs-word="${i + 1}" data-lcs-q="${esc(q)}"`, top, opts);
      });
      items.unshift(`<div class="ws-card" style="width:${SCR_W}px;padding:12px 10px 8px;align-items:center;box-sizing:border-box">${built._shelf}</div>`);
    }
    out.bodyHtml = `<div data-ws-content data-lcs-type="money" data-lcs-screen="${mode}" style="flex:1;display:flex;flex-direction:column;gap:14px;align-items:center;padding-top:10px">${items.join('')}</div>`;
    return out;
  }
  // the answer key: every answer box carries its answer, written centred in the box; the richer purse and the right
  // yes / no are ringed
  const h = out.bodyHtml.split('class="ws-answerbox"').join('class="ws-answerbox" data-lcs-gapbox');
  const css = [
    `[data-lcs-gapbox]{position:relative}`,
    `[data-lcs-gapbox]::after{content:attr(data-lcs-answer);position:absolute;top:0;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center;font:700 26px 'Baloo 2',cursive;color:${CORAL}}`,
    `[data-lcs-more="left"] [data-lcs-purse="left"],[data-lcs-more="right"] [data-lcs-purse="right"]{border:4px solid ${CORAL} !important}`,
    `[data-lcs-choice][data-lcs-correct]{outline:4px solid ${CORAL};outline-offset:3px}`,
  ];
  out.bodyHtml = h + `<style data-lcs-key>${css.join('')}</style>`;
  return out;
}

/** the robot's oracle: the option that answers the item's question, computed here from the coins and prices */
function oracle(mode, items, locale) {
  const sum = (s) => s.split('+').map(Number).reduce((a, b) => a + b, 0);
  return items.map((it) => {
    const q = (it.meta || {})['data-lcs-q'] || '';
    const L = it.options.map((o) => String(typeof o === 'object' ? o.label : o));
    let want, m;
    if (mode === 'purse') {
      const [a, b] = q.split('|');
      if (!a || !b || sum(a) === sum(b)) throw new Error(`money oracle: cannot read "${q}"`);
      want = sum(a) > sum(b) ? a : b;
    } else if (mode === 'count') {
      if (!/^\d+(\+\d+)*$/.test(q)) throw new Error(`money oracle: cannot read "${q}"`);
      want = String(sum(q));
    } else if ((m = /^total:(\d+(?:\+\d+)+)$/.exec(q))) want = String(sum(m[1]));
    else if ((m = /^change:(\d+(?:\+\d+)*)-(\d+)$/.exec(q))) want = String(sum(m[1]) - +m[2]);
    else if ((m = /^diff:(\d+)-(\d+)$/.exec(q))) want = String(Math.abs(+m[1] - +m[2]));
    else if ((m = /^canBuy:(\d+):(\d+\+\d+)$/.exec(q))) { const b = SHOP_FRAMES[(locale || 'en').slice(0, 2)]; want = +m[1] >= sum(m[2]) ? b.yes : b.no; }
    else throw new Error(`money oracle: cannot read "${q}"`);
    const hits = L.map((l, i) => (l === want ? i : -1)).filter((i) => i >= 0);
    if (hits.length !== 1) throw new Error(`money oracle: ${q}: ${hits.length} options are ${want} (${L.join(', ')})`);
    return hits[0];
  });
}

function interactiveFor(mode) {
  return {
    kind: 'tap-choice', item: '[data-lcs-item]', option: '[data-lcs-opt]', answerAttr: 'data-lcs-correct', labelAttr: 'data-lcs-word',
    metaAttrs: ['data-lcs-q'], instructionKey: mode, screenHeight: 9000,
    oracle: (items, locale) => oracle(mode, items, locale),
  };
}

module.exports = { screenOrKey, oracle, interactiveFor, countSlips, shopSlips };
