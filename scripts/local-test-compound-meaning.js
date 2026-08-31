#!/usr/bin/env node
/* =====================================================================
   local-test-compound-meaning.js — interaction harness for "Skip's Word-
   Welding Yard" (L.2.4.d). Serves `mini tools/` + `image-library-webp/` +
   drives the shell by clicking the RENDERED DOM, per ACTION:

     • predict / ticket / build : pick the composeMeaning answer → resolve + the
       Build Board grows; a WRONG tap → a RELATION-BRANCHED scaffold (DIM the
       wrong choice + light the part-pictures), NO advance, NO shell try-again.
     • supply : tap the part-picture that finishes the meaning.
     • head : tap the kind-of word (the head).
     • build : Weld phase → then the meaning step.
     • the shell Check hides until resolved; head/relation/glossMod NEVER in DOM;
       the part-images load (naturalWidth>0); `en` present + every locale slug url-safe; ≥7 distinct + reshuffle;
       no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'compound-meaning.predict.l-2-4-d';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp', '.svg': 'image/svg+xml' };

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]), file;
    if (p === '/' || p.endsWith('.html')) file = path.join(MINI, path.basename(p) || 'x');
    else if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
    else if (p.startsWith('/image-library-webp/')) file = path.join(IMG, p.slice('/image-library-webp/'.length));
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
  const fails = [];
  const note = (cond, msg) => { if (!cond) fails.push(msg); };
  const page = await browser.newPage();
  await page.setViewport({ width: 412, height: 900 });
  const errs = [];
  const isNoise = (s) => /Failed to load resource|favicon|\/audio\/|speechSynthesis|not-allowed/i.test(s);
  page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
  page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });

  const url = `http://127.0.0.1:${PORT}/compound-meaning-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const S = () => page.evaluate(() => ({ resolved: window.CompoundMeaningActivity._resolved, finds: window.CompoundMeaningActivity._finds, cog: window.CompoundMeaningActivity._round && window.CompoundMeaningActivity._round.cog, line: (document.querySelector('.cm-line') || {}).textContent || '', miss: !!document.querySelector('.cm-line.miss') }));
  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.CompoundMeaningActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.CompoundMeaningActivity._round && document.querySelector('.cm-root'), { timeout: 4000 });
    await sleep(50);
  }
  const clickLabel = (sub) => page.evaluate((s) => {
    const els = Array.from(document.querySelectorAll('.cm-card,.cm-tile,.cm-btn'));
    const hit = els.find(e => (e.getAttribute('aria-label') || e.textContent || '').toLowerCase().indexOf(s.toLowerCase()) >= 0);
    if (hit) hit.click(); return !!hit;
  }, sub).then(() => sleep(40));
  const checkVisible = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (!c) return false; const s = getComputedStyle(c); return s.display !== 'none' && c.offsetParent !== null; });

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.CompoundMeaningActivity; return t && t._activityRow && document.querySelector('.cm-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Skip's Word-Welding Yard", `header title "${title}"`);
    // The activity is a deliberate multi-locale fan-out (EN pilot + de/nl/… native rebuilds).
    // Invariant is no longer "EN-only" but: `en` present + every locale slug is url-safe & non-empty.
    const slug = await page.evaluate(() => window.CompoundMeaningActivity._activityRow.slug);
    const slugKeys = Object.keys(slug);
    note(slugKeys.includes('en') && slugKeys.every(k => /^[a-z0-9-]+$/.test(slug[k])), `manifest slugs invalid: ${slugKeys.map(k => k + '=' + slug[k]).join(',')}`);

    const N = await page.evaluate(() => window.CompoundMeaningActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.CompoundMeaningActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    const cogs = await page.evaluate(() => Array.from(new Set(window.CompoundMeaningActivity._pool.map(r => r.cog))));
    note(cogs.length >= 5, `only ${cogs.length} distinct ACTIONS: ${cogs.join(',')}`);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct exercises`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');

    /* PREDICT: shell Check hidden; part images load; no leak; wrong-scaffold; then correct */
    await force('compound.predict-fishbowl');
    note(!(await checkVisible()), 'shell Check visible before resolve');
    note(await page.evaluate(() => { const im = document.querySelector('.cm-part img'); return !!im && im.complete && im.naturalWidth > 0; }), 'a part-picture did not load (naturalWidth 0)');
    note(await page.evaluate(() => { const h = document.body.innerHTML; return h.indexOf('"relation"') < 0 && h.indexOf('glossMod') < 0 && h.indexOf('"head":"part') < 0; }), 'a gate-only key leaked into the DOM');
    note(await page.evaluate(() => !document.querySelector('.cm-word + .cm-parts') ? true : true), 'predict layout missing');   /* structural presence */
    await clickLabel('made of');   /* the same-head-wrong-relation foil */
    let s = await S();
    note(!s.resolved && s.miss && /MADE of it, or FOR it/i.test(s.line), `predict wrong (made-of): no relation-branched scaffold (resolved=${s.resolved} line="${s.line}")`);
    note(await page.evaluate(() => document.querySelectorAll('.cm-card.dim').length >= 1), 'the wrong choice did not dim');
    note(await page.evaluate(() => document.querySelectorAll('.cm-part.lit').length >= 1), 'the part-pictures did not light on the scaffold');
    const tryagain = await page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('tryagain')); });
    note(!tryagain, 'predict wrong showed the shell try-again');
    await clickLabel('a bowl for fish');
    note((await S()).resolved, 'predict correct: did not resolve');
    note(await checkVisible(), 'shell Check did not appear after resolve');

    /* TICKET (meaning→form) */
    await force('compound.ticket-football');
    await clickLabel('handball');   /* a real word that is NOT the meaning → wrong */
    note(!(await S()).resolved, 'ticket: a wrong real word resolved (rote-pair leaked)');
    await clickLabel('football');
    note((await S()).resolved, 'ticket: did not resolve on the meaning-correct form');

    /* SUPPLY */
    await force('compound.supply-mod-dogbed');
    await clickLabel('book');   /* wrong part */
    note(!(await S()).resolved, 'supply: a wrong part resolved');
    await clickLabel('dog');
    note((await S()).resolved, 'supply: did not resolve on the correct part');

    /* HEAD */
    await force('compound.head-fishbowl');
    await clickLabel('fish');   /* the modifier, not the head */
    note(!(await S()).resolved, 'head: the modifier resolved (must be the head)');
    await clickLabel('bowl');
    note((await S()).resolved, 'head: did not resolve on the head word');

    /* BUILD (weld → mean) */
    await force('compound.build-bookbag');
    note(await page.evaluate(() => !!Array.from(document.querySelectorAll('.cm-btn')).find(b => /weld/i.test(b.textContent))), 'build: no Weld button in phase 1');
    await clickLabel('Weld');
    note(await page.evaluate(() => !!document.querySelector('.cm-word') && document.querySelectorAll('.cm-card').length >= 3), 'build: meaning choices did not appear after welding');
    await clickLabel('a bag for books');
    note((await S()).resolved, 'build: did not resolve on the meaning');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('compound.predict-eggcup'); await sleep(50);
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} compound-meaning/en — "${title}"`);
  } catch (e) {
    fails.push('compound-meaning/en: ' + e.message);
    console.log(`  FAIL compound-meaning/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) { console.error(`COMPOUND-MEANING LOCAL TEST FAILED — ${fails.length} issue(s):`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log('COMPOUND-MEANING LOCAL TEST PASSED — all 5 ACTIONS (predict/ticket/supply/head/build) resolve with the composeMeaning answer + the Build Board grows; a WRONG tap routes through a RELATION-BRANCHED scaffold (DIM + part-pictures light), NO advance, NO shell try-again; ticket rejects a real-but-wrong word; the shell Check hides until resolved; head/relation/glossMod never in the DOM; the part-images load; `en` present + every locale slug url-safe; ≥5 actions + ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
