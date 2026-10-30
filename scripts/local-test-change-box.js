#!/usr/bin/env node
/* =====================================================================
   local-test-change-box.js — ACTIVITY #166, The Change Box ("Make Change
   with Coins", 2.MD.C.8), in a real browser with real taps, in all 11
   locales (8 currency families). Plumbing: scripts/lib/activity-harness.js.
   Scenarios per locale (1024):
     · change: Check with an empty tray → a reminder, no miss; almost the
       whole pile into the tray by real taps → Pip short (hintShort, Pip's
       count against the tag, the tag ringed); Check again → hintAgain; a
       second real miss → the count-up: the tray empties back, the rail
       starts at the price, the fewest change coins are outlined; those
       coins tapped into the tray → success, the success line, Next 0.5 s;
     · no running total before Check; "as you go" shows Pip's live count
       and it follows the taps; the US coins carry no numeral;
     · basket: two or three different toys and tags, the change by real
       taps → okBasket; enough: the wrong tag → the hint naming the right
       answer, the right tag → success; how much more: Check with nothing
       added → a reminder, side-tray coins by real taps to the price →
       okMore; the keyboard (Enter on a pile coin).
   Then each state reached ONCE per locale and resized through 320…1366,
   with Check above the fold at rest.
   Usage: node scripts/local-test-change-box.js [--locales=…] [--widths=…]
   ===================================================================== */
'use strict';
const H = require('./lib/activity-harness');
const C = require('../mini tools/change-box-core.js');
const LOCS = H.arg('locales', H.LOCALES.join(',')).split(',');
const WIDTHS = H.arg('widths', H.WIDTHS.join(',')).split(',').map(Number);
const { T: T0 } = H.strings('change-box-activity.js', 'ChangeBoxActivity', { ChangeBoxCore: C });
/* as the activity's _t: da «13 kr.» closes its own sentence (never «kr..») */
const T = (loc, k, a) => T0(loc, k, a).replace(/kr\.\./g, 'kr.');
const G = 'ChangeBoxActivity', sp = H.sp;
const ways = (target, coins) => { const out = []; const n = coins.length; for (let m = 1; m < (1 << n); m++) { const p = []; for (let i = 0; i < n; i++) if (m & (1 << i)) p.push(coins[i]); if (p.reduce((a, b) => a + b, 0) === target) out.push(p); } return out.sort((a, b) => a.length - b.length); };

(async () => {
  const L = await H.local({ html: 'change-box-activity.html', id: 'money.make-change.2-md-c-8', global: G, ready: '.cb-wrap' });
  const { is } = L.C;
  const settle = (page) => page.waitForFunction((g) => { const a = window[g]; return a.st.done || !a._timers.length; }, { timeout: 3000 }, G).catch(() => {});
  const _click = L.click; L.click = async (page, k, what) => { await settle(page); return _click(page, k, what); };
  const S = (page) => page.evaluate((g) => JSON.parse(JSON.stringify(window[g].st)), G);
  const go = async (page, shop, k, count) => { await page.evaluate((g, shop, k, count) => { const a = window[g]; a.api.settings.shop = shop; a.api.settings.count = count || 'check'; a._pool = null; a._ensurePool(); a._start(k, 0); a._render2(); }, G, shop, k, count); await H.wait(40); };
  const note = (page) => page.evaluate(() => document.querySelector('[data-qa="note"]').textContent);
  const money = (page, v) => page.evaluate((g, v) => window[g]._money(v), G, v);
  const at = async (page, where) => (await S(page)).coins.filter((c) => c.at === where);
  const give = async (page, vals) => { for (const v of vals) { const c = (await at(page, 'pile')).find((x) => x.v === v); await L.click(page, 'coin-' + c.id, 'coin ' + v); } };
  const line = (page, key) => page.evaluate((g, key) => { const a = window[g], r = a.st.round, C = window.ChangeBoxCore, aa = a._args(); aa.paid += a._dec(C.paid(r)); if (r.kind !== 'basket') aa.price += a._dec(r.price); return a._t(key, aa); }, G, key);

  for (const loc of LOCS) {
    const tag = '[' + loc + ']', fam = C.famOf(loc);
    const { page, errs } = await L.open(1024, loc);
    await page.waitForFunction((g) => window[g]._picsReady, { timeout: 15000 }, G);
    /* ---- change, R4 ---- */
    await go(page, 'change', 3); let s = await S(page), r = s.round;
    await L.click(page, 'check', 'check');
    is(sp(await note(page)) === sp(T(loc, 'hintTrayEmpty')) && (await S(page)).misses === 0, tag + ' an empty tray → hintTrayEmpty, no miss');
    is(await page.evaluate(() => document.querySelectorAll('.cb-pile .cb-coin').length) === r.pile.length && await page.evaluate(() => !document.querySelector('.cb-rail') || getComputedStyle(document.querySelector('.cb-rail')).display === 'none'), tag + ' the pile = the payment\'s ' + r.pile.length + ' coins; no count shown before Check');
    if (loc === 'en') is(await page.evaluate(() => document.querySelectorAll('.cb-pile svg text').length) === 0, tag + ' US coins carry no numeral');
    const small = Math.min(...r.pile), allButSmall = r.pile.slice().sort((a, b) => b - a); allButSmall.splice(allButSmall.lastIndexOf(small), 1);
    await give(page, allButSmall);
    await L.click(page, 'check', 'check'); s = await S(page);
    is(s.misses === 1 && sp(await note(page)) === sp(T(loc, 'hintShort', { name: T(loc, 'pipName'), pip: await money(page, small), price: await money(page, r.price) })), tag + ' almost all of it given back → Pip has only ' + small + ' → hintShort');
    is(await page.evaluate(() => !!document.querySelector('.cb-railgoal.is-short')) && +(await page.evaluate(() => document.querySelector('.cb-railgoal').getAttribute('data-goal'))) === r.price, tag + ' Pip\'s count against the tag, the tag ringed');
    await L.click(page, 'check', 'check again');
    is((await S(page)).misses === 1 && sp(await note(page)) === sp(T(loc, 'hintAgain')), tag + ' Check again unchanged → hintAgain, no second miss');
    const back = (await at(page, 'tray'))[0]; await L.click(page, 'coin-' + back.id, 'tray coin back');
    is((await S(page)).coins.find((c) => c.id === back.id).at === 'pile', tag + ' a tapped tray coin goes back to the pile');
    await L.click(page, 'check', 'check'); s = await S(page);
    const hintIds = await page.evaluate(() => [...document.querySelectorAll('.cb-pile .cb-coin.is-hint')].map((b) => +b.getAttribute('data-id')));
    const hv = hintIds.map((id) => s.coins.find((c) => c.id === id).v), fewest = ways(C.change(r), r.pile)[0].length;
    is(s.help && (await at(page, 'tray')).length === 0 && hv.reduce((a, b) => a + b, 0) === C.change(r) && hv.length === fewest, tag + ' miss 2: the tray empties back, the fewest change coins outlined (' + hv.join('+') + ')');
    is(+(await page.evaluate(() => document.querySelector('.cb-railstart').getAttribute('data-start'))) === r.price && sp(await note(page)).indexOf(sp(await money(page, C.paid(r)))) >= 0, tag + ' the count-up starts at the price and runs to the payment');
    await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
    for (const id of hintIds) await L.click(page, 'coin-' + id, 'outlined coin');
    await L.click(page, 'check', 'check'); await H.wait(900); s = await S(page);
    is(s.done && sp(await L.bubble(page)).indexOf(sp(await line(page, 'okChange'))) >= 0, tag + ' the right change → okChange: ' + sp(await L.bubble(page)));
    is(await L.nextShown(page), tag + ' Next 0.5 s after the result');
    await page.evaluate((g) => { window[g].OK_MS = 600000; }, G);
    /* ---- "as you go" ---- */
    await go(page, 'change', 0, 'live'); r = (await S(page)).round;
    is(+(await page.evaluate(() => document.querySelector('.cb-live').getAttribute('data-live'))) === C.paid(r), tag + ' as you go: Pip\'s live count starts at the payment');
    const c0 = (await at(page, 'pile'))[0]; await L.click(page, 'coin-' + c0.id, 'live tap');
    is(+(await page.evaluate(() => document.querySelector('.cb-live').getAttribute('data-live'))) === C.paid(r) - c0.v, tag + ' as you go: the live count follows the taps');
    /* ---- basket R5 (three toys) ---- */
    await go(page, 'basket', 4); s = await S(page); r = s.round;
    is(new Set(s.toys).size === r.tags.length && await page.evaluate(() => document.querySelectorAll('.cb-item').length) === r.tags.length, tag + ' basket: ' + r.tags.length + ' different toys with their tags');
    await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
    await give(page, ways(C.change(r), r.pile)[0]); await L.click(page, 'check', 'check'); await H.wait(900);
    is((await S(page)).done && sp(await L.bubble(page)).indexOf(sp(await line(page, 'okBasket'))) >= 0, tag + ' basket → okBasket');
    await page.evaluate((g) => { window[g].OK_MS = 600000; }, G);
    /* ---- enough R2 (not enough) ---- */
    await go(page, 'more', 1); r = (await S(page)).round; const right = C.enoughAnswer(r), wrong = right === 'yes' ? 'no' : 'yes';
    await L.click(page, 'check', 'check');
    is(sp(await note(page)) === sp(T(loc, 'hintChoose')), tag + ' enough: no tag → hintChoose');
    await L.click(page, 'choose-' + wrong, 'wrong tag'); await L.click(page, 'check', 'check');
    is(sp(await note(page)) === sp(T(loc, right === 'yes' ? 'hintEnoughYes' : 'hintEnoughNo', { sum: await money(page, C.sum(r.purse)), price: await money(page, r.price) })), tag + ' enough: the wrong tag → the hint names the right answer');
    await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
    await L.click(page, 'choose-' + right, 'right tag'); await L.click(page, 'check', 'check'); await H.wait(900);
    is((await S(page)).done && sp(await L.bubble(page)).indexOf(sp(await line(page, C.okKey(await S(page))))) >= 0, tag + ' enough: the right tag → success');
    await page.evaluate((g) => { window[g].OK_MS = 600000; }, G);
    /* ---- how much more R5 ---- */
    await go(page, 'more', 4); r = (await S(page)).round;
    await L.click(page, 'check', 'check');
    is(sp(await note(page)) === sp(T(loc, 'hintAddEmpty', { name: T(loc, 'pipName') })), tag + ' how much more: nothing added → hintAddEmpty');
    await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
    let need = r.price - C.sum(r.purse); for (const v of C.kinds(fam).filter((x) => x < r.price)) while (need >= v) { await L.click(page, 'add-' + v, 'add ' + v); need -= v; }
    await L.click(page, 'check', 'check'); await H.wait(900);
    is((await S(page)).done && sp(await L.bubble(page)).indexOf(sp(await line(page, 'okMore'))) >= 0, tag + ' how much more → okMore');
    await page.evaluate((g) => { window[g].OK_MS = 600000; }, G);
    /* ---- keyboard ---- */
    await go(page, 'change', 1); const kc = (await at(page, 'pile'))[0];
    await page.focus('[data-k="coin-' + kc.id + '"]'); await page.keyboard.press('Enter');
    is((await S(page)).coins.find((c) => c.id === kc.id).at === 'tray', tag + ' the keyboard: Enter on a pile coin → the tray');
    is(errs.length === 0, tag + ' no console errors ' + errs.slice(0, 2).join(' | '));
    await page.close();

    /* ---- each state reached once, then resized ---- */
    const ev = (pg, src) => pg.evaluate((g, s) => (new Function('a', 'C', s))(window[g], window.ChangeBoxCore), G, src);
    const sweep = async (name, reach, rest) => {
      const { page: pg, errs: e2 } = await L.open(WIDTHS[WIDTHS.length - 1], loc);
      await pg.waitForFunction((g) => window[g]._picsReady, {}, G); await reach(pg); await H.wait(60);
      for (const w of WIDTHS) { await pg.setViewport({ width: w, height: H.VH(w) }); await H.wait(120); await pg.evaluate(() => window.scrollTo(0, 0)); await L.measure(pg, w, loc + ' ' + name, rest === 'none' ? {} : rest ? { rest: true } : { miss: true }); }
      is(e2.length === 0, loc + ' ' + name + ': no console errors ' + e2.slice(0, 3).join(' | '));
      await pg.close();
    };
    /* everything given back: Pip has nothing, always short of the price (never an accidental right answer) */
    const BIGGEST = 'C.where(a.st,"pile").forEach(function(c){C.move(a.st,c.id);});a._check();';
    for (const k of [0, 6]) await sweep('change R' + (k + 1) + ' rest', async (pg) => { await go(pg, 'change', k); }, true);
    await sweep('change miss', async (pg) => { await go(pg, 'change', 4); await ev(pg, BIGGEST); });
    await sweep('change help', async (pg) => { await go(pg, 'change', 7); await ev(pg, BIGGEST + 'var d=C.where(a.st,"tray").sort(function(x,y){return x.v-y.v;})[0];C.move(a.st,d.id);a._check();'); });
    await sweep('basket rest', async (pg) => { await go(pg, 'basket', 7); }, true);
    await sweep('basket help', async (pg) => { await go(pg, 'basket', 6); await ev(pg, BIGGEST + 'var d=C.where(a.st,"tray").sort(function(x,y){return x.v-y.v;})[0];C.move(a.st,d.id);a._check();'); });
    await sweep('enough miss', async (pg) => { await go(pg, 'more', 3); await ev(pg, 'C.choose(a.st,C.enoughAnswer(a.st.round)==="yes"?"no":"yes");a._check();'); });
    await sweep('more rest', async (pg) => { await go(pg, 'more', 6); }, true);
    await sweep('done', async (pg) => { await go(pg, 'change', 2); await ev(pg, 'var U=C.countUp(a.st);U.ids.forEach(function(id){C.move(a.st,id);});a.OK_MS=600000;a._check();'); }, 'none');
  }
  await L.close();
  process.exit(L.C.report('local-test-change-box'));
})().catch((e) => { console.error(e); process.exit(1); });
