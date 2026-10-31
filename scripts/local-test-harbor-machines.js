#!/usr/bin/env node
/* =====================================================================
   local-test-harbor-machines.js — ACTIVITY #174, The Harbor Post
   (RI.2.6), in a real browser with real taps and the keyboard, in all 11
   locales. Plumbing: scripts/lib/activity-harness.js.
   Scenarios per locale (1024):
     · at rest: the task line, the note's sentences, three machines under
       their signs, no shapes on the note, nothing lit;
     · a real tap on a machine that powers nothing / one sentence: a miss,
       the posted machine sputters with exactly that many parts lit, a
       shape on every sentence (the machine it would power), the hint
       that says how many powered it;
     · a second miss: every machine shows its own count at once, the
       count hint; the right machine → it runs, the success line with the
       note's own words (and the "little extra" line on a mostly note),
       Next 0.5 s later;
     · the keyboard: 1 / 2 / 3 post; a tap on a sentence reads it aloud
       (it is marked while it speaks);
     · the settings: two machines (no crane), Mostly … (three sentences);
       the real reading once (sentence by sentence, machines locked).
   Then on phones: every machine above the fold at rest, the success line
   and Next above the fold when solved; each state reached ONCE and
   resized through 320…1366.
   Usage: node scripts/local-test-harbor-machines.js [--locales=…] [--widths=…]
   ===================================================================== */
'use strict';
const H = require('./lib/activity-harness');
const LOCS = H.arg('locales', H.LOCALES.join(',')).split(',');
const WIDTHS = H.arg('widths', H.WIDTHS.join(',')).split(',').map(Number);
const G = 'AuthorPurposeActivity', sp = H.sp;
const KIND = { inform: 'fact', entertain: 'story', instruct: 'step' };
const FILL = { inform: '#D99A12', entertain: '#C8433A', instruct: '#2F6FB0' };

(async () => {
  const L = await H.local({ html: 'author-purpose-activity.html', id: 'author-purpose.why-wrote.ri-2-6', global: G, ready: '.hm-wrap' });
  const { is } = L.C;
  const S = (page) => page.evaluate((g) => JSON.parse(JSON.stringify(window[g].st)), G);
  const go = (page, notes, machines, id) => page.evaluate((g, notes, machines, id) => { const a = window[g]; a.api.settings.notes = notes; a.api.settings.machines = machines; a._pool = null; a._ensurePool(); const k = a._pool.findIndex((n) => n.id === id); a._start(k < 0 ? 0 : k); a._render2(); }, G, notes, machines, id);
  const say = (page, key, args) => page.evaluate((g, key, args) => window[g]._t(key, args || {}), G, key, args);
  const hint = (page) => page.evaluate(() => document.querySelector('[data-qa="hint"]').textContent);
  const count = (page, sel) => page.evaluate((s) => document.querySelectorAll(s).length, sel);
  /* the lit parts of each machine, read off the drawn shapes (filled in the machine's own colour) */
  const lit = (page) => page.evaluate((FILL) => { const o = {}; for (const m of Object.keys(FILL)) { const b = document.querySelector('[data-k="mach-' + m + '"]'); if (!b) continue; o[m] = [...b.querySelectorAll('.hm-part')].filter((s) => { const f = s.querySelector('[fill]'); return f && f.getAttribute('fill').toUpperCase() === FILL[m]; }).length; } return o; }, FILL);
  const powered = (note, m) => note.s.filter((x) => x.r === KIND[m]).length;

  for (const loc of LOCS) {
    const tag = '[' + loc + ']';
    const { page, errs } = await L.open(1024, loc);
    /* ---- at rest: the snails (mostly facts, one tip at the end) ---- */
    await go(page, 'mostly', 'three', 'i5');
    let s = await S(page); const note = s.note;
    is(sp(await L.prompt(page)) === sp(await say(page, 'qWhy')), tag + ' the task line asks why the author wrote the note');
    is(await count(page, '.hm-line') === note.s.length && await count(page, '.hm-mach') === 3, tag + ' the note\'s sentences, three machines');
    const signs = await page.evaluate(() => [...document.querySelectorAll('.hm-sign')].map((e) => e.textContent));
    is(JSON.stringify(signs) === JSON.stringify(await page.evaluate((g) => { const a = window[g], L = HarborMachinesData[a._loc()].labels; return [L.inform, L.entertain, L.instruct]; }, G)), tag + ' the three signs, in order');
    is(await count(page, '.hm-dot svg') === 0 && JSON.stringify(await lit(page)) === '{"inform":0,"entertain":0,"instruct":0}', tag + ' at rest: no shapes, nothing lit');
    /* ---- miss 1: the stage powers nothing ---- */
    await L.click(page, 'mach-entertain', 'stage');
    s = await S(page);
    is(s.misses === 1 && !s.done && !s.help, tag + ' a real tap on the stage: a miss');
    is(sp(await hint(page)) === sp(await say(page, 'hintNone')), tag + ' the hint says no sentence powered it');
    is((await lit(page)).entertain === 0 && await count(page, '.hm-mach.is-sputter') === 1, tag + ' the stage sputters with nothing lit');
    is(await count(page, '.hm-dot svg') === note.s.filter((x) => x.r !== 'none').length, tag + ' every sentence shows the shape of the machine it would power');
    /* ---- miss 2: the crane powers one sentence ---- */
    await L.click(page, 'mach-instruct', 'crane');
    s = await S(page); let lt = await lit(page);
    is(s.misses === 2 && s.help && sp(await hint(page)) === sp(await say(page, 'hintMiss2')), tag + ' a second miss: the help, the count hint');
    is(lt.instruct === powered(note, 'instruct') && lt.entertain === 0 && lt.inform === 3, tag + ' every machine shows its own count at once (' + JSON.stringify(lt) + ')');
    /* ---- the right machine ---- */
    await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
    await L.click(page, 'mach-inform', 'lighthouse');
    s = await S(page);
    is(s.done && await count(page, '.hm-mach.hm-inform.is-run') === 1 && (await lit(page)).inform === 3, tag + ' the lighthouse runs, all three lamps lit');
    await H.wait(900);
    const okLine = sp(await say(page, 'okInform', { w: note.w }) + ' ' + await say(page, 'mostlyLast'));
    is(sp(await L.bubble(page)) === okLine, tag + ' the success line with the note\'s own words and the little-extra line');
    is(await L.nextShown(page), tag + ' Next 0.5 s after the result');
    is(await page.evaluate(() => [...document.querySelectorAll('.hm-mach')].every((b) => b.disabled)), tag + ' the machines lock when solved');
    /* ---- a pure Level 1 story, by the keyboard ---- */
    await go(page, 'first', 'three', 'e7');
    await page.evaluate((g) => { window[g].OK_MS = 600000; window[g]._wrap.focus(); }, G);
    await page.keyboard.press('3'); s = await S(page);
    is(s.posted === 'instruct' && s.misses === 1 && sp(await hint(page)) === sp(await say(page, 'hintNone')), tag + ' key 3 posts to the crane: a miss');
    await page.keyboard.press('2'); s = await S(page);
    is(s.done && s.posted === 'entertain', tag + ' key 2 posts to the stage: it runs');
    /* ---- a one-sentence miss: hintOne ---- */
    await go(page, 'mostly', 'three', 'e6');
    await L.click(page, 'mach-inform', 'lighthouse');
    is((await S(page)).misses === 1 && (await lit(page)).inform === 1 && sp(await hint(page)) === sp(await say(page, 'hintOne')), tag + ' the goat note in the lighthouse: one lamp, "only one sentence"');
    /* ---- tap a sentence: it is read aloud ---- */
    await go(page, 'first', 'three', 'i1');
    await L.click(page, '.hm-line[data-i="1"]', 'sentence 2');
    is(await count(page, '.hm-line.is-said[data-i="1"]') === 1 && (await S(page)).misses === 0, tag + ' a tap on a sentence reads it aloud (no post)');
    await page.focus('.hm-line[data-i="0"]'); await page.keyboard.press('Enter');
    is(await count(page, '.hm-line.is-said[data-i="0"]') === 1, tag + ' Enter on a sentence reads it aloud');
    /* ---- settings ---- */
    await go(page, 'first', 'two', 'i1');
    is(await count(page, '.hm-mach') === 2 && await count(page, '[data-k="mach-instruct"]') === 0 && (await page.evaluate((g) => window[g]._pool.length, G)) === 8, tag + ' two machines: no crane, 8 notes');
    await page.evaluate((g) => window[g]._wrap.focus(), G); await page.keyboard.press('3');
    is((await S(page)).misses === 0, tag + ' key 3 does nothing without a crane');
    await go(page, 'mostly', 'three', 'i4');
    is(await count(page, '.hm-line') === 3, tag + ' Mostly …: a three-sentence note');
    /* ---- the real reading, once ---- */
    if (loc === LOCS[0]) {
      await go(page, 'first', 'three', 'i7');
      await page.evaluate((g) => { window[g].FAST = false; }, G);
      await L.click(page, 'mach-entertain', 'stage (real reading)');
      await H.wait(260);
      is(await count(page, '.hm-line.is-reading') === 1 && await page.evaluate(() => [...document.querySelectorAll('.hm-mach')].every((b) => b.disabled)), tag + ' the real reading: one sentence at a time, the machines locked');
      await H.wait(900);
      is((await S(page)).misses === 1 && await count(page, '.hm-line.is-reading') === 0 && await page.evaluate(() => [...document.querySelectorAll('.hm-mach')].every((b) => !b.disabled)), tag + ' the reading ends: a miss, the machines open again');
      await page.evaluate((g) => { window[g].FAST = true; }, G);
    }
    is(errs.length === 0, tag + ' no console errors ' + errs.slice(0, 3).join(' | '));
    await page.close();

    /* ---- phones: the fold ---- */
    for (const w of [320, 360]) {
      const o = await L.open(w, loc);
      for (const id of ['i4', 'e5', 's6']) {
        await go(o.page, 'mostly', 'three', id);
        const f = await o.page.evaluate(() => { window.scrollTo(0, 0); const ms = [...document.querySelectorAll('.hm-mach')]; return { bottom: Math.max.apply(null, ms.map((m) => m.getBoundingClientRect().bottom)), vh: innerHeight }; });
        is(f.bottom <= f.vh, `${tag} @${w} ${id}: every machine above the fold (${Math.round(f.bottom)} / ${f.vh})`);
      }
      await go(o.page, 'mostly', 'three', 'e6');
      await o.page.evaluate((g) => { window[g].OK_MS = 500; }, G);
      await L.click(o.page, 'mach-entertain', 'stage');
      await H.wait(900);
      const f2 = await o.page.evaluate(() => { window.scrollTo(0, 0); const n = document.querySelector('.lcs-activity-next'), b = document.querySelector('.lcs-activity-bubble.show'); return { next: n ? n.getBoundingClientRect().bottom : 9999, bubble: b ? b.getBoundingClientRect().bottom : 9999, vh: innerHeight }; });
      is(f2.bubble <= f2.vh && f2.next <= f2.vh, `${tag} @${w}: solved — the success line and Next above the fold (${Math.round(f2.bubble)}, ${Math.round(f2.next)} / ${f2.vh})`);
      await o.page.close();
    }
    /* ---- each state once, resized through the widths ---- */
    await L.sweep(loc, 'rest', (p) => go(p, 'mostly', 'three', 'e5'), {}, WIDTHS);
    await L.sweep(loc, 'miss', async (p) => { await go(p, 'mostly', 'three', 'e5'); await p.evaluate((g) => window[g]._post('inform'), G); }, { miss: true }, WIDTHS);
    await L.sweep(loc, 'help', async (p) => { await go(p, 'mostly', 'three', 'e5'); await p.evaluate((g) => { window[g]._post('inform'); window[g]._post('instruct'); }, G); }, { miss: true }, WIDTHS);
    await L.sweep(loc, 'two', (p) => go(p, 'first', 'two', 'e1'), {}, WIDTHS);
  }
  await L.close();
  process.exit(L.C.report('local-test-harbor-machines'));
})().catch((e) => { console.error(e); process.exit(1); });
