import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SUPPORTED_LOCALES, NSR_PENDING_LOCALES } from '@/config/locales';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import { CANONICAL_HOST, canonicalUrl, localePath } from '@/lib/seo/url';
import { ORGANIZATION_ID } from '@/lib/seo/organization-schema';

/**
 * /[locale]/about/ — About page.
 *
 * Phase 6 of the SEO remediation arc (E-E-A-T / trust signals). The
 * middleware already redirects bare `/about` → `/en/about` (see
 * `frontend/middleware.ts:183-186`); this route fulfills that contract
 * across all 11 locales.
 *
 * Two-bucket copy rule (strict):
 *   - Bucket A (Positioning / what-we-offer) — authored from existing
 *     brand voice in the `aboutPage` namespace. Safe to ship.
 *   - Bucket B (Who-we-are / credibility facts) — TODO(operator)
 *     placeholder. Never fabricate bios, credentials, dates, or social
 *     links. A sparse honest section beats a fluent-but-invented one.
 *
 * Organization JSON-LD references the single sitewide `@id`
 * (`<host>/#organization`) from `@/lib/seo/organization-schema`; this
 * page does NOT redefine Organization properties.
 *
 * Nordic+Finnic (sv/da/no/fi) ship NSR-flagged per CLAUDE.md §17.5.1.
 */

const OG_IMAGE_PATH = '/og-homepage.png';

// NSR-flagged About locales are sourced from the single SoT at
// `@/config/locales: NSR_PENDING_LOCALES`. That same array is read by
// `frontend/app/sitemap.ts` shard 3 — one edit there flips both robots
// and sitemap inclusion. Do NOT redefine the list locally or re-filter
// it; the SoT comment carries the lift-one-locale instructions.

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale || 'en';
  const t = await getTranslations({ locale, namespace: 'aboutPage' });

  const canonical = canonicalUrl(localePath(locale, 'about'));

  const hreflangAlternates: Record<string, string> = {};
  for (const lang of SUPPORTED_LOCALES) {
    hreflangAlternates[getHreflangCode(lang)] = canonicalUrl(localePath(lang, 'about'));
  }
  hreflangAlternates['x-default'] = canonicalUrl(localePath('en', 'about'));

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical,
      languages: hreflangAlternates,
    },
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      type: 'website',
      url: canonical,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
      alternateLocale: SUPPORTED_LOCALES.filter(l => l !== locale).map(l => ogLocaleMap[l] || l),
      images: [
        {
          url: `${CANONICAL_HOST}${OG_IMAGE_PATH}`,
          width: 1200,
          height: 630,
          type: 'image/png',
          alt: 'LessonCraftStudio — K-3 worksheets in 11 languages',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta.title'),
      description: t('meta.description'),
      images: [`${CANONICAL_HOST}${OG_IMAGE_PATH}`],
    },
    // Per CLAUDE.md §17.5.1: NSR-flagged Nordic+Finnic About locales
    // ship as `noindex` until native-speaker review clears. The other 7
    // are indexable. Hreflang cluster still covers all 11 so the
    // unreviewed variants stay reachable + linkable, just not request-
    // indexed by Google. SoT: `@/config/locales: NSR_PENDING_LOCALES`.
    robots: (NSR_PENDING_LOCALES as readonly string[]).includes(locale)
      ? { index: false, follow: true }
      : { index: true, follow: true },
  };
}

/**
 * Lightweight Organization reference for the About page. Reuses the
 * sitewide entity by @id — properties live in
 * `@/lib/seo/organization-schema` and are emitted by the homepage.
 */
function aboutOrganizationReference() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    mainEntity: { '@id': ORGANIZATION_ID },
  };
}

export default async function AboutPage({ params }: { params: { locale: string } }) {
  const locale = params.locale || 'en';
  const t = await getTranslations({ locale, namespace: 'aboutPage' });

  const schema = aboutOrganizationReference();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <main className="container mx-auto px-4 max-w-3xl py-16 md:py-24">
        <h1 className="font-display font-semibold text-3xl md:text-5xl text-ink-900 leading-tight tracking-tight mb-6">
          {t('pageTitle')}
        </h1>
        <p className="text-lg md:text-xl text-ink-600 leading-relaxed mb-12">
          {t('intro')}
        </p>

        <section className="mb-10">
          <h2 className="font-display font-semibold text-2xl md:text-3xl text-ink-900 mb-3">
            {t('whatWeOfferHeading')}
          </h2>
          <p className="text-base md:text-lg text-ink-700 leading-relaxed">
            {t('whatWeOfferBody')}
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-display font-semibold text-2xl md:text-3xl text-ink-900 mb-3">
            {t('audienceHeading')}
          </h2>
          <p className="text-base md:text-lg text-ink-700 leading-relaxed">
            {t('audienceBody')}
          </p>
        </section>

        {/* TODO(operator): replace teamBody placeholder with real
            maintainer info. Wire real `sameAs` social-profile URLs into
            `frontend/lib/seo/organization-schema.ts` when available. */}
        <section className="mb-4">
          <h2 className="font-display font-semibold text-2xl md:text-3xl text-ink-900 mb-3">
            {t('teamHeading')}
          </h2>
          <p className="text-base md:text-lg text-ink-500 italic leading-relaxed">
            {t('teamBody')}
          </p>
        </section>
      </main>
    </>
  );
}
