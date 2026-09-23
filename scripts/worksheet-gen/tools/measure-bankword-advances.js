#!/usr/bin/env node
/**
 * measure-bankword-advances.js [--check]   (nt10-E, earth-and-space G2-367 word bank)
 *
 * Measures the advance width of every character an 11-locale word-bank pill may
 * print, in Nunito 800 (the `.ws-bankword` face, page/page.css), in the SAME
 * Chromium that renders the sheets, from the shell's own woff2
 * (assets/fonts/fonts.css, file://) — the measure-team-beads.js pattern.
 * Writes primitives/bankword-nunito800.advances.json as PER-EM ratios:
 *   em[ch]        the advance of one character
 *   kern[ab]      measureText("ab") − em[a] − em[b], kept only where |k| ≥ 0.0005
 * so textWidth(s, px) = px · (Σ em[ch] + Σ kern[pair]) reproduces the shaped
 * width a pill prints (checked here against measureText of the real phase names).
 *
 * Why this exists (2026-09-23): qa/verify-b5-earth-and-space.js rule 5 ESTIMATED a
 * pill as 0.58·18 px per character and condemned the fr bank ("nouvelle lune /
 * premier quartier / pleine lune / dernier quartier", ~717 px) while the real
 * G2-367 render put the four pills on one row (measured 643.5 px of a 647 px row).
 *
 * Refuses to write when the font did not load or a width is 0 / NaN. A character
 * missing from the table makes the gate FAIL (never a guessed width) — add it
 * here and re-run. `--check` re-measures and compares (exit 1 on drift > 0.002 em).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const url = require('url');
const puppeteer = require('puppeteer');

const WG = path.resolve(__dirname, '..');
const OUT = path.join(WG, 'primitives', 'bankword-nunito800.advances.json');
const FONTS_CSS = fs.readFileSync(path.join(WG, 'assets', 'fonts', 'fonts.css'), 'utf8');
const LOWER = 'abcdefghijklmnopqrstuvwxyz' +
  'àáâãäåæçèéêëìíîïñòóôõöøœùúûüýÿß';   // en de es pt fr it nl sv da no fi
const CHARS = [...new Set([...LOWER, ...LOWER.toLocaleUpperCase('en').replace('SS', ''), ' ', '-', "'", '’', '.', '·'])];
const SAMPLES = ['nouvelle lune', 'premier quartier', 'pleine lune', 'dernier quartier', 'new moon', 'first quarter', 'full moon', 'last quarter',
  'Neumond', 'zunehmender Halbmond', 'Vollmond', 'abnehmender Halbmond', 'lua nova', 'quarto crescente', 'lua cheia', 'quarto minguante'];
const CHECK = process.argv.includes('--check');

(async () => {
  const htmlPath = path.join(WG, 'out', 'dev', '_bankword-advances.html');
  fs.mkdirSync(path.dirname(htmlPath), { recursive: true });
  const css = FONTS_CSS.replace(/url\('([^']+)'\)/g, (m, f) => `url('${url.pathToFileURL(path.join(WG, 'assets', 'fonts', f)).href}')`);
  fs.writeFileSync(htmlPath, `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body><canvas id="c" width="10" height="10"></canvas></body></html>`, 'utf8');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  let res;
  try {
    await page.goto(url.pathToFileURL(htmlPath).href, { waitUntil: 'networkidle0' });
    res = await page.evaluate(async (chars, samples) => {
      const spec = '800 1000px "Nunito"';
      await document.fonts.load(spec, chars.join(''));
      await document.fonts.ready;
      if (!document.fonts.check(spec, chars.join(''))) return { error: 'Nunito 800 did not load' };
      const ctx = document.getElementById('c').getContext('2d');
      ctx.font = spec;
      const W = (s) => ctx.measureText(s).width / 1000;
      const em = {}, kern = {};
      for (const c of chars) em[c] = W(c);
      for (const a of chars) for (const b of chars) { const k = W(a + b) - em[a] - em[b]; if (Math.abs(k) >= 0.0005) kern[a + b] = k; }
      const truth = {}; for (const s of samples) truth[s] = W(s);
      return { em, kern, truth };
    }, CHARS, SAMPLES);
  } finally { await browser.close(); }
  if (res.error) { console.error(res.error); process.exit(1); }
  for (const [c, v] of Object.entries(res.em)) {
    if (!Number.isFinite(v) || (c !== ' ' && v <= 0.05) || v > 1.5) { console.error(`advance of "${c}" = ${v} is not a Nunito 800 width`); process.exit(1); }
    res.em[c] = +v.toFixed(4);
  }
  for (const k of Object.keys(res.kern)) res.kern[k] = +res.kern[k].toFixed(4);
  // self-check: the table reproduces the shaped width of real bank words within 0.01 em
  const { textWidthEm } = require('../primitives/bankword-width.js');
  for (const [s, t] of Object.entries(res.truth)) {
    const e = textWidthEm(s, { em: res.em, kern: res.kern });
    if (Math.abs(e - t) > 0.01) { console.error(`table misses "${s}": ${e.toFixed(4)} em vs measured ${t.toFixed(4)} em`); process.exit(1); }
  }
  if (CHECK) {
    const cur = JSON.parse(fs.readFileSync(OUT, 'utf8'));
    let drift = 0;
    for (const c of Object.keys(res.em)) if (!(Math.abs((cur.em[c] || 0) - res.em[c]) <= 0.002)) { console.error(`DRIFT ${c}: committed ${cur.em[c]} measured ${res.em[c]}`); drift++; }
    for (const k of new Set([...Object.keys(res.kern), ...Object.keys(cur.kern || {})])) if (!(Math.abs(((cur.kern || {})[k] || 0) - (res.kern[k] || 0)) <= 0.002)) { console.error(`DRIFT kern ${k}`); drift++; }
    console.log(drift ? `bankword advances: ${drift} drift(s)` : `bankword advances: ${Object.keys(res.em).length} chars + ${Object.keys(res.kern).length} kern pairs match the committed file`);
    process.exit(drift ? 1 : 0);
  }
  fs.writeFileSync(OUT, JSON.stringify({ _measuredBy: 'tools/measure-bankword-advances.js (Chromium canvas measureText, Nunito 800, per-em advance + pair kern)', font: 'nunito-800', em: res.em, kern: res.kern }, null, 1) + '\n');
  console.log('wrote ' + OUT + ` — ${Object.keys(res.em).length} chars, ${Object.keys(res.kern).length} kern pairs; at 18 px: ` + Object.entries(res.truth).slice(0, 4).map(([s, t]) => `${s} ${(t * 18).toFixed(1)}`).join(' · '));
})().catch((e) => { console.error(e.message); process.exit(1); });
