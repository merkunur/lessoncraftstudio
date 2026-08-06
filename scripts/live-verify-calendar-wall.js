#!/usr/bin/env node
/* =====================================================================
   live-verify-calendar-wall.js — the rebuilt tool, on PRODUCTION.
   ---------------------------------------------------------------------
   Run:  node scripts/live-verify-calendar-wall.js

   Eleven locales, a FRESH BROWSER each, DRIVING THE MAIN CONTROLS. "It
   mounts" is not verification: the two worst defects in this rebuild —
   an Undo chip under a scrim and then below the fold — both rendered
   perfectly and could not be clicked.

   ⚠ ASSERT NON-VACUITY FIRST. A `querySelectorAll` comparison is not
   evidence until you have shown it selected something; #40's production
   gate keyed on a selector the tool never emits and compared two empty
   NodeLists, so it would have passed on a tool with no apparatus at all.

   ⚠ SCOPE EVERY CONTENT CHECK TO THE TOOL'S OWN DOM. `document.body
   .textContent` on a Next page carries the RSC flight-data, which
   serialises EVERY sibling tool's strings — a ban read against it
   condemned ten locales of correct copy once already in this programme.
   Everything below reads inside `.cwl-wrap` or the iframe document.
   ===================================================================== */
'use strict';
const puppeteer = require('puppeteer');

const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const SLUGS = require('../frontend/messages/tool-content/en.json');
const BASE = 'https://www.lessoncraftstudio.com';

const fails = [];
const FAIL = (m) => { fails.push(m); console.log('    ✗ ' + m); };
const OK = (m) => console.log('    ✓ ' + m);
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

function slugFor(loc) {
  const j = require('../frontend/messages/tool-content/' + loc + '.json');
  return j['calendar-wall'].slug;
}

(async () => {
  console.log('live-verify calendar-wall — ' + BASE + '\n');
  for (const loc of LOCALES) {
    const slug = slugFor(loc);
    const url = BASE + '/' + loc + '/tools/' + slug;
    /* a whole new browser per locale: no shared cache, no shared origin,
       no wall inherited from the locale before */
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 1000 });
    const errs = [];
    page.on('pageerror', e => errs.push(e.message));

    console.log('  ' + loc + '  ' + url);
    const res = await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => null);
    if (!res || res.status() !== 200) { FAIL(loc + ': HTTP ' + (res ? res.status() : 'no response')); await browser.close(); continue; }

    const frameEl = await page.$('iframe');
    if (!frameEl) { FAIL(loc + ': no tool iframe on the page'); await browser.close(); continue; }
    const frame = await frameEl.contentFrame();
    await frame.waitForSelector('.cwl-grid', { timeout: 25000 }).catch(() => null);
    await sleep(1200);

    const m = await frame.evaluate(() => {
      const wrap = document.querySelector('.cwl-wrap');
      const cells = [...document.querySelectorAll('.cwl-cell:not(.empty)')];
      const nums = cells.filter(c => (c.querySelector('.cwl-cellnum') || {}).textContent);
      const keys = window.CalendarWall ? Object.keys(window.CalendarWall.strings) : [];
      /* raw-key leak, scoped to the TOOL's own subtree */
      const text = wrap ? wrap.textContent : '';
      const leaked = keys.filter(k => new RegExp('(?<![A-Za-z])' + k + '(?![A-Za-z])').test(text));
      return {
        mounted: !!wrap,
        title: (document.querySelector('.lcs-title') || {}).textContent || '',
        line: (document.querySelector('.cwl-datetext') || {}).textContent || '',
        cells: cells.length, numbered: nums.length,
        dock: document.querySelectorAll('.cwl-dockchip').length,
        keyChip: !!document.querySelector('.cwl-keychip'),
        printChip: !!document.querySelector('.cwl-printchip'),
        leaked,
        ver: (document.querySelector('script[src*="calendar-wall.js"]') || {}).src || '',
      };
    });

    /* NON-VACUITY FIRST */
    if (!m.mounted) { FAIL(loc + ': the tool did not mount'); await browser.close(); continue; }
    if (m.cells < 28) { FAIL(loc + ': only ' + m.cells + ' day cells — nothing to assert about'); await browser.close(); continue; }
    OK(m.cells + ' day cells present (non-vacuous)');

    /* ⭐ THE ONE THIS REBUILD EXISTS FOR */
    if (m.numbered !== m.cells) FAIL(loc + ': ' + m.numbered + ' of ' + m.cells + ' days carry a numeral');
    else OK('every one of ' + m.cells + ' days carries its date');

    if (!m.line || /\d/.test(m.line)) FAIL(loc + ': date line is not a composed sentence: "' + m.line + '"');
    else OK('date: "' + m.line.trim() + '"');
    if (m.dock !== 3) FAIL(loc + ': ' + m.dock + ' dock chips');
    if (m.leaked.length) FAIL(loc + ': RAW KEYS on the stage: ' + m.leaked.join(', '));
    else OK('no raw string keys');
    if (!/[?&]v=7\.75/.test(m.ver) && !/calendar-wall\.js\?v=4/.test(m.ver)) {
      console.log('    note  script src: ' + m.ver.replace(BASE, ''));
    }

    /* DRIVE THE MAIN CONTROLS — existence is not reachability */
    const drive = await frame.evaluate(async () => {
      const out = {};
      const hit = (sel) => {
        const el = document.querySelector(sel);
        if (!el) return 'missing';
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height) return 'no box';
        const at = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
        if (!(at && at.closest && at.closest(sel))) return 'covered';
        el.click();
        return 'ok';
      };
      out.teacher = hit('.cwl-keychip');
      await new Promise(r => setTimeout(r, 250));
      out.teacherOn = document.querySelector('.cwl-keychip').getAttribute('aria-pressed');
      const cell = document.querySelectorAll('.cwl-cell:not(.empty)')[15];
      out.cell = cell ? (function () { cell.click(); return 'ok'; }()) : 'missing';
      await new Promise(r => setTimeout(r, 350));
      out.sheet = !!document.querySelector('.cwl-sheetdlg.open');
      out.kinds = document.querySelectorAll('.cwl-kind').length;
      const trip = document.querySelector('.cwl-kind.k-trip');
      if (trip) { trip.click(); await new Promise(r => setTimeout(r, 350)); }
      out.marks = document.querySelectorAll('.cwl-cell .cwl-mark').length;
      out.rows = document.querySelectorAll('.cwl-evrow').length;
      return out;
    });

    if (drive.teacher !== 'ok') FAIL(loc + ': the teacher key is ' + drive.teacher);
    else if (drive.teacherOn !== 'true') FAIL(loc + ': the teacher key did not open the window');
    else OK('the teacher window opens');
    if (!drive.sheet) FAIL(loc + ': tapping a day did not open the day sheet');
    else OK('tapping a day opens its sheet');
    if (drive.kinds !== 4) FAIL(loc + ': ' + drive.kinds + ' kind chips (want 4)');
    else OK('four kinds offered');
    /* ⭐ THE COMMISSIONED FEATURE, DRIVEN ON PRODUCTION */
    if (drive.marks < 1 || drive.rows < 1) FAIL(loc + ': tapping a kind chip did not put a mark on the day (marks=' + drive.marks + ', rows=' + drive.rows + ')');
    else OK('a kind chip MARKS THE DAY — ' + drive.marks + ' badge on the calendar');

    if (errs.length) FAIL(loc + ': page errors: ' + errs.slice(0, 2).join(' | '));
    await browser.close();
  }

  console.log('\n' + (fails.length ? 'RESULT: FAIL (' + fails.length + ')' : 'RESULT: PASS — 11/11 live'));
  process.exit(fails.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
