/* Capture the SHIPPED tool in every state that matters, at the three
   viewports a teacher actually uses, so expert panels critique the
   artefact rather than a description of it.
   Run: node scripts/_dbm-capture-states.js                            */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..', 'mini tools');
const OUT = path.join(__dirname, '..', 'docs', 'audit-results', 'doubling-mirror', 'states');
const MIME = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.json': 'application/json' };

function serve() {
  return new Promise(res => {
    const s = http.createServer((rq, rs) => {
      let p = decodeURIComponent(rq.url.split('?')[0]);
      if (p.startsWith('/mini-tools/')) p = p.slice('/mini-tools/'.length);
      const f = path.join(ROOT, p.replace(/^\//, ''));
      if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { rs.writeHead(404); rs.end(); return; }
      rs.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
      rs.end(fs.readFileSync(f));
    });
    s.listen(0, '127.0.0.1', () => res(s));
  });
}

(async () => {
  const srv = await serve();
  const base = 'http://127.0.0.1:' + srv.address().port;
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  fs.mkdirSync(OUT, { recursive: true });

  const shot = async (p, name) => { await p.screenshot({ path: path.join(OUT, name + '.png') }); };
  const st = (p, js) => p.evaluate(new Function('const T = window.DoublingMirror;' + js));
  const wait = ms => new Promise(r => setTimeout(r, ms));

  for (const w of [360, 704, 1024]) {
    const p = await b.newPage();
    await p.setViewport({ width: w, height: 1200 });
    await p.goto(base + '/doubling-mirror.html?lang=en', { waitUntil: 'networkidle0' });
    await p.waitForSelector('.dbm-tray', { timeout: 8000 });
    await wait(400);
    await shot(p, w + '-01-rest');

    /* the chip strip armed, mid-commit */
    await st(p, 'T.st = T.newState("twenty","on"); T._paint();');
    await wait(250); await shot(p, w + '-02-asking');

    /* SHUT, mid-beat: far half empty, total withheld */
    await p.evaluate(() => { const c = document.querySelector('.dbm-chips .dbm-btn'); if (c) c.click(); });
    await wait(150);
    await p.evaluate(() => document.querySelector('.dbm-b-close').click());
    await wait(620); await shot(p, w + '-03-beat');

    /* the deal finished */
    await wait(2200); await shot(p, w + '-04-shut-total');

    /* opened onto an ODD total: leaves equal, one on the spine pad */
    await st(p, 'var s=T.newState("twenty","off");' +
      'for(var i=0;i<2;i++){s=T.place(s,1);} var c=T.close(s); var d=T.place(c,1);' +
      'T.st=T.open(d); T._paint();');
    await wait(350); await shot(p, w + '-05-odd-open');

    /* after GIVE */
    await p.evaluate(() => { const g = document.querySelector('.dbm-b-give'); if (g) g.click(); });
    await wait(800); await shot(p, w + '-06-after-give');

    /* the paywall as a signed-out visitor meets it */
    await st(p, 'T.premium=false; T._paint(); T._gate();');
    await wait(350); await shot(p, w + '-07-gate');
    await p.close();
  }

  /* the paid print sheet */
  const p = await b.newPage();
  await p.setViewport({ width: 1024, height: 1400 });
  await p.goto(base + '/doubling-mirror.html?lang=en', { waitUntil: 'networkidle0' });
  await p.waitForSelector('.dbm-tray', { timeout: 8000 });
  await st(p, 'T.premium=true; T._paint(); T._buildSheet(); document.body.classList.add("dbm-printing");');
  await wait(500);
  await p.screenshot({ path: path.join(OUT, 'print-sheet.png'), fullPage: true });
  await p.close();

  await b.close(); srv.close();
  console.log('captured -> ' + OUT);
  console.log(fs.readdirSync(OUT).join('  '));
})();
