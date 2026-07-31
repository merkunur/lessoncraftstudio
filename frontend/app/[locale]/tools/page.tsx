import fs from "fs";
import path from "path";
import { Metadata } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import { INDEXABLE_ROBOTS } from '@/lib/seo/robots';
import { notFound } from "next/navigation";
import {
  MANIPULATIVES,
  LANDING_STRINGS,
  landingHreflangAlternates,
} from "@/lib/manipulatives";
import {
  TOOL_CATEGORY_ORDER,
  toolCategory,
  toolCategoryLabel,
  type ToolCategory,
} from "@/lib/tool-categories";
import {
  TOPIC_ENABLED_LOCALES,
  TopicEnabledLocale,
} from "@/config/topic-locales";
import BreadcrumbTrail from "@/components/breadcrumbs/BreadcrumbTrail";
import ToolCatalogCard from "@/components/tools/ToolCatalogCard";
import { CANONICAL_HOST, canonicalUrl, localePath } from "@/lib/seo/url";
import { getToolContent, ToolKey } from "@/lib/seo/tool-content";
import "@/styles/catalog-cards.css";

/**
 * Manipulatives landing page — /<locale>/tools/
 *
 * Lists the free-play interactive tools, grouped into the four browse
 * categories in lib/tool-categories.ts. Each card links to the tool's SSR
 * landing page (the indexable hop) when the locale has a native slug, else
 * straight to the raw mini-tool URL served by nginx at /mini-tools/<file>.html
 * per the §3.3 nginx-direct pattern.
 *
 * Shares the Direction A card system with the activities hub
 * (.actcat-card + ToolCatalogCard) so the two read as one catalog. There is
 * deliberately NO facet rail and NO pagination here: activities needs both at
 * 194 rows with ACTIVITY_PAGE_SIZE = 48, but 40 tools fit on a single page and
 * paginating them would add machinery with nothing to do.
 *
 * Locale-prefixed but the route segment `tools` is constant English per
 * the same convention as `decks` and `activities` (CLAUDE.md §17.8.1).
 *
 * ISR revalidate=3600 since the metadata file is static; long cache is fine.
 */
export const revalidate = 3600;

const BASE_URL = CANONICAL_HOST;

// Direction A typography pairing (CLAUDE.md §A.13.47) — loaded per route, like
// the activities hub. latin-ext covers all 11 site locales.
const baloo2 = Baloo_2({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-baloo-2",
  display: "swap",
});
const nunito = Nunito({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-nunito",
  display: "swap",
});

/* Which tools have a generated preview WebP (rendered by
   scripts/generate-tool-previews.js, served from /mini-tools/tool-previews/).
   Read once per server lifetime; the candidate paths cover local dev + the
   standalone build (public/mini-tools is symlinked to the served storage).
   Missing → the card falls back to the glyph. Mirrors loadPreviewIds() in the
   activities hub. */
let _toolPreviewSet: Set<string> | null = null;
function loadToolPreviewIds(): Set<string> {
  if (_toolPreviewSet) return _toolPreviewSet;
  const cwd = process.cwd();
  const candidates = [
    path.join(cwd, "public", "mini-tools", "tool-previews"),
    path.join(cwd, "..", "public", "mini-tools", "tool-previews"),
    path.join(cwd, "frontend", "public", "mini-tools", "tool-previews"),
  ];
  const set = new Set<string>();
  for (const dir of candidates) {
    try {
      for (const f of fs.readdirSync(dir)) {
        if (f.endsWith(".webp")) set.add(f.slice(0, -5));
      }
      if (set.size) break;
    } catch {
      /* try next candidate */
    }
  }
  _toolPreviewSet = set;
  return set;
}

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
    robots: INDEXABLE_ROBOTS,
  };
}

interface ResolvedTool {
  id: string;
  category: ToolCategory;
  title: string;
  tagline: string;
  href: string;
  previewUrl?: string;
}

export default async function ManipulativesLandingPage({
  params,
}: {
  params: PageParams;
}) {
  if (!isTopicLocale(params.locale)) notFound();
  const locale = params.locale;
  const strings = LANDING_STRINGS[locale] ?? LANDING_STRINGS.en;
  const previewIds = loadToolPreviewIds();

  const resolved = (
    await Promise.all(
      MANIPULATIVES.map(async (m): Promise<ResolvedTool | null> => {
        // Prefer the per-locale tool-content (real native copy + native
        // slug for the dedicated SSR landing page). Fall back to the
        // MANIPULATIVES table only if a locale's tool-content is absent.
        const tc = await getToolContent(locale, m.id as ToolKey);
        // A tool with no entry for this locale is not shipped here —
        // Heart Words is deliberately absent in fi (transparent
        // orthography, no sight-word tradition). Rendering an
        // English-fallback card would link to a tool with no data for
        // that language, so skip the card entirely.
        if (!tc) return null;
        return {
          id: m.id,
          category: toolCategory(m.id),
          title: tc?.name ?? m.title[locale] ?? m.title.en,
          tagline: tc?.tagline ?? m.tagline[locale] ?? m.tagline.en,
          href: tc?.slug
            ? localePath(locale, "tools", tc.slug)
            : `${m.mini_tool_url}?lang=${encodeURIComponent(locale)}`,
          previewUrl: previewIds.has(m.id)
            ? `/mini-tools/tool-previews/${m.id}.webp`
            : undefined,
        };
      }),
    )
  ).filter((t): t is ResolvedTool => t !== null);

  // Group into the four sections, preserving MANIPULATIVES order within each.
  // A section with no tools in this locale is skipped entirely rather than
  // rendering an empty heading.
  const sections = TOOL_CATEGORY_ORDER.map((cat) => ({
    cat,
    label: toolCategoryLabel(cat, locale),
    tools: resolved.filter((t) => t.category === cat),
  })).filter((s) => s.tools.length > 0);

  return (
    <main
      className={`${baloo2.variable} ${nunito.variable} font-lcsBody bg-lcs-cream min-h-[calc(100vh-200px)] py-6 px-3 md:py-10 md:px-6`}
    >
      <article className="mx-auto max-w-6xl">
        <BreadcrumbTrail locale={locale} trail={[{ label: strings.pageTitle }]} />

        <header className="mb-7 md:mb-10 max-w-3xl">
          <h1 className="font-lcsDisplay font-extrabold text-3xl md:text-4xl text-lcs-teal leading-tight mb-2.5">
            {strings.pageTitle}
          </h1>
          <span aria-hidden="true" className="block w-16 h-1.5 rounded-full bg-lcs-coral mb-3.5" />
          <p className="font-lcsBody text-sm md:text-base text-lcs-teal/80 leading-relaxed">
            {strings.pageIntro}
          </p>
        </header>

        {/* Category jump links — the lightweight stand-in for the activities
            facet rail. In-page anchors, so they work with JS off. */}
        {sections.length > 1 && (
          <nav aria-label={strings.pageTitle} className="flex flex-wrap gap-2 mb-8 md:mb-10">
            {sections.map((s) => (
              <a
                key={s.cat}
                href={`#${s.cat}`}
                className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/70 border border-lcs-teal/15 font-lcsBody font-semibold text-xs md:text-sm text-lcs-teal hover:bg-lcs-teal hover:text-white hover:border-lcs-teal transition-colors"
              >
                {s.label}
                <span className="ml-1.5 text-[0.7rem] opacity-60">{s.tools.length}</span>
              </a>
            ))}
          </nav>
        )}

        <div className="space-y-10 md:space-y-14">
          {sections.map((s) => (
            <section key={s.cat} id={s.cat} className="scroll-mt-24">
              <h2 className="font-lcsDisplay font-extrabold text-xl md:text-2xl text-lcs-coral mb-4 md:mb-5">
                {s.label}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
                {s.tools.map((t) => (
                  <ToolCatalogCard
                    key={t.id}
                    href={t.href}
                    toolKey={t.id}
                    category={t.category}
                    title={t.title}
                    tagline={t.tagline}
                    tryItLabel={strings.tryItLink}
                    previewUrl={t.previewUrl}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
