#!/usr/bin/env node
/**
 * A theme's WebP variant mirror must be ALL-PRESENT or ALL-ABSENT — never partial.
 *
 * WHY THIS INVARIANT AND NOT "every theme has variants". The generator apps ask
 * for `/image-library-webp/themes-lossless/<dir>/<db-stem>@3x.webp` and fall back
 * to the raw `/images/<dir>/<file>` on a 404. Measured on the live apps: `animals`
 * answers 200 for every variant, `flowers` answers 404 for every variant and uses
 * raw throughout. Both are FINE, because both are uniform — an app that draws all
 * of a worksheet from one source draws it consistently.
 *
 * The failure is a MIXED directory. A worksheet bakes its palette art at generate
 * time and crops its reveal art separately; if one of those reads a variant and
 * the other reads raw, the two disagree. In Grid Match that surfaced as puzzle
 * pieces appearing to change picture when a child dropped them into a cell —
 * caused by a repair that aliased 222 missing variants onto a similarly-named
 * older theme's files, giving a directory that was half-populated and, worse,
 * populated with different artwork.
 *
 * So: partial coverage is the defect. Zero coverage is a missed optimisation and
 * is reported separately, without failing the gate.
 *
 *   node scripts/audit-theme-webp-coverage.js            # exit 1 on any partial theme
 *   node scripts/audit-theme-webp-coverage.js --list
 *   node scripts/audit-theme-webp-coverage.js --poison   # must FAIL; proves it can
 *
 * Runs on the server (needs the DB and /var/www/lcs-media).
 */
const fs = require('fs');
const path = require('path');

/* ⚠ RESOLVE PRISMA BY ABSOLUTE PATH, NOT BY BARE SPECIFIER. @prisma/client is
   installed ONLY in frontend/node_modules (measured on Hetzner 2026-08-03: absent
   at the repo root). Node resolves a bare specifier from the SCRIPT's directory,
   not the cwd — so this file, living at scripts/, walks
   /opt/lessoncraftstudio/node_modules -> /opt/node_modules -> /node_modules and
   never sees it. deploy.sh's `( cd frontend && node /abs/path/script.js )` could
   therefore never work: cwd does not participate in module resolution.

   The crash then read as a CONTENT failure, because deploy.sh's `||` prints
   "an image directory is half-mirrored" for any non-zero exit — a gate that
   cannot run is indistinguishable from a gate that found something.

   Same pattern as scripts/publish-cli/db.js, which solved this first. */
const prismaClientPath = path.resolve(__dirname, '..', 'frontend', 'node_modules', '@prisma', 'client');
let PrismaClient;
try {
  ({ PrismaClient } = require(prismaClientPath));
} catch (e) {
  try {
    ({ PrismaClient } = require('@prisma/client'));
  } catch {
    console.error('audit-theme-webp-coverage: Prisma client not found at ' + prismaClientPath +
      ' nor on the default resolution path. Run `npm install` in frontend/ first. ' + e.message);
    process.exit(1);
  }
}

const args = new Set(process.argv.slice(2));
const LIST = args.has('--list');
const POISON = args.has('--poison');

const WEBP_ROOT = '/var/www/lcs-media/image-library-webp';
const TREES = ['themes', 'themes-lossless'];
const VARIANTS = ['@1x', '@2x', '@3x'];

/* The raw tree writes `zoo_animals`, the mirror writes `zoo animals`, and
   Content-Manager uploads write a bare theme CUID. Compare on a normalised key,
   or a naming convention reads as 79 missing directories when none is missing. */
const norm = (s) => s.toLowerCase().replace(/[_\s-]+/g, '');

function mirrorIndex(tree) {
  const root = path.join(WEBP_ROOT, tree);
  const idx = new Map();
  if (!fs.existsSync(root)) return idx;
  for (const d of fs.readdirSync(root)) {
    try { idx.set(norm(d), new Set(fs.readdirSync(path.join(root, d)))); } catch { /* unreadable */ }
  }
  return idx;
}

(async () => {
  const prisma = new PrismaClient();
  const rows = await prisma.$queryRawUnsafe(`
    SELECT t.name AS theme, i.file_path
    FROM image_library_items i
    JOIN image_themes t ON t.id = i.theme_id
    WHERE t.type = 'images'
  `);
  await prisma.$disconnect();

  const idx = Object.fromEntries(TREES.map((t) => [t, mirrorIndex(t)]));
  const byDir = new Map(); // dir -> {theme, present, absent, missingNames[]}
  let examined = 0;

  for (const r of rows) {
    const m = /^\/images\/([^/]+)\/(.+)\.(webp|png|jpe?g)$/i.exec(r.file_path || '');
    if (!m) continue;
    const [, dir, stem] = m;
    if (!byDir.has(dir)) byDir.set(dir, { theme: r.theme, present: 0, absent: 0, missing: [] });
    const rec = byDir.get(dir);
    for (const tree of TREES) {
      const files = idx[tree].get(norm(dir));
      for (const v of VARIANTS) {
        examined++;
        const want = `${stem}${v}.webp`;
        if (files && files.has(want)) rec.present++;
        else { rec.absent++; if (rec.missing.length < 6) rec.missing.push(`${tree}/${dir}/${want}`); }
      }
    }
  }

  /* A poison run fabricates a half-covered directory. A gate that still passes
     here cannot fail on the real thing and is worthless. */
  if (POISON) {
    byDir.set('(poison)', { theme: '(poison)', present: 6, absent: 6, missing: ['themes/(poison)/no-such@3x.webp'] });
    examined += 12;
  }

  /* Non-vacuity: a run that examined nothing has proved nothing about anything. */
  if (examined < 100 || byDir.size < 5) {
    console.log(`FAIL: examined ${examined} expected variants across ${byDir.size} directories — the query or the mirror root is wrong, not the data.`);
    process.exit(1);
  }

  const partial = [], full = [], none = [];
  for (const [dir, rec] of byDir) {
    if (rec.present && rec.absent) partial.push([dir, rec]);
    else if (rec.present) full.push([dir, rec]);
    else none.push([dir, rec]);
  }

  console.log(`  image directories examined : ${byDir.size}   (${examined} expected variant files)`);
  console.log(`  fully mirrored             : ${full.length}`);
  console.log(`  no mirror, raw fallback    : ${none.length}   (uniform — not a defect)`);
  console.log(`  PARTIAL                    : ${partial.length}`);
  for (const [dir, rec] of partial) {
    console.log(`     ${rec.theme} [${dir}] — ${rec.present} present, ${rec.absent} absent`);
    if (LIST) rec.missing.forEach((m) => console.log(`        missing ${m}`));
  }

  if (partial.length) {
    console.log(`\nFAIL: ${partial.length} directory/directories are half-mirrored. A worksheet can bake from one source and crop from the other.`);
    console.log('  Fix: node scripts/generate-theme-webp-variants.js --dir=<dir> --apply && --verify');
    process.exit(1);
  }
  console.log('\nPASS: every image directory is uniformly mirrored or uniformly raw.');
})();
