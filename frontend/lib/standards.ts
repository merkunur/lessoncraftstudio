/**
 * Curriculum-standards data layer.
 *
 * Sources Common Core State Standards codes from the activity manifests
 * (one activity-manifest entry per (engine × code × theme) combination
 * per CLAUDE.md §20.2). Exposes helpers consumed by the
 * /[locale]/standards/[code]/page.tsx landing route.
 *
 * Per external SEO audit (2026-05-27, third audit): teachers search
 * directly for CC codes (e.g., "K.CC.B.4 worksheets"). The landing page
 * IS the indexable surface for that query. Per CLAUDE.md §20.3 the
 * constraint is "CC code NEVER in slug" for the activity URL — codes
 * still surface in JSON-LD educationalAlignment + teacher chip on the
 * activity page, and now (this commission) in their own dedicated URL
 * path `/[locale]/standards/<code>/`.
 *
 * Code anatomy:
 *   - K.CC.B.4    = grade K, domain CC (Counting & Cardinality), cluster B, item 4
 *   - 2.OA.C.3    = grade 2, domain OA (Operations & Algebraic Thinking), C, 3
 *   - RF.K.2.B    = Reading Foundational, grade K, item 2, sub B
 *
 * The "domain" string is the first 2 dot-segments (K.CC / 2.OA / RF.K)
 * — used for sibling-code grouping ("Related standards in this domain").
 */

import { listAllActivities, ActivityRow } from './activities';

export interface StandardMetadata {
  /** The full CC code, e.g. "K.CC.B.4" — case-sensitive identifier. */
  code: string;
  /** Curriculum framework — "CCSS" for all currently-tagged codes. */
  framework: string;
  /** Grade as authored — "K"/"1"/"2"/"3". */
  grade: string;
  /** Strand display name as authored in the manifest. */
  strand: string;
  /** Domain prefix used for sibling grouping — e.g. "K.CC", "2.OA", "RF.K". */
  domain: string;
  /** Number of distinct activities aligned to this code across all locales. */
  activityCount: number;
}

/**
 * Extract the domain prefix from a CC code.
 * "K.CC.B.4" → "K.CC"  /  "2.OA.C.3" → "2.OA"  /  "RF.K.2.B" → "RF.K"
 */
export function domainForCode(code: string): string {
  const parts = code.split('.');
  return parts.length >= 2 ? parts.slice(0, 2).join('.') : code;
}

/**
 * URL-safe slug form of a CC code. Codes are case-sensitive identifiers
 * with dots and alphanumerics only — RFC 3986 unreserved. We keep the
 * authored case verbatim ("K.CC.B.4" stays uppercase; "RF.K.2.B" stays).
 * Future-proofing: if any locale ever introduces non-ASCII codes (e.g.,
 * BNCC for pt-BR), this helper would localize. None currently.
 */
export function codeUrlSegment(code: string): string {
  return code;
}

let _codesCache: StandardMetadata[] | null = null;

/**
 * List every distinct CC code with metadata + activity count. Cached.
 */
export async function listAllCodes(): Promise<StandardMetadata[]> {
  if (_codesCache) return _codesCache;
  const activities = await listAllActivities();
  const byCode = new Map<string, StandardMetadata>();
  for (const a of activities) {
    const existing = byCode.get(a.alignment.code);
    if (existing) {
      existing.activityCount++;
    } else {
      byCode.set(a.alignment.code, {
        code: a.alignment.code,
        framework: a.alignment.framework,
        grade: a.alignment.grade,
        strand: a.alignment.strand,
        domain: domainForCode(a.alignment.code),
        activityCount: 1,
      });
    }
  }
  _codesCache = Array.from(byCode.values()).sort((a, b) =>
    a.code.localeCompare(b.code),
  );
  return _codesCache;
}

/**
 * Look up metadata for a specific code — null if not registered.
 */
export async function getCodeMetadata(
  code: string,
): Promise<StandardMetadata | null> {
  const all = await listAllCodes();
  return all.find((m) => m.code === code) ?? null;
}

/**
 * Activities aligned to a given code, in manifest order.
 */
export async function listActivitiesByCode(
  code: string,
): Promise<ActivityRow[]> {
  const activities = await listAllActivities();
  return activities.filter((a) => a.alignment.code === code);
}

/**
 * Sibling codes in the same domain (e.g. all K.CC.* codes when given K.CC.B.4).
 * Excludes the input code itself. Sorted alphabetically.
 */
export async function relatedCodesInDomain(
  code: string,
): Promise<StandardMetadata[]> {
  const all = await listAllCodes();
  const domain = domainForCode(code);
  return all.filter((m) => m.domain === domain && m.code !== code);
}

/**
 * All distinct domains across registered codes — used by the future
 * /[locale]/standards/ index page to group codes for browse.
 */
export async function listAllDomains(): Promise<string[]> {
  const all = await listAllCodes();
  const set = new Set(all.map((m) => m.domain));
  return Array.from(set).sort();
}

/**
 * Per-locale hreflang alternates map for a standards page. Since the URL
 * segment (`<code>`) is the same across all locales (CCSS codes are
 * universal identifiers, NOT translated), the hreflang map is fully
 * symmetric across the 11 locales.
 */
export function hreflangAlternatesForCode(
  code: string,
  locales: readonly string[],
  baseUrl: string,
): Record<string, string> {
  // Mirror activities.ts:hreflangAlternatesForRow — `pt` → `pt-BR` per
  // CLAUDE.md §6 hreflang convention.
  const HREFLANG_MAP: Record<string, string> = {
    en: 'en',
    de: 'de',
    fr: 'fr',
    es: 'es',
    pt: 'pt-BR',
    it: 'it',
    nl: 'nl',
    sv: 'sv',
    da: 'da',
    no: 'no',
    fi: 'fi',
  };
  const out: Record<string, string> = {};
  for (const loc of locales) {
    out[HREFLANG_MAP[loc] || loc] =
      `${baseUrl}/${loc}/standards/${codeUrlSegment(code)}`;
  }
  out['x-default'] =
    out['en'] || out['en-US'] || Object.values(out)[0] || baseUrl;
  return out;
}

/**
 * Sitemap entries — every (locale × code) pair. Consumed by sitemap.ts
 * shard 3.
 */
export async function listStandardsSitemapEntries(
  locales: readonly string[],
): Promise<Array<{ locale: string; code: string }>> {
  const all = await listAllCodes();
  const out: Array<{ locale: string; code: string }> = [];
  for (const m of all) {
    for (const loc of locales) out.push({ locale: loc, code: m.code });
  }
  return out;
}
