import { getTranslations } from 'next-intl/server';
import {
  selectBreadthGridDecks,
  BreadthGridDeck,
} from '@/lib/breadth-grid-selection';
import FeaturedDeckTile from './FeaturedDeckTile';
import BreadthGridThumbnail from './BreadthGridThumbnail';

// Section 2 — Breadth grid. Server-rendered per the home-page ISR window
// (revalidate=3600 lives on frontend/app/[locale]/page.tsx).
//
// Composition rule: 6 visiting-locale decks + 2 cross-locale decks (sibling-
// language + structurally-different-family) = 8 grid thumbnails, plus 1
// featured inline-play tile sourced from the visiting locale (fallback en/de).
// Selection logic lives in lib/breadth-grid-selection.ts; this component is
// rendering only.
//
// Non-featured tiles use plain <a>, not Next.js Link, per CLAUDE.md §15.7
// routing-contract convention (deck URL is nginx-served, not a Next.js route).

interface RenderDeck {
  id?: string;
  slug: string;
  language: string;
  title: string;
  languageLabel: string;
  thumbnailUrl: string;
  deckUrl: string;
}

function titleFor(deck: BreadthGridDeck): string {
  const titleMap = (deck.title ?? {}) as Record<string, string>;
  return titleMap[deck.language] || deck.slug;
}

function toRenderDeck(deck: BreadthGridDeck): RenderDeck {
  return {
    id: (deck as BreadthGridDeck & { id?: string }).id,
    slug: deck.slug,
    language: deck.language,
    title: titleFor(deck),
    languageLabel: deck.language.toUpperCase(),
    thumbnailUrl: deck.thumbnailUrl,
    deckUrl: `/${deck.language}/decks/${deck.slug}/`,
  };
}

export default async function BreadthGrid({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'homepage.breadthGrid' });

  // Build-time DB unreachability tolerated; ISR fills the grid on first hit.
  // Mirrors the topic-page pattern at app/[locale]/topic/[slug]/page.tsx §69-91.
  let visiting: BreadthGridDeck[] = [];
  let crossLocale: BreadthGridDeck[] = [];
  let featured: BreadthGridDeck | null = null;
  try {
    const selection = await selectBreadthGridDecks(locale);
    visiting = selection.visiting;
    crossLocale = selection.crossLocale;
    featured = selection.featured;
  } catch (err) {
    console.warn(
      '[BreadthGrid] selectBreadthGridDecks failed; rendering empty grid:',
      (err as Error).message
    );
  }

  const thumbnails = [...visiting, ...crossLocale].map(toRenderDeck);
  const featuredRender = featured ? toRenderDeck(featured) : null;

  return (
    <section id="breadth" className="container mx-auto px-4 max-w-6xl py-20 md:py-28">
      <div className="max-w-3xl mb-12">
        <h2 className="font-display font-semibold text-3xl md:text-4xl text-ink-900 tracking-tight">
          {t('sectionTitle')}
        </h2>
        <p className="mt-6 text-lg text-ink-600 leading-relaxed">
          {t('intro')}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredRender && (
          <FeaturedDeckTile
            key={`featured-${featuredRender.language}-${featuredRender.slug}`}
            slug={featuredRender.slug}
            locale={featuredRender.language}
            title={featuredRender.title}
            languageLabel={featuredRender.languageLabel}
            thumbnailUrl={featuredRender.thumbnailUrl}
            deckUrl={featuredRender.deckUrl}
          />
        )}
        {thumbnails.map(deck => (
          <BreadthGridThumbnail
            key={`${deck.language}-${deck.slug}`}
            slug={deck.slug}
            language={deck.language}
            title={deck.title}
            languageLabel={deck.languageLabel}
            thumbnailUrl={deck.thumbnailUrl}
            deckUrl={deck.deckUrl}
            ariaLabel={`${t('openDeck')}: ${deck.title}`}
          />
        ))}
      </div>
    </section>
  );
}
