#!/usr/bin/env node
/* =====================================================================
   local-test-cvc-builder-magice.js — local interaction harness for the RF.1.3
   silent-e "Add the Magic e" build-magic-e cvc-builder activity (EN-only).

   Serves `mini tools/` + drives cvc-builder-activity.html with puppeteer:
     • the base (kit_) is PRE-FILLED + LOCKED — tapping a base slot does NOT clear
       it (window.CvcBuilderActivity.slotValues[0] unchanged); the wrap carries
       .cvc-prefill (locked-slot dim ONLY — the magic-e tile is NOT gilded; all
       palette tiles look identical so the answer isn't given away);
     • tap the magic-e "e" tile → core.feedbackMode === 'correct' after Check;
     • a wrong final letter → not correct;
     • Hear-it speaks the long-vowel target (LCSAudio spy);
     • variety (§A.13.60): ≥7 distinct via nextTask + pass-2 reshuffle;
     • mobile overflow 280/360/412/768 (novel prefill render).
   EN-only.

   Usage: node scripts/local-test-cvc-builder-magice.js [--shot]
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const has = (k) => process.argv.includes('--' + k);
const SHOT = has('shot');
const ACTIVITY_ID = 'cvc-builder.build-magic-e.rf-1-3-silent-e';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'cvc-builder');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml' };

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p.startsWith('/image-library-webp/')) { res.statusCode = 404; res.end('no img locally'); return; }
    let file = (p === '/' || p === '/cvc-builder-activity.html') ? path.join(MINI, 'cvc-builder-activity.html')
      : p.startsWith('/mini-tools/') ? path.join(MINI, p.slice('/mini-tools/'.length))
      : path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end('not found'); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(b); });
  });
}

(async () => {
  const puppeteer = require('puppeteer');
  const server = serve();
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const PORT = server.address().port, BASE = `http://127.0.0.1:${PORT}`;
  if (SHOT) fs.mkdirSync(SHOT_DIR, { recursive: true });

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const fails = [];
  const note = (cond, msg) => { if (!cond) fails.push(msg); };
  async function tapLetter(page, letter) {
    const tiles = await page.$$('.cvc-letter');
    for (const t of tiles) { const l = await page.evaluate(e => e.dataset.letter, t); if (l === letter) { await t.click(); return true; } }
    return false;
  }
  const fb = (page) => page.evaluate(() => window.CvcBuilderActivity && window.CvcBuilderActivity.feedbackMode);

  const tag = 'en/magic-e';
  const page = await browser.newPage();
  await page.setViewport({ width: 412, height: 900 });
  const errs = [];
  const isNoise = (s) => /Failed to load resource|favicon|\/audio\/|image-library-webp|404|net::ERR/i.test(s);
  page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
  page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });
  const url = `${BASE}/cvc-builder-activity.html?lang=en&activity=${ACTIVITY_ID}&embed=1`;
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => {
      const t = window.CvcBuilderActivity;
      return t && t._activityRow && document.querySelector('.cvc-slot') && document.querySelector('.lcs-activity-check');
    }, { timeout: 15000 });

    const wired = await page.evaluate(() => typeof window.CvcBuilderActivity.nextTask === 'function' && !window.CvcBuilderActivity.tasks);
    note(wired, `${tag}: nextTask not installed / tasks not nulled`);

    const N = await page.evaluate(() => window.CvcBuilderActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.CvcBuilderActivity, o = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); o.push(x ? x.id : null); } return o; }, 2 * N);
    const p1 = ids.slice(0, N), p2 = ids.slice(N, 2 * N);
    note(new Set(p1).size >= 7, `${tag}: only ${new Set(p1).size} distinct rounds (<7)`);
    note(p1.slice().sort().join('|') === p2.slice().sort().join('|'), `${tag}: pass-2 not same set`);
    note(p1.join('|') !== p2.join('|'), `${tag}: pass-2 order identical (no reshuffle)`);

    await page.evaluate(() => window.LCS_reloadFirstTask && window.LCS_reloadFirstTask());
    await page.waitForFunction(() => document.querySelector('.cvc-slot') && window.CvcBuilderActivity.targetWord, { timeout: 5000 });
    const target = await page.evaluate(() => window.CvcBuilderActivity.targetWord);
    const prompt = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
    note(prompt.length > 0 && !/^prompt[A-Z]/.test(prompt), `${tag}: raw/empty prompt "${prompt}"`);

    // pre-filled base + .cvc-prefill class (kept for the locked-slot dim)
    const hasPrefillClass = await page.evaluate(() => !!document.querySelector('.cvc-wrap.cvc-prefill'));
    note(hasPrefillClass, `${tag}: wrap missing .cvc-prefill class`);

    // NO-GILD GUARD (2026-06-27): the magic-e answer tile MUST NOT be visually
    // distinct from the distractor tiles, or the answer is given away (the gild
    // bug). Compare the computed background of the 'e' tile to a distractor tile.
    const gild = await page.evaluate(() => {
      const e = document.querySelector('.cvc-letter[data-letter="e"]');
      const other = Array.from(document.querySelectorAll('.cvc-letter')).find(t => t.getAttribute('data-letter') !== 'e');
      if (!e || !other) return { ok: false, why: 'missing e or distractor tile' };
      const ce = getComputedStyle(e), co = getComputedStyle(other);
      const same = ce.backgroundImage === co.backgroundImage && ce.backgroundColor === co.backgroundColor && ce.color === co.color && ce.boxShadow === co.boxShadow;
      return { ok: same, why: `e[bg=${ce.backgroundImage};col=${ce.color}] vs other[bg=${co.backgroundImage};col=${co.color}]` };
    });
    note(gild.ok, `${tag}: magic-e tile is GILDED / visually distinct — gives away the answer (${gild.why})`);
    const slotTexts = await page.$$eval('.cvc-slot', els => els.map(e => e.textContent.trim()));
    const base = target.slice(0, -1);
    note(slotTexts.slice(0, base.length).join('') === base, `${tag}: base not pre-filled (slots ${JSON.stringify(slotTexts)} vs base "${base}")`);
    note(slotTexts[target.length - 1] === '', `${tag}: final slot not empty`);

    // base LOCKED: tap base slot 0 → stays
    const slot0 = await page.$('.cvc-slot[data-idx="0"]');
    if (slot0) { await slot0.click(); const sv0 = await page.evaluate(() => window.CvcBuilderActivity.slotValues[0]); note(sv0 === target[0], `${tag}: base slot 0 cleared on tap (not locked)`); }

    // hear-it spy
    await page.evaluate(() => { window.__spoken = []; if (window.LCSAudio) window.LCSAudio.speak = function (o) { window.__spoken.push({ type: o && o.type, text: o && o.text }); }; });
    const hearBtn = await page.$('.cvc-subject-hear');
    if (hearBtn) { await hearBtn.click(); const sp = await page.evaluate(() => window.__spoken.slice()); note(sp.some(s => s.type === 'word' && s.text === target), `${tag}: Hear-it did not speak "${target}" (spy=${JSON.stringify(sp)})`); }

    // add the magic e → correct
    await tapLetter(page, 'e');
    await page.click('.lcs-activity-check');
    note((await fb(page)) === 'correct', `${tag}: adding magic-e did not register correct (fb=${await fb(page)})`);

    // wrong final letter → not correct
    await page.evaluate(() => window.LCS_reloadFirstTask && window.LCS_reloadFirstTask());
    await page.waitForFunction(() => window.CvcBuilderActivity.targetWord, { timeout: 5000 });
    const distractor = await page.evaluate(() => { const pal = window.CvcBuilderActivity.palette || []; return pal.find(l => l !== 'e') || pal[0]; });
    await tapLetter(page, distractor);
    await page.click('.lcs-activity-check');
    note((await fb(page)) !== 'correct', `${tag}: wrong final letter "${distractor}" registered correct`);

    // mobile overflow
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 900 });
      await page.evaluate(() => window.LCS_reloadFirstTask && window.LCS_reloadFirstTask());
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `${tag}: horizontal overflow ${over}px at ${w}px`);
      if (SHOT && (w === 280 || w === 390)) await page.screenshot({ path: path.join(SHOT_DIR, `magic-e-${w}.png`) });
    }
    await page.setViewport({ width: 412, height: 900 });

    note(errs.length === 0, `${tag}: console error(s): ${errs.slice(0, 2).join(' | ')}`);
    const okT = !fails.some(f => f.startsWith(tag + ':'));
    console.log(`  ${okT ? 'ok  ' : 'FAIL'} ${tag} — "${prompt}" (round0 target=${target}) | ${new Set(p1).size} distinct`);
  } catch (e) {
    fails.push(`${tag}: ${e.message}`);
    console.log(`  FAIL ${tag} — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`MAGIC-E LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log(`MAGIC-E LOCAL TEST PASSED — EN: base pre-filled+locked, magic-e tile NOT gilded (no answer give-away), add-e→correct, wrong→not, Hear-it speaks the word, ≥7 reshuffle, no overflow.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
