#!/usr/bin/env node
/**
 * The class reporter on a MAKER worksheet page (/s/<linkId>), played by a robot on the local makers preview.
 *
 * A maker worksheet shows each page in its own embedded frame. The reporter must report ONCE, when every page
 * that has a screen version has had its first Check, with the SUM of those first Checks; between pages its
 * button is the arrow to the next unchecked page; a page made for paper is not waited for.
 *
 * The robot starts the local preview server (scripts/makers/serve.js) with the class switch on, saves a three-page
 * worksheet through the local API (page 1 a screen, page 2 a writing page for paper, page 3 a screen), mints its
 * student link and opens it with a class token. lcs-class.js is served from scripts/class-results/web/ and the
 * report call is answered here. What the reporter sent is compared with what the robot did (page 1: every answer
 * right, by real clicks) and with the marks each frame drew, counted by this file's own selectors.
 *
 *   node scripts/class-results/tests/reporter-maker.js [--poison]
 *
 * --poison: the reporter adds one to "right"; the comparison must fail.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const REPO = path.join(__dirname, '..', '..', '..');
process.env.CLASS_RESULTS_ENABLED = '1';
const puppeteer = require(path.join(REPO, 'node_modules', 'puppeteer'));
const { handler } = require(path.join(REPO, 'scripts', 'makers', 'serve.js'));
const { FILE } = require(path.join(REPO, 'scripts', 'makers', 'local-store.js'));
const ssr = require(path.join(REPO, 'scripts', 'makers', 'play', 'ssr.js'));
const WEB = path.join(REPO, 'scripts', 'class-results', 'web');
const TOKEN = 'abcdefghijkmnpqrstuv';
const POISON = process.argv.includes('--poison');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let fails = 0;
const check = (name, ok, extra) => { if (!ok) fails++; console.log((ok ? 'ok    ' : 'FAIL  ') + name + (ok || extra === undefined ? '' : ' — ' + JSON.stringify(extra).slice(0, 500))); };

/** inside a frame: answer everything right by real clicks (the play-shell gate's bot), do not press Check */
const answerAll = () => {
  const M = window.__lcsMarks; if (!M) return { err: 'no runtime hook' };
  const cover = document.querySelector('.lcs-cover'); if (cover) cover.click();
  const Q = M.Q();
  const keyFor = (c) => Array.from(document.querySelectorAll('.lcs-key')).find((k) => k.textContent === (c === ' ' ? '␣' : c));
  Q.forEach((q) => {
    if (q.cls === 'type') { const a = String(q.p.answers[q.i]); q.el.click(); for (const c of a) { const k = keyFor(c); if (k) k.click(); } }
    else if (q.cls === 'choice') q.opts[q.p.answers[q.i]].click();
    else if (q.cls === 'select') { if (q.p.answers[q.i]) q.el.click(); }
    else if (q.cls === 'pair') { if (q.to != null) return; const t = Array.from(document.querySelectorAll('[data-lcs-t]')).find((x) => x.getAttribute('data-lcs-t') === String(q.p.answers[q.i])); q.el.click(); t.click(); }
    else if (q.cls === 'place') { const b = Array.from(document.querySelectorAll('[data-lcs-b]')).find((x) => x.getAttribute('data-lcs-b') === String(q.p.answers[q.i])); b.click(); q.el.click(); }
  });
  return { n: Q.length, kinds: [...new Set(Q.map((q) => q.cls))] };
};
/** inside a frame: the marks the page drew, by this test's own selectors */
const frameMarks = () => ({
  // the answer buttons only (a pairing page also marks the line it draws between two of them)
  right: document.querySelectorAll('button[data-state="right"]').length,
  wrong: document.querySelectorAll('button[data-state="wrong"]').length,
  order: [...document.querySelectorAll('button[data-state="right"],button[data-state="wrong"]')].map((e) => (e.getAttribute('data-state') === 'right' ? 1 : 0)),
  progress: (document.getElementById('lcs-progress') || {}).textContent || '',
  checkHidden: !!(document.getElementById('lcs-check') || {}).hidden,
  cele: (() => { const c = document.getElementById('lcs-celebration'); return !!c && !c.hidden && c.getClientRects().length > 0; })(),
  printShown: [...document.querySelectorAll('[data-lcs-print]')].filter((a) => a.getClientRects().length > 0).length,
});
/** inside a pairing frame: every pair joined, the first two crossed over → exactly two wrong */
const answerTwoWrong = () => {
  const Q = window.__lcsMarks.Q();
  if (Q.length < 3 || Q.some((q) => q.cls !== 'pair')) return { err: 'not a pairing page with three or more pairs' };
  const T = (v) => Array.from(document.querySelectorAll('[data-lcs-t]')).find((x) => x.getAttribute('data-lcs-t') === String(v));
  const want = Q.map((q) => q.p.answers[q.i]); const t = want[0]; want[0] = want[1]; want[1] = t;
  Q.forEach((q, k) => { q.el.click(); T(want[k]).click(); });
  return { n: Q.length, items: Q.map((q, k) => (k < 2 ? 0 : 1)) };
};
const pressCheck = () => { const c = document.getElementById('lcs-check'); if (!c || c.hidden) return 'no check'; c.disabled = false; c.click(); return c.hidden ? 'pressed' : 'still shown'; };

(async () => {
  const backup = fs.existsSync(FILE) ? fs.readFileSync(FILE) : null;
  fs.rmSync(FILE, { force: true });
  const srv = http.createServer(handler); await new Promise((r) => srv.listen(0, r));
  const base = `http://localhost:${srv.address().port}`;
  const access = (q) => fetch(`${base}/__dev/access?${q}`).then((r) => r.json());
  const api = (method, p, body) => fetch(base + p, { method, headers: { 'content-type': 'application/json' }, body: body ? JSON.stringify(body) : undefined }).then(async (r) => ({ s: r.status, j: await r.json().catch(() => null) }));
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  async function open(linkId, { token = true, width = 1024, home = false } = {}) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: width < 500 ? 740 : 800, deviceScaleFactor: 1 });
    const seen = { reports: [], classJs: 0, errors: [] };
    page.on('pageerror', (e) => seen.errors.push(e.message));
    if (home) await page.evaluateOnNewDocument(() => { try { sessionStorage.setItem('lcs-class-back', '/c/abcdefghij'); } catch (e) { /* none */ } });
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      const u = req.url();
      if (u.includes('/worksheet-generators/js/lcs-class.js')) {
        seen.classJs++;
        let body = fs.readFileSync(path.join(WEB, 'lcs-class.js'), 'utf8');
        if (POISON) body = body.replace('var o = { right: s.right, total: s.total };', 'var o = { right: Math.min(s.total, s.right + 1), total: s.total };').replace('if (list.length) return { right: sum, total: list.length, items: list };', 'if (list.length) return { right: Math.min(list.length, sum + 1), total: list.length };');
        return req.respond({ status: 200, contentType: 'application/javascript', body });
      }
      if (u.includes('/api/class/report')) {
        seen.reports.push(JSON.parse(req.postData() || '{}'));
        return req.respond({ status: 200, contentType: 'application/json', body: JSON.stringify({ done: true, back: '/c/abcdefghij' }) });
      }
      return req.continue();
    });
    await page.goto(`${base}/s/${linkId}${token ? '#lcs=' + TOKEN : ''}`, { waitUntil: 'load' });
    await page.waitForFunction(() => window.__lcsPlay && (window.__lcsPlay.ready || window.__lcsPlay.failed), { timeout: 90000 });
    await sleep(1200);
    return { page, seen };
  }
  const frameOf = async (page, n) => (await page.$(`.pl-page[data-page="${n}"] iframe`)).contentFrame();
  const goButton = (page) => page.evaluate(() => { const a = document.getElementById('lcs-class-go'); if (!a) return null; const r = a.getBoundingClientRect(); return { kind: a.getAttribute('data-kind'), href: a.getAttribute('href'), w: r.width, h: r.height, label: a.getAttribute('aria-label'), text: a.textContent.trim(), inView: r.left >= 0 && r.right <= innerWidth && r.bottom <= innerHeight && r.top >= 0 }; });

  try {
    await access('as=sub&made=0&downloaded=0&played=0');
    const versions = JSON.parse(fs.readFileSync(path.join(REPO, 'out', 'makers', 'versions.json'), 'utf8')).counting;
    const pageOf = (template, level) => ({ template, level, seed: 'v:1', theme: 'animals', unit: null, strings: { title: null, instruction: null }, edits: null, ink: null });
    const recipe = (title, pages) => ({ v: 1, maker: 'counting', makerVersion: versions.current, dataVersion: versions.currentData, lang: 'en', paper: 'letter', title, answerKey: false, decor: { border: 'none', pageNumbers: false }, pages });
    const mint = async (r) => { const rec = await api('POST', '/api/makers/recipes', { recipe: r }); if (!rec.j || !rec.j.id) throw new Error('recipe refused: ' + JSON.stringify(rec)); const l = await api('POST', '/api/makers/links', { recipeId: rec.j.id, kind: 'student' }); return l.j.linkId; };
    const three = await mint(recipe('Counting, three pages', [pageOf('K-002', 3), pageOf('K-446', 2), pageOf('K-007', 2)]));
    const paper = await mint(recipe('Writing only', [pageOf('K-446', 2)]));
    await access('as=anon');

    // the served page carries the loader only while the switch is on, and the same bytes with or without a token
    const html = await (await fetch(`${base}/s/${three}`)).text();
    check('the page carries the one-line class loader (switch on)', html.includes(ssr.CLASS_LOADER));
    process.env.CLASS_RESULTS_ENABLED = '';
    check('with the switch off the page carries no loader', !(await (await fetch(`${base}/s/${three}`)).text()).includes('lcs-class'));
    process.env.CLASS_RESULTS_ENABLED = '1';

    for (const width of POISON ? [1024] : [1024, 360]) {
      const { page, seen } = await open(three, { width });
      const st = await page.evaluate(() => ({
        on: !!window.__lcsClass, mode: document.body.classList.contains('lcs-class-mode'), pages: window.__lcsPlay.pages.map((p) => p.kind),
        watched: (window.__lcsClass && window.__lcsClass.maker || []).length,
        furniture: ['#lcs-site-chrome', '#lcs-site-footer', '.pl-links', '.pl-actions'].filter((s) => [...document.querySelectorAll(s)].some((e) => getComputedStyle(e).display !== 'none')),
        outLinks: [...document.querySelectorAll('a[href]')].filter((a) => a.id !== 'lcs-class-go' && a.getClientRects().length > 0 && !/^(#|javascript:)/.test(a.getAttribute('href') || '#')).map((a) => a.getAttribute('href').slice(0, 60)),
        title: !!document.getElementById('pl-title') && document.getElementById('pl-title').getClientRects().length > 0,
      }));
      check(`${width}: the worksheet built its three pages (screen, paper, screen)`, JSON.stringify(st.pages) === JSON.stringify(['screen', 'paper', 'screen']), st.pages);
      check(`${width}: the reporter started once and watches the two screen pages`, st.on && seen.classJs === 1 && st.watched === 2, { on: st.on, requested: seen.classJs, watched: st.watched });
      check(`${width}: class mode hides the site header, footer, the "make your own" links and the print buttons; the title stays`, st.mode && !st.furniture.length && st.title, st);
      check(`${width}: no link leaves the page`, !st.outLinks.length, st.outLinks);
      check(`${width}: nothing is reported and no button shows before a Check`, !seen.reports.length && !(await goButton(page)));

      // page 1: every answer right, by real clicks
      const f1 = await frameOf(page, 0);
      const a1 = await f1.evaluate(answerAll);
      const pr1 = await f1.evaluate(pressCheck); await sleep(900);
      const m1 = await f1.evaluate(frameMarks);
      check(`${width}: page 1 answered right by the robot and checked`, !a1.err && pr1 === 'pressed' && m1.right === a1.n && m1.wrong === 0, { a1, pr1, m1 });
      check(`${width}: the "print my worksheet" link inside the page is hidden`, m1.printShown === 0, m1.printShown);
      check(`${width}: one page checked of two → still nothing reported`, seen.reports.length === 0, seen.reports);
      let go = await goButton(page);
      check(`${width}: the button is the arrow to the next page (a picture, ≥ 56 px, on screen, labelled)`, !!go && go.kind === 'next' && go.w >= 56 && go.h >= 56 && go.inView && !go.text && !!go.label, go);
      await page.click('#lcs-class-go'); await sleep(500);
      const shown = await page.evaluate(() => [...document.querySelectorAll('.pl-page')].filter((s) => !s.hidden).map((s) => s.getAttribute('data-page')));
      check(`${width}: the arrow opens the next page that has not been checked (page 3, past the paper page) and goes away`, JSON.stringify(shown) === '["2"]' && !(await goButton(page)), shown);

      // page 3 (pairs): the robot crosses two pairs over on purpose → two wrong
      const f3 = await frameOf(page, 2);
      const a3w = await f3.evaluate(answerTwoWrong);
      const pr3 = await f3.evaluate(pressCheck); await sleep(900);
      const m3 = await f3.evaluate(frameMarks);
      const rep = seen.reports[0];
      check(`${width}: page 3 checked → exactly one report, with the token`, !a3w.err && pr3 === 'pressed' && seen.reports.length === 1 && rep && rep.token === TOKEN, { a3w, pr3, n: seen.reports.length });
      if (rep && !a3w.err) {
        const want = { right: a1.n + a3w.n - 2, total: a1.n + a3w.n, items: Array.from({ length: a1.n }, () => 1).concat(a3w.items) };
        check(`${width}: the report is the SUM of the two pages' first Checks, as the robot answered (${want.right}/${want.total})`, rep.right === want.right && rep.total === want.total, { rep, want });
        check(`${width}: the page drew the same (its own marks: ${m3.right} right, ${m3.wrong} wrong on page 3)`, m3.right === a3w.n - 2 && m3.wrong === 2, m3);
        check(`${width}: the per-answer marks are page 1's then page 3's, as the robot answered`, JSON.stringify(rep.items) === JSON.stringify(want.items) && JSON.stringify(m1.order.concat(m3.order)) === JSON.stringify(want.items), { got: rep.items, want: want.items, drew: m1.order.concat(m3.order) });
        check(`${width}: not reported as finished while page 3 has wrong answers`, rep.finished !== true, rep);
      }
      await sleep(300);
      go = await goButton(page);
      check(`${width}: after the report the button is the house back to the class page`, !!go && go.kind === 'back' && go.href === '/c/abcdefghij' && go.inView && go.w >= 56, go);

      // page 3 corrected: Try again, every answer right, Check → a second report (the server keeps the first as the result)
      const reset = await f3.evaluate(() => { const r = document.getElementById('lcs-reset'); if (!r || r.hidden) return false; r.click(); return true; });
      if (reset) {
        await sleep(300);
        const a3 = await f3.evaluate(answerAll);
        await f3.evaluate(pressCheck); await sleep(1000);
        const m3b = await f3.evaluate(frameMarks);
        const second = seen.reports[1];
        check(`${width}: the corrected page 3 is reported again, now all right and finished`, !!second && m3b.wrong === 0 && second.right === second.total && second.total === a1.n + a3.n && second.finished === true, { second, m3b, a3 });
      } else check(`${width}: page 3 offers Try again after a wrong Check`, false);
      check(`${width}: no script error on the page`, !seen.errors.length, seen.errors);
      if (!POISON) await page.screenshot({ path: path.join(REPO, 'out', 'class-results', '_tests', 'reporter-maker-' + width + '.png') });
      await page.close();
    }

    if (!POISON) {
      // a worksheet made for paper only: nothing to check, the way back is there at once, nothing is reported
      const p = await open(paper, { home: true });
      await sleep(600);
      const go = await goButton(p.page);
      check('paper-only worksheet: the house shows at once and nothing is reported', !!go && go.kind === 'back' && go.href === '/c/abcdefghij' && !p.seen.reports.length, { go, reports: p.seen.reports });
      const printBtn = await p.page.evaluate(() => [...document.querySelectorAll('[data-act=print]')].filter((b) => b.getClientRects().length > 0).length);
      check('paper-only worksheet: the Print button is hidden in class mode', printBtn === 0, printBtn);
      await p.page.close();

      // without a token: the reporter is never requested, nothing changes, nothing is sent
      const n = await open(three, { token: false });
      const st = await n.page.evaluate(() => ({ on: !!window.__lcsClass, mode: document.body.classList.contains('lcs-class-mode'), links: !!document.querySelector('.pl-links') && document.querySelector('.pl-links').getClientRects().length > 0 }));
      const f = await frameOf(n.page, 0);
      await f.evaluate(answerAll); await f.evaluate(pressCheck); await sleep(700);
      check('no token: no reporter requested, no class mode, the page links stay, a Check sends nothing', !st.on && !st.mode && st.links && n.seen.classJs === 0 && !n.seen.reports.length, { st, classJs: n.seen.classJs, reports: n.seen.reports.length });
      await n.page.close();
    }
  } catch (e) { fails++; console.log('FAIL  the robot crashed: ' + (e.stack || e.message)); }
  await browser.close();
  srv.close();
  if (backup) fs.writeFileSync(FILE, backup); else fs.rmSync(FILE, { force: true });
  if (POISON) { console.log(fails ? `\npoison: the check FAILED ${fails} time(s), as it must` : '\npoison: the check did NOT fail — it proves nothing'); process.exit(fails ? 0 : 1); }
  console.log(fails ? `\n${fails} FAILURE(S)` : '\nreporter-maker: no failures');
  process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
