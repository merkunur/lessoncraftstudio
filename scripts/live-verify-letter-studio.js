#!/usr/bin/env node
/* =====================================================================
   live-verify-letter-studio.js — PRODUCTION, after a deploy.

   ⭐ IT DRIVES THE MAIN CONTROL, IT DOES NOT CHECK THAT THE TOOL MOUNTS.
   "It renders" is the assertion that lets a tool ship with its central
   verb broken: #41's flag was asserted by eleven scripts as
   `!!querySelector` and shipped INVISIBLE, because not one of them ever
   touched it with a pointer. So this file traces a letter on the live
   site with real pointer events and asserts the thing the operator
   actually reported:

       trace 60% of a stroke and lift  -> the letter must NOT be finished
       trace 100% and lift             -> it must be

   Before the rebuild the tool drew 36.2% of every stroke for the child
   and 14 strokes completed from a single tap. That is what this proves is
   gone, on the bytes a teacher is actually served.

   ⚠ AND IT CHECKS BOTH SURFACES. The tool page pins its iframe at 704px
   from 1024 upward, so the embed is the only width a desktop teacher
   ever sees — and a defect that lives there is invisible to a standalone
   render. #41 shipped because both its QA renders were taken standalone.

   ⚠ CACHE. Cloudflare holds mini-tool bytes for 5 minutes (§15.8). A
   run straight after a deploy can measure the OLD file and report a
   green that means nothing, so this asserts the served md5 matches the
   repo BEFORE it asserts anything about behaviour, and says plainly when
   it does not.

   usage:  node scripts/live-verify-letter-studio.js [--locale=de]
   ===================================================================== */
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');
const puppeteer = require('puppeteer');

const HOST = 'https://www.lessoncraftstudio.com';
const ROOT = path.join(__dirname, '..', 'mini tools');
const ONLY = (process.argv.find((a) => a.startsWith('--locale=')) || '').split('=')[1];
const LOCALES = ONLY ? [ONLY] : ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

let pass = 0, fail = 0;
function ok(label, cond, extra) {
  if (cond) { pass++; console.log('  ok    ' + label); }
  else { fail++; console.log('  FAIL  ' + label + (extra ? '  ' + extra : '')); }
}
function head(s) { console.log('\n[' + s + ']'); }

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve({ status: res.statusCode, body: Buffer.concat(chunks) }));
    }).on('error', reject);
  });
}
const md5 = (b) => crypto.createHash('md5').update(b).digest('hex');
const slugOf = (loc) => require(path.join(__dirname, '..', 'frontend', 'messages',
  'tool-content', loc + '.json'))['letter-studio'].slug;

(async () => {
  console.log('=== live-verify-letter-studio — ' + HOST + ' ===');

  /* ---------- A. the served bytes ARE the repo's bytes ---------- */
  head('A  what production is actually serving');
  /* ⚠⚠ FETCH THE URL THE WRAPPER ASKS FOR, NOT THE BARE ONE.
     Every script tag carries a `?v=N` cache-buster, so `?v=9` and the
     bare path are DIFFERENT cache keys at the edge — and no browser ever
     requests the bare one. My first version checked the bare path,
     found Cloudflare's old cached copy, and reported a deploy as stale
     twice when every URL a teacher's browser actually loads was already
     correct. Parse the wrapper and ask for exactly what it asks for. */
  const wrapper = await get(HOST + '/mini-tools/letter-studio.html');
  const wrapperLocal = md5(fs.readFileSync(path.join(ROOT, 'letter-studio.html')));
  let stale = 0;
  {
    /* ⚠⚠ THE HTML CAN NEVER MD5-MATCH, AND ASSERTING IT COULD ONLY EVER
       FAIL. Cloudflare appends its own challenge-platform script to every
       HTML response, carrying a PER-REQUEST token — so three consecutive
       fetches gave three different digests and none of them could equal
       the repo's. An assertion that cannot pass is exactly as useless as
       one that cannot fail, and I shipped one of each today.
       The honest question is whether everything the repo wrote is
       PRESENT: Cloudflare only ever appends. */
    const lf = (t) => t.split('\r\n').join('\n');
    const servedTxt = lf(wrapper.body.toString());
    const repoTxt = lf(fs.readFileSync(path.join(ROOT, 'letter-studio.html'), 'utf8'));
    const repoLines = repoTxt.split('\n').map((l) => l.trim()).filter((l) => l.length > 3);
    const missing = repoLines.filter((l) => servedTxt.indexOf(l) < 0);
    ok(`the wrapper the repo wrote is present in full (${repoLines.length} lines, ${missing.length} missing)`,
       wrapper.status === 200 && missing.length === 0, missing[0] || '');
    if (missing.length) stale++;
    /* and nothing unexpected precedes it — Cloudflare appends, it does not rewrite */
    ok('the served wrapper still opens with the doctype the repo wrote',
       servedTxt.trim().slice(0, 60).indexOf('<!DOCTYPE html>') === 0);
  }
  const refs = (wrapper.body.toString().match(/\/mini-tools\/[a-z0-9-]+\.js\?v=\d+/g) || []);
  ok(`the wrapper references ${refs.length} scripts — non-vacuity before checking any of them`, refs.length >= 4);
  for (const url of refs) {
    const f = url.replace('/mini-tools/', '').replace(/\?.*/, '');
    const local = path.join(ROOT, f);
    if (!fs.existsSync(local)) continue;             /* lcs-shell etc. live here too */
    const r = await get(HOST + url);
    const served = md5(r.body), want = md5(fs.readFileSync(local));
    const same = r.status === 200 && served === want;
    if (!same) stale++;
    ok(`${url} — the URL the wrapper asks for — matches the repo`, same,
       `(http ${r.status}, served ${served.slice(0, 8)} vs repo ${want.slice(0, 8)})`);
  }
  if (stale) {
    console.log('\n  ⚠ ' + stale + ' file(s) stale. Cloudflare holds mini-tool bytes for 5 minutes,');
    console.log('    and the cp step must run BEFORE deploy.sh builds (CLAUDE.md §20.4).');
    console.log('    Everything below would be measuring the OLD tool — stopping.');
    process.exit(1);
  }

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  /* ---------- B. THE COMPLAINT, on the live bytes ---------- */
  head('B  the reported defect — driven with a real pointer, on production');
  {
    const p = await browser.newPage();
    await p.setViewport({ width: 704, height: 1000 });
    await p.goto(`${HOST}/mini-tools/letter-studio.html?lang=en&embed=1`, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 2200));

    /* `l` — one straight stroke, so "60% of it" is unambiguous */
    await p.evaluate(() => {
      const T = window.LetterStudio, k = T.keys();
      for (let i = 0; i < k.length; i++) if (k[i].g === 'l') { T.index = i; break; }
      T.seq = null; T._reset(); T.render();
    });
    await new Promise((r) => setTimeout(r, 600));

    const geo = await p.evaluate(() => {
      const sv = document.querySelector('.ls-svg'), r = sv.getBoundingClientRect();
      return { r: { x: r.x, y: r.y, w: r.width, h: r.height }, stroke: window.LetterStudio._glyph('l')[0] };
    });
    const toPx = (pt) => ({ x: geo.r.x + (pt.x / 100) * geo.r.w,
                            y: geo.r.y + ((pt.y - 2) / 98) * geo.r.h });
    const drag = async (frac) => {
      await p.evaluate(() => { window.LetterStudio._reset(); window.LetterStudio.render(); });
      await new Promise((r) => setTimeout(r, 250));
      const st = geo.stroke, a = st[0], z = st[st.length - 1], n = 60;
      const p0 = toPx(a);
      await p.mouse.move(p0.x, p0.y); await p.mouse.down();
      for (let i = 1; i <= Math.round(n * frac); i++) {
        const t = i / n;
        const q = toPx({ x: a.x + (z.x - a.x) * t, y: a.y + (z.y - a.y) * t });
        await p.mouse.move(q.x, q.y);
      }
      await p.mouse.up();
      await new Promise((r) => setTimeout(r, 220));
      return p.evaluate(() => !!(window.LetterStudio.trace && window.LetterStudio.trace.formed));
    };

    ok('tracing 60% of the stroke does NOT finish the letter', (await drag(0.60)) === false);
    ok('tracing 90% of the stroke does NOT finish the letter', (await drag(0.90)) === false);
    ok('tracing ALL of it DOES finish the letter', (await drag(1.00)) === true);
    await p.close();
  }

  /* ---------- C. the picker, which is what the landing page promises ---------- */
  head('C  a teacher can reach any letter in one tap');
  {
    const p = await browser.newPage();
    await p.setViewport({ width: 704, height: 1000 });
    await p.goto(`${HOST}/mini-tools/letter-studio.html?lang=de&embed=1`, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 2200));
    const before = await p.evaluate(() => document.querySelector('.ls-svg').getAttribute('aria-label'));
    await p.evaluate(() => {
      const k = [...document.querySelectorAll('.ls-key')].find((x) => x.textContent === 'm');
      if (k) k.click();
    });
    await new Promise((r) => setTimeout(r, 900));
    const after = await p.evaluate(() => ({
      label: document.querySelector('.ls-svg').getAttribute('aria-label'),
      cur: (document.querySelector('.ls-key.ls-cur') || {}).textContent,
      keys: document.querySelectorAll('.ls-key').length,
      digits: [...document.querySelectorAll('.ls-key')].filter((x) => /^[0-9]$/.test(x.textContent)).length
    }));
    ok('tapping a picker key changes the letter on the sheet', before !== after.label, `${before} -> ${after.label}`);
    ok('the tapped key becomes current', after.cur === 'm');
    ok('the digits are in the picker, not a separate mode', after.digits === 10);
    ok('the German tray reaches the picker (30 letters + 7 digraphs + 10 digits)', after.keys >= 40, String(after.keys));
    await p.close();
  }

  /* ---------- D. the paywall, from the outside ---------- */
  head('D  a free visitor cannot reach the paid sheet');
  {
    const p = await browser.newPage();
    await p.setViewport({ width: 1024, height: 900 });
    await p.goto(`${HOST}/mini-tools/letter-studio.html?lang=en&embed=1`, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 2200));
    await p.emulateMediaType('print');
    const free = await p.evaluate(() => ({
      sheet: document.querySelectorAll('.ls-psheet').length,
      css: !!document.getElementById('ls-print-style'),
      paid: document.body.classList.contains('ls-paid')
    }));
    ok('no print sheet exists in the DOM for a free visitor', free.sheet === 0);
    ok('the print stylesheet is not injected at all — Ctrl+P leaks nothing', !free.css);
    ok('the paid body class is absent', !free.paid);
    await p.close();
  }

  /* ---------- E. every locale, on the surface a teacher uses ---------- */
  head('E  all 11 locales, inside the tool page as it really embeds');
  /* ⚠ A FRESH BROWSER PER LOCALE — the house pattern, and it is here for a
     measured reason. Sharing one browser across eleven heavy SSR pages
     made the ELEVENTH fail every run while passing on its own: resource
     accumulation, not a defect in Finnish. A gate that fails by position
     rather than by content teaches you to distrust it. */
  for (const loc of LOCALES) {
    const lb = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const p = await lb.newPage();
    const errs = [];
    p.on('pageerror', (e) => errs.push(e.message));
    await p.setViewport({ width: 1366, height: 1000 });
    /* the tool pages are heavy SSR routes behind the CDN; networkidle0 at
       the default 30s timed out on the first cold locale and CRASHED the
       whole run, taking sections A-D's passes with it. A crash is not a
       failure and must not be able to erase results already earned. */
    p.setDefaultNavigationTimeout(90000);
    try {
      /* ⚠⚠ THE TOOL PAGE USES EACH LOCALE'S NATIVE SLUG, NOT THE KEY.
         `/de/tools/letter-studio` is a 404; the real URL is
         `/de/tools/buchstaben-nachspuren`. Hard-coding the key made this
         gate report TEN locales broken on a site where all eleven serve
         200 — the sixth time today a wrong measurement produced a
         confident false defect. Read the slug the route actually
         publishes. */
      await p.goto(`${HOST}/${loc}/tools/${slugOf(loc)}`, { waitUntil: 'domcontentloaded' });
    } catch (e) {
      ok(`${loc}: the tool page loads`, false, String(e.message).slice(0, 80));
      await p.close();
      continue;
    }
    await new Promise((r) => setTimeout(r, 2600));
    const r = await p.evaluate(async () => {
      const f = document.querySelector('iframe');
      if (!f) return { noIframe: true };
      return { w: Math.round(f.getBoundingClientRect().width), h: Math.round(f.getBoundingClientRect().height) };
    });
    let inner = {};
    /* ⚠ A FLAKY GATE IS BARELY BETTER THAN A WRONG ONE. Running all eleven
       in sequence, the LAST page reported no iframe while the same locale
       passed on its own — the tool page lazy-loads it, and the browser is
       under load by then. Wait for it rather than sampling once. */
    try { await p.waitForSelector('iframe', { timeout: 25000 }); } catch (_) {}
    const r2 = await p.evaluate(() => {
      const f = document.querySelector('iframe');
      return f ? { w: Math.round(f.getBoundingClientRect().width) } : { noIframe: true };
    });
    if (r.noIframe && !r2.noIframe) { r.noIframe = false; r.w = r2.w; }
    if (!r.noIframe) {
      const fh = await p.$('iframe');
      const frame = await fh.contentFrame();
      await new Promise((x) => setTimeout(x, 1500));
      inner = await frame.evaluate(() => ({
        road: document.querySelectorAll('.ls-road').length,
        rule: document.querySelectorAll('.ls-rule').length,
        keys: document.querySelectorAll('.ls-key').length,
        dot: document.querySelectorAll('.ls-startdot').length,
        title: (document.querySelector('.lcs-title') || {}).textContent || '',
        raw: /\b(a11y[A-Z]|gateNames|setVoice)\b/.test(document.body.innerText)
      }));
    }
    const good = !r.noIframe && inner.road >= 1 && inner.rule >= 3 && inner.keys >= 30
                 && inner.dot === 1 && !inner.raw && errs.length === 0;
    ok(`${loc}: the tool renders in the tool page (iframe ${r.w}px, ${inner.keys} keys, ${inner.rule} ruling lines, "${(inner.title || '').slice(0, 24)}")`,
       good, errs[0] || (inner.raw ? 'RAW KEY LEAK' : ''));
    await p.close();
    await lb.close();
  }

  await browser.close();
  console.log(`\n${fail === 0 ? 'PASS' : 'FAIL'}  ${pass} passed, ${fail} failed`);
  process.exit(fail === 0 ? 0 : 1);
})().catch((e) => { console.error('\nCRASHED: ' + e.message); process.exit(1); });
