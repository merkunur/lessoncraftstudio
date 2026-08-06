#!/usr/bin/env node
/* THROWAWAY — drives the custom-word desk end to end: open it from the
   set button, type two words, cut a seam, confirm the word reaches the
   board as a name card with the teacher's own split. */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const IMG = path.join(REPO, 'image-library-webp');
const OUT = path.join(REPO, 'docs', 'audit-results', 'syllable-splitter', 'qa');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
fs.mkdirSync(OUT, { recursive: true });

const srv = http.createServer((q, r) => {
  const p = decodeURIComponent(q.url.split('?')[0]);
  let f;
  if (p.startsWith('/mini-tools/')) f = path.join(MINI, p.slice('/mini-tools/'.length));
  else if (p.startsWith('/image-library-webp/')) f = path.join(IMG, p.slice('/image-library-webp/'.length));
  else f = path.join(MINI, p.replace(/^\//, ''));
  fs.readFile(f, (e, b) => { if (e) { r.statusCode = 404; return r.end(); } r.setHeader('Content-Type', MIME[path.extname(f)] || 'application/octet-stream'); r.end(b); });
});

let fail = 0;
const ok = (n, c, x) => { if (c) console.log('  ok   ' + n); else { fail++; console.log('  FAIL ' + n + (x !== undefined ? ' — ' + x : '')); } };

(async () => {
  await new Promise((r) => srv.listen(0, r));
  const P = srv.address().port;
  const br = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const pg = await br.newPage();
  const errs = [];
  pg.on('pageerror', (e) => errs.push(e.message));
  const imgReqs = [];
  pg.on('request', (r) => imgReqs.push(r.url()));
  await pg.setViewport({ width: 900, height: 1100 });
  await pg.goto(`http://127.0.0.1:${P}/mini-tools/syllable-splitter.html?lang=en`, { waitUntil: 'networkidle0' });
  await pg.waitForSelector('.ss-clap', { timeout: 8000 });
  await new Promise((r) => setTimeout(r, 400));

  console.log('\n[open the desk from the set button]');
  await pg.click('.ss-pill');
  await new Promise((r) => setTimeout(r, 300));
  ok('desk is in flow, not a fixed scrim', await pg.evaluate(() => {
    const d = document.querySelector('.ss-desk');
    return !!d && getComputedStyle(d).position !== 'fixed';
  }));
  ok('three tabs', (await pg.$$('.ss-tab')).length === 3);
  ok('no full-screen gate scrim exists anywhere', !(await pg.$('.ss-scrim')));

  console.log('\n[My words]');
  await pg.evaluate(() => { [...document.querySelectorAll('.ss-tab')].find((t) => /my words/i.test(t.textContent)).click(); });
  await new Promise((r) => setTimeout(r, 250));
  ok('the "we don\'t check them" sentence is present and permanent',
    await pg.$eval('.ss-ownnote', (e) => /don’t check|don't check/i.test(e.textContent)));

  await pg.type('.ss-ed-area', 'Amara\nbutterfly');
  await pg.click('.ss-ed-btn');
  await new Promise((r) => setTimeout(r, 350));

  const rows = await pg.$$('.ss-myrow');
  ok('two words added', rows.length === 2, rows.length);

  const opening = await pg.evaluate(() => JSON.parse(localStorage.getItem('lcs:syllable-splitter:v1')).custom.map((c) => c.chunks.join('-')));
  ok('EVERY SEAM OPENS CLOSED — the machine proposed nothing',
    opening.every((c) => c.indexOf('-') < 0), JSON.stringify(opening));

  console.log('\n[cut a seam by hand]');
  // Amara -> A|ma|ra : cut after index 1 and 3
  const seams = await pg.$$('.ss-myrow:first-of-type .ss-seam');
  await seams[0].click(); await new Promise((r) => setTimeout(r, 200));
  const after1 = await pg.evaluate(() => JSON.parse(localStorage.getItem('lcs:syllable-splitter:v1')).custom[0].chunks.join('-'));
  ok('one tap makes one cut', after1 === 'A-mara', after1);

  const seams2 = await pg.$$('.ss-myrow:first-of-type .ss-seam');
  await seams2[2].click(); await new Promise((r) => setTimeout(r, 200));
  const after2 = await pg.evaluate(() => JSON.parse(localStorage.getItem('lcs:syllable-splitter:v1')).custom[0].chunks.join('-'));
  ok('a second tap makes a second cut', after2 === 'A-ma-ra', after2);

  ok('the live preview draws that many arcs',
    (await pg.$$('.ss-myrow:first-of-type .ss-myarc')).length === 3,
    (await pg.$$('.ss-myrow:first-of-type .ss-myarc')).length);

  await pg.screenshot({ path: path.join(OUT, 'AFTER-desk-mywords.png') });

  console.log('\n[the teacher\'s word reaches the board]');
  await pg.evaluate(() => { [...document.querySelectorAll('.ss-tab')].find((t) => /word sets/i.test(t.textContent)).click(); });
  await new Promise((r) => setTimeout(r, 250));
  const imgBefore = imgReqs.filter((u) => /image-library-webp/.test(u)).length;
  const hasMine = await pg.evaluate(() => [...document.querySelectorAll('.ss-seclabel')].some((e) => /my words/i.test(e.textContent)));
  ok('a "My words" set appears at the top of the sets list', hasMine);

  await pg.evaluate(() => { [...document.querySelectorAll('.ss-wordchip')].find((c) => c.textContent === 'Amara').click(); });
  await new Promise((r) => setTimeout(r, 400));
  ok('back on the board', !(await pg.$('.ss-desk')));
  ok('it renders as a NAME CARD, not a broken picture', !!(await pg.$('.ss-namecard')) && !(await pg.$('.ss-pic')));
  /* ⚠ this was `ok(..., true)` for one revision — a hard-coded pass, the
     exact vacuous-assertion defect this rebuild is fixing in the shipped
     smoke gate. It now measures the thing it claims. */
  ok('and fires NO image request for a word that has no picture',
    imgReqs.filter((u) => /image-library-webp/.test(u)).length === imgBefore,
    imgReqs.slice(imgBefore).join(','));

  // tap the drum 3x then reveal
  for (let i = 0; i < 3; i++) { await pg.click('.ss-drum'); await new Promise((r) => setTimeout(r, 180)); }
  const beats = (await pg.$$('.ss-beat')).length;
  ok('three taps drop three beats', beats === 3, beats);
  await pg.evaluate(() => document.querySelectorAll('.ss-ghostbtn')[0].click());
  await new Promise((r) => setTimeout(r, 500));
  const arcs = (await pg.$$('.ss-arc')).length;
  const shown = await pg.$eval('.ss-wordrow', (e) => [...e.querySelectorAll('.ss-syl')].map((s) => s.textContent).join('-'));
  ok('the board shows HER split, not one we invented', shown === 'A-ma-ra', shown);
  ok('and three arcs under it', arcs === 3, arcs);
  await pg.screenshot({ path: path.join(OUT, 'AFTER-board-customword.png') });

  ok('no page errors', errs.length === 0, errs[0]);

  await br.close(); srv.close();
  console.log('\n' + (fail ? `FAIL — ${fail}` : 'GREEN — desk works end to end'));
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
