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

/**
 * A LEVEL may print its own instruction when the face's instruction would be false for it (Level
 * Set: G2-330's text-only level has no picture, so "next to its picture" cannot stand). Only new
 * noindex decks carry such a level; a type/level/locale without an entry returns `strings` as is.
 * Source: i18n/level-instructions.json { "<typeId>": { "<level>": { "<locale>": "..." } } }.
 */
let _levelInstr = null;
function withLevelInstruction(strings, typeId, difficulty, locale) {
  if (_levelInstr === null) {
    const p = path.join(__dirname, 'level-instructions.json');
    _levelInstr = fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : {};
  }
  const byLevel = _levelInstr[typeId] && _levelInstr[typeId][String(difficulty)];
  if (!byLevel) return strings;
  const s = byLevel[locale];
  if (!s) throw new Error('strings: ' + typeId + ' level ' + difficulty + ' prints its own instruction but has none for ' + locale);
  // an entry may also carry the level's own TITLE (Level Set 2026-09-29: the prefix-key title names its prefixes,
  // so the 2-prefix and 4-prefix levels need their own): { "title": "...", "instruction": "..." }
  if (s && typeof s === 'object') {
    if (!s.instruction) throw new Error('strings: ' + typeId + ' level ' + difficulty + ' ' + locale + ' entry has no instruction');
    return { ...strings, instruction: s.instruction, ...(s.title ? { title: s.title } : {}) };
  }
  return { ...strings, instruction: s };
}

module.exports = { resolveStrings, withLevelInstruction };
