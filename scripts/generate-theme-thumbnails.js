#!/usr/bin/env node
/**
 * generate-theme-thumbnails.js — produces frontend/lib/theme-thumbnails.json
 * mapping each topics-taxonomy.json axes.theme key to a public-URL path
 * for the theme's canonical thumbnail asset.
 *
 * Resolution order per axis-key:
 *   1. If `theme-thumbnail-overrides.json` has an entry for the key, use
 *      `/images/<theme_id>/<override-filename>` (URL-encoded).
 *   2. Otherwise fall through to the first-alphabetical PNG/JPG/WEBP file
 *      found in the local `image library/<display-dir>/` for that theme.
 *
 * The image library symlink at the repo root resolves locally to the
 * canonical asset tree mirrored to production at /var/www/lcs-media/
 * image-library/. Display-name directories use spaces ("4th of July");
 * production theme_id (URL-segment) uses underscores ("4th_of_july"). The
 * script converts display-name → theme_id by lowercasing + space→underscore
 * to locate the matching dir per axis-key.
 *
 * Output: frontend/lib/theme-thumbnails.json (overwrite). Filenames are
 * URL-encoded so paths are valid hrefs without per-consumer encoding.
 *
 * Re-run any time:
 *   - the operator updates theme-thumbnail-overrides.json
 *   - new themes are added to topics-taxonomy.json axes.theme
 *   - asset additions in image library/ change the first-alphabetical pick
 *     for any non-overridden theme
 *
 * Originating commission: Alt A Homepage Redesign — Arc 2 A3 (theme strip
 * thumbnail wiring). Override mechanism added post-Phase-4 spot-check
 * (operator-confirmed 17 archetypal picks + tree fallback resolution to
 * oak.png).
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const TAXONOMY_PATH = path.join(REPO_ROOT, 'frontend', 'config', 'topics-taxonomy.json');
const OVERRIDES_PATH = path.join(REPO_ROOT, 'frontend', 'lib', 'theme-thumbnail-overrides.json');
const OUTPUT_PATH = path.join(REPO_ROOT, 'frontend', 'lib', 'theme-thumbnails.json');
const LIB_DIR = path.join(REPO_ROOT, 'image library');

function loadJsonStripUnderscoreKeys(filePath) {
  const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  // Strip metadata keys (those prefixed with `_`); they document intent
  // but don't participate in the override mapping.
  const stripped = {};
  for (const [k, v] of Object.entries(raw)) {
    if (!k.startsWith('_')) stripped[k] = v;
  }
  return stripped;
}

function buildLibMap() {
  const entries = fs.readdirSync(LIB_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name);
  const map = {};
  for (const disp of entries) {
    map[disp.toLowerCase().replace(/ /g, '_')] = disp;
  }
  return map;
}

function pickFirstAlphabetical(libDir) {
  const files = fs.readdirSync(libDir)
    .filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f))
    .sort();
  return files[0] ?? null;
}

function generate() {
  const taxonomy = JSON.parse(fs.readFileSync(TAXONOMY_PATH, 'utf8'));
  const themeKeys = Object.keys(taxonomy.axes.theme);
  const overrides = fs.existsSync(OVERRIDES_PATH)
    ? loadJsonStripUnderscoreKeys(OVERRIDES_PATH)
    : {};
  const libMap = buildLibMap();

  const results = {};
  const missing = [];
  const overrideHits = [];
  const overrideMisses = [];

  for (const key of themeKeys) {
    const dispDir = libMap[key];
    if (!dispDir) {
      missing.push({ key, reason: 'no matching dir in image library/' });
      continue;
    }
    const dirPath = path.join(LIB_DIR, dispDir);

    // Apply override if present + the override file actually exists
    const override = overrides[key];
    if (override) {
      const overridePath = path.join(dirPath, override);
      if (fs.existsSync(overridePath)) {
        results[key] = '/images/' + key + '/' + encodeURIComponent(override);
        overrideHits.push(key);
        continue;
      } else {
        overrideMisses.push({ key, override });
        // Fall through to first-alphabetical so the strip stays populated
      }
    }

    const filename = pickFirstAlphabetical(dirPath);
    if (!filename) {
      missing.push({ key, reason: 'no PNG/JPG/WEBP in dir' });
      continue;
    }
    results[key] = '/images/' + key + '/' + encodeURIComponent(filename);
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(results, null, 2) + '\n');

  console.log(`Resolved: ${Object.keys(results).length} / ${themeKeys.length}`);
  console.log(`Override hits: ${overrideHits.length}`);
  if (overrideMisses.length > 0) {
    console.log(`Override MISSES (file not found in dir; fell through):`);
    for (const m of overrideMisses) console.log(`  ${m.key} -> ${m.override}`);
  }
  if (missing.length > 0) {
    console.log(`Unresolved: ${missing.length}`);
    for (const m of missing) console.log(`  ${m.key}: ${m.reason}`);
  }
  console.log(`Wrote ${OUTPUT_PATH}`);
}

generate();
