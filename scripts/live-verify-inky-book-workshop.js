#!/usr/bin/env node
/* =====================================================================
   live-verify-inky-book-workshop.js — drives The Two Inks (Inky's Book
   Workshop) ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone
   390): the real activity page, real pointer. The kite book with two
   desks: the wrong maker tapped → the hint names that maker's job (miss);
   the right makers finish both pages; the cover: the author on the picture
   slot slides back (miss); the illustrator and the author stamped → the
   book is done with the success text. The wrapper version is the one in
   page.tsx; the iframe grows with the card; every locale's page returns
   200.
   Usage: node scripts/live-verify-inky-book-workshop.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '066-two-inks', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'inky-book-workshop-activities.json'), 'utf8')).find(r => r.id === 'inky-book-workshop.author-illustrator.rl-k-6');
const C = require(path.join(MT, 'inky-workshop-core.js'));
const STR = (() => { const vm = require('vm'); const ctx = { window: {}, InkyWorkshopCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'inky-book-workshop-activity.js'), 'utf8') + ';this.__A = InkyBookWorkshopActivity;', ctx); return ctx.__A.strings; })();
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const wait = (ms) => new Promise(r => setTimeout(r, ms));
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  for (const loc of Object.keys(ROW.slug)) {
    const page = await browser.newPage();
    const res = await page.goto(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, { waitUntil: 'domcontentloaded', timeout: 90000 });
    is(res && res.status() === 200, `[${loc}] /${loc}/activities/${ROW.slug[loc]} → ${res && res.status()}`);
    await page.close(); await wait(400);
  }
  for (const loc of ['en', 'de', 'sv', 'fi']) for (const w of [1366, 390]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: w > 500 ? 1000 : 844 });
    await page.goto(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, { waitUntil: 'networkidle2', timeout: 90000 });
    const frameEl = await page.waitForSelector('iframe[src*="inky-book-workshop-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[${loc} @${w}] the page embeds inky-book-workshop-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.InkyBookWorkshopActivity && window.InkyBookWorkshopActivity.st && document.querySelector('.iw-wrap'), { timeout: 30000 });
    await wait(1500);
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const toView = async (sel) => { const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const rr = e.getBoundingClientRect(); return { y: rr.top + rr.height / 2 }; }, sel); if (!b) return false; const o = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - innerHeight / 2, behavior: 'instant' }), o.y + b.y); await wait(250); return true; };
    const ctrOf = async (sel) => { const o = await frameOff(); const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const rr = e.getBoundingClientRect(); return { x: rr.left + rr.width / 2, y: rr.top + rr.height / 2 }; }, sel); return b && { x: o.x + b.x, y: o.y + b.y }; };
    const tap = async (sel) => { if (!(await toView(sel))) throw new Error('nothing to tap: ' + sel); const p = await ctrOf(sel); await page.mouse.click(p.x, p.y); await wait(250); await frame.waitForFunction(() => !window.InkyBookWorkshopActivity._busy, { timeout: 15000 }).catch(() => {}); await wait(150); };
    const st = () => frame.evaluate(() => { const s = window.InkyBookWorkshopActivity.st; return JSON.parse(JSON.stringify({ page: s.page, phase: s.phase, cover: s.cover, misses: s.misses, done: s.done })); });
    const note = () => frame.evaluate(() => document.querySelector('.iw-note').textContent);
    await frame.evaluate(() => { const a = window.InkyBookWorkshopActivity; a.OK_MS = 60000; a.FAST = true; a.api.settings.jobs = '2'; a.api.settings.desks = 'open'; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(x => x.book === 'kite'); a._order = [i].concat(pool.map((x, q) => q).filter(q => q !== i)); a._curPass = 0; a._deal = null; window.LCS_reloadFirstTask(); });
    await wait(800);
    /* the kite: page 1 needs words, page 2 a picture */
    await tap('.iw-desk[data-role="illustrator"]'); let s = await st();
    is(s.page === 0 && s.misses === 1 && (await note()) === STR.hintIllus[loc], `[${loc} @${w}] the illustrator tapped for a page that needs words — her hint, a miss`);
    if (w === 390) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-miss.png`) });
    await tap('.iw-desk[data-role="author"]'); await tap('.iw-desk[data-role="illustrator"]'); s = await st();
    is(s.phase === 'cover', `[${loc} @${w}] the author and the illustrator finish the two pages — the cover opens`);
    await tap('.iw-desk[data-role="author"]'); await tap('.iw-credit[data-slot="picture"]'); s = await st();
    is(s.cover.picture === null && (await note()) === STR.hintCoverAuthor[loc], `[${loc} @${w}] the author on the picture slot slides back with its hint`);
    await frame.evaluate(() => { window.InkyBookWorkshopActivity.OK_MS = 0; });
    await tap('.iw-desk[data-role="illustrator"]'); await tap('.iw-credit[data-slot="picture"]');
    await tap('.iw-desk[data-role="author"]'); await tap('.iw-credit[data-slot="words"]'); await wait(500); s = await st();
    is(s.done && s.cover.words === 'author' && s.cover.picture === 'illustrator', `[${loc} @${w}] both stamped — the book is done`);
    await frame.waitForFunction(() => { const b = document.querySelector('.lcs-activity-bubble'); return b && b.textContent; }, { timeout: 15000 }).catch(() => {});
    const bubble = await frame.evaluate(() => { const b = document.querySelector('.lcs-activity-bubble'); return b ? b.textContent : ''; });
    is(bubble && !/\{\w+\}/.test(bubble) && bubble.includes(STR.okWin[loc]), `[${loc} @${w}] the success text is filled («${bubble.slice(0, 60)}…»)`);
    if (w === 1366) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(3000); /* the shell grows the iframe after the success bubble settles */
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-inky-book-workshop: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
