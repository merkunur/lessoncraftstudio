#!/usr/bin/env node
/**
 * visual-qa-worksheets-hub.js [--base=http://localhost:3100] [--locale=en] [--out=<dir>]
 *
 * The 2026-10-18 hub redesign's visual sweep: every view (bare hub, subject tab,
 * type, Level Set, theme, Interactive, mobile drawer open) at 360 · 768 · 1024 ·
 * 1366 · 1440, with MEASURED checks and screenshots for a human read:
 *   - no horizontal page overflow (scrollWidth ≤ viewport);
 *   - below 1024 every link/summary in <main> is ≥ 40px tall (tap target);
 *   - the view actually rendered what it claims (non-vacuity: cards / set header / chips).
 * Exit 0 PASS · 1 FAIL.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const puppeteer = require(path.join(__dirname, '..', 'node_modules', 'puppeteer'));

const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const BASE = arg('base', 'http://localhost:3100');
const LOC = arg('locale', 'en');
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'worksheets-hub-2026-10', LOC));
const SET = arg('set', 'g1209');
const SET_TYPE = arg('settype', 'fact-families');
const WIDTHS = [360, 768, 1024, 1366, 1440];
const VIEWS = [
  { key: 'bare', q: '', expect: '.wscat-card' },
  { key: 'subject', q: '?subject=math', expect: '.wscat-card' },
  { key: 'type', q: `?type=${SET_TYPE}`, expect: '.wscat-card' },
  { key: 'set', q: `?set=${SET}&type=${SET_TYPE}`, expect: '#level-core, #level-easy' },
  { key: 'theme', q: '?theme=animals', expect: '.wscat-card' },
  { key: 'interactive', q: '?format=interactive', expect: '.wscat-card' },
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({ headless: 'new' });
  const fails = [];
  try {
    for (const v of VIEWS) {
      for (const w of WIDTHS) {
        const page = await browser.newPage();
        await page.setViewport({ width: w, height: 900, deviceScaleFactor: 1, isMobile: w < 768, hasTouch: w < 1024 });
        const url = `${BASE}/${LOC}/worksheets${v.q}`;
        const res = await page.goto(url, { waitUntil: 'networkidle2', timeout: 180000 });
        if (!res || res.status() !== 200) { fails.push(`${v.key}@${w}: HTTP ${res && res.status()}`); await page.close(); continue; }
        // load lazy images
        await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } window.scrollTo(0, 0); });
        await new Promise((r) => setTimeout(r, 700));
        const m = await page.evaluate((sel, w) => {
          const found = document.querySelectorAll(sel).length;
          const sw = document.documentElement.scrollWidth;
          const small = w < 1024
            ? [...document.querySelectorAll('main a, main summary')].filter((e) => {
                const r = e.getBoundingClientRect();
                if (!r.width || !r.height) return false;
                if (e.closest('nav[aria-label="Breadcrumb"], .lcs-breadcrumb, footer')) return false;
                if (e.closest('details:not([open]) > :not(summary)')) return false;
                // The A–Z index at the foot is a dense list of plain text links: WCAG 2.2 AA (24px)
                // is its standard. Every CONTROL (filters, chips, tabs, card actions, paging) is held to 40px.
                if (e.closest('section[aria-labelledby="worksheet-type-index"]')) return r.height < 24;
                return r.height < 40;
              }).map((e) => `${(e.textContent || '').trim().slice(0, 24)}=${Math.round(e.getBoundingClientRect().height)}`)
            : [];
          return { found, sw, small };
        }, v.expect, w);
        if (m.found === 0) fails.push(`${v.key}@${w}: nothing matched ${v.expect}`);
        if (m.sw > w + 1) fails.push(`${v.key}@${w}: page scrolls sideways (${m.sw}px > ${w}px)`);
        if (m.small.length) fails.push(`${v.key}@${w}: ${m.small.length} tap targets < 40px: ${m.small.slice(0, 5).join(' | ')}`);
        await page.screenshot({ path: path.join(OUT, `${v.key}-${w}.jpg`), type: 'jpeg', quality: 70, fullPage: false });
        if (w === 360 && v.key === 'type') {
          await page.evaluate(() => { const d = document.querySelector('main details.lg\\:hidden'); if (d) { d.open = true; d.scrollIntoView(); } });
          await new Promise((r) => setTimeout(r, 300));
          await page.screenshot({ path: path.join(OUT, `drawer-open-360.jpg`), type: 'jpeg', quality: 70 });
        }
        await page.close();
        process.stdout.write('.');
      }
    }
  } finally {
    await browser.close();
  }
  console.log('\n' + (fails.length ? `FAIL — ${fails.length}\n  ` + fails.join('\n  ') : 'PASS — every view at every width: no sideways scroll, taps ≥ 40px, content rendered'));
  console.log('screenshots: ' + OUT);
  process.exit(fails.length ? 1 : 0);
})().catch((e) => { console.error('ERROR', e.message); process.exit(1); });
