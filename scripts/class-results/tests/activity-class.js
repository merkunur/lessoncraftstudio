#!/usr/bin/env node
/**
 * An activity played through a class link (Part 9 release 2), by a robot on the local class preview (dev-server.js):
 * the real children's page, the real rules over an in-memory database, the REAL class mode
 * (frontend/components/activities/ActivityClassMode.tsx) and the local working copies of two real activities.
 *
 *   node scripts/class-results/tests/activity-class.js [--poison] [--shots]
 *
 * Two activities, because the 203 activities are of two kinds (measured 2026-11-11):
 *   A. "Which number is smaller?" (Block Towers): the SHELL judges every Check, so a wrong try is heard. The robot
 *      plays seven tasks with real taps and gets two of them wrong first: the sitting must arrive as 5 of 7 with the
 *      marks 1 0 1 1 0 1 1.
 *   B. "Build an array" (Skewer Plate): the ACTIVITY judges a try itself and tells the shell only about a solved
 *      task. The robot gets one task wrong first. Nothing can tell which: the sitting must arrive as "finished" with
 *      NO number. A 7 of 7 here would be an invented mark.
 *   C. The same activity as a FUTURE activity will be: it says each of its own tries (api.track('task:try', { ok }),
 *      the contract in ActivityClassMode.tsx). The robot adds exactly those calls around the activity's own Check and
 *      gets the second task wrong first: the sitting must arrive as 6 of 7 with the marks 1 0 1 1 1 1 1.
 * Also checked: class mode covers the site's header and footer (a child cannot leave), no back button and no report
 * before the seventh task, one report only, the way back to the class page, the class page's mark, the teacher's
 * sheet; an activity page opened without a token is the ordinary page (no class mode, no report).
 *
 * --poison: the rule "a Check the activity pressed itself gives no marks" is taken out of the class mode — check B
 * must then fail.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const puppeteer = require(path.join(REPO, 'node_modules', 'puppeteer'));
const { start } = require('../dev-server.js');
const POISON = process.argv.includes('--poison');
const SHOOT = process.argv.includes('--shots');
const SHOTS = path.join(REPO, 'out', 'class-results', '_tests');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let fails = 0;
const check = (name, ok, extra) => { if (!ok) fails++; console.log((ok ? 'ok    ' : 'FAIL  ') + name + (ok || extra === undefined ? '' : ' — ' + JSON.stringify(extra).slice(0, 600))); };

(async () => {
  fs.mkdirSync(SHOTS, { recursive: true });
  const S = await start({ poisonActivity: POISON });
  const { base, db, store, teacher } = S;
  const sub = { userId: teacher, usable: true, names: true };
  const A = store.CODE_ALPHABET;
  const draw = (n) => () => { let s = ''; for (let i = 0; i < n; i++) s += A[Math.floor(Math.random() * A.length)]; return s; };
  const made = await store.createClass(db, sub, { name: 'Class 1C', namesMode: 'names', locale: 'en', names: 'Max\nLea\nTom' }, draw(10));
  const cid = made.body.id, code = made.body.code;
  const addA = await store.addAssignment(db, sub, cid, { link: base.replace(/^http:\/\/localhost:\d+/, 'https://www.lessoncraftstudio.com') + '/en/activities/which-number-is-smaller' }, new Date());
  const addB = await store.addAssignment(db, sub, cid, { link: '/en/activities/build-an-array' }, new Date());
  check('two activities are assigned by their addresses', addA.status === 201 && addA.body.kind === 'activity' && addB.status === 201, [addA.body, addB.body]);
  const [max, lea, tom] = (await store.getClass(db, sub, cid)).body.seats.map((s) => s.id);

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  async function open(u, width) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: width < 500 ? 740 : 1024, deviceScaleFactor: 1 });
    const seen = { errors: [], reports: [] };
    page.on('pageerror', (e) => seen.errors.push(e.message));
    page.on('request', (r) => { if (r.url().includes('/api/class/report')) { let b = null; try { b = JSON.parse(r.postData() || 'null'); } catch (e) { /* not json */ } seen.reports.push(b); } });
    await page.goto(u, { waitUntil: 'networkidle0' });
    return { page, seen };
  }
  const tapSeat = async (page, name) => { await page.evaluate((n) => [...document.querySelectorAll('.c-seat')].find((b) => b.getAttribute('aria-label') === n).click(), name); await page.waitForSelector('.c-work, .c-note', { timeout: 15000 }); };
  const works = (page) => page.evaluate(() => [...document.querySelectorAll('.c-work')].map((b) => ({ title: b.querySelector('.c-ttl').textContent, state: b.querySelector('.c-st').getAttribute('data-state') })));
  const tapWork = async (page, title) => {
    await Promise.all([page.waitForNavigation({ waitUntil: 'load', timeout: 30000 }), page.evaluate((t) => [...document.querySelectorAll('.c-work')].find((b) => b.querySelector('.c-ttl').textContent === t).click(), title)]);
  };
  const frameOf = async (page, global) => {
    for (let i = 0; i < 100; i++) {
      const f = page.frames().find((x) => /\/mini-tools\//.test(x.url()));
      if (f && await f.evaluate((g) => !!(window[g] && window[g].st && document.querySelector('.lcs-activity-check')), global).catch(() => false)) return f;
      await sleep(150);
    }
    throw new Error('the activity did not load: ' + global);
  };
  /** a REAL tap (the browser marks its click as trusted) on a control inside the activity's frame */
  const tap = async (frame, sel) => { const h = await frame.waitForSelector(sel, { visible: true, timeout: 10000 }); await h.click(); await sleep(60); };
  const solved = (frame) => frame.waitForFunction(() => { const p = document.querySelector('.lcs-activity-prompt'), n = document.querySelector('.lcs-activity-next'); return p && p.classList.contains('celebrate') && n && !n.hidden && n.offsetParent !== null; }, { timeout: 15000 });
  const classMode = (page) => page.evaluate(() => {
    const w = document.querySelector('.lcs-prototype-iframe-wrapper'), r = w.getBoundingClientRect();
    const at = (el) => { const b = el.getBoundingClientRect(); const top = document.elementFromPoint(Math.max(1, b.left + 2), Math.max(1, b.top + 2)); return top === el || el.contains(top); };
    return { on: document.body.classList.contains('lcs-class-mode'), fixed: getComputedStyle(w).position === 'fixed', covers: r.left <= 0 && r.top <= 0 && r.right >= innerWidth && r.bottom >= innerHeight,
      headerReachable: at(document.getElementById('site-home')), footerReachable: at(document.getElementById('site-foot')), go: !!document.getElementById('lcs-class-go'), sideways: document.documentElement.scrollWidth > innerWidth + 1 };
  });

  // ── A. the shell judges every Check: marks are real ──
  {
    const { page, seen } = await open(base + '/c/' + code, 412);
    await tapSeat(page, 'Max');
    await tapWork(page, (await works(page)).find((w) => /smaller/i.test(w.title)).title);
    check('A: the class page opens the activity page with the token after #', /\/en\/activities\/which-number-is-smaller#lcs=[a-z2-9]{20}$/.test(page.url()), page.url());
    const f = await frameOf(page, 'BlockTowersActivity');
    await f.evaluate(() => { window.BlockTowersActivity.GROW_MS = 20; });
    let m = await classMode(page);
    check('A: class mode is on: the activity fills the screen, the site header and footer cannot be reached, no back button yet', m.on && m.fixed && m.covers && !m.headerReachable && !m.footerReachable && !m.go && !m.sideways, m);
    if (SHOOT) await page.screenshot({ path: path.join(SHOTS, 'activity-class-A-412.png') });
    const want = [1, 0, 1, 1, 0, 1, 1];
    for (let i = 0; i < want.length; i++) {
      const st = await f.evaluate(() => { const s = window.BlockTowersActivity.st; return { left: s.left, right: s.right }; });
      const right = st.left < st.right ? 'left' : 'right', wrong = right === 'left' ? 'right' : 'left';
      if (!want[i]) { await tap(f, '.bt-card-' + wrong); await tap(f, '.lcs-activity-check'); await sleep(250); }
      await tap(f, '.bt-card-' + right); await tap(f, '.lcs-activity-check');
      await solved(f);
      if (i === 5) { m = await classMode(page); check('A: after six tasks: nothing sent, no back button', seen.reports.length === 0 && !m.go, { reports: seen.reports.length, go: m.go }); }
      if (i < want.length - 1) { await tap(f, '.lcs-activity-next'); await sleep(200); }
    }
    await page.waitForSelector('#lcs-class-go', { timeout: 10000 });
    await sleep(900);
    const place = await page.evaluate(() => { const g = document.getElementById('lcs-class-go').getBoundingClientRect(), a = document.getElementById('act').getBoundingClientRect(); return { under: g.top >= a.bottom - 1, inView: g.top >= 0 && g.bottom <= innerHeight + 1, centered: Math.abs((g.left + g.right) / 2 - innerWidth / 2) <= 2 }; });
    check('A: the back button sits UNDER the activity (it covers nothing of it) and is scrolled into view', place.under && place.inView && place.centered, place);
    const body = seen.reports[0] || {};
    check('A: the seventh task sends ONE report: 5 of 7 and the seven first tries', seen.reports.length === 1 && body.right === 5 && body.total === 7 && JSON.stringify(body.items) === JSON.stringify(want) && body.finished === true, seen.reports);
    const go = await page.evaluate(() => { const a = document.getElementById('lcs-class-go'), r = a.getBoundingClientRect(); return { href: a.getAttribute('href'), label: a.getAttribute('aria-label'), w: r.width, h: r.height, text: a.textContent.trim() }; });
    check('A: the one button leads back to the class page, is big enough for a child and shows no number', go.href === '/c/' + code && go.label === 'Back to the class page' && go.w >= 64 && go.h >= 64 && go.text === '', go);
    check('A: the child sees no score: the page shows no "5", "7" or "of 7" outside the activity', await page.evaluate(() => !/\b5\s*(\/|of|out of)\s*7\b/i.test(document.body.innerText)));
    if (SHOOT) await page.screenshot({ path: path.join(SHOTS, 'activity-class-A-done-412.png') });
    // an eighth task changes nothing
    await tap(f, '.lcs-activity-next'); await sleep(200);
    const st8 = await f.evaluate(() => { const s = window.BlockTowersActivity.st; return s.left < s.right ? 'left' : 'right'; });
    await tap(f, '.bt-card-' + st8); await tap(f, '.lcs-activity-check'); await solved(f); await sleep(300);
    check('A: playing on sends nothing more', seen.reports.length === 1, seen.reports.length);
    await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 30000 }), page.click('#lcs-class-go')]);
    await page.waitForSelector('.c-work, .c-seat', { timeout: 15000 });
    check('A: the button returns to the class page', page.url() === base + '/c/' + code, page.url());
    const seat = (await store.seatPage(db, code, max, new Date())).body.assignments.find((a) => a.id === addA.body.id);
    check('A: the child\'s list shows the activity as done', seat && seat.state === 'done', seat);
    const cell = (await store.classResults(db, sub, cid)).body.cells[max][addA.body.id];
    check('A: the teacher\'s sheet: 5 of 7, between, finished', cell && cell.first.right === 5 && cell.first.total === 7 && cell.first.band === 'mid' && cell.first.finished === true, cell);
    check('A: no page error', seen.errors.length === 0, seen.errors);
    await page.close();
  }

  // ── B and C. the activity judges a try itself ──
  async function playArray(child, says) {
    const { page, seen } = await open(base + '/c/' + code, 768);
    await tapSeat(page, child);
    await tapWork(page, (await works(page)).find((w) => /array/i.test(w.title)).title);
    const f = await frameOf(page, 'SkewerPlateActivity');
    await f.evaluate((says) => {
      const t = window.SkewerPlateActivity; t.FAST = true; t.OK_MS = 150;
      if (!says) return;
      // what an activity that follows the contract does: one line per try it judges, right or wrong
      const own = t._check;
      t._check = function () {
        const was = !!this.st.done, misses = this.st.misses || 0;
        own.apply(this, arguments);
        if (was) return;
        if (this.st.done) this.api.track('task:try', { ok: true });
        else if ((this.st.misses || 0) > misses) this.api.track('task:try', { ok: false });
      };
    }, says);
    const m = await classMode(page);
    const press = (sel) => f.evaluate((s) => { const b = document.querySelector(s); if (!b || b.disabled) return false; b.click(); return true; }, sel);
    const typeIn = async (box, v) => { await press('[data-k="' + box + '"]'); for (const d of String(v)) await press('[data-k="key-' + d + '"]'); };
    let missed = false;
    for (let i = 0; i < 7; i++) {
      const st = await f.evaluate(() => { const s = window.SkewerPlateActivity.st; return { r: s.r, c: s.c }; });
      for (let k = 0; k < st.r; k++) await press('[data-k="skew-' + k + '"]');
      for (let k = 0; k < st.r; k++) await typeIn('box-' + k, st.c);
      if (i === 1) {                                   // a wrong total first: rows + columns
        await typeIn('total', st.r + st.c); await press('[data-k="check"]'); await sleep(200);
        missed = await f.evaluate(() => { const s = window.SkewerPlateActivity.st; return !s.done && document.querySelector('.sp-note').classList.contains('is-hint'); });
        await press('[data-k="total"]'); for (let k = 0; k < 3; k++) await press('[data-k="key-del"]');
      }
      await typeIn('total', st.r * st.c); await press('[data-k="check"]');
      await solved(f);
      if (i < 6) { await tap(f, '.lcs-activity-next'); await sleep(200); }
    }
    await page.waitForSelector('#lcs-class-go', { timeout: 10000 });
    await sleep(300);
    if (SHOOT) await page.screenshot({ path: path.join(SHOTS, 'activity-class-' + (says ? 'C' : 'B') + '-done-768.png') });
    const out = { m, missed, reports: seen.reports.slice(), errors: seen.errors.slice() };
    await page.close();
    return out;
  }
  {
    const r = await playArray('Lea', false), body = r.reports[0] || {};
    check('B: class mode is on at tablet width', r.m.on && r.m.covers && !r.m.headerReachable && !r.m.footerReachable && !r.m.sideways, r.m);
    check('B: (the robot really got one task wrong first: the activity showed its hint)', r.missed === true);
    check('B: a sitting the activity judged itself is sent as "finished" with NO number (7 of 7 would be an invented mark)', r.reports.length === 1 && body.finished === true && !('right' in body) && !('total' in body) && !('items' in body), r.reports);
    const cell = (await store.classResults(db, sub, cid)).body.cells[lea][addB.body.id];
    check('B: the teacher\'s sheet: finished, no marks, no band', cell && cell.first.right === null && cell.first.total === null && cell.first.band === null && cell.first.finished === true, cell);
    const seat = (await store.seatPage(db, code, lea, new Date())).body.assignments.find((a) => a.id === addB.body.id);
    check('B: the child\'s list shows the activity as done', seat && seat.state === 'done', seat);
    check('B: no page error', r.errors.length === 0, r.errors);
  }
  {
    const r = await playArray('Tom', true), body = r.reports[0] || {};
    check('C: (the robot really got one task wrong first)', r.missed === true);
    check('C: an activity that says its own tries is sent with marks: 6 of 7, the second task wrong at first', r.reports.length === 1 && body.right === 6 && body.total === 7 && JSON.stringify(body.items) === '[1,0,1,1,1,1,1]' && body.finished === true, r.reports);
    const cell = (await store.classResults(db, sub, cid)).body.cells[tom][addB.body.id];
    check('C: the teacher\'s sheet: 6 of 7, almost all right', cell && cell.first.right === 6 && cell.first.total === 7 && cell.first.band === 'high', cell);
    check('C: no page error', r.errors.length === 0, r.errors);
  }

  // ── an activity page with no token is the ordinary page ──
  {
    const { page, seen } = await open(base + '/en/activities/which-number-is-smaller', 412);
    const f = await frameOf(page, 'BlockTowersActivity');
    await f.evaluate(() => { window.BlockTowersActivity.GROW_MS = 20; });
    const st = await f.evaluate(() => { const s = window.BlockTowersActivity.st; return s.left < s.right ? 'left' : 'right'; });
    await tap(f, '.bt-card-' + st); await tap(f, '.lcs-activity-check'); await solved(f);
    const m = await page.evaluate(() => ({ on: document.body.classList.contains('lcs-class-mode'), go: !!document.getElementById('lcs-class-go'), hook: typeof document.getElementById('act').contentWindow.LCS_TRACK }));
    check('no token: no class mode, no hook in the activity, nothing sent', !m.on && !m.go && m.hook === 'undefined' && seen.reports.length === 0, { m, reports: seen.reports.length });
    await page.close();
    const bad = await open(base + '/en/activities/which-number-is-smaller#lcs=NOT-A-TOKEN', 412);
    check('a malformed token is not a token', await bad.page.evaluate(() => !document.body.classList.contains('lcs-class-mode')));
    await bad.page.close();
  }

  await browser.close();
  await S.close();
  console.log(fails ? `activity-class: ${fails} checks FAILED` : 'activity-class: all checks pass');
  if (POISON) { console.log(fails ? 'poison caught' : 'the poison did NOT fail the run'); process.exit(fails ? 0 : 1); }
  process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
