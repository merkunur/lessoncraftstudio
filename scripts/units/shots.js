#!/usr/bin/env node
/**
 * Renders a unit page (or any page of the pack kind) at phone, tablet and desktop width and measures it
 * (Daily Teaching System, Part 3): no horizontal overflow, every link and button at least 44 px high where it is a
 * tap target of its own, no text smaller than 14 px. Screenshots go to out/units/shots/ (never committed).
 *
 *   node scripts/units/shots.js <url> [--name=<file stem>] [--widths=360,768,1024]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const REPO = path.join(__dirname, '..', '..');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const url = process.argv[2];
if (!url) { console.error('usage: shots.js <url> [--name=] [--widths=]'); process.exit(1); }
const widths = arg('widths', '360,768,1024').split(',').map(Number);
const name = arg('name', 'page');
const OUT = path.join(REPO, 'out', 'units', 'shots');

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({ headless: 'new' });
  let bad = 0;
  for (const w of widths) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: 900, deviceScaleFactor: 1 });
    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e.message).slice(0, 120)));
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 120000 });
    const m = await page.evaluate(() => {
      const root = document.querySelector('main.un') || document.body;
      const over = [];
      for (const el of root.querySelectorAll('*')) { const r = el.getBoundingClientRect(); if (r.width > 0 && r.right > window.innerWidth + 1) over.push(el.className || el.tagName); }
      const small = [], taps = [];
      for (const el of root.querySelectorAll('p, li, dt, dd, a, button, span, h1, h2, h3, h4')) {
        if (!el.textContent.trim() || !el.getClientRects().length) continue;
        const fsz = parseFloat(getComputedStyle(el).fontSize);
        if (fsz && fsz < 13.9 && getComputedStyle(el).fontSize !== '0px') small.push((el.className || el.tagName) + ' ' + fsz);
      }
      for (const el of root.querySelectorAll('.un-head a, .un-top a, .un-top button, .un-lesson a, .sp-day a, .sp-samples a')) {
        const r = el.getBoundingClientRect();
        if (!r.width || el.getAttribute('aria-hidden') === 'true') continue;
        if (r.height < 43.5) taps.push((el.className || 'a') + ' "' + el.textContent.trim().slice(0, 24) + '" ' + Math.round(r.height));
      }
      const imgs = [...root.querySelectorAll('img')].filter((i) => i.complete && !i.naturalWidth).map((i) => i.src.split('/').slice(-2).join('/'));
      return { scrollW: document.documentElement.scrollWidth, innerW: window.innerWidth, height: document.documentElement.scrollHeight, over: [...new Set(over)].slice(0, 6), small: [...new Set(small)].slice(0, 8), taps: taps.slice(0, 12), nTaps: taps.length, brokenImgs: imgs.slice(0, 5) };
    });
    const file = path.join(OUT, name + '-' + w + '.png');
    await page.screenshot({ path: file, fullPage: true });
    const fail = m.scrollW > m.innerW + 1 || m.over.length || m.small.length || m.nTaps || errors.length;
    if (fail) bad++;
    console.log((fail ? 'FAIL ' : 'ok   ') + w + 'px  page ' + m.height + 'px high' + (m.scrollW > m.innerW + 1 ? '  OVERFLOW ' + m.scrollW : '') + (m.over.length ? '  beyond the edge: ' + m.over.join(', ') : '') + (m.small.length ? '  small text: ' + m.small.join('; ') : '') + (m.nTaps ? '  low tap targets (' + m.nTaps + '): ' + m.taps.join('; ') : '') + (m.brokenImgs.length ? '  images that did not load: ' + m.brokenImgs.join(', ') : '') + (errors.length ? '  script errors: ' + errors.join(' | ') : ''));
    await page.close();
  }
  await browser.close();
  process.exit(bad ? 1 : 0);
})().catch((e) => { console.error(e.stack || e.message); process.exit(1); });
