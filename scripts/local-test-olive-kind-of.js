#!/usr/bin/env node
/* =====================================================================
   local-test-olive-kind-of.js — interaction harness for "Olive's Kind-Of Tree"
   (CCSS L.1.5.b). Serves `mini tools/` + image-library-webp; drives the shell:
     • a round renders the picture + clue + 3 category word cards;
     • tapping the correct category → shell Check → celebrate;
     • tapping a wrong category → tryagain, the tapped card gets the QUIET tried
       mark, and NO card is marked correct (that would leak the answer);
     • cards SHUFFLED; tap-to-deselect; the picture loads;
     • ≥8 distinct rounds + reshuffle; no overflow 280→768.

   ⚠ Drives en AND sv. It used to hard-code `lang=en`, five English round ids
   (`robin`, `banana`, …) and the literal English title — none of which survive a
   locale switch, because THIS MANIFEST GIVES EVERY LOCALE ITS OWN ROUND IDS
   (en `robin` / de `hund-tier` / sv `pannkaka-mat`). Ids now come from the POOL
   and the title from the shipped strings table, so the harness cannot be right
   for the wrong reason.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'olive-kind-of.category-attribute.l-1-5-b';
const LOCALES = (process.argv.find((a) => a.startsWith('--locales=')) || '--locales=en,sv').split('=')[1].split(',');
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const IMG = path.join(REPO, 'frontend', 'public', 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]), file;
    if (p.startsWith('/image-library-webp/')) file = path.join(IMG, p.slice('/image-library-webp/'.length));
    else if (p === '/' || p.endsWith('.html')) file = path.join(MINI, path.basename(p) || 'x');
    else if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
    else file = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (err, buf) => { if (err) { res.statusCode = 404; res.end('not found'); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(buf); });
  });
}

(async () => {
  const puppeteer = require('puppeteer');
  const server = serve();
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const PORT = server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const fails = [];
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  for (const loc of LOCALES) {
    const note = (cond, msg) => { if (!cond) fails.push(`[${loc}] ` + msg); };
    const page = await browser.newPage();
    await page.setViewport({ width: 412, height: 900 });
    const errs = [];
    const isNoise = (s) => /Failed to load resource|favicon|\/audio\/|inventory\.json|speechSynthesis|not-allowed/i.test(s);
    page.on('console', (m) => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
    page.on('pageerror', (e) => { if (!isNoise(e.message)) errs.push(e.message); });

    const url = `http://127.0.0.1:${PORT}/olive-kind-of-activity.html?lang=${loc}&activity=${ACTIVITY}&embed=1`;

    async function force(id) {
      await page.evaluate((rid) => {
        const t = window.OliveKindOfActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
        const k = t._pool.findIndex((x) => x.id === 'olive-kind-of.' + rid);
        const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
        t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
      }, id);
      await page.waitForFunction(() => window.OliveKindOfActivity.round && document.querySelector('.okt-root'), { timeout: 4000 });
      await sleep(60);
    }
    const correctId = () => page.evaluate(() => window.CategoryDefineCore.oracle(window.OliveKindOfActivity.round));
    const wrongId = () => page.evaluate(() => { const r = window.OliveKindOfActivity.round, o = window.CategoryDefineCore.oracle(r); return r.choices.map((c, i) => i).filter((i) => i !== o)[0]; });
    const tap = (id) => page.evaluate((x) => { const b = document.querySelector('.okt-opt[data-id="' + x + '"]'); if (b) b.click(); }, id).then(() => sleep(40));
    const check = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c && !c.disabled) c.click(); }).then(() => sleep(140));
    const celebrated = () => page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
    const triedAgain = () => page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('tryagain')); });
    const firstCardText = () => page.$eval('.okt-opt', (e) => e.textContent.trim()).catch(() => '');

    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.waitForFunction(() => { const t = window.OliveKindOfActivity; return t && t._activityRow && document.querySelector('.okt-root') && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

      /* ⚠ the title comes from the SHIPPED strings table, never a literal */
      const shippedTitle = await page.evaluate((l) => { const s = window.OliveKindOfActivity.strings.title; return s[l] || s.en; }, loc);
      const title = await page.$eval('.lcs-title', (e) => e.textContent.trim()).catch(() => '');
      note(!!shippedTitle, 'the strings table has no title for this locale');
      note(title === shippedTitle, `header title "${title}" != the shipped strings value "${shippedTitle}"`);

      /* the shell demands `instruction`; without it the container announces the raw key */
      const instr = await page.evaluate((l) => { const s = window.OliveKindOfActivity.strings.instruction; return s && (s[l] || s.en); }, loc);
      note(!!instr && instr !== 'instruction', `the strings table has no usable "instruction" for this locale (got ${JSON.stringify(instr)})`);
      const aria = await page.$eval('.lcs-app', (e) => e.getAttribute('aria-label') || '').catch(() => '');
      note(!/\binstruction\b/.test(aria), `the container aria-label announces the raw token "instruction": ${aria}`);

      const Np = await page.evaluate(() => window.OliveKindOfActivity._pool.length);
      note(Np >= 8, `only ${Np} rounds (<8)`);
      const ids = await page.evaluate((count) => { const t = window.OliveKindOfActivity, out = []; for (let i = 0; i < count; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * Np);
      note(new Set(ids.slice(0, Np)).size >= 8, `only ${new Set(ids.slice(0, Np)).size} distinct rounds (<8)`);
      note(ids.slice(0, Np).join(',') !== ids.slice(Np, 2 * Np).join(',') || Np < 2, 'second pass did not reshuffle');

      /* ⚠ round ids READ FROM THE POOL — they are per-locale in this manifest */
      const bare = await page.evaluate(() => window.OliveKindOfActivity._pool.map((x) => x.id.replace(/^olive-kind-of\./, '')));
      note(bare.length >= 8, 'could not read the round ids off the pool');

      await force(bare[0]);
      note(!!(await page.$('.okt-pic')), 'no picture');
      note(!!(await page.$('.okt-cluetxt')), 'no clue');
      note(await page.$$eval('.okt-opt', (els) => els.length) === 3, 'did not render 3 category cards');
      const picLoaded = await page.$eval('.okt-img', (i) => i.complete && i.naturalWidth > 0);
      note(picLoaded, 'the picture failed to load (broken image)');

      await tap(await correctId()); await check();
      note(await celebrated(), 'the correct category did not celebrate');

      /* ⭐ the WRONG state — the one a child hits most, and the one that used to
         change nothing on the board at all. Two separate questions now:
         (a) does the board say anything?  (b) does it leak WHICH card is right? */
      await force(bare[1]);
      const wId = await wrongId();
      await tap(wId); await check();
      note(await triedAgain(), 'a wrong category did not show try-again');
      note(!(await celebrated()), 'a wrong category celebrated (must not)');
      const marks = await page.evaluate(() => ({
        tried: document.querySelectorAll('.okt-opt.okt-tried').length,
        triedIsSelected: !!document.querySelector('.okt-opt.okt-tried.okt-sel'),
        correctMarked: document.querySelectorAll('.okt-opt.okt-correct, .okt-opt.okt-right, .okt-opt.okt-good').length,
      }));
      note(marks.tried === 1, `expected exactly 1 card marked as tried after a wrong Check, saw ${marks.tried}`);
      note(marks.triedIsSelected, 'the tried mark is not on the card the child actually tapped');
      note(marks.correctMarked === 0, 'a card is marked CORRECT after a wrong pick — the board is leaking the answer');
      await tap(await correctId()); await check();
      note(await celebrated(), 'the correct category did not celebrate after the wrong attempt');

      const firsts = [];
      for (const id of bare.slice(0, 5)) { await force(id); firsts.push(await firstCardText()); }
      note(new Set(firsts).size >= 2, `the first card is identical across rounds (${firsts.join(' / ')}) — cards not shuffled`);

      await force(bare[bare.length - 1]);
      const cw = await correctId();
      await tap(cw); note(await page.evaluate(() => window.OliveKindOfActivity.sel != null), 'first tap did not select');
      await tap(cw); note(await page.evaluate(() => window.OliveKindOfActivity.sel == null), 'second tap did not deselect');

      for (const w of [280, 360, 412, 768]) {
        await page.setViewport({ width: w, height: 820 });
        await force(bare[0]);
        const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
        note(over <= 2, `overflow ${over}px at ${w}px`);
      }
      await page.setViewport({ width: 412, height: 900 });

      note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
      const bad = fails.filter((f) => f.startsWith(`[${loc}]`)).length;
      console.log(`  ${bad ? 'FAIL' : 'ok  '} olive-kind-of/${loc} — "${title}"`);
    } catch (e) {
      fails.push(`[${loc}] ` + e.message);
      console.log(`  FAIL olive-kind-of/${loc} — ${e.message}`);
    } finally { await page.close(); }
  }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`OLIVE-KIND-OF LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach((f) => console.error('  • ' + f));
    process.exit(1);
  }
  console.log(`OLIVE-KIND-OF LOCAL TEST PASSED (${LOCALES.join(' + ')}) — picture + clue + 3 category cards; picture loads; the title matches the shipped strings table; the container never announces the raw "instruction" token; the correct category celebrates; a wrong pick shows try-again AND marks exactly the tapped card, without marking any card correct; cards shuffle; tap-to-deselect; ≥8 distinct + reshuffle; no overflow 280→768.`);
  process.exit(0);
})().catch((e) => { console.error('ERROR:', e.message); process.exit(1); });
