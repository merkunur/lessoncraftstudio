#!/usr/bin/env node
/* =====================================================================
   probe-pattern-bench-frame.js — MEASURE the iframe box before claiming
   anything about it.

   ⚠ WHY THIS EXISTS AS ITS OWN FILE. The static read is compelling:
   lcs-shell.css:54 `html,body{height:100%}` -> :63-71 `.lcs-app{height:100%;
   overflow:hidden}`, and `.lcs-app.activity{height:auto}` (:285) is the only
   escape — which a manipulative never gets. The shell's ResizeObserver then
   measures `app.getBoundingClientRect()` (lcs-shell.js:949), i.e. the iframe
   measuring ITSELF, and the `< 4` de-dupe at :951 freezes whatever it lands
   on. That reasoning predicts a fixed point at ActivityIframe's
   INITIAL_HEIGHT (420) + 2 = 422.

   But §23.6 is explicit: VERIFY THE MEASUREMENT BEFORE REPORTING THE
   DEFECT — a wrong measurement agreeing with a wrong measurement is how
   two false alarms shipped on #40. And the shell's own comment at :971-982
   asserts the OPPOSITE ("no feedback path exists"), so one of the two is
   wrong and only a number settles it.

   It measures three things at each desktop viewport:
     1. the iframe element's rendered box on the production landing page
     2. the tool's own `.lcs-app` box inside it
     3. whether pattern-bench's three wide-tier media queries EVALUATE

   and compares pattern-bench against sorting-hoops, which sets
   `html,body.hp-wide{height:auto}` UNCONDITIONALLY (:2490) and should
   therefore NOT be pinned. That comparison is the control: if both tools
   report the same box, my causal story is wrong.

   Usage: node scripts/probe-pattern-bench-frame.js [--local]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
const IMGLIB = path.join(ROOT, 'frontend', 'public', 'image-library-webp');
const LOCAL = process.argv.indexOf('--local') > -1;
const BASE = 'https://www.lessoncraftstudio.com';

/* the two tools, and WHY each is here */
const SUBJECTS = [
  { key: 'pattern-bench', slug: 'pattern-bench', cls: 'ptn-wide', wrap: '.ptn-wrap',
    note: 'subject — sets height:auto only under @media(max-width:700px)' },
  { key: 'sorting-hoops', slug: 'sorting-hoops', cls: 'hp-wide', wrap: '.hp-wrap',
    note: 'CONTROL — sets html,body.hp-wide{height:auto} unconditionally' }
];

const VIEWPORTS = [[768, 1000], [1024, 900], [1366, 900], [1920, 1080], [2560, 1440]];
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.html': 'text/html', '.webp': 'image/webp', '.png': 'image/png' };

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function serve() {
  return http.createServer((req, res) => {
    const u = decodeURIComponent(req.url.split('?')[0]);
    const f = u.indexOf('/image-library-webp/') === 0
      ? path.join(IMGLIB, u.slice('/image-library-webp/'.length))
      : path.join(MINI, path.basename(u));
    fs.readFile(f, (e, b) => {
      if (e) { res.writeHead(404); res.end('nf'); return; }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
      res.end(b);
    });
  });
}

/* ⚠ THE POISON. A probe that reports a number is not yet a probe that can
   report the WRONG number. Before trusting the live measurement, prove the
   measurement responds to the thing it claims to measure: load the tool in
   a tall iframe with the percentage chain BROKEN by hand and require a
   different answer. If both come back identical, the probe is measuring
   something else and the run is void. */
async function poison(browser, port) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 900 });

  /* ⚠ THE PARENT IS SERVED FROM THE SAME ORIGIN AS THE TOOL. A data: URL
     parent cannot read an http: iframe (`contentDocument` is null) — the
     first version of this poison died on exactly that, which is itself the
     recorded "a probe that cannot take its measurement must say so"
     lesson. Serving the shell from the harness makes them same-origin, and
     we reach the frame through puppeteer regardless. */
  const measure = async (url) => {
    await page.goto(url, { waitUntil: 'networkidle2' });
    await wait(1600);
    const frame = page.frames().find((f) => f.url().indexOf('pattern-bench.html') > -1);
    if (!frame) return { app: null, body: null };
    return frame.evaluate(() => {
      const a = document.querySelector('.lcs-app');
      return { app: a ? Math.round(a.getBoundingClientRect().height) : null,
               body: Math.round(document.body.getBoundingClientRect().height) };
    });
  };

  /* A: untouched — the percentage chain intact */
  const a = await measure(`http://127.0.0.1:${port}/__probe.html?break=0`);
  /* B: chain broken by hand — html,body height:auto */
  const b = await measure(`http://127.0.0.1:${port}/__probe.html?break=1`);
  await page.close();
  console.log('[poison] percentage chain INTACT  -> .lcs-app ' + a.app + 'px (body ' + a.body + ')');
  console.log('[poison] percentage chain BROKEN  -> .lcs-app ' + b.app + 'px (body ' + b.body + ')');
  if (a.app === null || b.app === null) {
    console.error('  VOID — the tool did not mount in the harness; nothing below is trustworthy');
    return false;
  }
  if (a.app === b.app) {
    console.error('  VOID — breaking the chain changed nothing, so this probe is NOT measuring the chain.');
    console.error('         Do not report the defect from this run.');
    return false;
  }
  console.log('  ok — the probe responds to the mechanism it claims to measure (' +
    a.app + ' -> ' + b.app + ')\n');
  return true;
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const server = serve();
  await new Promise((r) => server.listen(0, r));
  const port = server.address().port;

  const armed = await poison(browser, port);

  if (LOCAL) {
    console.log('=== LOCAL (the tool alone, at its natural size — no iframe) ===');
    for (const s of SUBJECTS) {
      const page = await browser.newPage();
      for (const [w, h] of VIEWPORTS) {
        await page.setViewport({ width: w, height: h });
        await page.goto(`http://127.0.0.1:${port}/${s.key}.html?embed=1`, { waitUntil: 'networkidle2' });
        await page.waitForSelector(s.wrap, { timeout: 9000 }).catch(() => {});
        await wait(400);
        const m = await page.evaluate((wrap) => {
          const app = document.querySelector('.lcs-app');
          const wr = document.querySelector(wrap);
          return { app: app ? Math.round(app.getBoundingClientRect().height) : null,
                   wrapH: wr ? Math.round(wr.getBoundingClientRect().height) : null,
                   wrapW: wr ? Math.round(wr.getBoundingClientRect().width) : null };
        }, s.wrap);
        console.log(`  ${s.key.padEnd(15)} ${String(w).padStart(4)}x${h}  .lcs-app ${String(m.app).padStart(5)}  wrap ${m.wrapW}x${m.wrapH}`);
      }
      await page.close();
    }
    console.log('');
  }

  console.log('=== PRODUCTION (the canonical /tools/ landing, which is what a teacher sees) ===');
  for (const s of SUBJECTS) {
    console.log(`\n[${s.key}]  ${s.note}`);
    for (const [w, h] of VIEWPORTS) {
      const page = await browser.newPage();
      await page.setCacheEnabled(false);
      await page.setViewport({ width: w, height: h });
      try {
        await page.goto(`${BASE}/en/tools/${s.slug}`, { waitUntil: 'networkidle2', timeout: 60000 });
        /* the iframe is hydration-gated */
        let frame = null;
        for (let i = 0; i < 25 && !frame; i++) {
          const el = await page.$('iframe');
          if (el) {
            const f = await el.contentFrame();
            if (f) { try { await f.waitForSelector(s.wrap, { timeout: 1000 }); frame = f; } catch (_) {} }
          }
          if (!frame) await wait(500);
        }
        if (!frame) { console.log(`  ${String(w).padStart(4)}x${h}  — the tool never mounted`); await page.close(); continue; }
        await wait(1200);

        const outer = await page.evaluate(() => {
          const f = document.querySelector('iframe');
          const r = f.getBoundingClientRect();
          return { w: Math.round(r.width), h: Math.round(r.height) };
        });
        /* measured INSIDE the frame: the tool's own box, and whether its
           three shipped wide tiers actually evaluate at this viewport */
        const inner = await frame.evaluate(() => {
          const app = document.querySelector('.lcs-app');
          const q = (s) => window.matchMedia(s).matches;
          return {
            app: app ? Math.round(app.getBoundingClientRect().height) : null,
            appW: app ? Math.round(app.getBoundingClientRect().width) : null,
            innerW: window.innerWidth, innerH: window.innerHeight,
            t1: q('(min-width:1367px) and (min-height:880px)'),
            t2: q('(min-width:1800px) and (min-height:1080px)'),
            t3: q('(min-width:2400px) and (min-height:1150px)'),
            esc: q('(max-width:700px)')
          };
        });
        const tiers = [inner.t1, inner.t2, inner.t3].filter(Boolean).length;
        console.log(`  ${String(w).padStart(4)}x${h}  iframe ${String(outer.w).padStart(4)}x${String(outer.h).padStart(4)}` +
          `  |  inside: viewport ${inner.innerW}x${inner.innerH}  .lcs-app ${inner.appW}x${inner.app}` +
          `  |  wide tiers live: ${tiers}/3   scroll-escape: ${inner.esc ? 'on' : 'OFF'}`);
      } catch (e) {
        console.log(`  ${String(w).padStart(4)}x${h}  ERROR ${e.message.slice(0, 60)}`);
      }
      await page.close();
    }
  }

  console.log('\n' + (armed
    ? 'Probe armed (poison passed). The numbers above are evidence.'
    : 'PROBE VOID — the poison failed. Do not draw conclusions from this run.'));
  await browser.close();
  server.close();
  process.exit(armed ? 0 : 1);
})();
