/* =====================================================================
   live-verify-number-line.js — TOOL #1 against PRODUCTION
   ---------------------------------------------------------------------
   Run (AFTER deploy):  node scripts/live-verify-number-line.js

   11 locales against https://www.lessoncraftstudio.com, fresh browser
   each, DRIVING THE MAIN CONTROL with a real drag and a real chain —
   never "it mounts".

   ⚠ IT ASSERTS THE CONSEQUENCE, not the action: the hop count grew, the
   arcs are congruent IN RENDERED PIXELS, and the rabbit's feet are on
   the axis. A tool can mount, paint, and be silently wrong.

   ⚠ CONTENT BANS ARE POISON-TESTED BEFORE A SINGLE PAGE IS READ.

   ⚠⚠ AND THE BANS ARE SCOPED TO THE TOOL'S OWN PROSE — `.nl-wrap` and
   the tool's aria-labels, never `document.body.textContent`. On a
   landing page the body carries Next's RSC flight data, which serialises
   every sibling tool on the page; #40's no-named-unit ban read the
   RULER's correct Swedish slug and condemned ten locales.
   ===================================================================== */

'use strict';
const puppeteer = require('puppeteer');
const path = require('path');

const BASE = process.env.LCS_BASE || 'https://www.lessoncraftstudio.com';
const T = require(path.join(__dirname, '..', 'mini tools', 'number-line.js'));
const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

let FAIL = 0;
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const W = (s) => new RegExp('(?<!\\p{L})' + s + '(?!\\p{L})', 'iu');

/* ---- the bans, poison-tested in BOTH directions, before anything ----- */
const BANS = [
  { name: 'verdict vocabulary', re: new RegExp(
    ['correct', 'wrong', 'well done', 'score', 'richtig', 'falsch',
      'oikein', 'väärin', 'rätt', 'riktig', 'forkert']
      .map((s) => '(?<!\\p{L})' + s + '(?!\\p{L})').join('|'), 'iu'),
    fire: ['Well done!', 'Das ist richtig!', 'Oikein!'],
    pass: ['Jeder Sprung ist gleich lang', 'Det gick jämnt ut', 'Point de départ du lapin'] },
  /* ⚠⚠ the mare — `en hoppe` is a mare, so these read "the mare(s)" */
  { name: 'da/no: hoppen/hoppene is THE MARE', re: /(?<!\p{L})hoppene?(?!\p{L})/iu,
    fire: ['forsvinner hoppene', 'Se på hoppen'],
    pass: ['Træk i hoppet', 'Dra i hoppet', 'hvert hop er lige langt'] },
  /* ⚠ hyppy is open-number-line's shipped Finnish TITLE */
  { name: 'fi: hyppy is a sibling’s name', re: /(?<!\p{L})hyppy\p{L}*/iu,
    fire: ['Paina Hyppy', 'jokainen hyppy'],
    pass: ['Vedä loikkaa', 'Jokainen loikka on yhtä pitkä'] }
];
{
  let pf = 0;
  for (const b of BANS) {
    for (const s of b.fire) if (!b.re.test(s)) { pf++; console.error('POISON: "' + b.name + '" did not fire on "' + s + '"'); }
    for (const s of b.pass) if (b.re.test(s)) { pf++; console.error('POISON: "' + b.name + '" wrongly fired on "' + s + '"'); }
  }
  if (pf) { console.error('\nFATAL: the bans are not trustworthy. Nothing checked.'); process.exit(1); }
  console.log('ok   ' + BANS.length + ' bans poison-tested in both directions\n');
}

(async () => {
  for (const loc of LOCALES) {
    const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const p = await b.newPage();
    const errs = [];
    p.on('pageerror', (e) => errs.push(String(e)));
    const bad = [];
    try {
      await p.setViewport({ width: 1024, height: 900 });
      const url = BASE + '/mini-tools/number-line.html?lang=' + loc + '&embed=1';
      const resp = await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      if (!resp || resp.status() !== 200) bad.push('HTTP ' + (resp && resp.status()));
      await p.waitForSelector('.nl-wrap', { timeout: 15000 });
    } catch (e) { bad.push('did not mount: ' + String(e).slice(0, 80)); }

    if (!bad.length) {
      await wait(600);

      /* ⭐ DRIVE THE MAIN CONTROL — the chain, by INDEX not by text */
      const before = await p.evaluate(() => {
        const X = window.NumberLine;
        X.st = X._st({ max: 20, start: 0, hop: 5, n: 0 }); X._paint();
        return X.st.n;
      });
      await p.evaluate(() => [...document.querySelectorAll('.nl-chip')][1].click());
      await wait(2600);

      const m = await p.evaluate(() => {
        const X = window.NumberLine;
        const arcs = [...document.querySelectorAll('.nl-arc')].map((e) => {
          const r = e.getBoundingClientRect();
          return { w: +r.width.toFixed(2), h: +r.height.toFixed(2) };
        });
        const st = document.querySelector('.nl-stage').getBoundingClientRect();
        const bun = document.querySelector('.nl-bunny').getBoundingClientRect();
        const axisPx = st.top + st.height * (X.AXIS_Y / X.H);
        /* ⚠ our own prose ONLY — never document.body */
        let prose = document.querySelector('.nl-wrap').innerText;
        document.querySelectorAll('.nl-wrap [aria-label], .nl-stage[aria-label]')
          .forEach((e) => { prose += '\n' + e.getAttribute('aria-label'); });
        return {
          n: X.st.n, arcs: arcs.length,
          dw: arcs.length ? Math.max(...arcs.map((a) => a.w)) - Math.min(...arcs.map((a) => a.w)) : 99,
          dh: arcs.length ? Math.max(...arcs.map((a) => a.h)) - Math.min(...arcs.map((a) => a.h)) : 99,
          feet: +(bun.bottom - axisPx).toFixed(1),
          title: (document.querySelector('.lcs-header') || {}).innerText || '',
          prose: prose
        };
      });

      if (m.n !== 4) bad.push('the chain did not reach the wall (n=' + m.n + ')');
      if (m.arcs !== 4) bad.push('drew ' + m.arcs + ' arcs, want 4');
      if (m.dw > 1.2 || m.dh > 1.2) bad.push('arcs not congruent (' + m.dw + 'w/' + m.dh + 'h px)');
      if (Math.abs(m.feet) > 2) bad.push('the rabbit is off the line by ' + m.feet + 'px');
      for (const bn of BANS) if (bn.re.test(m.prose)) bad.push(bn.name);
      /* the head term must survive — this is the one build that must not rename */
      const want = T.strings.title[loc];
      if (m.prose.indexOf(want) < 0 && m.title.indexOf(want) < 0) bad.push('title "' + want + '" not on the page');
      if (errs.length) bad.push('JS: ' + errs[0].slice(0, 60));
    }

    if (bad.length) FAIL++;
    console.log((bad.length ? 'FAIL ' : 'ok   ') + loc + (bad.length ? '   ' + bad.join('; ') : '   chain reached the wall, 4 congruent arcs, feet on the line'));
    await b.close();
  }
  console.log('\n' + (FAIL ? 'FAIL' : 'PASS') + '  ' + (LOCALES.length - FAIL) + '/' + LOCALES.length + ' locales live');
  process.exit(FAIL ? 1 : 0);
})();
