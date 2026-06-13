#!/usr/bin/env node
/**
 * emit/deck-html.test.js — the emitted static preview page must satisfy the
 * deck.html SEO contract at emit time (banded title/description, single h1,
 * deckend markers, hreflang-last) AND substitute cleanly through the REAL
 * substitute.apply with zero errors and zero leftover placeholders.
 */
'use strict';
const assert = require('assert');
const { buildManifest } = require('./manifest.js');
const { buildDeckHtml } = require('./deck-html.js');
const { loadType } = require('../lib/load-types.js');
const { resolveStrings } = require('../i18n/strings.js');
const substitute = require('../../publish-cli/substitute.js');

let failures = 0;
function check(name, fn) {
  try { fn(); console.log('  PASS ' + name); }
  catch (e) { failures++; console.error('  FAIL ' + name + ': ' + e.message); }
}

function makeDeck(typeId, opts) {
  const spec = loadType(typeId);
  const strings = resolveStrings(typeId, 'en', spec);
  const manifest = buildManifest(Object.assign({
    spec, strings, cacheTheme: 'animals', difficulty: 2, locale: 'en',
    deckId: 'wsg-test-deck', generatedAt: '2026-06-13T00:00:00Z',
    imagesUsed: [{ theme: 'animals', noun: 'sheep', vocabKey: 'sheep' }],
  }, opts || {}));
  const html = buildDeckHtml({
    manifest, spec, strings, locale: 'en',
    preview: { dataUri: 'data:image/jpeg;base64,TEST', width: 860, height: 1156 },
  });
  return { spec, strings, manifest, html };
}

console.log('emit/deck-html.test.js');

check('title in 50-70 budget; description in 120-170 band at emit', function () {
  const d = makeDeck('K-002');
  const title = /<title>([^<]*)<\/title>/.exec(d.html)[1];
  const desc = /name="description" content="([^"]*)"/.exec(d.html)[1];
  assert.ok(title.length <= 70, 'title too long: ' + title.length);
  assert.ok(desc.length >= 120 && desc.length <= 170, 'desc out of band: ' + desc.length);
  assert.ok(title.indexOf('Animals') !== -1, 'theme keyword missing from title (audit Check 8)');
  assert.ok(title.indexOf('__') === -1, 'unresolved placeholder in title');
});

check('single h1; instruction p; main#lcs-app aria-label without role', function () {
  const d = makeDeck('K-002');
  assert.strictEqual((d.html.match(/<h1/g) || []).length, 1);
  assert.ok(/<p class="lcs-instruction">/.test(d.html));
  assert.ok(/<main id="lcs-app" aria-label="__APP_ARIA_LABEL__">/.test(d.html));
  assert.ok(!/role="application"/.test(d.html), 'static page must not declare role=application');
});

check('worksheet img: interactive-deck shape (id, alt placeholder, width/height, data-URI)', function () {
  const d = makeDeck('K-002');
  const img = /<img class="lcs-worksheet__img" id="lcs-worksheet-img" alt="__WORKSHEET_MAIN_ALT__" width="860" height="1156" src="data:image\/jpeg;base64,/.test(d.html);
  assert.ok(img, 'worksheet img shape mismatch');
});

check('deckend-suggestions strip ≥3 markers + end-deck aside + embed-hide style', function () {
  const d = makeDeck('K-002');
  assert.ok((d.html.match(/lcs-deckend-suggestions/g) || []).length >= 3, 'audit Check 9 needs ≥3 markers');
  assert.ok(d.html.indexOf('<aside class="lcs-end-deck">') !== -1);
  assert.ok(d.html.indexOf('"BreadcrumbList"') !== -1, 'breadcrumb JSON-LD (end-links inject no-op)');
  assert.ok(d.html.indexOf('id="lcs-embed-hide"') !== -1, 'embed-hide style (inject no-op)');
});

check('hreflang marker is LAST in <head>', function () {
  const d = makeDeck('K-002');
  const headEnd = d.html.indexOf('</head>');
  const marker = d.html.indexOf('<!-- HREFLANG_INSERTION_POINT -->');
  assert.ok(marker !== -1 && marker < headEnd);
  assert.strictEqual(d.html.slice(marker + '<!-- HREFLANG_INSERTION_POINT -->'.length, headEnd).trim(), '');
});

check('d1 (easy) title differs from d2 title — no (language,titleHash) collision', function () {
  const d2 = makeDeck('K-002');
  const d1 = makeDeck('K-002', { difficulty: 1 });
  const t2 = /<title>([^<]*)<\/title>/.exec(d2.html)[1];
  const t1 = /<title>([^<]*)<\/title>/.exec(d1.html)[1];
  assert.notStrictEqual(t1, t2, 'difficulty siblings must carry distinct titles');
});

check('REAL substitute.apply: zero errors, zero leftover placeholders', function () {
  const d = makeDeck('K-002');
  const suggestions = [];
  for (let i = 1; i <= 6; i++) suggestions.push({ slug: 'fake-' + i, title: 'Fake ' + i, thumbnailUrl: 'https://x/t.png' });
  const sub = substitute.apply({
    manifest: d.manifest, metadata: {}, deckHtml: d.html,
    slugCandidate: 'counting-pictures-animals-k002', suggestions,
  });
  assert.deepStrictEqual(sub.errors, []);
  const leftover = (sub.html.match(/__[A-Z][A-Z0-9_]+__/g) || []);
  assert.deepStrictEqual(leftover, [], 'leftover: ' + leftover.join(','));
  assert.ok(sub.html.indexOf('https://www.lessoncraftstudio.com/en/decks/counting-pictures-animals-k002/counting-pictures-animals-k002-printable.pdf') !== -1,
    '__PDF_URL__ must resolve to slug-prefixed printable PDF');
});

check('themeless deck substitutes cleanly (no theme link, theme recon legitimate-null)', function () {
  const d = makeDeck('K-005', { cacheTheme: null, imagesUsed: [] });
  const sub = substitute.apply({
    manifest: d.manifest, metadata: {}, deckHtml: d.html,
    slugCandidate: 'counting-frames-k005', suggestions: [],
  });
  assert.deepStrictEqual(sub.errors, []);
});

// SWEEP runs for en + every authored strings.<locale>.json — title/desc are
// banded AT EMIT for printables (preband skips them), so each authored locale
// must clear the real gates here BEFORE any wave renders.
const sweepLocales = ['en'].concat(
  require('fs').readdirSync(require('path').join(__dirname, '..', 'i18n'))
    .map((f) => { const m = /^strings\.([a-z]{2})\.json$/.exec(f); return m && m[1]; })
    .filter((l) => l && l !== 'en')
    .sort()
);

// The wave's 5 themes have different localized name lengths, which shift the
// banded title/description; theme name (not images) is what moves the band, so
// the sweep renders each themed type against EVERY wave theme. Uniqueness is
// checked per (band, theme) — within a single theme two types must not collide,
// matching how (language, titleHash) actually collides at publish.
const WAVE_THEMES = ['animals', 'fruits', 'vehicles', 'toys', 'shapes'];
for (const sweepLocale of sweepLocales) {
  check('SWEEP all 200 types × wave themes [' + sweepLocale + ']: title ≤70 + desc 120-170 + unique titles per (band,theme)', function () {
    const { loadAllTypes } = require('../lib/load-types.js');
    const seenTitles = {}; // (band|theme) -> Set
    const bad = [];
    for (const spec of loadAllTypes()) {
      const themed = spec.themeAxis && spec.themeAxis.applicable;
      const themeList = themed ? WAVE_THEMES : [null];
      const strings = resolveStrings(spec.id, sweepLocale, spec);
      if (sweepLocale !== 'en' && strings.source !== 'locale') {
        bad.push(spec.id + ': strings resolved from ' + strings.source + ', not the locale file');
      }
      for (const theme of themeList) {
        const manifest = buildManifest({
          spec, strings, cacheTheme: theme, difficulty: 2, locale: sweepLocale,
          deckId: 'wsg-sweep-' + spec.id, generatedAt: '2026-06-13T00:00:00Z',
          imagesUsed: theme ? [{ theme, noun: 'sheep', vocabKey: 'sheep' }] : [],
        });
        const html = buildDeckHtml({
          manifest, spec, strings, locale: sweepLocale,
          preview: { dataUri: 'data:image/jpeg;base64,TEST', width: 860, height: 1156 },
        });
        const title = /<title>([^<]*)<\/title>/.exec(html)[1];
        const desc = /name="description" content="([^"]*)"/.exec(html)[1];
        const tag = '[' + (theme || 'nothm') + ']';
        if (title.length > 70) bad.push(spec.id + tag + ': title ' + title.length + ' "' + title + '"');
        if (desc.length < 120 || desc.length > 170) bad.push(spec.id + tag + ': desc ' + desc.length);
        const bucket = spec.id.split('-')[0] + '|' + (theme || 'nothm');
        const seen = (seenTitles[bucket] = seenTitles[bucket] || new Set());
        const tKey = title.toLowerCase();
        if (seen.has(tKey)) bad.push(spec.id + tag + ': duplicate title "' + title + '"');
        seen.add(tKey);
      }
    }
    assert.deepStrictEqual(bad, [], 'sweep violations:\n  ' + bad.join('\n  '));
  });
}

if (failures) { console.error(failures + ' failure(s)'); process.exit(1); }
console.log('All emit/deck-html.test.js cases passed.');
