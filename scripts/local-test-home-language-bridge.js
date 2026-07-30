#!/usr/bin/env node
/* =====================================================================
   local-test-home-language-bridge.js — the local Definition-of-Done for
   the Say It Board. Nothing here is asserted from source: every claim is
   measured in a real browser against the rendered DOM.

   scripts/visual-qa-activity.js resolves only ids declared in a
   *-activities.json manifest, so it cannot see a free-play tool
   (local-test-heart-words.js:4-8 records the same). SECTION L8 is the
   substitute: the full viewport sweep with measured containment, at
   DESKTOP widths too, not just phone.

     L1 mounts, and the board is COMPLETE with NO home language chosen —
        12 cards, each an icon plus exactly one line. The child who
        actually arrives speaks Ukrainian or Somali; the tool must work
        for them on day one, so "no home language" is a first-class state
     L2 every card carries a DRAWN icon, and the icon is the biggest
        thing on the card — this is an icon-first board, not a word list
     L3 pick a home language: two lines per card, HOME FIRST in DOM
        order, and measured-identical in size, weight, colour and
        opacity. Parity is the pedagogical claim, so it is measured in
        computed style, never asserted from the stylesheet
     L4 tapping a card speaks the CLASSROOM line, in the classroom
        language — that is the point: the room hears the child
     L5 the fence: ZERO network requests for pww-index or any image. The
        word list was cut; the gate proves it structurally, the harness
        proves it at the wire
     L6 no assessment surface: no input, no contenteditable, no verdict
        or level vocabulary in the rendered text
     L7 free vs subscriber: the print gate with the exact CTA, and print
        actually reached for a subscriber
     L8 the sweep: 320-1366, FITS at desktop + PROVEN reachable below,
        taps >=44, rendered text >=14px, zero console errors

   Usage: node scripts/local-test-home-language-bridge.js [--shot]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
const SHOT_DIR = path.join(ROOT, 'docs', 'audit-results', 'home-language-bridge', 'qa');
const SHOT = process.argv.includes('--shot');
if (SHOT) fs.mkdirSync(SHOT_DIR, { recursive: true });

const VIEWPORTS = [[320, 640], [360, 740], [412, 820], [768, 1000], [1024, 900], [1366, 900]];
const MIN_TAP = 44, MIN_TEXT = 14;

let PASS = 0, FAIL = 0;
const ok = (m) => { PASS++; console.log('  ok    ' + m); };
const bad = (m) => { FAIL++; console.error('  FAIL  ' + m); };
const is = (c, m) => c ? ok(m) : bad(m);

const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };
const wait = (ms) => new Promise(r => setTimeout(r, ms));

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
  page._net = [];
  await page.setRequestInterception(true);
  page.on('request', (r) => {
    page._net.push(r.url());
    return r.url().includes('/api/auth/me')
      ? r.respond({
          status: 200, contentType: 'application/json',
          body: JSON.stringify(o.premium
            ? { user: { subscriptionTier: 'full' }, subscription: { status: 'active' } }
            : { user: { subscriptionTier: 'free' }, subscription: null })
        })
      : r.continue();
  });
  await page.evaluateOnNewDocument((premium) => {
    try { localStorage.clear(); } catch (_) {}
    if (premium) { try { localStorage.setItem('accessToken', 'harness'); } catch (_) {} }
    /* spies, installed before the tool loads */
    window.__spoke = [];
    window.__printed = 0;
    const install = () => {
      if (window.LCSAudio && !window.LCSAudio.__spied) {
        const real = window.LCSAudio.speak;
        window.LCSAudio.speak = function (o) { window.__spoke.push(o); try { return real.call(this, o); } catch (_) {} };
        window.LCSAudio.__spied = true;
      }
    };
    document.addEventListener('DOMContentLoaded', install);
    setTimeout(install, 0); setTimeout(install, 200);
    window.print = function () { window.__printed++; };
  }, !!o.premium);
  page._errs = [];
  page.on('console', (m) => { if (m.type() === 'error' && !/404|net::ERR/.test(m.text())) page._errs.push(m.text()); });
  page.on('pageerror', (e) => page._errs.push(String(e)));
  return page;
}

const ready = async (p) => { await p.waitForSelector('.hlb-wrap', { timeout: 8000 }); await wait(400); };

/* every measurement of the board, taken from the rendered DOM */
const board = (p) => p.evaluate(() => {
  const cards = Array.from(document.querySelectorAll('.hlb-card'));
  return {
    wrap: document.querySelectorAll('.hlb-wrap').length,
    cards: cards.length,
    withIcon: cards.filter(c => {
      const s = c.querySelector('svg.hlb-icon');
      if (!s) return false;
      const d = s.querySelector('path.hlb-ipath');
      return !!(d && (d.getAttribute('d') || '').length > 12);
    }).length,
    lines: cards.map(c => Array.from(c.querySelectorAll('.hlb-text')).map(t => ({
      text: t.textContent.trim(),
      lang: t.getAttribute('lang'),
      px: parseFloat(getComputedStyle(t).fontSize),
      weight: getComputedStyle(t).fontWeight,
      colour: getComputedStyle(t).color,
      opacity: getComputedStyle(t).opacity,
      style: getComputedStyle(t).fontStyle
    }))),
    /* is the icon actually dominant? measured, not designed-and-hoped */
    iconVsText: cards.map(c => {
      const s = c.querySelector('svg.hlb-icon');
      const t = c.querySelector('.hlb-text');
      if (!s || !t) return null;
      const a = s.getBoundingClientRect(), b = t.getBoundingClientRect();
      return { icon: Math.round(a.height), text: Math.round(b.height) };
    }).filter(Boolean),
    langButtons: document.querySelectorAll('.hlb-langbtn').length,
    gate: document.querySelectorAll('.hlb-gate').length,
    gateHref: (document.querySelector('.hlb-gate a') || {}).href || null,
    inputs: document.querySelectorAll('input,textarea,select,[contenteditable]').length,
    imgs: document.querySelectorAll('img,image').length,
    text: (document.querySelector('.lcs-app') || document.body).innerText
  };
});

const BASE_PORT = 5391;

(async () => {
  const server = serve();
  await new Promise(r => server.listen(BASE_PORT, r));
  const BASE = `http://127.0.0.1:${BASE_PORT}`;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  /* ---------------- L1 the board is complete with NO home language ---- */
  console.log('[L1 complete without a home language]');
  const p = await newPage(browser, {});
  await p.goto(BASE + '/home-language-bridge.html?lang=en&embed=1', { waitUntil: 'domcontentloaded' });
  await ready(p);
  let b = await board(p);
  is(b.wrap === 1, 'the tool mounts');
  is(b.cards === 12, `12 cards with no home language chosen (got ${b.cards})`);
  is(b.lines.every(l => l.length === 1), 'each card shows exactly one line when no home language is set');
  is(b.lines.every(l => l[0].text.length > 0), 'no card is blank');
  is(b.lines.every(l => l[0].lang === 'en'), 'that line is tagged as the classroom language');

  /* ---------------- L2 icon-first, measured -------------------------- */
  console.log('[L2 icon-first]');
  is(b.withIcon === 12, `all 12 cards carry a DRAWN icon (got ${b.withIcon})`);
  const dominant = b.iconVsText.filter(x => x.icon >= x.text).length;
  is(dominant === b.iconVsText.length,
    `the icon is at least as tall as the text on every card (${dominant}/${b.iconVsText.length})`);

  /* ---------------- L5 the fence, at the wire ------------------------ */
  console.log('[L5 the Picture Word Wall fence, measured at the network]');
  const stray = p._net.filter(u => /pww-index|image-library|\.webp|\.png|\.jpg/i.test(u));
  is(stray.length === 0, `no pww-index and no image request${stray.length ? ' — ' + stray[0] : ''}`);
  is(b.imgs === 0, 'no <img> in the rendered board — the icons are drawn, not fetched');

  /* ---------------- L6 no assessment surface ------------------------- */
  console.log('[L6 no assessment]');
  is(b.inputs === 0, 'no input, textarea, select or contenteditable anywhere');
  is(!/\b(score|level \d|correct|wrong|progress|points|beginner|advanced)\b/i.test(b.text),
    'no verdict or level vocabulary in the rendered text');

  /* ---------------- L3 parity, in computed style --------------------- */
  console.log('[L3 parity — home line FIRST, measured identical]');
  await p.evaluate(() => {
    const T = window.HomeLanguageBridge;
    T.picking = true; T.render();
  });
  await wait(200);
  b = await board(p);
  is(b.langButtons >= 11, `the chooser offers every language plus "none" (${b.langButtons})`);
  await p.evaluate(() => { window.HomeLanguageBridge._setHome('de'); });
  await wait(250);
  b = await board(p);
  is(b.cards === 12, 'still 12 cards with a home language chosen');
  is(b.lines.every(l => l.length === 2), 'each card now shows two lines');
  is(b.lines.every(l => l[0].lang === 'de' && l[1].lang === 'en'),
    'the HOME line is emitted first, tagged de, then the classroom line');
  const unequal = b.lines.filter(l =>
    l[0].px !== l[1].px || l[0].weight !== l[1].weight ||
    l[0].colour !== l[1].colour || l[0].opacity !== l[1].opacity || l[0].style !== l[1].style);
  is(unequal.length === 0,
    `both lines render identically — size, weight, colour, opacity, slant (${unequal.length} card(s) differ)`);
  is(b.lines.every(l => l[0].text !== l[1].text), 'the two lines are genuinely two languages, not a duplicate');

  /* ---------------- L4 the room hears the classroom language --------- */
  console.log('[L4 tap speaks the CLASSROOM line]');
  await p.evaluate(() => { window.__spoke = []; document.querySelectorAll('.hlb-card')[0].click(); });
  await wait(300);
  const spoke = await p.evaluate(() => window.__spoke);
  is(spoke.length === 1, `one utterance per tap (got ${spoke.length})`);
  if (spoke.length) {
    is(spoke[0].lang === 'en', `spoken in the classroom language (got ${spoke[0].lang})`);
    is(spoke[0].type === 'word', `spoken as a whole utterance, type:'word' (got ${spoke[0].type})`);
    const de = await p.evaluate(() => window.HomeLanguageBridge.cardFor('help', 'en', 'de'));
    is(spoke[0].text === de.classroom, `it said the classroom line, not the home line ("${spoke[0].text}")`);
  }

  /* the voice guard: no German voice on this device -> the German side is
     shown and NOT spoken, which is the honest behaviour */
  const guard = await p.evaluate(() => {
    const T = window.HomeLanguageBridge;
    return {
      none: T.hasVoice('de', []),
      absent: T.hasVoice('de', [{ lang: 'en-US' }]),
      present: T.hasVoice('de', [{ lang: 'de-DE' }]),
      nb: T.hasVoice('no', [{ lang: 'nb-NO' }])
    };
  });
  is(guard.none === true, 'the guard is permissive when the device reports no voices at all');
  is(guard.absent === false, 'the guard is honest when the language is genuinely absent');
  is(guard.present === true && guard.nb === true, 'the guard finds de-DE, and nb-NO for Norwegian');
  await p.close();

  /* ---------------- L7 free vs subscriber ---------------------------- */
  console.log('[L7 the print gate]');
  const free = await newPage(browser, {});
  await free.goto(BASE + '/home-language-bridge.html?lang=de&embed=1', { waitUntil: 'domcontentloaded' });
  await ready(free);
  await free.evaluate(() => {
    const t = window.HomeLanguageBridge.api.t('printBtn');
    const btn = Array.from(document.querySelectorAll('.hlb-chip')).find(x => x.textContent.trim() === t);
    if (btn) btn.click();
  });
  await wait(300);
  let fb = await board(free);
  is(fb.gate === 1, 'a free visitor is shown the gate, not a broken print');
  is(fb.gateHref && fb.gateHref.endsWith('/de/pricing?from=tool-home-language-bridge'),
    `the CTA points at the locale pricing page (${fb.gateHref})`);
  is((await free.evaluate(() => window.__printed)) === 0, 'print is not reached for a free visitor');
  is(fb.cards === 12, 'the whole board stays free — a child’s voice is never behind a paywall');
  await free.close();

  const paid = await newPage(browser, { premium: true });
  await paid.goto(BASE + '/home-language-bridge.html?lang=de&embed=1', { waitUntil: 'domcontentloaded' });
  await ready(paid);
  await wait(400);
  await paid.evaluate(() => {
    const t = window.HomeLanguageBridge.api.t('printBtn');
    const btn = Array.from(document.querySelectorAll('.hlb-chip')).find(x => x.textContent.trim() === t);
    if (btn) btn.click();
  });
  await wait(300);
  is((await paid.evaluate(() => window.__printed)) === 1, 'a subscriber reaches print');
  is((await board(paid)).gate === 0, 'and is shown no gate');
  await paid.close();

  /* ---------------- L8 THE SWEEP ------------------------------------- */
  console.log('[L8 viewport sweep 320-1366]');
  const sw = await newPage(browser, { premium: true });
  await sw.goto(BASE + '/home-language-bridge.html?lang=fi&embed=1', { waitUntil: 'domcontentloaded' });
  await ready(sw);

  /* Two states, and the bar differs because the states differ.
     RESTING is where a child actually sits — the paired board, chooser
     closed, Finnish classroom (our longest phrases) over a German home
     line. §A.13.62 demands it FITS at desktop, and it must.
     CHOOSING is a transient a teacher passes through once: 12 cards plus
     an eleven-language grid cannot fit 900px and pretending otherwise
     would mean shrinking the cards for a state nobody looks at. It must
     be PROVEN reachable at every width — measured, never inferred. */
  const STATES = [
    ['resting',  () => { const T = window.HomeLanguageBridge; T.home = 'de'; T.picking = false; T.render(); }, true],
    ['choosing', () => { const T = window.HomeLanguageBridge; T.home = 'de'; T.picking = true;  T.render(); }, false]
  ];

  for (const [label, setup, desktopMustFit] of STATES) {
  await sw.evaluate(setup);
  await wait(350);
  for (const [w, h] of VIEWPORTS) {
    await sw.setViewport({ width: w, height: h, deviceScaleFactor: 2 });
    await wait(320);
    const m = await sw.evaluate((MIN_TAP, MIN_TEXT) => {
      [document.scrollingElement, document.documentElement, document.body,
       document.querySelector('.lcs-app'), document.querySelector('.lcs-stage')]
        .filter(Boolean).forEach(c => { try { c.scrollTop = 0; } catch (_) {} });
      const controls = Array.from(document.querySelectorAll('.hlb-card,.hlb-chip,.hlb-langbtn'))
        .filter(e => e.getBoundingClientRect().width > 0);
      if (!controls.length) return { noControls: true };
      const lowest = controls.reduce((a, e) => Math.max(a, e.getBoundingClientRect().bottom), -Infinity);
      const smallTap = controls.filter(e => { const r = e.getBoundingClientRect(); return r.width < MIN_TAP || r.height < MIN_TAP; })
        .map(e => e.className + ' ' + Math.round(e.getBoundingClientRect().width) + 'x' + Math.round(e.getBoundingClientRect().height));
      const tiny = Array.from(document.querySelectorAll('.hlb-text,.hlb-hint,.hlb-heard,.hlb-voicenote,.hlb-privacy'))
        .filter(e => e.textContent.trim() && e.getBoundingClientRect().width > 0)
        .map(e => ({ cls: e.className, px: parseFloat(getComputedStyle(e).fontSize) }))
        .filter(t => t.px < MIN_TEXT).map(t => t.cls + ' ' + t.px.toFixed(1) + 'px');
      /* the icon must stay a real icon at every width, not a speck */
      const specks = Array.from(document.querySelectorAll('svg.hlb-icon'))
        .map(s => Math.round(s.getBoundingClientRect().height)).filter(px => px < 32);
      const need = Math.max(0, lowest - window.innerHeight + 24);
      let took = null;
      for (const c of [document.scrollingElement, document.documentElement, document.body,
                       document.querySelector('.lcs-app'), document.querySelector('.lcs-stage')].filter(Boolean)) {
        const before = c.scrollTop; c.scrollTop = need;
        if (c.scrollTop > before + 1) { took = c.className || c.tagName; break; }
        c.scrollTop = before;
      }
      const lowEl = controls.reduce((bb, e) => (!bb || e.getBoundingClientRect().bottom > bb.getBoundingClientRect().bottom) ? e : bb, null);
      const lr = lowEl.getBoundingClientRect();
      return {
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        lowest: Math.round(lowest), nControls: controls.length, scrollTook: took,
        afterBottom: Math.round(lr.bottom), afterTop: Math.round(lr.top), smallTap, tiny, specks
      };
    }, MIN_TAP, MIN_TEXT);
    const at = `${label} ${w}x${h}`;
    if (m.noControls) { bad(`${at}: found NO controls — the probe measured nothing`); continue; }
    const fits = m.lowest <= h + 8;
    const reachable = fits || (m.scrollTook !== null && m.afterBottom <= h + 8 && m.afterTop >= 0);
    is(m.overflow <= 2, `${at}: no horizontal overflow (${m.overflow}px)`);
    if (w >= 768 && desktopMustFit)
      is(fits, `${at}: all ${m.nControls} controls FIT (lowest ${m.lowest} <= ${h})`);
    else
      is(reachable, `${at}: fits (${m.lowest}) or PROVEN reachable — scrolled ${m.scrollTook || 'nothing'}, then visible ${m.afterTop}-${m.afterBottom}`);
    is(m.smallTap.length === 0, `${at}: taps >= ${MIN_TAP}px${m.smallTap.length ? ' — ' + m.smallTap.join(', ') : ''}`);
    is(m.tiny.length === 0, `${at}: text >= ${MIN_TEXT}px${m.tiny.length ? ' — ' + m.tiny.join(', ') : ''}`);
    is(m.specks.length === 0, `${at}: every icon >= 32px${m.specks.length ? ' — ' + m.specks.join(', ') : ''}`);
    if (SHOT && label === 'resting' && [360, 768, 1024].includes(w)) await sw.screenshot({ path: path.join(SHOT_DIR, `sweep-${w}.png`), fullPage: true });
  }
  }
  is(sw._errs.length === 0, `zero console errors${sw._errs.length ? ' — ' + sw._errs[0] : ''}`);

  if (SHOT) {
    for (const [w, h] of [[360, 740], [768, 1000], [1024, 900]]) {
      await sw.setViewport({ width: w, height: h, deviceScaleFactor: 2 });
      await sw.evaluate(() => { const T = window.HomeLanguageBridge; T.picking = false; T.home = null; T.render(); });
      await wait(320);
      await sw.screenshot({ path: path.join(SHOT_DIR, `nohome-${w}.png`), fullPage: true });
      await sw.evaluate(() => { const T = window.HomeLanguageBridge; T.home = 'de'; T.render(); });
      await wait(320);
      await sw.screenshot({ path: path.join(SHOT_DIR, `paired-${w}.png`), fullPage: true });
    }
  }
  await sw.close();

  await browser.close();
  server.close();
  console.log('');
  console.log(`${PASS} passed, ${FAIL} failed`);
  process.exit(FAIL ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
