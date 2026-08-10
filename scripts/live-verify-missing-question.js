/* LIVE verification of TOOL #55 on production.
   ⚠⚠ It DRIVES THE APPARATUS BY BUTTON. "It mounts" is not a result, and
   #54 proved that a byte-identity check is blind to a stale cache-buster
   because it fetches with a cache-buster of its own. So this asserts on
   the RENDERED page the visitor actually gets. */
'use strict';
const puppeteer = require('puppeteer');
const BASE = 'https://www.lessoncraftstudio.com';
const URL_ = BASE + '/mini-tools/missing-question.html';
let pass = 0; const fails = [];
const ok = (c, m) => { if (c) pass++; else fails.push(m); };

(async () => {
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  for (const lang of ['en', 'de', 'fi']) {
    const p = await b.newPage();
    await p.setViewport({ width: 768, height: 900 });
    const errs = [];
    p.on('pageerror', e => errs.push(String(e)));
    await p.goto(URL_ + '?lang=' + lang, { waitUntil: 'networkidle2', timeout: 60000 });
    await new Promise(r => setTimeout(r, 900));

    ok(errs.length === 0, lang + ': page errors — ' + errs.join(' | '));

    /* NON-VACUITY FIRST: the apparatus is actually on the page */
    const marks = await p.$$eval('.mqu-mark', n => n.length);
    ok(marks >= 4, lang + ': only ' + marks + ' marks rendered');
    const total = await p.$eval('.mqu-total', n => n.textContent.trim());
    ok(/^\d+$/.test(total) && +total >= 4, lang + ': total reads "' + total + '"');
    ok(marks === +total, lang + ': ' + marks + ' marks drawn but the total says ' + total);

    /* the tally must REFUSE while nothing is hidden */
    ok(await p.$eval('.mqu-b-tally', n => n.classList.contains('is-off')),
      lang + ': the tally is live with nothing hidden');

    /* ⭐ THE HEADLINE, BY BUTTON: close both shutters, open the tally,
       and require a-1 pairs. One shutter would give exactly one. */
    await p.click('.mqu-b-ledge'); await new Promise(r => setTimeout(r, 250));
    await p.click('.mqu-b-air');   await new Promise(r => setTimeout(r, 250));
    ok(await p.$eval('.mqu-shut-ledge', n => n.classList.contains('is-down')),
      lang + ': the ledge shutter did not come down');
    ok(await p.$eval('.mqu-shut-air', n => n.classList.contains('is-down')),
      lang + ': the air shutter did not come down');
    ok(!(await p.$eval('.mqu-b-tally', n => n.classList.contains('is-off'))),
      lang + ': the tally is still refused with both shutters down');

    await p.click('.mqu-b-tally'); await new Promise(r => setTimeout(r, 350));
    const pairs = await p.$$eval('.mqu-pair', n => n.map(x => x.textContent.trim()));
    ok(pairs.length === +total - 1,
      lang + ': ' + pairs.length + ' pairs for a total of ' + total + ' (want ' + (+total - 1) + ')');
    ok(pairs.every(t => {
      const m = t.split('·').map(s => +s.trim());
      return m.length === 2 && m[0] >= 1 && m[1] >= 1 && m[0] + m[1] === +total;
    }), lang + ': a listed pair does not sum to ' + total + ' — ' + pairs.join(', '));

    /* ⚠ the marks are NOT tap targets; the child taps PLACES. Assert the
       chrome floor on the controls that ARE. */
    const small = await p.$$eval('.mqu-btn', n => n.filter(x => x.getBoundingClientRect().height < 44).length);
    ok(small === 0, lang + ': ' + small + ' control(s) under the 44px floor');

    /* the page renders in its OWN language, not English */
    const title = await p.$eval('.lcs-title, h1, .mqu-wrap', n => n.textContent.trim().slice(0, 60));
    ok(title.length > 3, lang + ': no title rendered');
    if (lang !== 'en') ok(!/The Missing Question/.test(title), lang + ': English leaked — "' + title + '"');
    ok(!/\b(title|instruction|tallyMany|shutLedge)\b/.test(await p.evaluate(() => document.body.innerText)),
      lang + ': a raw string KEY reached the page');

    /* opening the last shutter must put the tally away with it */
    await p.click('.mqu-b-ledge'); await new Promise(r => setTimeout(r, 200));
    await p.click('.mqu-b-air');   await new Promise(r => setTimeout(r, 300));
    ok(await p.$$eval('.mqu-pair', n => n.length === 0),
      lang + ': the tally survived the last shutter opening');

    await p.close();
  }
  await b.close();
  console.log(fails.length ? 'FAIL\n  ' + fails.join('\n  ') : 'PASS ' + pass + ' live assertions, 0 failures');
  process.exit(fails.length ? 1 : 0);
})();
