#!/usr/bin/env node
/* =====================================================================
   local-test-trundle-wheel.js — ACTIVITY #169, The Trundle Wheel ("Sort
   Shapes by Sides", 2.G.A.1), in a real browser with real drags, taps and
   the keyboard, in all 11 locales. Plumbing: scripts/lib/activity-harness.js.
   Scenarios per locale (1024):
     · sides crates: a shape left in the tray → a reminder; a real drag
       onto the lane docks it; a real drag along the lane tips it; taps
       roll it round → its ticket (n dashes) rides home; sorting by drag
       and by tap-then-tap; one shape wrong → miss 1 (it comes home with
       its ticket, the right ones stay); miss 2 → numbered dashes and the
       right crate pulses; all right → success, Next 0.5 s;
     · the crates setting (numbers / names); the keyboard (Enter on a
       shape, Enter on a crate; ArrowRight rolls on the lane);
     · the cabinet with an empty drawer: the fitting shelf shape dragged
       into it → success; the rings by taps → success.
   Then each state reached ONCE per locale and resized through 320…1366,
   with Check above the fold at rest.
   Usage: node scripts/local-test-trundle-wheel.js [--locales=…] [--widths=…]
   ===================================================================== */
'use strict';
const H = require('./lib/activity-harness');
const C = require('../mini tools/trundle-wheel-core.js');
const LOCS = H.arg('locales', H.LOCALES.join(',')).split(',');
const WIDTHS = H.arg('widths', H.WIDTHS.join(',')).split(',').map(Number);
const G = 'TrundleWheelActivity', sp = H.sp;

(async () => {
  const L = await H.local({ html: 'trundle-wheel-activity.html', id: 'sort-bins.sort-by-sides.2-g-a-1', global: G, ready: '.tw-wrap' });
  const { is } = L.C;
  const S = (page) => page.evaluate((g) => JSON.parse(JSON.stringify(window[g].st)), G);
  const go = async (page, board, k, crates) => { await page.evaluate((g, board, k, crates) => { const a = window[g]; a.api.settings.board = board; a.api.settings.crates = crates || 'both'; a._pool = null; a._ensurePool(); a._start(k); a._render2(); }, G, board, k, crates); await H.wait(60); };
  const note = (page) => page.evaluate(() => document.querySelector('[data-qa="note"]').textContent);
  const say = (page, key) => page.evaluate((g, key) => window[g]._t(key), G, key);
  const okLine = (page) => page.evaluate((g) => window[g]._okLine(), G);
  const box = (page, sel) => page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; e.scrollIntoView({ block: 'center' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, l: r.left, r: r.right }; }, sel);
  const drag = async (page, from, to, steps) => { await page.mouse.move(from.x, from.y); await page.mouse.down(); for (let i = 1; i <= (steps || 12); i++) await page.mouse.move(from.x + (to.x - from.x) * i / (steps || 12), from.y + (to.y - from.y) * i / (steps || 12)); await page.mouse.up(); await H.wait(80); };
  const dragTo = async (page, key, placeSel) => { const a = await box(page, '[data-k="shape-' + key + '"]'); const b = await box(page, placeSel); if (!a || !b) return false; const a2 = await box(page, '[data-k="shape-' + key + '"]'); await drag(page, a2, b); return true; };
  const placeOf = (st, it) => String(C.placeFor(st.board, C.infoOf(it)));
  const okMs = (page, ms) => page.evaluate((g, ms) => { window[g].OK_MS = ms; }, G, ms);

  for (const loc of LOCS) {
    const tag = '[' + loc + ']';
    const { page, errs } = await L.open(1024, loc);
    /* ---- sides crates, round 1 ---- */
    await go(page, 'sides', 0); let s = await S(page);
    await L.click(page, 'check', 'check');
    is(sp(await note(page)) === sp(await say(page, 'hintPlace')) && (await S(page)).misses === 0, tag + ' shapes in the tray → hintPlace, no miss');
    const it0 = s.items[0], n0 = C.infoOf(it0).n;
    await dragTo(page, it0.key, '[data-k="lane"]'); s = await S(page);
    is(s.docked === it0.key, tag + ' a real drag docks the shape on the lane');
    is(await page.evaluate(() => document.querySelectorAll('.tw-lanesvg line').length) >= 2, tag + ' docked: the coral start side and its dash are drawn');
    const lane = await box(page, '[data-k="lane"]');
    await drag(page, { x: lane.l + 60, y: lane.y }, { x: lane.r - 20, y: lane.y }, 30); s = await S(page);
    is(s.step >= 1 || s.docked == null, tag + ' a real drag along the lane tips the shape (step ' + s.step + ')');
    let guard = 0; while ((await S(page)).docked != null && guard++ < 12) await L.click(page, 'lane', 'roll');
    s = await S(page); const t0 = s.items.find((x) => x.key === it0.key);
    is(s.docked == null && t0.ticket && t0.ticket.dashes.length === n0, tag + ' rolled all the way round: a ticket of ' + n0 + ' dashes, the shape home');
    is(await page.evaluate((k) => { const b = document.querySelector('[data-k="shape-' + k + '"] .tw-ticket'); return b ? b.querySelectorAll('line').length : 0; }, it0.key) === n0, tag + ' the ticket under the shape shows ' + n0 + ' dashes');
    /* sort: the first by drag, the rest by tap-then-tap; one deliberately wrong */
    const wrong = s.items[1], other = s.crates.find((c) => String(c) !== placeOf(s, wrong));
    await dragTo(page, s.items[0].key, '[data-k="place-' + placeOf(s, s.items[0]) + '"]');
    for (const it of s.items.slice(1)) { await L.click(page, 'shape-' + it.key, 'pick'); await L.click(page, 'place-' + (it === wrong ? other : placeOf(s, it)), 'drop'); }
    s = await S(page);
    is(s.items[0].place === +placeOf(s, s.items[0]), tag + ' a real drag puts a shape in its crate');
    is(s.items.every((x) => x.place != null), tag + ' tap a shape, tap a crate: every shape placed');
    await L.click(page, 'check', 'check'); await page.waitForFunction((g) => !window[g]._view.anim, {}, G); s = await S(page);
    const w1 = s.items.find((x) => x.key === wrong.key);
    is(s.misses === 1 && w1.place == null && !!w1.ticket && s.items.filter((x) => x.key !== wrong.key).every((x) => x.place != null), tag + ' miss 1: the wrong shape comes home with its ticket, the right ones stay');
    is(sp(await note(page)) === sp(await say(page, 'hintCount')), tag + ' miss 1 → hintCount');
    await L.click(page, 'shape-' + wrong.key, 'pick'); await L.click(page, 'place-' + other, 'drop');
    await L.click(page, 'check', 'check'); await page.waitForFunction((g) => !window[g]._view.anim, {}, G); s = await S(page);
    is(s.help && await page.evaluate(() => document.querySelectorAll('.tw-tnum').length) > 0 && await page.evaluate((p) => !!document.querySelector('[data-k="place-' + p + '"].is-pulse'), placeOf(s, wrong)), tag + ' miss 2: numbered dashes, the right crate pulses');
    await okMs(page, 500); await L.click(page, 'shape-' + wrong.key, 'pick'); await L.click(page, 'place-' + placeOf(s, wrong), 'drop');
    await L.click(page, 'check', 'check'); await H.wait(900);
    is((await S(page)).done && sp(await L.bubble(page)).indexOf(sp(await okLine(page))) >= 0, tag + ' every shape in its crate → success: ' + sp(await L.bubble(page)));
    is(await L.nextShown(page), tag + ' Next 0.5 s after the result');
    await okMs(page, 600000);
    /* ---- the crates setting ---- */
    await go(page, 'sides', 1, 'num');
    is(await page.evaluate(() => document.querySelectorAll('.tw-cname').length === 0 && document.querySelectorAll('.tw-cnum').length > 0), tag + ' crates show numbers: no names');
    await go(page, 'sides', 1, 'name');
    is(await page.evaluate(() => document.querySelectorAll('.tw-cnum').length === 0 && document.querySelectorAll('.tw-cname').length > 0), tag + ' crates show names: no numerals');
    /* ---- the keyboard ---- */
    await go(page, 'sides', 2); s = await S(page);
    await page.focus('[data-k="shape-' + s.items[0].key + '"]'); await page.keyboard.press('Enter');
    await page.focus('[data-k="lane"]'); await page.keyboard.press('Enter'); s = await S(page);
    is(s.docked === s.items[0].key, tag + ' keyboard: Enter on a shape, Enter on the lane docks it');
    await page.keyboard.press('ArrowRight'); is((await S(page)).step === 1, tag + ' keyboard: ArrowRight rolls one side');
    /* ---- the cabinet with an empty drawer (Q5) ---- */
    await go(page, 'quads', 4); s = await S(page);
    for (const it of s.items.filter((x) => x.from === 't')) { await L.click(page, 'shape-' + it.key, 'pick'); await L.click(page, 'place-' + placeOf(s, it), 'drop'); }
    const fit = s.items.find((x) => x.from === 'd' && placeOf(s, x) === s.missing);
    await dragTo(page, fit.key, '[data-k="place-' + s.missing + '"]');
    await okMs(page, 500); await L.click(page, 'check', 'check'); await H.wait(900);
    is((await S(page)).done, tag + ' cabinet: the fitting shelf shape dragged into the empty drawer → success');
    await okMs(page, 600000);
    /* ---- two rings ---- */
    await go(page, 'rings', 0); s = await S(page);
    for (const it of s.items) { await L.click(page, 'shape-' + it.key, 'pick'); await L.click(page, 'place-' + placeOf(s, it), 'drop'); }
    await okMs(page, 500); await L.click(page, 'check', 'check'); await H.wait(900);
    is((await S(page)).done && sp(await L.bubble(page)).indexOf(sp(await okLine(page))) >= 0, tag + ' rings → success: ' + sp(await L.bubble(page)));
    is(errs.length === 0, tag + ' no console errors ' + errs.slice(0, 2).join(' | '));
    await page.close();

    /* ---- each state reached once, then resized ---- */
    const ev = (pg, src) => pg.evaluate((g, s) => (new Function('a', 'C', s))(window[g], window.TrundleWheelCore), G, src);
    const sweep = async (name, reach, mode) => {
      const { page: pg, errs: e2 } = await L.open(WIDTHS[WIDTHS.length - 1], loc);
      await reach(pg); await H.wait(60);
      for (const w of WIDTHS) { await pg.setViewport({ width: w, height: H.VH(w) }); await H.wait(120); await pg.evaluate(() => window.scrollTo(0, 0)); await L.measure(pg, w, loc + ' ' + name, mode === 'rest' ? { rest: true } : mode === 'miss' ? { miss: true } : {}); }
      is(e2.length === 0, loc + ' ' + name + ': no console errors ' + e2.slice(0, 3).join(' | '));
      await pg.close();
    };
    const PLACE = 'a.st.items.forEach(function(it){ if (it.from === "t") C.put(a.st, it.key, a.st.board === "sides" ? C.placeFor("sides", C.infoOf(it)) : C.placeFor(a.st.board, C.infoOf(it))); });';
    await sweep('sides rest', async (pg) => { await go(pg, 'sides', 3); }, 'rest');
    await sweep('sides rolling', async (pg) => { await go(pg, 'sides', 8); await ev(pg, 'C.put(a.st, a.st.items[0].key, "dock"); C.roll(a.st, 1); C.roll(a.st, 1); a._view.t = 0.5; a._paint();'); }, '');
    await sweep('sides miss', async (pg) => { await go(pg, 'sides', 7); await ev(pg, PLACE + 'var w = a.st.items[0]; C.put(a.st, w.key, a.st.crates.find(function(c){ return c !== C.placeFor("sides", C.infoOf(w)); })); a.FAST = true; a._check();'); }, 'miss');
    await sweep('quads rest', async (pg) => { await go(pg, 'quads', 1); }, 'rest');
    await sweep('quads drawer', async (pg) => { await go(pg, 'quads', 6); }, 'rest');
    await sweep('quads placed', async (pg) => { await go(pg, 'quads', 3); await ev(pg, PLACE + 'a._paint();'); }, '');
    await sweep('rings rest', async (pg) => { await go(pg, 'rings', 0); }, 'rest');
    await sweep('rings placed', async (pg) => { await go(pg, 'rings', 2); await ev(pg, PLACE + 'a._paint();'); }, '');
    await sweep('names rest', async (pg) => { await go(pg, 'sides', 4, 'name'); }, 'rest');
  }
  await L.close();
  process.exit(L.C.report('local-test-trundle-wheel'));
})().catch((e) => { console.error(e); process.exit(1); });
