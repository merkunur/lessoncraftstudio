/**
 * days-and-months-screen.js — Level Set 2026-10-06 (Days and Months, PDF + interactive): the SCREEN version and the
 * ANSWER KEY of a built K-321 page (the base or one of its five variations), plus the robot's INDEPENDENT oracle.
 * The builder hands over `_ans` (outside meta). New pages only — the published page never reaches this module.
 *
 *   order (K-321, G1-320)  tap-order: one card per name still to number, the printed ranks shown as they are on the
 *                          page; each tap writes the next OPEN rank (ctx.ranksFromAnswers). Oracle: the rank of each
 *                          label in the locale's week (from its first day) / year, from data/b2/calendar.js.
 *   gaps (K-337)           tap-choice: the week ladder; every missing rung is a card with three names (the missing
 *                          day + other missing days, then the printed neighbours). Oracle: the day at that rung.
 *   neighbours (G1-319/321) tap-choice: one card per blank — the given name with the asked side marked; three options
 *                          (the answer, the OTHER neighbour — the classic slip — and the name two away). Oracle: the
 *                          shown name ± 1 in the cycle.
 *   abbrev (G1-322)        tap-choice: one card per short form, three full names from the page (a name sharing the
 *                          first letter first — the real confusion). Oracle: the name that short form stands for.
 * The right option never keeps one place: its slot rotates card by card (0, 1, 2 …).
 *
 *   key: base — every answer box carries its rank, centred (the gap-box rule); gaps / neighbours — the name seated on
 *        its writing row (lib/key-on-row.js, measured); abbrev — the same coral number on both ends of each pair.
 */
'use strict';
const { CALENDAR } = require('../data/b2/calendar.js');
const { seatOnRow } = require('./key-on-row.js');
const { answerSlots: slots } = require('./answer-slots.js');

const CORAL = '#F2784B', INK = '#1F2B2A', CREAM = '#FBF3E4', CREAM_DEEP = '#F0E4CB', TEAL = '#146B5E', TEAL_SOFT = '#D6EDE8';
const SCR_W = 660, OPT_H = 96;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const mod = (a, n) => ((a % n) + n) % n;

/** the printed names of a unit for a locale (pt days may print the bank's short forms) */
function textsOf(loc, unit) {
  const C = CALENDAR[loc];
  if (unit === 'months') return C.monthNames;
  let b = {};
  try { b = require('./b3-common.js').bank('days-and-months', loc) || {}; } catch (e) { b = {}; }
  return Array.isArray(b.dayShort) ? b.dayShort : C.dayNames;
}
const startOf = (loc, unit) => (unit === 'months' ? 0 : CALENDAR[loc].weekStart);
const nOf = (unit) => (unit === 'months' ? 12 : 7);

/** a fitting option font for the longest label of a card */
function optPx(labels, w, max = 30) {
  const longest = Math.max(...labels.map((x) => [...String(x)].length));
  return Math.max(18, Math.min(max, Math.floor((w - 24) / (0.6 * longest))));
}
function chips(opts, at, w = 200) {
  const px = optPx(opts, w);
  return `<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">` + opts.map((v, j) =>
    `<span class="ws-achip" data-lcs-opt="${j}" data-lcs-label="${esc(v)}"${j === at ? ' data-lcs-correct="1"' : ''} ` +
    `style="width:${w}px;height:${OPT_H}px;box-sizing:border-box;font-size:${px}px;white-space:nowrap">${esc(v)}</span>`).join('') + `</div>`;
}
const card = (attrs, inner) => `<div data-lcs-item ${attrs} data-ws-content style="display:flex;flex-direction:column;align-items:center;gap:12px;width:${SCR_W}px;` +
  `padding:14px 10px;background:#FFFDF8;border:2px solid #EFE4D2;border-radius:16px;box-sizing:border-box">${inner}</div>`;
const tile = (text, px = 30, w = 0) => `<span style="display:inline-flex;align-items:center;justify-content:center;${w ? `width:${w}px;` : 'padding:0 18px;'}height:64px;box-sizing:border-box;` +
  `background:${CREAM};border:2px solid ${CREAM_DEEP};border-radius:12px;font-family:'Baloo 2',cursive;font-weight:700;font-size:${px}px;color:${INK};white-space:nowrap">${esc(text)}</span>`;
const blank = (asked, w = 0) => `<span style="display:inline-flex;align-items:center;justify-content:center;${w ? `width:${w}px;` : 'width:150px;'}height:64px;box-sizing:border-box;` +
  `border:3px dashed ${asked ? CORAL : '#D9CBB4'};border-radius:12px;font-family:'Baloo 2',cursive;font-weight:700;font-size:34px;color:${CORAL}">${asked ? '?' : ''}</span>`;
const head = (t) => `<span style="font-family:'Baloo 2',cursive;font-weight:700;font-size:20px;color:#5A6B68">${esc(t || '')}</span>`;

/** three distinct options with the answer at `at` */
function place(answer, wrong, at) {
  const o = [...new Set(wrong.filter((x) => x !== answer))].slice(0, 2);
  if (o.length < 2) throw new Error(`days-and-months screen: only ${o.length} wrong options for "${answer}"`);
  o.splice(at % 3, 0, answer);
  return o;
}

/* ------------------------------------------------------------------ screens */
function orderScreen(A) {
  const rows = A.items.map((it) => {
    const name = `<span style="flex:1;display:flex;align-items:center;justify-content:center;height:96px;background:${CREAM};border:2px solid ${CREAM_DEEP};border-radius:14px;` +
      `font-family:'Baloo 2',cursive;font-weight:700;font-size:34px;color:${INK};white-space:nowrap">${esc(it.text)}</span>`;
    if (it.given) {
      return `<div data-lcs-keep style="display:flex;align-items:center;gap:16px;width:${SCR_W}px;padding:6px 10px;box-sizing:border-box">` +
        `<span style="display:inline-flex;align-items:center;justify-content:center;width:88px;height:88px;box-sizing:border-box;background:${TEAL_SOFT};border:3px solid ${TEAL};` +
        `border-radius:50%;font-family:'Baloo 2',cursive;font-weight:700;font-size:34px;color:${INK}">${it.given}</span>${name}</div>`;
    }
    return `<div data-lcs-word="${esc(it.text)}" data-lcs-rank="${it.answer}" style="display:flex;align-items:center;gap:16px;width:${SCR_W}px;padding:6px 10px;box-sizing:border-box;` +
      `border:2px solid #EFE4D2;border-radius:16px;background:#FFFDF8">` +
      `<span data-lcs-rank-slot style="display:inline-block;width:88px;height:88px;box-sizing:border-box;border:3px dashed ${CORAL};border-radius:50%"></span>${name}</div>`;
  });
  return `<div data-ws-content data-lcs-screen="order" style="flex:1;display:flex;flex-direction:column;gap:10px;align-items:center;padding-top:4px">${rows.join('')}</div>`;
}

function gapsScreen(A) {
  const missing = A.rungs.filter((r) => r.gap).map((r) => r.day);
  const at = slots(missing.length, 'gaps|' + A.rungs.map((r) => r.day + (r.gap ? '?' : '')).join(','));
  let k = 0;
  const rows = A.rungs.map((r, i) => {
    if (!r.gap) return `<div data-lcs-keep style="display:flex;justify-content:center;width:${SCR_W}px">${tile(r.text, 32, SCR_W - 40)}</div>`;
    const prev = A.rungs[i - 1], next = A.rungs[i + 1];
    // one OTHER missing day (a different one per card) + a printed neighbour or the day two away — never the same
    // three names on every card (then the k-th gap is simply the k-th option)
    const others = missing.filter((d) => d !== r.day);
    const other = others.length ? [others[k % others.length]] : [];
    const wrong = [...other, ...[prev, next].filter((x) => x && !x.gap).map((x) => x.day), mod(r.day + 2, A.N), mod(r.day - 2, A.N)];
    const opts = place(A.texts[r.day], wrong.map((d) => A.texts[d]), at[k++]);
    return card(`data-lcs-word="${i + 1}" data-lcs-rung="${i}" data-lcs-unit="days"`, chips(opts, opts.indexOf(A.texts[r.day])));
  });
  return `<div data-ws-content data-lcs-screen="gaps" style="flex:1;display:flex;flex-direction:column;gap:10px;align-items:center;padding-top:4px">${rows.join('')}</div>`;
}

function neighboursScreen(A) {
  const T = A.texts, N = A.N;
  const items = [];
  const nAsk = A.rows.reduce((n, r) => n + (r.inverse ? 1 : 2), 0);
  const at = slots(nAsk, 'nb|' + A.unit + '|' + A.rows.map((r) => r.t + (r.inverse ? 'i' : '')).join(','));
  let k = 0;
  A.rows.forEach((row) => {
    const t = row.t;
    const asks = row.inverse ? ['mid'] : ['left', 'right'];
    for (const role of asks) {
      // what the card SHOWS: the given name (normal row) or the left neighbour (reversed row: both neighbours printed)
      const shown = row.inverse ? mod(t - 1, N) : t;
      const answer = role === 'left' ? mod(t - 1, N) : role === 'right' ? mod(t + 1, N) : t;
      const wrong = role === 'left' ? [mod(t + 1, N), mod(t - 2, N)] : role === 'right' ? [mod(t - 1, N), mod(t + 2, N)] : [mod(t + 2, N), mod(t - 2, N)];
      const opts = place(T[answer], wrong.map((d) => T[d]), at[k++]);
      const cells = row.inverse
        ? [tile(T[mod(t - 1, N)], 26, 190), blank(true, 190), tile(T[mod(t + 1, N)], 26, 190)]
        : [role === 'left' ? blank(true, 190) : blank(false, 190), tile(T[t], 26, 190), role === 'right' ? blank(true, 190) : blank(false, 190)];
      const heads = `<div style="display:flex;gap:16px;justify-content:center">${[A.heads.left, A.heads.mid, A.heads.right].map((h) => `<span style="width:190px;text-align:center">${head(h)}</span>`).join('')}</div>`;
      items.push(card(`data-lcs-word="${items.length + 1}" data-lcs-unit="${A.unit}" data-lcs-role="${role}" data-lcs-shown="${shown}"`,
        heads + `<div style="display:flex;gap:16px;justify-content:center;align-items:center">${cells.join('')}</div>` + chips(opts, opts.indexOf(T[answer]))));
    }
  });
  return `<div data-ws-content data-lcs-screen="neighbours" style="flex:1;display:flex;flex-direction:column;gap:14px;align-items:center;padding-top:4px">${items.join('')}</div>`;
}

function abbrevScreen(A) {
  const T = A.texts;
  const onPage = A.pairs.flat();
  const at = slots(onPage.length, 'ab|' + A.unit + '|' + onPage.join(','));
  let k = 0;
  const items = onPage.map((x) => {
    const others = onPage.filter((y) => y !== x);
    // a wrong name sharing the first letter first (Mar / Mai, ma / mi), then the neighbours on the page
    const first = (s) => String(s)[0].toLocaleLowerCase();
    const same = others.filter((y) => first(T[y]) === first(T[x]));
    const near = others.slice().sort((a, b) => Math.abs(a - x) - Math.abs(b - x));
    const opts = place(T[x], [...same, ...near].map((y) => T[y]), at[k++]);
    return card(`data-lcs-word="${esc(A.abbr[x])}" data-lcs-abbr="${x}" data-lcs-unit="${A.unit}"`,
      `<span style="font-family:'Baloo 2',cursive;font-weight:700;font-size:44px;line-height:1.1;color:${INK}">${esc(A.abbr[x])}</span>` + chips(opts, opts.indexOf(T[x]), 200));
  });
  return `<div data-ws-content data-lcs-screen="abbrev" style="flex:1;display:flex;flex-direction:column;gap:14px;align-items:center;padding-top:4px">${items.join('')}</div>`;
}

/* ------------------------------------------------------------------ keys */
/** seat `text(answer)` on the first writing row after every element whose opening tag matches `re` (left to right) */
function seatAll(html, re, textOf) {
  const hits = [...html.matchAll(re)];
  let out = html;
  for (let i = hits.length - 1; i >= 0; i--) {
    const at = hits[i].index;
    const rel = out.slice(at).search(/<svg[^>]*data-lcs-prim="writing-row"/);
    if (rel < 0) throw new Error('days-and-months key: no writing row after ' + hits[i][0].slice(0, 60));
    const s = at + rel, e = out.indexOf('</svg>', s) + 6;
    out = out.slice(0, s) + seatOnRow(out.slice(s, e), textOf(hits[i]), { fill: CORAL, font: 'baloo2-700', em: 0.62 }) + out.slice(e);
  }
  return out;
}

function keyOf(built, A) {
  const h = built.bodyHtml;
  if (A.layout === 'order') {
    const css = `[data-lcs-gapbox]{position:relative}[data-lcs-gapbox]::after{content:attr(data-lcs-answer);position:absolute;top:0;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center;font:700 28px 'Baloo 2',cursive;color:${CORAL}}`;
    return h.split('class="ws-answerbox"').join('class="ws-answerbox" data-lcs-gapbox') + `<style data-lcs-key>${css}</style>`;
  }
  if (A.layout === 'gaps') return seatAll(h, /data-lcs-gap="1" data-lcs-answer="(\d+)"/g, (m) => A.texts[+m[1]]);
  if (A.layout === 'neighbours') return seatAll(h, /data-lcs-lane="(?:left|right|mid)" data-lcs-answer="(\d+)"/g, (m) => A.texts[+m[1]]);
  // abbrev: pair number k on both ends (left in page order)
  let out = h, k = 0;
  const num = {};
  out = out.replace(/data-lcs-abbr="(\d+)"/g, (m, x) => { num[x] = ++k; return `${m} data-lcs-keyn="${k}"`; });
  out = out.replace(/data-lcs-name="(\d+)"/g, (m, x) => `${m} data-lcs-keyn="${num[x]}"`);
  const css = `[data-lcs-keyn]::before{content:attr(data-lcs-keyn);position:absolute;top:-11px;left:-11px;width:24px;height:24px;border-radius:50%;background:${CORAL};` +
    `color:#fff;font:700 15px/24px 'Baloo 2',cursive;text-align:center}`;
  return out + `<style data-lcs-key>${css}</style>`;
}

function screenOrKey(built, ctx, loc) {
  const A = built._ans;
  if (!A || !A.layout) throw new Error('days-and-months screen: no answer data');
  const out = { bodyHtml: built.bodyHtml, meta: built.meta };
  if (ctx.interactive) {
    out.bodyHtml = A.layout === 'order' ? orderScreen(A) : A.layout === 'gaps' ? gapsScreen(A) : A.layout === 'neighbours' ? neighboursScreen(A) : abbrevScreen(A);
    return out;
  }
  out.bodyHtml = keyOf(built, A);
  return out;
}

/* ------------------------------------------------------------------ oracles (independent of the page's answers) */
function orderOracle(labels, loc) {
  const ranks = labels.map((w) => {
    for (const unit of ['days', 'months']) {
      const T = textsOf(loc, unit), N = nOf(unit), s = startOf(loc, unit);
      const i = T.indexOf(w);
      if (i >= 0) return mod(i - s, N) + 1;
    }
    throw new Error(`days-and-months oracle: "${w}" is no ${loc} day or month`);
  });
  return ranks.map((r, i) => ({ r, i })).sort((a, b) => a.r - b.r).map((x) => x.i);
}

function choiceOracle(items, loc) {
  return items.map((it) => {
    const M = it.meta || {};
    const unit = M['data-lcs-unit'];
    const T = textsOf(loc, unit), N = nOf(unit), s = startOf(loc, unit);
    let want;
    if (M['data-lcs-rung'] != null && M['data-lcs-rung'] !== '') want = T[mod(s + +M['data-lcs-rung'], N)];
    else if (M['data-lcs-role']) {
      const shown = +M['data-lcs-shown'], role = M['data-lcs-role'];
      want = T[role === 'left' ? mod(shown - 1, N) : mod(shown + 1, N)];   // mid: the shown LEFT neighbour + 1
    } else if (M['data-lcs-abbr'] != null) {
      const C = CALENDAR[loc];
      const ab = unit === 'months' ? C.monthAbbr : C.dayAbbr;
      const label = it.label;
      const x = ab.indexOf(label);
      if (x < 0 || x !== +M['data-lcs-abbr']) throw new Error(`days-and-months oracle: short form "${label}" is not ${loc} ${unit} ${M['data-lcs-abbr']}`);
      want = T[x];
    } else throw new Error('days-and-months oracle: an item with no question stamps');
    const L = it.options.map((o) => (typeof o === 'object' ? o.label : o));
    const hits = L.map((l, i) => (l === want ? i : -1)).filter((i) => i >= 0);
    if (hits.length !== 1) throw new Error(`days-and-months oracle: ${hits.length} options are "${want}" (${L.join(', ')})`);
    return hits[0];
  });
}

function interactiveFor(layout) {
  if (layout === 'order') {
    return { kind: 'tap-order', item: '[data-lcs-word]', slot: '[data-lcs-rank-slot]', answerAttr: 'data-lcs-rank', labelAttr: 'data-lcs-word',
      instructionKey: 'order', ranksFromAnswers: true, screenHeight: 2400, oracle: (labels, l) => orderOracle(labels, (l || 'en').slice(0, 2)) };
  }
  const metaAttrs = { gaps: ['data-lcs-rung', 'data-lcs-unit'], neighbours: ['data-lcs-unit', 'data-lcs-role', 'data-lcs-shown'], abbrev: ['data-lcs-abbr', 'data-lcs-unit'] }[layout];
  if (!metaAttrs) throw new Error('days-and-months screen: layout ' + layout);
  return { kind: 'tap-choice', item: '[data-lcs-item]', option: '[data-lcs-opt]', answerAttr: 'data-lcs-correct', labelAttr: 'data-lcs-word',
    metaAttrs, instructionKey: layout, screenHeight: 4600, oracle: (items, l) => choiceOracle(items, (l || 'en').slice(0, 2)) };
}

module.exports = { screenOrKey, interactiveFor, orderOracle, choiceOracle, textsOf };
