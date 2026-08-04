#!/usr/bin/env node
/* live-verify-place-value-lab.js — drives the REAL controls on production
   in all 11 locales. "It mounts" is not verification. */
'use strict';
const puppeteer = require('puppeteer');
const LOCALES = ['en','de','fr','it','es','pt','nl','sv','da','no','fi'];
const URL = 'https://www.lessoncraftstudio.com/mini-tools/place-value-lab.html?lang=';
let fails = 0;
(async () => {
  for (const L of LOCALES) {
    const br = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const pg = await br.newPage();
    await pg.setViewport({ width: 1024, height: 768 });
    const errs = []; pg.on('pageerror', e => errs.push(e.message));
    await pg.goto(URL + L, { waitUntil: 'networkidle0', timeout: 60000 });
    const r = await pg.evaluate(async () => {
      const T = window.PlaceValueLab;
      const adds = [...document.querySelectorAll('.pvl-add')];
      const before = T.engineValue(T.st);
      adds[adds.length - 1].click();               /* add a one */
      const afterOne = T.engineValue(T.st);
      for (let i = 0; i < 9; i++) adds[adds.length - 1].click();
      const offer = !!document.querySelector('.pvl-ctxbtn.make');
      if (offer) document.querySelector('.pvl-ctxbtn.make').click();
      const tidy = T.engineCanonical(T.st);
      const cube = document.querySelector('.pvl-cube'), rod = document.querySelector('.pvl-rod'), flat = document.querySelector('.pvl-flat');
      const R = (e) => e ? e.getBoundingClientRect() : null;
      const c = R(cube), rd = R(rod), f = R(flat);
      return {
        cols: document.querySelectorAll('.pvl-col').length,
        word: (document.querySelector('.pvl-word') || {}).textContent || '',
        spans: document.querySelectorAll('.pvl-span').length,
        before, afterOne, offer, tidy,
        rodPerCube: c && rd ? +(rd.height / c.height).toFixed(2) : null,
        flatPerRod: rd && f ? +(f.width / rd.width).toFixed(2) : null,
        sheet: !!document.querySelector('.pvl-sheet'),
        print: !!document.querySelector('.pvl-dock .pvl-chip'),
      };
    });
    const ok = r.cols === 3 && r.afterOne === r.before + 1 && r.offer && r.tidy
      && r.rodPerCube === 10 && r.flatPerRod === 10 && r.spans > 0 && r.sheet && !errs.length;
    if (!ok) fails++;
    console.log(`${ok ? '✓' : '✗'} ${L}: ${r.cols} cols · +1 ${r.before}→${r.afterOne} · offer ${r.offer} · tidied ${r.tidy} · rod ${r.rodPerCube} cubes · flat ${r.flatPerRod} rods · "${r.word.slice(0,34)}"${errs.length ? ' ERR ' + errs[0].slice(0,60) : ''}`);
    await br.close();
  }
  console.log(fails ? `\nFAIL — ${fails} locale(s)` : '\nPASS — live on production, all 11 locales');
  process.exit(fails ? 1 : 0);
})();
