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

  /* ---- 2. DRIVE THE APPARATUS on production ---------------------
     \u26a0\u26a0 THIS SECTION WAS STALE AGAINST ITS OWN TOOL. It drove
     `.dbm-b-low` / `.dbm-b-high` \u2014 the side-choice buttons the rebuild
     DELETED \u2014 and asserted the odd counter went to the FAR leaf, which
     is now the near one. A live gate written against a retired design
     is worse than none: it would have failed a correct deploy and sent
     me looking for a defect that no longer exists.
     Every assertion below is true ONLY of this build, so a stale deploy
     cannot pass \u2014 the #45 lesson, where 108 live assertions passed
     against bytes that were never shipped. */
  {
    const p = await b.newPage();
    await p.setViewport({ width: 768, height: 1024 });
    await p.goto(BASE + "/mini-tools/doubling-mirror.html?lang=en&cb=" + Date.now(), { waitUntil: "domcontentloaded" });
    await new Promise(r => setTimeout(r, 1200));

    const read = () => {
      const tray = document.querySelector(".dbm-tray"); if (!tray) return null;
      const near = document.querySelector(".dbm-near"), far = document.querySelector(".dbm-far");
      const odd = document.querySelector(".dbm-odd"), tot = document.querySelector(".dbm-num-total");
      const vis = (el) => Array.prototype.filter.call(el.querySelectorAll(".dbm-c"),
        (c) => parseFloat(getComputedStyle(c).opacity) > 0.5).length;
      return { near: vis(near), far: vis(far), odd: odd.querySelectorAll(".dbm-c").length,
        closed: tray.className.indexOf("is-closed") >= 0,
        total: tot ? tot.textContent.trim() : null,
        say: (document.querySelector(".dbm-say") || {}).textContent || "",
        chips: document.querySelectorAll(".dbm-chips .dbm-btn").length,
        oddGroup: !!document.querySelector(".dbm-g-odd") };
    };
    const click = async (sel, ms) => {
      const hit = await p.evaluate((x) => { const e = document.querySelector(x); if (!e) return false; e.click(); return true; }, sel);
      if (!hit) throw new Error("live-verify: production has no " + sel + " \u2014 the deploy is not this build");
      await new Promise(r => setTimeout(r, ms || 250));
    };
    const chip = async (n, ms) => {
      const hit = await p.evaluate((i) => { const c = document.querySelectorAll(".dbm-chips .dbm-btn");
        if (!c.length) return false; c[Math.min(i, c.length - 1)].click(); return true; }, n || 0);
      if (!hit) throw new Error("live-verify: the chip strip is empty on production");
      await new Promise(r => setTimeout(r, ms || 200));
    };

    const o = await p.evaluate(read);
    ok(!!o, "2 the tray did not render on production");
    ok(o && !o.closed, "2 the tray starts closed");
    ok(o && o.oddGroup, "2 the settle group is absent \u2014 this is not the rebuilt strip");
    ok(o && o.chips > 0, "2 the chip strip did not render \u2014 the class cannot commit");

    /* \u2b50 A FINGERPRINT OF THIS BUILD: closing without a committed
       numeral is REFUSED. The old build shut immediately. */
    await click(".dbm-b-close", 700);
    const noClaim = await p.evaluate(read);
    ok(!noClaim.closed, "2 *** the tray SHUT WITH NO CLAIM \u2014 production is running the pre-rebuild build");

    await chip(0);
    await click(".dbm-b-close", 400);
    /* the beat: shut, and the total NOT yet shown */
    const beat = await p.evaluate(read);
    ok(beat.closed, "2 the tray did not shut after the claim");
    ok(beat.total === "", "2 *** the total appeared DURING THE BEAT \u2014 the tray said the double before it existed");
    await new Promise(r => setTimeout(r, 2200));
    const c = await p.evaluate(read);
    ok(c.far === c.near && c.far > 0, "2 ** the far half holds " + c.far + " and the near " + c.near);
    ok(/^\d+$/.test(c.total), "2 the total is still withheld after the deal");

    /* one more on the SHUT tray, then open onto an odd total */
    await click(".dbm-b-more", 400);
    await chip(0);
    await click(".dbm-b-open", 1400);
    const op = await p.evaluate(read);
    ok(!op.closed, "2 ** opening left the tray CLOSED \u2014 the control has no consequence");
    ok(op.odd === 1, "2 *** opening an odd total left no counter on the spine pad");
    ok(op.near === op.far, "2 the leaves came out unequal at the moment of opening (" + op.near + "/" + op.far + ")");

    /* GIVE: the odd one joins the NEAR leaf \u2014 the rebuild's rule */
    await click(".dbm-b-give", 900);
    const g = await p.evaluate(read);
    ok(g.odd === 0, "2 *** the counter is STILL waiting after give \u2014 the apparatus stalled");
    ok(g.near === g.far + 1, "2 *** give sent the odd one to the wrong leaf (near " + g.near + ", far " + g.far + ")");

    /* FETCH: rebuild the same odd total and take the other branch */
    await click(".dbm-b-again", 500);
    await chip(0);
    await click(".dbm-b-close", 2400);
    await click(".dbm-b-more", 400);
    await chip(0);
    await click(".dbm-b-open", 1400);
    const before = await p.evaluate(read);
    ok(before.odd === 1, "2 could not rebuild an odd total to test fetch");
    await click(".dbm-b-fetch", 900);
    const f = await p.evaluate(read);
    ok(f.odd === 0, "2 *** the counter is still waiting after fetch");
    ok(f.near === f.far && f.near === before.near + 1,
      "2 *** fetch did not bring a partner to BOTH leaves (" + f.near + "/" + f.far + ")");
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
