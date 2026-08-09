/* =====================================================================
   smoke-exchange-machine-locales.js — TOOL #45 in all eleven
   ---------------------------------------------------------------------
   Run:  node scripts/smoke-exchange-machine-locales.js

   ⚠ FRESH BROWSER PER LOCALE. A shared one caches the module and every
   later locale passes on the first one's copy — a green run that has
   tested exactly one language.

   ⚠ REACH CONTROLS BY INDEX, NEVER BY AN ENGLISH LABEL. "Another sum"
   does not exist in Finnish, and a selector that reads English is a
   selector that silently matches nothing in ten locales.

   ⭐ AND IT PRINTS THE WHOLE AUTHORED STRING SET WITH SEEN/UNSEEN MARKS.
   A key can be authored in eleven languages, pass every assertion, and
   be consumed by NOTHING — the dead-string defect. Only a digest that
   names what was never reached can show that.
   ===================================================================== */

'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..', 'mini tools');
const T = require(path.join(ROOT, 'exchange-machine.js'));
const PORT = 5588;
const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

const srv = http.createServer((rq, rs) => {
  let f = rq.url.split('?')[0].replace('/mini-tools/', '');
  while (f.charAt(0) === '/') f = f.slice(1);
  if (!f) f = 'exchange-machine.html';
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  const t = f.endsWith('.js') ? 'application/javascript' : f.endsWith('.json') ? 'application/json'
    : f.endsWith('.css') ? 'text/css' : 'text/html';
  rs.writeHead(200, { 'Content-Type': t }); rs.end(fs.readFileSync(fp));
}).listen(PORT);

let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) { PASS++; console.log('  ok   ' + m); } else { FAIL++; console.error('  FAIL ' + m); } };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const KEYS = Object.keys(T.strings);
const seen = {};
KEYS.forEach((k) => { seen[k] = {}; });

(async () => {
  for (const loc of LOCALES) {
    /* fresh browser, not just a fresh page */
    const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const p = await b.newPage();
    const errs = [];
    p.on('pageerror', (e) => errs.push(String(e)));
    await p.setViewport({ width: 1024, height: 900, deviceScaleFactor: 1 });
    await p.goto(`http://127.0.0.1:${PORT}/mini-tools/exchange-machine.html?lang=${loc}`, { waitUntil: 'load' });
    await p.waitForSelector('.exm-wrap', { timeout: 9000 });
    await wait(150);

    const harvest = async () => {
      const txt = await p.evaluate(() => {
        const bits = [document.body.innerText];
        document.querySelectorAll('[aria-label]').forEach((n) => bits.push(n.getAttribute('aria-label')));
        return bits.join('\n');
      });
      KEYS.forEach((k) => {
        const v = T.strings[k][loc];
        if (!v) return;
        /* ⚠ NO WILDCARD. A placeholder matched with `.{1,60}?` matches any
           prose, so a string consumed by nothing reports as rendered.
           Compare the longest literal RUN either side of the token. */
        const runs = String(v).split(/\{[a-z]\}/i).map((x) => x.trim()).filter((x) => x.length > 12);
        const probe = runs.length ? runs.sort((a, c) => c.length - a.length)[0] : String(v);
        if (txt.indexOf(probe) >= 0) seen[k][loc] = true;
      });
    };

    await harvest();
    /* drive the machine: exchange, then take, then stamp, then the chips */
    const click = async (sel, i) => {
      const ok = await p.evaluate((s, n) => {
        const el = document.querySelectorAll(s)[n];
        if (!el || el.disabled) return false; el.click(); return true;
      }, sel, i);
      await wait(140); return ok;
    };
    /* ⭐ THE DRIVE HAS TO REACH EVERY STATE, or the digest reports my
       laziness as a dead string. Six keys came back UNSEEN on the first
       run and only ONE of them was really dead: the rest needed the
       cascade record, a carry, an undo and a finished sum. */
    await harvest();                                       /* hintStart, at rest on 48-23 */
    for (let i = 0; i < 3; i++) { await click('.exm-hit:not(.exm-slot)', 0); }
    await click('.exm-slot', 0); await harvest();
    for (let i = 0; i < 2; i++) { await click('.exm-hit:not(.exm-slot)', 1); }
    await click('.exm-slot', 1); await harvest();          /* hintDone */

    await click('.exm-chip', 2); await harvest();          /* -> 42-17, hintShort */
    await click('.exm-hit:not(.exm-slot)', 1); await harvest();   /* breakAria fires */
    for (let i = 0; i < 7; i++) await click('.exm-hit:not(.exm-slot)', 0);
    await click('.exm-slot', 0); await harvest();

    /* the cascade record: an empty tens that must be broken from further left */
    for (let i = 0; i < 3; i++) { await click('.exm-chip', 2); await harvest(); }

    /* addition: fill past ten so the carry, its label and the undo all appear */
    await click('.exm-chip', 1); await harvest();          /* operation */
    for (let i = 0; i < 9; i++) await click('.exm-hit:not(.exm-slot)', 0);
    await harvest();                                       /* hintOver + sendAria */
    await click('.exm-hit:not(.exm-slot)', 0); await harvest();   /* the carry */
    await harvest();                                       /* backAria on the carried lane */
    /* run the addition all the way out — the tens fill AND carry too, or
       the machine never reaches the state where every lane is under ten */
    for (let round = 0; round < 14; round++) {
      let moved = false;
      for (let k = 0; k < 3; k++) if (await click('.exm-hit:not(.exm-slot)', k)) moved = true;
      await harvest();
      if (!moved) break;
    }
    await click('.exm-chip', 0); await harvest();          /* method */
    await click('.exm-chip', 3); await harvest();          /* print -> gate */

    const title = await p.$eval('.lcs-title', (n) => n.textContent.trim());
    is(title === T.strings.title[loc], `${loc}: the h1 is the authored title ("${title}")`);
    is(errs.length === 0, `${loc}: no console errors` + (errs.length ? ': ' + errs[0] : ''));
    /* ⚠ a raw key on screen means t() fell through to the key name */
    const raw = await p.evaluate((ks) => ks.filter((k) => document.body.innerText.indexOf(k) >= 0), KEYS);
    is(raw.length === 0, `${loc}: no raw key leaked onto the page` + (raw.length ? ': ' + raw[0] : ''));
    await b.close();
  }

  console.log('\n— THE AUTHORED STRING SET, key by key —');
  const dead = [];
  KEYS.forEach((k) => {
    const hit = LOCALES.filter((l) => seen[k][l]);
    const mark = hit.length === LOCALES.length ? 'seen  ' : hit.length === 0 ? 'UNSEEN' : 'part  ';
    console.log(`  ${mark} ${k.padEnd(14)} ${hit.length}/${LOCALES.length}`);
    if (hit.length === 0) dead.push(k);
  });
  /* the shell consumes these itself, so they are exempt by name */
  const SHELL = ['sceneLabel'];
  const realDead = dead.filter((k) => SHELL.indexOf(k) < 0);
  is(realDead.length === 0,
     'no authored key is consumed by nothing' + (realDead.length ? ` — ${realDead.join(', ')}` : ''));

  srv.close();
  if (FAIL) { console.error(`\nFAIL — ${FAIL} of ${PASS + FAIL}`); process.exit(1); }
  console.log(`\nPASS — ${PASS} assertions across ${LOCALES.length} locales`);
})().catch((e) => { console.error(e); srv.close(); process.exit(1); });
