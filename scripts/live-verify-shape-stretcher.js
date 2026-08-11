/* LIVE verification of TOOL #57 on production.
   ⚠⚠ It DRIVES THE APPARATUS BY KEYBOARD AND POINTER. "It mounts" is not
   a result, and a byte-identity check is blind to a stale cache-buster
   because it fetches with a cache-buster of its own. */
'use strict';
const puppeteer = require('puppeteer');
const URL_ = 'https://www.lessoncraftstudio.com/mini-tools/shape-stretcher.html';
let pass = 0; const fails = [];
const ok = (c, m) => { if (c) pass++; else fails.push(m); };
const wait = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  for (const lang of ['en', 'de', 'fi']) {
    const p = await b.newPage();
    await p.setViewport({ width: 768, height: 1000 });
    const errs = []; p.on('pageerror', e => errs.push(String(e)));
    await p.goto(URL_ + '?lang=' + lang, { waitUntil: 'networkidle2', timeout: 60000 });
    await wait(900);
    ok(errs.length === 0, lang + ': page errors — ' + errs.join(' | '));

    /* NON-VACUITY FIRST: the apparatus is actually drawn */
    const pts = await p.$eval('.shp-poly', n => n.getAttribute('points').trim().split(/\s+/).length);
    ok(pts === 3 || pts === 4, lang + ': polygon has ' + pts + ' vertices');
    ok(await p.$$eval('.shp-corner', n => n.length) === pts, lang + ': corner discs ≠ vertices');
    ok(await p.$$eval('.shp-rail', n => n.length) === 3, lang + ': not three rails');

    /* ⭐⭐ THE THEOREM, IN THE FURNITURE: the turn rail carries NO notch,
       and the other two do. This is the tool's whole thesis stated
       before anyone touches it. */
    const notches = await p.$$eval('.shp-track', ts => ts.map(t =>
      ({ cls: t.className, n: t.querySelectorAll('.shp-notch').length })));
    const turn = notches.find(t => /shp-track-turn/.test(t.cls));
    ok(turn && turn.n === 0, lang + ': the TURN rail carries ' + (turn && turn.n) + ' notches — it must carry none');
    ok(notches.filter(t => !/turn/.test(t.cls)).every(t => t.n >= 1),
      lang + ': a form rail carries no notch');

    /* ⭐⭐ TILT ANYTHING AND NOTHING POPS — driven by keyboard, on the
       live page, comparing the rendered tag set before and after. */
    const tagsOf = () => p.$$eval('.shp-tag', n => n.length);
    const before = await tagsOf();
    await p.focus('.shp-track-turn .shp-rail');
    for (let i = 0; i < 12; i++) { await p.keyboard.press('ArrowRight'); }
    await wait(400);
    ok(await tagsOf() === before, lang + ': turning CHANGED the tag set — the theorem is false on production');
    ok(await p.$eval('.shp-track-turn .shp-rail', n => !n.hasAttribute('aria-valuenow')),
      lang + ': the turn rail still exposes a degree numeral on aria-valuenow');

    /* the form rails DO change things */
    await p.focus('.shp-track-skew .shp-rail');
    await p.keyboard.press('Enter');           /* snap to a detent */
    await wait(400);
    const atDetent = await tagsOf();
    ok(atDetent > 0, lang + ': snapping to a detent seated no tag');

    /* ⭐ THE SIMULTANEOUS ARRAY, by button */
    await p.click('.shp-b-keep'); await wait(400);
    ok(await p.$$eval('.shp-kept', n => n.length) === 1, lang + ': keeping did not put a second shape on the pane');
    ok(await p.$eval('.shp-b-drop', n => !n.classList.contains('is-off')),
      lang + ': the kept shape cannot be put away');

    /* nothing on the canvas is a tap target; chrome holds the floor */
    const small = await p.$$eval('.shp-btn, .shp-rail', n =>
      n.filter(x => x.getBoundingClientRect().height < 44).length);
    ok(small === 0, lang + ': ' + small + ' control(s) under the 44px floor');

    /* the locale renders, and no raw key escapes */
    const body = await p.evaluate(() => document.body.innerText);
    ok(!/\b(sayTags(Both|Equal|Right|None)|instruction|lockedBody|sheetHint)\b/.test(body),
      lang + ': a raw string KEY reached the page');
    if (lang !== 'en') ok(!/The Shape Stretcher/.test(body), lang + ': English leaked into ' + lang);

    await p.close();
  }
  await b.close();
  console.log(fails.length ? 'FAIL\n  ' + fails.join('\n  ') : 'PASS ' + pass + ' live assertions, 0 failures');
  process.exit(fails.length ? 1 : 0);
})();
