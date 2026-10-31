#!/usr/bin/env node
/* =====================================================================
   local-test-reason-sign.js — ACTIVITY #175, Pearl's Opinion Page
   (RI.2.8) → THE SIGN THAT STANDS ON ITS REASONS, in a real browser with
   real taps and the keyboard, in all 11 locales.
   Plumbing: scripts/lib/activity-harness.js.
   Scenarios per locale (1024):
     · at rest: the task line, Pearl's point on the sign, three cards, an
       empty socket; the tide with nothing placed is no miss;
     · a real tap on the restatement: it slides under the sign and shows
       NOTHING yet; the tide → a second copy of the sign on top, soaked,
       the shared words glowing, the restatement hint;
     · the copy tapped back; the off-topic card → a lonely post, the
       second miss puts the locale's bridge word in front of every card
       and under the sign, so the sign reads "<point> because <card>";
     · the reason → the sign lifts on its post, dry; the success line
       "<point> — <because> <reason>" (French elision), Next 0.5 s later,
       a token on the dunes, everything locked;
     · the speaker button; the keyboard (C = the tide);
     · Level 2: pick a card, then a sign; reasons under the wrong signs
       lean; under their own signs both stay dry; the bridge setting
       prints the word under each sign;
     · Level 3: one reason tilts the sign; two stand it level.
   Then on phones: the tide button above the fold at rest, the success
   line and Next above the fold when solved; each state reached ONCE and
   resized through 320…1366.
   Usage: node scripts/local-test-reason-sign.js [--locales=…] [--widths=…]
   ===================================================================== */
'use strict';
const H = require('./lib/activity-harness');
const LOCS = H.arg('locales', H.LOCALES.join(',')).split(',');
const WIDTHS = H.arg('widths', H.WIDTHS.join(',')).split(',').map(Number);
const G = 'PearlOpinionPageActivity', sp = H.sp;
/* my own bridge words (the gate's table), never the activity's */
const BECAUSE = { en: 'because', de: 'denn', fr: 'parce que', es: 'porque', pt: 'porque', it: 'perché', nl: 'want', sv: 'för', da: 'for', no: 'for', fi: 'koska' };
const bridge = (l, b) => (l === 'fr' && /^[aeiouyhàâéèêîôû]/i.test(b) ? 'parce qu’' + b : BECAUSE[l] + ' ' + b);

(async () => {
  const L = await H.local({ html: 'pearl-opinion-page-activity.html', id: 'pearl-opinion-page.back-it-up.ri-2-8', global: G, ready: '.ps-wrap' });
  const { is } = L.C;
  const S = (page) => page.evaluate((g) => JSON.parse(JSON.stringify(window[g].st)), G);
  const go = (page, level, bridgeOn, k) => page.evaluate((g, level, br, k) => { const a = window[g]; a.api.settings.level = level; a.api.settings.bridge = br ? 'on' : 'off'; a._start(k, 0, 0); a._render2(); }, G, level, bridgeOn, k);
  const say = (page, key, args) => page.evaluate((g, key, args) => window[g]._t(key, args || {}), G, key, args);
  const hint = (page) => page.evaluate(() => document.querySelector('[data-qa="hint"]').textContent);
  const count = (page, sel) => page.evaluate((s) => document.querySelectorAll(s).length, sel);
  const text = (page, sel) => page.evaluate((s) => [...document.querySelectorAll(s)].map((e) => e.textContent), sel);
  const cardOf = (s, role, point) => s.round.cards.find((c) => c.role === role && (!point || c.point === point));
  const D = (page, loc) => page.evaluate((l) => JSON.parse(JSON.stringify(ReasonSignData[l])), loc);

  for (const loc of LOCS) {
    const tag = '[' + loc + ']';
    const { page, errs } = await L.open(1024, loc);
    const data = await D(page, loc);
    /* ---- Level 1 at rest: the park sign ---- */
    await go(page, 'one', false, 0);
    let s = await S(page); const P = data.points.park;
    is(sp(await L.prompt(page)) === sp(await say(page, 'qOne')), tag + ' the task line asks which card backs up the point');
    is(sp((await text(page, '.ps-board'))[0]) === sp(P.p) && await count(page, '.ps-board') === 1, tag + ' Pearl\'s point painted on one sign');
    is(JSON.stringify((await text(page, 'button.ps-card')).map(sp)) === JSON.stringify(s.round.cards.map((c) => sp(c.t))) && await count(page, 'button.ps-card') === 3, tag + ' three cards in their slots');
    is(await count(page, '.ps-socket .ps-slot') === 1 && await count(page, '.ps-site.is-wet,.ps-site.is-up,.ps-board.is-copy') === 0 && await count(page, '.ps-because') === 0, tag + ' an empty socket, nothing tested, no bridge word');
    await L.click(page, 'tide', 'tide (empty)');
    is((await S(page)).misses === 0 && sp(await hint(page)) === sp(await say(page, 'hintEmpty')), tag + ' the tide with nothing placed: no miss, "slide a card under the sign first"');
    /* ---- the restatement ---- */
    const cs = cardOf(s, 'restate');
    await L.click(page, 'card-' + cs.id, 'restatement card');
    is(await count(page, '[data-k="card-' + cs.id + '"]') === 0 && sp((await text(page, '.ps-socket .ps-ptext'))[0] || '') === sp(cs.t), tag + ' a real tap slides the restatement under the sign');
    is(await count(page, '.ps-plank.is-post,.ps-plank.is-lonely,.ps-board.is-copy,.ps-site.is-wet') === 0, tag + ' before the tide the card shows nothing of what it is');
    await L.click(page, 'tide', 'tide (restatement)');
    s = await S(page);
    is(s.misses === 1 && !s.done && await count(page, '.ps-board.is-copy') === 1 && await count(page, '.ps-site.is-wet') === 1, tag + ' the tide: a second copy of the sign on top, soaked');
    is(sp((await text(page, '.ps-board.is-copy'))[0]) === sp(cs.t) && await count(page, '.ps-glow') >= 2, tag + ' the copy carries the restatement, the shared words glow');
    is(sp(await hint(page)) === sp(await say(page, 'hintRestate')), tag + ' the restatement hint');
    await L.click(page, '.ps-board.is-copy', 'the copy tapped back');
    is(await count(page, '[data-k="card-' + cs.id + '"]') === 1 && await count(page, '.ps-board.is-copy,.ps-site.is-wet') === 0, tag + ' the copy comes back to the tray, the beach dries');
    /* ---- the off-topic card: miss 2 and the because panel ---- */
    const co = cardOf(s, 'off');
    await L.click(page, 'card-' + co.id, 'off-topic card');
    await L.click(page, 'tide', 'tide (off-topic)');
    s = await S(page);
    is(s.misses === 2 && s.help && await count(page, '.ps-plank.is-lonely') === 1 && await count(page, '.ps-site.is-wet') === 1, tag + ' the off-topic card is a lonely post; the sign soaks');
    is(sp(await hint(page)) === sp(await say(page, 'hintOff') + ' ' + await say(page, 'hintMiss2')), tag + ' the off-topic hint and the because hint');
    const norm = (x) => sp(x).replace(/[\s ]+/g, ' ');
    const shown = (await text(page, 'button.ps-card')).map(norm);
    const want = s.round.cards.filter((c) => c.id !== co.id).map((c) => norm(bridge(loc, data.points[c.point].b[c.key])));
    is(shown.length === 2 && JSON.stringify(shown) === JSON.stringify(want) && await count(page, '.ps-because') === 1 && sp((await text(page, '.ps-because'))[0]) === BECAUSE[loc], tag + ' miss 2: "' + BECAUSE[loc] + '" in front of every card and under the sign');
    /* ---- the reason ---- */
    const cr = cardOf(s, 'reason');
    await L.click(page, '[data-k="sock-0"]', 'the lonely post tapped back');
    await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
    await L.click(page, 'card-' + cr.id, 'reason card');
    await L.click(page, 'tide', 'tide (reason)');
    s = await S(page);
    is(s.done && await count(page, '.ps-site.is-up') === 1 && await count(page, '.ps-plank.is-post') === 1 && await count(page, '.ps-site.is-wet') === 0, tag + ' the reason is a post: the sign lifts, dry');
    await H.wait(900);
    const okLine = sp(await say(page, 'okOne', { line: P.p.replace(/[.!]$/, '') + ' — ' + bridge(loc, data.points.park.b[cr.key]) })).replace(/[\s ]+/g, ' ');
    is(sp(await L.bubble(page)).replace(/[\s ]+/g, ' ') === okLine, tag + ' the success line: "' + okLine + '"');
    is(await L.nextShown(page), tag + ' Next 0.5 s after the result');
    is(await page.evaluate(() => [...document.querySelectorAll('.ps-card,.ps-socket,.ps-tidebtn')].every((b) => b.disabled || b.tagName !== 'BUTTON')) && await count(page, '.ps-dunes i') === 1, tag + ' everything locks; a token on the dunes');
    /* ---- the speaker, the keyboard ---- */
    await go(page, 'one', false, 3);
    await page.evaluate((g) => { window[g].OK_MS = 600000; }, G);
    await L.click(page, 'listen', 'speaker');
    is(await count(page, '.ps-listen.is-said') === 1 && (await S(page)).misses === 0, tag + ' the speaker reads the point and the cards (no tide)');
    await page.evaluate((g) => window[g]._wrap.focus(), G); await page.keyboard.press('c');
    is(sp(await hint(page)) === sp(await say(page, 'hintEmpty')), tag + ' C sends the tide');
    await page.focus('button.ps-card'); await page.keyboard.press('Enter');
    is((await S(page)).sockets[0].card !== null, tag + ' Enter on a card slides it under the sign');
    /* ---- Level 2 ---- */
    await go(page, 'two', true, 0);
    s = await S(page);
    is(sp(await L.prompt(page)) === sp(await say(page, 'qTwo')) && await count(page, '.ps-board') === 2 && await count(page, '.ps-because') === 2, tag + ' Level 2: two signs, the bridge word under each');
    is(JSON.stringify((await text(page, '.ps-because')).map(sp)) === JSON.stringify([BECAUSE[loc], BECAUSE[loc]]), tag + ' the bridge word is "' + BECAUSE[loc] + '"');
    const a = cardOf(s, 'reason', s.round.signs[0]), b = cardOf(s, 'reason', s.round.signs[1]);
    await L.click(page, 'card-' + a.id, 'pick reason A');
    is(await page.evaluate((id) => document.querySelector('[data-k="card-' + id + '"]').getAttribute('aria-pressed'), a.id) === 'true' && sp(await hint(page)) === sp(await say(page, 'hintPickSign')), tag + ' a card picked, "now tap the sign"');
    await L.click(page, 'sock-1', 'under sign B');
    await L.click(page, 'card-' + b.id, 'pick reason B'); await L.click(page, 'sock-0', 'under sign A');
    await L.click(page, 'tide', 'tide (crossed)');
    is((await S(page)).misses === 1 && await count(page, '.ps-plank.is-lean') === 2 && sp(await hint(page)) === sp(await say(page, 'hintWrong')), tag + ' reasons under the wrong signs lean (the other point\'s hint)');
    await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
    await L.click(page, 'sock-0', 'take B back'); await L.click(page, 'sock-1', 'take A back');
    await L.click(page, 'card-' + a.id, 'pick A'); await L.click(page, 'sock-0', 'A under A');
    await L.click(page, 'card-' + b.id, 'pick B'); await L.click(page, 'sock-1', 'B under B');
    await L.click(page, 'tide', 'tide (right)');
    is((await S(page)).done && await count(page, '.ps-site.is-up') === 2, tag + ' each reason under its own sign: both stand dry');
    await H.wait(900);
    is(sp(await L.bubble(page)) === sp(await say(page, 'okTwo')), tag + ' "both points are backed up"');
    /* ---- Level 3 ---- */
    await go(page, 'legs', false, 1);
    await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
    s = await S(page);
    is(sp(await L.prompt(page)) === sp(await say(page, 'qLegs')) && await count(page, '.ps-socket') === 2 && await count(page, 'button.ps-card') === 4, tag + ' Level 3: one sign, two sockets, four cards');
    const r = s.round.cards.filter((c) => c.role === 'reason');
    await L.click(page, 'card-' + r[0].id, 'one reason'); await L.click(page, 'tide', 'tide (one leg)');
    is(await count(page, '.ps-site.is-tilt') === 1 && sp(await hint(page)) === sp(await say(page, 'hintOneLeg')), tag + ' one reason: the sign tilts, "one strong leg"');
    await L.click(page, 'card-' + r[1].id, 'the other reason'); await L.click(page, 'tide', 'tide (two legs)');
    is((await S(page)).done && await count(page, '.ps-site.is-up') === 1 && await count(page, '.ps-plank.is-post') === 2, tag + ' two reasons: it stands level and dry');
    await H.wait(900);
    is(sp(await L.bubble(page)).replace(/[\s ]+/g, ' ') === sp(await say(page, 'okLegs', { r1: r[0].t, r2: r[1].t })).replace(/[\s ]+/g, ' '), tag + ' the two-reasons success line names both');
    /* ---- the real tide once ---- */
    if (loc === LOCS[0]) {
      await go(page, 'one', false, 2);
      await page.evaluate((g) => { window[g].FAST = false; window[g].OK_MS = 600000; }, G);
      const c0 = cardOf(await S(page), 'restate');
      await L.click(page, 'card-' + c0.id, 'restatement (real tide)'); await L.click(page, 'tide', 'tide (real)');
      await H.wait(150);
      is(await count(page, '.ps-wrap.is-tide') === 1 && await count(page, '.ps-board.is-copy') === 0 && await page.evaluate(() => document.querySelector('.ps-tidebtn').disabled), tag + ' the real tide: the wave rolls in first, the result after it');
      await H.wait(1500);
      is(await count(page, '.ps-board.is-copy') === 1 && await count(page, '.ps-wrap.is-tide') === 0 && await page.evaluate(() => !document.querySelector('.ps-tidebtn').disabled), tag + ' the water goes out: the copy shows, the button opens again');
      await page.evaluate((g) => { window[g].FAST = true; }, G);
    }
    is(errs.length === 0, tag + ' no console errors ' + errs.slice(0, 3).join(' | '));
    await page.close();

    /* ---- phones: the fold ---- */
    for (const w of [320, 360]) {
      const o = await L.open(w, loc);
      for (const [lv, k] of [['one', 0], ['one', 4], ['legs', 1], ['two', 2]]) {
        await go(o.page, lv, lv === 'two', k);
        const f = await o.page.evaluate(() => { window.scrollTo(0, 0); return { bottom: document.querySelector('.ps-tidebtn').getBoundingClientRect().bottom, vh: innerHeight }; });
        is(f.bottom <= f.vh, `${tag} @${w} ${lv} ${k}: the tide button above the fold (${Math.round(f.bottom)} / ${f.vh})`);
      }
      await go(o.page, 'one', false, 5);
      await o.page.evaluate((g) => { window[g].OK_MS = 500; const a = window[g], c = a.st.round.cards.find((x) => x.role === 'reason'); ReasonSignCore.place(a.st, c.id); a._paint(); }, G);
      await L.click(o.page, 'tide', 'tide');
      await H.wait(900);
      const f2 = await o.page.evaluate(() => { window.scrollTo(0, 0); const n = document.querySelector('.lcs-activity-next'), b = document.querySelector('.lcs-activity-bubble.show'); return { next: n ? n.getBoundingClientRect().bottom : 9999, bubble: b ? b.getBoundingClientRect().bottom : 9999, vh: innerHeight }; });
      is(f2.bubble <= f2.vh && f2.next <= f2.vh, `${tag} @${w}: solved — the success line and Next above the fold (${Math.round(f2.bubble)}, ${Math.round(f2.next)} / ${f2.vh})`);
      await o.page.close();
    }
    /* ---- each state once, resized through the widths ---- */
    const put = (p, role) => p.evaluate((g, role) => { const a = window[g], c = a.st.round.cards.find((x) => x.role === role); ReasonSignCore.place(a.st, c.id); a._tide(); }, G, role);
    await L.sweep(loc, 'rest', (p) => go(p, 'one', false, 6), {}, WIDTHS);
    await L.sweep(loc, 'copy', async (p) => { await go(p, 'one', false, 6); await put(p, 'restate'); }, {}, WIDTHS);
    await L.sweep(loc, 'help', async (p) => { await go(p, 'one', false, 6); await put(p, 'restate'); await put(p, 'off'); }, {}, WIDTHS);
    await L.sweep(loc, 'two', async (p) => { await go(p, 'two', true, 3); await p.evaluate((g) => { const a = window[g], cs = a.st.round.cards; ReasonSignCore.place(a.st, cs.find((c) => c.role === 'reason' && c.point === a.st.round.signs[1]).id, 0); ReasonSignCore.place(a.st, cs.find((c) => c.role === 'off').id, 1); a._tide(); }, G); }, {}, WIDTHS);
    await L.sweep(loc, 'legs', async (p) => { await go(p, 'legs', false, 7); await put(p, 'reason'); }, {}, WIDTHS);
  }
  await L.close();
  process.exit(L.C.report('local-test-reason-sign'));
})().catch((e) => { console.error(e); process.exit(1); });
