#!/usr/bin/env node
/**
 * workspace-leak-report.js — the gate for the workspace/collections i18n repair.
 *
 * A "leak" is a leaf string in a non-English message file that is byte-identical to the
 * English one. That is the only reliable machine signal that a string was never authored:
 * every other heuristic (English word lists, character sets) either misses translations
 * that legitimately share a word or condemns correct native prose.
 *
 * Two exceptions are allowlisted, and each is allowlisted for a reason that was checked
 * against the language, not against whether it made the run go green:
 *   - collections.detail.metaTitle is the bare ICU placeholder "{name}" — there is nothing
 *     to translate.
 *   - German nameLabel is genuinely "Name"; so is Dutch, Danish, Norwegian and Swedish.
 *
 * Exit 1 when any leak remains outside the allowlist.
 *
 * Usage: node scripts/i18n/workspace-leak-report.js [--json]
 */
const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, '..', '..', 'messages');
// The four namespaces that render on the workspace and collection surfaces.
// `bulk` and `share` were added after two independent native reviewers noticed that
// CollectionDetailClient.tsx renders them on the page the other two namespaces cover —
// so a locale could pass this gate while a teacher still met English on that screen.
const NAMESPACES = ['workspace', 'collections', 'bulk', 'share'];
const LOCALES = ['de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

/** Keys whose English value is legitimately identical in some languages. */
const ALLOWLIST = [
  // Pure ICU placeholder — no prose at all.
  { key: 'collections.detail.metaTitle', locales: LOCALES },
  // "Name" is the native German word. It is NOT the word in the other Germanic locales
  // here — nl says "Naam", sv "Namn", da/no "Navn", each already shipped under
  // workspace.dialog.nameLabel. Allowlisting them excused three genuine leaks.
  { key: 'workspace.dialog.nameLabel', locales: ['de'] },
  { key: 'collections.create.nameLabel', locales: ['de'] },
  // "Collections" is the French plural noun, and its tab-strip siblings are bare nouns
  // ("Vue d'ensemble", "Fiches", "Activités", "Favoris"). The French panel kept it
  // deliberately; a possessive here would break the strip.
  { key: 'workspace.tabs.collections', locales: ['fr'] },
];

function flatten(obj, prefix = '') {
  const out = {};
  for (const k of Object.keys(obj || {})) {
    const v = obj[k];
    const key = prefix ? `${prefix}.${k}` : k;
    if (typeof v === 'string') out[key] = v;
    else if (v && typeof v === 'object') Object.assign(out, flatten(v, key));
  }
  return out;
}

function load(locale) {
  return JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, `${locale}.json`), 'utf8'));
}

function englishSet() {
  const en = load('en');
  const out = {};
  for (const ns of NAMESPACES) Object.assign(out, prefixed(ns, flatten(en[ns])));
  return out;
}

function prefixed(ns, flat) {
  const out = {};
  for (const k of Object.keys(flat)) out[`${ns}.${k}`] = flat[k];
  return out;
}

function isAllowed(key, locale) {
  return ALLOWLIST.some((a) => a.key === key && a.locales.includes(locale));
}

function localeSet(locale) {
  const m = load(locale);
  const out = {};
  for (const ns of NAMESPACES) Object.assign(out, prefixed(ns, flatten(m[ns])));
  return out;
}

function main() {
  const asJson = process.argv.includes('--json');
  const EN = englishSet();
  const enKeys = Object.keys(EN);
  const report = {};
  let total = 0;
  let missingTotal = 0;

  for (const locale of LOCALES) {
    const L = localeSet(locale);
    const leaked = [];
    const missing = [];
    for (const key of enKeys) {
      if (!(key in L)) {
        missing.push(key);
        continue;
      }
      if (L[key] === EN[key] && !isAllowed(key, locale)) leaked.push(key);
    }
    // A key present in a locale but absent from English is dead weight — report it too.
    const extra = Object.keys(L).filter((k) => !(k in EN));
    report[locale] = { leaked, missing, extra };
    total += leaked.length;
    missingTotal += missing.length + extra.length;
  }

  if (asJson) {
    process.stdout.write(JSON.stringify({ enKeyCount: enKeys.length, report }, null, 2) + '\n');
  } else {
    console.log(`English key set: ${enKeys.length} (${NAMESPACES.join(' + ')})\n`);
    for (const locale of LOCALES) {
      const r = report[locale];
      const flag = r.leaked.length || r.missing.length || r.extra.length ? 'LEAK' : ' ok ';
      console.log(
        `[${flag}] ${locale}: ${r.leaked.length} untranslated` +
          (r.missing.length ? `, ${r.missing.length} missing` : '') +
          (r.extra.length ? `, ${r.extra.length} not-in-en` : '')
      );
      for (const k of r.leaked) console.log(`         ${k} :: ${JSON.stringify(EN[k])}`);
      for (const k of r.missing) console.log(`         MISSING ${k}`);
      for (const k of r.extra) console.log(`         NOT-IN-EN ${k}`);
    }
    console.log(`\nTOTAL untranslated: ${total}   structural problems: ${missingTotal}`);
  }

  if (total || missingTotal) process.exit(1);
}

main();
