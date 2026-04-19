/**
 * Generate the static manifest.json from the design_elements DB table.
 *
 * Writes to /var/www/lcs-media/design-elements/manifest.json, which nginx
 * serves directly. This is the read path for all apps — they fetch this
 * static file, not a Next.js API route.
 *
 * Run this whenever design_elements content changes (seed, admin UI edits, etc).
 *
 * Usage (on server):
 *   cd /opt/lessoncraftstudio && node scripts/generate-design-elements-manifest.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const isServer = fs.existsSync('/opt/lessoncraftstudio');
const frontendRoot = isServer
  ? '/opt/lessoncraftstudio/frontend'
  : path.resolve(__dirname, '..', 'frontend');
const STORAGE_DIR = isServer
  ? '/var/www/lcs-media/design-elements'
  : path.resolve(__dirname, '..', 'design-elements-library');

process.chdir(frontendRoot);
const { PrismaClient } = require(path.join(frontendRoot, 'node_modules', '@prisma', 'client'));
const prisma = new PrismaClient();

const MANIFEST_PATH = path.join(STORAGE_DIR, 'manifest.json');
const PALETTES_PATH = path.join(STORAGE_DIR, 'palettes.json');

async function main() {
  console.log('Reading design_elements from DB...');
  const rows = await prisma.designElement.findMany({
    where: { isActive: true },
    orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }]
  });

  const items = rows.map(r => {
    const translations = (r.translations) || {};
    return {
      id: r.id,
      slug: r.slug,
      category: r.category,
      url: `/design-elements/${r.filePath}`,
      name: translations.en || r.slug,
      translations: translations,
      defaultPlacement: r.defaultPlacement,
      defaultScale: r.defaultScale,
      tintable: r.tintable,
      sortOrder: r.sortOrder,
      tags: r.tags || []
    };
  });

  // Read palettes.json (the 12 color palettes)
  let palettes = [];
  try {
    palettes = JSON.parse(fs.readFileSync(PALETTES_PATH, 'utf8'));
  } catch (e) {
    console.warn('Could not read palettes.json:', e.message);
  }

  const manifest = {
    version: new Date().toISOString(),
    total: items.length,
    items,
    palettes
  };

  // Server storage is chattr +i protected — unlock, write, re-lock
  if (isServer) {
    try { execSync(`chattr -i "${MANIFEST_PATH}" 2>/dev/null`); } catch {}
  }
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  if (isServer) {
    try {
      execSync(`chown lcs-media:lcs-media "${MANIFEST_PATH}"`);
      execSync(`chattr +i "${MANIFEST_PATH}"`);
    } catch (e) {
      console.warn('Chattr/chown failed:', e.message);
    }
  }

  console.log(`Wrote manifest: ${items.length} items, ${palettes.length} palettes`);
  console.log(`Path: ${MANIFEST_PATH}`);

  // Category summary
  const byCat = {};
  items.forEach(i => { byCat[i.category] = (byCat[i.category] || 0) + 1; });
  Object.keys(byCat).sort().forEach(c => console.log(`  ${c}: ${byCat[c]}`));

  await prisma.$disconnect();
}

main().catch(err => { console.error(err); process.exit(1); });
