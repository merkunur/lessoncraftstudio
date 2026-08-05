#!/usr/bin/env node
/* =====================================================================
   live-verify-learning-clock.js — against PRODUCTION.

   "It mounts" is not the claim. This drives the tool's main control — a
   real finger drag of the minute hand — on the deployed file, in all
   eleven locales, and checks the things a local gate structurally cannot:
   that the deploy actually carried the new bytes, that the landing page
   resolves in every locale, and that the paid sheet is not reachable by a
   visitor who has not paid.

   Four inherited rules, each bought by a shipped defect:
   ⭐ RULE 1 — ASSERT NON-VACUITY FIRST. #40's gate keyed on an attribute
      the tool never emits, so every assertion compared two EMPTY
      NodeLists and the run was green about nothing.
   ⭐ RULE 2 — SCOPE EVERY CONTENT BAN TO THE TOOL'S OWN PROSE.
      `document.body.textContent` on a Next page carries the RSC
      flight-data, which serialises every sibling tool on the route; #40's
      ban read the RULER's own correct slug and condemned ten of eleven
      locales.
   ⭐ RULE 3 — WRITE ASSERTIONS FROM THE ARTEFACT, not from the plan's
      narrative.
   ⭐ RULE 4 — REACH CONTROLS BY INDEX, NEVER BY ENGLISH TEXT. "Print
      clock faces" contains "clock"; a text match finds the wrong chip and
      reports a defect in a working tool.
   ⚠ AND RETURN PLAIN NUMBERS FROM page.evaluate — a DOMRect's properties
      live on its prototype, so it serialises out as {} and every
      comparison silently becomes NaN.

   Run:  node scripts/live-verify-learning-clock.js
   ===================================================================== */
'use strict';
const puppeteer = require('puppeteer');
const path = require('path');

const HOST = 'https://www.lessoncraftstudio.com';
const MINI = HOST + '/mini-tools/learning-clock.html';
const TOOL = require(path.join(__dirname, '..', 'mini tools', 'learning-clock.js'));
const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const IDIOM = { en: 'half past 2', de: 'halb 3', fr: 'deux heures et demie', it: 'le due e mezza',
  es: 'las dos y media', pt: 'duas e meia', nl: 'half 3', sv: 'halv 3', da: 'halv 3',
  no: 'halv 3', fi: 'puoli 3' };

const sleep = ms => new Promise(r => setTimeout(r, ms));
let n = 0;
const fails = [];
function is(c, m) { if (c) { n++; } else { fails.push(m); console.log('  x ' + m); } }

/* ⚠ UNICODE LOOKAROUNDS, NEVER \b — it is ASCII-only even under /u and a
   ban beside an accented letter is born dead. */
const w = body => new RegExp('(?<!\\p{L})(?:' + body + ')(?!\\p{L})', 'iu');
const BAN_VERDICT = w('score|streak|countdown|nedtelling|nedtælling');

(async () => {
  console.log('[poison — the ban, both directions]');
  is(BAN_VERDICT.test('your score was 4'), 'MUST FIRE: English "score"');
  is(BAN_VERDICT.test('Der Countdown läuft'), 'MUST FIRE: German "Countdown"');
  is(!BAN_VERDICT.test('{h} timer og {m} minutter'), 'MUST PASS: Danish for hours');
  is(!BAN_VERDICT.test('Zifferblätter ausdrucken'), 'MUST PASS: correct German');

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  /* ---- 1. the deploy carried the new bytes -------------------------- */
  console.log('\n[1] the deployed file is the rebuilt one');
  {
    const page = await browser.newPage();
    const res = await page.goto(MINI + '?lang=en', { waitUntil: 'networkidle0', timeout: 60000 });
    is(res && res.status() === 200, 'the standalone tool page is 200');
    const facts = await page.evaluate(() => {
      const T = window.LearningClock;
      return {
        hasModel: !!(T && typeof T.applyDelta === 'function' && typeof T.startPoseFor === 'function'),
        free: T && T.FREE_STEPS ? T.FREE_STEPS.join(',') : '',
        grips: document.querySelectorAll('.lck-grip').length,
        hint: (document.querySelector('.lck-hint') || {}).textContent || '',
        faceTA: getComputedStyle(document.querySelector('.lck-face')).touchAction,
        svgTA: getComputedStyle(document.querySelector('.lck-svg')).touchAction,
        viewBox: document.querySelector('.lck-svg').getAttribute('viewBox'),
        sheet: document.querySelectorAll('.lck-sheet').length,
        paidClass: document.body.classList.contains('lck-paid')
      };
    });
    /* RULE 1 — non-vacuity before anything else */
    is(facts.grips === 2, `NON-VACUITY: two grips are on the page (got ${facts.grips})`);
    is(facts.hasModel, 'the deployed build exposes the pure model — this is the rebuilt file, not the old one');
    is(facts.viewBox === '0 0 1000 1000', `the 1000-unit viewBox shipped (got "${facts.viewBox}")`);
    is(facts.free === '60,30,15,5', `quarter hours and 5 minutes are free in production (got "${facts.free}")`);
    is(facts.faceTA === 'none' && facts.svgTA === 'none', 'touch-action:none is live on the face and the svg root');
    is(facts.hint.trim().length > 10, 'the hint band renders — the tool explains itself where the shell cannot');
    is(facts.sheet === 0 && !facts.paidClass, 'an un-entitled visitor gets NO print subtree and no paid body class');
    await page.close();
  }

  /* ---- 2. THE MAIN CONTROL, on production --------------------------- */
  console.log('\n[2] a real finger drag of the minute hand, on production');
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 412, height: 900, hasTouch: true, isMobile: true });
    await page.evaluateOnNewDocument(() => {
      window.__pe = [];
      ['pointerdown', 'pointermove', 'pointerup', 'pointercancel'].forEach(t =>
        document.addEventListener(t, e => window.__pe.push(t), true));
      if (window.speechSynthesis) window.speechSynthesis.speak = () => {};
    });
    const cdp = await page.target().createCDPSession();
    await page.goto(MINI + '?lang=en', { waitUntil: 'networkidle0', timeout: 60000 });
    await page.waitForSelector('.lck-svg');
    await sleep(500);
    /* plain numbers only — a DOMRect serialises out as {} */
    const g = await page.evaluate(() => {
      const r = document.querySelector('.lck-svg').getBoundingClientRect();
      return { cx: r.left + r.width / 2, cy: r.top + r.height / 2, s: r.width / 1000 };
    });
    is(g.s > 0, `NON-VACUITY: the dial has a laid-out box (scale ${g.s.toFixed(3)})`);
    const at = deg => ({ x: g.cx + Math.sin(deg * Math.PI / 180) * 418 * g.s, y: g.cy - Math.cos(deg * Math.PI / 180) * 418 * g.s });
    const before = await page.evaluate(() => window.LearningClock.total);
    const p0 = at(180);
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: p0.x, y: p0.y, radiusX: 12, radiusY: 12, force: 1 }] });
    await sleep(30);
    for (let i = 1; i <= 12; i++) {
      const p = at(180 + i * 15);
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: p.x, y: p.y, radiusX: 12, radiusY: 12, force: 1 }] });
      await sleep(16);
    }
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await sleep(220);
    const after = await page.evaluate(() => window.LearningClock.total);
    const pe = await page.evaluate(() => window.__pe.slice());
    is(after !== before, `THE HANDS MOVE ON A TOUCHSCREEN IN PRODUCTION (${before} -> ${after})`);
    is(pe.indexOf('pointercancel') < 0, 'the browser never cancels the gesture');
    is(pe.filter(x => x === 'pointermove').length >= 8, `every touch move reached the tool (${pe.filter(x => x === 'pointermove').length})`);
    const bubble = await page.evaluate(() => (document.querySelector('.lck-bubbletext') || {}).textContent);
    is(/\S/.test(bubble), `the bubble reads the new time back ("${bubble}")`);
    await page.close();
  }

  /* ---- 3. every locale, on production -------------------------------- */
  console.log('\n[3] eleven locales');
  for (const loc of LOCALES) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1024, height: 1400 });
    await page.goto(MINI + '?lang=' + loc, { waitUntil: 'networkidle0', timeout: 60000 });
    await page.waitForSelector('.lck-svg');
    await sleep(320);
    const r = await page.evaluate(() => {
      const wrap = document.querySelector('.lck-wrap');
      return {
        bubble: (document.querySelector('.lck-bubbletext') || {}).textContent || '',
        title: (document.querySelector('.lcs-title') || {}).textContent || '',
        /* RULE 2 — the TOOL'S OWN prose, never document.body */
        prose: wrap ? wrap.textContent : '',
        modes: document.querySelectorAll('.lck-mode').length,
        steps: document.querySelectorAll('.lck-step').length
      };
    });
    is(r.modes === 3 && r.steps === 8, `${loc}: NON-VACUITY — 3 modes and 8 step/view chips (got ${r.modes}/${r.steps})`);
    is(r.bubble === IDIOM[loc], `${loc}: the 2:30 idiom is "${IDIOM[loc]}" (got "${r.bubble}")`);
    is(r.title.trim().length > 0, `${loc}: the shell rendered a title ("${r.title}")`);
    is(!BAN_VERDICT.test(r.prose), `${loc}: no verdict vocabulary in the tool's own prose`);
    await page.close();
  }

  /* ---- 4. the landing pages resolve ---------------------------------- */
  console.log('\n[4] the landing route in every locale');
  for (const loc of LOCALES) {
    const content = require(path.join(__dirname, '..', 'frontend', 'messages', 'tool-content', loc + '.json'));
    const slug = content['learning-clock'] && content['learning-clock'].slug;
    is(!!slug, `${loc}: a slug is registered`);
    if (!slug) continue;
    const page = await browser.newPage();
    const res = await page.goto(`${HOST}/${loc}/tools/${slug}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
    is(res && res.status() === 200, `${loc}: /${loc}/tools/${slug} is 200 (not the seller-era 410)`);
    const framed = await page.evaluate(() => {
      const f = document.querySelector('iframe');
      return f ? f.getAttribute('src') || '' : '';
    });
    is(/learning-clock\.html/.test(framed), `${loc}: the page frames the tool (${framed.slice(0, 60)})`);
    await page.close();
  }

  await browser.close();
  console.log('');
  if (fails.length) { console.log(`FAIL — ${fails.length} of ${n + fails.length} against PRODUCTION`); process.exit(1); }
  console.log(`PASS — ${n} assertions against PRODUCTION`);
})().catch(e => { console.error(e); process.exit(1); });
