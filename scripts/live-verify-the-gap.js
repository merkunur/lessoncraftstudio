/* LIVE verification of TOOL #56 on production.
   ⚠⚠ It DRIVES THE APPARATUS BY BUTTON. "It mounts" is not a result, and a
   byte-identity check is blind to a stale cache-buster because it fetches
   with a cache-buster of its own — #54 shipped four times into a cached
   ?v=1 while that assertion reported clean. */
'use strict';
const puppeteer = require('puppeteer');
const URL_ = 'https://www.lessoncraftstudio.com/mini-tools/the-gap.html';
let pass = 0; const fails = [];
const ok = (c, m) => { if (c) pass++; else fails.push(m); };
const wait = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  for (const lang of ['en', 'de', 'fi']) {
    const p = await b.newPage();
    await p.setViewport({ width: 768, height: 950 });
    const errs = []; p.on('pageerror', e => errs.push(String(e)));
    await p.goto(URL_ + '?lang=' + lang, { waitUntil: 'networkidle2', timeout: 60000 });
    await wait(900);
    ok(errs.length === 0, lang + ': page errors — ' + errs.join(' | '));

    /* NON-VACUITY FIRST — the apparatus is actually drawn */
    const n = await p.$$eval('.crt-mark', e => e.length);
    ok(n >= 3, lang + ': only ' + n + ' marks at rest');
    ok(n <= 16, lang + ': ' + n + ' marks exceeds CAP');

    /* the marks rest ON the ground, not under it */
    const geo = await p.evaluate(() => {
      const m = [].slice.call(document.querySelectorAll('.crt-mark'));
      const g = document.querySelector('.crt-ground').getBoundingClientRect();
      return { low: Math.max.apply(null, m.map(x => x.getBoundingClientRect().bottom)), gTop: g.top };
    });
    ok(geo.low <= geo.gTop + 2, lang + ': marks hang BELOW the ground');

    /* ⭐⭐ THE HEADLINE, BY BUTTON. During the gap the marks must not
       merely be hidden — they must NOT EXIST. */
    await p.click('.crt-b-run');
    await wait(320);
    const during = await p.$$eval('.crt-mark', e => e.length);
    ok(during === 0, lang + ': ' + during + ' marks still in the DOM during the gap');
    const groundLbl = await p.$eval('.crt-ground', e => e.getAttribute('aria-label') || '');
    ok(groundLbl === '', lang + ': the direction leaked before the pulse — "' + groundLbl + '"');

    await wait(1400);   /* past T_FALL + T_PULSE */
    const after = await p.$$eval('.crt-mark', e => e.length);
    ok(after >= 1 && after <= 16, lang + ': ' + after + ' marks after the gap');
    ok(after !== n, lang + ': the count did not change across the gap (' + n + ' → ' + after + ')');
    const dir = await p.$eval('.crt-ground', e => e.getAttribute('aria-label') || '');
    ok(dir.length > 3, lang + ': no direction announced after the pulse');

    /* the rail exists only once there is a question, and every key is
       a real magnitude the model will accept */
    const rail = await p.$$eval('.crt-k', e => e.map(x => +x.textContent.trim()));
    ok(rail.length >= 2, lang + ': rail has ' + rail.length + ' keys');
    ok(rail.every(k => k >= 2), lang + ': rail offers a magnitude below KMIN — ' + rail.join(','));

    /* a theory lands, and both counts are drawn the same way */
    await p.click('.crt-k'); await wait(320);
    const nums = await p.$$eval('.crt-num', e => e.map(x => x.textContent.trim()));
    ok(nums.length === 3, lang + ': ' + nums.length + ' numerals after a try (want 3)');
    ok(nums.every(t => /^\d+$/.test(t)), lang + ': a numeral is not a number — ' + nums.join(','));

    /* nothing may encode correctness */
    const colours = await p.$$eval('.crt-num', e => e.map(x => getComputedStyle(x).color));
    ok(new Set(colours).size === 1, lang + ': the numerals differ in COLOUR — ' + colours.join(' | '));

    /* chrome floor, and the locale actually renders */
    const small = await p.$$eval('.crt-btn, .crt-k', e => e.filter(x => x.getBoundingClientRect().height < 44).length);
    ok(small === 0, lang + ': ' + small + ' control(s) under the 44px floor');
    const body = await p.evaluate(() => document.body.innerText);
    ok(!/\b(instruction|sheetTitle|lockedBody|ariaGap|saidMidRun)\b/.test(body), lang + ': a raw string KEY reached the page');
    if (lang !== 'en') ok(!/The Gap/.test(body), lang + ': English leaked into ' + lang);

    await p.close();
  }
  await b.close();
  console.log(fails.length ? 'FAIL\n  ' + fails.join('\n  ') : 'PASS ' + pass + ' live assertions, 0 failures');
  process.exit(fails.length ? 1 : 0);
})();
