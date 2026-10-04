/**
 * cbn-render.js — render a Color by Number Art (primitives/cbn-art/core.js) three ways, and LABEL it.
 *
 *   toSvg(art, { mode: 'line' | 'colour' | 'id', labels })
 *     line    the worksheet: every part white, thick round ink outlines, the numbers (labels) in Baloo 2
 *     colour  the answer key: every part in its crayon colour, same outlines, no numbers
 *     id      the labeller's input: each region a unique flat colour (crispEdges), ink black, no text
 *
 *   labelArt(page, art) → [{ region, colour, x, y, r, area }]  (picture units) — one entry per VISIBLE PIECE of every
 *     coloured region: the number goes at the piece's deepest interior point (distance-transform maximum); r is how
 *     far that point is from the nearest outline. Measured in a real browser on the id render, so occlusion,
 *     outline weight and details (eyes, smiles) are all accounted for.
 *
 *   gate(art, pieces, level) → failures: every visible piece of a coloured region is labelled and has room for its
 *     number (r >= MIN_R); no unlabelled crumbs; the level's colour / region caps.
 */
'use strict';
const { COLOURS } = require('../primitives/cbn-art/core.js');

/** crayon colours (the key swatches, the answer key, the screen paint) */
const PALETTE = {
  red: '#EE4B42', orange: '#FF9A2E', yellow: '#FFD93B', lightgreen: '#A6DB7A', green: '#43A852', lightblue: '#9ED8F5',
  blue: '#3D86D9', purple: '#9B6BD3', pink: '#F7A1C4', brown: '#A0673F', grey: '#A8AFB8', none: '#FFFFFF',
};
const INK = '#262626';
const MIN_R = 8.5;        // picture units: room for a single-digit number (13+ units tall) with a margin
const CRUMB_AREA = 14;    // picture units²: visible bits smaller than this are outline junctions, not parts
const HAIRLINE_R = 2.5;   // a visible bit narrower than ~5 units is a hairline gap where outlines meet, not a part
const LEVEL_CAPS = { 1: { colours: [3, 5], regions: 16 }, 2: { colours: [5, 7], regions: 30 }, 3: { colours: [6, 8], regions: 48 } };

const idColour = (i) => { const n = i + 1; return `rgb(${(n * 37) % 256},${Math.floor(n / 7) * 23 % 256},${(n * 151) % 256})`; };
/** a unique, exactly-recoverable colour per region index (index ≤ 4095) */
const idRgb = (i) => { const n = i + 1; return [((n >> 8) & 15) * 16 + 8, ((n >> 4) & 15) * 16 + 8, (n & 15) * 16 + 8]; };
void idColour;

function toSvg(art, opts = {}) {
  const mode = opts.mode || 'line';
  const regs = art.regions;
  const parts = [];
  let ri = 0;
  for (const it of art.items) {
    const g = (s) => (it.tf ? `<g transform="${it.tf}">${s}</g>` : s);
    if (it.kind === 'r') {
      const i = ri++;
      let fill = '#FFFFFF';
      if (mode === 'colour') fill = PALETTE[it.colour];
      if (mode === 'id') { const c = idRgb(i); fill = `rgb(${c[0]},${c[1]},${c[2]})`; }
      parts.push(g(`<path d="${it.d}" fill="${fill}" stroke="${mode === 'id' ? '#000' : INK}" stroke-width="${it.ow.toFixed(3)}" stroke-linejoin="round" stroke-linecap="round"${mode !== 'id' ? ` data-lcs-region="${i}" data-lcs-colour="${it.colour}"` : ''}/>`));
    } else if (it.kind === 'l') {
      parts.push(g(`<path d="${it.d}" fill="none" stroke="${mode === 'id' ? '#000' : INK}" stroke-width="${it.w.toFixed(3)}" stroke-linecap="round" stroke-linejoin="round"/>`));
    } else if (it.kind === 'k') {
      parts.push(g(`<path d="${it.d}" fill="${mode === 'id' ? '#000' : INK}"/>`));
    } else if (it.kind === 's') {
      parts.push(g(`<path d="${it.d}" fill="${mode === 'id' ? '#000' : '#FFFFFF'}"/>`));
    }
  }
  void regs;
  let text = '';
  if (mode === 'line' && opts.labels) {
    text = opts.labels.map((l) => {
      const fs = Math.max(14, Math.min(28, l.r * 1.25));
      return `<text x="${l.x.toFixed(1)}" y="${(l.y + fs * 0.36).toFixed(1)}" text-anchor="middle" font-family="'Baloo 2', sans-serif" font-weight="700" font-size="${fs.toFixed(1)}" fill="#3A3A3A" data-lcs-num="${l.n}">${l.n}</text>`;
    }).join('');
  }
  const attrs = mode === 'id' ? ' shape-rendering="crispEdges"' : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${art.w} ${art.h}" width="${opts.width || art.w}" height="${opts.height || Math.round((opts.width || art.w) * art.h / art.w)}"${attrs} data-lcs-prim="cbn-art">${parts.join('')}${text}</svg>`;
}

/** label a drawing in the browser (page = a puppeteer page). Scale 2 → 0.5 picture-unit precision. */
async function labelArt(page, art, S = 2) {
  const svg = toSvg(art, { mode: 'id', width: art.w * S, height: art.h * S });
  const n = art.regions.length;
  const out = await page.evaluate(async ({ svg, W, H, n, S }) => {
    const img = new Image();
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
    await img.decode();
    const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
    const cx = cv.getContext('2d', { willReadFrequently: true });
    cx.fillStyle = '#000'; cx.fillRect(0, 0, W, H);   // outside every region = ink (no piece there)
    cx.drawImage(img, 0, 0, W, H);
    const px = cx.getImageData(0, 0, W, H).data;
    const lab = new Int32Array(W * H).fill(-1);
    for (let i = 0; i < W * H; i++) {
      const r = px[i * 4], g = px[i * 4 + 1], b = px[i * 4 + 2];
      if ((r & 15) !== 8 || (g & 15) !== 8 || (b & 15) !== 8) continue;
      const id = ((r >> 4) << 8) + ((g >> 4) << 4) + (b >> 4) - 1;
      if (id >= 0 && id < n) lab[i] = id;
    }
    // distance to the nearest non-same pixel (two-pass chamfer 3-4, /3 ≈ pixels)
    const D = new Float32Array(W * H);
    const BIG = 1e9;
    for (let i = 0; i < W * H; i++) D[i] = lab[i] < 0 ? 0 : BIG;
    const same = (a, b) => lab[a] === lab[b];
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const i = y * W + x; if (!D[i]) continue;
      let v = D[i];
      if (x > 0) v = Math.min(v, same(i, i - 1) ? D[i - 1] + 3 : 3);
      else v = Math.min(v, 3);
      if (y > 0) { v = Math.min(v, same(i, i - W) ? D[i - W] + 3 : 3); if (x > 0) v = Math.min(v, same(i, i - W - 1) ? D[i - W - 1] + 4 : 4); if (x < W - 1) v = Math.min(v, same(i, i - W + 1) ? D[i - W + 1] + 4 : 4); } else v = Math.min(v, 3);
      D[i] = v;
    }
    for (let y = H - 1; y >= 0; y--) for (let x = W - 1; x >= 0; x--) {
      const i = y * W + x; if (!D[i]) continue;
      let v = D[i];
      if (x < W - 1) v = Math.min(v, same(i, i + 1) ? D[i + 1] + 3 : 3); else v = Math.min(v, 3);
      if (y < H - 1) { v = Math.min(v, same(i, i + W) ? D[i + W] + 3 : 3); if (x < W - 1) v = Math.min(v, same(i, i + W + 1) ? D[i + W + 1] + 4 : 4); if (x > 0) v = Math.min(v, same(i, i + W - 1) ? D[i + W - 1] + 4 : 4); } else v = Math.min(v, 3);
      D[i] = v;
    }
    // connected pieces per region (4-connectivity), each with its deepest point
    const seen = new Uint8Array(W * H);
    const pieces = [];
    const q = new Int32Array(W * H);
    for (let s = 0; s < W * H; s++) {
      if (lab[s] < 0 || seen[s]) continue;
      const id = lab[s]; let h = 0, t = 0; q[t++] = s; seen[s] = 1;
      let area = 0, best = -1, bi = s;
      while (h < t) {
        const i = q[h++]; area++;
        if (D[i] > best) { best = D[i]; bi = i; }
        const x = i % W, y = (i / W) | 0;
        if (x > 0 && !seen[i - 1] && lab[i - 1] === id) { seen[i - 1] = 1; q[t++] = i - 1; }
        if (x < W - 1 && !seen[i + 1] && lab[i + 1] === id) { seen[i + 1] = 1; q[t++] = i + 1; }
        if (y > 0 && !seen[i - W] && lab[i - W] === id) { seen[i - W] = 1; q[t++] = i - W; }
        if (y < H - 1 && !seen[i + W] && lab[i + W] === id) { seen[i + W] = 1; q[t++] = i + W; }
      }
      pieces.push({ region: id, area: area / (S * S), x: (bi % W) / S, y: ((bi / W) | 0) / S, r: best / 3 / S });
    }
    return pieces;
  }, { svg, W: art.w * S, H: art.h * S, n, S });
  const regs = art.regions;
  return out.map((p) => ({ ...p, colour: regs[p.region].colour, name: regs[p.region].name }));
}

/** the numbering: colours used (in palette order) → 1..k */
function numbering(art) {
  const used = [...new Set(art.regions.map((r) => r.colour).filter((c) => c !== 'none'))];
  used.sort((a, b) => COLOURS.indexOf(a) - COLOURS.indexOf(b));
  return Object.fromEntries(used.map((c, i) => [c, i + 1]));
}

/** labels for the line render + the gate's failures */
function labelsAndGate(art, pieces, level) {
  const num = numbering(art);
  const fails = [];
  const labels = [];
  const bad = [];
  const visibleRegions = new Set();
  for (const p of pieces) {
    if (p.area < CRUMB_AREA || p.r < HAIRLINE_R) continue;
    visibleRegions.add(p.region);
    if (p.colour === 'none') continue;
    if (p.r < MIN_R) { bad.push({ x: p.x, y: p.y }); fails.push(`region ${p.region}${p.name ? ' (' + p.name + ')' : ''} ${p.colour}: a visible piece too small for its number (r ${p.r.toFixed(1)} < ${MIN_R}, area ${p.area.toFixed(0)})`); continue; }
    labels.push({ x: p.x, y: p.y, r: p.r, n: num[p.colour], region: p.region });
  }
  art.regions.forEach((r, i) => { if (!visibleRegions.has(i)) fails.push(`region ${i}${r.name ? ' (' + r.name + ')' : ''}: not visible at all (hidden by later parts)`); });
  const k = Object.keys(num).length;
  const cap = LEVEL_CAPS[level];
  const nRegions = labels.length;
  if (cap) {
    if (k < cap.colours[0] || k > cap.colours[1]) fails.push(`level ${level}: ${k} colours (want ${cap.colours[0]}-${cap.colours[1]})`);
    if (nRegions > cap.regions) fails.push(`level ${level}: ${nRegions} numbered parts > ${cap.regions}`);
  }
  if (k > 8) fails.push(`${k} colours > 8 (numbers 1-8 only)`);
  return { labels, num, fails, bad, colours: k, parts: nRegions };
}

module.exports = { PALETTE, INK, MIN_R, LEVEL_CAPS, toSvg, labelArt, numbering, labelsAndGate };
