#!/usr/bin/env node
/**
 * deck-metering.test.js — scripts/lib/deck-metering.js, poisoned in both directions (2026-10-01).
 * A deck page must never link its PDF / answer key straight to the file, never say "free" on its download button, and
 * a deck with a screen version must carry the play wall; a compliant page (an app deck with the action strip) must be
 * left byte-identical; the transform is idempotent.
 */
'use strict';
const assert = require('assert');
const { meterDeckHtml } = require('../lib/deck-metering.js');

let pass = 0, fail = 0;
function check(name, fn) { try { fn(); pass++; } catch (e) { fail++; console.log('  FAIL ' + name + ': ' + e.message); } }

const B = 'https://www.lessoncraftstudio.com';
const levelSet = (slug) => `<!DOCTYPE html><html lang="de"><head>\n<meta charset="utf-8"><title>x</title></head><body>` +
  `<div class="lcs-download"><a class="lcs-download-cta" href="${B}/de/decks/${slug}/${slug}-printable.pdf">⬇ Kostenloses PDF herunterladen</a>` +
  `<a class="lcs-download-cta" href="${B}/de/decks/${slug}/${slug}-answer-key.pdf" style="background:#146B5E">✓ Lösungen</a></div>` +
  `<a href="/de/decks/${slug}/printable.pdf">print</a><script>window.DECK_BUNDLE={"kind":"tap-choice"};</script></body></html>`;
const printable = (slug) => levelSet(slug).replace(/<script>window\.DECK_BUNDLE[^<]*<\/script>/, '').replace(/<a class="lcs-download-cta"[^>]*answer-key[^>]*>[^<]*<\/a>/, '');
const appDeck = `<!DOCTYPE html><html lang="de"><head>\n<script id="lcs-meter-js" defer src="${B}/worksheet-generators/js/lcs-meter.js?v=1"></script>\n</head><body>` +
  `<nav id="lcs-deck-actions"><a href="${B}/api/quota/dl?loc=de&amp;slug=addition-tiere&amp;kind=pdf">PDF herunterladen</a></nav><script>var DECK_BUNDLE = {};</script></body></html>`;
const directPdf = (h) => /href="[^"]*\.pdf"/.test(h);

check('a Level Set deck: every PDF link metered, labels without "free", play wall added', () => {
  const r = meterDeckHtml(levelSet('silben-tiere-g1305-3'), 'de', 'silben-tiere-g1305-3');
  assert.ok(!directPdf(r.html), 'a direct .pdf href remains');
  assert.strictEqual(r.links, 3);
  assert.ok(r.html.includes(`${B}/api/quota/dl?loc=de&amp;slug=silben-tiere-g1305-3&amp;kind=pdf`));
  assert.ok(r.html.includes(`${B}/api/quota/dl?loc=de&amp;slug=silben-tiere-g1305-3&amp;kind=answer`));
  assert.ok(!/Kostenlos/i.test(r.html), 'the button still says free');
  assert.ok(r.html.includes('⬇ PDF herunterladen'));
  assert.ok(r.html.includes('id="lcs-meter-js"'), 'no play wall');
});
check('a printable-only deck: links metered, NO play wall (a page view is not a play)', () => {
  const r = meterDeckHtml(printable('silben-tiere-g1305'), 'de', 'silben-tiere-g1305');
  assert.ok(!directPdf(r.html));
  assert.ok(!r.html.includes('lcs-meter-js'));
});
check('idempotent', () => {
  const once = meterDeckHtml(levelSet('a-b'), 'de', 'a-b').html;
  const twice = meterDeckHtml(once, 'de', 'a-b');
  assert.strictEqual(twice.changed, false);
  assert.strictEqual((once.match(/lcs-meter-js/g) || []).length, 1);
});
check('control: a compliant app deck is left byte-identical', () => {
  const r = meterDeckHtml(appDeck, 'de', 'addition-tiere');
  assert.strictEqual(r.changed, false);
  assert.strictEqual(r.html, appDeck);
});
check('another deck\'s PDF is not rewritten as this deck\'s (only the page\'s own files)', () => {
  const h = levelSet('a-b').replace('</body>', `<a href="${B}/de/decks/other-deck/other-deck-printable.pdf">x</a></body>`);
  const r = meterDeckHtml(h, 'de', 'a-b');
  assert.ok(r.html.includes('/de/decks/other-deck/other-deck-printable.pdf'), 'a foreign link was rewritten');
});
// poison: a transform that skipped the links / the label / the wall must fail the first check
check('poison: the unmetered page fails the policy checks', () => {
  const h = levelSet('a-b');
  assert.ok(directPdf(h) && /Kostenlos/.test(h) && !h.includes('lcs-meter-js'), 'the poison sample is not out of policy');
});

console.log(`deck-metering: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
