/**
 * thermometer — vertical thermometer primitive (SVG): bulb, tube, scale
 * ticks, coral mercury filled to `value`.
 * params: { value, min=0, max=40, step=5, height=300, bands=null, numerals=true }
 *
 * ADDITIVE options (nt10-D K-356 `weather-symbols` F3, design §2; ruled: one
 * contract, no new primitive). The defaults reproduce the pre-2026-09-21
 * output BYTE FOR BYTE (qa/verify-b4-weather-symbols.js re-renders G3-345 and
 * asserts the frozen sha1; tools/b3-baseline.js --check is the live proof):
 *   bands:[{key, from, to, fill}]  drawn BEFORE the tube: one roundedRect per
 *       band at x tubeX - 22 (40), w 44, from yFor(to) to yFor(from), r 6,
 *       fill = a palette TOKEN NAME (never a hex), no stroke; at every INTERIOR
 *       band boundary a 3 px ink tick across the 44 px band width (the
 *       mono-safe separator; the 2 px step ticks stay). The bands must tile
 *       min..max exactly, in order, non-overlapping (throws otherwise). Each
 *       rect stamps data-lcs-band / data-lcs-band-from / data-lcs-band-to.
 *   numerals:false  skips the label() numeral at every tick (the tick lines
 *       stay). Default true.
 *   meta.bands = [{key, y1, y2}] (svg-local px; y1 = top = yFor(to)).
 * Unchanged: data-lcs-value (the verify channel; never printed), mercury
 * coral, bulb coral, tube white with teal 3.
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, el, roundedRect, line, label } = require('./_svg.js');

function thermometer({ value, min = 0, max = 40, step = 5, height = 300, bands = null, numerals = true }, ctx) {
  const t = (ctx && ctx.tokens) || tokens;
  if (value < min || value > max) throw new Error(`thermometer: value ${value} outside ${min}-${max}`);
  const W = 110, H = height;
  const tubeX = 62, tubeW = 16;
  const bulbR = 17;
  const topY = 14, botY = H - bulbR * 2 - 8;
  const yFor = (v) => botY - ((v - min) / (max - min)) * (botY - topY);
  const parts = [];
  const bandMeta = [];
  if (bands != null) {
    if (!Array.isArray(bands) || !bands.length) throw new Error('thermometer: bands must be a non-empty array');
    const BAND_X = tubeX - 22, BAND_W = 44;
    let cursor = min;
    bands.forEach((b, i) => {
      if (!b || typeof b.key !== 'string' || !b.key) throw new Error(`thermometer: band ${i} has no key`);
      if (typeof b.from !== 'number' || typeof b.to !== 'number' || !(b.to > b.from)) throw new Error(`thermometer: band ${b.key} from/to ${b.from}..${b.to} is not a rising range`);
      if (b.from !== cursor) throw new Error(`thermometer: band ${b.key} starts at ${b.from}, expected ${cursor} (bands must tile ${min}..${max} in order)`);
      if (b.to > max) throw new Error(`thermometer: band ${b.key} ends at ${b.to} > max ${max}`);
      const fill = t.color[b.fill];
      if (typeof b.fill !== 'string' || !fill) throw new Error(`thermometer: band ${b.key} fill "${b.fill}" is not a palette token name`);
      const y1 = yFor(b.to), y2 = yFor(b.from);
      parts.push(roundedRect({ x: BAND_X, y: y1, w: BAND_W, h: y2 - y1, r: 6, fill, data: { 'data-lcs-band': b.key, 'data-lcs-band-from': b.from, 'data-lcs-band-to': b.to } }));
      bandMeta.push({ key: b.key, y1, y2 });
      cursor = b.to;
    });
    if (cursor !== max) throw new Error(`thermometer: bands end at ${cursor}, expected max ${max} (bands must tile ${min}..${max})`);
    // interior boundaries: a 3 px ink tick across the band width (mono-safe)
    for (let i = 1; i < bands.length; i++) {
      const y = yFor(bands[i].from);
      parts.push(line({ x1: BAND_X, y1: y, x2: BAND_X + BAND_W, y2: y, strokeColor: t.color.ink, strokeWidth: 3, cap: 'butt', data: { 'data-lcs-band-edge': bands[i].from } }));
    }
  }
  parts.push(
    roundedRect({ x: tubeX - tubeW / 2, y: topY - 6, w: tubeW, h: botY - topY + 10, r: 8, fill: t.color.white, strokeColor: t.color.teal, strokeWidth: 3 }),
    el('circle', { cx: tubeX, cy: H - bulbR - 5, r: bulbR, fill: t.color.coral, stroke: t.color.teal, 'stroke-width': 3 }),
    // mercury
    roundedRect({ x: tubeX - 5, y: yFor(value), w: 10, h: H - bulbR - 5 - yFor(value), r: 4, fill: t.color.coral, data: { 'data-lcs-mercury': value } }),
  );
  for (let v = min; v <= max; v += step) {
    parts.push(line({ x1: tubeX - tubeW / 2 - 10, y1: yFor(v), x2: tubeX - tubeW / 2 - 2, y2: yFor(v), strokeColor: t.color.ink, strokeWidth: 2 }));
    if (numerals !== false) parts.push(label({ x: tubeX - tubeW / 2 - 26, y: yFor(v), text: v, size: 14, color: t.color.ink, fontFamily: t.font.display, weight: 700, data: { 'data-lcs-tick': v } }));
  }
  const meta = { value, min, max };
  if (bands != null) meta.bands = bandMeta;
  return {
    svg: svgRoot({ width: W, height: H, label: `thermometer at ${value}` },
      parts.join(''), { 'data-lcs-prim': 'thermometer', 'data-lcs-value': value, 'data-lcs-min': min, 'data-lcs-max': max }),
    meta,
    width: W,
    height: H,
  };
}

module.exports = thermometer;
