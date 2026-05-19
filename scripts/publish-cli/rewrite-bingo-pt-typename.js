#!/usr/bin/env node
/**
 * One-shot salvage: rewrites bingo pt wave's seo_trace + deck.html where
 *  - seo_trace.title.typeName.value = "Picture Bingo" (English baked at
 *    canvas.lcsLocalizedTitle when currentLocale=undefined fell back to 'en')
 *  - seo_trace.description.typeName.value = "Picture Bingo"
 *  - seo_trace.description.instruction.{value:"",isLocalized:false}
 *    → triggers LOCALE_RESIDUE_DETECTED on publish-cli §17.8.17 invariant 6
 *
 * Source of truth for pt typeName + instruction: REFERENCE APPS/bingo.html
 * defaultTitles.pt / defaultDescriptions.pt (lines 1798-1828).
 *
 * Pipeline per ZIP:
 *   1. Open ZIP via adm-zip
 *   2. Read manifest.json
 *   3. Skip if app !== 'bingo' OR language !== 'pt'
 *   4. Patch seo_trace.title.typeName.value = TYPE_PT
 *   5. Patch seo_trace.description.typeName.value = TYPE_PT
 *   6. Patch seo_trace.description.instruction = {value: INSTR_PT, source: 'salvage-bingo-pt-typename', isLocalized: true}
 *   7. Read deck.html
 *   8. Substitute English residue:
 *        "Picture Bingo Worksheet" → "Bingo de Imagens Atividade"
 *        "Free interactive Picture Bingo Worksheet" → "Atividade interativa gratuita de Bingo de Imagens"
 *        "Print or play online" → "Imprimir ou jogar online"
 *        worksheetType "Picture Bingo" in JSON-LD name → "Bingo de Imagens"
 *   9. Write atomically (in-place; backup created at <dir>.bingo-pt-original/)
 *
 * Per CLAUDE.md §15.17 salvage scripts pattern + §A.13.8 adjudication-reversal
 * (operator's existing generation hours preserved; authoring-side fix at
 * REFERENCE APPS/bingo.html locale-init ordering filed separately).
 *
 * Usage:
 *   node scripts/publish-cli/rewrite-bingo-pt-typename.js <directory> [--dry-run]
 */

'use strict';

var fs = require('fs');
var path = require('path');
var AdmZip = require(path.resolve(__dirname, '..', '..', 'node_modules', 'adm-zip'));

var TYPE_PT = 'Bingo de Imagens';
var INSTR_PT = 'Encontre as imagens correspondentes para ganhar!';

var ENGLISH_FALLBACK_PATTERNS = [
  // <title> tag form
  ['Picture Bingo Worksheet', TYPE_PT + ' Atividade'],
  // meta description leading form
  ['Free interactive Picture Bingo Worksheet', 'Atividade interativa gratuita de ' + TYPE_PT],
  // tail
  ['Print or play online', 'Imprimir ou jogar online'],
  // og:title / twitter:title may have shorter form
  ['Picture Bingo', TYPE_PT]
];

function parseArgs(argv) {
  var args = { dir: null, dryRun: false };
  argv.slice(2).forEach(function (a) {
    if (a === '--dry-run') args.dryRun = true;
    else if (!args.dir) args.dir = a;
  });
  return args;
}

function patchManifest(manifest) {
  var changed = false;
  if (!manifest.seo_trace) return false;

  var titleTypeName = manifest.seo_trace.title && manifest.seo_trace.title.typeName;
  if (titleTypeName && titleTypeName.value !== TYPE_PT) {
    titleTypeName.value = TYPE_PT;
    titleTypeName.isLocalized = true;
    titleTypeName.source = 'salvage-bingo-pt-typename';
    changed = true;
  }

  var descTypeName = manifest.seo_trace.description && manifest.seo_trace.description.typeName;
  if (descTypeName && descTypeName.value !== TYPE_PT) {
    descTypeName.value = TYPE_PT;
    descTypeName.isLocalized = true;
    descTypeName.source = 'salvage-bingo-pt-typename';
    changed = true;
  }

  var descInstr = manifest.seo_trace.description && manifest.seo_trace.description.instruction;
  if (descInstr && (descInstr.isLocalized === false || descInstr.value !== INSTR_PT)) {
    descInstr.value = INSTR_PT;
    descInstr.isLocalized = true;
    descInstr.source = 'salvage-bingo-pt-typename';
    changed = true;
  }

  return changed;
}

function patchDeckHtml(deckHtml) {
  var changed = false;
  var out = deckHtml;
  ENGLISH_FALLBACK_PATTERNS.forEach(function (pair) {
    var pattern = pair[0];
    var replacement = pair[1];
    var re = new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    if (re.test(out)) {
      out = out.replace(re, replacement);
      changed = true;
    }
  });
  return changed ? out : null;
}

function main() {
  var args = parseArgs(process.argv);
  if (!args.dir) {
    console.error('Usage: node rewrite-bingo-pt-typename.js <directory> [--dry-run]');
    process.exit(2);
  }

  var dir = path.resolve(args.dir);
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
    console.error('Not a directory:', dir);
    process.exit(2);
  }

  var entries = fs.readdirSync(dir).filter(function (n) {
    return n.toLowerCase().endsWith('.zip') && !n.startsWith('.');
  });

  var stats = { scanned: 0, candidate: 0, rewritten: 0, skipNonBingo: 0, skipNonPt: 0, skipClean: 0, errored: 0 };

  if (!args.dryRun) {
    var backupDir = dir + '.bingo-pt-original';
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
      console.log('[backup] Created', backupDir);
    }
  }

  entries.forEach(function (name) {
    var zipPath = path.join(dir, name);
    stats.scanned++;

    try {
      var zip = new AdmZip(zipPath);
      var manifestEntry = zip.getEntry('manifest.json');
      if (!manifestEntry) {
        stats.errored++;
        console.error('[err]', name, 'missing manifest.json');
        return;
      }
      var manifest = JSON.parse(zip.readAsText(manifestEntry));
      if ((manifest.exercise_type || manifest.generator && manifest.generator.app) !== 'bingo') {
        stats.skipNonBingo++;
        return;
      }
      if (manifest.language !== 'pt') {
        stats.skipNonPt++;
        return;
      }
      stats.candidate++;

      var manifestChanged = patchManifest(manifest);
      var deckEntry = zip.getEntry('deck.html');
      var deckHtmlChanged = null;
      if (deckEntry) {
        var original = zip.readAsText(deckEntry);
        deckHtmlChanged = patchDeckHtml(original);
      }

      if (!manifestChanged && deckHtmlChanged === null) {
        stats.skipClean++;
        return;
      }

      if (args.dryRun) {
        stats.rewritten++;
        console.log('[would-rewrite]', name,
          manifestChanged ? '(manifest)' : '',
          deckHtmlChanged !== null ? '(deck.html)' : '');
        return;
      }

      // backup
      fs.copyFileSync(zipPath, path.join(dir + '.bingo-pt-original', name));

      if (manifestChanged) {
        zip.updateFile(manifestEntry, Buffer.from(JSON.stringify(manifest, null, 2), 'utf8'));
      }
      if (deckHtmlChanged !== null) {
        zip.updateFile(deckEntry, Buffer.from(deckHtmlChanged, 'utf8'));
      }

      var tmpPath = zipPath + '.tmp';
      zip.writeZip(tmpPath);
      fs.renameSync(tmpPath, zipPath);
      stats.rewritten++;
    } catch (e) {
      stats.errored++;
      console.error('[err]', name, e.message);
    }
  });

  console.log('');
  console.log('Stats:');
  Object.keys(stats).forEach(function (k) {
    console.log('  ' + k + ':', stats[k]);
  });

  if (stats.errored > 0) process.exit(1);
}

main();
