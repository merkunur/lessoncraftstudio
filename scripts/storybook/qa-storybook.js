#!/usr/bin/env node
/* =====================================================================
   qa-storybook.js — the storybook definition-of-done gate (puppeteer).

   Serves mini tools/ + image-library-webp locally (no deploy needed),
   loads /mini-tools/storybook.html?activity=storybook.<id>&debug=1, and:

   Per viewport (360 / 768 / 1024 / 1366) × every page of the story:
     - waits for the page's interaction host, screenshots the stage
     - GATES: zero console errors · no horizontal overflow · every visible
       button >= 43px (both dimensions) on the smallest viewport ·
       page advances via the autoSolve seam · story completes ·
       keepsake granted (localStorage lcs.games.collection.v1)
   Plus one reduced-motion pass (emulated) at 768 to exercise the static
   paths end to end.

   Screenshots → docs/audit-results/storybook/qa/<story>/
   USAGE: node scripts/storybook/qa-storybook.js --story=pips-picnic
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');
const { driveGesture } = require('./lib/touch-driver.js');
const TOUCH_KINDS = ['path', 'taps', 'drops'];

const REPO = path.join(__dirname, '..', '..');
const MINI = path.join(REPO, 'mini tools');

/* modules that opt into the imprecise-touch QA seam (qaGesture) — the pre-school
   fine-motor family. A story using any of these gets the extra Gate-4 touch passes. */
const TOUCH_MODULES = ['sb-trace', 'sb-maze'];
const arg = (k, d) => {
  const eq = process.argv.find(a => a.startsWith('--' + k + '='));
  return eq ? eq.split('=').slice(1).join('=') : d;
};
const STORY = arg('story', 'pips-picnic');
const OUTDIR = path.join(REPO, 'docs', 'audit-results', 'storybook', 'qa', STORY);
const VIEWPORTS = [360, 768, 1024, 1366];

/* Which pages carry an interaction (from story.json). Narrative-only pages
   (real storybooks have them — opener/closer prose pages) auto-advance after
   narration; QA must not demand an interaction host there. */
const STORY_JSON = (() => {
  try { return JSON.parse(fs.readFileSync(path.join(MINI, 'stories', STORY, 'story.json'), 'utf8')); }
  catch (e) { return null; }
})();
const HAS_INTERACTION = ((STORY_JSON && STORY_JSON.pages) || []).map(
  (pg) => !!(pg.interaction && pg.interaction.moduleType));

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png', '.mp3': 'audio/mpeg', '.svg': 'image/svg+xml' };

function serve() {
  return new Promise(resolve => {
    const srv = http.createServer((req, res) => {
      let p = decodeURIComponent(req.url.split('?')[0]);
      let file = null;
      if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.replace('/mini-tools/', ''));
      else if (p.startsWith('/image-library-webp/')) file = path.join(REPO, p.replace(/^\//, ''));
      else if (p.startsWith('/audio/')) file = path.join(REPO, 'frontend', 'public', p.replace(/^\//, ''));
      if (file && fs.existsSync(file) && fs.statSync(file).isFile()) {
        res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
        fs.createReadStream(file).pipe(res);
      } else { res.writeHead(404); res.end('404 ' + p); }
    });
    srv.listen(0, '127.0.0.1', () => resolve(srv));
  });
}

const failures = [];
const warnings = [];

async function runPass(browser, port, width, reduced) {
  const label = `${width}px${reduced ? ' (reduced-motion)' : ''}`;
  const page = await browser.newPage();
  const consoleErrors = [];
  const BENIGN_404 = /favicon\.ico$|\/audio\/inventory\.json$/;  /* LCSAudio's designed lazy-inventory miss */
  page.on('console', m => {
    if (m.type() !== 'error') return;
    const loc = (m.location() && m.location().url) || '';
    if (BENIGN_404.test(loc)) return;
    consoleErrors.push(m.text() + (loc ? ' [' + loc + ']' : ''));
  });
  page.on('pageerror', e => consoleErrors.push(String(e)));
  page.on('response', r => {
    if (r.status() === 404 && !BENIGN_404.test(r.url())) {
      consoleErrors.push('404: ' + r.url());
    }
  });
  await page.setViewport({ width, height: Math.round(width * 0.8) + 200 });
  if (reduced) await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);

  const url = `http://127.0.0.1:${port}/mini-tools/storybook.html?activity=storybook.${STORY}&lang=en&embed=1&debug=1&sound=off`;
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  await page.waitForFunction('window.SB_PLAYER && window.SB_PLAYER.pageCount() > 0', { timeout: 20000 });
  const pageCount = await page.evaluate('window.SB_PLAYER.pageCount()');

  /* accelerate: keep cancelling narration lines */
  const skipper = setInterval(() => {
    page.evaluate('window.SB_PLAYER.skipNarration && window.SB_PLAYER.skipNarration()').catch(() => {});
  }, 300);

  for (let i = 0; i < pageCount; i++) {
    const interactive = HAS_INTERACTION.length ? HAS_INTERACTION[i] !== false : true;
    try {
      if (interactive) {
        await page.waitForFunction(
          `window.SB_PLAYER.pageIndex() === ${i} && window.SB_PLAYER.host && window.SB_PLAYER.host() !== null`,
          { timeout: 30000 });
      } else {
        /* narrative-only page: no host ever mounts; it auto-advances after
           narration — just reach (or pass) it */
        await page.waitForFunction(`window.SB_PLAYER.pageIndex() >= ${i}`, { timeout: 30000 });
      }
    } catch (e) {
      failures.push(interactive
        ? `[${label}] page ${i}: never mounted its interaction host`
        : `[${label}] page ${i}: narrative page never reached`);
      break;
    }
    /* let the stage paint, then screenshot (short beat on narrative pages —
       they auto-advance under the narration skipper) */
    await new Promise(r => setTimeout(r, interactive ? (reduced ? 350 : 800) : 120));
    const shot = path.join(OUTDIR, `${reduced ? 'rm-' : ''}w${width}-p${i + 1}.png`);
    await page.screenshot({ path: shot });

    /* overflow gate */
    const overflow = await page.evaluate(
      'document.documentElement.scrollWidth - document.documentElement.clientWidth');
    if (overflow > 2) failures.push(`[${label}] page ${i + 1}: horizontal overflow ${overflow}px`);

    /* zone-containment gate: module content must stay inside its zone box
       (catches unstyled/oversized boards that never trip document overflow) */
    const zoneSpill = await page.evaluate(() => {
      const z = document.querySelector('.sb-zone');
      if (!z) return null;
      return {
        w: z.scrollWidth - z.clientWidth,
        h: z.scrollHeight - z.clientHeight
      };
    });
    if (zoneSpill && (zoneSpill.w > 14 || zoneSpill.h > 14)) {
      const msg = `[${label}] page ${i + 1}: interaction content spills its zone by ${zoneSpill.w}x${zoneSpill.h}px`;
      /* below 480px the player shows the rotate-device hint — spill there is
         degraded-but-acknowledged territory (warn), not a shippable failure */
      if (width < 480) warnings.push(msg + ' (rotate-hint territory)');
      else failures.push(msg);
    }

    /* tap-target gate (smallest viewport only; visible buttons) */
    if (width === VIEWPORTS[0]) {
      const small = await page.evaluate(() => {
        const bad = [];
        document.querySelectorAll('button').forEach(b => {
          const r = b.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) return;           /* hidden */
          const cs = getComputedStyle(b, '::after');
          const inflated = cs && cs.content !== 'none' && cs.content !== 'normal';
          if (!inflated && (r.width < 43 || r.height < 43)) {
            bad.push((b.className || b.tagName) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height));
          }
        });
        return bad;
      });
      for (const s of small) warnings.push(`[${label}] page ${i + 1}: small tap target ${s}`);
    }

    /* solve, then TURN THE PAGE like a reader (v3: the book never flips itself —
       page-done pulses the next arrow; QA waits for the pulse and taps next) */
    if (interactive) {
      const solved = await page.evaluate('window.SB_PLAYER.solve()');
      if (!solved) {
        failures.push(`[${label}] page ${i + 1}: autoSolve failed`);
        break;
      }
    }
    try {
      await page.waitForFunction(`document.querySelector('.sb-nav-next.sb-pulse') !== null`, { timeout: 30000 });
    } catch (e) {
      failures.push(`[${label}] page ${i + 1}: never signalled page-done (no next-arrow pulse)`);
      break;
    }
    await page.evaluate('window.SB_PLAYER.next()');
    if (i + 1 < pageCount) {
      try {
        await page.waitForFunction(`window.SB_PLAYER.pageIndex() >= ${i + 1}`, { timeout: 25000 });
      } catch (e) {
        failures.push(`[${label}] page ${i + 1}: did not advance after the page turn`);
        break;
      }
    }
  }

  /* completion + keepsake */
  try {
    await page.waitForSelector('.sb-complete', { timeout: 25000 });
    await page.screenshot({ path: path.join(OUTDIR, `${reduced ? 'rm-' : ''}w${width}-complete.png`) });
    const granted = await page.evaluate(() => {
      try {
        const db = JSON.parse(localStorage.getItem('lcs.games.collection.v1') || '{}');
        return !!(db.earned && db.earned['story.' + '__STORY__'.replace('__STORY__', '')]);
      } catch (e) { return false; }
    });
    const keepsake = await page.evaluate(
      `(function(){try{var db=JSON.parse(localStorage.getItem('lcs.games.collection.v1')||'{}');` +
      `return !!(db.earned&&db.earned['story.${STORY}']);}catch(e){return false;}})()`);
    if (!keepsake) failures.push(`[${label}] keepsake NOT granted on completion`);
  } catch (e) {
    failures.push(`[${label}] story never reached the completion screen`);
  }

  clearInterval(skipper);
  if (consoleErrors.length) {
    for (const c of consoleErrors.slice(0, 6)) failures.push(`[${label}] console error: ${c.slice(0, 220)}`);
  }
  await page.close();
}

/* ---- Gate 4: imprecise-touch pass (pre-school fine-motor modules) ----
   Drives a REAL jittered pointer gesture per touch-page.
   mode 'pass'  → wobbly-but-correct trace (0.55*tol jitter + a mid-drag lift) MUST complete.
   mode 'fail'  → off-band trace (1.6*tol) must NOT falsely complete AND must leave the
                  page answerable (a follow-up solve still succeeds → no dead state). */
async function runTouchPass(browser, port, mode) {
  const label = `touch-${mode}`;
  const page = await browser.newPage();
  const consoleErrors = [];
  const BENIGN_404 = /favicon\.ico$|\/audio\/inventory\.json$/;
  page.on('console', m => { if (m.type() === 'error') { const loc = (m.location() && m.location().url) || ''; if (!BENIGN_404.test(loc)) consoleErrors.push(m.text()); } });
  page.on('pageerror', e => consoleErrors.push(String(e)));
  await page.setViewport({ width: 768, height: 900 });
  const url = `http://127.0.0.1:${port}/mini-tools/storybook.html?activity=storybook.${STORY}&lang=en&embed=1&debug=1&sound=off`;
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction('window.SB_PLAYER && window.SB_PLAYER.pageCount() > 0', { timeout: 20000 });
  const pageCount = await page.evaluate('window.SB_PLAYER.pageCount()');
  const skipper = setInterval(() => { page.evaluate('window.SB_PLAYER.skipNarration && window.SB_PLAYER.skipNarration()').catch(() => {}); }, 300);

  /* v3 helper: wait for page-done (the next-arrow pulse), then turn the page */
  async function turnPage(i) {
    await page.waitForFunction(`document.querySelector('.sb-nav-next.sb-pulse') !== null`, { timeout: 30000 });
    await page.evaluate('window.SB_PLAYER.next()');
    if (i + 1 < pageCount) {
      await page.waitForFunction(`window.SB_PLAYER.pageIndex() >= ${i + 1}`, { timeout: 25000 });
    }
  }

  for (let i = 0; i < pageCount; i++) {
    const interactive = HAS_INTERACTION.length ? HAS_INTERACTION[i] !== false : true;
    if (!interactive) {
      /* narrative-only page: read, then the reader turns it */
      try { await turnPage(i); }
      catch (e) { failures.push(`[${label}] page ${i + 1}: narrative page did not turn`); break; }
      continue;
    }
    try {
      await page.waitForFunction(
        `window.SB_PLAYER.pageIndex() === ${i} && window.SB_PLAYER.host && window.SB_PLAYER.host() !== null`,
        { timeout: 30000 });
    } catch (e) { failures.push(`[${label}] page ${i + 1}: never mounted its interaction host`); break; }

    const gesture = await page.evaluate('window.SB_PLAYER.qaGesture ? window.SB_PLAYER.qaGesture() : null');
    if (!gesture || TOUCH_KINDS.indexOf(gesture.kind) < 0) {
      /* non-touch page — solve, then turn, so the traversal reaches the touch pages */
      const solved = await page.evaluate('window.SB_PLAYER.solve()');
      if (!solved) { failures.push(`[${label}] page ${i + 1}: could not advance a non-touch page`); break; }
      try { await turnPage(i); } catch (e) { failures.push(`[${label}] page ${i + 1}: did not turn`); break; }
      continue;
    }

    /* wait for start(): the inert pointer-blocker is removed + the module enabled */
    try { await page.waitForFunction(() => !document.querySelector('.sb-zone-blocker'), { timeout: 15000 }); }
    catch (e) { failures.push(`[${label}] page ${i + 1}: interaction never started (blocker stayed)`); break; }
    await new Promise(r => setTimeout(r, 250));

    const zoneRect = await page.evaluate(() => { const z = document.querySelector('.sb-zone'); if (!z) return null; const r = z.getBoundingClientRect(); return { left: r.left, top: r.top, width: r.width, height: r.height }; });
    if (!zoneRect) { failures.push(`[${label}] page ${i + 1}: no .sb-zone to drive`); break; }

    await driveGesture(page, gesture, zoneRect, { mode, seed: 7 + i, lift: mode === 'pass' });

    if (mode === 'pass') {
      try {
        /* success now signals via the page-done pulse (the reader turns the page) */
        await page.waitForFunction(`document.querySelector('.sb-nav-next.sb-pulse') !== null`, { timeout: 9000 });
      } catch (e) { failures.push(`[${label}] page ${i + 1}: wobbly-but-correct trace did NOT complete (band too tight or gate too strict for a 3-5yo)`); break; }
      try { await turnPage(i); } catch (e) { failures.push(`[${label}] page ${i + 1}: did not turn after the trace`); break; }
    } else {
      await new Promise(r => setTimeout(r, 1400));
      const state = await page.evaluate('({ idx: window.SB_PLAYER.pageIndex(), done: !!(document.querySelector(".sb-complete") || document.querySelector(".sb-nav-next.sb-pulse")) })');
      if (state.idx > i || state.done) { failures.push(`[${label}] page ${i + 1}: OFF-band trace FALSELY completed`); break; }
      const solved = await page.evaluate('window.SB_PLAYER.solve()');
      if (!solved) { failures.push(`[${label}] page ${i + 1}: DEAD STATE — not answerable after a bad trace`); break; }
      try { await turnPage(i); } catch (e) { failures.push(`[${label}] page ${i + 1}: did not recover-advance after a bad trace`); break; }
    }
  }

  clearInterval(skipper);
  if (consoleErrors.length) for (const c of consoleErrors.slice(0, 4)) failures.push(`[${label}] console error: ${c.slice(0, 200)}`);
  await page.close();
}

(async () => {
  fs.mkdirSync(OUTDIR, { recursive: true });
  const srv = await serve();
  const port = srv.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--mute-audio'] });

  for (const w of VIEWPORTS) await runPass(browser, port, w, false);
  await runPass(browser, port, 768, true);           /* reduced-motion pass */

  /* Gate 4 — imprecise-touch, only when the story uses a fine-motor touch module */
  let touchStory = false;
  try {
    const sj = fs.readFileSync(path.join(MINI, 'stories', STORY, 'story.json'), 'utf8');
    touchStory = TOUCH_MODULES.some(m => sj.includes('"' + m + '"'));
  } catch (e) {}
  if (touchStory) {
    await runTouchPass(browser, port, 'pass');
    await runTouchPass(browser, port, 'fail');
  }

  await browser.close();
  srv.close();

  for (const w of warnings) console.log('  WARN  ' + w);
  for (const f of failures) console.log('  FAIL  ' + f);
  console.log(`\n[qa-storybook] ${STORY}: ${failures.length} failure(s), ${warnings.length} warning(s)`);
  console.log('  screenshots: ' + path.relative(REPO, OUTDIR));
  process.exit(failures.length ? 1 : 0);
})().catch(e => { console.error('[qa-storybook] crashed: ' + e.stack); process.exit(1); });
