#!/usr/bin/env node
/* =====================================================================
   smoke-letter-studio-locales.js — drive the RENDERED studio in all 11.

   verify-letter-studio.js reads the strings TABLE. A key that exists in
   the table but never reaches the DOM is invisible to it; so is a ruling
   a locale declares that the sheet never draws.

   ⚠ WHAT THE PREVIOUS VERSION COULD NOT SEE, and why this one sweeps:
     * it ran at ONE viewport (1000x900) — so no locale was ever measured
       at the 704px width the tool page actually gives the iframe, nor on
       a phone;
     * it ran ALWAYS FREE — so the roster, its heading, the privacy line
       and the print sheet were never rendered in ANY locale. Four
       strings, eleven native ensembles, never once seen on screen.
   Both are swept now: 11 locales x 3 surfaces x 2 entitlement states.

   ⭐⭐ A GATE WHOSE ORACLE READS THE SAME FILE MARKS ITS OWN HOMEWORK.
   Comparing the DOM against `LetterStudio.strings` proves WIRING — that a
   control is populated from the key it claims — and nothing else. Poison
   a Swedish cell with the English text and both sides of the comparison
   move together and the check stays green; that exact poison was measured
   SURVIVING. Locale SELECTION is therefore proved separately, at the end,
   by comparing each locale's RENDERED text against ENGLISH's rendered
   text — two different page loads, so no single table can satisfy both
   sides. Neither pass is translation review; a native panel is.

   Usage: node scripts/smoke-letter-studio-locales.js [--poison]
   Override for the poison run / the mutation harness: LS_TOOL_DIR
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');
const vm = require('vm');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const REAL_MINI = path.join(REPO, 'mini tools');
const MINI = process.env.LS_TOOL_DIR || REAL_MINI;
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };
const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const POISON = process.argv.includes('--poison');

/* the three surfaces that exist: a phone, the 704px the tool page pins
   the iframe at from 1024 upward forever, and a standalone desktop */
const SURFACES = [
  { id: 'phone 360', vp: 360, embed: true, want: 296 },
  { id: 'embed 704', vp: 1024, embed: true, want: 704 },
  { id: 'standalone', vp: 1024, embed: false, want: null }
];

const VERDICT = {
  en: /(?<!\p{L})(wrong|incorrect|bad|failed)(?!\p{L})/iu, de: /(?<!\p{L})(falsch|fehler|leider)(?!\p{L})/iu,
  fr: /(?<!\p{L})(faux|fausse|erreur|raté)(?!\p{L})/iu, it: /(?<!\p{L})(sbagliato|errore)(?!\p{L})/iu,
  es: /(?<!\p{L})(incorrecto|error)(?!\p{L})/iu, pt: /(?<!\p{L})(errado|erro)(?!\p{L})/iu,
  nl: /(?<!\p{L})(fout|foutje|verkeerd)(?!\p{L})/iu, sv: /(?<!\p{L})(fel|felaktig)(?!\p{L})/iu,
  da: /(?<!\p{L})(forkert|fejl)(?!\p{L})/iu, no: /(?<!\p{L})(feil)(?!\p{L})/iu,
  /* ⚠ `\b` IS ASCII-ONLY, so `\bväärin\b` cannot match at its left edge.
     Any ban whose edge character is non-ASCII needs a lookaround. */
  fi: /(?<!\p{L})(väärin|virhe)(?!\p{L})/iu
};

/* a locale that legitimately shared English wording would be listed here
   WITH ITS REASON. Today none does, and the list stays empty rather than
   the assertion being softened. */
const SHARED_WITH_EN = { title: [], demo: [], gate: [], roster: [], privacy: [], wordOpen: [], wordGo: [] };

let fail = 0, pass = 0;
const ok = (n, c, x) => { if (c) { pass++; } else { fail++; console.log('  FAIL ' + n + (x ? ' — ' + x : '')); } };
const sleep = ms => new Promise(r => setTimeout(r, ms));

const harnessHtml = (src) => `<!DOCTYPE html><html><head><meta charset="utf-8">
<style>*{box-sizing:border-box}html,body{margin:0;padding:0}main{padding:16px}
article{max-width:768px;margin:0 auto}section{padding:20px 16px}
iframe{width:100%;border:0;display:block;height:1500px}
@media (min-width:768px){main{padding:32px}section{padding:28px 32px}}</style></head><body>
<main><article><section><iframe id="f" src="${src}" scrolling="no"></iframe></section></article></main></body></html>`;

/* =====================================================================
   THE POISON. One patch at a time; each must FAIL; the control must PASS.
   ===================================================================== */
const POISON_PATCHES = [
  ['every locale gets the neutral default ruling',
    "  rulingFor: function (locale) { return this.RULING[locale] || this.RULING['default']; },",
    "  rulingFor: function (locale) { return this.RULING['default']; },"],
  ['the tint band is never drawn',
    '    if (ruling.band) {',
    '    if (false) {'],
  ['the solid/dashed distinction is dropped',
    "ln.setAttribute('class', 'ls-rule ls-rule-' + zn.tone + (zn.kind === 'dashed' ? ' ls-dashed' : ''));",
    "ln.setAttribute('class', 'ls-rule ls-rule-' + zn.tone);"],
  ['a raw key leaks into an aria-label',
    "box.setAttribute('aria-label', api.t('a11yPicker'));",
    "box.setAttribute('aria-label', api.t('a11yPickerZ'));"],
  /* ⭐ THE ONE THE TABLE-vs-DOM COMPARISON CANNOT SEE. Both sides of that
     comparison read `strings`, so serving English to a German child keeps
     it green. Only the rendered-vs-rendered pass catches it. */
  ['every locale is served the ENGLISH title',
    "    var _toolTitle = i18n.t(tool.strings, 'title');",
    "    var _toolTitle = tool.strings.title.en;", 'lcs-shell.js'],
  ['a placeholder survives into the page',
    "      s = s.replace(new RegExp('\\\\{' + k + '\\\\}', 'g'), args[k]);",
    '      s = s;'],
  ['the roster heading and privacy line are withheld from a subscriber',
    "        var rl = api.el('p', 'ls-rosterlead'); rl.textContent = api.t('namesPick');",
    "        var rl = api.el('p', 'ls-rosterlead');"]
];

if (POISON) {
  const { execFileSync } = require('child_process');
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ls-smoke-poison-'));
  /* ⚠ CARRY EVERY FILE THE GATE READS. A tmp dir with only the tool in it
     serves 404s for the shell and the cores, and the run then fails for a
     reason that has nothing to do with the patch. */
  for (const f of fs.readdirSync(REAL_MINI)) {
    if (/^(letter-studio\.(js|html)|letter-tiles-\w+\.json|lcs-shell\.(js|css)|alphabet-trace-core\.js|number-trace-core\.js|stroke-trace-core\.js)$/.test(f))
      fs.copyFileSync(path.join(REAL_MINI, f), path.join(tmp, f));
  }
  const ORIG = {};
  for (const f of ['letter-studio.js', 'lcs-shell.js']) ORIG[f] = fs.readFileSync(path.join(tmp, f), 'utf8').replace(/\r\n/g, '\n');
  const restore = () => { for (const f of Object.keys(ORIG)) fs.writeFileSync(path.join(tmp, f), ORIG[f], 'utf8'); };
  const run = () => {
    try {
      execFileSync(process.execPath, [__filename], {
        env: Object.assign({}, process.env, { LS_TOOL_DIR: tmp }), encoding: 'utf8', stdio: 'pipe', timeout: 1800000
      });
      return { failed: false, out: '' };
    } catch (e) {
      if (e.signal === 'SIGTERM') return { failed: true, hung: true, out: 'HUNG' };
      return { failed: true, out: String(e.stdout || '') + String(e.stderr || '') };
    }
  };
  console.log('=== POISON: smoke-letter-studio-locales ===');
  restore();
  const control = run();
  if (control.failed) {
    console.error('  CONTROL FAILED — the unpoisoned tmp copy does not pass; nothing below means anything.');
    console.error(control.out.split('\n').filter(l => /FAIL/.test(l)).slice(0, 8).join('\n'));
    process.exit(1);
  }
  console.log('  control: the UNPOISONED tmp copy passes');
  let holes = 0;
  for (const [label, from, to, file] of POISON_PATCHES) {
    restore();
    const f = file || 'letter-studio.js';
    if (ORIG[f].indexOf(from) === -1) { console.error('  HARNESS FAULT — anchor missing in ' + f + ': ' + label); holes++; continue; }
    const mutated = ORIG[f].replace(from, to);
    if (mutated === ORIG[f]) { console.error('  HARNESS FAULT — inert: ' + label); holes++; continue; }
    fs.writeFileSync(path.join(tmp, f), mutated, 'utf8');
    const r = run();
    const fired = (r.out.match(/^\s*FAIL /gm) || []).length;
    const first = (r.out.split('\n').find(l => /^\s*FAIL /.test(l)) || '').trim();
    if (r.hung) { holes++; console.error('  HUNG (a hang is a SURVIVAL) — ' + label); }
    else if (r.failed) console.log(`  killed (${String(fired).padStart(3)} assertions)  ${label}\n                       first: ${first.slice(6, 120)}`);
    else { holes++; console.error('  SURVIVED — no assertion sees: ' + label); }
  }
  try { fs.rmSync(tmp, { recursive: true, force: true }); } catch (_) {}
  if (holes) { console.error(`\nFAIL — ${holes} hole(s)`); process.exit(1); }
  console.log('\nPASS — every poison is caught, and the control passes');
  process.exit(0);
}

(async () => {
  const server = http.createServer((req, res) => {
    const u = req.url.split('?')[0];
    if (u === '/harness') {
      const q = new URL(req.url, 'http://x').searchParams;
      res.setHeader('Content-Type', 'text/html');
      return res.end(harnessHtml('/mini-tools/letter-studio.html?' + (q.get('q') || '')));
    }
    const f = path.join(MINI, decodeURIComponent(u).replace(/^\/mini-tools\//, '').replace(/^\//, ''));
    fs.readFile(f, (e, b) => {
      if (e) {
        fs.readFile(path.join(REAL_MINI, path.basename(f)), (e2, b2) => {
          if (e2) { res.statusCode = 404; return res.end(); }
          res.setHeader('Content-Type', MIME[path.extname(f)] || 'application/octet-stream');
          res.end(b2);
        });
        return;
      }
      res.setHeader('Content-Type', MIME[path.extname(f)] || 'application/octet-stream');
      res.end(b);
    });
  });
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const PORT = server.address().port;

  /* the table, read out of band — used for the WIRING half and for
     building the cross-locale phrase set, never as proof of selection */
  const sbx = {
    window: {}, console,
    document: { getElementById: () => null, createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }), head: { appendChild() {} }, body: { classList: { add() {}, remove() {} } } },
    localStorage: { getItem: () => null, setItem() {} },
    fetch: () => ({ then() { return this; }, catch() { return this; } }),
    setTimeout: () => 0, clearTimeout() {}, Math, Date, JSON, URLSearchParams, location: { search: '' }
  };
  sbx.window = sbx; vm.createContext(sbx);
  vm.runInContext(fs.readFileSync(path.join(MINI, 'letter-studio.js'), 'utf8'), sbx);
  const TABLE = sbx.LetterStudio.strings;
  const RULING = sbx.LetterStudio.RULING;
  const rulingFor = (l) => RULING[l] || RULING['default'];
  const KEYS = Object.keys(TABLE);

  /* ⚠ FULL PHRASES, NEVER BARE ROOTS. `blir` sits inside `bliver` and
     `fel` inside `feltet`; a root-level ban reports a leak in correct
     text. And a phrase two locales share VERBATIM (sv/da/no all say
     "Se Premium") is not evidence of anything, so any foreign value equal
     to — or contained in — this locale's own is dropped from its set. */
  const foreignPhrases = (loc) => {
    const out = [];
    for (const k of KEYS) for (const other of LOCALES) {
      if (other === loc) continue;
      const v = TABLE[k][other], mine = TABLE[k][loc];
      if (typeof v !== 'string' || v.length < 14) continue;
      if (v === mine) continue;
      if (mine && mine.indexOf(v) >= 0) continue;
      out.push({ k, other, v });
    }
    return out;
  };

  /* a raw key leak is any DECLARED key rendered verbatim, plus any bare
     camelCase token — the shell returns the KEY itself when a lookup
     misses, so a typo'd key that is not in the table must still be seen */
  /* ⚠ THE CAMEL PATTERN MUST ALLOW DIGITS INSIDE THE TOKEN. My first
     version was `[a-z]{2,}[A-Z][A-Za-z]+`, which cannot match `a11yPickerZ`
     — the exact shape of every accessibility key in this tool — because
     `a11y` has no two consecutive lowercase letters. The poison that
     renamed a key to `a11yPickerZ` SURVIVED, and the alternation of
     declared keys could not save it either: `a11yPicker` is a prefix, and
     the trailing lookaround correctly refuses a partial word. */
  const RAW_KEY_RE = new RegExp('(?<![\\p{L}\\p{N}])(' + KEYS.join('|') + '|[a-z][a-z0-9]+[A-Z][A-Za-z0-9]+)(?![\\p{L}\\p{N}])', 'u');

  const rendered = {};

  for (const loc of LOCALES) {
    /* ⚠ A FRESH BROWSER PER LOCALE. A shared browser shares the HTTP
       cache and the audio state, and a locale that passes only because
       the previous one warmed something has not passed. */
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const foreign = foreignPhrases(loc);
    let printed = false;

    for (const surf of SURFACES) {
      for (const tier of ['free', 'premium']) {
        const page = await browser.newPage();
        await page.setViewport({ width: surf.vp, height: 1000 });
        await page.setCacheEnabled(false);
        await page.setRequestInterception(true);
        page.on('request', r => /\/api\/auth\/me/.test(r.url())
          ? r.respond({
              status: 200, contentType: 'application/json',
              body: JSON.stringify(tier === 'premium'
                ? { user: { subscriptionTier: 'full' }, subscription: { status: 'active' } }
                : { user: { subscriptionTier: 'free' }, subscription: null })
            })
          : r.continue());
        await page.evaluateOnNewDocument((t) => {
          try {
            localStorage.clear();
            if (t) localStorage.setItem('accessToken', 'smoke');
            localStorage.setItem('lcs:my-classes:v1', JSON.stringify({
              v: 1, activeClassId: 'c1',
              classes: [{ id: 'c1', name: 'Smoke', students: [{ id: 's1', name: 'Ida' }, { id: 's2', name: 'Otto' }] }]
            }));
          } catch (_) {}
        }, tier === 'premium');
        const errs = [];
        page.on('pageerror', e => errs.push(e.message));
        page.on('console', m => { if (m.type() === 'error' && !/404|net::ERR|Failed to load/i.test(m.text())) errs.push(m.text()); });

        const q = `lang=${loc}` + (surf.embed ? '&embed=1' : '');
        let doc = page;
        if (surf.embed) {
          await page.goto(`http://127.0.0.1:${PORT}/harness?q=${encodeURIComponent(q)}`, { waitUntil: 'domcontentloaded' });
          const h = await page.waitForSelector('#f', { timeout: 15000 });
          doc = await h.contentFrame();
          const box = await h.boundingBox();
          ok(`${loc} ${surf.id} the tool gets ${surf.want}px`, Math.round(box.width) === surf.want, 'measured ' + Math.round(box.width));
        } else {
          await page.goto(`http://127.0.0.1:${PORT}/mini-tools/letter-studio.html?${q}`, { waitUntil: 'domcontentloaded' });
        }
        await doc.waitForSelector('.ls-svg', { timeout: 15000 });
        await sleep(480);

        /* open every surface the strings live on, so a locale is measured
           with its word panel, its roster and its privacy line rendered —
           not just the letters screen the old smoke ever saw */
        await doc.evaluate(() => { LetterStudio.wordOpen = true; LetterStudio.pickerOpen = true; LetterStudio.render(); });
        await sleep(320);

        const r = await doc.evaluate(() => {
          const aria = Array.from(document.querySelectorAll('[aria-label]')).map(e => e.getAttribute('aria-label'));
          const rules = Array.from(document.querySelectorAll('.ls-rule'));
          const txt = (s) => (document.querySelector(s) || {}).textContent || '';
          return {
            lang: LetterStudio.api.lang,
            text: document.body.innerText,
            all: document.body.innerText + '\n' + aria.join('\n'),
            gotRules: rules.length,
            gotSolid: rules.filter(e => !e.classList.contains('ls-dashed')).length,
            gotBand: document.querySelectorAll('.ls-band').length,
            /* ⚠ `.ls-guide` — which the old gate counted — is a class this
               tool has never emitted, so that assertion read 0 in all
               eleven locales while the sheet rendered perfectly. The
               ruling lines are `.ls-rule`; the letter is `.ls-road`. */
            roads: document.querySelectorAll('.ls-road').length,
            dot: document.querySelectorAll('.ls-startdot').length,
            keys: document.querySelectorAll('.ls-key').length,
            names: document.querySelectorAll('.ls-name').length,
            gate: document.querySelectorAll('.ls-gateline').length,
            psheet: document.querySelectorAll('.ls-psheet').length,
            title: txt('.lcs-title').trim(),
            /* the replay control is a glyph-only ▶; its accessible name is
               the only place `a11yDemo` can render */
            demo: ((document.querySelector('.ls-replay') || { getAttribute: () => '' }).getAttribute('aria-label') || '').trim(),
            /* the ✎ chip that OPENS the word panel. `.ls-more` also carries
               aria-expanded but is not a .ls-chip, so this selector is unique
               — COUNTED, not assumed, because a comparison against an empty
               NodeList is not evidence. */
            wordChips: document.querySelectorAll('.ls-chip[aria-expanded]').length,
            wordOpen: ((document.querySelector('.ls-chip[aria-expanded]') || { getAttribute: () => '' }).getAttribute('aria-label') || '').trim(),
            /* the panel was opened above, so these two exist */
            wordInput: ((document.querySelector('.ls-wordinput') || { getAttribute: () => null }).getAttribute('aria-label') || '').trim(),
            wordGo: ((document.querySelector('.ls-wordgo') || { getAttribute: () => null }).getAttribute('aria-label') || '').trim(),
            roster: txt('.ls-rosterlead').trim(),
            privacy: txt('.ls-privacy').trim(),
            gateText: txt('.ls-gateline').trim(),
            /* the two word controls are glyphs (✎ and ▸), so their
               accessible name is the only surface their strings render on */
            wordOpen: ((document.querySelector('.ls-dock .ls-chip[aria-expanded]') || { getAttribute: () => '' }).getAttribute('aria-label') || '').trim(),
            wordGo: ((document.querySelector('.ls-wordgo') || { getAttribute: () => '' }).getAttribute('aria-label') || '').trim()
          };
        });

        const tag = `${loc} ${surf.id} ${tier}`;
        const want = rulingFor(loc);
        ok(`${tag} the shell selected this locale`, r.lang === loc, r.lang);
        ok(`${tag} the sheet renders`, r.roads >= 1 && r.dot === 1, `roads ${r.roads} dot ${r.dot}`);
        ok(`${tag} the picker rail is populated`, r.keys >= 26, r.keys + ' keys');

        /* ---- the locale's OWN ruling, drawn ---- */
        ok(`${tag} its own ruling is drawn (${want.system})`, r.gotRules === want.zones.length, `${r.gotRules} lines vs ${want.zones.length} zones`);
        ok(`${tag} the solid/dashed split is drawn`,
          r.gotSolid === want.zones.filter(z => z.kind === 'solid').length,
          `${r.gotSolid} solid vs ${want.zones.filter(z => z.kind === 'solid').length}`);
        ok(`${tag} the tint band matches the ruling`, want.band ? r.gotBand === 1 : r.gotBand === 0, `want ${!!want.band} got ${r.gotBand}`);

        /* ---- the tier surfaces (WIRING: populated from the right key) ---- */
        if (tier === 'free') {
          ok(`${tag} the inline gate line is shown`, r.gate === 1, 'gate ' + r.gate);
          ok(`${tag} no roster and no print sheet`, r.names === 0 && r.psheet === 0, `names ${r.names} psheet ${r.psheet}`);
          ok(`${tag} the gate line is wired to gateNames`, r.gateText.indexOf(TABLE.gateNames[loc]) === 0, r.gateText.slice(0, 60));
        } else {
          ok(`${tag} the roster renders`, r.names === 2, 'names ' + r.names);
          ok(`${tag} the print sheet is in the DOM`, r.psheet === 1, 'psheet ' + r.psheet);
          ok(`${tag} the roster heading is wired to namesPick`, r.roster === TABLE.namesPick[loc], `"${r.roster}"`);
          ok(`${tag} the privacy line is wired to privacyLine`, r.privacy === TABLE.privacyLine[loc], `"${r.privacy}"`);
          ok(`${tag} the replay control is wired to a11yDemo`, r.demo === TABLE.a11yDemo[loc], `"${r.demo}"`);
          ok(`${tag} no gate line for a subscriber`, r.gate === 0);
        }

        /* ---- ⭐ THREE CONTROLS, THREE ACCESSIBLE NAMES ----
           All ten native panels reported ONE aria-label (`a11yWord`) on the
           text input, on the ▸ that SUBMITS and on the ✎ that OPENS the
           panel. The fix is only real if a screen-reader user hears three
           DIFFERENT things, so it is measured in the browser. The panel is
           already open above, so nothing needs clicking.
           ⚠ The distinctness check compares the three RENDERED names against
           EACH OTHER, not against the table — a later copy edit that
           collapses any two fails here even though each would still be
           "wired" to its own key, which is the failure the table cannot see. */
        ok(`${tag} the ✎ chip is uniquely selectable`, r.wordChips === 1, 'matched ' + r.wordChips);
        ok(`${tag} the word panel is open`, !!r.wordInput && !!r.wordGo, `input ${r.wordInput} go ${r.wordGo}`);
        ok(`${tag} the input is wired to a11yWord`, r.wordInput === TABLE.a11yWord[loc], `"${r.wordInput}"`);
        ok(`${tag} the ▸ is wired to a11yWordGo`, r.wordGo === TABLE.a11yWordGo[loc], `"${r.wordGo}"`);
        ok(`${tag} the ✎ is wired to a11yWordOpen`, r.wordOpen === TABLE.a11yWordOpen[loc], `"${r.wordOpen}"`);
        ok(`${tag} the three word controls have three DIFFERENT names`,
          !!r.wordInput && !!r.wordGo && !!r.wordOpen && new Set([r.wordInput, r.wordGo, r.wordOpen]).size === 3,
          `input "${r.wordInput}" | go "${r.wordGo}" | chip "${r.wordOpen}"`);

        /* ---- leaks ---- */
        const rawHit = RAW_KEY_RE.exec(r.all);
        ok(`${tag} no raw key leaks`, !rawHit, rawHit && rawHit[0]);
        ok(`${tag} no {placeholder} survives`, !/\{[a-zA-Z]+\}/.test(r.all), (r.all.match(/\{[a-zA-Z]+\}/) || [])[0]);
        const alien = foreign.filter(f => r.all.indexOf(f.v) >= 0);
        ok(`${tag} no other locale's text appears`, alien.length === 0,
          alien.slice(0, 2).map(a => `${a.other}.${a.k} "${a.v.slice(0, 40)}"`).join(' | '));
        ok(`${tag} no verdict language on the rendered page`, !VERDICT[loc].test(r.all), (r.all.match(VERDICT[loc]) || [])[0]);
        ok(`${tag} no console errors`, errs.length === 0, errs[0]);

        /* the rendered snapshot for the cross-locale pass.
           ⚠ IT HAS TO SPAN BOTH TIERS. My first version took every field
           from the PREMIUM render, where the gate line is correctly
           absent — so it compared "" against "" and reported ten locales
           as serving English. An empty field can satisfy or fail a
           comparison for reasons that have nothing to do with the thing
           being measured, which is why the pass below also requires every
           captured field to be non-empty. */
        if (surf.id === 'standalone') {
          rendered[loc] = rendered[loc] || {};
          if (tier === 'premium') Object.assign(rendered[loc], { title: r.title, demo: r.demo, roster: r.roster, privacy: r.privacy, wordOpen: r.wordOpen, wordGo: r.wordGo });
          else Object.assign(rendered[loc], { gate: r.gateText });
        }

        /* ---- the whole authored set, printed once per locale ---- */
        if (!printed && tier === 'premium') {
          printed = true;
          console.log(`\n[${loc}] ${want.system} · ${r.gotRules} rules (${r.gotSolid} solid)${want.band ? ' + band' : ''} · ${r.keys} keys`);
          for (const k of KEYS) console.log(`    ${k.padEnd(13)} ${TABLE[k][loc]}`);
        }
        await page.close();
      }
    }
    await browser.close();
  }

  /* =================================================================
     ⭐ LOCALE SELECTION — rendered vs RENDERED, never table vs DOM.
     ================================================================= */
  console.log('\n[cross-locale] each locale\'s RENDERED text against ENGLISH\'s');
  if (!rendered.en) {
    ok('the cross-locale pass had an English baseline', false, 'en was not captured');
  } else {
    for (const loc of LOCALES) {
      if (loc === 'en') continue;
      for (const field of Object.keys(SHARED_WITH_EN)) {
        if (SHARED_WITH_EN[field].indexOf(loc) >= 0) continue;
        const mine = rendered[loc] && rendered[loc][field];
        const theirs = rendered.en[field];
        /* NON-VACUITY FIRST: an empty pair is not a match and not a
           mismatch, it is a measurement that did not happen. */
        ok(`${loc} the ${field} was actually captured on both sides`,
          !!mine && !!theirs, `${loc}="${mine}" en="${theirs}"`);
        if (!mine || !theirs) continue;
        ok(`${loc} the rendered ${field} is not the English one`,
          mine !== theirs, `${loc} "${String(mine).slice(0, 50)}" === en "${String(theirs).slice(0, 50)}"`);
      }
    }
  }

  server.close();
  console.log(`\n${pass} passed, ${fail} failed across ${LOCALES.length} locales x ${SURFACES.length} surfaces x 2 tiers`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
