#!/usr/bin/env node
/* Screenshot the redesigned /[locale]/activities/ index from a local Next dev
   server, at desktop/tablet/mobile + a filtered state, for the design-critic
   pass + operator approval. Usage: node scripts/shot-activities-index.js [base] */
'use strict';
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const BASE = process.argv[2] || 'http://localhost:3000';
const OUT = path.join(__dirname, '..', 'docs', 'audit-results', 'activities-redesign');

const SHOTS = [
  { name: 'en-desktop', url: '/en/activities', w: 1280, h: 900 },
  { name: 'en-tablet', url: '/en/activities', w: 768, h: 1024 },
  { name: 'en-mobile-375', url: '/en/activities', w: 375, h: 812 },
  { name: 'en-mobile-280', url: '/en/activities', w: 280, h: 720 },
  { name: 'en-filtered-math-K', url: '/en/activities?subject=math&grade=K', w: 1280, h: 900 },
  { name: 'de-desktop', url: '/de/activities', w: 1280, h: 900 },
  { name: 'fi-mobile-375', url: '/fi/activities', w: 375, h: 812 },
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const overflow = [];
  for (const s of SHOTS) {
    const page = await browser.newPage();
    await page.setViewport({ width: s.w, height: s.h, deviceScaleFactor: 2 });
    try {
      await page.goto(BASE + s.url, { waitUntil: 'networkidle2', timeout: 60000 });
      await page.waitForSelector('h1', { timeout: 20000 });
      // settle fonts/layout
      await new Promise((r) => setTimeout(r, 600));
      const over = await page.evaluate(() => {
        const d = document.scrollingElement || document.documentElement;
        return d.scrollWidth - d.clientWidth;
      });
      if (over > 2) overflow.push(`${s.name}: horizontal overflow ${over}px`);
      await page.screenshot({ path: path.join(OUT, s.name + '.png'), fullPage: true });
      console.log(`  shot ${s.name} (overflow ${over}px)`);
    } catch (e) {
      console.log(`  FAIL ${s.name}: ${e.message}`);
      overflow.push(`${s.name}: ${e.message}`);
    } finally {
      await page.close();
    }
  }
  await browser.close();
  console.log(overflow.length ? '\nISSUES:\n' + overflow.map((x) => '  • ' + x).join('\n') : '\nNo overflow issues.');
  console.log('Saved to', OUT);
})();
