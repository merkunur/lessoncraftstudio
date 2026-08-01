/* PracticeMomentV6 — tick 2: every child tries it. ONE SHELF holding both
   activities and worksheets — the anti-silo argument in a single grid.

   - Featured inline-play worksheet tile (FeaturedDeckTileV3 modal),
   - 4 real deck thumbnails (plain <a>; a deck without a /worksheets/
     landing falls back to the nginx /decks/ URL whose trailing slash
     <Link> would strip and 404, §15.7),
   - 4 real activity previews with CCSS chips (labels reuse the already-
     localized homepageV4.activities.label* strings).

   Server component; DB failure → the worksheet half renders nothing
   (honesty), the activity half still stands. */

import Link from 'next/link';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { selectShowcaseDecks, type ShowcaseDeck, type ShowcaseSelection } from '@/lib/showcase-decks';
import { landingSlugForDeck } from '@/lib/seo/landing-content';
import { resolveActivityById } from '@/lib/activities';
import { wwwImg } from '@/lib/img-host';
import FeaturedDeckTileV3 from '../homepage-v3/FeaturedDeckTileV3';

interface Props {
  locale: string;
}

const PREV = '/mini-tools/previews';

/* Real activity previews (verified live) with their standard codes; the
   labelKey indexes the localized homepageV4.activities.label* strings. */
const ACTIVITIES = [
  { img: 'ten-frame.count-to-10.make-n.animals', labelKey: 'label1', code: 'K.CC.B.4' },
  { img: 'choice-board.which-more.k-c-c-6', labelKey: 'label2', code: 'K.CC.C.6' },
  { img: 'ten-frame.how-many.0-10.animals', labelKey: 'label4', code: 'K.CC.B.5' },
  { img: 'choice-board.even-odd.2-oa-c-3', labelKey: 'label5', code: '2.OA.C.3' },
];

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

export default async function PracticeMomentV6({ locale }: Props) {
  const [t, tTicks, tLabels] = await Promise.all([
    getTranslations({ locale, namespace: 'homepageV6.practice' }),
    getTranslations({ locale, namespace: 'homepageV6.ticks' }),
    getTranslations({ locale, namespace: 'homepageV4.activities' }),
  ]);

  let selection: ShowcaseSelection | null = null;
  try {
    selection = await selectShowcaseDecks(locale);
  } catch {
    /* DB unreachable — the shelf shows activities only */
  }
  const featured = selection?.featured ?? null;
  const deckThumbs = (selection?.thumbs ?? []).slice(0, 4);

  const activityHrefs = new Map<string, string>();
  try {
    for (const a of ACTIVITIES) {
      const slug = (await resolveActivityById(a.img))?.slug[locale];
      if (slug) activityHrefs.set(a.img, `/${locale}/activities/${slug}`);
    }
  } catch {
    /* manifest unreachable — cards fall back to the index */
  }

  return (
    <section id="practice" className="pt-24 md:pt-32 pb-6">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="hv6-mark mb-12 md:mb-16">
          <span className="hv6-bead" aria-hidden="true">2</span>
          <span className="hv6-hang hv6-sign-hang">
            <span className="hv6-sign">{tTicks('practice')}</span>
          </span>
        </div>

        {/* Header paper hangs RIGHT of the wire. */}
        <div
          className="hv6-paper hv6-hang2 is-vee max-w-3xl lg:max-w-[47%] lg:ml-auto mb-14 md:mb-20"
          style={{ '--drop': '56px' } as React.CSSProperties}
        >
          <h2 className="font-lcsDisplay font-bold text-[#14322D] leading-[1.08] tracking-tight text-[1.875rem] sm:text-[2.375rem] md:text-[2.75rem]">
            {t('heading')}
          </h2>
          <p className="mt-5 font-lcsBody text-lg text-[#3d574f] leading-relaxed">{t('body')}</p>
          <p className="mt-3 font-lcsBody text-sm text-[#3d574f]">{t('caption')}</p>
        </div>

        {/* ONE hanging shelf: worksheet tiles and activity tiles standing
            together on a plank. When the DB is unreachable (no featured
            tile) the shelf takes the full width. */}
        <div
          className={
            featured
              ? 'grid grid-cols-1 lg:grid-cols-[minmax(280px,340px)_1fr] gap-8 lg:gap-10 items-start'
              : 'grid grid-cols-1 gap-8 items-start'
          }
        >
          {featured && (
            <div className="hv6-hang" style={{ '--drop': '56px', '--rest': '-1deg' } as React.CSSProperties}>
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
              <p className="mt-4">
                <span className="hv6-slip"><span className="hv6-pen">{t('penShelf')}</span></span>
              </p>
            </div>
          )}

          <div className="hv6-shelf">
          <div className="hv6-shelf-grid grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-5">
            {/* 4 worksheets… */}
            {deckThumbs.map((deck) => (
              <a
                key={`${deck.language}-${deck.slug}`}
                href={deckLandingHref(deck)}
                className="hv6-card group relative block overflow-hidden"
              >
                <div className="relative aspect-[480/620] overflow-hidden bg-lcs-cream">
                  <Image
                    src={wwwImg(deck.thumbnailUrl)}
                    alt={titleFor(deck)}
                    fill
                    loading="lazy"
                    sizes="(max-width:639px) 45vw, (max-width:1023px) 22vw, 200px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="px-3 py-2.5">
                  <span className="block font-lcsBody text-xs font-semibold text-lcs-teal truncate">
                    {titleFor(deck)}
                  </span>
                </div>
              </a>
            ))}
            {/* …and 4 activities, on the same shelf. */}
            {ACTIVITIES.map((a) => {
              const label = tLabels(a.labelKey);
              return (
                <Link
                  key={a.img}
                  href={activityHrefs.get(a.img) ?? `/${locale}/activities`}
                  className="hv6-card group block"
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
            })}
          </div>
          <div className="hv6-shelf-plank" aria-hidden="true" />
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Link href={`/${locale}/activities`} className="hv6-cta hv6-cta-primary text-base px-6 py-3">
            {t('browseActivities')}
          </Link>
          <Link href={`/${locale}/worksheets/`} className="hv6-cta hv6-cta-ghost text-base px-6 py-3">
            {t('browseWorksheets')}
          </Link>
        </div>

      </div>
    </section>
  );
}
