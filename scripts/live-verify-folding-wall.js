/* =====================================================================
   live-verify-folding-wall.js — TOOL #47 on PRODUCTION, 11 locales.
   Run:  node scripts/live-verify-folding-wall.js

   ⚠⚠ IT IS ALSO THE DEPLOYED-BYTES CHECK. #45 passed 108 assertions
   against a STALE DEPLOY, because every assertion tested the model and
   the model was identical in the broken build. So the structural
   assertions here are chosen to be true ONLY of this build:

     · the four family buttons report `aria-pressed="true"` while the
       shelf is stacked — the inversion four native panels found;
     · the print chip carries `printLocked`, not `printBtn`, for a
       visitor who has not paid — the one dishonest refusal in the tool;
     · pressing a DOUBLED card announces that it holds two, instead of
       "nowhere else on the shelf";
     · `documentElement` carries `tsh-scroll`, the escape that made the
       ledge reachable on a phone.

   A stale build fails every one of them.
   ===================================================================== */
'use strict';
const puppeteer = require('puppeteer');

const BASE = 'https://www.lessoncraftstudio.com/mini-tools/folding-wall.html';
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) { PASS++; } else { FAIL++; console.error('  FAIL ' + m); } };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  for (const loc of LOCALES) {
    const p = await b.newPage();
    const errs = [];
    p.on('pageerror', (e) => errs.push(String(e)));
    await p.setViewport({ width: 1024, height: 900 });
    let ok200 = true;
    try {
      const resp = await p.goto(`${BASE}?lang=${loc}`, { waitUntil: 'load', timeout: 45000 });
      ok200 = !!resp && resp.status() === 200;
    } catch (e) { ok200 = false; }
    is(ok200, `[${loc}] the page serves 200`);
    if (!ok200) { await p.close(); continue; }

    let mounted = true;
    try { await p.waitForSelector('.tsh-wrap', { timeout: 20000 }); } catch (e) { mounted = false; }
    is(mounted, `[${loc}] the tool mounts`);
    if (!mounted) { await p.close(); continue; }
    await wait(400);

    /* ---- the deployed-bytes markers ------------------------------- */
    const marks = await p.evaluate(() => ({
      scrollEscape: document.documentElement.classList.contains('tsh-scroll'),
      printLabel: (document.querySelector('.tsh-b-print') || {}).getAttribute
        ? document.querySelector('.tsh-b-print').getAttribute('aria-label') : '',
      keys: Object.keys(window.FoldingWall.strings).length,
      hasDouble: !!window.FoldingWall.strings.saidCardDouble,
      hasLocked: !!window.FoldingWall.strings.printLocked,
      cards: document.querySelectorAll('.tsh-card').length
    }));
    is(marks.scrollEscape, `[${loc}] documentElement carries the scroll escape`);
    is(marks.keys === 38, `[${loc}] 38 authored keys are live — got ${marks.keys}`);
    is(marks.hasDouble && marks.hasLocked, `[${loc}] the two new keys shipped`);
    is(marks.cards === 100, `[${loc}] opens on the full hundred — got ${marks.cards}`);
    /* ⭐ A FREE VISITOR MUST BE TOLD THE CHIP DOES NOT PRINT. The old
       build labelled it "Print the study list" in every entitlement
       state while the handler opened a paywall — the one dishonest
       refusal in the tool, found by six of the eleven panels. An
       anonymous visitor on production is free-tier, so the label must
       be this locale's `printLocked`, never its `printBtn`. */
    const want = await p.evaluate((l) => ({
      locked: window.FoldingWall.strings.printLocked[l],
      open: window.FoldingWall.strings.printBtn[l]
    }), loc);
    is(marks.printLabel === want.locked,
      `[${loc}] ⭐ the print chip states its own refusal — got "${marks.printLabel}"`);
    is(marks.printLabel !== want.open,
      `[${loc}] ...and never the unconditional promise`);

    /* ---- drive it: a family toggle, then the stack ---------------- */
    const drive = async (sel, nth) => {
      const box = await p.evaluate((sel, nth) => {
        const n = document.querySelectorAll(sel)[nth];
        if (!n || n.disabled) return null;
        const r = n.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      }, sel, nth);
      if (!box) return false;
      await p.mouse.click(box.x, box.y);
      await wait(750);
      return true;
    };

    is(await drive('.tsh-b-fam', 0), `[${loc}] the first family chip is live`);
    const after1 = await p.evaluate(() => window.FoldingWall.cards(window.FoldingWall.st).length);
    is(after1 === 81, `[${loc}] the cross took 19 — ${after1} left`);

    for (const i of [1, 2, 3]) await drive('.tsh-b-fam', i);
    const res = await p.evaluate(() => ({
      cards: window.FoldingWall.cards(window.FoldingWall.st).length,
      live: window.FoldingWall.live(window.FoldingWall.st).join(',')
    }));
    is(res.cards === 36 && res.live === '3,4,6,7,8,9', `[${loc}] residue 36 on {3,4,6,7,8,9} — ${res.cards} / ${res.live}`);

    is(await drive('.tsh-b-stack', 0), `[${loc}] the stack chip went live`);
    const stacked = await p.evaluate(() => ({
      cards: document.querySelectorAll('.tsh-card').length,
      seconds: document.querySelectorAll('.tsh-second').length,
      seats: document.querySelectorAll('.tsh-seat').length,
      /* ⭐ THE MARKER THAT CANNOT BE TRUE OF THE OLD BUILD */
      pressed: Array.prototype.map.call(document.querySelectorAll('.tsh-b-fam'),
        (n) => n.getAttribute('aria-pressed')).join(','),
      double: window.FoldingWall._lookText({ kind: 'card', r: 3, c: 7, p: 21, key: 'k3_7' })
    }));
    is(stacked.cards === 21, `[${loc}] ⭐ TWENTY-ONE cards — got ${stacked.cards}`);
    is(stacked.seconds === 15, `[${loc}] fifteen cards visibly hold two — got ${stacked.seconds}`);
    is(stacked.seats === 15, `[${loc}] fifteen empty seats — got ${stacked.seats}`);
    is(stacked.pressed === 'true,true,true,true',
      `[${loc}] ⭐ the four families report themselves AWAY while stacked — got ${stacked.pressed}`);
    is(!!stacked.double && stacked.double.length > 10,
      `[${loc}] ⭐ a doubled card announces that it holds two — "${String(stacked.double).slice(0, 60)}"`);

    is(errs.length === 0, `[${loc}] no console errors — ${errs.join(' | ')}`);
    console.log(`  ${loc}: ok`);
    await p.close();
  }

  await b.close();
  console.log(`\nlive-verify-folding-wall: ${PASS} passed, ${FAIL} failed`);
  process.exit(FAIL ? 1 : 0);
})();
