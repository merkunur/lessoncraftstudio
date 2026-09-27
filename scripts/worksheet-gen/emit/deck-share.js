/**
 * emit/deck-share.js — the Share + Embed buttons of a worksheet-gen INTERACTIVE deck, identical
 * to the 29 apps' (operator 2026-09-28: "add the same share features").
 *
 * The markup, CSS and scripts come from the apps' OWN builders —
 * REFERENCE TRANSLATIONS/catalog-export.js buildShareAffordance + buildEmbedAffordance — loaded
 * in a vm with the shared translations, never re-authored here, so the two can never drift.
 * Both emit the __CANONICAL_URL__ / __DECK_EMBED_URL__ placeholders publish-cli substitutes.
 *
 * Every label must exist in the page's locale: a missing translation throws (the apps silently
 * fell back to English — measured: live sv/es app decks show "Share on Facebook").
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const REF = path.join(__dirname, '..', '..', '..', 'REFERENCE TRANSLATIONS');
const SHARE_KEYS = ['srShareNative', 'srShareTo', 'srShareCopyLink', 'srShareCopied', 'srShareAriaFacebook', 'srShareAriaWhatsApp', 'srShareAriaPinterest', 'srShareAriaEmail', 'srShareAriaCopyLink'];
const EMBED_KEYS = ['embedHeader', 'embedHelper', 'embedWidthLabel', 'embedHeightLabel', 'embedCopyButton', 'embedCopiedFeedback', 'embedClose', 'embedButtonTooltip'];

let _api = null, _tr = null;
function api() {
  if (_api) return _api;
  const ctx = { window: {}, console: { warn() {}, log() {}, error() {} } };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(REF, 'translations-shared.js'), 'utf8'), ctx);
  _tr = JSON.parse(JSON.stringify(ctx.window.SHARED_TRANSLATIONS));
  ctx.translations = _tr;
  vm.runInContext(fs.readFileSync(path.join(REF, 'catalog-export.js'), 'utf8'), ctx);
  _api = ctx.window.LCSCatalogExport || ctx.LCSCatalogExport;
  if (!_api || typeof _api.buildShareAffordance !== 'function' || typeof _api.buildEmbedAffordance !== 'function') throw new Error('deck-share: catalog-export.js exposed no share/embed builders');
  return _api;
}

/** The actions row (share + embed), right-aligned above the title. */
function buildShareRow({ locale, title }) {
  const X = api();
  const t = _tr[locale];
  if (!t) throw new Error('deck-share: no shared translations for ' + locale);
  for (const k of SHARE_KEYS.concat(EMBED_KEYS)) {
    if (typeof t[k] !== 'string' || !t[k].trim()) throw new Error('deck-share: ' + locale + ' has no ' + k + ' (never an English fallback on a ' + locale + ' page)');
  }
  return [
    '<div class="lcs-deck-share" style="display:flex;justify-content:flex-end;gap:8px;max-width:880px;margin:0 auto;padding:10px 16px 0">',
    X.buildShareAffordance({ locale, title }),
    X.buildEmbedAffordance({ locale, title }),
    '</div>',
  ].join('\n');
}

const MAIN_OPEN = '<main id="lcs-app" aria-label="__APP_ARIA_LABEL__">';

/**
 * Insert the share row into an interactive deck.html, directly after <main id="lcs-app">. Used by
 * emit/deck-html.js AND by the ZIP patcher, so a patched deck equals a freshly generated one.
 * Idempotent: a page that already carries the row is returned unchanged.
 */
function insertShareRow(html, { locale, title }) {
  if (html.includes('class="lcs-deck-share"')) return html;
  if (html.split(MAIN_OPEN).length !== 2) throw new Error('deck-share: deck.html has no single <main id="lcs-app"> to insert into');
  return html.replace(MAIN_OPEN, MAIN_OPEN + '\n' + buildShareRow({ locale, title }));
}

module.exports = { buildShareRow, insertShareRow, SHARE_KEYS, EMBED_KEYS };
