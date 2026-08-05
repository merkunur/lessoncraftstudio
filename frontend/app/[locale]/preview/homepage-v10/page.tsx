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

   The showcase fetch mirrors the live page exactly (one fetch of 22, sliced
   6 to the hall and 15 to the print room) so promotion is an import swap in
   app/[locale]/page.tsx. ⚠ This file is a near-duplicate of that one and is
   the visual-diff safety net: an edit made there and not here means every
   gate pointed at this route measures the OLD composition. */

import { getTranslations } from 'next-intl/server';
import GrandHall from '@/components/homepage-v10/GrandHall';
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
} from '@/components/homepage-v10/Rooms';
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

/* Four instruments whose apparatus renders read well as objects on pedestals.
   Names and taglines are resolved per locale from MANIPULATIVES below. */
const INSTRUMENT_KEYS = ['rekenrek', 'number-balance', 'build-plan', 'fraction-kitchen'];

/* The piece you may touch. Kept to a tool that is genuinely free to use, so
   the signature never lands a visitor on a paywall. */
const TOUCHABLE = 'rekenrek';

/* Room II's four exhibits. Chosen from the 54 activities complete in ALL
   ELEVEN locales, not from the 204 — the visually obvious picks exist only in
   en/de, which would have left seven languages with a broken room. Four
   distinct shapes across four strands. */
const ALCOVES: Array<{ id: string; kind: 'ten-frame' | 'array' | 'shape' | 'length' }> = [
  { id: 'ten-frame.teen-numbers.make-n', kind: 'ten-frame' },
  { id: 'array.build-array.2-oa-c-4', kind: 'array' },
  { id: 'choice-board.shape-id.k-g-a-2', kind: 'shape' },
  { id: 'choice-board.compare-length.k-md-2', kind: 'length' },
];

function localized(map: Record<string, string> | undefined, locale: string) {
  return (map && (map[locale] || map.en)) || '';
}

/* Mirrors app/[locale]/page.tsx exactly — see the long note there. 15 tiles is
   the print room's wall size; `fullRows` is only the degradation guard. */
const HANG_TARGET = 15;
function fullRows(available: number): number {
  return available >= HANG_TARGET ? HANG_TARGET : Math.max(0, Math.floor(available / 5) * 5);
}

export default async function HomepageV10Preview({ params }: { params: { locale: string } }) {
  const locale = params.locale || 'en';
  const t = await getTranslations({ locale, namespace: 'homepageV6' });

  let decks: ShowcaseDeck[] = [];
  try {
    let sel = await selectShowcaseDecks(locale, 22);
    // DB empty/unreachable -> the curated EN fallback set (a real worksheet
    // in the wrong language beats an empty wall).
    if (!sel.featured && sel.thumbs.length === 0) sel = fallbackShowcase(22);
    decks = sel.thumbs;
  } catch {
    decks = fallbackShowcase(22).thumbs;
  }

  const hero = {
    h1: t('hero.h1'),
    sub: t('hero.sub'),
    ctaTools: t('hero.ctaTools'),
    ctaWorksheets: t('hero.ctaWorksheets'),
    hallLabel: t('hero.fanLabel'),
    countsLine: t('hero.countsLine'),
  };

  // THE LOAN LABEL. Every string was already native x11 from the v3 embed
  // section, so the rebuild cost no translation round.
  // See app/[locale]/page.tsx for why homepageV3.embedShare.body is unused.
  const tEmbed = await getTranslations({ locale, namespace: 'homepageV3.embedShare' });
  const tCopied = await getTranslations({ locale, namespace: 'workspace.hosted' });

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
  };

  /* Room II's exhibits, resolved per locale. Titles and slugs are native in
     all eleven languages already; the grade band comes from the shared
     seo.educational_level namespace, which is likewise native x11. A row that
     fails to resolve is DROPPED rather than rendered half-blank. */
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
        return {
          id: a.id,
          kind: a.kind,
          title,
          slug,
          grade: gk ? tg(gk) : '',
        } as AlcoveCard;
      }),
    )
  ).filter(Boolean) as AlcoveCard[];

  const instruments: InstrumentCard[] = INSTRUMENT_KEYS.map((key) => {
    const m = MANIPULATIVES.find((x) => x.id === key);
    return { key, name: localized(m?.title, locale), note: localized(m?.tagline, locale) };
  }).filter((i) => i.name);

  /* The loan label's REAL snippet — mirrors app/[locale]/page.tsx exactly.
     See the long note there for why iframeUrl and brandHref are both the
     deck directory. */
  const embedDeck = decks[3];
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
      <InstrumentHall locale={locale} strings={rooms} instruments={instruments} live={live} />
      <PrintRoom locale={locale} decks={decks.slice(6, 6 + fullRows(decks.length - 6))} strings={rooms} />
      <Playroom locale={locale} strings={rooms} activities={alcoves} />
      <Studio locale={locale} strings={rooms} />
      <Dispatch locale={locale} strings={rooms} deck={embedDeck} embed={embed} />
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
