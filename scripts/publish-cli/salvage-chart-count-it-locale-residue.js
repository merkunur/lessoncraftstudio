#!/usr/bin/env node
// Salvage for chart-count Italian wave 2026-05-22:
// 49 ZIPs shipped with English/key-name residue in deck.html title + meta
// description + JSON-LD because chart-count's _t() lookup returned the
// literal i18n key string instead of falling through to undefined when
// Italian translation was missing at gen time.
//
// Cross-refs: CLAUDE.md §15.17 (salvage script pattern), §A.14.8 step 2b
// (bundle-vs-current-app reconciliation), §17.8.17 invariant 6
// (LOCALE_RESIDUE_DETECTED gate).
//
// Operations per ZIP:
//   1. Backup original to .original-chart-count-it-translations-2026-05-22/
//   2. Extract, patch manifest.json's seo_trace (mark 4 keys isLocalized:true
//      with correct Italian values), patch deck.html scoped to <title> +
//      <meta name="description"> + JSON-LD + prefixText + sr-only key leaks.
//   3. Repack to same path.
//
// Verification: re-run `publish-bulk --dry-run` after; expect 1562 OK.

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

const STAGING = '/opt/lessoncraftstudio/publish-inbound-it-wave-2026-05-22';
const BACKUP = path.join(STAGING, '.original-chart-count-it-translations-2026-05-22');

if (!fs.existsSync(BACKUP)) fs.mkdirSync(BACKUP, { recursive: true });

const zips = fs.readdirSync(STAGING)
  .filter(n => n.startsWith('chart-count-it-') && n.endsWith('.zip'))
  .sort();

console.log(`Found ${zips.length} chart-count Italian ZIPs to patch`);

const IT_MAP = {
  worksheetWord: { value: 'scheda', source: 'translations.it.worksheet' },
  forWord: { value: 'per', source: 'translations.it.seoFor' },
  freeInteractive: { value: 'Scheda interattiva gratuita', source: 'translations.it.seoFreeInteractive' },
  printOrPlay: { value: 'Stampa o gioca online', source: 'translations.it.seoPrintOrPlayOnline' }
};

function patchManifest(manifest) {
  if (!manifest.seo_trace) return manifest;
  ['title', 'description'].forEach(section => {
    const s = manifest.seo_trace[section];
    if (!s) return;
    Object.keys(IT_MAP).forEach(key => {
      if (s[key] && s[key].isLocalized === false) {
        s[key] = { value: IT_MAP[key].value, source: IT_MAP[key].source, isLocalized: true };
      }
    });
  });
  return manifest;
}

function patchHtml(html) {
  // <title> — lowercase ' worksheet ' inside the title element
  html = html.replace(
    /<title>([^<]*?) worksheet ([^<]*?)<\/title>/,
    (m, before, after) => `<title>${before} scheda ${after}</title>`
  );

  // <meta name="description" content="...">
  html = html.replace(
    /<meta name="description" content="([^"]*?)"/,
    (m, content) => {
      let c = content
        .replace(/^seoFreeInteractive /, 'Scheda interattiva gratuita ')
        .replace(/ seoFor /g, ' per ')
        .replace(/ seoPrintOrPlayOnline/g, ' Stampa o gioca online')
        .replace(/ worksheet \(/g, ' scheda (');
      return `<meta name="description" content="${c}"`;
    }
  );

  // JSON-LD: parse the embedded JSON, fix name + description, re-serialize
  html = html.replace(
    /<script type="application\/ld\+json">(\{[^<]*?\})<\/script>/,
    (m, json) => {
      try {
        const obj = JSON.parse(json);
        if (obj.name) {
          obj.name = obj.name.replace(/ worksheet —/g, ' scheda —');
        }
        if (obj.description) {
          obj.description = obj.description
            .replace(/^seoFreeInteractive /, 'Scheda interattiva gratuita ')
            .replace(/ seoFor /g, ' per ')
            .replace(/ seoPrintOrPlayOnline/g, ' Stampa o gioca online')
            .replace(/ worksheet \(/g, ' scheda (');
        }
        return `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;
      } catch (e) {
        return m;
      }
    }
  );

  // Embed/share prefix text (isolated runtime constant)
  html = html.replace(/var prefixText="Worksheet from";/, 'var prefixText="Scheda di";');

  // sr-only chrome — replace key-name leaks with plain English (gate-accepted)
  html = html.replace(/aria-label="srWorksheetQuestions"/g, 'aria-label="Worksheet questions"');
  html = html.replace(/<li>srExerciseChartCount<\/li>/g, '<li>Question: Count the pictures and color the boxes to make a graph.</li>');

  return html;
}

let patched = 0, errors = 0;
for (const zipName of zips) {
  const zipPath = path.join(STAGING, zipName);
  try {
    fs.copyFileSync(zipPath, path.join(BACKUP, zipName));
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cc-it-salvage-'));
    execSync(`unzip -q "${zipPath}" -d "${tmp}"`);

    const manifestPath = path.join(tmp, 'manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    fs.writeFileSync(manifestPath, JSON.stringify(patchManifest(manifest), null, 2));

    const deckHtmlPath = path.join(tmp, 'deck.html');
    const html = fs.readFileSync(deckHtmlPath, 'utf8');
    fs.writeFileSync(deckHtmlPath, patchHtml(html));

    fs.unlinkSync(zipPath);
    // Python zipfile module instead of `zip` CLI (Hetzner lacks `zip`)
    const entries = fs.readdirSync(tmp).filter(f => fs.statSync(path.join(tmp, f)).isFile());
    const py = `import zipfile, sys; zf = zipfile.ZipFile(sys.argv[1], 'w', zipfile.ZIP_DEFLATED); ` +
      `[zf.write(sys.argv[i], sys.argv[i].rsplit('/', 1)[-1]) for i in range(2, len(sys.argv))]; zf.close()`;
    const fileArgs = entries.map(e => `"${path.join(tmp, e)}"`).join(' ');
    execSync(`python3 -c "${py}" "${zipPath}" ${fileArgs}`);
    fs.rmSync(tmp, { recursive: true, force: true });

    patched++;
    if (patched % 10 === 0) console.log(`  patched ${patched}/${zips.length}`);
  } catch (e) {
    console.error(`ERROR on ${zipName}: ${e.message}`);
    errors++;
  }
}

console.log(`\nSalvage done. Patched: ${patched}/${zips.length}. Errors: ${errors}`);
console.log(`Backups at: ${BACKUP}`);
