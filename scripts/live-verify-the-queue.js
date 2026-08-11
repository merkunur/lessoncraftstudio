/* LIVE verification of TOOL #58 on production.
   ⚠⚠ It DRIVES THE APPARATUS BY BUTTON and identifies the landed member
   by its DRAWN FORM, not by an index — so no shared convention between
   the tool and this gate can satisfy it by accident. */
'use strict';
const puppeteer = require('puppeteer');
const URL_ = 'https://www.lessoncraftstudio.com/mini-tools/the-queue.html';
let pass = 0; const fails = [];
const ok = (c, m) => { if (c) pass++; else fails.push(m); };
const wait = ms => new Promise(r => setTimeout(r, ms));

/* the drawn signature of the landed member: circle / rect / 3-point /
   12-point polygon. Reading the SHAPE means the gate never has to agree
   with the tool about what index anything sits at. */
const landedSig = p => p.evaluate(() => {
  const e = document.querySelector('.que-member.is-landed');
  if (!e) return null;
  const t = e.tagName.toLowerCase();
  if (t === 'circle') return 'disc';
  if (t === 'rect') return 'square';
  const n = (e.getAttribute('points') || '').trim().split(/\s+/).length;
  return n === 3 ? 'triangle' : n === 12 ? 'cross' : 'unknown:' + n;
});

(async () => {
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  for (const lang of ['en', 'de', 'fi']) {
    const p = await b.newPage();
    await p.setViewport({ width: 768, height: 950 });
    const errs = []; p.on('pageerror', e => errs.push(String(e)));
    await p.goto(URL_ + '?lang=' + lang, { waitUntil: 'networkidle2', timeout: 60000 });
    await wait(900);
    ok(errs.length === 0, lang + ': page errors — ' + errs.join(' | '));

    /* NON-VACUITY FIRST */
    const n = await p.$$eval('.que-member', e => e.length);
    ok(n >= 3 && n <= 4, lang + ': ' + n + ' members drawn');
    ok(await p.$$eval('.que-btn', e => e.length) >= 6, lang + ': controls missing');

    /* ⭐⭐ NO DEFAULT END — the walker is off the platform until an end
       is chosen, and that absence IS the thesis. */
    /* ⚠ VISIBILITY, NOT EXISTENCE. The walker is a PERSISTENT node that
       is hidden, never removed — removing it is precisely what cancels
       the transition (measured: 1 distinct position when re-inserted,
       19 when left in place). My first version counted elements and
       failed a CORRECT tool in all three locales. */
    ok(await p.$eval('.que-walker', e => getComputedStyle(e).display === 'none'),
      lang + ': the walker is VISIBLE before any end was chosen — the tool has a default end');
    ok(await landedSig(p) === null, lang + ': something is already landed at rest');

    /* ⭐⭐ THE REVERSAL, BY BUTTON, IDENTIFIED BY DRAWN FORM */
    await p.click('.que-b-enda'); await wait(200);
    for (let i = 0; i < 3; i++) { await p.click('.que-b-step'); await wait(340); }
    const fromA = await landedSig(p);
    ok(fromA && !/^unknown/.test(fromA), lang + ': nothing landed counting from one end');
    ok(await p.$eval('.que-walker', e => getComputedStyle(e).display !== 'none'),
      lang + ': the walker is still hidden after stepping');

    await p.click('.que-b-endb'); await wait(200);
    for (let i = 0; i < 3; i++) { await p.click('.que-b-step'); await wait(340); }
    const fromB = await landedSig(p);
    ok(fromB && !/^unknown/.test(fromB), lang + ': nothing landed counting from the other end');

    /* at n=4 the same count from opposite ends CANNOT coincide */
    if (n === 4) ok(fromA !== fromB,
      lang + ': the same count from both ends landed on the SAME form (' + fromA + ') — the thesis is false on production');

    /* §23.2 measured in the DOM: no text anywhere on the apparatus */
    ok(await p.$$eval('.que-svg text, .que-svg tspan', e => e.length) === 0,
      lang + ': the apparatus is printing text');

    /* chrome floor; nothing on the platform is a tap target */
    const small = await p.$$eval('.que-btn', e => e.filter(x => x.getBoundingClientRect().height < 44).length);
    ok(small === 0, lang + ': ' + small + ' control(s) under the 44px floor');

    /* the locale renders and no raw key escapes */
    const body = await p.evaluate(() => document.body.innerText);
    ok(!/\b(sayPickEnd|instruction|lockedBody|ariaPlatform|sheetHint)\b/.test(body),
      lang + ': a raw string KEY reached the page');
    if (lang !== 'en') ok(!/The Queue/.test(body), lang + ': English leaked into ' + lang);

    await p.close();
  }
  await b.close();
  console.log(fails.length ? 'FAIL\n  ' + fails.join('\n  ') : 'PASS ' + pass + ' live assertions, 0 failures');
  process.exit(fails.length ? 1 : 0);
})();
