import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { CANONICAL_HOST, canonicalUrl, localePath } from '@/lib/seo/url';
import { buildBreadcrumbSchema, BreadcrumbCrumb } from '@/lib/seo/breadcrumb-schema';
import BreadcrumbTrail from '@/components/breadcrumbs/BreadcrumbTrail';
import { LOCALE_NAMES, SupportedLocale } from '@/config/locales';
import { TOPIC_ENABLED_LOCALES } from '@/config/topic-locales';
import { getHreflangCode } from '@/lib/seo/hreflang';
import {
  MAKER_KEYS,
  getMakerContent,
  makerGeneratorUrl,
  MakerKey,
} from '@/lib/seo/maker-content';

/**
 * Per-maker landing page body — /<locale>/tools/<native-slug>/ for a worksheet
 * generator. SEO RESCUE Part 1. Crawlable teacher-framed body + a prominent
 * LAUNCH button to the full generator (operator-ruled: no in-page embed), with
 * WebApplication JSON-LD. Rendered by the shared /tools/[tool] route when a
 * slug resolves to a maker (not a manipulative). Reuses the proven tool-landing
 * visual pattern.
 */

function jsonLdFor(
  content: { name: string; metaDescription: string },
  locale: string,
  slug: string,
): string {
  const canonical = canonicalUrl(localePath(locale, 'tools', slug));
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: content.name,
    description: content.metaDescription,
    inLanguage: locale,
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web browser',
    browserRequirements: 'Requires JavaScript. Runs in any modern browser.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    isAccessibleForFree: true,
    image: `${CANONICAL_HOST}/og-homepage.png`,
    audience: { '@type': 'EducationalAudience', educationalRole: 'teacher' },
    creator: { '@type': 'Organization', name: 'LessonCraftStudio', url: CANONICAL_HOST },
    url: canonical,
  };
  return JSON.stringify(data);
}

export default async function MakerLanding({
  locale,
  makerKey,
  slug,
}: {
  locale: string;
  makerKey: MakerKey;
  slug: string;
}) {
  const content = await getMakerContent(locale, makerKey);
  if (!content) return null;

  const launchUrl = makerGeneratorUrl(makerKey, locale);
  const launchLabel = content.labels.launchCta.replace('{name}', content.name);

  // Sibling makers in this locale (link mesh) + other-language siblings.
  const relatedMakers: Array<{ key: MakerKey; name: string; href: string }> = [];
  for (const key of MAKER_KEYS) {
    if (key === makerKey) continue;
    const c = await getMakerContent(locale, key);
    if (c && c.slug) relatedMakers.push({ key, name: c.name, href: localePath(locale, 'tools', c.slug) });
  }

  const otherLangs: Array<{ locale: string; href: string }> = [];
  for (const loc of TOPIC_ENABLED_LOCALES) {
    if (loc === locale) continue;
    const c = await getMakerContent(loc, makerKey);
    if (c && c.slug) otherLangs.push({ locale: loc, href: `/${loc}/tools/${c.slug}` });
  }

  const tBreadcrumb = await getTranslations({ locale, namespace: 'topicPage.breadcrumb' });
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: tBreadcrumb('home'), path: localePath(locale) },
    { name: content.labels.makersBreadcrumb, path: localePath(locale, 'worksheet-makers') },
    { name: content.name, path: localePath(locale, 'tools', slug) },
  ] as BreadcrumbCrumb[]);

  return (
    <main className="bg-cream-50 pt-4 pb-4 px-4 md:pt-6 md:pb-6 md:px-8 lg:pt-8">
      <article className="mx-auto max-w-3xl">
        <BreadcrumbTrail
          locale={locale}
          trail={[
            { href: `/${locale}/worksheet-makers/`, label: content.labels.makersBreadcrumb },
            { label: content.name },
          ]}
        />

        <section
          className="relative overflow-hidden mt-3 md:mt-4 rounded-2xl md:rounded-3xl bg-[#DBE7DF] px-4 pt-6 pb-8 md:px-8 md:pt-8 md:pb-10 shadow-[0_2px_8px_rgba(20,30,28,0.08),_0_28px_64px_rgba(20,30,28,0.12)]"
          aria-label={content.name}
        >
          <header className="relative z-10 text-center">
            <h1 className="font-display font-semibold text-xl md:text-2xl text-teal-800 leading-tight mb-1">
              {content.name}
            </h1>
            <p className="text-sm md:text-base text-ink-600/80 max-w-2xl mx-auto leading-snug">{content.tagline}</p>
            <div className="mt-5">
              <a
                href={launchUrl}
                className="inline-flex items-center gap-2 rounded-full bg-[#F2784B] hover:bg-[#D9633A] text-white font-semibold text-base md:text-lg px-7 py-3 shadow-md transition-colors"
              >
                {launchLabel}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </header>
        </section>

        {/* Crawlable editorial body — the SEO surface for the maker. */}
        <section className="mx-auto max-w-2xl mt-8 space-y-8 px-1">
          <div>
            <h2 className="font-display text-xl md:text-2xl font-semibold text-ink-900 mb-3">{content.labels.about}</h2>
            {content.about.map((p, i) => (
              <p key={i} className={i === 0 ? 'text-base text-ink-700 leading-relaxed' : 'text-base text-ink-700 leading-relaxed mt-3'}>{p}</p>
            ))}
          </div>

          <div>
            <h2 className="font-display text-xl md:text-2xl font-semibold text-ink-900 mb-3">{content.labels.howToUse}</h2>
            <ul className="list-disc pl-5 space-y-1 text-base text-ink-700 leading-relaxed">
              {content.howToUse.map((it, i) => (<li key={i}>{it}</li>))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl md:text-2xl font-semibold text-ink-900 mb-3">{content.labels.classroomIdeas}</h2>
            <ul className="list-disc pl-5 space-y-1 text-base text-ink-700 leading-relaxed">
              {content.classroomIdeas.map((it, i) => (<li key={i}>{it}</li>))}
            </ul>
          </div>

          <div className="text-center pt-2">
            <a
              href={launchUrl}
              className="inline-flex items-center gap-2 rounded-full bg-[#F2784B] hover:bg-[#D9633A] text-white font-semibold text-base px-6 py-3 shadow-md transition-colors"
            >
              {launchLabel}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        {/* Link mesh */}
        <div className="mx-auto max-w-2xl px-1 mt-10 space-y-10">
          {relatedMakers.length > 0 && (
            <section aria-labelledby="maker-related-heading">
              <h2 id="maker-related-heading" className="font-display text-xl md:text-2xl font-semibold text-ink-900 mb-4">
                {content.labels.relatedMakers}
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedMakers.map((r) => (
                  <li key={r.key}>
                    <Link
                      href={r.href}
                      className="flex items-center gap-2 rounded-2xl bg-cream-50 hover:bg-teal-50 px-4 py-3 text-teal-800 font-medium shadow-sm transition-colors"
                    >
                      <span>{r.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {otherLangs.length > 0 && (
            <section aria-labelledby="maker-langs-heading">
              <h2 id="maker-langs-heading" className="font-display text-xl md:text-2xl font-semibold text-ink-900 mb-3">
                {content.labels.otherLanguages}
              </h2>
              <ul className="flex flex-wrap gap-2">
                {otherLangs.map(({ locale: loc, href }) => (
                  <li key={loc}>
                    <a
                      href={href}
                      hrefLang={getHreflangCode(loc)}
                      className="inline-flex items-center px-3 py-1.5 rounded-full bg-cream-50 hover:bg-teal-50 text-teal-800 text-sm transition-colors"
                    >
                      {LOCALE_NAMES[loc as SupportedLocale] ?? loc}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdFor({ name: content.name, metaDescription: content.metaDescription }, locale, slug) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </article>
    </main>
  );
}
