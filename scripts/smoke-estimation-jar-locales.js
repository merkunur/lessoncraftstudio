#!/usr/bin/env node
/* =====================================================================
   smoke-estimation-jar-locales.js — all 11 locales, live in a browser.

   verify-estimation-jar.js reads the strings table; this drives the tool
   and looks at what a teacher in that locale actually SEES. The two catch
   different things: a key present in the table but never wired into the
   DOM is invisible to the gate and obvious here.

   Per locale: chrome is in-locale, no raw camelCase key leaked, the ritual
   runs end to end, the reveal speaks BARE NUMERALS with lang set, and the
   RANKING BAN holds in that language — the one doctrine that has to survive
   translation, checked against the rendered page rather than the source.

   Usage: node scripts/smoke-estimation-jar-locales.js
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

/* Ranking vocabulary, per language. This is the tool's signature risk: the
   routine is normally WON, so the competitive phrasing is the natural thing
   for a translator to reach for. Mirrors verify-estimation-jar.js. */
const RANKING = {
  en: /\b(winner|wins|won|closest|nearest|best guess|champion)\b/i,
  de: /\b(gewinner|gewinnt|sieger|am n(ä|ae)chsten|n(ä|ae)chste[rsn]? (tipp|sch(ä|ae)tzung)|beste[rsn]? (tipp|sch(ä|ae)tzung))\b/i,
  fr: /\b(gagnant|gagne|vainqueur|le plus proche|la plus proche|meilleure? (estimation|r(é|e)ponse))\b/i,
  it: /\b(vincitore|vince|il pi(ù|u) vicino|la pi(ù|u) vicina|migliore stima)\b/i,
  es: /\b(ganador|gana|el m(á|a)s cercano|la m(á|a)s cercana|m(á|a)s cerca|mejor (estimaci(ó|o)n|respuesta))\b/i,
  pt: /\b(vencedor|ganha|o mais pr(ó|o)ximo|a mais pr(ó|o)xima|mais perto|melhor (estimativa|palpite))\b/i,
  nl: /\b(winnaar|wint|dichtstbij|het dichtst|beste (schatting|gok))\b/i,
  sv: /\b(vinnare|vinner|n(ä|a)rmast|n(ä|a)rmaste|b(ä|a)sta (gissning|uppskattning))\b/i,
  da: /\b(vinder|vandt|n(æ|ae)rmest|t(æ|ae)ttest|bedste (g(æ|ae)t|vurdering))\b/i,
  no: /\b(vinner|vant|n(æ|ae)rmest|n(æ|ae)rmeste|beste (gjetning|anslag))\b/i,
  fi: /\b(voittaja|voittaa|l(ä|a)himp(ä|a)n(ä|a)|l(ä|a)hin|paras (arvio|veikkaus))\b/i,
};

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
    await page.setViewport({ width: 900, height: 900 });
    await page.evaluateOnNewDocument(() => { try { localStorage.clear(); } catch (_) {} });
    const errs = [];
    page.on('pageerror', e => errs.push(e.message));
    await page.goto(`http://127.0.0.1:${PORT}/mini-tools/estimation-jar.html?lang=${loc}`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.ej-card', { timeout: 8000 });
    await sleep(250);
    await page.evaluate(() => { window.__spoken = []; if (window.LCSAudio) { LCSAudio.speak = o => window.__spoken.push(o); LCSAudio.cancel = () => {}; } });

    /* walk the whole ritual so every face's strings render */
    await page.evaluate(() => document.querySelectorAll('.ej-stagebtn')[1].click());
    await sleep(200);
    await page.evaluate(() => {
      const t = document.querySelector('.ej-track'), r = t.getBoundingClientRect();
      t.dispatchEvent(new MouseEvent('click', { clientX: r.left + r.width * 0.45, clientY: r.top + 40, bubbles: true }));
    });
    await sleep(120);
    await page.evaluate(() => document.querySelector('.ej-go').click());
    await sleep(150);
    const guessText = await page.evaluate(() => document.body.innerText);
    await page.evaluate(() => document.querySelectorAll('.ej-stagebtn')[2].click());
    /* ⚠ Wait for the reveal to SETTLE, not for a fixed sleep. The count is
       beat-driven now — a ten takes longer to say than a one — so a fixed
       window reported eleven locales as "no closing line" when the tool
       was simply still counting. */
    await page.waitForFunction(() => !!document.querySelector('.ej-truth'), { timeout: 40000 });
    await sleep(500);

    const r = await page.evaluate(() => ({
      text: document.body.innerText,
      title: (document.querySelector('.lcs-title, h1') || {}).textContent || '',
      spoken: window.__spoken || [],
      stages: [...document.querySelectorAll('.ej-stagebtn')].map(b => b.textContent.trim()),
      closing: (document.querySelector('.ej-closing') || {}).textContent || ''
    }));
    const all = guessText + '\n' + r.text;

    ok(`${loc} no page errors`, errs.length === 0, errs[0]);
    ok(`${loc} chrome is localized`, r.stages.every(s => s.length > 1), JSON.stringify(r.stages));
    ok(`${loc} no raw key leaked`, !/\b(stageFill|stageGuess|stageReveal|pickSet|howMany|theJarHeld|neighbourhood|privacyLine|addGuess|secretHint)\b/.test(all));
    ok(`${loc} the ritual closes with a line`, r.closing.trim().length > 5, r.closing);
    ok(`${loc} RANKING BAN holds`, !RANKING[loc].test(all), (RANKING[loc].exec(all) || [])[0]);
    ok(`${loc} speaks bare numerals`, r.spoken.filter(s => s.type === 'number').every(s => /^\d+$/.test(s.text)),
      JSON.stringify(r.spoken.filter(s => s.type === 'number').map(s => s.text)));
    ok(`${loc} every speak call carries lang`, r.spoken.length > 0 && r.spoken.every(s => s.lang === loc));
    console.log(`  ${loc}: ${r.stages.join(' / ')}`);
    await page.close();
  }

  await browser.close(); server.close();
  console.log(`\n${fail ? 'FAIL' : 'ALL GREEN'} — ${pass} passed, ${fail} failed across ${LOCALES.length} locales`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
