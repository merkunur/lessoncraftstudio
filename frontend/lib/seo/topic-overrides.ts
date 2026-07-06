/**
 * topic-overrides.ts — demand-keyed SEO overrides for topic pages (2026-07-06).
 *
 * Serves the per-language long-tail program: research-grounded final-form
 * titles / H1s / meta descriptions / body prose for single-axis topic pages
 * AND 2-axis intersections, authored per locale from the demand maps at
 * docs/SEO/demand-map-<locale>.md.
 *
 * Content lives at frontend/content/topic-seo-overrides/<locale>.json:
 *   {
 *     "singleAxis":   { "<axisKey>":  { title?, h1?, metaDescription?, prose? } },
 *     "intersection": { "<k1__k2>":   { title?, h1?, metaDescription?, prose? } }
 *   }
 * Intersection keys use §16.7.2 alphabetic ordering: [k1, k2].sort().join('__').
 * `prose` is plain text; paragraphs separated by \n\n (TopicProseContainer
 * renders them exactly like topicProse messages).
 *
 * DESIGN CONSTRAINTS (do not violate):
 * - fs-loaded, NEVER statically imported (webpack graph blowup precedent,
 *   see landing-content.ts) and NEVER imported from a 'use client' file.
 * - Content JSON, NOT messages/<locale>.json: layout.tsx serializes the whole
 *   locale message set into every page's RSC flight payload — authored prose
 *   at scale in messages would bloat every page in the locale (§20.10).
 * - Fails closed: absent/malformed file → null → pages render exactly as
 *   before (template/messages chain).
 * - Precedence at the consumer: seasonal-hub override > this override >
 *   messages (topicMeta/topicProse) > ICU template.
 * - intersectionOverrideAuthored() flips indexing (intersection-authored.ts):
 *   TRUE only when the entry carries prose or metaDescription — a title/h1-only
 *   entry must never promote a thin page into the index/sitemap.
 */
import fs from 'fs';
import path from 'path';

export interface TopicSeoOverride {
  title?: string;
  h1?: string;
  metaDescription?: string;
  prose?: string;
}

interface OverrideFile {
  singleAxis?: Record<string, TopicSeoOverride>;
  intersection?: Record<string, TopicSeoOverride>;
}

const _cache: Record<string, OverrideFile | null> = {};

function loadLocale(locale: string): OverrideFile | null {
  if (locale in _cache) return _cache[locale];
  let data: OverrideFile | null = null;
  // NOTE: cwd is NOT the checkout under the next-start release model (pm2 runs
  // from frontend/releases/current, which has no content/); the absolute
  // checkout path is the guaranteed fallback — same convention as
  // seasonal-hub.ts / landing-content.ts.
  for (const dir of [
    path.join(process.cwd(), 'content', 'topic-seo-overrides'),
    path.join(process.cwd(), 'frontend', 'content', 'topic-seo-overrides'),
    '/opt/lessoncraftstudio/frontend/content/topic-seo-overrides',
  ]) {
    try {
      const p = path.join(dir, `${locale}.json`);
      if (fs.existsSync(p)) {
        data = JSON.parse(fs.readFileSync(p, 'utf8'));
        break;
      }
    } catch {
      /* tolerate malformed file — pages render without overrides */
    }
  }
  _cache[locale] = data;
  return data;
}

/** Demand-keyed override for a single-axis topic page, or null. */
export function getSingleAxisOverride(locale: string, axisKey: string): TopicSeoOverride | null {
  return loadLocale(locale)?.singleAxis?.[axisKey] ?? null;
}

/** Demand-keyed override for a 2-axis intersection page (keys sorted internally), or null. */
export function getIntersectionOverride(
  locale: string,
  axisKey1: string,
  axisKey2: string,
): TopicSeoOverride | null {
  const key = [axisKey1, axisKey2].sort().join('__');
  return loadLocale(locale)?.intersection?.[key] ?? null;
}

/**
 * Whether an override entry qualifies the intersection as AUTHORED for
 * indexing/sitemap purposes (intersection-authored.ts consults this).
 * Mirrors topicProse/topicMeta semantics: substantive content only — a
 * title/h1-only entry does NOT flip a page indexable.
 */
export function intersectionOverrideAuthored(
  locale: string,
  axisKey1: string,
  axisKey2: string,
): boolean {
  const ov = getIntersectionOverride(locale, axisKey1, axisKey2);
  return !!(ov && ((ov.prose && ov.prose.trim().length > 0) || (ov.metaDescription && ov.metaDescription.trim().length > 0)));
}
