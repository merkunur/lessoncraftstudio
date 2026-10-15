/* Homepage v10 "THE GALLERY OF LESSONS" — preview route (noindex).
   v10.2 (2026-10-15): mirrors the live page's new structure exactly — the set
   triptych, the Print Room first with the exhibit and the twenty-work wall,
   the rebuilt plans room, the rooms in the operator's order.

   ── i18n ──────────────────────────────────────────────────────────────────
   Every word on this page is natively authored in all eleven languages.
   Nothing here is machine-translated:

     · the prose comes from the `homepageV6` namespace (native panels; the
       v10.2 keys reviewed by one native + pedagogy reviewer before deploy);
     · the instrument names and taglines come from `MANIPULATIVES`, which
       carries all eleven locales per tool;
     · the level words, set links and worksheet-type plaques come from the
       shipped `levelSets.*` strings and the taxonomy;
     · the room numbers are ROMAN NUMERALS — language-neutral by
       construction, so the gallery device costs no translation at all.

   The data path mirrors the live page exactly (the hall's six generator
   decks, the wall's twenty all-type decks, the one Level Set) so promotion
   is an import swap in app/[locale]/page.tsx. ⚠ This file is a near-duplicate
   of that one and is the visual-diff safety net: an edit made there and not
   here means every gate pointed at this route measures the OLD composition. */

import { getTranslations } from 'next-intl/server';
import GrandHall from '@/components/homepage-v10/GrandHall';
import { heroStrings } from '@/components/homepage-v10/hero-strings';
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
  type WallWork,
} from '@/components/homepage-v10/Rooms';
import BrowseByTopicSSR from '@/components/homepage-v3/BrowseByTopicSSR';
import { MANIPULATIVES } from '@/lib/manipulatives';
import { resolveActivityById } from '@/lib/activities';
import { getAxisName } from '@/lib/taxonomy';
import { SUBSCRIPTION_PRODUCT } from '@/config/lemonsqueezy-product-config';
import {
  selectShowcaseDecks,
  fallbackShowcase,
  selectWallDecks,
  fallbackWall,
  type ShowcaseDeck,
} from '@/lib/showcase-decks';
import { loadSetExhibit, fallbackExhibit, type SetExhibit } from '@/lib/homepage-set-exhibit';
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

/* The Playroom's four exhibits. Chosen from the 54 activities complete in ALL
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

/* Mirrors app/[locale]/page.tsx exactly — see the long notes there. */
const WALL_TARGET = 20;
const HALL_COUNT = 7;

export default async function HomepageV10Preview({ params }: { params: { locale: string } }) {
  const locale = params.locale || 'en';
  const t = await getTranslations({ locale, namespace: 'homepageV6' });
  const tLs = await getTranslations({ locale, namespace: 'levelSets' });

  let hall: ShowcaseDeck[] = [];
  try {
    let sel = await selectShowcaseDecks(locale, HALL_COUNT);
    // DB empty/unreachable -> the curated EN fallback set (a real worksheet
    // in the wrong language beats an empty wall).
    if (!sel.featured && sel.thumbs.length === 0) sel = fallbackShowcase(HALL_COUNT);
    hall = sel.thumbs;
  } catch {
    hall = fallbackShowcase(HALL_COUNT).thumbs;
  }

  let wallDecks: ShowcaseDeck[] = [];
  try {
    wallDecks = await selectWallDecks(locale, WALL_TARGET);
  } catch {
    wallDecks = [];
  }
  if (wallDecks.length < WALL_TARGET) {
    const seen = new Set(wallDecks.map((d) => d.slug));
    for (const d of fallbackWall(WALL_TARGET)) {
      if (wallDecks.length >= WALL_TARGET) break;
      if (!seen.has(d.slug)) wallDecks.push(d);
    }
  }
  const works: WallWork[] = wallDecks.map((d) => ({
    deck: d,
    label: getAxisName('exercise-type', d.exerciseType, locale) || titleFor(d),
  }));

  let exhibit: SetExhibit | null = null;
  try {
    exhibit = await loadSetExhibit(locale, tLs);
  } catch {
    exhibit = fallbackExhibit(locale, tLs);
  }

  // One builder for both routes (components/homepage-v10/hero-strings.ts):
  // this preview is the gate target and must never drift from the live page.
  const hero = heroStrings(t);

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

    printH2: t('set.roomHeading'),
    printBody: t('set.roomBody'),
    printCta: t('practice.browseWorksheets'),
    makersCta: t('hero.ctaMakers'),
    setEyebrow: t('set.eyebrow'),
    setCaption: t('set.caption'),
    setSheetLabel: t('set.sheetLabel'),
    setPlanTag: t('set.planTag'),
    pathwayLabel: tLs('pathway'),
    openSet: tLs('openSet'),
    allSets: tLs('allSets'),
    wallHeading: t('set.wallHeading'),

    studioH2: t('make.heading'),
    studioBody: t('make.body'),
    studioMakerAlt: t('make.makerAlt'),
    studioPlay: t('make.forkPlay'),
    studioPrint: t('make.forkPrint'),
    studioCta: t('make.cta'),

    plansH2: t('teacher.heading'),
    plansBody: t('teacher.body'),
    plansNote: t('teacher.honest'),
    plansReassure: t('teacher.reassure'),
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
    closeCtaPrimary: t('teacher.teacherCta'),
    closeCtaSecondary: t('close.ctaSecondary'),
  };

  /* The Playroom's exhibits, resolved per locale. Titles and slugs are native
     in all eleven languages already; the grade band comes from the shared
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
  const embedDeck = hall[5] ?? hall[0];
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
      <GrandHall
        locale={locale}
        decks={hall.slice(0, 5)}
        setPages={exhibit ? exhibit.pages.map((p) => p.thumbnailUrl) : undefined}
        strings={hero}
      />
      <PrintRoom locale={locale} numeral="I" works={works} exhibit={exhibit} strings={rooms} />
      <Studio locale={locale} numeral="II" strings={rooms} />
      <InstrumentHall locale={locale} numeral="III" strings={rooms} instruments={instruments} live={live} />
      <Playroom locale={locale} numeral="IV" strings={rooms} activities={alcoves} />
      <Dispatch locale={locale} numeral="V" strings={rooms} deck={embedDeck} embed={embed} />
      <MembersRoom locale={locale} numeral="VI" strings={rooms} exhibit={exhibit} />
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
