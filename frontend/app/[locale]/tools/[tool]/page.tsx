import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TOPIC_ENABLED_LOCALES, TopicEnabledLocale } from '@/config/topic-locales';
import { CANONICAL_HOST, canonicalUrl, localePath } from '@/lib/seo/url';
import BreadcrumbTrail from '@/components/breadcrumbs/BreadcrumbTrail';
import { ActivityIframe } from '@/components/activities/ActivityIframe';
import { LOCALE_NAMES, SupportedLocale } from '@/config/locales';
import {
  TOOL_KEYS,
  TOOL_MINI_URL,
  TOOL_ACTIVITY_PREFIX,
  getToolContent,
  resolveToolSlug,
  listToolSitemapEntries,
  hreflangAlternatesForTool,
  ToolKey,
} from '@/lib/seo/tool-content';
import { listAllActivities } from '@/lib/activities';

/**
 * Per-tool landing page — /<locale>/tools/<native-slug>/
 *
 * Dedicated indexable surface for each free-play manipulative (ten-frame,
 * number-line, ruler). The tool itself is a JS-only mini-tool shell with no
 * SEO; this SSR page describes it (crawlable body + LearningResource JSON-LD
 * + link mesh) and embeds the live tool via ActivityIframe. Mirrors the
 * activity-detail page shipped in the activity-SEO arc.
 */
export const revalidate = 3600;

const BASE_URL = CANONICAL_HOST;

// Bump in lockstep with the activity page's wrapper version when a mini-tool
// wrapper changes (§A.13.42). Tools read only ?lang / ?embed / ?v.
const TOOL_WRAPPER_VERSION = '7.19';

interface PageParams {
  locale: string;
  tool: string;
}

function isTopicLocale(l: string): l is TopicEnabledLocale {
  return (TOPIC_ENABLED_LOCALES as readonly string[]).includes(l);
}

export async function generateStaticParams(): Promise<PageParams[]> {
  try {
    const entries = await listToolSitemapEntries();
    return entries.map(({ locale, slug }) => ({ locale, tool: slug }));
  } catch (err) {
    console.warn('[tools/[tool]] generateStaticParams failed:', (err as Error).message);
    return [];
  }
}

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  if (!isTopicLocale(params.locale)) return {};
  const toolKey = await resolveToolSlug(params.tool, params.locale);
  if (!toolKey) return {};
  const content = await getToolContent(params.locale, toolKey);
  if (!content) return {};
  const canonical = canonicalUrl(localePath(params.locale, 'tools', params.tool));
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: {
      canonical,
      languages: await hreflangAlternatesForTool(toolKey, BASE_URL),
    },
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: canonical,
      siteName: 'LessonCraftStudio',
      locale: params.locale,
      type: 'article',
      images: [
        {
          url: `${CANONICAL_HOST}/og-homepage.png`,
          width: 1200,
          height: 630,
          type: 'image/png',
          alt: 'LessonCraftStudio — K-3 worksheets in 11 languages',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.metaTitle,
      description: content.metaDescription,
      images: [`${CANONICAL_HOST}/og-homepage.png`],
    },
    robots: { index: true, follow: true },
  };
}

function jsonLdFor(content: { name: string; metaDescription: string; toolKey: ToolKey }, locale: string, slug: string): string {
  const canonical = canonicalUrl(localePath(locale, 'tools', slug));
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: content.name,
    description: content.metaDescription,
    inLanguage: locale,
    learningResourceType: 'Manipulative',
    educationalUse: 'interactive manipulative',
    typicalAgeRange: '5-9',
    isAccessibleForFree: true,
    image: `${CANONICAL_HOST}/og-homepage.png`,
    audience: { '@type': 'EducationalAudience', educationalRole: 'student' },
    creator: { '@type': 'Organization', name: 'LessonCraftStudio', url: CANONICAL_HOST },
    url: canonical,
  };
  return JSON.stringify(data);
}

/** Activities that use this tool, in the current locale (self-skips when none). */
async function relatedActivitiesFor(toolKey: ToolKey, locale: string) {
  const all = await listAllActivities();
  const prefix = TOOL_ACTIVITY_PREFIX[toolKey];
  return all
    .filter((a) => typeof a.tool === 'string' && a.tool.startsWith(prefix) && a.slug[locale] && a.page_title[locale])
    .map((a) => ({ id: a.id, title: a.page_title[locale], href: localePath(locale, 'activities', a.slug[locale]), code: a.alignment.code }));
}

export default async function ToolPage({ params }: { params: PageParams }) {
  if (!isTopicLocale(params.locale)) notFound();
  const toolKey = await resolveToolSlug(params.tool, params.locale);
  if (!toolKey) notFound();
  const content = await getToolContent(params.locale, toolKey);
  if (!content) notFound();

  const iframeSrc =
    `${TOOL_MINI_URL[toolKey]}?v=${TOOL_WRAPPER_VERSION}` +
    `&lang=${encodeURIComponent(params.locale)}&embed=1`;

  const related = await relatedActivitiesFor(toolKey, params.locale);

  // Other locales where this tool has a slug (visible hreflang siblings).
  const otherLangs: Array<{ locale: string; href: string }> = [];
  for (const loc of TOPIC_ENABLED_LOCALES) {
    if (loc === params.locale) continue;
    const c = await getToolContent(loc, toolKey);
    if (c && c.slug) otherLangs.push({ locale: loc, href: `/${loc}/tools/${c.slug}` });
  }

  return (
    <main className="bg-cream-50 pt-4 pb-4 px-4 md:pt-6 md:pb-6 md:px-8 lg:pt-8">
      <article className="mx-auto max-w-3xl">
        <BreadcrumbTrail
          locale={params.locale}
          trail={[
            { href: `/${params.locale}/tools/`, label: content.labels.toolsBreadcrumb },
            { label: content.name },
          ]}
        />

        <section
          className="relative overflow-hidden mt-3 md:mt-4 rounded-2xl md:rounded-3xl bg-[#DBE7DF] px-4 pt-5 pb-8 md:px-8 md:pt-7 md:pb-10 shadow-[0_2px_8px_rgba(20,30,28,0.08),_0_28px_64px_rgba(20,30,28,0.12)]"
          aria-label={content.name}
        >
          <header className="relative z-10 mb-4 md:mb-5 text-center">
            <h1 className="font-display font-semibold text-base md:text-lg text-teal-800 leading-tight mb-0.5">
              {content.name}
            </h1>
            <p className="text-xs text-ink-600/70 max-w-2xl mx-auto leading-snug">{content.tagline}</p>
          </header>
          <div className="relative z-10">
            <ActivityIframe src={iframeSrc} title={content.name} />
          </div>
          <div className="relative z-10 mt-3 text-center">
            <a
              href={`${TOOL_MINI_URL[toolKey]}?lang=${encodeURIComponent(params.locale)}`}
              className="inline-flex items-center gap-1 text-teal-700 hover:text-teal-800 text-sm font-medium underline decoration-dotted underline-offset-2"
            >
              {content.labels.openFullScreen}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        {/* Crawlable editorial body — the SEO surface for the tool. */}
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
        </section>

        {/* Link mesh */}
        <div className="mx-auto max-w-2xl px-1 mt-10 space-y-10">
          {related.length > 0 && (
            <section aria-labelledby="tool-related-heading">
              <h2 id="tool-related-heading" className="font-display text-xl md:text-2xl font-semibold text-ink-900 mb-4">
                {content.labels.relatedActivities}
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {related.map((r) => (
                  <li key={r.id}>
                    <Link
                      href={r.href}
                      className="flex items-center gap-2 rounded-2xl bg-cream-50 hover:bg-teal-50 px-4 py-3 text-teal-800 font-medium shadow-sm transition-colors"
                    >
                      <span className="font-mono text-xs text-teal-500">{r.code}</span>
                      <span>{r.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {otherLangs.length > 0 && (
            <section aria-labelledby="tool-langs-heading">
              <h2 id="tool-langs-heading" className="font-display text-xl md:text-2xl font-semibold text-ink-900 mb-3">
                {content.labels.otherLanguages}
              </h2>
              <ul className="flex flex-wrap gap-2">
                {otherLangs.map(({ locale, href }) => (
                  <li key={locale}>
                    <a
                      href={href}
                      hrefLang={locale}
                      className="inline-flex items-center px-3 py-1.5 rounded-full bg-cream-50 hover:bg-teal-50 text-teal-800 text-sm transition-colors"
                    >
                      {LOCALE_NAMES[locale as SupportedLocale] ?? locale}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdFor({ name: content.name, metaDescription: content.metaDescription, toolKey }, params.locale, params.tool) }}
        />
      </article>
    </main>
  );
}
