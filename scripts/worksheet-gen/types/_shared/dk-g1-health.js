/**
 * dk-g1-health.js — the health modes of the Batch 1 Grade 1 pages (Daily Teaching System Stage D-5, 2026-11-23),
 * registered in the MODES table of types/_shared/dk-g1.js (the kit, the type maker and the page check live there):
 *   G1-644 g1-ask-first      Ask a Grown-Up First          (healthy-habits, NHES.5.2.2)
 *   G1-645 g1-myplate-sort   MyPlate: Five Food Groups     (science-sort, NHES.7.2.1)
 *   G1-646 g1-myplate-lunch  Build a MyPlate Lunch         (healthy-habits, NHES.5.2.1)
 *   G1-647 g1-habit-check    Which Habit Will I Grow?      (healthy-habits, NHES.6.2.1)
 *   G1-648 g1-health-helpers Health Helpers                (healthy-habits, NHES.3.2.3)
 *   G1-649 g1-listening      Listen with Your Whole Body   (feelings, NHES.4.2.2)       teacher-led lesson
 *   G1-650 g1-fire-safety    Fire Safety and 911           (healthy-habits, NHES.3.2.2) teacher-led lesson
 *   G1-651 g1-say-no         Say No, Go Away, Tell         (healthy-habits, NHES.4.2.3) teacher-led lesson
 *   G1-652 g1-help-friend    Helping a Friend Stay Healthy (healthy-habits, NHES.8.2.2) teacher-led lesson
 * The drawn children are the faceless figures of Batch K2 (types/_shared/dk-k2.js `fig`): the child the card is about
 * in INK, another child in TEAL, a grown-up drawn tall in grey. The habit page uses only the healthy-habits pictograms
 * (never beside library art).
 */
'use strict';
const G = require('./dk-g1.js');
const K2 = require('./dk-k2.js');
const { habitFigure } = require('../../primitives/habit-pictogram.js');
const clock = require('../../primitives/clock.js');
const B = require('../../data/science/dk-g1.js');
const DK = require('./dk-kinder.js');

const { pic, box, tile, drawBox, labelledDraw, chip, word, small, text, head, col, row, grow, svg, art, band, whiteBand, arrow, writeRow, lineBox, frameLine, frameTile, numBox, sunToColor, esc, f1, W, T, DOT } = G.kit;
const MODES = G.MODES;
const { placesFor, patterned, derange, validOrderCount } = DK;

/* ---------------------------------------------------------------- the drawn step cards */
const GROUND = (w = 160) => `<line x1="2" y1="100" x2="${w - 2}" y2="100" stroke="${T.grid}" stroke-width="2.5"/>`;
/** a small flame (the clothes caught fire) */
const flame = (x, y, s = 1) => `<path d="M${f1(x)} ${f1(y)} c ${f1(-6 * s)} ${f1(-4 * s)} ${f1(-5 * s)} ${f1(-12 * s)} ${f1(0)} ${f1(-18 * s)} c ${f1(1 * s)} ${f1(6 * s)} ${f1(6 * s)} ${f1(7 * s)} ${f1(5 * s)} ${f1(12 * s)} c ${f1(0)} ${f1(4 * s)} ${f1(-2 * s)} ${f1(6 * s)} ${f1(-5 * s)} ${f1(6 * s)} Z" fill="${T.coral}" stroke="${T.ink}" stroke-width="1" data-g1-flame="1"/>`;
/** an svg speech bubble with its words (the teacher reads them) */
function bubbleSvg(x, y, words, w, tailX, fs = 15) {
  return `<g data-g1-say="${esc(words)}"><rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="24" rx="10" fill="#FFFFFF" stroke="${T.teal}" stroke-width="2"/>` +
    `<path d="M${f1(tailX - 5)} ${f1(y + 23)} L${f1(tailX)} ${f1(y + 32)} L${f1(tailX + 6)} ${f1(y + 23)}" fill="#FFFFFF" stroke="${T.teal}" stroke-width="2" stroke-linejoin="round"/>` +
    `<line x1="${f1(tailX - 4)}" y1="${f1(y + 23)}" x2="${f1(tailX + 5)}" y2="${f1(y + 23)}" stroke="#FFFFFF" stroke-width="3"/>` +
    `<text x="${f1(x + w / 2)}" y="${f1(y + 17)}" text-anchor="middle" font-family="Baloo 2" font-weight="700" font-size="${fs}" fill="${T.ink}" textLength="${f1(Math.min(w - 12, words.length * fs * 0.52))}" lengthAdjust="spacingAndGlyphs">${esc(words)}</text></g>`;
}
function stepArt(id, w, h) {
  let s = GROUND();
  if (id === 'stop') {
    const f = K2.fig({ x: 80, y: 100, s: 0.9, near: [1, 14, 1, 27], far: [-2, 14, -2, 27], who: 'child' });
    s += f.svg; const p = f.at(60, 45); s += flame(p[0] + 4, p[1] + 4, 1.1);
  } else if (id === 'drop') {
    const f0 = K2.fig({ x: 80, y: 100, s: 0.9, hip: 'kneel' });
    const face = f0.at(62, 30);
    const f = K2.fig({ x: 80, y: 100, s: 0.9, hip: 'kneel', near: f0.reach(face[0], face[1], 6), nearHand: 'palm', who: 'child' });
    s += f.svg; const p = f.at(52, 66); s += flame(p[0] - 2, p[1] + 2, 0.9);
  } else if (id === 'roll') {
    const f = K2.fig({ x: 0, y: 0, s: 0.9, near: [8, 10, 18, 14], far: [-6, 10, -12, 16], who: 'child' });
    // lying on the ground: the standing figure turned a quarter turn (head to the left), rolling arrows over it
    s += `<g transform="translate(130 88) rotate(-90)">${f.svg}</g>`;
    s += `<path d="M44 44 A 34 22 0 0 1 110 44" fill="none" stroke="${T.ink}" stroke-width="2.5" data-k2-motion="1"/><polygon points="110,44 101,40 105,50" fill="${T.ink}"/>`;
      } else if (id === 'no') {
    const other = K2.fig({ x: 128, y: 100, s: 0.85, dir: -1, color: T.teal, who: 'other' });
    const f = K2.fig({ x: 56, y: 100, s: 0.9, near: [12, 2, 25, 1], nearHand: 'palm', who: 'child' });
    s += other.svg + f.svg + bubbleSvg(20, 4, 'No!', 56, 52);
  } else if (id === 'go') {
    const other = K2.fig({ x: 132, y: 100, s: 0.85, dir: -1, color: T.teal, who: 'other' });
    const f = K2.fig({ x: 62, y: 100, s: 0.9, dir: -1, legs: 'walk', near: [-4, 12, 6, 24], who: 'child' });
    s += other.svg + f.svg + `<g data-g1-away="1">${arrow(56, 104, 18, 104, { sw: 3, head: 9 })}</g>`;
  } else if (id === 'tell') {
    const adult = K2.fig({ x: 122, y: 100, s: 1.1, dir: -1, color: T.inkSoft, who: 'grown-up' });
    const f = K2.fig({ x: 52, y: 100, s: 0.85, near: [10, 4, 20, 0], who: 'child' });
    s += adult.svg + f.svg + bubbleSvg(14, 0, 'I need help.', 92, 50, 13);
  }
  return svg(w, h, s, `data-g1-stepart="${id}"`, '12 -2 136 110');
}
/** a strip of step cards printed in a scrambled order, a number box under each (one valid order by the model) */
function stepStrip(ids, before, rng, cw, ch, words) {
  if (validOrderCount(ids, before) !== 1) throw new Error(`dk-g1: the steps ${ids.join(',')} have more than one valid order (refuse)`);
  const order = derange(ids.length, rng);   // never printed in the right order, every card out of place
  const cards = order.map((k) => col(tile(col(art(stepArt(ids[k], cw - 12, (cw - 12) * 110 / 136)) + word(words[ids[k]], 'font-size:18px'), 2), cw, ch, `data-g1-step="${ids[k]}" data-g1-rank="${k + 1}"`, 'white') +
    box('ws-blankbox', 54, 46, '', 'data-g1-stepbox="1"', 'display:block'), 4)).join('');
  return { html: `<div data-g1-steps="1" style="display:flex;gap:14px;justify-content:center">${cards}</div>`, order: order.map((k) => ids[k]) };
}
const rankBefore = (list) => (a, b) => list.indexOf(a) < list.indexOf(b);

/* ---------------------------------------------------------------- G1-644 ask a grown-up first */
/** review round 1: the lesson's own grown-up-only things the library has no picture of, drawn in simple shapes:
 *  gummy vitamins (colored bears in a medicine bottle with a cross: medicine can look like candy) and a spray cleaner
 *  (a trigger spray bottle with a warning triangle) */
function askArt(kind, px) {
  let s = '';
  if (kind === 'vitamins') {
    const bear = (x, y, c) => `<g data-g1-bear="1"><circle cx="${x - 4}" cy="${y - 9}" r="2.6" fill="${c}" stroke="${T.ink}" stroke-width="1"/><circle cx="${x + 4}" cy="${y - 9}" r="2.6" fill="${c}" stroke="${T.ink}" stroke-width="1"/><circle cx="${x}" cy="${y - 5}" r="5" fill="${c}" stroke="${T.ink}" stroke-width="1.2"/><ellipse cx="${x}" cy="${y + 4}" rx="5.5" ry="6.5" fill="${c}" stroke="${T.ink}" stroke-width="1.2"/></g>`;
    s = `<rect x="22" y="28" width="56" height="66" rx="10" fill="#FFFFFF" stroke="${T.teal}" stroke-width="3"/>` +
      `<rect x="28" y="12" width="44" height="17" rx="4" fill="${T.coral}" stroke="${T.ink}" stroke-width="1.5"/>` +
      [[33, 54, T.coral], [50, 54, T.teal], [67, 54, T.coral]].map(([x, y, c]) => `<g transform="translate(${x} ${y}) scale(1.2) translate(${-x} ${-y})">${bear(x, y, c)}</g>`).join('') +
      `<rect x="34" y="76" width="32" height="16" rx="3" fill="${T.cream}" stroke="${T.teal}" stroke-width="1.5"/><path d="M50 78 V90 M44 84 H56" stroke="${T.coral}" stroke-width="4"/>`;
  } else {
    s = `<path d="M36 44 L66 44 L72 92 Q72 96 68 96 L34 96 Q30 96 30 92 Z" fill="${T.tealSoft}" stroke="${T.teal}" stroke-width="3" stroke-linejoin="round"/>` +
      `<rect x="42" y="32" width="18" height="13" fill="${T.cream}" stroke="${T.teal}" stroke-width="2.5"/>` +
      `<path d="M36 14 L70 14 L70 32 L36 32 Z" fill="${T.coral}" stroke="${T.ink}" stroke-width="1.5"/><rect x="22" y="17" width="15" height="7" fill="${T.coral}" stroke="${T.ink}" stroke-width="1.5"/>` +
      `<path d="M46 32 Q44 40 38 44" fill="none" stroke="${T.ink}" stroke-width="3" stroke-linecap="round"/>` +
      `<path d="M8 14 L4 10 M8 21 L2 21 M8 28 L4 32" stroke="${T.inkSoft}" stroke-width="2" stroke-linecap="round"/>` +
      `<path d="M51 58 L64 82 L38 82 Z" fill="#FFFFFF" stroke="${T.ink}" stroke-width="2.5" stroke-linejoin="round" data-g1-warning="1"/><path d="M51 65 V74" stroke="${T.ink}" stroke-width="3" stroke-linecap="round"/><circle cx="51" cy="78.5" r="1.8" fill="${T.ink}"/>`;
  }
  return svg(px, px, s, `data-g1-askart="${kind}"`, '0 0 100 100');
}
MODES['g1-ask-first'] = function askFirst(d, rng) {
  const A = B.ASK_FIRST;
  // the medicine is on every page (the lesson's own item); the other grown-up things are drawn from the rest
  const adults = [A.adult[0], A.adult[1], ...rng.sample(A.adult.slice(2), d.adult - 2)];
  const all = [...adults.map((x) => ({ ...x, a: true })), ...rng.sample(A.food, d.food).map((x) => ({ ...x, a: false }))];
  const cols = all.length === 6 ? 3 : 4;
  let order;
  for (let t = 0; t < 400; t++) {
    order = rng.shuffle(all);
    const bits = order.map((x) => x.a);
    if (patterned(bits)) continue;
    if ([bits.slice(0, cols), bits.slice(cols)].some((r) => r.every(Boolean) || r.every((x) => !x))) continue;
    if ([...Array(cols).keys()].every((c) => bits[c] === bits[c + cols])) continue;
    break;
  }
  const cardW = cols === 3 ? 200 : 154, px = cols === 3 ? 130 : (d.write ? 88 : 108);
  const cell = (x) => box('dk-tile', '100%', '100%', col((x.draw ? art(askArt(x.draw, px)) : pic(x.pic, px)) + word(x.word) + box('', 28, 28, '', 'data-g1-checkbox="1"', 'display:block;border:2.5px solid ' + T.ink + ';border-radius:4px;background:#FFFFFF;box-sizing:border-box'), 6), `data-g1-cell="${x.id}" data-dk-answer="${x.a ? 'adult' : 'food'}"`);
  const grid = `<div style="flex:1 1 auto;min-height:0;display:grid;grid-template-columns:repeat(${cols},${cardW}px);grid-template-rows:repeat(2,1fr);gap:14px 16px;justify-content:center">${order.map(cell).join('')}</div>`;
  // review round 1: the lesson's central point printed on every level, read together
  const parts = [box('dk-tile dk-tile--lead', W, 'auto', `<span class="g1-text" data-dk-box data-g1-candyline="1" style="font-size:17px">${esc(A.candyLine)}</span>`, '', 'padding:7px 8px;justify-content:center'), grid];
  if (d.write) parts.push(box('dk-tile dk-tile--white', W, 'auto', col(text('Trace it, then say it: ') + art(writeRow(W - 40, 70, A.line), 'data-g1-trace="1"'), 2, 'align-items:flex-start'), 'data-g1-askline="1"', 'padding:6px 14px'));
  return { html: grow(parts.join(''), 'gap:12px'), meta: { cells: order.map((x) => (x.a ? 'A' : 'F') + ':' + x.id), cols } };
};

/* ---------------------------------------------------------------- MyPlate: the plate drawing */
/** the MyPlate picture: a plate in four parts (fruits and vegetables on the left, grains and protein on the right) and a
 *  dairy cup; each part carries its name (or a blank to write it on) and a dot to draw a line to */
function myPlate({ w, h, labels = true, cup = true, hints = null, dots = true, size = 1, cupBeside = false, cupScale = 1 }) {
  const r = Math.min(w * 0.4, h * 0.42) * size, cy = h * 0.52;
  // cupBeside (the lunch page): the plate at the left, a bigger cup beside it, big enough to glue a food card in
  const cx = cupBeside ? r + 26 : w * 0.45;
  const P = (x, y) => `${f1(x)} ${f1(y)}`;
  const yl = cy - r * 0.1, yr = cy + r * 0.14;           // the left divider a little high, the right a little low
  const xl = Math.sqrt(r * r - (yl - cy) ** 2), xr = Math.sqrt(r * r - (yr - cy) ** 2);
  const fills = { fruits: T.coralSoft, vegetables: T.tealSoft, grains: T.creamDeep, protein: T.cream, dairy: '#FFFFFF' };
  let s = `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r + 12)}" fill="#FFFFFF" stroke="${T.grid}" stroke-width="3"/>`;
  s += `<path d="M${P(cx, cy - r)} A${f1(r)} ${f1(r)} 0 0 0 ${P(cx - xl, yl)} L${P(cx, yl)} Z" fill="${fills.fruits}"/>`;
  s += `<path d="M${P(cx - xl, yl)} A${f1(r)} ${f1(r)} 0 0 0 ${P(cx, cy + r)} L${P(cx, yl)} Z" fill="${fills.vegetables}"/>`;
  s += `<path d="M${P(cx, cy - r)} A${f1(r)} ${f1(r)} 0 0 1 ${P(cx + xr, yr)} L${P(cx, yr)} Z" fill="${fills.grains}"/>`;
  s += `<path d="M${P(cx + xr, yr)} A${f1(r)} ${f1(r)} 0 0 1 ${P(cx, cy + r)} L${P(cx, yr)} Z" fill="${fills.protein}"/>`;
  s += `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" fill="none" stroke="${T.teal}" stroke-width="3"/>` +
    `<line x1="${f1(cx)}" y1="${f1(cy - r)}" x2="${f1(cx)}" y2="${f1(cy + r)}" stroke="${T.teal}" stroke-width="3"/>` +
    `<line x1="${f1(cx - xl)}" y1="${f1(yl)}" x2="${f1(cx)}" y2="${f1(yl)}" stroke="${T.teal}" stroke-width="3"/><line x1="${f1(cx)}" y1="${f1(yr)}" x2="${f1(cx + xr)}" y2="${f1(yr)}" stroke="${T.teal}" stroke-width="3"/>`;
  const cupR = r * 0.27 * cupScale, ccx = cupBeside ? cx + r + 14 + cupR : cx + r * 0.95, ccy = cupBeside ? cy - r * 0.45 : cy - r * 0.95;
  if (cup) s += `<circle cx="${f1(ccx)}" cy="${f1(ccy)}" r="${f1(cupR)}" fill="${fills.dairy}" stroke="${T.teal}" stroke-width="3" data-g1-cup="1"/>`;
  const C = { fruits: [cx - r * 0.5, cy - r * 0.5], vegetables: [cx - r * 0.5, cy + r * 0.38], grains: [cx + r * 0.5, cy - r * 0.4], protein: [cx + r * 0.48, cy + r * 0.56], dairy: [ccx, ccy] };
  const groups = cup ? B.MYPLATE.groups : B.MYPLATE.groups.slice(0, 4);
  const labelEls = [];
  for (const g of groups) {
    const [x, y] = C[g];
    if (hints && hints[g]) s += `<image href="${hints[g]}" x="${f1(x - 30)}" y="${f1(y - 4)}" width="60" height="44" opacity=".35" preserveAspectRatio="xMidYMid meet" data-g1-hint="${g}"/>`;
    if (labels) s += `<text x="${f1(x)}" y="${f1(y - (g === 'dairy' ? 2 : 8))}" text-anchor="middle" font-family="Baloo 2" font-weight="700" font-size="${g === 'dairy' ? 17 : 20}" fill="${T.ink}" data-g1-part="${g}">${B.MYPLATE.label[g]}</text>`;
    else s += `<line x1="${f1(x - (g === 'dairy' ? cupR * 0.75 : 52))}" y1="${f1(y - 6)}" x2="${f1(x + (g === 'dairy' ? cupR * 0.75 : 52))}" y2="${f1(y - 6)}" stroke="${T.ink}" stroke-width="1.8" data-g1-part="${g}"/>`;
    if (dots) s += `<circle cx="${f1(x)}" cy="${f1(y + (g === 'dairy' ? 16 : 16))}" r="8" fill="${T.coral}" data-g1-target="${g}"/>`;
    labelEls.push(g);
  }
  return svg(w, h, s, 'data-g1-plate="1"');
}
const LEFT_GROUPS = new Set(['fruits', 'vegetables']);

/* ---------------------------------------------------------------- G1-645 MyPlate: the five food groups */
MODES['g1-myplate-sort'] = function myplateSort(d, rng) {
  const M = B.MYPLATE;
  const foods = [];
  for (const g of M.groups) foods.push(...rng.sample(M.foods.filter((f) => f.g === g), d.per));
  const n = foods.length, nl = Math.ceil(n / 2);
  let order;
  for (let t = 0; t < 400; t++) {
    order = rng.shuffle(foods);
    const left = order.slice(0, nl), right = order.slice(nl);
    const al = left.filter((f) => LEFT_GROUPS.has(f.g)).length + right.filter((f) => !LEFT_GROUPS.has(f.g)).length;
    if (al === n || al === 0) continue;                                 // the cards never line up with the plate's sides
    if (left.every((f) => LEFT_GROUPS.has(f.g)) || right.every((f) => !LEFT_GROUPS.has(f.g))) continue;
    if (n >= 10 && order.some((f, i) => i > 0 && i !== nl && order[i - 1].g === f.g)) continue;   // no group twice in a row
    break;
  }
  const ch = n === 5 ? 150 : 104, px = n === 5 ? 110 : 76;
  const card = (f, side) => row((side === 'R' ? DOT() : '') + tile(pic(f.pic, px), 118, ch, `data-g1-food="${f.id}" data-dk-answer="${f.g}"`, 'white') + (side === 'L' ? DOT() : ''), 6);
  const colL = `<div style="display:flex;flex-direction:column;justify-content:space-between;height:100%">${order.slice(0, nl).map((f) => card(f, 'L')).join('')}</div>`;
  const colR = `<div style="display:flex;flex-direction:column;justify-content:space-between;height:100%">${order.slice(nl).map((f) => card(f, 'R')).join('')}</div>`;
  const plateH = d.labels ? 560 : 500;
  const plate = art(myPlate({ w: 392, h: plateH, labels: d.labels }));
  const parts = [];
  if (!d.labels) parts.push(whiteBand(row(text('Word bank:') + M.groups.map((g) => chip(M.label[g], `data-g1-bank="${g}"`)).join(''), 10), 'data-g1-wordbank="1"', 'padding:6px 0'));
  parts.push(row(colL + `<div style="align-self:center">${plate}</div>` + colR, 4, 'flex:1 1 auto;align-items:stretch;min-height:0'));
  return { html: grow(parts.join(''), 'gap:10px'), meta: { left: order.slice(0, nl).map((f) => f.g + ':' + f.id), right: order.slice(nl).map((f) => f.g + ':' + f.id) } };
};

/* ---------------------------------------------------------------- G1-646 build a MyPlate lunch (record) */
MODES['g1-myplate-lunch'] = function myplateLunch(d, rng) {
  const M = B.MYPLATE;
  const groups = M.groups.slice(0, d.groups);
  const times = whiteBand(col(text('Circle the times you eat or drink on a school day.', 'font-size:16px') + row(M.times.map((t) => col(art(clock({ h: t.h, m: t.m, size: d.write ? 60 : 70, numerals: false }).svg) + small(t.label + ' ' + t.h + ':' + String(t.m).padStart(2, '0'), 150), 2, 'width:152px')).join(''), 8), 4), 'data-g1-times="1"', 'padding:4px 0');
  const { fileUri } = require('../../image-cache/resolve.js');
  const hints = d.hints ? Object.fromEntries(groups.map((g) => { const f = M.foods.find((x) => x.g === g); return [g, fileUri(f.pic.theme, f.pic.noun)]; })) : null;
  const plateH = d.write ? 300 : 330;
  const plate = art(myPlate({ w: d.groups === 5 ? 410 : 330, h: plateH, labels: true, cup: d.groups === 5, hints, dots: false, cupBeside: true, cupScale: 1.35 }), 'data-g1-lunchplate="1"');
  const right = d.write ? col(text('My lunch:', 'font-size:16px') + groups.map((g) => row(word(M.label[g] + ':', 'font-size:14px;width:86px;text-align:left') + lineBox(150, 42), 4)).join('') +
    row(text('My drink:', 'font-size:16px') + M.drinks.map((x) => col(pic(x.pic, 54) + small(x.word, 60), 0)).join(''), 10), 2, 'align-items:flex-start') : '';
  const cards = [];
  for (const g of groups) cards.push(...rng.sample(M.foods.filter((f) => f.g === g), 2));
  const strip = rng.shuffle(cards);
  const per = strip.length === 8 ? 4 : 5, cw = strip.length === 8 ? 96 : 84;
  const cut = col(`<div data-dk-box style="font:700 14px/16px 'Nunito',sans-serif;color:${T.inkSoft}">✂ cut out, choose one for each part, and glue it on the plate</div>` +
    [strip.slice(0, per), strip.slice(per)].map((r) => row(r.map((f) => box('dk-cut', cw, cw, pic(f.pic, cw - 16), `data-g1-card="${f.id}"`)).join(''), 0)).join(''), 0);
  const parts = [times, row(plate + right, 8, 'align-items:flex-start'), cut];
  return { html: grow(parts.join(''), 'gap:8px'), meta: { record: true, cards: strip.map((f) => f.id) } };
};

/* ---------------------------------------------------------------- G1-647 which habit will I grow? (record) */
MODES['g1-habit-check'] = function habitCheck(d, rng) {
  const habits = d.habits === 5 ? B.HABITS : rng.sample(B.HABITS, d.habits);
  const ph = d.habits === 3 ? 150 : d.frame ? 92 : 104;
  const rows = habits.map((h) => band(row(art(habitFigure({ pose: h.pose === 'sleep' ? 'sleep-bed' : h.pose, px: ph }).svg) +
    `<div style="width:300px">${text(h.label, 'white-space:normal')}</div>` + col(sunToColor(d.habits === 3 ? 76 : 62) + small('yesterday', 90), 0), 24, 'justify-content:flex-start'), `data-g1-habit="${h.id}"`, 'padding:2px 24px'));
  const parts = [grow(rows.join(''), 'gap:8px')];
  if (d.frame) parts.push(frameTile([['Every day I will', 330, '.']]));
  return { html: grow(parts.join(''), 'gap:10px'), meta: { record: true, habits: habits.map((h) => h.id) } };
};

/* ---------------------------------------------------------------- G1-648 health helpers */
/** review round 1: the library pharmacist read as a boy in a doctor's coat, so the pharmacist is DRAWN: a grown-up (the
 *  Batch K2 figure, grey, drawn tall) behind a pharmacy counter, two shelves of medicine bottles behind, a cross on the
 *  wall, and the library medicine bottle on the counter */
/* review round 2: at print size the round-1 card read as a cashier (a small grey figure mostly hidden by the counter,
 * tiny cups on the shelves). Now the whole tile width: a big grown-up seen from the front in a WHITE COAT (lapels, a
 * pocket), head and shoulders well above the counter, hands resting on it; an "Rx" sign and a red-cross sign over the
 * shelves; the shelves hold the library medicine bottle (real pill bottles with a red cross), three to a shelf. */
function pharmacyArt(w, h, medPic) {
  const { fileUri } = require('../../image-cache/resolve.js');
  const med = (x, y, sz) => `<image href="${fileUri(medPic.theme, medPic.noun)}" x="${x}" y="${y}" width="${sz}" height="${sz}" preserveAspectRatio="xMidYMax meet" data-dk-pic="${esc(medPic.theme + '/' + medPic.noun)}" data-g1-shelfmed="1"/>`;
  let s = `<rect x="0" y="0" width="180" height="110" fill="${T.cream}"/>`;
  // the signs over the shelves: "Rx" at the left, a red cross at the right
  s += `<g data-g1-rxsign="1"><rect x="8" y="3" width="44" height="22" rx="4" fill="#FFFFFF" stroke="${T.teal}" stroke-width="2.5"/><text x="30" y="20" text-anchor="middle" font-family="Baloo 2" font-weight="700" font-size="18" fill="${T.coral}">Rx</text></g>`;
  s += `<g data-g1-crosssign="1"><rect x="128" y="3" width="44" height="22" rx="4" fill="#FFFFFF" stroke="${T.teal}" stroke-width="2.5"/><path d="M150 7 V21 M143 14 H157" stroke="${T.coral}" stroke-width="5"/></g>`;
  // the shelves, each with three real medicine bottles
  for (const [x0, x1] of [[4, 56], [124, 176]]) for (const y of [48, 74]) {
    s += `<line x1="${x0}" y1="${y}" x2="${x1}" y2="${y}" stroke="${T.inkSoft}" stroke-width="3"/>`;
    for (let k = 0; k < 3; k++) s += med(x0 + 1 + k * 17, y - 18, 17);
  }
  // the pharmacist, from the front: head, a white coat with lapels and a pocket, white sleeves to the counter
  s += `<circle cx="90" cy="32" r="13" fill="${T.inkSoft}" data-g1-phead="1"/><rect x="85" y="42" width="10" height="8" fill="${T.inkSoft}"/>`;
  s += `<g data-g1-coat="1"><path d="M62 56 Q66 48 90 47 Q114 48 118 56 L124 110 L56 110 Z" fill="#FFFFFF" stroke="${T.ink}" stroke-width="2"/>` +
    `<path d="M84 48 L90 60 L96 48" fill="${T.tealSoft}" stroke="${T.ink}" stroke-width="1.6" stroke-linejoin="round"/><path d="M90 60 L90 110" stroke="${T.ink}" stroke-width="1.4"/>` +
    `<rect x="98" y="68" width="11" height="9" rx="1.5" fill="none" stroke="${T.ink}" stroke-width="1.4"/></g>`;
  for (const [sx, hx] of [[66, 74], [114, 106]]) s += `<path d="M${sx} 58 L${hx} 86" stroke="${T.ink}" stroke-width="13" stroke-linecap="round"/><path d="M${sx} 58 L${hx} 86" stroke="#FFFFFF" stroke-width="9" stroke-linecap="round"/>`;
  s += `<rect x="2" y="86" width="176" height="24" fill="${T.creamDeep}" stroke="${T.teal}" stroke-width="3" data-g1-counter="1"/>`;
  s += `<circle cx="74" cy="87" r="5" fill="${T.inkSoft}"/><circle cx="106" cy="87" r="5" fill="${T.inkSoft}"/>`;
  return svg(w, h, s, 'data-g1-pharmacy="1"', '0 0 180 110').replace('style="display:block;overflow:visible"', 'style="display:block;overflow:hidden"');
}
MODES['g1-health-helpers'] = function healthHelpers(d, rng) {
  const helpers = d.helpers === 3 ? B.HELPERS.filter((h) => h.id !== 'pharmacist') : B.HELPERS.slice();
  const left = rng.shuffle(helpers);
  const order = derange(left.length, rng);
  const ih = d.helpers === 3 ? 150 : d.frame ? 96 : 110, px = ih - 12;
  const L = left.map((h) => row(tile(h.draw ? art(pharmacyArt(Math.round(Math.min(ih - 10, 98) * 180 / 110), Math.min(ih - 10, 98), h.counterPic)) : pic(h.pic, px), 170, ih, `data-g1-left="${h.id}"`, 'white') + DOT(), 10)).join('');
  const R = order.map((k) => row(DOT() + tile(`<span class="dk-head" style="font-size:24px;line-height:28px">${esc(left[k].name)}</span>`, 190, 64, `data-g1-right="${left[k].id}"`, 'white'), 10)).join('');
  const match = whiteBand(row(`<div style="display:flex;flex-direction:column;gap:10px">${L}</div><div style="width:110px"></div><div style="display:flex;flex-direction:column;justify-content:space-around;align-self:stretch">${R}</div>`, 0, 'align-items:flex-start'), 'data-g1-match="1"', 'padding:8px 0;flex:1 1 auto');
  const parts = [match];
  if (d.school) parts.push(frameTile([['When I feel sick or get hurt at school,'], ['I ask my teacher to see the', 200, '.']], 'data-g1-school="nurse"'));
  if (d.frame) parts.push(frameTile([['A', 160, 'keeps people healthy by'], [600, '.']]));
  return { html: grow(parts.join(''), 'gap:10px'), meta: { left: left.map((h) => h.id), right: order.map((k) => left[k].id), school: d.school ? 'nurse' : '' } };
};

/* ---------------------------------------------------------------- G1-649 listen with your whole body (record) */
MODES['g1-listening'] = function listening(d, rng) {
  const parts0 = d.parts === 5 ? B.LISTEN : B.LISTEN.slice(0, 3);
  const ph = d.parts === 3 ? 150 : d.frame ? 84 : 100;
  const rows = parts0.map((p) => band(row(tile(pic(p.pic, ph - 10), ph + 20, ph, `data-g1-part="${p.id}"`, 'white') +
    `<div style="width:300px">${text(p.label, 'white-space:normal')}</div>` + sunToColor(d.parts === 3 ? 76 : 62), 26, 'justify-content:flex-start'), `data-g1-listen="${p.id}"`, 'padding:2px 24px'));
  const parts = [grow(rows.join(''), 'gap:8px')];
  if (d.frame) parts.push(frameTile([['My partner said', 420, '.']]));
  return { html: grow(parts.join(''), 'gap:10px'), meta: { record: true, parts: parts0.map((p) => p.id) } };
};

/* ---------------------------------------------------------------- G1-650 fire safety and calling 911 */
function keypad(px) {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'], k = px / 3;
  let s = `<rect x="1" y="1" width="${f1(px - 2)}" height="${f1(k * 4 + 6)}" rx="10" fill="${T.cream}" stroke="${T.teal}" stroke-width="2.5"/>`;
  keys.forEach((t, i) => { const x = (i % 3) * k + 3, y = Math.floor(i / 3) * k + 4; s += `<rect x="${f1(x + 3)}" y="${f1(y + 3)}" width="${f1(k - 10)}" height="${f1(k - 10)}" rx="8" fill="#FFFFFF" stroke="${T.ink}" stroke-width="1.8"/><text x="${f1(x + k / 2 - 2)}" y="${f1(y + k / 2 + 7)}" text-anchor="middle" font-family="Baloo 2" font-weight="700" font-size="${f1(k * 0.42)}" fill="${T.ink}">${t}</text>`; });
  return svg(px, k * 4 + 8, s, 'data-g1-keypad="1"');
}
MODES['g1-fire-safety'] = function fireSafety(d, rng) {
  const W3 = { stop: 'stop', drop: 'drop', roll: 'roll' };
  const st = stepStrip(B.FIRE_STEPS, rankBefore(B.FIRE_STEPS), rng, 206, d.why ? 178 : 196, W3);
  const steps = whiteBand(col(text('If your clothes catch fire: write 1, 2, 3 to show the order.', 'font-size:16px') + st.html, 4), 'data-g1-fire="1"', 'padding:6px 0');
  const call = whiteBand(row(col(text('Circle the numbers you press to call 911.', 'font-size:16px;white-space:normal;width:230px') + art(keypad(d.why ? 150 : 176)), 4) +
    col(box('dk-tile dk-tile--lead', 330, 'auto', col(head('Get out and stay out.', 'font-size:20px') + text('Never go back for a toy or a pet.', 'font-size:16px') + text('Go to our meeting place.', 'font-size:16px'), 4), 'data-g1-rule="1"', 'padding:10px 6px'), 0), 20), 'data-g1-call="1"', 'padding:6px 0');
  const lines = [['My name is', 420, '.']];
  if (d.address) lines.push(['I live at', 440, '.']);
  if (d.why) lines.push(['I call 911 only when', 360, '.']);
  return { html: grow([steps, call, frameTile(lines)].join(''), 'gap:10px'), meta: { order: st.order.join(','), routine: B.FIRE_STEPS.join(',') } };
};

/* ---------------------------------------------------------------- G1-651 say no, go away, tell */
MODES['g1-say-no'] = function sayNo(d, rng) {
  const WORDS = { no: 'Say No!', go: 'Go away.', tell: 'Tell a grown-up.' };
  const st = stepStrip(B.NO_GO_TELL, rankBefore(B.NO_GO_TELL), rng, 206, d.places ? 178 : 200, WORDS);
  const parts = [whiteBand(col(text('Write 1, 2, 3 to show the order of the steps.', 'font-size:16px') + st.html, 4), 'data-g1-nogo="1"', 'padding:6px 0')];
  if (d.trace) parts.push(box('dk-tile dk-tile--white', W, 'auto', col(text('Trace the three steps:') + art(writeRow(W - 40, 76, 'No! Go! Tell!'), 'data-g1-trace="1"'), 2, 'align-items:flex-start'), 'data-g1-traceline="1"', 'padding:6px 14px'));
  if (d.trace) parts.push(col(labelledDraw(W - 40, 250, 'me saying No! with my hand', 'data-dk-prompt="sign"'), 0));
  if (d.places) parts.push(whiteBand(col(text('Who can I tell?', 'font-size:17px') + B.TELL_PLACES.map((p) => row(tile(col(pic(p.pic, d.frame ? 54 : 72) + small(p.label, 100), 0), 116, d.frame ? 90 : 116, `data-g1-place="${p.id}"`, 'white') + text('I can tell') + lineBox(330, 50), 10, 'justify-content:flex-start')).join(''), 4, 'align-items:flex-start'), 'data-g1-places="1"', 'padding:6px 14px'));
  if (d.frame) parts.push(frameTile([['If the first grown-up does not listen, I', 230, '.']]));
  return { html: grow(parts.join(''), 'gap:10px'), meta: { order: st.order.join(','), routine: B.NO_GO_TELL.join(',') } };
};

/* ---------------------------------------------------------------- G1-652 helping a friend stay healthy */
MODES['g1-help-friend'] = function helpFriend(d, rng) {
  const parts = [];
  const items = [];
  if (d.trace) {
    parts.push(box('dk-tile dk-tile--white', W, 'auto', col(text('Trace the reminder. Say it in a friendly voice.') + art(writeRow(W - 40, 80, 'Let\'s wash our hands!'), 'data-g1-trace="1"'), 2, 'align-items:flex-start'), 'data-g1-traceline="1"', 'padding:6px 14px'));
    const ways = [['wash before lunch', B.HELP_WAYS[0]], ['sit in the shade', B.HELP_WAYS[1]], ['ask a friend to play', B.HELP_WAYS[2]], ['get a grown-up', B.HELP_WAYS[3]]];
    parts.push(whiteBand(col(text('Circle one way you helped a friend this week.') + row(ways.map(([l, p]) => tile(col(pic(p, 92) + small(l, 130), 2), 146, 134, `data-g1-way="${p.noun}"`, 'white')).join(''), 10), 4), 'data-g1-ways="1"', 'padding:6px 0'));
    parts.push(col(labelledDraw(W - 40, 280, 'how I helped a friend', 'data-dk-prompt="helped"'), 0));
  } else {
    const scenes = rng.sample(B.FRIEND_SCENES, d.scenes);
    const at = placesFor(scenes.length, 2, rng);
    const rh = d.frame ? 118 : 150;
    const rows = scenes.map((s, i) => {
      const ch = [{ t: s.bossy, a: 'no' }]; ch.splice(at[i], 0, { t: s.friendly, a: 'right' });
      items.push(s.id + '@' + at[i]);
      return band(row(tile(col(pic(s.pic, rh - 46) + small(s.label, 130), 0), 140, rh, `data-g1-scene="${s.id}"`, 'white') +
        col(ch.map((c) => `<span class="g1-bubble" data-dk-box data-g1-reminder="1" data-dk-answer="${c.a}">${esc(c.t)}</span>`).join(''), 14, 'align-items:flex-start'), 18, 'justify-content:flex-start'),
      `data-dk-item="${s.id}" data-g1-one="1"`, 'padding:4px 16px');
    });
    parts.push(grow(rows.join(''), 'gap:8px'));
    if (d.frame) parts.push(frameTile([['A friendly voice works better because', 270, '.']]));
    else parts.push(col(labelledDraw(W - 40, 170, 'one way I helped a friend this week', 'data-dk-prompt="helped"'), 0));
  }
  return { html: grow(parts.join(''), 'gap:10px'), meta: { items, record: !!d.trace } };
};

module.exports = { makeG1Type: G.makeG1Type, MODES, stepArt, myPlate, keypad, LEFT_GROUPS, rankBefore };
