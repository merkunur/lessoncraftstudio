/**
 * Hosted interactive worksheets — storage, quota, and identity helpers.
 * (2026-07 subscription launch flagship: subscribers save the generator's
 * standalone interactive HTML and get a durable /play/w/<linkId> URL.)
 *
 * HTML bytes live on the filesystem (isolated storage §A.1), metadata in the
 * HostedWorksheet Prisma model. Serving is noindex and never sitemapped.
 */
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { prisma } from '@/lib/prisma';
import { ogLocaleMap } from '@/lib/schema-generator';
import { applyHostedPersonalization } from './personalize';

/** www form per §A.10 — the apex 301 breaks the deck's postMessage URL match. */
export const CANONICAL_HOST = 'https://www.lessoncraftstudio.com';

export function hostedUrls(linkId: string) {
  return {
    url: `${CANONICAL_HOST}/play/w/${linkId}`,
    qrUrl: `${CANONICAL_HOST}/play/w/${linkId}/qr.png`,
  };
}

export const HOSTED_LIMITS = {
  MAX_WORKSHEETS_PER_TEACHER: 300,
  MAX_TOTAL_BYTES_PER_TEACHER: 1024 * 1024 * 1024, // 1 GB
  MAX_SINGLE_BYTES: 15 * 1024 * 1024, // 15 MB (self-contained inline HTML runs ~1-8 MB)
  DELETED_RETENTION_DAYS: 30,
} as const;

/** The 29 interactive apps (§14.10) whose standalone HTML may be hosted. */
export const HOSTABLE_APP_IDS = new Set([
  'addition', 'alphabet-train', 'big-small', 'bingo', 'chart-count',
  'code-addition', 'crossword', 'cryptogram', 'find-and-count', 'find-objects',
  'grid-match', 'matching', 'math-puzzle', 'math-worksheet', 'missing-pieces',
  'more-less', 'odd-one-out', 'pattern-train', 'pattern-worksheet',
  'picture-path', 'picture-sort', 'prepositions', 'shadow-match', 'subtraction',
  'sudoku', 'treasure-hunt', 'word-guess', 'word-scramble', 'wordsearch',
]);

export const HOSTED_LOCALES = new Set([
  'en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi',
]);

/** Storage root — isolated storage on Hetzner; env-overridable for local dev. */
export function hostedWorksheetsDir(): string {
  return process.env.HOSTED_WORKSHEETS_DIR || '/var/www/lcs-media/hosted-worksheets';
}

export function hostedWorksheetPath(worksheetId: string): string {
  // worksheetId is a Prisma cuid (alphanumeric) — safe as a filename; guard anyway.
  if (!/^[a-z0-9]+$/i.test(worksheetId)) throw new Error('invalid worksheet id');
  return path.join(hostedWorksheetsDir(), `${worksheetId}.html`);
}

/** 12-char URL-safe capability id (same alphabet/length class as StudioShareLink). */
export function generateHostedLinkId(): string {
  const alphabet = 'abcdefghijkmnpqrstuvwxyz23456789'; // no 0/O/1/l lookalikes
  const bytes = crypto.randomBytes(12);
  let out = '';
  for (let i = 0; i < 12; i++) out += alphabet[bytes[i] % alphabet.length];
  return out;
}

/** Atomic write (tmp + rename) per the repo's mutation convention. */
export function writeHostedHtml(worksheetId: string, html: string): void {
  const dir = hostedWorksheetsDir();
  fs.mkdirSync(dir, { recursive: true });
  const target = hostedWorksheetPath(worksheetId);
  const tmp = `${target}.tmp`;
  fs.writeFileSync(tmp, html, 'utf8');
  fs.renameSync(tmp, target);
}

export function readHostedHtml(worksheetId: string): string | null {
  try {
    return fs.readFileSync(hostedWorksheetPath(worksheetId), 'utf8');
  } catch {
    return null;
  }
}

export function removeHostedHtml(worksheetId: string): void {
  try {
    fs.unlinkSync(hostedWorksheetPath(worksheetId));
  } catch {
    /* already gone */
  }
}

export interface HostedQuotaUsage {
  count: number;
  totalBytes: number;
  maxCount: number;
  maxTotalBytes: number;
}

export async function getHostedQuotaUsage(teacherId: string): Promise<HostedQuotaUsage> {
  const agg = await prisma.hostedWorksheet.aggregate({
    where: { teacherId, status: 'live' },
    _count: { _all: true },
    _sum: { htmlBytes: true },
  });
  return {
    count: agg._count._all,
    totalBytes: agg._sum.htmlBytes ?? 0,
    maxCount: HOSTED_LIMITS.MAX_WORKSHEETS_PER_TEACHER,
    maxTotalBytes: HOSTED_LIMITS.MAX_TOTAL_BYTES_PER_TEACHER,
  };
}

/** Returns an error string when the addition would exceed quota, else null. */
export async function checkHostedQuota(
  teacherId: string,
  addBytes: number,
  addCount: number
): Promise<string | null> {
  if (addBytes > HOSTED_LIMITS.MAX_SINGLE_BYTES) return 'worksheet_too_large';
  const usage = await getHostedQuotaUsage(teacherId);
  if (usage.count + addCount > usage.maxCount) return 'worksheet_count_quota_exceeded';
  if (usage.totalBytes + addBytes > usage.maxTotalBytes) return 'storage_quota_exceeded';
  return null;
}

/** Light sanity check that the payload is a generator's standalone document. */
export function looksLikeStandaloneWorksheet(html: string): boolean {
  const head = html.slice(0, 2000).toLowerCase();
  return head.includes('<!doctype html') && head.includes('<html');
}

/**
 * Strip catalog-only chrome from a teacher-saved worksheet, and fill in the
 * placeholder tokens that only publish-cli would otherwise resolve.
 *
 * The transforms themselves are pure and live in ./personalize (no Prisma
 * import), so a plain tsc+node gate can drive them against real deck bytes.
 * This module owns the one lookup that needs a SoT: locale -> og:locale via
 * `ogLocaleMap` in @/lib/schema-generator — NOT a fourth hand-copy of that
 * table (substitute.js already warns it duplicates it twice over).
 */
export { findPlaceholderResidue, stripCatalogChrome } from './personalize';

export function personalizeHostedWorksheet(
  html: string,
  { playUrl, title, locale }: { playUrl: string; title: string; locale: string }
): string {
  return applyHostedPersonalization(html, {
    playUrl,
    title,
    ogLocale: ogLocaleMap[locale] || locale,
  });
}
