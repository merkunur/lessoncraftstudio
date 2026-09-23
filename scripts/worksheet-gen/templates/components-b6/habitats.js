/**
 * components-b6/habitats.js — the G1-398 `habitats` components (nt5-F, b6; design
 * docs/worksheet-gen/b6-designs/G1-398-habitats.md §2 "NEW templates/components-b6/habitats.js").
 * Pure markup on the tokens (scoped inline styles, no page.css edit); the SPEC composes, stamps
 * and guards. Every export is prefixed `hb` (the b6 barrel refuses a duplicate export name).
 *
 * BASE (built 2026-09-23): "The Habitat Museum" — a wall of framed cut-away windows over a
 * drawer of animal cards.
 *   hbWindow({ tile, habitat, letter, plaque, w = 300, plaquePx = 17 })
 *     .hb-window: the museum frame — white, border teal 3, r 14, a 3 px white mat round the
 *     habitat-tile (which draws its own teal 3 window frame): 3 + 3 + w + 3 + 3 wide (312 at
 *     w 300), 3 + 3 + h + 3 + 3 high (148). A coral letter disc r 17 centred at the card's
 *     (22, 22) with a white 2 px halo ring and the letter in white Baloo 2 800 22. A name
 *     plaque (white pill, teal 1.5, h 26, Baloo 2 700 plaquePx ink, ONE line, max-width 280)
 *     centred on the bottom rail, overhanging 13 px — the cell reserves the overhang, so the
 *     cell is card + 13 high. plaque null = no plaque (d3). Stamps: data-lcs-window=<letter>,
 *     data-lcs-habitat=<habitat key>, data-lcs-plaque on the plaque, data-lcs-disc on the disc.
 *   hbWall({ windows, w = 639, colGap = 15, rowGap = 14 })         a wrapping row of window cells
 *     (two a row; an odd last window centred)
 *   hbSpecimenCard({ src, key, picPx, answer, w, boxW = 64, boxH = 44 })
 *     one drawer card: white, border teal 2, r 12, padding 6 (2 + 6 + 84 + 6 + 44 + 6 + 2 = the
 *     design's 150; its '+ 8 pad' arithmetic left the border out); the library picture (contain,
 *     picPx square) + 6 + an OPEN blankNumeralBox carrying the window letter in data-lcs-answer
 *     (renders empty). data-lcs-animal=<bank key> + data-lcs-answer=<letter> on the card.
 *   hbDrawer({ cards, cols, colGap = 13, rowGap = 12, w = 639 })   the grid of cards
 *   hbSpacer({ min = 18, max = 60 })                              the ONE flexible band between
 *     the wall and the drawer (slack beyond max falls below the drawer)
 *
 * FACES (Phase E, 2026-09-23; record _work/G1-398-faces.md): hbGap, hbPlaque, hbHomeMatch (F1),
 * hbStrangerRow (F2), hbAdaptBank + hbAdaptRow (F3), hbNeedsHead + hbNeedsRow (F4), hbReport (F5),
 * each documented at its definition below. The base components are unchanged.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { esc } = require('../../primitives/_svg.js');
const { blankNumeralBox } = require('../components-b3.js');

const T = tokens.color;
const F = tokens.font;
const FRAME = 3, MAT = 3, OVERHANG = 13, DISC_R = 17;

function hbWindow({ tile, habitat, letter, plaque, plaquePx = 17 }) {
  const cardW = tile.width + 2 * (FRAME + MAT), cardH = tile.height + 2 * (FRAME + MAT);
  const disc = letter
    ? `<span data-lcs-disc style="position:absolute;left:${22 - DISC_R - FRAME}px;top:${22 - DISC_R - FRAME}px;width:${2 * DISC_R}px;height:${2 * DISC_R}px;box-sizing:border-box;border-radius:50%;background:${T.coral};box-shadow:0 0 0 2px ${T.white};color:${T.white};font-family:${F.display},cursive;font-weight:800;font-size:22px;line-height:${2 * DISC_R}px;text-align:center">${esc(letter)}</span>`
    : '';
  const plq = plaque != null
    ? `<span data-lcs-plaque style="position:absolute;left:50%;bottom:-${OVERHANG + FRAME}px;transform:translateX(-50%);height:26px;max-width:280px;box-sizing:border-box;padding:0 14px;display:inline-flex;align-items:center;white-space:nowrap;overflow:hidden;background:${T.white};border:1.5px solid ${T.teal};border-radius:13px;font-family:${F.display},cursive;font-weight:700;font-size:${plaquePx}px;line-height:1;color:${T.ink}">${esc(plaque)}</span>`
    : '';
  return `<div class="hb-cell" style="width:${cardW}px;height:${cardH + OVERHANG}px;flex:0 0 auto">` +
    `<div class="hb-window" data-lcs-window="${esc(letter || '')}" data-lcs-habitat="${esc(habitat)}" style="position:relative;width:${cardW}px;height:${cardH}px;box-sizing:border-box;background:${T.white};border:${FRAME}px solid ${T.teal};border-radius:14px;padding:${MAT}px;line-height:0">` +
    tile.svg + disc + plq + `</div></div>`;
}

function hbWall({ windows, w = 639, colGap = 15, rowGap = 14 }) {
  // a wrapping row: two windows a row at w 639, an odd last window centred under the others (d1: 3)
  return `<div class="hb-wall" data-lcs-wall style="display:flex;flex-wrap:wrap;justify-content:center;column-gap:${colGap}px;row-gap:${rowGap}px;width:${w}px;flex:0 0 auto">${windows.join('')}</div>`;
}

function hbSpecimenCard({ src, key, picPx, answer, w, boxW = 64, boxH = 44 }) {
  return `<div class="hb-card" data-lcs-animal="${esc(key)}" data-lcs-answer="${esc(answer)}" style="width:${w}px;box-sizing:border-box;flex:0 0 ${w}px;background:${T.white};border:2px solid ${T.teal};border-radius:12px;padding:6px;display:flex;flex-direction:column;align-items:center;gap:6px">` +
    `<img class="ws-icon" data-lcs-pic src="${src}" alt="" style="width:${picPx}px;height:${picPx}px;object-fit:contain;display:block">` +
    // wrapped in a ROW: blankNumeralBox carries flex:0 0 <w>px, which in this column card would set its HEIGHT
    `<span style="display:flex;justify-content:center;flex:0 0 auto">` + blankNumeralBox({ w: boxW, h: boxH, answer, attrs: `data-lcs-letter-box="${esc(key)}"` }) + `</span>` +
    `</div>`;
}

function hbDrawer({ cards, cols, colGap = 13, rowGap = 12 }) {
  return `<div class="hb-drawer" data-lcs-drawer data-lcs-cols="${cols}" style="display:grid;grid-template-columns:repeat(${cols},auto);column-gap:${colGap}px;row-gap:${rowGap}px;justify-content:center;flex:0 0 auto">${cards.join('')}</div>`;
}

function hbSpacer({ min = 18, max = 60 } = {}) {
  return `<div class="hb-spacer" data-lcs-spacer style="flex:1 1 0;min-height:${min}px;max-height:${max}px"></div>`;
}

/* ======================================================================= FACES (Phase E)
 * Every face root is top-anchored; its content blocks carry data-lcs-block (the SPARSE / FILL
 * gate measures the bands between consecutive blocks) and its flexible bands data-lcs-gap
 * (flex 1 1 0, min 10, max 40: the body's slack is shared out, never one tall blank band). */
function hbGap({ min = 10, max = 40 } = {}) {
  return `<div data-lcs-gap style="flex:1 1 0;min-height:${min}px;max-height:${max}px"></div>`;
}

/** A plaque (the base's, sized for a narrower card): white pill, teal 1.5, h 26, ONE line. */
function hbPlaque({ text, px = 17, maxW = 280, bottom = -16 }) {
  return `<span data-lcs-plaque style="position:absolute;left:50%;bottom:${bottom}px;transform:translateX(-50%);height:26px;max-width:${maxW}px;box-sizing:border-box;padding:0 12px;display:inline-flex;align-items:center;white-space:nowrap;overflow:hidden;background:${T.white};border:1.5px solid ${T.teal};border-radius:13px;font-family:${F.display},cursive;font-weight:700;font-size:${px}px;line-height:1;color:${T.ink}">${esc(text)}</span>`;
}

/**
 * F1 hbHomeMatch — two columns in the .ws-match layout: six animal cards (left, a coral dot on the
 * inner edge) and six drawn homes (right). Items STRETCH with the body (flex 1 1 100px, 100..130 px
 * high, 130 wide) and their art is sized to the item by container units (picture = the item less
 * 12 px, the home less 8 px): >= 84 / 88 px at the 677 body, larger at 814. No word anywhere.
 */
function hbHomeMatch({ left, right, gap = 10 }) {
  const item = (inner, side, attrs) => `<div class="ws-match-item ws-match-item--plain" data-lcs-block ${attrs} style="width:130px;flex:1 1 100px;min-height:100px;max-height:130px;box-sizing:border-box;border-color:${T.teal};container-type:size">` +
    inner + `<span class="ws-match-dot ws-match-dot--${side}" data-lcs-dot></span></div>`;
  const fit = (pad) => `width:min(calc(100cqw - ${pad}px), calc(100cqh - ${pad}px));height:min(calc(100cqw - ${pad}px), calc(100cqh - ${pad}px))`;
  const L = left.map((a, i) => item(`<img class="ws-icon" data-lcs-pic src="${a.src}" alt="" style="${fit(12)};object-fit:contain;display:block">`, 'right', `data-lcs-animal="${esc(a.key)}" data-lcs-row="${i}"`)).join('');
  const R = right.map((h, i) => item(h.svg.replace('<svg ', `<svg style="${fit(8)};display:block" `), 'left', `data-lcs-home-item="${esc(h.home)}" data-lcs-row="${i}"`)).join('');
  return `<div class="ws-match hb-match" data-lcs-homes-match style="padding:6px 30px">` +
    `<div class="ws-match-col" style="justify-content:flex-start;gap:${gap}px">${L}</div>` +
    `<div class="ws-match-col" style="justify-content:flex-start;gap:${gap}px">${R}</div></div>`;
}

/**
 * F2 hbStrangerRow — one habitat window (the base's museum frame, NO letter disc, the plaque on its
 * bottom rail) beside a 2 x 2 grid of four animal cards. The row is a size container: the window's
 * height follows the row's (a tile of at most 132 px), the cards share the rest (picture = min(card)
 * - 12). data-lcs-habitat on the row; data-lcs-animal + data-lcs-odd="1|0" + data-lcs-pos on each card.
 */
function hbStrangerRow({ tileSvg, habitat, plaque, plaquePx = 17, cards }) {
  const tile = tileSvg.replace('<svg ', '<svg style="height:min(calc(100cqh - 25px), 132px);width:auto;display:block" ');
  const win = `<div class="hb-window" data-lcs-window="" data-lcs-habitat="${esc(habitat)}" style="position:relative;box-sizing:border-box;background:${T.white};border:${FRAME}px solid ${T.teal};border-radius:14px;padding:${MAT}px;line-height:0">` +
    tile + (plaque != null ? hbPlaque({ text: plaque, px: plaquePx, maxW: 250 }) : '') + `</div>`;
  const fit = 'width:min(calc(100cqw - 12px), calc(100cqh - 12px));height:min(calc(100cqw - 12px), calc(100cqh - 12px))';
  const cs = cards.map((c, i) => `<div class="hb-card" data-lcs-animal="${esc(c.key)}" data-lcs-odd="${c.odd ? 1 : 0}" data-lcs-pos="${i}" style="box-sizing:border-box;background:${T.white};border:2px solid ${T.teal};border-radius:12px;display:flex;align-items:center;justify-content:center;container-type:size;min-height:0">` +
    `<img class="ws-icon" data-lcs-pic src="${c.src}" alt="" style="${fit};object-fit:contain;display:block"></div>`).join('');
  return `<div class="hb-orow" data-lcs-block data-lcs-orow data-lcs-habitat="${esc(habitat)}" style="display:grid;grid-template-columns:auto 1fr;column-gap:14px;align-items:center;min-height:0;container-type:size">` +
    `<div style="padding-bottom:13px">${win}</div>` +
    `<div data-lcs-cards style="display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:10px 11px;height:100cqh;min-height:0">${cs}</div></div>`;
}

/** F3 hbAdaptBank — seven lettered animal cards (86 wide, coral disc r 14 top-left). */
function hbAdaptBank({ cards, w = 639, cardW = 86, cardH = 104, picPx = 64 }) {
  const gap = ((w - cards.length * cardW) / (cards.length - 1)).toFixed(2);
  const cs = cards.map((c) => `<div class="hb-bank-card" data-lcs-animal="${esc(c.key)}" data-lcs-letter="${esc(c.letter)}" style="position:relative;width:${cardW}px;height:${cardH}px;flex:0 0 ${cardW}px;box-sizing:border-box;background:${T.white};border:2px solid ${T.teal};border-radius:12px;display:flex;align-items:flex-end;justify-content:center;padding-bottom:8px">` +
    `<span data-lcs-disc style="position:absolute;left:-2px;top:-2px;width:28px;height:28px;border-radius:50%;background:${T.coral};box-shadow:0 0 0 2px ${T.white};color:${T.white};font-family:${F.display},cursive;font-weight:800;font-size:18px;line-height:28px;text-align:center">${esc(c.letter)}</span>` +
    `<img class="ws-icon" data-lcs-pic src="${c.src}" alt="" style="width:${picPx}px;height:${picPx}px;object-fit:contain;display:block"></div>`).join('');
  return `<div class="hb-bank" data-lcs-block data-lcs-adapt-bank style="display:flex;gap:${gap}px;width:${w}px;flex:0 0 auto">${cs}</div>`;
}

/** F3 hbAdaptRow — a sentence strip: the feature sentence (Nunito 700 17 / 22, <= 3 lines) + an OPEN letter box. */
function hbAdaptRow({ claim, text, answer, boxW = 56, boxH = 48 }) {
  return `<div class="hb-arow" data-lcs-block data-lcs-adapt="${esc(claim)}" data-lcs-answer="${esc(answer)}" style="display:flex;align-items:center;gap:12px;box-sizing:border-box;min-height:0;background:${T.white};border:1.5px solid ${T.teal};border-radius:10px;padding:4px 12px">` +
    `<span data-lcs-sentence style="flex:1 1 auto;font-family:${F.body},sans-serif;font-weight:700;font-size:17px;line-height:22px;color:${T.ink}">${esc(text)}</span>` +
    `<span style="display:flex;flex:0 0 auto">` + blankNumeralBox({ w: boxW, h: boxH, answer, attrs: `data-lcs-letter-box="${esc(claim)}"` }) + `</span></div>`;
}

/** F4 hbNeedsHead — the head line (water taught ONCE) + two tealSoft column pills over the pairs. */
function hbNeedsHead({ line, foodHead, homeHead, geo }) {
  const pill = (t, k) => `<span data-lcs-colhead="${k}" style="width:${geo.pairW}px;height:30px;flex:0 0 ${geo.pairW}px;display:inline-flex;align-items:center;justify-content:center;border-radius:15px;background:${T.tealSoft};color:${T.teal};font-family:${F.display},cursive;font-weight:700;font-size:16px;white-space:nowrap;overflow:hidden">${esc(t)}</span>`;
  return `<div data-lcs-block data-lcs-needs-head style="display:flex;flex-direction:column;align-items:center;gap:10px;width:639px;flex:0 0 auto">` +
    `<div data-lcs-needs-line style="font-family:${F.body},sans-serif;font-weight:800;font-size:17px;line-height:26px;color:${T.ink};white-space:nowrap">${esc(line)}</div>` +
    `<div style="display:flex;width:639px;box-sizing:border-box;padding:0 ${geo.pad}px"><span style="flex:0 0 ${geo.animalW + geo.g1}px"></span>${pill(foodHead, 'food')}<span style="flex:0 0 ${geo.g2}px"></span>${pill(homeHead, 'home')}</div></div>`;
}

/** F4 hbNeedsRow — one creamDeep strip: the animal card, then a FOOD pair and a HOME pair of chips to circle. */
function hbNeedsRow({ animal, foods, homes, geo }) {
  const chip = (inner, need, it) => `<span class="hb-chip" data-lcs-need="${need}" data-lcs-item="${esc(it.item)}" data-lcs-ok="${it.ok ? 1 : 0}" style="width:${geo.chip}px;height:${geo.chip}px;flex:0 0 ${geo.chip}px;box-sizing:border-box;background:${T.white};border:1.5px solid ${T.teal};border-radius:10px;display:inline-flex;align-items:center;justify-content:center">${inner}</span>`;
  const img = (src, px) => `<img class="ws-icon" data-lcs-pic src="${src}" alt="" style="width:${px}px;height:${px}px;object-fit:contain;display:block">`;
  return `<div class="hb-nrow" data-lcs-block data-lcs-nrow data-lcs-animal="${esc(animal.key)}" style="display:flex;align-items:center;box-sizing:border-box;min-height:0;background:${T.creamDeep};border-radius:14px;padding:0 ${geo.pad}px;width:639px">` +
    `<span data-lcs-animal-card style="width:${geo.animalW}px;height:${geo.animalW}px;flex:0 0 ${geo.animalW}px;box-sizing:border-box;background:${T.white};border:2px solid ${T.teal};border-radius:12px;display:inline-flex;align-items:center;justify-content:center">${img(animal.src, geo.animalPic)}</span>` +
    `<span style="flex:0 0 ${geo.g1}px"></span>` +
    `<span data-lcs-pair="food" style="display:inline-flex;gap:${geo.pg}px">${foods.map((f) => chip(img(f.src, geo.pic), 'food', f)).join('')}</span>` +
    `<span style="flex:0 0 ${geo.g2}px"></span>` +
    `<span data-lcs-pair="home" style="display:inline-flex;gap:${geo.pg}px">${homes.map((h) => chip(h.svg, 'home', h)).join('')}</span></div>`;
}

/**
 * F5 hbReport — ONE big empty window of the locale's home habitat (the museum frame, plaque Baloo 20),
 * then "animals" + three writing lanes (stacked, full width), "plant" + one lane, and the chip row
 * [hot][cold] · [wet][dry] — ONLY the pairs with a true answer for the habitat (`pairs` = [[k1,text],[k2,text],true key]; the
 * true chip carries data-lcs-true for the gate, never printed). Blocks separated by hbGap bands (FILL at 814, fits at 677).
 */
function hbReport({ tile, habitat, plaque, labels, lanesAnimals, lanePlant, pairs }) {
  const win = `<div data-lcs-block style="padding-bottom:13px;flex:0 0 auto"><div class="hb-window" data-lcs-window="" data-lcs-habitat="${esc(habitat)}" style="position:relative;width:${tile.width + 12}px;box-sizing:border-box;background:${T.white};border:${FRAME}px solid ${T.teal};border-radius:14px;padding:${MAT}px;line-height:0">` +
    tile.svg + hbPlaque({ text: plaque, px: 20, maxW: 360, bottom: -16 }) + `</div></div>`;
  const label = (t, k) => `<div data-lcs-label="${k}" style="font-family:${F.body},sans-serif;font-weight:800;font-size:17px;line-height:24px;color:${T.ink};margin-bottom:6px">${esc(t)}</div>`;
  const pill = (t, k, truth) => `<span data-lcs-chip="${k}"${truth === k ? ' data-lcs-true="1"' : ''} style="min-width:110px;height:48px;box-sizing:border-box;padding:0 18px;display:inline-flex;align-items:center;justify-content:center;background:${T.white};border:2px solid ${T.teal};border-radius:24px;font-family:${F.display},cursive;font-weight:700;font-size:20px;color:${T.ink};white-space:nowrap">${esc(t)}</span>`;
  const chipRow = `<div data-lcs-block data-lcs-chips style="display:flex;justify-content:center;align-items:center;gap:14px;flex:0 0 auto">` +
    pairs.map(([[k1, t1], [k2, t2], truth]) => pill(t1, k1, truth) + pill(t2, k2, truth)).join('<span style="width:26px"></span>') + `</div>`;
  return win + hbGap({ min: 10 }) +
    `<div data-lcs-block data-lcs-lanes="animals" style="width:639px;flex:0 0 auto">${label(labels.animals, 'animals')}${lanesAnimals}</div>` + hbGap({ min: 10 }) +
    `<div data-lcs-block data-lcs-lanes="plant" style="width:639px;flex:0 0 auto">${label(labels.plant, 'plant')}${lanePlant}</div>` + hbGap({ min: 10 }) + chipRow;
}

module.exports = { hbWindow, hbWall, hbSpecimenCard, hbDrawer, hbSpacer, hbGap, hbPlaque, hbHomeMatch, hbStrangerRow, hbAdaptBank, hbAdaptRow, hbNeedsHead, hbNeedsRow, hbReport };
