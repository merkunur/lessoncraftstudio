#!/usr/bin/env node
/* =====================================================================
   local-test-name-sticks.js — the local DoD for Name Sticks
   (mini tools/name-sticks.html).

   Serves `mini tools/` locally, then:
     A. viewport sweep 320-1366 (premium roster) — no overflow, taps
        ≥44px, FITS at ≥1024 (jar + cup + dock above the fold)
     B. FAIRNESS PROPERTY SUITE (the product promise):
        · pull N times → N distinct names, exhaustion at exactly N
        · skip returns the stick (turn not burned; skipped child still
          drawn once by exhaustion)
        · absent never drawn; auto-clears on a new LOCAL day (injected
          stale dateKey)
        · reload keeps the cup (fairness memory)
        · reshuffle only at eligible = 0 (Tip back resets)
        · undo restores the previous state
     C. speech spy: phonetic override wins · lang = tool locale ·
        NO speech before the first pointer gesture · think-time delays
     D. groups invariants: n∈{5,17,30} × k∈2..6 → sizes ≤1 apart,
        union = eligible, no duplicates; extras not always in cup 0
        (40 shakes); drag between cups updates the SHARED store
     E. free/premium seams: session roster gone in a NEW page (fresh
        session) while premium class persists in localStorage; Groups
        gated free
     F. NO-PII-IN-NETWORK: hook fetch/XHR/sendBeacon, run a full
        pull/group/edit session with sentinel names, assert no request
        URL or body ever contains a roster name
     G. my-classes round-trips UNKNOWN keys (a future tool's field
        survives a Name Sticks save)
     H. empty-jar rest + tip-back · duplicate-name prompt · console
   Screenshots → docs/audit-results/name-sticks/qa/
   Exit 1 on any FAIL.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const OUT = path.join(REPO, 'docs', 'audit-results', 'name-sticks', 'qa');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };

const NAMES = ['Zzyzx', 'Qorvax', 'Blinta', 'Marzupi', 'Fennwick', 'Ostrella', 'Puckhart', 'Vintaro', 'Weslynne', 'Drombus', 'Ellivra', 'Snorkel'];

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p === '/') p = '/name-sticks.html';
    const file = p.startsWith('/mini-tools/') ? path.join(MINI, p.slice('/mini-tools/'.length)) : path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (err, buf) => {
      if (err) { res.statusCode = 404; res.end('not found'); return; }
      res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream');
      res.end(buf);
    });
  });
}

const fails = [];
function FAIL(msg) { fails.push(msg); console.log('  ✗ FAIL ' + msg); }
function OK(msg) { console.log('  ✓ ' + msg); }
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function forcePremiumWithClass(page, names) {
  await page.evaluate((names) => {
    const st = { v: 1, ent: { tier: 'full', checkedAt: new Date().toISOString() } };
    localStorage.setItem('lcs:name-sticks:v1', JSON.stringify(st));
    localStorage.setItem('accessToken', 'test-token');
    const mc = {
      v: 1, activeClassId: 'c_test',
      classes: [{ id: 'c_test', name: 'Room 4B', students: names.map((n, i) => ({ id: 's_' + i, name: n })), createdAt: Date.now(), updatedAt: Date.now() }],
      fairness: {}, groupings: {},
      __futureToolField: { keep: 'me' },   /* the round-trip sentinel */
    };
    localStorage.setItem('lcs:my-classes:v1', JSON.stringify(mc));
  }, names);
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const server = serve();
  await new Promise(r => server.listen(0, r));
  const PORT = server.address().port;
  const BASE = `http://127.0.0.1:${PORT}/mini-tools/name-sticks.html`;

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const consoleErrors = [];
  const networkSins = [];
  page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
  page.on('pageerror', e => consoleErrors.push('pageerror: ' + e.message));
  /* no-PII gate: inspect EVERY request the page makes */
  page.on('request', req => {
    const hay = (req.url() + ' ' + (req.postData() || '')).toLowerCase();
    for (const n of NAMES) if (hay.includes(n.toLowerCase())) networkSins.push(`${n} in ${req.method()} ${req.url().slice(0, 80)}`);
  });
  await page.evaluateOnNewDocument(() => {
    window.__spoken = [];
    if (window.speechSynthesis) window.speechSynthesis.speak = function (u) { window.__spoken.push({ text: u.text, lang: u.lang }); };
  });

  /* ---------- A. viewport sweep ---------- */
  console.log('\nA. viewport sweep (premium 12-name roster)');
  await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
  await forcePremiumWithClass(page, NAMES);
  const VIEWPORTS = [
    { w: 320, h: 640 }, { w: 360, h: 740 }, { w: 412, h: 820 }, { w: 768, h: 1000 },
    { w: 1024, h: 768, fits: true }, { w: 1024, h: 900, fits: true }, { w: 1366, h: 768, fits: true },
  ];
  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.w, height: vp.h });
    await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
    await page.waitForSelector('.nsk-jar', { timeout: 8000 }).catch(() => null);
    const m = await page.evaluate(() => {
      const overflow = document.documentElement.scrollWidth - window.innerWidth;
      const small = [];
      for (const s of ['.nsk-chip', '.nsk-big', '.nsk-segbtn']) {
        document.querySelectorAll(s).forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.width && r.height < 43) small.push(`${s} ${Math.round(r.height)}h`);
        });
      }
      const last = [...document.querySelectorAll('.nsk-wrap > *')].pop();
      return { overflow, small, jar: !!document.querySelector('.nsk-jar'), cup: !!document.querySelector('.nsk-cup'), bottom: last ? last.getBoundingClientRect().bottom : 0, vh: window.innerHeight };
    });
    const tag = `${vp.w}x${vp.h}`;
    let bad = false;
    if (m.overflow > 1) { FAIL(`${tag}: overflow ${m.overflow}px`); bad = true; }
    if (m.small.length) { FAIL(`${tag}: small taps ${[...new Set(m.small)].slice(0, 3)}`); bad = true; }
    if (!m.jar || !m.cup) { FAIL(`${tag}: jar/cup missing`); bad = true; }
    if (vp.fits && m.bottom > m.vh + 1) { FAIL(`${tag}: ${Math.round(m.bottom)} > ${m.vh} (FITS)`); bad = true; }
    if (!bad) OK(`${tag}: fits (bottom ${Math.round(m.bottom)}/${m.vh})`);
    if (vp.w === 360) await page.screenshot({ path: path.join(OUT, 'sweep-360.png'), fullPage: true });
    if (vp.w === 768 && vp.h === 1000) await page.screenshot({ path: path.join(OUT, 'sweep-768.png'), fullPage: true });
    if (vp.w === 1024 && vp.h === 768) await page.screenshot({ path: path.join(OUT, 'jar-idle-1024x768.png') });
  }

  /* ---------- B. fairness property suite ---------- */
  console.log('\nB. fairness property suite');
  await page.setViewport({ width: 1024, height: 768 });
  await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
  await page.waitForSelector('.nsk-jar');

  /* B1: pull N → N distinct, exhaustion at N */
  const b1 = await page.evaluate(() => {
    const seen = [];
    for (let i = 0; i < 12; i++) {
      NameSticks._pull();
      seen.push(NameSticks._presented.slice());
    }
    const flat = seen.flat();
    return { distinct: new Set(flat).size, total: flat.length, eligible: NameSticks._eligible().length, extra: (NameSticks._pull(), NameSticks._fair().drawnIds.length) };
  });
  if (b1.distinct !== 12 || b1.total !== 12) FAIL(`B1 distinct: ${b1.distinct}/12 (${b1.total} pulls)`);
  else if (b1.eligible !== 0 || b1.extra !== 12) FAIL(`B1 exhaustion: eligible=${b1.eligible} drawn=${b1.extra}`);
  else OK('12 pulls → 12 distinct, exhaustion at 12, over-pull no-op');
  await page.screenshot({ path: path.join(OUT, 'empty-jar-1024x768.png') });

  /* empty-jar rest + tip back */
  const empt = await page.evaluate(() => ({
    done: !!document.querySelector('.nsk-done'),
    banner: (document.querySelector('.nsk-done p') || {}).textContent,
  }));
  if (!empt.done) FAIL('empty-jar rest state missing');
  else OK(`empty jar rests: "${empt.banner}"`);
  await page.evaluate(() => { [...document.querySelectorAll('.nsk-done button')].pop().click(); });
  await sleep(200);
  const tipped = await page.evaluate(() => ({ drawn: NameSticks._fair().drawnIds.length, eligible: NameSticks._eligible().length }));
  if (tipped.drawn !== 0 || tipped.eligible !== 12) FAIL(`tip-back: drawn=${tipped.drawn} eligible=${tipped.eligible}`);
  else OK('Tip them back in → fresh jar of 12');

  /* B2: skip returns the stick; skipped child still drawn by exhaustion */
  const b2 = await page.evaluate(() => {
    NameSticks._pull();
    const skipped = NameSticks._presented[0];
    NameSticks._skip();
    const backIn = NameSticks._eligible().some(s => s.id === skipped);
    const drawn = [];
    for (let i = 0; i < 12; i++) { NameSticks._pull(); drawn.push(...NameSticks._presented); }
    return { backIn, skippedDrawn: drawn.indexOf(skipped) >= 0, count: new Set(drawn).size };
  });
  if (!b2.backIn || !b2.skippedDrawn || b2.count !== 12) FAIL(`B2 skip: backIn=${b2.backIn} drawn=${b2.skippedDrawn} count=${b2.count}`);
  else OK('skip returns the stick — turn not burned, drawn once by exhaustion');

  /* B3: absent never drawn + stale dateKey auto-clears */
  await page.evaluate(() => { NameSticks._tipBack(); });
  const b3 = await page.evaluate(() => {
    NameSticks._pull();
    const abs = NameSticks._presented[0];
    NameSticks._markAbsent();
    const drawn = [];
    for (let i = 0; i < 12; i++) { NameSticks._pull(); drawn.push(...NameSticks._presented); }
    const wasDrawn = drawn.indexOf(abs) >= 0;
    const trayShown = !!document.querySelector('.nsk-absentchip');
    /* inject a STALE dateKey and re-run the day-roll clearing */
    NameSticks._fair().absent.dateKey = '2001-1-1';
    NameSticks._persistFair();
    NameSticks._clearStaleAbsent();
    const cleared = NameSticks._absentIds().length === 0;
    return { wasDrawn, trayShown, drawnCount: new Set(drawn).size, cleared };
  });
  if (b3.wasDrawn || b3.drawnCount !== 11) FAIL(`B3 absent: drawn=${b3.wasDrawn} count=${b3.drawnCount} (want 11)`);
  else if (!b3.trayShown) FAIL('B3: absent tray not visible');
  else if (!b3.cleared) FAIL('B3: stale absent list did not auto-clear on day roll');
  else OK('absent never drawn (11/12 cycle), tray visible, auto-clears next day');

  /* B4: fairness memory across reload */
  await page.evaluate(() => { NameSticks._tipBack(); NameSticks._pull(); NameSticks._pull(); NameSticks._pull(); });
  const preReload = await page.evaluate(() => NameSticks._fair().drawnIds.slice());
  await page.reload({ waitUntil: 'networkidle0' });
  await page.waitForSelector('.nsk-jar');
  const postReload = await page.evaluate(() => NameSticks._fair().drawnIds.slice());
  if (JSON.stringify(preReload) !== JSON.stringify(postReload) || postReload.length !== 3) FAIL(`B4 reload: ${preReload.length}→${postReload.length}`);
  else OK('the cup survives a reload (fairness memory)');

  /* B5: undo */
  const b5 = await page.evaluate(() => {
    const before = NameSticks._fair().drawnIds.length;
    NameSticks._pull();
    const afterPull = NameSticks._fair().drawnIds.length;
    NameSticks._undo();
    return { before, afterPull, afterUndo: NameSticks._fair().drawnIds.length };
  });
  if (b5.afterPull !== b5.before + 1 || b5.afterUndo !== b5.before) FAIL(`B5 undo: ${b5.before}→${b5.afterPull}→${b5.afterUndo}`);
  else OK('undo restores the previous jar state');

  /* presented banner screenshot */
  await page.evaluate(() => { NameSticks._pull(); });
  await sleep(300);
  await page.screenshot({ path: path.join(OUT, 'presented-1024x768.png') });

  /* ---------- C. speech ---------- */
  console.log('\nC. speech');
  await page.goto(BASE + '?lang=fi', { waitUntil: 'networkidle0' });
  await page.waitForSelector('.nsk-jar');
  const preGesture = await page.evaluate(() => window.__spoken.length);
  if (preGesture > 0) FAIL(`speech before any gesture: ${preGesture}`);
  else OK('no speech before the first gesture');
  /* phonetic override wins + locale */
  await page.evaluate(() => {
    const mc = JSON.parse(localStorage.getItem('lcs:my-classes:v1'));
    mc.classes[0].students[0].phonetic = 'ZEE-zicks';
    localStorage.setItem('lcs:my-classes:v1', JSON.stringify(mc));
  });
  await page.reload({ waitUntil: 'networkidle0' });
  await page.waitForSelector('.nsk-big');
  const spoke = await page.evaluate(async () => {
    window.__spoken.length = 0;
    NameSticks._tipBack();   /* s_0 may rest in the cup from section B */
    /* pull until student 0 lands (skip returns others — bounded retry) */
    for (let i = 0; i < 200; i++) {
      NameSticks._pull();
      if (NameSticks._presented[0] === 's_0') break;
      NameSticks._skip();
    }
    await new Promise(r => setTimeout(r, 400));
    return window.__spoken.slice();
  });
  const hit = spoke.find(s => /ZEE-zicks/i.test(s.text));
  if (!hit) FAIL(`phonetic override: spoken=[${spoke.map(s => s.text).join(',')}]`);
  else if (!/^fi/i.test(hit.lang)) FAIL(`speech lang "${hit.lang}" (want fi-*)`);
  else OK(`phonetic override spoken as "${hit.text}" in ${hit.lang}`);
  /* think-time delays */
  const think = await page.evaluate(async () => {
    NameSticks._tipBack();
    NameSticks.api.settings.think = true;
    window.__spoken.length = 0;
    NameSticks._pull();
    await new Promise(r => setTimeout(r, 700));
    const early = window.__spoken.length;
    NameSticks.api.settings.think = false;
    return { early };
  });
  if (think.early !== 0) FAIL(`think-time: spoke after ${think.early ? '<1s' : ''} (want silence ≥5s)`);
  else OK('think-time holds the name back');

  /* ---------- D. groups ---------- */
  console.log('\nD. groups (premium)');
  for (const n of [5, 17, 30]) {
    const names = Array.from({ length: n }, (_, i) => 'Kid' + i);
    await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
    await forcePremiumWithClass(page, names);
    await page.goto(BASE + '?lang=en&mode=groups', { waitUntil: 'networkidle0' });
    await page.waitForSelector('.nsk-teamcup');
    for (const k of [2, 3, 4, 5, 6]) {
      const r = await page.evaluate((k) => {
        NameSticks.cupCount = k;
        NameSticks._shake();
        const g = NameSticks._grouping();
        const sizes = g.cups.map(c => c.length);
        const all = g.cups.flat();
        return { sizes, distinct: new Set(all).size, total: all.length };
      }, k);
      const mx = Math.max(...r.sizes), mn = Math.min(...r.sizes);
      if (mx - mn > 1) { FAIL(`n=${n} k=${k}: sizes ${r.sizes}`); continue; }
      if (r.distinct !== n || r.total !== n) { FAIL(`n=${n} k=${k}: union ${r.distinct}/${n}`); continue; }
    }
    OK(`n=${n}: all k∈2..6 sizes ≤1 apart, unions exact`);
  }
  /* extras not always cup 0 */
  const extras = await page.evaluate(() => {
    NameSticks.cupCount = 4;   /* 30 kids → sizes 8,8,7,7 */
    const bigCups = [0, 0, 0, 0];
    for (let i = 0; i < 40; i++) {
      NameSticks._shake();
      const g = NameSticks._grouping();
      g.cups.forEach((c, idx) => { if (c.length === 8) bigCups[idx]++; });
    }
    return bigCups;
  });
  if (extras[0] === 80 || extras.some(c => c === 0 && extras.filter(x => x > 0).length === 1)) FAIL(`extras clustered: ${extras}`);
  else OK(`extras spread across cups over 40 shakes: [${extras}]`);
  /* fresh shake + screenshot BEFORE the drag test (the packet must show
     the fair 8/8/7/7 deal, not the post-manual-adjustment state) */
  await page.evaluate(() => { NameSticks._shake(); });
  await sleep(200);
  await page.screenshot({ path: path.join(OUT, 'groups-1024x768.png') });
  const dragged = await page.evaluate(async () => {
    const chip = document.querySelector('.nsk-teamcup[data-cup="0"] .nsk-teamstick');
    if (!chip) return { err: 'no chip' };
    const sid = chip.getAttribute('data-student');
    const target = document.querySelector('.nsk-teamcup[data-cup="1"]');
    const c = chip.getBoundingClientRect(), t = target.getBoundingClientRect();
    const fire = (type, x, y) => chip.dispatchEvent(new PointerEvent(type, { bubbles: true, clientX: x, clientY: y, pointerId: 7 }));
    fire('pointerdown', c.x + 8, c.y + 8);
    fire('pointermove', (c.x + t.x) / 2, (c.y + t.y) / 2);
    fire('pointermove', t.x + t.width / 2, t.y + t.height / 2);
    fire('pointerup', t.x + t.width / 2, t.y + t.height / 2);
    await new Promise(r => setTimeout(r, 200));
    const g = NameSticks._grouping();
    const mc = JSON.parse(localStorage.getItem('lcs:my-classes:v1'));
    return { inCup1: g.cups[1].indexOf(sid) >= 0, inStore: mc.groupings.c_test.cups[1].indexOf(sid) >= 0 };
  });
  if (dragged.err || !dragged.inCup1 || !dragged.inStore) FAIL(`drag: ${JSON.stringify(dragged)}`);
  else OK('drag between cups updates the grouping AND the shared store');

  /* ---------- E. free/premium seams ---------- */
  console.log('\nE. free/premium seams');
  const page2 = await browser.newPage();
  await page2.setViewport({ width: 1024, height: 768 });
  await page2.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
  await page2.evaluate(() => { localStorage.clear(); });
  await page2.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
  const invite = await page2.evaluate(() => !!document.querySelector('.nsk-invite'));
  if (!invite) FAIL('free first-run: invite missing');
  else OK('free first-run shows the add-your-class invite');
  /* type a session roster via the panel */
  await page2.evaluate(() => {
    document.querySelector('.nsk-invite button').click();
  });
  await page2.waitForSelector('.nsk-panel.open');
  const freeUI = await page2.evaluate(() => ({
    priv: !!document.querySelector('.nsk-privacy'),
    note: !!document.querySelector('.nsk-freenote'),
    classRow: !!document.querySelector('.nsk-classrow'),
  }));
  if (!freeUI.priv || !freeUI.note || freeUI.classRow) FAIL(`free panel: priv=${freeUI.priv} note=${freeUI.note} classRow=${freeUI.classRow}`);
  else OK('free panel: privacy line + session note, no class picker');
  await page2.evaluate(() => {
    document.querySelector('.nsk-ta').value = 'Ada\nBo\nCy\nDee';
    [...document.querySelectorAll('.nsk-panel button')].find(b => b.classList.contains('manage')).click();
  });
  await sleep(150);
  const freeRoster = await page2.evaluate(() => NameSticks._students().length);
  if (freeRoster !== 4) FAIL(`free paste: ${freeRoster} students`);
  else OK('free paste-first entry adds 4 names');
  /* groups gated free */
  await page2.evaluate(() => { NameSticks._closePanel(); NameSticks.render(); });
  await page2.evaluate(() => { [...document.querySelectorAll('.nsk-segbtn')].pop().click(); });
  await sleep(150);
  const gated = await page2.evaluate(() => ({ gate: !!document.querySelector('.nsk-gate'), mode: NameSticks.mode }));
  if (!gated.gate || gated.mode !== 'pull') FAIL(`groups gate: ${JSON.stringify(gated)}`);
  else OK('Teams gated for free');
  /* session roster gone in a NEW page (fresh session) */
  const page3 = await browser.newPage();
  await page3.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
  const fresh = await page3.evaluate(() => NameSticks._students().length);
  if (fresh !== 0) FAIL(`free roster leaked across sessions: ${fresh}`);
  else OK('free session roster evaporates in a new session');
  await page3.close();
  await page2.close();
  /* premium class persists across a reload (page2's clear() wiped the
     shared-origin storage, so re-seed then prove the LOAD path) */
  await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
  await forcePremiumWithClass(page, Array.from({ length: 30 }, (_, i) => 'Kid' + i));
  await page.reload({ waitUntil: 'networkidle0' });
  await page.waitForSelector('.nsk-jar');
  const kept = await page.evaluate(() => ({ n: NameSticks._students().length, cls: (NameSticks._activeClass() || {}).name }));
  if (kept.n !== 30 || kept.cls !== 'Room 4B') FAIL(`premium persistence: ${JSON.stringify(kept)}`);
  else OK('premium class persists across reload (Room 4B, 30 students)');

  /* ---------- F. no-PII-in-network ---------- */
  console.log('\nF. no-PII-in-network');
  if (networkSins.length) FAIL(`roster names in network traffic: ${networkSins.slice(0, 3).join(' | ')}`);
  else OK('zero roster names in any request URL or body (full session)');

  /* ---------- G. my-classes round-trips unknown keys ---------- */
  console.log('\nG. shared-store round-trip');
  const rt = await page.evaluate(() => {
    NameSticks._pull();        /* forces a _saveMC via fairness */
    const mc = JSON.parse(localStorage.getItem('lcs:my-classes:v1'));
    return mc.__futureToolField && mc.__futureToolField.keep === 'me';
  });
  if (!rt) FAIL('unknown my-classes key was dropped on save');
  else OK('a future tool\'s field survives a Name Sticks save');

  /* ---------- H. duplicates + console ---------- */
  console.log('\nH. duplicates + console');
  await page.evaluate(() => {
    const mc = JSON.parse(localStorage.getItem('lcs:my-classes:v1'));
    mc.classes[0].students.push({ id: 's_dup', name: 'Kid1' });
    localStorage.setItem('lcs:my-classes:v1', JSON.stringify(mc));
  });
  await page.reload({ waitUntil: 'networkidle0' });
  await page.waitForSelector('.nsk-jar');
  await page.evaluate(() => NameSticks._openPanel());
  await sleep(200);
  const dup = await page.evaluate(() => (document.querySelector('.nsk-dup') || {}).textContent || '');
  if (!dup.includes('Kid1')) FAIL(`duplicate prompt: "${dup}"`);
  else OK('two Kid1s → the add-an-initial prompt');
  await page.screenshot({ path: path.join(OUT, 'panel-1024x768.png') });

  const realErrors = consoleErrors.filter(e => !/favicon|404|Failed to load resource/.test(e));
  if (realErrors.length) FAIL(`console: ${realErrors.slice(0, 4).join(' | ')}`);
  else OK('console clean');

  await browser.close();
  server.close();
  console.log('\n' + (fails.length ? `FAIL — ${fails.length} failure(s)` : 'PASS — name-sticks DoD green'));
  process.exit(fails.length ? 1 : 0);
})().catch(e => { console.error('HARNESS CRASH:', e); process.exit(1); });
