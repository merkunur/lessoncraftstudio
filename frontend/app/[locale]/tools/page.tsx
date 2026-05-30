import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MANIPULATIVES,
  LANDING_STRINGS,
  landingHreflangAlternates,
} from "@/lib/manipulatives";
import {
  TOPIC_ENABLED_LOCALES,
  TopicEnabledLocale,
} from "@/config/topic-locales";
import BreadcrumbTrail from "@/components/breadcrumbs/BreadcrumbTrail";
import { CANONICAL_HOST, canonicalUrl, localePath } from "@/lib/seo/url";
import { getToolContent, ToolKey } from "@/lib/seo/tool-content";

/**
 * Manipulatives landing page — /<locale>/tools/
 *
 * Lists the free-play interactive tools (ten-frame, number-line, ruler).
 * Each card links directly to the raw mini-tool URL served by nginx at
 * /mini-tools/<file>.html. The mini-tool itself has its own internal
 * chrome (settings, sound, fullscreen, reset) — no platform header is
 * rendered there per the §3.3 nginx-direct pattern.
 *
 * Locale-prefixed but the route segment `tools` is constant English per
 * the same convention as `decks` and `activities` (CLAUDE.md §17.8.1).
 *
 * ISR revalidate=3600 since the metadata file is static; long cache is fine.
 */
export const revalidate = 3600;

const BASE_URL = CANONICAL_HOST;

interface PageParams {
  locale: string;
}

function isTopicLocale(l: string): l is TopicEnabledLocale {
  return (TOPIC_ENABLED_LOCALES as readonly string[]).includes(l);
}

export function generateStaticParams(): PageParams[] {
  return TOPIC_ENABLED_LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({
  params,
}: {
  params: PageParams;
}): Metadata {
  if (!isTopicLocale(params.locale)) return {};
  const strings = LANDING_STRINGS[params.locale] ?? LANDING_STRINGS.en;
  const canonical = canonicalUrl(localePath(params.locale, "tools"));
  return {
    title: strings.metaTitle,
    description: strings.metaDescription,
    alternates: {
      canonical,
      languages: landingHreflangAlternates(BASE_URL),
    },
    openGraph: {
      title: strings.metaTitle,
      description: strings.metaDescription,
      url: canonical,
      siteName: "LessonCraftStudio",
      locale: params.locale,
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}

export default async function ManipulativesLandingPage({
  params,
}: {
  params: PageParams;
}) {
  if (!isTopicLocale(params.locale)) notFound();
  const locale = params.locale;
  const strings = LANDING_STRINGS[locale] ?? LANDING_STRINGS.en;

  return (
    <main className="bg-cream-100 min-h-[calc(100vh-200px)] py-6 px-3 md:py-10 md:px-6">
      <article className="mx-auto max-w-5xl">
        <BreadcrumbTrail locale={locale} trail={[{ label: strings.pageTitle }]} />
        <header className="mb-8 md:mb-12 text-center">
          <h1 className="font-display font-bold text-3xl md:text-4xl text-teal-800 leading-tight mb-3">
            {strings.pageTitle}
          </h1>
          <p className="text-sm md:text-base text-stone-700 max-w-2xl mx-auto leading-relaxed">
            {strings.pageIntro}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {(await Promise.all(
            MANIPULATIVES.map(async (m) => {
              // Prefer the per-locale tool-content (real native copy + native
              // slug for the dedicated SSR landing page). Fall back to the
              // MANIPULATIVES table only if a locale's tool-content is absent.
              const tc = await getToolContent(locale, m.id as ToolKey);
              const title = tc?.name ?? m.title[locale] ?? m.title.en;
              const tagline = tc?.tagline ?? m.tagline[locale] ?? m.tagline.en;
              const description = tc?.about?.[0] ?? m.description[locale] ?? m.description.en;
              // Card links to the SSR landing page (the indexable hop) when we
              // have a native slug; else straight to the mini-tool.
              const href = tc?.slug
                ? localePath(locale, "tools", tc.slug)
                : `${m.mini_tool_url}?lang=${encodeURIComponent(locale)}`;
              return (
                <div
                  key={m.id}
                  className="bg-cream-50 rounded-3xl shadow-md hover:shadow-lg transition-shadow p-5 md:p-6 flex flex-col"
                >
                  <h2 className="font-display font-bold text-xl md:text-2xl text-teal-800 mb-1">
                    {title}
                  </h2>
                  <p className="text-sm font-medium text-stone-600 italic mb-3">
                    {tagline}
                  </p>
                  <p className="text-sm text-stone-700 leading-relaxed mb-5 flex-grow">
                    {description}
                  </p>
                  <Link
                    href={href}
                    className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm transition-colors self-start"
                  >
                    {strings.tryItLink} <span aria-hidden="true" className="ml-1">→</span>
                  </Link>
                </div>
              );
            }),
          ))}
        </div>
      </article>
    </main>
  );
}
