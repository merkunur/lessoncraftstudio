/* Homepage v11 "THE GALLERY OF LESSONS, WALKED THROUGH" — preview route (noindex).

   ── i18n ──────────────────────────────────────────────────────────────────
   Every word on this page is already natively authored in all eleven
   languages and NOTHING new was written for v11:

     · the prose is the `homepageV6` namespace (native panels, tier-truthful);
     · the instrument names and taglines are `MANIPULATIVES` (×11 per tool);
     · the room numbers are ROMAN NUMERALS;
     · the pen-notes, the four promises, the monthly price and the two alt
       texts are `homepageV6` keys the v6 design authored ×11 and v10 never
       rendered — recovered, not translated.

   The showcase fetch mirrors the live page exactly (one fetch of 22; 6 to
   the hall, the rest to the wall; decks[3] is the traveller AND the embed
   deck) so promotion is a set of import swaps in app/[locale]/page.tsx.
   ⚠ This file is a near-duplicate of that one and is the visual-diff safety
   net: an edit made there and not here means every gate pointed at this
   route measures the OLD composition. */

import { getTranslations } from 'next-intl/server';
import GrandHall from '@/components/homepage-v10/GrandHall';
import { heroStrings } from '@/components/homepage-v10/hero-strings';
import Threshold from '@/components/homepage-v11/Threshold';
import ScrollStage from '@/components/homepage-v11/ScrollStage';
import {
  InstrumentHall,
  Playroom,
  PrintRoom,
  Studio,
  Dispatch,
  MembersRoom,
  Exit,
  titleFor,
  type RoomStrings,
  type InstrumentCard,
  type AlcoveCard,
} from '@/components/homepage-v11/Rooms';
import type { VignetteVariant } from '@/components/homepage-v6/ToolVignette';
import BrowseByTopicSSR from '@/components/homepage-v3/BrowseByTopicSSR';
import { MANIPULATIVES } from '@/lib/manipulatives';
import { resolveActivityById } from '@/lib/activities';
import { SUBSCRIPTION_PRODUCT } from '@/config/lemonsqueezy-product-config';
import { selectShowcaseDecks, fallbackShowcase, type ShowcaseDeck } from '@/lib/showcase-decks';
import { buildEmbedSnippet } from '@/lib/seo/embed-snippet';
import { embedAnchor } from '@/lib/seo/embed-anchor-text';
import { deckAssets } from '@/lib/seo/landing-content';
import { canonicalUrl, localePath } from '@/lib/seo/url';

export const revalidate = 3600;

/* The easel's four instruments, in the order they take the stage. The
   balance leads because the room's copy says "the beam tips". Each is a
   pure-CSS machine from homepage-v6/ToolVignette; the key is its
   MANIPULATIVES id (native name + tagline ×11). */
const EASEL: Array<{ key: string; variant: VignetteVariant }> = [
  { key: 'number-balance', variant: 'balance' },
  { key: 'lids', variant: 'lids' },
  { key: 'draw-bag', variant: 'draw-bag' },
  { key: 'number-sieve', variant: 'sieve' },
];

/* The piece you may touch. Kept to a tool that is genuinely free to use, so
   the signature never lands a visitor on a paywall. */
const TOUCHABLE = 'rekenrek';

/* The exit shelf: the hero's four instruments, named. */
const SHELF_KEYS = ['learning-clock', 'rekenrek', 'open-number-line', 'measurement-bench'];

/* Room III's four exhibits. Chosen from the 54 activities complete in ALL
   ELEVEN locales, not from the 204. */
const ALCOVES: Array<{ id: string; kind: 'ten-frame' | 'array' | 'shape' | 'length' }> = [
  { id: 'ten-frame.teen-numbers.make-n', kind: 'ten-frame' },
  { id: 'array.build-array.2-oa-c-4', kind: 'array' },
  { id: 'choice-board.shape-id.k-g-a-2', kind: 'shape' },
  { id: 'choice-board.compare-length.k-md-2', kind: 'length' },
];

function localized(map: Record<string, string> | undefined, locale: string) {
  return (map && (map[locale] || map.en)) || '';
}

export default async function HomepageV11Preview({ params }: { params: { locale: string } }) {
  const locale = params.locale || 'en';
  const t = await getTranslations({ locale, namespace: 'homepageV6' });

  let decks: ShowcaseDeck[] = [];
  try {
    let sel = await selectShowcaseDecks(locale, 22);
    if (!sel.featured && sel.thumbs.length === 0) sel = fallbackShowcase(22);
    decks = sel.thumbs;
  } catch {
    decks = fallbackShowcase(22).thumbs;
  }

  const hero = heroStrings(t);

  const tEmbed = await getTranslations({ locale, namespace: 'homepageV3.embedShare' });
  const tCopied = await getTranslations({ locale, namespace: 'workspace.hosted' });

  /* THE TRAVELLER: decks[3] hangs in the hero's fourth frame, is the first
     large work on the wall, is the sheet the dispatch sends, is the embed
     deck, and hangs by the door. One sheet, followed through the building. */
  const traveller = decks[3];

  const rooms: RoomStrings = {
    instrumentsH2: t('teach.heading'),
    instrumentsBody: t('teach.body'),
    instrumentsCta: t('teach.seeAll'),

    playH2: t('practice.heading'),
    playBody: t('practice.body'),
    playCta: t('practice.browseActivities'),

    printH2: t('paper.heading'),
    printBody: t('paper.body'),
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

    shareH2: t('share.heading'),
    shareBody: t('share.body'),
    shareQrAlt: t('share.qrAlt'),
    shareChips: [t('share.chip1'), t('share.chip2'), t('share.chip3'), t('share.chip4')],
    planTag: t('planTag'),

    embedHeadA: tEmbed('h2Line1'),
    embedHeadB: tEmbed('h2Line2'),
    embedCaption: tEmbed('mockup.snippetCaption'),
    embedCopy: tEmbed('mockup.copyCodeButton'),
    embedCopied: tCopied('copied'),
    embedFact1: tEmbed('trust1'),
    embedFact2: tEmbed('trust2'),

    closeH2: `${t('close.line1')} ${t('close.line2')}`,
    closeBody: t('close.body'),
    closeCtaPrimary: t('close.ctaPrimary'),
    closeCtaSecondary: t('close.ctaSecondary'),

    /* v11 — the v6 keys recovered (native ×11, never machine-translated) */
    penBalance: t('teach.penBalance'),
    paperTraveler: t('paper.penTraveler'),
    shareTraveler: t('share.penTraveler'),
    shareClock: t('share.penClock'),
    forkLabel: t('make.forkLabel'),
    promises: [t('keep.chipCurricula'), t('keep.chipLanguages'), t('keep.chipNoData'), t('keep.chipNoAds')],
    reassure: t('teacher.reassure'),
    teacherMonthly: t('teacher.teacherMonthly', { monthly: SUBSCRIPTION_PRODUCT.monthlyPriceUsd }),
    playAlt: t('paper.playAlt'),
    printAlt: t('paper.printAlt'),
    travellerAlt: traveller ? titleFor(traveller) : '',
  };

  const tg = await getTranslations({ locale, namespace: 'seo.educational_level' });
  const GRADE_KEY: Record<string, string> = { K: 'kindergarten', '1': 'grade_1', '2': 'grade_2', '3': 'grade_3' };
  const alcoves: AlcoveCard[] = (
    await Promise.all(
      ALCOVES.map(async (a) => {
        const row = await resolveActivityById(a.id);
        if (!row) return null;
        const title = row.page_title?.[locale] || row.page_title?.en;
        const slug = row.slug?.[locale] || row.slug?.en;
        if (!title || !slug) return null;
        const gk = GRADE_KEY[String(row.alignment?.grade ?? '')];
        return { id: a.id, kind: a.kind, title, slug, grade: gk ? tg(gk) : '' } as AlcoveCard;
      }),
    )
  ).filter(Boolean) as AlcoveCard[];

  const instruments: InstrumentCard[] = EASEL.map(({ key, variant }) => {
    const m = MANIPULATIVES.find((x) => x.id === key);
    return { key, variant, name: localized(m?.title, locale), note: localized(m?.tagline, locale) };
  }).filter((i) => i.name);

  const shelf = SHELF_KEYS.map((key) => ({
    key,
    name: localized(MANIPULATIVES.find((x) => x.id === key)?.title, locale),
  }));

  const embedDeck = traveller;
  const anchor = embedAnchor(locale);
  const embed = embedDeck
    ? {
        snippet: buildEmbedSnippet({
          iframeUrl: deckAssets(embedDeck.language, embedDeck.slug).deckDir,
          brandHref: deckAssets(embedDeck.language, embedDeck.slug).deckDir,
          homeHref: canonicalUrl(localePath(locale)),
          prefix: anchor.prefix,
          keyword: anchor.keyword,
          title: titleFor(embedDeck),
          id: `lcs-embed-${embedDeck.slug}`,
        }),
      }
    : undefined;

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
      <Threshold decks={decks.slice(6, 8)} />
      <InstrumentHall locale={locale} strings={rooms} instruments={instruments} live={live} />
      <PrintRoom locale={locale} decks={decks.slice(6)} traveller={traveller} strings={rooms} />
      <Playroom locale={locale} strings={rooms} activities={alcoves} />
      <Studio locale={locale} strings={rooms} />
      <Dispatch locale={locale} strings={rooms} deck={embedDeck} embed={embed} />
      <MembersRoom locale={locale} strings={rooms} />
      <Exit locale={locale} strings={rooms} shelf={shelf} traveller={traveller} />
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
      <ScrollStage />
    </div>
  );
}
