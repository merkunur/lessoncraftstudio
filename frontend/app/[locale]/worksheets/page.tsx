/* /[locale]/worksheets/ — All worksheets gateway page.
   Public, SSR. Mirrors the /[locale]/worksheet-makers/ pattern but
   surfaces one published-deck sample per exercise type in the current
   locale, each tile linking to its corresponding native-language topic
   page (/[locale]/topic/<native-slug>/).

   v2: chrome strings localized across all 11 site locales via
   worksheetsPage namespace (commit 2026-05-24). Routing + tile data +
   topic links were already locale-aware in v1; this completes the
   localization. NSR-flag deferred review for SV/DA/NO/FI per §17.5.1
   Nordic+Finnic doctrine. */

import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import { getAxisSlug, getAxisName } from '@/lib/taxonomy';
import { CANONICAL_HOST, canonicalUrl, localePath } from '@/lib/seo/url';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import { SUPPORTED_LOCALES } from '@/config/locales';

const BASE_URL = CANONICAL_HOST;

// Brand-only 1200×630 OG asset shared with the homepage (Direction A
// palette). Reused on worksheets hub + topic + activities pages until
// per-surface OG composites are commissioned separately.
const OG_IMAGE_PATH = '/og-homepage.png';

// Substrate-honesty floor — only locales with genuine catalog depth (en /
// es / it / pt today) get the "Hundreds…" variant. Seed-only locales fall
// to the safer copy until Track C deck-publish lands per CLAUDE.md §19.5.
const HUNDREDS_THRESHOLD = 100;

interface Tile {
  exerciseType: string;
  typeName: string;
  typeSlug: string;
  thumbnailUrl: string;
  deckTitle: string;
}

async function countLocaleDecks(locale: string): Promise<number> {
  try {
    return await prisma.deck.count({
      where: { language: locale, status: 'published' },
    });
  } catch {
    return 0;
  }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale || 'en';
  const total = await countLocaleDecks(locale);
  const useHundreds = total >= HUNDREDS_THRESHOLD;
  const t = await getTranslations({ locale, namespace: 'worksheetsPage' });

  const title = useHundreds ? t('metaTitle.hundreds') : t('metaTitle.safer');
  const description = useHundreds ? t('metaDescription.hundreds') : t('metaDescription.safer');
  const canonical = canonicalUrl(localePath(locale, 'worksheets'));

  // Reciprocal hreflang × 11 + x-default — every locale renders the same
  // worksheets-hub surface, so unconditional alternates are correct here
  // (unlike topic pages where presence depends on per-axis deck count).
  const hreflangAlternates: Record<string, string> = {};
  for (const lang of SUPPORTED_LOCALES) {
    hreflangAlternates[getHreflangCode(lang)] = canonicalUrl(localePath(lang, 'worksheets'));
  }
  hreflangAlternates['x-default'] = canonicalUrl(localePath('en', 'worksheets'));

  return {
    title: `${title} | LessonCraftStudio`,
    description,
    alternates: {
      canonical,
      languages: hreflangAlternates,
    },
    openGraph: {
      title,
      description,
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
      title,
      description,
      images: [`${CANONICAL_HOST}${OG_IMAGE_PATH}`],
    },
    robots: { index: true, follow: true },
  };
}

export default async function AllWorksheetsPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale || 'en';
  const t = await getTranslations({ locale, namespace: 'worksheetsPage' });

  let tiles: Tile[] = [];
  let totalCount = 0;
  try {
    const [decks, count] = await Promise.all([
      prisma.deck.findMany({
        where: { language: locale, status: 'published' },
        distinct: ['exerciseType'],
        select: {
          slug: true,
          exerciseType: true,
          thumbnailUrl: true,
          title: true,
          language: true,
        },
        orderBy: [{ publishedAt: 'desc' }, { id: 'asc' }],
      }),
      prisma.deck.count({ where: { language: locale, status: 'published' } }),
    ]);
    totalCount = count;

    tiles = decks
      .map((d) => {
        const titleMap = (d.title ?? {}) as Record<string, string>;
        return {
          exerciseType: d.exerciseType,
          typeName: getAxisName('exercise-type', d.exerciseType, locale) ?? d.exerciseType,
          typeSlug: getAxisSlug('exercise-type', d.exerciseType, locale) ?? d.exerciseType,
          thumbnailUrl: d.thumbnailUrl,
          deckTitle: titleMap[locale] || titleMap.en || d.slug,
        };
      })
      .filter((t) => t.typeName)
      .sort((a, b) => a.typeName.localeCompare(b.typeName, locale));
  } catch (err) {
    console.warn('[AllWorksheetsPage] DB query failed:', (err as Error).message);
  }

  const useHundreds = totalCount >= HUNDREDS_THRESHOLD;
  const h1 = useHundreds ? t('h1.hundreds') : t('h1.safer');
  const intro = useHundreds ? t('intro.hundreds') : t('intro.safer');

  return (
    <main className="container mx-auto px-4 max-w-6xl py-16 md:py-24">
      <h1 className="font-display font-semibold text-3xl md:text-5xl text-ink-900 leading-tight tracking-tight mb-6">
        {h1}
      </h1>
      <p className="text-lg md:text-xl text-ink-600 leading-relaxed mb-12 max-w-3xl">
        {intro}
      </p>

      {tiles.length === 0 ? (
        <div className="bg-cream-50 border border-cream-300 rounded-lg p-10 md:p-12 text-center max-w-2xl mx-auto">
          <p className="font-display font-semibold text-xl text-ink-900 mb-3">
            {t('emptyTitle')}
          </p>
          <p className="text-ink-600">
            {t('emptyBody')}
          </p>
        </div>
      ) : (
        <section>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {tiles.map((tile) => (
              <Link
                key={tile.exerciseType}
                href={`/${locale}/topic/${tile.typeSlug}/`}
                className="group bg-cream-50 hover:bg-cream-100 border border-cream-300 hover:border-terracotta-400 rounded-lg overflow-hidden transition-colors block"
              >
                <div className="aspect-[4/5] overflow-hidden bg-cream-100 border-b border-cream-300">
                  {/* Use plain <img> so we don't have to register the
                      lessoncraftstudio.com CDN host with next.config Image
                      remotePatterns. Thumbnails are already optimized at
                      publish time. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={tile.thumbnailUrl}
                    alt={t('tileAlt', { typeName: tile.typeName })}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 md:p-5">
                  <h3 className="font-display font-semibold text-base md:text-lg text-ink-900 mb-2 group-hover:text-terracotta-600 transition-colors">
                    {tile.typeName}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-terracotta-500 group-hover:text-terracotta-600 transition-colors">
                    {t('tileCta')}
                    <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
