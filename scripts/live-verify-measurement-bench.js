#!/usr/bin/env node
/* =====================================================================
   live-verify-measurement-bench.js — drive the bench ON PRODUCTION.

   ⭐ NOT "it mounts". The two defects the operator reported were a pour
   that tipped away from its target and a capacity bench with no next
   problem — both of which a mount check passes with flying colours. This
   presses the real controls on the real page and measures what happens.

   ⚠ AND IT GOES THROUGH /[locale]/tools/, NOT THE .html. Every QA render
   this tool ever had was taken against measurement-bench.html directly,
   which is precisely why nobody saw that the production iframe pinned it
   to 422px at every desktop width. The wrapper page IS the surface.

   Run:  node scripts/live-verify-measurement-bench.js
         node scripts/live-verify-measurement-bench.js --locales=en,de
   ===================================================================== */
'use strict';
const puppeteer = require('puppeteer');

const BASE = 'https://www.lessoncraftstudio.com';
const SLUGS = {
  en: 'measurement-bench', de: 'messwerkstatt', es: 'taller-de-medir',
  fr: 'atelier-des-mesures', it: 'banco-delle-misure', pt: 'bancada-de-medidas',
  nl: 'meetwerkbank', sv: 'matbanken', da: 'maalebaenken', no: 'malebenken',
  fi: 'mittauspaja'
};
const ALL = Object.keys(SLUGS);
const arg = process.argv.find((a) => a.startsWith('--locales='));
const LOCALES = arg ? arg.split('=')[1].split(',').filter((l) => ALL.includes(l)) : ALL;

let PASS = 0, FAIL = 0;
const ok = (m, cond, extra) => {
  if (cond) { PASS++; console.log('  ok    ' + m); }
  else { FAIL++; console.log('  FAIL  ' + m + (extra !== undefined ? ' — ' + extra : '')); }
};

(async () => {
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  for (const loc of LOCALES) {
    const url = `${BASE}/${loc}/tools/${SLUGS[loc]}`;
    console.log('\n[' + loc + '] ' + url);
    const page = await b.newPage();
    const errs = [];
    page.on('pageerror', (e) => errs.push(String(e.message)));
    await page.setViewport({ width: 1440, height: 900 });
    const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    ok('page 200', resp && resp.status() === 200, resp && resp.status());

    /* the tool lives in an iframe on the wrapper page */
    await new Promise((r) => setTimeout(r, 6000));
    /* ⚠ MATCH THE /mini-tools/ FRAME, NOT JUST THE NAME. The WRAPPER page is
       also at /<loc>/tools/measurement-bench, so a bare name filter returns the
       PARENT first and every assertion below then runs against the Next.js
       document — which reported 'the bench did not mount' about a bench that
       had mounted perfectly. A wrong measurement agreeing with a wrong
       measurement. */
    const frames = page.frames().filter((f) => f.url().indexOf('/mini-tools/measurement-bench.html') >= 0);
    ok('the tool iframe is present', frames.length > 0, page.frames().map((f) => f.url()).join(' '));
    if (!frames.length) { await page.close(); continue; }
    const fr = frames[0];

    /* ⭐ THE FRAME HEIGHT — the 422px fixed point this rebuild removed */
    const box = await (await page.$('iframe[src*="measurement-bench"]')).boundingBox();
    ok('iframe taller than the 422px fixed point (' + Math.round(box.height) + 'px)', box.height > 500, Math.round(box.height));

    const mounted = await fr.evaluate(() => !!(window.MeasurementBench && document.querySelector('.mb-stage')));
    ok('the bench mounted', mounted);
    if (!mounted) { await page.close(); continue; }

    /* the stage actually grew past design size on a projector-width board */
    const scale = await fr.evaluate(() => {
      const w = document.querySelector('.mb-wrap');
      return parseFloat(getComputedStyle(w).getPropertyValue('--mb-s')) || 0;
    });
    const iw = Math.round(box.width);
    ok('the stage is drawn at ' + scale.toFixed(2) + 'x inside a ' + iw + 'px frame', scale * 660 > iw * 0.7, 'scale ' + scale.toFixed(3) + ' frame ' + iw);

    /* ⭐ THE POUR, DRIVEN — the operator's second defect.
       Force the premium bench, then press and hold the jug for real. */
    const poured = await fr.evaluate(async () => {
      const T = window.MeasurementBench;
      T.premium = true; T.bench = 'capacity'; T.render();
      await new Promise((r) => setTimeout(r, 300));
      const jug = document.querySelector('.mb-vessel[data-vessel="jug"]');
      if (!jug) return { err: 'no jug' };
      const r = jug.getBoundingClientRect();
      const opts = { bubbles: true, cancelable: true, isPrimary: true, button: 0, pointerId: 1,
        pointerType: 'mouse', clientX: r.left + r.width / 2, clientY: r.top + r.height / 2 };
      jug.dispatchEvent(new PointerEvent('pointerdown', opts));
      await new Promise((res) => setTimeout(res, 900));
      const body = jug.querySelector('.mb-vbody');
      const m = new DOMMatrixReadOnly(getComputedStyle(body).transform);
      const deg = Math.atan2(m.b, m.a) * 180 / Math.PI;
      const stream = !!document.querySelector('.mb-stream');
      const tall = T.levels.tall;
      jug.dispatchEvent(new PointerEvent('pointerup', opts));
      await new Promise((res) => setTimeout(res, 300));
      const jugC = T.VESSELS.jug.x + T.VESSELS.jug.w / 2;
      const tgtC = T.VESSELS[T.capTarget].x + T.VESSELS[T.capTarget].w / 2;
      return { deg: +deg.toFixed(2), stream, tall, targetIsRight: tgtC > jugC,
        total: T.levels.jug + T.levels.tall + T.levels.wide, start: T.VESSELS.jug.start,
        whole: Math.abs(T.levels.tall - Math.round(T.levels.tall)) < 1e-6 };
    });
    ok('holding the jug pours (' + (poured.tall || 0).toFixed(2) + ' cups)', poured.tall > 0.5, JSON.stringify(poured));
    ok('the jug TIPS TOWARD its target', poured.targetIsRight ? poured.deg > 2 : poured.deg < -2, poured.deg + 'deg, target right=' + poured.targetIsRight);
    ok('a falling stream is drawn', poured.stream === true);
    ok('the water is conserved', Math.abs(poured.total - poured.start) < 0.01, poured.total + ' vs ' + poured.start);
    ok('a cup lands WHOLE on release', poured.whole === true, poured.tall);

    /* ⭐ THE NEXT PROBLEM — the operator's first defect. */
    const nextp = await fr.evaluate(async () => {
      const T = window.MeasurementBench;
      const before = { pair: T.capPair, tall: T.VESSELS.tall.cap, wide: T.VESSELS.wide.cap };
      const chips = [...document.querySelectorAll('.mb-chip')];
      const chip = chips.find((c) => typeof T._nextPair === 'function' &&
        c.textContent.trim() === (T.api ? T.api.t('anotherPair') : ''));
      if (!chip) return { err: 'no next-pair chip', chips: chips.map((c) => c.textContent.trim()) };
      chip.click();
      await new Promise((r) => setTimeout(r, 400));
      return { before, after: { pair: T.capPair, tall: T.VESSELS.tall.cap, wide: T.VESSELS.wide.cap },
        pairs: T.CAP_PAIRS.length, refilled: T.levels.jug === T.VESSELS.jug.start,
        fillable: T.VESSELS.jug.start >= T.VESSELS.tall.cap + T.VESSELS.wide.cap };
    });
    ok('the capacity bench has a NEXT-PROBLEM control', !nextp.err, JSON.stringify(nextp.chips || ''));
    if (!nextp.err) {
      ok('pressing it advances to a different pair', nextp.before.pair !== nextp.after.pair,
        JSON.stringify(nextp.before) + ' -> ' + JSON.stringify(nextp.after));
      ok('there are ' + nextp.pairs + ' authored pairs, not 1', nextp.pairs >= 4, nextp.pairs);
      ok('the jug is refilled for the new pair', nextp.refilled === true);
      ok('BOTH beakers can be filled from one jug', nextp.fillable === true);
    }

    /* the prediction is not live over a revealed answer */
    const pred = await fr.evaluate(async () => {
      const T = window.MeasurementBench;
      T.bench = 'weight'; T.premium = true; T.render();
      await new Promise((r) => setTimeout(r, 250));
      const key = T.WEIGHT_KEYS[T.wtIdx % T.WEIGHT_KEYS.length];
      T._afterMeasure(T.WEIGHTS[key], 'weight', key);
      T.render();
      await new Promise((r) => setTimeout(r, 250));
      return { stepper: !!document.querySelector('.mb-est-btn'), compared: !!document.querySelector('.mb-est.compared') };
    });
    ok('no live stepper once an answer is on screen', pred.stepper === false);
    ok('the comparison is shown instead', pred.compared === true);

    ok('no js errors', errs.length === 0, errs[0]);
    await page.close();
  }

  await b.close();
  console.log('\n' + PASS + ' passed, ' + FAIL + ' failed on production (' + LOCALES.length + ' locales)');
  if (FAIL) process.exit(1);
  console.log('live-verify-measurement-bench: ALL GREEN ON PRODUCTION');
})();
