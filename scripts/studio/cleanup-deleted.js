#!/usr/bin/env node
/* =====================================================================
   cleanup-deleted.js — Story Studio tenancy maintenance.

   Removes the media directories of stories soft-deleted more than
   STUDIO_DELETED_RETENTION_DAYS (30) ago, then hard-deletes their rows
   (share links + revisions cascade). Idempotent; dry-run by default.

   USAGE (Hetzner, env loaded — deploy-env DB creds):
     node scripts/studio/cleanup-deleted.js            # preview
     node scripts/studio/cleanup-deleted.js --apply    # do it
   Media root override: STUDIO_MEDIA_ROOT (default
   /var/www/lcs-media/studio/stories in production).
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const RETENTION_DAYS = 30;
const APPLY = process.argv.includes('--apply');
const MEDIA_ROOT = process.env.STUDIO_MEDIA_ROOT ||
  (process.env.NODE_ENV === 'production'
    ? '/var/www/lcs-media/studio/stories'
    : path.resolve(__dirname, '..', '..', 'frontend', '.studio-stories'));

const prismaClientPath = path.resolve(__dirname, '..', '..', 'frontend', 'node_modules', '@prisma', 'client');
const { PrismaClient } = require(prismaClientPath);
const prisma = new PrismaClient();

(async () => {
  const cutoff = new Date(Date.now() - RETENTION_DAYS * 24 * 3600 * 1000);
  const rows = await prisma.studioStory.findMany({
    where: { status: 'deleted', deletedAt: { lt: cutoff } },
    select: { id: true, title: true, deletedAt: true },
  });
  console.log('[cleanup-deleted] ' + rows.length + ' story(ies) past the ' + RETENTION_DAYS + '-day retention' +
    (APPLY ? '' : ' (DRY RUN — pass --apply)'));
  for (const r of rows) {
    const dir = path.join(MEDIA_ROOT, r.id);
    console.log('  ' + r.id + ' "' + r.title + '" deleted ' + r.deletedAt.toISOString().slice(0, 10) +
      (fs.existsSync(dir) ? ' [media dir present]' : ' [no media dir]'));
    if (!APPLY) continue;
    try {
      fs.rmSync(dir, { recursive: true, force: true });
    } catch (e) {
      console.log('    WARN media removal failed: ' + e.message + ' — row kept for the next run');
      continue;
    }
    await prisma.studioStory.delete({ where: { id: r.id } }); // links + revisions cascade
    console.log('    removed');
  }
  await prisma.$disconnect();
})().catch(e => { console.error('[cleanup-deleted] ' + (e.stack || e)); process.exit(1); });
