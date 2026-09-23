/**
 * components-b5/road-safety.js — the K-369 `road-safety` base components
 * (design docs/worksheet-gen/b5-designs/K-369-road-safety.md §2). Inline CSS
 * only, class prefix `rs-`; every drawn signal sits in `[data-lcs-signal]`
 * (the primitives stamp it). Phase E (2026-09-23) adds the face components the
 * design names, exported with an rs prefix: rsFace, rsLightStreet (F1),
 * rsCrossingCard (F2), rsSignOnPost + rsMeaningPair (F3), rsLetterCard +
 * rsClassBin (F4), rsQuizRow (F5).
 *
 *   streetStrip({ actor, lit, light, words, geom })   one side-view street
 *   forkGrid({ strips, geom, stamps })                the base stage
 *   signPost({ spec, s, postH, role })                a regulation sign on its post
 */
'use strict';
const { esc } = require('../../primitives/_svg.js');
const tokens = require('../../primitives/_tokens.js');
const { trafficLight } = require('../../primitives/traffic-light.js');
const { walker, car, streetBand } = require('../../primitives/road-pictogram.js');
const { roadSign } = require('../../primitives/road-sign.js');

const T = tokens.color;

/** The pill: border-box 110 wide, 2 px teal border, padding 6 → inner text width 94 (design §2). */
function pill(text, w) {
  return `<div class="rs-pill" data-lcs-pill style="box-sizing:border-box;width:${w}px;border:2px solid ${T.teal};border-radius:14px;background:${T.white};padding:6px;font-family:'Baloo 2',cursive;font-weight:700;font-size:18px;line-height:22px;text-align:center;color:${T.ink};overflow-wrap:normal;word-break:normal;hyphens:none">${esc(text)}</div>`;
}

/**
 * One street strip. actor 'ped' | 'car'; light = the trafficLight() options
 * (kind, lamps, on, pedStyle, pedStop, amberToken, lampD); words {stop, go} or
 * null (pillWords off); geom {w, h, band, cells:[stopX, stopW, lightX, lightW,
 * goX, goW], walkerH, carW, pedTop, poleLen, carPoleLen, pillW, pillGap}.
 */
function streetStrip({ actor, light, words, geom }) {
  const g = geom;
  const bandTop = g.h - g.band;                      // the MINIMUM strip; the row may stretch it (the pole grows)
  const [sx, sw, lx, lw, gx, gw] = g.cells;
  const poleX = lx + lw / 2;
  const tl = trafficLight({ ...light, top: 0, poleLen: 0 });
  // the head: car at the strip top, ped `pedTop` lower (the height cue); a teal pole div fills down to the band,
  // so a stretched row lengthens the POLE and never opens a blank band above the lights
  const housingH = tl.meta.housing.h;
  const top = actor === 'car' ? 0 : g.pedTop;
  const minPole = bandTop - top - housingH;
  if (minPole < 4) throw new Error(`streetStrip: the ${actor} light (${housingH} tall at top ${top}) does not fit a ${bandTop} px street (pole ${minPole})`);
  const cell = (side, x, w) => {
    const pic = actor === 'ped'
      ? walker({ pose: side === 'stop' ? 'standing' : 'walking', h: g.walkerH, data: { side } }).svg
      : car({ state: side === 'stop' ? 'waiting' : 'driving', w: g.carW, data: { side } }).svg;
    const p = words ? pill(words[side], g.pillW) + `<div style="height:${g.pillGap}px"></div>` : '';
    return `<div class="rs-cell" data-lcs-side="${side}" style="position:absolute;left:${x}px;top:0;bottom:${g.band}px;width:${w}px;display:flex;flex-direction:column;align-items:center;justify-content:flex-end">${p}<div class="rs-pic" data-lcs-pic style="display:flex;justify-content:center">${pic}</div></div>`;
  };
  const band = streetBand({ kind: actor === 'ped' ? 'walk' : 'drive', w: g.w, h: g.band, poleX }).svg;
  return `<div class="rs-strip" data-lcs-strip data-lcs-actor="${actor}" data-lcs-pole-x="${poleX}" style="position:relative;width:${g.w}px;height:100%;min-height:${g.h}px">` +
    cell('stop', sx, sw) +
    `<div class="rs-light" style="position:absolute;left:${lx}px;top:0;bottom:${g.band}px;width:${lw}px;display:flex;flex-direction:column;align-items:center">` +
    `<div style="flex:0 0 ${top}px"></div>${tl.svg}<div class="rs-pole" data-lcs-light-part="pole-ext" style="flex:1 1 auto;min-height:4px;width:10px;background:${T.teal}"></div></div>` +
    cell('go', gx, gw) +
    `<div class="rs-band" style="position:absolute;left:0;bottom:0;width:${g.w}px;height:${g.band}px">${band}</div>` +
    '</div>';
}

/**
 * The base stage: `cols` columns of strips, reading order column A top-down then
 * column B; a 1.5 px grid rule down the gutter. Rows are minmax(h, 1fr): the stage
 * fills the body and the slack goes into the POLES (sibling-review ruling
 * 2026-09-23: a fixed-height grid with space-evenly left 40-55 px empty bands
 * between rows at the 778 / 814 chromes).
 */
function forkGrid({ strips, geom, stamps }) {
  const rows = Math.ceil(strips.length / geom.cols);
  const colW = geom.w, gut = geom.gutter;
  const totalW = geom.cols * colW + (geom.cols - 1) * gut;
  const attrs = Object.entries(stamps || {}).map(([k, v]) => ` data-lcs-${k}="${esc(v)}"`).join('');
  const rule = geom.cols > 1 ? `<div class="rs-rule" aria-hidden="true" style="position:absolute;top:0;bottom:0;left:${colW + gut / 2 - 0.75}px;width:1.5px;background:${T.grid}"></div>` : '';
  return `<div class="rs-fork" data-ws-content data-lcs-road-safety${attrs} style="position:relative;flex:1 1 auto;align-self:center;width:${totalW}px;display:grid;grid-template-columns:${Array(geom.cols).fill(colW + 'px').join(` ${gut}px `)};grid-template-rows:repeat(${rows},minmax(${geom.h}px,1fr));row-gap:${geom.rowGap}px">` +
    rule + strips.map((s, i) => {
      const col = Math.floor(i / rows), row = i % rows;
      return `<div style="grid-column:${col * 2 + 1};grid-row:${row + 1};display:flex">${s}</div>`;
    }).join('') + '</div>';
}

/** A regulation sign on its post (faces + the sign gate). */
function signPost({ spec, s, postH, role }) {
  return roadSign({ ...spec, s, post: { h: postH }, role: role || spec.role || '' });
}

/* ===================================================================== Phase E faces (design §3)
 * Every face root is a `.rs-face` flex column that fills the body; the slack of a tall body is
 * absorbed by a DRAWN element that may grow (a light pole, a sign post, a road, a bordered box),
 * never by a blank band (the nt10-E SPARSE / FILL rulings). Class prefix `rs-`; exported names
 * carry the `rs` prefix (the b5 namespace refuses a duplicate export, and b3 owns `letterCard`).
 */
const { svgRoot, el } = require('../../primitives/_svg.js');
const { STANDING_BODY } = require('../../primitives/road-pictogram.js');
const { blankNumeralBox } = require('../components-b3/ordinal-numbers.js');

const fmt = (n) => (Math.round(n * 100) / 100).toString();

/** A face root: the [data-ws-content] stage every verify() reads (mode + stamps). */
function rsFace({ mode, stamps, inner, style = '' }) {
  const attrs = Object.entries(stamps || {}).map(([k, v]) => ` data-lcs-${k}="${esc(typeof v === 'string' ? v : JSON.stringify(v))}"`).join('');
  return `<div class="rs-face" data-ws-content data-lcs-road-safety data-lcs-mode="${mode}"${attrs} style="flex:1 1 auto;align-self:stretch;display:flex;flex-direction:column;min-height:0;${style}">${inner}</div>`;
}

/**
 * F1 — one street of lights: `items` = [{ light: trafficLight options, cx }] on a full-width road.
 * Every light is unfilled (fill:'none'); its on lamp is marked ONLY by rays. The housings share one
 * bottom line (a pedestrian head sits lower); a teal pole div grows down to the road, so a
 * stretched row lengthens the POLES. The road carries a white stop line before every car light and
 * a zebra beside every pedestrian light (the street reads as a street, not as a bar).
 */
function rsLightStreet({ items, w, minH, band = 12, tallest }) {
  const cols = items.map(({ light, cx }) => {
    const tl = trafficLight({ ...light, fill: 'none', top: 0, poleLen: 0 });
    const top = tallest - tl.meta.housing.h;
    return `<div class="rs-lcol" style="position:absolute;left:${fmt(cx - tl.w / 2)}px;width:${fmt(tl.w)}px;top:0;bottom:${band}px;display:flex;flex-direction:column;align-items:center">` +
      `<div style="flex:0 0 ${top}px"></div>${tl.svg}<div class="rs-pole" data-lcs-light-part="pole-ext" style="flex:1 1 auto;min-height:12px;width:10px;background:${T.teal}"></div></div>`;
  }).join('');
  const P = [el('rect', { x: 0, y: 0, width: w, height: band, fill: T.ink, 'data-lcs-band-part': 'road' })];
  for (const { light, cx } of items) {
    if (light.kind === 'car') P.push(el('rect', { x: fmt(cx - 30), y: 2, width: 6, height: band - 4, fill: T.white, 'data-lcs-band-part': 'stopline' }));
    else for (let k = 0; k < 5; k++) P.push(el('rect', { x: fmt(cx + 14 + k * 16), y: 2, width: 8, height: band - 4, fill: T.white, 'data-lcs-band-part': 'zebra' }));
  }
  const road = svgRoot({ width: w, height: band, label: 'road' }, P.join(''), { style: 'display:block' });
  return `<div class="rs-lstreet" data-lcs-lstreet style="position:relative;width:${w}px;height:100%;min-height:${minH}px">${cols}` +
    `<div class="rs-band" style="position:absolute;left:0;bottom:0;width:${w}px;height:${band}px">${road}</div></div>`;
}

/**
 * F2 — the child seen FROM BEHIND (so the page's left IS the child's left): a dark head with no face
 * (the back of the head) and a light school bag on the back. Drawn here, not with road-pictogram's
 * back poses: at card size their white face-circle under a hair cap read as a FACE WITH A HAT — a
 * child seen from the FRONT, which mirrors left and right (renders 2026-09-23). Unit box 100 x 100.
 *   stance 'stand' | 'walk' (legs apart, walking away up the crossing)
 *   look   -1 (left) | 1 (right) | 0 | 'both'   a SOLID sight arrow from the head: shaft + chevron
 *   swing  true: look-left AGAIN — the arrow is a ↶ that swings from the right over the head back to
 *          the left (the frame must differ from the first look-left, or cards 2 and 4 are undecidable)
 *   ahead  a chevron above the head (walk straight across)
 * Stamps: <g data-lcs-sight data-lcs-dir> whose polygon's far vertex is the tip (the gate parses it).
 */
function backChild({ stance = 'stand', look = 0, ahead = false, swing = false }) {
  const P = [];
  const dx = look === -1 ? -5 : look === 1 ? 5 : 0;
  const hx = 50 + dx, hy = 14, hr = 12;
  if (stance === 'walk') {
    P.push(el('path', { d: 'M50,58 L58,58 L70,95 L62,97 Z', fill: T.ink }), el('path', { d: 'M42,58 L50,58 L38,97 L30,95 Z', fill: T.ink }));
    P.push(el('path', { d: 'M38,28 H62 Q66,28 66,32 V60 H34 V32 Q34,28 38,28 Z', fill: T.ink }));
  } else {
    P.push(el('path', { d: STANDING_BODY, fill: T.ink }));
  }
  // the school bag on the back: the "seen from behind" cue
  for (const sx of [41.5, 55.5]) P.push(el('rect', { x: sx, y: 26, width: 3, height: 7, rx: 1.5, ry: 1.5, fill: T.white }));   // the straps over the shoulders
  P.push(el('rect', { x: 39, y: 31, width: 22, height: 25, rx: 5, ry: 5, fill: T.white, stroke: T.ink, 'stroke-width': 2, 'data-lcs-bag': '1' }));
  P.push(el('rect', { x: 43.5, y: 43, width: 13, height: 9, rx: 2.5, ry: 2.5, fill: 'none', stroke: T.ink, 'stroke-width': 1.6 }));
  P.push(el('circle', { cx: hx, cy: hy, r: hr, fill: T.ink, 'data-lcs-head': '1' }));
  const arrow = (dir) => {
    const x0 = hx + dir * (hr + 3), x1 = x0 + dir * 20, tip = x1 + dir * 14;
    return el('g', { 'data-lcs-sight': '1', 'data-lcs-dir': dir },
      el('line', { x1: fmt(x0), y1: hy, x2: fmt(x1 + dir * 1), y2: hy, stroke: T.ink, 'stroke-width': 4.5, 'stroke-linecap': 'round' }) +
      el('polygon', { points: `${fmt(tip)},${hy} ${fmt(x1)},${hy - 8} ${fmt(x1)},${hy + 8}`, fill: T.ink, 'data-lcs-sight-tip': '1' }));
  };
  // the ↶ swing: from beside the right ear, up over the head, down to a chevron pointing LEFT
  const swingArrow = () => el('g', { 'data-lcs-sight': '1', 'data-lcs-dir': -1, 'data-lcs-swing': '1' },
    el('path', { d: `M${fmt(hx + hr + 5)},${hy + 2} C${fmt(hx + hr + 5)},${hy - 24} ${fmt(hx - 8)},${hy - 28} ${fmt(hx - hr - 8)},${hy - 12}`, fill: 'none', stroke: T.ink, 'stroke-width': 4.5, 'stroke-linecap': 'round' }) +
    el('polygon', { points: `${fmt(hx - hr - 22)},${hy - 10} ${fmt(hx - hr - 7)},${hy - 20} ${fmt(hx - hr - 5)},${hy - 3}`, fill: T.ink, 'data-lcs-sight-tip': '1' }));
  if (swing) P.push(swingArrow());
  else if (look === 'both') P.push(arrow(-1), arrow(1));
  else if (look) P.push(arrow(look));
  if (ahead) P.push(el('g', { 'data-lcs-ahead': '1' }, el('polygon', { points: '50,-16 41,-4 59,-4', fill: T.ink })));
  return P.join('');
}

/**
 * F2 — one crossing card at a kerb with NO lights. The frame is HTML-layered so it grows with the
 * row: the far pavement, the road with a zebra whose stripes run ALONG the kerb (so, looking across,
 * they stack like the rungs of a ladder — vertical bars read as a gate, renders 2026-09-23), the near
 * pavement; the child (backChild, fixed px) stands on the near kerb or, for walk-across, on the
 * zebra. Below: an EMPTY numeral box (blankNumeralBox, answer '').
 */
function rsCrossingCard({ step, w, figH, minFrameH, box }) {
  const FIG = { 'stop-kerb': {}, 'look-left': { look: -1 }, 'look-left-again': { look: -1, swing: true }, 'look-right': { look: 1 }, 'look-both': { look: 'both' }, 'walk-across': { stance: 'walk', ahead: true }, listen: {} };
  if (!FIG[step]) throw new Error(`rsCrossingCard: step "${step}"`);
  const NEAR = 44, FAR = 22;
  const onRoad = step === 'walk-across';
  const figBottom = onRoad ? NEAR + 18 : 6;
  const figSvg = svgRoot({ width: figH, height: fmt(figH * 1.18), viewBox: '0 -18 100 118', label: 'child' }, backChild(FIG[step]), { style: 'display:block;overflow:visible' });
  const zebra = `repeating-linear-gradient(to bottom, ${T.white} 0 12px, ${T.grid} 12px 22px)`;
  const frame = `<div class="rs-cframe" data-lcs-frame style="position:relative;flex:1 1 auto;min-height:${minFrameH}px;border-radius:10px;overflow:hidden;background:${T.grid}">` +
    `<div style="position:absolute;left:0;right:0;top:0;height:${FAR}px;background:${T.tealSoft};border-bottom:2px solid ${T.teal}"></div>` +
    `<div class="rs-zebra" style="position:absolute;left:24%;right:24%;top:${FAR + 6}px;bottom:${NEAR + 6}px;background:${zebra}"></div>` +
    `<div style="position:absolute;left:0;right:0;bottom:0;height:${NEAR}px;background:${T.tealSoft};border-top:2px solid ${T.teal}"></div>` +
    `<div class="rs-cfig" data-lcs-step-fig style="position:absolute;left:50%;bottom:${figBottom}px;width:${figH}px;height:${fmt(figH * 1.18)}px;margin-left:${-figH / 2}px">${figSvg}</div></div>`;
  return `<div class="rs-ccard" data-lcs-step="${esc(step)}" style="box-sizing:border-box;width:${w}px;height:100%;display:flex;flex-direction:column;align-items:stretch;gap:10px;padding:6px;border:2px solid ${T.creamDeep};border-radius:14px;background:${T.cream}">` +
    frame + `<div style="display:flex;justify-content:center">${blankNumeralBox({ w: box.w, h: box.h, answer: '' })}</div></div>`;
}

/** A sign that stands on a post which GROWS with its box (F3 / F4 / F5 share it). */
function rsSignOnPost({ spec, s, role, minPost = 10 }) {
  const sg = roadSign({ ...spec, s, post: null, role });
  return `<div class="rs-signpost" style="flex:1 1 auto;align-self:stretch;display:flex;flex-direction:column;align-items:center;min-height:${fmt(sg.h + minPost + 4)}px">${sg.svg}` +
    `<div class="rs-post" style="flex:1 1 auto;min-height:${minPost}px;width:6px;background:${T.teal};margin-top:-2px"></div>` +
    `<div class="rs-post" style="flex:0 0 4px;width:20px;border-radius:2px;background:${T.teal}"></div></div>`;
}

/** F3 — one left item (a sign on its post) and one right item (a meaning, Nunito 800). */
function rsMeaningPair({ signHtml, meaning, meaningRole, leftW, rightW, minH, px }) {
  const left = `<div class="ws-match-item ws-match-item--plain rs-mitem" data-lcs-sign-item style="flex:1 1 0;min-height:${minH}px;width:${leftW}px;box-sizing:border-box;padding:6px 0">${signHtml}<span class="ws-match-dot ws-match-dot--right"></span></div>`;
  const right = `<div class="ws-match-item ws-match-item--plain rs-mitem" data-lcs-meaning="${esc(meaningRole)}" style="flex:1 1 0;min-height:${minH}px;width:${rightW}px;box-sizing:border-box;padding:6px 14px;justify-content:flex-start"><span class="ws-match-dot ws-match-dot--left"></span>` +
    `<p class="rs-mtext" style="margin:0;font-family:'Nunito',sans-serif;font-weight:800;font-size:${px}px;line-height:${Math.round(px * 1.3)}px;color:${T.ink};text-align:left">${esc(meaning)}</p></div>`;
  return { left, right };
}

/** F4 — a lettered sign card (the letter is the child's handle; the sign starts BELOW the badge, whose 30 px disc sat on the corners of a 100 px diamond / triangle / plate at 38 px less, renders 2026-09-23; the post grows). */
function rsLetterCard({ letter, signHtml, w, cls }) {
  return `<div class="rs-lcard" data-lcs-class="${esc(cls)}" style="position:relative;box-sizing:border-box;width:${w}px;height:100%;padding:38px 0 6px;border:2px solid ${T.creamDeep};border-radius:14px;background:${T.white};display:flex;flex-direction:column;align-items:center">` +
    `<span class="rs-badge" data-lcs-letter style="position:absolute;left:4px;top:4px;width:30px;height:30px;border-radius:50%;background:${T.teal};color:${T.white};font-family:'Baloo 2',cursive;font-weight:700;font-size:18px;line-height:30px;text-align:center">${esc(letter)}</span>` +
    `<div style="flex:1 1 auto;display:flex;flex-direction:column;align-items:center;min-height:0;width:100%">${signHtml}</div></div>`;
}

/** F4 — a meaning-class bin: its word label and `boxes` EMPTY letter boxes (every bin the same count). */
function rsClassBin({ label, cls, boxes, cols, boxW, boxH, w }) {
  const cells = Array.from({ length: boxes }, () => blankNumeralBox({ w: boxW, h: boxH, answer: '', attrs: 'data-lcs-bin-box' })).join('');
  return `<div class="rs-bin" data-lcs-bin="${esc(cls)}" style="box-sizing:border-box;width:${w}px;padding:10px 12px 12px;border:2.5px solid ${T.teal};border-radius:16px;background:${T.tealSoft};display:flex;flex-direction:column;align-items:center;gap:10px">` +
    `<span class="rs-binlabel" data-lcs-bin-label style="box-sizing:border-box;padding:2px 16px;border-radius:999px;background:${T.white};border:2px solid ${T.teal};font-family:'Baloo 2',cursive;font-weight:700;font-size:18px;line-height:26px;color:${T.teal};text-align:center">${esc(label)}</span>` +
    `<div style="display:grid;grid-template-columns:repeat(${cols},${boxW}px);gap:10px">${cells}</div></div>`;
}

/** F5 — one quiz row: the situation box (grows with the row) and the sign tiles. */
function rsQuizRow({ text, role, tiles, boxW, tile, px }) {
  const t = tiles.map((h, i) => `<div class="rs-qtile" data-lcs-slot="${i}" style="box-sizing:border-box;flex:0 0 ${tile}px;height:${tile}px;border:2px solid ${T.creamDeep};border-radius:12px;background:${T.cream};display:flex;align-items:center;justify-content:center">${h}</div>`).join('');
  return `<div class="rs-qrow" data-lcs-qrow="${esc(role)}" style="flex:1 1 auto;display:flex;align-items:center;gap:12px">` +
    `<div class="rs-qbox" style="box-sizing:border-box;flex:0 0 ${boxW}px;align-self:stretch;display:flex;align-items:center;padding:8px 14px;border:2px solid ${T.creamDeep};border-radius:14px;background:${T.white};margin-right:3px">` +
    `<p class="rs-qtext" style="margin:0;font-family:'Nunito',sans-serif;font-weight:800;font-size:${px}px;line-height:${Math.round(px * 1.3)}px;color:${T.ink}">${esc(text)}</p></div>${t}</div>`;
}

module.exports = { streetStrip, forkGrid, signPost, rsFace, rsLightStreet, rsCrossingCard, rsSignOnPost, rsMeaningPair, rsLetterCard, rsClassBin, rsQuizRow };
