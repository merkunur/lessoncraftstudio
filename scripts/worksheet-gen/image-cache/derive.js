/**
 * Derived 512px icon cache — shrinks the @3x (~1536px) theme images into a
 * 512px bounding box so rendered PDFs embed ~9x fewer pixels (3.4MB → ~400KB).
 *
 * cache/themes/<theme>/<file>  →  cache/themes-512/<theme>/<file>
 *
 * Idempotent: skips outputs that already exist and are newer than the source.
 * resolve.js prefers the derived copy by default; call sites that render art
 * larger than ~240px CSS opt out via fileUri(..., {full: true}).
 *
 * Usage: node scripts/worksheet-gen/image-cache/derive.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const CACHE = path.join(__dirname, '..', 'cache');
const SRC = path.join(CACHE, 'themes');
const DST = path.join(CACHE, 'themes-512');
const BOX = 512;

async function deriveAll() {
  const themes = fs.readdirSync(SRC).filter((d) => fs.statSync(path.join(SRC, d)).isDirectory());
  let made = 0, skipped = 0;
  for (const theme of themes) {
    const outDir = path.join(DST, theme);
    fs.mkdirSync(outDir, { recursive: true });
    for (const file of fs.readdirSync(path.join(SRC, theme))) {
      const src = path.join(SRC, theme, file);
      const dst = path.join(outDir, file);
      if (fs.existsSync(dst) && fs.statSync(dst).mtimeMs >= fs.statSync(src).mtimeMs) { skipped++; continue; }
      await sharp(src)
        .resize(BOX, BOX, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 88, alphaQuality: 95 })
        .toFile(dst);
      made++;
    }
  }
  return { made, skipped };
}

if (require.main === module) {
  deriveAll().then((r) => {
    console.log(`derive: ${r.made} derived, ${r.skipped} up-to-date → ${DST}`);
  }).catch((e) => { console.error(e); process.exit(1); });
}

module.exports = { deriveAll, DST, BOX };
