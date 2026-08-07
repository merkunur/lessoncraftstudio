#!/usr/bin/env node
/* =====================================================================
   smoke-home-language-bridge-locales.js — the Say It Board, rendered,
   in all eleven.
   ---------------------------------------------------------------------
   ⚠ A FRESH BROWSER PER LOCALE, not a fresh page. The version this
   replaces used ONE browser for all eleven, which caches the module —
   so every locale after the first can pass on the first one's copy, and
   a locale-selection bug is invisible. A shared browser is the reason
   this class of defect survives.

   ⚠ AND IT PRINTS THE WHOLE PHRASE SET. No gate can catch a grammar
   error, a wrong register or a false friend; only a native reader can,
   and they can only do it if the strings are put in front of them. The
   digest IS the deliverable for the native panels — everything here is
   authored, and authored is not the same as reviewed.

   Usage: node scripts/smoke-home-language-bridge-locales.js [--quiet]
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
const T = require(path.join(MINI, 'home-language-bridge.js'));
const ALL = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const QUIET = process.argv.indexOf('--quiet') >= 0;
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };

let pass = 0, fail = 0;
const is = (c, m) => { if (c) { pass++; if (!QUIET) console.log('    ok   ' + m); } else { fail++; console.error('    FAIL ' + m); } };

/* per-locale verdict vocabulary — this board never tells a child they
   are wrong, in any language */
const VERDICT = {
  en: /(?<!\p{L})(wrong|incorrect)(?!\p{L})/iu, de: /(?<!\p{L})(falsch|fehler)(?!\p{L})/iu,
  fr: /(?<!\p{L})(faux|erreur)(?!\p{L})/iu, it: /(?<!\p{L})(sbagliato|errore)(?!\p{L})/iu,
  es: /(?<!\p{L})(incorrecto|error)(?!\p{L})/iu, pt: /(?<!\p{L})(errado|erro)(?!\p{L})/iu,
  nl: /(?<!\p{L})(fout|verkeerd)(?!\p{L})/iu, sv: /(?<!\p{L})(fel)(?!\p{L})/iu,
  da: /(?<!\p{L})(forkert|fejl)(?!\p{L})/iu, no: /(?<!\p{L})(feil)(?!\p{L})/iu,
  fi: /(?<!\p{L})(väärin|virhe)(?!\p{L})/iu
};

const server = http.createServer((req, res) => {
  const f = path.join(MINI, path.basename(req.url.split('?')[0]));
  fs.readFile(f, (e, b) => {
    if (e) { res.writeHead(404); res.end('404'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
    res.end(b);
  });
});

(async () => {
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + server.address().port;

  for (const loc of ALL) {
    console.log(`[${loc}]`);
    /* ⚠ FRESH BROWSER. See the header. */
    const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const p = await b.newPage();
    const errs = [];
    p.on('pageerror', (e) => errs.push(e.message));
    await p.setViewport({ width: 704, height: 900, deviceScaleFactor: 1 });
    await p.evaluateOnNewDocument(() => { try { localStorage.clear(); } catch (e) {} });
    await p.goto(base + '/home-language-bridge.html?lang=' + loc + '&embed=1', { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 350));

    const m = await p.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('.hlb-card'));
      return {
        title: (document.querySelector('.lcs-title') || {}).textContent || '',
        cards: cards.length,
        core: document.querySelectorAll('.hlb-rail .hlb-card').length,
        tabs: document.querySelectorAll('.hlb-tab').length,
        icons: document.querySelectorAll('.hlb-card svg.hlb-icon').length,
        drawn: Array.from(document.querySelectorAll('.hlb-card svg.hlb-icon')).filter((s) => s.children.length).length,
        langs: cards.map((c) => { const t = c.querySelector('.hlb-text'); return t ? t.getAttribute('lang') : null; }),
        texts: cards.map((c) => (c.querySelector('.hlb-text') || {}).textContent || ''),
        /* ⚠ PER-ELEMENT, NOT `document.body.textContent`. The whole-body
           string concatenates adjacent elements with NO separator, so
           "…hears" + "English" + "Add…" becomes "hearsEnglishAdd" — and
           the raw-key check below then reported a leaked camelCase key
           in all eleven locales, having invented every one of them.
           A measurement artefact that looks exactly like the defect it
           is meant to find is the worst kind. */
        strings: Array.from(document.querySelectorAll('.hlb-wrap *'))
          .filter((el) => el.children.length === 0 && (el.textContent || '').trim())
          .map((el) => el.textContent.trim()),
        body: Array.from(document.querySelectorAll('.hlb-wrap *'))
          .filter((el) => el.children.length === 0)
          .map((el) => el.textContent || '').join(' · ')
      };
    });

    is(m.title === T.strings.title[loc], `the shell title is the ${loc} one: ${JSON.stringify(m.title)}`);
    is(m.cards === 20, `8 core + 12 in the group = 20 cards (got ${m.cards})`);
    is(m.core === 8, `the core rail holds 8 (got ${m.core})`);
    is(m.tabs >= 2, `at least two category tabs (got ${m.tabs})`);
    is(m.drawn === m.icons && m.icons === m.cards, `every card carries a drawn icon (${m.drawn}/${m.cards})`);
    is(m.langs.every((l) => l === loc), `every line is tagged lang="${loc}"`);
    is(new Set(m.texts).size === m.texts.length, 'no two cards read the same');
    is(!m.texts.some((t) => /\{|\}/.test(t)), 'no placeholder leaked');
    /* ⚠ a raw camelCase key leaking is what a MISSING string looks like:
       api.t() returns the key itself on a miss, silently. Checked per
       element — see the note beside the measurement. */
    const leaked = m.strings.filter((s) =>
      /^(?![A-Z])[a-z]+[A-Z][a-zA-Z]*$/.test(s) && !/LessonCraft/.test(s));
    is(leaked.length === 0, 'no raw string key leaked into the page' + (leaked.length ? ': ' + leaked.join(', ') : ''));
    is(!VERDICT[loc].test(m.body), 'nothing on the page tells a child they are wrong');
    is(errs.length === 0, 'no page errors' + (errs.length ? ': ' + errs[0] : ''));

    await b.close();
  }

  server.close();

  /* ---- THE DIGEST — the deliverable for the native panels ---------- */
  console.log('');
  console.log('='.repeat(72));
  console.log('THE PHRASE DIGEST — hand this to each native panel.');
  console.log('');
  console.log('⚠ EVERY LINE BELOW IS AUTHORED, AND AUTHORED IS NOT REVIEWED. No');
  console.log('   gate can catch a wrong register, a false friend, or a toilet');
  console.log('   request phrased the way a parent says it rather than the way a');
  console.log('   child says it to a teacher. Only a native reader can.');
  console.log('');
  console.log('⭐ AND GIVE THEM THE ENGLISH AS A SOURCE TO AUDIT, NOT AS A TARGET.');
  console.log('   On the last seven tools in this programme, every panel found');
  console.log('   defects in the English that the other ten were being built from.');
  console.log('='.repeat(72));
  const pending = ALL.filter((l) => !T.REVIEWED[l]);
  console.log('');
  console.log('reviewed : ' + (ALL.filter((l) => T.REVIEWED[l]).join(', ') || '(none)'));
  console.log('PENDING  : ' + (pending.join(', ') || '(none)'));
  console.log('');
  const ids = Object.keys(T.PHRASES);
  ALL.forEach((loc) => {
    console.log('--- ' + loc + (T.REVIEWED[loc] ? '' : '   [awaiting a native panel]') + ' ---');
    ids.forEach((id) => console.log('  ' + id.padEnd(12) + T.PHRASES[id][loc]));
    console.log('');
  });

  console.log(fail ? `FAIL — ${pass} passed, ${fail} failed` : `PASS — ${pass} assertions across ${ALL.length} locales`);
  process.exit(fail ? 1 : 0);
})();
