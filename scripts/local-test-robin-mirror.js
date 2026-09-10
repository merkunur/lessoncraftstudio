#!/usr/bin/env node
/* =====================================================================
   local-test-robin-mirror.js — interaction harness for "Robin's Mirror"
   (L.2.1.c), driving the REAL shell over `mini tools/`, in en AND sv.

   ⚠⚠ THE PREVIOUS VERSION WAS TESTING ROUND ZERO EIGHT TIMES AND REPORTING PASS.
   Its `force()` looked the round up with findIndex, and on a miss took `at = -1`,
   failed the `if (at > 0)` guard, reordered nothing and THREW NOTHING — so every
   "await force('twins')" left round 0 on screen and each assertion re-measured the
   same frame. A scripted interaction that can silently not happen hollows out
   every assertion after it. `force()` now throws on a miss, and returns the round
   it actually landed on so the caller can confirm.

   ⚠ It also asked `ReflexivePronounCore.oracle()` for the expected chip. That core
   holds the ENGLISH table only, so on sv it returns the empty string and the tap
   would silently miss. This harness holds its OWN per-locale table and forces the
   activity through EVERY round of BOTH pools.

   What it proves, per locale, per round:
     • the sentence card + exactly 3 chips render;
     • the chips are the LOCALE's words — the sv wiring failure is a Swedish child
       being shown «myself/herself», which no English-only assertion can see;
     • tapping this harness's own expected chip + shell Check -> celebrate;
     • tapping a wrong chip -> tryagain, and ONLY the tapped chip is marked;
     • the three states are three DIFFERENT colours (selected / tried / right) —
       one ink meaning both "I chose this" and "this is wrong" is the sv #28 defect;
     • the speaker control clears the 44px tap floor (it shipped at 34px);
     • tap-to-deselect; >= 7 distinct rounds + a second-pass reshuffle;
     • no horizontal overflow 280 -> 768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'robin-mirror.reflexive.l-2-1-c';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MANIFEST = path.join(MINI, 'robin-mirror-activities.json');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
const TAP_FLOOR = 44;

/* ---- this harness's OWN tables. NOT read from the core or the activity. ---- */
const TABLE = {
  en: { i: 'myself', you: 'yourself', he: 'himself', she: 'herself', we: 'ourselves', they: 'themselves', it: 'itself' },
  sv: { jag: 'mig', du: 'dig', han: 'sig', hon: 'sig', den: 'sig', det: 'sig', de: 'sig', vi: 'oss', ni: 'er' },
};
const TITLE = { en: "Robin's Mirror", sv: 'Kottes ordspegel' };

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]), file;
    if (p === '/' || p.endsWith('.html')) file = path.join(MINI, path.basename(p) || 'x');
    else if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
    else file = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (err, buf) => { if (err) { res.statusCode = 404; res.end('not found'); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(buf); });
  });
}

/* ⭐⭐ NO DEAD STRINGS. `win` shipped authored in EIGHT locales and referenced
   NOWHERE — not by the activity, not by the shell — because the shell renders its
   own celebrate heading. Nobody could ever have read it, and its presence made the
   file claim the activity says something it does not.
   ⚠ THIS IS A SOURCE SCAN AND IT HAS A KNOWN BLIND SPOT (the #39 lesson): a `t(k)`
   call sitting inside a branch nothing can reach still counts as referenced here.
   It catches only "declared and never mentioned", which is exactly what `win` was.
   ⚠ The exemptions are an AUDITABLE LIST with a reason each — never a loosened
   pattern. Two keys are consumed by the SHELL, not by this file. */
const SHELL_CONSUMED = {
  title: 'the shell renders the header (proven live: the sv header reads «Kottes ordspegel»)',
  prompt: "declared as promptKey:'prompt' in makeTasks; the shell resolves it",
  hintPick: 'returned by the task hintKey() when nothing is selected',
  hintWrong: 'returned by the task hintKey() after a wrong tap',
};
function deadStrings() {
  const src = fs.readFileSync(path.join(MINI, 'robin-mirror-activity.js'), 'utf8');
  const block = src.slice(src.indexOf('strings: {'), src.indexOf('defaults: {'));
  const keys = [...block.matchAll(/^\s{6}([a-zA-Z]+):/gm)].map((m) => m[1]);
  /* non-vacuity: if the key list parses implausibly small, the scan proves nothing */
  if (keys.length < 4) return ['the strings block parsed to only ' + keys.length + ' key(s) — this check is vacuous'];
  const dead = [];
  for (const k of keys) {
    if (SHELL_CONSUMED[k]) continue;
    if (src.indexOf("t('" + k + "')") < 0 && src.indexOf('"' + k + '"') < 0) dead.push(k);
  }
  return dead.map((k) => `"${k}" is authored in every locale and referenced nowhere — wire it or delete it`);
}

(async () => {
  const puppeteer = require('puppeteer');
  const row = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'))[0];
  const POOLS = { en: row.params.rounds, sv: row.params.roundsL10n.sv };
  const server = serve();
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const PORT = server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const fails = [];
  /* run BEFORE the browser: a dead string is a source fact, not a render fact */
  deadStrings().forEach((m) => fails.push('strings: ' + m));
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  for (const loc of ['en', 'sv']) {
    const rounds = POOLS[loc];
    const tbl = TABLE[loc];
    const note = (cond, msg) => { if (!cond) fails.push(`${loc}: ${msg}`); };
    const page = await browser.newPage();
    await page.setViewport({ width: 412, height: 900 });
    const errs = [];
    const isNoise = (s) => /Failed to load resource|favicon|\/audio\/|speechSynthesis|not-allowed/i.test(s);
    page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
    page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });

    const url = `http://127.0.0.1:${PORT}/robin-mirror-activity.html?lang=${loc}&activity=${ACTIVITY}&embed=1`;

    /* ⭐ THROWS on a miss, and returns the id it actually landed on. */
    async function force(id) {
      const landed = await page.evaluate((rid) => {
        const t = window.RobinMirrorActivity;
        if (!t._pool || !t._pool.length) throw new Error('the pool is empty — the manifest never loaded');
        const k = t._pool.findIndex(x => x.id === 'robin-mirror.' + rid);
        if (k < 0) throw new Error('no round "' + rid + '" in the pool (' + t._pool.map(x => x.id).join(',') + ')');
        const order = []; for (let i = 0; i < t._pool.length; i++) order.push(i);
        order.splice(order.indexOf(k), 1); order.unshift(k);
        t._order = order; t._orderForPool = t._pool; t._curPass = 0;
        window.LCS_reloadFirstTask();
        return t._pool[k].id;
      }, id);
      await page.waitForFunction(() => window.RobinMirrorActivity.round && document.querySelector('.rmr-root'), { timeout: 4000 });
      await sleep(40);
      /* ⚠ `_pool[k].id` is the TASK id, which makeTasks prefixes with "robin-mirror.";
         `tool.round.id` is the RAW manifest id setupTask was handed. Comparing the two
         directly failed a working tool — verify the measurement before the defect. */
      const shown = await page.evaluate(() => window.RobinMirrorActivity.round.id);
      if ('robin-mirror.' + shown !== landed) throw new Error(`force("${id}") landed on "${shown}", not "${landed}"`);
      return shown;
    }
    const chipsOnScreen = () => page.$$eval('.rmr-chip', els => els.map(e => e.getAttribute('data-w')));
    const tap = (w) => page.evaluate((x) => {
      const b = document.querySelector('.rmr-chip[data-w="' + CSS.escape(x) + '"]');
      if (!b) throw new Error('no chip "' + x + '" on screen');
      b.click();
    }, w).then(() => sleep(40));
    const check = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (!c) throw new Error('no Check button'); if (c.disabled) throw new Error('Check is disabled'); c.click(); }).then(() => sleep(140));
    const celebrated = () => page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
    const triedAgain = () => page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('tryagain')); });
    const chipBg = (w) => page.evaluate((x) => {
      const b = document.querySelector('.rmr-chip[data-w="' + CSS.escape(x) + '"]');
      return b ? getComputedStyle(b).backgroundColor : null;
    }, w);

    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.waitForFunction(() => { const t = window.RobinMirrorActivity; return t && t._activityRow && document.querySelector('.rmr-root') && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

      const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
      note(title === TITLE[loc], `header title is "${title}", expected "${TITLE[loc]}"`);

      /* ---- variety + reshuffle ---- */
      const Np = await page.evaluate(() => window.RobinMirrorActivity._pool.length);
      note(Np === rounds.length, `the pool holds ${Np} rounds, the manifest declares ${rounds.length}`);
      const ids = await page.evaluate((count) => { const t = window.RobinMirrorActivity, out = []; for (let i = 0; i < count; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * Np);
      note(new Set(ids.slice(0, Np)).size >= 7, `only ${new Set(ids.slice(0, Np)).size} distinct rounds (<7)`);
      note(ids.slice(0, Np).join(',') !== ids.slice(Np, 2 * Np).join(',') || Np < 2, 'the second pass did not reshuffle');

      /* ---- EVERY round, forced, answered, and graded ---- */
      const firstChips = [];
      for (const r of rounds) {
        await force(r.id);
        const want = tbl[r.referent];
        const on = await chipsOnScreen();
        note(on.length === 3, `${r.id}: ${on.length} chips, expected 3`);
        note(new Set(on).size === 3, `${r.id}: chips are not distinct (${on.join('/')})`);
        /* ⭐ the wiring proof: the chips must be THIS locale's words */
        note(on.every(w => Object.values(tbl).indexOf(w) >= 0),
          `${r.id}: chips ${on.join('/')} are not ${loc} forms — REFL_L10N.${loc} is not wired and the child is seeing another language`);
        note(on.indexOf(want) >= 0, `${r.id}: the expected form "${want}" is not among the chips (${on.join('/')})`);
        const attrs = await page.$$eval('.rmr-chip', els => els.map(e => e.getAttribute('data-answer')).filter(Boolean));
        note(attrs.length === 0, `${r.id}: a chip leaks an answer attribute`);
        firstChips.push(on[0]);

        await tap(want); await check();
        note(await celebrated(), `${r.id}: tapping "${want}" did not celebrate`);
      }

      /* ⭐ the chips shuffle per render, so the FIRST rendered chip must not be
         pinned to the answer across the deck */
      note(new Set(firstChips).size >= 2, `the first chip is identical in every round (${firstChips.join(',')}) — the chips are not shuffled`);

      /* ---- a wrong pick: try-again, only the tapped chip marked, three colours ---- */
      const r0 = rounds[0];
      await force(r0.id);
      const want0 = tbl[r0.referent];
      const wrong0 = (await chipsOnScreen()).filter(w => w !== want0)[0];

      await tap(wrong0);
      const selBg = await chipBg(wrong0);
      await check();
      note(await triedAgain(), 'a wrong pick did not show try-again');
      note(!(await celebrated()), 'a wrong pick celebrated (must not)');
      const marks = await page.$$eval('.rmr-chip', els => els.map(e => ({ w: e.getAttribute('data-w'), c: e.className })));
      note(marks.filter(m => /rmr-right/.test(m.c)).length === 0, 'a chip is marked RIGHT after a wrong pick — that prints the answer');
      note(marks.filter(m => /rmr-tried/.test(m.c)).length === 1, `${marks.filter(m => /rmr-tried/.test(m.c)).length} chips marked tried, expected exactly the tapped one`);
      note((marks.find(m => /rmr-tried/.test(m.c)) || {}).w === wrong0, 'the marked chip is not the one that was tapped');
      const triedBg = await chipBg(wrong0);

      await tap(want0); await check();
      note(await celebrated(), 'the correct chip did not celebrate after a wrong attempt');
      const rightBg = await chipBg(want0);

      /* ⭐⭐ three states, three inks. The sv #28 defect was one colour meaning
         both "I chose this" and "this is wrong" — and because all three rules are
         two-class, the cascade ties on SOURCE ORDER, so this must be measured on
         the rendered pixel, never read off the stylesheet. */
      note(selBg && triedBg && rightBg, 'could not read a chip background');
      note(selBg !== triedBg, `selected and tried are the same ink (${selBg}) — one colour means both "I chose this" and "this is wrong"`);
      note(triedBg !== rightBg, `tried and right are the same ink (${triedBg})`);
      note(selBg !== rightBg, `selected and right are the same ink (${selBg})`);

      /* ⭐⭐ THE MARKED CHIP MUST NOT BE THE LEAST LEGIBLE ONE ON THE BOARD.
         Measured on the shipped pairs: an untouched chip ran WCAG 6.37, «tried» ran
         3.68 and «selected» 5.63 — so the chip carrying the state information read
         DIMMER than the two the child never touched, which is the opposite of the
         affordance it needs. The floor is the UNTOUCHED chip, not a number I picked:
         a threshold I invent is not a measurement, and this one moves if the resting
         style ever changes. */
      const contrast = await page.evaluate(() => {
        const lum = (c) => {
          const [r, g, b] = c.match(/\d+(\.\d+)?/g).slice(0, 3).map(Number)
            .map((v) => v / 255).map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
          return 0.2126 * r + 0.7152 * g + 0.0722 * b;
        };
        const ratio = (el) => {
          const cs = getComputedStyle(el);
          const a = lum(cs.color), b = lum(cs.backgroundColor);
          return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
        };
        const marked = document.querySelector('.rmr-chip.rmr-right, .rmr-chip.rmr-tried, .rmr-chip.rmr-sel');
        const plain = [...document.querySelectorAll('.rmr-chip')].find((e) => !/rmr-(right|tried|sel)/.test(e.className));
        return marked && plain ? { marked: ratio(marked), plain: ratio(plain) } : null;
      });
      note(contrast, 'could not measure chip contrast');
      if (contrast) {
        note(contrast.marked >= contrast.plain - 0.01,
          `the MARKED chip (${contrast.marked.toFixed(2)}) is less legible than an untouched one (${contrast.plain.toFixed(2)}) — the chip carrying the state reads dimmer than the ones the child ignored`);
      }

      /* ---- tap-to-deselect ---- */
      await force(rounds[1].id);
      const cw = tbl[rounds[1].referent];
      await tap(cw); note(await page.evaluate(() => !!window.RobinMirrorActivity.sel), 'the first tap did not select');
      await tap(cw); note(await page.evaluate(() => !window.RobinMirrorActivity.sel), 'the second tap did not deselect');

      /* ---- tap floor + overflow across the sweep ---- */
      for (const w of [280, 360, 412, 768]) {
        await page.setViewport({ width: w, height: 820 });
        await force(rounds[4].id);
        const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
        note(over <= 2, `overflow ${over}px at ${w}px`);
        /* ⚠ the speaker shipped at 34x34 — under the floor at EVERY width */
        const spk = await page.$eval('.rmr-spk', e => { const r = e.getBoundingClientRect(); return { w: r.width, h: r.height }; }).catch(() => null);
        note(spk && Math.min(spk.w, spk.h) >= TAP_FLOOR - 0.5,
          `the speaker is ${spk ? Math.round(Math.min(spk.w, spk.h)) : '?'}px at ${w}px (floor ${TAP_FLOOR})`);
        const chipMin = await page.$$eval('.rmr-chip', els => Math.min(...els.map(e => { const r = e.getBoundingClientRect(); return Math.min(r.width, r.height); })));
        note(chipMin >= TAP_FLOOR - 0.5, `the smallest chip is ${Math.round(chipMin)}px at ${w}px (floor ${TAP_FLOOR})`);

        /* ⭐⭐ INVERTED HIERARCHY — a FLOOR CANNOT SEE THIS, and no gate in the
           catalogue does. The sentence IS the task: it is what changes each round and
           what the child must read closely to find the doer. It shipped at
           clamp(14px,3.6vw,18px) against chips at clamp(15px,4vw,19px), so the smallest
           text in the working area was the material and the largest was a prompt that
           never changes — and on desktop the sentence stayed pinned at 18px in a 540px
           card while everything around it grew. Every measured gate was green: TINY has
           a 14px floor and only reads answer-card content, so 18px passed twice over.
           Found by reading the 768px render. Assert the ORDER, not a number. */
        const sizes = await page.evaluate(() => ({
          sentence: parseFloat(getComputedStyle(document.querySelector('.rmr-senttxt')).fontSize),
          chip: parseFloat(getComputedStyle(document.querySelector('.rmr-chip')).fontSize),
        }));
        note(sizes.sentence >= sizes.chip,
          `at ${w}px the sentence (${sizes.sentence}px) is smaller than the chips (${sizes.chip}px) — the material must not rank below the options`);
      }
      await page.setViewport({ width: 412, height: 900 });

      note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
      const bad = fails.filter(f => f.startsWith(loc + ':')).length;
      console.log(`  ${bad ? 'FAIL' : 'ok  '} robin-mirror/${loc} — "${title}" | ${rounds.length} rounds driven`);
    } catch (e) {
      fails.push(`${loc}: ${e.message}`);
      console.log(`  FAIL robin-mirror/${loc} — ${e.message}`);
    } finally { await page.close(); }
  }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`ROBIN-MIRROR LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('ROBIN-MIRROR LOCAL TEST PASSED — en + sv, EVERY round of both pools forced (force() throws on a miss) ' +
    'and answered from this harness\'s own table; chips are the locale\'s own words; a wrong pick gives try-again with ' +
    'ONLY the tapped chip marked and never a RIGHT mark; selected / tried / right are three different rendered inks; ' +
    'tap-to-deselect; >= 7 distinct + second-pass reshuffle; speaker and chips >= ' + TAP_FLOOR + 'px and no overflow 280 -> 768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
