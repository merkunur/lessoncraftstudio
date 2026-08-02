/* Homepage v10 "THE GALLERY OF LESSONS" — preview route (noindex).

   ── i18n ──────────────────────────────────────────────────────────────────
   Every word on this page is already natively authored in all eleven
   languages. Nothing here is machine-translated and nothing new had to be
   written, because:

     · the prose comes from the `homepageV6` namespace, which was authored by
       native panels and is already tier-truthful;
     · the instrument names and taglines come from `MANIPULATIVES`, which
       carries all eleven locales per tool;
     · the room numbers are ROMAN NUMERALS — language-neutral by
       construction, so the gallery device costs no translation at all.

   That is the whole reason this page can ship in eleven languages today
   rather than after a translation round. If a future room needs genuinely
   new prose, it goes through the native panel per §A.13.48 — never through
   a machine translation step.

   The showcase fetch mirrors the live page exactly (one fetch of 18, sliced)
   so promotion is an import swap in app/[locale]/page.tsx. */

import { getTranslations } from 'next-intl/server';
import GrandHall from '@/components/homepage-v10/GrandHall';
import {
  InstrumentHall,
  PrintRoom,
  Studio,
  MembersRoom,
  Exit,
  type RoomStrings,
  type InstrumentCard,
} from '@/components/homepage-v10/Rooms';
import BrowseByTopicSSR from '@/components/homepage-v3/BrowseByTopicSSR';
import { MANIPULATIVES } from '@/lib/manipulatives';
import { SUBSCRIPTION_PRODUCT } from '@/config/lemonsqueezy-product-config';
import { selectShowcaseDecks, fallbackShowcase, type ShowcaseDeck } from '@/lib/showcase-decks';

export const revalidate = 3600;

/* Four instruments whose apparatus renders read well as objects on pedestals.
   Names and taglines are resolved per locale from MANIPULATIVES below. */
const INSTRUMENT_KEYS = ['rekenrek', 'number-balance', 'build-plan', 'fraction-kitchen'];

/* The piece you may touch. Kept to a tool that is genuinely free to use, so
   the signature never lands a visitor on a paywall. */
const TOUCHABLE = 'rekenrek';

function localized(map: Record<string, string> | undefined, locale: string) {
  return (map && (map[locale] || map.en)) || '';
}

export default async function HomepageV10Preview({ params }: { params: { locale: string } }) {
  const locale = params.locale || 'en';
  const t = await getTranslations({ locale, namespace: 'homepageV6' });

  let decks: ShowcaseDeck[] = [];
  try {
    let sel = await selectShowcaseDecks(locale, 18);
    // DB empty/unreachable -> the curated EN fallback set (a real worksheet
    // in the wrong language beats an empty wall).
    if (!sel.featured && sel.thumbs.length === 0) sel = fallbackShowcase(18);
    decks = sel.thumbs;
  } catch {
    decks = fallbackShowcase(18).thumbs;
  }

  const hero = {
    h1: t('hero.h1'),
    sub: t('hero.sub'),
    ctaTools: t('hero.ctaTools'),
    ctaWorksheets: t('hero.ctaWorksheets'),
    hallLabel: t('hero.fanLabel'),
  };

  const rooms: RoomStrings = {
    instrumentsH2: t('teach.heading'),
    instrumentsBody: t('teach.body'),
    instrumentsCta: t('teach.seeAll'),

    printH2: t('practice.heading'),
    printBody: t('practice.body'),
    printCta: t('practice.browseWorksheets'),
    activitiesCta: t('practice.browseActivities'),

    studioH2: t('make.heading'),
    studioBody: t('make.body'),
    studioMakerAlt: t('make.makerAlt'),
    studioPlay: t('make.forkPlay'),
    studioPrint: t('make.forkPrint'),
    studioCta: t('make.cta'),

    plansH2: t('teacher.heading'),
    plansBody: t('teacher.body'),
    freeTitle: t('teacher.freeTitle'),
    freePrice: t('teacher.freeTag'),
    teacherPrice: t('teacher.teacherPrice', { price: SUBSCRIPTION_PRODUCT.priceUsd }),
    freeItems: [t('teacher.free1'), t('teacher.free2'), t('teacher.free3'), t('teacher.free4')],
    freeCta: t('teacher.freeCta'),
    teacherTitle: t('teacher.teacherTitle'),
    teacherItems: [
      t('teacher.teacher1'),
      t('teacher.teacher2'),
      t('teacher.teacher3'),
      t('teacher.teacher4'),
    ],
    teacherCta: t('teacher.teacherCta'),

    closeH2: `${t('close.line1')} ${t('close.line2')}`,
    closeBody: t('close.body'),
    closeCtaPrimary: t('close.ctaPrimary'),
    closeCtaSecondary: t('close.ctaSecondary'),
  };

  const instruments: InstrumentCard[] = INSTRUMENT_KEYS.map((key) => {
    const m = MANIPULATIVES.find((x) => x.id === key);
    return { key, name: localized(m?.title, locale), note: localized(m?.tagline, locale) };
  }).filter((i) => i.name);

  const touch = MANIPULATIVES.find((x) => x.id === TOUCHABLE);
  const live = {
    src: `/mini-tools/${TOUCHABLE}.html?lang=${locale}&embed=compact`,
    name: localized(touch?.title, locale),
    previewUrl: `/mini-tools/tool-previews/${TOUCHABLE}.webp`,
    ctaLabel: t('live.cta'),
    note: t('live.note'),
    liveTag: t('teach.liveTag'),
  };

  return (
    <div className="hv10-page">
      <GrandHall locale={locale} decks={decks.slice(0, 6)} strings={hero} />
      <InstrumentHall locale={locale} strings={rooms} instruments={instruments} live={live} />
      <PrintRoom locale={locale} decks={decks.slice(6)} strings={rooms} />
      <Studio locale={locale} strings={rooms} />
      <MembersRoom locale={locale} strings={rooms} />
      <Exit locale={locale} strings={rooms} />
      {/* The catalogue at the back of the building — the crawl-bait link
          mesh. It alone carries the page past the 140-internal-link floor. */}
      <div className="hv10-catalogue">
        <BrowseByTopicSSR
          locale={locale}
          maxThemesPerGroup={40}
          includeGradeGroup
          includeLanguageGroup
          variant="hv6"
        />
      </div>
    </div>
  );
}
