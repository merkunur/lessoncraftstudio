/**
 * Seed the design_elements table from the uploaded SVG files.
 *
 * Prerequisite: the extraction script (extract-design-elements.js) has run,
 * and the output directory has been uploaded to /var/www/lcs-media/design-elements/
 * on the server.
 *
 * This script reads the manifest.json on the server and upserts one
 * DesignElement row per SVG.
 *
 * Usage (run on server):
 *   cd /opt/lessoncraftstudio && node scripts/seed-design-elements.js
 */

const fs = require('fs');
const path = require('path');

// Detect environment (server vs local)
const isServer = fs.existsSync('/opt/lessoncraftstudio');
const frontendRoot = isServer
  ? '/opt/lessoncraftstudio/frontend'
  : path.resolve(__dirname, '..', 'frontend');

process.chdir(frontendRoot);

const { PrismaClient } = require(path.join(frontendRoot, 'node_modules', '@prisma', 'client'));
const prisma = new PrismaClient();

// Source of truth: manifest on the server
const MANIFEST_PATH = isServer
  ? '/var/www/lcs-media/design-elements/manifest.json'
  : path.resolve(__dirname, '..', 'design-elements-library', 'manifest.json');

// Default placement / scale by category (match the coloring.html handlers)
const CATEGORY_DEFAULTS = {
  'patterns':       { placement: null,          scale: null, tintable: false },
  'textures':       { placement: null,          scale: null, tintable: false },
  'frames':         { placement: 'full-frame',  scale: 0.92, tintable: true  },
  'corners':        { placement: null,          scale: null, tintable: true  },
  'banners':        { placement: 'top',         scale: 0.80, tintable: true  },
  'dividers':       { placement: 'divider',     scale: 0.80, tintable: true  },
  'badges':         { placement: 'center',      scale: 0.35, tintable: true  },
  'title-banners':  { placement: 'top',         scale: 0.90, tintable: true  },
  'accents':        { placement: 'center',      scale: 0.25, tintable: true  },
  'scatter-packs':  { placement: 'center',      scale: 0.80, tintable: false },
  'footers':        { placement: 'bottom',      scale: 0.85, tintable: true  },
};

async function main() {
  console.log('Reading manifest from', MANIFEST_PATH);
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  console.log(`Manifest has ${manifest.items.length} items`);

  let upserted = 0;
  let skipped = 0;

  for (const item of manifest.items) {
    const defaults = CATEGORY_DEFAULTS[item.category] || { placement: null, scale: null, tintable: true };
    const translations = {
      en: item.name_en || item.slug
    };

    try {
      await prisma.designElement.upsert({
        where: { slug: item.slug },
        update: {
          category: item.category,
          filename: item.filename,
          filePath: item.file_path,
          fileSize: item.size_bytes,
          mimeType: 'image/svg+xml',
          translations: translations,
          defaultPlacement: defaults.placement,
          defaultScale: defaults.scale,
          tintable: defaults.tintable,
          sortOrder: item.sort_order,
          isActive: true
        },
        create: {
          slug: item.slug,
          category: item.category,
          filename: item.filename,
          filePath: item.file_path,
          fileSize: item.size_bytes,
          mimeType: 'image/svg+xml',
          translations: translations,
          defaultPlacement: defaults.placement,
          defaultScale: defaults.scale,
          tintable: defaults.tintable,
          sortOrder: item.sort_order,
          isActive: true
        }
      });
      upserted++;
    } catch (err) {
      console.error(`Failed to upsert ${item.slug}:`, err.message);
      skipped++;
    }
  }

  console.log(`\n${upserted} upserted, ${skipped} skipped`);

  // Summary by category
  const counts = await prisma.designElement.groupBy({
    by: ['category'],
    _count: { _all: true },
    orderBy: { category: 'asc' }
  });
  console.log('\nRows per category:');
  counts.forEach(c => console.log(`  ${c.category}: ${c._count._all}`));

  await prisma.$disconnect();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
