#!/usr/bin/env node
/**
 * Retention sweep for hosted interactive worksheets (2026-07 subscription).
 * Soft-deleted rows (status='deleted') older than RETENTION_DAYS are
 * hard-deleted: the FS file removed + the DB row deleted. Idempotent; safe to
 * run daily via cron. --dry-run reports without deleting.
 *
 * Run on Hetzner:
 *   cd /opt/lessoncraftstudio/frontend && node ../scripts/ops/cleanup-hosted-worksheets.js [--dry-run]
 */
'use strict';
const path = require('path');
const fs = require('fs');
const { PrismaClient } = require(path.resolve(process.cwd(), 'node_modules/@prisma/client'));
const prisma = new PrismaClient();

const RETENTION_DAYS = 30;
const DIR = process.env.HOSTED_WORKSHEETS_DIR || '/var/www/lcs-media/hosted-worksheets';
const DRY = process.argv.includes('--dry-run');

async function main() {
  const cutoff = new Date(Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000);
  const rows = await prisma.hostedWorksheet.findMany({
    where: { status: 'deleted', deletedAt: { lt: cutoff } },
    select: { id: true },
  });
  console.log(`hosted-worksheets retention sweep: ${rows.length} row(s) older than ${RETENTION_DAYS}d${DRY ? ' (dry-run)' : ''}`);
  let files = 0, purged = 0;
  for (const r of rows) {
    const f = path.join(DIR, r.id + '.html');
    if (fs.existsSync(f)) {
      if (!DRY) { try { fs.unlinkSync(f); } catch (e) {} }
      files++;
    }
    if (!DRY) {
      await prisma.hostedWorksheet.delete({ where: { id: r.id } }).catch(() => {});
      purged++;
    }
  }
  console.log(`  files removed: ${files}  rows purged: ${DRY ? 0 : purged}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
