#!/usr/bin/env node
/* =====================================================================
   local-test-headline-desk.js — ACTIVITY #173, Marina's Headline Desk
   (RI.2.2), in a real browser with real taps and the keyboard, in all 11
   locales. Plumbing: scripts/lib/activity-harness.js.
   Scenarios per locale (1024):
     · Level 1: Check with no headline → a reminder; a real tap on a detail
       card puts it in the slot; the stapler → one strip stapled, two blown
       onto the floor band, the detail hint; a neighbour → nothing stapled,
       help: underlined thread words in every strip; the topic → every
       strip stapled, the front page, the success line, Next 0.5 s;
     · the slot gives its card back; S presses the stapler, F the fan;
     · Level 2: the one-paragraph card staples two strips, two blow away;
     · Level 3 (4 cards): the other paragraph and the whole article jam the
       stapler; a detail staples one yellow strip; the fit → the yellow line;
     · the settings (3 / 4 cards, the three levels at rest); the real
       press once (not fast-forwarded).
   Then on phones: every card and Check above the fold, Next above the
   fold when solved, and each state reached ONCE and resized through
   320…1366.
   Usage: node scripts/local-test-headline-desk.js [--locales=…] [--widths=…]
   ===================================================================== */
'use strict';
const H = require('./lib/activity-harness');
const LOCS = H.arg('locales', H.LOCALES.join(',')).split(',');
const WIDTHS = H.arg('widths', H.WIDTHS.join(',')).split(',').map(Number);
const G = 'MarinaHeadlineDeskActivity', sp = H.sp;

(async () => {
  const L = await H.local({ html: 'marina-headline-desk-activity.html', id: 'marina-headline-desk.main-topic.ri-2-2', global: G, ready: '.hd-wrap' });
  const { is } = L.C;
  const S = (page) => page.evaluate((g) => JSON.parse(JSON.stringify(window[g].st)), G);
  const go = async (page, level, k, cards) => { await page.evaluate((g, level, k, cards) => { const a = window[g]; a.api.settings.level = level; a.api.settings.cards = String(cards || 3); a._pool = null; a._ensurePool(); a._start(k, 0); a._render2(); }, G, level, k, cards); await H.wait(60); };
  const note = (page) => page.evaluate(() => document.querySelector('[data-qa="note"]').textContent);
  const say = (page, key, args) => page.evaluate((g, key, args) => window[g]._t(key, args || {}), G, key, args);
  const okMs = (page, ms) => page.evaluate((g, ms) => { window[g].OK_MS = ms; }, G, ms);
  const count = (page, sel) => page.evaluate((s) => document.querySelectorAll(s).length, sel);
  const cardOf = async (page, role) => (await S(page)).cards.findIndex((c) => c.role === role);
  const tap = async (page, role) => { const i = await cardOf(page, role); await L.click(page, 'card-' + i, 'card ' + role); return i; };

  for (const loc of LOCS) {
    const tag = '[' + loc + ']';
    const { page, errs } = await L.open(1024, loc);
    /* ---- Level 1 ---- */
    await go(page, 'story', 0);
    is(sp(await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent)) === sp(await say(page, 'qWhole')), tag + ' the task line asks for the whole article');
    is(await count(page, '.hd-strip') === 3 && await count(page, '.hd-card') === 3, tag + ' three strips on the desk, three headline cards');
    await L.click(page, 'check', 'check');
    is(sp(await note(page)) === sp(await say(page, 'hintEmpty')) && (await S(page)).misses === 0, tag + ' no headline → hintEmpty, no miss');
    const det = await tap(page, 'detail');
    is((await S(page)).slot === det && await count(page, '.hd-slot.is-full') === 1 && await count(page, '.hd-card') === 2, tag + ' a real tap puts the card in the slot');
    await L.click(page, 'stapler', 'stapler');
    is((await S(page)).misses === 1 && await count(page, '.hd-strip.is-stapled') === 1 && await count(page, '.hd-crumple') === 2 && sp(await note(page)) === sp(await say(page, 'hintDetail')), tag + ' the stapler: one strip stapled, two blown onto the floor, hintDetail');
    await tap(page, 'neighbour');
    is((await S(page)).verdict === null && await count(page, '.hd-crumple') === 0 && await count(page, '.hd-card') === 2, tag + ' a new card swaps into the slot and clears the desk');
    await L.click(page, 'check', 'check');
    is((await S(page)).help && await count(page, '.hd-strip.is-stapled') === 0 && await count(page, '.hd-ul') >= 3 && sp(await note(page)) === sp(await say(page, 'hintMiss2')), tag + ' miss 2 (a neighbour staples nothing): thread words underlined in every strip, hintMiss2');
    await L.click(page, 'slot', 'slot');
    is((await S(page)).slot === null && await count(page, '.hd-card') === 3 && await count(page, '.hd-ul') === 0, tag + ' the slot gives its card back; the underlines go');
    const top = await tap(page, 'topic');
    await okMs(page, 500); await L.click(page, 'stapler', 'stapler'); await H.wait(900);
    const st = await S(page), want = await say(page, 'okWhole', { h: st.cards[top].text });
    is(st.done && await count(page, '.hd-strip.is-stapled') === 3 && await count(page, '.hd-paw') === 1 && await count(page, '.hd-slot.is-front') === 1, tag + ' the topic staples every strip: the front page and the paw stamp');
    is(sp(await L.bubble(page)) === sp(want), tag + ' success: «' + sp(await L.bubble(page)) + '»');
    is(await L.nextShown(page), tag + ' Next 0.5 s after the result');
    await okMs(page, 600000);
    /* ---- the keyboard: S presses, F fans ---- */
    await go(page, 'story', 1);
    await tap(page, 'detail');
    await page.evaluate(() => document.querySelector('.hd-wrap').focus()); await page.keyboard.press('s');
    is((await S(page)).misses === 1, tag + ' keyboard: S presses the stapler');
    await page.keyboard.press('f');
    is(await count(page, '.hd-wrap.is-breeze') === 1, tag + ' keyboard: F blows the fan');
    /* ---- Level 2 ---- */
    await go(page, 'two', 0);
    is(await count(page, '.hd-strip') === 4 && await count(page, '.hd-rule') === 1, tag + ' Level 2: four strips in two paragraphs');
    await tap(page, 'paragraph'); await L.click(page, 'check', 'check');
    is(await count(page, '.hd-strip.is-stapled') === 2 && await count(page, '.hd-crumple') === 2 && sp(await note(page)) === sp(await say(page, 'hintPara')), tag + ' Level 2: one paragraph stapled, the other blown away, hintPara');
    /* ---- Level 3 with 4 cards ---- */
    await go(page, 'one', 0, 4);
    is(await count(page, '.hd-strip.is-yellow') === 2 && await count(page, '.hd-card') === 4 && sp(await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent)) === sp(await say(page, 'qYellow')), tag + ' Level 3: the yellow paragraph, four cards, the yellow task line');
    await tap(page, 'other'); await L.click(page, 'check', 'check');
    is(await count(page, '.hd-stapler.is-jam') === 1 && await count(page, '.hd-strip.is-reach') === 2 && await count(page, '.hd-strip.is-stapled') === 0 && sp(await note(page)) === sp(await say(page, 'hintL3other')), tag + ' Level 3: the other paragraph jams the stapler, hintL3other');
    await tap(page, 'whole'); await L.click(page, 'check', 'check');
    is(sp(await note(page)) === sp(await say(page, 'hintMiss2Y')) && await count(page, '.hd-strip.is-yellow .hd-ul') >= 2 && await count(page, '.hd-strip:not(.is-yellow) .hd-ul') === 0, tag + ' Level 3 miss 2: the yellow strips are underlined, the plain ones are not');
    await go(page, 'one', 0, 4); await tap(page, 'whole'); await L.click(page, 'check', 'check');
    is(sp(await note(page)) === sp(await say(page, 'hintL3whole')), tag + ' Level 3: the whole article → hintL3whole');
    await go(page, 'one', 1, 3); await tap(page, 'detail'); await L.click(page, 'check', 'check');
    is(await count(page, '.hd-strip.is-stapled') === 1 && await count(page, '.hd-crumple') === 1 && sp(await note(page)) === sp(await say(page, 'hintL3detail')), tag + ' Level 3: a detail staples one yellow strip, the other blows off');
    const fit = await tap(page, 'fit'); await okMs(page, 500); await L.click(page, 'check', 'check'); await H.wait(900);
    const st3 = await S(page);
    is(st3.done && sp(await L.bubble(page)) === sp(await say(page, 'okYellow', { h: st3.cards[fit].text })), tag + ' Level 3 success: «' + sp(await L.bubble(page)) + '»');
    await okMs(page, 600000);
    is(errs.length === 0, tag + ' no console errors ' + errs.slice(0, 2).join(' | '));
    await page.close();

    /* ---- phones: every card and Check above the fold at rest (4 cards, every level); Next above the fold when solved ---- */
    { const { page: pw } = await L.open(360, loc);
      for (const w of [320, 360]) for (const lev of ['story', 'two', 'one']) {
        await pw.setViewport({ width: w, height: H.VH(w) }); await go(pw, lev, 0, 4); await H.wait(40);
        const m = await pw.evaluate(() => { const b = [...document.querySelectorAll('.hd-card,[data-k="check"],[data-k="stapler"]')].map((e) => e.getBoundingClientRect().bottom); return Math.max(...b); });
        is(m <= H.VH(w), `${loc} @${w} ${lev}: every card and Check above the fold (${Math.round(m)} / ${H.VH(w)})`);
      }
      for (const [w, lev, k] of [[360, 'two', 0], [320, 'two', 0], [320, 'one', 1]]) {
        await pw.setViewport({ width: w, height: H.VH(w) }); await go(pw, lev, k, 3); await okMs(pw, 500);
        await pw.evaluate((g) => { const a = window[g], C = window.HeadlineDeskCore; a._choose(a.st.cards.findIndex((c, i) => C.cardRight(a.st, i))); a._check(); }, G); await H.wait(900);
        await pw.evaluate(() => window.scrollTo(0, 0));
        const nb = await pw.evaluate(() => { const b = document.querySelector('.lcs-activity-next'); return b && b.offsetParent ? b.getBoundingClientRect().bottom : null; });
        is(nb != null && nb <= H.VH(w), `${loc} @${w} ${lev}: solved — Next above the fold (${Math.round(nb)} / ${H.VH(w)})`);
        await okMs(pw, 600000);
      }
      await pw.close(); }

    /* ---- the real press once (not fast-forwarded) ---- */
    if (loc === LOCS[0]) {
      const { page: p2 } = await L.open(1024, loc); await go(p2, 'story', 2);
      await p2.evaluate((g) => { window[g].FAST = false; }, G);
      await tap(p2, 'detail'); await L.click(p2, 'stapler', 'stapler'); await H.wait(100);
      is(await count(p2, '.hd-stapler.is-down') === 1, 'the real press: the stapler goes down');
      await p2.waitForFunction((g) => !window[g]._view.anim, { timeout: 5000 }, G);
      is(await count(p2, '.hd-crumple') === 2 && await count(p2, '.hd-stapler.is-down') === 0, 'the real press: then two strips lie on the floor');
      await p2.close();
    }

    /* ---- each state reached once, then resized ---- */
    const ev = (pg, src) => pg.evaluate((g, s) => (new Function('a', 'C', s))(window[g], window.HeadlineDeskCore), G, src);
    const pick = (role) => "a._choose(a.st.cards.findIndex(function(c){return c.role==='" + role + "'}));";
    const sweep = (name, reach) => L.sweep(loc, name, reach, { rest: true }, WIDTHS);
    await sweep('story rest 4 cards', async (pg) => { await go(pg, 'story', 3, 4); });
    await sweep('story miss 1', async (pg) => { await go(pg, 'story', 3, 3); await ev(pg, pick('detail') + 'a._check();'); });
    await sweep('two miss 2', async (pg) => { await go(pg, 'two', 6, 4); await ev(pg, pick('paragraph') + 'a._check();' + pick('neighbour') + 'a._check();'); });
    await sweep('one jam', async (pg) => { await go(pg, 'one', 9, 4); await ev(pg, pick('whole') + 'a._check();'); });
    await sweep('one miss 2', async (pg) => { await go(pg, 'one', 4, 4); await ev(pg, pick('detail') + 'a._check();' + pick('other') + 'a._check();'); });
  }
  await L.close();
  process.exit(L.C.report('local-test-headline-desk'));
})().catch((e) => { console.error(e); process.exit(1); });
