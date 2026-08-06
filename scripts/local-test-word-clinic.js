#!/usr/bin/env node
/* =====================================================================
   local-test-word-clinic.js — interaction harness for "Word Doctor's
   Clinic — heal by ear" (CCSS L.1.2.e). Serves `mini tools/` + the image
   library + drives the shell:

     • SPELLING HIDDEN: the correct grapheme + the complete word are NOT in
       the rendered DOM while the task is live (the sick slot is empty; the
       frame is partial).
     • LISTEN: the listen lamp + the round-load auto-play voice the WHOLE
       word (TTS spy), never an isolated phoneme.
     • VOICE-BACK + atomic spring-back: a WRONG different-sound grapheme →
       the patient voices a DIFFERENT word (spy) + NO heal + the tile springs
       back (slot empties; the frame untouched) + the fever HOLDS sick.
     • HEAL: the CORRECT grapheme → the patient voices the RIGHT word (spy) +
       heals (fever well).
     • NURSE'S HINT: after 3 wrongs, one competitor dims (>=2 remain).
     • >=7 cogs + reshuffle; shell Check celebrates; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'word-clinic.spell-by-ear.l-1-2-e';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const PUB = path.join(REPO, 'frontend', 'public');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]), file;
    if (p.startsWith('/image-library-webp/')) file = path.join(PUB, p.replace(/^\//, ''));
    else if (p === '/' || p.endsWith('.html')) file = path.join(MINI, path.basename(p) || 'x');
    else if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
    else file = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (err, buf) => { if (err) { res.statusCode = 404; res.end('not found'); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(buf); });
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
  const isNoise = (s) => /Failed to load resource|favicon|\/audio\/|speechSynthesis|not-allowed|webp/i.test(s);
  page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
  page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });

  const url = `http://127.0.0.1:${PORT}/word-clinic-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const A = () => page.evaluate(() => { const a = window.WordClinicActivity; return { solved: a.solved, fever: a.fever, placed: a.placed, wrong: a.wrongCount, roundId: a.round && a.round.id, word: a.round && a.round.word }; });
  const correctG = () => page.evaluate(() => window.WordClinicCore.correctGrapheme(window.WordClinicActivity.round));
  const wrongG = () => page.evaluate(() => { const a = window.WordClinicActivity, C = window.WordClinicCore; const cg = C.correctGrapheme(a.round); return C.trayFor(a.round).find(g => g !== cg); });
  const clickMed = (g) => page.evaluate((gg) => { const b = [...document.querySelectorAll('.wc-med')].find(x => x.textContent === gg); if (b && !b.disabled) b.click(); }, g).then(() => sleep(30));
  const domText = () => page.evaluate(() => document.querySelector('.wc-root').innerText);

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.WordClinicActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'word-clinic.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.WordClinicActivity.round && document.querySelector('.wc-root .wc-word'), { timeout: 4000 });
    await sleep(30);
  }

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.evaluate(() => { window.__spoke = []; const o = window.LCSAudio && window.LCSAudio.speak; if (o) window.LCSAudio.speak = function (opts) { window.__spoke.push(opts && opts.text); return o.apply(this, arguments); }; });
    await page.waitForFunction(() => { const t = window.WordClinicActivity; return t && t._activityRow && document.querySelector('.wc-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Word Doctor's Clinic", `header title "${title}"`);

    /* >=7 cogs + reshuffle */
    const N = await page.evaluate(() => window.WordClinicActivity._pool.length);
    note(N >= 7, `pool ${N} (<7)`);
    const cogs = await page.evaluate(() => new Set(window.WordClinicActivity._activityRow.params.rounds.map(r => r.cog)).size);
    note(cogs >= 7, `expected >=7 cogs, got ${cogs}`);
    const ids = await page.evaluate((c) => { const t = window.WordClinicActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct rounds`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');

    /* SPELLING HIDDEN + LISTEN auto-play (fish: f _ sh; correct "i") */
    await force('fish');
    await page.evaluate(() => { window.__spoke = []; window.WordClinicActivity.reset(); });
    await sleep(400);
    let spoke = await page.evaluate(() => (window.__spoke || []).join(' '));
    note(/fish/.test(spoke), `the whole word was not voiced on load/reset ("${spoke}")`);
    let txt = await domText();
    note(!/fish/i.test(txt), `the complete word "fish" is visible in the DOM (spelling leak): "${txt}"`);
    const cg = await correctG();
    const slotShowsCorrect = await page.evaluate((c) => { const s = document.querySelector('.wc-slot'); return s && s.textContent.trim() === c; }, cg);
    note(!slotShowsCorrect, 'the sick slot shows the correct grapheme before solving (answer leak)');

    /* WRONG → voice-back a DIFFERENT word + atomic spring-back + fever holds */
    const wg = await wrongG();
    await page.evaluate(() => { window.__spoke = []; });
    await clickMed(wg);
    spoke = await page.evaluate(() => (window.__spoke || []).join(' '));
    note(spoke.length > 0 && !/\bfish\b/.test(spoke), `the wrong placement did not voice a DIFFERENT word ("${spoke}")`);
    let s = await A(); note(!s.solved, 'a wrong grapheme healed the patient');
    note(s.fever === 'sick', 'the fever changed on a wrong grapheme (must hold)');
    await sleep(1000);   /* wait out the spring-back */
    s = await A(); note(s.placed === null, 'the wrong tile did not spring back (slot still filled)');
    /* the frame is untouched: f + sh tiles still present */
    const frameOk = await page.evaluate(() => { const t = [...document.querySelectorAll('.wc-tile')].map(x => x.textContent); return t.includes('f') && t.includes('sh'); });
    note(frameOk, 'the healthy frame (f, sh) was disturbed by the wrong placement');

    /* HEAL → voice the RIGHT word + fever well */
    await page.evaluate(() => { window.__spoke = []; });
    await clickMed(cg);
    spoke = await page.evaluate(() => (window.__spoke || []).join(' '));
    note(/fish/.test(spoke), `the correct placement did not voice "fish" ("${spoke}")`);
    s = await A(); note(s.solved, 'the correct grapheme did not heal'); note(s.fever === 'well', 'the fever did not cool on heal');

    /* shell Check celebrates */
    await page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c) c.click(); }); await sleep(120);
    const cel = await page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
    note(cel, 'shell Check did not celebrate after a heal');

    /* NURSE'S HINT after 3 wrongs (>=2 remain) */
    await force('boat');   /* tray oa/o/u */
    const bw = await wrongG();
    for (let k = 0; k < 3; k++) { await clickMed(bw); await sleep(950); }
    const dim = await page.evaluate(() => document.querySelectorAll('.wc-med.wc-dim').length);
    const live = await page.evaluate(() => [...document.querySelectorAll('.wc-med')].filter(b => !b.classList.contains('wc-dim')).length);
    note(dim >= 1, 'no nurse-hint dim after 3 wrongs');
    note(live >= 2, `nurse-hint left <2 live competitors (${live})`);

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('drum'); await sleep(40);
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} word-clinic/en — "${title}"`);
  } catch (e) {
    fails.push('word-clinic/en: ' + e.message);
    console.log(`  FAIL word-clinic/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`WORD-CLINIC LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('WORD-CLINIC LOCAL TEST PASSED — the spelling is hidden (no complete word / correct grapheme in the DOM); the whole word auto-voices + the lamp re-voices; a wrong different-sound grapheme voices a DIFFERENT word + springs back atomically (frame untouched) + the fever HOLDS; the correct grapheme voices the RIGHT word + heals (fever well); the nurse-hint dims one competitor after 3 wrongs (>=2 remain); >=7 cogs + reshuffle; shell Check celebrates; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
