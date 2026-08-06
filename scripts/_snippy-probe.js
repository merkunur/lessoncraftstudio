#!/usr/bin/env node
/* =====================================================================
   _snippy-probe.js — the multi-state control-bottom probe for "Snippy the
   Sound-Spark Snail" (L.K.1.a). The uncapped visual-qa sweep covers first paint;
   this drives the guided-start / mid-stroke / certify (unlabeled starts, path
   hidden) / demoted-replay / bloom-done / word-anchor states and per the #10
   lesson MEASURES the lowest control INCLUDING the shell `.lcs-activity-check`
   <= vh-4 across 320·360·412·768·1024·1366. Bakes in the text-containment check
   (word chip / Snippy line / done text) + no horizontal overflow (the trace SVG
   is viewBox-bounded) + the start-dot visual size (>=14px, not tiny). The trace
   is drag-based (no HTML buttons of its own); the start-dots + trace surface are
   SVG sub-nodes with a generous START_TOL hit radius. (Unique name — grepped.)
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'snippy.letter-formation.l-k-1-a';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.png': 'image/png' };
const VIEWPORTS = [[320, 640], [360, 740], [412, 820], [768, 1000], [1024, 900], [1366, 900]];
const MARGIN = 4, MIN_DOT = 14;

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]), file;
    if (p === '/' || p.endsWith('.html')) file = path.join(MINI, path.basename(p) || 'x');
    else if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
    else file = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (err, buf) => { if (err) { res.statusCode = 404; res.end('nf'); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(buf); });
  });
}

(async () => {
  const puppeteer = require('puppeteer');
  const server = serve();
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const PORT = server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const fails = [];
  const url = `http://127.0.0.1:${PORT}/snippy-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.SnippyActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'snippy.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.SnippyActivity.round && document.querySelector('.sn-root'), { timeout: 4000 });
    await sleep(40);
  }
  const glyph = (l) => page.evaluate((x) => window.SnippyCore.glyphOf(x).map(s => s.map(p => ({ x: p.x, y: p.y }))), l);
  const trace = (sp, p) => page.evaluate((a, b) => window.SnippyActivity._traceStroke(a, b), sp, p).then(() => sleep(10));
  async function formCorrect(l) { const g = await glyph(l); for (const st of g) await trace(st[0], st); }

  const states = {
    'guided-start': async () => { await force('letter-c'); },
    'mid-stroke': async () => { await force('letter-t'); const g = await glyph('t'); await trace(g[0][0], g[0]); },
    'certify': async () => { await force('letter-t'); await formCorrect('t'); },
    'demoted': async () => { await force('letter-t'); await formCorrect('t'); const g = await glyph('t'); await trace(g[1][0], g[1]); },
    'bloom-done': async () => { await force('letter-c'); await formCorrect('c'); await formCorrect('c'); },
    'word-anchor': async () => { await force('letter-a'); }
  };

  async function controlBottom() {
    return await page.evaluate(() => {
      const sel = '.sn-paper,.sn-done,.lcs-activity-check';
      let max = 0; document.querySelectorAll(sel).forEach(e => { const r = e.getBoundingClientRect(); if (r.height) max = Math.max(max, r.bottom); });
      return Math.round(max);
    });
  }
  async function checks() {
    return await page.evaluate(() => {
      let bleed = 0;
      document.querySelectorAll('.sn-saytext,.sn-word,.sn-donetext,.sn-level').forEach(el => { if (el.scrollWidth > el.clientWidth + 1) bleed++; });
      let minDot = 999; document.querySelectorAll('.sn-svg circle').forEach(c => { const r = c.getBoundingClientRect(); if (r.width) minDot = Math.min(minDot, r.width); });
      const d = document.scrollingElement || document.documentElement;
      return { bleed, minDot: minDot === 999 ? null : Math.round(minDot), overflow: Math.round(d.scrollWidth - d.clientWidth) };
    });
  }

  await page.setViewport({ width: 412, height: 820 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForFunction(() => { const t = window.SnippyActivity; return t && t._activityRow && document.querySelector('.sn-root'); }, { timeout: 15000 });

  const order = ['guided-start', 'mid-stroke', 'certify', 'demoted', 'bloom-done', 'word-anchor'];

  for (const [w, h] of VIEWPORTS) {
    await page.setViewport({ width: w, height: h });
    for (const label of order) {
      await states[label]();
      const cb = await controlBottom();
      const ok = cb <= h - MARGIN;
      if (!ok) fails.push(`${label} @${w}×${h}: lowest control (incl. shell Check) bottom ${cb}px > ${h - MARGIN}px — cut off / flush`);
      const tt = await checks();
      if (tt.bleed > 0) fails.push(`${label} @${w}×${h}: ${tt.bleed} text element(s) overflow their box`);
      if (tt.minDot != null && tt.minDot < MIN_DOT) fails.push(`${label} @${w}×${h}: a start-dot is ${tt.minDot}px (<${MIN_DOT}px, tiny)`);
      if (tt.overflow > 2) fails.push(`${label} @${w}×${h}: horizontal overflow ${tt.overflow}px`);
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${label} @${w}×${h}  ctrlBottom=${cb} (need ≤${h - MARGIN})  dot=${tt.minDot} bleed=${tt.bleed} overflow=${tt.overflow}`);
    }
  }

  await browser.close(); server.close();
  console.log('');
  if (fails.length) { console.error(`SNIPPY-PROBE FAILED — ${fails.length}:`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log(`SNIPPY-PROBE PASSED — guided-start/mid-stroke/certify/demoted/bloom-done/word-anchor: the trace paper + shell Check clear the fold by ≥${MARGIN}px across 320→1366; start-dots ≥${MIN_DOT}px, no word/Snippy/done glyph overflow, no horizontal overflow.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
