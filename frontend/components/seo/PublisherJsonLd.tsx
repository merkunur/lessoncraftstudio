import {
  buildOrganizationSchema,
  buildWebSiteSchema,
  ORGANIZATION_DESCRIPTION,
} from '@/lib/seo/organization-schema';

/**
 * Emits the canonical Organization + WebSite JSON-LD nodes on high-crawl SSR
 * surfaces (topic hubs + activity pages), NOT only the rarely-crawled homepage.
 *
 * Why: Googlebot fetches the homepage seldom, so an @id-only reference on the
 * pages it crawls daily left the site's CURRENT identity un-reaffirmed while the
 * stale seller-era index lingered (see docs/SEO/off-site-identity-audit.md +
 * the 2026-07-21 identity plan). Emitting the full node here lets Google re-read
 * "who this is now" on every crawl. @id-keyed → Google merges it with the
 * homepage node; ORGANIZATION_DESCRIPTION keeps the merged description consistent.
 *
 * Pure additive structured data — no title/meta/canonical/slug change
 * (§21.5a churn-freeze safe).
 */
export function PublisherJsonLd({ locale }: { locale: string }) {
  const org = buildOrganizationSchema(ORGANIZATION_DESCRIPTION);
  const site = buildWebSiteSchema(locale, ORGANIZATION_DESCRIPTION);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(site) }}
      />
    </>
  );
}
