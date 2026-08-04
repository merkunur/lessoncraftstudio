#!/usr/bin/env node
/* =====================================================================
   shoot-estimation-jar.js — the renders a human reads.

   Gate 7 of the v4 list is "I read the 360 / 768 / 1024 renders
   myself", and the reason it is a numbered gate rather than a courtesy
   is that three separate defect classes have shipped past fully green
   suites — a mirrored side profile, a letterboxed board that drifted
   every handle off its mark, and a custom property that inherited
   downwards only. None of them was visible to any assertion; all three
   were visible in a picture.

   Writes to docs/audit-results/estimation-jar/renders/.

   Usage:
     node scripts/shoot-estimation-jar.js
     node scripts/shoot-estimation-jar.js --count=200 --cap=large
     node scripts/shoot-estimation-jar.js --set=snowflakes --wide
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const IMG = path.join(REPO, 'image-library-webp');
const OUT = path.join(REPO, 'docs', 'audit-results', 'estimation-jar', 'renders');
fs.mkdirSync(OUT, { recursive: true });

const MIME = {
  '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.html': 'text/html', '.webp': 'image/webp'
};

const arg = (k, d) => {
  const hit = process.argv.find(a => a.startsWith('--' + k + '='));
  return hit ? hit.slice(k.length + 3) : d;
};
const WIDE = process.argv.includes('--wide');

function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    let f;
    if (p.startsWith('/mini-tools/')) f = path.join(MINI, p.slice('/mini-tools/'.length));
    else if (p.startsWith('/image-library-webp/')) f = path.join(IMG, p.slice('/image-library-webp/'.length));
    else f = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(f, (e, b) => {
      if (e) { res.statusCode = 404; return res.end(); }
      res.setHeader('Content-Type', MIME[path.extname(f)] || 'application/octet-stream');
      res.end(b);
    });
  });
}

/* The phone/desktop trio is the standing DoD set; --wide adds the board
   sizes, because a projector is where this tool actually lives. */
const SHOTS = WIDE
  ? [[360, 780], [768, 1000], [1024, 900], [1366, 900], [1920, 1080], [2560, 1440]]
  : [[360, 780], [768, 1000], [1024, 900]];

(async () => {
  const srv = serve();
  await new Promise(r => srv.listen(0, '127.0.0.1', r));
  const port = srv.address().port;
  const base = `http://127.0.0.1:${port}/estimation-jar.html`;

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const written = [];

  try {
    for (const [w, h] of SHOTS) {
      const page = await browser.newPage();
      await page.setViewport({ width: w, height: h, deviceScaleFactor: 2 });
      await page.goto(base + '?lang=' + arg('lang', 'en'), { waitUntil: 'networkidle2' });
      await page.waitForSelector('.ej-card', { timeout: 15000 });

      /* Drive the MODEL rather than the chrome: the point of these
         renders is the states a teacher actually reaches, and a
         premium capacity is one of them. */
      const set = arg('set', null), cap = arg('cap', null), count = arg('count', null);
      await page.evaluate((set, cap, count) => {
        const T = window.EstimationJar;
        if (!T) return;
        if (cap) { T.premium = true; T.capacityId = cap; }
        if (set) T.setId = set;
        if (count) T.count = parseInt(count, 10);
        T.render();
      }, set, cap, count);

      /* the sprite decode + the deferred first paint both need a beat */
      await new Promise(r => setTimeout(r, 900));

      const name = `fill-${w}${cap ? '-' + cap : ''}${count ? '-n' + count : ''}${set ? '-' + set : ''}.png`;
      await page.screenshot({ path: path.join(OUT, name) });
      written.push(name);

      /* the guess face, with a real class's worth of dots on the plot —
         an empty plot proves nothing about a plot */
      await page.evaluate(() => {
        const T = window.EstimationJar;
        if (!T) return;
        T.stage = 'guess';
        const q = T.questionId();
        const cap = T.ceiling();
        /* a plausible distribution: clustered low, a couple of outliers */
        const vals = [4, 8, 9, 11, 12, 12, 12, 13, 14, 15, 15, 16, 18, 20, 22, 24, 25, 28]
          .map(v => Math.min(cap, Math.round(v * cap / 30)));
        T.guesses = vals.map(v => ({ v, q }));
        T._qid = q;
        T.pending = Math.round(cap * 0.62);
        T.render();
      });
      await new Promise(r => setTimeout(r, 700));
      const name2 = `guess-${w}${cap ? '-' + cap : ''}${count ? '-n' + count : ''}.png`;
      await page.screenshot({ path: path.join(OUT, name2) });
      written.push(name2);

      /* the reveal, driven to a mid-count beat AND to the end — the
         middle is where the drain, the tally and the frames have to
         agree with each other, and it is the frame nobody looks at */
      await page.evaluate(() => {
        const T = window.EstimationJar;
        if (!T) return;
        T.stage = 'reveal';
        T._revealShown = Math.min(T.count, Math.max(10, Math.floor(T.count * 0.55)));
        T.render();
        T._paintTally(T._revealShown);
      });
      await new Promise(r => setTimeout(r, 700));
      const name3 = `reveal-mid-${w}${cap ? '-' + cap : ''}${count ? '-n' + count : ''}.png`;
      await page.screenshot({ path: path.join(OUT, name3) });
      written.push(name3);

      await page.close();
    }
  } finally {
    await browser.close();
    srv.close();
  }

  console.log('wrote ' + written.length + ' renders to');
  console.log('  ' + OUT);
  written.forEach(n => console.log('   - ' + n));
})().catch(e => { console.error(e); process.exit(1); });
