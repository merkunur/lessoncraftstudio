#!/usr/bin/env node
/**
 * render-b6-sink-or-float-art.js — the G1-399 art proof sheet (nt5-F build brief, "the art
 * is the product"): every water-tank mode and every clay form at the SMALLEST and LARGEST
 * size the family uses, in colour AND greyscale (CSS grayscale(1) — the mono print proxy),
 * rendered through Chromium from file:// so the page fonts load. Writes
 *   out/dev/G1-399-art-colour.png  out/dev/G1-399-art-grey.png
 * for a human (the builder, the reviewer) to READ. Not a gate — the gates are
 * qa/verify-b6-water-tank.js and qa/verify-b6-clay-form.js.
 *
 *   node scripts/worksheet-gen/qa/render-b6-sink-or-float-art.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const url = require('url');
const puppeteer = require('puppeteer');
const { waterTank } = require('../primitives/water-tank.js');
const { clayForm } = require('../primitives/clay-form.js');

const OUT = path.join(__dirname, '..', 'out', 'dev');
const FONTS = url.pathToFileURL(path.join(__dirname, '..', 'assets', 'fonts', 'fonts.css')).href;

function sheet(grey) {
  const cell = (label, svg) => `<div style="display:inline-block;vertical-align:top;margin:10px;text-align:center;font:600 12px Nunito">${svg}<div>${label}</div></div>`;
  const rows = [
    ['legend 112x56', ['legend-float', 'legend-sink'].map((m) => cell(m, waterTank({ w: 112, h: 56, mode: m }).svg))],
    ['rings (d3 150x75 · d2 170x85 · d1 190x95)', [[150, 75], [170, 85], [190, 95]].map(([w, h]) => cell(`rings ${w}x${h}`, waterTank({ w, h, mode: 'rings' }).svg))],
    ['legend 170x85 + empty 240x150', [cell('legend-float 170x85', waterTank({ w: 170, h: 85, mode: 'legend-float' }).svg), cell('legend-sink 170x85', waterTank({ w: 170, h: 85, mode: 'legend-sink' }).svg), cell('empty 240x150', waterTank({ w: 240, h: 150, mode: 'empty' }).svg)]],
    ['clay 72 / 120', ['lump', 'ball', 'boat'].flatMap((f) => [cell(`${f} 72`, clayForm({ form: f, w: 72 }).svg), cell(`${f} 120`, clayForm({ form: f, w: 120 }).svg)])],
    ['spots 639x520 (F4 tub)', [cell('spots 2', waterTank({ w: 639, h: 520, mode: 'spots', spots: 2 }).svg)]],
  ];
  return `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="${FONTS}"></head>` +
    `<body style="margin:0;background:#FFFFFF;width:1300px;${grey ? 'filter:grayscale(1)' : ''}">` +
    rows.map(([h, cells]) => `<div style="padding:4px 10px"><div style="font:800 14px Nunito;color:#146B5E">${h}</div>${cells.join('')}</div>`).join('') +
    '</body></html>';
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const b = await puppeteer.launch({ headless: 'new' });
  try {
    const p = await b.newPage();
    for (const grey of [false, true]) {
      const f = path.join(OUT, `G1-399-art-${grey ? 'grey' : 'colour'}.html`);
      fs.writeFileSync(f, sheet(grey));
      await p.setViewport({ width: 1300, height: 900, deviceScaleFactor: 2 });
      await p.goto(url.pathToFileURL(f).href, { waitUntil: 'networkidle0' });
      await p.evaluate(() => document.fonts.ready);
      const png = f.replace(/\.html$/, '.png');
      await p.screenshot({ path: png, fullPage: true });
      console.log('PNG:', png);
    }
  } finally { await b.close(); }
})();
