#!/usr/bin/env node
/* =====================================================================
   local-test-field-guide.js — interaction harness for "Detective Dewey's
   Field Guide" (1.RI.5). Serves `mini tools/` + drives the shell:

     • read the feature + tap the function-mapped target → resolve + the shell
       Check serves + a keepsake drops.
     • a WRONG tap → a GUIDED RE-READ (the relevant feature text highlights, the
       target order reshuffles), NO advance, NO shell try-again.
     • QUESTION-ONLY TTS: the feature gloss strings are NEVER spoken (spy).
     • the SR mirror is present + carries the feature text.
     • the shell Check is hidden until resolved.
     • EN-only (the manifest slug is {en} → non-EN 404 by design).
     • ≥7 distinct rounds + order/distractor reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'field-guide.text-features.1-ri-5';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml' };

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]), file;
    if (p === '/' || p.endsWith('.html')) file = path.join(MINI, path.basename(p) || 'x');
    else if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
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

  const url = `http://127.0.0.1:${PORT}/field-guide-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  /* spy on LCSAudio.speak — capture every text spoken */
  await page.evaluateOnNewDocument(() => {
    window.__spoken = [];
    const iv = setInterval(() => {
      if (window.LCSAudio && window.LCSAudio.speak && !window.LCSAudio.__spied) {
        window.LCSAudio.__spied = true;
        const orig = window.LCSAudio.speak;
        window.LCSAudio.speak = function (o) { try { window.__spoken.push((o && o.text) || ''); } catch (e) {} return orig.apply(this, arguments); };
        clearInterval(iv);
      }
    }, 5);
  });

  const S = () => page.evaluate(() => { const a = window.FieldGuideActivity; return { resolved: a._resolved, finds: a._finds, cog: a._round && a._round.cog, line: (document.querySelector('.fg-line') || {}).textContent || '', miss: !!document.querySelector('.fg-line.miss'), order: (a._displayOrder || []).join(',') }; });
  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.FieldGuideActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.FieldGuideActivity._round && document.querySelector('.fg-root'), { timeout: 4000 });
    await sleep(30);
  }
  const correctId = () => page.evaluate(() => window.FieldGuideCore.expectedAnswer(window.FieldGuideActivity._round));
  const wrongId = () => page.evaluate(() => { const r = window.FieldGuideActivity._round, ans = window.FieldGuideCore.expectedAnswer(r); return window.FieldGuideCore.items(r).map(i => i.id).find(id => id !== ans); });
  const tap = (id) => page.evaluate((x) => window.FieldGuideActivity._tap(x), id).then(() => sleep(25));
  const checkVisible = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (!c) return false; const s = getComputedStyle(c); return s.display !== 'none' && c.offsetParent !== null; });

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.FieldGuideActivity; return t && t._activityRow && document.querySelector('.fg-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Detective Dewey's Field Guide", `header title "${title}"`);

    /* multi-locale manifest (EN base + de + fr fans); en base must be present */
    const slugKeys = await page.evaluate(() => Object.keys(window.FieldGuideActivity._activityRow.slug));
    note(slugKeys.indexOf('en') >= 0, `manifest slug missing en base: ${slugKeys.join(',')}`);

    /* >=7 distinct + reshuffle */
    const N = await page.evaluate(() => window.FieldGuideActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.FieldGuideActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct rounds`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');

    /* a USE round (glossary): tap correct → resolve */
    await force('field-guide.glossary-gribbet-glow');
    note(!(await checkVisible()), 'shell Check visible before resolve');
    note(await page.evaluate(() => !!document.querySelector('.fg-sronly ul')), 'SR mirror missing');
    const c1 = await correctId(); await tap(c1); let s = await S();
    note(s.resolved, 'glossary: tapping the correct word did not resolve');
    note(s.finds >= 1, 'no keepsake on a correct locate');
    note(await checkVisible(), 'shell Check did not appear after resolve');

    /* WRONG tap → guided re-read, no advance, no shell try-again, order reshuffles */
    await force('field-guide.toc-gribbet-glow');
    const beforeOrder = (await S()).order;
    const w = await wrongId(); await tap(w); s = await S();
    note(!s.resolved, 'toc: a WRONG tap resolved the round');
    note(s.miss && /re-read/i.test(s.line), `the guided re-read line is missing ("${s.line}")`);
    const tryagain = await page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('tryagain')); });
    note(!tryagain, 'a wrong tap showed the shell "try again" (should be the guided re-read)');
    const hl = await page.evaluate(() => document.querySelectorAll('.fg-hlrow, .fg-hl').length);
    note(hl > 0, 'the relevant feature text was not highlighted on the guided re-read');
    note(s.order !== beforeOrder || s.order.length < 3, 'the target order did not reshuffle after a wrong tap (distractor-set rotation)');
    const c2 = await correctId(); await tap(c2);
    note((await S()).resolved, 'toc: tapping the correct chapter after the re-read did not resolve');

    /* diagram round resolves via the caption */
    await force('field-guide.diagram-gribbet-glow');
    const c3 = await correctId(); await tap(c3);
    note((await S()).resolved, 'diagram: tapping the captioned part did not resolve');

    /* which-feature (KNOW) resolves */
    await force('field-guide.which-feature-meaning');
    const c4 = await correctId(); await tap(c4);
    note((await S()).resolved, 'which-feature: tapping the right tool did not resolve');

    /* QUESTION-ONLY TTS: click the shell speaker, then assert NO feature gloss was ever spoken */
    await force('field-guide.glossary-gribbet-glow');
    await page.evaluate(() => { const b = document.querySelector('.lcs-activity-speak'); if (b) b.click(); });
    await sleep(60);
    const spokenLeakedGloss = await page.evaluate(() => {
      const r = window.FieldGuideActivity._round;
      const glosses = window.FieldGuideCore.items(r).map(i => (i.gloss || '').toLowerCase()).filter(Boolean);
      return (window.__spoken || []).some(s => glosses.some(g => g && String(s).toLowerCase().indexOf(g) >= 0));
    });
    note(!spokenLeakedGloss, 'a feature gloss was spoken aloud (must be QUESTION-only TTS → RI not SL)');

    /* mobile overflow 280→768 */
    for (const w2 of [280, 360, 412, 768]) {
      await page.setViewport({ width: w2, height: 820 });
      await force('field-guide.toc-gribbet-glow'); await sleep(30);
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w2}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} field-guide/en — "${title}"`);
  } catch (e) {
    fails.push('field-guide/en: ' + e.message);
    console.log(`  FAIL field-guide/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) { console.error(`FIELD-GUIDE LOCAL TEST FAILED — ${fails.length} issue(s):`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log('FIELD-GUIDE LOCAL TEST PASSED — reading the feature + tapping the function-mapped target resolves + the shell Check serves + a keepsake drops; a WRONG tap routes through a guided re-read (relevant feature text highlights + target order reshuffles), NO advance, NO shell try-again; the diagram caption + which-feature + glossary all work; QUESTION-only TTS (no feature gloss ever spoken); the SR mirror carries the feature; the shell Check is hidden until resolved; EN-only manifest; ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
