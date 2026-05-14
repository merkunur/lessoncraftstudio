#!/usr/bin/env node
/**
 * One-shot rewriter for bingo es-locale ZIPs (2026-05-14 Spanish wave)
 * whose deck.html shipped with English locale-residue in seoMeta,
 * <title>, and <meta description> because bingo's _t() locale-merge
 * failed at gen time (translations-shared.js es entries exist but
 * weren't reached, so _t() fell through to English fallbacks).
 *
 * Triggered the §17.8.17 Invariant 6 LOCALE_RESIDUE_DETECTED gate;
 * 85/85 bingo decks halted at publish-bulk dry-run.
 *
 * Operator's directive: no regen. Authoring-side fix shipped separately.
 * This script patches the 85 already-staged ZIPs in-place.
 *
 * Per-ZIP substitution map (Spanish via translations-shared.js es entries):
 *   "Picture Bingo"         → "Bingo de Imágenes"   (es title in STRINGS_ALL.es.title)
 *   "Worksheet"             → "Ficha"               (translations-shared.js es.worksheet)
 *   "Free interactive"      → "Hoja interactiva gratuita" (es.seoFreeInteractive)
 *   "for"                   → "para"                (es.seoFor; CONTEXT-SCOPED)
 *   "Print or play online"  → "Imprimir o jugar en línea" (es.seoPrintOrPlayOnline)
 *
 * The `for` substitution is context-scoped to avoid mangling `for (var i = 0)`
 * style JS loops elsewhere in deck.html. Applied only at the meta description
 * pattern's anchor.
 *
 * Usage:
 *   node scripts/publish-cli/rewrite-bingo-es-locale-residue.js <directory> [--dry-run]
 */

'use strict';

var fs = require('fs');
var path = require('path');
var AdmZip = require(path.resolve(__dirname, '..', '..', 'node_modules', 'adm-zip'));

function patchDeckHtml(html) {
  var before = {
    pictureBingo: (html.match(/Picture Bingo/g) || []).length,
    worksheet: (html.match(/\bWorksheet\b/g) || []).length,
    freeInteractive: (html.match(/Free interactive/g) || []).length,
    printOrPlay: (html.match(/Print or play online/g) || []).length,
  };

  // 1. seoMeta JSON discrete replacements (safest — exact key+value match).
  html = html.replace(/"exerciseTypeName":"Picture Bingo"/g, '"exerciseTypeName":"Bingo de Imágenes"');
  html = html.replace(/"worksheetWord":"Worksheet"/g, '"worksheetWord":"Ficha"');
  html = html.replace(/"freeInteractive":"Free interactive"/g, '"freeInteractive":"Hoja interactiva gratuita"');
  html = html.replace(/"forWord":"for"/g, '"forWord":"para"');
  html = html.replace(/"printOrPlay":"Print or play online"/g, '"printOrPlay":"Imprimir o jugar en línea"');

  // 2. <title> pattern: "Picture Bingo Worksheet — <rest>" → "Bingo de Imágenes Ficha — <rest>"
  //    Pre-pass: replace "Picture Bingo Worksheet" composite before later granular passes.
  html = html.replace(/Picture Bingo Worksheet/g, 'Bingo de Imágenes Ficha');

  // 3. <meta description> pattern:
  //    "Free interactive Picture Bingo Worksheet (X) for Y. Print or play online (Z)."
  //    becomes
  //    "Hoja interactiva gratuita Bingo de Imágenes Ficha (X) para Y. Imprimir o jugar en línea (Z)."
  //    Note: "Picture Bingo Worksheet" already substituted above; only need to handle
  //    "Free interactive", " for ", "Print or play online" plus the meta-anchor " for ".
  //
  //    Match the exact meta description structure to scope the " for " substitution.
  html = html.replace(
    /Free interactive Bingo de Imágenes Ficha \(([^)]+)\) for ([^.]+)\. Print or play online \(([^)]+)\)/g,
    'Hoja interactiva gratuita Bingo de Imágenes Ficha ($1) para $2. Imprimir o jugar en línea ($3)'
  );

  // 4. Schema.org JSON-LD name field (matches the title text).
  //    "name":"Picture Bingo Worksheet ..." → already substituted via composite replace above.
  //    "description":"..." in JSON-LD mirrors meta description — covered above.

  // 5. Remaining standalone "Picture Bingo" references (e.g., in title attribute
  //    on links, etc.). Safe global substitution since "Picture Bingo" is a
  //    proper noun phrase unique to this exercise type.
  html = html.replace(/Picture Bingo/g, 'Bingo de Imágenes');

  // 6. Remaining "Free interactive" (outside meta description). Capitalized form
  //    is specific to seoMeta+description context; safe global.
  html = html.replace(/Free interactive/g, 'Hoja interactiva gratuita');

  // 7. Remaining "Print or play online" — safe global (specific phrasing).
  html = html.replace(/Print or play online/g, 'Imprimir o jugar en línea');

  var after = {
    pictureBingo: (html.match(/Picture Bingo/g) || []).length,
    worksheet: (html.match(/\bWorksheet\b/g) || []).length,
    freeInteractive: (html.match(/Free interactive/g) || []).length,
    printOrPlay: (html.match(/Print or play online/g) || []).length,
  };

  return { html: html, before: before, after: after };
}

function processZip(zipPath, dryRun) {
  var zip = new AdmZip(zipPath);
  var entry = zip.getEntry('deck.html');
  if (!entry) return { error: 'deck.html missing' };
  var html = entry.getData().toString('utf8');
  var result = patchDeckHtml(html);

  if (dryRun) return { dryRun: true, before: result.before, after: result.after };

  var buf = Buffer.from(result.html, 'utf8');
  if (typeof zip.updateFile === 'function') {
    zip.updateFile(entry, buf);
  } else {
    zip.deleteFile('deck.html');
    zip.addFile('deck.html', buf);
  }
  var tmp = zipPath + '.tmp';
  zip.writeZip(tmp);
  fs.renameSync(tmp, zipPath);
  return { ok: true, before: result.before, after: result.after };
}

function main() {
  var args = process.argv.slice(2);
  var dryRun = false;
  var workingDir = null;
  for (var i = 0; i < args.length; i++) {
    if (args[i] === '--dry-run') { dryRun = true; continue; }
    if (workingDir == null) { workingDir = args[i]; continue; }
  }
  if (!workingDir) {
    console.error('USAGE: node scripts/publish-cli/rewrite-bingo-es-locale-residue.js <directory> [--dry-run]');
    process.exit(2);
  }
  workingDir = path.resolve(workingDir);
  var zips = fs.readdirSync(workingDir).filter(function (f) { return f.toLowerCase().endsWith('.zip'); }).sort();
  console.log('Mode:', dryRun ? 'DRY-RUN' : 'APPLY');
  console.log('Dir:', workingDir);
  console.log('ZIPs:', zips.length);
  console.log('');

  var totals = { processed: 0, errored: 0, residualPictureBingo: 0, residualWorksheet: 0, residualFreeInteractive: 0, residualPrintOrPlay: 0 };
  zips.forEach(function (f, idx) {
    var r = processZip(path.join(workingDir, f), dryRun);
    if (r.error) {
      console.log('[' + (idx + 1) + '/' + zips.length + '] ' + f + ' — ERROR: ' + r.error);
      totals.errored++;
      return;
    }
    totals.processed++;
    totals.residualPictureBingo += r.after.pictureBingo;
    totals.residualWorksheet += r.after.worksheet;
    totals.residualFreeInteractive += r.after.freeInteractive;
    totals.residualPrintOrPlay += r.after.printOrPlay;
    if ((idx + 1) % 20 === 0 || idx + 1 === zips.length) {
      console.log('[' + (idx + 1) + '/' + zips.length + '] ' + f);
    }
  });

  console.log('');
  console.log('=== Summary ===');
  console.log('  processed:                ' + totals.processed);
  console.log('  errored:                  ' + totals.errored);
  console.log('  residual "Picture Bingo": ' + totals.residualPictureBingo);
  console.log('  residual "Worksheet":     ' + totals.residualWorksheet);
  console.log('  residual "Free interactive": ' + totals.residualFreeInteractive);
  console.log('  residual "Print or play online": ' + totals.residualPrintOrPlay);
  console.log('');
  console.log(dryRun ? 'DRY-RUN complete. No changes written.' : 'APPLY complete.');
}

if (require.main === module) {
  main();
}
