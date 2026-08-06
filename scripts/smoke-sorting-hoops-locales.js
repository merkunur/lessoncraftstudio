#!/usr/bin/env node
/* =====================================================================
   smoke-sorting-hoops-locales.js — eleven locales, one fresh browser each.

   ⚠ A WHOLE NEW BROWSER PER LOCALE, not a new page. A shared browser caches
   the module and every later locale passes on the first one's copy.

   ⚠ CONTROLS ARE REACHED BY INDEX, NEVER BY ENGLISH TEXT — the recorded
   "Another BLUEPRINT contains the word print" trap.

   ⭐⭐ AND IT RECORDS WHICH KEYS WERE ASKED FOR, not merely which strings
   appeared. A `t('key')` call sitting in a DEAD BRANCH reads identically to
   a live one in a source scan, so a string authored in eleven locales and
   never reached looks fine.
     · api.t CANNOT be wrapped: lcs-shell.js builds the api with
       Object.freeze and `t` is non-writable.
     · So the recording point is a PROXY over the TOOL'S OWN strings object,
       which needs nothing writable.
     · A recorder installed after mount cannot see what was read AT mount,
       so the build is re-run through the Proxy.

   Usage: node scripts/smoke-sorting-hoops-locales.js [--locales=de,fi]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
const IMGLIB = path.join(ROOT, 'frontend', 'public', 'image-library-webp');
const PANELS = require('./_sorting-hoops-strings.js');

const ALL = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const arg = process.argv.find((a) => a.indexOf('--locales=') === 0);
const LOCALES = arg ? arg.split('=')[1].split(',').filter((l) => ALL.indexOf(l) > -1) : ALL;

/* ⚠ NAMED EXEMPTIONS, each with a citation. `title` and `instruction` are
   read by the SHELL before mount (lcs-shell.js:448-449), never by the tool,
   so they can never appear in the tool's own key traffic. `setSpeak` is
   read by the shell's settings drawer (lcs-shell.js:592). */
const SHELL_CONSUMED = ['title', 'instruction', 'setSpeak'];

/* ⚠ ANNOUNCE-ONLY, and exempt from the RENDERED check ONLY — never from
   the asked-for check. `putBack` is passed to api.announce on a cancel and
   is never drawn, so requiring it in the harvested DOM would be requiring
   something that cannot happen. It must still be REACHED. */
const ANNOUNCE_ONLY = ['putBack'];

let PASS = 0, FAIL = 0;
const ok = (m) => { PASS++; console.log('  ok    ' + m); };
const bad = (m) => { FAIL++; console.error('  FAIL  ' + m); };
const is = (c, m) => (c ? ok(m) : bad(m));
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.html': 'text/html', '.webp': 'image/webp' };

function serve() {
  return http.createServer((req, res) => {
    const u = decodeURIComponent(req.url.split('?')[0]);
    let f;
    if (u.indexOf('/image-library-webp/') === 0) f = path.join(IMGLIB, u.slice('/image-library-webp/'.length));
    else if (u.indexOf('/mini-tools/') === 0) f = path.join(MINI, u.slice('/mini-tools/'.length));
    else f = path.join(MINI, u.replace(/^\//, ''));
    fs.readFile(f, (e, b) => {
      if (e) { res.writeHead(404); res.end('nf'); return; }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
      res.end(b);
    });
  });
}

(async () => {
  const server = serve();
  await new Promise((r) => server.listen(0, r));
  const PORT = server.address().port;

  for (const loc of LOCALES) {
    console.log('\n[' + loc + ']');
    /* fresh browser, per the rule at the top of this file */
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();
    const errs = [];
    page.on('pageerror', (e) => { if (!/404|Failed to load/.test(e.message)) errs.push(e.message); });
    page.on('console', (m) => {
      if (m.type() === 'error' && !/404|Failed to load|net::ERR/.test(m.text())) errs.push(m.text());
    });
    await page.setViewport({ width: 1024, height: 900 });
    await page.goto(`http://127.0.0.1:${PORT}/sorting-hoops.html?lang=${loc}&embed=1`,
      { waitUntil: 'networkidle2' });
    await page.waitForSelector('.hp-wrap', { timeout: 9000 });
    await wait(500);

    const got = await page.evaluate(async () => {
      const T = window.SortingHoops;
      const asked = {}, seen = {};
      /* the Proxy over the tool's OWN strings — nothing frozen involved */
      const real = T.strings;
      T.strings = new Proxy(real, {
        get: function (t, k) { if (typeof k === 'string') asked[k] = 1; return t[k]; }
      });
      const harvest = () => {
        document.querySelectorAll('body, body *').forEach((e) => {
          if (e.childElementCount === 0 && e.textContent.trim()) seen[e.textContent.trim()] = 1;
          const a = e.getAttribute && e.getAttribute('aria-label');
          if (a) seen[a.trim()] = 1;
        });
      };

      /* drive a state matrix the way a teacher does, so every hint rung and
         every refusal is reached. Re-render first, so keys read AT MOUNT
         pass through the Proxy too. */
      const step = (fn) => { try { fn(); } catch (_) {} T.render(); harvest(); };

      step(() => {});                                                    /* labelled, resting */
      step(() => { T._place(T.trayItems()[0].uid, 'a'); });              /* hintOpenLens */
      step(() => { T._place(T.trayItems()[0].uid, 'both'); });           /* hintOpenBoth */
      step(() => { T.mode = 'guess'; T.phase = 'setup'; T.cursor = { hoop: null, family: null }; });
      step(() => { T.cursor = { hoop: 'a', family: null }; });           /* family list */
      step(() => { T.cursor = { hoop: 'a', family: 'colour' }; });       /* value grid */
      step(() => { T.ruleA = { f: 'colour', v: 'red' }; T.cursor = { hoop: null, family: null }; }); /* hintSecret */
      /* ⚠ hintChildTurn needs NO rule set; my first matrix set ruleA one
         step earlier and then reported the string DEAD. A matrix that does
         not reach a branch reports the branch as dead — which is exactly the
         false positive this whole check exists to avoid producing. */
      step(() => { T.mode = 'child'; T.ruleA = null; T.ruleB = null; }); /* hintChildTurn */
      step(() => {
        T.mode = 'guess'; T.ruleB = { f: 'shape', v: 'circle' }; T.phase = 'sort';
        T.dealt = []; T.placement = {}; T._deal(12);
      });                                                               /* hintGuessStart */
      step(() => { T._sawRelease = true; });                            /* hintGuessOut */
      /* ⚠ place only SOME. Emptying the tray makes hintTrayEmpty win the
         dispatch and hintGuessRead can never be reached — my first matrix
         placed all twelve and then reported the string DEAD. */
      step(() => { T.dealt.slice(0, 4).forEach((it) => { T.placement[it.uid] = 'a'; }); }); /* hintGuessRead */
      step(() => { T.revealed = true; });                               /* hintRevealed */
      step(() => { T.dealt.forEach((it) => { T.placement[it.uid] = 'a'; }); }); /* hintTrayEmpty */
      step(() => {
        T.revealed = false; T.dealt.forEach((it) => { T.placement[it.uid] = 'tray'; });
        T.carry = T.dealt[0].uid;
      });                                                              /* hintCarry */
      step(() => { T.carry = null; T._ruleChanged = true; });           /* hintRuleChanged */
      /* the cancel paths, which are the only route to putBack */
      step(() => {
        T._ruleChanged = false; T.carry = T.dealt[0].uid; T.carryTarget = 'a';
        const tile = document.querySelector('.hp-tile[data-uid="' + T.carry.replace(/"/g, '') + '"]');
        if (tile) tile.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));
        else T.api.announce(T.api.t('putBack'));
      });
      ['refuseNoRule', 'refuseSameRule', 'refuseNoPair', 'confirmClear', 'gatePrint', 'gateRules']
        .forEach((k) => step(() => { T._said = k; }));
      step(() => { T._said = null; T.armClear = true; });
      /* the value grid for every family, so every famXxx and every value
         label is asked for */
      step(() => { T.premium = true; T.world = 'block'; T.pool = T.blockSet(); });
      ['colour', 'shape', 'size'].forEach((f) => step(() => {
        T.phase = 'setup'; T.cursor = { hoop: 'a', family: f };
      }));
      /* the reveal captions, which is where the rule SENTENCES render */
      step(() => {
        T.phase = 'sort'; T.revealed = true;
        T.ruleA = { f: 'size', v: 'big' }; T.ruleB = { f: 'shape', v: 'hexagon' };
      });
      step(() => { T.ruleA = { f: 'syllables', v: 1 }; });               /* rSyll1 */
      step(() => { T.ruleA = { f: 'syllables', v: 3 }; T.ruleB = { f: 'initial', v: 'b' }; });
      /* the picture families */
      step(() => { T.world = 'picture'; });
      ['syllables', 'initial', 'living', 'natural', 'edible', 'moves', 'size_band', 'habitat']
        .forEach((f) => step(() => { T.phase = 'setup'; T.cursor = { hoop: 'a', family: f }; }));
      /* every conceptual VALUE label */
      Object.keys(T.FIELD_VALUES).forEach((f) => T.FIELD_VALUES[f].forEach((v) => step(() => {
        T.phase = 'sort'; T.revealed = true; T.ruleA = { f: f, v: v }; T.ruleB = null;
      })));
      step(() => { T.sep = true; });
      step(() => { T.sep = false; T._validPresets(); T.phase = 'setup'; T.cursor = { hoop: null, family: null }; });

      T.strings = real;
      return { asked: Object.keys(asked), seen: Object.keys(seen).join('') };
    });

    const want = {};
    Object.keys(PANELS.de).forEach((k) => { want[k] = 1; });
    /* every authored key in the tool, not just the 41 the panels wrote */
    const all = await page.evaluate(() => Object.keys(window.SortingHoops.strings));

    /* --- 1. the translator was actually called --- */
    is(got.asked.length > 8, `${loc}: the strings object was read ${got.asked.length} times (vacuity guard)`);

    /* --- 2. every authored key is REQUESTED at runtime --- */
    const never = all.filter((k) => SHELL_CONSUMED.indexOf(k) < 0 && got.asked.indexOf(k) < 0);
    is(never.length === 0, `${loc}: every authored key is asked for at runtime` +
      (never.length ? ` — DEAD: ${never.join(', ')}` : ` (${all.length} keys)`));

    /* --- 3. the authored text actually RENDERED --- */
    const blob = got.seen;
    const strings = await page.evaluate((L) => {
      const o = {}; const S = window.SortingHoops.strings;
      Object.keys(S).forEach((k) => { if (S[k][L]) o[k] = S[k][L]; });
      return o;
    }, loc);
    const missing = Object.keys(strings).filter((k) => {
      if (SHELL_CONSUMED.indexOf(k) > -1 || ANNOUNCE_ONLY.indexOf(k) > -1) return false;
      /* placeholders are filled before they reach the DOM, so probe the
         literal head of the string only */
      const probe = strings[k].split('{')[0].trim();
      return probe.length > 3 && blob.indexOf(probe) < 0;
    });
    is(missing.length === 0, `${loc}: all ${Object.keys(strings).length} authored strings RENDERED` +
      (missing.length ? ` — MISSING: ${missing.slice(0, 6).join(', ')}` : ''));

    /* --- 4. no string is identical to English --- */
    if (loc !== 'en') {
      const en = await page.evaluate(() => {
        const o = {}; const S = window.SortingHoops.strings;
        Object.keys(S).forEach((k) => { o[k] = S[k].en; });
        return o;
      });
      const leaked = Object.keys(want).filter((k) => strings[k] === en[k]);
      is(leaked.length === 0, `${loc}: no panel string is identical to English` +
        (leaked.length ? ` — ${leaked.join(', ')}` : ''));
    }

    /* --- 5. clean --- */
    is(errs.length === 0, `${loc}: no page errors` + (errs[0] ? ' — ' + errs[0] : ''));

    /* --- print the whole authored set, which is the point --- */
    console.log('       ── the ' + Object.keys(want).length + ' panel strings ──');
    Object.keys(want).forEach((k) => console.log('       ' + k.padEnd(16) + (strings[k] || '(none)')));

    await browser.close();
  }

  server.close();
  console.log('\n' + (FAIL ? `FAILED — ${FAIL} failed, ${PASS} passed` : `ALL GREEN — ${PASS} assertions across ${LOCALES.length} locales`));
  process.exit(FAIL ? 1 : 0);
})();
