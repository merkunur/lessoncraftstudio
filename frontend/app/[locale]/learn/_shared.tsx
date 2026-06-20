/**
 * Shared building blocks for the /learn ("Languages") cross-language category.
 * Keeps the hub + per-target pages thin: the deck-grid view (header + format
 * filter + grid + pagination + JSON-LD) lives here and is rendered by both the
 * single-target hub and the [targetLang] page.
 */
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { TOPIC_ENABLED_LOCALES } from '@/config/topic-locales';
import { buildDeckRichAlt } from '@/lib/deck-seo';
import { landingSlugForDeck } from '@/lib/seo/landing-content';
import { CANONICAL_HOST, canonicalUrl, localePath } from '@/lib/seo/url';
import { targetLangName, targetLangSlug } from '@/lib/target-language';
import { resolveAxisName } from '@/lib/category-nav-data';
import { fetchCrossLanguageDecks, fetchCrossLanguageFacets, type CrossLangTarget } from '@/lib/cross-language-decks';
import type { TopicDeckSummary } from '@/lib/topic-decks';
import DeckGridClient, { type TopicDeckCardData } from '../topic/[slug]/DeckGridClient';
import Pagination from '@/components/catalog/Pagination';

export const LEARN_LOCALES = TOPIC_ENABLED_LOCALES as readonly string[];
export const CROSS_LANG_TYPES = ['crossword', 'matching', 'wordsearch'] as const;

export function deckTitleFor(deck: TopicDeckSummary, locale: string): string {
  const t = deck.title as unknown;
  if (t && typeof t === 'object') {
    return (t as Record<string, string>)[locale] ?? (t as Record<string, string>).en ?? deck.slug;
  }
  return deck.slug;
}

/** Conditional repoint (same mechanism as the monolingual /topic grid): point a card at
 *  its tier-3 /worksheets landing IFF one is published for the deck, else the /decks/ asset.
 *  Cross-language landings carry a coordinate.target, so the moment they ship in the landing
 *  JSON these cards auto-repoint; until then they fall back to /decks/. */
export function deckLinkFor(deck: TopicDeckSummary): string {
  const lp = landingSlugForDeck(deck.language, deck.slug);
  return lp ? `/${deck.language}/worksheets/${lp}` : `/${deck.language}/decks/${deck.slug}/`;
}

async function buildLearnCards(decks: TopicDeckSummary[], locale: string): Promise<TopicDeckCardData[]> {
  const tDeckAlt = await getTranslations({ locale, namespace: 'seo.deckCardAlt' });
  return decks.map((deck) => {
    const title = deckTitleFor(deck, locale);
    return {
      id: deck.id,
      slug: deck.slug,
      language: deck.language,
      title,
      richAlt: buildDeckRichAlt(
        { exerciseType: deck.exerciseType, subjectTags: deck.subjectTags, ageRange: deck.ageRange, title },
        locale,
        (key, params) => tDeckAlt(key, params),
      ),
      href: deckLinkFor(deck),
      thumbnailUrl: deck.thumbnailUrl,
      pdfUrl: deck.pdfUrl,
      answerKeyUrl: deck.answerKeyUrl,
    };
  });
}

/** H1 text for a target ("Learn English" / "Englisch lernen") + the trailing SEO tail. */
export function learnTargetH1(t: (k: string, p?: Record<string, string | number>) => string, langName: string): string {
  return `${t('learnH1', { lang: langName })} ${t('learnH1Tail')}`.trim();
}

/** The full deck-grid view for one (locale, target). Used by the [targetLang] page AND the single-target hub. */
export async function LearnTargetView({
  locale,
  targetIso,
  searchParams,
}: {
  locale: string;
  targetIso: string;
  searchParams?: { type?: string; page?: string };
}) {
  const t = await getTranslations({ locale, namespace: 'learnPage' });
  const tCard = await getTranslations({ locale, namespace: 'topicPage' });
  const langName = targetLangName(targetIso, locale);
  const slug = targetLangSlug(targetIso, locale);
  const type = (searchParams?.type && (CROSS_LANG_TYPES as readonly string[]).includes(searchParams.type)) ? searchParams.type : undefined;
  const page = Math.max(1, parseInt(searchParams?.page || '1', 10) || 1);

  const [{ decks, totalCount, pageCount }, facets] = await Promise.all([
    fetchCrossLanguageDecks(locale, targetIso, { type, page }),
    fetchCrossLanguageFacets(locale, targetIso),
  ]);
  const cards = await buildLearnCards(decks, locale);
  const themeCount = facets.themes.length;

  const basePath = localePath(locale, 'learn', slug);
  const spString = type ? `type=${type}` : '';
  const canonical = canonicalUrl(basePath);
  const h1 = learnTargetH1((k, p) => t(k, p), langName);
  const intro = t('learnIntro', { count: totalCount, lang: langName, themes: themeCount });
  const jsonLd = learnTargetJsonLd({ locale, canonical, name: h1, description: intro, langName });

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="mb-3 text-sm text-[#146B5E]/70" aria-label="Breadcrumb">
        <Link href={`/${locale}`} className="hover:underline">Home</Link>
        <span className="mx-1">›</span>
        <Link href={localePath(locale, 'learn')} className="hover:underline">{t('breadcrumb')}</Link>
        <span className="mx-1">›</span>
        <span className="text-[#146B5E]">{langName}</span>
      </nav>

      <div className="rounded-2xl bg-[#FBF3E4] border border-[#146B5E]/15 px-6 py-6 mb-6">
        <p className="text-xs font-bold uppercase tracking-wide text-[#F2784B] mb-1">{t('breadcrumb')}</p>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#146B5E]">{h1}</h1>
        <p className="mt-2 text-[#2b2b2b]/80 max-w-3xl">{intro}</p>
      </div>

      {/* Format filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <FilterChip href={basePath + '/'} active={!type} label={t('allFormats')} />
        {CROSS_LANG_TYPES.map((ty) => (
          <FilterChip key={ty} href={`${basePath}/?type=${ty}`} active={type === ty} label={resolveAxisName(ty, locale, 'exercise-type')} />
        ))}
      </div>

      {cards.length === 0 ? (
        <p className="text-[#2b2b2b]/70">—</p>
      ) : (
        <DeckGridClient
          decks={cards}
          labels={{ playLink: tCard('deckCard.playLink'), pdfLink: tCard('deckCard.pdfLink'), answerKeyLink: tCard('deckCard.answerKeyLink') }}
        />
      )}

      <Pagination locale={locale} currentPage={page} pageCount={pageCount} basePath={basePath + '/'} searchParamsString={spString} />
    </main>
  );
}

function FilterChip({ href, active, label }: { href: string; active: boolean; label: string }) {
  return (
    <Link
      href={href}
      className={
        'rounded-full px-4 py-1.5 text-sm font-semibold border transition ' +
        (active ? 'bg-[#146B5E] text-white border-[#146B5E]' : 'bg-white text-[#146B5E] border-[#146B5E]/25 hover:border-[#146B5E]')
      }
    >
      {label}
    </Link>
  );
}

/** Hub chooser grid — one card per available target language. */
export async function LearnHubChooser({ locale, targets }: { locale: string; targets: CrossLangTarget[] }) {
  const t = await getTranslations({ locale, namespace: 'learnPage' });
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <nav className="mb-3 text-sm text-[#146B5E]/70" aria-label="Breadcrumb">
        <Link href={`/${locale}`} className="hover:underline">Home</Link>
        <span className="mx-1">›</span>
        <span className="text-[#146B5E]">{t('breadcrumb')}</span>
      </nav>
      <div className="rounded-2xl bg-[#FBF3E4] border border-[#146B5E]/15 px-6 py-6 mb-6">
        <p className="text-xs font-bold uppercase tracking-wide text-[#F2784B] mb-1">{t('breadcrumb')}</p>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#146B5E]">{t('hubH1')}</h1>
        <p className="mt-2 text-[#2b2b2b]/80 max-w-3xl">{t('hubIntro')}</p>
      </div>
      <h2 className="text-lg font-bold text-[#146B5E] mb-3">{t('choose')}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {targets.map((tg) => {
          const name = targetLangName(tg.iso, locale);
          return (
            <Link
              key={tg.iso}
              href={localePath(locale, 'learn', targetLangSlug(tg.iso, locale)) + '/'}
              className="rounded-xl bg-white border border-[#146B5E]/15 p-4 hover:border-[#146B5E] hover:shadow-md transition flex flex-col"
            >
              <span className="text-lg font-extrabold text-[#146B5E]">{t('learnH1', { lang: name })}</span>
              <span className="mt-1 text-sm text-[#2b2b2b]/60">{t('worksheets', { count: tg.count })}</span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}

/** JSON-LD (CollectionPage + BreadcrumbList) for a target page. */
export function learnTargetJsonLd(opts: { locale: string; canonical: string; name: string; description: string; langName: string }): object[] {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: opts.name,
      description: opts.description,
      url: opts.canonical,
      inLanguage: opts.locale,
      isFamilyFriendly: true,
      about: { '@type': 'Language', name: opts.langName },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${CANONICAL_HOST}/${opts.locale}` },
        { '@type': 'ListItem', position: 2, name: opts.langName, item: opts.canonical },
      ],
    },
  ];
}

export { canonicalUrl, localePath, CANONICAL_HOST };
