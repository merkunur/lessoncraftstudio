#!/usr/bin/env node
/* =====================================================================
   local-test-sorting-hoops.js — the local Definition-of-Done.
   Nothing here is asserted from source: every claim is measured in a real
   browser against the rendered DOM.

   ⚠⚠ WHY THIS FILE WAS REWRITTEN. The previous version passed while the
   tool shipped a control the operator could not reach. It opened the rule
   picker (state 'picking') and then EXCUSED the overflow by setting
   `scrollTop` on a container and watching the number move:

       const need = Math.max(0, lowest - window.innerHeight + 24);
       for (const c of [...]) { c.scrollTop = need; if (c.scrollTop > b4+1) took = ... }
       const reachable = fits || (took !== null && ...)

   Measured at 1024x900 in exactly that state:
       body.hp-wide   overflowY=hidden  scrollH=1032 clientH=900  scrollTop -> 86
       AFTER A REAL MOUSE WHEEL: bodyTop 0, picker bottom 908 vs vh 900

   `overflow:hidden` blocks the USER but not a script. The gate reached the
   control by a mechanism no teacher has, saw the number move, and wrote
   "PROVEN reachable". THE LESSON GENERALISES: a check that reaches the
   control by a mechanism the user does not have is not a check.
   So: L7 scrolls with `page.mouse.wheel` ONLY, and it sweeps EVERY
   configuration, not just the resting one.

     L1  mounts; two TRUE circles, an aspect-bound box, four regions
     L2  ⭐ the ring stroke is >= 4 CSS px RENDERED. The shipped tool
         declared .55 with vector-effect:non-scaling-stroke, which resolves
         in VIEWPORT units — 0.55 CSS px at every viewport including 2560
     L3  ⭐ TOTAL PARTITION: every point on the mat is exactly one region.
         The shipped hit-test left four dead bands, ~14% of the ring width
     L4  a real pointer drag lands an item in each region, INCLUDING the
         overlap, measured in the DOM
     L5  ⭐ THE REFUSAL TABLE: an item dropped in the wrong hoop whose true
         region is another HOOP returns to the TRAY; only a true
         counter-example accumulates OUTSIDE. Nothing is ever destroyed
     L6  ⚠ NO TELL: hovering a satisfying and a non-satisfying item over
         the same hoop produces an IDENTICAL DOM
     L7  ⭐ the sweep 320-1366 x EVERY CONFIGURATION, human scrolling only
     L8  ⭐ CONSEQUENCE per control: each foot chip changes something
         ELSEWHERE, not merely its own class
     L9  free vs subscriber: locked families are present IN POSITION with
         their real question; the print sheet is ABSENT from the free DOM
         so Ctrl+P cannot bypass the chip
     L10 keyboard grab-and-place, and pick-up + put-down is a MOVE
     L11 POISON self-test — the containment and partition checks must FAIL
         against a doctored page, or they are not checks

   Usage: node scripts/local-test-sorting-hoops.js [--shot]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
const IMGLIB = path.join(ROOT, 'frontend', 'public', 'image-library-webp');
const SHOT_DIR = path.join(ROOT, 'docs', 'audit-results', 'sorting-hoops', 'qa');
const SHOT = process.argv.indexOf('--shot') > -1;
if (SHOT) fs.mkdirSync(SHOT_DIR, { recursive: true });

const VIEWPORTS = [[320, 640], [360, 740], [412, 820], [768, 1000], [1024, 900], [1366, 900]];
const MIN_TAP = 44;      /* controls */
const MIN_CELL = 34;     /* canvas hit-targets */
const MIN_TEXT = 14;

let PASS = 0, FAIL = 0;
const ok = (m) => { PASS++; console.log('  ok    ' + m); };
const bad = (m) => { FAIL++; console.error('  FAIL  ' + m); };
const is = (c, m) => (c ? ok(m) : bad(m));
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.html': 'text/html', '.webp': 'image/webp' };

function serve() {
  return http.createServer((req, res) => {
    const u = decodeURIComponent(req.url.split('?')[0]);
    let f;
    if (u.indexOf('/image-library-webp/') === 0) f = path.join(IMGLIB, u.slice('/image-library-webp/'.length));
    else if (u.indexOf('/mini-tools/') === 0) f = path.join(MINI, u.slice('/mini-tools/'.length));
    else f = path.join(MINI, u.replace(/^\//, ''));
    fs.readFile(f, (e, b) => {
      if (e) { res.writeHead(404); res.end('nf'); return; }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
      res.end(b);
    });
  });
}

let BASE = '';
let browser = null;

async function open(opts) {
  opts = opts || {};
  const page = await browser.newPage();
  await page.setViewport({ width: opts.w || 1024, height: opts.h || 900,
    deviceScaleFactor: opts.dpr || 1 });
  await page.evaluateOnNewDocument((premium) => {
    try { localStorage.clear(); } catch (_) {}
    if (premium) {
      try {
        localStorage.setItem('accessToken', 'harness');
        localStorage.setItem('lcs:sorting-hoops:v2', JSON.stringify({
          v: 2, ent: { tier: 'full', checkedAt: new Date().toISOString() } }));
      } catch (_) {}
    }
  }, !!opts.premium);
  if (opts.premium) {
    await page.setRequestInterception(true);
    page.on('request', (r) => (r.url().indexOf('/api/auth/me') > -1
      ? r.respond({ status: 200, contentType: 'application/json',
          body: JSON.stringify({ user: { subscriptionTier: 'full' }, subscription: { status: 'active' } }) })
      : r.continue()));
  }
  if (opts.reduced) await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  page._errs = [];
  const benign = (t) => /404|Failed to load resource|net::ERR/i.test(t);
  page.on('pageerror', (e) => { if (!benign(e.message)) page._errs.push('pageerror: ' + e.message); });
  page.on('console', (m) => { if (m.type() === 'error' && !benign(m.text())) page._errs.push(m.text()); });
  await page.goto(BASE + '?lang=' + (opts.lang || 'en') + '&embed=1', { waitUntil: 'networkidle2' });
  await page.waitForSelector('.hp-wrap', { timeout: 9000 });
  await wait(500);
  return page;
}

/* ---- drive the tool the way a teacher does: by index, never by English
   text (the recorded "Another BLUEPRINT contains the word print" trap) --- */
const CLICK = (sel, n) => `(function(){var e=document.querySelectorAll('${sel}')[${n || 0}];` +
  `if(!e) return false; e.click(); return true;})()`;

async function click(page, sel, n) {
  const hit = await page.evaluate(CLICK(sel, n));
  /* ⚠ A SILENT NO-OP HOLLOWS OUT THE NEXT ASSERTION. On #39 a click helper
     that quietly returned false hit a disabled control, and the very next
     check — "the toggle is not swapped" — passed because nothing had been
     toggled. Every scripted interaction fails loudly. */
  if (!hit) throw new Error('click target absent: ' + sel + '[' + (n || 0) + ']');
  await wait(320);
}

/* the four configurations that matter, each reached by real clicks */
const CONFIGS = {
  'sort-labelled': async () => {},
  'setup-overview': async (p) => { await click(p, '.hp-bar .hp-chip', 1); },
  'setup-family': async (p) => {
    await click(p, '.hp-bar .hp-chip', 1);
    await click(p, '.hp-hoopcard-a .hp-chip', 1);
  },
  'setup-value': async (p) => {
    await click(p, '.hp-bar .hp-chip', 1);
    await click(p, '.hp-hoopcard-a .hp-chip', 1);
    await click(p, '.hp-famrow', 0);
  },
  'sort-guess': async (p) => {
    await click(p, '.hp-bar .hp-chip', 1);
    await click(p, '.hp-hoopcard-a .hp-chip', 0);
    await click(p, '.hp-hoopcard-b .hp-chip', 0);
    await click(p, '[data-fk="start"]', 0);
  },
  'sort-revealed': async (p) => {
    await click(p, '.hp-bar .hp-chip', 1);
    await click(p, '.hp-hoopcard-a .hp-chip', 0);
    await click(p, '.hp-hoopcard-b .hp-chip', 0);
    await click(p, '[data-fk="start"]', 0);
    await click(p, '[data-fk="reveal"]', 0);
  },
  'armed-clear': async (p) => { await click(p, '[data-fk="clear"]', 0); },
  /* the picture world is an async corpus join plus 12 image decodes; give
     it room to settle or the sweep measures a layout that is still growing */
  'pictures': async (p) => { await click(p, '.hp-bar .hp-chip', 4); await wait(2200); }
};

/* the measurement L7 takes. ⚠ CONTAINMENT IS AGAINST THE CARD (.lcs-app),
   which is overflow:hidden and therefore CLIPS rather than grows. */
const MEASURE = (MIN_TAP, MIN_CELL, MIN_TEXT) => {
  const r = (e) => e.getBoundingClientRect();
  const vis = (e) => {
    const cs = getComputedStyle(e);
    return cs.display !== 'none' && cs.visibility !== 'hidden' &&
      parseFloat(cs.opacity) > 0.05 && r(e).width > 0 && r(e).height > 0;
  };
  const card = document.querySelector('.lcs-app');
  const cb = card ? r(card) : null;
  const controls = Array.prototype.filter.call(document.querySelectorAll('.hp-chip,.hp-famrow'), vis);
  const cells = Array.prototype.filter.call(document.querySelectorAll('.hp-tile'), vis);
  const smallCtl = controls.filter((e) => r(e).width < MIN_TAP || r(e).height < MIN_TAP)
    .map((e) => e.className.split(' ')[0] + ' ' + Math.round(r(e).width) + 'x' + Math.round(r(e).height));
  const smallCell = cells.filter((e) => r(e).width < MIN_CELL || r(e).height < MIN_CELL)
    .map((e) => Math.round(r(e).width) + 'x' + Math.round(r(e).height));
  const tiny = Array.prototype.filter.call(
    document.querySelectorAll('.hp-cap,.hp-word,.hp-traylabel,.hp-outlabel,.hp-hint,.hp-hooptitle,.hp-hoopstate,.hp-famq,.hp-setuphead'),
    (e) => e.textContent.trim() && vis(e))
    .map((e) => ({ cls: e.className, px: parseFloat(getComputedStyle(e).fontSize) }))
    .filter((t) => t.px < MIN_TEXT).map((t) => t.cls + ' ' + t.px.toFixed(1) + 'px');

  /* the furthest right edge of anything laid out — NOT scrollWidth, which
     is vacuous when the tool sets overflow-x:hidden on its own root */
  let far = 0, farEl = '';
  Array.prototype.forEach.call(document.querySelectorAll('.hp-wrap, .hp-wrap *'), (e) => {
    if (!vis(e)) return;
    const b = r(e);
    if (b.width > 0 && b.right > far) { far = b.right; farEl = (e.className || e.tagName || '?').toString().trim().slice(0, 28); }
  });

  const all = controls.concat(cells);
  const lowest = all.reduce((a, e) => Math.max(a, r(e).bottom), -Infinity);
  const lowEl = all.reduce((bb, e) => (!bb || r(e).bottom > r(bb).bottom ? e : bb), null);

  /* clipped text */
  const clipped = [];
  Array.prototype.forEach.call(document.querySelectorAll('.hp-word,.hp-cap,.hp-chip,.hp-famq,.hp-outlabel'), (e) => {
    const cs = getComputedStyle(e);
    if (e.scrollWidth > e.clientWidth + 1 && cs.overflow !== 'visible' && cs.overflowX !== 'auto') {
      clipped.push((e.className || '?') + ' "' + e.textContent.slice(0, 18) + '" ' + e.scrollWidth + '>' + e.clientWidth);
    }
  });

  return {
    n: all.length, lowest: Math.round(lowest),
    lowCls: lowEl ? (lowEl.className || '').split(' ')[0] : null,
    vh: window.innerHeight, vw: window.innerWidth,
    far: Math.round(far), farEl, cardRight: cb ? Math.round(cb.right) : null,
    cardBottom: cb ? Math.round(cb.bottom) : null,
    overRight: cb ? Math.round(far - cb.right) : 0,
    smallCtl, smallCell, tiny, clipped,
    docH: document.documentElement.scrollHeight
  };
};

(async () => {
  const server = serve();
  await new Promise((r) => server.listen(0, r));
  BASE = 'http://127.0.0.1:' + server.address().port + '/sorting-hoops.html';
  browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  try {
    /* ---------------- L1 mount + geometry ---------------- */
    console.log('\n[L1] mount, true circles, aspect-bound box');
    {
      const p = await open({});
      const m = await p.evaluate(() => {
        const rings = document.querySelector('.hp-rings');
        const b = rings.getBoundingClientRect();
        const cs = Array.prototype.map.call(document.querySelectorAll('.hp-ring'), (c) => ({
          cx: +c.getAttribute('cx'), cy: +c.getAttribute('cy'), r: +c.getAttribute('r') }));
        const vb = document.querySelector('.hp-svg').getAttribute('viewBox');
        return { aspect: b.width / b.height, cs, vb,
          slots: Array.prototype.map.call(document.querySelectorAll('[data-slot]'), (s) => s.getAttribute('data-slot')),
          tiles: document.querySelectorAll('.hp-tile').length };
      });
      is(Math.abs(m.aspect - 1.5) < 0.005, `the ring box is aspect-bound at 3:2 (${m.aspect.toFixed(4)})`);
      is(m.cs.length === 2, `two rings drawn (${m.cs.length})`);
      is(m.cs.length === 2 && m.cs[0].r === m.cs[1].r, 'both rings share one radius — they are circles, not a pair of ellipses');
      is(m.cs.length === 2 && Math.abs((m.cs[1].cx - m.cs[0].cx) - m.cs[0].r) < 0.01,
        'the centres are exactly one radius apart, so the lens is a third of the width');
      is(m.vb === '0 0 330 220', `viewBox is the declared geometry (${m.vb})`);
      ['a', 'both', 'b', 'out', 'tray'].forEach((s) =>
        is(m.slots.indexOf(s) > -1, `region present: ${s}`));
      is(m.tiles === 12, `twelve things in the tray (${m.tiles})`);
      is(p._errs.length === 0, 'no console errors' + (p._errs[0] ? ' — ' + p._errs[0] : ''));
      await p.close();
    }

    /* ---------------- L2 the ring stroke ---------------- */
    console.log('\n[L2] ⭐ the RENDERED ring stroke, at every width');
    for (const [w, h] of VIEWPORTS) {
      const p = await open({ w, h });
      const sw = await p.evaluate(() => {
        const e = document.querySelector('.hp-ring');
        /* read the RENDERED value: the shipped bug was that the declared
           number and the painted number were different things */
        return parseFloat(getComputedStyle(e).strokeWidth);
      });
      is(sw >= 4, `${w}x${h}: ring stroke ${sw}px (>= 4)`);
      await p.close();
    }

    /* ---------------- L3 total partition ---------------- */
    console.log('\n[L3] ⭐ the mat is a TOTAL PARTITION — no dead bands');
    {
      const p = await open({});
      const probe = await p.evaluate(() => {
        const T = window.SortingHoops;
        const r = document.querySelector('.hp-rings').getBoundingClientRect();
        const out = { dead: [], counts: {} };
        for (let fx = 1; fx <= 99; fx++) {
          for (const fy of [15, 50, 85]) {
            const x = r.left + r.width * fx / 100, y = r.top + r.height * fy / 100;
            const z = T._regionAt(x, y);
            if (!z) out.dead.push(fx + ',' + fy);
            else out.counts[z] = (out.counts[z] || 0) + 1;
          }
        }
        return out;
      });
      is(probe.dead.length === 0,
        `297 points across the ring box all resolve to a region (${probe.dead.length} dead)` +
        (probe.dead.length ? ' — ' + probe.dead.slice(0, 8).join(' ') : ''));
      ['a', 'b', 'both', 'out'].forEach((z) =>
        is((probe.counts[z] || 0) > 0, `region ${z} is reachable by pointer (${probe.counts[z] || 0} points)`));
      await p.close();
    }

    /* ---------------- L4 real drags ---------------- */
    console.log('\n[L4] a real pointer drag lands in each region, incl. the OVERLAP');
    {
      const p = await open({});
      for (const region of ['a', 'both', 'b', 'out']) {
        const before = await p.evaluate((r) => document.querySelectorAll('[data-slot="' + r + '"] .hp-tile').length, region);
        const pt = await p.evaluate((r) => {
          const T = window.SortingHoops;
          const tile = document.querySelector('.hp-slot-tray .hp-tile');
          const tb = tile.getBoundingClientRect();
          if (r === 'out') {
            const o = document.querySelector('.hp-out').getBoundingClientRect();
            return { fx: tb.left + tb.width / 2, fy: tb.top + tb.height / 2, tx: o.left + o.width / 2, ty: o.top + o.height / 2 };
          }
          const rb = document.querySelector('.hp-rings').getBoundingClientRect();
          /* find a point the MODEL says is this region — the drawing and
             the hit test are the same equation, so this is honest */
          for (let fx = 2; fx <= 98; fx += 1) {
            const x = rb.left + rb.width * fx / 100, y = rb.top + rb.height * 0.5;
            if (T._regionAt(x, y) === r) return { fx: tb.left + tb.width / 2, fy: tb.top + tb.height / 2, tx: x, ty: y };
          }
          return null;
        }, region);
        if (!pt) { bad(`could not find a point in region ${region}`); continue; }
        await p.mouse.move(pt.fx, pt.fy);
        await p.mouse.down();
        await p.mouse.move(pt.tx, pt.ty, { steps: 14 });
        await p.mouse.up();
        await wait(320);
        const after = await p.evaluate((r) => document.querySelectorAll('[data-slot="' + r + '"] .hp-tile').length, region);
        is(after === before + 1, `drag landed a tile in ${region} (${before} -> ${after})`);
      }
      await p.close();
    }

    /* ---------------- L5 the refusal table ---------------- */
    console.log('\n[L5] ⭐ THE REFUSAL TABLE — nothing is destroyed, and only a true');
    console.log('     counter-example accumulates outside');
    {
      const p = await open({});
      const res = await p.evaluate(() => {
        const T = window.SortingHoops;
        /* two rules whose regions are all populated */
        T.mode = 'guess';
        T.ruleA = { f: 'colour', v: 'red' };
        T.ruleB = { f: 'shape', v: 'circle' };
        T.phase = 'sort';
        T.dealt = []; T.placement = {}; T._deal(12); T.render();

        const find = (want) => T.dealt.filter((it) => T.regionFor(it, T.ruleA, T.ruleB) === want)[0];
        const out = { cases: [], total0: T.dealt.length };

        /* a card whose truth is 'b', dropped into 'a' -> must go to TRAY.
           The shipped tool filed it OUTSIDE, which poisoned the evidence. */
        const b = find('b');
        if (b) { T._place(b.uid, 'a'); out.cases.push(['truth=b dropped in a', T.placement[b.uid]]); }
        /* a card whose truth is 'out', dropped into 'a' -> must go OUT */
        const o = find('out');
        if (o) { T._place(o.uid, 'a'); out.cases.push(['truth=out dropped in a', T.placement[o.uid]]); }
        /* a card whose truth is 'both', dropped into 'both' -> KEPT */
        const bo = find('both');
        if (bo) { T._place(bo.uid, 'both'); out.cases.push(['truth=both dropped in both', T.placement[bo.uid]]); }
        /* a card whose truth is 'a', dropped into 'out' -> back to TRAY */
        const a = find('a');
        if (a) { T._place(a.uid, 'out'); out.cases.push(['truth=a dropped in out', T.placement[a.uid]]); }
        out.total1 = T.dealt.length;
        return out;
      });
      const want = { 'truth=b dropped in a': 'tray', 'truth=out dropped in a': 'out',
        'truth=both dropped in both': 'both', 'truth=a dropped in out': 'tray' };
      res.cases.forEach((c) => is(c[1] === want[c[0]], `${c[0]} -> ${c[1]} (want ${want[c[0]]})`));
      is(res.cases.length === 4, `all four refusal cases were exercised (${res.cases.length})`);
      is(res.total0 === res.total1, `NOTHING IS DESTROYED: ${res.total0} dealt before, ${res.total1} after`);
      await p.close();
    }

    /* ---------------- L6 no tell ---------------- */
    console.log('\n[L6] ⚠ NO TELL — the hovered DOM is identical either way');
    {
      const p = await open({});
      const same = await p.evaluate(() => {
        const T = window.SortingHoops;
        T.mode = 'guess'; T.phase = 'sort';
        T.ruleA = { f: 'colour', v: 'red' }; T.ruleB = { f: 'shape', v: 'circle' };
        T.dealt = []; T.placement = {}; T._deal(12); T.render();
        const rb = document.querySelector('.hp-rings').getBoundingClientRect();
        let x = null;
        for (let f = 2; f <= 98; f++) {
          const px = rb.left + rb.width * f / 100;
          if (T._regionAt(px, rb.top + rb.height / 2) === 'a') { x = px; break; }
        }
        const y = rb.top + rb.height / 2;
        const hit = T.dealt.filter((it) => T.satisfies(T.ruleA, it))[0];
        const miss = T.dealt.filter((it) => !T.satisfies(T.ruleA, it))[0];
        const snap = (uid) => {
          T.carry = uid; T._hover(x, y);
          const s = document.querySelector('.hp-rings').innerHTML;
          T._clearHover();
          return s;
        };
        return { a: snap(hit && hit.uid), b: snap(miss && miss.uid), had: !!(hit && miss) };
      });
      is(same.had, 'the tray held both a satisfying and a non-satisfying item');
      is(same.a === same.b, 'the hovered ring DOM is byte-identical for both');
      await p.close();
    }

    /* ---------------- L7 the sweep x EVERY configuration ---------------- */
    console.log('\n[L7] ⭐ the sweep 320-1366 x EVERY configuration, HUMAN scrolling only');
    for (const cfgName of Object.keys(CONFIGS)) {
      for (const [w, h] of VIEWPORTS) {
        const p = await open({ w, h, premium: cfgName === 'pictures' });
        try { await CONFIGS[cfgName](p); } catch (e) { bad(`${cfgName} @${w}: could not reach the state — ${e.message}`); await p.close(); continue; }
        const m = await p.evaluate(MEASURE, MIN_TAP, MIN_CELL, MIN_TEXT);
        const tag = `${cfgName} ${w}x${h}`;

        /* ⭐ FITS, or REACHABLE BY A REAL WHEEL. No scriptTop anywhere.
           ⚠ AND THE WHEEL IS A LOOP, because a human turns a wheel more
           than once. My first version sent ONE event with a large deltaY;
           Chrome clamps a single wheel event, so it moved ~200px against a
           700px need and reported "did NOT move it" against a tool that
           scrolls perfectly well. A probe that gives up after one turn is
           measuring the probe. */
        let fits = m.lowest <= m.vh + 8;
        if (!fits) {
          await p.mouse.move(Math.round(w / 2), Math.round(h / 2));
          /* ⚠ TWO CONSECUTIVE STALLS before concluding it is trapped. One
             was not enough: in the pictures configuration the cards are
             still decoding on the first turns, the document is still
             growing, and a single unchanged scrollTop read as "the tool
             cannot scroll" against a tool that scrolls to 754px. A probe
             that concludes from one sample is measuring the probe. */
          let last = -1, stalls = 0, turns = 0, after = m;
          await wait(400);
          while (!fits && turns < 30 && stalls < 2) {
            await p.mouse.wheel({ deltaY: 200 });
            await wait(80);
            turns++;
            const top = await p.evaluate(() => (document.scrollingElement || document.documentElement).scrollTop);
            after = await p.evaluate(MEASURE, MIN_TAP, MIN_CELL, MIN_TEXT);
            fits = after.lowest <= after.vh + 8;
            stalls = (top === last) ? stalls + 1 : 0;
            last = top;
          }
          is(fits, `${tag}: lowest control ${m.lowest} > vh ${m.vh}, and a REAL WHEEL ` +
            (fits ? `brought it into view after ${turns} turn(s)` : `did NOT reach it (${after.lowest} after ${turns} turns)`));
        } else {
          ok(`${tag}: all ${m.n} controls FIT (lowest ${m.lowest} <= ${m.vh})`);
        }
        is(m.overRight <= 1, `${tag}: contained in the CARD (${m.overRight}px past its right edge, ${m.farEl})`);
        is(m.smallCtl.length === 0, `${tag}: CONTROL floor >= ${MIN_TAP}px` + (m.smallCtl.length ? ' — ' + m.smallCtl.slice(0, 3).join(', ') : ''));
        is(m.smallCell.length === 0, `${tag}: CANVAS floor >= ${MIN_CELL}px` + (m.smallCell.length ? ' — ' + m.smallCell.slice(0, 3).join(', ') : ''));
        is(m.tiny.length === 0, `${tag}: text >= ${MIN_TEXT}px` + (m.tiny.length ? ' — ' + m.tiny.join(', ') : ''));
        is(m.clipped.length === 0, `${tag}: no clipped text` + (m.clipped.length ? ' — ' + m.clipped.slice(0, 2).join(', ') : ''));
        is(p._errs.length === 0, `${tag}: no js errors` + (p._errs[0] ? ' — ' + p._errs[0] : ''));
        if (SHOT && [360, 768, 1024].indexOf(w) > -1) {
          await p.screenshot({ path: path.join(SHOT_DIR, cfgName + '-' + w + '.png'), fullPage: true });
        }
        await p.close();
      }
    }

    /* ---------------- L8 consequence per control ---------------- */
    console.log('\n[L8] ⭐ CONSEQUENCE per control — what it changes ELSEWHERE');
    {
      /* ⚠ audit-tool-control-liveness asks "did the DOM change?", and a
         control that highlights ITSELF changes the DOM — that is how #39
         scored a numeral strip 84/84 while its only effect in 1067 lines
         was its own highlight class. These assert the effect. */
      const cases = [
        ['more', 'More things tops the tray up without touching the mat',
          async (p) => {
            await p.evaluate(() => {
              const T = window.SortingHoops;
              const tray = T.trayItems();
              T._place(tray[0].uid, 'a'); T._place(tray[1].uid, 'a'); T._place(tray[2].uid, 'a');
            });
            await wait(200);
            const b4 = await p.evaluate(() => ({ tray: window.SortingHoops.trayItems().length,
              mat: document.querySelectorAll('.hp-mat .hp-tile').length }));
            await click(p, '[data-fk="more"]', 0);
            const af = await p.evaluate(() => ({ tray: window.SortingHoops.trayItems().length,
              mat: document.querySelectorAll('.hp-mat .hp-tile').length }));
            return { okk: af.tray > b4.tray && af.mat === b4.mat,
              why: `tray ${b4.tray}->${af.tray} (must rise), mat ${b4.mat}->${af.mat} (must NOT change)` };
          }],
        ['clear', 'Clear the mat ARMS on the first press and does not clear',
          async (p) => {
            await p.evaluate(() => {
              const T = window.SortingHoops; T._place(T.trayItems()[0].uid, 'a');
            });
            await wait(200);
            const b4 = await p.evaluate(() => document.querySelectorAll('.hp-mat .hp-tile').length);
            await click(p, '[data-fk="clear"]', 0);
            const mid = await p.evaluate(() => ({ mat: document.querySelectorAll('.hp-mat .hp-tile').length,
              armed: window.SortingHoops.armClear }));
            await click(p, '[data-fk="clear"]', 0);
            const af = await p.evaluate(() => document.querySelectorAll('.hp-mat .hp-tile').length);
            return { okk: mid.mat === b4 && mid.armed === true && af === 0,
              why: `press1 mat ${b4}->${mid.mat} armed=${mid.armed}; press2 mat -> ${af}` };
          }],
        ['reveal', 'Show the rules changes the CAPTIONS, not just its own label',
          async (p) => {
            await CONFIGS['sort-guess'](p);
            const b4 = await p.evaluate(() => Array.prototype.map.call(document.querySelectorAll('.hp-cap'), (e) => e.textContent).join('|'));
            await click(p, '[data-fk="reveal"]', 0);
            const af = await p.evaluate(() => Array.prototype.map.call(document.querySelectorAll('.hp-cap'), (e) => e.textContent).join('|'));
            return { okk: b4 !== af && af.indexOf('Hidden') < 0, why: `"${b4}" -> "${af}"` };
          }],
        ['change', 'Change the rules returns to the setup phase',
          async (p) => {
            await CONFIGS['sort-guess'](p);
            await click(p, '[data-fk="change"]', 0);
            const s = await p.evaluate(() => ({ phase: window.SortingHoops.phase, setup: !!document.querySelector('.hp-setup') }));
            return { okk: s.phase === 'setup' && s.setup, why: JSON.stringify(s) };
          }]
      ];
      for (const [fk, name, run] of cases) {
        const p = await open({});
        try {
          const r = await run(p);
          is(r.okk, `${name} — ${r.why}`);
        } catch (e) { bad(`${fk}: ${e.message}`); }
        await p.close();
      }
    }

    /* ---------------- L9 the free/paid seam ---------------- */
    console.log('\n[L9] the free/paid seam');
    {
      const free = await open({});
      await click(free, '.hp-bar .hp-chip', 4);
      await wait(900);
      await click(free, '.hp-bar .hp-chip', 1);
      await click(free, '.hp-hoopcard-a .hp-chip', 1);
      const f = await free.evaluate(() => ({
        fams: Array.prototype.map.call(document.querySelectorAll('.hp-famrow'), (e) => ({
          q: e.querySelector('.hp-famq').textContent, locked: e.className.indexOf('hp-locked') > -1 })),
        sheet: !!document.getElementById('hp-printsheet')
      }));
      const locked = f.fams.filter((x) => x.locked);
      is(locked.length > 0, `locked families are PRESENT in position with their real question (${locked.length})`);
      is(locked.every((x) => x.q && x.q.length > 3 && x.q.indexOf('?') > -1),
        'each locked row shows its real question, not a placeholder');
      /* ⭐ THE PAYWALL BYPASS. Measured on the shipped tool as an anonymous
         visitor with emulateMediaType('print'): the paid sheet rendered,
         because the CHIP was gated and the @media print block was not. */
      is(f.sheet === false, 'the print sheet is ABSENT from the free DOM — Ctrl+P cannot bypass the chip');
      await free.emulateMediaType('print');
      await wait(200);
      const printedFree = await free.evaluate(() => {
        const s = document.getElementById('hp-printsheet');
        return !!(s && getComputedStyle(s).display !== 'none');
      });
      is(printedFree === false, 'and under @media print a free visitor still gets no sheet');
      await free.close();

      const paid = await open({ premium: true });
      await wait(600);
      const pd = await paid.evaluate(() => !!document.getElementById('hp-printsheet'));
      is(pd === true, 'a subscriber DOES get the sheet');
      await paid.emulateMediaType('print');
      await wait(200);
      const ink = await paid.evaluate(() => {
        const s = document.getElementById('hp-printsheet');
        if (!s) return { vis: false };
        return { vis: getComputedStyle(s).display !== 'none',
          circles: s.querySelectorAll('circle').length,
          rows: s.querySelectorAll('.hp-printrow').length,
          wrapHidden: getComputedStyle(document.querySelector('.hp-wrap')).display === 'none' };
      });
      is(ink.vis, 'the sheet reaches paper');
      is(ink.circles === 2, `⭐ and it DRAWS THE HOOPS (${ink.circles} circles) — the shipped sheet was four headings`);
      is(ink.rows === 5, `five regions on the sheet incl. the unsorted remainder (${ink.rows})`);
      is(ink.wrapHidden, 'the interactive chrome is gone from the sheet');
      await paid.close();
    }

    /* ---------------- L10 keyboard ---------------- */
    console.log('\n[L10] keyboard grab-and-place — a pick-up + put-down is a MOVE');
    {
      const p = await open({});
      const r = await p.evaluate(async () => {
        const T = window.SortingHoops;
        const tile = document.querySelector('.hp-slot-tray .hp-tile');
        const uid = tile.getAttribute('data-uid');
        const before = T.placement[uid];
        tile.focus();
        const key = (k) => tile.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true }));
        key('Enter');
        return { before, carried: T.carry === uid, target: T.carryTarget, uid };
      });
      is(r.carried, 'Enter PICKS UP rather than placing');
      is(r.target && r.target !== r.before,
        `⭐ pick-up pre-targets a DIFFERENT region (${r.before} -> ${r.target}), so Enter+Space in one tick is a MOVE, not a toggle that nets to zero`);
      const moved = await p.evaluate(() => {
        const T = window.SortingHoops;
        const uid = T.carry;
        const tile = document.querySelector('.hp-tile[data-uid="' + uid.replace(/"/g, '\\"') + '"]');
        tile.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true }));
        return { where: T.placement[uid], carry: T.carry };
      });
      is(moved.where !== 'tray' && !moved.carry, `and the second press PLACES it (${moved.where})`);
      await p.close();
    }

    /* ---------------- L11 poison ---------------- */
    console.log('\n[L11] ⭐ POISON — these checks must FAIL against a doctored page');
    {
      /* (a) containment: widen a child past the card and require a catch */
      const p = await open({ w: 1024, h: 900 });
      await p.evaluate(() => {
        const t = document.querySelector('.hp-tile');
        t.style.position = 'fixed'; t.style.left = '3000px'; t.style.width = '200px';
      });
      const m = await p.evaluate(MEASURE, MIN_TAP, MIN_CELL, MIN_TEXT);
      is(m.overRight > 1, `containment poison FIRES (${m.overRight}px past the card)`);
      await p.close();

      /* (b) the partition: break the hit test and require dead points.
         ⚠ THE CONTROL MATTERS — L3 already proved the correct build has
         ZERO dead points, so this shows the check can distinguish. */
      const q = await open({ w: 1024, h: 900 });
      const dead = await q.evaluate(() => {
        const T = window.SortingHoops;
        const real = T._regionAt.bind(T);
        T._regionAt = function (x, y) {
          const r = document.querySelector('.hp-rings').getBoundingClientRect();
          const f = (x - r.left) / r.width;
          if (f > 0.33 && f < 0.40) return null;     /* the shipped dead band */
          return real(x, y);
        };
        const rb = document.querySelector('.hp-rings').getBoundingClientRect();
        let n = 0;
        for (let fx = 1; fx <= 99; fx++) if (!T._regionAt(rb.left + rb.width * fx / 100, rb.top + rb.height / 2)) n++;
        return n;
      });
      is(dead > 0, `partition poison FIRES (${dead} dead points against a re-introduced dead band)`);
      await q.close();

      /* (c) the stroke check: a hairline must be caught */
      const s = await open({ w: 1024, h: 900 });
      const hair = await s.evaluate(() => {
        const st = document.createElement('style');
        st.textContent = '.hp-ring{stroke-width:.55 !important;}';
        document.head.appendChild(st);
        return parseFloat(getComputedStyle(document.querySelector('.hp-ring')).strokeWidth);
      });
      is(hair < 4, `stroke poison FIRES (${hair}px, the shipped value)`);
      await s.close();
    }
  } finally {
    await browser.close();
    server.close();
  }

  console.log('\n' + (FAIL ? `FAILED — ${FAIL} failed, ${PASS} passed` : `ALL GREEN — ${PASS} assertions`));
  process.exit(FAIL ? 1 : 0);
})();
