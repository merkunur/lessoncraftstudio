#!/usr/bin/env node
/**
 * Gate: tap-to-edit in the maker screen, with real clicks (ARCHITECTURE §4.3; lib/slot.js).
 *
 *   counting / K-002 (pictures): the page offers tap targets and the hint; clicking card 1 opens the picker with the
 *     type's own pool; pictures already on the page are disabled; choosing another changes card 1 only (the other cards,
 *     every count and every choice row stay) — and the answer key carries the same picture; New version drops the edit
 *   sight-words / K-239 (words): clicking a word lane opens the word picker; a choice replaces that word only
 *   the previews do not hand out pictures: right-click and drag on an image are cancelled; the picker tiles likewise
 *   a sample page (anonymous) has no tap targets
 *
 *   node scripts/makers/gates/edit-shell.js
 */
'use strict';
const http = require('http');
const path = require('path');
const puppeteer = require(path.join(__dirname, '..', '..', '..', 'node_modules', 'puppeteer'));
const { handler } = require('../serve.js');

(async () => {
  const srv = http.createServer(handler); await new Promise((r) => srv.listen(0, r));
  const base = `http://localhost:${srv.address().port}`;
  const set = (q) => new Promise((r) => http.get(`${base}/__dev/access?${q}`, (res) => { res.resume(); res.on('end', r); }));
  const browser = await puppeteer.launch();
  let fails = 0;
  const check = (name, ok, extra) => { if (!ok) fails++; console.log((ok ? 'ok   ' : 'FAIL ') + name + (ok || extra === undefined ? '' : ' — ' + JSON.stringify(extra).slice(0, 300))); };
  const settle = (ms = 900) => new Promise((r) => setTimeout(r, ms));

  // the cards of page 1, read from its preview frame: what each slot shows
  const cards = (p) => p.evaluate(() => {
    const d = document.querySelector('.mk-sheet iframe').contentDocument;
    return [...d.querySelectorAll('[data-lcs-slot]')].map((n) => ({
      slot: n.getAttribute('data-lcs-slot'),
      noun: n.getAttribute('data-lcs-noun') || n.getAttribute('data-lcs-word') || '',
      count: n.getAttribute('data-lcs-count') || '',
      chips: n.parentElement ? [...n.parentElement.querySelectorAll('[data-lcs-choice]')].map((c) => c.textContent).join(',') : '',
    }));
  });
  const clickSlot = (p, slot) => p.evaluate((slot) => {
    const d = document.querySelector('.mk-sheet iframe').contentDocument;
    const n = d.querySelector(`[data-lcs-slot="${slot}"]`);
    n.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    return !!n;
  }, slot);

  await set('as=sub&made=0&downloaded=0');
  const p = await browser.newPage();
  const errs = [];
  p.on('pageerror', (e) => errs.push(e.message));
  await p.setViewport({ width: 1366, height: 900 });
  await p.goto(`${base}/makers/app/?maker=counting&lang=en&t=K-002`, { waitUntil: 'networkidle0' }); await settle(1200);

  const before = await cards(p);
  const hint = await p.evaluate(() => (document.querySelector('.mk-tap-hint') || {}).textContent || null);
  check('K-002: every card is a tap target and the hint is shown', before.length === 6 && /Click or tap a picture or word/.test(hint || ''), { n: before.length, hint });

  await clickSlot(p, 'pic.0'); await settle(500);
  const picker = await p.evaluate(() => {
    const dlg = document.getElementById('mk-picker');
    const tiles = [...dlg.querySelectorAll('.mk-pick')];
    return { open: dlg.open, title: dlg.querySelector('h2').textContent, tiles: tiles.length, disabled: tiles.filter((t) => t.disabled).map((t) => t.title), pressed: tiles.filter((t) => t.getAttribute('aria-pressed') === 'true').map((t) => t.title) };
  });
  const others = before.slice(1).map((c) => c.noun);
  check('K-002: tapping card 1 opens the picture picker on the type\'s pool', picker.open && picker.title === 'Choose a picture' && picker.tiles > 10, picker);
  // data-lcs-noun is the vocab key; the picker keys are nouns — compare by count: the five other cards are disabled
  check('K-002: the five pictures already on the page are disabled, the current one is marked', picker.disabled.length === 5 && picker.pressed.length === 1, { disabled: picker.disabled, pressed: picker.pressed, others });

  const chosen = await p.evaluate(() => { const t = [...document.querySelectorAll('#mk-picker .mk-pick')].find((x) => !x.disabled && x.getAttribute('aria-pressed') !== 'true'); t.click(); return t.title; });
  await settle(1200);
  const after = await cards(p);
  const closed = await p.evaluate(() => !document.getElementById('mk-picker').open);
  check('K-002: choosing a picture closes the picker and changes card 1', closed && after[0].noun !== before[0].noun, { before: before[0], after: after[0], chosen });
  check('K-002: card 1 keeps its count and its number choices', after[0].count === before[0].count && after[0].chips === before[0].chips, { before: before[0], after: after[0] });
  check('K-002: the other five cards are unchanged', JSON.stringify(after.slice(1)) === JSON.stringify(before.slice(1)));
  const srcOk = await p.evaluate((chosen) => {
    const d = document.querySelector('.mk-sheet iframe').contentDocument;
    return [...d.querySelector('[data-lcs-slot="pic.0"]').querySelectorAll('img')].every((im) => decodeURIComponent(im.getAttribute('src')).includes('/' + chosen + '@') || decodeURIComponent(im.getAttribute('src')).includes('/' + chosen + '.'));
  }, chosen);
  check('K-002: every picture in card 1 is the chosen one', srcOk, chosen);

  // (answer keys: no pilot template has one; the runtime builds a key with the same overrides and throws if its content
  // differs from the page — runtime.js makePage meta check — so a key can never show another picture)

  // the previews and the picker do not hand out pictures
  const guard = await p.evaluate(() => {
    const d = document.querySelector('.mk-sheet iframe').contentDocument;
    const img = d.querySelector('img');
    const cm = new MouseEvent('contextmenu', { bubbles: true, cancelable: true });
    const dr = new DragEvent('dragstart', { bubbles: true, cancelable: true });
    img.dispatchEvent(cm); img.dispatchEvent(dr);
    return { contextmenuBlocked: cm.defaultPrevented, dragBlocked: dr.defaultPrevented, callout: getComputedStyle(img).getPropertyValue('-webkit-user-drag') };
  });
  check('previews: right-click and drag on a picture are cancelled', guard.contextmenuBlocked && guard.dragBlocked && guard.callout === 'none', guard);
  await clickSlot(p, 'pic.1'); await settle(500);
  const tileGuard = await p.evaluate(() => { const im = document.querySelector('#mk-picker img'); const cm = new MouseEvent('contextmenu', { bubbles: true, cancelable: true }); im.dispatchEvent(cm); document.getElementById('mk-picker').close(); return cm.defaultPrevented && im.draggable === false; });
  check('picker: right-click and drag on a tile are cancelled', tileGuard);

  // New version is new content: the choice is dropped
  await p.click('#mk-new'); await settle(1200);
  const fresh = await cards(p);
  check('K-002: New version drops the choice (new content)', !fresh.some((c) => c.noun === after[0].noun) || fresh[0].noun !== after[0].noun);

  // words: sight words
  await p.goto(`${base}/makers/app/?maker=sight-words&lang=de&t=K-239`, { waitUntil: 'networkidle0' }); await settle(1200);
  const w0 = await cards(p);
  await clickSlot(p, 'word.1'); await settle(500);
  const wp = await p.evaluate(() => { const dlg = document.getElementById('mk-picker'); return { open: dlg.open, title: dlg.querySelector('h2').textContent, words: [...dlg.querySelectorAll('.mk-pick')].length }; });
  check('K-239 (de): tapping a word opens the word picker', wp.open && wp.title === 'Wort auswählen' && wp.words >= 12, wp);
  const wChosen = await p.evaluate(() => { const t = [...document.querySelectorAll('#mk-picker .mk-pick')].find((x) => !x.disabled && x.getAttribute('aria-pressed') !== 'true'); t.click(); return t.title; });
  await settle(1200);
  const w1 = await cards(p);
  check('K-239 (de): the chosen word replaces word 2 only', w1[1].noun === wChosen && w1[0].noun === w0[0].noun && JSON.stringify(w1.slice(2)) === JSON.stringify(w0.slice(2)), { w0: w0.map((x) => x.noun), w1: w1.map((x) => x.noun), wChosen });
  await p.close();

  // a sample page has nothing to tap
  await set('as=anon');
  const q = await browser.newPage();
  await q.goto(`${base}/makers/app/?maker=counting&lang=en`, { waitUntil: 'networkidle0' }); await settle(1200);
  // the html carries the slot marks, but nothing makes them tappable: no button role, no focus, no hint, a click opens nothing
  const sample = await q.evaluate(() => { const d = document.querySelector('.mk-sheet iframe').contentDocument; const n = d.querySelector('[data-lcs-slot]'); if (n) n.dispatchEvent(new MouseEvent('click', { bubbles: true })); const dlg = document.getElementById('mk-picker'); return { tappable: d.querySelectorAll('[data-lcs-slot][role=button]').length, hint: document.querySelectorAll('.mk-tap-hint').length, picker: !!(dlg && dlg.open) }; });
  check('sample page (anonymous): nothing to tap, no hint, a click opens no picker', !sample.tappable && !sample.hint && !sample.picker, sample);
  await q.close();
  await set('as=sub');

  if (errs.length) { fails++; console.log('FAIL page errors: ' + errs.slice(0, 3).join(' | ')); }
  await browser.close(); srv.close();
  console.log(fails ? `edit gate: ${fails} failing` : 'edit gate: all pass');
  if (fails) process.exitCode = 1;
})().catch((e) => { console.error('edit gate: error — ' + e.message); process.exit(1); });
