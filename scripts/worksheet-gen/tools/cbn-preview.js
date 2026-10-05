#!/usr/bin/env node
/**
 * tools/cbn-preview.js — draw, LABEL and GATE Color by Number designs; write a contact sheet (line page + coloured
 * key side by side) so every design is LOOKED AT before it ships. Writes data/cbn/labels.json (the labels cache the
 * worksheet builder reads).
 *   node tools/cbn-preview.js [--only=id,id] [--out=<png>] [--no-write]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { DESIGNS, build } = require('../data/cbn/designs.js');
const R = require('../lib/cbn-render.js');

const arg = (k) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : null; };
const only = arg('only') ? new Set(arg('only').split(',')) : null;
const out = arg('out') || path.join(__dirname, '..', 'out', 'cbn-sheet.png');
const LABELS = path.join(__dirname, '..', 'data', 'cbn', 'labels.json');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent('<html><body></body></html>');
  const cache = fs.existsSync(LABELS) ? JSON.parse(fs.readFileSync(LABELS, 'utf8')) : {};
  const cards = []; let bad = 0;
  for (const d of DESIGNS) {
    if (only && !only.has(d.id)) continue;
    const art = build(d);
    const pieces = await R.labelArt(page, art);
    const g = R.labelsAndGate(art, pieces, d.level);
    const solid = await R.checkSolid(page, art);
    for (const sf of solid) { g.fails.push(sf.msg); for (const p of sf.at || []) g.bad.push(p); }
    cache[d.id] = { ok: !g.fails.length, labels: g.labels.map((l) => [+l.x.toFixed(1), +l.y.toFixed(1), +l.r.toFixed(1), l.n]), num: g.num };
    if (g.fails.length) bad++;
    console.log(`${g.fails.length ? 'FAIL' : 'ok  '} ${d.id} L${d.level} ${d.kind}: ${g.colours} colours, ${g.parts} numbered parts${g.fails.length ? '\n   - ' + g.fails.join('\n   - ') : ''}`);
    const legend = Object.entries(g.num).map(([c, n]) => `<span style="display:inline-flex;align-items:center;gap:4px;margin:0 6px;font:700 15px sans-serif">${n}<span style="width:18px;height:18px;border:1.5px solid #333;border-radius:4px;background:${R.PALETTE[c]}"></span>${c}</span>`).join('');
    cards.push(`<div style="display:inline-block;margin:8px;padding:8px;border:2px solid ${g.fails.length ? '#e33' : '#ccc'};border-radius:10px;vertical-align:top"><div style="font:700 15px sans-serif">${d.id} · L${d.level} · ${d.kind}</div>` +
      `${R.toSvg(art, { mode: 'line', labels: g.labels, width: 480 }).replace('</svg>', g.bad.map((b) => `<circle cx="${b.x}" cy="${b.y}" r="16" fill="none" stroke="#e00" stroke-width="4"/>`).join('') + '</svg>')}${R.toSvg(art, { mode: 'colour', width: 480 })}<div>${legend}</div></div>`);
  }
  if (!process.argv.includes('--no-write')) { fs.mkdirSync(path.dirname(LABELS), { recursive: true }); fs.writeFileSync(LABELS, JSON.stringify(cache)); }
  await page.setContent(`<html><head></head><body style="margin:0;background:#fff;width:1020px">${cards.join('')}</body></html>`, { waitUntil: 'load', timeout: 0 });
  await page.evaluate(() => document.fonts.ready);
  await page.setViewport({ width: 1020, height: 800 });
  await page.screenshot({ path: out, fullPage: true });
  await browser.close();
  console.log(`${bad} failing · sheet → ${out}`);
  process.exitCode = bad ? 1 : 0;
})();
