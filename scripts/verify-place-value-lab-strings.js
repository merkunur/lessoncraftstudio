#!/usr/bin/env node
/* =====================================================================
   verify-place-value-lab-strings.js — A15, NO DEAD STRINGS.

   ⚠ A SOURCE SCAN CANNOT ANSWER THIS. The recorded lesson from #39 is
   that "the string exists" and "the string is reached" are different
   questions: a `t('key')` call sitting in a branch nothing can enter
   passes a grep and is still dead. That is exactly how `gateHundreds`
   survived here — it kept its call site until the paywall came off,
   and 778 bytes of eleven-locale copy then became unreachable.

   So this drives the tool over a MATRIX OF REAL STATES with a recording
   `t()`, and requires every authored key to actually be asked for.

   ⚠ And the shell freezes its api (`lcs-shell.js` builds it with
   Object.freeze, so `t` is non-writable) — wrapping it silently no-ops
   in sloppy mode. The recorder is a Proxy over the tool's own strings
   object instead, which needs nothing writable.

   EXEMPTIONS are an auditable list with a reason each, never a loosened
   pattern.

   Run: node scripts/verify-place-value-lab-strings.js
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = process.env.PVL_TOOL_DIR || path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };

/* every key that is legitimately consumed somewhere this harness cannot
   drive, with the reason. The list may only SHRINK. */
const EXEMPT = {
  title: 'consumed by the shell header, not by the tool',
  /* ⚠ RESTORED after I removed it on ONE observation. The shell reads
     this during mount, and the recorder installs on a poll, so whether
     it is caught is a RACE — one green run is not evidence that an
     exemption is unnecessary. Shrink the ratchet on a reason, never on
     a single sighting. */
  instruction: 'consumed by the shell header at mount, before the tool renders',
  unlock: 'rendered only inside the inline paywall line, which needs a signed-out fetch',
  gateSub: 'paywall copy — reachable only with premium false AND a click on the locked chip',
  gateSaves: 'paywall copy — same path as gateSub',
  matFull: 'fires only when the saved-mat list is at its 12-row cap',
  confirmBtn: 'second stage of the saved-mat delete, behind a first click',
  deleteBtn: 'saved-mat row control, premium only',
};

let fails = 0;
const FAIL = (m) => { fails++; console.log('  ✗ FAIL ' + m); };

function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const file = p.indexOf('/mini-tools/') === 0
      ? path.join(MINI, p.slice('/mini-tools/'.length))
      : path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (err, buf) => {
      if (err) { res.statusCode = 404; res.end(); return; }
      res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream');
      res.end(buf);
    });
  });
}

(async () => {
  const server = serve();
  await new Promise((r) => server.listen(0, r));
  const PORT = server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();

  /* install the recorder BEFORE mount — three aria keys are read during
     the first render, and a recorder attached afterwards cannot see
     them (the #43 lesson). */
  await page.evaluateOnNewDocument(() => {
    window.__asked = new Set();
    const install = () => {
      const T = window.PlaceValueLab;
      if (!T || T.__wrapped) return false;
      const real = T.strings;
      T.strings = new Proxy(real, {
        get(target, key) { if (typeof key === 'string') window.__asked.add(key); return target[key]; },
        has(target, key) { return key in target; },
        ownKeys(target) { return Reflect.ownKeys(target); },
        getOwnPropertyDescriptor(target, key) { return Reflect.getOwnPropertyDescriptor(target, key); },
      });
      T.__wrapped = true;
      return true;
    };
    const iv = setInterval(() => { if (install()) clearInterval(iv); }, 0);
    document.addEventListener('DOMContentLoaded', install);
  });

  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(`http://127.0.0.1:${PORT}/mini-tools/place-value-lab.html`, { waitUntil: 'networkidle0' });

  /* the matrix: every mode, both bundle settings, both place counts,
     and the states that switch a branch */
  await page.evaluate(async () => {
    const T = window.PlaceValueLab;
    const set = (h, t, o, p) => { T.st.maxPlaces = p; T.st.h = p >= 3 ? h : 0; T.st.t = t; T.st.o = o; T.render(); };
    T.premium = true;
    T._userGestured = true;
    for (const bundle of ['invited', 'auto']) {
      T.api.settings.bundle = bundle;
      for (const p of [2, 3]) {
        T.api.settings.hundreds = p >= 3;
        set(0, 0, 0, p); set(1, 2, 4, p); set(0, 3, 14, p);
        set(1, 10, 0, p); set(9, 9, 9, p); set(3, 0, 4, p);
        T._paintAffordances();
      }
    }
    /* ⚠ DRIVE THE BRANCHES, do not loosen the check. The first run of
       this gate condemned fourteen correct keys because the harness
       stopped at _setMode() and never reached the prompt, the check,
       the miss note or the done note inside each mode. */
    for (const m of ['build', 'show', 'sub']) { try { T._setMode(m); } catch (_) {} }

    /* Show me — BOTH prompt kinds, a miss, and a hit */
    try {
      T._setMode('show');
      for (const kind of ['numeral', 'word']) {
        T.show = { target: 47, kind: kind, phase: 'set', order: [24, 61] };
        T.render();
        set(0, 2, 4, 2);          /* wrong -> showMiss */
        T._checkShow();
        set(0, 4, 7, 2);          /* right -> showNice, then nextBtn */
        T._checkShow();
        T.render();
      }
    } catch (_) {}

    /* Subtract — the nudge at the wall, then the done note */
    try {
      T._setMode('sub');
      T.sub = { a: 42, b: 17, phase: 'work', removedT: 0, removedO: 0 };
      set(0, 4, 2, 2);
      T._maybeCheckSub();          /* not enough loose ones -> subNudge */
      T.st.t = 2; T.st.o = 5; T.st._decomposed = true;
      T._maybeCheckSub();          /* 25 with the break -> subDone */
      T.render();
    } catch (_) {}
    /* the keypad and the saved-mat panel */
    try { T._openKeypad(); T._closePanel(); } catch (_) {}
    try { T._openPanel(); T._closePanel(); } catch (_) {}
    /* the two speak affordances + interrogation */
    try { T._echo(); } catch (_) {}
    for (const pl of ['hundreds', 'tens', 'ones']) { try { T._interrogate(pl); } catch (_) {} }
    T._setMode('build');
  });

  /* ⭐ mixedNote exists ONLY for the French vigesimal 70-99, so it is
     unreachable in an English session — a locale-scoped string, not a
     dead one. Drive the locale that owns it rather than exempting it.
     The recorder is per-document, so the two sets are unioned. */
  const enAsked = await page.evaluate(() => Array.from(window.__asked));
  await page.goto(`http://127.0.0.1:${PORT}/mini-tools/place-value-lab.html?lang=fr`, { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const T = window.PlaceValueLab;
    T.api.settings.wordHighlight = true;
    T.st.maxPlaces = 2; T.st.h = 0; T.st.t = 7; T.st.o = 1;  /* 71 = soixante et onze */
    T.render();
    T.st.t = 9; T.st.o = 6;                                   /* 96 = quatre-vingt-seize */
    T.render();
  });
  const frAsked = await page.evaluate(() => Array.from(window.__asked));

  const res = await page.evaluate(() => {
    const T = window.PlaceValueLab;
    /* ⭐ The settings drawer is rendered by the SHELL from the tool's
       own `settings` descriptor, so its labelKeys are consumed without
       the tool ever calling t(). Read them OFF THE ARTIFACT rather than
       assuming which ones exist — an invented list would be the same
       marks-its-own-homework mistake in a new place. */
    const viaShell = [];
    (T.settings || []).forEach((s) => {
      if (s.labelKey) viaShell.push(s.labelKey);
      (s.options || []).forEach((o) => { if (o.labelKey) viaShell.push(o.labelKey); });
    });
    return {
      asked: Array.from(window.__asked),
      all: Object.keys(T.__wrapped ? T.strings : {}),
      viaShell: viaShell,
    };
  });
  enAsked.forEach((k) => res.asked.push(k));
  frAsked.forEach((k) => res.asked.push(k));
  if (!res.viaShell.length) FAIL('no settings labelKeys found — the shell-consumed set is empty, which is implausible');
  res.viaShell.forEach((k) => res.asked.push(k));

  if (!res.all.length) { FAIL('the recorder never attached — 0 keys visible'); }
  const asked = new Set(res.asked);
  const dead = res.all.filter((k) => !asked.has(k) && !EXEMPT[k]);
  const exemptButAsked = Object.keys(EXEMPT).filter((k) => asked.has(k));

  console.log(`place-value-lab strings  (${res.all.length} keys, ${asked.size} asked, ${Object.keys(EXEMPT).length} exempt)`);
  for (const k of dead) FAIL(`"${k}" is authored in 11 locales and never asked for`);
  /* the ratchet: an exemption that turns out to be reachable must be
     removed, or the list rots into a place defects hide */
  /* ⚠ ADVISORY, NOT AN INSTRUCTION. Some keys are read by the shell at
     mount, which races the recorder's install, so a key can appear here
     on one run and fail on the next. Remove an exemption only when the
     REASON stops being true, never on a single green sighting — I did
     exactly that with `instruction` and broke the gate one run later. */
  for (const k of exemptButAsked) console.log(`  · exemption possibly stale: "${k}" was reached this run — re-read its reason before removing`);
  if (!dead.length) console.log('  ✓ every authored key is reached by a real state');

  console.log(`${fails ? 'FAIL' : 'PASS'}  strings  (${fails} failures)`);
  await browser.close();
  server.close();
  process.exit(fails ? 1 : 0);
})();
