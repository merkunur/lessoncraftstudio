#!/usr/bin/env node
/* =====================================================================
   local-test-affix.js — interaction harness (L.2.4.b/c affix word-meaning,
   clarity-first). Serves `mini tools/` + drives the rendered DOM, in EVERY
   locale that declares a round pool (not just English — see below):

     • apply / which : a WRONG option does NOT resolve (warm nudge, no
       advance); the correct one resolves; shell Check hidden until resolved.
     • the machine scene renders (an .af-scene svg); the shell prompt
       interpolates the word/meaning; no stored answer; >=7 distinct +
       reshuffle; no overflow 280->768.
     • ⚠ THE SCREEN READER ANNOUNCES THE RENDERED ORDER. `_renderOptions`
       walks the shuffled `_choiceOrder` while `Core.snapshot` returns the
       UNSHUFFLED manifest order, so `_srMirror` used to read a different
       sequence than the buttons — and since the authored order is not random,
       the correct answer was ANNOUNCED FIRST in 9 of 11 rounds in both fr and
       it. This is asserted against the LIVE DOM rather than the manifest,
       because the manifest is what was wrong.

   ⚠ This file used to assert the manifest was EN-only, and its PASS line kept
   claiming "EN-only" for months after that assertion was corrected. A PASS
   line must never advertise a check the file has stopped making.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'affix.apply.l-2-4-b';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp', '.svg': 'image/svg+xml' };

/* per-locale expectations. `applyId`/`whichId` name real rounds in that pool;
   `prompt*` are substrings the shell banner must interpolate. */
const LOCALES = {
  en: {
    title: "Marigold's Knowing Machine",
    applyId: 'af-unkind', whichId: 'af-which-retie', wideId: 'af-helpful', wideWhichId: 'af-which-useless',
    promptApply: [/unkind/, /mean/i], promptWhich: [/again/i, /cog/i],
  },
  sv: {
    title: 'Marigolds ordmaskin',
    applyId: 'af-sv-osnall', whichId: 'af-sv-which-otrevlig', wideId: 'af-sv-kraftfull', wideWhichId: 'af-sv-which-smaklos',
    promptApply: [/osnäll/, /betyder/i], promptWhich: [/trevlig/i, /kugghjul/i],
  },
};

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
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  for (const LANG of Object.keys(LOCALES)) {
    const CFG = LOCALES[LANG];
    const note = (cond, msg) => { if (!cond) fails.push(`[${LANG}] ${msg}`); };
    const page = await browser.newPage();
    await page.setViewport({ width: 412, height: 900 });
    const errs = [];
    const isNoise = (s) => /Failed to load resource|favicon|\/audio\/|speechSynthesis|not-allowed/i.test(s);
    page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
    page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });

    const url = `http://127.0.0.1:${PORT}/affix-activity.html?lang=${LANG}&activity=${ACTIVITY}&embed=1`;
    const S = () => page.evaluate(() => ({ resolved: window.AffixActivity._resolved, miss: !!document.querySelector('.af-line-msg.miss') }));

    async function force(id) {
      await page.evaluate((rid) => {
        const t = window.AffixActivity, n = t._pool.length, order = [];
        for (let i = 0; i < n; i++) order.push(i);
        const k = t._pool.findIndex(x => x.id === rid);
        const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
        t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
      }, id);
      await page.waitForFunction(() => window.AffixActivity._round && document.querySelector('.af-root'), { timeout: 4000 });
      await sleep(60);
    }

    /* tap by RENDERED POSITION — never by matching English text, which would
       silently drive the wrong control in a non-English locale */
    const tap = (correct) => page.evaluate((ok) => {
      const t = window.AffixActivity, r = t._round, opts = r.options || [];
      const ci = r.cog === 'which' ? opts.indexOf(r.affix) : opts.findIndex(o => o.affix === r.affix);
      const wi = r.cog === 'which' ? opts.findIndex(a => a !== r.affix) : opts.findIndex(o => o.affix !== r.affix);
      const pos = t._choiceOrder.indexOf(ok ? ci : wi);
      const b = document.querySelectorAll('.af-cand')[pos];
      if (b) b.click();
      return !!b;
    }, correct).then(() => sleep(60));


    /* the sr mirror ends "<lead>: a; b; c." (apply) or "<lead>: a, b, c." (which).
       Parse the real list rather than searching for substrings — option texts
       nest inside one another in several locales. */
    const srList = (sr, sep) => {
      const at = sr.lastIndexOf(': ');
      if (at < 0) return null;
      return sr.slice(at + 2).replace(/\.\s*$/, '').split(sep).map(x => x.trim());
    };
    const checkVisible = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (!c) return false; const s = getComputedStyle(c); return s.display !== 'none' && c.offsetParent !== null; });

    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.waitForFunction(() => { const t = window.AffixActivity; return t && t._activityRow && document.querySelector('.af-root'); }, { timeout: 15000 });

      const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
      note(title === CFG.title, `header title "${title}" != "${CFG.title}"`);

      /* the activity is a localized fan-out target; assert this locale is real,
         not that the manifest is EN-only (the stale assertion this replaced) */
      const declared = await page.evaluate(() => Object.keys(window.AffixActivity._activityRow.slug));
      note(declared.includes('en'), `manifest missing en slug: ${declared.join(',')}`);
      note(declared.includes(LANG), `manifest has no ${LANG} slug`);
      const poolIsLocal = await page.evaluate((l) => {
        const p = window.AffixActivity._activityRow.params;
        return l === 'en' ? true : !!(p.roundsL10n && p.roundsL10n[l] && window.AffixActivity._pool === p.roundsL10n[l]);
      }, LANG);
      note(poolIsLocal, `the ${LANG} runtime pool is not the ${LANG} pool (fell through to English)`);

      const N = await page.evaluate(() => window.AffixActivity._pool.length);
      const ids = await page.evaluate((c) => { const t = window.AffixActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
      const cogs = await page.evaluate(() => Array.from(new Set(window.AffixActivity._pool.map(r => r.cog))));
      note(cogs.indexOf('apply') >= 0 && cogs.indexOf('which') >= 0, `cogs not [apply,which]: ${cogs.join(',')}`);
      note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct exercises`);
      note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');
      note(await page.evaluate(() => window.AffixActivity._pool.every(r => r.isCorrect == null && r.correctIndex == null)), 'a round carries a stored answer field');

      /* APPLY */
      await force(CFG.applyId);
      const prompt = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
      note(CFG.promptApply.every(re => re.test(prompt)), `apply prompt not interpolated: "${prompt}"`);
      note(!(await checkVisible()), 'shell Check visible before resolve');
      note(await page.evaluate(() => !!document.querySelector('.af-scene')), 'the machine scene svg did not render');
      note(await page.evaluate(() => document.querySelectorAll('.af-row .af-cand').length === 3), 'apply did not render 3 meaning cards');

      /* ⚠ the sr mirror must list the choices in the RENDERED order */
      const orderApply = await page.evaluate(() => {
        const btn = [...document.querySelectorAll('.af-row .af-cand')].map(b => b.textContent.trim());
        const sr = document.querySelector('.af-sronly p');
        return { btn, sr: sr ? sr.textContent : '' };
      });
      note(orderApply.btn.length === 3 && orderApply.sr.length > 0, 'apply: could not read the sr mirror');
      const srApply = srList(orderApply.sr, '; ');
      note(srApply && srApply.length === 3, `apply: could not parse the sr mirror list from "${orderApply.sr}"`);
      note(!!srApply && srApply.join('|') === orderApply.btn.join('|'),
        `apply: sr mirror announces a DIFFERENT order than the buttons\n      buttons: ${JSON.stringify(orderApply.btn)}\n      mirror : ${JSON.stringify(srApply)}`);

      await tap(false);
      note(!(await S()).resolved, 'apply: a wrong meaning resolved');
      note((await S()).miss, 'apply: wrong gave no nudge');
      await tap(true);
      note((await S()).resolved, 'apply: the correct meaning did not resolve');
      note(await checkVisible(), 'apply: shell Check did not appear after resolve');

      /* WHICH */
      await force(CFG.whichId);
      const pw = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
      note(CFG.promptWhich.every(re => re.test(pw)), `which prompt not interpolated: "${pw}"`);
      note(await page.evaluate(() => document.querySelectorAll('.af-cogrow .af-cand').length === 3), 'which did not render 3 cog buttons');

      const orderWhich = await page.evaluate(() => {
        const btn = [...document.querySelectorAll('.af-cogrow .af-cand .af-cog-label')].map(b => b.textContent.trim());
        const sr = document.querySelector('.af-sronly p');
        return { btn, sr: sr ? sr.textContent : '' };
      });
      const srWhich = srList(orderWhich.sr, ', ');
      note(srWhich && srWhich.length === 3, `which: could not parse the sr mirror list from "${orderWhich.sr}"`);
      /* the mirror renders "<label> (<SENSE>)" per cog; compare the label heads */
      const srWhichLabels = (srWhich || []).map(x => x.replace(/\s*\(.*$/, '').trim());
      note(srWhichLabels.join('|') === orderWhich.btn.join('|'),
        `which: sr mirror announces a DIFFERENT order than the cogs\n      cogs  : ${JSON.stringify(orderWhich.btn)}\n      mirror: ${JSON.stringify(srWhichLabels)}`);

      await tap(false);
      note(!(await S()).resolved, 'which: a wrong cog resolved');
      await tap(true);
      note((await S()).resolved, 'which: the correct cog did not resolve');

      /* mobile overflow 280->768 */
      for (const w of [280, 360, 412, 768]) {
        await page.setViewport({ width: w, height: 820 });
        await force(CFG.wideId); await sleep(50);
        let over = await page.evaluate(() => { const dd = document.scrollingElement || document.documentElement; return dd.scrollWidth - dd.clientWidth; });
        note(over <= 2, `apply horizontal overflow ${over}px at ${w}px`);
        await force(CFG.wideWhichId); await sleep(50);
        over = await page.evaluate(() => { const dd = document.scrollingElement || document.documentElement; return dd.scrollWidth - dd.clientWidth; });
        note(over <= 2, `which horizontal overflow ${over}px at ${w}px`);
      }
      await page.setViewport({ width: 412, height: 900 });

      note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
      const bad = fails.filter(f => f.startsWith(`[${LANG}]`)).length;
      console.log(`  ${bad ? 'FAIL' : 'ok  '} affix/${LANG} — "${title}"`);
    } catch (e) {
      fails.push(`[${LANG}] ` + e.message);
      console.log(`  FAIL affix/${LANG} — ${e.message}`);
    } finally { await page.close(); }
  }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) { console.error(`AFFIX LOCAL TEST FAILED — ${fails.length} issue(s):`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log(`AFFIX LOCAL TEST PASSED — ${Object.keys(LOCALES).join(' + ')}: a wrong meaning/cog does NOT resolve (warm nudge, no advance); the correct one resolves; the Knowing-Machine scene svg renders (3 meaning cards / 3 cogs); the shell prompt interpolates the word/meaning in each locale's own words; each locale runs its OWN round pool; the screen-reader mirror announces the RENDERED order; shell Check hides until resolved; no stored answer; apply+which cogs + >=7 distinct + reshuffle; no overflow 280->768.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
