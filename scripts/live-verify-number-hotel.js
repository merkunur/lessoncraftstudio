/* live-verify-number-hotel.js — TOOL #48 on PRODUCTION, all 11 locales.
   ⚠ It DRIVES THE SCOOP, not "it mounts", and asserts something true
   only of THIS build, so it doubles as a deployed-bytes check.
   Run: node scripts/live-verify-number-hotel.js                      */
'use strict';
const puppeteer = require('puppeteer');
const BASE = 'https://www.lessoncraftstudio.com';
const LOC = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const SLUG = require('./_number-hotel-landing.js');
let PASS = 0, FAIL = 0; const fails = [];
function ok(c, m) { if (c) PASS++; else { FAIL++; fails.push(m); } }

(async () => {
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  for (const loc of LOC) {
    const url = `${BASE}/${loc}/tools/${SLUG[loc].slug}`;
    const p = await b.newPage();
    const r = await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 }).catch(() => null);
    ok(r && r.status() === 200, `${loc}: landing ${url} → ${r ? r.status() : 'no response'}`);
    if (r && r.status() === 200) {
      const html = await p.content();
      ok(html.indexOf(SLUG[loc].name) !== -1, `${loc}: landing does not carry the tool name`);
      ok(html.indexOf('number-hotel.html') !== -1, `${loc}: landing does not embed the mini-tool`);
    }
    await p.close();

    /* the tool itself, driven */
    const q = await b.newPage();
    await q.goto(`${BASE}/mini-tools/number-hotel.html?lang=${loc}`, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await new Promise(s => setTimeout(s, 900));
    const pre = await q.evaluate(() => {
      const T = window.NumberHotel;
      if (!T || !T.st) return null;
      return { room: T.st.room,
        lit: document.querySelectorAll('.nhl-num').length,
        doors: document.querySelectorAll('.nhl-door').length,
        walls: document.querySelectorAll('.nhl-wall').length,
        ind: (document.querySelector('.nhl-ind') || {}).textContent,
        title: (document.querySelector('.lcs-title') || {}).textContent || '',
        /* only true of THIS build */
        hasStairs: typeof T.stairs === 'function',
        hasCanRead: typeof T.canRead === 'function' };
    });
    ok(pre, `${loc}: the tool did not mount on production`);
    if (pre) {
      ok(pre.hasStairs && pre.hasCanRead, `${loc}: DEPLOYED BYTES ARE STALE — stairs/canRead absent`);
      ok(pre.doors === 100, `${loc}: ${pre.doors} doors, expected 100`);
      /* ⭐ THE THESIS: exactly ONE corridor is readable, never the chart */
      ok(pre.lit === 10, `${loc}: ${pre.lit} numerals lit — exactly one corridor (10) must be readable`);
      ok(pre.walls === 20, `${loc}: ${pre.walls} end walls, expected 20`);

      /* walk to the corridor's end, meet the wall, then take the stairs */
      for (let i = 0; i < 9; i++) {
        await q.evaluate(() => document.querySelector('.nhl-b-right').click());
        await new Promise(s => setTimeout(s, 330));
      }
      const end = await q.evaluate(() => window.NumberHotel.st.room);
      ok(end === 9, `${loc}: walked to ${end}, expected the corridor's end at 9`);
      await q.evaluate(() => document.querySelector('.nhl-b-right').click());
      await new Promise(s => setTimeout(s, 120));
      const wall = await q.evaluate(() => ({
        lit: document.querySelectorAll('.nhl-wall.is-lit').length,
        room: window.NumberHotel.st.room }));
      ok(wall.lit === 1, `${loc}: the end wall did not light on the refusal`);
      ok(wall.room === 9, `${loc}: THE REFUSED WALK MOVED THE WALKER to ${wall.room}`);
      await new Promise(s => setTimeout(s, 400));
      await q.evaluate(() => document.querySelector('.nhl-b-stair').click());
      await new Promise(s => setTimeout(s, 900));
      const st = await q.evaluate(() => ({ room: window.NumberHotel.st.room,
        ind: (document.querySelector('.nhl-ind') || {}).textContent }));
      ok(st.room === 10, `${loc}: the stairs went to ${st.room}, expected 10`);
      ok(st.ind === '1', `${loc}: the indicator reads ${st.ind}, expected the tens digit 1`);
      await q.evaluate(() => document.querySelector('.nhl-b-up').click());
      await new Promise(s => setTimeout(s, 900));
      const lift = await q.evaluate(() => window.NumberHotel.st.room);
      ok(lift === 20, `${loc}: the elevator went to ${lift}, expected 20`);
      console.log(`  ${loc}: "${pre.title.slice(0, 26)}" 9 -> wall -> stairs ${st.room} (ind ${st.ind}) -> lift ${lift}`);
    }
    await q.close();
  }
  await b.close();
  console.log('\n' + '='.repeat(60));
  console.log(`live-verify: ${PASS} passed, ${FAIL} failed`);
  fails.forEach(f => console.log('  ✗ ' + f));
  console.log('='.repeat(60));
  process.exit(FAIL ? 1 : 0);
})();
