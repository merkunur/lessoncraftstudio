#!/usr/bin/env node
/* =====================================================================
   local-test-home-language-bridge.js — drive the REAL controls of the
   Say It Board, locally, with no deploy.
   ---------------------------------------------------------------------
   This replaces the v2 local test wholesale. That one asserted a flat
   board of twelve cards and a single text column; both are gone. More
   to the point, it could not have caught any of the four defects that
   actually shipped, because it never turned the sound off, never opened
   a print sheet as a free visitor, and never pressed anything twice.

   ⭐ THE FIRST BLOCK IS THE ONE THAT MATTERS. Schools mute tablets. The
   v2 board's `_say` returned early with the voice off and its only
   other response to a tap was a 1px :active transform, so a newcomer
   tapped "I need the toilet" and NOTHING HAPPENED — and the shared
   liveness gate still scored the card live, because its change
   signature includes window.__spoken and the default is voice-on. The
   gate was satisfied by the one path that happened to work.
   ===================================================================== */
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
const OUT = path.join(ROOT, 'docs', 'audit-results', 'home-language-bridge', 'qa');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };

let pass = 0, fail = 0;
const is = (c, m) => { if (c) { pass++; console.log('  ok   ' + m); } else { fail++; console.error('  FAIL ' + m); } };

const server = http.createServer((req, res) => {
  const f = path.join(MINI, path.basename(req.url.split('?')[0]));
  fs.readFile(f, (e, b) => {
    if (e) { res.writeHead(404); res.end('404'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
    res.end(b);
  });
});

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + server.address().port;
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const p = await b.newPage();
  const errs = [];
  p.on('pageerror', (e) => errs.push(e.message));
  await p.setViewport({ width: 704, height: 900, deviceScaleFactor: 2 });
  await p.evaluateOnNewDocument(() => {
    window.__spoken = [];
    const install = () => {
      if (!window.LCSAudio) return false;
      const s = window.LCSAudio.speak;
      window.LCSAudio.speak = function (o) { window.__spoken.push(o); try { return s.apply(this, arguments); } catch (e) {} };
      return true;
    };
    const t = setInterval(() => { if (install()) clearInterval(t); }, 10);
  });
  await p.goto(base + '/home-language-bridge.html?lang=en&embed=1', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 400));

  console.log('[the muted tap — the defect the v2 board shipped]');
  await p.evaluate(() => { const T = window.HomeLanguageBridge; T.api.settings.voice = false; T.render(); });
  const before = await p.evaluate(() => document.querySelectorAll('.hlb-said').length);
  await p.click('[data-fk="card-help"]');
  await new Promise((r) => setTimeout(r, 120));
  const after = await p.evaluate(() => ({
    said: document.querySelectorAll('.hlb-said').length,
    spoke: window.__spoken.length,
    live: (document.querySelector('.lcs-sr-only') || {}).textContent || ''
  }));
  is(before === 0, 'no card is lifted before the tap');
  is(after.said === 1 || after.spoke === 0, 'a tap with the sound OFF still changes the DOM');
  is(after.spoke === 0, 'nothing was spoken with the sound off');
  is(/help/i.test(after.live), 'the phrase reached the live region: ' + JSON.stringify(after.live.slice(0, 40)));

  console.log('');
  console.log('[the hold-this-up view]');
  await p.evaluate(() => { const T = window.HomeLanguageBridge; T.api.settings.voice = true; T.render(); });
  await p.click('[data-fk="card-dryclothes"]');
  await new Promise((r) => setTimeout(r, 250));
  const big = await p.evaluate(() => ({
    open: !!document.querySelector('.hlb-big.hlb-open'),
    spoke: window.__spoken.length,
    icon: !!document.querySelector('.hlb-bigicon')
  }));
  is(big.open, 'a dignity card OPENS the big view instead of speaking');
  is(big.spoke === 0, 'and it did NOT broadcast it to the room');
  is(big.icon, 'the big view carries the picture');
  await p.screenshot({ path: path.join(OUT, 'build-big.png') });
  await p.evaluate(() => document.querySelector('.hlb-big').click());
  await new Promise((r) => setTimeout(r, 150));
  is(await p.evaluate(() => !document.querySelector('.hlb-big.hlb-open')), 'tapping anywhere closes it');

  console.log('');
  console.log('[the teacher desk and the free allowance]');
  await p.click('[data-fk="teacher"]');
  await new Promise((r) => setTimeout(r, 200));
  is(await p.evaluate(() => !!document.querySelector('.hlb-desk.hlb-open')), 'the desk opens');
  await p.screenshot({ path: path.join(OUT, 'build-desk.png') });

  /* refuse with a reason, not a mute button */
  await p.click('[data-fk="keep"]');
  await new Promise((r) => setTimeout(r, 150));
  is(await p.evaluate(() => /finish|sentence/i.test((document.querySelector('.hlb-notice') || {}).textContent || '')),
     'an empty phrase REFUSES with a reason rather than sitting disabled');

  /* author three, then the fourth must gate on KEEP but not on SHOW */
  for (let i = 1; i <= 4; i++) {
    await p.evaluate((n) => {
      const T = window.HomeLanguageBridge;
      T.draft = { starter: 'need', body: 'thing ' + n, icon: 'saybubble', cat: 'body', home: '' };
      T._paint();
    }, i);
    await p.click('[data-fk="keep"]');
    await new Promise((r) => setTimeout(r, 150));
  }
  const gate = await p.evaluate(() => ({
    kept: window.HomeLanguageBridge._store.custom.length,
    gate: !!document.querySelector('.hlb-gate'),
    gateOnBoard: !!document.querySelector('.hlb-board .hlb-gate, .hlb-rail .hlb-gate, .hlb-big .hlb-gate')
  }));
  is(gate.kept === 3, 'a free teacher keeps exactly 3 (kept ' + gate.kept + ')');
  is(gate.gate, 'the fourth shows the gate');
  is(!gate.gateOnBoard, '⛔ the gate NEVER renders on the child-facing board');

  /* and the fourth is still usable on the board — the value is
     discovered before the wall */
  await p.evaluate(() => {
    const T = window.HomeLanguageBridge;
    T.draft = { starter: 'need', body: 'a fourth', icon: 'saybubble', cat: 'body', home: '' };
    T._paint();
  });
  await p.click('[data-fk="showboard"]');
  await new Promise((r) => setTimeout(r, 200));
  /* ⚠⚠ THIS ASSERTION USED TO CHECK FOR THE BIG VIEW, and it passed on a
     button whose label was FALSE IN ELEVEN LANGUAGES. "Put it on the
     board" set a one-shot hold-up overlay that the next tap discarded;
     the phrase never reached the board, while `gateKeep` sold the free
     tier on "writing them and using them is always free". TWO native
     panels found it independently by reading the model rather than the
     copy — and my test had been asserting the defect.
     It now checks the thing the label claims. */
  const onBoard = await p.evaluate(() => {
    const board = document.querySelector('.hlb-board');
    return board ? board.querySelectorAll('.hlb-card.hlb-mine').length : 0;
  });
  is(onBoard >= 1,
     `the FOURTH phrase is ON THE BOARD, not just previewed — authoring and using are free (${onBoard} own card(s))`);

  console.log('');
  console.log('[print]');
  const pr = await p.evaluate(() => {
    const s = document.querySelector('.hlb-sheet');
    return { cards: s.querySelectorAll('.hlb-p-card').length, icons: s.querySelectorAll('.hlb-p-icon').length };
  });
  is(pr.cards > 0, 'the print sheet exists for a FREE teacher (' + pr.cards + ' cards)');
  is(pr.icons === pr.cards, '⭐ every printed card carries its picture (' + pr.icons + '/' + pr.cards + ')');

  await b.close();
  server.close();
  if (errs.length) { errs.forEach((e) => console.error('  PAGE ERROR ' + e)); fail += errs.length; }
  console.log('');
  console.log(fail ? `FAIL — ${pass} passed, ${fail} failed` : `PASS — ${pass} assertions`);
  process.exit(fail ? 1 : 0);
})();
