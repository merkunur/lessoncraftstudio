#!/usr/bin/env node
/* =====================================================================
   local-test-story-spine.js — interaction harness (RL.K.3 story-grammar,
   clarity-first redesign of #62). Serves `mini tools/` + drives the DOM:

     • tapping a WRONG-role panel does NOT resolve (warm nudge, no advance);
       tapping the right-role panel resolves; shell Check hidden until resolved.
     • the 3 captioned panels render as tappable; the shell prompt carries the
       role question; no stored answer; en-present (multi-locale); ≥7 distinct + reshuffle; no
       overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'story-spine.role.rl-k-3';
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

  const url = `http://127.0.0.1:${PORT}/story-spine-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const S = () => page.evaluate(() => ({ resolved: window.StorySpineActivity._resolved, miss: !!document.querySelector('.ds-line-msg.miss') }));
  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.StorySpineActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.StorySpineActivity._round && document.querySelector('.ds-root'), { timeout: 4000 });
    await sleep(50);
  }
  const tapIdx = (i) => page.evaluate((idx) => { const b = Array.from(document.querySelectorAll('.ds-cand')).find(x => +x.getAttribute('data-pi') === idx); if (b) b.click(); return !!b; }, i).then(() => sleep(40));
  const checkVisible = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (!c) return false; const s = getComputedStyle(c); return s.display !== 'none' && c.offsetParent !== null; });
  const oracleIdx = (id) => page.evaluate((rid) => {
    const t = window.StorySpineActivity, r = t._pool.find(x => x.id === rid), story = t._stories[r.storyId], C = window.StorySpineCore;
    return C.oracle(r, story);
  }, id);

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.StorySpineActivity; return t && t._activityRow && document.querySelector('.ds-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Dot's Story Spine", `header title "${title}"`);
    const slugKeys = await page.evaluate(() => Object.keys(window.StorySpineActivity._activityRow.slug));
    note(slugKeys.includes('en'), `manifest missing en slug: ${slugKeys.join(',')}`);   // multi-locale now (en/de/fr fan-outs); assert en-present, not en-only

    const N = await page.evaluate(() => window.StorySpineActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.StorySpineActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    const roles = await page.evaluate(() => Array.from(new Set(window.StorySpineActivity._pool.map(r => r.role))));
    note(roles.length >= 3, `only ${roles.length} roles: ${roles.join(',')}`);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct exercises`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');
    note(await page.evaluate(() => window.StorySpineActivity._pool.every(r => r.isCorrect == null && r.correctIndex == null)), 'a round carries a stored answer-flag field');

    /* prompt carries the role; panels render; wrong no-advance; correct resolves */
    await force('ds-mit-prob');
    const prompt = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
    note(/trouble/i.test(prompt), `prompt not the role question: "${prompt}"`);
    note(!(await checkVisible()), 'shell Check visible before resolve');
    note(await page.evaluate(() => document.querySelectorAll('.ds-cand').length === 3), 'the 3 tappable panels did not render');
    note(await page.evaluate(() => document.querySelectorAll('.ds-cand .ds-scene').length === 3), 'panel scenes did not render');

    let oi = await oracleIdx('ds-mit-prob');
    await tapIdx(oi === 0 ? 1 : 0);   // a wrong-role panel
    note(!(await S()).resolved, 'a wrong-role panel resolved');
    note((await S()).miss, 'wrong gave no nudge');
    await tapIdx(oi);
    note((await S()).resolved, 'the right-role panel did not resolve');
    note(await checkVisible(), 'shell Check did not appear after resolve');

    /* a setting round on another story */
    await force('ds-pic-set');
    oi = await oracleIdx('ds-pic-set');
    await tapIdx(oi);
    note((await S()).resolved, 'setting round: correct did not resolve');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('ds-mit-set'); await sleep(40);
      let over = await page.evaluate(() => { const dd = document.scrollingElement || document.documentElement; return dd.scrollWidth - dd.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} story-spine/en — "${title}"`);
  } catch (e) {
    fails.push('story-spine/en: ' + e.message);
    console.log(`  FAIL story-spine/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) { console.error(`STORY-SPINE LOCAL TEST FAILED — ${fails.length} issue(s):`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log('STORY-SPINE LOCAL TEST PASSED — story-grammar clarity build: a wrong-role panel does NOT resolve (warm nudge, no advance); the right-role panel resolves; the 3 captioned panels render as tappable; the shell prompt carries the role question; shell Check hides until resolved; no stored answer-flag; en-present (multi-locale); ≥3 roles + ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
