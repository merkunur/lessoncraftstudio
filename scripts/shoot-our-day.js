/* Quick render smoke for the our-day rebuild: serve `mini tools/`,
   drive the real flow with real pointer events, shoot the renders. */
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = 'C:/Users/rkgen/lessoncraftstudio/mini tools';
const OUT = 'C:/Users/rkgen/lessoncraftstudio/docs/audit-results/our-day/qa';
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png' };

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p.startsWith('/mini-tools/')) p = p.slice('/mini-tools'.length);
  const f = path.join(ROOT, p);
  if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end('nf'); }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
  res.end(fs.readFileSync(f));
});

(async () => {
  await new Promise(r => server.listen(8791, r));
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const errs = [];
  const shoot = async (page, name) => {
    fs.mkdirSync(OUT, { recursive: true });
    await page.screenshot({ path: path.join(OUT, name + '.png'), fullPage: false });
  };

  const open = async (w, h, lang) => {
    const page = await browser.newPage();
    page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    page.on('pageerror', e => errs.push('PAGEERROR: ' + e.message));
    await page.setViewport({ width: w, height: h });
    await page.goto('http://localhost:8791/our-day.html?lang=' + (lang || 'en') + '&embed=1', { waitUntil: 'networkidle0' });
    await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
    await page.reload({ waitUntil: 'networkidle0' });
    await page.waitForSelector('.od-wrap', { timeout: 8000 });
    return page;
  };

  // ---- 704: the production width ----
  let page = await open(704, 900);
  const tapTile = async (n) => {
    await page.evaluate((i) => {
      const t = document.querySelectorAll('.od-tile');
      if (t[i]) t[i].click();
    }, n);
    await new Promise(r => setTimeout(r, 120));
  };
  await page.click('.od-addslot');
  await new Promise(r => setTimeout(r, 200));
  await shoot(page, 'R-palette-704');
  for (const i of [0, 1, 2, 3, 4, 5]) await tapTile(i);
  await page.evaluate(() => document.querySelector('.od-close').click());
  await new Promise(r => setTimeout(r, 200));
  await shoot(page, 'R-build-704');

  const layout = await page.evaluate(() => {
    const w = document.querySelector('.od-wrap');
    const app = document.querySelector('.lcs-app');
    return {
      layout: w.getAttribute('data-layout'),
      wrapW: Math.round(w.getBoundingClientRect().width),
      appW: Math.round(app.getBoundingClientRect().width),
      cards: document.querySelectorAll('.od-card').length,
      appH: Math.round(app.getBoundingClientRect().height)
    };
  });
  console.log('704 build:', JSON.stringify(layout));

  await page.click('.od-start');
  await new Promise(r => setTimeout(r, 300));
  await shoot(page, 'R-run-704');

  // two-stage advance
  const st1 = await page.evaluate(() => { document.querySelector('.od-sun').click(); return null; });
  await new Promise(r => setTimeout(r, 200));
  const warned = await page.evaluate(() => ({ soon: !!document.querySelector('.od-card.od-soon'), warned: OurDay.day.warned, sun: OurDay.day.sunIdx }));
  console.log('after tap 1 (warning):', JSON.stringify(warned));
  await page.evaluate(() => document.querySelector('.od-sun').click());
  await new Promise(r => setTimeout(r, 250));
  const moved = await page.evaluate(() => ({ warned: OurDay.day.warned, sun: OurDay.day.sunIdx, done: document.querySelectorAll('.od-card.od-done').length }));
  console.log('after tap 2 (crossing):', JSON.stringify(moved));
  await shoot(page, 'R-advanced-704');

  // tap floors + text floors
  const floors = await page.evaluate(() => {
    const bad = [];
    document.querySelectorAll('button, a, input').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      if (r.width < 44 || r.height < 44) bad.push(el.className + ' ' + Math.round(r.width) + 'x' + Math.round(r.height));
    });
    const tiny = [];
    document.querySelectorAll('*').forEach(el => {
      if (!el.childNodes.length) return;
      let txt = '';
      el.childNodes.forEach(n => { if (n.nodeType === 3) txt += n.textContent.trim(); });
      if (!txt) return;
      const fs2 = parseFloat(getComputedStyle(el).fontSize);
      if (fs2 < 14) tiny.push(el.className + ' ' + fs2 + 'px "' + txt.slice(0, 18) + '"');
    });
    return { smallControls: bad, tinyText: tiny };
  });
  console.log('controls under 44px:', floors.smallControls.length, floors.smallControls.slice(0, 6).join(' | '));
  console.log('text under 14px:', floors.tinyText.length, floors.tinyText.slice(0, 6).join(' | '));

  // run to the end -> the sunset
  for (let i = 0; i < 20; i++) {
    const more = await page.evaluate(() => { const s = document.querySelector('.od-sun'); if (s) { s.click(); return true; } return false; });
    if (!more) break;
    await new Promise(r => setTimeout(r, 90));
  }
  await new Promise(r => setTimeout(r, 2000));
  const end = await page.evaluate(() => ({
    sunset: !!document.querySelector('.od-sunset'),
    dots: document.querySelectorAll('.od-dot').length,
    backReachable: !!document.querySelector('.od-sunset-art'),
    sun: OurDay.day.sunIdx, n: OurDay.day.items.length
  }));
  console.log('end of day:', JSON.stringify(end));
  await shoot(page, 'R-sunset-704');
  await page.close();

  // ---- 1024x768 standalone: BOARD ----
  const page2 = await browser.newPage();
  page2.on('pageerror', e => errs.push('PAGEERROR: ' + e.message));
  await page2.setViewport({ width: 1024, height: 768 });
  await page2.goto('http://localhost:8791/our-day.html?lang=de', { waitUntil: 'networkidle0' });
  await page2.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page2.reload({ waitUntil: 'networkidle0' });
  await page2.waitForSelector('.od-wrap');
  await page2.evaluate(() => {
    ['arrival', 'circle', 'math', 'recess', 'lunch', 'art', 'music', 'home'].forEach(id => OurDay.addCard(id));
    OurDay.startDay();
  });
  await new Promise(r => setTimeout(r, 400));
  const board = await page2.evaluate(() => {
    const w = document.querySelector('.od-wrap');
    const app = document.querySelector('.lcs-app');
    const r = app.getBoundingClientRect();
    return {
      layout: w.getAttribute('data-layout'),
      appW: Math.round(r.width), appH: Math.round(r.height),
      viewportH: window.innerHeight,
      pctOfViewport: Math.round(r.height / window.innerHeight * 100),
      nowPanel: !!document.querySelector('.od-now-panel'),
      nowNameSize: document.querySelector('.od-now-name') ? getComputedStyle(document.querySelector('.od-now-name')).fontSize : null
    };
  });
  console.log('1024x768 BOARD:', JSON.stringify(board));
  await page2.screenshot({ path: path.join(OUT, 'R-board-1024.png') });
  await page2.close();

  console.log('console errors:', errs.length, errs.slice(0, 5).join(' | '));
  await browser.close();
  server.close();
})();
