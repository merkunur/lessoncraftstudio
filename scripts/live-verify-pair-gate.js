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
    ok(live.indexOf('T_TEETER') > 0, '0 the deployed build has no T_TEETER');
    ok(live.indexOf('Der Rundungsh') > 0, '0 the deployed build has no German strings');
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
      const ar = document.querySelector(".pgt-field") || document.querySelector(".pgt-arena");
      if (!ar) return null;
      const ab = ar.getBoundingClientRect();
      const fx = e => e ? +(((e.getBoundingClientRect().left + e.getBoundingClientRect().width/2) - ab.left)/ab.width).toFixed(3) : null;
      const st = document.querySelector(".pgt-stone"), rg = document.querySelector(".pgt-ridge");
      return { x: fx(st), txt: st ? st.textContent : null,
        teeter: st ? st.className.indexOf("is-teeter") >= 0 : null,
        rest: st ? st.className.indexOf("is-rest") >= 0 : null,
        ridgeSet: rg ? rg.className.indexOf("is-set") >= 0 : null,
        marks: [].slice.call(document.querySelectorAll(".pgt-mark")).map(e => e.textContent),
        groundD: (document.querySelector(".pgt-ground") || {}).getAttribute
          ? document.querySelector(".pgt-ground").getAttribute("d").length : 0 };
    };
    const o = await p.evaluate(read);
    ok(!!o, "2 the ground did not render on production");
    if (o) {
      ok(o.marks.join("/") === "40/50", "2 the dips read " + o.marks.join("/"));
      ok(o.groundD > 200, "2 the ground path is " + o.groundD + " chars - it did not draw");
      ok(!o.ridgeSet, "2 the ridge ships already settled");
      ok(o.txt === "47", "2 the boulder reads " + o.txt);
    }
    /* let go on a slope: 47 must run downhill to 50 */
    await p.evaluate(() => document.querySelector(".pgt-b-go").click());
    await new Promise(r => setTimeout(r, 1000));
    const s1 = await p.evaluate(read);
    ok(s1.x !== null && Math.abs(s1.x - 1) < 0.04, "2 * 47 did not run to the high dip - it is at " + s1.x);
    ok(!!s1.rest, "2 the settled boulder is not drawn at rest");
    ok(!s1.teeter, "2 a boulder on a slope is teetering");
    /* on the ridge it must teeter, and STILL be teetering later */
    await p.evaluate(() => { const T = window.PairGate; T.st = T.again(T.st, T.ridge(T.st)); T.render(); });
    await new Promise(r => setTimeout(r, 300));
    await p.evaluate(() => document.querySelector(".pgt-b-go").click());
    await new Promise(r => setTimeout(r, 1200));
    const t1 = await p.evaluate(read);
    ok(!!t1.teeter, "2 ** the boulder on the ridge is NOT teetering on production");
    ok(!t1.rest, "2 ** the machine resolved the tie on its own");
    await new Promise(r => setTimeout(r, 2500));
    const t2 = await p.evaluate(read);
    ok(!!t2.teeter && !t2.rest, "2 ** the teeter resolved itself after waiting");
    /* the class settles the ridge: it leans and the boulder goes */
    await p.evaluate(() => document.querySelector(".pgt-b-tu").click());
    await new Promise(r => setTimeout(r, 2000));
    const t3 = await p.evaluate(read);
    ok(!!t3.ridgeSet, "2 * the ridge does not show that the class settled it");
    ok(t3.x !== null && Math.abs(t3.x - 1) < 0.04, "2 * the settled ridge did not send the boulder to the high dip");
    ok(!t3.teeter, "2 still teetering after the class decided");
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
