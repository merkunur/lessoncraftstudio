/* =====================================================================
   smoke-number-line-locales.js — all 11 locales, end to end
   ---------------------------------------------------------------------
   Run:  node scripts/smoke-number-line-locales.js [--locales=de,fi]

   ⚠ FRESH BROWSER PER LOCALE, not a fresh page. A stale locale leaks
   through a shared context and every subsequent locale then "passes"
   against the first one's strings.

   ⚠ COMPARED VERBATIM, NEVER WITH A WILDCARD. A coverage check that
   matches numeric slots with `.{1,60}?` matches any prose, and a string
   dead in all eleven locales reports as rendered. Every authored value
   must appear character-for-character in the rendered DOM or in an
   aria-label.

   ⚠ CONTROLS ARE REACHED BY INDEX, NEVER BY ENGLISH TEXT. "Another
   BLUEPRINT" contains "print", and matching `/print/i` picked the wrong
   chip and reported a defect in a working tool.

   ⚠ AND THE ENGLISH-LEAK CHECK IS SCOPED TO OUR OWN PROSE. Reading
   `document.body.textContent` would include Next's RSC flight data on a
   landing page; here it is a bare iframe document, but the rule stands —
   we read `.nl-wrap` and the tool's own aria-labels, nothing else.
   ===================================================================== */

'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..', 'mini tools');
const PORT = 5578;
const T = require(path.join(ROOT, 'number-line.js'));
const ALL = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const only = (process.argv.find((a) => a.indexOf('--locales=') === 0) || '').split('=')[1];
const LOCALES = only ? only.split(',') : ALL;

const srv = http.createServer((rq, rs) => {
  const f = rq.url.split('?')[0].replace('/mini-tools/', '');
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  const t = f.endsWith('.js') ? 'application/javascript' : f.endsWith('.json') ? 'application/json'
    : f.endsWith('.css') ? 'text/css' : 'text/html';
  rs.writeHead(200, { 'Content-Type': t }); rs.end(fs.readFileSync(fp));
}).listen(PORT);

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
let FAIL = 0;

/* the five model states that between them reach every hint branch */
const MATRIX = [
  { max: 20, start: 0, hop: 5, n: 0 },
  { max: 20, start: 0, hop: 5, n: 2 },
  { max: 20, start: 0, hop: 5, n: 4 },
  { max: 20, start: 0, hop: 3, n: 6 },
  { max: 10, start: 8, hop: 5, n: 0 }
];

(async () => {
  for (const loc of LOCALES) {
    /* ⚠ a whole browser, not a page */
    const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const p = await b.newPage();
    const errs = [];
    p.on('pageerror', (e) => errs.push(String(e)));
    await p.setViewport({ width: 1024, height: 900 });
    await p.goto(`http://127.0.0.1:${PORT}/number-line.html?lang=${loc}&embed=1`,
      { waitUntil: 'domcontentloaded' });
    await p.waitForSelector('.nl-wrap', { timeout: 9000 });
    await wait(250);

    /* harvest everything the tool renders, across the whole matrix */
    let harvest = '';
    for (const st of MATRIX) {
      harvest += await p.evaluate((s) => {
        const X = window.NumberLine;
        X.st = X._st(s); X._stopFlight(); X._paint();
        const parts = [document.querySelector('.nl-wrap').innerText];
        document.querySelectorAll('[aria-label]').forEach((e) => parts.push(e.getAttribute('aria-label')));
        const h = document.querySelector('.lcs-header');
        if (h) parts.push(h.innerText);
        const app = document.querySelector('.lcs-app');
        if (app && app.getAttribute('aria-label')) parts.push(app.getAttribute('aria-label'));
        return parts.join('\n');
      }, st);
      harvest += '\n';
    }
    /* the gate panel */
    const gate = await p.evaluate(() => {
      window.NumberLine._showGate();
      const g = document.querySelector('.nl-gate');
      if (!g) return null;
      const a = g.querySelector('a');
      return {
        text: g.innerText,
        childNodes: g.children.length,
        href: a && a.getAttribute('href'),
        anchorIsOwnNode: !!a && a.textContent.trim().length > 0,
        anchorText: a && a.textContent
      };
    });
    harvest += (gate ? gate.text : '');

    /* ---- every authored value, verbatim ---- */
    const seen = [], unseen = [];
    for (const k of Object.keys(T.strings)) {
      const v = T.strings[k][loc];
      if (typeof v !== 'string' || !v.trim()) { unseen.push(k + ' (EMPTY)'); continue; }
      (harvest.indexOf(v) >= 0 ? seen : unseen).push(k);
    }

    /* ---- English leak: any non-en locale rendering an en-only value ----
       ⚠⚠ WHOLE-WORD, NOT SUBSTRING, AND THIS IS NOT A REFINEMENT — the
       substring version FAILED TWO CORRECT LOCALES on its first run:
       English "Hop" sits inside Swedish "Hoppa" and Norwegian "Hopp".
       That is §A.13.53's recorded trap ("never bare roots") in a new
       dress, and it is the fourth ban-too-wide defect of this build.
       `\b` is no use here either — it is ASCII-only and would misjudge
       every accented locale, so the boundary is a Unicode lookaround. */
    const leaks = [];
    if (loc !== 'en') {
      const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      for (const k of Object.keys(T.strings)) {
        const en = T.strings[k].en, mine = T.strings[k][loc];
        if (en === mine) continue;                 /* legitimately identical */
        const re = new RegExp('(?<!\\p{L})' + esc(en) + '(?!\\p{L})', 'u');
        if (re.test(harvest)) leaks.push(k);
      }
    }

    /* ---- raw keys, undefined, empty controls ---- */
    const junk = await p.evaluate(() => {
      const out = [];
      document.querySelectorAll('.nl-chip,.nl-range').forEach((e, i) => {
        const t = (e.textContent || '').trim();
        if (!t) out.push('empty control #' + i);
        if (/^[a-z]+[A-Z]\w*$/.test(t)) out.push('raw key "' + t + '" at #' + i);
        if (/undefined|\[object/.test(t)) out.push('junk "' + t + '" at #' + i);
      });
      document.querySelectorAll('[aria-label]').forEach((e) => {
        const t = e.getAttribute('aria-label') || '';
        if (!t.trim() || /undefined|\[object/.test(t)) out.push('bad aria-label "' + t + '"');
      });
      return out;
    });

    /* ---- drive the routine BY INDEX, never by text ---- */
    const routine = await p.evaluate(() => {
      const X = window.NumberLine;
      X.st = X._st({ max: 20, start: 0, hop: 5, n: 0 }); X._paint();
      const chips = [...document.querySelectorAll('.nl-chip')];
      const before = X.st.n;
      chips[0].click();                     /* index 0 is Hop, in every locale */
      const afterHop = X.st.n;
      chips[3].click();                     /* index 3 is Another line */
      const changed = JSON.stringify(X.st);
      return { before, afterHop, changed, chipCount: chips.length };
    });
    await wait(200);

    const bad = [];
    if (unseen.length) bad.push('UNRENDERED: ' + unseen.join(', '));
    if (leaks.length) bad.push('ENGLISH LEAK: ' + leaks.join(', '));
    if (junk.length) bad.push(junk.join('; '));
    if (!gate) bad.push('no gate panel');
    else {
      if (gate.childNodes !== 3) bad.push('gate is ' + gate.childNodes + ' nodes, want 3');
      if (!gate.anchorIsOwnNode) bad.push('gate CTA is not its own node');
      if (gate.href !== '/pricing') bad.push('gate href is ' + gate.href);
    }
    if (routine.chipCount !== 5) bad.push('chip count ' + routine.chipCount);
    if (routine.afterHop !== routine.before + 1) bad.push('Hop (index 0) did not advance');
    if (errs.length) bad.push('JS: ' + errs[0]);

    if (bad.length) FAIL++;
    console.log((bad.length ? 'FAIL ' : 'ok   ') + loc +
      '  ' + seen.length + '/' + Object.keys(T.strings).length + ' strings rendered verbatim' +
      (bad.length ? '\n       ' + bad.join('\n       ') : ''));

    await b.close();
  }

  srv.close();
  console.log('\n' + (FAIL ? 'FAIL' : 'PASS') + '  ' + (LOCALES.length - FAIL) + '/' + LOCALES.length + ' locales clean');
  process.exit(FAIL ? 1 : 0);
})();
