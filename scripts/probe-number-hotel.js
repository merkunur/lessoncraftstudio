/* Render probe for TOOL #49 — mounts it, drives the three moves at the
   corridor's end with real pointer clicks, and shoots the viewports I
   read myself.  Run: node scripts/probe-number-hotel.js               */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = process.env.NUMBER_HOTEL_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const OUT = path.join(__dirname, '..', 'docs', 'audit-results', 'number-hotel', 'qa');
const PORT = 5671;

const srv = http.createServer((rq, rs) => {
  let f = rq.url.split('?')[0].replace('/mini-tools/', '');
  while (f.charAt(0) === '/') f = f.slice(1);
  if (!f) f = 'number-hotel.html';
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  const t = f.endsWith('.js') ? 'application/javascript' : f.endsWith('.json') ? 'application/json'
    : f.endsWith('.css') ? 'text/css' : 'text/html';
  rs.writeHead(200, { 'Content-Type': t }); rs.end(fs.readFileSync(fp));
}).listen(PORT);

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const errs = [];
  for (const c of [{ w: 360, h: 800 }, { w: 768, h: 1024 }, { w: 1024, h: 900 }]) {
    const p = await b.newPage();
    p.on('pageerror', e => errs.push(`${c.w}: ${e.message}`));
    await p.setViewport({ width: c.w, height: c.h });
    await p.goto(`http://127.0.0.1:${PORT}/mini-tools/number-hotel.html?lang=en`, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 500));

    const info = await p.evaluate(() => {
      const T = window.NumberHotel;
      const a = document.querySelector('.nhl-arena');
      return {
        arena: a ? Math.round(a.getBoundingClientRect().width) : null,
        room: T && T.st ? T.st.room : null,
        lit: document.querySelectorAll('.nhl-num').length,
        doors: document.querySelectorAll('.nhl-door').length,
        walls: document.querySelectorAll('.nhl-wall').length,
        btns: document.querySelectorAll('.nhl-btn').length,
        pads: document.querySelectorAll('.nhl-pad').length,
        ind: (document.querySelector('.nhl-ind') || {}).textContent
      };
    });
    console.log(`[${c.w}] arena=${info.arena}px room=${info.room} litNumerals=${info.lit} ` +
      `doors=${info.doors} walls=${info.walls} btns=${info.btns} pads=${info.pads} indicator="${info.ind}"`);
    await p.screenshot({ path: path.join(OUT, `open-${c.w}.png`) });

    /* walk to the end of corridor 0, then meet the wall */
    for (let i = 0; i < 9; i++) {
      await p.evaluate(() => document.querySelector('.nhl-b-right').click());
      await new Promise(r => setTimeout(r, 60));
    }
    const atEnd = await p.evaluate(() => ({ room: window.NumberHotel.st.room }));
    await p.screenshot({ path: path.join(OUT, `at-end-${c.w}.png`) });

    /* the refusal */
    await p.evaluate(() => document.querySelector('.nhl-b-right').click());
    await new Promise(r => setTimeout(r, 110));
    const wallLit = await p.evaluate(() => document.querySelectorAll('.nhl-wall.is-lit').length);
    await p.screenshot({ path: path.join(OUT, `wall-${c.w}.png`) });
    await new Promise(r => setTimeout(r, 400));

    /* the stairs — the carry */
    await p.evaluate(() => document.querySelector('.nhl-b-stair').click());
    await new Promise(r => setTimeout(r, 900));
    const afterStairs = await p.evaluate(() => ({
      room: window.NumberHotel.st.room,
      ind: (document.querySelector('.nhl-ind') || {}).textContent
    }));

    /* the elevator — ones unchanged */
    await p.evaluate(() => document.querySelector('.nhl-b-up').click());
    await new Promise(r => setTimeout(r, 900));
    const afterLift = await p.evaluate(() => ({
      room: window.NumberHotel.st.room,
      ind: (document.querySelector('.nhl-ind') || {}).textContent
    }));
    console.log(`      end=${atEnd.room}  wallLit=${wallLit}  stairs->${afterStairs.room} (ind ${afterStairs.ind})` +
      `  elevator->${afterLift.room} (ind ${afterLift.ind})`);
    await p.screenshot({ path: path.join(OUT, `moved-${c.w}.png`) });
    await p.close();
  }
  await b.close(); srv.close();
  if (errs.length) { console.log('\nPAGE ERRORS:'); errs.forEach(e => console.log('  ' + e)); }
  else console.log('\nno page errors');
})();
