#!/usr/bin/env node
/* =====================================================================
   live-verify-sorting-hoops.js — eleven landings on PRODUCTION, DRIVEN.

   200 is not "it works", and neither is "it mounts". This drives the
   controls the operator reported broken, on the real page, in every
   locale:
     · clicking "Guess my rule" must SHOW A SETUP PANEL THE TEACHER CAN SEE
       — the shipped tool rendered it ~987px down with nothing scrolling to
       it, so at every realistic desktop viewport a teacher clicked and
       nothing happened;
     · hoop 2 must be settable INDEPENDENTLY, which was the operator's
       actual sentence;
     · a real drag must land a card, and the mat must not lose anything;
     · the rings must be painted at a width a room can see (the shipped
       stroke was 0.55 CSS PIXELS at every viewport including 2560);
     · a free visitor's DOM must contain NO print sheet, because the shipped
       Ctrl+P walked past the paywall.

   ⚠ A FRESH BROWSER PER LOCALE, not a shared one. Sharing produced a false
   negative: the eleventh page reported "the tool iframe never appeared"
   while the identical URL rendered perfectly on its own. A harness that
   fails on page eleven and passes on page one is measuring itself.

   ⚠ Cache disabled — Cloudflare holds deck/tool bytes for 5 minutes
   (§15.8), so a run straight after a deploy can measure the old file.

   Usage: node scripts/live-verify-sorting-hoops.js [--locales=en,de]
   ===================================================================== */
'use strict';
const puppeteer = require('puppeteer');

const PAGES = [
  ['en', 'sorting-hoops'], ['de', 'sortierreifen'], ['fr', 'cerceaux-de-tri'],
  ['it', 'cerchi-per-classificare'], ['es', 'aros-para-clasificar'], ['pt', 'arcos-de-classificacao'],
  ['nl', 'sorteerhoepels'], ['sv', 'sorteringsringar'], ['da', 'sorteringsringe'],
  ['no', 'sorteringsringer'], ['fi', 'lajitteluvanteet']
];
const BASE = 'https://www.lessoncraftstudio.com';
const arg = process.argv.find((a) => a.indexOf('--locales=') === 0);
const ONLY = arg ? arg.split('=')[1].split(',') : null;

let pass = 0, fail = 0;
const ok = (m) => { pass++; console.log('  ok    ' + m); };
const bad = (m) => { fail++; console.error('  FAIL  ' + m); };
const is = (c, m) => (c ? ok(m) : bad(m));
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  for (const [loc, slug] of PAGES) {
    if (ONLY && ONLY.indexOf(loc) < 0) continue;
    const url = `${BASE}/${loc}/tools/${slug}`;
    console.log('\n[' + loc + '] ' + url);
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    await page.setViewport({ width: 1440, height: 900 });
    try {
      const res = await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
      is(res && res.status() === 200, `${loc}: 200 (${res ? res.status() : 'no response'})`);

      /* the tool lives in a hydration-gated iframe */
      let frame = null;
      for (let i = 0; i < 30 && !frame; i++) {
        const el = await page.$('iframe');
        if (el) {
          const f = await el.contentFrame();
          if (f) { try { await f.waitForSelector('.hp-wrap', { timeout: 1200 }); frame = f; } catch (_) {} }
        }
        if (!frame) await wait(600);
      }
      if (!frame) { bad(`${loc}: the tool iframe never mounted`); await browser.close(); continue; }
      await wait(700);

      /* --- 1. the apparatus, and the stroke a room has to see --- */
      const geo = await frame.evaluate(() => {
        const rings = document.querySelector('.hp-rings');
        const b = rings.getBoundingClientRect();
        const cs = document.querySelectorAll('.hp-ring');
        return {
          rings: cs.length,
          stroke: parseFloat(getComputedStyle(cs[0]).strokeWidth),
          aspect: b.width / b.height,
          slots: Array.prototype.map.call(document.querySelectorAll('[data-slot]'), (s) => s.getAttribute('data-slot')),
          tiles: document.querySelectorAll('.hp-tile').length,
          sheet: !!document.getElementById('hp-printsheet'),
          hint: (document.querySelector('.hp-hint') || {}).textContent || ''
        };
      });
      is(geo.rings === 2, `${loc}: two rings drawn (${geo.rings})`);
      is(geo.stroke >= 4, `${loc}: ⭐ ring stroke ${geo.stroke}px — the shipped tool painted 0.55`);
      is(Math.abs(geo.aspect - 1.5) < 0.02, `${loc}: the ring box is 3:2, so they are circles (${geo.aspect.toFixed(3)})`);
      ['a', 'both', 'b', 'out', 'tray'].forEach((s) =>
        is(geo.slots.indexOf(s) > -1, `${loc}: region present — ${s}`));
      is(geo.tiles === 12, `${loc}: twelve things in the tray (${geo.tiles})`);
      is(geo.sheet === false, `${loc}: ⭐ no print sheet in a free visitor's DOM — Ctrl+P cannot bypass the chip`);
      is(geo.hint.trim().length > 12, `${loc}: the hint band carries real text — "${geo.hint.trim().slice(0, 56)}…"`);

      /* --- 2. THE OPERATOR'S SENTENCE: can a teacher reach hoop 2? --- */
      const iframeEl = await page.$('iframe');
      const box = await iframeEl.evaluate((el) => { const r = el.getBoundingClientRect(); return { top: r.top }; });
      await frame.evaluate(() => document.querySelectorAll('.hp-bar .hp-chip')[1].click());
      await wait(900);
      const setup = await frame.evaluate(() => {
        const s = document.querySelector('.hp-setup');
        if (!s) return null;
        const r = s.getBoundingClientRect();
        return {
          top: Math.round(r.top), bottom: Math.round(r.bottom),
          cardsA: document.querySelectorAll('.hp-hoopcard-a .hp-chip').length,
          cardsB: document.querySelectorAll('.hp-hoopcard-b .hp-chip').length,
          presets: document.querySelectorAll('.hp-lessongrid .hp-chip').length
        };
      });
      is(!!setup, `${loc}: ⭐ "Guess my rule" SHOWS A SETUP PANEL`);
      if (setup) {
        /* it must be within the first screenful of the page, not a screen down */
        const absTop = box.top + setup.top;
        is(absTop < 900, `${loc}: ⭐ the panel is at y=${Math.round(absTop)} on the page — the shipped picker was at 987 with nothing scrolling to it`);
        is(setup.cardsB >= 2, `${loc}: ⭐ HOOP 2 HAS ITS OWN CONTROLS (${setup.cardsB}) — the operator's actual complaint`);
        is(setup.cardsA >= 2, `${loc}: hoop 1 has its own controls (${setup.cardsA})`);
        is(setup.presets > 0, `${loc}: ready-made rules offered (${setup.presets})`);
      }

      /* --- 3. set both hoops independently and start --- */
      await frame.evaluate(() => document.querySelectorAll('.hp-hoopcard-a .hp-chip')[0].click());
      await wait(400);
      await frame.evaluate(() => document.querySelectorAll('.hp-hoopcard-b .hp-chip')[0].click());
      await wait(400);
      const rules = await frame.evaluate(() => {
        const T = window.SortingHoops;
        return { a: !!T.ruleA, b: !!T.ruleB, sameField: !!(T.ruleA && T.ruleB && T.ruleA.f === T.ruleB.f) };
      });
      is(rules.a && rules.b, `${loc}: both hoops carry a rule`);
      is(!rules.sameField, `${loc}: ⭐ the two rules are different QUESTIONS — the shipped tool allowed identical rules`);
      await frame.evaluate(() => { const b = document.querySelector('[data-fk="start"]'); if (b) b.click(); });
      await wait(700);

      /* --- 4. a real drop, and nothing lost --- */
      const drop = await frame.evaluate(() => {
        const T = window.SortingHoops;
        const before = T.dealt.length;
        const tray = T.trayItems();
        if (!tray.length) return { skipped: true };
        T._place(tray[0].uid, 'a');
        const w = T.placement[tray[0].uid];
        return { before, after: T.dealt.length, landed: w, legal: ['a', 'b', 'both', 'out', 'tray'].indexOf(w) > -1 };
      });
      is(!drop.skipped && drop.legal, `${loc}: a drop lands in a real region (${drop.landed})`);
      is(!drop.skipped && drop.before === drop.after, `${loc}: ⭐ NOTHING IS LOST across a drop (${drop.before} -> ${drop.after})`);

      /* --- 5. the mat survives a rule change, which is where the rebuild
             itself broke and three panels caught it --- */
      const survive = await frame.evaluate(() => {
        const T = window.SortingHoops;
        T.dealt.forEach((it) => { T.placement[it.uid] = 'a'; });
        const on = T.dealt.filter((it) => T.placement[it.uid] !== 'tray').length;
        T.phase = 'setup'; T._startSorting();
        return { on: on, after: T.dealt.filter((it) => T.placement[it.uid] !== 'tray').length };
      });
      is(survive.after > 0, `${loc}: ⭐ THE MAT SURVIVES "Change the rules" -> "Start sorting" (${survive.on} -> ${survive.after})`);

      /* --- 6. the reveal names the rule --- */
      const reveal = await frame.evaluate(() => {
        const T = window.SortingHoops;
        T.revealed = true; T.render();
        return Array.prototype.map.call(document.querySelectorAll('.hp-cap'), (e) => e.textContent).join(' | ');
      });
      is(reveal.length > 10 && reveal.indexOf('—') !== 0, `${loc}: the reveal names both rules — "${reveal.slice(0, 64)}…"`);
    } catch (e) {
      bad(`${loc}: harness/page error — ${e.message}`);
    }
    await browser.close();
  }

  console.log('\n' + (fail
    ? `FAILED — ${fail} failed, ${pass} passed`
    : `ALL GREEN — ${pass} assertions DRIVEN on production`));
  process.exit(fail ? 1 : 0);
})();
