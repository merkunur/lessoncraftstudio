#!/usr/bin/env node
/**
 * verify-clock-digital-a11y.js
 *
 * Drives the clock-digital activity in a real browser and asserts the four accessibility
 * fixes, per locale. It reads the RENDERED DOM, never the source: three of the four defects
 * this gate covers were invisible in source review and one of them (the instruction) is only
 * wrong for ONE of the six rows the engine serves.
 *
 * What it proves:
 *   A1  the digital-to-analog row does NOT show the analog-to-digital instruction, and the
 *       container's accessible name carries the corrected sentence too — lcs-shell.js
 *       interpolates `instruction` into it, so a wrong instruction is spoken to assistive
 *       tech as well as printed.
 *   A2  the hidden screen-reader block does not STATE THE TARGET TIME before the child
 *       chooses. (Reported, not enforced, until the native panels supply hand-position copy.)
 *   A4  the clock face's aria-label is localized — it was hardcoded English in all 8 locales.
 *   A5  WCAG 2.5.3 Label in Name: the digital choice card's accessible name CONTAINS its
 *       visible text. It used to show "3:00" and be named "3 o'clock", so a voice-control
 *       user saying what they saw could not hit the button.
 *
 * Usage: node scripts/verify-clock-digital-a11y.js [--locales=en,de,sv]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MANIFEST = path.join(MINI, 'clock-digital-activities.json');
const ENGINE = path.join(MINI, 'clock-digital-activity.js');

const arg = (n, d) => { const a = process.argv.find((x) => x.startsWith('--' + n + '=')); return a ? a.split('=')[1] : d; };
const LOCALES = arg('locales', 'en,de,fr,es,pt,it,nl,sv').split(',');

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml' };
function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    let file;
    if (p === '/' || p.endsWith('.html')) file = path.join(MINI, path.basename(p) || 'index.html');
    else if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
    else file = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (e, b) => {
      if (e) { res.writeHead(404); res.end('nf'); return; }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
      res.end(b);
    });
  });
}

/* the clock-face words the engine reuses from the sibling engines; sv is the one addition */
const FACE = { de: 'Zifferblatt', fr: 'cadran', es: 'carátula', pt: 'mostrador', it: 'quadrante', nl: 'wijzerplaat', sv: 'urtavla', en: 'clock face' };

(async () => {
  const rows = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  const readRow = rows.find((r) => !(r.params && r.params.direction === 'digital-to-analog'));
  const matchRow = rows.find((r) => r.params && r.params.direction === 'digital-to-analog');
  if (!readRow || !matchRow) { console.error('FAULT: could not find both a read row and a match row — the gate would be vacuous'); process.exit(1); }
  if (!/_applyDirectionInstruction/.test(fs.readFileSync(ENGINE, 'utf8'))) { console.error('FAULT: engine does not carry the A1 corrector'); process.exit(1); }

  const puppeteer = require('puppeteer');
  const srv = serve();
  await new Promise((r) => srv.listen(0, r));
  const port = srv.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });

  let fail = 0, checks = 0;
  const bad = (m) => { console.error('  FAIL ' + m); fail++; };
  const ok = (m) => { console.log('  ok   ' + m); checks++; };

  for (const loc of LOCALES) {
    console.log('\n=== ' + loc);
    const page = await browser.newPage();
    await page.setViewport({ width: 900, height: 1000 });
    const grab = async (row) => {
      await page.goto('http://localhost:' + port + '/clock-digital-activity.html?activity=' + row.id + '&lang=' + loc, { waitUntil: 'networkidle0' });
      await page.waitForSelector('.cd-choice', { timeout: 15000 });
      await new Promise((r) => setTimeout(r, 350));   /* let _loadActivity settle */
      return page.evaluate(() => {
        const app = document.querySelector('.lcs-app');
        const instr = document.querySelector('.lcs-instruction');
        const choices = [...document.querySelectorAll('.cd-choice')].map((b) => ({
          visible: (b.textContent || '').trim(),
          name: b.getAttribute('aria-label') || '',
          isClock: b.classList.contains('cd-clockcard')
        }));
        return {
          instruction: instr ? instr.textContent.trim() : null,
          appLabel: app ? app.getAttribute('aria-label') || '' : '',
          faceLabels: [...document.querySelectorAll('svg.cd-clock')].map((s) => s.getAttribute('aria-label')),
          hiddenFaceLabels: [...document.querySelectorAll('svg.cd-clock')].map((s) => s.getAttribute('aria-hidden')),
          sr: (document.querySelector('.cd-sronly') || {}).textContent || '',
          choices
        };
      });
    };

    const read = await grab(readRow);
    const match = await grab(matchRow);

    /* A1 */
    if (!read.instruction || !match.instruction) bad('A1: no instruction rendered');
    else if (read.instruction === match.instruction) bad('A1: the match row shows the SAME instruction as the read row — "' + match.instruction + '"');
    else ok('A1: match row has its own instruction — "' + match.instruction + '"');
    if (match.appLabel && match.appLabel.includes(match.instruction)) ok('A1: the container accessible name carries the corrected instruction');
    else bad('A1: container aria-label still carries the read-row instruction — "' + match.appLabel + '"');

    /* A4 — the stimulus face must be named in this locale */
    const word = FACE[loc];
    const named = read.faceLabels.filter(Boolean);
    if (!named.length) bad('A4: no clock face carries an aria-label');
    else if (loc !== 'en' && named.some((l) => /clock face/i.test(l))) bad('A4: an English "clock face" label survives in ' + loc);
    else if (word && !named.some((l) => l.toLowerCase().includes(word.toLowerCase()))) bad('A4: face label "' + named[0] + '" does not use the expected ' + loc + ' word "' + word + '"');
    else ok('A4: clock face named "' + named[0] + '"');

    /* A5 — label in name, on the digital cards */
    const digital = read.choices.filter((c) => !c.isClock && c.visible);
    if (!digital.length) bad('A5: no digital choice cards found — the check would be vacuous');
    else {
      const offenders = digital.filter((c) => c.name && !c.name.includes(c.visible));
      if (offenders.length) bad('A5: accessible name does not contain the visible label, e.g. shows "' + offenders[0].visible + '" named "' + offenders[0].name + '"');
      else ok('A5: all ' + digital.length + ' digital cards are named by their visible text');
    }
    /* the analog cards must still carry a name, and their inner dial must be hidden */
    const clocks = match.choices.filter((c) => c.isClock);
    if (clocks.length && clocks.every((c) => c.name)) ok('A5: analog cards keep a spoken name');
    else if (clocks.length) bad('A5: an analog choice card has no accessible name');
    if (match.hiddenFaceLabels.filter((h) => h === 'true').length >= clocks.length && clocks.length) ok('A5: inner dials hidden from assistive tech inside the buttons');

    /* A9 — the hidden list must be in the SAME order as the buttons.
       Found by the French panel by reading the engine: render() draws in the per-round
       shuffle `_optOrder` while _srMirror() built its list from the raw round.options, so a
       screen-reader user heard the choices in a different order from the one they then tab
       through. Silent, all-locale, and fatal to any attempt to number the items. */
    if (digital.length >= 2) {
      const visible = digital.map((c) => c.visible);
      /* ⚠ NOT indexOf: "1:00" occurs INSIDE "11:00", so a plain substring search made a
         CORRECT order look scrambled and I nearly filed it as a copy defect. The label must
         not be preceded by a digit. */
      const posOf = (v) => {
        const m = new RegExp('(?<!\\d)' + v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).exec(read.sr);
        return m ? m.index : -1;
      };
      const inSr = visible.filter((v) => posOf(v) >= 0);
      if (inSr.length < visible.length) bad('A9: not every visible choice appears in the sr text');
      else {
        const idx = visible.map(posOf);
        const ordered = idx.every((v, i) => i === 0 || v > idx[i - 1]);
        if (ordered) ok('A9: sr list is in the same order as the buttons (' + visible.join(', ') + ')');
        else bad('A9: sr list order differs from the button order — sr "' + read.sr.trim().slice(0, 80) + '" vs buttons ' + visible.join(', '));
      }
    }

    /* A10 — no analog choice may be NAMED BY ITS TIME.
       Asked for by the French panel, which pointed out that A9 proves the two lists are in
       the same ORDER and nothing asserted that a button's accessible name contains no time.
       Each row-6 clock used to be named `spoken(t)`, so a blind child tabbed the cards, heard
       "three o'clock", and did string comparison against the question — never reading a clock.
       Rewriting the sr summary alone changed nothing, because both came from that one call. */
    if (clocks.length) {
      const named = clocks.map((c) => c.name);
      /* ⚠ The first version of this compared the names against the READ row's spoken forms —
         a set A5 had already emptied, so it compared against nothing and PASSED THE POISON.
         The structural test instead: the button name and the sr list item are built from ONE
         fragment, so every button's accessible name must appear VERBATIM in that row's sr
         text. Naming a button by its time breaks that by construction. */
      const missing = named.filter((n) => !n || !match.sr.includes(n));
      if (missing.length) bad('A10: an analog choice name is not the sr item fragment — "' + (missing[0] || '(empty)') + '"\n        sr: ' + match.sr.trim().slice(0, 140));
      else ok('A10: analog choices are named by the same hand fragment as the sr list (' + named.length + ' clocks)');
    }

    /* A2/A11 — the hidden description must not STATE THE TIME.
       It used to read "The clock shows 3 o'clock. The choices are: 3:00, 9:00, 6:00", handing
       the answer over before the child chose. The choices list legitimately contains the
       target (it is one of the options), so the assertion is scoped to everything BEFORE that
       list: the part describing the dial must contain no clock-time pattern at all.
       Suggested by the English panel as the way to close the leak by construction rather than
       by care. */
    if (read.sr) {
      /* ⚠ The first version sliced the text at the FIRST time pattern and checked only what
         came before — so a poisoned description that STATED a time supplied the slice point
         itself and the check passed. It was vacuous, and its own poison caught it.
         The sound test counts instead: the choices list contributes exactly one time per
         choice, so any additional one is a leak, wherever it sits. */
      const times = read.sr.match(/\d{1,2}\s*[:.h]\s*\d{2}/g) || [];
      const expected = digital.length;
      if (!expected) bad('A2: no digital choices found — the count check would be vacuous');
      else if (times.length > expected) bad('A2: the sr text states ' + (times.length - expected) + ' time(s) beyond the ' + expected + ' choices — "' + read.sr.trim().slice(0, 120) + '"');
      else if (/o['’]clock|half past|quarter (past|to)/i.test(read.sr.replace(/The choices[\s\S]*$/i, ''))) bad('A2: the dial description names a spoken time — "' + read.sr.trim().slice(0, 120) + '"');
      else ok('A2: the dial is described by its hands; ' + times.length + ' time(s) present, all of them choices');
      console.log('       sr: "' + read.sr.trim().slice(0, 110) + '"');
    }

    await page.close();
  }

  await browser.close();
  srv.close();
  if (!checks) { console.error('\nFAULT: 0 assertions ran — the gate is vacuous'); process.exit(1); }
  console.log('\n' + checks + ' assertions passed, ' + fail + ' failed, across ' + LOCALES.length + ' locales');
  process.exit(fail ? 1 : 0);
})();
