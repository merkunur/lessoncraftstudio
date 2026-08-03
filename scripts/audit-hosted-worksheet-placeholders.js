/* =====================================================================
   audit-hosted-worksheet-placeholders.js — a saved worksheet must ship
   ZERO `__PLACEHOLDER__` tokens
   ---------------------------------------------------------------------
   Run:  node scripts/audit-hosted-worksheet-placeholders.js
         node scripts/audit-hosted-worksheet-placeholders.js --fixture=<file.html>
         node scripts/audit-hosted-worksheet-placeholders.js --live=<url>

   ⭐ WHY THIS EXISTS. The 29 generators emit `__CANONICAL_URL__` and ~13
   sibling tokens that ONLY scripts/publish-cli/substitute.js resolves. The
   catalog path runs it. The Save-Interactive-Worksheet path never did — so
   every sheet served at /play/w/<linkId> shipped raw tokens: in the browser
   TAB TITLE, in the worksheet <img alt> and app aria-label a screen reader
   reads aloud, in the og: block a pasted link unfurls from, and in the share
   panel's clipboard. 34 leaks across 14 tokens, measured live 2026-08-03.

   ⚠ AND NOTHING COULD SEE IT. scripts/publish-cli/audit-deck-html.js checks
   exactly TWO tokens by name (__APP_ARIA_LABEL__, __WORKSHEET_MAIN_ALT__) and
   has no generic residue scan, so the other twelve were invisible. A named
   check only ever finds what someone already thought of.

   This drives the REAL transforms (frontend/lib/hosted-worksheets/personalize
   .ts, transpiled on the fly) over a REAL saved-worksheet document, and is
   SELF-POISONING: the same bytes must FAIL before personalization and PASS
   after, or the run fails.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');
const loadPersonalize = require('./lib/load-hosted-personalize');

const REPO_ROOT = path.join(__dirname, '..');

const arg = (n) => {
  const hit = process.argv.find((a) => a.indexOf('--' + n + '=') === 0);
  return hit ? hit.split('=').slice(1).join('=') : null;
};

let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) { PASS++; console.log('  ok   ' + m); } else { FAIL++; console.error('  FAIL ' + m); } };

/* ---------- obtain a REAL saved-worksheet document ----------------------- */
async function getFixture() {
  const f = arg('fixture');
  if (f) return { label: f, html: fs.readFileSync(f, 'utf8') };

  const url = arg('live') || 'https://www.lessoncraftstudio.com/play/w/hqh7bq49yq7e';
  const res = await fetch(url);
  if (!res.ok) throw new Error('fixture fetch failed: ' + res.status + ' ' + url);
  return { label: url, html: await res.text() };
}

/**
 * --scan-dir=<dir>: assert every STORED hosted worksheet is already clean.
 * This is the on-server check — it measures the actual files being served
 * rather than a transform in the abstract. Run it after the backfill.
 */
function scanDir(P, dir) {
  console.log('\n[hosted-worksheet placeholders — stored files]');
  if (!fs.existsSync(dir)) {
    console.error('  FAIL directory not found: ' + dir);
    process.exit(1);
  }
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.html'));
  // Non-vacuity: an empty directory must not read as "all clean".
  if (files.length === 0) {
    console.error('  FAIL no .html files in ' + dir + ' — nothing was measured');
    process.exit(1);
  }
  let dirty = 0;
  for (const f of files) {
    const residue = P.findPlaceholderResidue(fs.readFileSync(path.join(dir, f), 'utf8'));
    if (residue.length) {
      dirty++;
      console.error('  FAIL ' + f + ' leaks: ' + residue.join(' '));
    }
  }
  console.log('  scanned ' + files.length + ' stored worksheet(s), ' + dirty + ' with residue');
  if (dirty) { console.error('\nFAIL — ' + dirty + ' stored worksheet(s) still leak tokens'); process.exit(1); }
  console.log('\nPASS — all ' + files.length + ' stored worksheets are placeholder-free');
}

(async () => {
  const P = loadPersonalize();

  const dir = arg('scan-dir');
  if (dir) return scanDir(P, dir);

  const { label, html } = await getFixture();
  console.log('\n[hosted-worksheet placeholders]');
  console.log('  fixture: ' + label + ' (' + html.length + ' bytes)');

  /* ⭐ NON-VACUITY FIRST. If the fixture is not actually a deck, every
     assertion below would pass against nothing. #40's lesson: prove the
     collection is non-empty before asserting anything about its contents. */
  is(html.length > 50000, 'fixture is a real deck document, not an error page');
  is(/SEO_INSERTION_POINT_START/.test(html), 'fixture carries the SEO marker region');
  is(/lcs-cel-print/.test(html), 'fixture carries the deck runtime');

  /* ---------- THE POISON HALF ------------------------------------------ */
  const before = P.findPlaceholderResidue(html);
  is(before.length > 0,
    'POISON: un-personalized bytes leak ' + before.length + ' token type(s): ' + before.join(' '));

  /* ---------- the fix ---------------------------------------------------- */
  const playUrl = 'https://www.lessoncraftstudio.com/play/w/hqh7bq49yq7e';
  const fixed = P.applyHostedPersonalization(
    P.stripCatalogChrome(html),
    { playUrl, title: 'Fallback Title', ogLocale: 'en_US' }
  );

  /* ---------- THE GREEN HALF -------------------------------------------- */
  const after = P.findPlaceholderResidue(fixed);
  is(after.length === 0, '⭐ personalized bytes leak ZERO tokens' +
    (after.length ? ' — still present: ' + after.join(' ') : ''));

  /* ---------- the specific user-visible surfaces ------------------------- */
  const title = (fixed.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || '';
  is(title.length > 0 && title.indexOf('__') === -1,
    'browser tab title is clean: "' + title + '"');
  is(/Worksheet/i.test(title),
    'title kept the deck\'s own wording rather than the auto-generated DB title');

  const alt = (fixed.match(/id="lcs-worksheet-img"[^>]*alt="([^"]*)"/i) ||
               fixed.match(/alt="([^"]*)"[^>]*id="lcs-worksheet-img"/i) || [])[1];
  is(typeof alt === 'string' && alt.length > 0 && alt.indexOf('__') === -1,
    'screen-reader alt on the worksheet image is honest text: "' + alt + '"');

  const aria = (fixed.match(/id="lcs-app"[^>]*aria-label="([^"]*)"/i) || [])[1];
  is(typeof aria === 'string' && aria.length > 0 && aria.indexOf('__') === -1,
    'app aria-label is honest text: "' + aria + '"');

  const ogUrl = (fixed.match(/<meta property="og:url" content="([^"]*)"/i) || [])[1];
  is(ogUrl === playUrl, 'og:url is the real play URL (link unfurl works)');

  is(/<meta name="robots" content="noindex, nofollow">/.test(fixed),
    'in-document noindex belt matches the route header');
  is(!/<meta property="og:image"/i.test(fixed),
    'no og:image tag — none exists for a hosted sheet, so it is OMITTED not faked');
  is(!/application\/ld\+json/.test(fixed),
    'JSON-LD dropped — structured data has no purpose on a private noindex sheet');
  is(!/rel="canonical"/.test(fixed), 'no canonical on a private sheet');
  is(!/HREFLANG_INSERTION_POINT/.test(fixed), 'hreflang marker removed (no siblings exist)');

  /* ---------- the share panel ruling ------------------------------------ */
  is(/a\.lcs-share-platform\{display:none!important\}/.test(fixed),
    'social/email share links are hidden');
  is(/\.lcs-embed-wrap\{display:none!important\}/.test(fixed),
    'embed panel is hidden');
  /* ⭐ THE ASYMMETRY IS THE POINT: copy-link is a <button>, the socials are
     <a>. Assert the button SURVIVED, or "hide the panel" would silently mean
     "hide everything" and the chosen design would be unimplemented. */
  is(/<button[^>]*id="lcs-share-copy"/.test(fixed),
    '⭐ copy-link button SURVIVES the a-only selector');
  const copyUrl = (fixed.match(/var url="([^"]*)"/) || [])[1];
  is(copyUrl === playUrl, 'copy-link copies the real play URL, not a token');

  /* ---------- the bundle must still be valid JSON ------------------------
     ⭐ We rewrite `"value":"__TOKEN__"` inside DECK_BUNDLE.seoTrace. That is
     type-safe by construction, but "by construction" is exactly the kind of
     claim that should be measured — a corrupted bundle breaks the entire
     worksheet, which is far worse than the leak being fixed. */
  const parseBundle = (doc) => {
    const at = doc.indexOf('var DECK_BUNDLE = ');
    if (at === -1) return { ok: false, why: 'DECK_BUNDLE declaration not found' };
    let i = doc.indexOf('{', at), depth = 0, inStr = false, esc = false;
    for (let j = i; j < doc.length; j++) {
      const c = doc[j];
      if (esc) { esc = false; continue; }
      if (c === '\\') { esc = true; continue; }
      if (c === '"') { inStr = !inStr; continue; }
      if (inStr) continue;
      if (c === '{') depth++;
      else if (c === '}' && --depth === 0) {
        try { return { ok: true, obj: JSON.parse(doc.slice(i, j + 1)) }; }
        catch (e) { return { ok: false, why: e.message }; }
      }
    }
    return { ok: false, why: 'unterminated object' };
  };
  const bBefore = parseBundle(html);
  const bAfter = parseBundle(fixed);
  is(bBefore.ok, 'NON-VACUITY: the fixture\'s own DECK_BUNDLE parses (so the next check means something)');
  is(bAfter.ok, '⭐ DECK_BUNDLE still parses after rewriting seoTrace' +
    (bAfter.ok ? '' : ' — ' + bAfter.why));
  if (bBefore.ok && bAfter.ok) {
    is(Object.keys(bAfter.obj).length === Object.keys(bBefore.obj).length,
      'bundle keeps every top-level key (' + Object.keys(bAfter.obj).length + ')');
    is(bAfter.obj.worksheetImage === bBefore.obj.worksheetImage,
      'the backdrop field is untouched');
  }

  /* ---------- idempotency ------------------------------------------------ */
  const twice = P.applyHostedPersonalization(
    P.stripCatalogChrome(fixed), { playUrl, title: 'Fallback Title', ogLocale: 'en_US' }
  );
  is(twice === fixed, 'idempotent — re-saving the same sheet changes nothing');

  /* ---------- RENDER: the CSS must actually have the intended effect ------
     ⭐ Asserting the CSS TEXT and the button's presence in markup proves
     neither that the socials are hidden nor that copy-link survived — a
     selector of `.lcs-share-platform` (no `a`) would hide BOTH and still pass
     every string check above. "The rule exists" is not "the rule did what its
     label says". Measure computed styles. */
  if (!process.argv.includes('--no-render')) {
    let puppeteer = null;
    try { puppeteer = require(path.join(REPO_ROOT, 'node_modules', 'puppeteer')); } catch { /* optional */ }
    if (!puppeteer) {
      console.log('  note  puppeteer unavailable — render check skipped (run with it installed)');
    } else {
      const tmp = path.join(require('os').tmpdir(), 'lcs-hosted-render-' + process.pid + '.html');
      fs.writeFileSync(tmp, fixed, 'utf8');
      const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
      const page = await browser.newPage();
      await page.goto('file://' + tmp.replace(/\\/g, '/'), { waitUntil: 'domcontentloaded' });
      await new Promise((r) => setTimeout(r, 400));

      const seen = await page.evaluate(() => {
        const vis = (el) => {
          if (!el) return null;
          const cs = getComputedStyle(el);
          return cs.display !== 'none' && cs.visibility !== 'hidden';
        };
        const socials = Array.from(document.querySelectorAll('a.lcs-share-platform'));
        return {
          socialCount: socials.length,
          anySocialVisible: socials.some(vis),
          copyPresent: !!document.getElementById('lcs-share-copy'),
          copyVisible: vis(document.getElementById('lcs-share-copy')),
          embedWrap: !!document.querySelector('.lcs-embed-wrap'),
          embedVisible: vis(document.querySelector('.lcs-embed-wrap')),
        };
      });
      await browser.close();
      try { fs.unlinkSync(tmp); } catch { /* best effort */ }

      // Non-vacuity first: if the panel isn't in the document at all, "nothing
      // is visible" would be trivially true and prove nothing.
      is(seen.socialCount > 0, 'NON-VACUITY: ' + seen.socialCount + ' social link(s) exist to be hidden');
      is(seen.embedWrap, 'NON-VACUITY: an embed panel exists to be hidden');
      is(seen.copyPresent, 'NON-VACUITY: the copy-link button exists to be kept');

      is(!seen.anySocialVisible, '⭐ RENDERED: no social/email share link is visible');
      is(!seen.embedVisible, '⭐ RENDERED: the embed panel is not visible');
      is(seen.copyVisible === true, '⭐ RENDERED: copy-link IS still visible — the asymmetry works');
    }
  }

  console.log('');
  if (FAIL) { console.error('FAIL — ' + FAIL + ' of ' + (PASS + FAIL) + ' checks'); process.exit(1); }
  console.log('PASS — ' + PASS + ' checks: saved worksheets ship no placeholder tokens');
})().catch((e) => { console.error('ERROR ' + e.message); process.exit(1); });
