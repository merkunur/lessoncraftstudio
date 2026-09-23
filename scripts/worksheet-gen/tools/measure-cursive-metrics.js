#!/usr/bin/env node
/**
 * measure-cursive-metrics.js [--check]
 *
 * The school-script (Playwrite) twin of tools/measure-font-metrics.js, for the
 * nt5-F `cursive-writing` family (G2-377). Measures the vertical INK metrics of
 * every vendored cursive unit in the SAME Chromium that renders the sheets and
 * writes primitives/cursive-metrics.json — a SEPARATE file on purpose:
 * primitives/font-metrics.json (Nunito / Baloo) is read by live writing frames
 * and stays byte-identical, and the cursive faces live only in
 * assets/fonts/cursive-fonts.css (never fonts.css, which the shell inlines into
 * every page).
 *
 * Per unit, per-em ratios read from canvas TextMetrics at 1000 px (design
 * docs/worksheet-gen/b6-designs/G2-377-cursive-writing.md §2):
 *   xHeight       ink ascent of "x"                       (the x-band a ruling is sized by)
 *   xDescender    ink descent of "x"                      (how far a baseline stroke dips; the calibration page)
 *   ascender      max ink ascent  over b d h k l f
 *   descender     max ink descent over g j p q y z f
 *   cap / capDescender   max ink ascent / descent over A-Z
 *   accCap        max ink ascent over Å Ä Ö Ü É È Ê À Á     (an accented capital row)
 *   wordGap       the minimum ink-free gap (em) a space leaves between two words (see below)
 *   lineAscent / lineDescent   the font's own line box (fontBoundingBox*): the
 *                 text component sets line-height = (lineAscent+lineDescent)·fs so
 *                 the CSS baseline sits exactly lineAscent·fs below the span top
 *
 * Refuses to write when a face did not load (document.fonts.check false) or a
 * metric is not a font metric: a fallback italic measured as if it were the
 * school script is worse than no file. `--check` re-measures and compares
 * against the committed JSON (exit 1 on drift > 0.002, or on a unit missing).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const url = require('url');
const puppeteer = require('puppeteer');

const WG = path.resolve(__dirname, '..');
const OUT = path.join(WG, 'primitives', 'cursive-metrics.json');
const CSS_FILE = path.join(WG, 'assets', 'fonts', 'cursive-fonts.css');
const CHECK = process.argv.includes('--check');

/** the units = the @font-face families of cursive-fonts.css ('LCS Cursive <unit>') */
function unitsOfCss(css) {
  return [...css.matchAll(/font-family:'LCS Cursive ([a-z-]+)'/g)].map((m) => m[1]);
}

(async () => {
  const rawCss = fs.readFileSync(CSS_FILE, 'utf8');
  const units = unitsOfCss(rawCss);
  if (units.length < 10) throw new Error(`cursive-fonts.css declares ${units.length} units (expected the 15 vendored Playwrite units)`);
  const css = rawCss.replace(/url\('([^']+)'\)/g, (m, f) => `url('${url.pathToFileURL(path.join(WG, 'assets', 'fonts', f)).href}')`);
  const htmlPath = path.join(WG, 'out', 'dev', '_cursive-metrics.html');
  fs.mkdirSync(path.dirname(htmlPath), { recursive: true });
  fs.writeFileSync(htmlPath, `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body><canvas id="c" width="10" height="10"></canvas></body></html>`, 'utf8');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const result = {};
  try {
    await page.goto(url.pathToFileURL(htmlPath).href, { waitUntil: 'networkidle0' });
    for (const unit of units) {
      const m = await page.evaluate(async (unit) => {
        const spec = `1000px 'LCS Cursive ${unit}'`;
        await document.fonts.load(spec, 'xbdgAÅ');
        await document.fonts.ready;
        if (!document.fonts.check(spec, 'xbdgAÅ')) return { error: 'font not loaded: ' + spec };
        const ctx = document.getElementById('c').getContext('2d');
        ctx.font = spec;
        const A = (s) => ctx.measureText(s).actualBoundingBoxAscent / 1000;
        const D = (s) => ctx.measureText(s).actualBoundingBoxDescent / 1000;
        const max = (s, f) => Math.max(...[...s].map(f));
        const caps = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const line = ctx.measureText('x');
        // the fallback guard: the school script's "x" must not be as wide as the browser default's
        const w = ctx.measureText('xbdg').width;
        ctx.font = '1000px serif';
        const wFallback = ctx.measureText('xbdg').width;
        ctx.font = spec;   // back to the school script BEFORE the ink reads below
        return {
          xHeight: A('x'), xDescender: D('x'), ascender: max('bdhklf', A), descender: max('gjpqyzf', D),
          cap: max(caps, A), capDescender: max(caps, D), accCap: max('ÅÄÖÜÉÈÊÀÁ', A),
          lineAscent: line.fontBoundingBoxAscent / 1000, lineDescent: line.fontBoundingBoxDescent / 1000,
          _w: w, _wFallback: wFallback,
          // the natural gap a SPACE leaves between two words (em): Blink lays each word out alone (its word cache
          // splits at the space), so a word end "ax" and a word start "ya" are rastered apart at 200 px and, ROW BY
          // ROW, gap = advance("ax ") + leftmostInk_ya(row) − rightmostInk_ax(row); the minimum over the rows where
          // both have ink is how close the two words come (a descender loop under the next word does not count
          // unless it reaches the same height). wordGap = min over a-z × a-z; wordGapCap = against a capital
          // start. The text component adds word-spacing up to 0.35 em where wordGap is smaller (G2-377 fix round
          // 1: it-trad "dorme sul" and de-va sentences nearly touched).
          ...(() => {
            const PX = 200, H = 700, BASE = 470;
            const cv = document.createElement('canvas'); cv.width = 900; cv.height = H;
            const k = cv.getContext('2d', { willReadFrequently: true });
            const fam = spec.replace('1000px', PX + 'px');
            const prof = (text, side) => {   // per row: extreme ink x relative to the text origin (null = no ink)
              k.fillStyle = '#fff'; k.fillRect(0, 0, cv.width, H);
              k.font = fam; k.fillStyle = '#000'; k.fillText(text, 300, BASE);
              const d = k.getImageData(0, 0, cv.width, H).data; const out = new Array(H).fill(null);
              for (let y = 0; y < H; y++) {
                if (side === 'right') { for (let x = cv.width - 1; x >= 0; x--) if (d[(y * cv.width + x) * 4] < 128) { out[y] = x - 300; break; } }
                else { for (let x = 0; x < cv.width; x++) if (d[(y * cv.width + x) * 4] < 128) { out[y] = x - 300; break; } }
              }
              return out;
            };
            const L = 'abcdefghijklmnopqrstuvwxyz', U = L.toUpperCase();
            k.font = fam;
            const ends = {}, adv = {};
            for (const x of L) { ends[x] = prof('a' + x, 'right'); k.font = fam; adv[x] = k.measureText('a' + x + ' ').width; }
            const starts = {};
            for (const y of L + U) starts[y] = prof(y + 'a', 'left');
            const gap = (x, y) => { let g = Infinity; const e = ends[x], st = starts[y]; for (let r = 0; r < H; r++) if (e[r] != null && st[r] != null) g = Math.min(g, adv[x] + st[r] - e[r]); return g; };
            let lo = Infinity, cap = Infinity;
            for (const x of L) { for (const y of L) lo = Math.min(lo, gap(x, y)); for (const y of U) cap = Math.min(cap, gap(x, y)); }
            k.font = spec;
            return { wordGap: lo / PX, wordGapCap: cap / PX };
          })(),
        };
      }, unit);
      if (m.error) throw new Error(m.error);
      if (Math.abs(m._w - m._wFallback) < 5) throw new Error(`${unit}: "xbdg" is as wide as the serif fallback (${m._w} vs ${m._wFallback}) — the face did not load`);
      delete m._w; delete m._wFallback;
      for (const [k, v] of Object.entries(m)) {
        const floor = (k === 'xDescender' || k === 'capDescender') ? 0 : (k === 'wordGap' || k === 'wordGapCap' ? -2 : 0.0001);
        if (!Number.isFinite(v) || v < floor || v > 2.2) throw new Error(`cursive-${unit}.${k} = ${v} is not a font metric`);
        m[k] = +v.toFixed(4);
      }
      if (!(m.xHeight < m.ascender && m.xHeight < m.cap && m.ascender < m.lineAscent + 0.2)) throw new Error(`cursive-${unit}: x ${m.xHeight} / asc ${m.ascender} / cap ${m.cap} are not ordered like a Latin script`);
      result['cursive-' + unit] = m;
      console.log(`cursive-${unit}: x ${m.xHeight} asc ${m.ascender} desc ${m.descender} cap ${m.cap}/${m.capDescender} accCap ${m.accCap} line ${m.lineAscent}/${m.lineDescent} wordGap ${m.wordGap}`);
    }
  } finally {
    await browser.close();
  }
  // the fallback tell bought on the first run of this tool: every unit measured the SAME ink
  // (the default serif's) — fifteen school scripts cannot share asc / desc / cap to four places
  const shapes = new Set(Object.values(result).map((m) => [m.ascender, m.descender, m.cap, m.capDescender].join('|')));
  if (shapes.size < 5) throw new Error(`only ${shapes.size} distinct ink shapes across ${Object.keys(result).length} units — the ink was read from a fallback font`);
  if (CHECK) {
    const cur = JSON.parse(fs.readFileSync(OUT, 'utf8'));
    let drift = 0;
    for (const k of Object.keys(result)) {
      if (!cur[k]) { console.error(`MISSING ${k} in the committed file`); drift++; continue; }
      for (const m of Object.keys(result[k])) {
        const d = Math.abs(cur[k][m] - result[k][m]);
        if (!(d <= 0.002)) { console.error(`DRIFT ${k}.${m}: committed ${cur[k][m]} measured ${result[k][m]}`); drift++; }
      }
    }
    console.log(drift ? `cursive-metrics: ${drift} drift(s)` : `cursive-metrics: ${Object.keys(result).length} units match the committed file`);
    process.exit(drift ? 1 : 0);
  }
  fs.writeFileSync(OUT, JSON.stringify({ _measuredBy: 'tools/measure-cursive-metrics.js (Chromium canvas TextMetrics over assets/fonts/cursive-fonts.css, per-em ratios)', ...result }, null, 2) + '\n');
  console.log('wrote ' + OUT);
})().catch((e) => { console.error(e.message); process.exit(1); });
