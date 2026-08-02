/* PracticeMomentV6 (v9 "Morning Lessons, Running") — THE WALL OF PRODUCT. Full-bleed,
   before 50% scroll (law 10): two overlapping rows of real worksheets in
   the visitor's language, the tap-to-play featured tile, and activity
   previews with their CCSS chips. The page's abundance made visible.

   Deck data arrives as props (ONE showcase fetch in page.tsx). Deck links
   keep the §15.7 plain-<a>-with-trailing-slash fallback verbatim. */

import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import type { ShowcaseDeck } from '@/lib/showcase-decks';
import { landingSlugForDeck } from '@/lib/seo/landing-content';
import { resolveActivityById } from '@/lib/activities';
import FeaturedDeckTileV3 from '../homepage-v3/FeaturedDeckTileV3';
import SeamInstrument from './SeamInstrument';

interface Props {
  locale: string;
  featured: ShowcaseDeck | null;
  thumbs: ShowcaseDeck[];
}

const PREV = '/mini-tools/previews';

const ACTIVITIES = [
  { img: 'ten-frame.count-to-10.make-n.animals', labelKey: 'label1', code: 'K.CC.B.4' },
  { img: 'choice-board.which-more.k-c-c-6', labelKey: 'label2', code: 'K.CC.C.6' },
  { img: 'ten-frame.how-many.0-10.animals', labelKey: 'label4', code: 'K.CC.B.5' },
  { img: 'choice-board.even-odd.2-oa-c-3', labelKey: 'label5', code: '2.OA.C.3' },
];

const WALL_TILTS = ['hv7-tilt-b', 'hv7-tilt-a', 'hv7-tilt-c', 'hv7-tilt-d', 'hv7-tilt-a', 'hv7-tilt-b'];

function titleFor(deck: ShowcaseDeck): string {
  const titleMap = (deck.title ?? {}) as Record<string, string>;
  return titleMap[deck.language] || deck.slug;
}

function deckPlayUrl(deck: ShowcaseDeck): string {
  return `/${deck.language}/decks/${deck.slug}/`;
}

function deckLandingHref(deck: ShowcaseDeck): string {
  const landing = landingSlugForDeck(deck.language, deck.slug);
  return landing ? `/${deck.language}/worksheets/${landing}` : deckPlayUrl(deck);
}

export default async function PracticeMomentV6({ locale, featured, thumbs }: Props) {
  const [t, tLabels] = await Promise.all([
    getTranslations({ locale, namespace: 'homepageV6.practice' }),
    getTranslations({ locale, namespace: 'homepageV4.activities' }),
  ]);

  const activityHrefs = new Map<string, string>();
  try {
    for (const a of ACTIVITIES) {
      const slug = (await resolveActivityById(a.img))?.slug[locale];
      if (slug) activityHrefs.set(a.img, `/${locale}/activities/${slug}`);
    }
  } catch {
    /* manifest unreachable — cards fall back to the index */
  }

  const rowA = thumbs.slice(0, 6);
  const rowB = thumbs.slice(6, 12);

  // Wall tile #a1 demonstrates the product: teal check stamps appear one
  // by one on the real worksheet — it checks itself (aria-hidden overlay).
  const selfChecks = (
    <span className="hv9-checks" aria-hidden="true">
      {[1, 2, 3, 4].map((n, i) => (
        <i key={n} className={`hv9-check is-k${n}`} style={{ '--i': i } as React.CSSProperties} />
      ))}
    </span>
  );

  const sheet = (deck: ShowcaseDeck, i: number, row: 'a' | 'b') => {
    const checking = row === 'a' && i === 1;
    // The two outermost row-A sheets bleed past the viewport edge by
    // design (collage), so their labels would be cut — text is never cut.
    const labeled = !(row === 'a' && (i === 0 || i === 5));
    return (
      <a
        key={`${row}-${deck.language}-${deck.slug}`}
        href={deckLandingHref(deck)}
        className={`hv7-sheet hv7-lift ${WALL_TILTS[i % WALL_TILTS.length]}${checking ? ' hv9-selfcheck' : ''}`}
        style={{ width: 'clamp(200px, 16vw, 236px)', marginTop: i % 2 === 0 ? 0 : 28 }}
      >
        <img
          src={deck.thumbnailUrl}
          alt={titleFor(deck)}
          width={480}
          height={620}
          loading={row === 'a' ? 'eager' : 'lazy'}
          fetchPriority={row === 'a' ? 'low' : undefined}
        />
        {/* lean-in label: the work's name appears when you approach —
            existing localized title, zero new strings */}
        {labeled && (
          <span className="hvg-label" aria-hidden="true">
            <span className="hvg-label-title">{titleFor(deck)}</span>
            <span className="hvg-label-line">{deck.language}</span>
          </span>
        )}
        {checking && selfChecks}
      </a>
    );
  };

  const activityCard = (a: (typeof ACTIVITIES)[number], extra = '') => {
    const label = tLabels(a.labelKey);
    return (
      <Link
        key={a.img}
        href={activityHrefs.get(a.img) ?? `/${locale}/activities`}
        className={`hv6-card hv7-lift ${extra}`}
        style={{ width: 'clamp(210px, 17vw, 250px)' }}
      >
        <div className="bg-[#FBF3E4]">
          <img
            src={`${PREV}/${a.img}.webp`}
            alt={t('altActivity', { label })}
            loading="lazy"
            width={480}
            height={300}
            className="block w-full h-auto"
          />
        </div>
        <div className="flex items-center justify-between gap-2 px-3 py-2.5 border-t border-[#14322D]/8">
          <span className="font-lcsBody text-xs font-semibold text-lcs-teal truncate">{label}</span>
          <span className="hv6-chip-mono shrink-0">{a.code}</span>
        </div>
      </Link>
    );
  };

  return (
    <section id="practice" className="pt-12 md:pt-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="max-w-3xl">
          <h2 className="font-lcsDisplay font-bold text-[#14322D] leading-[1.08] tracking-tight text-[1.875rem] sm:text-[2.25rem] md:text-[2.5rem]">
            {t('heading')}
          </h2>
          <p className="mt-4 font-lcsBody text-lg text-[#3d574f] leading-relaxed">{t('body')}</p>
          <p className="mt-2 font-lcsBody text-sm text-[#5a6b64]">{t('caption')}</p>
        </div>
      </div>

      {/* THE WALL — full-bleed, overlapping, abundant. */}
      <div className="hv7-wall hvg-wash mt-14 md:mt-16 overflow-x-clip">
        <div className="hidden sm:block">
          <div className="hv7-overlap-x justify-center px-4">
            {rowA.slice(0, 3).map((d, i) => sheet(d, i, 'a'))}
            {featured && (
              <div className="hv7-lift" style={{ width: 'clamp(300px, 26vw, 390px)', zIndex: 3, marginTop: 8 }}>
                <FeaturedDeckTileV3
                  slug={featured.slug}
                  locale={featured.language}
                  title={titleFor(featured)}
                  languageLabel={featured.language.toUpperCase()}
                  thumbnailUrl={featured.thumbnailUrl}
                  deckUrl={deckPlayUrl(featured)}
                  deckHref={deckLandingHref(featured)}
                  deckHrefLabel={t('openDeck')}
                />
              </div>
            )}
            {rowA.slice(3, 6).map((d, i) => sheet(d, i + 3, 'a'))}
          </div>
          <div className="hv7-overlap-x justify-center px-4 -mt-8">
            {activityCard(ACTIVITIES[0], 'hv7-tilt-c')}
            {rowB.slice(0, 2).map((d, i) => sheet(d, i, 'b'))}
            {activityCard(ACTIVITIES[1], 'hv7-tilt-a')}
            {rowB.slice(2, 4).map((d, i) => sheet(d, i + 2, 'b'))}
            {activityCard(ACTIVITIES[2], 'hv7-tilt-d')}
            {activityCard(ACTIVITIES[3], 'hv7-tilt-b')}
          </div>
        </div>

        {/* Phone wall: straight 2-col grid — 4 sheets, featured full-width,
            2 activities. No tilt. */}
        <div className="sm:hidden px-4">
          <div className="grid grid-cols-2 gap-3">
            {rowA.slice(0, 4).map((deck, i) => (
              <a
                key={`m-${deck.slug}`}
                href={deckLandingHref(deck)}
                className={`hv7-sheet${i === 1 ? ' hv9-selfcheck' : ''}`}
              >
                <img src={deck.thumbnailUrl} alt={titleFor(deck)} width={480} height={620} loading="lazy" />
                {i === 1 && selfChecks}
              </a>
            ))}
          </div>
          {featured && (
            <div className="mt-4">
              <FeaturedDeckTileV3
                slug={featured.slug}
                locale={featured.language}
                title={titleFor(featured)}
                languageLabel={featured.language.toUpperCase()}
                thumbnailUrl={featured.thumbnailUrl}
                deckUrl={deckPlayUrl(featured)}
                deckHref={deckLandingHref(featured)}
                deckHrefLabel={t('openDeck')}
              />
            </div>
          )}
          <div className="grid grid-cols-2 gap-3 mt-4">
            {ACTIVITIES.slice(0, 2).map((a) => {
              const label = tLabels(a.labelKey);
              return (
                <Link
                  key={`m-${a.img}`}
                  href={activityHrefs.get(a.img) ?? `/${locale}/activities`}
                  className="hv6-card"
                >
                  <div className="bg-[#FBF3E4]">
                    <img src={`${PREV}/${a.img}.webp`} alt={t('altActivity', { label })} loading="lazy" width={480} height={300} className="block w-full h-auto" />
                  </div>
                  <div className="px-3 py-2 border-t border-[#14322D]/8">
                    <span className="font-lcsBody text-xs font-semibold text-lcs-teal truncate block">{label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Link href={`/${locale}/activities`} className="hv6-cta hv6-cta-primary text-base px-6 py-3">
          {t('browseActivities')}
        </Link>
        <Link href={`/${locale}/worksheets/`} className="hv6-cta hv6-cta-ghost text-base px-6 py-3">
          {t('browseWorksheets')}
        </Link>
      </div>

      {/* the thermometer rises on the seam into the maker band */}
      <SeamInstrument variant="thermometer" />
    </section>
  );
}
