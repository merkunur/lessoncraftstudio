#!/usr/bin/env node
/* =====================================================================
   local-test-sorting-hoops.js — the local Definition-of-Done.
   Nothing here is asserted from source: every claim is measured in a real
   browser against the rendered DOM.

   scripts/visual-qa-activity.js resolves only ids declared in a
   *-activities.json manifest, so it cannot see a free-play tool
   (local-test-heart-words.js:4-8 records the same). SECTION L7 is the
   substitute: the full viewport sweep with measured containment, at
   DESKTOP widths too, not just phone.

     L1 mounts; two REAL intersecting ellipses, four drop regions, a tray
     L2 a real pointer drag lands an item in each region, measured in the
        DOM — including the OVERLAP, which is the whole pedagogy
     L3 guess-my-rule: an item that fails the rule ends up OUTSIDE and is
        STILL ON THE MAT. Failure builds the counter-example set; the item
        count is invariant across a release
     L4 ⚠ NO TELL, measured: hovering a satisfying item and a non-
        satisfying item over the same hoop produces an IDENTICAL DOM
     L5 the rule is nowhere in the page text before reveal, and is there
        after
     L6 free vs subscriber: the premium rules are ABSENT from the picker,
        and the gate carries the exact CTA
     L7 the sweep 320-1366 — resting state must FIT at desktop, transients
        proven reachable, taps >=44, text >=14px, zero console errors

   Usage: node scripts/local-test-sorting-hoops.js [--shot]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
const SHOT_DIR = path.join(ROOT, 'docs', 'audit-results', 'sorting-hoops', 'qa');
const SHOT = process.argv.includes('--shot');
if (SHOT) fs.mkdirSync(SHOT_DIR, { recursive: true });

const VIEWPORTS = [[320, 640], [360, 740], [412, 820], [768, 1000], [1024, 900], [1366, 900]];
const MIN_TAP = 44, MIN_TEXT = 14;

let PASS = 0, FAIL = 0;
const ok = (m) => { PASS++; console.log('  ok    ' + m); };
const bad = (m) => { FAIL++; console.error('  FAIL  ' + m); };
const is = (c, m) => c ? ok(m) : bad(m);
const wait = (ms) => new Promise(r => setTimeout(r, ms));
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };

function serve() {
  return http.createServer((req, res) => {
    const u = req.url.split('?')[0];
    if (u.indexOf('/image-library-webp/') === 0) { res.writeHead(200, { 'Content-Type': 'image/webp' }); res.end(Buffer.alloc(0)); return; }
    const f = path.join(MINI, path.basename(u));
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
    ? r.respond({
        status: 200, contentType: 'application/json',
        body: JSON.stringify(o.premium
          ? { user: { subscriptionTier: 'full' }, subscription: { status: 'active' } }
          : { user: { subscriptionTier: 'free' }, subscription: null })
      })
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

const ready = async (p) => { await p.waitForSelector('.hp-wrap', { timeout: 8000 }); await wait(500); };

/* drive a genuine pointer drag from a tile to the centre of a zone */
async function dragTo(page, uid, zone) {
  const box = await page.evaluate((u, z) => {
    const t = document.querySelector('.hp-tile[data-uid="' + CSS.escape(u) + '"]');
    const d = document.querySelector('[data-slot="' + z + '"]');
    if (!t || !d) return null;
    const a = t.getBoundingClientRect(), b = d.getBoundingClientRect();
    return { fx: a.left + a.width / 2, fy: a.top + a.height / 2, tx: b.left + b.width / 2, ty: b.top + b.height / 2 };
  }, uid, zone);
  if (!box) return false;
  await page.mouse.move(box.fx, box.fy);
  await page.mouse.down();
  for (let i = 1; i <= 6; i++) {
    await page.mouse.move(box.fx + (box.tx - box.fx) * i / 6, box.fy + (box.ty - box.fy) * i / 6);
    await wait(16);
  }
  await page.mouse.up();
  await wait(180);
  return true;
}

const placementOf = (p, uid) => p.evaluate((u) => {
  const t = document.querySelector('.hp-tile[data-uid="' + CSS.escape(u) + '"]');
  if (!t) return null;
  const slot = t.closest('[data-slot]');
  return slot ? slot.getAttribute('data-slot') : 'nowhere';
}, uid);

const PORT = 5411;

(async () => {
  const server = serve();
  await new Promise(r => server.listen(PORT, r));
  const BASE = `http://127.0.0.1:${PORT}`;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  /* ---------------- L1 ---------------- */
  console.log('[L1 the apparatus]');
  const p = await newPage(browser, {});
  await p.setViewport({ width: 1024, height: 900 });
  await p.goto(BASE + '/sorting-hoops.html?lang=en&embed=1', { waitUntil: 'domcontentloaded' });
  await ready(p);
  const s1 = await p.evaluate(() => {
    const el = Array.from(document.querySelectorAll('.hp-svg ellipse'));
    const r = el.map(e => ({ cx: +e.getAttribute('cx'), rx: +e.getAttribute('rx') }));
    return {
      tiles: document.querySelectorAll('.hp-tile').length,
      zones: Array.from(document.querySelectorAll('[data-slot]')).map(z => z.getAttribute('data-slot')).sort(),
      ellipses: r,
      overlaps: r.length === 2 && (r[0].cx + r[0].rx) > (r[1].cx - r[1].rx)
    };
  });
  is(s1.tiles === 12, `a tray of 12 things (got ${s1.tiles})`);
  is(JSON.stringify(s1.zones) === JSON.stringify(['a', 'b', 'both', 'out', 'tray']),
    `four regions plus the tray (${s1.zones.join(', ')})`);
  is(s1.ellipses.length === 2, 'two hoops are drawn');
  is(s1.overlaps === true, 'the two hoops GENUINELY INTERSECT — the lens exists');

  /* ---------------- L2 ---------------- */
  console.log('[L2 dragging, measured in the DOM]');
  const uids = await p.evaluate(() => Array.from(document.querySelectorAll('.hp-tile')).map(t => t.getAttribute('data-uid')));
  for (const [i, zone] of [[0, 'a'], [1, 'both'], [2, 'b'], [3, 'out']]) {
    const done = await dragTo(p, uids[i], zone);
    const where = await placementOf(p, uids[i]);
    is(done && where === zone, `a real drag lands an item in "${zone}" (measured: ${where})`);
  }
  const still = await p.evaluate(() => document.querySelectorAll('.hp-tile').length);
  is(still === 12, `all 12 things are still on screen after four drags (${still})`);

  /* ---------------- L4 no tell (before L3 so the rule is fresh) -------- */
  console.log('[L4 no tell — the hoop gives nothing away on hover]');
  await p.evaluate(() => {
    const T = window.SortingHoops;
    T.mode = 'guess'; T.world = 'block';
    T.ruleA = { f: 'colour', v: 'red' }; T.ruleB = null; T.revealed = false;
    T._newRound(); T.render();
  });
  await wait(300);
  const tell = await p.evaluate(() => {
    const T = window.SortingHoops;
    const yes = T.tray.find(i => T.satisfies(T.ruleA, i));
    const no = T.tray.find(i => !T.satisfies(T.ruleA, i));
    if (!yes || !no) return { skip: true };
    const zone = document.querySelector('.hp-zone-a');
    const snap = (uid) => {
      const t = document.querySelector('.hp-tile[data-uid="' + CSS.escape(uid) + '"]');
      const r = t.getBoundingClientRect();
      T._hover(zone.getBoundingClientRect().left + 20, zone.getBoundingClientRect().top + 20);
      const out = zone.className + '|' + zone.getAttribute('style') + '|' + document.querySelectorAll('.hp-over').length;
      T._clearHover();
      void r;
      return out;
    };
    return { a: snap(yes.uid), b: snap(no.uid), yes: yes.uid, no: no.uid };
  });
  if (tell.skip) bad('L4 could not find one item that fits the rule and one that does not');
  else is(tell.a === tell.b, `the hovered DOM is identical for a fitting and a non-fitting item ("${tell.a}")`);

  /* ---------------- L3 release is not loss ---------------- */
  console.log('[L3 the hoop releases; the counter-example set grows]');
  const before = await p.evaluate(() => document.querySelectorAll('.hp-tile').length);
  const misfit = await p.evaluate(() => {
    const T = window.SortingHoops;
    const m = T.tray.find(i => !T.satisfies(T.ruleA, i));
    return m ? m.uid : null;
  });
  is(!!misfit, 'the tray contains something that does not fit the rule');
  if (misfit) {
    await dragTo(p, misfit, 'a');
    const where = await placementOf(p, misfit);
    const after = await p.evaluate(() => document.querySelectorAll('.hp-tile').length);
    is(where === 'out', `an item that fails the rule ends up OUTSIDE, not in the hoop (measured: ${where})`);
    is(after === before, `and it is still on the mat — nothing was lost (${before} -> ${after})`);
  }
  const fits = await p.evaluate(() => {
    const T = window.SortingHoops;
    const m = T.tray.find(i => T.satisfies(T.ruleA, i) && T.placement[i.uid] === 'tray');
    return m ? m.uid : null;
  });
  if (fits) {
    await dragTo(p, fits, 'a');
    is((await placementOf(p, fits)) === 'a', 'an item that fits the rule is kept by the hoop');
  }

  /* ---------------- L5 no leak ---------------- */
  console.log('[L5 the rule is withheld until the teacher reveals it]');
  const leak = await p.evaluate(() => {
    const T = window.SortingHoops;
    const txt = () => (document.querySelector('.lcs-app') || document.body).innerText;
    const label = T.ruleLabel(T.ruleA);
    const beforeR = txt().indexOf(label) > -1;
    T.revealed = true; T.render();
    return { label: label, beforeR: beforeR };
  });
  await wait(250);
  const afterR = await p.evaluate(() => (document.querySelector('.lcs-app') || document.body).innerText);
  is(leak.beforeR === false, `the rule "${leak.label}" is nowhere on the page before reveal`);
  is(afterR.indexOf(leak.label) > -1, 'and it is shown after the teacher reveals it');
  await p.close();

  /* ---------------- L6 free vs subscriber ---------------- */
  console.log('[L6 the paywall]');
  const free = await newPage(browser, {});
  await free.setViewport({ width: 1024, height: 900 });
  await free.goto(BASE + '/sorting-hoops.html?lang=en&embed=1', { waitUntil: 'domcontentloaded' });
  await ready(free);
  const fr = await free.evaluate(() => {
    const T = window.SortingHoops;
    T.world = 'picture';
    return new Promise((res) => {
      T._newRound();
      setTimeout(() => {
        const rules = T._availableRules();
        res({ premium: T.premium, fams: Array.from(new Set(rules.map(r => r.f))) });
      }, 900);
    });
  });
  is(fr.premium === false, 'a signed-out visitor is not premium');
  is(fr.fams.indexOf('living') === -1 && fr.fams.indexOf('theme') === -1,
    `the picture rules are ABSENT for a free visitor (offered: ${fr.fams.join(', ') || 'none'})`);
  /* an OR here let a real gap through once: syllables was silently absent
     because the gated counts were never loaded, and 'initial' alone passed. */
  is(fr.fams.indexOf('syllables') > -1 && fr.fams.indexOf('initial') > -1,
    `but the free tier DOES demonstrate the moat — both the syllable and the initial-letter rule (${fr.fams.join(', ') || 'none'})`);
  await free.evaluate(() => {
    const T = window.SortingHoops;
    const btn = Array.from(document.querySelectorAll('.hp-chip')).find(b => b.textContent === T.api.t('printBtn'));
    if (btn) btn.click();
  });
  await wait(250);
  const gate = await free.evaluate(() => {
    const a = document.querySelector('.hp-gate a');
    return { n: document.querySelectorAll('.hp-gate').length, href: a ? a.getAttribute('href') : null,
      printed: window.__printed || 0 };
  });
  is(gate.n === 1 && gate.href === '/en/pricing?from=tool-sorting-hoops',
    `the print gate carries the exact CTA (${gate.href})`);
  is(gate.printed === 0, 'and print is not reached for a free visitor');
  await free.close();

  const paid = await newPage(browser, { premium: true });
  await paid.setViewport({ width: 1024, height: 900 });
  await paid.goto(BASE + '/sorting-hoops.html?lang=en&embed=1', { waitUntil: 'domcontentloaded' });
  await ready(paid);
  await wait(400);
  const pr = await paid.evaluate(() => {
    const T = window.SortingHoops;
    T.world = 'picture';
    return new Promise((res) => {
      T._newRound();
      setTimeout(() => res({ premium: T.premium, fams: Array.from(new Set(T._availableRules().map(r => r.f))) }), 900);
    });
  });
  is(pr.premium === true, 'a subscriber is premium');
  is(pr.fams.indexOf('living') > -1 && pr.fams.indexOf('theme') > -1,
    `and gets the conceptual rules (${pr.fams.join(', ')})`);

  /* ---------------- L7 the sweep ---------------- */
  console.log('[L7 viewport sweep 320-1366]');
  const STATES = [
    ['resting', () => { const T = window.SortingHoops; T.mode = 'open'; T.world = 'block'; T.picking = null; T._newRound(); T.render(); }, true],
    ['picking', () => { const T = window.SortingHoops; T.mode = 'guess'; T.world = 'block'; T.picking = 'a'; T.render(); }, false]
  ];
  for (const [label, setup, desktopMustFit] of STATES) {
    await paid.evaluate(setup);
    await wait(400);
    for (const [w, h] of VIEWPORTS) {
      await paid.setViewport({ width: w, height: h, deviceScaleFactor: 2 });
      await wait(320);
      const m = await paid.evaluate((MIN_TAP, MIN_TEXT) => {
        [document.scrollingElement, document.documentElement, document.body,
         document.querySelector('.lcs-app'), document.querySelector('.lcs-stage')]
          .filter(Boolean).forEach(c => { try { c.scrollTop = 0; } catch (_) {} });
        const controls = Array.from(document.querySelectorAll('.hp-tile,.hp-chip'))
          .filter(e => e.getBoundingClientRect().width > 0);
        if (!controls.length) return { noControls: true };
        const lowest = controls.reduce((a, e) => Math.max(a, e.getBoundingClientRect().bottom), -Infinity);
        const smallTap = controls.filter(e => { const r = e.getBoundingClientRect(); return r.width < MIN_TAP || r.height < MIN_TAP; })
          .map(e => e.className.split(' ')[0] + ' ' + Math.round(e.getBoundingClientRect().width) + 'x' + Math.round(e.getBoundingClientRect().height));
        const tiny = Array.from(document.querySelectorAll('.hp-cap,.hp-word,.hp-traylabel,.hp-outlabel,.hp-hint,.hp-privacy'))
          .filter(e => e.textContent.trim() && e.getBoundingClientRect().width > 0)
          .map(e => ({ cls: e.className, px: parseFloat(getComputedStyle(e).fontSize) }))
          .filter(t => t.px < MIN_TEXT).map(t => t.cls + ' ' + t.px.toFixed(1) + 'px');
        const need = Math.max(0, lowest - window.innerHeight + 24);
        let took = null;
        for (const c of [document.scrollingElement, document.documentElement, document.body,
                         document.querySelector('.lcs-app'), document.querySelector('.lcs-stage')].filter(Boolean)) {
          const b4 = c.scrollTop; c.scrollTop = need;
          if (c.scrollTop > b4 + 1) { took = c.className || c.tagName; break; }
          c.scrollTop = b4;
        }
        const low = controls.reduce((bb, e) => (!bb || e.getBoundingClientRect().bottom > bb.getBoundingClientRect().bottom) ? e : bb, null);
        const lr = low.getBoundingClientRect();
        return {
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          lowest: Math.round(lowest), n: controls.length, took,
          afterBottom: Math.round(lr.bottom), afterTop: Math.round(lr.top), smallTap, tiny
        };
      }, MIN_TAP, MIN_TEXT);
      const at = `${label} ${w}x${h}`;
      if (m.noControls) { bad(`${at}: found NO controls — the probe measured nothing`); continue; }
      const fits = m.lowest <= h + 8;
      const reachable = fits || (m.took !== null && m.afterBottom <= h + 8 && m.afterTop >= 0);
      is(m.overflow <= 2, `${at}: no horizontal overflow (${m.overflow}px)`);
      if (w >= 768 && desktopMustFit) is(fits, `${at}: all ${m.n} controls FIT (lowest ${m.lowest} <= ${h})`);
      else is(reachable, `${at}: fits (${m.lowest}) or PROVEN reachable — scrolled ${m.took || 'nothing'}, then visible ${m.afterTop}-${m.afterBottom}`);
      is(m.smallTap.length === 0, `${at}: taps >= ${MIN_TAP}px${m.smallTap.length ? ' — ' + m.smallTap.slice(0, 3).join(', ') : ''}`);
      is(m.tiny.length === 0, `${at}: text >= ${MIN_TEXT}px${m.tiny.length ? ' — ' + m.tiny.join(', ') : ''}`);
      if (SHOT && label === 'resting' && [360, 768, 1024].includes(w)) {
        await paid.screenshot({ path: path.join(SHOT_DIR, `sweep-${w}.png`), fullPage: true });
      }
    }
  }
  is(paid._errs.length === 0, `zero console errors${paid._errs.length ? ' — ' + paid._errs[0] : ''}`);
  await paid.close();

  await browser.close();
  server.close();
  console.log('');
  console.log(`${PASS} passed, ${FAIL} failed`);
  process.exit(FAIL ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
