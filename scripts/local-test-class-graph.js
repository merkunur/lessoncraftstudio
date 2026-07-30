#!/usr/bin/env node
/* =====================================================================
   local-test-class-graph.js — the local Definition-of-Done.
   Every claim measured in a real browser against the rendered DOM.

   visual-qa-activity.js resolves only ids declared in a *-activities.json
   manifest, so it cannot see a free-play tool (local-test-heart-words.js
   :4-8 records the same). SECTION L8 is the substitute.

     L1 mounts: the question, a column per answer, a vote button per answer
     L2 ⭐ THE BAR IS THE PILE — measured on the RENDERED elements at
        several counts and both densities. Not computed in the model:
        read off the page, which is where a drift would actually show
     L3 the morph is lossless — flip four times and every count is
        unchanged, which is what makes "is it still the same?" a yes
     L4 one tap puts exactly one stamp in the right column; undo takes
        exactly one back
     L5 THE NUMERAL CURTAIN — not one digit anywhere on the board before
        the teacher reveals, and the right digits after
     L6 an injection attempt in the question AND in an answer label
        renders as text and executes nothing
     L7 free reaches FOUR answers (2.MD.D.10) and the fifth is the wall,
        with the exact CTA — the tool opens on three, so a free teacher's
        add must work once rather than be locked on arrival
     L9 ⭐ ADD AN ANSWER ACTUALLY ADDS A ROW, typing survives it, and
        editing never costs the class its votes. This is the assertion
        whose absence let a dead button ship past five green suites
     L8 the sweep 320-1366 — resting FITS at desktop, taps >=44, text
        >=14px, zero console errors

   Usage: node scripts/local-test-class-graph.js [--shot]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
const SHOT_DIR = path.join(ROOT, 'docs', 'audit-results', 'class-graph', 'qa');
const SHOT = process.argv.includes('--shot');
if (SHOT) fs.mkdirSync(SHOT_DIR, { recursive: true });

const VIEWPORTS = [[320, 640], [360, 740], [412, 820], [768, 1000], [1024, 900], [1366, 900]];
const MIN_TAP = 44, MIN_TEXT = 14;

let PASS = 0, FAIL = 0;
const ok = (m) => { PASS++; console.log('  ok    ' + m); };
const bad = (m) => { FAIL++; console.error('  FAIL  ' + m); };
const is = (c, m) => c ? ok(m) : bad(m);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };

function serve() {
  return http.createServer((req, res) => {
    const f = path.join(MINI, path.basename(req.url.split('?')[0]));
    fs.readFile(f, (e, b) => {
      if (e) { res.writeHead(404); res.end('404'); return; }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
      res.end(b);
    });
  });
}

async function newPage(browser, o) {
  o = o || {};
  const page = await browser.newPage();
  await page.setCacheEnabled(false);
  await page.setRequestInterception(true);
  page.on('request', (r) => r.url().includes('/api/auth/me')
    ? r.respond({ status: 200, contentType: 'application/json',
        body: JSON.stringify(o.premium
          ? { user: { subscriptionTier: 'full' }, subscription: { status: 'active' } }
          : { user: { subscriptionTier: 'free' }, subscription: null }) })
    : r.continue());
  await page.evaluateOnNewDocument((premium) => {
    try { localStorage.clear(); } catch (_) {}
    if (premium) { try { localStorage.setItem('accessToken', 'harness'); } catch (_) {} }
    window.print = function () { window.__printed = (window.__printed || 0) + 1; };
  }, !!o.premium);
  page._errs = [];
  page.on('console', (m) => { if (m.type() === 'error' && !/404|net::ERR/.test(m.text())) page._errs.push(m.text()); });
  page.on('pageerror', (e) => page._errs.push(String(e)));
  return page;
}

const clickChip = (p, text) => p.evaluate((t) => {
  const b = Array.from(document.querySelectorAll('.cgr-chip')).find((x) => x.textContent === t);
  if (!b) return false;
  b.click();
  return true;
}, text);
/* vote n times in column ci */
const voteIn = async (p, ci, n) => {
  for (let i = 0; i < n; i++) {
    await p.evaluate((c) => { document.querySelectorAll('.cgr-vote')[c].click(); }, ci);
    await wait(40);
  }
  await wait(150);
};
/* the measurement that matters: read BOTH heights off the page */
const heights = (p) => p.evaluate(() => Array.from(document.querySelectorAll('.cgr-stack')).map((s) => {
  const sr = s.getBoundingClientRect();
  const br = s.querySelector('.cgr-bar').getBoundingClientRect();
  return {
    n: s.querySelectorAll('.cgr-stamp').length,
    pile: Math.round(sr.height * 100) / 100,
    bar: Math.round(br.height * 100) / 100
  };
}));

const PORT = 5471;

(async () => {
  const server = serve();
  await new Promise((r) => server.listen(PORT, r));
  const BASE = `http://127.0.0.1:${PORT}`;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const open = async (o) => {
    const p = await newPage(browser, o || {});
    await p.setViewport({ width: (o && o.w) || 1024, height: (o && o.h) || 900 });
    await p.goto(BASE + '/class-graph.html?lang=en&embed=1', { waitUntil: 'domcontentloaded' });
    await p.waitForSelector('.cgr-wrap', { timeout: 8000 });
    await wait(600);
    return p;
  };

  /* ---------------- L1 ---------------- */
  console.log('[L1 the apparatus]');
  const p = await open({ premium: true });
  const s1 = await p.evaluate(() => ({
    q: (document.querySelector('.cgr-question') || {}).textContent || '',
    cols: document.querySelectorAll('.cgr-col').length,
    votes: document.querySelectorAll('.cgr-vote').length,
    labels: Array.from(document.querySelectorAll('.cgr-catlabel')).map((e) => e.textContent),
    bars: document.querySelectorAll('.cgr-bar').length,
    named: !!document.querySelector('.cgr-board[aria-label]')
  }));
  is(s1.q.length > 0, `the question is on the board — "${s1.q}"`);
  is(s1.cols === 3, `a column per answer (${s1.cols})`);
  is(s1.votes === 3, `a vote button per answer (${s1.votes})`);
  is(s1.bars === 3, `every column already holds its bar, hidden (${s1.bars})`);
  is(s1.named, 'the board is named for a screen reader');
  is(s1.labels.join('|') === 'Walked|Car|Bus', `answers in the order the teacher wrote them — ${s1.labels.join(', ')}`);

  /* ---------------- L2 the bar is the pile ---------------- */
  console.log('[L2 the bar IS the pile]');
  await voteIn(p, 0, 5);
  await voteIn(p, 1, 2);
  await voteIn(p, 2, 9);
  let h = await heights(p);
  is(h.map((x) => x.n).join(',') === '5,2,9', `the votes landed (${h.map((x) => x.n).join(',')})`);
  let worst = h.reduce((a, x) => Math.max(a, Math.abs(x.bar - x.pile)), 0);
  is(worst <= 0.01, `⭐ as a pile: |bar - pile| = ${worst}px across ${h.length} columns`);
  await clickChip(p, 'Show the bars');
  await wait(450);
  h = await heights(p);
  worst = h.reduce((a, x) => Math.max(a, Math.abs(x.bar - x.pile)), 0);
  is(worst <= 0.01, `⭐ as bars: |bar - pile| = ${worst}px (heights ${h.map((x) => x.pile).join(', ')})`);
  const visible = await p.evaluate(() => {
    const s = document.querySelector('.cgr-stack');
    return {
      barOpacity: getComputedStyle(s.querySelector('.cgr-bar')).opacity,
      stampOpacity: getComputedStyle(s.querySelector('.cgr-stamp')).opacity
    };
  });
  is(Number(visible.barOpacity) > 0.9 && Number(visible.stampOpacity) < 0.1,
    `and the bar is what you see now (bar ${visible.barOpacity}, stamps ${visible.stampOpacity})`);
  /* push past the density threshold — the ruling and the stamp must stay in step */
  await clickChip(p, 'Show the children');
  await wait(300);
  await voteIn(p, 1, 11);
  h = await heights(p);
  worst = h.reduce((a, x) => Math.max(a, Math.abs(x.bar - x.pile)), 0);
  const dens = await p.evaluate(() => {
    const board = document.querySelector('.cgr-board');
    /* ⚠ getPropertyValue on a custom property returns the TOKEN, not the
       computed length — "clamp(19px,3.1vmin,30px)". Resolve it by letting
       the browser lay a probe out against the same variable. */
    const probe = document.createElement('div');
    probe.style.cssText = 'position:absolute;visibility:hidden;height:var(--cgr-unit);';
    board.appendChild(probe);
    const unit = probe.getBoundingClientRect().height;
    probe.remove();
    return {
      dense: /cgr-dense|cgr-vdense/.test(board.className),
      unit: Math.round(unit * 100) / 100,
      stamp: Math.round(document.querySelector('.cgr-stamp').getBoundingClientRect().height * 100) / 100
    };
  });
  is(worst <= 0.01, `⭐ past the density step: |bar - pile| = ${worst}px`);
  is(dens.dense, 'the board stepped down a density');
  is(Math.abs(dens.unit - dens.stamp) <= 0.01,
    `the ground ruling and the stamp share one resolved unit (${dens.unit}px vs ${dens.stamp}px)`);

  /* ---------------- L3 the morph is lossless ---------------- */
  console.log('[L3 lossless]');
  const before = (await heights(p)).map((x) => x.n).join(',');
  for (let i = 0; i < 4; i++) {
    await clickChip(p, i % 2 === 0 ? 'Show the bars' : 'Show the children');
    await wait(280);
  }
  await clickChip(p, 'Show the children');
  await wait(300);
  const after = (await heights(p)).map((x) => x.n).join(',');
  is(before === after, `four flips changed nothing — ${before} then ${after}`);

  /* ---------------- L4 one tap, one stamp ---------------- */
  console.log('[L4 one tap, one child]');
  const n0 = (await heights(p)).map((x) => x.n);
  await voteIn(p, 2, 1);
  const n1 = (await heights(p)).map((x) => x.n);
  is(n1[2] === n0[2] + 1 && n1[0] === n0[0] && n1[1] === n0[1],
    `one tap added exactly one stamp, in that column only (${n0.join(',')} -> ${n1.join(',')})`);
  await clickChip(p, 'Take one back');
  await wait(250);
  const n2 = (await heights(p)).map((x) => x.n);
  is(n2.join(',') === n0.join(','), `undo took exactly one back (${n2.join(',')})`);

  /* ---------------- L5 the numeral curtain ---------------- */
  console.log('[L5 the curtain]');
  const curtain = await p.evaluate(() => {
    const b = document.querySelector('.cgr-board');
    const txt = b.textContent || '';
    const aria = Array.from(b.querySelectorAll('*'))
      .map((e) => (e.getAttribute && e.getAttribute('aria-label')) || '').join(' ');
    return { digitsInText: /\d/.test(txt), digitsInAria: /\d/.test(aria), counts: b.querySelectorAll('.cgr-count').length };
  });
  is(curtain.counts === 0, 'no count element exists before the reveal');
  is(!curtain.digitsInText, 'not one digit is on the board');
  is(!curtain.digitsInAria, 'and none hidden in an aria label');
  await clickChip(p, 'Show the numbers');
  await wait(280);
  const shown = await p.evaluate(() => Array.from(document.querySelectorAll('.cgr-count')).map((e) => e.textContent).join(','));
  is(shown === n0.join(','), `the reveal shows the real counts — ${shown}`);
  await clickChip(p, 'Hide the numbers');
  await wait(250);
  is((await p.evaluate(() => document.querySelectorAll('.cgr-count').length)) === 0, 'and they go away again');

  /* ---------------- L6 the teacher's text ---------------- */
  console.log('[L6 the teacher’s text]');
  await clickChip(p, 'Change the question');
  await wait(300);
  await p.evaluate(() => {
    const q = document.querySelector('#cgr-q');
    const cats = document.querySelectorAll('.cgr-catinput');
    q.value = 'Pets? <img src=x onerror="window.__pwnedQ=1">';
    cats[0].value = '<img src=y onerror="window.__pwnedC=1">';
    cats[1].value = 'Dogs';
    q.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
  });
  await wait(500);
  const s6 = await p.evaluate(() => ({
    pwned: !!(window.__pwnedQ || window.__pwnedC),
    imgs: document.querySelectorAll('.cgr-wrap img').length,
    q: (document.querySelector('.cgr-question') || {}).textContent || '',
    labels: Array.from(document.querySelectorAll('.cgr-catlabel')).map((e) => e.textContent),
    votes: document.querySelectorAll('.cgr-stamp').length
  }));
  is(!s6.pwned, 'neither injection executed');
  is(s6.imgs === 0, 'and neither created an element');
  is(/<img/.test(s6.q) && /<img/.test(s6.labels[0]), 'both are on the board as literal text');
  is(s6.votes === 0, 'a new question arrived with no votes carried over');
  await p.close();

  /* ---------------- L9 ⭐ THE ADD BUTTON ACTUALLY ADDS ----------------
     The bug this file did not catch: "Add an answer" pushed '' into
     setSetup, setSetup drops blanks, so the click could not change
     anything. Assert the ROW COUNT, and assert the votes survive
     editing — the old handler committed through setSetup, which clears
     them, so adding an answer silently threw away the class's survey. */
  console.log('[L9 the add button]');
  const add = await open({ premium: true });
  await wait(900);
  await clickChip(add, 'Change the question');
  await wait(350);
  const r0 = await add.evaluate(() => document.querySelectorAll('.cgr-catrow').length);
  is(r0 === 3, `the editor opens on three rows (${r0})`);
  await clickChip(add, 'Add an answer');
  await wait(320);
  const r1 = await add.evaluate(() => document.querySelectorAll('.cgr-catrow').length);
  is(r1 === 4, `⭐ clicking Add an answer adds a row (${r0} -> ${r1})`);
  /* type into it and commit — the blank must become a real column */
  await add.evaluate(() => {
    const ins = document.querySelectorAll('.cgr-catinput');
    ins[ins.length - 1].value = 'Scooter';
  });
  await clickChip(add, 'Put it on the board');
  await wait(380);
  const cols = await add.evaluate(() => Array.from(document.querySelectorAll('.cgr-col'))
    .map((c) => (c.textContent || '').trim()));
  is(cols.length === 4, `and the board grows to four columns (${cols.length})`);
  is(cols.some((t) => /Scooter/.test(t)), 'carrying the answer the teacher typed');
  /* typing is not lost when a row is added mid-edit */
  await clickChip(add, 'Change the question');
  await wait(320);
  await add.evaluate(() => { document.querySelectorAll('.cgr-catinput')[0].value = 'On foot'; });
  await clickChip(add, 'Add an answer');
  await wait(320);
  const kept = await add.evaluate(() => document.querySelectorAll('.cgr-catinput')[0].value);
  is(kept === 'On foot', `a keystroke survives the add (\"${kept}\")`);
  await add.close();

  /* the votes must survive the editor */
  const keepv = await open({ premium: true });
  await wait(900);
  await voteIn(keepv, 0, 3);
  await voteIn(keepv, 1, 2);
  const v0 = await keepv.evaluate(() => document.querySelectorAll('.cgr-stamp').length);
  await clickChip(keepv, 'Change the question');
  await wait(320);
  await clickChip(keepv, 'Add an answer');
  await wait(300);
  await clickChip(keepv, 'Put it on the board');
  await wait(380);
  const v1 = await keepv.evaluate(() => document.querySelectorAll('.cgr-stamp').length);
  is(v0 === 5 && v1 === 5, `⭐ opening the editor does not cost the class its votes (${v0} -> ${v1})`);
  /* a one-column survey has nothing to compare and must be refused */
  await clickChip(keepv, 'Change the question');
  await wait(320);
  await keepv.evaluate(() => {
    document.querySelectorAll('.cgr-catinput').forEach((x, i) => { x.value = i ? '' : 'Only one'; });
  });
  await clickChip(keepv, 'Put it on the board');
  await wait(350);
  const stillOpen = await keepv.evaluate(() => !!document.querySelector('.cgr-editor'));
  is(stillOpen, 'a single answer is refused — a survey needs two to compare');
  await keepv.close();

  /* ---------------- L7 what is free ---------------- */
  console.log('[L7 what is free]');
  const free = await open({});
  await wait(900);
  await clickChip(free, 'Change the question');
  await wait(350);
  const f7 = await free.evaluate(() => ({
    rows: document.querySelectorAll('.cgr-catrow').length,
    locked: document.querySelectorAll('.cgr-locked').length
  }));
  is(f7.rows === 3, `a free teacher opens on three answers (${f7.rows})`);
  /* ⚠ FREE IS FOUR (2.MD.D.10 "up to four categories"), and the tool opens
     on three — so the free teacher's add must WORK once before the wall.
     At three-free the very first affordance was locked on arrival. */
  const addFree = await free.evaluate(() => {
    const b = Array.from(document.querySelectorAll('.cgr-chip')).find((x) => x.textContent === 'Add an answer');
    return b ? b.className : null;
  });
  is(addFree !== null && !/cgr-locked/.test(addFree), 'and Add an answer is open to them, not locked on arrival');
  await clickChip(free, 'Add an answer');
  await wait(320);
  const f7b = await free.evaluate(() => ({
    rows: document.querySelectorAll('.cgr-catrow').length,
    locked: document.querySelectorAll('.cgr-chip.cgr-locked').length
  }));
  is(f7b.rows === 4, `a free teacher reaches four answers (${f7b.rows})`);
  is(f7b.locked >= 1, 'and the fifth is where the wall is');
  await free.evaluate(() => {
    const b = Array.from(document.querySelectorAll('.cgr-chip.cgr-locked')).find((x) => /Add an answer/.test(x.textContent));
    if (b) b.click();
  });
  await wait(300);
  const g7 = await free.evaluate(() => {
    const g = document.querySelector('.cgr-gate');
    const a = g && g.querySelector('a');
    return { text: g ? g.textContent : null, href: a ? a.getAttribute('href') : null, target: a ? a.getAttribute('target') : null };
  });
  is(/Teacher plan/.test(g7.text || ''), `a fifth answer is gated: "${(g7.text || '').slice(0, 46)}"`);
  is(g7.href === '/en/pricing?from=tool-class-graph', `CTA exact: ${g7.href}`);
  is(g7.target === '_top', 'and it escapes the iframe');
  await free.close();

  const paid = await open({ premium: true });
  await wait(900);
  await voteIn(paid, 0, 3);
  await voteIn(paid, 1, 1);

  /* ---------------- L8 the sweep ---------------- */
  console.log('[L8 the sweep]');
  for (const [w, h2] of VIEWPORTS) {
    await paid.setViewport({ width: w, height: h2 });
    await wait(420);
    const m = await paid.evaluate((MIN_TAP_, MIN_TEXT_) => {
      const controls = Array.from(document.querySelectorAll('.cgr-chip,.cgr-vote,button'))
        .filter((e) => e.getBoundingClientRect().width > 0);
      if (!controls.length) return { noControls: true };
      const smallTap = [], tiny = [];
      controls.forEach((e) => {
        const r = e.getBoundingClientRect();
        if (r.height < MIN_TAP_ - 0.5) smallTap.push((e.className || e.tagName) + ' ' + Math.round(r.height));
      });
      Array.from(document.querySelectorAll('.cgr-wrap *')).forEach((e) => {
        if (!Array.from(e.childNodes).some((n) => n.nodeType === 3 && n.textContent.trim())) return;
        const fs_ = parseFloat(getComputedStyle(e).fontSize);
        if (fs_ < MIN_TEXT_ - 0.5) tiny.push((e.className || e.tagName) + ' ' + fs_);
      });
      const lowest = controls.reduce((b, e) => Math.max(b, e.getBoundingClientRect().bottom), 0);
      return {
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        lowest: Math.round(lowest), n: controls.length, smallTap, tiny
      };
    }, MIN_TAP, MIN_TEXT);
    if (m.noControls) { bad(`${w}x${h2}: found NO controls`); continue; }
    is(m.overflow <= 2, `${w}x${h2}: no horizontal overflow (${m.overflow}px)`);
    is(m.lowest <= h2 + 8, `${w}x${h2}: all ${m.n} controls FIT (lowest ${m.lowest} <= ${h2})`);
    is(m.smallTap.length === 0, `${w}x${h2}: taps >= ${MIN_TAP}px${m.smallTap.length ? ' — ' + m.smallTap.slice(0, 3).join(', ') : ''}`);
    is(m.tiny.length === 0, `${w}x${h2}: text >= ${MIN_TEXT}px${m.tiny.length ? ' — ' + m.tiny.slice(0, 3).join(', ') : ''}`);
    if (SHOT && [360, 768, 1024].includes(w)) await paid.screenshot({ path: path.join(SHOT_DIR, `sweep-${w}.png`), fullPage: true });
  }
  is(paid._errs.length === 0, `zero console errors${paid._errs.length ? ' — ' + paid._errs[0] : ''}`);
  await paid.close();

  await browser.close();
  server.close();
  console.log('');
  console.log(`${PASS} passed, ${FAIL} failed`);
  process.exit(FAIL ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
