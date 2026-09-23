/**
 * components-b5/road-safety.js — the K-369 `road-safety` base components
 * (design docs/worksheet-gen/b5-designs/K-369-road-safety.md §2). Inline CSS
 * only, class prefix `rs-`; every drawn signal sits in `[data-lcs-signal]`
 * (the primitives stamp it). The face components the design names
 * (lightStreet, crossingCard, meaningItem, letterCard, classBin, quizRow) are
 * Phase E and are NOT exported here yet; `signPost` is (the sign gate and the
 * faces share it).
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

module.exports = { streetStrip, forkGrid, signPost };
