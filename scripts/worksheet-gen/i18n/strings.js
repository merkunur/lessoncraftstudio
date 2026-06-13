/**
 * Per-type localized strings resolver for the emission layer.
 *
 * Chain per (typeId, locale): strings.<locale>.json → strings.en.json → the
 * spec's inline i18n.en. Non-EN files are authored by the locale follow-up
 * commission (native ensembles per asset class); until then every locale
 * resolves to en (EN-only waves never hit the fallback).
 */
'use strict';
const fs = require('fs');
const path = require('path');

const _files = {};
function localeFile(locale) {
  if (!(locale in _files)) {
    const p = path.join(__dirname, 'strings.' + locale + '.json');
    _files[locale] = fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : null;
  }
  return _files[locale];
}

/**
 * @returns {{title: string, instruction: string, source: 'locale'|'en'|'spec'}}
 */
function resolveStrings(typeId, locale, spec) {
  const loc = locale !== 'en' && localeFile(locale);
  if (loc && loc[typeId] && loc[typeId].title && loc[typeId].instruction) {
    return { title: loc[typeId].title, instruction: loc[typeId].instruction, source: 'locale' };
  }
  const en = localeFile('en');
  if (en && en[typeId] && en[typeId].title && en[typeId].instruction) {
    return { title: en[typeId].title, instruction: en[typeId].instruction, source: 'en' };
  }
  if (spec && spec.i18n && spec.i18n.en) {
    return { title: spec.i18n.en.title, instruction: spec.i18n.en.instruction, source: 'spec' };
  }
  throw new Error('strings: no strings for type ' + typeId + ' (run i18n/build-en.js)');
}

module.exports = { resolveStrings };
