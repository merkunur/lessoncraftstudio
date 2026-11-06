#!/usr/bin/env node
/**
 * Landing previews, stage B (after build-previews.js and compile-copy.js):
 *
 *   --app   app.webp   a real screenshot of the maker in this language, opened on its showcase template (1280 × 800)
 *   --og    og.jpg     the page's search and share image, 1200 × 630: real sheets on the cutting mat + the keyword phrase.
 *                      Rendered by the browser so every language sets in the site's own fonts. Carries an XMP packet
 *                      (CLAUDE.md §17.8.19; scripts/publish-cli/og-image-xmp.js).
 *
 *   --ribbon ribbon.webp  three sheets as a small fan on transparency, for the band on worksheet, deck and topic pages
 *
 *   node scripts/makers/landing/build-compositions.js --app|--og|--ribbon [--makers=a,b] [--locales=de,fi] [--workers=3] [--force]
 *
 * Output: out/maker-previews/<maker>/<loc>/{app.webp,og.jpg}. One browser per worker: a second tab in one browser is a
 * background tab and Chrome stalls its timers.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const REPO = path.join(__dirname, '..', '..', '..');
const puppeteer = require(path.join(REPO, 'node_modules', 'puppeteer'));
const sharp = require(path.join(REPO, 'node_modules', 'sharp'));
const { handler } = require('../serve.js');
const { buildXmpPacket } = require('../../publish-cli/og-image-xmp.js');

const OUT = path.join(REPO, 'out', 'maker-previews');
const FONTS = path.join(REPO, 'scripts', 'worksheet-gen', 'assets', 'fonts');
const catalog = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'lib', 'makers', 'landing-catalog.json'), 'utf8')).makers;
const arg = (k) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3).split(',') : null; };
const has = (k) => process.argv.includes(`--${k}`);
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

const b64 = (f) => fs.readFileSync(f).toString('base64');
const fontFace = (family, weight, file) => `@font-face{font-family:'${family}';font-weight:${weight};src:url(data:font/woff2;base64,${b64(path.join(FONTS, file))}) format('woff2');}`;
const FONT_CSS = ['latin', 'latin-ext'].flatMap((s) => [fontFace('Baloo 2', 700, `baloo2-700-${s}.woff2`), fontFace('Nunito', 700, `nunito-700-${s}.woff2`)]).join('');
const LOGO = `data:image/webp;base64,${b64(path.join(REPO, 'frontend', 'public', 'logo-lcs.webp'))}`;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
function ogHtml(title, sheets, tagline) {
  const img = (f) => `data:image/webp;base64,${b64(f)}`;
  const size = title.length > 46 ? 58 : title.length > 30 ? 66 : 76;
  return `<!doctype html><html><head><meta charset="utf-8"><style>${FONT_CSS}
  *{box-sizing:border-box}html,body{margin:0;width:1200px;height:630px;overflow:hidden}
  body{background-color:#0f5a4f;background-image:linear-gradient(rgba(255,255,255,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.12) 1px,transparent 1px),linear-gradient(rgba(255,255,255,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.055) 1px,transparent 1px);background-size:120px 120px,120px 120px,24px 24px,24px 24px;position:relative;font-family:'Nunito',sans-serif}
  .copy{position:absolute;left:56px;top:50px;width:560px;bottom:66px;display:flex;flex-direction:column;justify-content:center}
  h1{font-family:'Baloo 2',sans-serif;font-weight:700;font-size:${size}px;line-height:1.08;color:#fffaf0;margin:0;letter-spacing:-.01em}
  p{color:#dcece6;font-size:29px;line-height:1.25;margin:20px 0 0;font-weight:700}
  .brand{position:absolute;left:56px;bottom:40px;display:flex;align-items:center;gap:12px;color:#fffaf0;font-family:'Baloo 2',sans-serif;font-weight:700;font-size:27px}
  .brand img{width:40px;height:40px;object-fit:contain;background:#fff;border-radius:9px;padding:3px}
  .sheet{position:absolute;width:352px;height:auto;background:#fff;border-radius:3px;box-shadow:0 2px 3px rgba(0,0,0,.3),0 20px 38px rgba(4,34,29,.5)}
  .s1{left:690px;top:66px;transform:rotate(-9deg)}.s2{left:800px;top:82px;transform:rotate(8deg)}.s0{left:742px;top:56px;transform:rotate(-1.5deg);width:376px}
  .rule{position:absolute;left:0;right:0;bottom:0;height:18px;background-color:#ffd266;background-image:repeating-linear-gradient(90deg,rgba(20,51,45,.75) 0 2px,transparent 2px 120px),repeating-linear-gradient(90deg,rgba(20,51,45,.5) 0 1px,transparent 1px 24px);background-size:100% 12px,100% 6px;background-repeat:no-repeat}
  </style></head><body>
  ${sheets[1] ? `<img class="sheet s1" src="${img(sheets[1])}">` : ''}${sheets[2] ? `<img class="sheet s2" src="${img(sheets[2])}">` : ''}${sheets[0] ? `<img class="sheet s0" src="${img(sheets[0])}">` : ''}
  <div class="copy"><h1>${esc(title)}</h1><p>${esc(tagline)}</p></div>
  <div class="brand"><img src="${LOGO}" alt="">LessonCraftStudio</div><div class="rule"></div></body></html>`;
}

async function appShot(page, base, job) {
  const file = path.join(OUT, job.maker, job.loc, 'app.webp');
  if (fs.existsSync(file) && !has('force')) return false;
  const t = (catalog[job.maker].showcase[job.loc] || [])[0];
  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });
  await page.goto(`${base}/makers/app/?maker=${job.maker}&lang=${job.loc}${t ? `&t=${t}` : ''}`, { waitUntil: 'networkidle0', timeout: 120000 });
  await page.waitForFunction(() => window.__lcsMaker && window.__lcsMaker.sample, { timeout: 90000 });
  await new Promise((r) => setTimeout(r, 900));
  await sharp(await page.screenshot({ type: 'png' })).webp({ quality: 74 }).toFile(file);
  return true;
}

async function ogShot(page, job, copy, ui) {
  const file = path.join(OUT, job.maker, job.loc, 'og.jpg');
  if (fs.existsSync(file) && !has('force')) return false;
  const c = copy[job.loc][job.maker];
  const sheets = (catalog[job.maker].showcase[job.loc] || []).map((id) => path.join(OUT, job.maker, job.loc, `${id}.webp`));
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await page.setContent(ogHtml(c.kw, sheets, ui[job.loc].ogTagline), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const png = await page.screenshot({ type: 'png' });
  const xmp = buildXmpPacket({ title: c.kw, description: c.metaDescription, subjects: [job.maker, 'worksheet maker', 'worksheet'], locale: job.loc });
  await sharp(png).jpeg({ quality: 84, mozjpeg: true }).withXmp(xmp).toFile(file);
  return true;
}

/** ribbon.webp: the three showcase sheets as a small fan on transparency, for the band on every worksheet, deck and topic page */
async function ribbonShot(page, job) {
  const file = path.join(OUT, job.maker, job.loc, 'ribbon.webp');
  if (fs.existsSync(file) && !has('force')) return false;
  const ids = (catalog[job.maker].showcase[job.loc] || []).slice(0, 3);
  const img = (id) => `data:image/webp;base64,${b64(path.join(OUT, job.maker, job.loc, `${id}.webp`))}`;
  const sheet = (id, cls) => (id ? `<img class="${cls}" src="${img(id)}">` : '');
  await page.setViewport({ width: 264, height: 152, deviceScaleFactor: 1 });
  await page.setContent(`<!doctype html><html><head><style>html,body{margin:0;width:264px;height:152px;background:transparent;overflow:hidden}
    img{position:absolute;width:92px;height:auto;background:#fff;border-radius:2px;box-shadow:0 2px 6px rgba(4,34,29,.45)}
    .a{left:40px;top:14px;transform:rotate(-10deg)}.b{left:132px;top:16px;transform:rotate(9deg)}.c{left:86px;top:6px;width:96px;transform:rotate(-1deg)}</style></head>
    <body>${sheet(ids[1], 'a')}${sheet(ids[2], 'b')}${sheet(ids[0], 'c')}</body></html>`, { waitUntil: 'load' });
  await sharp(await page.screenshot({ type: 'png', omitBackground: true })).webp({ quality: 78, alphaQuality: 90 }).toFile(file);
  return true;
}

(async () => {
  const doApp = has('app'), doOg = has('og'), doRibbon = has('ribbon');
  if (!doApp && !doOg && !doRibbon) throw new Error('say --app, --og or --ribbon');
  const onlyMakers = arg('makers'), onlyLocales = arg('locales');
  const jobs = [];
  for (const [maker, m] of Object.entries(catalog)) {
    if (onlyMakers && !onlyMakers.includes(maker)) continue;
    for (const loc of onlyLocales || m.locales || LOCALES) {
      if (m.locales && !m.locales.includes(loc)) continue;
      fs.mkdirSync(path.join(OUT, maker, loc), { recursive: true });
      jobs.push({ maker, loc });
    }
  }
  const copy = {}, ui = {};
  if (doOg) for (const l of LOCALES) {
    const f = path.join(REPO, 'frontend', 'content', 'maker-landings', `copy.${l}.json`);
    if (!fs.existsSync(f)) continue;
    copy[l] = JSON.parse(fs.readFileSync(f, 'utf8'));
    ui[l] = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'content', 'maker-landings', `ui.${l}.json`), 'utf8'));
  }
  const srv = http.createServer(handler);
  await new Promise((r) => srv.listen(0, r));
  const base = `http://localhost:${srv.address().port}`;
  await fetch(`${base}/__dev/access?as=sub`);
  let next = 0, made = 0, failed = 0;
  const t0 = Date.now();
  const worker = async () => {
    const browser = await puppeteer.launch({ protocolTimeout: 900000 });
    const page = await browser.newPage();
    for (;;) {
      const job = jobs[next++];
      if (!job) break;
      if (doOg && !copy[job.loc]) continue;
      try {
        if (doApp && await appShot(page, base, job)) made++;
        if (doOg && await ogShot(page, job, copy, ui)) made++;
        if (doRibbon && await ribbonShot(page, job)) made++;
      } catch (e) { failed++; console.log(`FAIL ${job.maker} ${job.loc}: ${String(e.message).slice(0, 140)}`); }
      if (next % 40 === 0) console.log(`${next}/${jobs.length} · ${made} made · ${((Date.now() - t0) / 60000).toFixed(1)} min`);
    }
    await browser.close();
  };
  await Promise.all(Array.from({ length: Number((arg('workers') || ['3'])[0]) }, worker));
  srv.close();
  console.log(`compositions: ${made} made, ${failed} failed · ${((Date.now() - t0) / 60000).toFixed(1)} min`);
  process.exit(failed ? 1 : 0);
})().catch((e) => { console.error('build-compositions: ' + e.message); process.exit(1); });
