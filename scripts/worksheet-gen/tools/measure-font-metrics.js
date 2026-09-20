#!/usr/bin/env node
/**
 * measure-font-metrics.js [--check]
 *
 * Measures the vertical ink metrics of the sheet fonts in the SAME Chromium
 * that renders the worksheets and writes primitives/font-metrics.json. The
 * numbers are per-em ratios (font-size 1) of the rendered ink, read from
 * canvas TextMetrics on a page that loads assets/fonts/fonts.css exactly as
 * page/shell.js does — never derived from a nominal "x-height ≈ 0.48".
 *
 * Why this exists (2026-09-21): rulingBlock sized its sentence starters at a
 * guessed 0.78·glyphH, and every starter on every writing frame shipped with
 * its caps on the dashed midline (the x-height guide). A layout that puts
 * text ON a ruled frame needs the font's real x-height, cap and ascender.
 *
 *   xHeight    ink ascent of "x"          (actualBoundingBoxAscent)
 *   cap        ink ascent of "H"
 *   ascender   ink ascent of "b"
 *   descender  ink descent of "p"         (actualBoundingBoxDescent)
 *   lineAscent / lineDescent  the font's own line box (fontBoundingBox*) —
 *              what a CSS line box places the baseline by.
 *
 * Refuses to write when the font did not load (document.fonts.check false or
 * a metric that is 0 / NaN / outside sane bounds): a fallback font measured
 * as if it were Nunito is worse than no file. `--check` re-measures and
 * compares against the committed JSON (exit 1 on drift > 0.002).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const WG = path.resolve(__dirname, '..');
const OUT = path.join(WG, 'primitives', 'font-metrics.json');
const FONTS_CSS = fs.readFileSync(path.join(WG, 'assets', 'fonts', 'fonts.css'), 'utf8');
const FONTS = [
  { key: 'nunito-700', family: 'Nunito', weight: 700 },
  { key: 'nunito-800', family: 'Nunito', weight: 800 },
  { key: 'baloo2-700', family: 'Baloo 2', weight: 700 },
];
const CHECK = process.argv.includes('--check');

(async () => {
  const htmlPath = path.join(WG, 'out', 'dev', '_font-metrics.html');
  fs.mkdirSync(path.dirname(htmlPath), { recursive: true });
  // the css uses relative woff2 urls → resolve them against the fonts dir
  const css = FONTS_CSS.replace(/url\('([^']+)'\)/g, (m, f) => `url('${require('url').pathToFileURL(path.join(WG, 'assets', 'fonts', f)).href}')`);
  fs.writeFileSync(htmlPath, `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body><canvas id="c" width="400" height="400"></canvas></body></html>`, 'utf8');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const result = {};
  try {
    await page.goto(require('url').pathToFileURL(htmlPath).href, { waitUntil: 'networkidle0' });
    for (const f of FONTS) {
      const m = await page.evaluate(async ({ family, weight }) => {
        const spec = `${weight} 1000px "${family}"`;
        await document.fonts.load(spec, 'xHbp');
        await document.fonts.ready;
        if (!document.fonts.check(spec, 'xHbp')) return { error: 'font not loaded: ' + spec };
        const ctx = document.getElementById('c').getContext('2d');
        ctx.font = spec;
        const asc = (s) => ctx.measureText(s).actualBoundingBoxAscent / 1000;
        const desc = (s) => ctx.measureText(s).actualBoundingBoxDescent / 1000;
        const line = ctx.measureText('x');
        return {
          xHeight: asc('x'), cap: asc('H'), ascender: asc('b'), descender: desc('p'),
          lineAscent: line.fontBoundingBoxAscent / 1000, lineDescent: line.fontBoundingBoxDescent / 1000,
        };
      }, f);
      if (m.error) throw new Error(m.error);
      for (const [k, v] of Object.entries(m)) {
        if (!Number.isFinite(v) || v <= 0 || v > 1.6) throw new Error(`${f.key}.${k} = ${v} is not a font metric`);
        m[k] = +v.toFixed(4);
      }
      if (!(m.xHeight < m.cap && m.cap <= m.ascender + 0.05)) throw new Error(`${f.key}: x ${m.xHeight} / cap ${m.cap} / asc ${m.ascender} are not ordered like a Latin font`);
      result[f.key] = m;
      console.log(`${f.key}: x-height ${m.xHeight} cap ${m.cap} ascender ${m.ascender} descender ${m.descender} line ${m.lineAscent}/${m.lineDescent}`);
    }
  } finally {
    await browser.close();
  }
  if (CHECK) {
    const cur = JSON.parse(fs.readFileSync(OUT, 'utf8'));
    let drift = 0;
    for (const k of Object.keys(result)) for (const m of Object.keys(result[k])) {
      const d = Math.abs((cur[k] || {})[m] - result[k][m]);
      if (!(d <= 0.002)) { console.error(`DRIFT ${k}.${m}: committed ${(cur[k] || {})[m]} measured ${result[k][m]}`); drift++; }
    }
    console.log(drift ? `font-metrics: ${drift} drift(s)` : 'font-metrics: matches the committed file');
    process.exit(drift ? 1 : 0);
  }
  fs.writeFileSync(OUT, JSON.stringify({ _measuredBy: 'tools/measure-font-metrics.js (Chromium canvas TextMetrics, per-em ratios)', ...result }, null, 2) + '\n');
  console.log('wrote ' + OUT);
})().catch((e) => { console.error(e.message); process.exit(1); });
