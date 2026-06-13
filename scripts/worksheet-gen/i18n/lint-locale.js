#!/usr/bin/env node
/**
 * i18n/lint-locale.js — the authoring gate for a non-EN locale layer.
 *
 * Usage: node scripts/worksheet-gen/i18n/lint-locale.js <locale>
 *
 * ERRORS (exit 1):
 *  - strings.<locale>.json missing, or its type-id key set ≠ strings.en.json
 *  - empty title/instruction
 *  - per-band title collision (same invariant as build-en.js: banded deck
 *    titles = title+theme+level and preband skips printables, so two same-band
 *    same-title types collide on (language, titleHash) at publish)
 *  - skill-sentences.<locale>.json missing a family key present in en, or
 *    empty short/full
 *  - taxonomy axes.exercise-type missing slug.<locale>/name.<locale> for any
 *    family key the 200 specs emit, or a slug colliding with another
 *    exercise-type key's slug in the same locale
 *  - frontend/messages/<locale>.json missing topicMeta.<familyKey> or
 *    seo.words.{free_printable,download_pdf}
 *  - K-016 spec missing inline i18n.<locale>.{odd,even} (the only spec with
 *    extra rendered words — chips would silently render English)
 *
 * WARNINGS (exit 0): title+instruction byte-identical to en (untranslated-leak
 * heuristic; legitimate cognates are possible — eyeball them).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { loadAllTypes } = require('../lib/load-types.js');

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function lintLocale(locale) {
  const errors = [];
  const warnings = [];
  const en = readJson(path.join(__dirname, 'strings.en.json'));
  const skillEn = readJson(path.join(__dirname, 'skill-sentences.en.json'));

  // --- strings.<locale>.json ---
  const stringsPath = path.join(__dirname, 'strings.' + locale + '.json');
  if (!fs.existsSync(stringsPath)) {
    errors.push('missing ' + stringsPath);
    return { errors, warnings };
  }
  const loc = readJson(stringsPath);
  for (const id of Object.keys(en)) {
    if (!loc[id]) { errors.push('strings: missing type ' + id); continue; }
    if (!loc[id].title || !String(loc[id].title).trim()) errors.push('strings: ' + id + ' empty title');
    if (!loc[id].instruction || !String(loc[id].instruction).trim()) errors.push('strings: ' + id + ' empty instruction');
    if (loc[id].title === en[id].title && loc[id].instruction === en[id].instruction) {
      warnings.push('strings: ' + id + ' identical to en ("' + en[id].title + '") — untranslated leak?');
    }
  }
  for (const id of Object.keys(loc)) {
    if (!en[id]) errors.push('strings: unknown type id ' + id + ' (not in strings.en.json)');
  }

  // per-band title uniqueness (build-en.js invariant, per locale)
  const byBandTitle = {};
  for (const id of Object.keys(loc)) {
    if (!loc[id] || !loc[id].title) continue;
    const key = id.split('-')[0] + '|' + String(loc[id].title).toLowerCase();
    (byBandTitle[key] = byBandTitle[key] || []).push(id);
  }
  for (const [key, ids] of Object.entries(byBandTitle)) {
    if (ids.length > 1) errors.push('strings: per-band title collision ' + key + ' -> ' + ids.join(', '));
  }

  // --- skill-sentences.<locale>.json ---
  const skillPath = path.join(__dirname, 'skill-sentences.' + locale + '.json');
  if (!fs.existsSync(skillPath)) {
    errors.push('missing ' + skillPath);
  } else {
    const skill = readJson(skillPath);
    for (const fam of Object.keys(skillEn)) {
      if (!skill[fam]) { errors.push('skill-sentences: missing family ' + fam); continue; }
      if (!skill[fam].short || !String(skill[fam].short).trim()) errors.push('skill-sentences: ' + fam + ' empty short');
      if (!skill[fam].full || !String(skill[fam].full).trim()) errors.push('skill-sentences: ' + fam + ' empty full');
      if (skill[fam].full === skillEn[fam].full) warnings.push('skill-sentences: ' + fam + '.full identical to en');
    }
    for (const fam of Object.keys(skill)) {
      if (!skillEn[fam]) errors.push('skill-sentences: unknown family ' + fam);
    }
  }

  // --- taxonomy slug/name per family key the specs emit ---
  const TAXONOMY = readJson(path.join(__dirname, '..', '..', '..', 'frontend', 'config', 'topics-taxonomy.json'));
  const specs = loadAllTypes();
  const fams = [...new Set(specs.map((s) => s.exerciseType))].sort();
  for (const fam of fams) {
    const entry = TAXONOMY.axes['exercise-type'][fam];
    if (!entry) { errors.push('taxonomy: family key not registered: ' + fam); continue; }
    if (!entry.slug || !entry.slug[locale]) errors.push('taxonomy: ' + fam + ' missing slug.' + locale);
    if (!entry.name || !entry.name[locale]) errors.push('taxonomy: ' + fam + ' missing name.' + locale);
  }
  // slug uniqueness within the exercise-type axis for this locale
  const slugOwner = {};
  for (const [key, entry] of Object.entries(TAXONOMY.axes['exercise-type'])) {
    const s = entry.slug && entry.slug[locale];
    if (!s) continue;
    if (slugOwner[s] && slugOwner[s] !== key) {
      errors.push('taxonomy: slug.' + locale + ' collision "' + s + '": ' + slugOwner[s] + ' vs ' + key);
    }
    slugOwner[s] = key;
  }

  // --- frontend/messages/<locale>.json: topicMeta + seo.words ---
  const messages = readJson(path.join(__dirname, '..', '..', '..', 'frontend', 'messages', locale + '.json'));
  for (const fam of fams) {
    if (!messages.topicMeta || !messages.topicMeta[fam]) errors.push('messages: missing topicMeta.' + fam);
  }
  const words = (messages.seo && messages.seo.words) || {};
  for (const w of ['free_printable', 'download_pdf']) {
    if (!words[w]) errors.push('messages: missing seo.words.' + w);
  }

  // --- K-016 inline extra words ---
  const k016 = specs.find((s) => s.id === 'K-016');
  if (k016) {
    const inline = k016.i18n && k016.i18n[locale];
    if (!inline || !inline.odd || !inline.even) {
      errors.push('K-016: missing inline i18n.' + locale + '.{odd,even} chip words');
    }
  }

  return { errors, warnings };
}

if (require.main === module) {
  const locale = process.argv[2];
  if (!locale || locale === 'en') {
    console.error('usage: node lint-locale.js <non-en locale>');
    process.exit(2);
  }
  const { errors, warnings } = lintLocale(locale);
  warnings.forEach((w) => console.warn('  WARN ' + w));
  errors.forEach((e) => console.error('  ERROR ' + e));
  console.log('lint-locale ' + locale + ': ' + errors.length + ' error(s), ' + warnings.length + ' warning(s)');
  process.exit(errors.length ? 1 : 0);
}

module.exports = { lintLocale };
