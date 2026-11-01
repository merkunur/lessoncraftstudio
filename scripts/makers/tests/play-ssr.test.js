#!/usr/bin/env node
/**
 * Tests: the student play page's pure server side (scripts/makers/play/ssr.js), the deck preset (play/preset.js) and
 * the makers index (play/makers-index.js) — poisoned both ways.
 *   node scripts/makers/tests/play-ssr.test.js
 */
'use strict';
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const ssr = require('../play/ssr.js');
const { presetFromManifest } = require('../play/preset.js');
const { makerOf, landingFor, landings, LOCALES } = require('../play/makers-index.js');

let n = 0;
const t = (name, fn) => { fn(); n++; console.log('ok   ' + name); };
const throws = (fn, re) => { let threw = null; try { fn(); } catch (e) { threw = e; } assert.ok(threw, 'expected a throw'); if (re) assert.ok(re.test(threw.message), 'wrong reason: ' + threw.message); };

const template = fs.readFileSync(path.join(__dirname, '..', 'play', 'index.html'), 'utf8');
const strings = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'worksheet-gen', 'i18n', 'play-strings.json'), 'utf8'));
const head = ssr.headFor({ linkId: 'abc123def456', lang: 'de', title: 'Zählen <mit> "Tieren"', makerName: 'Zählen', templateTitle: 'Zählen und Einkreisen', level: 2, levelWord: 'Stufe {n}', themeName: 'Tiere', thumbUrl: '/makers/counting/v/thumbs/de/K-002.webp', origin: 'https://www.lessoncraftstudio.com' });
const bar = { title: head.title, landingUrl: 'https://www.lessoncraftstudio.com/de/tools/suchen-und-zaehlen-ersteller', homeUrl: 'https://www.lessoncraftstudio.com/de/', makeYourOwn: 'Eigenes Arbeitsblatt erstellen', madeWith: 'Erstellt mit {brand}' };
const chrome = { css: '<style id="c"></style>', header: '<header id="lcs-site-chrome"><a href="https://www.lessoncraftstudio.com/de">x</a></header>', footer: '<footer id="lcs-site-footer"></footer>' };
const html = ssr.renderPlayHtml({ template, base: '/makers/play/abc', lang: 'de', head, chrome, bar });

t('headFor: the card names the maker, the template, the level and the theme; the url is the www student link', () => {
  assert.strictEqual(head.description, 'Zählen · Zählen und Einkreisen · Stufe 2 · Tiere');
  assert.strictEqual(head.url, 'https://www.lessoncraftstudio.com/s/abc123def456');
  assert.strictEqual(head.image, 'https://www.lessoncraftstudio.com/makers/counting/v/thumbs/de/K-002.webp');
});
t('renderPlayHtml: every marker filled, html lang = the recipe language, noindex, the card, no canonical / hreflang / json-ld', () => {
  for (const m of ssr.MARKERS) assert.ok(!html.includes(m), 'marker left: ' + m);
  assert.ok(html.startsWith('<!doctype html>\n<html lang="de">'));
  assert.ok(html.includes('<meta name="robots" content="noindex">'));
  assert.ok(html.includes('<meta property="og:title" content="Zählen &lt;mit&gt; &quot;Tieren&quot;">'));
  assert.ok(html.includes('<meta property="og:locale" content="de_DE">'));
  assert.ok(html.includes('<meta name="twitter:card" content="summary">'));
  assert.ok(!/rel="canonical"|hreflang=|application\/ld\+json/.test(html.replace(chrome.header, '').replace(chrome.footer, '')));
  assert.ok(html.includes('src="/makers/play/abc/play.js"') && html.includes('href="/makers/play/abc/play.css"'));
});
t('renderPlayHtml: the bar carries the two indexable links (landing, locale root) and escapes the title', () => {
  assert.ok(html.includes('<h1 class="pl-title" id="pl-title">Zählen &lt;mit&gt; &quot;Tieren&quot;</h1>'));
  assert.ok(html.includes('<a class="pl-make" id="pl-make" href="https://www.lessoncraftstudio.com/de/tools/suchen-und-zaehlen-ersteller">Eigenes Arbeitsblatt erstellen</a>'));
  assert.ok(html.includes('Erstellt mit <a class="pl-brand" id="pl-brand" href="https://www.lessoncraftstudio.com/de/">LessonCraftStudio</a>'));
  assert.ok(html.includes(chrome.header) && html.includes(chrome.footer) && html.includes(chrome.css));
});
t('poison: a template without a marker is refused', () => {
  throws(() => ssr.renderPlayHtml({ template: template.replace('<!--LCS_PLAY_HEAD-->', ''), base: '/x', lang: 'de', head, chrome, bar }), /LCS_PLAY_HEAD/);
});
t('poison: a title with a script tag cannot reach the page as markup', () => {
  const h = ssr.headFor({ linkId: 'abc123def456', lang: 'en', title: '<script>alert(1)</script>' });
  const out = ssr.renderPlayHtml({ template, base: '/x', lang: 'en', head: h, chrome, bar: { ...bar, title: h.title } });
  assert.ok(!out.includes('<script>alert'));
});
t('fill: tokens become html, everything else is escaped', () => {
  assert.strictEqual(ssr.fill('a <b> {brand} & {x}', { brand: '<i>B</i>' }), 'a &lt;b&gt; <i>B</i> &amp; ');
});
t('miniPage: noindex, the language, the lines', () => {
  const m = ssr.miniPage({ lang: 'fi', title: 'Ei', lines: ['Pyydä <opettajalta>'] });
  assert.ok(m.includes('<html lang="fi">') && m.includes('content="noindex"') && m.includes('Pyydä &lt;opettajalta&gt;'));
});
t('playStrings: every play and share key exists in all 11 languages (never an English fallback on a non-English page)', () => {
  for (const block of ['play', 'share']) for (const [k, by] of Object.entries(strings[block])) for (const loc of LOCALES) assert.ok(by[loc] && by[loc].trim(), block + '.' + k + ' ' + loc);
  assert.strictEqual(ssr.playStrings(strings, 'fi').print, 'Tulosta');
  assert.ok(ssr.playStrings(strings, 'de').madeWith.includes('{brand}'));
});
t('preset: a deck manifest → the maker, template, level, theme (cache name), unit, copy', () => {
  const p = presetFromManifest({ settings: { worksheet_type: 'K-002', difficulty: 3 }, language: 'de', theme: 'farm_animals', variant: 2, deck_id: 'wsg-x', title: { de: 'T' } }, makerOf);
  assert.deepStrictEqual(p, { maker: 'counting', lang: 'de', template: 'K-002', level: 3, theme: 'farm animals', unit: null, variant: 2, deckId: 'wsg-x', title: 'T' });
});
t('poison: a manifest of a type no maker owns, or without settings, is refused', () => {
  assert.strictEqual(presetFromManifest({ settings: { worksheet_type: 'Z-999', difficulty: 2 }, language: 'en' }, makerOf), null);
  assert.strictEqual(presetFromManifest({ language: 'en' }, makerOf), null);
  assert.strictEqual(presetFromManifest({ settings: { worksheet_type: 'K-002', difficulty: 2 }, language: 'english' }, makerOf), null);
});
t('makers-index: K-002 → counting; counting de → the old find-and-count landing; a maker without an old app → the tools hub', () => {
  assert.strictEqual(makerOf('K-002'), 'counting');
  assert.deepStrictEqual(landingFor('counting', 'de'), { url: '/de/tools/suchen-und-zaehlen-ersteller', name: 'Suchen-und-Zählen Ersteller' });
  assert.strictEqual(landingFor('ten-frames', 'fi').url, '/fi/tools');
  assert.strictEqual(landingFor('no-such-maker', 'en'), null);
});
t('makers-index: every maker × language has an indexable url under /<loc>/tools and a name', () => {
  const L = landings();
  assert.ok(Object.keys(L).length >= 60);
  for (const [m, by] of Object.entries(L)) for (const loc of LOCALES) { const e = by[loc]; assert.ok(e && /^\/[a-z]{2}\/tools(\/[a-z0-9-]+)?$/.test(e.url) && e.name, m + ' ' + loc); assert.ok(!/\/s\//.test(e.url)); }
});
console.log(`play-ssr tests: ${n} pass`);
