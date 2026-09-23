/**
 * b5-road-safety-harness.js — the K-369 `road-safety` render harness shared by
 * its three primitive gates (verify-b5-traffic-light.js, verify-b5-road-sign.js,
 * verify-b5-road-pictogram.js). Type-scoped; nothing shared is edited.
 *
 *   withBrowser(fn)                 one headless Chromium for a whole gate
 *   openDoc(page, name, bodyHtml, { filter })
 *                                   writes out/dev/K-369-<name>.html with the
 *                                   shell's @font-face rules rewritten to file://
 *                                   (fonts load only from file://) and navigates
 *   sheet(page, name, bodyHtml)     colour + greyscale contact sheets
 *                                   out/dev/K-369-<name>-{colour,grey}.png
 *   IN-PAGE (page.evaluate): window.__lumaAt(svgEl, pts, r) → mean Rec. 601 luma
 *                                   of a disc of radius r (svg user units) at each
 *                                   point, rasterised from the element's own
 *                                   serialised markup onto a canvas at 4x — the
 *                                   greyscale a mono printer sees, measured, not
 *                                   derived from the token table.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const url = require('url');

const FONTS_DIR = path.join(__dirname, '..', 'assets', 'fonts');
const FONTS_CSS = fs.readFileSync(path.join(FONTS_DIR, 'fonts.css'), 'utf8')
  .replace(/url\('([^']+\.woff2)'\)/g, (m, f) => "url('" + url.pathToFileURL(path.join(FONTS_DIR, f)).href + "')");
const OUT = path.join(__dirname, '..', 'out', 'dev');

const LUMA_JS = `
window.__lumaAt = async function (svgEl, pts, r) {
  const W = +svgEl.getAttribute('width'), H = +svgEl.getAttribute('height');
  const vb = (svgEl.getAttribute('viewBox') || ('0 0 ' + W + ' ' + H)).split(/[ ,]+/).map(Number);
  const S = 4;
  const src = new XMLSerializer().serializeToString(svgEl);
  const img = new Image();
  await new Promise((ok, bad) => { img.onload = ok; img.onerror = bad; img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(src); });
  const cv = document.createElement('canvas'); cv.width = Math.ceil(W * S); cv.height = Math.ceil(H * S);
  const cx = cv.getContext('2d'); cx.fillStyle = '#ffffff'; cx.fillRect(0, 0, cv.width, cv.height); cx.drawImage(img, 0, 0, cv.width, cv.height);
  const data = cx.getImageData(0, 0, cv.width, cv.height).data;
  const k = W / vb[2];
  return pts.map((p) => {
    const px = (p.x - vb[0]) * k * S, py = (p.y - vb[1]) * k * S, rr = r * k * S;
    let sum = 0, n = 0;
    for (let y = Math.floor(py - rr); y <= Math.ceil(py + rr); y++) for (let x = Math.floor(px - rr); x <= Math.ceil(px + rr); x++) {
      if ((x - px) * (x - px) + (y - py) * (y - py) > rr * rr || x < 0 || y < 0 || x >= cv.width || y >= cv.height) continue;
      const i = (y * cv.width + x) * 4;
      sum += 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]; n++;
    }
    return n ? sum / n : NaN;
  });
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
  const f = path.join(OUT, `K-369-${name}.html`);
  fs.writeFileSync(f, `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${FONTS_CSS}</style><script>${LUMA_JS}</script></head>` +
    `<body style="margin:8px;background:#FBF3E4;font:12px sans-serif;${opts.filter || ''}">${bodyHtml}</body></html>`);
  await page.goto(url.pathToFileURL(f).href, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  return f;
}

async function sheet(page, name, bodyHtml) {
  const pngs = [];
  for (const [tag, filter] of [['colour', ''], ['grey', 'filter:grayscale(1);']]) {
    await openDoc(page, `${name}-${tag}`, bodyHtml, { filter });
    const p = path.join(OUT, `K-369-${name}-${tag}.png`);
    await page.screenshot({ path: p, fullPage: true });
    pngs.push(p);
  }
  return pngs;
}

/** A tiny poison harness: ok()/collect()/judge()/control() over one findings list. */
function makeChecker() {
  const st = { assertions: 0, fails: [], log: [], killed: 0, total: 0 };
  st.ok = (c, m) => { st.assertions++; if (!c) st.fails.push(m); return !!c; };
  st.collect = async (fn) => { const before = st.fails.length, a = st.assertions; await fn(); const f = st.fails.splice(before); st.assertions = a; return f; };
  st.judge = (name, findings, re, controlPassed) => {
    st.total++;
    const hit = findings.some((x) => re.test(x));
    const killed = hit && controlPassed !== false;
    if (killed) st.killed++;
    st.log.push(`  ${name}: ${killed ? 'KILLED' : hit ? 'CONTROL FAILED' : findings.length ? 'WRONG REASON ' + JSON.stringify(findings.slice(0, 2)) : 'SILENT'}`);
    return killed;
  };
  st.control = (name, findings) => { const pass = !findings.length; st.log.push(`  ${name}: ${pass ? 'PASSES (control)' : 'FAILS ' + JSON.stringify(findings.slice(0, 3))}`); return pass; };
  return st;
}

module.exports = { withBrowser, openDoc, sheet, makeChecker, OUT, FONTS_CSS };
