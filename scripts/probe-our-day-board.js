/* Measure WHY the board is taller than the projector, part by part.
   Verify the measurement before the defect. */
const http = require('http'); const fs = require('fs'); const path = require('path');
const puppeteer = require('puppeteer');
const ROOT = path.join(__dirname, '..', 'mini tools');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p.startsWith('/mini-tools/')) p = p.slice('/mini-tools'.length);
  const f = path.join(ROOT, p);
  if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end('nf'); }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
  res.end(fs.readFileSync(f));
});
(async () => {
  await new Promise(r => server.listen(8793, r));
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  for (const [w, h, n] of [[1024, 768, 8], [1366, 768, 12], [1920, 1080, 12]]) {
    const page = await b.newPage();
    await page.setViewport({ width: w, height: h });
    await page.goto('http://localhost:8793/our-day.html?lang=en', { waitUntil: 'networkidle0' });
    await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
    await page.reload({ waitUntil: 'networkidle0' });
    await page.waitForSelector('.od-wrap');
    await page.evaluate((count) => {
      const ids = ['arrival', 'circle', 'math', 'recess', 'lunch', 'art', 'music', 'home', 'reading', 'writing', 'pe', 'library'];
      for (let i = 0; i < count; i++) OurDay.addCard(ids[i % ids.length]);
      OurDay.startDay();
    }, n);
    await new Promise(r => setTimeout(r, 350));
    const m = await page.evaluate(() => {
      const H = s => { const e = document.querySelector(s); return e ? Math.round(e.getBoundingClientRect().height) : null; };
      const W = s => { const e = document.querySelector(s); return e ? Math.round(e.getBoundingClientRect().width) : null; };
      return {
        layout: document.querySelector('.od-wrap').getAttribute('data-layout'),
        vh: window.innerHeight,
        app: H('.lcs-app'), header: H('.lcs-header'), stage: H('.lcs-stage'),
        wrap: H('.od-wrap'), main: H('.od-main'),
        ribbon: H('.od-ribbonhost'), striphost: H('.od-striphost'), strip: H('.od-strip'),
        now: H('.od-now-panel'), nowIcon: H('.od-now-icon'), nowName: H('.od-now-name'), nowNext: H('.od-now-next'),
        bar: H('.od-toolbar'),
        cardH: getComputedStyle(document.querySelector('.od-strip')).getPropertyValue('--od-cardh'),
        firstCard: H('.od-card'), nowIconW: W('.od-now-icon'),
        avail: OurDay._availableStripHeight(),
        ribbonTop: Math.round(document.querySelector('.od-ribbonhost').getBoundingClientRect().top),
        barH: Math.round(document.querySelector('.od-barhost').getBoundingClientRect().height),
        tight: !!OurDay._tight,
        cardHs: Array.from(document.querySelectorAll('.od-card')).map(e=>Math.round(e.getBoundingClientRect().height)).join(','),
        iconH: H('.od-cardbody .od-ic'), sunH: H('.od-sun')
      };
    });
    console.log(w + 'x' + h + ' n=' + n + ':', JSON.stringify(m));
    await page.close();
  }
  await b.close(); server.close();
})();
