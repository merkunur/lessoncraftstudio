#!/usr/bin/env node
/**
 * The children's class page (/c/<code>), played by a robot on the local class preview (dev-server.js): the real
 * page, the real rules, an in-memory database, and REAL published pages of a Level Set fetched read-only from the
 * live site with the local reporter swapped in.
 *
 *   node scripts/class-results/tests/class-page.js [--poison]
 *
 * What is checked: how the page is served (noindex, no-store, no referrer, nothing from another site); the seat
 * grid at phone, tablet and desktop widths (every picture loads, tiles are big, no sideways scroll); a child's
 * list and its marks; the whole Level Set walk by real taps (core page all right → harder page all right →
 * finished; several wrong three times → "done for today", open again after the clock moves on); what a shared
 * tablet remembers; a numbers-only class; a closed link; a link that does not exist.
 *
 * --poison: the page is served reading a not-started worksheet out as "Done" — the mark check must fail.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const puppeteer = require(path.join(REPO, 'node_modules', 'puppeteer'));
const { start } = require('../dev-server.js');
const POISON = process.argv.includes('--poison');
const SHOTS = path.join(REPO, 'out', 'class-results', '_tests');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let fails = 0;
const check = (name, ok, extra) => { if (!ok) fails++; console.log((ok ? 'ok    ' : 'FAIL  ') + name + (ok || extra === undefined ? '' : ' — ' + JSON.stringify(extra).slice(0, 500))); };

(async () => {
  fs.mkdirSync(SHOTS, { recursive: true });
  const S = await start({ seed: true });
  const { base, seeded, db, store, teacher } = S;
  const sub = { userId: teacher, usable: true };
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const url = base + '/c/' + seeded.code;

  async function open(u, width) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: width < 500 ? 740 : width < 900 ? 1024 : 800, deviceScaleFactor: 1 });
    const seen = { other: [], errors: [], reports: 0 };
    page.on('pageerror', (e) => seen.errors.push(e.message));
    page.on('request', (r) => { const x = r.url(); if (!x.startsWith(base) && !x.startsWith('data:')) seen.other.push(x.slice(0, 80)); if (x.includes('/api/class/report')) seen.reports++; });
    if (POISON) {
      await page.setRequestInterception(true);
      page.on('request', async (r) => {
        if (r.url() === u) { const html = await (await fetch(u)).text(); return r.respond({ status: 200, contentType: 'text/html', body: html.replace("a.state === 'new' ? T.stateNew", "a.state === 'new' ? T.stateDone") }); }
        r.continue();
      });
    }
    await page.goto(u, { waitUntil: 'networkidle0' });
    return { page, seen };
  }
  const seats = (page) => page.evaluate(() => [...document.querySelectorAll('.c-seat')].map((b) => { const r = b.getBoundingClientRect(), i = b.querySelector('img'); return { label: b.getAttribute('aria-label'), text: b.textContent.trim(), w: Math.round(r.width), h: Math.round(r.height), img: !!i && i.complete && i.naturalWidth > 0, src: i ? i.getAttribute('src') : null }; }));
  const works = (page) => page.evaluate(() => [...document.querySelectorAll('.c-work')].map((b) => { const r = b.getBoundingClientRect(); return { title: b.querySelector('.c-ttl').textContent, state: b.querySelector('.c-st').getAttribute('data-state'), icon: b.querySelector('.c-st svg path').getAttribute('d').slice(0, 12), sr: b.querySelector('.c-sr').textContent, h: Math.round(r.height), w: Math.round(r.width) }; }));
  const tapSeat = async (page, name) => { await page.evaluate((n) => [...document.querySelectorAll('.c-seat')].find((b) => b.getAttribute('aria-label') === n).click(), name); await page.waitForSelector('.c-work, .c-note', { timeout: 10000 }); };
  const tapWork = (page, title) => page.evaluate((t) => [...document.querySelectorAll('.c-work')].find((b) => b.querySelector('.c-ttl').textContent === t).click(), title);
  const cardOf = (page) => page.evaluate(() => { const c = document.querySelector('.c-card'); return c ? { title: c.querySelector('h2').textContent, body: (c.querySelector('p') || {}).textContent || null, btn: (c.querySelector('button') || {}).textContent || null } : null; });
  /** on a real deck page: answer (wrong = how many wrong on purpose), Check, wait for the reporter's button */
  const playDeck = async (page, wrong) => {
    await page.waitForFunction(() => window.DECK_BUNDLE && window.__lcsClass && document.querySelectorAll('#lcs-overlay .lcs-opt').length > 0, { timeout: 60000 });
    const r = await page.evaluate((W) => {
      const B = window.DECK_BUNDLE, opts = [...document.querySelectorAll('#lcs-overlay .lcs-opt')];
      let k = 0;
      B.items.forEach((it, i) => { const n = it.options.length; const j = i < W ? (B.answers[i] + 1) % n : B.answers[i]; opts[k + j].click(); k += n; });
      document.getElementById('lcs-check').click();
      return { total: B.items.length, slug: location.pathname };
    }, wrong);
    await page.waitForSelector('#lcs-class-go', { timeout: 15000 });
    await sleep(200);
    r.go = await page.evaluate(() => { const a = document.getElementById('lcs-class-go'); return { kind: a.getAttribute('data-kind'), href: a.getAttribute('href') }; });
    return r;
  };
  const follow = async (page) => { await Promise.all([page.waitForNavigation({ waitUntil: 'load', timeout: 60000 }).catch(() => null), page.click('#lcs-class-go')]); };

  try {
    // ── how the page is served ──
    const res = await fetch(url);
    const html = await res.text();
    check('served 200 with noindex + nofollow, no-store, Referrer-Policy no-referrer', res.status === 200 && /noindex/.test(res.headers.get('x-robots-tag') || '') && res.headers.get('cache-control') === 'no-store' && res.headers.get('referrer-policy') === 'no-referrer', [...res.headers]);
    check('the document says noindex and no-referrer itself, and names no other site', /<meta name="robots" content="noindex, nofollow">/.test(html) && /<meta name="referrer" content="no-referrer">/.test(html) && !/https?:\/\//.test(html.replace(/http:\/\/www\.w3\.org\/2000\/svg/g, '')), (html.match(/https?:\/\/[^"' )]+/g) || []).slice(0, 5));
    check('the document is the same for every class (no name, no code in it)', !html.includes(seeded.code) && !html.includes('Class 1B') && !html.includes('Max'));
    check('an address that is not a class code is a 404', (await fetch(base + '/c/NOT-A-CODE')).status === 404);

    // ── the seat grid ──
    for (const width of [360, 768, 1024]) {
      const { page, seen } = await open(url, width);
      await page.waitForSelector('.c-seat');
      const g = await seats(page);
      const info = await page.evaluate(() => ({ h1: document.getElementById('c-name').textContent, h2: document.querySelector('h2').textContent, lang: document.documentElement.lang, title: document.title, scrollW: document.documentElement.scrollWidth, innerW: window.innerWidth }));
      check(`${width}: the class name, "Tap your picture", eight seats in seat order with their names`, info.h1 === 'Class 1B' && info.h2 === 'Tap your picture' && info.lang === 'en' && g.map((s) => s.text).join('|') === 'Max|Ana María|Tom|Lena|Omar|Yuki|Sofia|Ben', { info, names: g.map((s) => s.text) });
      check(`${width}: every seat picture loads, and no two seats share one`, g.every((s) => s.img) && new Set(g.map((s) => s.src)).size === g.length, g.filter((s) => !s.img));
      check(`${width}: seat tiles are big enough for a small finger (≥ 120 × 150)`, g.every((s) => s.w >= 120 && s.h >= 150), g.map((s) => s.w + 'x' + s.h));
      check(`${width}: no sideways scroll`, info.scrollW <= info.innerW, info);
      check(`${width}: nothing is requested from another site, no script error`, !seen.other.length && !seen.errors.length, seen);
      await page.screenshot({ path: path.join(SHOTS, 'class-page-seats-' + width + '.png'), fullPage: true });

      // ── Max's list: the set is open again (his pages were two days ago), the two single pages are done ──
      await tapSeat(page, 'Max');
      const w = await works(page);
      const me = await page.evaluate(() => ({ who: document.querySelector('.c-who').textContent, h2: document.querySelector('h2').textContent, sw: (() => { const r = document.getElementById('c-switch').getBoundingClientRect(); return Math.round(Math.min(r.width, r.height)); })(), scrollW: document.documentElement.scrollWidth }));
      check(`${width}: Max's list — his name, "Tap a worksheet", three rows in the teacher's order`, me.who === 'Max' && me.h2 === 'Tap a worksheet' && w.map((x) => x.title).join('|') === 'Number Lines|Telling Time|Maze Puzzles', { me, w });
      check(`${width}: marks — the Level Set is open (start), the two pages he played are done`, w.map((x) => x.state).join('|') === 'new|done|done' && w[0].sr === 'Not started' && w[1].sr === 'Done', w);
      check(`${width}: rows ≥ 84 px high, the "someone else" button ≥ 56 px, no sideways scroll`, w.every((x) => x.h >= 84) && me.sw >= 56 && me.scrollW <= width, { rows: w.map((x) => x.h), me });
      check(`${width}: no score, no number of right answers anywhere on the child's page`, !(await page.evaluate(() => /\d\s*\/\s*\d|%/.test(document.getElementById('c-view').textContent))));
      await page.screenshot({ path: path.join(SHOTS, 'class-page-list-' + width + '.png'), fullPage: true });
      await page.click('#c-switch');
      await page.waitForSelector('.c-seat');
      check(`${width}: "someone else" goes back to the pictures and forgets the seat`, (await page.evaluate(() => sessionStorage.getItem('lcs-class-seat'))) === null);
      await page.close();
    }

    if (!POISON) {
      // ── Yuki walks the Level Set: core page all right → the harder page all right → finished ──
      const { page } = await open(url, 1024);
      await page.waitForSelector('.c-seat');
      await tapSeat(page, 'Yuki');
      await Promise.all([page.waitForNavigation({ waitUntil: 'load', timeout: 60000 }), tapWork(page, 'Number Lines')]);
      check('Yuki → the Level Set starts on a core page, with a token after #', /^\/en\/decks\/number-lines-g1116-\d\/$/.test(new URL(page.url()).pathname) && /#lcs=[a-z2-9]{20}$/.test(page.url()), page.url());
      const c1 = await playDeck(page, 0);
      check('core page all right → the arrow to a harder page', c1.go.kind === 'next' && /^\/en\/decks\/number-lines-hard-g1116-\d+\/#lcs=[a-z2-9]{20}$/.test(c1.go.href), c1);
      await follow(page);
      const h1 = await playDeck(page, 0);
      check('harder page all right → the house back to the class page (the set is finished)', h1.go.kind === 'back' && h1.go.href === '/c/' + seeded.code, h1);
      await follow(page);
      await page.waitForSelector('.c-work');
      const after = await works(page);
      check('back on the class page Yuki is still Yuki, and the set shows the done mark', (await page.evaluate(() => document.querySelector('.c-who').textContent)) === 'Yuki' && after[0].state === 'mastered' && after[0].sr === 'Done', after);
      await tapWork(page, 'Number Lines'); await sleep(500);
      const mc = await cardOf(page);
      check('tapping the finished set says so kindly and offers Back', !!mc && mc.title === 'You finished this one!' && mc.btn === 'Back', mc);
      await page.close();
      const yuki = [...db.seats.values()].find((s) => s.displayName === 'Yuki');
      const res1 = (await store.classResults(db, sub, seeded.id)).body.cells[yuki.id][seeded.set];
      check('the teacher sees Yuki: core passed, hard passed, set mastered', res1.ladder.mastered === true && res1.ladder.levels.filter((l) => l.status === 'passed').map((l) => l.level).join('+') === 'core+hard', res1.ladder);

      // ── Sofia: one wrong of three on each core page (neither almost all right nor several wrong) → another core
      //    page, three pages, then "done for today" ──
      const s2 = await open(url, 360);
      const sp = s2.page;
      await sp.waitForSelector('.c-seat');
      await tapSeat(sp, 'Sofia');
      await Promise.all([sp.waitForNavigation({ waitUntil: 'load', timeout: 60000 }), tapWork(sp, 'Number Lines')]);
      const walked = [];
      for (let i = 0; i < 3; i++) {
        const p = await playDeck(sp, 1);
        walked.push(p.slug + ' → ' + p.go.kind);
        if (i === 0) await sp.screenshot({ path: path.join(SHOTS, 'class-page-deck-360.png') });
        await follow(sp);
      }
      const three = new Set(walked.map((x) => x.split(' ')[0])).size === 3 && walked[0].endsWith('next') && walked[1].endsWith('next') && walked[2].endsWith('back');
      check('Sofia: three different pages of her level in one sitting (arrow, arrow, then the house)', three, walked);
      await sp.waitForSelector('.c-work');
      const rest = await works(sp);
      check('her set now shows "done for today" (the moon), read out as such', rest[0].state === 'rest' && rest[0].sr === 'Done for today' && rest[0].icon !== rest[1].icon, rest);
      await sp.screenshot({ path: path.join(SHOTS, 'class-page-rest-360.png'), fullPage: true });
      await tapWork(sp, 'Number Lines'); await sleep(500);
      const rc = await cardOf(sp);
      check('tapping it: "That is all for today!" and nothing new is started', !!rc && rc.title === 'That is all for today!' && rc.btn === 'Back', rc);
      await fetch(base + '/__class/clock?hours=7');
      await sp.reload({ waitUntil: 'networkidle0' });
      await sp.waitForSelector('.c-work');
      check('seven hours later the set is open again', (await works(sp))[0].state === 'new');
      // a shared tablet: the remembered seat is dropped after 20 minutes
      await sp.evaluate(() => { const v = JSON.parse(sessionStorage.getItem('lcs-class-seat')); v.t -= 21 * 60 * 1000; sessionStorage.setItem('lcs-class-seat', JSON.stringify(v)); });
      await sp.reload({ waitUntil: 'networkidle0' });
      check('after 20 minutes without a tap the page shows the pictures again, not the last child', (await sp.$('.c-seat')) !== null && (await sp.$('.c-who')) === null);
      await sp.close();

      // ── a numbers-only class ──
      const num = await store.createClass(db, sub, { name: 'Group 2', namesMode: 'numbers', locale: 'de', count: 5 }, () => 'numbers222');
      const n = await open(base + '/c/' + num.body.code, 768);
      await n.page.waitForSelector('.c-seat');
      const ng = await seats(n.page);
      const ni = await n.page.evaluate(() => ({ h2: document.querySelector('h2').textContent, lang: document.documentElement.lang }));
      check('numbers-only class in German: "Tippe auf dein Bild", tiles show 1–5, a screen reader hears "Nummer n"', ni.h2 === 'Tippe auf dein Bild' && ni.lang === 'de' && ng.map((s) => s.text).join('') === '12345' && ng[2].label === 'Nummer 3', { ni, ng });
      await n.page.screenshot({ path: path.join(SHOTS, 'class-page-numbers-768.png'), fullPage: true });
      await n.page.close();

      // ── the teacher's plan is not usable: the link is closed, names are not sent ──
      await fetch(base + '/__class/as?who=free');
      const closedApi = await (await fetch(base + '/api/class/' + seeded.code)).json();
      const c = await open(url, 1024);
      await sleep(300);
      const cc = await cardOf(c.page);
      check('closed link: the API sends no names; the page says "not open right now — ask your teacher"', closedApi.inactive === true && !closedApi.seats && !!cc && cc.title === 'This class link is not open right now.' && cc.body === 'Please ask your teacher.' && !cc.btn && (await c.page.$('.c-seat')) === null, { closedApi, cc });
      await c.page.close();
      await fetch(base + '/__class/as?who=sub');

      // ── a link that does not exist ──
      const x = await open(base + '/c/zzzzzzzzzz', 1024);
      await sleep(300);
      const xc = await cardOf(x.page);
      check('unknown link: "This class link does not exist."', !!xc && xc.title === 'This class link does not exist.' && xc.body === 'Please ask your teacher.', xc);
      await x.page.close();
    }
  } catch (e) { fails++; console.log('FAIL  the robot crashed: ' + (e.stack || e.message)); }
  await browser.close();
  await S.close();
  if (POISON) { console.log(fails ? `\npoison: the check FAILED ${fails} time(s), as it must` : '\npoison: the check did NOT fail — it proves nothing'); process.exit(fails ? 0 : 1); }
  console.log(fails ? `\n${fails} FAILURE(S)` : '\nclass-page: no failures');
  process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
