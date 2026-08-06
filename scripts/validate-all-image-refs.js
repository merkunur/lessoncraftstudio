#!/usr/bin/env node
/**
 * validate-all-image-refs.js
 *
 * Exhaustively validates every image reference in the codebase against
 * the actual server file inventory. Reports ALL mismatches.
 *
 * Checks:
 * 1. Showcase configs (English) — showcase-configs.ts
 * 2. All 10 locale showcase image files
 * 3. All 363 app-content files
 *
 * Usage:
 *   node scripts/validate-all-image-refs.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const INVENTORY_FILE = path.join(__dirname, 'server-file-inventory.txt');
const SAMPLES_PREFIX = '/var/www/lcs-media/samples/';

// Build set of all files on server (relative paths, e.g. "english/addition/addition-fun-1.webp")
function loadServerInventory() {
  const lines = fs.readFileSync(INVENTORY_FILE, 'utf-8')
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0);

  const files = new Set();
  for (const line of lines) {
    const rel = line.startsWith(SAMPLES_PREFIX) ? line.slice(SAMPLES_PREFIX.length) : line;
    files.add(rel);
  }
  return files;
}

// Extract image refs from showcase-configs.ts
function extractShowcaseConfigRefs() {
  const file = path.join(ROOT, 'frontend/app/[locale]/apps/[slug]/showcase/showcase-configs.ts');
  const content = fs.readFileSync(file, 'utf-8');
  const refs = [];

  // Match img('folder', 'filename.webp') pattern
  const imgPattern = /img\(\s*'([^']+)'\s*,\s*'([^']+)'\s*\)/g;
  let match;
  while ((match = imgPattern.exec(content)) !== null) {
    const folder = match[1];
    const filename = match[2];
    const serverPath = `english/${folder}/${filename}`;
    refs.push({ source: 'showcase-configs.ts', folder, filename, serverPath });
  }

  return refs;
}

// Extract image refs from locale showcase image files
function extractLocaleShowcaseRefs() {
  const localeMap = {
    german: 'de', french: 'fr', spanish: 'es', portuguese: 'pt',
    italian: 'it', dutch: 'nl', swedish: 'sv', danish: 'da',
    norwegian: 'no', finnish: 'fi'
  };

  const refs = [];

  for (const [lang, code] of Object.entries(localeMap)) {
    const file = path.join(ROOT, `frontend/config/${lang}-showcase-images.ts`);
    if (!fs.existsSync(file)) {
      console.warn(`  WARNING: ${file} not found`);
      continue;
    }
    const content = fs.readFileSync(file, 'utf-8');

    // Extract folder and imgs array entries
    // Pattern: folder: 'foldername', ... imgs: [...], answerKey: 'file.webp' or "file.webp"
    const appPattern = /(\w[\w-]*):\s*\{[^}]*?folder:\s*'([^']+)'[^}]*?imgs:\s*\[([\s\S]*?)\][^}]*?answerKey:\s*(['"])((?:(?!\4).)*\.webp)\4/g;
    let appMatch;
    while ((appMatch = appPattern.exec(content)) !== null) {
      const appId = appMatch[1];
      const folder = appMatch[2];
      const imgsBlock = appMatch[3];
      const answerKey = appMatch[5];

      // Extract individual image filenames from imgs array (single or double quoted)
      const imgFilePattern = /(['"])((?:(?!\1).)*\.webp)\1/g;
      let imgMatch;
      while ((imgMatch = imgFilePattern.exec(imgsBlock)) !== null) {
        const filename = imgMatch[2];
        const serverPath = `${lang}/${folder}/${filename}`;
        refs.push({ source: `${lang}-showcase-images.ts`, appId, folder, filename, serverPath, locale: lang });
      }

      // Answer key
      if (answerKey) {
        const serverPath = `${lang}/${folder}/${answerKey}`;
        refs.push({ source: `${lang}-showcase-images.ts`, appId, folder, filename: answerKey, serverPath, locale: lang, isAnswerKey: true });
      }
    }
  }

  return refs;
}

// Extract image refs from app-content files
function extractAppContentRefs() {
  const localeToFolder = {
    en: 'english', de: 'german', fr: 'french', es: 'spanish',
    pt: 'portuguese', it: 'italian', nl: 'dutch', sv: 'swedish',
    da: 'danish', no: 'norwegian', fi: 'finnish'
  };

  const refs = [];
  const contentDir = path.join(ROOT, 'frontend/config/app-content');

  for (const locale of Object.keys(localeToFolder)) {
    const localeDir = path.join(contentDir, locale);
    if (!fs.existsSync(localeDir)) continue;

    const files = fs.readdirSync(localeDir).filter(f => f.endsWith('.ts'));
    for (const file of files) {
      const filePath = path.join(localeDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');

      // Match /samples/language/folder/filename patterns
      const samplePattern = /\/samples\/([^/]+)\/([^/]+)\/([^'"\s,]+\.webp)/g;
      let match;
      while ((match = samplePattern.exec(content)) !== null) {
        const langFolder = match[1];
        const appFolder = decodeURIComponent(match[2]);
        const filename = decodeURIComponent(match[3]);
        const serverPath = `${langFolder}/${appFolder}/${filename}`;
        refs.push({ source: `app-content/${locale}/${file}`, langFolder, appFolder, filename, serverPath });
      }
    }
  }

  return refs;
}

function main() {
  console.log('Loading server file inventory...');
  const serverFiles = loadServerInventory();
  console.log(`  ${serverFiles.size} files on server\n`);

  const allRefs = [];
  const broken = [];
  const valid = [];

  // 1. Showcase configs (English)
  console.log('Checking showcase-configs.ts (English)...');
  const showcaseRefs = extractShowcaseConfigRefs();
  console.log(`  ${showcaseRefs.length} image references found`);
  allRefs.push(...showcaseRefs);

  // 2. Locale showcase image files
  console.log('Checking locale showcase image files...');
  const localeRefs = extractLocaleShowcaseRefs();
  console.log(`  ${localeRefs.length} image references found`);
  allRefs.push(...localeRefs);

  // 3. App-content files
  console.log('Checking app-content files...');
  const contentRefs = extractAppContentRefs();
  console.log(`  ${contentRefs.length} image references found`);
  allRefs.push(...contentRefs);

  console.log(`\nTotal references: ${allRefs.length}`);
  console.log('Validating against server inventory...\n');

  // Check each ref
  for (const ref of allRefs) {
    if (serverFiles.has(ref.serverPath)) {
      valid.push(ref);
    } else {
      broken.push(ref);
    }
  }

  console.log(`=== RESULTS ===`);
  console.log(`  Valid:  ${valid.length}`);
  console.log(`  BROKEN: ${broken.length}`);

  if (broken.length > 0) {
    console.log(`\n=== BROKEN REFERENCES (${broken.length}) ===\n`);

    // Group by source
    const bySource = {};
    for (const ref of broken) {
      if (!bySource[ref.source]) bySource[ref.source] = [];
      bySource[ref.source].push(ref);
    }

    for (const [source, refs] of Object.entries(bySource)) {
      console.log(`\n--- ${source} (${refs.length} broken) ---`);
      for (const ref of refs) {
        // Try to find a close match on server
        const parts = ref.serverPath.split('/');
        const dir = parts.slice(0, -1).join('/');
        const closestMatches = [];
        for (const serverFile of serverFiles) {
          if (serverFile.startsWith(dir + '/')) {
            closestMatches.push(serverFile.split('/').pop());
          }
        }
        console.log(`  MISSING: ${ref.serverPath}`);
        if (closestMatches.length > 0 && closestMatches.length <= 30) {
          console.log(`    Available in folder: ${closestMatches.join(', ')}`);
        }
      }
    }

    // Write broken refs to file
    const brokenFile = path.join(__dirname, 'broken-image-refs.json');
    fs.writeFileSync(brokenFile, JSON.stringify(broken, null, 2));
    console.log(`\nBroken refs saved to: ${brokenFile}`);
  }

  // Write valid refs for reference
  const validFile = path.join(__dirname, 'valid-image-refs.json');
  fs.writeFileSync(validFile, JSON.stringify(valid.length));
  console.log(`Valid count: ${valid.length}`);
}

main();
