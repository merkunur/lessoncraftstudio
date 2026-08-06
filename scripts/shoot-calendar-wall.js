#!/usr/bin/env node
/* =====================================================================
   shoot-calendar-wall.js — the renders I read MYSELF.
   ---------------------------------------------------------------------
   Run:  node scripts/shoot-calendar-wall.js

   Not a gate. Every assertion in the DoD measures one thing against one
   threshold, and this build produced three defects that every one of
   them was green through — a 133x49 spreadsheet cell, a month with its
   last week past the fold, and a hub card cropped mid-row. All three
   were obvious in a screenshot and invisible to forty assertions.

   704 is the width the tool actually ships at, 768 is the width the
   operator reviews at, 1024x768 is the projector, 360 is the phone.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const OUT = path.join(REPO, 'docs', 'audit-results', 'calendar-wall', 'qa');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };

const SHOTS = [
  { name: 'calendar-704', w: 704, h: 980, widget: 0 },
  { name: 'calendar-768', w: 768, h: 1000, widget: 0 },
  { name: 'calendar-1024x768', w: 1024, h: 768, widget: 0 },
  { name: 'calendar-360', w: 360, h: 740, widget: 0 },
  { name: 'counter-768', w: 768, h: 1000, widget: 1 },
  { name: 'weather-768', w: 768, h: 1000, widget: 2 },
  { name: 'daysheet-768', w: 768, h: 1000, widget: 0, sheet: true },
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const server = http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p === '/') p = '/calendar-wall.html';
    const f = p.startsWith('/mini-tools/') ? path.join(MINI, p.slice('/mini-tools/'.length)) : path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(f, (e, b) => { if (e) { res.statusCode = 404; res.end(''); return; }
      res.setHeader('Content-Type', MIME[path.extname(f)] || 'application/octet-stream'); res.end(b); });
  });
  await new Promise(r => server.listen(0, r));
  const PORT = server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  for (const s of SHOTS) {
    const page = await browser.newPage();
    await page.setViewport({ width: s.w, height: s.h });
    /* ⚠ CLEAR THE STORE FIRST. All seven shots share one origin and the
       tool persists its wall to localStorage, so without this each shot
       inherits the previous shot's seed — the day sheet photographed
       SEVEN identical trips for one event, and it looked like a
       duplication bug in `eventsOn` rather than a shared-origin harness
       fault. Exactly the defect the locale smoke had, one file later:
       when a tool remembers, a shared origin is shared STATE. */
    await page.evaluateOnNewDocument(() => { try { localStorage.clear(); } catch (e) {} });
    await page.goto(`http://127.0.0.1:${PORT}/mini-tools/calendar-wall.html?lang=en`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 500));
    await page.evaluate((widget, sheet) => {
      const T = window.CalendarWall;
      T.premium = true; T.premiumKnown = true;
      const w = T.wall();
      /* a class two thirds through the year, with a trip coming */
      let k = T._todayKey, n = 0, guard = 0;
      const back = [];
      while (n < 61 && guard++ < 400) { k = T.M.shiftKey(k, -1); if (T.M.isSchoolDay(w, k)) { back.push(k); n++; } }
      back.reverse().forEach((key, i) => T.M.setCountOn(w, key, i + 1));
      T.M.setCountOn(w, T._todayKey, 62);
      let off = T._todayKey, g2 = 0;
      while (g2++ < 9) { off = T.M.shiftKey(off, 1); if (T.M.meetsDow(w, T.M.dowOf(off)) && T.M.sleepsBetween(T._todayKey, off) < 4) break; }
      const trip = T.M.addEvent(w, T.M.shiftKey(T._todayKey, 4), 'trip', 'Zoo', 2, 'once');
      T.M.addEvent(w, off, 'off', '', 1, 'once');
      T.M.addEvent(w, T.M.shiftKey(T._todayKey, -3), 'bday', '', 1, 'year');
      T.M.setTarget(w, trip);
      T.M.setWeatherOn(w, T._todayKey, 'sun');
      /* a month of weather so the pictograph has something to show */
      const ids = ['sun', 'cloud', 'rain', 'sun', 'wind', 'sun', 'cloud', 'rain', 'sun', 'cloud', 'sun', 'snow', 'sun', 'rain'];
      let d = T._todayKey;
      for (let i = 0; i < ids.length; i++) { d = T.M.shiftKey(d, -1); T.M.setWeatherOn(w, d, ids[i]); }
      T._armTeacher(true);
      T._widx = widget;
      T._paint();
      if (sheet) T._openSheet(T.M.shiftKey(T._todayKey, 4));
    }, s.widget, !!s.sheet);
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: path.join(OUT, s.name + '.png'), fullPage: true });
    console.log('  shot ' + s.name + '  (' + s.w + 'x' + s.h + ')');
    await page.close();
  }
  await browser.close();
  server.close();
  console.log('\n-> ' + OUT);
})().catch(e => { console.error(e); process.exit(1); });
