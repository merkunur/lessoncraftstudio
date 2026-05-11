#!/usr/bin/env node
/**
 * One-shot salvage: rewrites English-fallback SEO strings in deck.html for
 * non-EN ZIPs that hit §17.8.17 Invariant 6 LOCALE_RESIDUE_DETECTED at
 * publish-cli reconciliation gate.
 *
 * Defect class: the per-app translation file lacked
 * `window.translations = translations` export → translations-shared.js
 * merge-fill silently fell through → 4 SEO keys (worksheet,
 * seoFreeInteractive, seoFor, seoPrintOrPlayOnline) used English fallback
 * at gen time despite locale='es' (or other non-EN). Authoring-side
 * structural fix shipped at 935777a5 (14 translation files + window.translations
 * export); operator refuses regeneration of already-staged ZIPs.
 *
 * Per CLAUDE.md §15.17 salvage scripts pattern. Generalizes
 * rewrite-deck-html-seo-keys.js (EN-only) to all 11 locales by reading
 * SUBSTITUTIONS table per language from translations-shared.js canonical
 * values.
 *
 * Per-ZIP pipeline:
 *   1. Open ZIP via adm-zip
 *   2. Read manifest.json → get language + seo_trace
 *   3. If seo_trace absent OR all fields isLocalized=true → skip-clean
 *   4. Build substitutions map: {English fallback → localized value} for
 *      each isLocalized=false field, sourced from SUBSTITUTIONS[locale]
 *   5. Apply substitutions to deck.html string-by-string (specific patterns)
 *   6. Update manifest.seo_trace fields: isLocalized=true, new value,
 *      new source 'translations.<locale>.<key>' (post-salvage; reflects
 *      that translations-shared.js merge now serves these keys)
 *   7. Write updated entries back to ZIP atomically (in-place; backup
 *      created at <directory>.original/ per rewrite-manifest-theme.js
 *      precedent)
 *
 * Halt-classes:
 *   A — manifest.json missing/unparseable
 *   B — manifest.seo_trace absent (defensive; pre-Phase-3b ZIPs)
 *   C — locale not in SUBSTITUTIONS table (e.g., new locale not yet
 *       added to translations-shared.js)
 *   D — substitution pattern not found in deck.html (defensive; expected
 *       absent for cleaned ZIPs already)
 *
 * Usage:
 *   node scripts/publish-cli/rewrite-deck-html-locale-residue.js <directory> [--dry-run]
 *
 *   --dry-run  classify every ZIP, print per-ZIP action table, no FS writes
 */

'use strict';

var fs = require('fs');
var path = require('path');
var AdmZip = require(path.resolve(__dirname, '..', '..', 'node_modules', 'adm-zip'));

// --- Per-locale substitution table -----------------------------------------
// Canonical values match REFERENCE TRANSLATIONS/translations-shared.js
// post-d3255e7c. Key = English fallback that appears in deck.html
// generated pre-935777a5 fix. Value = locale-correct replacement.

var SUBSTITUTIONS = {
  en: {
    worksheet: 'Worksheet',
    seoFreeInteractive: 'Free interactive',
    seoFor: 'for',
    seoPrintOrPlayOnline: 'Print or play online'
  },
  de: {
    worksheet: 'Arbeitsblatt',
    seoFreeInteractive: 'Kostenloses interaktives',
    seoFor: 'für',
    seoPrintOrPlayOnline: 'Drucken oder online spielen'
  },
  es: {
    worksheet: 'Ficha',
    seoFreeInteractive: 'Hoja interactiva gratuita',
    seoFor: 'para',
    seoPrintOrPlayOnline: 'Imprimir o jugar en línea'
  },
  fr: {
    worksheet: 'Fiche',
    seoFreeInteractive: 'Fiche interactive gratuite',
    seoFor: 'pour',
    seoPrintOrPlayOnline: 'Imprimer ou jouer en ligne'
  },
  pt: {
    worksheet: 'Atividade',
    seoFreeInteractive: 'Atividade interativa gratuita',
    seoFor: 'para',
    seoPrintOrPlayOnline: 'Imprimir ou jogar online'
  },
  it: {
    worksheet: 'Scheda',
    seoFreeInteractive: 'Scheda interattiva gratuita',
    seoFor: 'per',
    seoPrintOrPlayOnline: 'Stampa o gioca online'
  },
  nl: {
    worksheet: 'Werkblad',
    seoFreeInteractive: 'Gratis interactief',
    seoFor: 'voor',
    seoPrintOrPlayOnline: 'Print of speel online'
  },
  sv: {
    worksheet: 'Övningsblad',
    seoFreeInteractive: 'Gratis interaktivt',
    seoFor: 'för',
    seoPrintOrPlayOnline: 'Skriv ut eller spela online'
  },
  da: {
    worksheet: 'Opgaveark',
    seoFreeInteractive: 'Gratis interaktivt',
    seoFor: 'for',
    seoPrintOrPlayOnline: 'Print eller spil online'
  },
  no: {
    worksheet: 'Oppgaveark',
    seoFreeInteractive: 'Gratis interaktivt',
    seoFor: 'for',
    seoPrintOrPlayOnline: 'Skriv ut eller spill på nett'
  },
  fi: {
    worksheet: 'Tehtävämoniste',
    seoFreeInteractive: 'Gratis interaktivt',
    seoFor: 'för',
    seoPrintOrPlayOnline: 'Tulosta tai pelaa verkossa'
  }
};

// Mapping from seo_trace field name to substitution key.
var FIELD_TO_KEY = {
  worksheetWord: 'worksheet',
  freeInteractive: 'seoFreeInteractive',
  forWord: 'seoFor',
  printOrPlay: 'seoPrintOrPlayOnline'
};

// --- Substitution patterns -------------------------------------------------
// These are context-anchored to avoid matching the same English word in
// unrelated positions (e.g., Schema.org `learningResourceType:"Worksheet"`
// MUST be preserved).
//
// Patterns rely on buildSeoHead's title/description template shape:
//   title    = "{typeName} {modeName?} {worksheetWord} — {themeName} — ..."
//   descLead = "{freeInteractive} {typeName} {modeName?} {worksheetWord} ({themeName}) {forWord} __EDUCATIONAL_LEVEL_LOCALIZED__"
//   descTail = " {printOrPlay} (Set {variantId})?."
//
// So pattern anchors:
//   worksheetWord (title):       " Worksheet —"
//   worksheetWord (description): " Worksheet ("
//   freeInteractive:             "Free interactive " at start-of-description (anchored by quote or content=" preceding)
//   forWord:                     " for __EDUCATIONAL_LEVEL_LOCALIZED__"
//   printOrPlay:                 " Print or play online"

function buildPatternReplacements(locale, traceFields) {
  var subs = SUBSTITUTIONS[locale];
  if (!subs) return null;

  var pairs = [];

  // For each isLocalized=false field, generate the appropriate pattern(s).
  Object.keys(traceFields).forEach(function (field) {
    var info = traceFields[field];
    if (!info || info.isLocalized !== false) return;
    var subKey = FIELD_TO_KEY[field];
    if (!subKey) return;
    var enValue = subs.en ? subs.en[subKey] : null;
    var locValue = subs[subKey];
    if (!enValue && SUBSTITUTIONS.en[subKey]) enValue = SUBSTITUTIONS.en[subKey];
    if (!locValue) return;

    if (field === 'worksheetWord') {
      // Title context: " Worksheet —" or " worksheet —" (some apps lowercase)
      pairs.push({ from: ' ' + enValue + ' —', to: ' ' + locValue + ' —', why: 'worksheet/title-cap' });
      pairs.push({ from: ' ' + enValue.toLowerCase() + ' —', to: ' ' + locValue + ' —', why: 'worksheet/title-low' });
      // Description context: " Worksheet (" (themed) OR " Worksheet ." (themeless)
      pairs.push({ from: ' ' + enValue + ' (', to: ' ' + locValue + ' (', why: 'worksheet/desc-themed-cap' });
      pairs.push({ from: ' ' + enValue.toLowerCase() + ' (', to: ' ' + locValue + ' (', why: 'worksheet/desc-themed-low' });
      pairs.push({ from: ' ' + enValue + ' .', to: ' ' + locValue + ' .', why: 'worksheet/desc-themeless-cap' });
      pairs.push({ from: ' ' + enValue.toLowerCase() + ' .', to: ' ' + locValue + ' .', why: 'worksheet/desc-themeless-low' });
    } else if (field === 'freeInteractive') {
      // Start of description: "Free interactive " preceded by quote or content="
      pairs.push({ from: '"' + enValue + ' ', to: '"' + locValue + ' ', why: 'freeInteractive/json-or-meta' });
    } else if (field === 'forWord') {
      // " for __EDUCATIONAL_LEVEL_LOCALIZED__"
      pairs.push({ from: ' ' + enValue + ' __EDUCATIONAL_LEVEL_LOCALIZED__', to: ' ' + locValue + ' __EDUCATIONAL_LEVEL_LOCALIZED__', why: 'forWord' });
    } else if (field === 'printOrPlay') {
      // " Print or play online" — followed by " (Set {variantId})" or "."
      pairs.push({ from: ' ' + enValue + ' (Set ', to: ' ' + locValue + ' (Set ', why: 'printOrPlay/with-variant' });
      pairs.push({ from: ' ' + enValue + '.', to: ' ' + locValue + '.', why: 'printOrPlay/no-variant' });
    }
  });

  return pairs;
}

function applySubstitutions(html, pairs) {
  var changed = false;
  pairs.forEach(function (p) {
    while (html.indexOf(p.from) !== -1) {
      html = html.split(p.from).join(p.to);
      changed = true;
    }
  });
  return { html: html, changed: changed };
}

function rewriteSeoTrace(seoTrace, locale, substitutions) {
  // Walk title + description sections; update isLocalized=false fields
  // to isLocalized=true with new value + new source.
  var changedCount = 0;
  ['title', 'description'].forEach(function (section) {
    var fields = seoTrace[section] || {};
    Object.keys(fields).forEach(function (field) {
      var info = fields[field];
      if (!info || info.isLocalized !== false) return;
      var subKey = FIELD_TO_KEY[field];
      if (!subKey) return;
      var locValue = substitutions[subKey];
      if (!locValue) return;
      info.value = locValue;
      info.source = 'translations.' + locale + '.' + subKey;
      info.isLocalized = true;
      changedCount++;
    });
  });
  return changedCount;
}

// --- Per-ZIP classification + apply ----------------------------------------

function classifyZip(zipPath) {
  var basename = path.basename(zipPath);
  var result = {
    file: basename,
    action: null,         // 'rewrite' | 'skip-clean' | 'halt-...'
    locale: null,
    fieldCount: 0,
    note: null
  };

  var zip;
  try {
    zip = new AdmZip(zipPath);
  } catch (e) {
    result.action = 'halt-unparseable';
    result.note = 'failed to open ZIP: ' + e.message;
    return result;
  }

  var manifestEntry = zip.getEntry('manifest.json');
  if (!manifestEntry) {
    result.action = 'halt-unparseable';
    result.note = 'ZIP missing manifest.json';
    return result;
  }

  var manifest;
  try {
    manifest = JSON.parse(manifestEntry.getData().toString('utf8'));
  } catch (e) {
    result.action = 'halt-unparseable';
    result.note = 'manifest.json parse error: ' + e.message;
    return result;
  }

  var locale = manifest.language;
  result.locale = locale;

  if (locale === 'en') {
    result.action = 'skip-en';
    return result;
  }

  if (!SUBSTITUTIONS[locale]) {
    result.action = 'halt-locale-not-in-table';
    result.note = 'locale "' + locale + '" not in SUBSTITUTIONS';
    return result;
  }

  if (!manifest.seo_trace) {
    result.action = 'halt-no-seo-trace';
    result.note = 'manifest.seo_trace absent';
    return result;
  }

  // Count isLocalized=false fields across title+description
  var falseCount = 0;
  ['title', 'description'].forEach(function (section) {
    var fields = (manifest.seo_trace && manifest.seo_trace[section]) || {};
    Object.keys(fields).forEach(function (field) {
      var info = fields[field];
      if (info && info.isLocalized === false && FIELD_TO_KEY[field]) {
        falseCount++;
      }
    });
  });
  result.fieldCount = falseCount;

  if (falseCount === 0) {
    result.action = 'skip-clean';
    return result;
  }

  result.action = 'rewrite';
  return result;
}

function applyZip(zipPath) {
  var zip = new AdmZip(zipPath);
  var manifest = JSON.parse(zip.getEntry('manifest.json').getData().toString('utf8'));
  var locale = manifest.language;
  var substitutions = SUBSTITUTIONS[locale];

  // Collect non-localized fields from title + description.
  var traceTitle = (manifest.seo_trace && manifest.seo_trace.title) || {};
  var traceDescription = (manifest.seo_trace && manifest.seo_trace.description) || {};

  // Build pattern pairs from ALL non-localized fields (union of title + description).
  var allFields = {};
  Object.keys(traceTitle).forEach(function (f) {
    if (traceTitle[f] && traceTitle[f].isLocalized === false) allFields[f] = traceTitle[f];
  });
  Object.keys(traceDescription).forEach(function (f) {
    if (traceDescription[f] && traceDescription[f].isLocalized === false) allFields[f] = traceDescription[f];
  });

  var pairs = buildPatternReplacements(locale, allFields);
  if (!pairs || pairs.length === 0) {
    return { applied: false, note: 'no patterns to apply' };
  }

  var deckEntry = zip.getEntry('deck.html');
  if (!deckEntry) {
    return { applied: false, note: 'deck.html missing' };
  }
  var deckHtml = deckEntry.getData().toString('utf8');

  var result = applySubstitutions(deckHtml, pairs);
  if (!result.changed) {
    return { applied: false, note: 'no substitution patterns matched in deck.html' };
  }

  // Update manifest.seo_trace fields
  rewriteSeoTrace(manifest.seo_trace, locale, substitutions);

  // Write updates back into the ZIP
  zip.updateFile('deck.html', Buffer.from(result.html, 'utf8'));
  zip.updateFile('manifest.json', Buffer.from(JSON.stringify(manifest, null, 2), 'utf8'));

  // Write to temp file then rename (atomic)
  var tmpPath = zipPath + '.tmp';
  zip.writeZip(tmpPath);
  fs.renameSync(tmpPath, zipPath);
  return { applied: true };
}

// --- Main ------------------------------------------------------------------

function main() {
  var args = process.argv.slice(2);
  var dryRun = false;
  var rootDir = null;
  for (var i = 0; i < args.length; i++) {
    if (args[i] === '--dry-run') { dryRun = true; continue; }
    if (args[i].indexOf('--') === 0) {
      console.error('ERROR: unknown flag "' + args[i] + '"');
      process.exit(2);
    }
    if (rootDir == null) { rootDir = args[i]; continue; }
    console.error('ERROR: unexpected positional argument "' + args[i] + '"');
    process.exit(2);
  }
  if (!rootDir) {
    console.error('USAGE: node scripts/publish-cli/rewrite-deck-html-locale-residue.js <directory> [--dry-run]');
    process.exit(2);
  }

  if (!fs.existsSync(rootDir) || !fs.statSync(rootDir).isDirectory()) {
    console.error('ERROR: directory not found: ' + rootDir);
    process.exit(2);
  }

  var zipFiles = fs.readdirSync(rootDir)
    .filter(function (f) { return f.endsWith('.zip'); })
    .map(function (f) { return path.join(rootDir, f); });

  console.log('[rewrite-locale-residue] Scanning ' + zipFiles.length + ' ZIPs in ' + rootDir);

  // Phase 1: classify every ZIP
  var classifications = [];
  var counts = { rewrite: 0, 'skip-clean': 0, 'skip-en': 0, halts: 0 };
  zipFiles.forEach(function (zp, idx) {
    var c = classifyZip(zp);
    classifications.push(c);
    if (c.action === 'rewrite') counts.rewrite++;
    else if (c.action === 'skip-clean') counts['skip-clean']++;
    else if (c.action === 'skip-en') counts['skip-en']++;
    else counts.halts++;
    if ((idx + 1) % 100 === 0) console.log('  classified ' + (idx + 1) + '/' + zipFiles.length);
  });

  console.log('\nClassification:');
  console.log('  rewrite:    ' + counts.rewrite);
  console.log('  skip-clean: ' + counts['skip-clean']);
  console.log('  skip-en:    ' + counts['skip-en']);
  console.log('  halts:      ' + counts.halts);

  if (counts.halts > 0) {
    console.error('\nERROR: ' + counts.halts + ' halt-class ZIPs surfaced. No backups created, no in-place edits. Halt-detail:');
    classifications.filter(function (c) { return c.action && c.action.indexOf('halt') === 0; }).forEach(function (c) {
      console.error('  ' + c.file + ': ' + c.action + ' (' + c.note + ')');
    });
    process.exit(1);
  }

  if (dryRun) {
    console.log('\n[DRY RUN] Would rewrite ' + counts.rewrite + ' ZIPs. No FS writes performed.');
    process.exit(0);
  }

  if (counts.rewrite === 0) {
    console.log('\nNothing to rewrite. Exit clean.');
    process.exit(0);
  }

  // Phase 2: backup + apply
  var backupDir = rootDir.replace(/\/$/, '') + '.locale-residue-original';
  console.log('\nBackup → ' + backupDir);
  if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
  classifications.forEach(function (c) {
    if (c.action !== 'rewrite') return;
    var src = path.join(rootDir, c.file);
    var dst = path.join(backupDir, c.file);
    if (!fs.existsSync(dst)) fs.copyFileSync(src, dst);
  });

  console.log('\nApplying...');
  var applied = 0, errored = 0;
  classifications.forEach(function (c, idx) {
    if (c.action !== 'rewrite') return;
    var zipPath = path.join(rootDir, c.file);
    try {
      var r = applyZip(zipPath);
      if (r.applied) applied++;
      else { errored++; console.warn('  WARN ' + c.file + ': ' + r.note); }
    } catch (e) {
      errored++;
      console.error('  ERROR ' + c.file + ': ' + e.message);
    }
    if ((idx + 1) % 50 === 0) console.log('  applied ' + applied + '/' + counts.rewrite);
  });

  console.log('\nDone. applied=' + applied + '  errored=' + errored);
  process.exit(errored > 0 ? 2 : 0);
}

main();
