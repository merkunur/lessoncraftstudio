#!/usr/bin/env node
/**
 * measure-cursive-advances.js [--check]
 *
 * The horizontal twin of tools/measure-cursive-metrics.js, for the Cursive maker (2026-11-02): the ADVANCE width
 * (em) of every character a cursive page of a locale may print (lib/cursive-coverage.js), in the school-script unit(s)
 * that locale writes, measured in the same Chromium that renders the sheets (canvas measureText at 1000 px) →
 * primitives/cursive-advances.json { _measuredBy, <unit>: { <char>: em } }. A template fits a typed word or sentence
 * to its row by the sum of these advances (G2-480; joined shaping moves a word by a few per cent — the template keeps
 * a margin, and the page's own verify still measures the rendered node against its row).
 *
 * Refuses to write when a face did not load (document.fonts.check false). --check re-measures and compares (exit 1 on
 * a drift > 0.002 em or a missing unit / character).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const url = require('url');
const puppeteer = require('puppeteer');
const { bank } = require('../lib/b6-common.js');
const { coverageOf } = require('../lib/cursive-coverage.js');
const { SENTENCES } = require('../data/b2/sentences.js');

const WG = path.resolve(__dirname, '..');
const OUT = path.join(WG, 'primitives', 'cursive-advances.json');
const CSS_FILE = path.join(WG, 'assets', 'fonts', 'cursive-fonts.css');
const LS_FILE = path.join(WG, 'data', 'b6', 'cursive-writing-levelset.json');
const CHECK = process.argv.includes('--check');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

(async () => {
  const ls = fs.existsSync(LS_FILE) ? JSON.parse(fs.readFileSync(LS_FILE, 'utf8')) : {};
  const want = {};   // unit → Set of characters
  for (const loc of LOCALES) {
    let b;
    try { b = bank('cursive-writing', loc); } catch (e) { continue; }   // sv / fi: refused by data
    if (!b || b.refused) continue;
    const cov = coverageOf(b, ls[loc] || null, (SENTENCES[loc] || {}).names);
    for (const u of b.units || []) { want[u] = want[u] || new Set(); for (const ch of cov) want[u].add(ch); }
  }
  const units = Object.keys(want).sort();
  if (units.length < 9) throw new Error(`only ${units.length} cursive units in the banks`);
  const css = fs.readFileSync(CSS_FILE, 'utf8').replace(/url\('([^']+)'\)/g, (m, f) => `url('${url.pathToFileURL(path.join(WG, 'assets', 'fonts', f)).href}')`);
  const htmlPath = path.join(WG, 'out', 'dev', '_cursive-advances.html');
  fs.mkdirSync(path.dirname(htmlPath), { recursive: true });
  fs.writeFileSync(htmlPath, `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body><canvas id="c" width="10" height="10"></canvas></body></html>`, 'utf8');
  const browser = await puppeteer.launch({ headless: 'new' });
  const result = { _measuredBy: 'tools/measure-cursive-advances.js — Chromium canvas measureText at 1000 px over assets/fonts/cursive-fonts.css (em)' };
  try {
    const page = await browser.newPage();
    await page.goto(url.pathToFileURL(htmlPath).href, { waitUntil: 'networkidle0' });
    for (const u of units) {
      const chars = [...want[u]].sort();
      const r = await page.evaluate(async (u, chars) => {
        const fam = `LCS Cursive ${u}`;
        await document.fonts.load(`1000px "${fam}"`, chars.join(''));
        if (!document.fonts.check(`1000px "${fam}"`, chars.join(''))) return { err: `${fam} did not load` };
        const cx = document.getElementById('c').getContext('2d');
        cx.font = `1000px "${fam}"`;
        const out = {};
        for (const ch of chars) out[ch] = Math.round(cx.measureText(ch).width) / 1000;
        return { out };
      }, u, chars);
      if (r.err) throw new Error(r.err);
      result[u] = r.out;
    }
  } finally { await browser.close(); fs.rmSync(htmlPath, { force: true }); }
  if (CHECK) {
    const old = JSON.parse(fs.readFileSync(OUT, 'utf8'));
    const bad = [];
    for (const u of units) for (const [ch, v] of Object.entries(result[u])) if (!old[u] || old[u][ch] == null || Math.abs(old[u][ch] - v) > 0.002) bad.push(`${u} "${ch}"`);
    if (bad.length) { console.error('cursive-advances.json drifts or misses: ' + bad.slice(0, 20).join(', ')); process.exit(1); }
    console.log(`cursive-advances: current (${units.length} units)`);
    return;
  }
  fs.writeFileSync(OUT, JSON.stringify(result, null, 1) + '\n');
  console.log(`cursive-advances: ${units.length} units → ${path.relative(process.cwd(), OUT)} (${units.map((u) => u + ' ' + Object.keys(result[u]).length).join(', ')})`);
})().catch((e) => { console.error(e.stack || e); process.exit(1); });
