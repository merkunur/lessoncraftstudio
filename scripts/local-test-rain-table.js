#!/usr/bin/env node
/* =====================================================================
   local-test-rain-table.js — ACTIVITY #172, The Rain Table ("Make Thirds",
   2.G.A.3), in a real browser with real taps and the keyboard, in all 11
   locales. Plumbing: scripts/lib/activity-harness.js.
   Scenarios per locale (1024):
     · Check with no wall → a reminder, no miss; a real tap on a notch puts
       a wall up (aria-checked), a second tap lifts it;
     · two parts for thirds → a count miss (two tubes over, one dry);
       an unequal set → miss 2: dotted walls + glowing marks, the ghost
       hint; a new wall clears the help; the right walls → every tube at
       the line, the success line, Next 0.5 s;
     · the keyboard (Enter / Space on a mark); a fifth wall refused;
     · the classic mistakes read out by the tubes: the circle "peace sign"
       (one over, two under), triangle strips at equal heights (under, at,
       over); four parts on three tubes → the puddle tray;
     · the square surprise → the surprise line; the settings (2 / 4 tubes,
       the paint pot); the color step with real taps inside the parts.
   Then: every mark of the dense circle and oval reached by a real tap at
   320 (the nearest mark wins), a press-and-slide, the real rain once, and
   each state reached ONCE per locale and resized through 320…1366 with
   Check above the fold.
   Usage: node scripts/local-test-rain-table.js [--locales=…] [--widths=…]
   ===================================================================== */
'use strict';
const H = require('./lib/activity-harness');
const LOCS = H.arg('locales', H.LOCALES.join(',')).split(',');
const WIDTHS = H.arg('widths', H.WIDTHS.join(',')).split(',').map(Number);
const G = 'RainTableActivity', sp = H.sp;

(async () => {
  const L = await H.local({ html: 'rain-table-activity.html', id: 'fractions.partition-thirds.2-g-a-3', global: G, ready: '.rt-wrap' });
  const { is } = L.C;
  const S = (page) => page.evaluate((g) => JSON.parse(JSON.stringify(window[g].st)), G);
  const go = async (page, n, k, colour) => { await page.evaluate((g, n, k, colour) => { const a = window[g]; a.api.settings.parts = String(n); a.api.settings.colour = colour ? 'on' : 'off'; a._pool = null; a._ensurePool(); a._start(k, 0); a._render2(); }, G, n, k, colour); await H.wait(60); };
  const note = (page) => page.evaluate(() => document.querySelector('[data-qa="note"]').textContent);
  const say = (page, key, args) => page.evaluate((g, key, args) => window[g]._t(key, args || {}), G, key, args);
  const okMs = (page, ms) => page.evaluate((g, ms) => { window[g].OK_MS = ms; }, G, ms);
  const count = (page, sel) => page.evaluate((s) => document.querySelectorAll(s).length, sel);
  const tubes = (page) => page.evaluate(() => Array.from(document.querySelectorAll('.rt-tube')).map((t) => t.getAttribute('data-state')).join(','));
  const walls = async (page, ids) => { for (const id of ids) await L.click(page, 'w-' + id, 'wall ' + id); };
  const aria = (page, id) => page.evaluate((id) => document.querySelector('[data-k="w-' + id + '"]').getAttribute('aria-checked'), id);
  /* a real tap at the screen point of a part's centre (the color step) */
  const tapPart = async (page, i) => {
    const xy = await page.evaluate((g, i) => { const a = window[g], p = window.RainTableCore.partsNow(a.st)[i], svg = document.querySelector('.rt-table'), m = svg.getScreenCTM(), q = svg.createSVGPoint(); q.x = p.c[0]; q.y = p.c[1]; const r = q.matrixTransform(m); return [r.x, r.y]; }, G, i);
    await page.mouse.click(xy[0], xy[1]); await H.wait(20);
  };

  for (const loc of LOCS) {
    const tag = '[' + loc + ']';
    const { page, errs } = await L.open(1024, loc);
    /* ---- thirds, the square with notches ---- */
    await go(page, 3, 3);
    is(sp(await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent)) === sp(await say(page, 'qMake', { n: 3, fp: await page.evaluate((g) => window[g]._frac().plural[3], G) })), tag + ' the task line asks for 3 equal parts');
    await L.click(page, 'check', 'check');
    is(sp(await note(page)) === sp(await say(page, 'hintStart')) && (await S(page)).misses === 0, tag + ' no wall → hintStart, no miss');
    await walls(page, ['top:6']);
    is((await S(page)).walls.join() === 'top:6' && await aria(page, 'top:6') === 'true' && await count(page, '.rt-wall') === 1, tag + ' a real tap on a notch puts a wall up');
    await L.click(page, 'check', 'check');
    is((await S(page)).misses === 1 && await tubes(page) === 'over,over,dry' && sp(await note(page)) === sp(await say(page, 'hintCount', { n: 3 })), tag + ' halves for thirds → a count miss: two tubes over, one dry (' + await tubes(page) + ')');
    await walls(page, ['top:6']);
    is((await S(page)).walls.length === 0 && await aria(page, 'top:6') === 'false' && (await S(page)).verdict === null, tag + ' a second tap lifts the wall and empties the tubes');
    await walls(page, ['top:3', 'top:7']); await L.click(page, 'check', 'check');
    let s = await S(page);
    is(s.misses === 2 && s.help && await count(page, '.rt-ghost') === 2 && await count(page, '.rt-mark.is-ghost') === 2 && sp(await note(page)) === sp(await say(page, 'hintGhost')), tag + ' miss 2 → two dotted walls, their notches glow, hintGhost');
    is(await count(page, '.rt-spill') >= 1 && await count(page, '.rt-gap') >= 1, tag + ' miss 2: a tube spills and a tube shows its gap');
    await walls(page, ['top:3']);
    is(await count(page, '.rt-ghost') === 0 && !(await S(page)).help, tag + ' a new wall clears the help');
    await walls(page, ['top:7', 'top:4', 'top:8']);
    await okMs(page, 500); await L.click(page, 'check', 'check'); await H.wait(900);
    s = await S(page);
    is(s.done && await tubes(page) === 'at,at,at', tag + ' walls at 4/12 and 8/12 → every tube at the gold line');
    is(sp(await L.bubble(page)).indexOf(sp(await say(page, 'okThirds'))) >= 0, tag + ' success: ' + sp(await L.bubble(page)));
    is(await L.nextShown(page), tag + ' Next 0.5 s after the result');
    is(await count(page, '.rt-rainbow') === 1, tag + ' the rainbow arcs over the table');
    await okMs(page, 600000);
    /* ---- the keyboard; four walls at most ---- */
    await go(page, 3, 0);
    await page.evaluate(() => document.querySelector('[data-k="w-p:0"]').focus()); await page.keyboard.press('Enter');
    is((await S(page)).walls.join() === 'p:0', tag + ' keyboard: Enter on a peg puts a wall up');
    await page.evaluate(() => document.querySelector('[data-k="w-p:0"]').focus()); await page.keyboard.press(' ');
    is((await S(page)).walls.length === 0, tag + ' keyboard: Space lifts it');
    await walls(page, ['p:0', 'p:4', 'p:8', 'p:12', 'p:16']);
    is((await S(page)).walls.length === 4 && sp(await note(page)) === sp(await say(page, 'hintTooMany')), tag + ' a fifth wall is refused: hintTooMany');
    /* ---- the classic mistakes, read out by the tubes ---- */
    await go(page, 3, 0); await walls(page, ['p:0', 'p:12', 'p:6']); await L.click(page, 'check', 'check');
    is((await tubes(page)).split(',').sort().join() === 'over,under,under' && sp(await note(page)) === sp(await say(page, 'hintUnequal')), tag + ' the peace sign: one tube over, two under, hintUnequal (' + await tubes(page) + ')');
    await go(page, 3, 1); await walls(page, ['side:2', 'side:4']); await L.click(page, 'check', 'check');
    is((await tubes(page)).split(',').sort().join() === 'at,over,under', tag + ' triangle strips at equal heights: under, at, over (' + await tubes(page) + ')');
    await go(page, 3, 3); await walls(page, ['top:3', 'top:6', 'top:9']); await L.click(page, 'check', 'check');
    is(await count(page, '.rt-pool') === 1 && sp(await note(page)) === sp(await say(page, 'hintCount', { n: 3 })), tag + ' four parts on three tubes: the fourth runs into the puddle tray');
    /* ---- the surprise ---- */
    await go(page, 3, 7); await walls(page, ['p:0', 'p:8', 'p:16']); await okMs(page, 500); await L.click(page, 'check', 'check'); await H.wait(900);
    is((await S(page)).done && sp(await L.bubble(page)).indexOf(sp(await say(page, 'okSurprise'))) >= 0, tag + ' the square surprise → «' + sp(await L.bubble(page)) + '»');
    await okMs(page, 600000);
    /* ---- the settings: the rack shows 2 / 4 tubes; color on adds the paint pot ---- */
    await go(page, 2, 0); is(await count(page, '.rt-tube') === 2 && await count(page, '.rt-pot') === 0, tag + ' halves: two tubes');
    await go(page, 4, 0, true); is(await count(page, '.rt-tube') === 4 && await count(page, '.rt-pot') === 1, tag + ' fourths + color: four tubes and the paint pot');
    /* ---- the color step (real taps inside the parts) ---- */
    await go(page, 3, 1, true); await walls(page, ['p:0', 'p:4', 'p:8']); await L.click(page, 'check', 'check');
    s = await S(page);
    is(s.step === 'colour' && !s.done && sp(await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent)) === sp(await say(page, 'qColour', { k: 2, n: 3 })), tag + ' equal thirds + color on → «' + sp(await say(page, 'qColour', { k: 2, n: 3 })) + '»');
    await tapPart(page, 0);
    is((await S(page)).coloured.join() === '0' && await page.evaluate(() => document.querySelector('[data-k="part-0"]').getAttribute('aria-checked')) === 'true', tag + ' a real tap inside a part colors it');
    await L.click(page, 'check', 'check');
    is((await S(page)).cmisses === 1 && sp(await note(page)) === sp(await say(page, 'hintColour', { k: 2 })), tag + ' one colored for 2 of 3 → hintColour');
    await tapPart(page, 2); await okMs(page, 500); await L.click(page, 'check', 'check'); await H.wait(900);
    const want = await say(page, 'okColour', { k: 2, n: 3, frac: await page.evaluate((g) => window[g]._frac().amount['2/3'], G) });
    is((await S(page)).done && sp(await L.bubble(page)) === sp(want), tag + ' two of three colored → «' + sp(await L.bubble(page)) + '»');
    await okMs(page, 600000);
    is(errs.length === 0, tag + ' no console errors ' + errs.slice(0, 2).join(' | '));
    await page.close();

    /* ---- a phone: every mark of the dense circle and oval reached by a real tap (the nearest mark wins) ---- */
    if (loc === LOCS[0] || loc === 'fi') {
      const { page: pp } = await L.open(320, loc);
      for (const [n, k] of [[3, 0], [3, 6]]) {
        await go(pp, n, k); const ids = (await S(pp)).offered.map((w) => w.id); let missed = [];
        for (const id of ids) {
          const xy = await pp.evaluate((id) => { const g = document.querySelector('[data-k="w-' + id + '"]'), r = g.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }, id);
          await pp.mouse.click(xy[0], xy[1]); await H.wait(10);
          const w = (await S(pp)).walls; if (w.join() !== id) missed.push(id + '→' + w.join('+'));
          if (w.length) await pp.evaluate((g, id) => window[g]._toggle(id), G, w[0]);
        }
        is(missed.length === 0, `${loc} @320 ${n}/${k}: all ${ids.length} marks reached by a real tap (${missed.slice(0, 4)})`);
      }
      /* press on one peg, slide to another, release: the one under the finger at release wins */
      await go(pp, 3, 0);
      const at = (id) => pp.evaluate((id) => { const r = document.querySelector('[data-k="w-' + id + '"]').getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }, id);
      const a = await at('p:2'), b = await at('p:5');
      await pp.mouse.move(a[0], a[1]); await pp.mouse.down();
      is(await pp.evaluate(() => document.querySelector('.rt-hover').style.display !== 'none'), loc + ' @320 press: the highlight shows the peg under the finger');
      for (let i = 1; i <= 8; i++) await pp.mouse.move(a[0] + (b[0] - a[0]) * i / 8, a[1] + (b[1] - a[1]) * i / 8);
      await pp.mouse.up(); await H.wait(20);
      is((await S(pp)).walls.join() === 'p:5', loc + ' @320 press-and-slide: the peg at release gets the wall (' + (await S(pp)).walls + ')');
      await pp.close();
    }

    /* ---- a phone: Check shares its row with the tubes (a long Check label once wrapped it under the rack and past the fold) ---- */
    { const { page: pw } = await L.open(360, loc);
      for (const w of [320, 360]) { await pw.setViewport({ width: w, height: H.VH(w) }); await go(pw, 4, 1, true); await H.wait(60);
        const r = await pw.evaluate(() => { const c = document.querySelector('[data-k="check"]').getBoundingClientRect(), k = document.querySelector('.rt-racksvg').getBoundingClientRect(); return { cTop: c.top, kBottom: k.bottom, cLeft: c.left, kRight: k.right }; });
        is(r.cTop < r.kBottom && r.cLeft > r.kRight, `${loc} @${w}: Check sits beside the four tubes and the paint pot, not under them`); }
      /* solved: the success line and Next fit above the fold (the visual check found Next below it) */
      for (const [w, k] of [[360, 0], [320, 0], [360, 7], [320, 7]]) {
        await pw.setViewport({ width: w, height: H.VH(w) }); await go(pw, 3, k); await okMs(pw, 500);
        await pw.evaluate((g) => { const a = window[g]; a.st.round.ghost.forEach((id) => a._toggle(id)); a._check(); }, G); await H.wait(900);
        await pw.evaluate(() => window.scrollTo(0, 0));
        const nb = await pw.evaluate(() => { const b = document.querySelector('.lcs-activity-next'); return b && b.offsetParent ? b.getBoundingClientRect().bottom : null; });
        is(nb != null && nb <= H.VH(w), `${loc} @${w} round ${k}: solved — Next above the fold (${Math.round(nb)} / ${H.VH(w)})`);
        await okMs(pw, 600000);
      }
      await pw.close(); }

    /* ---- the real rain once (not fast-forwarded) ---- */
    if (loc === LOCS[0]) {
      const { page: p2 } = await L.open(1024, loc); await go(p2, 3, 4);
      await p2.evaluate((g) => { window[g].FAST = false; }, G);
      await walls(p2, ['top:4', 'top:8']); await L.click(p2, 'check', 'check'); await H.wait(150);
      is(await count(p2, '.rt-drop') > 40 && await count(p2, '.rt-cloud') === 1 && await count(p2, '.rt-water.is-filling') === 3, 'the real rain: a cloud, drops over the table, three tubes filling');
      is(await p2.evaluate(() => document.querySelector('[data-k="check"]').disabled), 'the real rain: Check waits while it rains');
      await p2.waitForFunction((g) => !window[g]._view.rain, { timeout: 8000 }, G);
      is((await S(p2)).done && await count(p2, '.rt-drop') === 0 && await tubes(p2) === 'at,at,at', 'the real rain: then every tube stands at the line');
      await p2.close();
    }

    /* ---- each state reached once, then resized ---- */
    const ev = (pg, src) => pg.evaluate((g, s) => (new Function('a', 'C', s))(window[g], window.RainTableCore), G, src);
    const sweep = (name, reach) => L.sweep(loc, name, reach, { rest: true }, WIDTHS);
    await sweep('circle rest', async (pg) => { await go(pg, 3, 0); });
    await sweep('circle miss 2', async (pg) => { await go(pg, 3, 0); await ev(pg, "['p:0','p:12','p:6'].forEach(function(id){a._toggle(id)}); a._check(); a._check();"); });
    await sweep('turned square miss 1', async (pg) => { await go(pg, 3, 5); await ev(pg, "['ll:1','ll:4'].forEach(function(id){a._toggle(id)}); a._check();"); });
    await sweep('tall rectangle rest', async (pg) => { await go(pg, 3, 8); });
    await sweep('oval miss 2', async (pg) => { await go(pg, 3, 6); await ev(pg, "['top:3','left:6'].forEach(function(id){a._toggle(id)}); a._check(); a._check();"); });
    await sweep('color step', async (pg) => { await go(pg, 4, 1, true); await ev(pg, "['top:6','left:6'].forEach(function(id){a._toggle(id)}); a._check(); a._colour(0); a._check(); a._check();"); });
    await sweep('fourths hexagon miss 1', async (pg) => { await go(pg, 4, 5); await ev(pg, "['p:0','p:4','p:8','p:10'].forEach(function(id){a._toggle(id)}); a._check();"); });
  }
  await L.close();
  process.exit(L.C.report('local-test-rain-table'));
})().catch((e) => { console.error(e); process.exit(1); });
