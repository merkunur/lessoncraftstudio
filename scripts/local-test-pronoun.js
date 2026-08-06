#!/usr/bin/env node
/* =====================================================================
   local-test-pronoun.js — interaction harness (L.1.1.d personal pronouns,
   clarity-first redesign of #84). Serves `mini tools/` + drives the DOM:

     • tapping the wrong-case form does NOT resolve (warm role nudge, no
       advance); tapping the role-correct form resolves + fills the blank; shell
       Check hidden until resolved.
     • the sentence + 2 pronoun chips + Hear-it render; the shell prompt carries
       the question; no stored pronoun literal; EN-only; ≥7 distinct + reshuffle;
       no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'pronoun.case.l-1-1-d';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp', '.svg': 'image/svg+xml' };

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

  const url = `http://127.0.0.1:${PORT}/pronoun-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const S = () => page.evaluate(() => ({ resolved: window.PronounActivity._resolved, miss: !!document.querySelector('.pn-line-msg.miss') }));
  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.PronounActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.PronounActivity._round && document.querySelector('.pn-root'), { timeout: 4000 });
    await sleep(50);
  }
  const tapStr = (str) => page.evaluate((s) => { const b = Array.from(document.querySelectorAll('.pn-cand')).find(x => x.getAttribute('data-str') === s); if (b) b.click(); return !!b; }, str).then(() => sleep(40));
  const checkVisible = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (!c) return false; const s = getComputedStyle(c); return s.display !== 'none' && c.offsetParent !== null; });
  const derived = (id) => page.evaluate((rid) => { const t = window.PronounActivity, r = t._pool.find(x => x.id === rid), C = window.PronounCore; return { correct: C.deriveCorrect(r), wrong: C.deriveWrong(r) }; }, id);

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.PronounActivity; return t && t._activityRow && document.querySelector('.pn-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === 'The Borrowed Hat', `header title "${title}"`);
    const slugKeys = await page.evaluate(() => Object.keys(window.PronounActivity._activityRow.slug));
    note(slugKeys.length === 1 && slugKeys[0] === 'en', `manifest not EN-only: ${slugKeys.join(',')}`);

    const N = await page.evaluate(() => window.PronounActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.PronounActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct exercises`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');
    note(await page.evaluate(() => window.PronounActivity._pool.every(r => r.pronoun == null && r.correct == null)), 'a round stores a pronoun/answer literal field');

    /* a subject round: prompt + sentence + chips render; wrong no-advance; correct resolves + fills */
    await force('pn-he-subj');
    const prompt = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
    note(/which word fits/i.test(prompt), `prompt wrong: "${prompt}"`);
    note(!(await checkVisible()), 'shell Check visible before resolve');
    note(await page.evaluate(() => { const s = document.querySelector('.pn-sentence'); return s && /ran to the den/.test(s.textContent); }), 'the sentence did not render');
    note(await page.evaluate(() => !!document.querySelector('.pn-blank')), 'the blank slot did not render');
    note(await page.evaluate(() => document.querySelectorAll('.pn-cand').length === 2), 'the 2 pronoun chips did not render');
    note(await page.evaluate(() => !!document.querySelector('.pn-hear')), 'the Hear-it button did not render');

    let d = await derived('pn-he-subj');
    note(d.correct === 'He' && d.wrong === 'Him', `subject derive wrong: ${d.correct}/${d.wrong}`);
    await tapStr(d.wrong);
    note(!(await S()).resolved, 'a wrong chip resolved');
    note((await S()).miss, 'wrong gave no nudge');
    await tapStr(d.correct);
    note((await S()).resolved, 'the correct form did not resolve');
    note(await page.evaluate(() => { const b = document.querySelector('.pn-blank'); return b && b.classList.contains('filled') && b.textContent.trim() === 'He'; }), 'the blank did not fill with He');
    note(await checkVisible(), 'shell Check did not appear after resolve');

    /* an object round + a possessive (form-by-function) round */
    await force('pn-he-obj'); d = await derived('pn-he-obj');
    note(d.correct === 'him' && d.wrong === 'he', `object derive wrong: ${d.correct}/${d.wrong}`);
    await tapStr('him'); note((await S()).resolved, 'object round: correct did not resolve');
    await force('pn-his'); d = await derived('pn-his');
    note(d.correct === 'his' && d.wrong === 'him', `possessive derive wrong: ${d.correct}/${d.wrong}`);
    await tapStr('his'); note((await S()).resolved, 'possessive round: correct did not resolve');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('pn-i-subj'); await sleep(40);
      let over = await page.evaluate(() => { const dd = document.scrollingElement || document.documentElement; return dd.scrollWidth - dd.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} pronoun/en — "${title}"`);
  } catch (e) {
    fails.push('pronoun/en: ' + e.message);
    console.log(`  FAIL pronoun/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) { console.error(`PRONOUN LOCAL TEST FAILED — ${fails.length} issue(s):`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log('PRONOUN LOCAL TEST PASSED — personal pronouns by case: a wrong-case form does NOT resolve (warm role nudge, no advance); the role-correct form resolves + fills the blank; the sentence + 2 chips + Hear-it render; the shell prompt carries the question; no stored pronoun literal; EN-only; ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
