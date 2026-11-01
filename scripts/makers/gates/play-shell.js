#!/usr/bin/env node
/**
 * Gate: the student play page + sharing (INTERACTIVE-AND-SHARING §C; task 2 of the ten, 2026-11-01), with real clicks,
 * against the preview server (serve.js) and the local store — the same contract the website routes implement.
 *
 *   share sheet (a subscriber, de): Share → the STUDENT link (/s/<12 chars>) + a QR that loads + Copy; the EMBED code:
 *     an iframe of the student link (?embed=1) and a caption OUTSIDE it with exactly two anchors — the maker's page in
 *     the page's language and the site root — never /s/; the MAKER link = the indexable landing; the COLLEAGUE link
 *   student page (en + de + fi, 1024 and 360): 200 + X-Robots-Tag noindex + s-maxage; <html lang> = the recipe's; the
 *     per-link card (title, og:url = the link, og:image that loads); no canonical / hreflang / JSON-LD; the site chrome
 *     with 11 hreflang language links; the bar's two links (landing, locale root); three pages = three tabs in the
 *     language; page 1 (marks screen) solved by real clicks → every answer right + the celebration; page 1's html is
 *     BYTE-IDENTICAL to the Node render of the same recipe page (the student plays the teacher's page); page 2 (writing)
 *     says so honestly in the language with a Print button, and an anonymous Print says "ask your teacher"; tap floor
 *     at 1024 (items ≥ 34 px, controls ≥ 44 px); no sideways scroll at 360; no page errors
 *   play meter: a link minted by a FREE account counts one play per load; a SUBSCRIBER's link counts none (ruling
 *     D.4-4); the 11th play of a day shows the kid-safe wall in the language and builds nothing
 *   embed: the snippet pasted into a page shows the worksheet without chrome and the deck listener contract fits the
 *     iframe to the posted height
 *   a taken-back link and an unknown id → 404 + noindex + the kid-safe page
 *   deck preset: ?preset=<deckId> opens the deck's template / level / theme / copy; another maker's deck redirects to
 *     its maker; an unknown deck opens the maker as it is
 *   poisons, both directions: a page without the robots meta fails the head check; a screen keeping an answer attribute
 *     fails the no-tell check; a snippet whose caption links to /s/ fails; a play page that never calls the meter fails
 *     the meter check; a landing outside /<loc>/tools fails
 *
 *   node scripts/makers/gates/play-shell.js
 */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const REPO = path.join(__dirname, '..', '..', '..');
const puppeteer = require(path.join(REPO, 'node_modules', 'puppeteer'));
const { handler } = require('../serve.js');
const { FILE, DECKS } = require('../local-store.js');
const runtime = require('../runtime.js');
const { resolveStrings, withLevelInstruction } = require(path.join(REPO, 'scripts', 'worksheet-gen', 'i18n', 'strings.js'));
const STR = JSON.parse(fs.readFileSync(path.join(REPO, 'scripts', 'worksheet-gen', 'i18n', 'play-strings.json'), 'utf8'));
const S = (k, loc) => STR.play[k][loc];

/* ---- the pure checks (used on the real pages AND on poisoned strings) ---- */
function checkHead(html, { lang, studentUrl }) {
  const out = [];
  const noChrome = html.replace(/<!--LCS_CHROME_HDR_START-->[\s\S]*?<!--LCS_CHROME_HDR_END-->/, '').replace(/<!--LCS_CHROME_FTR_START-->[\s\S]*?<!--LCS_CHROME_FTR_END-->/, '');
  if (!/<meta name="robots" content="noindex">/.test(html)) out.push('no robots noindex meta');
  if (!html.includes(`<html lang="${lang}">`)) out.push('html lang is not ' + lang);
  if (!html.includes(`<meta property="og:url" content="${studentUrl}">`)) out.push('og:url is not the student link');
  if (!/<meta property="og:title" content="[^"]+">/.test(html)) out.push('no og:title');
  if (!/<meta property="og:image" content="[^"]+">/.test(html)) out.push('no og:image');
  if (!/<meta name="description" content="[^"]+">/.test(html)) out.push('no description');
  if (/rel="canonical"/.test(noChrome)) out.push('a canonical on a noindex page');
  if (/hreflang=/.test(noChrome)) out.push('hreflang outside the chrome');
  if (/application\/ld\+json/.test(html)) out.push('JSON-LD on a noindex page');
  return out;
}
const ALLOW = new Set(['page', 'title', 'instruction', 'body', 'prim', 'card', 'keep', 'ink', 'decor', 'page-number', 'art', 'region', 'scene', 'grid', 'figure', 'print']);
function checkNoTell(screenHtml) {
  const left = (screenHtml.match(/\sdata-lcs-([a-z0-9-]+)(?=[\s=>/])/g) || []).map((m) => m.trim().slice(9)).filter((n) => !ALLOW.has(n));
  return left.length ? ['the served screen keeps answer attributes: ' + [...new Set(left)].slice(0, 5).join(', ')] : [];
}
function checkSnippet(snippet, { studentUrl, landingUrl, homeUrl }) {
  const out = [];
  const m = /<iframe[^>]*\ssrc="([^"]+)"/.exec(snippet);
  if (!m || m[1] !== studentUrl + '?embed=1') out.push('the iframe src is not the student link with ?embed=1');
  const cap = /<p[^>]*>([\s\S]*?)<\/p>/.exec(snippet);
  const hrefs = cap ? [...cap[1].matchAll(/<a href="([^"]+)">/g)].map((x) => x[1]) : [];
  if (hrefs.length !== 2) out.push('the caption has ' + hrefs.length + ' anchors (2 expected)');
  if (hrefs.some((h) => /\/s\//.test(h))) out.push('a caption anchor points at a student page');
  if (!hrefs.includes(landingUrl)) out.push('no caption anchor to the maker landing ' + landingUrl);
  if (!hrefs.includes(homeUrl)) out.push('no caption anchor to the site root ' + homeUrl);
  if (!/lcs-embed-resize/.test(snippet)) out.push('no resize listener');
  return out;
}
const checkLanding = (e) => (e && /^\/[a-z]{2}\/tools(\/[a-z0-9-]+)?$/.test(e.url) && e.name ? [] : ['landing is not an indexable tools page: ' + JSON.stringify(e)]);
/** the one thing that may differ between a Node page and a browser page: the asset addresses (parity.js normalises the same way) */
const norm = (h) => String(h)
  .replace(/file:\/\/\/[^'")\s]*?\/cache\/themes(?:-512)?\/([^'")\s]+)/g, (m, p) => 'ASSET:themes/' + decodeURIComponent(p))
  .replace(/\/makers-assets\/themes-512\/([^'")\s]+)/g, (m, p) => 'ASSET:themes/' + decodeURIComponent(p))
  .replace(/file:\/\/\/[^'")\s]*?\/assets\/fonts\/([^'")\s]+)/g, 'ASSET:fonts/$1')
  .replace(/\/makers-assets\/fonts\/([^'")\s]+)/g, 'ASSET:fonts/$1');
const checkMeter = (before, after, minted) => (minted === 'sub' ? (after === before ? [] : ['a subscriber\'s link was metered']) : (after === before + 1 ? [] : [`the meter counted ${after - before} plays for one load`]));

/** the bot inside a marks screen: every right answer by real clicks → Check */
const solve = () => {
  const M = window.__lcsMarks; if (!M) return { err: 'no runtime hook' };
  const Q = M.Q(), C = window.DECK_BUNDLE.ctx || {};
  const keyFor = (c) => Array.from(document.querySelectorAll('.lcs-key')).find((k) => k.textContent === (c === ' ' ? '␣' : c));
  Q.forEach((q) => {
    if (q.cls === 'type') { const a = String(q.p.answers[q.i]); q.el.click(); for (const c of a) { const k = keyFor(c); if (k) k.click(); } }
    else if (q.cls === 'choice') q.opts[q.p.answers[q.i]].click();
    else if (q.cls === 'select') { if (q.p.answers[q.i]) q.el.click(); }
    else if (q.cls === 'pair') { if (q.to != null) return; const t = Array.from(document.querySelectorAll('[data-lcs-t]')).find((x) => x.getAttribute('data-lcs-t') === String(q.p.answers[q.i])); q.el.click(); t.click(); }
    else if (q.cls === 'place') { const b = Array.from(document.querySelectorAll('[data-lcs-b]')).find((x) => x.getAttribute('data-lcs-b') === String(q.p.answers[q.i])); b.click(); q.el.click(); }
  });
  const items = Array.from(document.querySelectorAll('#lcs-overlay button')).map((b) => { const r = b.getBoundingClientRect(); return Math.min(r.width, r.height); });
  const controls = Array.from(document.querySelectorAll('.lcs-btn')).filter((b) => !b.hidden && b.offsetParent).map((b) => { const r = b.getBoundingClientRect(); return Math.min(r.width, r.height); });
  const chk = document.getElementById('lcs-check');
  if (chk.disabled) return { err: 'Check disabled after answering everything' };
  chk.click();
  return { n: Q.length, states: Q.map((q) => (q.cls === 'choice' ? (q.pick >= 0 ? q.opts[q.pick].getAttribute('data-state') : null) : q.el.getAttribute('data-state'))), minItem: Math.min(...items), minControl: Math.min(...controls), C };
};

(async () => {
  const backup = fs.existsSync(FILE) ? fs.readFileSync(FILE) : null;
  fs.rmSync(FILE, { force: true });
  const srv = http.createServer(handler); await new Promise((r) => srv.listen(0, r));
  const base = `http://localhost:${srv.address().port}`;
  const access = (q) => fetch(`${base}/__dev/access?${q}`).then((r) => r.json());
  const api = (method, p, body) => fetch(base + p, { method, headers: { 'content-type': 'application/json' }, body: body ? JSON.stringify(body) : undefined }).then(async (r) => ({ s: r.status, j: await r.json().catch(() => null) }));
  const landings = await (await fetch(base + '/makers/play/landings.json')).json();
  const browser = await puppeteer.launch();
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'lcs-play-'));
  let fails = 0;
  const check = (name, ok, extra) => { if (!ok) fails++; console.log((ok ? 'ok   ' : 'FAIL ') + name + (ok || extra === undefined ? '' : ' — ' + JSON.stringify(extra).slice(0, 400))); };
  const settle = (ms = 800) => new Promise((r) => setTimeout(r, ms));
  const errs = [];
  const page = async (w = 1024) => { const p = await browser.newPage(); p.on('pageerror', (e) => errs.push(e.message)); p.on('dialog', (d) => d.accept()); await p.setViewport({ width: w, height: Math.round(w * 1.3) }); return p; };
  const ready = (p) => p.waitForFunction(() => window.__lcsPlay && (window.__lcsPlay.ready || window.__lcsPlay.failed || window.__lcsPlay.metered === 'wall' || document.querySelector('.pl-card')), { timeout: 90000 });
  const presetFile = path.join(DECKS, 'gate-preset.json');

  try {
    // ---- the share sheet, by real clicks (subscriber, de): K-002 L3 + K-446 (writing) + K-007 (pairs)
    await access('as=sub&made=0&downloaded=0&played=0');
    const t = await page(1366);
    await t.goto(`${base}/makers/app/?maker=counting&lang=de&t=K-002`, { waitUntil: 'load' }); await settle(1800);
    await t.evaluate(() => [...document.querySelectorAll('.mk-chip')].find((x) => x.textContent === '3').click()); await settle(1200);
    await t.click('#mk-add'); await settle(1500);
    await t.evaluate(() => document.querySelector('.mk-card[data-id="K-446"]').click()); await settle(1500);
    await t.click('#mk-add'); await settle(1500);
    await t.evaluate(() => document.querySelector('.mk-card[data-id="K-007"]').click()); await settle(1500);
    await t.click('#mk-share'); await settle(1500);
    const sheet = await t.evaluate(() => {
      const field = (act) => { const b = document.querySelector(`[data-act=${act}]`); return b && b.previousElementSibling ? b.previousElementSibling.value : ''; };
      return { student: field('copy-student'), embed: field('copy-embed'), maker: field('copy-maker'), colleague: field('copy'), qr: (() => { const i = document.querySelector('.mk-share-qr'); return i ? { complete: i.complete, w: i.naturalWidth } : null; })(), secs: document.querySelectorAll('.mk-share-sec h3').length };
    });
    const de = landings.counting.de;
    check('Share: the student link is /s/<12 chars> on this origin', new RegExp('^' + base.replace(/[.]/g, '\\.') + '/s/[a-z2-9]{12}$').test(sheet.student), sheet.student);
    check('Share: the QR code loads', sheet.qr && sheet.qr.complete && sheet.qr.w > 0, sheet.qr);
    const snippetFails = checkSnippet(sheet.embed, { studentUrl: sheet.student, landingUrl: base + de.url, homeUrl: base + '/de/' });
    check('Share: the embed code = the student iframe (?embed=1) + a caption outside it with the two backlinks (the de landing, the de root), never /s/', !snippetFails.length, snippetFails);
    check('Share: the caption names the landing and the site', sheet.embed.includes('>' + de.name + '</a>') && /LessonCraftStudio<\/a>/.test(sheet.embed));
    check('Share: the maker link is the indexable landing in the page\'s language', sheet.maker === base + de.url && !checkLanding(de).length, { got: sheet.maker, want: base + de.url });
    check('Share: the colleague link opens the maker read-only (?m=)', /[?&]m=[a-z2-9]{12}$/.test(sheet.colleague) && sheet.secs === 4, sheet.colleague);
    await t.click('[data-act=copy-student]'); await settle(300);
    check('Share: Copy says "Kopiert"', (await t.$eval('[data-act=copy-student]', (b) => b.textContent)) === 'Kopiert');
    const studentDe = sheet.student;
    const teacherPages = await t.evaluate(() => window.__lcsMaker.state());
    await t.close();

    // ---- en + fi copies of the same worksheet, saved through the API (links minted by a FREE account → metered)
    const db = JSON.parse(fs.readFileSync(FILE, 'utf8'));
    const deRecipe = Object.values(db.recipes)[0].recipe;
    await access('as=free&made=0&downloaded=0&played=0');
    const links = { de: studentDe.split('/s/')[1] };
    for (const loc of ['en', 'fi']) {
      const { j } = await api('POST', '/api/makers/recipes', { recipe: { ...deRecipe, lang: loc, title: { en: 'Counting with animals', fi: 'Laske eläimet' }[loc] } });
      links[loc] = (await api('POST', '/api/makers/links', { recipeId: j.id, kind: 'student' })).j.linkId;
    }
    // Node renders page 1 of the de worksheet with the recipe's own settings: the student's page must be these bytes
    const nodePage = await browser.newPage(); await nodePage.setViewport({ width: 703, height: 945 });
    const mountNode = async (html) => { const f = path.join(tmp, 'n.html'); fs.writeFileSync(f, html); await nodePage.goto('file:///' + f.split(path.sep).join('/'), { waitUntil: 'load' }); await nodePage.evaluate(async () => { await document.fonts.ready; }); return nodePage; };
    const K002 = require(path.join(REPO, 'scripts/worksheet-gen/types/k/K-002-count-and-circle.js'));
    const p1 = deRecipe.pages[0];
    const expectedDe = await runtime.generate({ type: K002, strings: withLevelInstruction(resolveStrings('K-002', 'de', K002), 'K-002', p1.level, 'de'), locale: 'de', difficulty: p1.level, theme: p1.theme, unit: null, variant: Number(p1.seed.slice(2)), pageSize: deRecipe.paper, answerKey: false, answerKeySuffix: 'Lösungen' }, mountNode);
    await nodePage.close();

    // ---- the student page: en + de + fi × 1024 + 360 (the child is anonymous)
    await access('as=anon');
    for (const loc of ['de', 'en', 'fi']) {
      const url = `${base}/s/${links[loc]}`;
      const res = await fetch(url); const html = await res.text();
      check(`${loc}: /s/ answers 200, X-Robots-Tag noindex, s-maxage`, res.status === 200 && res.headers.get('x-robots-tag') === 'noindex' && /s-maxage=300/.test(res.headers.get('cache-control') || ''), { s: res.status, r: res.headers.get('x-robots-tag'), c: res.headers.get('cache-control') });
      const hf = checkHead(html, { lang: loc, studentUrl: url });
      check(`${loc}: the head — lang, noindex, the per-link card (og:url = the link, og:image), no canonical / hreflang / JSON-LD`, !hf.length, hf);
      const og = /<meta property="og:image" content="([^"]+)">/.exec(html);
      check(`${loc}: the card's picture loads (the template's sample thumbnail in ${loc})`, og && (await fetch(og[1])).status === 200 && og[1].includes(`/thumbs/${loc}/K-002.webp`), og && og[1]);
      const minted = loc === 'de' ? 'sub' : 'free';
      for (const w of [1024, 360]) {
        const before = (await access('')).played;
        const p = await page(w);
        await p.goto(url, { waitUntil: 'load' }); await ready(p); await settle(600);
        const after = (await access('')).played;
        const mf = checkMeter(before, after, minted);
        check(`${loc} ${w}: the play meter — ${minted === 'sub' ? 'a subscriber\'s link skips it' : 'one play per load'}`, !mf.length, mf);
        const info = await p.evaluate(() => ({
          lang: document.documentElement.lang, pages: window.__lcsPlay.pages.map((x) => [x.template, x.kind, x.reason]), tabs: [...document.querySelectorAll('.pl-tab')].map((b) => b.textContent),
          chrome: !!document.querySelector('#lcs-site-chrome') && document.querySelector('#lcs-site-chrome').offsetParent !== null, langLinks: [...document.querySelectorAll('#lcs-site-footer a[hreflang]')].length,
          make: (document.querySelector('#pl-make') || {}).href || null, brand: (document.querySelector('#pl-brand') || {}).href || null, title: (document.querySelector('#pl-title') || {}).textContent || null, body: document.body.innerHTML.replace(/\s+/g, ' ').slice(0, 400),
          sLinks: [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')).filter((h) => /\/s\//.test(h)).length, scrollW: document.documentElement.scrollWidth, screen1: window.__lcsPlay.pages[0] && window.__lcsPlay.pages[0].screenHtml, html1: window.__lcsPlay.pages[0] && window.__lcsPlay.pages[0].html,
        }));
        const L = landings.counting[loc];
        check(`${loc} ${w}: three pages → three tabs in ${loc}; page 1 + 3 screens, page 2 paper`, info.lang === loc && info.tabs.join('|') === [1, 2, 3].map((n) => S('pageTab', loc).replace('{n}', n)).join('|') && JSON.stringify(info.pages) === JSON.stringify([['K-002', 'screen', null], ['K-446', 'paper', 'paper'], ['K-007', 'screen', null]]), info.pages);
        check(`${loc} ${w}: the site chrome shows with 11 hreflang language links; the bar links to the ${loc} landing and the ${loc} root; nothing on the page links to /s/`, info.chrome && info.langLinks === 11 && info.make === base + L.url && info.brand === base + '/' + loc + '/' && info.sLinks === 0, { chrome: info.chrome, langLinks: info.langLinks, make: info.make, brand: info.brand, sLinks: info.sLinks, body: info.make ? undefined : info.body });
        if (loc === 'de') check(`${loc} ${w}: page 1 is byte-identical to the Node render of the recipe's page 1, asset addresses aside (the student plays the teacher's page)`, expectedDe.ok && norm(info.html1) === norm(expectedDe.html), { ok: expectedDe.ok, same: norm(info.html1) === norm(expectedDe.html), len: [String(info.html1).length, String(expectedDe.html).length] });
        const nt = checkNoTell(info.screen1 || '');
        check(`${loc} ${w}: the served screen carries no answer attribute`, !nt.length, nt);
        if (w === 360) check(`${loc} 360: no sideways scroll`, info.scrollW <= 360, info.scrollW);
        const fr = await (await p.$('.pl-page[data-page="0"] iframe')).contentFrame();
        const r = await fr.evaluate(solve); await settle(700);
        const cele = await fr.evaluate(() => !document.getElementById('lcs-celebration').hidden);
        check(`${loc} ${w}: page 1 solved by real clicks → every answer right + the celebration`, !r.err && r.states.every((s) => s === 'right') && cele, r.err || { states: r.states, cele });
        if (w === 1024) check(`${loc} 1024: tap floor — items ≥ 34 px, controls ≥ 44 px`, r.minItem >= 34 && r.minControl >= 44, { minItem: r.minItem, minControl: r.minControl });
        else console.log(`     ${loc} 360: smallest page item ${r.minItem.toFixed(0)} px (the page scales to the phone — reported, not failed; a tablet shows it 1:1)`);
        await p.evaluate(() => document.querySelectorAll('.pl-tab')[1].click()); await settle(300);
        const p2 = await p.evaluate(() => ({ note: document.querySelector('.pl-page[data-page="1"] .pl-note').textContent, btn: document.querySelector('.pl-page[data-page="1"] [data-act=print]').textContent, visible: document.querySelector('.pl-page[data-page="1"]').offsetParent !== null }));
        check(`${loc} ${w}: page 2 (writing) says it is for paper, in ${loc}, with a Print button`, p2.visible && p2.note === S('noScreen', loc) && p2.btn === S('print', loc), p2);
        await p.evaluate(() => document.querySelector('.pl-page[data-page="1"] [data-act=print]').click()); await settle(500);
        const ask = await p.evaluate(() => { const a = document.querySelector('.pl-page[data-page="1"] .pl-ask'); return a.hidden ? null : a.textContent; });
        check(`${loc} ${w}: an anonymous Print says "ask your teacher" (a download needs an account)`, ask === S('printAsk', loc), ask);
        await p.close();
      }
    }
    // ---- a FREE teacher's link counts a play even at the top; the 11th play of the day shows the wall
    await access('as=anon&played=10');
    const wp = await page(1024); await wp.goto(`${base}/s/${links.fi}`, { waitUntil: 'load' }); await ready(wp); await settle(300);
    const wall = await wp.evaluate(() => ({ metered: window.__lcsPlay.metered, h2: (document.querySelector('.pl-card h2') || {}).textContent, pages: window.__lcsPlay.pages.length, tabs: document.getElementById('pl-tabs').hidden }));
    check('the 11th play of a day shows the kid-safe wall in the language and builds nothing', wall.metered === 'wall' && wall.h2 === S('wallTitle', 'fi') && wall.pages === 0 && wall.tabs, wall);
    await wp.close();
    await access('as=anon&played=0');
    // ---- a DECLARED screen (the 443 catalogue screens are not built in the maker yet): shown for paper, honestly "coming soon"
    {
      await access('as=sub');
      const nl = JSON.parse(fs.readFileSync(path.join(REPO, 'out', 'makers', 'versions.json'), 'utf8'))['number-lines'];
      const dr = { v: 1, maker: 'number-lines', makerVersion: nl.current, dataVersion: nl.currentData, lang: 'en', paper: 'letter', title: 'Number line', answerKey: false, decor: { border: 'none', pageNumbers: false }, pages: [{ template: 'G1-116', level: 2, seed: 'v:1', theme: null, unit: null, strings: { title: null, instruction: null }, edits: null, ink: null }] };
      const rid = (await api('POST', '/api/makers/recipes', { recipe: dr })).j.id;
      const lid = (await api('POST', '/api/makers/links', { recipeId: rid, kind: 'student' })).j.linkId;
      await access('as=anon');
      const dp = await page(1024); await dp.goto(`${base}/s/${lid}`, { waitUntil: 'load' }); await ready(dp); await settle(300);
      const d = await dp.evaluate(() => ({ pages: window.__lcsPlay.pages.map((x) => [x.template, x.kind, x.reason]), note: (document.querySelector('.pl-note[data-reason]') || {}).textContent, sheet: !!document.querySelector('.pl-sheet iframe') }));
      check('a template whose screen the maker does not build yet (declared G1-116) is shown for paper with the "coming soon" sentence', JSON.stringify(d.pages) === JSON.stringify([['G1-116', 'paper', 'yet']]) && d.note === S('noScreenYet', 'en') && d.sheet, d);
      await dp.close();
    }

    // ---- embed: the snippet pasted into another page
    const ep = await page(900);
    const heights = [];
    ep.on('console', (m) => { if (/^lcs-h:/.test(m.text())) heights.push(Number(m.text().slice(6))); });
    // the host page is another origin (about:blank), as a class blog is: the iframe is reached through puppeteer's frame
    await ep.setContent(`<!doctype html><html><body>${sheet.embed}<script>window.addEventListener('message',function(e){if(e.data&&e.data.type==='lcs-embed-resize')console.log('lcs-h:'+e.data.height)})</script></body></html>`, { waitUntil: 'load' });
    const efr = await (await ep.$('iframe')).contentFrame();
    await efr.waitForFunction(() => window.__lcsPlay && window.__lcsPlay.ready, { timeout: 90000 }).catch(() => null);
    await settle(1200);
    const inner = await efr.evaluate(() => ({ cls: document.body.className, hdr: document.getElementById('lcs-site-chrome') ? document.getElementById('lcs-site-chrome').offsetParent === null : null, bar: document.getElementById('pl-bar').offsetParent === null, pages: window.__lcsPlay.pages.length }));
    const emb = await ep.evaluate(() => ({ h: parseFloat(document.querySelector('iframe').style.height || '0'), caption: [...document.querySelectorAll('p a')].map((a) => a.href) }));
    check('embedded (cross-origin host): no chrome, no bar inside the iframe; the posted height fits the iframe (the deck listener contract); the caption anchors sit outside', inner.cls.includes('lcs-embedded') && inner.hdr === true && inner.bar && inner.pages === 3 && emb.h > 400 && heights.length > 0 && emb.caption.length === 2, { ...inner, ...emb, heights: heights.slice(-2) });
    await ep.close();

    // ---- a taken-back link, an unknown id
    await access('as=sub');
    check('a link can be taken back (DELETE by its owner)', (await api('DELETE', `/api/makers/links/${links.en}`)).s === 200);
    const gone = await fetch(`${base}/s/${links.en}`); const goneHtml = await gone.text();
    check('a taken-back link → 404 + noindex + the kid-safe page', gone.status === 404 && gone.headers.get('x-robots-tag') === 'noindex' && goneHtml.includes(S('notFoundTitle', 'en')) && /content="noindex"/.test(goneHtml), { s: gone.status });
    const unk = await fetch(`${base}/s/zzzzzzzzzzzz`);
    check('an unknown id → 404 + noindex', unk.status === 404 && unk.headers.get('x-robots-tag') === 'noindex');

    // ---- deck preset: a deck's manifest → the maker opens on its settings
    fs.mkdirSync(DECKS, { recursive: true });
    fs.writeFileSync(presetFile, JSON.stringify({ schema_version: '1.1', deck_id: 'gate-preset', language: 'de', settings: { worksheet_type: 'K-002', grade_band: 'K', difficulty: 3 }, theme: 'animals', variant: 2, title: { de: 'Zählen und Einkreisen' } }));
    const pp = await page(1366);
    await pp.goto(`${base}/makers/app/?maker=counting&lang=de&preset=gate-preset`, { waitUntil: 'load' }); await settle(1800);
    const ps = await pp.evaluate(() => ({ st: window.__lcsMaker.state(), preset: window.__lcsMaker.preset(), sheets: document.querySelectorAll('.mk-sheet iframe').length }));
    check('preset: the maker opens the deck\'s template, level 3, its theme and copy 2', ps.st.tpls.join() === 'K-002' && ps.st.lvls.join() === '3' && ps.st.pages.join() === '2' && ps.st.theme === 'animals' && ps.preset && ps.preset.deckId === 'gate-preset' && ps.sheets === 1, { tpls: ps.st.tpls, lvls: ps.st.lvls, pages: ps.st.pages, theme: ps.st.theme });
    fs.writeFileSync(presetFile, JSON.stringify({ deck_id: 'gate-preset', language: 'de', settings: { worksheet_type: 'K-004', difficulty: 2 }, theme: null, variant: 1 }));
    await pp.goto(`${base}/makers/app/?maker=counting&lang=de&preset=gate-preset`, { waitUntil: 'load' }); await settle(2500);
    check('preset: a deck of another maker (K-004 → ten-frames) redirects to that maker', /maker=ten-frames/.test(pp.url()) && (await pp.evaluate(() => window.__lcsMaker.state().tpls.join())) === 'K-004', pp.url());
    await pp.goto(`${base}/makers/app/?maker=counting&lang=de&preset=no-such-deck`, { waitUntil: 'load' }); await settle(1800);
    check('preset: an unknown deck opens the maker as it is', (await pp.evaluate(() => document.querySelectorAll('.mk-sheet iframe').length)) >= 1 && (await pp.evaluate(() => window.__lcsMaker.preset())) === null);
    await pp.close();

    // ---- poisons, both directions
    const goodHtml = await (await fetch(`${base}/s/${links.de}`)).text();
    check('poison control: the real page passes the head check', !checkHead(goodHtml, { lang: 'de', studentUrl: `${base}/s/${links.de}` }).length);
    check('poison 1: a page without the robots meta fails the head check', checkHead(goodHtml.replace('<meta name="robots" content="noindex">', ''), { lang: 'de', studentUrl: `${base}/s/${links.de}` }).some((f) => /robots/.test(f)));
    check('poison 1b: a page with a canonical fails the head check', checkHead(goodHtml.replace('</head>', '<link rel="canonical" href="x"></head>'), { lang: 'de', studentUrl: `${base}/s/${links.de}` }).some((f) => /canonical/.test(f)));
    check('poison 2: a screen keeping data-lcs-answer fails the no-tell check', checkNoTell('<span class="ws-answerbox" data-lcs-answer="7"></span>').length === 1 && !checkNoTell('<div data-lcs-page data-lcs-card>').length);
    check('poison 3: a snippet whose caption links to /s/ fails', checkSnippet(sheet.embed.replace(base + de.url, base + '/s/abc'), { studentUrl: sheet.student, landingUrl: base + de.url, homeUrl: base + '/de/' }).length > 0 && checkSnippet(sheet.embed.replace(/<p[\s\S]*?<\/p>/, ''), { studentUrl: sheet.student, landingUrl: base + de.url, homeUrl: base + '/de/' }).length > 0);
    check('poison 4: a play page that never calls the meter fails the meter check', checkMeter(3, 3, 'free').length === 1 && !checkMeter(3, 4, 'free').length && checkMeter(3, 4, 'sub').length === 1);
    {
      // and the real thing: the meter call suppressed in the browser → the counter does not move → the check fails
      await access('as=anon&played=0');
      const q = await page(1024);
      await q.evaluateOnNewDocument(() => { const f = window.fetch; window.fetch = (u, o) => (String(u).includes('/api/quota/') ? Promise.reject(new Error('poisoned')) : f(u, o)); });
      await q.goto(`${base}/s/${links.fi}`, { waitUntil: 'load' }); await ready(q);
      check('poison 4b: with the meter call suppressed the counter stays and the check fires', checkMeter(0, (await access('')).played, 'free').length === 1);
      await q.close();
    }
    check('poison 5: a landing outside /<loc>/tools fails', checkLanding({ url: '/s/abc', name: 'x' }).length === 1 && checkLanding({ url: '/de/tools/x', name: '' }).length === 1 && !checkLanding(de).length);
    if (errs.length) { fails++; console.log('FAIL page errors: ' + errs.slice(0, 3).join(' | ')); }
  } finally {
    await access('as=sub&made=0&downloaded=0&played=0').catch(() => null);
    await browser.close(); srv.close();
    fs.rmSync(presetFile, { force: true });
    fs.rmSync(tmp, { recursive: true, force: true });
    if (backup) fs.writeFileSync(FILE, backup); else fs.rmSync(FILE, { force: true });
  }
  console.log(fails ? `play gate: ${fails} failing` : 'play gate: all pass, poisons fire both ways');
  if (fails) process.exitCode = 1;
})().catch((e) => { console.error('play gate: error — ' + e.stack); process.exit(1); });
