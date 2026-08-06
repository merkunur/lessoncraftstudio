#!/usr/bin/env node
/* =====================================================================
   live-verify-syllable-splitter.js — the PRODUCTION gate for TOOL #22.

   ⚠ NEVER "it mounts". This drives the apparatus on the live site: it
   taps the real drum, reveals the real word, opens the real desk, types a
   word, cuts a seam by clicking a real seam button, and reads what the
   page actually rendered — in all eleven locales, against the production
   URLs a teacher opens.

   Three traps this gate is built around, each recorded from a previous
   tool:
     · SCOPE CONTENT CHECKS TO THE TOOL'S OWN PROSE. `document.body
       .textContent` on a Next page includes the RSC flight-data, which
       serialises every sibling tool on the page — a ban read against it
       condemns a correct tool for a sibling's legitimate copy.
     · ASSERT NON-VACUITY FIRST. A `querySelectorAll` comparison is not
       evidence until you have shown it selected something.
     · EXPECTED LABELS COME FROM THE TOOL, never from literals in here,
       or this gate drifts the moment a native panel re-authors a string.

   Usage: node scripts/live-verify-syllable-splitter.js [--locales=en,de]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const BASE = 'https://www.lessoncraftstudio.com';
const ALL = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const arg = process.argv.find((a) => a.startsWith('--locales='));
const LOCALES = arg ? arg.split('=')[1].split(',') : ALL;

let pass = 0, fail = 0; const bad = [];
const ok = (n, c, x) => { if (c) { pass++; console.log('  ok   ' + n); } else { fail++; bad.push(n); console.log('  FAIL ' + n + (x !== undefined && x !== '' ? ' — ' + x : '')); } };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* the tool's own strings, loaded without a browser — the oracle for every
   expected label below */
function oracle() {
  const noop = () => {};
  const el = () => ({ style: { setProperty: noop }, classList: { add: noop, remove: noop, toggle: noop, contains: () => false }, appendChild: noop, addEventListener: noop, setAttribute: noop, innerHTML: '', textContent: '', dataset: {} });
  const sandbox = {
    window: {}, navigator: {}, console,
    document: { createElement: el, getElementById: () => null, head: { appendChild: noop }, body: { classList: { add: noop, remove: noop } }, addEventListener: noop, querySelector: () => null, querySelectorAll: () => [] },
    location: { search: '' }, localStorage: { getItem: () => null, setItem: noop },
    URLSearchParams, Intl, Date, Math, JSON, setTimeout: () => 0, clearTimeout: noop,
    fetch: () => ({ then() { return this; }, catch() { return this; } })
  };
  sandbox.global = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(MINI, 'syllable-splitter.js'), 'utf8'), sandbox);
  return sandbox.SyllableSplitter;
}

function slugFor(loc) {
  const j = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'messages', 'tool-content', loc + '.json'), 'utf8'));
  return j['syllable-splitter'].slug;
}

(async () => {
  const T = oracle();
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  for (const L of LOCALES) {
    console.log('\n[' + L + ']');
    const slug = slugFor(L);
    const landing = `${BASE}/${L}/tools/${slug}`;

    /* ---- 1. the landing page serves, and its iframe is the new build ---- */
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 1000 });
    const resp = await page.goto(landing, { waitUntil: 'domcontentloaded', timeout: 60000 });
    ok('landing 200', resp && resp.status() === 200, resp && String(resp.status()));

    const src = await page.$eval('iframe', (f) => f.getAttribute('src')).catch(() => null);
    ok('the tool iframe is on the page', !!src, String(src));
    ok('and it is the current wrapper build', !!src && /v=7\.7[4-9]|v=7\.[89]\d|v=[89]\./.test(src), String(src));
    await page.close();

    /* ---- 2. drive the APPARATUS itself, at the embed width ----
       ⚠ A FRESH CONTEXT PER LOCALE. Every locale is served from the SAME
       ORIGIN, so `localStorage` carries the teacher's custom words from one
       locale's run into the next — the `de` pass inherited `en`'s word,
       already cut, and reported the tool as having proposed a split. That
       is the recorded "fresh browser per locale" rule earning its place:
       the contamination looked exactly like a real defect in the one
       assertion the whole feature turns on. */
    /* ⚠ and do it WITHOUT `createIncognitoBrowserContext`, which this
       puppeteer no longer exposes (renamed `createBrowserContext`). Wiping
       the store on document-start is version-independent and states the
       intent plainly. */
    const p = await browser.newPage();
    await p.evaluateOnNewDocument(() => { try { localStorage.clear(); } catch (_) {} });
    await p.setViewport({ width: 704, height: 1000 });
    const errs = [];
    p.on('pageerror', (e) => errs.push(e.message));
    await p.goto(`${BASE}/mini-tools/syllable-splitter.html?lang=${L}&embed=1`, { waitUntil: 'networkidle2', timeout: 60000 });
    await p.waitForSelector('.ss-clap', { timeout: 20000 }).catch(() => {});
    await sleep(600);

    /* NON-VACUITY FIRST — prove the collections exist before believing
       anything about their contents */
    const shape = await p.evaluate(() => ({
      clap: document.querySelectorAll('.ss-clap').length,
      drum: document.querySelectorAll('.ss-drum').length,
      seg: document.querySelectorAll('.ss-segbtn').length,
      pill: document.querySelectorAll('.ss-pill').length
    }));
    ok('the apparatus rendered (clap face, drum, 2 mode segments, 1 menu)',
      shape.clap === 1 && shape.drum === 1 && shape.seg === 2 && shape.pill === 1, JSON.stringify(shape));

    /* ⭐ the central ruling, on production */
    ok('the word is HIDDEN at rest', (await p.$$('.ss-wordrow')).length === 0);

    /* the menu reads as a menu, in this language */
    const menu = await p.evaluate(() => ({
      eyebrow: (document.querySelector('.ss-pill-eyebrow') || {}).textContent || '',
      value: (document.querySelector('.ss-pill-value') || {}).textContent || '',
      caret: document.querySelectorAll('.ss-pill-caret svg').length,
      haspopup: (document.querySelector('.ss-pill') || {}).getAttribute ? document.querySelector('.ss-pill').getAttribute('aria-haspopup') : null,
      radius: getComputedStyle(document.querySelector('.ss-pill')).borderRadius
    }));
    ok('the set menu is labelled as a menu in this locale', menu.eyebrow.trim() === T.strings.shelfPick[L], menu.eyebrow);
    ok('it names the current set', menu.value.trim().length > 0, menu.value);
    ok('it carries a caret and announces a dialog', menu.caret === 1 && menu.haspopup === 'dialog', menu.caret + '/' + menu.haspopup);
    /* the whole complaint was that it looked like the mode chips beside it */
    ok('and it is NOT capsule-shaped like the mode chips', !/^999/.test(menu.radius), menu.radius);

    /* ---- 3. TAP THE DRUM. Never "the drum exists". ---- */
    await p.click('.ss-drum'); await sleep(320);
    const beats1 = (await p.$$('.ss-beat')).length;
    ok('a real tap on the real drum drops a beat', beats1 === 1, 'beats=' + beats1);
    await p.click('.ss-drum'); await sleep(320);
    const beats2 = (await p.$$('.ss-beat')).length;
    ok('a second tap drops a second', beats2 === 2, 'beats=' + beats2);
    ok('and the word is STILL hidden while the class counts', (await p.$$('.ss-wordrow')).length === 0);

    /* ---- 4. reveal, and check the arcs are the tool's real mark ---- */
    await p.evaluate(() => document.querySelector('.ss-ghostbtn').click());
    await sleep(600);
    const rev = await p.evaluate(() => {
      const row = document.querySelector('.ss-wordrow');
      const arc = document.querySelector('.ss-arc');
      if (!row || !arc) return null;
      return {
        word: [...row.querySelectorAll('.ss-syl')].map((s) => s.textContent).join(''),
        parts: row.querySelectorAll('.ss-syl').length,
        arcs: document.querySelectorAll('.ss-arc').length,
        stroke: parseFloat(getComputedStyle(arc).strokeWidth),
        fs: parseFloat(getComputedStyle(row).fontSize)
      };
    });
    ok('revealing shows the word', !!rev && rev.word.length > 0, JSON.stringify(rev));
    ok('with one arc per clap', !!rev && rev.arcs === rev.parts, JSON.stringify(rev));
    /* the arc used to be a flat 3.5px hairline under a word that ramps */
    ok('and the arc is proportional to the word, not a hairline', !!rev && rev.stroke / rev.fs >= 0.07,
      rev ? (rev.stroke / rev.fs).toFixed(3) : 'n/a');

    /* ---- 5. THE DESK — the feature the operator asked for ---- */
    await p.click('.ss-pill'); await sleep(500);
    ok('the menu opens the desk', (await p.$$('.ss-desk')).length === 1);
    ok('the desk is IN FLOW, not a fixed panel in a short iframe',
      await p.evaluate(() => { const d = document.querySelector('.ss-desk'); return !!d && getComputedStyle(d).position !== 'fixed'; }));
    ok('and no full-screen price scrim exists anywhere', (await p.$$('.ss-scrim')).length === 0);

    await p.evaluate((mine) => {
      const t = [...document.querySelectorAll('.ss-tab')].find((x) => x.textContent.trim() === mine);
      if (t) t.click();
    }, T.strings.deskMine[L]);
    await sleep(400);
    ok('the My-words tab is reachable and native', (await p.$$('.ss-ed-area')).length === 1);
    ok('the "we do not check them" sentence is on the desk, in this locale',
      await p.$eval('.ss-ownnote', (e, s) => e.textContent.trim() === s, T.strings.ownWordsNote[L]).catch(() => false));

    await p.type('.ss-ed-area', 'Amara');
    await p.click('.ss-ed-btn'); await sleep(600);
    const opened = await p.evaluate(() => {
      const raw = localStorage.getItem('lcs:syllable-splitter:v1');
      return raw ? JSON.parse(raw).custom.map((c) => c.chunks.join('-')) : [];
    });
    ok('a teacher word is saved', opened.length === 1, JSON.stringify(opened));
    ok('⭐ and EVERY SEAM OPENS CLOSED — the machine proposed nothing',
      opened.length === 1 && opened[0].indexOf('-') < 0, JSON.stringify(opened));

    const seams = await p.$$('.ss-seam');
    ok('a real tap target sits between every letter pair', seams.length === 4, String(seams.length));
    if (seams.length) {
      await seams[0].click(); await sleep(400);
      const cut = await p.evaluate(() => JSON.parse(localStorage.getItem('lcs:syllable-splitter:v1')).custom[0].chunks.join('-'));
      ok('and clicking one really cuts the word there', cut === 'A-mara', cut);
    }

    /* ---- 6. content bans, SCOPED TO THE TOOL'S OWN PROSE ---- */
    const prose = await p.evaluate(() => {
      const root = document.querySelector('.ss-wrap');
      return root ? root.innerText : '';
    });
    ok('no digits leak onto the apparatus chrome', !/\b\d{2,}\b/.test(prose.replace(/\d+\s*[/]\s*\d+/g, '')), prose.slice(0, 60));
    if (L !== 'en') {
      const leaks = ['instruction', 'ownWordsNote', 'seamHint', 'modeClap']
        .filter((k) => T.strings[k] && T.strings[k][L] !== T.strings[k].en)
        .filter((k) => prose.indexOf(T.strings[k].en) >= 0);
      ok('no English leak in the tool\'s own prose', leaks.length === 0, leaks.join(','));
    }
    ok('no page errors', errs.length === 0, errs[0]);
    await p.close();

  }

  await browser.close();
  console.log(`\n${fail ? 'FAIL' : 'ALL GREEN'} — ${pass} passed, ${fail} failed`);
  if (fail) bad.forEach((b) => console.log('  - ' + b));
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
