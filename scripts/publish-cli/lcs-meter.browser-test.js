#!/usr/bin/env node
/**
 * Browser test of lcs-meter.js (the wall script every interactive deck page loads). A dev run on the PC: it needs
 * Chrome, which the server does not have.   node scripts/publish-cli/lcs-meter.browser-test.js
 *
 * No network is used: every request of the test pages is answered here. The deck page, the page around it and the
 * meter's answer are all made up, so each case of the script can be shown:
 *   a deck on its own address        asked; 401 signup -> the sign-up wall; 401 verify -> the confirm wall;
 *                                    402 -> the plan wall; 200 -> plays
 *   inside a page of our site        asked like its own address (the player of a worksheet page)
 *   inside our homepage              never asked (the one sample)
 *   inside a page of another site    never asked (a teacher's blog)
 * The wall's links leave the frame (target _top), go to the right address in the page language, and the click
 * remembers the page for the way back.
 */
'use strict';
const path = require('path');
const fs = require('fs');
const REPO = path.join(__dirname, '..', '..');
const puppeteer = require(path.join(REPO, 'node_modules', 'puppeteer'));
const SRC = fs.readFileSync(path.join(REPO, 'REFERENCE TRANSLATIONS', 'lcs-meter.js'), 'utf8');
const wall = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'content', 'play-wall', 'ui.json'), 'utf8'));
const verify = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'content', 'verify-email', 'ui.json'), 'utf8'));
const HOST = 'https://www.lessoncraftstudio.com';
const deck = (lang) => `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><title>deck</title></head><body><h1>deck</h1><script>window.DECK_BUNDLE={contentLanguage:${JSON.stringify(lang)}};</script><script>${SRC}</script></body></html>`;
const frame = (src) => `<!doctype html><html><head><meta charset="utf-8"></head><body><iframe id="f" src="${src}" style="width:400px;height:560px"></iframe></body></html>`;
let bad = 0;
const check = (ok, what) => { console.log((ok ? 'ok    ' : 'FAIL  ') + what); if (!ok) bad++; };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  async function run({ top, lang = 'en', answer }) {
    const page = await browser.newPage();
    await page.setViewport({ width: 420, height: 700 });
    let asked = 0; let body = null;
    // what the script hands to fetch for its check: whether cookies travel, and which headers
    await page.evaluateOnNewDocument(() => { const f = window.fetch; window.__check = []; window.fetch = function (u, o) { if (String(u).includes('check-and-increment')) window.__check.push({ credentials: o && o.credentials, headers: Object.keys((o && o.headers) || {}).map((k) => k.toLowerCase()) }); return f.apply(this, arguments); }; });
    await page.setRequestInterception(true);
    page.on('request', (rq) => {
      const u = rq.url();
      if (u.includes('/api/quota/check-and-increment')) {
        if (rq.method() === 'OPTIONS') return rq.respond({ status: 204, headers: { 'access-control-allow-origin': HOST, 'access-control-allow-credentials': 'true', 'access-control-allow-headers': 'content-type', 'access-control-allow-methods': 'POST' } });
        asked++; body = rq.postData();
        return rq.respond({ status: answer.status, contentType: 'application/json', headers: { 'access-control-allow-origin': HOST, 'access-control-allow-credentials': 'true' }, body: JSON.stringify(answer.json || {}) });
      }
      if (/\/decks\//.test(u)) return rq.respond({ status: 200, contentType: 'text/html', body: deck(lang) });
      if (rq.isNavigationRequest()) return rq.respond({ status: 200, contentType: 'text/html', body: frame(HOST + '/' + lang + '/decks/some-deck/') });
      return rq.respond({ status: 204, body: '' });
    });
    await page.goto(top, { waitUntil: 'load' });
    await wait(700);
    const f = /\/decks\//.test(top) ? page.mainFrame() : page.frames().find((x) => /\/decks\//.test(x.url()));
    const w = f ? await f.evaluate(() => {
      const o = document.getElementById('lcs-play-wall'); if (!o) return null;
      const a = [...o.querySelectorAll('a')];
      return { kind: o.getAttribute('data-wall'), title: o.querySelector('h2').textContent, body: o.querySelector('p').textContent, links: a.map((x) => ({ text: x.textContent, href: x.getAttribute('href'), target: x.getAttribute('target'), h: Math.round(x.getBoundingClientRect().height) })), covers: o.getBoundingClientRect().width >= window.innerWidth - 1 && o.getBoundingClientRect().height >= window.innerHeight - 1 };
    }) : null;
    const sent = f ? await f.evaluate(() => window.__check || []) : [];
    return { page, f, asked, body, w, sent };
  }
  const SIGNUP = { status: 401, json: { allowed: false, reason: 'signup_required' } }, VERIFY = { status: 401, json: { allowed: false, reason: 'verify_required' } }, USED = { status: 402, json: { allowed: false, reason: 'quota_exceeded' } }, OK = { status: 200, json: { allowed: true } };

  let r = await run({ top: HOST + '/en/decks/some-deck/', answer: SIGNUP });
  check(r.asked === 1 && r.w && r.w.kind === 'signup', 'own address, no account: the sign-up wall');
  check(r.w && r.w.title === wall.en.title && r.w.body === wall.en.body, 'the wall says the words of the site (content/play-wall/ui.json)');
  check(r.w && r.w.links.length === 2 && r.w.links[0].href === HOST + '/en/auth/signup?from=play' && r.w.links[1].href === HOST + '/en/auth/signin?from=play' && r.w.links.every((l) => l.target === '_top' && l.h >= 44), 'two links, to sign-up and sign-in, leaving a frame, at least 44 px high');
  check(r.w && r.w.covers, 'the wall covers the page');
  check(JSON.parse(r.body).kind === 'play' && !('surface' in JSON.parse(r.body)), 'the deck asks for a play and names no surface (only the homepage sample does)');
  check(r.sent.length === 1 && r.sent[0].credentials === 'include', 'an ordinary play check carries the visitor\'s cookies (the account is what is counted)');
  {
    // a class visit: the address carries the attempt token after #; its check names nobody
    const c = await run({ top: HOST + '/en/decks/some-deck/#lcs=abcdefghjkmnpqrstuvw', answer: { status: 200, json: { allowed: true } } });
    check(c.asked === 1 && JSON.parse(c.body).classToken === 'abcdefghjkmnpqrstuvw', 'a class visit sends its token with the check');
    check(c.sent.length === 1 && c.sent[0].credentials === 'omit' && !c.sent[0].headers.includes('authorization'), 'and the check carries no cookie and no sign-in header');
    await c.page.close();
  }
  await r.f.evaluate(() => { const a = document.querySelector('[data-wall-main]'); a.addEventListener('click', (e) => e.preventDefault()); a.click(); });
  check(await r.page.evaluate(() => sessionStorage.getItem('lcs-return')) === '/en/decks/some-deck/', 'a click on the wall remembers the page for the way back');
  await r.page.close();

  r = await run({ top: HOST + '/de/decks/some-deck/', lang: 'de', answer: VERIFY });
  check(r.w && r.w.kind === 'verify' && r.w.title === verify.de.panelTitle && r.w.links.length === 1 && r.w.links[0].href === HOST + '/de/workspace?verify=1', 'own address, e-mail not confirmed (German): the confirm wall, to the account page');
  await r.page.close();
  r = await run({ top: HOST + '/fi/decks/some-deck/', lang: 'fi', answer: USED });
  check(r.w && r.w.kind === 'used' && r.w.links.length === 1 && r.w.links[0].href === HOST + '/fi/pricing?from=deck-wall', 'own address, the day\'s plays used (Finnish): the plan wall');
  await r.page.close();
  r = await run({ top: HOST + '/en/decks/some-deck/', answer: OK });
  check(r.asked === 1 && !r.w, 'own address, allowed: asked once, no wall');
  await r.page.close();
  r = await run({ top: HOST + '/en/decks/some-deck/', answer: { status: 500, json: {} } });
  check(!r.w, 'the meter fails: the deck plays');
  await r.page.close();

  r = await run({ top: HOST + '/en/worksheets/some-landing', answer: SIGNUP });
  check(r.asked === 1 && r.w && r.w.kind === 'signup' && r.w.covers, 'inside a worksheet page of our site: asked, and the wall covers the player');
  await r.f.evaluate(() => { const a = document.querySelector('[data-wall-main]'); a.addEventListener('click', (e) => e.preventDefault()); a.click(); });
  check(await r.page.evaluate(() => sessionStorage.getItem('lcs-return')) === '/en/worksheets/some-landing', 'the page remembered is the worksheet page, not the frame');
  await r.page.close();
  for (const home of ['/', '/en', '/de/']) { r = await run({ top: HOST + home, answer: SIGNUP }); check(r.asked === 0 && !r.w, 'inside our homepage (' + home + '): never asked'); await r.page.close(); }
  r = await run({ top: 'https://blog.example.org/my-class', answer: SIGNUP });
  check(r.asked === 0 && !r.w, 'inside a page of another site: never asked');
  await r.page.close();

  await browser.close();
  console.log(bad ? bad + ' problem(s)' : 'lcs-meter.js: all cases hold');
  process.exit(bad ? 1 : 0);
})();
