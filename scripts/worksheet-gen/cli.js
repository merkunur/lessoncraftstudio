#!/usr/bin/env node
/**
 * cli.js — generate a wave of printable deck ZIPs ready for publish-wave.js.
 *
 *   node scripts/worksheet-gen/cli.js generate --wave waves/wave-001.json [--dry-run] [--force] [--limit N]
 *
 * Per instance: skip-if-ZIP-exists (idempotent resume) → renderInstance
 * (persistent browser page) → QA gate (lints + per-type verify must be empty;
 * failures recorded, NO zip) → preview/thumbnail assets → manifest →
 * deck.html → ZIP into out/staging/<waveId>/.
 *
 * Writes out/staging/<waveId>/_state.json (per-instance status) and
 * _summary.txt. --dry-run prints the enumeration only.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { enumerate } = require('./enumerate.js');
const { loadType } = require('./lib/load-types.js');
const { resolveStrings } = require('./i18n/strings.js');
const { renderInstance } = require('./render/render-instance.js');
const { buildManifest, scrapeImagesUsed } = require('./emit/manifest.js');
const { buildDeckHtml } = require('./emit/deck-html.js');
const { buildPreviewJpeg, buildThumbnail } = require('./emit/assets.js');
const { writeDeckZip } = require('./emit/zip.js');
const cacheManifest = require('./image-cache/resolve.js').manifest();

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--dry-run') args.dryRun = true;
    else if (a === '--force') args.force = true;
    else if (a === '--wave') args.wave = argv[++i];
    else if (a === '--limit') args.limit = Number(argv[++i]);
    else args._.push(a);
  }
  return args;
}

async function generate(args) {
  if (!args.wave) throw new Error('cli: --wave waves/wave-NNN.json is required');
  const plan = JSON.parse(fs.readFileSync(path.resolve(__dirname, args.wave), 'utf8'));
  const { instances, skipped } = enumerate(plan);
  const list = args.limit ? instances.slice(0, args.limit) : instances;

  console.log('[wave ' + plan.id + '] ' + instances.length + ' instances enumerated' +
    (args.limit ? ' (limit ' + args.limit + ')' : '') +
    (skipped.length ? '; ' + skipped.length + ' types skipped' : ''));
  skipped.forEach((s) => console.log('  SKIP-TYPE ' + s.typeId + ': ' + s.reason));

  if (args.dryRun) {
    list.slice(0, 30).forEach((it) => console.log('  ' + it.deckId));
    if (list.length > 30) console.log('  … +' + (list.length - 30) + ' more');
    return;
  }

  const stagingDir = path.join(__dirname, 'out', 'staging', plan.id);
  const workDir = path.join(__dirname, 'out', 'render', plan.id);
  fs.mkdirSync(stagingDir, { recursive: true });
  fs.mkdirSync(workDir, { recursive: true });

  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  const state = { wave: plan.id, startedAt: new Date().toISOString(), done: [], failed: [], skippedExisting: 0 };
  const t0 = Date.now();
  try {
    for (let i = 0; i < list.length; i++) {
      const it = list[i];
      const zipPath = path.join(stagingDir, it.deckId + '.zip');
      if (!args.force && fs.existsSync(zipPath)) { state.skippedExisting++; continue; }

      const spec = loadType(it.typeId);
      const strings = resolveStrings(it.typeId, it.locale, spec);
      try {
        const r = await renderInstance({
          type: spec, theme: it.cacheTheme, difficulty: it.difficulty, locale: it.locale,
          page, outDir: workDir, baseName: it.deckId, seedEpoch: plan.seedEpoch || 1, strings,
        });
        const fails = [].concat(r.qa.lints || [], r.qa.verify || []);
        if (fails.length) {
          state.failed.push({ deckId: it.deckId, qa: fails });
          console.error('  QA-FAIL ' + it.deckId + ': ' + JSON.stringify(fails).slice(0, 200));
          continue;
        }
        const preview = await buildPreviewJpeg(r.pngPath);
        const thumbnailBuf = await buildThumbnail(r.pngPath);
        const imagesUsed = scrapeImagesUsed(r.html, cacheManifest);
        const manifest = buildManifest({
          spec, cacheTheme: it.cacheTheme, difficulty: it.difficulty, locale: it.locale,
          deckId: it.deckId, generatedAt: new Date().toISOString(), strings, imagesUsed,
        });
        const deckHtml = buildDeckHtml({ manifest, spec, strings, locale: it.locale, preview });
        writeDeckZip({ stagingDir, deckId: it.deckId, manifest, deckHtml, pdfPath: r.pdfPath, thumbnailBuf });
        state.done.push(it.deckId);
      } catch (e) {
        state.failed.push({ deckId: it.deckId, error: e.message });
        console.error('  ERROR ' + it.deckId + ': ' + e.message);
      }
      if ((i + 1) % 25 === 0) {
        const rate = (Date.now() - t0) / (i + 1);
        console.log('  ' + (i + 1) + '/' + list.length + ' (' + Math.round(rate) + 'ms/instance, ETA ' +
          Math.round((list.length - i - 1) * rate / 60000) + 'min)');
        fs.writeFileSync(path.join(stagingDir, '_state.json'), JSON.stringify(state, null, 2));
      }
    }
  } finally {
    await browser.close();
  }

  state.finishedAt = new Date().toISOString();
  fs.writeFileSync(path.join(stagingDir, '_state.json'), JSON.stringify(state, null, 2));
  const summary = [
    'wave: ' + plan.id,
    'enumerated: ' + instances.length + (args.limit ? ' (limit ' + args.limit + ')' : ''),
    'zipped: ' + state.done.length,
    'already-existed (resume skips): ' + state.skippedExisting,
    'failed: ' + state.failed.length,
    'types skipped at enumeration: ' + skipped.length,
    '',
  ].concat(state.failed.map((f) => 'FAIL ' + f.deckId + ': ' + (f.error || JSON.stringify(f.qa).slice(0, 160)))).join('\n');
  fs.writeFileSync(path.join(stagingDir, '_summary.txt'), summary + '\n');
  console.log('\n' + summary);
}

(async () => {
  const args = parseArgs(process.argv.slice(2));
  const cmd = args._[0];
  if (cmd !== 'generate') {
    console.error('usage: node cli.js generate --wave waves/wave-NNN.json [--dry-run] [--force] [--limit N]');
    process.exit(2);
  }
  try { await generate(args); }
  catch (e) { console.error(e); process.exit(1); }
})();
