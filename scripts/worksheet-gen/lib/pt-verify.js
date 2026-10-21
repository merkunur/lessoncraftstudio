/**
 * pt-verify.js — the Picture Tracing laws, measured on rasters independent of how the guide was made.
 *
 *   coverage(tr) → { miss, outside, missMask }
 *     miss    = share of the SOURCE ink's skeleton farther than 1.0 stroke width from any guide or solid part
 *               (law b: no line of the drawing is left out)
 *     outside = share of the GUIDE's centreline pixels lying outside the source ink grown by one stroke width
 *               (law a: nothing to erase — a guide that leaves the drawing's own line)
 *   The guide is rasterised by sharp from the same SVG the page would draw, so the measurement is of what prints.
 */
'use strict';
const sharp = require('sharp');
const { pathD } = require('./pt-trace.js');
const { dilate } = require('./cbn-lineart.js');

async function raster(svg, W, H) {
  const buf = await sharp(Buffer.from(svg)).flatten({ background: '#000' }).extractChannel(0).raw().toBuffer();
  const m = new Uint8Array(W * H); for (let i = 0; i < W * H; i++) m[i] = buf[i] > 127 ? 1 : 0;
  return m;
}

async function coverage(tr, guide) {
  const { W, H, sw } = tr;
  const g = guide || { paths: tr.paths, blobs: tr.blobs };
  const head = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="100%" height="100%" fill="#000"/>`;
  const reach = head + g.paths.map((p) => `<path d="${pathD(p.pts, 1, 0, 0, p.closed)}" fill="none" stroke="#fff" stroke-width="${(2 * sw).toFixed(1)}" stroke-linecap="round" stroke-linejoin="round"/>`).join('')
    + g.blobs.map((b) => `<path d="${b.d}" fill="#fff" stroke="#fff" stroke-width="${(2 * sw).toFixed(1)}"/>`).join('') + '</svg>';
  const line = head + g.paths.map((p) => `<path d="${pathD(p.pts, 1, 0, 0, p.closed)}" fill="none" stroke="#fff" stroke-width="1.5"/>`).join('') + '</svg>';
  const R = await raster(reach, W, H), L = await raster(line, W, H);
  let n = 0, m = 0; const missMask = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) if (tr.skeleton[i] || (tr.coreSkeleton && tr.coreSkeleton[i])) { n++; if (!R[i]) { m++; missMask[i] = 1; } }
  const grown = dilate(tr.ink, W, H, Math.ceil(sw * 0.6));
  let gl = 0, go = 0; const outMask = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) if (L[i]) { gl++; if (!grown[i]) { go++; outMask[i] = 1; } }
  return { miss: n ? m / n : 0, outside: gl ? go / gl : 0, missMask, outMask, skeletonPx: n };
}

/** law b per STROKE: every connected piece of the drawing's skeleton longer than 3 stroke widths must be ≥ 85 %
 *  covered — a share over the whole drawing hides a lost smile (60 of 8,281 pixels, 2026-10-21) */
function strokeCoverage(tr, cov) {
  const { W, H, sw } = tr; const { labelInk } = require('./pt-trace.js');
  const { comps } = labelInk(tr.skeleton, W, H);
  const lost = [];
  for (const c of comps) {
    if (c.area < 3 * sw) continue;
    let miss = 0; for (const p of c.pix) if (cov.missMask[p]) miss++;
    if (miss / c.area > 0.15) lost.push({ x: (c.x0 + c.x1) >> 1, y: (c.y0 + c.y1) >> 1, px: c.area, miss: +(miss / c.area).toFixed(2) });
  }
  return lost;
}
/** the tracer laws for one traced drawing → [] or failure strings */
async function tracerLaws(tr, guide) {
  const c = await coverage(tr, guide);
  const f = [];
  if (c.outside > 0.02) f.push('law a: ' + (100 * c.outside).toFixed(1) + ' % of the guide is off the drawing');
  if (c.miss > 0.02) f.push('law b: ' + (100 * c.miss).toFixed(1) + ' % of the drawing is not traced');
  const lost = strokeCoverage(tr, c);
  if (lost.length) f.push('law b: ' + lost.length + ' stroke(s) not traced, e.g. at ' + lost[0].x + ',' + lost[0].y);
  return f;
}

module.exports = { coverage, raster, strokeCoverage, tracerLaws };
