/* /[locale]/worksheets/ — All worksheets gateway page.
   Public, SSR. Mirrors the /[locale]/worksheet-makers/ pattern but
   surfaces one published-deck sample per exercise type in the current
   locale, each tile linking to its corresponding native-language topic
   page (/[locale]/topic/<native-slug>/).

   v1: English-only static copy (H1 / intro / tile CTA / empty-state).
   Native-language fan-out deferred to a follow-up commission. */

import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { getAxisSlug, getAxisName } from '@/lib/taxonomy';

const BASE_URL = 'https://www.lessoncraftstudio.com';

interface Tile {
  exerciseType: string;
  typeName: string;
  typeSlug: string;
  thumbnailUrl: string;
  deckTitle: string;
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale || 'en';
  return {
    title: 'All worksheets | LessonCraftStudio',
    description:
      'Browse worksheets by exercise type — interactive HTML + printable PDFs across K-3 math, literacy, puzzles, and more.',
    alternates: { canonical: `${BASE_URL}/${locale}/worksheets/` },
    robots: { index: true, follow: true },
  };
}

export default async function AllWorksheetsPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale || 'en';

  let tiles: Tile[] = [];
  try {
    const decks = await prisma.deck.findMany({
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
    });

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

  return (
    <main className="container mx-auto px-4 max-w-6xl py-16 md:py-24">
      <h1 className="font-display font-semibold text-3xl md:text-5xl text-ink-900 leading-tight tracking-tight mb-6">
        All worksheets
      </h1>
      <p className="text-lg md:text-xl text-ink-600 leading-relaxed mb-12 max-w-3xl">
        Pick a worksheet type to browse every available worksheet in that
        category — interactive HTML to play right in the browser, plus a
        printable PDF for every set.
      </p>

      {tiles.length === 0 ? (
        <div className="bg-cream-50 border border-cream-300 rounded-lg p-10 md:p-12 text-center max-w-2xl mx-auto">
          <p className="font-display font-semibold text-xl text-ink-900 mb-3">
            No worksheets available in this language yet.
          </p>
          <p className="text-ink-600">
            Our catalog is expanding language by language. Please check back
            soon, or browse another language.
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
                    alt={`${tile.typeName} worksheet sample`}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 md:p-5">
                  <h3 className="font-display font-semibold text-base md:text-lg text-ink-900 mb-2 group-hover:text-terracotta-600 transition-colors">
                    {tile.typeName}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-terracotta-500 group-hover:text-terracotta-600 transition-colors">
                    View worksheets
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
