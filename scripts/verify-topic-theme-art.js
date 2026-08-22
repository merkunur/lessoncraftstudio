#!/usr/bin/env node
/**
 * verify-topic-theme-art.js — asserts frontend/lib/topic-theme-art.json is
 * complete and every mapped image exists in the local webp mirror.
 *
 * Checks:
 *   1. Every theme axis-key in topics-taxonomy.json has an entry.
 *   2. Every entry's path starts with /image-library-webp/themes/ and the
 *      file exists on disk under image-library-webp/themes/ (same tree nginx
 *      serves — a local hit means a production hit unless the mirror sync is
 *      broken, which §A.7.2's own gate covers).
 *   3. No entry maps a key that is not in the taxonomy (stale-key guard).
 *
 * Exit 1 with a per-defect listing on any failure. Run after regenerating the
 * map (scripts/generate-topic-theme-art.js) and before any deploy touching it.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const MIRROR = path.join(ROOT, 'image-library-webp', 'themes');
const TAXONOMY = require(path.join(ROOT, 'frontend', 'config', 'topics-taxonomy.json'));
const ART = require(path.join(ROOT, 'frontend', 'lib', 'topic-theme-art.json'));

const PREFIX = '/image-library-webp/themes/';
const themeKeys = Object.keys(TAXONOMY.axes.theme);
const artKeys = Object.keys(ART).filter((k) => !k.startsWith('_'));
const defects = [];

for (const key of themeKeys) {
  const p = ART[key];
  if (!p) { defects.push(`MISSING entry: ${key}`); continue; }
  if (!p.startsWith(PREFIX)) { defects.push(`BAD PREFIX: ${key} -> ${p}`); continue; }
  const rel = p.slice(PREFIX.length);
  const abs = path.join(MIRROR, ...rel.split('/'));
  if (!fs.existsSync(abs)) defects.push(`FILE NOT FOUND: ${key} -> ${p}`);
}
for (const key of artKeys) {
  if (!themeKeys.includes(key)) defects.push(`STALE key not in taxonomy: ${key}`);
}

if (defects.length) {
  console.error(`FAIL — ${defects.length} defect(s):`);
  for (const d of defects) console.error('  ' + d);
  process.exit(1);
}
console.log(`OK — ${themeKeys.length}/${themeKeys.length} theme-art entries verified against the local mirror.`);
