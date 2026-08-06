#!/usr/bin/env node
/* THROWAWAY — sweeps the shipped tool standalone so I can SEE it, and
   measures the things the panels ruled on: picture-vs-word dominance,
   drum size, arc stroke, tile overflow, and whether the wide tiers fire
   on a 1280x800 classroom projector. */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const IMG = path.join(REPO, 'image-library-webp');
const OUT = path.join(REPO, 'docs', 'audit-results', 'syllable-splitter', 'qa');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
fs.mkdirSync(OUT, { recursive: true });

const VIEWS = [
  { w: 360, h: 740, tag: 'phone-360' },
  { w: 704, h: 900, tag: 'embed-704' },
  { w: 1024, h: 768, tag: 'tablet-1024' },
  { w: 1280, h: 800, tag: 'projector-1280x800' },
  { w: 1920, h: 1080, tag: 'board-1920' },
];

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

(async () => {
  const server = serve();
  await new Promise((r) => server.listen(0, r));
  const PORT = server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  for (const v of VIEWS) {
    const page = await browser.newPage();
    await page.setViewport({ width: v.w, height: v.h });
    await page.goto(`http://127.0.0.1:${PORT}/mini-tools/syllable-splitter.html?lang=en`, { waitUntil: 'networkidle0' });
    await page.waitForSelector('.ss-clap', { timeout: 8000 }).catch(() => {});
    await new Promise((r) => setTimeout(r, 500));

    // tap the drum twice so arcs are drawn (that is the apparatus in use)
    await page.evaluate(() => {
      const d = document.querySelector('.ss-drum'); if (d) { d.click(); d.click(); } var e=document.querySelectorAll('.ss-ghostbtn')[0]; if(e) e.click();
    });
    await new Promise((r) => setTimeout(r, 600));

    const m = await page.evaluate(() => {
      const g = (s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height) }; };
      const arc = document.querySelector('.ss-arc');
      const word = document.querySelector('.ss-wordrow');
      const tile = document.querySelector('.ss-tile');
      return {
        pic: g('.ss-pic'), word: g('.ss-wordrow'), drum: g('.ss-drum'),
        wordFont: word ? getComputedStyle(word).fontSize : null,
        arcStroke: arc ? getComputedStyle(arc).strokeWidth : null,
        arcCount: document.querySelectorAll('.ss-arc').length,
        arcBoxH: document.querySelector('.ss-arcs') ? document.querySelector('.ss-arcs').getAttribute('height') : null,
        modeFont: document.querySelector('.ss-mode') ? getComputedStyle(document.querySelector('.ss-mode')).fontSize : null,
      };
    });

    const picH = m.pic ? m.pic.h : 0, wordH = m.word ? m.word.h : 0;
    const ratio = picH ? (wordH / picH) : 0;
    console.log(`\n[${v.tag}  ${v.w}x${v.h}]`);
    console.log(`  word ${m.wordFont.padStart(6)}  pic ${String(picH).padStart(4)}px tall   word/pic = ${(ratio * 100).toFixed(0)}%  ${ratio < 0.4 ? '<-- picture dominates (D10)' : ''}`);
    console.log(`  drum ${m.drum ? m.drum.w + 'x' + m.drum.h : 'n/a'}   mode chip ${m.modeFont}`);
    console.log(`  arcs drawn ${m.arcCount}, stroke ${m.arcStroke}, arc box height ${m.arcBoxH}px`);

    await page.screenshot({ path: path.join(OUT, `AFTER-${v.tag}.png`), fullPage: false });
    await page.close();
  }

  await browser.close();
  server.close();
  console.log('\nshots in docs/audit-results/syllable-splitter/qa/');
})().catch((e) => { console.error(e); process.exit(1); });
