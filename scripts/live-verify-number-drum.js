/* =====================================================================
   LIVE VERIFY — TOOL #50 on production
   =====================================================================
   ⚠ DRIVES THE MAIN CONTROL, never "it mounts". And it asserts things
   only true of THIS build, so a stale deploy cannot pass it: #45's
   live-verify passed 108 assertions against bytes that were never
   shipped.
   ⚠ Cloudflare holds mini-tools for up to an hour, so the .js is
   fetched with a cache-buster and compared to the local file.
   Run: node scripts/live-verify-number-drum.js
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const BASE = 'https://www.lessoncraftstudio.com';
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const T = require(path.join(__dirname, '..', 'mini tools', 'number-drum.js'));
const fails = []; let pass = 0;
const ok = (c, m) => { if (c) pass++; else fails.push(m); };

(async () => {
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  /* ---- 0. the DEPLOYED BYTES are this build ---------------------- */
  {
    const p = await b.newPage();
    const r = await p.goto(BASE + '/mini-tools/number-drum.js?lv=' + Date.now(), { waitUntil: 'domcontentloaded' });
    ok(r.status() === 200, '0 the tool script is not 200 (' + r.status() + ')');
    const live = await r.text();
    const local = fs.readFileSync(path.join(__dirname, '..', 'mini tools', 'number-drum.js'), 'utf8');
    ok(live.replace(/\r\n/g, '\n') === local.replace(/\r\n/g, '\n'),
      '0 ⚠⚠ the DEPLOYED bytes differ from the local file — a stale deploy');
    /* something only true of this build */
    ok(live.indexOf('T_CATCH') > 0, '0 the deployed build has no T_CATCH');
    ok(live.indexOf('Der Zahlenring') > 0, '0 the deployed build has no German strings');
    await p.close();
  }

  /* ---- 1. every locale's landing is 200, not 410 (the trap) ------ */
  const L = require(path.join(__dirname, '_number-drum-landing.js'));
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
    ok(!!iframe && iframe.indexOf('number-drum') >= 0, '1 ' + loc + ' landing has no tool iframe');
    await p.close();
  }

  /* ---- 2. DRIVE THE CRANK on production ------------------------- */
  {
    const p = await b.newPage();
    await p.setViewport({ width: 768, height: 1024 });
    await p.goto(BASE + '/mini-tools/number-drum.html?lang=en&cb=' + Date.now(), { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 900));

    const read = () => {
      const rings = [].slice.call(document.querySelectorAll('.ndr-ring')).reverse();
      return rings.map(function (r) {
        const rb = r.getBoundingClientRect(), mid = rb.top + rb.height / 2;
        let at = null, best = 1e9;
        [].slice.call(r.querySelectorAll('.ndr-cell')).forEach(function (c) {
          const bb = c.getBoundingClientRect(), d = Math.abs((bb.top + bb.bottom) / 2 - mid);
          if (d < best) { best = d; at = c.textContent; }
        });
        return at;
      });
    };
    const open = await p.evaluate(read);
    ok(open.length >= 2, '2 fewer than two rings rendered on production');
    ok(open.join('') === '00', '2 production opens at "' + open.join('') + '", expected 00');

    /* nine turns to 9, then the tenth is THE CARRY */
    for (let i = 0; i < 9; i++) {
      await p.evaluate(() => document.querySelector('.ndr-b-fwd').click());
      await new Promise(r => setTimeout(r, 360));
    }
    const at9 = await p.evaluate(read);
    ok(at9[0] === '9', '2 after nine turns the ones ring reads "' + at9[0] + '"');

    /* ⭐ the claim: 0 is drawn directly under the 9 */
    const nbr = await p.evaluate(() => {
      const rings = [].slice.call(document.querySelectorAll('.ndr-ring')).reverse();
      const r = rings[0], rb = r.getBoundingClientRect(), mid = rb.top + rb.height / 2;
      const cells = [].slice.call(r.querySelectorAll('.ndr-cell')).map(c => ({
        d: c.textContent, m: (c.getBoundingClientRect().top + c.getBoundingClientRect().bottom) / 2
      })).sort((a, z) => a.m - z.m);
      const i = cells.findIndex(c => Math.abs(c.m - mid) < 4);
      return { above: cells[i - 1] && cells[i - 1].d, at: cells[i] && cells[i].d, below: cells[i + 1] && cells[i + 1].d };
    });
    ok(nbr.at === '9' && nbr.below === '0' && nbr.above === '8',
      '2 ⭐ the ring is not closed on production: ' + JSON.stringify(nbr));

    await p.evaluate(() => document.querySelector('.ndr-b-fwd').click());
    await new Promise(r => setTimeout(r, 900));
    const after = await p.evaluate(read);
    ok(after[0] === '0' && after[1] === '1', '2 ⭐ the carry did not fire: reads ' + after.slice().reverse().join(''));

    /* the slow crank parks it between two numerals */
    await p.evaluate(() => document.querySelector('.ndr-b-slow').click());
    await p.evaluate(() => document.querySelector('.ndr-b-fwd').click());
    await new Promise(r => setTimeout(r, 700));
    const caught = await p.evaluate(() => document.querySelectorAll('.ndr-ring.is-turning').length);
    ok(caught >= 1, '2 ⭐ slow turning did not park a ring between two numerals');
    await p.close();
  }

  /* ---- 3. the hub card shows the real thumbnail ------------------ */
  {
    const p = await b.newPage();
    const r = await p.goto(BASE + '/mini-tools/tool-previews/number-drum.webp?cb=' + Date.now(), { waitUntil: 'domcontentloaded' });
    ok(r.status() === 200, '3 the hub thumbnail is ' + r.status() + ' — the card falls back to a generic glyph');
    await p.close();
  }

  await b.close();
  console.log((fails.length ? 'FAIL' : 'PASS') + '  ' + pass + ' live assertions, ' + fails.length + ' failures');
  fails.forEach(f => console.log('  ✗ ' + f));
  if (fails.length) process.exit(1);
})();
