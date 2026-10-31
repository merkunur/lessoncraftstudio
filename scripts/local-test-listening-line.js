#!/usr/bin/env node
/* =====================================================================
   local-test-listening-line.js — ACTIVITY #176, Dr. Plume's Sentence
   Clinic (L.2.1 · L.2.2) → THE LISTENING LINE, in a real browser with real
   taps and the keyboard, in all 11 locales.
   Plumbing: scripts/lib/activity-harness.js.
   Scenarios per locale (1024):
     · Level 2 at rest: the task line, the run of words, three tools; a
       check with nothing done is no miss;
     · the end mark only → the line knots at the seam (the knot hint);
       again → the seam spotlit and the scissors wiggling;
     · scissors in the seam → a pause; the right mark in it → the next
       word's capital rises by itself (es: ¿ opens a question by itself);
       Check → every end rests or holds open, the success line with the
       cured text, Next 0.5 s later, the bed sits up;
     · Level 1: three end gaps only; wrong marks → three kinks; the right
       marks → cured;
     · Level 3: change a word (the wheel), add a word (the caret), take a
       word out, swap words into order, "!" — each cured by real taps;
     · the tune setting; the keyboard (Esc puts a tool down, Ctrl+Enter
       checks).
   Then on phones: Check above the fold at rest, the success line and Next
   above the fold when solved; each state reached ONCE and resized
   through 320…1366.
   Usage: node scripts/local-test-listening-line.js [--locales=…] [--widths=…]
   ===================================================================== */
'use strict';
const H = require('./lib/activity-harness');
const LOCS = H.arg('locales', H.LOCALES.join(',')).split(',');
const WIDTHS = H.arg('widths', H.WIDTHS.join(',')).split(',').map(Number);
const G = 'SentenceClinicActivity', sp = H.sp;
const MARK = { T: '.', A: '?', E: '!' };
const norm = (s) => sp(s).replace(/[\s ]+/g, ' ');

(async () => {
  const L = await H.local({ html: 'sentence-clinic-activity.html', id: 'sentence-clinic.fix-it.l-2-1', global: G, ready: '.sc-wrap' });
  const { is } = L.C;
  const S = (page) => page.evaluate((g) => JSON.parse(JSON.stringify(window[g].st)), G);
  const go = (page, level, k, line) => page.evaluate((g, level, k, line) => { const a = window[g]; a.api.settings.level = level; a.api.settings.line = line || 'check'; a._ensurePool(); a._start(k); a._render2(); }, G, level, k, line);
  const say = (page, key, args) => page.evaluate((g, key, args) => window[g]._t(key, args || {}), G, key, args);
  const hint = (page) => page.evaluate(() => document.querySelector('[data-qa="hint"]').textContent);
  const count = (page, sel) => page.evaluate((s) => document.querySelectorAll(s).length, sel);
  const tiles = (page) => page.evaluate(() => [...document.querySelectorAll('.sc-tile')].map((e) => e.textContent));
  /* tap a tool only if it is not already held */
  const hold = async (page, t, tag) => { const held = await page.evaluate((t) => { const b = document.querySelector('[data-k="tool-' + t + '"]'); return b && b.classList.contains('is-held'); }, t); if (!held) await L.click(page, 'tool-' + t, tag); };

  for (const loc of LOCS) {
    const tag = '[' + loc + ']';
    const { page, errs } = await L.open(1024, loc);
    /* ---- Level 2 at rest ---- */
    await go(page, 'two', 0);
    let s = await S(page); const r = s.round, seam = r.units[0].to, end = r.tokens.length - 1;
    is(sp(await L.prompt(page)) === sp(await say(page, 'qTwo')), tag + ' the task line asks where the first sentence stops');
    is(JSON.stringify((await tiles(page)).map(sp)) === JSON.stringify(r.tokens.map((t, i) => (i === 0 ? t : t))), tag + ' the run of words, unmarked');
    is(await count(page, '.sc-tool') === 3 && await count(page, '.sc-end.is-drawn') === 0, tag + ' three tools, no line drawn yet');
    await L.click(page, 'listen', 'check (empty)');
    is((await S(page)).misses === 0 && sp(await hint(page)) === sp(await say(page, 'hintEmpty')), tag + ' a check with nothing done is no miss');
    /* ---- the end mark only: a knot at the seam ---- */
    await hold(page, MARK[r.units[1].tune], 'end mark tool'); await L.click(page, 'gap-' + end, 'end gap');
    await L.click(page, 'listen', 'check (knot)');
    s = await S(page);
    is(s.misses === 1 && await count(page, '.sc-end.is-knot') === 1 && await count(page, '.sc-end.is-drawn') === r.tokens.length, tag + ' the line is drawn under every word and knots once');
    is(sp(await hint(page)) === sp(await say(page, 'hintKnot')), tag + ' the knot hint');
    await L.click(page, 'listen', 'check again');
    s = await S(page);
    is(s.help && await count(page, '.sc-gap.is-spot') === 1 && await count(page, '[data-k="tool-cut"].is-wiggle') === 1 && sp(await hint(page)) === sp(await say(page, 'hintMiss2')), tag + ' miss 2: the seam spotlit, the scissors wiggling');
    /* ---- scissors, then the mark: the capital rises by itself ---- */
    await hold(page, 'cut', 'scissors'); await L.click(page, 'gap-' + seam, 'seam (cut)');
    is(await count(page, '.sc-gap.is-cut') === 1 && await count(page, '.sc-gap.is-spot') === 0, tag + ' scissors open a pause; the spotlight goes');
    await hold(page, MARK[r.units[0].tune], 'seam mark tool'); await L.click(page, 'gap-' + seam, 'seam (mark)');
    const after = (await tiles(page))[seam + 1];
    const want = r.tokens[seam + 1].charAt(0).toLocaleUpperCase(loc) + r.tokens[seam + 1].slice(1);
    is(sp(after) === ((loc === 'es' && r.units[1].tune === 'A') ? '¿' : '') + want, tag + ' the next word wakes: "' + sp(after) + '"');
    await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
    await L.click(page, 'listen', 'check (cured)');
    s = await S(page);
    const cured = await page.evaluate((g) => window.SentenceClinicCore.cured(window[g].st.loc, 'two', window[g].st.round), G);
    is(s.done && await count(page, '.sc-end.is-bad') === 0 && await count(page, '.sc-bed.is-cured') === 1, tag + ' cured: every end rests or holds open, the bed sits up');
    await H.wait(900);
    is(norm(await L.bubble(page)) === norm(await say(page, 'ok', { s: cured }) + ' ' + await say(page, 'okTwo')), tag + ' the success line with the cured text: ' + norm(cured));
    is(await L.nextShown(page), tag + ' Next 0.5 s after the result');
    /* ---- Level 1 ---- */
    await go(page, 'one', 4);
    await page.evaluate((g) => { window[g].OK_MS = 600000; }, G);
    s = await S(page);
    is(sp(await L.prompt(page)) === sp(await say(page, 'qOne')) && await count(page, 'button.sc-gap') === 3 && await count(page, '.sc-tool') === 2, tag + ' Level 1: three end gaps, two tools');
    for (const u of s.round.units) { await hold(page, u.tune === 'A' ? '.' : '?', 'wrong mark'); await L.click(page, 'gap-' + u.to, 'end ' + u.to); }
    await L.click(page, 'listen', 'check (L1 wrong)');
    is(await count(page, '.sc-end.is-kink') === 3, tag + ' three wrong marks: three kinks');
    for (const u of s.round.units) { await hold(page, MARK[u.tune], 'right mark'); await L.click(page, 'gap-' + u.to, 'end ' + u.to); }
    is(await count(page, '.sc-end.is-drawn') === 0, tag + ' a new move clears the frozen marks');
    await L.click(page, 'listen', 'check (L1 right)');
    is((await S(page)).done, tag + ' the right marks: cured');
    /* ---- Level 3 ---- */
    const L3 = await page.evaluate((l) => window.SentenceClinicData[l].L3.map((r) => ({ kind: r.kind, at: r.at, answer: r.answer, words: r.words, cured: r.cured, mark: r.mark, mark0: r.mark0 })), loc);
    for (let k = 0; k < L3.length; k++) {
      const x = L3[k]; await go(page, 'three', k);
      if (x.kind === 'form') {
        await hold(page, 'wheel', 'wheel'); await L.click(page, 'w-' + x.at, 'the verb');
        const opt = await page.evaluate((a) => [...document.querySelectorAll('.sc-opt')].findIndex((b) => b.textContent === a), x.answer);
        is(await count(page, '.sc-opt') === 3 && opt >= 0, tag + ` L3 #${k + 1}: the wheel offers three forms`);
        await L.click(page, 'opt-' + opt, 'right form');
      } else if (x.kind === 'ins') {
        await hold(page, 'ins', 'caret'); await L.click(page, 'gap-' + x.at, 'the gap');
        const opt = await page.evaluate((a) => [...document.querySelectorAll('.sc-opt')].findIndex((b) => b.textContent === a), x.answer);
        await L.click(page, 'opt-' + opt, 'right word');
      } else if (x.kind === 'lift') {
        await hold(page, 'lift', 'lift'); await L.click(page, 'w-' + x.at, 'the extra word');
        is(await count(page, '.sc-ghost') === 1, tag + ` L3 #${k + 1}: the lifted word waits as a ghost`);
      } else if (x.kind === 'ord') {
        for (let i = 0; i < x.cured.length; i++) {
          const words = await page.evaluate((g) => window[g].st.words.map((w) => w.w), G);
          const j = words.findIndex((w, q) => q >= i && w === x.cured[i]);
          if (j !== i) { await hold(page, 'swap', 'swap'); await L.click(page, 'w-' + i, 'swap from'); await L.click(page, 'w-' + j, 'swap to'); }
        }
      }
      if (x.mark !== x.mark0) { await hold(page, x.mark, 'end mark'); await L.click(page, 'gap-end', 'end'); }
      await L.click(page, 'listen', 'check L3');
      is((await S(page)).done, tag + ` L3 #${k + 1} [${x.kind}]: mended by real taps`);
    }
    /* ---- the tune setting; the keyboard ---- */
    await go(page, 'two', 1, 'first');
    is(await count(page, '.sc-end.is-tune') === 2, tag + ' "Shows the tune first": the two tunes drawn faintly before Check');
    await go(page, 'two', 1);
    await L.click(page, 'tool-.', 'pick'); await page.keyboard.press('Escape');
    is(await count(page, '.sc-tool.is-held') === 0, tag + ' Esc puts the tool down');
    await page.evaluate((g) => window[g]._wrap.focus(), G); await page.keyboard.down('Control'); await page.keyboard.press('Enter'); await page.keyboard.up('Control');
    is(sp(await hint(page)) === sp(await say(page, 'hintEmpty')), tag + ' Ctrl+Enter checks');
    is(errs.length === 0, tag + ' no console errors ' + errs.slice(0, 3).join(' | '));
    await page.close();

    /* ---- phones: the fold ---- */
    for (const w of [320, 360]) {
      const o = await L.open(w, loc);
      for (const [lv, k] of [['two', 7], ['two', 2], ['one', 0], ['three', 1]]) {
        await go(o.page, lv, k);
        const f = await o.page.evaluate(() => { window.scrollTo(0, 0); return { bottom: document.querySelector('.sc-listen').getBoundingClientRect().bottom, vh: innerHeight }; });
        is(f.bottom <= f.vh, `${tag} @${w} ${lv} ${k}: Check above the fold (${Math.round(f.bottom)} / ${f.vh})`);
      }
      await go(o.page, 'two', 7);
      await o.page.evaluate((g) => { const a = window[g]; a.OK_MS = 500; a.st.round.units.forEach((u) => window.SentenceClinicCore.setMark(a.st, u.to, ({ T: '.', A: '?' })[u.tune])); a._paint(); }, G);
      await L.click(o.page, 'listen', 'check');
      await H.wait(900);
      const f2 = await o.page.evaluate(() => { window.scrollTo(0, 0); const n = document.querySelector('.lcs-activity-next'), b = document.querySelector('.lcs-activity-bubble.show'); return { next: n ? n.getBoundingClientRect().bottom : 9999, bubble: b ? b.getBoundingClientRect().bottom : 9999, vh: innerHeight }; });
      is(f2.bubble <= f2.vh && f2.next <= f2.vh, `${tag} @${w}: solved — the success line and Next above the fold (${Math.round(f2.bubble)}, ${Math.round(f2.next)} / ${f2.vh})`);
      await o.page.close();
    }
    /* ---- each state once, resized through the widths ---- */
    await L.sweep(loc, 'rest', (p) => go(p, 'two', 7), {}, WIDTHS);
    await L.sweep(loc, 'knot', async (p) => { await go(p, 'two', 7); await p.evaluate((g) => { const a = window[g], u = a.st.round.units[1]; window.SentenceClinicCore.setMark(a.st, u.to, ({ T: '.', A: '?' })[u.tune]); a._check(); a._check(); }, G); }, {}, WIDTHS);
    await L.sweep(loc, 'one', async (p) => { await go(p, 'one', 7); await p.evaluate((g) => { const a = window[g]; a.st.round.units.forEach((u) => window.SentenceClinicCore.setMark(a.st, u.to, '.')); a._check(); }, G); }, {}, WIDTHS);
    await L.sweep(loc, 'three', async (p) => { await go(p, 'three', 0); await p.evaluate((g) => { const a = window[g]; a._pickTool('wheel'); a._tapWord(window.SentenceClinicCore.wheelAt(a.st)); }, G); }, {}, WIDTHS);
  }
  await L.close();
  process.exit(L.C.report('local-test-listening-line'));
})().catch((e) => { console.error(e); process.exit(1); });
