#!/usr/bin/env node
/* =====================================================================
   audit-learning-clock-locale-layout.js — 11 locales x 6 viewports.

   This measures the CHROME — the mode switch, the step ladder, the hint
   band, the speech bubble, the gate line — because that is where a long
   word breaks a layout. This tool is an unusually hard case for it: the
   bubble has to hold `dreiviertel 3`, `un cuarto para las ocho` and
   `viittä vaille kaksi`, and the gate lines run to a full sentence in
   every language.

   ⚠ MEASURED AGAINST THE CARD, not against an inner row — `overflow-x`
   on a wrapper absorbs the evidence and the check passes on a layout that
   is visibly broken.
   ⚠⚠ AND THE GLOBAL AND THE SELECTORS ARE THIS TOOL'S. Two of #43's
   locale gates were clones that silently drove the PREVIOUS tool's global
   with the previous tool's state shape; had the names matched, eleven
   locales and 396 cells would have been certified off one untouched
   opening frame. The first assertion here is that `window.LearningClock`
   exists and carries this tool's own id.

   Run:  node scripts/audit-learning-clock-locale-layout.js
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };
const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const WIDTHS = [320, 360, 412, 768, 1024, 1366];

const sleep = ms => new Promise(r => setTimeout(r, ms));
let checks = 0;
const fails = [];
const margins = [];
function is(c, m) { checks++; if (!c) { fails.push(m); console.log('  x ' + m); } }

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p === '/') p = '/learning-clock.html';
    if (p.startsWith('/mini-tools/')) p = p.slice('/mini-tools/'.length); else p = p.replace(/^\//, '');
    fs.readFile(path.join(MINI, p), (e, b) => {
      if (e) { res.statusCode = 404; res.end('nf'); return; }
      res.setHeader('Content-Type', MIME[path.extname(p)] || 'application/octet-stream');
      res.end(b);
    });
  });
}

/* the seven states that actually change the chrome */
const STATES = [
  ['explore', T => { T.mode = 'explore'; T.total = 150; T.render(); }],
  ['explore-am', T => { T.pm = false; T.render(); }],
  ['minute-step', T => { T.pm = true; T.step = '5'; T.api.settings.minuteRing = true; T.render(); }],
  ['rings-on', T => { T.api.settings.ring24 = true; T.render(); }],
  ['task-set', T => { T.api.settings.ring24 = false; T.step = '30'; T.mode = 'task'; T._nextTask(); }],
  ['task-miss', T => { T.task.target = 150; T.task.phase = 'set'; T.total = 200; T._checkTask(); }],
  ['task-done', T => { T.task.phase = 'set'; T.total = T.task.target; T._checkTask(); }],
  ['elapsed-idle', T => { T.mode = 'elapsed'; T.elapsed = { start: null, end: null }; T.render(); }],
  ['elapsed-run', T => { T.elapsed = { start: 710, end: null }; T.total = 20; T.render(); }],
  ['gate', T => { T.mode = 'explore'; T.premium = false; T.render(); T._showGate('gateGran'); }]
];
/* ⭐ THE NAMED SET, NOT A COUNT. A first version asserted ">= 4 distinct
   hint lines" — a number I picked — and failed all 66 cells on a CORRECT
   tool, because the eight states I happened to drive only reach three of
   the five hints. The requirement is that every authored hint is
   REACHABLE, so the states now cover all five and the assertion names
   them. */
const HINT_KEYS = ['hintDrag', 'hintTaskSet', 'hintTaskDone', 'hintElapsedA', 'hintElapsedB'];

(async () => {
  const srv = serve();
  await new Promise(r => srv.listen(0, r));
  const PORT = srv.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  let renders = 0;

  for (const loc of LOCALES) {
    for (const w of WIDTHS) {
      const page = await browser.newPage();
      await page.setViewport({ width: w, height: 2200, hasTouch: true });
      const errs = [];
      page.on('pageerror', e => errs.push(e.message));
      await page.goto(`http://127.0.0.1:${PORT}/mini-tools/learning-clock.html?lang=${loc}`, { waitUntil: 'networkidle0' });
      await page.waitForSelector('.lck-svg');
      /* ⚠⚠ THE CLONE GUARD */
      const who = await page.evaluate(() => (window.LearningClock && window.LearningClock.id) || 'MISSING');
      is(who === 'learning-clock', `${loc}@${w}: the global is this tool (got "${who}")`);
      await page.evaluate(() => { const T = window.LearningClock; T.premium = true; T.premiumKnown = true; T.render(); });
      await sleep(200);

      const seenHints = new Set();
      for (const [name, fn] of STATES) {
        /* the state driver crosses the bridge as SOURCE — a function
           cannot be serialised, and a first version silently passed
           `undefined` and drove nothing */
        await page.evaluate(f => { new Function('T', '(' + f + ')(T)')(window.LearningClock); }, fn.toString());
        await sleep(140);
        renders++;
        const m = await page.evaluate(() => {
          const card = document.querySelector('.lcs-app').getBoundingClientRect();
          const q = s => [...document.querySelectorAll(s)];
          let chipOver = 0, hintOver = 0, bubbleOver = 0;
          q('.lck-mode,.lck-step,.lck-chip,.lck-big,.lck-half,.lck-why,.lck-devariant').forEach(e => {
            const r = e.getBoundingClientRect();
            if (r.width) chipOver = Math.max(chipOver, r.right - card.right, card.left - r.left);
          });
          const h = document.querySelector('.lck-hint');
          if (h) { const r = h.getBoundingClientRect(); hintOver = Math.max(r.right - card.right, card.left - r.left); }
          const b = document.querySelector('.lck-bubbletext');
          if (b) { const r = b.getBoundingClientRect(); bubbleOver = Math.max(r.right - card.right, card.left - r.left); }
          const docOver = document.documentElement.scrollWidth - document.documentElement.clientWidth;
          /* the tightest chip margin, informational */
          let tight = 1e9;
          q('.lck-mode,.lck-step,.lck-chip,.lck-big').forEach(e => {
            const r = e.getBoundingClientRect();
            if (r.width) tight = Math.min(tight, card.right - r.right);
          });
          return {
            chipOver: Math.round(chipOver), hintOver: Math.round(hintOver), bubbleOver: Math.round(bubbleOver),
            docOver: Math.round(docOver), tight: Math.round(tight),
            hint: (document.querySelector('.lck-hint') || {}).textContent || '',
            gate: !!document.querySelector('.lck-gate')
          };
        });
        if (m.hint) seenHints.add(m.hint);
        is(m.docOver <= 0, `${loc}@${w} ${name}: horizontal overflow of ${m.docOver}px`);
        is(m.chipOver <= 0, `${loc}@${w} ${name}: a chip escapes the card by ${m.chipOver}px`);
        is(m.hintOver <= 0, `${loc}@${w} ${name}: the hint band escapes the card by ${m.hintOver}px`);
        is(m.bubbleOver <= 0, `${loc}@${w} ${name}: the bubble escapes the card by ${m.bubbleOver}px`);
        if (isFinite(m.tight)) margins.push({ k: `${loc}@${w} ${name}`, v: m.tight });
      }
      /* ⚠ a branch that is never reachable is a defect, not a saving */
      const wantHints = await page.evaluate(ks => ks.map(k => window.LearningClock.strings[k][window.LearningClock.api.lang]), HINT_KEYS);
      const missed = wantHints.filter(t => !seenHints.has(t));
      is(missed.length === 0, `${loc}@${w}: ${missed.length} of the 5 hint lines are unreachable: ${missed.join(' | ')}`);
      is(errs.length === 0, `${loc}@${w}: page errors — ${errs.slice(0, 1).join('')}`);
      await page.close();
    }
    console.log(`  ${loc} ok`);
  }

  await browser.close();
  srv.close();

  margins.sort((a, b) => a.v - b.v);
  console.log('\n  tightest chip margins (informational, not a failure):');
  margins.slice(0, 8).forEach(m => console.log(`    ${String(m.v).padStart(5)}px   ${m.k}`));

  console.log('');
  if (fails.length) { console.log(`FAIL — ${fails.length} of ${checks} checks across ${renders} renders`); process.exit(1); }
  console.log(`PASS — ${checks} checks across ${LOCALES.length} locales x ${WIDTHS.length} viewports (${renders} renders)`);
})().catch(e => { console.error(e); process.exit(1); });
