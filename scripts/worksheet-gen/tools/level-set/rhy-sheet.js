/**
 * Contact sheet of chosen pictures, so a panel OPENS every picture it pins (a word is not a picture).
 *   node tools/level-set/rhy-sheet.js <out.png> "<theme>/<noun>" ["<theme>/<noun>" …]
 * Each cell shows the picture at 150 px with its "<theme>/<noun>" caption. Rendered on a FILE page (an about:blank
 * page may not load file:// pictures — earlier contact sheets came out empty).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const url = require('url');
const puppeteer = require('puppeteer');
const { fileUri } = require('../../lib/b2-common.js');

const [out, ...pics] = process.argv.slice(2);
if (!out || !pics.length) throw new Error('usage: rhy-sheet.js <out.png> "<theme>/<noun>" …');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const cells = pics.map((p) => {
  const i = p.lastIndexOf('/');
  let src;
  try { src = fileUri(p.slice(0, i), p.slice(i + 1)); } catch (e) { return `<div class="c"><div class="miss">NOT CACHED</div><div>${esc(p)}</div></div>`; }
  return `<div class="c"><img src="${src}"><div>${esc(p)}</div></div>`;
}).join('');
const html = `<html><head><style>body{margin:10px;background:#f4f4f4;font:600 14px sans-serif}.g{display:flex;flex-wrap:wrap;gap:8px}
.c{width:170px;text-align:center}.c img,.miss{width:150px;height:150px;object-fit:contain;background:#fff;border:1px solid #ccc;display:block;margin:0 auto}
.miss{color:#c00;line-height:150px}</style></head><body><div class="g">${cells}</div></body></html>`;
(async () => {
  const b = await puppeteer.launch();
  const page = await b.newPage();
  await page.setViewport({ width: 1100, height: 600 });
  const tmp = path.join(path.dirname(path.resolve(out)), `_rhy-sheet-${process.pid}.html`);
  fs.writeFileSync(tmp, html);
  await page.goto(url.pathToFileURL(tmp).href, { waitUntil: 'load' });
  const broken = await page.evaluate(() => [...document.images].filter((i) => !i.naturalWidth).length);
  await page.screenshot({ path: out, fullPage: true });
  await b.close();
  fs.unlinkSync(tmp);
  console.log(`${out}: ${pics.length} pictures${broken ? `, ${broken} FAILED TO LOAD` : ''}`);
})();
