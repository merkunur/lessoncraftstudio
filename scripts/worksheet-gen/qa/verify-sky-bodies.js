#!/usr/bin/env node
/**
 * verify-sky-bodies.js — the gate of primitives/sky-bodies.js (G1-378
 * `earth-and-space`, design §2). Every measure is taken from the EMITTED svg,
 * rasterised (qa/es-raster.js, sharp), never from a return value.
 *
 *   node scripts/worksheet-gen/qa/verify-sky-bodies.js [--no-sheets]
 *
 * HEADS — at the three base head boxes (d1 88 / d2 88 / d3 80): the Sun disc
 *   diameter (coral pixels along the 22.5° ray gap), the Earth and Moon disc
 *   diameters (the drawn extent along the equator row) strictly decrease, Earth
 *   : Moon >= 1.6; the Sun shows 8 separate rays; no <text>; tokens only.
 * earthTop — for a sweep of pin sets (both Sun sides): every coral pin blob
 *   found by connected components in the pixels, its angle from the Earth centre
 *   measured against the Sun direction, and matched to a stamped pin within ±5°;
 *   pins >= 50 px apart; the spin arrow is an arc with sweep-flag 0 from the
 *   left of the pole to its right (counter-clockwise from above the North Pole)
 *   with its head at the END; the disc is white (no night half).
 * sunEdge — the coral limb reaches `depth` px into the box on the middle row
 *   (±1.5), the Sun's R > the Earth's r it is paired with, rays clipped.
 * orbitDisc — the eight slots are byte-identical except the numeral + slot stamp.
 * THROWS — pin at 80°, two pins 20° apart, r 100, sunEdge depth 50, orbitDisc d 30.
 * POISON (each must FAIL for its own reason; the control must PASS the same check):
 *   PR12 a head Sun at discR 20 (smaller than the Earth) · PR6 a pin at 80° (the
 *   primitive throws) · a pin drawn 20° away from its stamped angle · PR8 orbit
 *   disc 6 with a ring · a sunEdge whose limb stops short of `depth`.
 * SHEETS — heads, earthTop, sunEdge, orbit discs; colour + greyscale:
 *   out/dev/G1-378-sky-bodies-sheet-{colour,grey}.png
 */
'use strict';
const path = require('path');
const fs = require('fs');
const T = require('../primitives/_tokens.js');
const SB = require('../primitives/sky-bodies.js');
const { rasterize, nearest, alpha, lum } = require('./es-raster.js');

const PALETTE = new Set(Object.values(T.color).map((c) => c.toUpperCase()));
let assertions = 0;
const fails = [];
const ok = (c, m) => { assertions++; if (!c) fails.push(m); return !!c; };
const SCALE = 4;

function markup(svg, tag, allowText) {
  const f = [];
  const hexes = (svg.match(/#[0-9A-Fa-f]{6}\b/g) || []).map((h) => h.toUpperCase());
  if (!hexes.every((h) => PALETTE.has(h))) f.push(`${tag}: off-palette hex`);
  if (!allowText && /<text\b/.test(svg)) f.push(`${tag}: text inside a body`);
  if (/<image\b|<img\b/.test(svg)) f.push(`${tag}: a picture inside a body`);
  return f;
}

/** Disc diameter in paper px of a body svg (square box, centred disc). */
async function discDiameter(svg, body) {
  const img = await rasterize(svg, +(/width="([\d.]+)"/.exec(svg)[1]) * SCALE);
  const c = img.w / 2;
  if (body === 'sun') {
    // along 22.5° (between two rays): the farthest coral pixel from the centre
    let far = 0;
    const a = Math.PI / 8;
    for (let t = 0; t < c; t += 0.5) {
      const x = Math.round(c + t * Math.cos(a)), y = Math.round(c + t * Math.sin(a));
      if (nearest(img, x, y, ['coral', 'white']) === 'coral' && alpha(img, x, y) > 128) far = t;
    }
    return 2 * far / SCALE;
  }
  const y = Math.floor(c);
  let x0 = null, x1 = null;
  for (let x = 0; x < img.w; x++) if (alpha(img, x, y) > 128) { if (x0 === null) x0 = x; x1 = x; }
  return x0 === null ? 0 : (x1 - x0 + 1) / SCALE;
}
async function rayCount(svg) {
  const img = await rasterize(svg, +(/width="([\d.]+)"/.exec(svg)[1]) * SCALE);
  const c = img.w / 2;
  const disc = +(/data-lcs-discr="([\d.]+)"/.exec(svg)[1]);
  const rr = (disc + 7.4 + 50) / 2 * img.w / 100;   // mid-ray radius
  let n = 0, prev = false, first = null;
  for (let k = 0; k < 720; k++) {
    const a = k * Math.PI / 360;
    const x = Math.round(c + rr * Math.cos(a)), y = Math.round(c + rr * Math.sin(a));
    const on = alpha(img, x, y) > 128 && nearest(img, x, y, ['coral', 'white']) === 'coral';
    if (k === 0) first = on;
    if (on && !prev) n++;
    prev = on;
  }
  if (first && prev) n--;   // the run wrapped
  return n;
}

async function checkHeads(sunSvg, earthSvg, moonSvg, tag) {
  const f = [...markup(sunSvg, tag + ' sun'), ...markup(earthSvg, tag + ' earth'), ...markup(moonSvg, tag + ' moon')];
  const s = await discDiameter(sunSvg, 'sun'), e = await discDiameter(earthSvg, 'earth'), m = await discDiameter(moonSvg, 'moon');
  if (!(s > e && e > m)) f.push(`${tag}: head discs Sun ${s.toFixed(1)} / Earth ${e.toFixed(1)} / Moon ${m.toFixed(1)} px are not strictly decreasing`);
  if (!(e / m >= 1.6)) f.push(`${tag}: Earth : Moon ${(e / m).toFixed(2)} < 1.6`);
  const rays = await rayCount(sunSvg);
  if (rays !== 8) f.push(`${tag}: the Sun shows ${rays} rays (8)`);
  return { f, s, e, m };
}

/** The Earth reads as a GLOBE: land (teal) vs ocean (tealSoft) >= 8 grey levels apart, land 15-50 % of the disc,
 *  >= 2 separate land masses (continents, not one blob); the Moon carries no land. Measured on the pixels. */
async function checkEarthLand(earthSvg, moonSvg, tag) {
  const f = [];
  const land = async (svg) => {
    const img = await rasterize(svg, 400);
    const c = img.w / 2, rr = 43 * img.w / 100, W = img.w;
    let nL = 0, nO = 0, sL = 0, sO = 0;
    const mark = new Uint8Array(W * img.h);
    for (let y = 0; y < img.h; y++) for (let x = 0; x < W; x++) {
      if ((x + 0.5 - c) ** 2 + (y + 0.5 - c) ** 2 > rr * rr) continue;
      const n = nearest(img, x, y, ['teal', 'tealSoft', 'white', 'grid']);
      const L = lum(img, x, y);
      if (n === 'teal') { nL++; sL += L; mark[y * W + x] = 1; } else if (n === 'tealSoft') { nO++; sO += L; }
    }
    // connected land masses (>= 1 % of the disc each)
    const seen = new Uint8Array(W * img.h); let masses = 0;
    for (let i = 0; i < mark.length; i++) {
      if (!mark[i] || seen[i]) continue;
      let n = 0; const st = [i]; seen[i] = 1;
      while (st.length) { const j = st.pop(); n++; const x = j % W, y = (j - x) / W; for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const q = (y + dy) * W + x + dx; if (x + dx >= 0 && x + dx < W && y + dy >= 0 && y + dy < img.h && mark[q] && !seen[q]) { seen[q] = 1; st.push(q); } } }
      if (n > 0.01 * (nL + nO)) masses++;
    }
    return { frac: nL / Math.max(1, nL + nO), dL: nL && nO ? sO / nO - sL / nL : 0, masses };
  };
  const e = await land(earthSvg), m = await land(moonSvg);
  if (!(e.dL >= 8)) f.push(`${tag}: Earth land vs ocean ${e.dL.toFixed(1)} grey levels apart (< 8)`);
  if (!(e.frac >= 0.15 && e.frac <= 0.5)) f.push(`${tag}: Earth land ${(100 * e.frac).toFixed(0)} % of the disc (15-50 %)`);
  if (e.masses < 2) f.push(`${tag}: Earth has ${e.masses} land mass(es) (>= 2 continents, never one blob)`);
  if (m.frac > 0.01) f.push(`${tag}: the Moon carries land (${(100 * m.frac).toFixed(1)} %)`);
  return { f, e };
}

/** Coral connected components of an earthTop render -> centroids (paper px). */
async function pinBlobs(svg) {
  const img = await rasterize(svg, +(/width="([\d.]+)"/.exec(svg)[1]) * 2);
  const k = 2;
  const W = img.w, H = img.h;
  const mark = new Uint8Array(W * H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (alpha(img, x, y) > 128 && nearest(img, x, y, ['coral', 'white', 'teal', 'ink']) === 'coral') mark[y * W + x] = 1;
  const seen = new Uint8Array(W * H);
  const blobs = [];
  for (let i = 0; i < W * H; i++) {
    if (!mark[i] || seen[i]) continue;
    const st = [i]; seen[i] = 1; let n = 0, sx = 0, sy = 0;
    while (st.length) { const j = st.pop(); n++; const x = j % W, y = (j - x) / W; sx += x; sy += y;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const xx = x + dx, yy = y + dy; if (xx < 0 || yy < 0 || xx >= W || yy >= H) continue; const q = yy * W + xx; if (mark[q] && !seen[q]) { seen[q] = 1; st.push(q); } } }
    if (n > 40) blobs.push({ x: (sx / n + 0.5) / k, y: (sy / n + 0.5) / k, n });
  }
  return blobs;
}

async function checkEarthTop(svg, tag) {
  const f = markup(svg, tag, true);
  const r = +(/data-lcs-r="([\d.]+)"/.exec(svg)[1]);
  const sunDir = /data-lcs-sundir="(\w+)"/.exec(svg)[1];
  const Cc = r + 20;
  const stamps = [...svg.matchAll(/data-lcs-n="(\d+)" data-lcs-angle="(-?[\d.]+)"/g)].map((m) => ({ n: +m[1], angle: +m[2] }));
  const blobs = await pinBlobs(svg);
  if (blobs.length !== stamps.length) f.push(`${tag}: ${blobs.length} coral pin blobs for ${stamps.length} stamped pins`);
  const sunPhi = sunDir === 'left' ? 180 : 0;
  const used = new Set();
  for (const b of blobs) {
    let a = Math.atan2(-(b.y - Cc), b.x - Cc) * 180 / Math.PI - sunPhi;
    a = ((a % 360) + 540) % 360 - 180;
    const hit = stamps.find((s) => !used.has(s.n) && Math.abs(((a - s.angle + 540) % 360) - 180) <= 5);
    if (!hit) f.push(`${tag}: a pin drawn at ${a.toFixed(1)}° matches no stamped angle (±5°) ${JSON.stringify(stamps.map((s) => s.angle))}`);
    else used.add(hit.n);
    const rad = Math.hypot(b.x - Cc, b.y - Cc);
    if (Math.abs(rad - 0.8 * r) > 3) f.push(`${tag}: a pin at radius ${rad.toFixed(1)} ≠ 0.8 r = ${0.8 * r}`);
  }
  for (let i = 0; i < blobs.length; i++) for (let j = i + 1; j < blobs.length; j++) {
    const dd = Math.hypot(blobs[i].x - blobs[j].x, blobs[i].y - blobs[j].y);
    if (dd < 50) f.push(`${tag}: two pins ${dd.toFixed(1)} px apart (< 50)`);
  }
  for (const s of stamps) if (Math.abs(Math.abs(s.angle) - 90) < 40) f.push(`${tag}: pin ${s.n} at ${s.angle}° within 40° of the terminator`);
  const spin = /data-lcs-part="spin"/.test(svg) ? /<path d="M ([\d.-]+) ([\d.-]+) A [\d.]+ [\d.]+ 0 0 (\d) ([\d.-]+) ([\d.-]+)" [^>]*data-lcs-part="spin"/.exec(svg) : null;
  if (!spin) f.push(`${tag}: no spin arc`);
  else {
    if (spin[3] !== '0') f.push(`${tag}: the spin arc sweep-flag is ${spin[3]} (0 = counter-clockwise on screen)`);
    if (!(+spin[1] < Cc && +spin[4] > Cc && +spin[2] > Cc && +spin[5] > Cc)) f.push(`${tag}: the spin arc does not run left -> right under the pole`);
    const head = /<path d="M ([\d.-]+) ([\d.-]+) L/.exec(svg.slice(svg.indexOf('spin-head') - 200));
    if (!head || Math.hypot(+head[1] - +spin[4], +head[2] - +spin[5]) > 14) f.push(`${tag}: the spin arrowhead is not at the arc's END`);
  }
  if (!/<circle cx="[\d.]+" cy="[\d.]+" r="[\d.]+" fill="#FFFFFF" stroke="#146B5E"[^>]*data-lcs-part="disc"/.test(svg)) f.push(`${tag}: the Earth disc is not white with a teal rim`);
  if (/data-lcs-part="night"/.test(svg)) f.push(`${tag}: a night half is drawn`);
  return f;
}

async function checkSunEdge(svg, depth, earthR, tag) {
  const f = markup(svg, tag);
  const img = await rasterize(svg, +(/width="([\d.]+)"/.exec(svg)[1]) * 2);
  const side = /data-lcs-side="(\w+)"/.exec(svg)[1];
  const y = Math.floor(img.h / 2);
  let reach = 0;
  // on the middle row the limb: coral run from the edge (ignoring the ray gap beyond the limb)
  for (let i = 0; i < img.w; i++) {
    const x = side === 'left' ? i : img.w - 1 - i;
    if (alpha(img, x, y) > 128 && nearest(img, x, y, ['coral', 'white']) === 'coral') reach = i + 1; else break;
  }
  const got = reach / 2;
  if (Math.abs(got - depth) > 1.5) f.push(`${tag}: the Sun's limb reaches ${got.toFixed(1)} px into the box, depth ${depth}`);
  const R = +(/data-lcs-r="([\d.]+)"/.exec(svg)[1]);
  if (!(R > earthR)) f.push(`${tag}: Sun R ${R} not > Earth r ${earthR}`);
  return f;
}

function checkOrbitDiscs(svgs, tag) {
  const f = [];
  const norm = (s) => s.replace(/data-lcs-slot="\d+"/, '').replace(/>\d+<\/text>/, '></text>');
  const base = norm(svgs[0]);
  svgs.forEach((s, i) => { if (norm(s) !== base) f.push(`${tag}: slot disc ${i + 1} is not identical to slot 1 (only the numeral may differ)`); f.push(...markup(s, tag + ' ' + (i + 1), true)); });
  return f;
}

const poisonLog = [];
let killed = 0, total = 0;
function judge(name, findings, re, control) {
  total++;
  const hit = findings.some((x) => re.test(x));
  const v = hit && control.length === 0 ? 'KILLED' : control.length ? 'CONTROL RED' : findings.length ? 'WRONG REASON' : 'SILENT';
  if (v === 'KILLED') killed++;
  poisonLog.push(`  ${name}: ${v}${v === 'KILLED' ? '' : ' — ' + JSON.stringify((control.length ? control : findings).slice(0, 3))}`);
}
const throws = (fn) => { try { fn(); return null; } catch (e) { return e.message; } };

const HEADS = { 1: 88, 2: 88, 3: 80 };   // the spec's resolved head boxes (d1 88: 96 overflowed the 92 px column)
const headSet = (box, discR = 34) => [SB.sunDisc({ d: box, discR }).svg, SB.earthDisc({ d: box / 2 }).svg, SB.moonDisc({ d: box * 26 / 88 }).svg];
const PIN_SETS = [
  [{ n: 1, angle: 0 }, { n: 2, angle: 180 }],
  [{ n: 4, angle: 25 }, { n: 1, angle: -50 }, { n: 6, angle: 0 }, { n: 2, angle: 155 }, { n: 5, angle: -130 }, { n: 3, angle: 180 }],
  [{ n: 3, angle: -25 }, { n: 5, angle: 50 }, { n: 1, angle: 0 }, { n: 2, angle: 130 }, { n: 6, angle: -155 }, { n: 4, angle: 180 }],
];

async function main() {
  const lines = [];
  for (const [lv, box] of Object.entries(HEADS)) {
    const [s, e, m] = headSet(box);
    const r = await checkHeads(s, e, m, `heads d${lv}`);
    for (const x of r.f) ok(false, x);
    assertions += 4;
    lines.push(`d${lv} box ${box}: Sun ${r.s.toFixed(1)} > Earth ${r.e.toFixed(1)} > Moon ${r.m.toFixed(1)} px`);
  }
  console.log('heads: ' + lines.join(' · '));
  for (const d of [36.8, 44, 88]) {
    const r = await checkEarthLand(SB.earthDisc({ d }).svg, SB.moonDisc({ d: 24 }).svg, `earth d${d}`);
    for (const x of r.f) ok(false, x);
    assertions += 4;
    if (d === 44) console.log(`earth: land ${(100 * r.e.frac).toFixed(0)} % of the disc, ${r.e.masses} land masses, land vs ocean ${r.e.dL.toFixed(0)} grey levels`);
  }
  for (const sunDir of ['left', 'right']) for (const [i, pins] of PIN_SETS.entries()) {
    const f = await checkEarthTop(SB.earthTop({ r: 150, sunDir, pins }).svg, `earthTop ${sunDir} set ${i + 1}`);
    for (const x of f) ok(false, x);
    assertions += pins.length + 3;
  }
  console.log('earthTop: 6 pin sets (both Sun sides) measured from the pixels');
  for (const side of ['left', 'right']) {
    const f = await checkSunEdge(SB.sunEdge({ side, w: 639, h: 380, depth: 96 }).svg, 96, 150, `sunEdge ${side}`);
    for (const x of f) ok(false, x);
    assertions += 2;
  }
  {
    const f = checkOrbitDiscs([1, 2, 3, 4, 5, 6, 7, 8].map((n) => SB.orbitDisc({ d: 36, n }).svg), 'orbit');
    for (const x of f) ok(false, x);
    assertions += 8;
  }
  ok(!!throws(() => SB.earthTop({ r: 150, pins: [{ n: 1, angle: 80 }] })), 'a pin at 80° did not throw');
  ok(!!throws(() => SB.earthTop({ r: 150, pins: [{ n: 1, angle: 0 }, { n: 2, angle: 20 }] })), 'two pins 20° apart (41.7 px) did not throw');
  ok(!!throws(() => SB.earthTop({ r: 100, pins: [] })), 'r 100 did not throw');
  ok(!!throws(() => SB.sunEdge({ side: 'left', w: 639, h: 380, depth: 50 })), 'sunEdge depth 50 did not throw');
  ok(!!throws(() => SB.orbitDisc({ d: 30, n: 1 })), 'orbitDisc d 30 did not throw');
  ok(!throws(() => SB.earthTop({ r: 150, pins: [{ n: 1, angle: 0 }, { n: 2, angle: 25 }] })), 'two pins 25° apart (51.9 px) threw (control)');

  // poisons
  {
    const [s, e, m] = headSet(88);
    const ctl = (await checkHeads(s, e, m, 'ctl')).f;
    judge('PR12 head Sun at discR 20', (await checkHeads(SB.sunDisc({ d: 88, discR: 20 }).svg, e, m, 'P')).f, /not strictly decreasing/, ctl);
  }
  {
    const msg = throws(() => SB.earthTop({ r: 150, pins: [{ n: 1, angle: 80 }] }));
    judge('PR6 a pin at 80°', msg ? [msg] : [], /within 40° of the day\/night line/, []);
  }
  {
    const pins = PIN_SETS[1];
    const good = SB.earthTop({ r: 150, sunDir: 'left', pins }).svg;
    const moved = SB.earthTop({ r: 150, sunDir: 'left', pins: pins.map((p) => (p.n === 4 ? { n: 4, angle: 45 } : p)) }).svg.replace(/data-lcs-n="4" data-lcs-angle="45"/, 'data-lcs-n="4" data-lcs-angle="25"');
    const ctl = await checkEarthTop(good, 'ctl');
    judge('a pin drawn 20° off its stamped angle', await checkEarthTop(moved, 'P'), /matches no stamped angle/, ctl);
  }
  {
    const good = SB.earthDisc({ d: 44 }).svg, moon = SB.moonDisc({ d: 24 }).svg;
    const ctl = (await checkEarthLand(good, moon, 'ctl')).f;
    judge('the Earth land drawn in the ocean fill', (await checkEarthLand(good.replace(/fill="#146B5E" stroke="#146B5E"/g, 'fill="#DDEBE8" stroke="#DDEBE8"'), moon, 'P')).f, /grey levels apart|land 0 %/, ctl);
    const blob = good.replace(/<path d="M -40 -22[^"]*"/, '<path d="M -30 -30 L 20 -30 L 20 30 L -30 30 Z"').replace(/<path d="M 2 9[^"]*" [^>]*\/>/, '').replace(/<path d="M 12 -41[^"]*" [^>]*\/>/, '');
    judge('the Earth as one land blob', (await checkEarthLand(blob, moon, 'P')).f, /1 land mass/, ctl);
  }
  {
    const svgs = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => SB.orbitDisc({ d: 36, n }).svg);
    const ctl = checkOrbitDiscs(svgs, 'ctl');
    const bad = svgs.slice(); bad[5] = bad[5].replace('</svg>', `<ellipse cx="18" cy="18" rx="22" ry="5" fill="none" stroke="${T.color.inkSoft}" stroke-width="2"/></svg>`);
    judge('PR8 orbit disc 6 with a ring', checkOrbitDiscs(bad, 'P'), /slot disc 6 is not identical/, ctl);
  }
  {
    const good = SB.sunEdge({ side: 'left', w: 639, h: 380, depth: 96 }).svg;
    const short = SB.sunEdge({ side: 'left', w: 639, h: 380, depth: 70 }).svg;   // drawn at 70, claimed 96
    judge('a sunEdge limb short of its depth', await checkSunEdge(short, 96, 150, 'P'), /limb reaches 7\d\.\d px into the box, depth 96/, await checkSunEdge(good, 96, 150, 'ctl'));
  }

  const pngs = [];
  if (!process.argv.includes('--no-sheets')) {
    const puppeteer = require('puppeteer');
    const out = path.join(__dirname, '..', 'out', 'dev');
    fs.mkdirSync(out, { recursive: true });
    const fig = (svg, cap) => `<figure style="margin:8px;display:inline-flex;flex-direction:column;align-items:center;justify-content:flex-end;font:12px sans-serif;color:${T.color.ink}">${svg}<figcaption>${cap}</figcaption></figure>`;
    const heads = Object.entries(HEADS).map(([lv, box]) => `<div style="display:inline-flex;align-items:flex-end;border:1px dashed #ccc;margin:4px">${headSet(box).map((s, i) => fig(s, ['Sun', 'Earth', 'Moon'][i] + ' d' + lv)).join('')}</div>`).join('');
    const tops = fig(SB.earthTop({ r: 150, sunDir: 'left', pins: PIN_SETS[1] }).svg, 'earthTop r150 Sun left');
    const edge = fig(SB.sunEdge({ side: 'left', w: 639, h: 380, depth: 96 }).svg, 'sunEdge left 639x380 depth 96');
    const orbit = `<div>${[1, 2, 3, 4, 5, 6, 7, 8].map((n) => fig(SB.orbitDisc({ d: 36, n }).svg, 'slot ' + n)).join('')}</div>`;
    const browser = await puppeteer.launch({ headless: 'new' });
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 2 });
      for (const [name, filter] of [['colour', ''], ['grey', 'filter:grayscale(1)']]) {
        await page.setContent(`<html><head><link rel="stylesheet" href="file:///${path.join(__dirname, '..', 'assets', 'fonts', 'fonts.css').replace(/\\/g, '/')}"></head><body style="margin:8px;background:${T.color.white};${filter}"><div>${heads}</div><div>${tops}${edge}</div>${orbit}</body></html>`);
        const fp = path.join(out, `G1-378-sky-bodies-sheet-${name}.png`);
        await page.screenshot({ path: fp, fullPage: true });
        pngs.push(fp);
      }
    } finally { await browser.close(); }
  }
  console.log('poison:\n' + poisonLog.join('\n'));
  if (pngs.length) console.log('sheets:\n  ' + pngs.join('\n  '));
  if (fails.length) console.log('FAILS:\n  ' + fails.slice(0, 40).join('\n  '));
  const pass = !fails.length && killed === total;
  console.log(pass ? `PASS (${assertions} assertions, ${killed}/${total} poisons killed)` : `FAIL (${fails.length} findings, ${killed}/${total} poisons killed)`);
  return pass;
}

if (require.main === module) main().then((p) => process.exit(p ? 0 : 1), (e) => { console.error(e); process.exit(1); });
module.exports = { checkHeads, discDiameter, checkEarthTop };
