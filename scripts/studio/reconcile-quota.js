#!/usr/bin/env node
/* =====================================================================
   reconcile-quota.js — Story Studio tenancy maintenance.

   assetBytes is maintained incrementally by the /api/studio upload routes;
   this recomputes each live story's real on-disk bytes and repairs drift
   (crashed uploads, manual file surgery). Dry-run by default.

   USAGE:  node scripts/studio/reconcile-quota.js [--apply]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const APPLY = process.argv.includes('--apply');
const MEDIA_ROOT = process.env.STUDIO_MEDIA_ROOT ||
  (process.env.NODE_ENV === 'production'
    ? '/var/www/lcs-media/studio/stories'
    : path.resolve(__dirname, '..', '..', 'frontend', '.studio-stories'));

const prismaClientPath = path.resolve(__dirname, '..', '..', 'frontend', 'node_modules', '@prisma', 'client');
const { PrismaClient } = require(prismaClientPath);
const prisma = new PrismaClient();

function dirBytes(dir) {
  let total = 0;
  if (!fs.existsSync(dir)) return 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) total += dirBytes(p);
    else if (entry.isFile()) total += fs.statSync(p).size;
  }
  return total;
}

(async () => {
  const rows = await prisma.studioStory.findMany({
    where: { status: { not: 'deleted' } },
    select: { id: true, assetBytes: true },
  });
  let drifted = 0;
  for (const r of rows) {
    const real = dirBytes(path.join(MEDIA_ROOT, r.id));
    if (real === r.assetBytes) continue;
    drifted++;
    console.log('  ' + r.id + ': db=' + r.assetBytes + ' fs=' + real + ' (drift ' + (real - r.assetBytes) + ')');
    if (APPLY) {
      await prisma.studioStory.update({ where: { id: r.id }, data: { assetBytes: real } });
    }
  }
  console.log('[reconcile-quota] ' + rows.length + ' story(ies), ' + drifted + ' drifted' +
    (APPLY ? ' — repaired' : ' (DRY RUN — pass --apply)'));
  await prisma.$disconnect();
})().catch(e => { console.error('[reconcile-quota] ' + (e.stack || e)); process.exit(1); });
