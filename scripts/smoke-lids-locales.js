/* =====================================================================
   smoke-lids-locales.js — TOOL #39 in all eleven languages
   ---------------------------------------------------------------------
   Run:  node scripts/smoke-lids-locales.js

   ⚠ A FRESH BROWSER PER LOCALE. Not a fresh page — a fresh browser.
   The shell caches its language on the window and a reused context has
   shipped one locale's chrome under another locale's title before.

   ⚠ AND IT PRINTS THE WHOLE AUTHORED STRING SET, every locale, so a
   reviewer can read what actually rendered rather than trust a tick.
   The recorded arrow-strip defect is exactly this: a coverage check
   whose numeric placeholder matched with `.{1,60}?` matched any prose at
   all, so a string dead in all eleven locales reported as covered.
   Nothing here matches with a wildcard: every expected string is
   compared verbatim against the DOM.

     S1 the title, the instruction and every control render in-locale
     S2 no string is left in English where another locale was authored
     S3 no raw key, no "undefined", no empty control
     S4 the routine runs end to end in every language
     S5 the gate line and its link are two nodes and point at pricing
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const vm = require('vm');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
const PORT = 5521;
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };
const serve = () => http.createServer((req, res) => {
  const f = path.join(MINI, path.basename(decodeURIComponent(req.url.split('?')[0])));
  fs.readFile(f, (e, b) => {
    if (e) { res.writeHead(404); res.end('404'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
    res.end(b);
  });
});

const sandbox = {
  document: { getElementById: () => null, createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }), head: { appendChild() {} }, body: { classList: { add() {}, remove() {} } } },
  window: {}, localStorage: { getItem: () => null, setItem() {} },
  fetch: () => Promise.resolve({ ok: false }), setTimeout: () => 0, clearTimeout() {}, Promise, Math, Date, JSON, console
};
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(MINI, 'lids.js'), 'utf8') + '\n;this.__T = Lids;', sandbox);
const T = sandbox.__T;

let PASS = 0, FAIL = 0;
const is = (cond, msg) => { if (cond) { PASS++; } else { FAIL++; console.error('  FAIL ' + msg); } };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const server = serve().listen(PORT);
  console.log('THE LIDS — eleven languages, a fresh browser each\n');

  for (const loc of LOCALES) {
    /* ⚠ FRESH BROWSER, NOT FRESH PAGE */
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    await page.setRequestInterception(true);
    page.on('request', (r) => (r.url().includes('/api/auth/me')
      ? r.respond({ status: 200, contentType: 'application/json', body: JSON.stringify({ user: { subscriptionTier: 'free' }, subscription: null }) })
      : r.continue()));
    const errs = [];
    page.on('pageerror', (e) => errs.push(String(e)));
    page.on('console', (m) => { if (m.type() === 'error' && !/404|net::ERR/.test(m.text())) errs.push(m.text()); });

    await page.setViewport({ width: 1024, height: 900 });
    await page.goto(`http://127.0.0.1:${PORT}/lids.html?lang=${loc}&embed=1`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.lid-wrap', { timeout: 9000 });
    await wait(400);

    const S = (k) => T.strings[k][loc];
    const seen = await page.evaluate(() => ({
      title: (document.querySelector('.lcs-title') || {}).textContent || '',
      hint: (document.querySelector('.lid-hint') || {}).textContent || '',
      foot: Array.from(document.querySelectorAll('.lid-foot .lid-chip:not(.lid-step)')).map((b) => b.textContent),
      marks: Array.from(document.querySelectorAll('.lid-mark')).map((b) => b.getAttribute('aria-label')),
      barLabel: (document.querySelector('.lid-total') || {}).getAttribute && document.querySelector('.lid-total').getAttribute('aria-label'),
      stripLabel: (document.querySelector('.lid-strip') || {}).getAttribute && document.querySelector('.lid-strip').getAttribute('aria-label'),
      body: document.querySelector('.lid-wrap').textContent
    }));

    console.log('  [' + loc + ']  ' + S('title'));
    console.log('        hint    : ' + seen.hint);
    console.log('        controls: ' + seen.foot.join(' | '));
    console.log('        total   : ' + seen.barLabel);
    console.log('        strip   : ' + seen.stripLabel);

    /* S1 — verbatim, never a wildcard */
    /* ⚠ TWO RUNGS ON THE OPENING FRAME. The move comes first, because a
   teacher scanning for five seconds needs the verb in the first three
   words; the rule is the second line because it is what makes the NEXT
   five seconds make sense. The old single-rung form said neither what a
   lid does nor how to put one down. */
    is(seen.hint.indexOf(S('hintPlace')) === 0, loc + ': the opening hint is "' + seen.hint + '", expected it to open with "' + S('hintPlace') + '"');
    is(seen.hint.indexOf(S('hintRule')) > 0, loc + ': the opening frame never states the rule that makes the puzzle work');
    /* ⚠ firstLid, NOT addLid. With nothing on the table "Another lid" is a
   lie — another than what? — so the chip is named for the state it is
   actually in, and it lays a PAIR when pressed. */
    const wantFoot = [S('firstLid'), S('takeLid'), S('liftBtn'), S('newSetBtn'), S('printBtn')];
    is(seen.foot.join('|') === wantFoot.join('|'), loc + ': controls are [' + seen.foot.join(', ') + '], expected [' + wantFoot.join(', ') + ']');
    is(seen.barLabel === S('totalLabel'), loc + ': the total group is labelled "' + seen.barLabel + '"');
    is(seen.stripLabel === S('markStrip'), loc + ': the marker strip is labelled "' + seen.stripLabel + '"');
    is(seen.marks[3] === S('markAria').replace('{n}', '4'), loc + ': the fourth numeral reads "' + seen.marks[3] + '"');

    /* S2 — no English left where another locale was authored */
    if (loc !== 'en') {
      const enLeak = ['addLid', 'takeLid', 'liftBtn', 'newSetBtn', 'printBtn', 'hintPlace']
        .filter((k) => T.strings[k].en !== T.strings[k][loc] && seen.body.indexOf(T.strings[k].en) >= 0);
      is(enLeak.length === 0, loc + ': English leaked through for ' + enLeak.join(', '));
    }

    /* S3 — no raw keys, no undefined, no empty control */
    is(!/\bundefined\b/.test(seen.body), loc + ': "undefined" rendered on the page');
    is(!Object.keys(T.strings).some((k) => seen.foot.indexOf(k) >= 0), loc + ': a raw key rendered as a control label');
    is(seen.foot.every((t) => t && t.trim()), loc + ': a control rendered with no label at all');

    /* S4 — the routine runs end to end */
    const click = async (label) => {
      const ok = await page.evaluate((l) => {
        const b = Array.from(document.querySelectorAll('.lid-foot .lid-chip')).find((x) => x.textContent === l);
        if (!b || b.disabled) return false;
        b.click(); return true;
      }, label);
      await wait(110);
      return ok;
    };
        /* ⚠ ON AN EMPTY TABLE THE CHIP READS firstLid, AND IT LAYS A PAIR.
   "Another lid" is a lie there — another than what? — and one lid took
   floor(n/1) = n, swallowing every counter one click from the opening
   frame. So the reachable set is {0,2,3,4}. */
    is(await click(S('firstLid')), loc + ': the pair of lids could not be put down');

    /* ⭐ S6 — hintMark, in every language, for the first time. It was
       authored in all eleven locales and never once referenced, so the
       tool never told the class what the numeral strip was for. This is
       the state where it belongs: two lids down, nothing committed. */
    const rung = await page.evaluate(() =>
      Array.from(document.querySelectorAll('.lid-hint .lid-hline')).map((e) => e.textContent));
    is(rung.length === 2, loc + ': the live-and-empty hint is ' + rung.length + ' line(s), expected 2');
    is(rung[0] === S('hintShare'), loc + ': line 1 is "' + rung[0] + '", expected "' + S('hintShare') + '"');
    is(rung[1] === S('hintMark'), loc + ': line 2 is "' + rung[1] + '", expected "' + S('hintMark') + '"');
    console.log('        strip is: ' + rung.join(' / '));
    /* and the strip is only now alive */
    const live = await page.evaluate(() =>
      Array.from(document.querySelectorAll('.lid-mark')).every((b) => b.getAttribute('aria-disabled') !== 'true'));
    is(live, loc + ': the strip did not come alive when the second lid went down');

    /* ⚠ BY VALUE, NOT BY INDEX. The strip ran 0..12 so index and numeral
   coincided by accident; it now runs 1..stripTop(n), which is sized to
   the table, so every index-addressed assertion shifted by one. */
    await page.evaluate(() => { const m = Array.from(document.querySelectorAll('.lid-mark')).find((x) => x.textContent === '9'); if (m) m.click(); });
    await wait(110);
    is(await click(S('liftBtn')), loc + ': the lids could not be lifted');
    const after = await page.evaluate(() => ({
      truth: (function () { const b = document.querySelector('.lid-mark.lid-truth'); return b ? parseInt(b.textContent, 10) : -1; }()),
      again: Array.from(document.querySelectorAll('.lid-foot .lid-chip')).map((b) => b.textContent),
      marked: (function () { const b = document.querySelector('.lid-mark.lid-on'); return b ? parseInt(b.textContent, 10) : -1; }())
    }));
    is(after.truth === 6, loc + ': the truth lands on numeral ' + after.truth + ' on the same strip, expected 6');
    is(after.again.indexOf(S('againBtn')) >= 0, loc + ': the lift control does not read "' + S('againBtn') + '" after the lift (saw ' + after.again.join(' | ') + ')');
    is(after.marked === 9, loc + ': the committed marker (9) did not survive the lift, saw ' + after.marked);

    /* S5 — the gate, two nodes, pointing at this locale's pricing.
       ⚠ THROUGH THE PRINT CONTROL, not a locked total. Once lids are on
       the table every total chip is DISABLED on purpose — changing the
       total mid-question would silently rewrite what the class is
       looking at — so the first draft clicked a dead button and reported
       "no gate" in all eleven languages. The tool was right and the test
       was knocking on a door it had just locked itself. */
    await page.evaluate((label) => {
      const b = Array.from(document.querySelectorAll('.lid-foot .lid-chip')).find((x) => x.textContent === label);
      if (b) b.click();
    }, S('printBtn'));
    await wait(200);
    const gate = await page.evaluate(() => {
      const g = document.querySelector('.lid-gate');
      if (!g) return null;
      return { nodes: g.children.length, href: g.querySelector('a') ? g.querySelector('a').getAttribute('href') : null, txt: g.textContent };
    });
    is(gate && gate.nodes === 2, loc + ': the gate is not two nodes');
    is(gate && gate.href === '/' + loc + '/pricing?from=tool-lids', loc + ': the gate links to ' + (gate && gate.href));
    is(gate && gate.txt.indexOf(T.strings.gateLine[loc]) >= 0, loc + ': the gate line is not this locale\'s');
    is(gate && gate.txt.indexOf(T.strings.unlock[loc]) >= 0, loc + ': the unlock label is not this locale\'s');
    console.log('        gate    : ' + (gate ? gate.txt : '(none)'));

    is(errs.length === 0, loc + ': console error — ' + errs[0]);
    console.log('');
    await browser.close();
  }

  server.close();
  if (FAIL) { console.error('FAIL — ' + FAIL + ' of ' + (PASS + FAIL) + ' assertions'); process.exit(1); }
  console.log('PASS — ' + PASS + ' assertions across 11 locales');
})();
