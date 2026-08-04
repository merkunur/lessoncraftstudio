#!/usr/bin/env node
/* shoot-place-value-lab.js — renders for the eye, not for a gate.
   §A.13.62: I read the 360 / 768 / 1024 frames MYSELF before calling
   anything done. Reading the 768 render is what found the ten-ness
   defect that three panels then confirmed; no assertion here. */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const OUT = path.join(REPO, 'docs', 'audit-results', 'place-value-lab', 'qa');
fs.mkdirSync(OUT, { recursive: true });
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };

const POSES = {
  /* the demo pose, now three places since hundreds are free */
  demo: { h: 1, t: 2, o: 4, lang: 'en' },
  /* the German inversion — the moat, in one frame */
  inversion: { h: 2, t: 4, o: 7, lang: 'de' },
  /* the bundle invitation: a full frame of ten and four more */
  offer: { h: 0, t: 3, o: 14, lang: 'en' },
  /* ⭐ ten rods flush = one flat. The claim, on screen. */
  bank: { h: 1, t: 10, o: 0, lang: 'en' },
  /* the worst state the engine allows */
  full: { h: 9, t: 9, o: 9, lang: 'en' },
  /* the zero placeholder */
  zero: { h: 3, t: 0, o: 4, lang: 'de' },
  /* the taxonomy, where it earns its keep */
  teen: { h: 0, t: 1, o: 4, lang: 'en' },      /* four|teen — the 4 said FIRST */
  vigesimal: { h: 0, t: 9, o: 6, lang: 'fr' }, /* quatre-vingt|seize = 80 + 16 */
  soixante: { h: 0, t: 7, o: 1, lang: 'fr' },  /* soixante et onze = 60 + 11 */
};

function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const file = p.indexOf('/mini-tools/') === 0
      ? path.join(MINI, p.slice('/mini-tools/'.length))
      : path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (err, buf) => {
      if (err) { res.statusCode = 404; res.end(); return; }
      res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream');
      res.end(buf);
    });
  });
}

(async () => {
  const server = serve();
  await new Promise((r) => server.listen(0, r));
  const PORT = server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();

  const only = (process.argv.find((a) => a.indexOf('--pose=') === 0) || '').split('=')[1];
  const widths = [
    { w: 360, h: 780 }, { w: 768, h: 900 }, { w: 1024, h: 768 }, { w: 1366, h: 900 },
  ];

  for (const [name, pose] of Object.entries(POSES)) {
    if (only && name !== only) continue;
    for (const v of widths) {
      await page.setViewport({ width: v.w, height: v.h });
      await page.goto(`http://127.0.0.1:${PORT}/mini-tools/place-value-lab.html?lang=${pose.lang}`, { waitUntil: 'networkidle0' });
      await page.evaluate((p) => {
        const T = window.PlaceValueLab;
        T.api.settings.hundreds = true;
        T.st.maxPlaces = 3;
        T.st.h = p.h; T.st.t = p.t; T.st.o = p.o;
        T.render();
      }, pose);
      const file = path.join(OUT, `rebuild-${name}-${v.w}.png`);
      await page.screenshot({ path: file });
      console.log('  ' + path.basename(file));
    }
  }

  await browser.close();
  server.close();
})();
