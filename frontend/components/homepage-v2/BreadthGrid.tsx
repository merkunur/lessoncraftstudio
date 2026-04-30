import { getTranslations } from 'next-intl/server';
import featuredDecksConfig from '@/config/homepage-featured-decks.json';
import FeaturedDeckTile from './FeaturedDeckTile';

// Section 2 — Breadth grid per HOMEPAGE-IMPLEMENTATION-PROMPT.md §5.2 + §6.3.
// Server-rendered grid backed by frontend/config/homepage-featured-decks.json.
// Featured tile (featured: true) plays inline via FeaturedDeckTile (client modal).
// Non-featured tiles link through to their deck detail pages.
//
// At launch: minimum 4 decks across en + de (per Brief B Phase 6 catalog state),
// 4 different topics. Grid grows toward 8 as the catalog expands per §5.2 sizing logic.
//
// Non-featured tiles use plain <a>, NOT next/link. Deck pages at
// /<locale>/decks/<slug>/ are served by an nginx location-block that intercepts
// before reaching Next.js (per CLAUDE.md §15.7). Next.js Link does client-side
// navigation that bypasses nginx and falls into the [locale]/[...slug] catch-all
// which returns a 404 for unknown slugs. Plain <a> triggers a full HTTP GET
// which nginx serves correctly.

interface DeckEntry {
  slug: string;
  locale: string;
  title: string;
  topic: string;
  languageLabel: string;
  thumbnailUrl: string;
  deckUrl: string;
  featured: boolean;
  _note?: string;
}

export default async function BreadthGrid({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'homepage.breadthGrid' });

  // Filter out the JSON's underscore-prefixed metadata fields.
  const decks: DeckEntry[] = (featuredDecksConfig.decks || []).filter(
    (d): d is DeckEntry => typeof d === 'object' && d !== null && 'slug' in d
  );

  return (
    <section id="breadth" className="container mx-auto px-4 max-w-6xl py-20 md:py-28">
      <div className="max-w-3xl mb-12">
        <h2 className="font-display font-semibold text-3xl md:text-4xl text-gray-900 tracking-tight">
          {t('sectionTitle')}
        </h2>
        <p className="mt-6 text-lg text-gray-600 leading-relaxed">
          {t('intro')}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {decks.map(deck => {
          if (deck.featured) {
            return (
              <FeaturedDeckTile
                key={`${deck.locale}-${deck.slug}`}
                slug={deck.slug}
                locale={deck.locale}
                title={deck.title}
                languageLabel={deck.languageLabel}
                thumbnailUrl={deck.thumbnailUrl}
                deckUrl={deck.deckUrl}
              />
            );
          }
          return (
            <a
              key={`${deck.locale}-${deck.slug}`}
              href={deck.deckUrl}
              className="group block rounded-xl overflow-hidden bg-white border border-gray-200 hover:border-gray-400 hover:shadow-lg transition-all"
              aria-label={`${t('openDeck')}: ${deck.title}`}
            >
              <div className="relative aspect-[480/620] bg-gray-50">
                <img
                  src={deck.thumbnailUrl}
                  alt={deck.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-4 py-3 flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-gray-900 truncate">{deck.title}</span>
                <span className="text-xs font-medium text-gray-500 flex-shrink-0" aria-label={`Language: ${deck.languageLabel}`}>
                  {deck.languageLabel}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
