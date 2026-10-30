#!/usr/bin/env node
/* =====================================================================
   local-test-level-rail.js — ACTIVITY #168, The Level Rail ("Pip's
   Stacking Fence", 2.MD.D.10), in a real browser with real drags, taps
   and the keyboard, in all 11 locales. Plumbing:
   scripts/lib/activity-harness.js. Scenarios per locale (1024):
     · how many more: untouched → a reminder; the rail's end dragged onto
       the shorter picket and the slider dragged to its top → level, the
       post reads it, the taller picket's overhang striped; a wrong dial →
       miss 1 lays the rail level on the shorter picket; Check again →
       hintAgain; the right dial → success, Next 0.5 s, Pip runs;
     · altogether: two picket taps stack them, the tower = a + b; the dial;
     · how many are left: planks dragged from the named picket into Pip's
       basket, a basket tap puts one back; the dial;
     · the most: a picket tap is the answer; true / false: a tag;
     · build: a real drag of a picket top, taps, the keyboard; an empty
       picket at Check → "still empty", never "says 0"; the card;
     · scaled: the keyboard lays the rail and moves the slider by the
       unit; a half picture; the rail setting hides the rail at rest.
   Then each state reached ONCE per locale and resized through 320…1366,
   with Check above the fold at rest.
   Usage: node scripts/local-test-level-rail.js [--locales=…] [--widths=…]
   ===================================================================== */
'use strict';
const H = require('./lib/activity-harness');
const C = require('../mini tools/level-rail-core.js');
const LOCS = H.arg('locales', H.LOCALES.join(',')).split(',');
const WIDTHS = H.arg('widths', H.WIDTHS.join(',')).split(',').map(Number);
const G = 'LevelRailActivity', sp = H.sp;

(async () => {
  const L = await H.local({ html: 'level-rail-activity.html', id: 'graph-it.bar-graph.2-md-d-10', global: G, ready: '.lr-wrap' });
  const { is } = L.C;
  const S = (page) => page.evaluate((g) => JSON.parse(JSON.stringify(window[g].st)), G);
  const go = async (page, level, k, rail) => { await page.evaluate((g, level, k, rail) => { const a = window[g]; a.api.settings.level = level; a.api.settings.rail = rail || 'show'; a._pool = null; a._ensurePool(); a._start(k); a._render2(); }, G, level, k, rail); await H.wait(60); };
  const note = (page) => page.evaluate(() => document.querySelector('[data-qa="note"]').textContent);
  const say = (page, key) => page.evaluate((g, key) => window[g]._t(key, window[g]._args()), G, key);
  const okLine = (page) => page.evaluate((g) => window[g]._t(window.LevelRailCore.okKey(window[g].st), window[g]._args()), G);
  const box = (page, sel) => page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; e.scrollIntoView({ block: 'center' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, t: r.top, b: r.bottom, l: r.left, r: r.right }; }, sel);
  const drag = async (page, from, to) => { await page.mouse.move(from.x, from.y); await page.mouse.down(); for (let i = 1; i <= 12; i++) await page.mouse.move(from.x + (to.x - from.x) * i / 12, from.y + (to.y - from.y) * i / 12); await page.mouse.up(); await H.wait(80); };
  /* the screen y of a value on the post, and the x of a picket */
  const yOf = (page, v) => page.evaluate((g, v) => { const a = window[g], r = a._fenceEl.getBoundingClientRect(); return r.top + a._y(v); }, G, v);
  const xOf = (page, c) => page.evaluate((g, c) => { const a = window[g], r = a._fenceEl.getBoundingClientRect(); return r.left + a._cx(a.st.cats.indexOf(c)); }, G, c);
  const dial = async (page, n) => { const t = Math.floor(n / 10), o = n % 10; for (let i = 0; i < t; i++) await L.click(page, 'dial-t-up', 'tens up'); if (o) for (let i = 0; i < o; i++) await L.click(page, 'dial-o-up', 'ones up'); else { await L.click(page, 'dial-o-up', 'ones up'); await L.click(page, 'dial-o-down', 'ones down'); } };
  const clearDial = (page) => page.evaluate((g) => { const a = window[g]; window.LevelRailCore.setDial(a.st, null, null); a._paint(); }, G);
  const okMs = (page, ms) => page.evaluate((g, ms) => { window[g].OK_MS = ms; }, G, ms);

  for (const loc of LOCS) {
    const tag = '[' + loc + ']';
    const { page, errs } = await L.open(1024, loc);
    await page.waitForFunction((g) => window[g]._picsReady, { timeout: 15000 }, G);
    /* ---- R1: how many more leaves than raspberries ---- */
    await go(page, 'read', 0); let s = await S(page);
    await L.click(page, 'check', 'check');
    is(sp(await note(page)) === sp(await say(page, 'hintReadStart')) && (await S(page)).misses === 0, tag + ' untouched → hintReadStart, no miss');
    let f = await box(page, '[data-k="foot"]');
    await drag(page, f, { x: await xOf(page, 'raspberry'), y: f.y });
    s = await S(page); is(s.rail.on === 'raspberry', tag + ' a real drag lays the rail\'s end on the raspberry picket (' + s.rail.on + ')');
    let sl = await box(page, '[data-k="slider"]');
    await drag(page, sl, { x: sl.x, y: await yOf(page, 4) });
    s = await S(page); is(s.rail.y === 4 && C.isLevel(s), tag + ' a real drag of the slider to 4: the rail is level (y=' + s.rail.y + ')');
    is(await page.evaluate(() => !!document.querySelector('.lr-rail.is-level')) && await page.evaluate(() => (document.querySelector('.lr-read') || {}).textContent) === '4', tag + ' level: the post reads 4');
    is(await page.evaluate(() => document.querySelectorAll('.lr-picket[data-cat="leaf"] .lr-plank.is-over').length) === 2, tag + ' the leaves\' overhang above the rail: 2 striped planks');
    is(await page.evaluate(() => { const b = document.querySelector('.lr-bubble'), v = document.querySelector('.lr-vial'); const br = b.getBoundingClientRect(), vr = v.getBoundingClientRect(); return Math.abs((br.left + br.width / 2) - (vr.left + vr.width / 2)) < 2; }), tag + ' the bubble sits in the middle when level');
    sl = await box(page, '[data-k="slider"]'); await drag(page, sl, { x: sl.x, y: await yOf(page, 6) });
    is(!C.isLevel(await S(page)) && await page.evaluate(() => { const b = document.querySelector('.lr-bubble'), v = document.querySelector('.lr-vial'); const br = b.getBoundingClientRect(), vr = v.getBoundingClientRect(); return Math.abs((br.left + br.width / 2) - (vr.left + vr.width / 2)) > 6; }) && await page.evaluate(() => !document.querySelector('.lr-plank.is-over')), tag + ' slider at 6 on the raspberries: tilted, the bubble off-centre, no stripes');
    await dial(page, 3); await L.click(page, 'check', 'check'); s = await S(page);
    is(s.misses === 1 && C.isLevel(s) && s.rail.on === 'raspberry' && sp(await note(page)) === sp(await say(page, 'hintMore')), tag + ' a wrong dial → miss 1: the rail laid level on the shorter picket, hintMore');
    await L.click(page, 'check', 'check again');
    is((await S(page)).misses === 1 && sp(await note(page)) === sp(await say(page, 'hintAgain')), tag + ' Check again unchanged → hintAgain, no second miss');
    await okMs(page, 500); await clearDial(page); await dial(page, 2); await L.click(page, 'check', 'check'); await H.wait(900);
    is((await S(page)).done && sp(await L.bubble(page)).indexOf(sp(await okLine(page))) >= 0, tag + ' the right dial → success: ' + sp(await L.bubble(page)));
    is(await L.nextShown(page), tag + ' Next 0.5 s after the result');
    is(await page.evaluate(() => !!document.querySelector('.lr-pip')), tag + ' Pip runs along the picket tops');
    await okMs(page, 600000);
    /* ---- R5: altogether — stack by two taps ---- */
    await go(page, 'read', 4);
    await L.click(page, 'picket-leaf', 'tap leaves'); await L.click(page, 'picket-raspberry', 'tap raspberries'); s = await S(page);
    is(s.stack && s.stack.from === 'leaf' && s.stack.onto === 'raspberry' && C.topOf(s, 'raspberry') === 10, tag + ' two taps stack the leaves on the raspberries: a tower of 10');
    is(await page.evaluate(() => document.querySelectorAll('.lr-picket[data-cat="raspberry"] .lr-plank.is-stacked').length) === 6, tag + ' the stacked planks keep their own colour (6)');
    await dial(page, 10); await okMs(page, 500); await L.click(page, 'check', 'check'); await H.wait(900);
    is((await S(page)).done, tag + ' altogether 10 → success');
    await okMs(page, 600000);
    /* ---- R8: Pip eats 4 acorns — planks into the basket ---- */
    await go(page, 'read', 7);
    for (let i = 0; i < 4; i++) { const p = await box(page, '[data-k="picket-acorn"]'), b = await box(page, '[data-k="basket"]') || await box(page, '.lr-basket'); await drag(page, { x: p.x, y: p.t + 12 }, { x: b.x, y: b.y }); }
    s = await S(page); is(s.fence.acorn === 5 && s.basket.length === 4, tag + ' four planks dragged into Pip\'s basket: 5 acorns left (' + s.fence.acorn + ', basket ' + s.basket.length + ')');
    await L.click(page, 'basket', 'basket'); s = await S(page); is(s.fence.acorn === 6 && s.basket.length === 3, tag + ' a basket tap puts the last plank back');
    await L.click(page, 'picket-acorn', 'tap acorns'); s = await S(page); is(s.fence.acorn === 5, tag + ' a tap on the picket takes one plank too');
    await dial(page, 5); await okMs(page, 500); await L.click(page, 'check', 'check'); await H.wait(900);
    is((await S(page)).done, tag + ' 5 left → success');
    await okMs(page, 600000);
    /* ---- R7: the most — a picket tap ---- */
    await go(page, 'read', 6);
    await L.click(page, 'picket-acorn', 'tap acorns'); await L.click(page, 'check', 'check'); s = await S(page);
    is(s.misses === 1 && C.isLevel(s) && s.rail.on !== C.answerOf(s.round) && sp(await note(page)) === sp(await say(page, 'hintMost1')), tag + ' most: a wrong picket → the rail laid on a picket that is not the most, hintMost1');
    await L.click(page, 'picket-leaf', 'tap leaves'); await okMs(page, 500); await L.click(page, 'check', 'check'); await H.wait(900);
    is((await S(page)).done, tag + ' the leaves are the most → success');
    await okMs(page, 600000);
    /* ---- R9: true or false ---- */
    await go(page, 'read', 8);
    await L.click(page, 'false', 'False'); await okMs(page, 500); await L.click(page, 'check', 'check'); await H.wait(900);
    is((await S(page)).done && sp(await L.bubble(page)).indexOf(sp(await okLine(page))) >= 0, tag + ' False (3 more, not 2) → success: ' + sp(await L.bubble(page)));
    await okMs(page, 600000);
    /* ---- B1: build from a tally ---- */
    await go(page, 'build', 0);
    is(await page.evaluate(() => !document.querySelector('.lr-rail')) && await page.evaluate(() => document.querySelectorAll('.lr-grip').length) === 3, tag + ' build at rest: no rail, a pull tab on every picket');
    is(await page.evaluate(() => document.querySelectorAll('.lr-card .lr-row').length) === 3, tag + ' the tally card shows three rows');
    let p = await box(page, '[data-k="picket-leaf"]'), y5 = await yOf(page, 5), y0 = await yOf(page, 0);
    await drag(page, { x: p.x, y: y0 - 4 }, { x: p.x, y: y5 - 4 }); s = await S(page);
    is(s.fence.leaf === 5, tag + ' a real drag pulls the leaf picket up to 5 (' + s.fence.leaf + ')');
    await L.click(page, 'check', 'check'); s = await S(page);
    is(s.misses === 1 && sp(await note(page)) === sp(await say(page, 'hintBuildEmpty')) && !/(^|\D)0(\D|$)/.test(await note(page)), tag + ' an empty picket at Check → "still empty", never "says 0": ' + sp(await note(page)));
    for (let i = 0; i < 3; i++) await L.click(page, 'picket-raspberry', 'tap raspberries');
    await page.focus('[data-k="picket-acorn"]'); for (let i = 0; i < 6; i++) await page.keyboard.press('ArrowUp');
    s = await S(page); is(s.fence.raspberry === 3 && s.fence.acorn === 6, tag + ' taps and the keyboard build the other pickets (3, 6)');
    await okMs(page, 500); await L.click(page, 'check', 'check'); await H.wait(900);
    is((await S(page)).done && sp(await L.bubble(page)).indexOf(sp(await say(page, 'okBuild'))) >= 0, tag + ' the fence matches the tally → success');
    await okMs(page, 600000);
    /* ---- S6: the post counts by 2 — the keyboard ---- */
    await go(page, 'scaled', 5);
    await page.focus('[data-k="foot"]'); let guard = 0; while ((await S(page)).rail.on !== 'mushroom' && guard++ < 6) await page.keyboard.press('ArrowRight');
    await page.focus('[data-k="slider"]'); for (let i = 0; i < 7; i++) await page.keyboard.press('ArrowUp');
    s = await S(page); is(s.rail.on === 'mushroom' && s.rail.y === 7 && C.isLevel(s), tag + ' scaled by 2: the keyboard lays the rail on the mushrooms and climbs 7 half-steps → level at 7');
    await dial(page, 7); await okMs(page, 500); await L.click(page, 'check', 'check'); await H.wait(900);
    is((await S(page)).done, tag + ' 7 mushrooms → success');
    await okMs(page, 600000);
    /* ---- S2: a picture fence at key 2, built with a half picture ---- */
    await go(page, 'scaled', 1);
    await page.focus('[data-k="picket-flower"]'); for (let i = 0; i < 7; i++) await page.keyboard.press('ArrowUp');
    is(await page.evaluate(() => document.querySelectorAll('.lr-picket[data-cat="flower"] .lr-pmark').length) === 4 && await page.evaluate(() => !!document.querySelector('.lr-picket[data-cat="flower"] .lr-pmark.is-halfpic')), tag + ' 7 at key 2 = three pictures and a half');
    /* ---- the rail setting ---- */
    await go(page, 'read', 0, 'hide');
    is(await page.evaluate(() => !document.querySelector('.lr-rail')), tag + ' rail hidden: no rail at rest');
    await dial(page, 5); await L.click(page, 'check', 'check');
    is(await page.evaluate(() => !!document.querySelector('.lr-rail.is-level')), tag + ' rail hidden: miss 1 still brings it in, level');
    is(errs.length === 0, tag + ' no console errors ' + errs.slice(0, 2).join(' | '));
    await page.close();

    /* ---- each state reached once, then resized ---- */
    const ev = (pg, src) => pg.evaluate((g, s) => (new Function('a', 'C', s))(window[g], window.LevelRailCore), G, src);
    const sweep = async (name, reach, mode) => {
      const { page: pg, errs: e2 } = await L.open(WIDTHS[WIDTHS.length - 1], loc);
      await pg.waitForFunction((g) => window[g]._picsReady, {}, G); await reach(pg); await H.wait(60);
      for (const w of WIDTHS) { await pg.setViewport({ width: w, height: H.VH(w) }); await H.wait(120); await pg.evaluate(() => window.scrollTo(0, 0)); await L.measure(pg, w, loc + ' ' + name, mode === 'rest' ? { rest: true } : mode === 'miss' ? { miss: true } : {}); }
      is(e2.length === 0, loc + ' ' + name + ': no console errors ' + e2.slice(0, 3).join(' | '));
      await pg.close();
    };
    await sweep('read rest', async (pg) => { await go(pg, 'read', 1); }, 'rest');
    await sweep('read miss', async (pg) => { await go(pg, 'read', 1); await ev(pg, 'C.setDial(a.st,0,9);a._check();'); }, 'miss');
    await sweep('read help', async (pg) => { await go(pg, 'read', 3); await ev(pg, 'C.setDial(a.st,0,9);a._check();C.setDial(a.st,0,8);a._check();'); }, 'miss');
    await sweep('most rest', async (pg) => { await go(pg, 'read', 6); }, 'rest');
    await sweep('stacked', async (pg) => { await go(pg, 'read', 5); await ev(pg, 'C.stack(a.st,"pinecone","acorn");a._paint();'); }, '');
    await sweep('left basket', async (pg) => { await go(pg, 'read', 7); await ev(pg, 'C.take(a.st,"acorn");C.take(a.st,"acorn");a._paint();'); }, 'rest');
    await sweep('build rest', async (pg) => { await go(pg, 'build', 1); }, 'rest');
    await sweep('build pictures', async (pg) => { await go(pg, 'build', 4); }, 'rest');
    await sweep('build miss', async (pg) => { await go(pg, 'build', 7); await ev(pg, 'C.setPicket(a.st,"acorn",8);a._check();'); }, 'miss');
    await sweep('scaled pictures', async (pg) => { await go(pg, 'scaled', 0); }, 'rest');
    await sweep('scaled post', async (pg) => { await go(pg, 'scaled', 6); }, 'rest');
  }
  await L.close();
  process.exit(L.C.report('local-test-level-rail'));
})().catch((e) => { console.error(e); process.exit(1); });
