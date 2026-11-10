#!/usr/bin/env node
/**
 * fl-cbn-specks.js — the white specks of a library Color by Number picture (flagship visual check, operator 2026-11-08:
 * "when the user played interactive worksheets there were some uncolored spots"). The segmenter closes the ink before it
 * finds the pieces (tools/cbn-lineart-build.js), so a tiny white hole inside a knot of lines belongs to no piece: the key
 * and the finished screen leave it white. This finds every such hole on the rendered drawing and records it on its picture
 * (data/fl/cbn/<id>.json specks: [[x, y, r, key]], picture units) with the piece it sits in: designs.js build() paints it
 * with that piece's region, so it colours on the page key and on the screen in the same tap.
 * An eye shine (a hole in ink much thicker than an outline) stays white.
 *   node tools/fl-cbn-specks.js [--only=a,b] [--dry]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { build, pieceColours, partColours } = require('../data/cbn/designs.js');
const R = require('../lib/cbn-render.js');

const arg = (k) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : null; };
const DRY = process.argv.includes('--dry');
const DIR = path.join(__dirname, '..', 'data', 'fl', 'cbn');
const S = 2;                // px per picture unit
const MAX_AREA = 80;        // picture units²: a bigger white area is a section, not a speck (cbn-unpainted / cbn-silent judge those)
const HIGHLIGHT_INK = 8;    // px from the middle of the ink: a pupil's shine (tools/cbn-unpainted.js)
const idRgb = (i) => { const n = i + 1; return [((n >> 8) & 15) * 16 + 8, ((n >> 4) & 15) * 16 + 8, (n & 15) * 16 + 8]; };
const idOf = (r, g, b) => ((r & 15) !== 8 || (g & 15) !== 8 || (b & 15) !== 8) ? -1 : ((r >> 4) << 8) + ((g >> 4) << 4) + (b >> 4) - 1;
const raster = (svg, bg) => sharp(Buffer.from(svg)).flatten({ background: bg }).raw().toBuffer();

async function specksOf(id) {
  const f = path.join(DIR, id + '.json');
  const j = JSON.parse(fs.readFileSync(f, 'utf8'));
  const d = { id, kind: 'picture' };
  const art = build(d, { noSpecks: true });
  const W = art.w * S, H = art.h * S;
  const line = await raster(R.toSvg(art, { mode: 'line', width: W, height: H }), '#ffffff');
  const pieces = [...j.parts.map((p, i) => ({ ...p, key: 'p' + i })), ...(j.mid || []).map((p, i) => ({ ...p, key: 'm' + i })), ...(j.small || []).map((p, i) => ({ ...p, key: 's' + i }))];
  const idSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${art.w} ${art.h}" width="${W}" height="${H}" shape-rendering="crispEdges">` +
    pieces.map((p, i) => `<path d="${p.d}" fill="rgb(${idRgb(i).join(',')})" fill-rule="evenodd"/>`).join('') + '</svg>';
  const ids = await raster(idSvg, '#000000');
  // which numbered region paints each piece: a part or a mid piece itself, a small piece the one it is attached to
  const cs = partColours(d), pc = pieceColours(d);
  const anchorOf = (p) => {
    if (p.key[0] === 'p') return cs[+p.key.slice(1)] && cs[+p.key.slice(1)] !== 'none' ? p.key : null;
    if (p.key[0] === 'm') return pc.mid[+p.key.slice(1)] ? p.key : null;
    const r = pc.small[+p.key.slice(1)]; return r ? r.to : null;
  };
  // ink thickness, to leave an eye shine white
  const dark = (i) => line[i * 3] < 90 && line[i * 3 + 1] < 90 && line[i * 3 + 2] < 90;
  const DT = new Float32Array(W * H);
  for (let i = 0; i < W * H; i++) DT[i] = dark(i) ? 1e9 : 0;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const i = y * W + x; if (!DT[i]) continue; DT[i] = Math.min(DT[i], x ? DT[i - 1] + 3 : 3, y ? DT[i - W] + 3 : 3); }
  for (let y = H - 1; y >= 0; y--) for (let x = W - 1; x >= 0; x--) { const i = y * W + x; if (!DT[i]) continue; DT[i] = Math.min(DT[i], x < W - 1 ? DT[i + 1] + 3 : 3, y < H - 1 ? DT[i + W] + 3 : 3); }
  const white = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) if (line[i * 3] >= 240 && line[i * 3 + 1] >= 240 && line[i * 3 + 2] >= 240) white[i] = 1;
  const seen = new Uint8Array(W * H), q = new Int32Array(W * H), out = [];
  for (let s = 0; s < W * H; s++) {
    if (!white[s] || seen[s]) continue;
    let hd = 0, tl = 0, edge = false, owned = 0; q[tl++] = s; seen[s] = 1;
    while (hd < tl) { const i = q[hd++]; const x = i % W, y = (i / W) | 0; if (x === 0 || y === 0 || x === W - 1 || y === H - 1) edge = true; if (idOf(ids[i * 3], ids[i * 3 + 1], ids[i * 3 + 2]) >= 0) owned++; for (const n of [x > 0 ? i - 1 : -1, x < W - 1 ? i + 1 : -1, y > 0 ? i - W : -1, y < H - 1 ? i + W : -1]) if (n >= 0 && white[n] && !seen[n]) { seen[n] = 1; q[tl++] = n; } }
    const area = tl / (S * S);
    if (edge || area > MAX_AREA || owned / tl > 0.5) continue;   // a section (or a piece's own white): not a speck
    // an eye shine: the hole sits in ink far thicker than an outline
    let thickest = 0, sx = 0, sy = 0;
    for (let h = 0; h < tl; h++) { const i = q[h]; sx += i % W; sy += (i / W) | 0; }
    const cx = sx / tl, cy = sy / tl;
    for (let rr = 4; rr <= 14; rr += 2) for (const [ux, uy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [0.7, 0.7], [-0.7, 0.7], [0.7, -0.7], [-0.7, -0.7]]) { const X = Math.round(cx + ux * rr), Y = Math.round(cy + uy * rr); if (X >= 0 && Y >= 0 && X < W && Y < H) thickest = Math.max(thickest, DT[Y * W + X]); }
    if (thickest / 3 >= HIGHLIGHT_INK) continue;
    // the piece it sits in: the piece most of the nearest painted pixels around it belong to
    const votes = new Map();
    for (let rr = 3; rr <= 30 && !votes.size; rr += 3) for (let a = 0; a < 24; a++) {
      const X = Math.round(cx + Math.cos(a * Math.PI / 12) * (Math.sqrt(tl / Math.PI) + rr)), Y = Math.round(cy + Math.sin(a * Math.PI / 12) * (Math.sqrt(tl / Math.PI) + rr));
      if (X < 0 || Y < 0 || X >= W || Y >= H) continue;
      const k = idOf(ids[(Y * W + X) * 3], ids[(Y * W + X) * 3 + 1], ids[(Y * W + X) * 3 + 2]);
      const an = k >= 0 ? anchorOf(pieces[k]) : null; if (an) votes.set(an, (votes.get(an) || 0) + 1);
    }
    let best = null, bv = 0; for (const [k, v] of votes) if (v > bv) { bv = v; best = k; }
    if (!best) continue;
    out.push([+(cx / S).toFixed(1), +(cy / S).toFixed(1), +(Math.sqrt(area / Math.PI) + 1.2).toFixed(1), best]);
  }
  if (!DRY) { if (out.length) j.specks = out; else delete j.specks; fs.writeFileSync(f, JSON.stringify(j)); }
  return out;
}

(async () => {
  const only = arg('only') ? arg('only').split(',') : null;
  const ids = only || fs.readdirSync(DIR).filter((x) => x.endsWith('.json')).map((x) => x.slice(0, -5));
  let pics = 0, n = 0, k = 0;
  for (const id of ids) {
    const s = await specksOf(id);
    if (s.length) { pics++; n += s.length; }
    if (++k % 200 === 0) console.log(`  ${k} / ${ids.length}`);
    if (only) console.log(id, JSON.stringify(s));
  }
  console.log(`${ids.length} pictures: ${n} specks in ${pics}${DRY ? ' (dry run, nothing written)' : ' written'}`);
})();
