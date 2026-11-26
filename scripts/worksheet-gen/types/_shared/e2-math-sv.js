/**
 * e2-math-sv.js — Batch SV (Daily Teaching System Stage E-2, 2026-11-26): the Swedish mathematics pages of the year design
 * (scripts/units/year/design.sv.math.json) that no existing type teaches:
 *   K-727  sv-rymmer     Vad rymmer mest?                                        (measurement; förskoleklass)
 *   G1-676 sv-enheter    Olika enheter ger olika tal                             (measurement; åk 1)
 *   G1-677 sv-skillnad   Subtraktion som skillnad: räkna upp                     (number-lines; åk 1)
 *   G3-647 sv-symboler   Talsymboler förr och nu                                 (base-ten; åk 3)
 *   G3-648 sv-rimligt    Är svaret rimligt?                                      (rounding; åk 3)
 *   G3-649 sv-mellanled  Skriftlig huvudräkning med mellanled                    (mental-math; åk 3)
 *   G3-651 sv-proportion Proportionella samband: dubbelt så många, dubbelt så mycket (number-charts; åk 3)
 *   G3-652 sv-halvcm     Mäta i halva centimeter och visa i diagram              (graphing-data; åk 3)
 * (G2-637 Meter och centimeter and G3-650 Äldre mått are sets of the DE-A measuring-table mode, e2-math.js.)
 * Each type is printed in Swedish only (`onlyLocales: ['sv']`; any other locale refuses at build). Themeless; PDF only.
 *
 * Built on the Batch K CSS and page check (dk-kinder.js) and the Batch 1 layout kit and one-answer check (dk-g1.js). None of
 * those files is edited; this file has its own modes, its own CSS and its own page check (svVerifyInPage). Gate:
 * qa/verify-e2-sv.js (with its PDF half qa/verify-e2-sv-pdf.py).
 *
 * Stamps (never printed): data-sv-answer on a box with ONE value; data-dk-answer on the choices of a one-answer group;
 * data-sv-record on a box that holds the child's own count or measurement (no key value: the key says so); data-sv-open
 * + data-sv-key on an item the child answers in its own words (the key gives what the answer must say); data-sv-alt on a
 * box whose task may also be written another right way (the key accepts it).
 */
'use strict';
const TOK = require('../../primitives/_tokens.js');
const DK = require('./dk-kinder.js');
const G = require('./dk-g1.js');
const A = require('./e2-math-sv-art.js');
const B = require('../../data/e2sv/e2-math-sv.js');

const T = TOK.color;
const W = 675;
const { box, col, row, lineBox, esc } = G.kit;
const MODES = {};
const MN = '−';   // the minus sign printed on the page
const LOC = 'sv';

/* ================================================================ the layout kit */
const SVCSS = `
.sv-t{display:block;box-sizing:border-box;font-family:'Nunito',sans-serif;font-weight:800;font-size:17px;line-height:22px;color:${T.ink};white-space:nowrap}
.sv-tw{display:block;box-sizing:border-box;font-family:'Nunito',sans-serif;font-weight:800;font-size:15px;line-height:19px;color:${T.ink};white-space:normal}
.sv-head{display:block;box-sizing:border-box;font-family:'Baloo 2',cursive;font-weight:700;font-size:18px;line-height:22px;color:${T.teal};white-space:nowrap}
.sv-big{display:block;font-family:'Baloo 2',cursive;font-weight:700;font-size:23px;line-height:27px;color:${T.ink};white-space:nowrap}
.sv-op{display:block;font-family:'Baloo 2',cursive;font-weight:700;font-size:22px;line-height:26px;color:${T.coral};white-space:nowrap}
.sv-badge{display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;flex-shrink:0;width:26px;height:26px;border-radius:50%;background:${T.teal};font-family:'Baloo 2',cursive;font-weight:700;font-size:15px;line-height:19px;color:#FFFFFF}
.sv-pick{box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center;border:2.5px solid ${T.teal};border-radius:999px;background:#FFFFFF;padding:2px 12px;font-family:'Nunito',sans-serif;font-weight:800;font-size:16px;line-height:21px;color:${T.ink};white-space:nowrap}
.sv-cell{box-sizing:border-box;display:flex;align-items:center;justify-content:center;flex-shrink:0;border-right:1.5px solid ${T.grid};padding:2px 4px;font-family:'Baloo 2',cursive;font-weight:700;font-size:21px;line-height:24px;color:${T.ink}}
.sv-th{box-sizing:border-box;display:flex;align-items:center;justify-content:center;flex-shrink:0;border-right:1.5px solid ${T.grid};padding:2px 6px;font-family:'Baloo 2',cursive;font-weight:700;font-size:15px;line-height:18px;color:${T.teal};white-space:nowrap}
.sv-roman{display:block;font-family:'Nunito',sans-serif;font-weight:900;font-size:24px;line-height:28px;letter-spacing:1.5px;color:${T.ink};white-space:nowrap}
`;
const t = (s, attrs = '', style = '', cls = 'sv-t') => `<span class="${cls}" data-dk-box${attrs ? ' ' + attrs : ''}${style ? ` style="${style}"` : ''}>${esc(s)}</span>`;
const tw = (s, w, attrs = '', style = '') => `<span class="sv-tw" data-dk-box${attrs ? ' ' + attrs : ''} style="width:${w}px${style ? ';' + style : ''}">${esc(s)}</span>`;
const head = (s, attrs = '', style = '') => t(s, attrs, style, 'sv-head');
const big = (s, attrs = '', style = '') => t(s, attrs, style, 'sv-big');
const op = (s, style = '') => t(s, '', style, 'sv-op');
const badge = (s, attrs = '') => `<span class="sv-badge" data-dk-box${attrs ? ' ' + attrs : ''}>${esc(s)}</span>`;
/** a box to write ONE number in; the answer stamped (never printed) */
const ansBox = (w, h, answer, attrs = '') => box('ws-blankbox', w, h, '', `data-dk-numbox data-sv-answer="${esc(answer)}"${attrs ? ' ' + attrs : ''}`, 'display:block');
/** a box for the child's own number (a count, a measurement): no answer */
const freeBox = (w, h, attrs = '') => box('ws-blankbox', w, h, '', `data-dk-numbox data-sv-record="1"${attrs ? ' ' + attrs : ''}`, 'display:block');
const card = (inner, w, h, attrs = '', style = '') => box('dk-tile', w, h, inner, attrs, style);
const white = (inner, w, h, attrs = '', style = '') => box('dk-tile dk-tile--white', w, h, inner, attrs, style);
const art = (s, attrs = '') => `<div data-dk-box${attrs ? ' ' + attrs : ''} style="line-height:0;flex-shrink:0">${s}</div>`;
const src = (p) => require('../../image-cache/resolve.js').fileUri(p[0], p[1]);   // looked up at build time only (the server has no cache)
const pic = (p, px, attrs = '') => `<img class="ws-icon" src="${src(p)}" alt="" data-dk-box data-sv-pic="${esc(p.join('/'))}"${attrs ? ' ' + attrs : ''} style="width:${px}px;height:${px}px;display:block;object-fit:contain;flex-shrink:0">`;
const rint = (rng, a, b) => a + Math.floor(rng.next() * (b - a + 1));
/** a choice in a one-answer group (ring it) */
const pick = (s, right, attrs = '', style = '') => `<span class="sv-pick" data-dk-box data-sv-pick="${esc(s)}" data-dk-answer="${right ? 'right' : 'no'}"${attrs ? ' ' + attrs : ''}${style ? ` style="${style}"` : ''}>${esc(s)}</span>`;
const oneOf = (item, opts, right, gap = 8, style = '', chipStyle = '') => `<div class="dk-row" data-dk-item="${esc(item)}" data-g1-one="1" style="gap:${gap}px;${style}">` + opts.map((o) => pick(o, o === right, '', chipStyle)).join('') + '</div>';
/** a number sentence of parts: numbers, operators, answer boxes ({ box: value }) or record boxes ({ free: true }) */
function sentence(parts, o = {}) {
  const bw = o.bw || 44, bh = o.bh || 36, cls = o.small ? 'font-size:20px;line-height:24px' : '';
  return row(parts.map((p) => {
    if (p && typeof p === 'object' && 'box' in p) return ansBox(p.w || bw, bh, p.box, p.attrs || '');
    if (p && typeof p === 'object' && p.free) return freeBox(p.w || bw, bh, p.attrs || '');
    if (p === '+' || p === MN || p === '=') return op(p, cls);
    return big(String(p), '', cls);
  }).join(''), o.gap || 6, 'justify-content:flex-start;align-items:center' + (o.style ? ';' + o.style : ''));
}
/** a number as a Swedish class writes it: a space between thousands (1 000) */
const num = (n) => (Math.abs(n) >= 1000 ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : String(n));
const fill = (s, o) => s.replace(/\{(\w+)\}/g, (m, k) => (k in o ? o[k] : m));
function shuffleNot(rng, a, bad) { for (let k = 0; k < 50; k++) { const s = rng.shuffle(a.slice()); if (!bad(s)) return s; } return rng.shuffle(a.slice()); }

/* ================================================================ K-727 — Vad rymmer mest? */
/**
 * The containers (data/e2sv CONTAINERS) and what they hold. A pair compares two containers whose capacities differ at least
 * `ratio` times (level 1: 20, levels 2-3: 4), so a teacher accepts the answer at a glance; the row to number takes three
 * (four at level 3) containers, each at least 4 times the one before. Level 3 also asks for the one that holds LEAST.
 * Under it the class's own count: how many mugs filled the class's jar (a record, 2-10: no key value).
 * Review round 1: two containers meet (in a pair, or side by side in the row) only when the larger one's least by its
 * PICTURE (bank: seen) is at least twice the smaller one's most, so the sandhink-looking hink never meets a tekanna, a
 * kanna or a vattenkanna. The pool is drawn wider than its box (its empty top and bottom cut off) with a beach ball on
 * its water, so its size shows.
 */
const RYM_LV = {
  1: { most: 3, least: 0, ratio: 20, order: 3, px: 80, per: 3, opx: 120, jarH: 150 },
  2: { most: 4, least: 0, ratio: 4, order: 3, px: 90, per: 2, opx: 100, jarH: 118 },
  3: { most: 2, least: 2, ratio: 4, order: 4, px: 84, per: 2, opx: 90, jarH: 108 },
};
const capOf = (id) => B.CONTAINERS.find((c) => c.id === id).litres;
const ratioOf = (a, b) => Math.max(capOf(a), capOf(b)) / Math.min(capOf(a), capOf(b));
const SEEN_GAP = 2;
const seenOf = (id) => B.CONTAINERS.find((c) => c.id === id).seen;
/** the larger container's least (by its picture) at least SEEN_GAP times the smaller one's most */
const seenApart = (a, b) => { const [s, g] = capOf(a) < capOf(b) ? [a, b] : [b, a]; return seenOf(g)[0] / seenOf(s)[1] >= SEEN_GAP; };
/** a container's picture; the pool wider than its box (cut to its drawing) with a beach ball on its water */
const cpic = (c, px) => (c.prop
  ? `<div data-sv-cpic="${c.id}" style="position:relative;width:${px + 12}px;height:${px}px;flex-shrink:0;margin:0 -6px">${pic(c.pic, px).replace(`width:${px}px;height:${px}px;display:block;object-fit:contain`, `width:${px + 12}px;height:${px}px;display:block;object-fit:cover`)}` +
    `<img class="ws-icon" src="${src(c.prop)}" alt="" data-sv-prop="${esc(c.prop.join('/'))}" style="position:absolute;left:${Math.round((px + 12) * 0.43 - px * 0.085)}px;top:${Math.round(px * 0.47 - px * 0.085)}px;width:${Math.round(px * 0.17)}px;height:${Math.round(px * 0.17)}px;object-fit:contain"></div>`
  : pic(c.pic, px));
MODES['sv-rymmer'] = (d, rng) => {
  const lv = RYM_LV[d.level], X = B.TEXT.rymmer, C = B.CONTAINERS;
  const ids = C.map((c) => c.id);
  // the pairs: never the same pair twice, the right one on the left half the time
  const pairs = [];
  const want = Array.from({ length: lv.most }, () => 'most').concat(Array.from({ length: lv.least }, () => 'least'));
  const flip = rng.next() < 0.5 ? 1 : 0;
  const sides = rng.shuffle(want.map((_, i) => (i % 2) ^ flip));   // as many on the left as on the right (an odd one either way)
  want.forEach((kind, i) => {
    for (let tries = 0; ; tries++) {
      if (tries > 2000) throw new Error('retry: sv-rymmer pairs');
      const [p, q] = rng.shuffle(ids.slice()).slice(0, 2);
      if (ratioOf(p, q) < lv.ratio || !seenApart(p, q)) continue;
      if (pairs.some((x) => x.l === p || x.r === p || x.l === q || x.r === q)) continue;   // every container once in the pairs
      const big = capOf(p) > capOf(q) ? p : q, small = big === p ? q : p;
      const right = kind === 'most' ? big : small, other = right === big ? small : big;
      pairs.push(sides[i] ? { kind, l: other, r: right, right } : { kind, l: right, r: other, right });
      break;
    }
  });
  // the row to number: each at least 4 times the one before
  let order;
  for (let tries = 0; ; tries++) {
    if (tries > 2000) throw new Error('sv-rymmer: no row');
    const pickN = rng.shuffle(ids.slice()).slice(0, lv.order);
    const sorted = pickN.slice().sort((a, b) => capOf(a) - capOf(b));
    if (sorted.every((x, i) => i === 0 || (capOf(x) / capOf(sorted[i - 1]) >= 4 && seenApart(sorted[i - 1], x)))) { order = pickN; break; }
  }
  const ranks = Object.fromEntries(order.slice().sort((a, b) => capOf(a) - capOf(b)).map((x, i) => [x, i + 1]));
  const byId = (id) => C.find((c) => c.id === id);
  const choice = (id, right, px) => `<div class="dk-tile dk-tile--white" data-dk-box data-sv-pick="${id}" data-dk-answer="${right ? 'right' : 'no'}" style="flex-shrink:0;width:${px + 16}px;height:auto;padding:4px 2px 3px;flex-direction:column;gap:2px">${cpic(byId(id), px)}${t(byId(id).sv, `data-sv-word="${id}"`, 'font-size:15px;line-height:18px;text-align:center')}</div>`;
  const pairCard = (p, i, w, px) => card(`<div class="dk-row" data-dk-item="${p.kind}${i + 1}" data-g1-one="1" style="gap:${lv.per === 3 ? 12 : 34}px">${choice(p.l, p.right === p.l, px)}${choice(p.r, p.right === p.r, px)}</div>`,
    w, 'auto', `data-sv-pair="${i + 1}" data-sv-kind="${p.kind}" data-sv-l="${p.l}" data-sv-r="${p.r}"`, 'padding:6px 4px');
  const most = pairs.filter((p) => p.kind === 'most'), least = pairs.filter((p) => p.kind === 'least');
  const pairBlock = (list, label, startAt) => {
    const per = lv.per, w = Math.floor((W - (per - 1) * 10) / per), px = lv.px;
    const rows = [];
    for (let k = 0; k < list.length; k += per) rows.push(`<div class="dk-row" style="gap:10px;align-items:stretch;width:100%">${list.slice(k, k + per).map((p, j) => pairCard(p, startAt + k + j, w, px)).join('')}</div>`);
    return col(head(label) + rows.join(''), 6, 'align-items:flex-start;width:100%');
  };
  const partPairs = pairBlock(most, X.pairsHead, 0) + (least.length ? pairBlock(least, X.pairsHeadLeast, most.length) : '');
  const opx = lv.opx;
  const orderCells = order.map((id) => col(`<div class="dk-tile dk-tile--white" data-dk-box style="flex-shrink:0;width:${opx + 20}px;height:auto;padding:4px;flex-direction:column;gap:2px">${cpic(byId(id), opx)}${t(byId(id).sv, `data-sv-word="${id}"`, 'font-size:16px;line-height:19px;text-align:center')}</div>` + ansBox(48, 44, ranks[id], `data-sv-rank="${id}"`), 6)).join('');
  const partOrder = col(head(lv.order === 4 ? X.orderHead4 : X.orderHead3) + card(`<div class="dk-row" style="gap:${lv.order === 4 ? 26 : 44}px">${orderCells}</div>`, W, 'auto', `data-sv-order="${order.join(',')}"`, 'padding:8px 6px'), 6, 'align-items:flex-start;width:100%');
  // the class's jar: draw as many mugs as it took, write the number (a record: 2-10)
  const partJar = col(head(X.jarHead) + card(row(col(pic(B.JAR.pic, 76) + t(B.JAR.sv, '', 'font-size:15px;line-height:18px'), 2) +
    box('dk-draw', 410, lv.jarH, `<span class="sv-tw" style="position:absolute;left:12px;top:6px;font-size:14px;color:${T.inkSoft}">${esc(X.jarDraw)}</span>`, 'data-dk-draw data-sv-jardraw="1"') +
    col(freeBox(56, 52, 'data-sv-jarcount="1"') + t(X.jarWrite, '', 'font-size:16px'), 4), 14, 'justify-content:flex-start'), W, 'auto', 'data-sv-jar="1"', 'padding:8px 12px;justify-content:flex-start'), 6, 'align-items:flex-start;width:100%');
  const html = `<div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:12px;justify-content:space-between">${partPairs}${partOrder}${partJar}</div>`;
  return { html, meta: { pairs: pairs.map((p) => `${p.kind}:${p.l}|${p.r}=${p.right}`), order: order.map((id) => `${id}:${ranks[id]}`), items: pairs.map((p) => p.kind + ':' + p.right).concat(order) } };
};

/* ================================================================ G1-676 — Olika enheter ger olika tal */
/**
 * Each card: one thing measured twice, with two units laid end to end under it (klossar and gem; at levels 2-3 also
 * pinnar and klossar, pinnar and gem). The thing's length is a whole number of BOTH units (the drawing is exact: the gate
 * measures it in the PDF), so the child never decides between two counts at a blurred edge. The child writes both counts
 * (2-20) and rings the unit it took most of: always the shorter unit, which at levels 2-3 is sometimes the kloss.
 * Level 3 ends with the rule in words: "Ju kortare enheten är, desto (fler / färre) går det åt."
 */
const ENH_LV = {
  1: { cards: 3, px: { kloss: 84, gem: 42 }, pairs: [['kloss', 'gem']], maxSmall: 10, maxL: 420 },
  2: { cards: 4, px: { kloss: 42, gem: 28, pinne: 84 }, pairs: [['kloss', 'gem'], ['pinne', 'kloss']], cardPairs: [0, 0, 1, 1], maxSmall: 18, maxL: 504 },
  3: { cards: 4, px: { kloss: 42, gem: 28, pinne: 84 }, pairs: [['kloss', 'gem'], ['pinne', 'kloss'], ['pinne', 'gem']], cardPairs: [0, 1, 1, 2], maxSmall: 18, maxL: 504, why: true },
};
const lcm = (a, b) => { const g = (x, y) => (y ? g(y, x % y) : x); return (a * b) / g(a, b); };
MODES['sv-enheter'] = (d, rng) => {
  const lv = ENH_LV[d.level], X = B.TEXT.enheter, U = B.UNITS_SV;
  // which pair each card uses: every pair of the level at least once
  // the pairs of the cards: at levels 2-3 the kloss is the shorter unit on half the cards (so "gem" is not the answer by habit)
  const pairIdx = rng.shuffle(lv.cardPairs ? lv.cardPairs.slice() : Array.from({ length: lv.cards }, (_, i) => i % lv.pairs.length));
  const things = rng.shuffle(B.MEASURE_THINGS.slice()).slice(0, lv.cards);
  const cards = [];
  const usedL = new Set();
  for (let i = 0; i < lv.cards; i++) {
    const [ub, us] = lv.pairs[pairIdx[i]];   // the longer unit, the shorter unit
    const pb = lv.px[ub], ps = lv.px[us], step = lcm(pb, ps);
    const th = things[i];
    const Ls = [];
    for (let L = step; L <= Math.min(lv.maxL, Math.max(th.max, step * 2)); L += step) if (L >= Math.min(112, th.min) && L / pb >= 2 && L / ps <= lv.maxSmall) Ls.push(L);
    const free = Ls.filter((L) => !usedL.has(L));
    const L = rng.pick(free.length ? free : Ls); usedL.add(L);
    const top = rng.next() < 0.5 ? ub : us;   // which unit's row lies first (the row order tells nothing)
    cards.push({ th, L, ub, us, top, nb: L / pb, ns: L / ps });
  }
  const cardH = [];
  const html = cards.map((c, i) => {
    const rowsU = c.top === c.ub ? [[c.ub, c.nb], [c.us, c.ns]] : [[c.us, c.ns], [c.ub, c.nb]];
    const strip = A.measureStrip({ kind: c.th.draw, L: c.L, rows: rowsU.map(([u, n]) => ({ unit: u, n, px: lv.px[u] })), w: 528, th: c.th.draw === 'book' ? 52 : d.level === 1 ? 30 : 26, gap: c.th.draw === 'book' ? 7 : 9, x0: 10 });   // review round 1: the book from above
    const counts = rowsU.map(([u, n]) => row(ansBox(50, 40, n, `data-sv-count="${u}"`) + t(U[u].many, '', 'font-size:17px'), 6)).join('');
    const mostRow = row(t(X.most, '', 'font-size:16px') + oneOf('most' + (i + 1), rowsU.map(([u]) => U[u].many), U[c.us].many, 10), 8);
    const name = c.th.sv[0].toUpperCase() + c.th.sv.slice(1);
    return card(col(row(col(badge(String(i + 1)) + t(name, `data-sv-thingname="${c.th.id}"`, 'font-size:16px;color:' + T.teal), 3, 'align-items:flex-start;width:96px') + art(strip, `data-sv-strip="${i + 1}"`), 4, 'justify-content:flex-start;align-items:flex-start;width:100%') +
      row(counts + mostRow, 22, 'justify-content:flex-start;width:100%'), 3, 'align-items:flex-start;width:100%'),
    W, 'auto', `data-sv-card="${i + 1}" data-sv-thing="${c.th.id}" data-sv-len="${c.L}" data-sv-big="${c.ub}" data-sv-small="${c.us}"`, 'flex:1 1 0;min-height:0;padding:5px 10px;justify-content:flex-start');
  }).join('');
  let why = '';
  if (lv.why) why = white(row(t(X.why, '', 'font-size:17px') + oneOf('why', X.whyChoices, X.whyChoices[0], 10) + t(X.whyEnd, '', 'font-size:17px'), 10, 'justify-content:flex-start'), W, 'auto', 'data-sv-why="1"', 'padding:8px 14px;flex-shrink:0;justify-content:flex-start');
  void cardH;
  return { html: `<div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:8px">${html}</div>` + why, meta: { cards: cards.map((c) => `${c.th.id}:${c.L}:${c.nb} ${c.ub}/${c.ns} ${c.us}`), items: cards.map((c) => `${c.ub}-${c.us}:${c.nb}/${c.ns}`) } };
};

/* ================================================================ G1-677 — Subtraktion som skillnad: räkna upp */
/**
 * Two numbers close together within 20 (the difference 2-4 / 2-5 / 2-5): the child counts up from the smaller to the
 * larger and writes the jump, the subtraction b − a = _ and the addition that belongs to it, a + _ = b. Every blank is
 * the difference. Level 1: every number labelled, both numbers marked, the jump drawn; level 2: only 0, 5, 10, 15, 20
 * labelled; level 3: the task printed, the child marks both numbers and draws the jump itself (0, 10, 20 labelled).
 * Each page has tasks that pass 10 (räkna uppåt till 10, sedan vidare) and tasks that do not.
 */
const SKI_LV = {
  1: { tasks: 4, labels: 'all', marks: true, arc: true, diff: [2, 4], cross: 2 },
  2: { tasks: 5, labels: 'fives', marks: true, arc: true, diff: [2, 5], cross: 3 },
  3: { tasks: 5, labels: 'ends', marks: false, arc: false, diff: [2, 5], cross: 3 },
};
MODES['sv-skillnad'] = (d, rng) => {
  const lv = SKI_LV[d.level], X = B.TEXT.skillnad;
  let tasks;
  for (let round = 0; ; round++) {
    if (round > 200) throw new Error('sv-skillnad: no tasks');
    tasks = [];
    const crossFlags = rng.shuffle(Array.from({ length: lv.tasks }, (_, i) => i < lv.cross));
    for (const cross of crossFlags) {
      for (let tries = 0; tries < 300; tries++) {
        const dd = rint(rng, lv.diff[0], lv.diff[1]), a = rint(rng, 3, 20 - dd), b = a + dd;
        if ((a < 10 && b > 10) !== cross) continue;
        if (a === 10 || b === 10) continue;   // a ten at either end: no counting up to the ten
        if (tasks.some((q) => q.a === a || q.b === b)) continue;
        tasks.push({ a, b, d: dd }); break;
      }
    }
    if (tasks.length === lv.tasks) break;
  }
  const html = tasks.map((q, i) => {
    const line = art(A.numberLine20({ a: q.a, b: q.b, labels: lv.labels, marks: lv.marks, arc: lv.arc, w: 610, h: 76 }), `data-sv-line="${i + 1}"`);
    const jump = row(t(X.jump) + ansBox(46, 38, q.d, 'data-sv-blank="jump"') + t(X.steps), 6);
    const sub = sentence([q.b, MN, q.a, '=', { box: q.d, attrs: 'data-sv-blank="sub"' }], { bw: 46, bh: 38, small: true });
    const add = sentence([q.a, '+', { box: q.d, attrs: 'data-sv-blank="add"' }, '=', q.b], { bw: 46, bh: 38, small: true });
    const task = '';
    const frames = d.level === 3 ? row(jump + sub + add, 26, 'justify-content:flex-start;width:100%') : row(jump + sub + add, 26, 'justify-content:flex-start;width:100%');
    return card(row(badge(String(i + 1)) + col((task ? row(task, 0, 'justify-content:flex-start;width:100%') : '') + line + frames, 2, 'align-items:flex-start'), 8, 'justify-content:flex-start;align-items:flex-start;width:100%'),
      W, 'auto', `data-sv-task-card="${i + 1}" data-sv-a="${q.a}" data-sv-b="${q.b}"`, 'flex:1 1 0;min-height:0;padding:4px 10px;justify-content:flex-start');
  }).join('');
  return { html: `<div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:7px">${html}</div>`, meta: { tasks: tasks.map((q) => `${q.b}-${q.a}=${q.d}`), items: tasks.map((q) => `${q.b}-${q.a}`) } };
};

/* ================================================================ G3-647 — Talsymboler förr och nu */
/**
 * The key (the Egyptian signs for 1, 10, 100 and 1 000; the Roman I, V, X; from level 2 "I före V eller X: ta bort 1"),
 * Egyptian numbers to write with our digits, Roman numbers to write with our digits, a number to write with Egyptian
 * signs, and "Varför behövde egyptierna ingen nolla?" (open: the key gives what the answer must say). Level 1: Egyptian up
 * to 400 without the lotus, Roman only by adding (no 4, no 9); level 2: Egyptian up to 1 000, Roman 1-30 with IV and IX;
 * level 3: also our numbers written in Roman numerals and two numbers written in Egyptian signs (one with a 0).
 */
const SYM_LV = {
  1: { egypt: 5, maxE: 399, digitMax: 5, roman: 5, romanSub: false, writeE: 1, toRoman: 0, why: 'starter' },
  2: { egypt: 5, maxE: 1000, digitMax: 6, roman: 5, romanSub: true, writeE: 1, toRoman: 0, why: 'lines' },
  3: { egypt: 4, maxE: 1000, digitMax: 7, roman: 3, romanSub: true, writeE: 2, toRoman: 2, why: 'lines' },
};
function roman(n) { let out = '', r = n; for (const [s, v] of B.ROMAN) while (r >= v) { out += s; r -= v; } return out; }
const digitsOf = (n) => String(n).split('').map(Number);
MODES['sv-symboler'] = (d, rng) => {
  const lv = SYM_LV[d.level], X = B.TEXT.symboler;
  // Egyptian numbers to read: different, at least one with a 0 inside (205, 130), at least one of two digits, at most
  // digitMax of one sign; level 2-3 may hold 1 000 (the lotus) once
  let eg;
  for (let tries = 0; ; tries++) {
    if (tries > 5000) throw new Error('retry: sv-symboler Egyptian numbers');
    eg = Array.from({ length: lv.egypt }, () => (lv.maxE === 1000 && rng.next() < 0.12 ? 1000 : rint(rng, 11, Math.min(lv.maxE, 999))));
    if (new Set(eg).size !== eg.length) continue;
    if (eg.some((n) => n !== 1000 && digitsOf(n).some((x) => x > lv.digitMax))) continue;
    if (!eg.some((n) => n >= 100 && n < 1000 && /0/.test(String(n).slice(1)))) continue;
    if (!eg.some((n) => n < 100)) continue;
    if (eg.filter((n) => n >= 100).length < 2) continue;
    if (eg.some((n) => A.egyptNumber(n, 23).w > 168)) continue;   // two cards a row
    break;
  }
  // Roman numbers to read (up to 30): level 1 only by adding; levels 2-3 at least two with IV or IX
  let ro;
  for (let tries = 0; ; tries++) {
    if (tries > 5000) throw new Error('retry: sv-symboler Roman numbers');
    ro = Array.from({ length: lv.roman }, () => rint(rng, 2, 30));
    if (new Set(ro).size !== ro.length) continue;
    const sub = ro.filter((n) => n % 10 === 4 || n % 10 === 9).length;
    if (!lv.romanSub ? sub : sub < Math.min(2, lv.roman - 1)) continue;
    if (!ro.some((n) => n >= 20)) continue;
    break;
  }
  // our numbers to write in Roman numerals (level 3): one with IV or IX
  const toR = [];
  while (toR.length < lv.toRoman) { const n = rint(rng, 11, 30); if (ro.includes(n) || toR.includes(n)) continue; if (toR.length === 0 && !(n % 10 === 4 || n % 10 === 9)) continue; toR.push(n); }
  // numbers to write in Egyptian signs: three digits, each 1-5 (a child draws them); level 3's second one with a 0
  const toE = [];
  while (toE.length < lv.writeE) {
    const zero = toE.length === 1;
    const n = zero ? 100 * rint(rng, 1, 4) + (rng.next() < 0.5 ? rint(rng, 1, 5) : 10 * rint(rng, 1, 5)) : 100 * rint(rng, 1, 4) + 10 * rint(rng, 1, 5) + rint(rng, 1, 5);
    if (eg.includes(n) || toE.includes(n)) continue;
    toE.push(n);
  }
  // the key
  const signs = B.EGYPT.slice().reverse().filter((e) => lv.maxE === 1000 || e.v < 1000);
  const egKey = row(signs.map((e) => col(art(A.egyptSign(e.draw, 30), `data-sv-keysign="${e.v}"`) + t('= ' + num(e.v), `data-sv-keyval="${e.v}"`, 'font-size:17px'), 2)).join(''), 18, 'justify-content:flex-start');
  const roKey = col(row([['I', 1], ['V', 5], ['X', 10]].map(([s, v]) => t(`${s} = ${v}`, `data-sv-keyroman="${s}"`, 'font-size:19px')).join(''), 14, 'justify-content:flex-start') +
    (lv.romanSub ? t(X.sub + '   ' + X.subEx, 'data-sv-keysub="1"', 'font-size:15px;color:' + T.inkSoft) : ''), 3, 'align-items:flex-start');
  // review round 1: the box is named "Nyckel" (the instruction says "Titta på nyckeln")
  const key = white(row(head(X.keyHead, 'data-sv-keyhead="1"', 'font-size:19px') + col(head(X.egypt, '', 'font-size:16px') + egKey, 3, 'align-items:flex-start;margin-left:14px') + col(head(X.roman, '', 'font-size:16px') + roKey, 3, 'align-items:flex-start;margin-left:auto'), 16, 'justify-content:flex-start;align-items:flex-start;width:100%'), W, 'auto', 'data-sv-key="1"', 'padding:6px 14px;flex-shrink:0;justify-content:flex-start');
  // 1. Egyptian -> our digits
  const egItems = eg.map((n, i) => { const g = A.egyptNumber(n, 23, `data-sv-egypt="${i + 1}"`); return card(row(badge(String.fromCharCode(65 + i)) + art(g.svg) + op('=') + ansBox(70, 38, n, `data-sv-read="egypt"`), 10, 'justify-content:flex-start'), 'auto', 'auto', `data-sv-egitem="${i + 1}" data-sv-val="${n}"`, 'padding:5px 10px;justify-content:flex-start'); });
  const part1 = col(head('1. ' + X.head1) + `<div class="dk-row" style="gap:10px;flex-wrap:wrap;row-gap:8px;justify-content:flex-start;width:100%">${egItems.join('')}</div>`, 4, 'align-items:flex-start;width:100%');
  // 2. Roman -> our digits
  const roItems = ro.map((n) => row(t(roman(n), `data-sv-romanval="${n}"`, '', 'sv-roman') + op('=') + ansBox(56, 38, n, 'data-sv-read="roman"'), 6));
  const part2 = col(head('2. ' + X.head2) + card(`<div class="dk-row" style="gap:22px;justify-content:flex-start;width:100%;flex-wrap:wrap;row-gap:6px">${roItems.join('')}</div>`, W, 'auto', 'data-sv-romans="1"', 'padding:6px 14px;justify-content:flex-start'), 4, 'align-items:flex-start;width:100%');
  // 3. our number -> Egyptian (drawn by the child) and (level 3) our number -> Roman (written)
  const drawW = toE.length === 2 ? 320 : W - 160;
  const part3 = col(head('3. ' + (toE.length > 1 ? X.head3pl : X.head3)) + `<div class="dk-row" style="gap:12px;justify-content:flex-start;width:100%">${toE.map((n) => card(row(big(num(n), `data-sv-towrite="${n}"`) + op('=') + box('dk-draw', drawW - 110, 58, '', `data-dk-draw data-sv-egdraw="${n}" data-sv-key="${esc(egyptKey(n))}"`), 10, 'justify-content:flex-start'), drawW, 'auto', '', 'padding:5px 10px;justify-content:flex-start')).join('')}</div>`, 4, 'align-items:flex-start;width:100%');
  const part4 = lv.toRoman ? col(head('4. ' + X.head4) + card(row(toR.map((n) => row(big(String(n), `data-sv-toroman="${n}"`) + op('=') + lineBox(140, 40) + `<span hidden data-sv-romankey="${roman(n)}"></span>`, 8)).join(''), 30, 'justify-content:flex-start'), W, 'auto', '', 'padding:4px 14px;justify-content:flex-start'), 4, 'align-items:flex-start;width:100%') : '';
  const qn = lv.toRoman ? 5 : 4;
  const whyKey = 'Svaret ska säga att varje egyptiskt tecken har sitt eget värde, var det än står: finns det inga tiotal ritar man inga tiotalstecken. I vårt positionssystem bestämmer siffrans plats värdet, så vi behöver nollan för att hålla platsen (som i 305).';
  const whyInner = lv.why === 'starter' ? col(G.kit.frameLine([X.because, 230], 36) + lineBox(W - 40, 36), 0, 'align-items:flex-start') : col(lineBox(W - 40, 36) + lineBox(W - 40, 36), 0, 'align-items:flex-start');
  const part5 = col(head(qn + '. ' + X.head5) + white(whyInner, W, 'auto', `data-sv-open="1" data-sv-key="${esc(whyKey)}"`, 'padding:2px 14px 6px;justify-content:flex-start'), 4, 'align-items:flex-start;width:100%');
  const html = key + `<div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:8px;justify-content:space-between">${part1}${part2}${part3}${part4}${part5}</div>`;
  return { html, meta: { egypt: eg, roman: ro, toEgypt: toE, toRoman: toR, items: eg.map(String).concat(ro.map(roman)) } };
};
/** the key for a number the child writes in Egyptian signs */
function egyptKey(n) {
  const k = [[1000, 'lotusblomma', 'lotusblommor'], [100, 'rep', 'rep'], [10, 'båge', 'bågar'], [1, 'streck', 'streck']];
  let r = n; const parts = [];
  for (const [v, sg, pl] of k) { const c = Math.floor(r / v); r -= c * v; if (c) parts.push(`${c} ${c === 1 ? sg : pl}`); }
  return `${num(n)} = ${parts.join(', ')} (i valfri ordning; inget tecken för 0)`;
}

/* ================================================================ G3-648 — Är svaret rimligt? */
/**
 * Finished calculations within 1 000, half of them wrong. The rule is printed: round both numbers to the nearest hundred
 * and calculate; an answer more than 100 from the överslag is orimligt. Review round 1: that rule is TRUE for every sum
 * and difference of two numbers (each rounding moves a number at most 50, so a right answer is never more than 100 from
 * its överslag; the gate proves it over every pair of three-digit numbers). The numbers are any three-digit numbers not
 * ending in 50; a right answer lies within 70 of its överslag, a wrong one at least 150 from it (a forgotten carry into the
 * hundreds, 100 too little, or a forgotten exchange from them, 100 too much), so the rule decides every item with room to
 * spare, and the same way as a child who works it out exactly. Every addition carries into the
 * hundreds and every subtraction exchanges from them, right or wrong (no surface tells which). Level 1: six additions;
 * level 2: three additions and three subtractions; level 3: the same and also the right answer (on EVERY item, so the box
 * tells nothing). Part 2: three everyday questions, one reasonable answer each.
 */
const RIM_LV = {
  1: { n: 6, ops: ['+', '+', '+', '+', '+', '+'], everyday: 3, rightBox: false },   // level 1: additions only (the page holds six)
  2: { n: 6, ops: ['+', '+', '+', MN, MN, MN], everyday: 3, rightBox: false },
  3: { n: 6, ops: ['+', '+', '+', MN, MN, MN], everyday: 3, rightBox: true },
};
const r100 = (n) => Math.round(n / 100) * 100;
const RIM_RIGHT = 70, RIM_WRONG = 150;   // right answers within 70 of the överslag, wrong ones at least 150 from it (the rule: 100)
function rimNumber(rng, lo, hi) { for (;;) { const n = rint(rng, lo, hi); if (n % 100 !== 50 && n % 100 !== 0) return n; } }
const carriesIntoHundreds = (a, b) => (a % 100) + (b % 100) >= 100;
const exchangesFromHundreds = (a, b) => (a % 100) < (b % 100);
MODES['sv-rimligt'] = (d, rng) => {
  const lv = RIM_LV[d.level], X = B.TEXT.rimligt;
  const ops = rng.shuffle(lv.ops.slice());
  // right / wrong: half and half, the wrong ones spread over plus and minus
  const kinds = shuffleNot(rng, ops.map((o, i) => (i % 2 ? 'wrong' : 'right')), () => false);
  const items = [];
  const seen = new Set();
  ops.forEach((o, i) => {
    for (let tries = 0; ; tries++) {
      if (tries > 5000) throw new Error('sv-rimligt: no item');
      let a, b;
      if (o === '+') { a = rimNumber(rng, 101, 799); b = rimNumber(rng, 101, 799); if (!carriesIntoHundreds(a, b)) continue; }
      else { a = rimNumber(rng, 301, 989); b = rimNumber(rng, 101, 689); if (!exchangesFromHundreds(a, b)) continue; }
      const tru = o === '+' ? a + b : a - b, est = o === '+' ? r100(a) + r100(b) : r100(a) - r100(b);
      if (tru < 200 || tru > 999 || est < 200) continue;
      const shown = kinds[i] === 'right' ? tru : o === '+' ? tru - 100 : tru + 100;
      if (shown < 100 || shown > 999 || shown % 100 === 0) continue;   // no answer ending in 00 (only right answers could, a tell)
      if (kinds[i] === 'right' ? Math.abs(shown - est) > RIM_RIGHT : Math.abs(shown - est) < RIM_WRONG) continue;
      const key = `${a}${o}${b}`; if (seen.has(key)) continue; seen.add(key);
      items.push({ a, b, o, tru, est, shown, kind: kinds[i] }); break;
    }
  });
  const ruleBox = white(col(row(head(X.ruleHead, '', 'font-size:16px') + t(X.rule1, 'data-sv-rule="1"', 'font-size:16px;line-height:20px'), 6, 'justify-content:flex-start') + t(X.rule2, 'data-sv-rule="2"', 'font-size:16px;line-height:20px'), 2, 'align-items:flex-start'), W, 'auto', 'data-sv-rulebox="1"', 'padding:5px 14px;flex-shrink:0;justify-content:flex-start;border:2.5px solid ' + T.teal);
  const cw = Math.floor((W - 10) / 2);
  const cards = items.map((q, i) => {
    const calc = big(`${num(q.a)} ${q.o} ${num(q.b)} = ${num(q.shown)}`, `data-sv-calc="${i + 1}"`, 'font-size:21px;line-height:24px');
    const over = row(t(X.over, '', 'font-size:15px') + sentence([{ box: r100(q.a), attrs: 'data-sv-over="a"', w: 54 }, q.o, { box: r100(q.b), attrs: 'data-sv-over="b"', w: 54 }, '=', { box: q.est, attrs: 'data-sv-over="est"', w: 58 }], { bh: 31, small: true, gap: 4 }), 6, 'justify-content:flex-start');
    const by = col(t(X.by, '', 'font-size:15px;line-height:18px') + oneOf('rim' + (i + 1), X.choices, q.kind === 'right' ? X.choices[0] : X.choices[1], 10, '', 'padding:0 12px;font-size:15px;line-height:20px'), 2, 'align-items:flex-start');
    const rb = lv.rightBox ? row(t(X.right, '', 'font-size:15px') + ansBox(64, 31, q.tru, 'data-sv-rightans="1"'), 6, 'justify-content:flex-start') : '';
    return card(col(row(badge(String.fromCharCode(65 + i)) + calc, 8, 'justify-content:flex-start') + over + by + rb, 4, 'align-items:flex-start'), cw, 'auto', `data-sv-item="${i + 1}" data-sv-kind="${q.kind}" data-sv-op="${q.o === '+' ? 'plus' : 'minus'}"`, 'padding:6px 10px;justify-content:flex-start;flex:1 1 0;min-height:0');
  });
  const rowsHtml = [];
  for (let k = 0; k < cards.length; k += 2) rowsHtml.push(`<div class="dk-row" style="gap:10px;align-items:stretch;width:100%;flex:1 1 0;min-height:0">${cards[k]}${cards[k + 1]}</div>`);
  // part 2: everyday questions
  const ev = rng.shuffle(B.EVERYDAY.slice()).slice(0, lv.everyday);
  const evHtml = ev.map((e, i) => row(tw(`${i + 1}. ${e.q}`, 352, '', 'font-size:15px;line-height:18px') + oneOf('ev-' + e.id, e.opts, e.opts[e.right], 6, 'margin-left:auto', 'font-size:14px;line-height:19px;padding:1px 8px'), 6, 'justify-content:flex-start;width:100%')).join('');
  const part2 = col(head(X.head2) + white(col(evHtml, 6, 'align-items:flex-start;width:100%'), W, 'auto', 'data-sv-everyday="1"', 'padding:6px 12px;justify-content:flex-start'), 4, 'align-items:flex-start;width:100%;flex-shrink:0');
  const html = ruleBox + `<div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:8px">${rowsHtml.join('')}</div>` + part2;
  return { html, meta: { items: items.map((q) => `${q.a}${q.o === '+' ? '+' : '-'}${q.b}=${q.shown}:${q.kind}`), everyday: ev.map((e) => e.id) } };
};

/* ================================================================ G3-649 — Skriftlig huvudräkning med mellanled */
/**
 * Three-digit addition and subtraction written horizontally with the mellanled of "talsorterna var för sig": the hundreds,
 * then the tens, then the ones, then the three part answers added. Level 1: no växling, the parts printed (300 + 200 =
 * _); level 2: additions without and with one växling (the ones or the tens make ten or more) and subtractions without,
 * the child writes each part (hundratal _ + _ = _); level 3: the short form 347 + 225 = _ + _ + _ = _, every addition with
 * one växling. Subtraction never needs a växling here: by talsorter it would give a negative part, which åk 3 does not
 * have; subtraction with växling is the column method's lesson later in the unit.
 */
const MEL_LV = {
  1: { kinds: ['+0', '+0', '+0', '-0', '-0', '-0'], form: 'printed' },
  2: { kinds: ['+0', '+e', '+t', '-0', '-0', '+e'], form: 'labelled' },
  3: { kinds: ['+e', '+e', '+t', '+t', '-0', '-0', '-0', '+e'], form: 'short' },
};
const dig3 = (n) => [Math.floor(n / 100), Math.floor(n / 10) % 10, n % 10];
function melTask(rng, kind) {
  for (;;) {
    const a = rint(rng, 111, 899), b = rint(rng, 111, 899);
    const [ah, at, ae] = dig3(a), [bh, bt, be] = dig3(b);
    if (!at || !ae || !bt || !be) continue;   // every part a real number (no 0 tens or ones)
    if (kind[0] === '+') {
      if (a + b > 999) continue;
      const eOver = ae + be >= 10, tOver = at + bt >= 10;
      if (kind === '+0' && (eOver || tOver)) continue;
      if (kind === '+e' && !(eOver && !tOver && at + bt + 1 < 10)) continue;   // one växling: the ones make 10 or more
      if (kind === '+t' && !(tOver && !eOver)) continue;                      // one växling: the tens make 100 or more
      return { a, b, o: '+', parts: [[100 * ah, 100 * bh, 100 * (ah + bh)], [10 * at, 10 * bt, 10 * (at + bt)], [ae, be, ae + be]], res: a + b };
    }
    if (!(ah > bh && at > bt && ae > be)) continue;   // no växling and no part 0
    return { a, b, o: MN, parts: [[100 * ah, 100 * bh, 100 * (ah - bh)], [10 * at, 10 * bt, 10 * (at - bt)], [ae, be, ae - be]], res: a - b };
  }
}
MODES['sv-mellanled'] = (d, rng) => {
  const lv = MEL_LV[d.level], X = B.TEXT.mellanled;
  const kinds = rng.shuffle(lv.kinds.slice());
  const tasks = [];
  for (const k of kinds) { for (let tries = 0; ; tries++) { const q = melTask(rng, k); if (tasks.some((p) => p.a === q.a || p.b === q.b)) continue; tasks.push({ ...q, kind: k }); break; } }
  const cardOf = (q, i) => {
    const headRow = row(badge(String.fromCharCode(65 + i)) + big(`${q.a} ${q.o} ${q.b}`, `data-sv-task="${i + 1}"`, 'font-size:22px'), 8, 'justify-content:flex-start');
    if (lv.form === 'short') {
      return card(row(badge(String.fromCharCode(65 + i)) + big(`${q.a} ${q.o} ${q.b} =`, `data-sv-task="${i + 1}"`, 'font-size:22px') + sentence([{ box: q.parts[0][2], attrs: 'data-sv-part="h"', w: 58 }, '+', { box: q.parts[1][2], attrs: 'data-sv-part="t"', w: 52 }, '+', { box: q.parts[2][2], attrs: 'data-sv-part="e"', w: 46 }, '=', { box: q.res, attrs: 'data-sv-res="1"', w: 64 }], { bh: 38, small: true, gap: 5 }), 8, 'justify-content:flex-start'),
        W, 'auto', `data-sv-mcard="${i + 1}" data-sv-kind="${q.kind}"`, 'padding:4px 10px;justify-content:flex-start;flex:1 1 0;min-height:0');
    }
    const rowsHtml = X.rows.map((lab, k) => {
      const [x, y, z] = q.parts[k], tag = 'hte'[k];
      const alt = q.o === '+' ? ` data-sv-alt="${y} + ${x} = ${z}"` : '';
      const parts = lv.form === 'printed' ? [x, q.o, y, '=', { box: z, attrs: `data-sv-part="${tag}"`, w: 56 }] : [{ box: x, attrs: `data-sv-part="${tag}x"${alt}`, w: 52 }, q.o, { box: y, attrs: `data-sv-part="${tag}y"`, w: 52 }, '=', { box: z, attrs: `data-sv-part="${tag}"`, w: 56 }];
      return row(t(lab, `data-sv-label="${tag}"`, 'font-size:15px;width:76px;color:' + T.teal) + sentence(parts, { bh: 32, small: true, gap: 4 }), 4, 'justify-content:flex-start');
    }).join('');
    const sumRow = row(t(X.answer, 'data-sv-label="s"', 'font-size:15px;width:76px;color:' + T.teal) + sentence([{ box: q.parts[0][2], attrs: 'data-sv-sum="h"', w: 46 }, '+', { box: q.parts[1][2], attrs: 'data-sv-sum="t"', w: 42 }, '+', { box: q.parts[2][2], attrs: 'data-sv-sum="e"', w: 36 }, '=', { box: q.res, attrs: 'data-sv-sum="s"', w: 54 }], { bh: 32, small: true, gap: 2 }), 4, 'justify-content:flex-start');
    return card(col(headRow + rowsHtml + sumRow, 4, 'align-items:flex-start'), Math.floor((W - 10) / 2), 'auto', `data-sv-mcard="${i + 1}" data-sv-kind="${q.kind}"`, 'padding:6px 8px;justify-content:flex-start;flex:1 1 0;min-height:0');
  };
  const cards = tasks.map(cardOf);
  let html;
  if (lv.form === 'short') html = `<div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:8px">${cards.join('')}</div>`;
  else { const rows = []; for (let k = 0; k < cards.length; k += 2) rows.push(`<div class="dk-row" style="gap:10px;align-items:stretch;width:100%;flex:1 1 0;min-height:0">${cards[k]}${cards[k + 1]}</div>`); html = `<div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:8px">${rows.join('')}</div>`; }
  return { html, meta: { tasks: tasks.map((q) => `${q.a}${q.o === '+' ? '+' : '-'}${q.b}=${q.res}:${q.kind}`), items: tasks.map((q) => q.kind) } };
};

/* ================================================================ G3-651 — Proportionella samband */
/**
 * Two price tables (every piece costs the same) and a recipe for 4 personer to work out for other numbers of people; all
 * tables proportional, every number within 0-200, every blank ONE value (the table gives the price of 1, or of 2 or 3
 * pieces, from which every other column follows). Level 1: the price of 1 given, 2-5 pieces; the recipe for 8; one
 * sentence (dubbelt så många -> dubbelt så mycket). Level 2: the price of 2 given, 1 (hälften), 4, 6, 8 pieces; the
 * recipe for 2 and 8; two sentences (dubbelt, hälften). Level 3: the price of 3 given, also a number of pieces to find
 * from its price; the recipe for 2, 8 and 12; the child writes in words what happens to the price for three times as
 * many (open: the key gives what the answer must say).
 */
const PRO_LV = {
  1: { given: 1, cols: [1, 2, 3, 4, 5], recipe: [8], sentences: ['double'], findCount: false, maxP: 12 },
  2: { given: 2, cols: [1, 2, 4, 6, 8], recipe: [2, 8], sentences: ['double', 'half'], findCount: false, maxP: 20 },
  3: { given: 3, cols: [1, 2, 3, 6, 9], cols2: [[1, 2, 3, 5, 7], [1, 2, 3, 4, 8], [1, 2, 3, 5, 10], [1, 2, 3, 6, 8]], recipe: [2, 8, 12], sentences: [], write: true, findCount: true, maxP: 20 },
};
MODES['sv-proportion'] = (d, rng) => {
  const lv = PRO_LV[d.level], X = B.TEXT.proportion;
  const fits = (it, cols) => it.unit.some((u) => u <= lv.maxP && u * Math.max(...cols) <= 200);
  const items = rng.shuffle(B.PRICE_ITEMS.filter((it) => fits(it, lv.cols) && (!lv.cols2 || lv.cols2.every((c) => fits(it, c))))).slice(0, 2);
  let tables = [];
  for (let round = 0; round < 50 && (round === 0 || tables[0].p === tables[1].p); round++) { tables = []; items.forEach((it, k) => {
    // level 3: in the second table the last column's NUMBER of pieces is left out (found from its price), its columns drawn
    const cols = lv.cols2 && k === 1 ? rng.pick(lv.cols2) : lv.cols;
    const okP = it.unit.filter((u) => u <= lv.maxP && u * Math.max(...cols) <= 200);
    const p = rng.pick(okP.filter((u) => !tables.some((tb) => tb.p === u)).length ? okP.filter((u) => !tables.some((tb) => tb.p === u)) : okP);   // two tables, two prices
    const findAt = lv.findCount && k === 1 ? cols.length - 1 : -1;
    tables.push({ it, p, findAt, cols });
  }); }
  const tableHtml = (tb, k) => {
    const { it, p, findAt, cols } = tb;
    const headW = 112, cellW = Math.floor((W - 26 - headW) / cols.length);
    const head1 = `<div class="sv-th" data-dk-box style="width:${headW}px;height:44px;justify-content:flex-start">${esc(X.count)}</div>` + cols.map((n, j) => `<div class="sv-cell" data-dk-box style="width:${cellW}px;height:44px${j === cols.length - 1 ? ';border-right:none' : ''}">${j === findAt ? ansBox(54, 34, n, 'data-sv-cell="count"') : n === lv.given ? `<span data-sv-given="count">${n}</span>` : `<span>${n}</span>`}</div>`).join('');
    const head2 = `<div class="sv-th" data-dk-box style="width:${headW}px;height:44px;justify-content:flex-start">${esc(X.price)}</div>` + cols.map((n, j) => `<div class="sv-cell" data-dk-box style="width:${cellW}px;height:44px${j === cols.length - 1 ? ';border-right:none' : ''}">${n === lv.given || j === findAt ? `<span data-sv-given="price">${n * p}</span>` : ansBox(58, 34, n * p, 'data-sv-cell="price"')}</div>`).join('');
    const table = `<div data-dk-box data-sv-table="${k + 1}" data-sv-unitprice="${p}" style="flex-shrink:0;display:flex;flex-direction:column;border:1.5px solid ${T.grid};border-radius:6px;overflow:hidden;background:#FFFFFF"><div style="display:flex;border-bottom:1.5px solid ${T.grid}">${head1}</div><div style="display:flex">${head2}</div></div>`;
    return card(col(head(fill(X.priceHead, { pl: it.pl }), '', 'font-size:16px') + table, 5, 'align-items:flex-start'), W, 'auto', `data-sv-pricecard="${k + 1}" data-sv-item="${it.id}"`, 'padding:6px 12px;justify-content:flex-start');
  };
  // the recipe
  const rc = rng.pick(B.RECIPES);
  const pers = [4].concat(lv.recipe).sort((a, b) => a - b);
  const rW = Math.min(130, Math.floor((W - 24 - 170) / pers.length));
  const rHead = `<div class="sv-th" data-dk-box style="width:170px;height:36px;justify-content:flex-start"></div>` + pers.map((n, j) => `<div class="sv-th" data-dk-box style="width:${rW}px;height:36px${j === pers.length - 1 ? ';border-right:none' : ''}" data-sv-persons="${n}">${esc(fill(X.persons, { n }))}</div>`).join('');
  const rRows = rc.rows.map(([ing, amt, unit]) => `<div style="display:flex;border-top:1.5px solid ${T.grid}"><div class="sv-th" data-dk-box style="width:170px;height:42px;justify-content:flex-start;color:${T.ink};font-family:'Nunito',sans-serif;font-weight:800">${esc(ing)}</div>` + pers.map((n, j) => `<div class="sv-cell" data-dk-box style="width:${rW}px;height:42px;gap:4px${j === pers.length - 1 ? ';border-right:none' : ''}">${n === 4 ? `<span data-sv-given="recipe">${amt}</span>` : ansBox(50, 32, (amt * n) / 4, `data-sv-cell="recipe" data-sv-persons="${n}"`)}${unit ? `<span style="font-size:16px">${esc(unit)}</span>` : ''}</div>`).join('') + '</div>').join('');
  const recipe = card(col(head(fill(X.recipeHead, { name: rc.sv }), '', 'font-size:16px') + `<div data-dk-box data-sv-recipe="${rc.id}" style="flex-shrink:0;display:flex;flex-direction:column;border:1.5px solid ${T.grid};border-radius:6px;overflow:hidden;background:#FFFFFF"><div style="display:flex">${rHead}</div>${rRows}</div>`, 5, 'align-items:flex-start'), W, 'auto', 'data-sv-recipecard="1"', 'padding:6px 12px;justify-content:flex-start');
  // the sentences (closed) or the line to write (level 3, open)
  const sent = lv.sentences.map((s, k) => row(t(fill(s === 'double' ? X.sentence1 : X.sentence2, { pl: items[0].pl }), '', 'font-size:16px') + oneOf('sentence' + (k + 1), rng.shuffle(X.choices.slice()), s === 'double' ? X.choices[0] : X.choices[2], 6, '', 'font-size:15px;padding:2px 9px'), 8, 'justify-content:flex-start;flex-wrap:wrap;row-gap:4px')).join('');
  const writeKey = 'Svaret ska säga att priset blir tre gånger så stort (kostar tre gånger så mycket).';
  const words = lv.write ? white(col(t(X.writeHead, '', 'font-size:16px') + lineBox(W - 40, 38), 2, 'align-items:flex-start'), W, 'auto', `data-sv-open="1" data-sv-key="${esc(writeKey)}"`, 'padding:4px 14px 6px;justify-content:flex-start') : white(col(sent, 6, 'align-items:flex-start'), W, 'auto', 'data-sv-sentences="1"', 'padding:8px 14px;justify-content:flex-start');
  const html = `<div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:9px;justify-content:space-between">${tables.map(tableHtml).join('')}${recipe}${words}</div>`;
  return { html, meta: { tables: tables.map((tb) => `${tb.it.id}:${tb.p}:${tb.cols.join('-')}`), recipe: rc.id + ':' + pers.join(','), items: tables.map((tb) => tb.it.id + tb.p).concat([rc.id]) } };
};

/* ================================================================ G3-652 — Mäta i halva centimeter och visa i diagram */
/**
 * Pencils drawn at their TRUE size (the gate measures them in the PDF), each a whole or half number of centimetres long:
 * the child measures each to the nearest half centimetre (its flat rubber end at the ruler's 0, its sharp tip ON a whole
 * or half mark, never between) and writes the length; then draws a cross over that length on the line plot (its title and
 * its scale printed). Level 1: 7 pencils within 3 cm, every half labelled on the scale, no question; level 2: 8 pencils within 4 cm,
 * only the whole centimetres labelled, one question; level 3: 8 pencils within 5 cm, three questions (the most common
 * length is ONE length; "longer than" and "shorter than" a whole number no pencil has).
 */
const HALV_LV = {
  1: { n: 7, span: 3, labels: 'all', qs: 0, lo: [5, 6], gap: 19, room: 6 },
  2: { n: 8, span: 4, labels: 'whole', qs: 1, lo: [4, 5], gap: 9, room: 5 },
  3: { n: 8, span: 5, labels: 'whole', qs: 3, lo: [4, 4], gap: 3, room: 5 },
};
MODES['sv-halvcm'] = (d, rng) => {
  const lv = HALV_LV[d.level], X = B.TEXT.halvcm;
  const lo = rint(rng, lv.lo[0], lv.lo[1]), hi = lo + lv.span;
  let lens, mode;
  for (let tries = 0; ; tries++) {
    if (tries > 5000) throw new Error('sv-halvcm: no lengths');
    lens = Array.from({ length: lv.n }, () => lo + rint(rng, 0, lv.span * 2) / 2);
    const cnt = {}; lens.forEach((v) => { cnt[v] = (cnt[v] || 0) + 1; });
    const top = Math.max(...Object.values(cnt));
    const tops = Object.keys(cnt).filter((v) => cnt[v] === top);
    if (top < 2 || top > 4) continue;                                   // a cross column at least 2 high, at most 4
    if (lv.qs && tops.length !== 1) continue;                           // the most common length is ONE length
    if (lens.filter((v) => !Number.isInteger(v)).length < Math.ceil(lv.n / 3)) continue;   // a third of them half lengths
    if (Math.min(...lens) > lo + 0.5 || Math.max(...lens) < hi - 0.5) continue;           // the scale is used to its ends
    mode = Number(tops[0]);
    break;
  }
  // the questions (level 2: the most common; level 3: also longer than / shorter than a whole number no pencil has)
  const qs = [];
  if (lv.qs >= 1) qs.push({ q: X.q1, ans: A.cm(mode) + ' cm', key: 'mode' });
  if (lv.qs >= 2) {
    const wholes = []; for (let v = lo + 1; v <= hi - 1; v++) if (!lens.includes(v)) wholes.push(v);
    const pickW = (f) => { const c = rng.shuffle(wholes.filter(f)); return c.length ? c[0] : null; };
    const xg = pickW((v) => lens.filter((l) => l > v).length >= 2 && lens.filter((l) => l > v).length <= lv.n - 2);
    const xs = pickW((v) => v !== xg && lens.filter((l) => l < v).length >= 2 && lens.filter((l) => l < v).length <= lv.n - 2);
    if (xg == null || xs == null) throw new Error('sv-halvcm: retry');
    qs.push({ q: fill(X.q2, { x: xg }), ans: String(lens.filter((l) => l > xg).length), key: 'longer' });
    qs.push({ q: fill(X.q3, { x: xs }), ans: String(lens.filter((l) => l < xs).length), key: 'shorter' });
  }
  const colours = rng.shuffle(A.PENCIL_BODY.slice());
  const pencils = lens.map((len, i) => row(t(`${X.pencil} ${String.fromCharCode(65 + i)}`, '', 'font-size:15px;width:74px') + art(A.realPencil(len * 10, colours[i % colours.length]), `data-sv-pencil="${i + 1}" data-sv-len="${len}"`) +
    `<div style="margin-left:auto;display:flex;align-items:center;gap:5px">${ansBox(62, 30, A.cm(len), `data-sv-measure="${i + 1}"`)}${t('cm', '', 'font-size:16px')}</div>`, 6, 'justify-content:flex-start;width:100%'));
  // review round 1: "Utskrift: verklig storlek (100 %)" beside the heading over the pencils (the lengths are true only at 100 %)
  const part1 = col(row(head(X.measureHead) + t(X.printNote, 'data-sv-printnote="1"', 'font-size:12px;line-height:14px;margin-left:auto;color:' + T.inkSoft), 8, 'justify-content:flex-start;width:100%') + white(col(pencils.join(''), lv.gap, 'align-items:flex-start;width:100%'), W, 'auto', 'data-sv-pencils="1"', 'padding:6px 12px;justify-content:flex-start'), 4, 'align-items:flex-start;width:100%');
  const plot = art(A.linePlot({ lo, hi, labels: lv.labels, w: 620, room: lv.room, title: X.plotTitle, axis: X.axis }), 'data-sv-plot="1"');
  const counts = {}; lens.forEach((v) => { counts[v] = (counts[v] || 0) + 1; });
  const part2 = col(head(X.plotHead) + white(plot, W, 'auto', `data-sv-plotcard="1" data-sv-crosses="${esc(JSON.stringify(counts))}"`, 'padding:4px 12px;justify-content:center'), 4, 'align-items:flex-start;width:100%');
  const part3 = qs.length ? white(col(qs.map((q) => row(t(q.q, '', 'font-size:16px') + box('ws-blankbox', q.key === 'mode' ? 76 : 56, 34, '', `data-dk-numbox data-sv-answer="${esc(q.ans)}" data-sv-q="${q.key}"`, 'display:block') + (q.key === 'mode' ? t('cm', '', 'font-size:16px') : ''), 8, 'justify-content:flex-start')).join(''), 5, 'align-items:flex-start'), W, 'auto', 'data-sv-questions="1"', 'padding:6px 14px;justify-content:flex-start') : '';
  const html = `<div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:14px">${part1}${part2}${part3}</div>`;
  return { html, meta: { lens, lo, hi, most: mode, qs: qs.map((q) => q.key + '=' + q.ans), items: lens.map(String) } };
};

/* ================================================================ the page check */
/** per mode: what the rendered page must hold (each check proves it found something to judge) */
function svVerifyInPage() {
  const f = [];
  const R = document.querySelector('[data-dk]');
  if (!R) return ['no sv root'];
  const mode = R.dataset.svMode;
  const rect = (e) => e.getBoundingClientRect();
  const boxes = [...R.querySelectorAll('.ws-blankbox')];
  if (!boxes.length) f.push('no box to write in');
  boxes.forEach((b) => { const r = rect(b); if (r.height < 27.5 || r.width < 29.5) f.push(`a box ${Math.round(r.width)}x${Math.round(r.height)} px`); });
  R.querySelectorAll('[data-sv-record]').forEach((b) => { if (b.hasAttribute('data-sv-answer')) f.push('a record box carries an answer'); });
  R.querySelectorAll('[data-sv-open]').forEach((o) => { if (!(o.dataset.svKey || '').startsWith('Svaret ska säga')) f.push('an open item without its key'); if (o.querySelector('[data-sv-answer]')) f.push('an open item carries a stamped answer'); });
  if (mode === 'sv-rymmer') {
    const picks = [...R.querySelectorAll('[data-sv-pair] [data-sv-pick] img[data-sv-pic]')];
    if (picks.length < 6) f.push(`${picks.length} pictures in the pairs`);
    picks.forEach((im) => { if (rect(im).width < 70) f.push(`a container picture ${Math.round(rect(im).width)} px (a förskoleklass child needs 70)`); });
    R.querySelectorAll('[data-sv-word]').forEach((w) => { const c = w.closest('[data-dk-box]:not([data-sv-word])'); if (c && w.scrollWidth > rect(c).width + 1) f.push(`the word "${w.textContent}" is wider than its picture card`); });
    if (!R.querySelector('[data-sv-jardraw]')) f.push('no box to draw the mugs in');
  }
  if (mode === 'sv-enheter') {
    // every strip: the thing's ends and each row's ends on the same x (in the page's own pixels)
    R.querySelectorAll('[data-sv-art="strip"]').forEach((s) => {
      const outs = [...s.querySelectorAll('[data-sv-thing-outline]')], rows = [...s.querySelectorAll('[data-sv-row]')];
      if (!outs.length || rows.length !== 2) { f.push('a measuring strip without its thing or its two rows'); return; }
      // measured as printed (screen space, the svg's own left as 0): a transform anywhere moves what is measured
      const sl = s.getBoundingClientRect().left, bx = (e) => { const r = e.getBoundingClientRect(); return [r.left - sl, r.right - sl]; };
      const tbs = outs.map(bx), tx0 = Math.min(...tbs.map((b) => b[0])), tx1 = Math.max(...tbs.map((b) => b[1]));
      const g = s.querySelector('[data-sv-thing]'), x0 = +g.dataset.svX0, L = +g.dataset.svLen;
      rows.forEach((r) => { const units = [...r.querySelectorAll('[data-sv-unit]')]; const xs = units.map(bx); const lo = Math.min(...xs.map((b) => b[0])), hi = Math.max(...xs.map((b) => b[1])); if (Math.abs(lo - tx0) > 0.6 || Math.abs(hi - tx1) > 0.6) f.push(`a row of ${r.dataset.svRowunit} runs ${lo.toFixed(1)}-${hi.toFixed(1)}, the thing ${tx0.toFixed(1)}-${tx1.toFixed(1)}`); if (units.length !== +r.dataset.svRown) f.push('a row draws a different number of units'); });
      if (Math.abs(tx0 - x0) > 0.6 || Math.abs(tx1 - (x0 + L)) > 0.8) f.push(`a thing's outline runs ${tx0.toFixed(1)}-${tx1.toFixed(1)}, its length ${x0}-${x0 + L}`);
    });
    R.querySelectorAll('[data-sv-unit]').forEach((u) => { if (rect(u).width < 20) f.push(`a unit ${Math.round(rect(u).width)} px (too small to count)`); });
  }
  if (mode === 'sv-skillnad') {
    R.querySelectorAll('[data-sv-art="line20"] text').forEach((tx) => { if (rect(tx).height < 11) f.push('a number on the line smaller than 11 px'); });
    R.querySelectorAll('[data-sv-task-card]').forEach((c) => { if (c.querySelectorAll('[data-sv-answer]').length !== 3) f.push('a task without its three blanks'); });
  }
  if (mode === 'sv-symboler') {
    R.querySelectorAll('[data-sv-glyph]').forEach((g) => { const r = rect(g); if (Math.max(r.width, r.height) < 17) f.push(`an Egyptian sign ${Math.round(r.width)}x${Math.round(r.height)} px (too small to read at print size)`); });
    R.querySelectorAll('.sv-roman').forEach((e) => { if (rect(e).height < 24) f.push('a Roman number printed too small'); });
  }
  if (mode === 'sv-halvcm') {
    // a real-size pencil: its ink (rubber end to lead tip) is its length at 96 px to the inch
    R.querySelectorAll('[data-sv-art="real-pencil"]').forEach((s) => { const rub = s.querySelector('[data-sv-real="rubber"]').getBoundingClientRect(), lead = s.querySelector('[data-sv-real="lead"]').getBoundingClientRect(); const mm = (lead.right - rub.left) / (96 / 25.4); if (Math.abs(mm - +s.dataset.svMm) > 0.15) f.push(`a pencil drawn ${mm.toFixed(2)} mm, its length ${s.dataset.svMm} mm`); });
    const pl = R.querySelector('[data-sv-art="lineplot"]');
    if (!pl) f.push('no line plot');
    else { if (!pl.querySelector('[data-sv-plottitle]') || !pl.querySelector('[data-sv-plotaxisword]')) f.push('the line plot without its title or its axis word'); if (pl.querySelectorAll('[data-sv-plabel]').length < 4) f.push('the line plot\'s scale has too few numbers'); }
  }
  if (mode === 'sv-proportion' || mode === 'sv-mellanled' || mode === 'sv-rimligt') {
    R.querySelectorAll('.sv-cell, .sv-th').forEach((c) => { if (c.scrollWidth > c.clientWidth + 1) f.push('a table cell holds more than its width'); });
  }
  return f;
}

const ONLY_MSG = (id, locale) => `${id}: printed in sv only (no ${locale} page; the type teaches a Swedish lesson)`;
/** makeSvType({ id, slug, mode, exerciseType, gradeBand, i18n }) */
function makeSvType({ id, slug, mode, exerciseType, gradeBand, i18n }) {
  if (!MODES[mode]) throw new Error('e2-math-sv: unknown mode ' + mode);
  return {
    id, slug, gradeBand, assetClass: 'icon-placement', exerciseType,
    themeAxis: { applicable: false },
    onlyLocales: [LOC],
    difficulty: { 1: {}, 2: {}, 3: {} },
    i18n,
    svMode: mode,
    build({ difficulty: lv, locale }, ctx) {
      const L = String(locale || 'en').slice(0, 2);
      if (L !== LOC) throw new Error(ONLY_MSG(id, locale));
      const d = { level: Number(lv) || 2 };
      let out;
      for (let k = 0; ; k++) { try { out = MODES[mode](d, ctx.rng, ctx); break; } catch (e) { if (!/retry/.test(e.message) || k > 20) throw e; } }
      return {
        bodyHtml: `<style>${DK.CSS}${SVCSS}</style><div class="dk-root" data-ws-content data-dk="${mode}" data-sv-mode="${mode}" data-sv-level="${d.level}" data-sv-locale="${LOC}">${out.html}</div>`,
        meta: { mode, level: d.level, ...out.meta },
      };
    },
    // a copy is told apart by what it ASKS (the containers, the things and their lengths, the tasks, the numbers)
    levelSetWords(meta) { return [].concat(meta.items || [], meta.pairs || [], meta.order || [], meta.cards || [], meta.tasks || [], meta.tables || [], meta.recipe ? [meta.recipe] : [], meta.qs || [], (meta.toEgypt || []).map(String), (meta.toRoman || []).map(String), meta.everyday || []).map(String); },
    async verify(page) {
      return [].concat(await page.evaluate(DK.dkVerifyInPage), await page.evaluate(G.g1VerifyInPage), await page.evaluate(svVerifyInPage));
    },
  };
}

module.exports = { makeSvType, MODES, svVerifyInPage, RYM_LV, ENH_LV, SKI_LV, SYM_LV, RIM_LV, MEL_LV, PRO_LV, HALV_LV, roman, egyptKey, r100, melTask, capOf, ratioOf, num, LOC };
