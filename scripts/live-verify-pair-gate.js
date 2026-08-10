/* =====================================================================
   LIVE VERIFY — TOOL #53 on production
   =====================================================================
   ⚠ DRIVES THE MAIN CONTROL, never "it mounts". And it asserts things
   only true of THIS build, so a stale deploy cannot pass it: #45's
   live-verify passed 108 assertions against bytes that were never
   shipped.
   ⚠ Cloudflare holds mini-tools for up to an hour, so the .js is
   fetched with a cache-buster and compared to the local file.
   Run: node scripts/live-verify-pair-gate.js
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const BASE = 'https://www.lessoncraftstudio.com';
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const T = require(path.join(__dirname, '..', 'mini tools', 'pair-gate.js'));
const fails = []; let pass = 0;
const ok = (c, m) => { if (c) pass++; else fails.push(m); };

(async () => {
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  /* ---- 0. the DEPLOYED BYTES are this build ---------------------- */
  {
    const p = await b.newPage();
    const r = await p.goto(BASE + '/mini-tools/pair-gate.js?lv=' + Date.now(), { waitUntil: 'domcontentloaded' });
    ok(r.status() === 200, '0 the tool script is not 200 (' + r.status() + ')');
    const live = await r.text();
    const local = fs.readFileSync(path.join(__dirname, '..', 'mini tools', 'pair-gate.js'), 'utf8');
    ok(live.replace(/\r\n/g, '\n') === local.replace(/\r\n/g, '\n'),
      '0 ⚠⚠ the DEPLOYED bytes differ from the local file — a stale deploy');
    /* something only true of this build */
    ok(live.indexOf('T_SILL') > 0, '0 the deployed build has no T_SILL');
    ok(live.indexOf('Der Rundbogen') > 0, '0 the deployed build has no German strings');
    await p.close();
  }

  /* ---- 1. every locale's landing is 200, not 410 (the trap) ------ */
  const L = require(path.join(__dirname, '_pair-gate-landing.js'));
  for (const loc of LOCALES) {
    const p = await b.newPage();
    const url = BASE + '/' + loc + '/tools/' + L[loc].slug;
    const r = await p.goto(url, { waitUntil: 'domcontentloaded' });
    ok(r.status() === 200, '1 ⚠ ' + loc + ' landing is ' + r.status() + ' — ' + url);
    const txt = await p.evaluate(() => document.body.innerText);
    const want = T.strings.title[loc] || T.strings.title.en;
    ok(txt.indexOf(want) >= 0, '1 ' + loc + ' landing does not name the tool ("' + want + '")');
    const iframe = await p.evaluate(() => {
      const f = document.querySelector('iframe');
      return f ? f.getAttribute('src') : null;
    });
    ok(!!iframe && iframe.indexOf('pair-gate') >= 0, '1 ' + loc + ' landing has no tool iframe');
    await p.close();
  }

  /* ---- 2. DRIVE THE APPARATUS on production --------------------- */
  {
    const p = await b.newPage();
    await p.setViewport({ width: 768, height: 1024 });
    await p.goto(BASE + "/mini-tools/pair-gate.html?lang=en&cb=" + Date.now(), { waitUntil: "domcontentloaded" });
    await new Promise(r => setTimeout(r, 1100));
    const read = () => {
      const bar = document.querySelector(".pgt-bar"), arch = document.querySelector(".pgt-arch");
      const yard = document.querySelector(".pgt-yard"), wait = document.querySelector(".pgt-wait");
      const sill = document.querySelector(".pgt-sill");
      return {
        through: yard ? yard.querySelectorAll(".pgt-m").length : -1,
        waiting: wait ? wait.querySelectorAll(".pgt-m").length : -1,
        seats: wait ? wait.querySelectorAll(".pgt-seat").length : -1,
        barUp: bar ? bar.className.indexOf("is-up") >= 0 : null,
        archW: arch ? +arch.getBoundingClientRect().width.toFixed(1) : null,
        sillOn: sill ? sill.querySelectorAll(".pgt-m").length : -1,
        sillFull: sill ? sill.className.indexOf("is-full") >= 0 : null,
        sillW: sill && sill.style.display !== "none" ? +sill.getBoundingClientRect().width.toFixed(1) : null
      };
    };
    const o = await p.evaluate(read);
    ok(!!o && o.waiting > 0, "2 the parade did not render on production");
    ok(o && !o.barUp, "2 ** the bar is UP before anybody predicted - the tool is a cutscene");
    /* a rank must NOT go through with the bar down */
    await p.evaluate(() => document.querySelector(".pgt-b-call").click());
    await new Promise(r => setTimeout(r, 350));
    const held = await p.evaluate(read);
    ok(held.through === 0, "2 ** a rank went through with the bar DOWN on production");
    /* predict, then march to the standstill */
    await p.evaluate(() => document.querySelector(".pgt-b-no").click());
    await new Promise(r => setTimeout(r, 600));
    const pr = await p.evaluate(read);
    ok(!!pr.barUp, "2 * the bar did not lift after the prediction");
    for (let i = 0; i < 14; i++) {
      await p.evaluate(() => document.querySelector(".pgt-b-call").click());
      await new Promise(r => setTimeout(r, 190));
    }
    const done = await p.evaluate(read);
    ok(done.through + done.waiting === o.waiting, "2 through+waiting != the parade");
    ok(done.waiting < 2, "2 ** a full rank was left standing (" + done.waiting + ")");
    /* * the leftover is not marked - the EMPTY SEAT beside it is */
    if (done.waiting > 0) ok(done.seats >= 1, "2 ** somebody is standing and no empty seat is drawn");
    /* the theorem, and the sill must match the archway - that IS the proof */
    if (done.waiting > 0) {
      await p.evaluate(() => document.querySelector(".pgt-b-second").click());
      await new Promise(r => setTimeout(r, 500));
      await p.evaluate(() => document.querySelector(".pgt-b-sill").click());
      await new Promise(r => setTimeout(r, 1700));
      const sl = await p.evaluate(read);
      ok(sl.sillOn >= 2, "2 * the sill holds " + sl.sillOn);
      ok(!!sl.sillFull, "2 ** two left-behinds at two abreast did NOT make a full rank");
      ok(sl.sillW !== null && Math.abs(sl.sillW - sl.archW) <= 14,
        "2 ** the sill is " + sl.sillW + "px and the archway " + sl.archW + "px - the proof depends on them matching");
    }
    await p.close();
  }

  /* ---- 3. the hub card shows the real thumbnail ------------------ */
  {
    const p = await b.newPage();
    const r = await p.goto(BASE + '/mini-tools/tool-previews/pair-gate.webp?cb=' + Date.now(), { waitUntil: 'domcontentloaded' });
    ok(r.status() === 200, '3 the hub thumbnail is ' + r.status() + ' — the card falls back to a generic glyph');
    await p.close();
  }

  await b.close();
  console.log((fails.length ? 'FAIL' : 'PASS') + '  ' + pass + ' live assertions, ' + fails.length + ' failures');
  fails.forEach(f => console.log('  ✗ ' + f));
  if (fails.length) process.exit(1);
})();
