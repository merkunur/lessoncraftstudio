#!/usr/bin/env node
/**
 * Some template titles and instructions carry tokens the page fills at build time ("How to Draw {L} Step by Step",
 * "Each mystery number is from 1 to {MAX}"). The landing pages show a template's real sample, so they show that sample's
 * real words: this reads the title and instruction off the rendered sample page of every such template, per language.
 *
 *   node scripts/makers/landing/fill-tokens.js [--locales=en,de]
 *
 * Output: frontend/content/maker-landings/template-fills.<loc>.json   { <maker>: { <template>: [title, instruction] } }
 * build-catalog.js merges these over the raw strings; scripts/makers/gates/landings.js fails on any token left on a page.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const REPO = path.join(__dirname, '..', '..', '..');
const puppeteer = require(path.join(REPO, 'node_modules', 'puppeteer'));
const { handler } = require('../serve.js');
const DIR = path.join(REPO, 'frontend', 'content', 'maker-landings');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const arg = process.argv.find((a) => a.startsWith('--locales='));
const locales = arg ? arg.slice(10).split(',') : LOCALES;

(async () => {
  const srv = http.createServer(handler);
  await new Promise((r) => srv.listen(0, r));
  const base = `http://localhost:${srv.address().port}`;
  await fetch(`${base}/__dev/access?as=sub`);
  const browser = await puppeteer.launch({ protocolTimeout: 900000 });
  const page = await browser.newPage();
  let filled = 0, left = 0;
  for (const loc of locales) {
    const raw = JSON.parse(fs.readFileSync(path.join(DIR, `templates.${loc}.json`), 'utf8'));
    const out = {};
    for (const [maker, entries] of Object.entries(raw)) {
      const ids = Object.keys(entries).filter((id) => /\{/.test(entries[id].join(' ')));
      if (!ids.length) continue;
      await page.goto(`${base}/makers/app/?maker=${maker}&lang=${loc}`, { waitUntil: 'networkidle0', timeout: 120000 });
      await page.waitForFunction(() => window.__lcsMaker && window.__lcsMaker.sample, { timeout: 90000 });
      for (const id of ids) {
        const got = await page.evaluate(async (x) => {
          const html = await window.__lcsMaker.sample(x);
          if (!html) return null;
          const d = new DOMParser().parseFromString(html, 'text/html');
          const t = d.querySelector('[data-lcs-title]'), i = d.querySelector('[data-lcs-instruction]');
          return [t ? t.textContent.trim() : '', i ? i.textContent.trim() : ''];
        }, id);
        if (!got || !got[0]) { left++; console.log(`no sample title: ${loc} ${maker} ${id}`); continue; }
        (out[maker] = out[maker] || {})[id] = got;
        filled++;
      }
    }
    fs.writeFileSync(path.join(DIR, `template-fills.${loc}.json`), JSON.stringify(out, null, 1));
    console.log(`${loc}: ${Object.values(out).reduce((n, e) => n + Object.keys(e).length, 0)} filled`);
  }
  await browser.close();
  srv.close();
  console.log(`token fills: ${filled} filled, ${left} left`);
  process.exit(left ? 1 : 0);
})().catch((e) => { console.error('fill-tokens: ' + e.message); process.exit(1); });
