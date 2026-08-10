/* =====================================================================
   LIVE VERIFY — TOOL #51 on production
   =====================================================================
   ⚠ DRIVES THE MAIN CONTROL, never "it mounts". And it asserts things
   only true of THIS build, so a stale deploy cannot pass it: #45's
   live-verify passed 108 assertions against bytes that were never
   shipped.
   ⚠ Cloudflare holds mini-tools for up to an hour, so the .js is
   fetched with a cache-buster and compared to the local file.
   Run: node scripts/live-verify-landing-strip.js
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const BASE = 'https://www.lessoncraftstudio.com';
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const T = require(path.join(__dirname, '..', 'mini tools', 'landing-strip.js'));
const fails = []; let pass = 0;
const ok = (c, m) => { if (c) pass++; else fails.push(m); };

(async () => {
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  /* ---- 0. the DEPLOYED BYTES are this build ---------------------- */
  {
    const p = await b.newPage();
    const r = await p.goto(BASE + '/mini-tools/landing-strip.js?lv=' + Date.now(), { waitUntil: 'domcontentloaded' });
    ok(r.status() === 200, '0 the tool script is not 200 (' + r.status() + ')');
    const live = await r.text();
    const local = fs.readFileSync(path.join(__dirname, '..', 'mini tools', 'landing-strip.js'), 'utf8');
    ok(live.replace(/\r\n/g, '\n') === local.replace(/\r\n/g, '\n'),
      '0 ⚠⚠ the DEPLOYED bytes differ from the local file — a stale deploy');
    /* something only true of this build */
    ok(live.indexOf('T_BEAT') > 0, '0 the deployed build has no T_BEAT');
    ok(live.indexOf('Die drei Pfosten') > 0, '0 the deployed build has no German strings');
    await p.close();
  }

  /* ---- 1. every locale's landing is 200, not 410 (the trap) ------ */
  const L = require(path.join(__dirname, '_landing-strip-landing.js'));
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
    ok(!!iframe && iframe.indexOf('landing-strip') >= 0, '1 ' + loc + ' landing has no tool iframe');
    await p.close();
  }

  /* ---- 2. DRIVE THE APPARATUS on production --------------------- */
  {
    const p = await b.newPage();
    await p.setViewport({ width: 768, height: 1024 });
    await p.goto(BASE + "/mini-tools/landing-strip.html?lang=en&cb=" + Date.now(), { waitUntil: "domcontentloaded" });
    await new Promise(r => setTimeout(r, 1000));
    const read = () => {
      const st = document.querySelector(".lds-strip"); if (!st) return null;
      const sb = st.getBoundingClientRect();
      const at = e => e ? +(((e.getBoundingClientRect().left + e.getBoundingClientRect().width/2) - sb.left)/sb.width).toFixed(3) : null;
      const wd = document.querySelector(".lds-wedge");
      return { posts: [].slice.call(document.querySelectorAll(".lds-post")).map(at),
        ends: [].slice.call(document.querySelectorAll(".lds-end")).map(e => e.textContent),
        plaque: document.querySelector(".lds-plaque") ? document.querySelector(".lds-plaque").textContent : null,
        wedge: (wd && wd.className.indexOf("is-on") >= 0) ? at(wd) : null,
        ticks: document.querySelectorAll(".lds-strip [class*=tick]").length };
    };
    const o = await p.evaluate(read);
    ok(!!o, "2 the strip did not render on production");
    if (o) {
      ok(o.posts.length === 3, "2 " + o.posts.length + " posts on production");
      ok(o.posts[0] === 0 && o.posts[1] === 0.5 && o.posts[2] === 1, "2 ⭐ the posts are at " + o.posts.join());
      ok(o.ends.join("/") === "0/100", "2 the ends read " + o.ends.join("/"));
      ok(o.ticks === 0, "2 the strip has ticks on it");
    }
    const n = Number(o.plaque);
    await p.evaluate(() => document.querySelector(".lds-b-p1").click());
    await new Promise(r => setTimeout(r, 400));
    await p.evaluate(() => document.querySelector(".lds-b-place").click());
    await new Promise(r => setTimeout(r, 1500));
    const sh = await p.evaluate(read);
    ok(sh.wedge !== null, "2 ⚠ the truth never appeared after the beat on production");
    ok(sh.wedge === null || Math.abs(sh.wedge - n/100) < 0.02, "2 the wedge is at " + sh.wedge + " for " + n);
    await p.evaluate(() => document.querySelector(".lds-b-rerule").click());
    await new Promise(r => setTimeout(r, 1100));
    const ins = await p.evaluate(read);
    const lo = Math.floor(n/10)*10;
    ok(ins.ends.join("/") === lo + "/" + (lo+10), "2 ⭐ after the re-rule the ends read " + ins.ends.join("/"));
    ok(ins.posts[0] === 0 && ins.posts[1] === 0.5 && ins.posts[2] === 1, "2 ⭐ the posts did not come back inside the ten");
    const live = await p.evaluate(() => [].slice.call(document.querySelectorAll(".lds-b-post")).filter(x => x.className.indexOf("is-off") < 0).length);
    ok(live === 3, "2 ⭐ only " + live + " post buttons live after the re-rule — the question did not recur");
    await p.close();
  }
  /* ---- 3. the hub card shows the real thumbnail ------------------ */
  {
    const p = await b.newPage();
    const r = await p.goto(BASE + '/mini-tools/tool-previews/landing-strip.webp?cb=' + Date.now(), { waitUntil: 'domcontentloaded' });
    ok(r.status() === 200, '3 the hub thumbnail is ' + r.status() + ' — the card falls back to a generic glyph');
    await p.close();
  }

  await b.close();
  console.log((fails.length ? 'FAIL' : 'PASS') + '  ' + pass + ' live assertions, ' + fails.length + ' failures');
  fails.forEach(f => console.log('  ✗ ' + f));
  if (fails.length) process.exit(1);
})();
