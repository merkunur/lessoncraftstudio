#!/usr/bin/env node
/**
 * fl-glyphs.js — the colouring alphabet and numbers (docs/makers/FLAGSHIP.md). Every letter the 11 languages write and the ten
 * digits, from the site's own rounded school face (Baloo 2 Bold, OFL), drawn huge in a browser, thickened with a round pen so
 * a child has wide shapes to colour, and traced to smooth outlines: data/fl/glyphs.json
 *   { em, base, g: { ch: { d, w, x0, x1, y0, y1, cx, cy, r } } }
 * (d = one path, inner counters as holes, even-odd · w = advance · box · cx cy r = the deepest point, where a face or a
 * pattern centre goes). Units: 1000 per em, y down, baseline at `base`.
 *   node tools/fl-glyphs.js
 */
'use strict';
const fs = require('fs'); const path = require('path');
const puppeteer = require('puppeteer');
const L = require('../lib/cbn-lineart.js');
const { curveD } = require('../art-src/kit.js');

const FONT = path.join(__dirname, '..', 'assets', 'fonts');
const b64 = (f) => fs.readFileSync(path.join(FONT, f)).toString('base64');
const CH = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ÄÖÜäöüßÅåÆæØøÑñÇçÉéÈèÊêËëÁáÀàÂâÃãÍíÌìÎîÏïÓóÒòÔôÕõÚúÙùÛûŒœ+-=?!.,×÷'.split('');
const EM = 1000, S = 1200, BASE = 820, FS = 640;     // the raster: 1200 px square, font 640 px
const PEN = 11, PEN_MARK = 8;                       // px added all round (a letter with a mark keeps the mark apart)
const HAS_MARK = /[ÄÖÜäöüÅåÑñÉéÈèÊêËëÁáÀàÂâÃãÍíÌìÎîÏïÓóÒòÔôÕõÚúÙùÛûij]/;

/** a closed smooth outline through a ring of points */
function ringD(ring, k) {
  const pts = L.rdp(ring, 1.1).map(([x, y]) => [+(x * k).toFixed(1), +(y * k).toFixed(1)]);
  if (pts.length < 3) return '';
  const n = pts.length, at = (i) => pts[(i + n) % n], f = (v) => +v.toFixed(1);
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  // a smooth outline: each handle runs along the tangent at that point, a third of THIS segment long (a handle sized by the
  // neighbouring long edge overshoots a short arc); a sharp bend keeps its corner
  const unit = (a, b) => { const x = b[0] - a[0], y = b[1] - a[1], l = Math.hypot(x, y) || 1; return [x / l, y / l]; };
  const bend = (a, b, c) => { const u = unit(a, b), v = unit(b, c); return u[0] * v[0] + u[1] * v[1]; };
  for (let i = 0; i < n; i++) {
    const p0 = at(i - 1), p1 = at(i), p2 = at(i + 1), p3 = at(i + 2), L3 = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]) / 3;
    const t1 = bend(p0, p1, p2) > 0.55 ? unit(p0, p2) : unit(p1, p2), t2 = bend(p1, p2, p3) > 0.55 ? unit(p1, p3) : unit(p1, p2);
    d += `C${f(p1[0] + t1[0] * L3)} ${f(p1[1] + t1[1] * L3)} ${f(p2[0] - t2[0] * L3)} ${f(p2[1] - t2[1] * L3)} ${p2[0]} ${p2[1]}`;
  }
  return d + 'Z';
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(`<style>@font-face{font-family:B;font-weight:700;src:url(data:font/woff2;base64,${b64('baloo2-700-latin.woff2')}) format('woff2');unicode-range:U+0000-00FF}
    @font-face{font-family:B;font-weight:700;src:url(data:font/woff2;base64,${b64('baloo2-700-latin-ext.woff2')}) format('woff2');unicode-range:U+0100-02BA}</style><span style="font:700 40px B">AŒ</span>`);
  await page.evaluate(() => document.fonts.ready);
  const k = EM / S * (EM / (FS * EM / S));   // px → units: 1000 units per em of FS px
  const K = EM / FS;
  const g = {};
  for (const ch of CH) {
    const r = await page.evaluate((c, S, FS, BASE) => {
      const cv = document.createElement('canvas'); cv.width = S; cv.height = S; const x = cv.getContext('2d');
      x.font = `700 ${FS}px B`; x.fillStyle = '#000'; x.textBaseline = 'alphabetic';
      const w = x.measureText(c).width; x.fillText(c, 200, BASE);
      const d = x.getImageData(0, 0, S, S).data, a = new Array(S * S);
      let s = ''; const m = new Uint8Array(S * S); for (let i = 0; i < S * S; i++) m[i] = d[i * 4 + 3] > 127 ? 1 : 0;
      return { w, m: Array.from(m) };
    }, ch, S, FS, BASE);
    const mask = Uint8Array.from(r.m);
    const fat = L.dilate(mask, S, S, HAS_MARK.test(ch) ? PEN_MARK : PEN);
    let x0 = S, y0 = S, x1 = 0, y1 = 0;
    for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) if (fat[y * S + x]) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    const rings = L.contours((x, y) => x >= 0 && y >= 0 && x < S && y < S && fat[y * S + x] === 1, x0, y0, x1, y1);
    const off = (ring) => ring.map(([x, y]) => [x - 200 + 0, y]);
    const d = rings.map((q) => ringD(off(q), K)).join('');
    // the deepest point (chamfer distance)
    const D = new Float32Array(S * S);
    for (let i = 0; i < S * S; i++) D[i] = fat[i] ? 1e9 : 0;
    for (let y = 1; y < S - 1; y++) for (let x = 1; x < S - 1; x++) { const i = y * S + x; if (D[i]) D[i] = Math.min(D[i], D[i - 1] + 3, D[i - S] + 3, D[i - S - 1] + 4, D[i - S + 1] + 4); }
    for (let y = S - 2; y > 0; y--) for (let x = S - 2; x > 0; x--) { const i = y * S + x; if (D[i]) D[i] = Math.min(D[i], D[i + 1] + 3, D[i + S] + 3, D[i + S + 1] + 4, D[i + S - 1] + 4); }
    let best = 0, cx = 0, cy = 0; for (let i = 0; i < S * S; i++) if (D[i] > best) { best = D[i]; cx = i % S; cy = Math.floor(i / S); }
    g[ch] = { d, w: Math.round((r.w + 2 * PEN) * K), x0: Math.round((x0 - 200) * K), x1: Math.round((x1 - 200) * K), y0: Math.round(y0 * K), y1: Math.round(y1 * K), cx: Math.round((cx - 200) * K), cy: Math.round(cy * K), r: Math.round(best / 3 * K) };
  }
  await browser.close();
  fs.writeFileSync(path.join(__dirname, '..', 'data', 'fl', 'glyphs.json'), JSON.stringify({ em: EM, base: Math.round(BASE * K), g }));
  console.log(Object.keys(g).length + ' glyphs', Math.round(fs.statSync(path.join(__dirname, '..', 'data', 'fl', 'glyphs.json')).size / 1024) + ' KB');
})().catch((e) => { console.error(e); process.exit(1); });
