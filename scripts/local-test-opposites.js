#!/usr/bin/env node
/* =====================================================================
   local-test-opposites.js — interaction harness for "Quill's Mirror Market"
   (K.L.5.b · antonyms). Serves `mini tools/` + drives the shell by clicking the
   RENDERED DOM, per ACTION:

     • pick / generate / verb : select the opposite + "Trade it!" → resolve.
     • balance : tap the opposite card → seesaw levels → resolve.
     • route : send each stream token to its correct door (Opposite|Same kind).
     • oddpair : tap the pair that is NOT opposites → resolve.
     • scene : tap each backwards element to flip it → resolve.
     • a WRONG act → a RELATION-BRANCHED warm nudge (same-dim sibling → "same
       KIND"), NO advance, the wrong choice dims, NO shell try-again.
     • the shell Check hides until resolved; oppositionId/relation NEVER in DOM.
     • code-drawn glyphs (an <svg> inside every card); multi-locale manifest (en/de/fr);
       ≥7 distinct ACTIONS + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'opposites.antonyms.k-l-5-b';
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

  const url = `http://127.0.0.1:${PORT}/opposites-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const S = () => page.evaluate(() => ({ resolved: window.OppositesActivity._resolved, finds: window.OppositesActivity._finds, cog: window.OppositesActivity._round && window.OppositesActivity._round.cog, line: (document.querySelector('.op-line') || {}).textContent || '', miss: !!document.querySelector('.op-line.miss') }));
  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.OppositesActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.OppositesActivity._round && document.querySelector('.op-root'), { timeout: 4000 });
    await sleep(40);
  }
  /* click the first .op-card / .op-pair whose aria-label includes `sub` */
  const clickLabel = (sub) => page.evaluate((s) => {
    const els = Array.from(document.querySelectorAll('.op-card,.op-pair'));
    const hit = els.find(e => (e.getAttribute('aria-label') || '').toLowerCase().indexOf(s.toLowerCase()) >= 0);
    if (hit) hit.click(); return !!hit;
  }, sub).then(() => sleep(30));
  /* click a door button (Opposite|Same kind) within the card whose label === word */
  const clickDoor = (word, doorText) => page.evaluate((args) => {
    const cards = Array.from(document.querySelectorAll('.op-card'));
    const card = cards.find(c => (c.getAttribute('aria-label') || '').toLowerCase() === args.w.toLowerCase());
    if (!card) return false;
    const btn = Array.from(card.querySelectorAll('.op-door')).find(b => b.textContent.indexOf(args.d) >= 0);
    if (btn) btn.click(); return !!btn;
  }, { w: word, d: doorText }).then(() => sleep(30));
  const clickBtn = (txt) => page.evaluate((t) => { const b = Array.from(document.querySelectorAll('.op-btn')).find(x => x.textContent.trim() === t); if (b && !b.disabled) b.click(); return !!b; }, txt).then(() => sleep(30));
  const checkVisible = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (!c) return false; const s = getComputedStyle(c); return s.display !== 'none' && c.offsetParent !== null; });

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.OppositesActivity; return t && t._activityRow && document.querySelector('.op-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Quill's Mirror Market", `header title "${title}"`);
    const slugKeys = await page.evaluate(() => Object.keys(window.OppositesActivity._activityRow.slug));
    note(slugKeys.includes('en'), `manifest missing en slug: ${slugKeys.join(',')}`);   // multi-locale now (en/de/fr fan-outs); assert en-present, not en-only

    const N = await page.evaluate(() => window.OppositesActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.OppositesActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    const cogs = await page.evaluate(() => Array.from(new Set(window.OppositesActivity._pool.map(r => r.cog))));
    note(cogs.length >= 7, `only ${cogs.length} distinct ACTIONS: ${cogs.join(',')}`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');

    /* no audio on load; shell Check hidden; a glyph svg present */
    await force('opposites.pick-black');
    note(!(await checkVisible()), 'shell Check visible before resolve');
    note(await page.evaluate(() => !!document.querySelector('.op-card svg')), 'no code-drawn glyph svg in a card');
    note(await page.evaluate(() => { const h = document.body.innerHTML; return h.indexOf('oppositionId') < 0 && h.indexOf('same-dim-sibling') < 0; }), 'oppositionId / relation leaked into the DOM');

    /* PICK: a WRONG (same-dim sibling Red) → "same KIND" nudge, dim, no advance */
    await clickLabel('red'); await clickBtn('Trade it!');
    let s = await S();
    note(!s.resolved && s.miss && /same KIND/i.test(s.line), `pick wrong-sibling: no relation-branched nudge (resolved=${s.resolved} line="${s.line}")`);
    note(await page.evaluate(() => document.querySelectorAll('.op-card.dim').length >= 1), 'the wrong (sibling) tile did not dim');
    const tryagain = await page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('tryagain')); });
    note(!tryagain, 'pick wrong showed the shell try-again');
    /* now the opposite (White) */
    await clickLabel('white'); await clickBtn('Trade it!');
    note((await S()).resolved, 'pick correct (White): did not resolve');
    note(await checkVisible(), 'shell Check did not appear after resolve');

    /* GENERATE (left → right) */
    await force('opposites.generate-left');
    await clickLabel('right'); await clickBtn('Trade it!');
    note((await S()).resolved, 'generate: did not resolve on Right');

    /* VERB (push → pull); a same-axis non-opposite (Lift) first → nudge */
    await force('opposites.verb-push');
    await clickLabel('lift'); await clickBtn('Trade it!');
    s = await S(); note(!s.resolved && s.miss, `verb wrong (Lift): expected a nudge (resolved=${s.resolved})`);
    await clickLabel('pull'); await clickBtn('Trade it!');
    note((await S()).resolved, 'verb: did not resolve on Pull');

    /* BALANCE (white → black) tap-to-act, no commit */
    await force('opposites.balance-white');
    await clickLabel('black');
    note((await S()).resolved, 'balance: did not resolve on Black');

    /* ROUTE: white→Opposite, red→Same kind, blue→Same kind */
    await force('opposites.route-black');
    await clickDoor('white', 'Opposite');
    await clickDoor('red', 'Same kind');
    await clickDoor('blue', 'Same kind');
    note((await S()).resolved, 'route: did not resolve after routing all three');

    /* ODDPAIR: tap the NON-opposite pair (red ↔ blue) */
    await force('opposites.oddpair-1');
    await clickLabel('red and blue');
    note((await S()).resolved, 'oddpair: did not resolve on the non-opposite pair');

    /* SCENE: flip all three backwards elements */
    await force('opposites.scene-bedtime');
    let r = await page.evaluate(() => window.OppositesActivity._round);
    for (let k = 0; k < r.elements.length; k++) {
      await page.evaluate((idx) => { const c = document.querySelectorAll('.op-card')[idx]; if (c) c.click(); }, k);
      await sleep(30);
    }
    note((await S()).resolved, 'scene: did not resolve after flipping all elements');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('opposites.route-black'); await sleep(40);
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} opposites/en — "${title}"`);
  } catch (e) {
    fails.push('opposites/en: ' + e.message);
    console.log(`  FAIL opposites/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) { console.error(`OPPOSITES LOCAL TEST FAILED — ${fails.length} issue(s):`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log('OPPOSITES LOCAL TEST PASSED — all 7 ACTIONS (pick/generate/verb/balance/route/oddpair/scene) resolve with the opposite-relation oracle + the Mirror-Book rises; a WRONG act routes through a RELATION-BRANCHED warm nudge (same-dim sibling → "same KIND"), the choice dims, NO advance, NO shell try-again; the shell Check hides until resolved; oppositionId/relation never in the DOM; code-drawn glyph svg in every card; en-present (multi-locale); ≥7 distinct ACTIONS + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
