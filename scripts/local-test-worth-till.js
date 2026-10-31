#!/usr/bin/env node
/* =====================================================================
   local-test-worth-till.js — ACTIVITY #164, The Worth Till ("Pip's Market
   Stall", 2.MD.C.8), in a real browser with real drags and taps, in all
   11 locales (8 currency families). Plumbing: scripts/lib/activity-harness.js.
   Scenarios per locale (1024):
     · level 1 (all kinds): Check → hintSortFirst; a real DRAG into a wrong
       cup bounces the coin back; a second bounce of the same coin turns its
       ghost on; every coin sorted by real tap-coin-then-tap-cup and real
       drags; the empty counter steps aside; Check → hintDial; the dial set
       one short by real taps → hintCount and the parade without numbers;
       Check again → hintAgain; another wrong total → the parade with running
       totals, the last one "?"; the right total → success line, Next 0.5 s;
       a tapped cup lifts its top coin back (before success);
     · level 2 fewest: a longer way → hintFewer; out again, the fewest way →
       success · trade: the offered coin's cup is lidded;
     · level 3 change: tapped cups give coins to the tray, the right change
       → success · enough: the wrong button → hintEnough, the right → success
       · which purse: the losing purse → hintPurse, the other → success;
     · the coin key on/off; the keyboard (Enter on a coin, Enter on a cup).
   Then each state reached ONCE per locale and resized through 320…1366.
   Usage: node scripts/local-test-worth-till.js [--locales=…] [--widths=…]
   ===================================================================== */
'use strict';
const H = require('./lib/activity-harness');
const C = require('../mini tools/worth-till-core.js');
const LOCS = H.arg('locales', H.LOCALES.join(',')).split(',');
const WIDTHS = H.arg('widths', H.WIDTHS.join(',')).split(',').map(Number);
const { T } = H.strings('worth-till-activity.js', 'WorthTillActivity', { WorthTillCore: C });
const G = 'WorthTillActivity', sp = H.sp;
const desc = (a) => a.slice().sort((x, y) => y - x);

(async () => {
  const L = await H.local({ html: 'worth-till-activity.html', id: 'coin-stall.money.2-md-c-8', global: G, ready: '.wt-wrap' });
  const { is } = L.C;
  const S = (page) => page.evaluate((g) => JSON.parse(JSON.stringify(window[g].st)), G);
  const go = async (page, level, k, key, side) => { await page.evaluate((g, level, k, key, side) => { const a = window[g]; a.api.settings.level = level; a.api.settings.key = key || 'on'; a._pool = null; a._ensurePool(); a._start(k); if (side != null) a.st.side = side; a._render2(); }, G, level, k, key, side); await H.wait(40); };
  const note = (page) => page.evaluate(() => document.querySelector('[data-qa="note"]').textContent);
  const count = (page, sel) => page.evaluate((s) => document.querySelectorAll(s).length, sel);
  const looseId = async (page, v) => (await S(page)).coins.find((c) => c.v === v && (c.at === 'counter' || c.at === 'purse')).id;
  const tapPay = async (page, v) => { const id = await looseId(page, v); await L.click(page, 'coin-' + id, 'coin ' + v); await L.click(page, 'cup-' + v, 'cup ' + v); };
  const drag = async (page, id, cup) => {
    const p = await page.evaluate((id, cup) => {
      const a = document.querySelector('[data-k="coin-' + id + '"]'), b = document.querySelector('[data-k="cup-' + cup + '"]');
      a.scrollIntoView({ block: 'center' }); const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
      return { x0: ra.left + ra.width / 2, y0: ra.top + ra.height / 2, x1: rb.left + rb.width / 2, y1: rb.top + rb.height / 2 };
    }, id, cup);
    await page.mouse.move(p.x0, p.y0); await page.mouse.down(); await page.mouse.move((p.x0 + p.x1) / 2, (p.y0 + p.y1) / 2, { steps: 6 }); await page.mouse.move(p.x1, p.y1, { steps: 6 }); await page.mouse.up(); await H.wait(60);
  };
  const spinTo = async (page, n) => { for (const w of ['t', 'o']) { const want = w === 't' ? Math.floor(n / 10) : n % 10; let have = (await S(page)).dial[w]; while (have !== want) { await L.click(page, 'up-' + w, 'dial ' + w); have = (await S(page)).dial[w]; } } };
  /* the success / hint line as the activity builds it */
  const line = (page, key) => page.evaluate((g, key) => { const a = window[g]; return a._t(key, a._args()); }, G, key);

  for (const loc of LOCS) {
    const tag = '[' + loc + ']', fam = C.famOf(loc);
    const { page, errs } = await L.open(1024, loc);
    await page.waitForFunction((g) => window[g]._picsReady, { timeout: 15000 }, G);
    /* ---- level 1, all kinds (R6) ---- */
    await go(page, '1', 5);
    let s = await S(page), r = s.round;
    await L.click(page, 'check', 'check');
    is(sp(await note(page)) === sp(T(loc, 'hintSortFirst')) && (await S(page)).misses === 0, tag + ' Check with coins on the counter → hintSortFirst, no miss');
    const cupsD = C.cups(fam), big = desc(r.coins)[0], wrongCup = cupsD.find((v) => v !== big);
    const id0 = await looseId(page, big);
    await drag(page, id0, wrongCup); await H.wait(500); s = await S(page);
    is(s.coins.find((c) => c.id === id0).at === 'counter' && s.bounces[id0] === 1, tag + ' a real drag of the ' + big + ' into the ' + wrongCup + ' cup bounces back');
    await drag(page, id0, wrongCup); await H.wait(500);
    is((await S(page)).bounces[id0] === 2, tag + ' a second bounce of the same coin is counted');
    is(await page.evaluate(() => { const cs = [...document.querySelectorAll('.wt-coin')]; return cs.length > 0 && cs.every((c) => { const n = c.querySelector('.wt-coinnum'); return n && !n.classList.contains('is-ghost') && n.textContent.trim() !== ''; }); }), tag + ' every coin shows its worth numeral, the US coins too (operator ruling)');
    await drag(page, id0, big);
    is((await S(page)).coins.find((c) => c.id === id0).at === 'till', tag + ' a real drag into its own cup: in');
    for (const c of (await S(page)).coins.filter((x) => x.at === 'counter')) await tapPay(page, c.v);
    s = await S(page);
    is(s.coins.every((c) => c.at === 'till') && await count(page, '.wt-counter[style*="none"]') === 1, tag + ' every coin sorted by real taps; the empty counter steps aside');
    is((await page.evaluate(() => [...document.querySelectorAll('[data-cup]')].map((b) => +b.getAttribute('data-cup')).join())) === cupsD.join(), tag + ' the cups run biggest worth first, left to right');
    await L.click(page, 'check', 'check');
    is(sp(await note(page)) === sp(T(loc, 'hintDial')), tag + ' sorted, dial untouched → hintDial');
    await spinTo(page, r.total - 1); await L.click(page, 'check', 'check'); s = await S(page);
    is(s.misses === 1 && sp(await note(page)) === sp(T(loc, 'hintCount')) && await count(page, '.wt-railcoin') === r.coins.length && await page.evaluate(() => [...document.querySelectorAll('.wt-run')].every((e) => e.textContent === '')), tag + ' one short → hintCount, the parade without numbers');
    await L.click(page, 'check', 'check again');
    is((await S(page)).misses === 1 && sp(await note(page)) === sp(T(loc, 'hintAgain')), tag + ' Check again unchanged → hintAgain, no second miss');
    await L.click(page, 'down-o', 'dial'); await L.click(page, 'check', 'check'); s = await S(page);
    const runs = await page.evaluate(() => [...document.querySelectorAll('.wt-run')].map((e) => e.getAttribute('data-run')));
    const want = C.parade(r.coins).map((p) => String(p.run)); want[want.length - 1] = '?';
    is(s.help && runs.join() === want.join() && sp(await note(page)) === sp(await line(page, 'helpCount')), tag + ' miss 2: the running totals ' + runs.join(' ') + ', the last hidden');
    /* a tapped cup lifts its top coin back */
    await L.click(page, 'cup-' + big, 'cup'); is((await S(page)).coins.filter((c) => c.at === 'counter').length === 1, tag + ' tapping a cup lifts its top coin back');
    await tapPay(page, big);
    await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
    await spinTo(page, r.total); await L.click(page, 'check', 'check'); await H.wait(900); s = await S(page);
    is(s.done && sp(await L.bubble(page)).indexOf(sp(T(loc, 'okCount', { total: await page.evaluate((g, v) => window[g]._money(v), G, r.total) }))) >= 0, tag + ' the right total → okCount');
    is(await L.nextShown(page), tag + ' Next 0.5 s after the result');
    await page.evaluate((g) => { window[g].OK_MS = 600000; }, G);
    /* ---- level 2 fewest (R4) ---- */
    await go(page, '2', 3); r = (await S(page)).round;
    const fw = C.fewest(r.price, r.purse);
    let longer = null; { const n = r.purse.length; for (let m = 1; m < (1 << n) && !longer; m++) { const p = []; for (let i = 0; i < n; i++) if (m & (1 << i)) p.push(r.purse[i]); if (p.reduce((a, b) => a + b, 0) === r.price && p.length > fw.length) longer = p; } }
    for (const v of longer) await tapPay(page, v);
    await L.click(page, 'check', 'check');
    is(sp(await note(page)) === sp(T(loc, 'hintFewer')), tag + ' fewest ' + r.price + ': ' + longer.join('+') + ' → hintFewer');
    for (const v of longer) await L.click(page, 'cup-' + v, 'cup out');
    for (const v of fw) await tapPay(page, v);
    await L.click(page, 'check', 'check'); s = await S(page);
    is(s.done, tag + ' fewest: ' + fw.join('+') + ' → success');
    /* ---- level 2 trade (R6): the lid ---- */
    await go(page, '2', 5); r = (await S(page)).round;
    is(await page.evaluate((v) => { const b = document.querySelector('[data-cup="' + v + '"]'); return b.disabled && b.classList.contains('is-lid'); }, r.price), tag + ' trade: the offered coin\'s cup is lidded');
    /* ---- level 3 change (R1) ---- */
    await go(page, '3', 0); r = (await S(page)).round;
    await L.click(page, 'check', 'check');
    is(sp(await note(page)) === sp(T(loc, 'hintTrayFirst')), tag + ' change: empty tray → hintTrayFirst');
    let rest = r.paid - r.price; for (const v of cupsD) while (rest >= v) { await L.click(page, 'cup-' + v, 'cup to tray'); rest -= v; }
    is(+(await page.evaluate(() => document.querySelector('[data-tray]').getAttribute('data-tray'))) === r.paid - r.price, tag + ' change: tapped cups give ' + (r.paid - r.price) + ' to the tray');
    await L.click(page, 'check', 'check'); is((await S(page)).done, tag + ' change → success');
    /* ---- level 3 enough (R3..R6) ---- */
    for (const k of [2, 3]) {
      await go(page, '3', k); r = (await S(page)).round; const right = C.answer(r), wrong = right === 'yes' ? 'no' : 'yes';
      await L.click(page, 'choose-' + wrong, 'enough'); await L.click(page, 'check', 'check');
      is(sp(await note(page)) === sp(T(loc, 'hintEnough')), tag + ' enough ' + r.price + ': ' + wrong + ' → hintEnough');
      await L.click(page, 'choose-' + right, 'enough'); await L.click(page, 'check', 'check');
      is((await S(page)).done, tag + ' enough ' + r.price + ': ' + right + ' → success');
    }
    /* ---- level 3 which purse (R7), both sides ---- */
    for (const side of [0, 1]) {
      await go(page, '3', 6, 'on', side); r = (await S(page)).round;
      const winLeft = (C.answer(r) === 'a') === (side === 0);
      is(await count(page, '[data-cup]') === 0, tag + ' a purse round: the till steps aside');
      await L.click(page, 'purse-' + (winLeft ? 'right' : 'left'), 'purse'); await L.click(page, 'check', 'check');
      is(sp(await note(page)) === sp(T(loc, 'hintPurse')), tag + ' side ' + side + ': the purse with more coins → hintPurse');
      await L.click(page, 'purse-' + (winLeft ? 'left' : 'right'), 'purse'); await L.click(page, 'check', 'check');
      is((await S(page)).done, tag + ' side ' + side + ': the other purse → success');
    }
    /* ---- settings, keyboard ---- */
    await go(page, '1', 0, 'off'); is(await count(page, '.wt-keycoin') === 0, tag + ' coin key off');
    await go(page, '1', 0, 'on'); is(await count(page, '.wt-keycoin') === cupsD.length, tag + ' coin key on: a coin on every cup');
    s = await S(page); const kc = s.coins[0];
    await page.focus('[data-k="coin-' + kc.id + '"]'); await page.keyboard.press('Enter'); await page.focus('[data-k="cup-' + kc.v + '"]'); await page.keyboard.press('Enter');
    is((await S(page)).coins[0].at === 'till', tag + ' the keyboard: Enter on a coin, Enter on its cup');
    is(errs.length === 0, tag + ' no console errors ' + errs.slice(0, 2).join(' | '));
    await page.close();

    /* ---- each state reached once, then resized ---- */
    const ev = (pg, src) => pg.evaluate((g, s) => (new Function('a', 'C', s))(window[g], window.WorthTillCore), G, src);
    const SORT = 'a.st.coins.forEach(function(c){if(c.at==="counter")C.drop(a.st,c.id,c.v);});';
    const MISS = 'var n=a.st.round.total-1;a.st.dial.t=Math.floor(n/10);a.st.dial.o=n%10;a._check();';
    const ready = (pg) => pg.waitForFunction((g) => window[g]._picsReady, {}, G);
    await L.sweep(loc, 'L1 rest', async (pg) => { await ready(pg); await go(pg, '1', 7); }, { rest: true }, WIDTHS);
    await L.sweep(loc, 'L1 help', async (pg) => { await ready(pg); await go(pg, '1', 7); await ev(pg, SORT + MISS + 'a.st.dial.o=(a.st.dial.o+8)%10;a._check();'); }, { miss: true }, WIDTHS);
    await L.sweep(loc, 'L2 rest', async (pg) => { await ready(pg); await go(pg, '2', 0); }, { rest: true }, WIDTHS);
    await L.sweep(loc, 'L2 help', async (pg) => { await ready(pg); await go(pg, '2', 7); await ev(pg, 'var c=a.st.coins[0];C.drop(a.st,c.id,c.v);a._check();var d=a.st.coins[1];C.drop(a.st,d.id,d.v);a._check();'); }, { miss: true }, WIDTHS);
    await L.sweep(loc, 'L3 change help', async (pg) => { await ready(pg); await go(pg, '3', 1); await ev(pg, 'C.takeTop(a.st,C.cups(a.st.fam)[0]);a._check();C.takeTop(a.st,C.cups(a.st.fam)[1]);a._check();'); }, { miss: true }, WIDTHS);
    await L.sweep(loc, 'L3 enough', async (pg) => { await ready(pg); await go(pg, '3', 5); }, { rest: true }, WIDTHS);
    await L.sweep(loc, 'L3 purse help', async (pg) => { await ready(pg); await go(pg, '3', 6, 'on', 0); await ev(pg, 'var lose=C.answer(a.st.round)==="a"?"right":"left",win=lose==="left"?"right":"left";C.choose(a.st,lose);a._check();C.choose(a.st,win);C.choose(a.st,lose);a._check();'); }, { miss: true }, WIDTHS);
    await L.sweep(loc, 'done', async (pg) => { await ready(pg); await go(pg, '2', 0); await ev(pg, 'var r=a.st.round,need=r.price;C.desc(r.purse).forEach(function(v){if(v<=need){var c=a.st.coins.find(function(x){return x.v===v&&x.at==="purse";});if(c&&C.drop(a.st,c.id,v).result==="in")need-=v;}});a._check();'); }, {}, WIDTHS);
  }
  await L.close();
  process.exit(L.C.report('local-test-worth-till'));
})().catch((e) => { console.error(e); process.exit(1); });
