/* =====================================================================
   LIVE VERIFY — TOOL #54 on production
   =====================================================================
   ⚠ DRIVES THE MAIN CONTROL, never "it mounts". And it asserts things
   only true of THIS build, so a stale deploy cannot pass it: #45's
   live-verify passed 108 assertions against bytes that were never
   shipped.
   ⚠ Cloudflare holds mini-tools for up to an hour, so the .js is
   fetched with a cache-buster and compared to the local file.
   Run: node scripts/live-verify-doubling-mirror.js
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const BASE = 'https://www.lessoncraftstudio.com';
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const T = require(path.join(__dirname, '..', 'mini tools', 'doubling-mirror.js'));
const fails = []; let pass = 0;
const ok = (c, m) => { if (c) pass++; else fails.push(m); };

(async () => {
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  /* ---- 0. the DEPLOYED BYTES are this build ---------------------- */
  {
    const p = await b.newPage();
    const r = await p.goto(BASE + '/mini-tools/doubling-mirror.js?lv=' + Date.now(), { waitUntil: 'domcontentloaded' });
    ok(r.status() === 200, '0 the tool script is not 200 (' + r.status() + ')');
    const live = await r.text();
    const local = fs.readFileSync(path.join(__dirname, '..', 'mini tools', 'doubling-mirror.js'), 'utf8');
    ok(live.replace(/\r\n/g, '\n') === local.replace(/\r\n/g, '\n'),
      '0 ⚠⚠ the DEPLOYED bytes differ from the local file — a stale deploy');
    /* something only true of this build */
    ok(live.indexOf('T_BEAT') > 0, '0 the deployed build has no T_BEAT');
    ok(live.indexOf('Das Scharnier') > 0, '0 the deployed build has no German strings');
    await p.close();
  }

  /* ---- 1. every locale's landing is 200, not 410 (the trap) ------ */
  const L = require(path.join(__dirname, '_doubling-mirror-landing.js'));
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
    ok(!!iframe && iframe.indexOf('doubling-mirror') >= 0, '1 ' + loc + ' landing has no tool iframe');
    await p.close();
  }

  /* ---- 2. DRIVE THE APPARATUS on production --------------------- */
  {
    const p = await b.newPage();
    await p.setViewport({ width: 768, height: 1024 });
    await p.goto(BASE + "/mini-tools/doubling-mirror.html?lang=en&cb=" + Date.now(), { waitUntil: "domcontentloaded" });
    await new Promise(r => setTimeout(r, 1100));
    const read = () => {
      const tray = document.querySelector(".dbm-tray"); if (!tray) return null;
      const near = document.querySelector(".dbm-near"), far = document.querySelector(".dbm-far");
      const odd = document.querySelector(".dbm-odd");
      return { near: near.querySelectorAll(".dbm-c").length,
        far: far.querySelectorAll(".dbm-c").length,
        odd: odd.querySelectorAll(".dbm-c").length,
        oddShown: odd.style.visibility !== "hidden",
        closed: tray.className.indexOf("is-closed") >= 0,
        lowOff: (document.querySelector(".dbm-b-low").className.indexOf("is-off") >= 0) };
    };
    const o = await p.evaluate(read);
    ok(!!o, "2 the tray did not render on production");
    ok(o && !o.closed, "2 the tray starts closed");
    /* ** DRIVEN BY BUTTON THROUGHOUT - on this tool an entire branch was
       unreachable and two gates missed it by reaching the model directly */
    await p.evaluate(() => document.querySelector(".dbm-b-close").click());
    await new Promise(r => setTimeout(r, 1200));
    const c = await p.evaluate(read);
    ok(c.far === c.near && c.far > 0, "2 ** the far leaf holds " + c.far + " and the near " + c.near);
    ok(c.closed, "2 the tray is not drawn closed");
    /* the branch that was DEAD: one more on a closed tray */
    await p.evaluate(() => document.querySelector(".dbm-b-more").click());
    await new Promise(r => setTimeout(r, 500));
    const plus = await p.evaluate(read);
    ok(plus.oddShown && plus.odd === 1, "2 *** one more on a CLOSED tray did not produce the odd counter");
    /* ** N1: the side control must NOT be live before anything opened */
    ok(plus.lowOff, "2 *** the side control is LIVE before anything was opened - the announcement leaks a raw placeholder");
    await p.evaluate(() => document.querySelector(".dbm-b-open").click());
    await new Promise(r => setTimeout(r, 900));
    const op = await p.evaluate(read);
    ok(!op.closed, "2 ** opening left the tray CLOSED - the control has no consequence");
    ok(!op.lowOff, "2 the side control is still off after opening");
    ok(op.oddShown, "2 the odd counter vanished on opening");
    await p.evaluate(() => document.querySelector(".dbm-b-high").click());
    await new Promise(r => setTimeout(r, 700));
    const sd = await p.evaluate(read);
    ok(!sd.oddShown, "2 *** still waiting after the class chose a side - the apparatus stalled");
    ok(Math.abs(sd.near - sd.far) === 1, "2 the leaves differ by " + Math.abs(sd.near - sd.far));
    ok(sd.far === sd.near + 1, "2 the odd one went to the wrong leaf");
    await p.close();
  }

  /* ---- 3. the hub card shows the real thumbnail ------------------ */
  {
    const p = await b.newPage();
    const r = await p.goto(BASE + '/mini-tools/tool-previews/doubling-mirror.webp?cb=' + Date.now(), { waitUntil: 'domcontentloaded' });
    ok(r.status() === 200, '3 the hub thumbnail is ' + r.status() + ' — the card falls back to a generic glyph');
    await p.close();
  }

  await b.close();
  console.log((fails.length ? 'FAIL' : 'PASS') + '  ' + pass + ' live assertions, ' + fails.length + ' failures');
  fails.forEach(f => console.log('  ✗ ' + f));
  if (fails.length) process.exit(1);
})();
