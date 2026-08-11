/* =====================================================================
   live-verify-missing-question.js — DRIVE #55 ON PRODUCTION
   ---------------------------------------------------------------------
   Run:  node scripts/live-verify-missing-question.js

   ⚠⚠ IT DRIVES THE LADDER, IT DOES NOT CHECK THAT THE PAGE MOUNTS. A
   green production gate that only asserts "the tool rendered" told a
   sibling its build was live while the server was still serving the
   PREVIOUS bytes. So this one walks the whole routine with real pointer
   clicks and asserts the count that comes out — a stale deploy cannot
   fake an arithmetic result it does not have the code for.

   ⚠ AND IT ASSERTS THE DEPLOYED BYTES SEPARATELY, by md5, because
   "the tool works" and "the tool I just wrote is the one working" are
   different claims and only the second one is what a deploy verifies.

   ⚠ Cloudflare holds deck/mini-tool assets on a 5-minute TTL (§15.8), so
   a mismatch immediately after a deploy may be the edge rather than the
   origin. The script says which, instead of leaving it ambiguous.
   ===================================================================== */
'use strict';

const https = require('https');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const HOST = 'https://www.lessoncraftstudio.com';
const LOCAL = path.join(__dirname, '..', 'mini tools', 'missing-question.js');
const sleep = ms => new Promise(r => setTimeout(r, ms));

function get(url) {
  return new Promise((res, rej) => {
    https.get(url, { headers: { 'Cache-Control': 'no-cache' } }, r => {
      const c = [];
      r.on('data', d => c.push(d));
      r.on('end', () => res({ status: r.statusCode, body: Buffer.concat(c), headers: r.headers }));
    }).on('error', rej);
  });
}
const md5 = b => crypto.createHash('md5').update(b).digest('hex');

let fails = 0;
const ok = (c, m) => { if (c) console.log('  ok   ' + m); else { console.log('  ✗    ' + m); fails++; } };

(async () => {
  console.log('#55 THE MISSING QUESTION — live verification\n');

  /* ---- 1. the deployed bytes ARE the bytes I wrote ---- */
  const localHash = md5(fs.readFileSync(LOCAL));
  const live = await get(HOST + '/mini-tools/missing-question.js?cb=' + Date.now());
  ok(live.status === 200, 'the tool js serves 200');
  const liveHash = md5(live.body);
  if (liveHash === localHash) {
    console.log('  ok   deployed bytes match local exactly (' + localHash.slice(0, 12) + ')');
  } else {
    console.log('  ✗    DEPLOYED BYTES DIFFER — local ' + localHash.slice(0, 12) + ' vs live ' + liveHash.slice(0, 12));
    console.log('       cf-cache-status: ' + (live.headers['cf-cache-status'] || 'n/a') +
      ' — if HIT, this is the 5-minute edge TTL, not the origin');
    fails++;
  }

  /* the html must point at the new cache-buster, or browsers keep the old js */
  const html = await get(HOST + '/mini-tools/missing-question.html?cb=' + Date.now());
  ok(/missing-question\.js\?v=2/.test(html.body.toString()), 'the html requests missing-question.js?v=2');

  /* ---- 2. the landing page is the REBUILT one ---- */
  const land = await get(HOST + '/en/tools/missing-question-decompose-numbers-kindergarten');
  ok(land.status === 200, 'the English landing page serves 200');
  const lt = land.body.toString();
  ok(!/shutter|the ledge/i.test(lt), 'the landing copy no longer names the dead covering build');
  ok(/three empty places|what could be asked/i.test(lt), 'the landing copy describes the rebuilt apparatus');

  /* ---- 3. DRIVE THE LADDER ON PRODUCTION ---- */
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const p = await b.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(String(e.message)));
  await p.setViewport({ width: 704, height: 1000 });
  await p.goto(HOST + '/mini-tools/missing-question.html?cb=' + Date.now(), { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sleep(1500);   /* ⚠ NOT networkidle0: the live page pulls Google Fonts and the
     idle event may never arrive, which times out the whole gate on a
     tool that is working perfectly. Wait for the mount instead. */

  const shape = await p.evaluate(() => {
    const q = s => document.querySelectorAll(s).length;
    return { niches: q('.mqu-niche'), stamps: q('.mqu-stampsvg'), link: q('.mqu-link > g'), wells: q('.mqu-well') };
  });
  ok(shape.niches === 3, 'three niches render (' + shape.niches + ')');
  ok(shape.link === 3, 'three linkage arrangements render (' + shape.link + ')');
  ok(shape.wells >= 10, 'the counting strip renders its wells (' + shape.wells + ')');

  const click = async s => { const e = await p.$(s); if (!e) return false; await e.click(); await sleep(280); return true; };
  const stage = () => p.$eval('.mqu-stand', e => e.getAttribute('data-stage'));

  const walk = [await stage()];
  ok(await click('.mqu-b-link'), 'the link control is reachable'); walk.push(await stage());
  const ask = await p.evaluate(() => window.MissingQuestion.st.ask);
  for (const i of [0, 1, 2]) if (i !== ask) { await click('.mqu-b-t' + i); walk.push(await stage()); }
  await click('.mqu-b-count');
  await sleep(20 * 260 + 800);
  walk.push(await stage());
  ok(walk.join(',') === '0,1,2,3,4', 'the ladder walks 0→1→2→3→4 by button (' + walk.join('→') + ')');

  /* the arithmetic the deploy cannot fake */
  const res = await p.evaluate(() => {
    const T = window.MissingQuestion, s = T.st, v = T.values(s);
    return { lit: document.querySelectorAll('.mqu-ct.is-on').length, answer: v[s.ask], vals: v };
  });
  ok(res.lit === res.answer,
    'the class counts exactly the missing amount: ' + res.lit + ' lit for an answer of ' + res.answer +
    ' (frame ' + JSON.stringify(res.vals) + ')');

  /* the question is settled and the strip carries it */
  ok(await p.$('.mqu-niche[data-state="resolved"]') !== null, 'the question niche reads as resolved');
  const label = await p.$eval('.mqu-count', e => e.getAttribute('aria-label'));
  ok(label && label.indexOf(String(res.answer)) >= 0,
    'a screen-reader user is told the count at the same moment the room is: "' + label + '"');

  ok(errs.length === 0, 'no page errors' + (errs.length ? ' — ' + errs[0] : ''));

  await b.close();
  console.log('');
  if (fails) { console.log('FAIL — ' + fails + ' check(s)'); process.exit(1); }
  console.log('PASS — the rebuilt tool is live, and the routine runs end to end on production.');
})().catch(e => { console.error('FAILED: ' + e.message); process.exit(1); });
