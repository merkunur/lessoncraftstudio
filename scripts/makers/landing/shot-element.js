#!/usr/bin/env node
/**
 * Screenshot one element of a local page at several widths, and report whether anything in it is cut off.
 *   node scripts/makers/landing/shot-element.js <path> <css selector> <outPrefix> [--widths=360,1366,2560] [--port=3100]
 */
'use strict';
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const puppeteer = require(path.join(REPO, 'node_modules', 'puppeteer'));
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3) : d; };
const [, , route, selector, prefix] = process.argv;
const widths = arg('widths', '360,1366,2560').split(',').map(Number);

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  for (const w of widths) {
    await page.setViewport({ width: w, height: 1000, deviceScaleFactor: 1 });
    await page.goto(`http://localhost:${arg('port', '3100')}${route}`, { waitUntil: 'networkidle2', timeout: 120000 });
    const el = await page.$(selector);
    if (!el) { console.log(w, 'no element', selector); continue; }
    await el.evaluate((n) => n.scrollIntoView());
    await page.evaluate(async (sel) => {
      const n = document.querySelector(sel);
      n.querySelectorAll('img').forEach((i) => { i.loading = 'eager'; });
      await Promise.all([...n.querySelectorAll('img')].map((i) => (i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; }))));
    }, selector);
    await new Promise((r) => setTimeout(r, 800));
    const facts = await page.evaluate((sel) => {
      const n = document.querySelector(sel);
      const b = n.getBoundingClientRect();
      const broken = [...n.querySelectorAll('img')].filter((i) => i.complete && i.naturalWidth === 0).length;
      return { w: Math.round(b.width), h: Math.round(b.height), overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, broken };
    }, selector);
    console.log(w, JSON.stringify(facts));
    await el.screenshot({ path: `${prefix}-${w}.png` });
  }
  await browser.close();
})().catch((e) => { console.error(e.message); process.exit(1); });
