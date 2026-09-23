/**
 * b5-maps-harness.js — the G1-379 `maps` render harness shared by its primitive gates
 * (verify-map-symbols, verify-island-map, verify-compass-rose, verify-top-side-view,
 * verify-world-map). Type-scoped; nothing shared is edited.
 *
 *   withBrowser(fn)                    one headless Chromium for a whole gate
 *   openDoc(page, name, bodyHtml, {filter, width})
 *                                      writes out/dev/G1-379-<name>.html with the shell's
 *                                      @font-face rules rewritten to file:// (fonts load only
 *                                      from file://) and navigates to it
 *   sheet(page, name, bodyHtml)        colour + greyscale contact sheets
 *                                      out/dev/G1-379-<name>-{colour,grey}.png
 *   IN-PAGE (after openDoc):
 *   window.__raster(svgEl, S)          rasterises the element's own serialised markup on a
 *                                      transparent canvas at S x -> {w, h, S, alpha:Uint8 0/1,
 *                                      luma:Float32 (Rec.601 over white), rgb:Uint8 (r,g,b)}
 *                                      — a mono printer's view, measured, never derived.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const url = require('url');

const FONTS_DIR = path.join(__dirname, '..', 'assets', 'fonts');
const FONTS_CSS = fs.readFileSync(path.join(FONTS_DIR, 'fonts.css'), 'utf8')
  .replace(/url\('([^']+\.woff2)'\)/g, (m, f) => "url('" + url.pathToFileURL(path.join(FONTS_DIR, f)).href + "')");
const OUT = path.join(__dirname, '..', 'out', 'dev');

const RASTER_JS = `
window.__raster = async function (svgEl, S) {
  S = S || 4;
  const W = +svgEl.getAttribute('width'), H = +svgEl.getAttribute('height');
  let src = new XMLSerializer().serializeToString(svgEl);
  const img = new Image();
  await new Promise((ok, bad) => { img.onload = ok; img.onerror = bad; img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(src); });
  const cv = document.createElement('canvas'); cv.width = Math.round(W * S); cv.height = Math.round(H * S);
  const cx = cv.getContext('2d'); cx.drawImage(img, 0, 0, cv.width, cv.height);
  const d = cx.getImageData(0, 0, cv.width, cv.height).data;
  const n = cv.width * cv.height, alpha = new Array(n), luma = new Array(n), rgb = new Array(n * 3);
  for (let i = 0; i < n; i++) {
    const a = d[i * 4 + 3] / 255;
    alpha[i] = a > 0.5 ? 1 : 0;
    const r = d[i * 4] * a + 255 * (1 - a), g = d[i * 4 + 1] * a + 255 * (1 - a), b = d[i * 4 + 2] * a + 255 * (1 - a);
    luma[i] = 0.299 * r + 0.587 * g + 0.114 * b;
    rgb[i * 3] = Math.round(r); rgb[i * 3 + 1] = Math.round(g); rgb[i * 3 + 2] = Math.round(b);
  }
  return { w: cv.width, h: cv.height, S, alpha, luma, rgb };
};`;

async function withBrowser(fn) {
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({ headless: 'new' });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1500, height: 1000, deviceScaleFactor: 1 });
    return await fn(page);
  } finally { await browser.close(); }
}

async function openDoc(page, name, bodyHtml, opts = {}) {
  fs.mkdirSync(OUT, { recursive: true });
  const f = path.join(OUT, `G1-379-${name}.html`);
  fs.writeFileSync(f, `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${FONTS_CSS}</style><script>${RASTER_JS}</script></head>` +
    `<body style="margin:8px;background:#FBF3E4;font:12px sans-serif;color:#3A3530;${opts.width ? 'width:' + opts.width + 'px;' : ''}${opts.filter || ''}">${bodyHtml}</body></html>`);
  await page.goto(url.pathToFileURL(f).href, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  return f;
}

async function sheet(page, name, bodyHtml, opts = {}) {
  const pngs = [];
  for (const [tag, filter] of [['colour', ''], ['grey', 'filter:grayscale(1);']]) {
    await openDoc(page, `${name}-${tag}`, bodyHtml, { ...opts, filter });
    const p = path.join(OUT, `G1-379-${name}-${tag}.png`);
    await page.screenshot({ path: p, fullPage: true });
    pngs.push(p);
  }
  return pngs;
}

module.exports = { withBrowser, openDoc, sheet, OUT, FONTS_CSS };
