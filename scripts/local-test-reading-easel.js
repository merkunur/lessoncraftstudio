#!/usr/bin/env node
/* =====================================================================
   local-test-reading-easel.js — the local Definition-of-Done.
   Every claim measured in a real browser against the rendered DOM.

   visual-qa-activity.js resolves only ids declared in a *-activities.json
   manifest, so it cannot see a free-play tool (local-test-heart-words.js
   :4-8 records the same). SECTION L8 is the substitute.

     L1 mounts: the line, a tappable gap between every pair of words
     L2 ⭐ THE TWO READINGS, on the audio spy: the exact utterance for
        each, every call type:'ui', and — stripping punctuation — both
        are the line. Same words, new grouping, measured on what the
        browser was actually asked to say
     L3 the scoops: tapping a gap adds a boundary, the arcs partition
        the line, and a WRAPPED group draws one segment per visual row
     L4 scoop by scoop: each tap speaks the next group and lights
        exactly that group — sync by construction, no timers
     L5 the teacher's line: typing replaces it, scoops reset, and an
        injection attempt renders as text and executes nothing
     L6 no voice: the 🔇 line appears and nothing is spoken
     L7 free vs subscriber: the line library and print gate with the
        exact CTA
     L8 the sweep 320-1366 — resting FITS at desktop, taps >=44, text
        >=14px, zero console errors

   Usage: node scripts/local-test-reading-easel.js [--shot]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
const SHOT_DIR = path.join(ROOT, 'docs', 'audit-results', 'reading-easel', 'qa');
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
  await page.evaluateOnNewDocument((premium, noVoice) => {
    try { localStorage.clear(); } catch (_) {}
    if (premium) { try { localStorage.setItem('accessToken', 'harness'); } catch (_) {} }
    window.print = function () { window.__printed = (window.__printed || 0) + 1; };
    /* ⚠ THE AUDIO SPY — the platform idiom (local-test-story-line.js:92).
       It records what the tool ASKED to say, which is the only way to
       assert the two readings without a speaker. */
    window.__spoken = [];
    const install = () => {
      if (!window.LCSAudio) return false;
      window.LCSAudio.speak = function (o2) { window.__spoken.push(o2); };
      window.LCSAudio.cancel = function () {};
      window.LCSAudio._loadInventory = function () { return Promise.resolve({}); };
      return true;
    };
    if (!install()) {
      const iv = setInterval(() => { if (install()) clearInterval(iv); }, 10);
      setTimeout(() => clearInterval(iv), 5000);
    }
    /* a device that HAS voices, but none for this language */
    if (noVoice) {
      try {
        Object.defineProperty(window.speechSynthesis, 'getVoices',
          { value: () => [{ lang: 'zz-ZZ', name: 'Nowhere' }], configurable: true });
      } catch (_) {}
    }
  }, !!o.premium, !!o.noVoice);
  page._errs = [];
  page.on('console', (m) => { if (m.type() === 'error' && !/404|net::ERR/.test(m.text())) page._errs.push(m.text()); });
  page.on('pageerror', (e) => page._errs.push(String(e)));
  return page;
}

const words = (p) => p.evaluate(() => Array.from(document.querySelectorAll('.rde-word')).map((e) => e.textContent));
const spoken = (p) => p.evaluate(() => window.__spoken.slice());
const clearSpy = (p) => p.evaluate(() => { window.__spoken.length = 0; });
const clickChip = (p, text) => p.evaluate((t) => {
  const b = Array.from(document.querySelectorAll('.rde-chip')).find((x) => x.textContent === t);
  if (!b) return false;
  b.click();
  return true;
}, text);
/* punctuation-blind comparison, the same rule the tool uses */
const wordsOnly = (s) => String(s || '').replace(/[,;:.!?…—]+/g, ' ').replace(/\s+/g, ' ').trim();

const PORT = 5455;

(async () => {
  const server = serve();
  await new Promise((r) => server.listen(PORT, r));
  const BASE = `http://127.0.0.1:${PORT}`;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const open = async (o) => {
    const p = await newPage(browser, o || {});
    await p.setViewport({ width: (o && o.w) || 1024, height: (o && o.h) || 900 });
    await p.goto(BASE + '/reading-easel.html?lang=en&embed=1', { waitUntil: 'domcontentloaded' });
    await p.waitForSelector('.rde-wrap', { timeout: 8000 });
    await wait(600);
    return p;
  };

  /* ---------------- L1 ---------------- */
  console.log('[L1 the apparatus]');
  const p = await open({ premium: true });
  const s1 = await p.evaluate(() => ({
    words: document.querySelectorAll('.rde-word').length,
    gaps: document.querySelectorAll('.rde-gap').length,
    chips: Array.from(document.querySelectorAll('.rde-chip')).map((b) => b.textContent),
    box: !!document.querySelector('.rde-linebox[aria-label]')
  }));
  is(s1.words === 6, `the starter line is on the easel (${s1.words} words)`);
  is(s1.gaps === s1.words - 1, `a tappable gap between every pair (${s1.gaps} for ${s1.words} words)`);
  is(s1.box, 'the line region is named for a screen reader');
  ['Read it like a robot', 'Read it in scoops', 'Scoop by scoop', 'Change the line'].forEach((c) =>
    is(s1.chips.indexOf(c) > -1, `chip present: ${c}`));

  /* ---------------- L2 the two readings ---------------- */
  console.log('[L2 the two readings, on the spy]');
  /* put one scoop in: after word 3 */
  await p.evaluate(() => document.querySelectorAll('.rde-gap')[2].click());
  await wait(250);
  const line = (await words(p)).join(' ');
  await clearSpy(p);
  await clickChip(p, 'Read it like a robot');
  await wait(200);
  const robot = (await spoken(p))[0] || {};
  await clearSpy(p);
  await clickChip(p, 'Read it in scoops');
  await wait(200);
  const scoop = (await spoken(p))[0] || {};

  is(!!robot.text && !!scoop.text, 'both readings spoke');
  is(robot.type === 'ui' && scoop.type === 'ui', `both are type:'ui' (${robot.type}/${scoop.type})`);
  is(robot.text !== scoop.text, 'the two readings are genuinely different strings');
  is(wordsOnly(robot.text) === wordsOnly(line), `⭐ the robot reading is the same words — "${robot.text}"`);
  is(wordsOnly(scoop.text) === wordsOnly(line), `⭐ the scooped reading is the same words — "${scoop.text}"`);
  const seps = (s) => (String(s).match(/,/g) || []).length;
  is(seps(robot.text) > seps(scoop.text),
    `the robot reading is choppier (${seps(robot.text)} breaks vs ${seps(scoop.text)})`);
  is(robot.rate < scoop.rate, `and slower (${robot.rate} vs ${scoop.rate})`);

  /* ---------------- L3 the scoops ---------------- */
  console.log('[L3 the scoops]');
  const s3 = await p.evaluate(() => {
    const cells = Array.from(document.querySelectorAll('.rde-word'));
    const arcs = Array.from(document.querySelectorAll('.rde-arc'));
    const rows = new Set(cells.map((c) => Math.round(c.getBoundingClientRect().top)));
    /* every word must sit under exactly one arc segment on its own row */
    const covered = cells.map((c) => {
      const r = c.getBoundingClientRect();
      const mid = (r.left + r.right) / 2;
      return arcs.filter((a) => {
        const ar = a.getBoundingClientRect();
        return mid >= ar.left - 3 && mid <= ar.right + 3 && Math.abs(ar.top - r.bottom) < 30;
      }).length;
    });
    return { arcs: arcs.length, rows: rows.size, covered, cuts: document.querySelectorAll('.rde-cut').length };
  });
  is(s3.cuts === 1, `one boundary is marked (${s3.cuts})`);
  is(s3.arcs === 2, `two scoops are drawn (${s3.arcs})`);
  is(s3.covered.every((n) => n === 1), `every word sits under exactly one scoop (${s3.covered.join(',')})`);
  /* a long line WRAPS — a group crossing the break must draw one segment per row */
  await clickChip(p, 'Change the line');
  await wait(250);
  await p.evaluate(() => {
    const i = document.querySelector('.rde-input');
    i.value = 'The enormous spotted elephant wandered slowly along the dusty winding road today';
    i.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
  });
  await wait(350);
  await p.setViewport({ width: 420, height: 900 });
  await wait(350);
  const bare = await p.evaluate(() => document.querySelectorAll('.rde-arc').length);
  is(bare === 0, 'an unscooped line carries NO arc — the tool proposes no phrasing of its own');
  /* now scoop it, so a group actually straddles the line break */
  await p.evaluate(() => document.querySelectorAll('.rde-gap')[5].click());
  await wait(300);
  const s3b = await p.evaluate(() => {
    const cells = Array.from(document.querySelectorAll('.rde-word'));
    const arcs = Array.from(document.querySelectorAll('.rde-arc'));
    const rows = new Set(cells.map((c) => Math.round(c.getBoundingClientRect().top)));
    const covered = cells.map((c) => {
      const r = c.getBoundingClientRect();
      const mid = (r.left + r.right) / 2;
      return arcs.filter((a) => {
        const ar = a.getBoundingClientRect();
        return mid >= ar.left - 3 && mid <= ar.right + 3 && Math.abs(ar.top - r.bottom) < 30;
      }).length;
    });
    return { rows: rows.size, arcs: arcs.length, covered };
  });
  is(s3b.rows > 1, `the long line wraps to ${s3b.rows} rows`);
  is(s3b.arcs >= s3b.rows, `a wrapped group draws one segment per visual row (${s3b.arcs} segments over ${s3b.rows} rows)`);
  is(s3b.covered.every((n) => n === 1), `and every word is still under exactly one segment (${s3b.covered.join(',')})`);
  await p.setViewport({ width: 1024, height: 900 });
  await wait(300);

  /* ---------------- L4 scoop by scoop ---------------- */
  console.log('[L4 scoop by scoop]');
  await clickChip(p, 'Change the line');
  await wait(250);
  await p.evaluate(() => {
    const i = document.querySelector('.rde-input');
    i.value = 'The cat sat on my lap';
    i.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
  });
  await wait(300);
  await p.evaluate(() => document.querySelectorAll('.rde-gap')[2].click());
  await wait(250);
  await clearSpy(p);
  await clickChip(p, 'Scoop by scoop');
  await wait(250);
  const step1 = await p.evaluate(() => ({
    /* the lit run includes the GAPS inside the group (that is the point —
       one band, not one box per word), so read the words specifically */
    lit: Array.from(document.querySelectorAll('.rde-word.rde-lit')).map((e) => e.textContent).join(' '),
    band: Array.from(document.querySelectorAll('.rde-lit')).length,
    said: (window.__spoken[window.__spoken.length - 1] || {}).text
  }));
  is(step1.said === 'The cat sat', `first tap speaks group 1 — "${step1.said}"`);
  is(step1.lit === 'The cat sat', `and lights exactly that group — "${step1.lit}"`);
  /* ⚠ the highlight must be ONE BAND: 3 words + the 2 gaps between them,
     so the group reads as a phrase and not as three lit words */
  is(step1.band === 5, `the band is continuous across the group (${step1.band} lit elements for 3 words)`);
  await clickChip(p, 'Next scoop');
  await wait(250);
  const step2 = await p.evaluate(() => ({
    /* the lit run includes the GAPS inside the group (that is the point —
       one band, not one box per word), so read the words specifically */
    lit: Array.from(document.querySelectorAll('.rde-word.rde-lit')).map((e) => e.textContent).join(' '),
    band: Array.from(document.querySelectorAll('.rde-lit')).length,
    said: (window.__spoken[window.__spoken.length - 1] || {}).text
  }));
  is(step2.said === 'on my lap', `second tap speaks group 2 — "${step2.said}"`);
  is(step2.lit === 'on my lap', `and the light moved with it — "${step2.lit}"`);
  await clickChip(p, 'Next scoop');
  await wait(250);
  const step3 = await p.evaluate(() => document.querySelectorAll('.rde-lit').length);
  is(step3 === 0, 'after the last scoop it resets, with nothing left lit');

  /* ---------------- L5 the teacher's line ---------------- */
  console.log('[L5 the teacher’s line]');
  await p.evaluate(() => document.querySelectorAll('.rde-gap')[1].click());
  await wait(200);
  await clickChip(p, 'Change the line');
  await wait(250);
  await p.evaluate(() => {
    const i = document.querySelector('.rde-input');
    i.value = 'We keep our boots by the door';
    i.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
  });
  await wait(300);
  const s5 = await p.evaluate(() => ({
    words: Array.from(document.querySelectorAll('.rde-word')).map((e) => e.textContent).join(' '),
    cuts: document.querySelectorAll('.rde-cut').length
  }));
  is(s5.words === 'We keep our boots by the door', `the teacher’s line is on the easel — "${s5.words}"`);
  is(s5.cuts === 0, 'and it arrives unscooped — the old scoops did not carry over');

  /* ⚠ an injection attempt must render as text and execute nothing */
  await clickChip(p, 'Change the line');
  await wait(250);
  await p.evaluate(() => {
    const i = document.querySelector('.rde-input');
    i.value = 'hello <img src=x onerror="window.__pwned=1"> world';
    i.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
  });
  await wait(400);
  const s5b = await p.evaluate(() => ({
    pwned: !!window.__pwned,
    imgs: document.querySelectorAll('.rde-line img').length,
    text: Array.from(document.querySelectorAll('.rde-word')).map((e) => e.textContent).join(' ')
  }));
  is(!s5b.pwned, 'an injection attempt did not execute');
  is(s5b.imgs === 0, 'and created no element');
  is(/<img/.test(s5b.text), `it is on the easel as literal text — "${s5b.text.slice(0, 40)}…"`);
  await p.close();

  /* ---------------- L6 no voice ---------------- */
  console.log('[L6 a device with no voice for this language]');
  const nv = await open({ premium: true, noVoice: true });
  await wait(500);
  const s6 = await nv.evaluate(() => ({
    note: (document.querySelector('.rde-voicemiss') || {}).textContent || null
  }));
  is(!!s6.note && /\u{1F507}/u.test(s6.note), `the 🔇 line explains the silence — "${(s6.note || '').slice(0, 52)}…"`);
  await clearSpy(nv);
  await clickChip(nv, 'Read it in scoops');
  await wait(250);
  const said6 = await spoken(nv);
  is(said6.length === 0, 'and nothing was spoken — better silence than the wrong phonology');
  const s6b = await nv.evaluate(() => document.querySelectorAll('.rde-word').length);
  is(s6b === 6, 'the line is still shown, so the lesson still works without audio');
  await nv.close();

  /* ---------------- L7 free vs subscriber ---------------- */
  console.log('[L7 what is free]');
  const free = await open({});
  await wait(900);
  await clickChip(free, 'Change the line');
  await wait(300);
  const f7 = await free.evaluate(() => ({
    starters: document.querySelectorAll('.rde-starter').length,
    locked: document.querySelectorAll('.rde-locked').length
  }));
  is(f7.starters === 3, `a free teacher gets the first three lines (${f7.starters})`);
  is(f7.locked >= 1, 'and sees that there are more');
  await free.evaluate(() => {
    const l = Array.from(document.querySelectorAll('.rde-chip')).find((x) => /^\+ /.test(x.textContent));
    if (l) l.click();
  });
  await wait(300);
  const g7 = await free.evaluate(() => {
    const g = document.querySelector('.rde-gate');
    const a = g && g.querySelector('a');
    return { text: g ? g.textContent : null, href: a ? a.getAttribute('href') : null, target: a ? a.getAttribute('target') : null };
  });
  is(/Teacher plan/.test(g7.text || ''), `the library is gated: "${(g7.text || '').slice(0, 44)}"`);
  is(g7.href === '/en/pricing?from=tool-reading-easel', `CTA exact: ${g7.href}`);
  is(g7.target === '_top', 'and it escapes the iframe');
  /* the core act stays free */
  await clearSpy(free);
  await clickChip(free, 'Read it in scoops');
  await wait(250);
  is((await spoken(free)).length === 1, 'reading the line is free');
  await free.close();

  const paid = await open({ premium: true });
  await wait(900);
  await clickChip(paid, 'Change the line');
  await wait(300);
  const p7 = await paid.evaluate(() => ({
    starters: document.querySelectorAll('.rde-starter').length,
    locked: document.querySelectorAll('.rde-locked').length
  }));
  is(p7.starters === 8, `a subscriber gets the whole library (${p7.starters})`);
  is(p7.locked === 0, 'with nothing locked');
  await clickChip(paid, 'Change the line');
  await wait(250);

  /* ---------------- L8 the sweep ---------------- */
  console.log('[L8 the sweep]');
  for (const [w, h] of VIEWPORTS) {
    await paid.setViewport({ width: w, height: h });
    await wait(420);
    const m = await paid.evaluate((MIN_TAP_, MIN_TEXT_) => {
      const controls = Array.from(document.querySelectorAll('.rde-chip,.rde-gap,button'))
        .filter((e) => e.getBoundingClientRect().width > 0);
      if (!controls.length) return { noControls: true };
      const smallTap = [], tiny = [];
      controls.forEach((e) => {
        const r = e.getBoundingClientRect();
        if (r.height < MIN_TAP_ - 0.5) smallTap.push((e.className || e.tagName) + ' ' + Math.round(r.height));
      });
      Array.from(document.querySelectorAll('.rde-wrap *')).forEach((e) => {
        const txt = Array.from(e.childNodes).some((n) => n.nodeType === 3 && n.textContent.trim());
        if (!txt) return;
        const fs_ = parseFloat(getComputedStyle(e).fontSize);
        if (fs_ < MIN_TEXT_ - 0.5) tiny.push((e.className || e.tagName) + ' ' + fs_);
      });
      const lowest = controls.reduce((b, e) => Math.max(b, e.getBoundingClientRect().bottom), 0);
      return {
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        lowest: Math.round(lowest), n: controls.length, smallTap, tiny
      };
    }, MIN_TAP, MIN_TEXT);
    if (m.noControls) { bad(`${w}x${h}: found NO controls`); continue; }
    is(m.overflow <= 2, `${w}x${h}: no horizontal overflow (${m.overflow}px)`);
    is(m.lowest <= h + 8, `${w}x${h}: all ${m.n} controls FIT (lowest ${m.lowest} <= ${h})`);
    is(m.smallTap.length === 0, `${w}x${h}: taps >= ${MIN_TAP}px${m.smallTap.length ? ' — ' + m.smallTap.slice(0, 3).join(', ') : ''}`);
    is(m.tiny.length === 0, `${w}x${h}: text >= ${MIN_TEXT}px${m.tiny.length ? ' — ' + m.tiny.slice(0, 3).join(', ') : ''}`);
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
