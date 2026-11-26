/**
 * e1-math.js — Batch E-1 (Daily Teaching System Stage E, 2026-11-25): the German and Swedish mathematics pages the year
 * designs (scripts/units/year/design.de.math.json, design.sv.math.json) need and no existing type teaches:
 *   G1-671 e1-markt         de  Einkaufen bis 20 Euro: bezahlen und Rückgeld        (money; Klasse 1)
 *   G1-672 e1-lage          sv  Lägesord: framför, bakom, mellan och bredvid        (position-words; åk 1)
 *   G2-631 e1-vaxel         sv  Betala med sedlar och få växel tillbaka             (money; åk 2)
 *   G2-632 e1-kilo          sv  Kilogram: väga och jämföra                          (measurement; åk 2)
 *   G2-633 e1-tid           sv  Hur lång tid tar det?                               (telling-time; åk 2)
 *   G3-630 e1-halb          de  Halbschriftlich addieren: den Rechenweg aufschreiben und erklären (number-lines; Klasse 3)
 *   G3-631 e1-ueber         de  Überschlag und Probe: Kann das stimmen?              (column-arithmetic; Klasse 3)
 *   G3-632 e1-undersokning  sv  Egen undersökning: från fråga till diagram          (graphing-data; åk 3; a record page)
 * Each type is printed in ONE language (`onlyLocales`; any other locale refuses at build). Themeless; PDF only.
 *
 * Built on the Batch K CSS and page check (dk-kinder.js: the stack 620-740 measured on what is drawn, no blank band, no
 * two boxes colliding, nothing out of its box, pictures loaded) and the Batch 1 layout kit and one-answer check
 * (dk-g1.js: a circle group holds ONE right choice). Neither file is edited; this file has its own modes, its own CSS
 * and its own page check (e1VerifyInPage). Drawings: e1-math-art.js. Bank: data/e1/e1-math.js. Gate: qa/verify-e1-math.js.
 *
 * CLOSED items carry their one answer as data (data-e1-answer, data-dk-answer on circle choices, data-e1-right on the
 * money to circle), never printed; the gate re-derives every one from its own arithmetic. G3-632 is a RECORD page (the
 * class's own survey): it holds no answer.
 */
'use strict';
const TOK = require('../../primitives/_tokens.js');
const DK = require('./dk-kinder.js');
const G = require('./dk-g1.js');
const A = require('./e1-math-art.js');
const B = require('../../data/e1/e1-math.js');
const clockFace = require('../../primitives/clock.js');
const { priceTag } = require('../../templates/components-b2.js');

const T = TOK.color;
const W = 675;
const { box, chip, col, row, lineBox, frameLine, numBox, esc, f1 } = G.kit;
const MODES = {};
const LOC = {};   // mode -> the one locale it prints in

/* ================================================================ the layout kit */
const E1CSS = `
.g1-chip{box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center;border:2.5px solid ${T.teal};border-radius:999px;background:#FFFFFF;padding:2px 11px;font-family:'Baloo 2',cursive;font-weight:700;font-size:16px;line-height:20px;color:${T.teal};white-space:nowrap}
.g1-text{display:block;font-family:'Nunito',sans-serif;font-weight:800;font-size:17px;line-height:21px;color:${T.ink};white-space:nowrap}
.e1-t{display:block;box-sizing:border-box;font-family:'Nunito',sans-serif;font-weight:800;font-size:17px;line-height:22px;color:${T.ink};white-space:nowrap}
.e1-tw{display:block;box-sizing:border-box;font-family:'Nunito',sans-serif;font-weight:800;font-size:16px;line-height:21px;color:${T.ink};white-space:normal}
.e1-sm{display:block;box-sizing:border-box;font-family:'Nunito',sans-serif;font-weight:800;font-size:13px;line-height:16px;color:${T.inkSoft};white-space:nowrap}
.e1-head{display:block;font-family:'Baloo 2',cursive;font-weight:700;font-size:19px;line-height:23px;color:${T.teal};white-space:nowrap}
.e1-big{display:block;font-family:'Baloo 2',cursive;font-weight:700;font-size:26px;line-height:30px;color:${T.ink};white-space:nowrap}
.e1-op{display:block;font-family:'Baloo 2',cursive;font-weight:700;font-size:24px;line-height:28px;color:${T.coral};white-space:nowrap}
.e1-pick{box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center;border:2.5px solid ${T.teal};border-radius:999px;background:#FFFFFF;padding:2px 12px;font-family:'Nunito',sans-serif;font-weight:800;font-size:15px;line-height:20px;color:${T.ink};white-space:nowrap}
.e1-badge{display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;flex-shrink:0;width:28px;height:28px;border-radius:50%;background:${T.teal};font-family:'Baloo 2',cursive;font-weight:700;font-size:16px;line-height:20px;color:#FFFFFF}
.e1-purse{box-sizing:border-box;display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:9px 9px;background:${T.creamDeep};border:3px solid ${T.coral};border-radius:12px 12px 30px 30px;padding:9px 8px 7px;position:relative}
`;
const t = (s, attrs = '', style = '', cls = 'e1-t') => `<span class="${cls}" data-dk-box${attrs ? ' ' + attrs : ''}${style ? ` style="${style}"` : ''}>${esc(s)}</span>`;
const tw = (s, w, attrs = '', style = '') => `<span class="e1-tw" data-dk-box${attrs ? ' ' + attrs : ''} style="width:${w}px${style ? ';' + style : ''}">${esc(s)}</span>`;
const head = (s, attrs = '', style = '') => t(s, attrs, style, 'e1-head');
const big = (s, attrs = '') => t(s, attrs, '', 'e1-big');
const op = (s) => t(s, '', '', 'e1-op');
const badge = (s, attrs = '') => `<span class="e1-badge" data-dk-box${attrs ? ' ' + attrs : ''}>${esc(s)}</span>`;
/** a box to write a number in; the answer stamped (never printed) */
const ansBox = (w, h, answer, attrs = '') => box('ws-blankbox', w, h, '', `data-dk-numbox data-e1-answer="${esc(answer)}"${attrs ? ' ' + attrs : ''}`, 'display:block');
/** a one-answer circle group (dk-g1 g1VerifyInPage: exactly one right) */
const pick = (s, right, attrs = '', style = '') => `<span class="e1-pick" data-dk-box data-e1-pick="${esc(s)}" data-dk-answer="${right ? 'right' : 'no'}"${attrs ? ' ' + attrs : ''}${style ? ` style="${style}"` : ''}>${esc(s)}</span>`;
const oneOf = (item, opts, right, dir = 'row', gap = 8, attrs = '', style = '', chipStyle = '') => `<div class="dk-row" data-dk-item="${esc(item)}" data-g1-one="1"${attrs ? ' ' + attrs : ''} style="gap:${gap}px;flex-direction:${dir};${style}">` + opts.map((o) => pick(o, o === right, '', chipStyle)).join('') + '</div>';
/** a card (a cream tile) */
const card = (inner, w, h, attrs = '', style = '') => box('dk-tile', w, h, inner, attrs, style);
const white = (inner, w, h, attrs = '', style = '') => box('dk-tile dk-tile--white', w, h, inner, attrs, style);
const picImg = (src, px, attrs = '') => `<img class="ws-icon" src="${src}" alt="" data-dk-box${attrs ? ' ' + attrs : ''} style="width:${px}px;height:${px}px;display:block;object-fit:contain;flex-shrink:0">`;
const src = (p) => require('../../image-cache/resolve.js').fileUri(p[0], p[1]);   // looked up at build time only (the server has no cache)
const art = (s, attrs = '') => `<div data-dk-box${attrs ? ' ' + attrs : ''} style="line-height:0;flex-shrink:0">${s}</div>`;
const sum = (a) => a.reduce((s, x) => s + x, 0);
const rint = (rng, a, b) => a + Math.floor(rng.next() * (b - a + 1));

/** the subsets of `vals` (by index) that sum to `target` */
function subsetsSumming(vals, target) {
  const out = [];
  const n = vals.length;
  for (let m = 1; m < (1 << n); m++) { let s = 0; for (let i = 0; i < n; i++) if (m & (1 << i)) s += vals[i]; if (s === target) out.push(m); }
  return out;
}
/** fewest pieces making `amount` from `vals` (all the fewest ways, as count vectors) */
function fewestWays(amount, vals) {
  const best = { n: Infinity, ways: [] };
  const rec = (i, left, counts) => {
    if (left === 0) { const n = sum(counts); if (n < best.n) { best.n = n; best.ways = [counts.slice()]; } else if (n === best.n) best.ways.push(counts.slice()); return; }
    if (i === vals.length) return;
    for (let k = Math.floor(left / vals[i]); k >= 0; k--) { counts[i] = k; rec(i + 1, left - k * vals[i], counts); }
    counts[i] = 0;
  };
  rec(0, amount, vals.map(() => 0));
  return best;
}

/* ================================================================ G1-671 — Einkaufen bis 20 Euro (de) */
LOC['e1-markt'] = 'de';
const MARKT_LV = {
  1: { cards: 4, change: 2, note: 10, range: 'within10', pieces: [10, 5, 2, 1], purse: [3, 5], prices: [[1, 8, 6]] },
  2: { cards: 6, change: 3, note: 20, range: 'teen', pieces: [10, 5, 2, 1], purse: [4, 5], prices: [[10, 12, 3], [1, 8, 3]] },   // purses of up to 5 pieces: one row in the purse
  3: { cards: 6, change: 3, note: 20, range: 'cross', pieces: [10, 5, 2, 1], purse: [4, 5], prices: [[3, 9, 6]] },
};
/** a pair of prices the level asks for */
const marktPairOk = (lv, a, b) => {
  const s = a + b;
  if (lv.range === 'within10') return s >= 3 && s <= 10;
  if (lv.range === 'teen') return s >= 11 && s <= 19 && (a % 10) + (b % 10) < 10;   // 12 + 5: no Zehnerübergang
  return a <= 9 && b <= 9 && s >= 11 && s <= 18;   // cross: 7 + 8 over the ten
};
/** every purse of the level's pieces (as a sorted list of values) that holds the total in exactly ONE way: one subset of
 *  its pieces (counted piece by piece, so two equal coins never give two ways) of two pieces or more, never the whole purse */
const _purses = {};
function pursesFor(total, lv) {
  const key = lv.pieces.join() + '|' + lv.purse.join() + '|' + total;
  if (_purses[key]) return _purses[key];
  const out = [];
  const rec = (arr, start) => {
    if (arr.length >= lv.purse[0] && sum(arr) >= total + 1 && arr.filter((v) => v >= 5).length <= 2) {
      const w = subsetsSumming(arr, total);
      if (w.length === 1) { const k = arr.filter((_, i) => w[0] & (1 << i)).length; if (k >= 2 && k < arr.length) out.push({ vals: arr.slice(), mask: w[0] }); }
    }
    if (arr.length === lv.purse[1]) return;
    for (let i = start; i < lv.pieces.length; i++) rec(arr.concat(lv.pieces[i]), i);
  };
  rec([], 0);
  return (_purses[key] = out);
}
/** a purse for `total`, notes first and coins after, each largest first (the order a child counts money) */
function marktPurse(total, lv, rng, used) {
  const all = pursesFor(total, lv);
  if (!all.length) throw new Error('e1-markt: no purse for ' + total);
  // a purse this page has not drawn yet, when there is one
  const fresh = all.filter((x) => !used.has(x.vals.join()));
  const p = rng.pick(fresh.length ? fresh : all);
  used.add(p.vals.join());
  return p.vals.map((v, i) => ({ v, right: !!(p.mask & (1 << i)) }));
}
MODES['e1-markt'] = (d, rng) => {
  const lv = MARKT_LV[d.level];
  const X = B.TEXT.markt;
  // the stall: six goods, six different prices, enough pairs of the level's kind with different totals
  let goods, pairs;
  for (let tries = 0; ; tries++) {
    if (tries > 3000) throw new Error('e1-markt: no stall for level ' + d.level);
    // the level's prices first (L1 six of 1-8 €; L2 three of 10-12 € and three of 1-8 €; L3 six of 3-9 €), then for each
    // price a good whose price range holds it
    const prices = [];
    for (const [lo, hi, n] of lv.prices) prices.push(...rng.shuffle(Array.from({ length: hi - lo + 1 }, (_, k) => lo + k)).slice(0, n));
    const pool = rng.shuffle(B.DE_GOODS.slice());
    goods = [];
    for (const p of rng.shuffle(prices)) {
      const g = pool.find((x) => x.eur[0] <= p && p <= x.eur[1] && !goods.some((y) => y.id === x.id));
      if (!g) break;
      goods.push({ ...g, price: p });
    }
    if (goods.length < 6) continue;
    const all = [];
    for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) if (marktPairOk(lv, goods[i].price, goods[j].price)) all.push([i, j]);
    // the cards: distinct pairs with distinct totals; each good bought at most three times
    const picked = [], totals = new Set(), uses = {};
    for (const pr of rng.shuffle(all)) {
      const s = goods[pr[0]].price + goods[pr[1]].price;
      if (totals.has(s) || pr.some((k) => (uses[k] || 0) >= 3)) continue;
      picked.push(pr); totals.add(s); pr.forEach((k) => { uses[k] = (uses[k] || 0) + 1; });
      if (picked.length === lv.cards) break;
    }
    if (picked.length < lv.cards) continue;
    // the change cards (the last ones) pay with the note: their total is below the note
    const canChange = picked.filter((pr) => goods[pr[0]].price + goods[pr[1]].price < lv.note);
    if (canChange.length < lv.change) continue;
    // a total no purse of the level's size can hold in exactly one way (18 € in five pieces) is a change card
    const noPurse = picked.filter((pr) => !pursesFor(goods[pr[0]].price + goods[pr[1]].price, lv).length);
    if (noPurse.length > lv.change || noPurse.some((pr) => !canChange.includes(pr))) continue;
    const ch = noPurse.concat(rng.shuffle(canChange.filter((pr) => !noPurse.includes(pr))).slice(0, lv.change - noPurse.length));
    pairs = picked.filter((pr) => !ch.includes(pr)).concat(ch); break;
  }
  const usedPurses = new Set();
  const cards = pairs.map((pr, k) => {
    const [i, j] = rng.next() < 0.5 ? pr : [pr[1], pr[0]];
    const total = goods[i].price + goods[j].price;
    const kind = k >= lv.cards - lv.change ? 'change' : 'exact';
    return { i, j, total, kind, change: kind === 'change' ? lv.note - total : null, purse: kind === 'exact' ? marktPurse(total, lv, rng, usedPurses) : null };
  });
  // the stall
  const gw = 96;
  const stallGoods = goods.map((g, k) => `<div style="display:flex;flex-direction:column;align-items:center;gap:2px;width:${gw}px" data-e1-good="${k}" data-e1-price="${g.price}" data-e1-goodid="${g.id}">` +
    picImg(src(g.pic), d.level === 1 ? 62 : 48, `data-e1-pic="${esc(g.pic.join('/'))}"`) + art(priceTag({ value: g.price, unit: '€', fontPx: 17 }), `data-e1-tag="${g.price}"`) + '</div>').join('');
  const stall = box('', W, 'auto', A.awning(W - 40, d.level === 1 ? 30 : 24) +
    `<div class="dk-row" style="width:${W - 40}px;justify-content:space-between;align-items:flex-end;gap:0">${A.post(d.level === 1 ? 96 : 80)}${stallGoods}${A.post(d.level === 1 ? 96 : 80)}</div>` + A.counter(W - 40, 20),
  'data-e1-stall="1"', 'display:flex;flex-direction:column;align-items:center;gap:0');
  // a card
  const cw = Math.floor((W - 12) / 2);
  const big1 = d.level === 1;
  const icon = (g) => picImg(src(g.pic), big1 ? 56 : 38, `data-e1-ref="${goods.indexOf(g)}"`);
  // review round 1 (the German teacher): the child writes each price under its picture, then the sum: "[ ] € + [ ] € = [ ] €"
  const good = (g) => col(icon(g) + row(ansBox(50, big1 ? 34 : 30, g.price, 'data-e1-pricebox="1"') + t('€', '', 'font-size:17px'), 3), 2);
  const cardHtml = (c, k) => {
    const top = row(badge(String(k + 1), 'style="align-self:flex-start"') + good(goods[c.i]) + op('+') + good(goods[c.j]) + op('=') + row(ansBox(big1 ? 62 : 56, big1 ? 40 : 34, c.total, 'data-e1-total="1"') + t('€', '', 'font-size:20px'), 3), 6, 'justify-content:flex-start;align-items:flex-end');
    let bottom;
    if (c.kind === 'exact') {
      // the purse: a leather purse with a clasp on top (review round 1: "in der Geldbörse" must match the picture)
      bottom = `<div style="display:flex;flex-direction:column;align-items:center;width:${cw - 24}px"><span data-e1-clasp="1" style="display:block;line-height:0;position:relative;z-index:1;margin-bottom:-9px">${A.purseClasp(72)}</span>` +
        `<div class="e1-purse" data-dk-box data-e1-purse="1" style="width:${cw - 24}px">` +
        c.purse.map((p) => `<span data-dk-box data-e1-piece="${p.v}"${p.right ? ' data-e1-right="1"' : ''} style="display:block;line-height:0">${A.money('EUR', p.v, { noteH: big1 ? 46 : 30, coinPx: big1 ? 50 : 36 })}</span>`).join('') + '</div></div>';
    } else {
      bottom = col(row(t(X.payWith) + art(A.note('EUR', lv.note, big1 ? 48 : 40), `data-e1-paid="${lv.note}"`), 10, 'justify-content:flex-start') +
        row(t(X.change) + ansBox(70, 42, c.change, 'data-e1-change="1"') + big('€'), 8, 'justify-content:flex-start'), 10, 'align-items:flex-start');
    }
    return card(col(top + bottom, big1 ? 18 : 8, 'align-items:flex-start;width:100%;justify-content:space-evenly;height:100%'), cw, 'auto',
      `data-e1-card="${k + 1}" data-e1-kind="${c.kind}" data-e1-items="${c.i},${c.j}"`, 'flex:1 1 0;min-height:0;padding:' + (big1 ? 8 : 5) + 'px 10px;justify-content:flex-start;align-items:stretch');
  };
  const rowsHtml = [];
  for (let k = 0; k < cards.length; k += 2) rowsHtml.push(`<div class="dk-row" style="gap:12px;flex:1 1 0;min-height:0;align-items:stretch">${cardHtml(cards[k], k)}${cardHtml(cards[k + 1], k + 1)}</div>`);
  const html = stall + `<div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:${big1 ? 12 : 8}px">${rowsHtml.join('')}</div>`;
  return { html, meta: { prices: goods.map((g) => g.price), goods: goods.map((g) => g.id), cards: cards.map((c) => ({ kind: c.kind, i: c.i, j: c.j, total: c.total, change: c.change, purse: c.purse && c.purse.map((p) => p.v + (p.right ? '*' : '')) })), items: cards.map((c) => `${c.kind}:${goods[c.i].price}+${goods[c.j].price}`) } };
};

/* ================================================================ G2-631 — Betala med sedlar och få växel tillbaka (sv) */
LOC['e1-vaxel'] = 'sv';
const VAXEL_LV = {
  1: { cards: 4, ends: true, few: false, ref: false },
  2: { cards: 4, ends: false, few: false, ref: true },    // ref: the coins and notes printed on top (review round 1)
  3: { cards: 4, ends: false, few: true, ref: true },
};
const SEK_PIECES = [100, 50, 20, 10, 5, 2, 1];
/** what a level asks: the note and the price */
function vaxelOk(lvl, note, price) {
  const ch = note - price;
  if (price < 12 || price > 95 || ch < 1) return false;
  if (lvl === 1) return (note === 20 || note === 50) && ch <= 9;                            // within one ten
  if (lvl === 2) return (note === 50 || note === 100) && ch >= 11 && ch <= 48 && price % 10 !== 0;   // over a ten
  return note === 100 && ch >= 5 && price % 10 !== 0 && price % 5 !== 0 || (note === 50 && price % 10 !== 0 && ch >= 5 && ch <= 38 && price % 5 !== 0);
}
MODES['e1-vaxel'] = (d, rng) => {
  const lv = VAXEL_LV[d.level], X = B.TEXT.vaxel;
  const cards = [], usedGoods = new Set(), usedChange = new Set();
  for (let tries = 0; cards.length < lv.cards; tries++) {
    if (tries > 5000) throw new Error('e1-vaxel: no cards for level ' + d.level);
    const g = rng.pick(B.SV_GOODS);
    if (usedGoods.has(g.id)) continue;
    const note = rng.pick(d.level === 1 ? [20, 50] : d.level === 2 ? [50, 100] : [100, 100, 50]);
    const opts = [];
    for (let p = g.kr[0]; p <= g.kr[1]; p++) if (vaxelOk(d.level, note, p) && !usedChange.has(note - p)) opts.push(p);
    if (!opts.length) continue;
    const price = rng.pick(opts);
    usedGoods.add(g.id); usedChange.add(note - price);
    const few = fewestWays(note - price, SEK_PIECES.filter((v) => v < note));
    cards.push({ g, note, price, change: note - price, fewest: few.ways.length === 1 ? few.ways[0] : null });
  }
  if (lv.few && cards.some((c) => !c.fewest)) throw new Error('e1-vaxel: a change with two fewest ways');
  const cardHtml = (c, k) => {
    const vals = SEK_PIECES.filter((v) => v < c.note);
    const fewTxt = c.fewest ? vals.map((v, i) => (c.fewest[i] ? c.fewest[i] + 'x' + v : '')).filter(Boolean).join(' ') : '';
    const left = col(badge(String(k + 1), 'style="align-self:flex-start"') + picImg(src(c.g.pic), 62, `data-e1-pic="${esc(c.g.pic.join('/'))}"`) + art(priceTag({ value: c.price, unit: 'kr', fontPx: 16 }), `data-e1-tag="${c.price}"`), 2, 'width:96px');
    const pays = row(t(X.pays, '', 'font-size:16px') + art(A.note('SEK', c.note, 40), `data-e1-paid="${c.note}"`), 8, 'justify-content:flex-start');
    const back = row(t(X.back, '', 'font-size:16px') + ansBox(60, 40, c.change, 'data-e1-change="1"') + t(X.kr, '', 'font-size:16px'), 6, 'justify-content:flex-start');
    const line = col(t(X.line, '', 'font-size:14px;line-height:18px;color:' + T.inkSoft) + art(A.emptyLine(260, 58, lv.ends ? [c.price, c.note] : null), 'data-e1-numline="1"'), 2, 'align-items:flex-start');
    const draw = box('dk-draw', 270, 'auto', `<span class="e1-sm" style="position:absolute;left:9px;top:3px;width:250px;white-space:normal;font-size:13px;line-height:16px;color:${T.ink}">${esc(lv.few ? X.drawFew : X.draw)}</span>`,
      `data-dk-draw data-e1-draw="1" data-e1-fewest="${esc(fewTxt)}"`, 'align-self:stretch;min-height:' + (lv.few ? 92 : 70) + 'px');
    return card(row(left + col(row(pays + back, 16, 'justify-content:space-between;width:100%') + row(line + draw, 12, 'align-items:stretch;justify-content:space-between;width:100%'), 6, 'align-items:flex-start;flex:1 1 auto;align-self:stretch;justify-content:space-between'), 10, 'align-items:stretch;width:100%;justify-content:flex-start'),
      W, 'auto', `data-e1-card="${k + 1}" data-e1-note="${c.note}" data-e1-price="${c.price}"`, 'flex:1 0 auto;padding:6px 10px');
  };
  // levels 2 and 3: the Swedish coins and notes a child may draw, printed once on top (review round 1: "så få … som
  // möjligt" has one right answer only when the child knows every coin and note; a forgotten 2-krona coin is not the skill)
  const ref = lv.ref ? white(t(X.money, 'data-e1-moneyref="1"', 'font-size:16px;white-space:pre'), W, 'auto', '', 'padding:5px 14px;flex-shrink:0;align-items:flex-start') : '';
  const html = ref + `<div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:10px">${cards.map(cardHtml).join('')}</div>`;
  return { html, meta: { cards: cards.map((c) => ({ good: c.g.id, price: c.price, note: c.note, change: c.change, fewest: c.fewest })), items: cards.map((c) => `${c.g.id}:${c.price}/${c.note}`) } };
};

/* ================================================================ G2-632 — Kilogram: väga och jämföra (sv) */
LOC['e1-kilo'] = 'sv';
const KILO_LV = {
  1: { balances: 2, scales: 0, nMin: 1, nMax: 5, compare: 'pictures', cmp: 6, every: 1 },
  2: { balances: 1, scales: 2, nMin: 1, nMax: 10, compare: 'pictures', cmp: 6, every: 1 },
  3: { balances: 1, scales: 2, nMin: 1, nMax: 10, compare: 'tilt', cmp: 4, every: 2 },
};
MODES['e1-kilo'] = (d, rng) => {
  const lv = KILO_LV[d.level], X = B.TEXT.kilo;
  for (let attempt = 0; attempt < 500; attempt++) {
    // the measured things: different things, different masses, each mass inside the thing's range; a scale holds a
    // thing that goes in a bowl (B.MASS_OBJECTS .scale). Level 3's dial numbers every second kilogram, so at least one of
    // its scales points at an odd number (read between two numerals).
    const meas = [];
    let ok = true;
    for (let k = 0; k < lv.balances + lv.scales && ok; k++) {
      const isScale = k >= lv.balances;
      const opts = [];
      for (const o of B.MASS_OBJECTS) {
        if ((isScale && !o.scale) || meas.some((m) => m.o.id === o.id)) continue;
        for (let n = Math.max(o.kg[0], lv.nMin); n <= Math.min(o.kg[1], lv.nMax); n++) if (!meas.some((m) => m.n === n)) opts.push({ o, n });
      }
      if (!opts.length) { ok = false; break; }
      const pk = rng.pick(opts);
      meas.push({ o: pk.o, n: pk.n, kind: isScale ? 'scale' : 'balance' });
    }
    if (!ok) continue;
    if (d.level > 1 && !meas.some((m) => m.n >= 6)) continue;   // the 10-kg range is used
    if (lv.every === 2 && !meas.some((m) => m.kind === 'scale' && m.n % 2 === 1)) continue;
    // the compare part
    let cmpItems;
    if (lv.compare === 'pictures') {
      const half = lv.cmp / 2, light = rng.shuffle(B.LIGHT_THINGS.slice()).slice(0, half), heavy = rng.shuffle(B.HEAVY_THINGS.filter((h) => !meas.some((m) => m.o.id === h.id))).slice(0, half);
      cmpItems = rng.shuffle([...light.map((x) => ({ x, ans: 'less' })), ...heavy.map((x) => ({ x, ans: 'more' }))]);
    } else {
      // level 3: a balance against ONE 1-kg weight: the heavier side goes down; a thing of about 1 kg keeps it level (on
      // three pages in four; the kinds are drawn so no answer is always on the page, and none is always missing)
      const kinds = rng.shuffle(rng.next() < 0.5 ? ['less', 'more', 'less', 'about'] : rng.next() < 0.5 ? ['less', 'more', 'more', 'less'] : ['more', 'less', 'more', 'about']);
      const pools = { less: rng.shuffle(B.LIGHT_THINGS.filter((x) => !x.alive)), more: rng.shuffle(B.PAN_HEAVY.filter((h) => !meas.some((m) => m.o.id === h.id))), about: B.ABOUT_ONE.filter((a) => !meas.some((m) => m.o.id === a.id)) };
      if (kinds.filter((k) => k === 'more').length > pools.more.length || kinds.filter((k) => k === 'about').length > pools.about.length) continue;
      cmpItems = kinds.map((k) => ({ x: pools[k].shift(), ans: k }));
    }
    // the measure cards
    const bw = lv.balances === 2 ? Math.floor((W - 12) / 2) : 355, sw = Math.floor((W - bw - 24) / 2);
    const measHtml = meas.map((m, k) => {
      const s = src(m.o.pic);
      const drawing = m.kind === 'balance'
        ? A.balanceKg({ src: s, pic: m.o.pic.join('/'), n: m.n, w: bw - 16, h: d.level === 1 ? 210 : 226, picPx: d.level === 1 ? 104 : 112, s: d.level === 1 ? 24 : 25, attrs: `data-e1-thing="${m.o.id}"` })
        : A.kitchenScale({ src: s, pic: m.o.pic.join('/'), n: m.n, max: 10, every: lv.every, w: sw - 12, h: 226, picPx: 70, attrs: `data-e1-thing="${m.o.id}"` });
      return card(col(head(m.kind === 'balance' ? X.balanceHead : X.scaleHead, '', 'font-size:17px') + art(drawing) + row(ansBox(66, 40, m.n, `data-e1-kg="${m.kind}"`) + big(X.kg), 6), 4, 'justify-content:space-between;height:100%'),
        m.kind === 'balance' ? bw : sw, 'auto', `data-e1-meas="${k + 1}" data-e1-kind="${m.kind}" data-e1-n="${m.n}" data-e1-thing="${m.o.id}"`, 'flex:1 0 auto;padding:5px 6px;align-items:stretch');
    }).join('');
    const perRow = lv.cmp === 6 ? 3 : 4, cw = Math.floor((W - (perRow - 1) * 10) / perRow);
    const cmpHtml = lv.compare === 'pictures'
      ? cmpItems.map((c, k) => card(col(picImg(src(c.x.pic), lv.cmp === 6 ? 92 : 100, `data-e1-pic="${esc(c.x.pic.join('/'))}"`) + oneOf(c.x.id, [X.more, X.less], c.ans === 'more' ? X.more : X.less, 'column', 6), 8),
        cw, 'auto', `data-e1-cmp="${k + 1}" data-e1-thing="${c.x.id}" data-e1-truth="${c.ans}"`, 'flex:1 0 auto;padding:6px')).join('')
      : cmpItems.map((c, k) => card(col(art(A.balanceKg({ src: src(c.x.pic), pic: c.x.pic.join('/'), n: 1, tilt: c.ans === 'more' ? 1 : c.ans === 'less' ? -1 : 0, w: cw - 10, h: 176, picPx: 74, s: 26, attrs: `data-e1-thing="${c.x.id}" data-e1-truth="${c.ans}"` })) +
        oneOf(c.x.id, [X.more, X.less, X.about], c.ans === 'more' ? X.more : c.ans === 'less' ? X.less : X.about, 'column', 4), 6),
      cw, 'auto', `data-e1-cmp="${k + 1}" data-e1-thing="${c.x.id}" data-e1-truth="${c.ans}"`, 'flex:1 0 auto;padding:6px 4px')).join('');
    const html = `<div class="dk-row" style="gap:12px;align-items:stretch">${measHtml}</div>` +
      head(lv.compare === 'tilt' ? X.tiltHead : X.compareHead) +
      (perRow === 3 ? `<div class="dk-row" style="gap:10px;align-items:stretch;flex-wrap:wrap;row-gap:10px">${cmpHtml}</div>` : `<div class="dk-row" style="gap:10px;align-items:stretch">${cmpHtml}</div>`);
    return { html, meta: { meas: meas.map((m) => ({ thing: m.o.id, n: m.n, kind: m.kind })), cmp: cmpItems.map((c) => ({ thing: c.x.id, ans: c.ans })), items: meas.map((m) => m.o.id + ':' + m.n).concat(cmpItems.map((c) => c.x.id)) } };
  }
  throw new Error('e1-kilo: no page for level ' + d.level);
};

/* ================================================================ G2-633 — Hur lång tid tar det? (sv) */
LOC['e1-tid'] = 'sv';
const TID_LV = {
  1: { pairs: 3, startHalf: false, cross12: false, maxDur: 6, words: 'printed' },   // durations in half hours (max 3 h)
  2: { pairs: 3, startHalf: true, cross12: false, maxDur: 9, words: 'none' },
  3: { pairs: 3, startHalf: true, cross12: true, maxDur: 11, words: 'write' },
};
/** the Swedish clock word of h:m (m 0 or 30): klockan nio, halv tio (= 9:30) */
const svClock = (h, m) => (m === 0 ? 'klockan ' + B.SV_HOURS[h] : 'halv ' + B.SV_HOURS[(h % 12) + 1]);
MODES['e1-tid'] = (d, rng) => {
  const lv = TID_LV[d.level], X = B.TEXT.tid;
  // the durations of the page: two with a half hour and one whole (so the minutes are never always the same)
  const kinds = rng.shuffle(['half', 'half', 'whole']);
  const pairs = [];
  for (let tries = 0; pairs.length < lv.pairs; tries++) {
    if (tries > 5000) throw new Error('e1-tid: no pairs');
    const kind = kinds[pairs.length];
    const startM = lv.startHalf && rng.next() < 0.5 ? 30 : 0;
    const startH = rint(rng, 1, 12);
    let dur = rint(rng, 1, lv.maxDur);   // in half hours
    if ((kind === 'half') !== (dur % 2 === 1)) continue;
    if (dur < 2 && kind === 'whole') continue;
    const startMin = (startH % 12) * 60 + startM, endMin = startMin + dur * 30;
    const endH = Math.floor(endMin / 60) % 12 || 12, endM = endMin % 60;
    const crosses = endMin >= 12 * 60;   // passes 12 o'clock
    if (lv.cross12 !== crosses) continue;
    if (pairs.some((p) => p.dur === dur || (p.startH === startH && p.startM === startM))) continue;
    pairs.push({ startH, startM, endH, endM, dur, kind });
  }
  const pairHtml = pairs.map((p, k) => {
    const face = (h, m, which) => {
      const c = clockFace({ h, m, size: d.level === 1 ? 100 : d.level === 2 ? 112 : 100 }).svg.replace('<svg ', `<svg data-e1-clock="${which}" `);
      const under = lv.words === 'printed' ? t(svClock(h, m), `data-e1-clockword="${esc(svClock(h, m))}"`, 'font-size:16px') : lv.words === 'write' ? row(t(X.clockWord, '', 'font-size:14px') + lineBox(118, 30, `data-e1-answer="${esc(m === 0 ? B.SV_HOURS[h] : svClock(h, m))}" data-e1-writeclock="${which}"`), 4) : '';
      return col(t(which === 'start' ? X.start : X.end, '', `font-size:14px;line-height:16px;color:${T.teal}`) + art(c) + under, 2);
    };
    const hrs = Math.floor(p.dur / 2), mins = p.dur % 2 ? 30 : 0;
    // level 1: the reminder under the boxes (review round 1: "En halvtimme = 30 minuter.")
    const answer = col(row(col(t(X.hours, '', 'font-size:14px') + ansBox(62, 42, hrs, 'data-e1-hours="1"'), 2) + col(t(X.minutes, '', 'font-size:14px') + ansBox(62, 42, mins, 'data-e1-minutes="1"'), 2), 10) +
      (d.level === 1 ? t(X.halfHour, 'data-e1-halfhour="1"', 'font-size:13px;line-height:16px;color:' + T.inkSoft) : ''), 4);
    return card(row(badge(String(k + 1)) + face(p.startH, p.startM, 'start') + art(A.artSvg(`<path d="M4 20 H60 M48 8 L62 20 L48 32" fill="none" stroke="${T.coral}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`, 66, 40)) + face(p.endH, p.endM, 'end') + answer, 14, 'justify-content:space-between;width:100%'),
      W, 'auto', `data-e1-pair="${k + 1}" data-e1-start="${p.startH}:${p.startM}" data-e1-end="${p.endH}:${p.endM}" data-e1-dur="${p.dur * 30}"`, 'flex:1 0 auto;padding:4px 12px');
  }).join('');
  // the units: six activities, two of each unit, in a drawn order
  const pickU = (u) => rng.shuffle(B.UNIT_ACTIVITIES.filter((a) => a.unit === u)).slice(0, 2);
  const acts = rng.shuffle([...pickU('sekunder'), ...pickU('minuter'), ...pickU('timmar')]);
  const actHtml = acts.map((a, k) => row(tw(a.sv, 300, `data-e1-act="${a.id}"`) + oneOf(a.id, B.UNITS, a.unit, 'row', 6, '', '', 'font-size:14px;padding:2px 11px'), 8, 'justify-content:space-between;width:100%')).join('');
  const unitsBox = white(col(head(X.unitHead) + `<div style="display:grid;grid-template-columns:1fr;gap:3px;width:100%">${actHtml}</div>`, 4, 'align-items:flex-start;width:100%'), W, 'auto', 'data-e1-units="1"', 'padding:5px 14px;flex-shrink:0');
  const html = `<div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:10px">${pairHtml}</div>` + unitsBox;
  return { html, meta: { pairs: pairs.map((p) => ({ start: [p.startH, p.startM], end: [p.endH, p.endM], minutes: p.dur * 30 })), acts: acts.map((a) => a.id + ':' + a.unit), items: pairs.map((p) => `${p.startH}:${p.startM}-${p.endH}:${p.endM}`).concat(acts.map((a) => a.id)) } };
};

/* ================================================================ G3-630 — Halbschriftlich addieren (de) */
LOC['e1-halb'] = 'de';
// four tasks a page: each needs an empty Rechenstrich with room for three jumps and three step lines (six did not fit the
// body with writing room, measured 2026-11-25)
const HALB_LV = { 1: { tasks: 4, cross: 0, labels: true, starters: true }, 2: { tasks: 4, cross: 1, labels: false, starters: false }, 3: { tasks: 4, cross: 2, labels: false, starters: false } };
const dig = (n) => [Math.floor(n / 100), Math.floor(n / 10) % 10, n % 10];
/** the steps of a + b: hundreds, then tens, then ones (each step an equation) */
function halbSteps(a, b) { const [h, z, e] = dig(b); const s1 = a + 100 * h, s2 = s1 + 10 * z, s3 = s2 + e; return [[a, 100 * h, s1], [s1, 10 * z, s2], [s2, e, s3]]; }
/** how many steps pass a hundred or a ten (the tens step over a hundred, the ones step over a ten) */
/** the ones step passes a ten AND a hundred at once (768 + 30 = 798, 798 + 7 = 805): level 3 only (review round 2) */
function halbOnesHundred(a, b) { const [h, z, e] = dig(b); return ((a + 100 * h + 10 * z) % 100) + e >= 100; }
function halbCross(a, b) { const [, az, ae] = dig(a), [, bz, be] = dig(b); return (az + bz >= 10 ? 1 : 0) + (ae + be >= 10 ? 1 : 0); }
MODES['e1-halb'] = (d, rng) => {
  const lv = HALB_LV[d.level], X = B.TEXT.halb;
  const tasks = [], sums = new Set();
  // level 3: on about half the pages one task lands on 1000 (its tens step reaches 990-something, its ones step crosses
  // into the thousand); its place on the page is drawn
  let thousand = d.level === 3 && rng.next() < 0.5;
  if (thousand) {
    for (;;) { const b = 100 * rint(rng, 1, 4) + 10 * rint(rng, 1, 9) + rint(rng, 1, 9), a = 1000 - b; if (a >= 101 && a % 10 !== 0 && a > b) { tasks.push({ a, b, s: 1000, steps: halbSteps(a, b) }); sums.add(1000); break; } }
  }
  for (let tries = 0; tasks.length < lv.tasks; tries++) {
    if (tries > 20000) throw new Error('e1-halb: no tasks');
    const a = rint(rng, 101, 899), b = 100 * rint(rng, 1, 8) + 10 * rint(rng, 1, 9) + rint(rng, 1, 9);   // every digit of b non-zero: three steps
    const s = a + b;
    if (s > 1000 || sums.has(s)) continue;
    // the larger number first (review round 1: German children start with the larger number; with it first, "Beginne bei
    // der ersten Zahl" and the Tauschaufgabe give the same steps)
    if (a <= b) continue;
    if (dig(a).slice(1).some((x) => x === 0) && rng.next() < 0.6) continue;   // a round first number now and then only
    if (s === 1000 || halbCross(a, b) !== lv.cross) continue;
    if (d.level === 2 && halbOnesHundred(a, b)) continue;
    if (d.level === 1 && s > 999) continue;
    tasks.push({ a, b, s, steps: halbSteps(a, b) }); sums.add(s);
  }
  if (thousand) tasks.splice(rint(rng, 0, tasks.length - 1), 0, tasks.shift());
  const cw = Math.floor((W - 12) / 2);
  const sh = 30, bw = lv.labels ? 58 : 66;
  const cardHtml = (q, k) => {
    const stepRows = q.steps.map((st, i) => row((lv.labels ? t(X.labels[i], '', `font-size:12px;line-height:13px;width:64px;white-space:normal;color:${T.inkSoft}`) : '') +
      ansBox(bw, sh, st[0], `data-e1-step="${i + 1}a"`) + op('+') + ansBox(bw, sh, st[1], `data-e1-step="${i + 1}b"`) + op('=') + ansBox(bw, sh, st[2], `data-e1-step="${i + 1}c"`), 5, 'justify-content:flex-start')).join('');   // (30-px step boxes, 4 px apart)
    return card(col(row(badge(String(k + 1)) + big(`${q.a} + ${q.b} =`) + ansBox(78, 34, q.s, 'data-e1-sum="1"'), 8, 'justify-content:flex-start') +
      art(A.rechenstrich(cw - 30, 77, 27), 'data-e1-strichbox="1"')   /* review round 2: about 15 mm over the line, 9 mm under it */ + col(stepRows, 4, 'align-items:flex-start'), 8, 'align-items:flex-start;width:100%;justify-content:space-between;height:100%'),
    cw, 'auto', `data-e1-task="${k + 1}" data-e1-a="${q.a}" data-e1-b="${q.b}"`, 'flex:1 1 0;min-height:0;padding:6px 10px;align-items:stretch');
  };
  const rowsHtml = [];
  for (let k = 0; k < tasks.length; k += 2) rowsHtml.push(`<div class="dk-row" style="gap:12px;flex:1 1 0;min-height:0;align-items:stretch">${cardHtml(tasks[k], k)}${cardHtml(tasks[k + 1], k + 1)}</div>`);
  // three lines (review round 1: the way has three steps, hundreds, tens and ones); level 1 starts each line
  const lines = lv.starters ? X.starters.map((s) => frameLine([s, W - 50 - Math.round(9.4 * s.length)], 32)).join('') : lineBox(W - 30, 32) + lineBox(W - 30, 32) + lineBox(W - 30, 32);
  const explain = white(col(head(X.explainHead, '', 'font-size:17px') + col(lines, 2, 'align-items:flex-start') + frameLine([X.checkedBy, 260], 34), 2, 'align-items:flex-start'), W, 'auto', 'data-e1-explain="1"', 'padding:3px 14px;flex-shrink:0;justify-content:flex-start');
  const html = `<div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:10px">${rowsHtml.join('')}</div>` + explain;
  return { html, meta: { tasks: tasks.map((q) => `${q.a}+${q.b}=${q.s}`), items: tasks.map((q) => `${q.a}+${q.b}`) } };
};

/* ================================================================ G3-631 — Überschlag und Probe (de) */
LOC['e1-ueber'] = 'de';
/**
 * items: ok = right; small = wrong, the estimate cannot see it (within 70 of the estimate); big = wrong, the estimate sees
 * it (151 or more from the estimate: review round 1, so even a child who also rounds the printed result stays on the right
 * side). probe: which kinds get a Probe card (the rest of each kind gets none).
 *
 * Review round 1 (the German teacher), the surface cues: every item draws its operation and whether its second number is
 * two-digit (about one in three, always rounding to 100: 51-94) BEFORE its kind is known, so a short second number, the
 * operation or the place on the page never tells the box (the gate measures each). The shifted-place error is gone: drawn
 * as written, its misaligned column told "kann nicht stimmen" by itself; every calculation is drawn correctly aligned and
 * its errors are the forgotten carry (Übertrag vergessen), the forgotten exchange in subtraction and the smaller digit
 * taken from the larger. No Überschlag is 0 (a subtraction's estimate is at least 100).
 */
const UEBER_LV = {
  1: { ops: ['+'], ok: 2, small: 0, big: 2, probe: { ok: 1, small: 0, big: 1 } },
  2: { ops: ['+', '-'], ok: 3, small: 1, big: 2, probe: { ok: 1, small: 1, big: 1 } },
  3: { ops: ['+', '-'], ok: 2, small: 2, big: 2, probe: { ok: 1, small: 2, big: 1 } },
};
const round100 = (n) => Math.floor((n + 50) / 100) * 100;   // ab 5 aufrunden (no number of the page ends in 50)
const estimateOf = (a, b, o) => (o === '+' ? round100(a) + round100(b) : round100(a) - round100(b));
/** the column digits of x - y with the smaller digit taken from the larger in every column (no exchange) */
function smallerFromLarger(a, b) { const da = String(a).padStart(3, '0').split('').map(Number), db = String(b).padStart(3, '0').split('').map(Number); return Number(da.map((x, i) => Math.abs(x - db[i])).join('')); }
/** the wrong results a column calculation of a o b can show: [error kind, printed] (all drawn correctly aligned) */
function wrongResults(a, b, o) {
  const tru = o === '+' ? a + b : a - b;
  const kinds = [];
  if (o === '+') {
    if (a % 10 + b % 10 >= 10) kinds.push(['carry-ones', tru - 10]);
    if (Math.floor(a / 10) % 10 + Math.floor(b / 10) % 10 + (a % 10 + b % 10 >= 10 ? 1 : 0) >= 10) kinds.push(['carry-tens', tru - 100]);
  } else {
    if (a % 10 < b % 10) { kinds.push(['carry-ones', tru + 10]); kinds.push(['smaller-from-larger', smallerFromLarger(a, b)]); }
    if (Math.floor(a / 10) % 10 - (a % 10 < b % 10 ? 1 : 0) < Math.floor(b / 10) % 10) { kinds.push(['carry-tens', tru + 100]); if (!kinds.some((k) => k[0] === 'smaller-from-larger')) kinds.push(['smaller-from-larger', smallerFromLarger(a, b)]); }
  }
  return kinds.filter((k) => k[1] !== tru && k[1] >= 0 && k[1] <= 999);
}
MODES['e1-ueber'] = (d, rng) => {
  const lv = UEBER_LV[d.level], X = B.TEXT.ueber;
  const kinds = [...Array(lv.ok).fill('ok'), ...Array(lv.small).fill('small'), ...Array(lv.big).fill('big')];
  const n = kinds.length;
  // the slots: kind, operation and second-number length drawn independently (half the items plus, half minus at levels
  // 2 and 3; each second number two-digit with chance 1/3), then each slot searched until it is met
  const ops = lv.ops.length > 1 ? rng.shuffle(Array.from({ length: n }, (_, i) => (i < n / 2 ? '+' : '-'))) : Array(n).fill('+');
  const slots = rng.shuffle(kinds).map((kind, i) => ({ kind, o: ops[i], twoDigit: rng.next() < 1 / 3 }));
  const items = [];
  const no50 = (v) => v % 100 !== 50;
  for (const sl of slots) {
    let got = null;
    for (let tries = 0; !got; tries++) {
      if (tries > 20000) throw new Error('e1-ueber: no item for ' + JSON.stringify(sl));
      const { kind, o } = sl;
      const b = sl.twoDigit ? rint(rng, 51, 94) : rint(rng, 112, 689);
      const a = o === '+' ? rint(rng, 112, 899 - b) : rint(rng, b + 25, 978);
      if (a < 100 || !no50(a) || !no50(b) || (o === '+' && a + b > 999)) continue;
      if (items.some((x) => x.a === a)) continue;
      const tru = o === '+' ? a + b : a - b, E = estimateOf(a, b, o);
      if (E < 100) continue;   // no Überschlag of 0
      let printed = tru, err = null;
      if (kind !== 'ok') { const ws = wrongResults(a, b, o); if (!ws.length) continue; [err, printed] = rng.pick(ws); }
      const dist = Math.abs(printed - E);
      if (kind === 'big' ? dist < 151 : dist > 70) continue;   // exact by the rule ("mehr als 100"), and well clear of it
      if (items.some((x) => x.printed === printed)) continue;
      got = { a, b, o, tru, printed, err, kind, E, can: dist <= 100, twoDigit: sl.twoDigit };
    }
    items.push(got);
  }
  // the Probe cards: per kind as the level says, the rest none (the gate measures that no Probe tells the box or the error)
  const probeIdx = [];
  for (const kind of ['ok', 'small', 'big']) probeIdx.push(...rng.shuffle(items.map((x, i) => (x.kind === kind ? i : -1)).filter((i) => i >= 0)).slice(0, lv.probe[kind]));
  probeIdx.sort((x, y) => x - y);
  const letters = 'ABCDEFGH';
  const L1 = d.level === 1, cell = L1 ? 22 : 18, mn = '−';   // 18 px is about a 5-mm Kästchen
  // one calculation a row: the task and its finished column; the Überschlag and, on its line, what the Überschlag shows
  // (review round 1: the chips belong to the Überschlag, so an error only the Probe finds is still "kann stimmen" by it);
  // "Richtig wäre:" over a squared field to redo a wrong calculation
  const itemHtml = (x, k) => {
    // the finished written calculation is the task (its numbers are in the column)
    const calc = art(A.columnCalc({ top: x.a, bottom: x.b, op: x.o, result: x.printed, s: cell, cols: 3 }));
    const bh = L1 ? 32 : 28;
    const est = row(t(X.est, '', 'font-size:15px;color:' + T.teal) + ansBox(54, bh, round100(x.a), 'data-e1-ra="1"') + op(x.o === '+' ? '+' : mn) + ansBox(54, bh, round100(x.b), 'data-e1-rb="1"') + op('=') + ansBox(58, bh, x.E, 'data-e1-est="1"'), 4, 'justify-content:flex-start');
    const ticks = row(t(X.after, '', 'font-size:14px;color:' + T.teal) + oneOf('item-' + letters[k], [X.can, X.cannot], x.can ? X.can : X.cannot, 'row', 6, `data-e1-ticks="${letters[k]}"`, '', 'font-size:13px;line-height:17px;padding:1px 9px'), 6, 'justify-content:flex-start');
    const ks = L1 ? 18 : 16;   // the squares to redo a wrong calculation (about 4-5 mm)
    const fix = col(t(X.right, '', 'font-size:14px;line-height:16px') + art(A.kaestchen(5, 3, ks), `data-e1-fix="${x.printed === x.tru ? 'leave' : 'fix'}" data-e1-answer="${x.tru}"`), 2, 'align-items:flex-start');
    return card(row(badge(letters[k]) + calc + col(est + ticks, L1 ? 12 : 6, 'align-items:flex-start') + fix, 10, 'align-items:center;justify-content:space-between;width:100%'),
      W, 'auto', `data-e1-item="${letters[k]}" data-e1-kind="${x.kind}" data-e1-err="${x.err || 'none'}" data-e1-probe="${probeIdx.includes(k) ? 1 : 0}"`, 'flex:1 0 auto;padding:3px 12px;align-items:stretch;justify-content:center');
  };
  const pw = Math.floor((W - (probeIdx.length - 1) * 10) / probeIdx.length);
  const probes = probeIdx.map((i) => {
    const x = items[i];
    // the Probe's outcome is stamped (data-e1-probeok, never printed): a wrong one gets its right result in "Richtig wäre:"
    const cols = Math.min(12, Math.floor((pw - 14) / 20));
    return card(col(head(`${X.probeTo} ${letters[i]}`, '', 'font-size:16px') + art(A.kaestchen(cols, L1 ? 4 : 3, 20)), 3),
    pw, 'auto', `data-e1-probefor="${letters[i]}" data-e1-probeok="${x.printed === x.tru ? 1 : 0}"`, 'padding:4px;flex:1 0 auto');
  }).join('');
  const rule = white(row(t(X.ruleHead, '', 'color:' + T.teal + ';font-size:16px') + tw(X.rule, W - 140, '', 'font-size:14px;line-height:18px'), 8, 'align-items:flex-start;justify-content:flex-start'),
  W, 'auto', 'data-e1-rule="1"', 'padding:3px 12px;flex-shrink:0;justify-content:flex-start');
  const probeRule = row(t(X.probeHead, '', 'color:' + T.teal + ';font-size:16px') + tw(X.probe, W - 90, '', 'font-size:14px;line-height:18px'), 8, 'align-items:flex-start;justify-content:flex-start;width:100%', );
  const html = rule + `<div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:${L1 ? 10 : 5}px">${items.map(itemHtml).join('')}</div>` +
    col(probeRule.replace('<div class="dk-row"', '<div class="dk-row" data-e1-proberule="1"') + `<div class="dk-row" style="gap:10px;align-items:stretch;width:100%">${probes}</div>`, 4, 'width:100%;flex-shrink:0');
  return { html, meta: { items: items.map((x) => `${x.a}${x.o}${x.b}=${x.printed}${x.kind === 'ok' ? '' : '(' + x.err + ')'}`), probes: probeIdx.map((i) => letters[i]), kinds: items.map((x) => x.kind) } };
};

/* ================================================================ G3-632 — Egen undersökning (sv; a record page) */
LOC['e1-undersokning'] = 'sv';
const UND_LV = { 1: { alts: 3, starters: 3, firstLabels: [0, 2], total: false }, 2: { alts: 4, starters: 1, firstLabels: [0], total: false }, 3: { alts: 5, starters: 0, firstLabels: [], total: true } };
MODES['e1-undersokning'] = (d) => {
  const lv = UND_LV[d.level], X = B.TEXT.undersokning;
  const L = 'ABCDE';
  // 1. the question and the answer choices (two columns of choice lines)
  const altW = Math.floor((W - 24 - 2 * 14) / 3) - 28;   // three columns (review round 2: room for the 5-mm chart)
  const alts = Array.from({ length: lv.alts }, (_, i) => row(t(L[i] + ':', '', 'font-size:15px;width:20px') + lineBox(altW, 32), 4, 'justify-content:flex-start;align-items:flex-end'));
  const q = white(col(row(head(X.q, '', 'font-size:17px') + lineBox(W - 160, 36), 8, 'justify-content:flex-start;align-items:flex-end') +
    t(X.alts, '', 'font-size:15px;color:' + T.teal) +
    `<div style="display:grid;grid-template-columns:1fr 1fr 1fr;column-gap:14px;row-gap:2px;width:100%">${alts.join('')}</div>`, 2, 'align-items:flex-start'),
  W, 'auto', 'data-e1-field="question"', 'padding:4px 12px;flex-shrink:0;justify-content:flex-start');
  // 2. the frequency table: a ruled grid, one row per answer choice (the child writes the choice, the tally marks and the
  // number); level 3 adds the total
  const tw0 = 258, cols = [{ l: X.colAlt, w: 100 }, { l: X.colTally, w: 108 }, { l: X.colCount, w: 48 }];
  const rowH = { 3: 94, 4: 70, 5: 44 }[lv.alts];   // the rows fill the table's field (tally marks for up to 24 answers and more fit a row)
  const cell = (inner, w, last, attrs = '') => `<div${attrs} style="box-sizing:border-box;width:${w}px;height:${rowH}px;border-bottom:1.5px solid ${T.grid};${last ? '' : 'border-right:1.5px solid ' + T.grid + ';'}display:flex;align-items:flex-start;padding:2px 4px">${inner}</div>`;
  const trow = (i) => `<div style="display:flex" data-e1-row="${L[i]}">${cell(t(L[i], '', 'font-size:13px;color:' + T.inkSoft), cols[0].w)}${cell('', cols[1].w, false, ' data-e1-tally="1"')}${cell('', cols[2].w, true)}</div>`;
  const totalRow = lv.total ? `<div style="display:flex">${cell(t(X.total, '', 'font-size:14px'), cols[0].w + cols[1].w)}${cell('', cols[2].w, true)}</div>` : '';
  const table = white(col(head(X.table, '', 'font-size:17px') +
    box('', tw0 - 2, 'auto', `<div style="display:flex;border-bottom:2px solid ${T.teal}">${cols.map((c, k) => `<div style="box-sizing:border-box;width:${c.w}px;padding:0 4px;${k < 2 ? 'border-right:1.5px solid ' + T.grid : ''}">${t(c.l, '', 'font-size:14px;line-height:17px;white-space:normal;color:' + T.teal)}</div>`).join('')}</div>` +
      Array.from({ length: lv.alts }, (_, i) => trow(i)).join('') + totalRow, 'data-e1-table="1"', 'border:1.5px solid ' + T.grid + ';border-radius:4px'), 6, 'align-items:flex-start'),
  tw0 + 12, 'auto', 'data-e1-field="table"', 'padding:4px 5px;justify-content:flex-start;align-items:flex-start;align-self:stretch');
  // 3. the bar chart: title, both axes and the scale are the child's (one step on the axis is 2)
  const chartW = W - tw0 - 22;
  const chart = white(col(head(X.chart, '', 'font-size:17px') + row(t(X.title, '', 'font-size:15px') + lineBox(chartW - 90, 30), 4, 'justify-content:flex-start;align-items:flex-end') +
    row(t(X.yAxis, '', 'font-size:14px') + lineBox(chartW - 270, 28) + t(X.step, '', 'font-size:13px;color:' + T.teal), 4, 'justify-content:flex-start;align-items:flex-end') +
    art(A.surveyChart({ w: chartW - 16, h: 278, steps: 12,   /* review round 2: 12 steps of 5 mm (to 24), and the line under the chart for a bigger class */ nbars: lv.alts, firstLabels: lv.firstLabels })) + t(X.moreSteps, 'data-e1-moresteps="1"', 'font-size:13px;line-height:15px;color:' + T.teal) + row(t(X.xAxis, '', 'font-size:14px') + lineBox(chartW - 130, 28), 4, 'justify-content:flex-start;align-items:flex-end'), 2, 'align-items:flex-start'),
  chartW, 'auto', 'data-e1-field="chart"', 'padding:4px 8px;justify-content:flex-start;align-items:flex-start');
  const lines = Array.from({ length: 3 }, (_, i) => (i < lv.starters ? frameLine([X.starters[i], W - 60 - Math.round(8.6 * X.starters[i].length)], 36) : lineBox(W - 30, 36))).join('');
  const concl = white(col(head(X.concl, '', 'font-size:17px') + col(lines, 0, 'align-items:flex-start'), 2, 'align-items:flex-start'), W, 'auto', 'data-e1-field="conclusions"', 'padding:4px 12px;flex-shrink:0;justify-content:flex-start');
  const html = q + `<div class="dk-row" style="gap:10px;align-items:stretch;flex:1 1 auto;min-height:0">${table}${chart}</div>` + concl;
  return { html, meta: { record: true, alts: lv.alts, items: ['survey-L' + d.level] } };
};

/* ================================================================ G1-672 — Lägesord (sv) */
LOC['e1-lage'] = 'sv';
/** review round 1 (the Swedish teacher): every level uses "bredvid" (the title promises it) */
const LAGE_LV = {
  1: { draw: ['left', 'right', 'next'], write: ['front', 'behind', 'between'], extras: 0 },
  2: { draw: ['side', 'between', 'above', 'next'], write: ['front', 'behind', 'side'], extras: 1 },
  3: { draw: ['above', 'below', 'side', 'next'], write: ['frontOrBehind', 'between', 'side'], extras: 2 },
};
const ROWS = 3, COLS = 5;
/**
 * EVERY empty place a draw sentence makes true, read as widely as a child might (review round 1, the Swedish teacher: an
 * "ovanför" with two empty places above the thing had two right places). cells[r][c]: null = empty place, string = a
 * thing's id, 'box'.
 *   till vänster / höger om X: every empty place on X's shelf on that side, and the places diagonally beside X on that side
 *     (one shelf up or down);
 *   ovanför / nedanför X: every empty place in X's column on ALL the shelves above (below), and the places diagonally
 *     above (below) X;
 *   bredvid X: the places right beside X on its shelf;
 *   mellan X och Y: the place between them on one shelf.
 * A draw sentence is printed only when this holds exactly ONE empty place, and that place is right beside the thing the
 * sentence names (nextTo; review round 1: name the thing directly beside the place, never a far one with a thing between).
 */
function placesFor(cells, rel, ref, ref2) {
  const at = (id) => { for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) if (cells[r][c] === id) return [r, c]; return null; };
  const [r, c] = at(ref);
  const empty = (rr, cc) => rr >= 0 && rr < ROWS && cc >= 0 && cc < COLS && cells[rr][cc] === null;
  const out = [];
  const add = (rr, cc) => { if (empty(rr, cc) && !out.some((q) => q[0] === rr && q[1] === cc)) out.push([rr, cc]); };
  if (rel === 'left' || rel === 'right') { const dc = rel === 'left' ? -1 : 1; for (let cc = c + dc; cc >= 0 && cc < COLS; cc += dc) add(r, cc); add(r - 1, c + dc); add(r + 1, c + dc); }
  if (rel === 'above' || rel === 'below') { const dr = rel === 'above' ? -1 : 1; for (let rr = r + dr; rr >= 0 && rr < ROWS; rr += dr) add(rr, c); add(r + dr, c - 1); add(r + dr, c + 1); }
  if (rel === 'next') { add(r, c - 1); add(r, c + 1); }
  if (rel === 'between') { const [r2, c2] = at(ref2); if (r2 === r && Math.abs(c2 - c) === 2) add(r, (c + c2) / 2); }
  return out;
}
/** the place is right beside the named thing, on the relation's side */
function nextTo(rel, [r, c], [pr, pc]) {
  if (rel === 'left') return pr === r && pc === c - 1;
  if (rel === 'right') return pr === r && pc === c + 1;
  if (rel === 'above') return pc === c && pr === r - 1;
  if (rel === 'below') return pc === c && pr === r + 1;
  if (rel === 'next') return pr === r && Math.abs(pc - c) === 1;
  return true;
}
MODES['e1-lage'] = (d, rng) => {
  const lv = LAGE_LV[d.level], X = B.TEXT.lage, REL = B.SV_REL;
  const byId = Object.fromEntries(B.SHELF_THINGS.map((x) => [x.id, x]));
  for (let attempt = 0; attempt < 100000; attempt++) {
    // the box on the bottom shelf at one end, two places wide
    const boxLeft = rng.next() < 0.5;
    const cells = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
    const boxCols = boxLeft ? [0, 1] : [COLS - 2, COLS - 1];
    boxCols.forEach((c) => { cells[ROWS - 1][c] = 'box'; });
    const behindId = rng.pick(B.BOX_BEHIND), frontId = rng.pick(B.BOX_FRONT.filter((x) => x !== behindId));
    const free = rng.shuffle(B.SHELF_THINGS.filter((x) => x.id !== behindId && x.id !== frontId).map((x) => x.id));
    // fill about seven of the other thirteen places with things
    const places = [];
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) if (cells[r][c] === null) places.push([r, c]);
    const nThings = rint(rng, 6, 8);
    rng.shuffle(places).slice(0, nThings).forEach(([r, c], i) => { cells[r][c] = free[i]; });
    const things = free.slice(0, nThings);
    // the write items
    const writes = [];
    const writeKinds = rng.shuffle(lv.write.map((w) => (w === 'frontOrBehind' ? (rng.next() < 0.5 ? 'front' : 'behind') : w === 'side' ? (rng.next() < 0.5 ? 'left' : 'right') : w)));
    let okW = true;
    const at = (id) => { for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) if (cells[r][c] === id) return [r, c]; return null; };
    for (const wk of writeKinds) {
      if (wk === 'front') writes.push({ rel: 'front', subj: frontId, ref: 'box' });
      else if (wk === 'behind') writes.push({ rel: 'behind', subj: behindId, ref: 'box' });
      else if (wk === 'between') {
        // A _ Z _ B on one shelf: Z between A and B, an empty place on each side (so "bredvid" is false)
        const cand = [];
        for (const z of things) { const [r, c] = at(z); if (c - 2 >= 0 && c + 2 < COLS && cells[r][c - 1] === null && cells[r][c + 1] === null && things.includes(cells[r][c - 2]) && things.includes(cells[r][c + 2])) cand.push({ subj: z, ref: cells[r][c - 2], ref2: cells[r][c + 2] }); }
        if (!cand.length) { okW = false; break; }
        writes.push({ rel: 'between', ...rng.pick(cand) });
      } else {
        // X ___ Y on one shelf, not side by side (an empty place or more between: "bredvid" is false)
        const cand = [];
        for (const x of things) for (const y of things) { if (x === y) continue; const [rx, cx] = at(x), [ry, cy] = at(y); if (rx !== ry) continue; if (wk === 'left' ? cy - cx >= 2 : cx - cy >= 2) cand.push({ subj: x, ref: y }); }
        if (!cand.length) { okW = false; break; }
        writes.push({ rel: wk, ...rng.pick(cand) });
      }
    }
    if (!okW) continue;
    const subjects = writes.map((w) => w.subj);
    if (new Set(subjects).size !== subjects.length) continue;
    // the draw items: each names exactly ONE empty place; distinct places; references are things (never the box)
    // (a few tries on the same shelf: the relations are matched to things in a drawn order, and an early pick can use up
    // the only thing a later relation fits)
    let draws = [], usedRefs, targets, okD = false;
    for (let dtry = 0; dtry < 25 && !okD; dtry++) {
    draws = [];
    usedRefs = new Set(writes.flatMap((w) => [w.subj, w.ref, w.ref2].filter(Boolean)));
    targets = new Set();
    okD = true;
    for (const rel0 of rng.shuffle(lv.draw)) {
      const rel = rel0 === 'side' ? (rng.next() < 0.5 ? 'left' : 'right') : rel0;
      const cand = [];
      for (const x of things) {
        if (usedRefs.has(x)) continue;
        if (rel === 'between') {
          for (const y of things) { if (y === x || usedRefs.has(y)) continue; const [r1, c1] = at(x), [r2, c2] = at(y); if (r1 !== r2 || c2 - c1 !== 2) continue; const p = placesFor(cells, 'between', x, y); if (p.length === 1 && !targets.has(p[0].join())) cand.push({ rel, ref: x, ref2: y, place: p[0] }); }
          continue;
        }
        const p = placesFor(cells, rel, x);
        if (p.length !== 1 || targets.has(p[0].join()) || !nextTo(rel, at(x), p[0])) continue;
        cand.push({ rel, ref: x, place: p[0] });
      }
      if (!cand.length) { okD = false; break; }
      const pk = rng.pick(cand);
      draws.push(pk); targets.add(pk.place.join()); usedRefs.add(pk.ref); if (pk.ref2) usedRefs.add(pk.ref2);
    }
    }
    if (!okD) continue;
    // at least two empty places stay empty (the last sentence is never forced by elimination)
    const empties = []; for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) if (cells[r][c] === null) empties.push([r, c]);
    if (empties.length - draws.length < 2) continue;
    // the word box: the answers (each once) and the level's extra words, none of which fits any write sentence
    const answers = writes.map((w) => REL[w.rel]);
    const extraPool = ['bredvid', 'nedanför'].filter((x) => !answers.includes(x));
    const extras = rng.shuffle(extraPool).slice(0, lv.extras);
    if (extras.length < lv.extras) continue;
    const box = rng.shuffle([...answers, ...extras]);
    // the sentences in a drawn order (the hardest relation is found first, so the order they were found in is not the
    // order they are printed in); the drawing things one each, in a drawn order
    draws.splice(0, draws.length, ...rng.shuffle(draws.slice()));
    writes.splice(0, writes.length, ...rng.shuffle(writes.slice()));
    const drawThings = rng.shuffle(B.DRAW_THINGS.slice()).slice(0, draws.length);
    // build
    const cellObj = cells.map((rw, r) => rw.map((v, c) => {
      if (v === null) return null;
      if (v === 'box') { if (c !== boxCols[0]) return { spacer: true }; return { box: true, span: 2, behind: { src: src(byId[behindId].pic), key: behindId, pic: byId[behindId].pic.join('/') }, front: { src: src(byId[frontId].pic), key: frontId, pic: byId[frontId].pic.join('/') } }; }
      return { src: src(byId[v].pic), key: v, pic: byId[v].pic.join('/') };
    }));
    const shelfSvg = A.shelf({ rows: ROWS, cols: COLS, cells: cellObj, cw: 120, ch: d.level === 1 ? 108 : 100, picPx: d.level === 1 ? 80 : 74, attrs: `data-e1-boxat="${ROWS - 1},${boxCols[0]}"` });
    const name = (id) => (id === 'box' ? X.box : byId[id].def);
    const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
    const drawRows = draws.map((dr, k) => {
      const s = `${X.draw} ${drawThings[k].sv} ${REL[dr.rel]} ${name(dr.ref)}${dr.ref2 ? ' och ' + name(dr.ref2) : ''}.`;
      return row(badge(String(k + 1)) + t(s, `data-e1-draw="${dr.place.join(',')}" data-e1-rel="${dr.rel}" data-e1-ref="${dr.ref}${dr.ref2 ? ',' + dr.ref2 : ''}" data-e1-thing="${drawThings[k].id}"`), 8, 'justify-content:flex-start');
    }).join('');
    const writeRows = writes.map((w, k) => {
      const verb = byId[w.subj].verb;
      return row(badge(String(draws.length + k + 1)) + t(`${cap(name(w.subj))} ${verb}`, '', 'font-size:16px') + lineBox(w.ref2 ? 270 : 340, 40, `data-e1-answer="${esc(REL[w.rel])}" data-e1-write="${w.rel}" data-e1-subj="${w.subj}" data-e1-ref="${w.ref}${w.ref2 ? ',' + w.ref2 : ''}"`) + t(`${name(w.ref)}${w.ref2 ? ' och ' + name(w.ref2) : ''}.`, 'data-e1-reftext="1"', 'font-size:16px;white-space:nowrap'), 6, 'justify-content:flex-start;align-items:flex-end');
    }).join('');
    const sideLabels = row(t('← ' + X.left, 'data-e1-side="left"', 'font-size:19px;line-height:22px;color:' + T.teal) + t(X.right + ' →', 'data-e1-side="right"', 'font-size:19px;line-height:22px;color:' + T.teal), 10, 'justify-content:space-between;width:' + (COLS * 120 + 28) + 'px');
    const wordBox = white(row(t(X.wordsHead, '', 'color:' + T.teal) + box.map((w) => chip(w, `data-e1-word="${esc(w)}"`)).join(''), 10, 'justify-content:flex-start;flex-wrap:wrap'), W, 'auto', 'data-e1-wordbox="1"', 'padding:5px 12px;flex-shrink:0;justify-content:flex-start');
    const html = col(art(shelfSvg, 'data-e1-shelfbox="1"') + sideLabels, 2) +
      col(drawRows, 9, 'align-items:flex-start;width:100%') + wordBox + col(writeRows, 10, 'align-items:flex-start;width:100%');
    return {
      html,
      meta: {
        cells: cells.map((rw) => rw.map((v) => v || '-').join(' ')).join(' / '), behind: behindId, front: frontId,
        draws: draws.map((x) => `${x.rel}:${x.ref}${x.ref2 ? '+' + x.ref2 : ''}@${x.place.join(',')}`), writes: writes.map((w) => `${w.rel}:${w.subj}>${w.ref}${w.ref2 ? '+' + w.ref2 : ''}`), box,
        items: draws.map((x) => `${x.rel}:${x.ref}`).concat(writes.map((w) => `${w.rel}:${w.subj}`)),
      },
    };
  }
  throw new Error('e1-lage: no shelf for level ' + d.level);
};

/* ================================================================ the page check */
/** per mode: what the rendered page must hold (each check proves it found something to judge) */
function e1VerifyInPage() {
  const f = [];
  const R = document.querySelector('[data-dk]');
  if (!R) return ['no e1 root'];
  const mode = R.dataset.dk, lv = Number(R.dataset.e1Level);
  const rect = (e) => e.getBoundingClientRect();
  const inside = (a, b, tol = 1) => a.left >= b.left - tol && a.right <= b.right + tol && a.top >= b.top - tol && a.bottom <= b.bottom + tol;
  const overlap = (a, b) => Math.min(a.right, b.right) - Math.max(a.left, b.left) > 1 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 1;
  // every answer box is a box a child can write in (at least 28 px tall and 50 px wide)
  const boxes = [...R.querySelectorAll('[data-e1-answer].ws-blankbox')];
  boxes.forEach((b) => { const r = rect(b); if (r.height < 27.5 || r.width < 49.5) f.push(`an answer box ${Math.round(r.width)}x${Math.round(r.height)} px`); });
  // every play note (review round 2): its value large in the middle; the corner numerals inside the inner frame, clear of
  // it and of the middle value
  R.querySelectorAll('svg[data-e1-money="note"]').forEach((nt) => {
    const v = nt.dataset.e1Value, mid = nt.querySelector('[data-e1-mid]'), fr = nt.querySelector('[data-e1-frame]');
    if (!mid || ![v + ' kr', v + ' €'].includes(mid.textContent.replace(/\s/g, ' ').trim()) || +mid.getAttribute('font-size') < 11) { f.push(`a ${v} note without its value large in the middle`); return; }
    // a text's box is its font's em box, taller than its digits: measure the digits (cap height about 0.72 em) round the
    // text's middle, and its width as laid out
    const ink = (e) => { const r = rect(e), c = (r.top + r.bottom) / 2, h = 0.36 * +e.getAttribute('font-size'); return { left: r.left, right: r.right, top: c - h, bottom: c + h }; };
    const m = ink(mid), F = rect(fr);
    nt.querySelectorAll('[data-e1-corner]').forEach((c) => {
      const r = ink(c);
      if (!(r.left >= F.left + 2 && r.right <= F.right - 2 && r.top >= F.top + 2 && r.bottom <= F.bottom - 2)) f.push(`a ${v} note: a corner numeral touches its frame`);
      if (overlap(r, m)) f.push(`a ${v} note: a corner numeral runs into the middle value`);
    });
  });
  if (mode === 'e1-markt') {
    const goods = [...R.querySelectorAll('[data-e1-good]')];
    if (goods.length !== 6) f.push(`the stall shows ${goods.length} goods`);
    const prices = goods.map((g) => +g.dataset.e1Price);
    if (new Set(prices).size !== prices.length) f.push('two goods with one price');
    goods.forEach((g) => { const tag = g.querySelector('[data-lcs-prim="price-tag"]'); if (!tag || +tag.dataset.lcsPrice !== +g.dataset.e1Price) f.push('a price tag is not its good\'s price'); const tx = tag && tag.querySelector('text').textContent.replace(/\s/g, ' '); if (tx !== g.dataset.e1Price + ' €') f.push(`a tag reads "${tx}"`); });
    const cards = [...R.querySelectorAll('[data-e1-card]')];
    if (!cards.length) f.push('no cards');
    cards.forEach((c) => {
      const [i, j] = c.dataset.e1Items.split(',').map(Number);
      const refs = [...c.querySelectorAll('[data-e1-ref]')].map((e) => +e.dataset.e1Ref);
      if (refs.join() !== [i, j].join()) f.push(`card ${c.dataset.e1Card}: pictures ${refs} are not its goods ${i},${j}`);
      refs.forEach((r) => { const a = c.querySelector(`[data-e1-ref="${r}"]`).getAttribute('src'), b = goods[r] && goods[r].querySelector('img').getAttribute('src'); if (a !== b) f.push(`card ${c.dataset.e1Card}: a picture not on the stall`); });
      const total = prices[i] + prices[j];
      const tb = c.querySelector('[data-e1-total]');
      if (!tb || +tb.dataset.e1Answer !== total) f.push(`card ${c.dataset.e1Card}: the total box is not ${total}`);
      if (c.dataset.e1Kind === 'exact') {
        const pieces = [...c.querySelectorAll('[data-e1-piece]')];
        const vals = pieces.map((p) => +p.dataset.e1Piece);
        const drawn = pieces.map((p) => +p.querySelector('[data-e1-value]').dataset.e1Value);
        if (vals.join() !== drawn.join()) f.push(`card ${c.dataset.e1Card}: a piece is not the money it says`);
        let ways = 0; for (let m = 1; m < (1 << vals.length); m++) { let s = 0; for (let k = 0; k < vals.length; k++) if (m & (1 << k)) s += vals[k]; if (s === total) ways++; }
        if (ways !== 1) f.push(`card ${c.dataset.e1Card}: ${ways} ways to circle ${total} €`);
        const right = pieces.filter((p) => p.dataset.e1Right).map((p) => +p.dataset.e1Piece);
        if (right.reduce((s, v) => s + v, 0) !== total) f.push(`card ${c.dataset.e1Card}: the stamped money is not ${total} €`);
        const pr = rect(c.querySelector('[data-e1-purse]'));
        pieces.forEach((p, k) => { if (!inside(rect(p), pr)) f.push(`card ${c.dataset.e1Card}: a piece outside the purse`); pieces.slice(k + 1).forEach((q) => { const a = rect(p), b = rect(q); const gap = Math.max(b.left - a.right, a.left - b.right, b.top - a.bottom, a.top - b.bottom); if (gap < 8) f.push(`card ${c.dataset.e1Card}: two pieces ${Math.round(gap)} px apart (no room to circle one)`); }); });
      } else {
        const paid = +c.querySelector('[data-e1-paid]').dataset.e1Paid, cb = c.querySelector('[data-e1-change]');
        if (!cb || +cb.dataset.e1Answer !== paid - total || paid - total < 1) f.push(`card ${c.dataset.e1Card}: the change is not ${paid} − ${total}`);
      }
    });
  }
  if (mode === 'e1-vaxel') {
    const cards = [...R.querySelectorAll('[data-e1-card]')];
    if (cards.length < 4) f.push(`${cards.length} cards`);
    cards.forEach((c) => {
      const price = +c.dataset.e1Price, note = +c.dataset.e1Note;
      const tag = c.querySelector('[data-lcs-prim="price-tag"]');
      if (!tag || +tag.dataset.lcsPrice !== price || tag.querySelector('text').textContent.replace(/\s/g, ' ') !== price + ' kr') f.push(`card ${c.dataset.e1Card}: the tag is not ${price} kr`);
      const nt = c.querySelector('[data-e1-paid] [data-e1-money="note"]');
      if (!nt || +nt.dataset.e1Value !== note) f.push(`card ${c.dataset.e1Card}: the note is not ${note} kr`);
      const cb = c.querySelector('[data-e1-change]');
      if (!cb || +cb.dataset.e1Answer !== note - price) f.push(`card ${c.dataset.e1Card}: the change box is not ${note - price}`);
      const dr = c.querySelector('[data-e1-draw]');
      if (!dr || rect(dr).height < 58) f.push(`card ${c.dataset.e1Card}: no room to draw the change (${dr ? Math.round(rect(dr).height) : 0} px)`);
      const ends = [...c.querySelectorAll('[data-e1-endlabel]')].map((e) => e.dataset.e1Endlabel);
      if (lv === 1 ? ends.join() !== price + ',' + note : ends.length) f.push(`card ${c.dataset.e1Card}: the line's end labels ${ends}`);
      if (!c.querySelector('[data-e1-line]')) f.push(`card ${c.dataset.e1Card}: no number line`);
    });
  }
  if (mode === 'e1-kilo') {
    const meas = [...R.querySelectorAll('[data-e1-meas]')];
    if (!meas.length) f.push('nothing to weigh');
    meas.forEach((m) => {
      const n = +m.dataset.e1N, ab = m.querySelector('[data-e1-kg]');
      if (!ab || +ab.dataset.e1Answer !== n) f.push(`measure ${m.dataset.e1Meas}: the box is not ${n} kg`);
      if (m.dataset.e1Kind === 'balance') {
        const w = m.querySelectorAll('[data-e1-weight]').length;
        if (w !== n) f.push(`measure ${m.dataset.e1Meas}: ${w} weights drawn for ${n} kg`);
        const pan = rect(m.querySelector('[data-e1-pan="right"]'));
        m.querySelectorAll('[data-e1-weight]').forEach((g) => { const r = rect(g); if (r.left < pan.left - 2 || r.right > pan.right + 2) f.push(`measure ${m.dataset.e1Meas}: a weight off its pan`); });
        const obj = rect(m.querySelector('[data-e1-object]')), lp = rect(m.querySelector('[data-e1-pan="left"]'));
        if (!(obj.top < lp.top - 10 && obj.bottom > lp.top - 4 && obj.bottom < lp.bottom + obj.height * 0.5) || obj.left + obj.width / 2 < lp.left || obj.left + obj.width / 2 > lp.right) f.push(`measure ${m.dataset.e1Meas}: the thing is not in its pan`);
      } else {
        const nd = m.querySelector('[data-e1-needle]'), dial = rect(m.querySelector('[data-e1-dial]'));
        if (!nd || +nd.dataset.e1Needle !== n) f.push(`measure ${m.dataset.e1Meas}: the pointer is not at ${n}`);
        // the pointer's tip lies on the line from the dial's centre through the tick of n
        const tick = m.querySelector(`[data-e1-tick="${n}"]`);
        if (!tick) f.push(`measure ${m.dataset.e1Meas}: no tick for ${n}`);
        else { const tr = rect(tick), ndr = rect(nd); const cx = dial.left + dial.width / 2, cy = dial.top + dial.height / 2; const tx = tr.left + tr.width / 2 - cx, ty = tr.top + tr.height / 2 - cy; const tipx = (Math.abs(ndr.left - cx) > Math.abs(ndr.right - cx) ? ndr.left : ndr.right) - cx, tipy = (Math.abs(ndr.top - cy) > Math.abs(ndr.bottom - cy) ? ndr.top : ndr.bottom) - cy; const ang = Math.abs(Math.atan2(tx * tipy - ty * tipx, tx * tipx + ty * tipy)); if (ang > 0.2) f.push(`measure ${m.dataset.e1Meas}: the pointer does not point at ${n} (${ang.toFixed(2)} rad)`); }
        const nums = [...m.querySelectorAll('[data-e1-dialnum]')].map((e) => +e.dataset.e1Dialnum);
        const ev = +m.querySelector('[data-e1-art="kitchen-scale"]').dataset.e1Every;
        if (nums.join() !== Array.from({ length: 11 }, (_, k) => k).filter((k) => k % ev === 0).join()) f.push(`measure ${m.dataset.e1Meas}: dial numerals ${nums}`);
        nums.forEach((k) => { const a = rect(m.querySelector(`[data-e1-dialnum="${k}"]`)); const nr = rect(nd); if (k === n && false) return; if (overlap(a, { left: nr.left, right: nr.right, top: nr.top, bottom: nr.bottom }) && Math.abs(k - n) > 1) {} });
      }
    });
    const cmp = [...R.querySelectorAll('[data-e1-cmp]')];
    if (!cmp.length) f.push('nothing to compare with 1 kg');
    cmp.forEach((c) => {
      const right = c.querySelector('[data-dk-answer="right"]');
      const want = { more: 'mer än 1 kg', less: 'mindre än 1 kg', about: 'ungefär 1 kg' }[c.dataset.e1Truth];
      if (!right || right.textContent.trim() !== want) f.push(`compare ${c.dataset.e1Cmp}: the right choice is not "${want}"`);
      const bal = c.querySelector('[data-e1-art="balance"]');
      if (bal) {
        const lp = rect(bal.querySelector('[data-e1-pan="left"]')), rp = rect(bal.querySelector('[data-e1-pan="right"]'));
        const tiltSeen = lp.top > rp.top + 4 ? 'more' : rp.top > lp.top + 4 ? 'less' : 'about';
        if (tiltSeen !== c.dataset.e1Truth) f.push(`compare ${c.dataset.e1Cmp}: the balance shows ${tiltSeen}, the answer is ${c.dataset.e1Truth}`);
      }
    });
  }
  if (mode === 'e1-tid') {
    const pairs = [...R.querySelectorAll('[data-e1-pair]')];
    if (pairs.length < 3) f.push(`${pairs.length} clock pairs`);
    pairs.forEach((p) => {
      const clocks = [...p.querySelectorAll('[data-e1-clock]')];
      if (clocks.length !== 2) { f.push(`pair ${p.dataset.e1Pair}: ${clocks.length} clocks`); return; }
      const tm = (c) => [+c.dataset.lcsH, +c.dataset.lcsM];
      const [h1, m1] = tm(clocks[0]), [h2, m2] = tm(clocks[1]);
      // the hands drawn: the minute hand at the minutes, the hour hand between the hours
      clocks.forEach((c) => { const mh = c.querySelector('[data-lcs-minutehand]'), hh = c.querySelector('[data-lcs-hourhand]'); const [h, m] = tm(c); if (Math.abs(+mh.dataset.lcsMinutehand - m * 6) > 0.1 || Math.abs(+hh.dataset.lcsHourhand - ((h % 12) + m / 60) * 30) > 0.1) f.push(`pair ${p.dataset.e1Pair}: a clock's hands are not at ${h}:${m}`); });
      let d = ((h2 % 12) * 60 + m2) - ((h1 % 12) * 60 + m1); if (d <= 0) d += 720;
      if (d !== +p.dataset.e1Dur) f.push(`pair ${p.dataset.e1Pair}: the clocks are ${d} minutes apart, the stamp says ${p.dataset.e1Dur}`);
      const hb = p.querySelector('[data-e1-hours]'), mb = p.querySelector('[data-e1-minutes]');
      if (!hb || !mb || +hb.dataset.e1Answer * 60 + +mb.dataset.e1Answer !== d) f.push(`pair ${p.dataset.e1Pair}: the answer boxes are not ${d} minutes`);
      const words = [...p.querySelectorAll('[data-e1-clockword]')];
      if (lv === 1 && words.length !== 2) f.push(`pair ${p.dataset.e1Pair}: ${words.length} clock words`);
      if (lv !== 1 && words.length) f.push(`pair ${p.dataset.e1Pair}: clock words printed at level ${lv}`);
    });
    const acts = [...R.querySelectorAll('[data-e1-units] [data-g1-one]')];
    if (acts.length !== 6) f.push(`${acts.length} activities`);
  }
  if (mode === 'e1-halb') {
    const tasks = [...R.querySelectorAll('[data-e1-task]')];
    if (!tasks.length) f.push('no tasks');
    tasks.forEach((q) => {
      const a = +q.dataset.e1A, b = +q.dataset.e1B;
      const sb = q.querySelector('[data-e1-sum]');
      if (!sb || +sb.dataset.e1Answer !== a + b || a + b > 1000) f.push(`task ${q.dataset.e1Task}: the sum box`);
      const steps = [1, 2, 3].map((i) => ['a', 'b', 'c'].map((x) => q.querySelector(`[data-e1-step="${i}${x}"]`)));
      if (steps.flat().some((e) => !e)) { f.push(`task ${q.dataset.e1Task}: a step line is missing`); return; }
      const v = steps.map((s) => s.map((e) => +e.dataset.e1Answer));
      const [h, z, e] = [Math.floor(b / 100) * 100, (Math.floor(b / 10) % 10) * 10, b % 10];
      if (v[0][0] !== a || v[0][1] !== h || v[1][1] !== z || v[2][1] !== e || v[0][2] !== a + h || v[1][0] !== v[0][2] || v[1][2] !== v[1][0] + z || v[2][0] !== v[1][2] || v[2][2] !== a + b) f.push(`task ${q.dataset.e1Task}: the steps are not hundreds, tens, ones`);
      const ln = q.querySelector('[data-e1-strich]');
      if (!ln) f.push(`task ${q.dataset.e1Task}: no Rechenstrich`);
      else {
        // the room over the line (for the jumps and "+300") from the task row's foot, and under it (for the stop numbers)
        // to the first step line: about 15 mm and 9 mm at print (review round 2), 3.78 px a millimetre
        const ly = rect(ln).top + rect(ln).height / 2, head = sb.parentElement.getBoundingClientRect().bottom, first = rect(steps[0][0]).top;
        if (ly - head < 57) f.push(`task ${q.dataset.e1Task}: ${Math.round(ly - head)} px over the Rechenstrich (15 mm = 57 px)`);
        if (first - ly < 34) f.push(`task ${q.dataset.e1Task}: ${Math.round(first - ly)} px under the Rechenstrich (9 mm = 34 px)`);
      }
      // no answer printed: no number of the page's text is a step result or the sum
      const txt = [...q.querySelectorAll('.e1-t, .e1-big')].map((x) => x.textContent).join(' ');
      for (const n of [v[0][2], v[1][2], a + b]) if (new RegExp('(^|\\D)' + n + '(\\D|$)').test(txt)) f.push(`task ${q.dataset.e1Task}: ${n} printed`);
    });
    const ex = R.querySelector('[data-e1-explain]');
    if (!ex || ex.querySelectorAll('[data-dk-writerow]').length < 3) f.push('the explanation has no two lines and the checker line');
  }
  if (mode === 'e1-ueber') {
    const items = [...R.querySelectorAll('[data-e1-item]')];
    if (!items.length) f.push('no items');
    const rnd = (n) => Math.floor((n + 50) / 100) * 100;
    items.forEach((it) => {
      const calc = it.querySelector('[data-e1-art="column"]');
      const a = +calc.dataset.e1Top, b = +calc.dataset.e1Bottom, o = calc.dataset.e1Op, printed = +calc.dataset.e1Printed, shift = +calc.dataset.e1Shift;
      if (shift) f.push(`item ${it.dataset.e1Item}: a column drawn misaligned (its layout would tell the box)`);
      // the digits drawn are the numbers the stamps say (read from the drawing: row by row, right to left)
      const rowsTxt = [0, 1, 2].map((r) => [...calc.querySelectorAll(`[data-e1-digit="${r}"]`)].map((x) => ({ x: rect(x).left, d: x.textContent })).sort((p, q) => p.x - q.x).map((x) => x.d).join(''));
      if (+rowsTxt[0] !== a || +rowsTxt[1] !== b || +rowsTxt[2] !== printed) f.push(`item ${it.dataset.e1Item}: the column shows ${rowsTxt}`);
      if ([a, b].some((n) => n % 100 === 50)) f.push(`item ${it.dataset.e1Item}: a number rounds at 50`);
      const E = o === 'plus' ? rnd(a) + rnd(b) : rnd(a) - rnd(b), tru = o === 'plus' ? a + b : a - b;
      const can = Math.abs(printed - E) <= 100;
      const right = it.querySelector('[data-e1-ticks] [data-dk-answer="right"]');
      if (!right || right.textContent.trim() !== (can ? 'kann stimmen' : 'kann nicht stimmen')) f.push(`item ${it.dataset.e1Item}: the box by the rule is ${can ? 'kann stimmen' : 'kann nicht stimmen'}`);
      if (Math.abs(printed - E) > 70 && Math.abs(printed - E) < 151) f.push(`item ${it.dataset.e1Item}: ${Math.abs(printed - E)} from the estimate (between 70 and 151: too near the rule's 100)`);
      if (E < 100) f.push(`item ${it.dataset.e1Item}: an Überschlag of ${E}`);
      // the chips sit on the Überschlag's line, under its boxes, after "Nach dem Überschlag:"
      const eb = rect(it.querySelector('[data-e1-est]')), tk = rect(it.querySelector('[data-e1-ticks]'));
      if (!(tk.top >= eb.bottom - 2 && tk.top - eb.bottom < 40 && tk.left < eb.right)) f.push(`item ${it.dataset.e1Item}: the chips are not on the Überschlag's line`);
      if (+it.querySelector('[data-e1-est]').dataset.e1Answer !== E || +it.querySelector('[data-e1-ra]').dataset.e1Answer !== rnd(a) || +it.querySelector('[data-e1-rb]').dataset.e1Answer !== rnd(b)) f.push(`item ${it.dataset.e1Item}: the estimate boxes`);
      if (+it.querySelector('[data-e1-fix]').dataset.e1Answer !== tru) f.push(`item ${it.dataset.e1Item}: the right result is not ${tru}`);
      if (it.dataset.e1Kind === 'ok' ? printed !== tru : printed === tru) f.push(`item ${it.dataset.e1Item}: the kind ${it.dataset.e1Kind} for ${printed} (right ${tru})`);
      if (it.dataset.e1Kind === 'small' && !can) f.push(`item ${it.dataset.e1Item}: a small error the estimate sees`);
      if (it.dataset.e1Kind === 'small' && it.dataset.e1Probe !== '1') f.push(`item ${it.dataset.e1Item}: an error only the Probe finds has no Probe`);
      const pc = R.querySelector(`[data-e1-probefor="${it.dataset.e1Item}"]`);
      if ((it.dataset.e1Probe === '1') !== !!pc) f.push(`item ${it.dataset.e1Item}: the Probe card`);
      if (pc) { if (pc.dataset.e1Probeok !== (printed === tru ? '1' : '0')) f.push(`Probe ${it.dataset.e1Item}: the outcome stamp`); if (!pc.querySelector('[data-e1-art="kaestchen"]')) f.push(`Probe ${it.dataset.e1Item}: no squares to calculate in`); }
    });
    if (!R.querySelector('[data-e1-rule]') || !/mehr als 100/.test(R.querySelector('[data-e1-rule]').textContent)) f.push('the estimate rule is not printed');
  }
  if (mode === 'e1-undersokning') {
    if (R.querySelectorAll('[data-e1-answer], [data-dk-answer]').length) f.push('a record page carries an answer');
    const ch = R.querySelector('[data-e1-art="survey-chart"]');
    if (!ch || +ch.dataset.e1Steps !== 12) f.push('the chart has not 12 steps (to 24)');
    else {
      // review round 2: an åk 3 child writes the scale numbers in the steps: each at least 5 mm (3.78 px a mm: 18.9 px)
      const ys = [...ch.querySelectorAll('[data-e1-ytick]')].map((e) => rect(e).top).sort((x, y) => x - y);
      const gaps = ys.slice(1).map((y, i) => y - ys[i]);
      if (!gaps.length || Math.min(...gaps) < 18.9) f.push(`a scale step ${gaps.length ? Math.min(...gaps).toFixed(1) : 0} px (5 mm = 18.9 px)`);
      if (!R.querySelector('[data-e1-moresteps]')) f.push('no "Rita fler steg om det behövs." under the chart');
    }
    const fields = [...R.querySelectorAll('[data-e1-field]')].map((x) => x.dataset.e1Field);
    if (fields.join() !== 'question,table,chart,conclusions') f.push('the four fields: ' + fields);
    if (R.querySelectorAll('[data-e1-field="conclusions"] [data-dk-writerow]').length !== 3) f.push('not three conclusion lines');
    // every writing line long enough to write on
    R.querySelectorAll('[data-dk-writerow]').forEach((w) => { if (rect(w).width < 60) f.push(`a writing line ${Math.round(rect(w).width)} px`); });
  }
  if (mode === 'e1-lage') {
    const sh = R.querySelector('[data-e1-art="shelf"]');
    if (!sh) return f.concat('no shelf');
    const places = [...sh.querySelectorAll('[data-e1-empty]')];
    const draws = [...R.querySelectorAll('[data-e1-draw]')];
    if (!draws.length) f.push('no draw sentences');
    draws.forEach((d) => { const p = sh.querySelector(`[data-e1-place="${d.dataset.e1Draw}"][data-e1-empty]`); if (!p) f.push(`sentence ${d.textContent.trim()}: its place is not an empty place`); });
    const writes = [...R.querySelectorAll('[data-e1-write]')];
    if (writes.length !== 3) f.push(`${writes.length} write sentences`);
    const words = [...R.querySelectorAll('[data-e1-word]')].map((w) => w.dataset.e1Word);
    writes.forEach((w) => { if (!words.includes(w.dataset.e1Answer)) f.push(`the answer "${w.dataset.e1Answer}" is not in the word box`); });
    // the box drawing: the thing behind it is drawn first and shows only above the box; the thing in front is drawn last
    const bx = sh.querySelector('[data-e1-box]');
    const beh = sh.querySelector('[data-e1-rel="behind"]'), fr = sh.querySelector('[data-e1-rel="front"]');
    if (!bx || !beh || !fr) f.push('the box, the thing behind it or the thing in front of it is missing');
    else {
      const kids = [...sh.children];
      if (!(kids.indexOf(beh) < kids.indexOf(bx) && kids.indexOf(bx) < kids.indexOf(fr))) f.push('behind / box / front are not drawn in that order');
      const b = rect(bx), bh = rect(beh), ft = rect(fr);
      if (bh.bottom < b.top + 6) f.push('the thing behind the box floats above it');
      // in front: as big as the other things on the shelf, standing on the board over the box's face, the box showing on
      // both sides of its drawing, and apart from the thing behind (both measured on the drawings' ink, data-e1-ink)
      const ink = (e, r0) => { const [l, w] = e.dataset.e1Ink.split(',').map(Number); return { l: r0.left + l, r: r0.left + l + w }; };
      const fi = ink(fr, ft), bi = ink(beh, bh);
      const others = [...sh.querySelectorAll('image[data-e1-key]:not([data-e1-rel])')].map((e) => rect(e).height);
      const size = others.length ? Math.max(...others) : 0;
      // review round 2: at least 38 px (10 mm at print) of box face on BOTH sides of the figure in front, so it stands in
      // front of the box and not beside it
      if (!(fi.l >= b.left + 38 && fi.r <= b.right - 38)) f.push(`the thing in front is not in front of the box (box beside it: ${Math.round(fi.l - b.left)} px left, ${Math.round(b.right - fi.r)} px right; at least 38 px, 10 mm, on both sides)`);
      if (ft.bottom < b.bottom - 2) f.push('the thing in front does not stand on the board');
      if (!size || ft.height < size * 0.95) f.push('the thing in front is smaller than the other things on the shelf');
      if (fi.r > bi.l - 2) f.push('the thing in front and the thing behind overlap');
    }
    R.querySelectorAll('[data-e1-write]').forEach((w) => {
      // a one-thing sentence may take "till vänster om": about 90 mm (330 px); a two-thing sentence takes "mellan": about 70 mm
      const two = w.dataset.e1Ref.includes(','), need = two ? 260 : 330;
      if (rect(w).width < need) f.push(`a write line ${Math.round(rect(w).width)} px (${two ? '"mellan" needs about 70 mm, 260 px' : '"till vänster om" in a first grader\'s hand needs about 90 mm, 330 px'})`);
      // review round 2: the words after the line on ONE line, beside it (never wrapped above it)
      const rt = w.parentElement.querySelector('[data-e1-reftext]');
      if (!rt || rect(rt).height > 26 || rect(rt).left < rect(w).right - 1) f.push(`a write sentence's end wraps or leaves the line (${rt ? Math.round(rect(rt).height) : 0} px high)`);
    });
    const lbl = [...R.querySelectorAll('[data-e1-side]')].map((e) => e.dataset.e1Side);
    if (lbl.join() !== 'left,right') f.push('the left / right labels');
  }
  return f;
}

/** makeE1Type({ id, slug, mode, exerciseType, gradeBand, difficulty, i18n }) */
function makeE1Type({ id, slug, mode, exerciseType, gradeBand, i18n }) {
  if (!MODES[mode]) throw new Error('e1-math: unknown mode ' + mode);
  const only = LOC[mode];
  return {
    id, slug, gradeBand, assetClass: 'icon-placement', exerciseType,
    themeAxis: { applicable: false },
    onlyLocales: [only],
    difficulty: { 1: {}, 2: {}, 3: {} },
    i18n,
    e1Mode: mode,
    build({ difficulty: lv, locale }, ctx) {
      const L = String(locale || 'en').slice(0, 2);
      if (L !== only) throw new Error(`${id}: printed in ${only} only (no ${locale} page; the type teaches a ${only === 'de' ? 'German' : 'Swedish'} lesson)`);
      const d = { level: Number(lv) || 2 };
      const out = MODES[mode](d, ctx.rng, ctx);
      return {
        bodyHtml: `<style>${DK.CSS}${E1CSS}</style><div class="dk-root" data-ws-content data-dk="${mode}" data-e1-level="${d.level}" data-e1-locale="${only}" data-dk-record="${out.meta.record ? 1 : 0}">${out.html}</div>`,
        meta: { mode, level: d.level, ...out.meta },
      };
    },
    levelSetWords(meta) { return (meta.items || []).map(String); },
    async verify(page) {
      return [].concat(await page.evaluate(DK.dkVerifyInPage), await page.evaluate(G.g1VerifyInPage), await page.evaluate(e1VerifyInPage));
    },
  };
}

module.exports = { makeE1Type, MODES, LOC, e1VerifyInPage, subsetsSumming, fewestWays, halbSteps, halbCross, halbOnesHundred, round100, estimateOf, smallerFromLarger, wrongResults, placesFor, nextTo, svClock, MARKT_LV, VAXEL_LV, KILO_LV, TID_LV, HALB_LV, UEBER_LV, UND_LV, LAGE_LV };
