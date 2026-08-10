/* live-verify-counting-cups.js — TOOL #48 on PRODUCTION, all 11 locales.
   ⚠ It DRIVES THE SCOOP, not "it mounts", and asserts something true
   only of THIS build, so it doubles as a deployed-bytes check.
   Run: node scripts/live-verify-counting-cups.js                      */
'use strict';
const puppeteer = require('puppeteer');
const BASE = 'https://www.lessoncraftstudio.com';
const LOC = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const SLUG = require('./_counting-cups-landing.js');
let PASS = 0, FAIL = 0; const fails = [];
function ok(c, m) { if (c) PASS++; else { FAIL++; fails.push(m); } }

(async () => {
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  for (const loc of LOC) {
    const url = `${BASE}/${loc}/tools/${SLUG[loc].slug}`;
    const p = await b.newPage();
    const r = await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 }).catch(() => null);
    ok(r && r.status() === 200, `${loc}: landing ${url} → ${r ? r.status() : 'no response'}`);
    if (r && r.status() === 200) {
      const html = await p.content();
      ok(html.indexOf(SLUG[loc].name) !== -1, `${loc}: landing does not carry the tool name`);
      ok(html.indexOf('counting-cups.html') !== -1, `${loc}: landing does not embed the mini-tool`);
    }
    await p.close();

    /* the tool itself, driven */
    const q = await b.newPage();
    await q.goto(`${BASE}/mini-tools/counting-cups.html?lang=${loc}`, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await new Promise(s => setTimeout(s, 900));
    const pre = await q.evaluate(() => {
      const T = window.CountingCups;
      if (!T || !T.st) return null;
      return { n: T.st.n, mat: T.st.mat.length, band: T.st.band,
        ringNodes: document.querySelectorAll('.ccp-ring').length,
        digits: [].map.call(document.querySelectorAll('.ccp-digit'), e => e.textContent).join(''),
        title: (document.querySelector('.lcs-title') || {}).textContent || '',
        /* only true of THIS build: the density band is four coarse buckets
           and the mouth is sized from the collection's own density */
        hasMouthRadius: typeof T.mouthRadius === 'function',
        hasPadAim: typeof T._padAim === 'function' };
    });
    ok(pre, `${loc}: the tool did not mount on production`);
    if (pre) {
      ok(pre.hasMouthRadius && pre.hasPadAim, `${loc}: DEPLOYED BYTES ARE STALE — mouthRadius/_padAim absent`);
      ok(pre.ringNodes <= 3, `${loc}: heap is ${pre.ringNodes} nodes — the count is enumerable`);
      ok(pre.digits.indexOf('?') !== -1, `${loc}: the readout is not withholding at open`);
      ok(pre.mat > 0, `${loc}: the mat is empty at open`);

      /* DRIVE THE SCOOP with a real pointer */
      const pt = await q.evaluate(() => {
        const T = window.CountingCups;
        const ar = document.querySelector('.ccp-arena').getBoundingClientRect();
        const a = T._padAim(4, T.st);
        return { x: ar.left + a.x / T.GEO.VB_W * ar.width, y: ar.top + a.y / T.GEO.VB_H * ar.height };
      });
      await q.mouse.move(pt.x, pt.y);
      await q.mouse.down();
      await new Promise(s => setTimeout(s, 160));
      await q.mouse.up();
      await new Promise(s => setTimeout(s, 1600));
      const post = await q.evaluate(() => {
        const T = window.CountingCups;
        return { n: T.st.n, mat: T.st.mat.length, total: T.total(T.st) };
      });
      ok(post.mat < pre.mat, `${loc}: the scoop took nothing off the mat`);
      ok(post.n === pre.n, `${loc}: the scoop changed the count`);
      ok(post.total === post.n, `${loc}: conservation broke on production`);
      console.log(`  ${loc}: n=${pre.n} mat ${pre.mat}→${post.mat} readout "${pre.digits}" title "${pre.title.slice(0, 30)}"`);
    }
    await q.close();
  }
  await b.close();
  console.log('\n' + '='.repeat(60));
  console.log(`live-verify: ${PASS} passed, ${FAIL} failed`);
  fails.forEach(f => console.log('  ✗ ' + f));
  console.log('='.repeat(60));
  process.exit(FAIL ? 1 : 0);
})();
