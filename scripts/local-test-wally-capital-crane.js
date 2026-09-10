#!/usr/bin/env node
/* =====================================================================
   local-test-wally-capital-crane.js — interaction harness for "Wally's Capital
   Crane" (L.2.2.a), driving the REAL shell over `mini tools/`, in en AND sv.

   ⚠⚠ THE PREVIOUS VERSION RAN `?lang=en` ONLY, and hard-coded English round ids
   (`force('texas')`, `force('paris')`) and the English header title. So six shipped
   localizations were never driven, and a naive locale flag would have broken it.

   ⚠⚠ AND ITS force() COULD SILENTLY DO NOTHING — `const at = order.indexOf(k); if (at > 0)`
   with `k === -1` reorders nothing and throws nothing, so a mistyped id leaves round 0 on
   screen and every assertion after it re-measures the same frame. Same defect as
   robin-mirror's. It now throws, and confirms the round it landed on.

   ⚠⚠ AND IT ASSERTED THE CAPITAL WITH `/^[A-Z]/` — ASCII-ONLY. Measured: that returns
   FALSE for `Åre`, `Öland`, `Älvsjö`. It passes on the shipped es `México` only because
   the first letter happens to be ASCII. It would have failed a CORRECT Swedish tool the
   moment the deck used a place beginning Å/Ä/Ö. Now `/^\p{Lu}/u`.

   What it proves, per locale, per round:
     • the sentence renders as chips IN ORDER, matching the manifest's own tokens;
     • tapping the target shows its CAPITALIZED form (the crane lift) and celebrates;
     • a wrong tap gives try-again, and ⭐ THE CORRECT CHIP IS NEVER MARKED — the
       original assertion was "no chip is ever marked", which this build has to tighten
       rather than delete, because the tapped chip now carries a state colour;
     • selected / tried / right are three DIFFERENT rendered inks, and the marked chip
       is never less legible than an untouched one;
     • every chip clears the 44px tap floor at every width (it shipped at 40px);
     • no authored string is unreachable;
     • tap-to-deselect; >= 8 distinct rounds + a second-pass reshuffle; no overflow.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'wally-capital-crane.special-names.l-2-2-a';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MANIFEST = path.join(MINI, 'wally-capital-crane-activities.json');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
const TAP_FLOOR = 44;
const TITLE = { en: "Wally's Capital Crane", sv: 'Almas namnkran' };

/* ⚠ Two keys are consumed by the SHELL, not by the activity file (lcs-shell.js:448-449),
   so a bare "declared but never referenced" scan must exempt them — with a reason each,
   never a loosened pattern. `win` was deleted in this build precisely because it had no
   such reason: 0 references anywhere, and the shell renders its own celebrate heading. */
const SHELL_CONSUMED = {
  title: 'the shell renders the header (proven live: the sv header reads «Almas namnkran»)',
  instruction: 'the shell reads it at lcs-shell.js:449',
  prompt: "declared as promptKey:'prompt' in makeTasks; the shell resolves it",
  hintPick: 'returned by the task hintKey() when nothing is selected',
  hintWrong: 'returned by the task hintKey() after a tap',
};
function deadStrings() {
  const src = fs.readFileSync(path.join(MINI, 'wally-capital-crane-activity.js'), 'utf8');
  const block = src.slice(src.indexOf('strings: {'), src.indexOf('defaults:') > 0 ? src.indexOf('defaults:') : src.indexOf('init:'));
  const keys = [...block.matchAll(/^\s{6}([a-zA-Z]+):/gm)].map((m) => m[1]);
  if (keys.length < 4) return ['the strings block parsed to only ' + keys.length + ' key(s) — this check is vacuous'];
  return keys.filter((k) => !SHELL_CONSUMED[k] && src.indexOf("t('" + k + "')") < 0 && src.indexOf('"' + k + '"') < 0)
    .map((k) => `"${k}" is authored in every locale and referenced nowhere — wire it or delete it`);
}

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]), file;
    if (p === '/' || p.endsWith('.html')) file = path.join(MINI, path.basename(p) || 'x');
    else if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
    else file = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (err, buf) => { if (err) { res.statusCode = 404; res.end('not found'); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(buf); });
  });
}

(async () => {
  const puppeteer = require('puppeteer');
  const row = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'))[0];
  const POOLS = { en: row.params.rounds, sv: row.params.roundsL10n.sv };
  const server = serve();
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const PORT = server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const fails = [];
  /* a dead string is a source fact, not a render fact */
  deadStrings().forEach((m) => fails.push('strings: ' + m));
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  for (const loc of ['en', 'sv']) {
    const rounds = POOLS[loc];
    const note = (cond, msg) => { if (!cond) fails.push(`${loc}: ${msg}`); };
    const page = await browser.newPage();
    await page.setViewport({ width: 412, height: 900 });
    const errs = [];
    const isNoise = (s) => /Failed to load resource|favicon|\/audio\/|inventory\.json|speechSynthesis|not-allowed/i.test(s);
    page.on('console', (m) => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
    page.on('pageerror', (e) => { if (!isNoise(e.message)) errs.push(e.message); });

    const url = `http://127.0.0.1:${PORT}/wally-capital-crane-activity.html?lang=${loc}&activity=${ACTIVITY}&embed=1`;

    /* ⭐ THROWS on a miss, and confirms the round it landed on. */
    async function force(id) {
      const landed = await page.evaluate((rid) => {
        const t = window.WallyCapitalCraneActivity;
        if (!t._pool || !t._pool.length) throw new Error('the pool is empty — the manifest never loaded');
        const k = t._pool.findIndex((x) => x.id === 'wally-capital-crane.' + rid);
        if (k < 0) throw new Error('no round "' + rid + '" in the pool (' + t._pool.map((x) => x.id).join(',') + ')');
        const order = []; for (let i = 0; i < t._pool.length; i++) order.push(i);
        order.splice(order.indexOf(k), 1); order.unshift(k);
        t._order = order; t._orderForPool = t._pool; t._curPass = 0;
        window.LCS_reloadFirstTask();
        return t._pool[k].id;
      }, id);
      await page.waitForFunction(() => window.WallyCapitalCraneActivity.round && document.querySelector('.wcc-root'), { timeout: 4000 });
      await sleep(40);
      /* ⚠ `_pool[k].id` is the TASK id (prefixed); `tool.round.id` is the RAW manifest id */
      const shown = await page.evaluate(() => window.WallyCapitalCraneActivity.round.id);
      if ('wally-capital-crane.' + shown !== landed) throw new Error(`force("${id}") landed on "${shown}", not "${landed}"`);
      return shown;
    }
    const chipsOnScreen = () => page.$$eval('.wcc-chip', (els) => els.map((e) => ({ id: +e.getAttribute('data-id'), text: e.textContent.trim() })));
    const tap = (id) => page.evaluate((x) => {
      const b = document.querySelector('.wcc-chip[data-id="' + x + '"]');
      if (!b) throw new Error('no chip with data-id ' + x);
      b.click();
    }, id).then(() => sleep(40));
    const check = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (!c) throw new Error('no Check button'); if (c.disabled) throw new Error('Check is disabled'); c.click(); }).then(() => sleep(140));
    const celebrated = () => page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
    const triedAgain = () => page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('tryagain')); });
    const chipStyle = (id) => page.evaluate((x) => {
      const b = document.querySelector('.wcc-chip[data-id="' + x + '"]');
      if (!b) return null;
      const cs = getComputedStyle(b);
      return { bg: cs.backgroundColor, border: cs.borderTopColor, color: cs.color };
    }, id);

    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.waitForFunction(() => { const t = window.WallyCapitalCraneActivity; return t && t._activityRow && document.querySelector('.wcc-root') && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

      const title = await page.$eval('.lcs-title', (e) => e.textContent.trim()).catch(() => '');
      note(title === TITLE[loc], `header title is "${title}", expected "${TITLE[loc]}"`);

      /* ---- variety + reshuffle ---- */
      const Np = await page.evaluate(() => window.WallyCapitalCraneActivity._pool.length);
      note(Np === rounds.length, `the pool holds ${Np} rounds, the manifest declares ${rounds.length}`);
      const ids = await page.evaluate((count) => { const t = window.WallyCapitalCraneActivity, out = []; for (let i = 0; i < count; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * Np);
      note(new Set(ids.slice(0, Np)).size >= 8, `only ${new Set(ids.slice(0, Np)).size} distinct rounds (<8)`);
      note(ids.slice(0, Np).join(',') !== ids.slice(Np, 2 * Np).join(',') || Np < 2, 'the second pass did not reshuffle');

      /* ---- EVERY round of this locale's pool, answered and graded ---- */
      for (const r of rounds) {
        await force(r.id);
        /* ⭐ the answer derived HERE from the manifest, not asked of the core */
        const want = r.tokens.indexOf(r.proper);
        const on = await chipsOnScreen();
        const wordTokens = r.tokens.filter((t) => /\p{L}/u.test(t));
        note(on.length === wordTokens.length, `${r.id}: ${on.length} chips, the round has ${wordTokens.length} word tokens`);
        /* the chips must be THIS locale's own words, in sentence order */
        note(on.map((c) => c.text).join(' ') === wordTokens.join(' '),
          `${r.id}: chips read "${on.map((c) => c.text).join(' ')}" but the ${loc} round is "${wordTokens.join(' ')}" — the wrong pool is loaded`);
        const attrs = await page.$$eval('.wcc-chip', (els) => els.map((e) => e.getAttribute('data-answer')).filter(Boolean));
        note(attrs.length === 0, `${r.id}: a chip leaks an answer attribute`);

        await tap(want);
        /* ⭐ the crane lift — and ⚠ the Unicode-aware test, not /^[A-Z]/ */
        const lifted = (await chipsOnScreen()).find((c) => c.id === want);
        note(lifted && /^\p{Lu}/u.test(lifted.text), `${r.id}: the tapped chip did not show a Capital ("${lifted && lifted.text}")`);
        await check();
        note(await celebrated(), `${r.id}: tapping the special name did not celebrate`);
      }

      /* ---- a wrong pick: try-again, the CORRECT chip never marked, three inks ---- */
      const r0 = rounds[0];
      await force(r0.id);
      const want0 = r0.tokens.indexOf(r0.proper);
      const wrong0 = (await chipsOnScreen()).map((c) => c.id).filter((i) => i !== want0)[0];

      await tap(wrong0);
      const selStyle = await chipStyle(wrong0);
      await check();
      note(await triedAgain(), 'a wrong chip did not show try-again');
      note(!(await celebrated()), 'a wrong chip celebrated (must not)');
      /* ⭐ TIGHTENED, not deleted: the tapped chip may now carry a state colour, but the
         CORRECT chip must never be marked — that is what would print the answer. */
      const marks = await page.$$eval('.wcc-chip', (els) => els.map((e) => ({ id: +e.getAttribute('data-id'), c: e.className })));
      note(!/wcc-(right|tried)/.test((marks.find((m) => m.id === want0) || {}).c || ''),
        'the CORRECT chip is marked after a wrong pick — that prints the answer');
      note(marks.filter((m) => /wcc-tried/.test(m.c)).length === 1, `${marks.filter((m) => /wcc-tried/.test(m.c)).length} chips marked tried, expected exactly the tapped one`);
      note((marks.find((m) => /wcc-tried/.test(m.c)) || {}).id === wrong0, 'the tried mark is not on the chip that was tapped');
      const triedStyle = await chipStyle(wrong0);

      await force(r0.id);
      await tap(want0); await check();
      note(await celebrated(), 'the correct chip did not celebrate');
      const rightStyle = await chipStyle(want0);

      /* ⭐⭐ three states, three inks. `.wcc-sel` shipped CORAL and nothing changed after
         Check, so picked / missed / resolved were ONE colour. All three rules are
         two-class and of equal specificity, so the cascade ties on SOURCE ORDER — this
         must be read off the rendered pixel, never off the stylesheet. */
      note(selStyle && triedStyle && rightStyle, 'could not read a chip style');
      if (selStyle && triedStyle && rightStyle) {
        note(selStyle.border !== triedStyle.border, `selected and tried share a border ink (${selStyle.border}) — one colour meaning both "I chose this" and "this is wrong"`);
        note(triedStyle.border !== rightStyle.border, `tried and right share a border ink (${triedStyle.border})`);
        note(selStyle.border !== rightStyle.border, `selected and right share a border ink (${selStyle.border})`);
        /* ⭐ and the marked chip must stay legible. This deck's resting chip is near-black
           on near-white, so unlike robin-mirror the state colours live in the BORDER and
           the tint — the ink must not be dimmed to carry them. */
        note(selStyle.color === rightStyle.color && selStyle.color === triedStyle.color,
          'a state changes the TEXT colour — border and tint should carry the state, so legibility never drops');
      }

      /* ---- tap-to-deselect ---- */
      await force(rounds[1].id);
      const cw = rounds[1].tokens.indexOf(rounds[1].proper);
      await tap(cw); note(await page.evaluate(() => window.WallyCapitalCraneActivity.sel != null), 'the first tap did not select');
      await tap(cw); note(await page.evaluate(() => window.WallyCapitalCraneActivity.sel == null), 'the second tap did not deselect');

      /* ---- tap floor + overflow ---- */
      for (const w of [280, 320, 360, 412, 768]) {
        await page.setViewport({ width: w, height: 820 });
        await force(rounds[rounds.length - 1].id);
        const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
        note(over <= 2, `overflow ${over}px at ${w}px`);
        const chipMin = await page.$$eval('.wcc-chip', (els) => Math.min(...els.map((e) => { const r = e.getBoundingClientRect(); return Math.min(r.width, r.height); })));
        note(chipMin >= TAP_FLOOR - 0.5, `the smallest chip is ${Math.round(chipMin)}px at ${w}px (floor ${TAP_FLOOR}) — it shipped at 40px`);
      }
      await page.setViewport({ width: 412, height: 900 });

      note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
      const bad = fails.filter((f) => f.startsWith(loc + ':')).length;
      console.log(`  ${bad ? 'FAIL' : 'ok  '} wally-capital-crane/${loc} — "${title}" | ${rounds.length} rounds driven`);
    } catch (e) {
      fails.push(`${loc}: ${e.message}`);
      console.log(`  FAIL wally-capital-crane/${loc} — ${e.message}`);
    } finally { await page.close(); }
  }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`WALLY-CAPITAL-CRANE LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach((f) => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('WALLY-CAPITAL-CRANE LOCAL TEST PASSED — en + sv, EVERY round of both pools forced (force() throws on a ' +
    'miss) and answered from the MANIFEST rather than from the core; the chips are the locale\'s own words in sentence ' +
    'order; the tapped chip shows its Capital (Unicode-aware, not /^[A-Z]/); a wrong pick gives try-again and the ' +
    'CORRECT chip is never marked; selected / tried / right are three different rendered inks and none dims the text; ' +
    'no dead strings; tap-to-deselect; >= 8 distinct + second-pass reshuffle; every chip >= ' + TAP_FLOOR + 'px and no ' +
    'overflow 280 -> 768.');
  process.exit(0);
})().catch((e) => { console.error('ERROR:', e.message); process.exit(1); });
