#!/usr/bin/env node
/**
 * tools/cbn-audit-render.js — ONE large picture per Color by Number design (coloured key beside the numbered line
 * page), so every design is looked at on its own at a size where a floating part, a wrong layer or a wrong scale is
 * visible (operator 2026-10-05: the first review read 5-6 designs per sheet at 480 px and missed them).
 *   node tools/cbn-audit-render.js [--only=id,id] [--from=N --to=M] [--out=<dir>]
 * Labels come from data/cbn/labels.json (run tools/cbn-preview.js first after a change).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { DESIGNS, build } = require('../data/cbn/designs.js');
const R = require('../lib/cbn-render.js');

const arg = (k) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : null; };
const only = arg('only') ? new Set(arg('only').split(',')) : null;
const from = +(arg('from') || 0), to = +(arg('to') || DESIGNS.length);
const out = arg('out') || path.join(process.env.TEMP || '/tmp', 'spl', 'cbn-audit');
const LABELS = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'cbn', 'labels.json'), 'utf8'));

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1560, height: 800 });
  let n = 0;
  for (let i = from; i < Math.min(to, DESIGNS.length); i++) {
    const d = DESIGNS[i];
    if (only && !only.has(d.id)) continue;
    const art = build(d);
    const c = LABELS[d.id] || { labels: [], num: {} };
    const labels = c.labels.map(([x, y, r, num]) => ({ x, y, r, n: num }));
    const legend = Object.entries(c.num || {}).map(([col, num]) => `<span style="display:inline-flex;align-items:center;gap:5px;margin:0 8px">${num}<span style="width:20px;height:20px;border:1.5px solid #333;border-radius:4px;background:${R.PALETTE[col]}"></span>${col}</span>`).join('');
    const html = `<html><head></head>` +
      `<body style="margin:0;background:#fff"><div id="c" style="display:inline-block;padding:10px">` +
      `<div style="font:700 18px sans-serif;margin-bottom:6px">${i + 1}/${DESIGNS.length} · ${d.id} · ${d.kind} · L${d.level} · "${d.names.en}" &nbsp; ${c.ok ? '' : '<span style="color:#e00">GATE FAIL</span>'}</div>` +
      `<div style="display:flex;gap:16px">${R.toSvg(art, { mode: 'colour', width: 760 })}${R.toSvg(art, { mode: 'line', labels, width: 760 })}</div>` +
      `<div style="font:700 16px sans-serif;margin-top:6px">${legend}</div></div></body></html>`;
    await page.setContent(html, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    const el = await page.$('#c');
    await el.screenshot({ path: path.join(out, String(i + 1).padStart(3, '0') + '-' + d.id + '.png') });
    n++;
  }
  await browser.close();
  console.log(`${n} designs → ${out}`);
})();
