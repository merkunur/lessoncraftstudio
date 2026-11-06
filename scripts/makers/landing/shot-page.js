#!/usr/bin/env node
/**
 * Screenshot a page of the local dev site at several widths, for reading the render (the maker surfaces' visual check).
 *   node scripts/makers/landing/shot-page.js <path> <outPrefix> [--widths=360,768,1366] [--full] [--port=3100]
 * Prints overflow and missing-image facts per width, so a broken page is visible without opening the shot.
 */
'use strict';
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const puppeteer = require(path.join(REPO, 'node_modules', 'puppeteer'));
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3) : d; };
const [, , route, prefix] = process.argv;
const widths = arg('widths', '360,768,1366').split(',').map(Number);
const port = arg('port', '3100');
const full = process.argv.includes('--full');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message.slice(0, 160)));
  for (const w of widths) {
    await page.setViewport({ width: w, height: w < 500 ? 780 : 900, deviceScaleFactor: 1 });
    const res = await page.goto(`http://localhost:${port}${route}`, { waitUntil: 'networkidle2', timeout: 180000 });
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
      window.scrollTo(0, 0);
    });
    await new Promise((r) => setTimeout(r, 500));
    const facts = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      height: document.body.scrollHeight,
      broken: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.getAttribute('src')).slice(0, 4),
      h1: (document.querySelector('h1') || {}).textContent,
    }));
    console.log(w, res && res.status(), JSON.stringify(facts));
    await page.screenshot({ path: `${prefix}-${w}.png`, fullPage: full });
  }
  if (errors.length) console.log('page errors:', errors.slice(0, 3).join(' | '));
  await browser.close();
})().catch((e) => { console.error(e.message); process.exit(1); });
