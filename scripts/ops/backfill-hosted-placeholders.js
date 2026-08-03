/**
 * backfill-hosted-placeholders.js — repair already-saved hosted worksheets.
 *
 * Run (on the server, from frontend/ so Prisma's env loads):
 *   cd /opt/lessoncraftstudio/frontend && node ../scripts/ops/backfill-hosted-placeholders.js --dry-run
 *   cd /opt/lessoncraftstudio/frontend && node ../scripts/ops/backfill-hosted-placeholders.js --apply
 *
 * WHY. Worksheets saved before the personalization fix shipped with raw
 * `__CANONICAL_URL__` / `__OG_*__` / `__WORKSHEET_MAIN_ALT__` tokens — visible in
 * the browser tab, announced by screen readers, copied by the share panel.
 * The forward fix only covers NEW saves; these files are already on disk.
 *
 * ⚠ WHY THIS CANNOT COPY scripts/ops/clean-existing-hosted.js. That one is
 * FS-only. Files are named <row.id>.html, but the URL to bake is derived from
 * <row.linkId>, which exists ONLY in the DB — so an FS-only walk cannot build
 * the right URL. Modelled on the sibling cleanup-hosted-worksheets.js instead.
 *
 * ⚠ It also UPDATES htmlBytes. clean-existing-hosted.js rewrote files without
 * doing so, leaving those rows' quota accounting slightly stale; this corrects
 * rather than compounds that.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const loadPersonalize = require('../lib/load-hosted-personalize');

const APPLY = process.argv.includes('--apply');
const DRY = !APPLY;

const DIR = process.env.HOSTED_WORKSHEETS_DIR || '/var/www/lcs-media/hosted-worksheets';
const CANONICAL_HOST = 'https://www.lessoncraftstudio.com';

// og:locale SoT lives in frontend/lib/schema-generator.ts. Mirrored here only
// because this CJS script cannot import a `@/`-aliased TS module; keep in sync.
const OG_LOCALE_MAP = {
  en: 'en_US', de: 'de_DE', fr: 'fr_FR', es: 'es_MX', pt: 'pt_BR',
  it: 'it_IT', nl: 'nl_NL', sv: 'sv_SE', da: 'da_DK', no: 'nb_NO', fi: 'fi_FI',
};

function loadPrisma() {
  const p = path.resolve(process.cwd(), 'node_modules/@prisma/client');
  // Same bare-specifier trap fixed in audit-theme-webp-coverage.js: @prisma/client
  // lives only in frontend/node_modules, and node resolves from the SCRIPT's
  // directory, not the cwd.
  const { PrismaClient } = require(p);
  return new PrismaClient();
}

(async () => {
  const P = loadPersonalize();
  const prisma = loadPrisma();

  const rows = await prisma.hostedWorksheet.findMany({
    where: { status: 'live' },
    select: { id: true, linkId: true, title: true, locale: true, htmlBytes: true },
  });

  console.log((DRY ? '[DRY RUN] ' : '[APPLY] ') + rows.length + ' live hosted worksheet(s)\n');

  let changed = 0, clean = 0, missing = 0, failed = 0;

  for (const row of rows) {
    const file = path.join(DIR, row.id + '.html');
    if (!fs.existsSync(file)) {
      console.error('  MISSING  ' + row.id + ' (' + row.linkId + ') — no file on disk');
      missing++;
      continue;
    }

    const before = fs.readFileSync(file, 'utf8');
    const residue = P.findPlaceholderResidue(before);

    const after = P.applyHostedPersonalization(P.stripCatalogChrome(before), {
      playUrl: `${CANONICAL_HOST}/play/w/${row.linkId}`,
      title: row.title,
      ogLocale: OG_LOCALE_MAP[row.locale] || row.locale,
    });

    if (after === before) {
      clean++;
      console.log('  clean    ' + row.linkId + ' (no change)');
      continue;
    }

    // Never write bytes that still leak — that would launder the problem.
    const left = P.findPlaceholderResidue(after);
    if (left.length) {
      console.error('  FAILED   ' + row.linkId + ' — would still leak: ' + left.join(' '));
      failed++;
      continue;
    }

    const bytes = Buffer.byteLength(after, 'utf8');
    console.log('  ' + (DRY ? 'would fix' : 'fixed   ') + ' ' + row.linkId +
      '  tokens=' + (residue.length || 0) +
      '  bytes ' + row.htmlBytes + ' -> ' + bytes);

    if (APPLY) {
      const tmp = file + '.tmp';
      fs.writeFileSync(tmp, after, 'utf8');
      fs.renameSync(tmp, file); // atomic, same convention as writeHostedHtml
      await prisma.hostedWorksheet.update({
        where: { id: row.id },
        data: { htmlBytes: bytes },
      });
    }
    changed++;
  }

  console.log('\n' + (DRY ? 'DRY RUN — ' : 'DONE — ') +
    changed + ' rewritten, ' + clean + ' already clean, ' +
    missing + ' missing, ' + failed + ' failed');
  if (DRY && changed) console.log('re-run with --apply to write.');

  await prisma.$disconnect();
  process.exit(failed ? 1 : 0);
})().catch((e) => { console.error('ERROR ' + (e && e.message)); process.exit(1); });
