/**
 * Extract DESIGN_ELEMENTS from coloring.html into individual SVG files.
 *
 * Output structure:
 *   design-elements-library/
 *     manifest.json
 *     patterns/
 *       dotgrid.svg
 *       stars.svg
 *       ...
 *     textures/
 *     frames/
 *     corners/
 *     banners/
 *     dividers/
 *     badges/
 *     title-banners/
 *     accents/
 *     scatter-packs/
 *     footers/
 *     palettes.json    (color arrays, not SVG)
 *
 * Usage: node scripts/extract-design-elements.js
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const SOURCE_FILE = path.join(PROJECT_ROOT, 'REFERENCE APPS', 'coloring.html');
const OUT_DIR = path.join(PROJECT_ROOT, 'design-elements-library');

// Category name mapping: JS key → URL-safe filesystem name
const CATEGORY_MAP = {
  bgPatterns: 'patterns',
  bgTextures: 'textures',
  frames: 'frames',
  corners: 'corners',
  banners: 'banners',
  dividers: 'dividers',
  badges: 'badges',
  titleBanners: 'title-banners',
  accents: 'accents',
  scatterPacks: 'scatter-packs',
  footers: 'footers'
};

function extractDesignElements() {
  const html = fs.readFileSync(SOURCE_FILE, 'utf8');
  const startMarker = 'const DESIGN_ELEMENTS = {';
  const startIdx = html.indexOf(startMarker);
  if (startIdx === -1) {
    throw new Error('DESIGN_ELEMENTS = { not found in coloring.html');
  }

  // Walk forward tracking brace depth to find the closing }
  let depth = 0;
  let inString = null;    // track quote char if inside string/template
  let escape = false;
  let endIdx = -1;
  const objStart = html.indexOf('{', startIdx);

  for (let i = objStart; i < html.length; i++) {
    const ch = html[i];
    if (escape) { escape = false; continue; }
    if (ch === '\\') { escape = true; continue; }
    if (inString) {
      if (ch === inString) inString = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') {
      inString = ch;
      continue;
    }
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) { endIdx = i + 1; break; }
    }
  }

  if (endIdx === -1) throw new Error('Could not find end of DESIGN_ELEMENTS object');

  const objLiteral = html.slice(objStart, endIdx);
  const code = `var __DE = ${objLiteral}; __DE;`;
  const sandbox = {};
  return vm.runInNewContext(code, sandbox);
}

function slugify(s) {
  return String(s || '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function main() {
  console.log('Reading DESIGN_ELEMENTS from', SOURCE_FILE);
  const data = extractDesignElements();

  // Fresh output dir
  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const manifest = [];

  for (const [jsKey, categoryName] of Object.entries(CATEGORY_MAP)) {
    const items = data[jsKey];
    if (!Array.isArray(items)) {
      console.warn(`No items found for ${jsKey} — skipping`);
      continue;
    }

    const categoryDir = path.join(OUT_DIR, categoryName);
    fs.mkdirSync(categoryDir, { recursive: true });

    items.forEach((item, idx) => {
      const slug = slugify(item.id || item.name || `${categoryName}-${idx}`);
      const filename = `${slug}.svg`;
      const filePath = path.join(categoryDir, filename);
      fs.writeFileSync(filePath, item.svg, 'utf8');

      manifest.push({
        category: categoryName,
        slug: slug,
        filename: filename,
        file_path: `${categoryName}/${filename}`,
        name_en: item.name || slug,
        sort_order: idx,
        size_bytes: Buffer.byteLength(item.svg, 'utf8')
      });
    });

    console.log(`  ${categoryName}: ${items.length} items`);
  }

  // Palettes → single JSON file (not SVGs)
  if (Array.isArray(data.palettes)) {
    fs.writeFileSync(
      path.join(OUT_DIR, 'palettes.json'),
      JSON.stringify(data.palettes, null, 2)
    );
    console.log(`  palettes: ${data.palettes.length} items → palettes.json`);
  }

  fs.writeFileSync(
    path.join(OUT_DIR, 'manifest.json'),
    JSON.stringify({
      extractedAt: new Date().toISOString(),
      source: 'REFERENCE APPS/coloring.html',
      count: manifest.length,
      items: manifest
    }, null, 2)
  );

  console.log(`\nExtracted ${manifest.length} SVG elements + ${(data.palettes || []).length} palettes`);
  console.log(`Output: ${OUT_DIR}`);
}

main();
