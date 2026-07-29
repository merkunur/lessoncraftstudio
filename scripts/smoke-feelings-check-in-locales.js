#!/usr/bin/env node
/* =====================================================================
   smoke-feelings-check-in-locales.js — all 11 locales, live.

   The gate reads the strings table; this drives the board and looks at
   what a child in that locale actually SEES and HEARS. The two catch
   different things: a key that exists in the table but is never wired
   into the DOM is invisible to the gate and obvious here — and so is a
   weather sentence whose grammar only works in English.

   Per locale: chrome is in-locale, no raw camelCase key leaks, all five
   feelings are labelled, the kind reply is spoken in that language, the
   help menu is present (it is FREE in every locale), the class-weather
   sentence renders with no placeholder left behind, and the RANKING BAN
   holds against the rendered page rather than the source.

   Usage: node scripts/smoke-feelings-check-in-locales.js
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

const CLASS_ID = 'c_smoke';
const KIDS = [{ id: 's_1', name: 'Aino' }, { id: 's_2', name: 'Bram' }, { id: 's_3', name: 'Célia' }];
const MC = { v: 1, activeClassId: CLASS_ID, classes: [{ id: CLASS_ID, name: 'Smoke', students: KIDS }], fairness: {}, groupings: {} };

/* Ranking vocabulary per language — the doctrine that has to survive
   translation. Mirrors verify-feelings-check-in.js. */
const RANKING = {
  en: /\b(winner|wins|won|closest|nearest|happiest|best feeling)\b/i,
  de: /\b(gewinner|gewinnt|sieger|am gl(ü|u)cklichsten)\b/i,
  fr: /\b(gagnant|gagne|vainqueur|le plus heureux|la plus heureuse)\b/i,
  it: /\b(vincitore|vince|il pi(ù|u) felice|la pi(ù|u) felice)\b/i,
  es: /\b(ganador|gana|el m(á|a)s feliz|la m(á|a)s feliz)\b/i,
  pt: /\b(vencedor|ganha|o mais feliz|a mais feliz)\b/i,
  nl: /\b(winnaar|wint|de blijste|het blijst)\b/i,
  sv: /\b(vinnare|vinner|gladast)\b/i,
  da: /\b(vinder|vandt|gladest)\b/i,
  no: /\b(vinner|vant|gladest)\b/i,
  fi: /\b(voittaja|voittaa|iloisin)\b/i
};
const RAW_KEYS = /\b(feelCalm|feelHappy|feelSad|feelAngry|feelTired|valCalm|valSad|helpTitle|helpNote|weatherTitle|weatherMostly|weatherAll|rosterPick|rosterDone|privacyLine|suiteLabel|wxSun|wxnRain)\b/;

let fail = 0, pass = 0;
const ok = (n, c, x) => { if (c) { pass++; } else { fail++; console.log('  FAIL ' + n + (x ? ' — ' + x : '')); } };
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const server = http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const f = p.startsWith('/image-library-webp/')
      ? path.join(IMG, p.slice('/image-library-webp/'.length))
      : path.join(MINI, p.replace(/^\/mini-tools\//, '').replace(/^\//, ''));
    fs.readFile(f, (e, b) => {
      if (e) { res.statusCode = 404; return res.end(); }
      res.setHeader('Content-Type', MIME[path.extname(f)] || 'application/octet-stream');
      res.end(b);
    });
  });
  await new Promise(r => server.listen(0, r));
  const PORT = server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  for (const loc of LOCALES) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1000, height: 900 });
    await page.setRequestInterception(true);
    page.on('request', r => {
      if (/\/api\/auth\/me/.test(r.url()))
        return r.respond({ status: 200, contentType: 'application/json', body: JSON.stringify({ user: { subscriptionTier: 'full' }, subscription: { status: 'active' } }) });
      r.continue();
    });
    await page.evaluateOnNewDocument((mc) => {
      try {
        localStorage.clear();
        localStorage.setItem('lcs:my-classes:v1', JSON.stringify(mc));
        localStorage.setItem('accessToken', 'smoke');
      } catch (_) {}
    }, MC);
    const errs = [];
    page.on('pageerror', e => errs.push(e.message));

    await page.goto(`http://127.0.0.1:${PORT}/mini-tools/feelings-check-in.html?lang=${loc}&mode=roster`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.fci-card', { timeout: 8000 });
    await sleep(500);
    await page.evaluate(() => { window.__spoken = []; if (window.LCSAudio) { LCSAudio.speak = o => window.__spoken.push(o); LCSAudio.cancel = () => {}; } });

    /* two children check in, so the class weather has a main and a minor */
    for (const [i, f] of [[0, 'happy'], [1, 'happy'], [2, 'sad']]) {
      await page.evaluate(j => { const b = document.querySelectorAll('.fci-name')[j]; if (b) b.click(); }, i);
      await sleep(200);
      await page.evaluate(x => { const b = document.querySelector(`.fci-feel[data-feel="${x}"]`); if (b) b.click(); }, f);
      await sleep(280);
      const openText = await page.evaluate(() => document.body.innerText);
      if (i === 2) page._openText = openText;
      await page.evaluate(() => { const b = document.querySelector('.fci-go'); if (b) b.click(); });
      await sleep(200);
    }

    const r = await page.evaluate(() => ({
      text: document.body.innerText,
      modes: [...document.querySelectorAll('.fci-modebtn')].map(b => b.textContent.trim()),
      feels: [...document.querySelectorAll('.fci-feel .fci-feellabel')].map(b => b.textContent.trim()),
      weather: (document.querySelector('.fci-wline') || {}).textContent || '',
      count: (document.querySelector('.fci-count') || {}).textContent || '',
      privacy: (document.querySelector('.fci-privacy') || {}).textContent || '',
      spoken: window.__spoken || []
    }));
    const all = (page._openText || '') + '\n' + r.text;

    ok(`${loc} no page errors`, errs.length === 0, errs[0]);
    ok(`${loc} mode strip is localized`, r.modes.length === 2 && r.modes.every(s => s.length > 1), JSON.stringify(r.modes));
    ok(`${loc} no raw key leaked`, !RAW_KEYS.test(all), (RAW_KEYS.exec(all) || [])[0]);
    ok(`${loc} the checked-in count renders`, /\d/.test(r.count), r.count);
    ok(`${loc} the privacy promise is stated`, r.privacy.length > 30, r.privacy);
    ok(`${loc} the class weather sentence renders`, r.weather.length > 12, r.weather);
    ok(`${loc} no placeholder survives in the weather line`, !/\{(main|minor|n|m|name)\}/.test(r.weather), r.weather);
    ok(`${loc} RANKING BAN holds`, !RANKING[loc].test(all), (RANKING[loc].exec(all) || [])[0]);
    ok(`${loc} the kind reply is spoken in-locale`, r.spoken.length > 0 && r.spoken.every(s => s.lang === loc && s.type === 'ui'),
      JSON.stringify(r.spoken.map(s => s.lang + '/' + s.type)));

    /* the five labels only exist on the feelings face, which is behind the
       name tap — sample them from a fresh anon load */
    const p2 = await browser.newPage();
    await p2.evaluateOnNewDocument(() => { try { localStorage.clear(); } catch (_) {} });
    await p2.goto(`http://127.0.0.1:${PORT}/mini-tools/feelings-check-in.html?lang=${loc}`, { waitUntil: 'domcontentloaded' });
    await p2.waitForSelector('.fci-card', { timeout: 8000 }); await sleep(250);
    const f2 = await p2.evaluate(() => ({
      feels: [...document.querySelectorAll('.fci-feellabel')].map(b => b.textContent.trim()),
      helps: [...document.querySelectorAll('.fci-helplabel')].map(b => b.textContent.trim())
    }));
    ok(`${loc} five feelings labelled`, f2.feels.length === 5 && f2.feels.every(s => s.length > 1), JSON.stringify(f2.feels));
    ok(`${loc} feeling labels are distinct`, new Set(f2.feels).size === 5, JSON.stringify(f2.feels));
    await p2.evaluate(() => document.querySelector('.fci-feel[data-feel="sad"]').click());
    await sleep(300);
    const h = await p2.evaluate(() => [...document.querySelectorAll('.fci-helplabel')].map(b => b.textContent.trim()));
    ok(`${loc} the help menu is FREE and localized`, h.length === 4 && h.every(s => s.length > 2), JSON.stringify(h));
    await p2.close();

    console.log(`  ${loc}: ${f2.feels.join(' / ')}`);
    console.log(`       ${r.weather}`);
    await page.close();
  }

  await browser.close(); server.close();
  console.log(`\n${fail ? 'FAIL' : 'ALL GREEN'} — ${pass} passed, ${fail} failed across ${LOCALES.length} locales`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
