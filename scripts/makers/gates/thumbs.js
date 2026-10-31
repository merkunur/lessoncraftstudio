#!/usr/bin/env node
/**
 * Gate: gallery thumbnails (ARCHITECTURE §11.3, OPEN-DECISIONS #10a).
 *
 *   files   every built maker's current version has a thumbnail for every template in every language it is offered in
 *           (scripts/makers/build-thumbs.js), 320 × 430 WebP, not blank (≥ 2 % ink)
 *   screen  the gallery shows them: every card's picture is the built thumbnail of ITS template in the page's language,
 *           loaded (no live miniature built where a thumbnail exists)
 *   fallback a missing thumbnail (poison: one renamed away) → that card builds its live miniature; the others stay pictures
 *
 *   node scripts/makers/gates/thumbs.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const REPO = path.join(__dirname, '..', '..', '..');
const sharp = require(path.join(REPO, 'node_modules', 'sharp'));
const puppeteer = require(path.join(REPO, 'node_modules', 'puppeteer'));
const { handler } = require('../serve.js');
const OUT = path.join(REPO, 'out', 'makers');

(async () => {
  let fails = 0;
  const check = (name, ok, extra) => { if (!ok) fails++; console.log((ok ? 'ok   ' : 'FAIL ') + name + (ok || extra === undefined ? '' : ' — ' + JSON.stringify(extra).slice(0, 300))); };
  const versions = JSON.parse(fs.readFileSync(path.join(OUT, 'versions.json'), 'utf8'));
  // files
  let n = 0;
  const bad = [];
  for (const [maker, v] of Object.entries(versions)) {
    const tj = JSON.parse(fs.readFileSync(path.join(OUT, maker, v.current, 'templates.json'), 'utf8'));
    for (const t of tj.templates) for (const loc of t.locales) {
      n++;
      const f = path.join(OUT, maker, v.current, 'thumbs', loc, `${t.id}.webp`);
      if (!fs.existsSync(f)) { bad.push(`${maker} ${loc} ${t.id}: missing`); continue; }
      const { data, info } = await sharp(f).removeAlpha().raw().toBuffer({ resolveWithObject: true });
      let ink = 0;
      for (let k = 0; k < data.length; k += 3) if (data[k] < 200 || data[k + 1] < 200 || data[k + 2] < 200) ink++;
      if (info.width !== 320 || info.height !== 430) bad.push(`${maker} ${loc} ${t.id}: ${info.width}×${info.height}`);
      else if (ink / (info.width * info.height) < 0.02) bad.push(`${maker} ${loc} ${t.id}: blank (${(100 * ink / (info.width * info.height)).toFixed(1)} % ink)`);
    }
  }
  bad.slice(0, 10).forEach((b) => console.log('FAIL ' + b));
  check(`every offered template × language has its thumbnail, 320 × 430, not blank (${n})`, !bad.length && n > 300, { bad: bad.length, n });

  // screen + fallback
  const srv = http.createServer(handler); await new Promise((r) => srv.listen(0, r));
  const base = `http://localhost:${srv.address().port}`;
  await fetch(`${base}/__dev/access?as=sub`);
  const browser = await puppeteer.launch();
  const p = await browser.newPage();
  const errs = [];
  p.on('pageerror', (e) => errs.push(e.message));
  await p.setViewport({ width: 1366, height: 4000 });   // tall: every card in view, so lazy pictures load
  const cards = () => p.evaluate(() => [...document.querySelectorAll('.mk-card')].map((c) => {
    const img = c.querySelector('.mk-thumb img');
    return { id: c.dataset.id, src: img ? decodeURIComponent(img.getAttribute('src')) : null, w: img ? img.naturalWidth : 0, live: !!c.querySelector('.mk-thumb iframe') };
  }));
  const ver = versions['sight-words'].current;
  await p.goto(`${base}/makers/app/?maker=sight-words&lang=fi`, { waitUntil: 'networkidle0' }); await new Promise((r) => setTimeout(r, 1500));
  let c = await cards();
  check(`sight-words fi: every card shows its own Finnish thumbnail, loaded, no live miniature (${c.length})`, c.length > 10 && c.every((x) => x.src === `/makers/sight-words/${ver}/thumbs/fi/${x.id}.webp` && x.w === 320 && !x.live), c.filter((x) => x.w !== 320 || x.live));
  // poison: one thumbnail missing → that card falls back to a live miniature
  const victim = path.join(OUT, 'sight-words', ver, 'thumbs', 'fi', `${c[2].id}.webp`);
  fs.renameSync(victim, victim + '.away');
  try {
    await p.goto(`${base}/makers/app/?maker=sight-words&lang=fi`, { waitUntil: 'networkidle0' }); await new Promise((r) => setTimeout(r, 2000));
    c = await cards();
    check('a missing thumbnail: that card builds its live miniature, the others stay pictures', c[2].live && !c[2].src && c.filter((x) => x.live).length === 1, c.map((x) => [x.id, x.live, x.w]));
  } finally { fs.renameSync(victim + '.away', victim); }
  if (errs.length) { fails++; console.log('FAIL page errors: ' + errs.slice(0, 3).join(' | ')); }
  await browser.close(); srv.close();
  console.log(fails ? `thumbs gate: ${fails} failing` : 'thumbs gate: all pass');
  if (fails) process.exitCode = 1;
})().catch((e) => { console.error('thumbs gate: error — ' + e.message); process.exit(1); });
