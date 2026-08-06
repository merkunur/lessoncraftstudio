#!/usr/bin/env node
/* =====================================================================
   _coin-probe.js — the multi-state control-bottom probe for "Pip's Market
   Stall" (2.MD.C.8). The uncapped visual-qa sweep covers first paint; this
   drives the compose-empty / compose-filled / full-legend / count-set /
   enough / change / overpay states and per the #10 lesson MEASURES the lowest
   control INCLUDING the shell `.lcs-activity-check` AND the "Pay" button
   <= vh-4 across 320·360·412·768·1024·1366. Bakes in the Game-32/35 TEXT-
   CONTAINMENT check (no scenario/goal/option/legend/glyph overflows its box)
   + a NO-OVERLAP check (coins/options) + tap >=44px + no horizontal overflow.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'coin-stall.money.2-md-c-8';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.png': 'image/png' };
const VIEWPORTS = [[280, 740], [320, 640], [360, 740], [412, 820], [768, 1000], [1024, 900], [1366, 900]];
const MARGIN = 4, CTRL_MIN = 44;

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]), file;
    if (p === '/' || p.endsWith('.html')) file = path.join(MINI, path.basename(p) || 'x');
    else if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
    else file = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (err, buf) => { if (err) { res.statusCode = 404; res.end('nf'); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(buf); });
  });
}

const ORACLE = `function(){
  var a=window.CoinStallActivity,C=window.CoinStallCore,r=a.round;
  if(C.CHOOSE_COGS[r.cog]) return;
  var cs=r.coinSet, tgt=C.effectiveTarget(r), ex=r.cog==='trade'?r.offer.den:null;
  var purse=a._purse.slice(), vals=purse.map(function(d){return C.valueOf(cs,d);}), out=[];
  (function rec(i,cur,sum){ if(sum===tgt){out.push(cur.slice());return;} if(sum>tgt||i>=purse.length)return;
    if(!(ex&&purse[i]===ex)){cur.push(i);rec(i+1,cur,sum+vals[i]);cur.pop();} rec(i+1,cur,sum); })(0,[],0);
  if(!out.length) return;
  var pick=out[0]; if(r.cog==='fewest') pick=out.reduce(function(m,s){return (!m||s.length<m.length)?s:m;},null);
  else if(r.cog==='two-ways') pick=out.find(function(s){return !C.sameMultiset(s.map(function(i){return purse[i];}),r.shownSet);})||out[0];
  pick.slice().sort(function(x,y){return y-x;}).forEach(function(i){ a._place(i); });
}`;

(async () => {
  const puppeteer = require('puppeteer');
  const server = serve();
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const PORT = server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const fails = [];
  const url = `http://127.0.0.1:${PORT}/coin-stall-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.CoinStallActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'coin-stall.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.CoinStallActivity.round && document.querySelector('.cs-root'), { timeout: 4000 });
    await sleep(40);
  }
  const oracle = () => page.evaluate('(' + ORACLE + ')()').then(() => sleep(20));
  const over = () => page.evaluate(() => { const a = window.CoinStallActivity, i = a._purse.indexOf('quarter'); if (i >= 0) a._place(i); const b = document.querySelector('.cs-pay'); if (b) b.click(); }).then(() => sleep(40));

  const states = {
    'make-empty': async () => { await force('make-starfish-41'); },
    'make-filled': async () => { await force('make-shell-30'); await oracle(); },
    'legend': async () => { await force('make-pebble-16'); },
    'count-set': async () => { await force('count-set-till'); },
    'enough': async () => { await force('enough-book-35'); },
    'change': async () => { await force('change-cheese-100'); },
    'over': async () => { await force('make-shell-30'); await oracle(); await over(); }
  };

  async function controlBottom() {
    return await page.evaluate(() => {
      const sel = '.cs-coin,.cs-opt,.cs-pay,.cs-tray,.cs-options,.lcs-activity-check';
      let max = 0; document.querySelectorAll(sel).forEach(e => { const r = e.getBoundingClientRect(); if (r.height) max = Math.max(max, r.bottom); });
      return Math.round(max);
    });
  }
  async function checks() {
    return await page.evaluate(() => {
      const taps = Array.from(document.querySelectorAll('.cs-coin,.cs-opt,.cs-pay'));
      let minTap = 999; taps.forEach(e => { const r = e.getBoundingClientRect(); if (r.width && r.height && getComputedStyle(e).visibility !== 'hidden') minTap = Math.min(minTap, Math.min(r.width, r.height)); });
      let bleed = 0;
      document.querySelectorAll('.cs-scenario,.cs-goal,.cs-opt,.cs-legitem,.cs-legvals,.cs-glyph,.cs-saytext,.cs-trayph,.cs-donetext').forEach(el => { if (el.scrollWidth > el.clientWidth + 1) bleed++; });
      const boxes = Array.from(document.querySelectorAll('.cs-coin,.cs-opt')).map(e => e.getBoundingClientRect());
      let overlap = 0;
      for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) { const a = boxes[i], b = boxes[j]; const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top); if (ox > 6 && oy > 6) overlap++; }
      const d = document.scrollingElement || document.documentElement;
      return { minTap: taps.length ? Math.round(minTap) : 999, bleed, overlap, overflow: Math.round(d.scrollWidth - d.clientWidth) };
    });
  }

  await page.setViewport({ width: 412, height: 820 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForFunction(() => { const t = window.CoinStallActivity; return t && t._activityRow && document.querySelector('.cs-root'); }, { timeout: 15000 });

  const order = ['make-empty', 'make-filled', 'legend', 'count-set', 'enough', 'change', 'over'];

  for (const [w, h] of VIEWPORTS) {
    await page.setViewport({ width: w, height: h });
    const subFloor = (w === 320 && h <= 640);
    for (const label of order) {
      await states[label]();
      const cb = await controlBottom();
      const ok = cb <= h - MARGIN;
      if (!ok) fails.push(`${label} @${w}×${h}: lowest control (incl. shell Check) bottom ${cb}px > ${h - MARGIN}px — cut off / flush`);
      const tt = await checks();
      if (tt.minTap < CTRL_MIN && tt.minTap !== 999 && !subFloor) fails.push(`${label} @${w}×${h}: a control is ${tt.minTap}px (<${CTRL_MIN}px)`);
      if (tt.bleed > 0) fails.push(`${label} @${w}×${h}: ${tt.bleed} text element(s) overflow their box`);
      if (tt.overlap > 0) fails.push(`${label} @${w}×${h}: ${tt.overlap} coin/option pair(s) overlap`);
      if (tt.overflow > 2) fails.push(`${label} @${w}×${h}: horizontal overflow ${tt.overflow}px`);
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${label} @${w}×${h}  ctrlBottom=${cb} (need ≤${h - MARGIN})  tap=${tt.minTap} bleed=${tt.bleed} overlap=${tt.overlap} overflow=${tt.overflow}`);
    }
  }

  await browser.close(); server.close();
  console.log('');
  if (fails.length) { console.error(`COIN-PROBE FAILED — ${fails.length}:`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log(`COIN-PROBE PASSED — compose/filled/legend/count-set/enough/change/over: lowest control (incl. shell Check + Pay) clears the fold by ≥${MARGIN}px across 280→1366; coins/options/Pay ≥${CTRL_MIN}px (off the 320 sub-floor), no scenario/goal/option/legend/glyph overflow, no coin/option overlap, no horizontal overflow.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
