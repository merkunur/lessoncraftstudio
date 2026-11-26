/**
 * e1-math-art.js — the drawings of Batch E-1 (Daily Teaching System Stage E, 2026-11-25; German and Swedish mathematics,
 * types G1-671 .. G3-632, factory e1-math.js). Every drawing is an <svg data-lcs-prim="sk-art"> (the page lint leaves its
 * colours to this batch's gate, qa/verify-e1-math.js, which holds every colour this file writes to PAL_E1).
 *
 *   play money       stylised classroom money ("Spielgeld" / "lekpengar"): a landscape note with a solid inner frame,
 *                    its value large in the middle and small in two corners; a round coin with its value
 *                    large. Euro money in its real colours only (5 € grey, 10 € red, 20 € blue; gold and silver coins),
 *                    every Swedish note one colour. No portrait, no building, no security feature, no motif; NOT at
 *                    real size (a 5-euro note is 120 mm; ours is about 25 mm) and not a likeness of any real note or
 *                    coin (ECB Decision 2013/10/EU, Riksbank reproduction rules). The purse has a clasp.
 *                    Coins keep the ORDER of their real sizes (1 € smaller than 2 €; the Swedish 10-krona coin smaller
 *                    than the 5-krona coin), never "bigger = worth more".
 *   stall            a market stall: a striped awning, two posts and a wooden counter (G1-671)
 *   balances         a two-pan balance with 1-kg weights, level (G2-632); a balance against ONE 1-kg weight that tips
 *                    the heavier side down or stays level
 *   kitchen scale    a dial scale ("köksvåg"): a bowl on top, a round dial 0-10 kg with a mark at every kilogram and a
 *                    pointer (G2-632, new artwork)
 *   shelf            a bookcase with three shelves of five places; library pictures stand in places, an empty place is a
 *                    dashed square to draw in; a box ("låda") with one picture peeking from behind it and one standing in
 *                    front of it, as big as every other thing on the shelf (G1-672)
 *   number lines     the empty Rechenstrich (G3-630); the empty number line with an arrow (G2-631)
 *   column sums      a finished written calculation in digit cells (G3-631); a squared grid to calculate in
 *   survey           an empty bar chart frame with ten steps and blank label lines (G3-632)
 */
'use strict';
const TOK = require('../../primitives/_tokens.js');

const T = TOK.color;
const f1 = (n) => (Math.round(n * 10) / 10).toString();
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** every colour this file writes (the gate scans the source for hex values and refuses any other) */
const WOOD = '#C98A4B', WOOD_DARK = '#8C5A2B', WOOD_LIGHT = '#E8C89A', METAL = '#9AA3AD', METAL_DARK = '#5F6873', AWNING = '#E0604A';
/** the euro's colour cues (review round 1, the German teacher: classroom Rechengeld shows the real colours): the 5-euro
 *  note grey, the 10-euro note red, the 20-euro note blue; the coins gold and silver. Light tints with a darker edge, so
 *  the value stays dark on light. Colours only: no motif, no portrait, no building, no pattern. */
const NOTE_GREY = '#DCE0E5', NOTE_RED = '#F6C1B8', NOTE_RED_DARK = '#B8473A', NOTE_BLUE = '#BCD3EE', NOTE_BLUE_DARK = '#3D6FA8';
const GOLD = '#E8C462', GOLD_DARK = '#A07D1C', SILVER = '#D9DEE4';
const PAL_E1 = new Set([T.cream, T.creamDeep, T.teal, T.tealSoft, T.coral, T.coralSoft, T.ink, T.inkSoft, T.white, T.grid, WOOD, WOOD_DARK, WOOD_LIGHT, METAL, METAL_DARK, AWNING,
  NOTE_GREY, NOTE_RED, NOTE_RED_DARK, NOTE_BLUE, NOTE_BLUE_DARK, GOLD, GOLD_DARK, SILVER].map((c) => c.toUpperCase()));

/** an svg drawing of this batch */
const artSvg = (body, w, h, attrs = '', vb = null) => `<svg xmlns="http://www.w3.org/2000/svg" width="${f1(w)}" height="${f1(h)}" viewBox="${vb || `0 0 ${f1(w)} ${f1(h)}`}" style="display:block;overflow:visible" data-lcs-prim="sk-art"${attrs ? ' ' + attrs : ''}>${body}</svg>`;
const text = (x, y, s, size, o = {}) => `<text x="${f1(x)}" y="${f1(y)}" font-family="${o.font || "'Baloo 2'"}" font-size="${size}" font-weight="${o.weight || 700}" fill="${o.fill || T.ink}" text-anchor="${o.anchor || 'middle'}" dominant-baseline="central"${o.attrs ? ' ' + o.attrs : ''}>${esc(s)}</text>`;
/** a library picture inside an svg, centred in the box (x, y, w, h) */
const svgPic = (src, x, y, w, h, attrs = '', align = 'xMidYMax') => `<image href="${src}" x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" preserveAspectRatio="${align} meet"${attrs ? ' ' + attrs : ''}/>`;

/** the ink box of a library picture (data/hm/ink-boxes.json: fractions of its square), read when a page is built */
let _ink = null;
const inkOf = (key) => { if (!_ink) _ink = require('../../data/hm/ink-boxes.json'); return (key && _ink[key]) || { l: 0, t: 0, w: 1, h: 1 }; };

/* ================================================================ play money */
/** the currencies of this batch: euro in whole euros (de), kronor (sv). Coin diameters in mm (only their ORDER is drawn) */
const MONEY = {
  EUR: { sign: '€', coins: { 1: 23.25, 2: 25.75 }, notes: { 5: 120, 10: 127, 20: 133 } },
  SEK: { sign: 'kr', coins: { 1: 19.5, 2: 22.5, 5: 23.75, 10: 20.5 }, notes: { 20: 120, 50: 126, 100: 133, 200: 140 } },
};
const label = (cur, v) => `${v} ${MONEY[cur].sign}`;
const isNote = (cur, v) => v in MONEY[cur].notes;
/** the ring and the centre of a coin: euro coins in their real metals (1 €: silver centre, gold ring; 2 €: gold centre,
 *  silver ring), Swedish coins in the plain cream play-money look */
const COIN_LOOK = { EUR: { 1: { ring: GOLD, centre: SILVER, edge: GOLD_DARK }, 2: { ring: SILVER, centre: GOLD, edge: METAL_DARK } } };
/** a coin: a ring and a centre, the value large inside; diameter from the real coin (the set's largest = maxPx) */
function coin(cur, v, maxPx = 46) {
  const M = MONEY[cur], top = Math.max(...Object.values(M.coins));
  const d = Math.round(maxPx * M.coins[v] / top), c = d / 2;
  const s = label(cur, v), fs = Math.round(d * (s.length > 4 ? 0.3 : 0.34));
  const L = (COIN_LOOK[cur] || {})[v] || { ring: T.cream, centre: T.white, edge: T.teal };
  return artSvg(`<circle cx="${f1(c)}" cy="${f1(c)}" r="${f1(c - 1.5)}" fill="${L.ring}" stroke="${L.edge}" stroke-width="2.5"/>` +
    `<circle cx="${f1(c)}" cy="${f1(c)}" r="${f1(c - 6)}" fill="${L.centre}" stroke="${L.edge}" stroke-width="1.2"/>` +
    text(c, c + 0.5, s, fs), d, d, `data-e1-money="coin" data-e1-value="${v}" role="img" aria-label="${esc(s)}"`);
}
/** the colour of a play note: euro notes in their real colours (5 grey, 10 red, 20 blue); every Swedish note the same */
const NOTE_LOOK = { EUR: { 5: { fill: NOTE_GREY, edge: METAL_DARK }, 10: { fill: NOTE_RED, edge: NOTE_RED_DARK }, 20: { fill: NOTE_BLUE, edge: NOTE_BLUE_DARK } } };
/**
 * a play note (review round 1, the Swedish teacher: it must read as a "sedel", not as a label or an answer box): a
 * landscape note with a SOLID inner frame, its value large in the middle (review round 2) and small in
 * the top-left and bottom-right corners. No portrait, no building, no pattern; width follows the real note's ratio, not its size.
 */
function note(cur, v, h = 46) {
  const M = MONEY[cur], wmm = M.notes[v], base = Math.min(...Object.values(M.notes));
  const w = Math.round(h * (cur === 'EUR' ? 2.15 : 2.3) * wmm / base);
  const s = label(cur, v), L = (NOTE_LOOK[cur] || {})[v] || { fill: T.tealSoft, edge: T.teal };
  // review round 2 (the Swedish teacher): the value large in the middle; small numerals in two corners,
  // clear of the inner frame (the gate measures both in the render)
  const fm = Math.round(h * 0.38), fc = Math.max(9, Math.round(h * 0.22)), pad = 10;
  return artSvg(`<rect x="1.5" y="1.5" width="${w - 3}" height="${h - 3}" rx="4" fill="${L.fill}" stroke="${L.edge}" stroke-width="2.5"/>` +
    `<rect x="5" y="5" width="${w - 10}" height="${h - 10}" rx="2" fill="none" stroke="${L.edge}" stroke-width="1.3" data-e1-frame="1"/>` +
    text(w / 2, h / 2 + 0.5, s, fm, { attrs: `data-e1-mid="${esc(s)}"` }) +
    text(pad, 6 + 2 + fc * 0.5, String(v), fc, { anchor: 'start', weight: 800, attrs: 'data-e1-corner="1"' }) +
    text(w - pad, h - 8 - fc * 0.5, String(v), fc, { anchor: 'end', weight: 800, attrs: 'data-e1-corner="2"' }),
  w, h, `data-e1-money="note" data-e1-value="${v}" role="img" aria-label="${esc(s)}"`);
}
/** the purse's clasp (G1-671): a metal frame across the top with two knobs, drawn over the purse's top edge */
const purseClasp = (w) => artSvg(`<path d="M3 13 Q${f1(w / 2)} 1 ${f1(w - 3)} 13" fill="none" stroke="${METAL_DARK}" stroke-width="3" stroke-linecap="round"/>` +
  `<circle cx="${f1(w / 2 - 6)}" cy="6" r="4.5" fill="${METAL}" stroke="${METAL_DARK}" stroke-width="1.5"/><circle cx="${f1(w / 2 + 6)}" cy="6" r="4.5" fill="${METAL}" stroke="${METAL_DARK}" stroke-width="1.5"/>`,
w, 15, 'data-e1-art="clasp"');
const money = (cur, v, o = {}) => (isNote(cur, v) ? note(cur, v, o.noteH) : coin(cur, v, o.coinPx));

/* ================================================================ the market stall (G1-671) */
/** the awning: a scalloped strip in coral and white stripes, w wide */
function awning(w, h = 34) {
  const n = 12, sw = w / n;
  let b = '';
  for (let i = 0; i < n; i++) b += `<path d="M${f1(i * sw)} 0 H${f1((i + 1) * sw)} V${f1(h - 10)} A${f1(sw / 2)} 10 0 0 1 ${f1(i * sw)} ${f1(h - 10)} Z" fill="${i % 2 ? T.white : AWNING}" stroke="${T.teal}" stroke-width="1.5"/>`;
  return artSvg(b + `<rect x="0" y="0" width="${w}" height="6" fill="${T.teal}"/>`, w, h, 'data-e1-art="awning"');
}
/** the counter: a wooden board with two posts reaching up to the awning (drawn as the counter's front) */
function counter(w, h = 22) {
  return artSvg(`<rect x="0" y="0" width="${w}" height="${h - 6}" rx="4" fill="${WOOD}" stroke="${WOOD_DARK}" stroke-width="2"/>` +
    `<line x1="8" y1="${f1((h - 6) / 2)}" x2="${w - 8}" y2="${f1((h - 6) / 2)}" stroke="${WOOD_DARK}" stroke-width="1"/>` +
    `<rect x="18" y="${h - 7}" width="10" height="7" fill="${WOOD_DARK}"/><rect x="${w - 28}" y="${h - 7}" width="10" height="7" fill="${WOOD_DARK}"/>`, w, h, 'data-e1-art="counter"');
}
/** a stall post (left or right edge of the goods row) */
const post = (h) => artSvg(`<rect x="1" y="0" width="8" height="${h}" fill="${WOOD}" stroke="${WOOD_DARK}" stroke-width="1.5"/>`, 10, h, 'data-e1-art="post"');

/* ================================================================ weighing (G2-632) */
/** a 1-kg weight, s wide, standing on y with its left edge at x: a trapezoid with a knob and "1 kg" */
function kgWeight(x, y, s = 18) {
  const h = s * 0.86;
  return `<g data-e1-weight="1"><path d="M${f1(x + s * 0.12)} ${f1(y - h)} H${f1(x + s * 0.88)} L${f1(x + s)} ${f1(y)} H${f1(x)} Z" fill="${METAL}" stroke="${METAL_DARK}" stroke-width="1.2"/>` +
    `<rect x="${f1(x + s * 0.34)}" y="${f1(y - h - s * 0.22)}" width="${f1(s * 0.32)}" height="${f1(s * 0.24)}" rx="1.5" fill="${METAL}" stroke="${METAL_DARK}" stroke-width="1"/>` +
    text(x + s / 2, y - h * 0.44, '1 kg', Math.max(9, Math.round(s * 0.4)), { fill: T.white, font: "'Nunito'", weight: 900 }) + '</g>';
}
/** n weights on a pan whose top is y, centred at cx: rows of up to five, the second row on the first */
function weightStack(n, cx, y, s) {
  let b = '';
  for (let r = 0, left = n; left > 0; r++, left -= 5) {
    const k = Math.min(5, left), w = k * s + (k - 1) * 2, x0 = cx - w / 2, yy = y - r * (s * 1.1 + 1);
    for (let i = 0; i < k; i++) b += kgWeight(x0 + i * (s + 2), yy, s);
  }
  return b;
}
/**
 * a school balance ("balansvåg"): a foot, a post, a beam on a pivot and a flat pan on each end of the beam. The thing (a
 * library picture, src) stands on the LEFT pan, n 1-kg weights on the RIGHT pan. tilt: 0 level (the thing weighs n kg),
 * +1 the left pan lower (the thing is heavier), -1 the left pan higher (lighter). The pans stay flat.
 */
function balanceKg({ src, pic = null, n, tilt = 0, w = 300, h = 170, picPx = 80, s = 18, attrs = '' }) {
  const cx = w / 2, half = w * 0.28, panW = w * 0.42, base = h - 6, pivot = h - 46, drop = tilt * Math.min(14, h * 0.09);
  const ly = pivot + drop, ry = pivot - drop;   // the beam's ends (the left end lower when the thing is heavier)
  const pan = (px, py, side) => `<line x1="${f1(px)}" y1="${f1(py)}" x2="${f1(px)}" y2="${f1(py - 14)}" stroke="${T.teal}" stroke-width="4"/>` +
    `<rect x="${f1(px - panW / 2)}" y="${f1(py - 20)}" width="${f1(panW)}" height="7" rx="3" fill="${T.white}" stroke="${T.teal}" stroke-width="2.5" data-e1-pan="${side}"/>`;
  const body = `<rect x="${f1(cx - w * 0.2)}" y="${base - 10}" width="${f1(w * 0.4)}" height="10" rx="4" fill="${T.tealSoft}" stroke="${T.teal}" stroke-width="2.5"/>` +
    `<rect x="${f1(cx - 5)}" y="${f1(pivot)}" width="10" height="${f1(base - 10 - pivot)}" fill="${T.tealSoft}" stroke="${T.teal}" stroke-width="2"/>` +
    `<line x1="${f1(cx - half)}" y1="${f1(ly)}" x2="${f1(cx + half)}" y2="${f1(ry)}" stroke="${T.teal}" stroke-width="6" stroke-linecap="round"/>` +
    `<circle cx="${f1(cx)}" cy="${f1(pivot)}" r="6" fill="${T.coral}"/>` +
    `<path d="M${f1(cx - 6)} ${f1(pivot - 24)} L${f1(cx + 6)} ${f1(pivot - 24)} L${f1(cx)} ${f1(pivot - 10)} Z" fill="${T.coral}" data-e1-pointer="1"/>` +
    pan(cx - half, ly, 'left') + pan(cx + half, ry, 'right') +
    svgPic(src, cx - half - picPx / 2, ly - 20 - (inkOf(pic).t + inkOf(pic).h) * picPx, picPx, picPx, 'data-e1-object="1"') +
    weightStack(n, cx + half, ry - 20, s);
  return artSvg(body, w, h, `data-e1-art="balance" data-e1-n="${n}" data-e1-tilt="${tilt}"${attrs ? ' ' + attrs : ''}`);
}
/**
 * a kitchen dial scale ("köksvåg"): a bowl on top holding the picture, a body with a round dial 0..max kg over 270
 * degrees (0 at the lower left, max at the lower right, as on a real dial), a mark at every kilogram (a numeral at every
 * `every`-th), "kg" in the gap at the bottom, a coral pointer at n.
 */
function kitchenScale({ src, pic = null, n, max = 10, every = 1, w = 150, h = 200, picPx = 64, attrs = '' }) {
  const cx = w / 2, bowlY = picPx + 6, bodyY = bowlY + 12, R = Math.min(w * 0.4, (h - bodyY - 10) / 2), dy = bodyY + 4 + R;
  const ang = (k) => ((-135 + (270 * k) / max) * Math.PI) / 180;
  let ticks = '';
  for (let k = 0; k <= max; k++) {
    const t = ang(k), r1 = R - 22, r2 = R - (k % every === 0 ? 31 : 28);
    ticks += `<line x1="${f1(cx + Math.sin(t) * r1)}" y1="${f1(dy - Math.cos(t) * r1)}" x2="${f1(cx + Math.sin(t) * r2)}" y2="${f1(dy - Math.cos(t) * r2)}" stroke="${T.ink}" stroke-width="2" stroke-linecap="round" data-e1-tick="${k}"/>`;
    if (k % every === 0) ticks += text(cx + Math.sin(t) * (R - 11), dy - Math.cos(t) * (R - 11), String(k), Math.max(11, Math.round(R * 0.2)), { attrs: `data-e1-dialnum="${k}"` });
  }
  const tp = ang(n), pl = R - 24;
  const body = `<path d="M${f1(cx - w * 0.42)} ${f1(bodyY)} H${f1(cx + w * 0.42)} L${f1(cx + w * 0.48)} ${h - 3} H${f1(cx - w * 0.48)} Z" fill="${T.tealSoft}" stroke="${T.teal}" stroke-width="2.5" stroke-linejoin="round"/>` +
    `<rect x="${f1(cx - 5)}" y="${bowlY}" width="10" height="${bodyY - bowlY}" fill="${T.teal}"/>` +
    svgPic(src, cx - picPx / 2, bowlY + 4 - (inkOf(pic).t + inkOf(pic).h) * picPx, picPx, picPx, 'data-e1-object="1"') +
    `<path d="M${f1(cx - w * 0.4)} ${bowlY} Q${f1(cx)} ${bowlY + 14} ${f1(cx + w * 0.4)} ${bowlY} Z" fill="${T.white}" stroke="${T.teal}" stroke-width="2.5" data-e1-bowl="1"/>` +
    `<circle cx="${f1(cx)}" cy="${f1(dy)}" r="${f1(R)}" fill="${T.white}" stroke="${T.teal}" stroke-width="3" data-e1-dial="1"/>` + ticks +
    text(cx, dy + R * 0.62, 'kg', Math.max(10, Math.round(R * 0.22)), { fill: T.inkSoft, attrs: 'data-e1-dialunit="1"' }) +
    `<line x1="${f1(cx)}" y1="${f1(dy)}" x2="${f1(cx + Math.sin(tp) * pl)}" y2="${f1(dy - Math.cos(tp) * pl)}" stroke="${T.coral}" stroke-width="3.5" stroke-linecap="round" data-e1-needle="${n}"/>` +
    `<circle cx="${f1(cx)}" cy="${f1(dy)}" r="5" fill="${T.coral}"/>`;
  return artSvg(body, w, h, `data-e1-art="kitchen-scale" data-e1-n="${n}" data-e1-max="${max}" data-e1-every="${every}"${attrs ? ' ' + attrs : ''}`);
}

/* ================================================================ the shelf (G1-672) */
/**
 * a bookcase: rows x cols places of size cw x ch. cells[r][c] = null (empty: a dashed square to draw in) | { src, key }
 * (a library picture) | { box: true, span: 2, behind: {src,key}, front: {src,key} } (a box two places wide with one
 * picture standing behind it, its top half showing over the box, and one lying in front of it, inside the box's width and
 * lower than its top) | { spacer: true } (the second place of the box). Rows are numbered from the TOP shelf. Every place
 * carries data-e1-place="r,c".
 */
function shelf({ rows, cols, cells, cw = 104, ch = 92, picPx = 70, side = 14, attrs = '' }) {
  const W = cols * cw + 2 * side, H = rows * ch + 16 + 14;
  let b = `<rect x="0" y="0" width="${W}" height="${H}" rx="6" fill="${WOOD_LIGHT}" stroke="${WOOD_DARK}" stroke-width="3"/>` +
    `<rect x="${side}" y="8" width="${cols * cw}" height="${rows * ch}" fill="${T.cream}" stroke="${WOOD_DARK}" stroke-width="1.5"/>`;
  for (let r = 0; r < rows; r++) {
    const yb = 8 + (r + 1) * ch;
    b += `<rect x="${side - 4}" y="${yb - 4}" width="${cols * cw + 8}" height="9" fill="${WOOD}" stroke="${WOOD_DARK}" stroke-width="1.5" data-e1-board="${r}"/>`;
    for (let c = 0; c < cols; c++) {
      const x = side + c * cw, cell = cells[r][c], cxm = x + cw / 2;
      if (!cell) {
        const s = Math.min(cw, ch) - 22;
        b += `<rect x="${f1(cxm - s / 2)}" y="${f1(yb - 6 - s)}" width="${s}" height="${s}" rx="6" fill="${T.white}" stroke="${T.coral}" stroke-width="2" stroke-dasharray="5 4" data-e1-place="${r},${c}" data-e1-empty="1"/>`;
      } else if (cell.spacer) {
        continue;
      } else if (cell.box) {
        const span = cell.span || 1, bxm = x + (span * cw) / 2;
        const bw = span * cw * 0.85, bh = ch * 0.5, bx = bxm - bw / 2, by = yb - 4 - bh;
        // the thing BEHIND the box: drawn first, standing on the board behind it, in the box's right part; sized so that a
        // little under half of its drawing shows over the box (its head and shoulders); its drawing stands on the board
        if (cell.behind) { const ink = inkOf(cell.behind.pic), p = Math.min(ch - 6, bh / (0.56 * ink.h)); b += svgPic(cell.behind.src, bx + bw - 8 - (ink.l + ink.w) * p, yb - 4 - (ink.t + ink.h) * p, p, p, `data-e1-place="${r},${c}" data-e1-key="${esc(cell.behind.key)}" data-e1-rel="behind" data-e1-ink="${f1(ink.l * p)},${f1(ink.w * p)}"`); }
        b += `<g data-e1-box="${r},${c}" data-e1-span="${span}"><rect x="${f1(bx)}" y="${f1(by)}" width="${f1(bw)}" height="${f1(bh)}" rx="3" fill="${WOOD}" stroke="${WOOD_DARK}" stroke-width="2"/>` +
          `<line x1="${f1(bx + 4)}" y1="${f1(by + bh * 0.3)}" x2="${f1(bx + bw - 4)}" y2="${f1(by + bh * 0.3)}" stroke="${WOOD_DARK}" stroke-width="1"/>` +
          `<rect x="${f1(bxm - 14)}" y="${f1(by + bh * 0.46)}" width="28" height="7" rx="3" fill="${WOOD_DARK}"/></g>`;
        // the thing IN FRONT of the box (review round 1, the Swedish teacher: at the size of every other thing on the
        // shelf, feet on the board, over the box's face, the box showing on both sides of it; it may rise above the lid —
        // the overlap is what shows "framför"): drawn last, in the box's left part. Review round 2: not at the box's end —
        // 42 px (about 11 mm) of box face shows on its left, more on its right, so "bredvid lådan" never fits it
        if (cell.front) { const ink = inkOf(cell.front.pic), p = picPx; b += svgPic(cell.front.src, bx + 42 - ink.l * p, yb - 4 - (ink.t + ink.h) * p, p, p, `data-e1-place="${r},${c}" data-e1-key="${esc(cell.front.key)}" data-e1-rel="front" data-e1-ink="${f1(ink.l * p)},${f1(ink.w * p)}"`); }
      } else {
        { const ink = inkOf(cell.pic); b += svgPic(cell.src, cxm - picPx / 2, yb - 4 - (ink.t + ink.h) * picPx, picPx, picPx, `data-e1-place="${r},${c}" data-e1-key="${esc(cell.key)}"`); }
      }
    }
  }
  return artSvg(b, W, H, `data-e1-art="shelf" data-e1-rows="${rows}" data-e1-cols="${cols}"${attrs ? ' ' + attrs : ''}`);
}

/* ================================================================ number lines */
/** the empty Rechenstrich: a plain line with room above it for the jumps and below it for the stop numbers (no ticks, no
 *  numbers); the line lies `below` px over the drawing's foot */
function rechenstrich(w = 300, h = 58, below = 16) {
  return artSvg(`<line x1="6" y1="${h - below}" x2="${w - 6}" y2="${h - below}" stroke="${T.ink}" stroke-width="3" stroke-linecap="round" data-e1-strich="1"/>`, w, h, 'data-e1-art="rechenstrich"');
}
/** an empty number line with an arrow; ends: [startLabel, endLabel] marks the two ends (level 1), else nothing */
function emptyLine(w = 300, h = 62, ends = null) {
  let b = `<line x1="8" y1="${h - 22}" x2="${w - 12}" y2="${h - 22}" stroke="${T.ink}" stroke-width="3" stroke-linecap="round" data-e1-line="1"/>` +
    `<path d="M${w - 16} ${h - 30} L${w - 4} ${h - 22} L${w - 16} ${h - 14}" fill="none" stroke="${T.ink}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
  if (ends) {
    const xs = [28, w - 40];
    ends.forEach((lab, i) => { b += `<line x1="${xs[i]}" y1="${h - 30}" x2="${xs[i]}" y2="${h - 14}" stroke="${T.ink}" stroke-width="2.5" data-e1-endmark="${i}"/>` + text(xs[i], h - 6, String(lab), 15, { attrs: `data-e1-endlabel="${esc(lab)}"` }); });
  }
  return artSvg(b, w, h, 'data-e1-art="number-line"');
}

/* ================================================================ written calculation (G3-631) */
/**
 * a finished column calculation: rows of digits right-aligned in cells of size s (top, operator + bottom, the result
 * under a rule). shift: the bottom number written one place too far LEFT (an empty ones cell) — the shifted-place error.
 */
function columnCalc({ top, bottom, op, result, shift = 0, s = 24, cols = 4 }) {
  const W = (cols + 1) * s, H = 3 * s + 10;
  const digitsAt = (n, row, sh = 0) => { const d = String(n).split(''); return d.map((ch, i) => text(W - (d.length - 1 - i + sh) * s - s / 2, row * s + s / 2 + (row === 2 ? 8 : 0), ch, Math.round(s * 0.8), { attrs: `data-e1-digit="${row}"` })).join(''); };
  let b = '';
  for (let c = 1; c <= cols; c++) for (let r = 0; r < 3; r++) b += `<rect x="${(c) * s}" y="${r * s + (r === 2 ? 8 : 0)}" width="${s}" height="${s}" fill="none" stroke="${T.grid}" stroke-width="1"/>`;
  b += digitsAt(top, 0) + digitsAt(bottom, 1, shift) + text(s / 2, s * 1.5, op === '+' ? '+' : '−', Math.round(s * 0.8)) +
    `<line x1="${s * 0.25}" y1="${2 * s + 4}" x2="${W}" y2="${2 * s + 4}" stroke="${T.ink}" stroke-width="2.5"/>` + digitsAt(result, 2);
  return artSvg(b, W, H, `data-e1-art="column" data-e1-top="${top}" data-e1-bottom="${bottom}" data-e1-op="${op === '+' ? 'plus' : 'minus'}" data-e1-printed="${result}" data-e1-shift="${shift}"`);
}
/** a squared grid (Kästchen) of cols x rows cells, s px */
function kaestchen(cols, rows, s = 20) {
  let b = '';
  for (let c = 0; c <= cols; c++) b += `<line x1="${c * s + 0.5}" y1="0" x2="${c * s + 0.5}" y2="${rows * s}" stroke="${T.grid}" stroke-width="1"/>`;
  for (let r = 0; r <= rows; r++) b += `<line x1="0" y1="${r * s + 0.5}" x2="${cols * s}" y2="${r * s + 0.5}" stroke="${T.grid}" stroke-width="1"/>`;
  return artSvg(b, cols * s + 1, rows * s + 1, `data-e1-art="kaestchen" data-e1-cells="${cols}x${rows}"`);
}

/* ================================================================ the survey chart (G3-632) */
/**
 * an empty bar chart: steps horizontal grid lines (the scale is the child's), a tick at each step with a short blank to
 * write its number, nbars blank label lines under the x axis. firstLabels: numbers printed at the first steps (level 1).
 */
function surveyChart({ w = 420, h = 300, steps = 10, nbars = 4, firstLabels = [] }) {
  const left = 52, bottom = h - 37, top = 10, right = w - 10, st = (bottom - top) / steps;
  let b = `<rect x="${left}" y="${top}" width="${right - left}" height="${bottom - top}" fill="${T.white}"/>`;
  for (let k = 1; k <= steps; k++) b += `<line x1="${left}" y1="${f1(bottom - k * st)}" x2="${right}" y2="${f1(bottom - k * st)}" stroke="${T.grid}" stroke-width="1" data-e1-gridline="${k}"/>`;
  for (let k = 0; k <= steps; k++) {
    const y = bottom - k * st;
    b += `<line x1="${left - 6}" y1="${f1(y)}" x2="${left}" y2="${f1(y)}" stroke="${T.ink}" stroke-width="2" data-e1-ytick="${k}"/>`;
    if (k < firstLabels.length) b += text(left - 26, y, String(firstLabels[k]), 14, { attrs: `data-e1-scale="${firstLabels[k]}"` });
    else b += `<line x1="${left - 40}" y1="${f1(y + 6)}" x2="${left - 12}" y2="${f1(y + 6)}" stroke="${T.inkSoft}" stroke-width="1" stroke-dasharray="2 2" data-e1-scaleblank="${k}"/>`;
  }
  b += `<line x1="${left}" y1="${top - 4}" x2="${left}" y2="${bottom}" stroke="${T.ink}" stroke-width="2.5"/><line x1="${left}" y1="${bottom}" x2="${right + 4}" y2="${bottom}" stroke="${T.ink}" stroke-width="2.5"/>`;
  const slot = (right - left) / nbars;
  for (let i = 0; i < nbars; i++) b += `<line x1="${f1(left + i * slot + 8)}" y1="${bottom + 28}" x2="${f1(left + (i + 1) * slot - 8)}" y2="${bottom + 28}" stroke="${T.ink}" stroke-width="1.2" data-e1-barlabel="${i}"/>`;
  return artSvg(b, w, h, `data-e1-art="survey-chart" data-e1-steps="${steps}" data-e1-bars="${nbars}"`);
}

module.exports = { PAL_E1, MONEY, label, isNote, coin, note, money, purseClasp, awning, counter, post, kgWeight, balanceKg, kitchenScale, shelf, rechenstrich, emptyLine, columnCalc, kaestchen, surveyChart, artSvg, svgPic, text, esc, f1 };
