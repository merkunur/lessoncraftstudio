#!/usr/bin/env node
/* =====================================================================
   smoke-ten-frame-locales.js — the eleven-locale digest for TOOL #1b.

   Run:  node scripts/smoke-ten-frame-locales.js [--print]

   ⚠ A FRESH BROWSER PER LOCALE. A shared one caches the module and
   every later locale passes on the first one's copy.

   ⚠ CONTROLS ARE REACHED BY INDEX, NEVER BY AN ENGLISH LABEL. #44's
   "Another BLUEPRINT" contains the word "print", so a /print/i selector
   matched the wrong chip and reported a defect in a working tool — and
   the throwaway probe that "confirmed" it made the same mistake.

   ⭐⭐ A15 — NO DEAD STRINGS, AND IT IS MEASURED BY REACHABILITY, NOT BY
   A SOURCE SCAN. A key can be authored in eleven locales and consumed
   by nothing (five recorded instances on this platform), and a regex
   over the source is defeated by a live `t()` call sitting in a branch
   nothing can reach (#39). So the recorder is a **Proxy over the tool's
   own strings object**: the shell resolves `i18n.t(tool.strings, key)`
   at CALL time, so every real lookup passes through the proxy.
   ⚠ It cannot be a wrapper around `api.t` — `lcs-shell.js:482` builds
   the api with `Object.freeze` and `t` is non-writable, so wrapping it
   silently no-ops in sloppy mode and the gate would report "0 keys
   asked for" while every string rendered. That is a gate failing a
   correct tool, and it was measured with a property descriptor rather
   than assumed.
   ⚠ And the proxy must be installed BEFORE mount, or the keys read
   during init are invisible to it.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..', 'mini tools');
const PANELS = path.join(__dirname, '_tnf-panels');
const PORT = 5585;
const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const PRINT = process.argv.includes('--print');

/* the shell consumes these two itself (lcs-shell.js:448-449), so they
   are exempt from the reachability requirement — with the citation, not
   as a bare allowance */
const SHELL_CONSUMED = ['title', 'instruction'];

let PASS = 0, FAIL = 0;
const fails = [];
const is = (c, m) => { if (c) PASS++; else { FAIL++; fails.push(m); } };

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };
const srv = http.createServer((req, res) => {
  const f = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]).replace(/^\/mini-tools/, ''));
  if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end('nf'); }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'text/plain' });
  res.end(fs.readFileSync(f));
});

/* the ban list, per locale's OWN vocabulary — never English.
   ⚠ \b is ASCII-only, so these use Unicode lookarounds. */
const W = (s) => new RegExp('(?<!\\p{L})(?:' + s + ')(?!\\p{L})', 'iu');
const VERDICT = {
  en: W('correct|wrong|well done|scores?|points?'), de: W('richtig|falsch|super gemacht|punkte'),
  fr: W('correct|faux|bravo|points?'), it: W('corretto|sbagliato|bravo|punti'),
  es: W('correcto|incorrecto|muy bien|puntos'), pt: W('correto|errado|muito bem|pontos'),
  nl: W('goed zo|fout|knap gedaan|punten'), sv: W('rätt svar|fel|bra jobbat|poäng'),
  da: W('rigtigt|forkert|godt klaret|point'), no: W('riktig|feil|bra jobbet|poeng'),
  fi: W('oikein|väärin|hyvin tehty|pisteitä')
};
const INVISIBLE = /[\u00AD\u200B\u200C\u200D\uFEFF\u0000-\u0008\u000B\u000C\u000E-\u001F]/;

(async () => {
  await new Promise((r) => srv.listen(PORT, r));
  const allSeen = {};

  for (const loc of LOCALES) {
    /* ⚠ a whole new browser, not a new page */
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();
    const errs = [];
    page.on('pageerror', (e) => errs.push('PAGEERROR: ' + e.message));
    await page.setViewport({ width: 1024, height: 900 });

    /* install the recorder before the shell mounts anything */
    await page.evaluateOnNewDocument(() => {
      window.__askedFor = {};
      const install = () => {
        if (!window.TenFrame || window.__proxied) return;
        window.__proxied = true;
        const real = window.TenFrame.strings;
        window.TenFrame.strings = new Proxy(real, {
          get(t, k) { if (typeof k === 'string') window.__askedFor[k] = 1; return t[k]; }
        });
      };
      const iv = setInterval(install, 1);
      window.addEventListener('load', () => { install(); setTimeout(() => clearInterval(iv), 2000); });
    });

    await page.goto(`http://127.0.0.1:${PORT}/ten-frame.html?lang=${loc}`, { waitUntil: 'networkidle0' });
    await page.waitForSelector('.tnf-cell');

    /* prove the instrument was actually installed — a recorder that
       could not attach reports "nothing was asked for" and looks
       exactly like a tool with dead strings */
    const proxied = await page.evaluate(() => !!window.__proxied);
    is(proxied, `${loc}: the strings recorder attached`);

    /* drive the tool through every surface that renders a string:
       BY INDEX, never by label */
    await page.evaluate(() => {
      const chips = document.querySelectorAll('.tnf-fieldchip');
      const bar = Array.from(document.querySelectorAll('.tnf-bar .tnf-chip'))
        .filter((e) => !e.classList.contains('tnf-fieldchip'));
      document.querySelectorAll('.tnf-cell')[6].click();      /* fill, so the tray + ghosts speak */
      bar[0].click();                                          /* Tidy */
      bar[1].click();                                          /* Fill the rest */
      chips[3].click();                                        /* another field */
      bar[3].click();                                          /* Keeps -> the gate, when free */
      /* ⚠ AND OPEN THE SETTINGS DRAWER. The shell resolves a setting's
         labelKey only when the drawer RENDERS, so six live keys —
         every drawer label — read as dead until it is opened. The
         first run of this gate reported exactly that, and the strings
         were fine; the DRIVING was incomplete. A dead-string gate is
         only as good as the states it reaches. */
      const ctrls = document.querySelectorAll('.lcs-ctrl');
      if (ctrls[0]) ctrls[0].click();
    });
    await new Promise((r) => setTimeout(r, 400));
    /* the numeral only renders when the setting is on — turn it on so
       its aria template is exercised too */
    await page.evaluate(() => {
      const t = window.TenFrame;
      t.api.settings.showNumber = true; t.render();
      t.api.settings.upright = true; t.render();
      t.api.settings.order = 'pairs'; t.render();
    });
    /* the two announcements the first run never reached: saidBoard
       fires only when the tray is EMPTY, saidTidied only when Tidy
       really moves something. */
    await page.evaluate(() => {
      const t = window.TenFrame;
      t.st = t._st({ g: 'ten', m: 0b1000000011, split: null });   /* scattered */
      t.render(); t._say('tidied');
      t.st = t.fillRest(t.st); t._paint(); t._say();               /* tray empty -> saidFull */
      /* ⚠ AND EXACTLY ONE LEFT — the state the ten panels just wrote a
         singular for, and the last beat of the tool's own routine. The
         first run of this gate never reached it, so ten freshly
         authored strings read as dead. */
      t.st = t._st({ g: 'ten', m: 0b0111111111 }); t._paint(); t._say();
    });
    await new Promise((r) => setTimeout(r, 250));

    const res = await page.evaluate(() => ({
      asked: Object.keys(window.__askedFor),
      title: document.querySelector('.lcs-title') ? document.querySelector('.lcs-title').textContent : '',
      gate: !!document.querySelector('.tnf-gate'),
      gateCta: document.querySelector('.tnf-gatecta') ? document.querySelector('.tnf-gatecta').textContent : '',
      body: document.body.innerText
    }));
    allSeen[loc] = res.asked;

    /* the authored set for this locale, straight off the tool */
    const strings = await page.evaluate(() => {
      const out = {}, s = window.TenFrame.strings;
      for (const k of Object.keys(s)) out[k] = s[k];
      return out;
    });
    const keys = Object.keys(strings);

    /* ---- every authored key must be REACHED, not merely present ---- */
    const dead = keys.filter((k) => res.asked.indexOf(k) === -1 && SHELL_CONSUMED.indexOf(k) === -1);
    is(dead.length === 0, `${loc}: every authored key is reached — dead: ${dead.join(', ')}`);

    /* ---- and the digest PRINTS the whole set, because an invisible
       character survives every assertion and only shows when printed -- */
    let bad = 0;
    for (const k of keys) {
      const v = strings[k][loc];
      if (typeof v !== 'string' || !v.trim()) { bad++; continue; }
      if (INVISIBLE.test(v)) { bad++; fails.push(`${loc}.${k} carries an invisible character`); }
      if (VERDICT[loc].test(v)) { bad++; fails.push(`${loc}.${k} carries a verdict word: "${v}"`); }
      if (PRINT) console.log(`  ${loc} ${res.asked.indexOf(k) > -1 ? '·' : '?'} ${k} = ${JSON.stringify(v)}`);
    }
    is(bad === 0, `${loc}: no empty, invisible-bearing or verdict-bearing string (${bad})`);
    is(res.title === strings.title[loc], `${loc}: the header renders the authored title (${res.title})`);
    is(errs.length === 0, `${loc}: no page errors ${JSON.stringify(errs.slice(0, 2))}`);

    console.log(`[${loc}] ${res.asked.length}/${keys.length} keys reached · title "${res.title}"` +
      (res.gate ? ` · gate "${res.gateCta}"` : ''));
    await browser.close();
  }

  srv.close();
  console.log(`\nsmoke-ten-frame-locales: ${PASS} passed, ${FAIL} failed`);
  if (FAIL) { console.error('\nFAILURES:'); fails.forEach((f) => console.error('  ' + f)); process.exit(1); }
  console.log('PASS');
})();
