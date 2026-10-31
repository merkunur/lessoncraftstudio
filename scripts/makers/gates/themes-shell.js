#!/usr/bin/env node
/**
 * Gate: picture themes in the maker screen (operator 2026-10-31: the teacher may pick any theme, colour or B&W).
 *
 *   every themed template offers a theme strip; where it offers both kinds there is a Color | Black & white switch
 *   a colouring template (themeAxis.needsBwSibling, e.g. K-011 Count and Color) offers ALL the black-and-white themes and
 *     no colour ones, so its tiles show the outlines the page prints; a B&W tile changes the page
 *   moving between templates keeps the teacher's pick: colour animals → Count and Color shows animals bw → back to a colour
 *     template restores colour animals
 *
 *   node scripts/makers/gates/themes-shell.js
 */
'use strict';
const http = require('http');
const path = require('path');
const fs = require('fs');
const puppeteer = require(path.join(__dirname, '..', '..', '..', 'node_modules', 'puppeteer'));
const { handler } = require('../serve.js');

const isBw = (t) => /bw(\s+\d+)?$/i.test(t);
(async () => {
  const OUT = path.join(__dirname, '..', '..', '..', 'out', 'makers');
  const v = fs.readFileSync(path.join(OUT, 'counting', 'current.txt'), 'utf8').trim();
  const tj = JSON.parse(fs.readFileSync(path.join(OUT, 'counting', v, 'templates.json'), 'utf8'));
  const allBw = Object.keys(JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'worksheet-gen', 'cache', 'manifest.json'), 'utf8')).themes).filter(isBw);
  let fails = 0;
  const check = (name, ok, extra) => { if (!ok) fails++; console.log((ok ? 'ok   ' : 'FAIL ') + name + (ok || extra === undefined ? '' : ' — ' + JSON.stringify(extra).slice(0, 300))); };

  const k011 = tj.templates.find((t) => t.id === 'K-011');
  check(`K-011 offers all ${allBw.length} black-and-white themes and no colour theme`, k011.themes.length === allBw.length && k011.themes.every(isBw), { n: k011.themes.length, colour: k011.themes.filter((t) => !isBw(t)) });
  const both = tj.templates.filter((t) => t.themed && t.id !== 'K-011' && t.themes.some(isBw) && t.themes.some((x) => !isBw(x)));
  check(`the other themed counting templates offer both kinds (${both.length})`, both.length === tj.templates.filter((t) => t.themed && t.id !== 'K-011' && t.themes.length).length);

  const srv = http.createServer(handler); await new Promise((r) => srv.listen(0, r));
  const base = `http://localhost:${srv.address().port}`;
  await new Promise((r) => http.get(`${base}/__dev/access?as=sub&made=0&downloaded=0`, (res) => { res.resume(); res.on('end', r); }));
  const browser = await puppeteer.launch();
  const p = await browser.newPage();
  const errs = [];
  p.on('pageerror', (e) => errs.push(e.message));
  await p.setViewport({ width: 1366, height: 900 });
  const settle = (ms = 900) => new Promise((r) => setTimeout(r, ms));
  const screen = () => p.evaluate(() => ({
    pressed: (document.querySelector('.mk-theme[aria-pressed=true]') || {}).title || null,
    tiles: document.querySelectorAll('.mk-theme').length,
    switch: [...document.querySelectorAll('.mk-switch .mk-chip')].map((c) => c.textContent + (c.getAttribute('aria-pressed') === 'true' ? '*' : '')),
    page: document.querySelector('.mk-sheet iframe').getAttribute('srcdoc'),
  }));
  const pick = (id) => p.evaluate((id) => document.querySelector(`.mk-card[data-id="${id}"]`).click(), id);

  await p.goto(`${base}/makers/app/?maker=counting&lang=en&t=K-002`, { waitUntil: 'networkidle0' }); await settle(1200);
  let s = await screen();
  check('K-002: colour strip with a Color | Black & white switch, Animals picked', s.switch.join() === 'Color*,Black & white' && s.pressed === 'Animals', s);
  await pick('K-011'); await settle(1200);
  s = await screen();
  check(`K-011: no switch, ${allBw.length} B&W tiles, Animals (its outline sibling) picked`, s.switch.length === 0 && s.tiles === allBw.length && s.pressed === 'Animals' && /animals(%20|\s)bw/i.test(s.page), { sw: s.switch, tiles: s.tiles, pressed: s.pressed });
  const pageA = s.page;
  await p.evaluate(() => [...document.querySelectorAll('.mk-theme')][5].click()); await settle(1200);
  s = await screen();
  check('K-011: another B&W tile changes the page', s.page !== pageA && s.pressed !== 'Animals', s.pressed);
  const k011Pick = s.pressed;
  await pick('K-002'); await settle(1200);
  s = await screen();
  check('back to K-002: the B&W theme picked in K-011 stays (B&W switch on)', s.pressed === k011Pick && s.switch.join() === 'Color,Black & white*', { pressed: s.pressed, sw: s.switch });
  await p.evaluate(() => [...document.querySelectorAll('.mk-switch .mk-chip')][0].click()); await settle(1200);
  await p.evaluate(() => [...document.querySelectorAll('.mk-theme')].find((b) => b.title === 'Animals').click()); await settle(1200);
  await pick('K-011'); await settle(1200);
  await pick('K-002'); await settle(1200);
  s = await screen();
  check('colour Animals → K-011 → back: colour Animals again (the teacher\'s pick is kept)', s.pressed === 'Animals' && s.switch.join() === 'Color*,Black & white', { pressed: s.pressed, sw: s.switch });

  if (errs.length) { fails++; console.log('FAIL page errors: ' + errs.slice(0, 3).join(' | ')); }
  await browser.close(); srv.close();
  console.log(fails ? `themes gate: ${fails} failing` : 'themes gate: all pass');
  if (fails) process.exitCode = 1;
})().catch((e) => { console.error('themes gate: error — ' + e.message); process.exit(1); });
